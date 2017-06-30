var cube = new Cube();
var netCanvas, netDrawer;
var perCanvas, perDrawer;
function init() {
    netCanvas = document.getElementById("cube-net-canvas");
    netDrawer = new NetDrawer(netCanvas, cube);
    perCanvas = document.getElementById("perspective-canvas");
    perDrawer = new PerspectiveDrawer(perCanvas, netDrawer);
    draw();
}
function draw() {
    requestAnimationFrame(draw);
    netDrawer.draw();
    perDrawer.draw();
}
init();
