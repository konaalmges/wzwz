/* ================================
   WZWZ TEA APP
   Clean Professional Version
================================ */

let state = {
  company: null,
  strength: 0,
  quickMode: false
};

const companies = {
  rabea: { name: "ربيع", baseTime: 22 },
  kabous: { name: "كبوس", baseTime: 23 },
  lipton: { name: "ليبتون", baseTime: 21 },
  alghazalain: { name: "الغزالين", baseTime: 24 },
  safa: { name: "صفا", baseTime: 22 },
  harith: { name: "الحارث", baseTime: 23 }
};

/* ================================
   STEP NAVIGATION
================================ */

function nextStep(stepId){
  document.querySelectorAll(".step").forEach(step=>{
    step.classList.remove("active");
  });

  document.getElementById(stepId).classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ================================
   SELECT COMPANY
================================ */

function selectCompany(key, btn){
  state.company = key;

  document.querySelectorAll(".company-card").forEach(card=>{
    card.classList.remove("active-card");
  });

  btn.classList.add("active-card");

  nextStep("step2");
  saveState();
}

/* ================================
   SET STRENGTH
================================ */

function setTeaStrength(value, btn){
  state.strength = value;

  document.querySelectorAll("#teaStrength button").forEach(b=>{
    b.classList.remove("active-strength");
  });

  btn.classList.add("active-strength");

  nextStep("step3");
  saveState();
}

/* ================================
   QUICK MODE
================================ */

function toggleQuickMode(){
  state.quickMode = !state.quickMode;

  const btn = document.getElementById("quickBtn");

  if(state.quickMode){
    btn.classList.add("active-quick");
  } else {
    btn.classList.remove("active-quick");
  }

  saveState();
}

/* ================================
   CALCULATE RESULT
================================ */

function calculateTea(){

  if(!state.company){
    alert("اختر نوع الشاهي أولاً");
    return;
  }

  let baseTime = companies[state.company].baseTime;

  let finalTime = baseTime + state.strength;

  if(state.quickMode){
    finalTime -= 3;
  }

  if(finalTime < 15){
    finalTime = 15;
  }

  const resultBox = document.getElementById("resultBox");

  resultBox.innerHTML = `
    <h3>النتيجة</h3>
    <p>شركة: ${companies[state.company].name}</p>
    <p>مدة الغلي: ${finalTime} دقيقة</p>
    ${state.quickMode ? "<p>وضع سريع مفعل ⚡</p>" : ""}
  `;

  nextStep("step4");
}

/* ================================
   RESET
================================ */

function resetAll(){
  state = {
    company: null,
    strength: 0,
    quickMode: false
  };

  localStorage.removeItem("teaState");
  location.reload();
}

/* ================================
   SAVE / LOAD
================================ */

function saveState(){
  localStorage.setItem("teaState", JSON.stringify(state));
}

function loadState(){
  const saved = localStorage.getItem("teaState");

  if(saved){
    state = JSON.parse(saved);
  }
}

loadState();