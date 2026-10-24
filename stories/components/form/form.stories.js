import FormDocs from './form.docs.md?raw';
import FormElementSource from '@components/form/form-element/form-element.twig?raw';
import { renderFieldset, renderFormElement, renderOptionsGroup } from './form.helpers';

export default {
  title: 'Components/Form/Form',
  parameters: {
    docs: {
      description: {
        component: FormDocs,
      },
    },
    componentSource: {
      code: FormElementSource,
      language: 'twig',
    },
    controls: { disable: true },
  },
};

const Template = ({ errors }) => `
<form class="contact-form" data-drupal-selector="contact-form" action="#" method="post" novalidate>
  ${renderFieldset({
    title: 'Contact details',
    children: [
      '<div class="-mx-3 flex flex-wrap *:max-w-full *:shrink-0 *:px-3">',
      `<div class="w-full md:w-1/2">${renderFormElement({ name: 'first_name', title: 'First name', required: true, errors: errors && 'First name field is required.' })}</div>`,
      `<div class="w-full md:w-1/2">${renderFormElement({ name: 'last_name', title: 'Last name', required: true })}</div>`,
      '</div>',
      renderFormElement({
        type: 'email',
        name: 'mail',
        title: 'Email address',
        required: true,
        value: errors ? 'jane.doe@' : '',
        errors: errors && 'The email address <em>jane.doe@</em> is not valid.',
        description: 'We will only use it to answer you.',
      }),
      renderFormElement({ type: 'tel', name: 'phone', title: 'Phone', placeholder: '+41 21 000 00 00' }),
    ].join(''),
  })}
  ${renderFormElement({ type: 'select', name: 'subject', title: 'Subject', required: true, options: { '': '- Select -', info: 'General information', appointment: 'Appointment', other: 'Other' } })}
  ${renderOptionsGroup({ type: 'radios', name: 'contact_method', title: 'Preferred contact method', options: { email: 'Email', phone: 'Phone' }, value: 'email', attributes: { class: ['container-inline'] } })}
  ${renderFormElement({ type: 'textarea', name: 'message', title: 'Message', required: true, rows: 6, errors: errors && 'Message field is required.' })}
  ${renderFormElement({ type: 'checkbox', name: 'copy', title: 'Send yourself a copy' })}
  <div class="form-actions js-form-wrapper form-wrapper flex gap-2" id="edit-actions">
    ${renderFormElement({ type: 'submit', name: 'op', id: 'edit-submit', value: 'Send message', button_type: 'primary' })}
    ${renderFormElement({ type: 'submit', name: 'op', id: 'edit-preview', value: 'Preview' })}
  </div>
</form>`;

export const ContactForm = Template.bind({});
ContactForm.args = {
  errors: false,
};

export const ContactFormWithErrors = Template.bind({});
ContactFormWithErrors.args = {
  errors: true,
};
