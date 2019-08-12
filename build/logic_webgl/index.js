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
    const mesh06 = new webgl_1.Mesh('mesh06', dataBuffer03, shader06);
    mesh06.translate[0] = 0.0;
    mesh06.translate[1] = 0.0;
    mesh06.scale[0] = 1;
    mesh06.scale[1] = 1;
    mesh06.ufloat = 0.5;
    scene06.addMesh(mesh06);
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
        this.texActive = false;
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
        gl.useProgram(this.shader_program);
        if (this.texActive) {
            this.u_texture && gl.uniform1i(this.u_texture, 0);
        }
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
        if (this.texture) {
            this.shaderCfg.texActive = this.texture.active();
            if (!this.shaderCfg.texActive) {
                return;
            }
        }
        shader.getPrograme(gl);
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
        let result = false;
        const GL = this._engine.gl;
        if (this._tex) {
            GL.activeTexture(GL.TEXTURE0);
            GL.bindTexture(GL.TEXTURE_2D, this._tex);
            result = true;
        }
        return result;
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
            setTimeout(this.loop, 20);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbG9naWNfd2ViZ2wvaW5kZXgudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfY3Jvc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX211bHRpX2xpbmVfZGlmZl9zcGVlZC50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcG9seWdvbi50cyIsInNyYy9sb2dpY193ZWJnbC9zaGFkZXJfcHJvZ3Jlc3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3Npbl9jb3MudHMiLCJzcmMvbG9naWNfd2ViZ2wvc2hhZGVyX3RleHR1cmUudHMiLCJzcmMvbG9naWNfd2ViZ2wvd2ViZ2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1DQUFrSDtBQUNsSCxpRkFBb0c7QUFDcEcscURBQTBEO0FBQzFELHVFQUFxRjtBQUNyRixxREFBMEQ7QUFDMUQscURBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxvREFBb0Q7QUFFcEQ7O0dBRUc7QUFDSCxJQUFJLFNBQXdCLENBQUM7QUFFdkIsSUFBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWdCLEVBQUUsRUFBRTtJQUN6QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsWUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNO1NBQ1Q7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksU0FBUyxJQUFJ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R0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFRTSxVQUFVLENBQUMsU0FBaUIsSUFBRyxDQUFDO0lBQ2hDLE9BQU87UUFDVixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTlFc0IseUJBQVcsR0FBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QywwQkFBWSxHQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkMseUJBQVcsR0FBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QywwQkFBWSxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFSOUcsc0NBb0ZDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgV2ViR0xJbnN0YW5jZSwgV2ViR0xJbnN0YW5jZU9wdCwgU2hhZGVyQ2ZnLCBTY2VuZSwgRGF0YUJ1ZmZlckNmZywgTWVzaCwgVGV4dHVyZUluc3RhbmNlIH0gZnJvbSBcIi4vd2ViZ2xcIjtcclxuaW1wb3J0IHsgdnNfbXVsdGlfbGluZV9kaWZmX3NwZWVkLCBmc19tdWx0aV9saW5lX2RpZmZfc3BlZWQgfSBmcm9tIFwiLi9zaGFkZXJfbXVsdGlfbGluZV9kaWZmX3NwZWVkXCI7XHJcbmltcG9ydCB7IHZzX3Npbl9jb3MsIGZzX3Npbl9jb3MgfSBmcm9tIFwiLi9zaGFkZXJfc2luX2Nvc1wiO1xyXG5pbXBvcnQgeyB2c19tdWx0aV9saW5lX2Nyb3NzLCBmc19tdWx0aV9saW5lX2Nyb3NzIH0gZnJvbSBcIi4vc2hhZGVyX211bHRpX2xpbmVfY3Jvc3NcIjtcclxuaW1wb3J0IHsgdnNfcG9seWdvbiwgZnNfcG9seWdvbiB9IGZyb20gXCIuL3NoYWRlcl9wb2x5Z29uXCI7XHJcbmltcG9ydCB7IHZzX3RleHR1cmUsIGZzX3RleHR1cmUgfSBmcm9tIFwiLi9zaGFkZXJfdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyB2c19wcm9ncmVzcywgZnNfcHJvZ3Jlc3MgfSBmcm9tIFwiLi9zaGFkZXJfcHJvZ3Jlc3NcIjtcclxuXHJcbi8vIGRlY2xhcmUgZnVuY3Rpb24gcG9zdE1lc3NhZ2UobWVzc2FnZTogYW55KTogdm9pZDtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxubGV0IHdlYmdsZGVtbzogV2ViR0xJbnN0YW5jZTtcclxuXHJcbig8YW55PnNlbGYpLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IGV2LmRhdGE7XHJcbiAgICBzd2l0Y2ggKGRhdGEuQ01EKSB7XHJcbiAgICAgICAgY2FzZSAoJ0lOSVQnKToge1xyXG4gICAgICAgICAgICBtYWluKGRhdGEuY2FudmFzKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgKCdNT1ZFJyk6IHtcclxuICAgICAgICAgICAgdXBkYXRlTW91c2UoZGF0YS54LCBkYXRhLnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAoJ0lNQUdFJyk6IHtcclxuICAgICAgICAgICAgaWYgKHdlYmdsZGVtbyAmJiAhd2ViZ2xkZW1vLmlzRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhLmltYWdlLCBkYXRhLndpZHRoLCBkYXRhLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBUZXh0dXJlSW5zdGFuY2UubG9hZGVkKGltYWdlRGF0YSwgZGF0YS5mbmFtZSwgd2ViZ2xkZW1vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYG5vIHN1Y2ggQ01EOiBgLCBkYXRhLkNNRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlVGV4dHVyZUxvYWQgPSAoZm5hbWU6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlLCBjYjogKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHZvaWQpID0+IHtcclxuICAgICg8YW55PnNlbGYpLnBvc3RNZXNzYWdlKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ01EOiAnSU1BR0UnLFxyXG4gICAgICAgICAgICBmbmFtZTogZm5hbWVcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1haW4gPSAoY2FudmFzOiBPZmZzY3JlZW5DYW52YXMpID0+IHtcclxuICAgIGNvbnN0IG9wdDogV2ViR0xJbnN0YW5jZU9wdCA9IDxhbnk+e307XHJcblxyXG4gICAgb3B0LmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICB3ZWJnbGRlbW8gPSBuZXcgV2ViR0xJbnN0YW5jZShvcHQpO1xyXG4gICAgVGV4dHVyZUluc3RhbmNlLmxvYWRDYWxsID0gY3JlYXRlVGV4dHVyZUxvYWQ7XHJcblxyXG4gICAgY29uc3Qgc2hhZGVyMDEgPSBuZXcgU2hhZGVyQ2ZnKCcwMScsIHZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCwgIGZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCk7XHJcbiAgICBjb25zdCBzaGFkZXIwMiA9IG5ldyBTaGFkZXJDZmcoJzAyJywgdnNfc2luX2NvcywgICAgICAgICAgICAgICAgZnNfc2luX2Nvcyk7XHJcbiAgICBjb25zdCBzaGFkZXIwMyA9IG5ldyBTaGFkZXJDZmcoJzAzJywgdnNfbXVsdGlfbGluZV9jcm9zcywgICAgICAgZnNfbXVsdGlfbGluZV9jcm9zcyk7XHJcbiAgICBjb25zdCBzaGFkZXIwNCA9IG5ldyBTaGFkZXJDZmcoJzA0JywgdnNfcG9seWdvbiwgICAgICAgICAgICAgICAgZnNfcG9seWdvbik7XHJcbiAgICBjb25zdCBzaGFkZXIwNSA9IG5ldyBTaGFkZXJDZmcoJzA1JywgdnNfdGV4dHVyZSwgICAgICAgICAgICAgICAgZnNfdGV4dHVyZSk7XHJcbiAgICBjb25zdCBzaGFkZXIwNiA9IG5ldyBTaGFkZXJDZmcoJzA2JywgdnNfcHJvZ3Jlc3MsICAgICAgICAgICAgICAgZnNfcHJvZ3Jlc3MpO1xyXG5cclxuICAgIGNvbnN0IHNjZW5lMDEgPSBuZXcgU2NlbmUoJzAyJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDIgPSBuZXcgU2NlbmUoJzAyJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDMgPSBuZXcgU2NlbmUoJzAzJywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDQgPSBuZXcgU2NlbmUoJzA0Jywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDUgPSBuZXcgU2NlbmUoJzA1Jywgd2ViZ2xkZW1vKTtcclxuICAgIGNvbnN0IHNjZW5lMDYgPSBuZXcgU2NlbmUoJzA2Jywgd2ViZ2xkZW1vKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQnVmZmVyMDEgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDEnKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoLTEgLyAyLCAtMSAvIDIsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZFVWKDAsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLmFkZFZlcnRleCgxIC8gMiwgLTEgLyAyLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoMSAvIDIsIDEgLyAyLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRVVigxLCAxKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRWZXJ0ZXgoLTEgLyAyLCAxIC8gMiwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDEuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwMS5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjAxLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlcjAyID0gbmV3IERhdGFCdWZmZXJDZmcoJzAxJyk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoMSwgMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDIuYWRkVmVydGV4KC0xLCAxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRVVigwLCAxKTtcclxuICAgIGRhdGFCdWZmZXIwMi5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgZGF0YUJ1ZmZlcjAyLmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICBkYXRhQnVmZmVyMDIudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQnVmZmVyMDMgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDMnKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoLTEsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRVVigwLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRWZXJ0ZXgoMSwgLTEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFVWKDEsIDApO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgxLCAtMSArIDIwIC8gY2FudmFzLmhlaWdodCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVmVydGV4KC0xLCAtMSArIDIwIC8gY2FudmFzLmhlaWdodCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkVVYoMCwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIGRhdGFCdWZmZXIwMy5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgZGF0YUJ1ZmZlcjAzLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlcjA0ID0gbmV3IERhdGFCdWZmZXJDZmcoJzA0Jyk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVVYoMCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0wLjgsIC0xLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwNC5hZGRVVigxLCAwKTtcclxuICAgIGRhdGFCdWZmZXIwNC5hZGRWZXJ0ZXgoLTAuOCwgLTAuOCwgMCk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVVYoMSwgMSk7XHJcbiAgICBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0xLCAtMC44LCAwKTtcclxuICAgIGRhdGFCdWZmZXIwNC5hZGRVVigwLCAxKTtcclxuICAgIGRhdGFCdWZmZXIwNC5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgZGF0YUJ1ZmZlcjA0LmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICBkYXRhQnVmZmVyMDQudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICAvLyBjb25zdCBkYXRhQnVmZmVyMDIgPSBuZXcgRGF0YUJ1ZmZlckNmZygnMDInKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoLTEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAyLmFkZFZlcnRleCgxLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi5hZGRWZXJ0ZXgoLTEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAyLmFkZEZhY2UoMCwgMSwgMik7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDIuYWRkRmFjZSgwLCAyLCAzKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMi51cGRhdGUoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD53ZWJnbGRlbW8uZ2wpO1xyXG5cclxuICAgIC8vIGNvbnN0IGRhdGFCdWZmZXIwMyA9IG5ldyBEYXRhQnVmZmVyQ2ZnKCcwMycpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgtMSwgLTEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgxLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDMuYWRkVmVydGV4KDEsIDEsIDApO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLmFkZFZlcnRleCgtMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDMuYWRkRmFjZSgwLCAxLCAyKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwMy5hZGRGYWNlKDAsIDIsIDMpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjAzLnVwZGF0ZSg8V2ViR0xSZW5kZXJpbmdDb250ZXh0PndlYmdsZGVtby5nbCk7XHJcblxyXG4gICAgLy8gY29uc3QgZGF0YUJ1ZmZlcjA0ID0gbmV3IERhdGFCdWZmZXJDZmcoJzA0Jyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0xLCAtMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KDEsIC0xLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwNC5hZGRWZXJ0ZXgoMSwgMSwgMCk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQuYWRkVmVydGV4KC0xLCAxLCAwKTtcclxuICAgIC8vIGRhdGFCdWZmZXIwNC5hZGRGYWNlKDAsIDEsIDIpO1xyXG4gICAgLy8gZGF0YUJ1ZmZlcjA0LmFkZEZhY2UoMCwgMiwgMyk7XHJcbiAgICAvLyBkYXRhQnVmZmVyMDQudXBkYXRlKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+d2ViZ2xkZW1vLmdsKTtcclxuXHJcbiAgICAvLyBjb25zdCBtZXNoMDEgPSBuZXcgTWVzaCgnbWVzaDAxJywgZGF0YUJ1ZmZlcjAxLCBzaGFkZXIwMSk7XHJcbiAgICAvLyBtZXNoMDEudHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgLy8gbWVzaDAxLnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMS5zY2FsZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwMS5zY2FsZVsxXSA9IDAuNTtcclxuICAgIC8vIHNjZW5lMDEuYWRkTWVzaChtZXNoMDEpO1xyXG5cclxuICAgIC8vIGNvbnN0IG1lc2gwMiA9IG5ldyBNZXNoKCdtZXNoMDInLCBkYXRhQnVmZmVyMDIsIHNoYWRlcjAyKTtcclxuICAgIC8vIG1lc2gwMi50cmFuc2xhdGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDIudHJhbnNsYXRlWzFdID0gMC4wO1xyXG4gICAgLy8gbWVzaDAyLnNjYWxlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDAyLnNjYWxlWzFdID0gMC41O1xyXG4gICAgLy8gc2NlbmUwMi5hZGRNZXNoKG1lc2gwMik7XHJcblxyXG4gICAgLy8gY29uc3QgbWVzaDAzID0gbmV3IE1lc2goJ21lc2gwMycsIGRhdGFCdWZmZXIwMywgc2hhZGVyMDMpO1xyXG4gICAgLy8gbWVzaDAzLnRyYW5zbGF0ZVswXSA9IDAuMDtcclxuICAgIC8vIG1lc2gwMy50cmFuc2xhdGVbMV0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDMuc2NhbGVbMF0gPSAwLjU7XHJcbiAgICAvLyBtZXNoMDMuc2NhbGVbMV0gPSAwLjU7XHJcbiAgICAvLyBzY2VuZTAzLmFkZE1lc2gobWVzaDAzKTtcclxuXHJcbiAgICAvLyBjb25zdCBtZXNoMDQgPSBuZXcgTWVzaCgnbWVzaDA0JywgZGF0YUJ1ZmZlcjA0LCBzaGFkZXIwNCk7XHJcbiAgICAvLyBtZXNoMDQudHJhbnNsYXRlWzBdID0gMC41O1xyXG4gICAgLy8gbWVzaDA0LnRyYW5zbGF0ZVsxXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwNC5zY2FsZVswXSA9IDAuNTtcclxuICAgIC8vIG1lc2gwNC5zY2FsZVsxXSA9IDAuNTtcclxuICAgIC8vIHNjZW5lMDQuYWRkTWVzaChtZXNoMDQpO1xyXG5cclxuICAgIGNvbnN0IG1lc2hpY29uID0gbmV3IE1lc2goJ21lc2hpY29uJywgZGF0YUJ1ZmZlcjAyLCBzaGFkZXIwNSk7XHJcbiAgICBtZXNoaWNvbi50cmFuc2xhdGVbMF0gPSAwLjA7XHJcbiAgICBtZXNoaWNvbi50cmFuc2xhdGVbMV0gPSAtMC4yO1xyXG4gICAgbWVzaGljb24uc2NhbGVbMF0gPSAwLjU7XHJcbiAgICBtZXNoaWNvbi5zY2FsZVsxXSA9IDAuNTtcclxuICAgIG1lc2hpY29uLnRleHR1cmUgPSB3ZWJnbGRlbW8uY3JlYXRlVGV4dHVyZSgnL3Jlc291cmNlcy96aHVhbmdzaGkucG5nJyk7XHJcbiAgICBzY2VuZTA1LmFkZE1lc2gobWVzaGljb24pO1xyXG5cclxuICAgIGNvbnN0IG1lc2gwNSA9IG5ldyBNZXNoKCdtZXNoMDUnLCBkYXRhQnVmZmVyMDIsIHNoYWRlcjA1KTtcclxuICAgIG1lc2gwNS50cmFuc2xhdGVbMF0gPSAwLjA7XHJcbiAgICBtZXNoMDUudHJhbnNsYXRlWzFdID0gMC4wO1xyXG4gICAgbWVzaDA1LnNjYWxlWzBdID0gMC41O1xyXG4gICAgbWVzaDA1LnNjYWxlWzFdID0gMC41O1xyXG4gICAgbWVzaDA1LnRleHR1cmUgPSB3ZWJnbGRlbW8uY3JlYXRlVGV4dHVyZSgnL3Jlc291cmNlcy9jaG9pY2VfbGlnaHQucG5nJyk7XHJcbiAgICBzY2VuZTA1LmFkZE1lc2gobWVzaDA1KTtcclxuXHJcbiAgICBjb25zdCBtZXNoMDYgPSBuZXcgTWVzaCgnbWVzaDA2JywgZGF0YUJ1ZmZlcjAzLCBzaGFkZXIwNik7XHJcbiAgICBtZXNoMDYudHJhbnNsYXRlWzBdID0gMC4wO1xyXG4gICAgbWVzaDA2LnRyYW5zbGF0ZVsxXSA9IDAuMDtcclxuICAgIG1lc2gwNi5zY2FsZVswXSA9IDE7XHJcbiAgICBtZXNoMDYuc2NhbGVbMV0gPSAxO1xyXG4gICAgbWVzaDA2LnVmbG9hdCA9IDAuNTtcclxuICAgIHNjZW5lMDYuYWRkTWVzaChtZXNoMDYpO1xyXG5cclxuICAgIGNvbnN0IG1lc2gwNyA9IG5ldyBNZXNoKCdtZXNoMDcnLCBkYXRhQnVmZmVyMDQsIHNoYWRlcjA1KTtcclxuICAgIG1lc2gwNy50cmFuc2xhdGVbMF0gPSAwLjA7XHJcbiAgICBtZXNoMDcudHJhbnNsYXRlWzFdID0gMC4wO1xyXG4gICAgbWVzaDA3LnNjYWxlWzBdID0gMTtcclxuICAgIG1lc2gwNy5zY2FsZVsxXSA9IDE7XHJcbiAgICBtZXNoMDcudGV4dHVyZSA9IHdlYmdsZGVtby5jcmVhdGVUZXh0dXJlKCcvcmVzb3VyY2VzL2Nob2ljZV9saWdodDAyLnBuZycpO1xyXG4gICAgc2NlbmUwNS5hZGRNZXNoKG1lc2gwNyk7XHJcblxyXG4gICAgd2ViZ2xkZW1vLnJlbmRlckxvb3AgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcclxuICAgICAgICB3ZWJnbGRlbW8uY2xlYXJDb2xvcigpO1xyXG5cclxuICAgICAgICBzY2VuZTA1LnZpZXdwb3J0WzBdID0gMDtcclxuICAgICAgICBzY2VuZTA1LnZpZXdwb3J0WzFdID0gMDtcclxuICAgICAgICBzY2VuZTA1LnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoO1xyXG4gICAgICAgIHNjZW5lMDUudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0O1xyXG4gICAgICAgIHNjZW5lMDUucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2NlbmUwMS52aWV3cG9ydFswXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwMS52aWV3cG9ydFsxXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwMS52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aCAvIDI7XHJcbiAgICAgICAgLy8gc2NlbmUwMS52aWV3cG9ydFszXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDEucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgc2NlbmUwNi52aWV3cG9ydFswXSA9IDA7XHJcbiAgICAgICAgc2NlbmUwNi52aWV3cG9ydFsxXSA9IDA7XHJcbiAgICAgICAgc2NlbmUwNi52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aDtcclxuICAgICAgICBzY2VuZTA2LnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodDtcclxuICAgICAgICBtZXNoMDYudWZsb2F0ID0gTWF0aC5hYnMoTWF0aC5zaW4oRGF0ZS5ub3coKSAvIDEwMDApKTtcclxuICAgICAgICBzY2VuZTA2LnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDIudmlld3BvcnRbMF0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDIudmlld3BvcnRbMV0gPSAwO1xyXG4gICAgICAgIC8vIHNjZW5lMDIudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyIDtcclxuICAgICAgICAvLyBzY2VuZTAyLnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDIgO1xyXG4gICAgICAgIC8vIHNjZW5lMDIucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2NlbmUwMy52aWV3cG9ydFswXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwMy52aWV3cG9ydFsxXSA9IHdlYmdsZGVtby5oZWlnaHQgLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDMudmlld3BvcnRbMl0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDMudmlld3BvcnRbM10gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyBzY2VuZTAzLnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIHNjZW5lMDQudmlld3BvcnRbMF0gPSB3ZWJnbGRlbW8ud2lkdGggLyAyO1xyXG4gICAgICAgIC8vIHNjZW5lMDQudmlld3BvcnRbMV0gPSB3ZWJnbGRlbW8uaGVpZ2h0IC8gMjtcclxuICAgICAgICAvLyBzY2VuZTA0LnZpZXdwb3J0WzJdID0gd2ViZ2xkZW1vLndpZHRoIC8gMjtcclxuICAgICAgICAvLyBzY2VuZTA0LnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLy8gbWVzaDA0LnJvdGF0ZVsyXSAgICA9IERhdGUubm93KCkgLyAxMDAwICUgMTAwMDsgLy8gKDAtMSkg6KGo56S65peL6L2sIDE4MFxyXG4gICAgICAgIC8vIHNjZW5lMDQucmVuZGVyKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gc2NlbmUwNS52aWV3cG9ydFswXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwNS52aWV3cG9ydFsxXSA9IDA7XHJcbiAgICAgICAgLy8gc2NlbmUwNS52aWV3cG9ydFsyXSA9IHdlYmdsZGVtby53aWR0aDtcclxuICAgICAgICAvLyBzY2VuZTA1LnZpZXdwb3J0WzNdID0gd2ViZ2xkZW1vLmhlaWdodDtcclxuICAgICAgICAvLyBzY2VuZTA1LnJlbmRlcihmYWxzZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB3ZWJnbGRlbW8ubG9vcCgwKTtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZU1vdXNlID0gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XHJcbiAgICB3ZWJnbGRlbW8udV9tb3VzZVswXSA9IHg7XHJcbiAgICB3ZWJnbGRlbW8udV9tb3VzZVsxXSA9IHk7XHJcbn07IiwiZXhwb3J0IGNvbnN0IHZzX211bHRpX2xpbmVfY3Jvc3MgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgc3VyZmFjZVBvc2l0aW9uO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxuICAgIHN1cmZhY2VQb3NpdGlvbiAgICAgID0gcG9zaXRpb247XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX211bHRpX2xpbmVfY3Jvc3MgPSBgXHJcbi8vIEF1dGhvciBAcGF0cmljaW9ndiAtIDIwMTVcclxuLy8gVGl0bGU6IFRydWNoZXQgLSAxMCBwcmludFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcclxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XHJcbnVuaWZvcm0gdmVjMyB1X3RyYW5zbGF0ZTtcclxudW5pZm9ybSB2ZWMzIHVfc2NhbGU7XHJcbnVuaWZvcm0gdmVjMyB1X3JvdGF0ZTtcclxuXHJcbnZlYzIgYnJpY2tUaWxlKHZlYzIgX3N0LCBmbG9hdCBfem9vbSl7XHJcbiAgICBfc3QgKj0gX3pvb207XHJcblxyXG4gICAgLy8gSGVyZSBpcyB3aGVyZSB0aGUgb2Zmc2V0IGlzIGhhcHBlbmluZ1xyXG4gICAgLy8gX3N0LnggKz0gc3RlcCgxLiwgbW9kKF9zdC55LDIuMCkpICogMC41O1xyXG5cclxuICAgIHJldHVybiBmcmFjdChfc3QpO1xyXG59XHJcblxyXG5mbG9hdCBib3godmVjMiBfc3QsIHZlYzIgX3NpemUpe1xyXG4gICAgX3NpemUgPSB2ZWMyKDAuNSktX3NpemUqMC41O1xyXG4gICAgdmVjMiB1diA9IHNtb290aHN0ZXAoX3NpemUsX3NpemUrdmVjMigxZS00KSxfc3QpO1xyXG4gICAgdXYgKj0gc21vb3Roc3RlcChfc2l6ZSxfc2l6ZSt2ZWMyKDFlLTQpLHZlYzIoMS4wKS1fc3QpO1xyXG4gICAgcmV0dXJuIHV2LngqdXYueTtcclxufVxyXG5mbG9hdCBjaXJjbGUodmVjMiB4eSwgdmVjMiBjZW50ZXIsIGZsb2F0IHJhZGl1cywgZmxvYXQgc21vb3RoX2VkZ2UpIHtcclxuICAgIGZsb2F0IGRpc3QgPSBkaXN0YW5jZSh4eSxjZW50ZXIpO1xyXG4gICAgZGlzdCA9IHNtb290aHN0ZXAocmFkaXVzLCByYWRpdXMgKyBzbW9vdGhfZWRnZSwgZGlzdCk7XHJcbiAgICByZXR1cm4gZGlzdDtcclxufVxyXG5cclxudm9pZCBtYWluKHZvaWQpe1xyXG4gICAgZmxvYXQgY291bnQgPSAyMC4wO1xyXG4gICAgdmVjMiBzdCA9IGdsX0ZyYWdDb29yZC54eS91X3Jlc29sdXRpb24ueHk7XHJcbiAgICBzdCAtPSB1X3RyYW5zbGF0ZS54eTtcclxuICAgIHN0ICo9IDEuMC91X3NjYWxlLnh5O1xyXG5cclxuICAgIGZsb2F0IHNpbl90ID0gc2luKHVfdGltZSAqIDMuMTQgLyAxMC4wKTtcclxuICAgIGZsb2F0IGNvc190ID0gY29zKHVfdGltZSAqIDMuMTQgLyAxMC4wKTtcclxuICAgIGZsb2F0IGNvbF9mbGFnPSBtb2Qoc3QueSAqIGNvdW50LCAyLjApIDwgMS4wID8gMS4wIDogLTEuMDtcclxuICAgIGZsb2F0IHJvd19mbGFnPSBtb2Qoc3QueCAqIGNvdW50LCAyLjApIDwgMS4wID8gMS4wIDogLTEuMDtcclxuICAgIHN0ICs9IHZlYzIoXHJcbiAgICAgICAgY29sX2ZsYWcgKiAoIHNpbl90ICogY29zX3QgPCAwLjAgPyBjb3NfdCA6IDAuMCApICogMC41LFxyXG4gICAgICAgIHJvd19mbGFnICogKCBzaW5fdCAqIGNvc190ID4gMC4wID8gc2luX3QgOiAwLjAgKSAqIDAuNSk7XHJcbiAgICB2ZWMzIGNvbG9yID0gdmVjMygwLjApO1xyXG5cclxuICAgIC8vIE1vZGVybiBtZXRyaWMgYnJpY2sgb2YgMjE1bW0geCAxMDIuNW1tIHggNjVtbVxyXG4gICAgLy8gaHR0cDovL3d3dy5qYWhhcnJpc29uLm1lLnVrL0JyaWNrd29yay9TaXplcy5odG1sXHJcbiAgICAvLyBzdCAvPSB2ZWMyKDIuMTUsMC42NSkvMS41O1xyXG5cclxuICAgIC8vIEFwcGx5IHRoZSBicmljayB0aWxpbmdcclxuICAgIHN0ID0gYnJpY2tUaWxlKHN0LGNvdW50KTtcclxuXHJcbiAgICBjb2xvciA9IHZlYzMoY2lyY2xlKHN0LHZlYzIoMC41LDAuNSksMC40LCAwLjA1KSk7XHJcblxyXG4gICAgLy8gVW5jb21tZW50IHRvIHNlZSB0aGUgc3BhY2UgY29vcmRpbmF0ZXNcclxuICAgIC8vIGNvbG9yID0gdmVjMyhzdCwwLjApO1xyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IsMS4wKTtcclxufVxyXG5gOyIsImV4cG9ydCBjb25zdCB2c19tdWx0aV9saW5lX2RpZmZfc3BlZWQgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgc3VyZmFjZVBvc2l0aW9uO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxuICAgIHN1cmZhY2VQb3NpdGlvbiAgICAgID0gcG9zaXRpb247XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX211bHRpX2xpbmVfZGlmZl9zcGVlZCA9IGBcclxuLy8gQXV0aG9yIEBwYXRyaWNpb2d2IC0gMjAxNVxyXG4vLyBUaXRsZTogVHJ1Y2hldCAtIDEwIHByaW50XHJcblxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxuI2RlZmluZSBQSSAzLjE0MTU5MjY1MzU4OTc5MzIzODQ2XHJcblxyXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xyXG51bmlmb3JtIHZlYzIgdV9tb3VzZTtcclxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XHJcbnVuaWZvcm0gdmVjMyB1X3RyYW5zbGF0ZTtcclxudW5pZm9ybSB2ZWMzIHVfc2NhbGU7XHJcbnVuaWZvcm0gdmVjMyB1X3JvdGF0ZTtcclxuXHJcbmZsb2F0IHJhbmRvbSAoaW4gdmVjMiBfc3QpIHtcclxuICAgIHJldHVybiBmcmFjdChzaW4oZG90KF9zdC54eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHZlYzIoMTIuOTg5OCw3OC4yMzMpKSkqXHJcbiAgICAgICAgNDM3NTguNTQ1MzEyMyk7XHJcbn1cclxuXHJcbnZlYzIgdHJ1Y2hldFBhdHRlcm4oaW4gdmVjMiBfc3QsIGluIGZsb2F0IF9pbmRleCl7XHJcbiAgICBfaW5kZXggPSBmcmFjdCgoKF9pbmRleC0wLjUpKjIuMCkpO1xyXG4gICAgaWYgKF9pbmRleCA+IDAuNzUpIHtcclxuICAgICAgICBfc3QgPSB2ZWMyKDEuMCkgLSBfc3Q7XHJcbiAgICB9IGVsc2UgaWYgKF9pbmRleCA+IDAuNSkge1xyXG4gICAgICAgIF9zdCA9IHZlYzIoMS4wLV9zdC54LF9zdC55KTtcclxuICAgIH0gZWxzZSBpZiAoX2luZGV4ID4gMC4yNSkge1xyXG4gICAgICAgIF9zdCA9IDEuMC12ZWMyKDEuMC1fc3QueCxfc3QueSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3N0O1xyXG59XHJcbmZsb2F0IGNpcmNsZSh2ZWMyIHh5LCB2ZWMyIGNlbnRlciwgZmxvYXQgcmFkaXVzLCBmbG9hdCBzbW9vdGhfZWRnZSkge1xyXG4gICAgZmxvYXQgZGlzdCA9IGRpc3RhbmNlKHh5LGNlbnRlcik7XHJcbiAgICBkaXN0ID0gc21vb3Roc3RlcChyYWRpdXMsIHJhZGl1cyArIHNtb290aF9lZGdlLCBkaXN0KTtcclxuICAgIHJldHVybiBkaXN0O1xyXG59XHJcblxyXG52b2lkIG1haW4oKSB7XHJcbiAgICBmbG9hdCBjb3VudCA9IDIwLjA7XHJcbiAgICB2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbi54eTtcclxuICAgIHN0IC09IHVfdHJhbnNsYXRlLnh5O1xyXG4gICAgc3QgKj0gMS4wL3Vfc2NhbGUueHk7XHJcbiAgICBzdCAqPSBjb3VudDtcclxuXHRzdC54IC09IHVfdGltZSAqIDIuMCAqICByYW5kb20odmVjMihmbG9vcihzdCkueSwxLjApKTtcclxuXHJcbiAgICB2ZWMyIGlwb3MgPSBmbG9vcihzdCk7ICAvLyBpbnRlZ2VyXHJcbiAgICB2ZWMyIGZwb3MgPSBmcmFjdChzdCk7ICAvLyBmcmFjdGlvblxyXG5cclxuICAgIGZsb2F0IHNwZWVkID0gcmFuZG9tKHZlYzIoaXBvcy55KSk7XHJcblxyXG4gICAgZmxvYXQgeF9mID0gcmFuZG9tKHZlYzIoaXBvcy54LCAwKSk7XHJcbiAgICBmbG9hdCB5X2YgPSByYW5kb20odmVjMigwLCBpcG9zLnkpKTtcclxuXHJcbiAgICBmbG9hdCBjb2xvciA9IDAuMDtcclxuICAgIGNvbG9yID0gcmFuZG9tKHZlYzIoeF9mLCB5X2YpKTtcclxuXHRjb2xvciA9XHJcbiAgICBcdDEuMCAtICgxLjAgLSBjaXJjbGUoZnJhY3Qoc3QpLCB2ZWMyKDAuNSksIDAuMjUsIDAuMSkpICogY29sb3JcclxuICAgIFx0O1xyXG4gICAgdmVjNCBmX2NvbG9yID0gdmVjNCh2ZWMzKGNvbG9yKSwxLjApO1xyXG4gICAgZl9jb2xvci5yID0gY29sb3IgPCAxLjAgPyAwLjAgOiAxLjA7XHJcbiAgICBmX2NvbG9yLmcgPSBjb2xvciA8IDEuMCA/IDAuMCA6IDEuMDtcclxuICAgIGZfY29sb3IuYiA9IGNvbG9yIDwgMS4wID8gY29sb3IgOiAxLjA7XHJcbiAgICBmX2NvbG9yLmEgPSBjb2xvciA8IDEuMCA/IGNvbG9yIDogMC4wO1xyXG5cclxuICAgIGdsX0ZyYWdDb2xvciA9IGZfY29sb3I7XHJcbn1cclxuYDsiLCJleHBvcnQgY29uc3QgdnNfcG9seWdvbiA9IGBcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxudmFyeWluZyAgICAgdmVjMiAgICBzdXJmYWNlUG9zaXRpb247XHJcblxyXG52b2lkIG1haW4oIHZvaWQgKXtcclxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDAuLCAxLiApO1xyXG4gICAgc3VyZmFjZVBvc2l0aW9uICAgICAgPSBwb3NpdGlvbjtcclxufVxyXG5gO1xyXG5leHBvcnQgY29uc3QgZnNfcG9seWdvbiA9IGBcclxuLy8gQXV0aG9yIEBwYXRyaWNpb2d2IC0gMjAxNVxyXG4vLyBUaXRsZTogVHJ1Y2hldCAtIDEwIHByaW50XHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcblxyXG4jZGVmaW5lIFBJIDMuMTQxNTkyNjUzNTg5NzkzMjM4NDZcclxuI2RlZmluZSBUV09fUEkgNi4yNDQ4NTMwNzE3OTU4NjQ3NjkyXHJcblxyXG51bmlmb3JtIHZlYzIgdV9yZXNvbHV0aW9uO1xyXG51bmlmb3JtIHZlYzIgdV9tb3VzZTtcclxudW5pZm9ybSBmbG9hdCB1X3RpbWU7XHJcbnVuaWZvcm0gdmVjMyB1X3RyYW5zbGF0ZTtcclxudW5pZm9ybSB2ZWMzIHVfc2NhbGU7XHJcbnVuaWZvcm0gdmVjMyB1X3JvdGF0ZTtcclxuXHJcbm1hdDIgcm90YXRlMmQoZmxvYXQgX2FuZ2xlKXtcclxuICAgIHJldHVybiBtYXQyKGNvcyhfYW5nbGUpLC1zaW4oX2FuZ2xlKSxcclxuICAgICAgICAgICAgICAgIHNpbihfYW5nbGUpLGNvcyhfYW5nbGUpKTtcclxufVxyXG5cclxuZmxvYXQgc2hhcGUodmVjMiBzdCwgZmxvYXQgTil7XHJcbiAgICBzdCA9IHN0KjIuLTEuO1xyXG4gICAgZmxvYXQgYSA9IGF0YW4oc3QueCxzdC55KStQSTtcclxuICAgIGZsb2F0IHIgPSBUV09fUEkvTjtcclxuICAgIHJldHVybiBhYnMoY29zKGZsb29yKC41K2Evcikqci1hKSpsZW5ndGgoc3QpKTtcclxufVxyXG5cclxudm9pZCBtYWluKCl7XHJcbiAgICB2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbi54eTtcclxuICAgIHN0IC09IHVfdHJhbnNsYXRlLnh5O1xyXG4gICAgc3QgKj0gMS4wL3Vfc2NhbGUueHk7XHJcblxyXG4gICAgLy8gbW92ZSBzcGFjZSBmcm9tIHRoZSBjZW50ZXIgdG8gdGhlIHZlYzIoMC4wKVxyXG4gICAgc3QgLT0gdmVjMigwLjUpO1xyXG4gICAgLy8gcm90YXRlIHRoZSBzcGFjZVxyXG4gICAgc3QgPSByb3RhdGUyZCggdV9yb3RhdGUueiApICogc3Q7XHJcbiAgICAvLyBtb3ZlIGl0IGJhY2sgdG8gdGhlIG9yaWdpbmFsIHBsYWNlXHJcbiAgICBzdCArPSB2ZWMyKDAuNSk7XHJcblxyXG4gICAgdmVjMyBjb2xvciA9IHZlYzMoMC4wKTtcclxuXHJcbiAgICBjb2xvciA9IHZlYzMoIHNtb290aHN0ZXAoLjUsIC41ICsgLjAwNSwgc2hhcGUoc3QsNi4wKSkgKTtcclxuXHJcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xyXG59XHJcbmA7IiwiZXhwb3J0IGNvbnN0IHZzX3Byb2dyZXNzID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxuYXR0cmlidXRlICAgdmVjMiAgICBwb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbn1cclxuYDtcclxuZXhwb3J0IGNvbnN0IGZzX3Byb2dyZXNzID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxudW5pZm9ybSAgZmxvYXQgdV9mbG9hdDtcclxudW5pZm9ybSAgdmVjMiB1X3Jlc29sdXRpb247XHJcblxyXG52b2lkIG1haW4odm9pZCl7XHJcbiAgICB2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdV9yZXNvbHV0aW9uLnh5O1xyXG4gICAgdmVjMyBjb2xvciA9IHN0LnggPCB1X2Zsb2F0ID8gdmVjMygwLjAsIDAuOCwgMC4wKSA6IHZlYzMoMC4yLCAwLjIsIDAuMik7XHJcbiAgICAvLyAyMCDlr7nlupRqc+Wxgui/m+W6puadoemrmOW6plxyXG4gICAgY29sb3IgPSBzdC55ID4gKDIwLjAgLyB1X3Jlc29sdXRpb24ueSAvIDIuMCkgPyB2ZWMzKDAuMCkgOiBjb2xvcjtcclxuXHJcbiAgICBmbG9hdCBhbHBoYSA9IHN0LnkgPiAoMjAuMCAvIHVfcmVzb2x1dGlvbi55IC8gMi4wKSA/IDAuMCA6IDAuODtcclxuICAgIGFscGhhID0gc3QueCA8IHVfZmxvYXQgPyBhbHBoYSA6IDAuODtcclxuXHJcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2xvciwgYWxwaGEgKTtcclxufVxyXG5gOyIsImV4cG9ydCBjb25zdCB2c19zaW5fY29zID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIHBvc2l0aW9uO1xyXG52YXJ5aW5nICAgICB2ZWMyICAgIHN1cmZhY2VQb3NpdGlvbjtcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApe1xyXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMC4sIDEuICk7XHJcbiAgICBzdXJmYWNlUG9zaXRpb24gICAgICA9IHBvc2l0aW9uO1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc19zaW5fY29zID0gYFxyXG4vLyBBdXRob3IgQHBhdHJpY2lvZ3YgLSAyMDE1XHJcbi8vIFRpdGxlOiBUcnVjaGV0IC0gMTAgcHJpbnRcclxuI2lmZGVmIEdMX0VTXHJcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xyXG4jZW5kaWZcclxuXHJcbnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247XHJcbnVuaWZvcm0gdmVjMiB1X21vdXNlO1xyXG51bmlmb3JtIGZsb2F0IHVfdGltZTtcclxudW5pZm9ybSB2ZWMzIHVfdHJhbnNsYXRlO1xyXG51bmlmb3JtIHZlYzMgdV9zY2FsZTtcclxudW5pZm9ybSB2ZWMzIHVfcm90YXRlO1xyXG5cclxudm9pZCBtYWluKCl7XHJcbiAgICB2ZWMyIHN0ID0gZ2xfRnJhZ0Nvb3JkLnh5L3VfcmVzb2x1dGlvbi54eTtcclxuICAgIHN0IC09IHVfdHJhbnNsYXRlLnh5O1xyXG4gICAgc3QgKj0gMS4wL3Vfc2NhbGUueHk7XHJcbiAgICB2ZWMzIGNvbG9yID0gdmVjMygwLjApO1xyXG5cclxuICAgIHZlYzIgcG9zID0gdmVjMigwLjUpLXN0O1xyXG5cclxuICAgIGZsb2F0IHIgPSBkaXN0YW5jZShwb3MsIHZlYzIoMC4wLDAuMCkpKjIuMDtcclxuICAgIGZsb2F0IGEgPSBhdGFuKHBvcy55LHBvcy54KTtcclxuICAgIGZsb2F0IHh4eCA9IGZsb29yKHVfdGltZSAvIDEwLjApICogMTAuMCAtIHVfdGltZSA7XHJcbiAgICBmbG9hdCB5eXkgPSBmbG9vcih1X3RpbWUgLyAyMC4wKSAqIDIwLjAgLSB1X3RpbWUgO1xyXG4gICAgZmxvYXQgZiA9IGNvcyhhKjAuNSk7XHJcbiAgICAvLyBmID0gYWJzKGNvcyhhKjMuKSk7XHJcbiAgICAvLyBmID0gYWJzKGNvcyhhKjIuNSkpKi41Ky4zO1xyXG4gICAgLy8gZiA9IGFicyhjb3MoYSoxMi4pKnNpbihhKjMuKSkqLjgrLjE7XHJcbiAgICAvLyBmID0gc21vb3Roc3RlcCgtLjUsMS4sIGNvcyhhKjEwLikpKjAuMiswLjU7XHJcbiAgICBmID0gYWJzKCBjb3MoYSp4eHgpICogc2luKGEqeXl5KSApICouOSArIC4yO1xyXG5cclxuICAgIGNvbG9yID0gdmVjMyggMS4tc21vb3Roc3RlcChmLGYrMC4wMDUscikgKTtcclxuXHJcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApO1xyXG59XHJcbmA7IiwiZXhwb3J0IGNvbnN0IHZzX3RleHR1cmUgPSBgXHJcbiNpZmRlZiBHTF9FU1xyXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcclxuI2VuZGlmXHJcbmF0dHJpYnV0ZSAgIHZlYzIgICAgcG9zaXRpb247XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgc3VyZmFjZVBvc2l0aW9uO1xyXG5hdHRyaWJ1dGUgICB2ZWMyICAgIGFfdXY7XHJcbnZhcnlpbmcgICAgIHZlYzIgICAgdlVWO1xyXG5cclxudm9pZCBtYWluKCB2b2lkICl7XHJcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAwLiwgMS4gKTtcclxuICAgIHN1cmZhY2VQb3NpdGlvbiAgICAgID0gcG9zaXRpb247XHJcbiAgICB2VVYgPSBhX3V2O1xyXG59XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBmc190ZXh0dXJlID0gYFxyXG4jaWZkZWYgR0xfRVNcclxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XHJcbiNlbmRpZlxyXG5cclxudmFyeWluZyAgdmVjMiB2VVY7XHJcbnVuaWZvcm0gIHNhbXBsZXIyRCB1X3NhbXBsZXI7XHJcblxyXG52b2lkIG1haW4odm9pZCl7XHJcbiAgICAvLyBbIDAsIDAsIDAsIDEgXSAgcmdiYeminOiJsuWQkemHj1xyXG4gICAgLy8gZ2xfRnJhZ0NvbG9yID0gdmVjNCggdkNvbG9yLCAxLiApO1xyXG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKCB1X3NhbXBsZXIsIHZVViApO1xyXG59XHJcbmA7IiwiLyoqXHJcbiAqIFdFQkdMIOWfuuacrOWkhOeQhlxyXG4gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2ViR0xJbnN0YW5jZU9wdCB7XHJcbiAgICBjYW52YXM6IE9mZnNjcmVlbkNhbnZhcztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNoYWRlckNmZyB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc25hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSB2czogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZzOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdnNoYWRlcjogV2ViR0xTaGFkZXIgfCB1bmRlZmluZWQgICAgO1xyXG4gICAgcHVibGljIGZzaGFkZXI6IFdlYkdMU2hhZGVyIHwgdW5kZWZpbmVkICAgIDtcclxuICAgIHB1YmxpYyBwcm9ncmFtZTogV2ViR0xQcm9ncmFtIHwgdW5kZWZpbmVkICA7XHJcbiAgICBwdWJsaWMgdV90aW1lX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICAgICAgIDtcclxuICAgIHB1YmxpYyB1X21vdXNlX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICAgICAgO1xyXG4gICAgcHVibGljIHVfcmVzb2x1dGlvbl9sb2M6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgdW5kZWZpbmVkICA7XHJcbiAgICBwdWJsaWMgdV90cmFuc2xhdGVfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgIDtcclxuICAgIHB1YmxpYyB1X3NjYWxlX2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICA7XHJcbiAgICBwdWJsaWMgdV9yb3RhdGVfbG9jOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgIDtcclxuICAgIHB1YmxpYyB1X2Zsb2F0X2xvYzogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCB1bmRlZmluZWQgICA7XHJcbiAgICBwdWJsaWMgYV9wb3NpdGlvbl9sb2M6IG51bWJlciB8IHVuZGVmaW5lZCAgICAgICAgICAgICAgICAgIDtcclxuICAgIHB1YmxpYyBhX3V2OiBudW1iZXIgfCB1bmRlZmluZWQgICAgICAgICAgICAgICAgICA7XHJcbiAgICBwdWJsaWMgdV90ZXh0dXJlOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IHVuZGVmaW5lZCAgO1xyXG4gICAgcHJpdmF0ZSBzaGFkZXJfcHJvZ3JhbTogV2ViR0xQcm9ncmFtIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHRleEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlICA7XHJcbiAgICBjb25zdHJ1Y3RvcihzbmFtZTogc3RyaW5nLCB2czogc3RyaW5nLCBmczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zbmFtZSA9IHNuYW1lO1xyXG4gICAgICAgIHRoaXMuZnMgPSBmcztcclxuICAgICAgICB0aGlzLnZzID0gdnM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvZ3JhbWUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG5cclxuICAgICAgICBjb25zdCBzaGFkZXJfZnJhZ21lbnQgICA9IDxXZWJHTFNoYWRlcj50aGlzLmdldEZTU2hhZGVyKGdsKTtcclxuICAgICAgICBjb25zdCBzaGFkZXJfdmVydGV4ICAgICA9IDxXZWJHTFNoYWRlcj50aGlzLmdldFZTU2hhZGVyKGdsKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2hhZGVyX3Byb2dyYW0gPT09IHVuZGVmaW5lZCAmJiBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyX2ZyYWdtZW50LCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlcl9wcm9ncmFtICA9IDxXZWJHTFByb2dyYW0+Z2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJfcHJvZ3JhbSA9IHNoYWRlcl9wcm9ncmFtO1xyXG5cclxuICAgICAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgc2hhZGVyX3ZlcnRleCk7XHJcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIHNoYWRlcl9mcmFnbWVudCk7XHJcblxyXG4gICAgICAgICAgICBnbC5saW5rUHJvZ3JhbSg8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51X21vdXNlX2xvYyAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfbW91c2VgKTtcclxuXHJcbiAgICAgICAgdGhpcy51X3RpbWVfbG9jICAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfdGltZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfcmVzb2x1dGlvbl9sb2MgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9yZXNvbHV0aW9uYCk7XHJcblxyXG4gICAgICAgIHRoaXMudV90cmFuc2xhdGVfbG9jICAgID0gPFdlYkdMVW5pZm9ybUxvY2F0aW9uPmdsLmdldFVuaWZvcm1Mb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sIGB1X3RyYW5zbGF0ZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfc2NhbGVfbG9jICAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9zY2FsZWApO1xyXG5cclxuICAgICAgICB0aGlzLnVfcm90YXRlX2xvYyAgICAgICA9IDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5nbC5nZXRVbmlmb3JtTG9jYXRpb24oPFdlYkdMUHJvZ3JhbT50aGlzLnNoYWRlcl9wcm9ncmFtLCBgdV9yb3RhdGVgKTtcclxuXHJcbiAgICAgICAgdGhpcy51X2Zsb2F0X2xvYyAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgYHVfZmxvYXRgKTtcclxuXHJcbiAgICAgICAgdGhpcy5hX3Bvc2l0aW9uX2xvYyAgICAgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbig8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0sICdwb3NpdGlvbicpO1xyXG5cclxuICAgICAgICB0aGlzLmFfdXYgICAgICAgICAgICAgICA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgJ2FfdXYnKTtcclxuXHJcbiAgICAgICAgdGhpcy51X3RleHR1cmUgICAgICAgICAgPSA8V2ViR0xVbmlmb3JtTG9jYXRpb24+Z2wuZ2V0VW5pZm9ybUxvY2F0aW9uKDxXZWJHTFByb2dyYW0+dGhpcy5zaGFkZXJfcHJvZ3JhbSwgJ3Vfc2FtcGxlcicpO1xyXG5cclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLmFfcG9zaXRpb25fbG9jKTtcclxuXHJcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5hX3V2KTtcclxuXHJcbiAgICAgICAgZ2wudXNlUHJvZ3JhbSg8V2ViR0xQcm9ncmFtPnRoaXMuc2hhZGVyX3Byb2dyYW0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50ZXhBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy51X3RleHR1cmUgJiYgZ2wudW5pZm9ybTFpKHRoaXMudV90ZXh0dXJlLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFZTU2hhZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoZ2wgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52c2hhZGVyKSB7IHJldHVybiB0aGlzLnZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgdGhpcy52c2hhZGVyICA9IDxXZWJHTFNoYWRlcj5nbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZzaGFkZXIgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMudnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52cyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLnZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMudnNoYWRlciwgdGhpcy52cyk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZzaGFkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLnZzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFUlJPUiBJTiAnVkVSVEVYX1NIQURFUicgU0hBREVSOiAkeyBnbC5nZXRTaGFkZXJJbmZvTG9nKHRoaXMudnNoYWRlcikgfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52c2hhZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudnNoYWRlcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGU1NoYWRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGdsID09PSBudWxsKSB7IHJldHVybiB0aGlzLmZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZnNoYWRlcikgeyByZXR1cm4gdGhpcy5mc2hhZGVyOyB9XHJcblxyXG4gICAgICAgIHRoaXMuZnNoYWRlciAgPSA8V2ViR0xTaGFkZXI+Z2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZzaGFkZXIgPT09IG51bGwpIHsgcmV0dXJuIHRoaXMuZnNoYWRlcjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5mcyA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB0aGlzLmZzaGFkZXI7IH1cclxuXHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnNoYWRlciwgdGhpcy5mcyk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLmZzaGFkZXIpO1xyXG5cclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLmZzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFUlJPUiBJTiAnRlJBR01FTlRfU0hBREVSJyBTSEFERVI6ICR7IGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5mc2hhZGVyKSB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZzaGFkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mc2hhZGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUJ1ZmZlckNmZyB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdm5hbWU6ICAgICAgICAgIHN0cmluZztcclxuICAgIHB1YmxpYyB2ZXJ0ZXhfbG9jOiAgICAgICAgICAgICAgbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHZlcnRleF9kYXRhOiAgICBudW1iZXJbXSAgICA9IFtdO1xyXG4gICAgcHVibGljIHZlcnRleF9idWZmZXI6ICAgICAgICAgICBXZWJHTEJ1ZmZlciB8IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyBmYWNlX2xvYzogICAgICAgICAgICAgICAgbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZhY2VfZGF0YTogICAgICBudW1iZXJbXSAgICA9IFtdO1xyXG4gICAgcHVibGljIGZhY2VfYnVmZmVyOiAgICAgICAgICAgICBXZWJHTEJ1ZmZlciB8IHVuZGVmaW5lZDtcclxuICAgIHB1YmxpYyByZWFkb25seSB1dl9kYXRhOiAgICAgICAgbnVtYmVyW10gICAgPSBbXTtcclxuICAgIHB1YmxpYyB1dl9idWZmZXI6ICAgICAgICAgICAgICAgV2ViR0xCdWZmZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcih2bmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52bmFtZSA9IHZuYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFZlcnRleCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhfZGF0YS5wdXNoKHgsIHkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZEZhY2UoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmFjZV9kYXRhLnB1c2goYSwgYiwgYyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkVVYodTogbnVtYmVyLCB2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnV2X2RhdGEucHVzaCh1LCB2KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVmVydGV4KGdsKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVVWKGdsKTtcclxuICAgICAgICB0aGlzLmFjdGl2ZUZhY2UoZ2wpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZVZlcnRleChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZlcnRleF9idWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0ZXhfYnVmZmVyICA9IDxXZWJHTEJ1ZmZlcj5nbC5jcmVhdGVCdWZmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleF9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodGhpcy52ZXJ0ZXhfZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3RpdmVGYWNlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZmFjZV9idWZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5mYWNlX2J1ZmZlciAgPSA8V2ViR0xCdWZmZXI+Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmZhY2VfYnVmZmVyKTtcclxuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBVaW50MTZBcnJheSh0aGlzLmZhY2VfZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3RpdmVVVihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnV2X2J1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLnV2X2J1ZmZlciAgPSA8V2ViR0xCdWZmZXI+Z2wuY3JlYXRlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy51dl9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodGhpcy51dl9kYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlNUQVRJQ19EUkFXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzaCB7XHJcbiAgICBwdWJsaWMgdGV4dHVyZTogVGV4dHVyZUluc3RhbmNlIHwgbnVsbDtcclxuICAgIHB1YmxpYyByZWFkb25seSBkYXRhQnVmZmVyQ2ZnOiBEYXRhQnVmZmVyQ2ZnO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHNoYWRlckNmZzogU2hhZGVyQ2ZnO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHJhbnNsYXRlOiBudW1iZXJbXSA9IFswLCAwLCAwXTtcclxuICAgIHB1YmxpYyByZWFkb25seSBzY2FsZTogbnVtYmVyW10gICAgID0gWzEsIDEsIDFdO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHJvdGF0ZTogbnVtYmVyW10gICAgPSBbMCwgMCwgMF07XHJcbiAgICBwdWJsaWMgdWZsb2F0OiBudW1iZXIgICAgICA9IDAuMDtcclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGdlbzogRGF0YUJ1ZmZlckNmZywgbWF0ZXJpYWw6IFNoYWRlckNmZykge1xyXG4gICAgICAgIHRoaXMuaWQgICAgICAgICAgICAgPSBpZDtcclxuICAgICAgICB0aGlzLmRhdGFCdWZmZXJDZmcgID0gZ2VvO1xyXG4gICAgICAgIHRoaXMuc2hhZGVyQ2ZnICAgICAgPSBtYXRlcmlhbDtcclxuICAgICAgICB0aGlzLnRleHR1cmUgICAgICAgID0gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoc2NlbmU6IFNjZW5lKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5zY2VuZS5lbmdpbmUuZ2w7XHJcblxyXG4gICAgICAgIGNvbnN0IHNoYWRlciA9IDxTaGFkZXJDZmc+dGhpcy5zaGFkZXJDZmc7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFkZXJDZmcudGV4QWN0aXZlID0gdGhpcy50ZXh0dXJlLmFjdGl2ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNoYWRlckNmZy50ZXhBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hhZGVyLmdldFByb2dyYW1lKGdsKTtcclxuXHJcbiAgICAgICAgPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X21vdXNlX2xvYyAgICAmJiBnbC51bmlmb3JtMmZ2KDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9tb3VzZV9sb2MsICAgIHNjZW5lLmVuZ2luZS51X21vdXNlKTtcclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfdGltZV9sb2MgICAgICYmIGdsLnVuaWZvcm0xZig8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfdGltZV9sb2MsICAgICAgc2NlbmUuZW5naW5lLnRpbWVzdGFtcCAqIDAuMDAxKTtcclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfZmxvYXRfbG9jICAgICYmIGdsLnVuaWZvcm0xZig8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfZmxvYXRfbG9jLCAgICAgIHRoaXMudWZsb2F0KTtcclxuXHJcbiAgICAgICAgPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3Jlc29sdXRpb25fbG9jICAgJiYgZ2wudW5pZm9ybTJmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9yZXNvbHV0aW9uX2xvYywgc2NlbmUuZW5naW5lLndpZHRoLCAgc2NlbmUuZW5naW5lLmhlaWdodCk7XHJcbiAgICAgICAgPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3RyYW5zbGF0ZV9sb2MgICAgJiYgZ2wudW5pZm9ybTNmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV90cmFuc2xhdGVfbG9jLCAgdGhpcy50cmFuc2xhdGVbMF0sICB0aGlzLnRyYW5zbGF0ZVsxXSwgIHRoaXMudHJhbnNsYXRlWzJdKTtcclxuICAgICAgICA8V2ViR0xVbmlmb3JtTG9jYXRpb24+c2hhZGVyLnVfc2NhbGVfbG9jICAgICAgICAmJiBnbC51bmlmb3JtM2YoPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3NjYWxlX2xvYywgICAgICB0aGlzLnNjYWxlWzBdLCAgICAgIHRoaXMuc2NhbGVbMV0sICAgICAgdGhpcy5zY2FsZVsyXSk7XHJcbiAgICAgICAgPFdlYkdMVW5pZm9ybUxvY2F0aW9uPnNoYWRlci51X3JvdGF0ZV9sb2MgICAgICAgJiYgZ2wudW5pZm9ybTNmKDxXZWJHTFVuaWZvcm1Mb2NhdGlvbj5zaGFkZXIudV9yb3RhdGVfbG9jLCAgICAgdGhpcy5yb3RhdGVbMF0sICAgICB0aGlzLnJvdGF0ZVsxXSwgICAgIHRoaXMucm90YXRlWzJdKTtcclxuXHJcbiAgICAgICAgaWYgKDxudW1iZXI+c2hhZGVyLmFfcG9zaXRpb25fbG9jID49IDApIHtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIDxXZWJHTEJ1ZmZlcj50aGlzLmRhdGFCdWZmZXJDZmcudmVydGV4X2J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoPG51bWJlcj5zaGFkZXIuYV9wb3NpdGlvbl9sb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgKiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKDxudW1iZXI+c2hhZGVyLmFfdXYgPj0gMCkge1xyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgPFdlYkdMQnVmZmVyPnRoaXMuZGF0YUJ1ZmZlckNmZy51dl9idWZmZXIpO1xyXG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDxudW1iZXI+c2hhZGVyLmFfdXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgKiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKDxXZWJHTEJ1ZmZlcj50aGlzLmRhdGFCdWZmZXJDZmcuZmFjZV9idWZmZXIpIHtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgPFdlYkdMQnVmZmVyPnRoaXMuZGF0YUJ1ZmZlckNmZy5mYWNlX2J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5VTlNJR05FRF9TSE9SVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2wuZmx1c2goKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjZW5lIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBzbmFtZTogIHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBlbmdpbmU6IFdlYkdMSW5zdGFuY2U7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmlld3BvcnQ6ICAgbnVtYmVyW10gPSBbMCwgMCwgMCwgMF07XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWVzaE1hcDogICAgTWFwPHN0cmluZywgTWVzaD4gPSBuZXcgTWFwKCk7XHJcbiAgICBjb25zdHJ1Y3RvcihzbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLnNuYW1lICA9IHNuYW1lO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gZW5naW5lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZE1lc2gobWVzaDogTWVzaCkge1xyXG4gICAgICAgIHRoaXMubWVzaE1hcC5zZXQobWVzaC5pZCwgbWVzaCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVuZGVyKGlzQ2xlYXI6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBnbCA9IDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5lbmdpbmUuZ2w7XHJcblxyXG4gICAgICAgIGdsLnZpZXdwb3J0KHRoaXMudmlld3BvcnRbMF0sIHRoaXMudmlld3BvcnRbMV0sIHRoaXMudmlld3BvcnRbMl0sIHRoaXMudmlld3BvcnRbM10pO1xyXG4gICAgICAgIGlmIChpc0NsZWFyKSB7XHJcbiAgICAgICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcclxuICAgICAgICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEsIGdsLk9ORSwgZ2wuT05FKTtcclxuICAgICAgICB0aGlzLm1lc2hNYXAuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBtZXNoLnJlbmRlcih0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHR1cmVJbnN0YW5jZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRDYWxsID0gKHBhdGg6IHN0cmluZywgZW5naW5lOiBXZWJHTEluc3RhbmNlLCBjYjogKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHZvaWQpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgLy8gaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIGNiKGltZywgcGF0aCwgZW5naW5lKTtcclxuICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgLy8gaW1nLnNyYyA9IHBhdGg7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZGVkID0gKGltZzogSW1hZ2VEYXRhLCBmbmFtZTogc3RyaW5nLCBlbmdpbmU6IFdlYkdMSW5zdGFuY2UpID0+IHtcclxuICAgICAgICBjb25zdCB0ZXhJbnMgPSA8VGV4dHVyZUluc3RhbmNlPmVuZ2luZS5nZXRUZXh0dXJlKGZuYW1lKTtcclxuICAgICAgICBpZiAodGV4SW5zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IEdMID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5lbmdpbmUuZ2w7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleCAgID0gPFdlYkdMVGV4dHVyZT5HTC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIEdMLnBpeGVsU3RvcmVpKEdMLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG4gICAgICAgICAgICBHTC5iaW5kVGV4dHVyZShHTC5URVhUVVJFXzJELCB0ZXgpO1xyXG4gICAgICAgICAgICBHTC50ZXhJbWFnZTJEKEdMLlRFWFRVUkVfMkQsIDAsIEdMLlJHQkEsIEdMLlJHQkEsIEdMLlVOU0lHTkVEX0JZVEUsIGltZyk7XHJcbiAgICAgICAgICAgIEdMLnRleFBhcmFtZXRlcmkoR0wuVEVYVFVSRV8yRCwgR0wuVEVYVFVSRV9NQUdfRklMVEVSLCBHTC5MSU5FQVIpO1xyXG4gICAgICAgICAgICBHTC50ZXhQYXJhbWV0ZXJpKEdMLlRFWFRVUkVfMkQsIEdMLlRFWFRVUkVfTUlOX0ZJTFRFUiwgR0wuTkVBUkVTVF9NSVBNQVBfTElORUFSKTtcclxuICAgICAgICAgICAgR0wuZ2VuZXJhdGVNaXBtYXAoR0wuVEVYVFVSRV8yRCk7XHJcbiAgICAgICAgICAgIEdMLmJpbmRUZXh0dXJlKEdMLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgICAgICB0ZXhJbnMuX3RleCA9IHRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWRvbmx5IGZuYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF90ZXg6IFdlYkdMVGV4dHVyZSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9lbmdpbmU6IFdlYkdMSW5zdGFuY2U7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGVuZ2luZTogV2ViR0xJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuZm5hbWUgICAgICA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fZW5naW5lICAgID0gZW5naW5lO1xyXG4gICAgICAgIHRoaXMuX3RleCAgICAgICA9IG51bGw7XHJcblxyXG4gICAgICAgIGVuZ2luZS5hZGRUZXh0dXJlKHRoaXMpO1xyXG4gICAgICAgIFRleHR1cmVJbnN0YW5jZS5sb2FkQ2FsbChuYW1lLCBlbmdpbmUsIFRleHR1cmVJbnN0YW5jZS5sb2FkZWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdGl2ZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IEdMICAgID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLl9lbmdpbmUuZ2w7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90ZXgpIHtcclxuICAgICAgICAgICAgR0wuYWN0aXZlVGV4dHVyZShHTC5URVhUVVJFMCk7XHJcbiAgICAgICAgICAgIEdMLmJpbmRUZXh0dXJlKEdMLlRFWFRVUkVfMkQsIHRoaXMuX3RleCk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLl9lbmdpbmUuZGVsVGV4dHVyZSh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdlYkdMSW5zdGFuY2Uge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuaWZvcm1zXzFmOiBzdHJpbmdbXSAgICA9IFsndV90aW1lJ107XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHVuaWZvcm1zXzJmdjogc3RyaW5nW10gICA9IFsndV9tb3VzZSddO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB1bmlmb3Jtc18yZjogc3RyaW5nW10gICAgPSBbJ3VfcmVzb2x1dGlvbiddO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb250ZW50TW9kZXMgPSBbXCJ3ZWJnbDJcIiwgXCJ3ZWJnbFwiLCBcImV4cGVyaW1lbnRhbC13ZWJnbFwiLCBcIndlYmtpdC0zZFwiLCBcIm1vei13ZWJnbFwiXTtcclxuICAgIHB1YmxpYyByZWFkb25seSB1X21vdXNlOiBudW1iZXJbXSAgICAgICAgPSBbMCwgMF07XHJcbiAgICBwdWJsaWMgdGltZXN0YW1wOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBzY2VuZU1hcDogTWFwPHN0cmluZywgU2NlbmU+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSB0ZXh0dXJlTWFwOiBNYXA8c3RyaW5nLCBUZXh0dXJlSW5zdGFuY2U+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSBfaXNEZXN0cm95OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZ2V0IGlzRGVzdHJveSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNEZXN0cm95O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0OiBXZWJHTEluc3RhbmNlT3B0KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBvcHQuY2FudmFzO1xyXG4gICAgICAgIHRoaXMud2lkdGggID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5nbCAgICAgPSBXZWJHTEluc3RhbmNlLmN0eEluaXRGdW5jKHRoaXMuY2FudmFzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGN0eEluaXRGdW5jKGNhbnZhczogT2Zmc2NyZWVuQ2FudmFzKTogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBudWxsID0gbnVsbDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgV2ViR0xJbnN0YW5jZS5jb250ZW50TW9kZXMubGVuZ3RoOyArK2lpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD5jYW52YXMuZ2V0Q29udGV4dCg8T2Zmc2NyZWVuUmVuZGVyaW5nQ29udGV4dElkPldlYkdMSW5zdGFuY2UuY29udGVudE1vZGVzW2lpXSwge2FscGhhIDogdHJ1ZSwgYW50aWFsaWFzIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGVyZSBpcyBub3Qgd2ViZ2wgY29tcGF0aWJsZSA6KCBgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBnbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVUZXh0dXJlKGZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGV4OiBUZXh0dXJlSW5zdGFuY2UgPSA8VGV4dHVyZUluc3RhbmNlPnRoaXMudGV4dHVyZU1hcC5nZXQoZm5hbWUpO1xyXG5cclxuICAgICAgICBpZiAodGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGV4ID0gbmV3IFRleHR1cmVJbnN0YW5jZShmbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGV4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFRleHR1cmUodGV4OiBUZXh0dXJlSW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLnRleHR1cmVNYXAuc2V0KHRleC5mbmFtZSwgdGV4KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0dXJlKGZuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlTWFwLmdldChmbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsVGV4dHVyZSh0ZXg6IFRleHR1cmVJbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMudGV4dHVyZU1hcC5kZWxldGUodGV4LmZuYW1lKTtcclxuICAgICAgICAoPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmdsKS5kZWxldGVUZXh0dXJlKHRleCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkU2NlbmUoY2ZnOiBTY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmVNYXAuc2V0KGNmZy5zbmFtZSwgY2ZnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhckNvbG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGdsID0gKDxXZWJHTFJlbmRlcmluZ0NvbnRleHQ+dGhpcy5nbCk7XHJcbiAgICAgICAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMC4wKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb29wID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyTG9vcCh0aW1lc3RhbXApO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMubG9vcCwgMjApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlckxvb3AodGltZXN0YW1wOiBudW1iZXIpIHt9XHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9pc0Rlc3Ryb3kgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZU1hcC5mb3JFYWNoKCh0ZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZWxUZXh0dXJlKHRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
