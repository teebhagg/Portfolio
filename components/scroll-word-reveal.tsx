'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import React, { type ReactNode } from 'react';

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
  }
};

function splitIntoWords(node: ReactNode, key = 'word'): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part, index) =>
      /^\s+$/.test(part) ? (
        part
      ) : (
        <motion.span
          key={`${key}-${index}`}
          className="inline-block"
          variants={wordVariants}
        >
          {part}
        </motion.span>
      )
    );
  }

  if (Array.isArray(node)) {
    return React.Children.map(node, (child, index) =>
      splitIntoWords(child, `${key}-${index}`)
    );
  }

  if (
    React.isValidElement<{ children?: ReactNode }>(node) &&
    node.props.children
  ) {
    return React.cloneElement(node, {
      children: splitIntoWords(node.props.children, key)
    });
  }

  return node;
}

interface ScrollWordRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export default function ScrollWordReveal({
  children,
  className,
  stagger = 0.024
}: ScrollWordRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = prefersReducedMotion ?? false;

  return (
    <>
      <motion.span
        className={className ?? 'inline'}
        initial={noMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: noMotion ? 0 : stagger }
          }
        }}
      >
        {splitIntoWords(children)}
      </motion.span>
    </>
  );
}
