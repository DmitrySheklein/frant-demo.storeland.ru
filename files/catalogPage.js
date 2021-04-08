/*! nouislider - 12.1.0 - 10/25/2018 */
!function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():window.noUiSlider=t()}(function(){"use strict";var et="12.1.0";function s(t){return null!=t}function rt(t){t.preventDefault()}function i(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function nt(t,e,r){0<r&&(at(t,e),setTimeout(function(){st(t,e)},r))}function it(t){return Math.max(Math.min(t,100),0)}function ot(t){return Array.isArray(t)?t:[t]}function e(t){var e=(t=String(t)).split(".");return 1<e.length?e[1].length:0}function at(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function st(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function lt(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop}}function c(t,e){return 100/(e-t)}function p(t,e){return 100*e/(t[1]-t[0])}function f(t,e){for(var r=1;t>=e[r];)r+=1;return r}function r(t,e,r){if(r>=t.slice(-1)[0])return 100;var n,i,o=f(r,t),a=t[o-1],s=t[o],l=e[o-1],u=e[o];return l+(i=r,p(n=[a,s],n[0]<0?i+Math.abs(n[0]):i-n[0])/c(l,u))}function n(t,e,r,n){if(100===n)return n;var i,o,a=f(n,t),s=t[a-1],l=t[a];return r?(l-s)/2<n-s?l:s:e[a-1]?t[a-1]+(i=n-t[a-1],o=e[a-1],Math.round(i/o)*o):n}function o(t,e,r){var n;if("number"==typeof e&&(e=[e]),!Array.isArray(e))throw new Error("noUiSlider ("+et+"): 'range' contains invalid value.");if(!i(n="min"===t?0:"max"===t?100:parseFloat(t))||!i(e[0]))throw new Error("noUiSlider ("+et+"): 'range' value isn't numeric.");r.xPct.push(n),r.xVal.push(e[0]),n?r.xSteps.push(!isNaN(e[1])&&e[1]):isNaN(e[1])||(r.xSteps[0]=e[1]),r.xHighestCompleteStep.push(0)}function a(t,e,r){if(!e)return!0;r.xSteps[t]=p([r.xVal[t],r.xVal[t+1]],e)/c(r.xPct[t],r.xPct[t+1]);var n=(r.xVal[t+1]-r.xVal[t])/r.xNumSteps[t],i=Math.ceil(Number(n.toFixed(3))-1),o=r.xVal[t]+r.xNumSteps[t]*i;r.xHighestCompleteStep[t]=o}function l(t,e,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var i=[];for(n in t)t.hasOwnProperty(n)&&i.push([t[n],n]);for(i.length&&"object"==typeof i[0][0]?i.sort(function(t,e){return t[0][0]-e[0][0]}):i.sort(function(t,e){return t[0]-e[0]}),n=0;n<i.length;n++)o(i[n][1],i[n][0],this);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)a(n,this.xNumSteps[n],this)}l.prototype.getMargin=function(t){var e=this.xNumSteps[0];if(e&&t/e%1!=0)throw new Error("noUiSlider ("+et+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&p(this.xVal,t)},l.prototype.toStepping=function(t){return t=r(this.xVal,this.xPct,t)},l.prototype.fromStepping=function(t){return function(t,e,r){if(100<=r)return t.slice(-1)[0];var n,i=f(r,e),o=t[i-1],a=t[i],s=e[i-1],l=e[i];return n=[o,a],(r-s)*c(s,l)*(n[1]-n[0])/100+n[0]}(this.xVal,this.xPct,t)},l.prototype.getStep=function(t){return t=n(this.xPct,this.xSteps,this.snap,t)},l.prototype.getNearbySteps=function(t){var e=f(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},l.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(e);return Math.max.apply(null,t)},l.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var u={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function d(t){if("object"==typeof(e=t)&&"function"==typeof e.to&&"function"==typeof e.from)return!0;var e;throw new Error("noUiSlider ("+et+"): 'format' requires 'to' and 'from' methods.")}function h(t,e){if(!i(e))throw new Error("noUiSlider ("+et+"): 'step' is not numeric.");t.singleStep=e}function m(t,e){if("object"!=typeof e||Array.isArray(e))throw new Error("noUiSlider ("+et+"): 'range' is not an object.");if(void 0===e.min||void 0===e.max)throw new Error("noUiSlider ("+et+"): Missing 'min' or 'max' in 'range'.");if(e.min===e.max)throw new Error("noUiSlider ("+et+"): 'range' 'min' and 'max' cannot be equal.");t.spectrum=new l(e,t.snap,t.singleStep)}function g(t,e){if(e=ot(e),!Array.isArray(e)||!e.length)throw new Error("noUiSlider ("+et+"): 'start' option is incorrect.");t.handles=e.length,t.start=e}function v(t,e){if("boolean"!=typeof(t.snap=e))throw new Error("noUiSlider ("+et+"): 'snap' option must be a boolean.")}function b(t,e){if("boolean"!=typeof(t.animate=e))throw new Error("noUiSlider ("+et+"): 'animate' option must be a boolean.")}function S(t,e){if("number"!=typeof(t.animationDuration=e))throw new Error("noUiSlider ("+et+"): 'animationDuration' option must be a number.")}function w(t,e){var r,n=[!1];if("lower"===e?e=[!0,!1]:"upper"===e&&(e=[!1,!0]),!0===e||!1===e){for(r=1;r<t.handles;r++)n.push(e);n.push(!1)}else{if(!Array.isArray(e)||!e.length||e.length!==t.handles+1)throw new Error("noUiSlider ("+et+"): 'connect' option doesn't match handle count.");n=e}t.connect=n}function x(t,e){switch(e){case"horizontal":t.ort=0;break;case"vertical":t.ort=1;break;default:throw new Error("noUiSlider ("+et+"): 'orientation' option is invalid.")}}function y(t,e){if(!i(e))throw new Error("noUiSlider ("+et+"): 'margin' option must be numeric.");if(0!==e&&(t.margin=t.spectrum.getMargin(e),!t.margin))throw new Error("noUiSlider ("+et+"): 'margin' option is only supported on linear sliders.")}function E(t,e){if(!i(e))throw new Error("noUiSlider ("+et+"): 'limit' option must be numeric.");if(t.limit=t.spectrum.getMargin(e),!t.limit||t.handles<2)throw new Error("noUiSlider ("+et+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function C(t,e){if(!i(e)&&!Array.isArray(e))throw new Error("noUiSlider ("+et+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(e)&&2!==e.length&&!i(e[0])&&!i(e[1]))throw new Error("noUiSlider ("+et+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==e){if(Array.isArray(e)||(e=[e,e]),!(t.padding=[t.spectrum.getMargin(e[0]),t.spectrum.getMargin(e[1])])===t.padding[0]||!1===t.padding[1])throw new Error("noUiSlider ("+et+"): 'padding' option is only supported on linear sliders.");if(t.padding[0]<0||t.padding[1]<0)throw new Error("noUiSlider ("+et+"): 'padding' option must be a positive number(s).");if(100<=t.padding[0]+t.padding[1])throw new Error("noUiSlider ("+et+"): 'padding' option must not exceed 100% of the range.")}}function N(t,e){switch(e){case"ltr":t.dir=0;break;case"rtl":t.dir=1;break;default:throw new Error("noUiSlider ("+et+"): 'direction' option was not recognized.")}}function U(t,e){if("string"!=typeof e)throw new Error("noUiSlider ("+et+"): 'behaviour' must be a string containing options.");var r=0<=e.indexOf("tap"),n=0<=e.indexOf("drag"),i=0<=e.indexOf("fixed"),o=0<=e.indexOf("snap"),a=0<=e.indexOf("hover"),s=0<=e.indexOf("unconstrained");if(i){if(2!==t.handles)throw new Error("noUiSlider ("+et+"): 'fixed' behaviour must be used with 2 handles");y(t,t.start[1]-t.start[0])}if(s&&(t.margin||t.limit))throw new Error("noUiSlider ("+et+"): 'unconstrained' behaviour cannot be used with margin or limit");t.events={tap:r||o,drag:n,fixed:i,snap:o,hover:a,unconstrained:s}}function k(t,e){if(!1!==e)if(!0===e){t.tooltips=[];for(var r=0;r<t.handles;r++)t.tooltips.push(!0)}else{if(t.tooltips=ot(e),t.tooltips.length!==t.handles)throw new Error("noUiSlider ("+et+"): must pass a formatter for all handles.");t.tooltips.forEach(function(t){if("boolean"!=typeof t&&("object"!=typeof t||"function"!=typeof t.to))throw new Error("noUiSlider ("+et+"): 'tooltips' must be passed a formatter or 'false'.")})}}function P(t,e){d(t.ariaFormat=e)}function A(t,e){d(t.format=e)}function M(t,e){if("boolean"!=typeof(t.keyboardSupport=e))throw new Error("noUiSlider ("+et+"): 'keyboardSupport' option must be a boolean.")}function V(t,e){t.documentElement=e}function O(t,e){if("string"!=typeof e&&!1!==e)throw new Error("noUiSlider ("+et+"): 'cssPrefix' must be a string or `false`.");t.cssPrefix=e}function L(t,e){if("object"!=typeof e)throw new Error("noUiSlider ("+et+"): 'cssClasses' must be an object.");if("string"==typeof t.cssPrefix)for(var r in t.cssClasses={},e)e.hasOwnProperty(r)&&(t.cssClasses[r]=t.cssPrefix+e[r]);else t.cssClasses=e}function ut(e){var r={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:u,format:u},n={step:{r:!1,t:h},start:{r:!0,t:g},connect:{r:!0,t:w},direction:{r:!0,t:N},snap:{r:!1,t:v},animate:{r:!1,t:b},animationDuration:{r:!1,t:S},range:{r:!0,t:m},orientation:{r:!1,t:x},margin:{r:!1,t:y},limit:{r:!1,t:E},padding:{r:!1,t:C},behaviour:{r:!0,t:U},ariaFormat:{r:!1,t:P},format:{r:!1,t:A},tooltips:{r:!1,t:k},keyboardSupport:{r:!0,t:M},documentElement:{r:!1,t:V},cssPrefix:{r:!0,t:O},cssClasses:{r:!0,t:L}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(n).forEach(function(t){if(!s(e[t])&&void 0===i[t]){if(n[t].r)throw new Error("noUiSlider ("+et+"): '"+t+"' is required.");return!0}n[t].t(r,s(e[t])?e[t]:i[t])}),r.pips=e.pips;var t=document.createElement("div"),o=void 0!==t.style.msTransform,a=void 0!==t.style.transform;r.transformRule=a?"transform":o?"msTransform":"webkitTransform";return r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function z(t,f,o){var l,u,s,a,c,e,p,i,d=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},h=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),y=t,m=[],g=[],v=0,E=f.spectrum,b=[],S={},w=t.ownerDocument,x=f.documentElement||w.documentElement,C=w.body,N=-1,U=0,k=1,P=2,A="rtl"===w.dir||1===f.ort?0:100;function M(t,e){var r=w.createElement("div");return e&&at(r,e),t.appendChild(r),r}function V(t,e){return!!e&&M(t,f.cssClasses.connect)}function r(t,e){return!!f.tooltips[e]&&M(t.firstChild,f.cssClasses.tooltip)}function O(e,i,o){var a=w.createElement("div"),s=[];s[U]=f.cssClasses.valueNormal,s[k]=f.cssClasses.valueLarge,s[P]=f.cssClasses.valueSub;var l=[];l[U]=f.cssClasses.markerNormal,l[k]=f.cssClasses.markerLarge,l[P]=f.cssClasses.markerSub;var u=[f.cssClasses.valueHorizontal,f.cssClasses.valueVertical],c=[f.cssClasses.markerHorizontal,f.cssClasses.markerVertical];function p(t,e){var r=e===f.cssClasses.value,n=r?s:l;return e+" "+(r?u:c)[f.ort]+" "+n[t]}return at(a,f.cssClasses.pips),at(a,0===f.ort?f.cssClasses.pipsHorizontal:f.cssClasses.pipsVertical),Object.keys(e).forEach(function(t){!function(t,e,r){if((r=i?i(e,r):r)!==N){var n=M(a,!1);n.className=p(r,f.cssClasses.marker),n.style[f.style]=t+"%",U<r&&((n=M(a,!1)).className=p(r,f.cssClasses.value),n.setAttribute("data-value",e),n.style[f.style]=t+"%",n.innerHTML=o.to(e))}}(t,e[t][0],e[t][1])}),a}function L(){var t;c&&((t=c).parentElement.removeChild(t),c=null)}function z(t){L();var m,g,v,b,e,r,S,w,x,n=t.mode,i=t.density||1,o=t.filter||!1,a=function(t,e,r){if("range"===t||"steps"===t)return E.xVal;if("count"===t){if(e<2)throw new Error("noUiSlider ("+et+"): 'values' (>= 2) required for mode 'count'.");var n=e-1,i=100/n;for(e=[];n--;)e[n]=n*i;e.push(100),t="positions"}return"positions"===t?e.map(function(t){return E.fromStepping(r?E.getStep(t):t)}):"values"===t?r?e.map(function(t){return E.fromStepping(E.getStep(E.toStepping(t)))}):e:void 0}(n,t.values||!1,t.stepped||!1),s=(m=i,g=n,v=a,b={},e=E.xVal[0],r=E.xVal[E.xVal.length-1],w=S=!1,x=0,(v=v.slice().sort(function(t,e){return t-e}).filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==e&&(v.unshift(e),S=!0),v[v.length-1]!==r&&(v.push(r),w=!0),v.forEach(function(t,e){var r,n,i,o,a,s,l,u,c,p,f=t,d=v[e+1],h="steps"===g;if(h&&(r=E.xNumSteps[e]),r||(r=d-f),!1!==f&&void 0!==d)for(r=Math.max(r,1e-7),n=f;n<=d;n=(n+r).toFixed(7)/1){for(u=(a=(o=E.toStepping(n))-x)/m,p=a/(c=Math.round(u)),i=1;i<=c;i+=1)b[(s=x+i*p).toFixed(5)]=[E.fromStepping(s),0];l=-1<v.indexOf(n)?k:h?P:U,!e&&S&&(l=0),n===d&&w||(b[o.toFixed(5)]=[n,l]),x=o}}),b),l=t.format||{to:Math.round};return c=y.appendChild(O(s,o,l))}function j(){var t=l.getBoundingClientRect(),e="offset"+["Width","Height"][f.ort];return 0===f.ort?t.width||l[e]:t.height||l[e]}function F(n,i,o,a){var e=function(t){return!!(t=function(t,e,r){var n,i,o=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");0===t.type.indexOf("MSPointer")&&(s=!0);if(o){var l=function(t){return t.target===r||r.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(1<u.length)return!1;n=u[0].pageX,i=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;n=c.pageX,i=c.pageY}}e=e||lt(w),(a||s)&&(n=t.clientX+e.x,i=t.clientY+e.y);return t.pageOffset=e,t.points=[n,i],t.cursor=a||s,t}(t,a.pageOffset,a.target||i))&&(!(y.hasAttribute("disabled")&&!a.doNotReject)&&(e=y,r=f.cssClasses.tap,!((e.classList?e.classList.contains(r):new RegExp("\\b"+r+"\\b").test(e.className))&&!a.doNotReject)&&(!(n===d.start&&void 0!==t.buttons&&1<t.buttons)&&((!a.hover||!t.buttons)&&(h||t.preventDefault(),t.calcPoint=t.points[f.ort],void o(t,a))))));var e,r},r=[];return n.split(" ").forEach(function(t){i.addEventListener(t,e,!!h&&{passive:!0}),r.push([t,e])}),r}function H(t){var e,r,n,i,o,a,s=100*(t-(e=l,r=f.ort,n=e.getBoundingClientRect(),i=e.ownerDocument,o=i.documentElement,a=lt(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(a.x=0),r?n.top+a.y-o.clientTop:n.left+a.x-o.clientLeft))/j();return s=it(s),f.dir?100-s:s}function D(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&R(t,e)}function T(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return R(t,e);var r=(f.dir?-1:1)*(t.calcPoint-e.startCalcPoint);$(0<r,100*r/e.baseSize,e.locations,e.handleNumbers)}function R(t,e){e.handle&&(st(e.handle,f.cssClasses.active),v-=1),e.listeners.forEach(function(t){x.removeEventListener(t[0],t[1])}),0===v&&(st(y,f.cssClasses.drag),J(),t.cursor&&(C.style.cursor="",C.removeEventListener("selectstart",rt))),e.handleNumbers.forEach(function(t){Y("change",t),Y("set",t),Y("end",t)})}function q(t,e){var r;if(1===e.handleNumbers.length){var n=u[e.handleNumbers[0]];if(n.hasAttribute("disabled"))return!1;r=n.children[0],v+=1,at(r,f.cssClasses.active)}t.stopPropagation();var i=[],o=F(d.move,x,T,{target:t.target,handle:r,listeners:i,startCalcPoint:t.calcPoint,baseSize:j(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:m.slice()}),a=F(d.end,x,R,{target:t.target,handle:r,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers}),s=F("mouseout",x,D,{target:t.target,handle:r,listeners:i,doNotReject:!0,handleNumbers:e.handleNumbers});i.push.apply(i,o.concat(a,s)),t.cursor&&(C.style.cursor=getComputedStyle(t.target).cursor,1<u.length&&at(y,f.cssClasses.drag),C.addEventListener("selectstart",rt,!1)),e.handleNumbers.forEach(function(t){Y("start",t)})}function n(t){t.stopPropagation();var n,i,o,e=H(t.calcPoint),r=(n=e,o=!(i=100),u.forEach(function(t,e){if(!t.hasAttribute("disabled")){var r=Math.abs(m[e]-n);(r<i||100===r&&100===i)&&(o=e,i=r)}}),o);if(!1===r)return!1;f.events.snap||nt(y,f.cssClasses.tap,f.animationDuration),K(r,e,!0,!0),J(),Y("slide",r,!0),Y("update",r,!0),Y("change",r,!0),Y("set",r,!0),f.events.snap&&q(t,{handleNumbers:[r]})}function B(t){var e=H(t.calcPoint),r=E.getStep(e),n=E.fromStepping(r);Object.keys(S).forEach(function(t){"hover"===t.split(".")[0]&&S[t].forEach(function(t){t.call(a,n)})})}function X(t,e){S[t]=S[t]||[],S[t].push(e),"update"===t.split(".")[0]&&u.forEach(function(t,e){Y("update",e)})}function Y(r,n,i){Object.keys(S).forEach(function(t){var e=t.split(".")[0];r===e&&S[t].forEach(function(t){t.call(a,b.map(f.format.to),n,b.slice(),i||!1,m.slice())})})}function _(t){return t+"%"}function I(t,e,r,n,i,o){return 1<u.length&&!f.events.unconstrained&&(n&&0<e&&(r=Math.max(r,t[e-1]+f.margin)),i&&e<u.length-1&&(r=Math.min(r,t[e+1]-f.margin))),1<u.length&&f.limit&&(n&&0<e&&(r=Math.min(r,t[e-1]+f.limit)),i&&e<u.length-1&&(r=Math.max(r,t[e+1]-f.limit))),f.padding&&(0===e&&(r=Math.max(r,f.padding[0])),e===u.length-1&&(r=Math.min(r,100-f.padding[1]))),!((r=it(r=E.getStep(r)))===t[e]&&!o)&&r}function W(t,e){var r=f.ort;return(r?e:t)+", "+(r?t:e)}function $(t,n,r,e){var i=r.slice(),o=[!t,t],a=[t,!t];e=e.slice(),t&&e.reverse(),1<e.length?e.forEach(function(t,e){var r=I(i,t,i[t]+n,o[e],a[e],!1);!1===r?n=0:(n=r-i[t],i[t]=r)}):o=a=[!0];var s=!1;e.forEach(function(t,e){s=K(t,r[t]+n,o[e],a[e])||s}),s&&e.forEach(function(t){Y("update",t),Y("slide",t)})}function G(t,e){return f.dir?100-t-e:t}function J(){g.forEach(function(t){var e=50<m[t]?-1:1,r=3+(u.length+e*t);u[t].style.zIndex=r})}function K(t,e,r,n){return!1!==(e=I(m,t,e,r,n,!1))&&(function(t,e){m[t]=e,b[t]=E.fromStepping(e);var r="translate("+W(_(G(e,0)-A),"0")+")";u[t].style[f.transformRule]=r,Q(t),Q(t+1)}(t,e),!0)}function Q(t){if(s[t]){var e=0,r=100;0!==t&&(e=m[t-1]),t!==s.length-1&&(r=m[t]);var n=r-e,i="translate("+W(_(G(e,n)),"0")+")",o="scale("+W(n/100,"1")+")";s[t].style[f.transformRule]=i+" "+o}}function Z(t,e){var n=ot(t),r=void 0===m[0];e=void 0===e||!!e,f.animate&&!r&&nt(y,f.cssClasses.tap,f.animationDuration),g.forEach(function(t){var e,r;K(t,(e=n[t],r=t,null===e||!1===e||void 0===e?m[r]:("number"==typeof e&&(e=String(e)),e=f.format.from(e),!1===(e=E.toStepping(e))||isNaN(e)?m[r]:e)),!0,!1)}),g.forEach(function(t){K(t,m[t],!0,!0)}),J(),g.forEach(function(t){Y("update",t),null!==n[t]&&e&&Y("set",t)})}function tt(){var t=b.map(f.format.to);return 1===t.length?t[0]:t}return at(e=y,f.cssClasses.target),0===f.dir?at(e,f.cssClasses.ltr):at(e,f.cssClasses.rtl),0===f.ort?at(e,f.cssClasses.horizontal):at(e,f.cssClasses.vertical),l=M(e,f.cssClasses.base),function(t,e){var r,n,i,o=M(e,f.cssClasses.connects);u=[],(s=[]).push(V(o,t[0]));for(var a=0;a<f.handles;a++)u.push((r=a,i=void 0,n=M(e,f.cssClasses.origin),(i=M(n,f.cssClasses.handle)).setAttribute("data-handle",r),f.keyboardSupport&&i.setAttribute("tabindex","0"),i.setAttribute("role","slider"),i.setAttribute("aria-orientation",f.ort?"vertical":"horizontal"),0===r?at(i,f.cssClasses.handleLower):r===f.handles-1&&at(i,f.cssClasses.handleUpper),n)),g[a]=a,s.push(V(o,t[a+1]))}(f.connect,l),(p=f.events).fixed||u.forEach(function(t,e){F(d.start,t.children[0],q,{handleNumbers:[e]})}),p.tap&&F(d.start,l,n,{}),p.hover&&F(d.move,l,B,{hover:!0}),p.drag&&s.forEach(function(t,e){if(!1!==t&&0!==e&&e!==s.length-1){var r=u[e-1],n=u[e],i=[t];at(t,f.cssClasses.draggable),p.fixed&&(i.push(r.children[0]),i.push(n.children[0])),i.forEach(function(t){F(d.start,t,q,{handles:[r,n],handleNumbers:[e-1,e]})})}}),Z(f.start),a={destroy:function(){for(var t in f.cssClasses)f.cssClasses.hasOwnProperty(t)&&st(y,f.cssClasses[t]);for(;y.firstChild;)y.removeChild(y.firstChild);delete y.noUiSlider},steps:function(){return m.map(function(t,e){var r=E.getNearbySteps(t),n=b[e],i=r.thisStep.step,o=null;!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),o=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===t?i=null:0===t&&(o=null);var a=E.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(a))),null!==o&&!1!==o&&(o=Number(o.toFixed(a))),[o,i]})},on:X,off:function(t){var n=t&&t.split(".")[0],i=n&&t.substring(n.length);Object.keys(S).forEach(function(t){var e=t.split(".")[0],r=t.substring(e.length);n&&n!==e||i&&i!==r||delete S[t]})},get:tt,set:Z,setHandle:function(t,e,r){var n=[];if(!(0<=(t=Number(t))&&t<g.length))throw new Error("noUiSlider ("+et+"): invalid handle number, got: "+t);for(var i=0;i<g.length;i++)n[i]=null;n[t]=e,Z(n,r)},reset:function(t){Z(f.start,t)},__moveHandles:function(t,e,r){$(t,e,m,r)},options:o,updateOptions:function(e,t){var r=tt(),n=["margin","limit","padding","range","animate","snap","step","format"];n.forEach(function(t){void 0!==e[t]&&(o[t]=e[t])});var i=ut(o);n.forEach(function(t){void 0!==e[t]&&(f[t]=i[t])}),E=i.spectrum,f.margin=i.margin,f.limit=i.limit,f.padding=i.padding,f.pips&&z(f.pips),m=[],Z(e.start||r,t)},target:y,removePips:L,pips:z},f.pips&&z(f.pips),f.tooltips&&(i=u.map(r),X("update",function(t,e,r){if(i[e]){var n=t[e];!0!==f.tooltips[e]&&(n=f.tooltips[e].to(r[e])),i[e].innerHTML=n}})),X("update",function(t,e,a,r,s){g.forEach(function(t){var e=u[t],r=I(m,t,0,!0,!0,!0),n=I(m,t,100,!0,!0,!0),i=s[t],o=f.ariaFormat.to(a[t]);r=E.fromStepping(r).toFixed(1),n=E.fromStepping(n).toFixed(1),i=E.fromStepping(i).toFixed(1),e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",n),e.children[0].setAttribute("aria-valuenow",i),e.children[0].setAttribute("aria-valuetext",o)})}),a}return{__spectrum:l,version:et,create:function(t,e){if(!t||!t.nodeName)throw new Error("noUiSlider ("+et+"): create requires a single element, got: "+t);if(t.noUiSlider)throw new Error("noUiSlider ("+et+"): Slider was already initialized.");var r=z(t,ut(e),e);return t.noUiSlider=r}}});

// Функции для каталога 
function catalogFunctions(){
    // Стилизация селектов
    $('.selectBox').styler()
 
    $('.products-container').on('click', '.attr-button', function () {
      var $btn = $(this);

      $btn.parent().find('.attr-list').slideToggle()
      $btn.toggleClass('_active')
    })
    // Фильтр по ценам
    var
      // Минимальное значение цены для фильтра
      priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text())
      // Максимальное значение цены для фильтра
      ,priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text())
      // Максимальное значение цены для фильтра
      ,priceSliderBlock = $('#goods-filter-price-slider')[0]
      // Поле ввода текущего значения цены "От"
      ,priceInputMin = $( "#goods-filter-min-price" )
      // Поле ввода текущего значения цены "До"
      ,priceInputMax = $( "#goods-filter-max-price" )
      // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.
      ,priceSubmitButtonBlock = $( ".goodsFilterPriceSubmit" );
      
    // Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
    function priceInputsChangeWidthByChars() {
      // Если есть блок указания минимальной цены
      if(priceInputMin.length) {
        priceInputMin.css('width', (priceInputMin.val().length*7 + 60) + 'px');
        priceInputMax.css('width', (priceInputMax.val().length*7 + 60) + 'px');
      }
    }
    // Обновить размеры полей ввода диапазона цен
    priceInputsChangeWidthByChars();
  
    // Слайдер, который используется для удобства выбора цены
    if(priceSliderBlock){
      noUiSlider.create(priceSliderBlock, {
          start: [parseInt($('#goods-filter-min-price').val()), parseInt($('#goods-filter-max-price').val())],
          connect: true,
          range: {
              'min': priceFilterMinAvailable,
              'max': priceFilterMaxAvailable
          }
      });
      
      priceSliderBlock.noUiSlider.on('slide', function (values, handle) {
        var newVal = parseInt(values[handle]);
    
        /*
        * 0 - left handle
        * 1 - right handle
        */ 
        if (handle) {
            priceInputMax.val( newVal );    
        } else {
            priceInputMin.val( newVal );
        }
        
        priceInputsChangeWidthByChars();
      });
      
      // При изменении минимального значения цены
      priceInputMin.keyup(function(){
        var newVal = parseInt($(this).val());
        if(newVal < priceFilterMinAvailable) {
          newVal = priceFilterMinAvailable;
        }
        priceSliderBlock.noUiSlider.set([newVal, null]);
        priceInputsChangeWidthByChars();
      });
      
      // При изменении максимального значения цены
      priceInputMax.keyup(function(){
        var newVal = parseInt($(this).val());
        if(newVal > priceFilterMaxAvailable) {
          newVal = priceFilterMaxAvailable;
        }
        priceSliderBlock.noUiSlider.set([null, newVal]);
        priceInputsChangeWidthByChars();
      });  
    }
    
    // Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
    $('.filters-goods input[type="checkbox"]').click(function(){
      $(this)[0].form.submit();
      
      return;
      
    });
  
    $('.filters-goods-active input[type="checkbox"]').click(function(){
      $(this)[0].form.submit();
    });
    
    $('.filter-search').on('input', function () {
      var $items = $(this).next('.filter-inner').children()
      var $checkboxes = $items.find('.checkbox-name');
      var itemsArray = $checkboxes.map(function () {return $(this).data('name').toLowerCase()}).toArray();
      var str = $(this).val();

      var resultArray = itemsArray.map((item, i) => item.indexOf(str) >= 0 ? i : -1).filter(item => item >= 0);
      $items.hide().filter(function () {        
        return resultArray.some(el => el === $(this).index())
      }).show();
    })
    
    // Показать/скрыть категорию фильтра
    $('.block.filters').on('click', '.filter-arrow', function(){
      var $title = $(this).parent();
      
      if($title.hasClass('_main')){
        return;
      }
      
      $title.toggleClass('active').parent().find('.layout-slider, .filter-inner,.filter-search').slideToggle();
    });
    // Сборосить категорию фильтра
    $('.block.filters').on('click', '.filter-reset', function(){
      var $parent = $(this).closest('.filter');
      var $checkboxes = $parent.find('[type="checkbox"]')

      $checkboxes.prop('checked', false).attr('checked', false);
      $('#filters-form')[0].submit();
    });
    
    $('.block.catalog').on('click', '.title', function(e){
      e.preventDefault();
      var $title = $(this);
      $title.toggleClass('_active');
      $title.next().toggle();
    });
    $('.filters-btn').on('click', function () {
      if( getClientWidth() <= 1199) {
        
        $('.block.filters').find('.content').addClass('_active');
        $('.overlay').addClass('_active');        
      }
    })
    $('.block.filters, .block.viewed').on('click', '.title', function(){
      if( getClientWidth() <= 991) {        
        var $title = $(this);
        
        $title.next('.content').addClass('_active');
        $('.overlay').addClass('_active');        
      }
    })
    
    $('.overlay, .content-close-btn').off('click').on('click', function(){
      $('.overlay').removeClass('_active');
      $('.filters .content, .viewed  .content').removeClass('_active');
    })
    
    // Показать все/скрыть
    $('.block.filters').on('click', '.filter-more', function(){
      var $btn = $(this);
      var offsetTop = $btn.siblings('.title').offset().top
  
      $btn.prev('.filter-inner').toggleClass('crop');
      
      if($btn.hasClass('active')){
        $btn.removeClass('active').find('.filter-moreText').text('Показать все');
        
        if(getClientWidth() > 992){
          $('html, body').animate({scrollTop: offsetTop})
        }
        
      } else {
        $btn.addClass('active').find('.filter-moreText').text('Скрыть');
      }
    }); 
    
    // ajax вывод товаров списком/таблицей без обновления страницы
    $('.OrderFilterForm').on('click', '.view-mode > a', function(){
      var href = document.location.href;
      var dataHref = $(this).data('href').slice(1);
      var browser = null;
      var qwe = navigator.userAgent;
      var separator = (href.indexOf('?') + 1) ? '&' : '?';
      
      if (qwe.search(/MSIE/) != -1) {browser = 'IE'};
      if (href.indexOf('#page-title') != -1) { href = href.replace('#page-title', '')}
      
      var url = (browser === 'IE') ? encodeURI(href + separator + dataHref) : (href + separator + dataHref);
  
      $('.products-ajax').addClass('fadeout');
      $('.products-container').prepend('<span class="content-loading"></span>');
      $.ajax({
        url: url,
        cache: false,
        success: function(d){
          $('.products-ajax').parent().html($(d).find('.products-ajax').parent().html());
          lozad().observe();
          $('.view-mode').html($(d).find('.view-mode').html());
          addto();
          addCart();
          quantity();
          // $(".mouseHoverImgCarousel").HoverMouseCarousel();
          tippyViewBtn();
        }
      });
    });  
    
}

// Боковое меню сохранение открытой вложенности
function accordion() {
    $('.block.catalog .parent:not(".active") a').next('.sub').css('display', 'none');
    $('.block.catalog .parent a .open-sub').click(function(event){
    event.preventDefault();
      if ($(this).closest('.parent').hasClass('active')) {
        $(this).parent().next('.sub').slideUp(600);
        $(this).closest('.parent').removeClass('active');
        $(this).closest('.open-sub').removeClass('active');
      } else {
        $(this).parent().next('.sub').slideDown(600);
        $(this).closest('.parent').addClass('active');
        $(this).closest('.open-sub').addClass('active');
      }
    });
  }