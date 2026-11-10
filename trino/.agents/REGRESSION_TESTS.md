# Regression Tests — `trino`

1. **RT-01 (Raw Singing Constraints):** Verify `getUserMedia` requests `echoCancellation: false`, `noiseSuppression: false`, and `autoGainControl: false`.
2. **RT-02 (`400ms` Silent Health Check Fallback):** With `127.0.0.1:8000` stopped, loading `index.html` completes within `500ms` without uncaught errors, hides/disables the Python engine selector, and defaults to `"Motor Navegador"`.
3. **RT-03 (Musical Math Calibration):** Inputting a synthetic `440.0 Hz` sine wave against target `A4` (`MIDI 69`) yields `m = 69.0`, $\Delta_{\text{cents}} = 0.0$, and `100%` tuning accuracy within $\pm 20\text{ cents}$.
4. **RT-04 (Octave & Silence Filtering):** Leading/trailing silence (`RMS` below threshold) produces `voiced: false` frames excluded from `tuningAccuracyPct` and `meanTendencyCents`, and sets `attackTimeMs` from the first voiced frame.
5. **RT-05 (Canvas Color Thresholds):** Frames with $\lvert\Delta_{\text{cents}}\rvert \le tol$ render green, $tol < \lvert\Delta_{\text{cents}}\rvert \le 50$ render yellow, and $> 50$ render red.
6. **RT-06 (Singing Pre-roll):** Module 2 starts voice capture `200 ms` before bar 2. Verify recording duration, first pulse frame, note segmentation, canvas curve alignment, and debug pulse/note ranges all use the same pre-roll value.
7. **RT-07 (Singing Session Log):** Verify each note's grade, tonal-center label, voice badge, and glissando badge stay on the same row; blank indicators reserve their note row. Grade icons use the five distinct levels and corresponding colors; empty indicators render as whitespace, not a dash.
