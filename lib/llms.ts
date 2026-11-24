import { blogPosts } from '@/components/sections/blog/config';
import { experiences } from '@/components/sections/experience/config';
import { projects } from '@/components/sections/projects/config';
import { skills } from '@/components/sections/skills/config';
import { metadata } from '@/app/config';
import { contact } from '@/components/sections/contact/config';
import { getPage, type BlogMetadata, type ProjectMetadata } from '@/lib/mdx';
import { siteUrl } from '@/lib/seo';

const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();
const externalOrAbsoluteUrl = (value: string) =>
  /^https?:\/\//i.test(value) ? value : absoluteUrl(value);

const projectSlugs = () => projects.map((project) => project.slug);

const plainMarkdown = (content: string) =>
  content
    .replace(/^\s*import\s+.+?;?\s*$/gm, '')
    .replace(/^\s*export\s+.+?;?\s*$/gm, '')
    .trim();

const markdownWithoutRepeatedTitle = (content: string, title: string) => {
  const leadingHeading = /^\s*#\s+([^\r\n]+)(?:\r?\n)+/;
  const match = leadingHeading.exec(content);
  if (match?.[1].trim().toLowerCase() === title.trim().toLowerCase()) {
    return content.slice(match[0].length).trim();
  }
  return content.trim();
};

const stackText = (stack?: Array<{ label: string }>) =>
  stack
    ?.map(({ label }) => label)
    .filter(Boolean)
    .join(', ') ?? '';

export function createLlmsIndex() {
  const activeProjects = projects
    .map((project) => {
      const details = getPage<ProjectMetadata>(`projects/${project.slug}`);
      const technologies = stackText(details?.metadata.techstack);
      const labels = [project.category, technologies]
        .filter(Boolean)
        .join(' · ');

      return [
        `- [${project.name}](${absoluteUrl(`/projects/${project.slug}`)})${labels ? ` — ${labels}` : ''}`,
        `  ${project.description}`,
        project.liveUrl ? `  - Live project: ${project.liveUrl}` : '',
        `  - Agent-readable project details: ${absoluteUrl(`/ai/projects/${project.slug}`)}`
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const articles = blogPosts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}) — ${post.description}\n  - Agent-readable article: ${absoluteUrl(`/ai/articles/${post.slug}`)}`
    )
    .join('\n');

  return `# ${metadata.author.name}

> ${metadata.site.description}

This is the canonical AI-readable index for Joshua Ansah’s public portfolio. Use the linked portfolio pages and Markdown reference for project, experience, skills, and article details. Treat profile and project statements as first-party portfolio information.

When to use this portfolio: research Joshua Ansah’s software engineering background, evaluate published web or mobile projects, check listed skills and work history, or find technical articles and public contact details. Best-fit jobs include project research, engineering-role screening, collaboration discovery, and factual summaries grounded in the linked first-party pages. Do not infer availability, pricing, client references, or unlisted experience.

To answer a question, read this index first, then open the relevant project, article, or resume link. For deeper project or article detail, use the linked agent-readable Markdown endpoint or request the canonical HTML URL with \`Accept: text/markdown\`. This site does not expose an API or agent action endpoint. For a human contact request, use the email listed in the full reference; do not claim to send a message on the visitor’s behalf.

Joshua Ansah is a software engineer focused on building web and mobile products. The portfolio covers fintech and SaaS engineering, APIs, cross-platform applications, production infrastructure, and product development.

## Primary pages

- [Portfolio homepage](${absoluteUrl('/')}) — profile, skills, featured projects, experience, and contact.
- [Projects section](${absoluteUrl('/#projects')}) — overview of selected work.
- [Experience section](${absoluteUrl('/#experiences')}) — career history.
- [Skills section](${absoluteUrl('/#skills')}) — skills grouped by discipline.
- [Blog index](${absoluteUrl('/blog')}) — technical articles and project write-ups.
- [Downloadable resume](${absoluteUrl('/resume.pdf')}) — PDF resume.
- [Full Markdown reference](${absoluteUrl('/llms-full.txt')}) — expanded portfolio data and full project and article content.

## Selected projects

${activeProjects}

## Articles

${articles}

## Machine-readable resources

- [XML sitemap](${absoluteUrl('/sitemap.xml')}) — canonical public pages.
- [Robots policy](${absoluteUrl('/robots.txt')}) — crawler access rules.
- [Full Markdown reference](${absoluteUrl('/llms-full.txt')}) — skills, work history, project records, and complete article text.
- [About](${absoluteUrl('/about')}) — profile and engineering focus.
- [Contact](${absoluteUrl('/contact')}) — public contact details.
- [Privacy](${absoluteUrl('/privacy')}) — current site form and browser-storage behavior.
`;
}

export function createLlmsFullText() {
  const projectSections = projectSlugs()
    .map((slug) => {
      const details = getPage<ProjectMetadata>(`projects/${slug}`);
      if (!details) return '';

      const { metadata: projectMetadata, content } = details;
      const links = [
        `Portfolio page: ${absoluteUrl(`/projects/${slug}`)}`,
        projectMetadata.website
          ? `Project website: ${externalOrAbsoluteUrl(projectMetadata.website)}`
          : '',
        projectMetadata.github ? `Source code: ${projectMetadata.github}` : '',
        projectMetadata.docs ? `Documentation: ${projectMetadata.docs}` : '',
        projectMetadata.api_docs
          ? `API reference: ${projectMetadata.api_docs}`
          : ''
      ].filter(Boolean);
      const technologies = stackText(projectMetadata.techstack);

      return `## ${projectMetadata.name}

${projectMetadata.description}

${projectMetadata.category ? `Category: ${projectMetadata.category}\n` : ''}${technologies ? `Technologies: ${technologies}\n` : ''}${links.map((link) => `- ${link}`).join('\n')}

${plainMarkdown(content)}
`;
    })
    .filter(Boolean)
    .join('\n---\n\n');

  const articleSections = blogPosts
    .map((post) => {
      const article = getPage<BlogMetadata>(`blog/${post.slug}`);
      if (!article) return '';
      const { metadata: articleMetadata, content } = article;

      return `## ${articleMetadata.title ?? post.title}

${articleMetadata.description ?? post.description}

- Canonical page: ${absoluteUrl(`/blog/${post.slug}`)}
- Author: ${articleMetadata.author ?? post.author}
- Published: ${articleMetadata.date ?? post.date}
${articleMetadata.category ?? post.category ? `- Category: ${articleMetadata.category ?? post.category}\n` : ''}${articleMetadata.tags?.length ? `- Topics: ${articleMetadata.tags.join(', ')}\n` : ''}
${markdownWithoutRepeatedTitle(content, articleMetadata.title ?? post.title)}
`;
    })
    .filter(Boolean)
    .join('\n---\n\n');

  const skillSections = skills
    .map((skill) => `### ${skill.name}\n\n${skill.description ?? ''}`)
    .join('\n\n');

  const experienceSections = experiences
    .map(
      (experience) =>
        `### ${experience.company} — ${experience.name}\n\n${experience.duration}\n\n${experience.description ?? ''}`
    )
    .join('\n\n');

  return `# ${metadata.author.name} — Portfolio Reference

> ${metadata.site.description}

This Markdown document summarizes the public portfolio and contains the full text of published project and blog pages. The canonical website is ${siteUrl}.

## Profile

Joshua Ansah is a software engineer. The portfolio presents work across web and mobile software, fintech, SaaS, APIs, and production systems.

## Contact and profiles

- Email: ${contact.email}
- GitHub: https://github.com/teebhagg
- LinkedIn: https://www.linkedin.com/in/joshua-ansah-b0a15a230/
- Resume: ${absoluteUrl('/resume.pdf')}

## Skills

${skillSections}

## Experience

${experienceSections}

## Project records

${projectSections}

## Blog articles

${articleSections}
`;
}
