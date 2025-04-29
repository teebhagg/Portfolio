import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogHeaderProps {
  title: string;
  category?: string;
  date: string;
  readTime?: string;
  tags?: string[];
}

const animation = {
  hide: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BlogHeader({
  title,
  category,
  date,
  readTime,
  tags
}: BlogHeaderProps) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <motion.div
        initial={animation.hide}
        animate={animation.show}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </motion.div>

      <motion.div
        className="space-y-4"
        initial={animation.hide}
        animate={animation.show}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {category && (
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {category}
          </span>
        )}
        <h1 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-bold leading-tight tracking-tighter text-transparent sm:text-5xl md:text-6xl">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
