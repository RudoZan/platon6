# Architecture — `educacionFinanciera`

## 1. Dual-Screen Operation (Facilitator vs. Participant)
- **PPT (Facilitator on Zoom/Projector):** All 46 theoretical/guided moments.
- **Web Simulator (Participant on Mobile):** Only interactive milestones and passive `"Simulador corriendo"` states.
- **Modes:**
  1. **Autonomous (Default):** Local navigation via `[ ◀ ]` / `[ ▶ ]` on voice cue; zero network dependency.
  2. **Synchronized (Supabase Realtime):** Facilitator pushes current slide and aggregates live metrics via `getPlaton6Supabase()` (`platon6_finanzas_sesiones` / `platon6_finanzas_respuestas`).

## 2. 3-Zone Mobile Layout (`mobile-frame`, `max-width: 480px`)
Rendered over a **3D spatial perspective background** (32% horizon, radial `#7dd3fc` conic lines, logarithmic horizontal lines):
1. **Top Zone — PPT Carousel (100% width):**
   - Navy header (`#0f172a` to `#1e3a8a`) with `[ ◀ ]` / `[ ▶ ]`, dynamic left title, and compact right date (`01-Ene-Año01`).
   - `.slide-card` strip with button, mouse wheel, and drag-to-scroll support.
2. **Middle Zone — Dynamic Action Stage:**
   - Toggles between active slide interactive content (e.g., 3 Onboarding tabs) and the 2-column showcase (`hub-grid-2col`) of the selected bottom dock place (`view-hub-stage`).
3. **Bottom Zone — HUD Dock Bar (7 Places):**
   - Fixed bottom bar (`bottom: 0`, constant 80% opacity `rgba(..., 0.80)`, ocean-to-night blue gradient, `#38bdf8` top border).
   - 7 places: `"Banco"`, `"Otras Inversiones"`, `"Corredora"`, `"Comercio"`, `"Actividades"`, `"Trabajo"`, `"Mi Estado"` (`Personal`).
   - **Strict Sync Rule:** A dock icon is `.active` (`#7dd3fc` + 28px bar) ONLY when its showcase (`view-hub-stage`) is open in the middle zone. Changing the top slide sets `state.activeHudTab = null` and unmarks the dock icon.
