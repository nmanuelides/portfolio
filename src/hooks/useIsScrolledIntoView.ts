import { useEffect, useRef } from 'react';

const useIsScrolledIntoView = (selector: string | string[], className: string, threshold: number) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const selectors = Array.isArray(selector) ? selector : [selector];
    const elements = selectors
      .map(s => document.querySelector(s))
      .filter((el): el is Element => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, {
      threshold: threshold // Adjust as needed
    });

    elements.forEach(element => observer.observe(element));

    // Cleanup observer on unmount
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [selector, className, threshold]);

  return elementRef;
};

export default useIsScrolledIntoView;