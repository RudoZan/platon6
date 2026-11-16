# Personal Finance Workshop (`educacionFinanciera`)
90-min synchronous interactive personal finance/lifestyle simulator paired with theoretical PPT (UAH/Experian).
- **Target App Language:** Spanish (all UI labels, messages, and in-app data MUST remain in Spanish; AI docs use telegraphic English for structure/logic).
- **Workspace aliases:** `educacionFinanciera (web)` (`platon6/sitio-web/educacionFinanciera/`) and `educacionFinanciera (docs)` (`platon6/docs/educacionFinanciera/`).

## Code Files (`platon6/sitio-web/educacionFinanciera/` — Read only target file)
- `index.html` (`401L`): HTML shell (3 zones, onboarding containers, modals, HUD Dock; loads Corredora UI).
- `css/styles.css` (`2390L`): Styles, tokens & 3D perspective background.
- `data/catalogs.js` (`1013L`): Static catalogs, including housing choices and rental market values.
- `js/state.js` (`829L`): Persistent state, financial movements, credit helpers and simulated daily/monthly events.
- `js/ui-carousel-onboarding.js` (`607L`): Top PPT carousel (`N° 1`–`N° 42`) and 3-step Onboarding (`#view-step-4`, `#view-anchors`, `#view-character-summary`).
- `js/ui-trabajo.js` (`1338L`): `"Trabajo"` hub, employment/performance, courses, salary destination and payment history.
- `js/ui-banco-seguros.js` (`4309L`): `"Banco"` & `"Seguros"`; accounts, consumer/mortgage credit, revolving credit, FFMM, DAP and insurance.
- `js/ui-inversiones.js` (`3031L`): Other investments, wallet, purchase/redemption flows and investment returns.
- `js/ui-corredora.js` (`879L`): Property sale/rental listings, matching, settlement and contracts.
- `js/ui-personal.js` (`1380L`): `"Mi Estado"`; wellbeing, budget, assets/liabilities and financial movement history.

## Doc Index (Read only required file/line range)
- **Living State (`platon6/sitio-web/educacionFinanciera/.agents/`):**
  - [USE_CASES.md](../USE_CASES.md): Implemented user flows.
  - [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md): Stack & code map (`L1-16`), State/Onboarding/Test (`L18-37`), Jobs/Courses (`L39-56`), Bank/Insurance/Supabase (`L58-71`).
  - [ARCHITECTURE.md](../ARCHITECTURE.md): Dual Screen, 3-zone layout, HUD Dock sync, Supabase room sync.
  - [ENVIRONMENTS.md](../ENVIRONMENTS.md) & [REGRESSION_TESTS.md](../REGRESSION_TESTS.md).
- **External Docs (`platon6/docs/educacionFinanciera/`):**
  - [PRD_VISION.md](../../../../docs/educacionFinanciera/PRD_VISION.md): Vision & Dual Screen (`L1-21`), Theoretical authors & 14 interests table (`L23-51`).
  - [PRD_SPECS.md](../../../../docs/educacionFinanciera/PRD_SPECS.md): 46-slide script (`L1-30`), 7 places, 6 funds & tiers/dilemmas (`L32-58`), Events `E1-E8`/`O1-O9`/`T1-T9` & 8-yr timeline (`L60-96`), Math formulas (`L98-117`).
  - [DEVELOPMENT_PLAN.md](../../../../docs/educacionFinanciera/DEVELOPMENT_PLAN.md) & [CHANGELOG.md](../../../../docs/educacionFinanciera/CHANGELOG.md).
  - `platon6/docs/educacionFinanciera/changes/README.md`: concise pending-change record format and milestone consolidation procedure.

## Critical Rules
1. **HUD Dock sync:** Dock icon is `.active` ONLY when its showcase (`view-hub-stage`) is open in the middle zone; clear (`state.activeHudTab = null`) on slide change.
2. **Wellbeing naming:** Always use unified `"Bienestar"` (split into `"Salud Física"` 20, `"Salud Emocional"` 40, `"Salud Mental"` 40); never use *"Paz Mental"*.
3. **Lenguaje neutro:** Usar lenguaje español neutro, inclusivo y sin género en textos visibles, datos de interfaz, mensajes y contenido escrito. Evitar formas masculinas o femeninas genéricas cuando puedan expresarse con formulaciones neutras sin perjudicar la claridad ni la accesibilidad.
4. **Token-conscious changes:** For meaningful behavior changes, add one concise pending record in the external docs `changes/` folder; skip cosmetic edits and micro-fixes. Do not load aggregate docs for routine code tasks. At milestone/documentation closeout, follow `changes/README.md` and consolidate only pending records.
