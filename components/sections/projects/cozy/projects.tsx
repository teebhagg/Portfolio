'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './project-card';

import Reveal from '@/components/reveal';

import MotionWrap from '@/components/motion-wrap';
import { projects } from '@/components/sections/projects/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    <MotionWrap className="w-full py-24 lg:py-32" id="projects">
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
                Projects
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground dark:text-gray-400 lg:mt-0">
            Here are some of my projects where I&apos;ve turned code into cool,
            functional solutions that solve real-world problems.
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
              All
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => handleFilterChange(category)}
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
          {displayedProjects.map((project, index) => (
            <Reveal key={index}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>

        {hasMore && !showAll && (
          <div className="mt-8 flex justify-center">
            <Button onClick={() => setShowAll(true)} variant="outline">
              Show More
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
