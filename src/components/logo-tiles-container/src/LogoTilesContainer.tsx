import LogoTile, { LogoTileProps } from "../../logo-tile/src/LogoTile";
import "../styles/desktop.scss";

type LogoTilesContainerProps = {
  title: string;
  tiles: LogoTileProps[];
};

const LogoTilesContainer = ({ title, tiles }: LogoTilesContainerProps): JSX.Element => {
  return (
    <div className="skills-container">
      <b className="skills-container__title">{title}</b>
      <div className="skills-container__skills">
        {tiles &&
          tiles.length > 0 &&
          tiles.map((tile) => {
            return <LogoTile image={tile.image} title={tile.title} size={tile.size} />;
          })}
      </div>
    </div>
  );
};

export default LogoTilesContainer;
