'use client';

import { useMemo, type ComponentType } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants
} from 'motion/react';
import {
  Bell,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Plug,
  Repeat,
  type LucideIcon
} from 'lucide-react';

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

function makeVariants(reduced: boolean) {
  const card: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 6,
      scale: reduced ? 1 : 0.96,
      transition: { duration: 0.22, ease: EASE }
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.32,
        ease: EASE,
        staggerChildren: reduced ? 0 : 0.05,
        delayChildren: reduced ? 0 : 0.08
      }
    }
  };
  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 4,
      transition: { duration: 0.2, ease: EASE }
    },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } }
  };
  const bar: Variants = {
    hidden: {
      opacity: 0,
      scaleY: reduced ? 1 : 0.3,
      transition: { duration: 0.2, ease: EASE }
    },
    show: (index: number) => ({
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.32,
        ease: EASE,
        delay: reduced ? 0 : index * 0.05
      }
    })
  };
  const line: Variants = {
    hidden: {
      scaleX: reduced ? 1 : 0,
      transition: { duration: 0.2, ease: EASE }
    },
    show: {
      scaleX: 1,
      transition: { duration: 0.36, ease: EASE, delay: reduced ? 0 : 0.12 }
    }
  };
  return { card, item, bar, line };
}

type Variantset = ReturnType<typeof makeVariants>;
type BodyProps = { v: Variantset };

function AuthBody({ v }: BodyProps) {
  return (
    <>
      <motion.span
        variants={v.item}
        className="block h-6 rounded-md border border-border bg-muted/40"
      />
      <motion.span
        variants={v.item}
        className="block h-6 rounded-md border border-border bg-muted/40"
      />
      <motion.span
        variants={v.item}
        className="grid h-6 place-items-center rounded-md bg-primary text-[10px] font-medium text-primary-foreground"
      >
        Sign in
      </motion.span>
    </>
  );
}

function PaymentsBody({ v }: BodyProps) {
  return (
    <>
      <motion.span
        variants={v.item}
        className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground"
      >
        <span className="truncate">•••• 4242</span>
        <span className="tabular-nums">$1,240</span>
      </motion.span>
      <motion.span
        variants={v.item}
        className="grid h-6 place-items-center rounded-md bg-primary text-[10px] font-medium text-primary-foreground"
      >
        Pay securely
      </motion.span>
    </>
  );
}

function SubscriptionsBody({ v }: BodyProps) {
  return (
    <motion.span
      variants={v.item}
      className="grid grid-cols-2 rounded-full border border-border p-0.5 text-center text-[10px]"
    >
      <span className="rounded-full bg-foreground py-1 text-background">
        Monthly
      </span>
      <span className="py-1 text-muted-foreground">Annual</span>
    </motion.span>
  );
}

function DashboardBody({ v }: BodyProps) {
  return (
    <motion.span variants={v.item} className="flex h-12 items-end gap-1.5">
      {[40, 70, 55, 90, 65].map((height, index) => (
        <motion.span
          key={height}
          custom={index}
          variants={v.bar}
          style={{ height: `${height}%` }}
          className="block flex-1 origin-bottom rounded-t-sm bg-primary/70"
        />
      ))}
    </motion.span>
  );
}

function NotificationsBody({ v }: BodyProps) {
  return (
    <>
      <motion.span
        variants={v.item}
        className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[10px]"
      >
        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
        <span className="truncate">New alert</span>
      </motion.span>
      <motion.span
        variants={v.item}
        className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[10px] text-muted-foreground"
      >
        <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
        <span className="truncate">Payment received</span>
      </motion.span>
    </>
  );
}

function IntegrationsBody({ v }: BodyProps) {
  return (
    <motion.span
      variants={v.item}
      className="flex items-center gap-1.5 text-[9px]"
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border">
        App
      </span>
      <motion.span
        variants={v.line}
        className="block h-px flex-1 origin-left bg-foreground/40"
      />
      <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border">
        API
      </span>
    </motion.span>
  );
}

export const featureVisuals: Record<
  string,
  { icon: LucideIcon; label: string; Body: ComponentType<BodyProps> }
> = {
  Authentication: { icon: KeyRound, label: 'Sign in', Body: AuthBody },
  Payments: { icon: CreditCard, label: 'Checkout', Body: PaymentsBody },
  Subscriptions: { icon: Repeat, label: 'Plans', Body: SubscriptionsBody },
  Dashboard: { icon: LayoutDashboard, label: 'Analytics', Body: DashboardBody },
  Notifications: { icon: Bell, label: 'Alerts', Body: NotificationsBody },
  'Third-party integrations': {
    icon: Plug,
    label: 'Integrations',
    Body: IntegrationsBody
  }
};

export function FeatureGrid({
  features,
  columns = 2
}: {
  features: string[];
  columns?: 1 | 2;
}) {
  const reduced = useReducedMotion() ?? false;
  const v = useMemo(() => makeVariants(reduced), [reduced]);
  const exitTransition = { duration: 0.22, ease: EASE };

  return (
    <div aria-hidden="true">
      <AnimatePresence>
        {features.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: exitTransition }}
            className="py-8 text-center text-xs text-muted-foreground"
          >
            Choose features to preview the scope
          </motion.p>
        )}
      </AnimatePresence>
      <ul
        className={
          columns === 1 ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-2 gap-2'
        }
      >
        <AnimatePresence initial={false}>
          {features.map((feature) => {
            const visual = featureVisuals[feature];
            if (!visual) return null;
            const { icon: Icon, label, Body } = visual;
            return (
              <motion.li
                key={feature}
                data-key={feature}
                layout
                transition={{
                  layout: {
                    type: 'spring',
                    stiffness: 180,
                    damping: 30,
                    mass: 1
                  }
                }}
                variants={v.card}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="min-w-0 rounded-xl border border-border bg-background/60 p-2.5 text-left"
              >
                <motion.span
                  variants={v.item}
                  className="flex min-w-0 items-center gap-1.5 text-[11px] font-medium"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted-foreground"
                  />
                  <span className="truncate">{label}</span>
                </motion.span>
                <div className="mt-2 min-w-0 space-y-1.5">
                  <Body v={v} />
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
