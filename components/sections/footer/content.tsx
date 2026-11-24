import React from 'react';
import { metadata as meta } from '@/app/config';
import Link from '@/components/fancy/link';
import { copyright, footer } from '@/components/sections/footer/config';
import { getYearDisplay } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';
import ScrollWordReveal from '@/components/scroll-word-reveal';

export default function Content() {
  return (
    <div
      data-section-tone="deep-blue"
      className="flex h-full w-full flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 lg:px-12"
    >
      <Nav />
      <Copyright />
    </div>
  );
}

const Copyright = () => {
  const { startYear } = copyright;
  const yearDisplay = getYearDisplay(startYear);

  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end md:gap-4">
      <p className="mt-8 whitespace-nowrap text-[16vw] leading-[0.8] sm:text-[18vw] md:mt-10 md:text-[16vw] lg:text-[18vw] xl:text-[20vw] 2xl:text-[22vw]">
        <ScrollWordReveal>Portfolio</ScrollWordReveal>
      </p>
      <p className="mt-4 text-xs sm:mt-0 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <ScrollWordReveal>© {yearDisplay}</ScrollWordReveal>
        <br />
        <ScrollWordReveal>{meta.author.name}</ScrollWordReveal>
      </p>
    </div>
  );
};

const Nav = () => {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' }
  ];

  const socialLinks = [
    { name: 'Github', href: 'https://github.com/teebhagg', icon: Github },
    {
      name: 'Linkedin',
      href: 'https://linkedin.com/in/joshua-ansah-b0a15a230',
      icon: Linkedin
    }
  ];

  const moreLinks = [{ name: 'Feedback', href: '/feedback' }];
  return (
    <div className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:gap-12 lg:gap-20">
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="mb-2 uppercase text-muted-foreground">
          <ScrollWordReveal>About</ScrollWordReveal>
        </h3>
        {navigationLinks.map((link, index) => {
          const { name, href } = link;

          return (
            <Link
              className="underline-offset-4 hover:underline"
              href={href}
              key={`ft-l_about_${index}`}
            >
              <ScrollWordReveal>{name}</ScrollWordReveal>
            </Link>
          );
        })}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="mb-2 uppercase text-muted-foreground">
          <ScrollWordReveal>Socials</ScrollWordReveal>
        </h3>
        {socialLinks.map((link, index) => {
          const { name, href, icon } = link;

          return (
            <Link
              className="flex w-fit items-center gap-2 underline-offset-4 hover:underline"
              href={href}
              target="_blank"
              key={`ft-l_social_${index}`}
              rel="noopener noreferrer"
              aria-label={name}
            >
              {icon && (
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-transform duration-200 ease-out hover:-translate-y-0.5">
                  {React.createElement(icon, {
                    className: 'h-4 w-4',
                    'aria-hidden': 'true'
                  })}
                </span>
              )}
              <ScrollWordReveal>{name}</ScrollWordReveal>
            </Link>
          );
        })}
      </div>
      <div className="col-span-2 flex min-w-0 flex-col gap-2 sm:col-span-1">
        <h3 className="mb-2 uppercase text-muted-foreground">
          <ScrollWordReveal>More</ScrollWordReveal>
        </h3>
        {footer.map((link, index) => {
          const { title, href } = link;

          return (
            <Link
              className="underline-offset-4 hover:underline"
              href={href}
              key={`ft-l_more_${index}`}
            >
              <ScrollWordReveal>{title}</ScrollWordReveal>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
