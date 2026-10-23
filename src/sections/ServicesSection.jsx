// ServicesSection explains the two agency services and their concrete deliverables.
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clapperboard, Globe2, Lightbulb, Palette, Wrench } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import FormButton from '../components/FormButton.jsx';

const socialFeatures = [
  { icon: Clapperboard, title: 'Video Editing', detail: 'Reels, Shorts & snappy cuts' },
  { icon: Palette, title: 'Canva & Post Design', detail: 'Graphics, posts & carousels' },
  { icon: Lightbulb, title: 'Audience & Trend Research', detail: 'Ideas made for your people' },
];

// Feature data is rendered from an array so adding a chip means adding one clear object, not copied markup.
function ServicesSection() {
  // This hook lets the card and chip hover effects honor the visitor's motion preference.
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="section services-section" id="services">
      <div className="page-wrap">
        <Reveal className="section-heading services-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD STUFF</p>
          <h2>Two ways to<br /><span>level up.</span></h2>
          <p className="section-heading__aside">Pick your power-up. We’ll bring the snacks and the strategy.</p>
        </Reveal>

        <div className="service-grid">
          <motion.article
            className="service-card service-card--web"
            initial={{ opacity: 0, y: 28, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={prefersReducedMotion ? {} : { y: -9, rotate: -4, boxShadow: '14px 17px 0 rgba(23, 19, 31, .88)' }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-card__topline"><span className="service-card__number">01</span><span className="service-card__sticker">YOUR CORNER<br />OF THE INTERNET</span></div>
            <div className="service-card__icon service-card__icon--web"><Globe2 aria-hidden="true" size={28} /></div>
            <p className="eyebrow">WEBSITE BUILDING &amp; MAINTENANCE</p>
            <h3>A website that<br />feels like <em>you.</em></h3>
            <p className="service-card__description">We design and build a home for your brand that looks sharp, works beautifully, and makes the next click easy. Need a hand after launch? We’ve got updates, upkeep and support covered too.</p>
            <ul className="service-points">
              <li><span>↗</span> Designed around your brand</li>
              <li><span>↗</span> Built for real humans on every screen</li>
              <li><span>↗</span> Ongoing updates &amp; support</li>
            </ul>
            <FormButton className="button--card button--ink">Request a Website</FormButton>
            <Wrench aria-hidden="true" className="service-card__doodle" size={44} />
          </motion.article>

          <motion.article
            className="service-card service-card--social"
            initial={{ opacity: 0, y: 28, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={prefersReducedMotion ? {} : { y: -9, rotate: 4, boxShadow: '14px 17px 0 rgba(23, 19, 31, .88)' }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-card__topline"><span className="service-card__number">02</span><span className="service-card__sticker service-card__sticker--pink">THE FEED<br />HAS ENTERED CHAT</span></div>
            <div className="service-card__icon service-card__icon--social"><Clapperboard aria-hidden="true" size={28} /></div>
            <p className="eyebrow">SOCIAL MEDIA MANAGEMENT</p>
            <h3>Make your feed<br />feel <em>alive.</em></h3>
            <p className="service-card__description">We get to know your audience, spot the trends that fit them, and turn that insight into ideas, edited videos and designed posts your people want to stop for.</p>
            <div aria-label="Social media services" className="feature-list">
              {socialFeatures.map(({ icon: Icon, title, detail }) => (
                <motion.div className="feature-chip" key={title} whileHover={prefersReducedMotion ? {} : { x: 5, backgroundColor: '#fff8ec' }} transition={{ duration: 0.18 }}>
                  <span className="feature-chip__icon"><Icon aria-hidden="true" size={18} /></span>
                  <span><strong>{title}</strong><small>{detail}</small></span>
                  <ArrowUpRight aria-hidden="true" className="feature-chip__arrow" size={15} />
                </motion.div>
              ))}
            </div>
            <FormButton className="button--card button--coral">Grow My Socials</FormButton>
            <span aria-hidden="true" className="service-card__smile">✦</span>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
