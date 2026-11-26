import { Header, Footer } from '@/components/sections';
import SectionColorField from '@/components/section-color-field';
import Cursor from '@/components/cursor/cursor';
import ScrollWordReveal from '@/components/scroll-word-reveal';

export function TrustParagraph({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <p>
      {parts.map((part, index) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        return link ? (
          <a
            className="text-foreground underline underline-offset-4"
            href={link[2]}
            key={index}
          >
            {link[1]}
          </a>
        ) : (
          part
        );
      })}
    </p>
  );
}

export function TrustPage({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        data-section-tone="rose"
        data-section-color-anchor="rose"
        className="w-full px-4 pb-20 pt-32 sm:px-6 md:pt-40"
      >
        <article className="mx-auto w-full max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <ScrollWordReveal>{eyebrow}</ScrollWordReveal>
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            <ScrollWordReveal>{title}</ScrollWordReveal>
          </h1>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {children}
          </div>
        </article>
      </main>
      <SectionColorField />
      <Footer />
      <Cursor />
    </>
  );
}
