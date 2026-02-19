let selectedRatio = 0;
let strength = 0;
let finalGrams = 0;
let timer = null;

function scrollToCalc(){
  document.getElementById("calculator").scrollIntoView({behavior:"smooth"});
}

function selectTea(card){
  document.querySelectorAll(".tea-card").forEach(c=>c.classList.remove("active-tea"));
  card.classList.add("active-tea");
  selectedRatio = parseInt(card.dataset.ratio);
  calculate();
}

function nextStep(step){
  if(step===2 && selectedRatio===0){
    alert("اختر نوع الشاهي أولاً");
    return;
  }

  if(step===3){
    let water=parseInt(document.getElementById("water").value);
    if(!water||water<=0){
      alert("أدخل كمية ماء صحيحة");
      return;
    }
  }

  document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));
  document.getElementById("step"+step).classList.add("active");
  calculate();
}

function setStrength(value,btn){
  strength=value;
  document.querySelectorAll(".strength button")
  .forEach(b=>b.classList.remove("active-strength"));
  btn.classList.add("active-strength");
  calculate();
}

function calculate(){
  let water=parseInt(document.getElementById("water").value);
  if(!water||!selectedRatio)return;
  finalGrams=((water/1000)*selectedRatio)+strength;
  document.getElementById("result").innerText=
  "النتيجة: "+finalGrams.toFixed(1)+" غرام";
}

function startTimer(){
  if(!finalGrams)return;

  if(timer){clearInterval(timer);}

  nextStep(4);

  let total=22*60;
  let fill=document.getElementById("teaFill");

  timer=setInterval(()=>{
    let m=Math.floor(total/60);
    let s=total%60;
    document.getElementById("timeDisplay").innerText=
    `${m}:${s<10?"0":""}${s}`;

    let percent=((22*60-total)/(22*60))*100;
    fill.style.height=percent+"%";

    total--;

    if(total<0){
      clearInterval(timer);
      document.getElementById("timeDisplay").innerText="جاهز ☕";
    }
  },1000);
}

window.addEventListener("DOMContentLoaded",()=>{
  let def=document.querySelector(".default-strength");
  if(def) def.classList.add("active-strength");

  document.getElementById("water")
  .addEventListener("input",calculate);
});