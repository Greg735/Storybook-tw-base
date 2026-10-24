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

Provide a simple div element around any content from wysiwyg editor.

## Purpose


## Implementation example
```
  {% include '@components/content-wysiwyg/content-wysiwyg.twig' with {
    content: content,
    content_classes: ['text-center'],
  }%}
```