'use client';

import { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import {
  ADDON_STEP,
  CUSTOM_BUMP,
  FEATURE_SPECS,
  FEATURE_USD,
  addonMultiplier,
  formatAmount
} from '@/lib/quote-estimate';

// Move-style curve: opens quickly, settles softly. Used for the height and the chevron so they stay in step.
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const chipOn = 'border-primary bg-primary text-primary-foreground';
const chipOff = 'border-border hover:bg-muted';

type Props = {
  feature: string;
  currency: 'USD' | 'GHS';
  chosen: string[];
  isCustom: boolean;
  open: boolean;
  onToggle: () => void;
  onAddon: (label: string) => void;
  onCustom: () => void;
};

/** One feature in the builder. Collapsed it shows a summary; expanded it shows essentials, add-ons and custom changes. */
export function FeatureCustomiser({
  feature,
  currency,
  chosen,
  isCustom,
  open,
  onToggle,
  onAddon,
  onCustom
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const panelId = useId();
  const spec = FEATURE_SPECS[feature];
  const multiplier = addonMultiplier(chosen.length);
  const summary = [
    `${spec.included.length} included`,
    chosen.length
      ? `${chosen.length} add-on${chosen.length > 1 ? 's' : ''}`
      : '',
    isCustom ? 'custom changes' : ''
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div
      className={`rounded-3xl border transition-colors duration-200 ${open ? 'border-foreground/40' : 'border-border'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-14 w-full items-center gap-3 rounded-3xl px-4 py-3 text-left transition-colors duration-200 hover:bg-muted/40"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">{feature}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {summary}
          </span>
        </span>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          from {formatAmount(FEATURE_USD[feature] ?? 0, currency)}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 320, damping: 40 },
                opacity: {
                  duration: reduced ? 0 : 0.24,
                  delay: reduced ? 0 : 0.08,
                  ease: EASE
                }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 380, damping: 44 },
                opacity: { duration: reduced ? 0 : 0.14, ease: EASE }
              }
            }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-border/70 px-4 pb-4 pt-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Included
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {spec.included.map((item) => (
                    <li
                      key={item}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-muted px-3 text-xs"
                    >
                      <Check
                        aria-hidden="true"
                        className="size-3.5 text-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Add-ons
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {spec.addons.map((addon) => {
                    const on = chosen.includes(addon.label);
                    return (
                      <button
                        type="button"
                        key={addon.label}
                        onClick={() => onAddon(addon.label)}
                        aria-pressed={on}
                        className={`min-h-9 rounded-full border px-3 text-xs transition-colors duration-200 ${on ? chipOn : chipOff}`}
                      >
                        {addon.label}{' '}
                        <span className="tabular-nums">
                          +{formatAmount(addon.usd, currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {chosen.length > 1 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Multiple add-ons adjust the add-on cost by ×
                    {multiplier.toFixed(2)} (+{Math.round(ADDON_STEP * 100)}%
                    per extra add-on).
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onCustom}
                aria-pressed={isCustom}
                className={`min-h-11 w-full rounded-3xl border px-4 py-2 text-left text-sm transition-colors duration-200 ${isCustom ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'}`}
              >
                <span className="font-medium">
                  Custom changes to the standard setup
                </span>
                <span className="block text-xs text-muted-foreground">
                  Adds +{Math.round(CUSTOM_BUMP * 100)}% to this feature and
                  about a week of build time.
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
