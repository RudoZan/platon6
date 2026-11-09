# Technical Specification — Calen English Class (`platon6/sitio-web/englishCalen2026/`)
> **Target App Language:** Bilingual (English learning content + Spanish teacher controls).

## 1. Tech Stack & UI Glossary
- **Frontend:** Pure Vanilla HTML5, CSS3, ES6+ JS; Google Fonts (`Outfit`, `Satisfy`).
- **Local Computer Vision:** MediaPipe Vision (`vendor/mediapipe/vision_bundle.mjs`, `selfie_segmenter.tflite`, `vendor/mediapipe/wasm/`) for live webcam background segmentation.
- **Window Sync:** Native `BroadcastChannel` API + optional Supabase (`../js/supabaseClient.js`).
- **UI Glossary:** **`PC`** = Teacher Control Panel (`index.html`); **`VP`** = Student Projection Window (`presentation.html`); **`PS`** = Top-left VP panel (webcam/side game); **`PI`** = Bottom main VP container (`.content-box`, `#names`, `#middle`, `#bottom`).

## 2. File Map (`platon6/sitio-web/englishCalen2026/`)
| Path | Technical Role |
|---|---|
| `index.html` | Teacher Control Panel (`PC`). |
| `presentation.html` | Student Projection Window (`VP`). |
| `activities/shared.js` | Asset path constants (`IMG`, `FLAG`, `DIBUJOS`, `PHOTOS`, `CPHOTOS`) and shared datasets (`CALEN_PHOTOS`, `ALREADY_KNOW_ENGLISH`, `COUNTRY_FLAG_CODE`). |
| `courses/5to-6to.js` & `courses/7mo-8vo.js` | Units and activities (`COURSES['5to-6to']`, `COURSES['7mo-8vo']`). |
| `game1/game-data.js` & `game1/house-map.js` | Scene exploration game data and navigation map. |
| `Reference/*.html` | 4 teacher reference HTML docs opened via `window.open()`. |
| `Images/`, `photosCalen/`, `curso-fotos-paises/`, `dibujos/`, `StoryImages/` | Image banks (`.webp`, `.jpg`, `.png`, `.svg`). |
| `vendor/mediapipe/` | Local MediaPipe Selfie Segmenter model and WASM runtime. |
