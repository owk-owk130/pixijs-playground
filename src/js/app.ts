import * as PIXI from "pixi.js"
import gsap from "gsap"
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const MOLCAR_CONFIG = {
  x: 30,
  y: 50,
}

const PUI1_CONFIG = {
  x:20,
  y: 40,
  angle: -15
}

const PUI2_CONFIG = {
  x:220,
  y: 20,
  angle: 10
}

const molcarImage = require('../img/molcar.png')

const app = new PIXI.Application();
document.body.appendChild(app.view);
app.loader.add("molcar", molcarImage)
app.loader.load(init)

function init (loader, resources) {
  const molcar = PIXI.Sprite.from(resources.molcar.texture);
  molcar.position.set(MOLCAR_CONFIG.x, MOLCAR_CONFIG.y);
  molcar.interactive = true;
  molcar.buttonMode = true;
  const colorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
  molcar.filters = [colorMatrixFilter];
  app.stage.addChild(molcar);

  const pui1 = new PIXI.Text("pui", {
    fontFamily: "Comic Sans MS",
    fill : "#ffab18",
    fontSize: 42,
  });
  pui1.alpha = 0
  pui1.x = PUI1_CONFIG.x
  pui1.y = PUI1_CONFIG.y
  pui1.angle = PUI1_CONFIG.angle
  app.stage.addChild(pui1);

  const pui2 = new PIXI.Text("pui", {
    fontFamily: "Comic Sans MS",
    fill : "#ffab18",
    fontSize: 32,
  });
  pui2.alpha = 0
  pui2.x = PUI2_CONFIG.x
  pui2.y = PUI2_CONFIG.y
  pui2.angle = PUI2_CONFIG.angle
  app.stage.addChild(pui2);

  molcar.on('click', () => {
    puiAnim([pui1, pui2])
  })

  let flg = true
  setInterval(()=> {
    if (molcar.x > app.stage.width + molcar.width) {
      molcar.x = 0
      pui1.x = PUI1_CONFIG.x
      pui2.x = PUI2_CONFIG.x
    }
    if (flg) {
      molcar.angle = 1
      molcar.x += 30
      colorMatrixFilter.contrast(1, true)
      pui1.x += 30
      pui2.x += 30
      flg = false
    } else {
      molcar.angle = 0
      colorMatrixFilter.reset()
      flg = true
    }
  }, 200)
}

function puiAnim(els) {
  els.forEach((el, i)=> {
    gsap.to(el,{
      pixi: {
        alpha: 1,
      },
      duration: 0.5,
      delay: i * 0.3,
      onComplete() {
        el.alpha = 0
      }
    })
  })
}

