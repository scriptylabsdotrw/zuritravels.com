'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SiteContent, Testimonial, Tour, VisitRwandaContent } from '@/lib/types';

/* Image fallbacks used only when the CMS field is empty. */
const HERO_FALLBACK = '/images/simone-dinoia-x7Aizp5YZX0-unsplash.jpg';
const TESTIMONIAL_FALLBACK = '/images/kelly-umuringa-4Ao1XfeaMWM-unsplash.jpg';

/* ────────────────────────────────────────────────────────────
   MOTION
   ──────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */
export default function VisitRwandaView({
  content,
  tours,
  siteContent,
  featuredTestimonial,
}: {
  content: VisitRwandaContent;
  tours: Tour[];
  siteContent: SiteContent;
  featuredTestimonial: Testimonial | null;
}) {
  const {
    hero,
    manifesto,
    pillarsHeader,
    pillars,
    directory,
    placeCategories,
    facts,
    seasons,
    tours: toursSection,
    finalCta,
  } = content;
  const heroStats = [
    siteContent.mountainGorillas && {
      value: siteContent.mountainGorillas,
      label: 'Mountain gorillas (and counting)',
    },
    siteContent.gorillaFamilies && {
      value: siteContent.gorillaFamilies,
      label: 'Gorilla families · Volcanoes NP',
    },
    siteContent.nationalParks && {
      value: siteContent.nationalParks,
      label: 'National parks',
    },
    siteContent.hills && {
      value: siteContent.hills,
      label: 'Hills · the country’s nickname',
    },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <main className="overflow-hidden bg-white">
      {/* ═════════════════════════════════════════════════════════
          HERO
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteContent.visitRwandaHeroImage || HERO_FALLBACK}
            alt="A silverback mountain gorilla in Volcanoes National Park, Rwanda"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto max-w-[1280px] px-6 pb-10 lg:px-10 lg:pb-12">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-5xl text-white"
            >
              {/* Wordmark */}
              <motion.div
                variants={reveal}
                className="mb-9 inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/5 px-4 py-2 backdrop-blur"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#7C8A3F] text-[0.55rem] font-bold tracking-widest">
                  VR
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5em]">
                  {hero.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(3rem,9.5vw,9rem)] leading-[0.9] tracking-[-0.05em]"
              >
                <span className="block font-light">{hero.titleLight}</span>
                <span className="block font-bold text-[#7C8A3F]">{hero.titleAccent}</span>
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-8 max-w-xl text-balance text-xl leading-9 text-white/85 lg:text-2xl lg:leading-10"
              >
                {hero.body}
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-7">
                <Link
                  href={hero.cta1Href}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#7C8A3F] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
                >
                  {hero.cta1Label}
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={hero.cta2Href}
                  className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/90 transition hover:text-[#7C8A3F]"
                >
                  <span className="relative pb-1">
                    {hero.cta2Label}
                    <span className="absolute -bottom-0 left-0 h-px w-full bg-white/40 transition group-hover:bg-[#7C8A3F]" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero stats — only render when any are set in admin */}
            {heroStats.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
                className={`mt-10 grid grid-cols-2 gap-px border-t border-white/15 pt-6 sm:grid-cols-${Math.min(heroStats.length, 4)}`}
              >
                {heroStats.map((s) => (
                  <li key={s.label} className="px-1 py-1 text-white">
                    <p className="text-3xl font-light tracking-tight sm:text-4xl">{s.value}</p>
                    <p className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/65">
                      {s.label}
                    </p>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          MANIFESTO
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
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
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                {manifesto.eyebrowTop}
                <br />
                <span className="text-neutral-400">{manifesto.eyebrowIndex}</span>
              </span>
            </motion.div>

            <motion.p
              variants={reveal}
              className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
            >
              {manifesto.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          SIX PILLARS — alternating editorial blocks
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px] space-y-16 lg:space-y-20">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-9 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                {pillarsHeader.eyebrow}
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                <span className="font-bold">{pillarsHeader.titleBold}</span>{' '}
                <span className="font-light">{pillarsHeader.titleLight}</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">{pillarsHeader.body}</p>
          </motion.header>

          {pillars.map((p, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`relative isolate aspect-[4/5] overflow-hidden rounded-sm ${
                    flipped ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
                    {p.eyebrow}
                  </span>
                </div>

                <div className={`space-y-7 ${flipped ? 'lg:order-1' : ''}`}>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                    {p.eyebrow}
                  </p>
                  <h3 className="text-balance text-[clamp(2rem,4vw,3rem)] font-light leading-[1.04] tracking-[-0.025em] text-neutral-950">
                    {p.title}
                  </h3>
                  <p className="max-w-lg text-lg leading-9 text-neutral-700">{p.body}</p>
                  <ul className="space-y-px pt-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-4 border-t border-neutral-200 py-3.5 text-[0.95rem] leading-7 text-neutral-800 last:border-b"
                      >
                        <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#7C8A3F]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          PLACES BY CATEGORY — Cultural, History, Memory, Nature, Modern
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                {directory.eyebrow}
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                <span className="font-light">{directory.titleLight}</span>{' '}
                <span className="font-bold">{directory.titleBold}</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">{directory.body}</p>
          </motion.header>

          {/* Category tab row — anchor links to each category */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 flex flex-wrap items-center gap-2 border-y border-neutral-200 py-4"
          >
            <span className="mr-3 text-[0.58rem] font-medium uppercase tracking-[0.4em] text-neutral-400">
              {directory.jumpLabel}
            </span>
            {placeCategories.map((c) => (
              <a
                key={c.title}
                href={`#cat-${c.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-neutral-700 transition hover:border-[#7C8A3F] hover:text-[#7C8A3F]"
              >
                <span className="h-1 w-1 rounded-full bg-[#7C8A3F]" />
                {c.title}
              </a>
            ))}
          </motion.div>

          <div className="space-y-16 lg:space-y-20">
            {placeCategories.map((cat) => (
              <motion.article
                key={cat.title}
                id={`cat-${cat.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-28 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
              >
                {/* LEFT — sticky image + category meta */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="relative isolate aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(min-width: 1024px) 460px, 100vw"
                      className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                        {cat.eyebrow}
                      </p>
                      <h3 className="mt-2 text-balance text-3xl font-light leading-tight tracking-tight lg:text-4xl">
                        {cat.title}
                      </h3>
                      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.32em] text-white/75">
                        {String(cat.places.length).padStart(2, '0')} places
                      </p>
                    </div>
                  </div>
                  <p className="mt-7 text-base leading-8 text-neutral-700">{cat.tagline}</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{cat.description}</p>
                </div>

                {/* RIGHT — places list */}
                <ul className="space-y-px">
                  {cat.places.map((place, i) => (
                    <li
                      key={place.name}
                      className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-neutral-200 py-6 last:border-b sm:gap-7"
                    >
                      <span className="pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-2">
                        <p className="text-balance text-xl font-light leading-snug tracking-tight text-neutral-950">
                          {place.name}
                        </p>
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#7C8A3F]">
                          {place.location}
                        </p>
                        <p className="text-[0.95rem] leading-7 text-neutral-600">{place.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          COUNTRY AT A GLANCE
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="space-y-4">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                {facts.eyebrow}
              </p>
              <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                {facts.headingLead}
                <span className="font-bold">{facts.headingAccent}</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-600">{facts.body}</p>
          </motion.header>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-2">
            {facts.items.map((f) => (
              <li key={f.k} className="bg-white px-8 py-7">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                  {f.k}
                </p>
                <p className="mt-2.5 text-lg font-medium text-neutral-950">{f.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          WHEN TO VISIT
         ═════════════════════════════════════════════════════════ */}
      <section className="bg-neutral-950 px-6 py-32 text-white lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-5">
                <span className="inline-block h-px w-10 bg-[#7C8A3F]" />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-white/55">
                  {seasons.eyebrow}
                </span>
              </div>
              <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] font-light leading-[1.02] tracking-[-0.03em]">
                {seasons.headingLead}
                <span className="font-bold text-[#7C8A3F]">{seasons.headingAccent}</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-white/70">{seasons.body}</p>
            </div>

            <ol className="space-y-px">
              {seasons.items.map((s, i) => (
                <motion.li
                  key={s.span}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
                  className="border-t border-white/10 py-9 first:border-t-0 first:pt-0"
                >
                  <div className="grid items-start gap-8 sm:grid-cols-[0.22fr_1fr]">
                    <div>
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                        {s.span}
                      </p>
                      <p className="mt-3 text-xl font-light tracking-tight">{s.name}</p>
                    </div>
                    <div>
                      <p className="text-base leading-8 text-white/75">{s.body}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.best.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/85 backdrop-blur"
                          >
                            <span className="h-1 w-1 rounded-full bg-[#7C8A3F]" />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CURATED RWANDA TOURS
         ═════════════════════════════════════════════════════════ */}
      {tours.length > 0 && (
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-neutral-200 pb-9 lg:flex-row lg:items-end"
            >
              <div className="space-y-4">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                  {toursSection.eyebrow}
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                  {toursSection.titleLead}
                  <span className="font-bold">{toursSection.titleAccent}</span>
                  {toursSection.titleRest}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-neutral-600">{toursSection.body}</p>
            </motion.header>

            <ul className="grid gap-6 md:grid-cols-2">
              {tours.map((t, i) => (
                <motion.li
                  key={t.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.85, delay: i * 0.06, ease: 'easeOut' }}
                >
                  <Link
                    href={`/destinations/rwanda/tours/${t.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-sm bg-white ring-1 ring-neutral-200 transition hover:ring-[#7C8A3F]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {t.image && (
                        <Image
                          src={t.image}
                          alt={t.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
                        />
                      )}
                      <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur">
                        {String(i + 1).padStart(2, '0')} · {t.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-8">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        <span>{t.duration}</span>
                        <span className="text-neutral-300">·</span>
                        <span>{t.pace}</span>
                        <span className="text-neutral-300">·</span>
                        <span>{t.group}</span>
                      </div>
                      <h3 className="text-balance text-2xl font-light leading-tight tracking-tight text-neutral-950 transition group-hover:text-[#7C8A3F]">
                        {t.title}
                      </h3>
                      <p className="text-sm leading-7 text-neutral-600">{t.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#7C8A3F] transition group-hover:gap-3">
                        Open route
                        <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <Link
                href={toursSection.ctaHref}
                className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#7C8A3F] hover:text-[#7C8A3F]"
              >
                {toursSection.ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          GUEST QUOTE — only renders when a featured testimonial exists
         ═════════════════════════════════════════════════════════ */}
      {featuredTestimonial && (
        <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative isolate hidden aspect-[4/5] overflow-hidden rounded-sm lg:block"
              >
                <Image
                  src={featuredTestimonial.image || TESTIMONIAL_FALLBACK}
                  alt={featuredTestimonial.attribution}
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                className="space-y-10"
              >
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                  Guest story
                </span>
                <blockquote className="text-balance text-[clamp(1.85rem,3.6vw,3.1rem)] font-light leading-[1.18] tracking-[-0.02em] text-neutral-950">
                  <span className="text-[#7C8A3F]">“</span>
                  {featuredTestimonial.quote}
                  <span className="text-[#7C8A3F]">.”</span>
                </blockquote>
                <figcaption className="flex items-center gap-5">
                  <span className="h-px w-10 bg-neutral-300" />
                  <div>
                    <p className="text-base font-medium text-neutral-950">
                      {featuredTestimonial.attribution}
                    </p>
                    {featuredTestimonial.context && (
                      <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                        {featuredTestimonial.context}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          FINAL CTA
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-32 text-white lg:px-10 lg:py-40">
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
                {finalCta.eyebrow}
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">{finalCta.titleLight}</span>
                <br />
                <span className="font-bold text-[#7C8A3F]">{finalCta.titleAccent}</span>
              </motion.h2>
            </div>

            <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
              <Link
                href={finalCta.ctaHref}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#7C8A3F] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                {finalCta.ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={finalCta.cta2Href}
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#7C8A3F]"
              >
                <span className="relative pb-1">
                  {finalCta.cta2Label}
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
