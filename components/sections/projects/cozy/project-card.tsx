import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';

import { Project } from '@/types/project';
import { ExternalLink, GithubIcon } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import ScrollWordReveal from '@/components/scroll-word-reveal';

interface ProjectCardProps extends Project {
  className?: string;
}

function ProjectCard({
  name,
  description,
  thumbnail,
  imagePosition,
  imageFit,
  slug,
  category,
  tags,
  liveUrl,
  githubUrl,
  className
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'group relative grid h-[40rem] grid-rows-2 overflow-hidden rounded-md border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out focus-within:border-border focus-within:shadow-lg hover:-translate-y-1 hover:border-border hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 xl:h-[36rem]',
        className
      )}
    >
      <div
        className={cn(
          'relative h-full min-h-0 overflow-hidden bg-muted',
          imageFit === 'contain' && 'bg-stone-100 dark:bg-neutral-900'
        )}
      >
        <div className="absolute inset-0 z-10 flex items-start justify-between p-4">
          {category && (
            <span className="rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md">
              <ScrollWordReveal>{category}</ScrollWordReveal>
            </span>
          )}
        </div>
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={`${name} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            imageFit === 'contain' ? 'object-contain' : 'object-cover',
            'transition-transform duration-500 ease-out motion-reduce:scale-100 motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.035]'
          )}
          style={{ objectPosition: imagePosition ?? 'center' }}
        />
      </div>

      <CardFooter className="flex h-full min-h-0 flex-col items-start gap-4 p-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 break-words text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-card-foreground/80">
            <ScrollWordReveal>{name}</ScrollWordReveal>
          </h3>
          <p className="text-sm leading-relaxed text-card-foreground/80">
            <ScrollWordReveal>{description || ''}</ScrollWordReveal>
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-card-foreground/80"
              >
                <ScrollWordReveal>{tag}</ScrollWordReveal>
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex w-full items-center justify-between">
          <Link
            href={'/projects/' + slug}
            className="text-sm font-medium text-card-foreground hover:underline"
          >
            <ScrollWordReveal>View Details</ScrollWordReveal>
          </Link>

          <div className="flex gap-2">
            {githubUrl && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background"
                      asChild
                    >
                      <a
                        aria-label={`View ${name} source code on GitHub`}
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Source Code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {liveUrl && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background"
                      asChild
                    >
                      <a
                        aria-label={`Visit the ${name} website`}
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit Live Site</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
