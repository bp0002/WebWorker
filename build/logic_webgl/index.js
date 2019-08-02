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
    const dataBuffer04 = new webgl_1.DataBufferCfg('04');
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
    dataBuffer04.update(webgldemo.gl);
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
    const meshicon = new webgl_1.Mesh('meshicon', dataBuffer02, shader05);
    meshicon.translate[0] = 0.0;
    meshicon.translate[1] = -0.2;
    meshicon.scale[0] = 0.5;
    meshicon.scale[1] = 0.5;
    meshicon.texture = webgldemo.createTexture('/resources/zhuangshi.png');
    scene05.addMesh(meshicon);
    const mesh05 = new webgl_1.Mesh('mesh05', dataBuffer02, shader05);
    mesh05.translate[0] = 0.0;
    mesh05.translate[1] = 0.0;
    mesh05.scale[0] = 0.5;
    mesh05.scale[1] = 0.5;
    mesh05.texture = webgldemo.createTexture('/resources/choice_light.png');
    scene05.addMesh(mesh05);
    // const mesh06 = new Mesh('mesh06', dataBuffer03, shader06);
    // mesh06.translate[0] = 0.0;
    // mesh06.translate[1] = 0.0;
    // mesh06.scale[0] = 1;
    // mesh06.scale[1] = 1;
    // mesh06.ufloat = 0.5;
    // scene06.addMesh(mesh06);
    const mesh07 = new webgl_1.Mesh('mesh07', dataBuffer04, shader05);
    mesh07.translate[0] = 0.0;
    mesh07.translate[1] = 0.0;
    mesh07.scale[0] = 1;
    mesh07.scale[1] = 1;
    mesh07.texture = webgldemo.createTexture('/resources/choice_light02.png');
    scene05.addMesh(mesh07);
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
        // scene06.viewport[0] = 0;
        // scene06.viewport[1] = 0;
        // scene06.viewport[2] = webgldemo.width;
        // scene06.viewport[3] = webgldemo.height;
        // mesh06.ufloat = Math.abs(Math.sin(Date.now() / 1000));
        // scene06.render(false);
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
        shader.u_mouse_loc && gl.uniform2fv(shader.u_mouse_loc, scene.engine.u_mouse);
        shader.u_time_loc && gl.uniform1f(shader.u_time_loc, scene.engine.timestamp * 0.001);
        shader.u_float_loc && gl.uniform1f(shader.u_float_loc, this.ufloat);
        shader.u_resolution_loc && gl.uniform2f(shader.u_resolution_loc, scene.engine.width, scene.engine.height);
        shader.u_translate_loc && gl.uniform3f(shader.u_translate_loc, this.translate[0], this.translate[1], this.translate[2]);
        shader.u_scale_loc && gl.uniform3f(shader.u_scale_loc, this.scale[0], this.scale[1], this.scale[2]);
        shader.u_rotate_loc && gl.uniform3f(shader.u_rotate_loc, this.rotate[0], this.rotate[1], this.rotate[2]);
        if (shader.a_position_loc >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.vertex_buffer);
            gl.vertexAttribPointer(shader.a_position_loc, 2, gl.FLOAT, false, 4 * 2, 0);
        }
        if (shader.a_uv >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.uv_buffer);
            gl.vertexAttribPointer(shader.a_uv, 2, gl.FLOAT, false, 4 * 2, 0);
        }
        if (this.dataBufferCfg.face_buffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.dataBufferCfg.face_buffer);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }
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
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbG9naWNfd2ViZ2wvaW5kZXgudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfY3Jvc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfZGlmZl9zcGVlZC50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcG9seWdvbi50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcHJvZ3Jlc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3Npbl9jb3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3RleHR1cmUudHMiLCJzcmMvbG9naWNfd2ViZ2wvd2ViZ2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1DQUFrSDtBQUNsSCxpRkFBb0c7QUFDcEcscURBQTBEO0FBQzFELHVFQUFxRjtBQUNyRixxREFBMEQ7QUFDMUQscURBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxvREFBb0Q7QUFFcEQ7O0dBRUc7QUFDSCxJQUFJLFNBQXdCLENBQUM7QUFFdkIsSUFBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWdCLEVBQUUsRUFBRTtJQUN6QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsWUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksU0FBUyxJQUFJ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SUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBUU0sVUFBVSxDQUFDLFNBQWlCLElBQUcsQ0FBQztJQUNoQyxPQUFPO1FBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE5RXNCLHlCQUFXLEdBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsMEJBQVksR0FBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLHlCQUFXLEdBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsMEJBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBUjlHLHNDQW9GQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IFdlYkdMSW5zdGFuY2UsIFdlYkdMSW5zdGFuY2VPcHQsIFNoYWRlckNmZywgU2NlbmUsIERhdGFCdWZmZXJDZmcsIE1lc2gsIFRleHR1cmVJbnN0YW5jZSB9IGZyb20gXCIuL3dlYmdsXCI7XHJcbmltcG9ydCB7IHZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCwgZnNfbXVsdGlfbGluZV9kaWZmX3NwZWVkIH0gZnJvbSBcIi4vc2hhZGVyX211bHRpX2xpbmVfZGlmZl9zcGVlZFwiO1xyXG5pbXBvcnQgeyB2c19zaW5fY29zLCBmc19zaW5fY29zIH0gZnJvbSBcIi4vc2hhZGVyX3Npbl9jb3NcIjtcclxuaW1wb3J0IHsgdnNfbXVsdGlfbGluZV9jcm9zcywgZnNfbXVsdGlfbGluZV9jcm9zcyB9IGZyb20gXCIuL3NoYWRlcl9tdWx0aV9saW5lX2Nyb3NzXCI7XHJcbmltcG9ydCB7IHZzX3BvbHlnb24sIGZzX3BvbHlnb24gfSBmcm9tIFwiLi9zaGFkZXJfcG9seWdvblwiO1xyXG5pbXBvcnQgeyB2c190ZXh0dXJlLCBmc190ZXh0dXJlIH0gZnJvbSBcIi4vc2hhZGVyX3RleHR1cmVcIjtcclxuaW1wb3J0IHsgdnNfcHJvZ3Jlc3MsIGZzX3Byb2dyZXNzIH0gZnJvbSBcIi4vc2hhZGVyX3Byb2dyZXNzXCI7XHJcblxyXG4vLyBkZWNsYXJlIGZ1bmN0aW9uIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IGFueSk6IHZvaWQ7XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmxldCB3ZWJnbGRlbW86IFdlYkdMSW5zdGFuY2U7XHJcblxyXG4oPGFueT5zZWxmKS5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBldi5kYXRhO1xyXG4gICAgc3dpdGNoIChkYXRhLkNNRCkge1xyXG4gICAgICAgIGNhc2UgKCdJTklUJyk6IHtcclxuICAgICAgICAgICAgbWFpbihkYXRhLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICgnTU9WRScpOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZU1vdXNlKGRhdGEueCwgZGF0YS55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgKCdJTUFHRScpOiB7XHJcbiAgICAgICAgICAgIGlmICh3ZWJnbGRlbW8gJiYgIXdlYmdsZGVtby5pc0Rlc3Ryb3kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoZGF0YS5pbWFnZSwgZGF0YS53aWR0aCwgZGF0YS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgVGV4dHVyZUluc3RhbmNlLmxvYWRlZChpbWFnZURhdGEsIGRhdGEuZm5hbWUsIHdlYmdsZGVtbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBubyBzdWNoIENNRDogYCwgZGF0YS5DTUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZVRleHR1cmVMb2FkID0gKGZuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSwgY2I6IChpbWc6IEltYWdlRGF0YSwgZm5hbWU6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAoPGFueT5zZWxmKS5wb3N0TWVzc2FnZShcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENNRDogJ0lNQUdFJyxcclxuICAgICAgICAgICAgZm5hbWU6IGZuYW1lXHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYWluID0gKGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzKSA9PiB7XHJcbiAgICBjb25zdCBvcHQ6IFdlYkdMSW5zdGFuY2VPcHQgPSA8YW55Pnt9O1xyXG5cclxuICAgIG9wdC5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgd2ViZ2xkZW1vID0gbmV3IFdlYkdMSW5zdGFuY2Uob3B0KTtcclxuICAgIFRleHR1cmVJbnN0YW5jZS5sb2FkQ2FsbCA9IGNyZWF0ZVRleHR1cmVMb2FkO1xyXG5cclxuICAgIGNvbnN0IHNoYWRlcjAxID0gbmV3IFNoYWRlckNmZygnMDEnLCB2c19tdWx0aV9saW5lX2RpZmZfc3BlZWQsICBmc19tdWx0aV9saW5lX2RpZmZfc3BlZWQpO1xyXG4gICAgY29uc3Qgc2hhZGVyMDIgPSBuZXcgU2hhZGVyQ2ZnKCcwMicsIHZzX3Npbl9jb3MsICAgICAgICAgICAgICAgIGZzX3Npbl9jb3MpO1xyXG4gICAgY29uc3Qgc2hhZGVyMDMgPSBuZXcgU2hhZGVyQ2ZnKCcwMycsIHZzX211bHRpX2xpbmVfY3Jvc3MsICAgICAgIGZzX211bHRpX2xpbmVfY3Jvc3MpO1xyXG4gICAgY29uc3Qgc2hhZGVyMDQgPSBuZXcgU2hhZGVyQ2ZnKCcwNCcsIHZzX3BvbHlnb24sICAgICAgICAgICAgICAgIGZzX3BvbHlnb24pO1xyXG4gICAgY29uc3Qgc2hhZGVyMDUgPSBuZXcgU2hhZGVyQ2ZnKCcwNScsIHZzX3RleHR1cmUsICAgICAgICAgICAgICAgIGZzX3RleHR1cmUpO1xyXG4gICAgY29uc3Qgc2hhZGVyMDYgPSBuZXcgU2hhZGVyQ2ZnKCcwNicsIHZzX3Byb2dyZXNzLCAgICAgICAgICAgICAgIGZzX3Byb2dyZXNzKTtcclxuXHJcbiAgICBjb25zdCBzY2VuZTAxID0gbmV3IFNjZW5lKCcwMicsIHdlYmdsZGVtbyk7XHJcbiAgICBjb25zdCBzY2VuZTAyID0gbmV3IFNjZW5lKCcwMicsIHdlYmdsZGVtbyk7XHJcbiAgICBjb25zdCBzY2VuZTAzID0gbmV3IFNjZW5lKCcwMycsIHdlYmdsZGVtbyk7XHJcbiAgICBjb25zdCBzY2VuZTA0ID0gbmV3IFNjZW5lKCcwNCcsIHdlYmdsZGVtbyk7XHJcbiAgICBjb25zdCBzY2VuZTA1ID0gbmV3IFNjZW5lKCcwNScsIHdlYmdsZGVtbyk7XHJcbiAgICBjb25zdCBzY2VuZTA2ID0gbmV3IFNjZW5lKCcwNicsIHdlYmdsZGVtbyk7XHJcblxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlcjAxID0gbmV3IERhdGFCdWZmZXJDZmcoJzAxJyk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVmVydGV4KC0xIC8gMiwgLTEgLyAyLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRVVigwLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoMSAvIDIsIC0xIC8gMiwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVVYoMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVmVydGV4KDEgLyAyLCAxIC8gMiwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVmVydGV4KC0xIC8gMiwgMSAvIDIsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZFVWKDAsIDEpO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZEZhY2UoMCwgMSwgMik7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkRmFjZSgwLCAyLCAzKTtcclxuICAgIGRhdGFCdWZmZXIwMS51cGRhdGUoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD53ZWJnbGRlbW8uZ2wpO1xyXG5cclxuICAgIGNvbnN0IGRhdGFCdWZmZXIwMiA9IG5ldyBEYXRhQnVmZmVyQ2ZnKCcwMScpO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZFZlcnRleCgtMSwgLTEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZFVWKDAsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZFZlcnRleCgxLCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KDEsIDEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZFVWKDEsIDEpO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZFZlcnRleCgtMSwgMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlcjAzID0gbmV3IERhdGFCdWZmZXJDZmcoJzAzJyk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVVYoMCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoMSwgLTEgKyAyMCAvIGNhbnZhcy5oZWlnaHQsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFVWKDEsIDEpO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgtMSwgLTEgKyAyMCAvIGNhbnZhcy5oZWlnaHQsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFVWKDAsIDEpO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZEZhY2UoMCwgMSwgMik7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAyLCAzKTtcclxuICAgIGRhdGFCdWZmZXIwMy51cGRhdGUoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD53ZWJnbGRlbW8uZ2wpO1xyXG5cclxuICAgIGNvbnN0IGRhdGFCdWZmZXIwNCA9IG5ldyBEYXRhQnVmZmVyQ2ZnKCcwNCcpO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgLTEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZFVWKDAsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMC44LCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVVYoMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0wLjgsIC0wLjgsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZFVWKDEsIDEpO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgLTAuOCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwNC5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgLy8gY29uc3QgZGF0YUJ1ZmZlcjAyID0gbmV3IERhdGFCdWZmZXJDZmcoJzAyJyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAyLmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICAvLyBjb25zdCBkYXRhQnVmZmVyMDMgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDMnKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgxLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZEZhY2UoMCwgMSwgMik7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAyLCAzKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy51cGRhdGUoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD53ZWJnbGRlbW8uZ2wpO1xyXG5cclxuICAgIC8vIGNvbnN0IGRhdGFCdWZmZXIwNCA9IG5ldyBEYXRhQnVmZmVyQ2ZnKCcwNCcpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgxLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KDEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZFZlcnRleCgtMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwNC5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDAxID0gbmV3IE1lc2goJ21lc2gwMScsIGRhdGFCdWZmZXIwMSwgc2hhZGVyMDEpO1xyXG4gICAgLy8gbWVzaDAxLnRyYW5zbGF0ZVswXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMS50cmFuc2xhdGVbMV0gPSAwLjA7XHJcbiAgICAvLyBtZXNoMDEuc2NhbGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDEuc2NhbGVbMV0gPSAwLjU7XHJcbiAgICAvLyBzY2VuZTAxLmFkZE1lc2gobWVzaDAxKTtcclxuXHJcbiAgICAvLyBjb25zdCBtZXNoMDIgPSBuZXcgTWVzaCgnbWVzaDAyJywgZGF0YUJ1ZmZlcjAyLCBzaGFkZXIwMik7XHJcbiAgICAvLyBtZXNoMDIudHJhbnNsYXRlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDAyLnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMi5zY2FsZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwMi5zY2FsZVsxXSA9IDAuNTtcclxuICAgIC8vIHNjZW5lMDIuYWRkTWVzaChtZXNoMDIpO1xyXG5cclxuICAgIC8vIGNvbnN0IG1lc2gwMyA9IG5ldyBNZXNoKCdtZXNoMDMnLCBkYXRhQnVmZmVyMDMsIHNoYWRlcjAzKTtcclxuICAgIC8vIG1lc2gwMy50cmFuc2xhdGVbMF0gPSAwLjA7XHJcbiAgICAvLyBtZXNoMDMudHJhbnNsYXRlWzFdID0gMC41O1xyXG4gICAgLy8gbWVzaDAzLnNjYWxlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDAzLnNjYWxlWzFdID0gMC41O1xyXG4gICAgLy8gc2NlbmUwMy5hZGRNZXNoKG1lc2gwMyk7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDA0ID0gbmV3IE1lc2goJ21lc2gwNCcsIGRhdGFCdWZmZXIwNCwgc2hhZGVyMDQpO1xyXG4gICAgLy8gbWVzaDA0LnRyYW5zbGF0ZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwNC50cmFuc2xhdGVbMV0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDQuc2NhbGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDQuc2NhbGVbMV0gPSAwLjU7XHJcbiAgICAvLyBzY2VuZTA0LmFkZE1lc2gobWVzaDA0KTtcclxuXHJcbiAgICBjb25zdCBtZXNoaWNvbiA9IG5ldyBNZXNoKCdtZXNoaWNvbicsIGRhdGFCdWZmZXIwMiwgc2hhZGVyMDUpO1xyXG4gICAgbWVzaGljb24udHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgbWVzaGljb24udHJhbnNsYXRlWzFdID0gLTAuMjtcclxuICAgIG1lc2hpY29uLnNjYWxlWzBdID0gMC41O1xyXG4gICAgbWVzaGljb24uc2NhbGVbMV0gPSAwLjU7XHJcbiAgICBtZXNoaWNvbi50ZXh0dXJlID0gd2ViZ2xkZW1vLmNyZWF0ZVRleHR1cmUoJy9yZXNvdXJjZXMvemh1YW5nc2hpLnBuZycpO1xyXG4gICAgc2NlbmUwNS5hZGRNZXNoKG1lc2hpY29uKTtcclxuXHJcbiAgICBjb25zdCBtZXNoMDUgPSBuZXcgTWVzaCgnbWVzaDA1JywgZGF0YUJ1ZmZlcjAyLCBzaGFkZXIwNSk7XHJcbiAgICBtZXNoMDUudHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgbWVzaDA1LnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIG1lc2gwNS5zY2FsZVswXSA9IDAuNTtcclxuICAgIG1lc2gwNS5zY2FsZVsxXSA9IDAuNTtcclxuICAgIG1lc2gwNS50ZXh0dXJlID0gd2ViZ2xkZW1vLmNyZWF0ZVRleHR1cmUoJy9yZXNvdXJjZXMvY2hvaWNlX2xpZ2h0LnBuZycpO1xyXG4gICAgc2NlbmUwNS5hZGRNZXNoKG1lc2gwNSk7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDA2ID0gbmV3IE1lc2goJ21lc2gwNicsIGRhdGFCdWZmZXIwMywgc2hhZGVyMDYpO1xyXG4gICAgLy8gbWVzaDA2LnRyYW5zbGF0ZVswXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwNi50cmFuc2xhdGVbMV0gPSAwLjA7XHJcbiAgICAvLyBtZXNoMDYuc2NhbGVbMF0gPSAxO1xyXG4gICAgLy8gbWVzaDA2LnNjYWxlWzFdID0gMTtcclxuICAgIC8vIG1lc2gwNi51ZmxvYXQgPSAwLjU7XHJcbiAgICAvLyBzY2VuZTA2LmFkZE1lc2gobWVzaDA2KTtcclxuXHJcbiAgICBjb25zdCBtZXNoMDcgPSBuZXcgTWVzaCgnbWVzaDA3JywgZGF0YUJ1ZmZlcjA0LCBzaGFkZXIwNSk7XHJcbiAgICBtZXNoMDcudHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgbWVzaDA3LnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIG1lc2gwNy5zY2FsZVswXSA9IDE7XHJcbiAgICBtZXNoMDcuc2NhbGVbMV0gPSAxO1xyXG4gICAgbWVzaDA3LnRleHR1cmUgPSB3ZWJnbGRlbW8uY3JlYXRlVGV4dHVyZSgnL3Jlc291cmNlcy9jaG9pY2VfbGlnaHQwMi5wbmcnKTtcclxuICAgIHNjZW5lMDUuYWRkTWVzaChtZXNoMDcpO1xyXG5cclxuICAgIHdlYmdsZGVtby5yZW5kZXJMb29wID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgd2ViZ2xkZW1vLmNsZWFyQ29sb3IoKTtcclxuXHJcbiAgICAgICAgc2NlbmUwNS52aWV3cG9ydFswXSA9IDA7XHJcbiAgICAgICAgc2NlbmUwNS52aWV3cG9ydFsxXSA9IDA7XHJcbiAgICAgICAgc2NlbmUwNS52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aDtcclxuICAgICAgICBzY2VuZTA1LnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodDtcclxuICAgICAgICBzY2VuZTA1LnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDEudmlld3BvcnRbMF0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDEudmlld3BvcnRbMV0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDEudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDEudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAxLnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDYudmlld3BvcnRbMF0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDYudmlld3BvcnRbMV0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDYudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGg7XHJcbiAgICAgICAgLy8gc2NlbmUwNi52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQ7XHJcbiAgICAgICAgLy8gbWVzaDA2LnVmbG9hdCA9IE1hdGguYWJzKE1hdGguc2luKERhdGUubm93KCkgLyAxMDAwKSk7XHJcbiAgICAgICAgLy8gc2NlbmUwNi5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzY2VuZTAyLnZpZXdwb3J0WzBdID0gd2ViZ2xkZW1vLndpZHRoIC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAyLnZpZXdwb3J0WzFdID0gMDtcclxuICAgICAgICAvLyBzY2VuZTAyLnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoIC8gMiA7XHJcbiAgICAgICAgLy8gc2NlbmUwMi52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyIDtcclxuICAgICAgICAvLyBzY2VuZTAyLnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDMudmlld3BvcnRbMF0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDMudmlld3BvcnRbMV0gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAzLnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoIC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAzLnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMy5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBzY2VuZTA0LnZpZXdwb3J0WzBdID0gd2ViZ2xkZW1vLndpZHRoIC8gMjtcclxuICAgICAgICAvLyBzY2VuZTA0LnZpZXdwb3J0WzFdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwNC52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwNC52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vIG1lc2gwNC5yb3RhdGVbMl0gICAgPSBEYXRlLm5vdygpIC8gMTAwMCAlIDEwMDA7IC8vICgwLTEpIOihqOekuuaXi+i9rCAxODBcclxuICAgICAgICAvLyBzY2VuZTA0LnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDUudmlld3BvcnRbMF0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDUudmlld3BvcnRbMV0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDUudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGg7XHJcbiAgICAgICAgLy8gc2NlbmUwNS52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQ7XHJcbiAgICAgICAgLy8gc2NlbmUwNS5yZW5kZXIoZmFsc2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgd2ViZ2xkZW1vLmxvb3AoMCk7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVNb3VzZSA9ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4ge1xyXG4gICAgd2ViZ2xkZW1vLnVfbW91c2VbMF0gPSB4O1xyXG4gICAgd2ViZ2xkZW1vLnVfbW91c2VbMV0gPSB5O1xyXG59OyIsImV4cG9ydCBjb25zdCB2c19tdWx0aV9saW5lX2Nyb3NzID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHN1cmZhY2VQb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbiAgICBzdXJmYWNlUG9zaXRpb24gICAgICA9IHBvc2l0aW9uO1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc19tdWx0aV9saW5lX2Nyb3NzID0gYFxyXG4vLyBBdXRob3IgQHBhdHJpY2lvZ3YgLSAyMDE1XHJcbi8vIFRpdGxlOiBUcnVjaGV0IC0gMTAgcHJpbnRcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XHJcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xyXG51bmlmb3JtIHZlYzMgdV90cmFuc2xhdGU7XHJcbnVuaWZvcm0gdmVjMyB1X3NjYWxlO1xyXG51bmlmb3JtIHZlYzMgdV9yb3RhdGU7XHJcblxyXG52ZWMyIGJyaWNrVGlsZSh2ZWMyIF9zdCwgZmxvYXQgX3pvb20pe1xyXG4gICAgX3N0ICo9IF96b29tO1xyXG5cclxuICAgIC8vIEhlcmUgaXMgd2hlcmUgdGhlIG9mZnNldCBpcyBoYXBwZW5pbmdcclxuICAgIC8vIF9zdC54ICs9IHN0ZXAoMS4sIG1vZChfc3QueSwyLjApKSAqIDAuNTtcclxuXHJcbiAgICByZXR1cm4gZnJhY3QoX3N0KTtcclxufVxyXG5cclxuZmxvYXQgYm94KHZlYzIgX3N0LCB2ZWMyIF9zaXplKXtcclxuICAgIF9zaXplID0gdmVjMigwLjUpLV9zaXplKjAuNTtcclxuICAgIHZlYzIgdXYgPSBzbW9vdGhzdGVwKF9zaXplLF9zaXplK3ZlYzIoMWUtNCksX3N0KTtcclxuICAgIHV2ICo9IHNtb290aHN0ZXAoX3NpemUsX3NpemUrdmVjMigxZS00KSx2ZWMyKDEuMCktX3N0KTtcclxuICAgIHJldHVybiB1di54KnV2Lnk7XHJcbn1cclxuZmxvYXQgY2lyY2xlKHZlYzIgeHksIHZlYzIgY2VudGVyLCBmbG9hdCByYWRpdXMsIGZsb2F0IHNtb290aF9lZGdlKSB7XHJcbiAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2UoeHksY2VudGVyKTtcclxuICAgIGRpc3QgPSBzbW9vdGhzdGVwKHJhZGl1cywgcmFkaXVzICsgc21vb3RoX2VkZ2UsIGRpc3QpO1xyXG4gICAgcmV0dXJuIGRpc3Q7XHJcbn1cclxuXHJcbnZvaWQgbWFpbih2b2lkKXtcclxuICAgIGZsb2F0IGNvdW50ID0gMjAuMDtcclxuICAgIHZlYzIgc3QgPSBnbF9GcmFnQ29vcmQueHkvdV9yZXNvbHV0aW9uLnh5O1xyXG4gICAgc3QgLT0gdV90cmFuc2xhdGUueHk7XHJcbiAgICBzdCAqPSAxLjAvdV9zY2FsZS54eTtcclxuXHJcbiAgICBmbG9hdCBzaW5fdCA9IHNpbih1X3RpbWUgKiAzLjE0IC8gMTAuMCk7XHJcbiAgICBmbG9hdCBjb3NfdCA9IGNvcyh1X3RpbWUgKiAzLjE0IC8gMTAuMCk7XHJcbiAgICBmbG9hdCBjb2xfZmxhZz0gbW9kKHN0LnkgKiBjb3VudCwgMi4wKSA8IDEuMCA/IDEuMCA6IC0xLjA7XHJcbiAgICBmbG9hdCByb3dfZmxhZz0gbW9kKHN0LnggKiBjb3VudCwgMi4wKSA8IDEuMCA/IDEuMCA6IC0xLjA7XHJcbiAgICBzdCArPSB2ZWMyKFxyXG4gICAgICAgIGNvbF9mbGFnICogKCBzaW5fdCAqIGNvc190IDwgMC4wID8gY29zX3QgOiAwLjAgKSAqIDAuNSxcclxuICAgICAgICByb3dfZmxhZyAqICggc2luX3QgKiBjb3NfdCA+IDAuMCA/IHNpbl90IDogMC4wICkgKiAwLjUpO1xyXG4gICAgdmVjMyBjb2xvciA9IHZlYzMoMC4wKTtcclxuXHJcbiAgICAvLyBNb2Rlcm4gbWV0cmljIGJyaWNrIG9mIDIxNW1tIHggMTAyLjVtbSB4IDY1bW1cclxuICAgIC8vIGh0dHA6Ly93d3cuamFoYXJyaXNvbi5tZS51ay9Ccmlja3dvcmsvU2l6ZXMuaHRtbFxyXG4gICAgLy8gc3QgLz0gdmVjMigyLjE1LDAuNjUpLzEuNTtcclxuXHJcbiAgICAvLyBBcHBseSB0aGUgYnJpY2sgdGlsaW5nXHJcbiAgICBzdCA9IGJyaWNrVGlsZShzdCxjb3VudCk7XHJcblxyXG4gICAgY29sb3IgPSB2ZWMzKGNpcmNsZShzdCx2ZWMyKDAuNSwwLjUpLDAuNCwgMC4wNSkpO1xyXG5cclxuICAgIC8vIFVuY29tbWVudCB0byBzZWUgdGhlIHNwYWNlIGNvb3JkaW5hdGVzXHJcbiAgICAvLyBjb2xvciA9IHZlYzMoc3QsMC4wKTtcclxuXHJcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLDEuMCk7XHJcbn1cclxuYDsiLCJleHBvcnQgY29uc3QgdnNfbXVsdGlfbGluZV9kaWZmX3NwZWVkID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHN1cmZhY2VQb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbiAgICBzdXJmYWNlUG9zaXRpb24gICAgICA9IHBvc2l0aW9uO1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc19tdWx0aV9saW5lX2RpZmZfc3BlZWQgPSBgXHJcbi8vIEF1dGhvciBAcGF0cmljaW9ndiAtIDIwMTVcclxuLy8gVGl0bGU6IFRydWNoZXQgLSAxMCBwcmludFxyXG5cclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbiNkZWZpbmUgUEkgMy4xNDE1OTI2NTM1ODk3OTMyMzg0NlxyXG5cclxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcclxudW5pZm9ybSB2ZWMyIHVfbW91c2U7XHJcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xyXG51bmlmb3JtIHZlYzMgdV90cmFuc2xhdGU7XHJcbnVuaWZvcm0gdmVjMyB1X3NjYWxlO1xyXG51bmlmb3JtIHZlYzMgdV9yb3RhdGU7XHJcblxyXG5mbG9hdCByYW5kb20gKGluIHZlYzIgX3N0KSB7XHJcbiAgICByZXR1cm4gZnJhY3Qoc2luKGRvdChfc3QueHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB2ZWMyKDEyLjk4OTgsNzguMjMzKSkpKlxyXG4gICAgICAgIDQzNzU4LjU0NTMxMjMpO1xyXG59XHJcblxyXG52ZWMyIHRydWNoZXRQYXR0ZXJuKGluIHZlYzIgX3N0LCBpbiBmbG9hdCBfaW5kZXgpe1xyXG4gICAgX2luZGV4ID0gZnJhY3QoKChfaW5kZXgtMC41KSoyLjApKTtcclxuICAgIGlmIChfaW5kZXggPiAwLjc1KSB7XHJcbiAgICAgICAgX3N0ID0gdmVjMigxLjApIC0gX3N0O1xyXG4gICAgfSBlbHNlIGlmIChfaW5kZXggPiAwLjUpIHtcclxuICAgICAgICBfc3QgPSB2ZWMyKDEuMC1fc3QueCxfc3QueSk7XHJcbiAgICB9IGVsc2UgaWYgKF9pbmRleCA+IDAuMjUpIHtcclxuICAgICAgICBfc3QgPSAxLjAtdmVjMigxLjAtX3N0LngsX3N0LnkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9zdDtcclxufVxyXG5mbG9hdCBjaXJjbGUodmVjMiB4eSwgdmVjMiBjZW50ZXIsIGZsb2F0IHJhZGl1cywgZmxvYXQgc21vb3RoX2VkZ2UpIHtcclxuICAgIGZsb2F0IGRpc3QgPSBkaXN0YW5jZSh4eSxjZW50ZXIpO1xyXG4gICAgZGlzdCA9IHNtb290aHN0ZXAocmFkaXVzLCByYWRpdXMgKyBzbW9vdGhfZWRnZSwgZGlzdCk7XHJcbiAgICByZXR1cm4gZGlzdDtcclxufVxyXG5cclxudm9pZCBtYWluKCkge1xyXG4gICAgZmxvYXQgY291bnQgPSAyMC4wO1xyXG4gICAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7XHJcbiAgICBzdCAtPSB1X3RyYW5zbGF0ZS54eTtcclxuICAgIHN0ICo9IDEuMC91X3NjYWxlLnh5O1xyXG4gICAgc3QgKj0gY291bnQ7XHJcblx0c3QueCAtPSB1X3RpbWUgKiAyLjAgKiAgcmFuZG9tKHZlYzIoZmxvb3Ioc3QpLnksMS4wKSk7XHJcblxyXG4gICAgdmVjMiBpcG9zID0gZmxvb3Ioc3QpOyAgLy8gaW50ZWdlclxyXG4gICAgdmVjMiBmcG9zID0gZnJhY3Qoc3QpOyAgLy8gZnJhY3Rpb25cclxuXHJcbiAgICBmbG9hdCBzcGVlZCA9IHJhbmRvbSh2ZWMyKGlwb3MueSkpO1xyXG5cclxuICAgIGZsb2F0IHhfZiA9IHJhbmRvbSh2ZWMyKGlwb3MueCwgMCkpO1xyXG4gICAgZmxvYXQgeV9mID0gcmFuZG9tKHZlYzIoMCwgaXBvcy55KSk7XHJcblxyXG4gICAgZmxvYXQgY29sb3IgPSAwLjA7XHJcbiAgICBjb2xvciA9IHJhbmRvbSh2ZWMyKHhfZiwgeV9mKSk7XHJcblx0Y29sb3IgPVxyXG4gICAgXHQxLjAgLSAoMS4wIC0gY2lyY2xlKGZyYWN0KHN0KSwgdmVjMigwLjUpLCAwLjI1LCAwLjEpKSAqIGNvbG9yXHJcbiAgICBcdDtcclxuICAgIHZlYzQgZl9jb2xvciA9IHZlYzQodmVjMyhjb2xvciksMS4wKTtcclxuICAgIGZfY29sb3IuciA9IGNvbG9yIDwgMS4wID8gMC4wIDogMS4wO1xyXG4gICAgZl9jb2xvci5nID0gY29sb3IgPCAxLjAgPyAwLjAgOiAxLjA7XHJcbiAgICBmX2NvbG9yLmIgPSBjb2xvciA8IDEuMCA/IGNvbG9yIDogMS4wO1xyXG4gICAgZl9jb2xvci5hID0gY29sb3IgPCAxLjAgPyBjb2xvciA6IDAuMDtcclxuXHJcbiAgICBnbF9GcmFnQ29sb3IgPSBmX2NvbG9yO1xyXG59XHJcbmA7IiwiZXhwb3J0IGNvbnN0IHZzX3BvbHlnb24gPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgc3VyZmFjZVBvc2l0aW9uO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxuICAgIHN1cmZhY2VQb3NpdGlvbiAgICAgID0gcG9zaXRpb247XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX3BvbHlnb24gPSBgXHJcbi8vIEF1dGhvciBAcGF0cmljaW9ndiAtIDIwMTVcclxuLy8gVGl0bGU6IFRydWNoZXQgLSAxMCBwcmludFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxuI2RlZmluZSBQSSAzLjE0MTU5MjY1MzU4OTc5MzIzODQ2XHJcbiNkZWZpbmUgVFdPX1BJIDYuMjQ0ODUzMDcxNzk1ODY0NzY5MlxyXG5cclxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcclxudW5pZm9ybSB2ZWMyIHVfbW91c2U7XHJcbnVuaWZvcm0gZmxvYXQgdV90aW1lO1xyXG51bmlmb3JtIHZlYzMgdV90cmFuc2xhdGU7XHJcbnVuaWZvcm0gdmVjMyB1X3NjYWxlO1xyXG51bmlmb3JtIHZlYzMgdV9yb3RhdGU7XHJcblxyXG5tYXQyIHJvdGF0ZTJkKGZsb2F0IF9hbmdsZSl7XHJcbiAgICByZXR1cm4gbWF0Mihjb3MoX2FuZ2xlKSwtc2luKF9hbmdsZSksXHJcbiAgICAgICAgICAgICAgICBzaW4oX2FuZ2xlKSxjb3MoX2FuZ2xlKSk7XHJcbn1cclxuXHJcbmZsb2F0IHNoYXBlKHZlYzIgc3QsIGZsb2F0IE4pe1xyXG4gICAgc3QgPSBzdCoyLi0xLjtcclxuICAgIGZsb2F0IGEgPSBhdGFuKHN0Lngsc3QueSkrUEk7XHJcbiAgICBmbG9hdCByID0gVFdPX1BJL047XHJcbiAgICByZXR1cm4gYWJzKGNvcyhmbG9vciguNSthL3IpKnItYSkqbGVuZ3RoKHN0KSk7XHJcbn1cclxuXHJcbnZvaWQgbWFpbigpe1xyXG4gICAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7XHJcbiAgICBzdCAtPSB1X3RyYW5zbGF0ZS54eTtcclxuICAgIHN0ICo9IDEuMC91X3NjYWxlLnh5O1xyXG5cclxuICAgIC8vIG1vdmUgc3BhY2UgZnJvbSB0aGUgY2VudGVyIHRvIHRoZSB2ZWMyKDAuMClcclxuICAgIHN0IC09IHZlYzIoMC41KTtcclxuICAgIC8vIHJvdGF0ZSB0aGUgc3BhY2VcclxuICAgIHN0ID0gcm90YXRlMmQoIHVfcm90YXRlLnogKSAqIHN0O1xyXG4gICAgLy8gbW92ZSBpdCBiYWNrIHRvIHRoZSBvcmlnaW5hbCBwbGFjZVxyXG4gICAgc3QgKz0gdmVjMigwLjUpO1xyXG5cclxuICAgIHZlYzMgY29sb3IgPSB2ZWMzKDAuMCk7XHJcblxyXG4gICAgY29sb3IgPSB2ZWMzKCBzbW9vdGhzdGVwKC41LCAuNSArIC4wMDUsIHNoYXBlKHN0LDYuMCkpICk7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcclxufVxyXG5gOyIsImV4cG9ydCBjb25zdCB2c19wcm9ncmVzcyA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc19wcm9ncmVzcyA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbnVuaWZvcm0gIGZsb2F0IHVfZmxvYXQ7XHJcbnVuaWZvcm0gIHZlYzIgdV9yZXNvbHV0aW9uO1xyXG5cclxudm9pZCBtYWluKHZvaWQpe1xyXG4gICAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eSAvIHVfcmVzb2x1dGlvbi54eTtcclxuICAgIHZlYzMgY29sb3IgPSBzdC54IDwgdV9mbG9hdCA/IHZlYzMoMC4wLCAwLjgsIDAuMCkgOiB2ZWMzKDAuMiwgMC4yLCAwLjIpO1xyXG4gICAgLy8gMjAg5a+55bqUanPlsYLov5vluqbmnaHpq5jluqZcclxuICAgIGNvbG9yID0gc3QueSA+ICgyMC4wIC8gdV9yZXNvbHV0aW9uLnkgLyAyLjApID8gdmVjMygwLjApIDogY29sb3I7XHJcblxyXG4gICAgZmxvYXQgYWxwaGEgPSBzdC55ID4gKDIwLjAgLyB1X3Jlc29sdXRpb24ueSAvIDIuMCkgPyAwLjAgOiAwLjg7XHJcbiAgICBhbHBoYSA9IHN0LnggPCB1X2Zsb2F0ID8gYWxwaGEgOiAwLjg7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggY29sb3IsIGFscGhhICk7XHJcbn1cclxuYDsiLCJleHBvcnQgY29uc3QgdnNfc2luX2NvcyA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxudmFyeWluZyAgICAgdmVjMiAgICBzdXJmYWNlUG9zaXRpb247XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG4gICAgc3VyZmFjZVBvc2l0aW9uICAgICAgPSBwb3NpdGlvbjtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfc2luX2NvcyA9IGBcclxuLy8gQXV0aG9yIEBwYXRyaWNpb2d2IC0gMjAxNVxyXG4vLyBUaXRsZTogVHJ1Y2hldCAtIDEwIHByaW50XHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xyXG51bmlmb3JtIHZlYzIgdV9tb3VzZTtcclxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XHJcbnVuaWZvcm0gdmVjMyB1X3RyYW5zbGF0ZTtcclxudW5pZm9ybSB2ZWMzIHVfc2NhbGU7XHJcbnVuaWZvcm0gdmVjMyB1X3JvdGF0ZTtcclxuXHJcbnZvaWQgbWFpbigpe1xyXG4gICAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7XHJcbiAgICBzdCAtPSB1X3RyYW5zbGF0ZS54eTtcclxuICAgIHN0ICo9IDEuMC91X3NjYWxlLnh5O1xyXG4gICAgdmVjMyBjb2xvciA9IHZlYzMoMC4wKTtcclxuXHJcbiAgICB2ZWMyIHBvcyA9IHZlYzIoMC41KS1zdDtcclxuXHJcbiAgICBmbG9hdCByID0gZGlzdGFuY2UocG9zLCB2ZWMyKDAuMCwwLjApKSoyLjA7XHJcbiAgICBmbG9hdCBhID0gYXRhbihwb3MueSxwb3MueCk7XHJcbiAgICBmbG9hdCB4eHggPSBmbG9vcih1X3RpbWUgLyAxMC4wKSAqIDEwLjAgLSB1X3RpbWUgO1xyXG4gICAgZmxvYXQgeXl5ID0gZmxvb3IodV90aW1lIC8gMjAuMCkgKiAyMC4wIC0gdV90aW1lIDtcclxuICAgIGZsb2F0IGYgPSBjb3MoYSowLjUpO1xyXG4gICAgLy8gZiA9IGFicyhjb3MoYSozLikpO1xyXG4gICAgLy8gZiA9IGFicyhjb3MoYSoyLjUpKSouNSsuMztcclxuICAgIC8vIGYgPSBhYnMoY29zKGEqMTIuKSpzaW4oYSozLikpKi44Ky4xO1xyXG4gICAgLy8gZiA9IHNtb290aHN0ZXAoLS41LDEuLCBjb3MoYSoxMC4pKSowLjIrMC41O1xyXG4gICAgZiA9IGFicyggY29zKGEqeHh4KSAqIHNpbihhKnl5eSkgKSAqLjkgKyAuMjtcclxuXHJcbiAgICBjb2xvciA9IHZlYzMoIDEuLXNtb290aHN0ZXAoZixmKzAuMDA1LHIpICk7XHJcblxyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcclxufVxyXG5gOyIsImV4cG9ydCBjb25zdCB2c190ZXh0dXJlID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHN1cmZhY2VQb3NpdGlvbjtcclxuYXR0cmlidXRlICAgdmVjMiAgICBhX3V2O1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHZVVjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbiAgICBzdXJmYWNlUG9zaXRpb24gICAgICA9IHBvc2l0aW9uO1xyXG4gICAgdlVWID0gYV91djtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfdGV4dHVyZSA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbnZhcnlpbmcgIHZlYzIgdlVWO1xyXG51bmlmb3JtICBzYW1wbGVyMkQgdV9zYW1wbGVyO1xyXG5cclxudm9pZCBtYWluKHZvaWQpe1xyXG4gICAgLy8gWyAwLCAwLCAwLCAxIF0gIHJnYmHpopzoibLlkJHph49cclxuICAgIC8vIGdsX0ZyYWdDb2xvciA9IHZlYzQoIHZDb2xvciwgMS4gKTtcclxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCggdV9zYW1wbGVyLCB2VVYgKTtcclxufVxyXG5gOyIsIi8qKlxyXG4gKiBXRUJHTCDln7rmnKzlpITnkIZcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYkdMSW5zdGFuY2VPcHQge1xyXG4gICAgY2FudmFzOiBPZmZzY3JlZW5DYW52YXM7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJDZmcge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdnM6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBmczogc3RyaW5nO1xyXG4gICAgcHVibGljIHZzaGFkZXI6IFdlYkdMU2hhZGVyIHwgdW5kZWZpbmVkICAgIDtcclxuICAgIHB1YmxpYyBmc2hhZGVyOiBXZWJHTFNoYWRlciB8IHVuZGVmaW5lZCAgICA7XHJcbiAgICBwdWJsaWMgcHJvZ3JhbWU6IFdlYkdMUHJvZ3JhbSB8IHVuZGVmaW5lZCAgO1xyXG4gICAgcHVibGljIHVfdGltZV9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgICAgICA7XHJcbiAgICBwdWJsaWMgdV9tb3VzZV9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgICAgIDtcclxuICAgIHB1YmxpYyB1X3Jlc29sdXRpb25fbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgO1xyXG4gICAgcHVibGljIHVfdHJhbnNsYXRlX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICA7XHJcbiAgICBwdWJsaWMgdV9zY2FsZV9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgO1xyXG4gICAgcHVibGljIHVfcm90YXRlX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICA7XHJcbiAgICBwdWJsaWMgdV9mbG9hdF9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICAgO1xyXG4gICAgcHVibGljIGFfcG9zaXRpb25fbG9jOiBudW1iZXIgfCB1bmRlZmluZWQgICAgICAgICAgICAgICAgICA7XHJcbiAgICBwdWJsaWMgYV91djogbnVtYmVyIHwgdW5kZWZpbmVkICAgICAgICAgICAgICAgICAgO1xyXG4gICAgcHVibGljIHVfdGV4dHVyZTogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgIDtcclxuICAgIHByaXZhdGUgc2hhZGVyX3Byb2dyYW06IFdlYkdMUHJvZ3JhbSB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0cnVjdG9yKHNuYW1lOiBzdHJpbmcsIHZzOiBzdHJpbmcsIGZzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNuYW1lID0gc25hbWU7XHJcbiAgICAgICAgdGhpcy5mcyA9IGZzO1xyXG4gICAgICAgIHRoaXMudnMgPSB2cztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQcm9ncmFtZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNoYWRlcl9mcmFnbWVudCAgID0gPFdlYkdMU2hhZGVyPnRoaXMuZ2V0RlNTaGFkZXIoZ2wpO1xyXG4gICAgICAgIGNvbnN0IHNoYWRlcl92ZXJ0ZXggICAgID0gPFdlYkdMU2hhZGVyPnRoaXMuZ2V0VlNTaGFkZXIoZ2wpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaGFkZXJfcHJvZ3JhbSA9PT0gdW5kZWZpbmVkICYmIGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXJfZnJhZ21lbnQsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVyX3Byb2dyYW0gID0gPFdlYkdMUHJvZ3JhbT5nbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoYWRlcl9wcm9ncmFtID0gc2hhZGVyX3Byb2dyYW07XHJcblxyXG4gICAgICAgICAgICBnbC5hdHRhY2hTaGFkZXIoPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBzaGFkZXJfdmVydGV4KTtcclxuICAgICAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgc2hhZGVyX2ZyYWdtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGdsLmxpbmtQcm9ncmFtKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVfbW91c2VfbG9jICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9tb3VzZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfdGltZV9sb2MgICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV90aW1lYCk7XHJcblxyXG4gICAgICAgIHRoaXMudV9yZXNvbHV0aW9uX2xvYyAgID0gPFdlYkdMVW5pZm9ybUxvY2F0aW9uPmdsLmdldFVuaWZvcm1Mb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIGB1X3Jlc29sdXRpb25gKTtcclxuXHJcbiAgICAgICAgdGhpcy51X3RyYW5zbGF0ZV9sb2MgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfdHJhbnNsYXRlYCk7XHJcblxyXG4gICAgICAgIHRoaXMudV9zY2FsZV9sb2MgICAgICAgID0gPFdlYkdMVW5pZm9ybUxvY2F0aW9uPmdsLmdldFVuaWZvcm1Mb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIGB1X3NjYWxlYCk7XHJcblxyXG4gICAgICAgIHRoaXMudV9yb3RhdGVfbG9jICAgICAgID0gPFdlYkdMVW5pZm9ybUxvY2F0aW9uPmdsLmdldFVuaWZvcm1Mb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIGB1X3JvdGF0ZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfZmxvYXRfbG9jICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9mbG9hdGApO1xyXG5cclxuICAgICAgICB0aGlzLmFfcG9zaXRpb25fbG9jICAgICA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgJ3Bvc2l0aW9uJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYV91diAgICAgICAgICAgICAgID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCAnYV91dicpO1xyXG5cclxuICAgICAgICB0aGlzLnVfdGV4dHVyZSAgICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCAndV9zYW1wbGVyJyk7XHJcblxyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuYV9wb3NpdGlvbl9sb2MpO1xyXG5cclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLmFfdXYpO1xyXG5cclxuICAgICAgICBnbC51bmlmb3JtMWkodGhpcy51X3RleHR1cmUsIDApO1xyXG5cclxuICAgICAgICBnbC51c2VQcm9ncmFtKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VlNTaGFkZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICAgIGlmIChnbCA9PT0gbnVsbCkgeyByZXR1cm4gdGhpcy52c2hhZGVyOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZzaGFkZXIpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICB0aGlzLnZzaGFkZXIgID0gPFdlYkdMU2hhZGVyPmdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudnNoYWRlciA9PT0gbnVsbCkgeyByZXR1cm4gdGhpcy52c2hhZGVyOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZzID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy52c2hhZGVyLCB0aGlzLnZzKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMudnNoYWRlcik7XHJcblxyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMudnNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVSUk9SIElOICdWRVJURVhfU0hBREVSJyBTSEFERVI6ICR7IGdsLmdldFNoYWRlckluZm9Mb2codGhpcy52c2hhZGVyKSB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZzaGFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy52c2hhZGVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEZTU2hhZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoZ2wgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMuZnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5mc2hhZGVyKSB7IHJldHVybiB0aGlzLmZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgdGhpcy5mc2hhZGVyICA9IDxXZWJHTFNoYWRlcj5nbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZnNoYWRlciA9PT0gbnVsbCkgeyByZXR1cm4gdGhpcy5mc2hhZGVyOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZzID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRoaXMuZnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy5mc2hhZGVyLCB0aGlzLmZzKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuZnNoYWRlcik7XHJcblxyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVSUk9SIElOICdGUkFHTUVOVF9TSEFERVInIFNIQURFUjogJHsgZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLmZzaGFkZXIpIH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnNoYWRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZzaGFkZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhQnVmZmVyQ2ZnIHtcclxuICAgIHB1YmxpYyByZWFkb25seSB2bmFtZTogICAgICAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIHZlcnRleF9sb2M6ICAgICAgICAgICAgICBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmVydGV4X2RhdGE6ICAgIG51bWJlcltdICAgID0gW107XHJcbiAgICBwdWJsaWMgdmVydGV4X2J1ZmZlcjogICAgICAgICAgIFdlYkdMQnVmZmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGZhY2VfbG9jOiAgICAgICAgICAgICAgICBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZmFjZV9kYXRhOiAgICAgIG51bWJlcltdICAgID0gW107XHJcbiAgICBwdWJsaWMgZmFjZV9idWZmZXI6ICAgICAgICAgICAgIFdlYkdMQnVmZmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHV2X2RhdGE6ICAgICAgICBudW1iZXJbXSAgICA9IFtdO1xyXG4gICAgcHVibGljIHV2X2J1ZmZlcjogICAgICAgICAgICAgICBXZWJHTEJ1ZmZlciB8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0cnVjdG9yKHZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnZuYW1lID0gdm5hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVmVydGV4KHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZlcnRleF9kYXRhLnB1c2goeCwgeSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkRmFjZShhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5mYWNlX2RhdGEucHVzaChhLCBiLCBjKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRVVih1OiBudW1iZXIsIHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudXZfZGF0YS5wdXNoKHUsIHYpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVWZXJ0ZXgoZ2wpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVVYoZ2wpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlRmFjZShnbCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWN0aXZlVmVydGV4KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmVydGV4X2J1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRleF9idWZmZXIgID0gPFdlYkdMQnVmZmVyPmdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydGV4X2J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRleF9kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZUZhY2UoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5mYWNlX2J1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2VfYnVmZmVyICA9IDxXZWJHTEJ1ZmZlcj5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuZmFjZV9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFVpbnQxNkFycmF5KHRoaXMuZmFjZV9kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZVVWKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMudXZfYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXZfYnVmZmVyICA9IDxXZWJHTEJ1ZmZlcj5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnV2X2J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheSh0aGlzLnV2X2RhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuU1RBVElDX0RSQVdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNoIHtcclxuICAgIHB1YmxpYyB0ZXh0dXJlOiBUZXh0dXJlSW5zdGFuY2UgfCBudWxsO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRhdGFCdWZmZXJDZmc6IERhdGFCdWZmZXJDZmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2hhZGVyQ2ZnOiBTaGFkZXJDZmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSB0cmFuc2xhdGU6IG51bWJlcltdID0gWzAsIDAsIDBdO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNjYWxlOiBudW1iZXJbXSAgICAgPSBbMSwgMSwgMV07XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcm90YXRlOiBudW1iZXJbXSAgICA9IFswLCAwLCAwXTtcclxuICAgIHB1YmxpYyB1ZmxvYXQ6IG51bWJlciAgICAgID0gMC4wO1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgZ2VvOiBEYXRhQnVmZmVyQ2ZnLCBtYXRlcmlhbDogU2hhZGVyQ2ZnKSB7XHJcbiAgICAgICAgdGhpcy5pZCAgICAgICAgICAgICA9IGlkO1xyXG4gICAgICAgIHRoaXMuZGF0YUJ1ZmZlckNmZyAgPSBnZW87XHJcbiAgICAgICAgdGhpcy5zaGFkZXJDZmcgICAgICA9IG1hdGVyaWFsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSAgICAgICAgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlcihzY2VuZTogU2NlbmUpIHtcclxuXHJcbiAgICAgICAgY29uc3QgZ2wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0PnNjZW5lLmVuZ2luZS5nbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hhZGVyID0gPFNoYWRlckNmZz50aGlzLnNoYWRlckNmZztcclxuXHJcbiAgICAgICAgc2hhZGVyLmdldFByb2dyYW1lKGdsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmUuYWN0aXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfbW91c2VfbG9jICAgICYmIGdsLnVuaWZvcm0yZnYoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X21vdXNlX2xvYywgICAgc2NlbmUuZW5naW5lLnVfbW91c2UpO1xyXG4gICAgICAgIDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV90aW1lX2xvYyAgICAgJiYgZ2wudW5pZm9ybTFmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV90aW1lX2xvYywgICAgICBzY2VuZS5lbmdpbmUudGltZXN0YW1wICogMC4wMDEpO1xyXG4gICAgICAgIDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9mbG9hdF9sb2MgICAgJiYgZ2wudW5pZm9ybTFmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9mbG9hdF9sb2MsICAgICAgdGhpcy51ZmxvYXQpO1xyXG5cclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfcmVzb2x1dGlvbl9sb2MgICAmJiBnbC51bmlmb3JtMmYoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3Jlc29sdXRpb25fbG9jLCBzY2VuZS5lbmdpbmUud2lkdGgsICBzY2VuZS5lbmdpbmUuaGVpZ2h0KTtcclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfdHJhbnNsYXRlX2xvYyAgICAmJiBnbC51bmlmb3JtM2YoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3RyYW5zbGF0ZV9sb2MsICB0aGlzLnRyYW5zbGF0ZVswXSwgIHRoaXMudHJhbnNsYXRlWzFdLCAgdGhpcy50cmFuc2xhdGVbMl0pO1xyXG4gICAgICAgIDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9zY2FsZV9sb2MgICAgICAgICYmIGdsLnVuaWZvcm0zZig8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfc2NhbGVfbG9jLCAgICAgIHRoaXMuc2NhbGVbMF0sICAgICAgdGhpcy5zY2FsZVsxXSwgICAgICB0aGlzLnNjYWxlWzJdKTtcclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfcm90YXRlX2xvYyAgICAgICAmJiBnbC51bmlmb3JtM2YoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3JvdGF0ZV9sb2MsICAgICB0aGlzLnJvdGF0ZVswXSwgICAgIHRoaXMucm90YXRlWzFdLCAgICAgdGhpcy5yb3RhdGVbMl0pO1xyXG5cclxuICAgICAgICBpZiAoPG51bWJlcj5zaGFkZXIuYV9wb3NpdGlvbl9sb2MgPj0gMCkge1xyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgPFdlYkdMQnVmZmVyPnRoaXMuZGF0YUJ1ZmZlckNmZy52ZXJ0ZXhfYnVmZmVyKTtcclxuICAgICAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcig8bnVtYmVyPnNoYWRlci5hX3Bvc2l0aW9uX2xvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCAqIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoPG51bWJlcj5zaGFkZXIuYV91diA+PSAwKSB7XHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCA8V2ViR0xCdWZmZXI+dGhpcy5kYXRhQnVmZmVyQ2ZnLnV2X2J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoPG51bWJlcj5zaGFkZXIuYV91dixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCAqIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoPFdlYkdMQnVmZmVyPnRoaXMuZGF0YUJ1ZmZlckNmZy5mYWNlX2J1ZmZlcikge1xyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCA8V2ViR0xCdWZmZXI+dGhpcy5kYXRhQnVmZmVyQ2ZnLmZhY2VfYnVmZmVyKTtcclxuICAgICAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlVOU0lHTkVEX1NIT1JULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbC5mbHVzaCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2NlbmUge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNuYW1lOiAgc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGVuZ2luZTogV2ViR0xJbnN0YW5jZTtcclxuICAgIHB1YmxpYyByZWFkb25seSB2aWV3cG9ydDogICBudW1iZXJbXSA9IFswLCAwLCAwLCAwXTtcclxuICAgIHB1YmxpYyByZWFkb25seSBtZXNoTWFwOiAgICBNYXA8c3RyaW5nLCBNZXNoPiA9IG5ldyBNYXAoKTtcclxuICAgIGNvbnN0cnVjdG9yKHNuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuc25hbWUgID0gc25hbWU7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBlbmdpbmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkTWVzaChtZXNoOiBNZXNoKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoTWFwLnNldChtZXNoLmlkLCBtZXNoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoaXNDbGVhcjogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmVuZ2luZS5nbDtcclxuXHJcbiAgICAgICAgZ2wudmlld3BvcnQodGhpcy52aWV3cG9ydFswXSwgdGhpcy52aWV3cG9ydFsxXSwgdGhpcy52aWV3cG9ydFsyXSwgdGhpcy52aWV3cG9ydFszXSk7XHJcbiAgICAgICAgaWYgKGlzQ2xlYXIpIHtcclxuICAgICAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xyXG4gICAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkUpO1xyXG4gICAgICAgIHRoaXMubWVzaE1hcC5mb3JFYWNoKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lc2gucmVuZGVyKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dHVyZUluc3RhbmNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZENhbGwgPSAocGF0aDogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UsIGNiOiAoaW1nOiBJbWFnZURhdGEsIGZuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAvLyBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgY2IoaW1nLCBwYXRoLCBlbmdpbmUpO1xyXG4gICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAvLyBpbWcuc3JjID0gcGF0aDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkZWQgPSAoaW1nOiBJbWFnZURhdGEsIGZuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRleElucyA9IDxUZXh0dXJlSW5zdGFuY2U+ZW5naW5lLmdldFRleHR1cmUoZm5hbWUpO1xyXG4gICAgICAgIGlmICh0ZXhJbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgR0wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0PmVuZ2luZS5nbDtcclxuICAgICAgICAgICAgY29uc3QgdGV4ICAgPSA8V2ViR0xUZXh0dXJlPkdMLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICAgICAgR0wucGl4ZWxTdG9yZWkoR0wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdMLmJpbmRUZXh0dXJlKEdMLlRFWFRVUkVfMkQsIHRleCk7XHJcbiAgICAgICAgICAgIEdMLnRleEltYWdlMkQoR0wuVEVYVFVSRV8yRCwgMCwgR0wuUkdCQSwgR0wuUkdCQSwgR0wuVU5TSUdORURfQllURSwgaW1nKTtcclxuICAgICAgICAgICAgR0wudGV4UGFyYW1ldGVyaShHTC5URVhUVVJFXzJELCBHTC5URVhUVVJFX01BR19GSUxURVIsIEdMLkxJTkVBUik7XHJcbiAgICAgICAgICAgIEdMLnRleFBhcmFtZXRlcmkoR0wuVEVYVFVSRV8yRCwgR0wuVEVYVFVSRV9NSU5fRklMVEVSLCBHTC5ORUFSRVNUX01JUE1BUF9MSU5FQVIpO1xyXG4gICAgICAgICAgICBHTC5nZW5lcmF0ZU1pcG1hcChHTC5URVhUVVJFXzJEKTtcclxuICAgICAgICAgICAgR0wuYmluZFRleHR1cmUoR0wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHRleElucy5fdGV4ID0gdGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZm5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3RleDogV2ViR0xUZXh0dXJlIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2VuZ2luZTogV2ViR0xJbnN0YW5jZTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5mbmFtZSAgICAgID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9lbmdpbmUgICAgPSBlbmdpbmU7XHJcbiAgICAgICAgdGhpcy5fdGV4ICAgICAgID0gbnVsbDtcclxuXHJcbiAgICAgICAgZW5naW5lLmFkZFRleHR1cmUodGhpcyk7XHJcbiAgICAgICAgVGV4dHVyZUluc3RhbmNlLmxvYWRDYWxsKG5hbWUsIGVuZ2luZSwgVGV4dHVyZUluc3RhbmNlLmxvYWRlZCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWN0aXZlKCkge1xyXG4gICAgICAgIGNvbnN0IEdMICAgID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLl9lbmdpbmUuZ2w7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90ZXgpIHtcclxuICAgICAgICAgICAgR0wuYWN0aXZlVGV4dHVyZShHTC5URVhUVVJFMCk7XHJcbiAgICAgICAgICAgIEdMLmJpbmRUZXh0dXJlKEdMLlRFWFRVUkVfMkQsIHRoaXMuX3RleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLl9lbmdpbmUuZGVsVGV4dHVyZSh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdlYkdMSW5zdGFuY2Uge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuaWZvcm1zXzFmOiBzdHJpbmdbXSAgICA9IFsndV90aW1lJ107XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuaWZvcm1zXzJmdjogc3RyaW5nW10gICA9IFsndV9tb3VzZSddO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmlmb3Jtc18yZjogc3RyaW5nW10gICAgPSBbJ3VfcmVzb2x1dGlvbiddO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb250ZW50TW9kZXMgPSBbXCJ3ZWJnbDJcIiwgXCJ3ZWJnbFwiLCBcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCBcIndlYmtpdC0zZFwiLCBcIm1vei13ZWJnbFwiXTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1X21vdXNlOiBudW1iZXJbXSAgICAgICAgPSBbMCwgMF07XHJcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBzY2VuZU1hcDogTWFwPHN0cmluZywgU2NlbmU+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSB0ZXh0dXJlTWFwOiBNYXA8c3RyaW5nLCBUZXh0dXJlSW5zdGFuY2U+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBfaXNEZXN0cm95OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ2V0IGlzRGVzdHJveSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNEZXN0cm95O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBXZWJHTEluc3RhbmNlT3B0KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBvcHQuY2FudmFzO1xyXG4gICAgICAgIHRoaXMud2lkdGggID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5nbCAgICAgPSBXZWJHTEluc3RhbmNlLmN0eEluaXRGdW5jKHRoaXMuY2FudmFzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGN0eEluaXRGdW5jKGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzKTogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsID0gbnVsbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgV2ViR0xJbnN0YW5jZS5jb250ZW50TW9kZXMubGVuZ3RoOyArK2lpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5jYW52YXMuZ2V0Q29udGV4dCg8T2Zmc2NyZWVuUmVuZGVyaW5nQ29udGV4dElkPldlYkdMSW5zdGFuY2UuY29udGVudE1vZGVzW2lpXSwge2FscGhhIDogdHJ1ZSwgYW50aWFsaWFzIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGVyZSBpcyBub3Qgd2ViZ2wgY29tcGF0aWJsZSA6KCBgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBnbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVUZXh0dXJlKGZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGV4OiBUZXh0dXJlSW5zdGFuY2UgPSA8VGV4dHVyZUluc3RhbmNlPnRoaXMudGV4dHVyZU1hcC5nZXQoZm5hbWUpO1xyXG5cclxuICAgICAgICBpZiAodGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGV4ID0gbmV3IFRleHR1cmVJbnN0YW5jZShmbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGV4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFRleHR1cmUodGV4OiBUZXh0dXJlSW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLnRleHR1cmVNYXAuc2V0KHRleC5mbmFtZSwgdGV4KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0dXJlKGZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlTWFwLmdldChmbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsVGV4dHVyZSh0ZXg6IFRleHR1cmVJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMudGV4dHVyZU1hcC5kZWxldGUodGV4LmZuYW1lKTtcclxuICAgICAgICAoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmdsKS5kZWxldGVUZXh0dXJlKHRleCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU2NlbmUoY2ZnOiBTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYXAuc2V0KGNmZy5zbmFtZSwgY2ZnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhckNvbG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5nbCk7XHJcbiAgICAgICAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb29wID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyTG9vcCh0aW1lc3RhbXApO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMubG9vcCwgNTApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlckxvb3AodGltZXN0YW1wOiBudW1iZXIpIHt9XHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9pc0Rlc3Ryb3kgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZU1hcC5mb3JFYWNoKCh0ZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWxUZXh0dXJlKHRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
