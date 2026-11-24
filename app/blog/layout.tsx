import Cursor from '@/components/cursor/cursor';
import SectionColorField from '@/components/section-color-field';
import { Footer, Header } from '@/components/sections';
import SmoothScroll from '@/components/smooth-scroll';

export default function BlogLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <div className="flex min-h-[100dvh] flex-col">
        <Header />
        <main className="scroll-color-main relative isolate flex-1">
          <SectionColorField />
          {children}
          <Footer />
        </main>
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
