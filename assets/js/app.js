let current = 1;
let selectedRatio = 0;
let teaStrength = 0;
let sugarStrength = 0;

const totalSteps = 5;

document.querySelectorAll(".tea-card").forEach(card=>{
card.onclick=()=>{
document.querySelectorAll(".tea-card")
.forEach(c=>c.classList.remove("active"));
card.classList.add("active");
selectedRatio=parseInt(card.dataset.ratio);
};
});

document.querySelectorAll("#teaStrength button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll("#teaStrength button")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
teaStrength=parseInt(btn.dataset.val);
};
});

document.querySelectorAll("#sugarStrength button").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll("#sugarStrength button")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
sugarStrength=parseInt(btn.dataset.val);
calculate();
};
});

document.getElementById("nextBtn").onclick=()=>{
if(current===1 && !selectedRatio) return alert("اختر الشاهي");
if(current===2 && !water.value) return alert("أدخل كمية الماء");

if(current===4){
generateReview();
}

if(current<totalSteps){
changeStep(current+1);
}
};

document.getElementById("backBtn").onclick=()=>{
if(current>1) changeStep(current-1);
};

function changeStep(step){
document.getElementById("step"+current).classList.remove("active");
current=step;
document.getElementById("step"+current).classList.add("active");
document.getElementById("progressBar").style.width=(current/totalSteps*100)+"%";
}

function calculate(){
let water=parseInt(document.getElementById("water").value)||0;
if(!selectedRatio||!water) return;

let tea=((water/1000)*selectedRatio)+teaStrength;
let sugar=((water/1000)*30)+sugarStrength;

document.getElementById("result").innerText=
`${tea.toFixed(1)} غ شاهي + ${sugar.toFixed(1)} غ سكر`;
}

function generateReview(){
let water=parseInt(document.getElementById("water").value)||0;
let tea=((water/1000)*selectedRatio)+teaStrength;
let sugar=((water/1000)*30)+sugarStrength;

document.getElementById("reviewBox").innerHTML=`
الماء: ${water} مل <br>
الشاهي: ${tea.toFixed(1)} غ <br>
السكر: ${sugar.toFixed(1)} غ
`;
}