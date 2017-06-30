declare class mat4 {
  static identity(out: Float32Array): void;
  static lookAt(out: Float32Array, eye: number[], center: number[], up: number[]): void;
  static perspective(out: Float32Array, fovy: number, aspect: number, near: number, far: number): void;
  static rotate(out: Float32Array, input: Float32Array, angle: number, axis: number[]): void;
}
