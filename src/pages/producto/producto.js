/*
// Lógica para redirigir al detalle con parámetro
document.querySelectorAll('.producto').forEach(producto => {
  const boton = producto.querySelector('.btn-conoce-mas');
  const imagen = producto.querySelector('img');
  const nombreArchivo = imagen.src.split('/').pop().split('.')[0];

  boton.addEventListener('click', () => {
    window.location.href = detalles.html?variante=${encodeURIComponent(nombreArchivo)};
  });
});
*/
// Mostrar producto en detalles.html
const params = new URLSearchParams(window.location.search);
const variante = params.get('variante')?.toLowerCase();

const productos = {
  amatista: {
    nombre: "AMATISTA",
    imagenPrincipal: "../catalogo/img/amatista.png",
    vistasPrevias: ["../catalogo/img/amatista.png", "../catalogo/img/amatista.png", "../catalogo/img/amatista.png"],
    precio: "$2900",
    disponibilidad: "En stock",
    id: "001",
    ot: "002"
  }
    
};

if (productos[variante]) {
  const p = productos[variante];
  document.getElementById("imagenPrincipal").src = p.imagenPrincipal || "img/default.png";
  document.getElementById("nombre-producto").textContent = p.nombre;
  document.getElementById("id-producto").textContent = "ID " + p.id;
  document.getElementById("ot-producto").textContent = "OT " + p.ot;
  document.getElementById("precio-producto").textContent = p.precio;
  document.getElementById("disponibilidad-producto").textContent = p.disponibilidad;

  document.querySelectorAll(".vistaprevia img").forEach((img, index) => {
    img.src = p.vistasPrevias[index] || "img/default.png";
  });
} else if (window.location.pathname.includes("../producto/producto.html")) {
  alert("Producto no encontrado");
}