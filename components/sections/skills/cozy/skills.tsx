'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SkillCard from './skill-card';

import { skills } from '@/components/sections/skills/config';
import MotionWrap from '@/components/motion-wrap';
import { Accordion } from '@/components/ui/accordion';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="skills" tone="mint">
      <div className="space-y-4 px-4 md:px-6 lg:space-y-10">
        <div className="flex w-full flex-col items-center justify-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="section-heading-line font-bold tracking-tighter">
              <ScrollWordReveal>My Skills</ScrollWordReveal>
            </h2>
          </div>
          <p className="mt-4 hidden text-muted-foreground lg:mt-0 lg:block lg:w-[35%]">
            <ScrollWordReveal>
              Here are some of my skills where I&apos;ve turned knowledge into
              expertise, making things happen.
            </ScrollWordReveal>
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="grid w-full auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="h-full"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.48,
                delay: prefersReducedMotion ? 0 : Math.min(index * 0.045, 0.27),
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <SkillCard
                index={index + 1}
                name={skill.name}
                description={skill.description}
                Icon={skill.Icon}
              />
            </motion.div>
          ))}
        </Accordion>
      </div>
    </MotionWrap>
  );
}

export default Skills;
