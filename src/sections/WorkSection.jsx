// WorkSection is ready for real agency samples but starts empty on purpose.
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clapperboard, Image as ImageIcon, Play } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { designSamples, videoSamples } from '../data/samples.js';

// Gallery reads its items from data and switches to a friendly empty state when there is no real work yet.
function SampleGallery({ title, kind, samples, icon: Icon }) {
  // The empty-state sticker only drifts when the visitor allows motion.
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`sample-group sample-group--${kind}`}>
      <div className="sample-group__heading">
        <span className="sample-group__icon"><Icon aria-hidden="true" size={20} /></span>
        <h3>{title}</h3>
        <span className="sample-group__count">{String(samples.length).padStart(2, '0')}</span>
      </div>
      {samples.length === 0 ? (
        <div className="sample-empty">
          <motion.div aria-hidden="true" className="sample-empty__sticker" animate={prefersReducedMotion ? {} : { rotate: [5, -3, 5], y: [0, -5, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
            {kind === 'video' ? <Play fill="currentColor" size={20} /> : <span>✳</span>}
          </motion.div>
          <p className="sample-empty__title">Fresh work dropping soon <span aria-hidden="true">👀</span></p>
          <p>We’re making room for the good stuff. Check back for real work from real people.</p>
          <span className="sample-empty__scribble">NO FAKE<br />FLEXES HERE</span>
        </div>
      ) : (
        <div className={`sample-grid sample-grid--${kind}`}>
          {samples.map((sample) => (
            <article className="sample-card" key={sample.id}>
              {sample.type === 'video' ? (
                <div className="sample-card__media sample-card__media--video">
                  <video controls preload="none" poster={sample.thumbnail} aria-label={sample.title}>
                    <source src={sample.src} />
                    Your browser does not support video playback.
                  </video>
                </div>
              ) : (
                <div className="sample-card__media sample-card__media--image">
                  <img alt={sample.alt || sample.title} loading="lazy" src={sample.thumbnail || sample.src} />
                </div>
              )}
              <h4>{sample.title}<ArrowUpRight aria-hidden="true" size={16} /></h4>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// The section keeps both formats visually separate while sourcing their content from one small data file.
function WorkSection() {
  return (
    <section className="section work-section" id="work">
      <div className="page-wrap">
        <Reveal className="work-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> THE PROOF IS IN THE POSTS</p>
            <h2>Little gallery.<br /><span>Big things soon.</span></h2>
          </div>
          <p>We’d rather show you real work when it’s ready than fill this space with pretend. Here’s where the good stuff will live.</p>
        </Reveal>
        <div className="sample-galleries">
          <Reveal delay={0.03}><SampleGallery icon={Clapperboard} kind="video" samples={videoSamples} title="Video Editing Samples" /></Reveal>
          <Reveal delay={0.12}><SampleGallery icon={ImageIcon} kind="design" samples={designSamples} title="Design / Canva Samples" /></Reveal>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
