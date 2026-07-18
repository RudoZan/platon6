// evaluacion.js - Lógica del motor de evaluación adaptativa

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener la prueba seleccionada
  const testId = sessionStorage.getItem("selectedTestId");
  if (!testId || typeof TESTS_DATABASE === "undefined") {
    window.location.href = "index.html";
    return;
  }

  const currentTest = TESTS_DATABASE.find(t => t.id === testId);
  if (!currentTest) {
    window.location.href = "index.html";
    return;
  }

  // Actualizar el título de la cabecera con el nombre de la prueba
  const testTitleHeader = document.getElementById("test-title-header");
  if (testTitleHeader) {
    testTitleHeader.textContent = currentTest.title;
  }

  // 2. Estado de la sesión de evaluación
  let currentDifficultyLevel = 2; // Inicia en Nivel 2
  let currentQuestionIndex = 0; // 0 a 4 (test base), 5 (reto extra)
  let sessionQuestions = [];
  let currentQuestion = null;
  let hintsUsed = 0;
  let hintTimer = null;
  let userAnswers = []; // Bitácora de respuestas
  let tempSessionAnswer = null; // Respuesta temporal antes de confirmar confianza
  let q6Selected = false;

  // Elementos del DOM
  const screenTest = document.getElementById("screen-test");
  const screenConfidence = document.getElementById("screen-confidence");
  const screenExplanation = document.getElementById("screen-explanation");
  const modalQ6Offer = document.getElementById("modal-q6-offer");

  const progressFill = document.getElementById("progress-fill");
  const currentQuestionNum = document.getElementById("current-question-num");
  const currentQuestionCode = document.getElementById("current-question-code");
  const questionText = document.getElementById("question-text");
  const btnSubmitAnswer = document.getElementById("btn-submit-answer");
  const btnUseHint = document.getElementById("btn-use-hint");
  const hintsContainer = document.getElementById("hints-container");
  const btnGiveUp = document.getElementById("btn-give-up");

  const feedbackCardType = document.getElementById("feedback-card-type");
  const feedbackStatusTitle = document.getElementById("feedback-status-title");
  const feedbackUserAns = document.getElementById("feedback-user-ans");
  const feedbackCorrectAns = document.getElementById("feedback-correct-ans");
  const feedbackConfidenceLabel = document.getElementById("feedback-confidence-label");
  const explanationQuestionNum = document.getElementById("explanation-question-num");
  const explanationText = document.getElementById("explanation-text");
  const btnNextQuestion = document.getElementById("btn-next-question");

  const btnAcceptQ6Easier = document.getElementById("btn-accept-q6-easier");
  const btnAcceptQ6Similar = document.getElementById("btn-accept-q6-similar");
  const btnAcceptQ6Harder = document.getElementById("btn-accept-q6-harder");
  const btnDeclineQ6 = document.getElementById("btn-decline-q6");

  // Cambiar pantalla localmente
  function showScreen(targetScreen) {
    [screenTest, screenExplanation, modalQ6Offer].forEach(s => {
      if (s) s.classList.remove("active");
    });
    if (targetScreen) targetScreen.classList.add("active");

    // Forzar renderizado de KaTeX
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
  }

  // Obtener pregunta aleatoria
  function getRandomQuestionOfLevel(level, excludeList) {
    const candidates = currentTest.questionBank.filter(q => q.level === level && !excludeList.includes(q.id));
    if (candidates.length === 0) {
      const allCandidates = currentTest.questionBank.filter(q => !excludeList.includes(q.id));
      return allCandidates[Math.floor(Math.random() * allCandidates.length)];
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Determinar si una pregunta es dicotómica (Sí/No)
  function isQuestionDichotomous(question) {
    if (!question) return false;
    const text = question.text.toLowerCase();
    if (text.includes("(sí/no)") || text.includes("sí o no") || text.includes("escribe **sí**") || text.includes("escribe sí")) {
      return true;
    }
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      const firstAns = question.correctAnswers[0].toLowerCase().trim();
      if (firstAns === "sí" || firstAns === "si" || firstAns === "no") {
        return true;
      }
    }
    return false;
  }

  // Inicializar UI para una nueva pregunta
  function setupQuestionUI() {
    hintsUsed = 0;
    
    // Configuración del botón de pistas
    btnUseHint.disabled = false;
    btnUseHint.style.display = "none";
    btnUseHint.innerHTML = "💡 Solicitar Pista (<span id=\"hints-left\">2</span>)";
    const hintsLeft = document.getElementById("hints-left");
    if (hintsLeft) hintsLeft.textContent = "2";

    if (hintTimer) {
      clearTimeout(hintTimer);
    }
    // Aparece tras 15 segundos
    hintTimer = setTimeout(() => {
      btnUseHint.style.display = "inline-flex";
    }, 15000);

    btnGiveUp.style.display = "none";
    hintsContainer.innerHTML = "";

    // Actualizar badges
    if (currentQuestionIndex === 5) {
      currentQuestionNum.textContent = "Pregunta 6 (Reto Extra)";
    } else {
      currentQuestionNum.textContent = `Pregunta ${currentQuestionIndex + 1} de 5`;
    }
    if (currentQuestionCode) {
      currentQuestionCode.textContent = currentQuestion.id;
    }

    // Barra de progreso
    const progressPct = (currentQuestionIndex / 5) * 100;
    progressFill.style.width = `${Math.min(100, progressPct)}%`;

    // Texto de la pregunta
    questionText.innerHTML = currentQuestion.text;

    // Renderizar inputs
    const container = document.getElementById("dynamic-inputs-container");
    container.innerHTML = "";

    let optionsToRender = null;
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      optionsToRender = currentQuestion.options;
    } else if (isQuestionDichotomous(currentQuestion)) {
      optionsToRender = ["Sí", "No"];
    }

    if (optionsToRender) {
      const choicesWrapper = document.createElement("div");
      choicesWrapper.style.display = "flex";
      choicesWrapper.style.gap = "15px";
      choicesWrapper.style.width = "100%";
      choicesWrapper.style.maxWidth = "400px";
      choicesWrapper.style.margin = "0 auto";
      choicesWrapper.style.justifyContent = "center";

      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.id = "student-answer";
      hiddenInput.value = "";
      container.appendChild(hiddenInput);

      optionsToRender.forEach(option => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-dichotomous-choice";
        btn.textContent = option;
        btn.style.flex = "1";
        btn.style.padding = "12px 20px";
        btn.style.border = "2px solid var(--color-borde)";
        btn.style.borderRadius = "8px";
        btn.style.background = "var(--color-tarjeta)";
        btn.style.color = "var(--color-texto)";
        btn.style.fontWeight = "bold";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "1rem";
        btn.style.transition = "all 0.2s";

        btn.onmouseover = () => {
          if (hiddenInput.value !== option.toLowerCase()) {
            btn.style.borderColor = "var(--color-primario-claro)";
            btn.style.background = "#f5fafe";
          }
        };

        btn.onmouseout = () => {
          if (hiddenInput.value !== option.toLowerCase()) {
            btn.style.borderColor = "var(--color-borde)";
            btn.style.background = "var(--color-tarjeta)";
          }
        };

        btn.onclick = () => {
          choicesWrapper.querySelectorAll(".btn-dichotomous-choice").forEach(b => {
            b.style.borderColor = "var(--color-borde)";
            b.style.background = "var(--color-tarjeta)";
            b.style.color = "var(--color-texto)";
          });
          btn.style.borderColor = "var(--color-acento)";
          btn.style.background = "var(--color-primario-claro)";
          btn.style.color = "white";
          hiddenInput.value = option.toLowerCase();
        };

        choicesWrapper.appendChild(btn);
      });
      container.appendChild(choicesWrapper);
    } else if (currentQuestion.inputLabels && currentQuestion.inputLabels.length > 0) {
      currentQuestion.inputLabels.forEach((label, idx) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "8px";

        const span = document.createElement("span");
        span.textContent = `${label} =`;
        span.style.fontWeight = "bold";
        span.style.color = "var(--color-texto)";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "student-multi-input";
        input.style.width = "75px";
        input.style.padding = "8px 12px";
        input.style.border = "1.5px solid var(--color-borde)";
        input.style.borderRadius = "6px";
        input.style.textAlign = "center";
        input.style.background = "var(--color-tarjeta)";
        input.style.color = "var(--color-texto)";
        input.autocomplete = "off";
        input.placeholder = "?";

        if (idx === 0) {
          setTimeout(() => input.focus(), 50);
        }

        input.onkeydown = (e) => {
          if (e.key === "Enter") {
            btnSubmitAnswer.click();
          }
        };

        wrapper.appendChild(span);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
      });
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.id = "student-answer";
      input.style.flex = "1";
      input.style.padding = "10px 15px";
      input.style.border = "1.5px solid var(--color-borde)";
      input.style.borderRadius = "6px";
      input.style.color = "var(--color-texto)";
      input.style.background = "var(--color-tarjeta)";
      input.autocomplete = "off";
      input.placeholder = "Ingresa la solución aquí...";

      setTimeout(() => input.focus(), 50);

      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          btnSubmitAnswer.click();
        }
      };

      container.appendChild(input);
    }
  }

  // Uso de pistas
  btnUseHint.onclick = () => {
    if (hintsUsed >= 2) return;

    const hintText = currentQuestion.hints[hintsUsed];
    const hintBubble = document.createElement("div");
    hintBubble.className = "hint-bubble";
    hintBubble.innerHTML = `<strong>Pista ${hintsUsed + 1}:</strong> ${hintText}`;
    hintsContainer.appendChild(hintBubble);

    hintsUsed++;
    const hintsLeft = document.getElementById("hints-left");
    if (hintsLeft) hintsLeft.textContent = (2 - hintsUsed).toString();

    btnUseHint.style.display = "none";

    if (hintsUsed >= 2) {
      btnUseHint.disabled = true;
      btnGiveUp.style.display = "inline-block"; // Mostrar botón rendirse
    } else {
      if (hintTimer) clearTimeout(hintTimer);
      hintTimer = setTimeout(() => {
        btnUseHint.style.display = "inline-flex";
      }, 15000);
    }

    if (typeof renderMathInElement === "function") {
      renderMathInElement(hintsContainer);
    }
  };

  // Rendirse
  btnGiveUp.onclick = () => {
    registerAnswer(null, "abandoned");
  };

  // Enviar respuesta
  btnSubmitAnswer.onclick = () => {
    let ans = "";
    if (currentQuestion.inputLabels && currentQuestion.inputLabels.length > 0) {
      const inputs = document.querySelectorAll(".student-multi-input");
      const vals = Array.from(inputs).map(inp => inp.value.trim());
      if (vals.some(v => v === "")) return;
      ans = vals.join(", ");
    } else {
      const input = document.getElementById("student-answer");
      if (!input) return;
      ans = input.value.trim();
    }
    if (!ans) return;

    // evaluateAnswerLocally proviene de utils.js
    const isCorrect = evaluateAnswerLocally(ans, currentQuestion.correctAnswers);

    let displayAns = ans;
    if (currentQuestion.inputLabels && currentQuestion.inputLabels.length > 0) {
      const vals = ans.split(", ");
      displayAns = currentQuestion.inputLabels.map((lbl, idx) => `${lbl}=${vals[idx]}`).join(", ");
    }

    registerAnswer(displayAns, isCorrect ? "correct" : "incorrect");
  };

  // Registrar respuesta
  function registerAnswer(rawAns, status) {
    if (hintTimer) {
      clearTimeout(hintTimer);
      hintTimer = null;
    }

    tempSessionAnswer = {
      question: currentQuestion,
      userRawAnswer: rawAns || "(Se rindió)",
      status: status,
      hintsUsedCount: hintsUsed,
      level: currentQuestion.level
    };

    if (status === "abandoned") {
      tempSessionAnswer.confidence = 0;
      userAnswers.push(tempSessionAnswer);
      showExplanationScreen();
    } else {
      const confidenceQuestionNum = document.getElementById("confidence-question-num");
      if (confidenceQuestionNum) {
        if (currentQuestionIndex === 5) {
          confidenceQuestionNum.textContent = "Pregunta 6 (Reto Extra)";
        } else {
          confidenceQuestionNum.textContent = `Pregunta ${currentQuestionIndex + 1} de 5`;
        }
      }
      if (screenConfidence) screenConfidence.classList.remove("hidden");
    }
  }

  // Selección de confianza
  document.querySelectorAll(".btn-conf").forEach(btn => {
    btn.onclick = () => {
      const confidenceVal = parseInt(btn.getAttribute("data-conf"));
      tempSessionAnswer.confidence = confidenceVal;

      if (screenConfidence) screenConfidence.classList.add("hidden");

      userAnswers.push(tempSessionAnswer);
      showExplanationScreen();
    };
  });

  function getConfidenceText(val, status) {
    if (status === "abandoned") return "Nula (Se rindió) 🏳️";
    switch (val) {
      case 0: return "Nada seguro 🎲";
      case 1: return "Poco seguro 🎯";
      case 2: return "Bastante seguro 💪";
      case 3: return "Muy seguro 🔥";
      default: return "No especificado";
    }
  }

  // Mostrar la explicación paso a paso
  function showExplanationScreen() {
    const ansData = userAnswers[userAnswers.length - 1];

    feedbackCardType.className = "card feedback-card";
    feedbackCardType.classList.add(ansData.status);

    if (ansData.status === "correct") {
      feedbackStatusTitle.textContent = "¡Respuesta Correcta! 🎉";
    } else if (ansData.status === "incorrect") {
      feedbackStatusTitle.textContent = "Respuesta Incorrecta ❌";
    } else {
      feedbackStatusTitle.textContent = "Te rendiste 🏳️";
    }

    feedbackUserAns.textContent = ansData.userRawAnswer;
    feedbackCorrectAns.textContent = currentQuestion.correctAnswers[0];
    
    if (feedbackConfidenceLabel) {
      feedbackConfidenceLabel.textContent = getConfidenceText(ansData.confidence, ansData.status);
    }
    if (explanationQuestionNum) {
      if (currentQuestionIndex === 5) {
        explanationQuestionNum.textContent = "Pregunta 6 (Reto Extra)";
      } else {
        explanationQuestionNum.textContent = `Pregunta ${currentQuestionIndex + 1} de 5`;
      }
    }
    explanationText.innerHTML = currentQuestion.explanation;

    if (currentQuestionIndex === 5) {
      btnNextQuestion.textContent = "Ver Reporte de Resultados Finales";
    } else {
      btnNextQuestion.textContent = "Siguiente Pregunta →";
    }

    showScreen(screenExplanation);
  }

  // Lógica para avanzar de pregunta
  btnNextQuestion.onclick = () => {
    if (currentQuestionIndex === 4) {
      // Fin del test base, ofrecer reto extra
      if (modalQ6Offer) {
        modalQ6Offer.classList.remove("hidden");
        showScreen(modalQ6Offer);
      }
      return;
    }
    if (currentQuestionIndex === 5) {
      // Fin oficial del test con reto
      finishSessionAndRedirect();
      return;
    }

    currentQuestionIndex++;

    // Algoritmo de adaptabilidad
    if (currentQuestionIndex === 1) {
      const excludeIds = userAnswers.map(ua => ua.question.id);
      const q2 = getRandomQuestionOfLevel(2, excludeIds);
      sessionQuestions.push(q2);
      currentQuestion = q2;
    } 
    else if (currentQuestionIndex === 2) {
      const correctCount = userAnswers.slice(0, 2).filter(ua => ua.status === "correct").length;
      if (correctCount === 0) {
        currentDifficultyLevel = Math.max(1, currentDifficultyLevel - 1);
      } else if (correctCount === 2) {
        currentDifficultyLevel = Math.min(4, currentDifficultyLevel + 1);
      }

      const excludeIds = userAnswers.map(ua => ua.question.id);
      const q3 = getRandomQuestionOfLevel(currentDifficultyLevel, excludeIds);
      sessionQuestions.push(q3);
      currentQuestion = q3;
    } 
    else if (currentQuestionIndex === 3) {
      const excludeIds = userAnswers.map(ua => ua.question.id);
      const q4 = getRandomQuestionOfLevel(currentDifficultyLevel, excludeIds);
      sessionQuestions.push(q4);
      currentQuestion = q4;
    } 
    else if (currentQuestionIndex === 4) {
      const correctCount = userAnswers.slice(2, 4).filter(ua => ua.status === "correct").length;
      if (correctCount === 0) {
        currentDifficultyLevel = Math.max(1, currentDifficultyLevel - 1);
      } else if (correctCount === 2) {
        currentDifficultyLevel = Math.min(4, currentDifficultyLevel + 1);
      }

      const excludeIds = userAnswers.map(ua => ua.question.id);
      const q5 = getRandomQuestionOfLevel(currentDifficultyLevel, excludeIds);
      sessionQuestions.push(q5);
      currentQuestion = q5;
    }

    setupQuestionUI();
    showScreen(screenTest);
  };

  // Reto Extra: Aceptar
  function acceptQ6Challenge(choice) {
    if (modalQ6Offer) modalQ6Offer.classList.add("hidden");

    const lastAnswer = userAnswers[4];
    const lastLevel = lastAnswer ? lastAnswer.level : 2;

    let targetLevel = lastLevel;
    if (choice === "harder") {
      targetLevel = Math.min(4, lastLevel + 1);
    } else if (choice === "easier") {
      targetLevel = Math.max(1, lastLevel - 1);
    }

    q6Selected = true;
    currentQuestionIndex = 5;

    const excludeIds = sessionQuestions.map(q => q.id);
    const q6 = getRandomQuestionOfLevel(targetLevel, excludeIds);
    sessionQuestions.push(q6);
    currentQuestion = q6;

    setupQuestionUI();
    showScreen(screenTest);
  }

  btnAcceptQ6Harder.onclick = () => acceptQ6Challenge("harder");
  btnAcceptQ6Similar.onclick = () => acceptQ6Challenge("similar");
  btnAcceptQ6Easier.onclick = () => acceptQ6Challenge("easier");

  // Reto Extra: Rechazar
  btnDeclineQ6.onclick = () => {
    if (modalQ6Offer) modalQ6Offer.classList.add("hidden");
    finishSessionAndRedirect();
  };

  // Terminar sesión y guardar en sessionStorage
  function finishSessionAndRedirect() {
    sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "resultados.html";
  }

  // 3. Inicializar el primer paso
  const q1 = getRandomQuestionOfLevel(2, []);
  sessionQuestions.push(q1);
  currentQuestion = q1;
  setupQuestionUI();
  showScreen(screenTest);
});
