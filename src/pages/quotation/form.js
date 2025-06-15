

(() => {
  function crearSlider(id, start, range, step = 1, inputMinId = null, inputMaxId = null, decimals = 1) {
    const slider = document.getElementById(id);
    if (!slider) return;

    noUiSlider.create(slider, {
      start: start,
      connect: true,
      step: step,
      range: range,
      format: {
        to: function (value) {
          return value.toFixed(decimals);
        },
        from: function (value) {
          return Number(value);
        }
      }
    });

    if (inputMinId && inputMaxId) {
      const inputMin = document.getElementById(inputMinId);
      const inputMax = document.getElementById(inputMaxId);

      slider.noUiSlider.on('update', (values) => {
        inputMin.value = parseFloat(values[0]).toFixed(decimals);
        inputMax.value = parseFloat(values[1]).toFixed(decimals);
      });

      inputMin.addEventListener('change', () => {
        let minVal = parseFloat(inputMin.value);
        let maxVal = parseFloat(inputMax.value);
      
        if (isNaN(minVal)) minVal = range.min;
        if (isNaN(maxVal)) maxVal = range.max;
      
        if (minVal > maxVal) {
          minVal = maxVal;
          inputMin.value = minVal.toFixed(decimals);
        }
      
        minVal = Math.max(range.min, Math.min(minVal, range.max));
        slider.noUiSlider.set([minVal, null]);
      });
      
      inputMax.addEventListener('change', () => {
        let minVal = parseFloat(inputMin.value);
        let maxVal = parseFloat(inputMax.value);
      
        if (isNaN(minVal)) minVal = range.min;
        if (isNaN(maxVal)) maxVal = range.max;
      
        if (maxVal < minVal) {
          maxVal = minVal;
          inputMax.value = maxVal.toFixed(decimals);
        }
      
        maxVal = Math.max(range.min, Math.min(maxVal, range.max));
        slider.noUiSlider.set([null, maxVal]);
      });
      
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Quilates con 2 decimales
    crearSlider("quilates-slider", [1, 3], { min: 1, max: 10 }, 0.01, "min-quilates", "max-quilates", 2);

    // Otros sliders con 1 decimal (entero)
    crearSlider("corte-slider", [1, 3], { min: 0, max: 4 }, 1, null, null, 0);
    crearSlider("color-slider", [1, 5], { min: 1, max: 7 }, 1, null, null, 0);
    crearSlider("claridad-slider", [1, 5], { min: 1, max: 7 }, 1, null, null, 0);
    crearSlider("fluorescencia-slider", [1, 3], { min: 0, max: 4 }, 1, null, null, 0);
    crearSlider("pureza-slider", [1, 3], { min: 0, max: 3 }, 1, null, null, 0);
    crearSlider("intensidad-slider", [1, 5], { min: 0, max: 5 }, 1, null, null, 0);
  });

  // Forma: toggle para cambiar clase y color ya está bien
  const imagenesForma = document.querySelectorAll(".forma-img");

  imagenesForma.forEach(img => {
    img.addEventListener("click", () => {
      img.classList.toggle("forma-activa");
      console.log("Formas seleccionadas:", obtenerFormasSeleccionadas());
    });
  });

  function obtenerFormasSeleccionadas() {
    return Array.from(document.querySelectorAll('.forma-activa'))
      .map(figura => figura.dataset.valor);
  }

  function obtenerDatosFormulario() {
    const minQuilates = document.getElementById('min-quilates')?.value || '';
    const maxQuilates = document.getElementById('max-quilates')?.value || '';
    const formas = obtenerFormasSeleccionadas();
  
    return {
      quilates: `${minQuilates} - ${maxQuilates}`,
      formas: formas,
      // Puedes agregar más datos si lo necesitas
    };
  }
  
  function obtenerDatosFormulario() {
    const minQuilates = document.getElementById('min-quilates')?.value || '';
    const maxQuilates = document.getElementById('max-quilates')?.value || '';
    const formas = obtenerFormasSeleccionadas();
  
    return {
      quilates: `${minQuilates} - ${maxQuilates}`,
      formas: formas,
      // Puedes agregar más datos si lo necesitas
    };
  }    

  document.querySelector('.boton-cotizar')?.addEventListener('click', () => {
    const datos = obtenerDatosFormulario();
    console.log("Datos del formulario:", datos);
    localStorage.setItem('datosCotizacion', JSON.stringify(datos));
  
    // Actualiza el contenido dentro del modal si quieres (ejemplo, el precio estimado)
    const precioElemento = document.querySelector('#cotizarModal .modal-body .fs-4');
    if (precioElemento) {
      // Aquí puedes calcular o asignar el precio real
      precioElemento.textContent = `$${calcularPrecio(datos)} MXN`;
    }
  
    // Muestra el modal Bootstrap
    const modalElement = document.getElementById('cotizarModal');
    const modalBootstrap = new bootstrap.Modal(modalElement);
    modalBootstrap.show();
  });
  
  // Función ejemplo para calcular precio (puedes adaptarla)
  function calcularPrecio(datos) {
    // Aquí va la lógica real para calcular el precio
    return 250000;
  }
  
})();
