import type { Metadata } from 'next';
import { TrustPage, TrustParagraph } from '@/components/trust-page';
import { trustPages } from '@/lib/trust-pages';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Joshua Ansah and his software engineering work.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <TrustPage eyebrow="Profile" title="About Joshua Ansah">
      {trustPages['/about']
        .split('\n\n')
        .slice(1)
        .map((text, index) => (
          <TrustParagraph key={index} text={text} />
        ))}
    </TrustPage>
  );
}
