/* ────────────────────────────────────────────────────────────
   MOCK SEED DATA — Destinations & Tours
   When the backend lands, replace this file with a fetch from
   the API (signature stays the same). No prices stored here.
   ──────────────────────────────────────────────────────────── */

/* ────────── Tiers ──────────
   Every tour is available in all three tiers by default.
   Restrict per-tour later by setting `tour.tiers` to a subset. */
export const TIERS = ['Luxury', 'Mid range', 'Budget'] as const;
export type Tier = (typeof TIERS)[number];

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

/* ────────── Includes / Excludes ────────── */
import type { IconName } from '@/components/Icon';

export type TourPerk = { icon: IconName; label: string };

/** Sensible defaults — spread into each tour, then layer custom perks on top. */
export const defaultIncludes: TourPerk[] = [
  { icon: 'guide', label: 'Private guide and host' },
  { icon: 'transport', label: '4×4 vehicle & airport transfers' },
  { icon: 'lodge', label: 'Lodge accommodation in selected tier' },
  { icon: 'meals', label: 'All meals during the itinerary' },
  { icon: 'drinks', label: 'Soft drinks & bottled water' },
  { icon: 'permit', label: 'Park fees & conservation levies' },
  { icon: 'wifi', label: 'WiFi at lodges (where available)' },
];

export const defaultExcludes: TourPerk[] = [
  { icon: 'flightIntl', label: 'International flights' },
  { icon: 'visa', label: 'Visa fees on arrival' },
  { icon: 'insurance', label: 'Travel insurance (we recommend it)' },
  { icon: 'tips', label: 'Tips & gratuities' },
  { icon: 'alcohol', label: 'Alcoholic beverages' },
  { icon: 'personal', label: 'Personal expenses' },
];

export type Tour = {
  slug: string;
  title: string;
  duration: string;
  pace: 'Easy' | 'Moderate' | 'Active' | 'Expedition';
  group: string;
  category: 'Wildlife' | 'Cultural' | 'Adventure' | 'Coast' | 'Trekking';
  image: string;
  summary: string;
  description: string;
  highlights: string[];
  bestTime: string;
  /** Tiers this tour can be designed in. Defaults to all when omitted. */
  tiers?: readonly Tier[];
  /** What’s included in the price. Falls back to default if omitted. */
  includes?: TourPerk[];
  /** What’s NOT included. Falls back to default if omitted. */
  excludes?: TourPerk[];
};

/** Resolve a tour’s available tiers (defaulting to all three). */
export const tourTiers = (t: Tour): readonly Tier[] => t.tiers ?? TIERS;
export const tourIncludes = (t: Tour): TourPerk[] => t.includes ?? defaultIncludes;
export const tourExcludes = (t: Tour): TourPerk[] => t.excludes ?? defaultExcludes;

export type Destination = {
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

/* ── Local image pool ─────────────────────────────────────────────
   All images served from /public/images — no external dependencies. */
const IMG = {
  // Gorillas / Volcanoes NP
  gorillaSitting:        '/images/2h-media-FKcRXTOHG8M-unsplash.jpg',
  gorillaWalking:        '/images/2h-media-PIU27R-xL04-unsplash.jpg',
  gorillaPortrait:       '/images/simone-dinoia-x7Aizp5YZX0-unsplash.jpg',
  intoreDancers:         '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg',
  // Akagera National Park
  akageraSafariJeep:     '/images/34417507774_a20f845d51_b.jpg',
  akageraElephantsAerial:'/images/35095463862_799645aa4d_b.jpg',
  akageraRhinosLake:     '/images/49454310358_c82de1407b_b.jpg',
  akageraRhinoPortrait:  '/images/49454296718_df51c929c1_b.jpg',
  akageraLeopardBush:    '/images/49454756191_332c75f62b_b.jpg',
  akageraLeopardStalk:   '/images/49454757681_11f814c9e7_b.jpg',
  akageraLionCubs:       '/images/49454310618_2b2a38aefc_b.jpg',
  akageraZebra:          '/images/49454310978_773ab21f11_b.jpg',
  akageraElephantForest: '/images/49454989927_e6a77a7cef_b.jpg',
  akageraElephantBush:   '/images/49454763506_8086d344a1_b.jpg',
  akageraRhinoCalf:      '/images/49455004142_fb447ca46a_b.jpg',
  akageraWetland:        '/images/49454986102_7cb485d628_b.jpg',
  akageraPlains:         '/images/49454780251_beb36dda2f_b.jpg',
  // Nyungwe National Park
  nyungweBright:         '/images/nyungwewaterfall.jpg',
  nyungweDark:           '/images/NYUNGWE.jpg',
};

export const destinations: Destination[] = [
  /* ════════════════════ RWANDA ════════════════════ */
  {
    slug: 'rwanda',
    name: 'Rwanda',
    tagline: 'Land of a thousand hills.',
    region: 'East Africa',
    bestTime: 'Jun – Sep · Dec – Feb',
    image: IMG.gorillaPortrait,
    hero: IMG.gorillaWalking,
    description:
      'A quietly elegant country of forested volcanoes, lakeside villages, and the world’s most considered conservation story. Home to mountain gorillas and a new African cosmopolitan capital.',
    highlights: [
      'Gorilla trekking in Volcanoes National Park',
      'Lake Kivu sailings and craft villages',
      'Nyungwe canopy walks and chimpanzee tracking',
      'Kigali — design, food, and memorial',
    ],
    signatureLodges: ['Bisate Lodge', 'Singita Kwitonda', 'One&Only Gorilla’s Nest'],
    tours: [
      {
        slug: 'volcanoes-gorilla-encounter',
        title: 'Volcanoes Gorilla Encounter',
        duration: '3 days',
        pace: 'Active',
        group: 'Private · max 8',
        category: 'Trekking',
        image: IMG.gorillaSitting,
        summary: 'Two permitted treks into Volcanoes National Park, paired with Bisate Lodge.',
        description:
          'A short, privately permitted route to the silverback families of Volcanoes National Park. Forest treks, conservation researcher access, and the finest forest lodge in East Africa.',
        highlights: ['Two gorilla treks', 'Bisate Lodge', 'Conservation researcher access', 'Golden monkey tracking (optional)'],
        bestTime: 'Jun – Sep · Dec – Feb',
        includes: [
          { icon: 'gorilla', label: 'Two gorilla trekking permits' },
          { icon: 'guide', label: 'Private guide & forest tracker' },
          { icon: 'transport', label: '4×4 vehicle & airport transfers' },
          { icon: 'lodge', label: 'Bisate Lodge (or tier equivalent)' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'wifi', label: 'WiFi at the lodge' },
          { icon: 'binoculars', label: 'Conservation researcher access' },
        ],
      },
      {
        slug: 'volcanoes-golden-monkey-trek',
        title: 'Volcanoes Golden Monkey Trek',
        duration: '2 days',
        pace: 'Moderate',
        group: 'Private · max 8',
        category: 'Trekking',
        image: IMG.gorillaWalking,
        summary: 'Track habituated golden monkey groups in the bamboo forests below the Virunga volcanoes.',
        description:
          'Golden monkeys inhabit the bamboo zone of the Virunga volcanoes — a lower, less demanding trek than the gorillas, and one of the most photogenic wildlife encounters in Africa. Their iridescent gold-and-black colouring and acrobatic leaps through bamboo make every session extraordinary.',
        highlights: ['Golden monkey habituation session', 'Virunga bamboo forest walk', 'Volcano views from the treeline', 'Musanze town exploration'],
        bestTime: 'Jun – Sep · Dec – Feb',
        includes: [
          { icon: 'binoculars', label: 'Golden monkey trekking permit' },
          { icon: 'guide', label: 'Private guide & forest tracker' },
          { icon: 'transport', label: '4×4 vehicle & airport transfers' },
          { icon: 'lodge', label: 'Lodge accommodation in Musanze' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Volcanoes NP entry fees' },
        ],
      },
      {
        slug: 'akagera-big-five-safari',
        title: 'Akagera Big Five Safari',
        duration: '4 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraSafariJeep,
        summary: 'Game drives in Rwanda’s only savanna park — black rhinos, lions, leopards, and a boat safari on Lake Ihema.',
        description:
          'Akagera is Rwanda’s only savanna park, anchored by a chain of lakes along the Congo–Nile ridge. Black and white rhinos were reintroduced here after two decades of absence, and lions followed. The result is an intimate Big Five park without the crowds of East Africa’s northern circuit — combined with boat safaris on Lake Ihema, one of the continent’s most productive hippo and bird waterways.',
        highlights: ['Black rhino tracking on foot', 'Lion & leopard game drives', 'Lake Ihema boat safari', 'Hippo pools & fish-eagle morning'],
        bestTime: 'Jun – Sep · Jan – Feb',
        includes: [
          { icon: 'guide', label: 'Private guide & game tracker' },
          { icon: 'transport', label: '4×4 game-drive vehicle' },
          { icon: 'lodge', label: 'Akagera Game Lodge (or tier equivalent)' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Akagera NP fees & conservation levy' },
          { icon: 'binoculars', label: 'Lake Ihema boat safari' },
        ],
      },
      {
        slug: 'nyungwe-canopy-and-chimps',
        title: 'Nyungwe Canopy & Chimpanzees',
        duration: '3 days',
        pace: 'Active',
        group: 'Private · max 6',
        category: 'Trekking',
        image: IMG.nyungweBright,
        summary: 'Africa’s longest treetop canopy walk and habituated chimpanzee tracking in one of the continent’s oldest rainforests.',
        description:
          'Nyungwe is one of Africa’s oldest montane rainforests — a dense, dripping jungle in the south-west of Rwanda. Africa’s longest suspended canopy walk runs 200 metres above the forest floor. Below it, habituated chimpanzee families and Angola colobus monkeys in troops of 300 make every morning unpredictable.',
        highlights: ['Habituated chimpanzee tracking', '600m suspended canopy walk', 'Angola colobus troop encounter', 'Isumo waterfall hike'],
        bestTime: 'Jun – Sep · Dec – Jan',
        includes: [
          { icon: 'binoculars', label: 'Chimpanzee tracking permit' },
          { icon: 'guide', label: 'Private guide & primate tracker' },
          { icon: 'transport', label: '4×4 vehicle & transfers' },
          { icon: 'lodge', label: 'Nyungwe Forest Lodge (or tier equivalent)' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Nyungwe NP entry & canopy walk fee' },
        ],
      },
      {
        slug: 'nyanza-royal-heritage',
        title: 'Nyanza Royal Heritage',
        duration: '2 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'The King’s Palace Museum, royal Inyambo cattle, and traditional Intore ceremonies in Rwanda’s former royal capital.',
        description:
          'Nyanza was the seat of Rwanda’s royal court for centuries. The reconstructed King’s Palace Museum tells the story of the Mwami through architecture, cattle, and living craft — and the Rwesero Arts Museum nearby holds some of the finest contemporary Rwandan art. A half-day with the Intore dance troupe and an evening at a family-run inn round a journey that few visitors take.',
        highlights: ['King’s Palace Museum & Inyambo royal cattle', 'Intore dance ceremony', 'Rwesero Arts Museum', 'Traditional storytelling evening'],
        bestTime: 'Year-round',
      },
      {
        slug: 'kivu-and-nyungwe',
        title: 'Lake Kivu & Nyungwe Canopy',
        duration: '5 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Adventure',
        image: IMG.nyungweDark,
        summary: 'Lakeside villages, Nyungwe rainforest canopy walks, and chimpanzee tracking.',
        description:
          'A slower, lower-altitude counterweight to the gorilla parks — coffee villages on Lake Kivu, the longest canopy walk in Africa, and a deep, quiet rainforest.',
        highlights: ['Lake Kivu private boat', 'Nyungwe canopy walk', 'Chimpanzee tracking', 'Coffee village stay'],
        bestTime: 'Jun – Aug · Dec – Jan',
      },
      {
        slug: 'musanze-twin-lakes-and-volcanoes',
        title: 'Musanze, Twin Lakes & Volcanoes',
        duration: '3 days',
        pace: 'Active',
        group: 'Private · max 6',
        category: 'Adventure',
        image: IMG.gorillaSitting,
        summary: 'Lake Burera and Ruhondo by boat, the Dian Fossey tomb trail, and an optional Bisoke crater summit.',
        description:
          'Based in Musanze — the gateway to the Virunga — this route explores the twin crater lakes of Burera and Ruhondo framed by volcanic peaks, the forest trail leading to Dian Fossey’s tomb and research cabin, and an optional full-day climb of Mount Bisoke to a stunning crater lake at 3,711m.',
        highlights: ['Twin Lakes Burera & Ruhondo by boat', 'Dian Fossey tomb & research cabin trail', 'Bisoke crater summit (optional)', 'Musanze caves exploration'],
        bestTime: 'Jun – Sep',
        includes: [
          { icon: 'guide', label: 'Private guide & mountain tracker' },
          { icon: 'transport', label: '4×4 vehicle & transfers' },
          { icon: 'lodge', label: 'Boutique lodge in Musanze' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Bisoke climb permit (if taken)' },
        ],
      },
      {
        slug: 'kigali-design-and-memory',
        title: 'Kigali · Design & Memory',
        duration: '2 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'A privately hosted city briefing — memorial, design studios, hosted dinners.',
        description:
          'An unhurried two days inside one of Africa’s most considered capitals — the memorial, Inema arts centre, hosted dinners with writers and curators, and a quiet morning at the markets.',
        highlights: ['Kigali Genocide Memorial', 'Inema Arts Centre', 'Hosted dinner with local creatives', 'Niyo Cultural Centre'],
        bestTime: 'Year-round',
      },
      {
        slug: 'big-five-of-the-mountains',
        title: 'Big Five of the Mountains',
        duration: '7 days',
        pace: 'Active',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraRhinosLake,
        summary: 'Gorillas, golden monkeys, chimpanzees, canopy walks — across three parks.',
        description:
          'A complete primate and forest route covering Volcanoes, Nyungwe, and Akagera. The deepest possible introduction to Rwanda’s wilderness in a single, privately designed week.',
        highlights: ['Two gorilla treks', 'Golden monkeys', 'Chimpanzee tracking', 'Akagera big-game drives'],
        bestTime: 'Jun – Sep',
        includes: [
          { icon: 'gorilla', label: 'Two gorilla trekking permits' },
          { icon: 'binoculars', label: 'Chimpanzee tracking permit' },
          { icon: 'guide', label: 'Private guide & forest tracker' },
          { icon: 'transport', label: '4×4 vehicle & internal flights' },
          { icon: 'lodge', label: 'Lodge accommodation across 3 parks' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Park fees & conservation levies' },
        ],
      },
    ],
  },

  /* ════════════════════ TANZANIA ════════════════════ */
  {
    slug: 'tanzania',
    name: 'Tanzania',
    tagline: 'Endless plains, endless story.',
    region: 'East Africa',
    bestTime: 'Jun – Oct (Migration)',
    image: IMG.akageraSafariJeep,
    hero: IMG.akageraElephantsAerial,
    description:
      'The Serengeti, Ngorongoro, and the wild islands of Zanzibar — Tanzania holds the largest land migration on Earth and a coastline of impossible quiet.',
    highlights: [
      'Time-tuned Serengeti migration camps',
      'Ngorongoro crater game drives',
      'Hadzabe community in the rift valley',
      'Mafia and Zanzibar archipelago retreats',
    ],
    signatureLodges: ['Singita Sasakwa', 'Roving Bushtops', 'Mnemba Island'],
    tours: [
      {
        slug: 'northern-migration-circuit',
        title: 'Northern Migration Circuit',
        duration: '8 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraSafariJeep,
        summary: 'A mobile migration camp following the herds across the Serengeti.',
        description:
          'Time-tuned camps moved weeks ahead based on rainfall and river crossing forecasts. The classic northern circuit, designed to put you in the right place at the right week.',
        highlights: ['Mara River crossings', 'Mobile migration camp', 'Big cat country', 'Hot-air balloon (optional)'],
        bestTime: 'Jul – Oct',
      },
      {
        slug: 'ngorongoro-and-tarangire',
        title: 'Ngorongoro & Tarangire',
        duration: '5 days',
        pace: 'Easy',
        group: 'Private · max 8',
        category: 'Wildlife',
        image: IMG.akageraElephantForest,
        summary: 'Crater game drives, baobab forests, and elephants in the Tarangire valley.',
        description:
          'A gentler, lower-altitude introduction to Tanzania’s safari country — Ngorongoro caldera at dawn and Tarangire’s old-growth baobabs with the largest elephant population in the north.',
        highlights: ['Ngorongoro crater game drive', 'Tarangire elephants', 'Lake Manyara flamingos', 'Maasai bomas'],
        bestTime: 'Jun – Oct',
      },
      {
        slug: 'selous-and-ruaha',
        title: 'Selous & Ruaha Wilderness',
        duration: '7 days',
        pace: 'Active',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraPlains,
        summary: 'Southern Tanzania — wilder, quieter, almost no other vehicles.',
        description:
          'The wilder, quieter south. Boat safaris on the Rufiji, walking trails with armed rangers, and Ruaha’s extraordinary predator densities — without the northern crowds.',
        highlights: ['Rufiji river boat safari', 'Walking safaris', 'Ruaha predator country', 'Fly-camping (optional)'],
        bestTime: 'Jul – Oct',
      },
      {
        slug: 'hadzabe-cultural-immersion',
        title: 'Hadzabe Cultural Immersion',
        duration: '3 days',
        pace: 'Moderate',
        group: 'Private · max 4',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'Quiet days with two of the last hunter-gatherer cultures in East Africa.',
        description:
          'A respectful, carefully hosted route to spend time with the Hadzabe and Datoga around Lake Eyasi. Mornings with hunters, evenings with blacksmiths, slow days in between.',
        highlights: ['Morning hunt with the Hadzabe', 'Datoga blacksmith visit', 'Lake Eyasi camp', 'Hosted by community elders'],
        bestTime: 'Jun – Oct',
      },
    ],
  },

  /* ════════════════════ KENYA ════════════════════ */
  {
    slug: 'kenya',
    name: 'Kenya',
    tagline: 'Classic safari, reinterpreted.',
    region: 'East Africa',
    bestTime: 'Jul – Oct · Jan – Mar',
    image: IMG.akageraLeopardBush,
    hero: IMG.akageraLeopardStalk,
    description:
      'The original safari country — Maasai Mara, Laikipia, Samburu, and Lamu — held now by a new generation of owner-led conservancies that put wildlife and community first.',
    highlights: [
      'Private Mara conservancies',
      'Laikipia’s rewilded estates',
      'Samburu cultural journeys',
      'Lamu archipelago dhow sailings',
    ],
    signatureLodges: ['Angama Mara', 'Segera Retreat', 'Peponi’s'],
    tours: [
      {
        slug: 'maasai-mara-conservancies',
        title: 'Maasai Mara Conservancies',
        duration: '6 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraPlains,
        summary: 'Private conservancies bordering the Mara — quieter, with night drives.',
        description:
          'The Mara without the convoy. Private conservancies allow night drives, walking safaris, and off-road tracking — and put a meaningful share of every booking into local community trusts.',
        highlights: ['Night game drives', 'Walking safaris', 'Hot-air balloon (optional)', 'Maasai cultural visits'],
        bestTime: 'Jul – Oct · Jan – Mar',
      },
      {
        slug: 'laikipia-rewilding',
        title: 'Laikipia Rewilding',
        duration: '5 days',
        pace: 'Active',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraRhinoPortrait,
        summary: 'Rewilded private estates with rhinos, wild dogs, and horseback safaris.',
        description:
          'A new generation of privately owned Laikipia estates have been quietly rewilded — black and white rhinos, wild dog packs, and horseback safaris through Mount Kenya foothills.',
        highlights: ['Rhino tracking on foot', 'Horseback safari', 'Wild dog encounters', 'Mount Kenya views'],
        bestTime: 'Jul – Mar',
      },
      {
        slug: 'samburu-heritage',
        title: 'Samburu Heritage',
        duration: '4 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'Northern frontier wildlife with deep Samburu cultural immersion.',
        description:
          'A short journey into Kenya’s northern frontier — Samburu and Buffalo Springs reserves, with hosted time alongside the elegant Samburu people, who consider themselves cousins to the Maasai.',
        highlights: ['Samburu village host', 'Northern five species', 'Ewaso Ng’iro riverbed', 'Singing wells'],
        bestTime: 'Jun – Oct',
      },
      {
        slug: 'lamu-archipelago',
        title: 'Lamu Archipelago Sail',
        duration: '4 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Coast',
        image: IMG.intoreDancers,
        summary: 'Dhow sails, Swahili interiors, and the quietest beach you will find on the coast.',
        description:
          'A slow, intentional ending — dhow charters between Lamu and Manda, Stone Town walks, Swahili interiors, and a private chef who cooks where you swim.',
        highlights: ['Dhow charters', 'Stone Town walks', 'Private chef', 'Shela beach'],
        bestTime: 'Jul – Mar',
      },
    ],
  },

  /* ════════════════════ UGANDA ════════════════════ */
  {
    slug: 'uganda',
    name: 'Uganda',
    tagline: 'The pearl of Africa.',
    region: 'East Africa',
    bestTime: 'Jun – Aug · Dec – Feb',
    image: IMG.gorillaSitting,
    hero: IMG.gorillaWalking,
    description:
      'Wilder, greener, and far quieter than its neighbours. Bwindi’s gorillas, Queen Elizabeth’s tree-climbing lions, and the source of the Nile.',
    highlights: [
      'Gorilla trekking in Bwindi Impenetrable Forest',
      'Tree-climbing lions, Queen Elizabeth NP',
      'Chimpanzees of Kibale',
      'Nile source and Murchison Falls',
    ],
    signatureLodges: ['Bwindi Lodge', 'Clouds Mountain Gorilla Lodge', 'Apoka Lodge'],
    tours: [
      {
        slug: 'bwindi-gorillas',
        title: 'Bwindi Gorilla Trek',
        duration: '4 days',
        pace: 'Active',
        group: 'Private · max 8',
        category: 'Trekking',
        image: IMG.gorillaPortrait,
        summary: 'Two gorilla treks in Bwindi Impenetrable Forest with Clouds Lodge.',
        description:
          'A different forest, a different feeling — Bwindi’s gorillas live in denser, steeper jungle than their Rwandan cousins. A more challenging trek with a deeper, quieter reward.',
        highlights: ['Two Bwindi gorilla treks', 'Clouds Mountain Lodge', 'Batwa cultural visit', 'Forest canopy walks'],
        bestTime: 'Jun – Aug · Dec – Feb',
        includes: [
          { icon: 'gorilla', label: 'Two Bwindi gorilla permits' },
          { icon: 'guide', label: 'Private guide & forest tracker' },
          { icon: 'transport', label: '4×4 vehicle & airport transfers' },
          { icon: 'lodge', label: 'Clouds Mountain Gorilla Lodge' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Park fees & community levies' },
        ],
      },
      {
        slug: 'queen-elizabeth-tree-climbers',
        title: 'Queen Elizabeth Tree-Climbers',
        duration: '5 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraLionCubs,
        summary: 'Tree-climbing lions, Kazinga Channel boat safaris, and Ishasha plains.',
        description:
          'Queen Elizabeth National Park is one of the rare places where lions habitually climb trees. Boat safaris on the Kazinga Channel, big game on the Ishasha plains, and quiet lodge time.',
        highlights: ['Tree-climbing lions', 'Kazinga Channel boat', 'Ishasha plains', 'Crater lakes drive'],
        bestTime: 'Jun – Aug · Dec – Feb',
      },
      {
        slug: 'kibale-chimpanzees',
        title: 'Kibale Chimpanzee Tracking',
        duration: '3 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Trekking',
        image: IMG.gorillaSitting,
        summary: 'Habituated chimp tracking in the densest primate forest in East Africa.',
        description:
          'Kibale holds the highest concentration of primates of any forest in East Africa. A chimp habituation experience puts you with the same family for half a day — the deepest possible primate encounter, short of gorillas.',
        highlights: ['Habituated chimp tracking', 'Bigodi swamp walk', '13 primate species', 'Crater lakes'],
        bestTime: 'Jun – Sep',
        includes: [
          { icon: 'binoculars', label: 'Chimpanzee habituation permit' },
          { icon: 'guide', label: 'Private primate guide' },
          { icon: 'transport', label: '4×4 vehicle & airport transfers' },
          { icon: 'lodge', label: 'Lodge accommodation' },
          { icon: 'meals', label: 'All meals during the itinerary' },
          { icon: 'drinks', label: 'Soft drinks & bottled water' },
          { icon: 'permit', label: 'Bigodi swamp walk fee' },
        ],
      },
      {
        slug: 'murchison-falls-and-nile',
        title: 'Murchison Falls & Nile',
        duration: '4 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Adventure',
        image: IMG.akageraWetland,
        summary: 'The Nile compressed through a 7-metre gap — and big game on either bank.',
        description:
          'A boat safari to the foot of Murchison Falls, where the Nile is forced through a seven-metre gap. Wildlife drives on both banks, and a quiet riverside camp.',
        highlights: ['Murchison Falls boat', 'Nile delta game drive', 'Riverside camp', 'Top-of-falls hike'],
        bestTime: 'Jun – Aug · Dec – Feb',
      },
    ],
  },

  /* ════════════════════ BOTSWANA ════════════════════ */
  {
    slug: 'botswana',
    name: 'Botswana',
    tagline: 'The Okavango wilderness.',
    region: 'Southern Africa',
    bestTime: 'May – Oct',
    image: IMG.akageraElephantsAerial,
    hero: IMG.akageraElephantBush,
    description:
      'A delta the size of a country, water in the desert, and the highest concentration of premium camps anywhere in Africa. Low-density, high-impact.',
    highlights: [
      'Okavango Delta mokoro safaris',
      'Linyanti predator country',
      'Makgadikgadi salt pans',
      'Kalahari with the San',
    ],
    signatureLodges: ['Mombo', 'Vumbura Plains', 'Jack’s Camp'],
    tours: [
      {
        slug: 'okavango-delta-mokoro',
        title: 'Okavango Delta · Mokoro',
        duration: '5 days',
        pace: 'Easy',
        group: 'Private · max 4',
        category: 'Wildlife',
        image: IMG.akageraWetland,
        summary: 'Silent mokoro canoe safaris through the heart of the Delta.',
        description:
          'A water-led safari in the world’s only inland delta. Mokoro canoes, walking safaris, and a private island camp deep inside the permanent water.',
        highlights: ['Mokoro canoe safari', 'Walking safari', 'Island camp', 'Sundowners on the floodplain'],
        bestTime: 'May – Oct',
      },
      {
        slug: 'linyanti-predator-country',
        title: 'Linyanti Predator Country',
        duration: '6 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Wildlife',
        image: IMG.akageraLeopardStalk,
        summary: 'Africa’s most extraordinary predator densities in the dry season.',
        description:
          'In the Linyanti dry season, water becomes the story. Wild dog packs, lion prides, and Africa’s largest elephant herds funnel through one of the continent’s most concentrated wildlife regions.',
        highlights: ['Wild dog packs', 'Lion prides', 'Elephant herds', 'Night drives'],
        bestTime: 'Jul – Oct',
      },
      {
        slug: 'makgadikgadi-salt-pans',
        title: 'Makgadikgadi Salt Pans',
        duration: '4 days',
        pace: 'Easy',
        group: 'Private · max 6',
        category: 'Adventure',
        image: IMG.akageraPlains,
        summary: 'Quad bikes, meerkats, and the most cinematic landscape in southern Africa.',
        description:
          'Vast, otherworldly salt pans — sleep out under the stars, ride quad bikes across the white, and meet habituated meerkat families at dawn.',
        highlights: ['Quad bike across the pans', 'Meerkat colony', 'Sleep-out under the stars', 'San bushman walks'],
        bestTime: 'May – Oct',
      },
      {
        slug: 'kalahari-with-the-san',
        title: 'Kalahari with the San',
        duration: '5 days',
        pace: 'Moderate',
        group: 'Private · max 6',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'Walking the Kalahari with one of the world’s oldest peoples.',
        description:
          'A respectfully hosted route alongside San communities — bush walks, traditional knowledge, fire-side stories, and quiet days in one of the most beautiful deserts on Earth.',
        highlights: ['San bushman walks', 'Traditional knowledge sharing', 'Black-maned Kalahari lions', 'Star-filled nights'],
        bestTime: 'Year-round',
      },
    ],
  },

  /* ════════════════════ ZANZIBAR ════════════════════ */
  {
    slug: 'zanzibar',
    name: 'Zanzibar',
    tagline: 'Spice islands of the Swahili coast.',
    region: 'Indian Ocean',
    bestTime: 'Jun – Oct · Dec – Feb',
    image: IMG.intoreDancers,
    hero: IMG.intoreDancers,
    description:
      'Where dhow sails meet Stone Town and reef. A quiet, fragrant ending to almost every East African journey we design.',
    highlights: [
      'Stone Town & Swahili history',
      'Mnemba private island',
      'Spice plantations and slow food',
      'Dhow sails at golden hour',
    ],
    signatureLodges: ['Mnemba Island', 'Xanadu Villas', 'Zuri Zanzibar'],
    tours: [
      {
        slug: 'stone-town-and-spice',
        title: 'Stone Town & Spice',
        duration: '3 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Cultural',
        image: IMG.intoreDancers,
        summary: 'A privately guided architecture and history walk through Stone Town.',
        description:
          'A slow, hosted three days inside Stone Town — architecture, slave-trade memorial, spice plantations, slow Swahili cooking, and music nights with local musicians.',
        highlights: ['Stone Town architecture walk', 'Spice plantation visit', 'Slow Swahili cooking class', 'Music night'],
        bestTime: 'Year-round',
      },
      {
        slug: 'mnemba-private-island',
        title: 'Mnemba Private Island',
        duration: '5 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Coast',
        image: IMG.nyungweBright,
        summary: 'Twelve bandas, one private island, almost no schedule.',
        description:
          'Mnemba is a single private island with twelve thatched bandas, no roads, and no Wi-Fi where it would interrupt the view. Reef snorkelling, rest, and the kind of silence you forgot existed.',
        highlights: ['Twelve-banda private island', 'Reef snorkelling', 'Private chef', 'Sea kayaks'],
        bestTime: 'Jun – Oct · Dec – Feb',
      },
      {
        slug: 'pemba-reef-and-quiet',
        title: 'Pemba Reef & Quiet',
        duration: '4 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Coast',
        image: IMG.nyungweDark,
        summary: 'The lesser-known sister island — the best diving in East Africa.',
        description:
          'Pemba is greener, quieter, and far less visited than Unguja — and holds the best reef diving on the East African coast. A short stay at the only luxury lodge on the island.',
        highlights: ['World-class reef diving', 'Mangrove kayak', 'Spice walks', 'Slow lodge time'],
        bestTime: 'Jun – Oct',
      },
      {
        slug: 'swahili-coast-sail',
        title: 'Swahili Coast Sail',
        duration: '5 days',
        pace: 'Easy',
        group: 'Private',
        category: 'Adventure',
        image: IMG.intoreDancers,
        summary: 'A traditional dhow charter along the spice coast, ending at Mafia Island.',
        description:
          'A private dhow charter along the southern Tanzanian coast — old fishing villages, mangrove channels, beach picnics, and a final stay on Mafia Island.',
        highlights: ['Traditional dhow charter', 'Mangrove channel sail', 'Beach picnic lunches', 'Mafia Island stay'],
        bestTime: 'Jun – Oct',
      },
    ],
  },
];

/* ────────────── Lookups ────────────── */
export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

export const getTour = (destinationSlug: string, tourSlug: string) =>
  getDestination(destinationSlug)?.tours.find((t) => t.slug === tourSlug);

export const allTourParams = () =>
  destinations.flatMap((d) =>
    d.tours.map((t) => ({ slug: d.slug, tourSlug: t.slug }))
  );
