'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './project-card';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import MotionWrap from '@/components/motion-wrap';
import { projects } from '@/components/sections/projects/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Extract unique categories from projects
  const allCategories = Array.from(
    new Set(projects.filter((p) => p.category).map((p) => p.category as string))
  ) as string[];

  // Filter projects based on selected category
  const filteredProjects = filter
    ? projects.filter((project) => project.category === filter)
    : projects;

  const limit = isMobile ? 3 : 6;
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, limit);
  const hasMore = filteredProjects.length > limit;

  const handleFilterChange = (category: string | null) => {
    setFilter(category);
    setShowAll(false);
  };

  return (
    <MotionWrap
      className="w-full py-16 lg:py-24"
      id="projects"
      tone="charcoal"
      respectReducedMotion
    >
      <div className="space-y-8 px-4 md:space-y-12 md:px-6 lg:space-y-16">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="section-heading-line font-bold tracking-tight">
              <ScrollWordReveal>My Projects</ScrollWordReveal>
            </h2>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground lg:mt-0">
            <ScrollWordReveal>
              Here are some of my projects where I&apos;ve turned code into
              cool, functional solutions that solve real-world problems.
            </ScrollWordReveal>
          </p>
        </div>

        {allCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Button
              onClick={() => handleFilterChange(null)}
              variant={filter === null ? 'default' : 'outline'}
              className="rounded-full"
              size="sm"
            >
              <ScrollWordReveal>All</ScrollWordReveal>
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => handleFilterChange(category)}
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
          <AnimatePresence initial={false} mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout={!prefersReducedMotion}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReducedMotion
                    ? 0
                    : Math.min(index * 0.045, 0.27)
                }}
                className="h-full"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setShowAll((expanded) => !expanded)}
              variant="outline"
              aria-expanded={showAll}
            >
              <ScrollWordReveal>
                {showAll ? 'Show Less' : 'Show More'}
              </ScrollWordReveal>
            </Button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p className="text-lg font-medium text-muted-foreground">
              No projects found in this category
            </p>
            <Button
              onClick={() => handleFilterChange(null)}
              variant="link"
              className="mt-2"
            >
              View all projects
            </Button>
          </div>
        )}
      </div>
    </MotionWrap>
  );
}

export default Projects;
