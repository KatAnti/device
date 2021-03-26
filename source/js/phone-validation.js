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
