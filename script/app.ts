var cube = new Cube();
var netCanvas: HTMLCanvasElement, netDrawer: NetDrawer;
var perCanvas: HTMLCanvasElement, perDrawer: PerspectiveDrawer;

function init() {
  netCanvas = <HTMLCanvasElement>document.getElementById("cube-net-canvas");
  netDrawer = new NetDrawer(netCanvas, cube);

  perCanvas = <HTMLCanvasElement>document.getElementById("perspective-canvas");
  perDrawer = new PerspectiveDrawer(perCanvas, netDrawer);

  draw();
}

function draw() {
  netDrawer.draw();
  perDrawer.draw();
}

init();
