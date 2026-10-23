// FormModal hosts the external Google Form and keeps keyboard and dismissal behavior accessible.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, LoaderCircle, X } from 'lucide-react';
import { contactFormUrl, embeddedFormUrl } from '../data/config.js';
import { useFormDialog } from './FormContext.jsx';

// The dialog is rendered in document.body so page stacking styles cannot cover it.
function FormModal() {
  const { isOpen, closeForm, triggerRef } = useFormDialog();
  // State tracks the iframe spinner; refs keep direct handles to the dialog and its close control.
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  // This hook reads the operating-system setting so modal movement can be simplified when requested.
  const prefersReducedMotion = useReducedMotion();

  // Effects connect React to browser behavior: here we lock page scrolling and manage keyboard focus.
  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeForm();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])')];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeForm, triggerRef]);

  // Reset the spinner for each new opening; the browser's iframe load event ends it.
  useEffect(() => {
    if (isOpen) setIsLoading(true);
  }, [isOpen]);

  if (!document.body) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="form-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <motion.section
            aria-labelledby="form-dialog-title"
            aria-modal="true"
            className="form-dialog"
            ref={dialogRef}
            role="dialog"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, ease: 'easeOut' }}
          >
            <header className="form-dialog__header">
              <div>
                <span className="eyebrow">GOOD THINGS START HERE</span>
                <h2 id="form-dialog-title">Tell us what you’re dreaming up.</h2>
              </div>
              <button aria-label="Close project form" className="icon-button form-dialog__close" onClick={closeForm} ref={closeButtonRef} type="button">
                <X aria-hidden="true" size={21} />
              </button>
            </header>
            <div className="form-dialog__body">
              {isLoading && (
                <div aria-live="polite" className="form-spinner">
                  <LoaderCircle aria-hidden="true" className="spin" size={30} />
                  <span>Getting the good stuff ready…</span>
                </div>
              )}
              <iframe
                className="form-iframe"
                onLoad={() => setIsLoading(false)}
                src={embeddedFormUrl}
                title="Deload project inquiry form"
              />
            </div>
            <footer className="form-dialog__footer">
              <span>Form not showing up?</span>
              <a href={contactFormUrl} rel="noopener noreferrer" target="_blank">
                Open form in a new tab <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default FormModal;
