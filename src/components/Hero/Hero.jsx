import React, { useState } from 'react';
import heroPortrait from '../../assets/hero/Me-BW crop.PNG';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState({
    transform: 'translate3d(0px, 0px, 0)',
    transition: 'none'
  });

  const handleMouseMove = (e) => {
    const heroEl = e.currentTarget;
    const { left, top, width, height } = heroEl.getBoundingClientRect();
    
    // Compute coordinates relative to the center of the hero section (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Apply maximum 5px translate offset with a light dampening transition
    const tx = x * 10; // offset ranges from -5px to 5px
    const ty = y * 10;

    setParallaxStyle({
      transform: `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`,
      transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
  };

  const handleMouseLeave = () => {
    // Smooth reset snap-back when mouse exits
    setParallaxStyle({
      transform: 'translate3d(0px, 0px, 0)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      const offsetTop = element.offsetTop - 85;
      window.scrollTo({
        top: offsetTop >= 0 ? offsetTop : 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#work');
    }
  };

  return (
    <section 
      id="hero" 
      className="hero-split" 
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-split__grid">

        {/* LEFT: Text content */}
        <div className="hero-split__left">
          {/* Role tag */}
          <div className="hero-role-tag">
            <span className="role-tag__line" aria-hidden="true"></span>
            <span className="role-tag__text">VIDEO EDITOR <span className="role-tag__bullet">•</span> THUMBNAIL DESIGNER</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            Turning Ideas Into Visuals That Leave an Impact<span className="headline-accent">.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-sub">
            I help creators and brands produce cinematic edits and
            thumbnail designs that grab attention and drive engagement.
          </p>

          {/* CTA buttons */}
          <div className="hero-btn-row">
            <a href="#work" className="hero-btn-filled" onClick={handleScrollToWork}>
              View Portfolio <span aria-hidden="true">→</span>
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=benibavid709@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn-outline"
            >
              Let’s Talk <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Social links */}
          <div className="hero-social-row" aria-label="Social links">
            <a href="https://www.youtube.com/@anos97tamil/videos" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://instagram.com/ig_anosvoldigoad" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="#" className="hero-social-icon" aria-label="Behance">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.543c-.15-1.74-1.167-2.338-1.833-2.338-.759 0-1.57.44-1.71 2.338zM10.999 7.887c.421-.314.862-.475 1.321-.475.386 0 .72.112 1.002.336.281.224.422.533.422.926 0 .396-.155.731-.464 1.006-.31.276-.705.413-1.184.413-.472 0-.85-.14-1.133-.42-.281-.28-.422-.62-.422-1.022 0-.372.153-.67.458-.764zm4.22 6.227c0 1.34-.576 2.393-1.727 3.163-1.152.769-2.584 1.154-4.295 1.154H2V5h6.621c3.071 0 4.607 1.184 4.607 3.553 0 1.088-.484 2.027-1.453 2.817.879.249 1.548.697 2.007 1.343.459.645.689 1.439.437 2.401z"/></svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=benibavid709@gmail.com" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* RIGHT: Portrait + Badge */}
        <div className="hero-split__right">
          {/* Dotted grid decoration */}
          <div className="hero-dots" aria-hidden="true"></div>

          {/* Portrait frame */}
          <div className="hero-portrait-frame" style={parallaxStyle}>
            <div className="portrait-left-bar" aria-hidden="true"></div>
            <div className="portrait-img-wrap">
              <img
                src={heroPortrait}
                alt="Beniyel Nikson — Video Editor & Thumbnail Designer"
                className={`hero-portrait-img ${imageLoaded ? 'loaded' : ''}`}
                id="hero-portrait-img"
                draggable="false"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="portrait-corner-accent" aria-hidden="true"></div>
          </div>

          {/* Available for Freelance badge */}
          <div className="hero-available-badge">
            <span className="badge-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span className="badge-label">Available for Freelance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
