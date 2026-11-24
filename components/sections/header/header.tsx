'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { opacity } from './anim';
import Nav from './nav';
import ProgressiveBlur from './progressive-blur';
import styles from './style.module.scss';

import { metadata as meta } from '@/app/config';

interface HeaderProps {
  loader?: boolean;
}

const Header = (_props: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsActive(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isActive]);

  return (
    <>
      <AnimatePresence>
        {isActive && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsActive(false)}
          />
        )}
      </AnimatePresence>
      <motion.header
        className={styles.header}
        data-menu-open={isActive}
        style={{ zIndex: isActive ? 'var(--z-menu)' : 'var(--z-header)' }}
      >
        <div aria-hidden="true" className="header-glass-tint" />
        <ProgressiveBlur />
        <div className={styles.bar}>
          <Link href="/" className="flex items-center justify-center">
            <span className="text-md font-semibold transition-transform duration-200 hover:-translate-y-0.5">
              {meta.author.name}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsActive((active) => !active)}
            className={styles.el}
            aria-label={
              isActive ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isActive}
            aria-controls="site-navigation"
          >
            <span className={styles.label}>
              <motion.span
                variants={opacity}
                animate={!isActive ? 'open' : 'closed'}
              >
                Menu
              </motion.span>
              <motion.span
                variants={opacity}
                animate={isActive ? 'open' : 'closed'}
              >
                Close
              </motion.span>
            </span>
            <span
              aria-hidden="true"
              className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
            />
          </button>
        </div>
        <AnimatePresence mode="wait">
          {isActive && <Nav setIsActive={setIsActive} />}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
