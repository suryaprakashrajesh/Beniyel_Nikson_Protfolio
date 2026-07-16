import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Footer() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef} className="credit-roll-links reveal-on-scroll">
      <div className="credit-row">
        <span className="credit-role">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YOUTUBE CHANNEL
        </span>
        <a href="https://www.youtube.com/@anos97tamil/videos" target="_blank" rel="noopener noreferrer" className="credit-value">YOUTUBE.COM/@ANOS97TAMIL</a>
      </div>
      <div className="credit-row">
        <span className="credit-role">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          INSTAGRAM
        </span>
        <a href="https://instagram.com/ig_anosvoldigoad" target="_blank" rel="noopener noreferrer" class="credit-value">@IG_ANOSVOLDIGOAD</a>
      </div>
      <div className="credit-row">
        <span class="credit-role">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X / TWITTER
        </span>
        <a href="https://twitter.com/igAnosVoldigoad" target="_blank" rel="noopener noreferrer" className="credit-value">@IGANOSVOLGIGOAD</a>
      </div>
      <div className="credit-row">
        <span className="credit-role">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14"><path d="M11.571 4.714h1.715v5.143H11.57zm3.858 0h1.714v5.143h-1.714zM4.286 0L1.071 3.214V17.14h5.357v3.214h3.215l3.214-3.214h4.286l5.357-5.357V0zm16.072 10.714l-3.214 3.214h-4.286l-3.215 3.214v-3.214H5.357V2.143h15z"/></svg>
          TWITCH
        </span>
        <a href="https://twitch.tv/anos97tamil" target="_blank" rel="noopener noreferrer" className="credit-value">TWITCH.TV/ANOS97TAMIL</a>
      </div>
      <div className="credit-row">
        <span className="credit-role">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="14" height="14"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          DIRECT COMMUNIQUÉ
        </span>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=benibavid709@gmail.com" target="_blank" rel="noopener noreferrer" className="credit-value">BENIBAVID709@GMAIL.COM</a>
      </div>
      <div className="credit-row">
        <span className="credit-role">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" width="14" height="14"><path d="M19.05 4.91A10 10 0 0 0 3.32 17.65L1.87 22l4.57-1.2A9.9 9.9 0 0 0 10 21.6a10 10 0 0 0 10-10c0-2.6-1-5.1-2.95-6.9zM10 19.9c-1.8 0-3.5-.5-5-1.4l-.3-.2-3.1.8.8-3-.2-.4a8.3 8.3 0 0 1-1.3-4.5 8.3 8.3 0 0 1 8.3-8.3c2.2 0 4.3.9 5.9 2.4a8.2 8.2 0 0 1 2.4 5.9 8.3 8.3 0 0 1-8.3 8.3zm4.5-6.2c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-2.5-1.5 7 7 0 0 1-1.7-2.1c-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.4l.2-.3c.1-.1.1-.2.1-.3s0-.3-.1-.4c-.1-.2-.5-1.2-.7-1.6-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.5.1-.7.3A3 3 0 0 0 4.8 9c0 1.2.4 2.4 1 3.2A11.7 11.7 0 0 0 11 17c1.3.6 2.3.8 3.2.7.9-.1 1.7-.6 2-1.2.3-.6.3-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>
          PHONE / WHATSAPP
        </span>
        <a href="https://wa.me/917200309828" target="_blank" rel="noopener noreferrer" className="credit-value">+91 72003 09828</a>
      </div>
    </div>
  );
}
