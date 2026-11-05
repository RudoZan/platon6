# Technical Specification — `educacionFinanciera`
> **Target App Language:** Spanish (Chilean context). Keep all UI labels and data strings in Spanish.

## 1. Tech Stack & Modular Code Map (`platon6/sitio-web/educacionFinanciera/`)
- **Frontend:** Pure Vanilla HTML5, CSS3, ES6+ JS (zero bundlers; works via local `file://` and GitHub Pages).
- **Backend/BaaS:** Supabase JS SDK v2 (`../js/supabaseClient.js` via `getPlaton6Supabase()`).
- **Modular File Architecture:**
  - `index.html` (`400 lines`): Clean HTML shell (3 zones, onboarding containers, modals, HUD Dock).
  - `css/styles.css` (`2,390 lines`): Design tokens, 3D perspective background, and component styles.
  - `data/catalogs.js` (`924 lines`): Static templates/JSON catalogs (`slidesData`, `homeOptions`, `jobOptions`, `transportOptions`, `hubsData`, `coursesCatalogData`, `jobOffersData`, `segurosCatalog`, `getInsuranceCoverages`, `officialRiskQuestions`).
  - `js/state.js` (`348 lines`): Shared global `state` in memory + cross-module helpers (`checkProfileCompletion`, `syncDefaultAnchorsUI`, `getAssetInsurancePricing`, `getUserInsuranceAssets`, `getBienestarFace`, `renderHeartsMeter`, `renderHubCentralStage`, `selectHudTab`, `updateHUD`).
  - `js/ui-carousel-onboarding.js` (`607 lines`): Top PPT carousel (with `N° 1`–`N° 42` badges) and 3-step Onboarding (`#view-step-4`, `#view-anchors`, `#view-character-summary`).
  - `js/ui-trabajo.js` (`1,183 lines`): `"Trabajo"` hub (`renderTrabajoStage`, courses, boss negotiation chat `initNegChat`/`handleNegChatOption`, job hire/resignation).
  - `js/ui-banco-seguros.js` (`2,643 lines`): `"Banco"` & `"Seguros"` hub (`renderBancoStage`, accounts, `"Cuenta Corriente"` multi-step bundle, credit line/card, `"Depósitos a Plazo (DAP)"`, multi-asset insurance).
  - `js/ui-personal.js` (`1,308 lines`): `"Mi Estado"` (`Personal`) hub (`"Bienestar"`, 3-col budget, net worth & liquidity, 5-Q Investor Test, secret audit `secret_summary`).

## 2. State Model (`state`) & Character Variables
### 2.1. Unified `"Bienestar"` Breakdown (100 Points)
- **`"Salud Física"` (`20 pts`):** Physiological base (Engel, 1977).
- **`"Salud Emocional"` (`40 pts`):** Immediate affective balance & financial stress reactivity (Diener, 1984; Kahneman, 2010).
- **`"Salud Mental"` (`40 pts`):** Cognitive clarity, purpose & autonomy (Ryff, 1989; Keyes, 2002).
- **Visuals:** 20 SVG hearts (1 heart = 5 pts, filled vertically 2 per column) + 11 emojis: `['🤩', '😁', '😊', '😐', '🤨', '😟', '🥺', '😰', '😩', '😱', '😵']`.

### 2.2. Onboarding: Interests & Initial Decisions
- **14 Personal Interests (Scale 1–3):** 1. `🏠 Hogar & Decoración` · 2. `🚗 Comodidad al movilizarse` · 3. `🐾 Mascotas & Animales` · 4. `💻 Tecnología & Herramientas` · 5. `✈️ Viajes & Vacaciones` · 6. `🍽️ Gastronomía & Salidas` · 7. `🎸 Conciertos & Festivales` · 8. `📚 Educación & Aprendizaje` · 9. `🎨 Hobbies & Pasatiempos` · 10. `🏋️ Deporte & Salud Física` · 11. `🏕️ Naturaleza & Vida al Aire Libre` · 12. `👗 Moda, Imagen & Estilo` · 13. `🎮 Gaming & Ocio Digital` · 14. `🤝 Familia & Amigos`.
- **Initial Decisions (3 domains × 4 options):**
  - *`"Vivienda"`*: `"Casa o Depto en condominio"` · `"Departamento centro"` · `"Casa Barrio tradicional"` · `"Parcela de agrado"`.
  - *`"Trabajo"`*: `"Freelance sueldo medio"` (~$1.4M) · `"Trabajo dependiente sueldo medio"` (~$1.4M) · `"Trabajo sueldo mínimo"` (~$500k) · `"Trabajo administrativo sueldo alto"` (~$2.2M).
  - *`"Transporte"`*: `"SUV"` · `"City Car"` · `"Locomoción colectiva"` · `"Auto deportivo o de lujo"`.

### 2.3. Official Investor Profile Test (UAH / Experian — 5 Questions, 1–3 pts each)
1. **Main goal:** A) `"Proteger mi capital"` (1) · B) `"Rentabilidad moderada con algo de riesgo"` (2) · C) `"Maximizar ganancias asumiendo riesgos"` (3).
2. **Reaction to 15% monthly drop:** A) `"Vendo inmediatamente"` (1) · B) `"Espero a que se recupere"` (2) · C) `"Aprovecho para invertir más"` (3).
3. **Time horizon:** A) `"Menos de 1 año"` (1) · B) `"Entre 1 y 5 años"` (2) · C) `"Más de 5 años"` (3).
4. **If losing all invested capital:** A) `"No invierto nunca más"` (1) · B) `"Lo pensaría muy bien antes de volver"` (2) · C) `"Sigo invirtiendo pero con más cuidado"` (3).
5. **Income % willing to invest:** A) `"Menos del 10%"` (1) · B) `"Entre 10% y 25%"` (2) · C) `"Más del 25%"` (3).
- **Tiers:** **5–8 pts:** `"Conservador"` (DAP, Ahorro) · **9–11 pts:** `"Moderado"` (FFMM balanceados, Cuenta 2 AFP) · **12–15 pts:** `"Arriesgado"` (Acciones, ETFs, Cripto).

### 2.4. Job Catalog (6 Positions in `"Búsqueda de Trabajo"`)
| ID | Position (`Cargo`) | Gross Salary | Net Salary | Entry Requirements | Max Promotions |
|---|---|---:|---:|---|---|
| 1 | `"Responsabilidad Directiva"` | \$3.125.000 | \$2.500.000 | Prior exp + $\ge 1$ certified course | 1 (Lvl 1 → 2) |
| 2 | `"Profesional Especializado"` | \$2.625.000 | \$2.100.000 | Prior exp + $\ge 1$ certified course | 2 (Lvl 1 → 3) |
| 3 | `"Gestión Operativa / Administrativa"` | \$1.185.000 | \$950.000 | $\ge 1$ certified course (no exp req) | 2 (Lvl 1 → 3) |
| 4 | `"Gestión Comercial & Servicios"` | \$812.000 base | \$650.000 base + comm. | None | 1 (Lvl 1 → 2) |
| 5 | `"Independiente / Freelance"` | Variable | ~\$950.000 est. | None | Self-employed (direct course boost) |
| 6 | `"Apoyo Operativo"` | \$556.000 | \$450.000 | None | 1 (Lvl 1 → 2) |

### 2.5. Training Courses Matrix (8 Courses in 4 Areas)
- **Areas:** `"Capacitación"` (`a` Intermedio, `b` Avanzado), `"Comercial"` (`c` Intermedio, `d` Avanzado), `"Administración"` (`e` Intermedio, `f` Avanzado), `"Especialización"` (`g` Intermedio, `h` Avanzado).
- **Strict prerequisite:** `"Nivel Avanzado"` requires passing `"Nivel Intermedio"` of the same area first.
- **Salary & promotion impact:** Matching Intermedio (⭐) = **+10%**; Matching Avanzado (🌟) = **+15% + unlocks 1 promotion**. Non-matching = +2% to +5%, no promotion.
- **Job affinities:** Directiva (`c, e, g, f🌟`) · Especializado (`a, g, b🌟, h🌟`) · Operativa (`a, e, b🌟, f🌟`) · Comercial (`a, c, g, d🌟`) · Independiente (`a, c, e, g`) · Apoyo Operativo (`a, e, g, b🌟`).

### 2.6. Bank Products, Bundle Fees & Term Deposits (`DAP`)
- **8 Bank Sections:** `"Cuenta Ahorro"` (`🐖`, UF + 1.0%/yr), `"Cuenta RUT / Vista"` (`💳`, \$0 fee), `"Cuenta Corriente"` (`🏦`), `"Líneas de Crédito"` (`⚡`), `"Tarjeta de Crédito"` (`💳`), `"Fondos Mutuos"` (`📊`), `"Depósitos a Plazo"` (`⏳`), `"Seguros"` (`🛡️`).
- **`"Cuenta Corriente"` Multi-Step Bundle:** Base fee **\$14.000/mo** (**\$7.000/mo** with 1 add-on; **\$0/mo** with both `"Línea de Crédito"` + `"Tarjeta de Crédito"`). `"Línea de Crédito"` (**\$500.000**) requires active `"Cuenta Corriente"` + mandatory `"Seguro de Desgravamen"` (**\$1.900/mo**). `"Tarjeta de Crédito"` (**\$950.000**, single unified card per Ley 20.555) costs **\$6.900/mo** (\$0 if zero balance/activity) and links automatically to `"Cuenta Corriente"`. Closing `"Cuenta Corriente"`, `"Línea de Crédito"`, or `"Tarjeta de Crédito"` enforces 100% debt liquidation from cash/liquid accounts.
- **`"Depósitos a Plazo (DAP)"` (`state.termDeposits`):** Supports multiple simultaneous deposits (`30 días` 0.39%, `90 días` 1.15%, `360 días UF` 5.20% nominal). Strictly locked until maturity (no mid-term switch between *Plazo Fijo* and *Plazo Renovable* per CMF / Banco Central Cap. III.B.1). *Plazo Fijo* auto-pays to destination account at maturity; *Plazo Renovable* opens a 3-business-day grace window modal at maturity to collect or auto-renew with compounded interest on day 4.

### 2.7. Insurance Pricing (`"Seguros"`)
- **Multi-Vehicle (`ins_automotriz_${assetId}`):** `"City Car"` **\$28.000/mo**, `"SUV"` **\$38.000/mo**, `"Deportivo"` **\$65.000/mo** (generic base: \$32.000/mo).
- **Multi-Property (`ins_vivienda_${assetId}`, quake/fire only, no theft):** `"Depto en el centro"` **\$11.000/mo**, `"Casa en barrio"` **\$13.500/mo**, `"Casa en condominio"` **\$15.500/mo**, `"Parcela"` **\$22.000/mo** (generic base: \$12.000/mo).
- **Single Policies:** `"Fraude"` **\$1.150/mo** (Ley 21.234; requires `"Cuenta RUT / Vista"`, `"Cuenta Corriente"`, or `"Tarjeta de Crédito"` — excludes `"Cuenta de Ahorro"`), `"Desgravamen"` **\$1.900/mo**, `"Cesantía"` **\$4.500/mo**, `"Vida"` **\$9.500/mo** (\$20M / ~525 UF cover), `"Salud Complementario"` **\$14.000/mo**.

## 3. Session Room ID & Supabase Tables
- **Room ID:** `YYYYMM` + 4-digit code (`1000`–`9999`), e.g. `2026101042`.
- **Tables:** `platon6_finanzas_sesiones`, `platon6_finanzas_respuestas`.

## 4. Content and Language Conventions
- **Neutral language without gender:** All visible UI copy, labels, messages, instructions, validation text, and stored user-facing strings MUST use Spanish language that is neutral, inclusive, and without grammatical gender when gender is not functionally relevant. Prefer neutral formulations that preserve clarity and accessibility; avoid generic masculine or feminine forms when a neutral alternative is natural.
