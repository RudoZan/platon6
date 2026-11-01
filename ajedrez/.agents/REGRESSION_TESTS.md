# Pruebas de Regresión — Ajedrez

Lista de verificaciones esenciales que deben cumplirse tras modificar código en `sitio-web/ajedrez/`:

1. **Renderizado y estética base:**
   - [ ] Las páginas `index.html`, `variantes.html`, `variantes-rudo.html` y `curso.html` cargan correctamente el fondo `ajedrezFondo.png` y la paleta dorada sobre madera oscura sin errores en consola.
2. **Navegación entre páginas:**
   - [ ] La barra de navegación superior permite cambiar entre Ajedrez Clásico (`index.html`), Variantes (`variantes.html`), Variantes Rudo (`variantes-rudo.html`) y Curso (`curso.html`) sin enlaces rotos.
3. **Motor de juego clásico (`index.html`):**
   - [ ] Se permiten todos los movimientos legales por pieza y se bloquean movimientos ilegales (incluyendo dejar el propio rey en jaque).
   - [ ] Funcionan los movimientos especiales: enroque corto y largo, captura al paso y coronación de peón.
4. **Modo Entrenamiento y Reproductor (`index.html`):**
   - [ ] Las 4 pestañas (`Piezas`, `Aperturas`, `Tácticas`, `Mates`) cargan sus listados sin errores de sintaxis en los arrays de datos.
   - [ ] Los controles del reproductor paso a paso (`⏮ ‹ ▶ › ⏭`) ejecutan y revierten correctamente todas las secuencias de `movidas` en notación algebraica.
   - [ ] El botón **🔊 Escuchar explicación** reproduce en voz alta el texto de `descripcion` y se detiene limpiamente al cambiar de ejercicio.
