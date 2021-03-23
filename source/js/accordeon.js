'use strict';

(function () {
  var controllers = document.querySelectorAll('.accordeon');
  var mobileWidth = window.matchMedia('(max-width: 768px)');

  if (controllers.length > 0) {
    controllers.forEach(function (controller) {
      controller.classList.remove('accordeon--no-js');
      controller.classList.add('accordeon--closed');

      controller.addEventListener('click', function () {
        if (mobileWidth.matches) {
          controller.classList.toggle('accordeon--open');
        }
      });
    });

    mobileWidth.addEventListener('change', function () {
      if (!mobileWidth.matches) {
        controllers.forEach(function (controller) {
          controller.classList.remove('accordeon--open');
        });
      }
    });
  }

})();
