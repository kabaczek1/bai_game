import {
  background,
  c,
  canvas,
  enemy,
  keys,
  player,
  shop,
  showTitleScreen,
} from "./modules/globals.mjs";
import {
  enemyAttack,
  enemyMove,
  playerAttack,
  playerMove,
  restartGame,
  shouldMirror,
  startGame,
} from "./modules/utils.mjs";

export function animate() {
  window.requestAnimationFrame(animate);

  background.update();
  shop.update();

  c.fillStyle = "rgba(255, 255, 255, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  shouldMirror();

  enemy.update();
  player.update();

  playerMove();

  enemyMove();

  playerAttack();
  enemyAttack();
}

window.addEventListener("keydown", (e) => {
  if (player.canMove) {
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        if (player.position.y >= 310) player.velocity.y = -20;
        break;
      case "s":
        player.attack();
        break;
    }
  }

  if (enemy.canMove) {
    switch (e.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (enemy.position.y >= 310) enemy.velocity.y = -20;
        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
  }

  if (e.key == " ") {
    if (showTitleScreen) {
      startGame();
    } else {
      restartGame();
    }
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
