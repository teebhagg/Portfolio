import { NextRequest, NextResponse } from 'next/server';

function acceptsMarkdown(accept: string | null) {
  if (!accept) return false;
  const ranges = accept.split(',').map((part, index) => {
    const [mediaType, ...parameters] = part.trim().toLowerCase().split(';');
    const quality = parameters.find((parameter) =>
      parameter.trim().startsWith('q=')
    );
    const q = quality ? Number(quality.trim().slice(2)) : 1;
    return { mediaType, q: Number.isFinite(q) ? q : 0, index };
  });
  const qualityFor = (type: 'text/markdown' | 'text/html') => {
    const explicit = ranges.find((range) => range.mediaType === type);
    const wildcard = ranges.find((range) => range.mediaType === 'text/*');
    const any = ranges.find((range) => range.mediaType === '*/*');
    return (
      explicit ?? wildcard ?? any ?? { q: 0, index: Number.MAX_SAFE_INTEGER }
    );
  };
  const markdown = qualityFor('text/markdown');
  const html = qualityFor('text/html');
  if (markdown.q <= 0) return false;
  if (markdown.q !== html.q) return markdown.q > html.q;
  if (markdown.index === Number.MAX_SAFE_INTEGER) return false;
  if (html.index === Number.MAX_SAFE_INTEGER) return true;
  return markdown.index < html.index;
}

function addVaryAccept(response: NextResponse) {
  const current = response.headers.get('Vary');
  const values = current?.split(',').map((value) => value.trim()) ?? [];
  if (!values.some((value) => value.toLowerCase() === 'accept'))
    values.push('Accept');
  response.headers.set('Vary', values.filter(Boolean).join(', '));
  return response;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isDirectMarkdownRoute =
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/ai/');

  if (
    acceptsMarkdown(request.headers.get('accept')) &&
    !isDirectMarkdownRoute
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/agent-content';
    url.search = '';
    url.searchParams.set('path', pathname);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-agent-original-path', pathname);
    return addVaryAccept(
      NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    );
  }

  return addVaryAccept(NextResponse.next());
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|css|js|map|woff2?|ttf|otf|eot)$).*)'
  ]
};
