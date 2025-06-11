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
 
// Lógica para redirigir al detalle con parámetro
document.querySelectorAll('.producto').forEach(producto => {
  const boton = producto.querySelector('.btn-conoce-mas');
  const imagen = producto.querySelector('img');
  const nombreArchivo = imagen.src.split('/').pop().split('.')[0];

  boton.addEventListener('click', () => {
    window.location.href = `detalles.html?variante=${encodeURIComponent(nombreArchivo)}`;
  });
});