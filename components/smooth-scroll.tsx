// according to a github issue it is not reccomended to render this in a layout rather, have a wrapper component which does it each render
// https://github.com/darkroomengineering/lenis/issues/319
'use client';

import { ReactLenis, useLenis } from '@/lib/lenis';
import React, { useEffect } from 'react';

interface LenisProps {
  children: React.ReactNode;
}

function SmoothScroll({ children }: LenisProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const source = event.target;
      if (!(source instanceof Element)) return;

      const anchor = source.closest<HTMLAnchorElement>('a[href]');
      if (
        !anchor ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search ||
        !destination.hash
      ) {
        return;
      }

      const target = document.getElementById(
        decodeURIComponent(destination.hash.slice(1))
      );
      if (!target) return;

      event.preventDefault();
      if (destination.hash !== window.location.hash) {
        window.history.pushState(null, '', destination.hash);
      }
      lenis.scrollTo(target, { duration: 1.25 });
    };

    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        duration: 2
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
