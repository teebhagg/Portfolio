import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function About() {
  return (
    <MotionWrap className="w-full py-16 lg:py-24" id="about" tone="amber">
      <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="section-heading-line font-bold tracking-tighter">
              <ScrollWordReveal>About Me</ScrollWordReveal>
            </h2>
          </div>
          <p className="mt-4 hidden text-muted-foreground lg:mt-0 lg:block lg:w-[35%]">
            <ScrollWordReveal>
              Here&apos;s where I share my journey through tech, highlighting
              the experiences and passions that drive my innovative pursuits.
            </ScrollWordReveal>
          </p>
        </div>
        <div className="space-y-4">
          <p className="mt-6 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <ScrollWordReveal>
              I am a Software Engineer with 3+ years building and scaling
              production fintech and SaaS products across web and mobile. I
              specialize in TypeScript, React/Next.js, Node.js/NestJS, Flutter,
              and React Native, delivering features end-to-end from system
              design and data modeling through testing, CI/CD, and
              observability. I have a proven track record improving reliability,
              automating manual workflows, and leading small cross-functional
              teams in Agile, remote, fast-paced startup environments.
            </ScrollWordReveal>
          </p>
          <Button asChild>
            <Link
              href="resume.pdf"
              target="_blank"
              download={'JOSHUA ANSAH CV - Full Stack.pdf'}
            >
              <ScrollWordReveal>View Resume</ScrollWordReveal>{' '}
              <ArrowUpRightIcon className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </MotionWrap>
  );
}

export default About;
