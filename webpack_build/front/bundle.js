!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";const o=new Worker("./logic_webgl/index.js"),r=document.getElementById("your_canvas");r.width=800,r.height=800;const a=r.transferControlToOffscreen();o.postMessage({CMD:"INIT",canvas:a},[a]),window.addEventListener("mousemove",e=>{o.postMessage({CMD:"MOVE",x:e.clientX,y:e.clientY})}),o.onmessage=e=>{let t=e.data;switch(t.CMD){case"IMAGE":{const e=new Image;e.onload=()=>{i(e,t.fname)},e.src=t.fname;break}default:console.warn("no such CMD: ",t.CMD)}};const i=(e,t)=>{const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0),r.save();const a=r.getImageData(0,0,e.width,e.height),i=a.data;o.postMessage({CMD:"IMAGE",image:i,fname:t,width:a.width,height:a.height})}}]);