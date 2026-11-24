import type { MetadataRoute } from 'next';
import { blogPosts } from '@/components/sections/blog/config';
import { projects } from '@/components/sections/projects/config';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/contact', '/privacy', '/blog'];
  const blogPages = blogPosts.map((post) => `/blog/${post.slug}`);
  const projectPages = projects.map((project) => `/projects/${project.slug}`);
  // Updated alongside this source snapshot; keep this value tied to content edits.
  const contentUpdatedAt = new Date('2026-11-24T00:00:00.000Z');

  return [...staticPages, ...blogPages, ...projectPages].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: contentUpdatedAt
  }));
}
