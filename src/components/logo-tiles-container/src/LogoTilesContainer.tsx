import { useState, useRef, useEffect } from "react";
import LogoTile, { LogoTileProps } from "../../logo-tile/src/LogoTile";
import "../styles/desktop.scss";
import "../styles/mobile.scss";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useIsScrolledIntoView from "../../../hooks/useIsScrolledIntoView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
  const [vibrating, setVibrating] = useState(false);
  const vibrationIntervalRef = useRef<number | null>(null);
  let isMobile = useIsMobile();

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

  const handleClickStart = (e: React.TouchEvent) => {
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
  const vibrationPattern = [10, 80, 10, 80, 10, 400];
  const startVibration = () => {
    if (navigator.vibrate) {
      setVibrating(true);
      navigator.vibrate(vibrationPattern);
      vibrationIntervalRef.current = window.setInterval(() => {
        navigator.vibrate(vibrationPattern);
      }, 1000); // Interval of 500ms
    }
  };

  const stopVibration = () => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
      navigator.vibrate(0); // Stop vibration
    }
    setVibrating(false);
  };

  return (
    <div className="logo-tiles__container">
      {!isMobile && (
        <>
          <div className="logo-tiles-decor__container-left">
            <div className="decor" />
            <div className="decor" />
            <div className="decor" />
            <div className="decor" />
            <div className="decor" />
            <div className="decor" />
            <div className="decor" />
          </div>
          <div className="logo-tiles-knob__container">
            <button
              className="knob"
              style={{ top: `${knobPosition}px` }}
              onMouseDown={handleMouseDown}
              onTouchStart={isMobile ? startVibration : handleClickStart}
              onTouchEnd={isMobile ? stopVibration : undefined}
            >
              {isMobile && (
                <FontAwesomeIcon className="arrow-up" icon={faAngleUp} />
              )}
            </button>
            <div className="track" ref={trackRef} />
            {/*<button
          className="knob"
          style={{ top: `${knobPosition}px` }}
          onMouseDown={handleMouseDown}
          onTouchStart={isMobile ? startVibration : handleClickStart}
          onTouchEnd={isMobile ? stopVibration : undefined}
        >
          <FontAwesomeIcon className="arrow-up" icon={faAngleDown} />
        </button>*/}
          </div>
        </>
      )}
      <div className="logo-tiles__skills" ref={skillsRef}>
        {tiles &&
          tiles.length > 0 &&
          tiles.map((tile) => {
            return (
              <LogoTile
                key={tile.title}
                image={tile.image}
                title={tile.title}
                size={tile.size}
              />
            );
          })}
      </div>
      {!isMobile && (
        <div className="logo-tiles-decor__container-right">
          <div className="decor" />
          <div className="decor" />
          <div className="decor" />
          <div className="decor" />
          <div className="decor" />
          <div className="decor" />
          <div className="decor" />
        </div>
      )}
    </div>
  );
};

export default LogoTilesContainer;
