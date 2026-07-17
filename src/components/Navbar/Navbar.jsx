import React, { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('work');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Frosted glass kicks in after 50px
      setScrolled(window.scrollY > 50);

      // Scroll-spy: order from bottom to top so we match the lowest visible section
      const sections = ['contact', 'about', 'thumbnails', 'work'];
      let currentActive = 'work';
      const scrollPos = window.scrollY + 180;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPos >= element.offsetTop) {
          currentActive = sectionId;
          break;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false); // Close mobile menu when a link is clicked
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 85;
      window.scrollTo({
        top: offsetTop >= 0 ? offsetTop : 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header id="main-header" className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'work')}>
          BENIYEL NIKSON<span className="logo-dot">.</span>
        </a>

        {/* Mobile menu toggle button */}
        <button 
          className="nav-hamburger" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-box">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a
            href="#work"
            className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'work')}
          >
            Work
          </a>
          <a
            href="#thumbnails"
            className={`nav-link ${activeSection === 'thumbnails' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'thumbnails')}
          >
            Thumbnails
          </a>
          <a
            href="#about"
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            About
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
