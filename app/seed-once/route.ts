/* TEMPORARY dev-only seed trigger. Runs the project's seed inside the Next
   runtime (where Payload/env load correctly) to work around the tsx CLI
   incompatibility with Next 16's @next/env. Delete after seeding. */
import { runSeed } from '../../scripts/seed';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 });
  }
  try {
    const counts = await runSeed();
    return Response.json({ ok: true, counts });
  } catch (err) {
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
