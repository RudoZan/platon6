# Environments — Platón 6 (`platon6/sitio-web/`)

## 1. Local Development
- **Path:** `/Users/rudozan/MisDocumentos/IA_Proyectos/platon6/sitio-web/`
- **Execution:** Direct `.html` open or static server (`Live Server` / `python3 -m http.server`). Zero build/npm dependencies.

## 2. Production (GitHub Pages)
- **Repo / Branch:** `RudoZan/platon6` (`master`).
- **Scope Rule:** Only `platon6/sitio-web/` is published; keep heavy reference PDFs, `.docx`, and historical docs outside in `platon6/docs/`.

## 3. Shared BaaS (Supabase Cloud)
- **URL:** `https://junonydusnrcumbjjzqt.supabase.co` via `platon6/sitio-web/js/supabaseClient.js` (shared across local dev and production).
