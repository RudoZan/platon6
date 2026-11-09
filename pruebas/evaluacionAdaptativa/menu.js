// menu.js - Lógica del menú de selección de pruebas

document.addEventListener("DOMContentLoaded", () => {
  const testsGrid = document.getElementById("tests-grid");
  const btnGoAdmin = document.getElementById("btn-go-admin");

  function renderMenu() {
    if (!testsGrid) return;
    testsGrid.innerHTML = "";
    
    // TESTS_DATABASE proviene de db.js
    if (typeof TESTS_DATABASE !== "undefined") {
      TESTS_DATABASE.forEach(test => {
        const card = document.createElement("div");
        card.className = "card test-card";
        
        card.innerHTML = `
          <h3>${test.title}</h3>
          <p>${test.desc}</p>
          <div class="test-meta">
            <span>⏱️ Promedio: ${test.duration}</span>
            <span class="test-status active">Disponible</span>
          </div>
        `;
        
        card.onclick = () => {
          sessionStorage.setItem("selectedTestId", test.id);
          window.location.href = "evaluacion.html";
        };
        testsGrid.appendChild(card);
      });
    }
  }

  if (btnGoAdmin) {
    btnGoAdmin.onclick = () => {
      window.location.href = "admin.html";
    };
  }

  renderMenu();
});
