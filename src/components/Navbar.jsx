// Navbar provides sticky page navigation, a shared form CTA, and a small-screen menu.
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import FormButton from './FormButton.jsx';
import { agencyName } from '../data/config.js';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'How we work', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

// Each link uses a real anchor so keyboard users and browsers can navigate the page naturally.
function Navbar() {
  // State remembers whether the mobile links are open; this motion hook honors the OS preference.
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a aria-label={`${agencyName} home`} className="brand" href="#home" onClick={closeMenu}>
          <span className="brand__word">{agencyName}</span>
          <span aria-hidden="true" className="brand__spark">✳</span>
        </a>

        <nav aria-label="Main navigation" className="desktop-nav">
          {/* map turns each link object into one anchor; key gives React a stable identity for updates. */}
          {navLinks.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <FormButton className="button--nav">Get Started</FormButton>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            className="mobile-nav"
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                href={link.href}
                key={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.035 }}
              >
                {link.label}<ArrowUpRight aria-hidden="true" size={17} />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
