import { Fighter } from "./Fighter.mjs";

export class Joe extends Fighter {
  constructor(isEnemy = false) {
    super({
      imageSrc: "./img/joeIce/Idle.png",
      framesMax: 10,
      scale: 1,
      offset: {
        x: 180,
        y: 104,
      },
      sprites: {
        idle: {
          imageSrc: "./img/joeIce/Idle.png",
          framesMax: 10,
        },
        run: {
          imageSrc: "./img/joeIce/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/joeIce/Jump.png",
          framesMax: 3,
        },
        fall: {
          imageSrc: "./img/joeIce/Fall.png",
          framesMax: 3,
        },
        attack1: {
          imageSrc: "./img/joeIce/Attack3.png",
          framesMax: 8,
        },
        takeHit: {
          imageSrc: "./img/joeIce/Take Hit.png",
          framesMax: 3,
        },
        death: {
          imageSrc: "./img/joeIce/Death.png",
          framesMax: 7,
        },
      },
      attackBox: {
        offset: {
          x: 70,
          y: 30,
        },
        width: 80,
        height: 100,
      },
      attackFrame: 4,
      hitBox: {
        width: 80,
        height: 150,
      },
      damage: 50,
      isEnemy: isEnemy,
    });
  }
}
