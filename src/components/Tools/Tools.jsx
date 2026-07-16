import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { toolsData } from '../../data/tools';
import CountUp from '../CountUp/CountUp';

export default function Tools() {
  const revealRef = useScrollReveal();

  return (
    <div 
      ref={revealRef} 
      className="about-tools-card reveal-on-scroll" 
      style={{ transitionDelay: '250ms' }}
    >
      <h3 className="about-details__heading">TOOLS</h3>
      <div className="tools-grid">
        {toolsData.map((tool) => (
          <div className="tool-item-card" key={tool.id}>
            <span className="tool-item__name">{tool.name}</span>
            <div className="tool-item__rating-bar">
              <div className="tool-item__progress-track">
                <div 
                  className="tool-item__progress-fill" 
                  style={{ '--target-width': `${tool.percent}%` }}
                ></div>
              </div>
              <span className="tool-item__progress-percent">
                <CountUp end={tool.percent} suffix="%" duration={1200} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
