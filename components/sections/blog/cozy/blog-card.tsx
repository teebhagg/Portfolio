import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';

import { BlogPost } from '@/types/blog';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ScrollWordReveal from '@/components/scroll-word-reveal';

interface BlogCardProps extends BlogPost {
  className?: string;
}

function BlogCard({
  title,
  slug,
  description,
  thumbnail,
  imagePosition,
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
        'group relative flex h-full flex-col overflow-hidden rounded-md border transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10',
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute left-0 top-0 z-10 m-3">
          {category && (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
              <ScrollWordReveal>{category}</ScrollWordReveal>
            </span>
          )}
        </div>
        <CardContent className="absolute inset-0 z-[2] w-full overflow-hidden p-0">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={`Image for ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: imagePosition ?? 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </CardContent>
      </div>

      <CardFooter className="mt-auto flex flex-col items-start gap-4 p-5">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                <ScrollWordReveal>{date}</ScrollWordReveal>
              </span>
            </div>
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  <ScrollWordReveal>{readTime}</ScrollWordReveal>
                </span>
              </div>
            )}
          </div>
          <h3 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            <ScrollWordReveal>{title}</ScrollWordReveal>
          </h3>
          <p className="text-sm text-muted-foreground">
            <ScrollWordReveal>{description || ''}</ScrollWordReveal>
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="rounded-full">
                <ScrollWordReveal>{tag}</ScrollWordReveal>
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="rounded-full">
                <ScrollWordReveal>+{tags.length - 3} more</ScrollWordReveal>
              </Badge>
            )}
          </div>
        )}

        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-1 text-xs font-medium"
        >
          <Link href={`/blog/${slug}`}>
            <ScrollWordReveal>Read Article</ScrollWordReveal>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
