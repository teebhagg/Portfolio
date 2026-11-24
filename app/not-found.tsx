import Link from 'next/link';
import { TrustPage } from '@/components/trust-page';
import ScrollWordReveal from '@/components/scroll-word-reveal';

export default function NotFound() {
  return (
    <TrustPage eyebrow="404" title="That page could not be found.">
      <p>
        <ScrollWordReveal>
          The address may be incorrect, or the page may have moved. Return to
          the portfolio or use the machine-readable index to find published
          pages.
        </ScrollWordReveal>
      </p>
      <ul className="flex flex-wrap gap-5 text-foreground underline underline-offset-4">
        <li>
          <Link href="/">Portfolio home</Link>
        </li>
        <li>
          <Link href="/llms.txt">Agent index</Link>
        </li>
        <li>
          <Link href="/sitemap.xml">Sitemap</Link>
        </li>
      </ul>
    </TrustPage>
  );
}
