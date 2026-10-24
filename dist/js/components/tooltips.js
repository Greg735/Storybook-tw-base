/**
 * @file Tooltips on hover and focus:
 *
 *   <a href="#" data-tooltip="Tooltip text">…</a>
 *
 * The former Bootstrap attributes (data-bs-toggle="tooltip" with data-bs-title
 * or title) are supported too. Escape hides the tooltip.
 */
(function (Drupal, once) {
  'use strict';

  var SELECTOR = '[data-tooltip], [data-bs-toggle="tooltip"]';
  var tooltip = null;
  var current = null;
  var counter = 0;

  function text(element) {
    return (
      element.getAttribute('data-tooltip') ||
      element.getAttribute('data-bs-title') ||
      element.getAttribute('data-original-title') ||
      ''
    );
  }

  function create() {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.id = 'tooltip-' + ++counter;
    tooltip.innerHTML = '<div class="tooltip-arrow"></div><div class="tooltip-inner"></div>';
  }

  function position(element) {
    var rect = element.getBoundingClientRect();
    var tip = tooltip.getBoundingClientRect();
    var placement = rect.top - tip.height < 0 ? 'bottom' : 'top';
    var top = placement === 'top' ? rect.top - tip.height : rect.bottom;
    var left = rect.left + rect.width / 2 - tip.width / 2;
    var maxLeft = document.documentElement.clientWidth - tip.width;
    var clamped = Math.min(Math.max(left, 0), Math.max(maxLeft, 0));
    tooltip.setAttribute('data-placement', placement);
    tooltip.style.setProperty('--tooltip-arrow-left', tip.width / 2 + left - clamped + 'px');
    tooltip.style.transform = 'translate(' + (clamped + window.scrollX) + 'px, ' + (top + window.scrollY) + 'px)';
  }

  function show(element) {
    var content = text(element);
    if (!content) {
      return;
    }
    if (!tooltip) {
      create();
    }
    current = element;
    tooltip.querySelector('.tooltip-inner').textContent = content;
    tooltip.removeAttribute('data-visible');
    document.body.appendChild(tooltip);
    position(element);
    element.setAttribute('aria-describedby', tooltip.id);
    requestAnimationFrame(function () {
      if (current === element) {
        tooltip.setAttribute('data-visible', '');
      }
    });
  }

  function hide(element) {
    if (!tooltip || current !== element) {
      return;
    }
    current = null;
    element.removeAttribute('aria-describedby');
    tooltip.removeAttribute('data-visible');
    tooltip.remove();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && current) {
      hide(current);
    }
  });

  Drupal.behaviors.jbTooltips = {
    attach: function (context) {
      once('jb-tooltips', SELECTOR, context).forEach(function (element) {
        // A native title would show a second tooltip.
        if (element.hasAttribute('title') && !text(element)) {
          element.setAttribute('data-original-title', element.getAttribute('title'));
        }
        element.removeAttribute('title');
        ['mouseenter', 'focus'].forEach(function (type) {
          element.addEventListener(type, function () {
            show(element);
          });
        });
        ['mouseleave', 'blur'].forEach(function (type) {
          element.addEventListener(type, function () {
            hide(element);
          });
        });
      });
    },
  };
})(Drupal, once);
