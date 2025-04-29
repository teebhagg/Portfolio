import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

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

interface ProjectCardProps extends Project {
  className?: string;
}

function ProjectCard({
  name,
  description,
  thumbnail,
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
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10',
        className
      )}
    >
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 z-10 m-3">
          {category && (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>
        <CardContent className="z-[2] inline-block w-full overflow-hidden p-0">
          <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-72">
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={`Image of ${name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </CardContent>
      </div>

      <CardFooter className="flex flex-col items-start gap-4 p-5">
        <div>
          <h3 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{description || ''}</p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex w-full items-center justify-between">
          <Link
            href={'/projects/' + slug}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
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
