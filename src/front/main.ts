
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

const worker01 = new Worker('../logic/index.js');

const canvas = <HTMLCanvasElement>document.getElementById('your_canvas');

canvas.width = 1200;
canvas.height = 1200;

const off_canvas = <any>canvas.transferControlToOffscreen();

// main(off_canvas);

worker01.postMessage({ 'CMD': 'INIT', 'canvas': off_canvas }, [off_canvas]);

window.addEventListener('mousemove', (e: MouseEvent) => {
    worker01.postMessage({ 'CMD': 'MOVE', x: e.clientX, y: e.clientY });
});

worker01.onmessage = (ev: any) => {
    let data = ev.data;
    switch (data.CMD) {
        case ('IMAGE'): {
            const img = new Image();
            img.onload = () => {
                loadImageSucc(img, data.fname);
                // setTimeout(() => { loadImageSucc(img, data.fname); }, 2000);
            };
            img.src = data.fname;
            break;
        }
        default: {
            console.warn(`no such CMD: `, data.CMD);
        }
    }
};

const loadImageSucc = (img: HTMLImageElement, fname: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.save();

    const off_canvas = <any>canvas.transferControlToOffscreen();

    // const imageData = ctx.getImageData(0, 0, img.width, img.height);
    // const data = imageData.data;
    // worker01.postMessage({ 'CMD': 'IMAGE', 'image': data, 'fname': fname, "width": imageData.width, "height": imageData.height });

    createImageBitmap(img).then((value: ImageBitmap) => {
        worker01.postMessage({ 'CMD': 'IMAGE', 'image': value, 'fname': fname }, [value]);
    });
};