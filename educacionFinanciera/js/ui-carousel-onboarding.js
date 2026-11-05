// Top PPT Carousel, 3-Tab Onboarding & Slide Activities — educacionFinanciera

    // RENDERIZAR FICHA DE RESUMEN DEL PERSONAJE
    function renderCharacterSummary() {
      const container = document.getElementById('character-summary-content');
      if (!container) return;

      const status = checkProfileCompletion();
      const btnNext = document.getElementById('btn-summary-next');
      if (btnNext) {
        btnNext.disabled = !status.isComplete;
      }

      // Si el perfil NO está completo, mostrar mensaje informativo y no dar el resumen
      if (!status.isComplete) {
        const missingAnchors = [];
        if (!status.hasHome) missingAnchors.push('Vivienda (2 opciones)');
        if (!status.hasJob) missingAnchors.push('Trabajo (2 opciones)');
        if (!status.hasTransport) missingAnchors.push('Transporte (2 opciones)');

        container.innerHTML = `
          <div class="summary-incomplete-card">
            <div class="summary-incomplete-header">
              <span style="font-size: 1.15rem; line-height: 1;">⚠️</span>
              <span class="summary-incomplete-title">Perfil incompleto</span>
            </div>
            <p class="summary-incomplete-text">
              Para generar el resumen de tu personaje y avanzar al taller, debes completar las siguientes selecciones:
            </p>
            <div class="summary-missing-items">
              ${!status.hasPrioritizedInterests ? `
                <div class="summary-missing-row">
                  <div style="flex: 1;">
                    <strong>Intereses personales:</strong>
                    <span>Debes priorizar al menos un interés con más de 1 estrella.</span>
                  </div>
                  <button type="button" class="summary-missing-btn" onclick="goToInterestsScreen()">Ir a Intereses ➔</button>
                </div>
              ` : ''}
              ${missingAnchors.length > 0 ? `
                <div class="summary-missing-row">
                  <div style="flex: 1;">
                    <strong>Valores de estilo de vida:</strong>
                    <span>Falta seleccionar las 2 opciones que más valoras en ${missingAnchors.join(', ')}.</span>
                  </div>
                  <button type="button" class="summary-missing-btn" onclick="goToAnchorsScreen()">Ir a Valores ➔</button>
                </div>
              ` : ''}
            </div>
          </div>
        `;
        return;
      }

      const homes = (state.selectedHomes || [0, 1]).map(i => homeOptions[i] || homeOptions[0]);
      const jobs = (state.selectedJobs || [0, 1]).map(i => jobOptions[i] || jobOptions[0]);
      const transports = (state.selectedTransports || [1, 2]).map(i => transportOptions[i] || transportOptions[0]);

      // Lista de intereses prioritarios para el texto narrativo (los 4 más altos, sin íconos en el texto)
      const sortedCats = [...state.categories].sort((a, b) => b.dots - a.dots);
      const mainInterests = sortedCats.slice(0, 4);
      const interestNames = mainInterests.map(c => {
        const cleanName = c.name.replace(/^[^\p{L}\p{N}]+\s*/u, '').trim();
        return `<strong>${cleanName}</strong>`;
      });
      const interestsText = interestNames.join(', ') + ', entre otros';

      container.innerHTML = `
        <div class="summary-narrative-box">
         <p class="summary-narrative-text" style="margin-top: 8px;">
            En tu vida personal, priorizas dedicar tiempo y recursos a <strong>Hogar & Decoración</strong>, <strong>Tecnología & Herramientas</strong>, <strong>Viajes & Vacaciones</strong>, <strong>Gastronomía & Salidas</strong>, entre otros.
            Para vivir prefieres <strong>Casa o Depto (en condominio elegante)</strong> y <strong>Departamento centro (conectividad central)</strong>; en lo laboral prefieres <strong>Freelance (sueldo medio variable)</strong> o <strong>Trabajo dependiente (sueldo medio)</strong>; y para movilizarte, <strong>City Car (económico y rendidor)</strong> y <strong>Locomoción colectiva (micro, metro, taxi o Uber)</strong>.
          </p>
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 0.65rem; color: #475569; line-height: 1.35;">

          </div>
        </div>
      `;
    }

    // RENDERIZAR CARRUSEL DE DIAPOSITIVAS HORIZONTAL (100% ANCHO, FONDO CLARO, SIN PUNTOS)
    function renderSlideCarousel() {
      const track = document.getElementById('slide-track');
      if (!track) return;
      track.innerHTML = '';

      slidesData.forEach((slide, idx) => {
        const card = document.createElement('div');
        const isSplit = slide.hasTriangle || slide.figureIcon;
        card.className = `slide-card ${isSplit ? 'split-layout' : ''} ${idx === 0 ? 'active' : ''}`;
        card.id = `slide-card-${idx}`;
        card.onclick = () => {
          if (track.dataset.isDragging === 'true') return;
          selectSlide(idx);
        };

        const slideNumBadge = `<span style="display: inline-flex; align-items: center; justify-content: center; background: #0284c7; color: #ffffff; font-weight: 900; font-size: 0.85rem; padding: 2px 8px; border-radius: 6px; margin-right: 6px; box-shadow: 0 1px 3px rgba(2,132,199,0.3); vertical-align: middle;">N° ${idx + 1}</span>`;

        if (slide.hasTriangle) {
          card.innerHTML = `
            <div class="slide-split-text">
              <div class="slide-card-title">${slideNumBadge}${slide.title}</div>
              <div class="slide-card-desc">${slide.desc}</div>
            </div>
            <div class="slide-split-visual" title="Gráfico del Triángulo de la Inversión">
              <svg viewBox="0 0 110 90" class="slide-mini-triangle">
                <polygon points="55,14 14,78 96,78" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
                <line x1="55" y1="14" x2="55" y2="55" stroke="#e2e8f0" stroke-dasharray="2" />
                <line x1="14" y1="78" x2="55" y2="55" stroke="#e2e8f0" stroke-dasharray="2" />
                <line x1="96" y1="78" x2="55" y2="55" stroke="#e2e8f0" stroke-dasharray="2" />
                <circle cx="55" cy="14" r="5" fill="#059669" />
                <text x="55" y="8" font-size="7.5" font-weight="800" text-anchor="middle" fill="#059669">RENTABILIDAD</text>
                <circle cx="14" cy="78" r="5" fill="#0284c7" />
                <text x="6" y="88" font-size="7.5" font-weight="800" fill="#0284c7">LIQUIDEZ</text>
                <circle cx="96" cy="78" r="5" fill="#d97706" />
                <text x="104" y="88" font-size="7.5" font-weight="800" text-anchor="end" fill="#d97706">RIESGO</text>
                <circle cx="55" cy="55" r="4.5" fill="#7c3aed" />
              </svg>
            </div>
          `;
        } else if (slide.figureIcon) {
          card.innerHTML = `
            <div class="slide-split-visual slide-figure-box" title="Figura">
              ${slide.figureSvg || `<span style="font-size: 2rem; line-height: 1;">${slide.figureIcon}</span>`}
            </div>
            <div class="slide-split-text">
              <div class="slide-card-title">${slideNumBadge}${slide.title}</div>
              <div class="slide-card-desc">${slide.desc}</div>
            </div>
          `;
        } else {
          card.innerHTML = `
            <div class="slide-card-title">${slideNumBadge}${slide.title}</div>
            <div class="slide-card-desc">${slide.desc}</div>
          `;
        }
        track.appendChild(card);
      });
    }

    // CONTROL DE SCROLL PROGRAMÁTICO Y NAVEGACIÓN
    let isProgrammaticScroll = false;
    let programmaticScrollTimer = null;

    // SELECCIONAR Y ACTIVAR UNA DIAPOSITIVA
    function selectSlide(idx, triggerScroll = true) {
      state.currentSlideIdx = idx;
      const slide = slidesData[idx];
      if (!slide) return;

      // Actualizar título de módulo dinámico en la barra superior
      const topModule = document.getElementById('slide-top-module');
      if (topModule) {
        topModule.innerText = slide.tag;
      }

      // Actualizar clase activa en tarjetas
      document.querySelectorAll('.slide-card').forEach((el, i) => {
        el.classList.toggle('active', i === idx);
      });

      // Hacer scroll suave para alinear exactamente la diapositiva en el track
      const track = document.getElementById('slide-track');
      if (track && triggerScroll) {
        isProgrammaticScroll = true;
        clearTimeout(programmaticScrollTimer);
        programmaticScrollTimer = setTimeout(() => {
          isProgrammaticScroll = false;
        }, 450);

        const targetLeft = idx * track.clientWidth;
        track.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });
      }

      // Sincronizar la zona media interactiva
      activateInteractiveView(slide);
    }

    // AVANZAR O RETROCEDER CON BOTONES ◀ / ▶
    function scrollSlideBy(dir) {
      let newIdx = state.currentSlideIdx + dir;
      if (newIdx < 0) newIdx = 0;
      if (newIdx >= slidesData.length) newIdx = slidesData.length - 1;
      selectSlide(newIdx);
    }

    // DETECCIÓN DE SCROLL / SWIPE MANUAL CON EL DEDO EN EL TRACK
    let scrollTimeout;
    function onTrackScroll() {
      if (isProgrammaticScroll) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isProgrammaticScroll) return;
        const track = document.getElementById('slide-track');
        if (!track) return;
        const cardWidth = track.clientWidth || 1;
        const closestIdx = Math.round(track.scrollLeft / cardWidth);
        const validIdx = Math.max(0, Math.min(slidesData.length - 1, closestIdx));

        if (validIdx !== state.currentSlideIdx) {
          selectSlide(validIdx, false);
        }
      }, 120);
    }

    // SOPORTE DE RUEDA DE RATÓN Y ARRASTRE (DRAG) EN ESCRITORIO
    function initSlideTrackInteractions() {
      const track = document.getElementById('slide-track');
      if (!track || track.dataset.interactionsInit) return;
      track.dataset.interactionsInit = 'true';

      // Rueda vertical convertida a desplazamiento horizontal en track
      track.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }, { passive: false });

      // Arrastre con clic de ratón (Drag to scroll)
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.dataset.isDragging = 'false';
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        track.style.cursor = 'grab';
        setTimeout(() => {
          track.dataset.isDragging = 'false';
        }, 80);
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - track.offsetLeft;
        const walk = x - startX;
        if (Math.abs(walk) > 6) {
          track.dataset.isDragging = 'true';
          track.scrollLeft = scrollLeft - walk;
        }
      });
    }

    // ACTIVAR LA VISTA DE LA ZONA MEDIA
    function activateInteractiveView(slide) {
      // El icono del dock solo debe estar marcado cuando en el centro se muestra lo del icono.
      // Al cambiar la diapositiva y modificarse el centro, se desmarca cualquier icono activo.
      state.activeHudTab = null;
      document.querySelectorAll('.hud-dock-tab').forEach(t => t.classList.remove('active'));

      // Ocultar todas las vistas
      document.querySelectorAll('.step-view').forEach(view => view.classList.add('hidden'));

      if (!slide.view) return;

      if (slide.view === 'view-generic') {
        const genView = document.getElementById('view-generic');
        document.getElementById('generic-title').innerText = slide.genericTitle || slide.title;
        const descEl = document.getElementById('generic-desc');
        if (descEl) {
          descEl.innerText = slide.genericDesc || '';
          descEl.style.display = slide.genericDesc ? 'block' : 'none';
        }
        const iconEl = document.getElementById('generic-icon');
        if (iconEl) {
          iconEl.innerText = slide.genericIcon || '';
          iconEl.style.display = slide.genericIcon ? 'block' : 'none';
        }
        const msgEl = document.getElementById('generic-msg');
        if (msgEl) {
          if (slide.genericBodyHtml) {
            msgEl.innerHTML = slide.genericBodyHtml;
          } else {
            msgEl.innerText = slide.genericMsg || '';
          }
        }
        genView.classList.remove('hidden');
      } else {
        const targetView = document.getElementById(slide.view);
        if (targetView) targetView.classList.remove('hidden');
      }

      if (slide.view === 'view-character-summary') {
        renderCharacterSummary();
      }
    }

    // GESTIÓN DEL CÓDIGO DE SESIÓN EN LA DIAPO 1
    function handleEnterSessionCode() {
      const input = document.getElementById('session-code-input');
      const feedback = document.getElementById('session-code-feedback');
      if (!input) return;
      const code = input.value.trim().toUpperCase();
      if (!code) {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.color = '#e11d48';
          feedback.innerText = 'Por favor escribe un código antes de ingresar.';
        }
        return;
      }
      state.sessionCode = code;
      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.color = '#059669';
        feedback.innerText = `✓ Código ${code} conectado con éxito. Avanzando...`;
      }
      setTimeout(() => {
        selectSlide(1);
      }, 700);
    }

    // RENDERIZAR ESTRELLAS EN UN SOLO LISTADO SENCILLO (SIN BLOQUES)
    function renderBolitas() {
      const container = document.getElementById('cats-list');
      if (!container) return;
      container.innerHTML = '';

      const starSvg = `<svg class="star-svg" viewBox="0 0 20 20"><polygon points="10,1 12.6,6.8 19,7.5 14.3,12 15.6,18.5 10,15.2 4.4,18.5 5.7,12 1,7.5 7.4,6.8" /></svg>`;

      state.categories.forEach((cat, idx) => {
        const row = document.createElement('div');
        row.className = 'category-row';
        row.innerHTML = `
          <div class="category-label">${cat.name}</div>
          <div class="bolitas-control">
            <div class="bolitas-slots" title="Pincha una estrella para quitarla o un espacio vacío para agregar">
              ${[1, 2, 3].map(slotNum => `
                <span class="star-slot ${slotNum <= cat.dots ? 'filled' : ''}"
                      onclick="onDotClick(${idx}, ${slotNum})"
                      title="${slotNum <= cat.dots ? 'Pincha para quitar estrella' : 'Pincha para agregar estrella'}">
                  ${starSvg}
                </span>
              `).join('')}
            </div>
          </div>
        `;
        container.appendChild(row);
      });

      calculateTotalBolitas();
    }

    // GESTIÓN DE TOQUE DIRECTO EN LAS ESTRELLAS
    function onDotClick(catIdx, slotNum) {
      const cat = state.categories[catIdx];
      const currentAssigned = state.categories.reduce((acc, c) => acc + c.dots, 0);
      const available = state.totalBolitas - currentAssigned;

      // Caso 1: El usuario pincha una estrella ya activa (para quitarla o reducirla)
      if (slotNum <= cat.dots) {
        if (slotNum === cat.dots) {
          // Pinchó la última estrella: la quita (reduce en 1)
          cat.dots = Math.max(0, cat.dots - 1);
        } else {
          // Pinchó una estrella anterior: ajusta a esa posición
          cat.dots = slotNum;
        }
        renderBolitas();
        return;
      }

      // Caso 2: El usuario pincha un espacio vacío (para agregar)
      const needed = slotNum - cat.dots;

      if (available <= 0) {
        // No quedan estrellas para agregar (llegó a 25): TITILAR ESTRELLAS ACTIVAS
        triggerNoBallsAlert();
        return;
      }

      // Si hay saldo disponible:
      if (available >= needed) {
        cat.dots = slotNum;
      } else {
        cat.dots += available;
      }

      renderBolitas();
    }

    // ANIMACIÓN DE TITILAR CUANDO NO HAY ESTRELLAS PARA AGREGAR
    let alertTimeout;
    function triggerNoBallsAlert() {
      // Hacer titilar todas las estrellas llenas activas en la pantalla
      const filledStars = document.querySelectorAll('#view-step-4 .star-slot.filled');
      filledStars.forEach(star => {
        star.classList.remove('blink-alert');
        void star.offsetWidth; // Forzar reflow para reiniciar la animación
        star.classList.add('blink-alert');
      });

      clearTimeout(alertTimeout);
      alertTimeout = setTimeout(() => {
        filledStars.forEach(star => star.classList.remove('blink-alert'));
      }, 1400);
    }

    function calculateTotalBolitas() {
      const sum = state.categories.reduce((acc, c) => acc + c.dots, 0);
      state.assignedBolitas = sum;

      const assignedEl = document.getElementById('assigned-bolitas');
      if (assignedEl) assignedEl.innerText = sum;

      const maxEl = document.getElementById('max-bolitas');
      if (maxEl) maxEl.innerText = state.totalBolitas;

      updateInterestsValidation();
    }

    // VALIDACIÓN DE INTERESES (DEBE PRIORIZAR AL MENOS UN INTERÉS CON > 1 ESTRELLA)
    function updateInterestsValidation() {
      const hasPrioritized = state.categories && state.categories.some(c => c.dots > 1);
      const btn = document.getElementById('btn-next-interests');
      if (btn) {
        btn.disabled = !hasPrioritized;
      }
      const warningEl = document.getElementById('interests-warning-msg');
      if (warningEl && hasPrioritized) {
        warningEl.classList.add('hidden');
      }
    }

    function confirmInterestsAndContinue() {
      const hasPrioritized = state.categories && state.categories.some(c => c.dots > 1);
      if (!hasPrioritized) {
        const warningEl = document.getElementById('interests-warning-msg');
        if (warningEl) {
          warningEl.innerText = "⚠️ Por favor prioriza al menos un interés asignándole más de 1 estrella.";
          warningEl.classList.remove('hidden');
        }
        return;
      }
      goToAnchorsScreen();
    }

    // NAVEGACIÓN ENTRE PASOS DE CONFIGURACIÓN DEL PERSONAJE
    function goToInterestsScreen() {
      selectSlide(1);
    }

    function goToAnchorsScreen() {
      selectSlide(2);
    }

    function goToSummaryScreen() {
      renderCharacterSummary();
      selectSlide(3);
    }

    // SELECCIÓN DE 2 OPCIONES LIBRES EN ESTILO DE VIDA (VIVIENDA, TRABAJO, TRANSPORTE)
    function selectAnchor(type, idx, elem, label) {
      if (!state.selectedHomes) state.selectedHomes = [];
      if (!state.selectedJobs) state.selectedJobs = [];
      if (!state.selectedTransports) state.selectedTransports = [];

      let list;
      if (type === 'home') list = state.selectedHomes;
      else if (type === 'job') list = state.selectedJobs;
      else if (type === 'transport') list = state.selectedTransports;

      const pos = list.indexOf(idx);
      if (pos !== -1) {
        // Si ya estaba seleccionada, la deselecciona
        list.splice(pos, 1);
        elem.classList.remove('selected');
      } else {
        // Si ya hay 2 seleccionadas, quita la primera y agrega la nueva
        if (list.length >= 2) {
          const removedIdx = list.shift();
          const selectorId = (type === 'home') ? 'anchor-home' : (type === 'job') ? 'anchor-job' : 'anchor-transport';
          const options = document.querySelectorAll(`#${selectorId} .anchor-option`);
          if (options[removedIdx]) options[removedIdx].classList.remove('selected');
        }
        list.push(idx);
        elem.classList.add('selected');
      }

      // Sincronizar compatibilidad con opción primaria (la primera de las 2)
      if (type === 'home') {
        state.selectedHome = list.length > 0 ? list[0] : null;
        state.lifestyleChoices.home = list.map(i => homeOptions[i] ? homeOptions[i].name : '').filter(Boolean).join(' / ');
      } else if (type === 'job') {
        state.selectedJob = list.length > 0 ? list[0] : null;
        state.lifestyleChoices.job = list.map(i => jobOptions[i] ? jobOptions[i].name : '').filter(Boolean).join(' / ');
      } else if (type === 'transport') {
        state.selectedTransport = list.length > 0 ? list[0] : null;
        state.lifestyleChoices.transport = list.map(i => transportOptions[i] ? transportOptions[i].name : '').filter(Boolean).join(' / ');
      }

      // Habilitar botón Siguiente solo cuando las 3 categorías tengan exactamente 2 opciones
      const isComplete = Boolean(
        state.selectedHomes.length === 2 &&
        state.selectedJobs.length === 2 &&
        state.selectedTransports.length === 2
      );
      const btn = document.getElementById('btn-confirm-anchors');
      if (btn) btn.disabled = !isComplete;

      // Ocultar mensaje de advertencia si ya completó todas
      const warningEl = document.getElementById('anchors-warning-msg');
      if (warningEl && isComplete) {
        warningEl.classList.add('hidden');
      }
    }

    // CONFIRMAR ESTILO DE VIDA Y CONTINUAR A LA FICHA DE RESUMEN
    function confirmAnchorsAndContinue() {
      const missing = [];
      if (!state.selectedHomes || state.selectedHomes.length < 2) missing.push('Vivienda (2 opciones)');
      if (!state.selectedJobs || state.selectedJobs.length < 2) missing.push('Trabajo (2 opciones)');
      if (!state.selectedTransports || state.selectedTransports.length < 2) missing.push('Transporte (2 opciones)');

      if (missing.length > 0) {
        flashMissingAnchors(missing);
        return;
      }

      goToSummaryScreen();
    }

    // COMENZAR SIMULACIÓN / TALLER DESDE LA FICHA DEL PERSONAJE
    function startSimulationFromSummary() {
      const status = checkProfileCompletion();
      if (!status.isComplete) {
        renderCharacterSummary();
        return;
      }
      state.profileCompleted = true;
      state.healthPhysical = 20;
      state.healthEmotional = 40;
      state.healthMental = 40;
      state.mentalPeace = 100;

      // Activar inmediatamente la vista central de Personal desde el dock
      selectHudTab('estado');

      // Avanzar el carrusel superior a la diapositiva 4 (Paso 5: Presupuesto)
      state.currentSlideIdx = 4;
      const slide = slidesData[4];
      if (slide) {
        const topModule = document.getElementById('slide-top-module');
        if (topModule) topModule.innerText = slide.tag;

        document.querySelectorAll('.slide-card').forEach((el, i) => {
          el.classList.toggle('active', i === 4);
        });

        const track = document.getElementById('slide-track');
        if (track) {
          isProgrammaticScroll = true;
          clearTimeout(programmaticScrollTimer);
          programmaticScrollTimer = setTimeout(() => {
            isProgrammaticScroll = false;
          }, 450);
          track.scrollTo({
            left: 4 * track.clientWidth,
            behavior: 'smooth'
          });
        }
      }
    }

    function flashMissingAnchors(missing) {
      if (!missing || missing.length === 0) {
        missing = [];
        if (!state.selectedHomes || state.selectedHomes.length < 2) missing.push('Vivienda (2 opciones)');
        if (!state.selectedJobs || state.selectedJobs.length < 2) missing.push('Trabajo (2 opciones)');
        if (!state.selectedTransports || state.selectedTransports.length < 2) missing.push('Transporte (2 opciones)');
      }
      const warningEl = document.getElementById('anchors-warning-msg');
      if (warningEl) {
        warningEl.innerText = `⚠️ Por favor selecciona las 2 opciones que más valoras en: ${missing.join(', ')}`;
        warningEl.classList.remove('hidden');
      }

      missing.forEach(cat => {
        let elId = '';
        if (cat.includes('Vivienda')) elId = 'anchor-home';
        else if (cat.includes('Trabajo')) elId = 'anchor-job';
        else if (cat.includes('Transporte')) elId = 'anchor-transport';

        const elem = document.getElementById(elId);
        if (elem) {
          elem.classList.remove('shake-alert');
          void elem.offsetWidth;
          elem.classList.add('shake-alert');
          setTimeout(() => elem.classList.remove('shake-alert'), 600);
        }
      });
    }

