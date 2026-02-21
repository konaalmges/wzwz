/* =========================
   Supabase Setup
========================= */

const supabaseUrl = "https://mytkbckfwowfismibiny.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGtiY2tmd293ZmlzbWliaW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1Mjg2MjksImV4cCI6MjA4NzEwNDYyOX0.P_Yg_9J8iC_Ot_Scff93vKPqS5o23fXgj2qWKalHK94";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentUser = null;

async function login(){
  const { data, error } = await supabase.auth.signInAnonymously();

  if(error){
    console.error("Login error:", error);
  } else {
    currentUser = data.user;
    console.log("Logged in ✅");
  }
}

login();

/* =========================
   App Logic (كودك الأصلي)
========================= */

let currentStep = 1;
let strengthModifier = 0;
let timerRunning = false;

function nextStep(step){

  // 🔥 منع الانتقال لو ما فيه ماء في الخطوة الأولى
  if(step === 2){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("أدخل كمية ماء أولاً 🚨");
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

  // 🔥 نحفظ النتيجة بعد الحساب
  saveResult(finalWeight, strengthModifier);
}

document.getElementById("water")
  .addEventListener("input",calculate);

/* =========================
   حفظ النتيجة
========================= */

async function saveResult(teaValue, sugarValue){

  if(!currentUser){
    console.log("المستخدم غير جاهز بعد...");
    return;
  }

  const { error } = await supabase
    .from("results")
    .insert([
      {
        user_id: currentUser.id,
        tea: Number(teaValue),
        sugar: Number(sugarValue)
      }
    ]);

  if(error){
    console.error("Insert error:", error);
  } else {
    console.log("تم الحفظ ✅");
  }
}

/* =========================
   المؤقت (بدون تغيير)
========================= */

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
      display.textContent="جاهز ☕";
      if(navigator.vibrate) navigator.vibrate(500);
      timerRunning=false;
    }
  },1000);
}

function scrollToCalc(){
  document.getElementById("calculator")
  .scrollIntoView({behavior:"smooth"});
}