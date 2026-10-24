/**
 * @file Accordion: toggles the panels, with a height transition.
 */
(function (Drupal, once) {
  'use strict';

  var DURATION = 350;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Animates the panel height from its current value to its target one.
  function animate(panel, open) {
    if (reducedMotion.matches) {
      panel.classList.toggle('hidden', !open);
      return;
    }
    panel.classList.remove('hidden');
    var height = panel.scrollHeight + 'px';
    panel.style.overflow = 'hidden';
    panel.style.transition = 'height ' + DURATION + 'ms ease';
    panel.style.height = open ? '0px' : height;
    // Force a reflow so the start height is applied before the transition.
    panel.getBoundingClientRect();
    panel.style.height = open ? height : '0px';
    clearTimeout(panel.accordionTimer);
    panel.accordionTimer = setTimeout(function () {
      panel.style.overflow = '';
      panel.style.transition = '';
      panel.style.height = '';
      panel.classList.toggle('hidden', !open);
    }, DURATION);
  }

  function toggle(trigger, open) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel || (trigger.getAttribute('aria-expanded') === 'true') === open) {
      return;
    }
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    animate(panel, open);
  }

  Drupal.behaviors.jbAccordion = {
    attach: function (context) {
      once('jb-accordion', '[data-accordion]', context).forEach(function (accordion) {
        var triggers = [].slice.call(accordion.querySelectorAll('[data-accordion-trigger]'));
        triggers.forEach(function (trigger) {
          trigger.addEventListener('click', function () {
            var open = trigger.getAttribute('aria-expanded') !== 'true';
            if (open && accordion.hasAttribute('data-accordion-exclusive')) {
              triggers.forEach(function (other) {
                if (other !== trigger) {
                  toggle(other, false);
                }
              });
            }
            toggle(trigger, open);
          });
        });
      });
    },
  };
})(Drupal, once);
