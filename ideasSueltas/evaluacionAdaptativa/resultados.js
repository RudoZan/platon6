// resultados.js - Lógica para mostrar y calcular los resultados de la sesión

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener bitácora de respuestas desde sessionStorage
  const userAnswersRaw = sessionStorage.getItem("userAnswers");
  if (!userAnswersRaw) {
    window.location.href = "index.html";
    return;
  }

  const userAnswers = JSON.parse(userAnswersRaw);
  if (userAnswers.length === 0) {
    window.location.href = "index.html";
    return;
  }

  // 2. Elementos del DOM
  const resultsScore = document.getElementById("results-score");
  const resultsVerdict = document.getElementById("results-verdict");
  const resultsHintsCount = document.getElementById("results-hints-count");
  const resultsAvgLevel = document.getElementById("results-avg-level");
  const resultsRecommendations = document.getElementById("results-recommendations");
  const btnRestartTest = document.getElementById("btn-restart-test");

  const listCalibradoOk = document.getElementById("list-meta-calibrado-ok");
  const listExceso = document.getElementById("list-meta-exceso");
  const listInseguro = document.getElementById("list-meta-inseguro");
  const listCalibradoBad = document.getElementById("list-meta-calibrado-bad");

  // 3. Procesar resultados basados en el criterio de puntuación de 100 puntos
  const totalQuestions = userAnswers.length;
  const correctAnswers = userAnswers.filter(ua => ua.status === "correct").length;
  
  // A. Dominio Cognitivo (Q1 a Q5) - hasta 70 puntos
  const mainQuestions = userAnswers.slice(0, 5);
  let cognitiveRawSum = 0;
  mainQuestions.forEach(ua => {
    if (ua.status === "correct") {
      let diffValue = 10;
      if (ua.level === 2) diffValue = 12;
      else if (ua.level === 3) diffValue = 14;
      else if (ua.level === 4) diffValue = 16;
      
      let hintsFactor = 1.0;
      if (ua.hintsUsedCount === 1) hintsFactor = 0.75;
      else if (ua.hintsUsedCount === 2) hintsFactor = 0.50;
      
      cognitiveRawSum += diffValue * hintsFactor;
    }
  });
  const cognitiveScore = Math.min(70, cognitiveRawSum);

  // B. Calibración Metacognitiva (Q1 a Q5) - hasta 15 puntos
  let metaScore = 0;
  mainQuestions.forEach(ua => {
    const isCorrect = ua.status === "correct";
    const isConfident = ua.confidence >= 2;
    if (isCorrect && isConfident) {
      metaScore += 3.0; // Cuadrante I
    } else if (isCorrect && !isConfident) {
      metaScore += 2.0; // Cuadrante II
    } else if (!isCorrect && !isConfident) {
      metaScore += 1.5; // Cuadrante III
    } else {
      metaScore += 0.0; // Cuadrante IV
    }
  });

  // C. Desafío Reto (Q6 opcional) - hasta 15 puntos
  let challengeScore = 0;
  if (userAnswers.length === 6) {
    const q6 = userAnswers[5];
    const q5 = userAnswers[4];
    
    let challengeType = "similar";
    if (q6.level > q5.level) challengeType = "harder";
    else if (q6.level < q5.level) challengeType = "easier";
    
    const isCorrect = q6.status === "correct";
    if (isCorrect) {
      if (challengeType === "easier") challengeScore = 8.0;
      else if (challengeType === "similar") challengeScore = 11.0;
      else if (challengeType === "harder") challengeScore = 15.0;
    } else {
      if (challengeType === "easier") challengeScore = 2.0;
      else if (challengeType === "similar") challengeScore = 3.0;
      else if (challengeType === "harder") challengeScore = 4.0;
    }
  }

  // Puntuación Final
  const finalScore = cognitiveScore + metaScore + challengeScore;
  resultsScore.textContent = finalScore.toFixed(1);

  // Poblar Desglose en el DOM
  document.getElementById("breakdown-cognitive").textContent = `${cognitiveScore.toFixed(1)} / 70`;
  document.getElementById("breakdown-meta").textContent = `${metaScore.toFixed(1)} / 15`;
  document.getElementById("breakdown-challenge").textContent = `${challengeScore.toFixed(1)} / 15`;

  // Aciertos directos
  document.getElementById("results-correct-count").textContent = `${correctAnswers}/${totalQuestions}`;
  
  // Veredicto cualitativo basado en escala de 100 puntos
  let verdict = "";
  if (finalScore >= 90) {
    verdict = "¡Sobresaliente! Demostraste un dominio algebraico sólido y alta calibración metacognitiva.";
  } else if (finalScore >= 75) {
    verdict = "¡Excelente rendimiento! Has resuelto la gran mayoría de los desafíos con alta autonomía.";
  } else if (finalScore >= 55) {
    verdict = "Buen trabajo. Mantienes un nivel regular, pero tienes claros puntos conceptuales y metacognitivos que mejorar.";
  } else {
    verdict = "Rendimiento bajo. Te recomendamos repasar los fundamentos matemáticos de este tema con mayor atención.";
  }
  resultsVerdict.textContent = verdict;
  
  // Pistas usadas totales
  const totalHints = userAnswers.reduce((sum, ua) => sum + ua.hintsUsedCount, 0);
  resultsHintsCount.textContent = totalHints.toString();
  
  // Dificultad promedio
  const avgLevel = userAnswers.reduce((sum, ua) => sum + ua.level, 0) / totalQuestions;
  resultsAvgLevel.textContent = `Nivel ${avgLevel.toFixed(1)}`;

  // 4. Poblar cuadrantes de metacognición
  [listCalibradoOk, listExceso, listInseguro, listCalibradoBad].forEach(ul => ul.innerHTML = "");

  userAnswers.forEach((ua, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `Pregunta ${idx + 1}: <strong>${ua.question.id}</strong> (Nivel ${ua.level})`;
    
    const isCorrect = ua.status === "correct";
    const isConfident = ua.confidence >= 2; // bastante o muy seguro

    if (isCorrect && isConfident) {
      listCalibradoOk.appendChild(li);
    } else if (!isCorrect && isConfident) {
      listExceso.appendChild(li);
    } else if (isCorrect && !isConfident) {
      listInseguro.appendChild(li);
    } else {
      listCalibradoBad.appendChild(li);
    }
  });

  // Mostrar aviso de vacío en cuadrantes sin ítems
  [listCalibradoOk, listExceso, listInseguro, listCalibradoBad].forEach(ul => {
    if (ul.children.length === 0) {
      const li = document.createElement("li");
      li.style.fontStyle = "italic";
      li.style.color = "#7f8c8d";
      li.style.background = "none";
      li.style.border = "none";
      li.textContent = "Ninguna pregunta en este cuadrante";
      ul.appendChild(li);
    }
  });

  // 5. Recomendaciones de estudio dinámicas
  resultsRecommendations.innerHTML = "";
  const recs = [];
  if (correctAnswers === totalQuestions) {
    recs.push("¡No tienes errores que corregir! Te sugerimos probar con temas más avanzados en el menú de administración.");
  } else {
    // Falló niveles iniciales
    const fallasNivelBajo = userAnswers.some(ua => ua.level <= 2 && ua.status !== "correct");
    if (fallasNivelBajo) {
      recs.push("<strong>Refuerza los conceptos clave:</strong> Has fallado preguntas diagnósticas básicas. Te recomendamos repasar los teoremas iniciales y definiciones del tema.");
    }
    // Exceso de pistas
    if (totalHints > 4) {
      recs.push("<strong>Reduce la dependencia de pistas:</strong> Intenta resolver los primeros pasos de las ecuaciones por tu cuenta antes de pedir asistencia.");
    }
    // Exceso de confianza en errores
    const excesoCount = userAnswers.filter(ua => ua.status !== "correct" && ua.confidence >= 2).length;
    if (excesoCount > 0) {
      recs.push("<strong>Monitorea errores de cálculo:</strong> Tuviste errores en preguntas de las que estabas muy seguro. Pon especial atención a los signos negativos y multiplicaciones aritméticas.");
    }
    recs.push("<strong>Práctica guiada:</strong> Resuelve problemas similares paso a paso pidiéndole a tu asistente de IA que evalúe tu procedimiento línea por línea.");
  }
  
  recs.forEach(rec => {
    const li = document.createElement("li");
    li.innerHTML = rec;
    resultsRecommendations.appendChild(li);
  });

  // Forzar renderizado de KaTeX en los resultados
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError : false
    });
  }

  // 6. Configurar botón Volver
  btnRestartTest.onclick = () => {
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("selectedTestId");
    window.location.href = "index.html";
  };
});
