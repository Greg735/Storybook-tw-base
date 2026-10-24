/**
 * Storybook-only helpers that mimic Drupal's form render pipeline.
 *
 * Shared by the stories of every form component (input, select, radios…).
 *
 * Drupal renders a form element in several passes: the element template
 * (input, select, textarea…) is rendered first, then wrapped by
 * form-element.twig (or fieldset.twig for radios / checkboxes), with a
 * pre-rendered label. These helpers build the same variables as Drupal core's
 * FormPreprocess so the Twig templates receive exactly what they get in
 * Drupal 11.
 */
import DrupalAttribute from 'drupal-attribute';

import formElementTemplate from '@components/form/form-element/form-element.twig';
import formElementLabelTemplate from '@components/form/form-element-label/form-element-label.twig';
import inputTemplate from '@components/form/input/input.twig';
import textareaTemplate from '@components/form/textarea/textarea.twig';
import selectTemplate from '@components/form/select/select.twig';
import fieldsetTemplate from '@components/form/fieldset/fieldset.twig';
import radiosTemplate from '@components/form/radios/radios.twig';
import checkboxesTemplate from '@components/form/checkboxes/checkboxes.twig';

// Drupal #type => HTML type and class set by core on the element.
const INPUT_TYPES = {
  textfield: { type: 'text', class: 'form-text' },
  email: { type: 'email', class: 'form-email' },
  password: { type: 'password', class: 'form-text' },
  tel: { type: 'tel', class: 'form-tel' },
  url: { type: 'url', class: 'form-url' },
  search: { type: 'search', class: 'form-search' },
  number: { type: 'number', class: 'form-number' },
  date: { type: 'date', class: 'form-date' },
  file: { type: 'file', class: 'form-file' },
  color: { type: 'color', class: 'form-color' },
  range: { type: 'range', class: 'form-range' },
  checkbox: { type: 'checkbox', class: 'form-checkbox' },
  radio: { type: 'radio', class: 'form-radio' },
};

// Builds a Drupal Attribute object, skipping empty values.
export const attributes = (values = {}) =>
  new DrupalAttribute(
    Object.entries(values)
      .filter(([, value]) => value !== undefined && value !== null && value !== false && value !== '')
      .map(([key, value]) => [key, key === 'class' ? [].concat(value) : value]),
  );

// Twig |clean_class filter (Html::getClass()): form-element.twig expects type
// and name already cleaned, as the Drupal theme passes them.
export const cleanClass = (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  const hasDoubleUnderscore = String(value).includes('__');
  let identifier = String(value)
    .toLowerCase()
    .replace(/__/g, '##')
    .replace(/[ _/[]/g, '-')
    .replace(/]/g, '');
  if (hasDoubleUnderscore) {
    identifier = identifier.replace(/##/g, '__');
  }
  // Keep '-', 0-9, A-Z, '_', a-z and ISO 10646 characters U+00A1 and higher.
  identifier = identifier.replace(/(?:[\0-,./:-@[-^`{-\u00A0]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g, '');
  // Identifiers cannot start with a digit, two hyphens, or a hyphen + digit.
  return identifier.replace(/^\d/g, '_').replace(/^(-\d)|^(--)/g, '__');
};

const toId = (name) =>
  `edit-${String(name)
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/-+$/, '')
    .toLowerCase()}`;

// RenderElementBase::setAttributes(): required, disabled and error states.
// "invalid" flags an option of a radios / checkboxes group in error: the
// message itself is displayed once, by the group.
const stateAttributes = ({ required, disabled, errors, invalid }) => ({
  required: required ? 'required' : null,
  disabled: disabled ? 'disabled' : null,
  'aria-invalid': errors || invalid ? 'true' : null,
});

const stateClasses = ({ required, errors, invalid }) =>
  [required && 'required', (errors || invalid) && 'error'].filter(Boolean);

const renderControl = (element, id) => {
  const {
    type = 'textfield',
    name,
    value,
    placeholder,
    options = {},
    multiple,
    checked,
    return_value = 1,
    rows = 5,
    resizable = 'vertical',
    button_type,
    attributes: extra = {},
  } = element;
  const describedby = element.description ? `${id}--description` : null;
  const common = {
    'data-drupal-selector': id,
    'aria-describedby': describedby,
    id,
    ...stateAttributes(element),
    ...extra,
  };

  if (type === 'textarea') {
    return textareaTemplate({
      wrapper_attributes: attributes(),
      attributes: attributes({ ...common, name, rows, cols: 60, placeholder, class: stateClasses(element) }),
      resizable,
      required: element.required,
      value,
    });
  }

  if (type === 'select') {
    const selected = [].concat(value ?? []).map(String);
    const toOption = ([key, label]) =>
      typeof label === 'object'
        ? { type: 'optgroup', label: key, options: Object.entries(label).map(toOption) }
        : { type: 'option', value: key, label, selected: selected.includes(String(key)) };
    return selectTemplate({
      attributes: attributes({
        ...common,
        name: multiple ? `${name}[]` : name,
        multiple: multiple ? 'multiple' : null,
        class: ['form-select', ...stateClasses(element)],
      }),
      options: Object.entries(options).map(toOption),
    });
  }

  if (type === 'submit') {
    return inputTemplate({
      attributes: attributes({
        ...common,
        type: 'submit',
        name: name ?? 'op',
        value,
        class: ['button', button_type && `button--${button_type}`, 'js-form-submit', 'form-submit'].filter(Boolean),
      }),
    });
  }

  const { type: htmlType, class: typeClass } = INPUT_TYPES[type];
  const isCheck = type === 'checkbox' || type === 'radio';
  return inputTemplate({
    attributes: attributes({
      ...common,
      type: htmlType,
      name,
      value: isCheck ? return_value : value,
      checked: isCheck && checked ? 'checked' : null,
      placeholder,
      class: [typeClass, ...stateClasses(element)],
    }),
  });
};

/**
 * Renders an element wrapped in form-element.twig, as Drupal does.
 *
 * Accepts Drupal-like properties without the "#": type, name, title,
 * title_display, description, description_display, required, disabled,
 * errors, field_prefix, field_suffix, value, placeholder, options…
 */
export const renderFormElement = (element) => {
  const { type = 'textfield', name, title, required, errors, description } = element;
  const id = element.id ?? toId(name ?? type);
  const isCheck = type === 'checkbox' || type === 'radio';
  const titleDisplay = title ? (element.title_display ?? (isCheck ? 'after' : 'before')) : 'none';
  const children = renderControl({ ...element, type }, id);

  if (type === 'submit') {
    return children;
  }

  return formElementTemplate({
    attributes: attributes(element.wrapper_attributes),
    type: cleanClass(type),
    name: cleanClass(name),
    disabled: element.disabled ? 'disabled' : null,
    errors,
    title_display: titleDisplay,
    label_display: titleDisplay,
    label: formElementLabelTemplate({
      title,
      title_display: titleDisplay,
      required,
      attributes: attributes({ for: id }),
    }),
    prefix: element.field_prefix,
    suffix: element.field_suffix,
    description: description
      ? {
          content: description,
          attributes: attributes({ id: `${id}--description` }),
        }
      : null,
    description_display: element.description_display ?? 'after',
    children,
  });
};

/**
 * Renders radios / checkboxes the Drupal way: one form-element per option,
 * grouped by radios.twig / checkboxes.twig and wrapped in a composite
 * fieldset (CompositeFormElementTrait).
 */
export const renderOptionsGroup = (element) => {
  const { type = 'radios', name, title, options = {}, required, errors, description } = element;
  const id = element.id ?? toId(name);
  const isRadios = type === 'radios';
  const selected = [].concat(element.value ?? []).map(String);

  const children = Object.entries(options)
    .map(([key, label]) =>
      renderFormElement({
        type: isRadios ? 'radio' : 'checkbox',
        id: `${id}-${toId(key).replace(/^edit-/, '')}`,
        name: isRadios ? name : `${name}[${key}]`,
        title: label,
        return_value: key,
        checked: selected.includes(String(key)),
        disabled: element.disabled,
        invalid: Boolean(errors),
      }),
    )
    .join('');

  const group = (isRadios ? radiosTemplate : checkboxesTemplate)({
    attributes: attributes({ id }),
    children,
  });

  const wrapperId = `${id}--wrapper`;
  return fieldsetTemplate({
    attributes: attributes({
      'data-drupal-selector': `${id}-wrapper`,
      id: wrapperId,
      'aria-describedby': description ? `${wrapperId}--description` : null,
      class: [
        'fieldgroup',
        'form-composite',
        required && 'required',
        ...[].concat(element.attributes?.class ?? []),
      ].filter(Boolean),
    }),
    required,
    errors,
    legend: { title, attributes: attributes() },
    legend_span: {
      attributes: attributes({ class: element.title_display === 'invisible' ? ['visually-hidden'] : [] }),
    },
    description: description
      ? {
          content: description,
          attributes: attributes({ id: `${wrapperId}--description`, 'data-drupal-field-elements': 'description' }),
        }
      : null,
    children: group,
  });
};

/**
 * Renders a grouping fieldset (#type fieldset) around rendered children.
 */
export const renderFieldset = ({ title, description, required, children = '', attributes: extra = {} }) =>
  fieldsetTemplate({
    attributes: attributes(extra),
    required,
    legend: { title, attributes: attributes() },
    legend_span: { attributes: attributes() },
    description: description ? { content: description, attributes: attributes() } : null,
    children,
  });

// Shared Storybook controls, named after the Drupal form API properties.
export const elementArgTypes = {
  title: { control: 'text', description: '`#title`' },
  title_display: {
    control: { type: 'select' },
    options: ['before', 'after', 'invisible'],
    description: '`#title_display`',
  },
  description: { control: 'text', description: '`#description`' },
  description_display: {
    control: { type: 'select' },
    options: ['after', 'before', 'invisible'],
    description: '`#description_display`',
  },
  required: { control: 'boolean', description: '`#required`' },
  disabled: { control: 'boolean', description: '`#disabled`' },
  errors: { control: 'text', description: 'Inline error (requires the Inline Form Errors module in Drupal).' },
  name: { control: 'text', description: '`#name`' },
  type: { control: false, description: '`#type`' },
  id: { table: { disable: true } },
  options: { control: 'object', description: '`#options`' },
  attributes: { control: 'object', description: '`#attributes`' },
  wrapper_attributes: { control: 'object', description: '`#wrapper_attributes`' },
};
