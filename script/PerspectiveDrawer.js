var PerspectiveDrawer = (function () {
    function PerspectiveDrawer(canvas, net) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext("webgl");
        if (!this.gl)
            this.gl = this.canvas.getContext("experimental-webgl");
        if (!this.gl)
            alert("Failed to intialize 3d pespective.");
    }
    PerspectiveDrawer.prototype.draw = function () {
        this.gl.clearColor(0.4, 0.61, 0.94, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    };
    return PerspectiveDrawer;
}());
