var cube = new Cube();
var netCanvas: HTMLCanvasElement, netDrawer: NetDrawer;
var perCanvas: HTMLCanvasElement, perDrawer: PerspectiveDrawer;

function init() {
  netCanvas = <HTMLCanvasElement>document.getElementById("cube-net-canvas");
  netDrawer = new NetDrawer(netCanvas, cube);

  perCanvas = <HTMLCanvasElement>document.getElementById("perspective-canvas");
  perDrawer = new PerspectiveDrawer(perCanvas);

  refresh();
  draw();
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
