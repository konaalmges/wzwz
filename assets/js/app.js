const enterBtn=document.getElementById("enterBtn");
const intro=document.getElementById("intro");
const prep=document.getElementById("prep");
const timerScreen=document.getElementById("timerScreen");

enterBtn.onclick=()=>{
intro.classList.remove("active");
prep.classList.add("active");
};

const waterInput=document.getElementById("waterInput");
const teaResult=document.getElementById("teaResult");
const sugarResult=document.getElementById("sugarResult");

let teaFactor=1;
let sugarFactor=1;

function calculate(){
let water=parseFloat(waterInput.value)||1000;
let tea=13*(water/1000)*teaFactor;
let sugar=50*(water/1000)*sugarFactor;
teaResult.textContent=tea.toFixed(1);
sugarResult.textContent=sugar.toFixed(1);
}

waterInput.oninput=calculate;

document.querySelectorAll("#teaLevel button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll("#teaLevel button").forEach(b=>b.classList.remove("special"));
btn.classList.add("special");
teaFactor=parseFloat(btn.getAttribute("data"));
calculate();
};
});

document.querySelectorAll("#sugarLevel button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll("#sugarLevel button").forEach(b=>b.classList.remove("special"));
btn.classList.add("special");
sugarFactor=parseFloat(btn.getAttribute("data"));
calculate();
};
});

document.getElementById("startTimer").onclick=()=>{
prep.classList.remove("active");
timerScreen.classList.add("active");
startTimer();
};

let total=22*60;
let remaining=total;
let interval;
const progress=document.getElementById("progress");
const circumference=628;

function startTimer(){
interval=setInterval(()=>{
remaining--;
let min=Math.floor(remaining/60);
let sec=remaining%60;
document.getElementById("time").textContent=`${min}:${sec<10?"0":""}${sec}`;
let offset=circumference-(remaining/total)*circumference;
progress.style.strokeDashoffset=offset;
if(remaining<=0)clearInterval(interval);
},1000);
}

document.getElementById("endTimer").onclick=()=>{
clearInterval(interval);
timerScreen.classList.remove("active");
prep.classList.add("active");
remaining=total;
};

const sound=document.getElementById("boilSound");
const soundBtn=document.getElementById("soundBtn");

soundBtn.onclick=()=>{
if(sound.paused){
sound.play();
soundBtn.textContent="🔇 ايقاف الصوت";
}else{
sound.pause();
soundBtn.textContent="🔊 الصوت";
}
};