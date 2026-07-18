// script.js - Módulo Interactivo de Diferencial (Trabajos USACH)

// ── NAVEGACIÓN DE PESTAÑAS ──
function showView(index) {
  document.querySelectorAll('.view').forEach((v, i) => {
    v.classList.toggle('active', i + 1 === index);
  });
  document.querySelectorAll('.nav-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i + 1 === index);
  });

  // Si pasamos al Tab 1 o 2, redibujamos los canvas
  if (index === 1) drawDy();
  if (index === 2) drawSplit();
}

// ── VARIABLES Y ELEMENTOS - TAB 1 (SIMULADOR DY VS DX) ──
const canvasDy = document.getElementById('canvasDy');
const ctxDy = canvasDy ? canvasDy.getContext('2d') : null;

const x0Slider = document.getElementById('x0Slider');
const x0Val = document.getElementById('x0Val');
const dxSlider = document.getElementById('dxSlider');
const dxVal = document.getElementById('dxVal');

const chkDy = document.getElementById('chkDy');
const chkDeltaY = document.getElementById('chkDeltaY');
const chkZoom = document.getElementById('chkZoom');

const valDx = document.getElementById('valDx');
const valDeltaY = document.getElementById('valDeltaY');
const valDy = document.getElementById('valDy');
const valError = document.getElementById('valError');

if (x0Slider) x0Slider.addEventListener('input', () => { updateDyControls(); drawDy(); });
if (dxSlider) dxSlider.addEventListener('input', () => { updateDyControls(); drawDy(); });
if (chkDy) chkDy.addEventListener('change', drawDy);
if (chkDeltaY) chkDeltaY.addEventListener('change', drawDy);
if (chkZoom) chkZoom.addEventListener('change', drawDy);

function updateDyControls() {
  if (!x0Val || !dxVal) return;
  x0Val.textContent = parseFloat(x0Slider.value).toFixed(2);
  dxVal.textContent = parseFloat(dxSlider.value).toFixed(2);
}

function resizeCanvasToDisplaySize(canvas) {
  if (!canvas) return false;
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth * dpr;
  const height = canvas.clientHeight * dpr;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function drawDy() {
  if (!canvasDy || !ctxDy) return;
  resizeCanvasToDisplaySize(canvasDy);

  const dpr = window.devicePixelRatio || 1;
  const W = canvasDy.width;
  const H = canvasDy.height;

  // Limpiar
  ctxDy.clearRect(0, 0, W, H);

  // Parámetros matemáticos
  const x0 = parseFloat(x0Slider.value);
  const dx = parseFloat(dxSlider.value);
  const y0 = Math.sin(x0);
  const y1 = Math.sin(x0 + dx);
  const deltaY = y1 - y0;
  const slope = Math.cos(x0);
  const dy = slope * dx;
  const error = Math.abs(deltaY - dy);

  // Actualizar dashboard matemático
  if (valDx) valDx.textContent = dx.toFixed(4);
  if (valDeltaY) valDeltaY.textContent = deltaY.toFixed(4);
  if (valDy) valDy.textContent = dy.toFixed(4);
  if (valError) valError.textContent = error.toFixed(5);

  // Sistema de coordenadas
  const padL = 60 * dpr;
  const padR = 40 * dpr;
  const padT = 40 * dpr;
  const padB = 50 * dpr;

  const xMin = 0;
  const xMax = 6.6; // Poco más de 2*pi
  const yMin = -1.4;
  const yMax = 1.4;

  const toX = x => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const toY = y => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);

  // 1. Cuadrícula
  ctxDy.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctxDy.lineWidth = 1 * dpr;
  for (let gx = 0; gx <= Math.floor(xMax); gx++) {
    const px = toX(gx);
    ctxDy.beginPath(); ctxDy.moveTo(px, padT); ctxDy.lineTo(px, H - padB); ctxDy.stroke();
  }
  for (let gy = -1; gy <= 1; gy += 0.5) {
    const py = toY(gy);
    ctxDy.beginPath(); ctxDy.moveTo(padL, py); ctxDy.lineTo(W - padR, py); ctxDy.stroke();
  }

  // 2. Ejes principales
  const ox = toX(0);
  const oy = toY(0);

  ctxDy.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctxDy.lineWidth = 1.5 * dpr;
  // Eje X
  ctxDy.beginPath(); ctxDy.moveTo(padL, oy); ctxDy.lineTo(W - padR, oy); ctxDy.stroke();
  // Eje Y
  ctxDy.beginPath(); ctxDy.moveTo(ox, padT); ctxDy.lineTo(ox, H - padB); ctxDy.stroke();

  // Etiquetas de Ejes
  ctxDy.fillStyle = '#7a9bba';
  ctxDy.font = `${11 * dpr}px 'Share Tech Mono', monospace`;
  ctxDy.textAlign = 'center';
  ctxDy.fillText('0', ox - 12 * dpr, oy + 16 * dpr);
  ctxDy.fillText('π/2', toX(Math.PI / 2), oy + 16 * dpr);
  ctxDy.fillText('π', toX(Math.PI), oy + 16 * dpr);
  ctxDy.fillText('3π/2', toX(3 * Math.PI / 2), oy + 16 * dpr);
  ctxDy.fillText('2π', toX(2 * Math.PI), oy + 16 * dpr);

  ctxDy.textAlign = 'right';
  ctxDy.fillText('1', ox - 10 * dpr, toY(1) + 4 * dpr);
  ctxDy.fillText('-1', ox - 10 * dpr, toY(-1) + 4 * dpr);

  // 3. Curva sen(x)
  ctxDy.strokeStyle = '#38bdf8';
  ctxDy.lineWidth = 3 * dpr;
  ctxDy.beginPath();
  for (let x = xMin; x <= xMax; x += 0.02) {
    const px = toX(x);
    const py = toY(Math.sin(x));
    if (x === xMin) ctxDy.moveTo(px, py);
    else ctxDy.lineTo(px, py);
  }
  ctxDy.stroke();

  // 4. Triángulos y líneas de variación
  const px0 = toX(x0);
  const py0 = toY(y0);
  const px1 = toX(x0 + dx);
  const py1 = toY(y1);
  const pyDy = toY(y0 + dy); // Altura según la recta tangente

  // Línea base del intervalo dx (Amarillo)
  ctxDy.strokeStyle = '#fbbf24';
  ctxDy.lineWidth = 2 * dpr;
  ctxDy.setLineDash([4 * dpr, 4 * dpr]);
  ctxDy.beginPath(); ctxDy.moveTo(px0, py0); ctxDy.lineTo(px1, py0); ctxDy.stroke();
  ctxDy.setLineDash([]);

  // Recta Tangente (y dy)
  if (chkDy && chkDy.checked) {
    ctxDy.strokeStyle = 'rgba(74, 222, 128, 0.7)';
    ctxDy.lineWidth = 2 * dpr;
    // Dibujar línea tangente que pasa por (x0, y0) con pendiente slope
    const xTangStart = Math.max(xMin, x0 - 1.2);
    const xTangEnd = Math.min(xMax, x0 + dx + 0.8);
    ctxDy.beginPath();
    ctxDy.moveTo(toX(xTangStart), toY(y0 + slope * (xTangStart - x0)));
    ctxDy.lineTo(toX(xTangEnd), toY(y0 + slope * (xTangEnd - x0)));
    ctxDy.stroke();

    // Vertical del diferencial dy (Verde brillante)
    ctxDy.strokeStyle = '#4ade80';
    ctxDy.lineWidth = 3.5 * dpr;
    ctxDy.beginPath(); ctxDy.moveTo(px1, py0); ctxDy.lineTo(px1, pyDy); ctxDy.stroke();

    // Punto en la tangente
    ctxDy.fillStyle = '#4ade80';
    ctxDy.beginPath(); ctxDy.arc(px1, pyDy, 5 * dpr, 0, Math.PI * 2); ctxDy.fill();
  }

  // Línea Secante y Delta Y
  if (chkDeltaY && chkDeltaY.checked) {
    // Vertical exacto Δy (Naranja brillante)
    ctxDy.strokeStyle = '#f5a623';
    ctxDy.lineWidth = 3.5 * dpr;
    ctxDy.beginPath(); ctxDy.moveTo(px1, py0); ctxDy.lineTo(px1, py1); ctxDy.stroke();

    // Recta secante entre (px0, py0) y (px1, py1)
    ctxDy.strokeStyle = 'rgba(245, 166, 35, 0.6)';
    ctxDy.lineWidth = 1.5 * dpr;
    ctxDy.beginPath(); ctxDy.moveTo(px0, py0); ctxDy.lineTo(px1, py1); ctxDy.stroke();
  }

  // Puntos base y final de la función
  ctxDy.fillStyle = '#ffffff';
  ctxDy.beginPath(); ctxDy.arc(px0, py0, 6 * dpr, 0, Math.PI * 2); ctxDy.fill();
  ctxDy.strokeStyle = '#38bdf8';
  ctxDy.lineWidth = 2 * dpr;
  ctxDy.stroke();

  ctxDy.fillStyle = '#f5a623';
  ctxDy.beginPath(); ctxDy.arc(px1, py1, 5 * dpr, 0, Math.PI * 2); ctxDy.fill();

  // 5. LUPA PICTURE-IN-PICTURE (ZOOM 4X)
  if (chkZoom && chkZoom.checked) {
    const zoomSize = 150 * dpr;
    const zoomX = W - zoomSize - 30 * dpr;
    const zoomY = 30 * dpr;

    ctxDy.save();
    // Marco de la lupa
    ctxDy.beginPath();
    ctxDy.arc(zoomX + zoomSize / 2, zoomY + zoomSize / 2, zoomSize / 2, 0, Math.PI * 2);
    ctxDy.clip();

    ctxDy.fillStyle = '#0c1f38';
    ctxDy.fillRect(zoomX, zoomY, zoomSize, zoomSize);

    // Mapeo local dentro de la lupa (centro en el punto medio del triángulo)
    const midX = x0 + dx / 2;
    const midY = y0 + deltaY / 2;
    const zoomScale = 4.0; // Zoom factor
    const localWidth = (zoomSize / (W - padL - padR)) * (xMax - xMin) / zoomScale;

    const zToX = x => zoomX + zoomSize / 2 + ((x - midX) / localWidth) * zoomSize;
    const zToY = y => zoomY + zoomSize / 2 - ((y - midY) / localWidth) * zoomSize;

    // Cuadrícula en lupa
    ctxDy.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctxDy.lineWidth = 1 * dpr;
    ctxDy.strokeRect(zoomX, zoomY, zoomSize, zoomSize);

    // Curva en la lupa
    ctxDy.strokeStyle = '#38bdf8';
    ctxDy.lineWidth = 4 * dpr;
    ctxDy.beginPath();
    for (let x = midX - localWidth; x <= midX + localWidth; x += 0.005) {
      const zpx = zToX(x);
      const zpy = zToY(Math.sin(x));
      if (x === midX - localWidth) ctxDy.moveTo(zpx, zpy);
      else ctxDy.lineTo(zpx, zpy);
    }
    ctxDy.stroke();

    // Triángulo en la lupa
    const zpx0 = zToX(x0);
    const zpy0 = zToY(y0);
    const zpx1 = zToX(x0 + dx);
    const zpy1 = zToY(y1);
    const zpyDy = zToY(y0 + dy);

    // Base dx
    ctxDy.strokeStyle = '#fbbf24';
    ctxDy.lineWidth = 3 * dpr;
    ctxDy.beginPath(); ctxDy.moveTo(zpx0, zpy0); ctxDy.lineTo(zpx1, zpy0); ctxDy.stroke();

    // Tangente dy en lupa
    if (chkDy && chkDy.checked) {
      ctxDy.strokeStyle = '#4ade80';
      ctxDy.lineWidth = 4 * dpr;
      ctxDy.beginPath(); ctxDy.moveTo(zpx1, zpy0); ctxDy.lineTo(zpx1, zpyDy); ctxDy.stroke();
    }

    // Exacto Δy en lupa
    if (chkDeltaY && chkDeltaY.checked) {
      ctxDy.strokeStyle = '#f5a623';
      ctxDy.lineWidth = 4 * dpr;
      ctxDy.beginPath(); ctxDy.moveTo(zpx1, zpy0); ctxDy.lineTo(zpx1, zpy1); ctxDy.stroke();
    }

    ctxDy.restore();

    // Borde de la lupa
    ctxDy.strokeStyle = '#fbbf24';
    ctxDy.lineWidth = 3 * dpr;
    ctxDy.beginPath();
    ctxDy.arc(zoomX + zoomSize / 2, zoomY + zoomSize / 2, zoomSize / 2, 0, Math.PI * 2);
    ctxDy.stroke();

    ctxDy.fillStyle = '#fbbf24';
    ctxDy.font = `${11 * dpr}px 'Share Tech Mono', monospace`;
    ctxDy.textAlign = 'center';
    ctxDy.fillText('LUPA ZOOM 4X', zoomX + zoomSize / 2, zoomY + zoomSize + 16 * dpr);
  }
}


// ── VARIABLES Y ELEMENTOS - TAB 2 (PANTALLA DIVIDIDA INTERACTIVA) ──
const canvasLeft = document.getElementById('canvasSplitLeft');
const ctxLeft = canvasLeft ? canvasLeft.getContext('2d') : null;
const canvasRight = document.getElementById('canvasSplitRight');
const ctxRight = canvasRight ? canvasRight.getContext('2d') : null;

const x0SplitSlider = document.getElementById('x0SplitSlider');
const x0SplitVal = document.getElementById('x0SplitVal');
const nSplitSlider = document.getElementById('nSplitSlider');
const nSplitVal = document.getElementById('nSplitVal');
const btnSweep = document.getElementById('btnSweep');

const valSplitLeft = document.getElementById('valSplitLeft');
const valSplitRight = document.getElementById('valSplitRight');

let isSweeping = false;
let sweepInterval = null;

if (x0SplitSlider) x0SplitSlider.addEventListener('input', () => { updateSplitControls(); drawSplit(); });
if (nSplitSlider) nSplitSlider.addEventListener('input', () => { updateSplitControls(); drawSplit(); });

if (btnSweep) {
  btnSweep.addEventListener('click', () => {
    if (isSweeping) {
      stopSweep();
    } else {
      startSweep();
    }
  });
}

function updateSplitControls() {
  if (!x0SplitVal || !nSplitVal) return;
  x0SplitVal.textContent = parseFloat(x0SplitSlider.value).toFixed(2);
  nSplitVal.textContent = nSplitSlider.value;
}

function startSweep() {
  isSweeping = true;
  btnSweep.textContent = '⏸ Detener Barrido';
  btnSweep.classList.add('playing');

  let currentX = parseFloat(x0SplitSlider.value);
  sweepInterval = setInterval(() => {
    currentX += 0.08;
    if (currentX > 2 * Math.PI) currentX = 0;
    x0SplitSlider.value = currentX;
    updateSplitControls();
    drawSplit();
  }, 40);
}

function stopSweep() {
  isSweeping = false;
  btnSweep.textContent = '▶ Animar Barrido Coseno';
  btnSweep.classList.remove('playing');
  if (sweepInterval) clearInterval(sweepInterval);
}

function drawSplit() {
  if (!canvasLeft || !ctxLeft || !canvasRight || !ctxRight) return;
  resizeCanvasToDisplaySize(canvasLeft);
  resizeCanvasToDisplaySize(canvasRight);

  const dpr = window.devicePixelRatio || 1;
  const W1 = canvasLeft.width;
  const H1 = canvasLeft.height;
  const W2 = canvasRight.width;
  const H2 = canvasRight.height;

  ctxLeft.clearRect(0, 0, W1, H1);
  ctxRight.clearRect(0, 0, W2, H2);

  const x0 = parseFloat(x0SplitSlider.value);
  const N = parseInt(nSplitSlider.value);
  const dx = (2 * Math.PI) / N;

  // Encontrar qué subintervalo [xk, xk+dx] contiene a x0
  const k = Math.min(N - 1, Math.floor(x0 / dx));
  const xk = k * dx;
  const xk1 = xk + dx;

  const yk = Math.sin(xk);
  const yk1 = Math.sin(xk1);
  const deltaY = yk1 - yk;
  const cosVal = Math.cos(xk);
  const areaRect = cosVal * dx;

  if (valSplitLeft) valSplitLeft.textContent = deltaY.toFixed(4);
  if (valSplitRight) valSplitRight.textContent = areaRect.toFixed(4);

  // Mapeo universal [0, 2pi] x [-1.3, 1.3]
  const padL = 40 * dpr, padR = 25 * dpr, padT = 30 * dpr, padB = 35 * dpr;
  const toX1 = x => padL + (x / (2 * Math.PI)) * (W1 - padL - padR);
  const toY1 = y => padT + ((1.3 - y) / 2.6) * (H1 - padT - padB);
  const toX2 = x => padL + (x / (2 * Math.PI)) * (W2 - padL - padR);
  const toY2 = y => padT + ((1.3 - y) / 2.6) * (H2 - padT - padB);

  // ── CANVAS IZQUIERDO: SENO Y VARIACIONES Δy ──
  // Ejes
  const oy1 = toY1(0);
  ctxLeft.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctxLeft.lineWidth = 1.5 * dpr;
  ctxLeft.beginPath(); ctxLeft.moveTo(padL, oy1); ctxLeft.lineTo(W1 - padR, oy1); ctxLeft.stroke();

  // Todos los escalones (variaciones Δy) en los N intervalos
  for (let i = 0; i < N; i++) {
    const xi = i * dx;
    const xi1 = (i + 1) * dx;
    const yi = Math.sin(xi);
    const yi1 = Math.sin(xi1);
    const px = toX1(xi1);
    const pyStart = toY1(yi);
    const pyEnd = toY1(yi1);

    ctxLeft.strokeStyle = i === k ? '#f5a623' : 'rgba(245, 166, 35, 0.25)';
    ctxLeft.lineWidth = i === k ? 4 * dpr : 1.5 * dpr;
    ctxLeft.beginPath(); ctxLeft.moveTo(px, pyStart); ctxLeft.lineTo(px, pyEnd); ctxLeft.stroke();

    // Línea base del escalón
    ctxLeft.strokeStyle = i === k ? '#fbbf24' : 'rgba(251, 191, 36, 0.15)';
    ctxLeft.lineWidth = i === k ? 2 * dpr : 1 * dpr;
    ctxLeft.beginPath(); ctxLeft.moveTo(toX1(xi), toY1(yi)); ctxLeft.lineTo(px, toY1(yi)); ctxLeft.stroke();
  }

  // Curva Seno
  ctxLeft.strokeStyle = '#38bdf8';
  ctxLeft.lineWidth = 3 * dpr;
  ctxLeft.beginPath();
  for (let x = 0; x <= 2 * Math.PI; x += 0.02) {
    const px = toX1(x);
    const py = toY1(Math.sin(x));
    if (x === 0) ctxLeft.moveTo(px, py);
    else ctxLeft.lineTo(px, py);
  }
  ctxLeft.stroke();

  // Resaltado de la variación activa
  ctxLeft.fillStyle = '#ffffff';
  ctxLeft.beginPath(); ctxLeft.arc(toX1(xk), toY1(yk), 5 * dpr, 0, Math.PI * 2); ctxLeft.fill();
  ctxLeft.fillStyle = '#f5a623';
  ctxLeft.beginPath(); ctxLeft.arc(toX1(xk1), toY1(yk1), 5 * dpr, 0, Math.PI * 2); ctxLeft.fill();


  // ── CANVAS DERECHO: COSENO Y RECTÁNGULOS DE RIEMANN ──
  // Ejes
  const oy2 = toY2(0);
  ctxRight.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctxRight.lineWidth = 1.5 * dpr;
  ctxRight.beginPath(); ctxRight.moveTo(padL, oy2); ctxRight.lineTo(W2 - padR, oy2); ctxRight.stroke();

  // Rectángulos de Riemann (altura = cos(xi), ancho = dx)
  for (let i = 0; i < N; i++) {
    const xi = i * dx;
    const xi1 = (i + 1) * dx;
    const heightCos = Math.cos(xi);
    const pxStart = toX2(xi);
    const pxWidth = toX2(xi1) - pxStart;
    const pyTop = toY2(Math.max(0, heightCos));
    const pyHeight = Math.abs(toY2(heightCos) - oy2);

    if (i === k) {
      // Rectángulo activo super brillante
      ctxRight.fillStyle = 'rgba(251, 191, 36, 0.65)';
      ctxRight.strokeStyle = '#fbbf24';
      ctxRight.lineWidth = 2 * dpr;
    } else {
      ctxRight.fillStyle = 'rgba(244, 63, 94, 0.15)';
      ctxRight.strokeStyle = 'rgba(244, 63, 94, 0.3)';
      ctxRight.lineWidth = 1 * dpr;
    }

    ctxRight.fillRect(pxStart, pyTop, pxWidth, pyHeight);
    ctxRight.strokeRect(pxStart, pyTop, pxWidth, pyHeight);
  }

  // Curva Coseno
  ctxRight.strokeStyle = '#f43f5e';
  ctxRight.lineWidth = 3 * dpr;
  ctxRight.beginPath();
  for (let x = 0; x <= 2 * Math.PI; x += 0.02) {
    const px = toX2(x);
    const py = toY2(Math.cos(x));
    if (x === 0) ctxRight.moveTo(px, py);
    else ctxRight.lineTo(px, py);
  }
  ctxRight.stroke();

  // Punto activo sobre el coseno
  ctxRight.fillStyle = '#fbbf24';
  ctxRight.beginPath(); ctxRight.arc(toX2(xk), toY2(cosVal), 6 * dpr, 0, Math.PI * 2); ctxRight.fill();
}


// ── CONTROL DE VIDEO (TAB 3) ──
function jumpToTime(seconds) {
  const vid = document.getElementById('mainVideo');
  if (vid) {
    vid.currentTime = seconds;
    vid.play();
  }
}

// Inicialización
window.addEventListener('load', () => {
  updateDyControls();
  if (x0SplitSlider && nSplitSlider) updateSplitControls();
  drawDy();
  drawSplit();
});

window.addEventListener('resize', () => {
  drawDy();
  drawSplit();
});
