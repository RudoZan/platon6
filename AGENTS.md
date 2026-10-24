# AGENTS.md — Platón 6 (Repositorio Web Central)

## 🎯 Propósito del Proyecto
**Platón 6** es un portal y ecosistema web que centraliza aplicaciones interactivas de software educativo, herramientas didácticas y trabajos universitarios.

## 🛠️ Stack Tecnológico
* **Core:** Vanilla HTML5, CSS3 moderno y JavaScript ES6+.
* **Filosofía:** Cero frameworks pesados (sin React, Vue, Next o bundlers innecesarios). Todas las aplicaciones deben ejecutarse de inmediato en cualquier navegador web moderno sin proceso de compilación previo.
* **Diseño y Estética:** Paleta limpia y luminosa con gradiente azul/cian suave (`#cdf0f8` a `#c2ebf5`), azul marino primario (`#235e82`) y acento ámbar (`#ef9d4f`). Cada sub-app define su propia identidad visual adaptada a su objetivo pedagógico.

## 📁 Estructura del Repositorio
* `index.html`: Portada principal con acceso por código y panel rápido.
* `listado.html`: Catálogo interactivo de cursos y aplicaciones disponibles.
* `js/supabaseClient.js`: Cliente Supabase centralizado (singleton `getPlaton6Supabase()`).
* Subdirectorios por aplicación:
  * `educacionFinanciera/`: Simulador vivencial de finanzas personales.
  * `englishCalen/`: Plataforma de enseñanza de inglés con doble ventana sincronizada.
  * `dactilografia/`: Módulo de práctica y fluidez de tipeo.
  * `tallerRecursosEducativos/`: Módulos de formación docente en IA y recursos digitales.
  * `ajedrez/`, `maquinaDeGalton/`, `trabajosUsach/`: Herramientas didácticas y simuladores matemáticos.

## 🗄️ Infraestructura Supabase Compartida
* **Proyecto:** `RudoZan's Project` (`https://junonydusnrcumbjjzqt.supabase.co`).
* **Conexión:** Incluir `<script src="../js/supabaseClient.js"></script>` y llamar a `getPlaton6Supabase()`.
* **Control de accesos general:** Tabla `codigos` (`codigo`, `usuario`, `rol`, `app`, `datos_juego`).
* **Convención para nuevas tablas de sub-apps:** Usar el prefijo `platon6_[app]_[entidad]` con Row Level Security (RLS) habilitado.

## ⚠️ Reglas para Agentes de IA
1. No agregar dependencias de Node.js ni bundlers a menos que el usuario lo solicite explícitamente.
2. Toda la documentación pesada (PDFs, guiones de taller, marcos teóricos) debe guardarse en `../documentacion/`, manteniendo este repositorio web ligero para GitHub Pages.
3. Cada sub-aplicación cuenta con su propio `AGENTS.md` localizado con sus reglas específicas.
