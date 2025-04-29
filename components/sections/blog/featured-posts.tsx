import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BlogPost } from '@/types/blog';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostsProps {
  posts: BlogPost[];
  className?: string;
}

export default function FeaturedPosts({
  posts,
  className
}: FeaturedPostsProps) {
  // Filter only featured posts and limit to 2
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2);

  if (featuredPosts.length === 0) return null;

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Featured Posts</h3>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/blog">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {featuredPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={post.thumbnail || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                {post.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                    {post.category}
                  </span>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
                <h4 className="line-clamp-1 text-lg font-semibold">
                  {post.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
