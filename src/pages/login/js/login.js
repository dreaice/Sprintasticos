import { activarTogglePassword } from './togglePassword.js';



document.addEventListener("DOMContentLoaded", () => {
  activarTogglePassword();
});


// Validacipón de usuarios


document.getElementById("formularioLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();


    // Validación de campos vacíos NO FUNCIONA
    
  if (!usuario || !contrasena) {
    mostrarAlerta('Todos los campos son obligatorios', 'danger');
    return;
  } 
  validacion(usuario, contrasena);
  
});

function validacion(userIngresado, contrasenaIngresada){
  const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuariosAlmacenados.find(u => u.email === userIngresado);
  // const contrasenaCodificada = btoa(contrasenaIngresada);


  if(usuarioEncontrado && usuarioEncontrado.contrasena === contrasenaIngresada){
    mostrarAlerta('¡Bienvenido!');
    setTimeout(() => {
      localStorage.setItem("usuario Ingresado", usuarioEncontrado.nombre);
      window.location.href = "../../../../index.html";
    }, 1000);   
  } else {
    mostrarAlerta('Usuario o contraseña incorrectos');
  }
}


function mostrarAlerta(mensaje, tipo = 'danger') {
  const alertaHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show mt-3" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  document.getElementById('alertContainer').innerHTML = alertaHTML;
}
