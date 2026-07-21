// ══════════════════════════════════════
// SHARED ACTIVITY DATA
// Path constants and data blocks used by more than one course/activity.
// Loaded before courses/*.js, which reference these at parse time.
// ══════════════════════════════════════
var COURSES = {};

const IMG = 'Images/';
const FLAG = 'Images/flags/';
const PHOTOS = 'photos/';
const CPHOTOS = 'curso-fotos-paises/';
const COUNTRY_FLAG_CODE = {
    Brazil: 'br', Japan: 'jp', France: 'fr', China: 'cn', Germany: 'de',
    Italy: 'it', Russia: 'ru', Mexico: 'mx', 'United Kingdom': 'gb',
    Australia: 'au', Canada: 'ca', Spain: 'es', 'South Africa': 'za'
};

const PENDING_SUGGESTION = "";

const CALEN_PHOTOS = [
    { src: PHOTOS + 'IMG_6081_reducida.jpg', words: ['boat', 'sea', 'sky', 'rope'] },
    { src: PHOTOS + 'IMG_6355_reducida.jpg', words: ['kayak', 'pier', 'people', 'water'] },
    { src: PHOTOS + 'IMG_6356_reducida.jpg', words: ['tent', 'people', 'house', 'tree'] },
    { src: PHOTOS + 'IMG_6357_reducida.jpg', words: ['church', 'lamp', 'hill', 'stage'] },
    { src: PHOTOS + 'IMG_6851_reducida.jpg', words: ['bird', 'buoy', 'water', 'mountain'] },
    { src: PHOTOS + 'IMG_6862_reducida.jpg', words: ['man', 'boat', 'church', 'rock'] },
    { src: PHOTOS + 'IMG_6873_reducida.jpg', words: ['kayak', 'paddle', 'sky', 'water'] },
    { src: PHOTOS + 'IMG_6935_reducida.jpg', words: ['truck', 'bag', 'hill', 'boots'] },
    { src: PHOTOS + 'IMG_7910_reducida.jpg', words: ['swan', 'lake', 'water', 'wing'] },
    { src: PHOTOS + 'IMG_7911_reducida.jpg', words: ['sea lion', 'buoy', 'water', 'tail'] },
];

const ALREADY_KNOW_ENGLISH = [
    { group: "Words we use every day" },
    { q: "¿Cómo se llama un lugar donde se instalan carpas para acampar?", a: "CAMPING", icon: "⛺" },
    { q: "¿Cómo se llama esa foto de un artista famoso que uno puede pegar en su pieza?", a: "POSTER", sideImg: IMG+"poster.png" },
    { q: "¿Cómo le dices a dos panes con jamón y queso?", a: "SANDWICH", icon: "🥪" },
    { q: "¿Cómo se llama la luz fuerte que aparece por un instante al sacar una foto?", a: "FLASH", icon: "📸" },
    { q: "¿Cómo se le dice al dispositivo parecido a un celular grande, con pantalla táctil, más chico que un computador?", a: "TABLET", icon: "📱" },
    { q: "¿Cómo le dicen en Chile al computador portátil?", a: "NOTEBOOK", icon: "💻" },
    { q: "¿Cómo se llama el deporte que juegan 5 jugadores por lado, le dan bote a la pelota constantemente y deben encestarla en un aro con tablero?", a: "BASKETBALL", icon: "🏀" },
    { q: "En fútbol, ¿cómo se llama cuando el jugador está adelantado?", a: "OFFSIDE", icon: "🚩" },
    { q: "¿Cómo se llama cuando te sacas una foto a ti mismo?", a: "SELFIE", icon: "🤳" },
    { q: "¿Cómo se llama una tabla con ruedas sobre la que te paras?", a: "SKATEBOARD", icon: "🛹" },
    { q: "En fútbol, ¿cómo se llama en inglés al tiro de esquina?", a: "CORNER", icon: "⚽" },
    { q: "¿Cómo se llaman los pantalones de mezclilla?", a: "JEANS", icon: "👖" },
    { q: "¿Cómo se llama el auto con chofer que puedes pedir que te lleve donde quieras?", a: "TAXI", icon: "🚕" },
    { q: "¿Cómo se llama el deporte que juegan 2 o 4 jugadores con raqueta, una pelota pequeña y una red baja entre medio?", a: "TENNIS", icon: "🎾" },
    { group: "Digital world" },
    { q: "¿Cómo se llama la aplicación de celular para mandar mensajes?", a: "WHATSAPP", sideImg: IMG+"whatsapp.png" },
    { q: "¿Cuál es el sitio más famoso para ver videos en internet?", a: "YOUTUBE", sideImg: IMG+"youtube.png" },
    { q: "¿Cómo se le dice a alguien que adquiere fama en TikTok o Instagram?", a: "INFLUENCER", sideImg: IMG+"influencer.png" },
    { q: "Si te gusta mucho un video en TikTok o Instagram, tú le das un...", a: "LIKE", icon: "👍" },
    { q: "¿Cómo se llama quien juega muchos videojuegos?", a: "GAMER", sideImg: IMG+"gamer.png" },
    { q: "¿Qué dice la pantalla cuando pierdes un juego?", a: "GAME OVER", icon: "🎮" },
    { q: "¿Cómo se llama la clave secreta para entrar a tu cuenta?", a: "PASSWORD", icon: "🔑" },
    { q: "¿Cómo se llama el correo que mandas por internet?", a: "EMAIL", icon: "📧" },
    { q: "¿Cómo se llama cuando conversas con alguien escribiendo mensajes en el celular o computador?", a: "CHAT", icon: "💬" },
    { q: "¿Cómo se llama la tecnología para conectar audífonos sin cable al celular?", a: "BLUETOOTH", icon: "🔵" },
    { group: "Things we say" },
    { q: "¿Qué canción cantas en los cumpleaños en inglés?", a: "HAPPY BIRTHDAY", icon: "🎂" },
    { q: "¿Cómo se llama la fiesta del 31 de octubre en que la gente se disfraza y pide dulces?", a: "HALLOWEEN", icon: "🎃" },
    { q: "¿Cómo se llama la fiesta que se hace para un bebé cuando nace o está a punto de nacer?", a: "BABY SHOWER", icon: "👶" },
    { q: "¿Cómo se dice 'gracias' en inglés?", a: "THANK YOU", icon: "🙏" },
    { q: "¿Cómo se dice 'te quiero' en inglés?", a: "I LOVE YOU", icon: "❤️" },
    { q: "¿Cómo saludas en inglés?", a: "HELLO", icon: "👋" },
    { q: "¿Cómo pides disculpas en inglés?", a: "SORRY", icon: "😔" },
    { q: "¿Qué dices en inglés a alguien para que se detenga?", a: "STOP", icon: "✋" },
    { q: "¿Qué botón aprietas para que empiece un video o una canción?", a: "PLAY", icon: "▶️" },
];
