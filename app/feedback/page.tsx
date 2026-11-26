import type { Metadata } from 'next';
import SectionColorField from '@/components/section-color-field';
import Cursor from '@/components/cursor/cursor';
import { Footer, Header } from '@/components/sections';
import FeedbackForm from './feedback-form';
import ScrollWordReveal from '@/components/scroll-word-reveal';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share feedback about Joshua Ansah’s portfolio.',
  robots: { index: false, follow: true }
};

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <main
        data-section-tone="rose"
        data-section-color-anchor="rose"
        className="w-full px-4 pb-20 pt-32 sm:px-6 md:pt-40"
      >
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <ScrollWordReveal>Your perspective</ScrollWordReveal>
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            <ScrollWordReveal>Leave a little feedback.</ScrollWordReveal>
          </h1>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <ScrollWordReveal>
              Tell me what felt clear, useful, or worth improving. Your note
              stays in this page for now; this form does not send or save
              anything.
            </ScrollWordReveal>
          </p>
          <FeedbackForm />
        </div>
      </main>
      <SectionColorField />
      <Footer />
      <Cursor />
    </>
  );
}
