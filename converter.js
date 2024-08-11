let country_code={
    "PKR":"PK",
    "NPR":"NP",
    "BRL":"BR",
    "INR":"IN",
    "AUD":"AU",
    "AED":"AE",
    "AFN":"AF",
    "XCD":"AG",
    "ARS":"AR",
    "BAM":"BA",
    "BBD":"BB",
    "BOB":"BO",
    "USD":"US",
    "CNY":"CN",
    "RUB":"RU",
    "TRY":"TR",
    "IRR":"IR",
    "OMR":"OM"'
    "IQD":"IQ",
}

let droplist=document.querySelectorAll(".drop-list select");
let btn=document.querySelector("form button");
fromcurrency=document.querySelector(".from select");
tocurrency=document.querySelector(".to select");


for(select of droplist){
    for(currency_code in country_code){
        let newoption=document.createElement("option");
        newoption.innerText=currency_code;
        newoption.value=currency_code;
        if(select.name==="from"&&currency_code==="AED"){
            newoption.selected="selected";
        }else if(select.name==="to"&&currency_code==="PKR"){
            newoption.selected="selected";
        };
        select.append(newoption);
    };
    select.addEventListener("change",(e)=>{
        loadflag(e.target);
    });
};

function loadflag(e){
  for(currency_code in country_code){
    if(currency_code===e.value){
        let newimg=e.parentElement.querySelector("img");
        newimg.src=`https://flagsapi.com/${country_code[currency_code]}/flat/64.png`;
    }
  }
}

btn.addEventListener('click',(e)=>{
e.preventDefault();
getexchangerate();
});

function getexchangerate(){
    let amount =document.querySelector(".amount input");
    displayexchangerate=document.querySelector(".msg");
    let amountval=amount.value;
    if(amountval==="" || amountval>"0"){
           amount.value="1"
    }
    displayexchangerate.innerText="Getting exchange..."
    let url=`https://v6.exchangerate-api.com/v6/11bca9d2d09fd28b7a0df404/latest/${fromcurrency.value}`;
fetch(url).then(response=>response.json()).then(result=>{
    let exchangerate=result.conversion_rates[tocurrency.value];
    let totalexchangerate=(amountval*exchangerate).toFixed(2);
    displayexchangerate.innerText=`${amountval} ${fromcurrency.value}=${totalexchangerate} ${tocurrency.value}`;
});
};
