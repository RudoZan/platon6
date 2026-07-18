// bancos.js - Lógica para listar y seleccionar bancos de preguntas a auditar

document.addEventListener("DOMContentLoaded", () => {
  // 1. Validar Sesión de Profesor
  if (sessionStorage.getItem("adminAuthenticated") !== "true") {
    window.location.href = "admin.html";
    return;
  }

  if (typeof TESTS_DATABASE === "undefined") {
    window.location.href = "index.html";
    return;
  }

  // Elementos DOM
  const adminTestsGrid = document.getElementById("admin-tests-grid");
  const btnAdminClose = document.getElementById("btn-admin-close");

  // 2. Control de Salida
  if (btnAdminClose) {
    btnAdminClose.onclick = () => {
      sessionStorage.removeItem("adminAuthenticated");
      window.location.href = "index.html";
    };
  }

  // 3. Renderizar Tarjetas de Pruebas
  if (adminTestsGrid) {
    adminTestsGrid.innerHTML = "";

    TESTS_DATABASE.forEach(test => {
      const card = document.createElement("div");
      card.className = "card test-card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "space-between";
      card.style.height = "100%";

      card.innerHTML = `
        <div>
          <h3 style="margin: 0 0 10px 0; color: var(--color-primario); font-size: 1.15rem;">${test.title}</h3>
          <p style="font-size: 0.82rem; color: var(--color-texto-secundario); margin: 0 0 15px 0; line-height: 1.4;">${test.desc}</p>
        </div>
        <button class="btn-primary" style="width: 100%; padding: 8px; font-size: 0.85rem; font-weight: bold; cursor: pointer;">Auditar Banco</button>
      `;

      card.onclick = () => {
        window.location.href = `auditar.html?testId=${test.id}`;
      };
      adminTestsGrid.appendChild(card);
    });
  }
});
