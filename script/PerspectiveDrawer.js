var vertexShaderText = "\nprecision mediump float;\n\nattribute vec3 vertPosition;\nattribute vec2 vertTexCoord;\n\nvarying vec2 fragTexCoord;\n\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projMatrix;\n\nvoid main()\n{\n  fragTexCoord = vertTexCoord;\n  gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(vertPosition, 1.0);\n}\n";
var fragmentShaderText = "\nprecision mediump float;\n\nvarying vec2 fragTexCoord;\n\nuniform sampler2D sampler;\n\nvoid main()\n{\n  gl_FragColor = texture2D(sampler, fragTexCoord);\n}\n";
var identityMatrix = new Float32Array(16);
mat4.identity(identityMatrix);
var PerspectiveDrawer = (function () {
    function PerspectiveDrawer(canvas) {
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
    PerspectiveDrawer.prototype.initGL = function () {
        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
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
        var vertices = [
            -1, 1, 1, 0.334, 0.0,
            1, 1, 1, 0.666, 0.0,
            -1, 1, 1, 0.000, 0.25,
            -1, 1, -1, 0.334, 0.25,
            1, 1, -1, 0.666, 0.25,
            1, 1, 1, 1.000, 0.25,
            -1, -1, 1, 0.000, 0.5,
            -1, -1, -1, 0.334, 0.5,
            1, -1, -1, 0.666, 0.5,
            1, -1, 1, 1.000, 0.5,
            -1, -1, 1, 0.334, 0.75,
            1, -1, 1, 0.666, 0.75,
            -1, 1, 1, 0.334, 1.0,
            1, 1, 1, 0.666, 1.0
        ];
        var indices = [
            0, 3, 1,
            3, 4, 1,
            7, 10, 8,
            10, 11, 8,
            2, 6, 3,
            6, 7, 3,
            4, 8, 5,
            8, 9, 5,
            3, 7, 4,
            7, 8, 4,
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
        var positionAttribLoc = gl.getAttribLocation(program, "vertPosition");
        gl.vertexAttribPointer(positionAttribLoc, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(positionAttribLoc);
        var texCoordLocation = gl.getAttribLocation(program, "vertTexCoord");
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(texCoordLocation);
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
    };
    PerspectiveDrawer.prototype.setTexture = function (tex) {
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, tex);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    };
    PerspectiveDrawer.prototype.draw = function () {
        if (!this.gl || !this.program)
            return;
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
    };
    return PerspectiveDrawer;
}());
//# sourceMappingURL=PerspectiveDrawer.js.map