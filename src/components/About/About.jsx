import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import Tools from '../Tools/Tools';
import Timeline from '../Timeline/Timeline';
import CountUp from '../CountUp/CountUp';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import mePortrait from '../../assets/hero/Me.jpg';

export default function About() {
  const bannerRevealRef = useScrollReveal();
  const dividerRevealRef = useScrollReveal();
  const storyRevealRef = useScrollReveal();
  const philosophyRevealRef = useScrollReveal();

  return (
    <section id="about" className="section-container border-top-accent">
      
      {/* Section 1: Header */}
      <SectionTitle 
        label="ABOUT ME" 
        title="Crafting stories one frame at a time." 
        isAbout={true} 
      />

      {/* Section 2: Banner Card (MY NUMBERS) */}
      <div 
        ref={bannerRevealRef} 
        className="about-banner-card reveal-on-scroll" 
        style={{ transitionDelay: '100ms' }}
      >
        <div className="about-banner-card__inner">
          {/* Left: Portrait with EDITOR text behind */}
          <div className="about-banner-card__portrait-col">
            <div className="about-banner-card__text-bg" aria-hidden="true">EDITOR</div>
            <div className="about-banner-card__portrait-wrap">
              <img 
                src={mePortrait} 
                alt="Beniyel Nikson Portrait" 
                className="about-banner-card__img" 
                loading="lazy" 
              />
              <div className="about-banner-card__accent-line"></div>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="about-banner-card__stats-col">
            <span className="about-banner-card__stats-heading">MY NUMBERS</span>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-card__number">
                  <CountUp end={5} suffix="+" />
                </span>
                <span className="stat-card__title">YEARS</span>
                <span className="stat-card__subtitle">Experience</span>
              </div>
              
              {/* Accent Card */}
              <div className="stat-card stat-card--accent">
                <span className="stat-card__number">
                  <CountUp end={150} suffix="+" />
                </span>
                <span className="stat-card__title">YOUTUBE PROJECTS</span>
                <span className="stat-card__subtitle">Completed</span>
              </div>
              
              <div className="stat-card">
                <span className="stat-card__number">
                  <CountUp end={390} suffix="K" />
                </span>
                <span className="stat-card__title">VIEWS</span>
                <span className="stat-card__subtitle">Total Views</span>
              </div>
              
              <div className="stat-card">
                <span className="stat-card__number">
                  <CountUp end={24} suffix="H" />
                </span>
                <span className="stat-card__title">DELIVERY</span>
                <span className="stat-card__subtitle">Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div 
        ref={dividerRevealRef} 
        className="about-section-divider reveal-on-scroll" 
        style={{ transitionDelay: '150ms' }}
      >
        <span className="about-section-divider__line"></span>
        <span className="about-section-divider__label">MY APPROACH</span>
        <span className="about-section-divider__line"></span>
      </div>

      {/* Layout Grid for Story, Philosophy, Tools & Timeline */}
      <div className="about-details-grid">
        
        {/* Left Column: Story & Philosophy */}
        <div className="about-details-left">
          {/* Section 3: My Story */}
          <div 
            ref={storyRevealRef} 
            className="about-story-card reveal-on-scroll" 
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="about-details__heading">MY STORY</h3>
            <p className="about-story__text">
              Not just another editor. I create videos that make people stop scrolling. By combining dynamic pacing, precise cuts, and custom soundscapes, I craft compelling visual stories that maximize viewer retention and engagement.
            </p>
          </div>

          {/* Section 4: Editing Philosophy */}
          <div 
            ref={philosophyRevealRef} 
            className="about-philosophy-card reveal-on-scroll" 
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="about-details__heading">EDITING PHILOSOPHY</h3>
            <blockquote className="about-philosophy__quote">
              “Every frame should have a purpose. If a cut doesn't strengthen the emotion, it doesn't belong in the timeline.”
            </blockquote>
          </div>
        </div>

        {/* Right Column: Tools & Timeline */}
        <div className="about-details-right">
          <Tools />
          <Timeline />
        </div>

      </div>

    </section>
  );
}
