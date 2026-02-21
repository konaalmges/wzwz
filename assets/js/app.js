let seconds = 1320
let interval = null
let running = true

function goTo(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"))
  document.getElementById(id).classList.add("active")
}

function calculate() {
  const water = parseInt(document.getElementById("water").value)
  const sugarLevel = document.getElementById("sugar").value
  const teaLevel = document.getElementById("tea").value

  let sugar = (water / 1000) * 50
  let tea = (water / 1000) * 13

  if (sugarLevel === "قليل") sugar *= 0.7
  if (sugarLevel === "ثقيل") sugar *= 1.3

  if (teaLevel === "خفيف") tea *= 0.8
  if (teaLevel === "ثقيل") tea *= 1.2

  document.getElementById("sugarResult").innerText = sugar.toFixed(1) + " جرام"
  document.getElementById("teaResult").innerText = tea.toFixed(1) + " جرام"
}

document.querySelectorAll("select").forEach(el => {
  el.addEventListener("change", calculate)
})

function startTimer() {
  goTo("brew")
  seconds = 1320
  running = true
  updateTimer()
  interval = setInterval(tick, 1000)
}

function tick() {
  if (!running) return
  if (seconds <= 0) {
    clearInterval(interval)
    goTo("done")
    return
  }
  seconds--
  updateTimer()
}

function updateTimer() {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0")
  const sec = String(seconds % 60).padStart(2, "0")
  document.getElementById("timer").innerText = min + ":" + sec
}

function toggleTimer() {
  running = !running
}

function finishEarly() {
  clearInterval(interval)
  goTo("done")
}

function toggleSound() {
  const audio = document.getElementById("brewSound")
  audio.paused ? audio.play() : audio.pause()
}

calculate()