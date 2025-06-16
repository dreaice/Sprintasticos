const pulsera = document.getElementById('pulsera');
const btnDerecha = document.getElementById('btn-derecha');
const btnIzquierda = document.getElementById('btn-izquierda');

let offset = 0;
const paso = 120;
const maxDesplazamiento = pulsera.scrollWidth - 600;

btnDerecha?.addEventListener('click', () => {
  offset = (offset + paso > maxDesplazamiento) ? 0 : offset + paso;
  pulsera.style.transform = `translateX(-${offset}px)`;
});

btnIzquierda?.addEventListener('click', () => {
  offset = (offset - paso < 0) ? maxDesplazamiento : offset - paso;
  pulsera.style.transform = `translateX(-${offset}px)`;
});
 /*
// Lógica para redirigir al detalle con parámetro
document.querySelectorAll('.producto').forEach(producto => {
  const boton = producto.querySelector('.btn-conoce-mas');
  const imagen = producto.querySelector('img');
   const nombreArchivo = producto.dataset.variante;

  boton.addEventListener('click', () => {
    
    console.log("Variante recibida:", nombreArchivo); // 🔍
    window.location.href = `../producto/producto.html?variante=${encodeURIComponent(nombreArchivo)}`;
  });
});
*/
// Lógica para redirigir al detalle con parámetro (este código va en catalogo.js)
document.querySelectorAll('.producto').forEach(producto => {
  const boton = producto.querySelector('.btn-conoce-mas');
  const nombreArchivo = producto.dataset.variante;

  boton.addEventListener('click', () => {
    console.log("Variante recibida:", nombreArchivo);
    if (nombreArchivo) {
      window.location.href = `../producto/producto.html?variante=${encodeURIComponent(nombreArchivo)}`;
    } else {
      alert("Este producto no tiene variante definida.");
    }
  });
});
// Lógica para el filtro
const btnAbrir = document.getElementById('btnAbrirFiltro');
const btnCerrar = document.getElementById('btnCerrarFiltro');
const panel = document.getElementById('filtroPanel');

btnAbrir.addEventListener('click', () => {
  panel.classList.add('activo');
  panel.setAttribute('aria-hidden', 'false');
});

btnCerrar.addEventListener('click', () => {
  panel.classList.remove('activo');
  panel.setAttribute('aria-hidden', 'true');
});