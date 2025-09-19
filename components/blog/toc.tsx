'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type TocItem = { depth: number; text: string; id: string };

type TocNode = TocItem & { children: TocNode[] };

function buildTree(items: TocItem[]): TocNode[] {
  const root: TocNode[] = [];
  const stack: TocNode[] = [];

  items.forEach((item) => {
    const node: TocNode = { ...item, children: [] };
    while (stack.length && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  });
  return root;
}

export default function TOC({ items }: { items: TocItem[] }) {
  const tree = useMemo(() => buildTree(items), [items]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    tree.forEach((n) => (init[n.id] = true));
    return init;
  });

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  const onScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80; // header offset
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  const renderNode = (node: TocNode) => {
    const hasChildren = node.children.length > 0;
    const isOpen = expanded[node.id];
    return (
      <li key={node.id} className="list-none">
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => toggle(node.id)}
              aria-label={isOpen ? 'Collapse section' : 'Expand section'}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <span className="inline-block w-4" />
          )}
          <Link
            href={`#${node.id}`}
            onClick={(e) => onScrollTo(e, node.id)}
            className={cn(
              'transition-colors hover:text-foreground',
              node.depth <= 2
                ? 'text-sm font-medium text-muted-foreground'
                : 'ml-4 text-sm text-muted-foreground'
            )}
          >
            {node.text}
          </Link>
        </div>
        {hasChildren && isOpen && (
          <ul className="mt-2 space-y-2 pl-5">
            {node.children.map(renderNode)}
          </ul>
        )}
      </li>
    );
  };

  if (!items.length) return null;

  return <ul className="space-y-2">{tree.map(renderNode)}</ul>;
}
