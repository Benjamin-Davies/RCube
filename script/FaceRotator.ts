const CLOCKWISE = 1;
const FULL_TURN = 2;
const COUNTER_CLOCKWISE = 3;

type FaceRotator = (cube: Cube, direction: number) => boolean;

function rotateFace(face: CubeFace, direction: number) {
  for (var i = 0; i < direction; i++) {
    var tl = face.getColor(0, 0);
    var tc = face.getColor(1, 0);
    var tr = face.getColor(2, 0);
    var mr = face.getColor(2, 1);
    var br = face.getColor(2, 2);
    var bc = face.getColor(1, 2);
    var bl = face.getColor(0, 2);
    var ml = face.getColor(0, 1);
    face.setColor(0, 0, bl);
    face.setColor(1, 0, ml);
    face.setColor(2, 0, tl);
    face.setColor(2, 1, tc);
    face.setColor(2, 2, tr);
    face.setColor(1, 2, mr);
    face.setColor(0, 2, br);
    face.setColor(0, 1, bc);
  }
}

var topFaceRotator = <FaceRotator>(cube: Cube, direction: number) => {
  var left    = cube.getFace(CubeFace.LEFT);
  var right   = cube.getFace(CubeFace.RIGHT);
  var up      = cube.getFace(CubeFace.BACK);
  var down    = cube.getFace(CubeFace.FRONT);
  var array1: number[] = [
  ];
};
