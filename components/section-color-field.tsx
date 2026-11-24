'use client';

import { useEffect, useRef } from 'react';

type RGB = [number, number, number];

const colors: Record<'light' | 'dark', Record<string, RGB>> = {
  light: {
    sky: [255, 255, 255],
    amber: [253, 243, 227],
    lavender: [245, 240, 250],
    mint: [233, 246, 240],
    rose: [252, 238, 237],
    aqua: [232, 247, 247],
    gold: [250, 245, 219],
    navy: [23, 39, 69],
    charcoal: [31, 33, 38],
    'deep-blue': [0, 0, 0]
  },
  dark: {
    sky: [0, 0, 0],
    amber: [43, 33, 23],
    lavender: [36, 27, 45],
    mint: [24, 42, 36],
    rose: [45, 27, 30],
    aqua: [23, 40, 43],
    gold: [42, 37, 24],
    navy: [23, 39, 69],
    charcoal: [31, 33, 38],
    'deep-blue': [0, 0, 0]
  }
};

function blend(from: RGB, to: RGB, amount: number): RGB {
  return from.map((channel, index) =>
    Math.round(channel + (to[index] - channel) * amount)
  ) as RGB;
}

function easeInOut(amount: number) {
  const progress = Math.min(1, Math.max(0, amount));
  return progress * progress * (3 - 2 * progress);
}

function relativeLuminance([red, green, blue]: RGB) {
  const linear = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function toHsl([red, green, blue]: RGB) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return `${Math.round(hue)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}

export default function SectionColorField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const palette = document.documentElement.classList.contains('dark')
          ? colors.dark
          : colors.light;
        const viewportHeight = window.innerHeight;
        const stops = Array.from(
          document.querySelectorAll<HTMLElement>('[data-section-color-anchor]')
        )
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const tone = element.dataset.sectionColorAnchor ?? '';
            const color = palette[tone];
            const heading = element.querySelector<HTMLElement>('h1, h2, h3');
            const headingTop = heading?.getBoundingClientRect().top;
            const triggerTop =
              element.dataset.sectionColorAnchorEarly === 'true'
                ? rect.top + rect.height * 0.22
                : headingTop ?? rect.top;
            return color
              ? {
                  triggerTop,
                  color
                }
              : null;
          })
          .filter((stop): stop is { triggerTop: number; color: RGB } => !!stop)
          .sort((a, b) => a.triggerTop - b.triggerTop);

        if (!stops.length) return;

        let color = stops[0].color;

        for (let index = 1; index < stops.length; index += 1) {
          const next = stops[index];
          if (next.triggerTop > viewportHeight) break;

          const transitionRange = Math.max(1, viewportHeight / 2);
          const progress = easeInOut(
            (viewportHeight - next.triggerTop) / transitionRange
          );
          color = blend(stops[index - 1].color, next.color, progress);

          if (progress < 1) {
            break;
          }
        }

        const foreground =
          relativeLuminance(color) < 0.179 ? '0 0% 100%' : '0 0% 0%';
        const primaryForeground =
          relativeLuminance(color) < 0.179 ? '0 0% 0%' : '0 0% 100%';
        const surfaceProgress = easeInOut(
          (0.24 - relativeLuminance(color)) / (0.24 - 0.12)
        );
        const cardColor = blend(
          blend(color, [0, 0, 0], 0.075),
          blend(color, [255, 255, 255], 0.075),
          surfaceProgress
        );
        const mutedColor = blend(
          blend(color, [0, 0, 0], 0.16),
          blend(color, [255, 255, 255], 0.16),
          surfaceProgress
        );
        const borderColor = blend(
          blend(color, [0, 0, 0], 0.14),
          blend(color, [255, 255, 255], 0.4),
          surfaceProgress
        );
        const scope = field.parentElement;

        field.style.backgroundColor = `rgb(${color.join(' ')})`;
        const scrollBackground = toHsl(color);
        const scrollCard = toHsl(cardColor);
        const scrollMuted = toHsl(mutedColor);
        const scrollBorder = toHsl(borderColor);
        scope?.style.setProperty('--scroll-background', scrollBackground);
        scope?.style.setProperty('--scroll-card', scrollCard);
        scope?.style.setProperty('--scroll-muted', scrollMuted);
        scope?.style.setProperty('--scroll-border', scrollBorder);
        scope?.style.setProperty('--scroll-foreground', foreground);
        document.documentElement.style.setProperty(
          '--scroll-background',
          scrollBackground
        );
        document.documentElement.style.setProperty('--scroll-card', scrollCard);
        document.documentElement.style.setProperty(
          '--scroll-muted',
          scrollMuted
        );
        document.documentElement.style.setProperty(
          '--scroll-border',
          scrollBorder
        );
        document.documentElement.style.setProperty(
          '--scroll-foreground',
          foreground
        );
        scope?.style.setProperty(
          '--scroll-primary-foreground',
          primaryForeground
        );
      });
    };

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    const resizeObserver = new ResizeObserver(update);
    document
      .querySelectorAll<HTMLElement>('[data-section-color-anchor]')
      .forEach((section) => resizeObserver.observe(section));

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={fieldRef} aria-hidden="true" className="section-color-field" />
  );
}
