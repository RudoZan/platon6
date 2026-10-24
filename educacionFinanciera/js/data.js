/* ==========================================================================
   SIMULADOR FINANCIERO VIVENCIAL - DATA & CONFIGURATION (AMPLIADO)
   ========================================================================== */

const GAME_DATA = {
  // Los 4 Arquetipos Psicológicos Básicos Equilibrados
  archetypes: [
    {
      id: "festivo_urbano",
      name: "El Festivo Urbano",
      age: 27,
      avatar: "🎪",
      desc: "Su bienestar se basa en pasarlo bien: cine, celebraciones, cumpleaños, ferias y carrete con amigos.",
      salary: 1600000,
      cash: 800000,
      debt: 600000,
      housing: "V2",
      vehicle: "A0",
      distance: "D2",
      neighborhood: "B2",
      jobType: "T1",
      traits: { ans: 1.0, soc: 1.8, hed: 1.7, seg: 0.8 }
    },
    {
      id: "viajero_sibarita",
      name: "El Viajero Sibarita",
      age: 29,
      avatar: "🌍",
      desc: "Su bienestar está en viajar (sur/norte de Chile, extranjero) y el placer de comer en buenos restaurantes.",
      salary: 1600000,
      cash: 800000,
      debt: 600000,
      housing: "V2",
      vehicle: "A2",
      distance: "D2",
      neighborhood: "B2",
      jobType: "T1",
      traits: { ans: 0.9, soc: 1.6, hed: 1.9, seg: 0.8 }
    },
    {
      id: "orientado_estatus",
      name: "El De Estatus",
      age: 30,
      avatar: "🏎️",
      desc: "Su bienestar se basa en proyectar éxito: auto nuevo o SUV, casa bien ubicada y ropa de marca.",
      salary: 1600000,
      cash: 800000,
      debt: 600000,
      housing: "V3",
      vehicle: "A3",
      distance: "D3",
      neighborhood: "B3",
      jobType: "T1",
      traits: { ans: 1.5, soc: 2.0, hed: 1.4, seg: 1.1 }
    },
    {
      id: "anfitrion_tech",
      name: "El Anfitrión Tech",
      age: 28,
      avatar: "🎮",
      desc: "Su bienestar está en su hogar: recibir a sus amigos, muebles cómodos, asados, consolas y electrónica.",
      salary: 1600000,
      cash: 800000,
      debt: 600000,
      housing: "V4",
      vehicle: "A2",
      distance: "D1",
      neighborhood: "B2",
      jobType: "T1",
      traits: { ans: 1.2, soc: 1.7, hed: 1.5, seg: 1.3 }
    },
    {
      id: "independiente_freelance",
      name: "El Independiente / Freelance",
      age: 31,
      avatar: "💻",
      desc: "Autónomo. Meses excelentes de $3M y meses flojos de $600k. Sin cotizaciones automáticas.",
      salary: 1800000,
      cash: 800000,
      debt: 600000,
      housing: "V2",
      vehicle: "A2",
      distance: "D1",
      neighborhood: "B2",
      jobType: "T3",
      traits: { ans: 1.3, soc: 1.2, hed: 1.4, seg: 1.2 }
    },
    {
      id: "endeudado_optimista",
      name: "El Endeudado Optimista",
      age: 28,
      avatar: "🎉",
      desc: "Disfruta al máximo el presente. Tarjetas al límite pagando el mínimo.",
      salary: 1300000,
      cash: 150000,
      debt: 3800000,
      housing: "V2",
      vehicle: "A2",
      distance: "D2",
      neighborhood: "B2",
      jobType: "T4",
      traits: { ans: 0.5, soc: 1.8, hed: 2.0, seg: 0.5 }
    },
    {
      id: "guardiano_cauteloso",
      name: "El Guardián Cauteloso",
      age: 35,
      avatar: "🛡️",
      desc: "Gasta poco y cuida cada peso. Le cuesta disfrutar y teme invertir.",
      salary: 1400000,
      cash: 3500000,
      debt: 0,
      housing: "V2",
      vehicle: "A0",
      distance: "D1",
      neighborhood: "B1",
      jobType: "T2",
      traits: { ans: 1.8, soc: 0.5, hed: 0.6, seg: 2.0 }
    },
    {
      id: "familia_monoparental",
      name: "La Familia Monoparental",
      age: 36,
      avatar: "👩‍👧‍👦",
      desc: "Jefa de hogar con dos dependientes. Administradora estricta pero al límite.",
      salary: 1500000,
      cash: 500000,
      debt: 900000,
      housing: "V4",
      vehicle: "A0",
      distance: "D2",
      neighborhood: "B1",
      jobType: "T1",
      traits: { ans: 1.7, soc: 0.7, hed: 0.8, seg: 1.9 }
    },
    {
      id: "inversionista_sonador",
      name: "El Inversionista Soñador",
      age: 27,
      avatar: "🚀",
      desc: "Todo a cripto y trading. Poco efectivo líquido. Gran tolerancia a la volatilidad.",
      salary: 1600000,
      cash: 400000,
      debt: 1200000,
      housing: "V2",
      vehicle: "A1",
      distance: "D1",
      neighborhood: "B2",
      jobType: "T1",
      traits: { ans: 0.7, soc: 1.2, hed: 1.3, seg: 0.6 }
    }
  ],

  // 6 Lugares del Mundo (Oportunidades Fijas)
  locations: [
    {
      id: "banco",
      name: "El Banco",
      icon: "🏦",
      desc: "Cuentas, líneas, tarjetas, créditos y depósitos a plazo.",
      actions: [
        {
          id: "B10_dap",
          title: "Tomar Depósito a Plazo (DAP 90 días)",
          desc: "Inversión 100% segura con tasa garantizada de 4.8% anual.",
          cost: 500000,
          category: "inversion",
          effect: { type: "invest_dap", rate: 0.048, time: 3 }
        },
        {
          id: "B8_credito_consumo",
          title: "Solicitar Crédito de Consumo ($2.000.000)",
          desc: "Liquidez inmediata en 24 cuotas fijas de $108.000/mes (CAE 24%).",
          cost: 0,
          category: "credito",
          effect: { type: "add_loan", amount: 2000000, monthlyQuota: 108000, months: 24 }
        },
        {
          id: "B9_seguro_salud",
          title: "Contratar Seguro de Salud Catastrófico",
          desc: "Protege contra cirugías o urgencias mayores por $25.000/mes.",
          cost: 25000,
          category: "seguro",
          effect: { type: "add_insurance", key: "health", monthlyCost: 25000 }
        },
        {
          id: "B7_pagar_tarjeta",
          title: "Abonar $500.000 al Capital de la Tarjeta",
          desc: "Reduce de inmediato el saldo insoluto para evitar intereses rotativos.",
          cost: 500000,
          category: "deuda",
          effect: { type: "pay_card_debt", amount: 500000 }
        }
      ]
    },
    {
      id: "comercio",
      name: "Comercio & Retail",
      icon: "🛍️",
      desc: "Tiendas, supermercados, moda, tecnología y automotoras.",
      actions: [
        {
          id: "R5_auto_economico",
          title: "Comprar Auto Usado Económico ($4.500.000)",
          desc: "City car eficiente. Pie de $1.500.000 y cuotas de $110.000/mes.",
          cost: 1500000,
          category: "vehiculo",
          effect: { type: "buy_vehicle", tier: "A2", quota: 110000, months: 36 }
        },
        {
          id: "R6_auto_lujo",
          title: "Comprar SUV Nuevo con Crédito Inteligente",
          desc: "Modelo del año. Pie de $4.000.000 + cuota de $380.000/mes + cuotón final.",
          cost: 4000000,
          category: "vehiculo",
          effect: { type: "buy_vehicle", tier: "A4", quota: 380000, months: 36, balloon: 8000000 }
        },
        {
          id: "R7_ropa_moda",
          title: "Renovación de Vestuario y Ropa de Temporada",
          desc: "Compra de vestuario de calidad por $160.000 al contado.",
          cost: 160000,
          category: "consumo",
          effect: { type: "boost_wellbeing", cv: 15 }
        },
        {
          id: "R4_bencina",
          title: "Cargar Estanque Lleno de Bencina ($65.000)",
          desc: "Asegura el combustible para el trimestre y evita quedar botado.",
          cost: 65000,
          category: "transporte",
          effect: { type: "fill_fuel" }
        }
      ]
    },
    {
      id: "inversiones",
      name: "Corredora & Inversiones",
      icon: "📈",
      desc: "Fondos mutuos, Cuenta 2 AFP, acciones, oro y divisas.",
      actions: [
        {
          id: "I1_cuenta2",
          title: "Aporte a Cuenta 2 AFP / Fondos Mutuos",
          desc: "Fondo diversificado moderado con retorno esperado del 8% anual.",
          cost: 300000,
          category: "inversion",
          effect: { type: "invest_mf", amount: 300000, expRate: 0.08 }
        },
        {
          id: "I2_acciones",
          title: "Invertir en Acciones de Empresas / ETFs",
          desc: "Renta variable a largo plazo con retorno esperado del 12% anual.",
          cost: 500000,
          category: "inversion",
          effect: { type: "invest_stocks", amount: 500000, expRate: 0.12 }
        },
        {
          id: "I3_cripto",
          title: "Invertir en Criptomonedas (Bitcoin/Ethereum)",
          desc: "Especulación de alto riesgo con retorno potencial o caídas del 30%.",
          cost: 250000,
          category: "inversion",
          effect: { type: "invest_crypto", amount: 250000, expRate: 0.18 }
        },
        {
          id: "I6_oro",
          title: "Comprar Oro Físico / Custodia (Activo Refugio)",
          desc: "Blindaje atemporal contra inflación y crisis financiera.",
          cost: 400000,
          category: "inversion",
          effect: { type: "invest_gold", amount: 400000 }
        }
      ]
    },
    {
      id: "inmobiliaria",
      name: "Inmobiliaria & Bienes Raíces",
      icon: "🏢",
      desc: "Arriendos, compra de vivienda, bodegas, estacionamientos y locales.",
      actions: [
        {
          id: "H2_comprar_vivienda",
          title: "Comprar Departamento con Crédito Hipotecario",
          desc: "Pie del 15% ($12.000.000) y dividendo de $420.000/mes a 25 años.",
          cost: 12000000,
          category: "propiedad",
          effect: { type: "buy_home_mortgage", dividend: 420000, years: 25 }
        },
        {
          id: "H5_comprar_estacionamiento",
          title: "Comprar Estacionamiento para Renta ($9.500.000)",
          desc: "Genera una renta mensual pasiva de $75.000 CLP de inmediato.",
          cost: 9500000,
          category: "propiedad",
          effect: { type: "buy_parking_rent", monthlyRent: 75000 }
        },
        {
          id: "H8_comprar_bodega",
          title: "Comprar Bodega en Edificio Urbano ($4.500.000)",
          desc: "Genera un microingreso pasivo de $40.000 CLP al mes.",
          cost: 4500000,
          category: "propiedad",
          effect: { type: "buy_storage_rent", monthlyRent: 40000 }
        },
        {
          id: "H11_comprar_local",
          title: "Comprar Local Comercial ($28.000.000)",
          desc: "Genera un canon de arriendo comercial de $220.000/mes.",
          cost: 28000000,
          category: "propiedad",
          effect: { type: "buy_commercial_local", monthlyRent: 220000 }
        }
      ]
    },
    {
      id: "recreacion",
      name: "Vida Social & Ocio",
      icon: "🎉",
      desc: "Viajes, gastronomía, recitales y celebraciones.",
      actions: [
        {
          id: "S2_viaje_internacional",
          title: "Viaje Internacional de Vacaciones (Europa/Caribe)",
          desc: "Experiencia cumbre de vida ($2.200.000). +40% Calidad de Vida.",
          cost: 2200000,
          category: "ocio",
          effect: { type: "boost_wellbeing", cv: 40 }
        },
        {
          id: "S2_viaje_nacional",
          title: "Escapada de Vacaciones en Chile (Sur / Norte)",
          desc: "Cabaña o buen hotel por $650.000. Gran descanso familiar (+20% CV).",
          cost: 650000,
          category: "ocio",
          effect: { type: "boost_wellbeing", cv: 20 }
        },
        {
          id: "S3_concierto",
          title: "Entradas para Concierto Masivo / Festival",
          desc: "Música en vivo con amigos ($140.000). +15% Calidad de Vida.",
          cost: 140000,
          category: "ocio",
          effect: { type: "boost_wellbeing", cv: 15 }
        }
      ]
    },
    {
      id: "trabajo",
      name: "Trabajo & Carrera",
      icon: "💼",
      desc: "Capacitaciones, negociación de aumento y búsqueda laboral.",
      actions: [
        {
          id: "W1_capacitacion",
          title: "Cursar Diplomado / Certificación Profesional",
          desc: "Inversión en capital humano ($950.000). Acredita puntaje para aumentos.",
          cost: 950000,
          category: "carrera",
          effect: { type: "add_training", level: 1 }
        },
        {
          id: "W2_pedir_aumento",
          title: "Solicitar Negociación de Aumento de Sueldo",
          desc: "El jefe evaluará tus capacitaciones, puntualidad y clima laboral.",
          cost: 0,
          category: "carrera",
          effect: { type: "evaluate_raise" }
        },
        {
          id: "W3_buscar_trabajo",
          title: "Postular a un Nuevo Empleo en el Mercado",
          desc: "Explorar si otra empresa ofrece un 25% más de salario.",
          cost: 0,
          category: "carrera",
          effect: { type: "job_hunt" }
        }
      ]
    }
  ],

  // Catálogo Completo de Crisis / Imprevistos Súbitos (con timer de 15 segundos)
  emergencies: [
    {
      id: "E1_dental",
      title: "🚨 Urgencia Médica o Dental Inesperada",
      desc: "Dolor agudo por infección dental severa. Requiere tratamiento de conducto y corona de urgencia.",
      amount: 450000,
      options: [
        {
          label: "Pagar con Fondo de Reserva / Efectivo",
          cost: 450000,
          paymentType: "cash",
          consequence: "Absorbes el golpe sin deudas. Tu liquidez baja pero estás libre de intereses."
        },
        {
          label: "Pagar con Tarjeta de Crédito (6 cuotas)",
          cost: 0,
          paymentType: "card_installments",
          quota: 85000,
          months: 6,
          consequence: "No tocas ahorros hoy, pero agregas una cuota fija de $85.000/mes a tu presupuesto."
        },
        {
          label: "Postergar tratamiento con calmantes",
          cost: 20000,
          paymentType: "postpone",
          consequence: "Ahorras dinero hoy, pero tu Paz Mental cae un -35% y arriesgas complicación mayor."
        }
      ]
    },
    {
      id: "E3_pana_auto",
      title: "🚨 Falla Mecánica Mayor del Auto",
      desc: "La caja de cambios reventó en la autopista. El taller cobra $1.200.000 por la reparación.",
      amount: 1200000,
      options: [
        {
          label: "Pagar con Fondo de Imprevistos",
          cost: 1200000,
          paymentType: "cash",
          consequence: "Tu colchón de imprevistos te salva. Tu presupuesto mensual sigue intacto."
        },
        {
          label: "Pagar con Tarjeta de Crédito en 12 cuotas",
          cost: 0,
          paymentType: "card_installments",
          quota: 125000,
          months: 12,
          consequence: "Nuevo compromiso fijo de $125.000/mes durante todo un año."
        },
        {
          label: "Dejar el auto botado y andar en micro",
          cost: 0,
          paymentType: "abandon",
          consequence: "Cero deuda, pero pierdes 2 horas más al día (-25% Calidad de Vida)."
        }
      ]
    },
    {
      id: "E4_filtracion_casa",
      title: "🚨 Filtración Crítica de Cañería en el Hogar",
      desc: "El agua está dañando el piso y el cielo del vecino de abajo. Reparación de urgencia: $380.000.",
      amount: 380000,
      options: [
        {
          label: "Pagar gasfíter profesional al contado",
          cost: 380000,
          paymentType: "cash",
          consequence: "Problema resuelto de inmediato con garantía. Alivio de paz mental."
        },
        {
          label: "Pagar con Tarjeta de Casa Comercial en cuotas",
          cost: 0,
          paymentType: "card_installments",
          quota: 75000,
          months: 6,
          consequence: "Sumas una cuota más a tus compromisos del mes."
        }
      ]
    },
    {
      id: "E2_multa_transito",
      title: "🚨 Infracción de Tránsito y Fotoradar",
      desc: "Te notifican una multa grave del juzgado de policía local por exceso de velocidad: $160.000.",
      amount: 160000,
      options: [
        {
          label: "Pagar al contado con descuento del 25%",
          cost: 120000,
          paymentType: "cash",
          consequence: "Aprovechas descuento por pronto pago ($120.000) y quedas al día."
        },
        {
          label: "Pagar total con tarjeta en 3 cuotas",
          cost: 0,
          paymentType: "card_installments",
          quota: 56000,
          months: 3,
          consequence: "Pagas en cuotas con intereses bancarios."
        }
      ]
    },
    {
      id: "E5_refrigerador_muerto",
      title: "🚨 El Refrigerador Dejó de Enfriar",
      desc: "El motor se fundió en pleno verano. La comida de la semana está en riesgo.",
      amount: 420000,
      options: [
        {
          label: "Comprar refrigerador nuevo eficiente al contado",
          cost: 420000,
          paymentType: "cash",
          consequence: "Equipo con 2 años de garantía y bajo consumo eléctrico."
        },
        {
          label: "Comprar en tienda comercial a 12 cuotas",
          cost: 0,
          paymentType: "card_installments",
          quota: 45000,
          months: 12,
          consequence: "Agregas una cuota fija de $45.000 a tu mes a mes."
        },
        {
          label: "Comprar usado barato en internet",
          cost: 120000,
          paymentType: "cash",
          consequence: "Ahorras hoy, pero sin garantía y con riesgo de nueva falla en 1 año."
        }
      ]
    }
  ],

  // Ofertas Comerciales Proactivas (Llamadas de bancos, tiendas y corredoras)
  proactiveOffers: [
    {
      id: "T1_banco_preaprobado",
      year: 2,
      quarter: 2,
      icon: "📞",
      title: "Llamada del Banco: ¡Crédito Pre-aprobado de $5.000.000!",
      desc: "Tu ejecutivo bancario te llama diciendo que tienes $5.000.000 a un solo clic a tasa preferencial para lo que quieras.",
      accept: {
        label: "Aceptar los $5.000.000 en 36 cuotas de $185.000/mes",
        cash: 5000000,
        monthlyQuota: 185000,
        months: 36,
        consequence: "Dinero fresco en la cuenta, pero un compromiso fijo de -$185.000/mes por los próximos 3 años."
      },
      reject: {
        label: "Rechazar cortésmente: No necesito deuda de consumo",
        consequence: "Mantienes tu presupuesto libre de compromisos tóxicos."
      }
    },
    {
      id: "T3_retail_descuento",
      year: 4,
      quarter: 4,
      icon: "🛍️",
      title: "En la Caja de la Tienda: 25% de Descuento Inmediato",
      desc: "La cajera te ofrece ahorrarte $60.000 en tus compras navideñas abriendo la tarjeta de la tienda ahora mismo.",
      accept: {
        label: "Abrir la tarjeta y obtener el descuento hoy",
        savings: 60000,
        cardMaintenance: 4500,
        consequence: "Ahorras $60.000 hoy, pero adquieres costo de mantención mensual de $4.500 y riesgo de compras impulsivas."
      },
      reject: {
        label: "Pagar con débito sin abrir tarjetas nuevas",
        consequence: "Cero tarjetas nuevas; mantienes tu orden administrativo."
      }
    },
    {
      id: "T4_corredora_depto",
      year: 6,
      quarter: 1,
      icon: "🏢",
      title: "Oferta de Corredora: Departamento con Bono Pie",
      desc: "Una corredora te contacta con un proyecto inmobiliario en blanco: 'Se paga solo con el arriendo, sin poner pie'.",
      accept: {
        label: "Adquirir departamento con crédito hipotecario para renta",
        dividend: 390000,
        monthlyRent: 410000,
        consequence: "Activo inmobiliario apalancado. Si el arrendatario paga, te genera $20.000/mes de flujo y plusvalía."
      },
      reject: {
        label: "Rechazar: Prefiero no asumir riesgo de vacancia o dividendo",
        consequence: "Mantienes tu capacidad de endeudamiento intacta."
      }
    }
  ]
};
