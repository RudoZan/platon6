// js/nav-data.js
// Única fuente de verdad de la estructura de navegación del taller.
// Al adaptar el taller a otra disciplina, este archivo normalmente NO cambia:
// los títulos de módulo/subpágina son genéricos. Lo que cambia es el
// contenido dentro de las cajas .caja-ejemplo de cada página.

const TALLER_NAV = {
  siteTitle: "Taller de Recursos Digitales Interactivos",
  modules: [
    {
      id: "01", slug: "modulo-01-recursos-educativos-digitales",
      title: "Recursos digitales interactivos",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-tipos-de-recursos.html", title: "Tipos de recursos" },
        { id: "02", file: "02-utilidad.html", title: "¿Para qué sirven?" },
        { id: "02b", file: "02b-variables-didacticas.html", title: "Variables didácticas y ajuste dinámico" },
        { id: "03", file: "03-historia.html", title: "Breve historia" },
        { id: "04", file: "04-limitaciones.html", title: "Limitaciones y edad" },
        { id: "04b", file: "04b-normativa-celulares-chile.html", title: "Normativa de celulares y Excepción Pedagógica" },
        { id: "05", file: "05-cierre-actividad.html", title: "Cierre y reflexión" }
      ]
    },
    {
      id: "02", slug: "modulo-02-ias-y-antigravity",
      title: "IAs para programar (Elección e Instalación)",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-panorama-ias-actuales.html", title: "Panorama de IAs actuales" },
        { id: "02", file: "02-elegir-herramienta.html", title: "Cómo elegir herramienta" },
        { id: "03", file: "03-instalar-antigravity.html", title: "Instalar Antigravity IDE" },
        { id: "03b", file: "03b-instalar-cursor.html", title: "Alternativa: Instalar Cursor (Pago)" },
        { id: "03c", file: "03c-instalar-copilot.html", title: "Alternativa: Instalar VS Code y Copilot" }
      ]
    },
    {
      id: "03", slug: "modulo-03-creando-primer-recurso",
      title: "Creando tu primer recurso con IA",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-por-que-aplicaciones-web.html", title: "¿Por qué aplicaciones web? (HTML y JS)" },
        { id: "02", file: "02-primer-uso-antigravity.html", title: "Primer uso de tu asistente de IA" },
        { id: "03", file: "03-modos-de-trabajo.html", title: "Modo Chat vs. Autocompletado" },
        { id: "04", file: "04-modo-planificar.html", title: "Planificar tus cambios" },
        { id: "05", file: "05-como-escribir-prompts.html", title: "Cómo escribir mejores prompts" },
        { id: "06", file: "06-memoria-de-la-ia.html", title: "El contexto de Antigravity" },
        { id: "07", file: "07-guiar-paso-a-paso.html", title: "Guiar a la IA paso a paso" },
        { id: "08", file: "08-creacion-practica-primer-recurso.html", title: "¡Manos a la obra! Creando tu primer recurso" },
        { id: "09", file: "09-problemas-comunes.html", title: "Problemas comunes (y qué hacer)" }
      ]
    },
    {
      id: "04", slug: "modulo-04-sitio-html-js",
      title: "Creación de sitio (HTML y JavaScript)",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-estructura-html-basica.html", title: "Estructura HTML básica" },
        { id: "02", file: "02-estilos-css-basicos.html", title: "Estilos CSS básicos" },
        { id: "03", file: "03-javascript-basico.html", title: "JavaScript básico" },
        { id: "04", file: "04-creando-pagina-indice.html", title: "Creando tu página de índice" },
        { id: "05", file: "05-controlar-el-acceso.html", title: "Controlar el acceso a tu sitio" }
      ]
    },
    {
      id: "05", slug: "modulo-05-recursos-simples",
      title: "Recursos simples (interactivos y cuestionarios)",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-recursos-interactivos.html", title: "Recursos interactivos" },
        { id: "02", file: "02-cuestionarios.html", title: "Cuestionarios" },
        { id: "03", file: "03-retroalimentacion-automatica.html", title: "Retroalimentación automática" }
      ]
    },
    {
      id: "06", slug: "modulo-06-imagenes-multimedia",
      title: "Recursos con imágenes y multimedia",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-iconos-y-sonidos.html", title: "Iconos y sonidos" },
        { id: "02", file: "02-imagenes-y-videos.html", title: "Imágenes y videos" },
        { id: "03", file: "03-organizacion-de-carpetas.html", title: "Organización de carpetas" },
        { id: "04", file: "04-optimizacion-y-derechos.html", title: "Peso de archivos y derechos de uso" }
      ]
    },
    {
      id: "07", slug: "modulo-07-presentaciones-interactivas",
      title: "Presentaciones interactivas",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-de-ppt-a-web.html", title: "De PPT a presentación web" },
        { id: "02", file: "02-construyendo-tu-presentacion.html", title: "Construyendo tu presentación" }
      ]
    },
    {
      id: "08", slug: "modulo-08-subir-a-github",
      title: "Subir el sitio a GitHub",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-crear-cuenta-github.html", title: "Crear cuenta en GitHub" },
        { id: "02", file: "02-subir-tu-sitio.html", title: "Subir tu sitio" },
        { id: "03", file: "03-hacerlo-publico-github-pages.html", title: "Hacerlo público (GitHub Pages)" },
        { id: "04", file: "04-subir-actualizaciones.html", title: "Subir actualizaciones" },
        { id: "05", file: "05-buenas-practicas-desarrollo.html", title: "El proceso de desarrollo de software" }
      ]
    },
    {
      id: "09", slug: "modulo-09-supabase-basico",
      title: "Conectar con base de datos (Supabase)",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-que-es-supabase.html", title: "¿Qué es Supabase?" },
        { id: "02", file: "02-crear-proyecto-y-tabla.html", title: "Crear proyecto y tabla" },
        { id: "03", file: "03-conectar-desde-tu-sitio.html", title: "Conectar desde tu sitio" }
      ]
    },
    {
      id: "10", slug: "modulo-10-tiempo-real",
      title: "Comunicación en tiempo real (Supabase Realtime)",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-que-es-realtime.html", title: "¿Qué es Realtime?" },
        { id: "02", file: "02-implementar-comunicacion-en-vivo.html", title: "Implementar comunicación en vivo" }
      ]
    },
    {
      id: "11", slug: "modulo-11-desarrollo-software-educativo",
      title: "Desarrollo de software educativo a fondo",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-arquitectura-didactica.html", title: "Arquitectura didáctica y rigor técnico" },
        { id: "02", file: "02-buenas-practicas-avanzadas.html", title: "Buenas prácticas avanzadas de desarrollo" },
        { id: "03", file: "03-ciclos-de-prueba-y-ux.html", title: "Ciclos de prueba y UX pedagógica" }
      ]
    },
    {
      id: "12", slug: "modulo-12-hosting-dominio",
      title: "Hosting y dominio propio",
      pages: [
        { id: "00", file: "index.html", title: "Objetivo del módulo" },
        { id: "01", file: "01-opciones-de-hosting.html", title: "Opciones de hosting" },
        { id: "02", file: "02-comprar-dominio-nic.html", title: "Comprar dominio (.cl / NIC)" },
        { id: "03", file: "03-conectar-dominio-al-hosting.html", title: "Conectar dominio al hosting" }
      ]
    }
  ]
};
