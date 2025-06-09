document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombreCompleto').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
  
    // Validación de campos vacíos
    if (!nombre || !telefono || !email || !contrasena || !confirmarContrasena) {
      mostrarAlerta('Todos los campos son obligatorios', 'danger');
      return;
    }
  
    // Validación de email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      mostrarAlerta('El correo electrónico no es válido', 'danger');
      return;
    }
  
    // Validación de teléfono (10 dígitos)
    const telefonoValido = /^[0-9]{10}$/.test(telefono);
    if (!telefonoValido) {
      mostrarAlerta('El número de teléfono debe tener 10 dígitos', 'danger');
      return;
    }
  
    // Validación de contraseñas
    if (contrasena !== confirmarContrasena) {
      mostrarAlerta('Las contraseñas no coinciden', 'danger');
      return;
    }
  
    // Si todo está bien, crear el JSON del usuario
    const usuario = {
      nombre,
      telefono,
      email,
      contrasena
    };
  
    console.log('Usuario JSON:', JSON.stringify(usuario, null, 2));
    mostrarAlerta('¡Registro exitoso!', 'success');
  });
  
  function mostrarAlerta(mensaje, tipo = 'danger') {
    const alertaHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show mt-3" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
    document.getElementById('alertContainer').innerHTML = alertaHTML;
  }

  // Función para resetear el formulario
  function limpiarFormulario() {
    document.getElementById("formularioRegistro").reset();
  }
  