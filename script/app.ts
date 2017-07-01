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

function draw() {
  requestAnimationFrame(draw);
  perDrawer.draw();
}

init();
