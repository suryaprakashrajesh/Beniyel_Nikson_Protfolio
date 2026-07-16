import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import VideoShowcase from './components/VideoShowcase/VideoShowcase';
import ThumbnailGallery from './components/ThumbnailGallery/ThumbnailGallery';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import VideoModal from './components/VideoModal/VideoModal';
import { portfolioVideos } from './data/videos';
import { portfolioThumbnails } from './data/thumbnails';
import './styles/global.css';

export default function App() {
  const [activeMedia, setActiveMedia] = useState(null);

  // Check URL parameters on page load to direct-link media
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoIdParam = urlParams.get('video');
    const thumbIdParam = urlParams.get('thumbnail');

    if (videoIdParam) {
      const videoId = parseInt(videoIdParam, 10);
      const targetVideo = portfolioVideos.find(v => v.id === videoId);
      if (targetVideo) {
        setActiveMedia({ ...targetVideo, type: 'video' });
      }
    } else if (thumbIdParam) {
      const thumbId = parseInt(thumbIdParam, 10);
      const targetThumb = portfolioThumbnails.find(t => t.id === thumbId);
      if (targetThumb) {
        setActiveMedia({ ...targetThumb, type: 'image' });
      }
    }
  }, []);

  const handleOpenVideo = (video) => {
    setActiveMedia({ ...video, type: 'video' });
    const newUrl = `${window.location.pathname}?video=${video.id}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleOpenThumbnail = (thumb) => {
    setActiveMedia({ ...thumb, type: 'image' });
    const newUrl = `${window.location.pathname}?thumbnail=${thumb.id}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleCloseMedia = () => {
    setActiveMedia(null);
    const newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  };

  return (
    <ThemeProvider>
      {/* Unified Lightbox Modal for both Video iframe and Thumbnail img */}
      {activeMedia && (
        <VideoModal media={activeMedia} onClose={handleCloseMedia} />
      )}
      {/* Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true"></div>

      {/* Navigation Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Video Showcase Section */}
        <VideoShowcase onPlayClick={handleOpenVideo} />

        {/* YouTube Thumbnail Grid Section */}
        <ThumbnailGallery onSelect={handleOpenThumbnail} />

        {/* Redesigned About Me Section */}
        <About />
      </main>

      {/* Joint Contact & Credits Footer */}
      <footer id="contact" className="section-container border-top-accent">
        <Contact />
        <Footer />
      </footer>
    </ThemeProvider>
  );
}
