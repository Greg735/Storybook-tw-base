<div class="mb-4 text-center">
	<span class="badge text-bg-blue me-2">Version: 0.1</span>
	<span class="badge text-bg-red me-2">Status: Not tested</span>
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

## Intro


## Purpose


## Implementation example
```
  {% include '@components/pagination/pagination.twig' with {
    heading_id: heading_id,
    pagination_title: 'Pagination'|t,
    items: items,
    current: current,
    ellipses: ellipses,
    size: 'default',
  }%}
```