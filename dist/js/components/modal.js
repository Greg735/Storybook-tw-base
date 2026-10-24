/**
 * @file Modals (native <dialog>): opened by [data-modal-target="#id"],
 * closed by [data-modal-close], the Escape key or a click on the backdrop,
 * with a fade.
 */
(function (Drupal, once) {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function duration(dialog) {
    return reducedMotion.matches ? 0 : (parseFloat(getComputedStyle(dialog).transitionDuration) || 0) * 1000;
  }

  function open(dialog) {
    if (dialog.open) {
      return;
    }
    dialog.showModal();
    // Next frame, so the transitions start from the closed state.
    requestAnimationFrame(function () {
      dialog.setAttribute('data-visible', '');
    });
  }

  function close(dialog) {
    if (!dialog.open || dialog.closing) {
      return;
    }
    dialog.closing = true;
    dialog.removeAttribute('data-visible');
    setTimeout(function () {
      dialog.close();
      dialog.closing = false;
    }, duration(dialog));
  }

  Drupal.behaviors.jbModal = {
    attach: function (context) {
      once('jb-modal', '[data-modal]', context).forEach(function (dialog) {
        dialog.addEventListener('cancel', function (event) {
          event.preventDefault();
          close(dialog);
        });
        dialog.addEventListener('click', function (event) {
          // A click outside the content (on the backdrop or around the
          // centered dialog).
          if (event.target.closest('[data-modal-close]') || !event.target.closest('[data-modal-content]')) {
            close(dialog);
          }
        });
      });
      once('jb-modal-trigger', '[data-modal-target]', context).forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
          var dialog = document.querySelector(trigger.getAttribute('data-modal-target'));
          if (dialog) {
            event.preventDefault();
            open(dialog);
          }
        });
      });
    },
  };
})(Drupal, once);
