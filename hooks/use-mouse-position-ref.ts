import { RefObject, useEffect, useRef } from 'react';

export function useMousePositionRef(
  containerRef?: RefObject<HTMLElement | null>
) {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = containerRef?.current?.getBoundingClientRect();
      if (rect) {
        ref.current.x = e.clientX - rect.left;
        ref.current.y = e.clientY - rect.top;
      } else {
        ref.current.x = e.clientX;
        ref.current.y = e.clientY;
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () =>
      window.removeEventListener('mousemove', handler as EventListener);
  }, [containerRef]);

  return ref;
}
