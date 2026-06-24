import type { GlobalConfig } from 'payload';

/* Site header: primary navigation, the Tours mega-menu, and the header CTA.
   Rendered on every page via the (frontend) layout. */

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    description: 'Top navigation bar, Tours mega-menu, and the header “Inquire” button.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          description: 'Primary menu links. Tick “Mega-menu” on the Tours item to open the panel below.',
          fields: [
            {
              name: 'nav',
              type: 'array',
              labels: { singular: 'Nav item', plural: 'Nav items' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                    {
                      name: 'href',
                      type: 'text',
                      admin: { width: '40%', description: 'Leave blank for a mega-menu item.' },
                    },
                    {
                      name: 'isMega',
                      type: 'checkbox',
                      label: 'Mega-menu',
                      admin: { width: '20%', description: 'Opens the Tours panel.' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA button',
          fields: [
            { name: 'ctaLabel', type: 'text', admin: { description: 'Desktop label, e.g. “Inquire Now”.' } },
            { name: 'ctaLabelShort', type: 'text', admin: { description: 'Compact label on small screens, e.g. “Inquire”.' } },
            { name: 'ctaHref', type: 'text', admin: { description: 'Where the button links, e.g. /contact.' } },
          ],
        },
        {
          label: 'Tours mega-menu',
          description: 'Shown when hovering / tapping the Tours menu item.',
          fields: [
            {
              name: 'megaFeatured',
              type: 'array',
              label: 'Featured cards',
              labels: { singular: 'Card', plural: 'Featured cards' },
              admin: { description: 'The large image cards on the left of the mega-menu.' },
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'Small label, e.g. “Our Speciality”. Optional.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
                { name: 'blurb', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'imageUrl', type: 'text', admin: { description: 'External image URL fallback.' } },
              ],
            },
            {
              name: 'megaLists',
              type: 'array',
              label: 'Link columns',
              labels: { singular: 'Column', plural: 'Link columns' },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Link', plural: 'Links' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                        { name: 'href', type: 'text', required: true, admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
