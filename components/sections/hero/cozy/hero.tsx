import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import { hero } from '@/components/sections/hero/config';
import { ArrowUpRight } from 'lucide-react';
import ScrollWordReveal from '@/components/scroll-word-reveal';

function Hero() {
  return (
    <MotionWrap
      className="w-full px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-24"
      id="home"
      tone="sky"
      respectReducedMotion
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.02fr_0.98fr] md:gap-12 lg:gap-20">
        <div className="relative z-10 space-y-6 md:space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span
              className="h-2 w-2 rounded-full bg-foreground"
              aria-hidden="true"
            />
            <ScrollWordReveal>{hero.label}</ScrollWordReveal>
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-pretty text-[clamp(1.5rem,8vw,2.25rem)] font-bold leading-[1.04] tracking-tighter sm:text-5xl md:whitespace-nowrap md:text-[clamp(1.9rem,4vw,2.5rem)] lg:text-[clamp(2.2rem,3.4vw,3rem)]">
              <ScrollWordReveal>
                Hi, I&apos;m{' '}
                <span className="text-muted-foreground">{hero.name}</span>
              </ScrollWordReveal>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              <ScrollWordReveal>
                {hero.description.split(/(portfolio)/i).map((part, index) =>
                  part.toLowerCase() === 'portfolio' ? (
                    <strong
                      className="font-bold uppercase italic"
                      key={`hero-description-${index}`}
                    >
                      PORTFOLIO
                    </strong>
                  ) : (
                    part
                  )
                )}
              </ScrollWordReveal>
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <ScrollWordReveal>Explore my work</ScrollWordReveal>
            <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-xl md:ml-auto">
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-[50px] border bg-muted shadow-xl">
            <Image
              alt={`Memoji-style portrait of ${hero.name}`}
              className="h-full w-full object-cover object-center"
              height={900}
              sizes="(max-width: 767px) 92vw, (max-width: 1200px) 46vw, 560px"
              src="/images/hero-memoji.png"
              width={800}
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-3 w-[clamp(5.5rem,25%,9rem)] overflow-hidden rounded-[50px] border-[5px] border-background bg-background shadow-2xl transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:-bottom-7 sm:-left-6">
            <Image
              alt={`Photograph of ${hero.name}`}
              className="h-auto w-full"
              height={3093}
              sizes="(max-width: 640px) 24vw, 144px"
              src="/images/hero.jpg"
              width={3648}
            />
          </div>
          <span className="absolute -right-1 top-5 rounded-full border bg-background/90 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:-right-4 sm:top-8 sm:text-sm">
            <ScrollWordReveal>Thoughtful digital experiences</ScrollWordReveal>
          </span>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Hero;
