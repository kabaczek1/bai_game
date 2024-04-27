import {
  ENEMY,
  ENEMY_BUTTONS,
  KEYS,
  MAPS,
  PLAYER,
  PLAYER_BUTTONS,
  selectEnemy,
  selectMap,
  selectPlayer,
  SHOW_TITLE_SCREEN,
} from "./modules/globals.mjs";
import {
  clearEnemyButtonsStyles,
  clearMapsButtonsStyles,
  clearPlayerButtonsStyles,
  restartGame,
  startGame,
} from "./modules/utils.mjs";

PLAYER_BUTTONS.forEach((item) => {
  item.button.addEventListener("click", () => {
    clearPlayerButtonsStyles();
    item.button.style.borderColor = "red";
    selectPlayer(item.character);
  });
});

ENEMY_BUTTONS.forEach((item) => {
  item.button.addEventListener("click", () => {
    clearEnemyButtonsStyles();
    item.button.style.borderColor = "blue";
    selectEnemy(item.character);
  });
});

MAPS.forEach((item) => {
  item.map.addEventListener("click", () => {
    clearMapsButtonsStyles();
    item.map.style.borderColor = "green";
    selectMap(item.map);
  });
});

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
