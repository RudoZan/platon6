# Use Cases — Calen English Class (`platon6/sitio-web/englishCalen2026/`)

## UC-01: Teacher Control Panel (`index.html` — `PC`)
- Launches Projection Window (`presentation.html`), manages participating students (pairs/individuals), selects active grade (`5° & 6°` or `7° & 8°`), and dispatches real-time activities to `VP`.

## UC-02: Synchronized Student Projection (`presentation.html` — `VP`)
- Receives live events from `PC` and displays active student names, questions/answers, flags, country photos, illustrated vocabulary, MediaPipe background-segmented teacher webcam, and interactive game map.

## UC-03: Calen Photos & Vocabulary (`photo-word`)
- Teacher selects local photos (`photosCalen/`) and toggles vocabulary words. Selected words are sent newline-separated (`shown.join('\n')`) and rendered stacked vertically in `VP`.

## UC-04: Countries & Languages (`country-panel`)
- Displays maps, flags, historical photos, and landmarks (`curso-fotos-paises/`) with greetings per language.

## UC-05: Interactive Scene Exploration Game (`game1`)
- First-person navigation across indoor/outdoor scenes (`house-map.js`, `game-data.js`, `StoryImages/`) controlled from `PC` and projected in `VP`.

## UC-06: Teacher References (`Reference/`)
- Popup access from `PC` to grade guides (`5to -6to.html`, `7mo y 8vo unit3_sports_teacher_reference.html`), curriculum (`bases-curriculares.html`), and Mineduc pronunciation (`pronunciacion-mineduc.html`).
