$(document).ready(function () {
  $("#segundo").css("background-color", "#ff0000");
  $(".primero").css("background-color", "#c1ff72");

  $("#btn-hide").click(function (e) {
    e.preventDefault();
    $("#segundo").hide();
  });

  $("#btn-show").click(function (e) {
    e.preventDefault();
    $("#segundo").show();
  });
});
