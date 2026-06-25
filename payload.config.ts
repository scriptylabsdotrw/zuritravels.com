import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Destinations } from './src/collections/Destinations';
import { Tours } from './src/collections/Tours';
import { TourThemes } from './src/collections/TourThemes';
import { JournalPosts } from './src/collections/JournalPosts';
import { Enquiries } from './src/collections/Enquiries';
import { Testimonials } from './src/collections/Testimonials';
import { Partners } from './src/collections/Partners';
import { PressFeatures } from './src/collections/PressFeatures';
import { Principles } from './src/collections/Principles';
import { Milestones } from './src/collections/Milestones';
import { SiteContent } from './src/globals/SiteContent';
import { Header } from './src/globals/Header';
import { Footer } from './src/globals/Footer';
import { Home } from './src/globals/Home';
import { About } from './src/globals/About';
import { VisitRwanda } from './src/globals/VisitRwanda';
import { Sections } from './src/globals/Sections';
import { DestinationsPage } from './src/globals/Destinations';
import { Contact } from './src/globals/Contact';
import { JournalPageGlobal } from './src/globals/Journal';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Zuri Travels',
    },
    components: {
      graphics: {
        Logo: '/src/components/AdminLogo#default',
        Icon: '/src/components/AdminIcon#default',
      },
      beforeDashboard: ['/src/components/Dashboard#default'],
      beforeNavLinks: ['/src/components/DashboardNavLink#default'],
    },
  },
  collections: [
    Users,
    Media,
    Destinations,
    Tours,
    TourThemes,
    JournalPosts,
    Testimonials,
    Partners,
    PressFeatures,
    Principles,
    Milestones,
    Enquiries,
  ],
  globals: [
    SiteContent,
    Header,
    Footer,
    Home,
    About,
    VisitRwanda,
    Sections,
    DestinationsPage,
    Contact,
    JournalPageGlobal,
  ],
  editor: lexicalEditor(),
  /* Transactional email over SMTP. Configured only when credentials are
     present so local/dev without SMTP still boots (Payload falls back to a
     console mock transport when `email` is undefined). */
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromName: process.env.SMTP_FROM_NAME || 'Zuri Travels',
        defaultFromAddress:
          process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          // 587 uses STARTTLS, so the initial connection is not implicitly TLS.
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  /* On Vercel (any POSTGRES_URL set by the Neon Marketplace integration),
     use the serverless-friendly adapter that auto-pushes schema on cold start.
     Locally (Docker), keep the standard pg pool. */
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter({
        pool: { connectionString: process.env.POSTGRES_URL },
        push: true,
      })
    : postgresAdapter({
        pool: {
          connectionString:
            process.env.DATABASE_URI ||
            process.env.DATABASE_URL ||
            '',
        },
        push: true,
      }),
  sharp,
});
