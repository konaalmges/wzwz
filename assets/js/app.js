let total=1320
let current=total
let interval
let running=true

function goTo(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))
 document.getElementById(id).classList.add("active")
}

function startTimer(){
 goTo("brew")
 fillTea()
 current=total
 update()
 interval=setInterval(tick,1000)
}

function fillTea(){
 const tea=document.getElementById("teaLiquid")
 tea.style.height="60"
 setTimeout(()=>{tea.style.height="70px"},100)
}

function tick(){
 if(!running)return
 if(current<=0){clearInterval(interval);return}
 current--
 update()
}

function update(){
 const min=String(Math.floor(current/60)).padStart(2,"0")
 const sec=String(current%60).padStart(2,"0")
 document.getElementById("timerText").innerText=min+":"+sec

 const progress=document.getElementById("progress")
 const circumference=722
 progress.style.strokeDashoffset=circumference-(current/total)*circumference
}

function toggleTimer(){running=!running}

function toggleSound(){
 const audio=document.getElementById("brewSound")
 audio.paused?audio.play():audio.pause()
}