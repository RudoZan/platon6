# Architecture — Calen English Class (`platon6/sitio-web/englishCalen2026/`)

## 1. Dual Synchronized Window Architecture
Two independent browser windows communicate in real time without page reloads:
- **`PC` (`index.html`)** ➔ sends `(type, payload)` via `BroadcastChannel` / Supabase ➔ **`VP` (`presentation.html`)**.
- Both windows load `activities/shared.js`, `courses/*.js`, and `game1/*.js`.

## 2. Rendering Flow in `VP` (`platon6/sitio-web/englishCalen2026/presentation.html`)
1. **Turns & Prompts (`PI`):** Updates `#names` (active students), `#middle` (question/prompt), and `#bottom` (revealed answer).
2. **`photo-word` Activity:** `PC` sends selected words joined by `\n` (`shown.join('\n')`). `VP` splits by `[\n|]+`, filters empty strings, and renders one `<div>` per word inside `.photo-panel-words` (`display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center;`).
3. **Webcam & Game (`PS`):** Runs local MediaPipe stream (`selfie_segmenter.tflite`) or renders `game1` / `StoryImages/` views.
