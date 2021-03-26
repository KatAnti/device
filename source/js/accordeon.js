'use strict';

(function () {
  var controllers = document.querySelectorAll('.accordeon');
  var mobileWidth = window.matchMedia('(max-width: 768px)');

  var closeAllTabs = function () {
    controllers.forEach(function (controller) {
      if (controller.classList.contains('accordeon--open')) {
        controller.classList.remove('accordeon--open');
      }
    });
  };

  if (controllers.length > 0) {
    controllers.forEach(function (controller) {
      controller.classList.remove('accordeon--no-js');
      controller.classList.add('accordeon--closed');

      controller.addEventListener('click', function () {
        if (mobileWidth.matches) {

          if (controller.classList.contains('accordeon--open')) {
            controller.classList.remove('accordeon--open');
            return;
          }

          closeAllTabs();
          controller.classList.add('accordeon--open');
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
