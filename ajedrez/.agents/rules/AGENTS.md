# Chess (`ajedrez`)
Autonomous interactive chess training, variants ("Variantes Rudo"), and leveled course app in `platon6/sitio-web/ajedrez/`.

## Doc Index (Read on demand only)
- **Living State (`platon6/sitio-web/ajedrez/.agents/`):** [USE_CASES.md](../USE_CASES.md), [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md) (stack, data structures `NIVELES_MATERIAL`, `APERTURAS`, `TACTICAS_ESTRATEGIAS`, `MATES`), [ARCHITECTURE.md](../ARCHITECTURE.md) (board engine, step player, TTS), [REGRESSION_TESTS.md](../REGRESSION_TESTS.md).
- **External Docs (`platon6/docs/ajedrez/`):** `PRD_VISION.md`, `PRD_SPECS.md`, `CHANGELOG.md`, and pedagogical source-of-truth files (`ajedrez-contenidos.md`, `ajedrez-curso-principiante.md`, `ajedrez-curso-intermedio.md`, `ajedrez-curso-avanzado.md`).

## Critical Rules
1. **Stack:** Pure Vanilla HTML5/CSS3/ES6+ JS.
2. **TTS `descripcion` field:** In Training mode (`index.html`), `descripcion` is spoken via Web Speech API and must strictly match `platon6/docs/ajedrez/ajedrez-contenidos.md`.
3. **Isolation:** Do not edit root portal or sibling sub-sites unless requested.
