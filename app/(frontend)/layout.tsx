import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { getFooter, getHeader, getSiteContent } from '@/lib/data';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Zuri Travels — Bespoke Safaris & Soulful African Journeys',
  description:
    'Award-winning, privately designed safari, wildlife, and cultural expeditions across Rwanda, Tanzania, Kenya, Uganda, Botswana, and Zanzibar. Crafted by Africa, for the world.',
  openGraph: {
    title: 'Zuri Travels — Crafting Soulful African Expeditions',
    description:
      'World-class private safaris, gorilla treks, cultural immersions, and coastal escapes — designed for the most discerning travellers.',
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: new URL('https://zuritravels.com'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [header, footer, site] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteContent(),
  ]);

  const contact = {
    phone: site.studioPhone,
    email: site.studioEmail,
    address: site.studioAddress,
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-brand-surface text-brand-ink antialiased">
        <SiteHeader header={header} contact={contact} />
        {children}
        <Footer footer={footer} contact={contact} />
        <FloatingActions
          whatsappNumber={site.whatsappNumber}
          whatsappMessage={site.whatsappMessage}
        />
      </body>
    </html>
  );
}
