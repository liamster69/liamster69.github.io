let running = false;
let bestTime = localStorage.getItem("bestTime") || null;
const bestTimeSpan = document.getElementById("bestTime");
const startBtn = document.getElementById('startBtn');

// Create a debug container on the page to display debug info
const debugContainer = document.createElement('div');
debugContainer.style.position = 'absolute';
debugContainer.style.top = '20px';
debugContainer.style.left = '20px';
debugContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
debugContainer.style.color = 'white';
debugContainer.style.padding = '10px';
debugContainer.style.fontSize = '14px';
debugContainer.style.zIndex = '1000';  // Ensure it’s on top
document.body.appendChild(debugContainer);

function logDebug(message) {
  debugContainer.innerHTML = message;  // Show debug messages on the page
}

// Event listener for the start button
startBtn.addEventListener('click', () => {
  alert('Button clicked!');  // Alert when button is clicked
  logDebug('Button clicked!');  // Show on page too

  if (!running) {
    startRun();  // Start the game
    startBtn.disabled = true;  // Disable the button while running
    startBtn.textContent = '🏁 Racing...';  // Change the button text
    logDebug('Game started!');
  }
});

function startRun() {
  running = true;
  alert('Running: true');
  logDebug('Running: true');
  let runStart = performance.now();

  // Simulate a car running (replace with your actual game logic)
  setTimeout(() => {
    let elapsed = performance.now() - runStart;
    endRun(elapsed);
  }, 3000);  // Simulate a 3-second race
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
    logDebug(`🏆 New Record! Time: ${elapsed.toFixed(3)}s`);
  } else {
    alert(`⏱️ Run complete! Time: ${elapsed.toFixed(3)}s`);
    logDebug(`⏱️ Run complete! Time: ${elapsed.toFixed(3)}s`);
  }
}
