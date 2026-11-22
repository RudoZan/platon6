// Static data for EF_configuracion_catalogos.
window.EF_DATA = window.EF_DATA || {};
window.EF_DATA["EF_configuracion_catalogos"] =   {
    "cursos": {
      "moneda": "CLP",
      "abreviaturasId": {
        "areas": {
          "tecnologia": "tec",
          "negocios_finanzas": "nego",
          "ingenieria_construccion": "inge",
          "comercio_servicios": "come",
          "transporte_logistica": "tran",
          "seguridad_servicio_publico": "segu",
          "naturaleza_turismo": "natu",
          "oficios_tecnicos": "ofic",
          "comunicacion_medios": "comu",
          "arte_espectaculo": "arte",
          "salud_bienestar": "salu",
          "educacion_conocimiento": "educ"
        },
        "niveles": {
          "intermedio": "inte",
          "avanzado": "avan"
        },
        "tipos": {
          "Capacitación": "capa",
          "Comercial": "coml",
          "Administración": "admi",
          "Especialización": "espe"
        }
      },
      "criterioBeneficiosLaborales": "Los aumentos y ascensos no se duplican en este catálogo. Sus reglas se mantienen en Trabajos.txt y se aplican según familia, nivel y tipo de trabajo.",
      "criterioParametrosFormativos": "Los valores de horas, duración y precio están incluidos en parametros dentro de cada curso. Los perfiles son referencias orientativas por familia y nivel, no valores asignados de forma idéntica a todos sus cursos.",
      "perfilesFormativos": {
        "capacitacion_intermedio": {
          "categoria": "Capacitación",
          "nivel": "intermedio",
          "horasReferencia": 24,
          "duracionMesesReferencia": 1,
          "precioReferencia": 50000
        },
        "comercial_intermedio": {
          "categoria": "Comercial",
          "nivel": "intermedio",
          "horasReferencia": 30,
          "duracionMesesReferencia": 1,
          "precioReferencia": 250000
        },
        "administracion_intermedio": {
          "categoria": "Administración",
          "nivel": "intermedio",
          "horasReferencia": 38,
          "duracionMesesReferencia": 2,
          "precioReferencia": 350000
        },
        "especializacion_intermedio": {
          "categoria": "Especialización",
          "nivel": "intermedio",
          "horasReferencia": 36,
          "duracionMesesReferencia": 2,
          "precioReferencia": 550000
        },
        "capacitacion_avanzado": {
          "categoria": "Capacitación",
          "nivel": "avanzado",
          "horasReferencia": 160,
          "duracionMesesReferencia": 6,
          "precioReferencia": 120000
        },
        "comercial_avanzado": {
          "categoria": "Comercial",
          "nivel": "avanzado",
          "horasReferencia": 176,
          "duracionMesesReferencia": 8,
          "precioReferencia": 1750000
        },
        "administracion_avanzado": {
          "categoria": "Administración",
          "nivel": "avanzado",
          "horasReferencia": 180,
          "duracionMesesReferencia": 8,
          "precioReferencia": 1550000
        },
        "especializacion_avanzado": {
          "categoria": "Especialización",
          "nivel": "avanzado",
          "horasReferencia": 190,
          "duracionMesesReferencia": 10,
          "precioReferencia": 1350000
        }
      },
      "criterioVinculos": "Los vínculos de cursos se agrupan por positivos y negativos, cada uno separado en bienestarMental, bienestarEmocional y bienestarFisico. Educación se vincula positivamente con todos los cursos; Paz Financiera y Reservas (seguridad) con todos los cursos administrativos y comerciales. Se conservan las asociaciones positivas preexistentes."
    },
    "trabajos": {
      "abreviaturasId": {
        "areas": {
          "tecnologia": "tec",
          "negocios_finanzas": "nego",
          "ingenieria_construccion": "inge",
          "comercio_servicios": "come",
          "transporte_logistica": "tran",
          "seguridad_servicio_publico": "segu",
          "naturaleza_turismo": "natu",
          "oficios_tecnicos": "ofic",
          "comunicacion_medios": "comu",
          "arte_espectaculo": "arte",
          "salud_bienestar": "salu",
          "educacion_conocimiento": "educ"
        },
        "tiposTrabajo": {
          "directiva": "dir",
          "especializado": "esp",
          "gestion": "gest",
          "comercial": "coml",
          "operacion": "oper",
          "freelance": "free"
        }
      },
      "reglasBeneficiosCursos": {
        "altaRelacion": {
          "intermedio": {
            "min": 5,
            "max": 8
          },
          "avanzado": {
            "min": 10,
            "max": 15
          }
        },
        "bajaRelacion": {
          "min": 2,
          "max": 3
        },
        "sinRelacion": 0,
        "ascenso": 20,
        "ascensoReemplazaAumentoRegular": true,
        "ascensosPorTipo": {
          "directiva": 1,
          "operacion": 1,
          "comercial": 2,
          "gestion": 2,
          "especializado": 2,
          "freelance": 0
        },
        "ascensoSoloCursosAvanzados": true,
        "aumentoFreelance": 0
      }
    },
    "propiedades": {
      "criterioVinculosBienestar": "Los vínculos representan intereses asociados al tipo y características de cada propiedad. Los efectos base por tener vivienda y por coincidir con la preferencia del usuario se calculan aparte."
    }
  };
