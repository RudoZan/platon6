# AGENTS.md — Platón 6 (Portal Principal)

## 1. Propósito y Alcance
**Platón 6** es el portal web contenedor que centraliza y da acceso a múltiples sub-aplicaciones educativas y simuladores independientes alojados en sus propias subcarpetas.

## 2. Mapa de Documentación de Platón 6 (Carga Perezosa)
No escanees todo el repositorio. Lee únicamente el documento que necesites según la tarea actual:

- **Estado Actual del Portal (Grupo 3 — en `.agents/`):**
  - [TECHNICAL_SPEC.md](../TECHNICAL_SPEC.md): Stack tecnológico, paleta visual y especificación de base de datos Supabase (`codigos`).
  - [ARCHITECTURE.md](../ARCHITECTURE.md): Estructura del portal (`index.html`, `listado.html`), cliente compartido `js/supabaseClient.js` y relación con los sub-sitios.
  - [USE_CASES.md](../USE_CASES.md): Casos de uso del portal y procedimiento para registrar un nuevo sub-proyecto.
  - [ENVIRONMENTS.md](../ENVIRONMENTS.md): Ambientes de ejecución local, GitHub Pages y Supabase.
- **Modificaciones e Historial (Grupo 2 — fuera del repo):**
  - `../../documentacion/platon6/CHANGELOG.md`: Histórico de cambios del portal.
  - `../../documentacion/platon6/`: Documentos temporales de requerimientos o diseños en curso (`PRD.md`, `SOLUTION_DESIGN.md`).

## 3. Reglas Estrictas para Agentes de IA
1. **Cero frameworks pesados:** Usar exclusivamente Vanilla HTML5, CSS3 y JavaScript ES6+ sin bundlers ni dependencias de Node.js, salvo solicitud explícita del usuario.
2. **Aislamiento de sub-sitios:** Cuando trabajes en el portal general (`platon6`), **NO** escanees ni modifiques las carpetas internas de los sub-sitios (`educacionFinanciera/`, `englishCalen/`, `ajedrez/`, `dactilografia/`, `tallerRecursosEducativos/`, etc.) a menos que el usuario lo pida. Cada sub-sitio es autónomo.
3. **Documentación fuera del código público:** Todo documento de análisis, PDF, histórico o requerimiento temporal debe guardarse en `../../documentacion/platon6/`.
