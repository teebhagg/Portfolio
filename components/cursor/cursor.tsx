'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

type Point = { x: number; y: number };

const desktopPointerQuery = '(any-hover: hover) and (any-pointer: fine)';

function CursorShape() {
  return (
    <svg
      aria-hidden="true"
      className={styles.cursorShape}
      fill="none"
      viewBox="0 0 50 54"
    >
      <path
        className={styles.cursorShadow}
        d="M42.68 41.15 27.51 6.8c-.78-1.77-3.3-1.77-4.12 0L7.6 41.15c-.84 1.83.93 3.74 2.81 3.05l13.97-5.15a2.2 2.2 0 0 1 1.57 0l13.87 5.15c1.87.69 3.68-1.22 2.87-3.05Z"
      />
      <path
        className={styles.cursorOutline}
        d="m43.71 40.69-15.17-34.35c-1.19-2.69-4.97-2.65-6.18-.02L6.57 40.68c-1.26 2.74 1.4 5.62 4.23 4.58l13.96-5.15a2.1 2.1 0 0 1 1.56 0l13.87 5.15c2.81 1.04 5.51-1.82 4.3-4.57Z"
      />
    </svg>
  );
}

export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastPosition = useRef<Point>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const pendingPosition = useRef<Point | null>(null);
  const animationFrame = useRef<number | null>(null);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const springConfig = reduceMotion
    ? { damping: 100, stiffness: 1000, mass: 0.5, restDelta: 0.001 }
    : { damping: 45, stiffness: 1200, mass: 0.35, restDelta: 0.001 };
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, springConfig);
  const cursorY = useSpring(pointerY, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 42,
    stiffness: 500
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopPointerQuery);
    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches);
      if (!mediaQuery.matches) setIsVisible(false);
    };

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);
    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    document.documentElement.classList.add('smooth-cursor-active');

    const flushPointerMove = () => {
      animationFrame.current = null;
      const position = pendingPosition.current;
      if (!position) return;

      const now = performance.now();
      pointerX.set(position.x);
      pointerY.set(position.y);
      if (lastUpdateTime.current === 0) {
        lastUpdateTime.current = now;
        lastPosition.current = position;
        return;
      }

      const elapsed = now - lastUpdateTime.current;
      const velocity =
        elapsed > 0
          ? {
              x: (position.x - lastPosition.current.x) / elapsed,
              y: (position.y - lastPosition.current.y) / elapsed
            }
          : { x: 0, y: 0 };
      lastUpdateTime.current = now;
      lastPosition.current = position;

      const speed = Math.hypot(velocity.x, velocity.y);
      if (!reduceMotion && speed > 0.1) {
        const angle = (Math.atan2(velocity.y, velocity.x) * 180) / Math.PI + 90;
        let angleDelta = angle - previousAngle.current;
        if (angleDelta > 180) angleDelta -= 360;
        if (angleDelta < -180) angleDelta += 360;
        accumulatedRotation.current += angleDelta;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = angle;

        scale.set(0.96);
        if (settleTimeout.current) clearTimeout(settleTimeout.current);
        settleTimeout.current = setTimeout(() => scale.set(1), 150);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      setIsVisible(true);
      pendingPosition.current = { x: event.clientX, y: event.clientY };
      if (animationFrame.current === null) {
        animationFrame.current = window.requestAnimationFrame(flushPointerMove);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      lastUpdateTime.current = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true
    });
    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    return () => {
      document.documentElement.classList.remove('smooth-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    };
  }, [isEnabled, pointerX, pointerY, reduceMotion, rotation, scale]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={styles.cursorContainer}
      initial={false}
      style={{
        left: reduceMotion ? pointerX : cursorX,
        top: reduceMotion ? pointerY : cursorY,
        translateX: '-50%',
        translateY: '-50%',
        rotate: reduceMotion ? 0 : rotation,
        scale: reduceMotion ? 1 : scale
      }}
      transition={{ duration: 0.15 }}
    >
      <CursorShape />
    </motion.div>
  );
}
