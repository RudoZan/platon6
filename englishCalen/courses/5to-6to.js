// ══════════════════════════════════════
// COURSE: 5th & 6th Grade — Languages
// Loaded after activities/shared.js (needs COURSES, IMG/FLAG/PHOTOS/CPHOTOS,
// PENDING_SUGGESTION, ALREADY_KNOW_ENGLISH, CALEN_PHOTOS to already exist).
// ══════════════════════════════════════

const GUESS_THE_COUNTRY_SUGGESTION = `
<p>This activity supports the unit's broader goal of exploring <strong>cultural diversity</strong> around the world.</p>
<p><strong>Suggested sequence:</strong></p>
<ol>
    <li><strong>Explain Rules:</strong> Before starting, explain the activity to students: they will see images from different countries and must guess which country each one shows, answering in English.</li>
    <li><strong>Review Countries:</strong> Click <strong>"Show All Countries"</strong> to display the full list. Go through it together, asking students to say each country's name first in Spanish, then in English. Saying it in Spanish first forces them to notice the real pronunciation difference. If they only say it in English, they tend to just apply a Spanish accent to a similar sounding word. Repeat both names yourself to reinforce correct pronunciation.</li>
    <li><strong>Select Photos:</strong> Once the whole list has been reviewed, freely choose which photos to show (either all of them, or only some) depending on the time available and how the class is responding.</li>
    <li><strong>Zoom Reveal:</strong> The <strong>"Zoom reveal"</strong> option makes each image reveal gradually, building anticipation and giving students a sense that they have time to think while more of the image appears.</li>
    <li><strong>Accept Guesses:</strong> As students call out guesses, don't confirm or reject them right away; instead, treat every guess as a possibility. If a student answers in Spanish, ask them to also say it in English, whether or not it's the correct country, and repeat their guess back to reinforce pronunciation either way.</li>
    <li><strong>Check Agreement:</strong> Before revealing the answer, ask if everyone agrees, inviting quieter students in particular to say whether they agree or what country they think it is.</li>
    <li><strong>Reveal Answer:</strong> If there's agreement, press <strong>"Show Name"</strong> to reveal the country and place.</li>
    <li><strong>Provide Clues:</strong> If there's no clear agreement, or nobody has guessed correctly, don't reveal the answer yet. Tell students you'll show another photo of the same country and repeat the same strategy. Only reveal the country if it still hasn't been guessed after three photos. At any point, feel free to give extra clues like a famous figure, a historical fact, or anything else that can help.</li>
</ol>
<p>Keep in mind that the real goal here isn't actually guessing the country. It's building students' willingness to communicate what they think the answer is, and through that process, repeatedly practice country names in English, reinforcing memory and correct pronunciation.</p>
`;

const HELLO_WORLD_SUGGESTION = `
<p>This activity explores language identity and greetings across different cultures. Note that you can present the countries in any order and deviate from the standard flow to suit your classroom dynamics.</p>
<p><strong>Suggested button sequence (from left to right):</strong></p>
<ol>
    <li><strong>Show Flag:</strong> Reveal the flag first and ask: <em>"Which country does this flag belong to?"</em></li>
    <li><strong>Show Country:</strong> Once students guess, click the button to show the country name, then ask: <em>"What language do people speak in that country?"</em></li>
    <li><strong>Show Language:</strong> After they answer, click the language button to display it on screen.</li>
    <li><strong>Show Picture:</strong> Click the "Picture" button to reveal the image, then ask: <em>"How do people greet each other in that language/country?"</em></li>
    <li><strong>Show Greeting:</strong> Once guessed, click the greeting button to display it on screen and practice saying it together.</li>
</ol>
`;

const COUNTRY_PHOTOS = [
    { src: CPHOTOS + 'brasil_foto1_christ_the_redeemer.webp', country: 'Brazil', place: 'Christ the Redeemer' },
    { src: CPHOTOS + 'brasil_foto2_copacabana_beach.webp', country: 'Brazil', place: 'Copacabana Beach' },
    { src: CPHOTOS + 'brasil_mapa.webp', country: 'Brazil', place: 'Map', originX: 53, originY: 43 },

    { src: CPHOTOS + 'japon_foto1_mount_fuji.webp', country: 'Japan', place: 'Mount Fuji' },
    { src: CPHOTOS + 'japon_foto2_itsukushima_shrine.webp', country: 'Japan', place: 'Itsukushima Shrine' },
    { src: CPHOTOS + 'japon_mapa.webp', country: 'Japan', place: 'Map', originX: 82, originY: 44 },

    { src: CPHOTOS + 'francia_foto1_eiffel_tower.webp', country: 'France', place: 'Eiffel Tower' },
    { src: CPHOTOS + 'francia_foto2_arc_de_triomphe.webp', country: 'France', place: 'Arc de Triomphe' },
    { src: CPHOTOS + 'francia_mapa.webp', country: 'France', place: 'Map', originX: 36, originY: 65 },

    { src: CPHOTOS + 'china_foto1_forbidden_city.webp', country: 'China', place: 'Forbidden City' },
    { src: CPHOTOS + 'china_foto2_great_wall_of_china.webp', country: 'China', place: 'Great Wall of China' },
    { src: CPHOTOS + 'china_mapa.webp', country: 'China', place: 'Map', originX: 58, originY: 53 },

    { src: CPHOTOS + 'alemania_foto1_brandenburg_gate.webp', country: 'Germany', place: 'Brandenburg Gate' },
    { src: CPHOTOS + 'alemania_foto2_bavarian_couple.png', country: 'Germany', place: 'Traditional Bavarian Couple' },
    { src: CPHOTOS + 'alemania_mapa.webp', country: 'Germany', place: 'Map', originX: 46, originY: 54 },

    { src: CPHOTOS + 'italia_foto1_colosseum.webp', country: 'Italy', place: 'Colosseum' },
    { src: CPHOTOS + 'italia_foto2_leaning_tower_of_pisa.webp', country: 'Italy', place: 'Leaning Tower of Pisa' },
    { src: CPHOTOS + 'italia_mapa.webp', country: 'Italy', place: 'Map', originX: 48, originY: 81 },

    { src: CPHOTOS + 'rusia_foto1_saint_basils_cathedral.webp', country: 'Russia', place: "Saint Basil's Cathedral" },
    { src: CPHOTOS + 'rusia_foto2_the_kremlin.webp', country: 'Russia', place: 'The Kremlin' },
    { src: CPHOTOS + 'rusia_mapa.webp', country: 'Russia', place: 'Map', originX: 64, originY: 26 },

    { src: CPHOTOS + 'mexico_foto1_chichen_itza.webp', country: 'Mexico', place: 'Chichen Itza' },
    { src: CPHOTOS + 'mexico_foto2_zocalo_dia_de_muertos.webp', country: 'Mexico', place: 'Day of the Dead in the Zócalo' },
    { src: CPHOTOS + 'mexico_mapa.webp', country: 'Mexico', place: 'Map', originX: 50, originY: 84 },

    { src: CPHOTOS + 'reinounido_foto1_big_ben.webp', country: 'United Kingdom', place: 'Big Ben' },
    { src: CPHOTOS + 'reinounido_foto2_tower_bridge.webp', country: 'United Kingdom', place: 'Tower Bridge' },
    { src: CPHOTOS + 'reinounido_mapa.webp', country: 'United Kingdom', place: 'Map', originX: 35, originY: 48 },

    { src: CPHOTOS + 'australia_foto1_sydney_opera_house.webp', country: 'Australia', place: 'Sydney Opera House' },
    { src: CPHOTOS + 'australia_foto2_uluru.webp', country: 'Australia', place: 'Uluru' },
    { src: CPHOTOS + 'australia_mapa.webp', country: 'Australia', place: 'Map', originX: 40, originY: 74 },

    { src: CPHOTOS + 'canada_foto1_canadian_rockies.webp', country: 'Canada', place: 'Canadian Rockies' },
    { src: CPHOTOS + 'canada_foto2_lake_louise.webp', country: 'Canada', place: 'Lake Louise' },
    { src: CPHOTOS + 'canada_mapa.webp', country: 'Canada', place: 'Map', originX: 52, originY: 31 },

    { src: CPHOTOS + 'espana_foto1_sagrada_familia.webp', country: 'Spain', place: 'Sagrada Familia' },
    { src: CPHOTOS + 'espana_foto2_flamenco_dancer.webp', country: 'Spain', place: 'Flamenco Dance' },
    { src: CPHOTOS + 'espana_mapa.webp', country: 'Spain', place: 'Map', originX: 51, originY: 61 },

    { src: CPHOTOS + 'sudafrica_foto1_traditional_celebration.webp', country: 'South Africa', place: 'Traditional Celebration' },
    { src: CPHOTOS + 'sudafrica_foto2_african_safari.webp', country: 'South Africa', place: 'African Safari' },
    { src: CPHOTOS + 'sudafrica_mapa.webp', country: 'South Africa', place: 'Map', originX: 54, originY: 96 },
];

COURSES['5to-6to'] = {
    label: "5th & 6th Grade — Languages",
    sections: [
    {
        title: "Content Reference Activities",
        activities: [
    {
        name: "🌍 Country → Language",
        type: "multi-mode",
        suggestion: PENDING_SUGGESTION,
        modes: [
            {
                label: "Mode 1: What language...?",
                qLabel: "Question",
                aLabel: "Answer",
                items: [
                    { q: "What language do people speak in Brazil?", a: "In Brazil, people speak Portuguese.", sideImg: FLAG+'br.png' },
                    { q: "What language do people speak in Japan?", a: "In Japan, people speak Japanese.", sideImg: FLAG+'jp.png' },
                    { q: "What language do people speak in France?", a: "In France, people speak French.", sideImg: FLAG+'fr.png' },
                    { q: "What language do people speak in China?", a: "In China, people speak Chinese.", sideImg: FLAG+'cn.png' },
                    { q: "What language do people speak in Germany?", a: "In Germany, people speak German.", sideImg: FLAG+'de.png' },
                    { q: "What language do people speak in Italy?", a: "In Italy, people speak Italian.", sideImg: FLAG+'it.png' },
                    { q: "What language do people speak in Russia?", a: "In Russia, people speak Russian.", sideImg: FLAG+'ru.png' },
                    { q: "What language do people speak in Mexico?", a: "In Mexico, people speak Spanish.", sideImg: FLAG+'mx.png' },
                    { q: "What language do people speak in the United Kingdom?", a: "In the UK, people speak English.", sideImg: FLAG+'gb.png' },
                    { q: "What language do people speak in Australia?", a: "In Australia, people speak English.", sideImg: FLAG+'au.png' },
                    { q: "What languages do people speak in Canada?", a: "In Canada, people speak English and French.", sideImg: FLAG+'ca.png' },
                    { q: "What language do people speak in Spain?", a: "In Spain, people speak Spanish.", sideImg: FLAG+'es.png' },
                    { q: "What languages do people speak in South Africa?", a: "In South Africa, people speak English and other languages.", sideImg: FLAG+'za.png' },
                ]
            },
            {
                label: "Mode 2: In (country) people speak...",
                qLabel: "Sentence",
                aLabel: "Complete",
                items: [
                    { q: "In Brazil, people speak...", a: "Portuguese", sideImg: FLAG+'br.png' },
                    { q: "In Japan, people speak...", a: "Japanese", sideImg: FLAG+'jp.png' },
                    { q: "In France, people speak...", a: "French", sideImg: FLAG+'fr.png' },
                    { q: "In China, people speak...", a: "Chinese", sideImg: FLAG+'cn.png' },
                    { q: "In Germany, people speak...", a: "German", sideImg: FLAG+'de.png' },
                    { q: "In Italy, people speak...", a: "Italian", sideImg: FLAG+'it.png' },
                    { q: "In Russia, people speak...", a: "Russian", sideImg: FLAG+'ru.png' },
                    { q: "In Mexico, people speak...", a: "Spanish", sideImg: FLAG+'mx.png' },
                    { q: "In the United Kingdom, people speak...", a: "English", sideImg: FLAG+'gb.png' },
                    { q: "In Australia, people speak...", a: "English", sideImg: FLAG+'au.png' },
                    { q: "In Canada, people speak...", a: "English and French", sideImg: FLAG+'ca.png' },
                    { q: "In Spain, people speak...", a: "Spanish", sideImg: FLAG+'es.png' },
                    { q: "In South Africa, people speak...", a: "English and other languages", sideImg: FLAG+'za.png' },
                ]
            }
        ]
    },
    {
        name: "💪 Can you...?",
        type: "can-you",
        suggestion: PENDING_SUGGESTION,
        items: [
            { q: "Can you speak French?", yes: "Yes, I can speak French.", no: "No, I can't speak French.", sideImg: FLAG+'fr.png' },
            { q: "Can you speak Japanese?", yes: "Yes, I can speak Japanese.", no: "No, I can't speak Japanese.", sideImg: FLAG+'jp.png' },
            { q: "Can you speak Chinese?", yes: "Yes, I can speak Chinese.", no: "No, I can't speak Chinese.", sideImg: FLAG+'cn.png' },
            { q: "Can you speak German?", yes: "Yes, I can speak German.", no: "No, I can't speak German.", sideImg: FLAG+'de.png' },
            { q: "Can you speak Italian?", yes: "Yes, I can speak Italian.", no: "No, I can't speak Italian.", sideImg: FLAG+'it.png' },
            { q: "Can you speak Portuguese?", yes: "Yes, I can speak Portuguese.", no: "No, I can't speak Portuguese.", sideImg: FLAG+'br.png' },
            { q: "Can you speak Russian?", yes: "Yes, I can speak Russian.", no: "No, I can't speak Russian.", sideImg: FLAG+'ru.png' },
            { q: "Can you speak Arabic?", yes: "Yes, I can speak Arabic.", no: "No, I can't speak Arabic.", icon: "🌍" },
            { q: "Can you speak English?", yes: "Yes, I can speak English!", no: "No, I can't speak English.", sideImg: FLAG+'gb.png' },
            { q: "Can you speak Spanish?", yes: "Yes, I can speak Spanish!", no: "No, I can't speak Spanish.", sideImg: FLAG+'es.png' },
        ]
    },
    {
        name: "✅❌ Do or Don't",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Show",
        aLabel: "Answer",
        items: [
            { q: "Study every day", a: "✅ DO! Study every day.", icon: "📚" },
            { q: "Watch movies in English", a: "✅ DO! Watch movies.", icon: "🎬" },
            { q: "Listen to songs in English", a: "✅ DO! Listen to songs.", icon: "🎵" },
            { q: "Read comic books", a: "✅ DO! Read comic books.", icon: "📖" },
            { q: "Be curious", a: "✅ DO! Be curious.", icon: "🔍" },
            { q: "Be patient", a: "✅ DO! Be patient.", icon: "⏳" },
            { q: "Have fun!", a: "✅ DO! Have fun!", icon: "🎉" },
            { q: "Play language games", a: "✅ DO! Play language games.", icon: "🎲" },
            { q: "Be shy", a: "❌ DON'T be shy!", icon: "🙈" },
            { q: "Give up", a: "❌ DON'T give up!", icon: "💪" },
            { q: "Be lazy", a: "❌ DON'T be lazy!", icon: "😴" },
            { q: "Get distracted", a: "❌ DON'T get distracted!", icon: "📵" },
        ]
    },
    {
        name: "👋 Hello Around the World",
        type: "hello-world",
        suggestion: HELLO_WORLD_SUGGESTION,
        modeCount: 2,
        items: [
            { q: "Bonjour!", a: "French 🇫🇷", country: "France", sideImg: FLAG+'fr.png', picture: CPHOTOS+'francia_hello_bonjour.webp' },
            { q: "Ciao!", a: "Italian 🇮🇹", country: "Italy", sideImg: FLAG+'it.png', picture: CPHOTOS+'italia_hello_ciao.webp' },
            { q: "Hallo!", a: "German 🇩🇪", country: "Germany", sideImg: FLAG+'de.png', picture: CPHOTOS+'alemania_hello_hallo.webp' },
            { q: "Olá!", a: "Portuguese 🇧🇷", country: "Brazil", sideImg: FLAG+'br.png', picture: CPHOTOS+'brasil_hello_ola.webp' },
            { q: "Konnichiwa!", a: "Japanese 🇯🇵", country: "Japan", sideImg: FLAG+'jp.png', picture: CPHOTOS+'japon_hello_konnichiwa.webp' },
            { q: "Nǐ hǎo!", a: "Chinese 🇨🇳", country: "China", sideImg: FLAG+'cn.png', picture: CPHOTOS+'china_hello_nihao.webp' },
            { q: "Mari Mari!", a: "Mapudungun 🇨🇱", country: "Chile", sideImg: FLAG+'cl.png', picture: CPHOTOS+'chile_hello_marimari.webp' },
            { q: "Hola!", a: "Spanish 🇪🇸", country: "Spain", sideImg: FLAG+'es.png', picture: CPHOTOS+'espana_hello_hola.webp' },
            { q: "Hello!", a: "English 🇬🇧", country: "United Kingdom", sideImg: FLAG+'gb.png', picture: CPHOTOS+'reinounido_hello_hello.webp' },
            { q: "Buongiorno!", a: "Italian 🇮🇹 (Good morning)", country: "Italy", sideImg: FLAG+'it.png', picture: CPHOTOS+'italia_hello_buongiorno.webp' },
            { q: "Oui!", a: "French 🇫🇷 (means 'yes')", country: "France", sideImg: FLAG+'fr.png', picture: CPHOTOS+'francia_hello_oui.webp' },
        ]
    },
    {
        name: "🗣️ Same Word, Different Country",
        type: "same-word",
        suggestion: PENDING_SUGGESTION,
        items: [
            { es: "Dulces", us: "candy", uk: "sweets", au: "lollies", icon: "🍬" },
            { es: "Zapatillas", us: "sneakers", uk: "trainers", au: "runners", icon: "👟" },
            { es: "Papas fritas", us: "French fries", uk: "chips", au: "hot chips", icon: "🍟" },
            { es: "Ascensor", us: "elevator", uk: "lift", au: "lift", icon: "🛗" },
            { es: "Semáforo", us: "traffic lights", uk: "traffic lights", au: "robots (South Africa)", icon: "🚦" },
        ]
    },
    {
        name: "🔊 Pronunciation /iː/ Sound",
        type: "sound-game",
        suggestion: PENDING_SUGGESTION,
        items: [
            { word: "Japanese", pron: "JapanESE", icon: "🔊" },
            { word: "cheese", pron: "chEEse", icon: "🔊" },
            { word: "speak", pron: "spEAk", icon: "🔊" },
            { word: "three", pron: "thrEE", icon: "🔊" },
            { word: "beach", pron: "bEAch", icon: "🔊" },
            { word: "sea", pron: "sEA", icon: "🔊" },
            { word: "tea", pron: "tEA", icon: "🔊" },
            { word: "easy", pron: "EAsy", icon: "🔊" },
            { word: "eagle", pron: "EAgle", icon: "🔊" },
            { word: "green", pron: "grEEn", icon: "🔊" },
            { word: "hello", pron: "hello", icon: "🔊" },
            { word: "car", pron: "car", icon: "🔊" },
            { word: "ball", pron: "ball", icon: "🔊" },
            { word: "match", pron: "match", icon: "🔊" },
            { word: "French", pron: "French", icon: "🔊" },
        ]
    },
    {
        name: "👅 Tongue Twister Race",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        bigText: true,
        qLabel: "Show",
        aLabel: "Faster!",
        items: [
            { q: "Tea with cream for me, please.", a: "🏆 Say it faster!", icon: "👅", highlight: [["Tea", "TEA"], ["cream", "crEAm"], ["me", "mE"], ["please", "plEAse"]] },
            { q: "It's easy to see the eagle on the green tree.", a: "🏆 Say it faster!", icon: "👅", highlight: [["easy", "EAsy"], ["see", "sEE"], ["eagle", "EAgle"], ["green", "grEEn"], ["tree", "trEE"]] },
            { q: "Please freeze the cheese with ease.", a: "🏆 Say it faster!", icon: "👅", highlight: [["Please", "PlEAse"], ["freeze", "frEEze"], ["cheese", "chEEse"], ["ease", "EAse"]] },
            { q: "She sees the sea and the sea sees her.", a: "🏆 Say it faster!", icon: "👅", highlight: [["She", "ShE"], ["sees", "sEEs"], ["sea", "sEA"]] },
        ]
    },
        ]
    },
    {
        title: "Custom Activities",
        activities: [
            { name: "🧠 I Already Know English", type: "already-know", items: ALREADY_KNOW_ENGLISH, suggestion: PENDING_SUGGESTION },
            { name: "📖 Interactive Story", type: "game", items: [], suggestion: PENDING_SUGGESTION },
            { name: "📸 Calen Photos", type: "photo-gallery", items: CALEN_PHOTOS, suggestion: PENDING_SUGGESTION },
            { name: "🌍 Guess the Country", type: "country-photos", items: COUNTRY_PHOTOS, suggestion: GUESS_THE_COUNTRY_SUGGESTION },
        ]
    }
    ]
};
