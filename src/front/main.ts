// import { WorkerManager } from "./worker/worker";

/**
 * 入口文件
 */

// const worker01 = new Worker('./logic/index.js');

// const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

// canvas.width = 960;
// canvas.height = 540;

// const off_canvas = <any>canvas.transferControlToOffscreen();

// worker01.postMessage({ 'CMD': 'INIT', 'canvas': off_canvas }, [off_canvas]);

const worker01 = new Worker('./logic_webgl/index.js');

const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

canvas.width = 800;
canvas.height = 800;

const off_canvas = <any>canvas.transferControlToOffscreen();

worker01.postMessage({ 'CMD': 'INIT', 'canvas': off_canvas }, [off_canvas]);

window.addEventListener('mousemove', (e: MouseEvent) => {
    worker01.postMessage({ 'CMD': 'MOVE', x: e.clientX, y: e.clientY });
});