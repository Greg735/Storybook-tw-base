<div class="mb-4 text-start">
	<span class="badge text-bg-blue me-2">Version: 0.1</span>
	<span class="badge text-bg-red me-2">Status: Not tested</span>
	<span class="badge text-bg-success">Documentation: Done</span>
</div>


## Purpose

The **Carousel** component allows you to create a slideshow.

## JavaScript

The slideshow (previous / next buttons, indicators, keyboard arrows, swipe and autoplay paused on hover) is handled by the vanilla `carousel.behaviors.js` (`Drupal.behaviors` + `once()`, no Bootstrap). The template attaches its Drupal library with `{{ attach_library('storybook_tw_base/carousel') }}`; in `dist/components/`, the namespace is replaced by the theme's (see `dist/libraries.yml`).

## Implementation example
```
  {% include '@components/carousel/carousel.twig' with {
    carousel_id: 'carousel-home',
    items: [
      { src: '/img/slide-1.jpg', alt: 'Slide 1', caption: 'Caption', subcaption: 'Subcaption' },
      { src: '/img/slide-2.jpg', alt: 'Slide 2', lightbox_img: '/img/slide-2-large.jpg' },
    ],
    indicators: true,
    controls: true,
    autoplay: true,
    carousel_height: 500,
  }%}
```
