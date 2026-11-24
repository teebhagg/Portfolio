import { Blog } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description:
    'My thoughts, ideas, and insights on web development, design, and technology.'
};

export default function BlogPage() {
  return <Blog />;
}
