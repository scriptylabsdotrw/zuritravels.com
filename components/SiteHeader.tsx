'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { HeaderContent } from '@/lib/types';

type SiteHeaderProps = {
  header: HeaderContent;
  contact: { phone: string; email: string; address: string };
};

export default function SiteHeader({ header, contact }: SiteHeaderProps) {
  const { nav, megaFeatured: toursFeatured, megaLists: toursLists } = header;
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileToursOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      {/* ─── HEADER BAR ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-neutral-200/70 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.05),0_6px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl'
            : 'border-b border-neutral-100/50 bg-white/85 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 lg:px-10 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Zuri Travels — home">
            <Image
              src="/logos/primary_logo_safari_olive_transparent.png"
              alt="Zuri Travels"
              width={2172}
              height={258}
              priority
              className="h-8 w-auto max-w-[56vw] object-contain sm:h-10 sm:max-w-none lg:h-12"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex 2xl:gap-9">
            {nav.map((item) =>
              item.isMega ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="tours-mega"
                    onFocus={openMega}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={`group relative inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.28em] transition-colors ${
                      megaOpen ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-[0.48rem] transition-transform duration-200 ${
                        megaOpen ? 'rotate-180 text-[#7C8A3F]' : 'text-neutral-400'
                      }`}
                    >
                      ▾
                    </span>
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-[#7C8A3F] transition-all duration-300 ${
                        megaOpen ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[0.7rem] font-medium uppercase tracking-[0.28em] transition-colors ${
                    pathname === item.href
                      ? 'text-neutral-950'
                      : 'text-neutral-500 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-[#7C8A3F] transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ),
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={header.ctaHref}
              className="hidden items-center gap-2 rounded-full bg-[#7C8A3F] px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white shadow-[0_2px_16px_rgba(124,138,63,0.38)] transition hover:bg-[#97a65a] hover:shadow-[0_4px_24px_rgba(124,138,63,0.48)] sm:inline-flex"
            >
              {header.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={header.ctaHref}
              className="inline-flex items-center gap-1 rounded-full bg-[#7C8A3F] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_2px_12px_rgba(124,138,63,0.35)] transition hover:bg-[#97a65a] sm:hidden"
              aria-label={header.ctaLabel}
            >
              {header.ctaLabelShort}
              <span aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 transition hover:border-neutral-400 hover:shadow-sm xl:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <span
                aria-hidden="true"
                className={`absolute h-px w-[18px] bg-current transition duration-300 ease-out ${
                  open ? 'translate-y-0 rotate-45' : '-translate-y-[5px]'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-[18px] bg-current transition duration-200 ${
                  open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-[18px] bg-current transition duration-300 ease-out ${
                  open ? 'translate-y-0 -rotate-45' : 'translate-y-[5px]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ─── DESKTOP MEGA MENU ─── */}
        <div
          id="tours-mega"
          role="region"
          aria-label="Tours"
          aria-hidden={!megaOpen}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className={`absolute inset-x-0 top-full hidden border-b border-neutral-200/80 bg-white shadow-[0_32px_72px_rgba(0,0,0,0.1)] transition-all duration-200 xl:block ${
            megaOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-3 opacity-0'
          }`}
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-8 px-10 py-10">
            {/* Featured columns — with gorilla / culture image thumbnails */}
            {toursFeatured.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                onClick={() => setMegaOpen(false)}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 transition hover:border-neutral-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="280px"
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {col.eyebrow && (
                    <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.32em] text-[#b5c46b] backdrop-blur-sm">
                      {col.eyebrow}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-4 text-xl font-light tracking-tight text-white">
                    {col.title}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="text-sm leading-relaxed text-neutral-600">{col.blurb}</span>
                  <span className="mt-auto inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-neutral-400 transition group-hover:text-[#7C8A3F]">
                    Explore
                    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}

            {/* List columns */}
            {toursLists.map((col) => (
              <div key={col.title} className="flex flex-col gap-5 p-5">
                <span className="border-b border-neutral-100 pb-3 text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-neutral-400">
                  {col.title}
                </span>
                <ul className="flex flex-col gap-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link
                        href={it.href}
                        onClick={() => setMegaOpen(false)}
                        className="group inline-flex items-center gap-3 text-[0.88rem] font-light tracking-tight text-neutral-700 transition hover:text-[#7C8A3F]"
                      >
                        <span className="h-px w-3 flex-none bg-neutral-300 transition-all duration-200 group-hover:w-5 group-hover:bg-[#7C8A3F]" />
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 xl:hidden ${open ? '' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute inset-x-0 top-0 max-h-[100svh] origin-top overflow-y-auto bg-white shadow-[0_32px_80px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
          style={{ paddingTop: 72 }}
        >
          <nav aria-label="Mobile primary" className="mx-auto max-w-[1280px] px-6 pb-12 pt-6">
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const index = String(i + 1).padStart(2, '0');

                if (item.isMega) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileToursOpen((v) => !v)}
                        aria-expanded={mobileToursOpen}
                        className="group flex w-full items-center justify-between border-b border-neutral-100 py-5 text-left"
                      >
                        <span className="flex items-center gap-5">
                          <span className="w-8 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                            {index}
                          </span>
                          <span className="text-2xl font-light tracking-tight text-neutral-950 transition group-hover:text-[#7C8A3F]">
                            {item.label}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`text-[0.62rem] text-neutral-400 transition-transform duration-200 ${
                            mobileToursOpen ? 'rotate-180 text-[#7C8A3F]' : ''
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {/* Sub-panel */}
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                          mobileToursOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          {/* Image cards */}
                          <div className="grid grid-cols-2 gap-3 border-b border-neutral-100 py-5 pl-[52px]">
                            {toursFeatured.map((col) => (
                              <Link
                                key={col.title}
                                href={col.href}
                                onClick={() => setOpen(false)}
                                className="group relative overflow-hidden rounded-lg"
                              >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                  <Image
                                    src={col.image}
                                    alt={col.title}
                                    fill
                                    sizes="50vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                  <div className="absolute bottom-3 left-3">
                                    {col.eyebrow && (
                                      <span className="block text-[0.5rem] uppercase tracking-[0.3em] text-[#7C8A3F]">
                                        {col.eyebrow}
                                      </span>
                                    )}
                                    <span className="text-sm font-light text-white">{col.title}</span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* List items */}
                          <div className="grid grid-cols-2 gap-6 border-b border-neutral-100 py-5 pl-[52px]">
                            {toursLists.map((col) => (
                              <div key={col.title}>
                                <span className="mb-3 block text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-neutral-400">
                                  {col.title}
                                </span>
                                <ul className="flex flex-col gap-2">
                                  {col.items.map((it) => (
                                    <li key={it.label}>
                                      <Link
                                        href={it.href}
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-light text-neutral-700 transition hover:text-[#7C8A3F]"
                                      >
                                        {it.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }

                const href = item.href;
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-center justify-between border-b border-neutral-100 py-5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex items-center gap-5">
                        <span className="w-8 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-neutral-400">
                          {index}
                        </span>
                        <span
                          className={`text-2xl font-light tracking-tight transition group-hover:text-[#7C8A3F] ${
                            isActive ? 'text-[#7C8A3F]' : 'text-neutral-950'
                          }`}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7C8A3F]" />
                        )}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`text-[0.7rem] uppercase tracking-[0.3em] transition group-hover:translate-x-1 group-hover:text-[#7C8A3F] ${
                          isActive ? 'text-[#7C8A3F]' : 'text-neutral-400'
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-3">
              <Link
                href={header.ctaHref}
                onClick={() => setOpen(false)}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#7C8A3F] px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_4px_24px_rgba(124,138,63,0.42)] transition hover:bg-[#97a65a]"
              >
                {header.ctaLabel}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="rounded-full border border-neutral-200 px-4 py-3 text-center text-[0.6rem] font-medium uppercase tracking-[0.28em] text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-950"
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="rounded-full border border-neutral-200 px-4 py-3 text-center text-[0.6rem] font-medium uppercase tracking-[0.28em] text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-950"
                  >
                    Email us
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
