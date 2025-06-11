
// Lógica para redirigir al detalle con parámetro
document.querySelectorAll('.producto').forEach(producto => {
  const boton = producto.querySelector('.btn-conoce-mas');
  const imagen = producto.querySelector('img');
 const nombreArchivo = producto.dataset.variante;

  boton.addEventListener('click', () => {
    console.log("Variante recibida:", nombreArchivo); // 🔍
window.location.href = `producto.html?variante=${encodeURIComponent(nombreArchivo)}`;
  });
});

// Mostrar producto en detalles.html
const params = new URLSearchParams(window.location.search);
let variante = params.get('variante')?.toLowerCase();

// Si no hay variante en la URL, usar amatista por defecto
if (!variante) {
  variante = 'amatista';
}

const productos = {
  amatista: {
    nombre: "Anillo abrazo amatistas",
    imagenPrincipal: "./img/anilloAmatista.jpeg",
    vistasPrevias: ["./img/anilloAmatista.jpeg", "./img/anilloAmatista.jpeg", "./img/anilloAmatista.jpeg"],
    precio: "$15,000.00 MXN",
    disponibilidad: "Disponible",
    id: "0014",
    ot: "0024"
  },
  morganita: {
    nombre: "Anillo abrazo turmalina",
    imagenPrincipal: "./img/anilloTurmalina.jpeg",
    vistasPrevias: ["./img/anilloTurmalina.jpeg", "./img/anilloTurmalina.jpeg", "./img/anilloTurmalina.jpeg"],
    precio: "$17,500.00 MXN",
    disponibilidad: "Disponible",
    id: "0024",
    ot: "0034"
  },
  zafiro: {
    nombre: "Anillo abrazo zafiro rosa",
    imagenPrincipal: "./img/anilloZafiro.jpeg",
    vistasPrevias: ["./img/anilloZafiro.jpeg", "./img/anilloZafiro.jpeg", "./img/anilloZafiro.jpeg"],
    precio: "$19,000.00 MXN",
    disponibilidad: "Disponible",
    id: "0034",
    ot: "0044"
  }
};

if (productos[variante]) {
  const p = productos[variante];
  document.getElementById("imagenPrincipal").src = p.imagenPrincipal || "../catalogo/img/amatista.png";
  document.getElementById("nombre-producto").textContent = p.nombre;
  document.getElementById("id-producto").textContent = "ID " + p.id;
  document.getElementById("ot-producto").textContent = "OT " + p.ot;
  document.getElementById("precio-producto").textContent = p.precio;
  document.getElementById("disponibilidad-producto").textContent = p.disponibilidad;

  document.querySelectorAll(".vistaprevia img").forEach((img, index) => {
    img.src = p.vistasPrevias[index] || "../catalogo/img/amatista.png";
  });

  // Marcar el botón correspondiente como activo
  document.querySelectorAll('.btn-piedra').forEach(b => b.classList.remove('activo'));
  const btnActivo = document.querySelector(`[data-variante="${variante}"]`);
  if (btnActivo) btnActivo.classList.add('activo');
} else {
  // Si no hay producto específico, usar amatista por defecto
  const p = productos['amatista'];
  document.getElementById("imagenPrincipal").src = p.imagenPrincipal || "../catalogo/img/amatista.png";
  document.getElementById("nombre-producto").textContent = p.nombre;
  document.getElementById("id-producto").textContent = "ID " + p.id;
  document.getElementById("ot-producto").textContent = "OT " + p.ot;
  document.getElementById("precio-producto").textContent = p.precio;
  document.getElementById("disponibilidad-producto").textContent = p.disponibilidad;

  document.querySelectorAll(".vistaprevia img").forEach((img, index) => {
    img.src = p.vistasPrevias[index] || "../catalogo/img/amatista.png";
  });

  // Marcar amatista como activa por defecto
  document.querySelector('[data-variante="amatista"]').classList.add('activo');
}

// Funcionalidad para cambiar entre piedras
document.querySelectorAll('.btn-piedra').forEach(btn => {
  btn.addEventListener('click', () => {
    const nuevaVariante = btn.getAttribute('data-variante');
    if (productos[nuevaVariante]) {
      variante = nuevaVariante;
      const p = productos[nuevaVariante];

      // Actualizar información del producto
      document.getElementById("imagenPrincipal").src = p.imagenPrincipal;
      document.getElementById("nombre-producto").textContent = p.nombre;
      document.getElementById("id-producto").textContent = "ID " + p.id;
      document.getElementById("ot-producto").textContent = "OT " + p.ot;
      document.getElementById("precio-producto").textContent = p.precio;
      document.getElementById("disponibilidad-producto").textContent = p.disponibilidad;

      document.querySelectorAll(".vistaprevia img").forEach((img, index) => {
        img.src = p.vistasPrevias[index] || p.imagenPrincipal;
      });

      // Actualizar botones de piedra (visual feedback)
      document.querySelectorAll('.btn-piedra').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      // Reagregar los event listeners para las vistas previas después de cambiar de variante
      agregarEventListenersVistasPrevia();
    }
  });
});

// Función para agregar event listeners a las vistas previas
function agregarEventListenersVistasPrevia() {
  document.querySelectorAll('.vistaprevia img').forEach((img, index) => {
    img.addEventListener('click', () => {
      // Cambiar la imagen principal por la imagen de vista previa clickeada
      const imagenPrincipal = document.getElementById('imagenPrincipal');
      imagenPrincipal.src = img.src;

      // Opcional: agregar clase activa para indicar cuál está seleccionada
      document.querySelectorAll('.vistaprevia').forEach(vista => vista.classList.remove('activa'));
      img.parentElement.classList.add('activa');
    });
  });
}

// Inicializar los event listeners para las vistas previas al cargar la página
agregarEventListenersVistasPrevia();

// Funcionalidad del carrito
let carritoAbierto = false;
let cantidadEnCarrito = 0;

// Elementos del DOM
const btnAgregarCarrito = document.querySelector('.btn-agrega-carrito');
const carritoLateral = document.getElementById('carritoLateral');
const cerrarCarrito = document.getElementById('cerrarCarrito');
const carritoItem = document.getElementById('carritoItem');
const btnSumarCarrito = document.getElementById('btnSumarCarrito');
const btnRestarCarrito = document.getElementById('btnRestarCarrito');
const cantidadNumero = document.getElementById('cantidadNumero');

// Abrir carrito al agregar producto
btnAgregarCarrito.addEventListener('click', () => {
  agregarAlCarrito();
});

// Cerrar carrito
cerrarCarrito.addEventListener('click', () => {
  carritoLateral.classList.remove('mostrar');
  carritoAbierto = false;
});

// Funciones del carrito
function agregarAlCarrito() {
  if (productos[variante]) {
    const p = productos[variante];

    // Mostrar el item en el carrito
    document.getElementById('carritoItemImg').src = p.imagenPrincipal;
    document.getElementById('carritoItemNombre').textContent = p.nombre;
    document.getElementById('carritoItemPrecio').textContent = p.precio;

    if (cantidadEnCarrito === 0) {
      cantidadEnCarrito = 1;
    } else {
      cantidadEnCarrito += 1;
    }

    cantidadNumero.textContent = cantidadEnCarrito;
    carritoItem.classList.add('mostrar');
    carritoLateral.classList.add('mostrar');
    carritoAbierto = true;
  }
}

// Sumar cantidad
btnSumarCarrito.addEventListener('click', () => {
  cantidadEnCarrito += 1;
  cantidadNumero.textContent = cantidadEnCarrito;
});

// Restar cantidad
btnRestarCarrito.addEventListener('click', () => {
  if (cantidadEnCarrito > 1) {
    cantidadEnCarrito -= 1;
    cantidadNumero.textContent = cantidadEnCarrito;
  } else {
    cantidadEnCarrito = 0;
    carritoItem.classList.remove('mostrar');
    carritoLateral.classList.remove('mostrar');
    carritoAbierto = false;
  }
});