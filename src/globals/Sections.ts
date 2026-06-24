import type { GlobalConfig } from 'payload';

/* Shared home-page section components: the Method block, the Story timeline,
   and the Traveller Voices heading. (Voices quotes can also be drawn from the
   Testimonials collection; these act as the on-page defaults.) */

const t = (name: string, opts: Record<string, unknown> = {}) => ({ name, type: 'text' as const, ...opts });
const ta = (name: string, opts: Record<string, unknown> = {}) => ({ name, type: 'textarea' as const, ...opts });
const image = (name: string) => [
  { name, type: 'upload' as const, relationTo: 'media' as const },
  { name: `${name}Url`, type: 'text' as const, admin: { description: 'External image URL fallback.' } },
];

export const Sections: GlobalConfig = {
  slug: 'sections',
  admin: { description: 'Home-page sections: the Method block, the Story timeline, and Traveller Voices.' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Method',
          fields: [
            {
              name: 'method',
              type: 'group',
              fields: [
                t('eyebrow'),
                t('titleL1'),
                t('titleL2'),
                t('titleL3'),
                ta('body'),
                ta('quote'),
                t('quoteAttribution'),
                ...image('image1'),
                ...image('image2'),
                {
                  name: 'pillars',
                  type: 'array',
                  labels: { singular: 'Pillar', plural: 'Pillars' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        t('n', { label: 'No.', admin: { width: '25%' } }),
                        t('label', { admin: { width: '75%' } }),
                      ],
                    },
                    t('title', { required: true }),
                    ta('body'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              name: 'story',
              type: 'group',
              fields: [
                t('eyebrow'),
                t('titleL1'),
                t('titleL2'),
                {
                  name: 'chapters',
                  type: 'array',
                  labels: { singular: 'Chapter', plural: 'Chapters' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        t('year', { required: true, admin: { width: '50%' } }),
                        t('chapter', { label: 'Chapter no.', admin: { width: '50%' } }),
                      ],
                    },
                    t('title', { required: true }),
                    ta('body'),
                    ...image('image'),
                    {
                      type: 'row',
                      fields: [
                        t('statValue', { admin: { width: '40%' } }),
                        t('statLabel', { admin: { width: '60%' } }),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Traveller voices',
          fields: [
            {
              name: 'voices',
              type: 'group',
              fields: [
                t('eyebrow'),
                t('titleL1'),
                t('titleL2'),
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Quote', plural: 'Quotes' },
                  admin: { description: 'Fallback quotes shown when the Testimonials collection is empty.' },
                  fields: [t('name', { required: true }), t('role'), ta('quote', { required: true })],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
