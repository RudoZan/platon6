# AGENTS.md — Taller de Finanzas Personales (Simulador Vivencial)

## 🎯 Propósito y Enfoque Pedagógico
Simulador web interactivo de finanzas personales, presupuesto y estilo de vida diseñado para talleres en vivo (90 minutos) y alineado con presentaciones teóricas (UAH / Experian).
* **Filosofía:** Enfoque vivencial, emocional y conductual. Reemplaza planillas contables estáticas por una experiencia inmersiva donde el usuario toma decisiones iniciales (intereses, vivienda, trabajo, transporte), enfrenta cisnes negros con cuenta regresiva de 15 segundos y evalúa su radiografía a 8 años.

## 🏗️ Arquitectura de la Interfaz y Decisiones de Diseño
La pantalla se estructura en tres zonas principales sobre un contenedor vertical (`mobile-frame`, max-width 480px) con **fondo de perspectiva espacial 3D**:
1. **Fondo General (Perspectiva 3D):**
   * Horizonte al 32% de altura con resplandor celeste (`radial-gradient`).
   * Líneas radiales cónicas en cian suave (`#7dd3fc`, opacidad 0.40) y líneas horizontales logarítmicas hacia la base (`rgba(148, 163, 184, ...)`), creando profundidad visual detrás de los módulos.
2. **Carrusel Superior PPT (100% ancho):**
   * Barra ejecutiva navy (`#0f172a` a `#1e3a8a`) con botones cuadrados minimalistas `[ ◀ ]` y `[ ▶ ]`, título dinámico a la izquierda y fecha neutra compacta (`01-Ene-Año01`) a la derecha.
   * Tarjetas de diapositivas (`.slide-card`) con degradado radial suave (`#cbd5e1` a `#ffffff`) y márgenes compactos (`6px 8px`).
   * **Diapositiva 1:** Cita de Amartya Sen (2000), ícono unificado de plantita 🌱, descripción de impacto en bienestar e ingreso de código de sesión estructurado (arquitectura estilo app *Impostor*: `YYYYMM` + 4 dígitos `1000-9999`).
3. **Zona Media Interactiva (Escenario de Acción):**
   * Despliegue en 2 columnas para opciones de vida y catálogo de lugares.
   * **Onboarding (3 lengüetas):** `1 Intereses` (20 bolitas, 11 categorías, escala 1-3), `2 Decisiones iniciales` (Vivienda, Trabajo, Transporte con 4 opciones) y `3 Resumen` (redacción en 2da persona con títulos en negrita y diagnóstico de partida).
   * **Sección Personal (Mi Estado):** Tarjeta de Bienestar minimalista (solo título *Bienestar*, carita dinámica en escala de 11 niveles de 2 en 2 corazones de 20 a 0 [`🤩`, `😁`, `😊`, `😐`, `🤨`, `😟`, `🥺`, `😰`, `😩`, `😱`, `😵`] y medidor de 20 corazones SVG sin porcentajes ni textos redundantes).
4. **Zona Inferior (HUD Dock Bar con 7 Lugares):**
   * Consola flotante fija al pie (`bottom: 0`, esquinas redondeadas 18px con borde superior cian `1.5px solid #38bdf8`).
   * **Opacidad Constante y Degradé de Color Puro:** Fondo con opacidad constante al 80% (`rgba(..., 0.80)` parejo) para evitar desniveles de transparencia. Degradé de color desde azul océano luminoso arriba (`rgba(2, 132, 199, 0.80)`) hasta azul noche profundo abajo (`rgba(3, 7, 18, 0.80)`).
   * **Tipografía:** Títulos en blanco nieve `#f1f5f9` (700). Pestaña activa en celeste cian brillante `#7dd3fc` con micro-barra inferior de 28px y halo de relieve en el ícono (`2px solid #7dd3fc`).
   * **Regla de Sincronización Estricta:** Un ícono del dock está marcado como activo (`active`) **únicamente** cuando en el centro se despliega la vitrina de dicho lugar (`view-hub-stage`). Si el usuario cambia de diapositiva o el centro pasa a mostrar el contenido de una lámina, el ícono se desmarca automáticamente (`state.activeHudTab = null`).

## 📁 Archivos del Código
* `index.html`: Aplicación interactiva autónoma completa (HTML, CSS y JS integrados sin dependencias externas).
* `css/style.css`: Estilos base auxiliares.
* `js/data.js`, `js/engine.js`, `js/app.js`: Módulos lógicos auxiliares.

## 🗄️ Integración con Supabase
* **Cliente centralizado:** Reutiliza `../js/supabaseClient.js` mediante `getPlaton6Supabase()`.
* **Convención de tablas:** `platon6_finanzas_sesiones`, `platon6_finanzas_respuestas`.
* **Modos de taller:**
  * *Modo autónomo:* Avance manual/voz por el facilitador con código de sesión local.
  * *Modo sincronizado:* Control de diapositivas y recolección de resultados en vivo vía Supabase Realtime.

## 📚 Documentación de Referencia
La documentación completa (19 documentos de diseño pedagógico, guion de 90 min y PDF de referencia) se encuentra archivada fuera del sitio web en:
`platon6/documentacion/educacionFinanciera/`
