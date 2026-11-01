# Casos de Uso — Calen English Class (`englishCalen2026`)

## CU-01: Gestión de Clase desde el Panel de Control (`index.html` — PC)
- **Actor:** Docente.
- **Descripción:** Permite abrir la Ventana de Presentación (`presentation.html`), registrar y seleccionar alumnos participantes (en duplas o individual), elegir el curso activo (`5° & 6°` o `7° & 8°`) y disparar actividades interactivas en tiempo real hacia la pantalla proyectada.

## CU-02: Proyección Sincronizada para Estudiantes (`presentation.html` — VP)
- **Actor:** Estudiantes (visualización en proyector / segunda pantalla).
- **Descripción:** Recibe eventos en tiempo real desde el PC y muestra los nombres de los estudiantes seleccionados, preguntas, respuestas, banderas, fotos de países, vocabulario ilustrado, cámara del docente con segmentación de fondo (MediaPipe) y el mapa del juego interactivo.

## CU-03: Actividad de Fotos de Calen y Vocabulario (`photo-word`)
- **Actor:** Docente y Estudiantes.
- **Descripción:** El docente selecciona fotografías locales (`photosCalen/`) y activa una o más palabras de vocabulario asociadas. Las palabras seleccionadas se envían con salto de línea (`shown.join('\n')`) y se proyectan apiladas verticalmente en el panel lateral de la VP.

## CU-04: Exploración de Países e Idiomas (`country-panel`)
- **Actor:** Docente y Estudiantes.
- **Descripción:** Muestra mapas, banderas, fotos históricas y lugares icónicos de distintos países (`curso-fotos-paises/`) con animaciones de transición y saludos en cada idioma.

## CU-05: Juego Interactivo de Exploración (`game1`)
- **Actor:** Docente y Estudiantes.
- **Descripción:** Recorrido interactivo por escenas e interiores/exteriores (`house-map.js`, `game-data.js` y `StoryImages/`) controlado desde el PC y proyectado en la VP.

## CU-06: Consulta de Referencias Docentes (`Reference/`)
- **Actor:** Docente.
- **Descripción:** Apertura rápida en ventanas emergentes de las guías docentes por curso (`5to -6to.html`, `7mo y 8vo unit3_sports_teacher_reference.html`), bases curriculares (`bases-curriculares.html`) y guía de pronunciación Mineduc (`pronunciacion-mineduc.html`).
