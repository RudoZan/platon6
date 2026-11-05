# Environments — `educacionFinanciera`

## 1. Local Development
- **Path:** `educacionFinanciera (web)` (`platon6/sitio-web/educacionFinanciera/index.html`).
- **Execution:** Direct browser open or static server (`Live Server` / `python3 -m http.server`).

## 2. Production (GitHub Pages / Live Workshop)
- **Repo/Branch:** `RudoZan/platon6` (`master`).
- **Entry points:**
  1. Portal root (`platon6/sitio-web/index.html`) with access code **`finanzas`**.
  2. Catalog (`platon6/sitio-web/listado.html` → `"Taller de Finanzas Personales"`).
  3. Direct **QR Code** to `.../educacionFinanciera/index.html` (3-second mobile entry, zero login).

## 3. External Services (Supabase)
- **Shared client:** `platon6/sitio-web/js/supabaseClient.js` (`getPlaton6Supabase()`).
- **Tables:** `platon6_finanzas_sesiones`, `platon6_finanzas_respuestas`.
