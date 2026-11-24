import { blogPosts } from '@/components/sections/blog/config';
import { getPage, type BlogMetadata } from '@/lib/mdx';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  const article = getPage<BlogMetadata>(`blog/${params.slug}`);
  if (!post || !article) {
    return new Response('Article not found.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const { metadata, content } = article;
  const title = metadata.title || post.title;
  const leadingHeading = /^\s*#\s+([^\r\n]+)(?:\r?\n)+/;
  const firstHeading = leadingHeading.exec(content);
  const articleContent =
    firstHeading?.[1].trim().toLowerCase() === title.trim().toLowerCase()
      ? content.slice(firstHeading[0].length).trim()
      : content.trim();
  return new Response(
    `# ${title}\n\n> ${metadata.description || post.description}\n\n- Canonical page: ${siteUrl}/blog/${params.slug}\n- Author: ${metadata.author || post.author}\n- Published: ${metadata.date || post.date}\n${metadata.category || post.category ? `- Category: ${metadata.category || post.category}\n` : ''}${metadata.tags?.length ? `- Topics: ${metadata.tags.join(', ')}\n` : ''}\n${articleContent}\n`,
    {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control':
          'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
      }
    }
  );
}
