var cube = new Cube();
var netCanvas, netDrawer;
var perCanvas, perDrawer;
function calculateCanvasSize() {
    var innerMin = Math.min(innerWidth, innerHeight);
    return {
        width: innerMin / 2,
        height: innerMin * 4 / 6
    };
}
function init() {
    addEventListener("resize", resize);
    var size = calculateCanvasSize();
    netCanvas = document.getElementById("cube-net-canvas");
    netDrawer = new NetDrawer(netCanvas, cube, size);
    perCanvas = document.getElementById("perspective-canvas");
    perDrawer = new PerspectiveDrawer(perCanvas, size);
    refresh();
    draw();
}
function resize() {
    if (!netDrawer || !perDrawer)
        return;
    var size = calculateCanvasSize();
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
//# sourceMappingURL=app.js.map