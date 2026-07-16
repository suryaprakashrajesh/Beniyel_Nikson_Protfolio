import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { timelineData } from '../../data/timeline';

export default function Timeline() {
  const revealRef = useScrollReveal();

  return (
    <div 
      ref={revealRef} 
      className="about-timeline-card reveal-on-scroll" 
      style={{ transitionDelay: '350ms' }}
    >
      <h3 className="about-details__heading">TIMELINE</h3>
      <div className="timeline-v">
        {timelineData.map((item, index) => (
          <div className="timeline-v__item" key={item.id}>
            <div className="timeline-v__dot-col">
              <div className={`timeline-v__dot ${item.currentlyTag ? 'timeline-v__dot--active' : ''}`}></div>
              {index < timelineData.length - 1 && <div className="timeline-v__line"></div>}
            </div>
            <div className="timeline-v__content">
              <div className="timeline-v__header-row">
                <span className="timeline-v__year">{item.year}</span>
                {item.badge && <span className="timeline-v__badge">{item.badge}</span>}
              </div>
              <span className="timeline-v__desc">{item.desc}</span>
              {item.currentlyTag && (
                <span className="timeline-v__currently-tag">{item.currentlyTag}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
