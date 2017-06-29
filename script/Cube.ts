var colors = [
  "white",
  "yellow",
  "red",
  "orange",
  "blue",
  "green"
];

class CubeFace {
  /**
   * squares on the face. left to right then top to bottom.
   */
  faces: number[];

  constructor(c: number) {
    this.faces = [];
    for (var i = 0; i < 8; i++) {
      this.faces[i] = c;
    }
  }

  getColor(x: number, y: number) {
    var index = x + y * 3;
    return this.faces[index];
  }
}

class Cube {
  top: CubeFace;
  bottom: CubeFace;
  left: CubeFace;
  right: CubeFace;
  front: CubeFace;
  back: CubeFace;

  constructor() {
  this.top = new CubeFace(0);
  this.bottom = new CubeFace(1);
  this.left = new CubeFace(2);
  this.right = new CubeFace(3);
  this.front = new CubeFace(4);
  this.back = new CubeFace(5);
  }
}
