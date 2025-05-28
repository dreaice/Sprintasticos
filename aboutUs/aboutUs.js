$(document).ready(function() {
  $(".boton-enviar").click(function() {
    $(this).siblings(".card-text").toggleClass("text-ajustar");
  });
});

