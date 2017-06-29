var cube = new Cube();
var netCanvas, netDrawer;
function init() {
    netCanvas = document.getElementById("cube-net-canvas");
    netDrawer = new NetDrawer(netCanvas, cube);
    draw();
}
function draw() {
    netDrawer.draw();
}
init();
