import { Fighter } from "./Fighter.mjs";

export class Ken extends Fighter {
  constructor(isEnemy = false) {
    super({
      imageSrc: "./img/junkieKen/Idle.png",
      framesMax: 8,
      scale: 1,
      offset: {
        x: 115,
        y: 55,
      },
      sprites: {
        idle: {
          imageSrc: "./img/junkieKen/Idle.png",
          framesMax: 10,
        },
        run: {
          imageSrc: "./img/junkieKen/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/junkieKen/Going Up.png",
          framesMax: 3,
        },
        fall: {
          imageSrc: "./img/junkieKen/Going Down.png",
          framesMax: 3,
        },
        attack1: {
          imageSrc: "./img/junkieKen/Attack2.png",
          framesMax: 6,
        },
        takeHit: {
          imageSrc: "./img/junkieKen/Take Hit.png",
          framesMax: 3,
        },
        death: {
          imageSrc: "./img/junkieKen/Death.png",
          framesMax: 11,
        },
      },
      attackBox: {
        offset: {
          x: -50,
          y: 10,
        },
        width: 200,
        height: 120,
      },
      attackFrame: 4,
      hitBox: {
        width: 100,
        height: 105,
      },
      damage: 40,
      isEnemy: isEnemy,
    });
  }
}
