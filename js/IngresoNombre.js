// nombre-usuario.js

function guardarNombreYRedirigir() {
  const inputNombre = document.getElementById("input-name");
  const nombre = inputNombre.value.trim();

  if (nombre !== "") {
    localStorage.setItem("nombreUsuario", nombre);
    window.location.href = "index.html";
  } else {
    alert("Por favor ingresa tu nombre");
  }
}

function configurarIngresoNombre() {
  const inputNombre = document.getElementById("input-name");
  const boton = document.getElementById("button-name");

  if (!inputNombre || !boton) return; // Evita errores si no estamos en esa página

  boton.addEventListener("click", guardarNombreYRedirigir);
  inputNombre.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      guardarNombreYRedirigir();
    }
  });
}

function mostrarSaludoUsuario() {
  const divNombre = document.querySelector(".nombreUsuario");
  if (!divNombre) return;

  const nombreUsuario = localStorage.getItem("nombreUsuario");
  divNombre.textContent = nombreUsuario
    ? `Hola ${nombreUsuario}`
    : "Hola invitado";
}

// Ejecutar funciones según contenido del DOM
document.addEventListener("DOMContentLoaded", () => {
  configurarIngresoNombre();
  mostrarSaludoUsuario();
});

