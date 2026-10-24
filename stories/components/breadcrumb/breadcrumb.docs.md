<div class="mb-4 text-start">
	<span class="badge text-bg-blue me-2">Version: 0.1</span>
	<span class="badge text-bg-red me-2">Status: Not tested</span>
	<span class="badge text-bg-success">Documentation: Done</span>
</div>


## Intro

The `Breadcrumb` component is used to indicate the current page's location within a navigational hierarchy.


## Usage

The `Breadcrumb` component takes an array of breadcrumb items, each with a `text` and an optional `url`.

The visually hidden heading defaults to `Breadcrumb`; pass a translated `breadcrumb_title` to override it (e.g. `'Breadcrumb'|t` on the Drupal side).



## Implementation example
```
  {% include '@components/breadcrumb/breadcrumb.twig' with {
    breadcrumb: breadcrumb,
    breadcrumb_title: 'Breadcrumb'|t,
    icon_name: 'house-fill',
  }%}
```