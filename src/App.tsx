import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import "./mobile.scss";
import { mtgPriceTutorDescription, runBeatDescription } from "./sitesDescriptions.js";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [leftThumbnailHovered, setLeftThumbnailHovered] = useState(false);
  const [rightThumbnailHovered, setRightThumbnailHovered] = useState(false);
  const fade = () => setFadeToBlack(!fadeToBlack);
  return (
    <div className="App">
      <div className="content">
        <header className="App-header">
          <p>NIKI</p>
          <p>MANUELIDES</p>
          <span>portfolio</span>
        </header>
        <div className="title">My React Projects</div>
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
                  onClick={fade}
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
                  onClick={fade}
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