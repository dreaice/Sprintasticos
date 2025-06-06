document.getElementById('formularioRegistro').addEventListener('submit', function (event) {
    event.preventDefault();

    // Crear objeto con los datos del formulario
    const datosFormulario = {
        nombres: document.getElementById('nombres').value,
        apellidoPaterno: document.getElementById('apellidoPaterno').value,
        apellidoMaterno: document.getElementById('apellidoMaterno').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        genero: document.querySelector('input[name="genero"]:checked')?.value || '',
        direccion: document.getElementById('direccion').value,
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value,
        confirmarContrasena: document.getElementById('confirmarContrasena').value
    };

    // Esto lo quitaremos jeje, solo queria ver que se manden antes de crear el objeto 
    console.log('Datos del formulario:', datosFormulario);
    console.log('Datos en formato JSON:', JSON.stringify(datosFormulario, null, 2));

    // Verificamos que ambas contraseñas coincidan
    if (datosFormulario.contrasena !== datosFormulario.confirmarContrasena) {
        console.error('Error: Las contraseñas no coinciden');
        alert('Las contraseñas no coinciden');
        return;
    }

});
