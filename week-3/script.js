$(document).ready(function () {
  // one orchestrated entrance: card rises, sprig blooms
  requestAnimationFrame(function () {
    $("#card").addClass("is-in");
  });

  $("#card").on("mouseenter", function () {
    $(this).css({
      "background-color": "#1e3a2c",
      color: "#f4efe1",
    });
  });

  $("#card").on("mouseleave", function () {
    $(this).css({
      "background-color": "#f4efe1",
      color: "#3a2a1c",
    });
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