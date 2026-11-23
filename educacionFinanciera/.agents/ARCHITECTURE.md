# Architecture — `educacionFinanciera`

## 1. Layout (`mobile-frame`, `max-width: 480px`)
Rendered over a **3D spatial perspective background** (32% horizon, radial `#7dd3fc` conic lines, logarithmic horizontal lines):
1. **Top Bar (`.topbar`, sticky):**
   - Left: brand mark `F` + `"Finanzas y Bienestar"` (clicking returns to `#view-welcome`).
   - Right: 2-line simulation date (`01 de enero` / `Año 1 · Detenido`) and hamburger menu (`#menu-toggle` / `#top-menu`) opening `"Configuración"` (`#view-settings`) and `"Acerca de"` (`#view-about`).
   - Legacy PPT slide carousel and `◀`/`▶` slide controls are removed.
2. **Middle Zone — Dynamic Action Stage (`#main-stage`):**
   - Reaches directly up to `.topbar`.
   - Toggles between `#view-welcome` (Amartya Sen quote), `#view-settings`, `#view-about`, 3 Onboarding tabs (`#view-step-4`, `#view-anchors`, `#view-character-summary`), and `#view-hub-stage` for the selected bottom dock tab.
3. **Bottom Zone — HUD Dock Bar (6 Places):**
   - Fixed bottom bar (`bottom: 0`, `repeat(6, 1fr)`): `"Mi perfil"`, `"Cuentas e inversiones"`, `"Comercio y Servicios"`, `"Actividades"`, `"Trabajo"`, `"Asesor Financiero"`.
   - `"Banco"` and `"Corredora"` dock tabs were merged into `"Cuentas e inversiones"`.
   - **Strict Sync Rule:** A dock icon is `.active` (`#7dd3fc` + 28px bar) ONLY when its showcase (`view-hub-stage`) is open in the middle zone. Opening welcome/settings/about/onboarding clears `state.interface.activeHudTab = null` and unmarks all dock tabs.

## 2. Simulated Financial Event Flow
- `state.js` owns the simulated calendar (`1s/2s/3s/5s` per day via `setSimulationSpeed`, start/pause via `setSimulationRunning`, reset via `resetSimulators`) and invokes daily and month-boundary handlers while visible/focused.
- Domain handlers in `ui-banco-seguros.js`, `ui-inversiones.js`, `ui-trabajo.js`, and `ui-corredora.js` process credit interest/payments, investment returns, salary, property sales/rentals, account fees and maturities.
- State lives in memory per session; cash/account mutations are tracked as financial movements via `withFinancialMovementDetail()` so `ui-personal.js` renders a chronological, year-filtered ledger.
