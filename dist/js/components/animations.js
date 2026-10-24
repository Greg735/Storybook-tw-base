/**
 * @file scrollCue animations on the [data-cue] elements.
 *
 * @drupal-dependencies scrollcue
 */
(function (Drupal, once) {
  'use strict';

  var initialized = false;

  Drupal.behaviors.jbAnimations = {
    attach: function (context) {
      if (!once('jb-animations', '[data-cue]', context).length) {
        return;
      }
      if (!initialized) {
        scrollCue.init({});
        initialized = true;
      } else {
        // Pick up elements added after the first initialisation.
        scrollCue.update();
      }
    },
  };
})(Drupal, once);
