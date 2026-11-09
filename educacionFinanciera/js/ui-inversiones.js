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
        actionLabel: 'Comprar Fracciones',
        requiresRiskProfile: false,
        ruleNote: 'Permite comprar <strong>fracciones o cuotas de propiedades en arriendo</strong> sin necesitar crédito hipotecario. Recibes dividendos por arriendo más plusvalía en UF, pero si vendes antes de 36 meses en el mercado secundario se descuenta un <strong>2,0% de comisión de corretaje de salida</strong>.',
        items: [
          {
            id: 'frac_residencial',
            name: 'Fracciones Edificio Renta Residencial (UF)',
            shortName: 'Fracciones Renta Residencial',
            icon: '🏢',
            expectedMonthlyRate: 0.0062,
            monthlyVolatility: 0.0040,
            rateDisplay: 'UF + ~4,5% anual (~0,62%/mes por arriendo + plusvalía)',
            volatilityDisplay: '±0,40%/mes (Riesgo vacancia 5%)',
            costDisplay: 'Salida anticipada (<36m): 2,0% corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            maturityMonthsFree: 36,
            rescueDays: 7,
            minAmount: 100000,
            lockMonths: 0,
            desc: 'Participación en departamentos habitacionales arrendados en zona céntrica. Liquidez media (venta de fracciones en 7 días hábiles).'
          },
          {
            id: 'frac_comercial',
            name: 'Fracciones Strip Center & Bodegas Comerciales (UF)',
            shortName: 'Fracciones Strip Center UF',
            icon: '🏪',
            expectedMonthlyRate: 0.0072,
            monthlyVolatility: 0.0065,
            rateDisplay: 'UF + ~5,6% anual (~0,72%/mes por renta comercial)',
            volatilityDisplay: '±0,65%/mes (Baja-Media)',
            costDisplay: 'Salida anticipada (<36m): 2,0% corretaje',
            entryFeePct: 0,
            exitPenaltyPct: 0.02,
            maturityMonthsFree: 36,
            rescueDays: 7,
            minAmount: 250000,
            lockMonths: 0,
            desc: 'Contratos de arriendo comercial en UF de largo plazo con mayor retorno por dividendo mensual.'
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
        ruleNote: 'Al comprar o vender acciones en la <strong>Bolsa de Comercio de Santiago</strong> a través de una Corredora de Bolsa, se aplica una comisión de corretaje (`0,35%` por operación) y la liquidación oficial demora <strong>2 días hábiles bursátiles (T+2)</strong>.',
        items: [
          {
            id: 'acc_ipsa_div',
            name: 'Acciones Chilenas Dividendera (Banca & Servicios)',
            shortName: 'Acciones IPSA Dividendos',
            icon: '🏦',
            expectedMonthlyRate: 0.0090,
            monthlyVolatility: 0.0320,
            rateDisplay: '~0,90% mensual esp. (~11,4% anual + dividendos)',
            volatilityDisplay: '±3,20%/mes (Alta)',
            costDisplay: 'Corretaje: 0,35% compra y 0,35% venta',
            entryFeePct: 0.0035,
            exitPenaltyPct: 0.0035,
            rescueDays: 2,
            minAmount: 20000,
            lockMonths: 0,
            desc: 'Empresas consolidadas del IPSA que reparten utilidades periódicas. Su precio de mercado fluctúa todos los días.'
          },
          {
            id: 'acc_ipsa_growth',
            name: 'Acciones Recursos Naturales, Litio & Retail',
            shortName: 'Acciones Crecimiento Chile',
            icon: '⛏️',
            expectedMonthlyRate: 0.0105,
            monthlyVolatility: 0.0420,
            rateDisplay: '~1,05% mensual esp. (~13,3% anual)',
            volatilityDisplay: '±4,20%/mes (Muy Alta)',
            costDisplay: 'Corretaje: 0,35% compra y 0,35% venta',
            entryFeePct: 0.0035,
            exitPenaltyPct: 0.0035,
            rescueDays: 2,
            minAmount: 20000,
            lockMonths: 0,
            desc: 'Acciones cíclicas expuestas al comercio exterior y consumo interno. Alto potencial de ganancia pero con fuertes caídas temporales.'
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
        ruleNote: 'Los <strong>Bonos Corporativos</strong> son títulos de deuda en UF emitidos por grandes empresas chilenas inscritas en la CMF. Pagan intereses periódicos (cupones) y tienen menor volatilidad que las acciones, aunque su precio de mercado puede variar si suben las tasas de interés.',
        items: [
          {
            id: 'bono_corp_aa',
            name: 'Bono Corporativo Empresas Clasificación AA+ (UF)',
            shortName: 'Bono Corporativo AA+ (UF)',
            icon: '📜',
            expectedMonthlyRate: 0.0058,
            monthlyVolatility: 0.0040,
            rateDisplay: 'UF + 3,2% anual (~0,58%/mes estimado)',
            volatilityDisplay: '±0,40%/mes (Baja)',
            costDisplay: 'Corretaje: 0,15% al comprar/vender',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 50000,
            lockMonths: 0,
            desc: 'Deuda de empresas de servicios básicos y sanitarias con alta solvencia crediticia. Liquidación en mercado secundario en 2 días hábiles.'
          },
          {
            id: 'bono_corp_a',
            name: 'Bono Corporativo Industrial Clasificación A (UF)',
            shortName: 'Bono Industrial A (UF)',
            icon: '🏭',
            expectedMonthlyRate: 0.0066,
            monthlyVolatility: 0.0065,
            rateDisplay: 'UF + 4,1% anual (~0,66%/mes estimado)',
            volatilityDisplay: '±0,65%/mes (Baja-Media)',
            costDisplay: 'Corretaje: 0,15% al comprar/vender',
            entryFeePct: 0.0015,
            exitPenaltyPct: 0.0015,
            rescueDays: 2,
            minAmount: 50000,
            lockMonths: 0,
            desc: 'Entrega una tasa real en UF superior a cambio de un riesgo crediticio levemente mayor.'
          }
        ]
      },
      bonos_estado: {
        id: 'bonos_estado',
        title: '🇨🇱 Bonos del Estado (Tesorería / Banco Central)',
        shortTitle: 'Bonos del Estado',
        icon: '🇨🇱',
        actionLabel: 'Comprar Bono',
        requiresRiskProfile: false,
        ruleNote: 'Emitidos por la <strong>Tesorería General de la República (BTU/BTP)</strong> y el <strong>Banco Central de Chile</strong>. Son los instrumentos de renta fija de menor riesgo de crédito del país (riesgo soberano).',
        items: [
          {
            id: 'bono_btu_uf',
            name: 'Bono de Tesorería en UF (BTU Soberano)',
            shortName: 'Bono Tesorería BTU (UF)',
            icon: '🇨🇱',
            expectedMonthlyRate: 0.0052,
            monthlyVolatility: 0.0020,
            rateDisplay: 'UF + 2,4% anual (~0,52%/mes estimado)',
            volatilityDisplay: '±0,20%/mes (Muy Baja)',
            costDisplay: 'Custodia y corretaje: 0,10%',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 50000,
            lockMonths: 0,
            desc: 'Protege el poder adquisitivo en UF con respaldo directo del Estado de Chile y mínima fluctuación.'
          },
          {
            id: 'bono_btp_clp',
            name: 'Bono de Tesorería en Pesos (BTP Nominal)',
            shortName: 'Bono Tesorería BTP ($)',
            icon: '🏛️',
            expectedMonthlyRate: 0.0046,
            monthlyVolatility: 0.0018,
            rateDisplay: '~5,6% anual nominal (~0,46%/mes)',
            volatilityDisplay: '±0,18%/mes (Muy Baja)',
            costDisplay: 'Custodia y corretaje: 0,10%',
            entryFeePct: 0.0010,
            exitPenaltyPct: 0.0010,
            rescueDays: 2,
            minAmount: 50000,
            lockMonths: 0,
            desc: 'Renta fija soberana en pesos chilenos, liquidable en cualquier momento en el mercado secundario (T+2).'
          }
        ]
      },
      etf: {
        id: 'etf',
        title: '🌐 Fondos Indexados (ETF)',
        shortTitle: 'Fondos Indexados (ETF)',
        icon: '🌐',
        actionLabel: 'Comprar ETF',
        requiresRiskProfile: true,
        ruleNote: 'Un <strong>ETF (Exchange Traded Fund)</strong> replica un índice completo (como el S&P 500 o el IPSA) y se compra en bolsa igual que una acción. Su gran ventaja frente a un Fondo Mutuo tradicional es su <strong>bajísimo costo anual (TAC 0,15% a 0,35%)</strong>.',
        items: [
          {
            id: 'etf_sp500',
            name: 'ETF S&P 500 (500 Mayores Empresas EE.UU.)',
            shortName: 'ETF S&P 500 EE.UU.',
            icon: '🌐',
            expectedMonthlyRate: 0.0095,
            monthlyVolatility: 0.0330,
            rateDisplay: '~0,95% mensual esp. (~12,0% anual histórico)',
            volatilityDisplay: '±3,30%/mes (Alta)',
            costDisplay: 'TAC 0,15% anual · Corretaje 0,25%',
            entryFeePct: 0.0025,
            exitPenaltyPct: 0.0025,
            rescueDays: 2,
            minAmount: 15000,
            lockMonths: 0,
            desc: 'Diversificación automática en las 500 mayores compañías de Estados Unidos con costo de administración mínimo.'
          },
          {
            id: 'etf_ipsa',
            name: 'ETF IPSA Chile (30 Mayores Acciones Nacionales)',
            shortName: 'ETF IPSA Chile',
            icon: '🇨🇱',
            expectedMonthlyRate: 0.0085,
            monthlyVolatility: 0.0300,
            rateDisplay: '~0,85% mensual esp. (~10,7% anual)',
            volatilityDisplay: '±3,00%/mes (Alta)',
            costDisplay: 'TAC 0,30% anual · Corretaje 0,25%',
            entryFeePct: 0.0025,
            exitPenaltyPct: 0.0025,
            rescueDays: 2,
            minAmount: 15000,
            lockMonths: 0,
            desc: 'Sigue el desempeño del índice selectivo de la Bolsa de Santiago en una sola cuota diversificada.'
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
        ruleNote: 'Las <strong>Billeteras Digitales con Rendimiento</strong> invierten tu saldo automáticamente en fondos de mercado monetario (<em>Money Market</em>), entregando interés diario sin bloquear tu dinero y con retiro inmediato 24/7 sin costo.',
        items: [
          {
            id: 'wallet_remunerada',
            name: 'Billetera Digital con Rendimiento Diario Automático',
            shortName: 'Billetera Digital Remunerada',
            icon: '📱',
            expectedMonthlyRate: 0.0038,
            monthlyVolatility: 0.0005,
            rateDisplay: '~0,38% mensual (~4,65% anual con abono diario)',
            volatilityDisplay: '±0,05%/mes (Casi nula)',
            costDisplay: '$0 mantención · $0 comisión de retiro',
            entryFeePct: 0,
            exitPenaltyPct: 0,
            rescueDays: 0,
            minAmount: 5000,
            lockMonths: 0,
            desc: 'Tu dinero sigue 100% disponible para transferir o retirar al instante mientras genera intereses todos los días.'
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
        ruleNote: '<strong>⚠️ Capital de Riesgo (Venture Capital) e Iliquidez:</strong> Invertir en una Startup emergente ofrece alto potencial de multiplicación, pero una alta tasa de fracaso. Al no cotizar en bolsa, tu capital queda <strong>100% bloqueado durante los primeros 6 meses</strong> antes de poder vender tu participación en mercado secundario.',
        items: [
          {
            id: 'startup_fintech',
            name: 'Startup Fintech Chilena · Ronda Semilla (Seed)',
            shortName: 'Startup Fintech (Seed)',
            icon: '🚀',
            expectedMonthlyRate: 0.0150,
            monthlyVolatility: 0.1100,
            rateDisplay: '~1,50% mensual esp. (Riesgo extremo de pérdida o éxito)',
            volatilityDisplay: '±11,00%/mes (Extrema · Ilíquida)',
            costDisplay: 'Bloqueo 6 meses · Descuento liquidez anticipada 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            maturityMonthsFree: 12,
            rescueDays: 10,
            minAmount: 250000,
            lockMonths: 6,
            desc: 'Ticket de capital de riesgo en empresa tecnológica emergente. Inmovilizado por 6 meses; si vendes entre el mes 6 y 11 en mercado secundario se aplica 10% de descuento por iliquidez.'
          },
          {
            id: 'startup_biotech',
            name: 'Startup Biotech & Agrotech · Serie A',
            shortName: 'Startup Biotech (Serie A)',
            icon: '🧬',
            expectedMonthlyRate: 0.0135,
            monthlyVolatility: 0.0950,
            rateDisplay: '~1,35% mensual esp. (Alto riesgo tecnológico)',
            volatilityDisplay: '±9,50%/mes (Muy Alta · Ilíquida)',
            costDisplay: 'Bloqueo 6 meses · Descuento liquidez anticipada 10%',
            entryFeePct: 0,
            exitPenaltyPct: 0.10,
            maturityMonthsFree: 12,
            rescueDays: 10,
            minAmount: 250000,
            lockMonths: 6,
            desc: 'Participación accionaria en biotecnología aplicada con etapa de maduración obligatoria de 6 meses antes de permitir salida.'
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
        iconBox.innerHTML = '<span>💎</span>';
      }
      if (titleElem) titleElem.innerText = '💎 Otras Inversiones';
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

      const totalOtherBalance = state.otherInvestments.reduce((sum, inv) => sum + (Number(inv.currentBalance) || 0), 0) + getForeignCurrenciesTotalCLP() + (Number(state.apvAccount?.balance) || 0) + (Number(state.cuenta2Account?.balance) || 0);
      const totalOtherCount = state.otherInvestments.length + getActiveForeignCurrenciesCount() + Number(Boolean(state.apvAccount)) + Number(Boolean(state.cuenta2Account));

      container.innerHTML = `
        <div class="personal-subview-box">
          <!-- RESUMEN GLOBAL DE OTRAS INVERSIONES -->
          <div style="background: linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%); border: 1.5px solid #c4b5fd; border-radius: 9px; padding: 9px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.58rem; font-weight: 700; color: #5b21b6; text-transform: uppercase;">Cartera en Otras Inversiones</div>
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

      const defaultUnits = curr.buyPrice < 10 ? 1000 : 100;
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

      const defaultSource = fundingOptions.find(o => o.balance >= item.minAmount) || fundingOptions[0];
      const defaultAmount = Math.max(item.minAmount, Math.min(100000, defaultSource ? defaultSource.balance : item.minAmount));
      const entryFeeAmount = Math.round(defaultAmount * (item.entryFeePct || 0));
      const netInvested = defaultAmount - entryFeeAmount;

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
                  2. Monto a desembolsar (Mínimo $${item.minAmount.toLocaleString('es-CL')}):
                </label>
                <input id="other-inv-amount-input" type="number" min="${item.minAmount}" step="5000" value="${defaultAmount}" oninput="updateOtherInvPreview('${item.id}')" style="width: 100%; padding: 7px 9px; border: 1.5px solid #0284c7; border-radius: 6px; margin-bottom: 8px;">
              </div>

              <!-- RESUMEN DE CONDICIONES -->
              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; margin-bottom: 9px; font-size: 0.62rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Costo de entrada / spread:</span>
                  <strong id="other-inv-preview-fee" style="color: ${entryFeeAmount > 0 ? '#b45309' : '#047857'};">
                    ${entryFeeAmount > 0 ? `-$${entryFeeAmount.toLocaleString('es-CL')} (${(item.entryFeePct * 100).toFixed(2)}%)` : '$0 (Sin comisión de entrada)'}
                  </strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #475569;">Capital neto inicial invertido:</span>
                  <strong id="other-inv-preview-net" style="color: #0284c7;">$${netInvested.toLocaleString('es-CL')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 4px; border-top: 1px dashed #86efac;">
                  <span style="color: #475569;">Retorno esperado / Volatilidad:</span>
                  <strong style="color: #047857;">${item.volatilityDisplay}</strong>
                </div>
              </div>

              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 8px; margin-bottom: 9px; font-size: 0.58rem; color: #92400e; line-height: 1.32;">
                <strong>ℹ️ Condición de mercado:</strong> ${item.lockMonths > 0 ? `Este instrumento exige una permanencia mínima obligatoria de <strong>${item.lockMonths} meses</strong> sin posibilidad de rescate anticipado.` : 'El valor de liquidación es variable según las condiciones de mercado al cierre del día de venta.'}
              </div>

              <div id="other-inv-modal-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 0.62rem; font-weight: 700; padding: 6px 8px; border-radius: 6px; margin-bottom: 8px;"></div>

              <div style="display: flex; gap: 8px;">
                <button type="button" onclick="closeBancoModal()" style="flex: 1; padding: 8px; font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button type="button" onclick="executeContractOtherInv('${item.id}')" style="flex: 1.3; padding: 8px; font-size: 0.72rem; font-weight: 800; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
                  Confirmar Operación
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
      const fee = Math.round(amount * (item.entryFeePct || 0));
      const net = Math.max(0, amount - fee);

      const feeEl = document.getElementById('other-inv-preview-fee');
      const netEl = document.getElementById('other-inv-preview-net');
      if (feeEl) {
        feeEl.textContent = fee > 0 ? `-$${fee.toLocaleString('es-CL')} (${(item.entryFeePct * 100).toFixed(2)}%)` : '$0 (Sin comisión de entrada)';
      }
      if (netEl) {
        netEl.textContent = `$${net.toLocaleString('es-CL')}`;
      }
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

      if (!amount || amount < item.minAmount) {
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = `⚠️ El monto mínimo para este instrumento es de $${item.minAmount.toLocaleString('es-CL')}.`;
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

      const entryFee = Math.round(amount * (item.entryFeePct || 0));
      const netInitialBalance = amount - entryFee;

      if (!Array.isArray(state.otherInvestments)) state.otherInvestments = [];
      state.otherInvestments.push({
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
        maturityMonthsFree: item.maturityMonthsFree || 0,
        rescueDays: item.rescueDays,
        minAmount: item.minAmount,
        lockMonths: item.lockMonths || 0,
        contributedCapital: amount,
        currentBalance: netInitialBalance,
        monthsSimulated: 0
      });

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
      let deduction = 0;
      if (pos.exitPenaltyPct > 0 && gross > 0) deduction = Math.round(gross * pos.exitPenaltyPct);
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
              <div><div class="job-modal-title" style="color:#fff;">Vender: ${pos.name}</div></div>
            </div>
            <div class="job-modal-body" style="padding: 13px 15px;">
              <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px 10px; margin-bottom:9px;">
                <label style="display:block; font-size:.62rem; font-weight:800; color:#166534; margin-bottom:5px;">Monto a vender (disponible: $${Number(pos.currentBalance).toLocaleString('es-CL')})</label>
                <input id="redeem-other-amount-input" type="number" min="1" max="${pos.currentBalance}" step="1000" value="${gross}" style="width:100%; box-sizing:border-box; padding:7px 9px; border:1.5px solid #047857; border-radius:6px; font-weight:800;" />
                <button type="button" onclick="openRedeemOtherInvModal('${pos.id}', ${pos.currentBalance}, '${destId}')" style="margin-top:5px; padding:4px 8px; border:1px solid #86efac; border-radius:5px; background:#ecfdf5; color:#047857; font-size:.58rem; font-weight:800;">Vender todo</button>
              </div>
              <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px 10px; margin-bottom:9px;">
                <label style="display:block; font-size:.62rem; font-weight:800; color:#166534; margin-bottom:5px;">Abonar en:</label>
                <select onchange="openRedeemOtherInvModal('${pos.id}', Number(document.getElementById('redeem-other-amount-input').value || ${pos.currentBalance}), this.value)" style="width:100%; padding:7px 8px; border:1px solid #cbd5e1; border-radius:6px;">
                  ${destOptions.map(opt => `<option value="${opt.id}" ${opt.id === destId ? 'selected' : ''}>${opt.label}</option>`).join('')}
                </select>
              </div>
              <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 10px; margin-bottom:9px; font-size:.62rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Tipo de operación:</span><strong>${isFull ? 'Venta total' : 'Venta parcial'}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Comisión:</span><strong>$${deduction.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Monto líquido:</span><strong>$${net.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Saldo remanente:</span><strong>$${remaining.toLocaleString('es-CL')}</strong></div>
                <div style="display:flex; justify-content:space-between;"><span>Destino:</span><strong>${destName}</strong></div>
              </div>
              <div style="display:flex; gap:8px;">
                <button type="button" onclick="closeBancoModal()" style="flex:1; padding:8px; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; font-weight:700;">Cancelar</button>
                <button type="button" onclick="executeRedeemOtherInv('${pos.id}', Number(document.getElementById('redeem-other-amount-input').value || 0), Math.max(0, Math.round(Number(document.getElementById('redeem-other-amount-input').value || 0) * (1 - ${pos.exitPenaltyPct || 0}))), '${destId}')" style="flex:1.4; padding:8px; background:#047857; color:#fff; border:none; border-radius:6px; font-weight:800;">Confirmar Venta</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    function updateRedeemOtherInvPreview(posId, destId) {
      if (window.redeemOtherInvExecuting) return;
      const inputEl = document.getElementById('redeem-other-amount-input');
      const pos = state.otherInvestments.find(p => p.id === posId);
      if (!inputEl || !pos) return;
      const amount = Math.max(0, Math.min(Number(pos.currentBalance) || 0, Math.round(Number(inputEl.value) || 0)));
      openRedeemOtherInvModal(posId, amount, destId);
    }

    function executeRedeemOtherInv(posId, grossAmount, netAmount, destId) {
      closeBancoModal();
      window.redeemOtherInvExecuting = true;

      if (!Array.isArray(state.otherInvestments)) {
        window.redeemOtherInvExecuting = false;
        return;
      }
      const idx = state.otherInvestments.findIndex(p => p.id === posId);
      if (idx < 0) {
        window.redeemOtherInvExecuting = false;
        return;
      }
      const pos = state.otherInvestments[idx];
      const gross = Math.round(Number(grossAmount) || 0);
      const net = Math.round(Number(netAmount) || 0);
      if (gross <= 0 || gross > Number(pos.currentBalance)) {
        window.redeemOtherInvExecuting = false;
        return;
      }

      if (destId === 'cash') {
        state.cash = (Number(state.cash) || 0) + net;
      } else {
        const account = (state.bankAccounts || []).find(a => a.id === destId);
        if (account) account.balance = (Number(account.balance) || 0) + net;
        else state.cash = (Number(state.cash) || 0) + net;
      }

      if (gross >= Number(pos.currentBalance)) {
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
      if (!Array.isArray(state.otherInvestments)) state.otherInvestments = [];

      const positions = state.otherInvestments.filter(inv => inv.categoryId === categoryId);
      const apvContract = sec.id === 'apv' ? state.apvAccount : null;
      const cuenta2Contract = sec.id === 'cuenta2' ? state.cuenta2Account : null;
      const totalBalance = positions.reduce((sum, inv) => sum + (Number(inv.currentBalance) || 0), 0) + (Number(apvContract?.balance) || 0) + (Number(cuenta2Contract?.balance) || 0);
      const totalContributed = positions.reduce((sum, inv) => sum + (Number(inv.contributedCapital) || 0), 0) + (Number(apvContract?.contributedCapital) || 0) + (Number(cuenta2Contract?.contributedCapital) || 0);
      const netDiff = totalBalance - totalContributed;
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

          ${sec.id === 'cripto' ? '' : `
          <div style="background:linear-gradient(135deg,#eff6ff,#f5f3ff); border:1.5px solid #93c5fd; border-radius:9px; padding:9px 12px; margin-bottom:8px; display:flex; justify-content:space-between;">
            <div><div style="font-size:.58rem; font-weight:700; color:#1e40af;">SALDO VALORIZADO</div><div style="font-size:.90rem; font-weight:800; color:#0284c7;">$${totalBalance.toLocaleString('es-CL')}</div><div style="font-size:.56rem; color:#64748b;">Aportado: $${totalContributed.toLocaleString('es-CL')}</div></div>
            <div style="text-align:right;"><div style="font-size:.58rem; color:#64748b;">Resultado</div><div style="font-size:.90rem; font-weight:800; color:${netDiff >= 0 ? '#047857' : '#b91c1c'};">$${netDiff.toLocaleString('es-CL')}</div></div>
          </div>`}

          ${apvView}
          ${cuenta2View}

          ${sec.id === 'apv' || sec.id === 'cuenta2' ? '' : `
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:7px 10px; margin-bottom:8px; font-size:.61rem; color:#475569;">${sec.ruleNote}</div>`}

          ${sec.id === 'apv' || sec.id === 'cuenta2' ? '' : `
          <div style="${sec.id === 'cripto' ? 'display:grid; grid-template-columns:repeat(2,minmax(0,1fr));' : 'display:flex; flex-direction:column;'} gap:6px; margin-bottom:10px;">
            ${sec.items.map(item => {
              const ownedPositions = sec.id === 'cripto' ? positions.filter(pos => pos.itemTypeId === item.id) : [];
              const ownedBalance = ownedPositions.reduce((sum, pos) => sum + (Number(pos.currentBalance) || 0), 0);
              const sellPosition = ownedPositions[0];
              return `
                <div style="background:#fff; border:1.5px solid #cbd5e1; border-radius:8px; padding:8px 10px; display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; font-size:.72rem; font-weight:800; color:#0f172a;">
                    ${sec.id === 'cripto' ? `<span>${item.name}</span><span>${item.icon}</span>` : `<span>${item.icon} ${item.name}</span>`}
                  </div>
                  ${sec.id === 'cripto' ? '' : `<div style="font-size:.59rem; font-weight:700; color:#047857;">${item.rateDisplay} · Volatilidad: ${item.volatilityDisplay}</div>`}
                  <div style="font-size:.57rem; font-weight:600; color:#475569;">${item.costDisplay} · Mínimo $${item.minAmount.toLocaleString('es-CL')}</div>
                  <div style="font-size:.60rem; color:#64748b; line-height:1.3;">${item.desc}</div>
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

