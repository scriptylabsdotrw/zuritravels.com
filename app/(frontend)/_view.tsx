'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Story from '@/components/sections/Story';
import Method from '@/components/sections/Method';
import TravellerVoices from '@/components/sections/TravellerVoices';
import type {
  HomeContent,
  JournalPost,
  Partner,
  PressFeature,
  Principle,
  SectionsContent,
  SiteContent,
  Testimonial,
} from '@/lib/types';

type HomeViewProps = {
  home: HomeContent;
  sections: SectionsContent;
  siteContent: SiteContent;
  principles: Principle[];
  pressFeatures: PressFeature[];
  partners: Partner[];
  featuredTestimonial: Testimonial | null;
  journal: JournalPost[];
};

const formatDate = (iso: string) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/* ──────────────────────────────────────────────────────────────
   IMAGERY
   ────────────────────────────────────────────────────────────── */
const HERO_GORILLA = '/images/2h-media-PIU27R-xL04-unsplash.jpg';

/* ──────────────────────────────────────────────────────────────
   MOTION HELPERS
   ────────────────────────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
export default function HomeView({
  home,
  sections,
  siteContent,
  principles,
  pressFeatures,
  partners,
  featuredTestimonial,
  journal,
}: HomeViewProps) {
  const expeditions = home.expeditions;
  /* Derive runtime values from DB content */
  const stats = [
    siteContent.foundedYear && { value: siteContent.foundedYear, label: 'Founded · Kigali' },
    siteContent.countries && { value: siteContent.countries, label: 'African countries' },
    siteContent.travellersHosted && { value: siteContent.travellersHosted, label: 'Travellers hosted' },
    siteContent.curatedLodges && { value: siteContent.curatedLodges, label: 'Curated lodges' },
  ].filter(Boolean) as { value: string; label: string }[];

  /* Split partners into two rows for the marquee — only if any exist */
  const partnersRowOne = partners;
  const partnersRowTwo = [...partners].reverse();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  useEffect(() => {
    let rafId: number;
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true, lerp: 0.08 });
    const animate = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="overflow-x-clip bg-white">
      {/* ═════════════════════════════════════════════════════════
          VISIT RWANDA STRIP — prominent Rwanda CTA at the top
         ═════════════════════════════════════════════════════════ */}
      <Link
        href={home.announcement.href}
        className="group block bg-[#7C8A3F] text-white transition hover:bg-[#97a65a]"
      >
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 text-center text-[0.65rem] font-medium uppercase tracking-[0.32em] lg:px-10">
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span className="font-semibold tracking-[0.4em]">{home.announcement.label}</span>
          </span>
          <span className="opacity-50">·</span>
          <span className="font-light tracking-[0.28em]">{home.announcement.text}</span>
          <span className="inline-flex items-center gap-2 font-semibold underline-offset-4 group-hover:underline">
            {home.announcement.cta}
            <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>

      {/* ═════════════════════════════════════════════════════════
          HERO — Cleaner editorial composition, weight-driven type
         ═════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative isolate flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden"
      >
        {/* Background image + parallax + Ken Burns */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <div className="ken-burns h-full w-full">
              <Image
                src={siteContent.homeHeroImage || HERO_GORILLA}
                alt="A silverback mountain gorilla beside a tree in Volcanoes National Park, Rwanda"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_40%]"
              />
            </div>
            <div className="hero-overlay" />
          </div>
        </motion.div>

        {/* Bottom composition — location pin is now an eyebrow above the headline */}
        <div className="relative z-10 mt-auto w-full">
          <div className="mx-auto max-w-[1280px] px-6 pb-10 lg:px-10 lg:pb-14">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-5xl text-white"
            >
              {/* Location pin — eyebrow */}
              <motion.div
                variants={reveal}
                className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85"
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8A3F] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F] shadow-[0_0_12px_rgba(124,138,63,0.8)]" />
                </span>
                <span>{home.hero.eyebrow}</span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="text-balance text-[clamp(3rem,9vw,8.4rem)] leading-[0.92] tracking-[-0.05em]"
              >
                <span className="block font-light">{home.hero.titleLine1}</span>
                <span className="block font-light">{home.hero.titleLine2}</span>
                <span className="block font-bold text-[#7C8A3F]">{home.hero.titleAccent}</span>
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-10 max-w-xl text-balance text-lg leading-9 text-white/80"
              >
                {home.hero.body}
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-7">
                <Link
                  href={home.hero.cta1Href}
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:bg-[#7C8A3F] hover:text-white"
                >
                  {home.hero.cta1Label}
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={home.hero.cta2Href}
                  className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/90 transition hover:text-[#7C8A3F]"
                >
                  <span className="relative pb-1">
                    {home.hero.cta2Label}
                    <span className="absolute -bottom-0 left-0 h-px w-full bg-white/40 transition group-hover:bg-[#7C8A3F]" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom meta strip — full-width hairline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-7 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-white/55 sm:flex-row sm:items-center"
            >
              <span>{siteContent.bookingStatus || 'Now booking · Seasons 2026 / 2027'}</span>

              <span className="hidden h-px w-12 bg-white/20 sm:block" aria-hidden />

              <span className="flex items-center gap-3 text-white/65">
                <span>Scroll</span>
                <span className="scroll-cue h-8" aria-hidden />
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          STAT RIBBON — only renders when any stat is set in admin
         ═════════════════════════════════════════════════════════ */}
      {stats.length > 0 && (
        <section className="border-y border-neutral-200/80 bg-white">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <ul
              className={`hairline-grid grid grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)}`}
            >
              {stats.map((s) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="px-6 py-10 text-center sm:py-12"
                >
                  <p className="text-4xl font-light tracking-tight text-neutral-950 sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500">
                    {s.label}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════
          MANIFESTO — Single oversized sentence
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32" id="about">
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
                {home.manifesto.index}
                <br />
                {home.manifesto.label}
              </span>
            </motion.div>

            <motion.p
              variants={reveal}
              className="text-balance text-[clamp(1.85rem,3.8vw,3.4rem)] font-light leading-[1.18] tracking-[-0.025em] text-neutral-950"
            >
              {home.manifesto.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          OUR STORY — pinned horizontal-scroll timeline
         ═════════════════════════════════════════════════════════ */}
      <Story content={sections.story} />

      {/* ═════════════════════════════════════════════════════════
          THE METHOD — four pillars + parallax columns
         ═════════════════════════════════════════════════════════ */}
      <Method content={sections.method} />

      {/* ═════════════════════════════════════════════════════════
          TRAVELLER VOICES — trust / testimonials grid
         ═════════════════════════════════════════════════════════ */}
      <TravellerVoices content={sections.voices} />

      {/* ═════════════════════════════════════════════════════════
          FEATURED EXPEDITION — Gorilla editorial spread
         ═════════════════════════════════════════════════════════ */}
      <section className="relative bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
          >
            <motion.div variants={reveal} className="mb-14 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  {home.featured.eyebrowIndex}
                </span>
                <span className="h-px w-16 bg-neutral-200" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                  {home.featured.eyebrowTag}
                </span>
              </div>
              <Link
                href="/destinations"
                className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-neutral-950 sm:inline"
              >
                All destinations →
              </Link>
            </motion.div>

            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <motion.div variants={reveal} className="relative isolate aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src={home.featured.image}
                  alt="A young mountain gorilla looking through the canopy"
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover transition duration-[1500ms] ease-out hover:scale-[1.04]"
                />
                <div className="absolute left-7 top-7 inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" /> {home.featured.imageLabel}
                </div>
              </motion.div>

              <motion.div variants={reveal} className="space-y-9">
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                  {home.featured.meta}
                </p>
                <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.035em] text-neutral-950">
                  {home.featured.titleLine1}
                  <br />
                  {home.featured.titleLead}
                  <span className="font-bold text-[#7C8A3F]">{home.featured.titleAccent}</span>.
                </h2>
                <p className="max-w-lg text-lg leading-9 text-neutral-600">{home.featured.body}</p>

                <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-3">
                  {home.featured.specs.map((row) => (
                    <li key={row.k} className="bg-white px-5 py-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.35em] text-neutral-500">
                        {row.k}
                      </p>
                      <p className="mt-2 text-base font-medium text-neutral-950">{row.v}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <Link
                    href={home.featured.ctaHref}
                    className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#7C8A3F]"
                  >
                    {home.featured.ctaLabel}
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href={home.featured.tailorHref}
                    className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-700 underline-offset-4 hover:text-[#7C8A3F] hover:underline"
                  >
                    {home.featured.tailorLabel}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          EXPEDITIONS LIST — Editorial numbered list (not a grid)
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <h2 className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                <span className="font-bold">{home.expeditionsHeadingBold}</span>
                <br />
                <span className="font-light text-neutral-400">{home.expeditionsHeadingLight}</span>
              </h2>
            </div>
            <Link
              href="/destinations"
              className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-[#7C8A3F] sm:inline"
            >
              See all →
            </Link>
          </div>

          <ul className="divide-y divide-neutral-200">
            {expeditions.map((exp, i) => (
              <motion.li
                key={`${exp.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
              >
                <Link
                  href={exp.href}
                  className="group grid items-center gap-6 py-8 transition lg:grid-cols-[0.6fr_2fr_1.3fr_1fr_auto] lg:py-10"
                >
                  <span className="text-[0.72rem] uppercase tracking-[0.4em] text-neutral-400 transition group-hover:text-[#7C8A3F]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-balance text-3xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#7C8A3F] lg:text-4xl">
                    {exp.title}
                  </h3>

                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-500">
                    {exp.location}
                  </p>

                  <p className="text-[0.72rem] uppercase tracking-[0.32em] text-neutral-500">
                    {exp.duration}
                  </p>

                  {/* Hover-revealed thumbnail */}
                  <div className="relative ml-auto hidden h-20 w-28 overflow-hidden rounded-sm opacity-0 transition duration-500 group-hover:opacity-100 lg:block">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          STUDIO PHILOSOPHY — only renders when principles exist in admin
         ═════════════════════════════════════════════════════════ */}
      {principles.length > 0 && (
        <section className="bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-center gap-5">
                  <span className="inline-block h-px w-10 bg-[#7C8A3F]" />
                  <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
                    {home.philosophy.eyebrow}
                  </span>
                </div>
                <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                  <span className="font-light">{home.philosophy.titleLight}</span>
                  <br />
                  <span className="font-bold text-[#7C8A3F]">{home.philosophy.titleAccent}</span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-8 text-white/65">
                  {home.philosophy.body}
                </p>
              </div>

              <ol className="space-y-px">
                {principles.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.85, delay: i * 0.08, ease: 'easeOut' }}
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
          DESTINATION SPOTLIGHT — Rwanda
         ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 sm:grid-cols-5 sm:grid-rows-2"
            >
              {/* Gorilla — hero of the gallery */}
              <div className="relative isolate aspect-[4/5] overflow-hidden rounded-sm sm:col-span-3 sm:row-span-2 sm:aspect-auto">
                <Image
                  src={home.spotlight.galleryGorilla}
                  alt="A silverback mountain gorilla in Volcanoes National Park"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">
                    {home.spotlight.countryLabel}
                  </p>
                  <p className="mt-1.5 text-3xl font-light tracking-tight">
                    {home.spotlight.countryName}
                  </p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.32em] text-[#7C8A3F]">
                    {home.spotlight.countryTag}
                  </p>
                </div>
              </div>

              {/* Intore culture */}
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-sm sm:col-span-2 sm:aspect-auto">
                <Image
                  src={home.spotlight.galleryIntore}
                  alt="Intore traditional Rwandan dancers"
                  fill
                  sizes="(min-width: 1024px) 260px, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[0.6rem] uppercase tracking-[0.32em] text-white">
                  {home.spotlight.intoreLabel}
                </p>
              </div>

              {/* Safari */}
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-sm sm:col-span-2 sm:aspect-auto">
                <Image
                  src={home.spotlight.gallerySafari}
                  alt="Akagera plains safari in Rwanda"
                  fill
                  sizes="(min-width: 1024px) 260px, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-[0.6rem] uppercase tracking-[0.32em] text-white">
                  {home.spotlight.safariLabel}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="space-y-9"
            >
              <motion.p variants={reveal} className="text-[0.65rem] uppercase tracking-[0.4em] text-neutral-500">
                {home.spotlight.eyebrow}
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,4.8vw,4rem)] font-light leading-[1.02] tracking-[-0.03em] text-neutral-950"
              >
                {home.spotlight.heading}
              </motion.h2>
              <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-neutral-600">
                {home.spotlight.body}
              </motion.p>

              <motion.ul variants={reveal} className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4">
                {home.spotlight.facts.map((row) => (
                  <li key={row.k} className="border-t border-neutral-200 pt-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.32em] text-neutral-500">
                      {row.k}
                    </p>
                    <p className="mt-2 text-base text-neutral-900">{row.v}</p>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={reveal} className="pt-4">
                <Link
                  href={home.spotlight.ctaHref}
                  className="group inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition hover:border-[#7C8A3F] hover:text-[#7C8A3F]"
                >
                  {home.spotlight.ctaLabel}
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          GUEST STORY — only renders when a featured testimonial exists
         ═════════════════════════════════════════════════════════ */}
      {featuredTestimonial && (
        <section className="bg-neutral-50/70 px-6 py-20 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              {featuredTestimonial.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative isolate hidden aspect-[4/5] overflow-hidden rounded-sm lg:block"
                >
                  <Image
                    src={featuredTestimonial.image}
                    alt={featuredTestimonial.attribution}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
                className="space-y-10"
              >
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
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
                      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.32em] text-neutral-500">
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
          JOURNAL — only renders when journal posts exist
         ═════════════════════════════════════════════════════════ */}
      {journal.length > 0 && (
        <section className="px-6 py-20 lg:px-10 lg:py-32" id="journal">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-16 flex items-end justify-between gap-8">
              <div className="flex items-start gap-5">
                <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
                <h2 className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  {home.journalHeading}
                </h2>
              </div>
              <Link
                href="/journal"
                className="hidden text-[0.7rem] uppercase tracking-[0.32em] text-neutral-700 hover:text-[#7C8A3F] sm:inline"
              >
                All journal →
              </Link>
            </div>

            <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 lg:grid-cols-3">
              {journal.map((j, i) => (
                <motion.li
                  key={j.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                className="bg-white transition hover:bg-neutral-50"
              >
                <Link href={`/journal/${j.slug}`} className="group block p-10">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                    {j.category}
                  </p>
                  <h3 className="mt-9 text-balance text-2xl leading-[1.2] tracking-tight text-neutral-950 transition group-hover:text-[#7C8A3F]">
                    <span className="font-bold">{j.title}</span>
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-neutral-600 line-clamp-3">{j.excerpt}</p>
                  <div className="mt-10 flex items-center justify-between text-[0.7rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    <span>
                      {formatDate(j.publishedAt)} · {j.readTime}
                    </span>
                    <span className="transition group-hover:translate-x-1 group-hover:text-[#7C8A3F]">
                      Read →
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
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
            className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#7C8A3F]">
                  {home.partners.eyebrow}
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  <span className="font-bold">{home.partners.titleBold}</span>{' '}
                  <span className="font-light">{home.partners.titleLight}</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">{home.partners.body}</p>
          </motion.div>
        </div>

        {/* Row 1 — scrolls right-to-left */}
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

        {/* Row 2 — scrolls left-to-right (reverse) */}
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
          FINAL CTA — Quiet, full-bleed
         ═════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-neutral-950 px-6 py-20 text-white lg:px-10 lg:py-32">
        <div className="glow-orb left-[-12rem] top-1/2 -translate-y-1/2 opacity-50" aria-hidden />
        <div className="glow-orb right-[-12rem] top-1/4 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1180px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={stagger}
            className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div className="space-y-8">
              <motion.p variants={reveal} className="text-[0.65rem] uppercase tracking-[0.4em] text-[#7C8A3F]">
                {home.finalCta.eyebrow}
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">{home.finalCta.titleLight}</span>
                <br />
                <span className="font-bold text-[#7C8A3F]">{home.finalCta.titleAccent}</span>
              </motion.h2>
            </div>

            <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
              <Link
                href={home.finalCta.ctaHref}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#7C8A3F] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                {home.finalCta.ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={home.finalCta.cta2Href}
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] uppercase tracking-[0.32em] text-white/75 transition hover:text-[#7C8A3F]"
              >
                <span className="relative">
                  {home.finalCta.cta2Label}
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-white/30 transition group-hover:bg-[#7C8A3F]" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
