(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
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
const worker01 = new Worker('./logic_webgl/index.js');
const canvas = document.getElementById('your_canvas');
canvas.width = 800;
canvas.height = 800;
const off_canvas = canvas.transferControlToOffscreen();
// main(off_canvas);
worker01.postMessage({ 'CMD': 'INIT', 'canvas': off_canvas }, [off_canvas]);
window.addEventListener('mousemove', (e) => {
    worker01.postMessage({ 'CMD': 'MOVE', x: e.clientX, y: e.clientY });
});
worker01.onmessage = (ev) => {
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
const loadImageSucc = (img, fname) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.save();
    // const off_canvas = <any>canvas.transferControlToOffscreen();
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    worker01.postMessage({ 'CMD': 'IMAGE', 'image': data, 'fname': fname, "width": imageData.width, "height": imageData.height });
    // createImageBitmap(img).then((value: ImageBitmap) => {
    //     worker01.postMessage({ 'CMD': 'IMAGE', 'image': value, 'fname': fname }, [value]);
    // });
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZnJvbnQvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNDQSxtREFBbUQ7QUFFbkQ7O0dBRUc7QUFFSCxtREFBbUQ7QUFFbkQsNEVBQTRFO0FBRTVFLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFFdkIsK0RBQStEO0FBRS9ELCtFQUErRTtBQUUvRSxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRXRELE1BQU0sTUFBTSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXpFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBRXBCLE1BQU0sVUFBVSxHQUFRLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0FBRTVELG9CQUFvQjtBQUVwQixRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFhLEVBQUUsRUFBRTtJQUNuRCxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDeEUsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUU7SUFDN0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDeEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2QsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLCtEQUErRDtZQUNuRSxDQUFDLENBQUM7WUFDRixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckIsTUFBTTtTQUNUO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0M7S0FDSjtBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBcUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtJQUMzRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFFM0IsTUFBTSxHQUFHLEdBQTZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVYLCtEQUErRDtJQUUvRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztJQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRTlILHdEQUF3RDtJQUN4RCx5RkFBeUY7SUFDekYsTUFBTTtBQUNWLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG4vLyBpbXBvcnQgeyBXb3JrZXJNYW5hZ2VyIH0gZnJvbSBcIi4vd29ya2VyL3dvcmtlclwiO1xyXG5cclxuLyoqXHJcbiAqIOWFpeWPo+aWh+S7tlxyXG4gKi9cclxuXHJcbi8vIGNvbnN0IHdvcmtlcjAxID0gbmV3IFdvcmtlcignLi9sb2dpYy9pbmRleC5qcycpO1xyXG5cclxuLy8gY29uc3QgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5b3VyX2NhbnZhcycpO1xyXG5cclxuLy8gY2FudmFzLndpZHRoID0gOTYwO1xyXG4vLyBjYW52YXMuaGVpZ2h0ID0gNTQwO1xyXG5cclxuLy8gY29uc3Qgb2ZmX2NhbnZhcyA9IDxhbnk+Y2FudmFzLnRyYW5zZmVyQ29udHJvbFRvT2Zmc2NyZWVuKCk7XHJcblxyXG4vLyB3b3JrZXIwMS5wb3N0TWVzc2FnZSh7ICdDTUQnOiAnSU5JVCcsICdjYW52YXMnOiBvZmZfY2FudmFzIH0sIFtvZmZfY2FudmFzXSk7XHJcblxyXG5jb25zdCB3b3JrZXIwMSA9IG5ldyBXb3JrZXIoJy4vbG9naWNfd2ViZ2wvaW5kZXguanMnKTtcclxuXHJcbmNvbnN0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneW91cl9jYW52YXMnKTtcclxuXHJcbmNhbnZhcy53aWR0aCA9IDgwMDtcclxuY2FudmFzLmhlaWdodCA9IDgwMDtcclxuXHJcbmNvbnN0IG9mZl9jYW52YXMgPSA8YW55PmNhbnZhcy50cmFuc2ZlckNvbnRyb2xUb09mZnNjcmVlbigpO1xyXG5cclxuLy8gbWFpbihvZmZfY2FudmFzKTtcclxuXHJcbndvcmtlcjAxLnBvc3RNZXNzYWdlKHsgJ0NNRCc6ICdJTklUJywgJ2NhbnZhcyc6IG9mZl9jYW52YXMgfSwgW29mZl9jYW52YXNdKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZTogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgd29ya2VyMDEucG9zdE1lc3NhZ2UoeyAnQ01EJzogJ01PVkUnLCB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9KTtcclxufSk7XHJcblxyXG53b3JrZXIwMS5vbm1lc3NhZ2UgPSAoZXY6IGFueSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBldi5kYXRhO1xyXG4gICAgc3dpdGNoIChkYXRhLkNNRCkge1xyXG4gICAgICAgIGNhc2UgKCdJTUFHRScpOiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZEltYWdlU3VjYyhpbWcsIGRhdGEuZm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7IGxvYWRJbWFnZVN1Y2MoaW1nLCBkYXRhLmZuYW1lKTsgfSwgMjAwMCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBkYXRhLmZuYW1lO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYG5vIHN1Y2ggQ01EOiBgLCBkYXRhLkNNRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9hZEltYWdlU3VjYyA9IChpbWc6IEhUTUxJbWFnZUVsZW1lbnQsIGZuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgY3R4ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuICAgIGN0eC5zYXZlKCk7XHJcblxyXG4gICAgLy8gY29uc3Qgb2ZmX2NhbnZhcyA9IDxhbnk+Y2FudmFzLnRyYW5zZmVyQ29udHJvbFRvT2Zmc2NyZWVuKCk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xyXG4gICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xyXG4gICAgd29ya2VyMDEucG9zdE1lc3NhZ2UoeyAnQ01EJzogJ0lNQUdFJywgJ2ltYWdlJzogZGF0YSwgJ2ZuYW1lJzogZm5hbWUsIFwid2lkdGhcIjogaW1hZ2VEYXRhLndpZHRoLCBcImhlaWdodFwiOiBpbWFnZURhdGEuaGVpZ2h0IH0pO1xyXG5cclxuICAgIC8vIGNyZWF0ZUltYWdlQml0bWFwKGltZykudGhlbigodmFsdWU6IEltYWdlQml0bWFwKSA9PiB7XHJcbiAgICAvLyAgICAgd29ya2VyMDEucG9zdE1lc3NhZ2UoeyAnQ01EJzogJ0lNQUdFJywgJ2ltYWdlJzogdmFsdWUsICdmbmFtZSc6IGZuYW1lIH0sIFt2YWx1ZV0pO1xyXG4gICAgLy8gfSk7XHJcbn07Il19
