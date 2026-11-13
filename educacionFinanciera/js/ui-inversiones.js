// Otras Inversiones Hub (11 Sections: APV, Cuenta 2, Fraccionada, Acciones, Bonos, ETF, Moneda Ext, Cripto, Billeteras, Startups) — educacionFinanciera

    const otrasInversionesCatalog = {
      apv: {
        id: 'apv',
        title: '🧓 Ahorro Previsional Voluntario (APV)',
        shortTitle: 'APV',
        icon: '🧓',
        actionLabel: 'Aportar APV',
        requiresRiskProfile: false,
        ruleNote: 'En Chile puedes ahorrar para tu pensión bajo <strong>Régimen A</strong> (el Estado te regala un <strong>15% anual</strong> sobre lo ahorrado, con tope de 6 UTM) o <strong>Régimen B</strong> (rebaja tu impuesto a la renta). Si retiras el dinero antes de pensionarte, pierdes el beneficio fiscal (devuelves la bonificación estatal en Régimen A o pagas 15% de retención SII en Régimen B).',
        items: [
          {
            id: 'apv_regA_fondoC',
            name: 'APV Régimen A · Multifondo C (Balanceado)',
            shortName: 'APV Régimen A (Fondo C)',
            icon: '🧓',
            expectedMonthlyRate: 0.0058,
            monthlyVolatility: 0.0110,
            stateBonusMonthly: 0.0125, // ~15% anual de bonificación fiscal sobre aporte/saldo elegible
            rateDisplay: 'UF + ~4,2% anual (~0,58%/mes) + 15% Bonificación Fiscal anual',
            volatilityDisplay: '±1,10%/mes (Media)',
            costDisplay: 'Comisión 0,55% anual',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            apvRegime: 'A',
            rescueDays: 5,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Recomendado para ingresos medios: suma rentabilidad del Fondo C más un 15% anual de bonificación del Estado. Si retiras antes de jubilar, se descuenta la bonificación estatal acumulada.'
          },
          {
            id: 'apv_regA_fondoA',
            name: 'APV Régimen A · Multifondo A (Más Riesgoso)',
            shortName: 'APV Régimen A (Fondo A)',
            icon: '🧓',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0280,
            stateBonusMonthly: 0.0125,
            rateDisplay: 'UF + ~6,5% anual (~0,85%/mes) + 15% Bonificación Fiscal anual',
            volatilityDisplay: '±2,80%/mes (Alta)',
            costDisplay: 'Comisión 0,55% anual',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            apvRegime: 'A',
            rescueDays: 5,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Invierte hasta 80% en renta variable internacional con bonificación estatal del 15% anual. Si giras antes de pensionarte, el Estado retiene la bonificación.'
          },
          {
            id: 'apv_regB_fondoC',
            name: 'APV Régimen B · Rebaja Tributaria (Fondo C)',
            shortName: 'APV Régimen B (Fondo C)',
            icon: '🏛️',
            expectedMonthlyRate: 0.0068,
            monthlyVolatility: 0.0110,
            stateBonusMonthly: 0,
            rateDisplay: 'UF + ~4,2% anual + Ahorro de Impuesto Global Complementario',
            volatilityDisplay: '±1,10%/mes (Media)',
            costDisplay: 'Comisión 0,55% anual · Retención 15% si retiras antes',
            entryFeePct: 0,
            exitPenaltyPct: 0.15, // 15% retención SII por retiro anticipado en Régimen B
            apvRegime: 'B',
            rescueDays: 5,
            minAmount: 20000,
            lockMonths: 0,
            desc: 'Conveniente para tramos altos de impuesto a la renta. Si retiras los fondos antes de jubilar, el SII aplica una retención inmediata del 15% sobre el monto girado.'
          }
        ]
      },
      cuenta2: {
        id: 'cuenta2',
        title: '📈 Ahorro Cuenta 2 (AFP)',
        shortTitle: 'Cuenta 2 AFP',
        icon: '📈',
        actionLabel: 'Invertir',
        requiresRiskProfile: false,
        ruleNote: 'La <strong>Cuenta de Ahorro Voluntario (Cuenta 2)</strong> permite invertir en los mismos Multifondos de las AFP (`A` al `E`) con comisiones más bajas que la mayoría de los fondos mutuos y libre disponibilidad (hasta 24 giros al año, abonados en 4 días hábiles).',
        items: [
          {
            id: 'c2_fondoE',
            name: 'Cuenta 2 · Multifondo E (Más Conservador)',
            shortName: 'Cuenta 2 (Fondo E)',
            icon: '🛡️',
            expectedMonthlyRate: 0.0045,
            monthlyVolatility: 0.0045,
            rateDisplay: '~0,45% mensual esp. (~5,5% anual)',
            volatilityDisplay: '±0,45%/mes (Baja)',
            costDisplay: 'Comisión AFP ~0,60% anual',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            rescueDays: 4,
            minAmount: 5000,
            lockMonths: 0,
            desc: '95% en renta fija e instrumentos de deuda nacional. Baja fluctuación y rescate libre en 4 días hábiles sin castigo.'
          },
          {
            id: 'c2_fondoC',
            name: 'Cuenta 2 · Multifondo C (Intermedio)',
            shortName: 'Cuenta 2 (Fondo C)',
            icon: '⚖️',
            expectedMonthlyRate: 0.0065,
            monthlyVolatility: 0.0120,
            rateDisplay: '~0,65% mensual esp. (~8,1% anual)',
            volatilityDisplay: '±1,20%/mes (Media)',
            costDisplay: 'Comisión AFP ~0,60% anual',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            rescueDays: 4,
            minAmount: 5000,
            lockMonths: 0,
            desc: 'Equilibrio entre renta fija en UF y acciones globales. Ideal para objetivos de mediano plazo (1 a 5 años) con bajas comisiones.'
          },
          {
            id: 'c2_fondoA',
            name: 'Cuenta 2 · Multifondo A (Más Riesgoso)',
            shortName: 'Cuenta 2 (Fondo A)',
            icon: '🚀',
            expectedMonthlyRate: 0.0090,
            monthlyVolatility: 0.0290,
            rateDisplay: '~0,90% mensual esp. (~11,3% anual)',
            volatilityDisplay: '±2,90%/mes (Alta)',
            costDisplay: 'Comisión AFP ~0,60% anual',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            rescueDays: 4,
            minAmount: 5000,
            lockMonths: 0,
            desc: 'Mayor exposición a bolsas internacionales para crecimiento de largo plazo. Su valor cuota varía diariamente según los mercados.'
          }
        ]
      },
      fraccionada: {
        id: 'fraccionada',
        title: '🏢 Inversión Inmobiliaria Fraccionada',
        shortTitle: 'Inversión Fraccionada',
        icon: '🏢',
        actionLabel: 'Participar',
        requiresRiskProfile: false,
        ruleNote: 'Participa desde un monto mínimo en propiedades destinadas a vivienda o arriendo comercial. La renta y la plusvalía son estimaciones y pueden variar.',
        items: [
          {
            id: 'frac_residencial',
            name: 'Departamento céntrico',
            shortName: 'Departamento céntrico',
            icon: '🏢',
            propertyValue: 185000000,
            minAmount: 100000,
            durationYears: 5,
            appreciationPct: 3.5,
            monthlyRent: 650000,
            expectedMonthlyRate: 0.006,
            monthlyVolatility: 0.004,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Departamento de tres dormitorios cercano a Metro, universidades y servicios; orientado a arriendo residencial de largo plazo.'
          },
          {
            id: 'frac_duplex',
            name: 'Departamento dúplex',
            shortName: 'Departamento dúplex',
            icon: '🏙️',
            propertyValue: 310000000,
            minAmount: 200000,
            durationYears: 7,
            appreciationPct: 3.5,
            monthlyRent: 1050000,
            expectedMonthlyRate: 0.0063,
            monthlyVolatility: 0.0045,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Unidad de dos niveles con cuatro dormitorios, tres baños, buena conectividad y demanda de arriendo profesional.'
          },
          {
            id: 'frac_parcela',
            name: 'Parcela de agrado',
            shortName: 'Parcela de agrado',
            icon: '🌳',
            propertyValue: 220000000,
            minAmount: 150000,
            durationYears: 8,
            appreciationPct: 4,
            monthlyRent: 700000,
            expectedMonthlyRate: 0.0065,
            monthlyVolatility: 0.006,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Parcela con vivienda 4 dormitorios y 3 baños, con áreas verdes, orientada a arriendo de descanso de fin de semana. La ocupación puede variar por temporada.'
          },
          {
            id: 'frac_galpon',
            name: 'Galpón grande',
            shortName: 'Galpón grande',
            icon: '🏭',
            propertyValue: 720000000,
            minAmount: 500000,
            durationYears: 8,
            appreciationPct: 4,
            monthlyRent: 4200000,
            expectedMonthlyRate: 0.0083,
            monthlyVolatility: 0.006,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Activo logístico de gran superficie, con acceso a autopistas y potencial de arriendo a empresas de almacenamiento y distribución.'
          },
          {
            id: 'frac_condominio',
            name: 'Casa en condominio',
            shortName: 'Casa en condominio',
            icon: '🏘️',
            propertyValue: 330000000,
            minAmount: 200000,
            durationYears: 7,
            appreciationPct: 3.5,
            monthlyRent: 950000,
            expectedMonthlyRate: 0.0058,
            monthlyVolatility: 0.0045,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Casa familiar de tres dormitorios, dos baños, en condominio con áreas comunes, cercana a colegios y servicios.'
          },
          {
            id: 'frac_lago_sur',
            name: 'Casa en lago del sur',
            shortName: 'Casa en lago del sur',
            icon: '🏡',
            propertyValue: 460000000,
            minAmount: 300000,
            durationYears: 8,
            appreciationPct: 4,
            monthlyRent: 1350000,
            expectedMonthlyRate: 0.0068,
            monthlyVolatility: 0.008,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región de Los Lagos. Vivienda turística tres dormitorios, próxima al lago. El arriendo mensual indicado es un promedio anual estimado; la demanda es estacional.'
          },
          {
            id: 'frac_estacionamiento',
            name: 'Estacionamiento céntrico',
            shortName: 'Estacionamiento céntrico',
            icon: '🅿️',
            propertyValue: 28000000,
            minAmount: 50000,
            durationYears: 5,
            appreciationPct: 3,
            monthlyRent: 120000,
            expectedMonthlyRate: 0.0068,
            monthlyVolatility: 0.003,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Estacionamiento individual en edificio con control de acceso, en sector de alta demanda laboral y residencial.'
          },
          {
            id: 'frac_local',
            name: 'Local comercial',
            shortName: 'Local comercial',
            icon: '🏪',
            propertyValue: 280000000,
            minAmount: 250000,
            durationYears: 7,
            appreciationPct: 3.5,
            monthlyRent: 1400000,
            expectedMonthlyRate: 0.0079,
            monthlyVolatility: 0.006,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Local a nivel de calle, próximo a transporte público y comercio establecido. La continuidad del arriendo depende del mercado.'
          },
          {
            id: 'frac_casa_norte',
            name: 'Casa en el norte',
            shortName: 'Casa en el norte',
            icon: '🏠',
            propertyValue: 125000000,
            minAmount: 75000,
            durationYears: 6,
            appreciationPct: 3,
            monthlyRent: 550000,
            expectedMonthlyRate: 0.0058,
            monthlyVolatility: 0.005,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región de Antofagasta. Casa compacta de dos dormitorios en zona residencial, con demanda de arriendo vinculada a servicios y actividad minera.'
          },
          {
            id: 'frac_depto_ambiente',
            name: 'Departamento de un ambiente',
            shortName: 'Departamento de un ambiente',
            icon: '🏢',
            propertyValue: 95000000,
            minAmount: 50000,
            durationYears: 5,
            appreciationPct: 3,
            monthlyRent: 350000,
            expectedMonthlyRate: 0.0055,
            monthlyVolatility: 0.004,
            costDisplay: 'Salida anticipada: 2% de comisión de corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            rescueDays: 7,
            lockMonths: 0,
            desc: 'Región Metropolitana. Departamento tipo estudio, compacto y de mantención simple, adecuado para arriendo a una persona o estudiante.'
          }
        ]
      },
      acciones: {
        id: 'acciones',
        title: '📉 Compra de Acciones (Bolsa)',
        shortTitle: 'Acciones',
        icon: '📉',
        actionLabel: 'Comprar Acciones',
        requiresRiskProfile: false,
        ruleNote: 'Acciones y precios anonimizados de referencia, no cotizaciones vigentes. En corredora tradicional, la orden considera comisión base de $4.000 o 0,35% del capital (el mayor), más derechos de bolsa e IVA; en estos lotes el costo aproximado es $5.600. La venta aplica la misma estructura y la liquidación estimada demora 2 días hábiles bursátiles (T+2). Los costos variables, impuestos, dividendos y cambios diarios de precio no se simulan exactamente.',
        items: [
          {
            id: 'accion_aguas',
            name: 'AGUAS S.A.',
            shortName: 'AGUAS S.A.',
            icon: '🏦',
            expectedMonthlyRate: 0.0065,
            monthlyVolatility: 0.0200,
            rateDisplay: 'Precio ref.: $322/acción · lote: 1.552 acciones',
            volatilityDisplay: 'Riesgo medio · servicios sanitarios',
            costDisplay: 'Comisión estimada compra/venta: ~$5.650 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499744,
            referenceFee: 5650,
            referenceTotal: 505394,
            sharePrice: 322,
            referenceShares: 1552,
            rescueDays: 2,
            minAmount: 505394,
            minimumDisplay: '$505.394 CLP total ($499.744 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Empresa de servicios sanitarios. El precio y lote mínimo son valores ilustrativos para practicar órdenes con acciones enteras.'
          },
          {
            id: 'accion_electricidad',
            name: 'ELECTRICIDAD S.A.',
            shortName: 'ELECTRICIDAD S.A.',
            icon: '⚡',
            expectedMonthlyRate: 0.0075,
            monthlyVolatility: 0.0250,
            rateDisplay: 'Precio ref.: $83/acción · lote: 6.024 acciones',
            volatilityDisplay: 'Riesgo medio · servicios eléctricos',
            costDisplay: 'Comisión estimada compra/venta: ~$5.650 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499992,
            referenceFee: 5650,
            referenceTotal: 505642,
            sharePrice: 83,
            referenceShares: 6024,
            rescueDays: 2,
            minAmount: 505642,
            minimumDisplay: '$505.642 CLP total ($499.992 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Empresa eléctrica. Precio y lote mínimo referenciales; la cotización puede cambiar antes de ejecutar una orden.'
          },
          {
            id: 'accion_banco_nacional',
            name: 'BANCO NACIONAL S.A.',
            shortName: 'BANCO NACIONAL S.A.',
            icon: '🏦',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0300,
            rateDisplay: 'Precio ref.: $187/acción · lote: 2.673 acciones',
            volatilityDisplay: 'Riesgo medio-alto · banca',
            costDisplay: 'Comisión estimada compra/venta: ~$5.650 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499851,
            referenceFee: 5650,
            referenceTotal: 505501,
            sharePrice: 187,
            referenceShares: 2673,
            rescueDays: 2,
            minAmount: 505501,
            minimumDisplay: '$505.501 CLP total ($499.851 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Banco comercial diversificado. Precio y lote mínimo de referencia; la inversión está expuesta al ciclo económico y al riesgo de mercado.'
          },
          {
            id: 'accion_banco_comercial',
            name: 'BANCO COMERCIAL S.A.',
            shortName: 'BANCO COMERCIAL S.A.',
            icon: '🏦',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0320,
            rateDisplay: 'Precio ref.: $78/acción · lote: 6.410 acciones',
            volatilityDisplay: 'Riesgo medio-alto · banca',
            costDisplay: 'Comisión estimada compra/venta: ~$5.650 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499980,
            referenceFee: 5650,
            referenceTotal: 505630,
            sharePrice: 78,
            referenceShares: 6410,
            rescueDays: 2,
            minAmount: 505630,
            minimumDisplay: '$505.630 CLP total ($499.980 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Banco comercial con exposición a crédito y tasas. Precio y lote mínimo de referencia para simular una orden bursátil.'
          },
          {
            id: 'accion_comunicaciones',
            name: 'COMUNICACIONES S.A.',
            shortName: 'COMUNICACIONES S.A.',
            icon: '📡',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0350,
            rateDisplay: 'Precio ref.: $4.184/acción · lote: 119 acciones',
            volatilityDisplay: 'Riesgo medio-alto · telecomunicaciones',
            costDisplay: 'Comisión estimada compra/venta: ~$5.645 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 497896,
            referenceFee: 5645,
            referenceTotal: 503541,
            sharePrice: 4184,
            referenceShares: 119,
            rescueDays: 2,
            minAmount: 503541,
            minimumDisplay: '$503.541 CLP total ($497.896 capital + ~$5.645 costos)',
            lockMonths: 0,
            desc: 'Operador de telecomunicaciones. Precio y lote mínimo de referencia; el sector requiere inversión continua en infraestructura.'
          },
          {
            id: 'accion_multitienda',
            name: 'MULTITIENDA S.A.',
            shortName: 'MULTITIENDA S.A.',
            icon: '🛍️',
            expectedMonthlyRate: 0.0090,
            monthlyVolatility: 0.0400,
            rateDisplay: 'Precio ref.: $1.686/acción · lote: 296 acciones',
            volatilityDisplay: 'Riesgo alto · comercio minorista',
            costDisplay: 'Comisión estimada compra/venta: ~$5.648 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499056,
            referenceFee: 5648,
            referenceTotal: 504704,
            sharePrice: 1686,
            referenceShares: 296,
            rescueDays: 2,
            minAmount: 504704,
            minimumDisplay: '$504.704 CLP total ($499.056 capital + ~$5.648 costos)',
            lockMonths: 0,
            desc: 'Empresa de comercio minorista. Precio y lote mínimo referenciales; su desempeño depende del consumo y el acceso al crédito.'
          },
          {
            id: 'accion_mall',
            name: 'MALL S.A.',
            shortName: 'MALL S.A.',
            icon: '🏬',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0350,
            rateDisplay: 'Precio ref.: $3.270/acción · lote: 152 acciones',
            volatilityDisplay: 'Riesgo medio-alto · centros comerciales',
            costDisplay: 'Comisión estimada compra/venta: ~$5.645 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 497040,
            referenceFee: 5645,
            referenceTotal: 502685,
            sharePrice: 3270,
            referenceShares: 152,
            rescueDays: 2,
            minAmount: 502685,
            minimumDisplay: '$502.685 CLP total ($497.040 capital + ~$5.645 costos)',
            lockMonths: 0,
            desc: 'Operador de centros comerciales. Precio y lote mínimo de referencia; ingresos sensibles a ocupación, arriendos y consumo.'
          },
          {
            id: 'accion_combustibles',
            name: 'COMBUSTIBLES S.A.',
            shortName: 'COMBUSTIBLES S.A.',
            icon: '⛽',
            expectedMonthlyRate: 0.0095,
            monthlyVolatility: 0.0450,
            rateDisplay: 'Precio ref.: $6.427/acción · lote: 77 acciones',
            volatilityDisplay: 'Riesgo alto · energía y materias primas',
            costDisplay: 'Comisión estimada compra/venta: ~$5.640 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 494879,
            referenceFee: 5640,
            referenceTotal: 500519,
            sharePrice: 6427,
            referenceShares: 77,
            rescueDays: 2,
            minAmount: 500519,
            minimumDisplay: '$500.519 CLP total ($494.879 capital + ~$5.640 costos)',
            lockMonths: 0,
            desc: 'Empresa de combustibles y energía. Precio y lote mínimo de referencia; expuesta a materias primas y demanda global.'
          },
          {
            id: 'accion_minera_serie_b',
            name: 'MINERA SERIE-B',
            shortName: 'MINERA SERIE-B',
            icon: '⛏️',
            expectedMonthlyRate: 0.0100,
            monthlyVolatility: 0.0600,
            rateDisplay: 'Precio ref.: $53.503/acción · lote: 9 acciones',
            volatilityDisplay: 'Riesgo muy alto · minería y materias primas',
            costDisplay: 'Comisión estimada compra/venta: ~$5.615 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 481527,
            referenceFee: 5615,
            referenceTotal: 487142,
            sharePrice: 53503,
            referenceShares: 9,
            rescueDays: 2,
            minAmount: 487142,
            minimumDisplay: '$487.142 CLP total ($481.527 capital + ~$5.615 costos)',
            lockMonths: 0,
            desc: 'Emisora minera de alta volatilidad. El lote mínimo queda bajo $500.000 por el precio unitario y la cantidad entera de acciones.'
          },
          {
            id: 'accion_aerolinea',
            name: 'AEROLINEA S.A.',
            shortName: 'AEROLINEA S.A.',
            icon: '✈️',
            expectedMonthlyRate: 0.0090,
            monthlyVolatility: 0.0800,
            rateDisplay: 'Precio ref.: $22/acción · lote: 22.727 acciones',
            volatilityDisplay: 'Riesgo muy alto · transporte aéreo',
            costDisplay: 'Comisión estimada compra/venta: ~$5.650 por lote mínimo',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 499994,
            referenceFee: 5650,
            referenceTotal: 505644,
            sharePrice: 22,
            referenceShares: 22727,
            rescueDays: 2,
            minAmount: 505644,
            minimumDisplay: '$505.644 CLP total ($499.994 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Empresa de transporte aéreo. Precio y lote mínimo de referencia; altamente sensible al combustible, deuda y demanda de viajes.'
          }
        ]
      },
      bonos_corp: {
        id: 'bonos_corp',
        title: '📜 Bonos Corporativos (Deuda Empresas)',
        shortTitle: 'Bonos Corporativos',
        icon: '📜',
        actionLabel: 'Comprar Bono',
        requiresRiskProfile: true,
        ruleNote: 'Escala didáctica de menor a mayor riesgo. Clasificaciones, TIR y mínimos son referenciales, no cotizaciones vigentes. Los mínimos se convierten con UF de $41.316,06 y dólar de $984,49 (noviembre de 2026). La mayoría de las emisiones locales se denomina en UF: su TIR es real, antes de costos e impuestos. La simulación no acredita cupones por separado ni actualiza la UF.',
        items: [
          {
            id: 'bono_corp_metro',
            name: 'Metro S.A. · Bono corporativo',
            shortName: 'Metro S.A.',
            icon: '🚇',
            expectedMonthlyRate: 0.0021,
            monthlyVolatility: 0.0015,
            rateDisplay: 'TIR referencial: UF + 2,4%–2,7% anual real',
            volatilityDisplay: '±0,15% mensual estimado · muy bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 41316060,
            minimumDisplay: 'UF 1.000 (≈ $41.316.060 CLP)',
            lockMonths: 0,
            desc: 'Sector: transporte público e infraestructura · Clasificación de referencia: AAA. Perfil: mínimo riesgo y menor retorno; flujo asociado a infraestructura regulada.'
          },
          {
            id: 'bono_corp_efe',
            name: 'Empresa de los Ferrocarriles del Estado (EFE) · Bono corporativo',
            shortName: 'EFE',
            icon: '🚆',
            expectedMonthlyRate: 0.0025,
            monthlyVolatility: 0.0018,
            rateDisplay: 'TIR referencial: UF + 2,7%–3,4% anual real',
            volatilityDisplay: '±0,18% mensual estimado · muy bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 41316060,
            minimumDisplay: 'UF 1.000 (≈ $41.316.060 CLP)',
            lockMonths: 0,
            desc: 'Sector: transporte ferroviario · Clasificación de referencia: AAA. Perfil: mínimo riesgo; algunas emisiones de referencia pueden tener vencimientos largos, incluso hasta 30 años.'
          },
          {
            id: 'bono_corp_banco_nacional',
            name: 'Banco Nacional · Bono senior',
            shortName: 'Banco Nacional senior',
            icon: '🏦',
            expectedMonthlyRate: 0.0022,
            monthlyVolatility: 0.0018,
            rateDisplay: 'TIR referencial: UF + 2,5%–2,9% anual real',
            volatilityDisplay: '±0,18% mensual estimado · muy bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: banca y servicios financieros · Clasificación de referencia: AAA. Perfil: muy bajo riesgo; bono senior con prioridad de pago y liquidez relativa en mercado.'
          },
          {
            id: 'bono_corp_aguas',
            name: 'Aguas S.A. · Bono corporativo',
            shortName: 'Aguas S.A.',
            icon: '💧',
            expectedMonthlyRate: 0.0024,
            monthlyVolatility: 0.0020,
            rateDisplay: 'TIR referencial: UF + 2,8%–3,1% anual real',
            volatilityDisplay: '±0,20% mensual estimado · muy bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: servicios sanitarios · Clasificación de referencia: AA+. Perfil: muy bajo riesgo; servicio esencial con ingresos regulados y vinculados a la inflación.'
          },
          {
            id: 'bono_corp_electricidad',
            name: 'Electricidad · Bono corporativo',
            shortName: 'Electricidad',
            icon: '⚡',
            expectedMonthlyRate: 0.0025,
            monthlyVolatility: 0.0025,
            rateDisplay: 'TIR referencial: UF + 2,9%–3,3% anual real',
            volatilityDisplay: '±0,25% mensual estimado · bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 41316060,
            minimumDisplay: 'UF 1.000 (≈ $41.316.060 CLP)',
            lockMonths: 0,
            desc: 'Sector: transmisión eléctrica · Clasificación de referencia: AA. Perfil: bajo riesgo; infraestructura esencial con contratos de largo plazo.'
          },
          {
            id: 'bono_corp_grupo_inversiones',
            name: 'Grupo Inversiones · Bono corporativo',
            shortName: 'Grupo Inversiones',
            icon: '🌲',
            expectedMonthlyRate: 0.0027,
            monthlyVolatility: 0.0035,
            rateDisplay: 'TIR referencial: UF + 3,0%–3,5% anual real',
            volatilityDisplay: '±0,35% mensual estimado · bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: forestal y celulosa · Clasificación de referencia: AA/AA−. Perfil: bajo riesgo; exportador global con activos reales, expuesto al ciclo de precios de la celulosa.'
          },
          {
            id: 'bono_corp_alimentos',
            name: 'Alimentos S.A. · Bono corporativo',
            shortName: 'Alimentos S.A.',
            icon: '🥫',
            expectedMonthlyRate: 0.0028,
            monthlyVolatility: 0.0030,
            rateDisplay: 'TIR referencial: UF + 3,2%–3,6% anual real',
            volatilityDisplay: '±0,30% mensual estimado · bajo riesgo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: alimentos y consumo masivo · Clasificación de referencia: AA−. Perfil: bajo riesgo; demanda relativamente estable, aunque persiste el riesgo empresarial.'
          },
          {
            id: 'bono_corp_banco_comercial',
            name: 'Banco Comercial · Bono subordinado',
            shortName: 'Banco Comercial subordinado',
            icon: '🏦',
            expectedMonthlyRate: 0.0030,
            monthlyVolatility: 0.0050,
            rateDisplay: 'TIR referencial: UF + 3,4%–3,8% anual real',
            volatilityDisplay: '±0,50% mensual estimado · riesgo moderado-bajo',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: banca, deuda subordinada · Clasificación de referencia: AA−/A+. Perfil: moderado-bajo; tiene menor prioridad de pago que deuda senior.'
          },
          {
            id: 'bono_corp_comunicaciones',
            name: 'Comunicaciones · Bono corporativo',
            shortName: 'Comunicaciones',
            icon: '📡',
            expectedMonthlyRate: 0.0032,
            monthlyVolatility: 0.0060,
            rateDisplay: 'TIR referencial: UF + 3,6%–4,1% anual real',
            volatilityDisplay: '±0,60% mensual estimado · riesgo moderado',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: telecomunicaciones · Clasificación de referencia: A+/A. Perfil: moderado; ingresos recurrentes, con competencia y necesidades relevantes de inversión.'
          },
          {
            id: 'bono_corp_mall',
            name: 'Mall S.A. · Bono corporativo',
            shortName: 'Mall S.A.',
            icon: '🏬',
            expectedMonthlyRate: 0.0031,
            monthlyVolatility: 0.0055,
            rateDisplay: 'TIR referencial: UF + 3,5%–4,0% anual real',
            volatilityDisplay: '±0,55% mensual estimado · riesgo moderado',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: centros comerciales · Clasificación de referencia: AA/A+. Perfil: moderado; respaldado por activos inmobiliarios y arriendos, sensible al consumo y la ocupación.'
          },
          {
            id: 'bono_corp_multitienda',
            name: 'Multitienda · Bono corporativo',
            shortName: 'Multitienda',
            icon: '🛍️',
            expectedMonthlyRate: 0.0038,
            monthlyVolatility: 0.0100,
            rateDisplay: 'TIR referencial: UF + 4,3%–5,0% anual real',
            volatilityDisplay: '±1,00% mensual estimado · riesgo medio-alto',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP)',
            lockMonths: 0,
            desc: 'Sector: retail y tiendas por departamento · Clasificación de referencia: A/BBB+. Perfil: medio-alto; sensible al consumo, tasas de interés y morosidad.'
          },
          {
            id: 'bono_corp_aerolinea',
            name: 'Aerolínea · Bono corporativo de alto rendimiento',
            shortName: 'Aerolínea high yield',
            icon: '✈️',
            expectedMonthlyRate: 0.0076,
            monthlyVolatility: 0.0250,
            rateDisplay: 'TIR referencial: UF + 7%–12% o más · puede emitirse en USD',
            volatilityDisplay: '±2,50% mensual estimado · riesgo muy alto',
            costDisplay: 'Supuesto simulador: 0,15% corretaje/custodia; riesgo de quita',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 49224500,
            minimumDisplay: 'US$ 50.000 (≈ $49.224.500 CLP)',
            lockMonths: 0,
            desc: 'Sector: aerolínea · Clasificación de referencia: BB a C o en reestructuración. Perfil: máximo riesgo; existe posibilidad real de impago, reestructuración o pérdida de capital. La tasa alta no garantiza retorno.'
          }
        ]
      },
      bonos_estado: {
        id: 'bonos_estado',
        title: '🇨🇱 Bonos Soberanos y Temáticos',
        shortTitle: 'Bonos Soberanos',
        icon: '🇨🇱',
        actionLabel: 'Comprar Bono',
        requiresRiskProfile: false,
        ruleNote: 'Ofertas educativas con tasas, plazos, costos y mínimos referenciales de compra directa, no cotizaciones vigentes. BTP/BCP parten desde $5.000.000 y BTU/BCU desde UF 500; en el mercado secundario suelen transarse lotes mayores. Las licitaciones primarias son solo para instituciones. Los bonos pueden perder valor si se venden antes del vencimiento. Los cupones suelen pagarse semestralmente según la serie; esta simulación no los abona por separado y no actualiza la UF por inflación.',
        items: [
          {
            id: 'bono_tesoreria_btp',
            name: 'Bonos de la Tesorería General de la República en Pesos (BTP)',
            shortName: 'BTP en pesos',
            icon: '🏛️',
            expectedMonthlyRate: 0.00407,
            monthlyVolatility: 0.0080,
            rateDisplay: '~5,0% anual nominal referencial · cupones semestrales',
            volatilityDisplay: '±0,80% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 5000000,
            minimumDisplay: '$5.000.000 CLP (algunas series: $50.000.000–$100.000.000)',
            lockMonths: 0,
            desc: 'Deuda soberana en pesos chilenos a tasa fija. Escenario didáctico de vencimiento a 5 años: paga cupones semestrales y devuelve el capital al vencimiento. Una venta anticipada se realiza al precio de mercado.'
          },
          {
            id: 'bono_tesoreria_btu',
            name: 'Bonos de la Tesorería General de la República en UF (BTU)',
            shortName: 'BTU en UF',
            icon: '🇨🇱',
            expectedMonthlyRate: 0.00124,
            monthlyVolatility: 0.0075,
            rateDisplay: 'UF + ~1,5% real anual referencial · cupones semestrales',
            volatilityDisplay: '±0,75% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500–1.000 (≈ $20.658.030–$41.316.060 CLP)',
            lockMonths: 0,
            desc: 'Deuda soberana denominada en UF. La unidad se reajusta con la inflación y el bono paga una tasa real; el precio de mercado también cambia con las tasas. Escenario didáctico de vencimiento a 5 años.'
          },
          {
            id: 'bono_banco_central_bcp',
            name: 'Bonos del Banco Central en Pesos (BCP)',
            shortName: 'BCP en pesos',
            icon: '🏦',
            expectedMonthlyRate: 0.00385,
            monthlyVolatility: 0.0080,
            rateDisplay: '~4,7% anual nominal referencial · cupones según serie',
            volatilityDisplay: '±0,80% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 5000000,
            minimumDisplay: '$5.000.000 CLP (cortes mayores según serie y mercado)',
            lockMonths: 0,
            desc: 'Instrumento del Banco Central denominado en pesos. Los cortes normativos incluyen $5, $50, $100 y $200 millones; la tasa y el vencimiento dependen de la serie.'
          },
          {
            id: 'bono_banco_central_bcu',
            name: 'Bonos del Banco Central en UF (BCU)',
            shortName: 'BCU en UF',
            icon: '🏦',
            expectedMonthlyRate: 0.00124,
            monthlyVolatility: 0.0075,
            rateDisplay: 'UF + ~1,5% real anual referencial · cupones según serie',
            volatilityDisplay: '±0,75% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500 (≈ $20.658.030 CLP; hay cortes mayores por serie)',
            lockMonths: 0,
            desc: 'Instrumento del Banco Central denominado en UF. Los cortes normativos incluyen UF 500, 1.000, 5.000 y 10.000; la tasa real y el vencimiento dependen de la serie.'
          },
          {
            id: 'bono_soberano_esg_btp',
            name: 'Bono Soberano Sostenible en Pesos (BTP ESG)',
            shortName: 'BTP Sostenible',
            icon: '🌱',
            expectedMonthlyRate: 0.00407,
            monthlyVolatility: 0.0080,
            rateDisplay: '~5,0% anual nominal referencial · cupón según emisión',
            volatilityDisplay: '±0,80% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 5000000,
            minimumDisplay: '$5.000.000 CLP (serie sostenible denominada en pesos)',
            lockMonths: 0,
            desc: 'Emisión soberana etiquetada para financiar proyectos verdes, sociales o sustentables. Al estar denominada en pesos, sigue el corte de referencia del BTP; la etiqueta ESG no implica rentabilidad adicional.'
          },
          {
            id: 'bono_soberano_esg_btu',
            name: 'Bono Soberano Sostenible en UF (BTU ESG)',
            shortName: 'BTU Sostenible',
            icon: '🌱',
            expectedMonthlyRate: 0.00124,
            monthlyVolatility: 0.0075,
            rateDisplay: 'UF + ~1,5% real anual referencial · cupón según emisión',
            volatilityDisplay: '±0,75% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 20658030,
            minimumDisplay: 'UF 500–1.000 (≈ $20.658.030–$41.316.060 CLP)',
            lockMonths: 0,
            desc: 'Emisión soberana sostenible denominada en UF; aplica el corte de referencia del BTU según la serie. La etiqueta ESG no implica rentabilidad adicional.'
          },
          {
            id: 'bono_soberano_esg_internacional',
            name: 'Bono Soberano Temático Internacional (USD)',
            shortName: 'Bono ESG internacional',
            icon: '🌎',
            expectedMonthlyRate: 0.00376,
            monthlyVolatility: 0.0090,
            rateDisplay: '~4,6% anual referencial · moneda y cupón según emisión',
            volatilityDisplay: '±0,90% mensual estimado · riesgo bajo',
            costDisplay: 'Supuesto educativo: 0,10% de corretaje/custodia por operación',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 98449000,
            minimumDisplay: 'US$ 100.000–200.000 (≈ $98.449.000–$196.898.000 CLP)',
            lockMonths: 0,
            desc: 'Emisión soberana temática externa en moneda extranjera. Se modela en USD con mínimo referencial de US$100.000; algunas emisiones requieren US$200.000. El riesgo cambiario no se simula.'
          }
        ]
      },
      etf: {
        id: 'etf',
        title: '🌐 Fondos Indexados y ETF',
        shortTitle: 'Fondos Indexados y ETF',
        icon: '🌐',
        actionLabel: 'Comprar ETF',
        requiresRiskProfile: true,
        ruleNote: 'Ejemplos educativos; administradoras, TER y mínimos son referenciales y pueden cambiar. Para comparar con acciones, el simulador usa un mínimo operativo común de $500.000 de capital más ~$5.650 de corretaje, derechos e IVA ($505.650 total). Las tarifas de compra y venta siguen el modelo de corredora tradicional; para el Fondo Mutuo indexado es solo una aproximación didáctica, no una tarifa real de la administradora. Los ETFs locales con presencia bursátil podrían acogerse al Art. 107 LIR si cumplen sus requisitos; esta simulación no calcula impuestos ni descuenta el TER anual periódicamente.',
        items: [
          {
            id: 'etf_itnow_ipsa',
            name: 'Itaú ETF It Now S&P IPSA (CFMITNIPSA)',
            shortName: 'It Now S&P IPSA',
            icon: '🇨🇱',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0300,
            rateDisplay: 'Índice S&P/CLX IPSA · renta variable chilena',
            volatilityDisplay: 'Riesgo alto · acciones locales',
            costDisplay: 'TER ~0,25% anual · corretaje simulado ~$5.650 mínimo por operación',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total ($500.000 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Administradora: Itaú AGF. Replica las 30 acciones más líquidas de Chile.'
          },
          {
            id: 'etf_singular_sp500',
            name: 'ETF Singular S&P 500 (CFISPETF)',
            shortName: 'Singular S&P 500',
            icon: '🇺🇸',
            expectedMonthlyRate: 0.0095,
            monthlyVolatility: 0.0330,
            rateDisplay: 'Índice S&P 500 · grandes empresas de EE.UU.',
            volatilityDisplay: 'Riesgo alto · renta variable internacional',
            costDisplay: 'TER ~0,25%–0,35% anual · corretaje simulado ~$5.650 mínimo por operación',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total ($500.000 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Administradora: Singular Asset Management. Replica las 500 empresas más grandes de Estados Unidos.'
          },
          {
            id: 'etf_singular_nasdaq100',
            name: 'ETF Singular Nasdaq 100 (CFINASDAQ)',
            shortName: 'Singular Nasdaq 100',
            icon: '💻',
            expectedMonthlyRate: 0.0100,
            monthlyVolatility: 0.0450,
            rateDisplay: 'Índice Nasdaq 100 · grandes empresas tecnológicas',
            volatilityDisplay: 'Riesgo muy alto · concentrado en tecnología',
            costDisplay: 'TER ~0,25% anual · corretaje simulado ~$5.650 mínimo por operación',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total ($500.000 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Administradora: Singular Asset Management. Replica las 100 principales empresas del Nasdaq.'
          },
          {
            id: 'etf_singular_chile_corp',
            name: 'ETF Singular Chile Corporativo (CFIETFCC)',
            shortName: 'Singular Chile Corporativo',
            icon: '🏦',
            expectedMonthlyRate: 0.0040,
            monthlyVolatility: 0.0120,
            rateDisplay: 'Índice de bonos corporativos y bancarios chilenos · renta fija UF',
            volatilityDisplay: 'Riesgo medio · sensibilidad a tasas y UF',
            costDisplay: 'TER ~0,20% anual · corretaje simulado ~$5.650 mínimo por operación',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total ($500.000 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Administradora: Singular Asset Management. Sigue un índice de deuda corporativa y bancaria chilena denominada en UF.'
          },
          {
            id: 'etf_btg_emerging_markets',
            name: 'BTG Pactual ETF Global Emerging Markets (CFIETFGEM)',
            shortName: 'BTG Emerging Markets',
            icon: '🌍',
            expectedMonthlyRate: 0.0080,
            monthlyVolatility: 0.0400,
            rateDisplay: 'Índice MSCI Emerging Markets · acciones de mercados emergentes',
            volatilityDisplay: 'Riesgo alto · exposición global emergente',
            costDisplay: 'TER ~0,30% anual · corretaje simulado ~$5.650 mínimo por operación',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total ($500.000 capital + ~$5.650 costos)',
            lockMonths: 0,
            desc: 'Administradora: BTG Pactual Chile AGF. Exposición diversificada a China, India, Taiwán, Brasil y otros mercados emergentes.'
          },
          {
            id: 'ffmm_security_sp500',
            name: 'Fondo Mutuo Security Index Fund S&P 500',
            shortName: 'Security Index Fund S&P 500',
            icon: '📊',
            expectedMonthlyRate: 0.0090,
            monthlyVolatility: 0.0330,
            rateDisplay: 'Índice S&P 500 · fondo mutuo indexado tradicional',
            volatilityDisplay: 'Riesgo alto · renta variable internacional',
            costDisplay: 'TER ~0,80%–1,20% anual · costo transaccional simulado ~$5.650',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            feeModel: 'chile_equity',
            brokerageRate: 0.0035,
            minimumBrokerageFee: 4000,
            exchangeRightsFee: 750,
            feeVatRate: 0.19,
            referenceCapital: 500000,
            referenceFee: 5650,
            referenceTotal: 505650,
            rescueDays: 2,
            minAmount: 505650,
            minimumDisplay: '$505.650 CLP total en este simulador ($500.000 + ~$5.650)',
            lockMonths: 0,
            desc: 'Administradora indicada en la referencia: BICE Inversiones AGF. No cotiza en bolsa; permite aportes programados según las condiciones de la serie.'
          }
        ]
      },
      moneda_ext: {
        id: 'moneda_ext',
        title: '💱 Compra/Venta Moneda Extranjera',
        shortTitle: 'Moneda Extranjera',
        icon: '💱',
        items: []
      },
      cripto: {
        id: 'cripto',
        title: '🪙 Compra/Venta Criptomonedas',
        shortTitle: 'Criptomonedas',
        icon: '🪙',
        actionLabel: 'Comprar Cripto',
        requiresRiskProfile: true,
        ruleNote: '<strong>⚠️ Advertencia CMF / Ley Fintech:</strong> Las criptomonedas <strong>no son moneda de curso legal ni cuentan con garantía estatal o seguro de depósitos</strong>. Presentan volatilidad extrema (`±8% mensual` o más) y cobran comisión de <em>exchange</em> (`0,80%`).',
        items: [
          {
            id: 'crypto_btc',
            name: 'Bitcoin (BTC)',
            shortName: 'Bitcoin (BTC)',
            icon: '<img src="assets/crypto/bitcoin.png" alt="Bitcoin" style="width: 24px; height: 24px; object-fit: contain; vertical-align: middle;">',
            expectedMonthlyRate: 0.0140,
            monthlyVolatility: 0.0800,
            rateDisplay: '~1,40% mensual esp. (Especulación extrema)',
            volatilityDisplay: '±8,00%/mes (Extrema)',
            costDisplay: 'Comisión Exchange: 1,20% compra / 1,20% venta',
            entryFeePct: 0.0120,
            exitPenaltyPct: 0.0120,
            rescueDays: 1,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Lidera en adopción institucional y como reserva de valor ("oro digital"), siendo la opción principal en plataformas locales e internacionales.'
          },
          {
            id: 'crypto_eth',
            name: 'Ethereum (ETH)',
            shortName: 'Ethereum (ETH)',
            icon: '<img src="assets/crypto/ethereum.png" alt="Ethereum" style="width: 24px; height: 24px; object-fit: contain; vertical-align: middle;">',
            expectedMonthlyRate: 0.0145,
            monthlyVolatility: 0.0850,
            rateDisplay: '~1,45% mensual esp. (Especulación extrema)',
            volatilityDisplay: '±8,50%/mes (Extrema)',
            costDisplay: 'Comisión Exchange: 0,80% compra / 0,80% venta',
            entryFeePct: 0.0080,
            exitPenaltyPct: 0.0080,
            rescueDays: 1,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Es la base principal para aplicaciones de finanzas descentralizadas (DeFi) y contratos inteligentes, muy elegida para inversión a mediano y largo plazo.'
          },
          {
            id: 'crypto_sol',
            name: 'Solana (SOL)',
            shortName: 'Solana (SOL)',
            icon: '<img src="assets/crypto/solana.png" alt="Solana" style="width: 24px; height: 24px; object-fit: contain; vertical-align: middle;">',
            expectedMonthlyRate: 0.0145,
            monthlyVolatility: 0.0900,
            rateDisplay: '~1,45% mensual esp. (Especulación extrema)',
            volatilityDisplay: '±9,00%/mes (Extrema)',
            costDisplay: 'Comisión Exchange: 0,80% compra / 0,80% venta',
            entryFeePct: 0.0080,
            exitPenaltyPct: 0.0080,
            rescueDays: 1,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Destaca entre los inversores por la alta velocidad de sus transacciones y sus bajas comisiones.'
          },
          {
            id: 'crypto_xrp',
            name: 'XRP (Ripple)',
            shortName: 'XRP (Ripple)',
            icon: '<img src="assets/crypto/xrp.png" alt="XRP" style="width: 24px; height: 24px; object-fit: contain; vertical-align: middle;">',
            expectedMonthlyRate: 0.0120,
            monthlyVolatility: 0.0800,
            rateDisplay: '~1,20% mensual esp. (Especulación extrema)',
            volatilityDisplay: '±8,00%/mes (Extrema)',
            costDisplay: 'Comisión Exchange: 0,80% compra / 0,80% venta',
            entryFeePct: 0.0080,
            exitPenaltyPct: 0.0080,
            rescueDays: 1,
            minAmount: 10000,
            lockMonths: 0,
            desc: 'Tiene un flujo importante de adopción asociado a pagos transfronterizos y servicios financieros.'
          }
        ]
      },
      billeteras: {
        id: 'billeteras',
        title: '📱 Billeteras Electrónicas',
        shortTitle: 'Billeteras Electrónicas',
        icon: '📱',
        actionLabel: 'Cargar Saldo',
        requiresRiskProfile: false,
        ruleNote: 'La billetera funciona como una cuenta vista líquida: permite depositar, transferir, girar y cerrar la cuenta. Además, abona interés diario simulado sobre el saldo disponible; el rendimiento es referencial y puede variar.',
        items: [
          {
            id: 'wallet_remunerada',
            name: 'Billetera Digital con Rendimiento Diario Automático',
            shortName: 'Billetera Digital Remunerada',
            icon: '📱',
            expectedMonthlyRate: 0.0038,
            monthlyVolatility: 0.0005,
            annualInterestRate: 0.0465,
            rateDisplay: '~4,65% anual referencial, con capitalización diaria',
            volatilityDisplay: 'Tasa simulada; saldo disponible',
            costDisplay: '$0 apertura · $0 mantención · $0 comisión de giro',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            rescueDays: 0,
            minAmount: 5000,
            lockMonths: 0,
            desc: 'Cuenta digital de libre disponibilidad. El interés de cada día se calcula sobre el saldo y se abona al simular el día.'
          }
        ]
      },
      startups: {
        id: 'startups',
        title: '🚀 Participación en Startups',
        shortTitle: 'Participación en Startups',
        icon: '🚀',
        actionLabel: 'Invertir Capital',
        requiresRiskProfile: true,
        ruleNote: '<strong>⚠️ Capital de riesgo e iliquidez:</strong> Los mínimos, canales y plazos de salida son referenciales. Una ronda puede perder todo su valor y no garantiza una venta; las salidas suelen depender de una adquisición, recompra o mercado secundario. El equivalente de referencia usa dólar a $984,49 (noviembre de 2026).',
        items: [
          {
            id: 'startup_saas',
            name: 'Automatización B2B para Pymes · SaaS',
            shortName: 'SaaS B2B',
            icon: '💻',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.0600,
            rateDisplay: 'Salida estimada: 4–6 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo medio-alto · ilíquida',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 500000,
            minimumDisplay: '$500.000 CLP (crowdfunding) · US$ 10.000 ≈ $9.844.900 CLP (directo/ángel)',
            lockMonths: 0,
            desc: 'Software empresarial para automatizar contabilidad o RR.HH. de pymes. Puede escalar con bajo costo por cliente; acceso referencial vía crowdfunding (p. ej., Broota) o redes ángeles.'
          },
          {
            id: 'startup_fintech',
            name: 'App de Pagos o Crédito Digital de Nicho · Fintech',
            shortName: 'Fintech de nicho',
            icon: '💳',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.0800,
            rateDisplay: 'Salida estimada: 5–7 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo alto · ilíquida y regulada',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 500000,
            minimumDisplay: '$500.000 CLP (crowdfunding) · US$ 10.000 ≈ $9.844.900 CLP (directo/ángel)',
            lockMonths: 0,
            desc: 'Pagos, factoraje digital o billetera especializada. La adquisición de usuarios y el cumplimiento regulatorio, incluida la Ley Fintech, elevan la necesidad de capital.'
          },
          {
            id: 'startup_marketplace',
            name: 'Marketplace de Servicios o Logística',
            shortName: 'Marketplace / logística',
            icon: '📦',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.0900,
            rateDisplay: 'Salida estimada: 5–8 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo alto · ilíquida',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 500000,
            minimumDisplay: '$500.000 CLP (crowdfunding) · US$ 10.000 ≈ $9.844.900 CLP (directo/ángel)',
            lockMonths: 0,
            desc: 'Plataforma de servicios a domicilio o última milla. Su desafío es alcanzar masa crítica de oferta y demanda; puede requerir subsidios iniciales.'
          },
          {
            id: 'startup_iot',
            name: 'Sensores IoT para Riego o Minería',
            shortName: 'IoT agro/minería',
            icon: '📡',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.1000,
            rateDisplay: 'Salida estimada: 6–8 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo alto · ciclo comercial largo',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 9844900,
            minimumDisplay: 'US$ 10.000–25.000 (≈ $9.844.900–$24.612.250 CLP)',
            lockMonths: 0,
            desc: 'Sensores y monitoreo para agricultura o minería. Los pilotos y ciclos de venta a grandes empresas pueden extenderse antes de lograr contratos recurrentes; referencia de acceso vía redes ángeles o venture corporativo.'
          },
          {
            id: 'startup_foodtech',
            name: 'Alimentos Plant-Based o Envases Biodegradables',
            shortName: 'FoodTech / Cleantech',
            icon: '🌱',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.1400,
            rateDisplay: 'Salida estimada: 7–9 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo muy alto · intensiva en capital',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 500000,
            minimumDisplay: '$500.000 CLP (crowdfunding puntual) · US$ 15.000+ ≈ $14.767.350+ CLP (directo)',
            lockMonths: 0,
            desc: 'Sustitutos plant-based o envases bio. Plantas piloto, permisos sanitarios y distribución física elevan el capital requerido; el ticket bajo de crowdfunding es ocasional.'
          },
          {
            id: 'startup_biotech',
            name: 'Fármacos o Diagnóstico Genético · Biotech / HealthTech',
            shortName: 'Biotech / HealthTech',
            icon: '🧬',
            expectedMonthlyRate: 0,
            monthlyVolatility: 0.2200,
            rateDisplay: 'Salida estimada: 8–12 años · retorno no garantizado',
            volatilityDisplay: 'Riesgo extremo · riesgo científico y regulatorio',
            costDisplay: 'Descuento de liquidez simulado al vender: 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            rescueDays: 10,
            minAmount: 49224500,
            minimumDisplay: 'US$ 50.000–250.000 (≈ $49.224.500–$246.122.500 CLP)',
            lockMonths: 0,
            desc: 'Terapias, fármacos o diagnóstico genético. Patentes y ensayos clínicos implican alto gasto y baja probabilidad de éxito; el acceso suele ser mediante fondos de capital de riesgo especializados.'
          }
        ]
      }
    };

    const foreignCurrenciesCatalog = [
      { id: 'usd', name: 'Dólares americanos', code: 'USD', icon: '🇺🇸', buyPrice: 965, sellPrice: 945 },
      { id: 'eur', name: 'Euros', code: 'EUR', icon: '🇪🇺', buyPrice: 1045, sellPrice: 1015 },
      { id: 'jpy', name: 'Yenes', code: 'JPY', icon: '🇯🇵', buyPrice: 6.50, sellPrice: 6.10 },
      { id: 'gbp', name: 'Libra esterlina', code: 'GBP', icon: '🇬🇧', buyPrice: 1325, sellPrice: 1290 },
      { id: 'chf', name: 'Franco suizo', code: 'CHF', icon: '🇨🇭', buyPrice: 1210, sellPrice: 1175 },
      { id: 'aud', name: 'Dólar australiano', code: 'AUD', icon: '🇦🇺', buyPrice: 688, sellPrice: 665 },
      { id: 'pen', name: 'Soles peruanos', code: 'PEN', icon: '🇵🇪', buyPrice: 260, sellPrice: 245 },
      { id: 'ars', name: 'Peso argentino', code: 'ARS', icon: '🇦🇷', buyPrice: 0.95, sellPrice: 0.75 },
      { id: 'brl', name: 'Real brasileño', code: 'BRL', icon: '🇧🇷', buyPrice: 172, sellPrice: 160 },
      { id: 'mxn', name: 'Pesos mexicanos', code: 'MXN', icon: '🇲🇽', buyPrice: 53, sellPrice: 49 }
    ];

    function formatFXPriceCLP(val) {
      const hasDecimals = val % 1 !== 0;
      return '$' + val.toLocaleString('es-CL', {
        minimumFractionDigits: hasDecimals ? 2 : 0,
        maximumFractionDigits: hasDecimals ? 2 : 0
      });
    }

    function formatFXUnits(val) {
      const num = Number(val) || 0;
      if (num === 0) return '0';
      const hasDecimals = Math.abs(num - Math.round(num)) > 0.001;
      return num.toLocaleString('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: hasDecimals ? 2 : 0
      });
    }

    function getForeignCurrenciesTotalCLP() {
      if (!state.foreignCurrencies || typeof state.foreignCurrencies !== 'object') return 0;
      return foreignCurrenciesCatalog.reduce((sum, curr) => {
        const units = Number(state.foreignCurrencies[curr.id]) || 0;
        return sum + Math.round(units * curr.sellPrice);
      }, 0);
    }

    function getActiveForeignCurrenciesCount() {
      if (!state.foreignCurrencies || typeof state.foreignCurrencies !== 'object') return 0;
      return foreignCurrenciesCatalog.filter(curr => (Number(state.foreignCurrencies[curr.id]) || 0) > 0).length;
    }

    function findOtherInvCatalogItem(itemId) {
      for (const secKey of Object.keys(otrasInversionesCatalog)) {
        const sec = otrasInversionesCatalog[secKey];
        const found = sec.items.find(it => it.id === itemId);
        if (found) return { section: sec, item: found };
      }
      return null;
    }

    function calculateOtherInvTransactionFee(instrument, amount, feeType = 'entry') {
      const transactionAmount = Math.max(0, Number(amount) || 0);
      if (instrument.feeModel === 'chile_equity') {
        const referenceAmount = feeType === 'entry'
          ? Number(instrument.referenceTotal) || 0
          : Number(instrument.referenceCapital) || 0;
        if (transactionAmount === referenceAmount && Number(instrument.referenceFee) > 0) {
          return Number(instrument.referenceFee);
        }

        const brokerage = Math.max(
          Number(instrument.minimumBrokerageFee) || 4000,
          Math.round(transactionAmount * (Number(instrument.brokerageRate) || 0.0035))
        );
        const rights = Number(instrument.exchangeRightsFee) || 750;
        const vatRate = Number(instrument.feeVatRate) || 0.19;
        return Math.round((brokerage + rights) * (1 + vatRate));
      }

      const rate = feeType === 'exit' ? instrument.exitPenaltyPct : instrument.entryFeePct;
      return Math.round(transactionAmount * (Number(rate) || 0));
    }

    function getDigitalWalletAccount() {
      return (Array.isArray(state.bankAccounts) ? state.bankAccounts : []).find(account =>
        account.id === 'acc_wallet_remunerada' || account.type === 'digital_wallet'
      ) || null;
    }

    function migrateDigitalWalletPosition() {
      if (getDigitalWalletAccount() || !Array.isArray(state.otherInvestments)) return;
      const positionIndex = state.otherInvestments.findIndex(position =>
        position.categoryId === 'billeteras' && position.itemTypeId === 'wallet_remunerada'
      );
      if (positionIndex < 0) return;

      const position = state.otherInvestments[positionIndex];
      const balance = Number(position.currentBalance) || 0;
      if (!Array.isArray(state.bankAccounts)) state.bankAccounts = [];
      state.bankAccounts.push({
        id: 'acc_wallet_remunerada',
        name: 'Billetera Digital Remunerada',
        type: 'digital_wallet',
        icon: '📱',
        isLiquid: true,
        balance,
        interestEarned: Math.max(0, balance - (Number(position.contributedCapital) || 0)),
        simulatedInterestDays: 0,
        openedAt: new Date().toISOString()
      });
      state.otherInvestments.splice(positionIndex, 1);
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
    }

    function openDigitalWalletAccount() {
      migrateDigitalWalletPosition();
      if (getDigitalWalletAccount()) {
        renderDigitalWalletView();
        return;
      }

      if (!Array.isArray(state.bankAccounts)) state.bankAccounts = [];
      state.bankAccounts.push({
        id: 'acc_wallet_remunerada',
        name: 'Billetera Digital Remunerada',
        type: 'digital_wallet',
        icon: '📱',
        isLiquid: true,
        balance: 0,
        interestEarned: 0,
        simulatedInterestDays: 0,
        openedAt: new Date().toISOString()
      });
      renderDigitalWalletView();
      if (typeof updateHUD === 'function') updateHUD();
      alertUpcomingBankFeature('Billetera digital abierta', 'Tu billetera está activa. Puedes depositar desde efectivo u otras cuentas y simular el abono diario de intereses.');
    }

    function simulateDigitalWalletDay() {
      const account = getDigitalWalletAccount();
      if (!account) return;

      const product = findOtherInvCatalogItem('wallet_remunerada')?.item;
      const annualRate = Number(product?.annualInterestRate) || 0.0465;
      const dailyRate = Math.pow(1 + annualRate, 1 / 365) - 1;
      const interest = Math.round((Number(account.balance) || 0) * dailyRate);
      account.balance = (Number(account.balance) || 0) + interest;
      account.interestEarned = (Number(account.interestEarned) || 0) + interest;
      account.simulatedInterestDays = (Number(account.simulatedInterestDays) || 0) + 1;

      if (typeof updateHUD === 'function') updateHUD();
      renderDigitalWalletView();
      alertUpcomingBankFeature(
        'Interés diario abonado',
        `Día simulado #${account.simulatedInterestDays}: se abonaron $${interest.toLocaleString('es-CL')} de interés. Saldo actualizado: $${Number(account.balance).toLocaleString('es-CL')}.`
      );
    }

    function renderDigitalWalletView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;
      migrateDigitalWalletPosition();

      const account = getDigitalWalletAccount();
      const product = findOtherInvCatalogItem('wallet_remunerada')?.item;
      const annualRate = Number(product?.annualInterestRate) || 0.0465;
      const dailyRate = Math.pow(1 + annualRate, 1 / 365) - 1;
      const dailyRateLabel = (dailyRate * 100).toLocaleString('es-CL', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
      const title = otrasInversionesCatalog.billeteras.title;

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size:.86rem;font-weight:800;color:#047857;">${title}</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderInversionesStage('main')"><span>◀ Volver</span></button>
          </div>
          <div style="background:#fff;border:1.5px solid #cbd5e1;border-radius:8px;padding:10px 12px;margin-bottom:8px;">
            <div style="font-size:.66rem;font-weight:800;color:#0f172a;margin-bottom:3px;">Billetera Digital Remunerada</div>
            <div style="font-size:.59rem;color:#475569;line-height:1.4;">Cuenta líquida para depositar, transferir y girar. El interés se calcula diariamente sobre el saldo disponible; la tasa es una referencia educativa.</div>
          </div>
          ${account ? `
            <div style="background:linear-gradient(135deg,#ecfdf5 0%,#f0fdf4 100%);border:1.5px solid #a7f3d0;border-radius:9px;padding:10px 12px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
                <span style="font-size:.58rem;font-weight:700;background:#d1fae5;color:#047857;padding:1px 6px;border-radius:4px;">🟢 Cuenta activa</span>
                <span style="font-size:.58rem;color:#065f46;font-weight:600;">Vista · libre disponibilidad</span>
              </div>
              <div style="font-size:1.3rem;font-weight:800;color:#047857;font-family:var(--font-title);">$${Number(account.balance || 0).toLocaleString('es-CL')}</div>
              <div style="font-size:.58rem;color:#065f46;">Saldo disponible</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:8px;">
              <div style="background:#fff;border:1px solid #d1d5db;border-radius:7px;padding:8px;"><div style="font-size:.56rem;color:#64748b;">Tasa anual referencial</div><strong style="font-size:.68rem;color:#047857;">${(annualRate * 100).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</strong></div>
              <div style="background:#fff;border:1px solid #d1d5db;border-radius:7px;padding:8px;"><div style="font-size:.56rem;color:#64748b;">Tasa diaria efectiva aprox.</div><strong style="font-size:.68rem;color:#047857;">${dailyRateLabel}%</strong></div>
              <div style="background:#fff;border:1px solid #d1d5db;border-radius:7px;padding:8px;"><div style="font-size:.56rem;color:#64748b;">Intereses abonados</div><strong style="font-size:.68rem;color:#047857;">$${Number(account.interestEarned || 0).toLocaleString('es-CL')}</strong></div>
              <div style="background:#fff;border:1px solid #d1d5db;border-radius:7px;padding:8px;"><div style="font-size:.56rem;color:#64748b;">Días simulados</div><strong style="font-size:.68rem;color:#0f172a;">${Number(account.simulatedInterestDays || 0)}</strong></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;">
              <button type="button" onclick="promptDepositModal('${account.id}')" style="padding:9px 6px;background:#fff;border:1.5px solid #86efac;border-radius:7px;color:#166534;font-size:.64rem;font-weight:800;cursor:pointer;">📥 Depositar / transferir</button>
              <button type="button" onclick="promptWithdrawModal('${account.id}')" style="padding:9px 6px;background:#fff;border:1.5px solid #93c5fd;border-radius:7px;color:#1e40af;font-size:.64rem;font-weight:800;cursor:pointer;">📤 Girar a efectivo</button>
              <button type="button" onclick="simulateDigitalWalletDay()" style="padding:9px 6px;background:#ecfdf5;border:1.5px solid #86efac;border-radius:7px;color:#047857;font-size:.64rem;font-weight:800;cursor:pointer;">📈 Simular día e interés</button>
              <button type="button" onclick="promptCloseBankAccount('${account.id}')" style="padding:9px 6px;background:#fff;border:1.5px solid #fca5a5;border-radius:7px;color:#991b1b;font-size:.64rem;font-weight:800;cursor:pointer;">⚠️ Cerrar billetera</button>
            </div>
          ` : `
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:7px;padding:9px 11px;margin-bottom:8px;font-size:.62rem;color:#475569;line-height:1.4;">
              Apertura sin costo, mantención $0 y giros sin comisión. Tasa anual efectiva referencial: <strong>~${(annualRate * 100).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</strong>, abonada al simular cada día.
            </div>
            <button type="button" onclick="openDigitalWalletAccount()" style="width:100%;padding:9px;border:none;border-radius:6px;background:#047857;color:#fff;font-size:.70rem;font-weight:800;cursor:pointer;">Abrir billetera</button>
          `}
        </div>`;
    }

    function renderInversionesStage(subView = 'main') {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const titleElem = document.getElementById('hub-stage-title');
      const subtitleElem = document.getElementById('hub-stage-subtitle');
      const iconBox = document.getElementById('hub-stage-icon-box');

      if (iconBox) {
        iconBox.style.cursor = 'default';
        iconBox.onclick = null;
        iconBox.removeAttribute('title');
        iconBox.className = 'hub-stage-header-icon dock-icon-box icon-inversiones';
        iconBox.innerHTML = '<span>📈</span>';
      }
      if (titleElem) titleElem.innerText = '📈 Otros Instrumentos';
      if (subtitleElem) subtitleElem.innerText = 'Instrumentos previsionales, bursátiles, divisas y capital de riesgo';

      if (!Array.isArray(state.otherInvestments)) state.otherInvestments = [];
      if (!state.foreignCurrencies || typeof state.foreignCurrencies !== 'object') state.foreignCurrencies = {};
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();

      if (subView === 'moneda_ext') {
        renderMonedaExtranjeraView();
        return;
      }

      if (subView !== 'main' && otrasInversionesCatalog[subView]) {
        renderOtherInvestmentCategoryView(subView);
        return;
      }

      const digitalWallet = getDigitalWalletAccount();
      const totalOtherBalance = state.otherInvestments.reduce((sum, inv) => sum + (Number(inv.currentBalance) || 0), 0) + getForeignCurrenciesTotalCLP() + (Number(state.apvAccount?.balance) || 0) + (Number(state.cuenta2Account?.balance) || 0) + (Number(digitalWallet?.balance) || 0);
      const totalOtherCount = state.otherInvestments.length + getActiveForeignCurrenciesCount() + Number(Boolean(state.apvAccount)) + Number(Boolean(state.cuenta2Account)) + Number(Boolean(digitalWallet));

      container.innerHTML = `
        <div class="personal-subview-box">
          <!-- RESUMEN GLOBAL DE OTROS INSTRUMENTOS -->
          <div style="background: linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%); border: 1.5px solid #c4b5fd; border-radius: 9px; padding: 9px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.58rem; font-weight: 700; color: #5b21b6; text-transform: uppercase;">Cartera en Otros Instrumentos</div>
              <div style="font-size: 1.15rem; font-weight: 800, color: #6d28d9; font-family: var(--font-title);">
                $${totalOtherBalance.toLocaleString('es-CL')}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.58rem; color: #64748b;">Posiciones activas</div>
              <div style="font-size: 0.88rem; font-weight: 800; color: #0284c7;">
                ${totalOtherCount} ${totalOtherCount === 1 ? 'instrumento' : 'instrumentos'}
              </div>
            </div>
          </div>

          <!-- GRID 2 COLUMNAS DE LAS 11 SECCIONES -->
          <div class="hub-grid-2col">
            ${hubsData.inversiones.sections.map(sec => {
              const countInSec = sec.id === 'moneda_ext'
                ? getActiveForeignCurrenciesCount()
                : sec.id === 'billeteras'
                  ? Number(Boolean(getDigitalWalletAccount()))
                  : state.otherInvestments.filter(inv => inv.categoryId === sec.id).length + (sec.id === 'apv' && state.apvAccount ? 1 : 0) + (sec.id === 'cuenta2' && state.cuenta2Account ? 1 : 0);
              return `
                <div class="hub-option-card" onclick="renderInversionesStage('${sec.id}')">
                  <div class="hub-option-icon">${sec.icon || '💎'}</div>
                  <div class="hub-option-text">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                      <div class="hub-option-name">${sec.name}</div>
                      ${countInSec > 0 ? `<span style="font-size: 0.54rem; font-weight: 800; background: #dcfce7; color: #166534; padding: 1px 5px; border-radius: 999px; flex-shrink: 0;">${countInSec}</span>` : ''}
                    </div>
                    ${sec.desc ? `<div class="hub-option-desc">${sec.desc}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    function renderMonedaExtranjeraView() {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      if (!state.foreignCurrencies || typeof state.foreignCurrencies !== 'object') {
        state.foreignCurrencies = {};
      }
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size: 0.86rem; font-weight: 800; color: #0284c7;">💱 Compra/Venta Moneda Extranjera</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderInversionesStage('main')">
              <span>◀ Volver</span>
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
            ${foreignCurrenciesCatalog.map(curr => {
              const ownedUnits = Number(state.foreignCurrencies[curr.id]) || 0;
              return `
                <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between; gap: 6px;">
                  <div>
                    <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
                      ${curr.name} (${curr.code})
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <div style="font-size: 0.68rem; font-weight: 700, color: #475569; line-height: 1.38;">
                        Compra: <strong style="color: #0284c7; font-size: 0.76rem;">${formatFXPriceCLP(curr.buyPrice)}</strong><br/>
                        Venta: <strong style="color: #047857; font-size: 0.76rem;">${formatFXPriceCLP(curr.sellPrice)}</strong>
                      </div>
                      <div style="font-size: 2.15rem; line-height: 1; flex-shrink: 0;">
                        ${curr.icon}
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; padding-top: 6px; border-top: 1px dashed #e2e8f0;">
                    <div style="font-size: 0.60rem; color: #64748b; line-height: 1.3;">
                      Tienes:<br/>
                      <strong style="color: ${ownedUnits > 0 ? '#0f172a' : '#94a3b8'}; font-size: 0.72rem;">${formatFXUnits(ownedUnits)} ${curr.code}</strong>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 5px; ${ownedUnits > 0 ? 'width: 105px;' : ''}">
                      <button type="button" onclick="openBuyForeignCurrencyModal('${curr.id}')" style="width: 100%; padding: 4px 8px; font-size: 0.60rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;">
                        Comprar
                      </button>
                      <button type="button" onclick="openSellForeignCurrencyModal('${curr.id}')" style="width: 100%; padding: 4px 8px; font-size: 0.60rem; font-weight: 800; background: ${ownedUnits > 0 ? '#047857' : '#cbd5e1'}; color: #ffffff; border: none; border-radius: 5px; cursor: ${ownedUnits > 0 ? 'pointer' : 'not-allowed'};" ${ownedUnits > 0 ? '' : 'disabled'}>
                        Vender
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    function openBuyForeignCurrencyModal(currId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const cash = Number(state.cash) || 0;

      const fundingOptions = [
        { id: 'cash', label: `💵 Dinero en Efectivo (Disponible: $${cash.toLocaleString('es-CL')})`, balance: cash },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Disponible: $${(a.balance || 0).toLocaleString('es-CL')})`,
          balance: Number(a.balance) || 0
        }))
      ];

      const defaultUnits = Math.max(1, Math.ceil(5000 / curr.buyPrice));
      const defaultTotalCLP = Math.round(defaultUnits * curr.buyPrice);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #0284c7; max-width: 405px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ${curr.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.92rem;">
                  Comprar ${curr.name} (${curr.code})
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.66rem; color: #e0f2fe; margin-top: 2px;">
                  Valor de compra: ${formatFXPriceCLP(curr.buyPrice)} por 1 ${curr.code}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  1. Pagar desde:
                </label>
                <select id="fx-buy-source-select" style="width: 100%; padding: 7px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.68rem; font-weight: 700; color: #0f172a; background: #ffffff;">
                  ${fundingOptions.map(opt => `<option value="${opt.id}">${opt.label}</option>`).join('')}
                </select>
              </div>

              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  2. Cantidad de ${curr.code} a comprar:
                </label>
                <input id="fx-buy-units-input" type="number" min="1" step="1" value="${defaultUnits}" oninput="updateBuyFXPreview('${curr.id}')" style="width: 100%; padding: 7px 9px; border: 1.5px solid #0284c7; border-radius: 6px; font-size: 0.80rem; font-weight: 800; color: #0f172a; box-sizing: border-box;" />
              </div>

              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; font-size: 0.62rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #475569;">Total a pagar en pesos (CLP):</span>
                <strong id="fx-buy-total-clp" style="color: #0284c7; font-size: 0.78rem;">$${defaultTotalCLP.toLocaleString('es-CL')}</strong>
              </div>

              <div id="fx-buy-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeBuyForeignCurrency('${curr.id}')" style="flex: 1.3; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function updateBuyFXPreview(currId) {
      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;
      const inputEl = document.getElementById('fx-buy-units-input');
      const units = Math.max(0, Number(inputEl ? inputEl.value : 0));
      const totalCLP = Math.round(units * curr.buyPrice);
      const totalEl = document.getElementById('fx-buy-total-clp');
      if (totalEl) totalEl.textContent = `$${totalCLP.toLocaleString('es-CL')}`;
    }

    function executeBuyForeignCurrency(currId) {
      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;

      const sourceSelect = document.getElementById('fx-buy-source-select');
      const unitsInput = document.getElementById('fx-buy-units-input');
      const errorEl = document.getElementById('fx-buy-error');

      const sourceId = sourceSelect ? sourceSelect.value : 'cash';
      const units = Number(unitsInput ? unitsInput.value : 0);
      const totalCLP = Math.round(units * curr.buyPrice);

      if (!units || units <= 0 || totalCLP <= 0) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `⚠️ Ingresa una cantidad válida de ${curr.code}.`;
        }
        return;
      }

      if (sourceId === 'cash') {
        const available = Number(state.cash) || 0;
        if (totalCLP > available) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ Saldo insuficiente en Efectivo ($${available.toLocaleString('es-CL')} disponibles).`;
          }
          return;
        }
        state.cash = available - totalCLP;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === sourceId);
        if (!acc || (Number(acc.balance) || 0) < totalCLP) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = '⚠️ Saldo insuficiente en la cuenta bancaria seleccionada.';
          }
          return;
        }
        acc.balance = (Number(acc.balance) || 0) - totalCLP;
      }

      if (!state.foreignCurrencies || typeof state.foreignCurrencies !== 'object') {
        state.foreignCurrencies = {};
      }
      state.foreignCurrencies[curr.id] = (Number(state.foreignCurrencies[curr.id]) || 0) + units;

      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderMonedaExtranjeraView();
      if (typeof updateHUD === 'function') updateHUD();
    }

    function openSellForeignCurrencyModal(currId) {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;

      const ownedUnits = Number(state.foreignCurrencies && state.foreignCurrencies[curr.id]) || 0;
      if (ownedUnits <= 0) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const destOptions = [
        { id: 'cash', label: '💵 Dinero en Efectivo' },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Saldo: $${(a.balance || 0).toLocaleString('es-CL')})`
        }))
      ];

      const defaultDest = bankAccounts.length > 0 ? bankAccounts[0].id : 'cash';
      const defaultTotalCLP = Math.round(ownedUnits * curr.sellPrice);

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #047857; max-width: 405px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ${curr.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.92rem;">
                  Vender ${curr.name} (${curr.code})
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.66rem; color: #d1fae5; margin-top: 2px;">
                  Valor de venta: ${formatFXPriceCLP(curr.sellPrice)} por 1 ${curr.code}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px;">
                <label style="display: block; font-size: 0.62rem; font-weight: 800; color: #166534; margin-bottom: 5px;">Unidades a vender (tienes: ${formatFXUnits(ownedUnits)} ${curr.code})</label>
                <div style="display: flex; gap: 6px; margin-bottom: 5px;">
                  <input id="fx-sell-units-input" type="number" min="1" max="${ownedUnits}" step="1" value="${ownedUnits}" oninput="updateSellFXPreview('${curr.id}')" style="flex: 1; min-width: 0; padding: 7px 9px; border: 1.5px solid #047857; border-radius: 6px; font-size: 0.76rem; font-weight: 800; color: #0f172a;" />
                  <button type="button" onclick="setSellFXFullAmount('${curr.id}', ${ownedUnits})" style="padding: 7px 8px; border: 1px solid #86efac; border-radius: 6px; background: #ecfdf5; color: #047857; font-size: 0.58rem; font-weight: 800; cursor: pointer;">Todo</button>
                </div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px;">
                <label style="display: block; font-size: 0.62rem; font-weight: 800; color: #166534; margin-bottom: 5px;">Abonar en:</label>
                <select id="fx-sell-dest-select" style="width: 100%; padding: 7px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.66rem; font-weight: 700; color: #0f172a; background: #ffffff;">
                  ${destOptions.map(opt => `<option value="${opt.id}" ${opt.id === defaultDest ? 'selected' : ''}>${opt.label}</option>`).join('')}
                </select>
              </div>

              <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #166534; font-size: 0.62rem;">Total estimado a recibir:</span>
                <strong id="fx-sell-total-clp" style="color: #047857; font-size: 0.78rem;">$${defaultTotalCLP.toLocaleString('es-CL')}</strong>
              </div>

              <div id="fx-sell-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeSellForeignCurrency('${curr.id}')" style="flex: 1.3; padding: 8px; font-size: 0.72rem; font-weight: 800; background: #047857; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">Confirmar Venta</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function updateSellFXPreview(currId) {
      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;
      const inputEl = document.getElementById('fx-sell-units-input');
      const units = Math.max(0, Number(inputEl ? inputEl.value : 0));
      const totalCLP = Math.round(units * curr.sellPrice);
      const totalEl = document.getElementById('fx-sell-total-clp');
      if (totalEl) totalEl.textContent = `$${totalCLP.toLocaleString('es-CL')}`;
    }

    function setSellFXFullAmount(currId, ownedUnits) {
      const inputEl = document.getElementById('fx-sell-units-input');
      if (inputEl) {
        inputEl.value = ownedUnits;
        updateSellFXPreview(currId);
      }
    }

    function executeSellForeignCurrency(currId) {
      const curr = foreignCurrenciesCatalog.find(c => c.id === currId);
      if (!curr) return;

      const sourceSelect = document.getElementById('fx-sell-dest-select');
      const unitsInput = document.getElementById('fx-sell-units-input');
      const errorEl = document.getElementById('fx-sell-error');

      const sourceId = sourceSelect ? sourceSelect.value : 'cash';
      const units = Number(unitsInput ? unitsInput.value : 0);
      const totalCLP = Math.round(units * curr.sellPrice);

      if (!units || units <= 0 || totalCLP <= 0) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `⚠️ Ingresa una cantidad válida de ${curr.code}.`;
        }
        return;
      }

      if (sourceId === 'cash') {
        const available = Number(state.cash) || 0;
        if (totalCLP > available) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ Saldo insuficiente en Efectivo ($${available.toLocaleString('es-CL')} disponibles).`;
          }
          return;
        }
        state.cash = available + totalCLP;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === sourceId);
        if (!acc) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = '⚠️ Cuenta de abono no válida.';
          }
          return;
        }
        acc.balance = (Number(acc.balance) || 0) + totalCLP;
      }

      state.foreignCurrencies[curr.id] = (Number(state.foreignCurrencies[curr.id]) || 0) - units;

      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderMonedaExtranjeraView();
      if (typeof updateHUD === 'function') updateHUD();
    }

    function openContractOtherInvModal(itemId) {
      if (itemId === 'apv' || String(itemId).startsWith('apv_')) {
        openAPVContractWizard();
        return;
      }

      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const found = findOtherInvCatalogItem(itemId);
      if (!found) return;
      const { section, item } = found;
      const alreadyParticipating = section.id === 'fraccionada'
        && (state.otherInvestments || []).some(position => position.categoryId === section.id && position.itemTypeId === item.id);
      if (alreadyParticipating) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const cash = Number(state.cash) || 0;

      const fundingOptions = [
        { id: 'cash', label: `💵 Dinero en Efectivo (Disponible: $${cash.toLocaleString('es-CL')})`, balance: cash, name: 'Dinero en Efectivo' },
        ...bankAccounts.map(a => ({
          id: a.id,
          label: `${a.icon || '🏦'} ${a.name} (Disponible: $${(a.balance || 0).toLocaleString('es-CL')})`,
          balance: Number(a.balance) || 0,
          name: a.name
        }))
     
      ];

      const minimumAmount = Number(item.minAmount) || 5000;
      const minimumLabel = item.minimumDisplay || `$${minimumAmount.toLocaleString('es-CL')} CLP`;
      const defaultSource = fundingOptions.find(o => o.balance >= minimumAmount) || fundingOptions[0];
      const defaultAmount = minimumAmount;
      const entryFeeAmount = calculateOtherInvTransactionFee(item, defaultAmount);
      const netInvested = defaultAmount - entryFeeAmount;
      const participationRentEstimate = section.id === 'fraccionada' && item.propertyValue
        ? Math.round(item.monthlyRent * defaultAmount / item.propertyValue)
        : 0;

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #0284c7; max-width: 435px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1.5px solid rgba(255, 255, 255, 0.4); font-size: 1.2rem; width: 36px; height: 36px;">
                ${item.icon}
              </div>
              <div>
                <div class="job-modal-title" style="color: #ffffff; font-size: 0.92rem;">
                  ${section.actionLabel || 'Invertir'}: ${item.shortName}
                </div>
                <div class="job-modal-subtitle" style="font-size: 0.65rem; color: #e0f2fe; margin-top: 2px;">
                  ${item.costDisplay}
                </div>
              </div>
            </div>

            <div class="job-modal-body" style="padding: 13px 15px;">
              <!-- 1. ORIGEN DE LOS FONDOS -->
              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  1. Origen de los fondos:
                </label>
                <select id="other-inv-source-select" style="width: 100%; padding: 7px 8px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.68rem; font-weight: 700; color: #0f172a; background: #ffffff;">
                  ${fundingOptions.map(opt => `
                    <option value="${opt.id}" ${defaultSource && defaultSource.id === opt.id ? 'selected' : ''}>${opt.label}</option>
                  `).join('')}
                </select>
              </div>

              <!-- 2. MONTO A INVERTIR -->
              <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 0.64rem; font-weight: 700; color: #334155; margin-bottom: 3px;">
                  2. ${section.id === 'fraccionada' ? 'Monto de participación' : 'Monto a desembolsar en CLP'} (Mínimo ${minimumLabel}):
                </label>
                <input id="other-inv-amount-input" type="number" min="${minimumAmount}" ${item.propertyValue ? `max="${item.propertyValue}"` : ''} step="5000" value="${defaultAmount}" oninput="updateOtherInvPreview('${item.id}')" style="width: 100%; padding: 7px 9px; border: 1.5px solid #0284c7; border-radius: 6px; margin-bottom: 8px;">
              </div>

              <!-- RESUMEN DE CONDICIONES -->
              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; font-size: 0.62rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Costo de entrada / spread:</span>
                  <strong id="other-inv-preview-fee" style="color: ${entryFeeAmount > 0 ? '#b45309' : '#047857'};">
                    ${entryFeeAmount > 0 ? `-$${entryFeeAmount.toLocaleString('es-CL')} (${item.feeModel === 'chile_equity' ? 'corretaje estimado' : `${(item.entryFeePct * 100).toFixed(2)}%`})` : '$0 (Sin comisión de entrada)'}
                  </strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Capital neto inicial invertido:</span>
                  <strong id="other-inv-preview-net" style="color: #0284c7;">$${netInvested.toLocaleString('es-CL')}</strong>
                </div>
                ${section.id === 'fraccionada' ? `<div style="display:flex;justify-content:space-between;padding-top:4px;border-top:1px dashed #bfdbfe;"><span style="color:#475569;">Renta mensual estimada de tu parte:</span><strong id="other-inv-preview-rent" style="color:#0369a1;">$${participationRentEstimate.toLocaleString('es-CL')}</strong></div>` : ''}
                ${section.id === 'fraccionada' ? '' : `<div style="display: flex; justify-content: space-between; padding-top: 4px; border-top: 1px dashed #86efac;">
                  <span style="color: #475569;">Retorno esperado / Volatilidad:</span>
                  <strong style="color: #047857;">${item.volatilityDisplay}</strong>
                </div>`}
              </div>

              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 8px; margin-bottom: 9px; font-size: 0.58rem; color: #92400e; line-height: 1.32;">
                <strong>ℹ️ Condición de mercado:</strong> ${item.lockMonths > 0 ? `Este instrumento exige una permanencia mínima obligatoria de <strong>${item.lockMonths} meses</strong> sin posibilidad de rescate anticipado.` : 'El valor de liquidación es variable según las condiciones de mercado al cierre del día de venta.'}
              </div>

              <div id="other-inv-modal-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeContractOtherInv('${item.id}')" style="flex: 1.3; padding: 8px; font-size: 0.72rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  ${section.id === 'fraccionada' ? 'Confirmar participación' : 'Confirmar Operación'}
                </button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function updateOtherInvPreview(itemId) {
      const found = findOtherInvCatalogItem(itemId);
      if (!found) return;
      const { item } = found;
      const inputEl = document.getElementById('other-inv-amount-input');
      const amount = Math.max(0, Math.round(Number(inputEl ? inputEl.value : 0)));
      const fee = calculateOtherInvTransactionFee(item, amount);
      const net = Math.max(0, amount - fee);

      const feeEl = document.getElementById('other-inv-preview-fee');
      const netEl = document.getElementById('other-inv-preview-net');
      const rentEl = document.getElementById('other-inv-preview-rent');
      if (feeEl) {
        feeEl.textContent = fee > 0
          ? `-$${fee.toLocaleString('es-CL')} (${item.feeModel === 'chile_equity' ? 'corretaje estimado' : `${(item.entryFeePct * 100).toFixed(2)}%`})`
          : '$0 (Sin comisión de entrada)';
      }
      if (netEl) {
        netEl.textContent = `$${net.toLocaleString('es-CL')}`;
      }
      if (rentEl) {
        const rentEstimate = item.propertyValue ? Math.round(item.monthlyRent * amount / item.propertyValue) : 0;
        rentEl.textContent = `$${rentEstimate.toLocaleString('es-CL')}`;
      }
    }

    function consolidateInvestmentPositions(categoryId) {
      if (!['acciones', 'bonos_corp', 'bonos_estado', 'startups', 'etf'].includes(categoryId) || !Array.isArray(state.otherInvestments)) return;

      const positionsByItemId = new Map();
      const consolidatedPositions = [];
      state.otherInvestments.forEach(position => {
        if (position.categoryId !== categoryId) {
          consolidatedPositions.push(position);
          return;
        }

        const existingPosition = positionsByItemId.get(position.itemTypeId);
        if (!existingPosition) {
          positionsByItemId.set(position.itemTypeId, position);
          consolidatedPositions.push(position);
          return;
        }

        existingPosition.contributedCapital = (Number(existingPosition.contributedCapital) || 0) + (Number(position.contributedCapital) || 0);
        existingPosition.currentBalance = (Number(existingPosition.currentBalance) || 0) + (Number(position.currentBalance) || 0);
        existingPosition.monthsSimulated = Math.max(Number(existingPosition.monthsSimulated) || 0, Number(position.monthsSimulated) || 0);
      });

      state.otherInvestments = consolidatedPositions;
    }

    function executeContractOtherInv(itemId) {
      const found = findOtherInvCatalogItem(itemId);
      if (!found) return;
      const { section, item } = found;

      const sourceSelect = document.getElementById('other-inv-source-select');
      const amountInput = document.getElementById('other-inv-amount-input');
      const errorEl = document.getElementById('other-inv-modal-error');

      const sourceId = sourceSelect ? sourceSelect.value : 'cash';
      const amount = Math.round(Number(amountInput ? amountInput.value : 0));

      if (section.id === 'fraccionada' && (state.otherInvestments || []).some(position => position.categoryId === section.id && position.itemTypeId === item.id)) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = 'Ya tienes una participación activa en esta propiedad.';
        }
        return;
      }

      const minimumAmount = Number(item.minAmount) || 5000;
      const minimumLabel = item.minimumDisplay || `$${minimumAmount.toLocaleString('es-CL')} CLP`;
      if (!amount || amount < minimumAmount || (item.propertyValue && amount > item.propertyValue)) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = item.propertyValue && amount > item.propertyValue
            ? `⚠️ El monto no puede superar el valor de la propiedad ($${item.propertyValue.toLocaleString('es-CL')}).`
            : `⚠️ El monto mínimo para este instrumento es ${minimumLabel}.`;
        }
        return;
      }

      if (sourceId === 'cash') {
        const available = Number(state.cash) || 0;
        if (amount > available) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = `⚠️ Saldo insuficiente en Efectivo ($${available.toLocaleString('es-CL')} disponibles).`;
          }
          return;
        }
        state.cash = available - amount;
      } else {
        const acc = (state.bankAccounts || []).find(a => a.id === sourceId);
        if (!acc || (Number(acc.balance) || 0) < amount) {
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.textContent = '⚠️ Saldo insuficiente en la cuenta bancaria seleccionada.';
          }
          return;
        }
        acc.balance = (Number(acc.balance) || 0) - amount;
      }

      const entryFee = calculateOtherInvTransactionFee(item, amount);
      const netInitialBalance = amount - entryFee;

      if (!Array.isArray(state.otherInvestments)) state.otherInvestments = [];
      const newPosition = {
        id: 'other_inv_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        categoryId: section.id,
        itemTypeId: item.id,
        name: item.shortName,
        fullName: item.name,
        icon: item.icon,
        expectedMonthlyRate: item.expectedMonthlyRate,
        monthlyVolatility: item.monthlyVolatility,
        stateBonusMonthly: item.stateBonusMonthly || 0,
        stateBonusAccumulated: 0,
        apvRegime: item.apvRegime || null,
        exitPenaltyPct: item.exitPenaltyPct || 0,
        feeModel: item.feeModel || null,
        brokerageRate: item.brokerageRate || 0,
        minimumBrokerageFee: item.minimumBrokerageFee || 0,
        exchangeRightsFee: item.exchangeRightsFee || 0,
        feeVatRate: item.feeVatRate || 0,
        referenceCapital: item.referenceCapital || 0,
        referenceFee: item.referenceFee || 0,
        referenceTotal: item.referenceTotal || 0,
        sharePrice: item.sharePrice || null,
        referenceShares: item.referenceShares || null,
        maturityMonthsFree: item.maturityMonthsFree || 0,
        rescueDays: item.rescueDays,
        minAmount: item.minAmount,
        propertyValue: item.propertyValue || null,
        propertyLocation: item.location || null,
        durationYears: item.durationYears || null,
        appreciationPct: item.appreciationPct || null,
        monthlyRent: item.monthlyRent || null,
        lockMonths: item.lockMonths || 0,
        contributedCapital: section.id === 'acciones' ? netInitialBalance : amount,
        currentBalance: netInitialBalance,
        monthsSimulated: 0
      };
      const existingInstrumentPosition = ['acciones', 'bonos_corp', 'bonos_estado', 'startups', 'etf'].includes(section.id)
        ? state.otherInvestments.find(position => position.categoryId === section.id && position.itemTypeId === item.id)
        : null;
      if (existingInstrumentPosition) {
        existingInstrumentPosition.contributedCapital = (Number(existingInstrumentPosition.contributedCapital) || 0) + (section.id === 'acciones' ? netInitialBalance : amount);
        existingInstrumentPosition.currentBalance = (Number(existingInstrumentPosition.currentBalance) || 0) + netInitialBalance;
      } else {
        state.otherInvestments.push(newPosition);
      }

      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderOtherInvestmentCategoryView(section.id);
      if (typeof updateHUD === 'function') updateHUD();
    }

    function simulateMonthOtherInv(posId) {
      if (!Array.isArray(state.otherInvestments)) return;
      const pos = state.otherInvestments.find(p => p.id === posId);
      if (!pos) return;

      const u1 = Math.max(1e-7, Math.random());
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

      const monthlyReturn = pos.expectedMonthlyRate + (z * pos.monthlyVolatility);
      const prevBalance = pos.currentBalance;

      let marketUpdatedBalance = Math.max(0, Math.round(pos.currentBalance * (1 + monthlyReturn)));
      let bonusAdded = 0;

      if (pos.stateBonusMonthly && pos.stateBonusMonthly > 0) {
        // Tope proporcional mensual de bonificación estatal APV Régimen A (~$33.000/mes equivalente a 6 UTM/año)
               bonusAdded = Math.min(33000, Math.round(pos.contributedCapital * (pos.stateBonusMonthly / 12)));
        // Tope proporcional mensual de bonificación estatal APV Régimen A (~$33.000/mes equivalente a 6 UTM/año)
               bonusAdded = Math.min(33000, Math.round(pos.contributedCapital * (pos.stateBonusMonthly / 12)));
        pos.stateBonusAccumulated = (pos.stateBonusAccumulated || 0) + bonusAdded;
        marketUpdatedBalance += bonusAdded;
      }

      pos.currentBalance = marketUpdatedBalance;
      pos.monthsSimulated = (pos.monthsSimulated || 0) + 1;

      const delta = pos.currentBalance - prevBalance;
      const pctMonth = (monthlyReturn * 100).toFixed(2);

      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      renderOtherInvestmentCategoryView(pos.categoryId);
      if (typeof updateHUD === 'function') updateHUD();

      alertUpcomingBankFeature(
        delta >= 0 ? '📈 Evolución Mensual Positiva' : '📉 Variación Mensual Negativa',
        `En el mes #${pos.monthsSimulated}, ${pos.name} registró una variación de mercado de ${monthlyReturn >= 0 ? '+' : ''}${pctMonth}%${bonusAdded > 0 ? ` más +$${bonusAdded.toLocaleString('es-CL')} de bonificación estatal APV` : ''} (${delta >= 0 ? '+$' : '-$'}${Math.abs(delta).toLocaleString('es-CL')}). Nuevo saldo valorizado: $${pos.currentBalance.toLocaleString('es-CL')}.`
      );
    }

    function openRedeemOtherInvModal(posId, presetAmount = null, presetDestId = null) {
      if (!Array.isArray(state.otherInvestments)) return;
      const pos = state.otherInvestments.find(p => p.id === posId);
      if (!pos) return;

      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;

      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const destOptions = [{ id: 'cash', label: '💵 Dinero en Efectivo' }, ...bankAccounts.map(a => ({
        id: a.id,
        label: `${a.icon || '🏦'} ${a.name} (Saldo: $${(Number(a.balance) || 0).toLocaleString('es-CL')})`
      }))];
      const destId = presetDestId && destOptions.some(opt => opt.id === presetDestId)
        ? presetDestId
        : (bankAccounts.length ? bankAccounts[0].id : 'cash');
      const gross = Math.max(0, Math.min(Number(pos.currentBalance) || 0, Math.round(presetAmount !== null ? Number(presetAmount) : Number(pos.currentBalance))));
      const isFractionalProperty = pos.categoryId === 'fraccionada';
      const minimumPartialAmount = isFractionalProperty ? Number(pos.minAmount) || 0 : 1;
      const maximumPartialAmount = Number(pos.currentBalance) - minimumPartialAmount;
      const deduction = calculateOtherInvTransactionFee(pos, gross, 'exit');
      const net = Math.max(0, gross - deduction);
      const remaining = Math.max(0, Number(pos.currentBalance) - gross);
      const isFull = gross >= Number(pos.currentBalance);
      const destName = destId === 'cash'
        ? 'Dinero en Efectivo'
        : (bankAccounts.find(a => a.id === destId)?.name || 'Dinero en Efectivo');

      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color: #047857; max-width: 425px;">
            <div class="job-modal-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: #ffffff; padding: 12px 14px;">
              <div class="job-modal-icon-badge" style="background: rgba(255,255,255,.2); width: 36px; height: 36px; font-size: 1.2rem;">💸</div>
              <div><div class="job-modal-title" style="color:#fff;">${isFractionalProperty ? 'Solicitar retiro anticipado' : 'Vender'}: ${pos.name}</div></div>
            </div>
            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px 10px; margin-bottom:9px;">
                <label style="display:block; font-size:.62rem; font-weight:800; color:#166534; margin-bottom:5px;">${isFractionalProperty ? 'Monto a retirar' : 'Monto a vender'} (disponible: $${Number(pos.currentBalance).toLocaleString('es-CL')})</label>
                <input id="redeem-other-amount-input" type="number" min="${minimumPartialAmount}" max="${pos.currentBalance}" step="1000" value="${gross}" oninput="updateRedeemOtherInvPreview('${pos.id}')" style="width:100%; box-sizing:border-box; padding:7px 9px; border:1.5px solid #047857; border-radius:6px; font-weight:800;" />
                <button type="button" onclick="openRedeemOtherInvModal('${pos.id}', ${pos.currentBalance}, '${destId}')" style="margin-top:5px; padding:4px 8px; border:1px solid #86efac; border-radius:5px; background:#ecfdf5; color:#047857; font-size:.58rem; font-weight:800;">${isFractionalProperty ? 'Solicitar retiro total' : 'Vender todo'}</button>
                ${isFractionalProperty ? `<div style="margin-top:6px;font-size:.57rem;line-height:1.3;color:#475569;">El retiro parcial mínimo es $${minimumPartialAmount.toLocaleString('es-CL')} y debes mantener al menos esa misma suma invertida.${maximumPartialAmount < minimumPartialAmount ? ' Con el saldo actual solo puedes solicitar el retiro total.' : ''}</div>` : ''}
              </div>
              <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px 10px; margin-bottom:9px;">
                <label style="display:block; font-size:.62rem; font-weight:800; color:#166534; margin-bottom:5px;">Abonar en:</label>
                <select onchange="openRedeemOtherInvModal('${pos.id}', Number(document.getElementById('redeem-other-amount-input').value || ${pos.currentBalance}), this.value)" style="width:100%; padding:7px 8px; border:1px solid #cbd5e1; border-radius:6px;">
                  ${destOptions.map(opt => `<option value="${opt.id}" ${opt.id === destId ? 'selected' : ''}>${opt.label}</option>`).join('')}
                </select>
              </div>
              <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 10px; margin-bottom:9px; font-size:.62rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Tipo de operación:</span><strong id="redeem-other-type">${isFractionalProperty ? `Retiro ${isFull ? 'total' : 'parcial'}` : `Venta ${isFull ? 'total' : 'parcial'}`}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Comisión:</span><strong id="redeem-other-fee">$${deduction.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Monto líquido:</span><strong id="redeem-other-net">$${net.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Saldo remanente:</span><strong id="redeem-other-remaining">$${remaining.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Destino:</span><strong>${destName}</strong></div>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" onclick="closeBancoModal()" style="flex:1; padding:8px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; font-weight:700;">Cancelar</button>
                <button type="button" onclick="confirmRedeemOtherInv('${pos.id}', '${destId}')" style="flex:1.4; padding:8px; background:#047857; color:#fff; border:none; border-radius:6px; font-weight:800;">${isFractionalProperty ? 'Confirmar solicitud' : 'Confirmar Venta'}</button>
              </div>
              <div id="redeem-other-error" style="display:none;margin-top:8px;padding:7px 9px;border:1px solid #fecaca;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:.60rem;font-weight:700;"></div>
            </div>
          </div>
        </div>`;
    }

    function updateRedeemOtherInvPreview(posId) {
      const inputEl = document.getElementById('redeem-other-amount-input');
      const pos = state.otherInvestments.find(p => p.id === posId);
      if (!inputEl || !pos) return;
      const balance = Number(pos.currentBalance) || 0;
      const amount = Math.round(Number(inputEl.value) || 0);
      const gross = Math.max(0, Math.min(balance, amount));
      const fee = calculateOtherInvTransactionFee(pos, gross, 'exit');
      const isFull = gross >= balance;
      const minimumPartialAmount = pos.categoryId === 'fraccionada' ? Number(pos.minAmount) || 0 : 1;
      const errorEl = document.getElementById('redeem-other-error');
      const typeEl = document.getElementById('redeem-other-type');
      const feeEl = document.getElementById('redeem-other-fee');
      const netEl = document.getElementById('redeem-other-net');
      const remainingEl = document.getElementById('redeem-other-remaining');

      if (typeEl) typeEl.textContent = `${pos.categoryId === 'fraccionada' ? 'Retiro' : 'Venta'} ${isFull ? 'total' : 'parcial'}`;
      if (feeEl) feeEl.textContent = `$${fee.toLocaleString('es-CL')}`;
      if (netEl) netEl.textContent = `$${Math.max(0, gross - fee).toLocaleString('es-CL')}`;
      if (remainingEl) remainingEl.textContent = `$${Math.max(0, balance - gross).toLocaleString('es-CL')}`;

      if (errorEl && pos.categoryId === 'fraccionada' && amount > 0 && amount <= balance && !isFull
        && (amount < minimumPartialAmount || balance - amount < minimumPartialAmount)) {
        errorEl.style.display = 'block';
        errorEl.textContent = `El retiro parcial debe ser de al menos $${minimumPartialAmount.toLocaleString('es-CL')} y dejar al menos $${minimumPartialAmount.toLocaleString('es-CL')} invertidos.`;
      } else if (errorEl) {
        errorEl.style.display = 'none';
      }
    }

    function confirmRedeemOtherInv(posId, destId) {
      const position = (state.otherInvestments || []).find(item => item.id === posId);
      const inputEl = document.getElementById('redeem-other-amount-input');
      if (!position || !inputEl) return;
      const gross = Math.round(Number(inputEl.value) || 0);
      const fee = calculateOtherInvTransactionFee(position, gross, 'exit');
      executeRedeemOtherInv(posId, gross, Math.max(0, gross - fee), destId);
    }

    function executeRedeemOtherInv(posId, grossAmount, netAmount, destId) {
      if (!Array.isArray(state.otherInvestments)) {
        return;
      }
      const idx = state.otherInvestments.findIndex(p => p.id === posId);
      if (idx < 0) return;
      const pos = state.otherInvestments[idx];
      const gross = Math.round(Number(grossAmount) || 0);
      const net = Math.round(Number(netAmount) || 0);
      const balance = Number(pos.currentBalance) || 0;
      const isFull = gross >= balance;
      const minimumPartialAmount = pos.categoryId === 'fraccionada' ? Number(pos.minAmount) || 0 : 1;
      const errorEl = document.getElementById('redeem-other-error');
      if (gross <= 0 || gross > Number(pos.currentBalance)) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = 'Ingresa un monto válido para el retiro.';
        }
        return;
      }
      if (pos.categoryId === 'fraccionada' && !isFull
        && (gross < minimumPartialAmount || balance - gross < minimumPartialAmount)) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `El retiro parcial debe ser de al menos $${minimumPartialAmount.toLocaleString('es-CL')} y dejar al menos $${minimumPartialAmount.toLocaleString('es-CL')} invertidos. Para retirar un saldo menor, solicita el retiro total.`;
        }
        return;
      }

      closeBancoModal();
      window.redeemOtherInvExecuting = true;

      if (destId === 'cash') {
        state.cash = (Number(state.cash) || 0) + net;
      } else {
        const account = (state.bankAccounts || []).find(a => a.id === destId);
        if (account) account.balance = (Number(account.balance) || 0) + net;
        else state.cash = (Number(state.cash) || 0) + net;
      }

      if (isFull) {
        state.otherInvestments.splice(idx, 1);
      } else {
        const fraction = gross / Number(pos.currentBalance);
        pos.contributedCapital = Math.max(0, Math.round(Number(pos.contributedCapital) * (1 - fraction)));
        pos.currentBalance = Math.max(0, Math.round(Number(pos.currentBalance) - gross));
      }

      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      renderOtherInvestmentCategoryView(pos.categoryId);
      if (typeof updateHUD === 'function') updateHUD();
      window.redeemOtherInvExecuting = false;
    }

    function openAPVContractWizard() {
      ensureAPVAccount();
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;
      modalRoot.innerHTML = `
        <div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()">
          <div class="job-modal-card" style="border-color:#0284c7; max-width:455px;">
            <div class="job-modal-header" style="background:#0284c7; color:#fff; padding:12px 14px;">
              <div class="job-modal-title" style="color:#fff;">Contratar APV</div>
            </div>
            <div class="job-modal-body" style="padding:13px 15px;">
              <div style="font-size:.64rem; font-weight:800; color:#334155; margin-bottom:6px;">Régimen tributario</div>
              <div style="display:grid;gap:5px;margin-bottom:10px;">
                <label style="display:flex;align-items:flex-start;gap:6px;border:1px solid #cbd5e1;border-radius:7px;padding:8px;font-size:.62rem;"><input type="radio" name="apv-contract-regime" value="A" checked><span><strong>Régimen A</strong> — Bonificación fiscal del Estado</span></label>
                <label style="display:flex;align-items:flex-start;gap:6px;border:1px solid #cbd5e1;border-radius:7px;padding:8px;font-size:.62rem;"><input type="radio" name="apv-contract-regime" value="B"><span><strong>Régimen B</strong> — Rebaja tributaria según renta</span></label>
              </div>
              <div style="font-size:.64rem;font-weight:800;color:#334155;margin-bottom:6px;">Multifondo inicial</div>
              <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin-bottom:10px;">
                ${['Más riesgoso','Riesgoso','Moderado','Conservador','Más conservador'].map((label, i) => { const fund = String.fromCharCode(65 + i); return `<label style="display:flex;align-items:center;gap:5px;border:1px solid #cbd5e1;border-radius:7px;padding:7px;font-size:.60rem;"><input type="radio" name="apv-contract-fund" value="${fund}" ${fund === 'C' ? 'checked' : ''}><span>Fondo ${fund} — ${label}</span></label>`; }).join('')}
              </div>
              <div style="display:flex; gap:8px; margin-top:12px;"><button type="button" onclick="closeBancoModal()" style="flex:1; padding:8px; border:1px solid #cbd5e1; border-radius:6px;">Cancelar</button><button type="button" onclick="executeAPVContract()" style="flex:1.3; padding:8px; border:none; border-radius:6px; background:#047857; color:#fff; font-weight:800;">Contratar APV</button></div>
            </div>
          </div>
        </div>`;
    }

    function executeAPVContract() {
      const regime = document.querySelector('input[name="apv-contract-regime"]:checked')?.value || 'A';
      const fund = document.querySelector('input[name="apv-contract-fund"]:checked')?.value || 'C';
      state.apvAccount = {
        id: 'apv_' + Date.now(), regime, fund, balance: 0, contributedCapital: 0,
        monthlyContribution: 0, monthlyActive: false, debitAccountId: null, monthlySource: null
      };
      closeBancoModal();
      renderOtherInvestmentCategoryView('apv');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function ensureAPVAccount() {
      if (!state.apvAccount) state.apvAccount = null;
    }

    function openAPVManagementModal(action = 'cancel') {
      if (!state.apvAccount || action !== 'cancel') return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;
      modalRoot.innerHTML = `<div class="job-modal-backdrop"><div class="job-modal-card" style="max-width:420px;"><div class="job-modal-header" style="background:#b91c1c;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Cancelar APV</div></div><div class="job-modal-body" style="padding:13px 15px;"><div style="font-size:.64rem;color:#475569;margin-bottom:12px;">Se cancelará la cuenta APV y se detendrá cualquier aporte mensual.</div><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('apv')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Volver</button><button onclick="cancelAPV()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#b91c1c;color:#fff;font-weight:800;">Confirmar cancelación</button></div></div></div></div>`;
    }

    function openAPVChoiceModal(type) {
      const apv = state.apvAccount;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!apv || !modalRoot || (type !== 'regime' && type !== 'fund')) return;
      const isRegime = type === 'regime';
      const choices = isRegime
        ? [{ value: 'A', label: 'Régimen A — Bonificación fiscal' }, { value: 'B', label: 'Régimen B — Rebaja tributaria' }]
        : ['Más riesgoso', 'Riesgoso', 'Moderado', 'Conservador', 'Más conservador'].map((label, index) => {
          const value = String.fromCharCode(65 + index);
          return { value, label: `Fondo ${value} — ${label}` };
        });
      const currentValue = isRegime ? apv.regime : apv.fund;
      const radioName = isRegime ? 'apv-choice-regime' : 'apv-choice-fund';
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:420px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Cambiar ${isRegime ? 'régimen' : 'multifondo'}</div></div><div class="job-modal-body" style="padding:13px 15px;"><div style="font-size:.64rem;font-weight:800;margin-bottom:6px;">${isRegime ? 'Régimen tributario' : 'Multifondo'}</div><div style="display:grid;gap:5px;margin-bottom:12px;">${choices.map(choice => `<label style="display:flex;align-items:center;gap:6px;border:1px solid #cbd5e1;border-radius:7px;padding:8px;font-size:.62rem;"><input type="radio" name="${radioName}" value="${choice.value}" ${choice.value === currentValue ? 'checked' : ''}><span>${choice.label}</span></label>`).join('')}</div><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('apv')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="applyAPVChoice('${type}')" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#047857;color:#fff;font-weight:800;">Guardar</button></div></div></div></div>`;
    }

    function applyAPVChoice(type) {
      const radioName = type === 'regime' ? 'apv-choice-regime' : 'apv-choice-fund';
      const value = document.querySelector(`input[name="${radioName}"]:checked`)?.value;
      if (!state.apvAccount || !value) return;
      if (type === 'regime') state.apvAccount.regime = value;
      else if (type === 'fund') state.apvAccount.fund = value;
      closeBancoModal();
      renderOtherInvestmentCategoryView('apv');
    }

    function openAPVIndividualContributionModal() {
      const apv = state.apvAccount;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!apv || !modalRoot) return;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const sourceOptions = [`<option value="cash">Efectivo disponible ($${(Number(state.cash) || 0).toLocaleString('es-CL')})</option>`, ...bankAccounts.map(account => `<option value="${account.id}">${account.icon || '🏦'} ${account.name} ($${(Number(account.balance) || 0).toLocaleString('es-CL')})</option>`)].join('');
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:420px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Aporte individual APV</div></div><div class="job-modal-body" style="padding:13px 15px;"><label for="apv-individual-amount" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Monto (mínimo $10.000)</label><input id="apv-individual-amount" type="number" min="10000" step="1000" value="10000" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:10px;"><label for="apv-individual-source" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Cuenta de cargo</label><select id="apv-individual-source" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:12px;">${sourceOptions}</select><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('apv')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="contributeAPV()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#047857;color:#fff;font-weight:800;">Aportar</button></div></div></div></div>`;
    }

    function contributeAPV() {
      const apv = state.apvAccount;
      const amount = Math.round(Number(document.getElementById('apv-individual-amount')?.value || 0));
      const sourceId = document.getElementById('apv-individual-source')?.value || 'cash';
      if (!apv || amount < 10000) return;
      if (sourceId === 'cash') {
        if (amount > (Number(state.cash) || 0)) return;
        state.cash -= amount;
      } else {
        const account = (state.bankAccounts || []).find(item => item.id === sourceId);
        if (!account || amount > (Number(account.balance) || 0)) return;
        account.balance -= amount;
      }
      apv.balance = (Number(apv.balance) || 0) + amount;
      apv.contributedCapital = (Number(apv.contributedCapital) || 0) + amount;
      closeBancoModal();
      renderOtherInvestmentCategoryView('apv');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function openAPVMonthlyManagementModal() {
      const apv = state.apvAccount;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!apv || !modalRoot) return;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const hasSavedAccount = bankAccounts.some(account => account.id === apv.debitAccountId);
      const accountOptions = bankAccounts.length
        ? bankAccounts.map(account => `<option value="${account.id}" ${apv.debitAccountId === account.id ? 'selected' : ''}>${account.icon || '🏦'} ${account.name}</option>`).join('')
        : '<option value="">No tienes cuentas bancarias</option>';
      const activeDisabled = bankAccounts.length || apv.monthlyActive ? '' : 'disabled';
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:430px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Administrar aporte mensual</div></div><div class="job-modal-body" style="padding:13px 15px;"><label for="apv-monthly-status" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Estado del aporte</label><select id="apv-monthly-status" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:10px;"><option value="stopped" ${apv.monthlyActive ? '' : 'selected'}>Detenido</option><option value="active" ${apv.monthlyActive ? 'selected' : ''} ${activeDisabled}>Activo</option></select><label for="apv-monthly-amount" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Monto mensual (mínimo $10.000)</label><input id="apv-monthly-amount" type="number" min="10000" step="1000" value="${Number(apv.monthlyContribution || 10000)}" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:10px;"><label for="apv-monthly-account" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Cuenta de cargo</label><select id="apv-monthly-account" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:8px;">${accountOptions}</select>${bankAccounts.length ? '' : '<div style="font-size:.58rem;color:#b45309;margin-bottom:10px;">Para activar el aporte mensual necesitas una cuenta bancaria.</div>'}<div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('apv')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="saveAPVMonthlyContribution()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#0284c7;color:#fff;font-weight:800;">Guardar</button></div></div></div></div>`;
      const statusSelect = document.getElementById('apv-monthly-status');
      statusSelect?.previousElementSibling?.remove();
      statusSelect?.remove();
      const saveButton = modalRoot.querySelector('button[onclick="saveAPVMonthlyContribution()"]');
      if (saveButton) {
        saveButton.disabled = bankAccounts.length === 0;
        saveButton.style.opacity = saveButton.disabled ? '0.55' : '1';
        saveButton.style.cursor = saveButton.disabled ? 'not-allowed' : 'pointer';
      }
      if (apv.monthlyActive) {
        saveButton?.parentElement?.insertAdjacentHTML('afterend', '<div style="margin-top:8px;"><button type="button" onclick="stopAPVMonthlyContribution()" style="width:100%;padding:8px;border:1px solid #b91c1c;border-radius:6px;background:#fff;color:#b91c1c;font-weight:800;">Detener aporte mensual</button></div>');
      }
    }

    function saveAPVMonthlyContribution() {
      const apv = state.apvAccount;
      if (!apv) return;
      const amount = Math.round(Number(document.getElementById('apv-monthly-amount')?.value || 0));
      const accountId = document.getElementById('apv-monthly-account')?.value;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      if (amount < 10000 || !bankAccounts.some(account => account.id === accountId)) return;
      apv.monthlyActive = true;
      apv.monthlyContribution = amount;
      apv.debitAccountId = accountId;
      apv.monthlySource = accountId;
      closeBancoModal();
      renderOtherInvestmentCategoryView('apv');
    }

    function stopAPVMonthlyContribution() {
      const apv = state.apvAccount;
      if (!apv) return;
      apv.monthlyActive = false;
      apv.monthlyContribution = 0;
      apv.debitAccountId = null;
      apv.monthlySource = null;
      closeBancoModal();
      renderOtherInvestmentCategoryView('apv');
    }

    function toggleAPVMonthlyContribution() {
      openAPVMonthlyManagementModal();
    }

    function cancelAPV(){ state.apvAccount=null; closeBancoModal(); renderOtherInvestmentCategoryView('apv'); }

    function openCuenta2ContractWizard() {
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;
      const fundLabels = ['Más riesgoso', 'Riesgoso', 'Moderado', 'Conservador', 'Más conservador'];
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:455px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Contratar Cuenta 2 AFP</div></div><div class="job-modal-body" style="padding:13px 15px;"><div style="font-size:.64rem;font-weight:800;color:#334155;margin-bottom:6px;">Selecciona el multifondo</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin-bottom:12px;">${fundLabels.map((label, index) => { const fund = String.fromCharCode(65 + index); return `<label style="display:flex;align-items:center;gap:5px;border:1px solid #cbd5e1;border-radius:7px;padding:7px;font-size:.60rem;"><input type="radio" name="cuenta2-contract-fund" value="${fund}" ${fund === 'C' ? 'checked' : ''}><span>Fondo ${fund} — ${label}</span></label>`; }).join('')}</div><div style="display:flex;gap:8px;"><button onclick="closeBancoModal()" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="executeCuenta2Contract()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#047857;color:#fff;font-weight:800;">Contratar Cuenta 2</button></div></div></div></div>`;
    }

    function executeCuenta2Contract() {
      const fund = document.querySelector('input[name="cuenta2-contract-fund"]:checked')?.value || 'C';
      state.cuenta2Account = {
        id: 'cuenta2_' + Date.now(), fund, balance: 0, contributedCapital: 0,
        monthlyContribution: 0, monthlyActive: false, debitAccountId: null, monthlySource: null
      };
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function openCuenta2FundChoiceModal() {
      const account = state.cuenta2Account;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!account || !modalRoot) return;
      const fundLabels = ['Más riesgoso', 'Riesgoso', 'Moderado', 'Conservador', 'Más conservador'];
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:420px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Cambiar multifondo</div></div><div class="job-modal-body" style="padding:13px 15px;"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin-bottom:12px;">${fundLabels.map((label, index) => { const fund = String.fromCharCode(65 + index); return `<label style="display:flex;align-items:center;gap:5px;border:1px solid #cbd5e1;border-radius:7px;padding:7px;font-size:.60rem;"><input type="radio" name="cuenta2-change-fund" value="${fund}" ${fund === account.fund ? 'checked' : ''}><span>Fondo ${fund} — ${label}</span></label>`; }).join('')}</div><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('cuenta2')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="applyCuenta2FundChoice()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#047857;color:#fff;font-weight:800;">Guardar</button></div></div></div></div>`;
    }

    function applyCuenta2FundChoice() {
      const fund = document.querySelector('input[name="cuenta2-change-fund"]:checked')?.value;
      if (!state.cuenta2Account || !fund) return;
      state.cuenta2Account.fund = fund;
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
    }

    function openCuenta2IndividualContributionModal() {
      const account = state.cuenta2Account;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!account || !modalRoot) return;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const sourceOptions = [`<option value="cash">Efectivo disponible ($${(Number(state.cash) || 0).toLocaleString('es-CL')})</option>`, ...bankAccounts.map(bank => `<option value="${bank.id}">${bank.icon || '🏦'} ${bank.name} ($${(Number(bank.balance) || 0).toLocaleString('es-CL')})</option>`)].join('');
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:420px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Aporte individual Cuenta 2</div></div><div class="job-modal-body" style="padding:13px 15px;"><label for="cuenta2-individual-amount" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Monto (mínimo $5.000)</label><input id="cuenta2-individual-amount" type="number" min="5000" step="1000" value="5000" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:10px;"><label for="cuenta2-individual-source" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Cuenta de cargo</label><select id="cuenta2-individual-source" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:12px;">${sourceOptions}</select><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('cuenta2')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button onclick="contributeCuenta2()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#047857;color:#fff;font-weight:800;">Aportar</button></div></div></div></div>`;
    }

    function contributeCuenta2() {
      const account = state.cuenta2Account;
      const amount = Math.round(Number(document.getElementById('cuenta2-individual-amount')?.value || 0));
      const sourceId = document.getElementById('cuenta2-individual-source')?.value || 'cash';
      if (!account || amount < 5000) return;
      if (sourceId === 'cash') {
        if (amount > (Number(state.cash) || 0)) return;
        state.cash -= amount;
      } else {
        const bank = (state.bankAccounts || []).find(item => item.id === sourceId);
        if (!bank || amount > (Number(bank.balance) || 0)) return;
        bank.balance -= amount;
      }
      account.balance = (Number(account.balance) || 0) + amount;
      account.contributedCapital = (Number(account.contributedCapital) || 0) + amount;
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function openCuenta2MonthlyManagementModal() {
      const account = state.cuenta2Account;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!account || !modalRoot) return;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      const accountOptions = bankAccounts.length
        ? bankAccounts.map(bank => `<option value="${bank.id}" ${account.debitAccountId === bank.id ? 'selected' : ''}>${bank.icon || '🏦'} ${bank.name}</option>`).join('')
        : '<option value="">No tienes cuentas bancarias</option>';
      modalRoot.innerHTML = `<div class="job-modal-backdrop" onclick="if(event.target === this) closeBancoModal()"><div class="job-modal-card" style="max-width:430px;border-color:#0284c7;"><div class="job-modal-header" style="background:#0284c7;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Administrar aporte mensual</div></div><div class="job-modal-body" style="padding:13px 15px;"><label for="cuenta2-monthly-amount" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Monto mensual (mínimo $5.000)</label><input id="cuenta2-monthly-amount" type="number" min="5000" step="1000" value="${Number(account.monthlyContribution || 5000)}" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:10px;"><label for="cuenta2-monthly-account" style="display:block;font-size:.64rem;font-weight:800;margin-bottom:4px;">Cuenta de cargo</label><select id="cuenta2-monthly-account" style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #cbd5e1;border-radius:6px;margin-bottom:8px;">${accountOptions}</select>${bankAccounts.length ? '' : '<div style="font-size:.58rem;color:#b45309;margin-bottom:10px;">Para activar el aporte mensual necesitas una cuenta bancaria.</div>'}<div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('cuenta2')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Cancelar</button><button id="cuenta2-monthly-save" onclick="saveCuenta2MonthlyContribution()" ${bankAccounts.length ? '' : 'disabled'} style="flex:1.3;padding:8px;border:none;border-radius:6px;background:${bankAccounts.length ? '#0284c7' : '#94a3b8'};color:#fff;font-weight:800;cursor:${bankAccounts.length ? 'pointer' : 'not-allowed'};">Guardar</button></div>${account.monthlyActive ? '<div style="margin-top:8px;"><button type="button" onclick="stopCuenta2MonthlyContribution()" style="width:100%;padding:8px;border:1px solid #b91c1c;border-radius:6px;background:#fff;color:#b91c1c;font-weight:800;">Detener aporte mensual</button></div>' : ''}</div></div></div>`;
    }

    function saveCuenta2MonthlyContribution() {
      const account = state.cuenta2Account;
      const amount = Math.round(Number(document.getElementById('cuenta2-monthly-amount')?.value || 0));
      const bankId = document.getElementById('cuenta2-monthly-account')?.value;
      const bankAccounts = Array.isArray(state.bankAccounts) ? state.bankAccounts : [];
      if (!account || amount < 5000 || !bankAccounts.some(bank => bank.id === bankId)) return;
      account.monthlyActive = true;
      account.monthlyContribution = amount;
      account.debitAccountId = bankId;
      account.monthlySource = bankId;
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
    }

    function stopCuenta2MonthlyContribution() {
      const account = state.cuenta2Account;
      if (!account) return;
      account.monthlyActive = false;
      account.monthlyContribution = 0;
      account.debitAccountId = null;
      account.monthlySource = null;
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
    }

    function openCuenta2CancelModal() {
      if (!state.cuenta2Account) return;
      const modalRoot = document.getElementById('banco-modal-root');
      if (!modalRoot) return;
      modalRoot.innerHTML = `<div class="job-modal-backdrop"><div class="job-modal-card" style="max-width:420px;"><div class="job-modal-header" style="background:#b91c1c;color:#fff;padding:12px 14px;"><div class="job-modal-title" style="color:#fff;">Cancelar Cuenta 2</div></div><div class="job-modal-body" style="padding:13px 15px;"><div style="font-size:.64rem;color:#475569;margin-bottom:12px;">Se cancelará la Cuenta 2 y se detendrá cualquier aporte mensual.</div><div style="display:flex;gap:8px;"><button onclick="closeBancoModal(); renderOtherInvestmentCategoryView('cuenta2')" style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">Volver</button><button onclick="cancelCuenta2()" style="flex:1.3;padding:8px;border:none;border-radius:6px;background:#b91c1c;color:#fff;font-weight:800;">Confirmar cancelación</button></div></div></div></div>`;
    }

    function cancelCuenta2() {
      state.cuenta2Account = null;
      if (typeof syncInvestedTotal === 'function') syncInvestedTotal();
      closeBancoModal();
      renderOtherInvestmentCategoryView('cuenta2');
      if (typeof updateHUD === 'function') updateHUD();
    }

    function renderOtherInvestmentCategoryView(categoryId) {
      const container = document.getElementById('hub-stage-sections');
      if (!container) return;

      const sec = otrasInversionesCatalog[categoryId];
      if (!sec) return;
      if (categoryId === 'billeteras') {
        renderDigitalWalletView();
        return;
      }
      if (!Array.isArray(state.otherInvestments)) state.otherInvestments = [];
      consolidateInvestmentPositions(categoryId);

      const positions = state.otherInvestments.filter(inv => inv.categoryId === categoryId);
      const apvContract = sec.id === 'apv' ? state.apvAccount : null;
      const cuenta2Contract = sec.id === 'cuenta2' ? state.cuenta2Account : null;
      const apvMonthlyLabel = apvContract && apvContract.monthlyActive
        ? '$' + Number(apvContract.monthlyContribution || 0).toLocaleString('es-CL')
        : 'Detenido';
      const cuenta2MonthlyLabel = cuenta2Contract && cuenta2Contract.monthlyActive
        ? '$' + Number(cuenta2Contract.monthlyContribution || 0).toLocaleString('es-CL')
        : 'Detenido';
      const apvView = sec.id === 'apv' ? (apvContract ? `
          <div style="background:#fff; border:1.5px solid #cbd5e1; border-radius:9px; padding:12px; margin-bottom:10px;">
            <div style="font-size:.72rem; font-weight:800; color:#0f172a; margin-bottom:8px;">Mi APV contratado</div>
            <div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; font-size:.62rem;">
              <div style="background:#f8fafc; border-radius:7px; padding:8px;"><span style="color:#64748b;">Saldo APV</span><br/><strong style="font-size:.78rem; color:#0284c7;">$${Number(apvContract.balance || 0).toLocaleString('es-CL')}</strong></div>
              <div style="background:#f8fafc; border-radius:7px; padding:8px;"><span style="color:#64748b;">Régimen</span><br/><strong>Régimen ${apvContract.regime}</strong></div>
              <div style="background:#f8fafc; border-radius:7px; padding:8px;"><span style="color:#64748b;">Multifondo</span><br/><strong>Fondo ${apvContract.fund}</strong></div>
              <div style="background:#f8fafc; border-radius:7px; padding:8px;"><span style="color:#64748b;">Aporte mensual</span><br/><strong>${apvMonthlyLabel}</strong></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:10px;">
              <button onclick="openAPVChoiceModal('regime')" style="padding:8px 6px;border:none;border-radius:6px;background:#0284c7;color:#fff;font-size:.60rem;font-weight:800;">Cambiar régimen</button>
              <button onclick="openAPVChoiceModal('fund')" style="padding:8px 6px;border:none;border-radius:6px;background:#0284c7;color:#fff;font-size:.60rem;font-weight:800;">Cambiar multifondo</button>
              <button onclick="openAPVIndividualContributionModal()" style="padding:8px 6px;border:none;border-radius:6px;background:#047857;color:#fff;font-size:.60rem;font-weight:800;">Hacer aporte individual</button>
              <button onclick="openAPVMonthlyManagementModal()" style="padding:8px 6px;border:none;border-radius:6px;background:#0369a1;color:#fff;font-size:.60rem;font-weight:800;">Administrar aporte mensual</button>
              <button onclick="openAPVManagementModal('cancel')" style="grid-column:1/-1;padding:8px;border:1px solid #b91c1c;border-radius:6px;background:#fff;color:#b91c1c;font-size:.60rem;font-weight:800;">Cancelar APV</button>
            </div>
          </div>` : `
          <div style="background:#fff; border:1.5px solid #cbd5e1; border-radius:9px; padding:12px; margin-bottom:10px;">
            <div style="font-size:.64rem; color:#475569; margin-bottom:10px;">${sec.ruleNote}</div>
            <button onclick="openAPVContractWizard()" style="width:100%; padding:9px; border:none; border-radius:6px; background:#0284c7; color:#fff; font-weight:800;">Contratar APV</button>
          </div>`) : '';
      const cuenta2View = sec.id === 'cuenta2' ? (cuenta2Contract ? `
          <div style="background:#fff;border:1.5px solid #cbd5e1;border-radius:9px;padding:12px;margin-bottom:10px;">
            <div style="font-size:.72rem;font-weight:800;color:#0f172a;margin-bottom:8px;">Mi Cuenta 2 contratada</div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;font-size:.62rem;">
              <div style="background:#f8fafc;border-radius:7px;padding:8px;"><span style="color:#64748b;">Saldo Cuenta 2</span><br/><strong style="font-size:.78rem;color:#0284c7;">$${Number(cuenta2Contract.balance || 0).toLocaleString('es-CL')}</strong></div>
              <div style="background:#f8fafc;border-radius:7px;padding:8px;"><span style="color:#64748b;">Multifondo</span><br/><strong>Fondo ${cuenta2Contract.fund}</strong></div>
              <div style="background:#f8fafc;border-radius:7px;padding:8px;grid-column:1/-1;"><span style="color:#64748b;">Aporte mensual</span><br/><strong>${cuenta2MonthlyLabel}</strong></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-top:10px;">
              <button onclick="openCuenta2FundChoiceModal()" style="padding:8px 6px;border:none;border-radius:6px;background:#0284c7;color:#fff;font-size:.60rem;font-weight:800;">Cambiar multifondo</button>
              <button onclick="openCuenta2IndividualContributionModal()" style="padding:8px 6px;border:none;border-radius:6px;background:#047857;color:#fff;font-size:.60rem;font-weight:800;">Hacer aporte individual</button>
              <button onclick="openCuenta2MonthlyManagementModal()" style="grid-column:1/-1;padding:8px 6px;border:none;border-radius:6px;background:#0369a1;color:#fff;font-size:.60rem;font-weight:800;">Administrar aporte mensual</button>
              <button onclick="openCuenta2CancelModal()" style="grid-column:1/-1;padding:8px;border:1px solid #b91c1c;border-radius:6px;background:#fff;color:#b91c1c;font-size:.60rem;font-weight:800;">Cancelar Cuenta 2</button>
            </div>
          </div>` : `
          <div style="background:#fff;border:1.5px solid #cbd5e1;border-radius:9px;padding:12px;margin-bottom:10px;">
            <div style="font-size:.64rem;color:#475569;margin-bottom:10px;">${sec.ruleNote}</div>
            <button onclick="openCuenta2ContractWizard()" style="width:100%;padding:9px;border:none;border-radius:6px;background:#0284c7;color:#fff;font-weight:800;">Contratar Cuenta 2</button>
          </div>`) : '';

      container.innerHTML = `
        <div class="personal-subview-box">
          <div class="personal-subview-top">
            <span style="font-size:.86rem; font-weight:800; color:#0284c7;">${sec.title}</span>
            <button type="button" class="personal-subview-back-btn" onclick="renderInversionesStage('main')"><span>◀ Volver</span></button>
          </div>

          ${apvView}
          ${cuenta2View}

          ${sec.id === 'apv' || sec.id === 'cuenta2' || sec.id === 'fraccionada' ? '' : `
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:7px 10px; margin-bottom:8px; font-size:.61rem; color:#475569;">${sec.ruleNote}</div>`}

          ${sec.id === 'apv' || sec.id === 'cuenta2' ? '' : `
          <div style="${['cripto', 'fraccionada', 'bonos_corp', 'bonos_estado', 'startups', 'etf', 'acciones'].includes(sec.id) ? 'display:grid; grid-template-columns:repeat(2,minmax(0,1fr));' : 'display:flex; flex-direction:column;'} gap:6px; margin-bottom:10px;">
            ${sec.items.map(item => {
              const ownedPositions = ['cripto', 'acciones', 'bonos_corp', 'bonos_estado', 'startups', 'etf'].includes(sec.id)
                ? positions.filter(pos => pos.itemTypeId === item.id)
                : [];
              const ownedBalance = ownedPositions.reduce((sum, pos) => sum + (Number(pos.currentBalance) || 0), 0);
              const sellPosition = ownedPositions[0];
              const propertyPositions = sec.id === 'fraccionada' ? positions.filter(pos => pos.itemTypeId === item.id) : [];
              const propertyContribution = propertyPositions.reduce((sum, pos) => sum + (Number(pos.contributedCapital) || 0), 0);
              const propertyShare = item.propertyValue ? (propertyContribution / item.propertyValue) * 100 : 0;
              const monthlyRentEstimate = item.propertyValue ? Math.round((item.monthlyRent * propertyContribution) / item.propertyValue) : 0;
              const projectedPropertySale = item.propertyValue * Math.pow(1 + item.appreciationPct / 100, item.durationYears);
              const projectedShareSale = Math.round(projectedPropertySale * propertyShare / 100);
              if (sec.id === 'fraccionada') {
                const isParticipating = propertyPositions.length > 0;
                const elapsedMonths = Number(propertyPositions[0]?.monthsSimulated) || 0;
                const elapsedYears = Math.floor(elapsedMonths / 12);
                const remainingMonths = elapsedMonths % 12;
                const elapsedLabel = [
                  elapsedYears ? `${elapsedYears} ${elapsedYears === 1 ? 'año' : 'años'}` : '',
                  remainingMonths ? `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}` : ''
                ].filter(Boolean).join(' ') || '0 meses';
                return `
                  <div style="background:#fff; border:1.5px solid ${isParticipating ? '#86efac' : '#cbd5e1'}; border-radius:8px; padding:6px; display:flex; flex-direction:column; gap:4px; min-width:0;">
                    <div style="display:flex; align-items:center; gap:4px; font-size:.65rem; font-weight:800; color:#0f172a; min-height:28px;">
                      <span>${item.icon}</span><span>${item.name}</span>
                    </div>
                    ${isParticipating ? `
                      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
                        <div style="background:#f0fdf4;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Tu participación</div><strong style="display:block;font-size:.68rem;line-height:1.05;color:#047857;">${propertyShare.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}%</strong></div>
                        <div style="background:#f0fdf4;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Monto de participación</div><strong style="display:block;font-size:.62rem;line-height:1.05;color:#047857;">$${propertyContribution.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#f8fafc;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Valor original de compra</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0f172a;">$${item.propertyValue.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#eff6ff;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Proyección de venta al plazo</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0369a1;">$${Math.round(projectedPropertySale).toLocaleString('es-CL')}</strong></div>
                        <div style="background:#eff6ff;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Renta mensual estimada (tu parte)</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0369a1;">$${monthlyRentEstimate.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#eff6ff;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Proyección estimada de tu parte</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0369a1;">$${projectedShareSale.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#f8fafc;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Plazo total</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0f172a;">${item.durationYears} años</strong></div>
                        <div style="background:#f8fafc;border-radius:5px;padding:2px 4px;"><div style="font-size:.47rem;line-height:1;color:#64748b;margin-bottom:1px;">Plazo transcurrido</div><strong style="display:block;font-size:.59rem;line-height:1.05;color:#0f172a;">${elapsedLabel}</strong></div>
                      </div>
                      <div style="font-size:.49rem;color:#475569;line-height:1.2;">${item.desc}</div>
                      <button type="button" onclick="openRedeemOtherInvModal('${propertyPositions[0].id}')" style="width:100%;margin-top:2px;padding:5px 7px;font-size:.57rem;font-weight:800;background:#fff;color:#047857;border:1px solid #047857;border-radius:6px;">Solicitar retiro anticipado</button>
                    ` : `
                      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
                        <div style="background:#f8fafc;border-radius:4px;padding:2px 3px;"><div style="font-size:.44rem;line-height:1;color:#64748b;margin-bottom:1px;">Valor propiedad</div><strong style="display:block;font-size:.53rem;line-height:1.05;color:#0f172a;">$${item.propertyValue.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#f8fafc;border-radius:4px;padding:2px 3px;"><div style="font-size:.44rem;line-height:1;color:#64748b;margin-bottom:1px;">Aporte mínimo</div><strong style="display:block;font-size:.53rem;line-height:1.05;color:#0f172a;">$${item.minAmount.toLocaleString('es-CL')}</strong></div>
                        <div style="background:#f8fafc;border-radius:4px;padding:2px 3px;"><div style="font-size:.44rem;line-height:1;color:#64748b;margin-bottom:1px;">Plazo estimado</div><strong style="display:block;font-size:.53rem;line-height:1.05;color:#0f172a;">${item.durationYears} años</strong></div>
                        <div style="background:#f8fafc;border-radius:4px;padding:2px 3px;"><div style="font-size:.44rem;line-height:1;color:#64748b;margin-bottom:1px;">Plusvalía esperada</div><strong style="display:block;font-size:.53rem;line-height:1.05;color:#0f172a;">≈ ${item.appreciationPct}% anual</strong></div>
                        <div style="grid-column:1/-1;background:#f8fafc;border-radius:4px;padding:2px 3px;"><div style="font-size:.44rem;line-height:1;color:#64748b;margin-bottom:1px;">Arriendo mensual de la propiedad</div><strong style="display:block;font-size:.53rem;line-height:1.05;color:#0f172a;">$${item.monthlyRent.toLocaleString('es-CL')} estimado</strong></div>
                      </div>
                      <div style="font-size:.49rem;color:#475569;line-height:1.2;">${item.desc}</div>
                      <button type="button" onclick="openContractOtherInvModal('${item.id}')" style="width:100%;margin-top:auto;padding:5px 7px;font-size:.59rem;font-weight:800;background:#0284c7;color:#fff;border:none;border-radius:6px;">Participar</button>
                    `}
                  </div>`;
              }
              return `
                <div style="background:#fff; border:1.5px solid #cbd5e1; border-radius:8px; padding:8px 10px; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:.72rem; font-weight:800; color:#0f172a;">
                    ${sec.id === 'cripto' ? `<span>${item.name}</span><span>${item.icon}</span>` : `<span>${item.icon} ${item.name}</span>`}
                  </div>
                  ${sec.id === 'cripto' ? '' : `<div style="font-size:.59rem; font-weight:700; color:#047857;">${item.rateDisplay} · Volatilidad: ${item.volatilityDisplay}</div>`}
                  <div style="font-size:.57rem; font-weight:600; color:#475569;">${item.costDisplay} · Mínimo ${item.minimumDisplay || `$${item.minAmount.toLocaleString('es-CL')}`}</div>
                  <div style="font-size:.60rem; color:#64748b; line-height:1.3;">${item.desc}</div>
                  ${sec.id === 'acciones' || sec.id === 'bonos_corp' || sec.id === 'bonos_estado' || sec.id === 'startups' || sec.id === 'etf' ? ownedPositions.map(position => `
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding:5px 6px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;">
                      <div style="min-width:0;font-size:.55rem;color:#475569;">Tu posición<br/><strong style="font-size:.64rem;color:#166534;">$${Number(position.currentBalance || 0).toLocaleString('es-CL')}</strong><span style="display:block;font-size:.49rem;color:#64748b;">Invertido: $${Number(position.contributedCapital || 0).toLocaleString('es-CL')}</span></div>
                      <button type="button" onclick="openRedeemOtherInvModal('${position.id}')" style="flex-shrink:0;padding:5px 8px;font-size:.56rem;font-weight:800;background:#fff;color:#047857;border:1px solid #047857;border-radius:5px;">Vender</button>
                    </div>`).join('') : ''}
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; padding-top:6px; border-top:1px dashed #e2e8f0;">
                    ${sec.id === 'cripto' ? `<div style="font-size:.60rem; color:#64748b;">Tienes:<br/><strong style="color:${ownedBalance > 0 ? '#0f172a' : '#94a3b8'}; font-size:.72rem;">$${ownedBalance.toLocaleString('es-CL')}</strong></div>` : ''}
                    <div style="display:flex; flex-direction:${sec.id === 'cripto' ? 'column' : 'row'}; gap:5px; ${sec.id === 'cripto' ? 'width:105px;' : ''}">
                      <button type="button" onclick="openContractOtherInvModal('${item.id}')" style="width:100%; padding:5px 11px; font-size:.64rem; font-weight:800; background:#0284c7; color:#fff; border:none; border-radius:6px;">${sec.id === 'apv' ? 'Aportar' : 'Comprar'}</button>
                      ${sec.id === 'cripto' ? `<button type="button" onclick="${sellPosition ? `openRedeemOtherInvModal('${sellPosition.id}')` : ''}" style="width:100%; padding:5px 11px; font-size:.64rem; font-weight:800; background:${ownedBalance > 0 ? '#047857' : '#cbd5e1'}; color:#fff; border:none; border-radius:6px;" ${ownedBalance > 0 ? '' : 'disabled'}>Vender</button>` : ''}
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>`}
        </div>`;
    }

