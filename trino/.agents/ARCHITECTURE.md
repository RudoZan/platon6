# Architecture — `trino`

## 1. Hybrid Dual-Engine Flow
```mermaid
flowchart LR
  UI["Frontend UI & Canvas 2D"] -->|Startup GET /health 400ms| HC{"Local Backend Alive?"}
  HC -->|Yes| Toggle["Enable Engine Selector"]
  HC -->|No / Timeout| Lock["Lock to Browser Engine"]
  Mic["Web Audio API (Raw 44.1/48kHz)"] -->|8s Float32 PCM| Router{"Selected Engine"}
  Router -->|Engine 1: Browser| WW["Web Worker (MPM / YIN + RMS + Median)"]
  Router -->|Engine 2: Python| API["POST 127.0.0.1:8000/analyze (16-bit WAV)"]
  WW -->|AnalysisResult| Render["Canvas 2D Curve + 4 Metrics"]
  API -->|AnalysisResult + Jitter/Shimmer/HNR| Render
```

## 2. Component Boundaries
1. **Capture Layer (`js/audio-capture.js`):** Manages microphone stream with disabled voice filters, records `8s` PCM buffer, and encodes `16-bit` mono WAV when Engine 2 or audio download is needed.
2. **Analysis Layer:**
   - **Browser Worker (`js/pitch-worker.js`):** Runs off-main-thread time-domain pitch detection so UI never freezes.
   - **Local FastAPI (`backend/main.py`):** Exposes `GET /health` (CORS enabled for `localhost` / `127.0.0.1`) and `POST /analyze`.
3. **Presentation Layer (`js/canvas-renderer.js` & `js/app.js`):** Consumes `AnalysisResult` agnostically, drawing the $\pm 100\text{ cents}$ canvas grid and metric cards.
