# Regression Tests — Calen English Class (`platon6/sitio-web/englishCalen2026/`)

Mandatory checks after any change in `platon6/sitio-web/englishCalen2026/`:
1. **`PC` ↔ `VP` Sync:** Selecting grade (`5° & 6°` / `7° & 8°`), student names, and prompts in `index.html` updates `presentation.html` immediately.
2. **`photo-word` Vertical Stack:** Selecting multiple words on a photo in `PC` renders them **vertically stacked** inside `.photo-panel-words` in `VP` (never concatenated with `|`).
3. **Asset Loading:** Zero 404 errors across `Images/flags/`, `photosCalen/`, `curso-fotos-paises/`, `dibujos/`, and `StoryImages/`.
4. **Teacher References (`Reference/`):** All 4 reference buttons open their HTML files cleanly.
5. **Webcam & Game (`game1`):** MediaPipe (`vendor/mediapipe/`) and `game1/` map initialize with zero console errors.
