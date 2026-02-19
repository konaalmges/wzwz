let currentSlide = 0;
let selectedTea = null;
let teaStrength = 0;
let sugarStrength = 0;
let teaGrams = 0;
let sugarGrams = 0;
let timer;

const teas = [
{name:"الحوت",ratio:18,time:20},
{name:"ربيع",ratio:20,time:22},
{name:"المنيس",ratio:22,time:23},
{name:"أبو جبل",ratio:24,time:24},
{name:"سيلاني",ratio:26,time:25},
{name:"الكبوس",ratio:21,time:22},
{name:"ليبتون",ratio:19,time:20},
{name:"العروسة",ratio:23,time:24},
{name:"أحمد",ratio:20,time:21},
{name:"تاج محل",ratio:25,time:25}
];

function scrollToCalc(){
document.getElementById("calculator")
.scrollIntoView({behavior:"smooth"})
}

function renderTeas(limit=6){
const container=document.getElementById("teaContainer");
container.innerHTML="";
teas.slice(0,limit).forEach(t=>{
let div=document.createElement("div");
div.className="tea-card";
div.innerText=t.name;
div.onclick=()=>selectTea(div,t);
container.appendChild(div);
});
}

function toggleMore(){
renderTeas(teas.length);
document.getElementById("moreBtn").style.display="none";
}

function selectTea(card,tea){
document.querySelectorAll(".tea-card")
.forEach(c=>c.classList.remove("active"));
card.classList.add("active");
selectedTea=tea;
}

function nextSlide(){
if(currentSlide===0 && !selectedTea) return alert("اختر الشاهي");
if(currentSlide===1 && !water.value) return alert("أدخل الماء");

currentSlide++;
updateSlider();
}

function prevSlide(){
currentSlide--;
updateSlider();
}

function updateSlider(){
document.getElementById("slider")
.style.transform=`translateX(-${currentSlide*100}%)`;
document.getElementById("progressBar")
.style.width=((currentSlide+1)/6)*100+"%";
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
if(!selectedTea) return;
let water=parseInt(document.getElementById("water").value)||0;
teaGrams=((water/1000)*selectedTea.ratio)+teaStrength;
sugarGrams=((water/1000)*30)+sugarStrength;

document.getElementById("result").innerText=
`${teaGrams.toFixed(1)}غ شاهي + ${sugarGrams.toFixed(1)}غ سكر`;
}

function showReview(){
calculate();
document.getElementById("reviewBox").innerHTML=`
<p>الشركة: ${selectedTea.name}</p>
<p>الشاهي: ${teaGrams.toFixed(1)} غرام</p>
<p>السكر: ${sugarGrams.toFixed(1)} غرام</p>
<p>مدة الخدرة: ${selectedTea.time} دقيقة</p>`;
nextSlide();
}

function startTimer(fast){
let total=fast?60:selectedTea.time*60;
let full=total;
nextSlide();

timer=setInterval(()=>{
let m=Math.floor(total/60);
let s=total%60;
timeDisplay.innerText=`${m}:${s<10?"0":""}${s}`;
teaFill.style.height=((full-total)/full)*100+"%";

if(total===10) timerMessage.innerText="باقي شوي 👀";
if(total===0){
clearInterval(timer);
timerMessage.innerText="جاهز ☕";
}
total--;
},1000);
}

function resetAll(){
location.reload();
}

renderTeas();