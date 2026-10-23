// CursorFollower adds a decorative mouse-only ring; it never replaces the normal cursor.
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

// Motion values update transforms directly, avoiding a full React render for every mouse movement.
function CursorFollower() {
  // React state controls visibility and hover size; motion values carry pointer coordinates directly to transforms.
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 440, damping: 34, mass: 0.32 });
  const y = useSpring(rawY, { stiffness: 440, damping: 34, mass: 0.32 });

  // Match media features first so the custom decoration never appears on touch or reduced-motion devices.
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    setEnabled(finePointer.matches && !prefersReducedMotion);
    function updatePointer(event) {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return;
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setHovering(Boolean(event.target.closest('a, button, [role="button"]')));
    }
    function updatePointerPreference() {
      setEnabled(finePointer.matches && !prefersReducedMotion);
    }
    finePointer.addEventListener('change', updatePointerPreference);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      finePointer.removeEventListener('change', updatePointerPreference);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, [prefersReducedMotion, rawX, rawY]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className={`cursor-follower${hovering ? ' cursor-follower--hover' : ''}`}
      style={{ x, y }}
      animate={{ scale: hovering ? 1.45 : 1, opacity: 1 }}
      transition={{ duration: 0.16 }}
    />
  );
}

export default CursorFollower;
