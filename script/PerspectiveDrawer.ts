/**
 * The source code for the vertex shader
 */
const vertexShaderText = `
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;

varying vec2 fragTexCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

void main()
{
  fragTexCoord = vertTexCoord;
  gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(vertPosition, 1.0);
}
`;

/**
 * The source code for the fragment shader
 */
const fragmentShaderText = `
precision mediump float;

varying vec2 fragTexCoord;

uniform sampler2D sampler;

void main()
{
  gl_FragColor = texture2D(sampler, fragTexCoord);
}
`;

const identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);

/**
 * Class to manage drawing the 3d perspective view of the rubiks cube
 */
class PerspectiveDrawer {
  canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private angle: number;
  private modelMatrix: Float32Array;
  private modelMatrixUniformLoc: WebGLUniformLocation;
  private numberOfIndices: number;
  private texture: WebGLTexture;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl");
    if (!this.gl)
      this.gl = this.canvas.getContext("experimental-webgl");
    if (!this.gl) {
      alert("Failed to intialize 3d pespective.");
      return;
    }

    if (!this.initGL()) {
      alert("Something went wrong with the 3d perspective, you should still be able to use the net view.")
    }
  }

  /**
   * Initializes all webgl objects that we will need
   * returns true is succeded, otherwise false
   */
  private initGL(): boolean {
    // create a local variable to store gl to shorten statements
    var gl = this.gl;

    /**
     * Enable a couple of things
     */
    gl.enable(gl.DEPTH_TEST);
    // gl.enable(gl.CULL_FACE);
    // gl.frontFace(gl.CCW);

    /**
     * Create and compile shaders
     */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error("Error compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
      return false;
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error("Error compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
      return false;
    }

    /**
     * Create graphics program
     */
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log("Error linking shaders!", gl.getProgramInfoLog(program));
      return false;
    }
    gl.useProgram(program);
    this.program = program;

    /**
     * Create buffer
     */
    var vertices = [
      // these correspond to the vertices on the net
      // row 0
      -1,  1,  1,   0.334, 0.0,
       1,  1,  1,   0.666, 0.0,
      // row 1
      -1,  1,  1,   0.000, 0.25,
      -1,  1, -1,   0.334, 0.25,
       1,  1, -1,   0.666, 0.25,
       1,  1,  1,   1.000, 0.25,
      // row 2
      -1, -1,  1,   0.000, 0.5,
      -1, -1, -1,   0.334, 0.5,
       1, -1, -1,   0.666, 0.5,
       1, -1,  1,   1.000, 0.5,
      // row 3
      -1, -1,  1,   0.334, 0.75,
       1, -1,  1,   0.666, 0.75,
      // row 4
      -1,  1,  1,   0.334, 1.0,
       1,  1,  1,   0.666, 1.0
    ];
    var indices = [
      // these are the faces of the cube
      // top
      0, 3, 1,
      3, 4, 1,
      // bottom
      7, 10, 8,
      10, 11, 8,
      // left
      2, 6, 3,
      6, 7, 3,
      // right
      4, 8, 5,
      8, 9, 5,
      // front
      3, 7, 4,
      7, 8, 4,
      // back
      10, 12, 11,
      12, 13, 11
    ];
    this.numberOfIndices = indices.length;

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    /**Position attribute */
    var positionAttribLoc = gl.getAttribLocation(program, "vertPosition");
    gl.vertexAttribPointer(
      positionAttribLoc,
      3,
      gl.FLOAT, // type of element
      false,
      5 * Float32Array.BYTES_PER_ELEMENT, // size of vertex
      0 // offset from begining of vertex
    );
    gl.enableVertexAttribArray(positionAttribLoc);

    /**Color attribute */
    var texCoordLocation = gl.getAttribLocation(program, "vertTexCoord");
    gl.vertexAttribPointer(
      texCoordLocation,
      2,
      gl.FLOAT, // type of element
      false,
      5 * Float32Array.BYTES_PER_ELEMENT, // size of vertex
      3 * Float32Array.BYTES_PER_ELEMENT // offset from begining of vertex
    );
    gl.enableVertexAttribArray(texCoordLocation);

    /**
     * Matrices
     */
    var modelMatrixUniformLocation = gl.getUniformLocation(program, "modelMatrix");
    var viewMatrixUniformLocation = gl.getUniformLocation(program, "viewMatrix");
    var projMatrixUniformLocation = gl.getUniformLocation(program, "projMatrix");

    var modelMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(modelMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, Math.PI / 4, 1, 0.1, 1000.0);

    gl.uniformMatrix4fv(modelMatrixUniformLocation, false, modelMatrix);
    gl.uniformMatrix4fv(viewMatrixUniformLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniformLocation, false, projMatrix);

    this.modelMatrix = modelMatrix;
    this.modelMatrixUniformLoc = modelMatrixUniformLocation;

    return true;
  }

  /**
   * Sets the texture
   */
  setTexture(tex: HTMLCanvasElement) {
    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
      tex
      );

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }

  /**
   * Draws the cube
   */
  draw() {
    if (!this.gl || !this.program) return;

    this.angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    mat4.rotate(this.modelMatrix, identityMatrix, this.angle / 4, [1, 0, 0]);
    mat4.rotate(this.modelMatrix, this.modelMatrix, this.angle, [0, 0, 1]);
    this.gl.uniformMatrix4fv(this.modelMatrixUniformLoc, false, this.modelMatrix);

    this.gl.clearColor(0.4, 0.61, 0.94, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.drawElements(this.gl.TRIANGLES, this.numberOfIndices, this.gl.UNSIGNED_SHORT, 0);
  }
}
