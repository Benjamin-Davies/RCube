var colors = [
    "white",
    "yellow",
    "red",
    "orange",
    "blue",
    "green"
];
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
    return CubeFace;
}());
var Cube = (function () {
    function Cube() {
        this.top = new CubeFace(0);
        this.bottom = new CubeFace(1);
        this.left = new CubeFace(2);
        this.right = new CubeFace(3);
        this.front = new CubeFace(4);
        this.back = new CubeFace(5);
    }
    return Cube;
}());
//# sourceMappingURL=Cube.js.map