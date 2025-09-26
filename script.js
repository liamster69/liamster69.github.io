// Already in script.js
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  if (!running) {
    startRun();
    startBtn.disabled = true;
    startBtn.textContent = "🏁 Racing...";
  }
});

function startRun() {
  running = true;
  runStart = performance.now();
  carPos.set(0, 0.5, 0);
  carDir.set(0, 0, 1);
  carSpeed = 0;
  carGroup.position.copy(carPos);
}

function endRun(elapsed) {
  running = false;
  startBtn.disabled = false;
  startBtn.textContent = "▶️ Play Again";

  if (!bestTime || elapsed < parseFloat(bestTime)) {
    localStorage.setItem("bestTime", elapsed.toFixed(3));
    bestTime = elapsed.toFixed(3);
    bestTimeSpan.textContent = bestTime;
    alert(`🏆 New Record! Time: ${elapsed.toFixed(3)}s`);
  } else {
    alert(`⏱️ Run complete! Time: ${elapsed.toFixed(3)}s`);
  }
}
