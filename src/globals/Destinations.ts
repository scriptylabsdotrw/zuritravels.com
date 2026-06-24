import type { GlobalConfig } from 'payload';

/* Destinations index page copy. The country cards themselves come from the
   Destinations collection — this global only holds the page's headings. */

const t = (name: string) => ({ name, type: 'text' as const });
const ta = (name: string) => ({ name, type: 'textarea' as const });
const cta = (n: number) => ({
  type: 'row' as const,
  fields: [
    { name: `cta${n}Label`, type: 'text' as const, admin: { width: '50%' } },
    { name: `cta${n}Href`, type: 'text' as const, admin: { width: '50%' } },
  ],
});

export const DestinationsPage: GlobalConfig = {
  slug: 'destinations-page',
  admin: { description: 'Destinations index page — hero, region headings, and the closing CTA.' },
  access: { read: () => true },
  fields: [
    { name: 'hero', type: 'group', fields: [t('eyebrow'), t('titleLight'), t('titleAccent'), ta('body')] },
    {
      name: 'stats',
      type: 'group',
      label: 'Hero stat labels',
      fields: [t('countriesLabel'), t('toursLabel'), t('lodgesLabel'), t('foundedLabel'), t('foundedValue')],
    },
    { name: 'eastRegion', type: 'group', fields: [t('eyebrow'), t('titleBold'), t('titleLight')] },
    { name: 'beyondRegion', type: 'group', fields: [t('eyebrow'), t('titleBold'), t('titleLight')] },
    t('featuredLabel'),
    t('indexEyebrow'),
    t('indexTitle'),
    { name: 'finalCta', type: 'group', fields: [t('eyebrow'), t('titleLight'), t('titleAccent'), cta(1), cta(2)] },
  ],
};
