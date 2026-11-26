import type { Metadata } from 'next';
import SectionColorField from '@/components/section-color-field';
import { Header, Footer } from '@/components/sections';
import Cursor from '@/components/cursor/cursor';
import QuoteBuilder from './quote-builder';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Build a project brief, explore a 2D scope preview, and request a tailored software project quote.',
  alternates: { canonical: '/get-a-quote' }
};

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main
        className="px-4 pb-20 pt-32 sm:px-6 md:pt-40"
        data-section-tone="sky"
        data-section-color-anchor="sky"
      >
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Shape your project
          </h1>
          <p className="mb-10 mt-4 max-w-2xl text-muted-foreground">
            Choose the product and features you have in mind. The preview
            updates as you go, and you can send the brief when it feels right.
          </p>
          <QuoteBuilder />
        </div>
      </main>
      <SectionColorField />
      <Footer />
      <Cursor />
    </>
  );
}
