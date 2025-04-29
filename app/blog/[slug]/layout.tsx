import Cursor from '@/components/cursor/cursor';
import SmoothScroll from '@/components/smooth-scroll';

export default function BlogPostLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <div className="flex min-h-[100dvh] flex-col">
        <main className="my-14 flex-1">{children}</main>
      </div>
      <Cursor />
    </SmoothScroll>
  );
}
