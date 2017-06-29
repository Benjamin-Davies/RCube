var cube = new Cube();
var netCanvas: HTMLCanvasElement, netDrawer: NetDrawer;

function init() {
  netCanvas = <HTMLCanvasElement>document.getElementById("cube-net-canvas");
  netDrawer = new NetDrawer(netCanvas, cube);

  draw();
}

function draw() {
  netDrawer.draw();
}

init();
