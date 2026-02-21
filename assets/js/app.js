const App={
  go(id){
    document.querySelectorAll(".scene")
      .forEach(s=>s.classList.remove("active"))
    document.getElementById(id).classList.add("active")
  }
}

/* ===== Calculator ===== */

const Calculator={
  calculate(){
    const ml=parseFloat(document.getElementById("waterInput").value)
    const strength=parseFloat(document.getElementById("strengthSelect").value)
    const liters=ml/1000

    const sugar=(liters*50*strength).toFixed(1)
    const tea=(liters*13*strength).toFixed(1)

    document.getElementById("resultBox").innerHTML=
      `سكر: ${sugar} جرام <br> شاهي: ${tea} جرام`

    localStorage.setItem("lastWaznah",JSON.stringify({ml,strength}))
    TeaVisual.ripple()
  }
}

/* ===== Tea Ripple ===== */

const teaCanvas=document.getElementById("teaCanvas")
const tctx=teaCanvas.getContext("2d")
let waveOffset=0

const TeaVisual={
  draw(){
    tctx.clearRect(0,0,300,200)
    tctx.fillStyle="#6b3e17"
    tctx.beginPath()
    tctx.moveTo(0,120)

    for(let x=0;x<=300;x++){
      let y=120+Math.sin((x+waveOffset)*0.05)*5
      tctx.lineTo(x,y)
    }

    tctx.lineTo(300,200)
    tctx.lineTo(0,200)
    tctx.closePath()
    tctx.fill()

    waveOffset+=1
    requestAnimationFrame(this.draw.bind(this))
  },
  ripple(){
    waveOffset+=20
  }
}
TeaVisual.draw()

/* ===== Steam ===== */

const steamCanvas=document.getElementById("steamCanvas")
const sctx=steamCanvas.getContext("2d")
let particles=[]

for(let i=0;i<40;i++){
  particles.push({
    x:150+Math.random()*20-10,
    y:250,
    size:4+Math.random()*6,
    speed:1+Math.random()
  })
}

function drawSteam(){
  sctx.clearRect(0,0,300,300)
  sctx.fillStyle="rgba(255,255,255,0.15)"
  particles.forEach(p=>{
    sctx.beginPath()
    sctx.arc(p.x,p.y,p.size,0,Math.PI*2)
    sctx.fill()
    p.y-=p.speed
    if(p.y<0) p.y=250
  })
  requestAnimationFrame(drawSteam)
}
drawSteam()

/* ===== Timer ===== */

const Timer={
  total:1320,
  current:1320,
  interval:null,
  running:false,

  start(){
    this.current=this.total
    this.running=true
    this.update()
    this.interval=setInterval(()=>this.tick(),1000)
  },

  tick(){
    if(!this.running)return
    if(this.current<=0){
      clearInterval(this.interval)
      return
    }
    this.current--
    this.update()
  },

  update(){
    const m=String(Math.floor(this.current/60)).padStart(2,"0")
    const s=String(this.current%60).padStart(2,"0")
    document.getElementById("timerText").innerText=m+":"+s
    document.getElementById("progressRing").style.strokeDashoffset=
      722-(this.current/this.total)*722
  },

  toggle(){ this.running=!this.running },

  reset(){
    clearInterval(this.interval)
    this.interval=null
    this.current=this.total
    this.update()
  }
}

/* ===== Tea DB ===== */

const TeaDB=[
  {name:"Lipton",country:"UK"},
  {name:"Twinings",country:"UK"},
  {name:"Tetley",country:"UK"},
  {name:"Brooke Bond",country:"UK"},
  {name:"Al-Kbous",country:"Yemen"},
  {name:"Rabea",country:"Saudi Arabia"},
  {name:"Ahmad Tea",country:"UK"}
]

TeaDB.forEach(t=>{
  document.getElementById("teaCompanies").innerHTML+=`
    <div class="article">
      <h3>${t.name}</h3>
      <p>${t.country}</p>
    </div>
  `
})