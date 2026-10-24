/* ==========================================================================
   SIMULADOR FINANCIERO VIVENCIAL - MOTOR MATEMÁTICO & REGLAS (AVANZADO)
   ========================================================================== */

class FinancialEngine {
  constructor() {
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      characterName: "Participante",
      archetypeId: null,
      age: 26,
      year: 1,
      quarter: 1, // 1 to 4
      isQuarterActive: true,
      actionPoints: 3,

      // Balance Financiero
      salary: 1500000,
      cash: 500000,
      cardDebt: 0,
      investments: {
        dap: 0,
        cuenta2: 0,
        stocks: 0,
        crypto: 0,
        gold: 0,
        realEstateRent: 0
      },
      loans: [],

      // Medidores Duales (0-100%)
      mentalPeace: 75,
      qualityOfLife: 70,

      // Multiplicadores Psicológicos
      traits: { ans: 1.0, soc: 1.0, hed: 1.0, seg: 1.0 },

      // Entorno Estructural
      housing: "V2",
      vehicle: "A2",
      distance: "D2",
      neighborhood: "B2",
      jobType: "T1",

      // Mecánicas de Vida Real
      pacEnabled: false,
      hasFuel: true,
      hasBipCharged: true,
      trainingsCompleted: 0,
      latenessIncidents: 0,
      forgottenBillsCount: 0,
      hasHealthInsurance: false,

      // Historial para Radiografía y Gráficos a 8 Años
      history: {
        interestPaidToBanks: 0,
        interestEarnedFromInvestments: 0,
        peakNetWorth: 0,
        lowestMentalPeace: 100,
        timelineSnapshots: [], // Array de { year, quarter, netWorth, mentalPeace, qualityOfLife }
        majorLifeEvents: []
      }
    };
  }

  initCharacter(archetype, customName) {
    this.state.characterName = customName || archetype.name;
    this.state.archetypeId = archetype.id;
    this.state.age = archetype.age;
    this.state.salary = archetype.salary;
    this.state.cash = archetype.cash;
    this.state.cardDebt = archetype.debt;
    this.state.housing = archetype.housing;
    this.state.vehicle = archetype.vehicle;
    this.state.distance = archetype.distance;
    this.state.neighborhood = archetype.neighborhood;
    this.state.jobType = archetype.jobType;
    this.state.traits = { ...archetype.traits };

    // Snapshot inicial
    this.recordSnapshot();
  }

  recordSnapshot() {
    this.state.history.timelineSnapshots.push({
      year: this.state.year,
      quarter: this.state.quarter,
      netWorth: this.getNetWorth(),
      mentalPeace: this.state.mentalPeace,
      qualityOfLife: this.state.qualityOfLife
    });
  }

  // Costos Fijos Estructurales Mensuales
  getStructuralCosts() {
    const housingCosts = {
      V1: { rent: 320000, maintenance: 20000 },
      V2: { rent: 550000, maintenance: 80000 },
      V3: { rent: 900000, maintenance: 180000 },
      V4: { rent: 650000, maintenance: 35000 },
      V5: { rent: 1400000, maintenance: 250000 }
    };

    const vehicleCosts = {
      A0: { fuel: 0, insurance: 0, bip: 45000 },
      A1: { fuel: 35000, insurance: 20000, bip: 0 },
      A2: { fuel: 75000, insurance: 28000, bip: 0 },
      A3: { fuel: 140000, insurance: 55000, bip: 0 },
      A4: { fuel: 230000, insurance: 110000, bip: 0 }
    };

    const distanceCosts = {
      D1: 0,
      D2: 25000,
      D3: 110000
    };

    const neighborhoodFoodCost = {
      B1: 180000,
      B2: 240000,
      B3: 320000
    };

    const h = housingCosts[this.state.housing] || housingCosts.V2;
    const v = vehicleCosts[this.state.vehicle] || vehicleCosts.A2;
    const d = distanceCosts[this.state.distance] || 0;
    const f = neighborhoodFoodCost[this.state.neighborhood] || 240000;

    return {
      housing: h.rent + h.maintenance,
      transport: v.fuel + v.insurance + v.bip + d,
      foodBase: f,
      basicBills: 95000
    };
  }

  getMonthlyLoanQuotas() {
    return this.state.loans.reduce((acc, loan) => acc + loan.monthlyQuota, 0);
  }

  calculateMonthlyCashflow(leisureSlider = 250000) {
    const fixed = this.getStructuralCosts();
    const loanQuotas = this.getMonthlyLoanQuotas();
    const passiveIncome = this.state.investments.realEstateRent;

    const totalIncome = this.state.salary + passiveIncome;
    const totalFixed = fixed.housing + fixed.transport + fixed.foodBase + fixed.basicBills + loanQuotas;
    const totalVariable = leisureSlider;
    const totalExpenses = totalFixed + totalVariable;
    const netMargin = totalIncome - totalExpenses;

    return {
      totalIncome,
      fixed,
      totalFixed,
      totalVariable,
      loanQuotas,
      totalExpenses,
      netMargin
    };
  }

  advanceQuarter(leisureBudget = 250000) {
    const cashflow = this.calculateMonthlyCashflow(leisureBudget);

    // 1. Verificación de Combustible
    if (this.state.vehicle !== "A0") {
      if (!this.state.hasFuel) {
        // Alerta de auto sin combustible
        this.state.latenessIncidents += 1;
        this.modifyMentalPeace(-15 * this.state.traits.ans);
        this.state.cash -= 18000; // Uber de emergencia
        this.state.history.majorLifeEvents.push(`Año ${this.state.year} Q${this.state.quarter}: Auto sin bencina en plena calle; tuviste que pagar Uber de urgencia.`);
      }
      // Consume combustible del trimestre
      this.state.hasFuel = false;
    }

    // 2. Verificación de PAC / Olvidos de Cuentas
    if (!this.state.pacEnabled && Math.random() < 0.28) {
      const lateFee = 65000;
      this.state.cash -= lateFee;
      this.state.forgottenBillsCount++;
      this.modifyMentalPeace(-15 * this.state.traits.ans);
      this.state.history.majorLifeEvents.push(`Año ${this.state.year}: Olvido en pago de cuentas; corte de servicio y multa de $${lateFee.toLocaleString()} CLP.`);
    }

    // 3. Impacto estacional especial
    // Año 2, Q1: Marzo Negro (Patente y permiso de circulación)
    if (this.state.year === 2 && this.state.quarter === 1 && this.state.vehicle !== "A0") {
      const patenteCosts = { A1: 30000, A2: 50000, A3: 150000, A4: 450000 };
      const costMarzo = patenteCosts[this.state.vehicle] || 50000;
      this.state.cash -= costMarzo;
      this.state.history.majorLifeEvents.push(`Año 2 (Marzo Negro): Pago de patente y permiso de circulación por $${costMarzo.toLocaleString()} CLP.`);
    }

    // 4. Ciclo de 3 Meses
    for (let m = 1; m <= 3; m++) {
      if (cashflow.netMargin >= 0) {
        this.state.cash += cashflow.netMargin;
      } else {
        const deficit = Math.abs(cashflow.netMargin);
        if (this.state.cash >= deficit) {
          this.state.cash -= deficit;
        } else {
          const remainingDeficit = deficit - this.state.cash;
          this.state.cash = 0;
          this.state.cardDebt += remainingDeficit;
          this.modifyMentalPeace(-6 * this.state.traits.ans);
        }
      }

      // Intereses de Tarjeta Rotativa (2.9% mensual)
      if (this.state.cardDebt > 0) {
        const monthlyInterest = this.state.cardDebt * 0.029;
        this.state.cardDebt += monthlyInterest;
        this.state.history.interestPaidToBanks += monthlyInterest;
      }

      // Rendimientos de Inversión
      if (this.state.investments.dap > 0) {
        const dapGain = this.state.investments.dap * (0.048 / 12);
        this.state.investments.dap += dapGain;
        this.state.history.interestEarnedFromInvestments += dapGain;
      }
      if (this.state.investments.cuenta2 > 0) {
        const c2Gain = this.state.investments.cuenta2 * (0.08 / 12);
        this.state.investments.cuenta2 += c2Gain;
        this.state.history.interestEarnedFromInvestments += c2Gain;
      }
      if (this.state.investments.stocks > 0) {
        const stockGain = this.state.investments.stocks * (0.12 / 12);
        this.state.investments.stocks += stockGain;
        this.state.history.interestEarnedFromInvestments += stockGain;
      }

      // Amortización de créditos
      this.state.loans = this.state.loans.map(loan => {
        loan.remainingMonths -= 1;
        return loan;
      }).filter(loan => loan.remainingMonths > 0);
    }

    // 5. Ajuste de Bienestar Emocional
    const monthlyFixed = cashflow.totalFixed;
    const monthsOfRunway = this.state.cash / (monthlyFixed || 1);
    if (monthsOfRunway >= 3) {
      this.modifyMentalPeace(6 * this.state.traits.seg);
    } else if (monthsOfRunway < 0.5) {
      this.modifyMentalPeace(-10 * this.state.traits.ans);
    }

    if (leisureBudget >= 300000) {
      this.modifyQualityOfLife(8 * this.state.traits.hed);
    } else if (leisureBudget <= 80000) {
      this.modifyQualityOfLife(-12 * this.state.traits.hed);
    }

    // Net Worth histórico
    const currentNetWorth = this.getNetWorth();
    if (currentNetWorth > this.state.history.peakNetWorth) {
      this.state.history.peakNetWorth = currentNetWorth;
    }
    if (this.state.mentalPeace < this.state.history.lowestMentalPeace) {
      this.state.history.lowestMentalPeace = this.state.mentalPeace;
    }

    // Avanzar reloj
    this.state.quarter += 1;
    if (this.state.quarter > 4) {
      this.state.quarter = 1;
      this.state.year += 1;
      this.state.age += 1;
    }

    this.state.actionPoints = 3;
    this.recordSnapshot();

    return {
      success: true,
      year: this.state.year,
      quarter: this.state.quarter,
      cashflow
    };
  }

  // Evaluación del Jefe (Mecánica clave)
  evaluateSalaryRaise() {
    let trainingScore = 0;
    if (this.state.trainingsCompleted === 1) trainingScore = 20;
    if (this.state.trainingsCompleted >= 2) trainingScore = 40;

    let punctualityScore = 30;
    if (this.state.distance === "D2") punctualityScore = 20;
    if (this.state.distance === "D3") punctualityScore = 5;
    punctualityScore -= (this.state.latenessIncidents * 6);
    punctualityScore = Math.max(0, punctualityScore);

    let moodScore = 0;
    if (this.state.mentalPeace >= 70) moodScore = 30;
    else if (this.state.mentalPeace >= 45) moodScore = 15;
    else moodScore = 0;

    const totalScore = trainingScore + punctualityScore + moodScore;

    let result = {
      score: totalScore,
      details: { trainingScore, punctualityScore, moodScore },
      verdict: "",
      raisePercent: 0,
      dialogue: ""
    };

    if (totalScore >= 80) {
      result.verdict = "Promoción y Gran Aumento";
      result.raisePercent = 30;
      result.dialogue = "¡Excelente desempeño! Se valora tu constante capacitación técnica, tu impecable puntualidad y tu energía constructiva para el equipo. Aprobamos un aumento del 30% y un nuevo cargo.";
      this.state.salary = Math.round(this.state.salary * 1.30);
      this.modifyQualityOfLife(25);
      this.modifyMentalPeace(20);
      this.state.history.majorLifeEvents.push(`Año ${this.state.year}: Gran ascenso laboral (+30% sueldo) por mérito y capacitaciones.`);
    } else if (totalScore >= 55) {
      result.verdict = "Aumento Moderado por Mérito";
      result.raisePercent = 12;
      result.dialogue = "Buen trabajo este año. Cumples bien tus metas y mantienes buen compromiso. La empresa aprueba un reajuste del 12%.";
      this.state.salary = Math.round(this.state.salary * 1.12);
      this.modifyMentalPeace(10);
      this.state.history.majorLifeEvents.push(`Año ${this.state.year}: Aumento salarial del 12% por buen desempeño.`);
    } else if (totalScore >= 35) {
      result.verdict = "Aumento Congelado";
      result.raisePercent = 0;
      result.dialogue = "Por ahora no es viable. Necesitamos que mejores tu puntualidad matutina y te sugerimos capacitarte en nuevas herramientas técnicas para justificar un salto.";
      this.modifyMentalPeace(-12 * this.state.traits.ans);
    } else {
      result.verdict = "Rechazo Crítico y Advertencia";
      result.raisePercent = 0;
      result.dialogue = "Tus retrasos constantes y tu actitud desanimada o irritable están afectando negativamente el clima del equipo. Debemos evaluar tu continuidad.";
      this.modifyMentalPeace(-25 * this.state.traits.ans);
    }

    return result;
  }

  modifyMentalPeace(delta) {
    this.state.mentalPeace = Math.max(0, Math.min(100, Math.round(this.state.mentalPeace + delta)));
  }

  modifyQualityOfLife(delta) {
    this.state.qualityOfLife = Math.max(0, Math.min(100, Math.round(this.state.qualityOfLife + delta)));
  }

  getNetWorth() {
    const totalInvestments = 
      this.state.investments.dap + 
      this.state.investments.cuenta2 + 
      this.state.investments.stocks + 
      this.state.investments.crypto +
      this.state.investments.gold;

    const totalDebts = this.state.cardDebt + this.state.loans.reduce((acc, l) => acc + (l.monthlyQuota * l.remainingMonths), 0);

    return (this.state.cash + totalInvestments) - totalDebts;
  }
}
