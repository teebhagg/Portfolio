import { RefObject, useEffect } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    function handleEvent(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!ref.current || (target && ref.current.contains(target))) return;
      onOutsideClick(event);
    }

    document.addEventListener('mousedown', handleEvent, { passive: true });
    document.addEventListener('touchstart', handleEvent, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleEvent as EventListener);
      document.removeEventListener('touchstart', handleEvent as EventListener);
    };
  }, [ref, onOutsideClick]);
}
