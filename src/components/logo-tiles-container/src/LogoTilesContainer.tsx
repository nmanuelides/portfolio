import { useState, useRef, useEffect } from "react";
import LogoTile, { LogoTileProps } from "../../logo-tile/src/LogoTile";
import "../styles/desktop.scss";

type LogoTilesContainerProps = {
  title: string;
  tiles: LogoTileProps[];
};

const LogoTilesContainer = ({
  title,
  tiles,
}: LogoTilesContainerProps): JSX.Element => {
  const [knobPosition, setKnobPosition] = useState(0); // Knob's Y position
  const trackRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    const trackBounds = trackRef.current!.getBoundingClientRect();
    const maxKnobPosition = trackBounds.height - 64; // Subtract knob height
    let newKnobPosition: number = 0;

    if (e instanceof MouseEvent) {
      newKnobPosition = e.clientY - trackBounds.top - 32; // Center knob
    } else if (e instanceof TouchEvent) {
      newKnobPosition = e.touches[0].clientY - trackBounds.top - 32;
    }

    // Bound the position within the track
    newKnobPosition = Math.max(0, Math.min(newKnobPosition, maxKnobPosition));
    setKnobPosition(newKnobPosition);

    // Scroll content according to knob position
    const scrollHeight =
      skillsRef.current!.scrollHeight - skillsRef.current!.clientHeight;
    const scrollPercentage = newKnobPosition / maxKnobPosition;
    skillsRef.current!.scrollTop = scrollPercentage * scrollHeight;
  };

  // Attach event listeners for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener(
      "mouseup",
      () => document.removeEventListener("mousemove", handleDrag),
      { once: true }
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener(
      "touchend",
      () => document.removeEventListener("touchmove", handleDrag),
      { once: true }
    );
  };

  useEffect(() => {
    // Clean up listeners if needed
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchmove", handleDrag);
    };
  }, []);

  return (
    <div className="logo-tiles__container">
      <div className="logo-tiles-decor__container">
        <div className="decor" />
        <div className="decor" />
        <div className="decor" />
        <div className="decor" />
        <div className="decor" />
        <div className="decor" />
        <div className="decor" />
      </div>
      <div className="logo-tiles-knob__container">
        <div
          className="knob"
          style={{ top: `${knobPosition}px` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
        <div className="track" ref={trackRef} />
      </div>
      <div className="logo-tiles__skills" ref={skillsRef}>
        {tiles &&
          tiles.length > 0 &&
          tiles.map((tile) => {
            return (
              <LogoTile
                image={tile.image}
                title={tile.title}
                size={tile.size}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LogoTilesContainer;
