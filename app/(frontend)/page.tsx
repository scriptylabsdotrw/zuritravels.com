import {
  getFeaturedTestimonial,
  getJournalPosts,
  getPartners,
  getPressFeatures,
  getPrinciples,
  getSiteContent,
} from '@/lib/data';
import HomeView from './_view';

// The homepage is CMS-driven but rarely changes between edits. Render it
// statically and revalidate periodically (ISR) instead of hitting the
// database on every request — this is the single biggest TTFB win.
export const revalidate = 600;

export default async function HomePage() {
  const [siteContent, principles, pressFeatures, partners, featuredTestimonial, journal] =
    await Promise.all([
      getSiteContent(),
      getPrinciples('home'),
      getPressFeatures(),
      getPartners(),
      getFeaturedTestimonial(),
      getJournalPosts(),
    ]);

  return (
    <HomeView
      siteContent={siteContent}
      principles={principles}
      pressFeatures={pressFeatures}
      partners={partners}
      featuredTestimonial={featuredTestimonial}
      journal={journal.slice(0, 3)}
    />
  );
}
