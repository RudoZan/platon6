# 13. Cronograma y Progresión Temporal de la Simulación (8 Años)

Este documento estructura el avance del tiempo a lo largo de los **8 años de simulación**, definiendo cómo se alternan los **Trimestres de Decisión Activa (3 meses)** con los **Períodos Automáticos de Inercia de Hábitos**, rotando a través de las diferentes estaciones e hitos del año.

---

## 1. La Arquitectura de Inercia Temporal

En la vida real, las personas no toman decisiones estructurales todos los meses. Establecen hábitos y compromisos durante un período consciente, y luego la vida sigue en piloto automático hasta que un hito, una estación del año o una crisis exige una nueva intervención.

* **El Trimestre Activo (3 Meses):**
  * El jugador toma decisiones detalladas: asignación de sueldo, visita a los 6 lugares de la ciudad, contratación de productos, ajustes en sliders y resolución de imprevistos.
* **El Período Automático de Inercia (9 Meses restantes del año):**
  * La vida corre a velocidad fluida repitiendo exactamente los hábitos, gastos y asignaciones definidas en el trimestre activo.
  * Los intereses de inversiones y deudas se componen mes a mes.
  * Si el jugador dejó un déficit mensual, la tarjeta de crédito absorbe el saldo negativo automáticamente.
  * Si ocurre un imprevisto mayor o una oportunidad flash, el reloj se detiene puntualmente para resolverlo.
* **La Parada de Estación (Cada Trimestre):**
  * Permite revisar balances, verificar el crecimiento de los fondos y hacer ajustes rápidos antes de continuar.

---

## 2. Mapa de los 8 Años y Rotación Estacional

Para que los participantes experimenten todas las presiones financieras del calendario chileno y latinoamericano, el **Trimestre Activo** rota de fecha en cada año:

```mermaid
journey
    title Los 8 Años de Vida Financiera
    section Año 1: Arranque
      Verano y Vacaciones (Q1 Activo): 5: Participante
      Primeros ahorros automáticos: 6: Inercia
    section Año 2: La Prueba de Marzo
      Marzo Negro - Patentes y Matrículas (Q1 Activo): 3: Crisis
      Pago de cuotas en inercia: 4: Inercia
    section Año 3: Fiestas Patrias
      18 de Septiembre y Aguinaldo (Q3 Activo): 6: Oportunidad
      Decisión de auto o mudanza: 5: Decisión
    section Año 4: Navidad y Cierre
      Diciembre y Consumo de Fin de Año (Q4 Activo): 4: Tentación
      Consolidación de deudas vs fondos: 5: Balance
    section Año 5: El Punto de Inflexión
      Oportunidad de Capacitación o Ascenso (Q2 Activo): 7: Oportunidad
      Cisne negro de salud o mercado: 3: Crisis
    section Año 6: Madurez y Bienes Raíces
      Decisión de Hipotecario o Local (Q1 Activo): 6: Decisión
      Flujo de arriendos o dividendos: 7: Inercia
    section Año 7: La Prueba de Resistencia
      Turbulencia económica o laboral (Q3 Activo): 4: Desafío
      Resiliencia de los 6 fondos: 6: Inercia
    section Año 8: La Cosecha Final
      Balance Integral a 8 Años (Q4 Activo): 8: Radiografía
      Diagnóstico de Libertad vs Trampa: 8: Conclusión
```

---

## 3. Guion Año por Año (Hitos, Dilemas y Aprendizajes)

### 🗓️ AÑO 1: "El Arranque y la Ilusión del Comienzo"
* **Foco Estacional:** **Q1 Activo (Enero a Marzo - Verano y Vacaciones).**
* **Contexto:** El personaje inicia su vida financiera independiente o su nuevo ciclo laboral.
* **Hito Activo:** La tentación del viaje de verano y las primeras compras para el hogar.
* **Dilema Clave:** ¿Pagar vacaciones al contado ahorrando previamente, o comprometer la primera tarjeta de crédito en 12 cuotas?
* **Inercia (Abril a Diciembre):** Se observa el impacto de haber quedado con o sin cuotas fijas mensuales.

---

### 🗓️ AÑO 2: "El Choque de Marzo Negro"
* **Foco Estacional:** **Q1 Activo (Marzo - Contribuciones, Patentes, Colegios).**
* **Contexto:** Se presentan simultáneamente los gastos fijos anuales obligatorios.
* **Hito Activo:** Permiso de circulación del auto, seguro obligatorio SOAP, revisión técnica y matrículas escolares.
* **Dilema Clave:** Quien configuró un **Fondo de Gastos Anuales** en el Año 1 lo pasa sin inmutarse; quien no, enfrenta una crisis de liquidez y debe decidir entre avance en efectivo o pedir fiado.
* **Inercia (Abril a Diciembre):** Recuperación financiera o arrastre de deuda por intereses de marzo.

---

### 🗓️ AÑO 3: "La Fiesta del 18 y la Trampa del Estatus"
* **Foco Estacional:** **Q3 Activo (Julio a Septiembre - Fiestas Patrias y Aguinaldo).**
* **Contexto:** El personaje lleva 3 años en su trabajo y recibe su primer aguinaldo importante.
* **Hito Activo:** Celebraciones del 18 de septiembre (asados, viajes familiares, fondas) y tentación de cambiar el vehículo por uno más nuevo.
* **Dilema Clave:** Aparece la concesionaria ofreciendo Crédito Inteligente (**T8**). ¿Cambiar el auto aumentando el costo mensual o mantener el auto económico y derivar el excedente a Fondos Mutuos?

---

### 🗓️ AÑO 4: "La Vorágine de Navidad y Fin de Año"
* **Foco Estacional:** **Q4 Activo (Octubre a Diciembre - Cierre de Año y Regalos).**
* **Contexto:** Máxima presión comercial y social del año.
* **Hito Activo:** Compras navideñas, cenas de fin de año, regalos para la familia y amigos. Ofertas de tarjetas comerciales en tiendas (**T3**).
* **Dilema Clave:** ¿Regalar dentro del presupuesto asignado o sobreendeudarse para complacer expectativas ajenas? Se pone a prueba el multiplicador social $W_{soc}$ del personaje.

---

### 🗓️ AÑO 5: "El Gran Salto: Capital Humano y Ascenso"
* **Foco Estacional:** **Q2 Activo (Abril a Junio - Desarrollo Profesional).**
* **Contexto:** Mitad del camino de los 8 años. El costo de la vida ha subido y se requiere aumentar ingresos.
* **Hito Activo:** Oportunidad de cursar una certificación/posgrado (**O1**) o solicitar un aumento de sueldo formal (**W2**).
* **Evaluación del Jefe:** Se evalúan las capacitaciones, la puntualidad (afectada por distancia casa-trabajo) y el estado de ánimo (Paz Mental).
* **Cisne Negro en Inercia:** A mitad de año ocurre un imprevisto médico o mecánico que pone a prueba el Fondo de Emergencias.

---

### 🗓️ AÑO 6: "Madurez Patrimonial e Inversiones Reales"
* **Foco Estacional:** **Q1 Activo (Enero a Marzo - Bienes Raíces e Inversiones).**
* **Contexto:** Quienes han sido disciplinados cuentan con liquidez acumulada en sus fondos de inversión y oportunidades.
* **Hito Activo:** Decisión de dar el pie para comprar vivienda propia con crédito hipotecario (**H2**) o invertir en un local comercial/estacionamiento para renta (**H5/H11**).
* **Dilema Clave:** Deuda Buena apalancada con seguros correctos (sismo y cesantía) vs. seguir arrendando para mantener liquidez ágil.

---

### 🗓️ AÑO 7: "La Prueba de Resistencia y Turbulencia de Mercado"
* **Foco Estacional:** **Q3 Activo (Julio a Septiembre - Recesión o Caída Bursátil).**
* **Contexto:** Ciclo económico adverso en el país. El mercado accionario cae un 25% y suben las tasas de interés.
* **Hito Activo:** Reestructuración en empresas y caída de ventas para independientes.
* **Dilema Clave:** Quien diversificó en Depósitos a Plazo (DAP) y Cuenta 2 duerme en paz; quien apostó 100% a activos de riesgo sufre pánico estomacal. Quien tiene fondo de 6 meses no teme al despido.

---

### 🗓️ AÑO 8: "La Cosecha Final: El Espejo de tus Decisiones"
* **Foco Estacional:** **Q4 Activo (Octubre a Diciembre - Cierre de los 8 Años).**
* **Contexto:** Culminación del simulacro de vida.
* **Hito Activo:** Se congelan las operaciones y el motor calcula la **Radiografía Final de Vida**:
  1. **Patrimonio Neto Total:** Ahorros + Inversiones + Valor de Propiedades - Saldo de Deudas.
  2. **Intereses Ganados vs. Intereses Regalados al Banco:** La cruda comparación matemática.
  3. **Paz Mental y Salud Promedio a lo largo de los 8 años:** ¿Vivió tranquilo o en angustia constante?
  4. **Calidad de Vida y Experiencias Acumuladas:** ¿Disfrutó con su familia y amigos o se privó de todo?
  5. **Veredicto del Arquetipo Final:**
     * 🟢 *El Arquitecto Libre:* Patrimonio sólido, sin deudas tóxicas, bienestar > 75%.
     * 🟡 *El Sobreviviente Estresado:* Ahorró mucho, pero con salud y relaciones deterioradas.
     * 🟠 *El Prisionero de las Apariencias:* Gran sueldo y auto nuevo, pero viviendo al día con deudas al cuello.
     * 🔴 *Atrapado en la Rueda:* Endeudado con tarjetas, pagando el mínimo tras 8 años de trabajo.
