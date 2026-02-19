let currentSlide = 0;
let selectedTea = null;
let teaStrength = 0;
let sugarStrength = 0;

const teas = [
{name:"الحوت",ratio:18},
{name:"ربيع",ratio:20},
{name:"المنيس",ratio:22},
{name:"أبو جبل",ratio:24},
{name:"سيلاني",ratio:26}
];

const slider = document.getElementById("slider");
const progress = document.getElementById("progressBar");

function scrollToCalc(){
document.getElementById("calculator")
.scrollIntoView({behavior:"smooth"});
}

function renderTeas(){
const container=document.getElementById("teaContainer");
teas.forEach(t=>{
let div=document.createElement("div");
div.className="tea-card";
div.innerText=t.name;
div.onclick=()=>{
document.querySelectorAll(".tea-card")
.forEach(c=>c.classList.remove("active"));
div.classList.add("active");
selectedTea=t;
};
container.appendChild(div);
});
}

function nextSlide(){
if(currentSlide===0 && !selectedTea){
alert("اختر الشاهي أولاً");
return;
}
if(currentSlide===1){
let water=document.getElementById("water").value;
if(!water){alert("أدخل كمية الماء");return;}
}
currentSlide++;
updateSlider();
}

function prevSlide(){
currentSlide--;
updateSlider();
}

function updateSlider(){
slider.style.transform=`translateX(-${currentSlide*100}%)`;
progress.style.width=((currentSlide+1)/4)*100+"%";
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
if(!selectedTea)return;
let water=parseInt(document.getElementById("water").value)||0;
let tea=((water/1000)*selectedTea.ratio)+teaStrength;
let sugar=((water/1000)*30)+sugarStrength;
document.getElementById("result").innerText=
`${tea.toFixed(1)}غ شاهي + ${sugar.toFixed(1)}غ سكر`;
}

function startTimer(){
alert("جاهز ☕");
}

renderTeas();