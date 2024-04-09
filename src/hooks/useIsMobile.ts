import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Media query to detect mobile devices
  const mobileQuery = "(max-width: 767px)";

  // Updates the device type based on the media query
  function updateIsMobile() {
    const isMobile = window.matchMedia(mobileQuery).matches;
    setIsMobile(isMobile);
  }

  // Run the function once on mount and whenever the window size changes
  useEffect(() => {
    updateIsMobile();

    // Event listener for the window resize event
    window.addEventListener("resize", updateIsMobile);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  return isMobile;
}
