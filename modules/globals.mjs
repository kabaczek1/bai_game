import { Kenji } from "./classes/Kenji.mjs";
import { Samuraj } from "./classes/Samuraj.mjs";
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

export const BACKGROUND = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/BACKGROUND.png",
});

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
      break;
    case "Kenji":
      PLAYER = new Kenji();
      break;
  }
};

export let ENEMY = new Samuraj({ isEnemy: true });
export const selectEnemy = (character) => {
  switch (character) {
    case "Samuraj":
      ENEMY = new Samuraj({ isEnemy: true });
      break;
    case "Kenji":
      ENEMY = new Kenji({ isEnemy: true });
      break;
  }
};
