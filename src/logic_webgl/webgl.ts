/**
 * WEBGL 基本处理
 */

export interface WebGLInstanceOpt {
    canvas: OffscreenCanvas;
}

export class ShaderCfg {
    public readonly sname: string;
    public readonly vs: string;
    public readonly fs: string;
    public vshader: WebGLShader | undefined    ;
    public fshader: WebGLShader | undefined    ;
    public programe: WebGLProgram | undefined  ;
    public u_time_loc: WebGLUniformLocation | undefined        ;
    public u_mouse_loc: WebGLUniformLocation | undefined       ;
    public u_resolution_loc: WebGLUniformLocation | undefined  ;
    public u_translate_loc: WebGLUniformLocation | undefined   ;
    public u_scale_loc: WebGLUniformLocation | undefined   ;
    public u_rotate_loc: WebGLUniformLocation | undefined   ;
    public a_position_loc: number | undefined                  ;
    private shader_program: WebGLProgram | undefined;
    constructor(sname: string, vs: string, fs: string) {
        this.sname = sname;
        this.fs = fs;
        this.vs = vs;
    }
    public getPrograme(gl: WebGLRenderingContext) {

        const shader_fragment   = <WebGLShader>this.getFSShader(gl);
        const shader_vertex     = <WebGLShader>this.getVSShader(gl);

        if (this.shader_program === undefined && gl.getShaderParameter(shader_fragment, gl.COMPILE_STATUS)) {

            const shader_program  = <WebGLProgram>gl.createProgram();

            this.shader_program = shader_program;

            gl.attachShader(<WebGLProgram>this.shader_program, shader_vertex);
            gl.attachShader(<WebGLProgram>this.shader_program, shader_fragment);

            gl.linkProgram(<WebGLProgram>this.shader_program);
        }

        this.u_mouse_loc        = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_mouse`);

        this.u_time_loc         = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_time`);

        this.u_resolution_loc   = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_resolution`);

        this.u_translate_loc    = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_translate`);

        this.u_scale_loc        = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_scale`);

        this.u_rotate_loc       = <WebGLUniformLocation>gl.getUniformLocation(<WebGLProgram>this.shader_program, `u_rotate`);

        this.a_position_loc     = gl.getAttribLocation(<WebGLProgram>this.shader_program, 'position');

        gl.enableVertexAttribArray(this.a_position_loc);

        gl.useProgram(<WebGLProgram>this.shader_program);
    }
    public getVSShader(gl: WebGLRenderingContext) {
        if (gl === null) { return this.vshader; }

        if (this.vshader) { return this.vshader; }

        this.vshader  = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);

        if (this.vshader === null) { return this.vshader; }

        if (this.vs === undefined) { return this.vshader; }

        gl.shaderSource(this.vshader, this.vs);
        gl.compileShader(this.vshader);

        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            alert(`ERROR IN 'VERTEX_SHADER' SHADER: ${ gl.getShaderInfoLog(this.vshader) }`);
            return this.vshader;
        }

        return this.vshader;
    }
    public getFSShader(gl: WebGLRenderingContext) {
        if (gl === null) { return this.fshader; }

        if (this.fshader) { return this.fshader; }

        this.fshader  = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

        if (this.fshader === null) { return this.fshader; }

        if (this.fs === undefined) { return this.fshader; }

        gl.shaderSource(this.fshader, this.fs);
        gl.compileShader(this.fshader);

        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            alert(`ERROR IN 'FRAGMENT_SHADER' SHADER: ${ gl.getShaderInfoLog(this.fshader) }`);
            return this.fshader;
        }

        return this.fshader;
    }
}

export class DataBufferCfg {
    public readonly vname:          string;
    public vertex_loc:              number | undefined;
    public readonly vertex_data:    number[]    = [];
    public vertex_buffer:           WebGLBuffer | undefined;
    public face_loc:                number | undefined;
    public readonly face_data:      number[]    = [];
    public face_buffer:             WebGLBuffer | undefined;
    constructor(vname: string) {
        this.vname = vname;
    }
    public addVertex(x: number, y: number, z: number) {
        this.vertex_data.push(x, y);
    }
    public addFace(a: number, b: number, c: number) {
        this.face_data.push(a, b, c);
    }
    public update(gl: WebGLRenderingContext) {
        this.activeVertex(gl);
        this.activeFace(gl);
    }
    public activeVertex(gl: WebGLRenderingContext) {
        if (!this.vertex_buffer) {
            this.vertex_buffer  = <WebGLBuffer>gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER,
                            new Float32Array(this.vertex_data),
                            gl.STATIC_DRAW
                        );
        }
    }
    public activeFace(gl: WebGLRenderingContext) {
        if (!this.face_buffer) {
            this.face_buffer  = <WebGLBuffer>gl.createBuffer();

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.face_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                            new Uint16Array(this.face_data),
                            gl.STATIC_DRAW
                        );
        }
    }
}

export class Mesh {
    public readonly dataBufferCfg: DataBufferCfg;
    public readonly shaderCfg: ShaderCfg;
    public readonly id: string;
    public readonly translate: number[] = [0, 0, 0];
    public readonly scale: number[]     = [1, 1, 1];
    public readonly rotate: number[]    = [0, 0, 0];
    constructor(id: string, geo: DataBufferCfg, material: ShaderCfg) {
        this.id             = id;
        this.dataBufferCfg  = geo;
        this.shaderCfg      = material;
    }
    public render(scene: Scene) {

        const gl = <WebGLRenderingContext>scene.engine.gl;

        const shader = <ShaderCfg>this.shaderCfg;

        shader.getPrograme(gl);

        gl.uniform2fv(<WebGLUniformLocation>shader.u_mouse_loc,    scene.engine.u_mouse);
        gl.uniform1f(<WebGLUniformLocation>shader.u_time_loc,      scene.engine.timestamp * 0.001);

        gl.uniform2f(<WebGLUniformLocation>shader.u_resolution_loc, scene.engine.width,  scene.engine.height);
        gl.uniform3f(<WebGLUniformLocation>shader.u_translate_loc,  this.translate[0],  this.translate[1],  this.translate[2]);
        gl.uniform3f(<WebGLUniformLocation>shader.u_scale_loc,      this.scale[0],      this.scale[1],      this.scale[2]);
        gl.uniform3f(<WebGLUniformLocation>shader.u_rotate_loc,     this.rotate[0],     this.rotate[1],     this.rotate[2]);

        gl.bindBuffer(gl.ARRAY_BUFFER, <WebGLBuffer>this.dataBufferCfg.vertex_buffer);
        gl.vertexAttribPointer(<number>shader.a_position_loc,
                                    2,
                                    gl.FLOAT,
                                    false,
                                    4 * 2,
                                    0
                                );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, <WebGLBuffer>this.dataBufferCfg.face_buffer);
        gl.drawElements(gl.TRIANGLES,
                            6,
                            gl.UNSIGNED_SHORT,
                            0
                        );
        gl.flush();
    }
}

export class Scene {
    public readonly sname:  string;
    public readonly engine: WebGLInstance;
    public readonly viewport:   number[] = [0, 0, 0, 0];
    public readonly meshMap:    Map<string, Mesh> = new Map();
    constructor(sname: string, engine: WebGLInstance) {
        this.sname  = sname;
        this.engine = engine;
    }
    public addMesh(mesh: Mesh) {
        this.meshMap.set(mesh.id, mesh);
    }
    public render(isClear: boolean) {
        const gl = <WebGLRenderingContext>this.engine.gl;

        gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
        if (isClear) {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        this.meshMap.forEach((mesh) => {
            mesh.render(this);
        });
    }
}

export class WebGLInstance {
    public readonly canvas: OffscreenCanvas;
    public readonly gl: WebGLRenderingContext | null;
    public readonly width: number;
    public readonly height: number;
    public static readonly uniforms_1f: string[]    = ['u_time'];
    public static readonly uniforms_2fv: string[]   = ['u_mouse'];
    public static readonly uniforms_2f: string[]    = ['u_resolution'];
    public static readonly contentModes = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    public readonly u_mouse: number[]        = [0, 0];
    public timestamp: number = 0;
    private sceneMap: Map<string, Scene> = new Map();
    constructor(opt: WebGLInstanceOpt) {
        this.canvas = opt.canvas;
        this.width  = this.canvas.width;
        this.height = this.canvas.height;
        this.gl     = WebGLInstance.ctxInitFunc(this.canvas);
    }
    private static ctxInitFunc(canvas: OffscreenCanvas): WebGLRenderingContext | null {
        let gl: WebGLRenderingContext | null = null;
        try {
            for (var ii = 0; ii < WebGLInstance.contentModes.length; ++ii) {
                try {
                    gl = <WebGLRenderingContext>canvas.getContext(<OffscreenRenderingContextId>WebGLInstance.contentModes[ii], {alpha : true, antialias : true });
                } catch (e) {
                    //
                }

                if (gl) {
                    break;
                }
            }
        } catch (error) {
            console.warn(`There is not webgl compatible :( `);
        }

        return gl;
    }
    public addScene(cfg: Scene) {
        this.sceneMap.set(cfg.sname, cfg);
    }
    public clearColor() {
        const gl = (<WebGLRenderingContext>this.gl);
        gl.viewport(0, 0, this.width, this.height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
    }
    public loop = (timestamp: number) => {
        this.timestamp = timestamp;

        this.renderLoop(timestamp);

        requestAnimationFrame(this.loop);
    }
    public renderLoop(timestamp: number) {}
}