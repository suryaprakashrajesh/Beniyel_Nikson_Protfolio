import { useEffect, useRef } from 'react';

/**
 * Custom React hook that sets up an IntersectionObserver on a DOM element.
 * Adds the 'active' class when the element scrolls into view.
 * @param {object} options - Custom IntersectionObserver options
 * @returns {React.RefObject} Ref to attach to the target element
 */
export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
}
