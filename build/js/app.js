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
  var pageBody = document.querySelector('.body');
  var callbackPopup = pageBody.querySelector('.callback-popup');
  var nameInput = callbackPopup.querySelector('#callback-name');
  var phoneInput = callbackPopup.querySelector('#callback-phone');
  var commentInput = callbackPopup.querySelector('textarea');
  var closeButton = callbackPopup.querySelector('.callback-popup__close-button');
  var callbackPopupBtn = pageBody.querySelector('.header__callback-button');
  var overlay = pageBody.querySelector('.overlay');

  var storageName = localStorage.getItem('name');
  var storageEmail = localStorage.getItem('email');

  var esc = 'Escape';

  var onEscKeypress = function (evt) {
    if (evt.key === esc) {
      closePopup();
    }
  };

  var closePopup = function () {
    if (storageName && storageEmail) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('email', phoneInput.value);
    }

    callbackPopup.classList.remove('callback-popup--show');
    overlay.classList.remove('overlay--show');
    pageBody.classList.remove('body--overflow');

    document.removeEventListener('keydown', onEscKeypress);
  };

  var openPopup = function () {
    callbackPopup.classList.add('callback-popup--show');
    overlay.classList.add('overlay--show');
    pageBody.classList.add('body--overflow');

    if (storageName && storageEmail) {
      nameInput.value = storageName;
      phoneInput.value = phoneInput;
      commentInput.focus();
    } else {
      nameInput.focus();
    }

    document.addEventListener('keydown', onEscKeypress);
  };

  if (callbackPopup && closeButton && overlay) {
    callbackPopupBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup();
    });

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });

    overlay.addEventListener('click', function () {
      closePopup();
    });
  }
})();

'use strict';

(function () {
  var phoneFeedbackInput = document.querySelector('#feedback-phone');
  var phoneCallbackInput = document.querySelector('#callback-phone');
  var maskStart = '+7(';
  var fullMaskReg = /^[+]\d[(]\d{3}[)]\d{7}$/;
  var beforeBracketMaskReg = /^[+][7][(]\d{3}$/;
  var startMaskReg = /^[+][7][(]/;
  var numberReg = /\d/;
  var backspace = 'Backspace';

  var addPhoneMask = function (input) {
    input.addEventListener('focus', function () {
      if (input.value === '') {
        input.value = maskStart;
      }
    });

    input.addEventListener('blur', function () {
      if (input.value === maskStart) {
        input.value = '';
      }
    });

    input.addEventListener('keydown', function (evt) {
      var isBackspace = evt.key === backspace;
      var isMaskStartReached = input.value === maskStart && isBackspace;
      var isFull = fullMaskReg.test(input.value) && !isBackspace;
      var isNotANumber = !numberReg.test(evt.key) && !isBackspace;
      var isTypingBeforeString = !startMaskReg.test(input.value);

      if (isMaskStartReached || isFull || isNotANumber) {
        evt.preventDefault();
      }

      if (isTypingBeforeString) {
        input.value = maskStart + evt.key;
      }

      if (beforeBracketMaskReg.test(input.value) && evt.key !== backspace) {
        input.value = input.value + ')';
      }
    });
  };

  if (phoneFeedbackInput) {
    addPhoneMask(phoneFeedbackInput);
  }

  if (phoneCallbackInput) {
    addPhoneMask(phoneCallbackInput);
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
