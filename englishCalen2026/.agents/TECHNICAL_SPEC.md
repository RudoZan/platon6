# Especificación Técnica — Calen English Class (`englishCalen2026`)

*¿Con qué está hecho y qué datos guarda?*

## 1. Stack Tecnológico
- **Frontend:** HTML5, CSS3 y JavaScript Vanilla (ES6+).
- **Visión por Computador (Local):** MediaPipe Vision (`vendor/mediapipe/vision_bundle.mjs`, `selfie_segmenter.tflite` y binarios WASM en `vendor/mediapipe/wasm/`) para segmentación de persona/fondo en la cámara en vivo.
- **Comunicación entre ventanas:** API nativa `BroadcastChannel` y sincronización opcional con Supabase (`../js/supabaseClient.js`).
- **Tipografías:** Google Fonts (`Outfit` y `Satisfy`).

## 2. Nomenclatura de Interfaces
- **PC (Panel de Control):** `index.html` (interfaz del profesor).
- **VP (Ventana de Presentación):** `presentation.html` (pantalla proyectada a la clase).
- **PS (Panel Superior):** Cuadrante superior izquierdo de la VP (webcam y vista lateral).
- **PI (Panel Inferior):** Contenedor principal inferior de la VP (`.content-box`, `#names`, `#middle`, `#bottom`).

## 3. Estructura de Archivos del Sub-sitio (`sitio-web/englishCalen2026/`)
| Ruta | Contenido y rol técnico |
|---|---|
| `index.html` | Aplicación del Panel de Control (PC). |
| `presentation.html` | Aplicación de la Ventana de Presentación (VP). |
| `activities/shared.js` | Constantes de rutas (`IMG`, `FLAG`, `DIBUJOS`, `PHOTOS`, `CPHOTOS`) y bancos de datos compartidos (`CALEN_PHOTOS`, `ALREADY_KNOW_ENGLISH`, `COUNTRY_FLAG_CODE`). |
| `courses/5to-6to.js` | Definición de unidades y actividades para 5° y 6° Básico (`COURSES['5to-6to']`). |
| `courses/7mo-8vo.js` | Definición de unidades y actividades para 7° y 8° Básico (`COURSES['7mo-8vo']`). |
| `game1/game-data.js` y `house-map.js` | Datos y mapa de navegación del juego interactivo por escenas. |
| `Reference/*.html` | 4 documentos HTML de referencia docente invocados mediante `window.open()` desde `index.html`. |
| `Images/`, `photosCalen/`, `curso-fotos-paises/`, `dibujos/`, `StoryImages/` | Bancos de imágenes optimizadas (`.webp`, `.jpg`, `.png`, `.svg`) para banderas, fotos locales de Calen, países, vocabulario e ilustraciones de escenas. |
| `vendor/mediapipe/` | Modelos y runtime WASM locales de MediaPipe Selfie Segmenter. |
