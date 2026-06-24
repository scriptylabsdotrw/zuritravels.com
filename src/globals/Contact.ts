import type { GlobalConfig } from 'payload';

/* Contact / configurator page copy. The destination, tour and tier choices are
   driven by the Destinations and Tours collections; this holds the page copy
   and the form's confirmation/error messages. */

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: { description: 'Contact page header copy and the enquiry-form confirmation / error messages.' },
  access: { read: () => true },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'titleLight', type: 'text' },
    { name: 'titleAccent', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'summaryHeading', type: 'text', admin: { description: 'Label above the live trip summary.' } },
    { name: 'formFooter', type: 'textarea', admin: { description: 'Reassurance line beside the submit button.' } },
    { name: 'successMessage', type: 'textarea' },
    { name: 'errorMessage', type: 'textarea' },
  ],
};
