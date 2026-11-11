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
12. **RT-12 (Mobile Fixed Bars):** At a mobile viewport, scrolling long content moves only `.middle-zone`; top and bottom bars keep their viewport positions and the body does not scroll.
13. **RT-13 (Level Card Layout):** In both module lists, stars align horizontally with the level title and the description spans the card width beneath it.
14. **RT-14 (Level Information Access):** Level lists have no info button. The info button beside each active exercise title opens the modal for the selected level and correct module.
15. **RT-15 (Daily Level Counts):** Suggested label stays left while `Hechas: Hoy x/meta Ayer y/meta` aligns right. Show this row only for the suggested level or levels with today/yesterday activity; verify both modules and zero counts for inactive days.
16. **RT-16 (Singing Table Rows):** Each sung note renders in its own `<tr>` with distinct cells; exercise index and overall grade use `rowspan`. Verify long tonal-center labels wrap within the cell without overlapping adjacent columns at mobile width.
17. **RT-17 (Account Activation Notice):** Clicking the home `Activar cuenta` button opens a modal stating activation is not yet available, does not open the registration form, and closes with its button or backdrop.
18. **RT-18 (Compact Exercise View):** Exercise headers reach the top and side edges. After Comenzar, instructions disappear; the singing staff is compact, Click 1/2 labels are absent, and no duplicate analysis text appears under the staff.
19. **RT-19 (Result Header Case):** Session table headers display sentence case (for example `Nota`, `Centro tonal`, `Voz`) rather than all-uppercase text.
