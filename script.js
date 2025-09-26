let running = false;
let runStart;
let bestTime = parseFloat(localStorage.getItem("bestTime")) || null;
let carSpeed = 0;
let carDirection = new THREE.Vector3(0, 0, -1); // Car facing along the negative Z axis
let carRotationSpeed = 0.02;

const startBtn = document.getElementById("startBtn");
const bestTimeSpan = document.getElementById("bestTime");
const currTimeSpan = document.getElementById("currTime");

// Initialize best time display
if (bestTime) {
  bestTimeSpan.textContent = bestTime.toFixed(3);
} else {
  bestTimeSpan.textContent = "—";
}

// Create THREE.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Car and track setup (basic placeholders)
const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

// Simple track (replace with your poly track or 3D model)
const trackGeometry = new THREE.PlaneGeometry(200, 200);
const trackMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = -Math.PI / 2;  // Make the track flat
scene.add(track);

// Set camera position
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(car.position); // Make camera follow car

// Handle keyboard inputs for car movement
let keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// Game Loop
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

  // Initialize car position and movement (reset on start)
  car.position.set(0, 0.25, 0); // Starting position
  car.rotation.set(0, 0, 0);     // Reset rotation
  carSpeed = 0;  // Reset car speed

  // Start game loop
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!running) return;

  const elapsed = (performance.now() - runStart) / 1000;
  updateCarMovement();
  updateCamera();

  // Update current time display
  currTimeSpan.textContent = elapsed.toFixed(3);

  // Render scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

function updateCarMovement() {
  // Car controls: W (forward), S (backward), A (turn left), D (turn right)
  if (keys["w"] || keys["ArrowUp"]) {
    carSpeed += 0.05; // Accelerate
  }
  if (keys["s"] || keys["ArrowDown"]) {
    carSpeed -= 0.05; // Decelerate (reverse)
  }
  if (keys["a"] || keys["ArrowLeft"]) {
    car.rotation.y += carRotationSpeed; // Turn left
  }
  if (keys["d"] || keys["ArrowRight"]) {
    car.rotation.y -= carRotationSpeed; // Turn right
  }

  // Apply friction to slow down
  if (carSpeed > 0) {
    carSpeed -= 0.01;
  }
  if (carSpeed < 0) {
    carSpeed = 0;
  }

  // Move the car forward/backward in the direction it’s facing
  car.position.x += Math.sin(car.rotation.y) * carSpeed;
  car.position.z += Math.cos(car.rotation.y) * carSpeed;
}

function updateCamera() {
  // Camera follows the car with a slight offset
  camera.position.x = car.position.x + 3 * Math.sin(car.rotation.y);
  camera.position.z = car.position.z + 3 * Math.cos(car.rotation.y);
  camera.position.y = car.position.y + 2;

  camera.lookAt(car.position); // Keep the camera focused on the car
}

function endRun(elapsed) {
  running = false;
  startBtn.disabled = false;
  startBtn.textContent = "▶️ Play Again";

  if (!bestTime || elapsed < bestTime) {
    bestTime = elapsed;
    localStorage.setItem("bestTime", bestTime.toFixed(3));

