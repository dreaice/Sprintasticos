const formulario = document.querySelector('#formulario-cita');
const nombreClienteInput = document.querySelector('#nombreCliente');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const detallesInput = document.querySelector('#detalles');
const alertaContainer = document.querySelector('#alerta-container');

let citas = [];
let editando = false;
let citaEditandoId = null;

formulario.addEventListener('submit', e => {
  e.preventDefault();

  limpiarValidaciones();
  limpiarAlerta();

  const cliente = nombreClienteInput.value.trim();
  const email = emailInput.value.trim();
  const fecha = fechaInput.value;
  const detalles = detallesInput.value.trim();

  if ([cliente, email, fecha, detalles].includes('')) {
    mostrarAlertaBootstrap('Por favor, rellena todos los campos obligatorios', 'danger');
    marcarInvalidos({ cliente, email, fecha, detalles });
    return;
  }

  const nuevaCita = {
    id: editando ? citaEditandoId : generarId(),
    cliente,
    email,
    fecha,
    detalles
  };

  if (editando) {
    citas = citas.map(cita => (cita.id === citaEditandoId ? nuevaCita : cita));
    mostrarAlertaBootstrap('Cita editada correctamente', 'success');
  } else {
    citas.push(nuevaCita);
    mostrarAlertaBootstrap('Cita agregada correctamente', 'success');
  }

  guardarJSON();

  formulario.reset();
  editando = false;
  citaEditandoId = null;
});

function mostrarAlertaBootstrap(mensaje, tipo) {
  limpiarAlerta();

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} mt-3`;
  alerta.textContent = mensaje;

  alertaContainer.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 4000);
}

function limpiarAlerta() {
  alertaContainer.innerHTML = '';
}

function marcarInvalidos(campos) {
  if (!campos.cliente) nombreClienteInput.classList.add('is-invalid');
  if (!campos.email) emailInput.classList.add('is-invalid');
  if (!campos.fecha) fechaInput.classList.add('is-invalid');
  if (!campos.detalles) detallesInput.classList.add('is-invalid');
}

function limpiarValidaciones() {
  [nombreClienteInput, emailInput, fechaInput, detallesInput].forEach(input => {
    input.classList.remove('is-invalid');
  });
}

function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function guardarJSON() {
  const blob = new Blob([JSON.stringify(citas, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'citas.json';
  enlace.click();

  URL.revokeObjectURL(url);
}
