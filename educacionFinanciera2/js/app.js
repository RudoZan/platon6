const menuToggle = document.querySelector("#menu-toggle");
const topMenu = document.querySelector("#top-menu");
const sectionNav = document.querySelector(".section-nav");
const mainContent = document.querySelector(".main-content");
const welcomePanel = document.querySelector(".welcome-panel");
const brand = document.querySelector(".brand");
const profileInterestConfig = window.EF_DATA.EF_catalogo_perfil.intereses;
const profileInterestRules = profileInterestConfig.reglasSeleccion;
const profileInterests = profileInterestConfig.opciones.map((option) => ({
  ...option,
  stars: Number(option.estrellasIniciales) || 0,
}));
const profilePreferencesConfig = window.EF_DATA.EF_catalogo_perfil.preferencias;
const profilePreferenceRules = profilePreferencesConfig.reglasSeleccion;
const profilePreferenceGroups = [
  { id: "vivienda", nombre: "1. Vivienda" },
  { id: "trabajo", nombre: "2. Trabajo" },
  { id: "transporte", nombre: "3. Transporte" },
];
const profilePreferenceSelections = {
  vivienda: [],
  trabajo: [],
  transporte: [],
};
const riskTestConfig = window.EF_DATA.EF_catalogo_perfil.tests.perfilInversionista;
const riskTestTexts = riskTestConfig.textos;
const riskTestState = { view: "intro", questionIndex: 0, answers: {}, result: null };
const dilemmasConfig = window.EF_DATA.EF_catalogo_perfil.tests.dilemasFinancieros;
const dilemmaAnswers = {};
const profileSummaryConfig = window.EF_DATA.EF_catalogo_perfil.resumen;

const sectionIcons = {
  mi_perfil: '<circle cx="12" cy="8" r="3.25"/><path d="M5 20c0-3.7 2.9-6 7-6s7 2.3 7 6"/>',
  situacion_actual: '<path d="M4 19V5M4 19h17"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16V4"/>',
  trabajo_estudios: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
  finanzas: '<path d="m3 9 9-6 9 6H3Z"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18M4 18h16"/>',
  comercio_vida_cotidiana: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  asesor_financiero: '<path d="m8 12 2.2 2.2a2 2 0 0 0 2.8 0l4.5-4.5a2 2 0 0 0-2.8-2.8L12 9.6"/><path d="m3 10 4-4 4 1 2-1 4 1 4 4-3 3M2 9l4 4M22 9l-4 4M7 14l2 2M10 16l2 2M14 15l2 2"/>',
};

const sectionLabels = {
  mi_perfil: "Mi perfil",
  situacion_actual: "Mi Situación",
  trabajo_estudios: "Trabajo y capacitación",
  finanzas: "Finanzas Cuentas e Inversión",
  comercio_vida_cotidiana: "Productos y Servicios",
  asesor_financiero: "Asesor financiero",
};

function renderProfileInterests(container) {
  const list = document.createElement("div");
  list.className = "profile-interest-list";

  for (const [index, interest] of profileInterests.entries()) {
    const row = document.createElement("div");
    row.className = "profile-interest-row";

    const label = document.createElement("div");
    label.className = "profile-interest-label";
    label.textContent = `${interest.icono} ${interest.nombre}`;

    const stars = document.createElement("div");
    stars.className = "profile-interest-stars";

    for (let slot = 1; slot <= profileInterestRules.estrellasPorInteresMaximas; slot += 1) {
      const starButton = document.createElement("button");
      const isFilled = slot <= interest.stars;
      starButton.type = "button";
      starButton.className = `profile-interest-star${isFilled ? " is-filled" : ""}`;
      starButton.setAttribute("aria-pressed", String(isFilled));
      starButton.setAttribute("aria-label", `${isFilled ? "Quitar o ajustar" : "Asignar"} estrella ${slot} a ${interest.nombre}`);
      starButton.title = starButton.getAttribute("aria-label");

      const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      starSvg.setAttribute("viewBox", "0 0 20 20");
      starSvg.setAttribute("aria-hidden", "true");
      const starShape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      starShape.setAttribute("points", "10,1 12.6,6.8 19,7.5 14.3,12 15.6,18.5 10,15.2 4.4,18.5 5.7,12 1,7.5 7.4,6.8");
      starSvg.append(starShape);
      starButton.append(starSvg);
      starButton.addEventListener("click", () => updateProfileInterest(index, slot, container));
      stars.append(starButton);
    }

    row.append(label, stars);
    list.append(row);
  }

  const total = profileInterests.reduce((sum, interest) => sum + interest.stars, 0);
  const summary = document.createElement("div");
  summary.className = "profile-interest-summary";

  const interactionInstruction = document.createElement("p");
  interactionInstruction.className = "profile-interest-interaction";
  interactionInstruction.textContent = profileInterestConfig.textos.interaccion;

  const counter = document.createElement("span");
  counter.className = "profile-interest-counter";
  counter.textContent = `${total} / ${profileInterestRules.estrellasTotalesMaximas} estrellas`;
  summary.append(interactionInstruction, counter);

  const instruction = document.createElement("p");
  instruction.className = "profile-interest-instruction";
  instruction.textContent = `Marca las actividades y aspectos que te motivan y te hacen sentir bien. Distribuye hasta ${profileInterestRules.estrellasTotalesMaximas} estrellas. No es necesario asignarlas todas.`;

  container.replaceChildren(instruction, list, summary);
}

function updateProfileInterest(index, slot, container) {
  const interest = profileInterests[index];
  const total = profileInterests.reduce((sum, entry) => sum + entry.stars, 0);

  if (slot <= interest.stars) {
    interest.stars = slot === interest.stars ? interest.stars - 1 : slot;
    renderProfileInterests(container);
    return;
  }

  const available = profileInterestRules.estrellasTotalesMaximas - total;
  if (available <= 0) {
    container.querySelectorAll(".profile-interest-star.is-filled").forEach((star) => star.classList.add("is-limit-alert"));
    window.setTimeout(() => {
      container.querySelectorAll(".profile-interest-star.is-limit-alert").forEach((star) => star.classList.remove("is-limit-alert"));
    }, 1400);
    return;
  }

  interest.stars += Math.min(slot - interest.stars, available);
  renderProfileInterests(container);
}

function renderProfilePreferences(container) {
  const instruction = document.createElement("p");
  instruction.className = "profile-preferences-instruction";
  instruction.textContent = profilePreferencesConfig.textos.instruccion;

  const groups = document.createElement("div");
  groups.className = "profile-preference-groups";

  for (const preferenceGroup of profilePreferenceGroups) {
    const group = document.createElement("section");
    group.className = "profile-preference-group";

    const heading = document.createElement("h2");
    heading.id = `profile-preference-${preferenceGroup.id}-title`;
    heading.textContent = preferenceGroup.nombre;

    const options = document.createElement("div");
    options.className = "profile-preference-options";
    options.setAttribute("role", "group");
    options.setAttribute("aria-labelledby", heading.id);

    for (const option of profilePreferencesConfig[preferenceGroup.id]) {
      const isSelected = profilePreferenceSelections[preferenceGroup.id].includes(option.id);
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = `profile-preference-option${isSelected ? " is-selected" : ""}`;
      optionButton.setAttribute("aria-pressed", String(isSelected));

      const icon = document.createElement("span");
      icon.className = "profile-preference-icon";
      icon.textContent = option.icono;
      icon.setAttribute("aria-hidden", "true");

      const text = document.createElement("span");
      text.className = "profile-preference-text";

      const name = document.createElement("span");
      name.className = "profile-preference-name";
      name.textContent = option.nombre;

      const description = document.createElement("span");
      description.className = "profile-preference-description";
      description.textContent = option.descripcion;

      text.append(name, description);
      optionButton.append(icon, text);
      optionButton.addEventListener("click", () => {
        updateProfilePreference(preferenceGroup.id, option.id, container);
      });
      options.append(optionButton);
    }

    group.append(heading, options);
    groups.append(group);
  }

  container.replaceChildren(instruction, groups);
}

function updateProfilePreference(groupId, optionId, container) {
  const selections = profilePreferenceSelections[groupId];
  const selectedIndex = selections.indexOf(optionId);

  if (selectedIndex !== -1) {
    selections.splice(selectedIndex, 1);
  } else {
    const maximum = profilePreferenceRules[groupId].maximas;
    if (selections.length >= maximum) selections.shift();
    selections.push(optionId);
  }

  renderProfilePreferences(container);
}

function fillText(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
}

function createRiskElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createRiskButton(className, text, onClick) {
  const button = createRiskElement("button", className, text);
  button.type = "button";
  button.addEventListener("click", onClick);
  return button;
}

function showRiskView(view, container, questionIndex = riskTestState.questionIndex) {
  riskTestState.view = view;
  riskTestState.questionIndex = questionIndex;
  renderRiskProfile(container);
}

function getRiskPendingQuestions() {
  return riskTestConfig.preguntas.flatMap((question, index) => (riskTestState.answers[question.id] ? [] : [index + 1]));
}

function calculateRiskResult() {
  const score = riskTestConfig.preguntas.reduce((sum, question) => {
    const option = question.opciones.find((candidate) => candidate.id === riskTestState.answers[question.id]);
    return sum + (option?.puntaje || 0);
  }, 0);
  const category = riskTestConfig.resultado.categorias.find((candidate) => score >= candidate.puntajeMinimo && score <= candidate.puntajeMaximo);
  return { score, category };
}

function createRiskResultCard(result) {
  const card = createRiskElement("div", `risk-result-card is-${result.category.id}`);
  const description = createRiskElement("p", "risk-result-description", result.category.descripcion);
  card.append(
    createRiskElement("div", "risk-result-kicker", riskTestTexts.perfilDeterminado),
    createRiskElement("div", "risk-result-label", result.category.nombre),
    createRiskElement("div", "risk-result-score", fillText(riskTestTexts.puntaje, { puntaje: result.score, maximo: riskTestConfig.resultado.puntajeMaximo })),
    description,
  );
  return card;
}

function renderRiskProfile(container) {
  const total = riskTestConfig.preguntas.length;

  if (riskTestState.view === "intro") {
    const children = [createRiskElement("p", "risk-description", riskTestTexts.descripcion)];
    if (riskTestState.result) {
      children.push(createRiskResultCard(riskTestState.result));
    } else {
      const status = createRiskElement("div", "risk-status-box");
      status.append(
        createRiskElement("div", "risk-status-title", riskTestTexts.sinResultado),
        createRiskElement("div", "risk-status-detail", riskTestTexts.sinResultadoDetalle),
      );
      children.push(status);
    }
    children.push(createRiskButton("risk-primary-button", riskTestTexts.irAlTest, () => showRiskView("question", container, 0)));
    container.replaceChildren(...children);
    return;
  }

  const header = createRiskElement("div", "risk-test-header");
  header.append(
    createRiskElement("span", "risk-test-title", `${riskTestConfig.icono} ${riskTestConfig.nombre}`),
    createRiskButton("risk-exit-button", riskTestTexts.salirDelTest, () => showRiskView("intro", container)),
  );

  if (riskTestState.view === "question") {
    const index = riskTestState.questionIndex;
    const question = riskTestConfig.preguntas[index];
    const answered = Object.keys(riskTestState.answers).length;

    const progress = createRiskElement("div", "risk-progress-row");
    progress.append(
      createRiskElement("span", "risk-progress-label", fillText(riskTestTexts.pregunta, { actual: index + 1, total })),
      createRiskElement("span", "risk-progress-count", fillText(riskTestTexts.respondidas, { respondidas: answered, total })),
    );
    const bar = createRiskElement("div", "risk-progress-bar");
    const barFill = createRiskElement("div", "risk-progress-fill");
    barFill.style.width = `${((index + 1) / total) * 100}%`;
    bar.append(barFill);

    const options = createRiskElement("div", "risk-options");
    for (const option of question.opciones) {
      const isSelected = riskTestState.answers[question.id] === option.id;
      const optionButton = createRiskElement("button", `risk-option${isSelected ? " is-selected" : ""}`);
      optionButton.type = "button";
      optionButton.setAttribute("aria-pressed", String(isSelected));
      optionButton.append(
        createRiskElement("span", "risk-option-text", option.texto),
        createRiskElement("span", "risk-option-points", `${option.puntaje} ${option.puntaje === 1 ? riskTestTexts.puntoAbreviado : riskTestTexts.puntosAbreviado}`),
      );
      optionButton.addEventListener("click", () => {
        riskTestState.answers[question.id] = option.id;
        renderRiskProfile(container);
      });
      options.append(optionButton);
    }

    const nav = createRiskElement("div", "risk-nav");
    const isLast = index === total - 1;
    nav.append(
      createRiskButton("risk-nav-button is-previous", riskTestTexts.anterior, () => showRiskView(index > 0 ? "question" : "intro", container, Math.max(index - 1, 0))),
      createRiskButton("risk-nav-button is-next", riskTestTexts.siguiente, () => showRiskView(isLast ? "final" : "question", container, isLast ? index : index + 1)),
    );

    container.replaceChildren(header, progress, bar, createRiskElement("p", "risk-question", question.texto), options, nav);
    return;
  }

  const pending = getRiskPendingQuestions();
  const nav = createRiskElement("div", "risk-nav");
  nav.append(createRiskButton("risk-nav-button is-previous", riskTestTexts.anterior, () => showRiskView("question", container, total - 1)));

  if (pending.length) {
    const warning = createRiskElement("div", "risk-incomplete-box");
    warning.append(
      createRiskElement("div", "risk-incomplete-title", riskTestTexts.incompleto),
      createRiskElement("div", "risk-incomplete-detail", fillText(riskTestTexts.preguntasPendientes, { lista: pending.map((number) => fillText(riskTestTexts.preguntaNumero, { numero: number })).join(", ") })),
    );
    container.replaceChildren(header, warning, nav);
    return;
  }

  riskTestState.result = calculateRiskResult();
  container.replaceChildren(header, createRiskResultCard(riskTestState.result), nav);
}

function createSummaryParagraph(parts) {
  const paragraph = document.createElement("p");
  paragraph.className = "profile-summary-paragraph";
  for (const part of parts) {
    if (typeof part === "string") {
      paragraph.append(part);
    } else {
      const strong = document.createElement("strong");
      strong.textContent = part.strong;
      paragraph.append(strong);
    }
  }
  return paragraph;
}

function summaryNameParts(names, closeWithAnd = true) {
  return names.flatMap((name, index) => {
    const isLast = index === names.length - 1;
    const separator = index === 0 ? "" : closeWithAnd && isLast ? " y " : ", ";
    return [separator, { strong: name }];
  });
}

function createInterestsSummary() {
  const texts = profileSummaryConfig.textos;
  const ranked = profileInterests.filter((interest) => interest.stars > 0).sort((a, b) => b.stars - a.stars);
  if (!ranked.length) return createSummaryParagraph([texts.sinIntereses]);

  const shown = ranked.slice(0, profileSummaryConfig.maximoInteresesMostrados);
  const hasMore = ranked.length > shown.length;
  return createSummaryParagraph([
    texts.intereses,
    ...summaryNameParts(shown.map((interest) => interest.nombre), !hasMore),
    hasMore ? texts.entreOtros : "",
    ".",
  ]);
}

function createPreferencesSummary() {
  const texts = profileSummaryConfig.textos;
  const clauses = profilePreferenceGroups.flatMap((group) => {
    const names = profilePreferenceSelections[group.id]
      .map((id) => profilePreferencesConfig[group.id].find((option) => option.id === id)?.nombre)
      .filter(Boolean);
    return names.length ? [{ prefix: texts[group.id], names }] : [];
  });
  if (!clauses.length) return createSummaryParagraph([texts.sinPreferencias]);

  const parts = clauses.flatMap((clause, index) => {
    const separator = index === 0 ? "" : index === clauses.length - 1 ? ", y " : ", ";
    const prefix = index === 0 ? clause.prefix[0].toUpperCase() + clause.prefix.slice(1) : clause.prefix;
    return [separator, prefix, ...summaryNameParts(clause.names)];
  });
  return createSummaryParagraph([...parts, "."]);
}

function createRiskSummary() {
  const texts = profileSummaryConfig.textos;
  const category = riskTestState.result?.category;
  if (!category) return createSummaryParagraph([texts.sinPerfilInversionista]);
  return createSummaryParagraph([texts.perfilInversionista, { strong: category.nombre }, `. ${category.descripcion}`]);
}

function renderProfileDilemmas(container) {
  const grid = document.createElement("div");
  grid.className = "dilemma-grid";

  for (const question of dilemmasConfig.preguntas) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dilemma-button";

    const icon = document.createElement("span");
    icon.className = "dilemma-button-icon";
    icon.textContent = question.icono;
    icon.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.className = "dilemma-button-name";
    name.textContent = question.nombre;

    const answerSummary = document.createElement("span");
    answerSummary.className = "dilemma-button-answer";
    const selectedOption = question.opciones.find((option) => option.id === dilemmaAnswers[question.id]);
    answerSummary.textContent = selectedOption ? `Respuesta: ${selectedOption.texto}` : "";

    button.append(icon, name, answerSummary);
    button.addEventListener("click", () => openDilemmaDialog(question, answerSummary));
    grid.append(button);
  }

  container.replaceChildren(grid);
}

function openDilemmaDialog(question, answerSummary) {
  const dialog = document.createElement("dialog");
  dialog.className = "dilemma-dialog";
  const titleId = `dilemma-${question.id}-title`;
  dialog.setAttribute("aria-labelledby", titleId);

  const body = document.createElement("div");
  body.className = "dilemma-dialog-body";

  const title = document.createElement("h2");
  title.id = titleId;
  title.className = "dilemma-title";
  title.textContent = `${question.icono} ${question.nombre}`;

  const text = document.createElement("p");
  text.className = "dilemma-text";
  text.textContent = question.texto;

  const options = document.createElement("div");
  options.className = "dilemma-options";
  const optionButtons = question.opciones.map((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "dilemma-option";
    optionButton.textContent = option.texto;
    optionButton.addEventListener("click", () => {
      dilemmaAnswers[question.id] = option.id;
      answerSummary.textContent = `Respuesta: ${option.texto}`;
      markSelectedOption();
    });
    options.append(optionButton);
    return { option, optionButton };
  });

  function markSelectedOption() {
    for (const { option, optionButton } of optionButtons) {
      const isSelected = dilemmaAnswers[question.id] === option.id;
      optionButton.classList.toggle("is-selected", isSelected);
      optionButton.setAttribute("aria-pressed", String(isSelected));
    }
  }
  markSelectedOption();

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "dilemma-close";
  closeButton.textContent = dilemmasConfig.textos.cerrar;
  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("close", () => dialog.remove());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  body.append(title, text, options, closeButton);
  dialog.append(body);
  document.body.append(dialog);
  dialog.showModal();
}

function renderHome() {
  mainContent.classList.remove("is-section-view");
  mainContent.classList.remove("is-profile-view");
  mainContent.replaceChildren(welcomePanel);
  sectionNav.querySelectorAll(".nav-item").forEach((item) => item.removeAttribute("aria-current"));
}

function renderSection(section, item, profileSubsection = null) {
  if (section.id === "mi_perfil" && !profileSubsection) {
    profileSubsection = section.subsecciones?.find((subsection) => subsection.id === "perfil_resumen") || null;
  }

  const sectionPage = document.createElement("section");
  sectionPage.className = "section-page";
  const isProfileRoot = section.id === "mi_perfil" && !profileSubsection;
  sectionPage.setAttribute(isProfileRoot ? "aria-label" : "aria-labelledby", isProfileRoot ? "Mi perfil" : "section-title");
  if (["perfil_preferencias", "perfil_riesgo", "perfil_dilemas_financieros"].includes(profileSubsection?.id)) {
    sectionPage.removeAttribute("aria-labelledby");
    sectionPage.setAttribute("aria-label", profileSubsection.nombre);
  }

  if (section.id !== "mi_perfil" && !isProfileRoot) {
    const title = document.createElement("h1");
    title.id = "section-title";
    title.textContent = profileSubsection?.nombre || sectionLabels[section.id] || section.nombre;
    sectionPage.append(title);
  }

  if (section.id === "mi_perfil") {
    const subsectionNav = document.createElement("nav");
    subsectionNav.className = "subsection-nav";
    subsectionNav.setAttribute("aria-label", "Navegación de Mi perfil");

    for (const subsection of section.subsecciones || []) {
      const subsectionButton = document.createElement("button");
      subsectionButton.type = "button";
      subsectionButton.className = "subsection-nav-item";
      subsectionButton.textContent = subsection.nombre;
      if (subsection.id === profileSubsection?.id) {
        subsectionButton.setAttribute("aria-current", "page");
      }
      subsectionButton.addEventListener("click", () => renderSection(section, item, subsection));
      subsectionNav.append(subsectionButton);
    }

    sectionPage.append(subsectionNav);

    if (profileSubsection) {
      const tabContent = document.createElement("div");
      tabContent.className = "profile-tab-content";
      if (["perfil_intereses", "perfil_preferencias", "perfil_riesgo", "perfil_dilemas_financieros"].includes(profileSubsection.id)) {
        tabContent.classList.add("profile-tab-content--compact");
      }

      if (profileSubsection.id === "perfil_intereses") {
        const interestContent = document.createElement("div");
        interestContent.className = "profile-interest-content";
        tabContent.append(interestContent);
        renderProfileInterests(interestContent);
      } else if (profileSubsection.id === "perfil_preferencias") {
        const preferenceContent = document.createElement("div");
        preferenceContent.className = "profile-preferences-content";
        tabContent.append(preferenceContent);
        renderProfilePreferences(preferenceContent);
      } else if (profileSubsection.id === "perfil_riesgo") {
        const riskContent = document.createElement("div");
        riskContent.className = "profile-risk-content";
        tabContent.append(riskContent);
        renderRiskProfile(riskContent);
      } else if (profileSubsection.id === "perfil_dilemas_financieros") {
        const dilemmaContent = document.createElement("div");
        dilemmaContent.className = "profile-dilemmas-content";
        tabContent.append(dilemmaContent);
        renderProfileDilemmas(dilemmaContent);
      } else {
        const title = document.createElement("h1");
        title.id = "section-title";
        title.textContent = profileSubsection.nombre;
        tabContent.append(title);
        if (profileSubsection.id === "perfil_resumen") {
          title.textContent = profileSummaryConfig.textos.titulo;
          title.classList.add("profile-summary-title");
          tabContent.append(createInterestsSummary(), createPreferencesSummary(), createRiskSummary());
        }
      }

      sectionPage.append(tabContent);
    }
  }

  if (section.id === "mi_perfil" && !profileSubsection) {
    sectionPage.setAttribute("aria-label", "Mi perfil");
  }

  mainContent.classList.add("is-section-view");
  mainContent.classList.toggle("is-profile-view", section.id === "mi_perfil");
  mainContent.replaceChildren(sectionPage);
  sectionNav.querySelectorAll(".nav-item").forEach((navItem) => navItem.removeAttribute("aria-current"));
  item.setAttribute("aria-current", "page");
}

for (const section of window.EF_DATA.EF_secciones_opciones_APP.secciones) {
  const item = document.createElement("button");
  item.className = "nav-item";
  item.type = "button";
  const sectionLabel = sectionLabels[section.id] || section.nombre;
  item.title = sectionLabel;

  const icon = document.createElement("span");
  icon.className = "nav-icon";
  icon.setAttribute("aria-hidden", "true");
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("fill", "none");
  iconSvg.setAttribute("stroke", "currentColor");
  iconSvg.setAttribute("stroke-width", "1.7");
  iconSvg.setAttribute("stroke-linecap", "round");
  iconSvg.setAttribute("stroke-linejoin", "round");
  iconSvg.innerHTML = sectionIcons[section.id] || '<circle cx="12" cy="12" r="8"/>';
  icon.append(iconSvg);

  const label = document.createElement("span");
  label.textContent = sectionLabel;
  item.setAttribute("aria-label", sectionLabel);

  item.append(icon, label);
  item.addEventListener("click", () => renderSection(section, item));
  sectionNav.append(item);
}

brand.addEventListener("click", (event) => {
  event.preventDefault();
  renderHome();
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  topMenu.hidden = isExpanded;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-wrap")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    topMenu.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    topMenu.hidden = true;
    menuToggle.focus();
  }
});
