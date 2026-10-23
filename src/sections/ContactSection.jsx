// ContactSection gives visitors a direct email and one shared project-form call to action.
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import FormButton from '../components/FormButton.jsx';
import { contactEmail } from '../data/config.js';

// Clipboard state briefly changes the button label so the visitor can tell the copy action worked.
function ContactSection() {
  // State powers the copied confirmation; motion preference keeps that feedback subtle.
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div aria-hidden="true" className="contact-section__shape contact-section__shape--one" />
      <div aria-hidden="true" className="contact-section__shape contact-section__shape--two" />
      <div className="page-wrap contact-wrap">
        <Reveal className="contact-card">
          <div className="contact-card__copy">
            <p className="eyebrow"><Sparkles aria-hidden="true" size={16} /> YOUR NEXT CHAPTER, MAYBE?</p>
            <h2>Let’s make<br />some <span>noise.</span></h2>
            <p>Got a big idea, a small question, or a feed that needs a little oomph? Tell us the plot. We’re listening.</p>
            <FormButton className="button--contact">Fill Our Project Form</FormButton>
          </div>
          <div className="contact-card__side">
            <span aria-hidden="true" className="contact-card__mail-icon"><Mail size={25} /></span>
            <span className="eyebrow">OR SEND A LITTLE NOTE</span>
            <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail}<ArrowUpRight aria-hidden="true" size={17} /></a>
            <motion.button
              aria-label={copied ? 'Email address copied' : 'Copy email address'}
              className="copy-button"
              onClick={copyEmail}
              type="button"
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  className="copy-button__label"
                  key={copied ? 'copied' : 'copy'}
                  initial={{ opacity: 0, y: 4, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.92 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.16 }}
                >
                  {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
                  {copied ? 'Copied!' : 'Copy email'}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <span aria-hidden="true" className="contact-card__side-star">✳</span>
          </div>
        </Reveal>
        <p className="contact-caption">No pitch deck needed. Just come as you are. <span aria-hidden="true">♡</span></p>
      </div>
    </section>
  );
}

export default ContactSection;
