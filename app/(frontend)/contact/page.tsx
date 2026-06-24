import { getContact, getDestinations, getSiteContent } from '@/lib/data';
import ContactView from './_view';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Plan your trip · Zuri Travels',
  description:
    'Select your destination, itinerary, and tier. A Travel Designer responds personally within 24 hours — no templates, no call centres.',
};

export default async function ContactPage() {
  const [destinations, siteContent, content] = await Promise.all([
    getDestinations(),
    getSiteContent(),
    getContact(),
  ]);
  return <ContactView destinations={destinations} siteContent={siteContent} content={content} />;
}
