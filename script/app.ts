import { Cube } from './Cube';
import NetDrawer from './NetDrawer';
import PerspectiveDrawer from './PerspectiveDrawer';

var cube = new Cube();
var netCanvas: HTMLCanvasElement, netDrawer: NetDrawer;
var perCanvas: HTMLCanvasElement, perDrawer: PerspectiveDrawer;

function calculateCanvasSize(): Size {
  var innerMin = Math.min(innerWidth, innerHeight);
  return {
    width: innerMin / 2,
    height: innerMin * 4 / 6
  };
}

function init() {
  addEventListener("resize", resize);

  const size = calculateCanvasSize();

  netCanvas = <HTMLCanvasElement>document.getElementById("cube-net-canvas");
  netDrawer = new NetDrawer(netCanvas, cube, size);

  perCanvas = <HTMLCanvasElement>document.getElementById("perspective-canvas");
  perDrawer = new PerspectiveDrawer(perCanvas, size);

  refresh();
  draw();
}

function resize() {
  if (!netDrawer || !perDrawer)
    return;

  const size = calculateCanvasSize();

  netDrawer.resize(size);
  perDrawer.resize(size);

  refresh();
}

function refresh() {
  netDrawer.draw();
  perDrawer.setTexture(netCanvas);
}

var lastFrame = 0;
function draw() {
  requestAnimationFrame(draw);
  var t = performance.now() / 1000.0;
  perDrawer.draw(t - lastFrame);
  lastFrame = t;
}

init();
