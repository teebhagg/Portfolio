'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRightIcon,
  Calendar,
  ExternalLink,
  GithubIcon
} from 'lucide-react';

import Link from 'next/link';

const animation = {
  hide: {
    y: -20,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1
  }
};

type ProjectMetadata = {
  name: string;
  description: string;
  website: string;
  github: string;
  techstack: Array<{ label: string }>;
  selected: boolean;
  slug: string;
  date?: string;
  category?: string;
};

type HeaderProps = {
  metadata: ProjectMetadata;
};

const Header = (props: HeaderProps) => {
  const {
    metadata: { name, description, website, github, date, category }
  } = props;

  return (
    <div className="space-y-8 pt-10">
      <motion.div
        initial={animation.hide}
        animate={animation.show}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
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
          {name}
        </h1>
        <p className="max-w-3xl text-xl text-muted-foreground">{description}</p>

        {date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-3"
        initial={animation.hide}
        animate={animation.show}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {website && (
          <Button
            variant="default"
            size="lg"
            className="gap-2 rounded-full"
            asChild
          >
            <Link href={website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {github && (
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-full"
            asChild
          >
            <Link href={github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4" />
              View Source Code
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
};
export default Header;
