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

'use strict';

(function () {
  var phoneInput = document.querySelector('#feedback-phone');
  var maskStart = '+7(';
  var fullMaskReg = /^[+]\d[(]\d{3}[)]\d{7}$/;
  var startMaskReg = /^[+][7][(]\d{3}$/;
  var numberReg = /\d/;
  var backspace = 'Backspace';

  var addPhoneMask = function (input) {
    input.addEventListener('focus', function () {
      input.value = maskStart;
    });

    input.addEventListener('keydown', function (evt) {
      var isBackspace = evt.key === backspace;
      var isMaskStartReached = input.value === maskStart && isBackspace;
      var isFull = fullMaskReg.test(input.value) && !isBackspace;
      var isNotANumber = !numberReg.test(evt.key) && !isBackspace;

      if (isMaskStartReached || isFull || isNotANumber) {
        evt.preventDefault();
      }

      if (startMaskReg.test(input.value) && evt.key !== backspace) {
        input.value = input.value + ')';
      }
    });
  };

  if (phoneInput) {
    addPhoneMask(phoneInput);
  }

})();

'use strict';

(function () {
  var scrollDownButton = document.querySelector('.main-banner__scroll-down-button');
  var advantagesBlock = document.querySelector('#advantages');
  var consultButton = document.querySelector('.main-banner__consult-button');
  var consultForm = document.querySelector('#feedback');


  var smothScroll = function (trigger, elementScrollTo) {
    trigger.addEventListener('click', function (evt) {
      evt.preventDefault();
      elementScrollTo.scrollIntoView({behavior: 'smooth'});
    });
  };

  if (scrollDownButton && advantagesBlock) {
    smothScroll(scrollDownButton, advantagesBlock);
  }

  if (consultButton && consultForm) {
    smothScroll(consultButton, consultForm);
  }
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
