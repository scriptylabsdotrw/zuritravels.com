import {
  getMilestones,
  getPartners,
  getPressFeatures,
  getPrinciples,
  getSiteContent,
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
  const [siteContent, principles, milestones, partners, pressFeatures] = await Promise.all([
    getSiteContent(),
    getPrinciples('about'),
    getMilestones(),
    getPartners(),
    getPressFeatures(),
  ]);
  return (
    <AboutView
      siteContent={siteContent}
      principles={principles}
      milestones={milestones}
      partners={partners}
      pressFeatures={pressFeatures}
    />
  );
}
