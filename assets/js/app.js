const supabaseUrl = "https://mytkbckfwowfismibiny.supabase.co";
const supabaseKey = "YOUR_ANON_KEY_HERE";

let supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

/* =========================
   تسجيل دخول مجهول بصمت
========================= */

async function login(){
  await supabaseClient.auth.signInAnonymously();
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
    if(!teaType) return;
  }

  if(step === 3){
    const water = parseFloat(document.getElementById("water").value);
    if(!water || water <= 0) return;
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
   حفظ النتيجة (بصمت)
========================= */

async function saveResult(){

  const { data } = await supabaseClient.auth.getSession();
  if(!data.session) return;

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
        tea_grams: Number(finalWeight),
        sugar_grams: 0,
        water_liter: water / 1000,
        strength_level: "normal",
        steep_time_used: 22
      }
    ]);

  if(error){
    console.error("Insert error:", error);
  }
}

/* =========================
   المؤقت
========================= */

function startTimer(){

  if(timerRunning) return;

  const water = parseFloat(document.getElementById("water").value);
  if(!water) return;

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