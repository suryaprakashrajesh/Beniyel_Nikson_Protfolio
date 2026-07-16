import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function VideoCard({ video, onPlayClick, index }) {
  const revealRef = useScrollReveal();
  
  // Stagger delays (100ms, 150ms, 200ms) for grid entry
  const delay = (index % 3) * 50 + 100;

  return (
    <article
      ref={revealRef}
      className="project-card reveal-on-scroll"
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onPlayClick(video)}
      data-cursor="view"
    >
      {/* Video Thumbnail Wrapper */}
      <div className="project-image-wrapper">
        <img
          src={video.thumbnail}
          alt={`${video.title} Video Thumbnail`}
          className="project-image"
          loading="lazy"
        />
        <div className="shimmer" aria-hidden="true"></div>
        
        {/* Play Icon Scale-up Overlay */}
        <div className="project-play-btn" aria-hidden="true">
          <svg className="play-btn-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
        
        {/* Badges pinned on thumbnail wrapper */}
        {video.featured ? (
          <span className="project-featured-badge">Featured</span>
        ) : (
          video.badge && <span className="project-featured-badge">{video.badge}</span>
        )}
        <span className="project-duration-badge">{video.duration}</span>
      </div>

      {/* Project Card Text Info */}
      <div className="project-card-info">
        <div className="project-meta-row">
          <span className="project-category">{video.category}</span>
          <span className="project-meta-sep">•</span>
          <span className="project-extra-meta">{video.clientOrViews}</span>
          <span className="project-meta-sep">•</span>
          <span className="project-extra-meta">{video.year}</span>
        </div>
        <h3 className="project-title">{video.title}</h3>
        <p className="project-subtitle">{video.subtitle}</p>
      </div>
    </article>
  );
}
