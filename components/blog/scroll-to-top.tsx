'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLenis } from '@/lib/lenis';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () =>
      window.removeEventListener('scroll', onScroll as EventListener);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() =>
        lenis
          ? lenis.scrollTo(0, { duration: 1.25 })
          : window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      className="fixed bottom-6 right-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
