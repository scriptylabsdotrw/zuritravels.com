'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TravellerVoices from '@/components/sections/TravellerVoices';
import type { Milestone, Partner, PressFeature, Principle, SiteContent } from '@/lib/types';

type AboutViewProps = {
  siteContent: SiteContent;
  principles: Principle[];
  milestones: Milestone[];
  partners: Partner[];
  pressFeatures: PressFeature[];
};

/* Hero + Kigali photo URLs (kept as fallbacks; can later be moved to Media). */
const u = (id: string, fpY = 0.5, fpX = 0.5, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75&crop=focalpoint&fp-x=${fpX}&fp-y=${fpY}`;

const IMG = {
  hero: u('photo-1551357141-f73a8402ceb3', 0.5, 0.5, 1920),
  story: u('photo-1509897739002-791fa79aac9b', 0.4, 0.5, 1400),
  kigali: u('photo-1687986261123-b17f08f2796c', 0.5, 0.5, 1400),
  conservation: u('photo-1547970810-dc1eac37d174', 0.5, 0.5, 1600),
};

/* ──────────────────────────────────────────────────────────────
   STATIC CONTENT — illustrative; move to Payload collections later
   ────────────────────────────────────────────────────────────── */

/* What we craft — the four pillars of a Zuri Travels journey */
const expertise = [
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
];

/* Why travellers choose Zuri Travels */
const differentiators = [
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
];

/* The studio — illustrative team; populate a TeamMembers collection later */
const team = [
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
];

/* Conservation & community commitments */
const impact = [
  { value: '100%', label: 'Permits fund gorilla conservation' },
  { value: '6', label: 'Community partnerships across the region' },
  { value: '1%', label: 'Of every journey to anti-poaching units' },
];

/* Frequently asked questions */
const faqs = [
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
];

/* ──────────────────────────────────────────────────────────────
   MOTION HELPERS
   ────────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function AboutView({
  siteContent,
  principles,
  milestones,
  partners,
  pressFeatures,
}: AboutViewProps) {
  /* Derive runtime values from DB content */
  const numbers = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
    siteContent.travellersHosted && { value: siteContent.travellersHosted, label: 'Travellers hosted' },
  ].filter(Boolean) as { value: string; label: string }[];

  const partnersRowOne = partners;
  const partnersRowTwo = [...partners].reverse();

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteContent.aboutHeroImage || IMG.hero}
            alt="An aerial view of Rwanda's thousand hills"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-36 text-white lg:px-10 lg:pb-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8A3F] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
              </span>
              <span>About · Zuri Travels · Kigali</span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="max-w-4xl text-balance text-[clamp(2.8rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em]"
            >
              <span className="block font-light">A studio for</span>
              <span className="block font-bold text-[#7C8A3F]">soulful African journeys.</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-10 max-w-2xl text-balance text-xl leading-9 text-white/85 lg:text-2xl lg:leading-10"
            >
              Founded in Kigali in 2018. Owner-led, in country. Quietly opinionated about
              wildlife, design, and how a holiday should feel.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          INTRO LEAD — who we are
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
          >
            <motion.h2
              variants={reveal}
              className="text-balance text-[clamp(1.7rem,3.4vw,3rem)] font-light leading-[1.22] tracking-[-0.02em] text-neutral-950"
            >
              <span className="font-bold text-[#7C8A3F]">Zuri Travels</span> is a Kigali-based
              travel design studio. We craft privately led safaris, gorilla treks, cultural
              journeys, and coastal escapes across East Africa — built by the guides,
              conservationists, and designers who call the wilderness home.
            </motion.h2>

            <motion.div variants={reveal} className="space-y-6 text-base leading-8 text-neutral-600">
              <p>
                We do not sell packages. We design journeys — one conversation at a time, measured
                in stories rather than stops, and never the same way twice.
              </p>
              <p>
                Every route is composed by hand around your pace and your curiosities, then carried
                out by people who live where you travel and have walked every lodge we recommend.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/destinations"
                  className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#7C8A3F]"
                >
                  Explore destinations
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-neutral-200 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-900 transition hover:border-[#7C8A3F] hover:text-[#7C8A3F]"
                >
                  Start planning
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          NUMBERS RIBBON — only renders when any stat is set in admin
         ═════════════════════════════════════════════════════════ */}
      {numbers.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <ul
              className={`hairline-grid grid grid-cols-2 sm:grid-cols-${Math.min(numbers.length, 4)}`}
            >
              {numbers.map((n) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="px-6 py-10 text-center sm:py-12"
                >
                  <p className="text-4xl font-light tracking-tight text-neutral-950 sm:text-5xl">
                    {n.value}
                  </p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                    {n.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          MANIFESTO — only renders when set in SiteContent global
         ═════════════════════════════════════════════════════════ */}
      {siteContent.aboutManifesto && (
        <section className="px-6 py-20 lg:px-10 lg:py-32" id="manifesto">
          <div className="mx-auto max-w-[1180px]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid gap-14 lg:grid-cols-[0.32fr_1fr] lg:gap-20"
            >
              <motion.div variants={reveal} className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  Index · 01
                  <br />
                  The studio
                </span>
              </motion.div>

              <motion.p
                variants={reveal}
                className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
              >
                {siteContent.aboutManifesto}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          OUR STORY — narrative prose + image
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={IMG.story}
              alt="A silverback mountain gorilla in Volcanoes National Park, Rwanda"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">Since</p>
              <p className="mt-1 text-3xl font-light tracking-tight">2018</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="space-y-7"
          >
            <motion.p variants={reveal} className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
              Index · 02 — Our story
            </motion.p>
            <motion.h2
              variants={reveal}
              className="text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950"
            >
              It began with one route, and <span className="font-bold">one belief.</span>
            </motion.h2>
            <motion.div variants={reveal} className="space-y-5 text-lg leading-9 text-neutral-600">
              <p>
                Zuri Travels began in 2018 with a single gorilla-trekking route through Volcanoes
                National Park — and the conviction that Africa is best experienced through the eyes
                of the people who know it best.
              </p>
              <p>
                What started as one guide and one mountain has grown into a studio of local guides,
                designers, and conservation partners working across six countries — and thousands of
                travellers who measure their trip in stories, not stops.
              </p>
              <p>
                We have stayed small on purpose. Owner-led, careful, and quietly obsessed with the
                difference between a good trip and an unforgettable one.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          WHAT WE CRAFT — expertise / services
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                  Index · 03 — What we craft
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  Four ways to <span className="font-bold">meet Africa.</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">
              Each journey is a blend, never a template — composed from the disciplines we know
              most deeply.
            </p>
          </motion.header>

          <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e, i) => (
              <motion.li
                key={e.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                className="bg-white p-8 lg:p-10"
              >
                <span className="text-[0.72rem] uppercase tracking-[0.4em] text-neutral-400">
                  {e.n}
                </span>
                <h3 className="mt-8 text-2xl font-light leading-snug tracking-tight text-neutral-950">
                  {e.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{e.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          PRINCIPLES — only renders when set in admin
         ═════════════════════════════════════════════════════════ */}
      {principles.length > 0 && (
        <section className="bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-5">
                  <span className="inline-block h-px w-10 bg-[#7C8A3F]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                    Index · 04 — Principles
                  </span>
                </div>
                <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                  <span className="font-light">Quiet</span>
                  <br />
                  <span className="font-bold text-[#7C8A3F]">commitments.</span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-8 text-white/65">
                  The things we will not compromise on, written down so we are held to them.
                </p>
              </div>

              <ol className="space-y-px">
                {principles.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
                    className="border-t border-white/10 py-10 first:border-t-0 first:pt-0"
                  >
                    <div className="grid items-start gap-8 sm:grid-cols-[0.18fr_1fr]">
                      <span className="text-[0.7rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                        {p.number}
                      </span>
                      <div>
                        <h3 className="text-balance text-3xl font-light leading-tight tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-5 max-w-xl text-base leading-8 text-white/70">{p.body}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          WHY ZURI TRAVELS — differentiators
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14 flex items-start gap-5"
          >
            <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                Index · 05 — Why Zuri Travels
              </p>
              <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                The difference is <span className="font-bold">in the details.</span>
              </h2>
            </div>
          </motion.header>

          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <motion.li
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="border-t border-neutral-200 pt-6"
              >
                <h3 className="text-xl font-medium tracking-tight text-neutral-950">{d.title}</h3>
                <p className="mt-4 text-base leading-8 text-neutral-600">{d.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          THE TEAM — illustrative; populate TeamMembers collection later
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                  Index · 06 — The studio
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  The people behind <span className="font-bold">the journey.</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">
              Small, owner-led, and entirely in country — a team of guides and designers who live
              where you travel.
            </p>
          </motion.header>

          <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                className="flex flex-col bg-white p-8 lg:p-9"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-neutral-950 font-light text-lg text-white">
                  {m.name[0]}
                </span>
                <h3 className="mt-7 text-xl font-medium tracking-tight text-neutral-950">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.32em] text-[#7C8A3F]">
                  {m.role}
                </p>
                <p className="mt-5 text-sm leading-7 text-neutral-600">{m.bio}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CONSERVATION & COMMUNITY
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
        <div className="absolute inset-0 -z-10 opacity-25">
          <Image
            src={IMG.conservation}
            alt="The plains of East Africa at dusk"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>

        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="space-y-7"
            >
              <motion.p variants={reveal} className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                Index · 07 — Conservation & community
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em]"
              >
                Travel that <span className="font-bold text-[#7C8A3F]">gives back.</span>
              </motion.h2>
              <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-white/70">
                We believe the wild places we love should still be here for the next generation of
                travellers. So every itinerary is built on lodges, parks, and permits that fund
                anti-poaching, habitat protection, and community-led tourism.
              </motion.p>
              <motion.p variants={reveal} className="max-w-lg text-base leading-8 text-white/55">
                It is not an add-on or a marketing line. It is the reason the studio exists, and the
                quiet test every journey has to pass.
              </motion.p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid content-center gap-px overflow-hidden rounded-sm bg-white/10"
            >
              {impact.map((item) => (
                <motion.li
                  key={item.label}
                  variants={reveal}
                  className="bg-neutral-950/40 px-8 py-9 backdrop-blur"
                >
                  <p className="text-4xl font-light tracking-tight text-white sm:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-white/55">
                    {item.label}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          TIMELINE — only renders when milestones exist in admin
         ═════════════════════════════════════════════════════════ */}
      {milestones.length > 0 && (
        <section className="px-6 py-20 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                  Index · 08 — Milestones
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                  Written <span className="font-bold">by hand.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-neutral-600">
                A short history of the studio — small enough to read in a minute, careful enough to
                keep.
              </p>
            </motion.header>

            <ol className="space-y-px">
              {milestones.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.75, delay: i * 0.05, ease: 'easeOut' }}
                  className="grid items-start gap-6 border-t border-neutral-200 py-7 last:border-b lg:grid-cols-[0.18fr_0.32fr_1fr] lg:gap-10"
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#7C8A3F]">
                    {m.year}
                  </span>
                  <h3 className="text-balance text-2xl font-light tracking-tight text-neutral-950 lg:text-3xl">
                    {m.title}
                  </h3>
                  <p className="text-base leading-7 text-neutral-600">{m.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          PARTNERS — only renders when partners exist in admin
         ═════════════════════════════════════════════════════════ */}
      {partners.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-neutral-50/60 py-20 lg:py-28">
          <div className="mx-auto mb-12 max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-start gap-5"
            >
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                  Lodge &amp; camp partners
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  <span className="font-bold">The finest names</span>{' '}
                  <span className="font-light">in African hospitality.</span>
                </h2>
              </div>
            </motion.div>
          </div>

          <div className="marquee-row marquee-shell">
            <div className="marquee-track">
              {[...partnersRowOne, ...partnersRowOne, ...partnersRowOne].map((p, i) => (
                <span
                  key={`r1-${p.name}-${i}`}
                  className="inline-flex h-16 items-center px-8 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 lg:h-20 lg:px-10"
                >
                  {p.logo && (
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={240}
                      height={120}
                      className="h-full w-auto object-contain"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="marquee-row marquee-shell mt-4">
            <div className="marquee-track-reverse">
              {[...partnersRowTwo, ...partnersRowTwo, ...partnersRowTwo].map((p, i) => (
                <span
                  key={`r2-${p.name}-${i}`}
                  className="inline-flex h-16 items-center px-8 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 lg:h-20 lg:px-10"
                >
                  {p.logo && (
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={240}
                      height={120}
                      className="h-full w-auto object-contain"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          TRAVELLER VOICES — testimonials
         ═════════════════════════════════════════════════════════ */}
      <TravellerVoices />

      {/* ═════════════════════════════════════════════════════════
          PRESS — only renders when press features are added in admin
         ═════════════════════════════════════════════════════════ */}
      {pressFeatures.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
              <p className="text-[0.62rem] uppercase tracking-[0.4em] text-neutral-500 lg:max-w-[10ch]">
                As featured in
              </p>
              <div className="grid w-full flex-1 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                {pressFeatures.map((p) =>
                  p.url ? (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-500 transition hover:text-neutral-950"
                    >
                      {p.name}
                    </a>
                  ) : (
                    <span
                      key={p.id}
                      className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-neutral-500"
                    >
                      {p.name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          STUDIO HQ
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={IMG.kigali}
              alt="Kigali, Rwanda"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
            className="space-y-9"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
              Index · 09 — Studio
            </p>
            <h2 className="text-balance text-[clamp(2.2rem,4.4vw,3.4rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
              Headquartered in <span className="font-bold">Kigali.</span>
            </h2>
            {siteContent.studioBlurb && (
              <p className="text-lg leading-9 text-neutral-700">{siteContent.studioBlurb}</p>
            )}

            <ul className="grid gap-x-8 gap-y-5 pt-4 sm:grid-cols-2">
              {[
                { k: 'Studio', v: siteContent.studioAddress },
                { k: 'Email', v: siteContent.studioEmail },
                { k: 'Phone', v: siteContent.studioPhone },
                { k: 'Hours', v: siteContent.studioHours },
              ].filter((row) => Boolean(row.v)).map((row) => (
                <li key={row.k} className="border-t border-neutral-200 pt-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                    {row.k}
                  </p>
                  <p className="mt-2 text-base text-neutral-900">{row.v}</p>
                </li>
              ))}
            </ul>

            {siteContent.studioMapsUrl && (
              <a
                href={siteContent.studioMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-900 transition hover:text-[#7C8A3F]"
              >
                Open in maps
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          FAQ
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.5fr_1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-5">
              <span className="inline-block h-px w-10 bg-[#7C8A3F]" />
              <span className="text-[0.62rem] uppercase tracking-[0.4em] text-neutral-500">
                Index · 10 — Questions
              </span>
            </div>
            <h2 className="mt-8 text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
              Good to <span className="font-bold">know.</span>
            </h2>
            <p className="mt-7 max-w-sm text-base leading-8 text-neutral-600">
              Still wondering about something? A real person is one message away.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-900 transition hover:text-[#7C8A3F]"
            >
              Ask us anything
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-neutral-950 transition group-hover:text-[#7C8A3F]">
                  {f.q}
                  <span className="text-2xl font-light text-[#7C8A3F] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CTA
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
        <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-50" aria-hidden />
        <div className="glow-orb -right-32 top-1/4 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={stagger}
            className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-8">
              <motion.p
                variants={reveal}
                className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]"
              >
                Begin
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">Tell us what you have in mind.</span>
                <br />
                <span className="font-bold text-[#7C8A3F]">We’ll design the rest.</span>
              </motion.h2>
            </div>

            <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#7C8A3F] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                Inquire Now
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/destinations"
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#7C8A3F]"
              >
                <span className="relative pb-1">
                  Browse destinations
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/30 transition group-hover:bg-[#7C8A3F]" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
