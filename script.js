const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");

const msg=document.querySelector(".msg");


for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode=="USD"){
            newOption.selected=true;
        }
        else if(select.name=="to" && currCode=="INR"){
            newOption.selected=true;
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change", (evt)=>{
        UpdateFlag(evt.target);
    });
};
const updateExhangeRate = async ()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<0){
        amtValue = 1;
        amount.value=amtValue;
    }
    let x=fromCurrency.value.toLowerCase();
    const URL = `${BASE_URL}/${x}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount=amtValue * rate;
    
    msg.innerText=`${amtValue} ${fromCurrency.value} = ${finalAmount.toFixed(3)} ${toCurrency.value}`;
}

const UpdateFlag =(element)=>{
    let currCode = element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png `
    element.parentNode.querySelector("img").src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExhangeRate();
});

window.addEventListener("load",()=>{
    updateExhangeRate();
});

