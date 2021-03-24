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
