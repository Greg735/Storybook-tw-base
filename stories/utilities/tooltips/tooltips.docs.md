<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

# Tooltips

The **Tooltips** utility provides a simple tooltip on hovered or focused elements. It is a vanilla `Drupal.behaviors` (`tooltips.behaviors.js`, Drupal library `storybook_tw_base/tooltips`, namespace replaced by the theme's in `dist/`), styled by `tooltips.css`. Escape hides the tooltip.

## Usage

The following example demonstrates how to add a tootip.

```
<a href="#" class="me-2 inline-block" data-tooltip="Follow us on Threads!">
…
</a>
```

The former Bootstrap attributes are still supported: `data-bs-toggle="tooltip"` with `data-bs-title` (or `title`).
