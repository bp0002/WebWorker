import { main } from "./index";

const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

canvas.width = 800;
canvas.height = 800;

const off_canvas = canvas;

main(off_canvas);