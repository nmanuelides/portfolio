import { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import useIsScrolledIntoView from "../../../hooks/useIsScrolledIntoView";
import "../styles/desktop.scss";
import "../styles/mobile.scss";

type ThumbnailProps = {
  navigateToUrl: () => void;
  onThumbnailHovered: () => void;
  thumbnailImage: string;
  id: string;
};

const Thumbnail = ({
  navigateToUrl,
  onThumbnailHovered,
  thumbnailImage,
  id,
}: ThumbnailProps) => {
  const [thumbnailHovered, setThumbnailHovered] = useState(false);
  let isMobile = useIsMobile();
  const thumbnailRef = useIsScrolledIntoView(
    `.thumbnail-${id}`,
    "into-view",
    0.1
  );
  const onThumbnailHoveredHandler = () => {
    setThumbnailHovered(!thumbnailHovered);
    onThumbnailHovered();
  };

  const shouldShowModal = () => {
    return isMobile && thumbnailHovered;
  };

  return (
    <>
      {shouldShowModal() && (
        <button
          className="close-button"
          onClick={() => {
            setThumbnailHovered(false);
          }}
        >
          x
        </button>
      )}
      <div
        id={id}
        className={
          thumbnailHovered && isMobile
            ? "thumbnail-container big-mode"
            : "thumbnail-container"
        }
      >
        <div
          className={`thumbnail ${"thumbnail-" + id}`}
          ref={thumbnailRef}
          {...(!isMobile
            ? {
                onMouseEnter: onThumbnailHoveredHandler,
                onMouseLeave: onThumbnailHoveredHandler,
              }
            : {
                onClick: onThumbnailHoveredHandler,
              })}
        >
          <img
            className="thumbnail__image"
            src={thumbnailImage}
            alt="website thumbnail"
          />
          <button
            className={
              thumbnailHovered
                ? "go-to-button__visible"
                : "go-to-button__hidden"
            }
            onClick={navigateToUrl}
          />
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
