import { Kenji } from "./classes/Kenji.mjs";
import { Samuraj } from "./classes/Samuraj.mjs";
import { Sprite } from "./classes/Sprite.mjs";

export const canvas = document.getElementById("gamewindow");
canvas.width = 1024;
canvas.height = 576;

export const c = canvas.getContext("2d");

export const gravity = 0.7;
export const keys = {
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
export let timer = 10;
export const setTimer = (value) => {
  timer = value;
};

export let showTitleScreen = true;
export const setShowTitleScreen = (value) => {
  showTitleScreen = value;
};

export const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

export const shop = new Sprite({
  position: {
    x: 650,
    y: 225,
  },
  imageSrc: "./img/shop.png",
  scale: 2,
  framesMax: 6,
});

export const player = new Samuraj({ isEnemy: true });

export const enemy = new Kenji();
