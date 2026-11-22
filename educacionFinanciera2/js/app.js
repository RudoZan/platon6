const menuToggle = document.querySelector("#menu-toggle");
const topMenu = document.querySelector("#top-menu");
const sectionNav = document.querySelector(".section-nav");

const sectionIcons = {
  mi_perfil: "",
  situacion_actual: "📊",
  trabajo_estudios: "💼",
  finanzas: "🏦",
  comercio_vida_cotidiana: "🛍️",
  asesor_financiero: "🤝",
};

const sectionIconClasses = {
  mi_perfil: "icon-personal",
  situacion_actual: "icon-situation",
  trabajo_estudios: "icon-work",
  finanzas: "icon-finance",
  comercio_vida_cotidiana: "icon-products",
  asesor_financiero: "icon-advisor",
};

const sectionLabels = {
  mi_perfil: "Mi perfil",
  situacion_actual: "Situación",
  trabajo_estudios: "Trabajo y capacitación",
  finanzas: "Finanzas Cuentas e Inversión",
  comercio_vida_cotidiana: "Productos y Servicios",
  asesor_financiero: "Asesor financiero",
};

for (const section of window.EF_DATA.EF_secciones_opciones_APP.secciones) {
  const item = document.createElement("button");
  item.className = "nav-item";
  item.type = "button";
  item.title = section.nombre;

  const icon = document.createElement("span");
  icon.className = `nav-icon ${sectionIconClasses[section.id] || "icon-default"}`;
  icon.setAttribute("aria-hidden", "true");
  if (section.id === "mi_perfil") {
    icon.innerHTML = '<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="14" r="8" fill="#fff"/><path d="M10 40C10 31.5 17 25 26 25C35 25 42 31.5 42 40" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
  } else {
    icon.textContent = sectionIcons[section.id] || "•";
  }

  const label = document.createElement("span");
  label.textContent = sectionLabels[section.id] || section.nombre;
  item.setAttribute("aria-label", section.nombre);

  item.append(icon, label);
  sectionNav.append(item);
}

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
