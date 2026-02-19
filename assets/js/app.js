let selectedRatio = 0;
let strength = 0;
let finalGrams = 0;
let timer;

function scrollToCalc(){
  document.getElementById("calculator").scrollIntoView({behavior:"smooth"});
}

function selectTea(card){
  document.querySelectorAll(".tea-card").forEach(c=>c.classList.remove("active-tea"));
  card.classList.add("active-tea");
  selectedRatio = parseInt(card.dataset.ratio);
}

function nextStep(step){
  document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));
  document.getElementById("step"+step).classList.add("active");
}

function setStrength(value,btn){
  strength = value;
  document.querySelectorAll(".strength button").forEach(b=>b.style.opacity=".6");
  btn.style.opacity="1";
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
    if(total<0){
      clearInterval(timer);
      document.getElementById("timeDisplay").innerText="جاهز ☕";
    }
  },1000);
}