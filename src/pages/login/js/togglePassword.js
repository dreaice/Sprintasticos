function activarTogglePassword() {
    const icono = document.getElementById("verContrasena");
    const campo = document.getElementById("contrasena");

    if (icono && campo) {
        icono.addEventListener("click", () => {
            const esPassword = campo.type === "password";
            campo.type = esPassword ? "text" : "password";

            icono.classList.toggle("bi-eye-slash");
            icono.classList.toggle("bi-eye");
        });
    }
}

export {activarTogglePassword};