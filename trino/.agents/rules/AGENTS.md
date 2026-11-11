# Voice Pitch & Ear Training App (`trino` — Trino)
Deferred/batch singing pitch analyzer (`8s` recording -> `< 1–3s` $f_0$ analysis) with 2D pitch curve and hybrid dual-engine architecture (100% browser Web Worker on GitHub Pages + optional local Python FastAPI Praat/librosa backend).
- **Target App Language:** Spanish (all UI labels and feedback in Spanish; AI docs use telegraphic English).
- **Workspace aliases:** `trino (web)` (`platon6/sitio-web/trino/`) and `trino (docs)` (`platon6/docs/trino/`).

## Planned Code Map (`platon6/sitio-web/trino/` — Read only target file)
- `index.html`: App shell (note selector, recording controls, engine toggle, Canvas 2D, 4 metric cards).
- `css/styles.css`: Layout and visual theme.
- `js/app.js`: UI controller and `400ms` silent health check (`GET http://127.0.0.1:8000/health`).
- `js/audio-capture.js`: Raw `Web Audio API` capture (`44.1/48 kHz`, voice filters disabled) + 16-bit mono WAV encoder.
- `js/pitch-worker.js`: Engine 1 (`Web Worker` MPM/YIN time-domain $f_0$ detector + RMS gate + median filter).
- `js/pitch-math.js`: Musical math ($m = 69 + 12\log_2(f/440)$, $\Delta_{\text{cents}}$) and 4 tuning metrics.
- `js/canvas-renderer.js`: `HTML5 Canvas 2D` pitch curve (`0–8s`, $\pm 100\text{ cents}$, green/yellow/red trajectory).
- `backend/main.py`: Engine 2 optional local FastAPI server (`parselmouth` / `librosa.pyin` + `jitter`/`shimmer`/`HNR`).

## Current Implementation Note
- The delivered static app also includes Module 1 interval recognition, Module 2 singing practice, and Module 3 chord recognition. `index.html`, `css/styles.css`, and `js/app.js` are the active files; the separate audio-capture/worker/backend files above remain planned, not present in the current app.
- Module 3's 16 levels, simultaneous chord playback, answer evaluation, daily log, progress, and `dailyChordsMin` setting are implemented in `js/app.js` and `index.html`.

## Doc Index (Read on demand only)
- **Living State (`platon6/sitio-web/trino/.agents/`):**
  - [USE_CASES.md](../USE_CASES.md): User flows, including all three training modules and mobile vocal settings.
  - [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md): Stack, data contracts, training modules, settings, and musical formulas.
  - [ARCHITECTURE.md](../ARCHITECTURE.md): Planned dual-engine flow and current static training app flow.
  - [ENVIRONMENTS.md](../ENVIRONMENTS.md) & [REGRESSION_TESTS.md](../REGRESSION_TESTS.md).
- **External Docs (`platon6/docs/trino/`):**
  - [PRD_VISION.md](../../../../docs/trino/PRD_VISION.md), [PRD_SPECS.md](../../../../docs/trino/PRD_SPECS.md), [SOLUTION_DESIGN.md](../../../../docs/trino/SOLUTION_DESIGN.md), [DEVELOPMENT_PLAN.md](../../../../docs/trino/DEVELOPMENT_PLAN.md), [CHANGELOG.md](../../../../docs/trino/CHANGELOG.md).

## Critical Rules
1. **Raw audio for singing:** Always set `echoCancellation: false`, `noiseSuppression: false`, `autoGainControl: false` in `getUserMedia`.
2. **Silent fallback:** When `http://127.0.0.1:8000/health` times out (`400ms`) or fails on GitHub Pages, hide/disable the Python engine selector without console/UI errors.
3. **Unified contract:** Both Engine 1 (Web Worker) and Engine 2 (FastAPI) MUST output the identical `AnalysisResult` JSON structure.
