alert("JS شغال");

let selectedRatio=0;

let selectedRatio=0;
let teaStrength=0;
let sugarStrength=0;
let timer=null;
let totalTime=60;

function scrollToCalc(){
 document.getElementById("calculator").scrollIntoView({behavior:"smooth"});
}

function nextStep(step){
 document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));
 document.getElementById("step"+step).classList.add("active");
}

function selectTea(card){
 document.querySelectorAll(".tea-card").forEach(c=>c.classList.remove("active-tea"));
 card.classList.add("active-tea");
 selectedRatio=parseInt(card.dataset.ratio);
}

function setTeaStrength(value,btn){
 teaStrength=value;
 document.querySelectorAll("#teaStrength button").forEach(b=>b.classList.remove("active-strength"));
 btn.classList.add("active-strength");
}

function setSugarStrength(value,btn){
 sugarStrength=value;
 document.querySelectorAll("#sugarStrength button").forEach(b=>b.classList.remove("active-strength"));
 btn.classList.add("active-strength");
}

function calculate(){
 let water=parseInt(document.getElementById("water").value);
 if(!water || !selectedRatio){
   alert("اختر نوع الشاهي وادخل كمية الماء");
   return;
 }

 let teaGrams=(water/1000)*selectedRatio + teaStrength;
 let sugarGrams=(water/1000)*30 + sugarStrength;

 document.getElementById("result").innerHTML=
 `تحتاج ${teaGrams.toFixed(1)} جم شاهي و ${sugarGrams.toFixed(1)} جم سكر`;
}

function startTimer(){
 nextStep(5);
 let time=totalTime;
 const fill=document.getElementById("teaFill");

 timer=setInterval(()=>{
   time--;

   let percent=((totalTime-time)/totalTime)*100;
   fill.style.height=percent+"%";

   let minutes=Math.floor(time/60);
   let seconds=time%60;
   document.getElementById("timeDisplay").innerText=
   minutes+":"+(seconds<10?"0"+seconds:seconds);

   if(time<=0){
     clearInterval(timer);
   }

 },1000);
}