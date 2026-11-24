import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function About() {
  return (
    <MotionWrap className="w-full py-16 lg:py-24" id="about" tone="amber">
      {/* TODO: Redesign for horizontal */}
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
          <div className="max-w-[760px] space-y-4 text-muted-foreground md:text-lg/relaxed">
            <h3 className="font-semibold text-foreground">
              <ScrollWordReveal>How I approach product work</ScrollWordReveal>
            </h3>
            <p>
              <ScrollWordReveal>
                I like working close to the problem a product is meant to solve.
                That means understanding the people using it, clarifying the
                constraints, and choosing an approach that can be maintained
                after the first release. I move between interface details,
                application architecture, data, and delivery systems so that a
                feature feels coherent from the first interaction through its
                operation in production.
              </ScrollWordReveal>
            </p>
            <p>
              <ScrollWordReveal>
                My experience includes responsive websites, mobile applications,
                API services, financial workflows, education tools, and internal
                operations software. I value clear communication, practical
                documentation, thoughtful reviews, and steady collaboration with
                product and design partners. I aim to ship useful software in
                small, reviewable steps and to improve it with what the team
                learns from real use.
              </ScrollWordReveal>
            </p>
          </div>
          <details className="group max-w-[760px] rounded-2xl border border-border/70 bg-background/35 p-4 text-muted-foreground sm:p-5">
            <summary className="cursor-pointer list-none font-medium text-foreground marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <ScrollWordReveal>
                More about my engineering approach
              </ScrollWordReveal>
            </summary>
            <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
              <p>
                <ScrollWordReveal>
                  Product engineering means balancing user needs with the
                  realities of a system: its data, integrations, operating
                  costs, security boundaries, and the people who will support
                  it. I try to make those tradeoffs visible early, choose simple
                  designs that fit the problem, and leave a clear path for
                  future changes. For a new feature, I work from the expected
                  behavior and edge cases toward a solution that can be tested
                  and reviewed.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  On the web, I have built responsive product interfaces and
                  internal tools with React and TypeScript, connected them to
                  APIs and databases, and prepared them for deployment. On
                  mobile, I have delivered cross-platform experiences with
                  Flutter and React Native, including authentication,
                  notifications, messaging, payments, and location-aware flows.
                  I adapt the implementation to the platform and the job the
                  product needs to do.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  Backend and integration work has included Node.js services,
                  REST APIs, PostgreSQL data models, and connections to external
                  services. I pay attention to validation, authorization, useful
                  error states, and the way data moves between the interface and
                  the server. Those details help features behave consistently
                  and make later debugging less dependent on guesswork.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  I value collaborative delivery: agreeing on scope, sharing
                  progress, reviewing changes, and documenting decisions that
                  affect other people. I have worked with product managers,
                  designers, engineers, and small cross-functional teams in
                  Agile settings. My goal is to contribute work that is
                  understandable, reliable, and useful to the people who depend
                  on it after launch.
                </ScrollWordReveal>
              </p>
              <h3 className="pt-2 font-semibold text-foreground">
                <ScrollWordReveal>Ways I can contribute</ScrollWordReveal>
              </h3>
              <p>
                <ScrollWordReveal>
                  For web products, I can contribute to responsive interfaces,
                  shared components, application architecture, API integration,
                  and the operational work needed to release a feature. I have
                  used React, Next.js, and TypeScript for product websites and
                  applications, and I consider loading, validation, failure, and
                  accessibility states as part of the interface rather than
                  afterthoughts.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  For mobile products, I have built and maintained
                  cross-platform applications with Flutter, React Native, and
                  Expo. My work has included user onboarding, authentication,
                  payments, messaging, notifications, and location-related
                  flows. I pay attention to how interactions behave on real
                  devices and how application state is handled when
                  connectivity, permissions, or external services do not behave
                  as expected.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  For backend and platform work, I have built Node.js services
                  and REST APIs, worked with PostgreSQL and Firebase, and
                  connected applications to third-party services. I can help
                  shape request and data models, validate inputs, enforce access
                  rules, and make failure behavior easier to understand. I also
                  have experience improving CI/CD workflows and addressing
                  production bugs as part of a team’s regular delivery process.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  I am comfortable joining work at different stages, from
                  clarifying an early product idea to extending an existing
                  codebase. I prefer to understand current conventions before
                  changing them, break larger tasks into reviewable pieces, and
                  communicate tradeoffs when the simplest implementation has
                  meaningful limitations. This helps teammates follow the work
                  and makes it easier to keep improving the product after the
                  initial delivery.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  The products represented here include finance tools, education
                  and school software, logistics workflows, content platforms,
                  and public APIs. Each domain brings different needs: financial
                  products depend on clear records and dependable flows;
                  education tools need to support learners, educators, and
                  administrators; logistics systems coordinate people and
                  services; and APIs make local information easier for other
                  products to use. I take time to understand the context before
                  deciding what a good technical solution looks like.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  I also care about the work that keeps software healthy over
                  time. That includes readable code, useful automated checks,
                  safe data handling, clear error messages, repeatable
                  deployment steps, and monitoring that helps a team understand
                  what is happening in production. Not every project needs the
                  same tools or level of process, so I focus on practices that
                  reduce avoidable risk while keeping delivery practical for the
                  team and product.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  When improving an existing product, I start by learning how
                  people use it and where the current flow becomes difficult. I
                  look for the underlying cause before changing the visible
                  behavior, then make a focused improvement that fits the
                  current architecture. Afterward, I check the change against
                  expected behavior, review it with the team, and consider what
                  documentation or follow-up work will help the improvement
                  last.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  Each project page provides context about the product,
                  technologies, and role associated with that work. The pages
                  link to live products and public resources when available, so
                  readers can distinguish the experience described in a case
                  study from artifacts they can review directly. Project details
                  are kept with their relevant pages to make each contribution
                  easier to understand.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  I approach reliability as part of product quality. I check
                  important user journeys, test boundary conditions, and look at
                  how the software responds when a request fails or data is
                  incomplete. When an issue reaches production, I use the
                  available evidence to narrow down its cause and choose a fix
                  that addresses the behavior rather than hiding the symptom.
                  Clear follow-up notes help the team avoid repeating the same
                  investigation.
                </ScrollWordReveal>
              </p>
              <p>
                <ScrollWordReveal>
                  I enjoy solving problems that connect a clear user experience
                  with dependable engineering underneath. That can mean
                  simplifying a complex workflow, making information easier to
                  find, creating a reliable integration, or helping a team
                  deliver changes with more confidence. I look for the smallest
                  useful improvement, then build it in a way that fits the
                  product’s existing needs and technical direction.
                </ScrollWordReveal>
              </p>
            </div>
          </details>
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
