import * as PIXI from "pixi.js"
import { Morcar } from "./Morcar"
import { RGBSplitFilter } from "pixi-filters"

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// pixiアプリケーションの作成
const app = new PIXI.Application({width: WIDTH, height: HEIGHT});
document.body.appendChild(app.view);

// モルカースプライトの作成
const morcar = new Morcar(app);
morcar.sprite.position.set((WIDTH / 2) - (morcar.sprite.width / 2), (HEIGHT / 2) - (morcar.sprite.height / 2));

// RGBSplitFilter
const rGBSplitFilter = new RGBSplitFilter();
morcar.sprite.filters.push(rGBSplitFilter);

// DisplacementFilter
const displacementImage = require('../img/displacement_map_repeat.jpg');
const displacementSprite = PIXI.Sprite.from(displacementImage);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementFilter.padding = 50;
displacementFilter.scale.x = 130;
displacementFilter.scale.y = 120;
displacementSprite.position = morcar.sprite.position;
morcar.sprite.filters.push(displacementFilter);
app.stage.addChild(displacementSprite);

// Ticker
app.ticker.add(() => {
  displacementSprite.x++;
  if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
})
