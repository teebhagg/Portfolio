'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import { quoteRequestSubmit } from '@/app/actions';
import {
  EXTRAS,
  FEATURE_SPECS,
  FEATURE_USD,
  ONBOARDING,
  PROJECT_BASE_USD,
  buildEstimate,
  formatAmount,
  formatDate,
  formatRange,
  formatUsdRange,
  formatWeeks,
  needsRegistration,
  paymentSchedule,
  PAGES_INCLUDED,
  PAGE_USD
} from '@/lib/quote-estimate';
import { FeatureCustomiser } from './feature-customiser';
import { ScopeReveal } from './scope-reveal';
import { Toaster, toast } from 'sonner';
import { ReferenceManager, type Reference } from './reference-manager';
import { ScopeFrame } from './scope-frame';
import { SelectedScope } from './selected-scope';

const types = [
  'Website',
  'Web App',
  'Mobile App',
  'API or Integration',
  'Other'
];
const featureOptions = [
  'Authentication',
  'Payments',
  'Subscriptions',
  'Dashboard',
  'Notifications',
  'Third-party integrations'
];
const inspiration = [
  { name: 'Dribbble', href: 'https://dribbble.com/' },
  { name: 'Mobbin', href: 'https://mobbin.com/' },
  { name: '21st.dev', href: 'https://21st.dev/' }
];
const steps = ['Scope', 'Details & send'];

type Currency = 'USD' | 'GHS';

const card = 'rounded-[36px] border border-border/70 bg-card p-6 shadow-sm';
const field =
  'w-full rounded-3xl border border-border bg-background/60 px-4 py-3 text-sm';
const label = 'text-sm font-medium';
const chip =
  'min-h-11 rounded-full border px-4 text-sm transition-colors duration-200';
const chipOn = 'border-primary bg-primary text-primary-foreground';
const chipOff = 'border-border hover:bg-muted';

export default function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState('Website');
  const [features, setFeatures] = useState<string[]>([]);
  const [addons, setAddons] = useState<Record<string, string[]>>({});
  const [custom, setCustom] = useState<string[]>([]);
  const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({});
  const [extras, setExtras] = useState<string[]>([]);
  const [registered, setRegistered] = useState(false);
  const [pages, setPages] = useState(PAGES_INCLUDED);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [references, setReferences] = useState<Reference[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  // The mobile overlay and collapsed bar render into <body>, outside the page stacking context, so they always sit above the footer.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // The collapsed bar stops at the base of this section: it never travels into the footer.
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mounted) return;
    let frame = 0;
    const clamp = () => {
      frame = 0;
      const root = rootRef.current,
        bar = barRef.current;
      if (!root || !bar) return;
      const rect = root.getBoundingClientRect();
      const gap = 16;
      const offset = Math.max(gap, window.innerHeight - rect.bottom + gap);
      bar.style.bottom = `calc(env(safe-area-inset-bottom) + ${offset}px)`;
      bar.style.visibility =
        rect.top > window.innerHeight || rect.bottom < 0 ? 'hidden' : 'visible';
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(clamp);
    };
    clamp();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [mounted]);

  useEffect(() => {
    if (!builderOpen) return;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === 'Escape' && setBuilderOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [builderOpen]);

  const toggleFeature = (value: string) => {
    const selected = features.includes(value);
    setFeatures((current) =>
      selected ? current.filter((item) => item !== value) : [...current, value]
    );
    if (!selected) {
      setOpenFeatures((current) => ({ ...current, [value]: true }));
      toast.success(`${value} added`, {
        description: 'Its essentials are included.'
      });
    } else toast.info(`${value} removed`);
    if (selected) {
      setAddons((current) => {
        const next = { ...current };
        delete next[value];
        return next;
      });
      setCustom((current) => current.filter((item) => item !== value));
    }
  };
  const toggleAddon = (feature: string, option: string) =>
    setAddons((current) => {
      const chosen = current[feature] ?? [];
      return {
        ...current,
        [feature]: chosen.includes(option)
          ? chosen.filter((item) => item !== option)
          : [...chosen, option]
      };
    });
  const toggleCustom = (feature: string) =>
    setCustom((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  const toggleExtra = (id: string) => {
    const label = EXTRAS.find((extra) => extra.id === id)?.label ?? 'Extra';
    const on = extras.includes(id);
    setExtras((current) =>
      on ? current.filter((item) => item !== id) : [...current, id]
    );
    if (on) toast.info(`${label} removed`);
    else toast.success(`${label} added`);
  };

  const registrationRequired = needsRegistration(features, addons);
  const visibleExtras = EXTRAS.filter(
    (extra) => !extra.appliesTo || extra.appliesTo.includes(projectType)
  );
  const estimate = buildEstimate({
    projectType,
    features,
    addons,
    custom,
    extras,
    registered,
    pages
  });
  const other = currency === 'USD' ? 'GHS' : 'USD';
  const estimateText = estimate
    ? `${currency} ${formatRange(estimate, currency)} (${other} ${formatRange(estimate, other)}) · ${formatWeeks(estimate.weeks)}`
    : 'Pending';
  const featureDetail = (feature: string) => {
    const spec = FEATURE_SPECS[feature];
    const chosen = addons[feature] ?? [];
    return [
      `included: ${spec.included.join(', ')}`,
      chosen.length ? `add-ons: ${chosen.join(', ')}` : '',
      custom.includes(feature) ? 'custom changes' : ''
    ]
      .filter(Boolean)
      .join('; ');
  };
  const extrasText =
    visibleExtras
      .filter((extra) => extras.includes(extra.id))
      .map((extra) => extra.label)
      .join(', ') || 'None';
  const registrationText = !registrationRequired
    ? 'Not needed'
    : registered
      ? 'Registered business'
      : 'Not registered (onboarding support added)';
  const brief = () =>
    [
      `Project: ${projectType}`,
      `Features: ${features.join(', ') || 'None selected'}`,
      ...features.map((feature) => `${feature}: ${featureDetail(feature)}`),
      `Extras: ${extrasText}`,
      `Pages: ${['API or Integration', 'Mobile App'].includes(projectType) ? 'Not applicable' : pages}`,
      `Business registration: ${registrationText}`,
      `Currency: ${currency}`,
      `Estimated range: ${estimateText}`,
      ...(estimate
        ? [
            `Payment schedule (${currency}): ${paymentSchedule(estimate)
              .map((row) => `${row.label} ${formatUsdRange(row.usd, currency)}`)
              .join('; ')}`
          ]
        : []),
      `Budget: ${budget || 'Not provided'}`,
      `Target launch: ${timeline ? formatDate(timeline) : 'Not provided'}`,
      `Goal: ${goal}`,
      'References:',
      ...references.map(
        (ref) => `- ${ref.url}${ref.note ? `: ${ref.note}` : ''}`
      )
    ].join('\n');
  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief());
      setStatus('Brief copied.');
      toast.success('Brief copied', {
        description: 'Paste it into an email or chat.'
      });
    } catch {
      toast.error('Could not copy', {
        description: 'Select the brief text and copy it by hand.'
      });
    }
  };
  const send = async () => {
    setSending(true);
    setStatus('');
    const detailsPayload = {
      ...Object.fromEntries(
        features.map((feature) => [feature, featureDetail(feature)])
      ),
      Extras: extrasText,
      Pages: String(pages),
      'Business registration': registrationText
    };
    const result = await quoteRequestSubmit({
      name,
      email,
      goal,
      projectType,
      features,
      details: detailsPayload,
      currency,
      budget,
      timeline: timeline ? formatDate(timeline) : '',
      references,
      estimate: estimateText
    });
    setStatus(result.message);
    setSending(false);
    if (result.success)
      toast.success('Quote request sent', {
        description: 'We will reply to your email.'
      });
    else toast.error('Quote not sent', { description: result.message });
  };
  const canSend =
    !sending &&
    name.trim().length >= 2 &&
    email.includes('@') &&
    goal.trim().length >= 10;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div
        ref={rootRef}
        className="grid gap-6 pb-24 lg:grid-cols-[1fr_0.82fr] lg:pb-0"
      >
        {builderOpen && (
          <button
            type="button"
            aria-label="Close project stepper"
            className="fixed inset-0 z-[105] bg-gradient-to-b from-transparent via-black/10 to-black/25 lg:hidden"
            onClick={() => setBuilderOpen(false)}
          />
        )}
        <section
          className={`${card} ${builderOpen ? 'adaptive-scrollbar fixed inset-x-3 bottom-3 z-[110] block max-h-[76dvh] overflow-y-auto rounded-[36px] p-5 shadow-2xl lg:static lg:max-h-none lg:overflow-visible lg:p-6 lg:shadow-sm' : 'hidden lg:block'}`}
          role={builderOpen ? 'dialog' : undefined}
          aria-modal={builderOpen ? 'true' : undefined}
          aria-label="Project quote builder"
        >
          <div className="mb-3 flex justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setBuilderOpen(false)}
              className="min-h-11 rounded-full border px-4 text-sm"
            >
              Close
            </button>
          </div>

          <nav aria-label="Quote request progress" className="mb-7">
            <ol className="grid grid-cols-2">
              {steps.map((stepLabel, index) => {
                const complete = index < step;
                const current = index === step;
                return (
                  <li className="relative min-w-0" key={stepLabel}>
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 right-1/2 top-5 h-px ${complete || current ? 'bg-primary' : 'bg-border'}`}
                      />
                    )}
                    {index < steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-1/2 right-0 top-5 h-px ${complete ? 'bg-primary' : 'bg-border'}`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setStep(index)}
                      aria-current={current ? 'step' : undefined}
                      className="relative flex w-full flex-col items-center gap-2 px-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span
                        className={`grid size-10 place-items-center rounded-full border text-sm font-semibold transition-colors duration-200 ${complete || current ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background/60 text-muted-foreground'}`}
                      >
                        {complete ? (
                          <Check aria-hidden="true" className="size-4" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span
                        className={`max-w-full text-[11px] leading-tight sm:text-sm ${current ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                      >
                        {stepLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {step === 0 && (
            <div className="space-y-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={label}>Estimate in</span>
                <div
                  role="group"
                  aria-label="Estimate currency"
                  className="grid w-44 grid-cols-2 rounded-full border border-border p-1"
                >
                  {(['USD', 'GHS'] as const).map((code) => (
                    <button
                      type="button"
                      key={code}
                      onClick={() => setCurrency(code)}
                      aria-pressed={currency === code}
                      className={`min-h-10 rounded-full text-sm transition-colors duration-200 ${currency === code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <fieldset>
                <legend className="font-medium">What are you building?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      aria-pressed={projectType === type}
                      className={`${chip} py-1.5 ${projectType === type ? chipOn : chipOff}`}
                    >
                      <span className="block">{type}</span>
                      <span className="block text-[11px] tabular-nums">
                        from {formatAmount(PROJECT_BASE_USD[type], currency)}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <ScopeReveal
                show={
                  !(['API or Integration', 'Mobile App'] as string[]).includes(
                    projectType
                  )
                }
              >
                <div className="flex items-center justify-between gap-4 rounded-3xl border border-border p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {projectType === 'Mobile App' ? 'Screens' : 'Pages'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {PAGES_INCLUDED} included. Each extra adds{' '}
                      {formatAmount(PAGE_USD, currency)}.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      aria-label="Remove a page"
                      disabled={pages <= 1}
                      onClick={() =>
                        setPages((count) => Math.max(1, count - 1))
                      }
                      className="grid size-11 place-items-center rounded-full border text-lg transition-colors duration-200 hover:bg-muted disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium tabular-nums">
                      {pages}
                    </span>
                    <button
                      type="button"
                      aria-label="Add a page"
                      disabled={pages >= 60}
                      onClick={() =>
                        setPages((count) => Math.min(60, count + 1))
                      }
                      className="grid size-11 place-items-center rounded-full border text-lg transition-colors duration-200 hover:bg-muted disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              </ScopeReveal>
              <fieldset>
                <legend className="font-medium">What should it include?</legend>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each feature comes with its essentials built in. Prices start
                  from the essentials.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {featureOptions.map((feature) => {
                    const selected = features.includes(feature);
                    return (
                      <button
                        type="button"
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        aria-pressed={selected}
                        className={`flex min-h-12 min-w-0 items-center gap-2.5 rounded-3xl border px-3 text-left text-sm transition-colors duration-200 ${selected ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-200 ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}
                        >
                          {selected && <Check className="size-3.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate">{feature}</span>
                          <span className="block text-xs tabular-nums text-muted-foreground">
                            from{' '}
                            {formatAmount(FEATURE_USD[feature] ?? 0, currency)}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <ScopeReveal show={registrationRequired}>
                <label
                  className={`flex cursor-pointer gap-3 rounded-3xl border p-4 transition-colors duration-200 ${registered ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/40'}`}
                >
                  <input
                    type="checkbox"
                    checked={registered}
                    onChange={(event) => {
                      setRegistered(event.target.checked);
                      if (event.target.checked)
                        toast.success('Registration noted', {
                          description: 'Onboarding support is not needed.'
                        });
                    }}
                    className="mt-1 size-4 shrink-0 accent-primary"
                  />
                  <span className="text-sm">
                    <span className="block font-medium">
                      I have a registered business
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Payment and SMS providers ask for one. If not, we add a
                      one-off onboarding support fee of{' '}
                      {formatAmount(ONBOARDING.usd, currency)} to help you
                      register.
                    </span>
                  </span>
                </label>
              </ScopeReveal>

              <ScopeReveal show={features.length > 0}>
                <fieldset className="space-y-3">
                  <legend className="font-medium">
                    Customise each feature{' '}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </legend>
                  <p className="text-sm text-muted-foreground">
                    Essentials are included at no extra cost. Add extras or
                    custom changes to adjust the price.
                  </p>
                  {features.map((feature) => (
                    <FeatureCustomiser
                      key={feature}
                      feature={feature}
                      currency={currency}
                      chosen={addons[feature] ?? []}
                      isCustom={custom.includes(feature)}
                      open={openFeatures[feature] ?? false}
                      onToggle={() =>
                        setOpenFeatures((current) => ({
                          ...current,
                          [feature]: !current[feature]
                        }))
                      }
                      onAddon={(label) => toggleAddon(feature, label)}
                      onCustom={() => toggleCustom(feature)}
                    />
                  ))}
                </fieldset>
              </ScopeReveal>

              <fieldset className="space-y-3">
                <legend className="font-medium">
                  Add extras{' '}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {visibleExtras.map((extra) => {
                    const on = extras.includes(extra.id);
                    return (
                      <label
                        key={extra.id}
                        className={`flex cursor-pointer gap-3 rounded-3xl border p-3 transition-colors duration-200 ${on ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/40'}`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleExtra(extra.id)}
                          className="mt-1 size-4 shrink-0 accent-primary"
                        />
                        <span className="min-w-0 text-sm">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="font-medium">{extra.label}</span>
                            <span className="shrink-0 text-xs tabular-nums">
                              +{formatAmount(extra.usd, currency)}
                            </span>
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {extra.note}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className={label}>
                    Target launch{' '}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </span>
                  <input
                    type="date"
                    min={today}
                    className={field}
                    value={timeline}
                    onChange={(event) => setTimeline(event.target.value)}
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className={label}>
                    Budget{' '}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </span>
                  <input
                    className={field}
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    placeholder="Your comfortable range"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm">
                <span className={label}>What should this project do?</span>
                <textarea
                  className={`${field} min-h-28`}
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  placeholder="For example, let clients book and pay for sessions online…"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className={label}>Name</span>
                  <input
                    autoComplete="name"
                    className={field}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className={label}>Reply email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    className={field}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <ReferenceManager
                references={references}
                setReferences={setReferences}
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyBrief}
                  className="min-h-11 rounded-full border px-5 text-sm transition-colors duration-200 hover:bg-muted"
                >
                  Copy brief
                </button>
                <button
                  type="button"
                  disabled={!canSend}
                  onClick={send}
                  className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity duration-200 disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send quote request'}
                </button>
              </div>
              {!canSend && !sending && (
                <p className="text-xs text-muted-foreground">
                  Add your name, a reply email and a goal of at least 10
                  characters to send.
                </p>
              )}
              {status && (
                <p role="status" aria-live="polite" className="text-sm">
                  {status}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between border-t pt-5">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="min-h-11 rounded-full border px-5 text-sm transition-colors duration-200 hover:bg-muted disabled:opacity-50"
            >
              Back
            </button>
            {step < steps.length - 1 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="min-h-11 rounded-full bg-primary px-5 text-sm text-primary-foreground"
              >
                Continue
              </button>
            )}
          </div>
        </section>

        <aside
          className={`${card} h-fit lg:sticky lg:top-28`}
          aria-live="polite"
        >
          <h2 className="text-lg font-medium">Scope preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A live sketch of your scope and estimate.
          </p>
          <ScopeFrame
            projectType={projectType}
            title={projectType}
            features={features}
          />
          <SelectedScope
            projectType={projectType}
            features={features}
            addons={addons}
            custom={custom}
            extras={extras}
            registered={registered}
            pages={pages}
            currency={currency}
          />
        </aside>

        {mounted &&
          createPortal(
            <>
              {!builderOpen && (
                <button
                  ref={barRef}
                  type="button"
                  className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-[90] flex min-h-14 items-center justify-between rounded-full border border-border bg-background px-5 text-left text-sm font-medium shadow-xl lg:hidden"
                  onClick={() => setBuilderOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={builderOpen}
                >
                  <span>{steps[step]}</span>
                  <span className="text-muted-foreground">
                    Step {step + 1} of {steps.length} · Open
                  </span>
                </button>
              )}
            </>,
            document.body
          )}
      </div>
    </>
  );
}
