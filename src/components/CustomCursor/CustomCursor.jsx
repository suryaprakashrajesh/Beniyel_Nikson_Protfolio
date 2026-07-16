import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'view', 'expand', 'pointer'
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices to prevent mobile rendering issues
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
        setIsHovered(true);
      } else if (e.target.closest('a, button, [role="button"], input, select, textarea, .theme-toggle-btn')) {
        setCursorType('pointer');
        setIsHovered(true);
      } else {
        setCursorType('default');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    const handleMouseLeaveDoc = () => setVisible(false);
    const handleMouseEnterDoc = () => setVisible(true);
    document.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mouseenter', handleMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mouseenter', handleMouseEnterDoc);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`custom-cursor cursor-${cursorType} ${isHovered ? 'hovered' : ''}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      {cursorType === 'view' && <span className="cursor-text">▶ VIEW</span>}
      {cursorType === 'expand' && <span className="cursor-text">EXPAND</span>}
    </div>
  );
}
