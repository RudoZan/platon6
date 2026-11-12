# Technical Specification — `trino`
> **Target App Language:** Spanish.

## 1. Tech Stack
- **Frontend (Static / GitHub Pages compatible):** HTML5, CSS3, ES6+ JS / TypeScript, `Web Audio API`, `Web Workers`, `HTML5 Canvas 2D`.
- **Engine 1 (In-Browser DSP):** Time-domain **MPM (McLeod Pitch Method)** or **YIN / pYIN** inside a `Web Worker` (`30–200 ms` per `8s` audio), sliding window `5–10 ms` (`~800–1600` points), RMS silence threshold, and median filter.
- **Engine 2 (Optional Local Backend):** Python 3.10+, **FastAPI** (`http://127.0.0.1:8000`), **`praat-parselmouth`** and/or **`librosa.pyin`** (Viterbi decoding), processing `16-bit` mono WAV (`~705 KB` / `8s`) in `0.3–1.5 s`.

## 2. Audio Capture Configuration
- `navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1, sampleRate: 44100 } })`.

## 3. Musical Math Formulas
- **Continuous MIDI note ($m$) from frequency $f$ (Hz):**
  $$m = 69 + 12 \cdot \log_2\left(\frac{f}{440}\right)$$
- **Nearest MIDI note ($N$):** $N = \text{round}(m)$
- **Cents deviation ($\Delta_{\text{cents}}$) from target note $N_{\text{obj}}$:**
  $$\Delta_{\text{cents}} = (m - N_{\text{obj}}) \times 100$$

## 4. Data Contract (`AnalysisResult`)
- `engine`: `"browser-mpm"` | `"python-praat"`
- `sampleRate`: `44100` | `48000`
- `durationSec`: `number` (default `8.0`)
- `targetMidi`: `number` (e.g. `69`), `targetNote`: `string` (`"A4"`), `targetHz`: `number` (`440.0`), `toleranceCents`: `number` (`20`)
- `frames[]`: `{ t, hz, midi, cents, rms, voiced }`
- `metrics`: `{ tuningAccuracyPct, meanTendencyCents, stabilitySdCents, attackTimeMs, vocalQuality?: { jitterPct, shimmerPct, hnrDb } }`

## 5. 14-Level Pedagogical Progression (`INTERVAL_LEVELS` & `SINGING_LEVELS`)
| Block | Level | Intervals (`options`) | Tonic (`midi1`) & 2nd Note (`midi2`) Rule |
|---|---|---|---|
| **1. Major & Perfect Pillars** *(0% sharps in both notes)* | **1** | `1J`, `2M` | Tonics `Do, Re, Sol` (Octaves 3 & 4) → both notes natural (`Do–Do/Re`, `Re–Re/Mi`, `Sol–Sol/La`) |
| **1. Major & Perfect Pillars** *(0% sharps in both notes)* | **2** | `1J`, `2M`, `3M` | Tonics `Do, Re, Fa, Sol` (Octaves 3 & 4) → both notes natural (`3M`: `Do–Mi`, `Fa–La`, `Sol–Si`) |
| **1. Major & Perfect Pillars** *(0% sharps in both notes)* | **3** | `1J`, `2M`, `3M`, `5J` | Tonics `Do, Re, Fa, Sol` (Octaves 3 & 4) → both notes natural (`5J`: `Do–Sol`, `Re–La`, `Fa–Do`, `Sol–Re`) |
| **1. Major & Perfect Pillars** *(0% sharps in both notes)* | **4** | `1J`, `2M`, `3M`, `4J`, `5J`, `8J` | Tonics `Do, Re, Mi, Fa, Sol, La` (Octaves 3 & 4) → both notes natural (no `♯` in 1st or 2nd note) |
| **2. Minor vs. Major (Short)** *(Natural tonics, free 2nd note)* | **5** | `1J`, `2m`, `2M` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **2. Minor vs. Major (Short)** *(Natural tonics, free 2nd note)* | **6** | `1J`, `2m`, `2M`, `3m`, `3M` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **2. Minor vs. Major (Short)** *(Natural tonics, free 2nd note)* | **7** | `1J`, `2m`, `2M`, `3m`, `3M`, `4J`, `5J` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **3. Confusable & Wide** *(Natural tonics, free 2nd note)* | **8** | `4J`, `4A` (Tritono), `5J` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **3. Confusable & Wide** *(Natural tonics, free 2nd note)* | **9** | `5J`, `6m`, `6M` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **3. Confusable & Wide** *(Natural tonics, free 2nd note)* | **10** | `7m`, `7M`, `8J` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **3. Confusable & Wide** *(Natural tonics, free 2nd note)* | **11** | `5J`, `6m`, `6M`, `7m`, `7M`, `8J` | Tonic: any of the 7 C-Major natural notes (`Do..Si`, `MIDI 48–64`); 2nd note: chromatic (`♯` allowed) |
| **4. Full Integration** *(All 12 chromatic notes)* | **12** | `1J`, `2M`, `3M`, `4J`, `5J`, `6M`, `7M`, `8J` | 1 Octave (`Do4–Do5`): all 12 chromatic notes allowed as tonic & 2nd note |
| **4. Full Integration** *(All 12 chromatic notes)* | **13** | All 13 (`1J`..`8J` incl. `4A`) | 1 Octave (`Do4–Do5`): all 12 chromatic notes allowed as tonic & 2nd note |
| **4. Full Integration** *(All 12 chromatic notes)* | **14** | All 13 (`1J`..`8J` incl. `4A`) | 2 Octaves (`Do3–Do5`): all 12 chromatic notes allowed as tonic & 2nd note |

## 6. Settings (`#view-settings`)
- **Daily Goal (`dailyMin`):** `10..100` (default `100` exercises/day for both modules).
- **Vocal Range (`vocalMinMidi`, `vocalMaxMidi`):** Presets (`Bajo`..`Soprano`) + individual `Do2..Do6` selectors with `🔊` tone preview and `🎙️` `2.5s` voice pitch detection (`detectVocalLimitByVoice`). Adapts Module 2 (`singing`) note generation to stay within `[vocalMinMidi, vocalMaxMidi]`.
- **Live Microphone Tester (`toggleMicTester`):** Real-time RMS input bar + YIN live tuner (`note`, `Hz`, `cents`).
- **Audio Volume (`noteVolume`, `clickVolume`):** `10%–100%` sliders with `🔊` preview for note synthesis and metronome clicks.

## 7. Cloud Account & 3-Note Verification (Supabase)
- **Home Greeting (`#view-home`):** Guest mode shows practice copy and a bottom-bar `Activar cuenta` action that currently opens an unavailable-activation notice; verified users see `¡Hola, (nombre)!`.
- **3-Note Verification (`#auth-modal`):** Step 1 collects `nombre` + `email` (unique user identifier). Step 2 displays 7 natural note buttons (`Do..Si`) and 3 slots; auto-validates upon entering the 3rd note.
- **Active Supabase Table (Phase 1 — User Registration):**
  - `public.trino_usuarios`: `id` (`uuid` PK), `email` (`text` UNIQUE), `nombre` (`text`), `fecha_inicio` (`timestamptz`), `verificado` (`boolean`), `codigo_notas` (`text`), `configuracion` (`jsonb`: `{ dailyMin, singBpm, vocalMinMidi, vocalMaxMidi, noteVolume, clickVolume }`).
- **Planned Module & Note Tables (Phase 2 — Pending Definition):**
  - `public.trino_modulo_intervalos`: Module 1 exercise/daily summary.
  - `public.trino_modulo_canto`: Exercise summary (`bueno`/`regular`/`malo`) + compact score JSON (numbered notes & rests, exact pitch+octave, musical figure/duration).
  - `public.trino_notas_cantadas` (shared across vocal modules): `modulo`, `ejercicio_id`, `numero_nota`, `nota_objetivo`, `nota_cantada`, `centro_tonal`, `tipo_voz` (`plana`/`vibrato`/`inestable`), `glisando` (`boolean`), `clasificacion` (`malo`/`regular`/`aceptable`/`bueno`/`admirable`).

## 8. Chord Recognition Module
- `CHORD_CATALOG` contains dyads, triads, and seventh chords as semitone offsets from a root. `CHORD_LEVELS` defines 16 levels: 6 dyad levels, 4 triad levels, 4 seventh-chord levels, and 2 mixed integration levels.
- Dyads sound as ascending notes; triads and seventh chords sound simultaneously using Web Audio oscillators scheduled at one `AudioContext.currentTime`. Per-tone gain is scaled by `1 / sqrt(noteCount)`.
- Each chord question stores its target ID, root MIDI, MIDI pitches, and answered state. Level options supply answer buttons; optional `targets` narrows generated questions while retaining distractor choices.
- Chord outcomes are stored separately under `trino_chord_progress_v1`; day logs use the `chords` namespace in `trino_day_logs_v1`. The independent `dailyChordsMin` setting defaults to `100` and is bounded to `10..200` in increments of `10`.

## 9. Independent Daily Goals & Settings Layout
- Daily goals are independently persisted as `dailyIntervalsMin`, `dailySingingMin`, and `dailyChordsMin`; older `dailyMin` settings remain a migration/cloud fallback.
- Vocal min/max MIDI selectors span their settings field. Microphone detection and speaker preview actions render on a separate row below each selector for mobile usability.

## 10. Voice Test Module (`#view-voice-test`)
- Keyboard: `VOICE_TEST_MIN_MIDI=36` (C2) to `VOICE_TEST_MAX_MIDI=84` (C6), white keys `46 px`, black keys `30 px`; keys use pointer events with capture and release on `pointerup`/`pointercancel`/`lostpointercapture`/window blur.
- Playback: `startHeldTone(hz)` sustains a triangle oscillator while the key is held (`noteVolume`), with a short release.
- Recording (`#vt-record-select`): `none`, `1`–`5` seconds, or `silence`. Capture starts `150 ms` after release via `ScriptProcessor` using the shared mic stream. `silence` stops after `0.6 s` below RMS `0.015` once sound was heard, after `6 s` without sound, or at `10 s`.
- Analysis: Modules 2 and 4 share `buildNoteAnalysis`/`analyzeVoiceShape`; Module 2 passes each segmented expected-note take, Module 4 passes the whole recording. The tonal median is computed first, and vibrato/glissando deviations are measured against that center. Original `null` silence frames and time indices are retained for temporal peak/period analysis.
- Tonal-center label: show signed cents through +/-200c; beyond that, show only `Muy alto` or `Muy bajo`. Debug retains the full signed cents value.
- Vibrato: analyze with >=18 voiced frames; detect alternating local extrema; require >=3 complete cycles (four same-sign extrema), each half-cycle >=50 cents peak-to-peak, 4–8 Hz measured same-sign peak to same-sign peak, and initial period CV <=0.35. This CV is a tunable product threshold, not a universal physiological boundary.
- Glissando: >=20 voiced frames; 3-frame moving median that preserves one output per frame; onset >=60 cents from the whole-take tonal median; generally convergent trajectory; settle within +/-30 cents for 9 consecutive voiced frames. Glissando frames remain part of the tonal median.
- Optional `rectifyVibrato` setting (default off) aligns opposite cycle halves by phase and averages their cents relative to target. When enabled with detected vibrato, only tuning grade/buckets use the rectified series; tonal center, voice-shape detections, and debug retain raw data.
- Debug: Module 4 exposes the shared floating debug view. Its frame matrix uses the same 21 cents bands/colors as `docs/trino/TablaDeValores.md`, with one column per original frame, signed target cents in the active cell, peak markers, and analysis diagnostics.
- Grade buckets: admirable ≤15c, bueno ≤20c, aceptable ≤40c, regular ≤80c, fallido >80c; admirable/bueno hidden when 0 %.
- Staff canvas: `208 px` high, `6.0 px` per diatonic step; the recording bar overlays the analysis area; keyboard is `110 px` high with a dark-red `2 px` strip above the keys; sung pitch is drawn at its real height via `voiceTestStepFloat`. No persistence or history; state lives in `this.voiceTest`.
- Cache keys: HTML loads `styles.css?v=56` and `app.js?v=65`; `APP_VERSION` is `v1.0.0048`.
