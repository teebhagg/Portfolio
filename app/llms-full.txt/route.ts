import { createLlmsFullText } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
  return new Response(createLlmsFullText(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control':
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
