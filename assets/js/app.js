window.addEventListener("scroll",function(){
  document.getElementById("navbar")
  .classList.toggle("scrolled",window.scrollY>50);
}); let currentStep = 1;
let strengthModifier = 0;
let timerRunning = false;

function nextStep(step){

  // 🔒 منع الانتقال من خطوة الماء بدون إدخال صحيح
  if(currentStep === 2){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("أدخل كمية ماء صحيحة أولاً ☕");
      return;
    }
  }

  // 🔒 منع الانتقال من خطوة القوة بدون حساب
  if(currentStep === 3){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("لا يمكن بدء الخدرة بدون ماء ☕");
      return;
    }
  }

  document.getElementById("step"+currentStep).classList.remove("active");
  currentStep = step;
  document.getElementById("step"+currentStep).classList.add("active");
}

function setStrength(mod,btn){
  strengthModifier = mod;

  document.querySelectorAll(".strength button")
    .forEach(b=>b.classList.remove("active-strength"));

  btn.classList.add("active-strength");
  calculate();
}

function calculate(){
  const teaRatio = parseFloat(document.getElementById("teaType").value);
  const water = parseFloat(document.getElementById("water").value);
  if(!water) return;

  let baseWeight = (water/1000)*teaRatio;
  let finalWeight = baseWeight + strengthModifier;

  document.getElementById("result").innerText =
    "النتيجة: "+finalWeight.toFixed(1)+" غرام";
}

document.getElementById("water")
  .addEventListener("input",calculate);

function startTimer(){
  if(timerRunning) return;
  timerRunning=true;

  nextStep(4);

  let total = 22*60;
  let remaining = total;
  const display = document.getElementById("timeDisplay");
  const fill = document.getElementById("teaFill");

  const interval = setInterval(()=>{
    remaining--;

    let m=Math.floor(remaining/60);
    let s=remaining%60;

    display.textContent=
      String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

    let progress=((total-remaining)/total)*100;
    fill.style.height=progress+"%";

    if(remaining<=0){
      clearInterval(interval);
      display.textContent="بالعافيهه يابطل ☕";
      if(navigator.vibrate) navigator.vibrate(500);
      timerRunning=false;
    }
  },1000);
}

function scrollToCalc(){
  document.getElementById("calculator")
  .scrollIntoView({behavior:"smooth"});

}

