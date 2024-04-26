import { animate } from "../index.js";
import {
  enemy,
  keys,
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
export function shouldMirror() {
  if (player.position.x > enemy.position.x) {
    enemy.mirror = true;
    player.mirror = true;
  } else {
    enemy.mirror = false;
    player.mirror = false;
  }
}
export function playerMove() {
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }
}
export function enemyMove() {
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }
}
export function playerAttack() {
  //player hits
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.frameCurrent === 4
  ) {
    enemy.takeHit(player.damage);
    player.isAttacking = false;
    document.getElementById("enemyHealth").style.width = enemy.health + "%";
  }
  //player misses
  if (player.isAttacking && player.frameCurrent === 4) {
    player.isAttacking = false;
  }
}
export function enemyAttack() {
  //enemy hits
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.frameCurrent === 2
  ) {
    player.takeHit(enemy.damage);
    enemy.isAttacking = false;
    document.getElementById("playerHealth").style.width = player.health + "%";
  }
  //enemy misses
  if (enemy.isAttacking && enemy.frameCurrent === 2) {
    enemy.isAttacking = false;
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}
