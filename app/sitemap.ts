import type { MetadataRoute } from 'next';
import { blogPosts } from '@/components/sections/blog/config';
import { projects } from '@/components/sections/projects/config';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/get-a-quote',
    '/privacy',
    '/blog',
    '/resume.pdf'
  ];
  const blogPages = blogPosts.map((post) => `/blog/${post.slug}`);
  const projectPages = projects.map((project) => `/projects/${project.slug}`);

  return [...staticPages, ...blogPages, ...projectPages].map((route) => ({
    url: `${siteUrl}${route}`
  }));
}
