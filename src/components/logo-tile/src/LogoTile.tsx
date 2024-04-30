import "../styles/desktop.scss";

export type LogoTileProps = {
  image: string;
  title: string;
  size: "small" | "medium" | "large";
};

const LogoTile = ({ image, title, size }: LogoTileProps): JSX.Element => {
  return (
    <div className="logo-tile-container">
      <img className={`logo-tile-container__image ${size}`} src={image} alt={title} />
      <b className={`logo-tile-container__title ${size}`}>{title}</b>
    </div>
  );
};

export default LogoTile;
