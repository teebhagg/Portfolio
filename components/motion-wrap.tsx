'use client';
import React, { ReactNode } from 'react';
import { motion, MotionProps, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type MotionWrapProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  respectReducedMotion?: boolean;
  tone?:
    | 'sky'
    | 'amber'
    | 'lavender'
    | 'mint'
    | 'rose'
    | 'aqua'
    | 'gold'
    | 'navy'
    | 'charcoal';
} & MotionProps;

const MotionWrap: React.FC<MotionWrapProps> = ({
  children,
  className,
  respectReducedMotion = false,
  tone,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = respectReducedMotion && prefersReducedMotion;

  return (
    <motion.section
      whileInView={
        reduceMotion
          ? { y: 0, opacity: 1 }
          : { y: [100, 50, 0], opacity: [0, 0, 1] }
      }
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
      className={cn(className, 'app__flex')}
      data-section-tone={tone}
      data-section-color-anchor={tone}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default MotionWrap;
