import { useEffect, useState, CSSProperties } from "react";
import "./main.scss";
import "./mobile.scss";
import {
  mtgPriceTutorDescription,
  runBeatDescription,
  aramicDescription,
  ardyBeeDescription,
  carculatorDescription,
  keldonMarketDescription,
  sylarStudioDescription,
  silverScreenShowdownDescription,
  vampireFamiliarDescription,
  centreadDescription,
  aboutMyself,
} from "./sitesDescriptions.js";
import LogoTilesContainer from "./components/logo-tiles-container/src/LogoTilesContainer";
import { skills } from "./logoTiles";
import Thumbnail from "./components/thumbnail/src/Thumbnail";
import mtgptThumbnailImage from "./assets/mtgpt-thumbnail.jpg";
import runBeatThumbnailImage from "./assets/runbeat-thumbnail.jpg";
import useIsScrolledIntoView from "./hooks/useIsScrolledIntoView";

import aramicHero from "./assets/aramic/hero.png";
import aramicChampionStats from "./assets/aramic/champion-stats.png";

import ardyBeeHero from "./assets/ardy-bee/hero.png";
import ardyBeeActorDetail from "./assets/ardy-bee/actor-detail.png";
import ardyBeeMovies from "./assets/ardy-bee/movies.png";
import ardyBeeActors from "./assets/ardy-bee/actors.png";

import carculatorLogin from "./assets/carculator/login.png";
import carculatorVehicles from "./assets/carculator/vehicles.png";
import carculatorVehicleDetail from "./assets/carculator/vehicle-detail.png";
import carculatorEditVehicle from "./assets/carculator/edit-vehicle.png";
import carculatorAddConsumption from "./assets/carculator/add-consumption.png";

import keldonMarketHome from "./assets/keldon-market/home.png";
import keldonMarketLogin from "./assets/keldon-market/login.png";
import keldonMarketBuyModal from "./assets/keldon-market/buy-modal.png";

import sylarStudioEditor from "./assets/sylar-studio/editor.png";
import sylarStudioMyWatchfaces from "./assets/sylar-studio/my-watchfaces.png";

import silverScreenHero from "./assets/silver-screen-showdown/hero.png";
import silverScreenCreateTeams from "./assets/silver-screen-showdown/create-teams.png";
import silverScreenGameBegin from "./assets/silver-screen-showdown/game-begin.png";
import silverScreenStart from "./assets/silver-screen-showdown/start.png";
import silverScreenUpNext from "./assets/silver-screen-showdown/up-next.png";
import silverScreenCard from "./assets/silver-screen-showdown/card.png";
import silverScreenPhoneAnswer from "./assets/silver-screen-showdown/phone-answer.png";
import silverScreenConfirm from "./assets/silver-screen-showdown/confirm.png";
import silverScreenCorrect from "./assets/silver-screen-showdown/correct.png";
import silverScreenTicketShop from "./assets/silver-screen-showdown/ticket-shop.png";

import vampireFamiliarLogin from "./assets/vampire-familiar/login.png";
import vampireFamiliarCreateVampire from "./assets/vampire-familiar/create-vampire.png";
import vampireFamiliarVampireList from "./assets/vampire-familiar/vampire-list.png";
import vampireFamiliarCharacterSheet from "./assets/vampire-familiar/character-sheet.png";
import vampireFamiliarCharacterSheet2 from "./assets/vampire-familiar/character-sheet-2.png";
import vampireFamiliarInventory from "./assets/vampire-familiar/inventory.png";

import centreadLibrary from "./assets/centread/library.jpg";
import centreadAccentColor from "./assets/centread/accent-color.jpg";
import centreadTutorialSwipe from "./assets/centread/tutorial-swipe.jpg";
import centreadTutorialSpeed from "./assets/centread/tutorial-speed.jpg";
import centreadReadyToRead from "./assets/centread/ready-to-read.jpg";
import centreadReader from "./assets/centread/reader.jpg";
import centreadReaderPlaying from "./assets/centread/reader-playing.jpg";

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
  const aramicRef = useIsScrolledIntoView(
    [".proj-aramic-title", ".proj-aramic-desc"],
    animateIntoViewClass,
    0.1
  );
  const ardyBeeRef = useIsScrolledIntoView(
    [".proj-ardybee-title", ".proj-ardybee-desc"],
    animateIntoViewClass,
    0.1
  );
  const carculatorRef = useIsScrolledIntoView(
    [".proj-carculator-title", ".proj-carculator-desc"],
    animateIntoViewClass,
    0.1
  );
  const keldonMarketRef = useIsScrolledIntoView(
    [".proj-keldonmarket-title", ".proj-keldonmarket-desc"],
    animateIntoViewClass,
    0.1
  );
  const sylarStudioRef = useIsScrolledIntoView(
    [".proj-sylarstudio-title", ".proj-sylarstudio-desc"],
    animateIntoViewClass,
    0.1
  );
  const silverScreenRef = useIsScrolledIntoView(
    [".proj-silverscreen-title", ".proj-silverscreen-desc"],
    animateIntoViewClass,
    0.1
  );
  const vampireFamiliarRef = useIsScrolledIntoView(
    [".proj-vampirefamiliar-title", ".proj-vampirefamiliar-desc"],
    animateIntoViewClass,
    0.1
  );
  const centreadRef = useIsScrolledIntoView(
    [".proj-centread-title", ".proj-centread-desc"],
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
                images={[mtgptThumbnailImage]}
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
                images={[runBeatThumbnailImage]}
                id="runbeat"
              />
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container"
            style={
              {
                "--proj-shadow-a": "#bcd2c1",
                "--proj-shadow-b": "#e6ffeb",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-aramic-title"
              ref={aramicRef}
            >
              Aramic
            </p>
            <div className="thumbnail__content generic-project__content">
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[aramicHero, aramicChampionStats]}
                id="aramic"
              />
              <p className="thumbnail__description generic-project__description proj-aramic-desc">
                {aramicDescription}
              </p>
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container generic-project__container--alt"
            style={
              {
                "--proj-bg":
                  "linear-gradient(0deg, red 0%, #e54220 50%, rgb(255, 94, 0) 100%)",
                "--proj-shadow-a": "#790000",
                "--proj-shadow-b": "rgb(255, 126, 40)",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-ardybee-title"
              ref={ardyBeeRef}
            >
              Ardy Bee
            </p>
            <div className="thumbnail__content generic-project__content">
              <p className="thumbnail__description generic-project__description proj-ardybee-desc">
                {ardyBeeDescription}
              </p>
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  ardyBeeHero,
                  ardyBeeActorDetail,
                  ardyBeeMovies,
                  ardyBeeActors,
                ]}
                id="ardy-bee"
              />
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container"
            style={
              {
                "--proj-shadow-a": "#bcd2c1",
                "--proj-shadow-b": "#e6ffeb",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-carculator-title"
              ref={carculatorRef}
            >
              Carculator
            </p>
            <div className="thumbnail__content generic-project__content">
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  carculatorLogin,
                  carculatorVehicles,
                  carculatorVehicleDetail,
                  carculatorEditVehicle,
                  carculatorAddConsumption,
                ]}
                id="carculator"
              />
              <p className="thumbnail__description generic-project__description proj-carculator-desc">
                {carculatorDescription}
              </p>
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container generic-project__container--alt"
            style={
              {
                "--proj-bg":
                  "linear-gradient(0deg, red 0%, #e54220 50%, rgb(255, 94, 0) 100%)",
                "--proj-shadow-a": "#790000",
                "--proj-shadow-b": "rgb(255, 126, 40)",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-keldonmarket-title"
              ref={keldonMarketRef}
            >
              Keldon Market
            </p>
            <div className="thumbnail__content generic-project__content">
              <p className="thumbnail__description generic-project__description proj-keldonmarket-desc">
                {keldonMarketDescription}
              </p>
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  keldonMarketHome,
                  keldonMarketLogin,
                  keldonMarketBuyModal,
                ]}
                id="keldon-market"
              />
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container"
            style={
              {
                "--proj-shadow-a": "#bcd2c1",
                "--proj-shadow-b": "#e6ffeb",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-sylarstudio-title"
              ref={sylarStudioRef}
            >
              Sylar — Watchface Studio
            </p>
            <div className="thumbnail__content generic-project__content">
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[sylarStudioEditor, sylarStudioMyWatchfaces]}
                id="sylar-studio"
              />
              <p className="thumbnail__description generic-project__description proj-sylarstudio-desc">
                {sylarStudioDescription}
              </p>
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container generic-project__container--alt"
            style={
              {
                "--proj-bg":
                  "linear-gradient(0deg, red 0%, #e54220 50%, rgb(255, 94, 0) 100%)",
                "--proj-shadow-a": "#790000",
                "--proj-shadow-b": "rgb(255, 126, 40)",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-silverscreen-title"
              ref={silverScreenRef}
            >
              Silver Screen Showdown
            </p>
            <div className="thumbnail__content generic-project__content">
              <p className="thumbnail__description generic-project__description proj-silverscreen-desc">
                {silverScreenShowdownDescription}
              </p>
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  silverScreenHero,
                  silverScreenCreateTeams,
                  silverScreenGameBegin,
                  silverScreenStart,
                  silverScreenUpNext,
                  silverScreenCard,
                  silverScreenPhoneAnswer,
                  silverScreenConfirm,
                  silverScreenCorrect,
                  silverScreenTicketShop,
                ]}
                id="silver-screen-showdown"
              />
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container"
            style={
              {
                "--proj-shadow-a": "#bcd2c1",
                "--proj-shadow-b": "#e6ffeb",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-vampirefamiliar-title"
              ref={vampireFamiliarRef}
            >
              Vampire Familiar
            </p>
            <div className="thumbnail__content generic-project__content">
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  vampireFamiliarLogin,
                  vampireFamiliarCreateVampire,
                  vampireFamiliarVampireList,
                  vampireFamiliarCharacterSheet,
                  vampireFamiliarCharacterSheet2,
                  vampireFamiliarInventory,
                ]}
                id="vampire-familiar"
              />
              <p className="thumbnail__description generic-project__description proj-vampirefamiliar-desc">
                {vampireFamiliarDescription}
              </p>
            </div>
          </div>

          <div
            className="thumbnail__container generic-project__container generic-project__container--alt generic-project__container--portrait"
            style={
              {
                "--proj-bg":
                  "linear-gradient(0deg, red 0%, #e54220 50%, rgb(255, 94, 0) 100%)",
                "--proj-shadow-a": "#790000",
                "--proj-shadow-b": "rgb(255, 126, 40)",
              } as CSSProperties
            }
          >
            <p
              className="thumbnail__title generic-project__title proj-centread-title"
              ref={centreadRef}
            >
              <span>(mobile) </span>CentRead
            </p>
            <div className="thumbnail__content generic-project__content">
              <p className="thumbnail__description generic-project__description proj-centread-desc">
                {centreadDescription}
              </p>
              <Thumbnail
                onThumbnailHovered={onThumbnailHoveredHandler}
                images={[
                  centreadLibrary,
                  centreadAccentColor,
                  centreadTutorialSwipe,
                  centreadTutorialSpeed,
                  centreadReadyToRead,
                  centreadReader,
                  centreadReaderPlaying,
                ]}
                id="centread"
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
