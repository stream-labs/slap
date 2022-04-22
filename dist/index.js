(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["slap"] = factory(require("react"), require("react-dom"));
	else
		root["slap"] = factory(root["react"], root["react-dom"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__156__, __WEBPACK_EXTERNAL_MODULE__386__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Immer": () => (/* binding */ un),
/* harmony export */   "applyPatches": () => (/* binding */ pn),
/* harmony export */   "castDraft": () => (/* binding */ K),
/* harmony export */   "castImmutable": () => (/* binding */ $),
/* harmony export */   "createDraft": () => (/* binding */ ln),
/* harmony export */   "current": () => (/* binding */ D),
/* harmony export */   "enableAllPlugins": () => (/* binding */ J),
/* harmony export */   "enableES5": () => (/* binding */ N),
/* harmony export */   "enableMapSet": () => (/* binding */ C),
/* harmony export */   "enablePatches": () => (/* binding */ T),
/* harmony export */   "finishDraft": () => (/* binding */ dn),
/* harmony export */   "freeze": () => (/* binding */ d),
/* harmony export */   "immerable": () => (/* binding */ L),
/* harmony export */   "isDraft": () => (/* binding */ r),
/* harmony export */   "isDraftable": () => (/* binding */ t),
/* harmony export */   "nothing": () => (/* binding */ H),
/* harmony export */   "original": () => (/* binding */ e),
/* harmony export */   "produce": () => (/* binding */ fn),
/* harmony export */   "produceWithPatches": () => (/* binding */ cn),
/* harmony export */   "setAutoFreeze": () => (/* binding */ sn),
/* harmony export */   "setUseProxies": () => (/* binding */ vn)
/* harmony export */ });
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(false){ var i, o; }throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[Q]}function t(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return true||0,U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function O(n){g(n),n.p.forEach(S),n.p=null}function g(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s){if( false&&0,r(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r(v))return;e.m=!1}if(t(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function D(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function N(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return false&&0,en.get(r,n)},set:function(r){var t=this[Q]; false&&0,en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.O&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.D,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=""+i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.D,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=R(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.O&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,O:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.D.set(n,!0),t.o.set(n,r),t.D.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.D.set(n,!1):r.D.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.D=new Map,i(n.t,(function(r){n.D.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=R(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,O:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{N:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){N(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return false&&0,on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return false&&0,en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?O(c):g(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.F&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; false&&(0);var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n},i.setUseProxies=function(r){r&&!B&&n(20),this.g=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fn);
//# sourceMappingURL=immer.esm.js.map


/***/ }),

/***/ 57:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({ value: true }));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 418:
/***/ ((module) => {

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 251:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
__webpack_require__(418);var f=__webpack_require__(156),g=60103;exports.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(251);
} else {}


/***/ }),

/***/ 18:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(527), exports);
__exportStar(__webpack_require__(338), exports);
__exportStar(__webpack_require__(62), exports);
__exportStar(__webpack_require__(225), exports);


/***/ }),

/***/ 686:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactModules = exports.createApp = exports.useScope = exports.useAppContext = exports.SlapContext = void 0;
const jsx_runtime_1 = __webpack_require__(893);
const react_1 = __importStar(__webpack_require__(156));
const hooks_1 = __webpack_require__(985);
const scope_1 = __webpack_require__(527);
const react_store_adapter_1 = __webpack_require__(160);
const store_1 = __webpack_require__(338);
exports.SlapContext = react_1.default.createContext(null);
function useAppContext() {
    return (0, react_1.useContext)(exports.SlapContext);
}
exports.useAppContext = useAppContext;
function useScope() {
    return useAppContext().servicesScope;
}
exports.useScope = useScope;
function createApp(Services = {}) {
    const rootScope = new scope_1.Scope(Object.assign(Object.assign({}, Services), { Store: store_1.Store, ReactStoreAdapter: react_store_adapter_1.ReactStoreAdapter }));
    const modulesScope = rootScope.createChildScope({}, { autoregister: true });
    rootScope.init(react_store_adapter_1.ReactStoreAdapter);
    return { servicesScope: rootScope, modulesScope };
}
exports.createApp = createApp;
function ReactModules(p) {
    const appScope = (0, hooks_1.useOnCreate)(() => p.app || createApp());
    return ((0, jsx_runtime_1.jsx)(exports.SlapContext.Provider, Object.assign({ value: appScope }, { children: p.children }), void 0));
}
exports.ReactModules = ReactModules;


/***/ }),

/***/ 985:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useForceUpdate = exports.getComponentName = exports.useComponentId = exports.useOnDestroy = exports.useOnCreate = void 0;
const react_1 = __importStar(__webpack_require__(156));
/**
 * onCreate shortcut
 * Helpful if you need to calculate an immutable initial state for a component
 */
function useOnCreate(cb) {
    return (0, react_1.useState)(cb)[0];
}
exports.useOnCreate = useOnCreate;
/**
 * onDestroy shortcut
 */
function useOnDestroy(cb) {
    (0, react_1.useEffect)(() => cb, []);
}
exports.useOnDestroy = useOnDestroy;
let nextComponentId = 1;
/**
 * Returns a unique component id
 * If DEBUG=true then the componentId includes a component name
 */
function useComponentId() {
    const DEBUG = false;
    return useOnCreate(() => (DEBUG ? `${nextComponentId++}_${getComponentName()}` : `${nextComponentId++}`));
}
exports.useComponentId = useComponentId;
/**
 * Get component name from the callstack
 * Use for debugging only
 */
function getComponentName() {
    try {
        throw new Error();
    }
    catch (e) {
        const error = e;
        const regex = / at ([A-Z]\w+) /;
        const componentName = error.stack.split('\n').find(message => message.match(regex)).match(regex)[1];
        return componentName;
    }
}
exports.getComponentName = getComponentName;
/**
 * Returns a function for force updating of the component
 * Use it only for frequently used components for optimization purposes
 *
 * Current implementation from
 * https://github.com/ant-design/ant-design/blob/master/components/_util/hooks/useForceUpdate.ts
 */
function useForceUpdate() {
    const [, forceUpdate] = react_1.default.useReducer(x => x + 1, 0);
    return forceUpdate;
}
exports.useForceUpdate = useForceUpdate;


/***/ }),

/***/ 62:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(985), exports);
__exportStar(__webpack_require__(160), exports);
__exportStar(__webpack_require__(686), exports);
__exportStar(__webpack_require__(985), exports);
__exportStar(__webpack_require__(309), exports);
__exportStar(__webpack_require__(878), exports);
__exportStar(__webpack_require__(31), exports);


/***/ }),

/***/ 160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComponentView = exports.ReactStoreAdapter = void 0;
const react_dom_1 = __webpack_require__(386);
const Store_1 = __webpack_require__(607);
const injector_1 = __webpack_require__(869);
class ReactStoreAdapter {
    constructor() {
        this.store = (0, injector_1.inject)(Store_1.Store);
        this.components = {};
        this.watchers = {};
        this.watchersOrder = [];
        this.updateIsInProgress = false;
    }
    registerComponent(moduleView, componentId, forceUpdate) {
        const componentView = new ComponentView(this.store, moduleView, componentId, forceUpdate);
        this.components[componentId] = componentView;
        return componentView;
    }
    destroyComponent(componentId) {
        const componentView = this.components[componentId];
        if (!componentView)
            return;
        componentView.setDestroyed();
        delete this.components[componentId];
    }
    init() {
        this.store.events.on('onReadyToRender', () => this.onMutation());
    }
    // TODO: rename to mount-component ?
    createWatcher(watcherId, cb) {
        this.watchersOrder.push(watcherId);
        this.watchers[watcherId] = cb;
        return watcherId;
    }
    removeWatcher(watcherId) {
        const ind = this.watchersOrder.findIndex(id => watcherId === id);
        this.watchersOrder.splice(ind, 1);
        delete this.watchers[watcherId];
    }
    onMutation() {
        this.updateUI();
    }
    updateUI() {
        if (this.updateIsInProgress) {
            console.error('Tried to update component state before component has been mounted.');
        }
        const watchersIds = [...this.watchersOrder];
        this.updateIsInProgress = true;
        try {
            // force update components
            (0, react_dom_1.unstable_batchedUpdates)(() => {
                watchersIds.forEach(id => {
                    this.watchers[id] && this.watchers[id]();
                    const component = this.components[id];
                    if (component.needUpdate()) {
                        component.forceUpdate();
                        component.setInvalidated(false);
                    }
                });
            });
        }
        finally {
            this.updateIsInProgress = false;
        }
    }
}
exports.ReactStoreAdapter = ReactStoreAdapter;
class ComponentView {
    constructor(store, stateView, id, forceUpdate) {
        this.store = store;
        this.stateView = stateView;
        this.id = id;
        this.forceUpdate = forceUpdate;
        this.isDestroyed = false;
        this.isMounted = false;
        this.isInvalidated = false;
        this.lastSnapshot = {
            affectedModules: {},
            props: null,
        };
    }
    makeSnapshot() {
        const snapshot = {
            affectedModules: {},
            props: {},
        };
        snapshot.affectedModules = this.store.listenAffectedModules(() => {
            snapshot.props = this.stateView.getSnapshot();
        });
        this.lastSnapshot = snapshot;
        return snapshot;
    }
    needUpdate() {
        return this.isInvalidated && this.isMounted && !this.isDestroyed;
    }
    setMounted() {
        this.isMounted = true;
    }
    setInvalidated(invalidated) {
        this.isInvalidated = invalidated;
    }
    setDestroyed() {
        this.isDestroyed = true;
        this.isMounted = false;
    }
}
exports.ComponentView = ComponentView;


/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModule = exports.useComponentView = void 0;
const react_1 = __webpack_require__(156);
const hooks_1 = __webpack_require__(985);
const useModuleInstance_1 = __webpack_require__(878);
const scope_1 = __webpack_require__(527);
const StateView_1 = __webpack_require__(32);
const store_1 = __webpack_require__(338);
const react_store_adapter_1 = __webpack_require__(160);
const utils_1 = __webpack_require__(225);
function useComponentView(module) {
    const forceUpdate = (0, hooks_1.useForceUpdate)();
    const { componentId, reactStore, component, provider } = (0, hooks_1.useOnCreate)(() => {
        const provider = (0, scope_1.getInstanceMetadata)(module).provider;
        const reactStore = provider.scope.resolve(react_store_adapter_1.ReactStoreAdapter);
        const store = provider.scope.resolve(store_1.Store);
        const componentName = (0, hooks_1.getComponentName)();
        const componentId = `${componentName}__${(0, scope_1.generateId)()}`;
        let moduleView = (0, StateView_1.createStateViewForModule)(module);
        const parentModuleView = provider.getMetadata('parentModuleView');
        if (parentModuleView) {
            moduleView = moduleView.mergeView(parentModuleView);
        }
        const component = reactStore.registerComponent(moduleView, componentId, forceUpdate);
        function extend(newPropsFactory) {
            const newProvider = provider.resolveChildProvider(() => newPropsFactory(moduleView.props), componentId);
            newProvider.setMetadata('parentModuleView', moduleView); // TODO remove metadata
            store.setModuleContext(componentId, provider.childScope);
            const result = useModule(componentId);
            store.resetModuleContext(componentId);
            return result;
        }
        moduleView.defineProp({
            type: 'extend',
            name: 'extend',
            getValue: () => extend,
        });
        moduleView.defineProp({
            type: 'ComponentView',
            name: 'componentView',
            getValue: () => component,
        });
        return {
            componentId, component, moduleView, reactStore, provider,
        };
    });
    (0, hooks_1.useOnDestroy)(() => {
        reactStore.destroyComponent(componentId);
        // // // TODO find better way of detecting one-off modules
        // const shouldDestroyModule = provider.instanceId.includes('__component__');
        // if (shouldDestroyModule) provider.scope.
    });
    (0, react_1.useLayoutEffect)(() => {
        const stateView = component.stateView;
        if (!stateView.hasSelectedProps)
            return;
        component.makeSnapshot();
        // TODO do not run watchers for non-observable component views
        const watcherId = reactStore.createWatcher(component.id, () => {
            if (provider.isDestroyed)
                return;
            const prevSnapshot = component.lastSnapshot;
            // console.log('START SNAPSHOT FOR', componentId);
            const newSnapshot = component.makeSnapshot();
            // console.log('FINISH SNAPSHOT FOR', componentId, newSnapshot);
            // if (isSimilar(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
            //   // no modules changed, do not call compare props
            //   return;
            // }
            // console.log('compare ', componentId);
            if (!(0, utils_1.isSimilar)(prevSnapshot.props, newSnapshot.props)) {
                // console.log('should render ', componentId);
                component.setInvalidated(true);
            }
        });
        return () => {
            reactStore.removeWatcher(watcherId);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        component.setMounted();
    }, []);
    return component.stateView.proxy;
}
exports.useComponentView = useComponentView;
function useModule(locator, initProps = null, moduleName = '') {
    const module = (0, useModuleInstance_1.useModuleInstance)(locator, initProps, moduleName);
    return useComponentView(module);
}
exports.useModule = useModule;


/***/ }),

/***/ 878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModuleInstance = void 0;
const react_1 = __webpack_require__(156);
const hooks_1 = __webpack_require__(985);
const ReactModules_1 = __webpack_require__(686);
const Store_1 = __webpack_require__(607);
function useModuleInstance(locator, initProps = null, name = '') {
    const { modulesScope, servicesScope } = (0, ReactModules_1.useAppContext)();
    const { instance, moduleName, scope, isRoot, shouldInitInNewScope, isService, store, } = (0, hooks_1.useOnCreate)(() => {
        var _a;
        let moduleName = name || typeof locator === 'string' ? locator : locator.name;
        const store = modulesScope.resolve(Store_1.Store);
        const shouldInitInNewScope = !!initProps;
        let scope;
        let isRoot = false;
        let isService = false;
        if (shouldInitInNewScope) {
            scope = modulesScope.registerScope();
            isRoot = true;
            const provider = scope.register(locator);
            moduleName = provider.name;
            const constructorArgs = Array.isArray(initProps) ? initProps : [];
            const instance = scope.init(moduleName, ...constructorArgs);
        }
        else {
            scope = (_a = store.currentContext[moduleName]) !== null && _a !== void 0 ? _a : modulesScope;
            const provider = scope.isRegistered(moduleName) ? scope.resolveProvider(moduleName) : scope.register(locator);
            isService = servicesScope.id === provider.scope.id;
            moduleName = provider.name;
            if (!isService && !provider.instance)
                isRoot = true;
        }
        const provider = scope.resolveProvider(moduleName);
        const instance = scope.resolve(moduleName);
        return {
            instance,
            store,
            isRoot,
            scope,
            moduleName,
            provider,
            shouldInitInNewScope,
            isService,
        };
    });
    isRoot && store.setModuleContext(moduleName, scope);
    (0, react_1.useEffect)(() => {
        isRoot && store.resetModuleContext(moduleName);
    }, []);
    // unregister the component from the module onDestroy
    (0, hooks_1.useOnDestroy)(() => {
        if (isService || !isRoot)
            return;
        store.resetModuleContext(moduleName);
        if (shouldInitInNewScope) {
            scope.dispose();
        }
        else {
            scope.unregister(moduleName);
        }
    });
    return instance;
}
exports.useModuleInstance = useModuleInstance;


/***/ }),

/***/ 31:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//
// export function useSelector(cb: Function) {
//   const affectedModulesRef = useRef<Record<string, number>>({});
//   const currentSelectorStateRef = useRef<Record<string, any>>({});
//   const forceUpdate = useForceUpdate();
//   const scope = useAppContext().modulesScope;
//   const store = scope.resolve(Store);
//   const reactStore = scope.resolve(ReactStoreAdapter);
//
//   useEffect(() => {
//     affectedModulesRef.current = store.listenAffectedModules(() => {
//       currentSelectorStateRef.current = cb();
//     });
//
//     // TODO do not run watchers for non-observable component views
//
//     const watcherId = reactStore.createWatcher(() => {
//       const prevRevisions = affectedModulesRef.current;
//       const currentRevisions = store.moduleRevisions;
//
//       let modulesHasChanged = false;
//       for (const moduleName in prevRevisions) {
//         if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
//           modulesHasChanged = true;
//           break;
//         }
//
//         if (!modulesHasChanged) {
//           // dependent modules don't have changes in the state
//           // do not re-render
//           return;
//         }
//       }
//
//       const prevSelectorState = currentSelectorStateRef.current;
//
//       affectedModulesRef.current = store.listenAffectedModules(() => {
//         currentSelectorStateRef.current = cb();
//       });
//
//       if (!isSimilar(prevSelectorState, currentSelectorStateRef.current)) {
//         // TODO try batched updates
//         forceUpdate();
//       }
//     });
//     return () => {
//       reactStore.removeWatcher(watcherId);
//     };
//   }, []);
// }


/***/ }),

/***/ 158:
/***/ ((__unused_webpack_module, exports) => {


// implements a `Flatten` type helper
// https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(422), exports);
__exportStar(__webpack_require__(521), exports);
__exportStar(__webpack_require__(370), exports);
__exportStar(__webpack_require__(869), exports);
__exportStar(__webpack_require__(387), exports);
__exportStar(__webpack_require__(986), exports);
__exportStar(__webpack_require__(158), exports);


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectProvider = exports.injectScope = exports.inject = exports.ModuleInjectorType = exports.createInjector = exports.Injector = void 0;
const utils_1 = __webpack_require__(986);
const scope_1 = __webpack_require__(521);
class Injector {
    constructor(provider) {
        this.provider = provider;
        this.id = (0, utils_1.generateId)();
        this.loadingStatus = 'not-started';
        this.propertyName = '';
        this.isDestroyed = false;
        provider.registerInjector(this);
    }
    init() {
        this.params.init && this.params.init();
    }
    load() {
        // const load = this.params.load;
        // const loadResult = load && load() as any;
        // if (loadResult && loadResult.then) {
        //   this.setLoadingStatus('loading');
        //   loadResult.then(() => {
        //     this.setLoadingStatus('done');
        //   });
        // } else {
        //   this.loadingStatus = 'done';
        // }
    }
    setPropertyName(propertyName) {
        this.propertyName = propertyName;
        const getValue = this.params.getValue;
        if (getValue) {
            (0, utils_1.defineGetter)(this.provider.instance, propertyName, getValue);
        }
    }
    setLoadingStatus(loadingStatus) {
        // if (this.isDestroyed) return;
        // const prevStatus = this.loadingStatus;
        // this.loadingStatus = loadingStatus;
        // this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
    }
    // onDestroy() {
    //   this.params.onDestroy && this.params.onDestroy();
    //   this.isDestroyed = true;
    // }
    resolveValue() {
        return this.params.getValue();
    }
    getComponentData() {
        const componentData = this.params.exportComponentData && this.params.exportComponentData();
        if (!componentData) {
            return ({
                self: null,
                extra: null,
            });
        }
        return componentData;
    }
    get type() {
        return this.params.type;
    }
}
exports.Injector = Injector;
function createInjector(paramsCreator) {
    const provider = (0, scope_1.getCurrentProvider)();
    if (!provider) {
        throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.resolve() or Scope.init() or Scope.create()');
    }
    const injector = new Injector(provider);
    injector.params = paramsCreator(injector);
    injector.init();
    const value = injector.resolveValue();
    const returnValue = value instanceof Object ? value : {};
    const injectorProxy = new Proxy(returnValue, {
        get(target, p) {
            return p === '__injector' ? injector : target[p];
        },
    });
    return injectorProxy;
}
exports.createInjector = createInjector;
// DEFINE BUILT-IN INJECTORS
exports.ModuleInjectorType = Symbol('moduleInjector');
// export function inject<T extends TModuleClass>(ModuleClass: T) {
//   return createInjector(injector => ({
//     type: ModuleInjectorType,
//     getValue: () => injector.provider.scope.resolve(ModuleClass),
//   }));
// }
function inject(ModuleClass) {
    const provider = injectProvider();
    const module = provider.scope.resolve(ModuleClass);
    return module;
}
exports.inject = inject;
function injectScope() {
    return (0, scope_1.getCurrentScope)();
}
exports.injectScope = injectScope;
function injectProvider() {
    return (0, scope_1.getCurrentProvider)();
}
exports.injectProvider = injectProvider;


/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInstanceMetadata = exports.createInstanceMetadata = exports.Provider = void 0;
const nanoevents_1 = __webpack_require__(111);
const is_plain_object_1 = __webpack_require__(57);
const utils_1 = __webpack_require__(986);
class Provider {
    constructor(scope, creator, name = '', options = {}) {
        this.scope = scope;
        this.creator = creator;
        this.name = name;
        this.options = options;
        this.instance = null;
        this.metadata = {};
        this.injectors = {}; // dict of injectors by id
        this.isInited = false; // true if instance is added to the Scope
        this.isDestroyed = false;
        // private resolveInit!: Function;
        // waitForInit = new Promise(resolve => { this.resolveInit = resolve });
        this.injectionCompleted = false;
        this.loadMethodCompleted = false;
        this.isAsync = false;
        this.isLoaded = false;
        this.waitForLoad = new Promise(resolve => { this.resolveLoad = resolve; });
        this.childScope = null;
        this.childModules = {};
        this.events = (0, nanoevents_1.createNanoEvents)();
        if (!this.name)
            this.name = `AnonymousProvider__${(0, utils_1.generateId)()}`;
        this.id = `${this.name}__${this.scope.id}__${(0, utils_1.generateId)()}`;
        // setup default provider options
        this.options = Object.assign({ shouldCallHooks: true }, this.options);
        if (typeof creator === 'function') {
            if ((0, utils_1.isClass)(creator)) {
                this.factory = (args) => new creator(...args);
                return;
            }
            // creator is a function
            this.factory = args => creator(...args);
            return;
        }
        // creator is an object
        if ((0, is_plain_object_1.isPlainObject)(creator)) {
            this.factory = () => creator;
            return;
        }
        throw new Error(`Can not construct the object ${creator}`);
    }
    createInstance(args) {
        const instance = this.factory(args);
        this.instance = instance;
        this.initParams = args;
        createInstanceMetadata(instance, this);
        return instance;
    }
    mountModule() {
        Object.keys(this.childModules).forEach(childName => {
            const childModuleProvider = getInstanceMetadata(this.childModules[childName]).provider;
            childModuleProvider.mountModule();
        });
        if (this.options.shouldCallHooks) {
            const instance = this.instance;
            const provider = this;
            this.events.emit('onBeforeInit', provider);
            instance.init && instance.init();
            this.events.emit('onAfterInit', provider);
        }
        this.isInited = true;
    }
    //
    // setInited() {
    //   this.isInited = true;
    //   // this.events.emit('onModuleInit');
    //   // this.checkModuleIsLoaded();
    // }
    registerInjector(injector) {
        this.injectors[injector.id] = injector;
    }
    // private resolveInjectedProps() {
    //   const provider = this;
    //   const instance = provider.instance;
    //   const descriptors = Object.getOwnPropertyDescriptors(instance);
    //
    //   // set propetyNames for injectors
    //   Object.keys(descriptors).forEach(propName => {
    //     const descriptor = descriptors[propName];
    //     if (descriptor.get) return; // don't execute getters
    //     const propValue = descriptor.value;
    //     if (!(propValue?.__injector)) return;
    //     const injector = propValue.__injector as Injector<unknown, unknown, unknown>;
    //     injector.setPropertyName(propName);
    //   });
    // }
    //
    // private loadInjectors() {
    //   let hasAsyncInjectors = false;
    //   // call load() for injectors
    //   Object.values(this.injectors).forEach(injector => {
    //     injector.load();
    //     if (injector.loadingStatus !== 'done') hasAsyncInjectors = true;
    //   });
    //
    //   if (hasAsyncInjectors) {
    //     this.isAsync = true;
    //   } else {
    //     this.handleInjectionsCompleted();
    //   }
    // }
    getMetadata(pluginName) {
        return this.metadata[pluginName];
    }
    setMetadata(pluginName, data) {
        this.metadata[pluginName] = data;
        return data;
    }
    // destroy provider
    destroy() {
        this.destroyInstance();
        // unsubscribe events
        this.events.events = {};
    }
    destroyInstance() {
        var _a;
        const instance = this.instance;
        if (!instance)
            return;
        // destroy instance
        instance.onDestroy && instance.onDestroy();
        this.initParams = [];
        // destroy child modules
        (_a = this.childScope) === null || _a === void 0 ? void 0 : _a.dispose();
        this.childModules = {};
        this.isDestroyed = true;
        this.instance = null;
        this.isInited = false;
    }
    // handleInjectorStatusChange(
    //   injector: Injector<unknown, unknown, unknown>,
    //   currentStatus: TLoadingStatus,
    //   prevStatus: TLoadingStatus,
    // ) {
    //   this.events.emit('onInjectorStatusChange', injector, currentStatus, prevStatus);
    //   this.checkInjectionIsCompleted();
    // }
    // protected checkInjectionIsCompleted() {
    //   if (!this.injectionCompleted) {
    //     const injectors = Object.values(this.injectors);
    //     for (const injector of injectors) {
    //       if (injector.loadingStatus !== 'done') return;
    //     }
    //   }
    //   this.handleInjectionsCompleted();
    // }
    // protected handleInjectionsCompleted() {
    //   this.injectionCompleted = true;
    //
    //   if (this.options.shouldCallHooks) {
    //     const instance = this.instance as any;
    //     const loadResult = instance.load && instance.load();
    //     if (loadResult?.then) {
    //       this.isAsync = true;
    //       loadResult.then(() => {
    //         this.loadMethodCompleted = true;
    //         this.checkModuleIsLoaded();
    //       });
    //       return;
    //     }
    //   }
    //
    //   this.loadMethodCompleted = true;
    //   this.checkModuleIsLoaded();
    // }
    // protected checkModuleIsLoaded() {
    //   if (!this.isInited) return;
    //   if (!this.injectionCompleted) return;
    //   if (!this.loadMethodCompleted) return;
    //
    //   if (this.options.shouldCallHooks) {
    //     const instance = this.instance as any;
    //     instance.onLoad && instance.onLoad();
    //   }
    //
    //   this.isLoaded = true;
    //   this.resolveLoad();
    //   this.events.emit('onModuleLoaded');
    // }
    get instanceId() {
        return getInstanceMetadata(this.instance).id;
    }
    resolveChildScope() {
        if (!this.childScope)
            this.childScope = this.scope.createChildScope();
        return this.childScope;
    }
    resolveChildProvider(ModuleCreator, name) {
        const childScope = this.resolveChildScope();
        if (!childScope.isRegistered(name)) {
            childScope.register(ModuleCreator, name);
        }
        return childScope.resolveProvider(name);
    }
    injectChildModule(ModuleCreator, ...args) {
        const childScope = this.resolveChildScope();
        const name = `${this.id}__child_${ModuleCreator.name || ''}_${(0, utils_1.generateId)()}`;
        childScope.register(ModuleCreator, name, { parentProvider: this });
        const childModule = childScope.init(name, ...args);
        this.childModules[name] = childModule;
        const returnValue = childModule.exportInjectorValue ? childModule.exportInjectorValue() : childModule;
        return returnValue;
    }
}
exports.Provider = Provider;
function createInstanceMetadata(instance, provider) {
    const id = `${provider.id}__${(0, utils_1.generateId)()}`;
    const descriptor = { enumerable: false, configurable: false };
    (0, utils_1.defineGetter)(instance, '__instanceId', () => id, descriptor);
    (0, utils_1.defineGetter)(instance, '__provider', () => provider, descriptor);
}
exports.createInstanceMetadata = createInstanceMetadata;
function getInstanceMetadata(instance) {
    const provider = instance.__provider;
    if (!provider) {
        throw new Error(`Provider non found for a given instance ${instance}`);
    }
    return {
        provider,
        id: instance.__instanceId,
    };
}
exports.getInstanceMetadata = getInstanceMetadata;


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCurrentProvider = exports.getCurrentScope = exports.Scope = void 0;
const nanoevents_1 = __webpack_require__(111);
const utils_1 = __webpack_require__(986);
const provider_1 = __webpack_require__(370);
let currentScope = null;
let currentProvider = null;
let unmountedModulesCount = 0;
const defaultScopeSettings = {
    parentScope: null,
    autoregister: false,
};
/**
 * A Dependency injection container
 */
class Scope {
    constructor(dependencies = {}, settings = {}) {
        this.childScopes = {};
        this.providers = {};
        this.events = (0, nanoevents_1.createNanoEvents)();
        const uid = (0, utils_1.generateId)();
        const parentScope = settings === null || settings === void 0 ? void 0 : settings.parentScope;
        this.id = parentScope ? `${parentScope.id}__${uid}` : `root_${uid}`;
        this.settings = parentScope
            ? Object.assign(Object.assign({}, parentScope.settings), settings) : Object.assign(Object.assign({}, defaultScopeSettings), settings);
        dependencies && this.registerMany(dependencies);
    }
    registerMany(dependencies) {
        Object.keys(dependencies).forEach(depName => this.register(dependencies[depName], depName));
    }
    register(ModuleCreator, name, options) {
        const moduleName = name || ModuleCreator.name || `AnonymousModule_${(0, utils_1.generateId)()}`;
        if (this.providers[moduleName]) {
            throw new Error(`${moduleName} already registered in the given Scope`);
        }
        const provider = new provider_1.Provider(this, ModuleCreator, moduleName, options);
        this.providers[moduleName] = provider;
        this.events.emit('onModuleRegister', provider);
        return provider;
    }
    getProvider(moduleLocator) {
        const moduleName = typeof moduleLocator === 'string' ? moduleLocator : moduleLocator.name;
        if (!moduleName)
            return null;
        const provider = this.providers[moduleName];
        if (provider)
            return provider;
        if (!this.parent)
            return null;
        return this.parent.getProvider(moduleName);
    }
    resolveProvider(moduleLocator) {
        const provider = this.getProvider(moduleLocator);
        if (provider)
            return provider;
        const shouldRegister = this.settings.autoregister && typeof moduleLocator !== 'string';
        if (shouldRegister)
            return this.register(moduleLocator);
        throw new Error(`Provider not found ${moduleLocator}`);
    }
    getInstance(locator) {
        const provider = this.getProvider(locator);
        return provider ? provider.instance : null;
    }
    resolve(locator) {
        const provider = this.resolveProvider(locator);
        if (provider.instance)
            return provider.instance;
        return this.init(locator, ...[]);
    }
    unregister(locator) {
        const provider = this.getProvider(locator);
        if (!provider)
            return;
        provider.destroy();
        delete this.providers[provider.name];
    }
    // helper methods
    isRegistered(moduleLocator) {
        return !!this.getProvider(moduleLocator);
    }
    hasInstance(moduleLocator) {
        const provider = this.resolveProvider(moduleLocator);
        return !!(provider === null || provider === void 0 ? void 0 : provider.instance);
    }
    /**
     * Instantiate a registered module
     * TODO type for args
     */
    init(locator, ...args) {
        const provider = this.resolveProvider(locator);
        if (provider.instance) {
            throw new Error(`The module ${provider.name} is already inited in the given scope`);
        }
        unmountedModulesCount++;
        const instance = this.create(locator, ...args);
        unmountedModulesCount--;
        if (!unmountedModulesCount)
            provider.mountModule();
        return instance;
    }
    // /**
    //  * Register and instantiate a module
    //  * TODO add type for args
    //  */
    // start<T extends TModuleCreator>(creator: T, ...args: any[]): TModuleInstanceFor<T> {
    //   this.register(creator);
    //   const instance = this.init(creator, ...args as any);
    //   return instance;
    // }
    /**
     * create the instance and resolve injections
     * every time returns a new instance
     */
    // TODO add type for args
    create(locator, ...args) {
        const prevScope = currentScope;
        currentScope = this;
        let provider;
        const isRegistered = this.isRegistered(locator);
        if (isRegistered) {
            provider = this.resolveProvider(locator);
        }
        else {
            provider = new provider_1.Provider(this, locator);
        }
        const prevProvider = currentProvider;
        currentProvider = provider;
        const instance = provider.createInstance(args);
        currentScope = prevScope;
        currentProvider = prevProvider;
        // if (isRegistered) {
        //   provider.events.on('onModuleLoaded', () => {
        //     this.events.emit('onModuleLoad', provider);
        //   });
        //   this.events.emit('onModuleInit', provider);
        //   provider.setInited();
        // }
        return instance;
    }
    createChildScope(dependencies, settings) {
        return new Scope(dependencies, Object.assign(Object.assign({}, settings), { parentScope: this }));
    }
    // TODO refactor
    registerScope(dependencies, settings) {
        const scope = this.createChildScope({}, settings);
        this.childScopes[scope.id] = scope;
        scope.events = this.events;
        dependencies && scope.registerMany(dependencies);
        return scope;
    }
    unregisterScope(scopeId) {
        const scope = this.childScopes[scopeId];
        if (!scope)
            throw new Error(`Can not unregister Scope ${scopeId} - Scope not found`);
        scope.dispose();
        delete this.childScopes[scopeId];
    }
    getRootScope() {
        if (!this.parent)
            return this;
        return this.parent.getRootScope();
    }
    dispose() {
        // destroy child scopes
        Object.keys(this.childScopes).forEach(scopeId => {
            this.unregisterScope(scopeId);
        });
        // destroy providers
        Object.keys(this.providers).forEach(providerName => {
            this.providers[providerName].destroy();
            delete this.providers[providerName];
        });
        // unsubscribe events
        if (!this.parent)
            this.events.events = {};
    }
    getScheme() {
        return {
            id: this.id,
            registry: this.providers,
            parentScope: this.parent ? this.parent.getScheme() : null,
        };
    }
    get isRoot() {
        return !!this.parent;
    }
    get parent() {
        return this.settings.parentScope;
    }
}
exports.Scope = Scope;
function getCurrentScope() {
    return currentScope;
}
exports.getCurrentScope = getCurrentScope;
function getCurrentProvider() {
    return currentProvider;
}
exports.getCurrentProvider = getCurrentProvider;


/***/ }),

/***/ 387:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subscription = exports.Subject = void 0;
const nanoevents_1 = __webpack_require__(111);
class Subject {
    constructor() {
        this.emitter = (0, nanoevents_1.createNanoEvents)();
    }
    subscribe(cb) {
        const unsubscribe = this.emitter.on('next', cb);
        return new Subscription(unsubscribe);
    }
    next(data) {
        this.emitter.emit('next', data);
    }
}
exports.Subject = Subject;
class Subscription {
    constructor(unsubscribe) {
        this.unsubscribe = unsubscribe;
    }
}
exports.Subscription = Subscription;


/***/ }),

/***/ 986:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isClass = exports.capitalize = exports.defineSetter = exports.defineGetter = exports.forEach = exports.hasGetter = exports.getDefined = exports.assertIsDefined = exports.generateId = void 0;
let idCounter = 1;
function generateId() {
    return (idCounter++).toString();
}
exports.generateId = generateId;
function assertIsDefined(val) {
    if (val === undefined || val === null) {
        throw new Error(`Expected 'val' to be defined, but received ${val}`);
    }
}
exports.assertIsDefined = assertIsDefined;
function getDefined(val) {
    assertIsDefined(val);
    return val;
}
exports.getDefined = getDefined;
function hasGetter(instance, getterName) {
    const stateDescriptor = Object.getOwnPropertyDescriptor(instance, getterName);
    return !!(stateDescriptor === null || stateDescriptor === void 0 ? void 0 : stateDescriptor.get);
}
exports.hasGetter = hasGetter;
function forEach(dict, cb) {
    Object.keys(dict).forEach(propName => {
        cb(dict[propName], propName);
    });
}
exports.forEach = forEach;
function defineGetter(target, methodName, getter, descriptor) {
    var _a, _b;
    Object.defineProperty(target, methodName, {
        configurable: (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable) !== null && _a !== void 0 ? _a : true,
        enumerable: (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.enumerable) !== null && _b !== void 0 ? _b : true,
        get: getter,
    });
}
exports.defineGetter = defineGetter;
function defineSetter(target, methodName, setter, descriptor) {
    var _a, _b;
    Object.defineProperty(target, methodName, {
        configurable: (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable) !== null && _a !== void 0 ? _a : true,
        enumerable: (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.enumerable) !== null && _b !== void 0 ? _b : true,
        set: setter,
    });
}
exports.defineSetter = defineSetter;
function capitalize(srt) {
    return srt.charAt(0).toUpperCase() + srt.slice(1);
}
exports.capitalize = capitalize;
function isClass(object) {
    // TODO find a better way to distinguish Class and Function
    return typeof object === 'function' && object.name && object.name.charAt(0) === object.name.charAt(0).toUpperCase();
}
exports.isClass = isClass;


/***/ }),

/***/ 32:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createStateViewForModule = exports.StateView = void 0;
// composition layer
// construct a ReactiveObject based on given presets
// has module,stateSelector and allow extending
const scope_1 = __webpack_require__(527);
const provider_1 = __webpack_require__(370);
const pickProps_1 = __webpack_require__(49);
const plugins_1 = __webpack_require__(837);
class StateView {
    constructor(scope) {
        this.scope = scope;
        this.props = {};
        this.descriptors = {};
        this.selectedDescriptors = {};
        this.hasReactiveProps = false;
        this.hasSelectedProps = false;
        this.hasWildcardProps = false;
        this.wildcardPropCreator = null;
        this.proxy = new Proxy({
            __proxyName: 'StateViewProxy',
            __target: this,
        }, {
            get: (target, propName) => {
                if (propName === 'hasOwnProperty')
                    return target.hasOwnProperty;
                if (propName in target)
                    return target[propName];
                const value = this.selectValue(propName);
                return value;
            },
        });
    }
    defineProp(descriptorParams) {
        const descriptor = Object.assign({ configurable: true, enumerable: true, reactive: false, getRev: descriptorParams.getValue, stateView: null, dynamic: false }, descriptorParams);
        this.descriptors[descriptor.name] = descriptor;
        if (descriptor.reactive)
            this.hasReactiveProps = true;
        // const getValue = descriptor.stateView ? () => descriptor.stateView!.props : () => descriptor.getValue;
        // defineGetter(this.props as any, descriptor.name, getValue);
        (0, scope_1.defineGetter)(this.props, descriptor.name, () => descriptor.getValue());
    }
    defineWildcardProp(cb) {
        this.hasWildcardProps = true;
        this.wildcardPropCreator = cb;
    }
    selectValue(propName) {
        let descriptor = this.descriptors[propName];
        if (!descriptor) {
            if (!this.wildcardPropCreator) {
                throw new Error(`Property ${propName} is not defined`);
            }
            this.wildcardPropCreator(propName);
            descriptor = this.descriptors[propName];
        }
        if (descriptor.reactive) {
            this.selectedDescriptors[propName] = descriptor;
            if (!this.hasSelectedProps)
                this.hasSelectedProps = true;
            if (descriptor.stateView)
                return descriptor.stateView.proxy;
        }
        return descriptor.getValue();
    }
    getSnapshot() {
        const selectedDescriptors = this.selectedDescriptors;
        const props = {};
        (0, scope_1.forEach)(selectedDescriptors, (descr, propName) => {
            let value;
            if (descr.stateView) {
                const getRev = descr.stateView.descriptors.getRev;
                if (getRev) {
                    value = getRev.getValue();
                }
                else {
                    value = descr.stateView.getSnapshot();
                }
            }
            else {
                value = descr.getRev();
            }
            props[propName] = value;
        });
        return props;
    }
    // use for debugging
    get selectedProps() {
        const selectedDescriptors = this.selectedDescriptors;
        const result = {};
        (0, scope_1.forEach)(selectedDescriptors, (descr, propName) => {
            if (!descr.reactive)
                return;
            // @ts-ignore
            result[propName] = descr.getRev();
        });
        return result;
    }
    getAnalytics() {
        // TODO ?
    }
    // DEFINE MULTIPLE WAYS FOR EXTENDING THE ModuleView
    // TODO: remove overloads that we will never use
    /**
     * // Extend with a factory returning a new ModuleView
     *
     * module.extend((props, view) => {
     *   const module = scope.resolve(MyModule)
     *   return new ModuleView(module)
     * })
     */
    select(newViewFactory) {
        return newViewFactory(this.props, this);
    }
    // eslint-disable-next-line no-dupe-class-members
    // extend<TNewProps>(newPropsFactory: (props: TProps, view: StateView<TProps>) => TNewProps, name: string): ExtendView<TProps, TNewProps> {
    //   if (!this.scope) {
    //     throw new Error('You should define a Scope to use .extend()');
    //   }
    //
    //   if (!this.scope.isRegistered(name)) {
    //     const factory = () => newPropsFactory(this.props, this);
    //     const provider = this.scope.register(factory, name);
    //     const extendedModule = this.scope.resolve(name);
    //     const extendedModuleView = createStateViewForModule(extendedModule);
    //     const mergedView = this.mergeView(extendedModuleView);
    //     provider.setMetadata('StateView', mergedView);
    //     // TODO destroy module after component destroy, create a component scope
    //   }
    //
    //   const provider = this.scope.resolveProvider(name);
    //   const extendedView = provider.getMetadata('StateView');
    //   return extendedView;
    // }
    clone() {
        const clone = new StateView(this.scope);
        (0, scope_1.forEach)(this.descriptors, descriptor => clone.defineProp(descriptor));
        return clone;
    }
    mergeView(extension) {
        // merge one view into another
        const mergeResult = this.clone();
        (0, scope_1.forEach)(extension.descriptors, descriptor => mergeResult.defineProp(descriptor));
        return mergeResult;
    }
}
exports.StateView = StateView;
function createStateViewForModule(module) {
    const scope = (0, provider_1.getInstanceMetadata)(module).provider.scope;
    const stateView = new StateView(scope);
    return stateView
        .select((0, pickProps_1.pickProps)(module)) // expose the module props
        .select((0, plugins_1.pickInjectors)(module)); // expose injectors
}
exports.createStateViewForModule = createStateViewForModule;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultStateConfig = exports.StateController = exports.Store = void 0;
const immer_1 = __importDefault(__webpack_require__(172));
const nanoevents_1 = __webpack_require__(111);
const scope_1 = __webpack_require__(527);
const traverse_1 = __webpack_require__(222);
const parse_config_1 = __webpack_require__(890);
const StateView_1 = __webpack_require__(32);
/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
 */
class Store {
    constructor() {
        // keeps the state for all modules here as a map of immutable objects
        this.rootState = {};
        // keeps additional metadata
        this.modulesMetadata = {};
        this.pendingMutations = 0;
        this.moduleRevisions = {};
        this.recordingAccessors = 0;
        this.affectedModules = {};
        this.currentContext = {};
        this.events = (0, nanoevents_1.createNanoEvents)();
    }
    createState(moduleName, configCreator) {
        if (this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName]) {
            throw new Error(`State with a name "${moduleName}" is already created`);
        }
        const config = (0, parse_config_1.parseStateConfig)(configCreator);
        console.log('REGISTER STORE', moduleName);
        const controller = new StateController(this, moduleName, config);
        return controller;
    }
    dispatchMutation(mutation) {
        console.log('RUN MUTATION', mutation);
        const moduleName = mutation.moduleName;
        const metadata = this.modulesMetadata[moduleName];
        if (!metadata)
            return; // state is destroyed
        const stateController = this.modulesMetadata[moduleName].controller;
        if (this.pendingMutations) {
            throw new Error('Can not run mutation while previous mutation is not completed');
        }
        stateController.mutate(mutation);
    }
    toJSON() {
        // TODO use for debugging
        JSON.stringify(this.rootState);
    }
    destroyModule(moduleName) {
        delete this.rootState[moduleName];
        delete this.modulesMetadata[moduleName];
        console.log('UNREGISTER MODULE', moduleName);
    }
    listenAffectedModules(cb) {
        this.recordingAccessors++;
        cb();
        const result = this.affectedModules;
        this.recordingAccessors--;
        if (!this.recordingAccessors) {
            this.affectedModules = {};
        }
        return result;
    }
    setModuleContext(moduleName, scope) {
        this.currentContext[moduleName] = scope;
    }
    resetModuleContext(moduleName) {
        delete this.currentContext[moduleName];
    }
    getMetadata(moduleName) {
        return this.modulesMetadata[moduleName];
    }
    getController(moduleName) {
        var _a;
        return (_a = this.getMetadata(moduleName)) === null || _a === void 0 ? void 0 : _a.controller;
    }
}
exports.Store = Store;
class StateController {
    constructor(store, moduleName, config) {
        this.store = store;
        this.moduleName = moduleName;
        this.draftState = null;
        const defaultState = config.state;
        store.rootState[moduleName] = Object.assign({}, defaultState);
        // create metadata
        const controller = this;
        const getters = {};
        const metadata = {
            config,
            controller,
            getters,
            isInitialized: false,
            rev: 0,
        };
        store.modulesMetadata[moduleName] = metadata;
        // generate getters
        Object.keys(defaultState).forEach(propName => {
            const getter = () => controller.state[propName];
            (0, scope_1.defineGetter)(controller, propName, getter);
            (0, scope_1.defineGetter)(getters, propName, getter);
            (0, scope_1.defineSetter)(controller, propName, val => {
                const changeIsAllowed = !metadata.isInitialized || controller.draftState;
                if (!changeIsAllowed) {
                    console.error(`Failed to set "${propName}" with value`, val);
                    throw new Error('Changing state outside of mutation');
                }
                controller.state[propName] = val;
                return true;
            });
        });
        Object.keys(config.getters).forEach(propName => {
            const getter = () => config.getters[propName].get.apply(controller);
            (0, scope_1.defineGetter)(controller, propName, getter);
            (0, scope_1.defineGetter)(getters, propName, getter);
        });
        Object.keys(config.getterMethods).forEach(propName => {
            (0, scope_1.defineGetter)(controller, propName, () => (...args) => config.getterMethods[propName].apply(controller, args));
        });
        // create auto-generated mutations
        Object.keys(defaultState).forEach(propertyName => {
            const mutationName = `set${(0, scope_1.capitalize)(propertyName)}`;
            if (config.mutations[mutationName])
                return;
            const mutationMethod = (propVal) => controller[propertyName] = propVal;
            config.mutations[mutationName] = mutationMethod;
            controller.registerMutation(mutationName, mutationMethod);
        });
        // create default mutations
        this.registerDefaultMutations();
        // create other mutations
        Object.keys(config.mutations).forEach(propName => {
            this.registerMutation(propName, config.mutations[propName]);
        });
    }
    finishInitialization() {
        // use immer to lock an immutable state
        this.getMetadata().isInitialized = true;
        this.store.rootState[this.moduleName] = (0, immer_1.default)(this.store.rootState[this.moduleName], () => { });
    }
    registerMutation(mutationName, mutationMethod) {
        const controller = this;
        const { store, moduleName } = controller;
        if (!controller.getMetadata().config.mutations[mutationName]) {
            controller.getMetadata().config.mutations[mutationName] = mutationMethod;
        }
        // override the original Module method to dispatch mutations
        controller[mutationName] = function (...args) {
            // if this method was called from another mutation
            // we don't need to dispatch a new mutation again
            // just call the original method
            if (controller.draftState) {
                return mutationMethod.apply(controller, args);
            }
            const mutation = {
                id: Number((0, scope_1.generateId)()),
                payload: args,
                moduleName,
                mutationName,
            };
            store.dispatchMutation(mutation);
        };
    }
    mutate(mutation) {
        const moduleName = this.moduleName;
        const state = this.store.rootState[moduleName];
        const mutationIsFunction = typeof mutation === 'function';
        const metadata = this.getMetadata();
        if (!metadata.isInitialized) {
            if (mutationIsFunction) {
                mutation(this);
            }
            else {
                const mutationObj = mutation;
                metadata.config.mutations[mutationObj.mutationName].apply(this, mutationObj.payload);
            }
            return;
        }
        this.store.pendingMutations++;
        try {
            this.store.rootState[moduleName] = (0, immer_1.default)(state, (draft) => {
                this.draftState = draft;
                if (mutationIsFunction) {
                    mutation(this);
                    return;
                }
                const mutationObj = mutation;
                metadata.config.mutations[mutationObj.mutationName].apply(this, mutationObj.payload);
            });
        }
        catch (e) {
            console.error('mutation failed');
        }
        finally {
            this.store.pendingMutations--;
            this.getMetadata().rev++;
            this.draftState = null;
        }
        this.store.events.emit('onMutation', mutation);
        if (!this.store.pendingMutations) {
            this.store.events.emit('onReadyToRender');
        }
    }
    registerDefaultMutations() {
        const controller = this;
        const updateStateMutation = (statePatch) => Object.assign(controller, statePatch);
        controller.registerMutation('update', updateStateMutation);
    }
    get state() {
        if (this.draftState)
            return this.draftState;
        const store = this.store;
        const moduleName = this.moduleName;
        if (store.recordingAccessors) {
            store.affectedModules[moduleName] = this.getMetadata().rev;
        }
        return store.rootState[moduleName];
    }
    // TODO remove
    set state(val) {
        console.log('set state ', val);
        throw new Error('Trying to set state');
    }
    getMetadata() {
        return this.store.modulesMetadata[this.moduleName];
    }
    get getters() {
        return this.getMetadata().getters;
    }
    createView() {
        const config = this.getMetadata().config;
        const view = new StateView_1.StateView();
        const controller = this;
        view.defineProp({
            type: 'StateRev',
            name: 'getRev',
            reactive: true,
            getValue: () => {
                // eslint-disable-next-line no-unused-expressions
                controller.state; // read as reactive
                // console.log(`read REV for ${controller.moduleName}.${controller.sectionName}`, controller.metadata.rev);
                return controller.getMetadata().rev;
            },
        });
        (0, traverse_1.traverse)(config.state, stateKey => {
            view.defineProp({
                type: 'StateProp',
                name: stateKey,
                reactive: true,
                getValue: () => controller[stateKey],
            });
        });
        (0, traverse_1.traverse)(config.mutations, stateKey => {
            view.defineProp({
                type: 'StateMutation',
                name: stateKey,
                reactive: false,
                getValue: () => controller[stateKey],
            });
        });
        (0, traverse_1.traverse)(config.getters, (propName) => {
            view.defineProp({
                type: 'StateGetter',
                name: propName,
                reactive: true,
                getValue: () => controller[propName],
            });
        });
        (0, traverse_1.traverse)(config.getterMethods, (propName) => {
            view.defineProp({
                type: 'StateGetterMethod',
                name: propName,
                reactive: false,
                getValue: () => controller[propName],
            });
        });
        return view;
    }
}
exports.StateController = StateController;
//
// /**
//  * use immerjs API to clone the object
//  */
// export function clone<T>(state: T) {
//   return produce(state, draft => {});
// }
exports.defaultStateConfig = {
// persistent: false,
// autogenerateMutations: true,
};


/***/ }),

/***/ 338:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(607), exports);
__exportStar(__webpack_require__(32), exports);
__exportStar(__webpack_require__(837), exports);
__exportStar(__webpack_require__(890), exports);


/***/ }),

/***/ 890:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseStateConfig = void 0;
const scope_1 = __webpack_require__(527);
const utils_1 = __webpack_require__(225);
/**
 * Generate a unified state config from a configCreator object
 */
function parseStateConfig(configCreator) {
    let configDraft;
    if ((0, scope_1.isClass)(configCreator)) {
        configDraft = new configCreator();
    }
    else if (typeof configCreator === 'function') {
        configDraft = configCreator();
    }
    else {
        configDraft = configCreator;
    }
    const config = {
        state: {},
        getters: {},
        getterMethods: {},
        mutations: {},
    };
    config.state = parseDefaultState(configDraft);
    // parse explicit getters
    const explicitGetters = configDraft.getters;
    if (explicitGetters) {
        (0, utils_1.traverse)(explicitGetters, (propName, descriptor) => {
            if (descriptor.get) {
                config.getters[propName] = descriptor;
                return;
            }
            const getterMethod = explicitGetters[propName];
            if (typeof getterMethod !== 'function')
                return;
            config.getterMethods[propName] = explicitGetters[propName];
        });
    }
    // parse heuristic getters
    if (configDraft) {
        (0, utils_1.traverse)(configDraft, (propName, descriptor) => {
            if (descriptor.get) {
                config.getters[propName] = descriptor;
                return;
            }
            const getterMethod = configDraft[propName];
            if (typeof getterMethod !== 'function')
                return;
            const isValidGetterName = (propName.startsWith('get')
                || propName.startsWith('is')
                || propName.startsWith('should'));
            if (!isValidGetterName)
                return;
            config.getterMethods[propName] = configDraft[propName];
        });
    }
    // parse mutations
    (0, utils_1.traverse)(configDraft, (propName, descriptor) => {
        if (descriptor.get)
            return;
        if (propName in config.getterMethods)
            return;
        const method = configDraft[propName];
        if (typeof method !== 'function')
            return;
        config.mutations[propName] = configDraft[propName];
    });
    return config;
}
exports.parseStateConfig = parseStateConfig;
function parseDefaultState(target) {
    const defaultState = {};
    // if the `state` variable is set in the config, then pick the default state from it
    if (target.state) {
        (0, utils_1.traverse)(target.state, (propName, descr) => {
            defaultState[propName] = target.state[propName];
        });
    }
    else {
        (0, utils_1.traverse)(target, (propName, descr) => {
            if (descr.get)
                return;
            const propVal = descr.value;
            if (typeof propVal === 'function')
                return;
            defaultState[propName] = propVal;
        });
    }
    return defaultState;
}


/***/ }),

/***/ 837:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(835), exports);
__exportStar(__webpack_require__(334), exports);
__exportStar(__webpack_require__(854), exports);
__exportStar(__webpack_require__(746), exports);
__exportStar(__webpack_require__(300), exports);
__exportStar(__webpack_require__(668), exports);
__exportStar(__webpack_require__(49), exports);
__exportStar(__webpack_require__(187), exports);


/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectChild = exports.ChildModuleInjectorType = void 0;
const injector_1 = __webpack_require__(869);
exports.ChildModuleInjectorType = Symbol('childModuleInjector');
function injectChild(Module, ...args) {
    const provider = (0, injector_1.injectProvider)();
    const injectedValue = provider.injectChildModule(Module, ...args);
    return injectedValue;
    // return createInjector(injector => {
    //
    //   const scope = injector.provider.resolveChildScope();
    //   const moduleName = `${injector.provider.id}__injected_module_${generateId()}`;
    //   scope.register(Module, moduleName, { injector });
    //   scope.init(moduleName, ...args);
    //
    //   return {
    //     type: ChildModuleInjectorType,
    //     getValue: () => {
    //       const module = scope.resolve(moduleName) as InjectableModule;
    //       if (module.exportInjectorValue) {
    //         return module.exportInjectorValue();
    //       }
    //       return module;
    //     },
    //     exportComponentData: () => {
    //       const module = scope.resolve(moduleName) as InjectableModule;
    //       return module.exportComponentData && module.exportComponentData() as any;
    //     },
    //     destroy() {
    //       scope.unregister(moduleName);
    //     },
    //   };
    // });
}
exports.injectChild = injectChild;


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectFormBinding = exports.FormBindingModule = exports.createFormBinding = void 0;
const StateView_1 = __webpack_require__(32);
const inject_child_1 = __webpack_require__(835);
function createFormBinding(stateGetter, stateSetter, extraPropsGenerator) {
    function getState() {
        if (typeof stateGetter === 'function')
            return stateGetter();
        return stateGetter;
    }
    const stateView = new StateView_1.StateView();
    stateView.defineProp({
        type: 'FormStateRev',
        name: 'getRev',
        getValue: () => (Object.assign({}, getState())),
    });
    stateView.defineWildcardProp(propName => {
        stateView.defineProp({
            type: 'FormInputBinding',
            name: propName,
            reactive: true,
            getValue: () => (Object.assign({ name: propName, value: getState()[propName], onChange: (newVal) => {
                    stateSetter({ [propName]: newVal });
                } }, (extraPropsGenerator ? extraPropsGenerator(propName) : {}))),
        });
    });
    return stateView;
}
exports.createFormBinding = createFormBinding;
// TODO fix types
class FormBindingModule {
    constructor(stateGetter, stateSetter, extraPropsGenerator) {
        this.formBinding = createFormBinding(stateGetter, stateSetter, extraPropsGenerator);
    }
    exportComponentData() {
        return {
            self: this.formBinding,
            extra: null,
        };
    }
}
exports.FormBindingModule = FormBindingModule;
function injectFormBinding(stateGetter, stateSetter, extraPropsGenerator) {
    return (0, inject_child_1.injectChild)(FormBindingModule, stateGetter, stateSetter, extraPropsGenerator);
}
exports.injectFormBinding = injectFormBinding;


/***/ }),

/***/ 854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectLoading = exports.LoadingState = void 0;
const __1 = __webpack_require__(18);
class LoadingState {
    constructor() {
        this.loadingStatus = 'not-started';
    }
    get isLoading() {
        return this.loadingStatus === 'loading';
    }
    get isLoaded() {
        return this.loadingStatus === 'done';
    }
}
exports.LoadingState = LoadingState;
function injectLoading() {
    return (0, __1.injectState)(LoadingState, false, statefulModule => {
        // const parentProvider = getInstanceMetadata(statefulModule).provider.injector!.provider;
        //
        // parentProvider.events.on('onModuleInit', () => {
        //
        //   if (!parentProvider.isAsync) {
        //     statefulModule.stateController.nonReactiveUpdate({ loadingStatus: 'done' });
        //     return;
        //   }
        //
        //   statefulModule.stateController.nonReactiveUpdate({ loadingStatus: 'loading' });
        //
        //   parentProvider.waitForLoad.then(() => {
        //     statefulModule.stateController.setLoadingStatus('done');
        //   });
        // });
    });
}
exports.injectLoading = injectLoading;


/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getQueryOptionsFromArgs = exports.injectQuery = exports.QueryModule = exports.QueryStateConfig = void 0;
const scope_1 = __webpack_require__(527);
const StateView_1 = __webpack_require__(32);
const inject_state_1 = __webpack_require__(300);
const inject_watch_1 = __webpack_require__(668);
const inject_child_1 = __webpack_require__(835);
class QueryStateConfig {
    constructor() {
        // constructor(public state: QueryState<TData, TParams, TError>) {}
        this.state = {
            status: 'idle',
            data: null,
            error: null,
            params: null,
        };
    }
    setData(data) {
        this.state.status = 'success';
        this.state.data = data;
        console.log('query fetched', data);
    }
    setError(error) {
        this.state.status = 'error';
        this.state.error = error;
    }
    get isLoading() {
        return this.state.status === 'loading';
    }
}
exports.QueryStateConfig = QueryStateConfig;
/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
class QueryModule {
    constructor(...args) {
        this.state = (0, inject_state_1.injectState)(QueryStateConfig);
        this.watcher = (0, inject_watch_1.injectWatch)(this.getParams, this.refetch);
        this.fetchingPromise = null;
        this.promiseId = '';
        this.enabled = true;
        this.isInitialFetch = true;
        const computedOptions = getQueryOptionsFromArgs(args);
        const options = Object.assign({ enabled: true, params: null, initialData: null, getParams: null, fetch: () => { }, onSuccess: () => { }, onError: () => { } }, computedOptions);
        this.options = options;
        this.enabled = !!options.enabled;
    }
    init() {
        const queryMethods = new StateView_1.StateView();
        queryMethods.defineProp({
            type: 'QueryMethod',
            name: 'refetch',
            reactive: false,
            getValue: () => {
                return () => this.refetch();
            },
        });
        this.stateView = this.state.createView();
        this.queryView = this.stateView.mergeView(queryMethods);
        const data = this.options.initialData;
        this.state.update({
            params: this.getParams(),
            data,
        });
        this.exec();
    }
    exec() {
        if (this.fetchingPromise)
            return this.fetchingPromise;
        return this.fetch();
    }
    fetch() {
        const fetchResult = this.options.fetch();
        if (fetchResult === null || fetchResult === void 0 ? void 0 : fetchResult.then) {
            if (this.isInitialFetch) {
                this.state.status = 'loading';
                this.isInitialFetch = false;
            }
            else {
                this.state.setStatus('loading');
            }
            const promiseId = (0, scope_1.generateId)();
            this.promiseId = promiseId;
            this.fetchingPromise = fetchResult;
            return fetchResult.then((data) => {
                if (!this.enabled || this.promiseId !== promiseId)
                    return;
                this.fetchingPromise = null;
                this.promiseId = '';
                this.state.setData(data);
            })
                .catch((e) => {
                if (!this.enabled || this.promiseId !== promiseId)
                    return;
                this.fetchingPromise = null;
                this.promiseId = '';
                this.state.setError(e);
                this.options.onError && this.options.onError();
            });
        }
        // result is not a promise, set the data
        this.state.setData(fetchResult);
        this.options.onSuccess && this.options.onSuccess();
        return Promise.resolve(fetchResult);
    }
    refetch() {
        if (!this.enabled)
            return;
        this.stopFetching();
        return this.fetch();
    }
    stopFetching() {
        this.fetchingPromise = null;
        this.promiseId = '';
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    getParams() {
        return this.options.getParams ? this.options.getParams() : null;
    }
    onDestroy() {
        // prevent unfinished fetching
        this.setEnabled(false);
    }
    exportComponentData() {
        return {
            self: this.queryView,
            extra: null,
        };
    }
}
exports.QueryModule = QueryModule;
function injectQuery(...args) {
    return (0, inject_child_1.injectChild)(QueryModule, ...args);
}
exports.injectQuery = injectQuery;
/**
 * convers Query constructor agrs to QueryOptions
 * @param args
 */
function getQueryOptionsFromArgs(args) {
    if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === 'function') {
            return {
                fetch: arg,
            };
        }
        return arg;
    }
    if (args.length === 2) {
        return {
            initialData: args[0],
            fetch: args[1],
        };
    }
    return {
        initialData: args[0],
        fetch: args[1],
        getParams: args[2],
    };
}
exports.getQueryOptionsFromArgs = getQueryOptionsFromArgs;


/***/ }),

/***/ 300:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mutation = exports.StatefulModule = exports.injectState = exports.StateInjectorType = void 0;
const scope_1 = __webpack_require__(527);
const Store_1 = __webpack_require__(607);
const inject_child_1 = __webpack_require__(835);
const inject_form_1 = __webpack_require__(334);
exports.StateInjectorType = Symbol('stateInjector');
function injectState(configCreator, allowMutationDecorators = true, onCreate) {
    return (0, inject_child_1.injectChild)(StatefulModule, configCreator, allowMutationDecorators, onCreate);
}
exports.injectState = injectState;
class StatefulModule {
    constructor(stateConfig, allowMutationDecorators = true, onCreate) {
        this.stateConfig = stateConfig;
        this.allowMutationDecorators = allowMutationDecorators;
        this.onCreate = onCreate;
        this.store = (0, scope_1.inject)(Store_1.Store);
        this.provider = (0, scope_1.injectProvider)();
        const moduleName = this.moduleName;
        this.stateController = this.store.createState(moduleName, this.stateConfig);
        this.formBinding = (0, inject_form_1.injectFormBinding)(() => this.stateController.getters, patch => this.stateController.update(patch));
        // TODO find better solution for injecting the provider
        (0, scope_1.defineGetter)(this.stateController, '__provider', () => this.provider, { enumerable: false });
    }
    init() {
        var _a, _b;
        const parentProvider = this.provider.options.parentProvider;
        if (!parentProvider) {
            throw new Error('this module should be injected');
        }
        // register methods marked with the @mutation() decorators
        if (this.allowMutationDecorators && parentProvider) {
            const parentModule = parentProvider.instance;
            const mutations = ((_b = (_a = parentProvider.creator) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b.__mutations) || [];
            mutations.forEach(mutationName => {
                const mutation = parentModule[mutationName];
                this.stateController.registerMutation(mutationName, mutation);
                parentModule[mutationName] = (...args) => this.stateController[mutationName](...args);
            });
            parentProvider.events.on('onAfterInit', () => {
                this.stateController.finishInitialization();
                console.log('state init finished', this.stateController.moduleName);
            });
        }
        this.stateView = this.stateController.createView();
        this.stateView.defineProp({
            type: 'StateFormBinding',
            name: 'bind',
            reactive: true,
            stateView: this.formBinding.formBinding,
            getValue: () => {
                return this.formBinding.formBinding;
            },
        });
        this.onCreate && this.onCreate(this);
    }
    get moduleName() {
        return this.provider.id;
    }
    onDestroy() {
        this.store.destroyModule(this.moduleName);
    }
    exportInjectorValue() {
        return this.stateController;
    }
    exportComponentData() {
        return {
            self: this.stateView,
            extra: this.stateView,
        };
    }
}
exports.StatefulModule = StatefulModule;
/**
 * A decorator that registers the object method as an mutation
 */
function mutation() {
    return function (target, methodName) {
        target.__mutations = target.__mutations || [];
        // mark the method as an mutation
        target.__mutations.push(methodName);
    };
}
exports.mutation = mutation;


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectWatch = exports.WatchModule = void 0;
const scope_1 = __webpack_require__(527);
const Store_1 = __webpack_require__(607);
const utils_1 = __webpack_require__(225);
const inject_child_1 = __webpack_require__(835);
class WatchModule {
    constructor(watchExpr, onChange, isEqual = utils_1.isSimilar) {
        this.watchExpr = watchExpr;
        this.onChange = onChange;
        this.isEqual = isEqual;
        this.store = (0, scope_1.inject)(Store_1.Store);
        this.unwatch = null;
        this.current = null;
    }
    init() {
        const parentProvider = (0, scope_1.getInstanceMetadata)(this).provider.options.parentProvider;
        if (!parentProvider) {
            throw new Error('This module should have a parent module');
        }
        const context = parentProvider.instance;
        this.current = this.watchExpr.call(context);
        this.unwatch = this.store.events.on('onMutation', () => {
            const prev = this.current;
            this.current = this.watchExpr.call(context);
            if (this.isEqual(this.current, prev))
                return;
            this.onChange.call(context, this.current, prev);
        });
    }
    onDestroy() {
        this.unwatch && this.unwatch();
    }
}
exports.WatchModule = WatchModule;
function injectWatch(expression, onChange, isEqual) {
    return (0, inject_child_1.injectChild)(WatchModule, expression, onChange, isEqual);
}
exports.injectWatch = injectWatch;


/***/ }),

/***/ 187:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pickInjectors = void 0;
const scope_1 = __webpack_require__(527);
const utils_1 = __webpack_require__(225);
function pickInjectors(module) {
    return function (props, view) {
        let newView = view;
        (0, utils_1.traverse)(module, (propName, descr) => {
            if (descr.get)
                return;
            const provider = descr.value.__provider;
            if (!provider)
                return;
            const module = provider.instance;
            const componentData = module.exportComponentData && module.exportComponentData();
            const injectedValue = module.exportInjectorValue ? module.exportInjectorValue() : module;
            const extraProps = componentData && componentData.extra;
            if (extraProps) {
                const extraPropsView = extraProps;
                (0, scope_1.forEach)(extraPropsView.descriptors, (descriptor, p) => {
                    if (!(descriptor.name in module))
                        newView.defineProp(descriptor);
                });
                newView = newView.mergeView(extraProps);
            }
            const selfProps = componentData && componentData.self;
            if (selfProps) {
                newView.defineProp({
                    type: 'InjectorView',
                    name: propName,
                    reactive: true,
                    stateView: selfProps,
                    getValue() {
                        return injectedValue;
                    },
                });
            }
        });
        // const provider = getInstanceMetadata(module).provider;
        // let newView = view;
        //
        // forEach(provider.injectors, injector => {
        //   const componentData = injector.getComponentData();
        //
        //   const extraProps = componentData.extra;
        //   if (extraProps) {
        //     const extraPropsView = extraProps as StateView<any>;
        //     forEach(extraPropsView.descriptors, (descriptor, p) => {
        //       if (!(descriptor.name in module)) newView.defineProp(descriptor);
        //     });
        //     newView = newView.mergeView(extraProps as any);
        //   }
        //
        //   const selfProps = componentData.self;
        //   if (selfProps) {
        //     newView.defineProp({
        //       type: 'InjectorView',
        //       name: injector.propertyName,
        //       reactive: true,
        //       stateView: selfProps as any,
        //       getValue() {
        //         return injector.resolveValue();
        //       },
        //     });
        //   }
        //
        // });
        return newView;
    };
}
exports.pickInjectors = pickInjectors;
// type Keytype = keyof GetExtraInjectedProps<QueriesModule>;
// type Queryprops = keyof GetExtraInjectedProps<QueriesModule> extends never ? {} : Flatten<GetExtraInjectedProps<QueriesModule>>
// const injProps: Queryprops;
// injProps.onlineUsersQuery
// const injProps: GetAllInjectedProps<QueriesModule>;
// injProps.onlineUsersQuery
// injProps.onlineUsersQuery.setData;
// injProps.setData
// //
// const injProps2: GetFlattenExtraProps<QueriesModule>;
// injProps2.onlineUsersQuery.setData;
// injProps2.setData
//
//
// const injPropsExtra: GetExtraInjectedProps<QueriesModule>;
// const injPropsExtra2: GetModuleExtraView<QueriesModule>;
// injPropsExtra2.
// type TSuperUser = {
//   id: string,
//   name: string,
// }
//
// const usersModule = new UsersModule();
//
//
// const userBase = {
//
//   loading: injectLoading(),
//
//   state: injectState({
//     users: [] as TSuperUser[],
//   }),
// }
//
// const userExtention = {
//
//   extendedFoo: 1,
//
//   state: injectState({
//     selectedUserId: 'user2',
//   }),
// }
// type BaseUser = GetAllInjectedProps<typeof userBase> & typeof userBase;
// type ExtendedUser = GetAllInjectedProps<typeof userExtention> & typeof userExtention
// const baseUser: BaseUser;
// baseUser.users;
// baseUser.state;
// baseUser.loading
//
// const extendedUser: ExtendedUser;
// extendedUser.selectedUserId;
// extendedUser.state;
//
//
// const mergedUser: Omit<BaseUser, keyof ExtendedUser> & ExtendedUser;
//
// mergedUser.users
// mergedUser.selectedUserId
// mergedUser.state


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pickProps = void 0;
const utils_1 = __webpack_require__(225);
function pickProps(module) {
    return function (props, view) {
        (0, utils_1.traverse)(module, (propName, descr) => {
            const isGetter = !!descr.get;
            const isFunction = !isGetter && typeof descr.value === 'function';
            const getValue = isFunction ? () => descr.value.bind(module) : () => module[propName];
            view.defineProp({
                type: 'ModuleProp',
                reactive: isGetter,
                name: propName,
                getValue,
            });
        });
        return view;
    };
}
exports.pickProps = pickProps;


/***/ }),

/***/ 225:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(233), exports);
__exportStar(__webpack_require__(725), exports);
__exportStar(__webpack_require__(222), exports);


/***/ }),

/***/ 233:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEqual = exports.isSimilar = exports.isDeepEqual = void 0;
const is_plain_object_1 = __webpack_require__(57);
/**
 * Compare 2 object with limited depth
 */
function isDeepEqual(obj1, obj2, currentDepth, maxDepth) {
    if (obj1 === obj2)
        return true;
    if (currentDepth === maxDepth)
        return false;
    if (Array.isArray(obj1) && Array.isArray(obj2))
        return isArrayEqual(obj1, obj2);
    if ((0, is_plain_object_1.isPlainObject)(obj1) && (0, is_plain_object_1.isPlainObject)(obj2)) {
        const [keys1, keys2] = [Object.keys(obj1), Object.keys(obj2)];
        if (keys1.length !== keys2.length)
            return false;
        for (const key of keys1) {
            if (!isDeepEqual(obj1[key], obj2[key], currentDepth + 1, maxDepth))
                return false;
        }
        return true;
    }
    return false;
}
exports.isDeepEqual = isDeepEqual;
/**
 * consider isSimilar as isDeepEqual with depth 2
 */
function isSimilar(obj1, obj2) {
    return isDeepEqual(obj1, obj2, 0, 2);
}
exports.isSimilar = isSimilar;
/**
 * Shallow comparison of 2 arrays
 */
function isArrayEqual(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
/**
 * Shallow compare
 */
function isEqual(obj1, obj2) {
    return isDeepEqual(obj1, obj2, 0, 1);
}
exports.isEqual = isEqual;


/***/ }),

/***/ 725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.merge = exports.copyProps = void 0;
const traverse_1 = __webpack_require__(222);
/**
 * copy props from source to targets
 */
function copyProps(source, target) {
    if (!target)
        target = {};
    (0, traverse_1.traverse)(source, (propName, descriptor) => {
        Object.defineProperty(target, propName, descriptor);
    });
    return target;
}
exports.copyProps = copyProps;
/**
 * Create and merged object
 * Property descriptors will be preserved
 * Prototype properties will be included
 */
function merge(obj1, obj2) {
    const result = {};
    copyProps(obj1, result);
    copyProps(obj2, result);
    return result;
}
exports.merge = merge;


/***/ }),

/***/ 222:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filterKeys = exports.getKeys = exports.getDescriptors = exports.traverse = void 0;
/**
 * Travers class methods and props
 */
const is_plain_object_1 = __webpack_require__(57);
// helper methods to travers class instances prototype chains
function traverse(instance, cb) {
    let entity = instance;
    const prototypes = [];
    if ((0, is_plain_object_1.isPlainObject)(entity)) {
        prototypes.push(entity);
    }
    else {
        while (entity.constructor.name !== 'Object') {
            prototypes.push(entity);
            entity = Object.getPrototypeOf(entity);
        }
    }
    const alreadyTraversed = {};
    for (const proto of prototypes) {
        const propNames = Object.getOwnPropertyNames(proto);
        for (const propName of propNames) {
            if (propName in alreadyTraversed)
                continue;
            alreadyTraversed[propName] = true;
            const descriptor = Object.getOwnPropertyDescriptor(proto, propName);
            if (!descriptor)
                return;
            const shouldStop = cb(propName, descriptor);
            if (shouldStop)
                return;
        }
    }
}
exports.traverse = traverse;
function getDescriptors(instance) {
    const descriptors = {};
    traverse(instance, (propName, descriptor) => {
        descriptors[propName] = descriptor;
    });
    return descriptors;
}
exports.getDescriptors = getDescriptors;
function getKeys(instance) {
    const keys = [];
    traverse(instance, propName => {
        keys.push(propName);
    });
    return keys;
}
exports.getKeys = getKeys;
function filterKeys(obj, filterFn) {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => filterFn(key)));
}
exports.filterKeys = filterKeys;


/***/ }),

/***/ 156:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__156__;

/***/ }),

/***/ 386:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__386__;

/***/ }),

/***/ 111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNanoEvents": () => (/* binding */ createNanoEvents)
/* harmony export */ });
let createNanoEvents = () => ({
  events: {},
  emit(event, ...args) {
    ;(this.events[event] || []).forEach(i => i(...args))
  },
  on(event, cb) {
    ;(this.events[event] = this.events[event] || []).push(cb)
    return () =>
      (this.events[event] = (this.events[event] || []).filter(i => i !== cb))
  }
})


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(18);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map