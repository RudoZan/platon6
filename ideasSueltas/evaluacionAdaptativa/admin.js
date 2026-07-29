// admin.js - Lógica simplificada del Panel de Administración del Profesor

document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const screenAdminAuth = document.getElementById("screen-admin-auth");
  const screenAdminPanel = document.getElementById("screen-admin-panel");
  
  const adminPass = document.getElementById("admin-pass");
  const btnAuthSubmit = document.getElementById("btn-auth-submit");
  const btnAuthCancel = document.getElementById("btn-auth-cancel");
  const authError = document.getElementById("auth-error");
  const btnAdminClose = document.getElementById("btn-admin-close");

  // 1. Verificar si ya está autenticado en la sesión
  if (sessionStorage.getItem("adminAuthenticated") === "true") {
    screenAdminAuth.classList.remove("active");
    screenAdminPanel.classList.add("active");
  }

  // 2. Manejo del Login de Maqueta
  btnAuthSubmit.onclick = () => {
    const pass = adminPass.value.trim();
    if (pass === "") {
      authError.textContent = "Ingresa alguna contraseña.";
      return;
    }
    
    // Acceso concedido y guardado en sesión
    sessionStorage.setItem("adminAuthenticated", "true");
    screenAdminAuth.classList.remove("active");
    screenAdminPanel.classList.add("active");
  };

  adminPass.onkeydown = (e) => {
    if (e.key === "Enter") {
      btnAuthSubmit.click();
    }
  };

  btnAuthCancel.onclick = () => {
    window.location.href = "index.html";
  };

  btnAdminClose.onclick = () => {
    sessionStorage.removeItem("adminAuthenticated");
    window.location.href = "index.html";
  };

  // Auto-enfocar password en el login de admin
  setTimeout(() => {
    if (adminPass) adminPass.focus();
  }, 200);
});
