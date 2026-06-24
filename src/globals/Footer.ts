import type { GlobalConfig } from 'payload';

/* Site footer: intro blurb, link columns, social links, and the bottom bar.
   Studio address / phone / email are pulled from the Site Content global. */

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    description: 'Footer blurb, link columns, social profiles, and the copyright bar.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Intro & bottom bar',
          fields: [
            { name: 'blurb', type: 'textarea', admin: { description: 'Short paragraph under the logo.' } },
            {
              name: 'copyright',
              type: 'text',
              admin: { description: 'Copyright line. The current year is added automatically in front.' },
            },
            { name: 'tagline', type: 'text', admin: { description: 'Right-hand line in the bottom bar.' } },
          ],
        },
        {
          label: 'Link columns',
          fields: [
            {
              name: 'navGroups',
              type: 'array',
              labels: { singular: 'Column', plural: 'Link columns' },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'links',
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
        {
          label: 'Social',
          fields: [
            { name: 'socialHandle', type: 'text', admin: { description: 'Shown as “Follow · @handle”.' } },
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Profile', plural: 'Social profiles' },
              admin: { description: 'Only these platforms have icons: Instagram, Facebook, YouTube, TikTok, X.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      admin: { width: '40%' },
                      options: [
                        { label: 'Instagram', value: 'Instagram' },
                        { label: 'Facebook', value: 'Facebook' },
                        { label: 'YouTube', value: 'YouTube' },
                        { label: 'TikTok', value: 'TikTok' },
                        { label: 'X', value: 'X' },
                      ],
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
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
