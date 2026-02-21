const supabaseUrl = "https://mytkbckfwowfismibiny.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dGtiY2tmd293ZmlzbWliaW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1Mjg2MjksImV4cCI6MjA4NzEwNDYyOX0.P_Yg_9J8iC_Ot_Scff93vKPqS5o23fXgj2qWKalHK94";

let supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* =========================
   تسجيل دخول مجهول مضمون
========================= */

async function login(){

  const { error } = await supabaseClient.auth.signInAnonymously();

  if(error){
    alert("Login error ❌\n\n" + JSON.stringify(error, null, 2));
    return;
  }

  const { data } = await supabaseClient.auth.getSession();

  if(data.session){
    alert("تم تسجيل الدخول ✅");
    console.log("Logged in:", data.session.user.id);
  } else {
    alert("No session created ❌");
  }
}

login();

/* =========================
   كودك الأصلي
========================= */

let currentStep = 1;
let strengthModifier = 0;
let timerRunning = false;

function nextStep(step){

  if(step === 2){
    const teaType = document.getElementById("teaType").value;
    if(!teaType){
      alert("اختر نوع الشاهي أولاً");
      return;
    }
  }

  if(step === 3){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0){
      alert("أدخل كمية ماء صحيحة");
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

/* =========================
   حفظ النتيجة
========================= */

async function saveResult(){

  const { data } = await supabaseClient.auth.getSession();

  if(!data.session){
    alert("Session not ready ❌");
    return;
  }

  const user = data.session.user;

  const teaRatio = parseFloat(document.getElementById("teaType").value);
  const water = parseFloat(document.getElementById("water").value);

  let baseWeight = (water/1000)*teaRatio;
  let finalWeight = baseWeight + strengthModifier;

  const { error } = await supabaseClient
    .from("results")
    .insert([
      {
        user_id: user.id,
        tea: Number(finalWeight),
        sugar: 0
      }
    ]);

  if(error){
    alert("Insert error ❌\n\n" + JSON.stringify(error, null, 2));
    console.error("Insert error:", error);
  } else {
    alert("تم الحفظ في الداتابيس ✅🔥");
    console.log("Saved successfully");
  }
}

/* =========================
   المؤقت
========================= */

function startTimer(){

  if(timerRunning) return;

  const water = parseFloat(document.getElementById("water").value);
  if(!water){
    alert("احسب الكمية أولاً");
    return;
  }

  saveResult();

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