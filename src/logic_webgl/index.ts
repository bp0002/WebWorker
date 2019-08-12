import { WebGLInstance, WebGLInstanceOpt, ShaderCfg, Scene, DataBufferCfg, Mesh, TextureInstance } from "./webgl";
import { vs_multi_line_diff_speed, fs_multi_line_diff_speed } from "./shader_multi_line_diff_speed";
import { vs_sin_cos, fs_sin_cos } from "./shader_sin_cos";
import { vs_multi_line_cross, fs_multi_line_cross } from "./shader_multi_line_cross";
import { vs_polygon, fs_polygon } from "./shader_polygon";
import { vs_texture, fs_texture } from "./shader_texture";
import { vs_progress, fs_progress } from "./shader_progress";

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

    const scene01 = new Scene('02', webgldemo);
    const scene02 = new Scene('02', webgldemo);
    const scene03 = new Scene('03', webgldemo);
    const scene04 = new Scene('04', webgldemo);
    const scene05 = new Scene('05', webgldemo);
    const scene06 = new Scene('06', webgldemo);

    const dataBuffer01 = new DataBufferCfg('01');
    dataBuffer01.addVertex(-1 / 2, -1 / 2, 0);
    dataBuffer01.addUV(0, 0);
    dataBuffer01.addVertex(1 / 2, -1 / 2, 0);
    dataBuffer01.addUV(1, 0);
    dataBuffer01.addVertex(1 / 2, 1 / 2, 0);
    dataBuffer01.addUV(1, 1);
    dataBuffer01.addVertex(-1 / 2, 1 / 2, 0);
    dataBuffer01.addUV(0, 1);
    dataBuffer01.addFace(0, 1, 2);
    dataBuffer01.addFace(0, 2, 3);
    dataBuffer01.update(<WebGLRenderingContext>webgldemo.gl);

    const dataBuffer02 = new DataBufferCfg('01');
    dataBuffer02.addVertex(-1, -1, 0);
    dataBuffer02.addUV(0, 0);
    dataBuffer02.addVertex(1, -1, 0);
    dataBuffer02.addUV(1, 0);
    dataBuffer02.addVertex(1, 1, 0);
    dataBuffer02.addUV(1, 1);
    dataBuffer02.addVertex(-1, 1, 0);
    dataBuffer02.addUV(0, 1);
    dataBuffer02.addFace(0, 1, 2);
    dataBuffer02.addFace(0, 2, 3);
    dataBuffer02.update(<WebGLRenderingContext>webgldemo.gl);

    const dataBuffer03 = new DataBufferCfg('03');
    dataBuffer03.addVertex(-1, -1, 0);
    dataBuffer03.addUV(0, 0);
    dataBuffer03.addVertex(1, -1, 0);
    dataBuffer03.addUV(1, 0);
    dataBuffer03.addVertex(1, -1 + 20 / canvas.height, 0);
    dataBuffer03.addUV(1, 1);
    dataBuffer03.addVertex(-1, -1 + 20 / canvas.height, 0);
    dataBuffer03.addUV(0, 1);
    dataBuffer03.addFace(0, 1, 2);
    dataBuffer03.addFace(0, 2, 3);
    dataBuffer03.update(<WebGLRenderingContext>webgldemo.gl);

    const dataBuffer04 = new DataBufferCfg('04');
    dataBuffer04.addVertex(-1, -1, 0);
    dataBuffer04.addUV(0, 0);
    dataBuffer04.addVertex(-0.8, -1, 0);
    dataBuffer04.addUV(1, 0);
    dataBuffer04.addVertex(-0.8, -0.8, 0);
    dataBuffer04.addUV(1, 1);
    dataBuffer04.addVertex(-1, -0.8, 0);
    dataBuffer04.addUV(0, 1);
    dataBuffer04.addFace(0, 1, 2);
    dataBuffer04.addFace(0, 2, 3);
    dataBuffer04.update(<WebGLRenderingContext>webgldemo.gl);

    // const dataBuffer02 = new DataBufferCfg('02');
    // dataBuffer02.addVertex(-1, -1, 0);
    // dataBuffer02.addVertex(1, -1, 0);
    // dataBuffer02.addVertex(1, 1, 0);
    // dataBuffer02.addVertex(-1, 1, 0);
    // dataBuffer02.addFace(0, 1, 2);
    // dataBuffer02.addFace(0, 2, 3);
    // dataBuffer02.update(<WebGLRenderingContext>webgldemo.gl);

    // const dataBuffer03 = new DataBufferCfg('03');
    // dataBuffer03.addVertex(-1, -1, 0);
    // dataBuffer03.addVertex(1, -1, 0);
    // dataBuffer03.addVertex(1, 1, 0);
    // dataBuffer03.addVertex(-1, 1, 0);
    // dataBuffer03.addFace(0, 1, 2);
    // dataBuffer03.addFace(0, 2, 3);
    // dataBuffer03.update(<WebGLRenderingContext>webgldemo.gl);

    // const dataBuffer04 = new DataBufferCfg('04');
    // dataBuffer04.addVertex(-1, -1, 0);
    // dataBuffer04.addVertex(1, -1, 0);
    // dataBuffer04.addVertex(1, 1, 0);
    // dataBuffer04.addVertex(-1, 1, 0);
    // dataBuffer04.addFace(0, 1, 2);
    // dataBuffer04.addFace(0, 2, 3);
    // dataBuffer04.update(<WebGLRenderingContext>webgldemo.gl);

    // const mesh01 = new Mesh('mesh01', dataBuffer01, shader01);
    // mesh01.translate[0] = 0.0;
    // mesh01.translate[1] = 0.0;
    // mesh01.scale[0] = 0.5;
    // mesh01.scale[1] = 0.5;
    // scene01.addMesh(mesh01);

    // const mesh02 = new Mesh('mesh02', dataBuffer02, shader02);
    // mesh02.translate[0] = 0.5;
    // mesh02.translate[1] = 0.0;
    // mesh02.scale[0] = 0.5;
    // mesh02.scale[1] = 0.5;
    // scene02.addMesh(mesh02);

    // const mesh03 = new Mesh('mesh03', dataBuffer03, shader03);
    // mesh03.translate[0] = 0.0;
    // mesh03.translate[1] = 0.5;
    // mesh03.scale[0] = 0.5;
    // mesh03.scale[1] = 0.5;
    // scene03.addMesh(mesh03);

    // const mesh04 = new Mesh('mesh04', dataBuffer04, shader04);
    // mesh04.translate[0] = 0.5;
    // mesh04.translate[1] = 0.5;
    // mesh04.scale[0] = 0.5;
    // mesh04.scale[1] = 0.5;
    // scene04.addMesh(mesh04);

    const meshicon = new Mesh('meshicon', dataBuffer02, shader05);
    meshicon.translate[0] = 0.0;
    meshicon.translate[1] = -0.2;
    meshicon.scale[0] = 0.5;
    meshicon.scale[1] = 0.5;
    meshicon.texture = webgldemo.createTexture('/resources/zhuangshi.png');
    scene05.addMesh(meshicon);

    const mesh05 = new Mesh('mesh05', dataBuffer02, shader05);
    mesh05.translate[0] = 0.0;
    mesh05.translate[1] = 0.0;
    mesh05.scale[0] = 0.5;
    mesh05.scale[1] = 0.5;
    mesh05.texture = webgldemo.createTexture('/resources/choice_light.png');
    scene05.addMesh(mesh05);

    const mesh06 = new Mesh('mesh06', dataBuffer03, shader06);
    mesh06.translate[0] = 0.0;
    mesh06.translate[1] = 0.0;
    mesh06.scale[0] = 1;
    mesh06.scale[1] = 1;
    mesh06.ufloat = 0.5;
    scene06.addMesh(mesh06);

    const mesh07 = new Mesh('mesh07', dataBuffer04, shader05);
    mesh07.translate[0] = 0.0;
    mesh07.translate[1] = 0.0;
    mesh07.scale[0] = 1;
    mesh07.scale[1] = 1;
    mesh07.texture = webgldemo.createTexture('/resources/choice_light02.png');
    scene05.addMesh(mesh07);

    webgldemo.renderLoop = (timestamp: number) => {
        webgldemo.clearColor();

        scene05.viewport[0] = 0;
        scene05.viewport[1] = 0;
        scene05.viewport[2] = webgldemo.width;
        scene05.viewport[3] = webgldemo.height;
        scene05.render(false);

        // scene01.viewport[0] = 0;
        // scene01.viewport[1] = 0;
        // scene01.viewport[2] = webgldemo.width / 2;
        // scene01.viewport[3] = webgldemo.height / 2;
        // scene01.render(false);

        scene06.viewport[0] = 0;
        scene06.viewport[1] = 0;
        scene06.viewport[2] = webgldemo.width;
        scene06.viewport[3] = webgldemo.height;
        mesh06.ufloat = Math.abs(Math.sin(Date.now() / 1000));
        scene06.render(false);

        // scene02.viewport[0] = webgldemo.width / 2;
        // scene02.viewport[1] = 0;
        // scene02.viewport[2] = webgldemo.width / 2 ;
        // scene02.viewport[3] = webgldemo.height / 2 ;
        // scene02.render(false);

        // scene03.viewport[0] = 0;
        // scene03.viewport[1] = webgldemo.height / 2;
        // scene03.viewport[2] = webgldemo.width / 2;
        // scene03.viewport[3] = webgldemo.height / 2;
        // scene03.render(false);

        // scene04.viewport[0] = webgldemo.width / 2;
        // scene04.viewport[1] = webgldemo.height / 2;
        // scene04.viewport[2] = webgldemo.width / 2;
        // scene04.viewport[3] = webgldemo.height / 2;
        // mesh04.rotate[2]    = Date.now() / 1000 % 1000; // (0-1) 表示旋转 180
        // scene04.render(false);

        // scene05.viewport[0] = 0;
        // scene05.viewport[1] = 0;
        // scene05.viewport[2] = webgldemo.width;
        // scene05.viewport[3] = webgldemo.height;
        // scene05.render(false);

    };

    webgldemo.loop(0);
};

const updateMouse = (x: number, y: number) => {
    webgldemo.u_mouse[0] = x;
    webgldemo.u_mouse[1] = y;
};