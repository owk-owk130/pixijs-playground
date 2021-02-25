import * as PIXI from 'pixi.js';
import { Morcar } from './Morcar';
import { Pui } from './Pui';

const MORCAR_CONFIG = {
  x: 30,
  y: 50,
};

const PUI1_CONFIG = {
  x: 20,
  y: 40,
  angle: -15,
};

const PUI2_CONFIG = {
  x: 220,
  y: 20,
  angle: 10,
};

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// pixiアプリケーションの作成
const app = new PIXI.Application({ width: WIDTH, height: HEIGHT });
document.body.appendChild(app.view);

// モルカースプライトの作成
const morcar = new Morcar(app);
morcar.sprite.position.set(MORCAR_CONFIG.x, MORCAR_CONFIG.y);
const colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
morcar.sprite.filters.push(colorMatrixFilter);

// PUIスプライト の作成
const pui1 = new Pui(app, PUI1_CONFIG);
const pui2 = new Pui(app, PUI2_CONFIG);

// PUIPUIアニメーション
function puiAnim(els: Pui[]) {
  els.forEach((el: Pui, i: number) => {
    el.puipui(i);
  });
}
const event = () => puiAnim([pui1, pui2]);
morcar.onClick(event);

// 移動アニメーション
let flg = true;
setInterval(() => {
  if (flg) {
    if (morcar.sprite.x > morcar.app.view.width + morcar.sprite.width) {
      morcar.sprite.x = -morcar.sprite.width;
    }
    morcar.sprite.x += 30;
    morcar.sprite.angle = 1;
    colorMatrixFilter.contrast(1, true);
    pui1.text.x += 30;
    pui2.text.x += 30;
    flg = false;
  } else {
    morcar.sprite.angle = 0;
    colorMatrixFilter.reset();
    flg = true;
  }
}, 200);
