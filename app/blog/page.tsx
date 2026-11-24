import { Blog } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles by software engineer Joshua Ansah about building web and mobile products, APIs, and production infrastructure.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog',
    description:
      'Articles by software engineer Joshua Ansah about building web and mobile products, APIs, and production infrastructure.'
  }
};

export default function BlogPage() {
  return <Blog />;
}
