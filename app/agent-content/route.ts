import { NextRequest } from 'next/server';
import { blogPosts } from '@/components/sections/blog/config';
import { experiences } from '@/components/sections/experience/config';
import { projects } from '@/components/sections/projects/config';
import { skills } from '@/components/sections/skills/config';
import { contact } from '@/components/sections/contact/config';
import { metadata } from '@/app/config';
import { getPage, type BlogMetadata, type ProjectMetadata } from '@/lib/mdx';
import { siteUrl } from '@/lib/seo';
import { trustPages } from '@/lib/trust-pages';

const absolute = (path: string) => new URL(path, `${siteUrl}/`).toString();
const cleanMdx = (body: string) =>
  body
    .replace(/^\s*(?:import|export)\s+.+?;?\s*$/gm, '')
    .replace(/<[^>]+>/g, '')
    .trim();

function homeMarkdown() {
  const projectList = projects
    .map(
      (project) =>
        `- [${project.name}](${absolute(`/projects/${project.slug}`)}) — ${project.description}`
    )
    .join('\n');
  const skillList = skills
    .map((skill) => `- ${skill.name}: ${skill.description ?? ''}`)
    .join('\n');
  const experienceList = experiences
    .map((item) => `- ${item.duration}: ${item.name} at ${item.company}`)
    .join('\n');

  return `# ${metadata.author.name} — ${metadata.author.label}\n\n${metadata.site.description}\n\n## Profile\n\nJoshua Ansah is a software engineer with more than three years of experience building web and mobile products. His work includes fintech and SaaS features, APIs, cross-platform applications, workflow automation, and production systems. He works across product delivery from design and data modeling through implementation, testing, deployment, and maintenance.\n\n## Selected projects\n\n${projectList}\n\n## Skills\n\n${skillList}\n\n## Experience\n\n${experienceList}\n\n## Contact\n\n- Email: ${contact.email}\n- [GitHub](https://github.com/teebhagg)\n- [LinkedIn](https://www.linkedin.com/in/joshua-ansah-b0a15a230/)\n- [Resume](${absolute('/resume.pdf')})\n- [Full portfolio reference](${absolute('/llms.txt')})\n`;
}

function renderMarkdown(pathname: string) {
  if (pathname === '/') return homeMarkdown();
  if (trustPages[pathname]) return trustPages[pathname];
  if (pathname === '/blog') {
    return `# Blog — ${metadata.author.name}\n\n${blogPosts.map((post) => `- [${post.title}](${absolute(`/blog/${post.slug}`)}) — ${post.description}`).join('\n')}\n`;
  }

  const blogMatch = /^\/blog\/([a-z0-9_-]+)$/.exec(pathname);
  if (blogMatch && blogPosts.some((post) => post.slug === blogMatch[1])) {
    const article = getPage<BlogMetadata>(`blog/${blogMatch[1]}`);
    if (article)
      return `# ${article.metadata.title}\n\n${article.metadata.description}\n\n${cleanMdx(article.content)}\n`;
  }

  const projectMatch = /^\/projects\/([a-z0-9_-]+)$/.exec(pathname);
  if (
    projectMatch &&
    projects.some((project) => project.slug === projectMatch[1])
  ) {
    const project = getPage<ProjectMetadata>(`projects/${projectMatch[1]}`);
    if (project) {
      const links = [
        project.metadata.website && `- Website: ${project.metadata.website}`,
        project.metadata.github && `- Source: ${project.metadata.github}`
      ]
        .filter(Boolean)
        .join('\n');
      return `# ${project.metadata.name}\n\n${project.metadata.description}\n\n${links}\n\n${cleanMdx(project.content)}\n`;
    }
  }

  return null;
}

export function GET(request: NextRequest) {
  const pathname =
    request.headers.get('x-agent-original-path') ??
    request.nextUrl.searchParams.get('path') ??
    '/';
  const markdown = renderMarkdown(pathname);
  const headers = {
    'Content-Type': 'text/markdown; charset=utf-8',
    Vary: 'Accept',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control':
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  };

  if (markdown) return new Response(markdown, { headers });
  return new Response(
    `# Page not found\n\nThe requested page does not exist. Browse the [portfolio index](${absolute('/llms.txt')}) or [site map](${absolute('/sitemap.xml')}).\n`,
    { status: 404, headers }
  );
}
