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
  // 1. Capturar formas seleccionadas
  const formasSeleccionadas = [];
  document.querySelectorAll('.forma-activa').forEach(figura => {
    formasSeleccionadas.push(figura.dataset.valor);
  });

  // 2. Capturar pureza desde el slider
  const purezaSlider = document.getElementById('pureza-slider').noUiSlider;
  const pureza = parseFloat(purezaSlider.get()[0]); // o un rango si es doble

  // 3. Capturar quilates mínimo y máximo
  const minQuilates = parseFloat(document.getElementById('min-quilates').value);
  const maxQuilates = parseFloat(document.getElementById('max-quilates').value);

  // 4. Capturar intensidad desde el slider
  const intensidadSlider = document.getElementById('intensidad-slider').noUiSlider;
  const intensidad = parseFloat(intensidadSlider.get()[0]);

  // 5. Construir el objeto final
  const datosFormulario = {
    formas: formasSeleccionadas,
    pureza: pureza,
    quilates: {
      min: minQuilates,
      max: maxQuilates
    },
    intensidad: intensidad
  };

  return datosFormulario;
}

document.querySelector('.boton-cotizar').addEventListener('click', () => {
  const datos = obtenerDatosFormulario();
  console.log("Datos del formulario:", datos);
  // Aquí puedes enviarlo al backend con fetch()
});
