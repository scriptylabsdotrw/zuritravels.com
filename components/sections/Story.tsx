'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

const chapters = [
  {
    year: '2018',
    chapter: '01',
    title: 'Founded in Kigali.',
    body: 'ZuriTravels begins with a single gorilla-trekking route through Volcanoes National Park — and one belief: that Africa is best experienced through the eyes of the guides, trackers and conservationists who call the wilderness home.',
    image:
      'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=1800&q=85',
    stat: { v: '1', l: 'Route. One belief.' },
  },
  {
    year: '2020',
    chapter: '02',
    title: 'Across the borders.',
    body: 'Journeys expand into Tanzania, Kenya and Uganda — building relationships with the finest forest lodges, plains camps and lifelong trackers across East Africa, and a logistics backbone almost no studio has.',
    image:
      'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1800&q=85',
    stat: { v: '6', l: 'Countries crafted' },
  },
  {
    year: '2023',
    chapter: '03',
    title: 'Conservation first.',
    body: 'Every itinerary is built on lodges and parks that fund gorilla conservation and community tourism — travel designed so that the wild places we love are still here for the next generation of travellers.',
    image:
      'https://images.pexels.com/photos/840111/pexels-photo-840111.jpeg?auto=compress&cs=tinysrgb&w=1800&q=85',
    stat: { v: '100%', l: 'Permits, conservation-funded' },
  },
  {
    year: 'Today',
    chapter: '04',
    title: 'Soulful at scale.',
    body: 'A studio of local guides and designers, thousands of travellers hosted, and partnerships with the most quietly extraordinary lodges on the continent — the most considered bespoke-travel house in the region.',
    image:
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1800&q=85',
    stat: { v: 'Africa', l: 'Through local eyes' },
  },
];

export default function Story() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });

  const total = chapters.length;
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', `-${((total - 1) / total) * 100}%`]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.95, 1], [1, 0.85, 0.7, 0.55]);
  const decadeY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={wrapRef}
      aria-label="Our story"
      className="relative bg-neutral-950 text-white"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: decadeY }}
          className="radial-brand-orb pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full opacity-30 blur-3xl"
        />

        <p
          aria-hidden
          className="pointer-events-none absolute -left-6 bottom-2 select-none font-display text-[28vw] font-semibold leading-none tracking-tighter text-white/[0.035] md:text-[22vw]"
        >
          2018<span className="text-[#7C8A3F]/30">→</span>
        </p>

        <motion.header
          style={{ opacity: headerOpacity }}
          className="absolute inset-x-0 top-0 z-10 mx-auto w-full max-w-[1280px] px-6 pt-28 lg:px-10 md:pt-32"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-2xl">
              <Eyebrow variant="dark">Our Story</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight md:text-[clamp(2.5rem,7vw,6.5rem)]">
                <RevealText as="span" text="A studio built by Africa," className="block text-white" />
                <RevealText
                  as="span"
                  text="for the world."
                  className="block text-gradient-brand"
                  delay={0.1}
                />
              </h2>
            </div>
            <div className="hidden max-w-xs items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-white/55 md:flex">
              <span>Scroll</span>
              <span className="relative inline-flex h-px w-16 overflow-hidden bg-white/15">
                <motion.span
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-[#7C8A3F]"
                />
              </span>
            </div>
          </div>
        </motion.header>

        <motion.div
          style={{ x: trackX, width: `${total * 100}%` }}
          className="absolute inset-0 flex h-full will-change-transform"
        >
          {chapters.map((c, i) => (
            <article
              key={c.year}
              className="relative grid h-full shrink-0 grid-rows-[1fr] items-center"
              style={{ width: `${100 / total}%` }}
            >
              <div className="mx-auto grid h-full w-full max-w-[1280px] items-center gap-10 px-6 pb-16 pt-48 lg:gap-14 lg:px-10 md:grid-cols-12 md:pt-56">
                <div className="relative md:col-span-7">
                  <div className="relative aspect-[5/6] overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10 md:aspect-[16/10]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 90vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-tr from-neutral-950/65 via-neutral-950/15 to-transparent"
                    />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-white/[0.08] px-4 py-2 ring-1 ring-inset ring-white/15 backdrop-blur">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
                      <span className="font-display text-[11px] tracking-[0.22em] text-white/85">
                        CHAPTER {c.chapter}
                      </span>
                    </div>

                    <div className="glass-dark absolute bottom-5 left-5 max-w-[220px] rounded-2xl p-4">
                      <p className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                        {c.stat.v}
                        <span className="text-[#7C8A3F]">.</span>
                      </p>
                      <p className="mt-1 text-[10.5px] uppercase tracking-[0.22em] text-white/55">
                        {c.stat.l}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <p className="font-display text-[clamp(64px,9vw,128px)] font-semibold leading-[0.95] tracking-tighter">
                    <span className="text-white">{c.year}</span>
                    <span className="text-[#7C8A3F]">.</span>
                  </p>
                  <h3 className="mt-6 font-display text-[clamp(24px,2.4vw,36px)] font-medium leading-[1.15] tracking-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/65 md:text-[16px]">
                    {c.body}
                  </p>

                  <div className="mt-10 flex items-center gap-3">
                    {chapters.map((_, j) => (
                      <span
                        key={j}
                        className={`h-px transition-all duration-500 ${
                          j === i ? 'w-10 bg-[#7C8A3F]' : 'w-5 bg-white/20'
                        }`}
                      />
                    ))}
                    <span className="ml-3 text-[11px] uppercase tracking-[0.22em] text-white/45">
                      {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            className="h-full origin-left bg-gradient-to-r from-[#7C8A3F] via-[#97a65a] to-[#7C8A3F]"
          />
        </div>
      </div>
    </section>
  );
}
