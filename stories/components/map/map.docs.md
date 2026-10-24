<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

## Intro

The `Map` component allows you to embed an Openstreetmap within your project. You can customize the map by specifying the long/lat, zoom and pop-up text.

## Implementation example
```
  {% include '@components/map/map.twig' with {
    lat: 46.5197,
    long: 6.6323,
    zoom: 13,
    marker_text: 'Lausanne',
    popup_open: true,
    height: 400,
  }%}
```