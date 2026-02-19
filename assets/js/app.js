let selectedRatio = 0;
let strength = 0; // وزنة هي 0 افتراضياً
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
  // منع الانتقال بدون اختيار نوع
  if(step === 2 && selectedRatio === 0){
    alert("اختر نوع الشاهي أولاً");
    return;
  }

  // منع الانتقال بدون إدخال ماء
  if(step === 3){
    let water = parseInt(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("أدخل كمية ماء صحيحة");
      return;
    }
  }

  document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));
  document.getElementById("step"+step).classList.add("active");

  calculate();
}

function setStrength(value,btn){
  strength = value;

  document.querySelectorAll(".strength button")
    .forEach(b=>b.classList.remove("active-strength"));

  btn.classList.add("active-strength");

  calculate();
}

function calculate(){
  let water = parseInt(document.getElementById("water").value);
  if(!water || !selectedRatio) return;

  finalGrams = ((water/1000)*selectedRatio)+strength;

  document.getElementById("result").innerText =
    "النتيجة: "+ finalGrams.toFixed(1) +" غرام";
}

function startTimer(){
  if(!finalGrams) return;

  // منع تشغيل مؤقتين
  if(timer){
    clearInterval(timer);
    timer = null;
  }

  nextStep(4);

  let total = 22*60;
  let fill = document.getElementById("teaFill");

  timer = setInterval(()=>{
    let minutes = Math.floor(total/60);
    let seconds = total%60;

    document.getElementById("timeDisplay").innerText =
      `${minutes}:${seconds<10?"0":""}${seconds}`;

    let percent = ((22*60-total)/(22*60))*100;
    fill.style.height = percent+"%";

    total--;

    if(total < 0){
      clearInterval(timer);
      timer = null;
      document.getElementById("timeDisplay").innerText="جاهز ☕";
    }

  },1000);
}


/* تفعيل وزنة كديفلوت عند فتح الصفحة */
window.addEventListener("DOMContentLoaded",()=>{
  let defaultBtn = document.querySelector(".default-strength");
  if(defaultBtn){
    defaultBtn.classList.add("active-strength");
    strength = 0;
  }

  document.getElementById("water")
    .addEventListener("input",calculate);
});