'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Experience } from '@/types/experience';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';
import ScrollWordReveal from '@/components/scroll-word-reveal';

interface ExperienceCardProps extends Experience {
  className?: string;
  index?: number;
}

function ExperienceCard({
  company,
  name,
  duration,
  description,
  className,
  index = 0
}: ExperienceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.42,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.045, 0.27),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn('relative list-none pl-8', className)}
    >
      <span
        className="absolute left-0 top-6 z-[1] h-5 w-5 rounded-full border-[5px] border-background bg-foreground shadow-[0_0_0_1px_hsl(var(--border))]"
        aria-hidden="true"
      />
      <article className="rounded-lg border bg-card p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6">
        <div className="mb-4">
          <time className="mb-3 inline-flex rounded-full bg-muted px-3 py-1.5 text-xs font-medium tabular-nums text-muted-foreground sm:text-sm">
            <ScrollWordReveal>{duration}</ScrollWordReveal>
          </time>
          <h3 className="break-words text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            <ScrollWordReveal>{company}</ScrollWordReveal>
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <ScrollWordReveal>{name}</ScrollWordReveal>
          </p>
        </div>
        <div className="markdown max-w-prose text-sm leading-relaxed text-muted-foreground [&_li+li]:mt-2 [&_ul]:space-y-2 [&_ul]:pl-5">
          <Markdown
            components={{
              p({ children }) {
                return (
                  <p>
                    <ScrollWordReveal>{children}</ScrollWordReveal>
                  </p>
                );
              },
              li({ children }) {
                return (
                  <li>
                    <ScrollWordReveal>{children}</ScrollWordReveal>
                  </li>
                );
              }
            }}
          >
            {description}
          </Markdown>
        </div>
      </article>
    </motion.li>
  );
}

export default ExperienceCard;
