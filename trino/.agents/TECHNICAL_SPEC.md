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
