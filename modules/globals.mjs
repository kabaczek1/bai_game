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
    imageSrc: "./img/dojo.png",
  },
  {
    map: document.getElementById("map3"),
    imageSrc: "./img/lake.png",
  },
  {
    map: document.getElementById("map4"),
    imageSrc: "./img/dark.png",
  },
  {
    map: document.getElementById("map5"),
    imageSrc: "./img/mk.png",
  },
  {
    map: document.getElementById("map6"),
    imageSrc: "./img/city.png",
  },
];

export const CANVAS = document.getElementById("gamewindow");
CANVAS.width = 1024;
CANVAS.height = 576;

export const CONTEXT = CANVAS.getContext("2d");

export const GRAVITY = 1;
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

// 0 - start screen
// 1 - round 1
// 2 - round 2
// 3 - round 3
// 4 - game end
export let GAME_STATE = 0;
export const setGameState = (value) => {
  GAME_STATE = value;
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
export let PLAYER_NAME = "Samurai Hack";
export const selectPlayer = (character) => {
  switch (character) {
    case "Samuraj":
      PLAYER = new Samuraj();
      PLAYER_NAME = "Samurai Hack";
      document.querySelector("#player-choice-hack-music").play();
      break;
    case "Kenji":
      PLAYER = new Kenji();
      PLAYER_NAME = "Kenji";
      document.querySelector("#player-choice-kenji-music").play();
      break;
    case "Ken":
      PLAYER = new Ken();
      PLAYER_NAME = "Junkie Ken";
      document.querySelector("#player-choice-ken-music").play();
      break;
    case "Joe":
      PLAYER_NAME = "Joe Ice";
      PLAYER = new Joe();
      document.querySelector("#player-choice-joe-music").play();
      break;
    case "Hippolite":
      PLAYER_NAME = "Hippolite";
      PLAYER = new Hippolite();
      document.querySelector("#player-choice-hippolite-music").play();
      break;
  }
};

export let ENEMY = new Samuraj({ isEnemy: true });
export let ENEMY_NAME = "Samurai Hack";
export const selectEnemy = (character) => {
  switch (character) {
    case "Samuraj":
      ENEMY = new Samuraj({ isEnemy: true });
      ENEMY_NAME = "Samurai Hack";
      document.querySelector("#player-choice-hack-music").play();
      break;
    case "Kenji":
      ENEMY = new Kenji({ isEnemy: true });
      ENEMY_NAME = "Kenji";
      document.querySelector("#player-choice-kenji-music").play();
      break;
    case "Ken":
      ENEMY = new Ken({ isEnemy: true });
      ENEMY_NAME = "Junkie Ken";
      document.querySelector("#player-choice-ken-music").play();
      break;
    case "Joe":
      ENEMY = new Joe({ isEnemy: true });
      ENEMY_NAME = "Joe Ice";
      document.querySelector("#player-choice-joe-music").play();
      break;
    case "Hippolite":
      ENEMY = new Hippolite({ isEnemy: true });
      ENEMY_NAME = "Hippolite";
      document.querySelector("#player-choice-hippolite-music").play();
      break;
  }
};
