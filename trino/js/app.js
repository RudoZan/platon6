/**
 * app.js — Navegación móvil, metas independientes y módulos de intervalos, canto y acordes.
 */

/** Versión de la aplicación — incrementar con cada release. */
const APP_VERSION = 'v1.0.0056';

const VIEWS = {
  home: { id: 'view-home', badge: 'Inicio' },
  intervals: { id: 'view-intervals', badge: 'Intervalos' },
  'interval-exercise': { id: 'view-interval-exercise', badge: 'Intervalos' },
  singing: { id: 'view-singing', badge: 'Cantar' },
  'singing-exercise': { id: 'view-singing-exercise', badge: 'Cantar' },
  chords: { id: 'view-chords', badge: 'Acordes' },
  'chord-exercise': { id: 'view-chord-exercise', badge: 'Acordes' },
  settings: { id: 'view-settings', badge: 'Ajustes' },
  stats: { id: 'view-stats', badge: 'Estadística' },
  'voice-test': { id: 'view-voice-test', badge: 'Prueba de voz' },
};

const NOTE_NAMES_ES = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
const NOTE_NAMES_EN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Teclado de la Prueba de voz: C2 (36) a C6 (84)
const VOICE_TEST_MIN_MIDI = 36;
const VOICE_TEST_MAX_MIDI = 84;
const VT_WHITE_KEY_W = 46;
const VT_BLACK_KEY_W = 30;

const DEBUG_CENTS_BANDS = [
  { label: '+100 o más', min: 100, max: null, bg: '#7f1d1d', fg: '#fca5a5' },
  { label: '+81 a +99', min: 81, max: 100, bg: '#7f2827', fg: '#fca5a5' },
  { label: '+61 a +80', min: 61, max: 81, bg: '#78350f', fg: '#fed7aa' },
  { label: '+51 a +60', min: 51, max: 61, bg: '#854d0e', fg: '#fef3c7' },
  { label: '+41 a +50', min: 41, max: 51, bg: '#713f12', fg: '#fef3c7' },
  { label: '+31 a +40', min: 31, max: 41, bg: '#5f4515', fg: '#fef3c7' },
  { label: '+21 a +30', min: 21, max: 31, bg: '#4b4818', fg: '#ecfccb' },
  { label: '+16 a +20', min: 16, max: 21, bg: '#3f4a1b', fg: '#ecfccb' },
  { label: '+11 a +15', min: 11, max: 16, bg: '#354b24', fg: '#dcfce7' },
  { label: '+6 a +10', min: 6, max: 11, bg: '#28533c', fg: '#dcfce7' },
  { label: '-5 a +5', min: -5, max: 6, bg: '#166534', fg: '#dcfce7' },
  { label: '-10 a -6', min: -10, max: -5, bg: '#164e63', fg: '#bae6fd' },
  { label: '-15 a -11', min: -15, max: -10, bg: '#16446a', fg: '#bae6fd' },
  { label: '-20 a -16', min: -20, max: -15, bg: '#1e3a8a', fg: '#bfdbfe' },
  { label: '-30 a -21', min: -30, max: -20, bg: '#263f82', fg: '#bfdbfe' },
  { label: '-40 a -31', min: -40, max: -30, bg: '#2b477b', fg: '#bfdbfe' },
  { label: '-50 a -41', min: -50, max: -40, bg: '#304d77', fg: '#bfdbfe' },
  { label: '-60 a -51', min: -60, max: -50, bg: '#355474', fg: '#cbd5e1' },
  { label: '-80 a -61', min: -80, max: -60, bg: '#3b5b73', fg: '#cbd5e1' },
  { label: '-99 a -81', min: -99, max: -80, bg: '#416273', fg: '#cbd5e1' },
  { label: '-100 o menos', min: null, max: -99, bg: '#476978', fg: '#e2e8f0' },
];

/**
 * Catálogo de intervalos en semitonos y su etiqueta en español.
 */
const INTERVAL_CATALOG = {
  '1J': { label: 'Unísono', semitones: 0 },
  '2m': { label: '2ª Menor', semitones: 1 },
  '2M': { label: '2ª Mayor', semitones: 2 },
  '3m': { label: '3ª Menor', semitones: 3 },
  '3M': { label: '3ª Mayor', semitones: 4 },
  '4J': { label: '4ª Justa', semitones: 5 },
  '4A': { label: 'Tritono', semitones: 6 },
  '5J': { label: '5ª Justa', semitones: 7 },
  '6m': { label: '6ª Menor', semitones: 8 },
  '6M': { label: '6ª Mayor', semitones: 9 },
  '7m': { label: '7ª Menor', semitones: 10 },
  '7M': { label: '7ª Mayor', semitones: 11 },
  '8J': { label: '8ª Justa', semitones: 12 },
};

const ALL_OCTAVE_INTERVALS = [
  '1J', '2m', '2M', '3m', '3M', '4J', '4A', '5J', '6m', '6M', '7m', '7M', '8J',
];

const CHORD_CATALOG = {
  unison: { label: 'Unísono', intervals: [0, 0] },
  octave: { label: 'Octava justa', intervals: [0, 12] },
  majorSecond: { label: '2ª mayor', intervals: [0, 2] },
  minorSecond: { label: '2ª menor', intervals: [0, 1] },
  majorThird: { label: '3ª mayor', intervals: [0, 4] },
  minorThird: { label: '3ª menor', intervals: [0, 3] },
  perfectFourth: { label: '4ª justa', intervals: [0, 5] },
  tritone: { label: 'Tritono', intervals: [0, 6] },
  perfectFifth: { label: '5ª justa', intervals: [0, 7] },
  minorSixth: { label: '6ª menor', intervals: [0, 8] },
  majorSixth: { label: '6ª mayor', intervals: [0, 9] },
  minorSeventh: { label: '7ª menor', intervals: [0, 10] },
  majorSeventh: { label: '7ª mayor', intervals: [0, 11] },
  major: { label: 'Mayor', intervals: [0, 4, 7] },
  minor: { label: 'Menor', intervals: [0, 3, 7] },
  augmented: { label: 'Aumentado', intervals: [0, 4, 8] },
  diminished: { label: 'Disminuido', intervals: [0, 3, 6] },
  sus2: { label: 'Sus2', intervals: [0, 2, 7] },
  sus4: { label: 'Sus4', intervals: [0, 5, 7] },
  dominantSeventh: { label: 'Séptima dominante', intervals: [0, 4, 7, 10] },
  majorSeventhChord: { label: 'Séptima mayor', intervals: [0, 4, 7, 11] },
  minorSeventhChord: { label: 'Séptima menor', intervals: [0, 3, 7, 10] },
  diminishedSeventh: { label: 'Séptima disminuida', intervals: [0, 3, 6, 9] },
  halfDiminishedSeventh: { label: 'Séptima semidisminuida', intervals: [0, 3, 6, 10] },
};

const CHORD_LEVELS = [
  { id: 1, block: 1, title: 'Díadas I · Octavas, terceras y segundas mayores', desc: 'Reconoce octavas, terceras mayores y segundas mayores.', options: ['octave', 'majorThird', 'majorSecond'] },
  { id: 2, block: 1, title: 'Díadas II · Octavas, quintas y cuartas justas', desc: 'Distingue octavas, quintas justas y cuartas justas.', options: ['octave', 'perfectFifth', 'perfectFourth'] },
  { id: 3, block: 1, title: 'Díadas III · Octavas, sextas y séptimas mayores', desc: 'Reconoce octavas, sextas y séptimas mayores.', options: ['octave', 'majorSixth', 'majorSeventh'] },
  { id: 4, block: 2, title: 'Díadas IV · Segundas y terceras', desc: 'Compara segundas y terceras mayores y menores.', options: ['majorSecond', 'minorSecond', 'majorThird', 'minorThird'] },
  { id: 5, block: 2, title: 'Díadas V · Sextas y séptimas', desc: 'Compara sextas y séptimas mayores y menores.', options: ['majorSixth', 'minorSixth', 'majorSeventh', 'minorSeventh'] },
  { id: 6, block: 2, title: 'Díadas VI · Repaso de una octava', desc: 'Repasa todos los intervalos desde unísono hasta octava.', options: ['unison', 'minorSecond', 'majorSecond', 'minorThird', 'majorThird', 'perfectFourth', 'tritone', 'perfectFifth', 'minorSixth', 'majorSixth', 'minorSeventh', 'majorSeventh', 'octave'] },
  { id: 7, block: 2, title: 'Tríadas I · Mayores y menores', desc: 'Identifica tríadas mayores y menores en posición fundamental.', options: ['major', 'minor'] },
  { id: 8, block: 3, title: 'Tríadas II · Aumentadas y disminuidas', desc: 'Distingue tríadas mayores, menores, aumentadas y disminuidas.', options: ['major', 'minor', 'augmented', 'diminished'] },
  { id: 9, block: 3, title: 'Tríadas III · Sus2 y Sus4', desc: 'Compara tríadas mayores y menores con acordes suspendidos.', options: ['major', 'minor', 'sus2', 'sus4'] },
  { id: 10, block: 3, title: 'Tríadas IV · Repaso completo', desc: 'Repasa todas las tríadas estudiadas.', options: ['major', 'minor', 'augmented', 'diminished', 'sus2', 'sus4'] },
  { id: 11, block: 3, title: 'Cuatríadas I · Séptima dominante', desc: 'Reconoce la séptima dominante y distínguela de tríadas conocidas.', targets: ['dominantSeventh'], options: ['major', 'minor', 'dominantSeventh'] },
  { id: 12, block: 4, title: 'Cuatríadas II · Séptimas mayores y menores', desc: 'Distingue acordes de séptima mayor y menor.', options: ['majorSeventhChord', 'minorSeventhChord'] },
  { id: 13, block: 4, title: 'Cuatríadas III · Disminuidas', desc: 'Compara séptimas disminuidas y semidisminuidas.', options: ['diminishedSeventh', 'halfDiminishedSeventh'] },
  { id: 14, block: 4, title: 'Cuatríadas IV · Repaso de séptimas', desc: 'Reconoce todos los tipos de séptima estudiados.', options: ['dominantSeventh', 'majorSeventhChord', 'minorSeventhChord', 'diminishedSeventh', 'halfDiminishedSeventh'] },
  { id: 15, block: 4, title: 'Integración I · Tríadas y cuatríadas', desc: 'Mezcla las tríadas y cuatríadas de los niveles anteriores.', options: ['major', 'minor', 'augmented', 'diminished', 'sus2', 'sus4', 'dominantSeventh', 'majorSeventhChord', 'minorSeventhChord', 'diminishedSeventh', 'halfDiminishedSeventh'] },
  { id: 16, block: 4, title: 'Integración II · Todos los acordes', desc: 'Reconoce díadas, tríadas y cuatríadas estudiadas.', options: Object.keys(CHORD_CATALOG) },
];

// Notas naturales de inicio para los Bloques 2 y 3 (Do3 a Mi4: Do, Re, Mi, Fa, Sol, La, Si)
const NATURAL_TONIC_MIDIS = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64];

// Bloque 1 — Nivel 1: Tónicas Do, Re, Sol (Octavas 3 y 4) -> 100% notas naturales
const LEVEL_1_RESTRICTED_PAIRS = {
  '1J': [
    [48, 48], [50, 50], [55, 55], // Do3-Do3, Re3-Re3, Sol3-Sol3
    [60, 60], [62, 62], [67, 67], // Do4-Do4, Re4-Re4, Sol4-Sol4
  ],
  '2M': [
    [48, 50], [50, 52], [55, 57], // Do3-Re3, Re3-Mi3, Sol3-La3
    [60, 62], [62, 64], [67, 69], // Do4-Re4, Re4-Mi4, Sol4-La4
  ],
};

// Bloque 1 — Niveles 2 y 3: Tónicas Do, Re, Fa, Sol (Octavas 3 y 4) -> 100% notas naturales
const LEVEL_2_3_RESTRICTED_PAIRS = {
  '1J': [
    [48, 48], [50, 50], [53, 53], [55, 55],
    [60, 60], [62, 62], [65, 65], [67, 67],
  ],
  '2M': [
    [48, 50], [50, 52], [53, 55], [55, 57], // Do-Re, Re-Mi, Fa-Sol, Sol-La
    [60, 62], [62, 64], [65, 67], [67, 69],
  ],
  '3M': [
    [48, 52], [53, 57], [55, 59], // Do-Mi, Fa-La, Sol-Si
    [60, 64], [65, 69], [67, 71],
  ],
  '5J': [
    [48, 55], [50, 57], [53, 60], [55, 62], // Do-Sol, Re-La, Fa-Do, Sol-Re
    [60, 67], [62, 69], [65, 72], [67, 74],
  ],
};

// Bloque 1 — Nivel 4: Tónicas Do, Re, Mi, Fa, Sol, La (Octavas 3 y 4) -> 100% notas naturales
const LEVEL_4_RESTRICTED_PAIRS = {
  '1J': [
    [48, 48], [50, 50], [52, 52], [53, 53], [55, 55], [57, 57],
    [60, 60], [62, 62], [64, 64], [65, 65], [67, 67], [69, 69],
  ],
  '2M': [
    [48, 50], [50, 52], [53, 55], [55, 57], [57, 59], // Do-Re, Re-Mi, Fa-Sol, Sol-La, La-Si
    [60, 62], [62, 64], [65, 67], [67, 69], [69, 71],
  ],
  '3M': [
    [48, 52], [53, 57], [55, 59], // Do-Mi, Fa-La, Sol-Si
    [60, 64], [65, 69], [67, 71],
  ],
  '4J': [
    [48, 53], [50, 55], [52, 57], [55, 60], [57, 62], // Do-Fa, Re-Sol, Mi-La, Sol-Do, La-Re
    [60, 65], [62, 67], [64, 69], [67, 72], [69, 74],
  ],
  '5J': [
    [48, 55], [50, 57], [52, 59], [53, 60], [55, 62], [57, 64], // Do-Sol, Re-La, Mi-Si, Fa-Do, Sol-Re, La-Mi
    [60, 67], [62, 69], [64, 71], [65, 72], [67, 74],
  ],
  '8J': [
    [48, 60], [50, 62], [52, 64], [53, 65], [55, 67], [57, 69], [60, 72],
  ],
};

/**
 * Progresión pedagógica de 14 niveles en 4 bloques:
 * - Bloque 1 (Niveles 1–4): Mayores y Justos (100% notas naturales en ambas notas)
 * - Bloque 2 (Niveles 5–7): Contraste Menor vs. Mayor (Tónicas naturales Do..Si, 2ª nota libre)
 * - Bloque 3 (Niveles 8–11): Intervalos Confusos y Amplios (Tónicas naturales Do..Si, 2ª nota libre)
 * - Bloque 4 (Niveles 12–14): Integración Total (Las 12 notas cromáticas en tónica y 2ª nota)
 */
const INTERVAL_LEVELS = [
  // Nivel 0: Progresivo (solo Módulo 1)
  {
    id: 0,
    block: 0,
    isProgressive: true,
    title: 'Nivel Progresivo',
    desc: 'Comienza en el Nivel 1. Avanza de nivel al acumular respuestas buenas y retrocede de nivel al acumular respuestas fallidas.',
    options: ['1J', '2M'],
  },

  // Bloque 1: Mayores y Justos (ambas notas naturales)
  {
    id: 1,
    block: 1,
    title: 'Nivel 1 · Unísono y 2ª Mayor',
    desc: 'Base inicial: Unísono y 2ª Mayor con tónicas Do, Re y Sol.',
    options: ['1J', '2M'],
    restrictedPairs: LEVEL_1_RESTRICTED_PAIRS,
  },
  {
    id: 2,
    block: 1,
    title: 'Nivel 2 · Unísono, 2ª y 3ª Mayor',
    desc: 'Mayores cortos con tónicas Do, Re, Fa y Sol.',
    options: ['1J', '2M', '3M'],
    restrictedPairs: LEVEL_2_3_RESTRICTED_PAIRS,
  },
  {
    id: 3,
    block: 1,
    title: 'Nivel 3 · Unísono, 2ª M, 3ª M y 5ª Justa',
    desc: 'Incorpora la 5ª Justa con tónicas Do, Re, Fa y Sol.',
    options: ['1J', '2M', '3M', '5J'],
    restrictedPairs: LEVEL_2_3_RESTRICTED_PAIRS,
  },
  {
    id: 4,
    block: 1,
    title: 'Nivel 4 · Mayores y Justos',
    desc: 'Suma 4ª Justa y 8ª Justa con tónicas Do, Re, Mi, Fa, Sol y La.',
    options: ['1J', '2M', '3M', '4J', '5J', '8J'],
    restrictedPairs: LEVEL_4_RESTRICTED_PAIRS,
  },

  // Bloque 2: Contraste Menor vs. Mayor (Tónicas naturales Do..Si, 2ª nota libre)
  {
    id: 5,
    block: 2,
    title: 'Nivel 5 · Unísono, 2ª Menor y 2ª Mayor',
    desc: 'Semitono vs. tono partiendo de cualquier nota natural de la escala de Do.',
    options: ['1J', '2m', '2M'],
    naturalTonicsOnly: true,
  },
  {
    id: 6,
    block: 2,
    title: 'Nivel 6 · Segundas y Terceras Completas',
    desc: 'Unísono, 2ªm, 2ªM, 3ªm y 3ªM partiendo de tónicas naturales (Do a Si).',
    options: ['1J', '2m', '2M', '3m', '3M'],
    naturalTonicsOnly: true,
  },
  {
    id: 7,
    block: 2,
    title: 'Nivel 7 · Primera Mitad de la Octava',
    desc: 'Desde Unísono hasta 5ª Justa partiendo de tónicas naturales (Do a Si).',
    options: ['1J', '2m', '2M', '3m', '3M', '4J', '5J'],
    naturalTonicsOnly: true,
  },

  // Bloque 3: Intervalos que se confunden e intervalos amplios (Tónicas naturales Do..Si, 2ª nota libre)
  {
    id: 8,
    block: 3,
    title: 'Nivel 8 · 4ª Justa, Tritono y 5ª Justa',
    desc: 'Foco en los 3 intervalos centrales partiendo de tónicas naturales (Do a Si).',
    options: ['4J', '4A', '5J'],
    naturalTonicsOnly: true,
  },
  {
    id: 9,
    block: 3,
    title: 'Nivel 9 · Quinta y Sextas (6ª m y 6ª M)',
    desc: 'Distingue 6ª Menor y 6ª Mayor desde tónicas naturales (Do a Si).',
    options: ['5J', '6m', '6M'],
    naturalTonicsOnly: true,
  },
  {
    id: 10,
    block: 3,
    title: 'Nivel 10 · Séptimas y Octava (7ª m, 7ª M y 8ª J)',
    desc: 'Reconoce 7ª Menor, 7ª Mayor y 8ª Justa desde tónicas naturales (Do a Si).',
    options: ['7m', '7M', '8J'],
    naturalTonicsOnly: true,
  },
  {
    id: 11,
    block: 3,
    title: 'Nivel 11 · Intervalos Amplios (5ª a 8ª)',
    desc: 'Saltos amplios (5ªJ, 6ªm, 6ªM, 7ªm, 7ªM y 8ªJ) desde tónicas naturales.',
    options: ['5J', '6m', '6M', '7m', '7M', '8J'],
    naturalTonicsOnly: true,
  },

  // Bloque 4: Integración Total (Las 12 notas cromáticas en tónica y 2ª nota)
  {
    id: 12,
    block: 4,
    title: 'Nivel 12 · Escala Mayor / Justos (1 Octava)',
    desc: 'Intervalos mayores y justos usando las 12 notas cromáticas en 1 octava (Do4–Do5).',
    options: ['1J', '2M', '3M', '4J', '5J', '6M', '7M', '8J'],
    midiRange: { minStart: 60, maxEnd: 72, label: '1 Octava (Do4 a Do5)' },
  },
  {
    id: 13,
    block: 4,
    title: 'Nivel 13 · Todos los Intervalos (1 Octava)',
    desc: 'Los 13 intervalos con las 12 notas cromáticas dentro de 1 octava (Do4–Do5).',
    options: ALL_OCTAVE_INTERVALS,
    midiRange: { minStart: 60, maxEnd: 72, label: '1 Octava (Do4 a Do5)' },
  },
  {
    id: 14,
    block: 4,
    title: 'Nivel 14 · Todos los Intervalos (2 Octavas)',
    desc: 'Los 13 intervalos con las 12 notas cromáticas a lo largo de 2 octavas (Do3–Do5).',
    options: ALL_OCTAVE_INTERVALS,
    midiRange: { minStart: 48, maxEnd: 72, label: '2 Octavas (Do3 a Do5)' },
  },
];

const SINGING_LEVELS = INTERVAL_LEVELS
  .filter((lvl) => !lvl.isProgressive)
  .map((lvl) => ({
    ...lvl,
    title: lvl.title.replace(' · ', ' · '),
    bpm: 72,
  }));

const STORAGE_KEY_SETTINGS = 'trino_settings_v2';
const STORAGE_KEY_PROGRESS = 'trino_interval_progress_v1';
const STORAGE_KEY_SING_PROGRESS = 'trino_singing_progress_v1';
const STORAGE_KEY_CHORD_PROGRESS = 'trino_chord_progress_v1';
const STORAGE_KEY_USER = 'trino_user_v1';
const STORAGE_KEY_DAY_LOGS = 'trino_day_logs_v1';
const STORAGE_KEY_PROG_STATE = 'trino_progressive_state_v1';
const MAX_EXERCISES_PER_MODULE = 2000;

const AUTH_NATURAL_NOTES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const AUTH_NOTE_MIDI = { Do: 60, Re: 62, Mi: 64, Fa: 65, Sol: 67, La: 69, Si: 71 };

/**
 * URL de Google Apps Script Web App para enviar el correo con las 3 notas.
 */
const TRINO_MAIL_WEBHOOK_URL =
  window.TRINO_MAIL_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbwFZbp56xCsj5KTZmt2kq1x9QRCHOTjdL0wKsC78IMXHmcixhLHqGJ21IPi_Z2v1F3xQg/exec';

class TrinoShell {
  constructor() {
    this.currentView = 'home';
    this.exerciseStarted = false;
    this.audioCtx = null;
    this.supabase = this.initSupabaseClient();
    this.currentUser = this.loadCurrentUser();
    this.pendingAuth = null;
    this.authEnteredNotes = [];

    // Configuración (mínimo diario, rango vocal y volúmenes)
    this.dailyMin = this.loadDailyMin();
    this.dailyIntervalsMin = this.loadDailyMin('dailyIntervalsMin');
    this.dailySingingMin = this.loadDailyMin('dailySingingMin');
    this.dailyChordsMin = this.loadDailyMin('dailyChordsMin');
    const vocalRange = this.loadVocalRange();
    this.vocalMinMidi = vocalRange.min;
    this.vocalMaxMidi = vocalRange.max;
    const vols = this.loadVolumes();
    this.noteVolume = vols.note;
    this.clickVolume = vols.click;
    this.rectifyVibratoEnabled = this.loadRectifyVibrato();
    const extraCfg = this.loadModulePopupConfigs();
    this.singNotesCount = extraCfg.singNotesCount;
    this.singOnlyFirstNote = extraCfg.singOnlyFirstNote;
    this.intervalGoodDelay = extraCfg.intervalGoodDelay;
    this.intervalBadDelay = extraCfg.intervalBadDelay;
    this.chordGoodDelay = extraCfg.chordGoodDelay;
    this.chordBadDelay = extraCfg.chordBadDelay;
    const progState = this.loadProgressiveState();
    this.progressiveDayKey = progState.dayKey;
    this.progressiveSubLevelId = progState.subLevelId;
    this.progressiveConsecutiveGood = progState.consecutiveGood;
    this.progressiveAccumBad = progState.accumBad;
    this.progressiveFlashTimer = null;
    this.progress = this.loadProgress(STORAGE_KEY_PROGRESS);
    this.singProgress = this.loadProgress(STORAGE_KEY_SING_PROGRESS);
    this.chordProgress = this.loadProgress(STORAGE_KEY_CHORD_PROGRESS);
    this.dayLogs = this.loadDayLogs();
    this.activeStatsReport = null;
    try {
      localStorage.removeItem('trino_stats_v1');
    } catch (_) { }

    // Estado de ejercicio activo
    this.activeModule = null; // 'intervals' | 'singing'
    this.activeLevel = null;
    this.currentQuestion = null;
    this.delayedPlayTimer = null;
    this.autoNextTimer = null;
    this.noteAnimTimers = [];
    this.sessionLog = [];
    this.singSessionLog = [];
    this.chordSessionLog = [];

    // Secuencia y grabación para Cantar Notas
    this.singBpm = this.loadSingBpm();
    this.singRafId = null;
    this.singTimers = [];
    this.isRecording = false;
    this.mediaStream = null;
    this.processorNode = null;
    this.sourceNode = null;
    this.lastVoiceFrames = [];
    this.lastNoteGrades = null;
    this.lastNoteDetails = null;
    this.lastDebugData = null;

    this.cacheDom();
    this.bindEvents();
    this.initVoiceTest();
    this.syncSettingsUi();
    this.syncAuthUi();
    this.renderIntervalLevels();
    this.renderSingingLevels();
    this.renderChordLevels();
    this.updateHomeModuleProgress();
    this.syncVersionBadge();
    this.navigateTo('home');
    if (this.currentUser?.verificado) {
      this.syncFromCloudOnLoad();
    }
  }

  cacheDom() {
    this.brandBtn = document.getElementById('brand-home-btn');
    this.versionBadge = document.getElementById('app-version-badge');
    this.menuBtn = document.getElementById('menu-toggle-btn');
    this.menuDrawer = document.getElementById('menu-drawer');
    this.bottomZone = document.getElementById('bottom-commands');
    this.homeModuleProgressLabels = document.querySelectorAll('[data-module-progress]');

    this.intervalsLevelsList = document.getElementById('intervals-levels-list');
    this.singingLevelsList = document.getElementById('singing-levels-list');
    this.chordLevelsList = document.getElementById('chord-levels-list');
    this.dailyIntervalsMinValue = document.getElementById('daily-intervals-min-value');
    this.dailyIntervalsMinDecrease = document.getElementById('daily-intervals-min-decrease');
    this.dailyIntervalsMinIncrease = document.getElementById('daily-intervals-min-increase');
    this.dailySingingMinValue = document.getElementById('daily-singing-min-value');
    this.dailySingingMinDecrease = document.getElementById('daily-singing-min-decrease');
    this.dailySingingMinIncrease = document.getElementById('daily-singing-min-increase');
    this.dailyChordsMinValue = document.getElementById('daily-chords-min-value');
    this.dailyChordsMinDecrease = document.getElementById('daily-chords-min-decrease');
    this.dailyChordsMinIncrease = document.getElementById('daily-chords-min-increase');
    this.vocalPresetSelect = document.getElementById('vocal-preset-select');
    this.vocalMinSelect = document.getElementById('vocal-min-select');
    this.vocalMaxSelect = document.getElementById('vocal-max-select');
    this.btnTestVocalMin = document.getElementById('btn-test-vocal-min');
    this.btnTestVocalMax = document.getElementById('btn-test-vocal-max');
    this.btnDetectVocalMin = document.getElementById('btn-detect-vocal-min');
    this.btnDetectVocalMax = document.getElementById('btn-detect-vocal-max');
    this.vocalDetectStatus = document.getElementById('vocal-detect-status');
    this.btnMicTester = document.getElementById('btn-mic-tester');
    this.micMeterFill = document.getElementById('mic-meter-fill');
    this.micLiveNote = document.getElementById('mic-live-note');
    this.micLiveDetail = document.getElementById('mic-live-detail');
    this.isMicTesting = false;
    this.isDetectingVocalLimit = false;
    this.noteVolumeInput = document.getElementById('note-volume-input');
    this.noteVolumeVal = document.getElementById('note-volume-val');
    this.btnTestNoteVol = document.getElementById('btn-test-note-vol');
    this.clickVolumeInput = document.getElementById('click-volume-input');
    this.clickVolumeVal = document.getElementById('click-volume-val');
    this.btnTestClickVol = document.getElementById('btn-test-click-vol');
    this.rectifyVibratoInput = document.getElementById('rectify-vibrato-input');

    // Elementos de ejercicio de Reconocer Intervalos
    this.exLevelTitle = document.getElementById('ex-level-title');
    this.exAnswersContainer = document.getElementById('ex-answers-container');
    this.exPromptText = document.getElementById('ex-prompt-text');
    this.mysteryNotesRow = document.querySelector('.mystery-notes-row');
    this.mysteryNote1 = document.getElementById('mystery-note-1');
    this.mysteryNote2 = document.getElementById('mystery-note-2');
    this.sessionLogWrapper = document.getElementById('session-log-wrapper');
    this.sessionLogTbody = document.getElementById('session-log-tbody');

    // Elementos de ejercicio de Cantar Notas
    this.singLevelTitle = document.getElementById('sing-level-title');
    this.singStaffCanvasBox = document.querySelector('.staff-canvas-box');
    this.singStaffCanvas = document.getElementById('sing-staff-canvas');
    this.singPromptText = document.getElementById('sing-prompt-text');
    this.singFeedbackText = document.getElementById('sing-feedback-text');
    this.singSessionLogWrapper = document.getElementById('sing-session-log-wrapper');
    this.singSessionLogTbody = document.getElementById('sing-session-log-tbody');
    this.chordLevelTitle = document.getElementById('chord-level-title');
    this.chordPromptText = document.getElementById('chord-prompt-text');
    this.chordAnswersContainer = document.getElementById('chord-answers-container');
    this.chordSessionLogWrapper = document.getElementById('chord-session-log-wrapper');
    this.chordSessionLogTbody = document.getElementById('chord-session-log-tbody');
    this.singDebugPanel = document.getElementById('sing-debug-panel');
    this.singDebugBody = document.getElementById('sing-debug-body');
    this.btnDebugModal = document.getElementById('btn-debug-modal');
    this.menuDebugPopupBtn = document.getElementById('menu-debug-popup-btn');
    this.debugLargeModal = document.getElementById('debug-large-modal');
    this.debugLargeBody = document.getElementById('debug-large-body');
    this.btnDebugModalClose = document.getElementById('btn-debug-modal-close');
    this.btnDebugPopupFromModal = document.getElementById('btn-debug-popup-from-modal');
    this.debugPopupWin = null;

    // Modal BPM
    this.bpmModal = document.getElementById('bpm-modal');
    this.accountUnavailableModal = document.getElementById('account-unavailable-modal');
    this.btnAccountUnavailableClose = document.getElementById('btn-account-unavailable-close');
    this.bpmModalValue = document.getElementById('bpm-modal-value');
    this.bpmRangeInput = document.getElementById('bpm-range-input');
    this.bpmMinusBtn = document.getElementById('bpm-minus-btn');
    this.bpmPlusBtn = document.getElementById('bpm-plus-btn');
    this.btnBpmConfirm = document.getElementById('btn-bpm-confirm');

    // Modal Info de Nivel
    this.levelInfoModal = document.getElementById('level-info-modal');
    this.levelInfoModalModule = document.getElementById('level-info-modal-module');
    this.levelInfoModalTitle = document.getElementById('level-info-modal-title');
    this.levelInfoModalBody = document.getElementById('level-info-modal-body');
    this.voiceTestInfoBody = document.getElementById('vt-module-info');
    this.btnLevelInfoClose = document.getElementById('btn-level-info-close');

    // Elementos de Bienvenida / Registro y Pop-up de 3 Notas
    this.homeGreetingTitle = document.getElementById('home-greeting-title');
    this.homeGuestBox = document.getElementById('home-guest-box');
    this.homeUserBox = document.getElementById('home-user-box');
    this.homeUserSubtitle = document.getElementById('home-user-subtitle');
    this.btnSettingsAuthAction = document.getElementById('btn-settings-auth-action');
    this.settingsAuthStatusText = document.getElementById('settings-auth-status-text');

    this.authModal = document.getElementById('auth-modal');
    this.authStepForm = document.getElementById('auth-step-form');
    this.authStepNotes = document.getElementById('auth-step-notes');
    this.authNameInput = document.getElementById('auth-name-input');
    this.authEmailInput = document.getElementById('auth-email-input');
    this.authFormStatus = document.getElementById('auth-form-status');
    this.btnAuthCancel1 = document.getElementById('btn-auth-cancel-1');
    this.btnAuthSubmit = document.getElementById('btn-auth-submit');
    this.authNotesSubtitle = document.getElementById('auth-notes-subtitle');
    this.authSlots = [
      document.getElementById('auth-slot-0'),
      document.getElementById('auth-slot-1'),
      document.getElementById('auth-slot-2'),
    ];
    this.btnAuthNoteBack = document.getElementById('btn-auth-note-back');
    this.authNotesGrid = document.getElementById('auth-notes-grid');
    this.authNotesStatus = document.getElementById('auth-notes-status');
    this.btnAuthCancel2 = document.getElementById('btn-auth-cancel-2');

    // Menú Acerca de y Cerrar sesión
    this.menuAboutBtn = document.getElementById('menu-about-btn');
    this.menuLogoutBtn = document.getElementById('menu-logout-btn');
    this.aboutModal = document.getElementById('about-modal');
    this.aboutModalVersion = document.getElementById('about-modal-version');
    this.btnAboutClose = document.getElementById('btn-about-close');

    // Vista Ver estadística
    this.statsMainTitle = document.getElementById('stats-main-title');
    this.btnStatsClose = document.getElementById('btn-stats-close');
    this.statsMenuPanel = document.getElementById('stats-menu-panel');
    this.statsReportPanel = document.getElementById('stats-report-panel');
    this.statsReportTitle = document.getElementById('stats-report-title');
    this.statsReportBody = document.getElementById('stats-report-body');
  }

  syncVersionBadge() {
    if (this.versionBadge) {
      this.versionBadge.textContent = APP_VERSION;
    }
    if (this.aboutModalVersion) {
      this.aboutModalVersion.textContent = APP_VERSION;
    }
  }

  getFormattedSpanishDate() {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const now = new Date();
    const dayName = days[now.getDay()];
    return `${dayName} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  }

  getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  getYesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /**
   * Clave de día exclusiva para el Nivel Progresivo: el cambio de día ocurre a las 02:00 AM.
   * Restamos 2 horas a la hora actual para que entre las 00:00 y 01:59 AM siga contando como el mismo día.
   */
  getProgressiveDayKey() {
    const shifted = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const y = shifted.getFullYear();
    const m = String(shifted.getMonth() + 1).padStart(2, '0');
    const d = String(shifted.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  loadProgressiveState() {
    const currentDayKey = this.getProgressiveDayKey();
    const maxSubLevelId = Math.max(...INTERVAL_LEVELS.filter((l) => !l.isProgressive).map((l) => l.id));
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROG_STATE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.dayKey === currentDayKey) {
          const subId = parseInt(parsed.subLevelId, 10);
          const cGood = parseInt(parsed.consecutiveGood, 10);
          const aBad = parseInt(parsed.accumBad, 10);
          return {
            dayKey: currentDayKey,
            subLevelId: subId >= 1 && subId <= maxSubLevelId ? subId : 1,
            consecutiveGood: cGood >= 0 && cGood < 10 ? cGood : 0,
            accumBad: aBad >= 0 && aBad < 10 ? aBad : 0,
          };
        }
      }
    } catch (_) { }
    return {
      dayKey: currentDayKey,
      subLevelId: 1,
      consecutiveGood: 0,
      accumBad: 0,
    };
  }

  saveProgressiveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY_PROG_STATE,
        JSON.stringify({
          dayKey: this.progressiveDayKey,
          subLevelId: this.progressiveSubLevelId,
          consecutiveGood: this.progressiveConsecutiveGood,
          accumBad: this.progressiveAccumBad,
        })
      );
    } catch (_) { }
  }

  syncProgressiveDayState() {
    const currentDayKey = this.getProgressiveDayKey();
    if (this.progressiveDayKey !== currentDayKey) {
      this.progressiveDayKey = currentDayKey;
      this.progressiveSubLevelId = 1;
      this.progressiveConsecutiveGood = 0;
      this.progressiveAccumBad = 0;
      this.saveProgressiveState();
      return true;
    }
    return false;
  }

  /* =========================================================================
   * ESTADÍSTICA EN VIVO DESDE dayLogs (SIN DATOS DUPLICADOS)
   * ========================================================================= */

  showStatsMenu() {
    this.activeStatsReport = null;
    if (this.statsMainTitle) this.statsMainTitle.textContent = 'Ver estadística';
    this.statsMenuPanel?.classList.remove('hidden');
    this.statsReportPanel?.classList.add('hidden');
    if (this.currentView === 'stats') {
      this.renderBottomCommands('stats');
    }
  }

  openStatsReport(reportKey) {
    this.activeStatsReport = reportKey;
    this.statsMenuPanel?.classList.add('hidden');
    this.statsReportPanel?.classList.remove('hidden');

    const titles = {
      'm1-abs': 'Módulo 1 · Intervalos absolutos',
      'm1-notes': 'Módulo 1 · Intervalos por nota',
      'm2-notes': 'Módulo 2 · Canto de Notas',
      'm4-notes': 'Módulo 4 · Canto de Notas',
    };
    if (this.statsReportTitle) {
      this.statsReportTitle.textContent = titles[reportKey] || 'Estadística';
    }

    if (this.statsReportBody) {
      if (reportKey === 'm1-abs') {
        this.statsReportBody.innerHTML = this.buildM1AbsTableHtml();
      } else if (reportKey === 'm1-notes') {
        this.statsReportBody.innerHTML = this.buildM1ByNoteTableHtml();
      } else if (reportKey === 'm2-notes') {
        this.statsReportBody.innerHTML = this.buildSingingNotesTableHtml('singing');
      } else if (reportKey === 'm4-notes') {
        this.statsReportBody.innerHTML = this.buildSingingNotesTableHtml('voiceTest');
      }
    }

    this.renderBottomCommands('stats');
  }

  formatStatCell(val, colorCls) {
    const n = Number(val) || 0;
    if (n === 0) return `<td class="stats-val-zero">-</td>`;
    return `<td class="${colorCls}">${n}</td>`;
  }

  formatDateDdMmYyyy(dateKey) {
    const parts = String(dateKey || '').split('-');
    if (parts.length === 3) {
      return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
    }
    return dateKey;
  }

  buildStatsPeriodFooterHtml(moduleKey) {
    const modLogs = this.dayLogs?.[moduleKey] || {};
    let totalEx = 0;
    const dates = [];
    const todayKey = this.getTodayKey();

    Object.keys(modLogs).forEach((lvlId) => {
      const list = Array.isArray(modLogs[lvlId]) ? modLogs[lvlId] : [];
      list.forEach((it) => {
        if (!it) return;
        totalEx += 1;
        dates.push(it.date || todayKey);
      });
    });

    if (totalEx === 0) {
      return `<p class="stats-period-footer">Sin ejercicios registrados aún.</p>`;
    }

    dates.sort();
    const minDate = this.formatDateDdMmYyyy(dates[0]);
    const maxDate = this.formatDateDdMmYyyy(dates[dates.length - 1]);
    return `<p class="stats-period-footer">Estadística respecto de ${totalEx} ${totalEx === 1 ? 'ejercicio' : 'ejercicios'}.<br>Durante el periodo del ${minDate} al ${maxDate}</p>`;
  }

  /**
   * Extrae { midi1, midi2, intervalKey, isCorrect } de cualquier registro de this.dayLogs.intervals,
   * tanto si ya trae midi1/midi2/intervalKey como si proviene de registros anteriores con solo notes/answer.
   */
  resolveIntervalLogItem(item, levelId) {
    if (!item) return null;
    if (item.intervalKey && Number.isFinite(item.midi1) && Number.isFinite(item.midi2)) {
      return {
        midi1: item.midi1,
        midi2: item.midi2,
        intervalKey: item.intervalKey,
        isCorrect: Boolean(item.isCorrect),
      };
    }

    const parts = String(item.notes || '').split('-').map((s) => s.trim());
    const n1Name = parts[0];
    const n2Name = parts[1];
    const pc1 = NOTE_NAMES_ES.indexOf(n1Name);
    const pc2 = NOTE_NAMES_ES.indexOf(n2Name);
    if (pc1 < 0 || pc2 < 0) return null;

    const lvl = INTERVAL_LEVELS.find((l) => String(l.id) === String(levelId));
    const lvlOpts = lvl?.options || Object.keys(INTERVAL_CATALOG);

    let intervalKey = null;
    if (item.isCorrect && item.answer) {
      intervalKey = Object.keys(INTERVAL_CATALOG).find(
        (k) => INTERVAL_CATALOG[k].label === item.answer
      ) || null;
    }

    const diffPc = (pc2 - pc1 + 12) % 12;
    if (!intervalKey) {
      if (diffPc === 0) {
        if (lvlOpts.includes('1J') && !lvlOpts.includes('8J')) intervalKey = '1J';
        else if (lvlOpts.includes('8J') && !lvlOpts.includes('1J')) intervalKey = '8J';
        else intervalKey = '1J';
      } else {
        intervalKey = Object.keys(INTERVAL_CATALOG).find(
          (k) => INTERVAL_CATALOG[k].semitones === diffPc
        ) || null;
      }
    }
    if (!intervalKey) return null;

    const semitones = INTERVAL_CATALOG[intervalKey]?.semitones ?? diffPc;
    let midi1 = 60 + pc1; // Octava 4 por defecto para registros sin octava explícita
    if (lvl?.restrictedPairs?.[intervalKey]) {
      const pair = lvl.restrictedPairs[intervalKey].find(([m1]) => ((m1 % 12) + 12) % 12 === pc1);
      if (pair) midi1 = pair[0];
    }
    const midi2 = midi1 + semitones;

    return {
      midi1,
      midi2,
      intervalKey,
      isCorrect: Boolean(item.isCorrect),
    };
  }

  collectM1StatsFromDayLogs() {
    const m1Abs = {};
    const m1ByNote = {};
    const intervalsLog = this.dayLogs?.intervals || {};

    Object.keys(intervalsLog).forEach((lvlId) => {
      const list = Array.isArray(intervalsLog[lvlId]) ? intervalsLog[lvlId] : [];
      list.forEach((item) => {
        const resolved = this.resolveIntervalLogItem(item, lvlId);
        if (!resolved) return;
        const { midi1, midi2, intervalKey, isCorrect } = resolved;

        if (!m1Abs[intervalKey]) m1Abs[intervalKey] = { good: 0, bad: 0 };
        if (isCorrect) m1Abs[intervalKey].good += 1;
        else m1Abs[intervalKey].bad += 1;

        const pairId = `${midi1}-${midi2}-${intervalKey}`;
        if (!m1ByNote[pairId]) {
          m1ByNote[pairId] = { midi1, midi2, intervalKey, good: 0, bad: 0 };
        }
        if (isCorrect) m1ByNote[pairId].good += 1;
        else m1ByNote[pairId].bad += 1;
      });
    });

    return { m1Abs, m1ByNote };
  }

  collectSingingNotesFromDayLogs(moduleKey) {
    const noteStore = {};
    const modLogs = this.dayLogs?.[moduleKey] || {};

    Object.keys(modLogs).forEach((lvlId) => {
      const list = Array.isArray(modLogs[lvlId]) ? modLogs[lvlId] : [];
      list.forEach((item) => {
        const targetNames = String(item?.notes || '').split('<br>').map((s) => s.trim()).filter(Boolean);
        const ns = Array.isArray(item?.noteStats) ? item.noteStats : [];
        ns.forEach((nStat, idx) => {
          let midi = Number.isFinite(nStat?.midi) ? Math.round(nStat.midi) : null;
          if (midi === null) {
            const tName = targetNames[idx];
            const pc = NOTE_NAMES_ES.indexOf(tName);
            if (pc >= 0) {
              let oct = 4;
              const mMatch = String(nStat?.sungNote || '').match(/(-?\d+)$/);
              if (mMatch) {
                const parsedOct = parseInt(mMatch[1], 10);
                if (parsedOct >= 2 && parsedOct <= 6) oct = parsedOct;
              }
              midi = (oct + 1) * 12 + pc;
            }
          }
          if (midi === null) return;
          const key = String(midi);
          if (!noteStore[key]) {
            noteStore[key] = { malo: 0, casi: 0, aceptable: 0, bueno: 0, admirable: 0 };
          }
          const g = ['malo', 'casi', 'aceptable', 'bueno', 'admirable'].includes(nStat?.grade)
            ? nStat.grade
            : 'malo';
          noteStore[key][g] += 1;
        });
      });
    });

    return noteStore;
  }

  buildM1AbsTableHtml() {
    const { m1Abs: abs } = this.collectM1StatsFromDayLogs();
    const orderedKeys = Object.keys(INTERVAL_CATALOG).sort(
      (a, b) => (INTERVAL_CATALOG[a].semitones ?? 0) - (INTERVAL_CATALOG[b].semitones ?? 0)
    );
    const rows = orderedKeys
      .map((key) => {
        const cat = INTERVAL_CATALOG[key];
        const entry = abs[key] || { good: 0, bad: 0 };
        return `
          <tr>
            <td><strong>${cat.label}</strong></td>
            ${this.formatStatCell(entry.good, 'stats-val-good')}
            ${this.formatStatCell(entry.bad, 'stats-val-bad')}
          </tr>
        `;
      })
      .join('');

    return `
      <div class="stats-table-wrap">
        <table class="stats-data-table">
          <thead>
            <tr>
              <th>Intervalo</th>
              <th>Buenas</th>
              <th>Fallidas</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${this.buildStatsPeriodFooterHtml('intervals')}
    `;
  }

  buildM1ByNoteTableHtml() {
    const { m1ByNote: byNote } = this.collectM1StatsFromDayLogs();
    const intervalOrder = Object.keys(INTERVAL_CATALOG).sort(
      (a, b) => (INTERVAL_CATALOG[a].semitones ?? 0) - (INTERVAL_CATALOG[b].semitones ?? 0)
    );
    const orderIdx = new Map(intervalOrder.map((k, idx) => [k, idx]));

    const items = Object.values(byNote).filter((it) => it && (it.good || 0) + (it.bad || 0) > 0);
    if (items.length === 0) {
      return `<div class="stats-table-wrap"><p class="stats-empty-msg">Sin registros aún.</p></div>${this.buildStatsPeriodFooterHtml('intervals')}`;
    }

    items.sort((a, b) => {
      const ia = orderIdx.get(a.intervalKey) ?? 999;
      const ib = orderIdx.get(b.intervalKey) ?? 999;
      if (ia !== ib) return ia - ib;
      if (a.midi1 !== b.midi1) return a.midi1 - b.midi1;
      return (a.midi2 ?? a.midi1) - (b.midi2 ?? b.midi1);
    });

    const rows = items
      .map((it) => {
        const n1 = this.midiToNoteWithOctaveEs(it.midi1);
        const n2 = this.midiToNoteWithOctaveEs(it.midi2);
        const label = INTERVAL_CATALOG[it.intervalKey]?.label || it.intervalKey;
        return `
          <tr>
            <td><strong>${n1}-${n2}</strong></td>
            <td>${label}</td>
            ${this.formatStatCell(it.good, 'stats-val-good')}
            ${this.formatStatCell(it.bad, 'stats-val-bad')}
          </tr>
        `;
      })
      .join('');

    return `
      <div class="stats-table-wrap">
        <table class="stats-data-table">
          <thead>
            <tr>
              <th>Notas</th>
              <th>Intervalo</th>
              <th>Buenas</th>
              <th>Fallidas</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${this.buildStatsPeriodFooterHtml('intervals')}
    `;
  }

  buildSingingNotesTableHtml(moduleKey) {
    const noteStore = this.collectSingingNotesFromDayLogs(moduleKey);
    const midisWithData = Object.keys(noteStore)
      .map((k) => parseInt(k, 10))
      .filter((m) => {
        if (!Number.isFinite(m)) return false;
        const r = noteStore[String(m)];
        if (!r) return false;
        const total = (r.malo || 0) + (r.casi || 0) + (r.aceptable || 0) + (r.bueno || 0) + (r.admirable || 0);
        return total > 0;
      });

    if (midisWithData.length === 0) {
      return `<div class="stats-table-wrap"><p class="stats-empty-msg">Sin registros aún.</p></div>${this.buildStatsPeriodFooterHtml(moduleKey)}`;
    }

    const minMidi = Math.min(...midisWithData);
    const maxMidi = Math.max(...midisWithData);
    const sharpPcs = [1, 3, 6, 8, 10];
    const rowsHtml = [];

    for (let m = minMidi; m <= maxMidi; m++) {
      const r = noteStore[String(m)] || { malo: 0, casi: 0, aceptable: 0, bueno: 0, admirable: 0 };
      const total = (r.malo || 0) + (r.casi || 0) + (r.aceptable || 0) + (r.bueno || 0) + (r.admirable || 0);
      const isSharp = sharpPcs.includes(((m % 12) + 12) % 12);
      if (total === 0 && isSharp) continue;

      const noteLabel = this.midiToNoteWithOctaveEs(m);
      rowsHtml.push(`
        <tr>
          <td><strong>${noteLabel}</strong></td>
          ${this.formatStatCell(r.malo, 'stats-val-bad')}
          ${this.formatStatCell(r.casi, 'stats-val-reg')}
          ${this.formatStatCell(r.aceptable, 'stats-val-acep')}
          ${this.formatStatCell(r.bueno, 'stats-val-good')}
          ${this.formatStatCell(r.admirable, 'stats-val-adm')}
        </tr>
      `);
    }

    return `
      <div class="stats-table-wrap">
        <table class="stats-data-table">
          <thead>
            <tr>
              <th>Nota</th>
              <th>Fallidas</th>
              <th>Regulares</th>
              <th>Aceptables</th>
              <th>Buenas</th>
              <th>Admirables</th>
            </tr>
          </thead>
          <tbody>${rowsHtml.join('')}</tbody>
        </table>
      </div>
      ${this.buildStatsPeriodFooterHtml(moduleKey)}
    `;
  }

  enforceModuleLogCap(modObj, maxCount = MAX_EXERCISES_PER_MODULE) {
    if (!modObj || typeof modObj !== 'object') return;
    const allRefs = [];
    Object.keys(modObj).forEach((lvlId) => {
      const arr = Array.isArray(modObj[lvlId]) ? modObj[lvlId] : [];
      arr.forEach((item, pos) => {
        if (item) {
          allRefs.push({ lvlId, item, date: item.date || '0000-00-00', index: Number(item.index) || 0, pos });
        }
      });
    });
    if (allRefs.length <= maxCount) return;

    // Ordenar del más reciente al más antiguo
    allRefs.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      if (a.pos !== b.pos) return a.pos - b.pos;
      return b.index - a.index;
    });

    const keepSet = new Set(allRefs.slice(0, maxCount).map((r) => r.item));
    Object.keys(modObj).forEach((lvlId) => {
      modObj[lvlId] = (modObj[lvlId] || []).filter((it) => keepSet.has(it));
      if (modObj[lvlId].length === 0) delete modObj[lvlId];
    });
  }

  loadDayLogs() {
    const cleanStore = { intervals: {}, singing: {}, chords: {}, voiceTest: {} };
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DAY_LOGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        ['intervals', 'singing', 'chords', 'voiceTest'].forEach((mod) => {
          const modObj = parsed?.[mod] || {};
          Object.keys(modObj).forEach((lvlId) => {
            const arr = Array.isArray(modObj[lvlId]) ? modObj[lvlId].filter(Boolean) : [];
            if (arr.length > 0) {
              cleanStore[mod][lvlId] = arr;
            }
          });
          this.enforceModuleLogCap(cleanStore[mod], MAX_EXERCISES_PER_MODULE);
        });
      }
    } catch (_) { }
    return cleanStore;
  }

  saveDayLogs() {
    const modules = ['intervals', 'singing', 'chords', 'voiceTest'];
    modules.forEach((mod) => {
      if (!this.dayLogs[mod]) this.dayLogs[mod] = {};
      this.enforceModuleLogCap(this.dayLogs[mod], MAX_EXERCISES_PER_MODULE);
    });
    try {
      localStorage.setItem(STORAGE_KEY_DAY_LOGS, JSON.stringify(this.dayLogs));
    } catch (_) {
      // Fallback ante QuotaExceededError: recortar 10% más antiguo y reintentar
      try {
        modules.forEach((mod) => {
          this.enforceModuleLogCap(this.dayLogs[mod], Math.floor(MAX_EXERCISES_PER_MODULE * 0.9));
        });
        localStorage.setItem(STORAGE_KEY_DAY_LOGS, JSON.stringify(this.dayLogs));
      } catch (__) { }
    }
  }

  getLevelDayLog(moduleType, levelId) {
    if (!this.dayLogs[moduleType]) this.dayLogs[moduleType] = {};
    if (!Array.isArray(this.dayLogs[moduleType][levelId])) {
      this.dayLogs[moduleType][levelId] = [];
    }
    return this.dayLogs[moduleType][levelId];
  }

  getDailyTypeCounts(moduleType) {
    const today = this.getTodayKey();
    const yesterday = this.getYesterdayKey();
    const progressStore = moduleType === 'singing'
      ? this.singProgress
      : moduleType === 'chords' ? this.chordProgress : this.progress;
    const levelStats = progressStore.levels || {};
    const levelLogs = this.dayLogs[moduleType] || {};
    const levelIds = new Set([...Object.keys(levelStats), ...Object.keys(levelLogs)]);
    let todayDone = 0;
    let yesterdayDone = 0;

    levelIds.forEach((levelId) => {
      const stats = levelStats[levelId] || {};
      const entries = levelLogs[levelId] || [];
      const loggedToday = entries.filter((entry) => entry.date === today).length;
      const loggedYesterday = entries.filter((entry) => entry.date === yesterday).length;
      const storedToday = progressStore.date === today
        ? (Number(stats.good) || 0) + (Number(stats.bad) || 0)
        : 0;
      todayDone += Math.max(loggedToday, storedToday);
      yesterdayDone += loggedYesterday;
    });

    return { todayDone, yesterdayDone };
  }

  updateHomeModuleProgress() {
    const moduleGoals = {
      intervals: this.dailyIntervalsMin,
      singing: this.dailySingingMin,
      chords: this.dailyChordsMin,
    };

    this.homeModuleProgressLabels?.forEach((label) => {
      const moduleType = label.getAttribute('data-module-progress');
      const goal = moduleGoals[moduleType];
      if (!goal) return;
      const { todayDone } = this.getDailyTypeCounts(moduleType);
      const moduleNumber = moduleType === 'intervals' ? 1 : moduleType === 'singing' ? 2 : 3;
      label.textContent = `MÓDULO ${moduleNumber} - Hoy ${todayDone}/${goal}`;
    });
  }

  pushLevelDayLog(moduleType, levelId, entry) {
    const list = this.getLevelDayLog(moduleType, levelId);
    list.unshift(entry);
    this.saveDayLogs();
  }

  loadDailyMin(settingKey = 'dailyMin') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        const storedValue = parsed[settingKey] ?? (settingKey !== 'dailyMin' ? parsed.dailyMin : undefined);
        const val = parseInt(storedValue, 10);
        if (val >= 10 && val <= 200 && val % 10 === 0) return val;
      }
    } catch (_) { }
    return 100;
  }

  getCurrentConfigObject() {
    return {
      dailyMin: this.dailyMin,
      dailyIntervalsMin: this.dailyIntervalsMin,
      dailySingingMin: this.dailySingingMin,
      dailyChordsMin: this.dailyChordsMin,
      singBpm: this.singBpm,
      vocalMinMidi: this.vocalMinMidi,
      vocalMaxMidi: this.vocalMaxMidi,
      noteVolume: this.noteVolume,
      clickVolume: this.clickVolume,
      rectifyVibrato: this.rectifyVibratoEnabled,
      singNotesCount: this.singNotesCount,
      singOnlyFirstNote: this.singOnlyFirstNote,
      intervalGoodDelay: this.intervalGoodDelay,
      intervalBadDelay: this.intervalBadDelay,
      chordGoodDelay: this.chordGoodDelay,
      chordBadDelay: this.chordBadDelay,
    };
  }

  loadModulePopupConfigs() {
    const validDelays = ['0', '1', '2', '3', 'none'];
    const normDelay = (val, defVal) => (validDelays.includes(String(val)) ? String(val) : defVal);
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        const nCount = parseInt(parsed.singNotesCount, 10);
        return {
          singNotesCount: nCount >= 1 && nCount <= 4 ? nCount : 2,
          singOnlyFirstNote: parsed.singOnlyFirstNote === true,
          intervalGoodDelay: normDelay(parsed.intervalGoodDelay, '1'),
          intervalBadDelay: normDelay(parsed.intervalBadDelay, 'none'),
          chordGoodDelay: normDelay(parsed.chordGoodDelay, '1'),
          chordBadDelay: normDelay(parsed.chordBadDelay, 'none'),
        };
      }
    } catch (_) { }
    return {
      singNotesCount: 2,
      singOnlyFirstNote: false,
      intervalGoodDelay: '1',
      intervalBadDelay: 'none',
      chordGoodDelay: '1',
      chordBadDelay: 'none',
    };
  }

  saveAllSettings() {
    const cfg = this.getCurrentConfigObject();
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(cfg));
    } catch (_) { }
    if (this.currentUser?.verificado && this.supabase) {
      this.supabase
        .from('trino_usuarios')
        .update({ configuracion: cfg })
        .eq('email', this.currentUser.email)
        .then(() => { });
    }
  }

  saveDailyMin(moduleType, val) {
    if (moduleType === 'singing') this.dailySingingMin = val;
    else if (moduleType === 'chords') this.dailyChordsMin = val;
    else this.dailyIntervalsMin = val;
    this.saveAllSettings();
  }

  loadVocalRange() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        const min = parseInt(parsed.vocalMinMidi, 10);
        const max = parseInt(parsed.vocalMaxMidi, 10);
        if (min >= 36 && max <= 84 && max - min >= 12) {
          return { min, max };
        }
      }
    } catch (_) { }
    return { min: 48, max: 72 }; // Do3 a Do5 por defecto
  }

  loadVolumes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        const note = parseInt(parsed.noteVolume, 10);
        const click = parseInt(parsed.clickVolume, 10);
        return {
          note: note >= 10 && note <= 100 ? note : 80,
          click: click >= 10 && click <= 100 ? click : 90,
        };
      }
    } catch (_) { }
    return { note: 80, click: 90 };
  }

  loadRectifyVibrato() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) return JSON.parse(raw).rectifyVibrato === true;
    } catch (_) { }
    return false;
  }

  loadSingBpm() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        const val = parseInt(parsed.singBpm, 10);
        if (val >= 40 && val <= 140) return val;
      }
    } catch (_) { }
    return 72;
  }

  saveSingBpm(val) {
    this.singBpm = Math.max(40, Math.min(140, val));
    this.saveAllSettings();
  }

  loadProgress(storageKey) {
    const today = this.getTodayKey();
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.date !== today) {
          const resetLevels = {};
          Object.keys(parsed.levels || {}).forEach((id) => {
            resetLevels[id] = {
              good: 0,
              bad: 0,
              stars: parsed.levels[id].stars || 0,
            };
          });
          return { date: today, levels: resetLevels };
        }
        return parsed;
      }
    } catch (_) { }
    return { date: today, levels: {} };
  }

  saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(this.progress));
      localStorage.setItem(STORAGE_KEY_SING_PROGRESS, JSON.stringify(this.singProgress));
      localStorage.setItem(STORAGE_KEY_CHORD_PROGRESS, JSON.stringify(this.chordProgress));
    } catch (_) { }
  }

  getLevelStats(levelId, moduleType = 'intervals') {
    const store = moduleType === 'singing'
      ? this.singProgress
      : moduleType === 'chords' ? this.chordProgress : this.progress;
    if (!store.levels[levelId]) {
      store.levels[levelId] = { good: 0, bad: 0, stars: 0 };
    }
    return store.levels[levelId];
  }

  syncSettingsUi() {
    if (this.rectifyVibratoInput) this.rectifyVibratoInput.checked = this.rectifyVibratoEnabled;
    if (this.dailyIntervalsMinValue) this.dailyIntervalsMinValue.textContent = `${this.dailyIntervalsMin} diarios`;
    if (this.dailyIntervalsMinDecrease) this.dailyIntervalsMinDecrease.disabled = this.dailyIntervalsMin <= 10;
    if (this.dailyIntervalsMinIncrease) this.dailyIntervalsMinIncrease.disabled = this.dailyIntervalsMin >= 200;
    if (this.dailySingingMinValue) this.dailySingingMinValue.textContent = `${this.dailySingingMin} diarios`;
    if (this.dailySingingMinDecrease) this.dailySingingMinDecrease.disabled = this.dailySingingMin <= 10;
    if (this.dailySingingMinIncrease) this.dailySingingMinIncrease.disabled = this.dailySingingMin >= 200;
    if (this.dailyChordsMinValue) this.dailyChordsMinValue.textContent = `${this.dailyChordsMin} diarios`;
    if (this.dailyChordsMinDecrease) this.dailyChordsMinDecrease.disabled = this.dailyChordsMin <= 10;
    if (this.dailyChordsMinIncrease) this.dailyChordsMinIncrease.disabled = this.dailyChordsMin >= 200;

    // Poblar selectores de nota mínima y máxima si aún están vacíos (Do2=36 a Do6=84)
    if (this.vocalMinSelect && this.vocalMinSelect.options.length === 0) {
      let optsMin = '';
      let optsMax = '';
      for (let m = 36; m <= 72; m++) {
        optsMin += `<option value="${m}">${this.midiToNoteWithOctaveEs(m)}</option>`;
      }
      for (let m = 48; m <= 84; m++) {
        optsMax += `<option value="${m}">${this.midiToNoteWithOctaveEs(m)}</option>`;
      }
      this.vocalMinSelect.innerHTML = optsMin;
      if (this.vocalMaxSelect) this.vocalMaxSelect.innerHTML = optsMax;
    }

    if (this.vocalMinSelect) this.vocalMinSelect.value = String(this.vocalMinMidi);
    if (this.vocalMaxSelect) this.vocalMaxSelect.value = String(this.vocalMaxMidi);

    if (this.vocalPresetSelect) {
      const pairKey = `${this.vocalMinMidi}-${this.vocalMaxMidi}`;
      const hasPreset = Array.from(this.vocalPresetSelect.options).some((o) => o.value === pairKey);
      this.vocalPresetSelect.value = hasPreset ? pairKey : 'custom';
    }

    if (this.noteVolumeInput) this.noteVolumeInput.value = String(this.noteVolume);
    if (this.noteVolumeVal) this.noteVolumeVal.textContent = `${this.noteVolume}%`;
    if (this.clickVolumeInput) this.clickVolumeInput.value = String(this.clickVolume);
    if (this.clickVolumeVal) this.clickVolumeVal.textContent = `${this.clickVolume}%`;
  }

  bindEvents() {
    this.menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.menuDrawer.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      this.menuDrawer.classList.add('hidden');
    });

    this.brandBtn.addEventListener('click', () => {
      this.navigateTo('home');
    });

    document.querySelectorAll('[data-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        this.navigateTo(target);
      });
    });

    document.querySelectorAll('[data-open-module]').forEach((card) => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-open-module');
        this.navigateTo(target);
      });
    });

    const adjustDailyGoal = (moduleType, amount) => {
      const currentGoal = moduleType === 'singing'
        ? this.dailySingingMin
        : moduleType === 'chords' ? this.dailyChordsMin : this.dailyIntervalsMin;
      this.saveDailyMin(moduleType, Math.max(10, Math.min(200, currentGoal + amount)));
      this.syncSettingsUi();
      this.renderIntervalLevels();
      this.renderSingingLevels();
      this.renderChordLevels();
      this.updateHomeModuleProgress();
    };
    this.dailyIntervalsMinDecrease?.addEventListener('click', () => adjustDailyGoal('intervals', -10));
    this.dailyIntervalsMinIncrease?.addEventListener('click', () => adjustDailyGoal('intervals', 10));
    this.dailySingingMinDecrease?.addEventListener('click', () => adjustDailyGoal('singing', -10));
    this.dailySingingMinIncrease?.addEventListener('click', () => adjustDailyGoal('singing', 10));
    this.dailyChordsMinDecrease?.addEventListener('click', () => adjustDailyGoal('chords', -10));
    this.dailyChordsMinIncrease?.addEventListener('click', () => adjustDailyGoal('chords', 10));

    this.rectifyVibratoInput?.addEventListener('change', () => {
      this.rectifyVibratoEnabled = this.rectifyVibratoInput.checked;
      this.saveAllSettings();
    });

    // Eventos de rango vocal y volúmenes en Configuración
    if (this.vocalPresetSelect) {
      this.vocalPresetSelect.addEventListener('change', () => {
        const val = this.vocalPresetSelect.value;
        if (val !== 'custom') {
          const [minStr, maxStr] = val.split('-');
          this.vocalMinMidi = parseInt(minStr, 10);
          this.vocalMaxMidi = parseInt(maxStr, 10);
          this.saveAllSettings();
          this.syncSettingsUi();
        }
      });
    }

    if (this.vocalMinSelect) {
      this.vocalMinSelect.addEventListener('change', () => {
        const minVal = parseInt(this.vocalMinSelect.value, 10);
        this.vocalMinMidi = minVal;
        if (this.vocalMaxMidi < minVal + 12) {
          this.vocalMaxMidi = Math.min(84, minVal + 12);
        }
        this.saveAllSettings();
        this.syncSettingsUi();
      });
    }

    if (this.vocalMaxSelect) {
      this.vocalMaxSelect.addEventListener('change', () => {
        const maxVal = parseInt(this.vocalMaxSelect.value, 10);
        this.vocalMaxMidi = maxVal;
        if (this.vocalMinMidi > maxVal - 12) {
          this.vocalMinMidi = Math.max(36, maxVal - 12);
        }
        this.saveAllSettings();
        this.syncSettingsUi();
      });
    }

    if (this.btnTestVocalMin) {
      this.btnTestVocalMin.addEventListener('click', async () => {
        await this.ensureAudioReady();
        const hz = 440 * Math.pow(2, (this.vocalMinMidi - 69) / 12);
        this.playTone(hz, this.audioCtx.currentTime, 0.7);
      });
    }

    if (this.btnTestVocalMax) {
      this.btnTestVocalMax.addEventListener('click', async () => {
        await this.ensureAudioReady();
        const hz = 440 * Math.pow(2, (this.vocalMaxMidi - 69) / 12);
        this.playTone(hz, this.audioCtx.currentTime, 0.7);
      });
    }

    if (this.btnDetectVocalMin) {
      this.btnDetectVocalMin.addEventListener('click', () => {
        this.detectVocalLimitByVoice('min');
      });
    }

    if (this.btnDetectVocalMax) {
      this.btnDetectVocalMax.addEventListener('click', () => {
        this.detectVocalLimitByVoice('max');
      });
    }

    if (this.btnMicTester) {
      this.btnMicTester.addEventListener('click', () => {
        this.toggleMicTester();
      });
    }

    if (this.noteVolumeInput) {
      this.noteVolumeInput.addEventListener('input', () => {
        this.noteVolume = parseInt(this.noteVolumeInput.value, 10) || 80;
        if (this.noteVolumeVal) this.noteVolumeVal.textContent = `${this.noteVolume}%`;
        this.saveAllSettings();
      });
    }

    if (this.btnTestNoteVol) {
      this.btnTestNoteVol.addEventListener('click', async () => {
        await this.ensureAudioReady();
        this.playTone(440, this.audioCtx.currentTime, 0.55);
      });
    }

    if (this.clickVolumeInput) {
      this.clickVolumeInput.addEventListener('input', () => {
        this.clickVolume = parseInt(this.clickVolumeInput.value, 10) || 90;
        if (this.clickVolumeVal) this.clickVolumeVal.textContent = `${this.clickVolume}%`;
        this.saveAllSettings();
      });
    }

    if (this.btnTestClickVol) {
      this.btnTestClickVol.addEventListener('click', async () => {
        await this.ensureAudioReady();
        this.playMetronomeClick(this.audioCtx.currentTime, true);
      });
    }

    this.mysteryNote1?.addEventListener('click', () => this.playMysteryNote(0));
    this.mysteryNote2?.addEventListener('click', () => this.playMysteryNote(1));

    if (this.singStaffCanvas) {
      this.singStaffCanvas.addEventListener('click', async (e) => {
        const rect = this.singStaffCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const canvasHeight = this.singStaffCanvas.clientHeight;
        const notePlayed = await this.playStaffNoteAtPoint(x, y);
        if (!notePlayed && x <= 105 && y >= canvasHeight - 34) {
          this.openBpmModal();
        }
      });
    }

    if (this.bpmRangeInput) {
      this.bpmRangeInput.addEventListener('input', () => {
        this.bpmModalValue.textContent = this.bpmRangeInput.value;
      });
    }

    if (this.bpmMinusBtn) {
      this.bpmMinusBtn.addEventListener('click', () => {
        const nextVal = Math.max(40, parseInt(this.bpmRangeInput.value, 10) - 2);
        this.bpmRangeInput.value = String(nextVal);
        this.bpmModalValue.textContent = String(nextVal);
      });
    }

    if (this.bpmPlusBtn) {
      this.bpmPlusBtn.addEventListener('click', () => {
        const nextVal = Math.min(140, parseInt(this.bpmRangeInput.value, 10) + 2);
        this.bpmRangeInput.value = String(nextVal);
        this.bpmModalValue.textContent = String(nextVal);
      });
    }

    if (this.btnBpmConfirm) {
      this.btnBpmConfirm.addEventListener('click', () => {
        const chosenBpm = parseInt(this.bpmRangeInput.value, 10) || 72;
        this.saveSingBpm(chosenBpm);
        this.bpmModal.classList.add('hidden');
        this.drawGrandStaff(null, this.lastVoiceFrames);
      });
    }

    // Ventana grande flotante y ventana aparte para el Debug
    if (this.btnDebugModal) {
      this.btnDebugModal.addEventListener('click', () => {
        if (this.debugLargeModal) this.debugLargeModal.classList.remove('hidden');
      });
    }
    if (this.btnDebugModalClose) {
      this.btnDebugModalClose.addEventListener('click', () => {
        if (this.debugLargeModal) this.debugLargeModal.classList.add('hidden');
      });
    }
    if (this.debugLargeModal) {
      this.debugLargeModal.addEventListener('click', (e) => {
        if (e.target === this.debugLargeModal) {
          this.debugLargeModal.classList.add('hidden');
        }
      });
    }
    if (this.menuDebugPopupBtn) {
      this.menuDebugPopupBtn.addEventListener('click', () => {
        this.menuDrawer.classList.add('hidden');
        this.openDebugPopupWindow();
      });
    }
    if (this.btnDebugPopupFromModal) {
      this.btnDebugPopupFromModal.addEventListener('click', () => this.openDebugPopupWindow());
    }

    if (this.btnLevelInfoClose) {
      this.btnLevelInfoClose.addEventListener('click', () => {
        if (this.levelInfoModal) this.levelInfoModal.classList.add('hidden');
      });
    }
    if (this.levelInfoModal) {
      this.levelInfoModal.addEventListener('click', (e) => {
        if (e.target === this.levelInfoModal) {
          this.levelInfoModal.classList.add('hidden');
        }
      });
    }
    document.querySelectorAll('[data-active-level-info]').forEach((infoBtn) => {
      infoBtn.addEventListener('click', () => {
        if (this.activeLevel && this.activeModule) {
          this.openLevelInfoModal(this.activeLevel, this.activeModule);
        }
      });
    });

    // Eventos de Registro y Validación de 3 Notas
    if (this.bottomZone) {
      this.bottomZone.addEventListener('click', (event) => {
        if (!event.target.closest('#btn-open-auth-modal')) return;
        this.accountUnavailableModal?.classList.remove('hidden');
      });
    }
    this.btnAccountUnavailableClose?.addEventListener('click', () => {
      this.accountUnavailableModal?.classList.add('hidden');
    });
    this.accountUnavailableModal?.addEventListener('click', (event) => {
      if (event.target === this.accountUnavailableModal) {
        this.accountUnavailableModal.classList.add('hidden');
      }
    });
    if (this.btnSettingsAuthAction) {
      this.btnSettingsAuthAction.addEventListener('click', () => {
        if (this.currentUser?.verificado) {
          this.logoutUser();
        } else {
          this.openAuthModal();
        }
      });
    }
    if (this.btnAuthCancel1) {
      this.btnAuthCancel1.addEventListener('click', () => this.closeAuthModal());
    }
    if (this.btnAuthCancel2) {
      this.btnAuthCancel2.addEventListener('click', () => this.closeAuthModal());
    }
    if (this.btnAuthSubmit) {
      this.btnAuthSubmit.addEventListener('click', () => this.handleAuthSubmit());
    }
    if (this.btnAuthNoteBack) {
      this.btnAuthNoteBack.addEventListener('click', () => {
        if (this.authEnteredNotes.length > 0) {
          this.authEnteredNotes.pop();
          this.renderAuthNoteSlots();
        }
      });
    }
    if (this.authNotesGrid) {
      this.authNotesGrid.querySelectorAll('[data-auth-note]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const note = btn.getAttribute('data-auth-note');
          this.handleAuthNoteClick(note);
        });
      });
    }

    if (this.menuAboutBtn) {
      this.menuAboutBtn.addEventListener('click', () => {
        this.menuDrawer.classList.add('hidden');
        if (this.aboutModal) this.aboutModal.classList.remove('hidden');
      });
    }
    if (this.btnAboutClose) {
      this.btnAboutClose.addEventListener('click', () => {
        if (this.aboutModal) this.aboutModal.classList.add('hidden');
      });
    }
    if (this.aboutModal) {
      this.aboutModal.addEventListener('click', (e) => {
        if (e.target === this.aboutModal) {
          this.aboutModal.classList.add('hidden');
        }
      });
    }
    if (this.menuLogoutBtn) {
      this.menuLogoutBtn.addEventListener('click', () => {
        this.menuDrawer.classList.add('hidden');
        this.logoutUser();
        this.navigateTo('home');
      });
    }
    if (this.btnStatsClose) {
      this.btnStatsClose.addEventListener('click', () => {
        if (this.activeStatsReport) {
          this.showStatsMenu();
        } else {
          this.navigateTo('home');
        }
      });
    }
    document.querySelectorAll('[data-stats-report]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rep = btn.getAttribute('data-stats-report');
        if (rep) this.openStatsReport(rep);
      });
    });
  }

  /* =========================================================================
   * REGISTRO DE USUARIO, VALIDACIÓN POR 3 NOTAS Y SINCRONIZACIÓN SUPABASE
   * ========================================================================= */

  initSupabaseClient() {
    try {
      if (typeof window.getPlaton6Supabase === 'function') {
        const client = window.getPlaton6Supabase();
        if (client) return client;
      }
      const createClientFn = window.supabase?.createClient || window.supabaseJs?.createClient;
      if (createClientFn) {
        return createClientFn(
          'https://junonydusnrcumbjjzqt.supabase.co',
          'sb_publishable_vmnxlj3GbQPYqoXSjoK4IA_WN37wTR8'
        );
      }
    } catch (_) { }
    return null;
  }

  loadCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.email && parsed.nombre && parsed.verificado) {
          return parsed;
        }
      }
    } catch (_) { }
    return null;
  }

  saveCurrentUser(userObj) {
    this.currentUser = userObj;
    try {
      if (userObj) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userObj));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (_) { }
    this.syncAuthUi();
  }

  logoutUser() {
    this.saveCurrentUser(null);
  }

  syncAuthUi() {
    const isVerified = Boolean(this.currentUser?.verificado);
    if (this.homeGreetingTitle) {
      this.homeGreetingTitle.textContent = isVerified
        ? `¡Hola, ${this.currentUser.nombre}!`
        : '¡Bienvenido a Trino!';
    }
    if (this.homeGuestBox) {
      this.homeGuestBox.classList.toggle('hidden', isVerified);
    }
    if (this.homeUserBox) {
      this.homeUserBox.classList.toggle('hidden', !isVerified);
    }
    if (this.homeUserSubtitle && isVerified) {
      this.homeUserSubtitle.textContent =
        `Registro activo (${this.currentUser.email}). Tu historial de ejercicios y configuración se guardan automáticamente.`;
    }
    if (this.settingsAuthStatusText) {
      this.settingsAuthStatusText.textContent = isVerified
        ? `Cuenta activa: ${this.currentUser.nombre} (${this.currentUser.email})`
        : 'Sin cuenta activa (guardando solo en este dispositivo).';
    }
    if (this.btnSettingsAuthAction) {
      this.btnSettingsAuthAction.textContent = isVerified ? 'Cerrar sesión' : 'Activar registro';
    }
    if (this.menuLogoutBtn) {
      this.menuLogoutBtn.classList.toggle('hidden', !isVerified);
    }
    if (this.currentView === 'home') this.renderBottomCommands('home');
  }

  openAuthModal() {
    if (!this.authModal) return;
    this.pendingAuth = null;
    this.authEnteredNotes = [];
    if (this.authStepForm) this.authStepForm.classList.remove('hidden');
    if (this.authStepNotes) this.authStepNotes.classList.add('hidden');
    if (this.authFormStatus) {
      this.authFormStatus.classList.add('hidden');
      this.authFormStatus.textContent = '';
    }
    if (this.authNotesStatus) {
      this.authNotesStatus.classList.add('hidden');
      this.authNotesStatus.textContent = '';
    }
    this.authModal.classList.remove('hidden');
    if (this.authNameInput) this.authNameInput.focus();
  }

  closeAuthModal() {
    if (this.authModal) {
      this.authModal.classList.add('hidden');
    }
    this.pendingAuth = null;
    this.authEnteredNotes = [];
  }

  generateRandomThreeNotes() {
    const picked = [];
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * AUTH_NATURAL_NOTES.length);
      picked.push(AUTH_NATURAL_NOTES[idx]);
    }
    return picked;
  }

  showAuthStatus(el, msg, type = 'info') {
    if (!el) return;
    el.classList.remove('hidden', 'status-error', 'status-ok');
    if (type === 'error') el.classList.add('status-error');
    if (type === 'ok') el.classList.add('status-ok');
    el.textContent = msg;
  }

  async handleAuthSubmit() {
    const nombre = (this.authNameInput?.value || '').trim();
    const email = (this.authEmailInput?.value || '').trim().toLowerCase();

    if (!nombre) {
      this.showAuthStatus(this.authFormStatus, 'Ingresa tu nombre.', 'error');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showAuthStatus(this.authFormStatus, 'Ingresa un correo electrónico válido.', 'error');
      return;
    }

    const notesArr = this.generateRandomThreeNotes();
    const codeStr = notesArr.join('-');

    if (this.btnAuthSubmit) this.btnAuthSubmit.disabled = true;
    this.showAuthStatus(this.authFormStatus, 'Preparando código musical de 3 notas...');

    let dbUser = null;
    let isExisting = false;

    if (this.supabase) {
      try {
        const { data: existing } = await this.supabase
          .from('trino_usuarios')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (existing) {
          isExisting = true;
          const { data: updated } = await this.supabase
            .from('trino_usuarios')
            .update({ nombre: nombre || existing.nombre, codigo_notas: codeStr })
            .eq('id', existing.id)
            .select()
            .single();
          dbUser = updated || existing;
        } else {
          const { data: inserted } = await this.supabase
            .from('trino_usuarios')
            .insert([
              {
                email,
                nombre,
                verificado: false,
                codigo_notas: codeStr,
                configuracion: this.getCurrentConfigObject(),
              },
            ])
            .select()
            .single();
          dbUser = inserted;
        }
      } catch (_) { }
    }

    const emailSent = await this.sendVerificationNotesEmail(email, nombre, notesArr);

    if (this.btnAuthSubmit) this.btnAuthSubmit.disabled = false;

    this.pendingAuth = {
      id: dbUser?.id || null,
      email,
      nombre: dbUser?.nombre || nombre,
      expectedCode: codeStr,
      notesArr,
      isExisting,
      savedConfig: dbUser?.configuracion || null,
    };

    this.authEnteredNotes = [];
    this.renderAuthNoteSlots();

    if (this.authStepForm) this.authStepForm.classList.add('hidden');
    if (this.authStepNotes) this.authStepNotes.classList.remove('hidden');

    if (this.authNotesSubtitle) {
      if (emailSent) {
        this.authNotesSubtitle.textContent =
          `Enviamos 3 notas a ${email}. Púlsalas en el mismo orden para activar tu cuenta:`;
      } else {
        // Si aún no se configuró el webhook de correo, mostrar las 3 notas para poder probar el flujo inmediato
        this.authNotesSubtitle.textContent =
          `Pulsa en orden las 3 notas de verificación (${notesArr.join(' - ')}) para activar la cuenta de ${email}:`;
      }
    }
  }

  async sendVerificationNotesEmail(email, nombre, notesArr) {
    const webhookUrl = window.TRINO_MAIL_WEBHOOK_URL || TRINO_MAIL_WEBHOOK_URL;
    if (!webhookUrl) return false;
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email,
          nombre,
          notas: notesArr.join(' - '),
        }),
      });
      return true;
    } catch (_) {
      return false;
    }
  }

  renderAuthNoteSlots() {
    this.authSlots.forEach((slotEl, idx) => {
      if (!slotEl) return;
      const note = this.authEnteredNotes[idx];
      slotEl.textContent = note || '—';
      slotEl.classList.toggle('filled', Boolean(note));
    });
  }

  async handleAuthNoteClick(note) {
    if (!this.pendingAuth || this.authEnteredNotes.length >= 3) return;

    // Sonar la nota correspondiente en la octava Do4..Si4
    await this.ensureAudioReady();
    const midi = AUTH_NOTE_MIDI[note] || 60;
    const hz = 440 * Math.pow(2, (midi - 69) / 12);
    this.playTone(hz, this.audioCtx.currentTime, 0.42);

    this.authEnteredNotes.push(note);
    this.renderAuthNoteSlots();

    if (this.authEnteredNotes.length === 3) {
      await this.validateAuthNotes();
    }
  }

  async validateAuthNotes() {
    if (!this.pendingAuth) return;
    const enteredCode = this.authEnteredNotes.join('-');

    if (enteredCode !== this.pendingAuth.expectedCode) {
      this.showAuthStatus(
        this.authNotesStatus,
        '✕ Las 3 notas no coinciden. Inténtalo de nuevo.',
        'error'
      );
      setTimeout(() => {
        this.authEnteredNotes = [];
        this.renderAuthNoteSlots();
      }, 650);
      return;
    }

    this.showAuthStatus(this.authNotesStatus, '✓ ¡Cuenta verificada! Activando...', 'ok');

    let userId = this.pendingAuth.id;
    if (this.supabase) {
      try {
        const { data } = await this.supabase
          .from('trino_usuarios')
          .update({ verificado: true, codigo_notas: null })
          .eq('email', this.pendingAuth.email)
          .select()
          .single();
        if (data?.id) userId = data.id;
      } catch (_) { }
    }

    // Si era una cuenta existente con configuración guardada, aplicarla
    if (this.pendingAuth.isExisting && this.pendingAuth.savedConfig) {
      this.applyCloudConfig(this.pendingAuth.savedConfig);
    }

    this.saveCurrentUser({
      id: userId,
      email: this.pendingAuth.email,
      nombre: this.pendingAuth.nombre,
      verificado: true,
    });

    await this.syncFromCloudOnLoad();

    setTimeout(() => {
      this.closeAuthModal();
    }, 650);
  }

  applyCloudConfig(cfg) {
    if (!cfg || typeof cfg !== 'object') return;
    if (cfg.dailyMin >= 10 && cfg.dailyMin <= 200 && cfg.dailyMin % 10 === 0) this.dailyMin = cfg.dailyMin;
    const cloudIntervalsMin = cfg.dailyIntervalsMin ?? cfg.dailyMin;
    const cloudSingingMin = cfg.dailySingingMin ?? cfg.dailyMin;
    const cloudChordsMin = cfg.dailyChordsMin ?? cfg.dailyMin;
    if (cloudIntervalsMin >= 10 && cloudIntervalsMin <= 200 && cloudIntervalsMin % 10 === 0) {
      this.dailyIntervalsMin = cloudIntervalsMin;
    }
    if (cloudSingingMin >= 10 && cloudSingingMin <= 200 && cloudSingingMin % 10 === 0) {
      this.dailySingingMin = cloudSingingMin;
    }
    if (cloudChordsMin >= 10 && cloudChordsMin <= 200 && cloudChordsMin % 10 === 0) {
      this.dailyChordsMin = cloudChordsMin;
    }
    if (cfg.singBpm >= 40 && cfg.singBpm <= 140) this.singBpm = cfg.singBpm;
    if (cfg.vocalMinMidi >= 36 && cfg.vocalMaxMidi <= 84) {
      this.vocalMinMidi = cfg.vocalMinMidi;
      this.vocalMaxMidi = cfg.vocalMaxMidi;
    }
    if (cfg.noteVolume >= 10 && cfg.noteVolume <= 100) this.noteVolume = cfg.noteVolume;
    if (cfg.clickVolume >= 10 && cfg.clickVolume <= 100) this.clickVolume = cfg.clickVolume;
    if (typeof cfg.rectifyVibrato === 'boolean') this.rectifyVibratoEnabled = cfg.rectifyVibrato;
    if (cfg.singNotesCount >= 1 && cfg.singNotesCount <= 4) this.singNotesCount = cfg.singNotesCount;
    if (typeof cfg.singOnlyFirstNote === 'boolean') this.singOnlyFirstNote = cfg.singOnlyFirstNote;
    const validDelays = ['0', '1', '2', '3', 'none'];
    if (validDelays.includes(String(cfg.intervalGoodDelay))) this.intervalGoodDelay = String(cfg.intervalGoodDelay);
    if (validDelays.includes(String(cfg.intervalBadDelay))) this.intervalBadDelay = String(cfg.intervalBadDelay);
    if (validDelays.includes(String(cfg.chordGoodDelay))) this.chordGoodDelay = String(cfg.chordGoodDelay);
    if (validDelays.includes(String(cfg.chordBadDelay))) this.chordBadDelay = String(cfg.chordBadDelay);
    this.saveAllSettings();
    this.syncSettingsUi();
    this.renderIntervalLevels();
    this.renderSingingLevels();
    this.renderChordLevels();
    this.updateHomeModuleProgress();
  }

  async syncFromCloudOnLoad() {
    if (!this.supabase || !this.currentUser?.email) return;
    try {
      const { data: userRow } = await this.supabase
        .from('trino_usuarios')
        .select('*')
        .eq('email', this.currentUser.email)
        .maybeSingle();

      if (!userRow) return;
      if (userRow.id && userRow.id !== this.currentUser.id) {
        this.saveCurrentUser({
          ...this.currentUser,
          id: userRow.id,
          nombre: userRow.nombre || this.currentUser.nombre,
        });
      }
      if (userRow.configuracion) {
        this.applyCloudConfig(userRow.configuracion);
      }
    } catch (_) { }
  }

  openBpmModal() {
    if (!this.bpmModal) return;
    this.stopSingingSequence();
    this.bpmRangeInput.value = String(this.singBpm);
    this.bpmModalValue.textContent = String(this.singBpm);
    this.bpmModal.classList.remove('hidden');
  }

  renderLevelList(containerEl, levelsArray, moduleType) {
    if (!containerEl) return;
    this.syncSettingsUi();

    const dailyGoal = moduleType === 'singing'
      ? this.dailySingingMin
      : moduleType === 'chords' ? this.dailyChordsMin : this.dailyIntervalsMin;
    const { todayDone: typeTodayDone, yesterdayDone: typeYesterdayDone } = this.getDailyTypeCounts(moduleType);
    const typeGoalMet = typeTodayDone >= dailyGoal;
    const goalProgress = Math.min(100, Math.round((typeTodayDone / dailyGoal) * 100));
    const typeLabel = moduleType === 'singing'
      ? 'Canto'
      : moduleType === 'chords' ? 'Reconocer Acordes' : 'Reconocimiento de intervalos';
    const dailyGoalHtml = `
      <div class="daily-goal-summary">
        <div class="daily-goal-summary-head">
          <span class="daily-goal-summary-title">Meta diaria · ${typeLabel}</span>
          <span class="daily-goal-summary-count">Hoy ${typeTodayDone}/${dailyGoal}${typeGoalMet ? ' · Cumplida' : ''}</span>
        </div>
        <div class="daily-goal-progress" role="progressbar" aria-label="Progreso diario de ${typeLabel}" aria-valuemin="0" aria-valuemax="${dailyGoal}" aria-valuenow="${Math.min(typeTodayDone, dailyGoal)}">
          <div class="daily-goal-progress-fill" style="width:${goalProgress}%"></div>
        </div>
        <span class="daily-goal-yesterday">Ayer ${typeYesterdayDone}</span>
      </div>
    `;

    let suggestedAssigned = false;

    containerEl.innerHTML = dailyGoalHtml + levelsArray
      .map((lvl) => {
        const stats = this.getLevelStats(lvl.id, moduleType);
        const levelDescription = moduleType === 'singing'
          ? lvl.desc.replace(/\s*\(sin sostenidos\)/gi, '')
          : lvl.desc;
        const todayKey = this.getTodayKey();
        const yesterdayKey = this.getYesterdayKey();
        const dayEntries = this.getLevelDayLog(moduleType, lvl.id);
        const todayFromLog = dayEntries.filter((entry) => entry.date === todayKey).length;
        const yesterdayDone = dayEntries.filter((entry) => entry.date === yesterdayKey).length;
        const todayDone = Math.max(stats.good + stats.bad, todayFromLog);
        const isLevelDone = stats.stars > 0;

        let state = 'pending';

        if (isLevelDone) {
          state = 'done';
        } else if (!lvl.isProgressive && !suggestedAssigned) {
          state = 'suggested';
          suggestedAssigned = true;
        }

        const showProgress = state === 'suggested' || todayDone > 0 || yesterdayDone > 0;
        const progressHtml = showProgress
          ? `<div class="level-status-row">
               ${state === 'suggested' ? '<span class="level-status-pill">Sugerido</span>' : '<span class="level-status-spacer" aria-hidden="true"></span>'}
               <span class="level-progress-counts">Hoy ${todayDone} · Ayer ${yesterdayDone}</span>
             </div>`
          : '';

        const starsHtml = [1, 2, 3]
          .map((n) =>
            n <= stats.stars
              ? '<span class="star-filled">★</span>'
              : '<span class="star-empty">★</span>'
          )
          .join('');

        const blockNum = lvl.block ?? 1;

        return `
          <button type="button" class="level-card block-${blockNum} state-${state}" data-level-id="${lvl.id}">
            <div class="level-info">
              <div class="level-top-row">
                <span class="level-title">${lvl.title}</span>
                <div class="level-stars" aria-label="${stats.stars} de 3 estrellas">
                  ${starsHtml}
                </div>
              </div>
              ${progressHtml}
              <p class="level-desc">${levelDescription}</p>
            </div>
          </button>
        `;
      })
      .join('');

    containerEl.querySelectorAll('[data-level-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-level-id'), 10);
        if (moduleType === 'singing') {
          this.startSingingLevel(id);
        } else if (moduleType === 'chords') {
          this.startChordLevel(id);
        } else {
          this.startIntervalLevel(id);
        }
      });
    });
  }

  renderIntervalLevels() {
    this.renderLevelList(this.intervalsLevelsList, INTERVAL_LEVELS, 'intervals');
  }

  renderSingingLevels() {
    this.renderLevelList(this.singingLevelsList, SINGING_LEVELS, 'singing');
  }

  renderChordLevels() {
    this.renderLevelList(this.chordLevelsList, CHORD_LEVELS, 'chords');
  }

  getEffectiveIntervalLevel() {
    if (this.activeLevel?.isProgressive) {
      return (
        INTERVAL_LEVELS.find((l) => l.id === this.progressiveSubLevelId) ||
        INTERVAL_LEVELS.find((l) => l.id === 1) ||
        this.activeLevel
      );
    }
    return this.activeLevel;
  }

  startIntervalLevel(levelId) {
    const level = INTERVAL_LEVELS.find((l) => l.id === levelId);
    if (!level) return;

    this.activeModule = 'intervals';
    this.exerciseStarted = false;
    this.activeLevel = level;
    if (level.isProgressive) {
      this.syncProgressiveDayState();
    }
    this.sessionLog = this.getLevelDayLog('intervals', levelId);
    this.renderSessionLog();
    this.generateNextQuestion();
    this.updateExerciseUi();
    this.navigateTo('interval-exercise');
    this.syncExerciseAvailability();
  }

  startSingingLevel(levelId) {
    const level = SINGING_LEVELS.find((l) => l.id === levelId);
    if (!level) return;

    this.activeModule = 'singing';
    this.exerciseStarted = false;
    this.activeLevel = level;
    this.singSessionLog = this.getLevelDayLog('singing', levelId);
    this.renderSingSessionLog();
    this.generateNextQuestion();
    this.updateSingingExerciseUi();
    this.navigateTo('singing-exercise');
    this.syncExerciseAvailability();
  }

  startChordLevel(levelId) {
    const level = CHORD_LEVELS.find((item) => item.id === levelId);
    if (!level) return;

    this.activeModule = 'chords';
    this.exerciseStarted = false;
    this.activeLevel = level;
    this.chordSessionLog = this.getLevelDayLog('chords', levelId);
    this.renderLogTable(this.chordSessionLogWrapper, this.chordSessionLogTbody, this.chordSessionLog, 'chords');
    this.generateNextQuestion();
    this.updateChordExerciseUi();
    this.navigateTo('chord-exercise');
    this.syncExerciseAvailability();
  }

  syncExerciseAvailability() {
    const isStarted = this.exerciseStarted;
    this.exPromptText?.classList.toggle('hidden', isStarted);
    this.singPromptText?.classList.toggle('hidden', isStarted);
    this.chordPromptText?.classList.toggle('hidden', isStarted);
    this.mysteryNotesRow?.classList.toggle('hidden', !isStarted || this.activeModule !== 'intervals');
    this.exAnswersContainer?.classList.toggle('hidden', !isStarted || this.activeModule !== 'intervals');
    this.chordAnswersContainer?.classList.toggle('hidden', !isStarted || this.activeModule !== 'chords');
    this.singStaffCanvasBox?.classList.toggle('hidden', !isStarted || this.activeModule !== 'singing');
    if (isStarted && this.activeModule === 'singing') {
      requestAnimationFrame(() => this.drawGrandStaff(null, this.lastVoiceFrames));
    }
  }

  updateChordExerciseUi() {
    if (!this.activeLevel || !this.chordAnswersContainer) return;
    this.chordLevelTitle.textContent = this.activeLevel.title;
    this.chordPromptText.textContent = this.activeLevel.id <= 6
      ? 'Escucha las dos notas e identifica el intervalo.'
      : 'Escucha las notas simultáneas e identifica el acorde.';
    this.chordAnswersContainer.innerHTML = this.activeLevel.options
      .map((chordId) => `
        <button type="button" class="answer-btn" data-chord-key="${chordId}">
          ${CHORD_CATALOG[chordId].label}
        </button>
      `)
      .join('');

    this.chordAnswersContainer.querySelectorAll('[data-chord-key]').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleChordAnswerSelection(button, button.getAttribute('data-chord-key'));
      });
    });
  }

  generateNextChordQuestion() {
    if (!this.activeLevel) return;
    const targetTypes = this.activeLevel.targets || this.activeLevel.options;
    const chordId = targetTypes[Math.floor(Math.random() * targetTypes.length)];
    const chord = CHORD_CATALOG[chordId];
    const maxInterval = Math.max(...chord.intervals);
    const maxRoot = Math.min(72, 84 - maxInterval);
    const rootMidi = 48 + Math.floor(Math.random() * (maxRoot - 48 + 1));

    this.currentQuestion = {
      chordId,
      rootMidi,
      chordMidis: chord.intervals.map((interval) => rootMidi + interval),
      answered: false,
    };
    this.chordAnswersContainer?.querySelectorAll('.answer-btn').forEach((button) => {
      button.classList.remove('flash-correct', 'flash-wrong');
    });
  }

  async playChordQuestion() {
    if (!this.currentQuestion?.chordMidis?.length) return;
    await this.ensureAudioReady();
    this.chordAnswersContainer?.querySelectorAll('.answer-btn').forEach((button) => {
      if (button._flashTimeout) {
        clearTimeout(button._flashTimeout);
        button._flashTimeout = null;
      }
      button.classList.remove('flash-correct', 'flash-wrong');
    });
    const now = this.audioCtx.currentTime;
    const duration = 1.25;
    const gainScale = 1 / Math.sqrt(this.currentQuestion.chordMidis.length);
    this.currentQuestion.chordMidis.forEach((midi) => {
      const frequency = 440 * Math.pow(2, (midi - 69) / 12);
      this.playTone(frequency, now, duration, gainScale);
    });
  }

  async playStaffNoteAtPoint(x, y) {
    if (!this.currentQuestion || !this.singStaffCanvas) return false;

    const canvas = this.singStaffCanvas;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return false;

    const staffLeft = 1;
    const staffRight = width - 1;
    const m1Start = staffLeft + 34;
    const barlineX = m1Start + (staffRight - m1Start) / 2;
    const m2End = staffRight - 4;
    const midis = Array.isArray(this.currentQuestion.midis) && this.currentQuestion.midis.length > 0
      ? this.currentQuestion.midis
      : [this.currentQuestion.midi1, this.currentQuestion.midi2];

    const noteXs = [];
    const noteMidis = [];
    midis.forEach((m, idx) => {
      const frac = idx * 0.25 + 0.125;
      noteXs.push(m1Start + (barlineX - m1Start) * frac);
      noteMidis.push(m);
    });
    midis.forEach((m, idx) => {
      const frac = idx * 0.25 + 0.125;
      noteXs.push(barlineX + (m2End - barlineX) * frac);
      noteMidis.push(m);
    });

    const hitRadiusX = 24;
    const hitRadiusY = 22;
    const noteIndex = noteXs.reduce((nearestIndex, noteX, index) => {
      const step = this.midiToGrandStaffStep(noteMidis[index]).step;
      const noteY = height / 2 - 4 - step * 5;
      const distance = ((x - noteX) / hitRadiusX) ** 2 + ((y - noteY) / hitRadiusY) ** 2;
      if (distance > 1 || distance >= nearestIndex.distance) return nearestIndex;
      return { index, distance };
    }, { index: -1, distance: Infinity }).index;
    if (noteIndex < 0) return false;

    await this.ensureAudioReady();
    const midi = noteMidis[noteIndex];
    const frequency = 440 * Math.pow(2, (midi - 69) / 12);
    this.playTone(frequency, this.audioCtx.currentTime, 0.65);
    return true;
  }

  generateNextQuestion() {
    if (!this.activeLevel) return;
    if (this.autoNextTimer) {
      clearTimeout(this.autoNextTimer);
      this.autoNextTimer = null;
    }
    this.stopSingingSequence();

    if (this.activeModule === 'chords') {
      this.generateNextChordQuestion();
      return;
    }

    const effectiveLevel = this.activeModule === 'intervals'
      ? this.getEffectiveIntervalLevel()
      : this.activeLevel;

    const opts = effectiveLevel.options;
    const randomKey = opts[Math.floor(Math.random() * opts.length)];

    let midi1;
    let midi2;

    const semitones = INTERVAL_CATALOG[randomKey].semitones;
    const isSinging = this.activeModule === 'singing';
    const minAllowed = isSinging ? this.vocalMinMidi : 48;
    const maxAllowed = isSinging ? Math.max(minAllowed + semitones, this.vocalMaxMidi) : 72;

    if (effectiveLevel.restrictedPairs && effectiveLevel.restrictedPairs[randomKey]) {
      const basePairs = effectiveLevel.restrictedPairs[randomKey];
      // Si es el módulo de canto, adaptar los pares restringidos a las octavas del rango vocal del usuario
      const adaptedPairs = [];
      if (isSinging) {
        basePairs.forEach(([m1, m2]) => {
          for (const shift of [-24, -12, 0, 12, 24]) {
            const s1 = m1 + shift;
            const s2 = m2 + shift;
            if (s1 >= minAllowed && s2 <= maxAllowed) {
              adaptedPairs.push([s1, s2]);
            }
          }
        });
      }
      const pairs = adaptedPairs.length > 0 ? adaptedPairs : basePairs;
      const chosen = pairs[Math.floor(Math.random() * pairs.length)];
      midi1 = chosen[0];
      midi2 = chosen[1];
    } else if (effectiveLevel.naturalTonicsOnly) {
      const naturalPitches = [0, 2, 4, 5, 7, 9, 11]; // Do, Re, Mi, Fa, Sol, La, Si
      const maxStart = Math.max(minAllowed, maxAllowed - semitones);
      const validTonics = [];
      for (let m = minAllowed; m <= maxStart; m++) {
        if (naturalPitches.includes(((m % 12) + 12) % 12)) {
          validTonics.push(m);
        }
      }
      const pool = validTonics.length > 0 ? validTonics : NATURAL_TONIC_MIDIS;
      midi1 = pool[Math.floor(Math.random() * pool.length)];
      midi2 = midi1 + semitones;
    } else if (effectiveLevel.midiRange) {
      const minStart = isSinging
        ? Math.max(effectiveLevel.midiRange.minStart, minAllowed)
        : effectiveLevel.midiRange.minStart;
      const effMaxEnd = isSinging
        ? Math.min(effectiveLevel.midiRange.maxEnd, maxAllowed)
        : effectiveLevel.midiRange.maxEnd;
      const fallbackMin = effMaxEnd - semitones >= minStart ? minStart : minAllowed;
      const fallbackMax = effMaxEnd - semitones >= minStart ? effMaxEnd : maxAllowed;
      const maxStart = Math.max(fallbackMin, fallbackMax - semitones);
      midi1 = fallbackMin + Math.floor(Math.random() * (maxStart - fallbackMin + 1));
      midi2 = midi1 + semitones;
    } else {
      const maxStart = Math.max(minAllowed, maxAllowed - semitones);
      midi1 = minAllowed + Math.floor(Math.random() * (maxStart - minAllowed + 1));
      midi2 = midi1 + semitones;
    }

    let midis = [midi1, midi2];
    if (isSinging) {
      const notesCount = Math.max(1, Math.min(4, this.singNotesCount || 2));
      const pickNoteFromTonic = (tonicMidi) => {
        if (effectiveLevel.restrictedPairs) {
          const validSecondMidis = [];
          opts.forEach((k) => {
            const kPairs = effectiveLevel.restrictedPairs[k] || [];
            kPairs.forEach(([p1, p2]) => {
              for (const shift of [-24, -12, 0, 12, 24]) {
                const s1 = p1 + shift;
                const s2 = p2 + shift;
                if (s1 === tonicMidi && s2 >= minAllowed && s2 <= Math.max(minAllowed + 12, this.vocalMaxMidi)) {
                  validSecondMidis.push(s2);
                }
              }
            });
          });
          if (validSecondMidis.length > 0) {
            return validSecondMidis[Math.floor(Math.random() * validSecondMidis.length)];
          }
        }
        const fittingKeys = opts.filter((k) => {
          const st = INTERVAL_CATALOG[k]?.semitones ?? 0;
          return tonicMidi + st <= Math.max(tonicMidi, this.vocalMaxMidi);
        });
        const keyPool = fittingKeys.length > 0 ? fittingKeys : opts;
        const chosenKey = keyPool[Math.floor(Math.random() * keyPool.length)];
        return tonicMidi + (INTERVAL_CATALOG[chosenKey]?.semitones ?? 0);
      };

      if (notesCount === 1) {
        midis = [midi1];
      } else {
        midis = [midi1, midi2];
        while (midis.length < notesCount) {
          midis.push(pickNoteFromTonic(midi1));
        }
      }
    }

    this.currentQuestion = {
      midi1: midis[0],
      midi2: midis[1] ?? midis[0],
      midis,
      targetIntervalKey: randomKey,
      answered: false,
      firstButtonEl: null,
      firstClass: null,
    };

    if (this.activeModule === 'singing') {
      this.lastNoteDetails = null;
      this.resetSingingQuestionUi();
    } else {
      this.clearAnswerButtonColors();
      this.resetMysteryNotes();
    }
  }

  midiToNoteNameEs(midi) {
    const idx = ((Math.round(midi) % 12) + 12) % 12;
    return NOTE_NAMES_ES[idx];
  }

  midiToNoteWithOctaveEs(midi) {
    const rounded = Math.round(midi);
    const octave = Math.floor(rounded / 12) - 1;
    return `${this.midiToNoteNameEs(rounded)}${octave}`;
  }

  openLevelInfoModal(lvl, moduleType) {
    if (!this.levelInfoModal) return;

    this.levelInfoModalBody?.classList.remove('hidden');
    this.voiceTestInfoBody?.classList.add('hidden');
    const moduleLabel = moduleType === 'singing'
      ? 'Módulo 2 · Cantar Notas'
      : moduleType === 'chords'
        ? 'Módulo 3 · Reconocer Acordes'
        : 'Módulo 1 · Reconocer Intervalos';
    if (this.levelInfoModalModule) this.levelInfoModalModule.textContent = moduleLabel;
    if (this.levelInfoModalTitle) {
      this.levelInfoModalTitle.textContent = lvl.isProgressive
        ? `${lvl.title} - (N${this.progressiveSubLevelId})`
        : lvl.title;
    }

    const buildDelayOptionsHtml = (selectedVal) => {
      const opts = [
        { val: '0', label: 'Avanzar de inmediato' },
        { val: '1', label: 'Esperar un segundo' },
        { val: '2', label: 'Esperar 2 segundos' },
        { val: '3', label: 'Esperar 3 segundos' },
        { val: 'none', label: 'No avanzar' },
      ];
      return opts
        .map((o) => `<option value="${o.val}"${String(selectedVal) === o.val ? ' selected' : ''}>${o.label}</option>`)
        .join('');
    };

    let configSectionHtml = '';
    if (moduleType === 'singing') {
      const currCount = this.singNotesCount || 2;
      configSectionHtml = `
        <div class="level-info-section">
          <span class="level-info-label">Configuración del módulo</span>
          <div class="level-info-config-group">
            <div class="level-info-config-field">
              <label for="modal-sing-notes-count">Notas que se tocarán en el compás</label>
              <select id="modal-sing-notes-count" class="settings-select">
                ${[1, 2, 3, 4]
          .map((n) => `<option value="${n}"${currCount === n ? ' selected' : ''}>${n}</option>`)
          .join('')}
              </select>
            </div>
            <label class="level-info-checkbox-row" for="modal-sing-only-first">
              <input type="checkbox" id="modal-sing-only-first"${this.singOnlyFirstNote ? ' checked' : ''} />
              <span>Solo tocar la primera nota</span>
            </label>
          </div>
        </div>
      `;
    } else if (moduleType === 'intervals' || moduleType === 'chords') {
      const goodVal = moduleType === 'chords' ? this.chordGoodDelay : this.intervalGoodDelay;
      const badVal = moduleType === 'chords' ? this.chordBadDelay : this.intervalBadDelay;
      configSectionHtml = `
        <div class="level-info-section">
          <span class="level-info-label">Configuración de avance de ejercicio</span>
          <div class="level-info-config-group">
            <div class="level-info-config-field">
              <label for="modal-good-delay-select">Ante una respuesta buena</label>
              <select id="modal-good-delay-select" class="settings-select">
                ${buildDelayOptionsHtml(goodVal)}
              </select>
            </div>
            <div class="level-info-config-field">
              <label for="modal-bad-delay-select">Ante una respuesta fallida</label>
              <select id="modal-bad-delay-select" class="settings-select">
                ${buildDelayOptionsHtml(badVal)}
              </select>
            </div>
          </div>
        </div>
      `;
    }

    if (moduleType === 'chords') {
      const chordsListHtml = (lvl.options || [])
        .map((key) => {
          const cat = CHORD_CATALOG[key];
          if (!cat) return `<li>${key}</li>`;
          return `<li><strong>${cat.label}:</strong> [${cat.intervals.join(', ')}] semitonos</li>`;
        })
        .join('');
      if (this.levelInfoModalBody) {
        this.levelInfoModalBody.innerHTML = `
          ${configSectionHtml}
          <div class="level-info-section">
            <span class="level-info-label">Tipos incluidos (${(lvl.options || []).length})</span>
            <ul class="level-info-list">${chordsListHtml}</ul>
          </div>
        `;
      }
      this.bindLevelInfoModalControls(moduleType);
      this.levelInfoModal.classList.remove('hidden');
      return;
    }

    const effectiveLvl = lvl.isProgressive ? this.getEffectiveIntervalLevel() : lvl;
    const progressiveExplainHtml = lvl.isProgressive
      ? `
        <div class="level-info-section">
          <span class="level-info-label">Regla de progresión (Nivel actual: N${this.progressiveSubLevelId})</span>
          <p class="level-info-value">Inicia en el Nivel 1 y se reinicia de un día para otro a las 2:00 AM. Con 10 respuestas buenas seguidas avanza al siguiente nivel (hasta N14), y cada 10 respuestas fallidas acumuladas retrocede un nivel.</p>
        </div>
      `
      : '';

    // 1. Intervalos incluidos
    const intervalsListHtml = (effectiveLvl.options || [])
      .map((key) => {
        const cat = INTERVAL_CATALOG[key];
        if (!cat) return `<li>${key}</li>`;
        const dirText = cat.semitones === 0 ? 'misma nota' : `${cat.semitones} semitono${cat.semitones === 1 ? '' : 's'} · ascendente`;
        return `<li><strong>${cat.label} (${key}):</strong> ${dirText}</li>`;
      })
      .join('');

    // 2. Rango y notas posibles según configuración del nivel
    let rangeText = '';
    let notesText = '';
    let pairsHtml = '';

    if (effectiveLvl.restrictedPairs) {
      const allMidis = [];
      const tonicMidis = [];
      const pairItems = [];
      (effectiveLvl.options || []).forEach((key) => {
        const pairs = effectiveLvl.restrictedPairs[key] || [];
        const cat = INTERVAL_CATALOG[key];
        const formattedPairs = pairs.map(([m1, m2]) => {
          allMidis.push(m1, m2);
          tonicMidis.push(m1);
          return `${this.midiToNoteWithOctaveEs(m1)} → ${this.midiToNoteWithOctaveEs(m2)}`;
        });
        if (formattedPairs.length > 0) {
          pairItems.push(`<li><strong>${cat ? cat.label : key}:</strong> ${formattedPairs.join(', ')}</li>`);
        }
      });
      const minMidi = Math.min(...allMidis);
      const maxMidi = Math.max(...allMidis);
      const uniqueTonicNames = [...new Set(tonicMidis.map((m) => this.midiToNoteNameEs(m)))];
      const uniqueNoteNames = [...new Set(allMidis.map((m) => this.midiToNoteNameEs(m)))];

      rangeText = `${this.midiToNoteWithOctaveEs(minMidi)} a ${this.midiToNoteWithOctaveEs(maxMidi)} (Octavas 3 y 4 · Clave de Fa y Sol)`;
      notesText = `Tónicas: ${uniqueTonicNames.join(', ')} · Notas usadas: solo naturales (${uniqueNoteNames.join(', ')})`;
      pairsHtml = `
        <div class="level-info-section">
          <span class="level-info-label">Ejercicios posibles (${allMidis.length / 2} combinaciones)</span>
          <ul class="level-info-list">${pairItems.join('')}</ul>
        </div>
      `;
    } else if (effectiveLvl.naturalTonicsOnly) {
      const maxSemitones = Math.max(...(effectiveLvl.options || []).map((k) => INTERVAL_CATALOG[k]?.semitones || 0));
      const minMidi = NATURAL_TONIC_MIDIS[0]; // Do3
      const maxStartMidi = NATURAL_TONIC_MIDIS[NATURAL_TONIC_MIDIS.length - 1]; // Mi4
      const maxEndMidi = maxStartMidi + maxSemitones;

      rangeText = `Tónica entre ${this.midiToNoteWithOctaveEs(minMidi)} y ${this.midiToNoteWithOctaveEs(maxStartMidi)} · 2ª nota hasta ${this.midiToNoteWithOctaveEs(maxEndMidi)}`;
      notesText = `Tónica (1ª nota): solo escala de Do natural (Do, Re, Mi, Fa, Sol, La, Si) · 2ª nota: libre según el intervalo (incluye ♯)`;
    } else if (effectiveLvl.midiRange) {
      const { minStart, maxEnd, label } = effectiveLvl.midiRange;
      rangeText = `${label} · Desde ${this.midiToNoteWithOctaveEs(minStart)} hasta ${this.midiToNoteWithOctaveEs(maxEnd)}`;
      notesText = `Tónica y 2ª nota: las 12 notas cromáticas (${NOTE_NAMES_ES.join(', ')})`;
    } else {
      const maxSemitones = Math.max(...(effectiveLvl.options || []).map((k) => INTERVAL_CATALOG[k]?.semitones || 0));
      const minMidi = 48; // Do3
      const maxStartMidi = 63; // Re#4
      const maxEndMidi = maxStartMidi + maxSemitones;

      rangeText = `Nota inicial entre ${this.midiToNoteWithOctaveEs(minMidi)} y ${this.midiToNoteWithOctaveEs(maxStartMidi)} · Nota final hasta ${this.midiToNoteWithOctaveEs(maxEndMidi)}`;
      notesText = `Las 12 notas cromáticas (${NOTE_NAMES_ES.join(', ')})`;
    }

    if (this.levelInfoModalBody) {
      this.levelInfoModalBody.innerHTML = `
        ${configSectionHtml}
        ${progressiveExplainHtml}
        <div class="level-info-section">
          <span class="level-info-label">Tipos de intervalos (${(effectiveLvl.options || []).length})</span>
          <ul class="level-info-list">${intervalsListHtml}</ul>
        </div>
        <div class="level-info-section">
          <span class="level-info-label">Rango de alturas</span>
          <p class="level-info-value">${rangeText}</p>
        </div>
        <div class="level-info-section">
          <span class="level-info-label">Notas utilizadas</span>
          <p class="level-info-value">${notesText}</p>
        </div>
        ${pairsHtml}
      `;
    }

    this.bindLevelInfoModalControls(moduleType);
    this.levelInfoModal.classList.remove('hidden');
  }

  bindLevelInfoModalControls(moduleType) {
    if (!this.levelInfoModalBody) return;
    if (moduleType === 'singing') {
      const countSelect = this.levelInfoModalBody.querySelector('#modal-sing-notes-count');
      const onlyFirstChk = this.levelInfoModalBody.querySelector('#modal-sing-only-first');
      countSelect?.addEventListener('change', () => {
        const val = parseInt(countSelect.value, 10);
        if (val >= 1 && val <= 4) {
          this.singNotesCount = val;
          this.saveAllSettings();
          if (this.activeModule === 'singing') {
            this.generateNextQuestion();
          }
        }
      });
      onlyFirstChk?.addEventListener('change', () => {
        this.singOnlyFirstNote = Boolean(onlyFirstChk.checked);
        this.saveAllSettings();
      });
    } else if (moduleType === 'intervals' || moduleType === 'chords') {
      const goodSelect = this.levelInfoModalBody.querySelector('#modal-good-delay-select');
      const badSelect = this.levelInfoModalBody.querySelector('#modal-bad-delay-select');
      goodSelect?.addEventListener('change', () => {
        if (moduleType === 'chords') {
          this.chordGoodDelay = goodSelect.value;
        } else {
          this.intervalGoodDelay = goodSelect.value;
        }
        this.saveAllSettings();
      });
      badSelect?.addEventListener('change', () => {
        if (moduleType === 'chords') {
          this.chordBadDelay = badSelect.value;
        } else {
          this.intervalBadDelay = badSelect.value;
        }
        this.saveAllSettings();
      });
    }
  }

  clearNoteAnimTimers() {
    this.noteAnimTimers.forEach((t) => clearTimeout(t));
    this.noteAnimTimers = [];
    [this.mysteryNote1, this.mysteryNote2].forEach((el) => {
      if (el) el.classList.remove('note-playing');
    });
  }

  resetMysteryNotes() {
    this.clearNoteAnimTimers();
    if (this.mysteryNote1) {
      this.mysteryNote1.textContent = '?';
      this.mysteryNote1.classList.remove('note-revealed', 'note-wrong');
    }
    if (this.mysteryNote2) {
      this.mysteryNote2.textContent = '?';
      this.mysteryNote2.classList.remove('note-revealed', 'note-wrong');
    }
  }

  async playMysteryNote(noteIndex) {
    if (!this.currentQuestion) return;
    await this.ensureAudioReady();

    const noteElement = noteIndex === 0 ? this.mysteryNote1 : this.mysteryNote2;
    const midi = noteIndex === 0 ? this.currentQuestion.midi1 : this.currentQuestion.midi2;
    const frequency = 440 * Math.pow(2, (midi - 69) / 12);

    this.clearNoteAnimTimers();
    noteElement?.classList.add('note-playing');
    this.playTone(frequency, this.audioCtx.currentTime, 0.65);
    this.noteAnimTimers.push(setTimeout(() => {
      noteElement?.classList.remove('note-playing');
    }, 650));
  }

  revealMysteryNotes() {
    if (!this.currentQuestion) return;
    const { midi1, midi2 } = this.currentQuestion;
    if (this.mysteryNote1) {
      this.mysteryNote1.textContent = this.midiToNoteNameEs(midi1);
      this.mysteryNote1.classList.add('note-revealed');
    }
    if (this.mysteryNote2) {
      this.mysteryNote2.textContent = this.midiToNoteNameEs(midi2);
      this.mysteryNote2.classList.add('note-revealed');
    }
  }

  clearAnswerButtonColors() {
    if (!this.exAnswersContainer) return;
    this.exAnswersContainer.querySelectorAll('.answer-btn').forEach((btn) => {
      if (btn._flashTimeout) {
        clearTimeout(btn._flashTimeout);
        btn._flashTimeout = null;
      }
      btn.classList.remove('flash-correct', 'flash-wrong');
    });
    if (this.currentQuestion) {
      this.currentQuestion.firstButtonEl = null;
      this.currentQuestion.firstClass = null;
    }
  }

  updateExerciseUi(flashType = null) {
    if (!this.activeLevel) return;
    if (this.activeLevel.isProgressive) {
      this.exLevelTitle.innerHTML = `${this.activeLevel.title} - <span class="prog-sublevel-badge" id="prog-sublevel-badge">(N${this.progressiveSubLevelId})</span>`;
      if (flashType) {
        const badgeEl = document.getElementById('prog-sublevel-badge');
        if (badgeEl) {
          if (this.progressiveFlashTimer) clearTimeout(this.progressiveFlashTimer);
          const cls = flashType === 'up' ? 'flash-level-up' : 'flash-level-down';
          badgeEl.classList.add(cls);
          this.progressiveFlashTimer = setTimeout(() => {
            badgeEl.classList.remove('flash-level-up', 'flash-level-down');
            this.progressiveFlashTimer = null;
          }, 1500);
        }
      }
    } else {
      this.exLevelTitle.textContent = this.activeLevel.title;
    }

    const effectiveLevel = this.getEffectiveIntervalLevel();
    this.exAnswersContainer.innerHTML = effectiveLevel.options
      .map((key) => {
        const item = INTERVAL_CATALOG[key];
        return `
          <button type="button" class="answer-btn" data-answer-key="${key}">
            ${item.label}
          </button>
        `;
      })
      .join('');

    this.exAnswersContainer.querySelectorAll('[data-answer-key]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.handleAnswerSelection(btn, btn.getAttribute('data-answer-key'));
      });
    });
  }

  scheduleAutoNextByDelay(delaySetting) {
    if (this.autoNextTimer) {
      clearTimeout(this.autoNextTimer);
      this.autoNextTimer = null;
    }
    if (delaySetting === 'none') return;
    const sec = Number(delaySetting);
    const waitMs = Number.isFinite(sec) && sec > 0 ? sec * 1000 : 120;
    this.autoNextTimer = setTimeout(() => {
      this.autoNextTimer = null;
      this.generateNextQuestion();
      this.playCurrentInterval();
    }, waitMs);
  }

  handleAnswerSelection(btnEl, selectedKey) {
    if (!this.activeLevel || !this.currentQuestion) return;
    if (this.activeModule === 'chords') {
      this.handleChordAnswerSelection(btnEl, selectedKey);
      return;
    }
    const stats = this.getLevelStats(this.activeLevel.id, 'intervals');
    const isCorrect = selectedKey === this.currentQuestion.targetIntervalKey;
    const colorClass = isCorrect ? 'flash-correct' : 'flash-wrong';

    if (isCorrect) {
      this.revealMysteryNotes();
    }

    if (!this.currentQuestion.answered) {
      this.currentQuestion.answered = true;
      this.currentQuestion.firstButtonEl = btnEl;
      this.currentQuestion.firstClass = colorClass;
      btnEl.classList.add(colorClass);

      if (isCorrect) {
        stats.good += 1;
      } else {
        stats.bad += 1;
      }

      if (this.activeLevel.isProgressive) {
        this.syncProgressiveDayState();
        const maxSubLevelId = Math.max(...INTERVAL_LEVELS.filter((l) => !l.isProgressive).map((l) => l.id));
        if (isCorrect) {
          this.progressiveConsecutiveGood += 1;
          if (this.progressiveConsecutiveGood >= 10) {
            this.progressiveConsecutiveGood = 0;
            if (this.progressiveSubLevelId < maxSubLevelId) {
              this.progressiveSubLevelId += 1;
              this.updateExerciseUi('up');
            }
          }
        } else {
          this.progressiveConsecutiveGood = 0;
          this.progressiveAccumBad += 1;
          if (this.progressiveAccumBad >= 10) {
            this.progressiveAccumBad = 0;
            if (this.progressiveSubLevelId >= 2) {
              this.progressiveSubLevelId -= 1;
              this.updateExerciseUi('down');
            }
          }
        }
        this.saveProgressiveState();
      }

      const delaySetting = isCorrect ? this.intervalGoodDelay : this.intervalBadDelay;
      this.scheduleAutoNextByDelay(delaySetting);

      const note1 = this.midiToNoteNameEs(this.currentQuestion.midi1);
      const note2 = this.midiToNoteNameEs(this.currentQuestion.midi2);
      const todayKey = this.getTodayKey();
      const todayCount = this.sessionLog.filter((it) => (it.date || todayKey) === todayKey).length;
      this.pushLevelDayLog('intervals', this.activeLevel.id, {
        date: todayKey,
        index: todayCount + 1,
        notes: `${note1} - ${note2}`,
        midi1: this.currentQuestion.midi1,
        midi2: this.currentQuestion.midi2,
        intervalKey: this.currentQuestion.targetIntervalKey,
        answer: INTERVAL_CATALOG[selectedKey]?.label || selectedKey,
        isCorrect,
      });
      this.sessionLog = this.getLevelDayLog('intervals', this.activeLevel.id);
      this.renderSessionLog();

      const totalDone = stats.good + stats.bad;

      if (totalDone >= this.dailyIntervalsMin) {
        const ratio = totalDone > 0 ? stats.good / totalDone : 0;
        const earnedStars = ratio >= 0.85 ? 3 : ratio >= 0.65 ? 2 : 1;
        if (earnedStars > stats.stars) {
          stats.stars = earnedStars;
        }
      }

      this.saveProgress();
      this.updateHomeModuleProgress();
    } else {
      if (btnEl === this.currentQuestion.firstButtonEl) {
        return;
      }
      if (btnEl._flashTimeout) {
        clearTimeout(btnEl._flashTimeout);
      }
      btnEl.classList.add(colorClass);
      btnEl._flashTimeout = setTimeout(() => {
        btnEl.classList.remove(colorClass);
        btnEl._flashTimeout = null;
      }, 1000);
    }
  }

  handleChordAnswerSelection(button, selectedChordId) {
    if (!this.activeLevel || !this.currentQuestion) return;
    if (this.currentQuestion.answered) {
      if (button === this.currentQuestion.firstButtonEl) return;
      if (button._flashTimeout) clearTimeout(button._flashTimeout);
      button.classList.add(selectedChordId === this.currentQuestion.chordId ? 'flash-correct' : 'flash-wrong');
      button._flashTimeout = setTimeout(() => {
        button.classList.remove('flash-correct', 'flash-wrong');
        button._flashTimeout = null;
      }, 1000);
      return;
    }
    const stats = this.getLevelStats(this.activeLevel.id, 'chords');
    const isCorrect = selectedChordId === this.currentQuestion.chordId;
    button.classList.add(isCorrect ? 'flash-correct' : 'flash-wrong');
    this.currentQuestion.answered = true;
    this.currentQuestion.firstButtonEl = button;

    if (isCorrect) stats.good += 1;
    else stats.bad += 1;

    const todayKey = this.getTodayKey();
    const entries = this.getLevelDayLog('chords', this.activeLevel.id);
    const todayCount = entries.filter((entry) => (entry.date || todayKey) === todayKey).length;
    const chordNotes = this.currentQuestion.chordMidis.map((midi) => this.midiToNoteNameEs(midi));
    this.pushLevelDayLog('chords', this.activeLevel.id, {
      date: todayKey,
      index: todayCount + 1,
      notes: chordNotes.join(' - '),
      answer: CHORD_CATALOG[selectedChordId]?.label || selectedChordId,
      isCorrect,
    });
    this.chordSessionLog = this.getLevelDayLog('chords', this.activeLevel.id);
    this.renderLogTable(this.chordSessionLogWrapper, this.chordSessionLogTbody, this.chordSessionLog, 'chords');

    const totalDone = stats.good + stats.bad;
    if (totalDone >= this.dailyChordsMin) {
      const ratio = totalDone > 0 ? stats.good / totalDone : 0;
      const earnedStars = ratio >= 0.85 ? 3 : ratio >= 0.65 ? 2 : 1;
      if (earnedStars > stats.stars) stats.stars = earnedStars;
    }

    this.saveProgress();
    this.updateHomeModuleProgress();
    const delaySetting = isCorrect ? this.chordGoodDelay : this.chordBadDelay;
    this.scheduleAutoNextByDelay(delaySetting);
  }

  renderSessionLog() {
    this.renderLogTable(this.sessionLogWrapper, this.sessionLogTbody, this.sessionLog, 'intervals');
  }

  renderSingSessionLog() {
    this.renderLogTable(this.singSessionLogWrapper, this.singSessionLogTbody, this.singSessionLog, 'singing');
  }

  buildDaySummaryHtml(dayLabel, items, isSinging, dailyGoal) {
    const totalEx = items.length;
    if (totalEx === 0) return '';

    const exerciseGrades = { admirable: 0, bueno: 0, aceptable: 0, casi: 0, malo: 0 };
    items.forEach((it) => {
      const grade = exerciseGrades[it.exerciseGrade] !== undefined
        ? it.exerciseGrade
        : it.isCorrect ? 'bueno' : 'malo';
      exerciseGrades[grade]++;
    });

    const pBadEx = Math.round((exerciseGrades.malo / totalEx) * 100);
    const pRegEx = Math.round((exerciseGrades.casi / totalEx) * 100);
    const pAcepEx = Math.round((exerciseGrades.aceptable / totalEx) * 100);
    const pBuenoEx = Math.round((exerciseGrades.bueno / totalEx) * 100);
    const pAdmEx = Math.max(0, 100 - pBadEx - pRegEx - pAcepEx - pBuenoEx);
    const pGoodEx = Math.max(0, 100 - pBadEx);

    let notesSummaryHtml = '';
    if (isSinging) {
      let nMalo = 0;
      let nReg = 0;
      let nAcep = 0;
      let nBueno = 0;
      let nAdm = 0;
      let cGli = 0;
      let cPlana = 0;
      let cVib = 0;
      let cIrr = 0;
      let cSinAnalisis = 0;

      items.forEach((it) => {
        const ns = Array.isArray(it.noteStats) ? it.noteStats : [];
        if (ns.length > 0) {
          ns.forEach((n) => {
            if (n.grade === 'admirable') nAdm++;
            else if (n.grade === 'bueno') nBueno++;
            else if (n.grade === 'aceptable') nAcep++;
            else if (n.grade === 'casi') nReg++;
            else nMalo++;

            if (n.glissando) cGli++;
            if (n.voiceType === 'vibrato') cVib++;
            else if (n.voiceType === 'inestable') cIrr++;
            else if (n.voiceType === 'sin-analisis') cSinAnalisis++;
            else cPlana++;
          });
        }
      });

      const totalNotes = nMalo + nReg + nAcep + nBueno + nAdm;
      if (totalNotes > 0) {
        const pNReg = Math.round((nReg / totalNotes) * 100);
        const pNAcep = Math.round((nAcep / totalNotes) * 100);
        const pNBueno = Math.round((nBueno / totalNotes) * 100);
        const pNAdm = Math.round((nAdm / totalNotes) * 100);
        const pNMalo = Math.max(0, 100 - pNAdm - pNReg - pNAcep - pNBueno);

        notesSummaryHtml = `
          <div class="day-summary-line">
            <span><strong>Notas:</strong> ${totalNotes}</span>
            ${pNAdm > 0 ? `<span class="sum-adm" title="Admirables" aria-label="Admirables: ${pNAdm}%">✦ ${pNAdm}%</span>` : ''}
            ${pNBueno > 0 ? `<span class="sum-bueno" title="Buenas" aria-label="Buenas: ${pNBueno}%">✓ ${pNBueno}%</span>` : ''}
            <span class="sum-acep" title="Aceptables" aria-label="Aceptables: ${pNAcep}%">⊙ ${pNAcep}%</span>
            <span class="sum-reg" title="Regulares" aria-label="Regulares: ${pNReg}%">≈ ${pNReg}%</span>
            <span class="sum-bad" title="Fallidas" aria-label="Fallidas: ${pNMalo}%">✕ ${pNMalo}%</span>
          </div>
          <div class="day-prop-bar" title="Proporción de notas cantadas">
            ${pNAdm > 0 ? `<div class="bar-seg seg-adm" style="width:${pNAdm}%"></div>` : ''}
            ${pNBueno > 0 ? `<div class="bar-seg seg-bueno" style="width:${pNBueno}%"></div>` : ''}
            ${pNAcep > 0 ? `<div class="bar-seg seg-acep" style="width:${pNAcep}%"></div>` : ''}
            ${pNReg > 0 ? `<div class="bar-seg seg-reg" style="width:${pNReg}%"></div>` : ''}
            ${pNMalo > 0 ? `<div class="bar-seg seg-bad" style="width:${pNMalo}%"></div>` : ''}
          </div>
          <div class="day-voice-counts">
            <span><strong>Voz </strong></span>
            <span>Glisandos: <strong>${cGli}</strong></span>
            <span>Sin vibrato: <strong>${cPlana}</strong></span>
            <span>Vibratos: <strong>${cVib}</strong></span>
            <span>Irregulares: <strong>${cIrr}</strong></span>
            ${cSinAnalisis ? `<span>Sin análisis: <strong>${cSinAnalisis}</strong></span>` : ''}
          </div>
        `;
      }
    }

    const colSpan = isSinging ? 6 : 4;
    const headersRowHtml = isSinging
      ? `<tr class="log-col-headers">
           <th>#</th>
           <th>Nota</th>
           <th></th>
           <th>Centro tonal</th>
           <th>Voz</th>
           <th></th>
         </tr>`
      : `<tr class="log-col-headers">
           <th>#</th>
           <th>Notas</th>
           <th>Tu respuesta</th>
           <th></th>
         </tr>`;

    return `
      <tr class="day-divider-row">
        <td colspan="${colSpan}" class="day-divider-cell">
          <div class="day-divider-banner">${dayLabel}: Completado ${totalEx} de ${dailyGoal}</div>
          <div class="day-summary-box">
            <div class="day-summary-line">
              <span><strong>Ejercicios:</strong> ${totalEx}</span>
              ${isSinging
        ? `${pAdmEx > 0 ? `<span class="sum-adm" title="Admirables" aria-label="Admirables: ${pAdmEx}%">✦ ${pAdmEx}%</span>` : ''}
                   ${pBuenoEx > 0 ? `<span class="sum-bueno" title="Buenos" aria-label="Buenos: ${pBuenoEx}%">✓ ${pBuenoEx}%</span>` : ''}
                   <span class="sum-acep" title="Aceptables" aria-label="Aceptables: ${pAcepEx}%">⊙ ${pAcepEx}%</span>
                   <span class="sum-reg" title="Regulares" aria-label="Regulares: ${pRegEx}%">≈ ${pRegEx}%</span>
                   <span class="sum-bad" title="Fallidos" aria-label="Fallidos: ${pBadEx}%">✕ ${pBadEx}%</span>`
        : `<span class="sum-good" title="Buenos" aria-label="Buenos: ${pGoodEx}%">✓ ${pGoodEx}%</span>
                   <span class="sum-bad" title="Fallidos" aria-label="Fallidos: ${pBadEx}%">✕ ${pBadEx}%</span>`}
            </div>
            <div class="day-prop-bar" title="Proporción de ejercicios">
              ${isSinging
        ? `${pAdmEx > 0 ? `<div class="bar-seg seg-adm" style="width:${pAdmEx}%"></div>` : ''}
                   ${pBuenoEx > 0 ? `<div class="bar-seg seg-bueno" style="width:${pBuenoEx}%"></div>` : ''}
                   ${pAcepEx > 0 ? `<div class="bar-seg seg-acep" style="width:${pAcepEx}%"></div>` : ''}
                   ${pRegEx > 0 ? `<div class="bar-seg seg-reg" style="width:${pRegEx}%"></div>` : ''}
                   ${pBadEx > 0 ? `<div class="bar-seg seg-bad" style="width:${pBadEx}%"></div>` : ''}`
        : `${pGoodEx > 0 ? `<div class="bar-seg seg-bueno" style="width:${pGoodEx}%"></div>` : ''}
                   ${pBadEx > 0 ? `<div class="bar-seg seg-bad" style="width:${pBadEx}%"></div>` : ''}`}
            </div>
            ${notesSummaryHtml}
          </div>
        </td>
      </tr>
      ${headersRowHtml}
    `;
  }

  formatDateBannerLabel(dateKey) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const parts = String(dateKey || '').split('-');
    let formattedDate = dateKey;
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const dt = new Date(y, m - 1, d);
      if (!Number.isNaN(dt.getTime())) {
        const dayName = days[dt.getDay()];
        const dd = String(d).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        formattedDate = `${dayName}, ${dd}/${mm}/${y}`;
      }
    }
    const todayKey = this.getTodayKey();
    const yesterdayKey = this.getYesterdayKey();
    if (dateKey === todayKey) return `HOY · ${formattedDate}`;
    if (dateKey === yesterdayKey) return `AYER · ${formattedDate}`;
    return formattedDate;
  }

  renderLogTable(wrapperEl, tbodyEl, list, moduleType = 'intervals') {
    if (!wrapperEl || !tbodyEl) return;
    const isSinging = moduleType === 'singing';
    const dailyGoal = moduleType === 'singing'
      ? this.dailySingingMin
      : moduleType === 'chords' ? this.dailyChordsMin : this.dailyIntervalsMin;
    if (!Array.isArray(list) || list.length === 0) {
      const emptyHeaders = isSinging
        ? `<tr class="log-col-headers">
             <th>#</th><th>Nota</th><th></th><th>Centro tonal</th><th>Voz</th><th></th>
           </tr>`
        : `<tr class="log-col-headers">
             <th>#</th><th>Notas</th><th>Tu respuesta</th><th></th>
           </tr>`;
      const colSpan = isSinging ? 6 : 4;
      tbodyEl.innerHTML = `${emptyHeaders}
        <tr class="log-empty-row"><td colspan="${colSpan}">Aún no hay ejercicios registrados.</td></tr>`;
      wrapperEl.classList.remove('hidden');
      return;
    }

    const gradeLabel = {
      admirable: { icon: '✦', label: 'Admirable', cls: 'grade-admirable' },
      bueno: { icon: '✓', label: 'Bueno', cls: 'grade-bueno' },
      aceptable: { icon: '⊙', label: 'Aceptable', cls: 'grade-aceptable' },
      casi: { icon: '≈', label: 'Regular', cls: 'grade-casi' },
      malo: { icon: '✕', label: 'Fallido', cls: 'grade-malo' },
    };

    const noteGradeLabel = {
      admirable: { icon: '✦', label: 'Admirable', cls: 'grade-admirable' },
      bueno: { icon: '✓', label: 'Buena', cls: 'grade-bueno' },
      aceptable: { icon: '⊙', label: 'Aceptable', cls: 'grade-aceptable' },
      casi: { icon: '≈', label: 'Regular', cls: 'grade-casi' },
      malo: { icon: '✕', label: 'Fallida', cls: 'grade-malo' },
    };

    const todayKey = this.getTodayKey();
    const yesterdayKey = this.getYesterdayKey();

    const todayItems = list.filter((it) => (it.date || todayKey) === todayKey);
    const yesterdayItems = list.filter((it) => it.date === yesterdayKey);

    const renderRows = (items) =>
      items
        .map((item) => {
          const latestRowClass = item === list[0]
            ? `log-latest-entry log-latest-${item.exerciseGrade || (item.isCorrect ? 'bueno' : 'malo')}`
            : '';

          if (isSinging) {
            const gl = gradeLabel[item.exerciseGrade] || gradeLabel.malo;
            const ns = Array.isArray(item.noteStats) ? item.noteStats : [];
            const targetNotes = String(item.notes || '').split(/<br\s*\/?>/i);
            const noteCount = Math.max(ns.length, targetNotes.length, 1);

            return Array.from({ length: noteCount }, (_, noteIndex) => {
              const note = ns[noteIndex];
              const noteGrade = note ? (noteGradeLabel[note.grade] || noteGradeLabel.malo) : null;
              const rawLabel = (note?.label || '')
                .replace('Casi perfecto', 'Casi centrado')
                .replace('Perfecto', 'Centrado');
              const tonalCenter = note?.sungNote && rawLabel !== 'Silencio' && rawLabel !== 'Muy irregular'
                ? `<strong>${note.sungNote}</strong> ${rawLabel}`
                : rawLabel || '&nbsp;';

              let voiceBadge = '&nbsp;';
              if (note?.voiceType === 'vibrato') {
                const hzTxt = note.vibratoHz ? ` (${note.vibratoHz}Hz)` : '';
                voiceBadge = `<span class="voice-badge badge-vibrato" title="Vibrato detectado${hzTxt}">V</span>`;
              } else if (note?.voiceType === 'inestable') {
                voiceBadge = '<span class="voice-badge badge-unstable" title="Voz irregular detectada">I</span>';
              }

              const glissandoBadge = note?.glissando
                ? '<span class="voice-badge badge-glissando" title="Glisando detectado">G</span>'
                : '&nbsp;';
              const firstRowCells = noteIndex === 0
                ? `<td rowspan="${noteCount}">${item.index}</td>`
                : '';
              const exerciseGradeCell = noteIndex === 0
                ? `<td class="log-grade ${gl.cls}" rowspan="${noteCount}" title="${gl.label}" aria-label="${gl.label}">${gl.icon}</td>`
                : '';

              return `
                <tr${latestRowClass ? ` class="${latestRowClass}"` : ''}>
                  ${firstRowCells}
                  <td class="log-notes-col">${targetNotes[noteIndex] || '&nbsp;'}</td>
                  <td class="log-note-grades">${noteGrade ? `<span class="note-grade-line ${noteGrade.cls}" title="${noteGrade.label}" aria-label="${noteGrade.label}">${noteGrade.icon}</span>` : '&nbsp;'}</td>
                  <td class="log-tonal-col">${tonalCenter}</td>
                  <td class="log-voice-col">${voiceBadge} ${glissandoBadge}</td>
                  ${exerciseGradeCell}
                </tr>
              `;
            }).join('');
          }

          const hasGrade = item.exerciseGrade !== undefined;
          const gl = hasGrade ? (gradeLabel[item.exerciseGrade] || gradeLabel.malo) : null;
          const statusCell = hasGrade
            ? `<td class="log-grade ${gl.cls}" title="${gl.label}" aria-label="${gl.label}">${gl.icon}</td>`
            : `<td class="${item.isCorrect ? 'log-icon-ok' : 'log-icon-err'}">
                 <span class="status-icon-badge ${item.isCorrect ? 'badge-ok' : 'badge-err'}">
                   ${item.isCorrect ? '✓' : '✕'}
                 </span>
               </td>`;
          return `
            <tr${latestRowClass ? ` class="${latestRowClass}"` : ''}>
              <td>${item.index}</td>
              <td>${item.notes}</td>
              <td>${item.answer}</td>
              ${statusCell}
            </tr>
          `;
        })
        .join('');

    const groupsByDate = new Map();
    list.forEach((it) => {
      if (!it) return;
      const dKey = it.date || todayKey;
      if (!groupsByDate.has(dKey)) groupsByDate.set(dKey, []);
      groupsByDate.get(dKey).push(it);
    });

    const sortedDates = Array.from(groupsByDate.keys()).sort((a, b) => b.localeCompare(a));
    let html = '';
    sortedDates.forEach((dKey) => {
      const dayItems = groupsByDate.get(dKey) || [];
      if (dayItems.length > 0) {
        const bannerLabel = this.formatDateBannerLabel(dKey);
        html += this.buildDaySummaryHtml(bannerLabel, dayItems, isSinging, dailyGoal);
        html += renderRows(dayItems);
      }
    });

    if (!html) {
      wrapperEl.classList.add('hidden');
      tbodyEl.innerHTML = '';
      return;
    }

    wrapperEl.classList.remove('hidden');
    tbodyEl.innerHTML = html;
  }

  /* =========================================================================
   * MÓDULO 2: CANTAR NOTAS (GRAN PENTAGRAMA SOL/FA DE 2 COMPASES)
   * ========================================================================= */

  async ensureMicStreamReady() {
    if (this.mediaStream && this.mediaStream.active) return true;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 1,
        },
      });
      return true;
    } catch (_) {
      if (this.singFeedbackText) {
        this.singFeedbackText.textContent = 'Permite el micrófono para grabar tu voz en el 2º compás.';
        this.singFeedbackText.classList.remove('hidden');
      }
      return false;
    }
  }

  releaseMicStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
  }

  updateSingingExerciseUi() {
    if (!this.activeLevel) return;
    this.singLevelTitle.textContent = this.activeLevel.title;
  }

  resetSingingQuestionUi() {
    this.lastVoiceFrames = [];
    this.lastNoteGrades = null;
    this.lastNoteDetails = null;
    if (this.singDebugPanel) this.singDebugPanel.classList.add('hidden');
    if (!this.currentQuestion) return;

    if (this.singFeedbackText) {
      this.singFeedbackText.textContent = '';
      this.singFeedbackText.classList.add('hidden');
    }
    this.drawGrandStaff(null, []);
  }

  stopSingingSequence() {
    if (this.singRafId) {
      cancelAnimationFrame(this.singRafId);
      this.singRafId = null;
    }
    this.singTimers.forEach((t) => clearTimeout(t));
    this.singTimers = [];
    this.stopMicProcessor();
  }

  stopMicProcessor() {
    this.isRecording = false;
    if (this.processorNode) {
      this.processorNode.onaudioprocess = null;
      try {
        this.processorNode.disconnect();
      } catch (_) { }
      this.processorNode = null;
    }
    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch (_) { }
      this.sourceNode = null;
    }
  }

  /**
   * Inicia la secuencia de 2 compases en 4/4:
   * - 2 clicks de cuenta previa (pulsos -2 y -1)
   * - Compás 1 (pulsos 0..4): suenan N negras (o solo la 1ª si singOnlyFirstNote) + silencios restantes
   * - Compás 2 (pulsos 4..8): no suenan las notas, avanza el cursor y graba la voz
   */
  async startSingingSequence() {
    if (!this.currentQuestion) return;
    this.stopSingingSequence();
    this.lastVoiceFrames = [];
    this.lastNoteGrades = null;
    this.lastNoteDetails = null;
    if (this.singFeedbackText) {
      this.singFeedbackText.textContent = '';
      this.singFeedbackText.classList.add('hidden');
    }

    await this.ensureAudioReady();
    await this.ensureMicStreamReady();

    const beatSec = 60 / this.singBpm; // ej. 72 BPM -> 0.8333s por negra
    const midis = this.currentQuestion.midis || [this.currentQuestion.midi1, this.currentQuestion.midi2].filter((m) => m != null);

    const t0 = this.audioCtx.currentTime + 0.05;

    // 1. Dos clicks marcando el pulso antes del Compás 1 (mismo sonido agudo para ambos)
    this.playMetronomeClick(t0, true);
    this.playMetronomeClick(t0 + beatSec, true);

    // 2. Compás 1 (empieza en t0 + 2 * beatSec): suenan las notas configuradas (o solo la 1ª)
    const m1Start = t0 + 2 * beatSec;
    if (this.singOnlyFirstNote) {
      if (midis[0] != null) {
        const hz0 = 440 * Math.pow(2, (midis[0] - 69) / 12);
        this.playTone(hz0, m1Start, beatSec * 0.9);
      }
    } else {
      midis.forEach((m, idx) => {
        const hz = 440 * Math.pow(2, (m - 69) / 12);
        this.playTone(hz, m1Start + idx * beatSec, beatSec * 0.9);
      });
    }

    // 3. Grabación de voz: comienza 200ms ANTES del Compás 2 para registrar si el usuario se adelanta al cantar
    const preRollSec = 0.2;
    const m2DurationSec = 4 * beatSec;
    const recordStartDelayMs = Math.max(0, ((2 + 4) * beatSec - preRollSec) * 1000);

    this.singTimers.push(
      setTimeout(() => {
        this.beginCompas2Recording(preRollSec, m2DurationSec);
      }, recordStartDelayMs)
    );

    // Animar la línea/punto de tiempo en los 2 compases (de beat 0 a beat 8)
    const animatePlayhead = () => {
      const now = this.audioCtx.currentTime;
      const elapsedFromM1 = now - m1Start;
      const currentBeat = elapsedFromM1 / beatSec; // <0 durante los 2 clicks, 0..4 Compás 1, 4..8 Compás 2

      if (currentBeat <= 8.05) {
        const playheadNorm = currentBeat >= 0 ? Math.min(1, currentBeat / 8) : null;
        this.drawGrandStaff(playheadNorm, this.lastVoiceFrames, currentBeat);
        this.singRafId = requestAnimationFrame(animatePlayhead);
      } else {
        this.singRafId = null;
        this.drawGrandStaff(null, this.lastVoiceFrames);
      }
    };

    this.singRafId = requestAnimationFrame(animatePlayhead);
  }

  playMetronomeClick(startTime, isAccent = false) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isAccent ? 1250 : 1000, startTime);
    osc.frequency.exponentialRampToValueAtTime(750, startTime + 0.065);

    const peakGain = Math.max(0.01, ((this.clickVolume ?? 90) / 100) * 0.98);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.075);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.08);
  }

  beginCompas2Recording(preRollSec, m2DurationSec) {
    if (!this.mediaStream || !this.mediaStream.active) return;

    this.stopMicProcessor();
    this.isRecording = true;

    const totalDurationSec = preRollSec + m2DurationSec;
    const sampleRate = this.audioCtx.sampleRate;
    const totalSamples = Math.round(totalDurationSec * sampleRate);
    const chunks = [];
    let collected = 0;

    this.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
    this.processorNode = this.audioCtx.createScriptProcessor(2048, 1, 1);

    const silentGain = this.audioCtx.createGain();
    silentGain.gain.value = 0;
    this.sourceNode.connect(this.processorNode);
    this.processorNode.connect(silentGain);
    silentGain.connect(this.audioCtx.destination);

    const startMs = performance.now();

    this.processorNode.onaudioprocess = (e) => {
      if (!this.isRecording) return;
      const input = e.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(input));
      collected += input.length;

      const elapsedSec = (performance.now() - startMs) / 1000;
      if (collected >= totalSamples || elapsedSec >= totalDurationSec) {
        this.finishCompas2Recording(chunks, totalSamples, sampleRate, preRollSec, m2DurationSec);
      }
    };
  }

  finishCompas2Recording(chunks, totalSamples, sampleRate, preRollSec, m2DurationSec) {
    this.stopMicProcessor();

    const pcm = new Float32Array(totalSamples);
    let offset = 0;
    for (const c of chunks) {
      const rem = totalSamples - offset;
      if (rem <= 0) break;
      const len = Math.min(c.length, rem);
      pcm.set(c.subarray(0, len), offset);
      offset += len;
    }

    const preRollSamples = Math.round(preRollSec * sampleRate);
    const midis = this.currentQuestion.midis || [this.currentQuestion.midi1, this.currentQuestion.midi2].filter((m) => m != null);
    const noteCount = Math.max(1, Math.min(4, midis.length));

    // ── Extraer frames del compás 2 incluyendo el pre-roll que dibuja el pentagrama ──
    const earlyAllowance = preRollSamples;
    const m2PcmStart = 0;
    const m2AllFrames = this.extractMidiFrames(pcm.subarray(m2PcmStart), sampleRate);

    // Duración esperada de cada negra en frames (20ms/frame)
    const noteDurSec = m2DurationSec / 4;          // 4 pulsos por compás
    const noteDurFrames = Math.round(noteDurSec / 0.02);
    const earlyFrames = Math.round(earlyAllowance / (sampleRate * 0.02));

    // Pulsos esperados dentro de m2AllFrames (el compás 2 empieza en earlyFrames)
    const pulseFrames = [];
    for (let i = 0; i <= noteCount; i++) {
      pulseFrames.push(earlyFrames + noteDurFrames * i);
    }

    // ── Segmentar y mapear las N notas ────────────────────────────────────────
    const segResult = noteCount === 2
      ? this.segmentNotes(m2AllFrames, pulseFrames[0], pulseFrames[1], pulseFrames[2], noteDurFrames)
      : this.segmentNotesMulti(m2AllFrames, pulseFrames, noteDurFrames, noteCount);

    const midiFramesList = segResult.frames;

    // ── Evaluación de las N notas ─────────────────────────────────────────────
    const makeTonal = (a) => ({
      label: a.label,
      sungNote: a.sungNote || null,
      voiceType: a.voiceType,
      isVibrato: a.voiceType === 'vibrato',
      isUnstable: a.voiceType === 'inestable',
      vibratoHz: a.vibratoHz,
      glissando: a.glissando,
      isHighLow: a.isHighLow,
    });

    const evals = [];
    const analyses = [];
    const noteGrades = [];
    const noteDetails = [];

    for (let i = 0; i < noteCount; i++) {
      const mFrames = midiFramesList[i] || [];
      const targetMidi = midis[i];
      const ev = this.getNoteGradeFromFrames(mFrames, targetMidi);
      const an = this.buildNoteAnalysis(mFrames, targetMidi);
      evals.push(ev);
      analyses.push(an);
      noteGrades.push(ev.grade);
      noteDetails.push({ ...ev, tonal: makeTonal(an) });
    }

    this.lastNoteGrades = noteGrades;
    this.lastNoteDetails = noteDetails;

    // Guardar datos de debug completos
    this.lastDebugData = {
      segmentation: segResult.dbg,
      allFrames: m2AllFrames,
      midiFramesList,
      midiFrames1: midiFramesList[0] || [],
      midiFrames2: midiFramesList[1] || [],
      noteDurFrames,
      pulseFrames,
      pulse1: pulseFrames[0],
      pulse2: pulseFrames[1] ?? (pulseFrames[0] + noteDurFrames),
      pulse3: pulseFrames[2] ?? (pulseFrames[0] + noteDurFrames * 2),
      analyses,
      analysis1: analyses[0] || null,
      analysis2: analyses[1] || null,
    };

    // Construir la curva del pentagrama exactamente con los mismos m2AllFrames analizados
    const hopSamples = Math.round(sampleRate * 0.02);
    this.lastVoiceFrames = m2AllFrames.map((midi, idx) => {
      const tSec = (idx * hopSamples) / sampleRate;
      const ratio = (tSec - preRollSec) / Math.max(0.1, m2DurationSec);
      return { ratio, midi };
    });
    this.drawGrandStaff(null, this.lastVoiceFrames);
    this.evaluateSingingTake();
  }

  /**
   * Segmenta los frames del compás 2 en N arrays de frames MIDI (para N = 1, 3 o 4 notas).
   */
  segmentNotesMulti(allFrames, pulseFrames, noteDurFrames, noteCount) {
    const MIN_VOICED_PCT = 0.20;
    const MERGE_GAP_MAX = 5;
    const PITCH_MERGE_MAX = 150;
    const PITCH_BREAK_MIN = 150;
    const PITCH_BREAK_FRAMES = 3;

    const segments = [];
    let segStart = -1;
    for (let i = 0; i < allFrames.length; i++) {
      const voiced = allFrames[i] !== null;
      if (voiced && segStart === -1) {
        segStart = i;
      } else if (!voiced && segStart !== -1) {
        segments.push({ start: segStart, end: i - 1, frames: allFrames.slice(segStart, i) });
        segStart = -1;
      }
      if (voiced && segStart !== -1 && i >= segStart + PITCH_BREAK_FRAMES) {
        const recent = allFrames.slice(i - PITCH_BREAK_FRAMES, i).filter(Boolean);
        if (recent.length >= 2 && allFrames[i] !== null) {
          const recentMean = recent.reduce((s, v) => s + v, 0) / recent.length;
          const diffCents = Math.abs((allFrames[i] - recentMean) * 100);
          if (diffCents > PITCH_BREAK_MIN) {
            segments.push({ start: segStart, end: i - 1, frames: allFrames.slice(segStart, i) });
            segStart = i;
          }
        }
      }
    }
    if (segStart !== -1) {
      segments.push({ start: segStart, end: allFrames.length - 1, frames: allFrames.slice(segStart) });
    }

    const merged = [];
    for (const seg of segments) {
      if (merged.length === 0) { merged.push({ ...seg }); continue; }
      const prev = merged[merged.length - 1];
      const gap = seg.start - prev.end - 1;
      if (gap <= MERGE_GAP_MAX) {
        const prevMidi = prev.frames.filter(Boolean);
        const currMidi = seg.frames.filter(Boolean);
        if (prevMidi.length > 0 && currMidi.length > 0) {
          const prevMean = prevMidi.reduce((s, v) => s + v, 0) / prevMidi.length;
          const currMean = currMidi.reduce((s, v) => s + v, 0) / currMidi.length;
          const diffCents = Math.abs((prevMean - currMean) * 100);
          if (diffCents < PITCH_MERGE_MAX) {
            const gap_nulls = new Array(gap).fill(null);
            prev.frames = [...prev.frames, ...gap_nulls, ...seg.frames];
            prev.end = seg.end;
            continue;
          }
        }
      }
      merged.push({ ...seg });
    }

    const pulse1 = pulseFrames[0];
    let globalShift = 0;
    const firstOnset = merged.length > 0 ? merged[0].start : -1;
    if (firstOnset > pulse1 + Math.round(0.2 / 0.02)) {
      globalShift = firstOnset - pulse1;
    }

    const shiftedPulses = pulseFrames.map((p, idx) =>
      idx === pulseFrames.length - 1
        ? Math.min(p + globalShift, allFrames.length)
        : Math.min(p + globalShift, allFrames.length)
    );

    if (noteCount === 1) {
      if (merged.length >= 1) {
        const seg = merged[0];
        const f1 = this._framesForNote(seg.frames, noteDurFrames, MIN_VOICED_PCT);
        return {
          frames: [f1],
          dbg: {
            strategy: '1 nota (primer segmento)',
            rawSegments: segments.length,
            mergedSegments: merged.map((s) => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
            globalShift,
            noteRanges: [{ start: seg.start, end: seg.end }],
            note1: { start: seg.start, end: seg.end },
          },
        };
      }
      const pStart = shiftedPulses[0];
      const pEnd = shiftedPulses[1];
      const f1 = this._framesForNote(allFrames.slice(pStart, pEnd), noteDurFrames, MIN_VOICED_PCT);
      return {
        frames: [f1],
        dbg: {
          strategy: 'fallback estricto 1 nota',
          rawSegments: segments.length,
          mergedSegments: [],
          globalShift,
          noteRanges: [{ start: pStart, end: pEnd - 1 }],
          note1: { start: pStart, end: pEnd - 1 },
        },
      };
    }

    // Para 3 o 4 notas: si hay exactamente noteCount segmentos bien separados, usarlos; de lo contrario, mapear cada ventana de pulso ajustada
    const framesOut = [];
    const noteRanges = [];
    if (merged.length === noteCount) {
      for (let i = 0; i < noteCount; i++) {
        const seg = merged[i];
        framesOut.push(this._framesForNote(seg.frames, noteDurFrames, MIN_VOICED_PCT));
        noteRanges.push({ start: seg.start, end: seg.end });
      }
      return {
        frames: framesOut,
        dbg: {
          strategy: `${noteCount} segmentos directos`,
          rawSegments: segments.length,
          mergedSegments: merged.map((s) => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
          globalShift,
          noteRanges,
          note1: noteRanges[0] || null,
          note2: noteRanges[1] || null,
        },
      };
    }

    for (let i = 0; i < noteCount; i++) {
      const pStart = shiftedPulses[i];
      const pEnd = shiftedPulses[i + 1];
      framesOut.push(this._framesForNote(allFrames.slice(pStart, pEnd), noteDurFrames, MIN_VOICED_PCT));
      noteRanges.push({ start: pStart, end: Math.max(pStart, pEnd - 1) });
    }
    return {
      frames: framesOut,
      dbg: {
        strategy: `ventanas de pulso (${noteCount} notas)`,
        rawSegments: segments.length,
        mergedSegments: merged.map((s) => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
        globalShift,
        noteRanges,
        note1: noteRanges[0] || null,
        note2: noteRanges[1] || null,
      },
    };
  }

  /**
   * Segmenta los frames del compás 2 en exactamente 2 arrays de frames MIDI,
   * uno por cada nota esperada.
   *
   * Estrategia:
   *  1. Detectar segmentos de sonido (onset/offset) y cambios bruscos de pitch.
   *  2. Fusionar segmentos muy cercanos con pitch similar (cortes involuntarios).
   *  3. Detectar desplazamiento global si el primer onset llega muy tarde.
   *  4. Mapear segmentos a las 2 notas esperadas.
   *  5. Fallback estricto: corte por tiempo fijo ajustado por desplazamiento.
   *
   * Una nota se considera no cantada solo si tiene < 20% de frames útiles
   * respecto a noteDurFrames.
   */
  segmentNotes(allFrames, pulse1, pulse2, pulse3, noteDurFrames) {
    const MIN_VOICED_PCT = 0.20;   // < 20% → no cantada
    const MERGE_GAP_MAX = 5;      // frames de silencio para fusionar (≈100ms)
    const PITCH_MERGE_MAX = 150;    // cents — diferencia máxima para fusionar
    const PITCH_BREAK_MIN = 150;    // cents — cambio brusco de pitch → nuevo segmento
    const PITCH_BREAK_FRAMES = 3;    // en cuántos frames debe sostenerse el cambio

    // ── Paso 1: detectar segmentos de sonido ─────────────────────────────────
    const segments = [];   // [{ start, end, frames[] }]
    let segStart = -1;

    for (let i = 0; i < allFrames.length; i++) {
      const voiced = allFrames[i] !== null;
      if (voiced && segStart === -1) {
        segStart = i;
      } else if (!voiced && segStart !== -1) {
        segments.push({ start: segStart, end: i - 1, frames: allFrames.slice(segStart, i) });
        segStart = -1;
      }
      // Cambio brusco de pitch sin silencio → dividir segmento
      if (voiced && segStart !== -1 && i >= segStart + PITCH_BREAK_FRAMES) {
        const recent = allFrames.slice(i - PITCH_BREAK_FRAMES, i).filter(Boolean);
        if (recent.length >= 2 && allFrames[i] !== null) {
          const recentMean = recent.reduce((s, v) => s + v, 0) / recent.length;
          const diffCents = Math.abs((allFrames[i] - recentMean) * 100);
          if (diffCents > PITCH_BREAK_MIN) {
            segments.push({ start: segStart, end: i - 1, frames: allFrames.slice(segStart, i) });
            segStart = i;
          }
        }
      }
    }
    if (segStart !== -1) {
      segments.push({ start: segStart, end: allFrames.length - 1, frames: allFrames.slice(segStart) });
    }

    // ── Paso 2: fusionar segmentos cercanos con pitch similar ─────────────────
    const merged = [];
    for (const seg of segments) {
      if (merged.length === 0) { merged.push({ ...seg }); continue; }
      const prev = merged[merged.length - 1];
      const gap = seg.start - prev.end - 1;
      if (gap <= MERGE_GAP_MAX) {
        // Comparar pitch medio
        const prevMidi = prev.frames.filter(Boolean);
        const currMidi = seg.frames.filter(Boolean);
        if (prevMidi.length > 0 && currMidi.length > 0) {
          const prevMean = prevMidi.reduce((s, v) => s + v, 0) / prevMidi.length;
          const currMean = currMidi.reduce((s, v) => s + v, 0) / currMidi.length;
          const diffCents = Math.abs((prevMean - currMean) * 100);
          if (diffCents < PITCH_MERGE_MAX) {
            // Fusionar: rellenar el gap con nulls
            const gap_nulls = new Array(gap).fill(null);
            prev.frames = [...prev.frames, ...gap_nulls, ...seg.frames];
            prev.end = seg.end;
            continue;
          }
        }
      }
      merged.push({ ...seg });
    }

    // ── Paso 3: detectar desplazamiento global ───────────────────────────────
    let globalShift = 0;   // en frames
    const firstOnset = merged.length > 0 ? merged[0].start : -1;
    if (firstOnset > pulse1 + Math.round(0.2 / 0.02)) {
      // El primer sonido llega más de 200ms tarde → todo está corrido
      globalShift = firstOnset - pulse1;
    }

    const p1 = pulse1 + globalShift;
    const p2 = pulse2 + globalShift;
    const p3 = Math.min(pulse3 + globalShift, allFrames.length);

    // ── Paso 4: mapear segmentos a las 2 notas ───────────────────────────────
    if (merged.length >= 2) {
      const centerOf = (seg) => (seg.start + seg.end) / 2;
      let seg1 = null;
      let seg2 = null;

      const cands1 = merged.filter((s) => centerOf(s) < p2);
      const cands2 = merged.filter((s) => centerOf(s) >= p2 - noteDurFrames * 0.3);

      if (cands1.length > 0 && cands2.length > 0) {
        seg1 = cands1[0];
        seg2 = cands2.find((s) => s !== seg1) || (cands1.length >= 2 ? cands1[1] : null);
      }
      if (!seg1 || !seg2 || seg1 === seg2) {
        seg1 = merged[0];
        seg2 = merged[1];
      }

      const frames1 = this._framesForNote(seg1.frames, noteDurFrames, MIN_VOICED_PCT);
      const frames2 = this._framesForNote(seg2.frames, noteDurFrames, MIN_VOICED_PCT);
      return {
        frames: [frames1, frames2], dbg: {
          strategy: 'segmentos múltiples',
          rawSegments: segments.length,
          mergedSegments: merged.map(s => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
          globalShift, note1: { start: seg1.start, end: seg1.end }, note2: { start: seg2.start, end: seg2.end },
        }
      };
    }

    if (merged.length === 1) {
      const seg = merged[0];
      const midZone = seg.frames.slice(
        Math.floor(seg.frames.length * 0.3),
        Math.floor(seg.frames.length * 0.7)
      );
      let splitAt = -1;
      let splitReason = 'segmento único dividido por pitch';
      for (let i = 1; i < midZone.length; i++) {
        if (midZone[i] !== null && midZone[i - 1] !== null) {
          const diffCents = Math.abs((midZone[i] - midZone[i - 1]) * 100);
          if (diffCents > PITCH_BREAK_MIN) { splitAt = Math.floor(seg.frames.length * 0.3) + i; break; }
        }
      }
      // Si es unísono (sin salto de pitch > 150c) pero el segmento abarca ambas negras, dividir en p2 o a la mitad
      if (splitAt <= 0 && seg.frames.length >= Math.round(noteDurFrames * 1.15)) {
        if (p2 > seg.start + 4 && p2 < seg.end - 4) {
          splitAt = p2 - seg.start;
        } else {
          splitAt = Math.floor(seg.frames.length / 2);
        }
        splitReason = 'segmento único dividido por duración (unísono/legato)';
      }
      if (splitAt > 0) {
        const f1 = this._framesForNote(seg.frames.slice(0, splitAt), noteDurFrames, MIN_VOICED_PCT);
        const f2 = this._framesForNote(seg.frames.slice(splitAt), noteDurFrames, MIN_VOICED_PCT);
        return {
          frames: [f1, f2], dbg: {
            strategy: splitReason,
            rawSegments: segments.length, mergedSegments: merged.map(s => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
            globalShift, splitAt,
            note1: { start: seg.start, end: seg.start + splitAt - 1 },
            note2: { start: seg.start + splitAt, end: seg.end },
          }
        };
      }
    }

    // ── Paso 5: fallback estricto con desplazamiento ajustado ─────────────────
    const f1 = this._framesForNote(allFrames.slice(p1, p2), noteDurFrames, MIN_VOICED_PCT);
    const f2 = this._framesForNote(allFrames.slice(p2, p3), noteDurFrames, MIN_VOICED_PCT);
    return {
      frames: [f1, f2], dbg: {
        strategy: 'fallback estricto por tiempo',
        rawSegments: segments.length, mergedSegments: merged.map(s => ({ start: s.start, end: s.end, voiced: s.frames.filter(Boolean).length })),
        globalShift, p1, p2, p3,
        note1: { start: p1, end: p2 - 1 },
        note2: { start: p2, end: p3 - 1 },
      }
    };
  }

  /**
   * Dado un array de frames y la duración esperada, retorna los frames si hay
   * suficiente contenido (≥ MIN_VOICED_PCT), o un array vacío (nota no cantada).
   */
  _framesForNote(frames, noteDurFrames, minPct) {
    const voiced = frames.filter((f) => f !== null).length;
    if (voiced < noteDurFrames * minPct) return [];   // nota no cantada → grade malo
    return frames;
  }

  /**
   * Extrae un array de valores MIDI continuos (o null si silencio) de un segmento PCM.
   * Un frame por cada 20ms de audio.
   */
  extractMidiFrames(segment, sampleRate) {
    const winSize = 2048;
    const hop = Math.round(sampleRate * 0.02);
    const frames = [];
    for (let pos = 0; pos + winSize <= segment.length; pos += hop) {
      let sumSq = 0;
      for (let i = 0; i < winSize; i++) { const s = segment[pos + i]; sumSq += s * s; }
      const rms = Math.sqrt(sumSq / winSize);
      if (rms < 0.01) { frames.push(null); continue; }
      const hz = this.yinPitch(segment, pos, winSize, sampleRate);
      if (hz >= 65 && hz <= 1000) {
        frames.push(69 + 12 * Math.log2(hz / 440));
      } else {
        frames.push(null);
      }
    }
    return frames;
  }

  /**
  * Calcula la mediana con signo de la desviación real en cents,
  * incluida cualquier diferencia de octava.
   */
  getSignedMedianCents(midiFrames, targetMidi) {
    const voiced = midiFrames.filter((m) => m !== null);
    if (voiced.length === 0) return null;
    const signed = voiced.map((m) => this.getSignedCentsDiff(m, targetMidi));
    signed.sort((a, b) => a - b);
    return signed[Math.floor(signed.length / 2)];
  }

  /**
   * Convierte una nota MIDI a paso diatónico en el Gran Pentagrama donde:
   * - step = 0 es Do central (Do4 = MIDI 60, línea adicional entre clave de Fa y clave de Sol)
   * - Clave de Sol (arriba): líneas en steps 2 (Mi4), 4 (Sol4), 6 (Si4), 8 (Re5), 10 (Fa5)
   * - Clave de Fa (abajo): líneas en steps -2 (La3), -4 (Fa3), -6 (Re3), -8 (Si2), -10 (Sol2)
   */
  midiToGrandStaffStep(midi) {
    const diatonicMap = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
    const sharpMap = [false, true, false, true, false, false, true, false, true, false, true, false];
    const rounded = Math.round(midi);
    const octave = Math.floor(rounded / 12) - 1; // Do4 -> 4, Do3 -> 3
    const noteIdx = ((rounded % 12) + 12) % 12;
    const stepFromDo4 = (octave - 4) * 7 + diatonicMap[noteIdx];
    return {
      step: stepFromDo4,
      isSharp: sharpMap[noteIdx],
    };
  }

  /**
   * Dibuja el Gran Pentagrama (Clave de Sol + Clave de Fa) con 2 compases (2 negras + 2 silencios c/u),
   * el indicador de avance del tiempo y la curva de frecuencia de la voz en el 2º compás.
   * @param {number|null} playheadNorm - 0..1 a lo largo de los 2 compases (0..0.5 Compás 1, 0.5..1 Compás 2)
   * @param {Array<{ratio: number, midi: number|null}>} voiceFrames - muestras grabadas en el Compás 2
   * @param {number} [rawBeat] - pulso actual (-2..0 durante los 2 clicks)
   */
  drawGrandStaff(playheadNorm = null, voiceFrames = [], rawBeat = null) {
    if (!this.singStaffCanvas || !this.currentQuestion) return;
    const canvas = this.singStaffCanvas;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;

    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cssW, cssH);

    const midis = this.currentQuestion.midis || [this.currentQuestion.midi1, this.currentQuestion.midi2].filter((m) => m != null);
    const midi1 = midis[0];

    // Geometría vertical del Gran Pentagrama
    // step = 0 (Do4) en el centro entre ambos pentagramas
    const halfSpace = 5.0; // 5px por grado diatónico (10px entre líneas)
    const centerDo4Y = cssH / 2 - 4;
    const stepToY = (step) => centerDo4Y - step * halfSpace;

    const staffLeft = 1;
    const staffRight = cssW - 1;
    const clefsWidth = 34;
    const m1Start = staffLeft + clefsWidth;
    const totalMeasuresW = staffRight - m1Start;
    const barlineX = m1Start + totalMeasuresW / 2;
    const m2Start = barlineX;

    const topStaffTopY = stepToY(10);    // Fa5 (5ª línea Sol)
    const topStaffBotY = stepToY(2);     // Mi4 (1ª línea Sol)
    const botStaffTopY = stepToY(-2);    // La3 (5ª línea Fa)
    const botStaffBotY = stepToY(-10);   // Sol2 (1ª línea Fa)

    // 1. Encabezado de los 2 compases
    ctx.font = '600 10px Inter, sans-serif';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#334155';
    ctx.fillText('Compás 1 (Escucha)', (m1Start + barlineX) / 2, 13);
    ctx.fillStyle = '#334155';
    ctx.fillText('Compás 2 (Canta)', (m2Start + staffRight) / 2, 13);

    // BPM abajo a la izquierda; el símbolo de negra queda deliberadamente destacado.
    const bpmBaseline = cssH - 4;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#111827';
    ctx.font = '18px serif';
    ctx.fillText('♩', staffLeft + 5, bpmBaseline);
    ctx.font = '600 10px Inter, sans-serif';
    ctx.fillText(`= ${this.singBpm} BPM`, staffLeft + 25, bpmBaseline - 2);

    // 2. Líneas del Pentagrama Superior (Clave de Sol: steps 2, 4, 6, 8, 10) en negro
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 1.1;
    for (let s = 2; s <= 10; s += 2) {
      const y = stepToY(s);
      ctx.beginPath();
      ctx.moveTo(staffLeft, y);
      ctx.lineTo(staffRight, y);
      ctx.stroke();
    }

    // 3. Líneas del Pentagrama Inferior (Clave de Fa: steps -2, -4, -6, -8, -10) en negro
    for (let s = -10; s <= -2; s += 2) {
      const y = stepToY(s);
      ctx.beginPath();
      ctx.moveTo(staffLeft, y);
      ctx.lineTo(staffRight, y);
      ctx.stroke();
    }

    // 4. Barras verticales de sistema y división de los 2 compases en negro
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.4;
    // Barra inicial izquierda uniendo Sol y Fa
    ctx.beginPath();
    ctx.moveTo(staffLeft, topStaffTopY);
    ctx.lineTo(staffLeft, botStaffBotY);
    // Línea divisoria entre Compás 1 y Compás 2
    ctx.moveTo(barlineX, topStaffTopY);
    ctx.lineTo(barlineX, botStaffBotY);
    // Doble barra final derecha
    ctx.moveTo(staffRight - 4, topStaffTopY);
    ctx.lineTo(staffRight - 4, botStaffBotY);
    ctx.stroke();

    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(staffRight, topStaffTopY);
    ctx.lineTo(staffRight, botStaffBotY);
    ctx.stroke();

    // 5. Dibujar Clave de Sol (𝄞) arriba y Clave de Fa (𝄢) abajo en negro
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '34px serif';
    ctx.fillText('𝄞', staffLeft + 4, stepToY(5));
    ctx.font = '27px serif';
    ctx.fillText('𝄢', staffLeft + 5, stepToY(-5));

    // 6. Función para dibujar un compás (N negras + silencios de negra restantes hasta completar 4 pulsos)
    const notePositions = midis.map((m) => this.midiToGrandStaffStep(m));

    const drawQuarterNote = (x, pos, color) => {
      const y = stepToY(pos.step);

      // Línea adicional central si es Do4 (step === 0)
      if (pos.step === 0) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
      }

      // Cabeza de negra rellena
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.25);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 6.2, 4.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Plica de la negra (hacia arriba o hacia abajo según altura)
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (pos.step >= 0) {
        ctx.moveTo(x + 5.5, y);
        ctx.lineTo(x + 5.5, y - 24);
      } else {
        ctx.moveTo(x - 5.5, y);
        ctx.lineTo(x - 5.5, y + 24);
      }
      ctx.stroke();

      if (pos.isSharp) {
        ctx.fillStyle = color;
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('♯', x - 8, y);
      }
    };

    const drawQuarterRest = (x, yCenter) => {
      // Silencio de negra en negro
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x - 2, yCenter - 9);
      ctx.lineTo(x + 3, yCenter - 3);
      ctx.lineTo(x - 3, yCenter + 2);
      ctx.lineTo(x + 2, yCenter + 7);
      ctx.arc(x - 1, yCenter + 9, 2.5, -0.3, Math.PI * 0.85, true);
      ctx.stroke();
    };

    // Dibujar los 4 tiempos en Compás 1 y en Compás 2 centrados en 4 columnas iguales por compás
    const restY = midi1 >= 60 ? stepToY(6) : stepToY(-6);

    const getMeasureBeatX = (mStart, mEnd, beatFraction) => {
      const mW = mEnd - mStart;
      // beatFraction: 0.0 -> centro de columna 1 (0.125), 0.25 -> centro de columna 2 (0.375), etc.
      return mStart + (beatFraction + 0.125) * mW;
    };

    // 6b. Barra fija de tiempo que aparece directamente sobre la figura musical o silencio activo
    if (rawBeat !== null && rawBeat >= 0 && rawBeat < 8) {
      const isCompas1 = rawBeat < 4;
      const mStart = isCompas1 ? m1Start : m2Start;
      const mEnd = isCompas1 ? barlineX : staffRight - 4;
      const beatIndex = Math.floor(isCompas1 ? rawBeat : rawBeat - 4); // 0, 1, 2, 3
      const figX = getMeasureBeatX(mStart, mEnd, beatIndex * 0.25);
      const colW = Math.min(26, (mEnd - mStart) / 4 - 4);

      // Franja vertical suave sobre la figura activa + barra superior e inferior fija
      ctx.fillStyle = isCompas1 ? 'rgba(2, 132, 199, 0.16)' : 'rgba(245, 158, 11, 0.20)';
      ctx.fillRect(figX - colW / 2, topStaffTopY - 6, colW, botStaffBotY - topStaffTopY + 12);

      ctx.fillStyle = isCompas1 ? '#0284c7' : '#d97706';
      ctx.fillRect(figX - colW / 2, topStaffTopY - 8, colW, 4);
      ctx.fillRect(figX - colW / 2, botStaffBotY + 4, colW, 4);
    }

    const drawMeasureContents = (mStart, mEnd, noteColor) => {
      for (let bIdx = 0; bIdx < 4; bIdx++) {
        const bX = getMeasureBeatX(mStart, mEnd, bIdx * 0.25);
        if (bIdx < notePositions.length) {
          drawQuarterNote(bX, notePositions[bIdx], noteColor);
        } else {
          drawQuarterRest(bX, restY);
        }
      }
    };

    drawMeasureContents(m1Start, barlineX, '#000000');
    drawMeasureContents(m2Start, staffRight - 4, '#000000');

    // 7. Graficar la línea de frecuencia de la voz sobre el Compás 2 una vez terminada la grabación
    if (Array.isArray(voiceFrames) && voiceFrames.length > 0) {
      const m2W = staffRight - 4 - m2Start;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      let prevPt = null;
      voiceFrames.forEach((f) => {
        if (f.midi === null) {
          prevPt = null;
          return;
        }
        const beatSlot = Math.min(midis.length - 1, Math.max(0, Math.floor(f.ratio * 4)));
        const targetMidi = midis[beatSlot];
        const targetPos = notePositions[beatSlot];
        const targetY = stepToY(targetPos.step);

        // La posición se limita al pentagrama, pero la afinación conserva la octava real.
        const signedSemitones = f.midi - targetMidi;
        const clamped = Math.max(-4, Math.min(4, signedSemitones));

        const x = m2Start + f.ratio * m2W;
        const y = targetY - clamped * halfSpace;

        const absS = Math.abs(signedSemitones);
        const strokeColor =
          absS <= 0.40 ? '#10b981' :   // admirable/bueno/aceptable (≤40c)
            absS <= 0.80 ? '#f59e0b' :   // casi (41-80c)
              '#ef4444';    // malo (>80c)

        if (prevPt) {
          ctx.strokeStyle = strokeColor;
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          ctx.fillStyle = strokeColor;
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        prevPt = { x, y };
      });
    }

    // 8. Íconos de evaluación debajo de cada nota cantada en el Compás 2 (5 niveles)
    if (Array.isArray(this.lastNoteGrades) && this.lastNoteGrades.length >= 1) {
      const m2End = staffRight - 4;
      const noteXPositions = this.lastNoteGrades.map((_, idx) =>
        getMeasureBeatX(m2Start, m2End, idx * 0.25)
      );
      const iconY = botStaffBotY + 15;

      const gradeStyles = {
        admirable: { bg: '#059669', border: '#34d399' },
        bueno: { bg: '#10b981', border: null },
        aceptable: { bg: '#22c55e', border: null },
        casi: { bg: '#f59e0b', border: null },
        malo: { bg: '#ef4444', border: null },
      };

      const drawGradeIcon = (grade, x, y, radius) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = Math.max(1.5, radius * 0.18);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (grade === 'admirable') {
          ctx.beginPath();
          ctx.moveTo(0, -radius);
          ctx.lineTo(radius * 0.2, -radius * 0.2);
          ctx.lineTo(radius, 0);
          ctx.lineTo(radius * 0.2, radius * 0.2);
          ctx.lineTo(0, radius);
          ctx.lineTo(-radius * 0.2, radius * 0.2);
          ctx.lineTo(-radius, 0);
          ctx.lineTo(-radius * 0.2, -radius * 0.2);
          ctx.closePath();
          ctx.stroke();
        } else if (grade === 'bueno') {
          ctx.beginPath();
          ctx.moveTo(-radius * 0.65, 0);
          ctx.lineTo(-radius * 0.18, radius * 0.48);
          ctx.lineTo(radius * 0.68, -radius * 0.52);
          ctx.stroke();
        } else if (grade === 'aceptable') {
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.62, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.16, 0, Math.PI * 2);
          ctx.fill();
        } else if (grade === 'casi') {
          [-radius * 0.22, radius * 0.22].forEach((offset) => {
            ctx.beginPath();
            ctx.moveTo(-radius * 0.68, offset);
            ctx.quadraticCurveTo(-radius * 0.34, offset - radius * 0.28, 0, offset);
            ctx.quadraticCurveTo(radius * 0.34, offset + radius * 0.28, radius * 0.68, offset);
            ctx.stroke();
          });
        } else {
          ctx.beginPath();
          ctx.moveTo(-radius * 0.48, -radius * 0.48);
          ctx.lineTo(radius * 0.48, radius * 0.48);
          ctx.moveTo(radius * 0.48, -radius * 0.48);
          ctx.lineTo(-radius * 0.48, radius * 0.48);
          ctx.stroke();
        }

        ctx.restore();
      };

      this.lastNoteGrades.forEach((grade, idx) => {
        const style = gradeStyles[grade] || gradeStyles.malo;
        const x = noteXPositions[idx];

        // Borde extra para Admirable
        if (style.border) {
          ctx.strokeStyle = style.border;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, iconY, 11, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = style.bg;
        ctx.beginPath();
        ctx.arc(x, iconY, 9, 0, Math.PI * 2);
        ctx.fill();

        drawGradeIcon(gradeStyles[grade] ? grade : 'malo', x, iconY, 6.5);
      });

      // Ícono del ejercicio completo (nivel más bajo) en el punto entre ambos compases (barlineX)
      const exerciseGrade = this.lastNoteGrades.reduce(
        (worst, g) => this.worstGrade(worst, g),
        this.lastNoteGrades[0] || 'malo'
      );
      const style = gradeStyles[exerciseGrade] || gradeStyles.malo;
      const exX = barlineX;
      const exY = (topStaffTopY + botStaffBotY) / 2;

      if (style.border) {
        ctx.strokeStyle = style.border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(exX, exY, 13, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = style.bg;
      ctx.beginPath();
      ctx.arc(exX, exY, 11, 0, Math.PI * 2);
      ctx.fill();

      drawGradeIcon(gradeStyles[exerciseGrade] ? exerciseGrade : 'malo', exX, exY, 8);
    }
  }

  /**
  * Extrae la curva temporal de alturas MIDI incluyendo los 0.2s previos al Compás 2 (ratio < 0)
   * y los 4 pulsos del Compás 2 (ratio 0..1).
   */
  extractVoiceFrames(pcm, sampleRate, preRollSec = 0.2, m2DurationSec = 3.0) {
    const winSize = 2048;
    const hop = Math.round(sampleRate * 0.025);
    const frames = [];

    for (let pos = 0; pos + winSize <= pcm.length; pos += hop) {
      const tSec = pos / sampleRate;
      const ratio = (tSec - preRollSec) / Math.max(0.1, m2DurationSec);
      let sumSq = 0;
      for (let i = 0; i < winSize; i++) {
        const s = pcm[pos + i];
        sumSq += s * s;
      }
      const rms = Math.sqrt(sumSq / winSize);
      if (rms < 0.01) {
        frames.push({ ratio, midi: null });
        continue;
      }
      const hz = this.yinPitch(pcm, pos, winSize, sampleRate);
      if (hz >= 65 && hz <= 1000) {
        const midi = 69 + 12 * Math.log2(hz / 440);
        frames.push({ ratio, midi });
      } else {
        frames.push({ ratio, midi: null });
      }
    }
    return frames;
  }

  detectDominantMidi(segment, sampleRate) {
    const winSize = 2048;
    const hop = Math.round(sampleRate * 0.02);
    const midis = [];

    for (let pos = 0; pos + winSize <= segment.length; pos += hop) {
      let sumSq = 0;
      for (let i = 0; i < winSize; i++) {
        const s = segment[pos + i];
        sumSq += s * s;
      }
      const rms = Math.sqrt(sumSq / winSize);
      if (rms < 0.01) continue;

      const hz = this.yinPitch(segment, pos, winSize, sampleRate);
      if (hz >= 65 && hz <= 1000) {
        const m = 69 + 12 * Math.log2(hz / 440);
        midis.push(m);
      }
    }

    if (midis.length < 2) return null;
    midis.sort((a, b) => a - b);
    return midis[Math.floor(midis.length / 2)];
  }

  yinPitch(buf, start, winSize, sampleRate) {
    const half = winSize >> 1;
    const tauMin = Math.max(2, Math.floor(sampleRate / 1000));
    const tauMax = Math.min(half - 1, Math.floor(sampleRate / 65));
    const yin = new Float32Array(tauMax + 1);
    yin[0] = 1;
    let runningSum = 0;

    for (let tau = 1; tau <= tauMax; tau++) {
      let diff = 0;
      for (let i = 0; i < half; i++) {
        const d = buf[start + i] - buf[start + i + tau];
        diff += d * d;
      }
      runningSum += diff;
      yin[tau] = runningSum > 0 ? (diff * tau) / runningSum : 1;
    }

    let tauEst = -1;
    for (let tau = tauMin; tau <= tauMax; tau++) {
      if (yin[tau] < 0.18) {
        while (tau + 1 <= tauMax && yin[tau + 1] < yin[tau]) tau++;
        tauEst = tau;
        break;
      }
    }
    if (tauEst === -1) return 0;
    return sampleRate / tauEst;
  }

  getSignedCentsDiff(detectedMidi, targetMidi) {
    if (detectedMidi === null) return null;
    return Math.round((detectedMidi - targetMidi) * 100);
  }

  /**
   * Clasifica frame a frame la desviación en cents en 3 zonas:
   * - 'good':   |cents| ≤ 40
   * - 'almost': 41–80 cents
   * - 'bad':    > 80 cents
   */
  classifyFrameCents(absCents) {
    if (absCents <= 40) return 'good';
    if (absCents <= 80) return 'almost';
    return 'bad';
  }

  /**
   * Shared vocal analysis. `buildNoteAnalysis` computes the tonal median first,
   * then passes the same center-relative, time-preserving frames to vibrato,
   * irregularity, and glissando detection for Modules 2 and 4.
   */
  medianValue(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }

  analyzeVoiceShape(midiFrames, targetMidi, centerMidi = null) {
    const MIN_FRAMES = 18;
    const MIN_PEAK_TO_PEAK_CENTS = 50;
    const MIN_PEAK_PROMINENCE_CENTS = 20;
    const MIN_VIBRATO_HZ = 4;
    const MAX_VIBRATO_HZ = 8;
    const MAX_PERIOD_CV = 0.35;
    const HOP_SEC = 0.02;
    const voiced = midiFrames
      .map((midi, frameIdx) => midi === null ? null : { midi, frameIdx })
      .filter(Boolean);
    const detectedCenterMidi = centerMidi ?? this.medianValue(voiced.map((frame) => frame.midi));
    const centeredCents = midiFrames.map((midi) =>
      midi === null || detectedCenterMidi === null ? null : Math.round((midi - detectedCenterMidi) * 100)
    );

    if (voiced.length < MIN_FRAMES) {
      return {
        type: 'sin-analisis',
        vibratoHz: null,
        glissando: false,
        glissandoDebug: { detected: false, reason: 'menos de 18 frames con voz' },
        peaks: [],
        centeredCents,
        sd: null,
        cv: null,
        freqHz: null,
        periodsFrames: [],
        cycles: 0,
        sampleCount: voiced.length,
      };
    }

    const voicedCents = centeredCents.filter((cents) => cents !== null);
    const mean = voicedCents.reduce((sum, cents) => sum + cents, 0) / voicedCents.length;
    const sd = Math.sqrt(voicedCents.reduce((sum, cents) => sum + (cents - mean) ** 2, 0) / voicedCents.length);
    const smoothedCents = centeredCents.map((cents, frameIdx) => {
      if (cents === null) return null;
      const local = [frameIdx - 1, frameIdx, frameIdx + 1]
        .filter((idx) => idx >= 0 && idx < centeredCents.length && centeredCents[idx] !== null)
        .map((idx) => centeredCents[idx]);
      return this.medianValue(local);
    });

    const segments = [];
    let segment = [];
    centeredCents.forEach((cents, frameIdx) => {
      if (cents === null) {
        if (segment.length) segments.push(segment);
        segment = [];
      } else {
        segment.push({ frameIdx, cents });
      }
    });
    if (segment.length) segments.push(segment);

    const rawPeaks = [];
    segments.forEach((frames, segmentIdx) => {
      for (let i = 1; i < frames.length - 1; i++) {
        const previous = frames[i - 1].cents;
        const current = frames[i].cents;
        const next = frames[i + 1].cents;
        const isMax = current >= previous && current >= next && (current > previous || current > next);
        const isMin = current <= previous && current <= next && (current < previous || current < next);
        if (!isMax && !isMin) continue;

        const window = frames.slice(Math.max(0, i - 2), Math.min(frames.length, i + 3));
        const localMin = Math.min(...window.map((frame) => frame.cents));
        const localMax = Math.max(...window.map((frame) => frame.cents));
        const prominence = isMax ? current - localMin : localMax - current;
        if (prominence < MIN_PEAK_PROMINENCE_CENTS && Math.abs(current) < MIN_PEAK_PROMINENCE_CENTS) continue;
        rawPeaks.push({
          frameIdx: frames[i].frameIdx,
          cents: Math.round(current),
          type: isMax ? 'max' : 'min',
          segmentIdx,
        });
      }
    });

    const peaks = [];
    rawPeaks.forEach((peak) => {
      const previous = peaks[peaks.length - 1];
      if (previous && previous.segmentIdx === peak.segmentIdx && previous.type === peak.type) {
        const moreExtreme = peak.type === 'max' ? peak.cents > previous.cents : peak.cents < previous.cents;
        if (moreExtreme) peaks[peaks.length - 1] = peak;
      } else {
        peaks.push(peak);
      }
    });

    const alternatingRuns = [];
    let run = [];
    peaks.forEach((peak) => {
      const previous = run[run.length - 1];
      if (!previous || previous.segmentIdx !== peak.segmentIdx) {
        if (run.length) alternatingRuns.push(run);
        run = [peak];
        return;
      }
      if (previous.type === peak.type) {
        run = [peak];
        return;
      }
      if (Math.abs(peak.cents - previous.cents) < MIN_PEAK_TO_PEAK_CENTS) {
        if (run.length) alternatingRuns.push(run);
        run = [peak];
        return;
      }
      run.push(peak);
    });
    if (run.length) alternatingRuns.push(run);

    const cycleCandidates = [];
    alternatingRuns.forEach((peakRun) => {
      if (peakRun.length < 7) return;
      const periodsFrames = [];
      for (let i = 0; i + 2 < peakRun.length; i += 2) {
        periodsFrames.push(peakRun[i + 2].frameIdx - peakRun[i].frameIdx);
      }
      if (periodsFrames.length < 3) return;

      const meanPeriodFrames = periodsFrames.reduce((sum, period) => sum + period, 0) / periodsFrames.length;
      const periodSd = Math.sqrt(periodsFrames.reduce((sum, period) => sum + (period - meanPeriodFrames) ** 2, 0) / periodsFrames.length);
      const cv = meanPeriodFrames > 0 ? periodSd / meanPeriodFrames : Infinity;
      const frequencyHz = meanPeriodFrames > 0 ? 1 / (meanPeriodFrames * HOP_SEC) : 0;
      if (frequencyHz >= MIN_VIBRATO_HZ && frequencyHz <= MAX_VIBRATO_HZ && cv <= MAX_PERIOD_CV) {
        cycleCandidates.push({ peakRun, periodsFrames, cv, frequencyHz });
      }
    });

    cycleCandidates.sort((a, b) => b.periodsFrames.length - a.periodsFrames.length || a.cv - b.cv);
    const vibratoCandidate = cycleCandidates[0] || null;
    const glissandoDebug = this._detectGlissando(midiFrames, detectedCenterMidi, smoothedCents);
    const isVibrato = Boolean(vibratoCandidate);
    const hasOscillation = peaks.length >= 2 && sd >= MIN_PEAK_PROMINENCE_CENTS;

    return {
      type: isVibrato ? 'vibrato' : hasOscillation ? 'inestable' : 'plana',
      vibratoHz: vibratoCandidate ? Math.round(vibratoCandidate.frequencyHz * 10) / 10 : null,
      glissando: glissandoDebug.detected,
      glissandoDebug,
      peaks: peaks.map(({ frameIdx, cents, type }) => ({ frameIdx, cents, type })),
      centeredCents,
      smoothedCents,
      centerMidi: detectedCenterMidi,
      sd: Math.round(sd),
      cv: vibratoCandidate ? Math.round(vibratoCandidate.cv * 100) / 100 : null,
      freqHz: vibratoCandidate ? Math.round(vibratoCandidate.frequencyHz * 10) / 10 : null,
      periodsFrames: vibratoCandidate?.periodsFrames || [],
      cycles: vibratoCandidate?.periodsFrames.length || 0,
      vibratoPeaks: vibratoCandidate?.peakRun || [],
      sampleCount: voiced.length,
    };
  }

  _detectGlissando(midiFrames, centerMidi, smoothedCents = null) {
    const MIN_VOICED_FRAMES = 20;
    const START_DISTANCE_CENTS = 60;
    const CENTER_TOLERANCE_CENTS = 30;
    const SETTLE_FRAMES = 9;
    const MAX_LOCAL_REVERSAL_CENTS = 15;
    const MIN_PROGRESS_RATIO = 0.65;
    const voicedCount = midiFrames.filter((midi) => midi !== null).length;
    const fail = (reason, extra = {}) => ({ detected: false, reason, voicedCount, ...extra });

    if (voicedCount < MIN_VOICED_FRAMES || centerMidi === null) {
      return fail('menos de 20 frames con voz');
    }

    const centered = smoothedCents || midiFrames.map((midi) =>
      midi === null ? null : Math.round((midi - centerMidi) * 100)
    );
    let lastVoiceFrame = centered.length - 1;
    while (lastVoiceFrame >= 0 && centered[lastVoiceFrame] === null) lastVoiceFrame--;
    if (lastVoiceFrame < SETTLE_FRAMES - 1) return fail('no hay tramo final suficiente');

    let stableStart = lastVoiceFrame;
    while (stableStart >= 0 && centered[stableStart] !== null && Math.abs(centered[stableStart]) <= CENTER_TOLERANCE_CENTS) {
      stableStart--;
    }
    const stableFrames = lastVoiceFrame - stableStart;
    stableStart++;
    if (stableFrames < SETTLE_FRAMES) return fail('no se estabiliza al final', { stableFrames });

    let startFrame = 0;
    while (startFrame < centered.length && centered[startFrame] === null) startFrame++;
    const startDistance = Math.abs(centered[startFrame] ?? 0);
    if (startDistance < START_DISTANCE_CENTS) {
      return fail('el comienzo no está suficientemente alejado', { startDistance, stableFrames });
    }
    if (stableStart - startFrame < 3) return fail('trayectoria demasiado corta', { startDistance, stableFrames });

    let progressSteps = 0;
    let totalSteps = 0;
    for (let i = startFrame + 1; i <= stableStart; i++) {
      if (centered[i] === null || centered[i - 1] === null) return fail('silencio interrumpe la trayectoria');
      const previousDistance = Math.abs(centered[i - 1]);
      const currentDistance = Math.abs(centered[i]);
      if (currentDistance <= previousDistance + MAX_LOCAL_REVERSAL_CENTS) progressSteps++;
      totalSteps++;
    }
    const progressRatio = totalSteps ? progressSteps / totalSteps : 0;
    const netProgress = startDistance - Math.abs(centered[stableStart]);
    const detected = netProgress >= START_DISTANCE_CENTS - CENTER_TOLERANCE_CENTS && progressRatio >= MIN_PROGRESS_RATIO;
    return {
      detected,
      reason: detected ? 'trayectoria hacia el centro y asentamiento final' : 'trayectoria no converge lo suficiente',
      voicedCount,
      startFrame,
      stableStart,
      stableFrames,
      startDistance: Math.round(startDistance),
      endDistance: Math.round(Math.abs(centered[stableStart] ?? 0)),
      netProgress: Math.round(netProgress),
      progressRatio: Math.round(progressRatio * 100) / 100,
      smoothedCents: centered,
    };
  }

  /**
   * Etapa 2 — Centro tonal y guía de afinación.
   *
   * Si tipo = vibrato o inestable → usa mediana (la oscilación no distorsiona el centro)
   * Sobre la mediana:
    *   - Si NO es vibrato Y highPct ≥ 30% Y lowPct ≥ 30% → "Muy irregular"
   *   - Si NO es vibrato Y highPct ≥ 30%                 → "Muy alto"
   *   - Si NO es vibrato Y lowPct  ≥ 30%                 → "Muy bajo"
   *   - Ninguno                                          → label normal de mediana
   *
   * @returns {{ label: string, isHighLow: boolean }}
   */
  analyzeTonalCenter(midiFrames, targetMidi, voiceShape, centerMidi = null) {
    const voiced = midiFrames.filter((m) => m !== null);
    if (voiced.length === 0) return { label: 'Silencio', sungNote: null, isHighLow: false };

    const medianMidi = centerMidi ?? this.medianValue(voiced);
    const sungNote = this.midiToNoteNameEs(Math.round(medianMidi));

    const signedList = voiced.map((m) => this.getSignedCentsDiff(m, targetMidi));

    const sorted = [...signedList].sort((a, b) => a - b);
    const medianSigned = sorted[Math.floor(sorted.length / 2)];
    const baseLabel = this.formatTonalCenterLabel(Math.abs(medianSigned), medianSigned);

    // “Muy irregular” describe una distribución a ambos lados del centro tonal.
    if (voiceShape?.type !== 'vibrato' && voiceShape?.type !== 'sin-analisis') {
      const centeredCents = voiced.map((midi) => Math.round((midi - medianMidi) * 100));
      const total = centeredCents.length;
      const highPct = centeredCents.filter((cents) => cents > 50).length / total;
      const lowPct = centeredCents.filter((cents) => cents < -50).length / total;

      if (highPct >= 0.30 && lowPct >= 0.30) {
        return { label: 'Muy irregular', sungNote: null, isHighLow: true, medianSigned };
      }
    }

    return { label: baseLabel, sungNote, isHighLow: false, medianSigned, medianMidi };
  }

  /**
   * Etapa 3 — Orquestador: llama a analyzeVoiceShape + analyzeTonalCenter
   * y devuelve el objeto completo para el feedback.
   *
   * @returns {{
   *   voiceType:  'plana'|'vibrato'|'inestable',
   *   vibratoHz:  number|null,
   *   glissando:  boolean,
   *   label:      string,
   *   sungNote:   string|null,
   *   isHighLow:  boolean
   * }}
   */
  buildNoteAnalysis(midiFrames, targetMidi) {
    const voiced = midiFrames.filter((midi) => midi !== null);
    const centerMidi = this.medianValue(voiced);
    const voiceShape = this.analyzeVoiceShape(midiFrames, targetMidi, centerMidi);
    const tonal = this.analyzeTonalCenter(midiFrames, targetMidi, voiceShape, centerMidi);
    const frameCentsTarget = midiFrames.map((midi) => midi === null ? null : this.getSignedCentsDiff(midi, targetMidi));
    const rectification = voiceShape.type === 'vibrato'
      ? this.rectifyVibratoCents(frameCentsTarget, voiceShape.vibratoPeaks)
      : { values: [...frameCentsTarget], correctedFrames: 0 };
    return {
      voiceType: voiceShape.type,
      vibratoHz: voiceShape.vibratoHz,
      glissando: voiceShape.glissando,
      glissandoDebug: voiceShape.glissandoDebug,
      peaks: voiceShape.peaks || [],
      periodsFrames: voiceShape.periodsFrames || [],
      cycles: voiceShape.cycles || 0,
      sampleCount: voiceShape.sampleCount || 0,
      frameCentsTarget,
      rectifiedCentsTarget: rectification.values,
      rectifiedFrameCount: rectification.correctedFrames,
      centeredCents: voiceShape.centeredCents || [],
      smoothedCents: voiceShape.smoothedCents || [],
      centerMidi,
      medianSigned: tonal.medianSigned ?? null,
      sd: voiceShape.sd,
      cv: voiceShape.cv,
      freqHz: voiceShape.freqHz,
      label: tonal.label,
      sungNote: tonal.sungNote,
      isHighLow: tonal.isHighLow,
    };
  }

  rectifyVibratoCents(frameCents, peaks) {
    const corrected = [...frameCents];
    const contributions = new Array(frameCents.length).fill(0);
    const counts = new Array(frameCents.length).fill(0);
    let correctedFrames = 0;
    const interpolate = (start, end, phase) => {
      const position = start + (end - start) * phase;
      const left = Math.floor(position);
      const right = Math.ceil(position);
      const leftValue = frameCents[left];
      const rightValue = frameCents[right];
      if (leftValue === null || rightValue === null || leftValue === undefined || rightValue === undefined) return null;
      return left === right ? leftValue : leftValue + (rightValue - leftValue) * (position - left);
    };

    for (let peakIdx = 0; peakIdx + 2 < peaks.length; peakIdx += 2) {
      const first = peaks[peakIdx];
      const middle = peaks[peakIdx + 1];
      const last = peaks[peakIdx + 2];
      if (first.segmentIdx !== middle.segmentIdx || middle.segmentIdx !== last.segmentIdx) continue;
      if (first.type !== last.type || first.type === middle.type) continue;
      const firstHalfFrames = middle.frameIdx - first.frameIdx;
      const secondHalfFrames = last.frameIdx - middle.frameIdx;
      if (firstHalfFrames < 1 || secondHalfFrames < 1) continue;

      const phaseSteps = Math.max(firstHalfFrames, secondHalfFrames);
      const phaseValues = [];
      let validCycle = true;
      for (let step = 0; step <= phaseSteps; step++) {
        const phase = step / phaseSteps;
        const firstValue = interpolate(first.frameIdx, middle.frameIdx, phase);
        const secondValue = interpolate(middle.frameIdx, last.frameIdx, phase);
        if (firstValue === null || secondValue === null) {
          validCycle = false;
          break;
        }
        phaseValues.push((firstValue + secondValue) / 2);
      }
      if (!validCycle) continue;

      for (let frameIdx = first.frameIdx; frameIdx <= middle.frameIdx; frameIdx++) {
        const phase = (frameIdx - first.frameIdx) / firstHalfFrames;
        const phasePosition = phase * phaseSteps;
        const left = Math.floor(phasePosition);
        const right = Math.ceil(phasePosition);
        const value = left === right ? phaseValues[left] : phaseValues[left] + (phaseValues[right] - phaseValues[left]) * (phasePosition - left);
        contributions[frameIdx] += value;
        counts[frameIdx]++;
      }
      for (let frameIdx = middle.frameIdx; frameIdx <= last.frameIdx; frameIdx++) {
        const phase = (frameIdx - middle.frameIdx) / secondHalfFrames;
        const phasePosition = phase * phaseSteps;
        const left = Math.floor(phasePosition);
        const right = Math.ceil(phasePosition);
        const value = left === right ? phaseValues[left] : phaseValues[left] + (phaseValues[right] - phaseValues[left]) * (phasePosition - left);
        contributions[frameIdx] += value;
        counts[frameIdx]++;
      }
    }

    counts.forEach((count, frameIdx) => {
      if (count > 0) {
        corrected[frameIdx] = Math.round(contributions[frameIdx] / count);
        correctedFrames++;
      }
    });
    return { values: corrected, correctedFrames };
  }

  /**
   * Etiqueta legible del centro tonal para mostrar al usuario.
   * Ej: (+30c) Leve alto  |  (-8c) Casi centrado  |  (0c) Centrado
   */

  /**
   * Clasifica una nota cantada en 5 niveles basándose en distribución de frames:
   *
   * Regla 1 — FALLIDO (malo): ≥ 20% de frames con |cents| > 80
   * Regla 2 — ADMIRABLE:      ≥ 85% de frames con |cents| ≤ 15  Y  mediana ≤ 10c
   * Regla 3 — BUENO:          ≥ 85% de frames con |cents| ≤ 40  Y  mediana ≤ 20c
   * Regla 4 — ACEPTABLE:      ≥ 85% de frames con |cents| ≤ 40
   * Regla 5 — REGULAR (casi): el resto
   *
   * El ejercicio completo toma el nivel más bajo de todas sus notas.
   *
   * Levels: 'admirable' | 'bueno' | 'aceptable' | 'casi' | 'malo'
   */
  getNoteGradeFromFrames(midiFrames, targetMidi) {
    // Separar frames con pitch
    const voiced = midiFrames.filter((m) => m !== null);
    if (voiced.length < 2) return { grade: 'malo', medianCents: null, vibrato: { detected: false, freqHz: null } };

    const noteAnalysis = this.buildNoteAnalysis(midiFrames, targetMidi);
    const rawSignedCents = midiFrames.map((midi) => midi === null ? null : this.getSignedCentsDiff(midi, targetMidi));
    const rectified = this.rectifyVibratoEnabled && noteAnalysis.voiceType === 'vibrato' && noteAnalysis.rectifiedFrameCount > 0;
    const signedCentsUsed = rectified ? noteAnalysis.rectifiedCentsTarget : rawSignedCents;
    const centsList = signedCentsUsed.filter((cents) => cents !== null).map(Math.abs);

    // Los buckets y la calificación usan la curva rectificada solo si se activó la opción.
    const rawCentsList = voiced.map((m) => Math.abs(this.getSignedCentsDiff(m, targetMidi)));

    const total = centsList.length;

    // Mediana de la desviación absoluta (centro tonal)
    const sorted = [...centsList].sort((a, b) => a - b);
    const medianCents = sorted[Math.floor(sorted.length / 2)];

    // Distribución por zona
    const badCount = centsList.filter((c) => c > 80).length;
    const goodCount = centsList.filter((c) => c <= 40).length;
    const tightCount = centsList.filter((c) => c <= 15).length;

    const badPct = badCount / total;
    const goodPct = goodCount / total;
    const tightPct = tightCount / total;

    // Compatibilidad: exponer campo vibrato con la forma antigua para que el resto del código funcione
    const vibrato = noteAnalysis.voiceType === 'vibrato'
      ? { detected: true, freqHz: noteAnalysis.vibratoHz }
      : { detected: false, freqHz: null };

    // Aplicar reglas en orden de prioridad
    let grade;
    if (badPct >= 0.20) {
      grade = 'malo';
    } else if (tightPct >= 0.85 && medianCents <= 10) {
      grade = 'admirable';
    } else if (goodPct >= 0.85 && medianCents <= 20) {
      grade = 'bueno';
    } else if (goodPct >= 0.85) {
      grade = 'aceptable';
    } else {
      grade = 'casi';
    }

    return {
      grade,
      medianCents,
      vibrato,
      rectified,
      centsList,
      rawMedianCents: this.medianValue(rawCentsList),
      rectifiedFrameCount: rectified ? noteAnalysis.rectifiedFrameCount : 0,
      _dbg: { total, badPct, goodPct, tightPct },
    };
  }

  /**
   * Etiqueta legible del centro tonal para mostrar al usuario.
   * Ej: (+30c) Alto  |  (-8c) Casi centrado  |  (0c) Centrado
   */
  formatTonalCenterLabel(medianCents, signedMedianCents) {
    if (medianCents === null) return 'Silencio';
    const direction = signedMedianCents >= 0 ? 'alto' : 'bajo';
    const abs = Math.abs(signedMedianCents);
    if (abs > 200) return `Muy ${direction}`;

    let level;
    if (abs <= 5) level = 'Centrado';
    else if (abs <= 15) level = 'Casi centrado';
    else if (abs <= 30) level = `Leve ${direction}`;
    else if (abs <= 50) level = direction.charAt(0).toUpperCase() + direction.slice(1);
    else level = `Muy ${direction}`;

    return `(${signedMedianCents >= 0 ? '+' : ''}${signedMedianCents}c) ${level}`;
  }

  /**
   * Retorna el nivel más bajo (más severo) entre dos grades de nota.
   * Orden de severidad: malo < casi < aceptable < bueno < admirable
   */
  worstGrade(gradeA, gradeB) {
    const rank = { malo: 0, casi: 1, aceptable: 2, bueno: 3, admirable: 4 };
    return rank[gradeA] <= rank[gradeB] ? gradeA : gradeB;
  }

  /**
   * @deprecated Mantener compatibilidad con flujo legado de detección por mediana.
   * Usar getNoteGradeFromFrames() para evaluación completa.
   */
  getNoteGrade(detectedMidi, targetMidi) {
    if (detectedMidi === null) return 'malo';
    const cents = this.getSignedCentsDiff(detectedMidi, targetMidi);
    if (cents === null) return 'malo';
    const abs = Math.abs(cents);
    if (abs <= 15) return 'admirable';
    if (abs <= 20) return 'bueno';
    if (abs <= 40) return 'aceptable';
    if (abs <= 80) return 'casi';
    return 'malo';
  }

  isNoteMatch(grade) {
    return grade === 'admirable' || grade === 'bueno' || grade === 'aceptable';
  }

  formatCentsLabel(cents) {
    if (cents === null) return 'Silencio';
    if (Math.abs(cents) <= 5) return 'Centrada (0c)';
    return cents > 0 ? `+${cents}c (alta)` : `${cents}c (baja)`;
  }

  evaluateSingingTake() {
    if (!this.activeLevel || !this.currentQuestion) return;
    const midis = this.currentQuestion.midis || [this.currentQuestion.midi1, this.currentQuestion.midi2].filter((m) => m != null);
    const detList = this.lastNoteDetails || [];
    const defaultTonal = { label: 'Silencio', sungNote: null, isVibrato: false, isUnstable: false, vibratoHz: null };

    const noteGrades = midis.map((_, i) => detList[i]?.grade || 'malo');
    const exerciseGrade = noteGrades.reduce((worst, g) => this.worstGrade(worst, g), noteGrades[0] || 'malo');
    const isCorrect = this.isNoteMatch(exerciseGrade);

    const noteNames = midis.map((m) => this.midiToNoteNameEs(m));
    const tonals = midis.map((_, i) => detList[i]?.tonal || defaultTonal);

    // Badges Vib, Irr y Gli con tooltip
    const makeBadges = (tonal) => {
      let b = '';
      if (tonal.isVibrato)
        b += `<span class="voice-badge badge-vibrato" title="Vibrato detectado (${tonal.vibratoHz}Hz)">Vib</span>`;
      else if (tonal.isUnstable || tonal.isHighLow)
        b += `<span class="voice-badge badge-unstable" title="Voz inestable detectada">Irr</span>`;
      if (tonal.glissando)
        b += `<span class="voice-badge badge-glissando" title="Glisando detectado: la nota partió lejos y se niveló">Gli</span>`;
      return b;
    };

    const sungSummary = noteNames
      .map((nName, i) => `${nName}: ${tonals[i].label}${makeBadges(tonals[i])}`)
      .join('<br>');

    const stats = this.getLevelStats(this.activeLevel.id, 'singing');

    if (!this.currentQuestion.answered) {
      this.currentQuestion.answered = true;

      if (isCorrect) {
        stats.good += 1;
      } else {
        stats.bad += 1;
      }

      const todayKey = this.getTodayKey();
      const todayCount = this.singSessionLog.filter((it) => (it.date || todayKey) === todayKey).length;
      const toVoiceType = (t) =>
        t.voiceType || (t.isVibrato ? 'vibrato' : t.isUnstable || t.isHighLow ? 'inestable' : 'plana');

      this.pushLevelDayLog('singing', this.activeLevel.id, {
        date: todayKey,
        index: todayCount + 1,
        notes: noteNames.join('<br>'),
        isCorrect,
        exerciseGrade,
        noteStats: midis.map((m, i) => ({
          midi: m,
          grade: noteGrades[i],
          sungNote: tonals[i].sungNote || null,
          label: tonals[i].label,
          voiceType: toVoiceType(tonals[i]),
          vibratoHz: tonals[i].vibratoHz || null,
          glissando: Boolean(tonals[i].glissando),
        })),
      });
      this.singSessionLog = this.getLevelDayLog('singing', this.activeLevel.id);
      this.renderSingSessionLog();

      const totalDone = stats.good + stats.bad;
      if (totalDone >= this.dailyMin) {
        const ratio = totalDone > 0 ? stats.good / totalDone : 0;
        const earnedStars = ratio >= 0.85 ? 3 : ratio >= 0.65 ? 2 : 1;
        if (earnedStars > stats.stars) {
          stats.stars = earnedStars;
        }
      }

      this.saveProgress();
      this.updateHomeModuleProgress();
    }

    // Debug: siempre actualizar con el último análisis (incluye reintentos)
    this.renderDebugPanel(noteNames, detList, tonals, exerciseGrade);
  }

  /* =========================================================================
   * DEBUG PANEL
   * ========================================================================= */

  renderDebugPanel(noteNamesArg, detListArg, tonalsArg, exerciseGrade) {
    const dbg = this.lastDebugData || {};
    const seg = dbg.segmentation || {};
    const midiT = this.currentQuestion;
    const midis = midiT?.midis || [midiT?.midi1, midiT?.midi2].filter((m) => m != null);
    const noteNames = Array.isArray(noteNamesArg) ? noteNamesArg : midis.map((m) => this.midiToNoteNameEs(m));
    const detList = Array.isArray(detListArg) ? detListArg : (this.lastNoteDetails || []);
    const defaultTonal = { label: 'Silencio', sungNote: null, isVibrato: false, isUnstable: false, vibratoHz: null };
    const tonals = Array.isArray(tonalsArg) ? tonalsArg : midis.map((_, i) => detList[i]?.tonal || defaultTonal);
    const midiFramesList = dbg.midiFramesList || [dbg.midiFrames1 || [], dbg.midiFrames2 || []];
    const analyses = dbg.analyses || [dbg.analysis1, dbg.analysis2];
    const pulseFrames = dbg.pulseFrames || [dbg.pulse1, dbg.pulse2, dbg.pulse3].filter((p) => p != null);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const pct = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—';
    const fmtC = (c) => c == null ? '·' : (c >= 0 ? `+${c}c` : `${c}c`);

    const frameCents = (midi, target) => {
      if (midi == null) return null;
      return this.getSignedCentsDiff(midi, target);
    };

    const ROWS = DEBUG_CENTS_BANDS;

    const rowFor = (cents) => {
      if (cents == null) return -1;
      for (let r = 0; r < ROWS.length; r++) {
        const { min, max } = ROWS[r];
        const aboveMin = min == null || cents >= min;
        const belowMax = max == null || cents < max;
        if (aboveMin && belowMax) return r;
      }
      return -1;
    };

    // ── Calcular rangos de columna para cada nota ─────────────────────────────
    const noteRanges = midis.map((_, i) => {
      if (Array.isArray(seg.noteRanges) && seg.noteRanges[i]) {
        return { start: seg.noteRanges[i].start, end: seg.noteRanges[i].end };
      }
      if (i === 0 && seg.note1) return { start: seg.note1.start, end: seg.note1.end };
      if (i === 1 && seg.note2) return { start: seg.note2.start, end: seg.note2.end };
      if (pulseFrames[i] != null) {
        const pEnd = pulseFrames[i + 1] != null ? pulseFrames[i + 1] - 1 : pulseFrames[i] + (dbg.noteDurFrames || 40) - 1;
        return { start: pulseFrames[i], end: pEnd };
      }
      return null;
    });

    const inRange = (col, range) =>
      range && col >= range.start && col <= range.end;

    // ── Centro tonal por nota (mediana firmada en cents) y su fila en la tabla ─
    const allFrames = dbg.allFrames || [];
    const cols = allFrames.length;
    const tonalCentsList = midis.map((tMidi, i) =>
      tMidi != null ? this.getSignedMedianCents(midiFramesList[i] || [], tMidi) : null
    );
    const tonalRowList = tonalCentsList.map((tc) => rowFor(tc));

    // ── Peaks: mapear al índice de frame global en allFrames ─────────────────
    const buildPeakSet = (analysis, range) => {
      if (!analysis?.peaks?.length || !range) return new Map();
      const map = new Map();
      analysis.peaks.forEach((peak) => {
        if (peak.frameIdx >= range.start && peak.frameIdx <= range.end) map.set(peak.frameIdx, peak.cents);
      });
      return map;
    };

    const peakSets = midis.map((_, i) => buildPeakSet(analyses[i], noteRanges[i]));

    let tableHtml = `<div class="dbg-frame-scroll"><table class="dbg-frame-table">`;

    // Fila superior indicando qué nota se analiza realmente en cada columna (N1..N4 o sin nota)
    tableHtml += `<tr><th class="dbg-row-label">Nota analizada</th>`;
    for (let c = 0; c < cols; c++) {
      const hasVoiced = allFrames[c] !== null;
      let matchedNoteIdx = -1;
      for (let i = 0; i < midis.length; i++) {
        if (inRange(c, noteRanges[i]) && (midiFramesList[i] || []).length > 0) {
          matchedNoteIdx = i;
          break;
        }
      }
      if (matchedNoteIdx >= 0 && hasVoiced) {
        const hdrCls = matchedNoteIdx % 2 === 0 ? 'dbg-note1-hdr' : 'dbg-note2-hdr';
        tableHtml += `<th class="dbg-note-hdr ${hdrCls}">N${matchedNoteIdx + 1}</th>`;
      } else {
        tableHtml += `<th class="dbg-note-hdr dbg-note-none">·</th>`;
      }
    }
    tableHtml += `</tr>`;

    // Fila de encabezado con número de frame y marcadores de pulso
    tableHtml += `<tr><th class="dbg-row-label">Frame / Pulso</th>`;
    for (let c = 0; c < cols; c++) {
      const pIdx = pulseFrames.indexOf(c);
      const isNotePulse = pIdx >= 0 && pIdx < midis.length;
      const isEndPulse = pIdx === midis.length;
      const cls = isNotePulse ? (pIdx % 2 === 0 ? ' dbg-pulse1-hdr' : ' dbg-pulse2-hdr') : '';
      const pTag = isNotePulse ? ` (P${pIdx + 1})` : isEndPulse ? ' (Fin)' : '';
      tableHtml += `<th class="dbg-frame-hdr${cls}">${c + 1}${pTag}</th>`;
    }
    tableHtml += `</tr>`;

    // 15 filas de contenido
    for (let r = 0; r < ROWS.length; r++) {
      const row = ROWS[r];
      const isCenterRow = r === rowFor(0);
      tableHtml += `<tr${isCenterRow ? ' class="dbg-center-row"' : ''}>`;
      tableHtml += `<td class="dbg-row-label">${row.label}</td>`;

      for (let c = 0; c < cols; c++) {
        let matchedNoteIdx = -1;
        for (let i = 0; i < midis.length; i++) {
          if (inRange(c, noteRanges[i]) && (midiFramesList[i] || []).length > 0) {
            matchedNoteIdx = i;
            break;
          }
        }
        const targetMidi = matchedNoteIdx >= 0 ? midis[matchedNoteIdx] : null;
        const cents = targetMidi != null ? frameCents(allFrames[c], targetMidi) : null;
        const activeRow = rowFor(cents);
        const isPeak = matchedNoteIdx >= 0 && peakSets[matchedNoteIdx]?.has(c);
        const hasNote = matchedNoteIdx >= 0 && cents !== null;

        let colBg = '#000000';
        if (hasNote) {
          colBg = matchedNoteIdx % 2 === 0 ? 'rgba(56,189,248,0.09)' : 'rgba(167,139,250,0.09)';
        }

        if (!hasNote) {
          const silenceDot = allFrames[c] === null && matchedNoteIdx >= 0 && r === 7 ? '·' : '';
          tableHtml += `<td class="dbg-frame-cell dbg-no-note">${silenceDot}</td>`;
        } else if (activeRow === r && cents !== null) {
          const display = isPeak ? `(${fmtC(cents)})` : fmtC(cents);
          const extraStyle = isPeak ? 'font-style:italic;' : '';
          tableHtml += `<td class="dbg-frame-cell dbg-active" style="background:${row.bg};color:${row.fg};${extraStyle}">${display}</td>`;
        } else {
          let content = '';
          if (matchedNoteIdx >= 0 && r === tonalRowList[matchedNoteIdx] && tonalCentsList[matchedNoteIdx] !== null) {
            content = `<span class="dbg-tonal-hint">${fmtC(tonalCentsList[matchedNoteIdx])}</span>`;
          }
          tableHtml += `<td class="dbg-frame-cell" style="background:${colBg}">${content}</td>`;
        }
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</table></div>`;

    // ── Sección de segmentación ───────────────────────────────────────────────
    const mergedStr = (seg.mergedSegments || [])
      .map((s, i) => `seg${i + 1}: frames ${s.start + 1}–${s.end + 1} (${s.voiced} con pitch)`)
      .join(' | ');
    const noteRangeRowsHtml = midis.map((_, i) => {
      const nr = noteRanges[i];
      const mf = midiFramesList[i] || [];
      const rStr = nr && mf.length > 0
        ? `frames ${nr.start + 1}–${nr.end + 1} (${mf.filter((m) => m !== null).length} útiles)`
        : 'Silencio (sin frames válidos)';
      return `<span class="dbg-k">Nota ${i + 1} (N${i + 1})</span><span class="dbg-v">${rStr}</span>`;
    }).join('');
    const headerNotesLegend = noteNames.map((n, i) => `N${i + 1}=${n}`).join(' · ');

    const segHtml = `
      <div class="dbg-section">
        <div class="dbg-section-title">Tabla de frames analizados (${cols} frames · ${headerNotesLegend})</div>
        ${tableHtml}
        <div class="dbg-kv-grid" style="margin-top:0.4rem">
          <span class="dbg-k">Estrategia</span><span class="dbg-v">${seg.strategy ?? '—'}</span>
          ${noteRangeRowsHtml}
          <span class="dbg-k">Desp. global</span><span class="dbg-v">${seg.globalShift != null ? seg.globalShift + ' frames (' + Math.round(seg.globalShift * 20) + 'ms)' : '0'}</span>
          <span class="dbg-k">Segmentos detectados</span><span class="dbg-v">${mergedStr || '—'}</span>
        </div>
      </div>`;

    // ── Sección por nota ──────────────────────────────────────────────────────
    const fmtGradeEs = (g) => {
      if (g === 'malo') return 'fallido';
      if (g === 'casi') return 'regular';
      return g ?? '—';
    };
    const noteSection = (tag, noteName, det, tonal, analysis) => {
      const voiceType = analysis?.voiceType || (tonal.isVibrato ? 'vibrato' : tonal.isUnstable ? 'inestable' : 'plana');
      const peaksStr = (analysis?.peaks || [])
        .map(p => `${fmtC(p.cents)}@f${p.frameIdx + 1}`).join(' · ') || '—';
      return `
        <div class="dbg-section">
          <div class="dbg-section-title">${tag}: ${noteName} — Calif.: <strong>${fmtGradeEs(det?.grade)}</strong></div>
          <div class="dbg-kv-grid">
            <span class="dbg-k">badPct</span>       <span class="dbg-v">${pct(det?._dbg?.badPct)}</span>
            <span class="dbg-k">goodPct</span>      <span class="dbg-v">${pct(det?._dbg?.goodPct)}</span>
            <span class="dbg-k">tightPct</span>     <span class="dbg-v">${pct(det?._dbg?.tightPct)}</span>
            <span class="dbg-k">medianCents</span>  <span class="dbg-v">${det?.medianCents ?? '—'}</span>
            <span class="dbg-k">Rectificación</span> <span class="dbg-v">${det?.rectified ? `sí (${det.rectifiedFrameCount} frames)` : 'no'}</span>
            <span class="dbg-k">Mediana abs. cruda</span> <span class="dbg-v">${det?.rawMedianCents ?? '—'}c</span>
            <span class="dbg-k">Glisando diagnóstico</span> <span class="dbg-v">${analysis?.glissandoDebug?.reason || '—'}</span>
            <span class="dbg-k">Glisando distancia</span> <span class="dbg-v">${analysis?.glissandoDebug?.startDistance == null ? '—' : `${analysis.glissandoDebug.startDistance}c → ${analysis.glissandoDebug.endDistance}c`}</span>
            <span class="dbg-k">Glisando asentamiento</span> <span class="dbg-v">${analysis?.glissandoDebug?.stableFrames ?? 0} frames · progreso ${analysis?.glissandoDebug?.progressRatio == null ? '—' : Math.round(analysis.glissandoDebug.progressRatio * 100) + '%'}</span>
            <span class="dbg-k">Centro tonal</span> <span class="dbg-v">${tonal.label}</span>
            <span class="dbg-k">SD voz</span>       <span class="dbg-v">${analysis?.sd ?? '—'}c</span>
            <span class="dbg-k">Tipo de voz</span>  <span class="dbg-v">${voiceType}</span>
            <span class="dbg-k">Vibrato Hz</span>   <span class="dbg-v">${tonal.vibratoHz ?? '—'}</span>
            <span class="dbg-k">CV picos</span>     <span class="dbg-v">${analysis?.cv ?? '—'}</span>
            <span class="dbg-k">Freq picos</span>   <span class="dbg-v">${analysis?.freqHz ?? '—'} Hz</span>
            <span class="dbg-k">Glisando</span>     <span class="dbg-v">${tonal.glissando ? 'sí' : 'no'}</span>
            <span class="dbg-k">isHighLow</span>    <span class="dbg-v">${tonal.isHighLow ? 'sí' : 'no'}</span>
            <span class="dbg-k">Picos (${(analysis?.peaks || []).length})</span>
            <span class="dbg-v">${peaksStr}</span>
          </div>
        </div>`;
    };

    const noteSectionsHtml = midis
      .map((_, i) => noteSection(`N${i + 1} (${i + 1}ª Nota)`, noteNames[i], detList[i], tonals[i], analyses[i]))
      .join('');

    const fullHtml =
      `<div class="dbg-header-line">Ejercicio: <strong>${fmtGradeEs(exerciseGrade).toUpperCase()}</strong></div>` +
      segHtml +
      `<div class="dbg-notes-grid">` +
      noteSectionsHtml +
      `</div>`;

    this.lastDebugHtml = fullHtml;
    if (this.singDebugBody) {
      this.singDebugBody.innerHTML = fullHtml;
    }
    if (this.debugLargeBody) {
      this.debugLargeBody.innerHTML = fullHtml;
    }
    this.syncDebugPopupWindow();
  }

  openDebugPopupWindow() {
    const win = window.open('', 'TrinoDebugWindow', 'width=1280,height=820,resizable=yes,scrollbars=yes');
    if (!win) {
      // Si el navegador bloquea pop-ups, abrir la ventana grande flotante a pantalla completa
      if (this.debugLargeModal) this.debugLargeModal.classList.remove('hidden');
      return;
    }
    this.debugPopupWin = win;
    this.syncDebugPopupWindow();
    win.focus();
  }

  syncDebugPopupWindow() {
    if (!this.debugPopupWin || this.debugPopupWin.closed) return;
    const cssHref = new URL('./css/styles.css?v=57', window.location.href).href;
    const doc = this.debugPopupWin.document;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>🔬 Trino — Debug Análisis en Vivo</title>
  <link rel="stylesheet" href="${cssHref}" />
  <style>
    body {
      margin: 0;
      padding: 16px;
      background: #0f172a;
      color: #f8fafc;
      font-family: 'Courier New', Courier, monospace;
      display: block;
      min-height: 100vh;
    }
    .dbg-frame-table th, .dbg-frame-table td {
      min-width: 42px;
      height: 20px;
      font-size: 0.68rem;
      padding: 2px 5px;
    }
    .dbg-row-label {
      font-size: 0.66rem !important;
      min-width: 105px !important;
    }
    .dbg-tonal-hint {
      font-size: 0.62rem;
    }
    .dbg-kv-grid, .dbg-section-title, .dbg-header-line {
      font-size: 0.8rem;
    }
    .dbg-notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 12px;
    }
  </style>
</head>
<body>
  ${this.lastDebugHtml || '<p style="color:#94a3b8;">Aún no hay datos de análisis. Canta un ejercicio en Trino.</p>'}
</body>
</html>`);
    doc.close();
  }

  /* =========================================================================
   * REPRODUCCIÓN DE AUDIO Y NAVEGACIÓN
   * ========================================================================= */

  async ensureAudioReady() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!this.audioCtx) {
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
  }

  async schedulePlayAfterOneSecond() {
    if (this.delayedPlayTimer) {
      clearTimeout(this.delayedPlayTimer);
      this.delayedPlayTimer = null;
    }
    await this.ensureAudioReady();
    this.delayedPlayTimer = setTimeout(() => {
      this.delayedPlayTimer = null;
      if (this.activeModule === 'singing') {
        this.startSingingSequence();
      } else {
        this.playCurrentInterval();
      }
    }, 1000);
  }

  async playCurrentInterval() {
    if (!this.currentQuestion) return;
    if (this.delayedPlayTimer) {
      clearTimeout(this.delayedPlayTimer);
      this.delayedPlayTimer = null;
    }

    if (this.activeModule === 'singing') {
      this.startSingingSequence();
      return;
    }
    if (this.activeModule === 'chords') {
      this.playChordQuestion();
      return;
    }

    this.clearAnswerButtonColors();
    await this.ensureAudioReady();

    const { midi1, midi2 } = this.currentQuestion;

    const hz1 = 440 * Math.pow(2, (midi1 - 69) / 12);
    const hz2 = 440 * Math.pow(2, (midi2 - 69) / 12);

    const now = this.audioCtx.currentTime;
    this.playTone(hz1, now, 0.55);
    this.playTone(hz2, now + 0.65, 0.65);

    this.clearNoteAnimTimers();
    if (this.mysteryNote1) {
      this.mysteryNote1.classList.add('note-playing');
    }
    this.noteAnimTimers.push(
      setTimeout(() => {
        if (this.mysteryNote1) this.mysteryNote1.classList.remove('note-playing');
      }, 550),
      setTimeout(() => {
        if (this.mysteryNote2) this.mysteryNote2.classList.add('note-playing');
      }, 650),
      setTimeout(() => {
        if (this.mysteryNote2) this.mysteryNote2.classList.remove('note-playing');
      }, 1300)
    );
  }

  playTone(hz, startTime, duration, gainScale = 1) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(hz, startTime);

    const peakGain = Math.max(0.001, ((this.noteVolume ?? 80) / 100) * 0.40 * gainScale);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.03);
    gain.gain.setValueAtTime(peakGain, startTime + duration - 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  /* =========================================================================
   * HERRAMIENTAS DE MICRÓFONO EN CONFIGURACIÓN (RANGO VOCAL + PROBADOR EN VIVO)
   * ========================================================================= */

  stopSettingsMicTools() {
    this.isMicTesting = false;
    this.isDetectingVocalLimit = false;
    this.stopMicProcessor();
    if (this.btnDetectVocalMin) this.btnDetectVocalMin.classList.remove('recording-active');
    if (this.btnDetectVocalMax) this.btnDetectVocalMax.classList.remove('recording-active');
    if (this.btnMicTester) {
      this.btnMicTester.classList.remove('active');
      this.btnMicTester.textContent = '🎙️ Probar Micrófono';
    }
    if (this.micMeterFill) this.micMeterFill.style.width = '0%';
    if (this.micLiveNote) this.micLiveNote.textContent = '—';
    if (this.micLiveDetail) {
      this.micLiveDetail.textContent = 'Pulsa "Probar Micrófono" y canta una nota';
    }
  }

  async detectVocalLimitByVoice(mode) {
    // Si ya estaba detectando, cancelar
    if (this.isDetectingVocalLimit) {
      this.stopSettingsMicTools();
      if (this.vocalDetectStatus) {
        this.vocalDetectStatus.textContent = 'Detección cancelada.';
      }
      return;
    }

    this.stopSettingsMicTools();
    await this.ensureAudioReady();
    const ok = await this.ensureMicStreamReady();
    if (!ok) {
      if (this.vocalDetectStatus) {
        this.vocalDetectStatus.classList.remove('hidden');
        this.vocalDetectStatus.textContent = '⚠️ Permite el acceso al micrófono en tu navegador.';
      }
      return;
    }

    this.isDetectingVocalLimit = true;
    const targetBtn = mode === 'min' ? this.btnDetectVocalMin : this.btnDetectVocalMax;
    if (targetBtn) targetBtn.classList.add('recording-active');

    const labelTipo = mode === 'min' ? 'más grave' : 'más aguda';
    if (this.vocalDetectStatus) {
      this.vocalDetectStatus.classList.remove('hidden');
      this.vocalDetectStatus.textContent = `🎙️ Canta y mantén tu nota ${labelTipo} (2.5 s)...`;
    }

    const durationSec = 2.5;
    const sampleRate = this.audioCtx.sampleRate;
    const totalSamples = Math.round(durationSec * sampleRate);
    const chunks = [];
    let collected = 0;

    this.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
    this.processorNode = this.audioCtx.createScriptProcessor(2048, 1, 1);

    const silentGain = this.audioCtx.createGain();
    silentGain.gain.value = 0;
    this.sourceNode.connect(this.processorNode);
    this.processorNode.connect(silentGain);
    silentGain.connect(this.audioCtx.destination);

    const startMs = performance.now();

    this.processorNode.onaudioprocess = (e) => {
      if (!this.isDetectingVocalLimit) return;
      const input = e.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(input));
      collected += input.length;

      const elapsedSec = (performance.now() - startMs) / 1000;
      if (collected >= totalSamples || elapsedSec >= durationSec) {
        this.isDetectingVocalLimit = false;
        this.stopMicProcessor();
        if (targetBtn) targetBtn.classList.remove('recording-active');

        const pcm = new Float32Array(totalSamples);
        let offset = 0;
        for (const c of chunks) {
          const rem = totalSamples - offset;
          if (rem <= 0) break;
          const len = Math.min(c.length, rem);
          pcm.set(c.subarray(0, len), offset);
          offset += len;
        }

        const domMidi = this.detectDominantMidi(pcm, sampleRate);
        if (domMidi === null) {
          if (this.vocalDetectStatus) {
            this.vocalDetectStatus.textContent = `⚠️ No se detectó voz clara. Intenta cantar más fuerte.`;
          }
          return;
        }

        const roundedMidi = Math.round(domMidi);
        if (mode === 'min') {
          const clamped = Math.max(36, Math.min(72, roundedMidi));
          this.vocalMinMidi = clamped;
          if (this.vocalMaxMidi < clamped + 6) {
            this.vocalMaxMidi = Math.min(84, clamped + 12);
          }
        } else {
          const clamped = Math.max(48, Math.min(84, roundedMidi));
          this.vocalMaxMidi = clamped;
          if (this.vocalMinMidi > clamped - 6) {
            this.vocalMinMidi = Math.max(36, clamped - 12);
          }
        }

        this.saveAllSettings();
        this.syncSettingsUi();

        const finalMidi = mode === 'min' ? this.vocalMinMidi : this.vocalMaxMidi;
        const hz = Math.round(440 * Math.pow(2, (finalMidi - 69) / 12));
        const noteName = this.midiToNoteWithOctaveEs(finalMidi);
        if (this.vocalDetectStatus) {
          this.vocalDetectStatus.textContent = `✓ Nota ${labelTipo} guardada: ${noteName} (${hz} Hz)`;
        }
      }
    };
  }

  async toggleMicTester() {
    if (this.isMicTesting) {
      this.stopSettingsMicTools();
      return;
    }

    this.stopSettingsMicTools();
    await this.ensureAudioReady();
    const ok = await this.ensureMicStreamReady();
    if (!ok) {
      if (this.micLiveDetail) {
        this.micLiveDetail.textContent = '⚠️ Permite el acceso al micrófono en tu navegador.';
      }
      return;
    }

    this.isMicTesting = true;
    if (this.btnMicTester) {
      this.btnMicTester.classList.add('active');
      this.btnMicTester.textContent = '⏹ Detener';
    }
    if (this.micLiveDetail) {
      this.micLiveDetail.textContent = 'Escuchando... Canta una nota';
    }

    const sampleRate = this.audioCtx.sampleRate;
    this.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
    this.processorNode = this.audioCtx.createScriptProcessor(2048, 1, 1);

    const silentGain = this.audioCtx.createGain();
    silentGain.gain.value = 0;
    this.sourceNode.connect(this.processorNode);
    this.processorNode.connect(silentGain);
    silentGain.connect(this.audioCtx.destination);

    this.processorNode.onaudioprocess = (e) => {
      if (!this.isMicTesting) return;
      const input = e.inputBuffer.getChannelData(0);
      let sumSq = 0;
      for (let i = 0; i < input.length; i++) {
        sumSq += input[i] * input[i];
      }
      const rms = Math.sqrt(sumSq / input.length);
      const levelPct = Math.min(100, Math.round(rms * 450));
      if (this.micMeterFill) {
        this.micMeterFill.style.width = `${levelPct}%`;
      }

      if (rms >= 0.008) {
        const hz = this.yinPitch(input, 0, input.length, sampleRate);
        if (hz >= 65 && hz <= 1050) {
          const midi = 69 + 12 * Math.log2(hz / 440);
          const nearestMidi = Math.round(midi);
          const cents = Math.round((midi - nearestMidi) * 100);
          const sign = cents >= 0 ? '+' : '';
          if (this.micLiveNote) {
            this.micLiveNote.textContent = this.midiToNoteWithOctaveEs(nearestMidi);
          }
          if (this.micLiveDetail) {
            this.micLiveDetail.textContent = `${Math.round(hz)} Hz · ${sign}${cents}c`;
          }
        }
      } else {
        if (this.micLiveNote) this.micLiveNote.textContent = '—';
        if (this.micLiveDetail) this.micLiveDetail.textContent = 'Escuchando... Canta una nota';
      }
    };
  }

  /* =========================================================================
   * MÓDULO 4: PRUEBA DE VOZ (teclado + grabación única + análisis de canto)
   * ========================================================================= */

  initVoiceTest() {
    this.voiceTest = {
      midi: null,
      frames: null,
      tone: null,
      activeKey: null,
      pressId: 0,
      recToken: 0,
      recording: false,
      startTimer: null,
      tickTimer: null,
      scrollInitDone: false,
    };
    this.vtKeyboard = document.getElementById('vt-keyboard');
    this.vtScroll = document.getElementById('vt-keyboard-scroll');
    this.vtCanvas = document.getElementById('voice-test-canvas');
    this.vtResult = document.getElementById('voice-test-result');
    this.vtRows = [1, 2, 3].map((n) => document.getElementById(`vt-row-${n}`));
    this.vtRecBar = document.getElementById('vt-rec-bar');
    this.vtRecFill = document.getElementById('vt-rec-fill');
    this.vtRecText = document.getElementById('vt-rec-text');
    this.vtRecordSelect = document.getElementById('vt-record-select');
    this.vtRangeLabel = document.getElementById('vt-range-label');
    document.getElementById('vt-info-button')?.addEventListener('click', () => {
      if (this.levelInfoModalModule) this.levelInfoModalModule.textContent = 'Módulo 4';
      if (this.levelInfoModalTitle) this.levelInfoModalTitle.textContent = 'Prueba de voz';
      this.levelInfoModalBody?.classList.add('hidden');
      this.voiceTestInfoBody?.classList.remove('hidden');
      this.levelInfoModal?.classList.remove('hidden');
    });
    if (!this.vtKeyboard || !this.vtScroll) return;

    this.buildVoiceTestKeyboard();
    this.vtRecordSelect?.addEventListener('change', () => this.updateVoiceTestHint());
    document.getElementById('vt-scroll-left')?.addEventListener('click', () => this.scrollVoiceTestKeyboard(-1));
    document.getElementById('vt-scroll-right')?.addEventListener('click', () => this.scrollVoiceTestKeyboard(1));
    this.vtScroll.addEventListener('scroll', () => this.updateVoiceTestRange());
    this.vtKeyboard.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('blur', () => this.releaseActiveVoiceTestKey());
    window.addEventListener('resize', () => {
      if (this.currentView === 'voice-test') this.drawVoiceTestStaff();
    });
    this.updateVoiceTestHint();
  }

  midiToEnglishName(midi) {
    const rounded = Math.round(midi);
    return `${NOTE_NAMES_EN[((rounded % 12) + 12) % 12]}${Math.floor(rounded / 12) - 1}`;
  }

  buildVoiceTestKeyboard() {
    const blackPcs = [1, 3, 6, 8, 10];
    this.vtWhiteMidis = [];
    let html = '';

    for (let m = VOICE_TEST_MIN_MIDI; m <= VOICE_TEST_MAX_MIDI; m++) {
      const name = this.midiToEnglishName(m);
      const whiteCount = this.vtWhiteMidis.length;
      if (blackPcs.includes(m % 12)) {
        const left = whiteCount * VT_WHITE_KEY_W - VT_BLACK_KEY_W / 2;
        html += `<div class="vt-key vt-key-black" data-midi="${m}" style="left:${left}px;width:${VT_BLACK_KEY_W}px">${name}</div>`;
      } else {
        html += `<div class="vt-key vt-key-white" data-midi="${m}" style="left:${whiteCount * VT_WHITE_KEY_W}px;width:${VT_WHITE_KEY_W}px">${name}</div>`;
        this.vtWhiteMidis.push(m);
      }
    }

    this.vtKeyboard.style.width = `${this.vtWhiteMidis.length * VT_WHITE_KEY_W}px`;
    this.vtKeyboard.innerHTML = html;

    this.vtKeyboard.querySelectorAll('.vt-key').forEach((keyEl) => {
      const midi = parseInt(keyEl.dataset.midi, 10);
      keyEl.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        try {
          keyEl.setPointerCapture(e.pointerId);
        } catch (_) { }
        this.vtDrag = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startScroll: this.vtScroll.scrollLeft,
          dragging: false,
          keyEl,
        };
        this.voiceTestPress(midi, keyEl);
      });
      // Un desplazamiento horizontal mueve el teclado en lugar de tocar la nota
      keyEl.addEventListener('pointermove', (e) => {
        const drag = this.vtDrag;
        if (!drag || drag.keyEl !== keyEl || drag.pointerId !== e.pointerId) return;
        const dx = e.clientX - drag.startX;
        if (!drag.dragging) {
          if (Math.abs(dx) < 10) return;
          drag.dragging = true;
          this.voiceTestCancelPress();
        }
        this.vtScroll.scrollLeft = drag.startScroll - dx;
      });
      const release = () => {
        const drag = this.vtDrag;
        if (drag?.keyEl === keyEl) {
          this.vtDrag = null;
          if (drag.dragging) return;
        }
        this.voiceTestRelease(keyEl);
      };
      keyEl.addEventListener('pointerup', release);
      keyEl.addEventListener('pointercancel', release);
      keyEl.addEventListener('lostpointercapture', release);
    });
  }

  scrollVoiceTestKeyboard(direction) {
    this.vtScroll?.scrollBy({ left: direction * VT_WHITE_KEY_W * 5, behavior: 'smooth' });
  }

  updateVoiceTestRange() {
    if (!this.vtScroll || !this.vtRangeLabel || !this.vtWhiteMidis?.length) return;
    const last = this.vtWhiteMidis.length - 1;
    const first = Math.min(last, Math.max(0, Math.round(this.vtScroll.scrollLeft / VT_WHITE_KEY_W)));
    const end = Math.min(last, Math.max(first, Math.floor((this.vtScroll.scrollLeft + this.vtScroll.clientWidth) / VT_WHITE_KEY_W) - 1));
    this.vtRangeLabel.textContent = `${this.midiToEnglishName(this.vtWhiteMidis[first])} – ${this.midiToEnglishName(this.vtWhiteMidis[end])}`;
  }

  getVoiceTestMode() {
    return this.vtRecordSelect?.value || '3';
  }

  updateVoiceTestHint() {
    if (!this.vtRows) return;
    const mode = this.getVoiceTestMode();
    let second = '';
    if (mode === 'silence') {
      second = 'Al soltarla, canta: la grabación termina cuando haces silencio.';
    } else if (mode !== 'none') {
      second = `Al soltarla tendrás ${mode} ${mode === '1' ? 'segundo' : 'segundos'} para cantar la nota.`;
    }
    // El mensaje comparte el espacio del análisis y lo reemplaza
    this.vtResult?.classList.add('vt-hint-mode');
    this.vtRows[0].textContent = 'Mientras presionas una tecla escucharás la nota.';
    this.vtRows[1].textContent = second;
    this.vtRows[2].textContent = '';
  }

  setVoiceTestResult(text) {
    if (!this.vtRows) return;
    this.vtResult?.classList.remove('vt-hint-mode');
    this.vtRows[0].textContent = text;
    this.vtRows[1].textContent = '';
    this.vtRows[2].textContent = '';
  }

  onEnterVoiceTest() {
    const vt = this.voiceTest;
    if (!vt) return;
    if (!vt.scrollInitDone && this.vtScroll?.clientWidth) {
      // C3 queda al inicio de la parte visible
      this.vtScroll.scrollLeft = 7 * VT_WHITE_KEY_W;
      vt.scrollInitDone = true;
    }
    this.updateVoiceTestRange();
    vt.midi = null;
    vt.frames = null;
    this.lastDebugHtml = '';
    if (this.debugLargeBody) this.debugLargeBody.innerHTML = '<p class="dbg-empty">Pulsa una nota y termina el análisis para ver sus frames.</p>';
    this.updateVoiceTestHint();
    this.drawVoiceTestStaff();
  }

  stopVoiceTest() {
    const vt = this.voiceTest;
    if (!vt) return;
    vt.pressId += 1;
    this.stopVoiceTestRecording();
    this.stopVoiceTestTone();
    vt.activeKey?.classList.remove('active');
    vt.activeKey = null;
  }

  stopVoiceTestTone() {
    const vt = this.voiceTest;
    vt.tone?.stop();
    vt.tone = null;
  }

  stopVoiceTestRecording() {
    const vt = this.voiceTest;
    vt.recToken += 1;
    if (vt.startTimer) {
      clearTimeout(vt.startTimer);
      vt.startTimer = null;
    }
    if (vt.tickTimer) {
      clearInterval(vt.tickTimer);
      vt.tickTimer = null;
    }
    this.vtRecBar?.classList.remove('active');
    if (vt.recording) {
      vt.recording = false;
      this.stopMicProcessor();
    }
  }

  // Tono sostenido mientras la tecla está pulsada
  startHeldTone(hz) {
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const peak = Math.max(0.001, ((this.noteVolume ?? 80) / 100) * 0.40);
    const t = ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(hz, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);

    return {
      stop: () => {
        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(peak, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.stop(now + 0.08);
      },
    };
  }

  async voiceTestPress(midi, keyEl) {
    const vt = this.voiceTest;
    this.stopVoiceTestRecording();
    this.stopVoiceTestTone();
    vt.activeKey?.classList.remove('active');
    vt.activeKey = keyEl;
    keyEl.classList.add('active');
    vt.pressId += 1;
    const id = vt.pressId;

    // Cada pulsación descarta el análisis anterior
    vt.midi = midi;
    vt.frames = null;
    this.lastDebugHtml = '';
    if (this.debugLargeBody) this.debugLargeBody.innerHTML = '<p class="dbg-empty">El debug aparecerá al terminar el análisis.</p>';
    this.setVoiceTestResult('');
    this.drawVoiceTestStaff();

    // Pide el micrófono al pulsar para que el permiso no interrumpa el canto
    if (this.getVoiceTestMode() !== 'none') this.ensureMicStreamReady();

    await this.ensureAudioReady();
    if (vt.pressId !== id || vt.activeKey !== keyEl) return;
    vt.tone = this.startHeldTone(440 * Math.pow(2, (midi - 69) / 12));
  }

  // Cancela la pulsación en curso sin grabar (p. ej. al arrastrar el teclado)
  voiceTestCancelPress() {
    const vt = this.voiceTest;
    vt.pressId += 1;
    this.stopVoiceTestTone();
    this.stopVoiceTestRecording();
    vt.activeKey?.classList.remove('active');
    vt.activeKey = null;
    vt.midi = null;
    vt.frames = null;
    this.drawVoiceTestStaff();
    this.updateVoiceTestHint();
  }

  voiceTestRelease(keyEl) {
    const vt = this.voiceTest;
    if (vt.activeKey !== keyEl) return;
    keyEl.classList.remove('active');
    vt.activeKey = null;
    this.stopVoiceTestTone();

    if (this.getVoiceTestMode() === 'none') {
      this.setVoiceTestResult(`Nota ${this.midiToEnglishName(vt.midi)}.`);
      return;
    }

    const midi = vt.midi;
    vt.recToken += 1;
    const token = vt.recToken;
    this.setVoiceTestResult('Prepárate…');
    // Pequeña pausa para no grabar la cola del tono
    vt.startTimer = setTimeout(() => {
      vt.startTimer = null;
      this.startVoiceTestRecording(midi, token);
    }, 150);
  }

  releaseActiveVoiceTestKey() {
    const keyEl = this.voiceTest?.activeKey;
    if (keyEl) this.voiceTestRelease(keyEl);
  }

  async startVoiceTestRecording(midi, token) {
    const vt = this.voiceTest;
    const ok = await this.ensureMicStreamReady();
    if (vt.recToken !== token) return;
    if (!ok) {
      this.setVoiceTestResult('Permite el micrófono en tu navegador para grabar tu voz.');
      return;
    }
    await this.ensureAudioReady();
    if (vt.recToken !== token) return;

    this.stopMicProcessor();
    const mode = this.getVoiceTestMode();
    const untilSilence = mode === 'silence';
    const sampleRate = this.audioCtx.sampleRate;
    const maxSec = untilSilence ? 10 : Number(mode);
    const maxSamples = Math.round(maxSec * sampleRate);
    const chunks = [];
    let collected = 0;
    let heardSound = false;
    let silentSamples = 0;

    vt.recording = true;
    this.sourceNode = this.audioCtx.createMediaStreamSource(this.mediaStream);
    this.processorNode = this.audioCtx.createScriptProcessor(2048, 1, 1);
    const silentGain = this.audioCtx.createGain();
    silentGain.gain.value = 0;
    this.sourceNode.connect(this.processorNode);
    this.processorNode.connect(silentGain);
    silentGain.connect(this.audioCtx.destination);

    const startMs = performance.now();
    this.setVoiceTestResult('Canta ahora…');
    const updateBar = () => {
      const shown = Math.min((performance.now() - startMs) / 1000, maxSec);
      if (this.vtRecFill) this.vtRecFill.style.width = `${(shown / maxSec) * 100}%`;
      if (this.vtRecText) {
        this.vtRecText.textContent = untilSilence
          ? `Grabando ${shown.toFixed(1)} s`
          : `Grabando ${shown.toFixed(1)} / ${maxSec} s`;
      }
    };
    this.vtRecBar?.classList.add('active');
    updateBar();
    vt.tickTimer = setInterval(updateBar, 100);

    this.processorNode.onaudioprocess = (e) => {
      if (vt.recToken !== token || !vt.recording) return;
      const input = e.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(input));
      collected += input.length;

      let done = collected >= maxSamples;
      if (untilSilence) {
        let sumSq = 0;
        for (let i = 0; i < input.length; i++) sumSq += input[i] * input[i];
        const rms = Math.sqrt(sumSq / input.length);
        if (rms >= 0.015) {
          heardSound = true;
          silentSamples = 0;
        } else if (heardSound) {
          silentSamples += input.length;
        }
        const silenceReached = heardSound && silentSamples >= 0.6 * sampleRate;
        const noSoundTimeout = !heardSound && collected >= 6 * sampleRate;
        done = done || silenceReached || noSoundTimeout;
      }

      if (done) this.finishVoiceTestRecording(chunks, sampleRate, midi, token, maxSamples);
    };
  }

  finishVoiceTestRecording(chunks, sampleRate, midi, token, maxSamples) {
    const vt = this.voiceTest;
    if (vt.recToken !== token) return;
    this.stopVoiceTestRecording();

    const total = Math.min(chunks.reduce((sum, c) => sum + c.length, 0), maxSamples);
    const pcm = new Float32Array(total);
    let offset = 0;
    for (const c of chunks) {
      const len = Math.min(c.length, total - offset);
      if (len <= 0) break;
      pcm.set(c.subarray(0, len), offset);
      offset += len;
    }

    this.setVoiceTestResult('Analizando…');
    // Deja pintar el aviso antes del análisis, que es síncrono
    setTimeout(() => {
      if (vt.midi === midi && vt.recToken === token + 1) this.analyzeVoiceTest(pcm, sampleRate, midi);
    }, 30);
  }

  analyzeVoiceTest(pcm, sampleRate, midi) {
    const vt = this.voiceTest;
    // Toda la grabación se evalúa como una sola nota
    const frames = this.extractMidiFrames(pcm, sampleRate);
    const voiced = frames.filter((m) => m !== null);
    vt.frames = frames;
    this.drawVoiceTestStaff();

    if (voiced.length < 2) {
      const analysis = this.buildNoteAnalysis(frames, midi);
      this.renderVoiceTestDebug(midi, frames, { grade: 'sin evaluación', rectified: false }, analysis);
      this.setVoiceTestResult('No se detectó voz. Inténtalo de nuevo.');
      return;
    }

    const note = this.getNoteGradeFromFrames(frames, midi);
    const analysis = this.buildNoteAnalysis(frames, midi);
    this.pushLevelDayLog('voiceTest', '0', {
      date: this.getTodayKey(),
      noteStats: [{ midi, grade: note.grade }],
    });
    const sorted = [...voiced].sort((a, b) => a - b);
    const sungName = this.midiToEnglishName(sorted[Math.floor(sorted.length / 2)]);

    const gradeInfo = {
      admirable: { icon: '✦', label: 'Admirable', bg: '#10b981' },
      bueno: { icon: '✓', label: 'Bueno', bg: '#34d399' },
      aceptable: { icon: '⊙', label: 'Aceptable', bg: '#a3e635' },
      casi: { icon: '≈', label: 'Regular', bg: '#f59e0b' },
      malo: { icon: '✕', label: 'Fallido', bg: '#ef4444' },
    };
    const grade = gradeInfo[note.grade] || gradeInfo.malo;

    // Los porcentajes reflejan la serie usada por la calificación.
    const buckets = { malo: 0, casi: 0, aceptable: 0, bueno: 0, admirable: 0 };
    (note.centsList || voiced.map((m) => Math.abs(this.getSignedCentsDiff(m, midi)))).forEach((cents) => {
      if (cents <= 15) buckets.admirable++;
      else if (cents <= 20) buckets.bueno++;
      else if (cents <= 40) buckets.aceptable++;
      else if (cents <= 80) buckets.casi++;
      else buckets.malo++;
    });
    const pctHtml = ['admirable', 'bueno', 'aceptable', 'casi', 'malo']
      .map((g) => {
        const pct = Math.round((buckets[g] / voiced.length) * 100);
        // Admirable y bueno solo se muestran cuando tienen valor
        if (pct === 0 && (g === 'admirable' || g === 'bueno')) return '';
        return `<span class="vt-pct" style="color:${gradeInfo[g].bg}" title="${gradeInfo[g].label}" aria-label="${gradeInfo[g].label}: ${pct}%">${gradeInfo[g].icon} ${pct}%</span>`;
      })
      .join('');

    const voiceLabel = analysis.voiceType === 'sin-analisis'
      ? 'Análisis insuficiente'
      : analysis.voiceType === 'vibrato'
        ? `Vibrato${analysis.vibratoHz ? ` (${analysis.vibratoHz} Hz)` : ''}`
        : analysis.voiceType === 'inestable' ? 'Irregular' : 'Estable';

    if (this.vtRows) {
      this.vtResult?.classList.remove('vt-hint-mode');
      // Con "Muy irregular" la nota detectada no es fiable, así que no se muestra
      const sungPart = analysis.label === 'Muy irregular' ? '' : `${sungName} `;
      this.vtRows[0].innerHTML =
        `Nota: <strong>${this.midiToEnglishName(midi)}</strong>` +
        ` · Centro tonal ${sungPart}<strong>${analysis.label}</strong> : ` +
        `<span class="vt-grade" style="background:${grade.bg}" title="${grade.label}" aria-label="${grade.label}">${grade.icon}</span>`;
      this.vtRows[1].innerHTML = pctHtml;
      this.vtRows[2].innerHTML =
        `Voz: <strong>${voiceLabel}</strong>${analysis.glissando ? ' · <strong>Glisando detectado</strong>' : ''}`;
    }

    this.renderVoiceTestDebug(midi, frames, note, analysis);
  }

  renderVoiceTestDebug(targetMidi, frames, grade, analysis) {
    const fmtC = (cents) => cents == null ? '·' : `${cents > 0 ? '+' : ''}${cents}c`;
    const rowFor = (cents) => DEBUG_CENTS_BANDS.findIndex(({ min, max }) =>
      cents !== null && (min === null || cents >= min) && (max === null || cents < max)
    );
    const targetName = this.midiToEnglishName(targetMidi);
    const centerCents = analysis.medianSigned;
    const peakByFrame = new Map((analysis.peaks || []).map((peak) => [peak.frameIdx, peak]));
    const tableRows = DEBUG_CENTS_BANDS.map((band, rowIndex) => {
      const cells = frames.map((midi, frameIdx) => {
        const cents = analysis.frameCentsTarget[frameIdx];
        const peak = peakByFrame.get(frameIdx);
        const active = rowFor(cents) === rowIndex;
        const value = active ? fmtC(cents) : '';
        const peakMark = peak ? ` · ${peak.type === 'max' ? 'máx' : 'mín'} centrado ${fmtC(peak.cents)}` : '';
        const isSilence = cents === null;
        const silenceMark = isSilence && rowIndex === DEBUG_CENTS_BANDS.findIndex((item) => item.label === '-5 a +5') ? '·' : '';
        const style = active
          ? `background:${band.bg};color:${band.fg};font-weight:700;`
          : `background:${band.bg};color:transparent;`;
        const title = isSilence ? `Frame ${frameIdx + 1}: sin voz detectada` : `Frame ${frameIdx + 1}: ${fmtC(cents)} respecto al objetivo${peakMark}`;
        return `<td class="dbg-frame-cell${peak ? ' dbg-vt-peak' : ''}" title="${title}" style="${style}">${value || silenceMark || '&nbsp;'}</td>`;
      }).join('');
      return `<tr><th class="dbg-row-label" style="background:${band.bg};color:${band.fg}">${band.label}c</th>${cells}</tr>`;
    }).join('');
    const headers = frames.map((_, idx) => `<th class="dbg-frame-hdr">${idx + 1}</th>`).join('');
    const peaksText = (analysis.peaks || []).map((peak) =>
      `${peak.type === 'max' ? 'máx' : 'mín'} f${peak.frameIdx + 1} ${fmtC(peak.cents)}`
    ).join(' · ') || 'ninguno';
    const gliss = analysis.glissandoDebug || {};
    const detailRows = [
      ['Frames con voz', `${analysis.sampleCount}/${frames.length}`],
      ['Centro tonal', `${fmtC(centerCents)} respecto a ${targetName}`],
      ['Tipo vocal', analysis.voiceType],
      ['Calificación', grade.grade],
      ['Rectificación para calificar', grade.rectified ? `sí (${grade.rectifiedFrameCount} frames)` : 'no'],
      ['Mediana absoluta sin rectificar', grade.rawMedianCents == null ? '—' : `${grade.rawMedianCents}c`],
      ['Frecuencia vibrato', analysis.vibratoHz == null ? '—' : `${analysis.vibratoHz} Hz`],
      ['Períodos (frames)', analysis.periodsFrames?.join(', ') || '—'],
      ['CV períodos', analysis.cv == null ? '—' : analysis.cv],
      ['Ciclos completos', analysis.cycles ?? 0],
      ['Desviación estándar', analysis.sd == null ? '—' : `${analysis.sd}c`],
      ['Picos respecto al centro', peaksText],
      ['Glisando', gliss.detected ? 'detectado' : `no (${gliss.reason || 'sin datos'})`],
      ['Inicio / asentamiento', gliss.startDistance == null ? '—' : `${gliss.startDistance}c → ${gliss.endDistance}c`],
      ['Progreso hacia centro', gliss.progressRatio == null ? '—' : `${Math.round(gliss.progressRatio * 100)}%`],
    ].map(([label, value]) => `<span class="dbg-k">${label}</span><span class="dbg-v">${value}</span>`).join('');

    const html = `<div class="dbg-header-line">Módulo 4 · Nota objetivo: <strong>${targetName}</strong></div>
      <section class="dbg-section">
        <div class="dbg-section-title">Frames de voz · cents respecto a la nota objetivo (filas y colores de TablaDeValores)</div>
        <div class="dbg-frame-scroll"><table class="dbg-frame-table vt-debug-table"><thead><tr><th class="dbg-row-label">Banda cents</th>${headers}</tr></thead><tbody>${tableRows}</tbody></table></div>
      </section>
      <section class="dbg-section"><div class="dbg-section-title">Análisis compartido de Módulos 2 y 4</div><div class="dbg-kv-grid">${detailRows}</div></section>`;

    this.lastDebugHtml = html;
    if (this.debugLargeBody) this.debugLargeBody.innerHTML = html;
    this.syncDebugPopupWindow();
  }

  // Posición diatónica continua (0 = Do4) para dibujar la altura real cantada
  voiceTestStepFloat(midi) {
    const naturals = [0, 2, 4, 5, 7, 9, 11, 12];
    const octave = Math.floor(midi / 12);
    const pc = midi - octave * 12;
    let i = 0;
    while (i < 6 && pc >= naturals[i + 1]) i++;
    return (octave - 5) * 7 + i + (pc - naturals[i]) / (naturals[i + 1] - naturals[i]);
  }

  drawVoiceTestStaff() {
    const canvas = this.vtCanvas;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cssW, cssH);

    const hs = 6.0;
    const stepToY = (step) => cssH / 2 - step * hs;
    const left = 2;
    const right = cssW - 2;
    const noteX = left + 64;
    const curveStart = noteX + 27;
    const curveEnd = right - 8;

    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 1;
    [2, 4, 6, 8, 10, -2, -4, -6, -8, -10].forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(left, stepToY(s));
      ctx.lineTo(right, stepToY(s));
      ctx.stroke();
    });
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(left, stepToY(10));
    ctx.lineTo(left, stepToY(-10));
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '40px serif';
    ctx.fillText('𝄞', left + 4, stepToY(5));
    ctx.font = '33px serif';
    ctx.fillText('𝄢', left + 5, stepToY(-5));

    const vt = this.voiceTest;
    if (vt?.midi == null) return;

    const pos = this.midiToGrandStaffStep(vt.midi);
    const noteY = stepToY(pos.step);

    // Líneas adicionales para notas fuera de los pentagramas
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.2;
    const ledgers = [];
    if (pos.step >= 12) for (let s = 12; s <= pos.step; s += 2) ledgers.push(s);
    if (pos.step <= -12) for (let s = -12; s >= pos.step; s -= 2) ledgers.push(s);
    if (pos.step >= -1 && pos.step <= 1) ledgers.push(0);
    ledgers.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(noteX - 12, stepToY(s));
      ctx.lineTo(noteX + 12, stepToY(s));
      ctx.stroke();
    });

    ctx.save();
    ctx.translate(noteX, noteY);
    ctx.rotate(-0.25);
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(0, 0, 7.4, 5.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Plica hacia el centro del sistema para que no se salga del lienzo
    const stemUp = (pos.step >= 0 && pos.step < 6) || pos.step <= -6;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    if (stemUp) {
      ctx.moveTo(noteX + 6.9, noteY);
      ctx.lineTo(noteX + 6.9, noteY - 30);
    } else {
      ctx.moveTo(noteX - 6.9, noteY);
      ctx.lineTo(noteX - 6.9, noteY + 30);
    }
    ctx.stroke();

    if (pos.isSharp) {
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('♯', noteX - 11, noteY);
    }

    // Línea guía de la nota objetivo
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(noteX + 12, noteY);
    ctx.lineTo(curveEnd, noteY);
    ctx.stroke();
    ctx.setLineDash([]);

    const frames = vt.frames;
    if (!Array.isArray(frames) || frames.length === 0) return;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let prev = null;
    frames.forEach((m, i) => {
      if (m === null) {
        prev = null;
        return;
      }
      const x = curveStart + (frames.length > 1 ? i / (frames.length - 1) : 0) * (curveEnd - curveStart);
      const y = Math.max(4, Math.min(cssH - 4, stepToY(this.voiceTestStepFloat(m))));
      const dev = Math.abs(m - vt.midi);
      const color = dev <= 0.4 ? '#10b981' : dev <= 0.8 ? '#f59e0b' : '#ef4444';
      if (prev) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      prev = { x, y };
    });
  }

  navigateTo(viewKey) {
    if (!VIEWS[viewKey]) return;
    this.currentView = viewKey;
    this.menuDrawer.classList.add('hidden');

    if (viewKey !== 'settings') {
      this.stopSettingsMicTools();
    }
    if (viewKey !== 'voice-test') {
      this.stopVoiceTest();
    }

    const isExerciseView =
      viewKey === 'interval-exercise' || viewKey === 'singing-exercise' || viewKey === 'chord-exercise';

    if (!isExerciseView) {
      if (this.delayedPlayTimer) {
        clearTimeout(this.delayedPlayTimer);
        this.delayedPlayTimer = null;
      }
      if (this.autoNextTimer) {
        clearTimeout(this.autoNextTimer);
        this.autoNextTimer = null;
      }
      this.stopSingingSequence();
      if (viewKey !== 'settings') {
        this.releaseMicStream();
      }
      if (this.startModal) {
        this.startModal.classList.add('hidden');
      }
    }

    if (viewKey === 'intervals') {
      this.renderIntervalLevels();
    } else if (viewKey === 'singing') {
      this.renderSingingLevels();
    } else if (viewKey === 'chords') {
      this.renderChordLevels();
    } else if (viewKey === 'stats') {
      this.showStatsMenu();
    }

    Object.keys(VIEWS).forEach((key) => {
      const el = document.getElementById(VIEWS[key].id);
      if (el) {
        el.classList.toggle('hidden', key !== viewKey);
      }
    });

    document.querySelectorAll('[data-target]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-target') === viewKey);
    });

    if (viewKey === 'voice-test') {
      this.onEnterVoiceTest();
    }

    this.renderBottomCommands(viewKey);
  }

  renderBottomCommands(viewKey) {
    if (viewKey === 'home') {
      this.bottomZone.innerHTML = this.currentUser?.verificado ? '' : `
        <div class="auth-bottom-cta">
          <p class="auth-bottom-copy">Al activar tu cuenta podrás guardar tu historial y consultar tus estadísticas.</p>
          <button type="button" class="auth-activate-btn" id="btn-open-auth-modal">Activar cuenta</button>
        </div>
      `;
      return;
    }

    if (viewKey === 'stats' && this.activeStatsReport) {
      this.bottomZone.innerHTML = `
        <button type="button" class="cmd-btn" id="cmd-back-stats-menu">← Volver a Estadísticas</button>
      `;
      document.getElementById('cmd-back-stats-menu')?.addEventListener('click', () => {
        this.showStatsMenu();
      });
      return;
    }

    if (viewKey === 'interval-exercise' || viewKey === 'singing-exercise' || viewKey === 'chord-exercise') {
      const backTarget = viewKey === 'singing-exercise'
        ? 'singing'
        : viewKey === 'chord-exercise' ? 'chords' : 'intervals';
      this.bottomZone.innerHTML = `
        <button type="button" class="cmd-btn" id="cmd-back-levels">← Niveles</button>
        ${this.exerciseStarted ? '<button type="button" class="cmd-btn" id="cmd-play-interval" aria-label="Repetir ejercicio" title="Repetir ejercicio">↻ Repetir</button>' : ''}
        <button type="button" class="cmd-btn ${this.exerciseStarted ? 'cmd-btn-primary' : 'cmd-btn-start'}" id="cmd-next-interval">${this.exerciseStarted ? 'Siguiente ⏭' : 'Comenzar'}</button>
      `;

      document.getElementById('cmd-back-levels').addEventListener('click', () => {
        this.navigateTo(backTarget);
      });

      document.getElementById('cmd-play-interval')?.addEventListener('click', () => {
        this.playCurrentInterval();
      });

      document.getElementById('cmd-next-interval').addEventListener('click', async () => {
        if (!this.exerciseStarted) {
          this.exerciseStarted = true;
          this.syncExerciseAvailability();
          this.renderBottomCommands(viewKey);
          if (this.activeModule === 'singing') await this.ensureMicStreamReady();
        } else {
          this.generateNextQuestion();
        }
        this.schedulePlayAfterOneSecond();
      });
      return;
    }

    this.bottomZone.innerHTML = `
      <button type="button" class="cmd-btn" data-cmd-nav="home">← Volver al Inicio</button>
    `;

    this.bottomZone.querySelectorAll('[data-cmd-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.navigateTo(btn.getAttribute('data-cmd-nav'));
      });
    });
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.trinoShell = new TrinoShell();
  });
} else {
  window.trinoShell = new TrinoShell();
}
