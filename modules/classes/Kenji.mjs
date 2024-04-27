import { Fighter } from "./Fighter.mjs";

export class Kenji extends Fighter {
  constructor(isEnemy = false) {
    super({
      color: "blue",
      imageSrc: "./img/kenji/Idle.png",
      framesMax: 4,
      scale: 2.5,
      offset: {
        x: 215,
        y: 169,
      },
      sprites: {
        idle: {
          imageSrc: "./img/kenji/Idle.png",
          framesMax: 4,
        },
        run: {
          imageSrc: "./img/kenji/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/kenji/Jump.png",
          framesMax: 2,
        },
        fall: {
          imageSrc: "./img/kenji/Fall.png",
          framesMax: 2,
        },
        attack1: {
          imageSrc: "./img/kenji/Attack1.png",
          framesMax: 4,
        },
        takeHit: {
          imageSrc: "./img/kenji/Take hit.png",
          framesMax: 3,
        },
        death: {
          imageSrc: "./img/kenji/Death.png",
          framesMax: 7,
        },
      },
      attackBox: {
        offset: {
          x: -170,
          y: 50,
        },
        width: 170,
        height: 50,
      },
      isEnemy: isEnemy,
    });
  }
}
