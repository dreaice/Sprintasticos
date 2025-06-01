function crearSlider(id, start, range, step = 1, inputMinId = null, inputMaxId = null) {
  const slider = document.getElementById(id);
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
