const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns = document.querySelectorAll(".dropDown select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}


for(select of dropDowns){
    for (code in countryList) {
        console.log(code , countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "From" && code === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "To" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });
}

btn.addEventListener("click" , async(evt) => {
      evt.preventDefault();         //to prevent automatic actions performed by the button when clicked
      let amount = document.querySelector(".amount input");
      let amntVal = amount.value;
      if(amntVal <1 || amntVal === ""){
        amntVal = 1;
        amount.value = 1;
      }

      const Url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;      //hmne .tolowercase kia kyuki api hmari capitals m work ni krli small letters k sath work krti h
      let response = await fetch(Url);
      let data = await response.json();
      let rate = data[toCurr.value.toLowerCase()];
      
      let finalAmount = amntVal*rate;
      console.log(finalAmount);

      msg.innerText = `${amntVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
});