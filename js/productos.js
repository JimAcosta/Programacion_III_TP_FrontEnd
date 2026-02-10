let productos = [];

// DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const nombreUsuario = document.querySelector(".nombreUsuario");
const btnVinilos = document.getElementById("mostrar-vinilos");
const btnDiscos = document.getElementById("mostrar-discos");
const btnTodos = document.getElementById("mostrar-todos");

// Mostrar nombre guardado
const usuario = localStorage.getItem("nombreUsuario");
if (nombreUsuario) {
  nombreUsuario.textContent = `Hola ${usuario}!!`;
}

// Cargar productos desde JSON y mostrarlos
async function cargarProductosDesdeAPI() {
  try {
    const response = await fetch("https://programacion-iii-tp-backend.onrender.com/api/products");
    const data = await response.json();

    productos = data.filter(p => p.esta_activo); 
    mostrarProductos(productos);
    mostrarCarrito();
  } catch (error) {
    console.error("Error al cargar productos desde API:", error);
  }
}


function mostrarProductos(array) {
  if (!contenedorProductos) return;

  let html = "";
  array.forEach(producto => {
    html += `
      <div class="card-producto">
        <img src=${producto.imagen} alt="imagen-${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarCarrito(${producto.id})">Agregar a carrito</button>
      </div>`;
  });

  contenedorProductos.innerHTML = html;
}

// Filtrar por tipo
function filtrarPorTipo(categoria) {
  const filtrados = productos.filter(p => p.categoria === categoria);
  mostrarProductos(filtrados);
}

// Eventos para botones
if(btnTodos){
  btnTodos.addEventListener("click", () => cargarProductosDesdeAPI());
}
if (btnVinilos) {
  btnVinilos.addEventListener("click", () => filtrarPorTipo("Vinilo"));
}
if (btnDiscos) {
  btnDiscos.addEventListener("click", () => filtrarPorTipo("Disco"));
}
/**/

function init() {
  cargarProductosDesdeAPI();

  let btnContinuar = document.getElementById("btn-continuar");
  if (btnContinuar) {
    btnContinuar.addEventListener("click", () => {
      window.location.href = "/html/carrito.html";
    });
  }
}

init();
