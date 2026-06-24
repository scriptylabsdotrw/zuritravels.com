'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import type { SectionsContent } from '@/lib/types';

export default function Method({ content }: { content: SectionsContent['method'] }) {
  const { pillars } = content;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28 md:py-44">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight text-neutral-900">
              <RevealText as="span" text={content.titleL1} className="block" />
              <RevealText as="span" text={content.titleL2} className="block" delay={0.08} />
              <RevealText
                as="span"
                text={content.titleL3}
                className="block text-gradient-brand"
                delay={0.16}
              />
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-neutral-500">{content.body}</p>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative grid grid-cols-2 gap-5">
              <motion.div
                style={{ y: y1 }}
                className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-inset ring-neutral-900/10"
              >
                <Image
                  src={content.image1}
                  alt="Mountain gorilla in the forest canopy"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                style={{ y: y2 }}
                className="relative aspect-[3/4] translate-y-12 overflow-hidden rounded-3xl ring-1 ring-inset ring-neutral-900/10"
              >
                <Image
                  src={content.image2}
                  alt="A local guide on safari"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              className="glass-panel absolute -bottom-6 left-0 max-w-sm rounded-2xl p-5 shadow-soft md:-left-10"
            >
              <p className="text-[14px] leading-relaxed text-neutral-900">
                <span className="font-display text-[#7C8A3F]">&ldquo;</span>
                {content.quote}
                <span className="font-display text-[#7C8A3F]">&rdquo;</span>
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                {content.quoteAttribution}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-28 grid gap-px overflow-hidden rounded-3xl bg-neutral-900/10 ring-1 ring-inset ring-neutral-900/10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, delay: i * 0.08 }}
              className="relative bg-white p-8 md:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[12px] tracking-[0.2em] text-neutral-400">
                  {p.n}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#7C8A3F]">
                  {p.label}
                </span>
              </div>
              <h3 className="mt-8 font-display text-[20px] font-medium tracking-tight text-neutral-900">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
