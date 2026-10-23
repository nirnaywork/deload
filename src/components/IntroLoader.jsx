// IntroLoader adds a quick brand hello without keeping the actual page hidden for long.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { agencyName } from '../data/config.js';

// A short timer removes the overlay; reduced-motion visitors see a faster fade.
function IntroLoader() {
  // State makes the intro visible once, then the timer changes it so AnimatePresence can fade it out.
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // This effect starts a browser timer after render and clears it if the loader unmounts early.
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), prefersReducedMotion ? 250 : 780);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: 'easeInOut' }}
        >
          <span className="intro-loader__mark">{agencyName}<span>✳</span></span>
          <span className="intro-loader__line" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroLoader;
