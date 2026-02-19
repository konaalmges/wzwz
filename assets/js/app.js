/* =========================
   WAZNAH FULL VERSION
========================= */

let selectedRatio = 0;

/* الشاهي */
let teaStrength = 0;
let teaGrams = 0;

/* السكر */
let sugarStrength = 0;
let sugarGrams = 0;

let timer = null;

/* =========================
   تنقل
========================= */

function scrollToCalc(){
  document.getElementById("calculator")
  .scrollIntoView({behavior:"smooth"});
}

function nextStep(step){

  if(step === 2 && selectedRatio === 0){
    alert("اختر نوع الشاهي أولاً");
    return;
  }

  if(step === 3){
    let water = parseInt(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("أدخل كمية ماء صحيحة");
      return;
    }
  }

  document.querySelectorAll(".step")
  .forEach(s => s.classList.remove("active"));

  document.getElementById("step" + step)
  .classList.add("active");

  calculate();
}

/* =========================
   اختيار نوع
========================= */

function selectTea(card){
  document.querySelectorAll(".tea-card")
  .forEach(c => c.classList.remove("active-tea"));

  card.classList.add("active-tea");
  selectedRatio = parseInt(card.dataset.ratio);

  calculate();
}

/* =========================
   وزن الشاهي
========================= */

function setTeaStrength(value, btn){
  teaStrength = value;

  document.querySelectorAll("#teaStrength button")
  .forEach(b => b.classList.remove("active-strength"));

  btn.classList.add("active-strength");

  calculate();
}

/* =========================
   وزن السكر
========================= */

function setSugarStrength(value, btn){
  sugarStrength = value;

  document.querySelectorAll("#sugarStrength button")
  .forEach(b => b.classList.remove("active-strength"));

  btn.classList.add("active-strength");

  calculate();
}

/* =========================
   الحساب
========================= */

function calculate(){

  let water = parseInt(document.getElementById("water").value);
  if(!water || !selectedRatio) return;

  /* حساب الشاهي */
  teaGrams = ((water / 1000) * selectedRatio) + teaStrength;

  /* قاعدة السكر 30غ لكل لتر */
  sugarGrams = ((water / 1000) * 30) + sugarStrength;

  /* حماية من القيم السالبة */
  if(teaGrams < 0) teaGrams = 0;
  if(sugarGrams < 0) sugarGrams = 0;

  document.getElementById("result").innerText =
    `النتيجة: ${teaGrams.toFixed(1)} غرام شاهي + ${sugarGrams.toFixed(1)} غرام سكر`;
}

/* =========================
   المؤقت
========================= */

function startTimer(){

  if(teaGrams <= 0){
    alert("احسب الكمية أولاً");
    return;
  }

  if(timer){
    clearInterval(timer);
    timer = null;
  }

  nextStep(5);
let khadraTime = 5; // غير الرقم هنا متى ما تبي
let total = khadraTime * 60;
  let fill = document.getElementById("teaFill");

  timer = setInterval(() => {

    let m = Math.floor(total / 60);
    let s = total % 60;

    document.getElementById("timeDisplay").innerText =
      `${m}:${s < 10 ? "0" : ""}${s}`;

    let percent = ((22*60 - total) / (22*60)) * 100;
    fill.style.height = percent + "%";

    total--;

    if(total < 0){
      clearInterval(timer);
      timer = null;
      document.getElementById("timeDisplay").innerText = "جاهز ☕";
    }

  },1000);
}

/* =========================
   التهيئة
========================= */

window.addEventListener("DOMContentLoaded",()=>{

  let defaultTea = document.querySelector(".default-tea");
  if(defaultTea){
    defaultTea.classList.add("active-strength");
  }

  let defaultSugar = document.querySelector(".default-sugar");
  if(defaultSugar){
    defaultSugar.classList.add("active-strength");
  }

  document.getElementById("water")
  .addEventListener("input",calculate);

});