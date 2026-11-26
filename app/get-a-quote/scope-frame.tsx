'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Database, Monitor, Server, type LucideIcon } from 'lucide-react';
import { FeatureGrid } from './scope-visuals';

// One curve and one duration for every property, so the whole frame moves as a single object.
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const DURATION = 0.75;

type Platform = 'window' | 'phone' | 'api';
type Target = { key: string } | null;

const platformFor = (projectType: string): Platform =>
  projectType === 'Mobile App'
    ? 'phone'
    : projectType === 'API or Integration'
      ? 'api'
      : 'window';

type Mode = {
  radius: number;
  frame: number;
  bezel: number;
  windowBar: number;
  phoneBar: number;
  diagram: number;
  diagramHeight: number;
  pane: {
    top: number;
    left: number;
    right: number;
    bottom: number;
    radius: number;
    border: number;
  };
};

// Each platform is a set of values for the same persistent elements. Switching platform animates these values,
// so the frame resizes and reshapes in place instead of swapping one element for another.
const MODES: Record<Platform, Mode> = {
  window: {
    radius: 18,
    frame: 1,
    bezel: 0,
    windowBar: 1,
    phoneBar: 0,
    diagram: 0,
    diagramHeight: 0,
    pane: { top: 40, left: 12, right: 12, bottom: 12, radius: 12, border: 1 }
  },
  phone: {
    radius: 46,
    frame: 0,
    bezel: 1,
    windowBar: 0,
    phoneBar: 1,
    diagram: 0,
    diagramHeight: 0,
    pane: { top: 68, left: 10, right: 10, bottom: 10, radius: 30, border: 0 }
  },
  api: {
    radius: 18,
    frame: 0,
    bezel: 0,
    windowBar: 0,
    phoneBar: 0,
    diagram: 1,
    diagramHeight: 64,
    pane: { top: 76, left: 12, right: 12, bottom: 12, radius: 16, border: 1 }
  }
};

const sizes: Record<Platform, string> = {
  window: 'w-full aspect-[16/9]',
  api: 'w-full aspect-[16/9]',
  phone: 'w-[260px] h-[520px]'
};

// Scrollable pane: the feature grid scrolls inside, fades out at the bottom while more content is below,
// and brings a newly added feature into view.
function ScrollPane({
  features,
  target,
  reduced,
  columns
}: {
  features: string[];
  target: Target;
  reduced: boolean;
  columns: 1 | 2;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  const update = () => {
    const el = ref.current;
    if (el) setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const node = el.querySelector<HTMLElement>(
      `[data-key="${CSS.escape(target.key)}"]`
    );
    if (!node) return;
    const bottom = node.offsetTop + node.offsetHeight;
    if (bottom <= el.scrollTop + el.clientHeight) return;
    el.scrollTo({
      top: bottom - el.clientHeight + 8,
      behavior: reduced ? 'auto' : 'smooth'
    });
  }, [target, reduced]);

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={ref}
        onScroll={update}
        className="adaptive-scrollbar absolute inset-0 overflow-y-auto overscroll-contain"
      >
        <div className="p-3 pb-12">
          <FeatureGrid features={features} columns={columns} />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/70 to-transparent transition-opacity duration-200 ${more ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

function ConnectionLine({
  label,
  reduced
}: {
  label: string;
  reduced: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <span className="text-[9px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="relative block h-px w-full overflow-hidden bg-border">
        {!reduced && (
          <motion.span
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              duration: 1.6,
              ease: EASE,
              repeat: Infinity,
              repeatDelay: 0.4
            }}
          />
        )}
      </span>
    </div>
  );
}

function ApiNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-2.5 py-1.5">
      <Icon aria-hidden="true" className="size-3.5 text-muted-foreground" />
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

export function ScopeFrame({
  projectType,
  title,
  features
}: {
  projectType: string;
  title: string;
  features: string[];
}) {
  const reduced = useReducedMotion() ?? false;
  const platform = platformFor(projectType);
  const mode = MODES[platform];
  const [target, setTarget] = useState<Target>(null);
  const count = useRef(features.length);

  useEffect(() => {
    if (features.length > count.current)
      setTarget({ key: features[features.length - 1] });
    count.current = features.length;
  }, [features]);

  // Spring: the frame carries its velocity into each landing, with only a slight settle.
  const tween = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 180, damping: 30, mass: 1 };
  const pane = (
    <ScrollPane
      features={features}
      target={target}
      reduced={reduced}
      columns={platform === 'phone' ? 1 : 2}
    />
  );

  return (
    <motion.div
      layout="size"
      transition={tween}
      animate={{ borderRadius: mode.radius }}
      className={`relative mx-auto mt-6 overflow-hidden ${sizes[platform]}`}
    >
      {/* Window chrome: a border and tint that fade out as the frame becomes a phone or a diagram. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-[18px] border-2 border-foreground/70 bg-muted/50"
        animate={{ opacity: mode.frame }}
        transition={tween}
      />

      {/* Phone bezel and screen. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-[46px] bg-foreground/90"
        animate={{ opacity: mode.bezel }}
        transition={tween}
      >
        <i className="absolute -left-[3px] top-24 h-7 w-[3px] rounded-l bg-foreground/80" />
        <i className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-foreground/80" />
        <i className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-foreground/80" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-[10px] rounded-[36px] bg-card"
        animate={{ opacity: mode.bezel }}
        transition={tween}
      />

      {/* Window title bar. */}
      <motion.div
        className="absolute inset-x-0 top-0 flex h-10 items-center gap-1.5 px-4"
        animate={{ opacity: mode.windowBar }}
        transition={tween}
      >
        <i
          aria-hidden="true"
          className="size-2 rounded-full bg-muted-foreground/60"
        />
        <i
          aria-hidden="true"
          className="size-2 rounded-full bg-muted-foreground/60"
        />
        <i
          aria-hidden="true"
          className="size-2 rounded-full bg-muted-foreground/60"
        />
        <span className="ml-2 truncate text-xs">{title}</span>
      </motion.div>

      {/* Phone status bar, dynamic island and title. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[58px]"
        animate={{ opacity: mode.phoneBar }}
        transition={tween}
      >
        <span className="absolute left-7 top-[22px] text-[11px] font-medium tabular-nums">
          9:41
        </span>
        <i className="absolute right-7 top-[24px] h-2.5 w-5 rounded-sm border border-foreground/60" />
        <div className="absolute left-1/2 top-[18px] h-6 w-20 -translate-x-1/2 rounded-full bg-foreground" />
        <span className="absolute left-7 top-[48px] truncate text-xs font-medium">
          {title}
        </span>
      </motion.div>

      {/* API diagram: database, API and frontend, with a live connection line. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 overflow-hidden"
        animate={{ opacity: mode.diagram, height: mode.diagramHeight }}
        transition={tween}
      >
        <div className="flex h-full items-center gap-2 px-3">
          <ApiNode icon={Database} label="Database" />
          <ConnectionLine label="SQL" reduced={reduced} />
          <ApiNode icon={Server} label="API" />
          <ConnectionLine label="REST" reduced={reduced} />
          <ApiNode icon={Monitor} label="Frontend" />
        </div>
      </motion.div>

      {/* The one persistent pane. Its insets, corners and border morph with the platform. */}
      <motion.div
        className="absolute flex flex-col overflow-hidden border-solid border-border bg-card"
        style={{ contain: 'layout paint' }}
        animate={{
          top: mode.pane.top,
          left: mode.pane.left,
          right: mode.pane.right,
          bottom: mode.pane.bottom,
          borderRadius: mode.pane.radius,
          borderWidth: mode.pane.border
        }}
        transition={tween}
      >
        {pane}
      </motion.div>
    </motion.div>
  );
}
