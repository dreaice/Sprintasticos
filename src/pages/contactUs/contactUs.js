// contactUs.js
  (function(){
    emailjs.init('fG-6ooz1ElVeKdtLZ');
  })();


// Inicializa EmailJS
emailjs.init("fG-6ooz1ElVeKdtLZ");
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Obtener valores desde los inputs por name
      const nombre = form.elements["nombre"].value.trim();
      const email = form.elements["email"].value.trim();
      const telefono = form.elements["telefono"].value.trim();
      const mensaje = form.elements["mensaje"].value.trim();
  
      // Validaciones
      if (!nombre || !email || !telefono || !mensaje) {
        alert("Por favor completa todos los campos.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("El correo ingresado no es válido.");
        return;
      }
  
      if (!/^\d{10}$/.test(telefono)) {
        alert("El teléfono debe contener solo 10 dígitos.");
        return;
      }
  
      // Enviar el formulario usando EmailJS
      emailjs.send("service_0awb7xp", "template_yofxzpo", {
        name: nombre,
        email: email,
        message: `Teléfono: ${telefono}\n\n${mensaje}`,
        title: "Nuevo mensaje de contacto",
        time: new Date().toLocaleString()
      })
      .then((response) => {
        console.log("Email enviado:", response)
        alert("¡Mensaje enviado con éxito!");
        form.reset();
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        alert("Hubo un error al enviar el mensaje. Inténtalo más tarde.");
      });
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
  