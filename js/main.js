
const inputNombre = document.getElementById("input-name");
const aContinuar = document.getElementById("button-name");
const divError = document.querySelector(".enviar-nombre");

let mensajeError = null;

function mostrarError(mensaje) {
    if (!mensajeError) {
        mensajeError = document.createElement("p");
        mensajeError.className = "error";
    
        divError.insertAdjacentElement("afterend", mensajeError);
    }
    mensajeError.textContent = mensaje;
}

function ocultarError() {
    if (mensajeError) {
        mensajeError.remove();
        mensajeError = null;
    }
}

inputNombre.addEventListener("input", () => {
    if (inputNombre.value.trim() !== "") {
        ocultarError();
    }
});

aContinuar.addEventListener("click", (e) => {

    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        mostrarError("Por favor, ingrese su nombre.");
    } else {
        localStorage.setItem("clienteNombre", nombre);
        window.location.href = "index.html";
    }
});




