# Active Use Cases — `educacionFinanciera` (`platon6/sitio-web/educacionFinanciera/index.html`)

## UC-01: Session Entry & Top PPT Carousel Navigation
- **Slide 1:** Displays Amartya Sen (2000) quote + session code input (`YYYYMM` + 4 digits `1000-9999`).
- **Navigation:** Top `[ ◀ ]` / `[ ▶ ]` buttons, mouse wheel, or drag-to-scroll across 42 numbered slides (`N° 1`–`N° 42`). Only slides 1–4 and 7, 22, 36, 37, 38 define a central onboarding/summary view; slides 5–6, 8–21, 23–35, and 39–42 have no central placeholder card.

## UC-02: Character Onboarding (3 Tabs)
1. **`Intereses`:** Allocate 20 marbles across 14 categories (1–3 scale).
2. **`Preferencias`:** Pick 2 of 4 options each in `"Vivienda"`, `"Trabajo"`, and `"Transporte"`.
3. **`Resumen`:** 2nd-person profile summary + starting financial diagnosis.

## UC-03: `"Mi Estado"` (`Personal` Hub)
1. **Wellbeing & Cash Card:** Displays `"Bienestar"` (starts at 100%, 20 SVG hearts filled vertically 2 per column + 11-level dynamic emoji) and physical `"Efectivo"`.
2. **`"Presupuesto Mensual"` (3-Column Table):** Headers for `"Dinero disponible"` and `"Ingreso estimado"`. Columns: `Ítem / Presupuesto / Gasto Real` (9 base items at `$0` + contracted debts) + **`+ Agregar ítem`** button (`Libre` or `Ahorro / Inversión` linked to `"Alcancía"`, `"DAP"`, `"Dólares"`, `"Fondo Mutuo"`).
3. **`"Patrimonio & Liquidez"`:** Real breakdown of physical cash + active bank accounts, debts, and emergency coverage in months.
4. **`"Test de Perfil de Inversionista"`:** 5-question flow with manual navigation (`◀ Anterior` / `Siguiente ▶`), answer persistence, and official diagnosis (`"Conservador"`, `"Moderado"`, `"Arriesgado"`, 5–15 pts).
5. **Secret Subview `"Variables del Personaje"` (`secret_summary`):** Clicking top-left icon (`#hub-stage-icon-box`) opens full state audit (`Física: 20/20`, `Emocional: 40/40`, `Mental: 40/40`, accounts, debts, owned assets).

## UC-04: `"Trabajo"` Hub (Job Search, Training & Salary Negotiation)
1. **`"Búsqueda de Trabajo"`:** 2-col catalog of 6 jobs (gross/net salary, experience/course requirements). Supports immediate hire (`"Postular"`) or resignation (`"Renunciar"`).
2. **`"Capacitaciones y Certificaciones"`:** 8 courses across 4 areas (`"Nivel Intermedio"` required before `"Nivel Avanzado"`). Related courses grant +10% (Intermedio) or +15% + promotion eligibility (Avanzado).
3. **`"Negociación Salarial y Ascensos"` (Chat Simulator):**
   - If `"Independiente / Freelance"`, informs user has no boss.
   - If employed, opens gender-neutral boss chat (3 random reply variants) to greet, request raise, or request promotion, validating mental/emotional health ($\ge 20$) and completed courses. Blocks repeat requests in same session; resets on exit (`initNegChat()`).

## UC-05: `"Banco"` Hub (All 8 Sections Active: Accounts, Checking Bundle, Cards, FFMM, DAP & Seguros)
1. **Account Operations (`"Cuenta Ahorro"`, `"Cuenta RUT / Vista"`, `"Cuenta Corriente"`):** Open at `$0` (`"Abrir cuenta"`), modal actions: `"Depositar"`, `"Girar / Transferir"` (with `"Todo el saldo"` button), and `"Cerrar cuenta"` (transfers balance to `"Efectivo"`).
2. **`"Cuenta Corriente"` Multi-Step Salesperson Flow:** Base monthly fee `$14.000/mes` (`$7.000/mes` with 1 add-on; `$0/mes` with both credit line and credit card). Offers `"Línea de Crédito"` (`$500.000` + mandatory `"Seguro de Desgravamen"` `$1.900/mes`) and `"Tarjeta de Crédito"` (`$950.000`) via individual detail/cost confirmation modals, followed by an optional `"Seguro de Fraude"` (`$1.150/mes`, Ley 21.234) offer window. Closing `"Cuenta Corriente"`, `"Línea de Crédito"`, or `"Tarjeta de Crédito"` requires paying off 100% of outstanding debt.
3. **`"Tarjeta de Crédito"` (Single Unified Card):** Free standalone or bundled contracting per Ley 20.555 (SERNAC Financiero), `$950.000` limit, `$6.900/mes` fee (`$0` if zero purchases/balance); links automatically if `"Cuenta Corriente"` is opened before or after.
4. **`"Fondos Mutuos (FFMM)"`:** Validates CMF Investor Profile (`NCG N° 380 / N° 365`) before first investment and requires an explicit suitability declaration when investing in a higher-risk fund. Offers 3 funds (`Conservador`, `Moderado`, `Arriesgado`) with multiple contributions, monthly share-price simulation (`📈 Simular 1 Mes`), and partial (`\ge $5.000` + minimum stay balance) or full (`100%`) redemptions with a mandatory 2-step confirmation screen and closing share-price variation disclaimers.
5. **`"Depósitos a Plazo (DAP)"`:** Supports multiple simultaneous deposits (`30 días`, `90 días`, `360 días UF`). Locked until maturity with no mid-term switching between *Plazo Fijo* and *Plazo Renovable*. Simulating maturity auto-pays *Plazo Fijo* deposits or opens the legal 3-business-day grace period modal for *Plazo Renovable* deposits (collect vs. auto-renew with compounded interest).

## UC-06: `"Seguros"` Module (Single & Multi-Asset Policies)
1. **Multi-Asset (`"Seguro Automotriz"` & `"Seguro de Vivienda"`):** Insures multiple vehicles/properties individually (`ins_automotriz_${assetId}`, `ins_vivienda_${assetId}`), validating real asset ownership and asset-tier pricing.
2. **Single Policies:** `"Seguro de Fraude"` ($1.150/mo; applies to `"Cuenta RUT / Vista"`, `"Cuenta Corriente"`, and `"Tarjeta de Crédito"`, excluding `"Cuenta de Ahorro"`), `"Desgravamen"` ($1.900/mo), `"Cesantía"` ($4.500/mo), `"Vida"` ($9.500/mo for $20M), `"Salud Complementario"` ($14.000/mo).
3. **Modal Confirmation:** Every hire or cancellation (`"Terminar seguro"`) requires modal confirmation showing insured asset, monthly fee, and coverage.

## UC-07: Criptomonedas in Other Investments
1. The user opens `"Otras Inversiones"` → `"Criptomonedas"` and sees Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and XRP (Ripple) in two columns.
2. Each card shows name, icon, description, exchange commission, minimum amount, current valued balance, `"Comprar"`, and enabled/disabled `"Vender"`.
3. `"Comprar"` opens the investment contract modal and creates an investment position using the selected funding source.
4. `"Vender"` opens the redemption modal for that cryptocurrency. The user may enter a partial amount or select `"Vender todo"`; the modal recalculates fees, net proceeds, and remaining balance.
5. Confirmation transfers the net proceeds to cash or the selected bank account, reduces or removes the corresponding position, and refreshes the crypto cards and HUD.

## UC-08: APV & AFP Cuenta 2 in Other Investments
1. APV contracting selects one tax regime and one AFP multifund using single-choice radio options; Fondo C is selected by default. The account starts with a zero balance.
2. APV account actions separately change regime, change multifund, make an individual contribution, manage the monthly contribution, and cancel the account.
3. AFP Cuenta 2 contracting selects one multifund using radio options; Fondo C is selected by default. The account starts with a zero balance and does not request an APV tax regime.
4. Cuenta 2 account actions separately change multifund, make an individual contribution, manage the monthly contribution, and cancel the account.
5. Individual APV contributions require at least `$10.000`; Cuenta 2 contributions require at least `$5.000`. Both accept cash or an eligible bank account and update balances, contributed capital, and invested totals.
6. Monthly contributions require a valid bank account and minimum monthly amount. Users can update an active amount or stop the monthly contribution using a separate action.

## UC-09: Stocks and Index Funds in Other Investments
1. Stock and index-fund cards display illustrative risk, minimum outlay and transaction costs. Index funds include five ETF examples and one separately identified traditional mutual fund.
2. The index-fund simulator minimum is `$505.650 CLP` total, including `$5.650` reference costs. The mutual-fund transaction fee is an educational approximation, not a quoted administrator tariff.
3. A purchase debits the selected cash or bank source and records the balance after transaction fees. Additional purchases of the same instrument consolidate into its existing position.
4. An owned position offers partial or full sale; the shared modal displays the simulated commission and net proceeds, then credits the chosen destination.

## UC-10: Digital Wallet in Other Investments
1. Opening the remunerated wallet creates a liquid account with zero balance. Deposit, withdrawal and closure use the shared bank-account flows.
2. Simulating a day credits rounded interest on the current balance and updates the accrued-interest and day counters. A legacy wallet investment position is migrated to the account once.
