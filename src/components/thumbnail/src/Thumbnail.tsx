import { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import '../styles/desktop.scss';
import '../styles/mobile.scss';

type ThumbnailProps = {
  navigateToUrl: () => void;
  description: string;
};

const Thumbnail = ({ navigateToUrl, description }: ThumbnailProps) => {
  const [thumbnailHovered, setThumbnailHovered] = useState(false);
  let isMobile = useIsMobile();

  const onThumbnailHoveredHandler = () => {
    setThumbnailHovered(!thumbnailHovered);
  };

  return (
    <div className={thumbnailHovered && isMobile ? "thumbnail-container big-mode" : "thumbnail-container"}>
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
  );
};

export default Thumbnail;