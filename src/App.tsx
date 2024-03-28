import React, { useState } from "react";
import "./App.scss";
import "./mobile.scss";
import { mtgPriceTutorDescription, runBeatDescription } from "./sitesDescriptions.js";
import { useIsMobile } from "./hooks/useIsMobile";
import niki from "./assets/niki.png";
import Spheres from "./components/spheres/src/Spheres";

function App() {
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [leftThumbnailHovered, setLeftThumbnailHovered] = useState(false);
  const [rightThumbnailHovered, setRightThumbnailHovered] = useState(false);
  const fade = () => setFadeToBlack(!fadeToBlack);
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

  return (
    <div className="App">
      <Spheres/>
      <div className="content">
        <header className="App-header">
          <img src={niki} className="niki"/>
          <div className="header-subtitle">
            <p>MANUELIDES</p>
            <span>portfolio</span>
          </div>
        </header>
        <div className="title">My React.js Projects</div>
        <div className="thumbnails-container">
          <div className="thumbnail-container">
            <p className={leftThumbnailHovered ? "thumbnail-title" : "thumbnail-title__hidden"}>MTG Price Tutor</p>
            <div className="thumbnail">
              <div
                className="left-thumbnail"
                onMouseEnter={() => setLeftThumbnailHovered(true)}
                onMouseLeave={() => setLeftThumbnailHovered(false)}
              >
                <button
                  className={leftThumbnailHovered ? "go-to-button__visible" : "go-to-button__hidden"}
                  onClick={navigateToMTGPT}
                >
                  GO TO
                </button>
              </div>
            </div>
            <div
              className={
                leftThumbnailHovered ? "left-info-card__container-visible" : "left-info-card__container-hidden"
              }
            >
              <p className="description-text">{mtgPriceTutorDescription}</p>
            </div>
          </div>
          <div className="thumbnail-container">
            <p className={rightThumbnailHovered ? "thumbnail-title" : "thumbnail-title__hidden"}>RUNBEAT</p>
            <div className="thumbnail">
              <div
                className="right-thumbnail"
                onMouseEnter={() => setRightThumbnailHovered(true)}
                onMouseLeave={() => setRightThumbnailHovered(false)}
              >
                <button
                  className={rightThumbnailHovered ? "go-to-button__visible" : "go-to-button__hidden"}
                  onClick={navigateToRunBeat}
                >
                  GO TO
                </button>
              </div>
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
      </div>
      <div className={!fadeToBlack ? "fade-to-black_off" : "fade-to-black__on"} onClick={fade} />
      <div className={!fadeToBlack ? "blur__off" : "blur__on"} />
    </div>
  );
}

export default App;
