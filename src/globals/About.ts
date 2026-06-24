import type { GlobalConfig } from 'payload';

/* About page content. Principles, milestones, partners and testimonials keep
   their own collections — this global holds the page's bespoke copy plus the
   expertise / differentiators / team / FAQ / impact lists. */

const t = (name: string, opts: Record<string, unknown> = {}) =>
  ({ name, type: 'text' as const, ...opts });
const ta = (name: string, opts: Record<string, unknown> = {}) =>
  ({ name, type: 'textarea' as const, ...opts });
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
const heading = [t('headingLead', { admin: { description: 'Light text before the bold accent.' } }), t('headingAccent', { admin: { description: 'Bold accent.' } })];

export const About: GlobalConfig = {
  slug: 'about',
  admin: { description: 'About page copy and lists (expertise, team, differentiators, FAQ, impact).' },
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
              fields: [t('eyebrow'), t('titleLight'), t('titleAccent'), ta('body'), ctaRow(1), ctaRow(2)],
            },
            {
              name: 'intro',
              type: 'group',
              fields: [
                t('headingLead', { admin: { description: 'Bold lead (e.g. “Zuri Travels”).' } }),
                ta('headingBody', { admin: { description: 'Rest of the intro heading.' } }),
                ta('p1'),
                ta('p2'),
                ctaRow(1),
                ctaRow(2),
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
                ...heading,
                t('captionLabel'),
                t('captionValue'),
                ...image('image'),
                ta('p1'),
                ta('p2'),
                ta('p3'),
              ],
            },
          ],
        },
        {
          label: 'What we craft',
          fields: [
            {
              name: 'expertise',
              type: 'group',
              fields: [
                t('eyebrow'),
                ...heading,
                ta('body'),
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Pillar', plural: 'Pillars' },
                  fields: [t('n', { label: 'Number' }), t('title', { required: true }), ta('body')],
                },
              ],
            },
            {
              name: 'principles',
              type: 'group',
              admin: { description: 'Heading for the Principles section (entries live in the Principles collection).' },
              fields: [t('eyebrow'), t('titleLight'), t('titleAccent'), ta('body')],
            },
          ],
        },
        {
          label: 'Why us & team',
          fields: [
            {
              name: 'differentiators',
              type: 'group',
              fields: [
                t('eyebrow'),
                ...heading,
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Reason', plural: 'Reasons' },
                  fields: [t('title', { required: true }), ta('body')],
                },
              ],
            },
            {
              name: 'team',
              type: 'group',
              fields: [
                t('eyebrow'),
                ...heading,
                ta('body'),
                {
                  name: 'members',
                  type: 'array',
                  labels: { singular: 'Member', plural: 'Team members' },
                  fields: [
                    t('name', { required: true }),
                    t('role'),
                    ta('bio'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Conservation & milestones',
          fields: [
            {
              name: 'conservation',
              type: 'group',
              fields: [
                t('eyebrow'),
                ...heading,
                ta('p1'),
                ta('p2'),
                ...image('image'),
                {
                  name: 'impact',
                  type: 'array',
                  labels: { singular: 'Stat', plural: 'Impact stats' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        t('value', { required: true, admin: { width: '30%' } }),
                        t('label', { required: true, admin: { width: '70%' } }),
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'milestones',
              type: 'group',
              admin: { description: 'Heading for the Milestones timeline (entries live in the Milestones collection).' },
              fields: [t('eyebrow'), ...heading, ta('body')],
            },
            {
              name: 'studio',
              type: 'group',
              label: 'Studio HQ',
              fields: [t('eyebrow'), ...heading, ...image('image')],
            },
          ],
        },
        {
          label: 'FAQ & CTA',
          fields: [
            {
              name: 'faq',
              type: 'group',
              fields: [
                t('eyebrow'),
                ...heading,
                ta('body'),
                {
                  type: 'row',
                  fields: [
                    t('ctaLabel', { admin: { width: '50%' } }),
                    t('ctaHref', { admin: { width: '50%' } }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Question', plural: 'Questions' },
                  fields: [t('q', { label: 'Question', required: true }), ta('a', { label: 'Answer', required: true })],
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
