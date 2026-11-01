# TECHNICAL_SPEC.md — Platón 6 (Portal Principal)

> **Propósito:** Responde a **¿CON QUÉ está hecho el portal y qué datos guarda?**

---

## 1. Stack Tecnológico y Herramientas

- **Lenguajes Core:** HTML5, CSS3 moderno y JavaScript ES6+ (Vanilla JS).
- **Restricción de Construcción:** Sin procesos de compilación (*zero-build*), sin bundlers (Webpack/Vite) y sin frameworks SPA (React/Vue/Next). Todo archivo debe ejecutarse directamente en el navegador.
- **Librerías Externas (CDN):**
  - `@supabase/supabase-js@2` vía `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`.

---

## 2. Identidad Visual del Portal

- **Fondo principal:** Gradiente azul/cian suave (`#cdf0f8` a `#c2ebf5`).
- **Color primario:** Azul marino (`#235e82`).
- **Color de acento:** Ámbar (`#ef9d4f`).
- **Recursos gráficos globales:** Directorio `imagenes/` (variantes de expresiones del personaje Platón, portadas e ilustraciones base).

---

## 3. Base de Datos (Supabase Compartido)

- **Proveedor:** Supabase (PostgreSQL).
- **Organización:** `RudoZan's Org` (Plan Free: 1 proyecto activo).
- **Proyecto:** `RudoZan's Project` (`main` / Production).
- **URL del Proyecto:** `https://junonydusnrcumbjjzqt.supabase.co`
- **Configuración cliente:** Centralizada en `js/supabaseClient.js` mediante `PLATON6_SUPABASE_URL` y `PLATON6_SUPABASE_ANON_KEY`.

### 3.1. Tabla General del Portal: `codigos`
Controla los accesos por código desde la portada y almacena datos básicos asociados (`schema public`):

| Campo | Tipo | Propósito |
| :--- | :--- | :--- |
| `id` | `int8` (PK) | Identificador único del registro. |
| `created_at` | `timestamptz` | Fecha de creación. |
| `codigo` | `text` | Código de acceso ingresado por el usuario. |
| `usuario` | `text` | Identificador o nombre del usuario asociado. |
| `rol` | `text` | Rol de acceso dentro de la aplicación o portal. |
| `app` | `text` | Sub-aplicación o destino al que aplica el código. |
| `datos_juego` | `text` | Estado o datos JSON vinculados a la sesión/actividad. |
| `juegos` | `text` | Configuración de juegos habilitados. |
| `icono` | `text` | Icono asociado al perfil o acceso. |

### 3.2. Tablas del Módulo Citador Académico (`schema public`)
- **`citador_projects`:** `id` (uuid, PK), `name` (text), `created_at`, `updated_at`, `user_id` (FK -> `auth.users.id`).
- **`citador_sections`:** `id` (uuid, PK), `project_id` (FK -> `citador_projects.id`), `title` (text), `content` (jsonb), `sort_order` (int4), `created_at`, `updated_at`.
- **`citador_citation_sources`:** `id` (uuid, PK), `project_id` (FK -> `citador_projects.id`), `code` (text), `display_ref` (text), `description` (text), `doc_title` (text), `doc_authors` (text), `doc_year` (int4), `source_fragment` (text), `notes` (text), `created_at`.
- **`citador_access_requests`:** `id` (uuid, PK), `user_id` (FK -> `auth.users.id`), `email` (text), `status` (text), `message` (text), `admin_note` (text), `requested_at`, `reviewed_at`, `reviewed_by` (uuid).

### 3.3. Convención para Tablas de Sub-Aplicaciones
- Toda tabla nueva perteneciente a un sub-sitio debe nombrarse bajo el formato:
  `platon6_[app]_[entidad]`
- Debe contar con **Row Level Security (RLS)** habilitado.
