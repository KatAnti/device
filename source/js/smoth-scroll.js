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
