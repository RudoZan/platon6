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
5. **`"Criptomonedas"` in `"Otras Inversiones"`:**
   - [ ] `"Criptomonedas"` opens the complete 2-column category view without JavaScript/template errors.
   - [ ] BTC, ETH, SOL, and XRP remain in individual cards with icons aligned right and balances shown inside each card.
   - [ ] Each crypto card shows `"Comprar"` above `"Vender"`; `"Vender"` is disabled when no matching position exists.
   - [ ] Clicking `"Vender"` opens the redemption modal for the matching position.
   - [ ] Entering a partial amount recalculates gross amount, exit fee, net payout, and remaining balance; `"Vender todo"` selects the full balance.
   - [ ] Confirming partial or total redemption updates the selected destination account/cash and refreshes the crypto card balance.
6. **APV & AFP Cuenta 2 in `"Otras Inversiones"`:**
   - [ ] APV contracting shows regime and multifund radio groups, defaults to Fondo C, and creates a zero-balance account.
   - [ ] Cuenta 2 contracting shows a multifund radio group, defaults to Fondo C, and creates a zero-balance account.
   - [ ] Regime/multifund changes persist and refresh the account summary.
   - [ ] Individual contributions enforce APV `$10.000` and Cuenta 2 `$5.000` minimums, debit the selected source, and update the invested total.
   - [ ] Monthly contribution cannot be saved without a bank account; active amount can be edited and the separate stop action clears the monthly settings.
   - [ ] Canceling either account stops its monthly contribution and removes its balance from the invested total.
