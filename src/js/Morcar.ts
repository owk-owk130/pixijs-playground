import * as PIXI from "pixi.js";

export class Morcar {
  app: PIXI.Application;
  sprite: PIXI.Sprite;
  constructor(app: PIXI.Application) {
    const morcarImage = require("../img/molcar.png");
    this.app = app;
    this.sprite = PIXI.Sprite.from(morcarImage);
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.filters = [];
    this.app.stage.addChild(this.sprite);
  }

  onClick(event: () => void) {
    this.sprite.on("click", () => {
      event();
    });
  }
}
