import { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import "../styles/desktop.scss";
import "../styles/mobile.scss";

type ThumbnailProps = {
  navigateToUrl: () => void;
  onThumbnailHovered: () => void;
  description: string;
  id: string;
};

const Thumbnail = ({ navigateToUrl, description, onThumbnailHovered, id }: ThumbnailProps) => {
  const [thumbnailHovered, setThumbnailHovered] = useState(false);
  let isMobile = useIsMobile();

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
      <div id={id} className={thumbnailHovered && isMobile ? "thumbnail-container big-mode" : "thumbnail-container"}>
        <p className={thumbnailHovered ? "thumbnail-title" : "thumbnail-title__hidden"}>MTG Price Tutor</p>
        <div
          className="thumbnail"
          {...(!isMobile
            ? {
                onMouseEnter: onThumbnailHoveredHandler,
                onMouseLeave: onThumbnailHoveredHandler,
              }
            : {
                onClick: onThumbnailHoveredHandler,
              })}
        >
          <button
            className={thumbnailHovered ? "go-to-button__visible" : "go-to-button__hidden"}
            onClick={navigateToUrl}
          >
            GO TO
          </button>
        </div>
        <div className={thumbnailHovered ? "info-card__container-visible" : "info-card__container-hidden"}>
          <p className="description-text">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
