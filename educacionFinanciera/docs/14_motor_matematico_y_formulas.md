# 14. Motor Matemático, Fórmulas Financieras y Algoritmos de Simulación

Este documento consolida las fórmulas matemáticas exactas que rigen el cálculo de rendimientos, amortización de deudas, capitalización de intereses en tarjetas de crédito y las ecuaciones de los medidores de bienestar.

---

## 1. Fórmulas de Ahorro e Inversión (Interés Compuesto a Favor)

El patrimonio invertido en el mes $t$ ($S_t$) se calcula a partir del saldo del mes anterior ($S_{t-1}$), el aporte del período ($A_t$) y el rendimiento mensual del instrumento ($r_t$):

$$S_t = S_{t-1} \times (1 + r_t) + A_t$$

### Tasas de Rendimiento por Instrumento:

| Instrumento | Tasa Mensual Esperada ($r_t$) | Tasa Anualizada Equivalente | Volatilidad Mensual ($\sigma$) | Mecánica de Riesgo |
| :--- | :---: | :---: | :---: | :--- |
| **Depósito a Plazo (DAP)** | $+0.38\%$ | $4.65\%$ anual | $0.0\%$ (Garantizado) | Cero riesgo de pérdida; penalización por retiro anticipado. |
| **Cuenta 2 AFP / Fondos Balanceados** | $+0.65\%$ | $8.07\%$ anual | $\sigma = \pm 1.2\%$ | Retorno moderado; $r_t \sim \mathcal{N}(0.65\%, 1.2\%)$. |
| **Acciones / Fondos Indexados (ETF)** | $+0.95\%$ | $12.01\%$ anual | $\sigma = \pm 3.5\%$ | Alta volatilidad; caídas pronunciadas en recesión. |
| **Criptomonedas / Startups** | $+1.40\%$ | $18.16\%$ anual | $\sigma = \pm 8.0\%$ | Extrema especulación; riesgo de pérdida total del capital. |
| **Bienes Raíces (Arriendo)** | $+0.45\%$ + Plusvalía | $5.5\%$ arriendo + 3% plusvalía | $\sigma = \pm 0.5\%$ | Flujo mensual estable sujeto a factor de vacancia (5%). |

---

## 2. Fórmulas de Deuda y Crédito (Interés Compuesto en Contra)

### A. La Trampa de la Tarjeta de Crédito (Crédito Rotativo y Pago Mínimo)
Si el participante no paga el total facturado y opta por el **Pago Mínimo**, el sistema aplica la tasa rotativa sobre el saldo insoluto:

* **Tasa mensual rotativa ($i_{tc}$):** $2.9\%$ mensual (aprox. **$41.0\%$ CAE anual**).
* **Fórmula de Pago Mínimo ($PM$):**
  $$PM = \max\Big(\$15.000, \; \text{Amortización (5\% del saldo)} + \text{Intereses del mes} + \text{Comisión Mantención}\Big)$$
* **Evolución del Saldo Insoluto ($D_t$):**
  $$D_t = \Big(D_{t-1} - PM_{t-1}\Big) \times (1 + i_{tc}) + \text{Nuevas Compras}$$

> **Efecto Bola de Nieve:** Si una deuda de $1.000.000 CLP se paga con el mínimo, al cabo de 24 meses el usuario ha pagado más de $750.000 en cuotas y **aún debe $820.000 de capital**.

---

### B. Créditos de Consumo y Automotrices (Sistema Francés de Amortización)
Para créditos a cuotas fijas (ej. $12, 24, 36, 48$ meses) a una tasa mensual $i$ derivada del CAE:

$$\text{Cuota Mensual } (C) = P \times \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

Donde:
* $P$ = Monto del préstamo solicitado.
* $n$ = Plazo total en meses.
* $i$ = Tasa de interés mensual efectiva (ej. $1.6\%$ mensual $\approx 21.0\%$ CAE anual).

**Desglose de cada cuota en el mes $k$:**
* Interés del mes: $I_k = D_{k-1} \times i$
* Amortización a capital: $A_k = C - I_k$
* Nuevo saldo de deuda: $D_k = D_{k-1} - A_k$

---

### C. Crédito Hipotecario con Seguros Asociados
El dividendo total mensual ($Div$) suma la amortización financiera y los seguros obligatorios:

$$Div = C_{hip} + \text{Seguro Desgravamen} + \text{Seguro Incendio y Sismo} + \text{Seguro Cesantía (opcional)}$$

* Límite de aprobación bancaria: $Div \le 25\%$ del ingreso líquido mensual comprobado.

---

## 3. Algoritmo de Cálculo de los Medidores de Bienestar

Los medidores se normalizan en una escala de **0 a 100 puntos**:

### A. Medidor 🧠 Paz Mental & Salud Emocional ($PM_t$)
$$PM_t = \text{clamp}\Big(0, \; 100, \; PM_{t-1} + \Delta PM_{fondo} - \Delta PM_{deuda} - \Delta PM_{estres}\Big)$$

* **Aporte por Fondo de Emergencia:**
  $$\Delta PM_{fondo} = +20 \times \min\left(1.0, \; \frac{\text{Liquidez Disponible}}{3 \times \text{Gastos Fijos Mensuales}}\right) \times W_{seg}$$
* **Castigo por Deuda Tóxica de Tarjeta:**
  $$\Delta PM_{deuda} = -30 \times \min\left(1.0, \; \frac{\text{Deuda de Tarjeta}}{2 \times \text{Ingreso Mensual}}\right) \times W_{ans}$$
* **Castigo por Distancia / Traslado Agotador:**
  $$\Delta PM_{estres} = -10 \text{ (si vive en D3 con tacos y TAG)} \times W_{ans}$$

---

### B. Medidor 🌟 Calidad de Vida & Experiencias ($CV_t$)
$$CV_t = \text{clamp}\Big(0, \; 100, \; CV_{t-1} + \Delta CV_{ocio} + \Delta CV_{viajes} - \Delta CV_{privacion}\Big)$$

* **Aporte por Ocio y Vida Social:**
  $$\Delta CV_{ocio} = +15 \times \left(\frac{\text{Gasto Ocio Asignado}}{\text{Gasto Ocio Deseado}}\right) \times W_{hed}$$
* **Aporte por Viajes o Hitos:**
  $$\Delta CV_{viajes} = +25 \times W_{soc} \quad (\text{al concretar vacaciones nivel 2 o 3})$$
* **Castigo por Privación Severa:**
  $$\Delta CV_{privacion} = -25 \times W_{hed} \quad (\text{si el gasto de ocio se recorta a cero por más de 6 meses})$$

---

## 4. Algoritmo de Flujo de Caja Mensual

En cada mes de la simulación, el motor ejecuta la siguiente secuencia matemática:

```
1. Ingreso_Neto = Sueldo_Base + Rendimientos_Inmuebles - Impuestos_Boletas
2. Gastos_Fijos = Arriendo_Dividendo + Cuentas + Alimentacion_Base + Transporte + Estudios + Cuotas_Creditos
3. Gastos_Variables = Ocio_Estilo_Vida + Gastos_Hormiga
4. Flujo_Operativo = Ingreso_Neto - Gastos_Fijos - Gastos_Variables

5. SI Flujo_Operativo > 0:
      Asignar excedente a:
      - Ahorro / Fondo Emergencia (DAP)
      - Inversiones (Cuenta 2 / Acciones)
      - Prepagar saldo de Tarjeta de Crédito

6. SI Flujo_Operativo < 0 (Déficit):
      Cubrir déficit con:
      - 1° Saldo en Cuenta Corriente / Ahorro
      - 2° Si saldo = 0: Se carga automáticamente a la Tarjeta de Crédito (Rotativo al 2.9% mensual)
      - Se aplica penalización de Paz Mental por sobreendeudamiento.
```
