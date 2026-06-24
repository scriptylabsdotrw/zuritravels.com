import type { GlobalConfig } from 'payload';

/* Journal index page copy. Articles come from the Journal collection — this
   global holds the page header, the stat ribbon, and the newsletter block. */

const t = (name: string) => ({ name, type: 'text' as const });
const ta = (name: string) => ({ name, type: 'textarea' as const });

export const JournalPageGlobal: GlobalConfig = {
  slug: 'journal-page',
  admin: { description: 'Journal index page — header, stat ribbon, and the newsletter call-to-action.' },
  access: { read: () => true },
  fields: [
    t('eyebrow'),
    t('titleLight'),
    t('titleAccent'),
    ta('intro'),
    t('filterLabel'),
    {
      name: 'stats',
      type: 'group',
      label: 'Stat ribbon',
      admin: { description: 'Long-reads and category counts are computed automatically; these are the labels and the two manual stats.' },
      fields: [
        t('readsLabel'),
        t('categoriesLabel'),
        t('contributorsValue'),
        t('contributorsLabel'),
        t('cadenceValue'),
        t('cadenceLabel'),
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      fields: [
        t('eyebrow'),
        t('titleLight'),
        t('titleAccent'),
        ta('body'),
        t('emailLabel'),
        t('emailPlaceholder'),
        t('submitLabel'),
        ta('successMessage'),
      ],
    },
  ],
};
