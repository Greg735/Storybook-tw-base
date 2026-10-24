/**
 * @file GLightbox on the .glightbox links, with a focus trap.
 *
 * @drupal-dependencies glightbox
 */
(function (Drupal, once) {
  'use strict';

  var lightbox = null;
  var lastFocusedElement = null;
  var inertElements = [];

  // Visible, enabled controls of the open lightbox, in DOM order. Prev/next
  // at the ends of a gallery only get a `disabled` class, not the attribute.
  function lightboxFocusables(container) {
    var selector = 'a[href], button, input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';
    return [].slice.call(container.querySelectorAll(selector)).filter(function (el) {
      return !el.disabled && !el.classList.contains('disabled') && el.getClientRects().length > 0;
    });
  }

  function focusInLightbox(el) {
    [].forEach.call(document.querySelectorAll('.gbtn.focused'), function (btn) {
      btn.classList.remove('focused');
    });
    el.focus();
    // GLightbox only draws its focus ring on `.gbtn.focused`.
    if (el.classList.contains('gbtn')) {
      el.classList.add('focused');
    }
  }

  // Focus trap (WCAG 2.4.3). GLightbox's own Tab handler bails out when
  // focus is on a button without its `focused` class, letting Tab escape
  // into the (aria-hidden) page, and it ignores Shift. Runs in the capture
  // phase on document so it wins over GLightbox's listener on window.
  document.addEventListener(
    'keydown',
    function (event) {
      var container = document.querySelector('.glightbox-container');
      if (event.key !== 'Tab' || !container || !document.body.classList.contains('glightbox-open')) {
        return;
      }
      var focusables = lightboxFocusables(container);
      event.preventDefault();
      event.stopPropagation();
      if (!focusables.length) {
        return;
      }
      var index = focusables.indexOf(document.activeElement);
      var next = event.shiftKey
        ? focusables[index <= 0 ? focusables.length - 1 : index - 1]
        : focusables[(index + 1) % focusables.length];
      focusInLightbox(next);
    },
    true,
  );

  Drupal.behaviors.jbImageLightbox = {
    attach: function (context) {
      if (!once('jb-image-lightbox', '.glightbox', context).length) {
        return;
      }
      // GLightbox binds clicks to the links that exist when it is created,
      // and its reload() binds them again without removing the old
      // handlers: rebuild the instance so new links are picked up once.
      if (lightbox) {
        lightbox.destroy();
      }
      lightbox = GLightbox({
        onOpen: function () {
          // Move focus into the dialog so it's never left on a trigger
          // that just became a descendant of an aria-hidden container.
          lastFocusedElement = document.activeElement;
          var container = document.querySelector('.glightbox-container');
          // Make the page behind the overlay unreachable, not just
          // aria-hidden (mouse, keyboard and assistive tech alike).
          inertElements = [].filter.call(document.body.children, function (el) {
            return el !== container && !el.inert;
          });
          inertElements.forEach(function (el) {
            el.inert = true;
          });
          var closeButton = container && container.querySelector('.gclose');
          if (closeButton) {
            focusInLightbox(closeButton);
          }
        },
        onClose: function () {
          inertElements.forEach(function (el) {
            el.inert = false;
          });
          inertElements = [];
          // Restore focus to whatever opened the lightbox so keyboard/
          // screen-reader users don't lose their place in the page.
          if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
          }
          lastFocusedElement = null;
        },
      });
    },
  };
})(Drupal, once);
