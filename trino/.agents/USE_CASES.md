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
2. Guest home copy invites practice and improvement. The fixed bottom bar explains history/statistics; `Activar cuenta` opens a popup saying account activation is not yet available.
3. The header shows the Trino version beside the app name; the changing section label is omitted.

## UC-06: Exercise Start, Results & Session History
1. Entering either exercise shows the level and session-history table without repeating daily date/completion counters. If there are no results, the table shows its headers and an empty-state message.
2. Before `Comenzar`, Module 1 hides its note markers and answer choices; Module 2 hides the staff. `Repetir` is unavailable before the first start.
3. `Comenzar` is green. After starting, it becomes the blue `Siguiente` action and `Repetir` becomes available in the bottom bar.
4. In Module 1, each mystery-note marker plays that note independently. The Repetir action replays the current interval; Siguiente generates another exercise.
5. Session results use the five grade icons/colors. The newest result row uses a dark green, orange, or red background according to its exercise grade. Both modules use matching dark-blue, edge-to-edge HOY/AYER bands and column headers. In Module 2, grade, tonal center, voice, and glissando indicators align one row per note; `V`, `I`, and `G` are plain colored letters in a shared voice column.
6. The floating debug window is opened from the three-line menu or the debug panel.

## UC-07: Mobile Layout & Level Cards
1. On mobile, the app frame fills the visible viewport; only the central content panel scrolls while the top and bottom bars remain fixed.
2. Both exercise views extend to the frame's inner side edges; exercise headers and session tables are full-width, while prompts and controls retain side padding.
3. Level cards place the stars on the same row as the level title. The description uses the full card width below.
4. Level information is opened from the info button beside the active exercise title in either module, not from the level list.
5. The suggested level label stays left of the progress count. Eligible cards show `Hechas: Hoy x/meta Ayer y/meta`; this row is visible only for the suggested level or levels with activity today/yesterday.
6. In both exercise views, the level header sits flush to the top and side edges. Instructions disappear after starting. Module 2 keeps the compact staff and response table; BPM is shown at the lower-left of the staff and can be changed by tapping there. Analysis details are not repeated below the staff.
7. The Module 2 session history uses one HTML table row per sung note, with exercise index and exercise-grade cells spanning the note rows. Table headers use sentence case; tonal-center text wraps within its cell, and voice/glissando badges use `V`, `I`, and `G` with descriptive tooltips.

## UC-08: Chord Recognition Practice (`Reconocer Acordes`)
1. The home screen opens Module 3, `Reconocer Acordes`, with 16 progressive levels: six dyad/interval levels, four triad levels, four seventh-chord levels, and two integration levels.
2. Levels 1–6 identify two-note dyads; levels 7–16 identify triads and four-note chords. All notes in each question play simultaneously. Each question chooses a target type from the level and displays that level's answer choices.
3. Every chord tone starts at the same `AudioContext` time. The user can replay the current question, retry after a wrong answer, or advance automatically after a good/failed answer according to the delay configured in the `i` level info popup (`Avanzar de inmediato`, `Esperar un segundo` [default for good], `Esperar 2 segundos`, `Esperar 3 segundos`, `No avanzar` [default for failed]).
4. The first submitted response is recorded once in the chord module's today/yesterday session history. Chord progress and stars use a separate storage key and daily goal from intervals and singing.

## UC-12: Level Info Popup Configurations & Module 1 Progressive Level
1. In Module 1 and Module 3, pressing `i` in the exercise header opens `#level-info-modal` with the level details plus two selectors for auto-advance wait time after a good answer (default `Esperar un segundo`) and after a failed answer (default `No avanzar`).
2. In Module 2, pressing `i` opens `#level-info-modal` with a configuration section to select the number of notes per measure (`1`, `2` [default], `3`, or `4`) and the checkbox `Solo tocar la primera nota` (plays only note 1 in Compás 1 while keeping all notes active for singing in Compás 2).
3. In Module 2, the grand staff extends edge-to-edge horizontally, and the overall exercise grade icon is rendered on the central barline between Compás 1 and Compás 2.
4. Module 1 includes `Nivel Progresivo` before Level 1. It starts at `Nivel Progresivo - (N1)`, persists across sessions during the same day, and resets only from one day to the next at `02:00 AM` local time. It advances one level (`N2..N14`) after 10 consecutive good answers (highlighting `(N#)` in bright green), and steps back one level (if at `N2` or above) every 10 accumulated failed answers (highlighting `(N#)` in bright red).

## UC-09: Vocal Range Controls on Mobile
1. The lowest- and highest-note selectors use the full width of their fields.
2. Microphone detection and speaker preview buttons sit below each selector, with accessible labels and touch-sized targets. The settings view retains its `Configuración` heading without the redundant `Ajustes` eyebrow.
3. The preset, lowest-note, and highest-note controls use slightly compact text to fit their values on mobile.

## UC-10: Home Progress & Settings Exit
1. Each home module card shows `MÓDULO N - Hoy x/meta`, with today's count and that module's independent daily goal.
2. The X button in the settings heading returns to Inicio.
3. Response tables show `HOY: Completado x de meta` and `AYER: Completado x de meta` per day, using the module's own daily goal.
4. In Module 2, tapping a staff note plays it; tap targets follow the drawn note positions and the nearest note wins.

## UC-11: Voice Test (Module 4)
1. The home card `MÓDULO 4 · Prueba de voz` opens a single screen without levels or history.
2. A keyboard spans C2–C6 with note names on every key; ◀ ▶ buttons above scroll it. While a key is held its note sounds. Dragging sideways more than 10 px on a key scrolls the keyboard instead: the note stops and no recording happens.
3. On release, the selected recording mode starts: no recording, 1–5 s, or until the first silence after sound is detected. A bar below the staff shows `Grabando x / n s` as a left-to-right progress fill.
4. The whole recording is analyzed as one note with the singing analysis. The staff shows the target note, a dashed guide, and the sung pitch curve colored by deviation.
5. The analysis area has three rows: target/sung note, tonal center and grade icon only (the sung note is omitted when the tonal center is `Muy irregular`); percentage of frames per level (best at left); voice type, plus `Glisando detectado` only when detected. Pressing a key discards the previous result.
6. A Debug button opens the shared floating debug view with one column per original recording frame, 21 cents-band rows colored like `TablaDeValores.md`, signed cents in the active cell, peaks, center-relative analysis, vibrato periods/CV, glissando diagnostics, and rectification state.
7. Entering the module or changing the duration shows a bold two-line instruction in the analysis area; it disappears when a key is pressed or a result is shown.
8. Modules 2 and 4 share voice-shape analysis: preserve silence-frame timing, calculate tonal median first, then detect vibrato/glissando relative to that center. Optional vibrato rectification affects only tuning grade, not the raw analysis or debug.

## UC-13: Cumulative Statistics (`#view-stats`)
1. The hamburger menu includes `Ver estadística`, opening `#view-stats` with four options: Module 1 (`Ver estadística de Intervalos absolutos`, `Ver estadística de Intervalos por nota`), Module 2 (`Ver estadística de canto de Notas`), and Module 4 (`Ver estadística de canto de Notas`).
2. `Intervalos absolutos` displays all 13 intervals with `Buenas` and `Fallidas` counts (including `0`).
3. `Intervalos por nota` displays only note pairs with recorded answers, ordered first by interval (`1J..8J`) and then by starting pitch with octave ascending.
4. Module 2 and Module 4 `Canto de Notas` tables span from the lowest to the highest recorded note (with octave), keeping empty natural notes in between and omitting empty sharp notes.
