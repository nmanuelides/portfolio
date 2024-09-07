import { useEffect, useRef } from 'react';

const useIsScrolledIntoView = (selector: string, className: string, threshold: number) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = document.querySelector(selector); 
    if (!element) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, {
      threshold: threshold // Adjust as needed
    });

    if (element) {
      observer.observe(element);
    }

    // Cleanup observer on unmount
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [selector, className]);

  return elementRef;
};

export default useIsScrolledIntoView;