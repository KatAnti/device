
'use strict';

(function () {
  var controllers = document.querySelectorAll('.accordeon');
  var mobileWidth = window.matchMedia('(max-width: 768px)');

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

})();

'use strict';

(function () {
  var textElement = document.querySelector('.about-company p:last-of-type');
  var originalText = textElement.innerText;
  var mobileWidth = window.matchMedia('(max-width: 1024px)');
  var lettersCount = 200;

  var replaceString = function () {
    if (mobileWidth.matches) {
      textElement.innerText = originalText.slice(0, lettersCount) + '..';
    } else {
      textElement.innerText = originalText;
    }
  };

  replaceString();

  mobileWidth.addEventListener('change', function () {
    replaceString();
  });
})();
