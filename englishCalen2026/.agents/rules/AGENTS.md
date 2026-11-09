# Calen English Class (`englishCalen2026`)
Dual-window interactive English teaching platform in `platon6/sitio-web/englishCalen2026/`.

## Doc Index (Read on demand only)
- **Living State (`platon6/sitio-web/englishCalen2026/.agents/`):** [USE_CASES.md](../USE_CASES.md), [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md) (`5to-6to.js`, `7mo-8vo.js`, MediaPipe, assets), [ARCHITECTURE.md](../ARCHITECTURE.md) (`index.html` ↔ `presentation.html` via `BroadcastChannel`/Supabase), [REGRESSION_TESTS.md](../REGRESSION_TESTS.md).
- **External Docs (`platon6/docs/englishCalen2026/`):** `PRD_VISION.md`, `PRD_SPECS.md` (Canva scenes `Scene Street/Garden/Backyard`), `CHANGELOG.md`, `referencias/`, `herramientas/`.

## Glossary & Critical Rules
- **PC (`index.html`):** Teacher Control Panel. **VP (`presentation.html`):** Student Projection Window (`PS` = top-left webcam/game panel; `PI` = bottom main content `#names`, `#middle`, `#bottom`).
- **`photo-word` rendering in VP:** Words sent from photo activity MUST always render stacked vertically (`flex-direction: column; gap: 16px`), newline-separated (`\n`), never pipe-concatenated (`|`).
