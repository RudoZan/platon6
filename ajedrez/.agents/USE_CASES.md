# Use Cases — Chess (`platon6/sitio-web/ajedrez/`)

## UC-01: Classical Chess Game (`index.html`)
- Interactive classical chess board enforcing official FIDE movement rules (check, checkmate, stalemate, castling, en passant, promotion).

## UC-02: Progressive Training Mode (`index.html`)
- User selects 1 of 4 training tabs (`"Piezas"`, `"Aperturas"`, `"Tácticas"`, `"Mates"`), picks an item by level (`"Principiante"`, `"Intermedio"`, `"Avanzado"`), and steps through algebraic `movidas` via player controls (`⏮ ‹ ▶ › ⏭`).
- **Voice TTS:** `"🔊 Escuchar explicación"` reads the item's `descripcion` field via `window.speechSynthesis`.

## UC-03: Recognized Chess Variants (`variantes.html`)
- Play standard recognized chess variants with custom board setups and rules.

## UC-04: Experimental Rudo Variants (`variantes-rudo.html`)
- Play custom experimental variants created for the project.

## UC-05: Structured Chess Course (`curso.html`)
- Leveled course navigation across lessons and milestones.
