# Plan de Especificación y Memoria: Evaluación Adaptativa de Álgebra

Este documento registra los objetivos pedagógicos, decisiones de diseño, especificaciones lógicas y la estructura del recurso interactivo de **Evaluación Adaptativa** dentro de **Platón 6**.

---

## 🎯 1. Objetivos Pedagógicos y Didáctica
El portal fue diseñado bajo principios modernos de la didáctica de la matemática, enfocándose en la evaluación formativa y autorregulada:

*   **Diferenciación entre Ejercicio y Problema:** 
    *   *Niveles 1 y 2 (Ejercicios):* Tareas algorítmicas directas enfocadas en la consolidación de técnicas operacionales (ej: resolver un sistema 2x2 sencillo o calcular una traza).
    *   *Niveles 3 y 4 (Problemas):* Desafíos contextualizados en ingeniería civil, computación gráfica, telecomunicaciones, bio-tecnología y física cuántica. Obligan al estudiante a leer la narrativa, extraer datos y modelar activamente el objeto matemático antes de poder resolver.
*   **Monitoreo Metacognitivo:** Después de ingresar cada respuesta, el estudiante califica qué tan seguro está de su resultado. Al final, se proyecta un cuadrante cartesiano (Precisión vs. Confianza) que clasifica el estado de aprendizaje en:
    *   **Calibrado / Seguro:** Respuestas correctas dadas con alta confianza.
    *   **Exceso de Confianza:** Errores cometidos creyendo que se estaba en lo correcto (revela vacíos conceptuales invisibles).
    *   **Inseguro / Azar:** Respuestas correctas dadas con baja confianza (sugiere intuición o adivinación).
    *   **Calibrado / Inseguro:** Errores cometidos sabiendo que no se dominaba el tema (refleja honestidad cognitiva).

---

## ⚙️ 2. Lógica del Motor Adaptativo
El test consta de **5 preguntas básicas** y una **pregunta de reto adicional (opcional)**. Su dificultad fluctúa dinámicamente según las siguientes reglas:

1.  **Inicio:** El test arranca siempre en una pregunta de **Nivel 2** (Comprensión).
2.  **Evaluación por Bloques:** El sistema evalúa el desempeño del alumno en bloques de dos preguntas (Q1-Q2 y Q3-Q4):
    *   **0/2 Correctas:** Disminuye el nivel de dificultad en 1 para el siguiente bloque (mínimo Nivel 1).
    *   **2/2 Correctas:** Incrementa el nivel en 1 para el siguiente bloque (máximo Nivel 4).
    *   **1/2 Correctas:** Mantiene el nivel de dificultad actual.
3.  **Flujo del Desafío Pregunta Reto (Opcional):** Al finalizar la explicación de la pregunta 5, al presionar "Siguiente Pregunta", se despliega un modal interactivo que le ofrece resolver una **Pregunta 6 (Reto Extra)** a través de **3 alternativas de dificultad** seleccionables por el usuario (sin que este vea los números de nivel):
    *   **Más difícil:** Sube 1 nivel de dificultad respecto al nivel de la Pregunta 5 (máximo Nivel 4).
    *   **De dificultad similar:** Mantiene el mismo nivel de la Pregunta 5.
    *   **Más fácil:** Baja 1 nivel de dificultad respecto al nivel de la Pregunta 5 (mínimo Nivel 1).
    Además, la pregunta se selecciona aleatoriamente de la base de datos excluyendo todas las preguntas ya presentadas a lo largo de la sesión para evitar repeticiones. La pantalla final de resultados solo se visualiza al terminar todo el flujo (ya sea rechazando el reto o resolviendo la Pregunta 6).

---

## 🛠️ 3. Funcionalidades Clave Implementadas

### A. Entradas de Respuesta Inteligentes y Dinámicas
*   **Múltiples Inputs:** Si una pregunta espera múltiples respuestas ordenadas (ej: coordenadas o variables de un sistema), el sistema genera dinámicamente cuadros de texto individuales para cada variable (`x = [ ]`, `y = [ ]`). Esto evita que el estudiante cometa errores sintácticos al escribir tuplas y mejora la fluidez.
*   **Entradas Dicotómicas (Sí/No):** Cuando una pregunta requiere una respuesta cerrada dicotómica (como *Sí/No*, *LD/LI*, *Verdadero/Falso*), el cuadro de texto libre se reemplaza automáticamente por botones de opción exclusivos. Esto simplifica la interfaz, elimina la ambigüedad sintáctica y agiliza la respuesta.
*   **Validador Heurístico Local (Offline y Gratis):** No requiere APIs externas de pago. El sistema normaliza caracteres especiales, elimina acentos y compara algebraicamente las secuencias numéricas (ej: reconoce que la combinación de inputs `x = 3`, `y = 2` equivale a la solución formal `"x=3, y=2"`). Además, incorpora un **motor algebraico complejo** propio que analiza de forma recursiva expresiones con el elemento imaginario $i$ y constantes como $\pi$ (ej: evalúa y simplifica la expresión `1-i+i-(i*i)` reconociendo que es equivalente a `2`), validando respuestas desarrolladas por el estudiante.

### B. Gestión del Esfuerzo (Pistas y Rendición)
*   **Ocultamiento de Nivel:** Al alumno no se le revela el nivel de dificultad de la pregunta activa para evitar ansiedad o condicionamientos conductuales.
*   **Pistas con Tiempo y sin Contador:** Se removió el texto que indicaba cuántas pistas quedaban disponibles para limpiar la interfaz. El botón **"Solicitar Pista"** inicia oculto y solo se muestra después de **15 segundos** de haber cargado la pregunta (obligando al alumno a pensar al menos unos instantes). Al solicitar la primera pista, el botón se vuelve a ocultar y requiere esperar otros 15 segundos antes de ofrecer la segunda pista.
*   **Rendición Condicionada:** El botón **"Rendirse"** se mantiene oculto al inicio y solo aparece después de que el alumno ha solicitado la **Pista 2**. Esto fomenta que el estudiante intente razonar y leer las ayudas conceptuales antes de rendirse.
*   **Autoevaluación de Confianza como PopUp:** En lugar de interrumpir el flujo del alumno con una transición de pantalla completa que borra el contexto visual, la autoevaluación de confianza se despliega como un cuadro popUp superpuesto sobre la pregunta actual (manteniendo el enunciado de la pregunta visible en segundo plano). Al seleccionar el nivel de seguridad, el popUp se oculta de forma fluida y se revela la retroalimentación.
*   **Rendirse sin Encuesta:** Si un estudiante decide rendirse, el sistema salta automáticamente la encuesta de autoevaluación de confianza (la registra internamente con confianza `0` y precisión `incorrecto`) y lo lleva directo a la **Resolución paso a paso**.

### C. Sistema de Códigos de Preguntas
*   Cada pregunta posee un identificador único normalizado (ej: `SE-L3-A` para **S**istemas de **E**cuaciones - **L**evel **3** - Pregunta **A**).
*   Estos códigos se visualizan en el badge del test del alumno, en el desglose del reporte final de metacognición y en la tabla del panel docente para facilitar la comunicación alumno-profesor.

---

## 📈 4. Estado de Implementación
*   **Sistemas de Ecuaciones Lineales:** 100% implementado con enunciados contextualizados para niveles 3 y 4.
*   **Matrices y Determinantes:** 100% implementado con historias de cizalladura de cristales, espín cuántico y Vandermonde para niveles 3 y 4.
*   **Temas Adicionales:** Auto-poblados con maquetas funcionales que pasan el control de calidad analítico.
*   **Panel Administrativo:** Incluye validador de bancos automático en tiempo real para asegurar que cada tema posea exactamente 20 preguntas (5 por nivel, con descripciones, respuestas y pistas válidas).
