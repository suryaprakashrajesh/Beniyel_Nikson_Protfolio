import React, { useRef, useEffect } from 'react';
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
          <div className="thumb-overlay-content">
            <span className="thumb-overlay-client">{item.category}</span>
            <h3 className="thumb-overlay-title">{item.title}</h3>
            <span className="thumb-overlay-action">
              View Project <span className="thumb-arrow-icon">→</span>
            </span>
          </div>
        </div>
      </div>

      {/* Info below image */}
      <div className="thumb-card-info">
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
  const gridRef = useRef(null);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    // Media query configuration for mobile viewport check (<= 768px)
    const isMobileQuery = window.matchMedia('(max-width: 768px)');
    const prefersMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isMobile = isMobileQuery.matches;
    let prefersReducedMotion = prefersMotionQuery.matches;

    let animationFrameId = null;
    let lastTime = null;
    let scrollDirection = 1; // 1 = forward, -1 = backward (ping-pong style)
    const speed = 35; // speed in pixels per second
    let isPaused = false;
    let resumeTimeoutId = null;
    let isUserInteracting = false;
    let currentScrollLeft = container.scrollLeft;

    const scrollStep = (timestamp) => {
      if (!lastTime) {
        lastTime = timestamp;
        animationFrameId = requestAnimationFrame(scrollStep);
        return;
      }

      const elapsed = (timestamp - lastTime) / 1000; // time in seconds
      lastTime = timestamp;

      // Only perform auto-scroll if conditions are met
      if (
        isMobile &&
        !prefersReducedMotion &&
        !isPaused &&
        !isUserInteracting &&
        document.visibilityState === 'visible'
      ) {
        const delta = speed * elapsed * scrollDirection;
        currentScrollLeft += delta;

        const maxScroll = container.scrollWidth - container.clientWidth;

        if (currentScrollLeft >= maxScroll) {
          currentScrollLeft = maxScroll;
          scrollDirection = -1; // Reverse direction (ping-pong)
        } else if (currentScrollLeft <= 0) {
          currentScrollLeft = 0;
          scrollDirection = 1; // Go forward (ping-pong)
        }

        container.scrollLeft = currentScrollLeft;
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    const startAutoScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      container.classList.add('is-autoscrolling');
      lastTime = null;
      currentScrollLeft = container.scrollLeft;
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    const stopAutoScroll = () => {
      container.classList.remove('is-autoscrolling');
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const pauseAutoScroll = () => {
      isPaused = true;
      container.classList.remove('is-autoscrolling');
      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);

      resumeTimeoutId = setTimeout(() => {
        if (!isUserInteracting) {
          isPaused = false;
          container.classList.add('is-autoscrolling');
          currentScrollLeft = container.scrollLeft;
          lastTime = null;
        }
      }, 5000); // 5 seconds wait before resuming
    };

    const handleInteractionStart = () => {
      isUserInteracting = true;
      isPaused = true;
      container.classList.remove('is-autoscrolling');
      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
    };

    const handleInteractionEnd = () => {
      isUserInteracting = false;
      pauseAutoScroll();
    };

    const handleScroll = () => {
      // Keep track of scroll positions during pointer/drag interaction
      if (isUserInteracting || isPaused) {
        currentScrollLeft = container.scrollLeft;
      }
    };

    const handleMobileChange = (e) => {
      isMobile = e.matches;
      resetAutoScroll();
    };

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
      resetAutoScroll();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (isMobile && !prefersReducedMotion && !isUserInteracting) {
          currentScrollLeft = container.scrollLeft;
          lastTime = null;
          isPaused = false;
          container.classList.add('is-autoscrolling');
        }
      } else {
        isPaused = true;
        container.classList.remove('is-autoscrolling');
      }
    };

    const resetAutoScroll = () => {
      if (isMobile && !prefersReducedMotion) {
        startAutoScroll();
      } else {
        stopAutoScroll();
      }
    };

    // Event listeners
    isMobileQuery.addEventListener('change', handleMobileChange);
    prefersMotionQuery.addEventListener('change', handleMotionChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const eventOptions = { passive: true };
    container.addEventListener('pointerdown', handleInteractionStart, eventOptions);
    window.addEventListener('pointerup', handleInteractionEnd, eventOptions);
    window.addEventListener('pointercancel', handleInteractionEnd, eventOptions);
    container.addEventListener('touchstart', handleInteractionStart, eventOptions);
    container.addEventListener('touchend', handleInteractionEnd, eventOptions);
    container.addEventListener('touchcancel', handleInteractionEnd, eventOptions);
    container.addEventListener('touchmove', handleInteractionStart, eventOptions);
    container.addEventListener('scroll', handleScroll, eventOptions);

    resetAutoScroll();

    return () => {
      isMobileQuery.removeEventListener('change', handleMobileChange);
      prefersMotionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopAutoScroll();
      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);

      container.removeEventListener('pointerdown', handleInteractionStart);
      window.removeEventListener('pointerup', handleInteractionEnd);
      window.removeEventListener('pointercancel', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('touchcancel', handleInteractionEnd);
      container.removeEventListener('touchmove', handleInteractionStart);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      <div className="thumbnails-grid" ref={gridRef}>
        {portfolioThumbnails.map((item, index) => (
          <ThumbnailCard key={item.id} item={item} index={index} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
