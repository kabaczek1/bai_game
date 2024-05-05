import { Fighter } from "./Fighter.mjs";

export class Samuraj extends Fighter {
  constructor(isEnemy = false) {
    super({
      imageSrc: "./img/samuraiHack/Idle.png",
      framesMax: 8,
      scale: 1,
      offset: {
        x: 215,
        y: 157,
      },
      sprites: {
        idle: {
          imageSrc: "./img/samuraiHack/Idle.png",
          framesMax: 8,
        },
        run: {
          imageSrc: "./img/samuraiHack/Run.png",
          framesMax: 8,
        },
        jump: {
          imageSrc: "./img/samuraiHack/Jump.png",
          framesMax: 2,
        },
        fall: {
          imageSrc: "./img/samuraiHack/Fall.png",
          framesMax: 2,
        },
        attack1: {
          imageSrc: "./img/samuraiHack/Attack1.png",
          framesMax: 6,
        },
        takeHit: {
          imageSrc: "./img/samuraiHack/Take Hit.png",
          framesMax: 4,
        },
        death: {
          imageSrc: "./img/samuraiHack/Death.png",
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
      attackFrame: 4,
      hitBox: {
        width: 65,
        height: 150,
      },
      damage: 30,
      isEnemy: isEnemy,
    });
  }
}
