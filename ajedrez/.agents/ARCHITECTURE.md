# Architecture — Chess (`platon6/sitio-web/ajedrez/`)

## 1. Multi-Page Client Architecture (MPA)
Standalone 100% client-side sub-site in `platon6/sitio-web/ajedrez/`. Pages (`index.html`, `variantes.html`, `variantes-rudo.html`, `curso.html`) link via a shared top navigation bar.

## 2. Internal Flow (`platon6/sitio-web/ajedrez/index.html`)
1. **Board & Rule Engine:** Maintains 64-square state in memory, validates legal moves per piece, and updates board DOM on each move.
2. **Training Subsystem:**
   - Reads static arrays (`NIVELES_MATERIAL`, `APERTURAS`, `TACTICAS_ESTRATEGIAS`, `MATES`).
   - Selecting an item resets the board and enables step player controls (`⏮ ‹ ▶ › ⏭`) to apply/revert algebraic `movidas`.
   - Syncs side text panel with `"🔊 Escuchar explicación"` (`window.speechSynthesis` speaking `descripcion`).
