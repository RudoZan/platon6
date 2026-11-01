# USE_CASES.md — Platón 6 (Portal Principal)

> **Propósito:** Describe los casos de uso vigentes del portal contenedor Platón 6.

---

## CU-01: Ingreso mediante Código de Acceso en Portada (`index.html`)
- **Actor:** Usuario / Estudiante / Docente.
- **Flujo Principal:**
  1. El usuario abre `index.html` e ingresa un código de acceso.
  2. El sistema verifica el código (en la tabla `codigos` de Supabase o en la configuración de accesos del portal).
  3. Si el código corresponde a una aplicación específica o al catálogo general, redirige al usuario al recurso correspondiente.
- **Excepciones:**
  - **Código inválido:** Se muestra retroalimentación visual en pantalla sin redirigir.

---

## CU-02: Exploración del Catálogo de Proyectos (`listado.html`)
- **Actor:** Usuario con acceso al catálogo.
- **Flujo Principal:**
  1. El usuario accede a `listado.html`.
  2. Visualiza las tarjetas organizadas por categorías:
     - *Proyectos propios* (`tallerRecursosEducativos/`, `englishCalen/`, `educacionFinanciera/`, `ajedrez/`, `dactilografia/`, `practicaConmigo/`).
     - *Trabajos Usach* (`trabajosUsach/*`).
     - *Pruebas y prototipos* (`pruebas/*`, `ideasSueltas/*`).
  3. Al seleccionar una tarjeta, navega al `index.html` del sub-proyecto elegido.

---

## CU-03: Incorporación de un Nuevo Sub-Proyecto al Portal
- **Actor:** Desarrollador / Administrador de Platón 6.
- **Flujo Principal:**
  1. Crear la carpeta del nuevo proyecto dentro de `sitio-web/<nombre-proyecto>/` con su propio `index.html`.
  2. Agregar la tarjeta de acceso correspondiente en `sitio-web/listado.html`.
  3. *(Opcional)* Si requiere acceso directo por código desde la portada, registrar el código en `sitio-web/index.html` o en la tabla `codigos` de Supabase.
  4. *(Opcional)* Si el sub-proyecto requiere su propia documentación, crear su carpeta `.agents/` interna y su carpeta externa en `documentacion/<nombre-proyecto>/`.
