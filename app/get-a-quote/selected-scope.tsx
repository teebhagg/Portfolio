'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AppWindow,
  Boxes,
  Check,
  ChevronDown,
  Globe,
  Plug,
  Smartphone,
  type LucideIcon
} from 'lucide-react';
import {
  CUSTOM_BUMP,
  DEPOSIT_SHARE,
  PASS_THROUGH,
  PROJECT_BASE_USD,
  buildEstimate,
  formatAmount,
  formatLineWeeks,
  formatRange,
  formatUsdRange,
  formatWeeks,
  paymentSchedule,
  type Estimate,
  type FeatureLine
} from '@/lib/quote-estimate';
import { featureVisuals } from './scope-visuals';
import { ScopeReveal } from './scope-reveal';

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const platformMeta: Record<string, { icon: LucideIcon; note: string }> = {
  Website: { icon: Globe, note: 'Marketing or content site' },
  'Web App': { icon: AppWindow, note: 'Browser product with accounts' },
  'Mobile App': { icon: Smartphone, note: 'iPhone and Android app' },
  'API or Integration': { icon: Plug, note: 'Connects data between systems' },
  Other: { icon: Boxes, note: 'Something a little different' }
};

type Props = {
  projectType: string;
  features: string[];
  addons: Record<string, string[]>;
  custom: string[];
  extras: string[];
  registered: boolean;
  pages: number;
  currency: 'USD' | 'GHS';
};

function Row({
  label,
  value,
  strong = false
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 ${strong ? 'text-base font-semibold' : 'text-xs text-muted-foreground'}`}
    >
      <dt className="min-w-0">{label}</dt>
      <dd className="shrink-0 text-right tabular-nums">{value}</dd>
    </div>
  );
}

function FeatureCard({
  feature,
  line,
  currency
}: {
  feature: string;
  line: FeatureLine | undefined;
  currency: 'USD' | 'GHS';
}) {
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const Icon = featureVisuals[feature]?.icon ?? Check;
  const chosen = line?.addons ?? [];
  const duration = reduced ? 0 : 0.28;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: reduced ? 0 : 6 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.28, ease: EASE, delay: 0.06 }
      }}
      exit={{
        opacity: 0,
        y: reduced ? 0 : -4,
        transition: { duration: 0.18, ease: EASE }
      }}
      transition={{
        layout: reduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 360, damping: 42 }
      }}
      className={`min-w-0 rounded-3xl border border-border bg-background/60 ${open ? 'col-span-2' : ''}`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={`scope-${feature}-details`}
        className="flex w-full min-w-0 items-start gap-2.5 p-3 text-left transition-colors duration-200 hover:bg-muted/40"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-muted">
          <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium">{feature}</span>
          <span className="block text-xs tabular-nums">
            {line ? formatAmount(line.usd, currency) : ''}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`mt-1 size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {!open && (
        <p className="flex items-center justify-between gap-2 px-3 pb-3 text-[10px] text-muted-foreground">
          <span className="min-w-0 truncate">
            {chosen.length ? chosen.join(' · ') : 'Essentials only'}
          </span>
          {line && (
            <span className="flex shrink-0 items-center gap-1.5 tabular-nums">
              {line.custom && (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-foreground">
                  Custom
                </span>
              )}
              {formatLineWeeks(line.weeks)}
            </span>
          )}
        </p>
      )}

      <AnimatePresence initial={false}>
        {open && line && (
          <motion.div
            id={`scope-${feature}-details`}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 320, damping: 40 },
                opacity: {
                  duration: reduced ? 0 : 0.2,
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
                opacity: { duration: reduced ? 0 : 0.12, ease: EASE }
              }
            }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-border/70 px-3 pb-3 pt-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Included
                </p>
                <ul className="mt-1.5 space-y-1">
                  {line.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <Check
                        aria-hidden="true"
                        className="size-3 shrink-0 text-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {chosen.length > 0 && (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Add-ons
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {chosen.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-muted px-2 py-1 text-[11px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <dl className="space-y-1 text-xs">
                <Row
                  label="Essentials"
                  value={formatAmount(line.essentialsUsd, currency)}
                />
                {line.addonsUsd > 0 && (
                  <Row
                    label={`Add-ons${line.multiplier > 1 ? ` ×${line.multiplier.toFixed(2)}` : ''}`}
                    value={`+${formatAmount(line.addonsUsd, currency)}`}
                  />
                )}
                {line.custom && (
                  <Row
                    label={`Custom changes (+${Math.round(CUSTOM_BUMP * 100)}%)`}
                    value={`+${formatAmount(line.customUsd, currency)}`}
                  />
                )}
                <Row label="Build time" value={formatLineWeeks(line.weeks)} />
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function SelectedScope({
  projectType,
  features,
  addons,
  custom,
  extras,
  registered,
  pages,
  currency
}: Props) {
  const estimate: Estimate | null = buildEstimate({
    projectType,
    features,
    addons,
    custom,
    extras,
    registered,
    pages
  });
  const platform = platformMeta[projectType] ?? platformMeta.Other;
  const PlatformIcon = platform.icon;
  const other = currency === 'USD' ? 'GHS' : 'USD';
  const featuresUsd = estimate
    ? estimate.features.reduce((sum, line) => sum + line.usd, 0)
    : 0;

  return (
    <section aria-labelledby="selected-scope-heading" className="mt-6">
      <h3 id="selected-scope-heading" className="text-sm font-medium">
        Selected scope
      </h3>

      <div className="mt-3 flex items-center gap-3 rounded-3xl border border-border bg-background/60 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <PlatformIcon aria-hidden="true" className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">
            {projectType}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {platform.note}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">
            Base from
          </span>
          <span className="block text-sm font-medium tabular-nums">
            {formatAmount(
              PROJECT_BASE_USD[projectType] ?? PROJECT_BASE_USD.Other,
              currency
            )}
          </span>
        </span>
      </div>

      <ul className="mt-2 grid grid-cols-2 items-start gap-2">
        <AnimatePresence initial={false}>
          {features.map((feature) => (
            <FeatureCard
              key={feature}
              feature={feature}
              line={estimate?.features.find((item) => item.name === feature)}
              currency={currency}
            />
          ))}
        </AnimatePresence>
      </ul>

      {features.length === 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          Add features below to refine the estimate.
        </p>
      )}

      <div className="mt-4 rounded-3xl bg-muted p-4">
        {estimate ? (
          <dl className="space-y-2">
            <Row
              label="Base"
              value={formatAmount(estimate.base.usd, currency)}
            />
            <Row label="Features" value={formatAmount(featuresUsd, currency)} />
            {estimate.pages.usd > 0 && (
              <Row
                label={`Extra pages (${estimate.pages.extra})`}
                value={`+${formatAmount(estimate.pages.usd, currency)}`}
              />
            )}
            {estimate.extras.map((extra) => (
              <Row
                key={extra.label}
                label={extra.label}
                value={`+${formatAmount(extra.usd, currency)}`}
              />
            ))}
            {estimate.onboarding && (
              <Row
                label="Business onboarding"
                value={`+${formatAmount(estimate.onboarding.usd, currency)}`}
              />
            )}
            {estimate.features.length > 1 && (
              <Row
                label={`Combined work (+${Math.round(estimate.overhead.share * 100)}%)`}
                value={formatAmount(estimate.overhead.usd, currency)}
              />
            )}
            <div className="border-t border-border/70 pt-2">
              <Row
                label="Estimated total"
                value={formatRange(estimate, currency)}
                strong
              />
              <p className="text-right text-xs tabular-nums text-muted-foreground">
                {other} {formatRange(estimate, other)}
              </p>
            </div>
            <Row label="Timeline" value={formatWeeks(estimate.weeks)} />
            <div className="border-t border-border/70 pt-2">
              <p className="mb-2 text-xs font-medium">Payment schedule</p>
              {paymentSchedule(estimate).map((row) => (
                <Row
                  key={row.label}
                  label={row.label}
                  value={formatUsdRange(row.usd, currency)}
                />
              ))}
            </div>
          </dl>
        ) : (
          <p className="text-sm">
            Select a feature to see your range and timeline.
          </p>
        )}
        {estimate && (
          <p className="mt-3 text-xs text-muted-foreground">
            Indicative. We confirm the final price and timeline after reviewing
            your brief.
          </p>
        )}
      </div>
      <ScopeReveal show={!!estimate}>
        <details className="mt-3 rounded-3xl border border-border p-4">
          <summary className="cursor-pointer text-xs font-medium">
            Terms summary
          </summary>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li>
              A {Math.round(DEPOSIT_SHARE * 100)}% deposit confirms the start
              date.
            </li>
            <li>
              The balance is invoiced monthly over the build, in the currency
              you choose.
            </li>
            <li>
              The estimate is indicative. We confirm the final price and
              timeline after reviewing your brief.
            </li>
            <li>
              Changes outside the selected scope are quoted and agreed before
              work starts.
            </li>
            <li>
              Hosting, domains, SMS, payment-gateway and app-store fees are paid
              to the providers, not to us.
            </li>
            <li>Source files and rights transfer to you on final payment.</li>
          </ul>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Summary only. The full terms are in the signed proposal.
          </p>
        </details>
      </ScopeReveal>
      <ScopeReveal show={!!estimate}>
        <div className="mt-3 rounded-3xl border border-dashed border-border p-4">
          <p className="text-xs font-medium">
            Billed by providers, not in this total
          </p>
          <ul className="mt-2 space-y-1.5">
            {PASS_THROUGH.filter(
              (item) => !item.mobileOnly || projectType === 'Mobile App'
            ).map((item) => (
              <li key={item.label} className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {item.label}.
                </span>{' '}
                {item.detail}
              </li>
            ))}
          </ul>
        </div>
      </ScopeReveal>
    </section>
  );
}
