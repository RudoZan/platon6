// ══════════════════════════════════════
// COURSE: 7th & 8th Grade — Sports
// Loaded after activities/shared.js (needs COURSES, IMG/FLAG/PHOTOS/CPHOTOS,
// PENDING_SUGGESTION, ALREADY_KNOW_ENGLISH, CALEN_PHOTOS to already exist).
// ══════════════════════════════════════

const PLAY_GO_DO_SUGGESTION = `
<p>The goal of this activity is to review which verbs are used depending on the sports activity.</p>
<ul>
    <li><strong>Selection:</strong> You can select any activity freely. It is not necessary to go through all of them, nor is it required to follow a strict order; choose based on class interest and time availability.</li>
    <li><strong>Question:</strong> Click the <strong>"Sport"</strong> button to display the image and ask the question: <em>"What verb do you use with...?"</em></li>
    <li><strong>Support:</strong> If students struggle to answer, click the <strong>"¿Cómo diría...?"</strong> button. This will show a Spanish sentence on screen for students to translate directly.</li>
    <li><strong>Reveal:</strong> Finally, whether they succeed in answering or not, click the <strong>"Answer"</strong> button to display the correct answer on screen.</li>
</ul>
`;

const PLAY_GO_DO_WHICH_CORRECT_SUGGESTION = `
<p>The goal of this activity is to help students distinguish correct lexical patterns (Play/Go/Do) by comparing two sentences side-by-side.</p>
<ul>
    <li><strong>Dynamics:</strong> Select any sentence from the three columns. The first sentence you click will appear on the left side of the presentation screen, and the second on the right. You can select sentences freely (both can be correct, both incorrect, or one of each).</li>
    <li><strong>Class Interaction:</strong> Ask the class: <em>"Which sentence is correct?"</em>. Encourage them to explain why.</li>
    <li><strong>Support:</strong> Notice that correct sentences in your panel are marked with a green checkmark (✅). Sentences you have already used will show orange dots (●) inside the button indicating how many times they have been compared in the session.</li>
    <li><strong>Reveal:</strong> Click the <strong>"Reveal Answers"</strong> button. A large checkmark (✓) or cross (✗) will appear under each sentence on the projection screen.</li>
    <li><strong>Reset:</strong> Clicking any new sentence after revealing will automatically clear the screen and start a new comparison.</li>
</ul>
`;

const LITTLE_PRINCE_SUGGESTION = `
<p>This activity aims to teach chronological narration and sequence connectors (<em>First, Next, Eventually, As soon as, Soon after, Finally, In the end</em>) through the famous story of <em>The Little Prince</em>.</p>
<ol>
    <li><strong>Contextualization (Warm-up):</strong> Ask the class: <em>"Have you read 'The Little Prince'? What happens when he visits Earth?"</em>. Discuss in Spanish/English to activate prior knowledge.</li>
    <li><strong>Sequence Display:</strong> The sequence appears initially scrambled, but the teacher can modify it further as needed. When ready for students to see it on the presentation window, click <strong>"Show story"</strong>.</li>
    <li><strong>Reading & Finding Order:</strong> Read each line of the sequence together with the class to determine the correct order. Suggest asking students one by one to read a full line and say where they think it belongs in the sequence.</li>
    <li><strong>Teacher Guide Numbers:</strong> The numbers appearing at the beginning of each text in the Control Panel indicate the correct chronological order to the teacher.</li>
    <li><strong>Sequence Verification:</strong> Once the sequence is organized, read it all together or ask students one by one to read a line to verify if the order is correct.</li>
    <li><strong>Optional Focus on Connectors:</strong> Optionally, review the text by reading and translating to Spanish, placing special emphasis on the meaning of each sequence connector.</li>
</ol>
<p style="margin-top: 12px; color: #cdded4; font-style: italic;">Remember that the primary goal of this activity is not merely assembling the sequence, but becoming familiar with sequence connectors, practicing their usage, and reading aloud.</p>
`;

COURSES['7mo-8vo'] = {
    label: "7th & 8th Grade — Sports",
    sections: [
    {
        title: "Content Reference Activities",
        activities: [
    {
        name: "⚽ Play / Go / Do — What verb...?",
        type: "question-answer",
        suggestion: PLAY_GO_DO_SUGGESTION,
        qLabel: "Sport",
        aLabel: "Answer",
        items: [
            { q: "What verb do you use with basketball?", a: "PLAY basketball", sideImg: IMG+'play-basketball.png', icon: "🏀", trans: "yo juego básquetbol" },
            { q: "What verb do you use with soccer?", a: "PLAY soccer    or    PLAY football", sideImg: IMG+'play-soccer.png', icon: "⚽", trans: "yo juego fútbol" },
            { q: "What verb do you use with tennis?", a: "PLAY tennis", sideImg: IMG+'play-tennis.png', icon: "🎾", trans: "yo juego tenis" },
            { q: "What verb do you use with handball?", a: "PLAY handball", sideImg: IMG+'play-handball.png', icon: "🤾", trans: "yo juego balonmano" },
            { q: "What verb do you use with swimming?", a: "GO swimming", sideImg: IMG+'go-swimming.png', icon: "🏊", trans: "yo voy a nadar" },
            { q: "What verb do you use with skiing?", a: "GO skiing", sideImg: IMG+'go-skiing.png', icon: "⛷️", trans: "yo voy a esquiar" },
            { q: "What verb do you use with running?", a: "GO running", sideImg: IMG+'go-running.png', icon: "🏃", trans: "yo voy a correr" },
            { q: "What verb do you use with camping?", a: "GO camping", icon: "⛺", trans: "yo voy de camping" },
            { q: "What verb do you use with karate?", a: "DO karate", icon: "🥋", trans: "yo hago karate" },
            { q: "What verb do you use with boxing?", a: "DO boxing", icon: "🥊", trans: "yo practico boxeo" },
            { q: "What verb do you use with video games?", a: "PLAY video games", icon: "🎮", trans: "yo juego videojuegos" },
            { q: "What verb do you use with cards?", a: "PLAY cards", icon: "🃏", trans: "yo juego a las cartas" },
            { q: "What verb do you use with dancing?", a: "GO dancing", icon: "💃", trans: "yo voy a bailar" },
        ]
    },
    {
        name: "⚽ Play / Go / Do — Which is correct?",
        type: "which-correct",
        suggestion: PLAY_GO_DO_WHICH_CORRECT_SUGGESTION,
        items: [
            { sport: "basketball", correct: "play" },
            { sport: "soccer", correct: "play" },
            { sport: "tennis", correct: "play" },
            { sport: "handball", correct: "play" },
            { sport: "swimming", correct: "go" },
            { sport: "skiing", correct: "go" },
            { sport: "running", correct: "go" },
            { sport: "camping", correct: "go" },
            { sport: "karate", correct: "do" },
            { sport: "boxing", correct: "do" },
            { sport: "video games", correct: "play" },
            { sport: "cards", correct: "play" },
            { sport: "dancing", correct: "go" }
        ]
    },
    {
        name: "🤔 In my opinion...",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Activity",
        aLabel: "Opinion",
        items: [
            { q: "What do you think about basketball?", a: "In my opinion, basketball is exciting!", sideImg: IMG+'play-basketball.png', icon: "🏀" },
            { q: "What do you think about soccer?", a: "In my opinion, soccer is fun!", sideImg: IMG+'play-soccer.png', icon: "⚽" },
            { q: "What do you think about swimming?", a: "In my opinion, swimming is relaxing!", sideImg: IMG+'go-swimming.png', icon: "🏊" },
            { q: "What do you think about tennis?", a: "In my opinion, tennis is interesting!", sideImg: IMG+'play-tennis.png', icon: "🎾" },
            { q: "What do you think about skiing?", a: "In my opinion, skiing is dangerous!", sideImg: IMG+'go-skiing.png', icon: "⛷️" },
            { q: "What do you think about running?", a: "In my opinion, running is boring / fun!", sideImg: IMG+'go-running.png', icon: "🏃" },
            { q: "What do you think about handball?", a: "In my opinion, handball is exciting!", sideImg: IMG+'play-handball.png', icon: "🤾" },
            { q: "What do you think about boxing?", a: "In my opinion, boxing is dangerous!", icon: "🥊" },
            { q: "What do you think about video games?", a: "In my opinion, playing video games is cool!", icon: "🎮" },
            { q: "What do you think about karate?", a: "In my opinion, karate is interesting!", icon: "🥋" },
        ]
    },
    {
        name: "🏷️ Whose is this?",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Object",
        aLabel: "Answer",
        items: [
            { q: "⚽ Whose ball is this?", a: "It is Messi's.", icon: "⚽" },
            { q: "🏀 Whose basketball is this?", a: "It is LeBron's.", icon: "🏀" },
            { q: "🎾 Whose racket is this?", a: "It is Serena Williams's.", icon: "🎾" },
            { q: "🥊 Whose boxing gloves are these?", a: "They are Canelo's.", icon: "🥊" },
            { q: "🏎️ Whose car is this?", a: "It is Lewis Hamilton's.", icon: "🏎️" },
            { q: "🎿 Whose skis are these?", a: "They are Lindsey Vonn's.", icon: "🎿" },
            { q: "🏆 Whose trophy is this?", a: "It is Argentina's.", icon: "🏆" },
        ]
    },
    {
        name: "⏳ While vs When",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Clue",
        aLabel: "Sentence",
        items: [
            { q: "Mbappé / defend  ↔  Messi / play", a: "While Mbappé was defending, Messi was playing.", icon: "⚽" },
            { q: "I / run with ball  →  defender / kick ankle", a: "I was running with the ball when a defender kicked my ankle.", icon: "🏃" },
            { q: "We / play soccer  →  it / start to rain", a: "While we were playing soccer, it started to rain.", icon: "🌧️" },
            { q: "She / swim  →  referee / blow whistle", a: "She was swimming when the referee blew the whistle.", icon: "🏊" },
            { q: "They / dance  ↔  they / listen to music", a: "While they were dancing, they were listening to music.", icon: "💃" },
            { q: "I / watch TV  →  lights / go out", a: "I was watching TV when the lights went out.", icon: "📺" },
            { q: "He / ride bicycle  →  he / fall down", a: "He was riding his bicycle when he fell down.", icon: "🚲" },
            { q: "We / play cards  ↔  Mom / cook dinner", a: "While we were playing cards, Mom was cooking dinner.", icon: "🃏" },
        ]
    },
    {
        name: "🎭 Sports Charades",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Act it out!",
        aLabel: "Answer",
        items: [
            { q: "🎭 Act this out!", a: "He/She was KICKING the ball!", icon: "🦵" },
            { q: "🎭 Act this out!", a: "He/She was BOUNCING the ball!", icon: "⛹️" },
            { q: "🎭 Act this out!", a: "He/She was THROWING the ball!", icon: "🤾" },
            { q: "🎭 Act this out!", a: "He/She was CATCHING the ball!", icon: "🧤" },
            { q: "🎭 Act this out!", a: "He/She was HITTING the ball!", icon: "🏏" },
            { q: "🎭 Act this out!", a: "He/She was RIDING a bicycle!", icon: "🚲" },
            { q: "🎭 Act this out!", a: "He/She was SWIMMING!", icon: "🏊" },
            { q: "🎭 Act this out!", a: "He/She was TAKING photos!", icon: "📸" },
            { q: "🎭 Act this out!", a: "He/She was PLAYING cards!", icon: "🃏" },
            { q: "🎭 Act this out!", a: "He/She was DANCING!", icon: "💃" },
        ]
    },
    {
        name: "📋 Biography Builder",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Data",
        aLabel: "Biography",
        items: [
            { q: "LeBron James | USA | Dec 30, 1984 | Akron, Ohio | Basketball", a: "LeBron James is a famous American basketball player. He was born on December 30, 1984, in Akron, Ohio.", sideImg: FLAG+'us.png' },
            { q: "Lionel Messi | Argentina | Jun 24, 1987 | Rosario | Soccer", a: "Lionel Messi is a famous Argentine soccer player. He was born on June 24, 1987, in Rosario.", sideImg: FLAG+'ar.png' },
            { q: "Serena Williams | USA | Sep 26, 1981 | Michigan | Tennis", a: "Serena Williams is a famous American tennis player. She was born on September 26, 1981, in Michigan.", sideImg: FLAG+'us.png' },
            { q: "Roger Federer | Switzerland | Aug 8, 1981 | Basel | Tennis", a: "Roger Federer is a famous Swiss tennis player. He was born on August 8, 1981, in Basel.", sideImg: FLAG+'ch.png' },
            { q: "Francisca Mardones | Chile | Shot Put | Paralympic", a: "Francisca Mardones is a famous Chilean paralympic athlete. She had an accident. Now she plays paralympic sports.", sideImg: FLAG+'cl.png' },
            { q: "Saina Nehwal | India | Mar 17, 1990 | Haryana | Badminton", a: "Saina Nehwal is a famous Indian badminton player. She was born on March 17, 1990, in Haryana.", sideImg: FLAG+'in.png' },
        ]
    },
    {
        name: "🔢 Story Sequence",
        type: "question-answer",
        suggestion: PENDING_SUGGESTION,
        qLabel: "Event",
        aLabel: "Ordered",
        items: [
            { q: "The World Cup Final began in Qatar.", a: "First, the World Cup Final began in Qatar.", icon: "1️⃣" },
            { q: "Argentina scored in the first half.", a: "Next, Argentina scored in the first half.", icon: "2️⃣" },
            { q: "Mbappé scored two quick goals for France!", a: "Then, Mbappé scored two quick goals for France!", icon: "3️⃣" },
            { q: "The match went to extra time.", a: "After that, the match went to extra time.", icon: "4️⃣" },
            { q: "Argentina scored in the 109th minute.", a: "As soon as Argentina scored, France scored again!", icon: "5️⃣" },
            { q: "France missed two penalties in the shootout.", a: "Finally, France missed two penalties.", icon: "6️⃣" },
            { q: "Argentina won the World Cup! 🏆", a: "In the end, Argentina won the World Cup!", icon: "🏆" },
        ]
    },
    {
        name: "🔢 Story Sequence - The Little Prince",
        type: "story-sorter",
        suggestion: LITTLE_PRINCE_SUGGESTION,
        connectors: ["First,", "Next,", "Eventually,", "As soon as", "Soon after,", "Finally,", "In the end,"],
        items: [
            { id: 1, correctOrder: 1, text: "the Little Prince lived on a small planet with three volcanoes and a beautiful Rose.", label: "The Prince on B-612" },
            { id: 2, correctOrder: 2, text: "he left his planet and visited other asteroids, where he met some strange adults.", label: "Leaving and traveling" },
            { id: 3, correctOrder: 3, text: "after a long journey, he arrived on Earth and met a wild fox under an apple tree.", label: "Arrival and meeting the fox" },
            { id: 4, correctOrder: 4, text: "he tamed the fox, they became best friends.", label: "Taming and friendship" },
            { id: 5, correctOrder: 5, text: "it was time to say goodbye, the fox shared a secret: \"What is essential is invisible to the eye.\"", label: "The fox's secret" },
            { id: 6, correctOrder: 6, text: "the Prince decided to return home, because he felt responsible for his Rose.", label: "Decision to return" },
            { id: 7, correctOrder: 7, text: "the snake bit him, and his spirit returned to his star.", label: "The snake's bite and departure" }
        ]
    }
        ]
    },
    {
        title: "Custom Activities",
        activities: [
            { name: "🧠 I Already Know English", type: "already-know", items: ALREADY_KNOW_ENGLISH, suggestion: PENDING_SUGGESTION },
            { name: "📖 Interactive Story", type: "game", items: [], suggestion: PENDING_SUGGESTION },
            { name: "📸 Calen Photos", type: "photo-gallery", items: CALEN_PHOTOS, suggestion: PENDING_SUGGESTION },
        ]
    }
    ]
};
