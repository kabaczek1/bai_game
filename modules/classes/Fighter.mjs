import { Sprite } from "./Sprite.mjs";
import { CANVAS, GRAVITY } from "../globals.mjs";

export class Fighter extends Sprite {
  constructor({
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    mirror,
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    hitBox = { width: 50, height: 150 },
    damage = 20,
    isEnemy = false,
  }) {
    super({
      position: { x: isEnemy ? 844 : 100, y: 200 },
      imageSrc,
      scale,
      framesMax,
      offset,
      mirror,
    });
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;

    this.velocity = velocity;
    this.width = hitBox.width;
    this.height = hitBox.height;
    this.lastKey;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.sprites = sprites;
    this.dead = false;
    this.canMove = true;
    this.damage = damage;
    this.isEnemy = isEnemy;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  respawn() {
    this.position = { x: this.isEnemy ? 844 : 100, y: 200 };
    this.health = 100;
    this.isAttacking = false;
    this.dead = false;
    this.image = this.sprites.idle.image;
    this.canMove = true;
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    if (this.mirror && this.attackBox.offset.x > 0)
      this.attackBox.position.x = this.position.x - 2 * this.attackBox.offset.x;
    else if (this.mirror && this.attackBox.offset.x < 0)
      this.attackBox.position.x = this.position.x + this.width;
    else this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // //attack box
    // CONTEXT.fillStyle = "black";
    // CONTEXT.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    // //hitbox
    // CONTEXT.fillStyle = "red";
    // CONTEXT.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= CANVAS.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += GRAVITY;
    }

    if (this.position.x <= 0) this.position.x = 0;
    if (this.position.x >= CANVAS.width - this.width)
      this.position.x = CANVAS.width - this.width;
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  takeHit(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.canMove = false;
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    //death
    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }
    //attack
    if (
      this.image === this.sprites.attack1.image &&
      this.frameCurrent < this.sprites.attack1.framesMax - 1
    )
      return;
    //take hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.frameCurrent < this.sprites.takeHit.framesMax - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image != this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.image != this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image != this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "fall":
        if (this.image != this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image != this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image != this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.frameCurrent = 0;
        }
        break;
      case "death":
        if (this.image != this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
