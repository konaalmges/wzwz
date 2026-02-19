/* ================= NAVBAR SCROLL ================= */
window.addEventListener("scroll", function () {
  document.getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

/* ================= REVEAL ON SCROLL ================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(el=>{
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ================= GLOBAL STATE ================= */
let currentStep = 1;
let strengthModifier = 0;
let timerRunning = false;
let selectedRatio = null;

/* ================= TEA SELECTION ================= */
function selectTea(card){

  document.querySelectorAll(".tea-card")
    .forEach(c=>c.classList.remove("active-tea"));

  card.classList.add("active-tea");

  selectedRatio = parseFloat(card.dataset.ratio);
}

/* ================= STEP CONTROL ================= */
function nextStep(step){

  // منع الانتقال بدون اختيار نوع
  if(currentStep === 1){
    if(!selectedRatio){
      return;
    }
  }

  // منع الانتقال بدون ماء صحيح
  if(currentStep === 2){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0){
      document.getElementById("water").focus();
      return;
    }
  }

  document.getElementById("step"+currentStep).classList.remove("active");
  currentStep = step;
  document.getElementById("step"+currentStep).classList.add("active");
}

/* ================= STRENGTH ================= */
function setStrength(mod,btn){

  const water = parseFloat(document.getElementById("water").value);
  if(!water || water <= 0){
    document.getElementById("water").focus();
    return;
  }

  strengthModifier = mod;

  document.querySelectorAll(".strength button")
    .forEach(b=>b.classList.remove("active-strength"));

  btn.classList.add("active-strength");
  calculate();
}

/* ================= CALCULATE ================= */
function calculate(){

  const water = parseFloat(document.getElementById("water").value);

  if(!selectedRatio || !water || water <= 0){
    document.getElementById("result").innerText =
      "النتيجة: 0 غرام";
    return;
  }

  let baseWeight = (water/1000) * selectedRatio;
  let finalWeight = baseWeight + strengthModifier;

  document.getElementById("result").innerText =
    "النتيجة: " + finalWeight.toFixed(1) + " غرام";
}

document.getElementById("water")
  .addEventListener("input", calculate);

/* ================= TIMER ================= */
function startTimer(){

  const water = parseFloat(document.getElementById("water").value);

  if(!selectedRatio || !water || water <= 0) return;
  if(timerRunning) return;

  timerRunning = true;

  nextStep(4);

  let total = 22 * 60;
  let remaining = total;

  const display = document.getElementById("timeDisplay");
  const fill = document.getElementById("teaFill");

  display.textContent = "22:00";
  fill.style.height = "0%";

  const interval = setInterval(()=>{

    remaining--;

    let m = Math.floor(remaining/60);
    let s = remaining%60;

    display.textContent =
      String(m).padStart(2,"0")+":"+
      String(s).padStart(2,"0");

    let progress = ((total-remaining)/total)*100;
    fill.style.height = progress+"%";

    if(remaining <= 10){
      display.style.color = "#e8c98a";
      display.style.transform = "scale(1.05)";
    }

    if(remaining <= 0){
      clearInterval(interval);
      display.textContent = "بالعافية ☕";
      display.style.transform = "scale(1)";
      if(navigator.vibrate) navigator.vibrate(600);
      timerRunning = false;
    }

  },1000);
}

/* ================= SCROLL TO CALC ================= */
function scrollToCalc(){
  document.getElementById("calculator")
    .scrollIntoView({behavior:"smooth"});
}