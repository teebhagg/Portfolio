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
import ScrollWordReveal from '@/components/scroll-word-reveal';

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
  websiteLabel?: string;
  github?: string;
  techstack?: Array<{ label: string }>;
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
    metadata: {
      name,
      description,
      website,
      websiteLabel,
      github,
      date,
      category
    }
  } = props;

  return (
    <div className="space-y-8 pt-10">
      <motion.div
        initial={animation.hide}
        animate={animation.show}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/#projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <ScrollWordReveal>Back to Projects</ScrollWordReveal>
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
            <ScrollWordReveal>{category}</ScrollWordReveal>
          </span>
        )}
        <h1 className="text-4xl font-bold leading-tight tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          <ScrollWordReveal>{name}</ScrollWordReveal>
        </h1>
        <p className="max-w-3xl text-xl text-muted-foreground">
          <ScrollWordReveal>{description}</ScrollWordReveal>
        </p>

        {date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              <ScrollWordReveal>{date}</ScrollWordReveal>
            </span>
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
              <ScrollWordReveal>
                {websiteLabel ?? 'Visit Website'}
              </ScrollWordReveal>
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
              <ScrollWordReveal>View Source Code</ScrollWordReveal>
            </Link>
          </Button>
        )}
      </motion.div>
    </div>
  );
};
export default Header;
