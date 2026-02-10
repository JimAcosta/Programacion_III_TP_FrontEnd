// Variables globales del carrito

//Si hay productos en json los trae como array, si no trae nada devuelve un array vacio
let carritoProductos = JSON.parse(localStorage.getItem("Carrito")) || [];
let totalCarritoProductos = parseFloat(localStorage.getItem("Total")) || 0;

// Mostrar el carrito en cualquier pantalla que tenga los elementos necesarios
function mostrarCarrito() {
    const itemsCarrito = document.getElementById("items-carrito");
    const totalCarrito = document.getElementById("precio-total");
    const contadorCarrito = document.getElementById("contador-carrito");
    const btnContinuar = document.getElementById("btn-continuar");

    let html = "";
    let contador = 0;
    let total = 0;

    carritoProductos.forEach((prod, index) => {
        contador += prod.cantidad || 1;
        const cantidad = prod.cantidad || 1;
        const subtotal = prod.precio * cantidad;
        total += subtotal;

        if (itemsCarrito) {
            html += `
                <div class="item-carrito">
                    <span>${prod.nombre} - $${prod.precio} x ${cantidad}</span>
                    <button id="btnSumar" onclick="sumarCantidad(${index})">+</button>
                    <button id="btnRestar" onclick="restarCantidad(${index})">-</button>
                    <button id="btnEliminar" onclick="eliminarCarrito(${index})">Eliminar</button>
                </div>
            `;
        }
    });

    if (itemsCarrito) itemsCarrito.innerHTML = html || "<p>No hay elementos en el carrito.</p>";
    if (totalCarrito) totalCarrito.innerHTML = `$${total.toFixed(2)}`;
    if (contadorCarrito) contadorCarrito.textContent = contador;

    // Mostrar u ocultar botón "Continuar"
    if (btnContinuar) {
        btnContinuar.style.display = carritoProductos.length > 0 ? "inline-block" : "none";
    }

    // Guardar total actualizado
    totalCarritoProductos = total;
    localStorage.setItem("Total", totalCarritoProductos.toString());
    localStorage.setItem("Carrito", JSON.stringify(carritoProductos));
}

// Agrega un producto al carrito (por ID)
function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carritoProductos.find(p => p.id === id);

    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        producto.cantidad = 1;
        carritoProductos.push(producto);
    }
    localStorage.setItem("carrito", JSON.stringify(carritoProductos));

    mostrarCarrito();
}

// Elimina un producto completamente del carrito
function eliminarCarrito(index) {
    carritoProductos.splice(index, 1);
    mostrarCarrito();
}

// Suma cantidad de un producto
function sumarCantidad(index) {
    carritoProductos[index].cantidad = (carritoProductos[index].cantidad || 1) + 1;
    mostrarCarrito();
}

// Resta cantidad o elimina si llega a 0
function restarCantidad(index) {
    if (carritoProductos[index].cantidad > 1) {
        carritoProductos[index].cantidad--;
    } else {
        eliminarCarrito(index);
        return;
    }
    mostrarCarrito();
}

// Limpia todo el carrito
function limpiarCarrito() {
    carritoProductos = [];
    totalCarritoProductos = 0;
    mostrarCarrito();
}
