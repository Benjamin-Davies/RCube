const faceLetters = ['U', 'D', 'L', 'R', 'F', 'B'];
var drawFaceLetters = false;

class NetDrawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  cube: Cube;

  constructor(canvas: HTMLCanvasElement, cube: Cube) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.cube = cube;
  }

  draw() {
    var width = this.canvas.width;
    var height = this.canvas.height;

    this.ctx.font = "bold 100px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillStyle = "cornflowerblue";
    this.ctx.fillRect(0, 0, width, height);

    this.drawFace(120, 0,   cube.top,    0);
    this.drawFace(120, 240, cube.bottom, 1);
    this.drawFace(0,   120, cube.left,   2);
    this.drawFace(240, 120, cube.right,  3);
    this.drawFace(120, 120, cube.front,  4);
    this.drawFace(120, 360, cube.back,   5);
  }

  drawFace(x: number, y: number, face: CubeFace, faceId: number) {
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
      this.ctx.fillText(faceLetters[faceId], x + 60, y + 60);
      this.ctx.strokeText(faceLetters[faceId], x + 60, y + 60);
    }
  }
}
