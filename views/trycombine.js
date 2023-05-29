$(document).ready(function () {
  $('.dropdown > a').click(function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('open');
  });
});


function changeImage() {
  var image = document.getElementById('myImage');
  if (image.src.match("img/LOGO.jpg")) {
    image.src = "img/LOOO.png";
  } else {
    image.src = "img/LOGO.jpg";
  }
}
