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

Tailwind form elements built to be used as-is by Drupal 11's form API.

Every template keeps **the exact variables of its Drupal core template**
(`attributes`, `children`, `label`, `description`, `errors`…). The Tailwind
classes are derived from the classes Drupal core already puts on each element
(`form-text`, `form-checkbox`, `form-select`, `button--primary`, `error`…), so
**no preprocess function is needed** in the theme.

## Components

All form components live in `stories/components/form/`, with one sub-folder per
Drupal template:

| Folder                 | Drupal template                  | Output                                                          |
|------------------------|----------------------------------|-----------------------------------------------------------------|
| `form-element/`        | `form-element.html.twig`         | `mb-4` wrapper, `form-check`, input group, description          |
| `form-element-label/`  | `form-element-label.html.twig`   | `mb-2` label, `sr-only`, required marker                        |
| `input/`               | `input.html.twig`                | `form-control`, `form-check-input`, `form-range`, `btn`         |
| `textarea/`            | `textarea.html.twig`             | `form-control`                                                  |
| `select/`              | `select.html.twig`               | `form-select`                                                   |
| `fieldset/`            | `fieldset.html.twig`             | framed fieldset, or label-like legend for radios/checkboxes     |
| `radios/`              | `radios.html.twig`               | `.form-radios`                                                  |
| `checkboxes/`          | `checkboxes.html.twig`           | `.form-checkboxes`                                              |
| (root)                 | –                                | this page, the example form, `form.helpers.js`, `form.css`      |

Each sub-folder holds the template (`<name>.twig`, copied to
`dist/components/form/<name>/`), stories and documentation. The templates use
Tailwind utilities; the form controls (`form-control`, `form-select`,
`form-check`, `form-check-input`, `form-switch`, `form-range`…) are custom
Tailwind utilities defined in `form/form.css`. A control with the `error`
class (set by Drupal core) or `aria-invalid="true"` is shown as invalid.

### How a field is rendered

Drupal renders a field in several passes, and the stories reproduce them with
`form.helpers.js` (Storybook only, not distributed):

1. the element itself: **Input**, **Textarea** or **Select**;
2. its label: **Form element label**;
3. both wrapped by **Form element** (with description, prefix / suffix, errors);
4. for radios and checkboxes, the options are grouped by **Radios** /
   **Checkboxes** and wrapped by a composite **Fieldset**.

The helpers build the same variables as Drupal core's `FormPreprocess`
(ids, `aria-describedby`, `required`, `error` classes…), so the HTML shown in
Storybook is the HTML Drupal outputs.

## Drupal integration

In the theme, each override is an include: `include` passes the whole Drupal
context to the component. Form element is the only one that adds variables: it
expects `type` and `name` already cleaned with `|clean_class` (Drupal Twig
filter, not available in Storybook), as core does in its template.

```
{# templates/form/form-element.html.twig #}
{% include '@components/form/form-element/form-element.twig' with {
  type: type|clean_class,
  name: name|clean_class,
} %}

{# templates/form/form-element-label.html.twig #}
{% include '@components/form/form-element-label/form-element-label.twig' %}

{# templates/form/input.html.twig #}
{% include '@components/form/input/input.twig' %}

{# templates/form/textarea.html.twig #}
{% include '@components/form/textarea/textarea.twig' %}

{# templates/form/select.html.twig #}
{% include '@components/form/select/select.twig' %}

{# templates/form/fieldset.html.twig #}
{% include '@components/form/fieldset/fieldset.twig' %}

{# templates/form/radios.html.twig #}
{% include '@components/form/radios/radios.twig' %}

{# templates/form/checkboxes.html.twig #}
{% include '@components/form/checkboxes/checkboxes.twig' %}
```

Theme preprocess functions that add `form-control` / `form-check-input`
(`THEME_preprocess_input()`, `THEME_preprocess_textarea()`) become unnecessary
and can be removed (keeping them is harmless: classes are not duplicated).

## Form API cheatsheet

| Need                          | Form API                                                       |
|-------------------------------|----------------------------------------------------------------|
| Prefix / suffix (input-group) | `#field_prefix`, `#field_suffix`                               |
| Help text                     | `#description`, `#description_display`                         |
| Hidden label                  | `'#title_display' => 'invisible'`                              |
| Switch instead of checkbox    | `'#wrapper_attributes' => ['class' => ['form-switch']]`        |
| Inline radios / checkboxes    | `'#attributes' => ['class' => ['container-inline']]`           |
| Primary / danger button       | `'#button_type' => 'primary'` / `'danger'`                     |
| Inline error messages         | Enable the core **Inline Form Errors** module                  |
