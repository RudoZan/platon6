# Technical Specification — Platón 6 (`platon6/sitio-web/`)
> **Target App Language:** Spanish.

## 1. Tech Stack & Visual Identity
- **Stack:** Pure Vanilla HTML5, CSS3, ES6+ JS (zero-build, no bundlers/frameworks).
- **External CDN:** `@supabase/supabase-js@2` (`https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`).
- **Palette & Assets:** Soft cyan gradient (`#cdf0f8` to `#c2ebf5`), primary navy (`#235e82`), accent amber (`#ef9d4f`), shared graphics in `platon6/sitio-web/imagenes/`.

## 2. Shared Database (Supabase PostgreSQL)
- **Org / Project:** `RudoZan's Org` / `RudoZan's Project` (`https://junonydusnrcumbjjzqt.supabase.co`).
- **Client singleton:** `platon6/sitio-web/js/supabaseClient.js` (`PLATON6_SUPABASE_URL`, `PLATON6_SUPABASE_ANON_KEY`, `getPlaton6Supabase()`).
- **Sub-app table naming convention:** `platon6_[app]_[entity]` with **Row Level Security (RLS)** enabled.

### 2.1. Portal Access Table: `codigos` (`public`)
| Field | Type | Purpose |
| :--- | :--- | :--- |
| `id` | `int8` (PK) | Unique ID |
| `created_at` | `timestamptz` | Creation timestamp |
| `codigo` | `text` | User access code |
| `usuario` | `text` | User name/ID |
| `rol` | `text` | Role within app/portal |
| `app` | `text` | Target sub-application |
| `datos_juego` | `text` | Session/activity JSON state |
| `juegos` | `text` | Enabled games config |
| `icono` | `text` | Profile/access icon |

### 2.2. Academic Citador Tables (`public`)
- **`citador_projects`:** `id` (uuid, PK), `name`, `created_at`, `updated_at`, `user_id` (FK -> `auth.users.id`).
- **`citador_sections`:** `id` (uuid, PK), `project_id` (FK -> `citador_projects.id`), `title`, `content` (jsonb), `sort_order` (int4), `created_at`, `updated_at`.
- **`citador_citation_sources`:** `id` (uuid, PK), `project_id` (FK), `code`, `display_ref`, `description`, `doc_title`, `doc_authors`, `doc_year` (int4), `source_fragment`, `notes`, `created_at`.
- **`citador_access_requests`:** `id` (uuid, PK), `user_id` (FK), `email`, `status`, `message`, `admin_note`, `requested_at`, `reviewed_at`, `reviewed_by` (uuid).
