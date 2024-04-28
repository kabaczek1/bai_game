import { Fighter } from "./Fighter.mjs";

export class Samuraj extends Fighter {
  constructor(isEnemy = false) {
    super({
      imageSrc: "./img/samuraiMack/Idle.png",
      framesMax: 8,
      scale: 2.5,
      offset: {
        x: 215,
        y: 157,
      },
      sprites: {
        idle: {
          imageSrc: "./img/samuraiMack/Idle.png",
          framesMax: 8,
        },
        run: {
          imageSrc: "./img/samuraiMack/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/samuraiMack/Jump.png",
          framesMax: 2,
        },
        fall: {
          imageSrc: "./img/samuraiMack/Fall.png",
          framesMax: 2,
        },
        attack1: {
          imageSrc: "./img/samuraiMack/Attack1.png",
          framesMax: 6,
        },
        takeHit: {
          imageSrc: "./img/samuraiMack/Take Hit.png",
          framesMax: 4,
        },
        death: {
          imageSrc: "./img/samuraiMack/Death.png",
          framesMax: 6,
        },
      },
      attackBox: {
        offset: {
          x: 100,
          y: 50,
        },
        width: 160,
        height: 50,
      },
      hitBox: {
        width: 65,
        height: 150,
      },
      damage: 30,
      isEnemy: isEnemy,
    });
  }
}
