/* ===================================
   WAZNAH - Professional Script
=================================== */

let selectedTeaRatio = 20;
let teaStrength = 0;
let sugarStrength = 0;
let baseTea = 0;
let baseSugar = 0;
let timerInterval = null;
let totalSeconds = 22 * 60;

/* ===================================
   HERO BUTTON SCROLL
=================================== */

function scrollToCalc(){
  document.getElementById("calculator")
    .scrollIntoView({ behavior: "smooth" });
}

/* ===================================
   STEP NAVIGATION
=================================== */

function nextStep(stepNumber){
  document.querySelectorAll(".step").forEach(step=>{
    step.classList.remove("active");
  });

  document.getElementById("step"+stepNumber)
    .classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===================================
   SELECT TEA TYPE
=================================== */

function selectTea(element){
  document.querySelectorAll(".tea-card")
    .forEach(card => card.classList.remove("active-tea"));

  element.classList.add("active-tea");

  selectedTeaRatio = parseInt(element.dataset.ratio);
}

/* ===================================
   STRENGTH SELECTION
=================================== */

function setTeaStrength(value, btn){
  teaStrength = value;

  document.querySelectorAll("#teaStrength button")
    .forEach(b=>b.classList.remove("active-strength"));

  btn.classList.add("active-strength");

  calculateResult();
}

function setSugarStrength(value, btn){
  sugarStrength = value;

  document.querySelectorAll("#sugarStrength button")
    .forEach(b=>b.classList.remove("active-strength"));

  btn.classList.add("active-strength");

  calculateResult();
}

/* ===================================
   CALCULATION
=================================== */

function calculateResult(){

  const water = parseInt(document.getElementById("water").value);

  if(!water || water <= 0){
    return;
  }

  baseTea = (water / 1000) * selectedTeaRatio;
  baseSugar = (water / 1000) * 40;

  let finalTea = Math.max(0, baseTea + teaStrength);
  let finalSugar = Math.max(0, baseSugar + sugarStrength);

  document.getElementById("result").innerText =
    `النتيجة: ${finalTea.toFixed(1)} غرام شاهي + ${finalSugar.toFixed(1)} غرام سكر`;
}

/* ===================================
   TIMER
=================================== */

function startTimer(){

  nextStep(5);

  let seconds = totalSeconds;

  timerInterval = setInterval(()=>{

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    document.getElementById("timeDisplay").innerText =
      `${String(minutes).padStart(2,'0')}:${String(remainingSeconds).padStart(2,'0')}`;

    let progress = ((totalSeconds - seconds) / totalSeconds) * 100;
    document.getElementById("teaFill").style.height = progress + "%";

    if(seconds <= 0){
      clearInterval(timerInterval);
      document.getElementById("timeDisplay").innerText = "جاهز ☕";
    }

    seconds--;

  },1000);
}