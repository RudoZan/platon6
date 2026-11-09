# Platón 6 (Main Portal)
Container portal hosting independent educational web apps and simulators.

## Doc Index (Read on demand only)
- **Living State (`platon6/sitio-web/.agents/`):** [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md) (stack, palette, Supabase `codigos`), [ARCHITECTURE.md](../ARCHITECTURE.md) (`index.html`, `listado.html`, `js/supabaseClient.js`), [USE_CASES.md](../USE_CASES.md), [ENVIRONMENTS.md](../ENVIRONMENTS.md).
- **External Docs (`platon6/docs/platon6/`):** `../../docs/platon6/CHANGELOG.md` and temporary PRDs/designs.

## Project Rules
1. **Stack:** Pure Vanilla HTML5/CSS3/ES6+ JS only (no bundlers or Node dependencies unless requested).
2. **Sub-site isolation:** When working on the root portal, NEVER scan or edit sub-site folders (`educacionFinanciera/`, `englishCalen2026/`, `ajedrez/`, `trino/`, `dactilografia/`, `tallerRecursosEducativos/`, etc.) unless explicitly instructed.
3. **External docs:** Store all analysis, PDFs, changelogs, and temporary specs in `platon6/docs/platon6/`.
