
document.getElementById("confirmar-compra").addEventListener("click", confirmarCompra);
document.getElementById("volver").addEventListener("click", volverAtras);

///  func confirmar compra
async function confirmarCompra() {
  const carritoString = localStorage.getItem("carrito");
  const carrito = carritoString ? JSON.parse(carritoString) : [];

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

 const clienteNombre = localStorage.getItem("nombreUsuario") || "Invitado";;

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * (p.cantidad || 1),
    0
  );

  const datosVenta = {
    nombreCliente: clienteNombre,
    total: total,
    items: carrito.map(p => ({
      idProducto: p.id,
      nombreProducto: p.nombre,
      precioProducto: p.precio,
      cantidad: p.cantidad || 1
    }))
  };

  try {
    const respuesta = await fetch("https://programacion-iii-tp-backend.onrender.com/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosVenta)
      
    });
    console.log("datos",respuesta);
    if (!respuesta.ok) throw new Error("No se pudo procesar la venta");

    localStorage.removeItem("carrito");
    alert("¡Compra confirmada!");
    window.location.href = "/html/ticket.html";

  } catch (error) {
  console.error("Error al confirmar la compra:", error);
  alert("Error al procesar la compra: " + error.message);
}
}



function volverAtras(){
    window.location.href = "/html/index.html";
}
  
function init() {
  mostrarCarrito(); 
  const nombreUsuario = document.querySelector(".nombreUsuario");
  const usuario = localStorage.getItem("clienteNombre");
  if (nombreUsuario && usuario) {
    nombreUsuario.textContent = `Ya estamos terminando ${usuario}!!`;
  }
}

init();
