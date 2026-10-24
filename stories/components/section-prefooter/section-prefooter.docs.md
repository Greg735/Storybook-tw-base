# Section Component
The **Section** component is used to create a content section in your application. It can receive Tailwind utility classes to customize its appearance and behavior.

## Tailwind Utility Classes

The colors are the theme tokens of `stories/foundations/theme.css` (`primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark`, `blue`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `black`, `white`, `gray`, `gray-100` … `gray-900`).

### Background Colors

Use the `bg-*` utilities to change the background color of your section.

- `bg-primary`: Sets the background color to the primary theme color.
- `bg-secondary`: Sets the background color to the secondary theme color.
- `bg-success`: Sets the background color to the success theme color.
- `bg-danger`: Sets the background color to the danger theme color.
- `bg-warning`: Sets the background color to the warning theme color.
- `bg-info`: Sets the background color to the info theme color.
- `bg-light`: Sets the background color to light.
- `bg-dark`: Sets the background color to dark.
- `bg-white`: Sets the background color to white.
- `bg-transparent`: Sets the background to be transparent.
- `bg-gradient`: Adds a light gradient over the background color (custom utility).
- `bg-primary-subtle`: Sets a subtle primary background color.
- `bg-secondary-subtle`: Sets a subtle secondary background color.
- `bg-success-subtle`: Sets a subtle success background color.
- `bg-danger-subtle`: Sets a subtle danger background color.
- `bg-warning-subtle`: Sets a subtle warning background color.
- `bg-info-subtle`: Sets a subtle info background color.
- `bg-light-subtle`: Sets a subtle light background color.
- `bg-dark-subtle`: Sets a subtle dark background color.

### Background Opacity

Add an opacity modifier to any background color:

- `bg-primary/10`: Primary background at 10% opacity.
- `bg-primary/25`: Primary background at 25% opacity.
- `bg-primary/50`: Primary background at 50% opacity.
- `bg-primary/75`: Primary background at 75% opacity.
- `bg-primary`: Primary background, fully opaque.

### Text Colors

Use the `text-*` utilities to set the text color.

- `text-primary`: Sets the text color to the primary theme color.
- `text-secondary`: Sets the text color to the secondary theme color.
- `text-success`: Sets the text color to the success theme color.
- `text-danger`: Sets the text color to the danger theme color.
- `text-warning`: Sets the text color to the warning theme color.
- `text-info`: Sets the text color to the info theme color.
- `text-light`: Sets the text color to light.
- `text-dark`: Sets the text color to dark.
- `text-white`: Sets the text color to white.
- `text-muted`: Sets the text color to a muted color.
- `text-black/50`: Sets the text color to 50% black.
- `text-white/50`: Sets the text color to 50% white.

### Background and Text Color Combinations

For easier usage, the `text-bg-*` custom utility sets a background color with its readable text color (any theme color):

- `text-bg-primary`
- `text-bg-secondary`
- `text-bg-success`
- `text-bg-danger`
- `text-bg-warning`
- `text-bg-info`
- `text-bg-light`
- `text-bg-dark`

### Other Utility Classes

Tailwind includes many other utility classes to help you style your sections:

- `m-0`, `mt-0`, `mb-0`, `ms-0`, `me-0`: Margin utilities to remove or set margins.
- `p-0`, `pt-0`, `pb-0`, `ps-0`, `pe-0`: Padding utilities to remove or set padding (`p-12` = 3rem).
- `border`, `border-t`, `border-b`, `border-s`, `border-e`: Border utilities to add borders.
- `rounded`, `rounded-t`, `rounded-b`, `rounded-s`, `rounded-e`: Border-radius utilities to round corners.
