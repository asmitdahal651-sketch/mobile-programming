$(document).ready(function () {

    // GET & SET
    $("#show-name").click(function () {
        $("#output").text($("#student-name").text());
    });
    $("#change-name").click(function () {
        $("#student-name").text("Aarav Sharma");
    });
    $("#show-bio").click(function () {
        let bio = $("#student-bio").html();
        $("#output").text(bio); // GET html, display with .text() so tags show as text
    });
    $("#get-input").click(function () {
        $("#output").text($("#nickname-input").val());
    });
    $("#set-input").click(function () {
        $("#nickname-input").val("jQuery Pro");
    });

    // CSS CLASSES
    $("#highlight-card").click(function () {
        $("#profile-card").addClass("highlighted");
    });
    $("#highlight-remove").click(function () {
        $("#profile-card").removeClass("highlighted");
    });
    $("#dark-mode").click(function () {
        $("#profile-card").toggleClass("dark-mode");
    });
    $("#toggle-rounded").click(function () {
        $("#profile-photo").toggleClass("rounded");
    });

    // CSS METHOD
    $("#red-bg").click(function () {
        $("#profile-card").css("background-color", "#e74c3c");
    });
    $("#reset-bg").click(function () {
        $("#profile-card").css("background-color", "white");
    });

    // HIDE & SHOW
    $("#hide-photo").click(function () {
        $("#profile-photo").hide("slow");
    });
    $("#show-photo").click(function () {
        $("#profile-photo").show("slow");
    });
    $("#toggle-bio").click(function () {
        $("#student-bio").toggle();
    });

    // FADE
    $("#fade-out").click(function () {
        $("#profile-card").fadeOut();
    });
    $("#fade-in").click(function () {
        $("#profile-card").fadeIn();
    });
    $("#fade-half").click(function () {
        $("#profile-card").fadeTo("slow", 0.5);
    });

    // SLIDE
    $("#slide-up").click(function () {
        $("#skills-list").slideUp();
    });
    $("#slide-down").click(function () {
        $("#skills-list").slideDown();
    });
    $("#slide-toggle").click(function () {
        $("#skills-list").slideToggle();
    });

    // ANIMATE (chained)
    $("#animate-card").click(function () {
        $("#profile-card")
            .animate({ marginLeft: "200px" }, 1000)
            .animate({ marginLeft: "0px" }, 1000);
    });

    // EVENTS
    $("#profile-photo").on("mouseenter", function () {
        $(this).addClass("shadow");
    });
    $("#profile-photo").on("mouseleave", function () {
        $(this).removeClass("shadow");
    });
    $("#nickname-input").on("keydown", function (e) {
        $("#output").text("Key pressed: " + e.key);
    });

});