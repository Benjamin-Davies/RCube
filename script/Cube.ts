const colors = [
  "white",
  "yellow",
  "red",
  "orange",
  "blue",
  "green"
];
const faceLetters = ['U', 'D', 'L', 'R', 'F', 'B'];

class CubeFace {
  /**
   * Constants for face ids
   */
  static UP = 0;
  static DOWN = 1;
  static LEFT = 2;
  static RIGHT = 3;
  static FRONT = 4;
  static BACK = 5;

  /**squares on the face. left to right then top to bottom. */
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

  getCenterColor() {
    return this.faces[4];
  }

  setColor(x: number, y: number, color: number) {
    var index = x + y * 3;
    if (index == 4) {
      console.error("ERROR, can not redefine the center color of a cube face.")
      return false;
    }
    this.faces[index] = color;
    return true;
  }

  getFaceInitial() {
    return faceLetters[this.getCenterColor()];
  }
}

class Cube {
  faces: CubeFace[] = [];

  getFace(faceId: number) {
    return this.faces[faceId];
  }

  constructor() {
    for (var i = 0; i < 6; i++) {
      this.faces.push(new CubeFace(i));
    }
  }
}
