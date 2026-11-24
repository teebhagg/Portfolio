import type { Metadata } from 'next';
import { TrustPage, TrustParagraph } from '@/components/trust-page';
import { trustPages } from '@/lib/trust-pages';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy information for the Joshua Ansah portfolio website.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyPage() {
  return (
    <TrustPage eyebrow="Site information" title="Privacy notice">
      {trustPages['/privacy']
        .split('\n\n')
        .slice(1)
        .map((text, index) => (
          <TrustParagraph key={index} text={text} />
        ))}
    </TrustPage>
  );
}
