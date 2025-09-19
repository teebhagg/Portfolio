'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
}

export const Reveal = ({ children, width = '100%' }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    } else {
      mainControls.start('hidden');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      {/* TODO: Add slide div thingy */}
    </div>
  );
};

interface ModernRevealProps {
  phrases: string[];
  className?: string;
  as?: React.ElementType;
}

export function ModernReveal({
  phrases,
  className = '',
  as = 'div'
}: ModernRevealProps) {
  const body = useRef<HTMLDivElement>(null);
  const isInView = useInView(body, { once: true, margin: '0px' });

  const animation = {
    initial: { y: '100%', opacity: 0 },
    enter: (i: number) => ({
      y: '0',
      opacity: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.05 * i }
    })
  };

  const Tag = as;
  return (
    <Tag ref={body} className={className}>
      {phrases.map((phrase, index) => (
        <span
          key={index}
          className="relative mr-1 inline-flex w-fit overflow-hidden"
        >
          <motion.span
            className="inline-block"
            custom={index}
            variants={animation}
            initial="initial"
            animate={isInView ? 'enter' : ''}
          >
            {phrase}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export default Reveal;
