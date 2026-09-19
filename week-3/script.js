$(document).ready(function () {
  requestAnimationFrame(function () {
    $("#card").addClass("is-in");
  });

  $("#qr").on("click", function () {
    $("#show").addClass("is-open").slideDown(260);
  });

  $("#hide").on("click", function () {
    $("#show").slideUp(200, function () {
      $(this).removeClass("is-open");
    });
  });
});