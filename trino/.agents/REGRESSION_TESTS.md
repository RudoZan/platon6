# Regression Tests — `trino`

1. **RT-01 (Raw Singing Constraints):** Verify `getUserMedia` requests `echoCancellation: false`, `noiseSuppression: false`, and `autoGainControl: false`.
2. **RT-02 (`400ms` Silent Health Check Fallback):** With `127.0.0.1:8000` stopped, loading `index.html` completes within `500ms` without uncaught errors, hides/disables the Python engine selector, and defaults to `"Motor Navegador"`.
3. **RT-03 (Musical Math Calibration):** Inputting a synthetic `440.0 Hz` sine wave against target `A4` (`MIDI 69`) yields `m = 69.0`, $\Delta_{\text{cents}} = 0.0$, and `100%` tuning accuracy within $\pm 20\text{ cents}$.
4. **RT-04 (Octave & Silence Filtering):** Leading/trailing silence (`RMS` below threshold) produces `voiced: false` frames excluded from `tuningAccuracyPct` and `meanTendencyCents`, and sets `attackTimeMs` from the first voiced frame.
5. **RT-05 (Canvas Color Thresholds):** Frames with $\lvert\Delta_{\text{cents}}\rvert \le tol$ render green, $tol < \lvert\Delta_{\text{cents}}\rvert \le 50$ render yellow, and $> 50$ render red.
6. **RT-06 (Singing Pre-roll):** Module 2 starts voice capture `200 ms` before bar 2. Verify recording duration, first pulse frame, note segmentation, canvas curve alignment, and debug pulse/note ranges all use the same pre-roll value.
7. **RT-07 (Singing Session Log):** Verify each note's grade, tonal-center label, voice badge, and glissando badge stay on the same row; blank indicators reserve their note row. Grade icons use the five distinct levels and corresponding colors; empty indicators render as whitespace, not a dash.
8. **RT-08 (Exercise Start Gate):** On entering either exercise, verify the session table is visible but Module 1 note markers/answers and Module 2 staff remain hidden. `Comenzar` is green; `Repetir` is absent and exercise controls cannot be used until start.
9. **RT-09 (Exercise Bottom Controls):** After starting, verify the green button becomes blue `Siguiente`, `Repetir` appears and replays the current exercise, and Siguiente generates the next question. In Module 1, each hidden-note button plays only its corresponding pitch.
10. **RT-10 (Empty Session History):** With no current/yesterday results, both module tables remain visible with the correct column headers and an empty-state row spanning all columns.
11. **RT-11 (Header Menu Debug):** The three-line menu opens the floating debug window and closes after selection; the removed inline debug button is absent.
