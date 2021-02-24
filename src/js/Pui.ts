import * as PIXI from "pixi.js"
import gsap from "gsap"
import {PixiPlugin} from "gsap/PixiPlugin"
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export type textConfig = {
  x: number
  y: number
  angle: number
}
export class Pui {
  app: PIXI.Application
  text: PIXI.Text
  config: textConfig
  constructor(app: PIXI.Application, config: textConfig) {
    this.app = app;
    this.config = config
    this.text = new PIXI.Text("pui", {
      fontFamily: "Comic Sans MS",
      fill : "#ffab18",
      fontSize: 42,
    });
    this.text.alpha = 0;
    this.text.x = this.config.x;
    this.text.y = this.config.y;
    this.text.angle = this.config.angle;
    app.stage.addChild(this.text);
  }
  puipui(i) {
    const text = this.text;
    gsap.to(text,{
      pixi: {
        alpha: 1,
      },
      duration: 0.5,
      delay: i * 0.3,
      onComplete() {
        text.alpha = 0
      }
    })
  }
}
