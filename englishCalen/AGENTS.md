# AGENTS.md — Calen English (Enseñanza Audiovisual de Inglés)

## 🎯 Propósito
Plataforma educativa web diseñada para la enseñanza audiovisual e interactiva de vocabulario y estructuras en inglés, optimizada para clases presenciales con proyección o sala híbrida.

## 🪟 Arquitectura de Ventanas Sincronizadas
El sistema opera con dos ventanas coordinadas en tiempo real:
* **PC (Panel de Control — `index.html`):** Interfaz exclusiva del profesor. Permite activar actividades, videos, audios, preguntas y gestionar vocabulario sobre imágenes.
* **VP (Ventana de Presentación — `presentation.html`):** Interfaz proyectada para los estudiantes (segunda pantalla o proyector). Recibe los eventos y muestra el contenido visualmente limpio, sin controles de gestión.

## 🗂️ Nomenclatura Interna y Paneles
* **PC:** Panel de Control del docente (`index.html`).
* **VP:** Ventana de Presentación proyectada (`presentation.html`).
* **PS (Panel Superior):** Cuadrante superior izquierdo en la VP (cámara/webcam e interfaz lateral).
* **PI (Panel Inferior):** Cuadrante inferior principal en la VP (donde se renderizan los contenedores de actividades: `.content-box`, `#names`, `#middle`, `#bottom`).

## ⚠️ Reglas Críticas de Renderizado
* **Actividad de Fotos y Palabras (`photo-word`):**
  * Las palabras enviadas desde el PC se empaquetan con salto de línea (`\n`).
  * En la VP (`presentation.html`), las palabras **deben renderizarse apiladas verticalmente, una debajo de otra** mediante flexbox (`display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center;`), nunca concatenadas horizontalmente con barras o pipes.

## 🗄️ Backend y Estado
* Sincronización entre ventanas mediante `BroadcastChannel` local y `js/supabaseClient.js` para persistencia remota o control a distancia.
