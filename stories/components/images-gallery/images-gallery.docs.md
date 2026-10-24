## Purpose

Images gallery with gLightbox and/or masonery options.

`gallery_grid` holds the width classes of each item, in a wrapping flex row (default `w-1/2 sm:w-1/3 md:w-1/4`; percentage widths keep Masonry working); `gallery_spacing` (0 to 5) sets the gutter.

## Implementation example
```
  {% include '@components/images-gallery/images-gallery.twig' with {
    items: [
      { src: '/img/image-1.jpg', alt: 'Image 1', width: 800, height: 600, lightbox_dest_image_src: '/img/image-1-large.jpg' },
      { src: '/img/image-2.jpg', alt: 'Image 2', width: 800, height: 600, lightbox_dest_image_src: '/img/image-2-large.jpg' },
    ],
    use_lightbox: true,
    gallery_grid: 'w-1/2 md:w-1/3',
    gallery_spacing: 2,
  }%}
```


Example not working yet but ok in project.