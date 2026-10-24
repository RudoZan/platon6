# 18. Diagramación y Distribución de Pantalla (Layout de 3 Zonas)

> *"La interfaz no es un software administrativo; es un escenario visual interactivo donde la teoría de la presentación y la acción del participante conviven en una misma pantalla sin fricción."*

Este documento define la arquitectura visual, proporciones, componentes y comportamiento responsivo de la interfaz del participante para el **Taller Puntual**, organizada en **3 Zonas Principales** sobre un diseño en **Modo Claro Moderno (Light Mode)**.

> [!NOTE]
> **Alineación con el Código del Taller (`index.html`):**  
> En el taller puntual, el onboarding no utiliza selección de perfiles predeterminados; se organiza en 3 lengüetas superiores (**`1 Intereses`**, **`2 Decisiones iniciales`** y **`3 Resumen`**). La Zona Inferior dispone de **7 Lugares de Oportunidades** (según `Opciones iconos.txt`), cuyo contenido se despliega en la Zona Media mediante una **cuadrícula de 2 columnas en Modo Claro**.

---

## 1. El Esquema General del Layout (Wireframe Conceptual)

La pantalla se implementa con un marco vertical optimizado para teléfonos y computadores (`mobile-frame`, max-width 480px, centrado en pantalla) que aprovecha la altura visible sin recargas completas:

```
+-----------------------------------------------------------------------------------------+
| [ZONA SUPERIOR: DIAPOSITIVAS PPT FONDO CLARO CON BARRA NAVY]              (~20% Altura)  |
|  [ ◀ ]          El Triángulo de la Inversión: Rentabilidad y Riesgo          [ ▶ ]      |
|  TRIÁNGULO DE LA INVERSIÓN • RENTA Y RIESGO                                              |
|  Ningún instrumento ofrece alto retorno, riesgo cero y liquidez inmediata a la vez.    |
|  👉 Mueve el puntero interactivo en el triángulo                                       ➔ |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
| [ZONA MEDIA: ÁREA INTERACTIVA DINÁMICA - ESCENARIO DE ACCIÓN]             (~68% Altura)  |
|                                                                                         |
|  A. DURANTE LA NAVEGACIÓN DE DIAPOSITIVAS (Muta según el paso activo):                  |
|   • Lengüeta 1 (Paso 1): Tus Intereses Personales (20 bolitas, 11 categorías, 1-3 niv)   |
|   • Lengüeta 2 (Paso 2): Decisiones Iniciales (Vivienda, Trabajo, Transporte: 4 opciones)|
|   • Lengüeta 3 (Paso 3): Ficha Resumen del Personaje + Diagnóstico Financiero de Partida |
|   • Paso 5:  Organizador de Sueldo Líquido ($1.6M: 50% Fijos, 30% Estilo, 20% Reservas)  |
|   • Paso 9:  Simulador gráfico interactivo del Triángulo (Presets DAP, FFMM, Acciones)   |
|   • Paso 11: Tarjeta de Dilema de Bienestar (Torneo de pádel: Efectivo vs Tarjeta)      |
|   • Paso 12: Vitrina de Depósitos a Plazo (DAP 30 a 360 días, tasa garantizada 4.8%)     |
|   • Paso 16: Simulación de Choque de Mercado (Caída -20% sector tech)                    |
|   • Paso 18: Formulario del Test Oficial de Riesgo UAH / Experian (5 preguntas)          |
|   • Paso 21: Decisión de Tarjetas: Pago Total facturado ($450k) vs Pago Mínimo ($25k)   |
|   • Paso 25: Comparador interactivo de 3 Créditos por Costo Anual Equivalente (CAE)     |
|   • Paso 26: El Cisne Negro / Crisis Súbita con temporizador decreciente de 15 segundos  |
|   • Paso 30: Dilema interactivo: Renovar Computador de $600.000 CLP (Ahorro vs Cuotas)   |
|   • Paso 33: Proyección visual acelerada de los 8 Años con Radiografía Final de Vida     |
|                                                                                         |
|  B. AL TOCAR CUALQUIER ÍCONO DEL DOCK INFERIOR:                                         |
|   • Se abre en Zona Media una vitrina en 2 COLUMNAS (hub-grid-2col) con las opciones     |
|     específicas e íconos contextuales del lugar seleccionado.                            |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
| [ZONA INFERIOR: HUD DOCK BAR CON 7 LUGARES DE ACCIÓN]                     (~12% Altura)  |
| +-------------------------------------------------------------------------------------+ |
| | [🏦 Banco] [💎 Inversiones] [📈 Corredora] [🛍️ Comercio] [🎟️ Act.] [💼 Trab.] [👤 Estado] | |
| +-------------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Detalle de las 3 Zonas

### A. Zona Superior: Diapositivas PPT Fondo Claro con Barra Ejecutiva Navy (~20% Altura)
Diseñada para proyectar las láminas teóricas del taller (extraídas del PDF oficial UAH/Experian) con un **estilo de fondo claro, ancho completo (100%)** y controles minimalistas de alto contraste:

* **Barra Superior Ejecutiva (`.slide-top-bar`):**
  * Fondo en degradé oscuro ejecutivo (*Dark Navy*: `#0f172a` a `#1e293b`) con borde inferior `#334155`.
  * **Costado Izquierdo:** Botón cuadrado minimalista `[ ◀ ]` (`.slide-nav-square`) para retroceder diapositiva.
  * **Centro:** Título dinámico del tema actual (`#slide-topic-label`), centrado, en fuente *Outfit* blanca y negrita.
  * **Costado Derecho:** Botón cuadrado minimalista `[ ▶ ]` (`.slide-nav-square`) para avanzar diapositiva.
* **Pista de Diapositivas (`.slide-track`):**
  * Contenedor de ancho completo (`100%`) con desplazamiento suave (*scroll-snap* y swipe táctil).
  * Tarjetas de diapositiva (`.slide-card`): fondo blanco puro (`#ffffff`), borde suave y sombra sutil.
* **Contenido Editorial Limpio (Sin viñetas ni bullets):**
  * **Tag temático en mayúsculas:** (ej. `TALLER FINANZAS • UAH / EXPERIAN`, `TRIÁNGULO DE LA INVERSIÓN`, `CRÉDITO ROTATIVO`).
  * **Título principal:** Destacado en tipografía moderna *Outfit*.
  * **Síntesis conceptual:** Texto fluido y directo redactado en prosa clara, sin puntos ni listas viñetadas.
  * **Indicador de acción:** Puntero inferior sutil (`👉 Acción requerida abajo ➔`).

---

### B. Zona Media: El Escenario de Acción Dinámica (~68% Altura)
Es el espacio interactivo principal del taller, con scroll vertical interno limpio (`overflow-y: auto`). Alberga dos modalidades de contenido:

#### 1. Vistas Sincronizadas con las Diapositivas

| Paso / Diapo | Nombre de la Vista | Elementos Visuales e Interactivos |
| :---: | :--- | :--- |
| **Paso 1** | **`1 Intereses`** (`view-step-4`) | • **Pozo de 20 Bolitas** repartidas en **11 categorías** en un listado simple vertical.<br>• Escala de 3 niveles (de 1 a 3 bolitas por categoría).<br>• Inicia con 11 bolitas (1 en cada una) y 9 libres.<br>• Toque directo para sumar/quitar bolitas con alerta titilante (*blink-alert*) al agotar el pozo.<br>• Botón *"Siguiente"*. |
| **Paso 2** | **`2 Decisiones iniciales`** (`view-anchors`) | • Cuadrícula (2x2 en móvil, 4 columnas en desktop) con **4 opciones por ámbito**:<br>  - *Vivienda:* Casa o Depto en condominio, Depto centro, Casa tradicional, Parcela de agrado.<br>  - *Trabajo:* Freelance (~$1.4M), Dependiente (~$1.4M), Sueldo mínimo (~$500k), Administrativo alto (~$2.2M).<br>  - *Transporte:* SUV, City Car, Locomoción colectiva, Auto deportivo o de lujo.<br>• Nada seleccionado al inicio; botón *"Siguiente"* deshabilitado hasta completar las 3 categorías. |
| **Paso 3** | **`3 Resumen`** (`view-character-summary`) | • Ficha consolidada del personaje con Decisiones Iniciales elegidas (ícono, etiqueta, costo/ingreso).<br>• Mayores Prioridades e Intereses (píldoras destacadas con cantidad de bolitas).<br>• **Diagnóstico Financiero de Partida:** Texto pedagógico que evalúa riesgos y ventajas de la combinación elegida.<br>• Botón *"Comenzar Taller"*. |
| **Paso 5** | **Presupuesto Inteligente** (`view-generic`) | • Organización del primer sueldo líquido ($1.600.000 CLP).<br>• Asignación porcentual: Gastos Fijos (45%-50%), Estilo de Vida (30%-35%) y Ahorro Primero (20%). |
| **Paso 9** | **Triángulo de Inversión** (`view-step-9`) | • Gráfico triangular SVG interactivo con puntero móvil.<br>• Selector de 3 presets: DAP (cero riesgo, ilíquido), FFMM (equilibrio y diversificación) y Acciones (alto retorno, alta volatilidad).<br>• Veredicto pedagógico dinámico. |
| **Paso 11** | **Evento de Bienestar** (`view-step-11`) | • Tarjeta de dilema: Torneo de Pádel ($85.000 CLP).<br>• Opciones: Pagar al contado (-$85k, +15% bienestar), Tarjeta de crédito en 3 cuotas ($32k/mes) o No asistir (-20% bienestar). |
| **Paso 12** | **Vitrina de DAP** (`view-generic`) | • Simulación de colocación a 30, 90 o 360 días con tasa garantizada de 4.8% anual por ley CMF. |
| **Paso 16** | **Choque de Mercado** (`view-generic`) | • Visualización de remezón bursátil (-20% sector tech): amortiguación en carteras diversificadas vs pérdidas en carteras concentradas. |
| **Paso 18** | **Test Oficial de Riesgo** (`view-step-18`) | • Las 5 preguntas oficiales del test UAH / Experian con clasificación en Conservador (5-8 pts), Moderado (9-11 pts) o Arriesgado (12-15 pts). |
| **Paso 21** | **Crédito Rotativo** (`view-generic`) | • Simulador comparativo de Tarjetas de Crédito: Deuda de $450.000 CLP cancelada al contado vs Pago Mínimo de $25.000 (tarda 4 años y paga $890.000 con intereses capitalizados). |
| **Paso 25** | **Comparador CAE** (`view-generic`) | • Comparación transparente de 3 ofertas de crédito evaluadas por el Costo Anual Equivalente y CTC. |
| **Paso 26** | **El Cisne Negro** (`view-step-26`) | • Emergencia súbita (urgencia médica, pana mecánica o filtración).<br>• **Temporizador de 15 segundos** con barra de cuenta regresiva decreciente.<br>• Opciones: Fondo propio de reserva, Tarjeta en cuotas o Mora forzada por expiración del tiempo. |
| **Paso 30** | **Dilema del Computador** (`view-generic`) | • Votación y decisión interactiva: Renovar computador de $600.000 CLP ahorrando $50k/mes por 12 meses vs comprar a crédito en 12 cuotas de $56.250 hoy mismo. |
| **Paso 33** | **Radiografía a 8 Años** (`view-generic`) | • Proyección acelerada de los 8 años de vida.<br>• Métricas consolidadas: Patrimonio acumulado, intereses pagados a bancos vs ganados, y Paz Mental promedio.<br>• Veredicto e insignia pedagógica del personaje. |

#### 2. Vista de Escenario de Lugar (`view-hub-stage`)
Al tocar cualquier pestaña del HUD inferior:
* Se oculta temporalmente la diapositiva activa.
* Se despliega el título y subtítulo del lugar seleccionado.
* Se renderizan las secciones del lugar en una **grilla de 2 columnas (`hub-grid-2col`) en Modo Claro**, con tarjetas limpias (`.hub-option-card`), íconos contextuales redondeados y texto descriptivo.
* Al pulsar nuevamente o navegar en las flechas superiores, la pantalla regresa con fluidez a la vista de la diapositiva activa.

---

### C. Zona Inferior: HUD Dock Bar con 7 Lugares de Acción (~12% Altura)
Diseñada como una barra dock móvil moderna, fija al pie de la pantalla, con fondo blanco (`#ffffff`), borde superior `#e2e8f0` y sombra sutil. Contiene los **7 Lugares oficiales** alineados con `Opciones iconos.txt`:

1. **🏦 Banco (`tab-banco`):**
   * *Secciones (8):* Cuenta Ahorro, Cuenta Vista, Cuenta Corriente, Líneas de Crédito, Tarjeta de Crédito, Fondos Mutuos, Depósitos a Plazo (DAP), Seguros.
2. **💎 Otras Inversiones (`tab-inversiones`):**
   * *Secciones (11):* Ahorro Previsional Voluntario (APV), Ahorro Cuenta 2, Inversión Fraccionada, Compra de Acciones, Bonos Corporativos, Bonos del Estado, Fondos Indexados (ETF), Compra/Venta Moneda Extranjera, Compra/Venta Criptomonedas, Billeteras Electrónicas, Participación en Startups.
3. **📈 Corredora (`tab-corredora`):**
   * *Secciones (4):* Ventas Ofrecidas, Arriendos Ofrecidos, Gestionar Venta, Gestionar Arriendo.
4. **🛍️ Comercio (`tab-comercio`):**
   * *Secciones (6):* Comida, Farmacia, Multitienda, Muebles y Electrónicos, Automotora, Compra de Oro, Plata y Joyas.
5. **🎟️ Actividades (`tab-actividades`):**
   * *Secciones (6):* Cine, Conciertos, Restaurant, Deporte y Gimnasio, Viajes y Turismo, Celebraciones.
6. **💼 Trabajo (`tab-trabajo`):**
   * *Secciones (3):* Negociación Salarial y Ascensos, Capacitaciones y Certificaciones, Búsqueda de Trabajo.
7. **👤 Mi Estado (`tab-estado`):**
   * *Secciones (6):* Bienestar, Salud, Intereses & Personalidad, Perfil de Inversionista, Liquidez, Patrimonio Neto Consolidado.

* **Diseño Minimalista:** La barra dock solo muestra íconos coloridos y nombres limpios de los lugares. No incluye cifras fijas que saturen visualmente el pie de pantalla.
* **Estado Activo:** El lugar activo se destaca con borde y texto en color azul celeste (`#0284c7`).

---

## 3. Adaptabilidad Responsiva

* **Dispositivos Móviles / Smartphones (Enfoque Mobile-First):**
  * La interfaz ocupa el 100% del ancho del dispositivo (`width: 100%`).
  * Las tarjetas de la Zona Media y las 4 opciones de Decisiones Iniciales se adaptan en 2 columnas táctiles de 48px de altura mínima, ideales para la pulsación con el pulgar.
* **Laptops / Computadores de Escritorio:**
  * El marco central se visualiza en un elegante contenedor vertical centrado (`max-width: 480px`) con sombras laterales sutiles, permitiendo al participante mantener la videollamada (Zoom / Meet) en un costado de la pantalla y el simulador en el otro sin conflictos de espacio.
