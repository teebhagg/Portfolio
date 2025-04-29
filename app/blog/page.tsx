import Cursor from '@/components/cursor/cursor';
import { Blog, Footer, Header } from '@/components/sections';
import SmoothScroll from '@/components/smooth-scroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Portfolio',
  description:
    'My thoughts, ideas, and insights on web development, design, and technology.'
};

export default function BlogPage() {
  return (
    <SmoothScroll>
      <div className="flex min-h-[100dvh] flex-col">
        <main className="mt-14 flex-1 md:mt-20">
          <Blog />
        </main>
        <Footer />
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
