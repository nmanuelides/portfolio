import React, { useEffect, useState } from "react";
import "./App.scss";
import "./mobile.scss";
import { mtgPriceTutorDescription, runBeatDescription, aboutMyself } from "./sitesDescriptions.js";
import { useIsMobile } from "./hooks/useIsMobile";
import niki from "./assets/niki.png";
import Spheres from "./components/spheres/src/Spheres";
import LogoTile from "./components/logo-tile/src/LogoTile";
import javaLogo from "./assets/java-logo.png";
import javascriptLogo from "./assets/js-logo.png";
import typescriptLogo from "./assets/ts-logo.svg";
import agileLogo from "./assets/agile-logo.png";
import androidLogo from "./assets/android-logo.png";
import cssLogo from "./assets/css-logo.png";
import figmaLogo from "./assets/figma-logo.webp";
import gitLogo from "./assets/git-logo.png";
import graphqlLogo from "./assets/graphql-logo.png";
import htmlLogo from "./assets/html-logo.png";
import jestLogo from "./assets/jest-logo.webp";
import photoshopLogo from "./assets/photoshop-logo.png";
import reactjsLogo from "./assets/reactjs-logo.png";
import sassLogo from "./assets/sass-logo.png";
import storybookLogo from "./assets/storybook-logo.svg";
import uiuxdesignLogo from "./assets/uiuxdesign-logo.jpg";

function App() {
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [leftThumbnailHovered, setLeftThumbnailHovered] = useState(false);
  const [rightThumbnailHovered, setRightThumbnailHovered] = useState(false);
  const fade = () => setFadeToBlack(!fadeToBlack);
  let isMobile = useIsMobile();

  useEffect(() => {
    const handlePopState = () => {
      setFadeToBlack(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location]);

  const navigateToRunBeat = () => {
    fade();
    setTimeout(() => {
      window.location.href = "https://nmanuelides.github.io/runbeat/?from=portfolio";
    }, 1000);
  };

  const navigateToMTGPT = () => {
    fade();
    setTimeout(() => {
      window.location.href = "https://www.mtgpricetutor.com.ar?from=portfolio";
    }, 1000);
  };

  const onLeftThumbnailHoveredHandler = () => {
    setLeftThumbnailHovered(!leftThumbnailHovered);
  };

  const onRightThumbnailHoveredHandler = () => {
    setRightThumbnailHovered(!rightThumbnailHovered);
  };

  const shouldShowModal = () => {
    const showModal = isMobile && (leftThumbnailHovered || rightThumbnailHovered);
    if (showModal) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return showModal;
  };

  return (
    <div className="App">
      <Spheres />
      <header className="App-header">
        <img src={niki} className="niki" />
        <div className="header-subtitle">
          <p className="header-subtitle__manuelides">MANUELIDES</p>
          <p className="header-subtitle__portfolio">portfolio</p>
        </div>
      </header>
      <section className="main-content">
        <section className="left-column">
          <div className="about-container">
            <b className="about-container__title">About Myself</b>
            <div className="about-container__text">
              <b>{aboutMyself}</b>
            </div>
          </div>
          <b className="my-projects-title">My React Projects</b>
          <div className="thumbnails-container">
            {shouldShowModal() && (
              <button
                className="close-button"
                onClick={() => {
                  setLeftThumbnailHovered(false);
                  setRightThumbnailHovered(false);
                }}
              >
                x
              </button>
            )}
            <div className={leftThumbnailHovered && isMobile ? "thumbnail-container big-mode" : "thumbnail-container"}>
              <p className={leftThumbnailHovered ? "thumbnail-title" : "thumbnail-title__hidden"}>MTG Price Tutor</p>
              <div
                className="thumbnail left"
                {...(!isMobile
                  ? {
                      onMouseEnter: onLeftThumbnailHoveredHandler,
                      onMouseLeave: onLeftThumbnailHoveredHandler,
                    }
                  : {
                      onClick: onLeftThumbnailHoveredHandler,
                    })}
              >
                <button
                  className={leftThumbnailHovered ? "go-to-button__visible" : "go-to-button__hidden"}
                  onClick={navigateToMTGPT}
                >
                  GO TO
                </button>
              </div>
              <div
                className={
                  leftThumbnailHovered ? "left-info-card__container-visible" : "left-info-card__container-hidden"
                }
              >
                <p className="description-text">{mtgPriceTutorDescription}</p>
              </div>
            </div>
            <div className={rightThumbnailHovered && isMobile ? "thumbnail-container big-mode" : "thumbnail-container"}>
              <p className={rightThumbnailHovered ? "thumbnail-title" : "thumbnail-title__hidden"}>RUNBEAT (WiP)</p>
              <div
                className="thumbnail right"
                {...(!isMobile
                  ? {
                      onMouseEnter: onRightThumbnailHoveredHandler,
                      onMouseLeave: onRightThumbnailHoveredHandler,
                    }
                  : {
                      onClick: onRightThumbnailHoveredHandler,
                    })}
              >
                <button
                  className={rightThumbnailHovered ? "go-to-button__visible" : "go-to-button__hidden"}
                  onClick={navigateToRunBeat}
                >
                  GO TO
                </button>
              </div>
              <div
                className={
                  rightThumbnailHovered ? "right-info-card__container-visible" : "right-info-card__container-hidden"
                }
              >
                <p className="description-text">{runBeatDescription}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="right-column">
          <div className="skills-container">
            <b className="skills-container__title">Programming Languages</b>
            <div className="skills-container__languages">
              <LogoTile image={javaLogo} title="Java" size="medium" />
              <LogoTile image={javascriptLogo} title="Javascript" size="medium" />
              <LogoTile image={typescriptLogo} title="Typescript" size="medium" />
            </div>
          </div>
          <div className="skills-container">
            <b className="skills-container__title">Skills</b>
            <div className="skills-container__skills">
              <LogoTile image={reactjsLogo} title="React JS" size="small" />
              <LogoTile image={htmlLogo} title="HTML" size="small" />
              <LogoTile image={cssLogo} title="CSS" size="small" />
              <LogoTile image={sassLogo} title="Sass" size="small" />
              <LogoTile image={storybookLogo} title="Storybook" size="small" />
              <LogoTile image={jestLogo} title="Jest" size="small" />
              <LogoTile image={figmaLogo} title="Figma" size="small" />
              <LogoTile image={gitLogo} title="Git" size="small" />
              <LogoTile image={androidLogo} title="Android" size="small" />
              <LogoTile image={graphqlLogo} title="GraphQL" size="small" />
              <LogoTile image={photoshopLogo} title="Photoshop" size="small" />
              <LogoTile image={uiuxdesignLogo} title="UI/UX Design" size="small" />
              <LogoTile image={agileLogo} title="Agile Methdology" size="small" />
            </div>
          </div>
        </section>
      </section>
      <div className={!fadeToBlack ? "fade-to-black_off" : "fade-to-black__on"} onClick={fade} />
      <div className={!fadeToBlack ? "blur__off" : "blur__on"} />
    </div>
  );
}

export default App;
