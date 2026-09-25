// Terminal Booting Sequence - Geomatics Engineering Edition
const terminalMessages = [
  "$ qgis --load-project geomatics_love.qgz",
  "Initializing spatial coordinate system... [WGS 84 / UTM Zone 44N]",
  "$ total-station --calibrate --station=\"Lamachaur_WRC\"",
  "[info] Verifying IOE WRC Pokhara Geomatics Engineering status... [OK]",
  "[info] Tracking GNSS Satellites: 18 Satellites Locked 🛰️",
  "[info] Levelling horizontal index to your heart... 00°00'00\" [LOCKED]",
  "[info] Scanning Pokhara date coordinates (Lakeside, Sarangkot, Pame, Begnas)... [FOUND]",
  "[warn] Magnetic declination anomaly: Compass points exclusively towards you 🧭",
  "$ python3 -m survey_feelings --surveyor=\"Yam_Chhetri_BGE\" --target=\"ThePrettiestGirl\"",
  "[success] RTK Fixed (Millimeter Precision): Distance to you = 0.000m ✨",
  "Rendering topographic love map to production..."
];

const terminalTextEl = document.getElementById("terminal-text");
const terminalOverlay = document.getElementById("terminal-loader");
const skipBtn = document.getElementById("skip-btn");
const appContainer = document.getElementById("app");

let msgIndex = 0;
let charIndex = 0;
let isBooting = true;

function typeTerminalLine() {
  if (!isBooting) return;
  if (msgIndex < terminalMessages.length) {
    const currentLine = terminalMessages[msgIndex];
    if (charIndex === 0) {
      const lineEl = document.createElement("div");
      lineEl.className = "terminal-line";
      lineEl.id = `line-${msgIndex}`;
      terminalTextEl.appendChild(lineEl);
    }

    const currentLineEl = document.getElementById(`line-${msgIndex}`);
    currentLineEl.textContent = currentLine.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex < currentLine.length) {
      setTimeout(typeTerminalLine, 18 + Math.random() * 18);
    } else {
      charIndex = 0;
      msgIndex++;
      terminalTextEl.scrollTop = terminalTextEl.scrollHeight;
      setTimeout(typeTerminalLine, 220);
    }
  } else {
    // Finished booting
    setTimeout(launchApp, 500);
  }
}

function launchApp() {
  isBooting = false;
  terminalOverlay.classList.add("fade-out");
  setTimeout(() => {
    terminalOverlay.classList.add("hidden");
    appContainer.classList.remove("hidden");
    startFloatingHearts();
  }, 600);
}

skipBtn.addEventListener("click", launchApp);

// Start terminal typing on load
window.addEventListener("DOMContentLoaded", () => {
  typeTerminalLine();
  initBackgroundCanvas();
});

// Runaway "NO" Button logic
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const teaseText = document.getElementById("tease-text");
const buttonZone = document.getElementById("button-zone");

const teasePhrases = [
  "Coordinate error! 'No' is out of bounds 🚫",
  "Total Station says: Target out of range 😂",
  "Traverse rejected: Zero tolerance for No 🥺",
  "GPS lost signal on the No button! 📡",
  "My theodolite is locked onto your YES! 👉👈",
  "Come on, let's explore Pokhara together! ✨",
  "Look how radiant that YES coordinate is 💖",
  "Azimuth out of range! Just click YES! 📍"
];

let teaseCount = 0;
let yesScale = 1;

function moveNoButton(e) {
  // Play escape sound
  playCuteBeep(220, 0.05);

  const zoneRect = buttonZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Pick random coordinates within bounds
  const maxX = zoneRect.width - btnRect.width - 20;
  const maxY = zoneRect.height - btnRect.height - 20;

  const randomX = Math.max(10, Math.floor(Math.random() * maxX));
  const randomY = Math.max(10, Math.floor(Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Update teasing text
  teaseText.textContent = teasePhrases[teaseCount % teasePhrases.length];
  teaseCount++;

  // Grow the Yes button slightly every time she tries to click No
  yesScale += 0.08;
  if (yesScale < 1.8) {
    yesBtn.style.transform = `scale(${yesScale})`;
  }
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Yes Button & Success Modal
const successScreen = document.getElementById("success-screen");
const dateForm = document.getElementById("date-form");
const finalTicket = document.getElementById("final-ticket");
const ticketVibe = document.getElementById("ticket-vibe");
const ticketDate = document.getElementById("ticket-date");

yesBtn.addEventListener("click", () => {
  playSuccessChime();
  launchConfetti();
  successScreen.classList.remove("hidden");
  
  // Set default minimum date to tomorrow
  const dateInput = document.getElementById("date-day");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split("T")[0];
  dateInput.value = tomorrow.toISOString().split("T")[0];
});

// Form Submission -> Show Date Ticket & Prepare WhatsApp Message
const whatsappSendBtn = document.getElementById("whatsapp-send-btn");
const myWhatsAppNumber = "9779764540987";

dateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const vibe = document.getElementById("date-type").value;
  const dateVal = document.getElementById("date-day").value;

  const formattedDate = new Date(dateVal).toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  ticketVibe.textContent = vibe;
  ticketDate.textContent = formattedDate;

  // Build the pre-filled cute WhatsApp message for Yam Chhetri
  const rawMessage = `Hey Yam! 🥰 I went through your survey map!\n\nI say YES to our date! 🥂✨\n📍 Plan: ${vibe}\n📅 Date: ${formattedDate}\n\nOur coordinates are locked in Pokhara! 💖`;
  const encodedText = encodeURIComponent(rawMessage);
  
  // api.whatsapp.com/send works on mobile app and desktop WhatsApp Web
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodedText}`;

  whatsappSendBtn.setAttribute("href", whatsappUrl);

  dateForm.classList.add("hidden");
  finalTicket.classList.remove("hidden");
  launchConfetti();
  playSuccessChime();

  // Instant direct navigation so popup blockers don't intercept it
  setTimeout(() => {
    window.location.href = whatsappUrl;
  }, 1000);
});

// Screenshot / Share Alert
document.getElementById("screenshot-btn").addEventListener("click", () => {
  const vibe = ticketVibe.textContent;
  const date = ticketDate.textContent;
  const copyText = `Hey Yam! I accepted our date for: ${vibe} on ${date} 💖`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText);
    alert("✨ Date coordinates copied to clipboard! You can send it directly to Yam! 📸");
  } else {
    alert("📸 Take a screenshot of this pass and send it to Yam! Can't wait! ❤️");
  }
});

// Web Audio API for cute 8-bit sound effects
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

function playCuteBeep(freq = 440, duration = 0.08) {
  if (!soundEnabled) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {}
}

function playSuccessChime() {
  if (!soundEnabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    setTimeout(() => playCuteBeep(freq, 0.2), index * 120);
  });
}

document.getElementById("audio-toggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  document.getElementById("audio-icon").textContent = soundEnabled ? "🎵" : "🔇";
});

// Canvas Floating Elements: Hearts, Coordinates, GPS Satellites in Background
let bgCanvas, bgCtx;
let floatingItems = [];

function initBackgroundCanvas() {
  bgCanvas = document.getElementById("bg-canvas");
  bgCtx = bgCanvas.getContext("2d");
  resizeBg();
  window.addEventListener("resize", resizeBg);
}

function resizeBg() {
  if (!bgCanvas) return;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

function startFloatingHearts() {
  const symbols = ["❤️", "✨", "📍", "🛰️", "🧭", "💖"];
  for (let i = 0; i < 28; i++) {
    floatingItems.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.7 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      char: symbols[Math.floor(Math.random() * symbols.length)]
    });
  }
  animateFloatingItems();
}

function animateFloatingItems() {
  if (!bgCtx) return;
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  floatingItems.forEach(item => {
    bgCtx.globalAlpha = item.opacity;
    bgCtx.font = `${item.size}px serif`;
    bgCtx.fillText(item.char, item.x, item.y);
    item.y -= item.speedY;
    if (item.y < -20) {
      item.y = bgCanvas.height + 20;
      item.x = Math.random() * bgCanvas.width;
    }
  });
  requestAnimationFrame(animateFloatingItems);
}

// Confetti Particle Explosion
let confettiCanvas, confettiCtx;
let confettiPieces = [];

function launchConfetti() {
  confettiCanvas = document.getElementById("confetti-canvas");
  confettiCtx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiPieces = [];

  const colors = ["#ff5e97", "#d846ef", "#00f2fe", "#05d550", "#ffbd2e", "#ff3366"];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.7) * 20,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      alpha: 1
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  if (!confettiCtx || confettiPieces.length === 0) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.alpha -= 0.007;

    if (p.alpha <= 0 || p.y > window.innerHeight) {
      confettiPieces.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.globalAlpha = p.alpha;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();
  }

  if (confettiPieces.length > 0) {
    requestAnimationFrame(updateConfetti);
  }
}
