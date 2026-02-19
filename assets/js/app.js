let selectedRatio = 0;
let teaStrength = 0;
let sugarStrength = 0;
let teaGrams = 0;
let sugarGrams = 0;

function scrollToCalc(){
document.getElementById("calculator")
.scrollIntoView({behavior:"smooth"});
}

function nextStep(step){

if(step===2 && selectedRatio===0){
alert("اختر الشاهي أولاً");
return;
}

if(step===3){
let water=document.getElementById("water").value;
if(!water){alert("أدخل كمية الماء");return;}
}

document.querySelectorAll(".step")
.forEach(s=>s.classList.remove("active"));

document.getElementById("step"+step)
.classList.add("active");

calculate();
}

function selectTea(card){
document.querySelectorAll(".tea-card")
.forEach(c=>c.classList.remove("active"));

card.classList.add("active");
selectedRatio=parseInt(card.dataset.ratio);
calculate();
}

function setTeaStrength(v,btn){
teaStrength=v;
btn.parentNode.querySelectorAll("button")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
calculate();
}

function setSugarStrength(v,btn){
sugarStrength=v;
btn.parentNode.querySelectorAll("button")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
calculate();
}

function calculate(){
let water=parseInt(document.getElementById("water").value)||0;
if(!selectedRatio||!water)return;

teaGrams=((water/1000)*selectedRatio)+teaStrength;
sugarGrams=((water/1000)*30)+sugarStrength;

document.getElementById("result").innerText=
`${teaGrams.toFixed(1)} غ شاهي + ${sugarGrams.toFixed(1)} غ سكر`;
}

function startTimer(){
alert("جاهز ☕");
}