// Indicative quote range and timeline. Figures are USD planning inputs; GHS is derived with GHS_PER_USD.
// Update the constants below when the rate card changes. The final price and timeline are confirmed after the brief is reviewed.

export const PROJECT_BASE_USD: Record<string, number> = {
  Website: 250,
  'Web App': 450,
  'Mobile App': 775,
  'API or Integration': 500,
  Other: 350
};

/** Base build time in weeks for each platform, before any feature work. */
export const PROJECT_BASE_WEEKS: Record<string, number> = {
  Website: 1,
  'Web App': 3,
  'Mobile App': 4,
  'API or Integration': 2,
  Other: 2
};

export type Addon = { label: string; usd: number; weeks: number };
export type FeatureSpec = { included: string[]; addons: Addon[] };

/**
 * Each feature ships with its `included` defaults at the base price (no extra cost).
 * `addons` are optional extras that add price and time.
 */
export const FEATURE_SPECS: Record<string, FeatureSpec> = {
  Authentication: {
    included: [
      'Email and password sign-in',
      'Password reset and forgot-password flow',
      'Secure session handling'
    ],
    addons: [
      { label: 'Social sign-in', usd: 125, weeks: 0.5 },
      { label: 'Roles and permissions', usd: 175, weeks: 0.75 },
      { label: 'Two-factor authentication', usd: 150, weeks: 0.5 }
    ]
  },
  Payments: {
    included: [
      'Card checkout',
      'Payment confirmation emails',
      'Test and live mode setup'
    ],
    addons: [
      { label: 'Mobile in-app purchases', usd: 325, weeks: 1.5 },
      { label: 'Refunds and disputes tools', usd: 150, weeks: 0.5 },
      { label: 'Multi-currency checkout', usd: 225, weeks: 0.75 }
    ]
  },
  Subscriptions: {
    included: ['Monthly and annual billing', 'Cancel and renew handling'],
    addons: [
      { label: 'Plan upgrades and downgrades', usd: 150, weeks: 0.5 },
      { label: 'Free trial', usd: 100, weeks: 0.25 },
      { label: 'Usage-based billing', usd: 250, weeks: 1 }
    ]
  },
  Dashboard: {
    included: ['Overview with key metrics', 'Responsive layout'],
    addons: [
      { label: 'Admin tools', usd: 225, weeks: 1 },
      { label: 'Customer workspace', usd: 250, weeks: 1 },
      { label: 'Exports as CSV or PDF', usd: 125, weeks: 0.5 }
    ]
  },
  Notifications: {
    included: ['Transactional email alerts'],
    addons: [
      { label: 'Push notifications', usd: 100, weeks: 0.5 },
      { label: 'SMS', usd: 100, weeks: 0.5 },
      { label: 'In-app notification centre', usd: 100, weeks: 0.5 }
    ]
  },
  'Third-party integrations': {
    included: ['One connected service'],
    addons: [
      { label: 'Payment provider', usd: 125, weeks: 0.5 },
      { label: 'Maps or location', usd: 125, weeks: 0.5 },
      { label: 'Extra external API', usd: 150, weeks: 0.75 }
    ]
  }
};

/** Price and build time of each feature's included defaults. */
export const FEATURE_USD: Record<string, number> = {
  Authentication: 150,
  Payments: 225,
  Subscriptions: 175,
  Dashboard: 525,
  Notifications: 75,
  'Third-party integrations': 150
};

export const FEATURE_WEEKS: Record<string, number> = {
  Authentication: 1.5,
  Payments: 2,
  Subscriptions: 2,
  Dashboard: 2.5,
  Notifications: 1,
  'Third-party integrations': 1.5
};

/** Optional one-off extras that are not tied to a feature. */
export type Extra = {
  id: string;
  label: string;
  usd: number;
  weeks: number;
  appliesTo?: string[];
  note: string;
};
export const EXTRAS: Extra[] = [
  {
    id: 'hosting',
    label: 'Hosting and domain setup',
    usd: 75,
    weeks: 0.25,
    note: 'Yearly hosting and domain renewals are billed by the provider.'
  },
  {
    id: 'support',
    label: 'Three months of support',
    usd: 125,
    weeks: 0,
    note: 'Bug fixes and small updates after launch.'
  },
  {
    id: 'content',
    label: 'Content and copywriting',
    usd: 125,
    weeks: 0.75,
    note: 'We write page copy from your brief.'
  },
  {
    id: 'migration',
    label: 'Data migration',
    usd: 125,
    weeks: 0.5,
    note: 'Moving existing customers or records into the new system.'
  },
  {
    id: 'store',
    label: 'App store submission',
    usd: 100,
    weeks: 0.5,
    appliesTo: ['Mobile App'],
    note: 'Store fees are paid by you directly to Apple and Google.'
  }
];

/** Pages (or screens) included in the platform price. Each page above this adds to the price and build time. */
export const PAGES_INCLUDED = 5;
export const PAGE_USD = 30;
export const PAGE_WEEKS = 0.25;

/** Set up once when a payment or SMS provider needs a registered business and none is registered yet. */
export const ONBOARDING = { usd: 100, weeks: 0.5 };

/** Billed by providers, shown for transparency and never added to the total. */
export const PASS_THROUGH: {
  label: string;
  detail: string;
  mobileOnly?: boolean;
}[] = [
  {
    label: 'Hosting and domain',
    detail: 'Roughly GH₵200–1,500 a year, depending on traffic and provider.'
  },
  {
    label: 'SMS messages',
    detail:
      'About GH₵0.03 per message on common bundles. Check the provider’s current rate.'
  },
  {
    label: 'Payment gateway fees',
    detail:
      'A percentage of each card or mobile money transaction, charged by the provider.'
  },
  {
    label: 'Apple and Google developer accounts',
    detail: 'Apple US$99 a year. Google Play US$25 once.',
    mobileOnly: true
  }
];

/** Payments and SMS need a registered business to activate with providers. */
export const needsRegistration = (
  features: string[],
  addons: Record<string, string[]>
) =>
  features.includes('Payments') ||
  (features.includes('Notifications') &&
    (addons.Notifications ?? []).includes('SMS'));

/** Each extra add-on on the same feature multiplies the add-on cost by this step (2 add-ons → ×1.10, 3 → ×1.20). */
export const ADDON_STEP = 0.1;
/** Custom changes to a feature's standard setup bump that feature's price and time. */
export const CUSTOM_BUMP = 0.15;
export const CUSTOM_WEEKS = 1;
/** Each extra feature adds this share to price and time, for integration work between parts. */
export const COMPLEXITY_STEP = 0.05;
/** Lower bound is this share below the midpoint. */
export const LOW_DISCOUNT = 0.1;
/** Upper bound is midpoint + UNSURE_STEP per feature with no add-on or custom decision, capped at UNSURE_CAP. */
export const UNSURE_BASE = 0.15;
export const UNSURE_STEP = 0.05;
export const UNSURE_CAP = 0.35;
/** FX rate used to convert USD to GHS. Bank of Ghana interbank, about 11.65 in mid-November 2026. Update before sending quotes. */
export const GHS_PER_USD = 11.65;

const roundTo = (value: number, step: number) =>
  Math.round(value / step) * step;

export const addonMultiplier = (count: number) =>
  count > 1 ? 1 + ADDON_STEP * (count - 1) : 1;

export type EstimateInput = {
  projectType: string;
  features: string[];
  /** Selected add-on labels per feature. Included defaults are always on and never listed here. */
  addons: Record<string, string[]>;
  /** Features with custom changes to their standard setup. */
  custom: string[];
  /** Ids from EXTRAS the user picked. */
  extras?: string[];
  /** Whether the user has a registered business. Only matters when payments or SMS are included. */
  registered?: boolean;
  /** Total pages or screens. The API platform has none. */
  pages?: number;
};

export type FeatureLine = {
  name: string;
  usd: number;
  weeks: number;
  included: string[];
  addons: string[];
  custom: boolean;
  multiplier: number;
  /** USD split of the feature price, before the combined-work adjustment. */
  essentialsUsd: number;
  addonsUsd: number;
  customUsd: number;
};

export type Estimate = {
  base: { usd: number; weeks: number };
  features: FeatureLine[];
  extras: { label: string; usd: number; weeks: number }[];
  onboarding: { usd: number; weeks: number } | null;
  pages: { count: number; extra: number; usd: number; weeks: number };
  /** Combined-work adjustment in USD, and its share of the subtotal. */
  overhead: { usd: number; share: number };
  usd: [number, number];
  ghs: [number, number];
  weeks: [number, number];
};

/**
 * Formula
 *   included(f)  = FEATURE_USD(f)                                     (weeks: FEATURE_WEEKS(f))
 *   addons(f)    = Σ addon usd × addonMultiplier(count)               (weeks: Σ addon weeks × addonMultiplier(count))
 *   feature(f)   = (included + addons) × (1 + CUSTOM_BUMP if custom)  (weeks: + CUSTOM_WEEKS if custom)
 *   subtotal     = base(projectType) + Σ feature(f)
 *   share        = COMPLEXITY_STEP × (features − 1)
 *   midpoint     = subtotal × (1 + share) + Σ extras + onboarding     (weeks use the same share; extras add weeks)
 *   unsure       = features with no add-on and no custom decision
 *   spread       = min(UNSURE_CAP, UNSURE_BASE + UNSURE_STEP × unsure)
 *   low          = midpoint × (1 − LOW_DISCOUNT)
 *   high         = midpoint × (1 + spread)
 * USD rounds to the nearest 50, GHS to the nearest 500 after conversion. Weeks round up to whole weeks.
 */
export function buildEstimate({
  projectType,
  features,
  addons,
  custom,
  extras = [],
  registered = false,
  pages = PAGES_INCLUDED
}: EstimateInput): Estimate | null {
  const base = {
    usd: PROJECT_BASE_USD[projectType] ?? PROJECT_BASE_USD.Other,
    weeks: PROJECT_BASE_WEEKS[projectType] ?? PROJECT_BASE_WEEKS.Other
  };
  const lines: FeatureLine[] = features.map((name) => {
    const spec = FEATURE_SPECS[name];
    const chosen = (addons[name] ?? []).filter((label) =>
      spec?.addons.some((addon) => addon.label === label)
    );
    const picked =
      spec?.addons.filter((addon) => chosen.includes(addon.label)) ?? [];
    const multiplier = addonMultiplier(picked.length);
    const addonUsd =
      picked.reduce((sum, addon) => sum + addon.usd, 0) * multiplier;
    const addonWeeks =
      picked.reduce((sum, addon) => sum + addon.weeks, 0) * multiplier;
    const isCustom = custom.includes(name);
    const essentialsUsd = FEATURE_USD[name] ?? 0;
    const customUsd = isCustom ? (essentialsUsd + addonUsd) * CUSTOM_BUMP : 0;
    return {
      name,
      usd: essentialsUsd + addonUsd + customUsd,
      weeks:
        (FEATURE_WEEKS[name] ?? 1) + addonWeeks + (isCustom ? CUSTOM_WEEKS : 0),
      included: spec?.included ?? [],
      addons: chosen,
      custom: isCustom,
      multiplier,
      essentialsUsd,
      addonsUsd: addonUsd,
      customUsd
    };
  });
  const extraLines = EXTRAS.filter(
    (extra) =>
      extras.includes(extra.id) &&
      (!extra.appliesTo || extra.appliesTo.includes(projectType))
  ).map((extra) => ({
    label: extra.label,
    usd: extra.usd,
    weeks: extra.weeks
  }));
  const onboarding =
    needsRegistration(features, addons) && !registered ? ONBOARDING : null;

  const subtotalUsd = base.usd + lines.reduce((sum, line) => sum + line.usd, 0);
  const subtotalWeeks =
    base.weeks + lines.reduce((sum, line) => sum + line.weeks, 0);
  const share = COMPLEXITY_STEP * Math.max(0, features.length - 1);
  const combinedUsd = subtotalUsd * share;
  const pageCount =
    projectType === 'API or Integration' || projectType === 'Mobile App'
      ? 0
      : pages;
  const extraPages = Math.max(0, pageCount - PAGES_INCLUDED);
  const pagesUsd = extraPages * PAGE_USD;
  const pagesWeeks = extraPages * PAGE_WEEKS;
  const extrasUsd =
    extraLines.reduce((sum, line) => sum + line.usd, 0) +
    (onboarding?.usd ?? 0) +
    pagesUsd;
  const extrasWeeks =
    extraLines.reduce((sum, line) => sum + line.weeks, 0) +
    (onboarding?.weeks ?? 0) +
    pagesWeeks;
  const midUsd = subtotalUsd + combinedUsd + extrasUsd;
  const midWeeks = subtotalWeeks * (1 + share) + extrasWeeks;
  const unsure = lines.filter(
    (line) => line.addons.length === 0 && !line.custom
  ).length;
  const spread = Math.min(UNSURE_CAP, UNSURE_BASE + UNSURE_STEP * unsure);
  const lowUsd = roundTo(midUsd * (1 - LOW_DISCOUNT), 50);
  const highUsd = roundTo(midUsd * (1 + spread), 50);
  return {
    base,
    features: lines,
    extras: extraLines,
    onboarding,
    pages: {
      count: pageCount,
      extra: extraPages,
      usd: pagesUsd,
      weeks: pagesWeeks
    },
    overhead: { usd: combinedUsd, share },
    usd: [lowUsd, highUsd],
    ghs: [
      roundTo(lowUsd * GHS_PER_USD, 500),
      roundTo(highUsd * GHS_PER_USD, 500)
    ],
    weeks: [
      Math.max(1, Math.ceil(midWeeks * (1 - LOW_DISCOUNT))),
      Math.max(1, Math.ceil(midWeeks * (1 + spread)))
    ]
  };
}

const formatterFor = (currency: 'USD' | 'GHS') =>
  new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-GH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });

/** Formats one USD amount in the chosen currency, rounded to a clean figure for display. */
export function formatAmount(usd: number, currency: 'USD' | 'GHS') {
  const value =
    currency === 'USD' ? roundTo(usd, 10) : roundTo(usd * GHS_PER_USD, 100);
  return formatterFor(currency).format(value);
}

export function formatRange(
  estimate: Pick<Estimate, 'usd' | 'ghs'>,
  currency: 'USD' | 'GHS'
) {
  const [low, high] = currency === 'USD' ? estimate.usd : estimate.ghs;
  const formatter = formatterFor(currency);
  return `${formatter.format(low)} – ${formatter.format(high)}`;
}

/** Per-feature weeks, e.g. 1.5 → "1.5 wk". */
export const formatLineWeeks = (weeks: number) =>
  `${Number(weeks.toFixed(2))} wk`;

export function formatWeeks([low, high]: [number, number]) {
  return low === high
    ? `${low} ${low === 1 ? 'week' : 'weeks'}`
    : `${low}–${high} weeks`;
}

/** Share of the total paid at kickoff. The rest is spread evenly across the build months. */
export const DEPOSIT_SHARE = 0.3;

/**
 * Monthly split
 *   months   = ceil(average weeks ÷ 4.33), at least 1
 *   deposit  = usd range × DEPOSIT_SHARE
 *   monthly  = usd range × (1 − DEPOSIT_SHARE) ÷ months
 */
export function paymentPlan(estimate: Pick<Estimate, 'usd' | 'weeks'>) {
  const averageWeeks = (estimate.weeks[0] + estimate.weeks[1]) / 2;
  const months = Math.max(1, Math.ceil(averageWeeks / 4.33));
  const [low, high] = estimate.usd;
  return {
    months,
    deposit: [
      roundTo(low * DEPOSIT_SHARE, 10),
      roundTo(high * DEPOSIT_SHARE, 10)
    ] as [number, number],
    monthly: [
      roundTo((low * (1 - DEPOSIT_SHARE)) / months, 10),
      roundTo((high * (1 - DEPOSIT_SHARE)) / months, 10)
    ] as [number, number]
  };
}

/** Month-by-month schedule: the kickoff deposit, then one row per build month. Ranges are in USD. */
export function paymentSchedule(estimate: Pick<Estimate, 'usd' | 'weeks'>) {
  const plan = paymentPlan(estimate);
  return [
    {
      label: `Kickoff deposit (${Math.round(DEPOSIT_SHARE * 100)}%)`,
      usd: plan.deposit
    },
    ...Array.from({ length: plan.months }, (_, index) => ({
      label: `Month ${index + 1}`,
      usd: plan.monthly
    }))
  ];
}

/** Formats a USD range (already in USD) in the chosen currency. */
export const formatUsdRange = (
  [low, high]: [number, number],
  currency: 'USD' | 'GHS'
) => `${formatAmount(low, currency)} – ${formatAmount(high, currency)}`;

/** Formats a yyyy-mm-dd date-input value for people to read. */
export function formatDate(value: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
