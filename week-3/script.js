$(document).ready(function () {

  requestAnimationFrame(function () {
    $("#card").addClass("is-in");
  });

  $("#qr").on("click", function () {
    $("#show").addClass("is-open").fadeIn(200);
  });

  $("#hide").on("click", function () {
    $("#show").fadeOut(150, function () {
      $(this).removeClass("is-open");
    });
  });
});