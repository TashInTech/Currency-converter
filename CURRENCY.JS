
const ApiKey = "fe2f2db6e875a0a19d85171d"
function loadCurrencies() {
  let fromSelect = document.querySelector("#from-currency");
  let toSelect = document.querySelector("#to-currency");


  fetch(`https://v6.exchangerate-api.com/v6/${ApiKey}/latest/USD`)
    .then(res => res.json())
    .then(data => {
      const codes = Object.keys(data.conversion_rates);

      codes.forEach(code => {
        const opt1 = document.createElement("option");
        opt1.value = code;
        opt1.textContent = code;

        const opt2 = document.createElement("option");
        opt2.value = code;
        opt2.textContent = code;

        fromSelect.appendChild(opt1);
        toSelect.appendChild(opt2);
        /*set defaults*/
        fromSelect.value ='USD'
        toSelect.value ='UGX'
      });
    }).catch((error)=>{
        console.log("error")
    });
}
loadCurrencies();

document.querySelector("#form")
.addEventListener("submit",(e)=>{
e.preventDefault();
let amount = document.querySelector("#amount-input").value;
let from= document.querySelector("#from-currency").value
let to= document.querySelector("#to-currency").value
let convert= document.querySelector("#convert");
const loader = document.querySelector(".loader");
if(isNaN(amount) || amount ===''){
    alert("please fill in numbers")
    e.target.reset();
    return;
}
if(amount<0){
  alert("Amount can't be in negatives");
  e.target.reset();
return;
}
if(from === to){
    alert("you can't convert from to same state")
     e.target.reset();
    return;
}
loader.style.display="block";

fetch(`https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${from}`)
.then((res)=>{return res.json()})
.then((data)=>{
    console.log(data)
    const rate = data.conversion_rates[to];
    setTimeout(()=>{
     convert.textContent = 'RESULT'+':'+" "+ amount +' ' + from +" "+ '=' + (amount *rate).toFixed(3) +" "+ to; 
      loader.style.display="none";
    },1000)

})
});

