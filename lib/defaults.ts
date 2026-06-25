/* ────────────────────────────────────────────────────────────
   DEFAULT CONTENT — plain data (no server-only imports).

   Single source of truth for the content that used to be hardcoded
   in the React components. Used in two places:
     1. lib/data.ts — as fallbacks when a CMS global/field is empty.
     2. scripts/seed.ts — to pre-populate the globals so the admin
        opens already filled in and the site renders identically.
   ──────────────────────────────────────────────────────────── */

import type {
  AboutContent,
  ContactContent,
  DestinationsContent,
  FooterContent,
  HeaderContent,
  HomeContent,
  JournalContent,
  SectionsContent,
  VisitRwandaContent,
} from './types';

export const DEFAULT_HEADER: HeaderContent = {
  ctaLabel: 'Inquire Now',
  ctaLabelShort: 'Inquire',
  ctaHref: '/contact',
  nav: [
    { label: 'About', href: '/about', isMega: false },
    { label: 'Tours', href: '', isMega: true },
    { label: 'Destinations', href: '/destinations', isMega: false },
    { label: 'Visit Rwanda', href: '/visit-rwanda', isMega: false },
    { label: 'Journal', href: '/journal', isMega: false },
  ],
  megaFeatured: [
    {
      eyebrow: 'Our Speciality',
      title: 'Rwanda',
      href: '/destinations/rwanda',
      blurb: 'Gorillas, glassy lakes, mist-laced hills — and the country we call home.',
      image: '/images/2h-media-FKcRXTOHG8M-unsplash.jpg',
    },
    {
      eyebrow: '',
      title: 'EAC Destinations',
      href: '/destinations',
      blurb: 'Cross-border adventures across Uganda, Kenya, Tanzania, Burundi & the DRC.',
      image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
    },
  ],
  megaLists: [
    {
      title: 'Special Interest',
      items: [
        { label: 'Philanthropy', href: '/tours/philanthropy' },
        { label: 'Arts & Design', href: '/tours/arts-design' },
        { label: 'Honeymoon', href: '/tours/honeymoon' },
        { label: 'History', href: '/tours/history' },
        { label: 'Active', href: '/tours/active' },
        { label: 'Volunteering', href: '/tours/volunteering' },
        { label: 'LGBTQ+', href: '/tours/lgbtq' },
      ],
    },
    {
      title: 'Groups',
      items: [
        { label: 'Church & Mission', href: '/tours/church-mission' },
        { label: 'Schools', href: '/tours/schools' },
        { label: 'Leadership', href: '/tours/leadership' },
        { label: 'Immersion Programs', href: '/tours/immersion' },
        { label: 'Corporate', href: '/tours/corporate' },
      ],
    },
  ],
};

export const DEFAULT_FOOTER: FooterContent = {
  blurb:
    'Privately designed safaris, gorilla encounters, cultural journeys, and coastal escapes — crafted in Africa, for travellers who measure a trip in stories, not stops.',
  navGroups: [
    {
      title: 'Tours',
      links: [
        { label: 'Honeymoon', href: '/tours/honeymoon' },
        { label: 'Active', href: '/tours/active' },
        { label: 'History', href: '/tours/history' },
        { label: 'Schools', href: '/tours/schools' },
        { label: 'Corporate', href: '/tours/corporate' },
      ],
    },
    {
      title: 'Destinations',
      links: [
        { label: 'Rwanda', href: '/destinations/rwanda' },
        { label: 'Tanzania', href: '/destinations/tanzania' },
        { label: 'Kenya', href: '/destinations/kenya' },
        { label: 'Uganda', href: '/destinations/uganda' },
        { label: 'Botswana', href: '/destinations/botswana' },
        { label: 'Zanzibar', href: '/destinations/zanzibar' },
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'About', href: '/#about' },
        { label: 'Journal', href: '/#journal' },
        { label: 'Press', href: '/#press' },
      ],
    },
  ],
  socialHandle: 'zuritravels',
  socials: [
    { platform: 'Instagram', url: 'https://instagram.com/zuritravels' },
    { platform: 'Facebook', url: 'https://facebook.com/zuritravels' },
    { platform: 'YouTube', url: 'https://youtube.com/@zuritravels' },
    { platform: 'TikTok', url: 'https://tiktok.com/@zuritravels' },
    { platform: 'X', url: 'https://x.com/zuritravels' },
  ],
  copyright: 'Zuri Travels · All rights reserved.',
  tagline: 'Crafted in Kigali. Designed for the world.',
};

export const DEFAULT_HOME: HomeContent = {
  announcement: {
    label: 'Visit Rwanda',
    text: 'Land of a thousand hills',
    cta: 'Discover',
    href: '/visit-rwanda',
  },
  hero: {
    eyebrow: 'Volcanoes National Park · Rwanda',
    titleLine1: 'Crafting soulful',
    titleLine2: 'African',
    titleAccent: 'expeditions.',
    body: 'Bespoke gorilla treks. Curated journeys through the wild, the cultural, and the serene. From mountain gorillas to Indian Ocean shores, experience Africa through the eyes of local experts — since 2018.',
    cta1Label: 'Select Destinations',
    cta1Href: '/destinations',
    cta2Label: 'Inquire Now',
    cta2Href: '/contact',
  },
  manifesto: {
    index: 'Index · 01',
    label: 'The studio',
    body: 'We design quiet, considered African journeys for travellers who measure a trip in stories, not stops — built by guides, conservationists, and designers who happen to call the wilderness home.',
  },
  featured: {
    eyebrowIndex: 'Featured · 01 / 04',
    eyebrowTag: 'Signature',
    imageLabel: 'Rwanda · Uganda',
    image: '/images/simone-dinoia-x7Aizp5YZX0-unsplash.jpg',
    meta: '7 days · Bisate + Bwindi Lodge',
    titleLine1: 'Gorilla Trekking,',
    titleLead: 'in ',
    titleAccent: 'two forests',
    body: 'Two countries, two forests, two completely different ways of meeting the gorillas — paired with the finest forest lodges in East Africa and led by guides who have tracked these families for nearly two decades.',
    specs: [
      { k: 'Permits', v: '02 included' },
      { k: 'Lodge', v: 'Bisate' },
      { k: 'From', v: '$8,600 / guest' },
    ],
    ctaLabel: 'The route',
    ctaHref: '/destinations/rwanda/tours/volcanoes-gorilla-encounter',
    tailorLabel: 'Tailor this journey',
    tailorHref: '/contact',
  },
  expeditionsHeadingBold: 'Four Signature',
  expeditionsHeadingLight: 'Encounters.',
  expeditions: [
    {
      title: 'Gorilla Trekking',
      location: 'Rwanda · Uganda',
      duration: '7 days',
      image: '/images/2h-media-PIU27R-xL04-unsplash.jpg',
      href: '/destinations/rwanda',
    },
    {
      title: 'Great Migration Safari',
      location: 'Serengeti · Maasai Mara',
      duration: '10 days',
      image: '/images/34417507774_a20f845d51_b.jpg',
      href: '/destinations/tanzania',
    },
    {
      title: 'Cultural Heritage Journey',
      location: 'Rwanda · Tanzania · Kenya',
      duration: '9 days',
      image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
      href: '/destinations/rwanda',
    },
    {
      title: 'Indian Ocean Escape',
      location: 'Zanzibar · Lamu',
      duration: '8 days',
      image: '/images/nyungwewaterfall.jpg',
      href: '/destinations/zanzibar',
    },
  ],
  philosophy: {
    eyebrow: 'Index · 02 — Philosophy',
    titleLight: 'Quiet',
    titleAccent: 'commitments.',
    body: 'The things we will not compromise on, written down so we are held to them.',
  },
  spotlight: {
    eyebrow: 'Index · 03 — Spotlight',
    heading: 'The land of a thousand hills — and one thoroughly modern capital.',
    body: 'We have based our studio in Kigali since 2018. Rwanda is the easiest country in Africa to enter, the safest country we work in, and home to mountain gorillas, lake villages, canopy walks, intore drummers, and a memorial that quietly rewrites what a country can do with its own story.',
    facts: [
      { k: 'Best time', v: 'Jun – Sep · Dec – Feb' },
      { k: 'Visa', v: 'On arrival · USD 50' },
      { k: 'Lodge', v: 'Bisate · Singita Kwitonda' },
      { k: 'Currency', v: 'RWF · USD accepted' },
    ],
    ctaLabel: 'Discover Rwanda',
    ctaHref: '/destinations/rwanda',
    galleryGorilla: '/images/2h-media-FKcRXTOHG8M-unsplash.jpg',
    galleryIntore: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
    gallerySafari: '/images/34417507774_a20f845d51_b.jpg',
    countryLabel: 'Spotlight country',
    countryName: 'Rwanda',
    countryTag: 'Gorillas · Volcanoes NP',
    intoreLabel: 'Intore · Culture',
    safariLabel: 'Safari · Akagera',
  },
  journalHeading: 'Field journal.',
  partners: {
    eyebrow: 'Lodge & camp partners',
    titleBold: 'The finest names',
    titleLight: 'in African hospitality.',
    body: 'Twenty years of relationships with the lodges, camps, and houses that quietly raise the standard across the continent.',
  },
  finalCta: {
    eyebrow: 'Begin',
    titleLight: 'When you’re ready, we’ll design the journey of a lifetime —',
    titleAccent: 'one quiet conversation at a time.',
    ctaLabel: 'Inquire Now',
    ctaHref: '/contact',
    cta2Label: 'Browse destinations',
    cta2Href: '/destinations',
  },
};

export const DEFAULT_ABOUT: AboutContent = {
  hero: {
    eyebrow: 'About · Zuri Travels · Kigali',
    titleLight: 'A studio for',
    titleAccent: 'soulful African journeys.',
    body: 'Founded in Kigali in 2018. Owner-led, in country. Quietly opinionated about wildlife, design, and how a holiday should feel.',
    cta1Label: 'Our destinations',
    cta1Href: '/destinations',
    cta2Label: 'Start planning',
    cta2Href: '/contact',
  },
  intro: {
    headingLead: 'Zuri Travels',
    headingBody:
      ' is a Kigali-based travel design studio. We craft privately led safaris, gorilla treks, cultural journeys, and coastal escapes across East Africa — built by the guides, conservationists, and designers who call the wilderness home.',
    p1: 'We do not sell packages. We design journeys — one conversation at a time, measured in stories rather than stops, and never the same way twice.',
    p2: 'Every route is composed by hand around your pace and your curiosities, then carried out by people who live where you travel and have walked every lodge we recommend.',
    cta1Label: 'Explore destinations',
    cta1Href: '/destinations',
    cta2Label: 'Start planning',
    cta2Href: '/contact',
  },
  story: {
    eyebrow: 'Index · 02 — Our story',
    headingLead: 'It began with one route, and ',
    headingAccent: 'one belief.',
    captionLabel: 'Since',
    captionValue: '2018',
    image: '/images/2h-media-FKcRXTOHG8M-unsplash.jpg',
    p1: 'Zuri Travels began in 2018 with a single gorilla-trekking route through Volcanoes National Park — and the conviction that Africa is best experienced through the eyes of the people who know it best.',
    p2: 'What started as one guide and one mountain has grown into a studio of local guides, designers, and conservation partners working across six countries — and thousands of travellers who measure their trip in stories, not stops.',
    p3: 'We have stayed small on purpose. Owner-led, careful, and quietly obsessed with the difference between a good trip and an unforgettable one.',
  },
  expertise: {
    eyebrow: 'Index · 03 — What we craft',
    headingLead: 'Four ways to ',
    headingAccent: 'meet Africa.',
    body: 'Each journey is a blend, never a template — composed from the disciplines we know most deeply.',
    items: [
      {
        n: '01',
        title: 'Gorilla & Primate Treks',
        body: 'Mountain gorillas in Rwanda and Uganda, golden monkeys, and chimpanzee tracking — permits secured, the finest forest lodges, and trackers who have known these families for years.',
      },
      {
        n: '02',
        title: 'Wildlife Safaris',
        body: 'The Great Migration, Big Five plains game, and remote private conservancies across the Serengeti, Maasai Mara, and Akagera — guided by naturalists who read the land like a book.',
      },
      {
        n: '03',
        title: 'Cultural Immersion',
        body: 'Intore drummers, community-led village visits, the Kigali Genocide Memorial, and the living stories of East Africa — encountered with care, depth, and respect.',
      },
      {
        n: '04',
        title: 'Coastal Escapes',
        body: 'Indian Ocean finales on Zanzibar and Lamu — barefoot luxury, dhow sailing, and slow, sun-warmed days to close a journey the way it deserves to end.',
      },
    ],
  },
  principles: {
    eyebrow: 'Index · 04 — Principles',
    titleLight: 'Quiet',
    titleAccent: 'commitments.',
    body: 'The things we will not compromise on, written down so we are held to them.',
  },
  differentiators: {
    eyebrow: 'Index · 05 — Why Zuri Travels',
    headingLead: 'The difference is ',
    headingAccent: 'in the details.',
    items: [
      {
        title: 'Owner-led, in country',
        body: 'Founded and run from Kigali since 2018 — not a call centre an ocean away. The people who design your trip live where you travel.',
      },
      {
        title: 'Guides born to the land',
        body: 'Lifelong trackers and naturalists who have followed the same gorilla families and migration herds for the better part of two decades.',
      },
      {
        title: 'Conservation-funded',
        body: 'Every itinerary is built on lodges and permits that fund anti-poaching, habitat protection, and community tourism.',
      },
      {
        title: 'Genuinely bespoke',
        body: 'No fixed departures and no convoys. Each route is composed by hand around your pace, your curiosities, and your budget.',
      },
      {
        title: 'On-trip, around the clock',
        body: 'A real person on the ground for the length of your journey — reachable day or night, ready to adjust the plan as the day unfolds.',
      },
      {
        title: 'Honest, transparent pricing',
        body: 'Three clear tiers — Luxury, Mid-range and Budget — with no hidden mark-ups and nothing about the wildlife or the care reduced.',
      },
    ],
  },
  team: {
    eyebrow: 'Index · 06 — The studio',
    headingLead: 'The people behind ',
    headingAccent: 'the journey.',
    body: 'Small, owner-led, and entirely in country — a team of guides and designers who live where you travel.',
    members: [
      {
        name: 'Aimé K.',
        role: 'Founder & Lead Designer',
        bio: 'Born in Musanze, beneath the volcanoes. Started Zuri Travels with one gorilla route and one belief about how Africa should be experienced.',
      },
      {
        name: 'Grace U.',
        role: 'Head of Guiding',
        bio: 'A naturalist who has tracked Volcanoes National Park’s gorilla families for over fifteen years and trains every guide we send into the field.',
      },
      {
        name: 'Daniel M.',
        role: 'Conservation & Community',
        bio: 'Builds the partnerships that route a share of every journey back into anti-poaching units and the villages along the way.',
      },
      {
        name: 'Sarah N.',
        role: 'Guest Experience',
        bio: 'The voice on the other end of the line — from first enquiry to the moment you land home, making sure every detail simply works.',
      },
    ],
  },
  conservation: {
    eyebrow: 'Index · 07 — Conservation & community',
    headingLead: 'Travel that ',
    headingAccent: 'gives back.',
    p1: 'We believe the wild places we love should still be here for the next generation of travellers. So every itinerary is built on lodges, parks, and permits that fund anti-poaching, habitat protection, and community-led tourism.',
    p2: 'It is not an add-on or a marketing line. It is the reason the studio exists, and the quiet test every journey has to pass.',
    image: '/images/2h-media-PIU27R-xL04-unsplash.jpg',
    impact: [
      { value: '100%', label: 'Permits fund gorilla conservation' },
      { value: '6', label: 'Community partnerships across the region' },
      { value: '1%', label: 'Of every journey to anti-poaching units' },
    ],
  },
  milestones: {
    eyebrow: 'Index · 08 — Milestones',
    headingLead: 'Written ',
    headingAccent: 'by hand.',
    body: 'A short history of the studio — small enough to read in a minute, careful enough to keep.',
  },
  studio: {
    eyebrow: 'Index · 09 — Studio',
    headingLead: 'Headquartered in ',
    headingAccent: 'Kigali.',
    image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
  },
  faq: {
    eyebrow: 'Index · 10 — Questions',
    headingLead: 'Good to ',
    headingAccent: 'know.',
    body: 'Still wondering about something? A real person is one message away.',
    ctaLabel: 'Ask us anything',
    ctaHref: '/contact',
    items: [
      {
        q: 'When is the best time to travel?',
        a: 'Gorilla trekking is excellent year-round, with drier trails from June–September and December–February. The Great Migration peaks in the Serengeti and Mara between July and October. We tailor timing to exactly what you want to see.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'For gorilla permits and the best lodges, we recommend six to twelve months ahead — especially for peak season. That said, we have built remarkable last-minute journeys; reach out and we will tell you honestly what is possible.',
      },
      {
        q: 'Are your trips suitable for families?',
        a: 'Yes. We design journeys for couples, solo travellers, multi-generational families, and small private groups. Gorilla trekking has a minimum age of 15, but there is extraordinary wildlife and culture for every age.',
      },
      {
        q: 'How does pricing work?',
        a: 'Every itinerary is quoted across three clear tiers — Luxury, Mid-range and Budget — so you can choose the spend that fits. Pricing is transparent, with no hidden mark-ups, and the same expert guiding throughout.',
      },
      {
        q: 'Is it safe?',
        a: 'Rwanda is among the safest countries on the continent, and we work only with vetted lodges, vehicles, and guides. A Zuri Travels team member is reachable for the entire length of your trip.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Begin',
    titleLight: 'Tell us what you have in mind.',
    titleAccent: 'We’ll design the rest.',
    ctaLabel: 'Inquire Now',
    ctaHref: '/contact',
    cta2Label: 'Browse destinations',
    cta2Href: '/destinations',
  },
};

export const DEFAULT_VISIT_RWANDA: VisitRwandaContent = {
  hero: {
    badge: 'Visit Rwanda · Official partner',
    titleLight: 'Visit',
    titleAccent: 'Rwanda.',
    body: 'A small, considered country of forested volcanoes, glassy lakes, and the world’s most carefully protected primates — the land of a thousand hills.',
    cta1Label: 'Plan your Rwanda trip',
    cta1Href: '/contact',
    cta2Label: 'View Rwanda tours',
    cta2Href: '/destinations/rwanda',
  },
  manifesto: {
    eyebrowTop: 'Why Rwanda',
    eyebrowIndex: 'Index · 01',
    body: 'Few countries are so easy to fall in love with. Rwanda is the safest country we work in, the easiest to enter, and home to one of the most quietly impressive conservation stories on the continent — written in a single generation.',
  },
  pillarsHeader: {
    eyebrow: 'Index · 02 — The six Rwandas',
    titleBold: 'Six countries',
    titleLight: 'inside one.',
    body: 'Most travellers see two — gorillas and Kigali. The Rwanda we design is six places, stitched together at the pace of the road.',
  },
  pillars: [
    {
      eyebrow: 'Pillar · 01',
      title: 'The Gorillas of Volcanoes',
      body: 'Volcanoes National Park is the only place on Earth where you can trek to a habituated family of mountain gorillas in the morning and be home to a five-star bed by dusk. Twelve families. Eight permits per family per day. The most carefully protected wildlife encounter on the continent.',
      bullets: [
        'Habituated family treks — Susa, Agashya, Sabyinyo and more',
        'Golden monkey tracking in the same forest',
        'Karisimbi & Bisoke summit hikes',
        'Conservation researcher access at Karisoke',
      ],
      image: '/images/2h-media-FKcRXTOHG8M-unsplash.jpg',
      alt: 'A young mountain gorilla in Volcanoes National Park',
    },
    {
      eyebrow: 'Pillar · 02',
      title: 'Intore, the Dance of Heroes',
      body: 'Rwandan culture is not staged for visitors — it is alive in every village. The Intore dance was once a warrior’s preparation for battle; today it is a celebration of memory and pride. We host private performances, drumming workshops, and quiet evenings with elders who carry the country’s oral history.',
      bullets: [
        'Private Intore performances in Musanze',
        'Drum workshops with Inanga and Ingoma masters',
        'Hosted dinners with Rwandan historians',
        'Kinyarwanda language tasters',
      ],
      image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
      alt: 'Rural Rwandan landscape — the green country of Intore tradition',
    },
    {
      eyebrow: 'Pillar · 03',
      title: 'Akagera — The Big Five Return',
      body: 'A long, slow, deeply considered rewilding has brought the Big Five back to Rwanda. Lions returned in 2015, rhinos in 2017, and Akagera is now one of Africa’s most quietly impressive conservation stories — savanna, lake, papyrus swamp, and very few other vehicles.',
      bullets: [
        'Game drives across savanna and lake plains',
        'Boat safari on Lake Ihema',
        'Behind-the-scenes ranger and canine unit access',
        'Magashi Camp — the only premium lodge in the park',
      ],
      image: '/images/49454310358_c82de1407b_b.jpg',
      alt: 'Giraffe in Akagera National Park, Rwanda',
    },
    {
      eyebrow: 'Pillar · 04',
      title: 'Nyungwe — Africa’s Oldest Rainforest',
      body: 'A million-year-old montane forest in the southwest — 1,068 plant species, 322 bird species, 13 primates including the largest chimpanzee community in East Africa. Africa’s only suspended canopy walk swings 70 metres above the forest floor.',
      bullets: [
        'Chimpanzee tracking — habituated communities',
        'Africa’s only suspended canopy walk',
        'Colobus monkey super-groups (300+ individuals)',
        'Tea estate visits and forest waterfalls',
      ],
      image: '/images/nyungwewaterfall.jpg',
      alt: 'Nyungwe rainforest canopy in Rwanda',
    },
    {
      eyebrow: 'Pillar · 05',
      title: 'Lake Kivu — A Quiet Pause',
      body: 'A freshwater lake the size of a small sea, on the western border with the DRC. Coffee villages, fishing pirogues that sing at dawn, twin-island retreats, and the gentle pace that every good Rwandan itinerary needs in the middle.',
      bullets: [
        'Kibuye and Gisenyi lakeside stays',
        'Coffee co-operative visits and washing-station tours',
        'Pirogue boat charters at golden hour',
        'Congo Nile Trail — walking or cycling',
      ],
      image: '/images/49454780251_beb36dda2f_b.jpg',
      alt: 'A traditional pirogue on Lake Kivu, Rwanda',
    },
    {
      eyebrow: 'Pillar · 06',
      title: 'Kigali — Africa, Quietly Reimagined',
      body: 'The cleanest capital in Africa, the safest country on the continent for solo travellers, and a design-led city worth its own three days. Memorial, museum, market, ateliers, hosted dinners with curators — Kigali is where every Rwandan journey should begin and end.',
      bullets: [
        'Kigali Genocide Memorial — privately hosted',
        'Inema Arts Centre & emerging studios',
        'Niyo Cultural Centre and Caplaki market',
        'Hosted dinners with writers and curators',
      ],
      image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
      alt: 'Kigali, the capital of Rwanda',
    },
  ],
  directory: {
    eyebrow: 'Index · 03 — Directory',
    titleLight: 'Places to visit,',
    titleBold: 'by theme.',
    body: 'Use this directory to begin a shortlist — every itinerary we design is a slow, considered selection from these places.',
    jumpLabel: 'Jump to',
  },
  placeCategories: [
    {
      eyebrow: 'Theme · 01',
      title: 'Cultural',
      tagline: 'Living tradition — dance, music, craft, royal heritage.',
      description:
        'Rwandan culture is not staged for travellers; it is alive in every village, household and Sunday afternoon. These are the doorways we open for our guests.',
      image: '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
      alt: 'Rwandan cultural life — children at a village window',
      places: [
        { name: 'Intore Dance Performance', location: 'Musanze · Kigali', note: 'The warrior dance of memory and pride — privately performed at lodge or in-village.' },
        { name: "Iby'Iwacu Cultural Village", location: 'Musanze', note: 'A reformed-poacher community model — drumming workshops, traditional cuisine, and host families.' },
        { name: 'Inema Arts Centre', location: 'Kigali', note: "Rwanda's leading contemporary art atelier — studio visits with the Niyo brothers." },
        { name: 'Niyo Cultural Centre', location: 'Kigali', note: 'Children of Niyo programme, traditional performances, café, gallery.' },
        { name: 'Imigongo Art Studios', location: 'Eastern Province · Rusumo', note: 'Geometric cow-dung art unique to Rwanda — workshops with master artisans.' },
        { name: 'Caplaki Craft Village', location: 'Kigali', note: "The country's artisan market — basketry, wood, Imigongo, weaving." },
      ],
    },
    {
      eyebrow: 'Theme · 02',
      title: 'History & Heritage',
      tagline: 'Pre-colonial kingdoms, royal courts, and the long story.',
      description:
        "The Rwandan story begins long before colonial maps — at the Mwami's court at Rukari, in royal Inyambo cattle, and in the careful keeping of national memory.",
      image: '/images/49454310358_c82de1407b_b.jpg',
      alt: "Rukari, the King's Palace Museum in Nyanza",
      places: [
        { name: "Rukari — King's Palace Museum", location: 'Nyanza', note: "The traditional Mwami's residence — thatched royal palace, Inyambo long-horned cattle, and a quiet hosted tour of pre-colonial kingdom history." },
        { name: 'Ethnographic Museum', location: 'Huye (Butare)', note: 'Formerly the National Museum of Rwanda — the deepest ethnographic collection on the continent.' },
        { name: 'Rwesero Art Museum', location: 'Nyanza', note: 'Modern and contemporary Rwandan art, housed in a former royal residence.' },
        { name: 'Presidential Palace Museum', location: 'Kanombe, Kigali', note: 'The Habyarimana residence and the preserved wreckage of the 1994 plane on the grounds.' },
        { name: 'Kandt House Museum of Natural History', location: 'Kigali', note: "The colonial-era home of Richard Kandt — Rwanda's natural history and early-20th-century context." },
        { name: "King's Throne & Royal Forest", location: 'Nyanza', note: 'The royal forest beside Rukari, with ancient Erythrina trees planted by successive kings.' },
      ],
    },
    {
      eyebrow: 'Theme · 03',
      title: 'Memory & Remembrance',
      tagline: 'The careful, public way Rwanda holds its own history.',
      description:
        "Rwanda's memorial sites are visited privately, slowly, and always with a hosted guide. They are not optional context — they are the country's most important rooms.",
      image: '/images/2h-media-PIU27R-xL04-unsplash.jpg',
      alt: 'A quiet memorial site in Rwanda',
      places: [
        { name: 'Kigali Genocide Memorial', location: 'Gisozi, Kigali', note: 'The principal national memorial — over 250,000 buried, and a deeply considered educational centre.' },
        { name: 'Murambi Genocide Memorial', location: 'Nyamagabe (Southern)', note: 'The most confronting of the memorials — a former technical school preserved with stark honesty.' },
        { name: 'Nyamata Church Memorial', location: 'Bugesera', note: 'A church preserved exactly as it was found, with belongings and clothing laid out in tribute.' },
        { name: 'Ntarama Church Memorial', location: 'Bugesera', note: 'A second preserved church memorial in the same district — quieter, smaller, equally moving.' },
        { name: 'Bisesero Memorial', location: 'Western Province', note: 'The "Hill of Resistance" — a memorial to those who fought back.' },
        { name: 'Camp Kigali Memorial', location: 'Kigali', note: 'Ten white pillars commemorating the Belgian peacekeepers killed at the start of the genocide.' },
      ],
    },
    {
      eyebrow: 'Theme · 04',
      title: 'Nature & Wildlife',
      tagline: 'Forests, volcanoes, savanna, and the great lakes.',
      description:
        'Four national parks across a country smaller than Belgium — and one of the most diverse one-week wildlife circuits on the continent.',
      image: '/images/35095463862_799645aa4d_b.jpg',
      alt: 'Aerial view of Rwanda — the land of a thousand hills',
      places: [
        { name: 'Volcanoes National Park', location: 'Musanze', note: 'Mountain gorillas, golden monkeys, and the five Virunga summits.' },
        { name: 'Akagera National Park', location: 'Eastern Province', note: 'The Big Five — lions returned in 2015, rhinos in 2017, in a wild lake-and-savanna landscape.' },
        { name: 'Nyungwe National Park', location: 'Southern Province', note: "Africa's oldest rainforest, the canopy walk, 13 primate species and chimpanzees." },
        { name: 'Gishwati-Mukura National Park', location: 'Western Province', note: "Rwanda's newest and smallest park — chimpanzees, golden monkeys, regrowing forest." },
        { name: 'Lake Kivu', location: 'Western border', note: 'A freshwater lake the size of a small sea — coffee villages, pirogues, lakeside lodges.' },
        { name: 'Twin Lakes Burera & Ruhondo', location: 'Musanze', note: 'Mirror lakes beneath the volcanoes — boating, lakeside walks, terraced landscape.' },
      ],
    },
    {
      eyebrow: 'Theme · 05',
      title: 'Modern Rwanda',
      tagline: 'A new African capital you should plan three days for.',
      description:
        "Kigali is one of Africa's most design-led, safest, and walkable capitals — and worth a slow stay before or after the forests.",
      image: '/images/34417507774_a20f845d51_b.jpg',
      alt: 'Modern architecture in Kigali, Rwanda',
      places: [
        { name: 'Kigali Convention Centre', location: 'Kimihurura', note: 'The iconic glass dome — a symbol of the new Kigali, lit each evening.' },
        { name: 'Norrsken House Kigali', location: 'CBD', note: "Pan-African entrepreneurship campus, café, and the city's sharpest co-working room." },
        { name: 'Kimironko Market', location: 'Kimironko', note: 'The everyday market — fabrics, food, life. Best with a local host.' },
        { name: 'Nyamirambo Walking Tour', location: 'Nyamirambo', note: "Hosted walks through Kigali's most multicultural neighbourhood, led by the Nyamirambo Women's Centre." },
        { name: 'Mount Kigali', location: 'Western Kigali', note: 'A 1,853m city hike with panoramic views and a quiet lunch at the top.' },
        { name: 'Kigali Cultural Village', location: 'Rebero', note: 'Traditional dance evenings, food market, and craft stalls — a relaxed Sunday option.' },
      ],
    },
  ],
  facts: {
    eyebrow: 'Index · 04 — Practical',
    headingLead: 'Rwanda ',
    headingAccent: 'at a glance.',
    body: 'Everything you’d ask a friend before you book — the practical details we get asked most.',
    items: [
      { k: 'Capital', v: 'Kigali' },
      { k: 'Population', v: '~13.5 million' },
      { k: 'Languages', v: 'Kinyarwanda · English · French · Swahili' },
      { k: 'Currency', v: 'Rwandan Franc (RWF) · USD widely accepted' },
      { k: 'Visa', v: 'On arrival / e-visa · USD 50' },
      { k: 'Time zone', v: 'Central Africa Time (UTC+2)' },
      { k: 'Climate', v: 'Temperate · 18 – 27 °C year-round' },
      { k: 'Plug', v: 'Type C / J · 230 V · 50 Hz' },
      { k: 'Drive', v: 'Right-hand side · valid licence required' },
      { k: 'Main gateway', v: 'Kigali International (KGL) · 30 min from CBD' },
    ],
  },
  seasons: {
    eyebrow: 'Index · 05 — Seasons',
    headingLead: 'When to ',
    headingAccent: 'visit Rwanda.',
    body: 'Rwanda is a year-round country, but each season has its own personality. Our designers shape every itinerary around the rhythm of the trees, not the brochure.',
    items: [
      { span: 'Jun – Sep', name: 'Long dry season', body: 'The classic, golden-light window. Drier trails into Volcanoes, easier chimp tracking in Nyungwe, prime Akagera game viewing. Lodges fill 8 – 10 months ahead.', best: ['Gorillas', 'Chimps', 'Safari'] },
      { span: 'Oct – Nov', name: 'Short rains', body: 'Short, sharp afternoon rains. Far fewer travellers, deeply photogenic light, lush forest. A favourite of our designers for quieter, more intimate journeys.', best: ['Photography', 'Birding', 'Honeymoon'] },
      { span: 'Dec – Feb', name: 'Short dry season', body: 'The second prime window — warm days, clear skies, festive. Holiday demand is high, so we book this season earliest.', best: ['Gorillas', 'Family travel', 'Festive'] },
      { span: 'Mar – May', name: 'Long rains', body: 'Lush, dramatic, and almost empty. Trails are slippery and treks more demanding, but the photography is unrivalled and lodge rates ease.', best: ['Active travellers', 'Off-peak rates', 'Birding'] },
    ],
  },
  tours: {
    eyebrow: 'Index · 06 — Curated',
    titleLead: 'Our ',
    titleAccent: 'Rwanda',
    titleRest: ' routes.',
    body: 'Each route is a starting point — bring us your dates and we tune the lodges, pace, and order around the way you travel.',
    ctaLabel: 'See all Rwanda tours',
    ctaHref: '/destinations/rwanda',
  },
  finalCta: {
    eyebrow: 'Begin',
    titleLight: 'A privately designed Rwanda journey,',
    titleAccent: 'tuned to the way you travel.',
    ctaLabel: 'Inquire Now',
    ctaHref: '/contact',
    cta2Label: 'Browse Rwanda tours',
    cta2Href: '/destinations/rwanda',
  },
};

export const DEFAULT_SECTIONS: SectionsContent = {
  method: {
    eyebrow: 'The ZuriTravels Method',
    titleL1: 'Four pillars.',
    titleL2: 'One way of travelling',
    titleL3: 'through Africa.',
    body: 'Guides, lodges, design and conservation — composed into a single, considered framework that turns a trip into the journey of a lifetime.',
    quote: 'A great journey isn’t luck. It’s the quiet sum of disciplined choices, made by people who know the ground.',
    quoteAttribution: 'ZuriTravels · Guiding Team',
    image1: 'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?auto=format&fit=crop&w=1200&q=85',
    image2: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?auto=format&fit=crop&w=1200&q=85',
    pillars: [
      { n: '01', label: 'Guides', title: 'Local experts, lifelong trackers', body: 'Every journey is led by guides born to these landscapes — naturalists who have followed the same gorilla families and migration herds for the better part of two decades.' },
      { n: '02', label: 'Lodges', title: 'Hand-picked camps & houses', body: 'We stay only in lodges we have walked ourselves — the finest forest houses, plains camps and island retreats, chosen for craft, conscience and a genuine sense of place.' },
      { n: '03', label: 'Design', title: 'Bespoke, unhurried itineraries', body: 'No fixed departures, no convoys. Each route is composed by hand around your pace and your curiosities — measured in stories, not stops.' },
      { n: '04', label: 'Conservation', title: 'Travel that gives back', body: 'Permits and partnerships that fund anti-poaching, habitat protection and community tourism — so the wild places you visit are still wild for those who follow.' },
    ],
  },
  story: {
    eyebrow: 'Our Story',
    titleL1: 'A studio built by Africa,',
    titleL2: 'for the world.',
    chapters: [
      { year: '2018', chapter: '01', title: 'Founded in Kigali.', body: 'ZuriTravels begins with a single gorilla-trekking route through Volcanoes National Park — and one belief: that Africa is best experienced through the eyes of the guides, trackers and conservationists who call the wilderness home.', image: 'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=1800&q=85', statValue: '1', statLabel: 'Route. One belief.' },
      { year: '2020', chapter: '02', title: 'Across the borders.', body: 'Journeys expand into Tanzania, Kenya and Uganda — building relationships with the finest forest lodges, plains camps and lifelong trackers across East Africa, and a logistics backbone almost no studio has.', image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1800&q=85', statValue: '6', statLabel: 'Countries crafted' },
      { year: '2023', chapter: '03', title: 'Conservation first.', body: 'Every itinerary is built on lodges and parks that fund gorilla conservation and community tourism — travel designed so that the wild places we love are still here for the next generation of travellers.', image: 'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg?auto=compress&cs=tinysrgb&w=1800&q=85', statValue: '100%', statLabel: 'Permits, conservation-funded' },
      { year: 'Today', chapter: '04', title: 'Soulful at scale.', body: 'A studio of local guides and designers, thousands of travellers hosted, and partnerships with the most quietly extraordinary lodges on the continent — the most considered bespoke-travel house in the region.', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1800&q=85', statValue: 'Africa', statLabel: 'Through local eyes' },
    ],
  },
  voices: {
    eyebrow: 'Voices from the journey',
    titleL1: 'Built with the travellers',
    titleL2: 'who trust us with the wild.',
    items: [
      { name: 'Eleanor & James R.', role: 'Gorilla Trek · Volcanoes NP', quote: 'They turned a bucket-list idea into the most considered week of our lives. Every guide, every lodge, every quiet morning was chosen with intention — and it showed.' },
      { name: 'Priya M.', role: 'Great Migration · Serengeti', quote: 'We have travelled with the big names. None of them know the ground like this. Our guide read the plains like a book, and we were always in exactly the right place.' },
      { name: 'The Okonkwo Family', role: 'Cultural Heritage · Rwanda', quote: 'Unhurried, soulful, and deeply human. ZuriTravels designed a journey our children still talk about — and gave back to the communities we passed through.' },
    ],
  },
};

export const DEFAULT_DESTINATIONS: DestinationsContent = {
  hero: {
    eyebrow: 'Destinations · Index',
    titleLight: 'Six countries.',
    titleAccent: 'One way to travel.',
    body: 'We work where we know — deeply. Every itinerary moves between countries at the pace of the landscape, not the calendar.',
  },
  stats: {
    countriesLabel: 'Countries',
    toursLabel: 'Curated tours',
    lodgesLabel: 'Signature lodges',
    foundedLabel: 'Founded · Kigali',
    foundedValue: '2018',
  },
  eastRegion: { eyebrow: 'Region · 01', titleBold: 'East', titleLight: 'Africa' },
  beyondRegion: { eyebrow: 'Region · 02', titleBold: 'Beyond', titleLight: 'East Africa' },
  featuredLabel: 'Featured · Studio HQ',
  indexEyebrow: 'Quick index',
  indexTitle: 'All destinations.',
  finalCta: {
    eyebrow: 'Begin',
    titleLight: 'Pick a country.',
    titleAccent: 'We’ll design the rest.',
    cta1Label: 'Inquire Now',
    cta1Href: '/contact',
    cta2Label: 'Visit Rwanda',
    cta2Href: '/visit-rwanda',
  },
};

export const DEFAULT_CONTACT: ContactContent = {
  eyebrow: 'Inquire now · Configurator',
  titleLight: 'Plan your',
  titleAccent: 'trip.',
  body: 'Select your destination, itinerary, and tier. Share your dates, and a Travel Designer will respond personally within 24 hours. Pure expertise — no templates, no call centres.',
  summaryHeading: 'Your journey so far',
  formFooter: 'We reply personally within 24 hours. No mailing list. Ever.',
  successMessage: 'Thank you. A Travel Designer will reply personally within 24 hours.',
  errorMessage: 'Something went wrong — please email info@zuritravels.com directly.',
};

export const DEFAULT_JOURNAL: JournalContent = {
  eyebrow: 'Journal · Field writing',
  titleLight: 'Long reads',
  titleAccent: 'from the field.',
  intro: 'Slow, hosted writing from our guides, conservationists, and design team. No clickbait, no listicles — the long form of how we actually work, what we’ve learnt, and what the people we travel with notice in the bush.',
  stats: {
    readsLabel: 'Long reads',
    categoriesLabel: 'Categories',
    contributorsValue: '08',
    contributorsLabel: 'Field contributors',
    cadenceValue: 'Monthly',
    cadenceLabel: 'Cadence',
  },
  filterLabel: 'Filter',
  newsletter: {
    eyebrow: 'Field journal',
    titleLight: 'One long read,',
    titleAccent: 'first Tuesday of the month.',
    body: 'No promotions. No newsletter clutter. One quietly considered essay from the field, straight to your inbox.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submitLabel: 'Subscribe',
    successMessage: 'Thank you — you’ll get the next field read in your inbox.',
  },
};

/* Studio contact + integration singletons that live on the `site-content`
   global. Seeded so the chrome (footer, mobile menu, WhatsApp button) has
   real values to show. */
export const DEFAULT_SITE_CONTENT = {
  studioAddress: 'KG 7 Avenue, Kigali — Rwanda',
  studioEmail: 'info@zuritravels.com',
  studioPhone: '+250 783 140 000',
  studioHours: 'Mon – Sat · 08:00 – 18:00 CAT',
  whatsappNumber: '250783140000',
  whatsappMessage: "Hello Zuri Travels — I'd like to plan a private journey.",
  bookingStatus: 'Now booking · Seasons 2026 / 2027',
};
