var drawFaceLetters = false;
var NetDrawer = (function () {
    function NetDrawer(canvas, cube, size) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.resize(size);
        this.cube = cube;
    }
    NetDrawer.prototype.resize = function (newSize) {
        this.canvas.width = newSize.width;
        this.canvas.height = newSize.height;
        this.faceWidth = newSize.width / 3;
        this.cellWidth = this.faceWidth / 3;
        this.borderWidth = this.cellWidth / 10;
        this.innerCellWidth = this.cellWidth - this.borderWidth * 2;
    };
    NetDrawer.prototype.draw = function () {
        var width = this.canvas.width;
        var height = this.canvas.height;
        this.ctx.font = "bold " + this.faceWidth + "px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(0, 0, width, height);
        this.drawFace(1 * this.faceWidth, 0, CubeFace.UP);
        this.drawFace(0, 1 * this.faceWidth, CubeFace.LEFT);
        this.drawFace(1 * this.faceWidth, 1 * this.faceWidth, CubeFace.FRONT);
        this.drawFace(2 * this.faceWidth, 1 * this.faceWidth, CubeFace.RIGHT);
        this.drawFace(1 * this.faceWidth, 2 * this.faceWidth, CubeFace.DOWN);
        this.drawFace(1 * this.faceWidth, 3 * this.faceWidth, CubeFace.BACK);
    };
    NetDrawer.prototype.drawFace = function (x, y, faceId) {
        var face = cube.getFace(faceId);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x, y, this.faceWidth, this.faceWidth);
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.ctx.fillStyle = colors[face.getColor(i, j)];
                this.ctx.fillRect(x + i * this.cellWidth + this.borderWidth, y + j * this.cellWidth + this.borderWidth, this.innerCellWidth, this.innerCellWidth);
            }
        }
        if (drawFaceLetters) {
            this.ctx.fillStyle = "white";
            var text = face.getFaceInitial();
            this.ctx.fillText(text, x + this.faceWidth / 2, y + this.faceWidth / 2);
            this.ctx.strokeText(text, x + this.faceWidth / 2, y + this.faceWidth / 2);
        }
    };
    return NetDrawer;
}());
//# sourceMappingURL=NetDrawer.js.map