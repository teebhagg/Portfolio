import TOC, { type TocItem } from '@/components/blog/toc';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { Footer } from '@/components/sections';
import { blogPosts } from '@/components/sections/blog/config';
import { Button } from '@/components/ui/button';
import { getPage, type BlogMetadata } from '@/lib/mdx';
import { ArrowLeft, User } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
const ScrollToTop = dynamic(() => import('@/components/blog/scroll-to-top'), {
  ssr: false
});

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = (): Array<BlogPostPageProps['params']> => {
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
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

  // Try to get MDX content, fallback to config data if not found
  const mdxPost = getPage<BlogMetadata>(`blog/${params.slug}`);
  const { content = null, metadata = null } = mdxPost || {};

  // Simple slugify utility for heading IDs
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[`*_~]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  // Extract headings from markdown to build a TOC
  const extractHeadings = (md: string) => {
    const lines = md.split('\n');
    const seen: Record<string, number> = {};
    return lines
      .map((line) => {
        const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
        if (!match) return null;
        const depth = match[1].length;
        const raw = match[2].replace(/\s+#*\s*$/, '');
        let id = slugify(raw);
        if (seen[id] !== undefined) {
          seen[id] += 1;
          id = `${id}-${seen[id]}`;
        } else {
          seen[id] = 0;
        }
        return { depth, text: raw, id };
      })
      .filter(Boolean) as Array<{ depth: number; text: string; id: string }>;
  };

  const tocItems: TocItem[] = content ? extractHeadings(content) : [];

  return (
    <>
      {/* Header with back button */}
      <div className="border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {post.thumbnail && (
          <div className="mx-auto mb-10 max-w-5xl overflow-hidden rounded-xl border border-border/40">
            {/* Keep header image visible at top like reference */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-[260px] w-full object-cover sm:h-[320px] md:h-[380px]"
            />
          </div>
        )}
        <div className="py-12">
          <div className="mx-auto max-w-3xl">
            {/* Article Header */}
            <header className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                {metadata?.title || post.title}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {metadata?.description || post.description}
              </p>
            </header>

            {/* Author and Meta Info */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-muted/50 px-6 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    Written by
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {metadata?.author || post.author}
                  </p>
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm font-medium text-foreground">At</p>
                  <p className="text-sm font-semibold text-primary">
                    {metadata?.date || post.date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="mb-12 rounded-lg border border-border/40 bg-muted/20 p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Table of Contents
              </h2>
              <TOC items={tocItems} />
            </div>
          )}

          {/* Article Content */}
          <article className="prose max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:mb-8 prose-h1:mt-12 prose-h1:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-xl prose-p:mb-6 prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-medium prose-code:text-foreground prose-pre:rounded-lg prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground">
            {content ? (
              <MemoizedReactMarkdown
                components={{
                  h1: ({ children, ...props }) => {
                    const id = slugify(String(children));
                    return (
                      <h1 id={id} {...props}>
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children, ...props }) => {
                    const id = slugify(String(children));
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, ...props }) => {
                    const id = slugify(String(children));
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    );
                  }
                }}
              >
                {content}
              </MemoizedReactMarkdown>
            ) : (
              <div id="hello-world">
                <h1>{metadata?.title || post.title}</h1>
                <p>
                  Welcome to the world of programming! If you&apos;re new here,
                  &quot;Hello World&quot; is often the very first program that
                  developers write when learning a new language or tool. It
                  might seem simple, but this small program represents something
                  much larger—it&apos;s the first step in your coding journey!
                </p>

                <h2>What is &quot;Hello World&quot;?</h2>
                <p>
                  &quot;Hello World&quot; is essentially a way to confirm that
                  everything is working as expected. When you write and run this
                  program, it outputs the phrase &quot;Hello, World!&quot; to
                  the screen, showing that your environment is set up correctly.
                  Every programming language has its own syntax for doing this,
                  and it&apos;s the perfect way to get comfortable with the
                  basics.
                </p>

                <h3>A Simple Example in Python:</h3>
                <pre>
                  <code>print(&quot;Hello, World!&quot;)</code>
                </pre>
                <p>
                  That&apos;s it! Running this code will output the text to the
                  console, and boom—you&apos;ve just written your first Python
                  program.
                </p>

                <h3>Why It Matters</h3>
                <p>
                  The simplicity of &quot;Hello World&quot; might make it seem
                  unimportant, but it&apos;s a powerful moment. You&apos;re not
                  just typing random text; you&apos;re communicating with your
                  machine, telling it what to do. And when that first message
                  appears, you&apos;re officially a programmer.
                </p>

                <h3>Other Languages, Same Hello</h3>
                <p>
                  Here&apos;s how you&apos;d write &quot;Hello World&quot; in
                  some other languages:
                </p>

                <p>
                  <strong>JavaScript:</strong>
                </p>
                <pre>
                  <code>console.log(&quot;Hello, World!&quot;);</code>
                </pre>

                <p>
                  <strong>C++:</strong>
                </p>
                <pre>
                  <code>{`#include <iostream>
using namespace std;
 
int main() {
    cout << "Hello, World!";
    return 0;
}`}</code>
                </pre>

                <p>
                  <strong>Java:</strong>
                </p>
                <pre>
                  <code>{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}</code>
                </pre>

                <h3>Moving Beyond Hello World</h3>
                <p>
                  After mastering &quot;Hello World,&quot; the next steps are
                  learning more about syntax, control flow, data structures, and
                  algorithms. It&apos;s the start of an exciting journey where
                  you&apos;ll build complex programs, solve real-world problems,
                  and maybe even contribute to open-source projects.
                </p>

                <p>
                  So go ahead—write your &quot;Hello World&quot; program, and
                  welcome to the coding community!
                </p>
              </div>
            )}
          </article>

          {/* Leave comment section */}
          <div className="mt-12 rounded-lg border border-border/40 bg-muted/20 p-6">
            <p className="text-sm text-muted-foreground">Leave comment</p>
          </div>

          {/* Back to Blog Button */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
