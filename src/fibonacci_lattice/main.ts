import { MathTools } from "./math/math";

/**
 * 定义通信数据结构
 *  * cmd:      命令名称
 *  * data:     命令数据
 */
interface MsgData {
    CMD: string;
    canvas: HTMLCanvasElement;
}

interface OffscreenCfg {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    ready: boolean;
    context2D: CanvasRenderingContext2D;
}

const offscreenCfg: OffscreenCfg = <any>{};

const main = () => {
    const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

    canvas.width = 1200;
    canvas.height = 1200;

    offscreenCfg.canvas     = canvas;
    offscreenCfg.width      = canvas.width;
    offscreenCfg.height     = canvas.height;
    offscreenCfg.ready      = true;
    offscreenCfg.context2D  = <CanvasRenderingContext2D>canvas.getContext('2d');
    renderLoop();
};

let index: number = 0;

const renderLoop = () => {
    if (offscreenCfg.ready) {

        // draw(offscreenCfg);
        draw2(offscreenCfg);

    }

    // requestAnimationFrame(renderLoop);
};

const draw = (offscreenCfg: OffscreenCfg) => {
    offscreenCfg.context2D.clearRect(0, 0, offscreenCfg.width, offscreenCfg.height);

    offscreenCfg.context2D.save();

    const width = Math.sin(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100 ;
    const height = Math.cos(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100 ;

    drawEllipse(offscreenCfg.width / 2, offscreenCfg.height / 2, width, width, offscreenCfg.context2D);

    offscreenCfg.context2D.restore();
};

const drawEllipse = (x: number, y: number, width: number, height: number, context: CanvasRenderingContext2D): void => {
    context.translate(x, y);
    context.scale(width, height);

    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.closePath();

    context.scale(1 / width, 1 / height);
    context.translate(-x, -y);

    context.fillStyle = '#ff0000';

    context.fill();
};

const perCount = 10000;

let preNumber = 0;
let preNumber1 = 1;
let count = 0;

const draw2 = (offscreenCfg: OffscreenCfg) => {

    offscreenCfg.context2D.save();

    for (let i = 0; i < perCount; i++) {
        index++;
        // // if (index !== preNumber + preNumber1) { continue; }
        // if (!MathTools.isPrimeNumber(index)) { continue; }
        // count++;

        // drawPoint(index, offscreenCfg.context2D, offscreenCfg.width, offscreenCfg.height);
        // preNumber = preNumber1;
        // preNumber1 = index;

        drawPoint2(index, perCount, offscreenCfg.context2D, offscreenCfg.width, offscreenCfg.height);
    }

    offscreenCfg.context2D.restore();
};

const drawPoint = (num: number, context: CanvasRenderingContext2D, width: number, height: number) => {
    let { x, y } = MathTools.polarCoordToCartesian(num, num);

    x = width / 2 + x / 1000;
    y = height / 2 + y / 1000;

    //设置绘制颜色
    context.fillStyle = "#0000FF";
    //绘制成矩形
    context.fillRect(x - 1, y - 1, 2, 2);
};

const drawPoint2 = (num: number, total: number, context: CanvasRenderingContext2D, width: number, height: number) => {

    let x1 = (num / ((1 + Math.sqrt(5)) / 2)) % 1 ;
    let y1 = num / total ;
    
    let { x, y } = MathTools.polarCoordToCartesian(x1 * 2 * 3.14, Math.sqrt(y1) );
    
    x = x * width / 2  + width / 2 ;
    y = y * height / 2 + height / 2 ;

    //设置绘制颜色
    context.fillStyle = "#0000FF";
    //绘制成矩形
    context.fillRect(x - 1, y - 1, 4, 4);
};

main();