document.addEventListener("DOMContentLoaded", () => {
    // Cargar navbar con ruta relativa desde ourCreations/
    fetch("../../components/navbar.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("navbar-container").innerHTML = html;
        })
        .catch(error => {
            console.error('Error cargando navbar:', error);
        });

    // Cargar footer con ruta relativa desde ourCreations/
    fetch("../../components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(error => {
            console.error('Error cargando footer:', error);
        });
});
