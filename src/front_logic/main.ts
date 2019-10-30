
import { WorkerManager } from "./worker/worker";

/**
 * 入口文件
 */

const worker01 = new Worker('../logic/index.js');

const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

canvas.width = 2048;
canvas.height = 2048;

const off_canvas = <any>canvas.transferControlToOffscreen();

worker01.postMessage({ 'CMD': 'INIT', 'canvas': off_canvas }, [off_canvas]);