import { projects } from '@/components/sections/projects/config';
import { getPage, type ProjectMetadata } from '@/lib/mdx';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const project = getPage<ProjectMetadata>(`projects/${params.slug}`);
  if (!project || !projects.some((item) => item.slug === params.slug)) {
    return new Response('Project not found.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const { metadata, content } = project;
  const websiteUrl = metadata.website
    ? /^https?:\/\//i.test(metadata.website)
      ? metadata.website
      : `${siteUrl}${metadata.website.startsWith('/') ? '' : '/'}${metadata.website}`
    : undefined;
  const links = [
    `- Portfolio case study: ${siteUrl}/projects/${params.slug}`,
    websiteUrl ? `- Project website: ${websiteUrl}` : '',
    metadata.github ? `- Source code: ${metadata.github}` : '',
    metadata.docs ? `- Documentation: ${metadata.docs}` : '',
    metadata.api_docs ? `- API reference: ${metadata.api_docs}` : ''
  ]
    .filter(Boolean)
    .join('\n');
  const technologies = metadata.techstack?.map(({ label }) => label).join(', ');

  return new Response(
    `# ${metadata.name}\n\n> ${metadata.description}\n\n${[
      metadata.category ? `Category: ${metadata.category}` : '',
      technologies ? `Technologies: ${technologies}` : '',
      links
    ]
      .filter(Boolean)
      .join('\n\n')}\n\n${content.trim()}\n`,
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
