/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/logic_webgl/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/logic_webgl/index.ts":
/*!**********************************!*\
  !*** ./src/logic_webgl/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst webgl_1 = __webpack_require__(/*! ./webgl */ \"./src/logic_webgl/webgl.ts\");\r\nconst shader_multi_line_diff_speed_1 = __webpack_require__(/*! ./shader_multi_line_diff_speed */ \"./src/logic_webgl/shader_multi_line_diff_speed.ts\");\r\nconst shader_sin_cos_1 = __webpack_require__(/*! ./shader_sin_cos */ \"./src/logic_webgl/shader_sin_cos.ts\");\r\nconst shader_multi_line_cross_1 = __webpack_require__(/*! ./shader_multi_line_cross */ \"./src/logic_webgl/shader_multi_line_cross.ts\");\r\nconst shader_polygon_1 = __webpack_require__(/*! ./shader_polygon */ \"./src/logic_webgl/shader_polygon.ts\");\r\nconst shader_texture_1 = __webpack_require__(/*! ./shader_texture */ \"./src/logic_webgl/shader_texture.ts\");\r\nconst shader_progress_1 = __webpack_require__(/*! ./shader_progress */ \"./src/logic_webgl/shader_progress.ts\");\r\nconst shader_texture_grass_1 = __webpack_require__(/*! ./shader_texture_grass */ \"./src/logic_webgl/shader_texture_grass.ts\");\r\n// declare function postMessage(message: any): void;\r\n/**\r\n *\r\n */\r\nlet webgldemo;\r\nself.onmessage = (ev) => {\r\n    let data = ev.data;\r\n    switch (data.CMD) {\r\n        case ('INIT'): {\r\n            exports.main(data.canvas);\r\n            break;\r\n        }\r\n        case ('MOVE'): {\r\n            updateMouse(data.x, data.y);\r\n            break;\r\n        }\r\n        case ('IMAGE'): {\r\n            if (webgldemo && !webgldemo.isDestroy) {\r\n                const imageData = new ImageData(data.image, data.width, data.height);\r\n                webgl_1.TextureInstance.loaded(imageData, data.fname, webgldemo);\r\n            }\r\n            break;\r\n        }\r\n        default: {\r\n            console.warn(`no such CMD: `, data.CMD);\r\n        }\r\n    }\r\n};\r\nconst createTextureLoad = (fname, engine, cb) => {\r\n    self.postMessage({\r\n        CMD: 'IMAGE',\r\n        fname: fname\r\n    });\r\n};\r\nexports.main = (canvas) => {\r\n    const opt = {};\r\n    opt.canvas = canvas;\r\n    webgldemo = new webgl_1.WebGLInstance(opt);\r\n    webgl_1.TextureInstance.loadCall = createTextureLoad;\r\n    const shader01 = new webgl_1.ShaderCfg('01', shader_multi_line_diff_speed_1.vs_multi_line_diff_speed, shader_multi_line_diff_speed_1.fs_multi_line_diff_speed);\r\n    const shader02 = new webgl_1.ShaderCfg('02', shader_sin_cos_1.vs_sin_cos, shader_sin_cos_1.fs_sin_cos);\r\n    const shader03 = new webgl_1.ShaderCfg('03', shader_multi_line_cross_1.vs_multi_line_cross, shader_multi_line_cross_1.fs_multi_line_cross);\r\n    const shader04 = new webgl_1.ShaderCfg('04', shader_polygon_1.vs_polygon, shader_polygon_1.fs_polygon);\r\n    const shader05 = new webgl_1.ShaderCfg('05', shader_texture_1.vs_texture, shader_texture_1.fs_texture);\r\n    const shader06 = new webgl_1.ShaderCfg('06', shader_progress_1.vs_progress, shader_progress_1.fs_progress);\r\n    const shader07 = new webgl_1.ShaderCfg('07', shader_texture_grass_1.vs_texture_grass, shader_texture_grass_1.fs_texture_grass);\r\n    const scene01 = new webgl_1.Scene('02', webgldemo);\r\n    const scene02 = new webgl_1.Scene('02', webgldemo);\r\n    const scene03 = new webgl_1.Scene('03', webgldemo);\r\n    const scene04 = new webgl_1.Scene('04', webgldemo);\r\n    const scene05 = new webgl_1.Scene('05', webgldemo);\r\n    const scene06 = new webgl_1.Scene('06', webgldemo);\r\n    const dataBuffer02 = new webgl_1.DataBufferCfg('01');\r\n    // dataBuffer02.addVertex(-1 + 0.5, -1, 0);\r\n    // dataBuffer02.addUV(0, 0);\r\n    // dataBuffer02.addVertex(-1 + 0.5, -0.5, 0);\r\n    // dataBuffer02.addUV(0, 0.25);\r\n    // dataBuffer02.addVertex(-1 + 0.5 , 0.0, 0);\r\n    // dataBuffer02.addUV(0, 0.5);\r\n    // dataBuffer02.addVertex(-1 + 0.5 , 0.5, 0);\r\n    // dataBuffer02.addUV(0, 0.75);\r\n    // dataBuffer02.addVertex(-1 + 0.5 , 1, 0);\r\n    // dataBuffer02.addUV(0, 1.0);\r\n    // dataBuffer02.addVertex(0 + 0.5, -1, 0);\r\n    // dataBuffer02.addUV(1, 0);\r\n    // dataBuffer02.addVertex(0 + 0.5, -0.5, 0);\r\n    // dataBuffer02.addUV(1, 0.25);\r\n    // dataBuffer02.addVertex(0 , 0.0, 0);\r\n    // dataBuffer02.addUV(1, 0.5);\r\n    // dataBuffer02.addVertex(0 + 0.5, 0.5, 0);\r\n    // dataBuffer02.addUV(1, .75);\r\n    // dataBuffer02.addVertex(0 + 0.5, 1, 0);\r\n    // dataBuffer02.addUV(1, 1);\r\n    // dataBuffer02.addFace(0, 5, 6);\r\n    // dataBuffer02.addFace(0, 6, 1);\r\n    // dataBuffer02.addFace(1, 6, 7);\r\n    // dataBuffer02.addFace(1, 7, 2);\r\n    // dataBuffer02.addFace(2, 7, 8);\r\n    // dataBuffer02.addFace(2, 8, 3);\r\n    // dataBuffer02.addFace(3, 8, 9);\r\n    // dataBuffer02.addFace(3, 9, 4);\r\n    const count = 20;\r\n    for (let i = 0; i < count; i++) {\r\n        dataBuffer02.addVertex(-0.5, -1 + (2 * i / (count - 1)), 0);\r\n        dataBuffer02.addUV(0, i / (count - 1));\r\n    }\r\n    for (let i = 0; i < count; i++) {\r\n        dataBuffer02.addVertex(0.5, -1 + (2 * i / (count - 1)), 0);\r\n        dataBuffer02.addUV(1, i / (count - 1));\r\n    }\r\n    for (let i = 0; i < count - 1; i++) {\r\n        dataBuffer02.addFace(i, count + i, count + i + 1);\r\n        dataBuffer02.addFace(i, count + i + 1, i + 1);\r\n    }\r\n    dataBuffer02.update(webgldemo.gl);\r\n    const meshicon = new webgl_1.Mesh('meshicon', dataBuffer02, shader07);\r\n    meshicon.translate[0] = 0.0;\r\n    meshicon.translate[1] = -0.2;\r\n    meshicon.scale[0] = 0.1;\r\n    meshicon.scale[1] = 1.0;\r\n    meshicon.texture = webgldemo.createTexture('/resources/grass.jpg');\r\n    meshicon.maskTexture = webgldemo.createTexture('/resources/grass_mark.jpg', 1);\r\n    scene05.addMesh(meshicon);\r\n    scene05.viewport[0] = 0;\r\n    scene05.viewport[1] = 0;\r\n    scene05.viewport[2] = webgldemo.width;\r\n    scene05.viewport[3] = webgldemo.height;\r\n    webgldemo.renderLoop = (timestamp) => {\r\n        webgldemo.clearColor();\r\n        scene05.render(false);\r\n    };\r\n    webgldemo.loop(0);\r\n};\r\nconst updateMouse = (x, y) => {\r\n    webgldemo.u_mouse[0] = x;\r\n    webgldemo.u_mouse[1] = y;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/index.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_multi_line_cross.ts":
/*!****************************************************!*\
  !*** ./src/logic_webgl/shader_multi_line_cross.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_multi_line_cross = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\n\r\nvoid main( void ){\r\n    gl_Position = vec4( position, 0., 1. );\r\n    surfacePosition      = position;\r\n}\r\n`;\r\nexports.fs_multi_line_cross = `\r\n// Author @patriciogv - 2015\r\n// Title: Truchet - 10 print\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nuniform vec2 u_resolution;\r\nuniform float u_time;\r\nuniform vec3 u_translate;\r\nuniform vec3 u_scale;\r\nuniform vec3 u_rotate;\r\n\r\nvec2 brickTile(vec2 _st, float _zoom){\r\n    _st *= _zoom;\r\n\r\n    // Here is where the offset is happening\r\n    // _st.x += step(1., mod(_st.y,2.0)) * 0.5;\r\n\r\n    return fract(_st);\r\n}\r\n\r\nfloat box(vec2 _st, vec2 _size){\r\n    _size = vec2(0.5)-_size*0.5;\r\n    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);\r\n    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);\r\n    return uv.x*uv.y;\r\n}\r\nfloat circle(vec2 xy, vec2 center, float radius, float smooth_edge) {\r\n    float dist = distance(xy,center);\r\n    dist = smoothstep(radius, radius + smooth_edge, dist);\r\n    return dist;\r\n}\r\n\r\nvoid main(void){\r\n    float count = 20.0;\r\n    vec2 st = gl_FragCoord.xy/u_resolution.xy;\r\n    st -= u_translate.xy;\r\n    st *= 1.0/u_scale.xy;\r\n\r\n    float sin_t = sin(u_time * 3.14 / 10.0);\r\n    float cos_t = cos(u_time * 3.14 / 10.0);\r\n    float col_flag= mod(st.y * count, 2.0) < 1.0 ? 1.0 : -1.0;\r\n    float row_flag= mod(st.x * count, 2.0) < 1.0 ? 1.0 : -1.0;\r\n    st += vec2(\r\n        col_flag * ( sin_t * cos_t < 0.0 ? cos_t : 0.0 ) * 0.5,\r\n        row_flag * ( sin_t * cos_t > 0.0 ? sin_t : 0.0 ) * 0.5);\r\n    vec3 color = vec3(0.0);\r\n\r\n    // Modern metric brick of 215mm x 102.5mm x 65mm\r\n    // http://www.jaharrison.me.uk/Brickwork/Sizes.html\r\n    // st /= vec2(2.15,0.65)/1.5;\r\n\r\n    // Apply the brick tiling\r\n    st = brickTile(st,count);\r\n\r\n    color = vec3(circle(st,vec2(0.5,0.5),0.4, 0.05));\r\n\r\n    // Uncomment to see the space coordinates\r\n    // color = vec3(st,0.0);\r\n\r\n    gl_FragColor = vec4(color,1.0);\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_multi_line_cross.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_multi_line_diff_speed.ts":
/*!*********************************************************!*\
  !*** ./src/logic_webgl/shader_multi_line_diff_speed.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_multi_line_diff_speed = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\n\r\nvoid main( void ){\r\n    gl_Position = vec4( position, 0., 1. );\r\n    surfacePosition      = position;\r\n}\r\n`;\r\nexports.fs_multi_line_diff_speed = `\r\n// Author @patriciogv - 2015\r\n// Title: Truchet - 10 print\r\n\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\n#define PI 3.14159265358979323846\r\n\r\nuniform vec2 u_resolution;\r\nuniform vec2 u_mouse;\r\nuniform float u_time;\r\nuniform vec3 u_translate;\r\nuniform vec3 u_scale;\r\nuniform vec3 u_rotate;\r\n\r\nfloat random (in vec2 _st) {\r\n    return fract(sin(dot(_st.xy,\r\n                         vec2(12.9898,78.233)))*\r\n        43758.5453123);\r\n}\r\n\r\nvec2 truchetPattern(in vec2 _st, in float _index){\r\n    _index = fract(((_index-0.5)*2.0));\r\n    if (_index > 0.75) {\r\n        _st = vec2(1.0) - _st;\r\n    } else if (_index > 0.5) {\r\n        _st = vec2(1.0-_st.x,_st.y);\r\n    } else if (_index > 0.25) {\r\n        _st = 1.0-vec2(1.0-_st.x,_st.y);\r\n    }\r\n    return _st;\r\n}\r\nfloat circle(vec2 xy, vec2 center, float radius, float smooth_edge) {\r\n    float dist = distance(xy,center);\r\n    dist = smoothstep(radius, radius + smooth_edge, dist);\r\n    return dist;\r\n}\r\n\r\nvoid main() {\r\n    float count = 20.0;\r\n    vec2 st = gl_FragCoord.xy/u_resolution.xy;\r\n    st -= u_translate.xy;\r\n    st *= 1.0/u_scale.xy;\r\n    st *= count;\r\n\tst.x -= u_time * 2.0 *  random(vec2(floor(st).y,1.0));\r\n\r\n    vec2 ipos = floor(st);  // integer\r\n    vec2 fpos = fract(st);  // fraction\r\n\r\n    float speed = random(vec2(ipos.y));\r\n\r\n    float x_f = random(vec2(ipos.x, 0));\r\n    float y_f = random(vec2(0, ipos.y));\r\n\r\n    float color = 0.0;\r\n    color = random(vec2(x_f, y_f));\r\n\tcolor =\r\n    \t1.0 - (1.0 - circle(fract(st), vec2(0.5), 0.25, 0.1)) * color\r\n    \t;\r\n    vec4 f_color = vec4(vec3(color),1.0);\r\n    f_color.r = color < 1.0 ? 0.0 : 1.0;\r\n    f_color.g = color < 1.0 ? 0.0 : 1.0;\r\n    f_color.b = color < 1.0 ? color : 1.0;\r\n    f_color.a = color < 1.0 ? color : 0.0;\r\n\r\n    gl_FragColor = f_color;\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_multi_line_diff_speed.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_polygon.ts":
/*!*******************************************!*\
  !*** ./src/logic_webgl/shader_polygon.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_polygon = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\n\r\nvoid main( void ){\r\n    gl_Position = vec4( position, 0., 1. );\r\n    surfacePosition      = position;\r\n}\r\n`;\r\nexports.fs_polygon = `\r\n// Author @patriciogv - 2015\r\n// Title: Truchet - 10 print\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\n#define PI 3.14159265358979323846\r\n#define TWO_PI 6.2448530717958647692\r\n\r\nuniform vec2 u_resolution;\r\nuniform vec2 u_mouse;\r\nuniform float u_time;\r\nuniform vec3 u_translate;\r\nuniform vec3 u_scale;\r\nuniform vec3 u_rotate;\r\n\r\nmat2 rotate2d(float _angle){\r\n    return mat2(cos(_angle),-sin(_angle),\r\n                sin(_angle),cos(_angle));\r\n}\r\n\r\nfloat shape(vec2 st, float N){\r\n    st = st*2.-1.;\r\n    float a = atan(st.x,st.y)+PI;\r\n    float r = TWO_PI/N;\r\n    return abs(cos(floor(.5+a/r)*r-a)*length(st));\r\n}\r\n\r\nvoid main(){\r\n    vec2 st = gl_FragCoord.xy/u_resolution.xy;\r\n    st -= u_translate.xy;\r\n    st *= 1.0/u_scale.xy;\r\n\r\n    // move space from the center to the vec2(0.0)\r\n    st -= vec2(0.5);\r\n    // rotate the space\r\n    st = rotate2d( u_rotate.z ) * st;\r\n    // move it back to the original place\r\n    st += vec2(0.5);\r\n\r\n    vec3 color = vec3(0.0);\r\n\r\n    color = vec3( smoothstep(.5, .5 + .005, shape(st,6.0)) );\r\n\r\n    gl_FragColor = vec4(color, 1.0);\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_polygon.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_progress.ts":
/*!********************************************!*\
  !*** ./src/logic_webgl/shader_progress.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_progress = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nattribute   vec2    position;\r\n\r\nvoid main( void ){\r\n    gl_Position = vec4( position, 0., 1. );\r\n}\r\n`;\r\nexports.fs_progress = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nuniform  float u_float;\r\nuniform  vec2 u_resolution;\r\n\r\nvoid main(void){\r\n    vec2 st = gl_FragCoord.xy / u_resolution.xy;\r\n    vec3 color = st.x < u_float ? vec3(0.0, 0.8, 0.0) : vec3(0.2, 0.2, 0.2);\r\n    // 20 对应js层进度条高度\r\n    color = st.y > (20.0 / u_resolution.y / 2.0) ? vec3(0.0) : color;\r\n\r\n    float alpha = st.y > (20.0 / u_resolution.y / 2.0) ? 0.0 : 0.8;\r\n    alpha = st.x < u_float ? alpha : 0.8;\r\n\r\n    gl_FragColor = vec4( color, alpha );\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_progress.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_sin_cos.ts":
/*!*******************************************!*\
  !*** ./src/logic_webgl/shader_sin_cos.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_sin_cos = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\n\r\nvoid main( void ){\r\n    gl_Position = vec4( position, 0., 1. );\r\n    surfacePosition      = position;\r\n}\r\n`;\r\nexports.fs_sin_cos = `\r\n// Author @patriciogv - 2015\r\n// Title: Truchet - 10 print\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nuniform vec2 u_resolution;\r\nuniform vec2 u_mouse;\r\nuniform float u_time;\r\nuniform vec3 u_translate;\r\nuniform vec3 u_scale;\r\nuniform vec3 u_rotate;\r\n\r\nvoid main(){\r\n    vec2 st = gl_FragCoord.xy/u_resolution.xy;\r\n    st -= u_translate.xy;\r\n    st *= 1.0/u_scale.xy;\r\n    vec3 color = vec3(0.0);\r\n\r\n    vec2 pos = vec2(0.5)-st;\r\n\r\n    float r = distance(pos, vec2(0.0,0.0))*2.0;\r\n    float a = atan(pos.y,pos.x);\r\n    float xxx = floor(u_time / 10.0) * 10.0 - u_time ;\r\n    float yyy = floor(u_time / 20.0) * 20.0 - u_time ;\r\n    float f = cos(a*0.5);\r\n    // f = abs(cos(a*3.));\r\n    // f = abs(cos(a*2.5))*.5+.3;\r\n    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;\r\n    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;\r\n    f = abs( cos(a*xxx) * sin(a*yyy) ) *.9 + .2;\r\n\r\n    color = vec3( 1.-smoothstep(f,f+0.005,r) );\r\n\r\n    gl_FragColor = vec4(color, 1.0);\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_sin_cos.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_texture.ts":
/*!*******************************************!*\
  !*** ./src/logic_webgl/shader_texture.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_texture = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\nattribute   vec2    a_uv;\r\nvarying     vec2    vUV;\r\nuniform     vec3    u_translate;\r\nuniform     vec3    u_scale;\r\nuniform     vec3    u_rotate;\r\n\r\nvoid main( void ){\r\n    vec2 pos        = position.xy;\r\n    pos += vec2(0.5);\r\n    pos *= u_scale.xy;\r\n    pos -= vec2(0.5);\r\n\r\n    pos += u_translate.xy;\r\n\r\n    gl_Position     = vec4( pos, 0., 1. );\r\n    surfacePosition      = position;\r\n    vUV = a_uv;\r\n}\r\n`;\r\nexports.fs_texture = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nvarying  vec2 vUV;\r\nuniform  sampler2D u_sampler;\r\n\r\nvoid main(void){\r\n    // [ 0, 0, 0, 1 ]  rgba颜色向量\r\n    // gl_FragColor = vec4( vColor, 1. );\r\n    gl_FragColor = texture2D( u_sampler, vUV );\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_texture.ts?");

/***/ }),

/***/ "./src/logic_webgl/shader_texture_grass.ts":
/*!*************************************************!*\
  !*** ./src/logic_webgl/shader_texture_grass.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.vs_texture_grass = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\nattribute   vec2    position;\r\nvarying     vec2    surfacePosition;\r\nattribute   vec2    a_uv;\r\nvarying     vec2    vUV;\r\nuniform     vec3    u_translate;\r\nuniform     vec3    u_scale;\r\nuniform     vec3    u_rotate;\r\nuniform     float   u_time;\r\n\r\nvoid main( void ){\r\n    vec2 pos        = position.xy;\r\n    pos += vec2(0.5);\r\n    pos *= u_scale.xy;\r\n    pos -= vec2(0.5);\r\n\r\n    pos += u_translate.xy;\r\n    // pos.x = pos.x + sin(a_uv.y) ;\r\n\r\n    gl_Position     = vec4( pos, 0., 1. );\r\n    surfacePosition      = position;\r\n    vUV = a_uv;\r\n}\r\n`;\r\nexports.fs_texture_grass = `\r\n#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nvarying  vec2 vUV;\r\nuniform  sampler2D u_sampler;\r\nuniform  sampler2D u_sampler1;\r\n\r\nvoid main(void){\r\n    // [ 0, 0, 0, 1 ]  rgba颜色向量\r\n    // gl_FragColor = vec4( vColor, 1. );\r\n\r\n    vec4 ctx_color  = texture2D( u_sampler, vUV );\r\n\r\n    vec4 mask_color = texture2D( u_sampler1, vUV );\r\n    float alpha     = (mask_color.r + mask_color.g + mask_color.b) > 1.0 ? 1.0 : 0.0;\r\n\r\n    gl_FragColor    = vec4(ctx_color.rgb, alpha);\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/shader_texture_grass.ts?");

/***/ }),

/***/ "./src/logic_webgl/webgl.ts":
/*!**********************************!*\
  !*** ./src/logic_webgl/webgl.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * WEBGL 基本处理\r\n */\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass ShaderCfg {\r\n    constructor(sname, vs, fs) {\r\n        this.texActive = false;\r\n        this.sname = sname;\r\n        this.fs = fs;\r\n        this.vs = vs;\r\n    }\r\n    getPrograme(gl) {\r\n        const shader_fragment = this.getFSShader(gl);\r\n        const shader_vertex = this.getVSShader(gl);\r\n        if (this.shader_program === undefined && gl.getShaderParameter(shader_fragment, gl.COMPILE_STATUS)) {\r\n            const shader_program = gl.createProgram();\r\n            this.shader_program = shader_program;\r\n            gl.attachShader(this.shader_program, shader_vertex);\r\n            gl.attachShader(this.shader_program, shader_fragment);\r\n            gl.linkProgram(this.shader_program);\r\n        }\r\n        this.u_mouse_loc = gl.getUniformLocation(this.shader_program, `u_mouse`);\r\n        this.u_time_loc = gl.getUniformLocation(this.shader_program, `u_time`);\r\n        this.u_resolution_loc = gl.getUniformLocation(this.shader_program, `u_resolution`);\r\n        this.u_translate_loc = gl.getUniformLocation(this.shader_program, `u_translate`);\r\n        this.u_scale_loc = gl.getUniformLocation(this.shader_program, `u_scale`);\r\n        this.u_rotate_loc = gl.getUniformLocation(this.shader_program, `u_rotate`);\r\n        this.u_float_loc = gl.getUniformLocation(this.shader_program, `u_float`);\r\n        this.a_position_loc = gl.getAttribLocation(this.shader_program, 'position');\r\n        this.a_uv = gl.getAttribLocation(this.shader_program, 'a_uv');\r\n        this.u_texture = gl.getUniformLocation(this.shader_program, 'u_sampler');\r\n        this.u_texture1 = gl.getUniformLocation(this.shader_program, 'u_sampler1');\r\n        gl.enableVertexAttribArray(this.a_position_loc);\r\n        gl.enableVertexAttribArray(this.a_uv);\r\n        gl.useProgram(this.shader_program);\r\n        if (this.texActive) {\r\n            this.u_texture && gl.uniform1i(this.u_texture, 0);\r\n            this.u_texture1 && gl.uniform1i(this.u_texture1, 1);\r\n        }\r\n    }\r\n    getVSShader(gl) {\r\n        if (gl === null) {\r\n            return this.vshader;\r\n        }\r\n        if (this.vshader) {\r\n            return this.vshader;\r\n        }\r\n        this.vshader = gl.createShader(gl.VERTEX_SHADER);\r\n        if (this.vshader === null) {\r\n            return this.vshader;\r\n        }\r\n        if (this.vs === undefined) {\r\n            return this.vshader;\r\n        }\r\n        gl.shaderSource(this.vshader, this.vs);\r\n        gl.compileShader(this.vshader);\r\n        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {\r\n            console.error(`ERROR IN 'VERTEX_SHADER' SHADER: ${gl.getShaderInfoLog(this.vshader)}`);\r\n            return this.vshader;\r\n        }\r\n        return this.vshader;\r\n    }\r\n    getFSShader(gl) {\r\n        if (gl === null) {\r\n            return this.fshader;\r\n        }\r\n        if (this.fshader) {\r\n            return this.fshader;\r\n        }\r\n        this.fshader = gl.createShader(gl.FRAGMENT_SHADER);\r\n        if (this.fshader === null) {\r\n            return this.fshader;\r\n        }\r\n        if (this.fs === undefined) {\r\n            return this.fshader;\r\n        }\r\n        gl.shaderSource(this.fshader, this.fs);\r\n        gl.compileShader(this.fshader);\r\n        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {\r\n            console.error(`ERROR IN 'FRAGMENT_SHADER' SHADER: ${gl.getShaderInfoLog(this.fshader)}`);\r\n            return this.fshader;\r\n        }\r\n        return this.fshader;\r\n    }\r\n}\r\nexports.ShaderCfg = ShaderCfg;\r\nclass DataBufferCfg {\r\n    constructor(vname) {\r\n        this.vertex_data = [];\r\n        this.face_data = [];\r\n        this.uv_data = [];\r\n        this.vname = vname;\r\n    }\r\n    addVertex(x, y, z) {\r\n        this.vertex_data.push(x, y);\r\n    }\r\n    addFace(a, b, c) {\r\n        this.face_data.push(a, b, c);\r\n    }\r\n    addUV(u, v) {\r\n        this.uv_data.push(u, v);\r\n    }\r\n    update(gl) {\r\n        this.activeVertex(gl);\r\n        this.activeUV(gl);\r\n        this.activeFace(gl);\r\n    }\r\n    activeVertex(gl) {\r\n        if (!this.vertex_buffer) {\r\n            this.vertex_buffer = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);\r\n            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_data), gl.STATIC_DRAW);\r\n        }\r\n    }\r\n    activeFace(gl) {\r\n        if (!this.face_buffer) {\r\n            this.face_buffer = gl.createBuffer();\r\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.face_buffer);\r\n            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.face_data), gl.STATIC_DRAW);\r\n        }\r\n    }\r\n    activeUV(gl) {\r\n        if (!this.uv_buffer) {\r\n            this.uv_buffer = gl.createBuffer();\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.uv_buffer);\r\n            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv_data), gl.STATIC_DRAW);\r\n        }\r\n    }\r\n}\r\nexports.DataBufferCfg = DataBufferCfg;\r\nclass Mesh {\r\n    constructor(id, geo, material) {\r\n        this.translate = [0, 0, 0];\r\n        this.scale = [1, 1, 1];\r\n        this.rotate = [0, 0, 0];\r\n        this.ufloat = 0.0;\r\n        this.id = id;\r\n        this.dataBufferCfg = geo;\r\n        this.shaderCfg = material;\r\n        this.texture = null;\r\n        this.maskTexture = null;\r\n    }\r\n    render(scene) {\r\n        const gl = scene.engine.gl;\r\n        const shader = this.shaderCfg;\r\n        if (this.texture) {\r\n            this.shaderCfg.texActive = this.texture.active();\r\n            if (this.maskTexture) {\r\n                this.shaderCfg.texActive = this.maskTexture.active();\r\n            }\r\n            if (!this.shaderCfg.texActive) {\r\n                return;\r\n            }\r\n        }\r\n        shader.getPrograme(gl);\r\n        shader.u_mouse_loc && gl.uniform2fv(shader.u_mouse_loc, scene.engine.u_mouse);\r\n        shader.u_time_loc && gl.uniform1f(shader.u_time_loc, scene.engine.timestamp * 0.001);\r\n        shader.u_float_loc && gl.uniform1f(shader.u_float_loc, this.ufloat);\r\n        shader.u_resolution_loc && gl.uniform2f(shader.u_resolution_loc, scene.engine.width, scene.engine.height);\r\n        shader.u_translate_loc && gl.uniform3f(shader.u_translate_loc, this.translate[0], this.translate[1], this.translate[2]);\r\n        shader.u_scale_loc && gl.uniform3f(shader.u_scale_loc, this.scale[0], this.scale[1], this.scale[2]);\r\n        shader.u_rotate_loc && gl.uniform3f(shader.u_rotate_loc, this.rotate[0], this.rotate[1], this.rotate[2]);\r\n        if (shader.a_position_loc >= 0) {\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.vertex_buffer);\r\n            gl.vertexAttribPointer(shader.a_position_loc, 2, gl.FLOAT, false, 4 * 2, 0);\r\n        }\r\n        if (shader.a_uv >= 0) {\r\n            gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBufferCfg.uv_buffer);\r\n            gl.vertexAttribPointer(shader.a_uv, 2, gl.FLOAT, false, 4 * 2, 0);\r\n        }\r\n        if (this.dataBufferCfg.face_buffer) {\r\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.dataBufferCfg.face_buffer);\r\n            gl.drawElements(gl.TRIANGLES, this.dataBufferCfg.face_data.length, gl.UNSIGNED_SHORT, 0);\r\n        }\r\n        gl.flush();\r\n    }\r\n}\r\nexports.Mesh = Mesh;\r\nclass Scene {\r\n    constructor(sname, engine) {\r\n        this.viewport = [0, 0, 0, 0];\r\n        this.meshMap = new Map();\r\n        this.sname = sname;\r\n        this.engine = engine;\r\n    }\r\n    addMesh(mesh) {\r\n        this.meshMap.set(mesh.id, mesh);\r\n    }\r\n    render(isClear) {\r\n        const gl = this.engine.gl;\r\n        gl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);\r\n        if (isClear) {\r\n            gl.clear(gl.COLOR_BUFFER_BIT);\r\n        }\r\n        gl.enable(gl.BLEND);\r\n        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);\r\n        this.meshMap.forEach((mesh) => {\r\n            mesh.render(this);\r\n        });\r\n    }\r\n}\r\nexports.Scene = Scene;\r\nclass TextureInstance {\r\n    constructor(name, engine, index) {\r\n        this.fname = name;\r\n        this._engine = engine;\r\n        this._tex = null;\r\n        this._index = index || 0;\r\n        engine.addTexture(this);\r\n        TextureInstance.loadCall(name, engine, TextureInstance.loaded);\r\n    }\r\n    active() {\r\n        let result = false;\r\n        const GL = this._engine.gl;\r\n        if (this._tex) {\r\n            if (this._index === 0) {\r\n                GL.activeTexture(GL.TEXTURE0);\r\n            }\r\n            else if (this._index === 1) {\r\n                GL.activeTexture(GL.TEXTURE1);\r\n            }\r\n            GL.bindTexture(GL.TEXTURE_2D, this._tex);\r\n            result = true;\r\n        }\r\n        return result;\r\n    }\r\n    remove() {\r\n        this._engine.delTexture(this);\r\n    }\r\n}\r\nTextureInstance.loadCall = (path, engine, cb) => {\r\n    try {\r\n        // const img = new Image();\r\n        // img.onload = () => {\r\n        //     cb(img, path, engine);\r\n        // };\r\n        // img.src = path;\r\n    }\r\n    catch (e) {\r\n        console.error(e);\r\n    }\r\n};\r\nTextureInstance.loaded = (img, fname, engine) => {\r\n    const texIns = engine.getTexture(fname);\r\n    if (texIns) {\r\n        const GL = engine.gl;\r\n        const tex = GL.createTexture();\r\n        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);\r\n        GL.bindTexture(GL.TEXTURE_2D, tex);\r\n        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, img);\r\n        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);\r\n        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);\r\n        GL.generateMipmap(GL.TEXTURE_2D);\r\n        GL.bindTexture(GL.TEXTURE_2D, null);\r\n        texIns._tex = tex;\r\n    }\r\n};\r\nexports.TextureInstance = TextureInstance;\r\nclass WebGLInstance {\r\n    constructor(opt) {\r\n        this.u_mouse = [0, 0];\r\n        this.timestamp = 0;\r\n        this.sceneMap = new Map();\r\n        this.textureMap = new Map();\r\n        this._isDestroy = false;\r\n        this.loop = (timestamp) => {\r\n            this.timestamp = timestamp;\r\n            this.renderLoop(timestamp);\r\n            setTimeout(this.loop, 20);\r\n        };\r\n        this.canvas = opt.canvas;\r\n        this.width = this.canvas.width;\r\n        this.height = this.canvas.height;\r\n        this.gl = WebGLInstance.ctxInitFunc(this.canvas);\r\n    }\r\n    get isDestroy() {\r\n        return this._isDestroy;\r\n    }\r\n    static ctxInitFunc(canvas) {\r\n        let gl = null;\r\n        try {\r\n            for (var ii = 0; ii < WebGLInstance.contentModes.length; ++ii) {\r\n                try {\r\n                    gl = canvas.getContext(WebGLInstance.contentModes[ii], { alpha: true, antialias: true });\r\n                }\r\n                catch (e) {\r\n                    //\r\n                }\r\n                if (gl) {\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n        catch (error) {\r\n            console.warn(`There is not webgl compatible :( `);\r\n        }\r\n        return gl;\r\n    }\r\n    createTexture(fname, index) {\r\n        let tex = this.textureMap.get(fname);\r\n        if (tex === undefined) {\r\n            tex = new TextureInstance(fname, this, index);\r\n        }\r\n        return tex;\r\n    }\r\n    addTexture(tex) {\r\n        this.textureMap.set(tex.fname, tex);\r\n    }\r\n    getTexture(fname) {\r\n        return this.textureMap.get(fname);\r\n    }\r\n    delTexture(tex) {\r\n        this.textureMap.delete(tex.fname);\r\n        this.gl.deleteTexture(tex);\r\n    }\r\n    addScene(cfg) {\r\n        this.sceneMap.set(cfg.sname, cfg);\r\n    }\r\n    clearColor() {\r\n        const gl = this.gl;\r\n        gl.viewport(0, 0, this.width, this.height);\r\n        gl.clearColor(0.0, 0.0, 0.0, 0.0);\r\n    }\r\n    renderLoop(timestamp) { }\r\n    destroy() {\r\n        this._isDestroy = true;\r\n        this.textureMap.forEach((tex) => {\r\n            this.delTexture(tex);\r\n        });\r\n    }\r\n}\r\nWebGLInstance.uniforms_1f = ['u_time'];\r\nWebGLInstance.uniforms_2fv = ['u_mouse'];\r\nWebGLInstance.uniforms_2f = ['u_resolution'];\r\nWebGLInstance.contentModes = [\"webgl2\", \"webgl\", \"experimental-webgl\", \"webkit-3d\", \"moz-webgl\"];\r\nexports.WebGLInstance = WebGLInstance;\r\n\n\n//# sourceURL=webpack:///./src/logic_webgl/webgl.ts?");

/***/ })

/******/ });