import {
  getAbout,
  getMilestones,
  getPartners,
  getPressFeatures,
  getPrinciples,
  getSections,
  getSiteContent,
  getTestimonials,
} from '@/lib/data';
import AboutView from './_view';

// CMS-driven but rarely changes — render statically and revalidate (ISR)
// instead of querying the database on every request.
export const revalidate = 600;

export const metadata = {
  title: 'About · Zuri Travels',
  description:
    'Zuri Travels is a Kigali-based travel design studio crafting privately led safaris, gorilla treks, cultural journeys, and coastal escapes across East Africa.',
};

export default async function AboutPage() {
  const [about, sections, testimonials, siteContent, principles, milestones, partners, pressFeatures] =
    await Promise.all([
      getAbout(),
      getSections(),
      getTestimonials(),
      getSiteContent(),
      getPrinciples('about'),
      getMilestones(),
      getPartners(),
      getPressFeatures(),
    ]);

  const voiceItems = testimonials.length
    ? testimonials.map((t) => ({ name: t.attribution, role: t.context, quote: t.quote }))
    : sections.voices.items;
  const voices = { ...sections.voices, items: voiceItems };

  return (
    <AboutView
      about={about}
      voices={voices}
      siteContent={siteContent}
      principles={principles}
      milestones={milestones}
      partners={partners}
      pressFeatures={pressFeatures}
    />
  );
}
