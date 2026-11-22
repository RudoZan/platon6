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
      "textos": {
        "instruccion": "Marca con estrellas las actividades y aspectos que te motivan y te hacen sentir bien.",
        "distribucion": "Distribuye hasta {{maximo}} estrellas (no es necesario ocuparlas todas).",
        "interaccion": "Pincha las estrellas para agregar o quitar.",
        "contador": "{{asignadas}} / {{maximo}} estrellas",
        "prioridadPendiente": "Por favor, prioriza al menos un interés asignándole {{minimoPrioridad}} o más estrellas.",
        "prioridadCompleta": "Ya priorizaste al menos un interés.",
        "maximoAlcanzado": "Has alcanzado el máximo de {{maximo}} estrellas disponibles.",
        "agregarEstrella": "Agregar estrella a {{interes}}",
        "quitarOajustarEstrellas": "Pincha las estrellas para agregar o quitar."
      },
      "opciones": [
        {
          "id": "vivienda",
          "nombre": "Hogar y Decoración",
          "icono": "🏠",
          "estrellasIniciales": 1
        },
        {
          "id": "movilidad",
          "nombre": "Comodidad al movilizarse",
          "icono": "🚗",
          "estrellasIniciales": 1
        },
        {
          "id": "mascotas",
          "nombre": "Mascotas y Animales",
          "icono": "🐾",
          "estrellasIniciales": 1
        },
        {
          "id": "tech",
          "nombre": "Tecnología y Herramientas",
          "icono": "💻",
          "estrellasIniciales": 1
        },
        {
          "id": "viajes",
          "nombre": "Viajes y Vacaciones",
          "icono": "✈️",
          "estrellasIniciales": 1
        },
        {
          "id": "gastronomia",
          "nombre": "Gastronomía y Salidas",
          "icono": "🍽️",
          "estrellasIniciales": 1
        },
        {
          "id": "conciertos",
          "nombre": "Conciertos y Festivales",
          "icono": "🎸",
          "estrellasIniciales": 1
        },
        {
          "id": "educacion",
          "nombre": "Educación y Aprendizaje",
          "icono": "📚",
          "estrellasIniciales": 1
        },
        {
          "id": "seguridad",
          "nombre": "Paz Financiera y Reservas",
          "icono": "🛡️",
          "estrellasIniciales": 1
        },
        {
          "id": "hobbies",
          "nombre": "Hobbies y Pasatiempos",
          "icono": "🎨",
          "estrellasIniciales": 1
        },
        {
          "id": "deporte",
          "nombre": "Deporte y Salud Física",
          "icono": "🏋️",
          "estrellasIniciales": 1
        },
        {
          "id": "naturaleza",
          "nombre": "Naturaleza y Vida al Aire Libre",
          "icono": "🏕️",
          "estrellasIniciales": 1
        },
        {
          "id": "moda",
          "nombre": "Moda, Imagen y Estilo",
          "icono": "👗",
          "estrellasIniciales": 1
        },
        {
          "id": "gaming",
          "nombre": "Gaming y Ocio Digital",
          "icono": "🎮",
          "estrellasIniciales": 1
        },
        {
          "id": "familia",
          "nombre": "Familia y Amigos",
          "icono": "🤝",
          "estrellasIniciales": 1
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
      "textos": {
        "instruccion": "Elige las opciones de vivienda, trabajo y transporte que más te acomodan. Selecciona 2 en cada caso: no refleja tu situación actual, sino lo que prefieres o valoras más."
      },
      "vivienda": [
        {
          "id": "condominio_elegante",
          "nombre": "Condominio elegante",
          "icono": "🏠",
          "descripcion": "Casa o departamento. Seguridad y espacios comunes."
        },
        {
          "id": "conectividad_central",
          "nombre": "Departamento Céntrico",
          "icono": "🏙️",
          "descripcion": "Cerca de servicios y transporte."
        },
        {
          "id": "vida_de_barrio",
          "nombre": "Casa o departamento en vida de barrio",
          "icono": "🏡",
          "descripcion": "Comercio local y vida de barrio."
        },
        {
          "id": "parcela_agrado",
          "nombre": "Parcela de agrado",
          "icono": "🌳",
          "descripcion": "Espacio y naturaleza."
        }
      ],
      "trabajo": [
        {
          "id": "tener_gente_a_cargo",
          "nombre": "Tener personal o gente a cargo",
          "icono": "👥",
          "descripcion": "Liderar y coordinar un equipo."
        },
        {
          "id": "relacionarse_con_publico_o_clientes",
          "nombre": "Relacionarse con público o clientes",
          "icono": "🤝",
          "descripcion": "Atención y trato directo."
        },
        {
          "id": "ingresos_estables",
          "nombre": "Ingresos estables mensuales",
          "icono": "💰",
          "descripcion": "Ingresos fijo y previsibles."
        },
        {
          "id": "trabajo_practico_terreno_menos_administrativo",
          "nombre": "Labores de oficio o dinámicas",
          "icono": "🛠️",
          "descripcion": "Trabajo más práctico o de terreno y menos administrativo"
        }
      ],
      "transporte": [
        {
          "id": "suv_camioneta",
          "nombre": "SUV o camioneta",
          "icono": "🚙",
          "descripcion": "Espacio para pasajeros y carga."
        },
        {
          "id": "citycar_moto",
          "nombre": "City Car o Moto",
          "icono": "🛵",
          "descripcion": "Traslado ágil y económico."
        },
        {
          "id": "locomocion_colectiva",
          "nombre": "Locomoción colectiva",
          "icono": "🚌",
          "descripcion": "Bus, metro y transporte compartido."
        },
        {
          "id": "deportivo_lujo",
          "nombre": "Deportivo o de lujo",
          "icono": "🏎️",
          "descripcion": "Diseño, comodidad y alto rendimiento."
        }
      ]
    },
    "resumen": {
      "maximoInteresesMostrados": 4,
      "textos": {
        "titulo": "Resumen de tu perfil",
        "intereses": "En tu vida personal, priorizas dedicar tiempo y recursos a ",
        "entreOtros": ", entre otros",
        "sinIntereses": "(no has marcado intereses)",
        "vivienda": "para vivir prefieres ",
        "trabajo": "en lo laboral prefieres ",
        "transporte": "para movilizarte, ",
        "sinPreferencias": "(no has marcado tus preferencias)",
        "perfilInversionista": "Tu perfil de inversionista es ",
        "sinPerfilInversionista": "(no has hecho el test de perfil de riesgo de inversionista)"
      }
    },
    "tests": {
      "perfilInversionista": {
        "nombre": "Test de Perfil de Inversionista",
        "icono": "📝",
        "tipo": "puntaje",
        "textos": {
          "descripcion": "El perfil de inversionista evalúa tu tolerancia a las fluctuaciones del mercado y el plazo de tus inversiones. Con estas respuestas, clasifica tu perfil en tres categorías: Conservador, Moderado o Arriesgado.",
          "sinResultado": "Aún no has realizado el test de perfil de inversionista",
          "sinResultadoDetalle": "Responde 5 breves preguntas para identificar tu tolerancia a la volatilidad y los instrumentos recomendados.",
          "irAlTest": "Ir al test",
          "salirDelTest": "Salir del test",
          "pregunta": "Pregunta {{actual}} de {{total}}",
          "preguntaNumero": "Pregunta {{numero}}",
          "respondidas": "{{respondidas}} de {{total}} respondidas",
          "anterior": "◀ Anterior",
          "siguiente": "Siguiente ▶",
          "puntoAbreviado": "pto",
          "puntosAbreviado": "pts",
          "perfilDeterminado": "Tu Perfil Determinado",
          "puntaje": "Puntaje obtenido: {{puntaje}} de {{maximo}} puntos",
          "incompleto": "Aún no has completado el test",
          "preguntasPendientes": "Preguntas pendientes: {{lista}}"
        },
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
              "nombre": "Conservador",
              "descripcion": "Priorizas la seguridad y preservación de tu capital por sobre la rentabilidad. Prefieres retornos garantizados y estabilidad sin sobresaltos.",
              "puntajeMinimo": 5,
              "puntajeMaximo": 8
            },
            {
              "id": "moderado",
              "nombre": "Moderado",
              "descripcion": "Buscas rentabilidad por encima de la inflación aceptando oscilaciones moderadas a mediano plazo. Equilibras crecimiento y seguridad.",
              "puntajeMinimo": 9,
              "puntajeMaximo": 11
            },
            {
              "id": "arriesgado",
              "nombre": "Arriesgado",
              "descripcion": "Buscas maximizar el crecimiento de tu patrimonio a largo plazo y toleras caídas temporales sabiendo que el tiempo compensa la volatilidad.",
              "puntajeMinimo": 12,
              "puntajeMaximo": 15
            }
          ]
        },
        "fuente": "Código de la aplicación: data/catalogs.js y js/ui-personal.js"
      },
      "dilemasFinancieros": {
        "nombre": "Dilemas Financieros",
        "textos": {
          "cerrar": "Cerrar"
        },
        "preguntas": [
          {
            "id": "compra_computador",
            "nombre": "Compra de computador",
            "icono": "💻",
            "texto": "Tienes un computador de varios años que está lento y debes reiniciarlo con frecuencia. Decides comprar uno nuevo que cuesta $600.000 y tiene todo lo que necesitas. ¿Qué haces?",
            "opciones": [
              {
                "id": "comprar_a_credito",
                "texto": "Lo compraría a crédito en 12 cuotas mensuales de $57.800."
              },
              {
                "id": "ahorrar_antes_de_comprar",
                "texto": "Ahorraría $50.000 cada mes durante un año antes de comprarlo."
              }
            ]
          },         
          {
            "id": "ahorro_sorpresa",
            "nombre": "Ahorro sorpresa",
            "icono": "💰",
            "texto": "Cuando empezaste a trabajar, aceptaste que se descontara automáticamente de tu sueldo un monto destinado a la Cuenta 2 de tu AFP. Olvidaste ese ahorro y recién descubres que, después de varios meses, tienes $1.200.000. Es tu único ahorro y no tienes deudas. ¿Qué haces?",
            "opciones": [
              {
                "id": "mantener_fondo_emergencia",
                "texto": "Lo dejaría ahí como fondo de emergencia."
              },
              {
                "id": "retirar_parte_para_un_gusto",
                "texto": "Retiraría una parte para darme un gusto."
              },
              {
                "id": "retirar_todo_para_invertir",
                "texto": "Retiraría todo el dinero para invertirlo en algo más rentable."
              }
            ]
          },
          {
            "id": "aumento_de_sueldo",
            "nombre": "Aumento de sueldo",
            "icono": "📈",
            "texto": "Recibes un aumento de sueldo de $200.000 mensuales. No tienes deudas, pero vives al justo. ¿Qué haces?",
            "opciones": [
              {
                "id": "aumentar_gastos_mensuales",
                "texto": "Mejoraría inmediatamente mi estilo de vida e incorporaría la mayor parte del aumento a mis gastos mensuales."
              },
              {
                "id": "destinar_aumento_ahorro_inversion",
                "texto": "Mantendría mi nivel de gastos actual y usaría el aumento para ahorrar o invertir."
              }
            ]
          },
          {
            "id": "auto_nuevo",
            "nombre": "El auto",
            "icono": "🚗",
            "texto": "Tienes un automóvil que funciona bien, pero tiene muchos años. ¿Qué haces?",
            "opciones": [
              {
                "id": "actualizar_auto",
                "texto": "Lo cambiaría por uno más nuevo, aunque tuviera que comprarlo a crédito."
              },
              {
                "id": "retirar_parte_para_un_gusto",
                "texto": "Seguiría usando el mío mientras funcione para priorizar otros gastos o inversiones."
              }            ]
          }, 
          {
            "id": "series_de_streaming",
            "nombre": "Series y películas",
            "icono": "📺",
            "texto": "Te gustan varias series que están repartidas entre dos plataformas de streaming. ¿Qué haces?",
            "opciones": [
              {
                "id": "contrato_las_dos",
                "texto": "Contrataría ambas plataformas para no perderme ninguna serie o película."
              },
              {
                "id": "alterno_entre_las_dos",
                "texto": "Alternaría entre las dos plataformas. Contrataría una por unos meses y luego cancelaría el servicio para contratar la otra."
              }            ]
          },    
                    {
            "id": "tarjetas",
            "nombre": "Las Tarjetas",
            "icono": "💳",
            "texto": "Tienes tres tarjetas, de débito y crédito. ¿Qué haces?",
            "opciones": [
              {
                "id": "ando_con_todas",
                "texto": "Ando siempre con todas las tarjetas por si las necesitara."
              },
              {
                "id": "solo_la_que_uso",
                "texto": "Saldría solo con la tarjeta o las tarjetas que sé que usaré."
              }       
            ]
          }
        ]
      }
    }
  };
