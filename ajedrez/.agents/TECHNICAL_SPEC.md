# Especificación Técnica — Ajedrez

*¿Con qué está hecho y qué datos guarda?*

## 1. Stack Tecnológico
- **Frontend:** HTML5, CSS3 (variables CSS nativas) y JavaScript Vanilla (ES6+) embebido/modular por página.
- **Audio / TTS:** Web Speech API (`window.speechSynthesis`) para la lectura en voz alta de explicaciones pedagógicas (`🔊 Escuchar explicación`).
- **Dependencias externas:** Ninguna librería pesada ni framework de UI.

## 2. Identidad Visual y Recursos
- **Estética:** Paleta dorada sobre madera oscura, tipografía serif (`Georgia`), definida mediante variables CSS en cada archivo HTML.
- **Recursos gráficos:**
  - `ajedrezFondo.png`: Imagen de fondo compartida por las páginas del módulo.
  - `images/`: Recursos gráficos e íconos de apoyo del sub-sitio.

## 3. Estructura de Archivos (`sitio-web/ajedrez/`)
| Archivo | Rol técnico |
|---|---|
| `index.html` | Tablero de Ajedrez Clásico jugable + Modo Entrenamiento con 4 pestañas. |
| `variantes.html` | Tablero y reglas para variantes reconocidas del ajedrez. |
| `variantes-rudo.html` | Tablero y reglas para variantes experimentales / propias. |
| `curso.html` | Interfaz del curso estructurado de ajedrez. |

## 4. Modelo de Datos en `index.html` (Modo Entrenamiento)
Las cuatro pestañas del modo Entrenamiento se alimentan de arreglos de objetos en JavaScript dentro de `index.html`:

| Pestaña | Array JS | Contenido actual |
|---|---|---|
| **Piezas** | `NIVELES_MATERIAL` | 5 pasos progresivos: peones → caballos → alfiles → reina → torres. |
| **Aperturas** | `APERTURAS` | 19 aperturas clasificadas en 3 niveles (Principiante, Intermedio, Avanzado). |
| **Tácticas** | `TACTICAS_ESTRATEGIAS` | Tenedor, clavada, descubierta, enfilada, desviación, finales de peones 2v2 y 3v3. |
| **Mates** | `MATES` | Mate del loco, pastor, pasillo, escalera, dama y rey. |

### Esquema de cada elemento de entrenamiento
- `nombre` (`string`): Título de la apertura, táctica o mate.
- `nivel` (`string`): Nivel pedagógico (`Principiante`, `Intermedio`, `Avanzado`).
- `movidas` (`string[]` / notación algebraica): Secuencia de jugadas reproducibles por el control paso a paso (`⏮ ‹ ▶ › ⏭`).
- `descripcion` (`string`): Explicación conceptual mostrada en pantalla y leída en voz alta por el sintetizador de voz.

### Aperturas registradas actualmente en `APERTURAS` (`index.html`, línea ~552)
- **Principiante (4):** Sistema Londres · Apertura Italiana · Sistema Colle · Defensa Escandinava.
- **Intermedio (8):** Ruy López · Defensa Siciliana · Defensa Francesa · Defensa Caro-Kann · Gambito de Dama · Defensa India de Rey · Apertura Inglesa · Gambito de Rey.
- **Avanzado (6):** Defensa Pirc · Defensa Alekhine · Defensa Nimzo-India · Apertura Catalana · Apertura Réti · Apertura Bird.
