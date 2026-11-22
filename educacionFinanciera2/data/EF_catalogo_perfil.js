// Static data for EF_catalogo_perfil.
window.EF_DATA = window.EF_DATA || {};
window.EF_DATA["EF_catalogo_perfil"] =   {
    "version": 1,
    "proposito": "Catalogo central de los datos y evaluaciones que definen el perfil inicial del personaje.",
    "intereses": {
      "reglasSeleccion": {
        "estrellasTotalesMaximas": 25,
        "estrellasPorInteresMinimas": 0,
        "estrellasPorInteresMaximas": 3,
        "interesesPrioritariosMinimos": 1,
        "estrellasMinimasParaPriorizar": 2
      },
      "opciones": [
        {
          "id": "vivienda",
          "nombre": "Hogar y Decoración"
        },
        {
          "id": "movilidad",
          "nombre": "Comodidad al movilizarse"
        },
        {
          "id": "mascotas",
          "nombre": "Mascotas y Animales"
        },
        {
          "id": "tech",
          "nombre": "Tecnología y Herramientas"
        },
        {
          "id": "viajes",
          "nombre": "Viajes y Vacaciones"
        },
        {
          "id": "gastronomia",
          "nombre": "Gastronomía y Salidas"
        },
        {
          "id": "conciertos",
          "nombre": "Conciertos y Festivales"
        },
        {
          "id": "educacion",
          "nombre": "Educación y Aprendizaje"
        },
        {
          "id": "seguridad",
          "nombre": "Paz Financiera y Reservas"
        },
        {
          "id": "hobbies",
          "nombre": "Hobbies y Pasatiempos"
        },
        {
          "id": "deporte",
          "nombre": "Deporte y Salud Física"
        },
        {
          "id": "naturaleza",
          "nombre": "Naturaleza y Vida al Aire Libre"
        },
        {
          "id": "moda",
          "nombre": "Moda, Imagen y Estilo"
        },
        {
          "id": "gaming",
          "nombre": "Gaming y Ocio Digital"
        },
        {
          "id": "familia",
          "nombre": "Familia y Amigos"
        }
      ]
    },
    "preferencias": {
      "reglasSeleccion": {
        "vivienda": {
          "minimas": 2,
          "maximas": 2
        },
        "trabajo": {
          "minimas": 2,
          "maximas": 2
        },
        "transporte": {
          "minimas": 2,
          "maximas": 2
        }
      },
      "vivienda": [
        {
          "id": "condominio_elegante",
          "nombre": "Condominio Elegante"
        },
        {
          "id": "conectividad_central",
          "nombre": "Conectividad Central"
        },
        {
          "id": "vida_de_barrio",
          "nombre": "Vida de Barrio"
        },
        {
          "id": "parcela_agrado",
          "nombre": "Parcela de Agrado"
        }
      ],
      "trabajo": [
        {
          "id": "tener_gente_a_cargo",
          "nombre": "Tener personal o gente a cargo"
        },
        {
          "id": "relacionarse_con_publico_o_clientes",
          "nombre": "Relacionarse con público o clientes"
        },
        {
          "id": "ingresos_estables",
          "nombre": "Ingresos estables mensuales"
        },
        {
          "id": "trabajo_practico_terreno_menos_administrativo",
          "nombre": "Trabajo más práctico o de terreno y menos administrativo"
        }
      ],
      "transporte": [
        {
          "id": "suv_camioneta",
          "nombre": "SUV o camioneta"
        },
        {
          "id": "citycar_moto",
          "nombre": "City Car o Moto"
        },
        {
          "id": "locomocion_colectiva",
          "nombre": "Locomoción colectiva"
        },
        {
          "id": "deportivo_lujo",
          "nombre": "Deportivo o de lujo"
        }
      ]
    },
    "tests": {
      "perfilInversionista": {
        "nombre": "Test de Perfil de Inversionista",
        "tipo": "puntaje",
        "preguntas": [
          {
            "id": "objetivo_inversion",
            "texto": "¿Cuál es tu objetivo principal al momento de invertir?",
            "opciones": [
              {
                "id": "proteger_capital",
                "texto": "Proteger mi capital y evitar pérdidas a toda costa",
                "puntaje": 1
              },
              {
                "id": "rentabilidad_moderada",
                "texto": "Rentabilidad moderada asumiendo algo de fluctuación y posibles pérdidas",
                "puntaje": 2
              },
              {
                "id": "maximizar_ganancias",
                "texto": "Maximizar ganancias asumiendo alta volatilidad y riesgos",
                "puntaje": 3
              }
            ]
          },
          {
            "id": "reaccion_caida",
            "texto": "¿Qué harías si tu inversión pierde un 15% de su valor en un solo mes?",
            "opciones": [
              {
                "id": "vender_inmediatamente",
                "texto": "Vendo inmediatamente todo para no seguir perdiendo",
                "puntaje": 1
              },
              {
                "id": "esperar_recuperacion",
                "texto": "Espero unos meses para ver si mi inversión se recupera",
                "puntaje": 2
              },
              {
                "id": "invertir_mas",
                "texto": "Aprovecho los precios bajos para invertir más",
                "puntaje": 3
              }
            ]
          },
          {
            "id": "horizonte_inversion",
            "texto": "¿Por cuánto tiempo estás dispuesto a mantener tu inversión sin retirar el dinero?",
            "opciones": [
              {
                "id": "menos_un_ano",
                "texto": "Menos de 1 año; necesito liquidez o acceso inmediato",
                "puntaje": 1
              },
              {
                "id": "uno_a_cinco_anos",
                "texto": "Entre 1 y 5 años; mediano plazo",
                "puntaje": 2
              },
              {
                "id": "mas_cinco_anos",
                "texto": "Más de 5 años; largo plazo",
                "puntaje": 3
              }
            ]
          },
          {
            "id": "reaccion_emocional_perdida",
            "texto": "Si una inversión de alto riesgo cayera fuertemente, ¿cuál sería tu reacción emocional?",
            "opciones": [
              {
                "id": "gran_angustia",
                "texto": "Gran angustia; preferiría no volver a invertir en eso",
                "puntaje": 1
              },
              {
                "id": "preocupacion_evaluar",
                "texto": "Preocupación, pero evaluaría la situación con calma",
                "puntaje": 2
              },
              {
                "id": "aceptar_riesgo",
                "texto": "Tranquilidad; entiendo que el riesgo es parte del retorno",
                "puntaje": 3
              }
            ]
          },
          {
            "id": "porcentaje_ingresos_invertir",
            "texto": "¿Qué porcentaje de tus ingresos o ahorros mensuales estás dispuesto a destinar a inversión?",
            "opciones": [
              {
                "id": "menos_diez_por_ciento",
                "texto": "Menos del 10%; solo pequeños excedentes",
                "puntaje": 1
              },
              {
                "id": "diez_a_veinticinco_por_ciento",
                "texto": "Entre 10% y 25%; ahorro e inversión sostenida",
                "puntaje": 2
              },
              {
                "id": "mas_veinticinco_por_ciento",
                "texto": "Más del 25%; apuesta fuerte al crecimiento",
                "puntaje": 3
              }
            ]
          }
        ],
        "resultado": {
          "puntajeMinimo": 5,
          "puntajeMaximo": 15,
          "categorias": [
            {
              "id": "conservador",
              "puntajeMinimo": 5,
              "puntajeMaximo": 8
            },
            {
              "id": "moderado",
              "puntajeMinimo": 9,
              "puntajeMaximo": 11
            },
            {
              "id": "arriesgado",
              "puntajeMinimo": 12,
              "puntajeMaximo": 15
            }
          ]
        },
        "fuente": "Código de la aplicación: data/catalogs.js y js/ui-personal.js"
      },
      "dilemasFinancieros": {
        "nombre": "Dilemas Financieros",
        "preguntas": [
          {
            "id": "compra_computador",
            "texto": "Tu computador tiene varios años, es lento y debes reiniciarlo con frecuencia. Decides comprar uno nuevo. ¿Qué haces?",
            "opciones": [
              {
                "id": "comprar_a_credito",
                "texto": "Lo compraría a crédito en 12 cuotas mensuales de $57800."
              },
              {
                "id": "ahorrar_antes_de_comprar",
                "texto": "Juntaría $50000 cada mes durante un año antes de comprarlo."
              }
            ]
          },
          {
            "id": "ahorro_sorpresa",
            "texto": "Cuando entraste a trabajar, aceptaste que se descontara automáticamente de tu sueldo un monto destinado a la Cuenta 2 de tu AFP. Lo olvidaste y recién descubres que, después de muchos meses, tienes $1.200.000. Es tu único ahorro y no tienes deudas. ¿Qué haces?",
            "opciones": [
              {
                "id": "mantener_fondo_emergencia",
                "texto": "Lo mantengo ahí como fondo de emergencia."
              },
              {
                "id": "retirar_parte_para_un_gusto",
                "texto": "Saco una buena parte para darme un gusto."
              },
              {
                "id": "retirar_todo_para_invertir",
                "texto": "Retiro todo el dinero para invertirlo en algo más rentable."
              }
            ]
          },
          {
            "id": "aumento_de_sueldo",
            "texto": "Recibes un aumento de sueldo de $200.000 mensuales. No tienes deudas, pero vives al justo. ¿Qué haces?",
            "opciones": [
              {
                "id": "aumentar_gastos_mensuales",
                "texto": "Mejoro inmediatamente mi estilo de vida e incorporo la mayor parte del aumento a mis gastos mensuales."
              },
              {
                "id": "destinar_aumento_ahorro_inversion",
                "texto": "Mantengo mi nivel de gastos actual y uso el aumento para ahorrar o invertir."
              }
            ]
          }
        ],
        "interpretacion": "Pendiente de definir a partir de las preguntas y criterios del test."
      }
    }
  };
