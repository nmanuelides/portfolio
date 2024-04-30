import { LogoTileProps } from "./components/logo-tile/src/LogoTile";
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

export const languages: LogoTileProps[] = [
  { image: javaLogo, title: "Java", size: "medium" },
  { image: javascriptLogo, title: "Javascript", size: "medium" },
  { image: typescriptLogo, title: "Typescript", size: "medium" },
];

export const skills: LogoTileProps[] = [
    { image: reactjsLogo, title: "React JS", size: "small" },
    { image: htmlLogo, title: "HTML", size: "small" },
    { image: cssLogo, title: "CSS", size: "small" },
    { image: sassLogo, title: "Sass", size: "small" },
    { image: storybookLogo, title: "Storybook", size: "small" },
    { image: jestLogo, title: "Jest", size: "small" },
    { image: figmaLogo, title: "Figma", size: "small" },
    { image: gitLogo, title: "Git", size: "small" },
    { image: androidLogo, title: "Android", size: "small" },
    { image: graphqlLogo, title: "GraphQL", size: "small" },
    { image: photoshopLogo, title: "Photoshop", size: "small" },
    { image: uiuxdesignLogo, title: "UI/UX Design", size: "small" },
    { image: agileLogo, title: "Agile Methdology", size: "small" }
  ];
  