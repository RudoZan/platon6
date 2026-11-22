// Static data for EF_eventos_situaciones.
window.EF_DATA = window.EF_DATA || {};
window.EF_DATA["EF_eventos_situaciones"] =   {
    "criteriosAplicacion": {
      "alcance": "Catalogo de reglas para documentar situaciones persistentes y eventos puntuales; no esta conectado al runtime.",
      "efectosBase": "Este archivo registra efectos y vínculos de situaciones y eventos; los puntajes base se documentan aparte.",
      "impactosEventos": "Los eventos tienen direccion positiva o negativa, pero no puntaje ni intensidad asignados hasta acordar una escala.",
      "preferencias": "EF_catalogo_perfil.json contiene las opciones de preferencias. Las relaciones entre preferencias de trabajo y tipos de trabajo se definen en este archivo.",
      "reglaDeAplicacion": "Este archivo configura efectos; el estado del personaje se consulta desde su almacenamiento externo. Generalizar vínculos de trabajo por tipo y área cuando aparezcan en al menos la mitad de las opciones correspondientes."
    },
    "situaciones": [
      {
        "id": "situacion_tener_vivienda",
        "nombre": "Tiene vivienda",
        "frecuencia": "permanente",
        "criterioAplicacion": "Se aplica según el estado externo del personaje; este catálogo no registra si tiene vivienda.",
        "efectoBase": {
          "bienestarFisico": 3,
          "bienestarEmocional": 8,
          "bienestarMental": 8
        },
        "ajusteBaseSiCoincideConPreferencia": {
          "bienestarEmocional": 5,
          "bienestarMental": 5
        },
        "criterioGeneralizacion": "Los efectos se definen por opcion_subtipo y agrupan los intereses presentes en al menos la mitad de las opciones de ese subtipo. La preferencia compatible se obtiene desde EF_catalogo_propiedades.json.",
        "efectosPorTipoVivienda": {
          "casa_condominio": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "seguridad",
                "vivienda"
              ],
              "bienestarMental": [
                "hobbies",
                "vivienda"
              ]
            },
            "negativos": {}
          },
          "depto_condominio": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "seguridad",
                "viajes"
              ],
              "bienestarMental": [
                "viajes",
                "vivienda"
              ]
            },
            "negativos": {
              "bienestarEmocional": [
                "naturaleza"
              ],
              "bienestarMental": [
                "naturaleza"
              ]
            }
          },
          "depto_barrio": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "viajes"
              ],
              "bienestarMental": [
                "viajes",
                "vivienda"
              ]
            },
            "negativos": {
              "bienestarEmocional": [
                "naturaleza"
              ],
              "bienestarMental": [
                "naturaleza"
              ]
            }
          },
          "depto_centrico": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "gastronomia",
                "movilidad",
                "viajes"
              ],
              "bienestarMental": [
                "movilidad",
                "viajes",
                "vivienda"
              ]
            },
            "negativos": {
              "bienestarEmocional": [
                "naturaleza"
              ],
              "bienestarMental": [
                "naturaleza"
              ]
            }
          },
          "casa_barrio": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "vivienda"
              ],
              "bienestarMental": [
                "educacion",
                "hobbies",
                "vivienda"
              ]
            },
            "negativos": {}
          },
          "parcela": {
            "positivos": {
              "bienestarFisico": [
                "mascotas",
                "naturaleza"
              ],
              "bienestarEmocional": [
                "familia",
                "mascotas",
                "naturaleza",
                "vivienda"
              ],
              "bienestarMental": [
                "hobbies",
                "mascotas",
                "naturaleza",
                "vivienda"
              ]
            },
            "negativos": {
              "bienestarMental": [
                "viajes"
              ]
            }
          }
        }
      },
      {
        "id": "situacion_no_tener_vivienda",
        "nombre": "No tiene vivienda",
        "frecuencia": "permanente",
        "criterioAplicacion": "Se aplica según el estado externo del personaje; este catálogo no registra si tiene vivienda.",
        "efectoBase": {
          "bienestarFisico": -5,
          "bienestarEmocional": -10,
          "bienestarMental": -10
        },
        "efectoPorInteres": {
          "bienestarEmocional": [
            "familia"
          ],
          "bienestarMental": [
            "gastronomia",
            "conciertos"
          ]
        },
        "negativos": {
          "bienestarEmocional": [
            "vivienda"
          ],
          "bienestarMental": [
            "tech"
          ]
        }
      },
      {
        "id": "situacion_tener_trabajo",
        "nombre": "Tiene trabajo",
        "frecuencia": "permanente",
        "criterioAplicacion": "Se aplica según el estado externo del personaje; este catálogo no registra si tiene trabajo.",
        "efectoBase": {
          "bienestarFisico": -2,
          "bienestarEmocional": 10,
          "bienestarMental": 10
        },
        "criterioGeneralizacion": "Por tipo, incluir vínculos presentes en al menos 6 de las 12 áreas. Por área, incluir vínculos presentes en al menos 3 de sus 6 tipos. Si un vínculo aparece en ambas direcciones dentro del mismo tipo, conservar la dirección definida para ese tipo; si no está definida, prevalece la más frecuente.",
        "efectosPorTipoTrabajo": {
          "directiva": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "tech",
                "seguridad"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "especializado": {
            "positivos": {
              "bienestarEmocional": [
                "hobbies"
              ],
              "bienestarMental": [
                "tech",
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "gestion": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "educacion",
                "seguridad"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "comercial": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "seguridad",
                "familia"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "operacion": {
            "positivos": {
              "bienestarFisico": [
                "deporte"
              ],
              "bienestarEmocional": [
                "familia"
              ]
            },
            "negativos": {
              "bienestarEmocional": [
                "seguridad"
              ]
            }
          },
          "freelance": {
            "positivos": {
              "bienestarFisico": [
                "naturaleza"
              ],
              "bienestarEmocional": [
                "familia",
                "viajes"
              ],
              "bienestarMental": [
                "tech",
                "educacion",
                "hobbies"
              ]
            },
            "negativos": {
              "bienestarEmocional": [
                "seguridad"
              ]
            }
          }
        },
        "efectosPorArea": {
          "tecnologia": {
            "positivos": {
              "bienestarEmocional": [
                "seguridad",
                "familia"
              ],
              "bienestarMental": [
                "tech",
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "arte_espectaculo": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "hobbies",
                "conciertos",
                "moda"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ],
              "bienestarEmocional": [
                "seguridad"
              ]
            }
          },
          "negocios_finanzas": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "seguridad",
                "tech"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "salud_bienestar": {
            "positivos": {
              "bienestarFisico": [
                "deporte"
              ],
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "deporte",
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "naturaleza"
              ]
            }
          },
          "educacion_conocimiento": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "ingenieria_construccion": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "tech"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte",
                "naturaleza"
              ]
            }
          },
          "comercio_servicios": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "seguridad"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "transporte_logistica": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "viajes"
              ],
              "bienestarMental": [
                "movilidad",
                "tech"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "seguridad_servicio_publico": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "seguridad",
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "naturaleza_turismo": {
            "positivos": {
              "bienestarFisico": [
                "naturaleza"
              ],
              "bienestarEmocional": [
                "familia",
                "viajes"
              ],
              "bienestarMental": [
                "naturaleza"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "oficios_tecnicos": {
            "positivos": {
              "bienestarEmocional": [
                "familia"
              ],
              "bienestarMental": [
                "tech",
                "hobbies"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          },
          "comunicacion_medios": {
            "positivos": {
              "bienestarEmocional": [
                "familia",
                "conciertos"
              ],
              "bienestarMental": [
                "tech",
                "educacion"
              ]
            },
            "negativos": {
              "bienestarFisico": [
                "deporte"
              ]
            }
          }
        },
        "preferenciasDeTrabajo": [
          {
            "preferenciaId": "tener_gente_a_cargo",
            "tipoIds": [
              "directiva",
              "gestion"
            ]
          },
          {
            "preferenciaId": "relacionarse_con_publico_o_clientes",
            "tipoIds": [
              "comercial",
              "freelance"
            ]
          },
          {
            "preferenciaId": "ingresos_estables",
            "tipoIds": [
              "directiva",
              "especializado",
              "gestion",
              "operacion"
            ]
          },
          {
            "preferenciaId": "trabajo_practico_terreno_menos_administrativo",
            "tipoIds": [
              "especializado",
              "comercial",
              "operacion",
              "freelance"
            ]
          }
        ]
      },
      {
        "id": "situacion_no_tener_trabajo",
        "nombre": "No tiene trabajo",
        "frecuencia": "permanente",
        "criterioAplicacion": "Se aplica según el estado externo del personaje; este catálogo no registra si tiene trabajo.",
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": -10,
          "bienestarMental": -10
        },
        "efectoPorInteres": {
          "bienestarEmocional": [
            "familia",
            "deporte"
          ],
          "bienestarMental": [
            "hobbies",
            "educacion"
          ]
        },
        "negativos": {
          "bienestarEmocional": [
            "seguridad",
            "gastronomia",
            "conciertos"
          ],
          "bienestarMental": [
            "seguridad",
            "mascotas"
          ]
        }
      },
      {
        "id": "situacion_estar_en_un_curso",
        "nombre": "Está realizando uno o más cursos",
        "frecuencia": "mensual_mientras_se_cumpla",
        "condiciones": {
          "formacion": {
            "cursosActivosMinimo": 1
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": -3,
          "bienestarMental": 5
        },
        "criterioGeneralizacion": "Por opcion_subtipo, incluir vínculos presentes en al menos la mitad de sus cursos. Por área, incluir vínculos presentes en al menos la mitad de los cursos asociados a esa área.",
        "efectosPorTipoCurso": {
          "capacitacion": {
            "positivos": {
              "bienestarMental": [
                "educacion"
              ]
            },
            "negativos": {}
          },
          "administracion": {
            "positivos": {
              "bienestarMental": [
                "educacion",
                "seguridad"
              ]
            },
            "negativos": {}
          },
          "comercial": {
            "positivos": {
              "bienestarMental": [
                "educacion",
                "seguridad"
              ]
            },
            "negativos": {}
          },
          "especializacion": {
            "positivos": {
              "bienestarMental": [
                "educacion",
                "tech",
                "hobbies"
              ]
            },
            "negativos": {}
          }
        }
      },
      {
        "id": "situacion_tener_vehiculo",
        "nombre": "Tiene vehículo",
        "frecuencia": "mensual_mientras_se_cumpla",
        "condiciones": {
          "transporte": {
            "vehiculoPropio": true
          }
        },
        "efectoBase": {
          "bienestarFisico": 3,
          "bienestarEmocional": 5,
          "bienestarMental": 2
        },
        "ajusteBaseSiCoincideConPreferencia": {
          "bienestarEmocional": 5,
          "bienestarMental": 2
        },
        "efectoPorInteres": {
          "bienestarMental": [
            "movilidad"
          ]
        },
        "efectosAdicionalesSiCoincideConPreferencia": {
          "positivos": {
            "bienestarEmocional": [
              "movilidad"
            ]
          },
          "negativos": {}
        }
      },
      {
        "id": "situacion_no_tener_vehiculo",
        "nombre": "No tiene vehículo",
        "frecuencia": "mensual_mientras_se_cumpla",
        "condiciones": {
          "transporte": {
            "vehiculoPropio": false
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "efectosPorPreferencia": {
          "locomocion_colectiva": {
            "positivos": {
              "bienestarEmocional": [
                "movilidad"
              ],
              "bienestarMental": [
                "movilidad"
              ]
            },
            "negativos": {}
          }
        }
      },
      {
        "id": "deudas_atrasadas",
        "nombre": "Tiene una o más deudas con pagos atrasados",
        "frecuencia": "mensual_mientras_se_cumpla",
        "condiciones": {
          "finanzas": {
            "deudasConAtrasoMinimo": 1
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "efectosPorInteres": [
          {
            "interesId": "seguridad",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "impedimento_fisico_o_lesion",
        "nombre": "Tiene un impedimento físico o una lesión vigente",
        "frecuencia": "mientras_se_mantenga",
        "condiciones": {
          "salud": {
            "impedimentoFisicoOVigente": true
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "impactoBaseCualitativo": [
          {
            "negativos": {
              "bienestarFisico": true,
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorInteres": [
          {
            "interesId": "deporte",
            "cuando": "el_impedimento_o_lesion_limita_actividad_fisica_de_interes",
            "negativos": {
              "bienestarFisico": true,
              "bienestarEmocional": true
            }
          }
        ]
      },
      {
        "id": "enfermedad_vigente",
        "nombre": "Tiene una enfermedad vigente",
        "frecuencia": "mientras_se_mantenga",
        "condiciones": {
          "salud": {
            "enfermedadVigente": true
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "impactoBaseCualitativo": [
          {
            "negativos": {
              "bienestarFisico": true,
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorInteres": []
      },
      {
        "id": "convivencia_temporal_con_visita",
        "nombre": "Un amigo o pariente debe vivir temporalmente en el hogar",
        "frecuencia": "mientras_se_mantenga",
        "condiciones": {
          "hogar": {
            "convivienteTemporal": true
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "efectosPorInteres": [
          {
            "interesId": "familia",
            "cuando": "la_persona_conviviente_es_familiar_y_la_convivencia_es_bien_recibida",
            "positivos": {
              "bienestarEmocional": true
            }
          },
          {
            "interesId": "vivienda",
            "cuando": "la_convivencia_genera_hacinamiento_o_dificultades_en_el_hogar",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "mascota_enferma",
        "nombre": "Tiene una mascota enferma que requiere cuidados",
        "frecuencia": "mientras_se_mantenga",
        "condiciones": {
          "mascota": {
            "tieneMascota": true,
            "mascotaEnferma": true
          }
        },
        "efectoBase": {
          "bienestarFisico": 0,
          "bienestarEmocional": 0,
          "bienestarMental": 0
        },
        "efectosPorInteres": [
          {
            "interesId": "mascotas",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      }
    ],
    "eventos": [
      {
        "id": "reparacion_urgente_vivienda",
        "nombre": "Reparación urgente en la vivienda",
        "frecuencia": "una_vez",
        "condiciones": {
          "vivienda": {
            "existe": true,
            "requiereReparacion": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "vivienda",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "vivienda",
            "preferenciaId": "condominio_elegante",
            "cuando": "la_vivienda_afectada_coincide_con_preferencia",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "conectividad_central",
            "cuando": "la_vivienda_afectada_coincide_con_preferencia",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "vida_de_barrio",
            "cuando": "la_vivienda_afectada_coincide_con_preferencia",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "parcela_agrado",
            "cuando": "la_vivienda_afectada_coincide_con_preferencia",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "celebracion_familiar",
        "nombre": "Celebración o encuentro con familiares y amistades",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "participacionSocial": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "familia",
            "positivos": {
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "emergencia_mascota",
        "nombre": "Mascota requiere atención veterinaria urgente",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "mascotaRequiereAtencion": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "mascotas",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "falla_tecnologica",
        "nombre": "Falla de una herramienta tecnológica de uso habitual",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "herramientaTecnologicaFueraDeServicio": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "tech",
            "negativos": {
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "salida_gastronomica",
        "nombre": "Salida gastronómica compartida",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "salidaGastronomicaRealizada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "gastronomia",
            "positivos": {
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "lesion_deportiva",
        "nombre": "Lesión durante una actividad deportiva",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "lesionDuranteActividadFisica": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "deporte",
            "negativos": {
              "bienestarFisico": true,
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "actividad_estilo_personal",
        "nombre": "Participa en una actividad de moda o cuidado de imagen que disfruta",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "actividadDeEstiloRealizada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "moda",
            "positivos": {
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "torneo_videojuegos_interrumpido",
        "nombre": "Interrupción de una sesión o torneo de videojuegos esperado",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "actividadGamingInterrumpida": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "gaming",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "reconocimiento_trabajo_dependiente_medio",
        "nombre": "Recibe reconocimiento o incentivo en trabajo de ingreso medio",
        "frecuencia": "una_vez",
        "condiciones": {
          "trabajo": {
            "tipoIds": [
              "gestion",
              "comercial"
            ],
            "reconocimientoRecibido": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "seguridad",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "trabajo",
            "preferenciaId": "ingresos_estables",
            "cuando": "tipo_trabajo_gestion",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "relacionarse_con_publico_o_clientes",
            "cuando": "tipo_trabajo_comercial",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "atraso_sueldo_minimo",
        "nombre": "Atraso en el pago de un trabajo de sueldo mínimo",
        "frecuencia": "una_vez",
        "condiciones": {
          "trabajo": {
            "tipoId": "operacion",
            "pagoAtrasado": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "seguridad",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "trabajo",
            "preferenciaId": "ingresos_estables",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "ascenso_trabajo_administrativo",
        "nombre": "Recibe un ascenso en un trabajo administrativo de sueldo alto",
        "frecuencia": "una_vez",
        "condiciones": {
          "trabajo": {
            "tipoIds": [
              "directiva",
              "especializado"
            ],
            "ascensoRecibido": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "educacion",
            "positivos": {
              "bienestarMental": true
            }
          },
          {
            "interesId": "seguridad",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "trabajo",
            "preferenciaId": "ingresos_estables",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "tener_gente_a_cargo",
            "cuando": "tipo_trabajo_directiva",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "mejora_vivienda_preferida",
        "nombre": "Mejora o reparación exitosa de la vivienda preferida",
        "frecuencia": "una_vez",
        "condiciones": {
          "vivienda": {
            "mejoraCompletada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "vivienda",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "vivienda",
            "preferenciaId": "condominio_elegante",
            "cuando": "la_vivienda_mejorada_coincide_con_preferencia",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "conectividad_central",
            "cuando": "la_vivienda_mejorada_coincide_con_preferencia",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "vida_de_barrio",
            "cuando": "la_vivienda_mejorada_coincide_con_preferencia",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "vivienda",
            "preferenciaId": "parcela_agrado",
            "cuando": "la_vivienda_mejorada_coincide_con_preferencia",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "transporte_preferido_disponible",
        "nombre": "El medio de transporte preferido queda disponible y operativo",
        "frecuencia": "una_vez",
        "condiciones": {
          "transporte": {
            "medioPreferidoDisponible": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "movilidad",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": [
          {
            "categoria": "transporte",
            "preferenciaId": "suv_camioneta",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "citycar_moto",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "locomocion_colectiva",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "deportivo_lujo",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "contratiempo_transporte_preferido",
        "nombre": "Contratiempo impide usar el medio de transporte preferido",
        "frecuencia": "una_vez",
        "condiciones": {
          "transporte": {
            "medioPreferidoNoDisponible": true
          }
        },
        "efectosPorInteres": [],
        "efectosPorPreferencia": [
          {
            "categoria": "transporte",
            "preferenciaId": "suv_camioneta",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "citycar_moto",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "locomocion_colectiva",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "transporte",
            "preferenciaId": "deportivo_lujo",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "cambio_favorable_trabajo_preferido",
        "nombre": "Cambio favorable en el trabajo elegido como preferencia",
        "frecuencia": "una_vez",
        "condiciones": {
          "trabajo": {
            "cambioFavorable": true
          }
        },
        "efectosPorInteres": [],
        "efectosPorPreferencia": [
          {
            "categoria": "trabajo",
            "preferenciaId": "tener_gente_a_cargo",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "relacionarse_con_publico_o_clientes",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "ingresos_estables",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "trabajo_practico_terreno_menos_administrativo",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "contratiempo_trabajo_preferido",
        "nombre": "Contratiempo en el trabajo elegido como preferencia",
        "frecuencia": "una_vez",
        "condiciones": {
          "trabajo": {
            "contratiempoRelevante": true
          }
        },
        "efectosPorInteres": [],
        "efectosPorPreferencia": [
          {
            "categoria": "trabajo",
            "preferenciaId": "tener_gente_a_cargo",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "relacionarse_con_publico_o_clientes",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "ingresos_estables",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          },
          {
            "categoria": "trabajo",
            "preferenciaId": "trabajo_practico_terreno_menos_administrativo",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ]
      },
      {
        "id": "compania_mascota",
        "nombre": "Comparte un momento positivo con una mascota",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "momentoPositivoConMascota": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "mascotas",
            "positivos": {
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "avance_tecnologico_personal",
        "nombre": "Resuelve una tarea personal con una herramienta tecnológica",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "tareaTecnologicaResuelta": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "tech",
            "positivos": {
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "viaje_realizado",
        "nombre": "Realiza un viaje planificado",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "viajePlanificadoRealizado": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "viajes",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "concierto_asistido",
        "nombre": "Asiste al concierto o festival planificado",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "conciertoAsistido": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "conciertos",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "curso_interrumpido",
        "nombre": "Interrupción imprevista de un curso iniciado",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "cursoInterrumpidoImprevistamente": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "educacion",
            "negativos": {
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "obstaculo_hobby",
        "nombre": "Un imprevisto impide realizar un pasatiempo esperado",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "hobbyImpedidoPorImprevisto": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "hobbies",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "salida_naturaleza",
        "nombre": "Realiza una salida recreativa en la naturaleza",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "salidaNaturalezaRealizada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "naturaleza",
            "positivos": {
              "bienestarFisico": true,
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "contratiempo_actividad_moda",
        "nombre": "Un imprevisto impide una actividad de estilo personal planificada",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "actividadDeEstiloCancelada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "moda",
            "negativos": {
              "bienestarEmocional": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "sesion_gaming_disfrutada",
        "nombre": "Disfruta una sesión de videojuegos planificada",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "sesionGamingDisfrutada": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "gaming",
            "positivos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      },
      {
        "id": "desacuerdo_familiar",
        "nombre": "Desacuerdo significativo con familiares o amistades",
        "frecuencia": "una_vez",
        "condiciones": {
          "evento": {
            "desacuerdoSocialSignificativo": true
          }
        },
        "efectosPorInteres": [
          {
            "interesId": "familia",
            "negativos": {
              "bienestarEmocional": true,
              "bienestarMental": true
            }
          }
        ],
        "efectosPorPreferencia": []
      }
    ]
  };
