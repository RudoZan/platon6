// auditar.js - Lógica para la auditoría limpia y dedicada de los bancos de preguntas

document.addEventListener("DOMContentLoaded", () => {
  // 1. Validar Sesión de Profesor
  if (sessionStorage.getItem("adminAuthenticated") !== "true") {
    window.location.href = "admin.html";
    return;
  }

  // 2. Obtener testId desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const testId = urlParams.get("testId");

  if (!testId || typeof TESTS_DATABASE === "undefined") {
    window.location.href = "admin.html";
    return;
  }

  const test = TESTS_DATABASE.find(t => t.id === testId);
  if (!test) {
    window.location.href = "admin.html";
    return;
  }

  // 3. Elementos DOM
  const adminSelectedTitle = document.getElementById("admin-selected-title");
  const adminQuestionsBody = document.getElementById("admin-questions-body");
  const btnValidateBank = document.getElementById("btn-validate-bank");
  const validationReport = document.getElementById("validation-report");
  const btnAdminClose = document.getElementById("btn-admin-close");
  const selectAuditTest = document.getElementById("select-audit-test");

  if (btnAdminClose) {
    btnAdminClose.onclick = () => {
      sessionStorage.removeItem("adminAuthenticated");
      window.location.href = "index.html";
    };
  }

  // 4. Poblar y Configurar Selector de Bancos (Combobox)
  if (selectAuditTest) {
    selectAuditTest.innerHTML = "";
    TESTS_DATABASE.forEach(t => {
      const option = document.createElement("option");
      option.value = t.id;
      option.textContent = t.title;
      if (t.id === testId) {
        option.selected = true;
      }
      selectAuditTest.appendChild(option);
    });

    selectAuditTest.onchange = (e) => {
      const nextTestId = e.target.value;
      window.location.href = `auditar.html?testId=${nextTestId}`;
    };
  }

  // 5. Inicializar Título y Cargar Tabla
  adminSelectedTitle.textContent = `Auditoría: ${test.title}`;
  adminQuestionsBody.innerHTML = "";

  test.questionBank.forEach(q => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid var(--color-borde)";

    tr.innerHTML = `
      <td style="padding: 12px 15px;"><span style="font-family: monospace; font-weight: bold; background: rgba(35, 94, 130, 0.08); padding: 2px 6px; border-radius: 4px; color: var(--color-primario);">${q.id}</span></td>
      <td style="padding: 12px 15px;"><strong>Lvl ${q.level}</strong></td>
      <td style="padding: 12px 15px;"><div class="math-math">${q.text}</div></td>
      <td style="padding: 12px 15px;"><code>${q.correctAnswers.join(" | ")}</code></td>
      <td style="padding: 12px 15px;">
        <ol style="margin-left: 14px; padding-left: 0;">
          <li>${q.hints[0]}</li>
          <li>${q.hints[1]}</li>
        </ol>
      </td>
      <td style="padding: 12px 15px; color: var(--color-texto-secundario); font-size: 0.85rem;">${q.intendedAction}</td>
    `;
    adminQuestionsBody.appendChild(tr);
  });

  // Re-renderizar KaTeX
  if (typeof renderMathInElement === "function") {
    renderMathInElement(adminQuestionsBody, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError : false
    });
  }

  // 4. Validación del Banco de Preguntas en Vivo
  btnValidateBank.onclick = () => {
    const result = validateQuestionBank(test);
    validationReport.className = "validation-report";

    if (result.success) {
      validationReport.classList.add("correct");
      validationReport.style.borderColor = "var(--color-exito)";
      validationReport.style.color = "#27ae60";
      validationReport.style.background = "rgba(46, 204, 113, 0.1)";
      validationReport.innerHTML = `<strong>✅ Validación Exitosa:</strong> ${result.summary}`;
    } else {
      validationReport.style.borderColor = "var(--color-error)";
      validationReport.style.color = "#c0392b";
      validationReport.style.background = "rgba(231, 76, 60, 0.1)";
      validationReport.innerHTML = `<strong>❌ Errores Encontrados:</strong><ul style="margin-left: 20px; margin-top: 5px;">${result.errors.map(e => `<li>${e}</li>`).join("")}</ul>`;
    }
    validationReport.classList.remove("hidden");
  };

  // Función de validación analítica
  function validateQuestionBank(testData) {
    const errors = [];
    const qBank = testData.questionBank;

    if (qBank.length !== 20) {
      errors.push(`El banco debe tener exactamente 20 preguntas (actualmente tiene ${qBank.length}).`);
    }

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    qBank.forEach((q, idx) => {
      const qNum = idx + 1;
      if (!q.level || q.level < 1 || q.level > 4) {
        errors.push(`Pregunta #${qNum}: Nivel inválido (${q.level || 'sin definir'}). Debe ser de 1 a 4.`);
      } else {
        counts[q.level]++;
      }

      if (!q.text || q.text.trim() === "") {
        errors.push(`Pregunta #${qNum}: Enunciado de pregunta vacío.`);
      }
      if (!q.correctAnswers || q.correctAnswers.length === 0) {
        errors.push(`Pregunta #${qNum}: Falta definir las respuestas correctas admitidas.`);
      }
      if (!q.hints || q.hints.length !== 2 || q.hints.some(h => h.trim() === "")) {
        errors.push(`Pregunta #${qNum}: Debe tener exactamente 2 pistas con contenido.`);
      }
      if (!q.explanation || q.explanation.trim() === "") {
        errors.push(`Pregunta #${qNum}: Falta la explicación del procedimiento.`);
      }
      if (!q.intendedAction || q.intendedAction.trim() === "") {
        errors.push(`Pregunta #${qNum}: Falta la descripción pedagógica del profesor.`);
      }
    });

    for (let lvl = 1; lvl <= 4; lvl++) {
      if (counts[lvl] !== 5) {
        errors.push(`Dificultad Nivel ${lvl}: Debe contener exactamente 5 preguntas (actualmente tiene ${counts[lvl]}).`);
      }
    }

    return {
      success: errors.length === 0,
      errors: errors,
      summary: `Estructura validada con éxito: 20 preguntas encontradas (5 por nivel, del Nivel 1 al Nivel 4), 40 pistas de ayuda y descripciones pedagógicas de objetivos listas.`
    };
  }
});
