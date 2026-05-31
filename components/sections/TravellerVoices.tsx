'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

const testimonials = [
  {
    name: 'Eleanor & James R.',
    role: 'Gorilla Trek · Volcanoes NP',
    quote:
      'They turned a bucket-list idea into the most considered week of our lives. Every guide, every lodge, every quiet morning was chosen with intention — and it showed.',
  },
  {
    name: 'Priya M.',
    role: 'Great Migration · Serengeti',
    quote:
      'We have travelled with the big names. None of them know the ground like this. Our guide read the plains like a book, and we were always in exactly the right place.',
  },
  {
    name: 'The Okonkwo Family',
    role: 'Cultural Heritage · Rwanda',
    quote:
      'Unhurried, soulful, and deeply human. ZuriTravels designed a journey our children still talk about — and gave back to the communities we passed through.',
  },
];

export default function TravellerVoices() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-light opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Eyebrow>Voices from the journey</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-tight text-neutral-900">
            <RevealText as="span" text="Built with the travellers" className="block" />
            <RevealText
              as="span"
              text="who trust us with the wild."
              className="block text-gradient-brand"
              delay={0.1}
            />
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ y: 28, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative flex flex-col gap-6 rounded-3xl bg-white p-8 ring-1 ring-inset ring-neutral-900/10 md:p-10"
            >
              <span className="font-display text-6xl leading-none text-[#7C8A3F]">&ldquo;</span>
              <blockquote className="text-[16px] leading-relaxed text-neutral-800 md:text-[17px]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-neutral-900/10 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-900 font-display text-[13px] text-white">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-[13.5px] font-medium tracking-tight text-neutral-900">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-neutral-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
