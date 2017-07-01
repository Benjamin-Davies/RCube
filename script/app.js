var cube = new Cube();
var netCanvas, netDrawer;
var perCanvas, perDrawer;
function init() {
    netCanvas = document.getElementById("cube-net-canvas");
    netDrawer = new NetDrawer(netCanvas, cube);
    perCanvas = document.getElementById("perspective-canvas");
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
//# sourceMappingURL=app.js.map