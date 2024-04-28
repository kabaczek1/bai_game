import {
  CANVAS,
  ENEMY,
  KEYS,
  PLAYER,
  setShowTitleScreen,
  setTimer,
  BACKGROUND,
  TIMER,
  CONTEXT,
  SHOP,
  PLAYER_BUTTONS,
  ENEMY_BUTTONS,
  MAPS,
} from "./globals.mjs";

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

export function determineWinner({ PLAYER, ENEMY, timerId }) {
  clearTimeout(timerId);
  document.getElementById("label").style.display = "flex";
  if (PLAYER.health === ENEMY.health) {
    document.getElementById("labelText").innerHTML = "tie";
  } else if (PLAYER.health > ENEMY.health) {
    document.getElementById("labelText").innerHTML = "Player 1 wins!";
  } else if (PLAYER.health < ENEMY.health) {
    document.getElementById("labelText").innerHTML = "Player 2 wins!";
  }
}
let timerId;
export function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (TIMER > 0) {
    setTimer(TIMER - 1);
    document.getElementById("timer").innerHTML = TIMER;
  }
  if (TIMER == 0) {
    determineWinner({ PLAYER, ENEMY, timerId });
  }
}

export function startGame() {
  console.log("startgame");
  setShowTitleScreen(false);
  document.getElementById("titlescreen").style.display = "none";
  getAudio().play();
  decreaseTimer();
  animate();
}
export function animate() {
  window.requestAnimationFrame(animate);

  BACKGROUND.update();
  SHOP.update();

  CONTEXT.fillStyle = "rgba(255, 255, 255, 0.1)";
  CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

  shouldMirror();

  ENEMY.update();
  PLAYER.update();

  playerMove();

  enemyMove();

  playerAttack();
  enemyAttack();
}

export function restartGame() {
  console.log("restartgame");
  document.getElementById("label").style.display = "none";

  PLAYER.respawn();
  ENEMY.respawn();

  restartAudio();
  clearTimeout(timerId);
  setTimer(11);
  decreaseTimer();

  document.getElementById("enemyHealth").style.width = ENEMY.health + "%";
  document.getElementById("playerHealth").style.width = PLAYER.health + "%";
}
export function clearPlayerButtonsStyles() {
  PLAYER_BUTTONS.forEach((item) => {
    item.button.style.borderColor = "white";
  });
}
export function clearEnemyButtonsStyles() {
  ENEMY_BUTTONS.forEach((item) => {
    item.button.style.borderColor = "white";
  });
}
export function clearMapsButtonsStyles() {
  MAPS.forEach((item) => {
    item.map.style.borderColor = "white";
  });
}
function shouldMirror() {
  if (PLAYER.position.x > ENEMY.position.x) {
    ENEMY.mirror = true;
    PLAYER.mirror = true;
  } else {
    ENEMY.mirror = false;
    PLAYER.mirror = false;
  }
}
function playerMove() {
  PLAYER.velocity.x = 0;
  if (KEYS.a.pressed && PLAYER.lastKey === "a") {
    PLAYER.velocity.x = -5;
    PLAYER.switchSprite("run");
  } else if (KEYS.d.pressed && PLAYER.lastKey === "d") {
    PLAYER.velocity.x = 5;
    PLAYER.switchSprite("run");
  } else {
    PLAYER.switchSprite("idle");
  }

  if (PLAYER.velocity.y < 0) {
    PLAYER.switchSprite("jump");
  } else if (PLAYER.velocity.y > 0) {
    PLAYER.switchSprite("fall");
  }
}
function enemyMove() {
  ENEMY.velocity.x = 0;
  if (KEYS.ArrowLeft.pressed && ENEMY.lastKey === "ArrowLeft") {
    ENEMY.velocity.x = -5;
    ENEMY.switchSprite("run");
  } else if (KEYS.ArrowRight.pressed && ENEMY.lastKey === "ArrowRight") {
    ENEMY.velocity.x = 5;
    ENEMY.switchSprite("run");
  } else {
    ENEMY.switchSprite("idle");
  }

  if (ENEMY.velocity.y < 0) {
    ENEMY.switchSprite("jump");
  } else if (ENEMY.velocity.y > 0) {
    ENEMY.switchSprite("fall");
  }
}
function playerAttack() {
  //PLAYER hits
  if (
    rectangularCollision({ rectangle1: PLAYER, rectangle2: ENEMY }) &&
    PLAYER.isAttacking &&
    PLAYER.frameCurrent === 4
  ) {
    ENEMY.takeHit(PLAYER.damage);
    PLAYER.isAttacking = false;
    document.getElementById("enemyHealth").style.width = ENEMY.health + "%";
  }
  //PLAYER misses
  if (PLAYER.isAttacking && PLAYER.frameCurrent === 4) {
    PLAYER.isAttacking = false;
  }
}
function enemyAttack() {
  //ENEMY hits
  if (
    rectangularCollision({ rectangle1: ENEMY, rectangle2: PLAYER }) &&
    ENEMY.isAttacking &&
    ENEMY.frameCurrent === 2
  ) {
    PLAYER.takeHit(ENEMY.damage);
    ENEMY.isAttacking = false;
    document.getElementById("playerHealth").style.width = PLAYER.health + "%";
  }
  //ENEMY misses
  if (ENEMY.isAttacking && ENEMY.frameCurrent === 2) {
    ENEMY.isAttacking = false;
  }

  if (ENEMY.health <= 0 || PLAYER.health <= 0) {
    determineWinner({ PLAYER, ENEMY, timerId });
  }
}
function getAudio() {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  return audio;
}
function restartAudio() {
  getAudio().pause();
  getAudio().currentTime = 0;
  getAudio().play();
}
