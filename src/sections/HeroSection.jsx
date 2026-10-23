// HeroSection introduces Deload with the main promise, two clear paths, and playful floating details.
import { useMotionValue, useReducedMotion, useSpring, useTransform, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import FormButton from '../components/FormButton.jsx';
import Ticker from '../components/Ticker.jsx';

// Motion values let the decorative stickers follow the pointer without redrawing the whole hero.
function HeroSection({ agencyName }) {
  const brandLetters = [...agencyName];
  // Motion hooks store normalized pointer values and derive small spring-smoothed sticker offsets.
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const stickerX = useTransform(smoothX, [-0.5, 0.5], [-13, 13]);
  const stickerY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const inverseStickerX = useTransform(stickerX, (value) => -value);

  // Pointer coordinates are normalized to the hero box, so the parallax stays subtle at every size.
  function moveStickers(event) {
    if (prefersReducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  }

  return (
    <>
      <section className="hero" id="home" onPointerMove={moveStickers} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div className="hero__wash" aria-hidden="true" />
        <div className="hero__content page-wrap">
          <div className="hero__copy">
            <motion.p className="eyebrow hero__eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.4 }}>
              <Sparkles aria-hidden="true" size={16} /> {agencyName.toUpperCase()} SAYS HI
            </motion.p>
            <motion.h1
              aria-label={agencyName}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.075, delayChildren: 0.82 } } }}
            >
              {/* Each character is its own motion child, so Framer Motion can reveal the brand in sequence. */}
              {brandLetters.map((letter, index) => (
                <motion.span
                  aria-hidden="true"
                  className="hero__highlight"
                  key={`${letter}-${index}`}
                  variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 34, rotate: prefersReducedMotion ? 0 : 2 }, visible: { opacity: 1, y: 0, rotate: 0 } }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h2 className="hero__tagline" initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08, duration: prefersReducedMotion ? 0.01 : 0.45 }}>
              We build it. We post it. You grow.
            </motion.h2>
            <motion.p className="hero__subcopy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.45 }}>
              Websites with personality. Socials with a pulse. We make your next move feel like the obvious one.
            </motion.p>
            <motion.div className="hero__actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: 0.4 }}>
              <FormButton>Start a Project</FormButton>
              <a className="button button--secondary" href="#services">
                <span>See Our Services</span><ArrowDown aria-hidden="true" size={17} />
              </a>
            </motion.div>
            <p className="hero__note"><span aria-hidden="true" className="hero__note-dot" /> Tiny team. Big energy. Very into your growth.</p>
          </div>

          <div aria-hidden="true" className="hero-art">
            <motion.div className="hero-art__spark" style={{ x: stickerX, y: stickerY }} animate={prefersReducedMotion ? {} : { rotate: [0, 12, -8, 0], y: [0, -10, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}>✳</motion.div>
            <motion.div className="hero-art__burst" style={{ x: inverseStickerX, y: stickerY }} animate={prefersReducedMotion ? {} : { rotate: [0, -9, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <span>HELLO<br />BIG<br />ENERGY</span>
            </motion.div>
            <motion.div className="hero-art__smile" animate={prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [7, 0, 7] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>☺</motion.div>
            <div className="hero-art__scribble">GOOD<br />IDEAS<br /><span>LIVE HERE</span></div>
            <motion.div className="hero-art__arrow" animate={prefersReducedMotion ? {} : { x: [0, 7, 0], y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity }}><ArrowUpRight size={28} /></motion.div>
          </div>
        </div>
        <a className="hero__scroll" href="#services"><span>SCROLL FOR THE GOOD STUFF</span><ArrowDown aria-hidden="true" size={15} /></a>
      </section>
      <Ticker />
    </>
  );
}

export default HeroSection;
