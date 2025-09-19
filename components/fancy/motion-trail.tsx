'use client';

import type { AnimationSequence, Target, Transition } from 'motion/react';
import { motion, useAnimate, useAnimationFrame } from 'motion/react';
import { Children, useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Fallback simple mouse vector hook (containerRef optional)
const useMouseVector = (containerRef?: React.RefObject<HTMLElement | null>) => {
  const position = { x: 0, y: 0 } as { x: number; y: number };
  if (typeof window !== 'undefined') {
    window.addEventListener(
      'mousemove',
      (e) => {
        const rect = containerRef?.current?.getBoundingClientRect();
        if (rect) {
          position.x = e.clientX - rect.left;
          position.y = e.clientY - rect.top;
        } else {
          position.x = e.clientX;
          position.y = e.clientY;
        }
      },
      { passive: true }
    );
  }
  return { position };
};

type TrailSegment = [Target, Transition];

type TrailAnimationSequence = TrailSegment[];

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence; // Updated type
  interval?: number;
  velocityDependentSpawn?: boolean;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence; // Updated type
  scale: number;
  child: React.ReactNode;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: 'circOut' }],
    [{ scale: 0 }, { duration: 0.5, ease: 'circIn' }]
  ],
  interval = 100
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([]);

  const lastAddedTimeRef = useRef<number>(0);
  const { position: mousePosition } = useMouseVector(containerRef);
  const lastMousePosRef = useRef(mousePosition);
  const currentIndexRef = useRef(0);
  // Convert children to array for random selection
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // Batch updates using useCallback
  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      const newItem: TrailItem = {
        id: uuidv4(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current]
      };

      // Increment index and wrap around if needed
      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      if (newOnTop) {
        trailRef.current.push(newItem);
      } else {
        trailRef.current.unshift(newItem);
      }
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  );

  const removeFromTrail = useCallback((itemId: string) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      trailRef.current.splice(index, 1);
    }
  }, []);

  useAnimationFrame((time) => {
    // Skip if mouse hasn't moved
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return;
    }
    lastMousePosRef.current = mousePosition;

    const currentTime = time;

    if (currentTime - lastAddedTimeRef.current < interval) {
      return;
    }

    lastAddedTimeRef.current = currentTime;

    addToTrail(mousePosition);
  });

  return (
    <div className="pointer-events-none relative h-full w-full">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = item.animationSequence.map(
      (segment: TrailSegment): [typeof scope.current, ...TrailSegment] => [
        scope.current,
        ...segment
      ]
    );

    animate(sequence as AnimationSequence)
      .then(() => {
        onComplete(item.id);
      })
      .catch(() => {
        onComplete(item.id);
      });
  }, []);

  return (
    <motion.div
      ref={scope}
      key={item.id}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation
      }}
    >
      {item.child}
    </motion.div>
  );
};

export default ImageTrail;
