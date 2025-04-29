import { Footer } from '@/components/sections';
import { blogPosts } from '@/components/sections/blog/config';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found'
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              width: 1200,
              height: 630,
              alt: post.title
            }
          ]
        : undefined
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pb-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="my-10">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="space-y-2">
            {post.category && (
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {post.category}
              </span>
            )}
            <h1 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground">{post.description}</p>

            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {post.thumbnail && (
          <div className="relative mb-10 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
            <Image
              src={post.thumbnail}
              width={1200}
              height={630}
              alt={post.title}
              className="w-full object-cover shadow-xl"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            This is a sample blog post content. In a real implementation, you
            would fetch the actual content of the blog post and render it here.
          </p>
          <p>
            You can replace this with actual MDX content or data from a CMS like
            you&apos;re doing with your projects section.
          </p>

          <h2>Key Points</h2>
          <ul>
            <li>This is where the actual blog content would go</li>
            <li>You can use markdown or rich text from a CMS</li>
            <li>The design matches your project&apos;s aesthetics</li>
          </ul>

          <p>For a complete implementation, you&apos;d want to:</p>
          <ol>
            <li>
              Create MDX files for each blog post in the content directory
            </li>
            <li>Set up fetching similar to your projects section</li>
            <li>Render the actual content using MDX components</li>
          </ol>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10">
            <Separator className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Separator className="mb-6" />
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
