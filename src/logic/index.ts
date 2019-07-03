import { MathTools } from "./math/math";

// export * from './math/math';

/**
 * 定义通信数据结构
 *  * cmd:      命令名称
 *  * data:     命令数据
 */
interface MsgData {
    CMD: string;
    canvas: OffscreenCanvas;
}

interface OffscreenCfg {
    canvas: OffscreenCanvas;
    width: number;
    height: number;
    ready: boolean;
    context2D: OffscreenCanvasRenderingContext2D;
}

const offscreenCfg: OffscreenCfg = <any>{};

self.onmessage = (ev: MessageEvent) => {

    const msg: MsgData = ev.data;

    const cmd   = msg.CMD;

    switch (cmd) {
        case ('INIT'): {
            offscreenCfg.canvas     = msg.canvas;
            offscreenCfg.width      = msg.canvas.width;
            offscreenCfg.height     = msg.canvas.height;
            offscreenCfg.ready      = true;
            offscreenCfg.context2D  = <OffscreenCanvasRenderingContext2D>msg.canvas.getContext('2d');
            renderLoop();
            break;
        }
        case ('RENDER'): {
            break;
        }
        default: {
            console.warn(`no such cms: `, cmd);
        }
    }
};

const renderLoop = () => {
    if (offscreenCfg.ready) {

        draw(offscreenCfg);

    }

    requestAnimationFrame(renderLoop);
};

const draw = (offscreenCfg: OffscreenCfg) => {
    offscreenCfg.context2D.clearRect(0, 0, offscreenCfg.width, offscreenCfg.height);

    offscreenCfg.context2D.save();

    const width = Math.sin(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100 ;
    const height = Math.cos(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100 ;

    drawEllipse(offscreenCfg.width / 2, offscreenCfg.height / 2, width, width, offscreenCfg.context2D);

    offscreenCfg.context2D.restore();
};

const drawEllipse = (x: number, y: number, width: number, height: number, context: OffscreenCanvasRenderingContext2D): void => {
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