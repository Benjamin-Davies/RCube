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
var lastFrame = 0;
function draw() {
    requestAnimationFrame(draw);
    var t = performance.now() / 1000.0;
    perDrawer.draw(t - lastFrame);
    lastFrame = t;
}
init();
//# sourceMappingURL=app.js.map