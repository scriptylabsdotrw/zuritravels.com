/* ────────────────────────────────────────────────────────────
   SEED — Imports existing static data into Payload.
   Upserts by slug: creates new records, updates existing ones to
   stay in sync with the static data files. Run: npm run seed
   ──────────────────────────────────────────────────────────── */

import { getPayload } from 'payload';
import config from '../payload.config';
import { destinations } from '../app/(frontend)/destinations/data';
import { tourCollections } from '../app/(frontend)/tours/data';
import { articles } from '../app/(frontend)/journal/data';
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_DESTINATIONS,
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  DEFAULT_HOME,
  DEFAULT_JOURNAL,
  DEFAULT_SECTIONS,
  DEFAULT_SITE_CONTENT,
  DEFAULT_VISIT_RWANDA,
} from '../lib/defaults';

/* Build a minimal Lexical root from plain text paragraphs (Payload's rich-text needs Lexical JSON). */
const paragraphsToLexical = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'text',
          text,
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      textFormat: 0,
    })),
    direction: 'ltr',
  },
});

export const runSeed = async () => {
  const payload = await getPayload({ config });
  const log = payload.logger;

  /* ─────── 1. Destinations + their tours ─────── */
  log.info('Seeding destinations + tours…');

  for (const dest of destinations) {
    const destData = {
      name: dest.name,
      slug: dest.slug,
      tagline: dest.tagline,
      region: dest.region as
        | 'East Africa'
        | 'Southern Africa'
        | 'Indian Ocean'
        | 'North Africa'
        | 'West Africa',
      bestTime: dest.bestTime,
      description: dest.description,
      imageUrl: dest.image,
      heroUrl: dest.hero,
      highlights: dest.highlights.map((text) => ({ text })),
      signatureLodges: dest.signatureLodges.map((name) => ({ name })),
    };

    const existing = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: dest.slug } },
      limit: 1,
    });

    let destId: number | string;
    if (existing.docs.length) {
      const updated = await payload.update({
        collection: 'destinations',
        id: existing.docs[0].id,
        data: destData,
      });
      destId = updated.id;
      log.info(`  ↻ destination updated: ${dest.name}`);
    } else {
      const created = await payload.create({
        collection: 'destinations',
        data: destData,
      });
      destId = created.id;
      log.info(`  ✓ destination created: ${dest.name}`);
    }

    /* tours within this destination */
    for (const tour of dest.tours) {
      const tourData = {
        title: tour.title,
        slug: tour.slug,
        destination: destId,
        duration: tour.duration,
        pace: tour.pace,
        category: tour.category,
        group: tour.group,
        summary: tour.summary,
        description: tour.description,
        bestTime: tour.bestTime,
        imageUrl: tour.image,
        highlights: tour.highlights.map((text) => ({ text })),
        tiers: (tour.tiers ?? ['Luxury', 'Mid range', 'Budget']) as (
          | 'Luxury'
          | 'Mid range'
          | 'Budget'
        )[],
      };

      const existingTour = await payload.find({
        collection: 'tours',
        where: { slug: { equals: tour.slug } },
        limit: 1,
      });

      if (existingTour.docs.length) {
        await payload.update({
          collection: 'tours',
          id: existingTour.docs[0].id,
          data: tourData,
        });
        log.info(`    ↻ tour updated: ${tour.title}`);
      } else {
        await payload.create({ collection: 'tours', data: tourData });
        log.info(`    ✓ tour created: ${tour.title}`);
      }
    }
  }

  /* ─────── 2. Tour Themes (Special Interest + Groups) ─────── */
  log.info('Seeding tour themes…');
  for (const tc of tourCollections) {
    const themeData = {
      title: tc.title,
      slug: tc.slug,
      group: tc.group,
      tagline: tc.tagline,
      description: tc.description,
    };

    const existing = await payload.find({
      collection: 'tour-themes',
      where: { slug: { equals: tc.slug } },
      limit: 1,
    });

    if (existing.docs.length) {
      await payload.update({
        collection: 'tour-themes',
        id: existing.docs[0].id,
        data: themeData,
      });
      log.info(`  ↻ theme updated: ${tc.title}`);
    } else {
      await payload.create({ collection: 'tour-themes', data: themeData });
      log.info(`  ✓ theme created: ${tc.title}`);
    }
  }

  /* ─────── 3. Journal posts ─────── */
  log.info('Seeding journal posts…');
  for (const article of articles) {
    const articleData = {
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      author: article.author.name,
      publishedAt: article.publishedAt,
      readTime: article.readTime,
      imageUrl: article.image,
      body: paragraphsToLexical(article.body),
    };

    const existing = await payload.find({
      collection: 'journal',
      where: { slug: { equals: article.slug } },
      limit: 1,
    });

    if (existing.docs.length) {
      await payload.update({
        collection: 'journal',
        id: existing.docs[0].id,
        data: articleData,
      });
      log.info(`  ↻ article updated: ${article.title}`);
    } else {
      await payload.create({ collection: 'journal', data: articleData });
      log.info(`  ✓ article created: ${article.title}`);
    }
  }

  /* ─────── 4. Globals: site chrome (header, footer, settings) ─────── */
  log.info('Seeding globals (header, footer, site content)…');

  await payload.updateGlobal({
    slug: 'header',
    data: {
      ctaLabel: DEFAULT_HEADER.ctaLabel,
      ctaLabelShort: DEFAULT_HEADER.ctaLabelShort,
      ctaHref: DEFAULT_HEADER.ctaHref,
      nav: DEFAULT_HEADER.nav,
      megaFeatured: DEFAULT_HEADER.megaFeatured.map((c) => ({
        eyebrow: c.eyebrow,
        title: c.title,
        href: c.href,
        blurb: c.blurb,
        imageUrl: c.image,
      })),
      megaLists: DEFAULT_HEADER.megaLists,
    } as any,
  });
  log.info('  ↻ header');

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      blurb: DEFAULT_FOOTER.blurb,
      navGroups: DEFAULT_FOOTER.navGroups,
      socialHandle: DEFAULT_FOOTER.socialHandle,
      socials: DEFAULT_FOOTER.socials,
      copyright: DEFAULT_FOOTER.copyright,
      tagline: DEFAULT_FOOTER.tagline,
    } as any,
  });
  log.info('  ↻ footer');

  /* Only fill studio-contact / integration fields; leave any other
     site-content fields (hero images, stats) untouched. */
  await payload.updateGlobal({ slug: 'site-content', data: DEFAULT_SITE_CONTENT as any });
  log.info('  ↻ site-content (studio contact + integrations)');

  const H = DEFAULT_HOME;
  await payload.updateGlobal({
    slug: 'home',
    data: {
      announcement: H.announcement,
      hero: H.hero,
      manifesto: H.manifesto,
      philosophy: H.philosophy,
      featured: {
        eyebrowIndex: H.featured.eyebrowIndex,
        eyebrowTag: H.featured.eyebrowTag,
        imageLabel: H.featured.imageLabel,
        imageUrl: H.featured.image,
        meta: H.featured.meta,
        titleLine1: H.featured.titleLine1,
        titleLead: H.featured.titleLead,
        titleAccent: H.featured.titleAccent,
        body: H.featured.body,
        specs: H.featured.specs,
        ctaLabel: H.featured.ctaLabel,
        ctaHref: H.featured.ctaHref,
        tailorLabel: H.featured.tailorLabel,
        tailorHref: H.featured.tailorHref,
      },
      expeditionsHeadingBold: H.expeditionsHeadingBold,
      expeditionsHeadingLight: H.expeditionsHeadingLight,
      expeditions: H.expeditions.map((e) => ({
        title: e.title,
        location: e.location,
        duration: e.duration,
        href: e.href,
        imageUrl: e.image,
      })),
      spotlight: {
        eyebrow: H.spotlight.eyebrow,
        heading: H.spotlight.heading,
        body: H.spotlight.body,
        facts: H.spotlight.facts,
        ctaLabel: H.spotlight.ctaLabel,
        ctaHref: H.spotlight.ctaHref,
        countryLabel: H.spotlight.countryLabel,
        countryName: H.spotlight.countryName,
        countryTag: H.spotlight.countryTag,
        intoreLabel: H.spotlight.intoreLabel,
        safariLabel: H.spotlight.safariLabel,
        galleryGorillaUrl: H.spotlight.galleryGorilla,
        galleryIntoreUrl: H.spotlight.galleryIntore,
        gallerySafariUrl: H.spotlight.gallerySafari,
      },
      journalHeading: H.journalHeading,
      partners: H.partners,
      finalCta: H.finalCta,
    } as any,
  });
  log.info('  ↻ home');

  const A = DEFAULT_ABOUT;
  const stripImg = <T extends { image: string }>(o: T) => {
    const { image, ...rest } = o;
    return { ...rest, imageUrl: image };
  };
  await payload.updateGlobal({
    slug: 'about',
    data: {
      hero: A.hero,
      intro: A.intro,
      story: stripImg(A.story),
      expertise: A.expertise,
      principles: A.principles,
      differentiators: A.differentiators,
      team: A.team,
      conservation: stripImg(A.conservation),
      milestones: A.milestones,
      studio: stripImg(A.studio),
      faq: A.faq,
      finalCta: A.finalCta,
    } as any,
  });
  log.info('  ↻ about');

  const VR = DEFAULT_VISIT_RWANDA;
  const toText = (arr: string[]) => arr.map((text) => ({ text }));
  await payload.updateGlobal({
    slug: 'visit-rwanda',
    data: {
      hero: VR.hero,
      manifesto: VR.manifesto,
      pillarsHeader: VR.pillarsHeader,
      pillars: VR.pillars.map((p) => ({
        eyebrow: p.eyebrow,
        title: p.title,
        body: p.body,
        alt: p.alt,
        imageUrl: p.image,
        bullets: toText(p.bullets),
      })),
      directory: VR.directory,
      placeCategories: VR.placeCategories.map((c) => ({
        eyebrow: c.eyebrow,
        title: c.title,
        tagline: c.tagline,
        description: c.description,
        alt: c.alt,
        imageUrl: c.image,
        places: c.places,
      })),
      facts: VR.facts,
      seasons: {
        eyebrow: VR.seasons.eyebrow,
        headingLead: VR.seasons.headingLead,
        headingAccent: VR.seasons.headingAccent,
        body: VR.seasons.body,
        items: VR.seasons.items.map((s) => ({
          span: s.span,
          name: s.name,
          body: s.body,
          best: toText(s.best),
        })),
      },
      tours: VR.tours,
      finalCta: VR.finalCta,
    } as any,
  });
  log.info('  ↻ visit-rwanda');

  const S = DEFAULT_SECTIONS;
  await payload.updateGlobal({
    slug: 'sections',
    data: {
      method: {
        eyebrow: S.method.eyebrow,
        titleL1: S.method.titleL1,
        titleL2: S.method.titleL2,
        titleL3: S.method.titleL3,
        body: S.method.body,
        quote: S.method.quote,
        quoteAttribution: S.method.quoteAttribution,
        image1Url: S.method.image1,
        image2Url: S.method.image2,
        pillars: S.method.pillars,
      },
      story: {
        eyebrow: S.story.eyebrow,
        titleL1: S.story.titleL1,
        titleL2: S.story.titleL2,
        chapters: S.story.chapters.map((c) => ({
          year: c.year,
          chapter: c.chapter,
          title: c.title,
          body: c.body,
          imageUrl: c.image,
          statValue: c.statValue,
          statLabel: c.statLabel,
        })),
      },
      voices: S.voices,
    } as any,
  });
  log.info('  ↻ sections');

  await payload.updateGlobal({ slug: 'destinations-page', data: DEFAULT_DESTINATIONS as any });
  log.info('  ↻ destinations-page');
  await payload.updateGlobal({ slug: 'contact', data: DEFAULT_CONTACT as any });
  log.info('  ↻ contact');
  await payload.updateGlobal({ slug: 'journal-page', data: DEFAULT_JOURNAL as any });
  log.info('  ↻ journal-page');

  log.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log.info('✓ Seed complete.');

  const [d, t, th, j] = await Promise.all([
    payload.count({ collection: 'destinations' }),
    payload.count({ collection: 'tours' }),
    payload.count({ collection: 'tour-themes' }),
    payload.count({ collection: 'journal' }),
  ]);
  return {
    destinations: d.totalDocs,
    tours: t.totalDocs,
    themes: th.totalDocs,
    journal: j.totalDocs,
  };
};

/* CLI entry: only auto-run when this file is executed directly (e.g.
   `tsx scripts/seed.ts`), not when imported (e.g. from a route handler). */
const invokedPath = process.argv[1]?.replace(/\\/g, '/') ?? '';
if (invokedPath.includes('scripts/seed')) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
    });
}
