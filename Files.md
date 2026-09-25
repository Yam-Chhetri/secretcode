# Codebase Map: Geomatics Crush Date-Ask Web App 💖

## 📂 Directory Tree

```
Y:\Confession\
├── Work_Step.md       # Implementation steps & checklist
├── Files.md           # Architecture directory tree & component index
├── README.md          # Project showcase, features & geomatics details
├── index.html         # Main web application structure & semantic layout
├── style.css          # Dark-mode developer aesthetic, gradients, neon glows, responsive layouts
└── script.js          # Interactive GNSS terminal typing, runaway button, audio synth, confetti canvas
```

---

## 📄 File Details & Component Overview

### 1. [`index.html`](file:///Y:/Confession/index.html)
- **`<div id="terminal-loader">`**: Interactive terminal simulation window checking IOE WRC Pokhara Geomatics status, GNSS satellite fix, and feelings survey.
- **`<header class="status-bar">`**: Coordinate pill (`UTM 44N • RTK Fixed`), live status pulse indicator, and sound vibe toggle.
- **`<section class="hero-section">`**: Greeting with wave emoji, spatial code snippet by Yam Chhetri (BGE, WRC Pokhara), and smooth CTA anchor.
- **`<section class="specs-section">`**: Candidate profile cards (Lakeside Topographic Chai & Coffee Pipeline, Pokhara Scooter Traverse API, Drone Photogrammetry & Aesthetic Portraits, Date Itinerary GIS Engine).
- **`<section class="changelog-section">`**: Field survey notes highlighting reasons for asking them out (`LOCKED`, `CALIBRATED`, `OPTIMIZED`).
- **`<section id="the-big-ask">`**: The interactive proposal card featuring the YES / Runaway NO button arena.
- **`<div id="success-screen">`**: Modal overlay appearing upon saying "YES", letting her choose a real Pokhara date rendezvous, select a day, and generate an official field survey pass with WhatsApp integration (`+977 9764540987`).

### 2. [`style.css`](file:///Y:/Confession/style.css)
- **CSS Variables (`:root`)**: Vibrant dark-theme palette (`#0f111a`, `#ff5e97`, `#9d4edd`, `#05d550`, `#00f2fe`).
- **Typography**: Google Fonts (`Plus Jakarta Sans` for modern UI, `Fira Code` for terminal & spatial data, `Caveat` for handwritten touches).
- **Animations**: Terminal cursor blink, pulsing status dot, pulsing compass/heart, pop-in modals, and responsive layout queries.

### 3. [`script.js`](file:///Y:/Confession/script.js)
- **`typeTerminalLine()` / `launchApp()`**: Simulates terminal character-by-character typing with delay variances.
- **`moveNoButton()`**: Calculates boundary physics to jump the "NO" button away on `mouseover` or `touchstart`, cycles playful geomatics error messages, and scales the "YES" button larger.
- **`playCuteBeep()` / `playSuccessChime()`**: Zero-dependency Web Audio API synthesizer for retro 8-bit interactive audio feedback.
- **`initBackgroundCanvas()` / `animateFloatingItems()`**: Background canvas rendering floating hearts, GPS satellites, and map pins.
- **`launchConfetti()` / `updateConfetti()`**: Custom physics-based confetti engine with gravity and spin effects.
- **Date Ticket & WhatsApp Generator**: Formats the selected rendezvous and generates a direct link to message Yam Chhetri on WhatsApp (`+977 9764540987`).
