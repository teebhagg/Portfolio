'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export type Reference = { url: string; note: string };

export const MAX_REFERENCES = 8;
const inspiration = [
  { name: 'Dribbble', href: 'https://dribbble.com/' },
  { name: 'Mobbin', href: 'https://mobbin.com/' },
  { name: '21st.dev', href: 'https://21st.dev/' }
];
const field =
  'w-full rounded-3xl border border-border bg-background/60 px-4 py-3 text-sm';

/** Parses a pasted address. Only complete https links count, so a half-typed URL never saves. */
export function parseReference(value: string): string | null {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}

/** A cover image of the page. Rendered by a screenshot service, so the image appears without a site connection. */
export const coverUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=750`;

function Cover({ url }: { url: string }) {
  const [failed, setFailed] = useState(false);
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (failed) {
    return (
      <div className="grid aspect-video place-items-center rounded-2xl bg-muted text-xs font-medium text-muted-foreground">
        {host}
      </div>
    );
  }
  return (
    <img
      src={coverUrl(url)}
      alt=""
      width={1200}
      height={750}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-video w-full rounded-2xl border border-border object-cover"
    />
  );
}

export function ReferenceManager({
  references,
  setReferences
}: {
  references: Reference[];
  setReferences: (next: Reference[]) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const [draft, setDraft] = useState('');
  const draftUrl = parseReference(draft);
  const duplicate =
    !!draftUrl && references.some((item) => item.url === draftUrl);
  const full = references.length >= MAX_REFERENCES;
  const canSave = !!draftUrl && !duplicate && !full;

  const save = () => {
    if (!canSave || !draftUrl) return;
    setReferences([...references, { url: draftUrl, note: '' }]);
    setDraft('');
    toast.success('Link saved', {
      description: new URL(draftUrl).hostname.replace(/^www\./, '')
    });
  };
  const handleEnter = () => {
    if (!draft.trim()) return;
    if (!draftUrl) {
      toast.error('That link is not valid', {
        description: 'Paste the full address, starting with https://'
      });
      return;
    }
    if (duplicate) {
      toast.warning('Already saved', {
        description: 'That link is in your references.'
      });
      return;
    }
    if (full) {
      toast.warning(`You can add up to ${MAX_REFERENCES} references`, {
        description: 'Remove one to add another.'
      });
      return;
    }
    save();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {inspiration.map((item) => (
          <a
            className="min-h-10 rounded-full border px-4 py-2 text-sm hover:bg-muted"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            key={item.name}
          >
            {item.name}
          </a>
        ))}
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium">Paste a link</span>
        <input
          type="url"
          inputMode="url"
          spellCheck={false}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleEnter();
            }
          }}
          placeholder="https://…"
          className={field}
          disabled={full}
        />
        <span className="block text-xs text-muted-foreground">
          {full
            ? `You have added ${MAX_REFERENCES} references. Remove one to add another.`
            : draftUrl && duplicate
              ? 'That link is already saved.'
              : draftUrl
                ? 'Press Enter to save this reference.'
                : `Several pages from one site are fine. Up to ${MAX_REFERENCES} links.`}
        </span>
      </label>

      <AnimatePresence initial={false}>
        {draftUrl && !duplicate && (
          <motion.div
            key={`draft-${draftUrl}`}
            initial={{
              opacity: 0,
              y: reduced ? 0 : 8,
              scale: reduced ? 1 : 0.98
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: reduced ? 0 : 0.32,
                ease: [0.25, 1, 0.5, 1]
              }
            }}
            exit={{
              opacity: 0,
              y: reduced ? 0 : -6,
              transition: { duration: reduced ? 0 : 0.18 }
            }}
            className="rounded-3xl border border-dashed border-border p-3"
          >
            <Cover url={draftUrl} />
            <p className="mt-2 truncate text-xs text-muted-foreground">
              {draftUrl}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {references.map((reference, index) => (
            <motion.li
              key={reference.url}
              layout
              initial={{
                opacity: 0,
                y: reduced ? 0 : 8,
                scale: reduced ? 1 : 0.98
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: reduced ? 0 : 0.32,
                  ease: [0.25, 1, 0.5, 1],
                  delay: reduced ? 0 : 0.04
                }
              }}
              exit={{
                opacity: 0,
                scale: reduced ? 1 : 0.96,
                transition: { duration: reduced ? 0 : 0.18 }
              }}
              className="min-w-0 space-y-2 rounded-3xl border border-border p-3"
            >
              <div className="relative">
                <Cover url={reference.url} />
                <button
                  type="button"
                  aria-label={`Remove reference ${index + 1}`}
                  onClick={() => {
                    setReferences(
                      references.filter((item) => item.url !== reference.url)
                    );
                    toast.info('Reference removed');
                  }}
                  className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-background/90 text-foreground shadow transition-colors duration-200 hover:bg-background"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
              <a
                className="block truncate text-xs underline"
                href={reference.url}
                target="_blank"
                rel="noreferrer"
              >
                {new URL(reference.url).hostname.replace(/^www\./, '')}
              </a>
              <input
                aria-label={`What do you like about reference ${index + 1}?`}
                className="w-full rounded-2xl border border-border bg-background/60 px-3 py-2 text-sm"
                placeholder="What do you like about it?"
                value={reference.note}
                onChange={(event) =>
                  setReferences(
                    references.map((item) =>
                      item.url === reference.url
                        ? { ...item, note: event.target.value }
                        : item
                    )
                  )
                }
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
