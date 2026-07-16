import React, { useState, useEffect, useRef } from 'react';
import { getYoutubeId, timeToSeconds } from '../../utils/youtube';
import { copyToClipboard } from '../../utils/clipboard';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

export default function VideoModal({ media, onClose }) {
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Lock background scroll when modal is active
  useLockBodyScroll(true);

  // Auto-focus on modal open & setup keyboard handlers (ESC / Tab focus trap)
  useEffect(() => {
    // Record the element that had focus before the modal opened
    triggerElementRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, a, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the floating close button initially
    const closeBtn = modalRef.current?.querySelector('.modal-close-floating-btn');
    if (closeBtn) {
      closeBtn.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus to original triggering card element on unmount
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, []);

  if (!media) return null;

  const isImage = media.type === 'image';

  // Trigger delayed closing animation
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // 300ms matches the CSS animation duration
  };

  // Build Embed URL for Videos
  let embedUrl = '';
  if (!isImage) {
    const videoId = getYoutubeId(media.source);
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
    
    if (media.startTime) {
      embedUrl += `&start=${timeToSeconds(media.startTime)}`;
    }
    if (media.endTime) {
      embedUrl += `&end=${timeToSeconds(media.endTime)}`;
    }
  }

  // Copy shareable link
  const handleShareClick = async () => {
    const paramName = isImage ? 'thumbnail' : 'video';
    const shareUrl = `${window.location.origin}${window.location.pathname}?${paramName}=${media.id}`;
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShowToast(true);
      // Auto-hide toast after 2.5s
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <div 
      ref={modalRef}
      className={`modal-lightbox ${closing ? 'closing' : 'active'}`} 
      id="video-modal" 
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-lightbox')) {
          handleClose();
        }
      }}
    >
      {/* Floating Close Button in top right */}
      <button 
        className="modal-close-floating-btn" 
        onClick={handleClose}
        aria-label="Close modal"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className={`modal-container ${isImage ? 'modal-container--image' : ''}`}>
        
        {/* Loading Spinner */}
        {loading && (
          <div className="modal-loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Media Layout View */}
        {isImage ? (
          <div className="modal-image-wrapper">
            <img 
              src={media.image} 
              alt={`${media.title} Thumbnail`}
              className="modal-image-content"
              onLoad={() => setLoading(false)}
            />
          </div>
        ) : (
          <div className="modal-video-wrapper">
            <iframe
              src={embedUrl}
              title={`${media.title} Video Player`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        )}

        {/* Modal Controls Header */}
        <div className={`modal-controls ${isImage ? 'modal-controls--image' : ''}`}>
          {isImage ? (
            <>
              {/* Image Control Layout: Left-aligned YouTube pill button + Share, Right-aligned text */}
              <div className="modal-action-row">
                <a 
                  href={media.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-control-btn yt-link-btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                  <span>View on YouTube</span>
                </a>

                <button 
                  className="modal-control-btn share-btn" 
                  onClick={handleShareClick}
                  aria-label="Share thumbnail link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              <div className="modal-meta-info text-right">
                <span className="modal-category">{media.category}</span>
                <h2 className="modal-title">{media.title}</h2>
                {media.subtitle && <span className="modal-subtitle">{media.subtitle}</span>}
              </div>
            </>
          ) : (
            <>
              {/* Video Control Layout: Left-aligned text, Right-aligned actions */}
              <div className="modal-meta-info">
                <span className="modal-category">{media.category}</span>
                <h2 className="modal-title">{media.title}</h2>
                {media.subtitle && <span className="modal-subtitle">{media.subtitle}</span>}
              </div>
              
              <div className="modal-action-row">
                <button 
                  className="modal-control-btn share-btn" 
                  onClick={handleShareClick}
                  aria-label="Share video link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                  <span>Share</span>
                </button>
                
                <a 
                  href={media.source} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-control-btn yt-link-btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Share Toast Notification */}
      <div className={`toast-alert ${showToast ? 'active' : ''}`} id="toast" role="alert">
        <span className="toast-icon">✓</span>
        <span className="toast-msg">Copied link to clipboard!</span>
      </div>
    </div>
  );
}
