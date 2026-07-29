// sitio-web/ideasSueltas/laFabricaDelCalculo/script.js

// Banco de Datos por Tipo de Fábrica y Nivel
const BANCOS = {
  derivadas: [
    // Ronda 1
    [
      { f: "x²", target: "2x", tipo: "derivada" },
      { f: "x³", target: "3x²", tipo: "derivada" },
      { f: "4x + 5", target: "4", tipo: "derivada" },
      { f: "2x²", target: "4x", tipo: "derivada" },
      { f: "x³ - 2x", target: "3x² - 2", tipo: "derivada" },
      { f: "5x² + 3", target: "10x", tipo: "derivada" },
      { f: "x⁴", target: "4x³", tipo: "derivada" },
      { f: "7x - 9", target: "7", tipo: "derivada" }
    ],
    // Ronda 2+
    [
      { f: "x⁵", target: "5x⁴", tipo: "derivada" },
      { f: "3x⁴ - 2x", target: "12x³ - 2", tipo: "derivada" },
      { f: "x³ + x²", target: "3x² + 2x", tipo: "derivada" },
      { f: "sin(x)", target: "cos(x)", tipo: "derivada" },
      { f: "cos(x)", target: "-sin(x)", tipo: "derivada" },
      { f: "eˣ", target: "eˣ", tipo: "derivada" },
      { f: "ln(x)", target: "1/x", tipo: "derivada" },
      { f: "6x³ - 4x", target: "18x² - 4", tipo: "derivada" }
    ]
  ],

  integrales: [
    // Ronda 1
    [
      { f: "2x", target: "x²", tipo: "integral" },
      { f: "3x²", target: "x³", tipo: "integral" },
      { f: "4", target: "4x", tipo: "integral" },
      { f: "4x", target: "2x²", tipo: "integral" },
      { f: "3x² - 2", target: "x³ - 2x", tipo: "integral" },
      { f: "10x", target: "5x²", tipo: "integral" },
      { f: "4x³", target: "x⁴", tipo: "integral" },
      { f: "7", target: "7x", tipo: "integral" }
    ],
    // Ronda 2+
    [
      { f: "cos(x)", target: "sin(x)", tipo: "integral" },
      { f: "sin(x)", target: "-cos(x)", tipo: "integral" },
      { f: "eˣ", target: "eˣ", tipo: "integral" },
      { f: "1/x", target: "ln(x)", tipo: "integral" },
      { f: "5x⁴", target: "x⁵", tipo: "integral" },
      { f: "3 cos(x)", target: "3 sin(x)", tipo: "integral" },
      { f: "2 eˣ", target: "2 eˣ", tipo: "integral" },
      { f: "6x²", target: "2x³", tipo: "integral" }
    ]
  ],

  doble_derivada: [
    // Ronda 1
    [
      { f: "x³", target: "6x", tipo: "doble_derivada" },
      { f: "x⁴", target: "12x²", tipo: "doble_derivada" },
      { f: "2x³ + 4x²", target: "12x + 8", tipo: "doble_derivada" },
      { f: "x⁵", target: "20x³", tipo: "doble_derivada" },
      { f: "5x³ - 3x", target: "30x", tipo: "doble_derivada" },
      { f: "x⁶", target: "30x⁴", tipo: "doble_derivada" },
      { f: "3x⁴ + 2", target: "36x²", tipo: "doble_derivada" },
      { f: "4x³ - 5x²", target: "24x - 10", tipo: "doble_derivada" }
    ],
    // Ronda 2+
    [
      { f: "sin(x)", target: "-sin(x)", tipo: "doble_derivada" },
      { f: "cos(x)", target: "-cos(x)", tipo: "doble_derivada" },
      { f: "e²ˣ", target: "4 e²ˣ", tipo: "doble_derivada" },
      { f: "3 sin(x)", target: "-3 sin(x)", tipo: "doble_derivada" },
      { f: "x⁷", target: "42x⁵", tipo: "doble_derivada" },
      { f: "e³ˣ", target: "9 e³ˣ", tipo: "doble_derivada" }
    ]
  ]
};

// ══════════════════════════════════════
// Sonidos (sintetizados con Web Audio API, sin archivos externos)
// ══════════════════════════════════════
let audioCtx = null;

function obtenerAudioCtx() {
  if (!audioCtx) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return null;
    audioCtx = new AudioContextCtor();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function reproducirTono({ frecuencia, duracion = 0.15, tipo = 'sine', volumen = 0.2, retardo = 0, deslizarA = null }) {
  if (!estado.sonidoActivo) return;

  const ctx = obtenerAudioCtx();
  if (!ctx) return;

  const inicio = ctx.currentTime + retardo;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, inicio);
  if (deslizarA) {
    osc.frequency.exponentialRampToValueAtTime(deslizarA, inicio + duracion);
  }

  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(volumen, inicio + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, inicio + duracion);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(inicio);
  osc.stop(inicio + duracion + 0.02);
}

function reproducirSecuencia(notas) {
  notas.forEach(reproducirTono);
}

function sonidoDespachoCorrecto() {
  reproducirSecuencia([
    { frecuencia: 523.25, duracion: 0.11, tipo: 'triangle', volumen: 0.22 },
    { frecuencia: 659.25, duracion: 0.11, tipo: 'triangle', volumen: 0.22, retardo: 0.09 },
    { frecuencia: 783.99, duracion: 0.18, tipo: 'triangle', volumen: 0.24, retardo: 0.18 }
  ]);
}

function sonidoDespachoIncorrecto() {
  reproducirTono({ frecuencia: 220, deslizarA: 110, duracion: 0.28, tipo: 'sawtooth', volumen: 0.18 });
}

function sonidoBasuraChica() {
  reproducirTono({ frecuencia: 300, deslizarA: 180, duracion: 0.12, tipo: 'square', volumen: 0.12 });
}

function sonidoBasuraCaja() {
  reproducirTono({ frecuencia: 200, deslizarA: 90, duracion: 0.22, tipo: 'square', volumen: 0.16 });
}

function sonidoFuga() {
  reproducirSecuencia([
    { frecuencia: 400, deslizarA: 250, duracion: 0.15, tipo: 'sawtooth', volumen: 0.16 },
    { frecuencia: 350, deslizarA: 200, duracion: 0.15, tipo: 'sawtooth', volumen: 0.14, retardo: 0.1 }
  ]);
}

function sonidoColocar() {
  reproducirTono({ frecuencia: 660, duracion: 0.08, tipo: 'sine', volumen: 0.14 });
}

function sonidoRechazo() {
  reproducirTono({ frecuencia: 140, duracion: 0.1, tipo: 'square', volumen: 0.15 });
}

function sonidoRonda() {
  reproducirSecuencia([
    { frecuencia: 523.25, duracion: 0.12, tipo: 'triangle', volumen: 0.2 },
    { frecuencia: 659.25, duracion: 0.12, tipo: 'triangle', volumen: 0.2, retardo: 0.11 },
    { frecuencia: 783.99, duracion: 0.12, tipo: 'triangle', volumen: 0.2, retardo: 0.22 },
    { frecuencia: 1046.5, duracion: 0.3, tipo: 'triangle', volumen: 0.24, retardo: 0.33 }
  ]);
}

function sonidoGameOver() {
  reproducirSecuencia([
    { frecuencia: 300, duracion: 0.25, tipo: 'sawtooth', volumen: 0.2 },
    { frecuencia: 220, duracion: 0.25, tipo: 'sawtooth', volumen: 0.2, retardo: 0.22 },
    { frecuencia: 150, duracion: 0.5, tipo: 'sawtooth', volumen: 0.22, retardo: 0.44 }
  ]);
}

function sonidoInicio() {
  reproducirSecuencia([
    { frecuencia: 392.00, duracion: 0.1, tipo: 'triangle', volumen: 0.18 },
    { frecuencia: 523.25, duracion: 0.1, tipo: 'triangle', volumen: 0.18, retardo: 0.1 },
    { frecuencia: 659.25, duracion: 0.1, tipo: 'triangle', volumen: 0.18, retardo: 0.2 },
    { frecuencia: 783.99, duracion: 0.1, tipo: 'triangle', volumen: 0.2, retardo: 0.3 },
    { frecuencia: 1046.50, duracion: 0.3, tipo: 'triangle', volumen: 0.24, retardo: 0.42 }
  ]);
}

// Estado Global del Juego
const estado = {
  modo: null, // 'derivadas', 'integrales', 'mixta', 'doble_derivada'
  ronda: 1,
  puntaje: 0,
  puntosMalos: 0,
  maxPuntosMalos: 10,
  cajasTotalesRonda: 8,
  cajasProcesadasRonda: 0,
  velocidadBaseCinta: 0.425, // Reducida a la mitad (antes 0.85)
  velocidadActual: 0.425,
  multiplicadorVelocidad: 1, // Palanca 1x / 2x / 3x
  pausado: true,
  cargandoTubosIniciales: false,
  itemsColaCinta: [],
  cajasEnCinta: [],
  tubos: [null, null, null, null, null, null],
  elementoArrastrado: null, // Puede ser { tipo: 'funcion_tubo' | 'caja_cinta' | 'constante' }
  sonidoActivo: true
};

// Referencias DOM
const dom = {
  headerGame: document.getElementById('header-game'),
  tituloFabrica: document.getElementById('titulo-fabrica'),
  hudStats: document.getElementById('hud-stats'),
  pantallaPortada: document.getElementById('pantalla-portada'),
  pantallaJuego: document.getElementById('pantalla-juego'),
  rondaVal: document.getElementById('ronda-val'),
  puntajeVal: document.getElementById('puntaje-val'),
  puntosMalosVal: document.getElementById('puntos-malos-val'),
  puntosMalosDots: document.getElementById('puntos-malos-dots'),
  tubosContainer: document.getElementById('tubos-grid'),
  cintaContainer: document.getElementById('cinta-container'),
  dispenserConstante: document.getElementById('dispenser-constante'),
  zonaDespacho: document.getElementById('zona-despacho'),
  zonaBasura: document.getElementById('zona-basura'),
  modalInstrucciones: document.getElementById('modal-instrucciones'),
  modalPausa: document.getElementById('modal-pausa'),
  modalRonda: document.getElementById('modal-ronda'),
  modalGameOver: document.getElementById('modal-gameover'),
  rondaNumModal: document.getElementById('ronda-num-modal'),
  puntosRecuperadosModal: document.getElementById('puntos-recuperados-modal'),
  puntajeFinalGameOver: document.getElementById('puntaje-final-gameover'),
  btnCambiarFabrica: document.getElementById('btn-cambiar-fabrica'),
  btnInstruccionesHdr: document.getElementById('btn-instrucciones-hdr'),
  btnPausa: document.getElementById('btn-pausa'),
  btnReanudar: document.getElementById('btn-reanudar'),
  btnComenzarJuego: document.getElementById('btn-comenzar-juego'),
  btnSiguienteRonda: document.getElementById('btn-siguiente-ronda'),
  btnReiniciar: document.getElementById('btn-reiniciar'),
  switchFx: document.getElementById('switch-fx'),
  velocidadControl: document.getElementById('velocidad-control')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initHUD();
  setupPortadaEvents();
  setupHUDButtons();
  setupZonasTargets();
  setupControlFx();
  setupControlVelocidad();
  gameLoop();
});

function initHUD() {
  dom.puntosMalosDots.innerHTML = '';
  for (let i = 0; i < estado.maxPuntosMalos; i++) {
    const dot = document.createElement('div');
    dot.className = 'punto-malo-dot';
    dom.puntosMalosDots.appendChild(dot);
  }
}

function setupPortadaEvents() {
  document.querySelectorAll('.modo-card').forEach(card => {
    card.addEventListener('click', () => {
      const modo = card.dataset.modo;
      seleccionarModoFábrica(modo);
    });
  });
}

// Descarta por completo la partida anterior (cinta, tubos, cola, ronda y puntajes)
// para que elegir una nueva fábrica siempre arranque desde cero.
function reiniciarEstadoRonda() {
  estado.pausado = true;
  dom.cintaContainer.querySelectorAll('.caja-funcion').forEach(el => el.remove());
  estado.cajasEnCinta = [];
  estado.itemsColaCinta = [];
  estado.tubos = [null, null, null, null, null, null];
  estado.cargandoTubosIniciales = false;
  estado.cajasProcesadasRonda = 0;
  estado.cajasTotalesRonda = 8;
  estado.ronda = 1;
  estado.puntaje = 0;
  estado.puntosMalos = 0;
  renderizarTubos();
  actualizarHUD();
}

function seleccionarModoFábrica(modo) {
  obtenerAudioCtx(); // Desbloquear audio en el primer gesto del usuario
  reiniciarEstadoRonda(); // Salir del juego anterior por completo antes de empezar el nuevo
  estado.modo = modo;
  dom.pantallaPortada.style.display = 'none';
  dom.pantallaJuego.style.display = 'flex';
  dom.hudStats.style.display = 'flex';

  let titulo = "🏭 La Fábrica de Cálculo";
  if (modo === 'derivadas') titulo = "⚡ Fábrica de Derivadas";
  if (modo === 'integrales') titulo = "🔄 Fábrica de Integrales";
  if (modo === 'mixta') titulo = "🔀 Fábrica Mixta";
  if (modo === 'doble_derivada') titulo = "⏩ Fábrica de Doble Derivada";
  dom.tituloFabrica.textContent = titulo;

  if (modo === 'integrales' || modo === 'mixta') {
    dom.dispenserConstante.classList.remove('caja-constante--oculta');
    setupConstanteDrag();
  } else {
    dom.dispenserConstante.classList.add('caja-constante--oculta');
  }

  // Abrir Modal de Instrucciones antes de iniciar
  dom.modalInstrucciones.classList.add('activo');
  estado.pausado = true;
}

function setupConstanteDrag() {
  dom.dispenserConstante.addEventListener('dragstart', (e) => {
    estado.elementoArrastrado = { tipo: 'constante', target: '+C' };
    e.dataTransfer.setData('text/plain', '+C');
  });

  // Touch support para +C
  dom.dispenserConstante.addEventListener('touchstart', (e) => {
    estado.elementoArrastrado = { tipo: 'constante', target: '+C' };
  }, { passive: true });
}

function setupHUDButtons() {
  dom.btnCambiarFabrica.addEventListener('click', () => {
    estado.pausado = true;
    dom.pantallaJuego.style.display = 'none';
    dom.hudStats.style.display = 'none';
    dom.pantallaPortada.style.display = 'flex';
  });

  dom.btnInstruccionesHdr.addEventListener('click', () => {
    estado.pausado = true;
    dom.modalInstrucciones.classList.add('activo');
  });

  dom.btnComenzarJuego.addEventListener('click', () => {
    dom.modalInstrucciones.classList.remove('activo');
    if (estado.cajasEnCinta.length === 0 && estado.cajasProcesadasRonda === 0) {
      sonidoInicio();
      iniciarRonda(1);
    } else {
      estado.pausado = false;
    }
  });

  dom.btnPausa.addEventListener('click', () => {
    estado.pausado = true;
    dom.modalPausa.classList.add('activo');
  });

  dom.btnReanudar.addEventListener('click', () => {
    dom.modalPausa.classList.remove('activo');
    estado.pausado = false;
  });
}

function setupControlFx() {
  dom.switchFx.addEventListener('change', () => {
    estado.sonidoActivo = dom.switchFx.checked;
    if (estado.sonidoActivo) {
      obtenerAudioCtx();
      sonidoColocar();
    }
  });
}

function setupControlVelocidad() {
  dom.velocidadControl.querySelectorAll('.velocidad-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      estado.multiplicadorVelocidad = Number(btn.dataset.mult);
      dom.velocidadControl.querySelectorAll('.velocidad-btn').forEach(b => {
        b.classList.toggle('activo', b === btn);
      });
    });
  });
}

// Muestra un número flotante (verde si es positivo, rojo si es negativo) en las
// coordenadas de pantalla indicadas, cerca de donde se generó el cambio de puntaje.
function mostrarPuntajeFlotante(valor, xClient, yClient) {
  const contenedor = dom.pantallaJuego;
  const rectContenedor = contenedor.getBoundingClientRect();

  const el = document.createElement('div');
  el.className = `puntaje-flotante ${valor >= 0 ? 'positivo' : 'negativo'}`;
  el.textContent = `${valor > 0 ? '+' : ''}${valor}`;
  el.style.left = `${xClient - rectContenedor.left}px`;
  el.style.top = `${yClient - rectContenedor.top}px`;

  contenedor.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function actualizarHUD() {
  dom.rondaVal.textContent = estado.ronda;
  dom.puntajeVal.textContent = estado.puntaje;
  dom.puntosMalosVal.textContent = `${estado.puntosMalos}/${estado.maxPuntosMalos}`;

  const dots = dom.puntosMalosDots.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('activo', i < estado.puntosMalos);
  }

  if (estado.puntosMalos >= estado.maxPuntosMalos) {
    dispararGameOver();
  }
}

function iniciarRonda(numeroRonda) {
  estado.ronda = numeroRonda;
  estado.cajasProcesadasRonda = 0;
  estado.cajasTotalesRonda = 8 + (numeroRonda - 1) * 2; // 8 en R1, 10 en R2, 12 en R3...

  if (numeroRonda > 3) {
    estado.velocidadActual = estado.velocidadBaseCinta + (numeroRonda - 3) * 0.175;
  } else {
    estado.velocidadActual = estado.velocidadBaseCinta;
  }

  // Limpiar cinta y garantizar tubos 100% vacíos al iniciar la ronda
  dom.cintaContainer.querySelectorAll('.caja-funcion').forEach(el => el.remove());
  estado.cajasEnCinta = [];
  estado.tubos = [null, null, null, null, null, null];
  estado.cargandoTubosIniciales = true;
  renderizarTubos();

  // Construir cola de ítems para la cinta según modo de juego
  const nivelIdx = Math.min(numeroRonda - 1, 1);
  estado.itemsColaCinta = [];

  for (let i = 0; i < estado.cajasTotalesRonda; i++) {
    let itemRandom;
    if (estado.modo === 'mixta') {
      // Alternar estrictamente entre derivadas e integrales en el modo mixto
      const pool = (i % 2 === 0) ? BANCOS.derivadas[nivelIdx] : BANCOS.integrales[nivelIdx];
      itemRandom = pool[Math.floor(Math.random() * pool.length)];
    } else {
      const poolNivel = obtenerPoolParaModo(estado.modo, numeroRonda);
      itemRandom = poolNivel[Math.floor(Math.random() * poolNivel.length)];
    }

    estado.itemsColaCinta.push({
      id: `caja_${numeroRonda}_${i}_${Date.now()}`,
      f: itemRandom.f,
      target: itemRandom.target,
      tipo: itemRandom.tipo,
      colocadoTarget: null,
      colocadoConstante: itemRandom.tipo !== 'integral', // Las no-integrales no requieren +C
      procesada: false
    });
  }

  actualizarHUD();
  estado.pausado = false;

  // REGLA: Al iniciar la ronda esperar 2 segundos y hacer caer las funciones al azar tubo por tubo (con 1 a 3s de diferencia)
  setTimeout(() => {
    lanzarCaidaInicialTubosEscalonada();
  }, 2000);
}

function lanzarCaidaInicialTubosEscalonada() {
  const poolActual = obtenerPoolParaModo(estado.modo, estado.ronda);
  const tubosOrden = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);

  let acumuladoMs = 0;
  let tubosProcesados = 0;

  tubosOrden.forEach((tuboIndex, idx) => {
    // Retardo aleatorio de 1 a 3 segundos entre cada tubo
    const pasoMs = 1000 + Math.floor(Math.random() * 2000);
    acumuladoMs += (idx === 0 ? 0 : pasoMs);

    setTimeout(() => {
      if (!estado.pausado) {
        const nuevo = generarDerivadaParaTubo(tuboIndex, poolActual);
        nuevo.esNuevo = true;
        estado.tubos[tuboIndex] = nuevo;
        asegurarCoincidenciaEnTubos(poolActual);
        renderizarTubos();
      }

      tubosProcesados++;
      if (tubosProcesados >= 6) {
        estado.cargandoTubosIniciales = false; // Finaliza la secuencia de carga inicial
      }
    }, acumuladoMs);
  });
}

function obtenerPoolParaModo(modo, numeroRonda) {
  const nivelIdx = Math.min(numeroRonda - 1, 1);
  if (modo === 'derivadas') return BANCOS.derivadas[nivelIdx];
  if (modo === 'integrales') return BANCOS.integrales[nivelIdx];
  if (modo === 'doble_derivada') return BANCOS.doble_derivada[nivelIdx];
  
  // Modo Mixto
  return [
    ...BANCOS.derivadas[nivelIdx],
    ...BANCOS.integrales[nivelIdx],
    ...BANCOS.doble_derivada[nivelIdx]
  ];
}

// Algoritmo de Tubos Garantizados
function llenarTubosGarantizados() {
  // Si estamos en medio de la secuencia inicial escalonada de la ronda, no llenar automáticamente en bloque
  if (estado.cargandoTubosIniciales) return;

  const poolActual = obtenerPoolParaModo(estado.modo, estado.ronda);

  for (let i = 0; i < 6; i++) {
    if (!estado.tubos[i]) {
      const nuevo = generarDerivadaParaTubo(i, poolActual);
      nuevo.esNuevo = true;
      estado.tubos[i] = nuevo;
    }
  }

  asegurarCoincidenciaEnTubos(poolActual);
  renderizarTubos();
}

function generarDerivadaParaTubo(tuboIndex, poolActual) {
  const item = poolActual[Math.floor(Math.random() * poolActual.length)];
  return {
    id: `deriv_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    target: item.target,
    tuboIndex: tuboIndex
  };
}

function asegurarCoincidenciaEnTubos(poolActual) {
  const funcionesVisibles = estado.cajasEnCinta
    .filter(c => !c.procesada && c.x < dom.cintaContainer.clientWidth)
    .map(c => c.item.target);

  if (funcionesVisibles.length === 0) return;

  const enTubos = estado.tubos.filter(t => t !== null).map(t => t.target);
  const tieneMatch = funcionesVisibles.some(dfVis => enTubos.includes(dfVis));

  if (!tieneMatch && funcionesVisibles.length > 0) {
    const targetNecesario = funcionesVisibles[Math.floor(Math.random() * funcionesVisibles.length)];

    // Priorizar tubos vacíos para no sobreescribir funciones ya caídas
    const tubosVacios = [];
    for (let i = 0; i < 6; i++) {
      if (estado.tubos[i] === null) tubosVacios.push(i);
    }

    let tuboTarget;
    if (tubosVacios.length > 0) {
      tuboTarget = tubosVacios[Math.floor(Math.random() * tubosVacios.length)];
    } else if (!estado.cargandoTubosIniciales) {
      tuboTarget = Math.floor(Math.random() * 6);
    } else {
      return; // Durante la carga inicial, nunca sobreescribir tubos ya ocupados
    }

    estado.tubos[tuboTarget] = {
      id: `deriv_force_${Date.now()}`,
      target: targetNecesario,
      tuboIndex: tuboTarget,
      esNuevo: true
    };
  }
}

function renderizarTubos() {
  dom.tubosContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const tuboEl = document.createElement('div');
    tuboEl.className = 'tubo-dispensador';

    const item = estado.tubos[i];
    if (item) {
      const cajaDeriv = document.createElement('div');
      cajaDeriv.className = 'caja-derivada';
      if (item.esNuevo) {
        cajaDeriv.classList.add('animar-caida');
        item.esNuevo = false;
      }
      cajaDeriv.textContent = item.target;
      cajaDeriv.draggable = true;

      setupDragEventsTubo(cajaDeriv, item);
      tuboEl.appendChild(cajaDeriv);
    }

    dom.tubosContainer.appendChild(tuboEl);
  }
}

function setupDragEventsTubo(el, item) {
  el.addEventListener('dragstart', (e) => {
    estado.elementoArrastrado = { tipo: 'funcion_tubo', item: item };
    el.classList.add('dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  });

  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
    estado.elementoArrastrado = null;
  });

  // Touch events
  el.addEventListener('touchstart', (e) => {
    estado.elementoArrastrado = { tipo: 'funcion_tubo', item: item };
    el.classList.add('dragging');
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    el.classList.remove('dragging');
    evaluarDropTouch(touch.clientX, touch.clientY);
    estado.elementoArrastrado = null;
  });
}

function setupZonasTargets() {
  // Configurar Despacho y Basura como objetivos Drop
  [dom.zonaDespacho, dom.zonaBasura].forEach(zona => {
    zona.addEventListener('dragover', (e) => {
      e.preventDefault();
      zona.classList.add('drag-over');
    });

    zona.addEventListener('dragleave', () => {
      zona.classList.remove('drag-over');
    });

    zona.addEventListener('drop', (e) => {
      e.preventDefault();
      zona.classList.remove('drag-over');
      evaluarDropEnZona(zona);
    });
  });
}

function evaluarDropEnZona(zonaEl) {
  if (!estado.elementoArrastrado) return;

  const esDespacho = zonaEl === dom.zonaDespacho;
  const esBasura = zonaEl === dom.zonaBasura;

  // CASO 1: Arrastrar función pequeña del tubo a la Basura (-1 pto malo)
  if (estado.elementoArrastrado.tipo === 'funcion_tubo' && esBasura) {
    const item = estado.elementoArrastrado.item;
    estado.puntosMalos += 1; // REGLA: Función pequeña a basura = -1
    const rectBasura = dom.zonaBasura.getBoundingClientRect();
    mostrarPuntajeFlotante(-1, rectBasura.left + rectBasura.width / 2, rectBasura.top);
    sonidoBasuraChica();
    estado.tubos[item.tuboIndex] = null;
    llenarTubosGarantizados();
    actualizarHUD();
    return;
  }

  // CASO 2: Arrastrar caja de la cinta a Despacho o Basura
  if (estado.elementoArrastrado.tipo === 'caja_cinta') {
    const cajaObj = estado.elementoArrastrado.cajaObj;

    if (esBasura) {
      // REGLA: Botar caja de la cinta a la basura (buena, mala o vacía) = -2 ptos malos
      estado.puntosMalos += 2;
      const rectBasura = dom.zonaBasura.getBoundingClientRect();
      mostrarPuntajeFlotante(-2, rectBasura.left + rectBasura.width / 2, rectBasura.top);
      sonidoBasuraCaja();
      removerCajaDeCinta(cajaObj);
      actualizarHUD();
      return;
    }

    if (esDespacho) {
      // Evaluar Despacho
      const esCorrecto = cajaObj.item.colocadoTarget === cajaObj.item.target && cajaObj.item.colocadoConstante;
      const rectDespacho = dom.zonaDespacho.getBoundingClientRect();

      if (esCorrecto) {
        // REGLA: Despacho Correcto = +100 puntos positivos
        estado.puntaje += 100;
        mostrarPuntajeFlotante(100, rectDespacho.left + rectDespacho.width / 2, rectDespacho.top);
        sonidoDespachoCorrecto();
      } else {
        // REGLA: Despachar caja con función equivocada o incompleta = -4 ptos malos
        estado.puntosMalos += 4;
        mostrarPuntajeFlotante(-4, rectDespacho.left + rectDespacho.width / 2, rectDespacho.top);
        sonidoDespachoIncorrecto();
      }
      removerCajaDeCinta(cajaObj);
      actualizarHUD();
      return;
    }
  }
}

function evaluarDropTouch(x, y) {
  const rectDes = dom.zonaDespacho.getBoundingClientRect();
  if (x >= rectDes.left && x <= rectDes.right && y >= rectDes.top && y <= rectDes.bottom) {
    evaluarDropEnZona(dom.zonaDespacho);
    return;
  }

  const rectBas = dom.zonaBasura.getBoundingClientRect();
  if (x >= rectBas.left && x <= rectBas.right && y >= rectBas.top && y <= rectBas.bottom) {
    evaluarDropEnZona(dom.zonaBasura);
    return;
  }

  // Si arrastró una función del tubo a una caja de la cinta
  if (estado.elementoArrastrado && estado.elementoArrastrado.tipo === 'funcion_tubo') {
    estado.cajasEnCinta.forEach(cajaObj => {
      if (cajaObj.procesada) return;
      const rectCaja = cajaObj.el.getBoundingClientRect();
      if (x >= rectCaja.left && x <= rectCaja.right && y >= rectCaja.top && y <= rectCaja.bottom) {
        colocarEnCajaSlot(cajaObj, estado.elementoArrastrado.item);
      }
    });
  }
}

function removerCajaDeCinta(cajaObj) {
  cajaObj.procesada = true;
  cajaObj.el.remove();
  const idx = estado.cajasEnCinta.indexOf(cajaObj);
  if (idx !== -1) {
    estado.cajasEnCinta.splice(idx, 1);
  }
  estado.cajasProcesadasRonda++;
  verificarFinDeRonda();
}

// Bucle principal (Game Loop)
function gameLoop() {
  if (!estado.pausado) {
    actualizarCinta();
  }
  requestAnimationFrame(gameLoop);
}

function actualizarCinta() {
  const anchoCinta = dom.cintaContainer.clientWidth;
  const espaciadoCajas = anchoCinta / 3.2; // Máximo 4 cajas simultáneas

  // Generar nuevas cajas en la cinta
  if (estado.itemsColaCinta.length > 0) {
    const ultimaCaja = estado.cajasEnCinta[estado.cajasEnCinta.length - 1];
    if (!ultimaCaja || (anchoCinta - ultimaCaja.x) >= espaciadoCajas) {
      const nuevoItem = estado.itemsColaCinta.shift();
      crearCajaEnCinta(nuevoItem, anchoCinta);
    }
  }

  // Mover cajas en la cinta de derecha a izquierda
  for (let i = estado.cajasEnCinta.length - 1; i >= 0; i--) {
    const cajaObj = estado.cajasEnCinta[i];
    cajaObj.x -= estado.velocidadActual * estado.multiplicadorVelocidad;
    cajaObj.el.style.left = `${cajaObj.x}px`;

    // REGLA: No despachar caja y dejar que escape por la izquierda = -3 ptos malos
    // La ronda finaliza cuando la última caja desaparece de pantalla completamente (x < -180)
    if (cajaObj.x < -180) {
      if (!cajaObj.procesada) {
        estado.puntosMalos += 3;
        const rectCinta = dom.cintaContainer.getBoundingClientRect();
        const rectCaja = cajaObj.el.getBoundingClientRect();
        mostrarPuntajeFlotante(-3, rectCinta.left, rectCaja.top + rectCaja.height / 2);
        sonidoFuga();
        actualizarHUD();
      }
      cajaObj.el.remove();
      estado.cajasEnCinta.splice(i, 1);
      estado.cajasProcesadasRonda++;
      verificarFinDeRonda();
    }
  }
}

function crearCajaEnCinta(item, posXInicial) {
  const el = document.createElement('div');
  el.className = 'caja-funcion';
  el.style.left = `${posXInicial}px`;
  el.draggable = true;

  let labelTag = "Derivada de:";
  if (item.tipo === 'integral') labelTag = "Integral de:";
  if (item.tipo === 'doble_derivada') labelTag = "2ª Derivada de:";

  // Diseño minimalista: solo tag, fórmula y área vacía donde se escribe lo soltado
  el.innerHTML = `
    <div class="caja-funcion__tag">${labelTag}</div>
    <div class="caja-funcion__formula">${item.f}</div>
    <div class="caja-funcion__resultado"></div>
  `;

  // Evento DragStart para mover la caja hacia Despacho o Basura
  el.addEventListener('dragstart', (e) => {
    const cajaObj = estado.cajasEnCinta.find(c => c.el === el);
    estado.elementoArrastrado = { tipo: 'caja_cinta', cajaObj: cajaObj };
    el.classList.add('dragging');
  });

  el.addEventListener('dragend', () => {
    el.classList.remove('dragging');
    estado.elementoArrastrado = null;
  });

  // Evento Drop para recibir funciones del tubo o +C
  el.addEventListener('dragover', (e) => e.preventDefault());
  el.addEventListener('drop', (e) => {
    e.preventDefault();
    if (estado.elementoArrastrado) {
      const cajaObj = estado.cajasEnCinta.find(c => c.el === el);
      if (cajaObj) {
        if (estado.elementoArrastrado.tipo === 'funcion_tubo') {
          colocarEnCajaSlot(cajaObj, estado.elementoArrastrado.item);
        } else if (estado.elementoArrastrado.tipo === 'constante') {
          colocarConstanteEnCaja(cajaObj);
        }
      }
    }
  });

  dom.cintaContainer.appendChild(el);

  estado.cajasEnCinta.push({
    item: item,
    el: el,
    x: posXInicial,
    procesada: false
  });

  llenarTubosGarantizados();
}

function colocarEnCajaSlot(cajaObj, itemTubo) {
  if (cajaObj.item.colocadoTarget !== null) {
    // RECHAZO NOTORIO: El slot de función ya contiene un elemento
    sonidoRechazo();
    cajaObj.el.classList.remove('rechazo-animacion');
    void cajaObj.el.offsetWidth; // Fuerza reflow para reiniciar la animación
    cajaObj.el.classList.add('rechazo-animacion');
    setTimeout(() => cajaObj.el.classList.remove('rechazo-animacion'), 450);

    // Animación de devolución suave de la función a su tubo dispensador
    const tuboEl = dom.tubosContainer.children[itemTubo.tuboIndex];
    if (tuboEl) {
      const cajaDerivEl = tuboEl.querySelector('.caja-derivada');
      if (cajaDerivEl) {
        cajaDerivEl.classList.remove('retorno-animacion');
        void cajaDerivEl.offsetWidth;
        cajaDerivEl.classList.add('retorno-animacion');
        setTimeout(() => cajaDerivEl.classList.remove('retorno-animacion'), 350);
      }
    }

    return false; // Rechazado
  }

  cajaObj.item.colocadoTarget = itemTubo.target;
  actualizarTextoResultado(cajaObj);
  sonidoColocar();

  // Vaciar el tubo dispensador usado
  estado.tubos[itemTubo.tuboIndex] = null;
  llenarTubosGarantizados();

  verificarCajaEstado(cajaObj);
}

function colocarConstanteEnCaja(cajaObj) {
  if (cajaObj.item.colocadoConstante === true) {
    // RECHAZO NOTORIO: La constante +C ya está en la caja
    sonidoRechazo();
    cajaObj.el.classList.remove('rechazo-animacion');
    void cajaObj.el.offsetWidth; // Fuerza reflow
    cajaObj.el.classList.add('rechazo-animacion');
    setTimeout(() => cajaObj.el.classList.remove('rechazo-animacion'), 450);

    // Animación de retorno a la caja de constante +C
    dom.dispenserConstante.classList.remove('retorno-animacion');
    void dom.dispenserConstante.offsetWidth;
    dom.dispenserConstante.classList.add('retorno-animacion');
    setTimeout(() => dom.dispenserConstante.classList.remove('retorno-animacion'), 350);

    return false; // Rechazado
  }

  cajaObj.item.colocadoConstante = true;
  actualizarTextoResultado(cajaObj);
  sonidoColocar();

  verificarCajaEstado(cajaObj);
}

function actualizarTextoResultado(cajaObj) {
  const resEl = cajaObj.el.querySelector('.caja-funcion__resultado');
  let texto = "";
  if (cajaObj.item.colocadoTarget !== null) {
    texto += cajaObj.item.colocadoTarget;
  }
  if (cajaObj.item.tipo === 'integral' && cajaObj.item.colocadoConstante === true) {
    texto += (texto ? " " : "") + "+ C";
  }
  resEl.textContent = texto;
}

function verificarCajaEstado(cajaObj) {
  const tieneFuncion = cajaObj.item.colocadoTarget !== null;
  const tieneConstante = cajaObj.item.colocadoConstante === true;

  if (cajaObj.item.tipo === 'integral') {
    // Para integrales, al colocar función y +C se evalúa si es correcta (verde) o deforme (roja)
    if (tieneFuncion && tieneConstante) {
      const esCorrecta = cajaObj.item.colocadoTarget === cajaObj.item.target;
      if (esCorrecta) {
        cajaObj.el.classList.remove('deformada');
        cajaObj.el.classList.add('lista');
      } else {
        cajaObj.el.classList.remove('lista');
        cajaObj.el.classList.add('deformada');
      }
    }
  } else {
    // Para derivadas y doble derivada, al tener función se evalúa si es correcta (verde) o deforme (roja)
    if (tieneFuncion) {
      const esCorrecta = cajaObj.item.colocadoTarget === cajaObj.item.target;
      if (esCorrecta) {
        cajaObj.el.classList.remove('deformada');
        cajaObj.el.classList.add('lista');
      } else {
        cajaObj.el.classList.remove('lista');
        cajaObj.el.classList.add('deformada');
      }
    }
  }
}

// Condición de Fin de Ronda: Se activa cuando la última caja DESAPARECE de pantalla
function verificarFinDeRonda() {
  if (estado.cajasProcesadasRonda >= estado.cajasTotalesRonda && estado.cajasEnCinta.length === 0) {
    dispararExitoRonda();
  }
}

function dispararExitoRonda() {
  estado.pausado = true;
  // Regla: Limpiar 5 puntos malos al superar la ronda
  const puntosLimpiados = Math.min(estado.puntosMalos, 5);
  estado.puntosMalos = Math.max(0, estado.puntosMalos - 5);

  dom.rondaNumModal.textContent = estado.ronda;
  dom.puntosRecuperadosModal.textContent = puntosLimpiados;
  dom.modalRonda.classList.add('activo');
  sonidoRonda();
}

function dispararGameOver() {
  estado.pausado = true;
  dom.puntajeFinalGameOver.textContent = estado.puntaje;
  dom.modalGameOver.classList.add('activo');
  sonidoGameOver();
}

// Handlers de botones modales
dom.btnSiguienteRonda.addEventListener('click', () => {
  dom.modalRonda.classList.remove('activo');
  iniciarRonda(estado.ronda + 1);
});

dom.btnReiniciar.addEventListener('click', () => {
  dom.modalGameOver.classList.remove('activo');
  estado.puntaje = 0;
  estado.puntosMalos = 0;
  iniciarRonda(1);
});
