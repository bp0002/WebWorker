import { WebGLInstance, WebGLInstanceOpt, ShaderCfg, Scene, DataBufferCfg, Mesh, TextureInstance } from "./webgl";
import { vs_multi_line_diff_speed, fs_multi_line_diff_speed } from "./shader_multi_line_diff_speed";
import { vs_sin_cos, fs_sin_cos } from "./shader_sin_cos";
import { vs_multi_line_cross, fs_multi_line_cross } from "./shader_multi_line_cross";
import { vs_polygon, fs_polygon } from "./shader_polygon";
import { vs_texture, fs_texture } from "./shader_texture";
import { vs_progress, fs_progress } from "./shader_progress";
import { vs_texture_grass, fs_texture_grass } from "./shader_texture_grass";

export type RenderFlag = 'grass' | 'progress';

export class RenderLauncher {
    public static webgldemo: WebGLInstance;
    public static opt: any = {};
    public static active(canvas: HTMLCanvasElement, flag: RenderFlag, args: any) {
        switch (flag) {
            case 'grass': {
                RenderLauncher.gress(canvas, args);
            }
            case 'progress': {
                RenderLauncher.progress(canvas, args);
            }
            default: {

            }
        }
    }
    public static puase() {

    }
    public static destroy() {
        if (RenderLauncher.webgldemo && !RenderLauncher.webgldemo.isDestroy) {
            RenderLauncher.webgldemo.destroy();
            (<any>RenderLauncher.webgldemo) = null;

            if (RenderLauncher.opt.meshProgress) {
                RenderLauncher.opt.meshProgress = undefined;
            }
        }
    }
    public static loadImageSucc = (img: HTMLImageElement, fname: string) => {
        TextureInstance.loaded(img, fname, RenderLauncher.webgldemo);
    }
    public static createTextureLoad = (fname: string, engine: WebGLInstance, cb: (img: HTMLImageElement, fname: string, engine: WebGLInstance) => void) => {

        const img = new Image();
        img.onload = () => {
            RenderLauncher.loadImageSucc(img, fname);
            // setTimeout(() => { loadImageSucc(img, data.fname); }, 2000);
        };
        img.src = fname;
    }
    public static gress(canvas: HTMLCanvasElement, args: any) {
        const opt: WebGLInstanceOpt = <any>{};

        opt.canvas = canvas;

        RenderLauncher.webgldemo = new WebGLInstance(opt);
        TextureInstance.loadCall = RenderLauncher.createTextureLoad;

        const shader01 = new ShaderCfg('01', vs_multi_line_diff_speed,  fs_multi_line_diff_speed);
        const shader02 = new ShaderCfg('02', vs_sin_cos,                fs_sin_cos);
        const shader03 = new ShaderCfg('03', vs_multi_line_cross,       fs_multi_line_cross);
        const shader04 = new ShaderCfg('04', vs_polygon,                fs_polygon);
        const shader05 = new ShaderCfg('05', vs_texture,                fs_texture);
        const shader06 = new ShaderCfg('06', vs_progress,               fs_progress);
        const shader07 = new ShaderCfg('07', vs_texture_grass,               fs_texture_grass);

        const scene01 = new Scene('02', RenderLauncher.webgldemo);
        const scene02 = new Scene('02', RenderLauncher.webgldemo);
        const scene03 = new Scene('03', RenderLauncher.webgldemo);
        const scene04 = new Scene('04', RenderLauncher.webgldemo);
        const scene05 = new Scene('05', RenderLauncher.webgldemo);
        const scene06 = new Scene('06', RenderLauncher.webgldemo);

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
        dataBuffer02.update(<WebGLRenderingContext>RenderLauncher.webgldemo.gl);

        const meshicon = new Mesh('meshicon', dataBuffer02, shader07);
        meshicon.translate[0] = 0.0;
        meshicon.translate[1] = -0.2;
        meshicon.scale[0] = 0.1;
        meshicon.scale[1] = 1.0;
        meshicon.texture = RenderLauncher.webgldemo.createTexture('/resources/grass.jpg');
        meshicon.maskTexture = RenderLauncher.webgldemo.createTexture('/resources/grass_mark.jpg', 1);
        scene05.addMesh(meshicon);

        scene05.viewport[0] = 0;
        scene05.viewport[1] = 0;
        scene05.viewport[2] = RenderLauncher.webgldemo.width;
        scene05.viewport[3] = RenderLauncher.webgldemo.height;

        RenderLauncher.webgldemo.renderLoop = (timestamp: number) => {
            RenderLauncher.webgldemo.clearColor();

            scene05.render(false);

        };

        RenderLauncher.webgldemo.loop(0);
    }
    public static progress(canvas: HTMLCanvasElement, args: any) {
        const opt: WebGLInstanceOpt = <any>{};

        opt.canvas = canvas;

        RenderLauncher.webgldemo = new WebGLInstance(opt);
        TextureInstance.loadCall = RenderLauncher.createTextureLoad;

        const webgldemo: WebGLInstance = RenderLauncher.webgldemo;

        if (!webgldemo.gl) {
            return;
        }

        const shader05 = new ShaderCfg('05', vs_texture, fs_texture);
        const shader06 = new ShaderCfg('06', vs_progress, fs_progress);

        const scene = new Scene('06', webgldemo);
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
        dataBuffer02.update(webgldemo.gl);

        const dataBuffer03 = new DataBufferCfg('03');
        dataBuffer03.addVertex(-1, -1, 0);
        dataBuffer03.addVertex(1, -1, 0);
        dataBuffer03.addVertex(1, -1 + 20 / canvas.height, 0);
        dataBuffer03.addVertex(-1, -1 + 20 / canvas.height, 0);
        dataBuffer03.addFace(0, 1, 2);
        dataBuffer03.addFace(0, 2, 3);
        dataBuffer03.update(webgldemo.gl);

        const meshBG = new Mesh('meshBG', dataBuffer02, shader05);
        meshBG.translate[0] = 0.0;
        meshBG.translate[1] = 0.0;
        meshBG.scale[0] = 1;
        meshBG.scale[1] = 1;
        meshBG.texture = webgldemo.createTexture(args.bg);
        scene.addMesh(meshBG);

        const meshProgress = new Mesh('meshProgress', dataBuffer03, shader06);
        meshProgress.translate[0] = 0.0;
        meshProgress.translate[1] = 0.0;
        meshProgress.scale[0] = 1;
        meshProgress.scale[1] = 1;
        meshProgress.ufloat = 0.01;
        scene.addMesh(meshProgress);

        webgldemo.renderLoop = (timestamp) => {
            webgldemo.clearColor();
            scene.viewport[0] = 0;
            scene.viewport[1] = 0;
            scene.viewport[2] = webgldemo.width;
            scene.viewport[3] = webgldemo.height;
            scene.render(true);
        };

        webgldemo.loop(0);

        RenderLauncher.opt.meshProgress = meshProgress;
    }
    public static updateProgress(num: number) {
        if (RenderLauncher.opt.meshProgress) {
            RenderLauncher.opt.meshProgress.ufloat = num;
        }
    }
}