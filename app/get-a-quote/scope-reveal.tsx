'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/**
 * Shows or hides a block with a subtle delayed entrance: it waits a beat, then rises and fades in.
 * It leaves quickly, so removal never lags the interaction that caused it.
 */
export function ScopeReveal({
  show,
  children
}: {
  show: boolean;
  children: ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key="reveal"
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: reduced ? 0 : 0.32,
              ease: EASE,
              delay: reduced ? 0 : 0.08
            }
          }}
          exit={{
            opacity: 0,
            y: reduced ? 0 : -4,
            transition: { duration: reduced ? 0 : 0.16, ease: EASE }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
