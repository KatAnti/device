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

'use strict';

(function () {
  var ESCAPE = 'Escape';

  var pageBody = document.querySelector('.body');
  var callbackPopup = pageBody.querySelector('.callback-popup');
  var callbackPopupBtn = pageBody.querySelector('.header__callback-button');
  var overlay = pageBody.querySelector('.overlay');

  var storageName = localStorage.getItem('name');
  var storagePhone = localStorage.getItem('phone');
  var storageComment = localStorage.getItem('comment');

  if (callbackPopup) {
    var nameInput = callbackPopup.querySelector('#callback-name');
    var phoneInput = callbackPopup.querySelector('#callback-phone');
    var commentInput = callbackPopup.querySelector('textarea');
    var closeButton = callbackPopup.querySelector('.callback-popup__close-button');
  }

  var onEscKeypress = function (evt) {
    if (evt.key === ESCAPE) {
      closePopup();
    }
  };

  var closePopup = function () {
    callbackPopup.classList.remove('callback-popup--show');
    overlay.classList.remove('overlay--show');
    pageBody.classList.remove('body--overflow');

    document.removeEventListener('keydown', onEscKeypress);
  };

  var openPopup = function () {
    callbackPopup.classList.add('callback-popup--show');
    overlay.classList.add('overlay--show');
    pageBody.classList.add('body--overflow');

    nameInput.focus();

    if (storageName) {
      nameInput.value = storageName;
      phoneInput.focus();
    }

    if (storagePhone) {
      phoneInput.value = storagePhone;
      commentInput.focus();
    }

    if (storageComment) {
      commentInput.value = storageComment;
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

    callbackPopup.addEventListener('submit', function () {
      if (nameInput.value) {
        localStorage.setItem('name', nameInput.value);
      }

      if (phoneInput.value) {
        localStorage.setItem('phone', phoneInput.value);
      }

      if (commentInput.value) {
        localStorage.setItem('comment', commentInput.value);
      }
    });
  }
})();

'use strict';

(function () {
  var BACKSPACE = 'Backspace';
  var TAB = 'Tab';
  var MASK_START = '+7(';
  var FULL_MASK_REG = /^[+]\d[(]\d{3}[)]\d{7}$/;
  var BEFORE_BRACKET_MASK_REG = /^[+][7][(]\d{3}$/;
  var START_MASK_REG = /^[+][7][(]/;
  var NUMBER_REG = /\d/;
  var phoneFeedbackInput = document.querySelector('#feedback-phone');
  var phoneCallbackInput = document.querySelector('#callback-phone');

  var addPhoneMask = function (input) {
    input.addEventListener('focus', function () {
      if (input.value === '') {
        input.value = MASK_START;
      }
    });

    input.addEventListener('blur', function () {
      if (input.value === MASK_START) {
        input.value = '';
      }
    });

    input.addEventListener('keydown', function (evt) {
      var isBackspace = evt.key === BACKSPACE;
      var isTab = evt.key === TAB;
      var isMaskStartReached = input.value === MASK_START && isBackspace;
      var isFull = FULL_MASK_REG.test(input.value) && !isBackspace;
      var isNotANumber = !NUMBER_REG.test(evt.key) && !isBackspace;
      var isTypingWrong = !START_MASK_REG.test(input.value) && NUMBER_REG.test(evt.key);
      var isTypingBeforeString = !START_MASK_REG.test(input.value);

      if ((isMaskStartReached || isFull || isNotANumber) && !isTab) {
        evt.preventDefault();
      }

      if (isTypingBeforeString) {
        input.value = MASK_START + '(';
      }

      if (isTypingWrong) {
        input.value = MASK_START + evt.key;
      }

      if (BEFORE_BRACKET_MASK_REG.test(input.value) && evt.key !== BACKSPACE) {
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
