function crearSlider(id, start, range, step = 1, inputMinId = null, inputMaxId = null) {
  const slider = document.getElementById(id);
  if (!slider) return;

  noUiSlider.create(slider, {
    start: start,
    connect: true,
    step: step,
    range: range
  });

  // Si se pasaron inputs, sincronizarlos
  if (inputMinId && inputMaxId) {
    const inputMin = document.getElementById(inputMinId);
    const inputMax = document.getElementById(inputMaxId);

    // Actualizar inputs al mover slider
    slider.noUiSlider.on('update', (values) => {
      inputMin.value = parseFloat(values[0]).toFixed(1);
      inputMax.value = parseFloat(values[1]).toFixed(1);
    });

    // Actualizar slider si se cambia el input manualmente
    inputMin.addEventListener('change', () => {
      slider.noUiSlider.set([inputMin.value, null]);
    });

    inputMax.addEventListener('change', () => {
      slider.noUiSlider.set([null, inputMax.value]);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  crearSlider("quilates-slider", [1, 3], { min: 0, max: 10 }, 0.1, "min-quilates", "max-quilates");
  crearSlider("corte-slider", [1, 3], { min: 0, max: 4 }, 1);
  crearSlider("color-slider", [1, 5], { min: 1, max: 7 }, 1);
  crearSlider("claridad-slider", [1, 5], { min: 1, max: 7 }, 1);
  crearSlider("fluorescencia-slider", [1, 3], { min: 0, max: 4 }, 1);
  crearSlider("pureza-slider", [1, 3], { min: 0, max: 3 }, 1);
  crearSlider("intensidad-slider", [1, 5], { min: 0, max: 5 }, 1);
});


const imagenesForma = document.querySelectorAll(".forma-img");
const formasSeleccionadas = new Set();

imagenesForma.forEach(img => {
  img.addEventListener("click", () => {
    const forma = img.dataset.forma;

    // Alternar selección visual
    img.classList.toggle("seleccionada");

    // Agregar o quitar del Set
    if (formasSeleccionadas.has(forma)) {
      formasSeleccionadas.delete(forma);
    } else {
      formasSeleccionadas.add(forma);
    }

    console.log("Formas seleccionadas:", Array.from(formasSeleccionadas));
  });
});


function obtenerDatosFormulario() {
  // Formas seleccionadas
  const formasSeleccionadas = Array.from(document.querySelectorAll('.forma-activa'))
    .map(figura => figura.dataset.valor);

  // Función para leer sliders noUiSlider
  const leerSlider = (id) => {
    const slider = document.getElementById(id)?.noUiSlider;
    return slider ? parseFloat(slider.get()[0]) : null;
  };

  // Quilates
  const minQuilates = parseFloat(document.getElementById('min-quilates').value) || 0;
  const maxQuilates = parseFloat(document.getElementById('max-quilates').value) || 0;

  // Construcción del objeto
  const datosFormulario = {
    formas: formasSeleccionadas,
    pureza: leerSlider('pureza-slider'),
    quilates: {
      min: minQuilates,
      max: maxQuilates
    },
    intensidad: leerSlider('intensidad-slider'),
    corte: leerSlider('corte-slider'),
    color: leerSlider('color-slider'),
    claridad: leerSlider('claridad-slider'),
    fluorescencia: leerSlider('fluorescencia-slider')
  };

  return datosFormulario;
}


document.querySelector('.boton-cotizar').addEventListener('click', () => {
  const datos = obtenerDatosFormulario();
  console.log("Datos del formulario:", datos);
  // Aquí se guarda en el local storage

  localStorage.setItem('datosCotizacion', JSON.stringify(datos));
});
