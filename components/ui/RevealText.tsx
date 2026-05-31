'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type JSX } from 'react';

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  show: (i: number = 0) => ({
    transition: { staggerChildren: i || 0.05, delayChildren: 0.04 },
  }),
};

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Word-by-word "rise from behind a mask" reveal — the signature heading motion.
 * overflow-hidden parent + y:110%→0% child.
 */
export default function RevealText({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const Tag = as as any;
  const words = text.split(' ');

  return (
    <Tag className={`inline-block ${className}`}>
      <motion.span
        ref={ref}
        custom={stagger}
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ delay }}
        className="inline-flex flex-wrap"
        aria-label={text}
      >
        {words.map((w, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.06em]">
            <motion.span variants={word} className="inline-block will-change-transform">
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
