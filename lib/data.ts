/* ────────────────────────────────────────────────────────────
   DATA ACCESS LAYER — Server-only helpers that read from Payload
   and shape rows into the lightweight types the UI consumes.

   Pure types and UI helpers live in `lib/types.ts` (importable from
   client components). This file is server-only.
   ──────────────────────────────────────────────────────────── */

import 'server-only';
import { getPayloadClient } from './payload';
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_DESTINATIONS,
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  DEFAULT_HOME,
  DEFAULT_JOURNAL,
  DEFAULT_SECTIONS,
  DEFAULT_VISIT_RWANDA,
} from './defaults';
import type {
  AboutContent,
  ContactContent,
  Destination,
  DestinationsContent,
  FooterContent,
  HeaderContent,
  HomeContent,
  ItineraryDay,
  JournalContent,
  SectionsContent,
  VisitRwandaContent,
  JournalPost,
  Milestone,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  SocialLink,
  Testimonial,
  Tier,
  Tour,
  TourTheme,
} from './types';

export type {
  AboutContent,
  ContactContent,
  Destination,
  DestinationsContent,
  FooterContent,
  HeaderContent,
  HomeContent,
  ItineraryDay,
  JournalContent,
  SectionsContent,
  VisitRwandaContent,
  JournalPost,
  Milestone,
  Partner,
  PressFeature,
  Principle,
  SiteContent,
  SocialLink,
  Testimonial,
  Tier,
  Tour,
  TourTheme,
} from './types';
export { TIERS, tierMeta, tourTiers } from './types';

/* ─────────── Row → UI shape mappers ─────────── */

const arr = <T extends { id: string | number }>(v: T[] | undefined | null): T[] =>
  Array.isArray(v) ? v : [];

const mediaUrl = (v: unknown): string => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && v !== null && 'url' in v) {
    const url = (v as { url?: string }).url;
    return url ?? '';
  }
  return '';
};

const mapTourRow = (t: any): Tour => ({
  id: t.id,
  slug: t.slug,
  title: t.title,
  duration: t.duration ?? '',
  pace: t.pace ?? 'Moderate',
  group: t.group ?? 'Private',
  category: t.category ?? 'Wildlife',
  summary: t.summary ?? '',
  description: t.description ?? '',
  bestTime: t.bestTime ?? '',
  highlights: arr<{ id: string | number; text: string }>(t.highlights).map((h) => h.text),
  itinerary: arr<{ id: string | number; day: string; title: string; body: string }>(
    t.itinerary,
  ).map((d) => ({ day: d.day, title: d.title, body: d.body })),
  tiers: (t.tiers && t.tiers.length ? t.tiers : ['Luxury', 'Mid range', 'Budget']) as Tier[],
  image: mediaUrl(t.image) || t.imageUrl || '',
  destinationSlug:
    typeof t.destination === 'object' && t.destination !== null
      ? (t.destination as { slug?: string }).slug
      : undefined,
  destinationName:
    typeof t.destination === 'object' && t.destination !== null
      ? (t.destination as { name?: string }).name
      : undefined,
});

const mapDestinationRow = (d: any, tours: Tour[] = []): Destination => ({
  id: d.id,
  slug: d.slug,
  name: d.name,
  tagline: d.tagline ?? '',
  region: d.region ?? '',
  bestTime: d.bestTime ?? '',
  description: d.description ?? '',
  highlights: arr<{ id: string | number; text: string }>(d.highlights).map((h) => h.text),
  signatureLodges: arr<{ id: string | number; name: string }>(d.signatureLodges).map(
    (l) => l.name,
  ),
  image: mediaUrl(d.image) || d.imageUrl || '',
  hero: mediaUrl(d.hero) || d.heroUrl || d.imageUrl || '',
  tours,
});

const mapThemeRow = (t: any): TourTheme => ({
  id: t.id,
  slug: t.slug,
  title: t.title,
  group: t.group,
  tagline: t.tagline ?? '',
  description: t.description ?? '',
  image: mediaUrl(t.image) || t.imageUrl || '',
  hero: mediaUrl(t.hero) || t.heroUrl || t.imageUrl || '',
});

const mapJournalRow = (a: any): JournalPost => ({
  id: a.id,
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt ?? '',
  category: a.category ?? '',
  author: a.author ?? '',
  publishedAt: a.publishedAt ?? '',
  readTime: a.readTime ?? '',
  image: mediaUrl(a.image) || a.imageUrl || '',
  body: a.body ?? null,
});

/* ─────────── Public read API ─────────── */

export const getDestinations = async (): Promise<Destination[]> => {
  const payload = await getPayloadClient();
  const destResult = await payload.find({
    collection: 'destinations',
    limit: 100,
    sort: 'name',
  });

  const tourResult = await payload.find({
    collection: 'tours',
    limit: 500,
    sort: 'title',
    depth: 1,
  });
  const toursByDestination = new Map<string | number, Tour[]>();
  for (const tour of tourResult.docs) {
    const destRef = (tour as any).destination;
    const destId =
      typeof destRef === 'object' && destRef !== null ? destRef.id : destRef;
    const list = toursByDestination.get(destId) ?? [];
    list.push(mapTourRow(tour));
    toursByDestination.set(destId, list);
  }

  return destResult.docs.map((d) =>
    mapDestinationRow(d, toursByDestination.get(d.id) ?? []),
  );
};

export const getDestination = async (
  slug: string,
): Promise<Destination | null> => {
  const payload = await getPayloadClient();
  const destResult = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const dest = destResult.docs[0];
  if (!dest) return null;

  const tourResult = await payload.find({
    collection: 'tours',
    where: { destination: { equals: dest.id } },
    limit: 200,
    sort: 'title',
    depth: 1,
  });
  return mapDestinationRow(dest, tourResult.docs.map(mapTourRow));
};

export const getAllDestinationSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'destinations',
    limit: 100,
    select: { slug: true },
  });
  return result.docs.map((d) => (d as { slug: string }).slug);
};

export const getTours = async (): Promise<Tour[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tours',
    limit: 500,
    sort: 'title',
    depth: 1,
  });
  return result.docs.map(mapTourRow);
};

export const getTour = async (
  destinationSlug: string,
  tourSlug: string,
): Promise<{ destination: Destination; tour: Tour } | null> => {
  const dest = await getDestination(destinationSlug);
  if (!dest) return null;
  const tour = dest.tours.find((t) => t.slug === tourSlug);
  if (!tour) return null;
  return { destination: dest, tour };
};

export const getTourThemes = async (): Promise<TourTheme[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    limit: 50,
    sort: 'title',
  });
  return result.docs.map(mapThemeRow);
};

export const getTourTheme = async (
  slug: string,
): Promise<TourTheme | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ? mapThemeRow(result.docs[0]) : null;
};

export const getToursByTheme = async (
  themeId: number | string,
): Promise<Tour[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tours',
    where: { themes: { contains: themeId } },
    limit: 200,
    sort: 'title',
    depth: 1,
  });
  return result.docs.map(mapTourRow);
};

export const getAllThemeSlugs = async (): Promise<string[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'tour-themes',
    limit: 50,
    select: { slug: true },
  });
  return result.docs.map((d) => (d as { slug: string }).slug);
};

export const getJournalPosts = async (): Promise<JournalPost[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'journal',
    limit: 100,
    sort: '-publishedAt',
  });
  return result.docs.map(mapJournalRow);
};

export const getJournalPost = async (
  slug: string,
): Promise<JournalPost | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'journal',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ? mapJournalRow(result.docs[0]) : null;
};

/* ─────────── Testimonials ─────────── */

const mapTestimonialRow = (t: any): Testimonial => ({
  id: t.id,
  quote: t.quote ?? '',
  attribution: t.attribution ?? '',
  context: t.context ?? '',
  image: mediaUrl(t.image),
  featured: Boolean(t.featured),
});

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'testimonials',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapTestimonialRow);
};

export const getFeaturedTestimonial = async (): Promise<Testimonial | null> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'testimonials',
    where: { featured: { equals: true } },
    limit: 1,
    sort: 'order',
  });
  return result.docs[0] ? mapTestimonialRow(result.docs[0]) : null;
};

/* ─────────── Partners ─────────── */

const mapPartnerRow = (p: any): Partner => ({
  id: p.id,
  name: p.name ?? '',
  logo: mediaUrl(p.logo) || p.logoUrl || '',
  url: p.url ?? '',
});

export const getPartners = async (): Promise<Partner[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'partners',
    limit: 100,
    sort: 'order',
  });
  return result.docs.map(mapPartnerRow);
};

/* ─────────── Press features ─────────── */

const mapPressRow = (p: any): PressFeature => ({
  id: p.id,
  name: p.name ?? '',
  url: p.url ?? '',
});

export const getPressFeatures = async (): Promise<PressFeature[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'press-features',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapPressRow);
};

/* ─────────── Principles ─────────── */

const mapPrincipleRow = (p: any): Principle => ({
  id: p.id,
  number: p.number ?? '',
  title: p.title ?? '',
  body: p.body ?? '',
  group: p.group ?? 'both',
});

export const getPrinciples = async (
  group?: 'home' | 'about',
): Promise<Principle[]> => {
  const payload = await getPayloadClient();
  const where = group
    ? { group: { in: [group, 'both'] } }
    : undefined;
  const result = await payload.find({
    collection: 'principles',
    where,
    limit: 20,
    sort: 'order',
  });
  return result.docs.map(mapPrincipleRow);
};

/* ─────────── Milestones ─────────── */

const mapMilestoneRow = (m: any): Milestone => ({
  id: m.id,
  year: m.year ?? '',
  title: m.title ?? '',
  body: m.body ?? '',
});

export const getMilestones = async (): Promise<Milestone[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'milestones',
    limit: 50,
    sort: 'order',
  });
  return result.docs.map(mapMilestoneRow);
};

/* ─────────── SiteContent global ─────────── */

export const getSiteContent = async (): Promise<SiteContent> => {
  const payload = await getPayloadClient();
  const result = (await payload.findGlobal({ slug: 'site-content' })) as any;
  return {
    /* Hero images: prefer uploaded Media, fall back to text URL */
    homeHeroImage: mediaUrl(result?.homeHeroImage) || result?.homeHeroImageUrl || '',
    aboutHeroImage: mediaUrl(result?.aboutHeroImage) || result?.aboutHeroImageUrl || '',
    visitRwandaHeroImage:
      mediaUrl(result?.visitRwandaHeroImage) || result?.visitRwandaHeroImageUrl || '',
    /* Stats */
    foundedYear: result?.foundedYear ?? '',
    countries: result?.countries ?? '',
    travellersHosted: result?.travellersHosted ?? '',
    curatedLodges: result?.curatedLodges ?? '',
    mountainGorillas: result?.mountainGorillas ?? '',
    gorillaFamilies: result?.gorillaFamilies ?? '',
    nationalParks: result?.nationalParks ?? '',
    hills: result?.hills ?? '',
    /* Studio */
    studioAddress: result?.studioAddress ?? '',
    studioEmail: result?.studioEmail ?? '',
    studioPhone: result?.studioPhone ?? '',
    studioHours: result?.studioHours ?? '',
    studioMapsUrl: result?.studioMapsUrl ?? '',
    /* About */
    aboutManifesto: result?.aboutManifesto ?? '',
    studioBlurb: result?.studioBlurb ?? '',
    /* Integrations & extras */
    whatsappNumber: result?.whatsappNumber ?? '',
    whatsappMessage: result?.whatsappMessage ?? '',
    bookingStatus: result?.bookingStatus ?? '',
  };
};

/* ─────────── Header global ─────────── */

export const getHeader = async (): Promise<HeaderContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'header' })) as any;

  const nav = arr<any>(g?.nav)
    .map((n) => ({ label: n.label ?? '', href: n.href ?? '', isMega: Boolean(n.isMega) }))
    .filter((n) => n.label);

  const megaFeatured = arr<any>(g?.megaFeatured).map((c) => ({
    eyebrow: c.eyebrow ?? '',
    title: c.title ?? '',
    href: c.href ?? '',
    blurb: c.blurb ?? '',
    image: mediaUrl(c.image) || c.imageUrl || '',
  }));

  const megaLists = arr<any>(g?.megaLists).map((l) => ({
    title: l.title ?? '',
    items: arr<any>(l.items).map((it) => ({ label: it.label ?? '', href: it.href ?? '' })),
  }));

  return {
    ctaLabel: g?.ctaLabel || DEFAULT_HEADER.ctaLabel,
    ctaLabelShort: g?.ctaLabelShort || DEFAULT_HEADER.ctaLabelShort,
    ctaHref: g?.ctaHref || DEFAULT_HEADER.ctaHref,
    nav: nav.length ? nav : DEFAULT_HEADER.nav,
    megaFeatured: megaFeatured.length ? megaFeatured : DEFAULT_HEADER.megaFeatured,
    megaLists: megaLists.length ? megaLists : DEFAULT_HEADER.megaLists,
  };
};

/* ─────────── Home global ─────────── */

export const getHome = async (): Promise<HomeContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'home' })) as any;
  const D = DEFAULT_HOME;
  const pick = <T>(v: T | undefined | null | '', d: T): T =>
    v === undefined || v === null || v === '' ? d : v;
  const img = (node: any, key: string, d: string): string =>
    mediaUrl(node?.[key]) || node?.[`${key}Url`] || d;

  const a = g?.announcement ?? {};
  const h = g?.hero ?? {};
  const m = g?.manifesto ?? {};
  const ph = g?.philosophy ?? {};
  const f = g?.featured ?? {};
  const s = g?.spotlight ?? {};
  const p = g?.partners ?? {};
  const fc = g?.finalCta ?? {};

  const expeditions = arr<any>(g?.expeditions).map((e, i) => ({
    title: e.title ?? '',
    location: e.location ?? '',
    duration: e.duration ?? '',
    href: e.href ?? '',
    image: img(e, 'image', D.expeditions[i]?.image ?? ''),
  }));
  const specs = arr<any>(f.specs).map((r) => ({ k: r.k ?? '', v: r.v ?? '' }));
  const facts = arr<any>(s.facts).map((r) => ({ k: r.k ?? '', v: r.v ?? '' }));

  return {
    announcement: {
      label: pick(a.label, D.announcement.label),
      text: pick(a.text, D.announcement.text),
      cta: pick(a.cta, D.announcement.cta),
      href: pick(a.href, D.announcement.href),
    },
    hero: {
      eyebrow: pick(h.eyebrow, D.hero.eyebrow),
      titleLine1: pick(h.titleLine1, D.hero.titleLine1),
      titleLine2: pick(h.titleLine2, D.hero.titleLine2),
      titleAccent: pick(h.titleAccent, D.hero.titleAccent),
      body: pick(h.body, D.hero.body),
      cta1Label: pick(h.cta1Label, D.hero.cta1Label),
      cta1Href: pick(h.cta1Href, D.hero.cta1Href),
      cta2Label: pick(h.cta2Label, D.hero.cta2Label),
      cta2Href: pick(h.cta2Href, D.hero.cta2Href),
    },
    manifesto: {
      index: pick(m.index, D.manifesto.index),
      label: pick(m.label, D.manifesto.label),
      body: pick(m.body, D.manifesto.body),
    },
    featured: {
      eyebrowIndex: pick(f.eyebrowIndex, D.featured.eyebrowIndex),
      eyebrowTag: pick(f.eyebrowTag, D.featured.eyebrowTag),
      imageLabel: pick(f.imageLabel, D.featured.imageLabel),
      image: img(f, 'image', D.featured.image),
      meta: pick(f.meta, D.featured.meta),
      titleLine1: pick(f.titleLine1, D.featured.titleLine1),
      titleLead: pick(f.titleLead, D.featured.titleLead),
      titleAccent: pick(f.titleAccent, D.featured.titleAccent),
      body: pick(f.body, D.featured.body),
      specs: specs.length ? specs : D.featured.specs,
      ctaLabel: pick(f.ctaLabel, D.featured.ctaLabel),
      ctaHref: pick(f.ctaHref, D.featured.ctaHref),
      tailorLabel: pick(f.tailorLabel, D.featured.tailorLabel),
      tailorHref: pick(f.tailorHref, D.featured.tailorHref),
    },
    expeditionsHeadingBold: pick(g?.expeditionsHeadingBold, D.expeditionsHeadingBold),
    expeditionsHeadingLight: pick(g?.expeditionsHeadingLight, D.expeditionsHeadingLight),
    expeditions: expeditions.length ? expeditions : D.expeditions,
    philosophy: {
      eyebrow: pick(ph.eyebrow, D.philosophy.eyebrow),
      titleLight: pick(ph.titleLight, D.philosophy.titleLight),
      titleAccent: pick(ph.titleAccent, D.philosophy.titleAccent),
      body: pick(ph.body, D.philosophy.body),
    },
    spotlight: {
      eyebrow: pick(s.eyebrow, D.spotlight.eyebrow),
      heading: pick(s.heading, D.spotlight.heading),
      body: pick(s.body, D.spotlight.body),
      facts: facts.length ? facts : D.spotlight.facts,
      ctaLabel: pick(s.ctaLabel, D.spotlight.ctaLabel),
      ctaHref: pick(s.ctaHref, D.spotlight.ctaHref),
      galleryGorilla: img(s, 'galleryGorilla', D.spotlight.galleryGorilla),
      galleryIntore: img(s, 'galleryIntore', D.spotlight.galleryIntore),
      gallerySafari: img(s, 'gallerySafari', D.spotlight.gallerySafari),
      countryLabel: pick(s.countryLabel, D.spotlight.countryLabel),
      countryName: pick(s.countryName, D.spotlight.countryName),
      countryTag: pick(s.countryTag, D.spotlight.countryTag),
      intoreLabel: pick(s.intoreLabel, D.spotlight.intoreLabel),
      safariLabel: pick(s.safariLabel, D.spotlight.safariLabel),
    },
    journalHeading: pick(g?.journalHeading, D.journalHeading),
    partners: {
      eyebrow: pick(p.eyebrow, D.partners.eyebrow),
      titleBold: pick(p.titleBold, D.partners.titleBold),
      titleLight: pick(p.titleLight, D.partners.titleLight),
      body: pick(p.body, D.partners.body),
    },
    finalCta: {
      eyebrow: pick(fc.eyebrow, D.finalCta.eyebrow),
      titleLight: pick(fc.titleLight, D.finalCta.titleLight),
      titleAccent: pick(fc.titleAccent, D.finalCta.titleAccent),
      ctaLabel: pick(fc.ctaLabel, D.finalCta.ctaLabel),
      ctaHref: pick(fc.ctaHref, D.finalCta.ctaHref),
      cta2Label: pick(fc.cta2Label, D.finalCta.cta2Label),
      cta2Href: pick(fc.cta2Href, D.finalCta.cta2Href),
    },
  };
};

/* ─────────── About global ─────────── */

/* Merge scalar (string) fields of a CMS group over its defaults: any empty /
   missing field falls back to the default. Array & image fields are handled
   separately by the caller. */
const strMerge = <T extends Record<string, any>>(node: any, def: T, skip: string[] = []): T => {
  const out: any = { ...def };
  for (const k of Object.keys(def)) {
    if (skip.includes(k)) continue;
    const v = node?.[k];
    if (typeof def[k] === 'string') out[k] = v === undefined || v === null || v === '' ? def[k] : v;
  }
  return out;
};

export const getAbout = async (): Promise<AboutContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'about' })) as any;
  const D = DEFAULT_ABOUT;
  const list = <T>(node: any, key: string, map: (x: any) => T, def: T[]): T[] => {
    const a = arr<any>(node?.[key]).map(map);
    return a.length ? a : def;
  };
  const img = (node: any, key: string, d: string): string =>
    mediaUrl(node?.[key]) || node?.[`${key}Url`] || d;

  return {
    hero: strMerge(g?.hero, D.hero),
    intro: strMerge(g?.intro, D.intro),
    story: {
      ...strMerge(g?.story, D.story, ['image']),
      image: img(g?.story, 'image', D.story.image),
    },
    expertise: {
      ...strMerge(g?.expertise, D.expertise, ['items']),
      items: list(
        g?.expertise,
        'items',
        (x) => ({ n: x.n ?? '', title: x.title ?? '', body: x.body ?? '' }),
        D.expertise.items,
      ),
    },
    principles: strMerge(g?.principles, D.principles),
    differentiators: {
      ...strMerge(g?.differentiators, D.differentiators, ['items']),
      items: list(
        g?.differentiators,
        'items',
        (x) => ({ title: x.title ?? '', body: x.body ?? '' }),
        D.differentiators.items,
      ),
    },
    team: {
      ...strMerge(g?.team, D.team, ['members']),
      members: list(
        g?.team,
        'members',
        (x) => ({ name: x.name ?? '', role: x.role ?? '', bio: x.bio ?? '' }),
        D.team.members,
      ),
    },
    conservation: {
      ...strMerge(g?.conservation, D.conservation, ['image', 'impact']),
      image: img(g?.conservation, 'image', D.conservation.image),
      impact: list(
        g?.conservation,
        'impact',
        (x) => ({ value: x.value ?? '', label: x.label ?? '' }),
        D.conservation.impact,
      ),
    },
    milestones: strMerge(g?.milestones, D.milestones),
    studio: {
      ...strMerge(g?.studio, D.studio, ['image']),
      image: img(g?.studio, 'image', D.studio.image),
    },
    faq: {
      ...strMerge(g?.faq, D.faq, ['items']),
      items: list(
        g?.faq,
        'items',
        (x) => ({ q: x.q ?? '', a: x.a ?? '' }),
        D.faq.items,
      ),
    },
    finalCta: strMerge(g?.finalCta, D.finalCta),
  };
};

/* ─────────── Destinations / Contact / Journal page globals ─────────── */

export const getDestinationsPage = async (): Promise<DestinationsContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'destinations-page' })) as any;
  const D = DEFAULT_DESTINATIONS;
  const pick = (v: any, d: string) => (v === undefined || v === null || v === '' ? d : v);
  return {
    hero: strMerge(g?.hero, D.hero),
    stats: strMerge(g?.stats, D.stats),
    eastRegion: strMerge(g?.eastRegion, D.eastRegion),
    beyondRegion: strMerge(g?.beyondRegion, D.beyondRegion),
    featuredLabel: pick(g?.featuredLabel, D.featuredLabel),
    indexEyebrow: pick(g?.indexEyebrow, D.indexEyebrow),
    indexTitle: pick(g?.indexTitle, D.indexTitle),
    finalCta: strMerge(g?.finalCta, D.finalCta),
  };
};

export const getContact = async (): Promise<ContactContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'contact' })) as any;
  return strMerge(g, DEFAULT_CONTACT);
};

export const getJournalPage = async (): Promise<JournalContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'journal-page' })) as any;
  const D = DEFAULT_JOURNAL;
  const pick = (v: any, d: string) => (v === undefined || v === null || v === '' ? d : v);
  return {
    eyebrow: pick(g?.eyebrow, D.eyebrow),
    titleLight: pick(g?.titleLight, D.titleLight),
    titleAccent: pick(g?.titleAccent, D.titleAccent),
    intro: pick(g?.intro, D.intro),
    filterLabel: pick(g?.filterLabel, D.filterLabel),
    stats: strMerge(g?.stats, D.stats),
    newsletter: strMerge(g?.newsletter, D.newsletter),
  };
};

/* ─────────── Sections global (Method / Story / Voices) ─────────── */

export const getSections = async (): Promise<SectionsContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'sections' })) as any;
  const D = DEFAULT_SECTIONS;
  const img = (node: any, key: string, d: string): string =>
    mediaUrl(node?.[key]) || node?.[`${key}Url`] || d;

  const m = g?.method ?? {};
  const s = g?.story ?? {};
  const v = g?.voices ?? {};

  const pillars = arr<any>(m.pillars).map((p) => ({
    n: p.n ?? '',
    label: p.label ?? '',
    title: p.title ?? '',
    body: p.body ?? '',
  }));
  const chapters = arr<any>(s.chapters).map((c, i) => ({
    year: c.year ?? '',
    chapter: c.chapter ?? '',
    title: c.title ?? '',
    body: c.body ?? '',
    image: img(c, 'image', D.story.chapters[i]?.image ?? ''),
    statValue: c.statValue ?? '',
    statLabel: c.statLabel ?? '',
  }));
  const items = arr<any>(v.items).map((x) => ({
    name: x.name ?? '',
    role: x.role ?? '',
    quote: x.quote ?? '',
  }));

  return {
    method: {
      ...strMerge(m, D.method, ['pillars', 'image1', 'image2']),
      image1: img(m, 'image1', D.method.image1),
      image2: img(m, 'image2', D.method.image2),
      pillars: pillars.length ? pillars : D.method.pillars,
    },
    story: {
      ...strMerge(s, D.story, ['chapters']),
      chapters: chapters.length ? chapters : D.story.chapters,
    },
    voices: {
      ...strMerge(v, D.voices, ['items']),
      items: items.length ? items : D.voices.items,
    },
  };
};

/* ─────────── Visit Rwanda global ─────────── */

export const getVisitRwanda = async (): Promise<VisitRwandaContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'visit-rwanda' })) as any;
  const D = DEFAULT_VISIT_RWANDA;
  const img = (node: any, key: string, d: string): string =>
    mediaUrl(node?.[key]) || node?.[`${key}Url`] || d;
  const texts = (v: any): string[] => arr<any>(v).map((x) => x.text ?? '').filter(Boolean);

  const pillars = arr<any>(g?.pillars).map((p, i) => ({
    eyebrow: p.eyebrow ?? '',
    title: p.title ?? '',
    body: p.body ?? '',
    bullets: texts(p.bullets),
    alt: p.alt ?? '',
    image: img(p, 'image', D.pillars[i]?.image ?? ''),
  }));

  const placeCategories = arr<any>(g?.placeCategories).map((c, i) => ({
    eyebrow: c.eyebrow ?? '',
    title: c.title ?? '',
    tagline: c.tagline ?? '',
    description: c.description ?? '',
    alt: c.alt ?? '',
    image: img(c, 'image', D.placeCategories[i]?.image ?? ''),
    places: arr<any>(c.places).map((pl) => ({
      name: pl.name ?? '',
      location: pl.location ?? '',
      note: pl.note ?? '',
    })),
  }));

  const factItems = arr<any>(g?.facts?.items).map((x) => ({ k: x.k ?? '', v: x.v ?? '' }));
  const seasonItems = arr<any>(g?.seasons?.items).map((s) => ({
    span: s.span ?? '',
    name: s.name ?? '',
    body: s.body ?? '',
    best: texts(s.best),
  }));

  return {
    hero: strMerge(g?.hero, D.hero),
    manifesto: strMerge(g?.manifesto, D.manifesto),
    pillarsHeader: strMerge(g?.pillarsHeader, D.pillarsHeader),
    pillars: pillars.length ? pillars : D.pillars,
    directory: strMerge(g?.directory, D.directory),
    placeCategories: placeCategories.length ? placeCategories : D.placeCategories,
    facts: {
      ...strMerge(g?.facts, D.facts, ['items']),
      items: factItems.length ? factItems : D.facts.items,
    },
    seasons: {
      ...strMerge(g?.seasons, D.seasons, ['items']),
      items: seasonItems.length ? seasonItems : D.seasons.items,
    },
    tours: strMerge(g?.tours, D.tours),
    finalCta: strMerge(g?.finalCta, D.finalCta),
  };
};

/* ─────────── Footer global ─────────── */

export const getFooter = async (): Promise<FooterContent> => {
  const payload = await getPayloadClient();
  const g = (await payload.findGlobal({ slug: 'footer' })) as any;

  const navGroups = arr<any>(g?.navGroups).map((grp) => ({
    title: grp.title ?? '',
    links: arr<any>(grp.links).map((l) => ({ label: l.label ?? '', href: l.href ?? '' })),
  }));

  const socials = arr<any>(g?.socials)
    .map((s) => ({ platform: s.platform, url: s.url ?? '' }))
    .filter((s): s is SocialLink => Boolean(s.platform && s.url));

  return {
    blurb: g?.blurb || DEFAULT_FOOTER.blurb,
    navGroups: navGroups.length ? navGroups : DEFAULT_FOOTER.navGroups,
    socialHandle: g?.socialHandle || DEFAULT_FOOTER.socialHandle,
    socials: socials.length ? socials : DEFAULT_FOOTER.socials,
    copyright: g?.copyright || DEFAULT_FOOTER.copyright,
    tagline: g?.tagline || DEFAULT_FOOTER.tagline,
  };
};
