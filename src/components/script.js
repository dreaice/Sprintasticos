document.addEventListener("DOMContentLoaded", () => { 
  // Esta línea espera a que el DOM esté completamente cargado (todo el HTML esté disponible en el navegador), antes de ejecutar el código dentro.
  fetch("/src/components/navbar.html") 
  //Realiza una petición HTTP GET al archivo local
    .then(res => res.text()) 
    // Convierte la respuesta (que es un objeto Response) en texto plano (el HTML).
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
    }); 
    // Inserta ese HTML como contenido dentro del <div id="navbar-container">...</div> de la página actual


  // Cargar footer
  fetch("/src/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-container").innerHTML = html;
    });
});
