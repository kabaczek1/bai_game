import { Fighter } from "./Fighter.mjs";

export class Hippolite extends Fighter {
  constructor(isEnemy = false) {
    super({
      imageSrc: "./img/hippolite/Idle.png",
      framesMax: 8,
      scale: 1,
      offset: {
        x: 170,
        y: 94,
      },
      sprites: {
        idle: {
          imageSrc: "./img/hippolite/Idle.png",
          framesMax: 8,
        },
        run: {
          imageSrc: "./img/hippolite/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/hippolite/Jump.png",
          framesMax: 3,
        },
        fall: {
          imageSrc: "./img/hippolite/Fall.png",
          framesMax: 3,
        },
        attack1: {
          imageSrc: "./img/hippolite/Attack1.png",
          framesMax: 5,
        },
        takeHit: {
          imageSrc: "./img/hippolite/Take Hit.png",
          framesMax: 3,
        },
        death: {
          imageSrc: "./img/hippolite/Death.png",
          framesMax: 8,
        },
      },
      attackBox: {
        offset: {
          x: 0,
          y: -20,
        },
        width: 180,
        height: 140,
      },
      attackFrame: 3,
      hitBox: {
        width: 80,
        height: 150,
      },
      damage: 20,
      isEnemy: isEnemy,
    });
  }
}
