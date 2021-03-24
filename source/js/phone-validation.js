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
