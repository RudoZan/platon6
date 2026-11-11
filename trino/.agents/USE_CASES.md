# Active Use Cases — `trino` (`platon6/sitio-web/trino/`)

## UC-01: Startup & Silent Engine Auto-Detection
1. On page load, app performs `GET http://127.0.0.1:8000/health` (`400 ms` timeout).
2. If local Python backend responds `200 OK`, UI displays the engine selector (`"Motor Navegador"` / `"Motor Backend (Python)"`).
3. If unreachable (GitHub Pages or offline local server), UI hides/disables the selector and runs exclusively on `"Motor Navegador"` (`Web Worker`).

## UC-02: Target Note Selection & Reference Tone
1. User selects a target musical note ($N_{\text{obj}}$, e.g., `A4 — 440 Hz`) and tolerance band (default $\pm 20\text{ cents}$).
2. User can play an audible reference tone before recording.

## UC-03: Raw Vocal Recording (`8s` Batch Capture)
1. User starts recording; `Web Audio API` captures raw mono audio at `44.1 kHz` or `48 kHz` with `echoCancellation: false`, `noiseSuppression: false`, and `autoGainControl: false`.
2. After `8 seconds` (or manual stop), capture ends and audio buffer is dispatched to the active engine.

## UC-04: Post-Recording Pitch Visualization & Metrics (`< 1–3s`)
1. Active engine returns `AnalysisResult`.
2. `HTML5 Canvas 2D` renders X-axis (`0–8s`), Y-axis ($\pm 100\text{ cents}$ around $N_{\text{obj}}$), target center line, shaded tolerance band ($\pm 20\text{ cents}$), and color-coded vocal curve (green: within tolerance, yellow: near, red: out of tune).
3. Metrics panel displays:
   - `"Porcentaje de afinación"` (`%` inside tolerance).
   - `"Tendencia media"` (mean $\Delta_{\text{cents}}$: flat $<0$ vs sharp $>0$).
   - `"Estabilidad / Vibrato"` (SD in cents during sustained phase).
   - `"Tiempo de ataque"` (*scooping* time to enter tolerance band).
   - *(When Engine 2 is active)* Vocal quality metrics: `Jitter`, `Shimmer`, `HNR`.

## UC-05: Home, Modules & Account Activation
1. Home module cards place the module title/tag at the upper left and the icon at the right; the description spans the full card width below both.
2. Guest home copy invites practice and improvement. The fixed bottom bar explains history/statistics and opens account activation with `Activar cuenta`.
3. The header shows the Trino version beside the app name; the changing section label is omitted.

## UC-06: Exercise Start, Results & Session History
1. Entering either exercise shows the level, completion count, and session-history table. If there are no results, the table shows its headers and an empty-state message.
2. Before `Comenzar`, Module 1 hides its note markers and answer choices; Module 2 hides the staff. `Repetir` is unavailable before the first start.
3. `Comenzar` is green. After starting, it becomes the blue `Siguiente` action and `Repetir` becomes available in the bottom bar.
4. In Module 1, each mystery-note marker plays that note independently. The Repetir action replays the current interval; Siguiente generates another exercise.
5. Session results use the five grade icons/colors. In Module 2, grade, tonal center, voice, and glissando indicators align one row per note.
6. The floating debug window is opened from the three-line menu or the debug panel.

## UC-07: Mobile Layout & Level Cards
1. On mobile, the app frame fills the visible viewport; only the central content panel scrolls while the top and bottom bars remain fixed.
2. Level cards place the stars on the same row as the level title. The status and description follow below, and the description uses the full card width.
3. Level information is opened from the info button beside the active exercise title in either module, not from the level list.
