# ENVIRONMENTS.md — Platón 6 (Portal Principal)

> **Propósito:** Describe los ambientes disponibles y sus características de despliegue y ejecución.

---

## 1. Ambiente Local (Desarrollo)
- **Ruta local:** `/Users/rudozan/MisDocumentos/IA Proyectos/platon6/sitio-web/`
- **Ejecución:** Apertura directa de archivos `.html` en el navegador o mediante un servidor estático local (ej. Live Server / `python3 -m http.server`).
- **Requisitos:** No requiere compilación, variables de entorno locales ni instalación de paquetes (`npm`).

---

## 2. Ambiente de Producción (Hosting Web)
- **Plataforma:** GitHub Pages (publicado desde el repositorio Git ubicado en `sitio-web/`).
- **Consideraciones de Peso y Seguridad:**
  - Solo el contenido dentro de `sitio-web/` se versiona y publica en GitHub Pages.
  - Archivos pesados de trabajo (PDFs de referencia, documentos `.docx`, respaldos e históricos) viven fuera de `sitio-web/` (en `../documentacion/`) para mantener el repositorio ligero.

---

## 3. Backend como Servicio (BaaS)
- **Plataforma:** Supabase Cloud (`https://junonydusnrcumbjjzqt.supabase.co`).
- **Alcance:** Compartido entre el ambiente local de desarrollo y el ambiente de producción en GitHub Pages a través de `js/supabaseClient.js`.
