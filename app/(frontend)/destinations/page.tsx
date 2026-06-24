import { getDestinations, getDestinationsPage } from '@/lib/data';
import DestinationsView from './_view';

export const dynamic = 'force-dynamic';

export default async function DestinationsPage() {
  const [destinations, content] = await Promise.all([
    getDestinations(),
    getDestinationsPage(),
  ]);
  return <DestinationsView destinations={destinations} content={content} />;
}
