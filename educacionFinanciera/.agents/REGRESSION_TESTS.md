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
7. **State and Thematic Bonds in `"Otras Inversiones"`:**
   - [ ] BTP and BCP direct-purchase minimums are `$5,000,000 CLP`; BTU and BCU minimums are `UF 500` (`$20,658,030 CLP` at the documented reference rate).
   - [ ] BTU and sustainable UF bond cards show the `UF 500–1,000` series range; BTP/BCP cards note that some series or secondary-market lots require higher amounts.
   - [ ] Local sustainable bonds are distinguished by CLP/UF denomination; international ESG bonds show `US$100,000–200,000` and the approximate CLP range.
   - [ ] The purchase modal shows each instrument's native-currency minimum, accepts/debits CLP, and rejects an amount below the numeric CLP floor with the correct minimum label.
   - [ ] Primary-auction institutional minimums are not offered as retail direct-purchase minimums; each bond remains a separate position for buy/sell actions.
8. **Seed-Stage Startups in `"Otras Inversiones"`:**
   - [ ] Six profiles render in a stable two-column grid with reference risk, exit horizon, channel, and minimum labels.
   - [ ] Crowdfunding minimums are `$500,000 CLP` where listed; direct/angel and specialized VC references show the matching USD range and approximate CLP equivalent.
   - [ ] The purchase flow enforces the item's numeric CLP floor and debits the selected cash/bank source.
   - [ ] Repeated purchases of the same startup profile consolidate into one position; different profiles remain separate.
   - [ ] Owned startup positions expose partial and full sale through the common redemption modal, apply the displayed simulated 10% discount, and credit the selected destination.
9. **Digital Wallet in `"Otras Inversiones"`:**
   - [ ] The wallet presents Cuenta Vista-style account status, available balance, rate, accrued interest, and daily-operation controls.
   - [ ] Opening creates a liquid zero-balance account; deposit, transfer, withdrawal, and closure reuse the bank modals and update cash/account balances.
   - [ ] Simulating one day credits rounded effective daily interest based on the current balance, updates accrued interest/day count, and refreshes the account view.
   - [ ] Closing the wallet transfers its remaining balance to cash and removes the account; legacy wallet investment positions migrate once without duplicate balance.
10. **Index Funds & ETFs in `"Otras Inversiones"`:**
   - [ ] Six examples render in a two-column grid with the supplied ticker, administrator, tracked index, TER, and minimum range.
   - [ ] The Security Index Fund is identified as a traditional mutual fund, not an ETF, with its separate TER and contribution minimum.
   - [ ] All six products enforce a $505,650 CLP simulator minimum; the minimum purchase deducts a $5,650 simulated transaction fee from invested capital.
   - [ ] Stock-like fee calculations use the configured minimum brokerage charge, exchange rights, and VAT; the Security mutual-fund fee is explicitly labeled as a simulator approximation, not its real administrator tariff.
   - [ ] The category notes that Art. 107 LIR eligibility depends on applicable requirements, taxes and TER deductions are not calculated, and fees are simulated rather than representative of actual provider charges.
   - [ ] Buying the same indexed fund multiple times consolidates into one position; its card shows the balance and opens the shared partial/full sale modal, which credits the selected destination.
11. **Anonymized Stocks in `"Otras Inversiones"`:**
   - [ ] Exactly ten user-provided aliases render in two columns; no real company names/tickers appear and the excluded company is absent.
   - [ ] Each stock shows reference price, whole-share minimum lot, and total minimum outlay matching capital plus the stated reference fee.
   - [ ] Buying at the displayed minimum debits the total outlay and records the net share capital after the reference commission.
   - [ ] Brokerage fee uses the displayed reference amount at the minimum and the higher of the `$4,000` base or `0.35%` for larger orders, plus modeled rights/VAT.
   - [ ] Repeated purchases consolidate by alias; owned positions expose sale and use the same fee model on redemption.
