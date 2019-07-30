(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webgl_1 = require("./webgl");
const shader_multi_line_diff_speed_1 = require("./shader_multi_line_diff_speed");
const shader_sin_cos_1 = require("./shader_sin_cos");
const shader_multi_line_cross_1 = require("./shader_multi_line_cross");
const shader_polygon_1 = require("./shader_polygon");
const shader_texture_1 = require("./shader_texture");
const shader_progress_1 = require("./shader_progress");
// declare function postMessage(message: any): void;
/**
 *
 */
let webgldemo;
self.onmessage = (ev) => {
    let data = ev.data;
    switch (data.CMD) {
        case ('INIT'): {
            exports.main(data.canvas);
            break;
        }
        case ('MOVE'): {
            updateMouse(data.x, data.y);
            break;
        }
        case ('IMAGE'): {
            if (webgldemo && !webgldemo.isDestroy) {
                const imageData = new ImageData(data.image, data.width, data.height);
                webgl_1.TextureInstance.loaded(imageData, data.fname, webgldemo);
            }
            break;
        }
        default: {
            console.warn(`no such CMD: `, data.CMD);
        }
    }
};
const createTextureLoad = (fname, engine, cb) => {
    self.postMessage({
        CMD: 'IMAGE',
        fname: fname
    });
};
exports.main = (canvas) => {
    const opt = {};
    opt.canvas = canvas;
    webgldemo = new webgl_1.WebGLInstance(opt);
    webgl_1.TextureInstance.loadCall = createTextureLoad;
    const shader01 = new webgl_1.ShaderCfg('01', shader_multi_line_diff_speed_1.vs_multi_line_diff_speed, shader_multi_line_diff_speed_1.fs_multi_line_diff_speed);
    const shader02 = new webgl_1.ShaderCfg('02', shader_sin_cos_1.vs_sin_cos, shader_sin_cos_1.fs_sin_cos);
    const shader03 = new webgl_1.ShaderCfg('03', shader_multi_line_cross_1.vs_multi_line_cross, shader_multi_line_cross_1.fs_multi_line_cross);
    const shader04 = new webgl_1.ShaderCfg('04', shader_polygon_1.vs_polygon, shader_polygon_1.fs_polygon);
    const shader05 = new webgl_1.ShaderCfg('05', shader_texture_1.vs_texture, shader_texture_1.fs_texture);
    const shader06 = new webgl_1.ShaderCfg('06', shader_progress_1.vs_progress, shader_progress_1.fs_progress);
    const scene01 = new webgl_1.Scene('02', webgldemo);
    const scene02 = new webgl_1.Scene('02', webgldemo);
    const scene03 = new webgl_1.Scene('03', webgldemo);
    const scene04 = new webgl_1.Scene('04', webgldemo);
    const scene05 = new webgl_1.Scene('05', webgldemo);
    const scene06 = new webgl_1.Scene('06', webgldemo);
    const dataBuffer01 = new webgl_1.DataBufferCfg('01');
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
    dataBuffer01.update(webgldemo.gl);
    const dataBuffer02 = new webgl_1.DataBufferCfg('01');
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
    const dataBuffer03 = new webgl_1.DataBufferCfg('03');
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
    dataBuffer03.update(webgldemo.gl);
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
    const mesh05 = new webgl_1.Mesh('mesh05', dataBuffer02, shader05);
    mesh05.translate[0] = 0.0;
    mesh05.translate[1] = 0.0;
    mesh05.scale[0] = 1;
    mesh05.scale[1] = 1;
    mesh05.texture = webgldemo.createTexture('/resources/texture.png');
    scene05.addMesh(mesh05);
    const mesh06 = new webgl_1.Mesh('mesh06', dataBuffer03, shader06);
    mesh06.translate[0] = 0.0;
    mesh06.translate[1] = 0.0;
    mesh06.scale[0] = 1;
    mesh06.scale[1] = 1;
    mesh06.ufloat = 0.5;
    scene06.addMesh(mesh06);
    webgldemo.renderLoop = (timestamp) => {
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
const updateMouse = (x, y) => {
    webgldemo.u_mouse[0] = x;
    webgldemo.u_mouse[1] = y;
};
},{"./shader_multi_line_cross":2,"./shader_multi_line_diff_speed":3,"./shader_polygon":4,"./shader_progress":5,"./shader_sin_cos":6,"./shader_texture":7,"./webgl":8}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_multi_line_cross = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
}
`;
exports.fs_multi_line_cross = `
// Author @patriciogv - 2015
// Title: Truchet - 10 print
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_translate;
uniform vec3 u_scale;
uniform vec3 u_rotate;

vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    // _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}
float circle(vec2 xy, vec2 center, float radius, float smooth_edge) {
    float dist = distance(xy,center);
    dist = smoothstep(radius, radius + smooth_edge, dist);
    return dist;
}

void main(void){
    float count = 20.0;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= u_translate.xy;
    st *= 1.0/u_scale.xy;

    float sin_t = sin(u_time * 3.14 / 10.0);
    float cos_t = cos(u_time * 3.14 / 10.0);
    float col_flag= mod(st.y * count, 2.0) < 1.0 ? 1.0 : -1.0;
    float row_flag= mod(st.x * count, 2.0) < 1.0 ? 1.0 : -1.0;
    st += vec2(
        col_flag * ( sin_t * cos_t < 0.0 ? cos_t : 0.0 ) * 0.5,
        row_flag * ( sin_t * cos_t > 0.0 ? sin_t : 0.0 ) * 0.5);
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    // st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    st = brickTile(st,count);

    color = vec3(circle(st,vec2(0.5,0.5),0.4, 0.05));

    // Uncomment to see the space coordinates
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
`;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_multi_line_diff_speed = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
}
`;
exports.fs_multi_line_diff_speed = `
// Author @patriciogv - 2015
// Title: Truchet - 10 print

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_translate;
uniform vec3 u_scale;
uniform vec3 u_rotate;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}
float circle(vec2 xy, vec2 center, float radius, float smooth_edge) {
    float dist = distance(xy,center);
    dist = smoothstep(radius, radius + smooth_edge, dist);
    return dist;
}

void main() {
    float count = 20.0;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= u_translate.xy;
    st *= 1.0/u_scale.xy;
    st *= count;
	st.x -= u_time * 2.0 *  random(vec2(floor(st).y,1.0));

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    float speed = random(vec2(ipos.y));

    float x_f = random(vec2(ipos.x, 0));
    float y_f = random(vec2(0, ipos.y));

    float color = 0.0;
    color = random(vec2(x_f, y_f));
	color =
    	1.0 - (1.0 - circle(fract(st), vec2(0.5), 0.25, 0.1)) * color
    	;
    vec4 f_color = vec4(vec3(color),1.0);
    f_color.r = color < 1.0 ? 0.0 : 1.0;
    f_color.g = color < 1.0 ? 0.0 : 1.0;
    f_color.b = color < 1.0 ? color : 1.0;
    f_color.a = color < 1.0 ? color : 0.0;

    gl_FragColor = f_color;
}
`;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_polygon = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
}
`;
exports.fs_polygon = `
// Author @patriciogv - 2015
// Title: Truchet - 10 print
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846
#define TWO_PI 6.2448530717958647692

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_translate;
uniform vec3 u_scale;
uniform vec3 u_rotate;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float shape(vec2 st, float N){
    st = st*2.-1.;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/N;
    return abs(cos(floor(.5+a/r)*r-a)*length(st));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= u_translate.xy;
    st *= 1.0/u_scale.xy;

    // move space from the center to the vec2(0.0)
    st -= vec2(0.5);
    // rotate the space
    st = rotate2d( u_rotate.z ) * st;
    // move it back to the original place
    st += vec2(0.5);

    vec3 color = vec3(0.0);

    color = vec3( smoothstep(.5, .5 + .005, shape(st,6.0)) );

    gl_FragColor = vec4(color, 1.0);
}
`;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_progress = `
#ifdef GL_ES
precision mediump float;
#endif

attribute   vec2    position;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
}
`;
exports.fs_progress = `
#ifdef GL_ES
precision mediump float;
#endif

uniform  float u_float;
uniform  vec2 u_resolution;

void main(void){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = st.x < u_float ? vec3(0.0, 0.8, 0.0) : vec3(0.2, 0.2, 0.2);
    // 20 对应js层进度条高度
    color = st.y > (20.0 / u_resolution.y / 2.0) ? vec3(0.0) : color;

    float alpha = st.y > (20.0 / u_resolution.y / 2.0) ? 0.0 : 0.8;
    alpha = st.x < u_float ? alpha : 0.8;

    gl_FragColor = vec4( color, alpha );
}
`;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_sin_cos = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
}
`;
exports.fs_sin_cos = `
// Author @patriciogv - 2015
// Title: Truchet - 10 print
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_translate;
uniform vec3 u_scale;
uniform vec3 u_rotate;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= u_translate.xy;
    st *= 1.0/u_scale.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = distance(pos, vec2(0.0,0.0))*2.0;
    float a = atan(pos.y,pos.x);
    float xxx = floor(u_time / 10.0) * 10.0 - u_time ;
    float yyy = floor(u_time / 20.0) * 20.0 - u_time ;
    float f = cos(a*0.5);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;
    f = abs( cos(a*xxx) * sin(a*yyy) ) *.9 + .2;

    color = vec3( 1.-smoothstep(f,f+0.005,r) );

    gl_FragColor = vec4(color, 1.0);
}
`;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vs_texture = `
#ifdef GL_ES
precision mediump float;
#endif
attribute   vec2    position;
varying     vec2    surfacePosition;
attribute   vec2    a_uv;
varying     vec2    vUV;

void main( void ){
    gl_Position = vec4( position, 0., 1. );
    surfacePosition      = position;
    vUV = a_uv;
}
`;
exports.fs_texture = `
#ifdef GL_ES
precision mediump float;
#endif

varying  vec2 vUV;
uniform  sampler2D u_sampler;

void main(void){
    // [ 0, 0, 0, 1 ]  rgba颜色向量
    // gl_FragColor = vec4( vColor, 1. );
    gl_FragColor = texture2D( u_sampler, vUV );
}
`;
},{}],8:[function(require,module,exports){
"use strict";
/**
 * WEBGL 基本处理
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ShaderCfg {
    constructor(sname, vs, fs) {
        this.sname = sname;
        this.fs = fs;
        this.vs = vs;
    }
    getPrograme(gl) {
        const shader_fragment = this.getFSShader(gl);
        const shader_vertex = this.getVSShader(gl);
        if (this.shader_program === undefined && gl.getShaderParameter(shader_fragment, gl.COMPILE_STATUS)) {
            const shader_program = gl.createProgram();
            this.shader_program = shader_program;
            gl.attachShader(this.shader_program, shader_vertex);
            gl.attachShader(this.shader_program, shader_fragment);
            gl.linkProgram(this.shader_program);
        }
        this.u_mouse_loc = gl.getUniformLocation(this.shader_program, `u_mouse`);
        this.u_time_loc = gl.getUniformLocation(this.shader_program, `u_time`);
        this.u_resolution_loc = gl.getUniformLocation(this.shader_program, `u_resolution`);
        this.u_translate_loc = gl.getUniformLocation(this.shader_program, `u_translate`);
        this.u_scale_loc = gl.getUniformLocation(this.shader_program, `u_scale`);
        this.u_rotate_loc = gl.getUniformLocation(this.shader_program, `u_rotate`);
        this.u_float_loc = gl.getUniformLocation(this.shader_program, `u_float`);
        this.a_position_loc = gl.getAttribLocation(this.shader_program, 'position');
        this.a_uv = gl.getAttribLocation(this.shader_program, 'a_uv');
        this.u_texture = gl.getUniformLocation(this.shader_program, 'u_sampler');
        gl.enableVertexAttribArray(this.a_position_loc);
        gl.enableVertexAttribArray(this.a_uv);
        gl.uniform1i(this.u_texture, 0);
        gl.useProgram(this.shader_program);
    }
    getVSShader(gl) {
        if (gl === null) {
            return this.vshader;
        }
        if (this.vshader) {
            return this.vshader;
        }
        this.vshader = gl.createShader(gl.VERTEX_SHADER);
        if (this.vshader === null) {
            return this.vshader;
        }
        if (this.vs === undefined) {
            return this.vshader;
        }
        gl.shaderSource(this.vshader, this.vs);
        gl.compileShader(this.vshader);
        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            console.error(`ERROR IN 'VERTEX_SHADER' SHADER: ${gl.getShaderInfoLog(this.vshader)}`);
            return this.vshader;
        }
        return this.vshader;
    }
    getFSShader(gl) {
        if (gl === null) {
            return this.fshader;
        }
        if (this.fshader) {
            return this.fshader;
        }
        this.fshader = gl.createShader(gl.FRAGMENT_SHADER);
        if (this.fshader === null) {
            return this.fshader;
        }
        if (this.fs === undefined) {
            return this.fshader;
        }
        gl.shaderSource(this.fshader, this.fs);
        gl.compileShader(this.fshader);
        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            console.error(`ERROR IN 'FRAGMENT_SHADER' SHADER: ${gl.getShaderInfoLog(this.fshader)}`);
            return this.fshader;
        }
        return this.fshader;
    }
}
exports.ShaderCfg = ShaderCfg;
class DataBufferCfg {
    constructor(vname) {
        this.vertex_data = [];
        this.face_data = [];
        this.uv_data = [];
        this.vname = vname;
    }
    addVertex(x, y, z) {
        this.vertex_data.push(x, y);
    }
    addFace(a, b, c) {
        this.face_data.push(a, b, c);
    }
    addUV(u, v) {
        this.uv_data.push(u, v);
    }
    update(gl) {
        this.activeVertex(gl);
        this.activeUV(gl);
        this.activeFace(gl);
    }
    activeVertex(gl) {
        if (!this.vertex_buffer) {
            this.vertex_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_data), gl.STATIC_DRAW);
        }
    }
    activeFace(gl) {
        if (!this.face_buffer) {
            this.face_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.face_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.face_data), gl.STATIC_DRAW);
        }
    }
    activeUV(gl) {
        if (!this.uv_buffer) {
            this.uv_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.uv_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_data), gl.STATIC_DRAW);
        }
    }
}
exports.DataBufferCfg = DataBufferCfg;
class Mesh {
    constructor(id, geo, material) {
        this.translate = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.rotate = [0, 0, 0];
        this.ufloat = 0.0;
        this.id = id;
        this.dataBufferCfg = geo;
        this.shaderCfg = material;
        this.texture = null;
    }
    render(scene) {
        const gl = scene.engine.gl;
        const shader = this.shaderCfg;
        shader.getPrograme(gl);
        if (this.texture) {
            this.texture.active();
        }
        gl.uniform2fv(shader.u_mouse_loc, scene.engine.u_mouse);
        gl.uniform1f(shader.u_time_loc, scene.engine.timestamp * 0.001);
        gl.uniform1f(shader.u_float_loc, this.ufloat);
        gl.uniform2f(shader.u_resolution_loc, scene.engine.width, scene.engine.height);
        gl.uniform3f(shader.u_translate_loc, this.translate[0], this.translate[1], this.translate[2]);
        gl.uniform3f(shader.u_scale_loc, this.scale[0], this.scale[1], this.scale[2]);
        gl.uniform3f(shader.u_rotate_loc, this.rotate[0], this.rotate[1], this.rotate[2]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.vertex_buffer);
        gl.vertexAttribPointer(shader.a_position_loc, 2, gl.FLOAT, false, 4 * 2, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.uv_buffer);
        gl.vertexAttribPointer(shader.a_uv, 2, gl.FLOAT, false, 4 * 2, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.dataBufferCfg.face_buffer);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        gl.flush();
    }
}
exports.Mesh = Mesh;
class Scene {
    constructor(sname, engine) {
        this.viewport = [0, 0, 0, 0];
        this.meshMap = new Map();
        this.sname = sname;
        this.engine = engine;
    }
    addMesh(mesh) {
        this.meshMap.set(mesh.id, mesh);
    }
    render(isClear) {
        const gl = this.engine.gl;
        gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
        if (isClear) {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        this.meshMap.forEach((mesh) => {
            mesh.render(this);
        });
    }
}
exports.Scene = Scene;
class TextureInstance {
    constructor(name, engine) {
        this.fname = name;
        this._engine = engine;
        this._tex = null;
        engine.addTexture(this);
        TextureInstance.loadCall(name, engine, TextureInstance.loaded);
    }
    active() {
        const GL = this._engine.gl;
        if (this._tex) {
            GL.activeTexture(GL.TEXTURE0);
            GL.bindTexture(GL.TEXTURE_2D, this._tex);
        }
    }
    remove() {
        this._engine.delTexture(this);
    }
}
TextureInstance.loadCall = (path, engine, cb) => {
    try {
        // const img = new Image();
        // img.onload = () => {
        //     cb(img, path, engine);
        // };
        // img.src = path;
    }
    catch (e) {
        console.error(e);
    }
};
TextureInstance.loaded = (img, fname, engine) => {
    const texIns = engine.getTexture(fname);
    if (texIns) {
        const GL = engine.gl;
        const tex = GL.createTexture();
        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
        GL.bindTexture(GL.TEXTURE_2D, tex);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, img);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);
        GL.generateMipmap(GL.TEXTURE_2D);
        GL.bindTexture(GL.TEXTURE_2D, null);
        texIns._tex = tex;
    }
};
exports.TextureInstance = TextureInstance;
class WebGLInstance {
    constructor(opt) {
        this.u_mouse = [0, 0];
        this.timestamp = 0;
        this.sceneMap = new Map();
        this.textureMap = new Map();
        this._isDestroy = false;
        this.loop = (timestamp) => {
            this.timestamp = timestamp;
            this.renderLoop(timestamp);
            setTimeout(this.loop, 50);
        };
        this.canvas = opt.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.gl = WebGLInstance.ctxInitFunc(this.canvas);
    }
    get isDestroy() {
        return this._isDestroy;
    }
    static ctxInitFunc(canvas) {
        let gl = null;
        try {
            for (var ii = 0; ii < WebGLInstance.contentModes.length; ++ii) {
                try {
                    gl = canvas.getContext(WebGLInstance.contentModes[ii], { alpha: true, antialias: true });
                }
                catch (e) {
                    //
                }
                if (gl) {
                    break;
                }
            }
        }
        catch (error) {
            console.warn(`There is not webgl compatible :( `);
        }
        return gl;
    }
    createTexture(fname) {
        let tex = this.textureMap.get(fname);
        if (tex === undefined) {
            tex = new TextureInstance(fname, this);
        }
        return tex;
    }
    addTexture(tex) {
        this.textureMap.set(tex.fname, tex);
    }
    getTexture(fname) {
        return this.textureMap.get(fname);
    }
    delTexture(tex) {
        this.textureMap.delete(tex.fname);
        this.gl.deleteTexture(tex);
    }
    addScene(cfg) {
        this.sceneMap.set(cfg.sname, cfg);
    }
    clearColor() {
        const gl = this.gl;
        gl.viewport(0, 0, this.width, this.height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
    }
    renderLoop(timestamp) { }
    destroy() {
        this._isDestroy = true;
        this.textureMap.forEach((tex) => {
            this.delTexture(tex);
        });
    }
}
WebGLInstance.uniforms_1f = ['u_time'];
WebGLInstance.uniforms_2fv = ['u_mouse'];
WebGLInstance.uniforms_2f = ['u_resolution'];
WebGLInstance.contentModes = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
exports.WebGLInstance = WebGLInstance;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbG9naWNfd2ViZ2wvaW5kZXgudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfY3Jvc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfZGlmZl9zcGVlZC50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcG9seWdvbi50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcHJvZ3Jlc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3Npbl9jb3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3RleHR1cmUudHMiLCJzcmMvbG9naWNfd2ViZ2wvd2ViZ2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1DQUFrSDtBQUNsSCxpRkFBb0c7QUFDcEcscURBQTBEO0FBQzFELHVFQUFxRjtBQUNyRixxREFBMEQ7QUFDMUQscURBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxvREFBb0Q7QUFFcEQ7O0dBRUc7QUFDSCxJQUFJLFNBQXdCLENBQUM7QUFFdkIsSUFBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWdCLEVBQUUsRUFBRTtJQUN6QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsWUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksU0FBUyxJQUFJ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QUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFSOUcsc0NBb0ZDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgV2ViR0xJbnN0YW5jZSwgV2ViR0xJbnN0YW5jZU9wdCwgU2hhZGVyQ2ZnLCBTY2VuZSwgRGF0YUJ1ZmZlckNmZywgTWVzaCwgVGV4dHVyZUluc3RhbmNlIH0gZnJvbSBcIi4vd2ViZ2xcIjtcclxuaW1wb3J0IHsgdnNfbXVsdGlfbGluZV9kaWZmX3NwZWVkLCBmc19tdWx0aV9saW5lX2RpZmZfc3BlZWQgfSBmcm9tIFwiLi9zaGFkZXJfbXVsdGlfbGluZV9kaWZmX3NwZWVkXCI7XHJcbmltcG9ydCB7IHZzX3Npbl9jb3MsIGZzX3Npbl9jb3MgfSBmcm9tIFwiLi9zaGFkZXJfc2luX2Nvc1wiO1xyXG5pbXBvcnQgeyB2c19tdWx0aV9saW5lX2Nyb3NzLCBmc19tdWx0aV9saW5lX2Nyb3NzIH0gZnJvbSBcIi4vc2hhZGVyX211bHRpX2xpbmVfY3Jvc3NcIjtcclxuaW1wb3J0IHsgdnNfcG9seWdvbiwgZnNfcG9seWdvbiB9IGZyb20gXCIuL3NoYWRlcl9wb2x5Z29uXCI7XHJcbmltcG9ydCB7IHZzX3RleHR1cmUsIGZzX3RleHR1cmUgfSBmcm9tIFwiLi9zaGFkZXJfdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyB2c19wcm9ncmVzcywgZnNfcHJvZ3Jlc3MgfSBmcm9tIFwiLi9zaGFkZXJfcHJvZ3Jlc3NcIjtcclxuXHJcbi8vIGRlY2xhcmUgZnVuY3Rpb24gcG9zdE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxubGV0IHdlYmdsZGVtbzogV2ViR0xJbnN0YW5jZTtcclxuXHJcbig8YW55PnNlbGYpLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IGV2LmRhdGE7XHJcbiAgICBzd2l0Y2ggKGRhdGEuQ01EKSB7XHJcbiAgICAgICAgY2FzZSAoJ0lOSVQnKToge1xyXG4gICAgICAgICAgICBtYWluKGRhdGEuY2FudmFzKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgKCdNT1ZFJyk6IHtcclxuICAgICAgICAgICAgdXBkYXRlTW91c2UoZGF0YS54LCBkYXRhLnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAoJ0lNQUdFJyk6IHtcclxuICAgICAgICAgICAgaWYgKHdlYmdsZGVtbyAmJiAhd2ViZ2xkZW1vLmlzRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhLmltYWdlLCBkYXRhLndpZHRoLCBkYXRhLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBUZXh0dXJlSW5zdGFuY2UubG9hZGVkKGltYWdlRGF0YSwgZGF0YS5mbmFtZSwgd2ViZ2xkZW1vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYG5vIHN1Y2ggQ01EOiBgLCBkYXRhLkNNRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlVGV4dHVyZUxvYWQgPSAoZm5hbWU6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlLCBjYjogKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHZvaWQpID0+IHtcclxuICAgICg8YW55PnNlbGYpLnBvc3RNZXNzYWdlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ01EOiAnSU1BR0UnLFxyXG4gICAgICAgICAgICBmbmFtZTogZm5hbWVcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1haW4gPSAoY2FudmFzOiBPZmZzY3JlZW5DYW52YXMpID0+IHtcclxuICAgIGNvbnN0IG9wdDogV2ViR0xJbnN0YW5jZU9wdCA9IDxhbnk+e307XHJcblxyXG4gICAgb3B0LmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICB3ZWJnbGRlbW8gPSBuZXcgV2ViR0xJbnN0YW5jZShvcHQpO1xyXG4gICAgVGV4dHVyZUluc3RhbmNlLmxvYWRDYWxsID0gY3JlYXRlVGV4dHVyZUxvYWQ7XHJcblxyXG4gICAgY29uc3Qgc2hhZGVyMDEgPSBuZXcgU2hhZGVyQ2ZnKCcwMScsIHZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCwgIGZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCk7XHJcbiAgICBjb25zdCBzaGFkZXIwMiA9IG5ldyBTaGFkZXJDZmcoJzAyJywgdnNfc2luX2NvcywgICAgICAgICAgICAgICAgZnNfc2luX2Nvcyk7XHJcbiAgICBjb25zdCBzaGFkZXIwMyA9IG5ldyBTaGFkZXJDZmcoJzAzJywgdnNfbXVsdGlfbGluZV9jcm9zcywgICAgICAgZnNfbXVsdGlfbGluZV9jcm9zcyk7XHJcbiAgICBjb25zdCBzaGFkZXIwNCA9IG5ldyBTaGFkZXJDZmcoJzA0JywgdnNfcG9seWdvbiwgICAgICAgICAgICAgICAgZnNfcG9seWdvbik7XHJcbiAgICBjb25zdCBzaGFkZXIwNSA9IG5ldyBTaGFkZXJDZmcoJzA1JywgdnNfdGV4dHVyZSwgICAgICAgICAgICAgICAgZnNfdGV4dHVyZSk7XHJcbiAgICBjb25zdCBzaGFkZXIwNiA9IG5ldyBTaGFkZXJDZmcoJzA2JywgdnNfcHJvZ3Jlc3MsICAgICAgICAgICAgICAgZnNfcHJvZ3Jlc3MpO1xyXG5cclxuICAgIGNvbnN0IHNjZW5lMDEgPSBuZXcgU2NlbmUoJzAyJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDIgPSBuZXcgU2NlbmUoJzAyJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDMgPSBuZXcgU2NlbmUoJzAzJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDQgPSBuZXcgU2NlbmUoJzA0Jywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDUgPSBuZXcgU2NlbmUoJzA1Jywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDYgPSBuZXcgU2NlbmUoJzA2Jywgd2ViZ2xkZW1vKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQnVmZmVyMDEgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDEnKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoLTEgLyAyLCAtMSAvIDIsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZFVWKDAsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZFZlcnRleCgxIC8gMiwgLTEgLyAyLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoMSAvIDIsIDEgLyAyLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRVVigxLCAxKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoLTEgLyAyLCAxIC8gMiwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlcjAyID0gbmV3IERhdGFCdWZmZXJDZmcoJzAxJyk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoMSwgMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRVVigwLCAxKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICBkYXRhQnVmZmVyMDIudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQnVmZmVyMDMgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDMnKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRVVigwLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoMSwgLTEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFVWKDEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgxLCAtMSArIDIwIC8gY2FudmFzLmhlaWdodCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVmVydGV4KC0xLCAtMSArIDIwIC8gY2FudmFzLmhlaWdodCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgLy8gY29uc3QgZGF0YUJ1ZmZlcjAyID0gbmV3IERhdGFCdWZmZXJDZmcoJzAyJyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAyLmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICAvLyBjb25zdCBkYXRhQnVmZmVyMDMgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDMnKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgxLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZEZhY2UoMCwgMSwgMik7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAyLCAzKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy51cGRhdGUoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD53ZWJnbGRlbW8uZ2wpO1xyXG5cclxuICAgIC8vIGNvbnN0IGRhdGFCdWZmZXIwNCA9IG5ldyBEYXRhQnVmZmVyQ2ZnKCcwNCcpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgxLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KDEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwNC5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDAxID0gbmV3IE1lc2goJ21lc2gwMScsIGRhdGFCdWZmZXIwMSwgc2hhZGVyMDEpO1xyXG4gICAgLy8gbWVzaDAxLnRyYW5zbGF0ZVswXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMS50cmFuc2xhdGVbMV0gPSAwLjA7XHJcbiAgICAvLyBtZXNoMDEuc2NhbGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDEuc2NhbGVbMV0gPSAwLjU7XHJcbiAgICAvLyBzY2VuZTAxLmFkZE1lc2gobWVzaDAxKTtcclxuXHJcbiAgICAvLyBjb25zdCBtZXNoMDIgPSBuZXcgTWVzaCgnbWVzaDAyJywgZGF0YUJ1ZmZlcjAyLCBzaGFkZXIwMik7XHJcbiAgICAvLyBtZXNoMDIudHJhbnNsYXRlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDAyLnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMi5zY2FsZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwMi5zY2FsZVsxXSA9IDAuNTtcclxuICAgIC8vIHNjZW5lMDIuYWRkTWVzaChtZXNoMDIpO1xyXG5cclxuICAgIC8vIGNvbnN0IG1lc2gwMyA9IG5ldyBNZXNoKCdtZXNoMDMnLCBkYXRhQnVmZmVyMDMsIHNoYWRlcjAzKTtcclxuICAgIC8vIG1lc2gwMy50cmFuc2xhdGVbMF0gPSAwLjA7XHJcbiAgICAvLyBtZXNoMDMudHJhbnNsYXRlWzFdID0gMC41O1xyXG4gICAgLy8gbWVzaDAzLnNjYWxlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDAzLnNjYWxlWzFdID0gMC41O1xyXG4gICAgLy8gc2NlbmUwMy5hZGRNZXNoKG1lc2gwMyk7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDA0ID0gbmV3IE1lc2goJ21lc2gwNCcsIGRhdGFCdWZmZXIwNCwgc2hhZGVyMDQpO1xyXG4gICAgLy8gbWVzaDA0LnRyYW5zbGF0ZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwNC50cmFuc2xhdGVbMV0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDQuc2NhbGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDQuc2NhbGVbMV0gPSAwLjU7XHJcbiAgICAvLyBzY2VuZTA0LmFkZE1lc2gobWVzaDA0KTtcclxuXHJcbiAgICBjb25zdCBtZXNoMDUgPSBuZXcgTWVzaCgnbWVzaDA1JywgZGF0YUJ1ZmZlcjAyLCBzaGFkZXIwNSk7XHJcbiAgICBtZXNoMDUudHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgbWVzaDA1LnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIG1lc2gwNS5zY2FsZVswXSA9IDE7XHJcbiAgICBtZXNoMDUuc2NhbGVbMV0gPSAxO1xyXG4gICAgbWVzaDA1LnRleHR1cmUgPSB3ZWJnbGRlbW8uY3JlYXRlVGV4dHVyZSgnL3Jlc291cmNlcy90ZXh0dXJlLnBuZycpO1xyXG4gICAgc2NlbmUwNS5hZGRNZXNoKG1lc2gwNSk7XHJcblxyXG4gICAgY29uc3QgbWVzaDA2ID0gbmV3IE1lc2goJ21lc2gwNicsIGRhdGFCdWZmZXIwMywgc2hhZGVyMDYpO1xyXG4gICAgbWVzaDA2LnRyYW5zbGF0ZVswXSA9IDAuMDtcclxuICAgIG1lc2gwNi50cmFuc2xhdGVbMV0gPSAwLjA7XHJcbiAgICBtZXNoMDYuc2NhbGVbMF0gPSAxO1xyXG4gICAgbWVzaDA2LnNjYWxlWzFdID0gMTtcclxuICAgIG1lc2gwNi51ZmxvYXQgPSAwLjU7XHJcbiAgICBzY2VuZTA2LmFkZE1lc2gobWVzaDA2KTtcclxuXHJcbiAgICB3ZWJnbGRlbW8ucmVuZGVyTG9vcCA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHdlYmdsZGVtby5jbGVhckNvbG9yKCk7XHJcblxyXG4gICAgICAgIHNjZW5lMDUudmlld3BvcnRbMF0gPSAwO1xyXG4gICAgICAgIHNjZW5lMDUudmlld3BvcnRbMV0gPSAwO1xyXG4gICAgICAgIHNjZW5lMDUudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGg7XHJcbiAgICAgICAgc2NlbmUwNS52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQ7XHJcbiAgICAgICAgc2NlbmUwNS5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzY2VuZTAxLnZpZXdwb3J0WzBdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTAxLnZpZXdwb3J0WzFdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTAxLnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoIC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAxLnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMS5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICBzY2VuZTA2LnZpZXdwb3J0WzBdID0gMDtcclxuICAgICAgICBzY2VuZTA2LnZpZXdwb3J0WzFdID0gMDtcclxuICAgICAgICBzY2VuZTA2LnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoO1xyXG4gICAgICAgIHNjZW5lMDYudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0O1xyXG4gICAgICAgIG1lc2gwNi51ZmxvYXQgPSBNYXRoLmFicyhNYXRoLnNpbihEYXRlLm5vdygpIC8gMTAwMCkpO1xyXG4gICAgICAgIHNjZW5lMDYucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2NlbmUwMi52aWV3cG9ydFswXSA9IHdlYmdsZGVtby53aWR0aCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMi52aWV3cG9ydFsxXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwMi52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aCAvIDIgO1xyXG4gICAgICAgIC8vIHNjZW5lMDIudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMiA7XHJcbiAgICAgICAgLy8gc2NlbmUwMi5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzY2VuZTAzLnZpZXdwb3J0WzBdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTAzLnZpZXdwb3J0WzFdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMy52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMy52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDMucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2NlbmUwNC52aWV3cG9ydFswXSA9IHdlYmdsZGVtby53aWR0aCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwNC52aWV3cG9ydFsxXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDQudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDQudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyBtZXNoMDQucm90YXRlWzJdICAgID0gRGF0ZS5ub3coKSAvIDEwMDAgJSAxMDAwOyAvLyAoMC0xKSDooajnpLrml4vovawgMTgwXHJcbiAgICAgICAgLy8gc2NlbmUwNC5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzY2VuZTA1LnZpZXdwb3J0WzBdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTA1LnZpZXdwb3J0WzFdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTA1LnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoO1xyXG4gICAgICAgIC8vIHNjZW5lMDUudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0O1xyXG4gICAgICAgIC8vIHNjZW5lMDUucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHdlYmdsZGVtby5sb29wKDApO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlTW91c2UgPSAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IHtcclxuICAgIHdlYmdsZGVtby51X21vdXNlWzBdID0geDtcclxuICAgIHdlYmdsZGVtby51X21vdXNlWzFdID0geTtcclxufTsiLCJleHBvcnQgY29uc3QgdnNfbXVsdGlfbGluZV9jcm9zcyA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxudmFyeWluZyAgICAgdmVjMiAgICBzdXJmYWNlUG9zaXRpb247XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG4gICAgc3VyZmFjZVBvc2l0aW9uICAgICAgPSBwb3NpdGlvbjtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfbXVsdGlfbGluZV9jcm9zcyA9IGBcclxuLy8gQXV0aG9yIEBwYXRyaWNpb2d2IC0gMjAxNVxyXG4vLyBUaXRsZTogVHJ1Y2hldCAtIDEwIHByaW50XHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xyXG51bmlmb3JtIGZsb2F0IHVfdGltZTtcclxudW5pZm9ybSB2ZWMzIHVfdHJhbnNsYXRlO1xyXG51bmlmb3JtIHZlYzMgdV9zY2FsZTtcclxudW5pZm9ybSB2ZWMzIHVfcm90YXRlO1xyXG5cclxudmVjMiBicmlja1RpbGUodmVjMiBfc3QsIGZsb2F0IF96b29tKXtcclxuICAgIF9zdCAqPSBfem9vbTtcclxuXHJcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHRoZSBvZmZzZXQgaXMgaGFwcGVuaW5nXHJcbiAgICAvLyBfc3QueCArPSBzdGVwKDEuLCBtb2QoX3N0LnksMi4wKSkgKiAwLjU7XHJcblxyXG4gICAgcmV0dXJuIGZyYWN0KF9zdCk7XHJcbn1cclxuXHJcbmZsb2F0IGJveCh2ZWMyIF9zdCwgdmVjMiBfc2l6ZSl7XHJcbiAgICBfc2l6ZSA9IHZlYzIoMC41KS1fc2l6ZSowLjU7XHJcbiAgICB2ZWMyIHV2ID0gc21vb3Roc3RlcChfc2l6ZSxfc2l6ZSt2ZWMyKDFlLTQpLF9zdCk7XHJcbiAgICB1diAqPSBzbW9vdGhzdGVwKF9zaXplLF9zaXplK3ZlYzIoMWUtNCksdmVjMigxLjApLV9zdCk7XHJcbiAgICByZXR1cm4gdXYueCp1di55O1xyXG59XHJcbmZsb2F0IGNpcmNsZSh2ZWMyIHh5LCB2ZWMyIGNlbnRlciwgZmxvYXQgcmFkaXVzLCBmbG9hdCBzbW9vdGhfZWRnZSkge1xyXG4gICAgZmxvYXQgZGlzdCA9IGRpc3RhbmNlKHh5LGNlbnRlcik7XHJcbiAgICBkaXN0ID0gc21vb3Roc3RlcChyYWRpdXMsIHJhZGl1cyArIHNtb290aF9lZGdlLCBkaXN0KTtcclxuICAgIHJldHVybiBkaXN0O1xyXG59XHJcblxyXG52b2lkIG1haW4odm9pZCl7XHJcbiAgICBmbG9hdCBjb3VudCA9IDIwLjA7XHJcbiAgICB2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbi54eTtcclxuICAgIHN0IC09IHVfdHJhbnNsYXRlLnh5O1xyXG4gICAgc3QgKj0gMS4wL3Vfc2NhbGUueHk7XHJcblxyXG4gICAgZmxvYXQgc2luX3QgPSBzaW4odV90aW1lICogMy4xNCAvIDEwLjApO1xyXG4gICAgZmxvYXQgY29zX3QgPSBjb3ModV90aW1lICogMy4xNCAvIDEwLjApO1xyXG4gICAgZmxvYXQgY29sX2ZsYWc9IG1vZChzdC55ICogY291bnQsIDIuMCkgPCAxLjAgPyAxLjAgOiAtMS4wO1xyXG4gICAgZmxvYXQgcm93X2ZsYWc9IG1vZChzdC54ICogY291bnQsIDIuMCkgPCAxLjAgPyAxLjAgOiAtMS4wO1xyXG4gICAgc3QgKz0gdmVjMihcclxuICAgICAgICBjb2xfZmxhZyAqICggc2luX3QgKiBjb3NfdCA8IDAuMCA/IGNvc190IDogMC4wICkgKiAwLjUsXHJcbiAgICAgICAgcm93X2ZsYWcgKiAoIHNpbl90ICogY29zX3QgPiAwLjAgPyBzaW5fdCA6IDAuMCApICogMC41KTtcclxuICAgIHZlYzMgY29sb3IgPSB2ZWMzKDAuMCk7XHJcblxyXG4gICAgLy8gTW9kZXJuIG1ldHJpYyBicmljayBvZiAyMTVtbSB4IDEwMi41bW0geCA2NW1tXHJcbiAgICAvLyBodHRwOi8vd3d3LmphaGFycmlzb24ubWUudWsvQnJpY2t3b3JrL1NpemVzLmh0bWxcclxuICAgIC8vIHN0IC89IHZlYzIoMi4xNSwwLjY1KS8xLjU7XHJcblxyXG4gICAgLy8gQXBwbHkgdGhlIGJyaWNrIHRpbGluZ1xyXG4gICAgc3QgPSBicmlja1RpbGUoc3QsY291bnQpO1xyXG5cclxuICAgIGNvbG9yID0gdmVjMyhjaXJjbGUoc3QsdmVjMigwLjUsMC41KSwwLjQsIDAuMDUpKTtcclxuXHJcbiAgICAvLyBVbmNvbW1lbnQgdG8gc2VlIHRoZSBzcGFjZSBjb29yZGluYXRlc1xyXG4gICAgLy8gY29sb3IgPSB2ZWMzKHN0LDAuMCk7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwxLjApO1xyXG59XHJcbmA7IiwiZXhwb3J0IGNvbnN0IHZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxudmFyeWluZyAgICAgdmVjMiAgICBzdXJmYWNlUG9zaXRpb247XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG4gICAgc3VyZmFjZVBvc2l0aW9uICAgICAgPSBwb3NpdGlvbjtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfbXVsdGlfbGluZV9kaWZmX3NwZWVkID0gYFxyXG4vLyBBdXRob3IgQHBhdHJpY2lvZ3YgLSAyMDE1XHJcbi8vIFRpdGxlOiBUcnVjaGV0IC0gMTAgcHJpbnRcclxuXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG4jZGVmaW5lIFBJIDMuMTQxNTkyNjUzNTg5NzkzMjM4NDZcclxuXHJcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XHJcbnVuaWZvcm0gdmVjMiB1X21vdXNlO1xyXG51bmlmb3JtIGZsb2F0IHVfdGltZTtcclxudW5pZm9ybSB2ZWMzIHVfdHJhbnNsYXRlO1xyXG51bmlmb3JtIHZlYzMgdV9zY2FsZTtcclxudW5pZm9ybSB2ZWMzIHVfcm90YXRlO1xyXG5cclxuZmxvYXQgcmFuZG9tIChpbiB2ZWMyIF9zdCkge1xyXG4gICAgcmV0dXJuIGZyYWN0KHNpbihkb3QoX3N0Lnh5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmVjMigxMi45ODk4LDc4LjIzMykpKSpcclxuICAgICAgICA0Mzc1OC41NDUzMTIzKTtcclxufVxyXG5cclxudmVjMiB0cnVjaGV0UGF0dGVybihpbiB2ZWMyIF9zdCwgaW4gZmxvYXQgX2luZGV4KXtcclxuICAgIF9pbmRleCA9IGZyYWN0KCgoX2luZGV4LTAuNSkqMi4wKSk7XHJcbiAgICBpZiAoX2luZGV4ID4gMC43NSkge1xyXG4gICAgICAgIF9zdCA9IHZlYzIoMS4wKSAtIF9zdDtcclxuICAgIH0gZWxzZSBpZiAoX2luZGV4ID4gMC41KSB7XHJcbiAgICAgICAgX3N0ID0gdmVjMigxLjAtX3N0LngsX3N0LnkpO1xyXG4gICAgfSBlbHNlIGlmIChfaW5kZXggPiAwLjI1KSB7XHJcbiAgICAgICAgX3N0ID0gMS4wLXZlYzIoMS4wLV9zdC54LF9zdC55KTtcclxuICAgIH1cclxuICAgIHJldHVybiBfc3Q7XHJcbn1cclxuZmxvYXQgY2lyY2xlKHZlYzIgeHksIHZlYzIgY2VudGVyLCBmbG9hdCByYWRpdXMsIGZsb2F0IHNtb290aF9lZGdlKSB7XHJcbiAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2UoeHksY2VudGVyKTtcclxuICAgIGRpc3QgPSBzbW9vdGhzdGVwKHJhZGl1cywgcmFkaXVzICsgc21vb3RoX2VkZ2UsIGRpc3QpO1xyXG4gICAgcmV0dXJuIGRpc3Q7XHJcbn1cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIGZsb2F0IGNvdW50ID0gMjAuMDtcclxuICAgIHZlYzIgc3QgPSBnbF9GcmFnQ29vcmQueHkvdV9yZXNvbHV0aW9uLnh5O1xyXG4gICAgc3QgLT0gdV90cmFuc2xhdGUueHk7XHJcbiAgICBzdCAqPSAxLjAvdV9zY2FsZS54eTtcclxuICAgIHN0ICo9IGNvdW50O1xyXG5cdHN0LnggLT0gdV90aW1lICogMi4wICogIHJhbmRvbSh2ZWMyKGZsb29yKHN0KS55LDEuMCkpO1xyXG5cclxuICAgIHZlYzIgaXBvcyA9IGZsb29yKHN0KTsgIC8vIGludGVnZXJcclxuICAgIHZlYzIgZnBvcyA9IGZyYWN0KHN0KTsgIC8vIGZyYWN0aW9uXHJcblxyXG4gICAgZmxvYXQgc3BlZWQgPSByYW5kb20odmVjMihpcG9zLnkpKTtcclxuXHJcbiAgICBmbG9hdCB4X2YgPSByYW5kb20odmVjMihpcG9zLngsIDApKTtcclxuICAgIGZsb2F0IHlfZiA9IHJhbmRvbSh2ZWMyKDAsIGlwb3MueSkpO1xyXG5cclxuICAgIGZsb2F0IGNvbG9yID0gMC4wO1xyXG4gICAgY29sb3IgPSByYW5kb20odmVjMih4X2YsIHlfZikpO1xyXG5cdGNvbG9yID1cclxuICAgIFx0MS4wIC0gKDEuMCAtIGNpcmNsZShmcmFjdChzdCksIHZlYzIoMC41KSwgMC4yNSwgMC4xKSkgKiBjb2xvclxyXG4gICAgXHQ7XHJcbiAgICB2ZWM0IGZfY29sb3IgPSB2ZWM0KHZlYzMoY29sb3IpLDEuMCk7XHJcbiAgICBmX2NvbG9yLnIgPSBjb2xvciA8IDEuMCA/IDAuMCA6IDEuMDtcclxuICAgIGZfY29sb3IuZyA9IGNvbG9yIDwgMS4wID8gMC4wIDogMS4wO1xyXG4gICAgZl9jb2xvci5iID0gY29sb3IgPCAxLjAgPyBjb2xvciA6IDEuMDtcclxuICAgIGZfY29sb3IuYSA9IGNvbG9yIDwgMS4wID8gY29sb3IgOiAwLjA7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gZl9jb2xvcjtcclxufVxyXG5gOyIsImV4cG9ydCBjb25zdCB2c19wb2x5Z29uID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHN1cmZhY2VQb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbiAgICBzdXJmYWNlUG9zaXRpb24gICAgICA9IHBvc2l0aW9uO1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc19wb2x5Z29uID0gYFxyXG4vLyBBdXRob3IgQHBhdHJpY2lvZ3YgLSAyMDE1XHJcbi8vIFRpdGxlOiBUcnVjaGV0IC0gMTAgcHJpbnRcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbiNkZWZpbmUgUEkgMy4xNDE1OTI2NTM1ODk3OTMyMzg0NlxyXG4jZGVmaW5lIFRXT19QSSA2LjI0NDg1MzA3MTc5NTg2NDc2OTJcclxuXHJcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XHJcbnVuaWZvcm0gdmVjMiB1X21vdXNlO1xyXG51bmlmb3JtIGZsb2F0IHVfdGltZTtcclxudW5pZm9ybSB2ZWMzIHVfdHJhbnNsYXRlO1xyXG51bmlmb3JtIHZlYzMgdV9zY2FsZTtcclxudW5pZm9ybSB2ZWMzIHVfcm90YXRlO1xyXG5cclxubWF0MiByb3RhdGUyZChmbG9hdCBfYW5nbGUpe1xyXG4gICAgcmV0dXJuIG1hdDIoY29zKF9hbmdsZSksLXNpbihfYW5nbGUpLFxyXG4gICAgICAgICAgICAgICAgc2luKF9hbmdsZSksY29zKF9hbmdsZSkpO1xyXG59XHJcblxyXG5mbG9hdCBzaGFwZSh2ZWMyIHN0LCBmbG9hdCBOKXtcclxuICAgIHN0ID0gc3QqMi4tMS47XHJcbiAgICBmbG9hdCBhID0gYXRhbihzdC54LHN0LnkpK1BJO1xyXG4gICAgZmxvYXQgciA9IFRXT19QSS9OO1xyXG4gICAgcmV0dXJuIGFicyhjb3MoZmxvb3IoLjUrYS9yKSpyLWEpKmxlbmd0aChzdCkpO1xyXG59XHJcblxyXG52b2lkIG1haW4oKXtcclxuICAgIHZlYzIgc3QgPSBnbF9GcmFnQ29vcmQueHkvdV9yZXNvbHV0aW9uLnh5O1xyXG4gICAgc3QgLT0gdV90cmFuc2xhdGUueHk7XHJcbiAgICBzdCAqPSAxLjAvdV9zY2FsZS54eTtcclxuXHJcbiAgICAvLyBtb3ZlIHNwYWNlIGZyb20gdGhlIGNlbnRlciB0byB0aGUgdmVjMigwLjApXHJcbiAgICBzdCAtPSB2ZWMyKDAuNSk7XHJcbiAgICAvLyByb3RhdGUgdGhlIHNwYWNlXHJcbiAgICBzdCA9IHJvdGF0ZTJkKCB1X3JvdGF0ZS56ICkgKiBzdDtcclxuICAgIC8vIG1vdmUgaXQgYmFjayB0byB0aGUgb3JpZ2luYWwgcGxhY2VcclxuICAgIHN0ICs9IHZlYzIoMC41KTtcclxuXHJcbiAgICB2ZWMzIGNvbG9yID0gdmVjMygwLjApO1xyXG5cclxuICAgIGNvbG9yID0gdmVjMyggc21vb3Roc3RlcCguNSwgLjUgKyAuMDA1LCBzaGFwZShzdCw2LjApKSApO1xyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IsIDEuMCk7XHJcbn1cclxuYDsiLCJleHBvcnQgY29uc3QgdnNfcHJvZ3Jlc3MgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfcHJvZ3Jlc3MgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG51bmlmb3JtICBmbG9hdCB1X2Zsb2F0O1xyXG51bmlmb3JtICB2ZWMyIHVfcmVzb2x1dGlvbjtcclxuXHJcbnZvaWQgbWFpbih2b2lkKXtcclxuICAgIHZlYzIgc3QgPSBnbF9GcmFnQ29vcmQueHkgLyB1X3Jlc29sdXRpb24ueHk7XHJcbiAgICB2ZWMzIGNvbG9yID0gc3QueCA8IHVfZmxvYXQgPyB2ZWMzKDAuMCwgMC44LCAwLjApIDogdmVjMygwLjIsIDAuMiwgMC4yKTtcclxuICAgIC8vIDIwIOWvueW6lGpz5bGC6L+b5bqm5p2h6auY5bqmXHJcbiAgICBjb2xvciA9IHN0LnkgPiAoMjAuMCAvIHVfcmVzb2x1dGlvbi55IC8gMi4wKSA/IHZlYzMoMC4wKSA6IGNvbG9yO1xyXG5cclxuICAgIGZsb2F0IGFscGhhID0gc3QueSA+ICgyMC4wIC8gdV9yZXNvbHV0aW9uLnkgLyAyLjApID8gMC4wIDogMC44O1xyXG4gICAgYWxwaGEgPSBzdC54IDwgdV9mbG9hdCA/IGFscGhhIDogMC44O1xyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbG9yLCBhbHBoYSApO1xyXG59XHJcbmA7IiwiZXhwb3J0IGNvbnN0IHZzX3Npbl9jb3MgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgc3VyZmFjZVBvc2l0aW9uO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxuICAgIHN1cmZhY2VQb3NpdGlvbiAgICAgID0gcG9zaXRpb247XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX3Npbl9jb3MgPSBgXHJcbi8vIEF1dGhvciBAcGF0cmljaW9ndiAtIDIwMTVcclxuLy8gVGl0bGU6IFRydWNoZXQgLSAxMCBwcmludFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcclxudW5pZm9ybSB2ZWMyIHVfbW91c2U7XHJcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xyXG51bmlmb3JtIHZlYzMgdV90cmFuc2xhdGU7XHJcbnVuaWZvcm0gdmVjMyB1X3NjYWxlO1xyXG51bmlmb3JtIHZlYzMgdV9yb3RhdGU7XHJcblxyXG52b2lkIG1haW4oKXtcclxuICAgIHZlYzIgc3QgPSBnbF9GcmFnQ29vcmQueHkvdV9yZXNvbHV0aW9uLnh5O1xyXG4gICAgc3QgLT0gdV90cmFuc2xhdGUueHk7XHJcbiAgICBzdCAqPSAxLjAvdV9zY2FsZS54eTtcclxuICAgIHZlYzMgY29sb3IgPSB2ZWMzKDAuMCk7XHJcblxyXG4gICAgdmVjMiBwb3MgPSB2ZWMyKDAuNSktc3Q7XHJcblxyXG4gICAgZmxvYXQgciA9IGRpc3RhbmNlKHBvcywgdmVjMigwLjAsMC4wKSkqMi4wO1xyXG4gICAgZmxvYXQgYSA9IGF0YW4ocG9zLnkscG9zLngpO1xyXG4gICAgZmxvYXQgeHh4ID0gZmxvb3IodV90aW1lIC8gMTAuMCkgKiAxMC4wIC0gdV90aW1lIDtcclxuICAgIGZsb2F0IHl5eSA9IGZsb29yKHVfdGltZSAvIDIwLjApICogMjAuMCAtIHVfdGltZSA7XHJcbiAgICBmbG9hdCBmID0gY29zKGEqMC41KTtcclxuICAgIC8vIGYgPSBhYnMoY29zKGEqMy4pKTtcclxuICAgIC8vIGYgPSBhYnMoY29zKGEqMi41KSkqLjUrLjM7XHJcbiAgICAvLyBmID0gYWJzKGNvcyhhKjEyLikqc2luKGEqMy4pKSouOCsuMTtcclxuICAgIC8vIGYgPSBzbW9vdGhzdGVwKC0uNSwxLiwgY29zKGEqMTAuKSkqMC4yKzAuNTtcclxuICAgIGYgPSBhYnMoIGNvcyhhKnh4eCkgKiBzaW4oYSp5eXkpICkgKi45ICsgLjI7XHJcblxyXG4gICAgY29sb3IgPSB2ZWMzKCAxLi1zbW9vdGhzdGVwKGYsZiswLjAwNSxyKSApO1xyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IsIDEuMCk7XHJcbn1cclxuYDsiLCJleHBvcnQgY29uc3QgdnNfdGV4dHVyZSA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxudmFyeWluZyAgICAgdmVjMiAgICBzdXJmYWNlUG9zaXRpb247XHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgYV91djtcclxudmFyeWluZyAgICAgdmVjMiAgICB2VVY7XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG4gICAgc3VyZmFjZVBvc2l0aW9uICAgICAgPSBwb3NpdGlvbjtcclxuICAgIHZVViA9IGFfdXY7XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX3RleHR1cmUgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG52YXJ5aW5nICB2ZWMyIHZVVjtcclxudW5pZm9ybSAgc2FtcGxlcjJEIHVfc2FtcGxlcjtcclxuXHJcbnZvaWQgbWFpbih2b2lkKXtcclxuICAgIC8vIFsgMCwgMCwgMCwgMSBdICByZ2Jh6aKc6Imy5ZCR6YePXHJcbiAgICAvLyBnbF9GcmFnQ29sb3IgPSB2ZWM0KCB2Q29sb3IsIDEuICk7XHJcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQoIHVfc2FtcGxlciwgdlVWICk7XHJcbn1cclxuYDsiLCIvKipcclxuICogV0VCR0wg5Z+65pys5aSE55CGXHJcbiAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJHTEluc3RhbmNlT3B0IHtcclxuICAgIGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhZGVyQ2ZnIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBzbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHZzOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZnM6IHN0cmluZztcclxuICAgIHB1YmxpYyB2c2hhZGVyOiBXZWJHTFNoYWRlciB8IHVuZGVmaW5lZCAgICA7XHJcbiAgICBwdWJsaWMgZnNoYWRlcjogV2ViR0xTaGFkZXIgfCB1bmRlZmluZWQgICAgO1xyXG4gICAgcHVibGljIHByb2dyYW1lOiBXZWJHTFByb2dyYW0gfCB1bmRlZmluZWQgIDtcclxuICAgIHB1YmxpYyB1X3RpbWVfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgICAgICAgO1xyXG4gICAgcHVibGljIHVfbW91c2VfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgICAgICA7XHJcbiAgICBwdWJsaWMgdV9yZXNvbHV0aW9uX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgIDtcclxuICAgIHB1YmxpYyB1X3RyYW5zbGF0ZV9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgO1xyXG4gICAgcHVibGljIHVfc2NhbGVfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgIDtcclxuICAgIHB1YmxpYyB1X3JvdGF0ZV9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgO1xyXG4gICAgcHVibGljIHVfZmxvYXRfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgIDtcclxuICAgIHB1YmxpYyBhX3Bvc2l0aW9uX2xvYzogbnVtYmVyIHwgdW5kZWZpbmVkICAgICAgICAgICAgICAgICAgO1xyXG4gICAgcHVibGljIGFfdXY6IG51bWJlciB8IHVuZGVmaW5lZCAgICAgICAgICAgICAgICAgIDtcclxuICAgIHB1YmxpYyB1X3RleHR1cmU6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICA7XHJcbiAgICBwcml2YXRlIHNoYWRlcl9wcm9ncmFtOiBXZWJHTFByb2dyYW0gfCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdHJ1Y3RvcihzbmFtZTogc3RyaW5nLCB2czogc3RyaW5nLCBmczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zbmFtZSA9IHNuYW1lO1xyXG4gICAgICAgIHRoaXMuZnMgPSBmcztcclxuICAgICAgICB0aGlzLnZzID0gdnM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvZ3JhbWUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG5cclxuICAgICAgICBjb25zdCBzaGFkZXJfZnJhZ21lbnQgICA9IDxXZWJHTFNoYWRlcj50aGlzLmdldEZTU2hhZGVyKGdsKTtcclxuICAgICAgICBjb25zdCBzaGFkZXJfdmVydGV4ICAgICA9IDxXZWJHTFNoYWRlcj50aGlzLmdldFZTU2hhZGVyKGdsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hhZGVyX3Byb2dyYW0gPT09IHVuZGVmaW5lZCAmJiBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyX2ZyYWdtZW50LCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlcl9wcm9ncmFtICA9IDxXZWJHTFByb2dyYW0+Z2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJfcHJvZ3JhbSA9IHNoYWRlcl9wcm9ncmFtO1xyXG5cclxuICAgICAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgc2hhZGVyX3ZlcnRleCk7XHJcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIHNoYWRlcl9mcmFnbWVudCk7XHJcblxyXG4gICAgICAgICAgICBnbC5saW5rUHJvZ3JhbSg8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51X21vdXNlX2xvYyAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfbW91c2VgKTtcclxuXHJcbiAgICAgICAgdGhpcy51X3RpbWVfbG9jICAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfdGltZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfcmVzb2x1dGlvbl9sb2MgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9yZXNvbHV0aW9uYCk7XHJcblxyXG4gICAgICAgIHRoaXMudV90cmFuc2xhdGVfbG9jICAgID0gPFdlYkdMVW5pZm9ybUxvY2F0aW9uPmdsLmdldFVuaWZvcm1Mb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIGB1X3RyYW5zbGF0ZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfc2NhbGVfbG9jICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9zY2FsZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfcm90YXRlX2xvYyAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9yb3RhdGVgKTtcclxuXHJcbiAgICAgICAgdGhpcy51X2Zsb2F0X2xvYyAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfZmxvYXRgKTtcclxuXHJcbiAgICAgICAgdGhpcy5hX3Bvc2l0aW9uX2xvYyAgICAgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sICdwb3NpdGlvbicpO1xyXG5cclxuICAgICAgICB0aGlzLmFfdXYgICAgICAgICAgICAgICA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgJ2FfdXYnKTtcclxuXHJcbiAgICAgICAgdGhpcy51X3RleHR1cmUgICAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgJ3Vfc2FtcGxlcicpO1xyXG5cclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLmFfcG9zaXRpb25fbG9jKTtcclxuXHJcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5hX3V2KTtcclxuXHJcbiAgICAgICAgZ2wudW5pZm9ybTFpKHRoaXMudV90ZXh0dXJlLCAwKTtcclxuXHJcbiAgICAgICAgZ2wudXNlUHJvZ3JhbSg8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFZTU2hhZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoZ2wgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52c2hhZGVyKSB7IHJldHVybiB0aGlzLnZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgdGhpcy52c2hhZGVyICA9IDxXZWJHTFNoYWRlcj5nbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZzaGFkZXIgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52cyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLnZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMudnNoYWRlciwgdGhpcy52cyk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZzaGFkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLnZzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFUlJPUiBJTiAnVkVSVEVYX1NIQURFUicgU0hBREVSOiAkeyBnbC5nZXRTaGFkZXJJbmZvTG9nKHRoaXMudnNoYWRlcikgfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52c2hhZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudnNoYWRlcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGU1NoYWRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGdsID09PSBudWxsKSB7IHJldHVybiB0aGlzLmZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZnNoYWRlcikgeyByZXR1cm4gdGhpcy5mc2hhZGVyOyB9XHJcblxyXG4gICAgICAgIHRoaXMuZnNoYWRlciAgPSA8V2ViR0xTaGFkZXI+Z2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZzaGFkZXIgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMuZnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5mcyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLmZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnNoYWRlciwgdGhpcy5mcyk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLmZzaGFkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLmZzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFUlJPUiBJTiAnRlJBR01FTlRfU0hBREVSJyBTSEFERVI6ICR7IGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5mc2hhZGVyKSB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZzaGFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mc2hhZGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUJ1ZmZlckNmZyB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdm5hbWU6ICAgICAgICAgIHN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJ0ZXhfbG9jOiAgICAgICAgICAgICAgbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHZlcnRleF9kYXRhOiAgICBudW1iZXJbXSAgICA9IFtdO1xyXG4gICAgcHVibGljIHZlcnRleF9idWZmZXI6ICAgICAgICAgICBXZWJHTEJ1ZmZlciB8IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBmYWNlX2xvYzogICAgICAgICAgICAgICAgbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZhY2VfZGF0YTogICAgICBudW1iZXJbXSAgICA9IFtdO1xyXG4gICAgcHVibGljIGZhY2VfYnVmZmVyOiAgICAgICAgICAgICBXZWJHTEJ1ZmZlciB8IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyByZWFkb25seSB1dl9kYXRhOiAgICAgICAgbnVtYmVyW10gICAgPSBbXTtcclxuICAgIHB1YmxpYyB1dl9idWZmZXI6ICAgICAgICAgICAgICAgV2ViR0xCdWZmZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcih2bmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52bmFtZSA9IHZuYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFZlcnRleCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhfZGF0YS5wdXNoKHgsIHkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZEZhY2UoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmFjZV9kYXRhLnB1c2goYSwgYiwgYyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVVYodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnV2X2RhdGEucHVzaCh1LCB2KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVmVydGV4KGdsKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVVWKGdsKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUZhY2UoZ2wpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZVZlcnRleChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZlcnRleF9idWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhfYnVmZmVyICA9IDxXZWJHTEJ1ZmZlcj5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleF9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodGhpcy52ZXJ0ZXhfZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3RpdmVGYWNlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZmFjZV9idWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNlX2J1ZmZlciAgPSA8V2ViR0xCdWZmZXI+Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmZhY2VfYnVmZmVyKTtcclxuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBVaW50MTZBcnJheSh0aGlzLmZhY2VfZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3RpdmVVVihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnV2X2J1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLnV2X2J1ZmZlciAgPSA8V2ViR0xCdWZmZXI+Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy51dl9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodGhpcy51dl9kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzaCB7XHJcbiAgICBwdWJsaWMgdGV4dHVyZTogVGV4dHVyZUluc3RhbmNlIHwgbnVsbDtcclxuICAgIHB1YmxpYyByZWFkb25seSBkYXRhQnVmZmVyQ2ZnOiBEYXRhQnVmZmVyQ2ZnO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNoYWRlckNmZzogU2hhZGVyQ2ZnO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHJhbnNsYXRlOiBudW1iZXJbXSA9IFswLCAwLCAwXTtcclxuICAgIHB1YmxpYyByZWFkb25seSBzY2FsZTogbnVtYmVyW10gICAgID0gWzEsIDEsIDFdO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJvdGF0ZTogbnVtYmVyW10gICAgPSBbMCwgMCwgMF07XHJcbiAgICBwdWJsaWMgdWZsb2F0OiBudW1iZXIgICAgICA9IDAuMDtcclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGdlbzogRGF0YUJ1ZmZlckNmZywgbWF0ZXJpYWw6IFNoYWRlckNmZykge1xyXG4gICAgICAgIHRoaXMuaWQgICAgICAgICAgICAgPSBpZDtcclxuICAgICAgICB0aGlzLmRhdGFCdWZmZXJDZmcgID0gZ2VvO1xyXG4gICAgICAgIHRoaXMuc2hhZGVyQ2ZnICAgICAgPSBtYXRlcmlhbDtcclxuICAgICAgICB0aGlzLnRleHR1cmUgICAgICAgID0gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoc2NlbmU6IFNjZW5lKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5zY2VuZS5lbmdpbmUuZ2w7XHJcblxyXG4gICAgICAgIGNvbnN0IHNoYWRlciA9IDxTaGFkZXJDZmc+dGhpcy5zaGFkZXJDZmc7XHJcblxyXG4gICAgICAgIHNoYWRlci5nZXRQcm9ncmFtZShnbCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmFjdGl2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2wudW5pZm9ybTJmdig8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfbW91c2VfbG9jLCAgICBzY2VuZS5lbmdpbmUudV9tb3VzZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV90aW1lX2xvYywgICAgICBzY2VuZS5lbmdpbmUudGltZXN0YW1wICogMC4wMDEpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xZig8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfZmxvYXRfbG9jLCAgICAgIHRoaXMudWZsb2F0KTtcclxuXHJcbiAgICAgICAgZ2wudW5pZm9ybTJmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9yZXNvbHV0aW9uX2xvYywgc2NlbmUuZW5naW5lLndpZHRoLCAgc2NlbmUuZW5naW5lLmhlaWdodCk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV90cmFuc2xhdGVfbG9jLCAgdGhpcy50cmFuc2xhdGVbMF0sICB0aGlzLnRyYW5zbGF0ZVsxXSwgIHRoaXMudHJhbnNsYXRlWzJdKTtcclxuICAgICAgICBnbC51bmlmb3JtM2YoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3NjYWxlX2xvYywgICAgICB0aGlzLnNjYWxlWzBdLCAgICAgIHRoaXMuc2NhbGVbMV0sICAgICAgdGhpcy5zY2FsZVsyXSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9yb3RhdGVfbG9jLCAgICAgdGhpcy5yb3RhdGVbMF0sICAgICB0aGlzLnJvdGF0ZVsxXSwgICAgIHRoaXMucm90YXRlWzJdKTtcclxuXHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIDxXZWJHTEJ1ZmZlcj50aGlzLmRhdGFCdWZmZXJDZmcudmVydGV4X2J1ZmZlcik7XHJcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcig8bnVtYmVyPnNoYWRlci5hX3Bvc2l0aW9uX2xvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA0ICogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCA8V2ViR0xCdWZmZXI+dGhpcy5kYXRhQnVmZmVyQ2ZnLnV2X2J1ZmZlcik7XHJcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcig8bnVtYmVyPnNoYWRlci5hX3V2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgKiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgPFdlYkdMQnVmZmVyPnRoaXMuZGF0YUJ1ZmZlckNmZy5mYWNlX2J1ZmZlcik7XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5VTlNJR05FRF9TSE9SVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICBnbC5mbHVzaCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmUge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNuYW1lOiAgc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGVuZ2luZTogV2ViR0xJbnN0YW5jZTtcclxuICAgIHB1YmxpYyByZWFkb25seSB2aWV3cG9ydDogICBudW1iZXJbXSA9IFswLCAwLCAwLCAwXTtcclxuICAgIHB1YmxpYyByZWFkb25seSBtZXNoTWFwOiAgICBNYXA8c3RyaW5nLCBNZXNoPiA9IG5ldyBNYXAoKTtcclxuICAgIGNvbnN0cnVjdG9yKHNuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuc25hbWUgID0gc25hbWU7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkTWVzaChtZXNoOiBNZXNoKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoTWFwLnNldChtZXNoLmlkLCBtZXNoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoaXNDbGVhcjogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmVuZ2luZS5nbDtcclxuXHJcbiAgICAgICAgZ2wudmlld3BvcnQodGhpcy52aWV3cG9ydFswXSwgdGhpcy52aWV3cG9ydFsxXSwgdGhpcy52aWV3cG9ydFsyXSwgdGhpcy52aWV3cG9ydFszXSk7XHJcbiAgICAgICAgaWYgKGlzQ2xlYXIpIHtcclxuICAgICAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1lc2hNYXAuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNoLnJlbmRlcih0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHR1cmVJbnN0YW5jZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRDYWxsID0gKHBhdGg6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlLCBjYjogKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHZvaWQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgLy8gaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGNiKGltZywgcGF0aCwgZW5naW5lKTtcclxuICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgLy8gaW1nLnNyYyA9IHBhdGg7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZGVkID0gKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHtcclxuICAgICAgICBjb25zdCB0ZXhJbnMgPSA8VGV4dHVyZUluc3RhbmNlPmVuZ2luZS5nZXRUZXh0dXJlKGZuYW1lKTtcclxuICAgICAgICBpZiAodGV4SW5zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IEdMID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5lbmdpbmUuZ2w7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleCAgID0gPFdlYkdMVGV4dHVyZT5HTC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIEdMLnBpeGVsU3RvcmVpKEdMLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG4gICAgICAgICAgICBHTC5iaW5kVGV4dHVyZShHTC5URVhUVVJFXzJELCB0ZXgpO1xyXG4gICAgICAgICAgICBHTC50ZXhJbWFnZTJEKEdMLlRFWFRVUkVfMkQsIDAsIEdMLlJHQkEsIEdMLlJHQkEsIEdMLlVOU0lHTkVEX0JZVEUsIGltZyk7XHJcbiAgICAgICAgICAgIEdMLnRleFBhcmFtZXRlcmkoR0wuVEVYVFVSRV8yRCwgR0wuVEVYVFVSRV9NQUdfRklMVEVSLCBHTC5MSU5FQVIpO1xyXG4gICAgICAgICAgICBHTC50ZXhQYXJhbWV0ZXJpKEdMLlRFWFRVUkVfMkQsIEdMLlRFWFRVUkVfTUlOX0ZJTFRFUiwgR0wuTkVBUkVTVF9NSVBNQVBfTElORUFSKTtcclxuICAgICAgICAgICAgR0wuZ2VuZXJhdGVNaXBtYXAoR0wuVEVYVFVSRV8yRCk7XHJcbiAgICAgICAgICAgIEdMLmJpbmRUZXh0dXJlKEdMLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgICAgICB0ZXhJbnMuX3RleCA9IHRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGZuYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF90ZXg6IFdlYkdMVGV4dHVyZSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9lbmdpbmU6IFdlYkdMSW5zdGFuY2U7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuZm5hbWUgICAgICA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lICAgID0gZW5naW5lO1xyXG4gICAgICAgIHRoaXMuX3RleCAgICAgICA9IG51bGw7XHJcblxyXG4gICAgICAgIGVuZ2luZS5hZGRUZXh0dXJlKHRoaXMpO1xyXG4gICAgICAgIFRleHR1cmVJbnN0YW5jZS5sb2FkQ2FsbChuYW1lLCBlbmdpbmUsIFRleHR1cmVJbnN0YW5jZS5sb2FkZWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZSgpIHtcclxuICAgICAgICBjb25zdCBHTCAgICA9IDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5fZW5naW5lLmdsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdGV4KSB7XHJcbiAgICAgICAgICAgIEdMLmFjdGl2ZVRleHR1cmUoR0wuVEVYVFVSRTApO1xyXG4gICAgICAgICAgICBHTC5iaW5kVGV4dHVyZShHTC5URVhUVVJFXzJELCB0aGlzLl90ZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lLmRlbFRleHR1cmUodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJHTEluc3RhbmNlIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBjYW52YXM6IE9mZnNjcmVlbkNhbnZhcztcclxuICAgIHB1YmxpYyByZWFkb25seSBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgbnVsbDtcclxuICAgIHB1YmxpYyByZWFkb25seSB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGhlaWdodDogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmlmb3Jtc18xZjogc3RyaW5nW10gICAgPSBbJ3VfdGltZSddO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmlmb3Jtc18yZnY6IHN0cmluZ1tdICAgPSBbJ3VfbW91c2UnXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdW5pZm9ybXNfMmY6IHN0cmluZ1tdICAgID0gWyd1X3Jlc29sdXRpb24nXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgY29udGVudE1vZGVzID0gW1wid2ViZ2wyXCIsIFwid2ViZ2xcIiwgXCJleHBlcmltZW50YWwtd2ViZ2xcIiwgXCJ3ZWJraXQtM2RcIiwgXCJtb3otd2ViZ2xcIl07XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdV9tb3VzZTogbnVtYmVyW10gICAgICAgID0gWzAsIDBdO1xyXG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc2NlbmVNYXA6IE1hcDxzdHJpbmcsIFNjZW5lPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgdGV4dHVyZU1hcDogTWFwPHN0cmluZywgVGV4dHVyZUluc3RhbmNlPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgX2lzRGVzdHJveTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGdldCBpc0Rlc3Ryb3koKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGVzdHJveTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG9wdDogV2ViR0xJbnN0YW5jZU9wdCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gb3B0LmNhbnZhcztcclxuICAgICAgICB0aGlzLndpZHRoICA9IHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZ2wgICAgID0gV2ViR0xJbnN0YW5jZS5jdHhJbml0RnVuYyh0aGlzLmNhbnZhcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjdHhJbml0RnVuYyhjYW52YXM6IE9mZnNjcmVlbkNhbnZhcyk6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IG51bGwge1xyXG4gICAgICAgIGxldCBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IFdlYkdMSW5zdGFuY2UuY29udGVudE1vZGVzLmxlbmd0aDsgKytpaSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBnbCA9IDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+Y2FudmFzLmdldENvbnRleHQoPE9mZnNjcmVlblJlbmRlcmluZ0NvbnRleHRJZD5XZWJHTEluc3RhbmNlLmNvbnRlbnRNb2Rlc1tpaV0sIHthbHBoYSA6IHRydWUsIGFudGlhbGlhcyA6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlcmUgaXMgbm90IHdlYmdsIGNvbXBhdGlibGUgOiggYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2w7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY3JlYXRlVGV4dHVyZShmbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRleDogVGV4dHVyZUluc3RhbmNlID0gPFRleHR1cmVJbnN0YW5jZT50aGlzLnRleHR1cmVNYXAuZ2V0KGZuYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRleCA9IG5ldyBUZXh0dXJlSW5zdGFuY2UoZm5hbWUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRleDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRUZXh0dXJlKHRleDogVGV4dHVyZUluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlTWFwLnNldCh0ZXguZm5hbWUsIHRleCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGV4dHVyZShmbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZU1hcC5nZXQoZm5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbFRleHR1cmUodGV4OiBUZXh0dXJlSW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLnRleHR1cmVNYXAuZGVsZXRlKHRleC5mbmFtZSk7XHJcbiAgICAgICAgKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5nbCkuZGVsZXRlVGV4dHVyZSh0ZXgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFNjZW5lKGNmZzogU2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lTWFwLnNldChjZmcuc25hbWUsIGNmZyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXJDb2xvcigpIHtcclxuICAgICAgICBjb25zdCBnbCA9ICg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PnRoaXMuZ2wpO1xyXG4gICAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDAuMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9vcCA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckxvb3AodGltZXN0YW1wKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmxvb3AsIDUwKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXJMb29wKHRpbWVzdGFtcDogbnVtYmVyKSB7fVxyXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5faXNEZXN0cm95ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRleHR1cmVNYXAuZm9yRWFjaCgodGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsVGV4dHVyZSh0ZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
