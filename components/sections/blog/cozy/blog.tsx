'use client';

import { useState } from 'react';
import BlogCard from './blog-card';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import MotionWrap from '@/components/motion-wrap';
import { blogPosts } from '@/components/sections/blog/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function Blog() {
  const [filter, setFilter] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Extract unique categories from blog posts
  const allCategories = Array.from(
    new Set(
      blogPosts.filter((p) => p.category).map((p) => p.category as string)
    )
  ) as string[];

  // Filter blog posts based on selected category
  const filteredPosts = filter
    ? blogPosts.filter((post) => post.category === filter)
    : blogPosts;

  return (
    <MotionWrap className="w-full py-16 lg:py-24" id="blog" tone="gold">
      <div className="space-y-8 px-4 md:space-y-12 md:px-6 lg:space-y-16">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="section-heading-line font-bold tracking-tighter">
              <ScrollWordReveal>
                My <span className="text-primary">Blog</span>
              </ScrollWordReveal>
            </h2>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground lg:mt-0">
            <ScrollWordReveal>
              Thoughts, ideas, and insights on web development, design, and
              technology.
            </ScrollWordReveal>
          </p>
        </div>

        {allCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Button
              onClick={() => setFilter(null)}
              variant={filter === null ? 'default' : 'outline'}
              className="rounded-full"
              size="sm"
            >
              <ScrollWordReveal>All</ScrollWordReveal>
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? 'default' : 'outline'}
                className="rounded-full"
                size="sm"
              >
                <ScrollWordReveal>{category}</ScrollWordReveal>
              </Button>
            ))}
          </div>
        )}

        <motion.div
          layout={!prefersReducedMotion}
          className={cn(
            'mt-6 grid w-full gap-6 sm:gap-8',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.36,
                  delay: prefersReducedMotion
                    ? 0
                    : Math.min(index * 0.045, 0.27),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="h-full"
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionWrap>
  );
}

export default Blog;
