'use strict';

(function () {
  var textElement = document.querySelector('.about-company p:last-of-type');
  var originalText = textElement.innerText;
  var mobileWidth = window.matchMedia('(max-width: 1024px)');
  var lettersCount = 200;

  if (textElement) {
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
  }

})();
