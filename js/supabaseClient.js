/* ==========================================================================
   PLATÓN 6 — CONFIGURACIÓN CENTRALIZADA DE SUPABASE
   ==========================================================================
   Cualquier sub-aplicación de Platón 6 puede incluir este archivo para
   conectarse al proyecto compartido sin duplicar credenciales.

   Uso en HTML:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script src="../js/supabaseClient.js"></script> (o ruta relativa según nivel)

   Uso en JS:
     const supabase = getPlaton6Supabase();
   ========================================================================== */

const PLATON6_SUPABASE_URL = 'https://junonydusnrcumbjjzqt.supabase.co';
const PLATON6_SUPABASE_ANON_KEY = 'sb_publishable_vmnxlj3GbQPYqoXSjoK4IA_WN37wTR8';

// Compatibilidad con scripts existentes
window.SUPABASE_URL = PLATON6_SUPABASE_URL;
window.SUPABASE_ANON_KEY = PLATON6_SUPABASE_ANON_KEY;

// Cliente compartido (singleton)
let _platon6SupabaseInstance = null;

function getPlaton6Supabase() {
  if (_platon6SupabaseInstance) {
    return _platon6SupabaseInstance;
  }

  // Detectar SDK de Supabase según cómo se cargue (CDN v2 / ES6 / window)
  const createClientFn =
    window.supabase?.createClient ||
    window.supabaseJs?.createClient;

  if (createClientFn) {
    _platon6SupabaseInstance = createClientFn(PLATON6_SUPABASE_URL, PLATON6_SUPABASE_ANON_KEY);
    window.supabase = _platon6SupabaseInstance;
    return _platon6SupabaseInstance;
  }

  console.warn(
    '[Platón 6 Supabase] El SDK de Supabase no está cargado aún.\n' +
    'Asegúrate de incluir antes: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>'
  );
  return null;
}

// Inicialización automática si el SDK ya estuviera presente al cargar
if (typeof window !== 'undefined') {
  window.PLATON6_SUPABASE_URL = PLATON6_SUPABASE_URL;
  window.PLATON6_SUPABASE_ANON_KEY = PLATON6_SUPABASE_ANON_KEY;
  window.getPlaton6Supabase = getPlaton6Supabase;
}
