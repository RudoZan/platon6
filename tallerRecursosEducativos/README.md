# Taller de Recursos Digitales Interactivos

Taller práctico de 12 módulos para que profesores (inicialmente de Matemática,
Educación Media) aprendan a crear sus propios recursos digitales interactivos
con ayuda de IA, sin necesitar experiencia previa en programación.

Ver el detalle pedagógico, justificación y progresión didáctica de los 12 módulos en [`plan-taller.md`](./plan-taller.md).

Este repositorio contiene **solo el contenido del taller** (los 12 módulos).
Los recursos que cada profesor construya durante el taller viven en sus
propias cuentas/repositorios, fuera de este sitio.

## Estructura

- `plan-taller.md` — plan oficial y estrategia pedagógica de los 12 módulos.
- `index.html` — portada con los 12 módulos.
- `css/main.css` — estilos compartidos de todo el sitio.
- `js/nav-data.js` — estructura de módulos y páginas (fuente única de verdad de la navegación).
- `js/nav.js` — inyecta header, breadcrumb y navegación anterior/siguiente en cada página.
- `modulo-NN-*/` — una carpeta por módulo (01 al 12), con su `index.html` (portada del módulo) y sus subpáginas.

## Estado

- **Módulo 1** (Recursos digitales interactivos): contenido enfocado en brevedad y practicidad.
- **Módulo 2** (IAs para programar): elección e instalación de herramientas.
- **Módulo 3** (Creando tu primer recurso con IA): justificación de tecnologías web (portabilidad, simplicidad) y creación guiada práctica.
- **Módulos 4 a 12**: estructura y navegación listas, contenido pendiente (el Módulo 11 concentra la parte densa conceptual sobre desarrollo de software educativo, y el Módulo 12 abarca hosting y dominio).

## Convenciones de contenido

- **No usar guiones largos (—) en la narrativa de los párrafos.** Separar
  ideas con punto o coma, o usar paréntesis si es un inciso. El guion largo
  sí se permite en usos puntuales de título/etiqueta (por ejemplo
  `<title>Página — Nombre del sitio</title>` o rótulos cortos tipo
  "Módulo 02 — Título"), pero nunca dentro del texto narrativo de un `<p>`.
- No usar iconos tipo emoji en la interfaz (badges, botones, títulos). Si
  hace falta un ícono, usar SVG simple o, mejor aún, resolverlo solo con
  tipografía/color.

## Cómo verlo

Abrir `index.html` directamente en el navegador (doble clic) — no requiere
servidor. Para probar en condiciones más parecidas a GitHub Pages (sensible a
mayúsculas/minúsculas), se puede levantar un servidor local simple desde la
raíz del proyecto:

```
python3 -m http.server
```
