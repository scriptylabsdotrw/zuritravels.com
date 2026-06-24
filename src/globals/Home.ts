import type { GlobalConfig } from 'payload';

/* Home page content. Repeatable data that already has its own collection
   (testimonials, partners, press, journal, principles) is NOT duplicated here
   — this global only holds the home page's bespoke copy and feature blocks. */

const kvFields = [
  {
    type: 'row' as const,
    fields: [
      { name: 'k', type: 'text' as const, label: 'Label', required: true, admin: { width: '40%' } },
      { name: 'v', type: 'text' as const, label: 'Value', required: true, admin: { width: '60%' } },
    ],
  },
];

const imagePair = (name: string, label: string) => [
  { name, type: 'upload' as const, relationTo: 'media' as const, label },
  { name: `${name}Url`, type: 'text' as const, admin: { description: 'External image URL fallback.' } },
];

export const Home: GlobalConfig = {
  slug: 'home',
  admin: { description: 'Home page copy, the featured expedition block, and the Rwanda spotlight.' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Announcement & hero',
          fields: [
            {
              name: 'announcement',
              type: 'group',
              label: 'Top announcement bar',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'text', type: 'text' },
                { name: 'cta', type: 'text', label: 'Link label' },
                { name: 'href', type: 'text' },
              ],
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'titleLine1', type: 'text', admin: { description: 'Light weight line 1.' } },
                { name: 'titleLine2', type: 'text', admin: { description: 'Light weight line 2.' } },
                { name: 'titleAccent', type: 'text', admin: { description: 'Bold accent line.' } },
                { name: 'body', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'cta1Label', type: 'text', admin: { width: '50%' } },
                    { name: 'cta1Href', type: 'text', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'cta2Label', type: 'text', admin: { width: '50%' } },
                    { name: 'cta2Href', type: 'text', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Manifesto & philosophy',
          fields: [
            {
              name: 'manifesto',
              type: 'group',
              fields: [
                { name: 'index', type: 'text', admin: { description: 'e.g. “Index · 01”.' } },
                { name: 'label', type: 'text' },
                { name: 'body', type: 'textarea' },
              ],
            },
            {
              name: 'philosophy',
              type: 'group',
              admin: { description: 'Heading for the dark Principles section (the principles themselves live in the Principles collection).' },
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'titleLight', type: 'text' },
                { name: 'titleAccent', type: 'text' },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Featured expedition',
          fields: [
            {
              name: 'featured',
              type: 'group',
              fields: [
                { name: 'eyebrowIndex', type: 'text' },
                { name: 'eyebrowTag', type: 'text' },
                { name: 'imageLabel', type: 'text' },
                ...imagePair('image', 'Image'),
                { name: 'meta', type: 'text' },
                { name: 'titleLine1', type: 'text' },
                { name: 'titleLead', type: 'text', admin: { description: 'Text before the accent, e.g. “in ”.' } },
                { name: 'titleAccent', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'specs', type: 'array', labels: { singular: 'Spec', plural: 'Specs' }, fields: kvFields },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', admin: { width: '50%' } },
                    { name: 'ctaHref', type: 'text', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'tailorLabel', type: 'text', admin: { width: '50%' } },
                    { name: 'tailorHref', type: 'text', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Expeditions list',
          fields: [
            { name: 'expeditionsHeadingBold', type: 'text' },
            { name: 'expeditionsHeadingLight', type: 'text' },
            {
              name: 'expeditions',
              type: 'array',
              labels: { singular: 'Expedition', plural: 'Expeditions' },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'location', type: 'text', admin: { width: '50%' } },
                    { name: 'duration', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'href', type: 'text' },
                ...imagePair('image', 'Thumbnail'),
              ],
            },
          ],
        },
        {
          label: 'Rwanda spotlight',
          fields: [
            {
              name: 'spotlight',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'textarea' },
                { name: 'body', type: 'textarea' },
                { name: 'facts', type: 'array', labels: { singular: 'Fact', plural: 'Facts' }, fields: kvFields },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', admin: { width: '50%' } },
                    { name: 'ctaHref', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'countryLabel', type: 'text' },
                { name: 'countryName', type: 'text' },
                { name: 'countryTag', type: 'text' },
                { name: 'intoreLabel', type: 'text' },
                { name: 'safariLabel', type: 'text' },
                ...imagePair('galleryGorilla', 'Gallery — gorilla'),
                ...imagePair('galleryIntore', 'Gallery — intore'),
                ...imagePair('gallerySafari', 'Gallery — safari'),
              ],
            },
          ],
        },
        {
          label: 'Journal, partners & CTA',
          fields: [
            { name: 'journalHeading', type: 'text' },
            {
              name: 'partners',
              type: 'group',
              admin: { description: 'Heading for the partners marquee (logos live in the Partners collection).' },
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'titleBold', type: 'text' },
                { name: 'titleLight', type: 'text' },
                { name: 'body', type: 'textarea' },
              ],
            },
            {
              name: 'finalCta',
              type: 'group',
              label: 'Final call-to-action',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'titleLight', type: 'text' },
                { name: 'titleAccent', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', admin: { width: '50%' } },
                    { name: 'ctaHref', type: 'text', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'cta2Label', type: 'text', admin: { width: '50%' } },
                    { name: 'cta2Href', type: 'text', admin: { width: '50%' } },
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
