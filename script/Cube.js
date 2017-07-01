var colors = [
    "white",
    "yellow",
    "red",
    "orange",
    "blue",
    "green"
];
var faceLetters = ['U', 'D', 'L', 'R', 'F', 'B'];
var CubeFace = (function () {
    function CubeFace(c) {
        this.faces = [];
        for (var i = 0; i < 8; i++) {
            this.faces[i] = c;
        }
    }
    CubeFace.prototype.getColor = function (x, y) {
        var index = x + y * 3;
        return this.faces[index];
    };
    CubeFace.prototype.getCenterColor = function () {
        return this.faces[4];
    };
    CubeFace.prototype.setColor = function (x, y, color) {
        var index = x + y * 3;
        this.faces[index] = color;
    };
    CubeFace.prototype.getFaceInitial = function () {
        return faceLetters[this.getCenterColor()];
    };
    CubeFace.UP = 0;
    CubeFace.DOWN = 1;
    CubeFace.LEFT = 2;
    CubeFace.RIGHT = 3;
    CubeFace.FRONT = 4;
    CubeFace.BACK = 5;
    return CubeFace;
}());
var Cube = (function () {
    function Cube() {
        this.faces = [];
        for (var i = 0; i < 6; i++) {
            this.faces.push(new CubeFace(i));
        }
    }
    Cube.prototype.getFace = function (faceId) {
        return this.faces[faceId];
    };
    return Cube;
}());
//# sourceMappingURL=Cube.js.map