// ProcessSection makes the social content workflow feel clear, collaborative, and easy to follow.
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Compass, Heart, Lightbulb, Search } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

const processSteps = [
  { number: '01', icon: Compass, title: 'We learn your people.', copy: 'What they care about, what they laugh at, and what they need from you.' },
  { number: '02', icon: Search, title: 'We spot the signal.', copy: 'We find the trends that make sense for your audience and your brand.' },
  { number: '03', icon: Lightbulb, title: 'We make the good stuff.', copy: 'Fresh ideas turn into edited videos, thoughtful graphics, and ready-to-post content.' },
  { number: '04', icon: Heart, title: 'You post and grow.', copy: 'Show up consistently, build a real connection, and make room for your next big thing.' },
];

// Each step comes from one data item, which keeps the repeated visual pattern consistent.
function ProcessSection() {
  // Motion preference decides whether process cards travel when they enter the screen.
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="section process-section" id="process">
      <div className="page-wrap">
        <Reveal className="process-intro">
          <p className="eyebrow"><span className="eyebrow-dot eyebrow-dot--lime" /> HOW WE WORK</p>
          <h2>From “hmm…”<br />to <span>heck yes.</span></h2>
          <p>Good content isn’t a guessing game. It’s a little listening, a little trend-spotting, and a lot of making stuff your people actually care about.</p>
        </Reveal>
        <div className="process-grid">
          {processSteps.map(({ number, icon: Icon, title, copy }, index) => (
            <motion.article
              className={`process-step process-step--${index + 1}`}
              key={number}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, rotate: prefersReducedMotion ? 0 : (index % 2 ? 2 : -2) }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.48, delay: prefersReducedMotion ? 0 : index * 0.09 }}
              whileHover={prefersReducedMotion ? {} : { y: -7, rotate: index % 2 ? -2 : 2 }}
            >
              <span className="process-step__number">{number}</span>
              <span className="process-step__icon"><Icon aria-hidden="true" size={25} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
              {index < processSteps.length - 1 && <span aria-hidden="true" className="process-step__connector">{index % 2 ? <ArrowDownRight size={28} /> : <ArrowUpRight size={28} />}</span>}
            </motion.article>
          ))}
        </div>
        <p className="process-footnote"><span>✳</span> Thoughtful strategy. Playful execution. Zero “post and pray.”</p>
      </div>
    </section>
  );
}

export default ProcessSection;
