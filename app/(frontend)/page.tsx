import {
  getFeaturedTestimonial,
  getHome,
  getJournalPosts,
  getPartners,
  getPressFeatures,
  getPrinciples,
  getSections,
  getSiteContent,
  getTestimonials,
} from '@/lib/data';
import HomeView from './_view';

// The homepage is CMS-driven but rarely changes between edits. Render it
// statically and revalidate periodically (ISR) instead of hitting the
// database on every request — this is the single biggest TTFB win.
export const revalidate = 600;

export default async function HomePage() {
  const [
    home,
    sections,
    siteContent,
    principles,
    pressFeatures,
    partners,
    featuredTestimonial,
    testimonials,
    journal,
  ] = await Promise.all([
    getHome(),
    getSections(),
    getSiteContent(),
    getPrinciples('home'),
    getPressFeatures(),
    getPartners(),
    getFeaturedTestimonial(),
    getTestimonials(),
    getJournalPosts(),
  ]);

  /* Prefer the Testimonials collection for Traveller Voices; fall back to the
     Sections global defaults when none have been added. */
  const voiceItems = testimonials.length
    ? testimonials.map((t) => ({ name: t.attribution, role: t.context, quote: t.quote }))
    : sections.voices.items;
  const resolvedSections = {
    ...sections,
    voices: { ...sections.voices, items: voiceItems },
  };

  return (
    <HomeView
      home={home}
      sections={resolvedSections}
      siteContent={siteContent}
      principles={principles}
      pressFeatures={pressFeatures}
      partners={partners}
      featuredTestimonial={featuredTestimonial}
      journal={journal.slice(0, 3)}
    />
  );
}
