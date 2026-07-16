import { useEffect } from 'react';

/**
 * Custom React hook that locks document body scrolling when a condition is met.
 * Useful for modal overlays to prevent background scrolling.
 * @param {boolean} lock - Condition to lock scroll
 */
export function useLockBodyScroll(lock) {
  useEffect(() => {
    if (!lock) return;

    // Get original body overflow setting
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scroll
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
