# 16. Modo Taller y Panel de Administración Central (Facilitador)

> *"El simulador no es un juego solitario: es un laboratorio vivencial sincronizado con la presentación del facilitador."*

Este documento define la arquitectura y dinámica del **Modo Taller**, donde los ~20 participantes avanzan por etapas sincronizadas con la exposición del relator, descubriendo cómo sus decisiones estructurales cobran vida con el paso del tiempo.

> [!NOTE]
> **Enfoque del Taller Puntual vs. Plan Amplio General:**  
> A diferencia de la documentación conceptual amplia (donde se contemplan arquetipos psicológicos predeterminados como *El Festivo*, *El Sibarita*, etc., y un pozo de 30 bolitas con 5 niveles en bloques), en el **Taller Puntual** implementado en la aplicación web se **eliminó la selección de perfiles predefinidos**. El participante configura directamente su propia identidad financiera desde cero mediante un proceso guiado de 3 lengüetas: **Intereses Personales** (20 bolitas, 3 niveles), **Decisiones Iniciales** (Vivienda, Trabajo y Transporte con 4 opciones cada una) y la **Ficha Resumen del Personaje** con diagnóstico de partida.

---

## 1. El Flujo Secuencial del Participante (Paso a Paso)

La experiencia del usuario en el taller se estructura en las siguientes fases concatenadas:

```mermaid
graph TD
    A[Fase 1: Onboarding del Personaje<br>1. Intereses (20 bolitas)<br>2. Decisiones Iniciales (4 opciones x 3)<br>3. Ficha Resumen con Diagnóstico] --> B[Fase 2: El Primer Sueldo<br>Regla 'Págate a ti primero' $1.6M]
    B --> C[Fase 3: Acciones por Secciones & HUD 7 Lugares<br>Sincronizadas con la Presentación PPT]
    C --> D[Fase 4: El Paso del Tiempo & Crisis Súbita<br>Cisne Negro con Timer de 15s]
    D --> E[Fase 5: Dilema Real & Radiografía a 8 Años<br>Evolución de Patrimonio vs. Bienestar]
```

---

### Paso 1: Onboarding y Creación de Identidad (Sin Perfiles Predefinidos)

El participante no elige un arquetipo cerrado; diseña su propia identidad a través de **3 lengüetas integradas** en la parte superior:

#### 1. Lengüeta `1 Intereses` (Slide 1: Tus Intereses Personales)
* **Pozo Total:** **20 bolitas de interés** (en lugar de 30).
* **11 Categorías en Lista Simple:** Se presentan en un listado vertical directo y limpio (sin divisiones rígidas por bloques):
  1. 🏠 Vivienda & Espacio Propio
  2. 🚗 Movilidad & Transporte Cómodo
  3. 💻 Tecnología & Herramientas
  4. ✈️ Viajes & Vacaciones
  5. 🍽️ Gastronomía & Salidas
  6. 🎸 Conciertos & Festivales
  7. 📚 Aprendizaje & Pasatiempos
  8. 🏋️ Deporte & Salud Física
  9. 👗 Moda, Imagen & Estilo
  10. 🎮 Gaming & Ocio Digital
  11. 🤝 Familia & Amigos
* **Escala de 3 Niveles:** Cada categoría cuenta con **3 espacios (de 1 a 3 bolitas)** en lugar de 5.
* **Asignación Inicial y Dinámica:** Inicia con 1 bolita asignada por categoría (11 bolitas iniciales), dejando **9 bolitas libres** para repartir libremente según los gustos del usuario hasta alcanzar el máximo de 20.
* **Control Táctil Directo:** El usuario pincha directamente sobre las bolitas para aumentar o reducir el valor. Si intenta agregar una bolita cuando ya ha completado las 20, las bolitas activas ejecutan una alerta visual titilante (*blink-alert*).
* **Navegación:** Botón *"Siguiente"* para pasar a las decisiones iniciales.

#### 2. Lengüeta `2 Decisiones iniciales` (Slide 2: Vivienda, Trabajo y Transporte)
El usuario define sus 3 anclas estructurales en una cuadrícula responsiva (2x2 en móviles / 4 columnas en pantallas anchas), con **4 opciones por ámbito**:

1. 🏠 **Vivienda:**
   * **Casa o Depto** *(En condominio • Costo fijo alto)*
   * **Departamento centro** *(Conectividad urbana • Costo fijo moderado)*
   * **Casa Barrio tradicional** *(Tranquila y familiar • Costo fijo accesible)*
   * **Parcela de agrado** *(Espacio y naturaleza • Costo fijo alto / rural)*
2. 💼 **Trabajo:**
   * **Freelance sueldo medio** *(Ingreso variable • ~$1.4M)*
   * **Trabajo dependiente sueldo medio** *(Ingreso fijo regulado • ~$1.4M)*
   * **Trabajo sueldo mínimo** *(Ingreso base regulado • ~$500k)*
   * **Trabajo administrativo sueldo alto** *(Sueldo alto corporativo • ~$2.2M)*
3. 🚌 **Transporte:**
   * **SUV** *(Espaciosa y familiar • Costo operacional alto)*
   * **City Car** *(Ágil y muy económico • Costo muy económico)*
   * **Locomoción colectiva** *(Micro y Metro • Costo mínimo mensual)*
   * **Auto deportivo o de lujo** *(Alta gama y exclusivo • Costo mantención muy alto)*

* **Estado Inicial y Validación:** Al ingresar, **nada está seleccionado por defecto**. El botón *"Siguiente"* se mantiene deshabilitado hasta que el usuario haya seleccionado una opción en las 3 categorías (con alerta de sacudida *shake-alert* si intenta avanzar incompleto). Cuenta además con botón *"Anterior"* para corregir intereses.

#### 3. Lengüeta `3 Resumen` (Slide 3: Resumen de tu Personaje)
Ficha consolidada que integra y valida la identidad antes de arrancar la simulación:
* **Decisiones Iniciales Elegidas:** Tarjetas con ícono, nombre, etiqueta y costo/ingreso de Vivienda, Trabajo y Transporte.
* **Mayores Prioridades e Intereses:** Píldoras con las categorías con más bolitas asignadas.
* **Diagnóstico Financiero de Partida:** Evaluación pedagógica personalizada generada automáticamente por el motor según las opciones elegidas (ej. alerta sobre costos fijos combinados de SUV + vivienda amplia, necesidad de colchón para ingresos freelance, o capacidad de ahorro con trabajo dependiente y locomoción colectiva).
* **Botón de Acción:** *"Comenzar Taller"*, que conduce a las diapositivas del contenido temático.

---

### Paso 2: Primer Sueldo y Regla "Págate a ti Primero" (Slide 5)
* El participante recibe su **primer sueldo líquido de referencia ($1.600.000 CLP)**.
* Aplica la regla pedagógica organizando su dinero entre:
  * **Gastos Fijos:** 45% - 50% (compromisos de vivienda y transporte elegidos).
  * **Estilo de Vida:** 30% - 35% (gastos derivados de sus intereses personales).
  * **Ahorro Primero / Reservas:** 20% (separado antes de incurrir en gastos).

---

### Paso 3: Acciones por Secciones y HUD Dock Bar (7 Lugares)
Durante la sesión, los participantes interactúan con los ejercicios de las diapositivas superiores y pueden explorar en cualquier momento los **7 Lugares de la Ciudad Financiera** ubicados en la barra dock inferior (HUD):

1. 🏦 **Banco** (8 secciones: Cuenta Ahorro, Cuenta Vista, Cuenta Corriente, Líneas de Crédito, Tarjeta de Crédito, Fondos Mutuos, Depósitos a Plazo [DAP], Seguros).
2. 💎 **Otras Inversiones** (11 secciones: APV, Cuenta 2, Inversión Fraccionada, Compra Acciones, Bonos Corporativos, Bonos del Estado, Fondos Indexados [ETF], Moneda Extranjera, Criptomonedas, Billeteras Electrónicas, Participación en Startups).
3. 📈 **Corredora** (4 secciones: Ventas Ofrecidas, Arriendos Ofrecidos, Gestionar Venta, Gestionar Arriendo).
4. 🛍️ **Comercio** (6 secciones: Comida, Farmacia, Multitienda, Muebles y Electrónicos, Automotora, Compra de Oro, Plata y Joyas).
5. 🎟️ **Actividades** (6 secciones: Cine, Conciertos, Restaurant, Deporte y Gimnasio, Viajes y Turismo, Celebraciones).
6. 💼 **Trabajo** (3 secciones: Negociación Salarial y Ascensos, Capacitaciones y Certificaciones, Búsqueda de Trabajo).
7. 👤 **Mi Estado** (6 secciones: Bienestar, Salud, Intereses & Personalidad, Perfil de Inversionista, Liquidez, Patrimonio Neto Consolidado).

> **Despliegue en 2 Columnas:** Al pinchar cualquier pestaña del dock, la Zona Media se transforma en una vitrina de **2 columnas en Modo Claro** con tarjetas interactivas e íconos contextuales, pudiendo regresar con un toque a la vista de la diapositiva activa.

---

### Paso 4: Decisiones Críticas y Eventos Súbitos en Vivo
A lo largo de las diapositivas de la presentación, el participante enfrenta situaciones prácticas:
* **Triángulo de la Inversión (Slide 9):** Mueve el puntero interactivo y visualiza los presets de DAP, Fondos Mutuos y Acciones.
* **Evento de Bienestar (Slide 11):** Resuelve la invitación al torneo de pádel ($85.000 cash vs 3 cuotas con tarjeta vs no asistir).
* **Test de Perfil de Riesgo UAH / Experian (Slide 18):** Clasificación en Conservador, Moderado o Arriesgado con recomendaciones de portafolio.
* **Trampa del Pago Mínimo (Slide 21):** Simula pagar el total facturado ($450.000) vs el mínimo ($25.000 a 4 años pagando el doble).
* **Comparador de Créditos por CAE (Slide 25):** Evalúa 3 ofertas de crédito seleccionando la más conveniente por costo total.
* **El Cisne Negro (Slide 26):** Imprevisto súbito con **cuenta regresiva de 15 segundos**. Si no decide a tiempo, el sistema cobra automáticamente en tarjeta de crédito.
* **Dilema del Computador de $600.000 (Slide 30):** Votación en vivo entre Ahorro programado en 12 meses vs Crédito inmediato.

---

### Paso 5: Radiografía Final a 8 Años y Debate Grupal (Slide 33)
* Se proyecta la evolución del personaje a lo largo de **8 años de simulación**.
* La app muestra la **Radiografía Final**:
  * Patrimonio neto acumulado.
  * Intereses pagados a los bancos vs. intereses ganados por inversiones.
  * Nivel de Paz Mental y Calidad de Vida alcanzados.
  * Insignia pedagógica obtenida (*Arquitecto de Libertad Financiera*, *Atrapado en la Deuda*, *Sobreviviente Austero* o *Equilibrista Resiliente*).

---

## 2. El Panel de Control Central (Consola del Facilitador)

El facilitador dispone de una consola de coordinación sincronizada con la presentación:

```
+-----------------------------------------------------------------------------------------+
| CONSOLA DEL FACILITADOR - TALLER DE EDUCACIÓN FINANCIERA                                 |
+-----------------------------------------------------------------------------------------+
| [ESTADO DE LA SALA]: 20 Participantes Conectados                                        |
| FASE ACTUAL: Fase 1 (Onboarding: Intereses, Decisiones Iniciales y Resumen)             |
|                                                                                         |
| [CONTROLES DE AVANCE DE LA SESIÓN]:                                                     |
|  [▶ Siguiente Fase: Sincronizar Diapositiva PPT]                                        |
|  [⏳ DISPARAR EVENTO: Lanzar Cisne Negro con Timer de 15s]                               |
|  [⚡ ACTIVAR RADIOGRAFÍA FINAL: Proyección 8 Años]                                       |
|                                                                                         |
| [RADAR DEL GRUPO EN VIVO]:                                                              |
| • Fichas Completadas: 20/20 (100%)             • Con Trabajo Dependiente: 12 (60%)       |
| • Optaron por SUV/Lujo: 9 personas (45%)       • Optaron por Locomoción: 7 personas (35%)|
| • Aprobación Test de Riesgo: 50% Moderado, 30% Conservador, 20% Arriesgado              |
+-----------------------------------------------------------------------------------------+
```

### Funciones del Facilitador:
1. **Sincronización de Diapositivas:** Garantiza que los participantes avancen coordinadamente con el relato del facilitador.
2. **Disparo de Eventos y Crisis:** Activa en los teléfonos de los alumnos los dilemas de tiempo real (evento de bienestar, choque de mercado, cisne negro).
3. **Monitoreo de Decisiones del Grupo:** Permite contrastar en vivo los resultados (*"El 45% eligió SUV o auto de lujo; veamos ahora cómo sufren con los costos de mantención frente a quienes eligieron transporte público"*).

---

## 3. Dinámica Pedagógica del Taller

* **Sin fricción inicial:** Al no imponer un cuestionario de personalidad ni perfiles predeterminados, los alumnos configuran sus bolitas y sus 3 decisiones en menos de 3 minutos.
* **Sentido de pertenencia:** El participante siente que el personaje es 100% suyo, lo que multiplica el impacto emocional cuando ocurren las crisis y los triunfos financieros.
* **Debate espontáneo y comparativo:** La variedad de elecciones en vivienda, trabajo y transporte genera aprendizajes cruzados directos entre los asistentes.

---

## 4. Recomendaciones Operativas para el Facilitador (Taller sin Fricción)

### A. Cómo usar la aplicación en el taller sin fricción
1. **Entrada en 3 segundos:** Subir la web a Vercel o GitHub Pages y proyectar un Código QR en pantalla al inicio de la sesión. Los participantes entran de inmediato, sin login, sin registro ni correos.
2. **Celular como segunda pantalla:** Solicitar a los participantes que abran la aplicación desde el celular mientras observan la presentación en la pantalla de su computador (evita que la ventana de la app tape la videoconferencia en Zoom/Meet y agiliza la respuesta táctil).
3. **Bloquear distracciones:** Ocultar o bloquear temporalmente los íconos de la barra inferior que aún no correspondan al paso en curso según el avance de la charla, evitando que los participantes se desvíen curioseando antes de tiempo.

### B. Decisión Técnica de Operación
* **Modo autónomo (implementación actual):** Cada usuario avanza de diapositiva con las flechas `[ ◀ ]` `[ ▶ ]` en su dispositivo cuando el facilitador les avisa verbalmente.  
  * *Ventaja:* Cero riesgo técnico, máxima velocidad y tolerancia completa ante cortes puntuales de internet.
* **Modo sincronizado (con servidor ligero / WebSockets):** El facilitador avanza las pantallas de todos simultáneamente desde su consola de administración y recibe las votaciones y métricas en vivo.  
  * *Ventaja:* Experiencia dirigida al 100%, ideal cuando los asistentes son tímidos para intervenir por micrófono o en grupos numerosos.
