import { WebGLInstance, WebGLInstanceOpt, ShaderCfg, Scene, DataBufferCfg, Mesh, TextureInstance } from "./webgl";
import { vs_multi_line_diff_speed, fs_multi_line_diff_speed } from "./shader_multi_line_diff_speed";
import { vs_sin_cos, fs_sin_cos } from "./shader_sin_cos";
import { vs_multi_line_cross, fs_multi_line_cross } from "./shader_multi_line_cross";
import { vs_polygon, fs_polygon } from "./shader_polygon";
import { vs_texture, fs_texture } from "./shader_texture";
import { vs_progress, fs_progress } from "./shader_progress";
import { vs_texture_grass, fs_texture_grass } from "./shader_texture_grass";

// declare function postMessage(message: any): void;

/**
 *
 */
let webgldemo: WebGLInstance;

(<any>self).onmessage = (ev: MessageEvent) => {
    let data = ev.data;
    switch (data.CMD) {
        case ('INIT'): {
            main(data.canvas);
            break;
        }
        case ('MOVE'): {
            updateMouse(data.x, data.y);
            break;
        }
        case ('IMAGE'): {
            if (webgldemo && !webgldemo.isDestroy) {
                const imageData = new ImageData(data.image, data.width, data.height);
                TextureInstance.loaded(imageData, data.fname, webgldemo);
            }
            break;
        }
        default: {
            console.warn(`no such CMD: `, data.CMD);
        }
    }
};

const createTextureLoad = (fname: string, engine: WebGLInstance, cb: (img: ImageData, fname: string, engine: WebGLInstance) => void) => {
    (<any>self).postMessage(
        {
            CMD: 'IMAGE',
            fname: fname
        }
    );
};

export const main = (canvas: OffscreenCanvas) => {
    const opt: WebGLInstanceOpt = <any>{};

    opt.canvas = canvas;

    webgldemo = new WebGLInstance(opt);
    TextureInstance.loadCall = createTextureLoad;

    const shader01 = new ShaderCfg('01', vs_multi_line_diff_speed,  fs_multi_line_diff_speed);
    const shader02 = new ShaderCfg('02', vs_sin_cos,                fs_sin_cos);
    const shader03 = new ShaderCfg('03', vs_multi_line_cross,       fs_multi_line_cross);
    const shader04 = new ShaderCfg('04', vs_polygon,                fs_polygon);
    const shader05 = new ShaderCfg('05', vs_texture,                fs_texture);
    const shader06 = new ShaderCfg('06', vs_progress,               fs_progress);
    const shader07 = new ShaderCfg('07', vs_texture_grass,               fs_texture_grass);

    const scene01 = new Scene('02', webgldemo);
    const scene02 = new Scene('02', webgldemo);
    const scene03 = new Scene('03', webgldemo);
    const scene04 = new Scene('04', webgldemo);
    const scene05 = new Scene('05', webgldemo);
    const scene06 = new Scene('06', webgldemo);

    const dataBuffer02 = new DataBufferCfg('01');
    // dataBuffer02.addVertex(-1 + 0.5, -1, 0);
    // dataBuffer02.addUV(0, 0);
    // dataBuffer02.addVertex(-1 + 0.5, -0.5, 0);
    // dataBuffer02.addUV(0, 0.25);
    // dataBuffer02.addVertex(-1 + 0.5 , 0.0, 0);
    // dataBuffer02.addUV(0, 0.5);
    // dataBuffer02.addVertex(-1 + 0.5 , 0.5, 0);
    // dataBuffer02.addUV(0, 0.75);
    // dataBuffer02.addVertex(-1 + 0.5 , 1, 0);
    // dataBuffer02.addUV(0, 1.0);

    // dataBuffer02.addVertex(0 + 0.5, -1, 0);
    // dataBuffer02.addUV(1, 0);
    // dataBuffer02.addVertex(0 + 0.5, -0.5, 0);
    // dataBuffer02.addUV(1, 0.25);
    // dataBuffer02.addVertex(0 , 0.0, 0);
    // dataBuffer02.addUV(1, 0.5);
    // dataBuffer02.addVertex(0 + 0.5, 0.5, 0);
    // dataBuffer02.addUV(1, .75);
    // dataBuffer02.addVertex(0 + 0.5, 1, 0);
    // dataBuffer02.addUV(1, 1);

    // dataBuffer02.addFace(0, 5, 6);
    // dataBuffer02.addFace(0, 6, 1);
    // dataBuffer02.addFace(1, 6, 7);
    // dataBuffer02.addFace(1, 7, 2);
    // dataBuffer02.addFace(2, 7, 8);
    // dataBuffer02.addFace(2, 8, 3);
    // dataBuffer02.addFace(3, 8, 9);
    // dataBuffer02.addFace(3, 9, 4);
    const count = 20;
    for (let i = 0; i < count; i++) {
        dataBuffer02.addVertex(-0.5, -1 + (2 * i / (count - 1)), 0);
        dataBuffer02.addUV(0, i / (count - 1));
    }
    for (let i = 0; i < count; i++) {
        dataBuffer02.addVertex(0.5, -1 + (2 * i / (count - 1)), 0);
        dataBuffer02.addUV(1, i / (count - 1));
    }
    for (let i = 0; i < count - 1; i++) {
        dataBuffer02.addFace(i, count + i, count + i + 1);
        dataBuffer02.addFace(i, count + i + 1, i + 1);
    }
    dataBuffer02.update(<WebGLRenderingContext>webgldemo.gl);

    const meshicon = new Mesh('meshicon', dataBuffer02, shader07);
    meshicon.translate[0] = 0.0;
    meshicon.translate[1] = -0.2;
    meshicon.scale[0] = 0.1;
    meshicon.scale[1] = 1.0;
    meshicon.texture = webgldemo.createTexture('/resources/grass.jpg');
    meshicon.maskTexture = webgldemo.createTexture('/resources/grass_mark.jpg', 1);
    scene05.addMesh(meshicon);

    scene05.viewport[0] = 0;
    scene05.viewport[1] = 0;
    scene05.viewport[2] = webgldemo.width;
    scene05.viewport[3] = webgldemo.height;

    webgldemo.renderLoop = (timestamp: number) => {
        webgldemo.clearColor();

        scene05.render(false);

    };

    webgldemo.loop(0);
};

const updateMouse = (x: number, y: number) => {
    webgldemo.u_mouse[0] = x;
    webgldemo.u_mouse[1] = y;
};