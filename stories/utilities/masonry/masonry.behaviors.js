/**
 * @file Masonry layout on the [data-masonry] grids.
 *
 * @drupal-dependencies masonry
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.jbMasonry = {
    attach: function (context) {
      once('jb-masonry', '[data-masonry]', context).forEach(function (element) {
        var options;
        try {
          options = JSON.parse(element.getAttribute('data-masonry') || '{}');
        } catch (error) {
          console.error('Invalid JSON in data-masonry:', error);
          return;
        }
        // masonry.pkgd.js also initialises [data-masonry] by itself once
        // the document is ready, which would create a second instance:
        // remove the attribute so only this behavior handles the grid.
        element.removeAttribute('data-masonry');
        var masonry = Masonry.data(element) || new Masonry(element, options);

        // Lazy-loaded images have no height yet on the first layout.
        [].forEach.call(element.querySelectorAll('img'), function (img) {
          if (!img.complete) {
            img.addEventListener('load', function () {
              masonry.layout();
            });
          }
        });
      });
    },
  };
})(Drupal, once);
