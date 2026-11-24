import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import ExperienceCard from './experience-card';
import { experiences } from '@/components/sections/experience/config';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function Experiences() {
  return (
    <MotionWrap
      className="w-full py-16 lg:py-24"
      id="experiences"
      tone="rose"
      respectReducedMotion
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <ScrollWordReveal>Career</ScrollWordReveal>
          </p>
          <h2 className="section-heading-line font-bold tracking-tighter">
            <ScrollWordReveal>My Experience</ScrollWordReveal>
          </h2>
          <p className="max-w-md leading-relaxed text-muted-foreground">
            <ScrollWordReveal>
              Here are some of my work experiences where I&apos;ve turned
              challenges into accomplishments, making things happen.
            </ScrollWordReveal>
          </p>
        </div>
        <ol className="relative space-y-5 before:absolute before:bottom-5 before:left-[9px] before:top-5 before:w-px before:bg-border sm:space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.duration}`}
              index={index}
              name={experience.name}
              description={experience.description}
              company={experience.company}
              duration={experience.duration}
            />
          ))}
        </ol>
      </div>
    </MotionWrap>
  );
}

export default Experiences;
