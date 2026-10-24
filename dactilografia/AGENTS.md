# AGENTS.md — Dactilografía (Entrenamiento y Fluidez de Tipeo)

## 🎯 Propósito
Módulo web interactivo enfocado en el desarrollo de velocidad, precisión y técnica de mecanografía táctil (dactilografía) para estudiantes y profesores.

## ⌨️ Componentes y Lógica Central
* **Pantalla de Selección de Niveles:** Progresión estructurada desde filas guía (teclas base `ASDF JKLÑ`) hasta textos complejos, código y puntuación.
* **Motor de Sugerencia Inteligente:** Registra las teclas con mayor tasa de error o latencia y genera lecciones y sugerencias personalizadas para reforzar debilidades mecánicas.
* **Teclado Visual Háptico/Colorimétrico:** Mapeo de teclas con código de colores según el dedo correspondiente para reforzar la memoria muscular sin mirar el teclado físico.
* **Comportamiento de Flujo:** Exención de pulsar la tecla `Enter` en la última línea de cada lección para mantener el ritmo y evitar fricción innecesaria al completar un ejercicio.

## 🛠️ Stack y Estilos
* Vanilla JavaScript puro (cálculo de Palabras Por Minuto — PPM, precisión neta/bruta y latencia por caracter).
* CSS con transiciones fluidas de teclas activas y feedback visual inmediato (verde = correcto, rojo = corrección necesaria).
