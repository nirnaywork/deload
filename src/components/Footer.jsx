// Footer repeats useful links and provides a friendly path back to the top of the page.
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { contactEmail } from '../data/config.js';

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Our work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

// The year comes from the browser clock so the copyright line stays current automatically.
function Footer({ agencyName }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand brand--footer" href="#home"><span className="brand__word">{agencyName}</span><span aria-hidden="true" className="brand__spark">✳</span></a>
            <p>We build it. We post it. You grow.<br />Little agency. Loud ideas.</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links">
            <span className="eyebrow">TAKE A LOOK</span>
            {footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}<ArrowUpRight aria-hidden="true" size={14} /></a>)}
          </nav>
          <div className="footer-email-block">
            <span className="eyebrow">SAY HELLO</span>
            <a href={`mailto:${contactEmail}`}>{contactEmail}<ArrowUpRight aria-hidden="true" size={15} /></a>
            <a aria-label="Back to top" className="back-top" href="#home"><ArrowUp aria-hidden="true" size={17} /><span>BACK TO TOP</span></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {year} {agencyName}. All rights reserved.</span><span>Made with good energy <span aria-hidden="true">✳</span></span></div>
      </div>
    </footer>
  );
}

export default Footer;
