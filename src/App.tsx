import { useEffect, useState } from "react";
import "./main.scss";
import "./mobile.scss";
import {
  mtgPriceTutorDescription,
  runBeatDescription,
  aboutMyself,
} from "./sitesDescriptions.js";
import LogoTilesContainer from "./components/logo-tiles-container/src/LogoTilesContainer";
import { skills } from "./logoTiles";
import Thumbnail from "./components/thumbnail/src/Thumbnail";
import mtgptThumbnailImage from "./assets/mtgpt-thumbnail.jpg";
import runBeatThumbnailImage from "./assets/runbeat-thumbnail.jpg";
import useIsScrolledIntoView from "./hooks/useIsScrolledIntoView";

function App() {
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [thumbnailHovered, setThumbnailHovered] = useState(false);
  const fade = () => setFadeToBlack(!fadeToBlack);
  const animateIntoViewClass = "into-view";
  const mtgptThumbnailDescriptionClass = "mtgpt-thumbnail__description";
  const runbeatThumbnailDescriptionClass = "runbeat-thumbnail__description";

  //Scoll into view hooks
  const mtgptDescriptionRef = useIsScrolledIntoView(
    "." + runbeatThumbnailDescriptionClass,
    animateIntoViewClass,
    0.1
  );
  const runBeatDescriptionRef = useIsScrolledIntoView(
    "." + mtgptThumbnailDescriptionClass,
    animateIntoViewClass,
    0.1
  );
  const mtgptThumbnailTitleRef = useIsScrolledIntoView(
    ".mtgpt-thumbnail__title",
    animateIntoViewClass,
    0.1
  );
  const runBeatThumbnailTitleRef = useIsScrolledIntoView(
    ".runbeat-thumbnail__title",
    animateIntoViewClass,
    0.1
  );

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (
        event.persisted ||
        (window.performance && window.performance.navigation.type === 2)
      ) {
        setFadeToBlack(false);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const navigateToRunBeat = () => {
    fade();
    setTimeout(() => {
      window.location.href =
        "https://nmanuelides.github.io/runbeat/?from=portfolio";
    }, 1000);
  };

  const navigateToMTGPT = () => {
    fade();
    setTimeout(() => {
      window.location.href = "https://www.mtgpricetutor.com.ar?from=portfolio";
    }, 1000);
  };

  const onThumbnailHoveredHandler = () => {
    setThumbnailHovered(!thumbnailHovered);
  };

  const title = ".NIKI MANUELIDES";
  const splittedTitle = title.split("");

  return (
    <div className="main__container">
      <div className="content__container">
        <div className="header__container">
          <div className="title">
            {splittedTitle.map((char, index) => (
              <span key={char + index} className="title-char">
                {char}
              </span>
            ))}
          </div>
          <p className="subtitle">frontend portfolio</p>
        </div>
        <div className="aboutMe__container">
          <div className="aboutMe__text-container">
            <div className="aboutMe__label">
              <p>About Me.</p>
            </div>
            <p className="aboutMe__text">{aboutMyself}</p>
          </div>
        </div>
        <div className="thumbnails__container">
          <p className="thumbnails__title">Some of my work</p>
          <div className="thumbnail__container mtgpt__container">
            <p
              className="thumbnail__title mtgpt-thumbnail__title"
              ref={mtgptThumbnailTitleRef}
            >
              MTG Price Tutor
            </p>
            <div className="thumbnail__content mtgpt-thumbnail__content">
              <Thumbnail
                navigateToUrl={navigateToMTGPT}
                onThumbnailHovered={onThumbnailHoveredHandler}
                thumbnailImage={mtgptThumbnailImage}
                id="mtg"
              />
              <p
                className={`thumbnail__description ${mtgptThumbnailDescriptionClass}`}
                ref={mtgptDescriptionRef}
              >
                {mtgPriceTutorDescription}
              </p>
            </div>
          </div>
          <div className="thumbnail__container runbeat__container">
            <p
              className="thumbnail__title runbeat-thumbnail__title"
              ref={runBeatThumbnailTitleRef}
            >
              <span>(wip) </span>RUNBEAT
            </p>
            <div id="runbeat__content" className="thumbnail__content runbeat-thumbnail__content">
              <p
                className={`thumbnail__description ${runbeatThumbnailDescriptionClass}`}
                ref={runBeatDescriptionRef}
              >
                {runBeatDescription}
              </p>
              <Thumbnail
                navigateToUrl={navigateToRunBeat}
                onThumbnailHovered={onThumbnailHoveredHandler}
                thumbnailImage={runBeatThumbnailImage}
                id="runbeat"
              />
            </div>
          </div>
        </div>
        <div className="skills__container">
          <p className="skills__title">My skill set</p>
          <div className="skills__thumbnails-container">
            <LogoTilesContainer title="Knowledge" tiles={skills} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
