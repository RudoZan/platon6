# Simulador Vivencial de Finanzas Personales & Estilo de Vida

Este proyecto es una aplicación web interactiva diseñada para utilizarse en talleres online de **Educación Financiera y Presupuesto Personal**. Su propósito es transformar la típica lección teórica de números y planillas de cálculo en un **simulacro de realidad inmersivo, emocional y participativo**.

---

## 🧭 Organización de la Planificación: Plan Amplio General vs. Taller Puntual

Para comprender la arquitectura del proyecto, la documentación se divide en dos niveles complementarios:

1. **Plan Amplio General (Documentos 01 al 15):**  
   Define el modelo teórico, sistémico y pedagógico completo de simulación a largo plazo (los 4 arquetipos psicológicos profundos, el pozo de 30 bolitas con 5 niveles en 3 bloques, las 5 anclas estructurales del entorno, el catálogo completo de 41 oportunidades y las fórmulas matemáticas).
2. **Plan Específico del Taller Puntual (Documentos 16 al 18 y Código Web):**  
   Define la **implementación exacta construida en el código de la aplicación web (`index.html`)** para dictar el taller sincrónico de 90 minutos. En el taller puntual:
   * **Se eliminó la selección de perfiles o arquetipos psicológicos predeterminados**: el participante construye su propia identidad desde cero.
   * El onboarding se realiza mediante **3 lengüetas superiores**: **`1 Intereses`** (20 bolitas en 11 categorías con escala de 1 a 3), **`2 Decisiones iniciales`** (Vivienda, Trabajo y Transporte con 4 opciones elegibles por punto) y **`3 Resumen`** (Ficha consolidada con Diagnóstico Financiero de Partida).
   * La interfaz se presenta en **Modo Claro Moderno (Light Mode)** con layout de **3 Zonas**: Carrusel superior de Diapositivas PPT al 100% de ancho con barra ejecutiva Navy, Zona Media interactiva con despliegue en **2 columnas**, y barra dock inferior (HUD) con los **7 Lugares oficiales** (`Opciones iconos.txt`).

---

## 📂 Índice de Documentación de Planificación

### Parte I: Plan Amplio General del Simulador (Marco Teórico y Sistémico)

1. **[01. Visión y Propósito del Taller](docs/01_vision_y_proposito.md)**
   * Filosofía formativa: Por qué los presupuestos tradicionales fracasan sin el factor emocional.
   * Dinámica formativa general, objetivos de aprendizaje y promesa de transformación.

2. **[02. Perfil de Valoración Personal y Estilo de Vida](docs/02_perfil_psicologico_y_estilo_de_vida.md)**
   * El mecanismo de **Distribución de Fichas ("Bolitas de Interés")**: Pozo finito de 30 bolitas para repartir (de 1 a 5) en 11 categorías agrupadas en 3 bloques temáticos (Hábitat, Experiencias y Cuerpo/Pasión).
   * Conexión entre la asignación de bolitas, los gastos mínimos de felicidad y los eventos de tentación y crisis.

3. **[03. Motor de Simulación y Matriz de Eventos](docs/03_motor_de_simulacion_y_eventos.md)**
   * El paso del tiempo: De 10 a 20 años simulados en rondas ágiles.
   * Sistema de medidores duales: **Patrimonio Financiero** vs. **Bienestar / Salud Emocional**.
   * Mecánicas de interés compuesto, trampa del estilo de vida (*lifestyle creep*) y deudas.

4. **[04. Experiencia de Usuario (UX) y Arquitectura Técnica](docs/04_ux_y_arquitectura_tecnica.md)**
   * Principios de diseño interactivo de alta gama y arquitectura de cliente sin servidor (*Client-Side Engine*).
   * Dinámica de facilitación para el presentador y debate grupal.

5. **[05. Alineación con la Presentación del Taller (UAH / Experian)](docs/05_alineacion_con_presentacion_uah.md)**
   * Mapeo conceptual diapositiva por diapositiva (Test de inversor de 5 preguntas, Triángulo de la Inversión, CAE, Tarjetas rotativas, Hipotecas y Seguros).
   * Parámetros locales (CLP $, Cuenta 2 AFP, Depósitos a Plazo, seguros de sismo/cesantía).
   * Conexión directa del dilema del computador ($600.000 CLP: ahorro vs crédito) con la simulación.

6. **[06. Mecánica de Simulación: Ciclo de Vida y Decisiones Rápidas](docs/06_mecanica_de_simulacion_y_decisiones_rapidas.md)**
   * El dilema del "Día de Pago" (decisión con dinero en mano antes de gastar).
   * El flujo del tiempo y descuento de gastos fijos; imprevistos súbitos con cuenta regresiva de 15 segundos.

7. **[07. Matriz Pedagógica: Psicología, Fondos y Catálogo de Eventos](docs/07_matriz_pedagogica_eventos_y_oportunidades.md)**
   * El motor psicológico profundo (Creencias, Valores, Necesidades emocionales, Impulsos).
   * Los 6 tipos de fondos de reserva con propósito (Emergencias, Imprevistos, Anuales, Oportunidades, Proyectos, Crecimiento).

8. **[08. Catálogo de Oportunidades Fijas por Lugares vs. 7 Pilares](docs/08_catalogo_de_oportunidades_y_lugares.md)**
   * El concepto de "Mundo Abierto" con **6 Lugares de Acción** (Banco, Comercio/Retail, Inversiones, Inmobiliaria, Vida Social y Trabajo).
   * Matriz completa de las 41 oportunidades fijas y su impacto en Salud, Bienestar y Paz Mental.

9. **[09. Catálogo de Eventos, Gastos, Variantes e Impacto en Bienestar](docs/09_catalogo_de_eventos_gastos_y_variantes.md)**
   * Taxonomía completa de gastos (Fijos Mensuales, Fijos Anuales / Marzo Negro, Variables Mensuales y Anuales).
   * Catálogo de Gastos Imprevistos (Crisis) y Eventos Flash; sistema de gamas (Tiers) y su impacto en bienestar.

10. **[10. Factores Estructurales del Personaje: Entorno y Costo de Vida](docs/10_factores_estructurales_y_entorno.md)**
    * Los 5 pilares estructurales del modelo general: Tipo de Vivienda, Tipo de Vehículo, Distancia Casa-Trabajo, Vecindario y Modalidad Laboral.
    * La trampa de los costos fijos combinados en el presupuesto.

11. **[11. Sistema de Atención, Carga Mental y Automatización](docs/11_sistema_de_atencion_olvidos_y_automatizacion.md)**
    * Regla de no-recordatorios, cortes y multas por mora; Pago Automático de Cuentas (PAC/PAT) y desgaste vital.

12. **[12. Mecánica de Negociación Laboral y Aumento de Sueldo](docs/12_evaluacion_desempeno_y_aumento_sueldo.md)**
    * Evaluación holística de la jefatura basada en 3 factores: Capacitaciones (Capital Humano), Puntualidad y Clima Laboral.

13. **[13. Cronograma de Simulación a 8 Años](docs/13_cronograma_simulacion_8_anos.md)**
    * Inercia temporal: trimestres activos alternados con inercia de hábitos y rotación estacional año por año.

14. **[14. Motor Matemático, Fórmulas Financieras y Algoritmos](docs/14_motor_matematico_y_formulas.md)**
    * Fórmulas exactas de interés compuesto, amortización francesa, crédito rotativo al 2.9% mensual y ecuaciones de bienestar.

15. **[15. Los 4 Arquetipos Psicológicos Equilibrados](docs/15_los_4_arquetipos_psicologicos_equilibrados.md)**
    * Los 4 arquetipos teóricos: El Festivo Urbano, El Viajero Sibarita, El De Estatus y El Anfitrión Tech.
    * Calibración matemática simétrica y distribución teórica de bolitas.

---

### Parte II: Plan Específico del Taller Puntual (Implementación Web en Vivo)

16. **[16. Modo Taller y Panel de Administración Central](docs/16_modo_taller_y_panel_facilitador.md)**
    * **Arquitectura Real de Onboarding:** Sin selección de perfiles predeterminados. El participante configura su identidad mediante 3 lengüetas:
      * **`1 Intereses`:** 20 bolitas en 11 categorías con 3 niveles (1 a 3 bolitas) en lista simple con alerta titilante.
      * **`2 Decisiones iniciales`:** 4 opciones por categoría en Vivienda, Trabajo y Transporte con validación obligatoria.
      * **`3 Resumen`:** Ficha de resumen consolidada con Diagnóstico Financiero de Partida personalizado y botón *"Comenzar Taller"*.
    * Dinámica sincronizada con la presentación PPT, regla *"Págate a ti primero"* ($1.6M CLP) y consola central del facilitador.

17. **[17. Guión Integrado del Taller (90 Minutos): Presentación & Simulador Web](docs/17_guion_taller_90_min_y_flujo_integrado.md)**
    * Matriz de los **34 Pasos Integrados** diapositiva por diapositiva:
      * Pasos 1 a 3: Onboarding directo con las 3 lengüetas (Intereses, Decisiones Iniciales y Resumen).
      * Pasos interactivos clave: Triángulo de inversión interactivo (Paso 9), Dilema del pádel (Paso 11), Vitrina DAP a 90 días (Paso 12), Choque de mercado (Paso 16), Test oficial UAH/Experian de 5 preguntas (Paso 18), Tarjetas y pago mínimo (Paso 21), Comparador CAE (Paso 25), Cisne Negro con temporizador de 15 segundos (Paso 26), Dilema Computador $600k (Paso 30) y Radiografía Final a 8 años (Paso 33).

18. **[18. Diagramación y Distribución de Pantalla (Layout de 3 Zonas)](docs/18_diagramacion_y_distribucion_de_pantalla.md)**
    * Arquitectura visual implementada en **Modo Claro Moderno (Light Mode)**:
      * **Zona Superior:** Diapositivas PPT al 100% de ancho con fondo claro, barra superior ejecutiva Navy con botones minimalistas `[ ◀ ]` y `[ ▶ ]`, y texto fluido sin viñetas.
      * **Zona Media:** Escenario dinámico de acción sincronizado con las diapositivas y las 3 lengüetas de onboarding. Al presionar un ícono inferior, despliega las opciones en una **grilla de 2 columnas (`hub-grid-2col`) en Modo Claro**.
      * **Zona Inferior:** HUD Dock Bar fijo con los **7 Lugares oficiales** (`Opciones iconos.txt`): Banco (8 secciones), Otras Inversiones (11 secciones), Corredora (4 secciones), Comercio (6 secciones), Actividades (6 secciones), Trabajo (3 secciones) y Mi Estado (6 secciones).

---

## ⏱️ Mapa de Tiempo en el Taller Online (90 Minutos)

| Bloque | Minutos | Temas de la Presentación y Dinámica con la App Web |
| :--- | :---: | :--- |
| **Bloque 1: Bienvenida, Identidad y 1er Mes** | 00 - 23 min | Bienvenida, temario, factor humano, seteo del personaje sin perfiles previos (**Intereses 20 bolitas** + **Decisiones Iniciales en 4 opciones** + **Ficha Resumen con diagnóstico de partida**), primer sueldo líquido ($1.6M) y regla *"Págate a ti primero"*. |
| **Bloque 2: Ahorro, Inversión y Diversificación** | 23 - 53 min | Triángulo de inversión interactivo (rentabilidad/liquidez/riesgo), fondos con propósito, evento de bienestar (pádel), vitrina de DAP garantizado CMF, instrumentos balanceados y alternativos, diversificación y choque de mercado. |
| **Bloque 3: Perfil de Riesgo y el Mundo del Crédito** | 53 - 79 min | Test oficial de riesgo UAH/Experian (5 preguntas), tarjetas de crédito y trampa del pago mínimo, línea de sobregiro, créditos hipotecario y consumo, comparador por CAE y gran imprevisto súbito (Cisne Negro con timer de 15s). |
| **Bloque 4: Matemáticas Financieras, Proyección y Cierre** | 79 - 90 min | Amortización francesa, interés compuesto a favor y en contra, dilema del computador ($600k: ahorro vs cuotas), revisión general de tableros, proyección acelerada a 8 años, radiografía final de vida y debate grupal. |
