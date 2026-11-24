import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseUrl = process.env.PORTFOLIO_TEST_URL ?? 'http://127.0.0.1:4173';

async function get(path, accept = 'text/html') {
  return fetch(new URL(path, baseUrl), { headers: { Accept: accept } });
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:amp|#38);/gi, '&')
    .replace(/&(?:lt|#60);/gi, '<')
    .replace(/&(?:gt|#62);/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

test('homepage negotiates Markdown and returns useful HTML', async () => {
  const markdownResponse = await get('/', 'text/markdown');
  const markdown = await markdownResponse.text();
  assert.equal(markdownResponse.status, 200);
  assert.match(markdownResponse.headers.get('content-type') ?? '', /^text\/markdown/i);
  assert.match(markdownResponse.headers.get('vary') ?? '', /(?:^|,\s*)accept(?:,|$)/i);
  assert.match(markdown, /^# Joshua Ansah/m);
  assert.ok(markdown.length >= 500, `Markdown homepage has ${markdown.length} characters`);

  const htmlResponse = await get('/', 'text/html');
  const html = await htmlResponse.text();
  const text = visibleText(html);
  assert.equal(htmlResponse.status, 200);
  assert.match(htmlResponse.headers.get('content-type') ?? '', /^text\/html/i);
  assert.match(html, /<html[^>]+lang="en"/i);
  assert.match(html, /<h1\b[^>]*>[\s\S]*?Joshua Ansah/i);
  assert.match(html, /rel="canonical"[^>]+href="https:\/\/joshua-ansah\.vercel\.app\/?"/i);
  assert.match(html, /property="og:type"[^>]+content="website"/i);
  assert.match(html, /property="og:image"/i);
  assert.ok(text.length >= 500, `Rendered homepage contains ${text.length} visible characters`);
  assert.ok(text.length / html.length >= 0.05, `Homepage text-to-HTML ratio is ${(text.length / html.length * 100).toFixed(2)}%`);
  const jsonLdText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(jsonLdText, 'homepage JSON-LD script is present');
  const jsonLd = JSON.parse(jsonLdText);
  assert.ok(jsonLd['@graph'].some((entry) => entry['@type'] === 'Person' && entry.name === 'Joshua Ansah'));
});

test('HTML and Markdown unknown routes both remain real 404s', async () => {
  const htmlResponse = await get('/__agent-readiness-missing-probe');
  const html = await htmlResponse.text();
  assert.equal(htmlResponse.status, 404);
  assert.match(htmlResponse.headers.get('content-type') ?? '', /^text\/html/i);
  assert.match(html, /could not be found/i);

  const markdownResponse = await get('/__agent-readiness-missing-probe', 'text/markdown');
  const markdown = await markdownResponse.text();
  assert.equal(markdownResponse.status, 404);
  assert.match(markdownResponse.headers.get('content-type') ?? '', /^text\/markdown/i);
  assert.match(markdownResponse.headers.get('vary') ?? '', /accept/i);
  assert.ok(markdown.length >= 20);
  assert.match(markdown, /\[portfolio index\].*\/llms\.txt/);
  assert.match(markdown, /\[site map\].*\/sitemap\.xml/);
});

test('about, contact, and privacy pages are indexable and available as Markdown', async () => {
  for (const [path, heading] of [['/about', 'About Joshua Ansah'], ['/contact', 'Contact Joshua'], ['/privacy', 'Privacy notice']]) {
    const htmlResponse = await get(path);
    const html = await htmlResponse.text();
    assert.equal(htmlResponse.status, 200, `${path} HTML status`);
    assert.match(html, new RegExp(`<h1\\b[^>]*>[\\s\\S]*?${heading}`, 'i'));
    assert.ok(visibleText(html).length >= 500, `${path} contains >=500 visible characters`);
    assert.match(html, new RegExp(`rel="canonical"[^>]+href="https:\\/\\/joshua-ansah\\.vercel\\.app${path}"`, 'i'));

    const markdownResponse = await get(path, 'text/markdown');
    const markdown = await markdownResponse.text();
    assert.equal(markdownResponse.status, 200, `${path} Markdown status`);
    assert.match(markdownResponse.headers.get('content-type') ?? '', /^text\/markdown/i);
    assert.ok(markdown.length >= 500, `${path} Markdown contains >=500 characters`);
  }
});

test('llms, sitemap, and robots resources expose agent guidance and valid entries', async () => {
  const llmsResponse = await get('/llms.txt');
  const llms = await llmsResponse.text();
  assert.equal(llmsResponse.status, 200);
  assert.match(llmsResponse.headers.get('content-type') ?? '', /^text\/markdown/i);
  assert.match(llmsResponse.headers.get('vary') ?? '', /accept/i);
  assert.match(llms, /^# Joshua Ansah/m);
  assert.match(llms, /When to use this portfolio:/i);
  assert.match(llms, /Accept: text\/markdown/i);

  const sitemapResponse = await get('/sitemap.xml');
  const sitemap = await sitemapResponse.text();
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get('content-type') ?? '', /xml/i);
  assert.match(sitemap, /<urlset\b/);
  assert.match(sitemap, /<loc>https:\/\/joshua-ansah\.vercel\.app\/about<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/joshua-ansah\.vercel\.app\/contact<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/joshua-ansah\.vercel\.app\/privacy<\/loc>/);
  assert.match(sitemap, /<lastmod>2026-11-24T00:00:00\.000Z<\/lastmod>/);

  const robotsResponse = await get('/robots.txt');
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /Sitemap: https:\/\/joshua-ansah\.vercel\.app\/sitemap\.xml/i);
});

test('Vercel response variation covers Accept without dropping Next router cache keys', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const vary = config.headers.find((item) => item.source === '/(.*)')?.headers
    .find((header) => header.key.toLowerCase() === 'vary')?.value;
  assert.match(vary ?? '', /(?:^|,\s*)Accept(?:,|$)/i);
  assert.match(vary ?? '', /RSC/i);
  assert.match(vary ?? '', /Next-Router-State-Tree/i);
});

test('other canonical pages return Markdown when requested', async () => {
  for (const path of ['/blog', '/projects/daykindle', '/blog']) {
    const response = await get(path, 'text/markdown');
    assert.equal(response.status, 200, `${path} Markdown status`);
    assert.match(response.headers.get('content-type') ?? '', /^text\/markdown/i);
    assert.match(response.headers.get('vary') ?? '', /accept/i);
    assert.ok((await response.text()).length > 100);
  }
});

test('every sitemap URL serves a readable HTML page and negotiated Markdown', async () => {
  const sitemapResponse = await get('/sitemap.xml');
  const xml = await sitemapResponse.text();
  const paths = [...xml.matchAll(/<loc>https:\/\/joshua-ansah\.vercel\.app([^<]*)<\/loc>/g)]
    .map((match) => match[1]);
  assert.ok(paths.length >= 15, `Expected the sitemap to list public pages; found ${paths.length}`);

  for (const path of paths) {
    const htmlResponse = await get(path, 'text/html');
    const html = await htmlResponse.text();
    assert.equal(htmlResponse.status, 200, `${path} HTML status`);
    assert.match(htmlResponse.headers.get('content-type') ?? '', /^text\/html/i, `${path} HTML content type`);
    assert.ok(visibleText(html).length >= 100, `${path} has server-rendered text`);

    const markdownResponse = await get(path, 'text/markdown');
    const markdown = await markdownResponse.text();
    assert.equal(markdownResponse.status, 200, `${path} Markdown status`);
    assert.match(markdownResponse.headers.get('content-type') ?? '', /^text\/markdown/i, `${path} Markdown content type`);
    assert.ok(markdown.length >= 100, `${path} has a useful Markdown representation`);
  }
});
