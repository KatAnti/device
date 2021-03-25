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
