# AGENTS.md — Ajedrez (Sub-sitio de Platón 6)

## 1. Propósito y Alcance
Recurso interactivo de aprendizaje y práctica de ajedrez alojado en `sitio-web/ajedrez/`, autónomo dentro del portal **Platón 6**. Incluye ajedrez clásico con modo de entrenamiento guiado, variantes reconocidas, variantes experimentales ("Variantes Rudo") y el módulo de curso progresivo por niveles.

## 2. Mapa de Documentación (Carga Perezosa)
No escanees todos los archivos a la vez. Lee únicamente el documento que corresponda a tu tarea:

- **Estado Actual del Código (Grupo 3 — en `.agents/`):**
  - [USE_CASES.md](../USE_CASES.md): Casos de uso activos en la aplicación web.
  - [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md): Stack tecnológico, estética, páginas y estructuras de datos (`NIVELES_MATERIAL`, `APERTURAS`, `TACTICAS_ESTRATEGIAS`, `MATES`).
  - [ARCHITECTURE.md](../ARCHITECTURE.md): Flujo entre páginas, motor local de tablero y reproductor paso a paso con síntesis de voz.
  - [REGRESSION_TESTS.md](../REGRESSION_TESTS.md): Pruebas críticas de regresión antes de cerrar cambios.
- **Requerimientos, Contenido Pedagógico e Historial (Grupo 2 — en `../../../docs/ajedrez/`):**
  - `../../../docs/ajedrez/PRD_VISION.md`: Visión del producto y hoja de ruta (subvariantes, estructuras de peones y sistema de hitos para los 3 cursos).
  - `../../../docs/ajedrez/PRD_SPECS.md`: Especificaciones y correcciones pendientes de contenido y datos en el código actual.
  - `../../../docs/ajedrez/ajedrez-contenidos.md`: Fuente de verdad del contenido pedagógico (historia, aperturas, tácticas, estrategia, mates, finales y reloj).
  - `../../../docs/ajedrez/ajedrez-curso-principiante.md`: Secuencia de clases e hitos del nivel Principiante.
  - `../../../docs/ajedrez/ajedrez-curso-intermedio.md`: Secuencia de clases e hitos del nivel Intermedio.
  - `../../../docs/ajedrez/ajedrez-curso-avanzado.md`: Secuencia de clases e hitos del nivel Avanzado.
  - `../../../docs/ajedrez/CHANGELOG.md`: Registro histórico de versiones y cambios.

## 3. Reglas Específicas del Proyecto
1. **Vanilla Web Stack:** Mantener HTML5, CSS3 y JavaScript ES6+ puro sin bundlers ni dependencias externas innecesarias.
2. **Impacto pedagógico del campo `descripcion`:** En el modo Entrenamiento (`index.html`), el campo `descripcion` es lo único que el alumno lee y escucha mediante síntesis de voz (`🔊 Escuchar explicación`). Cualquier cambio en ese texto debe respetar la fuente de verdad en `../../../docs/ajedrez/ajedrez-contenidos.md`.
3. **Aislamiento:** No modificar archivos del portal raíz (`sitio-web/index.html`, `sitio-web/listado.html`) ni de otros sub-sitios a menos que se solicite explícitamente.
