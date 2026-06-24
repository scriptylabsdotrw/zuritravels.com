import type { GlobalConfig } from 'payload';

/* Visit Rwanda page content — the six pillars, the themed attraction
   directory, country facts, and seasons. */

const t = (name: string, opts: Record<string, unknown> = {}) => ({ name, type: 'text' as const, ...opts });
const ta = (name: string, opts: Record<string, unknown> = {}) => ({ name, type: 'textarea' as const, ...opts });
const image = (name: string) => [
  { name, type: 'upload' as const, relationTo: 'media' as const },
  { name: `${name}Url`, type: 'text' as const, admin: { description: 'External image URL fallback.' } },
];
const ctaRow = (n: number) => ({
  type: 'row' as const,
  fields: [
    { name: `cta${n}Label`, type: 'text' as const, admin: { width: '50%' } },
    { name: `cta${n}Href`, type: 'text' as const, admin: { width: '50%' } },
  ],
});
const bullets = {
  name: 'bullets',
  type: 'array' as const,
  labels: { singular: 'Bullet', plural: 'Bullets' },
  fields: [t('text', { required: true })],
};
const kvItems = (label: string) => ({
  name: 'items',
  type: 'array' as const,
  labels: { singular: label, plural: `${label}s` },
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'k', type: 'text' as const, label: 'Label', required: true, admin: { width: '40%' } },
        { name: 'v', type: 'text' as const, label: 'Value', required: true, admin: { width: '60%' } },
      ],
    },
  ],
});

export const VisitRwanda: GlobalConfig = {
  slug: 'visit-rwanda',
  admin: { description: 'Visit Rwanda page — pillars, attraction directory, country facts, and seasons.' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero & intro',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [t('badge'), t('titleLight'), t('titleAccent'), ta('body'), ctaRow(1), ctaRow(2)],
            },
            {
              name: 'manifesto',
              type: 'group',
              fields: [t('eyebrowTop'), t('eyebrowIndex'), ta('body')],
            },
          ],
        },
        {
          label: 'Pillars',
          fields: [
            {
              name: 'pillarsHeader',
              type: 'group',
              fields: [t('eyebrow'), t('titleBold'), t('titleLight'), ta('body')],
            },
            {
              name: 'pillars',
              type: 'array',
              labels: { singular: 'Pillar', plural: 'Pillars' },
              fields: [
                t('eyebrow'),
                t('title', { required: true }),
                ta('body'),
                t('alt', { admin: { description: 'Image alt text.' } }),
                ...image('image'),
                bullets,
              ],
            },
          ],
        },
        {
          label: 'Directory',
          fields: [
            {
              name: 'directory',
              type: 'group',
              fields: [t('eyebrow'), t('titleLight'), t('titleBold'), ta('body'), t('jumpLabel')],
            },
            {
              name: 'placeCategories',
              type: 'array',
              labels: { singular: 'Category', plural: 'Categories' },
              fields: [
                t('eyebrow'),
                t('title', { required: true }),
                t('tagline'),
                ta('description'),
                t('alt', { admin: { description: 'Image alt text.' } }),
                ...image('image'),
                {
                  name: 'places',
                  type: 'array',
                  labels: { singular: 'Place', plural: 'Places' },
                  fields: [
                    t('name', { required: true }),
                    t('location'),
                    ta('note'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Facts & seasons',
          fields: [
            {
              name: 'facts',
              type: 'group',
              fields: [t('eyebrow'), t('headingLead'), t('headingAccent'), ta('body'), kvItems('Fact')],
            },
            {
              name: 'seasons',
              type: 'group',
              fields: [
                t('eyebrow'),
                t('headingLead'),
                t('headingAccent'),
                ta('body'),
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Season', plural: 'Seasons' },
                  fields: [
                    t('span', { required: true }),
                    t('name', { required: true }),
                    ta('body'),
                    {
                      name: 'best',
                      type: 'array',
                      labels: { singular: 'Tag', plural: 'Best for' },
                      fields: [t('text', { required: true })],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tours & CTA',
          fields: [
            {
              name: 'tours',
              type: 'group',
              admin: { description: 'Heading for the curated Rwanda tours grid (tours come from the Tours collection).' },
              fields: [
                t('eyebrow'),
                t('titleLead'),
                t('titleAccent'),
                t('titleRest'),
                ta('body'),
                {
                  type: 'row',
                  fields: [
                    t('ctaLabel', { admin: { width: '50%' } }),
                    t('ctaHref', { admin: { width: '50%' } }),
                  ],
                },
              ],
            },
            {
              name: 'finalCta',
              type: 'group',
              label: 'Final call-to-action',
              fields: [t('eyebrow'), t('titleLight'), t('titleAccent'), ctaRow(1), ctaRow(2)],
            },
          ],
        },
      ],
    },
  ],
};
