// Shared Global State & Cross-Module Helpers — educacionFinanciera

    const SIMULATION_STORAGE_KEY = 'educacionFinanciera.simulationState.v1';
    let simulationPersistenceEnabled = true;

    function createPersistentState(defaultState) {
      let saveTimer = null;
      let rootProxy;
      const proxies = new WeakMap();
      let initialState = defaultState;

      try {
        const savedState = JSON.parse(window.localStorage.getItem(SIMULATION_STORAGE_KEY));
        if (savedState && typeof savedState === 'object' && !Array.isArray(savedState)) {
          initialState = { ...defaultState, ...savedState };
        }
      } catch (error) {
        try {
          window.localStorage.removeItem(SIMULATION_STORAGE_KEY);
        } catch (storageError) {
          console.warn('No se pudo acceder al progreso guardado.', storageError);
        }
      }

      const save = () => {
        if (!simulationPersistenceEnabled) return;
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => {
          if (!simulationPersistenceEnabled) return;
          try {
            window.localStorage.setItem(SIMULATION_STORAGE_KEY, JSON.stringify(rootProxy));
          } catch (error) {
            console.warn('No se pudo guardar el progreso de la simulación.', error);
          }
        }, 100);
      };

      const wrap = value => {
        if (!value || typeof value !== 'object') return value;
        if (proxies.has(value)) return proxies.get(value);
        const proxy = new Proxy(value, {
          get(target, property, receiver) {
            return wrap(Reflect.get(target, property, receiver));
          },
          set(target, property, nextValue, receiver) {
            const changed = Reflect.set(target, property, nextValue, receiver);
            save();
            return changed;
          },
          deleteProperty(target, property) {
            const deleted = Reflect.deleteProperty(target, property);
            if (deleted) save();
            return deleted;
          }
        });
        proxies.set(value, proxy);
        proxies.set(proxy, proxy);
        return proxy;
      };

      rootProxy = wrap(initialState);
      return rootProxy;
    }

    // ESTADO GLOBAL DEL PERSONAJE (CONFIGURACIÓN POR DEFECTO PARA DESARROLLO)
    const state = createPersistentState({
      currentSlideIdx: 0,
      activeHudTab: null,
      simulationDay: 1,
      simulationMonth: 0,
      simulationYear: 1,
      simulationClockRunning: false,
      profileCompleted: false,
      totalBolitas: 25,
      assignedBolitas: 21,
      selectedHomes: [0, 1], // Casa o Depto y Departamento centro
      selectedJobs: [0, 1],  // Freelance y Trabajo dependiente
      selectedTransports: [1, 2], // City Car y Locomoción colectiva
      selectedHome: 1, // Opción activa / primaria
      selectedJob: 1,  // Opción activa / primaria
      selectedTransport: 1, // Opción activa / primaria
      lifestyleChoices: {
        home: 'Casa o Depto / Departamento centro',
        job: 'Freelance / Trabajo dependiente',
        transport: 'City Car / Locomoción colectiva'
      },
      cash: 5000000, // Dinero físico en efectivo inicial (siempre presente)
      bankAccounts: [], // Al partir no tiene cuentas bancarias contratadas (solo figuran si han sido contratadas)
      creditCard: null, // Al partir no tiene tarjeta de crédito contratada
      creditLine: null, // Al partir no tiene línea de crédito contratada
      insurances: [], // Al partir no tiene seguros contratados
      termDeposits: [], // Al partir no tiene depósitos a plazo contratados
      mutualFunds: [], // Al partir no tiene fondos mutuos contratados
      otherInvestments: [], // Al partir no tiene instrumentos en Otras Inversiones
      foreignCurrencies: {}, // Saldos en moneda extranjera (USD, EUR, JPY, PEN, ARS, BRL)
      debts: [], // Al partir no tiene deudas contratadas (cada crédito aparecerá individualmente al contraerlo)
      reserves: 0, // Al partir no tiene fondo de reserva acumulado
      invested: 0, // Al partir no tiene inversiones activas
      monthlyDebt: 0, // Al partir no tiene deudas contraídas
      healthPhysical: 20, // Salud Física: 20/20 pts (20% del bienestar total)
      healthEmotional: 40, // Salud Emocional: 40/40 pts (40% del bienestar total)
      healthMental: 40, // Salud Mental: 40/40 pts (40% del bienestar total)
      mentalPeace: 100, // Bienestar Total (20 + 40 + 40 = 100)
      currentJob: null, // Al partir no tiene empleo
      courses: [], // Al partir no tiene cursos o especializaciones cursadas
      jobHistory: [], // Historial de empleos previos desempeñados
      properties: [],      // Al partir no tiene propiedades
      vehicles: [],        // Al partir no tiene vehículos
      riskTestResult: null, // Al partir no ha hecho el test de perfil de riesgo
      budgetItems: [
        { id: 'vivienda', name: 'Vivienda', desc: 'Arriendo o dividendo + gastos comunes', icon: '🏠', budget: 0, real: 0 },
        { id: 'servicios', name: 'Servicios', desc: 'Luz, agua, gas, internet y telefonía', icon: '💡', budget: 0, real: 0 },
        { id: 'alimentacion', name: 'Alimentación', desc: 'Supermercado y despensa básica', icon: '🛒', budget: 0, real: 0 },
        { id: 'bencina_tags', name: 'Bencina + Tags', desc: 'Combustible y peajes', icon: '⛽', budget: 0, real: 0 },
        { id: 'tarjeta_bip', name: 'Tarjeta bip!', desc: 'Locomoción colectiva (metro/micro)', icon: '🚌', budget: 0, real: 0 },
        { id: 'salidas_ocio', name: 'Salidas y Ocio', desc: 'Restaurantes, delivery, cafés y panoramas', icon: '🍽️', budget: 0, real: 0 },
        { id: 'suscripciones', name: 'Suscripciones y Hobbies', desc: 'Streaming, gimnasio y recreación', icon: '🎮', budget: 0, real: 0 },
        { id: 'vestuario', name: 'Vestuario y Cuidado Personal', desc: 'Ropa, peluquería y artículos personales', icon: '👕', budget: 0, real: 0 },
        { id: 'reserva', name: 'Fondo de Reserva', desc: 'Ahorro para emergencias o proyectos', icon: '🛡️', budget: 0, real: 0 }
      ],
      customBudgetItems: [],
      showAddBudgetForm: false,
      newBudgetType: 'free',
      newBudgetInvestType: 'alcancia',
      categories: [
        { id: 'vivienda', name: '🏠 Hogar & Decoración', dots: 2 },
        { id: 'movilidad', name: '🚗 Comodidad al movilizarse', dots: 1 },
        { id: 'mascotas', name: '🐾 Mascotas & Animales', dots: 1 },
        { id: 'tech', name: '💻 Tecnología & Herramientas', dots: 2 },
        { id: 'viajes', name: '✈️ Viajes & Vacaciones', dots: 2 },
        { id: 'gastronomia', name: '🍽️ Gastronomía & Salidas', dots: 2 },
        { id: 'conciertos', name: '🎸 Conciertos & Festivales', dots: 1 },
        { id: 'educacion', name: '📚 Educación & Aprendizaje', dots: 2 },
        { id: 'seguridad', name: '🛡️ Paz Financiera y Reservas', dots: 2 },
        { id: 'hobbies', name: '🎨 Hobbies & Pasatiempos', dots: 1 },
        { id: 'deporte', name: '🏋️ Deporte & Salud Física', dots: 1 },
        { id: 'naturaleza', name: '🏕️ Naturaleza & Vida al Aire Libre', dots: 1 },
        { id: 'moda', name: '👗 Moda, Imagen & Estilo', dots: 1 },
        { id: 'gaming', name: '🎮 Gaming & Ocio Digital', dots: 1 },
        { id: 'familia', name: '🤝 Familia & Amigos', dots: 1 }
      ],
      apvAccount: null, // Cuenta APV contratada (régimen, multifondo, saldo y aporte mensual)
      cuenta2Account: null, // Cuenta 2 AFP contratada (multifondo, saldo y aporte mensual)
    });

    let simulationClockInterval = null;

    function renderSimulationDate() {
      const dateElement = document.getElementById('slide-top-date');
      if (!dateElement) return;
      const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const day = String(state.simulationDay).padStart(2, '0');
      const year = String(state.simulationYear).padStart(2, '0');
      dateElement.textContent = `${day}-${monthLabels[state.simulationMonth]}-Año${year}`;
    }

    function advanceSimulationDay() {
      if (document.visibilityState !== 'visible' || !document.hasFocus()) return;
      const monthLengths = [31, isSimulationLeapYear(state.simulationYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      state.simulationDay += 1;
      if (state.simulationDay > monthLengths[state.simulationMonth]) {
        state.simulationDay = 1;
        state.simulationMonth += 1;
        if (state.simulationMonth >= monthLengths.length) {
          state.simulationMonth = 0;
          state.simulationYear += 1;
        }
      }
      renderSimulationDate();
      if (typeof processDailyFinancialEvents === 'function') processDailyFinancialEvents();
      if (state.simulationDay === 1 && typeof processMonthlyFinancialEvents === 'function') {
        processMonthlyFinancialEvents();
      }
    }

    function isSimulationLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    function startSimulationClock() {
      if (simulationClockInterval) return;
      state.simulationClockRunning = true;
      if (document.visibilityState !== 'visible' || !document.hasFocus()) return;
      const startButton = document.getElementById('simulation-start-button');
      if (startButton) {
        startButton.disabled = true;
        startButton.innerHTML = '<span>Simulación en curso</span>';
      }
      simulationClockInterval = window.setInterval(advanceSimulationDay, 2000);
    }

    function stopSimulationClock() {
      if (simulationClockInterval) window.clearInterval(simulationClockInterval);
      simulationClockInterval = null;
    }

    function syncSimulationClockVisibility() {
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        if (state.simulationClockRunning && !simulationClockInterval) startSimulationClock();
        return;
      }
      stopSimulationClock();
    }

    function resetSimulators() {
      if (!window.confirm('Se reiniciarán la fecha y todas las decisiones de la simulación. ¿Continuar?')) return;
      stopSimulationClock();
      simulationPersistenceEnabled = false;
      try {
        window.localStorage.removeItem(SIMULATION_STORAGE_KEY);
      } catch (error) {
        console.warn('No se pudo borrar el progreso guardado.', error);
      }
      window.location.reload();
    }

    // COMPROBACIÓN DE PERFIL COMPLETO (INTERESES PRIORIZADOS + ESTILO DE VIDA CON 2 OPCIONES C/U)
    function checkProfileCompletion() {
      const hasPrioritizedInterests = state.categories && state.categories.some(c => c.dots > 1);
      const hasHome = Boolean(state.selectedHomes && state.selectedHomes.length === 2);
      const hasJob = Boolean(state.selectedJobs && state.selectedJobs.length === 2);
      const hasTransport = Boolean(state.selectedTransports && state.selectedTransports.length === 2);
      const isComplete = Boolean(hasPrioritizedInterests && hasHome && hasJob && hasTransport);
      return {
        isComplete,
        hasPrioritizedInterests,
        hasHome,
        hasJob,
        hasTransport
      };
    }

    // SINCRONIZAR SELECCIÓN VISUAL DE ESTILO DE VIDA EN EL DOM (2 OPCIONES LIBRES)
    function syncDefaultAnchorsUI() {
      const homeOptionsEls = document.querySelectorAll('#anchor-home .anchor-option');
      homeOptionsEls.forEach((el, idx) => {
        el.classList.toggle('selected', Boolean(state.selectedHomes && state.selectedHomes.includes(idx)));
      });

      const jobOptionsEls = document.querySelectorAll('#anchor-job .anchor-option');
      jobOptionsEls.forEach((el, idx) => {
        el.classList.toggle('selected', Boolean(state.selectedJobs && state.selectedJobs.includes(idx)));
      });

      const transOptionsEls = document.querySelectorAll('#anchor-transport .anchor-option');
      transOptionsEls.forEach((el, idx) => {
        el.classList.toggle('selected', Boolean(state.selectedTransports && state.selectedTransports.includes(idx)));
      });

      const isComplete = (
        state.selectedHomes && state.selectedHomes.length === 2 &&
        state.selectedJobs && state.selectedJobs.length === 2 &&
        state.selectedTransports && state.selectedTransports.length === 2
      );
      const btn = document.getElementById('btn-confirm-anchors');
      if (btn) btn.disabled = !isComplete;
    }

    // INICIALIZACIÓN
    window.addEventListener('DOMContentLoaded', () => {
      renderSimulationDate();
      renderSlideCarousel();
      initSlideTrackInteractions();
      renderBolitas();
      calculateTotalBolitas();
      syncDefaultAnchorsUI();
      updateHUD();
      updateInterestsValidation();
      const restoredSlide = Math.min(Math.max(0, Number(state.currentSlideIdx) || 0), slidesData.length - 1);
      selectSlide(restoredSlide);
      syncSimulationClockVisibility();
    });

    window.addEventListener('focus', syncSimulationClockVisibility);
    window.addEventListener('blur', syncSimulationClockVisibility);
    window.addEventListener('pageshow', syncSimulationClockVisibility);
    document.addEventListener('visibilitychange', syncSimulationClockVisibility);
    window.addEventListener('pagehide', () => {
      stopSimulationClock();
      if (!simulationPersistenceEnabled) return;
      try {
        window.localStorage.setItem(SIMULATION_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn('No se pudo guardar el progreso de la simulación.', error);
      }
    });


    function getAssetInsurancePricing(insuranceId, assetId, assetObj) {
      if (insuranceId === 'automotriz') {
        if (assetObj && assetObj.price) return assetObj.price;
        const text = ((assetId || '') + ' ' + (assetObj ? (assetObj.name || '') + ' ' + (assetObj.sub || '') : '')).toLowerCase();
        if (text.includes('suv') || text.includes('camioneta')) return 38000;
        if (text.includes('city') || text.includes('compacto')) return 28000;
        if (text.includes('deportivo') || text.includes('lujo')) return 65000;
        return 32000;
      }
      if (insuranceId === 'vivienda') {
        if (assetObj && assetObj.price) return assetObj.price;
        const text = ((assetId || '') + ' ' + (assetObj ? (assetObj.name || '') + ' ' + (assetObj.sub || '') : '')).toLowerCase();
        if (text.includes('condominio')) return 15500;
        if (text.includes('depto') || text.includes('centro') || text.includes('departamento')) return 11000;
        if (text.includes('barrio') || text.includes('casa')) return 13500;
        if (text.includes('parcela')) return 22000;
        return 12000;
      }
      return 0;
    }

    function getUserInsuranceAssets(insuranceId) {
      if (insuranceId === 'automotriz') {
        const list = [];
        if (Array.isArray(state.vehicles) && state.vehicles.length > 0) {
          state.vehicles.forEach((v, idx) => {
            const id = typeof v === 'object' ? (v.id || `veh_${idx}`) : `veh_${idx}`;
            const name = typeof v === 'object' ? (v.name || 'Vehículo propio') : v;
            const sub = typeof v === 'object' ? (v.sub || v.model || 'Auto registrado') : 'Vehículo registrado';
            const icon = typeof v === 'object' && v.icon ? v.icon : '🚗';
            const price = typeof v === 'object' && v.price ? v.price : getAssetInsurancePricing('automotriz', id, { name, sub });
            list.push({ id, name, sub, icon, price });
          });
        }
        return list;
      }
      if (insuranceId === 'vivienda') {
        const list = [];
        if (Array.isArray(state.properties) && state.properties.length > 0) {
          state.properties.forEach((p, idx) => {
            const id = typeof p === 'object' ? (p.id || `prop_${idx}`) : `prop_${idx}`;
            const name = typeof p === 'object' ? (p.name || 'Inmueble propio') : p;
            const sub = typeof p === 'object' ? (p.sub || p.desc || 'Inmueble propio') : 'Inmueble registrado';
            const icon = typeof p === 'object' && p.icon ? p.icon : '🏠';
            const price = typeof p === 'object' && p.price ? v.price : getAssetInsurancePricing('vivienda', id, { name, sub });
            list.push({ id, name, sub, icon, price });
          });
        }
        return list;
      }
      if (insuranceId === 'fraude') {
        const list = [];
        (state.bankAccounts || []).forEach(a => {
          const isAhorro = a.type === 'ahorro' || (a.id || '').includes('ahorro') || (a.name || '').toLowerCase().includes('ahorro');
          if (!isAhorro) {
            list.push({ id: a.id, name: a.name, sub: 'Cuenta bancaria', price: 1150 });
          }
        });
        if (state.creditCard) list.push({ id: 'tarjeta', name: 'Tarjeta de Crédito', sub: 'Línea de crédito rotativo', price: 1150 });
        return list;
      }
      if (insuranceId === 'desgravamen') {
        const list = [];
        if (state.creditLine) list.push({ id: 'linea', name: 'Línea de Crédito ($500.000)', sub: 'Sobregiro en Cuenta Corriente', price: 1900 });
        (state.debts || []).forEach(d => list.push({ id: d.id, name: d.name || 'Crédito', sub: `Saldo: $${(d.amount || 0).toLocaleString('es-CL')}`, price: 1900 }));
        return list;
      }
      if (insuranceId === 'cesantia') {
        const list = [];
        if (state.creditLine) list.push({ id: 'linea', name: 'Línea de Crédito ($500.000)', sub: 'Sobregiro', price: 4500 });
        (state.debts || []).forEach(d => list.push({ id: d.id, name: d.name || 'Crédito', sub: 'Compromiso de pago', price: 4500 }));
        return list;
      }
      return [];
    }


    function renderHubCentralStage(tabName) {
      const data = hubsData[tabName];
      if (!data) return;

      const titleElem = document.getElementById('hub-stage-title');
      const subtitleElem = document.getElementById('hub-stage-subtitle');
      const iconBox = document.getElementById('hub-stage-icon-box');
      const container = document.getElementById('hub-stage-sections');

      if (tabName === 'estado') {
        // Cabecera: Ícono idéntico al del dock inferior (Personal)
        if (iconBox) {
          iconBox.className = 'hub-stage-header-icon dock-icon-box icon-estado';
          iconBox.style.cursor = 'pointer';
          iconBox.title = 'Resumen de variables del personaje';
          iconBox.onclick = () => renderPersonalStage('secret_summary');
          iconBox.innerHTML = `
            <svg viewBox="0 0 52 52" style="width: 17px; height: 17px; display: block;" fill="none">
              <circle cx="26" cy="14" r="8" fill="#ffffff" />
              <path d="M10 40C10 31.5 17 25 26 25C35 25 42 31.5 42 40" fill="#ffffff" fill-opacity="0.45" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
            </svg>
          `;
        }
        if (titleElem) titleElem.innerText = 'Personal';
        if (subtitleElem) subtitleElem.innerText = 'Vida personal, bienestar y finanzas';
        renderPersonalStage('main');
        return;
      }

      if (tabName === 'trabajo') {
        renderTrabajoStage('main');
        return;
      }

      if (tabName === 'banco') {
        renderBancoStage('main');
        return;
      }

      if (tabName === 'inversiones') {
        renderInversionesStage('main');
        return;
      }

      // Otros hubs (Banco, Inversiones, Comercio, etc.)
      if (iconBox) {
        iconBox.style.cursor = 'default';
        iconBox.onclick = null;
        iconBox.removeAttribute('title');
        iconBox.className = `hub-stage-header-icon dock-icon-box icon-${tabName}`;
        const iconsMap = { banco: '🏦', inversiones: '📈', corredora: '🏠', comercio: '🛍️', actividades: '🎟️', trabajo: '💼' };
        iconBox.innerHTML = `<span>${iconsMap[tabName] || '📌'}</span>`;
      }
      if (titleElem) titleElem.innerText = data.title;
      if (subtitleElem) subtitleElem.innerText = data.subtitle;

      if (container) {
        container.innerHTML = `
          <div class="hub-grid-2col">
            ${data.sections.map(sec => `
              <div class="hub-option-card" ${sec.action ? `onclick="${sec.action}"` : ''}>
                <div class="hub-option-icon">${sec.icon || '📌'}</div>
                <div class="hub-option-text">
                  <div class="hub-option-name">${sec.name}</div>
                  ${sec.desc ? `<div class="hub-option-desc">${sec.desc}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    // OBTENER CARITA SEGÚN NIVEL DE BIENESTAR (ESCALA DE 11 NIVELES, DE 2 EN 2 CORAZONES)
    function getBienestarFace(peaceValue) {
      const filledCount = Math.min(20, Math.max(0, Math.round(peaceValue / 5)));
      if (filledCount >= 20) return '🤩'; // 1 (20 corazones: plenitud total)
      if (filledCount >= 18) return '😁'; // 5 (18-19 corazones: radiante)
      if (filledCount >= 16) return '😊'; // 7 (16-17 corazones: tranquilo y feliz)
      if (filledCount >= 14) return '😐'; // 12 (14-15 corazones: neutro / estable)
      if (filledCount >= 12) return '🤨'; // 14 (12-13 corazones: duda / ajuste)
      if (filledCount >= 10) return '😟'; // 18 (10-11 corazones: preocupado)
      if (filledCount >= 8) return '🥺'; // 21 (8-9 corazones: apretado / suplicante)
      if (filledCount >= 6) return '😰'; // 24 (6-7 corazones: estrés con sudor frío)
      if (filledCount >= 4) return '😩'; // 27 (4-5 corazones: desesperado)
      if (filledCount >= 2) return '😱'; // 28 (2-3 corazones: pánico financiero)
      return '😵';                        // 29 (0-1 corazones: colapso / quiebra)
    }

    // GENERAR 20 CORAZONES DE BIENESTAR (2 FILAS DE 10, CADA UNO = 5%)
    function renderHeartsMeter(peaceValue) {
      const filledCount = Math.min(20, Math.max(0, Math.round(peaceValue / 5)));

      const makeHeartSvg = (isFilled) => `
        <svg class="heart-svg ${isFilled ? 'filled' : 'empty'}" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;

      let row1 = '';
      let row2 = '';
      for (let c = 1; c <= 10; c++) {
        const topHeartIndex = (c - 1) * 2 + 1;
        const bottomHeartIndex = (c - 1) * 2 + 2;
        row1 += makeHeartSvg(topHeartIndex <= filledCount);
        row2 += makeHeartSvg(bottomHeartIndex <= filledCount);
      }

      return `
        <div class="hearts-meter-wrap" style="margin-top: 6px;">
          <div class="hearts-row">${row1}</div>
          <div class="hearts-row">${row2}</div>
        </div>
      `;
    }


    function selectHudTab(tabName) {
      if (tabName !== 'trabajo') {
        initNegChat();
      }
      state.activeHudTab = tabName;
      document.querySelectorAll('.hud-dock-tab').forEach(t => t.classList.toggle('active', t.id === `tab-${tabName}`));

      // Ocultar vistas de diapositivas en la zona central
      document.querySelectorAll('.step-view').forEach(v => v.classList.add('hidden'));

      // Renderizar y mostrar las secciones del lugar en la zona central
      renderHubCentralStage(tabName);
      const hubView = document.getElementById('view-hub-stage');
      if (hubView) hubView.classList.remove('hidden');
    }

    // VOLVER A LA VISTA DE LA DIAPOSITIVA ACTIVA
    function returnToSlideView() {
      initNegChat();
      state.activeHudTab = null;
      document.querySelectorAll('.hud-dock-tab').forEach(t => t.classList.remove('active'));
      const currentSlide = slidesData[state.currentSlideIdx];
      if (currentSlide) {
        activateInteractiveView(currentSlide);
      }
    }

    function updateHUD() {
      // Estado de la barra inferior sincronizado
    }
