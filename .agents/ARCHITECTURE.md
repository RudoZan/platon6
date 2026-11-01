# ARCHITECTURE.md — Platón 6 (Portal Principal)

> **Propósito:** Responde a **¿CÓMO se estructura, comunica y fluye el portal con sus componentes internos y sistemas externos?**

---

## 1. Modelo Conceptual: Portal Contenedor vs. Sub-Sitios Autónomos

Platón 6 opera bajo una arquitectura de **portal contenedor desacoplado**:

1. **El Portal (`sitio-web/`):** Provee la portada de acceso (`index.html`), el catálogo general (`listado.html`), activos compartidos (`imagenes/`) y el conector singleton a Supabase (`js/supabaseClient.js`).
2. **Los Sub-Sitios (Carpetas hijas):** Cada proyecto dentro de `sitio-web/` (como `educacionFinanciera/`, `englishCalen2026/`, `tallerRecursosEducativos/`, `ajedrez/`, `dactilografia/`, `trabajosUsach/`, `pruebas/`) es **independiente**:
   - Puede abrirse directamente desde su propio `index.html`.
   - Define su propia estética, lógica y documentación sin depender del diseño del portal principal.

---

## 2. Componentes Internos del Portal

| Componente / Ruta | Rol en la Arquitectura |
| :--- | :--- |
| `index.html` | Puerta de entrada principal. Valida códigos de acceso (locales y vía Supabase) y redirige al proyecto correspondiente o al catálogo. |
| `listado.html` | Catálogo visual de proyectos agrupados por categoría (Proyectos propios, Trabajos Usach, Pruebas y prototipos). |
| `js/supabaseClient.js` | Módulo Singleton (`getPlaton6Supabase()`) que expone una única instancia del cliente Supabase en `window.supabase` para el portal y cualquier sub-aplicación que lo requiera. |
| `imagenes/` | Repositorio de avatares e imágenes del portal principal. |

---

## 3. Integración con Sistemas Externos (Supabase)

El flujo de conexión hacia Supabase desde el portal o desde cualquier sub-sitio sigue este contrato:

1. **Carga del SDK en HTML:**
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="../js/supabaseClient.js"></script>
   ```
2. **Obtención de la instancia en JS:**
   ```javascript
   const supabase = getPlaton6Supabase();
   ```
3. **Consultas:** Comunicación directa cliente-a-Supabase mediante la clave pública (`anon_key`) bajo políticas RLS.
