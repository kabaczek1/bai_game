import { Kenji } from "./modules/classes/Kenji.mjs";
import { Samuraj } from "./modules/classes/Samuraj.mjs";
import {
  ENEMY,
  KEYS,
  PLAYER,
  selectEnemy,
  selectPlayer,
  SHOW_TITLE_SCREEN,
} from "./modules/globals.mjs";
import { restartGame, startGame } from "./modules/utils.mjs";

const P_SAMURAJ_BUTTON = document.getElementById("p-samuraj");
const P_KENJI_BUTTON = document.getElementById("p-kenji");
const E_SAMURAJ_BUTTON = document.getElementById("e-samuraj");
const E_KENJI_BUTTON = document.getElementById("e-kenji");

P_SAMURAJ_BUTTON.addEventListener("click", selectPlayer.bind(null, "Samuraj"));
P_KENJI_BUTTON.addEventListener("click", selectPlayer.bind(null, "Kenji"));
E_SAMURAJ_BUTTON.addEventListener("click", selectEnemy.bind(null, "Samuraj"));
E_KENJI_BUTTON.addEventListener("click", selectEnemy.bind(null, "Kenji"));

window.addEventListener("keydown", (e) => {
  if (PLAYER.canMove) {
    switch (e.key) {
      case "d":
        KEYS.d.pressed = true;
        PLAYER.lastKey = "d";
        break;
      case "a":
        KEYS.a.pressed = true;
        PLAYER.lastKey = "a";
        break;
      case "w":
        if (PLAYER.position.y >= 310) PLAYER.velocity.y = -20;
        break;
      case "s":
        PLAYER.attack();
        break;
    }
  }

  if (ENEMY.canMove) {
    switch (e.key) {
      case "ArrowRight":
        KEYS.ArrowRight.pressed = true;
        ENEMY.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        KEYS.ArrowLeft.pressed = true;
        ENEMY.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (ENEMY.position.y >= 310) ENEMY.velocity.y = -20;
        break;
      case "ArrowDown":
        ENEMY.attack();
        break;
    }
  }

  if (e.key == " ") {
    if (SHOW_TITLE_SCREEN) {
      startGame();
    } else {
      restartGame();
    }
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      KEYS.d.pressed = false;
      break;
    case "a":
      KEYS.a.pressed = false;
      break;
  }

  switch (e.key) {
    case "ArrowRight":
      KEYS.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      KEYS.ArrowLeft.pressed = false;
      break;
  }
});
