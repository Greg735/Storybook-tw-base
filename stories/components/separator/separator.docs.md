<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-green">Documentation: OK</span>
</div>


## Intro

The `Separator` component is a horizontal rule (`<hr>`) used to add a visual
separation between blocks of content.

## Files

`stories/components/separator/`

- `separator.twig`
- no CSS file: the styles come from the base styles (`stories/foundations/base.css`)
- `separator.stories.js`
- `separator.docs.md`

## Variables

| Variable | Type | Description |
|----------|------|-------------|
| `separator_classes` | array | CSS classes added to the `<hr>`. |
| `separator_attributes` | object | Extra HTML attributes (`{ 'aria-hidden': 'true' }`…). Values are escaped. |

## Styling

The base styles draw the `<hr>` with a 1px top border in the current text
color, at 25% opacity, with a 1rem vertical margin. Use Tailwind utility
classes to change it:

| Need | Classes |
|------|---------|
| Color | `text-primary`, `text-danger`… (or `border-primary`…) |
| Full color | `opacity-100` (or `opacity-50`, `opacity-75`) |
| Thickness | `border-t-2` … `border-t-5` |
| Spacing | `my-0` … `my-12`, `mt-*`, `mb-*` |

The defaults are set by the `hr` rule of `stories/foundations/base.css`; colors
come from the theme tokens (`stories/foundations/theme.css`).

## Implementation example
```
  {% include '@components/separator/separator.twig' with {
    separator_classes: ['text-primary', 'opacity-100', 'border-t-2', 'my-12'],
    separator_attributes: { 'aria-hidden': 'true' },
  }%}
```
