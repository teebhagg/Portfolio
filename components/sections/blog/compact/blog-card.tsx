import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Calendar, Clock, InfoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/types/blog';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

interface BlogCardProps extends BlogPost {
  className?: string;
}

function BlogCard({
  title,
  slug,
  description,
  thumbnail,
  category,
  tags,
  date,
  author,
  readTime,
  className
}: BlogCardProps) {
  return (
    <Card
      className={cn(
        'flex h-full flex-col justify-between bg-muted/40',
        className
      )}
    >
      <CardContent className="p-4 md:p-6">
        <div className="grid gap-2">
          <div className="relative h-48 w-full overflow-hidden rounded-md">
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={`Image for ${title}`}
              sizes="100vw"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {category && (
              <span className="absolute left-2 top-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                {category}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description || ''}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end p-4 md:p-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="z-[2] rounded-full border bg-muted hover:bg-foreground/10"
                asChild
              >
                <Link href={'/blog/' + slug}>
                  <InfoIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Read Full Article</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      <Link href={'/blog/' + slug} className="z-1 absolute inset-0 block" />
    </Card>
  );
}

export default BlogCard;
