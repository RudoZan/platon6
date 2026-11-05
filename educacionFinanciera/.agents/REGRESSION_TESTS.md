# Regression Tests — `educacionFinanciera`

Mandatory checks before closing any change in `platon6/sitio-web/educacionFinanciera/`:
1. **Top Carousel & HUD Dock Sync:**
   - [ ] `[ ◀ ]` / `[ ▶ ]`, wheel, and drag navigate slides smoothly.
   - [ ] Clicking a HUD Dock icon marks it `.active` and opens its 2-col showcase; changing the top slide resets `state.activeHudTab = null` and unmarks the dock icon.
2. **`"Mi Estado"` (`Personal`), `"Bienestar"` & Secret Subview:**
   - [ ] `"Bienestar"` starts at 100% (20 hearts + `🤩`) and never displays obsolete label *"Paz Mental"*.
   - [ ] Clicking `#hub-stage-icon-box` opens `"Variables del Personaje"` showing `Física: 20/20`, `Emocional: 40/40`, `Mental: 40/40`, accounts, debts, and owned assets.
   - [ ] `"Presupuesto Mensual"` (3-col table) edits amounts, adds free/saving items, and recalculates `"Patrimonio & Liquidez"` with zero artificial starting debt/savings.
   - [ ] `"Test de Perfil de Inversionista"` (5 questions) navigates via `◀ Anterior` / `Siguiente ▶` without auto-advance and persists result.
3. **`"Trabajo"`, Training & Negotiation Chat:**
   - [ ] `"Búsqueda de Trabajo"` validates experience and certified course requirements before hiring.
   - [ ] `"Capacitaciones"` blocks `"Nivel Avanzado"` until same-area `"Nivel Intermedio"` is passed.
   - [ ] `"Negociación Salarial"`: course names in **bold**, approved raises in CLP currency (no `%`), blocks repeat raise/promotion requests in same session, and resets on exit (`initNegChat()`).
4. **`"Banco"` & Multi-Asset `"Seguros"`:**
   - [ ] Accounts support `"Depositar"`, `"Girar / Transferir"` (`"Todo el saldo"`), and `"Cerrar cuenta"` (transfers balance to `"Efectivo"`).
   - [ ] Closing `"Cuenta Corriente"` auto-cancels linked `"Línea de Crédito"` and `"Seguro de Desgravamen"`.
   - [ ] `"Seguro Automotriz"` and `"Seguro de Vivienda"` require real asset ownership, support multiple vehicles/properties with tiered pricing, and require modal confirmation on hire and cancellation (`"Terminar seguro"`).
