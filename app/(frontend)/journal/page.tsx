import { getJournalPage, getJournalPosts } from '@/lib/data';
import JournalView from './_view';

// CMS-driven, refreshed periodically (ISR).
export const revalidate = 600;

export const metadata = {
  title: 'Journal · Zuri Travels',
  description:
    'Slow, hosted writing from our guides, conservationists, and design team — the long form of how we actually work.',
};

export default async function JournalPage() {
  const [posts, content] = await Promise.all([getJournalPosts(), getJournalPage()]);
  return <JournalView posts={posts} content={content} />;
}
