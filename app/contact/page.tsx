import type { Metadata } from 'next';
import { TrustPage, TrustParagraph } from '@/components/trust-page';
import { trustPages } from '@/lib/trust-pages';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Joshua Ansah about software engineering work and collaboration.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <TrustPage eyebrow="Get in touch" title="Contact Joshua">
      {trustPages['/contact']
        .split('\n\n')
        .slice(1)
        .map((text, index) => (
          <TrustParagraph key={index} text={text} />
        ))}
    </TrustPage>
  );
}
