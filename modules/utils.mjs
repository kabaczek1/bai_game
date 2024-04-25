import { animate } from "../index.js";
import {
  enemy,
  player,
  setShowTitleScreen,
  setTimer,
  timer,
} from "./globals.mjs";

export let timerId;

export function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

export function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.getElementById("label").style.display = "flex";
  if (player.health === enemy.health) {
    document.getElementById("labelText").innerHTML = "tie";
  } else if (player.health > enemy.health) {
    document.getElementById("labelText").innerHTML = "Player 1 wins!";
  } else if (player.health < enemy.health) {
    document.getElementById("labelText").innerHTML = "Player 2 wins!";
  }
}

export function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    setTimer(timer - 1);
    document.getElementById("timer").innerHTML = timer;
  }
  if (timer == 0) {
    determineWinner({ player, enemy, timerId });
  }
}

export function startGame() {
  console.log("startgame");
  setShowTitleScreen(false);
  document.getElementById("titlescreen").style.display = "none";
  decreaseTimer();
  animate();
}

export function restartGame() {
  console.log("restartgame");
  document.getElementById("label").style.display = "none";

  player.position = { x: 100, y: 200 };
  player.health = 100;
  player.isAttacking = false;
  player.dead = false;
  player.image = player.sprites.idle.image;
  player.canMove = true;

  enemy.position = { x: 844, y: 200 };
  enemy.health = 100;
  enemy.isAttacking = false;
  enemy.dead = false;
  enemy.image = enemy.sprites.idle.image;
  enemy.canMove = true;

  clearTimeout(timerId);
  setTimer(11);
  decreaseTimer();

  document.getElementById("enemyHealth").style.width = enemy.health + "%";
  document.getElementById("playerHealth").style.width = player.health + "%";
}
