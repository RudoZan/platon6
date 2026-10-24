/* ==========================================================================
   SIMULADOR FINANCIERO VIVENCIAL - CONTROLADOR DE APLICACIÓN (UI & LOGIC)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const engine = new FinancialEngine();

  // Elementos DOM
  const headerBar = document.getElementById("main-header");
  const screens = {
    welcome: document.getElementById("screen-welcome"),
    archetypes: document.getElementById("screen-archetypes"),
    budgetIllusion: document.getElementById("screen-budget-illusion"),
    simulationHub: document.getElementById("screen-simulation-hub"),
    debrief: document.getElementById("screen-debrief")
  };

  let selectedArchetype = null;
  let emergencyTimer = null;
  let emergencyTimeLeft = 15;
  let currentActiveOffer = null;

  // Web Audio FX (Sintetizador sin dependencias externas)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSound(type) {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const now = audioCtx.currentTime;

      if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'coin') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio fallback silencioso
    }
  }

  // Notificaciones Toast
  function showToast(message, icon = "ℹ️") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span style="font-size: 1.3rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Cambio de Pantallas
  function showScreen(screenKey) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    if (screens[screenKey]) {
      screens[screenKey].classList.add("active");
    }
    if (screenKey === "simulationHub" || screenKey === "debrief") {
      headerBar.style.display = "flex";
      updateHeaderGauges();
    } else {
      headerBar.style.display = "none";
    }
  }

  // Actualización de Cabecera y Medidores
  function updateHeaderGauges() {
    const s = engine.state;
    document.getElementById("header-avatar").textContent = GAME_DATA.archetypes.find(a => a.id === s.archetypeId)?.avatar || "💼";
    document.getElementById("header-name").textContent = s.characterName;

    const seasons = { 1: "Verano (Q1)", 2: "Otoño (Q2)", 3: "Invierno (Q3)", 4: "Primavera (Q4)" };
    document.getElementById("header-timeline").textContent = `Año ${s.year} • ${seasons[s.quarter]} (${s.age} años)`;

    const netWorth = engine.getNetWorth();
    document.getElementById("gauge-networth").textContent = `$${netWorth.toLocaleString()} CLP`;
    document.getElementById("gauge-mental").textContent = `${s.mentalPeace}%`;
    document.getElementById("gauge-quality").textContent = `${s.qualityOfLife}%`;
    document.getElementById("gauge-energy").textContent = `${s.actionPoints} / 3`;

    // Barras de progreso
    document.getElementById("bar-mental").style.width = `${s.mentalPeace}%`;
    document.getElementById("bar-quality").style.width = `${s.qualityOfLife}%`;
  }

  // ==========================================
  // PANTALLA 1: BIENVENIDA
  // ==========================================
  document.getElementById("btn-start-quiz").addEventListener("click", () => {
    playSound('click');
    const customName = document.getElementById("input-player-name").value.trim();
    if (customName) engine.state.characterName = customName;
    renderArchetypes();
    showScreen("archetypes");
  });

  // ==========================================
  // PANTALLA 2: ARQUETIPOS
  // ==========================================
  function renderArchetypes() {
    const grid = document.getElementById("archetypes-list");
    grid.innerHTML = "";

    GAME_DATA.archetypes.forEach(arch => {
      const card = document.createElement("div");
      card.className = "glass-card archetype-card";
      card.innerHTML = `
        <div>
          <div class="archetype-header">
            <span class="archetype-avatar">${arch.avatar}</span>
            <div>
              <h3 style="font-size: 1.15rem; margin: 0;">${arch.name}</h3>
              <span class="archetype-badge">${arch.age} años</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${arch.desc}</p>
        </div>
        <div class="archetype-metrics">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-dim);">Sueldo Neto:</span>
            <strong class="text-gradient-emerald">$${arch.salary.toLocaleString()}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-dim);">Ahorro inicial:</span>
            <strong>$${arch.cash.toLocaleString()}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-dim);">Deuda previa:</span>
            <span style="color: ${arch.debt > 0 ? 'var(--accent-coral)' : 'var(--text-muted)'};">$${arch.debt.toLocaleString()}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        playSound('click');
        document.querySelectorAll(".archetype-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedArchetype = arch;
        document.getElementById("btn-confirm-archetype").removeAttribute("disabled");
      });

      grid.appendChild(card);
    });
  }

  document.getElementById("btn-confirm-archetype").addEventListener("click", () => {
    playSound('coin');
    const customName = document.getElementById("input-player-name").value.trim();
    engine.initCharacter(selectedArchetype, customName);
    renderBudgetIllusion();
    showScreen("budgetIllusion");
  });

  // ==========================================
  // PANTALLA 3: ILUSIÓN DE PRESUPUESTO
  // ==========================================
  function renderBudgetIllusion() {
    const leisureInput = document.getElementById("slider-leisure");
    const updateBudget = () => {
      const leisure = parseInt(leisureInput.value);
      document.getElementById("slider-leisure-val").textContent = `$${leisure.toLocaleString()} CLP`;
      const cashflow = engine.calculateMonthlyCashflow(leisure);

      document.getElementById("table-income").textContent = `+$${cashflow.totalIncome.toLocaleString()} CLP`;
      document.getElementById("table-housing").textContent = `-$${cashflow.fixed.housing.toLocaleString()} CLP`;
      document.getElementById("table-transport").textContent = `-$${cashflow.fixed.transport.toLocaleString()} CLP`;
      document.getElementById("table-food-bills").textContent = `-$${(cashflow.fixed.foodBase + cashflow.fixed.basicBills).toLocaleString()} CLP`;
      document.getElementById("table-leisure").textContent = `-$${leisure.toLocaleString()} CLP`;

      const marginElem = document.getElementById("table-margin");
      marginElem.textContent = `${cashflow.netMargin >= 0 ? '+' : ''}$${cashflow.netMargin.toLocaleString()} CLP`;
      marginElem.style.color = cashflow.netMargin >= 0 ? 'var(--accent-cyan)' : 'var(--accent-coral)';
    };

    leisureInput.oninput = updateBudget;
    updateBudget();
  }

  document.getElementById("btn-start-simulation").addEventListener("click", () => {
    playSound('coin');
    const pacCheckbox = document.getElementById("check-pac-initial");
    engine.state.pacEnabled = pacCheckbox.checked;

    renderSimulationHub();
    showScreen("simulationHub");
    showToast("¡Ha comenzado la simulación de vida! Año 1 en curso.", "⏱️");
  });

  // ==========================================
  // PANTALLA 4: HUB CENTRAL DE SIMULACIÓN
  // ==========================================
  function renderSimulationHub() {
    updateHeaderGauges();
    const leisureVal = parseInt(document.getElementById("slider-leisure")?.value || 250000);
    const cf = engine.calculateMonthlyCashflow(leisureVal);
    const s = engine.state;

    // Panel lateral
    document.getElementById("hub-income").textContent = `+$${cf.totalIncome.toLocaleString()}`;
    document.getElementById("hub-fixed").textContent = `-$${cf.totalFixed.toLocaleString()}`;
    document.getElementById("hub-leisure").textContent = `-$${cf.totalVariable.toLocaleString()}`;
    document.getElementById("hub-loans").textContent = `-$${cf.loanQuotas.toLocaleString()}`;
    document.getElementById("hub-netmargin").textContent = `${cf.netMargin >= 0 ? '+' : ''}$${cf.netMargin.toLocaleString()}`;

    document.getElementById("hub-cash").textContent = `$${s.cash.toLocaleString()}`;
    document.getElementById("hub-dap").textContent = `$${Math.round(s.investments.dap).toLocaleString()}`;
    document.getElementById("hub-c2").textContent = `$${Math.round(s.investments.cuenta2).toLocaleString()}`;
    document.getElementById("hub-stocks").textContent = `$${Math.round(s.investments.stocks).toLocaleString()}`;
    document.getElementById("hub-carddebt").textContent = `$${Math.round(s.cardDebt).toLocaleString()}`;

    // Estado de Hábitos (PAC y Combustible)
    const pacStatus = document.getElementById("hub-pac-status");
    const payBillsBtn = document.getElementById("btn-pay-bills-manual");
    if (s.pacEnabled) {
      pacStatus.textContent = "PAC Activo ✅";
      pacStatus.style.borderColor = "var(--accent-emerald)";
      pacStatus.style.color = "var(--accent-emerald)";
      payBillsBtn.style.display = "none";
    } else {
      pacStatus.textContent = "Manual ⚠️";
      pacStatus.style.borderColor = "var(--accent-amber)";
      pacStatus.style.color = "var(--accent-amber)";
      payBillsBtn.style.display = "block";
    }

    const fuelStatus = document.getElementById("hub-fuel-status");
    if (s.vehicle === "A0") {
      fuelStatus.textContent = "🚌 Metro / Bip!";
      fuelStatus.style.color = "var(--text-muted)";
    } else if (s.hasFuel) {
      fuelStatus.textContent = "⛽ Estanque OK";
      fuelStatus.style.color = "var(--accent-emerald)";
    } else {
      fuelStatus.textContent = "⚠️ Sin Bencina";
      fuelStatus.style.color = "var(--accent-coral)";
    }

    document.getElementById("hub-points-badge").textContent = `⚡ ${s.actionPoints} Acciones Disponibles`;

    // Render de los 6 Lugares
    renderCityGrid();

    // Actualizar historial
    const logContainer = document.getElementById("hub-event-log");
    logContainer.innerHTML = "";
    if (s.history.majorLifeEvents.length === 0) {
      logContainer.innerHTML = "<span>• Ciclo iniciado. Tu presupuesto marcha en orden.</span>";
    } else {
      s.history.majorLifeEvents.slice(-5).reverse().forEach(ev => {
        const item = document.createElement("span");
        item.textContent = `• ${ev}`;
        logContainer.appendChild(item);
      });
    }
  }

  // Pago Manual de Cuentas (si PAC está desactivado)
  document.getElementById("btn-pay-bills-manual").addEventListener("click", () => {
    playSound('coin');
    showToast("Cuentas básicas del trimestre pagadas a tiempo. Evitaste cortes.", "✅");
    document.getElementById("btn-pay-bills-manual").style.display = "none";
  });

  function renderCityGrid() {
    const container = document.getElementById("city-locations-container");
    container.innerHTML = "";

    GAME_DATA.locations.forEach(loc => {
      const node = document.createElement("div");
      node.className = "glass-card city-node";
      node.innerHTML = `
        <div class="city-node-icon">${loc.icon}</div>
        <div class="city-node-title">${loc.name}</div>
        <div class="city-node-desc">${loc.desc}</div>
      `;
      node.addEventListener("click", () => {
        playSound('click');
        openLocationModal(loc);
      });
      container.appendChild(node);
    });
  }

  // Modal de Lugares y Oportunidades Fijas
  function openLocationModal(location) {
    const modal = document.getElementById("modal-location");
    document.getElementById("modal-location-title").innerHTML = `${location.icon} ${location.name}`;
    document.getElementById("modal-location-desc").textContent = location.desc;

    const list = document.getElementById("modal-location-actions-list");
    list.innerHTML = "";

    location.actions.forEach(action => {
      const btn = document.createElement("div");
      btn.className = "choice-btn";
      btn.innerHTML = `
        <div class="choice-btn-title">${action.title}</div>
        <div class="choice-btn-consequence">${action.desc} ${action.cost > 0 ? `(Costo: $${action.cost.toLocaleString()} CLP)` : ''}</div>
      `;

      btn.addEventListener("click", () => {
        executeLocationAction(action);
        modal.classList.remove("active");
      });

      list.appendChild(btn);
    });

    modal.classList.add("active");
  }

  document.getElementById("btn-close-location-modal").addEventListener("click", () => {
    document.getElementById("modal-location").classList.remove("active");
  });

  // Ejecución de Oportunidad Fija
  function executeLocationAction(action) {
    if (engine.state.actionPoints <= 0) {
      showToast("No te quedan puntos de acción en este trimestre. Avanza al siguiente período.", "⚠️");
      return;
    }

    if (action.cost > 0 && engine.state.cash < action.cost) {
      showToast(`Fondos insuficientes: necesitas $${action.cost.toLocaleString()} CLP.`, "❌");
      return;
    }

    playSound('coin');
    engine.state.actionPoints -= 1;

    const eff = action.effect;
    if (action.cost > 0) engine.state.cash -= action.cost;

    if (eff.type === "invest_dap") {
      engine.state.investments.dap += action.cost;
      showToast("Depósito a plazo constituido con éxito.", "🏦");
    } else if (eff.type === "invest_mf") {
      engine.state.investments.cuenta2 += action.cost;
      showToast("Aporte a fondos mutuos registrado.", "📈");
    } else if (eff.type === "invest_stocks") {
      engine.state.investments.stocks += action.cost;
      showToast("Acciones adquiridas en la bolsa.", "📈");
    } else if (eff.type === "invest_gold") {
      engine.state.investments.gold += action.cost;
      showToast("Oro adquirido como activo refugio.", "🪙");
    } else if (eff.type === "add_loan") {
      engine.state.cash += eff.amount;
      engine.state.loans.push({
        id: "loan_" + Date.now(),
        title: action.title,
        monthlyQuota: eff.monthlyQuota,
        remainingMonths: eff.months
      });
      showToast("Crédito de consumo aprobado y depositado.", "💵");
    } else if (eff.type === "pay_card_debt") {
      engine.state.cardDebt = Math.max(0, engine.state.cardDebt - eff.amount);
      engine.modifyMentalPeace(15);
      showToast("Abono de deuda realizado. Intereses reducidos.", "✅");
    } else if (eff.type === "add_training") {
      engine.state.trainingsCompleted += 1;
      showToast("¡Certificación profesional completada!", "🎓");
    } else if (eff.type === "evaluate_raise") {
      // Abre el modal enriquecido de evaluación del jefe
      openBossEvalModal();
      return;
    } else if (eff.type === "fill_fuel") {
      engine.state.hasFuel = true;
      showToast("Estanque lleno. Vehículo listo para el trimestre.", "⛽");
    } else if (eff.type === "buy_parking_rent" || eff.type === "buy_storage_rent" || eff.type === "buy_commercial_local") {
      engine.state.investments.realEstateRent += eff.monthlyRent;
      showToast(`Propiedad adquirida: genera +$${eff.monthlyRent.toLocaleString()}/mes de arriendo pasivo.`, "🏢");
    } else if (eff.type === "boost_wellbeing") {
      engine.modifyQualityOfLife(eff.cv);
      showToast("¡Experiencia memorable disfrutada!", "🌟");
    }

    renderSimulationHub();
  }

  // ==========================================
  // MODAL DE EVALUACIÓN LABORAL CON EL JEFE
  // ==========================================
  function openBossEvalModal() {
    const result = engine.evaluateSalaryRaise();
    const modal = document.getElementById("modal-boss-eval");

    // Puntajes en barras
    document.getElementById("eval-score-training").textContent = `${result.details.trainingScore} / 40 pts`;
    document.getElementById("bar-score-training").style.width = `${(result.details.trainingScore / 40) * 100}%`;

    document.getElementById("eval-score-punctuality").textContent = `${result.details.punctualityScore} / 30 pts`;
    document.getElementById("bar-score-punctuality").style.width = `${(result.details.punctualityScore / 30) * 100}%`;

    document.getElementById("eval-score-mood").textContent = `${result.details.moodScore} / 30 pts`;
    document.getElementById("bar-score-mood").style.width = `${(result.details.moodScore / 30) * 100}%`;

    // Diálogo y veredicto
    document.getElementById("eval-boss-dialogue").textContent = `"${result.dialogue}"`;
    const badge = document.getElementById("eval-verdict-badge");
    badge.textContent = `${result.verdict} (${result.raisePercent > 0 ? '+' + result.raisePercent + '%' : '0%'})`;
    badge.style.color = result.raisePercent > 0 ? 'var(--accent-emerald)' : 'var(--accent-coral)';

    modal.classList.add("active");
  }

  document.getElementById("btn-close-boss-modal").addEventListener("click", () => {
    document.getElementById("modal-boss-eval").classList.remove("active");
    renderSimulationHub();
  });

  // ==========================================
  // AVANCE DEL TIEMPO & RONDAS
  // ==========================================
  document.getElementById("btn-advance-quarter").addEventListener("click", () => {
    playSound('click');
    const leisureVal = parseInt(document.getElementById("slider-leisure")?.value || 250000);
    const result = engine.advanceQuarter(leisureVal);

    renderSimulationHub();

    // Ver si llegamos al Año 8
    if (engine.state.year > 8) {
      endGameDebrief();
      return;
    }

    // 1. Verificación de Oferta Comercial Proactiva
    const offer = GAME_DATA.proactiveOffers.find(o => o.year === engine.state.year && o.quarter === engine.state.quarter);
    if (offer) {
      triggerProactiveOffer(offer);
      return;
    }

    // 2. Probabilidad de Imprevisto Súbito (con timer)
    if (Math.random() < 0.42) {
      triggerEmergency();
    } else {
      showToast(`Avanzado a Año ${engine.state.year} (Q${engine.state.quarter}).`, "⏩");
    }
  });

  // Modal de Oferta Proactiva
  function triggerProactiveOffer(offer) {
    playSound('alert');
    currentActiveOffer = offer;
    const modal = document.getElementById("modal-proactive-offer");

    document.getElementById("offer-modal-icon").textContent = offer.icon;
    document.getElementById("offer-modal-title").textContent = offer.title;
    document.getElementById("offer-modal-desc").textContent = `${offer.desc}\n\n• Si aceptas: ${offer.accept.consequence}\n• Si rechazas: ${offer.reject.consequence}`;

    modal.classList.add("active");
  }

  document.getElementById("btn-accept-offer").addEventListener("click", () => {
    playSound('coin');
    const modal = document.getElementById("modal-proactive-offer");
    const off = currentActiveOffer;

    if (off.id === "T1_banco_preaprobado") {
      engine.state.cash += off.accept.cash;
      engine.state.loans.push({
        id: "offer_loan",
        title: "Crédito Pre-aprobado Banco",
        monthlyQuota: off.accept.monthlyQuota,
        remainingMonths: off.accept.months
      });
      showToast("Crédito aceptado. Tienes $5.000.000, pero asumes cuota mensual.", "💵");
    } else if (off.id === "T3_retail_descuento") {
      engine.state.cash += off.accept.savings;
      showToast("Descuento obtenido. Tarjeta de tienda contratada.", "🛍️");
    } else if (off.id === "T4_corredora_depto") {
      engine.state.investments.realEstateRent += (off.accept.monthlyRent - off.accept.dividend);
      showToast("Departamento adquirido en blanco para renta.", "🏢");
    }

    modal.classList.remove("active");
    renderSimulationHub();
  });

  document.getElementById("btn-reject-offer").addEventListener("click", () => {
    playSound('click');
    document.getElementById("modal-proactive-offer").classList.remove("active");
    showToast("Oferta rechazada. Mantienes tu orden financiero.", "🛡️");
    renderSimulationHub();
  });

  // ==========================================
  // MODAL DE EMERGENCIA SÚBITA (TIMER 15 SEG)
  // ==========================================
  function triggerEmergency() {
    playSound('alert');
    const emergency = GAME_DATA.emergencies[Math.floor(Math.random() * GAME_DATA.emergencies.length)];
    const modal = document.getElementById("modal-emergency");

    document.getElementById("emergency-title").textContent = emergency.title;
    document.getElementById("emergency-desc").textContent = emergency.desc;

    const choicesContainer = document.getElementById("emergency-choices-list");
    choicesContainer.innerHTML = "";

    emergency.options.forEach(opt => {
      const btn = document.createElement("div");
      btn.className = "choice-btn";
      btn.innerHTML = `
        <div class="choice-btn-title">${opt.label}</div>
        <div class="choice-btn-consequence">${opt.consequence}</div>
      `;

      btn.addEventListener("click", () => {
        resolveEmergency(opt);
        clearInterval(emergencyTimer);
        modal.classList.remove("active");
      });

      choicesContainer.appendChild(btn);
    });

    // Iniciar temporizador de 15 segundos
    emergencyTimeLeft = 15;
    const timerBar = document.getElementById("emergency-timer-bar");
    const timerText = document.getElementById("emergency-timer-text");
    timerBar.style.width = "100%";
    timerText.textContent = "15 segundos";

    clearInterval(emergencyTimer);
    emergencyTimer = setInterval(() => {
      emergencyTimeLeft -= 0.1;
      const pct = (emergencyTimeLeft / 15) * 100;
      timerBar.style.width = `${Math.max(0, pct)}%`;
      timerText.textContent = `${Math.ceil(emergencyTimeLeft)} segundos`;

      if (emergencyTimeLeft <= 0) {
        clearInterval(emergencyTimer);
        resolveEmergency(emergency.options[1] || emergency.options[0]);
        modal.classList.remove("active");
        showToast("¡Tiempo expirado! Se recurrió a endeudamiento automáticamente.", "⚠️");
      }
    }, 100);

    modal.classList.add("active");
  }

  function resolveEmergency(option) {
    if (option.paymentType === "cash") {
      if (engine.state.cash >= option.cost) {
        engine.state.cash -= option.cost;
        engine.modifyMentalPeace(10);
        showToast("Imprevisto cubierto con fondo líquido. ¡Sin deudas!", "✅");
      } else {
        const debtTaken = option.cost - engine.state.cash;
        engine.state.cash = 0;
        engine.state.cardDebt += debtTaken;
        engine.modifyMentalPeace(-20);
        showToast("Efectivo insuficiente: el saldo cayó a tarjeta de crédito.", "🚨");
      }
    } else if (option.paymentType === "card_installments") {
      engine.state.loans.push({
        id: "emerg_" + Date.now(),
        title: "Cuotas de Imprevisto",
        monthlyQuota: option.quota,
        remainingMonths: option.months
      });
      engine.modifyMentalPeace(-15);
      showToast(`Imprevisto financiado en ${option.months} cuotas fijas.`, "💳");
    } else if (option.paymentType === "postpone") {
      engine.state.cash -= option.cost;
      engine.modifyMentalPeace(-35);
      engine.modifyQualityOfLife(-25);
      showToast("Tratamiento pospuesto. Caída severa en salud y bienestar.", "⚠️");
    } else if (option.paymentType === "abandon") {
      engine.modifyQualityOfLife(-25);
      showToast("Vehículo detenido. Pérdida de horas y calidad de vida.", "🚌");
    }

    renderSimulationHub();
  }

  // ==========================================
  // PANTALLA 5: RADIOGRAFÍA FINAL & GRÁFICO (AÑO 8)
  // ==========================================
  function endGameDebrief() {
    playSound('coin');
    showScreen("debrief");

    const netWorth = engine.getNetWorth();
    const s = engine.state;

    document.getElementById("stat-final-networth").textContent = `$${netWorth.toLocaleString()} CLP`;
    document.getElementById("stat-final-interest-earned").textContent = `+$${Math.round(s.history.interestEarnedFromInvestments).toLocaleString()} CLP`;
    document.getElementById("stat-final-interest-paid").textContent = `-$${Math.round(s.history.interestPaidToBanks).toLocaleString()} CLP`;
    document.getElementById("stat-final-mental").textContent = `${s.mentalPeace}%`;

    // Veredicto
    const title = document.getElementById("final-archetype-title");
    const desc = document.getElementById("final-archetype-desc");
    const icon = document.getElementById("final-archetype-icon");

    if (netWorth > 15000000 && s.mentalPeace >= 70 && s.qualityOfLife >= 65) {
      icon.textContent = "🏆";
      title.textContent = "El Arquitecto de Libertad Financiera";
      desc.textContent = "Lograste el balance soñado: tu patrimonio creció exponencialmente, tus inversiones superaron a los bancos y nunca sacrificaste tu salud ni tus relaciones personales.";
    } else if (s.cardDebt > 3000000 || s.mentalPeace < 40) {
      icon.textContent = "🚨";
      title.textContent = "Atrapado en la Rueda de la Deuda";
      desc.textContent = "Los imprevistos y el pago de cuotas devoraron tu sueldo. Terminaste regalando millones de pesos en intereses a los bancos, con un costo muy alto en tranquilidad mental.";
    } else if (s.qualityOfLife < 45) {
      icon.textContent = "🧱";
      title.textContent = "El Sobreviviente Austero";
      desc.textContent = "Lograste juntar dinero, pero a costa de una vida de privación extrema. Descubriste que el dinero sin vivencias ni disfrute deja un vacío.";
    } else {
      icon.textContent = "⚖️";
      title.textContent = "El Equilibrista Resiliente";
      desc.textContent = "Navegaste 8 años de vida real con altibajos, aprendiendo a sortear crisis y manteniendo a flote tu hogar.";
    }

    // Dibujar Gráfico en Canvas
    drawEvolutionChart(s.history.timelineSnapshots);
  }

  function drawEvolutionChart(snapshots) {
    const canvas = document.getElementById("canvas-evolution-chart");
    if (!canvas || snapshots.length === 0) return;
    const ctx = canvas.getContext("2d");

    // Ajuste de DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    // Encontrar máximos y mínimos para escalar
    const maxNW = Math.max(1, ...snapshots.map(s => s.netWorth));
    const minNW = Math.min(0, ...snapshots.map(s => s.netWorth));
    const rangeNW = (maxNW - minNW) || 1;

    const padding = 30;
    const plotW = w - padding * 2;
    const plotH = h - padding * 2;

    // Líneas guía horizontales
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(w - padding, y);
      ctx.stroke();
    }

    // 1. Dibujar Línea de Patrimonio Neto (Verde Esmeralda)
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.beginPath();
    snapshots.forEach((snap, idx) => {
      const x = padding + (plotW / (snapshots.length - 1 || 1)) * idx;
      const normalizedY = (snap.netWorth - minNW) / rangeNW;
      const y = (padding + plotH) - normalizedY * plotH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 2. Dibujar Línea de Paz Mental (Púrpura)
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    snapshots.forEach((snap, idx) => {
      const x = padding + (plotW / (snapshots.length - 1 || 1)) * idx;
      const y = (padding + plotH) - (snap.mentalPeace / 100) * plotH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 3. Dibujar Línea de Calidad de Vida (Cyan)
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    snapshots.forEach((snap, idx) => {
      const x = padding + (plotW / (snapshots.length - 1 || 1)) * idx;
      const y = (padding + plotH) - (snap.qualityOfLife / 100) * plotH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  document.getElementById("btn-restart-game").addEventListener("click", () => {
    playSound('click');
    location.reload();
  });
});
