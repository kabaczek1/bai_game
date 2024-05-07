import {
  CANVAS,
  ENEMY,
  ENEMY_NAME,
  KEYS,
  PLAYER,
  PLAYER_NAME,
  setGameState,
  GAME_STATE,
  setTimer,
  BACKGROUND,
  TIMER,
  CONTEXT,
  SHOP,
  PLAYER_BUTTONS,
  ENEMY_BUTTONS,
  MAPS,
} from "./globals.mjs";

let timerId;
let gameRunning = false;
let winner = false;
const audio = document.querySelector("#bg-music");
audio.volume = 0.5;
audio.loop = true;

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
function sayMyName(name) {
  let nameAudio;
  switch (name) {
    case "Samurai Hack":
      nameAudio = document.querySelector("#player-choice-hack-music");
      break;
    case "Kenji":
      nameAudio = document.querySelector("#player-choice-kenji-music");
      break;
    case "Junkie Ken":
      nameAudio = document.querySelector("#player-choice-ken-music");
      break;
    case "Joe Ice":
      nameAudio = document.querySelector("#player-choice-joe-music");
      break;
    case "Hippolite":
      nameAudio = document.querySelector("#player-choice-hippolite-music");
      break;
  }
  return new Promise(res=>{
    nameAudio.play()
    nameAudio.onended = res
  })
}
async function sayWins(name) {
  await sayMyName(name)
  const winsAudio = document.querySelector("#wins");
  return new Promise(res=>{
    winsAudio.play()
    winsAudio.onended = res
  })
}

export async function determineWinner({ PLAYER, ENEMY, timerId }) {
  clearTimeout(timerId);
  if (!winner) {
    winner = true;
    document.getElementById("label").style.display = "flex";
    if (PLAYER.health === ENEMY.health) {
      document.getElementById("labelText").innerHTML = "tie";
    } else if (PLAYER.health > ENEMY.health) {
      document.getElementById("labelText").innerHTML = PLAYER_NAME + " wins!";
      ENEMY.canMove = false;
      ENEMY.switchSprite("death");
      document.getElementById("enemyHealth").style.width = 0 + "%";
      if (GAME_STATE === 1) {
        document.getElementById("round-1-player").className = "round-won-filled"
        setGameState(2)
      }
      else if (GAME_STATE === 3 || (GAME_STATE === 2 && document.getElementById("round-1-enemy").className === "round-won")) {
        document.getElementById("round-2-player").className = "round-won-filled"
        setGameState(4)
      }
      else {
        document.getElementById("round-1-player").className = "round-won-filled"
        setGameState(3)
      }
      await sayWins(PLAYER_NAME)
    } else if (PLAYER.health < ENEMY.health) {
      document.getElementById("labelText").innerHTML = ENEMY_NAME + " wins!";
      PLAYER.canMove = false;
      PLAYER.switchSprite("death");
      document.getElementById("playerHealth").style.width = 0 + "%";
      if (GAME_STATE === 1) {
        document.getElementById("round-1-enemy").className = "round-won-filled"
        setGameState(2)
      }
      else if (GAME_STATE === 3 || (GAME_STATE === 2 && document.getElementById("round-1-player").className === "round-won")) {
        document.getElementById("round-2-enemy").className = "round-won-filled"
        setGameState(4)
      }
      else {
        document.getElementById("round-1-enemy").className = "round-won-filled"
        setGameState(3)
      }
      await sayWins(ENEMY_NAME)
    }
  }
}
export function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (TIMER > 0 && gameRunning) {
    setTimer(TIMER - 1);
    document.getElementById("timer").innerHTML = TIMER;
  }
  if (TIMER == 0) {
    determineWinner({ PLAYER, ENEMY, timerId });
  }
}
function sayRound() {
  let roundAudio;
  switch (GAME_STATE) {
    case 1:
      roundAudio = document.querySelector("#round-1");
      break;
    case 2:
      roundAudio = document.querySelector("#round-2");
      break;
    case 3:
      roundAudio = document.querySelector("#round-3");
      break;
  }
  return new Promise(res=>{
    roundAudio.play()
    roundAudio.onended = res
  })
}
async function doTheAnnouncing() {
  await sayRound();
  const fightAudio = document.querySelector("#music-fight");
  return new Promise(res=>{
    fightAudio.play()
    fightAudio.onended = res
  })
}
export async function startGame() {
  setGameState(1);
  document.getElementById("titlescreen").style.display = "none";
  animate();
  await doTheAnnouncing()
  gameRunning = true;
  setTimer(21);
  decreaseTimer();
  audio.play();
}
export function animate() {
  window.requestAnimationFrame(animate);

  BACKGROUND.update();
  SHOP.update();

  CONTEXT.fillStyle = "rgba(255, 255, 255, 0.1)";
  CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

  shouldMirror();

  if (gameRunning) {
    playerMove();

    enemyMove();
  
    playerAttack();
    enemyAttack();
  }
  
  ENEMY.update();
  PLAYER.update();
}
export async function restartGame() {
  audio.pause()
  if (GAME_STATE === 4) {
    location.reload()
  }
  else {
    document.getElementById("label").style.display = "none";
  
    PLAYER.respawn();
    ENEMY.respawn();
      
    document.getElementById("enemyHealth").style.width = ENEMY.health + "%";
    document.getElementById("playerHealth").style.width = PLAYER.health + "%";
    gameRunning = false;
    await doTheAnnouncing()
    gameRunning = true;
  
    clearTimeout(timerId);
    setTimer(21);
    decreaseTimer();
    audio.play();
    winner = false;
  }
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
    if (ENEMY.canMove) ENEMY.mirror = false;
    if (PLAYER.canMove) PLAYER.mirror = true;
  } else {
    if (ENEMY.canMove) ENEMY.mirror = true;
    if (PLAYER.canMove) PLAYER.mirror = false;
  }
}
function playerMove() {
  PLAYER.velocity.x = 0;
  if (KEYS.a.pressed && PLAYER.lastKey === "a") {
    PLAYER.velocity.x = -8;
    PLAYER.switchSprite("run");
  } else if (KEYS.d.pressed && PLAYER.lastKey === "d") {
    PLAYER.velocity.x = 8;
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
    ENEMY.velocity.x = -8;
    ENEMY.switchSprite("run");
  } else if (KEYS.ArrowRight.pressed && ENEMY.lastKey === "ArrowRight") {
    ENEMY.velocity.x = 8;
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
    PLAYER.frameCurrent === PLAYER.attackFrame
  ) {
    ENEMY.takeHit(PLAYER.damage);
    PLAYER.isAttacking = false;
    document.getElementById("enemyHealth").style.width = ENEMY.health + "%";
  }
  //PLAYER misses
  if (PLAYER.isAttacking && PLAYER.frameCurrent === PLAYER.attackFrame) {
    PLAYER.isAttacking = false;
  }
}
function enemyAttack() {
  //ENEMY hits
  if (
    rectangularCollision({ rectangle1: ENEMY, rectangle2: PLAYER }) &&
    ENEMY.isAttacking &&
    ENEMY.frameCurrent === ENEMY.attackFrame
  ) {
    PLAYER.takeHit(ENEMY.damage);
    ENEMY.isAttacking = false;
    document.getElementById("playerHealth").style.width = PLAYER.health + "%";
  }
  //ENEMY misses
  if (ENEMY.isAttacking && ENEMY.frameCurrent === ENEMY.attackFrame) {
    ENEMY.isAttacking = false;
  }

  if (ENEMY.health <= 0 || PLAYER.health <= 0) {
    determineWinner({ PLAYER, ENEMY, timerId });
  }
}