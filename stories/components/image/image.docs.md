## Purpose

Image

## Implementation example
```
  {# picture_srcsets is optional: it renders a <picture> #}
  {% include '@components/image/image.twig' with {
    src: src,
    alt: alt,
    width: width,
    height: height,
    image_classes: ['rounded'],
    picture_srcsets: [{ srcset: srcset, media: '(max-width: 767px)' }],
  }%}
```