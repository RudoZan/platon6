# Pruebas de Regresión — Calen English Class (`englishCalen2026`)

Verificaciones esenciales antes de dar por finalizado cualquier cambio en `sitio-web/englishCalen2026/`:

1. **Sincronización PC ↔ VP:**
   - [ ] Al abrir `index.html` (PC) y lanzar `presentation.html` (VP), la selección de curso (`5° & 6°` / `7° & 8°`), nombres de alumnos y preguntas/respuestas se refleja instantáneamente en la VP.
2. **Actividad de Fotos y Palabras (`photo-word`):**
   - [ ] Al seleccionar múltiples palabras de una foto en el PC, en la VP se muestran **apiladas verticalmente una debajo de otra** dentro de `.photo-panel-words` (sin barras verticales `|` concatenadas).
3. **Carga de Activos y Rutas:**
   - [ ] Cargan sin errores 404 las imágenes de `Images/flags/`, `photosCalen/`, `curso-fotos-paises/`, `dibujos/` y `StoryImages/`.
4. **Referencias Docentes (`Reference/`):**
   - [ ] Los botones de *Teacher Reference 5° & 6°*, *Teacher Reference 7° & 8°*, *Bases Curriculares* y *Pronunciación Mineduc* abren sus respectivos HTML desde `Reference/`.
5. **Cámara y Juego (`game1`):**
   - [ ] El módulo MediaPipe (`vendor/mediapipe/`) y el mapa de `game1/` inicializan sin errores de consola en la VP.
