const menuToggle = document.querySelector("#menu-toggle");
const topMenu = document.querySelector("#top-menu");
const sectionNav = document.querySelector(".section-nav");

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
