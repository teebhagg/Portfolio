'use client';

import { useState } from 'react';
import BlogCard from './blog-card';

import Reveal from '@/components/reveal';

import MotionWrap from '@/components/motion-wrap';
import { blogPosts } from '@/components/sections/blog/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Blog() {
  const [filter, setFilter] = useState<string | null>(null);

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
    <MotionWrap className="w-full py-24 lg:py-32" id="blog">
      <div className="space-y-8 px-4 md:space-y-12 md:px-6 lg:space-y-16">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                My
              </h2>
            </Reveal>
            <Reveal>
              <h2 className="-mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Blog
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground dark:text-gray-400 lg:mt-0">
            Thoughts, ideas, and insights on web development, design, and
            technology.
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
              All
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? 'default' : 'outline'}
                className="rounded-full"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        <div
          className={cn(
            'mt-6 grid w-full gap-6 sm:gap-8',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {filteredPosts.map((post, index) => (
            <Reveal key={index}>
              <BlogCard {...post} />
            </Reveal>
          ))}
        </div>
      </div>
    </MotionWrap>
  );
}

export default Blog;
