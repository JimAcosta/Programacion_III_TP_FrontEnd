

function mostrarTicket() {
  const nombre = localStorage.getItem("nombreUsuario");
  const carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
  const total = parseFloat(localStorage.getItem("Total")) || 0;
  const fecha = new Date().toLocaleString("es-AR");

  // Mostrar datos del usuario y fecha
  const datosUsuario = document.getElementById("datos-usuario");
  datosUsuario.innerHTML = `
    <p><strong>Cliente:</strong> ${nombre}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>`;

  // Mostrar detalle de productos
  const lista = document.getElementById("detalle-productos");
  lista.innerHTML = "";

  carrito.forEach(prod => {
    const cantidad = prod.cantidad;
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} x${cantidad} - $${(prod.precio * cantidad).toFixed(2)}`;
    lista.appendChild(li);
  });

  // Mostrar total
  const totalFinal = document.getElementById("total-final");
  totalFinal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Reiniciar el sistema
function reiniciarSistema() {
  localStorage.clear();
  window.location.href = "/html/ingresoNombre.html"; 
}

function obtenerPedidoDesdeLocalStorage() {
  const carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
  const total = parseFloat(localStorage.getItem("Total")) || 0;

  return {
    id: Date.now(), // id simple para el ticket
    items: carrito.map(prod => ({
      nombreProducto: prod.nombre,
      precioProducto: prod.precio,
      cantidad: prod.cantidad
    })),
    total
  };
}



async function exportarPedidoPDF(pedido) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Medidas y márgenes
  const margenIzquierdo = 15;
  const margenSuperiorInicial = 20;
  const anchoPagina = doc.internal.pageSize.getWidth();
  const margenDerecho = anchoPagina - 15;

  let y = margenSuperiorInicial;

  // Título / Orden
  doc.setFontSize(20);
  doc.text(
    `Orden N° ${pedido.id}`,
    margenDerecho,
    y,
    { align: "right" }
  );

  // Espacio después del título
  y += 15;

  // Detalle de productos
  doc.setFontSize(11);

  pedido.items.forEach((item) => {
    y += 8;
    doc.text(
      `${item.cantidad} x ${item.nombreProducto} - $${Number(item.precioProducto).toFixed(2)}`,
      margenIzquierdo,
      y
    );
  });

  // Total
  y += 14;
  doc.setFontSize(12);

  doc.text("TOTAL", margenIzquierdo, y);
  doc.line(
    margenIzquierdo + 20,
    y + 2,
    margenDerecho,
    y + 2
  );

  doc.text(
    `$${Number(pedido.total).toFixed(2)}`,
    margenDerecho,
    y,
    { align: "right" }
  );

  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0);
  doc.text(
    "Alumno: Jimmy Acosta",
    margenIzquierdo,
    doc.internal.pageSize.getHeight() - 10
  );

  // Guardar PDF
  doc.save(`TECH SHOP-pedido-${pedido.id}.pdf`);
}





const botonDeDescarga = document.getElementById("descargarTicket");

botonDeDescarga.addEventListener("click", async (e) => {
  e.preventDefault();

  const pedido = obtenerPedidoDesdeLocalStorage();

  botonDeDescarga.disabled = true;
  botonDeDescarga.textContent = "Descargando...";

  await exportarPedidoPDF(pedido);

  botonDeDescarga.disabled = false;
  botonDeDescarga.textContent = "Descargar Ticket";
});






document.getElementById("reiniciar").addEventListener("click", reiniciarSistema);

mostrarTicket();