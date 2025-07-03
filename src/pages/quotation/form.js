

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
    localStorage.setItem('datosCotizacion', JSON.stringify(datos));
  
    // Actualiza el contenido dentro del modal si quieres (ejemplo, el precio estimado)
    const precioElemento = document.getElementById('precioEstimado');
    if (precioElemento) {
    precioElemento.textContent = `$${calcularPrecio(datos)} MXN`;
  }
  
    // Muestra el modal Bootstrap
    const modalElement = document.getElementById('cotizarModal');
    const modalBootstrap = new bootstrap.Modal(modalElement);
    modalBootstrap.show();
  });
  
  
})();

function calcularPrecio(datos) {
  // Detectar tipo de formulario por la existencia de campos
  const esDiamante = !!document.getElementById('corte-slider'); // si existe el slider de corte, es diamante
  const minQuilates = parseFloat(document.getElementById('min-quilates')?.value || 1);
  const maxQuilates = parseFloat(document.getElementById('max-quilates')?.value || 1);
  const quilatesPromedio = (minQuilates + maxQuilates) / 2;

  let precio = 50000 * quilatesPromedio; // Precio base por quilate

  // Factor por formas (más de una seleccionada o una forma rara puede sumar costo)
  const formasSeleccionadas = document.querySelectorAll('.forma-activa').length;
  if (formasSeleccionadas > 0) {
    precio += formasSeleccionadas * 2000;
  }

  if (esDiamante) {
    // Corte
    const corte = parseInt(getSliderValue('corte-slider')); // 0 (excelente) a 4 (deficiente)
    precio *= (1.15 - corte * 0.03); // Mejor corte, más caro

    // Color
    const color = parseInt(getSliderValue('color-slider')); // 1 (D) a 7 (J)
    precio *= (1.10 - (color-1)*0.01); // Menos color, más caro

    // Claridad
    const claridad = parseInt(getSliderValue('claridad-slider')); // 1 (FL) a 7 (SI2)
    precio *= (1.12 - (claridad-1)*0.015); // Más limpio, más caro

    // Fluorescencia
    const fluor = parseInt(getSliderValue('fluorescencia-slider')); // 0 (Nada) a 4 (Muy fuerte)
    precio *= (1 - fluor*0.015); // Mucha fluorescencia, menos valor

    // Certificado
    if (document.getElementById('gia')?.checked) {
      precio += 5000; // Por certificado GIA
    }

  } else {
    // Es piedra preciosa
    // Pureza
    const pureza = parseInt(getSliderValue('pureza-slider')); // 0 a 3
    precio *= (1.15 - pureza*0.05); // Más puro, más caro

    // Intensidad
    const intensidad = parseInt(getSliderValue('intensidad-slider')); // 0 a 5
    precio *= (1 + intensidad*0.04); // Más intenso, más caro
  }

  // Redondea a múltiplo de 500
  precio = Math.round(precio / 500) * 500;

  // Nunca menos de $15,000 ni más de $500,000 para pruebas
  precio = Math.max(15000, Math.min(precio, 500000));

  return precio.toLocaleString('es-MX');
}

// Helper para obtener el valor actual de un slider noUiSlider
function getSliderValue(sliderId) {
  const el = document.getElementById(sliderId);
  if (el && el.noUiSlider) {
    // Si es rango, toma el promedio
    const v = el.noUiSlider.get();
    if (Array.isArray(v)) {
      return (parseFloat(v[0]) + parseFloat(v[1])) / 2;
    }
    return v;
  }
  return 1;
}
