'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Destination, DestinationsContent } from '@/lib/types';

const HERO_IMG = '/images/simone-dinoia-x7Aizp5YZX0-unsplash.jpg';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function DestinationsView({
  destinations,
  content,
}: {
  destinations: Destination[];
  content: DestinationsContent;
}) {
  const eastAfrica = destinations
    .filter((d) => d.region === 'East Africa')
    .sort((a, b) => {
      if (a.slug === 'rwanda') return -1;
      if (b.slug === 'rwanda') return 1;
      return a.name.localeCompare(b.name);
    });
  const elsewhere = destinations.filter((d) => d.region !== 'East Africa');

  const totalTours = destinations.reduce((sum, d) => sum + d.tours.length, 0);
  const totalLodges = destinations.reduce((sum, d) => sum + d.signatureLodges.length, 0);

  const featured = eastAfrica[0];
  const eastAfricaRest = eastAfrica.slice(1);

  const heroStats = [
    { value: String(destinations.length).padStart(2, '0'), label: content.stats.countriesLabel },
    { value: String(totalTours), label: content.stats.toursLabel },
    { value: String(totalLodges), label: content.stats.lodgesLabel },
    { value: content.stats.foundedValue, label: content.stats.foundedLabel },
  ];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════════════════
          HERO — full-bleed gorilla portrait with parallax
         ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[82svh] flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <Image
            src={HERO_IMG}
            alt="A mountain gorilla — up close in the rainforest"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_18%]"
          />
          <div className="hero-overlay" />
          {/* Extra vignette for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-0 pt-36 lg:px-10">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/80"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8A3F] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
              </span>
              <span>{content.hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="max-w-4xl text-balance text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.05em] text-white"
            >
              <span className="block font-light">{content.hero.titleLight}</span>
              <span className="block font-bold text-[#7C8A3F]">{content.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-8 max-w-lg text-lg leading-9 text-white/75"
            >
              {content.hero.body}
            </motion.p>
          </motion.div>
        </div>

        {/* Stats ribbon — sits at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 mt-16 w-full border-t border-white/15"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 sm:grid-cols-4">
            {heroStats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-8 text-white lg:px-10 ${
                  i < heroStats.length - 1 ? 'border-r border-white/10' : ''
                }`}
              >
                <p className="text-3xl font-light tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-[0.6rem] font-medium uppercase tracking-[0.35em] text-white/55">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EAST AFRICA — Region 01
         ═══════════════════════════════════════════════════════ */}
      {featured && (
        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="flex flex-col items-start justify-between gap-5 border-b border-neutral-200 pb-7 lg:flex-row lg:items-end"
            >
              <div className="space-y-3">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-[#7C8A3F]">
                  {content.eastRegion.eyebrow}
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                  <span className="font-bold">{content.eastRegion.titleBold}</span>{' '}
                  <span className="font-light">{content.eastRegion.titleLight}</span>
                </h2>
              </div>
              <div className="flex items-center gap-6 text-[0.63rem] font-medium uppercase tracking-[0.38em] text-neutral-500">
                <span>{eastAfrica.length} countries</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>{eastAfrica.reduce((s, d) => s + d.tours.length, 0)} tours</span>
              </div>
            </motion.header>

            {/* Featured Rwanda — split card */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/destinations/${featured.slug}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-200/70 shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_48px_rgba(0,0,0,0.1)]"
              >
                <article className="grid lg:grid-cols-[1.35fr_1fr]">
                  <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
                    {featured.hero && (
                      <Image
                        src={featured.hero}
                        alt={featured.name}
                        fill
                        priority
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="object-cover transition duration-[1800ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2.5 rounded-full bg-black/40 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
                      {content.featuredLabel}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-neutral-950 p-10 text-white lg:p-14">
                    <div className="space-y-7">
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-[#7C8A3F]">
                        East Africa · {featured.tours.length} tours
                      </p>
                      <h3 className="text-balance text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[0.94] tracking-[-0.04em]">
                        {featured.name}.
                      </h3>
                      <p className="max-w-md text-lg leading-9 text-white/70">{featured.tagline}</p>
                    </div>

                    <div className="mt-10 space-y-6">
                      <ul className="space-y-px">
                        {featured.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-4 border-t border-white/10 py-3 text-sm leading-7 text-white/75 last:border-b"
                          >
                            <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#7C8A3F]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-3 pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#7C8A3F] transition group-hover:text-white">
                        Discover {featured.name}
                        <span className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>

            {/* Remaining East Africa countries */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {eastAfricaRest.map((d, i) => (
                <DestinationCard key={d.slug} d={d} index={i + 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          BEYOND EAST AFRICA — Region 02
         ═══════════════════════════════════════════════════════ */}
      {elsewhere.length > 0 && (
        <section className="bg-neutral-50/70 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="flex flex-col items-start justify-between gap-5 border-b border-neutral-200 pb-7 lg:flex-row lg:items-end"
            >
              <div className="space-y-3">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-[#7C8A3F]">
                  {content.beyondRegion.eyebrow}
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] leading-tight tracking-[-0.025em] text-neutral-950">
                  <span className="font-bold">{content.beyondRegion.titleBold}</span>{' '}
                  <span className="font-light">{content.beyondRegion.titleLight}</span>
                </h2>
              </div>
              <div className="flex items-center gap-6 text-[0.63rem] font-medium uppercase tracking-[0.38em] text-neutral-500">
                <span>{elsewhere.length} countries</span>
                <span className="h-3 w-px bg-neutral-300" />
                <span>{elsewhere.reduce((s, d) => s + d.tours.length, 0)} tours</span>
              </div>
            </motion.header>

            <div className="grid gap-5 lg:grid-cols-2">
              {elsewhere.map((d, i) => (
                <DestinationCard key={d.slug} d={d} index={i + 5} wide />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          INDEX LIST
         ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14 flex items-end justify-between gap-6"
          >
            <div className="flex items-start gap-5">
              <span className="mt-3 inline-block h-px w-10 bg-[#7C8A3F]" />
              <div>
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-neutral-500">
                  {content.indexEyebrow}
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  {content.indexTitle}
                </h2>
              </div>
            </div>
          </motion.header>

          <ul className="divide-y divide-neutral-200">
            {destinations.map((d, i) => (
              <motion.li
                key={d.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: 'easeOut' }}
              >
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group grid items-center gap-6 py-8 transition lg:grid-cols-[0.45fr_2fr_1.4fr_1fr_0.7fr_auto] lg:py-10"
                >
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.4em] text-neutral-400 transition group-hover:text-[#7C8A3F]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-balance text-3xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#7C8A3F] lg:text-4xl">
                    {d.name}
                  </h3>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.region}
                  </p>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.tours.length} tours
                  </p>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-neutral-500">
                    {d.bestTime}
                  </p>
                  <div className="relative ml-auto hidden h-20 w-28 overflow-hidden rounded-lg opacity-0 shadow-md transition duration-500 group-hover:opacity-100 lg:block">
                    {d.image && (
                      <Image src={d.image} alt={d.name} fill sizes="112px" className="object-cover" />
                    )}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA
         ═══════════════════════════════════════════════════════ */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-2xl bg-neutral-950 px-10 py-20 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-16">
          <div className="glow-orb -left-32 top-1/2 -translate-y-1/2 opacity-40" aria-hidden />
          <div className="glow-orb -right-32 top-0 opacity-25" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative grid gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-end"
          >
            <div className="space-y-7">
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-[#7C8A3F]">
                {content.finalCta.eyebrow}
              </p>
              <h2 className="text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.035em]">
                <span className="font-light">{content.finalCta.titleLight}</span>
                <br />
                <span className="font-bold text-[#7C8A3F]">{content.finalCta.titleAccent}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href={content.finalCta.cta1Href}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#7C8A3F] px-9 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                {content.finalCta.cta1Label}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={content.finalCta.cta2Href}
                className="group inline-flex w-fit items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/70 transition hover:text-[#7C8A3F]"
              >
                <span className="relative pb-1">
                  {content.finalCta.cta2Label}
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/25 transition group-hover:bg-[#7C8A3F]" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────
   DestinationCard — portrait / wide card
   ───────────────────────────────────────────────────── */
function DestinationCard({
  d,
  index,
  wide = false,
}: {
  d: Destination;
  index: number;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative isolate block overflow-hidden rounded-2xl bg-neutral-950 shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
      >
        <div className={`relative w-full overflow-hidden ${wide ? 'aspect-[16/11]' : 'aspect-[4/5]'}`}>
          {d.image && (
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
              className="object-cover transition duration-[1500ms] ease-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition group-hover:from-black/95" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 lg:p-6">
            <span className="rounded-full bg-black/40 px-3.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur-md">
              {String(index).padStart(2, '0')} · {d.region}
            </span>
            <span className="rounded-full bg-black/40 px-3.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.32em] text-white backdrop-blur-md">
              {d.tours.length} tours
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9">
            <h3 className="text-balance text-[clamp(2.2rem,4vw,3.2rem)] leading-[0.96] tracking-[-0.03em]">
              <span className="font-bold">{d.name}</span>
            </h3>
            <p className="mt-3 max-w-md text-base leading-7 text-white/75">{d.tagline}</p>
            <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-white/60">
                {d.bestTime}
              </span>
              <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#7C8A3F] transition group-hover:text-white">
                Discover
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
