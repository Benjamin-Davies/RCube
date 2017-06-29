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

    this.drawFace(120, 0,   cube.top);
    this.drawFace(120, 240, cube.bottom);
    this.drawFace(0,   120, cube.left);
    this.drawFace(240, 120, cube.right);
    this.drawFace(120, 120, cube.front);
    this.drawFace(120, 360, cube.back);
  }

  drawFace(x: number, y: number, face: CubeFace) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(x, y, 120, 120);

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.ctx.fillStyle = colors[face.getColor(i, j)];
        this.ctx.fillRect(x + i * 40 + 5, y + j * 40 + 5, 30, 30);
      }
    }
  }
}
