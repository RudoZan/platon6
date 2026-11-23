// Shared Global State & Cross-Module Helpers — educacionFinanciera

    function clearLegacySavedProgress() {
      const storageKey = 'educacionFinanciera.simulationState.v1';
      for (const storageName of ['localStorage', 'sessionStorage']) {
        try {
          window[storageName].removeItem(storageKey);
        } catch (error) {
          console.warn(`No se pudo borrar el progreso antiguo de ${storageName}.`, error);
        }
      }
    }

    clearLegacySavedProgress();

    let activeFinancialMovementDetail = '';

    function withFinancialMovementDetail(detail, operation) {
      const previousDetail = activeFinancialMovementDetail;
      activeFinancialMovementDetail = String(detail || '').trim();
      try {
        return operation();
      } finally {
        activeFinancialMovementDetail = previousDetail;
      }
    }

    function recordFinancialMovement({ detail, amount, direction, accountId, accountName }) {
      const value = Math.max(0, Math.round(Number(amount) || 0));
      if (!value) return;
      if (!Array.isArray(state.finances.financialMovements)) state.finances.financialMovements = [];
      state.finances.financialMovements.push({
        id: `movement_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
        timestamp: Date.now(),
        year: Number(state.simulation.year) || 1,
        month: Number(state.simulation.month) || 0,
        day: Number(state.simulation.day) || 1,
        detail: String(detail || 'Movimiento financiero'),
        expense: direction === 'expense' ? value : 0,
        income: direction === 'income' ? value : 0,
        accountId: accountId || 'cash',
        accountName: accountName || 'Efectivo'
      });
    }

    function createState(defaultState) {
      let rootProxy;
      const proxies = new WeakMap();

      const wrap = value => {
        if (!value || typeof value !== 'object') return value;
        if (proxies.has(value)) return proxies.get(value);
        const proxy = new Proxy(value, {
          get(target, property, receiver) {
            return wrap(Reflect.get(target, property, receiver));
          },
          set(target, property, nextValue, receiver) {
            const previousValue = Reflect.get(target, property, receiver);
            const changed = Reflect.set(target, property, nextValue, receiver);
            if (changed && (property === 'cash' || property === 'balance')
              && Number.isFinite(Number(previousValue)) && Number.isFinite(Number(nextValue))
              && Number(previousValue) !== Number(nextValue)) {
              const isCash = property === 'cash' && target === defaultState.finances;
              const bankAccounts = isCash ? [] : rootProxy.finances.bankAccounts;
              const account = Array.isArray(bankAccounts)
                ? bankAccounts.find(item => item === receiver)
                : null;
              if (isCash || account) {
                const difference = Number(nextValue) - Number(previousValue);
                const accountName = isCash ? 'Efectivo' : (account.name || 'Cuenta bancaria');
                recordFinancialMovement({
                  detail: activeFinancialMovementDetail || `${difference > 0 ? 'Ingreso a' : 'Egreso de'} ${accountName}`,
                  amount: Math.abs(difference),
                  direction: difference > 0 ? 'income' : 'expense',
                  accountId: isCash ? 'cash' : (account.id || 'bank_account'),
                  accountName
                });
              }
            }
            return changed;
          },
          deleteProperty: Reflect.deleteProperty
        });
        proxies.set(value, proxy);
        proxies.set(proxy, proxy);
        return proxy;
      };

      rootProxy = wrap(defaultState);
      return rootProxy;
    }

    const state = createState({
      persona: {
        profileCompleted: false,
        totalBolitas: 25,
        assignedBolitas: 21,
        selectedHomes: [0, 1],
        selectedJobs: [0, 1],
        selectedTransports: [1, 2],
        selectedHome: 1,
        selectedJob: 1,
        selectedTransport: 1,
        lifestyleChoices: {
          home: 'Casa o Depto / Departamento centro',
          job: 'Freelance / Trabajo dependiente',
          transport: 'City Car / Locomoción colectiva'
        },
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
        dilemmaAnswers: {},
        sessionCode: null
      },
      config: { simulationSpeedMsPerDay: 2000 },
      simulation: {
        currentSlideIdx: 0,
        day: 1,
        month: 0,
        year: 1,
        clockRunning: false,
        maxYears: 50
      },
      finances: {
        cash: 5000000,
        bankAccounts: [],
        financialMovements: [],
        creditCard: null,
        creditLine: null,
        insurances: [],
        termDeposits: [],
        mutualFunds: [],
        otherInvestments: [],
        foreignCurrencies: {},
        debts: [],
        reserves: 0,
        invested: 0,
        monthlyDebt: 0,
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
        apvAccount: null,
        cuenta2Account: null
      },
      assets: {
        properties: [],
        propertyListings: [],
        propertyRentalListings: [],
        rentedProperties: [],
        vehicles: []
      },
      work: {
        currentJob: null,
        courses: [],
        enrolledCourses: [],
        jobHistory: [],
        workExperienceMonths: 0,
        appliedCourseRaises: [],
        promotionsEarned: 0
      },
      wellbeing: {
        healthPhysical: 20,
        healthEmotional: 40,
        healthMental: 40,
        mentalPeace: 100,
        riskTestResult: null
      },
      interface: {
        activeHudTab: null,
        activeInvestmentSubView: null,
        investmentFilter: 'all',
        showAddBudgetForm: false,
        newBudgetType: 'free',
        newBudgetInvestType: 'alcancia',
        riskTempAnswers: []
      }
    });

    window.getSimulationDebugState = () => state;

    let simulationClockInterval = null;

    function renderSimulationDate() {
      const dateElement = document.getElementById('slide-top-date');
      if (!dateElement) return;
      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const day = String(state.simulation.day).padStart(2, '0');
      const status = state.simulation.clockRunning ? '' : ' · Detenido';
      const yearSpan = document.createElement('span');
      yearSpan.textContent = `Año ${state.simulation.year}${status}`;
      dateElement.replaceChildren(`${day} de ${monthNames[state.simulation.month]} `, yearSpan);
    }

    function advanceSimulationDay() {
      if (document.visibilityState !== 'visible' || !document.hasFocus()) return;
      if (state.simulation.year >= state.simulation.maxYears
        && state.simulation.month === 11 && state.simulation.day === 31) {
        setSimulationRunning(false);
        return;
      }
      const monthLengths = [31, isSimulationLeapYear(state.simulation.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      state.simulation.day += 1;
      if (state.simulation.day > monthLengths[state.simulation.month]) {
        state.simulation.day = 1;
        state.simulation.month += 1;
        if (state.simulation.month >= monthLengths.length) {
          state.simulation.month = 0;
          state.simulation.year += 1;
        }
      }
      renderSimulationDate();
      if (typeof processDailyFinancialEvents === 'function') processDailyFinancialEvents();
      if (state.simulation.day === 1 && typeof processMonthlyFinancialEvents === 'function') {
        processMonthlyFinancialEvents();
      }
    }

    function isSimulationLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    function getCurrentJobTenureMonths(job = state.work.currentJob) {
      const start = job && job.tenureStartDate;
      if (!start || !Number.isFinite(Number(start.year)) || !Number.isFinite(Number(start.month)) || !Number.isFinite(Number(start.day))) {
        return Math.max(0, Number(job && job.tenureMonths) || 0);
      }
      const monthDifference = ((Number(state.simulation.year) - Number(start.year)) * 12)
        + Number(state.simulation.month) - Number(start.month);
      return Math.max(0, monthDifference - (Number(state.simulation.day) < Number(start.day) ? 1 : 0));
    }

    function getSimulationMonthIndex(year = state.simulation.year, month = state.simulation.month) {
      return ((Number(year) || 1) - 1) * 12 + (Number(month) || 0);
    }

    function getCurrentJobMonthNumber(job = state.work.currentJob, monthIndex = getSimulationMonthIndex()) {
      if (!job) return 0;
      const start = job.tenureStartDate;
      if (!start || !Number.isFinite(Number(start.year)) || !Number.isFinite(Number(start.month))) {
        return Math.max(1, (Number(job.tenureMonths) || 0) + 1);
      }
      return Math.max(1, monthIndex - getSimulationMonthIndex(start.year, start.month) + 1);
    }

    function depositJobSalary(job, amount) {
      const payment = Math.max(0, Math.round(Number(amount) || 0));
      const account = job && job.salaryAccountId && job.salaryAccountId !== 'cash'
        ? (state.finances.bankAccounts || []).find(item => item.id === job.salaryAccountId && item.type !== 'credit')
        : null;
      if (account) {
        withFinancialMovementDetail('Pago de sueldo', () => creditBankAccount(account.id, payment));
        return;
      }
      if (job && job.salaryAccountId && job.salaryAccountId !== 'cash') job.salaryAccountId = 'cash';
      withFinancialMovementDetail('Pago de sueldo', () => {
        state.finances.cash = (Number(state.finances.cash) || 0) + payment;
      });
    }

    function recordJobSalaryPayment(job, amount, date) {
      if (!job) return;
      if (!Array.isArray(job.salaryPaymentHistory)) job.salaryPaymentHistory = [];
      const payment = Math.max(0, Math.round(Number(amount) || 0));
      job.salaryPaymentHistory.push({
        amount: payment,
        year: Number(date?.year) || Number(state.simulation.year) || 1,
        month: Number(date?.month) || 0,
        day: Number(date?.day) || Number(state.simulation.day) || 1,
        timestamp: Date.now()
      });
      if (job.salaryPaymentHistory.length > 12) job.salaryPaymentHistory.splice(0, job.salaryPaymentHistory.length - 12);
      job.lastNetSalary = payment;
      job.lastSalaryPaidDate = {
        year: Number(date?.year) || Number(state.simulation.year) || 1,
        month: Number(date?.month) || 0,
        day: Number(date?.day) || Number(state.simulation.day) || 1
      };
    }

    function debitBankAccountWithCreditLine(accountId, amount) {
      const account = (state.finances.bankAccounts || []).find(item => item.id === accountId && item.type !== 'credit');
      const debit = Math.max(0, Math.round(Number(amount) || 0));
      if (!account || debit <= 0) return false;
      const balance = Number(account.balance) || 0;
      if (balance >= debit) {
        withFinancialMovementDetail(activeFinancialMovementDetail || 'Pago desde cuenta bancaria', () => {
          account.balance = balance - debit;
        });
        return true;
      }

      const isCheckingAccount = account.id === 'acc_corriente' || account.type === 'corriente';
      const line = state.finances.creditLine;
      const shortfall = debit - Math.max(0, balance);
      const availableCredit = Math.max(0, (Number(line?.limit) || 0) - (Number(line?.used) || 0)
        - (Number(line?.accruedInterest) || 0) - (Number(line?.currentDayInterest) || 0));
      if (!isCheckingAccount || !line || shortfall > availableCredit) return false;

      withFinancialMovementDetail(activeFinancialMovementDetail || 'Pago desde cuenta y Línea de Crédito', () => {
        account.balance = 0;
      });
      line.used = (Number(line.used) || 0) + shortfall;
      recordFinancialMovement({
        detail: activeFinancialMovementDetail || 'Uso de Línea de Crédito para completar pago',
        amount: shortfall,
        direction: 'expense',
        accountId: line.id,
        accountName: 'Línea de Crédito'
      });
      return true;
    }

    function getBankAccountSpendableBalance(accountId) {
      const account = (state.finances.bankAccounts || []).find(item => item.id === accountId && item.type !== 'credit');
      if (!account) return 0;
      const balance = Math.max(0, Number(account.balance) || 0);
      const isCheckingAccount = account.id === 'acc_corriente' || account.type === 'corriente';
      if (!isCheckingAccount || !state.finances.creditLine) return balance;
      return balance + Math.max(0, (Number(state.finances.creditLine.limit) || 0) - (Number(state.finances.creditLine.used) || 0)
        - (Number(state.finances.creditLine.accruedInterest) || 0) - (Number(state.finances.creditLine.currentDayInterest) || 0));
    }

    function creditBankAccount(accountId, amount) {
      const account = (state.finances.bankAccounts || []).find(item => item.id === accountId && item.type !== 'credit');
      const credit = Math.max(0, Math.round(Number(amount) || 0));
      if (!account || credit <= 0) return false;
      let remainingCredit = credit;
      const isCheckingAccount = account.id === 'acc_corriente' || account.type === 'corriente';
      if (isCheckingAccount && state.finances.creditLine) {
        const accruedInterest = Number(state.finances.creditLine.accruedInterest) || 0;
        const interestPayment = Math.min(remainingCredit, accruedInterest);
        state.finances.creditLine.accruedInterest = accruedInterest - interestPayment;
        remainingCredit -= interestPayment;

        const currentDayInterest = Number(state.finances.creditLine.currentDayInterest) || 0;
        const currentInterestPayment = Math.min(remainingCredit, currentDayInterest);
        state.finances.creditLine.currentDayInterest = currentDayInterest - currentInterestPayment;
        remainingCredit -= currentInterestPayment;

        const repayment = Math.min(remainingCredit, Number(state.finances.creditLine.used) || 0);
        state.finances.creditLine.used -= repayment;
        remainingCredit -= repayment;
        if (repayment > 0) {
          recordFinancialMovement({
            detail: activeFinancialMovementDetail
              ? `${activeFinancialMovementDetail} aplicado a Línea de Crédito`
              : 'Pago de Línea de Crédito',
            amount: repayment,
            direction: 'expense',
            accountId: state.finances.creditLine.id,
            accountName: 'Línea de Crédito'
          });
        }
      }
      if (remainingCredit > 0) {
        withFinancialMovementDetail(activeFinancialMovementDetail || 'Abono a cuenta bancaria', () => {
          account.balance = (Number(account.balance) || 0) + remainingCredit;
        });
      }
      return true;
    }

    function getWorkPerformance(job = state.work.currentJob, monthIndex = getSimulationMonthIndex()) {
      const healthPhysical = Math.max(0, Math.min(20, Number(state.wellbeing.healthPhysical) || 0));
      const healthEmotional = Math.max(0, Math.min(40, Number(state.wellbeing.healthEmotional) || 0));
      const healthMental = Math.max(0, Math.min(40, Number(state.wellbeing.healthMental) || 0));
      const rawScore = Math.round((healthMental * 0.5) + (healthEmotional * 0.3) + (healthPhysical * 0.2));
      const jobMonth = getCurrentJobMonthNumber(job, monthIndex);
      const maximumByTenure = jobMonth <= 3 ? 21 : jobMonth === 4 ? 25 : jobMonth === 5 ? 29 : 36;
      const score = Math.min(rawScore, maximumByTenure);
      const isFreelance = Boolean(job && job.isFreelance);
      const level = score >= 34 ? 'Excepcional'
        : score >= 30 ? 'Destacable'
          : score >= 26 ? 'Bueno'
            : score >= 22 ? 'Satisfactorio'
              : score >= 18 ? 'Regular'
                : score >= 14 ? 'Deficiente'
                  : score >= 10 ? 'Paupérrimo'
                    : isFreelance ? 'Perjudicial para uno mismo' : 'Perjudicial para la empresa';
      return { score, rawScore, level, jobMonth, isCapped: score < rawScore };
    }

    function getFreelanceIncomeMultiplier(level) {
      return {
        Excepcional: 3,
        Destacable: 2.5,
        Bueno: 2,
        Satisfactorio: 1.5,
        Regular: 1,
        Deficiente: 0.7,
        Paupérrimo: 0.5,
        'Perjudicial para uno mismo': 0.3
      }[level] || 0.3;
    }

    function getCommercialCommissionMultiplier(level) {
      return {
        Excepcional: 1.5,
        Destacable: 1.1,
        Bueno: 0.6,
        Satisfactorio: 0.3,
        Regular: 0.2,
        Deficiente: 0.1,
        Paupérrimo: 0,
        'Perjudicial para uno mismo': 0
      }[level] || 0;
    }

    function getTotalWorkExperienceMonths() {
      return Math.max(0, Number(state.work.workExperienceMonths) || 0) + getCurrentJobTenureMonths();
    }

    function archiveCurrentJobExperience() {
      const job = state.work.currentJob;
      if (!job) return 0;
      const completedMonths = getCurrentJobTenureMonths(job);
      state.work.workExperienceMonths = (Number(state.work.workExperienceMonths) || 0) + completedMonths;
      return completedMonths;
    }

    function formatWorkExperience(months = getTotalWorkExperienceMonths()) {
      const totalMonths = Math.max(0, Math.floor(Number(months) || 0));
      const years = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;
      if (!years) return `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
      if (!remainingMonths) return `${years} ${years === 1 ? 'año' : 'años'}`;
      return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
    }

    function startSimulationClock() {
      if (simulationClockInterval) return;
      state.simulation.clockRunning = true;
      renderSimulationDate();
      if (document.visibilityState !== 'visible' || !document.hasFocus()) return;
      const speed = Number(state.config.simulationSpeedMsPerDay) || 2000;
      simulationClockInterval = window.setInterval(advanceSimulationDay, speed);
    }

    function setSimulationRunning(running) {
      state.simulation.clockRunning = Boolean(running);
      stopSimulationClock();
      if (state.simulation.clockRunning) startSimulationClock();
      renderSimulationDate();
      const settingsView = document.getElementById('view-settings');
      if (settingsView && !settingsView.classList.contains('hidden') && typeof renderSettingsScreen === 'function') {
        renderSettingsScreen();
      }
    }

    function setSimulationSpeed(millisecondsPerDay) {
      const speed = Number(millisecondsPerDay);
      if (![1000, 2000, 3000, 5000].includes(speed)) return false;
      state.config.simulationSpeedMsPerDay = speed;
      if (simulationClockInterval) {
        window.clearInterval(simulationClockInterval);
        simulationClockInterval = window.setInterval(advanceSimulationDay, speed);
      }
      const settingsView = document.getElementById('view-settings');
      if (settingsView && !settingsView.classList.contains('hidden') && typeof renderSettingsScreen === 'function') {
        renderSettingsScreen();
      }
      return true;
    }

    window.setSimulationSpeed = setSimulationSpeed;
    window.setSimulationRunning = setSimulationRunning;

    function stopSimulationClock() {
      if (simulationClockInterval) window.clearInterval(simulationClockInterval);
      simulationClockInterval = null;
    }

    function syncSimulationClockVisibility() {
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        if (state.simulation.clockRunning && !simulationClockInterval) startSimulationClock();
        return;
      }
      stopSimulationClock();
    }

    function handleSimulationVisibilityChange() {
      syncSimulationClockVisibility();
    }

    function resetSimulators() {
      if (!window.confirm('Se reiniciarán la fecha y todas las decisiones de la simulación. ¿Continuar?')) return;
      stopSimulationClock();
      window.location.reload();
    }

    // COMPROBACIÓN DE PERFIL COMPLETO (INTERESES PRIORIZADOS + ESTILO DE VIDA CON 2 OPCIONES C/U)
    function checkProfileCompletion() {
      const hasPrioritizedInterests = state.persona.categories && state.persona.categories.some(c => c.dots > 1);
      const hasHome = Boolean(state.persona.selectedHomes && state.persona.selectedHomes.length === 2);
      const hasJob = Boolean(state.persona.selectedJobs && state.persona.selectedJobs.length === 2);
      const hasTransport = Boolean(state.persona.selectedTransports && state.persona.selectedTransports.length === 2);
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
        el.classList.toggle('selected', Boolean(state.persona.selectedHomes && state.persona.selectedHomes.includes(idx)));
      });

      const jobOptionsEls = document.querySelectorAll('#anchor-job .anchor-option');
      jobOptionsEls.forEach((el, idx) => {
        el.classList.toggle('selected', Boolean(state.persona.selectedJobs && state.persona.selectedJobs.includes(idx)));
      });

      const transOptionsEls = document.querySelectorAll('#anchor-transport .anchor-option');
      transOptionsEls.forEach((el, idx) => {
        el.classList.toggle('selected', Boolean(state.persona.selectedTransports && state.persona.selectedTransports.includes(idx)));
      });

      const isComplete = (
        state.persona.selectedHomes && state.persona.selectedHomes.length === 2 &&
        state.persona.selectedJobs && state.persona.selectedJobs.length === 2 &&
        state.persona.selectedTransports && state.persona.selectedTransports.length === 2
      );
      const btn = document.getElementById('btn-confirm-anchors');
      if (btn) btn.disabled = !isComplete;
    }

    // INICIALIZACIÓN
    window.addEventListener('DOMContentLoaded', () => {
      renderSimulationDate();
      if (typeof initTopMenu === 'function') initTopMenu();
      renderBolitas();
      calculateTotalBolitas();
      syncDefaultAnchorsUI();
      updateHUD();
      updateInterestsValidation();
      if (typeof showWelcomeScreen === 'function') showWelcomeScreen();
      syncSimulationClockVisibility();
    });

    window.addEventListener('focus', syncSimulationClockVisibility);
    window.addEventListener('blur', syncSimulationClockVisibility);
    window.addEventListener('pageshow', syncSimulationClockVisibility);
    document.addEventListener('visibilitychange', handleSimulationVisibilityChange);
    window.addEventListener('pagehide', stopSimulationClock);


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
        if (Array.isArray(state.assets.vehicles) && state.assets.vehicles.length > 0) {
          state.assets.vehicles.forEach((v, idx) => {
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
        if (Array.isArray(state.assets.properties) && state.assets.properties.length > 0) {
          state.assets.properties.forEach((p, idx) => {
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
      if (insuranceId === 'incendio_sismo') {
        return (state.finances.debts || [])
          .filter(debt => debt.loanType === 'hipotecario')
          .map(debt => ({
            id: debt.id,
            name: debt.name,
            sub: 'Vivienda financiada con crédito hipotecario',
            price: 11000
          }));
      }
      if (insuranceId === 'fraude') {
        const list = [];
        (state.finances.bankAccounts || []).forEach(a => {
          const isAhorro = a.type === 'ahorro' || (a.id || '').includes('ahorro') || (a.name || '').toLowerCase().includes('ahorro');
          if (!isAhorro) {
            list.push({ id: a.id, name: a.name, sub: 'Cuenta bancaria', price: 1150 });
          }
        });
        if (state.finances.creditCard) list.push({ id: 'tarjeta', name: 'Tarjeta de Crédito', sub: 'Línea de crédito rotativo', price: 1150 });
        return list;
      }
      if (insuranceId === 'desgravamen') {
        const list = [];
        if (state.finances.creditLine) list.push({ id: 'linea', name: 'Línea de Crédito ($500.000)', sub: 'Sobregiro en Cuenta Corriente', price: 1900 });
        (state.finances.debts || []).forEach(d => list.push({ id: d.id, name: d.name || 'Crédito', sub: `Saldo: $${(d.amount || 0).toLocaleString('es-CL')}`, price: 1900 }));
        return list;
      }
      if (insuranceId === 'cesantia') {
        const list = [];
        if (state.finances.creditLine) list.push({ id: 'linea', name: 'Línea de Crédito ($500.000)', sub: 'Sobregiro', price: 4500 });
        (state.finances.debts || []).forEach(d => list.push({ id: d.id, name: d.name || 'Crédito', sub: 'Compromiso de pago', price: 4500 }));
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
        if (titleElem) titleElem.innerText = 'Mi perfil';
        if (subtitleElem) subtitleElem.innerText = 'Vida personal, bienestar y finanzas';
        renderPersonalStage('main');
        return;
      }

      if (tabName === 'trabajo') {
        renderTrabajoStage('main');
        return;
      }

      if (tabName === 'banco' || tabName === 'inversiones' || tabName === 'corredora') {
        renderInversionesStage('main');
        return;
      }

      if (tabName === 'asesor') {
        renderAsesorStage('main');
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
      if (typeof closeTopMenu === 'function') closeTopMenu();
      state.interface.activeHudTab = tabName;
      document.querySelectorAll('.hud-dock-tab').forEach(t => t.classList.toggle('active', t.id === `tab-${tabName}`));

      const mainStage = document.getElementById('main-stage');
      if (mainStage) mainStage.classList.remove('is-welcome-view');

      // Ocultar vistas secundarias en la zona central
      document.querySelectorAll('.step-view').forEach(v => v.classList.add('hidden'));

      // Renderizar y mostrar las secciones del lugar en la zona central
      renderHubCentralStage(tabName);
      const hubView = document.getElementById('view-hub-stage');
      if (hubView) hubView.classList.remove('hidden');
    }

    // VOLVER A LA PANTALLA DE BIENVENIDA
    function returnToSlideView() {
      initNegChat();
      if (typeof showWelcomeScreen === 'function') showWelcomeScreen();
    }

    function updateHUD() {
      // Estado de la barra inferior sincronizado
    }
