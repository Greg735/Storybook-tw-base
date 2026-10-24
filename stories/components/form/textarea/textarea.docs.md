<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-green">Drupal: 11</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>

## Intro

Multi-line text input.

## Files

`stories/components/form/textarea/`

- `textarea.twig`
- `textarea.stories.js`
- `textarea.docs.md`

## Drupal integration

Same variables as Drupal core `textarea.html.twig`: the override is a
one-line include.

```
{# templates/form/textarea.html.twig #}
{% include '@components/form/textarea/textarea.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `wrapper_attributes` | Wrapper attributes. |
| `attributes` | Textarea attributes. |
| `resizable` | `none`, `vertical`, `horizontal` or `both`. |
| `required` | Whether the textarea is required. |
| `value` | Textarea content. |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| textarea | `form-control` |
| `resizable` | `resize-none`, `resize-y`, `resize-x`, `resize` |
| `error` (or `aria-invalid`) | invalid style (red border and icon) |

## Form API example

```php
$form['message'] = [
  '#type' => 'textarea',
  '#title' => $this->t('Message'),
  '#rows' => 5,
  '#resizable' => 'vertical',
];
```

See **Components / Form / Form** for the whole form integration.
