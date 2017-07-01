var COUNTER_CLOCKWISE = 1;
var FULL_TURN = 2;
var CLOCKWISE = 3;
function rotateArray(a1, amount) {
    var a2 = [], k = a1.length;
    for (var i = 0; i < k; i++) {
        a2[i] = a1[(i + amount) % k];
    }
    return a2;
}
function rotateFace(face, direction) {
    var a = [
        face.getColor(0, 0),
        face.getColor(1, 0),
        face.getColor(2, 0),
        face.getColor(2, 1),
        face.getColor(2, 2),
        face.getColor(1, 2),
        face.getColor(0, 2),
        face.getColor(0, 1)
    ];
    a = rotateArray(a, 2 * direction);
    face.setColor(0, 0, a[0]);
    face.setColor(1, 0, a[1]);
    face.setColor(2, 0, a[2]);
    face.setColor(2, 1, a[3]);
    face.setColor(2, 2, a[4]);
    face.setColor(1, 2, a[5]);
    face.setColor(0, 2, a[6]);
    face.setColor(0, 1, a[7]);
}
var uFaceRotator = function (cube, direction) {
    rotateFace(cube.getFace(CubeFace.UP), direction);
    var l = cube.getFace(CubeFace.LEFT);
    var r = cube.getFace(CubeFace.RIGHT);
    var u = cube.getFace(CubeFace.BACK);
    var d = cube.getFace(CubeFace.FRONT);
    var a = [
        u.getColor(0, 2),
        u.getColor(1, 2),
        u.getColor(2, 2),
        r.getColor(2, 0),
        r.getColor(1, 0),
        r.getColor(0, 0),
        d.getColor(2, 0),
        d.getColor(1, 0),
        d.getColor(0, 0),
        l.getColor(2, 0),
        l.getColor(1, 0),
        l.getColor(0, 0)
    ];
    a = rotateArray(a, direction * 3);
    u.setColor(0, 2, a[0]);
    u.setColor(1, 2, a[1]);
    u.setColor(2, 2, a[2]);
    r.setColor(2, 0, a[3]);
    r.setColor(1, 0, a[4]);
    r.setColor(0, 0, a[5]);
    d.setColor(2, 0, a[6]);
    d.setColor(1, 0, a[7]);
    d.setColor(0, 0, a[8]);
    l.setColor(2, 0, a[9]);
    l.setColor(1, 0, a[10]);
    l.setColor(0, 0, a[11]);
};
var dFaceRotator = function (cube, direction) {
    rotateFace(cube.getFace(CubeFace.DOWN), direction);
    var l = cube.getFace(CubeFace.LEFT);
    var r = cube.getFace(CubeFace.RIGHT);
    var u = cube.getFace(CubeFace.FRONT);
    var d = cube.getFace(CubeFace.BACK);
    var a = [
        u.getColor(0, 2),
        u.getColor(1, 2),
        u.getColor(2, 2),
        r.getColor(2, 2),
        r.getColor(1, 2),
        r.getColor(0, 2),
        d.getColor(2, 0),
        d.getColor(1, 0),
        d.getColor(0, 0),
        l.getColor(2, 2),
        l.getColor(1, 2),
        l.getColor(0, 2)
    ];
    a = rotateArray(a, direction * 3);
    u.setColor(0, 2, a[0]);
    u.setColor(1, 2, a[1]);
    u.setColor(2, 2, a[2]);
    r.setColor(2, 2, a[3]);
    r.setColor(1, 2, a[4]);
    r.setColor(0, 2, a[5]);
    d.setColor(2, 0, a[6]);
    d.setColor(1, 0, a[7]);
    d.setColor(0, 0, a[8]);
    l.setColor(2, 2, a[9]);
    l.setColor(1, 2, a[10]);
    l.setColor(0, 2, a[11]);
};
//# sourceMappingURL=FaceRotator.js.map