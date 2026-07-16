import React, { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { portfolioThumbnails } from '../../data/thumbnails';

/* ─── Individual card extracted so hooks are called at top-level ─── */
function ThumbnailCard({ item, index, onSelect }) {
  const revealRef = useScrollReveal();
  const wrapperRef = useRef(null);
  const delay = (index % 4) * 50 + 100;

  const handleImageLoad = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('loaded');
    }
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    onSelect(item);
  };

  return (
    <a
      ref={revealRef}
      href="#"
      className={`thumbnail-card ${item.variant || 'standard'} reveal-on-scroll`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleCardClick}
      data-cursor="expand"
    >
      <div className="thumb-image-wrapper" ref={wrapperRef}>
        <img
          src={item.image}
          alt={`${item.title} Thumbnail`}
          className="thumb-image"
          loading="lazy"
          onLoad={handleImageLoad}
        />

        {/* Hover overlay */}
        <div className="thumb-overlay">
          <div className="thumb-overlay-inner">
            <span className="thumb-overlay-label">{item.subtitle}</span>
            <span className="thumb-overlay-client">{item.category}</span>
          </div>
        </div>
      </div>

      {/* Info below image */}
      <div className="thumb-info">
        <div className="thumb-info-row">
          <span className="thumb-role">{item.subtitle}</span>
          <span className="thumb-client">{item.category}</span>
        </div>
        <h3 className="thumb-title">{item.title}</h3>
      </div>
    </a>
  );
}

/* ─── Main Gallery section ─── */
export default function ThumbnailGallery({ onSelect }) {
  const headerRevealRef = useScrollReveal();

  return (
    <section
      id="thumbnails"
      className="section-container border-top-accent"
      aria-label="YouTube Thumbnails design portfolio"
    >
      {/* ── Section Header ── */}
      <div ref={headerRevealRef} className="thumb-section-header reveal-on-scroll">
        {/* Left: label + title */}
        <div className="thumb-section-left">
          <span className="thumb-section-label">VISUAL DESIGN</span>
          <h2 className="thumb-section-title">YOUTUBE THUMBNAILS</h2>
        </div>

        {/* Right: YouTube channel link */}
        <a
          href="https://www.youtube.com/@anos97tamil/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="thumb-yt-link"
          aria-label="Visit Anos97 Tamil YouTube channel"
        >
          {/* YouTube icon */}
          <svg className="thumb-yt-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>VIEW ALL ON YOUTUBE</span>
          <span className="thumb-yt-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div className="thumbnails-grid">
        {portfolioThumbnails.map((item, index) => (
          <ThumbnailCard key={item.id} item={item} index={index} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
