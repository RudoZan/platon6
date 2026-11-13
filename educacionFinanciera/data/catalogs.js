// Static Data Catalogs & Templates — educacionFinanciera

    // CATÁLOGO DE DIAPOSITIVAS DEL TALLER (CONTENIDO CONCEPTUAL DE LA PRESENTACIÓN)
    const slidesData = [
      {
        step: 1,
        tag: "ACTUALÍZATE ONLINE • UAH • EXPERIAN",
        title: "Finanzas Personales y Bienestar",
        desc: "La riqueza no es un fin en sí misma, sino un medio para tener la libertad de llevar el tipo de vida que valoramos (Amartya Sen, 2000).",
        view: "view-generic",
        genericTitle: "Simulador de Decisiones Financieras",
        genericDesc: "",
        genericIcon: "",
        figureIcon: "🌱",
        genericBodyHtml: `<div style="text-align: left; font-size: 0.82rem; color: #334155; line-height: 1.5; padding: 4px 6px;">
          <p style="margin-bottom: 8px;">Esta aplicación permite simular cómo impactan tus decisiones cotidianas en el tiempo.</p>
          <p style="margin-bottom: 16px;">Experimentarás en directo la interacción entre los componentes clave de tu economía: <strong>ahorro, inversión, endeudamiento y presupuesto</strong>, evaluando no solo tu dinero, sino el efecto en tu <strong>bienestar personal</strong>.</p>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 14px; margin-top: 6px;">
            <label style="display: block; font-size: 0.72rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
              Ingresa código de sesión
            </label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="session-code-input" placeholder="Ej: UAH-2026" 
                style="flex: 1; min-width: 0; padding: 8px 10px; font-size: 0.85rem; font-family: var(--font-title); font-weight: 700; color: #0f172a; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; text-transform: uppercase;">
              <button type="button" class="btn-step-next" style="margin: 0; padding: 8px 14px; font-size: 0.78rem; white-space: nowrap;" onclick="handleEnterSessionCode()">
                Ingresar código
              </button>
            </div>
            <div id="session-code-feedback" style="display: none; font-size: 0.70rem; margin-top: 5px; font-weight: 600;"></div>
          </div>
        </div>`
      },
      {
        step: 2,
        tag: "Perfil del personaje",
        title: "Intereses personales y preferencias",
        desc: "En la sección de Personal (ícono barra inferior) ingresa a Intereses Personales y Preferencias e indica tus intereses y preferencias. ",
        view: "view-step-4",
        figureIcon: "👤",
        figureSvg: `<svg viewBox="0 0 52 52" style="width: 40px; height: 40px; display: block;" fill="none"><circle cx="26" cy="14" r="8" fill="#0284c7" /><path d="M10 40C10 31.5 17 25 26 25C35 25 42 31.5 42 40" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" /></svg>`
      },
      {
        step: 3,
        tag: "Perfil del personaje",
        title: "Estilo de vida valorado",
        desc: "",
        view: "view-anchors",
        figureIcon: "👤",
        figureSvg: `<svg viewBox="0 0 52 52" style="width: 40px; height: 40px; display: block;" fill="none"><circle cx="26" cy="14" r="8" fill="#0284c7" /><path d="M10 40C10 31.5 17 25 26 25C35 25 42 31.5 42 40" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" /></svg>`
      },
      {
        step: 4,
        tag: "Perfil del personaje",
        title: "Resumen del perfil",
        desc: "Ficha consolidada de tu personaje: revisa sus intereses y los valores de estilo de vida.",
        view: "view-character-summary",
        figureIcon: "👤",
        figureSvg: `<svg viewBox="0 0 52 52" style="width: 40px; height: 40px; display: block;" fill="none"><circle cx="26" cy="14" r="8" fill="#0284c7" /><path d="M10 40C10 31.5 17 25 26 25C35 25 42 31.5 42 40" fill="#38bdf8" fill-opacity="0.35" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" /></svg>`
      },
      {
        step: 5,
        tag: "PRESUPUESTO INTELIGENTE",
        title: "Presupuesto",
        desc: "Definición de presupuesto: 50% Gastos Fijos, 30% Estilo de Vida y 20% Reservas."
      },
      {
        step: 6,
        tag: "PRIMER MES Y REALIDAD",
        title: "Inicio del Simulador",
        desc: "Se procesan tus compromisos iniciales: revisa tu liquidez real y capacidad de ahorro."
      },
      {
        step: 7,
        tag: "ECOSISTEMA FINANCIERO",
        title: "Ahorro, Inversión y Crédito",
        desc: "Simulador corriendo: los tres pilares del ecosistema financiero.",
        view: "view-character-summary"
      },
      {
        step: 8,
        tag: "CRITERIOS DE DECISIÓN",
        title: "Consideraciones al Invertir",
        desc: "Simulador corriendo: rentabilidad, liquidez y nivel de riesgo."
      },
      {
        step: 9,
        tag: "VARIABLES DEL DINERO",
        title: "Triángulo de la Inversión",
        desc: "Simulador corriendo: ninguna alternativa maximiza las tres variables a la vez.",
        hasTriangle: true
      },
      {
        step: 10,
        tag: "AHORRO CON PROPÓSITO",
        title: "Ahorrar y Guardar Dinero",
        desc: "Ver instrumentos de ahorro: separa reservas con metas específicas."
      },
      {
        step: 11,
        tag: "ESTILO DE VIDA Y BIENESTAR",
        title: "Darse un Gusto",
        desc: "Evento de darse un gusto: 4 alternativas según el perfil de tu personaje."
      },
      {
        step: 12,
        tag: "INSTRUMENTOS 1 • RENTA FIJA",
        title: "Instrumentos Comunes de Inversión",
        desc: "Ver instrumentos comunes: depósitos a plazo (DAP) con capital garantizado."
      },
      {
        step: 13,
        tag: "AHORRO PREVISIONAL",
        title: "APV y Cuenta 2",
        desc: "Ver instrumentos APV y Cuenta 2: beneficios tributarios y horizontes de ahorro."
      },
      {
        step: 14,
        tag: "INSTRUMENTOS 2 • BALANCEADOS",
        title: "Instrumentos Tipo 2: Fondos Mutuos",
        desc: "Ver instrumentos Fondos Mutuos y Cuenta 2: diversificación profesional y liquidez."
      },
      {
        step: 15,
        tag: "INSTRUMENTOS 3 • RENTA VARIABLE",
        title: "Instrumentos Tipo 3: Acciones y Cripto",
        desc: "Ver instrumentos Acciones y Cripto: mayor rentabilidad potencial y volatilidad."
      },
      {
        step: 16,
        tag: "GESTIÓN DE CARTERA",
        title: "\"No poner todos los huevos en la misma canasta\"",
        desc: "Simulador corriendo: diversificación por instrumento, plazo y sector."
      },
      {
        step: 17,
        tag: "SIMULACIÓN DE IMPACTO",
        title: "Evento Simulador: Choque de Mercado",
        desc: "Choque de Mercado: caída del 20% en el sector tecnológico."
      },
      {
        step: 18,
        tag: "PERFIL DE INVERSOR",
        title: "Perfil de Riesgo y Tolerancia",
        desc: "Simulador corriendo: la cartera correcta es la que te permite dormir tranquilo."
      },
      {
        step: 19,
        tag: "EVALUACIÓN OFICIAL",
        title: "Test de Perfil de Riesgo",
        desc: "Test de Perfil de Riesgo: clasifícate en Conservador, Moderado o Arriesgado."
      },
      {
        step: 20,
        tag: "REFLEXIÓN Y PORTAFOLIO",
        title: "Reflexión sobre Riesgos y Estrategia",
        desc: "Resultados del perfil: alinea tus horizontes de tiempo y tolerancia al riesgo."
      },
      {
        step: 21,
        tag: "OPORTUNIDAD PATRIMONIAL",
        title: "Evento: Oportunidad",
        desc: "Oportunidad: adquiere un activo o bien de valor según tu personalidad."
      },
      {
        step: 22,
        tag: "AJUSTE ESTRATÉGICO",
        title: "Actividad: Ajuste de Inversiones",
        desc: "Simulador corriendo: rebalanceo libre de cartera según tu perfil diagnosticado.",
        view: "view-character-summary"
      },
      {
        step: 23,
        tag: "MUNDO DEL CRÉDITO",
        title: "Tipos de Créditos y Mecánicas",
        desc: "Ver tipos de crédito: adelantar consumo presente comprometiendo ingresos futuros."
      },
      {
        step: 24,
        tag: "CRÉDITO ROTATIVO",
        title: "Tarjetas de Crédito y Pago Mínimo",
        desc: "Simulador corriendo: el pago mínimo capitaliza intereses y alarga la deuda."
      },
      {
        step: 25,
        tag: "LÍNEA DE CRÉDITO",
        title: "Línea de Crédito y Sobregiro",
        desc: "Simulador corriendo: salvavidas de emergencia inmediata con costo diario elevado."
      },
      {
        step: 26,
        tag: "CRÉDITO HIPOTECARIO",
        title: "Crédito Hipotecario y Bienes Raíces",
        desc: "Simulador corriendo: dividendos a largo plazo, pie y seguros obligatorios."
      },
      {
        step: 27,
        tag: "CRÉDITO DE CONSUMO",
        title: "Crédito de Consumo en Cuotas Fijas",
        desc: "Simulador corriendo: préstamos en cuotas pactadas y evaluación del CTC."
      },
      {
        step: 28,
        tag: "EVENTO SOCIAL",
        title: "Actividad Evento: Celebración",
        desc: "Simulador presenta situación de gasto por celebración según tu perfil."
      },
      {
        step: 29,
        tag: "PROTECCIÓN Y BLINDAJE",
        title: "Seguros y Protección",
        desc: "Simulador corriendo: se revisan opciones de seguro para blindar tu patrimonio."
      },
      {
        step: 30,
        tag: "GESTIÓN DE CRISIS",
        title: "Actividad Evento Negativo: Cisne Negro",
        desc: "El Cisne Negro: imprevistos mayores según perfil con timer de 15 segundos."
      },
      {
        step: 31,
        tag: "COMPARACIÓN TRANSPARENTE",
        title: "El CAE (Costo Anual Equivalente)",
        desc: "Simulador corriendo: compara créditos por CAE y no solo por tasa nominal."
      },
      {
        step: 32,
        tag: "MATEMÁTICA FINANCIERA",
        title: "Sistema de Amortización Francés",
        desc: "Simulador corriendo: cuotas fijas donde al inicio casi todo es interés."
      },
      {
        step: 33,
        tag: "INTERÉS COMPUESTO",
        title: "Interés Simple vs. Interés Compuesto",
        desc: "Simulador corriendo: la fuerza multiplicadora de generar intereses sobre intereses."
      },
      {
        step: 34,
        tag: "SIMULACIÓN DE TIEMPO",
        title: "Impacto del Interés en el Tiempo",
        desc: "Simulador corriendo: brecha acumulada entre ahorro con rentabilidad e intereses de deuda."
      },
      {
        step: 35,
        tag: "CASO PRÁCTICO REAL",
        title: "Dilema: Renovar Computador de $600.000",
        desc: "Simulador plantea dilema según perfil: ahorro previo vs. compra a crédito hoy."
      },
      {
        step: 36,
        tag: "CONTROL DE MANDO",
        title: "Revisión General del Tablero",
        desc: "Simulador corriendo: inspecciona tus indicadores consolidados de liquidez y deuda.",
        view: "view-character-summary"
      },
      {
        step: 37,
        tag: "PATRIMONIO Y BIENESTAR",
        title: "Patrimonio",
        desc: "Simulador corriendo: balance entre activos construidos, pasivos y paz mental.",
        view: "view-character-summary"
      },
      {
        step: 38,
        tag: "ÚLTIMAS DECISIONES",
        title: "Actividad Patrimonio: Ajustes Finales",
        desc: "Simulador corriendo: 60 segundos para prepagar deudas y reasignar fondos.",
        view: "view-character-summary"
      },
      {
        step: 39,
        tag: "HORIZONTE 8 AÑOS",
        title: "Actividad Patrimonio: Proyección Simulador",
        desc: "Simulador corriendo: 8 Años de Vida. El motor ejecuta la inercia compuesta de tus hábitos."
      },
      {
        step: 40,
        tag: "REFLEXIÓN Y APRENDIZAJES",
        title: "Reflexión Final: ¿Con qué me quedo?",
        desc: "Simulador corriendo: síntesis de aprendizajes para la vida cotidiana."
      },
      {
        step: 41,
        tag: "ESPACIO DE PREGUNTAS",
        title: "Preguntas",
        desc: "Simulador corriendo: resolución de inquietudes prácticas con el facilitador."
      },
      {
        step: 42,
        tag: "CIERRE Y DESPEDIDA",
        title: "Cierre Final del Taller",
        desc: "Simulador corriendo: felicitaciones por completar la experiencia vivencial."
      }
    ];

    // OPCIONES GLOBALES DE ESTILO DE VIDA (CON ÍCONOS Y REFERENCIAS)
    const homeOptions = [
      { name: 'Casa o Depto', sub: 'En condominio elegante', icon: '🏡' },
      { name: 'Departamento centro', sub: 'Conectividad central', icon: '🏢' },
      { name: 'Casa o departamento', sub: 'Vida de barrio', icon: '🏘️' },
      { name: 'Parcela de agrado', sub: 'Espacio y naturaleza', icon: '🌲' }
    ];

    const jobOptions = [
      { name: 'Freelance', sub: 'Sueldo medio variable', icon: '⚡', salary: 1100000 },
      { name: 'Trabajo dependiente', sub: 'Sueldo medio', icon: '💼', salary: 1200000 },
      { name: 'Trabajo dependiente', sub: 'Sueldo mínimo', icon: '🏪', salary: 500000 },
      { name: 'Trabajo administrativo', sub: 'Sueldo alto', icon: '🏛️', salary: 2400000 }
    ];

    const transportOptions = [
      { name: 'SUV o Camioneta', sub: 'Espaciosa y familiar', icon: '🚙' },
      { name: 'City Car', sub: 'Económico y rendidor', icon: '🚗' },
      { name: 'Locomoción colectiva', sub: 'Micro, Metro, Taxi, Uber', icon: '🚌' },
      { name: 'Deportivo o de lujo', sub: 'Alta gama y exclusivo', icon: '🏎️' }
    ];


    // CATÁLOGO DE SECCIONES POR LUGAR (100% ALINEADO A Opciones iconos.txt CON ÍCONOS CONTEXTUALES)
    const hubsData = {
      banco: {
        title: "🏦 Banco",
        subtitle: "Servicios financieros y cuentas bancarias",
        sections: [
          {
            id: "ahorro",
            name: "Cuenta Ahorro",
            icon: "🐖",
            desc: "Lugar seguro para guardar para el futuro donde nunca perderás.",
            detailDesc: "Diseñada especialmente para construir tu fondo de tranquilidad y resguardar tu capital a mediano y largo plazo. Ofrece un interés anual garantizado de UF + 1,0% (protegiéndote de la inflación). Opera bajo la modalidad de giro diferido con un máximo de 6 giros al año para conservar los intereses devengados, sin costo de mantención."
          },
          {
            id: "rut_vista",
            name: "Cuenta RUT / Vista",
            icon: "💳",
            desc: "Tu dinero del día a día siempre a mano, fácil y sin deudas.",
            detailDesc: "La herramienta fundamental para administrar tus ingresos y gastos cotidianos. Te permite recibir depósitos, realizar transferencias y pagar en comercios utilizando solo tu saldo real disponible, garantizando control total sin intereses de crédito ni riesgo de endeudamiento."
          },
          {
            id: "corriente",
            name: "Cuenta Corriente",
            icon: "🏦",
            desc: "Manejo total de tu dinero con chequera, transferencias y respaldo.",
            detailDesc: "Servicio bancario integral para centralizar todos tus movimientos financieros de alto volumen. Incluye talonario de cheques, transferencias interbancarias sin límites básicos y acceso a la plataforma corporativa del banco para respaldar tu actividad profesional o comercial."
          },
          {
            id: "linea",
            name: "Líneas de Crédito",
            icon: "⚡",
            desc: "Un salvavidas de liquidez inmediata para salir de cualquier apuro.",
            detailDesc: "Un monto de respaldo precargado asociado a tu cuenta bancaria que se activa automáticamente solo cuando te quedas sin saldo. Funciona como un fondo de auxilio para emergencias imprevistas, calculando intereses diarios únicamente sobre los días y el monto exacto que utilices."
          },
          {
            id: "tarjeta",
            name: "Tarjeta de Crédito",
            icon: "💳",
            desc: "Compra hoy lo que necesitas y fináncialo en cómodas cuotas.",
            detailDesc: "Instrumento de financiamiento rotativo que te permite adquirir bienes y servicios de inmediato, difiriendo el pago a fin de mes o en cuotas mensuales. Si pagas el total facturado a tiempo evitas intereses; si pagas el mínimo, se acumulan altos cargos financieros."
          },
          {
            id: "fondos",
            name: "Fondos Mutuos",
            icon: "📊",
            desc: "Haz crecer tu dinero en manos de expertos para multiplicar tu ahorro.",
            detailDesc: "Vehículo de inversión colectiva donde tu capital se une al de otros inversionistas para ser administrado por un equipo profesional. Diversifica automáticamente en decenas de instrumentos (renta fija, acciones o bonos) adaptándose a tu perfil de riesgo para ganarle a la inflación."
          },
          {
            id: "dap",
            name: "Depósitos a Plazo (DAP)",
            icon: "⏳",
            desc: "Rentabilidad fija y garantizada con cero riesgo para tu capital.",
            detailDesc: "Inversión a término fijo donde entregas un monto al banco por un periodo acordado (30, 60, 90 o 360 días) a cambio de una ganancia pactada de antemano. Es el instrumento más seguro del mercado: rentabilidad 100% garantizada, cero volatilidad y protección total del capital."
          },
          {
            id: "seguros",
            name: "Seguros",
            icon: "🛡️",
            desc: "Protege tu tranquilidad y tu patrimonio ante cualquier imprevisto.",
            detailDesc: "Pólizas de protección financiera (salud, vida, hogar, cesantía o auto) que blindan tu economía familiar. A cambio de una prima mensual accesible, transfieres el riesgo económico de accidentes, enfermedades o pérdidas materiales a la aseguradora, evitando la quiebra personal."
          }
        ]
      },
      inversiones: {
        title: "📈 Otros Instrumentos",
        subtitle: "Instrumentos y vehículos de inversión",
        sections: [
          { id: "apv", name: "Ahorro Previsional Voluntario (APV)", icon: "🧓", desc: "Ahorro para pensión con beneficio estatal (15% Régimen A o tributario B)." },
          { id: "cuenta2", name: "Ahorro Cuenta 2", icon: "📈", desc: "Inversión libre en multifondos AFP con bajas comisiones y hasta 24 giros/año." },
          { id: "etf", name: "Fondos Indexados y ETF", icon: "🌐", desc: "ETFs y fondos mutuos que siguen índices locales e internacionales." },
          { id: "acciones", name: "Compra de Acciones", icon: "📉", desc: "Renta variable en Bolsa con dividendos, corretaje y alta volatilidad." },
          { id: "bonos_corp", name: "Bonos Corporativos", icon: "📜", desc: "Deuda emitida por empresas en UF con pago de interés periódico." },
          { id: "bonos_estado", name: "Bonos del Estado", icon: "🇨🇱", desc: "BTP/BTU, bonos del Banco Central y emisiones soberanas temáticas ESG." },
          { id: "cripto", name: "Compra/Venta Criptomonedas", icon: "🪙", desc: "Activos digitales descentralizados de extrema volatilidad y sin garantía CMF." },
          { id: "moneda_ext", name: "Compra/Venta Moneda Extranjera", icon: "💱", desc: "Dólares y Euros con tipo de cambio variable y diferencial (spread) cambiario." },
          { id: "fraccionada", name: "Inversión Inmobiliaria Fraccionada", icon: "🏢", desc: "Compra fracciones de propiedades en renta desde montos accesibles." },
          { id: "startups", name: "Participación en Startups", icon: "🚀", desc: "Capital de riesgo en empresas emergentes: alto potencial e iliquidez inicial." },
          { id: "billeteras", name: "Billeteras Electrónicas", icon: "📱", desc: "Cuentas digitales con rentabilidad diaria automática y liquidez inmediata." }
        ]
      },
      corredora: {
        title: "🏠 Corredora",
        subtitle: "Gestión inmobiliaria y corretaje de propiedades",
        sections: [
          { name: "Ventas Ofrecidas", icon: "🏷️", desc: "Vivienda, Bodega, Oficina, Local, Terreno, Estac." },
          { name: "Arriendos Ofrecidos", icon: "🔑", desc: "Vivienda, Bodega, Oficina, Local, Terreno, Estac." },
          { name: "Gestionar Venta", icon: "🤝", desc: "Poner propiedades o activos en venta" },
          { name: "Gestionar Arriendo", icon: "📝", desc: "Poner propiedades o activos en arriendo" }
        ]
      },
      comercio: {
        title: "🛍️ Comercio",
        subtitle: "Compras, consumo y retail",
        sections: [
          { name: "Comida", icon: "🛒" },
          { name: "Farmacia", icon: "💊" },
          { name: "Multitienda", icon: "🏬" },
          { name: "Muebles y Electrónicos", icon: "🛋️" },
          { name: "Automotora", icon: "🚗" },
          { name: "Compra de Oro, Plata y Joyas", icon: "💍" }
        ]
      },
      actividades: {
        title: "🎟️ Actividades",
        subtitle: "Recreación, eventos y vida social",
        sections: [
          { name: "Cine", icon: "🎬" },
          { name: "Conciertos", icon: "🎸" },
          { name: "Restaurant", icon: "🍽️" },
          { name: "Deporte y Gimnasio", icon: "🏋️" },
          { name: "Viajes y Turismo", icon: "✈️" },
          { name: "Celebraciones", icon: "🎉" }
        ]
      },
      trabajo: {
        title: "💼 Trabajo",
        subtitle: "Desarrollo profesional e ingresos laborales",
        sections: [
          { name: "Negociación Salarial", desc: "Ascensos y aumentos", icon: "📈", action: "renderTrabajoStage('negociacion')" },
          { name: "Capacitación", desc: "Cursos y certif.", icon: "🎓", action: "renderTrabajoStage('capacitacion')" },
          { name: "Búsqueda de Trabajo", desc: "Ofertas y postulación", icon: "🔍", action: "renderTrabajoStage('busqueda')" }
        ]
      },
      estado: {
        title: "Personal",
        subtitle: "Vida personal, bienestar y finanzas del personaje",
        sections: [
          { name: "Grado de Bienestar", icon: "🧘", desc: "Tranquilidad, calidad de vida y salud integral" },
          { name: "Perfil del Personaje", icon: "👤", desc: "Estilo de vida, vivienda, trabajo e intereses personales" },
          { name: "Presupuesto de Gastos", icon: "📊", desc: "Distribución 50% fijos, 30% estilo de vida, 20% reservas" },
          { name: "Patrimonio & Liquidez", icon: "💰", desc: "Efectivo disponible, reservas e inversiones totales" },
          { name: "Perfil de Inversionista", icon: "🎯", desc: "Tolerancia al riesgo, liquidez y horizonte" }
        ]
      }
    };

    // CATÁLOGO DE CURSOS DE CAPACITACIÓN (8 CURSOS EN 4 ÁREAS)
    const coursesCatalogData = [
      // 1. ÁREA CAPACITACIÓN
      {
        id: "cap_intermedio",
        code: "a",
        name: "Curso de Capacitación Nivel Intermedio",
        shortName: "Capacitación Intermedio",
        area: "capacitacion",
        areaLabel: "Capacitación",
        areaIcon: "🎓",
        level: "intermedio",
        levelLabel: "Intermedio",
        price: 50000,
        hours: 24,
        desc: "Herramientas operativas y técnicas para el desarrollo de competencias laborales.",
        prereqId: null,
        favorsJobs: ["job_op2", "job_op3", "job_op4", "job_op5", "job_op6"],
        gainFavored: 0.10,
        gainBase: 0.03,
        promotes: false
      },
      {
        id: "cap_avanzado",
        code: "b",
        name: "Curso de Capacitación Nivel Avanzado",
        shortName: "Capacitación Avanzado",
        area: "capacitacion",
        areaLabel: "Capacitación",
        areaIcon: "🎓",
        level: "avanzado",
        levelLabel: "Avanzado",
        price: 120000,
        hours: 60,
        desc: "Metodologías avanzadas de optimización y liderazgo de equipos técnicos.",
        prereqId: "cap_intermedio",
        favorsJobs: ["job_op2", "job_op3", "job_op6"],
        gainFavored: 0.15,
        gainBase: 0.03,
        promotes: true
      },

      // 2. ÁREA COMERCIAL
      {
        id: "com_intermedio",
        code: "c",
        name: "Curso Comercial Nivel Intermedio",
        shortName: "Comercial Intermedio",
        area: "comercial",
        areaLabel: "Comercial",
        areaIcon: "🤝",
        level: "intermedio",
        levelLabel: "Intermedio",
        price: 250000,
        hours: 30,
        desc: "Técnicas de negociación, prospección de clientes y gestión de relaciones comerciales.",
        prereqId: null,
        favorsJobs: ["job_op1", "job_op4", "job_op5"],
        gainFavored: 0.10,
        gainBase: 0.02,
        promotes: false
      },
      {
        id: "com_avanzado",
        code: "d",
        name: "Curso Comercial Nivel Avanzado",
        shortName: "Comercial Avanzado",
        area: "comercial",
        areaLabel: "Comercial",
        areaIcon: "🤝",
        level: "avanzado",
        levelLabel: "Avanzado",
        price: 1750000,
        hours: 75,
        desc: "Estrategias de expansión comercial, dirección de cuentas clave y cierre de negocios.",
        prereqId: "com_intermedio",
        favorsJobs: ["job_op4"],
        gainFavored: 0.15,
        gainBase: 0.02,
        promotes: true
      },

      // 3. ÁREA ADMINISTRACIÓN
      {
        id: "adm_intermedio",
        code: "e",
        name: "Curso de Administración Nivel Intermedio",
        shortName: "Administración Intermedio",
        area: "administracion",
        areaLabel: "Administración",
        areaIcon: "📋",
        level: "intermedio",
        levelLabel: "Intermedio",
        price: 350000,
        hours: 32,
        desc: "Control presupuestario, gestión documental y coordinación de procesos operativos.",
        prereqId: null,
        favorsJobs: ["job_op1", "job_op3", "job_op5", "job_op6"],
        gainFavored: 0.10,
        gainBase: 0.03,
        promotes: false
      },
      {
        id: "adm_avanzado",
        code: "f",
        name: "Curso de Administración Nivel Avanzado",
        shortName: "Administración Avanzado",
        area: "administracion",
        areaLabel: "Administración",
        areaIcon: "📋",
        level: "avanzado",
        levelLabel: "Avanzado",
        price: 1550000,
        hours: 80,
        desc: "Planificación estratégica corporativa, gobierno interno y gestión organizacional.",
        prereqId: "adm_intermedio",
        favorsJobs: ["job_op1", "job_op3"],
        gainFavored: 0.15,
        gainBase: 0.03,
        promotes: true
      },

      // 4. ÁREA ESPECIALIZACIÓN
      {
        id: "esp_intermedio",
        code: "g",
        name: "Curso de Especialización Nivel Intermedio",
        shortName: "Especialización Intermedio",
        area: "especializacion",
        areaLabel: "Especialización",
        areaIcon: "🔬",
        level: "intermedio",
        levelLabel: "Intermedio",
        price: 550000,
        hours: 36,
        desc: "Profundización técnica aplicada y metodologías analíticas de especialidad.",
        prereqId: null,
        favorsJobs: ["job_op1", "job_op2", "job_op4", "job_op5", "job_op6"],
        gainFavored: 0.10,
        gainBase: 0.05,
        promotes: false
      },
      {
        id: "esp_avanzado",
        code: "h",
        name: "Curso de Especialización Nivel Avanzado",
        shortName: "Especialización Avanzado",
        area: "especializacion",
        areaLabel: "Especialización",
        areaIcon: "🔬",
        level: "avanzado",
        levelLabel: "Avanzado",
        price: 1350000,
        hours: 90,
        desc: "Innovación aplicada, arquitectura técnica compleja y dirección de proyectos clave.",
        prereqId: "esp_intermedio",
        favorsJobs: ["job_op2"],
        gainFavored: 0.15,
        gainBase: 0.05,
        promotes: true
      }
    ];

    // CATÁLOGO DE OFERTAS DE TRABAJO (6 OPCIONES EN 2 COLUMNAS)
    const jobOffersData = [
      {
        id: "job_op1",
        code: "Opción 1",
        name: "Responsabilidad Directiva",
        badge: "Directivo",
        badgeClass: "job-badge-directiva",
        icon: "🏛️",
        grossSalary: 3125000,
        salary: 2500000,
        conditions: "Contrato formal, gestión estratégica y toma de decisiones, sin horario fijo.",
        requirements: "Requiere experiencia laboral previa y al menos la certificación de un curso.",
        hasExpReq: true,
        hasCourseReq: true,
        reqs: [
          {
            id: 'exp',
            label: 'Experiencia laboral previa',
            desc: 'Se requiere contar con experiencia laboral previa en al menos un empleo.',
            check: () => Boolean((state.jobHistory && state.jobHistory.length > 0) || state.currentJob)
          },
          {
            id: 'course',
            label: 'Certificación de un curso',
            desc: 'Se requiere al menos la certificación de un curso.',
            check: () => Boolean(state.courses && state.courses.length >= 1)
          }
        ]
      },
      {
        id: "job_op2",
        code: "Opción 2",
        name: "Profesional Especializado",
        badge: "Especializado",
        badgeClass: "job-badge-especializado",
        icon: "🔬",
        grossSalary: 2625000,
        salary: 2100000,
        conditions: "Contrato formal, funciones técnicas avanzadas, horario flexible.",
        requirements: "Requiere experiencia laboral previa y al menos la certificación de un curso.",
        hasExpReq: true,
        hasCourseReq: true,
        reqs: [
          {
            id: 'exp',
            label: 'Experiencia laboral previa',
            desc: 'Se requiere contar con experiencia laboral previa en al menos un empleo.',
            check: () => Boolean((state.jobHistory && state.jobHistory.length > 0) || state.currentJob)
          },
          {
            id: 'course',
            label: 'Certificación de un curso',
            desc: 'Se requiere al menos la certificación de un curso.',
            check: () => Boolean(state.courses && state.courses.length >= 1)
          }
        ]
      },
      {
        id: "job_op3",
        code: "Opción 3",
        name: "Gestión Operativa / Administrativa",
        badge: "Operativo",
        badgeClass: "job-badge-operativo",
        icon: "📋",
        grossSalary: 1185000,
        salary: 950000,
        conditions: "Contrato formal, jornada fija regular, funciones operativas continuas.",
        requirements: "Requiere al menos la certificación de un curso.",
        hasExpReq: false,
        hasCourseReq: true,
        reqs: [
          {
            id: 'course',
            label: 'Certificación de un curso',
            desc: 'Se requiere al menos la certificación de un curso.',
            check: () => Boolean(state.courses && state.courses.length >= 1)
          }
        ]
      },
      {
        id: "job_op4",
        code: "Opción 4",
        name: "Gestión Comercial & Servicios",
        badge: "Comercial",
        badgeClass: "job-badge-comercial",
        icon: "🤝",
        grossSalary: 812000,
        salary: 650000,
        isCommercial: true,
        conditions: "Contrato formal, gestión comercial con metas variables de desempeño.",
        requirements: "No requiere experiencia previa ni cursos de especialización.",
        hasExpReq: false,
        hasCourseReq: false,
        reqs: []
      },
      {
        id: "job_op5",
        code: "Opción 5",
        name: "Independiente / Freelance",
        badge: "Freelance",
        badgeClass: "job-badge-freelance",
        icon: "⚡",
        salary: 950000,
        isFreelance: true,
        conditions: "Emisión de boletas de honorarios, flexibilidad y gestión autónoma del tiempo.",
        requirements: "No requiere experiencia previa ni cursos de especialización.",
        hasExpReq: false,
        hasCourseReq: false,
        reqs: []
      },
      {
        id: "job_op6",
        code: "Opción 6",
        name: "Apoyo Operativo",
        badge: "Apoyo",
        badgeClass: "job-badge-apoyo",
        icon: "📦",
        grossSalary: 556000,
        salary: 450000,
        conditions: "Contrato formal con cotizaciones al día, jornada laboral completa estándar.",
        requirements: "No requiere experiencia previa ni cursos de especialización.",
        hasExpReq: false,
        hasCourseReq: false,
        reqs: []
      }
    ];


    function getInsuranceCoverages(insuranceId) {
      const map = {
        automotriz: [
          '✓ Daños materiales por colisión, volcamiento o choques.',
          '✓ Pérdida total y robo del vehículo asegurado.',
          '✓ Responsabilidad civil ante daños a terceras personas o vehículos.',
          '✓ Asistencia en ruta 24/7 (servicio de grúa, puente de batería y cerrajería).'
        ],
        vivienda: [
          '✓ Incendio estructural y daños por humo o explosión.',
          '✓ Terremotos, sismos y tsunamis (daños a la estructura del inmueble).',
          '✓ Inundaciones y desastres climáticos naturales.',
          '⛔ IMPORTANTE: NO cubre robos ni perdida de muebles o pertenencias.'
        ],
        fraude: [
          '✓ Robo de dinero en efectivo extraído por asalto físico en cajeros automáticos.',
          '✓ Giros, compras o transferencias forzadas bajo intimidación o coacción física.',
          'ℹ️ Nota: Clonaciones y fraudes electrónicos ya los cubre gratis la Ley de Fraudes.'
        ],
        desgravamen: [
          '✓ Pago íntegro del saldo adeudado de tu crédito o sobregiro ante fallecimiento.',
          '✓ Cobertura ante invalidez total y permanente del titular.',
          '✓ Libera a tus avales y familiares de asumir o heredar tus deudas bancarias.'
        ],
        cesantia: [
          '✓ Pago directo de 4 a 6 cuotas mensuales consecutivas de tu deuda crediticia.',
          '✓ Aplica ante despido involuntario (necesidades de la empresa).',
          '✓ Protege tu historial crediticio mientras buscas una nueva ocupación laboral.'
        ],
        vida: [
          '✓ Tus beneficiarios recibirán $20.000.000 en dinero en efectivo de libre disposición.',
          '✓ Cobertura total ante fallecimiento por cualquier causa.',
          '✓ Anticipo del 100% del capital ($20.000.000) ante invalidez total y permanente por accidente o enfermedad.'
        ],
        salud: [
          '✓ Reembolso de gastos hospitalarios, cirugías e internaciones clínicas.',
          '✓ Cobertura ambulatoria en consultas médicas, exámenes y urgencias.',
          '✓ Cubre el copago restante tras el descuento de Fonasa o Isapre.'
        ]
      };
      return map[insuranceId] || [];
    }

    const segurosCatalog = [
      {
        id: 'fraude',
        name: 'Seguro de Fraude',
        icon: '🛡️',
        costMonthly: 1150,
        costDisplay: '$1.150/mes',
        desc: 'Protección ante asaltos en cajeros, fraudes presenciales y compras forzadas.',
        requirementDesc: 'Requiere tener Cuenta RUT/Vista, Corriente o Tarjeta.',
        isMultiAsset: false,
        checkEligible: () => getUserInsuranceAssets('fraude').length > 0,
        note: 'Opcional: la Ley de Fraudes chilena ya cubre clonaciones y transferencias no autorizadas sin costo.'
      },
      {
        id: 'desgravamen',
        name: 'Seguro de Desgravamen',
        icon: '📑',
        costMonthly: 1900,
        costDisplay: '$1.900/mes',
        desc: 'Cubre el saldo insoluto de tu crédito o cupo utilizado ante fallecimiento.',
        requirementDesc: 'Requiere tener Línea de Crédito o Crédito/Deuda activa.',
        isMultiAsset: false,
        checkEligible: () => getUserInsuranceAssets('desgravamen').length > 0,
        note: 'Obligatorio en créditos y sobregiros para mantener el cupo disponible.'
      },
      {
        id: 'cesantia',
        name: 'Seguro de Cesantía',
        icon: '💼',
        costMonthly: 4500,
        costDisplay: '$4.500/mes',
        desc: 'Paga de 4 a 6 cuotas de tus compromisos de crédito en caso de desempleo involuntario.',
        requirementDesc: 'Requiere tener un Crédito activo y actividad laboral.',
        isMultiAsset: false,
        checkEligible: () => getUserInsuranceAssets('cesantia').length > 0 && state.currentJob !== null,
        note: 'Salvaguarda tu historial crediticio si pierdes tu trabajo involuntariamente.'
      },
      {
        id: 'automotriz',
        name: 'Seguro Automotriz',
        icon: '🚗',
        costMonthly: 28000,
        costDisplay: 'Desde $28.000/mes',
        desc: 'Póliza individual por vehículo ante choques, pérdida total y robo. El precio depende del vehículo asegurado.',
        requirementDesc: 'Requiere tener al menos un vehículo propio registrado a tu nombre.',
        isMultiAsset: true,
        checkEligible: () => getUserInsuranceAssets('automotriz').length > 0,
        note: 'Tarifa individual: cada vehículo asegurado cuenta con su propia prima según tasación comercial.'
      },
      {
        id: 'vivienda',
        name: 'Seguro de Vivienda / Hogar',
        icon: '🏠',
        costMonthly: 11000,
        costDisplay: 'Desde $11.000/mes',
        desc: 'Protege tu inmueble ante incendios, sismos y catástrofes (no cubre robos). El precio depende de la propiedad.',
        requirementDesc: 'Requiere tener al menos una propiedad o inmueble registrado a tu nombre.',
        isMultiAsset: true,
        checkEligible: () => getUserInsuranceAssets('vivienda').length > 0,
        note: 'Tarifa individual por inmueble según valor asegurable. No cubre robos ni perdida de muebles o pertenencias.'
      },
      {
        id: 'vida',
        name: 'Seguro de Vida',
        icon: '❤️',
        costMonthly: 9500,
        costDisplay: '$9.500/mes',
        desc: '¡Protege hoy el futuro de quienes más amas! Garantiza un respaldo blindado en efectivo para que a tu familia nunca le falte nada, pase lo que pase.',
        requirementDesc: 'Libre contratación (beneficiarios legales o designados).',
        isMultiAsset: false,
        checkEligible: () => true,
        note: 'Capital asegurado de $20.000.000 (aprox. 525 UF), monto estándar de alta demanda en Chile para protección familiar.'
      },
      {
        id: 'salud',
        name: 'Seguro de Salud (Complementario)',
        icon: '🏥',
        costMonthly: 14000,
        costDisplay: '$14.000/mes',
        desc: 'Reembolsa copagos no cubiertos por Fonasa o Isapre en consultas, hospitalización y farmacia.',
        requirementDesc: 'Libre contratación (sin pre-requisitos de bienes).',
        isMultiAsset: false,
        checkEligible: () => true,
        note: 'Amortigua gastos médicos de alto costo y exámenes ambulatorios.'
      }
    ];


    // ==========================================================================
    // TEST OFICIAL DE PERFIL DE RIESGO (5 PREGUNTAS DEL PDF UAH / EXPERIAN)
    // ==========================================================================
    const officialRiskQuestions = [
      {
        question: "1. ¿Cuál es tu objetivo principal al momento de invertir?",
        options: [
          { text: "A) Proteger mi capital y evitar pérdidas a toda costa", points: 1 },
          { text: "B) Rentabilidad moderada asumiendo algo de fluctuación y posibles pérdidas", points: 2 },
          { text: "C) Maximizar ganancias asumiendo alta volatilidad y riesgos", points: 3 }
        ]
      },
      {
        question: "2. ¿Qué harías si tu inversión pierde un 15% de su valor en un solo mes?",
        options: [
          { text: "A) Vendo inmediatamente todo para no seguir perdiendo", points: 1 },
          { text: "B) Espero unos meses para ver si mi inversión se recupera", points: 2 },
          { text: "C) Aprovecho los precios bajos para invertir más", points: 3 }
        ]
      },
      {
        question: "3. ¿Por cuánto tiempo estás dispuesto a mantener tu inversión sin retirar el dinero?",
        options: [
          { text: "A) Menos de 1 año (necesito liquidez o acceso inmediato)", points: 1 },
          { text: "B) Entre 1 y 5 años (mediano plazo)", points: 2 },
          { text: "C) Más de 5 años (largo plazo)", points: 3 }
        ]
      },
      {
        question: "4. Si una inversión de alto riesgo cayera fuertemente, ¿cuál sería tu reacción emocional?",
        options: [
          { text: "A) Gran angustia; preferiría no volver a invertir en eso", points: 1 },
          { text: "B) Preocupación, pero evaluaría la situación con calma", points: 2 },
          { text: "C) Tranquilidad; entiendo que el riesgo es parte del retorno", points: 3 }
        ]
      },
      {
        question: "5. ¿Qué porcentaje de tus ingresos o ahorros mensuales estás dispuesto a destinar a inversión?",
        options: [
          { text: "A) Menos del 10% (solo pequeños excedentes)", points: 1 },
          { text: "B) Entre 10% y 25% (ahorro e inversión sostenida)", points: 2 },
          { text: "C) Más del 25% (apuesta fuerte al crecimiento)", points: 3 }
        ]
      }
    ];

