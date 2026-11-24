'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './loader';

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
  );
}

export default Preloader;
