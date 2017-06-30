/**
 * The source code for the vertex shader
 */
var vertexShaderText = "\nprecision mediump float;\n\nattribute vec3 vertPosition;\nattribute vec3 vertColor;\nvarying vec3 fragColor;\n\nvoid main()\n{\n  fragColor = vertColor;\n  gl_Position = vec4(vertPosition, 1.0);\n}\n";
/**
 * The source code for the fragment shader
 */
var fragmentShaderText = "\nprecision mediump float;\n\nvarying vec3 fragColor;\n\nvoid main()\n{\n  gl_FragColor = vec4(fragColor, 1.0);\n}\n";
/**
 * Class to manage drawing the 3d perspective view of the rubiks cube
 */
var PerspectiveDrawer = (function () {
    function PerspectiveDrawer(canvas, net) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl");
        if (!this.gl)
            this.gl = this.canvas.getContext("experimental-webgl");
        if (!this.gl) {
            alert("Failed to intialize 3d pespective.");
            return;
        }
        if (!this.initGL()) {
            alert("Something went wrong with the 3d perspective, you should still be able to use the net view.");
        }
    }
    /**
     * Initializes all webgl objects that we will need
     * returns true is succeded, otherwise false
     */
    PerspectiveDrawer.prototype.initGL = function () {
        // create a local variable to store gl to shorten statements
        var gl = this.gl;
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
        this.program = program;
        /**
         * Create buffer
         */
        var vertices = [
            //x     y    z    r    g    b
            0.0, 0.5, 0.0, 1.0, 0.0, 0.0,
            -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.0, 0.0, 0.0, 1.0
        ];
        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        /**Position attribute */
        var positionAttribLoc = gl.getAttribLocation(program, "vertPosition");
        gl.vertexAttribPointer(positionAttribLoc, 3, gl.FLOAT, // type of element
        false, 6 * Float32Array.BYTES_PER_ELEMENT, // size of vertex
        0 // offset from begining of vertex
        );
        gl.enableVertexAttribArray(positionAttribLoc);
        /**Color attribute */
        var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
        gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, // type of element
        false, 6 * Float32Array.BYTES_PER_ELEMENT, // size of vertex
        3 * Float32Array.BYTES_PER_ELEMENT // offset from begining of vertex
        );
        gl.enableVertexAttribArray(colorAttribLocation);
        return true;
    };
    /**
     * Draws the cube
     */
    PerspectiveDrawer.prototype.draw = function () {
        if (!this.gl || !this.program)
            return;
        this.gl.clearColor(0.4, 0.61, 0.94, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    };
    return PerspectiveDrawer;
}());
