var drawFaceLetters = false;
var NetDrawer = (function () {
    function NetDrawer(canvas, cube) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.cube = cube;
    }
    NetDrawer.prototype.draw = function () {
        var width = this.canvas.width;
        var height = this.canvas.height;
        this.ctx.font = "bold 100px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "cornflowerblue";
        this.ctx.fillRect(0, 0, width, height);
        this.drawFace(120, 0, CubeFace.UP);
        this.drawFace(0, 120, CubeFace.LEFT);
        this.drawFace(120, 120, CubeFace.FRONT);
        this.drawFace(240, 120, CubeFace.RIGHT);
        this.drawFace(120, 240, CubeFace.DOWN);
        this.drawFace(120, 360, CubeFace.BACK);
    };
    NetDrawer.prototype.drawFace = function (x, y, faceId) {
        var face = cube.getFace(faceId);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x, y, 120, 120);
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.ctx.fillStyle = colors[face.getColor(i, j)];
                this.ctx.fillRect(x + i * 40 + 5, y + j * 40 + 5, 30, 30);
            }
        }
        if (drawFaceLetters) {
            this.ctx.fillStyle = "white";
            var text = face.getFaceInitial();
            this.ctx.fillText(text, x + 60, y + 60);
            this.ctx.strokeText(text, x + 60, y + 60);
        }
    };
    return NetDrawer;
}());
//# sourceMappingURL=NetDrawer.js.map