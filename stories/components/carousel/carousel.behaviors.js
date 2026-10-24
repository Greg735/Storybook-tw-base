/**
 * @file Carousel: previous/next buttons, indicators, keyboard arrows, swipe
 * and autoplay (paused while hovered, every 5 seconds).
 *
 * Slides are stacked (float + negative margin); the active one has the
 * data-active attribute. A change slides the next one in with a transform.
 */
(function (Drupal, once) {
  'use strict';

  var INTERVAL = 5000;
  var DURATION = 600;
  var SWIPE_THRESHOLD = 40;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function Carousel(element) {
    this.element = element;
    this.items = [].slice.call(element.querySelectorAll('[data-carousel-item]'));
    this.indicators = [].slice.call(element.querySelectorAll('[data-carousel-to]'));
    this.index = Math.max(
      0,
      this.items.findIndex(function (item) {
        return item.hasAttribute('data-active');
      }),
    );
    this.busy = false;
    this.timer = null;
    this.autoplay = element.hasAttribute('data-carousel-autoplay');
    this.bind();
    this.cycle();
  }

  Carousel.prototype.bind = function () {
    var self = this;
    var element = this.element;
    var prev = element.querySelector('[data-carousel-prev]');
    var next = element.querySelector('[data-carousel-next]');
    if (prev) {
      prev.addEventListener('click', function () {
        self.prev();
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        self.next();
      });
    }
    this.indicators.forEach(function (indicator) {
      indicator.addEventListener('click', function () {
        self.to(parseInt(indicator.getAttribute('data-carousel-to'), 10));
      });
    });
    element.addEventListener('keydown', function (event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        self.prev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        self.next();
      }
    });
    element.addEventListener('mouseenter', function () {
      self.pause();
    });
    element.addEventListener('mouseleave', function () {
      self.cycle();
    });

    var startX = null;
    element.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'mouse') {
        startX = event.clientX;
      }
    });
    element.addEventListener('pointerup', function (event) {
      if (startX === null) {
        return;
      }
      var delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        if (delta > 0) {
          self.prev();
        } else {
          self.next();
        }
        self.cycle();
      }
    });
  };

  Carousel.prototype.cycle = function () {
    var self = this;
    this.pause();
    if (this.autoplay && this.items.length > 1) {
      this.timer = setInterval(function () {
        if (!document.hidden) {
          self.next();
        }
      }, INTERVAL);
    }
  };

  Carousel.prototype.pause = function () {
    clearInterval(this.timer);
    this.timer = null;
  };

  Carousel.prototype.next = function () {
    this.slide((this.index + 1) % this.items.length, 1);
  };

  Carousel.prototype.prev = function () {
    this.slide((this.index - 1 + this.items.length) % this.items.length, -1);
  };

  Carousel.prototype.to = function (index) {
    if (index !== this.index) {
      this.slide(index, index > this.index ? 1 : -1);
    }
  };

  // Moves to the slide at `index`, coming from the right (direction 1) or
  // from the left (-1).
  Carousel.prototype.slide = function (index, direction) {
    if (this.busy || index === this.index || !this.items[index]) {
      return;
    }
    var self = this;
    var active = this.items[this.index];
    var next = this.items[index];

    var finish = function () {
      next.setAttribute('data-active', '');
      active.removeAttribute('data-active');
      [active, next].forEach(function (item) {
        item.style.display = '';
        item.style.transform = '';
      });
      self.busy = false;
    };

    this.index = index;
    this.indicators.forEach(function (indicator, i) {
      if (i === index) {
        indicator.setAttribute('data-active', '');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('data-active');
        indicator.removeAttribute('aria-current');
      }
    });

    if (reducedMotion.matches) {
      finish();
      return;
    }

    this.busy = true;
    next.style.transition = 'none';
    next.style.display = 'block';
    next.style.transform = 'translateX(' + direction * 100 + '%)';
    // Force a reflow so the start position is applied before the transition.
    next.getBoundingClientRect();
    next.style.transition = '';
    next.style.transform = 'translateX(0)';
    active.style.transform = 'translateX(' + -direction * 100 + '%)';
    setTimeout(finish, DURATION);
  };

  Drupal.behaviors.jbCarousel = {
    attach: function (context) {
      once('jb-carousel', '[data-carousel]', context).forEach(function (element) {
        element.carousel = new Carousel(element);
      });
    },
  };
})(Drupal, once);
