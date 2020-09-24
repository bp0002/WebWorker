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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/fibonacci_lattice/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fibonacci_lattice/main.ts":
/*!***************************************!*\
  !*** ./src/fibonacci_lattice/main.ts ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math/math */ "./src/fibonacci_lattice/math/math.ts");

const offscreenCfg = {};
const main = () => {
    const canvas = document.getElementById('your_canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    offscreenCfg.canvas = canvas;
    offscreenCfg.width = canvas.width;
    offscreenCfg.height = canvas.height;
    offscreenCfg.ready = true;
    offscreenCfg.context2D = canvas.getContext('2d');
    renderLoop();
};
let index = 0;
const renderLoop = () => {
    if (offscreenCfg.ready) {
        // draw(offscreenCfg);
        draw2(offscreenCfg);
    }
    // requestAnimationFrame(renderLoop);
};
const draw = (offscreenCfg) => {
    offscreenCfg.context2D.clearRect(0, 0, offscreenCfg.width, offscreenCfg.height);
    offscreenCfg.context2D.save();
    const width = Math.sin(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100;
    const height = Math.cos(Date.now() % 1000 / 1000 * 3.14 * 2) * 100 + 100;
    drawEllipse(offscreenCfg.width / 2, offscreenCfg.height / 2, width, width, offscreenCfg.context2D);
    offscreenCfg.context2D.restore();
};
const drawEllipse = (x, y, width, height, context) => {
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
const perCount = 10000;
let preNumber = 0;
let preNumber1 = 1;
let count = 0;
const draw2 = (offscreenCfg) => {
    offscreenCfg.context2D.save();
    for (let i = 0; i < perCount; i++) {
        index++;
        // // if (index !== preNumber + preNumber1) { continue; }
        // if (!MathTools.isPrimeNumber(index)) { continue; }
        // count++;
        // drawPoint(index, offscreenCfg.context2D, offscreenCfg.width, offscreenCfg.height);
        // preNumber = preNumber1;
        // preNumber1 = index;
        drawPoint2(index, perCount, offscreenCfg.context2D, offscreenCfg.width, offscreenCfg.height);
    }
    offscreenCfg.context2D.restore();
};
const drawPoint = (num, context, width, height) => {
    let { x, y } = _math_math__WEBPACK_IMPORTED_MODULE_0__["MathTools"].polarCoordToCartesian(num, num);
    x = width / 2 + x / 1000;
    y = height / 2 + y / 1000;
    //设置绘制颜色
    context.fillStyle = "#0000FF";
    //绘制成矩形
    context.fillRect(x - 1, y - 1, 2, 2);
};
const drawPoint2 = (num, total, context, width, height) => {
    let x1 = (num / ((1 + Math.sqrt(5)) / 2)) % 1;
    let y1 = num / total;
    let { x, y } = _math_math__WEBPACK_IMPORTED_MODULE_0__["MathTools"].polarCoordToCartesian(x1 * 2 * 3.14, Math.sqrt(y1));
    x = x * width / 2 + width / 2;
    y = y * height / 2 + height / 2;
    //设置绘制颜色
    context.fillStyle = "#0000FF";
    //绘制成矩形
    context.fillRect(x - 1, y - 1, 4, 4);
};
main();


/***/ }),

/***/ "./src/fibonacci_lattice/math/math.ts":
/*!********************************************!*\
  !*** ./src/fibonacci_lattice/math/math.ts ***!
  \********************************************/
/*! exports provided: MathTools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathTools", function() { return MathTools; });
/**
 * 数学函数库
 */
class MathTools {
    static sin(x) {
        return Math.sin(x);
    }
    static cos(x) {
        return Math.cos(x);
    }
    static isPrimeNumber(n) {
        if (n < 2) {
            return false;
        }
        for (let i = 2; i <= n - 1; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * @description 下一个2的冥的数
     */
    static nextPowerOfTwo(value) {
        --value;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        return ++value;
    }
}
MathTools.polarCoordToCartesian = (num, count) => {
    return {
        x: Math.cos(num) * count,
        y: Math.sin(num) * count
    };
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpYm9uYWNjaV9sYXR0aWNlL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZpYm9uYWNjaV9sYXR0aWNlL21hdGgvbWF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQSxxREFBcUQsVUFBVTtBQUMvRCxpREFBaUQsVUFBVTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU8sR0FBRyxvREFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsT0FBTyxHQUFHLG9EQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9maWJvbmFjY2lfbGF0dGljZS9tYWluLnRzXCIpO1xuIiwiaW1wb3J0IHsgTWF0aFRvb2xzIH0gZnJvbSBcIi4vbWF0aC9tYXRoXCI7XHJcbmNvbnN0IG9mZnNjcmVlbkNmZyA9IHt9O1xyXG5jb25zdCBtYWluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lvdXJfY2FudmFzJyk7XHJcbiAgICBjYW52YXMud2lkdGggPSAxMjAwO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IDEyMDA7XHJcbiAgICBvZmZzY3JlZW5DZmcuY2FudmFzID0gY2FudmFzO1xyXG4gICAgb2Zmc2NyZWVuQ2ZnLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgb2Zmc2NyZWVuQ2ZnLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICBvZmZzY3JlZW5DZmcucmVhZHkgPSB0cnVlO1xyXG4gICAgb2Zmc2NyZWVuQ2ZnLmNvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgcmVuZGVyTG9vcCgpO1xyXG59O1xyXG5sZXQgaW5kZXggPSAwO1xyXG5jb25zdCByZW5kZXJMb29wID0gKCkgPT4ge1xyXG4gICAgaWYgKG9mZnNjcmVlbkNmZy5yZWFkeSkge1xyXG4gICAgICAgIC8vIGRyYXcob2Zmc2NyZWVuQ2ZnKTtcclxuICAgICAgICBkcmF3MihvZmZzY3JlZW5DZmcpO1xyXG4gICAgfVxyXG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckxvb3ApO1xyXG59O1xyXG5jb25zdCBkcmF3ID0gKG9mZnNjcmVlbkNmZykgPT4ge1xyXG4gICAgb2Zmc2NyZWVuQ2ZnLmNvbnRleHQyRC5jbGVhclJlY3QoMCwgMCwgb2Zmc2NyZWVuQ2ZnLndpZHRoLCBvZmZzY3JlZW5DZmcuaGVpZ2h0KTtcclxuICAgIG9mZnNjcmVlbkNmZy5jb250ZXh0MkQuc2F2ZSgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLnNpbihEYXRlLm5vdygpICUgMTAwMCAvIDEwMDAgKiAzLjE0ICogMikgKiAxMDAgKyAxMDA7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLmNvcyhEYXRlLm5vdygpICUgMTAwMCAvIDEwMDAgKiAzLjE0ICogMikgKiAxMDAgKyAxMDA7XHJcbiAgICBkcmF3RWxsaXBzZShvZmZzY3JlZW5DZmcud2lkdGggLyAyLCBvZmZzY3JlZW5DZmcuaGVpZ2h0IC8gMiwgd2lkdGgsIHdpZHRoLCBvZmZzY3JlZW5DZmcuY29udGV4dDJEKTtcclxuICAgIG9mZnNjcmVlbkNmZy5jb250ZXh0MkQucmVzdG9yZSgpO1xyXG59O1xyXG5jb25zdCBkcmF3RWxsaXBzZSA9ICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb250ZXh0KSA9PiB7XHJcbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcclxuICAgIGNvbnRleHQuc2NhbGUod2lkdGgsIGhlaWdodCk7XHJcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgY29udGV4dC5hcmMoMCwgMCwgMSwgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcclxuICAgIGNvbnRleHQuc2NhbGUoMSAvIHdpZHRoLCAxIC8gaGVpZ2h0KTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC14LCAteSk7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmYwMDAwJztcclxuICAgIGNvbnRleHQuZmlsbCgpO1xyXG59O1xyXG5jb25zdCBwZXJDb3VudCA9IDEwMDAwO1xyXG5sZXQgcHJlTnVtYmVyID0gMDtcclxubGV0IHByZU51bWJlcjEgPSAxO1xyXG5sZXQgY291bnQgPSAwO1xyXG5jb25zdCBkcmF3MiA9IChvZmZzY3JlZW5DZmcpID0+IHtcclxuICAgIG9mZnNjcmVlbkNmZy5jb250ZXh0MkQuc2F2ZSgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwZXJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAvLyAvLyBpZiAoaW5kZXggIT09IHByZU51bWJlciArIHByZU51bWJlcjEpIHsgY29udGludWU7IH1cclxuICAgICAgICAvLyBpZiAoIU1hdGhUb29scy5pc1ByaW1lTnVtYmVyKGluZGV4KSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgIC8vIGNvdW50Kys7XHJcbiAgICAgICAgLy8gZHJhd1BvaW50KGluZGV4LCBvZmZzY3JlZW5DZmcuY29udGV4dDJELCBvZmZzY3JlZW5DZmcud2lkdGgsIG9mZnNjcmVlbkNmZy5oZWlnaHQpO1xyXG4gICAgICAgIC8vIHByZU51bWJlciA9IHByZU51bWJlcjE7XHJcbiAgICAgICAgLy8gcHJlTnVtYmVyMSA9IGluZGV4O1xyXG4gICAgICAgIGRyYXdQb2ludDIoaW5kZXgsIHBlckNvdW50LCBvZmZzY3JlZW5DZmcuY29udGV4dDJELCBvZmZzY3JlZW5DZmcud2lkdGgsIG9mZnNjcmVlbkNmZy5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgb2Zmc2NyZWVuQ2ZnLmNvbnRleHQyRC5yZXN0b3JlKCk7XHJcbn07XHJcbmNvbnN0IGRyYXdQb2ludCA9IChudW0sIGNvbnRleHQsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICAgIGxldCB7IHgsIHkgfSA9IE1hdGhUb29scy5wb2xhckNvb3JkVG9DYXJ0ZXNpYW4obnVtLCBudW0pO1xyXG4gICAgeCA9IHdpZHRoIC8gMiArIHggLyAxMDAwO1xyXG4gICAgeSA9IGhlaWdodCAvIDIgKyB5IC8gMTAwMDtcclxuICAgIC8v6K6+572u57uY5Yi26aKc6ImyXHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xyXG4gICAgLy/nu5jliLbmiJDnn6nlvaJcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoeCAtIDEsIHkgLSAxLCAyLCAyKTtcclxufTtcclxuY29uc3QgZHJhd1BvaW50MiA9IChudW0sIHRvdGFsLCBjb250ZXh0LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICBsZXQgeDEgPSAobnVtIC8gKCgxICsgTWF0aC5zcXJ0KDUpKSAvIDIpKSAlIDE7XHJcbiAgICBsZXQgeTEgPSBudW0gLyB0b3RhbDtcclxuICAgIGxldCB7IHgsIHkgfSA9IE1hdGhUb29scy5wb2xhckNvb3JkVG9DYXJ0ZXNpYW4oeDEgKiAyICogMy4xNCwgTWF0aC5zcXJ0KHkxKSk7XHJcbiAgICB4ID0geCAqIHdpZHRoIC8gMiArIHdpZHRoIC8gMjtcclxuICAgIHkgPSB5ICogaGVpZ2h0IC8gMiArIGhlaWdodCAvIDI7XHJcbiAgICAvL+iuvue9rue7mOWItuminOiJslxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBcIiMwMDAwRkZcIjtcclxuICAgIC8v57uY5Yi25oiQ55+p5b2iXHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHggLSAxLCB5IC0gMSwgNCwgNCk7XHJcbn07XHJcbm1haW4oKTtcclxuIiwiLyoqXHJcbiAqIOaVsOWtpuWHveaVsOW6k1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hdGhUb29scyB7XHJcbiAgICBzdGF0aWMgc2luKHgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zaW4oeCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29zKHgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jb3MoeCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNQcmltZU51bWJlcihuKSB7XHJcbiAgICAgICAgaWYgKG4gPCAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPD0gbiAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobiAlIGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5LiL5LiA5LiqMueahOWGpeeahOaVsFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbmV4dFBvd2VyT2ZUd28odmFsdWUpIHtcclxuICAgICAgICAtLXZhbHVlO1xyXG4gICAgICAgIHZhbHVlIHw9IHZhbHVlID4+IDE7XHJcbiAgICAgICAgdmFsdWUgfD0gdmFsdWUgPj4gMjtcclxuICAgICAgICB2YWx1ZSB8PSB2YWx1ZSA+PiA0O1xyXG4gICAgICAgIHZhbHVlIHw9IHZhbHVlID4+IDg7XHJcbiAgICAgICAgdmFsdWUgfD0gdmFsdWUgPj4gMTY7XHJcbiAgICAgICAgcmV0dXJuICsrdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuTWF0aFRvb2xzLnBvbGFyQ29vcmRUb0NhcnRlc2lhbiA9IChudW0sIGNvdW50KSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IE1hdGguY29zKG51bSkgKiBjb3VudCxcclxuICAgICAgICB5OiBNYXRoLnNpbihudW0pICogY291bnRcclxuICAgIH07XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=