// Reveal gives section contents the same gentle entrance as they come into view.
import { motion, useReducedMotion } from 'framer-motion';

// Props let parent sections reuse this wrapper while changing only the child content and small delay.
function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  // Reduced-motion preference changes the entrance distance before the element appears.
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.58, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
