import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import VideoCard from '../VideoCard/VideoCard';
import { portfolioVideos } from '../../data/videos';

export default function VideoShowcase({ onPlayClick }) {
  const headerRevealRef = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');

  const handlePlayClick = (video) => {
    onPlayClick(video);
  };

  // Filter logic matching the original JS behavior
  const filteredVideos = portfolioVideos.filter((video) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'cinematic') {
      return (
        video.category.toLowerCase().includes('cinematic') ||
        video.category.toLowerCase().includes('story')
      );
    }
    if (activeFilter === 'guides') {
      return video.category.toLowerCase().includes('guide');
    }
    return true;
  });

  return (
    <section id="work" className="section-container" aria-label="Video showcase portfolio">
      
      {/* ── Section Header ── */}
      <div ref={headerRevealRef} className="thumb-section-header reveal-on-scroll">
        {/* Left: label + title */}
        <div className="thumb-section-left">
          <span className="thumb-section-label">SELECTED WORKS</span>
          <h2 className="thumb-section-title">VIDEO SHOWCASE</h2>
        </div>

        {/* Right: YouTube channel link */}
        <a
          href="https://www.youtube.com/@anos97tamil/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="thumb-yt-link"
          aria-label="View all videos on Anos97 Tamil YouTube channel"
        >
          <svg className="thumb-yt-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>VIEW ALL ON YOUTUBE</span>
          <span className="thumb-yt-arrow" aria-hidden="true">→</span>
        </a>
      </div>

      {/* Grid Container */}
      <div className="projects-grid" id="portfolio-grid">
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            onPlayClick={handlePlayClick}
          />
        ))}
      </div>

    </section>
  );
}
