'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './loader';

function Preloader() {
  // Keep the server-rendered page usable until the client can run the loader.
  // Otherwise a failed or delayed hydration leaves its fixed overlay covering
  // the whole site indefinitely.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
  );
}

export default Preloader;
