# Environments — `trino`

## 1. Production (GitHub Pages)
- **URL:** Hosted under `platon6` GitHub Pages (`sitio-web/trino/`).
- **Mode:** 100% static client-side (`Engine 1: Web Worker`).
- **Backend Health Check:** `GET http://127.0.0.1:8000/health` times out at `400 ms` and silently disables the Python backend option.

## 2. Local Development (Browser-Only or Hybrid Studio)
- **Frontend:** Local static server (e.g., `python3 -m http.server` or VS Code Live Server) at `platon6/sitio-web/trino/`.
- **Optional Python Backend (`Engine 2`):**
  - **Host/Port:** `http://127.0.0.1:8000`
  - **Run command:** `uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload`
  - **Dependencies:** `fastapi`, `uvicorn`, `praat-parselmouth`, `librosa`, `numpy`, `python-multipart`.
