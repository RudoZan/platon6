# Architecture — Platón 6 (`platon6/sitio-web/`)

## 1. Decoupled Container Portal Model
1. **Root Portal (`platon6/sitio-web/`):** Provides access gate (`index.html`), project catalog (`listado.html`), shared graphics (`imagenes/`), and Supabase singleton (`js/supabaseClient.js`).
2. **Autonomous Sub-Sites:** Each child folder (`educacionFinanciera/`, `englishCalen2026/`, `tallerRecursosEducativos/`, `ajedrez/`, `dactilografia/`, `trabajosUsach/`, `pruebas/`) runs standalone from its own `index.html` with independent UI, logic, and docs.

## 2. Internal Components (`platon6/sitio-web/`)
| Path | Architectural Role |
| :--- | :--- |
| `index.html` | Main entry gate. Validates access codes (local + Supabase `codigos`) and redirects to target sub-site or catalog. |
| `listado.html` | Visual project catalog grouped into `"Proyectos propios"`, `"Trabajos Usach"`, and `"Pruebas y prototipos"`. |
| `js/supabaseClient.js` | Singleton (`getPlaton6Supabase()`) exposing a single Supabase client instance across the portal and sub-apps. |
| `imagenes/` | Portal avatars and cover illustrations. |

## 3. Supabase Integration Contract for Sub-Sites
1. Load scripts in HTML: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` + `<script src="../js/supabaseClient.js"></script>`.
2. Initialize in JS: `const supabase = getPlaton6Supabase();` (direct client-to-Supabase queries via public `anon_key` under RLS).
