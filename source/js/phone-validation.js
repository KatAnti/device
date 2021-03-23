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
