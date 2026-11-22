// Static data for EF_secciones_opciones_APP.
window.EF_DATA = window.EF_DATA || {};
window.EF_DATA["EF_secciones_opciones_APP"] =   {
    "proposito": "Organizar las opciones y espacios disponibles en la aplicación del simulador financiero. La navegación es libre una vez iniciada la simulación.",
    "requisitoInicio": "Antes de iniciar la simulación, la persona debe configurar los datos requeridos de su perfil.",
    "secciones": [
      {
        "id": "mi_perfil",
        "nombre": "Mi perfil",
        "orden": 1,
        "subsecciones": [
          {
            "id": "perfil_intereses",
            "nombre": "Intereses",
            "grupos": [
              {
                "id": "perfil_datos_intereses",
                "opciones": [
                  {
                    "tipo": "opcion",
                    "id": "intereses",
                    "nombre": "Intereses y prioridades",
                    "requeridaParaIniciar": true,
                    "editableDuranteSimulacion": true
                  }
                ]
              }
            ]
          },
          {
            "id": "perfil_preferencias",
            "nombre": "Preferencias",
            "grupos": [
              {
                "id": "perfil_datos_preferencias",
                "opciones": [
                  {
                    "tipo": "opcion",
                    "id": "preferencias",
                    "nombre": "Preferencias de vida",
                    "requeridaParaIniciar": true,
                    "editableDuranteSimulacion": true,
                  }
                ]
              }
            ]
          },
          {
            "id": "perfil_riesgo",
            "nombre": "Perfil de riesgo",
            "grupos": [
              {
                "id": "perfil_datos_riesgo",
                "opciones": [
                  {
                    "tipo": "opcion",
                    "id": "perfil_riesgo",
                    "nombre": "Perfil de riesgo",
                    "requeridaParaIniciar": false,
                    "editableDuranteSimulacion": true
                  }
                ]
              }
            ]
          },
          {
            "id": "perfil_dilemas_financieros",
            "nombre": "Dilemas",
            "grupos": [
              {
                "id": "perfil_datos_dilemas",
                "opciones": [
                  {
                    "tipo": "opcion",
                    "id": "reflexiones_personales",
                    "nombre": "Dilemas",
                    "requeridaParaIniciar": false,
                    "editableDuranteSimulacion": true,
                    "contribuyeAlPerfil": true
                  }
                ]
              }
            ]
          },
          {
            "id": "perfil_resumen",
            "nombre": "Resumen",
            "grupos": []
          }
        ]
      },
      {
        "id": "situacion_actual",
        "nombre": "Mi Situación",
        "orden": 2,
        "subsecciones": [
          {
            "id": "resumen_situacion",
            "nombre": "Resumen de situación actual",
            "grupos": [
              {
                "id": "situacion_resumenes",
                "opciones": [
                  {
                    "id": "bienestar",
                    "nombre": "Bienestar",
                    "presentacion": "indicador_directo"
                  },
                  {
                    "id": "posesiones",
                    "nombre": "Posesiones actuales",
                    "presentacion": "resumen_iconos_texto_breve"
                  },
                  {
                    "id": "servicios_contratados",
                    "nombre": "Servicios contratados",
                    "presentacion": "resumen_iconos_texto_breve"
                  },
                  {
                    "id": "trabajo_estudios_actuales",
                    "nombre": "Trabajo y estudios actuales",
                    "presentacion": "resumen_iconos_texto_breve"
                  }
                ]
              }
            ]
          },
          {
            "id": "finanzas_personales",
            "nombre": "Finanzas personales",
            "grupos": [
              {
                "id": "situacion_finanzas_personales",
                "opciones": [
                  {
                    "id": "presupuesto_mensual",
                    "nombre": "Presupuesto mensual",
                    "presentacion": "boton_acceso",
                    "accion": "abrir_presupuesto"
                  },
                  {
                    "id": "patrimonio",
                    "nombre": "Patrimonio",
                    "presentacion": "boton_acceso",
                    "accion": "abrir_patrimonio"
                  }
                ]
              }
            ]
          },
          {
            "id": "novedades_situacion",
            "nombre": "Novedades de situación",
            "grupos": [
              {
                "id": "situacion_alertas",
                "opciones": [
                  {
                    "id": "alertas_novedades_situacion_general",
                    "nombre": "Alertas y novedades",
                    "presentacion": "teletipo_alertas",
                    "puedeMostrar": [
                      "positivo",
                      "negativo"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "trabajo_estudios",
        "nombre": "Trabajo y capacitación",
        "orden": 3,
        "subsecciones": [
          {
            "id": "situacion_laboral",
            "nombre": "Situación laboral",
            "grupos": [
              {
                "id": "trabajo_resumen_actual",
                "opciones": [
                  {
                    "id": "situacion_laboral_actual",
                    "nombre": "Situación laboral actual",
                    "presentacion": "resumen_actual"
                  }
                ]
              }
            ]
          },
          {
            "id": "busqueda_trabajo",
            "nombre": "Búsqueda de trabajo",
            "grupos": [
              {
                "id": "trabajo_tecnologia",
                "opciones": [
                  "trabajo_tec_dir",
                  "trabajo_tec_esp",
                  "trabajo_tec_gest",
                  "trabajo_tec_coml",
                  "trabajo_tec_oper",
                  "trabajo_tec_free"
                ]
              },
              {
                "id": "trabajo_arte_espectaculo",
                "opciones": [
                  "trabajo_arte_dir",
                  "trabajo_arte_esp",
                  "trabajo_arte_gest",
                  "trabajo_arte_coml",
                  "trabajo_arte_oper",
                  "trabajo_arte_free"
                ]
              },
              {
                "id": "trabajo_negocios_finanzas",
                "opciones": [
                  "trabajo_nego_dir",
                  "trabajo_nego_esp",
                  "trabajo_nego_gest",
                  "trabajo_nego_coml",
                  "trabajo_nego_oper",
                  "trabajo_nego_free"
                ]
              },
              {
                "id": "trabajo_salud_bienestar",
                "opciones": [
                  "trabajo_salu_dir",
                  "trabajo_salu_esp",
                  "trabajo_salu_gest",
                  "trabajo_salu_coml",
                  "trabajo_salu_oper",
                  "trabajo_salu_free"
                ]
              },
              {
                "id": "trabajo_educacion_conocimiento",
                "opciones": [
                  "trabajo_educ_dir",
                  "trabajo_educ_esp",
                  "trabajo_educ_gest",
                  "trabajo_educ_coml",
                  "trabajo_educ_oper",
                  "trabajo_educ_free"
                ]
              },
              {
                "id": "trabajo_ingenieria_construccion",
                "opciones": [
                  "trabajo_inge_dir",
                  "trabajo_inge_esp",
                  "trabajo_inge_gest",
                  "trabajo_inge_coml",
                  "trabajo_inge_oper",
                  "trabajo_inge_free"
                ]
              },
              {
                "id": "trabajo_comercio_servicios",
                "opciones": [
                  "trabajo_come_dir",
                  "trabajo_come_esp",
                  "trabajo_come_gest",
                  "trabajo_come_coml",
                  "trabajo_come_oper",
                  "trabajo_come_free"
                ]
              },
              {
                "id": "trabajo_transporte_logistica",
                "opciones": [
                  "trabajo_tran_dir",
                  "trabajo_tran_esp",
                  "trabajo_tran_gest",
                  "trabajo_tran_coml",
                  "trabajo_tran_oper",
                  "trabajo_tran_free"
                ]
              },
              {
                "id": "trabajo_seguridad_servicio_publico",
                "opciones": [
                  "trabajo_segu_dir",
                  "trabajo_segu_esp",
                  "trabajo_segu_gest",
                  "trabajo_segu_coml",
                  "trabajo_segu_oper",
                  "trabajo_segu_free"
                ]
              },
              {
                "id": "trabajo_naturaleza_turismo",
                "opciones": [
                  "trabajo_natu_dir",
                  "trabajo_natu_esp",
                  "trabajo_natu_gest",
                  "trabajo_natu_coml",
                  "trabajo_natu_oper",
                  "trabajo_natu_free"
                ]
              },
              {
                "id": "trabajo_oficios_tecnicos",
                "opciones": [
                  "trabajo_ofic_dir",
                  "trabajo_ofic_esp",
                  "trabajo_ofic_gest",
                  "trabajo_ofic_coml",
                  "trabajo_ofic_oper",
                  "trabajo_ofic_free"
                ]
              },
              {
                "id": "trabajo_comunicacion_medios",
                "opciones": [
                  "trabajo_comu_dir",
                  "trabajo_comu_esp",
                  "trabajo_comu_gest",
                  "trabajo_comu_coml",
                  "trabajo_comu_oper",
                  "trabajo_comu_free"
                ]
              }
            ]
          },
          {
            "id": "capacitacion",
            "nombre": "Capacitación y cursos",
            "grupos": [
              {
                "id": "curso_tecnologia",
                "opciones": [
                  "curso_tec_nego_inte_capa_101_i",
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_come_comu_inte_coml_103_i",
                  "curso_tec_nego_inte_espe_104_i",
                  "curso_tec_nego_inge_inte_admi_106_i",
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_tec_avan_capa_101_a",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_tec_avan_espe_104_a"
                ]
              },
              {
                "id": "curso_negocios_finanzas",
                "opciones": [
                  "curso_tec_nego_inte_capa_101_i",
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_nego_inte_espe_104_i",
                  "curso_tec_nego_inge_inte_admi_106_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_nego_inte_coml_303_i",
                  "curso_nego_come_inte_admi_105_i",
                  "curso_nego_avan_capa_301_a",
                  "curso_nego_avan_espe_304_a"
                ]
              },
              {
                "id": "curso_ingenieria_construccion",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_nego_inge_inte_admi_106_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_inge_inte_capa_601_i",
                  "curso_inge_ofic_inte_coml_603_i",
                  "curso_inge_inte_espe_604_i",
                  "curso_inge_tran_segu_natu_ofic_inte_capa_108_i",
                  "curso_inge_avan_capa_601_a",
                  "curso_inge_avan_espe_604_a"
                ]
              },
              {
                "id": "curso_comercio_servicios",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_come_comu_inte_coml_103_i",
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_nego_come_inte_admi_105_i",
                  "curso_come_inte_capa_701_i",
                  "curso_come_inte_espe_704_i",
                  "curso_come_avan_capa_701_a",
                  "curso_come_avan_espe_704_a"
                ]
              },
              {
                "id": "curso_transporte_logistica",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_inge_tran_segu_natu_ofic_inte_capa_108_i",
                  "curso_tran_inte_capa_801_i",
                  "curso_tran_inte_coml_803_i",
                  "curso_tran_inte_espe_804_i",
                  "curso_tran_natu_inte_admi_109_i",
                  "curso_tran_avan_capa_801_a",
                  "curso_tran_avan_espe_804_a"
                ]
              },
              {
                "id": "curso_seguridad_servicio_publico",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_salu_segu_inte_capa_112_i",
                  "curso_inge_tran_segu_natu_ofic_inte_capa_108_i",
                  "curso_segu_inte_capa_901_i",
                  "curso_segu_inte_coml_903_i",
                  "curso_segu_inte_espe_904_i",
                  "curso_segu_avan_capa_901_a",
                  "curso_segu_avan_admi_903_a",
                  "curso_segu_avan_espe_904_a"
                ]
              },
              {
                "id": "curso_naturaleza_turismo",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_inge_tran_segu_natu_ofic_inte_capa_108_i",
                  "curso_tran_natu_inte_admi_109_i",
                  "curso_natu_inte_capa_111_i",
                  "curso_natu_inte_coml_113_i",
                  "curso_natu_inte_espe_114_i",
                  "curso_natu_avan_capa_111_a",
                  "curso_natu_avan_admi_112_a",
                  "curso_natu_avan_coml_113_a",
                  "curso_natu_avan_espe_114_a"
                ]
              },
              {
                "id": "curso_oficios_tecnicos",
                "opciones": [
                  "curso_tec_nego_inge_come_tran_segu_natu_ofic_inte_admi_102_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_inge_ofic_inte_coml_603_i",
                  "curso_inge_tran_segu_natu_ofic_inte_capa_108_i",
                  "curso_ofic_inte_capa_121_i",
                  "curso_ofic_inte_espe_124_i",
                  "curso_ofic_inte_capa_116_i",
                  "curso_ofic_avan_capa_121_a",
                  "curso_ofic_avan_espe_124_a"
                ]
              },
              {
                "id": "curso_comunicacion_medios",
                "opciones": [
                  "curso_tec_come_comu_inte_coml_103_i",
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_tec_nego_inge_come_tran_segu_ofic_comu_avan_admi_102_a",
                  "curso_arte_comu_inte_capa_201_i",
                  "curso_arte_comu_inte_admi_110_i",
                  "curso_comu_inte_admi_132_i",
                  "curso_comu_inte_espe_134_i",
                  "curso_comu_avan_capa_131_a",
                  "curso_comu_avan_coml_133_a",
                  "curso_comu_avan_espe_134_a"
                ]
              },
              {
                "id": "curso_arte_espectaculo",
                "opciones": [
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_tec_arte_nego_inge_come_tran_ofic_avan_coml_103_a",
                  "curso_arte_comu_inte_capa_201_i",
                  "curso_arte_inte_admi_202_i",
                  "curso_arte_inte_coml_203_i",
                  "curso_arte_inte_espe_204_i",
                  "curso_arte_comu_inte_admi_110_i",
                  "curso_arte_avan_capa_201_a",
                  "curso_arte_avan_admi_202_a",
                  "curso_arte_avan_espe_204_a"
                ]
              },
              {
                "id": "curso_salud_bienestar",
                "opciones": [
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_salu_inte_capa_401_i",
                  "curso_salu_inte_admi_402_i",
                  "curso_salu_inte_coml_403_i",
                  "curso_salu_inte_espe_404_i",
                  "curso_salu_segu_inte_capa_112_i",
                  "curso_salu_avan_capa_401_a",
                  "curso_salu_avan_admi_403_a",
                  "curso_salu_avan_coml_405_a",
                  "curso_salu_avan_espe_404_a"
                ]
              },
              {
                "id": "curso_educacion_conocimiento",
                "opciones": [
                  "curso_tec_arte_salu_educ_come_comu_inte_coml_107_i",
                  "curso_educ_inte_capa_501_i",
                  "curso_educ_inte_admi_502_i",
                  "curso_educ_inte_coml_503_i",
                  "curso_educ_inte_espe_504_i",
                  "curso_educ_inte_espe_117_i",
                  "curso_educ_avan_capa_501_a",
                  "curso_educ_avan_admi_502_a",
                  "curso_educ_avan_coml_503_a",
                  "curso_educ_avan_espe_504_a"
                ]
              }
            ]
          },
          {
            "id": "negociacion_salarial",
            "nombre": "Negociación salarial y ascensos",
            "grupos": [
              {
                "id": "trabajo_negociacion",
                "opciones": [
                  {
                    "id": "negociacion_salarial_acceso",
                    "nombre": "Negociación salarial y ascensos",
                    "presentacion": "opcion_navegacion",
                    "accion": "abrir_negociacion_salarial"
                  }
                ]
              }
            ]
          },
          {
            "id": "alertas_novedades_trabajo_estudios",
            "nombre": "Alertas y novedades de trabajo y estudios",
            "grupos": [
              {
                "id": "trabajo_alertas",
                "opciones": [
                  {
                    "id": "alertas_novedades_trabajo_estudios",
                    "nombre": "Alertas y novedades de trabajo y estudios",
                    "presentacion": "teletipo_alertas",
                    "puedeMostrar": [
                      "positivo",
                      "negativo"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "finanzas",
        "nombre": "Finanzas Cuentas e Inversión",
        "orden": 4,
        "subsecciones": [
          {
            "id": "banco",
            "nombre": "Banco",
            "grupos": [
              {
                "id": "banc_grp_cuentas",
                "opciones": [
                  "banc_ctaahorro",
                  "banc_ctarutvista",
                  "banc_ctacorriente",
                  "banc_lineascredito",
                  "banc_tarjetacredito",
                  "banc_creditoconsumo",
                  "banc_creditohipotecario"
                ]
              },
              {
                "id": "inv_grp_fondos_mutuos",
                "opciones": [
                  "inv_ffmm_conservador",
                  "inv_ffmm_moderado",
                  "inv_ffmm_arriesgado"
                ]
              },
              {
                "id": "banc_depositoaplazo",
                "opciones": []
              },
              {
                "id": "banc_seguros",
                "opciones": [
                  "segu_segurofraude",
                  "segu_desgravamen",
                  "segu_cesantia",
                  "segu_automotriz",
                  "segu_vivienda",
                  "segu_incendio_sismo"
                ]
              }
            ]
          },
          {
            "id": "cooperativa_ahorro_credito",
            "nombre": "Cooperativa de ahorro y crédito",
            "grupos": []
          },
          {
            "id": "compania_seguros",
            "nombre": "Compañía de seguros",
            "grupos": [
              {
                "id": "segu_grp_compania",
                "opciones": [
                  "segu_desgravamen",
                  "segu_cesantia",
                  "segu_automotriz",
                  "segu_vivienda",
                  "segu_incendio_sismo",
                  "segu_vida",
                  "segu_salud"
                ]
              }
            ]
          },
          {
            "id": "afp",
            "nombre": "AFP",
            "grupos": [
              {
                "id": "inv_grp_afp",
                "opciones": [
                  "inv_ahorroprevisionalvoluntarioapv",
                  "inv_ahorrocuenta2"
                ]
              }
            ]
          },
          {
            "id": "corredora_bolsa",
            "nombre": "Corredora de bolsa",
            "grupos": [
              {
                "id": "inv_grp_fondos_mutuos",
                "opciones": [
                  "inv_ffmm_conservador",
                  "inv_ffmm_moderado",
                  "inv_ffmm_arriesgado"
                ]
              },
              {
                "id": "inv_grp_corredora_bolsa",
                "opciones": [
                  "inv_etf_itnow_ipsa",
                  "inv_etf_singular_sp500",
                  "inv_etf_singular_nasdaq100",
                  "inv_etf_singular_chile_corp",
                  "inv_etf_btg_emerging_markets",
                  "inv_fondo_mutuo_security_index_sp500",
                  "inv_accion_aguas",
                  "inv_accion_electricidad",
                  "inv_accion_banco_nacional",
                  "inv_accion_banco_comercial",
                  "inv_accion_comunicaciones",
                  "inv_accion_multitienda",
                  "inv_accion_mall",
                  "inv_accion_combustibles",
                  "inv_accion_minera_serie_b",
                  "inv_accion_aerolinea",
                  "inv_bono_corp_metro",
                  "inv_bono_corp_efe",
                  "inv_bono_corp_banco_nacional",
                  "inv_bono_corp_aguas",
                  "inv_bono_corp_electricidad",
                  "inv_bono_corp_grupo_inversiones",
                  "inv_bono_corp_alimentos",
                  "inv_bono_corp_banco_comercial",
                  "inv_bono_corp_comunicaciones",
                  "inv_bono_corp_mall",
                  "inv_bono_corp_multitienda",
                  "inv_bono_corp_aerolinea",
                  "inv_bono_tesoreria_btp",
                  "inv_bono_tesoreria_btu",
                  "inv_bono_banco_central_bcp",
                  "inv_bono_banco_central_bcu",
                  "inv_bono_soberano_esg_btp",
                  "inv_bono_soberano_esg_btu",
                  "inv_bono_soberano_esg_internacional"
                ]
              }
            ]
          },
          {
            "id": "broker_metales_preciosos",
            "nombre": "Broker de metales preciosos",
            "grupos": [
              {
                "id": "inv_grp_broker_metales_preciosos",
                "opciones": [
                  "inv_compradeoro",
                  "inv_compradeplata"
                ]
              }
            ]
          },
          {
            "id": "casa_cambio",
            "nombre": "Casa de cambio",
            "grupos": [
              {
                "id": "inv_grp_casa_cambio",
                "opciones": [
                  "inv_moneda_usd",
                  "inv_moneda_eur",
                  "inv_moneda_jpy",
                  "inv_moneda_gbp",
                  "inv_moneda_chf",
                  "inv_moneda_aud",
                  "inv_moneda_pen",
                  "inv_moneda_ars",
                  "inv_moneda_brl",
                  "inv_moneda_mxn"
                ]
              }
            ]
          },
          {
            "id": "plataforma_criptomonedas",
            "nombre": "Plataforma de criptomonedas",
            "grupos": [
              {
                "id": "inv_grp_criptomonedas",
                "opciones": [
                  "inv_crypto_btc",
                  "inv_crypto_eth",
                  "inv_crypto_sol",
                  "inv_crypto_xrp"
                ]
              }
            ]
          },
          {
            "id": "billetera_digital",
            "nombre": "Billetera digital",
            "grupos": [
              {
                "id": "inv_grp_billetera",
                "opciones": [
                  "inv_billeteraselectronicas"
                ]
              }
            ]
          },
          {
            "id": "inversion_startups",
            "nombre": "Inversión en startups",
            "grupos": [
              {
                "id": "inv_grp_startups",
                "opciones": [
                  "inv_startup_saas",
                  "inv_startup_fintech",
                  "inv_startup_marketplace",
                  "inv_startup_iot",
                  "inv_startup_foodtech",
                  "inv_startup_biotech"
                ]
              }
            ]
          },
          {
            "id": "inversion_inmobiliaria_fraccionada",
            "nombre": "Inversión inmobiliaria fraccionada",
            "grupos": [
              {
                "id": "inv_grp_inversion_inmobiliaria",
                "opciones": [
                  "inv_frac_residencial",
                  "inv_frac_duplex",
                  "inv_frac_parcela",
                  "inv_frac_galpon",
                  "inv_frac_condominio",
                  "inv_frac_lago_sur",
                  "inv_frac_estacionamiento",
                  "inv_frac_local",
                  "inv_frac_casa_norte",
                  "inv_frac_depto_ambiente"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "comercio_vida_cotidiana",
        "nombre": "Productos y Servicios",
        "orden": 5,
        "subsecciones": [
          {
            "id": "corredora_propiedades",
            "nombre": "Corredora de propiedades",
            "grupos": [
              {
                "id": "prop_grp_compra",
                "opciones": [
                  "casa_condominio",
                  "departamento_condominio",
                  "departamento_centrico_grande",
                  "departamento_centrico_un_ambiente",
                  "casa_barrio_residencial",
                  "departamento_barrio_residencial",
                  "parcela_agrado_5000_m2",
                  "terreno_con_casa_3000_m2"
                ]
              },
              {
                "id": "prop_grp_arriendo",
                "opciones": [
                  "casa_condominio",
                  "departamento_condominio",
                  "departamento_centrico_grande",
                  "departamento_centrico_un_ambiente",
                  "casa_barrio_residencial",
                  "departamento_barrio_residencial",
                  "parcela_agrado_5000_m2",
                  "terreno_con_casa_3000_m2"
                ]
              }
            ]
          },
          {
            "id": "automotora",
            "nombre": "Automotora y taller mecánico",
            "grupos": [
              {
                "id": "com_automotora",
                "opciones": [
                  "com_vehiculo_city_car_nuevo",
                  "com_vehiculo_city_car_usado",
                  "com_vehiculo_suv_usado_requiere_reparacion",
                  "com_vehiculo_suv",
                  "com_vehiculo_camioneta_usada",
                  "com_vehiculo_camioneta_nueva",
                  "com_vehiculo_mini_van_nueva",
                  "com_vehiculo_deportivo_usado",
                  "com_vehiculo_deportivo_nuevo",
                  "com_vehiculo_auto_de_lujo_usado_requiere_mantencion",
                  "com_vehiculo_auto_de_lujo_nuevo",
                  "com_vehiculo_motoneta_nueva",
                  "com_vehiculo_motoneta_usada",
                  "com_vehiculo_moto_200cc_nueva",
                  "com_vehiculo_moto_200cc_usada",
                  "com_vehiculo_casa_rodante"
                ]
              },
              {
                "id": "com_mecanico",
                "opciones": [
                  "com_vehiculo_servicio_de_mantencion_y_reparacion_de_vehiculo"
                ]
              }
            ]
          },
          {
            "id": "alimentacion_supermercado",
            "nombre": "Alimentación y supermercado",
            "grupos": [
              {
                "id": "com_comida",
                "opciones": [
                  "com_salida_restaurante_elegante",
                  "com_salida_fuente_de_soda",
                  "com_salida_comida_china",
                  "com_salida_pizzeria",
                  "com_producto_utensilios_de_cocina"
                ]
              }
            ]
          },
          {
            "id": "farmacia_salud",
            "nombre": "Farmacia y salud",
            "grupos": [
              {
                "id": "com_farmacia",
                "opciones": [
                  "com_salud_productos_de_farmacia"
                ]
              },
              {
                "id": "com_hospitalyurgencia",
                "opciones": [
                  "com_salud_atencion_medica",
                  "com_salud_atencion_de_urgencia"
                ]
              }
            ]
          },
          {
            "id": "centro_comercial",
            "nombre": "Centro comercial",
            "grupos": [
              {
                "id": "com_multitienda",
                "opciones": [
                  "com_producto_prendas_de_vestir",
                  "com_producto_accesorios_personales",
                  "com_producto_lentes_de_realidad_virtual"
                ]
              },
              {
                "id": "com_mueblesyelectronicos",
                "opciones": [
                  "com_hogar_renovacion_de_banos_y_cocina",
                  "com_producto_cortinas",
                  "com_producto_juego_de_terraza",
                  "com_producto_computador",
                  "com_producto_consola_de_juegos",
                  "com_producto_set_de_herramientas",
                  "com_producto_lentes_de_realidad_virtual",
                  "com_producto_set_de_robotica",
                  "com_producto_set_de_electronica"
                ]
              },
              {
                "id": "com_tiendadehobbies",
                "opciones": [
                  "com_producto_materiales_para_manualidades",
                  "com_producto_saxofon",
                  "com_producto_guitarra_electrica",
                  "com_producto_guitarra_acustica",
                  "com_producto_bateria",
                  "com_producto_piano",
                  "com_producto_set_de_tejido",
                  "com_producto_set_de_aeromodelismo",
                  "com_producto_set_de_pesca",
                  "com_producto_maquina_de_coser"
                ]
              },
              {
                "id": "com_ropaeimplementosdeportivos",
                "opciones": [
                  "com_producto_calzado_deportivo",
                  "com_producto_set_de_pesas_y_mancuernas",
                  "com_producto_bicicleta_estatica",
                  "com_producto_trotadora",
                  "com_producto_bicicleta",
                  "com_producto_patines",
                  "com_producto_scooter"
                ]
              },
              {
                "id": "com_compradeoroplatayjoyas",
                "opciones": [
                  "com_producto_compra_de_joyas"
                ]
              }
            ]
          },
          {
            "id": "restaurantes_salidas",
            "nombre": "Restaurantes y salidas",
            "grupos": [
              {
                "id": "act_restaurant",
                "opciones": [
                  "com_salida_restaurante_elegante",
                  "com_salida_fuente_de_soda",
                  "com_salida_comida_china",
                  "com_salida_pizzeria"
                ]
              }
            ]
          },
          {
            "id": "mascotas_veterinaria",
            "nombre": "Mascotas y veterinaria",
            "grupos": [
              {
                "id": "com_veterinario",
                "opciones": [
                  "com_mascota_mascota_adoptada",
                  "com_mascota_atencion_veterinaria",
                  "com_mascota_alimento_para_mascotas"
                ]
              }
            ]
          },
          {
            "id": "reparaciones_mantencion",
            "nombre": "Reparaciones y mantención del hogar",
            "grupos": [
              {
                "id": "com_reparacionesdelhogar",
                "opciones": [
                  "com_hogar_servicio_de_instalacion_de_ventanas_termopanel",
                  "com_hogar_instalacion_de_aire_acondicionado",
                  "com_hogar_reparacion_de_goteras_de_techo",
                  "com_hogar_reparacion_de_fugas_de_agua"
                ]
              }
            ]
          },
          {
            "id": "talleres_y_clubes",
            "nombre": "Talleres y clubes",
            "grupos": [
              {
                "id": "com_talleres_y_clubes",
                "opciones": [
                  "com_talleres_y_clubes_taller_de_cocina",
                  "com_talleres_y_clubes_club_de_ajedrez",
                  "com_talleres_y_clubes_club_de_poesia",
                  "com_talleres_y_clubes_taller_de_arte",
                  "com_talleres_y_clubes_taller_de_tejido",
                  "com_talleres_y_clubes_taller_de_robotica",
                  "com_talleres_y_clubes_club_de_lectura"
                ]
              }
            ]
          },
          {
            "id": "actividades_entretencion",
            "nombre": "Actividades y entretención",
            "grupos": [
              {
                "id": "act_cine",
                "opciones": [
                  "com_salida_entrada_al_cine"
                ]
              },
              {
                "id": "act_conciertos",
                "opciones": [
                  "com_salida_entrada_para_concierto_de_artista_internacional",
                  "com_salida_entrada_para_concierto_de_artista_local",
                  "com_salida_entrada_para_festival"
                ]
              },
              {
                "id": "act_restaurant",
                "opciones": [
                  "com_salida_restaurante_elegante",
                  "com_salida_fuente_de_soda",
                  "com_salida_comida_china",
                  "com_salida_pizzeria"
                ]
              },
              {
                "id": "act_deporteygimnasio",
                "opciones": [
                  "com_deporte_membresia_de_gimnasio",
                  "com_deporte_senderismo",
                  "com_deporte_partido_de_baby_futbol",
                  "com_deporte_partido_de_padel",
                  "com_deporte_partido_de_tenis",
                  "com_deporte_descenso_mountain_bike",
                  "com_deporte_entrada_diaria_piscina",
                  "com_deporte_membresia_mensual_natacion",
                  "com_deporte_salida_de_escalada",
                  "com_deporte_clase_de_surf",
                  "com_deporte_clases_mensuales_artes_marciales",
                  "com_deporte_inscripcion_corrida_running",
                  "com_deporte_salida_ciclismo_de_ruta",
                  "com_deporte_paseo_en_kayak"
                ]
              },
              {
                "id": "act_celebraciones",
                "opciones": [
                  "com_salida_club_bailable",
                  "com_salida_salon_de_eventos_para_celebraciones_familiares",
                  "com_salida_salida_recreativa_compartida",
                  "com_salida_sesion_fotografica_familiar_o_con_amistades",
                  "com_salida_juegos_de_mesa"
                ]
              }
            ]
          },
          {
            "id": "viajes_turismo",
            "nombre": "Viajes y turismo",
            "grupos": [
              {
                "id": "act_viajesyturismo",
                "opciones": [
                  "com_viajes_san_pedro_de_atacama",
                  "com_viajes_pucon",
                  "com_viajes_torres_del_paine",
                  "com_viajes_vina_del_mar",
                  "com_viajes_valle_nevado",
                  "com_viajes_mendoza",
                  "com_viajes_buenos_aires",
                  "com_viajes_arica",
                  "com_viajes_isla_de_pascua",
                  "com_viajes_puerto_natales",
                  "com_viajes_punta_arenas",
                  "com_viajes_chiloe",
                  "com_viajes_lago_villarrica",
                  "com_viajes_lima",
                  "com_viajes_rio_de_janeiro",
                  "com_viajes_miami",
                  "com_viajes_madrid",
                  "com_viajes_el_cairo",
                  "com_viajes_londres",
                  "com_viajes_tokio"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "asesor_financiero",
        "nombre": "Asesor financiero",
        "orden": 6,
        "subsecciones": [
          {
            "id": "educacion_financiera",
            "nombre": "Educación financiera",
            "grupos": [
              {
                "id": "asesor_conceptos",
                "opciones": [
                  {
                    "id": "conceptos_financieros",
                    "nombre": "Conceptos financieros",
                    "presentacion": "opcion_navegacion"
                  }
                ]
              }
            ]
          },
          {
            "id": "alertas_asesor",
            "nombre": "Alertas del asesor",
            "grupos": [
              {
                "id": "asesor_alertas",
                "opciones": [
                  {
                    "id": "alertas_asesor_opcion",
                    "nombre": "Alertas del asesor",
                    "presentacion": "opcion_navegacion"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
