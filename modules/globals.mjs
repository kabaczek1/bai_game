import { Ken } from "./classes/Ken.mjs";
import { Kenji } from "./classes/Kenji.mjs";
import { Samuraj } from "./classes/Samuraj.mjs";
import { Hippolite } from "./classes/Hippolite.mjs";
import { Joe } from "./classes/Joe.mjs";
import { Sprite } from "./classes/Sprite.mjs";

export const PLAYER_BUTTONS = [
  {
    button: document.getElementById("p-samuraj"),
    character: "Samuraj",
  },
  {
    button: document.getElementById("p-kenji"),
    character: "Kenji",
  },
  {
    button: document.getElementById("p-ken"),
    character: "Ken",
  },
  {
    button: document.getElementById("p-joe"),
    character: "Joe",
  },
  {
    button: document.getElementById("p-hippolite"),
    character: "Hippolite",
  },
];
export const ENEMY_BUTTONS = [
  {
    button: document.getElementById("e-samuraj"),
    character: "Samuraj",
  },
  {
    button: document.getElementById("e-kenji"),
    character: "Kenji",
  },
  {
    button: document.getElementById("e-ken"),
    character: "Ken",
  },
  {
    button: document.getElementById("e-joe"),
    character: "Joe",
  },
  {
    button: document.getElementById("e-hippolite"),
    character: "Hippolite",
  },
];
export const MAPS = [
  {
    map: document.getElementById("map1"),
    imageSrc: "./img/background.png",
  },
  {
    map: document.getElementById("map2"),
    imageSrc: "./img/title_bg.png",
  },
  {
    map: document.getElementById("map3"),
    imageSrc: "./img/background.png",
  },
  {
    map: document.getElementById("map4"),
    imageSrc: "./img/background.png",
  },
  {
    map: document.getElementById("map5"),
    imageSrc: "./img/background.png",
  },
  {
    map: document.getElementById("map6"),
    imageSrc: "./img/background.png",
  },
];

export const CANVAS = document.getElementById("gamewindow");
CANVAS.width = 1024;
CANVAS.height = 576;

export const CONTEXT = CANVAS.getContext("2d");

export const GRAVITY = 0.7;
export const KEYS = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};
export let TIMER = 10;
export const setTimer = (value) => {
  TIMER = value;
};

export let SHOW_TITLE_SCREEN = true;
export const setShowTitleScreen = (value) => {
  SHOW_TITLE_SCREEN = value;
};

export let BACKGROUND = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/BACKGROUND.png",
});

export const selectMap = (map) => {
  MAPS.filter((item) => {
    if (item.map === map) {
      BACKGROUND = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: item.imageSrc,
      });
    }
  });
};

export const SHOP = new Sprite({
  position: {
    x: 650,
    y: 225,
  },
  imageSrc: "./img/SHOP.png",
  scale: 2,
  framesMax: 6,
});

export let PLAYER = new Samuraj();
export const selectPlayer = (character) => {
  switch (character) {
    case "Samuraj":
      PLAYER = new Samuraj();
      document.querySelector("#player-choice-hack-music").play();
      break;
    case "Kenji":
      PLAYER = new Kenji();
      document.querySelector("#player-choice-kenji-music").play();
      break;
    case "Ken":
      PLAYER = new Ken();
      document.querySelector("#player-choice-ken-music").play();
      break;
    case "Joe":
      PLAYER = new Joe();
      document.querySelector("#player-choice-joe-music").play();
      break;
    case "Hippolite":
      PLAYER = new Hippolite();
      document.querySelector("#player-choice-hippolite-music").play();
      break;
  }
  console.log(character)
};

export let ENEMY = new Samuraj({ isEnemy: true });
export const selectEnemy = (character) => {
  switch (character) {
    case "Samuraj":
      ENEMY = new Samuraj({ isEnemy: true });
      document.querySelector("#player-choice-hack-music").play();
      break;
    case "Kenji":
      ENEMY = new Kenji({ isEnemy: true });
      document.querySelector("#player-choice-kenji-music").play();
      break;
    case "Ken":
      ENEMY = new Ken({ isEnemy: true });
      document.querySelector("#player-choice-ken-music").play();
      break;
    case "Joe":
      ENEMY = new Joe({ isEnemy: true });
      document.querySelector("#player-choice-joe-music").play();
      break;
    case "Hippolite":
      ENEMY = new Hippolite({ isEnemy: true });
      document.querySelector("#player-choice-hippolite-music").play();
      break;
  }
};
