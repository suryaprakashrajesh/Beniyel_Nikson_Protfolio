import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SectionTitle({ label, title, delay = 0, isAbout = false }) {
  const revealRef = useScrollReveal();
  
  const headerClass = isAbout ? 'about-header' : 'section-header';
  const labelClass = isAbout ? 'about-header__label' : 'section-label';
  const titleClass = isAbout ? 'about-header__title' : 'section-title';

  return (
    <div 
      ref={revealRef} 
      className={`${headerClass} reveal-on-scroll`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={labelClass}>{label}</span>
      <h2 className={titleClass}>{title}</h2>
    </div>
  );
}
