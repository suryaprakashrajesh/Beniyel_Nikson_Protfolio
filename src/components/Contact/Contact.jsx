import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="footer-cta-strip reveal-on-scroll">
      {/* Left: Availability Status */}
      <div className="footer-status-col">
        <div className="availability-status">
          <span className="status-indicator-dot"></span>
          <span className="status-text">AVAILABLE FOR FREELANCE PROJECTS</span>
        </div>
        <div className="footer-credits">
          <p className="credit-title">BENIYEL NIKSON // FREELANCE VIDEO EDITOR &amp; THUMBNAIL DESIGNER</p>
          <p className="credit-detail">ALL RIGHTS RESERVED &copy; 2026</p>
        </div>
      </div>

      {/* Right: Tagline & Let's Work Together Link */}
      <div className="footer-cta-col">
        <div className="tagline-container">
          <p className="tagline-line">Precision in the cut. Purpose in every frame.</p>
          <p className="tagline-line">Let's turn your vision into impact.</p>
        </div>
        
        <div className="vertical-divider" aria-hidden="true"></div>
        
        <div className="cta-link-wrapper">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=benibavid709@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-cta-link" 
            id="contact-link"
          >
            LET'S WORK TOGETHER <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
