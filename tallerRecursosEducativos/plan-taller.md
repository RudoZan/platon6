# Plan y Arquitectura del Taller de Recursos Digitales Interactivos

Este documento constituye el plan oficial de estructura, diseño didáctico y progresión pedagógica para el **Taller de Recursos Digitales Interactivos** de Platón 6.

---

## 🎯 Justificación Pedagógica y Estrategia Didáctica

### 1. Inicio Ágil y Práctico (Módulos 1, 2 y 3)
El objetivo prioritario de los primeros módulos es **no matar el entusiasmo** de los estudiantes y profesores que quieren aprender a crear recursos digitales interactivos con inteligencia artificial. 
* Si se introduce una alta densidad teórica y conceptual desde el primer día, se genera frustración y barreras de entrada innecesarias.
* Por lo tanto, en los primeros módulos los conceptos teóricos (tipos de recursos, normativa, fundamentos de IA) se tratarán **muy por encima, con mayor brevedad y directo al grano**, priorizando pasar rápidamente al uso práctico de las herramientas y la creación.

### 2. Creación Libre e Impulso del Logro (Módulo 3)
El Módulo 3 se enfoca exclusivamente en dar el salto a la acción:
* Tras instalar la IA en el Módulo 2, el estudiante creará libremente **dos recursos cualesquiera** a partir de una instrucción simple (pudiendo utilizar prompts sugeridos o formular los suyos).
* El objetivo fundamental es que consiga resultados inmediatos para **aprovechar el impulso psicológico de la sensación de logro**, validando el poder de la IA antes de adentrarse en la estructura del código.

### 3. Estructura Web y Portal de Recursos como Producto Tangible (Módulo 4)
El Módulo 4 tiene dos objetivos principales:
* **Explicar los archivos web:** Comprender el rol de HTML (estructura), CSS (estilos) y JavaScript (lógica) y cómo se relacionan entre sí.
* **Portal de Recursos:** En lugar de seguir creando archivos sueltos e inconexos, los estudiantes aprenderán a planificar una estructura organizada. Le pedirán a la IA que cree una portada (`index.html`) que actúe como un **Portal de Recursos** unificado, desde el cual se acceda a las páginas de recursos listadas por curso o tema. Este portal constituye el **producto tangible final** del taller, y cada actividad vivirá en su propio archivo independiente dentro de este.

### 4. Publicación Temprana en GitHub (Módulo 5)
Para afianzar el portal de recursos y darle visibilidad al trabajo desde el inicio, el módulo de **GitHub** se ubica inmediatamente después de estructurar el sitio web (Módulo 5). Así, los profesores aprenden a subir su código y publicarlo online a través de GitHub Pages, construyendo sobre una base real que actualizarán paso a paso en los siguientes módulos.

### 5. División de Recursos Simples y Animaciones (Módulos 6, 7 y 10)
* **División de Recursos Simples (Módulos 6 y 7):** Para un aprendizaje asimilable, se separa la materia en un módulo dedicado únicamente a *Recursos interactivos simples* (interacciones básicas de botones y DOM) y otro a *Cuestionarios y ejercitación* (enfocado en lógica de puntajes, preguntas de opción múltiple y diseño de retroalimentación automática).
* **Módulo de Animaciones (Módulo 10):** Se inserta un módulo de animaciones y dinamismo web inmediatamente después de Presentaciones Interactivas para enseñar a dotar a los recursos de mayor fluidez visual y micro-interacciones atractivas.

### 6. Bases de Datos, Realtime y Cierre (Módulos 11 al 14)
* **Bases de Datos y Realtime (Módulos 11 y 12):** Conectividad con Supabase para almacenamiento y sincronización en vivo.
* **Desarrollo a Fondo (Módulo 13):** Módulo denso y conceptual sobre ingeniería de software educativo, arquitectura didáctica y UX pedagógica, introducido cuando los estudiantes ya tienen la madurez práctica.
* **Hosting y Dominio Propio (Módulo 14):** Cierre profesional publicando el portal en servidores comerciales y registrando un dominio `.cl`.

---

## 📚 Estructura Oficial de los 14 Módulos

| Módulo | Título | Enfoque y Contenido Principal |
| :---: | :--- | :--- |
| **Módulo 01** | **Recursos digitales interactivos** | Visión general, tipos de recursos, utilidad didáctica inmediata y normativa celular en Chile. |
| **Módulo 02** | **IAs para programar (Elección e Instalación)** | Asistentes de IA (Antigravity, Cursor, Copilot). Elección e instalación paso a paso. |
| **Módulo 03** | **Creando tus primeros recursos con IA** | Creación libre de **dos recursos interactivos** usando prompts propios o sugeridos para afianzar la sensación de logro. |
| **Módulo 04** | **Estructura web y Portal de Recursos** | Explicación del rol de HTML, CSS y JS. Creación del archivo `index.html` asumiendo el rol de portada y portal estructurado de recursos. |
| **Módulo 05** | **Subir el sitio a GitHub** | Creación de repositorio y publicación gratuita en GitHub Pages para tener el portal online. |
| **Módulo 06** | **Recursos interactivos simples** | Manipulación del DOM y lógica de botones para interacciones de aprendizaje sencillas. |
| **Módulo 07** | **Cuestionarios y ejercitación** | Estructuras de quizes, opción múltiple, cálculo de puntajes y diseño de retroalimentación didáctica. |
| **Módulo 08** | **Recursos con imágenes y multimedia** | Integración de iconos, sonidos, optimización de imágenes/videos y derechos de uso. |
| **Módulo 09** | **Presentaciones interactivas** | Transición de diapositivas estáticas (PPT) a entornos dinámicos y navegables en la web. |
| **Módulo 10** | **Animaciones y dinamismo** | Creación de animaciones web fluidas y transiciones visuales interactivas con CSS/JS. |
| **Módulo 11** | **Conectar con base de datos (Supabase)** | Almacenamiento en la nube de puntajes, nombres y respuestas de los alumnos. |
| **Módulo 12** | **Comunicación en tiempo real (Supabase Realtime)** | Sincronización en vivo entre pantallas del docente y los estudiantes para dinámicas de aula. |
| **Módulo 13** | **Desarrollo de Software Educativo a Fondo** | Módulo conceptual sobre arquitectura pedagógica, UX educativa, ciclo de pruebas y accesibilidad. |
| **Módulo 14** | **Hosting y dominio propio** | Publicación final en hosting profesional y configuración de dominio propio `.cl` (NIC Chile). |

---

## 🛠️ Plan de Transición Técnica (Ejecutado)

1. **Reordenación de carpetas físicas:** Realizada en cascada para evitar colisiones, renombrando las carpetas de los Módulos 05 a 12 de forma ordenada e incrementando el total de 12 a 14 módulos.
2. **Creación de nuevos módulos:** Creadas las carpetas para el Módulo 07 (Cuestionarios) y el Módulo 10 (Animaciones).
3. **Actualización de navegación:** Actualizado el archivo `js/nav-data.js` para mapear los 14 módulos y sus rutas.
4. **Refactorización de contenidos:** Ajustadas las páginas internas y cabeceras para reflejar las nuevas numeraciones y objetivos didácticos del taller.
