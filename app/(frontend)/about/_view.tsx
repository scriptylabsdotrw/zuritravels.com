'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TravellerVoices from '@/components/sections/TravellerVoices';
import type {
  AboutContent,
  Milestone,
  Partner,
  PressFeature,
  Principle,
  SectionsContent,
  SiteContent,
} from '@/lib/types';

type AboutViewProps = {
  about: AboutContent;
  voices: SectionsContent['voices'];
  siteContent: SiteContent;
  principles: Principle[];
  milestones: Milestone[];
  partners: Partner[];
  pressFeatures: PressFeature[];
};

const HERO_FALLBACK = '/images/simone-dinoia-x7Aizp5YZX0-unsplash.jpg';

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
  about,
  voices,
  siteContent,
  principles,
  milestones,
  partners,
  pressFeatures,
}: AboutViewProps) {
  const { expertise, differentiators, team, faq } = about;
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
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteContent.aboutHeroImage || HERO_FALLBACK}
            alt="An aerial view of Rwanda's thousand hills"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-36 text-white lg:px-10 lg:pb-28">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.4em] text-white/85"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C8A3F] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
              </span>
              <span>{about.hero.eyebrow}</span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="max-w-4xl text-balance text-[clamp(2.8rem,8vw,7rem)] leading-[0.94] tracking-[-0.04em]"
            >
              <span className="block font-light">{about.hero.titleLight}</span>
              <span className="block font-bold text-[#7C8A3F]">{about.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-10 max-w-2xl text-balance text-xl leading-9 text-white/80 lg:text-2xl lg:leading-10"
            >
              {about.hero.body}
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <Link
                href={about.hero.cta1Href}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-neutral-950 transition hover:bg-[#7C8A3F] hover:text-white"
              >
                {about.hero.cta1Label}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={about.hero.cta2Href}
                className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-[#7C8A3F]"
              >
                <span className="relative pb-1">
                  {about.hero.cta2Label}
                  <span className="absolute -bottom-0 left-0 h-px w-full bg-white/35 transition group-hover:bg-[#7C8A3F]" />
                </span>
              </Link>
            </motion.div>
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
              <span className="font-bold text-[#7C8A3F]">{about.intro.headingLead}</span>
              {about.intro.headingBody}
            </motion.h2>

            <motion.div variants={reveal} className="space-y-6 text-base leading-8 text-neutral-600">
              <p>{about.intro.p1}</p>
              <p>{about.intro.p2}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={about.intro.cta1Href}
                  className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#7C8A3F]"
                >
                  {about.intro.cta1Label}
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={about.intro.cta2Href}
                  className="inline-flex items-center gap-3 rounded-full border border-neutral-200 px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-900 transition hover:border-[#7C8A3F] hover:text-[#7C8A3F]"
                >
                  {about.intro.cta2Label}
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
              src={about.story.image}
              alt="A silverback mountain gorilla in Volcanoes National Park, Rwanda"
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/70">
                {about.story.captionLabel}
              </p>
              <p className="mt-1 text-3xl font-light tracking-tight">{about.story.captionValue}</p>
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
              {about.story.eyebrow}
            </motion.p>
            <motion.h2
              variants={reveal}
              className="text-balance text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950"
            >
              {about.story.headingLead}
              <span className="font-bold">{about.story.headingAccent}</span>
            </motion.h2>
            <motion.div variants={reveal} className="space-y-5 text-lg leading-9 text-neutral-600">
              <p>{about.story.p1}</p>
              <p>{about.story.p2}</p>
              <p>{about.story.p3}</p>
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
                  {expertise.eyebrow}
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  {expertise.headingLead}
                  <span className="font-bold">{expertise.headingAccent}</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">{expertise.body}</p>
          </motion.header>

          <ul className="grid gap-px overflow-hidden rounded-sm bg-neutral-200/80 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.items.map((e, i) => (
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
                    {about.principles.eyebrow}
                  </span>
                </div>
                <h2 className="mt-8 text-balance text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                  <span className="font-light">{about.principles.titleLight}</span>
                  <br />
                  <span className="font-bold text-[#7C8A3F]">{about.principles.titleAccent}</span>
                </h2>
                <p className="mt-7 max-w-md text-base leading-8 text-white/65">
                  {about.principles.body}
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
                {differentiators.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                {differentiators.headingLead}
                <span className="font-bold">{differentiators.headingAccent}</span>
              </h2>
            </div>
          </motion.header>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.items.map((d, i) => (
              <motion.li
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.08, ease: 'easeOut' }}
                className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8 transition hover:border-[#7C8A3F]/30 hover:bg-white hover:shadow-[0_4px_24px_rgba(124,138,63,0.08)]"
              >
                <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#7C8A3F]/10 text-[0.6rem] font-bold text-[#7C8A3F]">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
                  {team.eyebrow}
                </p>
                <h2 className="mt-3 text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
                  {team.headingLead}
                  <span className="font-bold">{team.headingAccent}</span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-base leading-8 text-neutral-600">{team.body}</p>
          </motion.header>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.members.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition hover:shadow-[0_6px_32px_rgba(0,0,0,0.08)] lg:p-9"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 text-lg font-light text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                  {m.name[0]}
                </span>
                <h3 className="mt-7 text-xl font-medium tracking-tight text-neutral-950">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.34em] text-[#7C8A3F]">
                  {m.role}
                </p>
                <p className="mt-5 flex-1 text-sm leading-7 text-neutral-600">{m.bio}</p>
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
            src={about.conservation.image}
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
                {about.conservation.eyebrow}
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em]"
              >
                {about.conservation.headingLead}
                <span className="font-bold text-[#7C8A3F]">{about.conservation.headingAccent}</span>
              </motion.h2>
              <motion.p variants={reveal} className="max-w-lg text-lg leading-9 text-white/70">
                {about.conservation.p1}
              </motion.p>
              <motion.p variants={reveal} className="max-w-lg text-base leading-8 text-white/55">
                {about.conservation.p2}
              </motion.p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              variants={stagger}
              className="grid content-center gap-px overflow-hidden rounded-sm bg-white/10"
            >
              {about.conservation.impact.map((item) => (
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
                  {about.milestones.eyebrow}
                </p>
                <h2 className="text-balance text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
                  {about.milestones.headingLead}
                  <span className="font-bold">{about.milestones.headingAccent}</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-neutral-600">{about.milestones.body}</p>
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
      <TravellerVoices content={voices} />

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
              src={about.studio.image}
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
              {about.studio.eyebrow}
            </p>
            <h2 className="text-balance text-[clamp(2.2rem,4.4vw,3.4rem)] font-light leading-tight tracking-[-0.025em] text-neutral-950">
              {about.studio.headingLead}
              <span className="font-bold">{about.studio.headingAccent}</span>
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
                {faq.eyebrow}
              </span>
            </div>
            <h2 className="mt-8 text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.04] tracking-[-0.03em] text-neutral-950">
              {faq.headingLead}
              <span className="font-bold">{faq.headingAccent}</span>
            </h2>
            <p className="mt-7 max-w-sm text-base leading-8 text-neutral-600">{faq.body}</p>
            <Link
              href={faq.ctaHref}
              className="group mt-7 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neutral-900 transition hover:text-[#7C8A3F]"
            >
              {faq.ctaLabel}
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faq.items.map((f) => (
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
                {about.finalCta.eyebrow}
              </motion.p>
              <motion.h2
                variants={reveal}
                className="text-balance text-[clamp(2.4rem,5.2vw,4.6rem)] font-light leading-[1.02] tracking-[-0.035em]"
              >
                <span className="font-light">{about.finalCta.titleLight}</span>
                <br />
                <span className="font-bold text-[#7C8A3F]">{about.finalCta.titleAccent}</span>
              </motion.h2>
            </div>

            <motion.div variants={reveal} className="flex flex-col gap-4 lg:items-end">
              <Link
                href={about.finalCta.ctaHref}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#7C8A3F] px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-neutral-950"
              >
                {about.finalCta.ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={about.finalCta.cta2Href}
                className="group inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/75 transition hover:text-[#7C8A3F]"
              >
                <span className="relative pb-1">
                  {about.finalCta.cta2Label}
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
