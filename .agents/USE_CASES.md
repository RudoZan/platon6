# Use Cases — Platón 6 (`platon6/sitio-web/`)

## UC-01: Access Code Login (`platon6/sitio-web/index.html`)
- **Flow:** User enters access code ➔ verified against local config or Supabase `codigos` table ➔ redirects to target sub-app or `listado.html` (shows inline error if invalid).

## UC-02: Project Catalog Browsing (`platon6/sitio-web/listado.html`)
- **Flow:** User opens `listado.html` ➔ browses cards by category (`"Proyectos propios"`, `"Trabajos Usach"`, `"Pruebas y prototipos"`) ➔ clicks card to open sub-project `index.html`.

## UC-03: Registering a New Sub-Project
1. Create `platon6/sitio-web/<project-name>/index.html`.
2. Add project card to `platon6/sitio-web/listado.html`.
3. *(Optional)* Register direct access code in `platon6/sitio-web/index.html` or Supabase `codigos`.
4. *(Optional)* Create `platon6/sitio-web/<project-name>/.agents/` and `platon6/docs/<project-name>/`.
