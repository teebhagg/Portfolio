import React from 'react';
import { metadata as meta } from '@/app/config';
import Link from '@/components/fancy/link';
import { contact } from '@/components/sections/contact/config';
import { copyright, footer } from '@/components/sections/footer/config';
import { links } from '@/components/sections/header/config';
import { getYearDisplay } from '@/lib/utils';
import { Github, X, Linkedin, Youtube } from 'lucide-react';

export default function Content() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-muted/30 px-12 py-8">
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
      <h1 className="mt-10 text-[18vw] leading-[0.8] md:text-[16vw] lg:text-[18vw] xl:text-[20vw] 2xl:text-[22vw]">
        Portfolio
      </h1>
      <p className="mt-4 text-xs sm:mt-0 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        © {yearDisplay}
        <br />
        {meta.author.name}
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

  const moreLinks = [{ name: 'Home', href: '/' }];
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-zinc-500 dark:text-zinc-400">
          About
        </h3>
        {navigationLinks.map((link, index) => {
          const { name, href } = link;

          return (
            <Link
              className="underline-offset-4 hover:underline"
              href={href}
              key={`ft-l_about_${index}`}
            >
              {name}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-zinc-500 dark:text-zinc-400">
          Socials
        </h3>
        {socialLinks.map((link, index) => {
          const { name, href, icon } = link;

          return (
            <Link
              className="flex items-center gap-2 underline-offset-4 hover:underline"
              href={href}
              target="_blank"
              key={`ft-l_social_${index}`}
              rel="noopener noreferrer"
            >
              {icon &&
                React.createElement(icon, {
                  className: 'h-4 w-4',
                  'aria-hidden': 'true'
                })}
              {name}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-zinc-500 dark:text-zinc-400">
          More
        </h3>
        {footer.map((link, index) => {
          const { title, href } = link;

          return (
            <Link
              className="underline-offset-4 hover:underline"
              href={href}
              key={`ft-l_more_${index}`}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
