import MotionWrap from '@/components/motion-wrap';
import BlogCard from './blog-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import { blogPosts } from '@/components/sections/blog/config';

function Blog() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="blog">
      <div className="px-4 md:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              My Blog
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Thoughts, ideas, and insights on web development, design, and
              technology.
            </p>
          </div>
          <div className="flex items-center justify-center overflow-hidden lg:px-12">
            <Carousel
              opts={{
                align: 'start'
              }}
              className="w-full"
            >
              <CarouselContent>
                {blogPosts.map((post, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-full	xl:basis-1/2"
                  >
                    <div className="h-full" key={index}>
                      <BlogCard
                        title={post.title}
                        slug={post.slug}
                        description={post.description}
                        thumbnail={post.thumbnail}
                        category={post.category}
                        tags={post.tags}
                        date={post.date}
                        author={post.author}
                        readTime={post.readTime}
                        featured={post.featured}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Blog;
