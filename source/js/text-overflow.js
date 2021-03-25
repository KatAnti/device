'use strict';

(function () {
  var LETTERS_COUNT = 200;

  var textElement = document.querySelector('.about-company p:last-of-type');
  var mobileWidth = window.matchMedia('(max-width: 1024px)');

  if (textElement) {
    var originalText = textElement.innerText;
    var replaceString = function () {
      if (mobileWidth.matches) {
        textElement.innerText = originalText.slice(0, LETTERS_COUNT) + '..';
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
