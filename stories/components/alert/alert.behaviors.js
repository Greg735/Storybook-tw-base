/**
 * @file Dismissible alerts: the close button fades the alert out, then
 * removes it.
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.jbAlert = {
    attach: function (context) {
      once('jb-alert', '[data-dismiss="alert"]', context).forEach(function (button) {
        button.addEventListener('click', function () {
          var alert = button.closest('[role="alert"]');
          if (!alert) {
            return;
          }
          alert.setAttribute('data-dismissed', '');
          var duration = parseFloat(getComputedStyle(alert).transitionDuration) || 0;
          setTimeout(function () {
            alert.remove();
          }, duration * 1000);
        });
      });
    },
  };
})(Drupal, once);
