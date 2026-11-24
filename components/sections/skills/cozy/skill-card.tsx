import React, { type ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BrainCircuit,
  CodeIcon,
  FolderKanban,
  GitBranch,
  GitBranchPlus,
  Handshake,
  Lightbulb,
  MessageCircle,
  UsersRound,
  Workflow,
  type LucideIcon
} from 'lucide-react';
import Markdown from 'react-markdown';
import Image from 'next/image';

import { MemoizedReactMarkdown } from '@/components/markdown';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { trimString } from '@/lib/utils';
import { trimLen } from '@/components/sections/skills/config';
import { Skill } from '@/types/skill';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import ScrollWordReveal from '@/components/scroll-word-reveal';

const technologyLogos: Record<string, string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Dart: 'dart',
  'React.js': 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Material-UI': 'mui',
  Bootstrap: 'bootstrap',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  'Nest.js': 'nestjs',
  Flutter: 'flutter',
  'React Native': 'react',
  Expo: 'expo',
  MongoDB: 'mongodb',
  PostgreSQL: 'postgresql',
  Firebase: 'firebase',
  Git: 'git',
  GitHub: 'github',
  Notion: 'notion',
  Figma: 'figma',
  Docker: 'docker',
  'CI/CD': 'githubactions',
  Redux: 'redux',
  Cursor: 'cursor'
};

const supportingSkillIcons: Record<string, LucideIcon> = {
  Codex: GitBranchPlus,
  'LLM-assisted development': BrainCircuit,
  Agile: Workflow,
  'Project Management': FolderKanban,
  'SDLC (Software Development Life Cycle)': GitBranch,
  Communication: MessageCircle,
  Collaboration: UsersRound,
  Teamwork: Handshake,
  'Problem-Solving': Lightbulb
};

function getPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }

  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return getPlainText(node.props.children);
  }

  return '';
}

interface SkillCardProps extends Skill {
  index: number;
  className?: string;
}

function SkillCard({
  name,
  description,
  Icon,
  index,
  className
}: SkillCardProps) {
  return (
    <Card className={cn('skill-card group h-full bg-muted/40', className)}>
      <CardContent className="flex h-full flex-col items-start p-6">
        <AccordionItem value={`acc-${index}`} className="w-full border-none">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">({index})</span>
            {trimLen !== -1 && (description || '').length > trimLen ? (
              <AccordionTrigger />
            ) : Icon ? (
              <Icon className="h-8 w-8" />
            ) : (
              <CodeIcon className="h-8 w-8" />
            )}
          </div>

          <div className="grid gap-0.5">
            <h3 className="mt-2 text-2xl font-bold leading-8 tracking-tight">
              <ScrollWordReveal>{name}</ScrollWordReveal>
            </h3>
            {trimLen !== 0 && (
              <div className="markdown mt-2 text-base text-muted-foreground">
                <Markdown
                  className="markdown"
                  components={{
                    p({ children }) {
                      return (
                        <p>
                          <ScrollWordReveal>{children}</ScrollWordReveal>
                        </p>
                      );
                    },
                    li({ children }) {
                      const skillName = getPlainText(children).trim();
                      const logo = technologyLogos[skillName];
                      const SupportingIcon = supportingSkillIcons[skillName];

                      return (
                        <li className="skill-reveal-item">
                          {logo ? (
                            <span className="skill-reveal-logo skill-logo-frame flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                              <Image
                                src={`/images/skill-logos/${logo}.svg`}
                                alt=""
                                aria-hidden="true"
                                width={18}
                                height={18}
                                className="skill-reveal-image dark:brightness-0 dark:invert"
                              />
                            </span>
                          ) : SupportingIcon ? (
                            <span className="skill-reveal-logo skill-logo-frame flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background">
                              <SupportingIcon
                                aria-hidden="true"
                                className="size-[18px] text-foreground"
                                size={18}
                                strokeWidth={1.8}
                              />
                            </span>
                          ) : null}
                          <ScrollWordReveal>{children}</ScrollWordReveal>
                        </li>
                      );
                    },
                    ul({ children }) {
                      return <ul className="skill-reveal-list">{children}</ul>;
                    }
                  }}
                >
                  {trimLen !== -1
                    ? trimString(trimLen, description || '')
                    : description}
                </Markdown>
              </div>
            )}
          </div>

          {trimLen !== -1 && (description || '').length > trimLen && (
            <AccordionContent className="text-md">
              <Separator className="my-2" />
              <MemoizedReactMarkdown
                className="prose min-w-full break-words text-muted-foreground dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                  p({ children }) {
                    return (
                      <p className="mb-2 last:mb-0">
                        <ScrollWordReveal>{children}</ScrollWordReveal>
                      </p>
                    );
                  }
                }}
              >
                {(trimLen !== 0 ? '...' : '') + description!.substring(trimLen)}
              </MemoizedReactMarkdown>
            </AccordionContent>
          )}
        </AccordionItem>
      </CardContent>
    </Card>
  );
}

export default SkillCard;
