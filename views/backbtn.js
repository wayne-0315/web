window.addEventListener('scroll', function() {
    var backToTopButton = document.querySelector('.back-to-top');
    backToTopButton.style.transform = 'translateY(' + window.pageYOffset + 'px)';
  });

  document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo(0, 0);
  });