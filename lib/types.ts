/* ────────────────────────────────────────────────────────────
   Shared types + UI helpers. Importable from both server and client.
   ──────────────────────────────────────────────────────────── */

export type Tier = 'Luxury' | 'Mid range' | 'Budget';
export const TIERS = ['Luxury', 'Mid range', 'Budget'] as const;

export type ItineraryDay = {
  day: string;
  title: string;
  body: string;
};

export type Tour = {
  id: number | string;
  slug: string;
  title: string;
  duration: string;
  pace: 'Easy' | 'Moderate' | 'Active' | 'Expedition';
  group: string;
  category: 'Wildlife' | 'Cultural' | 'Adventure' | 'Coast' | 'Trekking';
  summary: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  bestTime: string;
  tiers: Tier[];
  image: string;
  destinationSlug?: string;
  destinationName?: string;
};

export type Destination = {
  id: number | string;
  slug: string;
  name: string;
  tagline: string;
  region: string;
  bestTime: string;
  image: string;
  hero: string;
  description: string;
  highlights: string[];
  signatureLodges: string[];
  tours: Tour[];
};

export type TourTheme = {
  id: number | string;
  slug: string;
  title: string;
  group: 'Special Interest' | 'Groups';
  tagline: string;
  description: string;
  image: string;
  hero: string;
};

export type JournalPost = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  body: unknown;
};

export type Testimonial = {
  id: number | string;
  quote: string;
  attribution: string;
  context: string;
  image: string;
  featured: boolean;
};

export type Partner = {
  id: number | string;
  name: string;
  logo: string;
  url: string;
};

export type PressFeature = {
  id: number | string;
  name: string;
  url: string;
};

export type Principle = {
  id: number | string;
  number: string;
  title: string;
  body: string;
  group: 'home' | 'about' | 'both';
};

export type Milestone = {
  id: number | string;
  year: string;
  title: string;
  body: string;
};

/* ─────────── Header / Footer (site chrome) ─────────── */

export type NavItem = { label: string; href: string; isMega: boolean };
export type MegaFeatured = {
  eyebrow?: string;
  title: string;
  href: string;
  blurb: string;
  image: string;
};
export type MegaList = { title: string; items: { label: string; href: string }[] };

export type HeaderContent = {
  ctaLabel: string;
  ctaLabelShort: string;
  ctaHref: string;
  nav: NavItem[];
  megaFeatured: MegaFeatured[];
  megaLists: MegaList[];
};

export type KV = { k: string; v: string };

/* ─────────── Home page ─────────── */

export type HomeExpedition = {
  title: string;
  location: string;
  duration: string;
  image: string;
  href: string;
};

export type HomeContent = {
  announcement: { label: string; text: string; cta: string; href: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    body: string;
    cta1Label: string;
    cta1Href: string;
    cta2Label: string;
    cta2Href: string;
  };
  manifesto: { index: string; label: string; body: string };
  featured: {
    eyebrowIndex: string;
    eyebrowTag: string;
    imageLabel: string;
    image: string;
    meta: string;
    titleLine1: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    specs: KV[];
    ctaLabel: string;
    ctaHref: string;
    tailorLabel: string;
    tailorHref: string;
  };
  expeditionsHeadingBold: string;
  expeditionsHeadingLight: string;
  expeditions: HomeExpedition[];
  philosophy: { eyebrow: string; titleLight: string; titleAccent: string; body: string };
  spotlight: {
    eyebrow: string;
    heading: string;
    body: string;
    facts: KV[];
    ctaLabel: string;
    ctaHref: string;
    galleryGorilla: string;
    galleryIntore: string;
    gallerySafari: string;
    countryLabel: string;
    countryName: string;
    countryTag: string;
    intoreLabel: string;
    safariLabel: string;
  };
  journalHeading: string;
  partners: { eyebrow: string; titleBold: string; titleLight: string; body: string };
  finalCta: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label: string;
    cta2Href: string;
  };
};

/* ─────────── About page ─────────── */

export type AboutExpertise = { n: string; title: string; body: string };
export type AboutDiff = { title: string; body: string };
export type AboutTeamMember = { name: string; role: string; bio: string };
export type AboutImpact = { value: string; label: string };
export type AboutFaq = { q: string; a: string };

export type AboutContent = {
  hero: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    body: string;
    cta1Label: string;
    cta1Href: string;
    cta2Label: string;
    cta2Href: string;
  };
  intro: {
    headingLead: string;
    headingBody: string;
    p1: string;
    p2: string;
    cta1Label: string;
    cta1Href: string;
    cta2Label: string;
    cta2Href: string;
  };
  story: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    captionLabel: string;
    captionValue: string;
    image: string;
    p1: string;
    p2: string;
    p3: string;
  };
  expertise: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    items: AboutExpertise[];
  };
  principles: { eyebrow: string; titleLight: string; titleAccent: string; body: string };
  differentiators: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    items: AboutDiff[];
  };
  team: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    members: AboutTeamMember[];
  };
  conservation: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    p1: string;
    p2: string;
    image: string;
    impact: AboutImpact[];
  };
  milestones: { eyebrow: string; headingLead: string; headingAccent: string; body: string };
  studio: { eyebrow: string; headingLead: string; headingAccent: string; image: string };
  faq: {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    items: AboutFaq[];
  };
  finalCta: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label: string;
    cta2Href: string;
  };
};

/* ─────────── Visit Rwanda page ─────────── */

export type VRPlace = { name: string; location: string; note: string };
export type VRCategory = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  places: VRPlace[];
};
export type VRPillar = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  alt: string;
};
export type VRSeason = { span: string; name: string; body: string; best: string[] };

export type VisitRwandaContent = {
  hero: {
    badge: string;
    titleLight: string;
    titleAccent: string;
    body: string;
    cta1Label: string;
    cta1Href: string;
    cta2Label: string;
    cta2Href: string;
  };
  manifesto: { eyebrowTop: string; eyebrowIndex: string; body: string };
  pillarsHeader: { eyebrow: string; titleBold: string; titleLight: string; body: string };
  pillars: VRPillar[];
  directory: { eyebrow: string; titleLight: string; titleBold: string; body: string; jumpLabel: string };
  placeCategories: VRCategory[];
  facts: { eyebrow: string; headingLead: string; headingAccent: string; body: string; items: KV[] };
  seasons: { eyebrow: string; headingLead: string; headingAccent: string; body: string; items: VRSeason[] };
  tours: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleRest: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  finalCta: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label: string;
    cta2Href: string;
  };
};

/* ─────────── Home section components (Method / Story / Voices) ─────────── */

export type MethodPillar = { n: string; label: string; title: string; body: string };
export type StoryChapter = {
  year: string;
  chapter: string;
  title: string;
  body: string;
  image: string;
  statValue: string;
  statLabel: string;
};
export type VoiceItem = { name: string; role: string; quote: string };

export type SectionsContent = {
  method: {
    eyebrow: string;
    titleL1: string;
    titleL2: string;
    titleL3: string;
    body: string;
    quote: string;
    quoteAttribution: string;
    image1: string;
    image2: string;
    pillars: MethodPillar[];
  };
  story: {
    eyebrow: string;
    titleL1: string;
    titleL2: string;
    chapters: StoryChapter[];
  };
  voices: {
    eyebrow: string;
    titleL1: string;
    titleL2: string;
    items: VoiceItem[];
  };
};

/* ─────────── Destinations page ─────────── */

export type DestinationsContent = {
  hero: { eyebrow: string; titleLight: string; titleAccent: string; body: string };
  stats: {
    countriesLabel: string;
    toursLabel: string;
    lodgesLabel: string;
    foundedLabel: string;
    foundedValue: string;
  };
  eastRegion: { eyebrow: string; titleBold: string; titleLight: string };
  beyondRegion: { eyebrow: string; titleBold: string; titleLight: string };
  featuredLabel: string;
  indexEyebrow: string;
  indexTitle: string;
  finalCta: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    cta1Label: string;
    cta1Href: string;
    cta2Label: string;
    cta2Href: string;
  };
};

/* ─────────── Contact page ─────────── */

export type ContactContent = {
  eyebrow: string;
  titleLight: string;
  titleAccent: string;
  body: string;
  summaryHeading: string;
  formFooter: string;
  successMessage: string;
  errorMessage: string;
};

/* ─────────── Journal page ─────────── */

export type JournalContent = {
  eyebrow: string;
  titleLight: string;
  titleAccent: string;
  intro: string;
  stats: {
    readsLabel: string;
    categoriesLabel: string;
    contributorsValue: string;
    contributorsLabel: string;
    cadenceValue: string;
    cadenceLabel: string;
  };
  filterLabel: string;
  newsletter: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitLabel: string;
    successMessage: string;
  };
};

export type SocialPlatform = 'Instagram' | 'Facebook' | 'YouTube' | 'TikTok' | 'X';
export type SocialLink = { platform: SocialPlatform; url: string };
export type FooterGroup = { title: string; links: { label: string; href: string }[] };

export type FooterContent = {
  blurb: string;
  navGroups: FooterGroup[];
  socialHandle: string;
  socials: SocialLink[];
  copyright: string;
  tagline: string;
};

export type SiteContent = {
  /* Hero images (per-page background) */
  homeHeroImage: string;
  aboutHeroImage: string;
  visitRwandaHeroImage: string;
  /* Home hero stats */
  foundedYear: string;
  countries: string;
  travellersHosted: string;
  curatedLodges: string;
  /* Visit Rwanda stats */
  mountainGorillas: string;
  gorillaFamilies: string;
  nationalParks: string;
  hills: string;
  /* Studio contact */
  studioAddress: string;
  studioEmail: string;
  studioPhone: string;
  studioHours: string;
  studioMapsUrl: string;
  /* About copy */
  aboutManifesto: string;
  studioBlurb: string;
  /* Integrations & extras */
  whatsappNumber: string;
  whatsappMessage: string;
  bookingStatus: string;
};

/* ─────────── Tier metadata (UI-only, not in DB) ─────────── */

export const tierMeta: Record<
  Tier,
  { label: string; tagline: string; description: string; lodgeStyle: string }
> = {
  Luxury: {
    label: 'Luxury',
    tagline: 'The finest forest and bush lodges, hosted end-to-end.',
    description:
      'Singita, Bisate, One&Only-level lodges. Private vehicles, private guides, private chef moments. Helicopter transfers where they belong. Designed without compromise.',
    lodgeStyle: 'Singita · Bisate · One&Only',
  },
  'Mid range': {
    label: 'Mid range',
    tagline: 'Premium boutique camps, lighter logistics, same expert guides.',
    description:
      'Beautiful boutique camps and lodges with strong character. Shared light-aircraft transfers, private vehicles in-park, the same world-class guides — at a more considered spend.',
    lodgeStyle: 'Wilderness · Asilia · Sanctuary',
  },
  Budget: {
    label: 'Budget',
    tagline: 'Owner-led design at a measured spend.',
    description:
      'Excellent mid-tier lodges chosen by hand, smart group sharing where possible, simpler logistics, and the same people guiding you. Nothing about the wildlife or the care is reduced.',
    lodgeStyle: 'Boutique · Group-friendly',
  },
};

export const tourTiers = (t: Tour): readonly Tier[] =>
  t.tiers && t.tiers.length ? t.tiers : (TIERS as unknown as Tier[]);
