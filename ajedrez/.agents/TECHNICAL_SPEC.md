# Technical Specification — Chess (`platon6/sitio-web/ajedrez/`)
> **Target App Language:** Spanish.

## 1. Tech Stack & Visual Identity
- **Frontend:** Pure Vanilla HTML5, CSS3 (native variables), ES6+ JS.
- **TTS Audio:** Web Speech API (`window.speechSynthesis`) for `"🔊 Escuchar explicación"`.
- **Visuals:** Gold-on-dark-wood palette, `Georgia` serif font, `ajedrezFondo.png` background, `images/` assets.

## 2. Files (`platon6/sitio-web/ajedrez/`)
- `index.html`: Classical Chess board + 4-tab Training Mode.
- `variantes.html`: Recognized chess variants.
- `variantes-rudo.html`: Experimental custom variants.
- `curso.html`: Leveled course interface.

## 3. Training Data Model (`platon6/sitio-web/ajedrez/index.html`)
| Tab | JS Array | Current Content |
|---|---|---|
| `"Piezas"` | `NIVELES_MATERIAL` | 5 progressive steps: pawns → knights → bishops → queen → rooks |
| `"Aperturas"` | `APERTURAS` | 19 openings across 3 levels (`"Principiante"`, `"Intermedio"`, `"Avanzado"`) |
| `"Tácticas"` | `TACTICAS_ESTRATEGIAS` | Fork, pin, discovered attack, skewer, deflection, 2v2 & 3v3 pawn endgames |
| `"Mates"` | `MATES` | Fool's, Scholar's, Back-rank, Ladder, Queen + King mates |

- **Item Schema:** `{ nombre: string, nivel: 'Principiante'|'Intermedio'|'Avanzado', movidas: string[], descripcion: string }`.
- **Current `APERTURAS` (`index.html`, ~L552):**
  - `"Principiante"` (4): Sistema Londres · Apertura Italiana · Sistema Colle · Defensa Escandinava.
  - `"Intermedio"` (8): Ruy López · Defensa Siciliana · Defensa Francesa · Defensa Caro-Kann · Gambito de Dama · Defensa India de Rey · Apertura Inglesa · Gambito de Rey.
  - `"Avanzado"` (6): Defensa Pirc · Defensa Alekhine · Defensa Nimzo-India · Apertura Catalana · Apertura Réti · Apertura Bird.
