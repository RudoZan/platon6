# AGENTS.md — Taller de Finanzas Personales (Simulador Vivencial)

## 🎯 Propósito y Enfoque Pedagógico
Simulador web interactivo de finanzas personales, presupuesto y estilo de vida diseñado para talleres en vivo (90 minutos) y alineado con presentaciones teóricas (UAH / Experian).
* **Filosofía:** Enfoque vivencial, emocional y conductual. Reemplaza planillas contables estáticas por una experiencia inmersiva donde el usuario toma decisiones iniciales (intereses, vivienda, trabajo, transporte), enfrenta cisnes negros con cuenta regresiva de 15 segundos y evalúa su radiografía a 8 años.

## 🏗️ Arquitectura de la Interfaz (Mobile-First en Modo Claro)
La pantalla se estructura en tres zonas principales:
1. **Carrusel Superior PPT (100% ancho):** Muestra diapositivas de apoyo con barra ejecutiva Navy.
2. **Zona Media Interactiva:** Despliegue en 2 columnas para opciones de vida y lugares.
3. **Zona Inferior (HUD Dock Bar):** 7 lugares fijos de la ciudad financiera (Banco, Otras Inversiones, Corredora, Comercio, Actividades, Trabajo y Mi Estado).

## 📁 Archivos del Código
* `index.html`: Estructura semántica única de la aplicación.
* `css/style.css`: Sistema de diseño Mobile-First en modo claro con paleta profesional.
* `js/data.js`: Catálogo de eventos, cisnes negros, lugares y costos predeterminados.
* `js/engine.js`: Motor matemático, cálculo de presupuesto, flujo de caja y proyección a 8 años.
* `js/app.js`: Controlador de interfaz, eventos del usuario, temporizadores y navegación.

## 🗄️ Integración con Supabase
* **Cliente centralizado:** Reutiliza `../js/supabaseClient.js` mediante `getPlaton6Supabase()`.
* **Convención de tablas:** `platon6_finanzas_sesiones`, `platon6_finanzas_respuestas`.
* **Modos de taller:**
  * *Modo autónomo:* Avance por voz del facilitador (sin requerir persistencia en red).
  * *Modo sincronizado:* Control de diapositivas y recolección de resultados en vivo vía Supabase Realtime.

## 📚 Documentación de Referencia
La documentación completa (18 documentos de diseño pedagógico, guion de 90 min y PDF de referencia) se encuentra archivada fuera del sitio web en:
`platon6/documentacion/educacionFinanciera/`
