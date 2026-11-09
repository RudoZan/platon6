# Regression Tests — Chess (`platon6/sitio-web/ajedrez/`)

Mandatory checks after any change in `platon6/sitio-web/ajedrez/`:
1. **Base Rendering:** `index.html`, `variantes.html`, `variantes-rudo.html`, and `curso.html` load `ajedrezFondo.png` and gold/dark-wood styling with zero console errors.
2. **Top Nav:** Links switch cleanly across all 4 pages.
3. **Classical Engine (`index.html`):** Enforces legal moves, blocks illegal moves/self-check, and supports castling, en passant, and pawn promotion.
4. **Training Mode & Player (`index.html`):** All 4 tabs (`"Piezas"`, `"Aperturas"`, `"Tácticas"`, `"Mates"`) load cleanly; step controls (`⏮ ‹ ▶ › ⏭`) advance/revert algebraic `movidas`; `"🔊 Escuchar explicación"` speaks `descripcion` and stops cleanly on item change.
