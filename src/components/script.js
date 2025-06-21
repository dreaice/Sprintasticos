document.addEventListener("DOMContentLoaded", () => {
  // Cargar navbar
  fetch("/src/components/navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
    });

  // Cargar footer
  fetch("/src/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-container").innerHTML = html;
    });
});
