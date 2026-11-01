# AGENTS.md — Calen English Class (`englishCalen2026`)

## 1. Propósito y Alcance
Plataforma educativa web interactiva diseñada para la enseñanza audiovisual de inglés, vocabulario y estructuras gramaticales en clases presenciales o híbridas (Escuela de Calen, Chiloé), alojada en `sitio-web/englishCalen2026/` dentro de **Platón 6**.

## 2. Mapa de Documentación (Carga Perezosa)
Lee únicamente el documento necesario para tu tarea actual:

- **Estado Actual del Código (Grupo 3 — en `.agents/`):**
  - [USE_CASES.md](../USE_CASES.md): Casos de uso del docente y de la ventana de proyección.
  - [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md): Stack tecnológico, cursos (`5to-6to.js`, `7mo-8vo.js`), MediaPipe, estructura de activos y glosario de paneles (`PC`, `VP`, `PS`, `PI`).
  - [ARCHITECTURE.md](../ARCHITECTURE.md): Arquitectura de ventanas sincronizadas (`index.html` ↔ `presentation.html`) mediante `BroadcastChannel` y Supabase.
  - [REGRESSION_TESTS.md](../REGRESSION_TESTS.md): Verificaciones obligatorias (renderizado vertical en `photo-word`, sincronización y cámara).
- **Requerimientos, Escenas e Historial (Grupo 2 — en `../../../docs/englishCalen2026/`):**
  - `../../../docs/englishCalen2026/PRD_VISION.md`: Visión del producto y evolución del juego de exploración por escenas (`game1`).
  - `../../../docs/englishCalen2026/PRD_SPECS.md`: Especificaciones de escenas e ilustraciones Canva (`Scene Street`, `Scene Garden`, `Scene Backyard`) y guía de estilo visual.
  - `../../../docs/englishCalen2026/CHANGELOG.md`: Historial de versiones y fixes aplicados.
  - `../../../docs/englishCalen2026/referencias/`: Documentos curriculares y tablas de apoyo en formato `.docx`.
  - `../../../docs/englishCalen2026/herramientas/`: Prototipos auxiliares (`color-preview.html`, `group-words.html`, `copiar_imagenes.sh`).

## 3. Glosario y Reglas Críticas
- **PC (Panel de Control — `index.html`):** Interfaz exclusiva del profesor para gestionar alumnos, actividades, imágenes, cámara y juego.
- **VP (Ventana de Presentación — `presentation.html`):** Interfaz proyectada a los estudiantes sin controles de edición.
- **PS (Panel Superior en VP):** Cuadrante superior izquierdo de la VP (webcam y panel lateral del juego).
- **PI (Panel Inferior en VP):** Sección principal inferior de la VP (`.content-box`, `#names`, `#middle`, `#bottom`).
- **Regla de renderizado `photo-word`:** En la VP, las palabras enviadas desde la actividad de fotos **siempre deben mostrarse apiladas verticalmente una debajo de otra** (`flex-direction: column; gap: 16px`), separadas por salto de línea (`\n`), nunca concatenadas con barras (`|`).
