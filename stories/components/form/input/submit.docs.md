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

Form buttons are `input` elements in Drupal: `#button_type` sets the `button--primary` / `button--danger` classes, mapped to the `btn` button utilities. Other buttons are outlined. Buttons already carrying a `btn` class are left untouched.

## Files

`stories/components/form/input/`

- `input.twig`
- `submit.stories.js`
- `submit.docs.md`

## Drupal integration

Same variables as Drupal core `input.html.twig`: the override is a
one-line include.

```
{# templates/form/input.html.twig #}
{% include '@components/form/input/input.twig' %}
```

## Variables

| Variable | Description |
|----------|-------------|
| `attributes` | Input attributes (`button`, `button--*`, `form-submit` classes set by Drupal core). |

## Tailwind mapping

| Drupal | Classes |
|--------|---------|
| `button--primary` | `btn btn-primary` |
| `button--danger` | `btn btn-danger` |
| `button` (other) | `btn btn-outline-primary` |
| `btn` already set | unchanged |

## Form API example

```php
$form['actions']['submit'] = [
  '#type' => 'submit',
  '#value' => $this->t('Send'),
  '#button_type' => 'primary',
];
```

See **Components / Form / Form** for the whole form integration.
