import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useIsScrolledIntoView from "../../../hooks/useIsScrolledIntoView";
import "../styles/desktop.scss";
import "../styles/mobile.scss";

type ThumbnailProps = {
  navigateToUrl?: () => void;
  onThumbnailHovered: () => void;
  images: string[];
  id: string;
};

const ROTATION_INTERVAL_MS = 1400;
const LIGHTBOX_TRANSITION_MS = 380;

const collapsedTransform = (origin: DOMRect, final: DOMRect) => {
  const scaleX = origin.width / final.width;
  const scaleY = origin.height / final.height;
  const deltaX =
    origin.left + origin.width / 2 - (final.left + final.width / 2);
  const deltaY =
    origin.top + origin.height / 2 - (final.top + final.height / 2);
  return `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
};

const Thumbnail = ({
  navigateToUrl,
  onThumbnailHovered,
  images,
  id,
}: ThumbnailProps) => {
  const [thumbnailHovered, setThumbnailHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const prevActiveRef = useRef(activeIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  let isMobile = useIsMobile();
  const isGallery = images.length > 1;
  const thumbnailRef = useIsScrolledIntoView(
    `.thumbnail-${id}`,
    "into-view",
    0.1
  );
  const imageStackRef = useRef<HTMLDivElement>(null);
  const originRectRef = useRef<DOMRect | null>(null);
  const hasEnteredRef = useRef(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  const onThumbnailHoveredHandler = () => {
    setThumbnailHovered(!thumbnailHovered);
    onThumbnailHovered();
  };

  const getThumbnailRect = () =>
    (thumbnailRef.current as HTMLElement | null)?.getBoundingClientRect() ??
    null;

  const openLightbox = () => {
    originRectRef.current = getThumbnailRect();
    setLightboxIndex(activeIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    originRectRef.current = getThumbnailRect() ?? originRectRef.current;
    setLightboxVisible(false);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setLightboxOpen(false);
    }, LIGHTBOX_TRANSITION_MS);
  };

  const showPrevImage = () =>
    setLightboxIndex(prev => (prev - 1 + images.length) % images.length);
  const showNextImage = () =>
    setLightboxIndex(prev => (prev + 1) % images.length);

  useEffect(() => {
    if (images.length <= 1) return;

    const shouldRotate = isMobile || thumbnailHovered;
    if (!shouldRotate) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isMobile, thumbnailHovered, images.length]);

  // Keep the outgoing image visible (instead of fading it out) so only the
  // incoming image visibly fades in, layered on top of it.
  useEffect(() => {
    setPrevIndex(prevActiveRef.current);
    prevActiveRef.current = activeIndex;
  }, [activeIndex]);

  const handleActiveImageFadeEnd = (
    event: React.TransitionEvent<HTMLImageElement>
  ) => {
    if (event.propertyName === "opacity") setPrevIndex(null);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevImage();
      if (event.key === "ArrowRight") showNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length]);

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  // Grow the enlarged image out of the thumbnail's position/size, iOS-app-icon style.
  useLayoutEffect(() => {
    if (!lightboxOpen) return;
    const el = imageStackRef.current;
    const origin = originRectRef.current;
    if (!el || !origin) {
      setLightboxVisible(true);
      return;
    }

    const finalRect = el.getBoundingClientRect();
    el.style.transition = "none";
    el.style.transform = collapsedTransform(origin, finalRect);
    // Force a reflow so the collapsed transform is committed before animating away from it.
    void el.offsetWidth;

    const raf = requestAnimationFrame(() => {
      el.style.transition = `transform ${LIGHTBOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      el.style.transform = "translate(0, 0) scale(1, 1)";
      hasEnteredRef.current = true;
      setLightboxVisible(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [lightboxOpen]);

  // Shrink the enlarged image back down into the thumbnail when closing.
  useEffect(() => {
    if (lightboxOpen && !lightboxVisible && hasEnteredRef.current) {
      const el = imageStackRef.current;
      const origin = originRectRef.current;
      if (el && origin) {
        const finalRect = el.getBoundingClientRect();
        el.style.transition = `transform ${LIGHTBOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = collapsedTransform(origin, finalRect);
      }
      hasEnteredRef.current = false;
    }
  }, [lightboxVisible, lightboxOpen]);

  return (
    <>
      <div id={id} className={"thumbnail-container"}>
        <div
          className={`thumbnail ${"thumbnail-" + id} ${
            isGallery ? "thumbnail--clickable" : ""
          }`}
          ref={thumbnailRef}
          {...(!isMobile
            ? {
                onMouseEnter: onThumbnailHoveredHandler,
                onMouseLeave: onThumbnailHoveredHandler,
                ...(isGallery ? { onClick: openLightbox } : {}),
              }
            : {
                onClick: isGallery ? openLightbox : onThumbnailHoveredHandler,
              })}
        >
          <div className="thumbnail__image-stack">
            {images.map((image, index) => (
              <img
                key={image}
                className={`thumbnail__image ${
                  index === activeIndex
                    ? "thumbnail__image--active"
                    : index === prevIndex
                    ? "thumbnail__image--prev"
                    : ""
                }`}
                onTransitionEnd={
                  index === activeIndex ? handleActiveImageFadeEnd : undefined
                }
                src={image}
                alt="website screenshot"
              />
            ))}
          </div>
          {navigateToUrl && (
            <button
              className={
                thumbnailHovered || isMobile
                  ? "go-to-button__visible"
                  : "go-to-button__hidden"
              }
              onClick={navigateToUrl}
            />
          )}
        </div>
      </div>
      {isGallery &&
        lightboxOpen &&
        createPortal(
          <div
            className={`thumbnail-lightbox ${
              lightboxVisible ? "thumbnail-lightbox--visible" : ""
            }`}
            onClick={closeLightbox}
          >
            <button
              className="thumbnail-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>
            <button
              className="thumbnail-lightbox__nav thumbnail-lightbox__nav--prev"
              onClick={event => {
                event.stopPropagation();
                showPrevImage();
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="thumbnail-lightbox__image-stack" ref={imageStackRef} onClick={event => event.stopPropagation()}>
              {images.map((image, index) => (
                <img
                  key={image}
                  className={`thumbnail-lightbox__image ${
                    index === lightboxIndex
                      ? "thumbnail-lightbox__image--active"
                      : ""
                  }`}
                  src={image}
                  alt="website screenshot enlarged"
                />
              ))}
            </div>
            <button
              className="thumbnail-lightbox__nav thumbnail-lightbox__nav--next"
              onClick={event => {
                event.stopPropagation();
                showNextImage();
              }}
              aria-label="Next image"
            >
              ›
            </button>
            <div
              className="thumbnail-lightbox__counter"
              onClick={event => event.stopPropagation()}
            >
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Thumbnail;
