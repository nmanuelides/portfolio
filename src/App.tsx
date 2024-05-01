import React, { useEffect, useState } from "react";
import "./App.scss";
import "./mobile.scss";
import { mtgPriceTutorDescription, runBeatDescription, aboutMyself } from "./sitesDescriptions.js";
import { useIsMobile } from "./hooks/useIsMobile";
import niki from "./assets/niki.png";
import Spheres from "./components/spheres/src/Spheres";
import LogoTilesContainer from "./components/logo-tiles-container/src/LogoTilesContainer";
import { languages, skills } from "./logoTiles";
import Thumbnail from "./components/thumbnail/src/Thumbnail";

function App() {
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [leftThumbnailHovered, setLeftThumbnailHovered] = useState(false);
  const [rightThumbnailHovered, setRightThumbnailHovered] = useState(false);
  const fade = () => setFadeToBlack(!fadeToBlack);
  let isMobile = useIsMobile();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
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
      <div className="main-content">
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
            <Thumbnail navigateToUrl={navigateToMTGPT} description={mtgPriceTutorDescription} />
            <Thumbnail navigateToUrl={navigateToRunBeat} description={runBeatDescription} />
          </div>
        </section>
        <section className="right-column">
          <LogoTilesContainer title="Programming Languages" tiles={languages} />
          <LogoTilesContainer title="Skills" tiles={skills} />
        </section>
      </div>
      <div className={!fadeToBlack ? "fade-to-black_off" : "fade-to-black__on"} onClick={fade} />
      <div className={!fadeToBlack ? "blur__off" : "blur__on"} />
    </div>
  );
}

export default App;
