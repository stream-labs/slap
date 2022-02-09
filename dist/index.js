(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("@reduxjs/toolkit"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "@reduxjs/toolkit"], factory);
	else if(typeof exports === 'object')
		exports["redumbx"] = factory(require("react"), require("@reduxjs/toolkit"));
	else
		root["redumbx"] = factory(root["React"], root["ReduxToolkit"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__359__, __WEBPACK_EXTERNAL_MODULE__509__) {
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

/** @license React vundefined
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
__webpack_require__(418);var f=__webpack_require__(359),g=60103;exports.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");exports.Fragment=h("react.fragment")}var m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:n.current}}exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(251);
} else {}


/***/ }),

/***/ 698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ArgumentOutOfRangeError": () => (/* reexport */ ArgumentOutOfRangeError),
  "AsyncSubject": () => (/* reexport */ AsyncSubject),
  "BehaviorSubject": () => (/* reexport */ BehaviorSubject),
  "ConnectableObservable": () => (/* reexport */ ConnectableObservable),
  "EMPTY": () => (/* reexport */ EMPTY),
  "EmptyError": () => (/* reexport */ EmptyError),
  "NEVER": () => (/* reexport */ NEVER),
  "NotFoundError": () => (/* reexport */ NotFoundError),
  "Notification": () => (/* reexport */ Notification),
  "NotificationKind": () => (/* reexport */ NotificationKind),
  "ObjectUnsubscribedError": () => (/* reexport */ ObjectUnsubscribedError),
  "Observable": () => (/* reexport */ Observable),
  "ReplaySubject": () => (/* reexport */ ReplaySubject),
  "Scheduler": () => (/* reexport */ Scheduler),
  "SequenceError": () => (/* reexport */ SequenceError),
  "Subject": () => (/* reexport */ Subject),
  "Subscriber": () => (/* reexport */ Subscriber),
  "Subscription": () => (/* reexport */ Subscription),
  "TimeoutError": () => (/* reexport */ TimeoutError),
  "UnsubscriptionError": () => (/* reexport */ UnsubscriptionError),
  "VirtualAction": () => (/* reexport */ VirtualAction),
  "VirtualTimeScheduler": () => (/* reexport */ VirtualTimeScheduler),
  "animationFrame": () => (/* reexport */ animationFrame),
  "animationFrameScheduler": () => (/* reexport */ animationFrameScheduler),
  "animationFrames": () => (/* reexport */ animationFrames),
  "asap": () => (/* reexport */ asap),
  "asapScheduler": () => (/* reexport */ asapScheduler),
  "async": () => (/* reexport */ async_async),
  "asyncScheduler": () => (/* reexport */ asyncScheduler),
  "audit": () => (/* reexport */ audit),
  "auditTime": () => (/* reexport */ auditTime),
  "bindCallback": () => (/* reexport */ bindCallback),
  "bindNodeCallback": () => (/* reexport */ bindNodeCallback),
  "buffer": () => (/* reexport */ buffer),
  "bufferCount": () => (/* reexport */ bufferCount),
  "bufferTime": () => (/* reexport */ bufferTime),
  "bufferToggle": () => (/* reexport */ bufferToggle),
  "bufferWhen": () => (/* reexport */ bufferWhen),
  "catchError": () => (/* reexport */ catchError),
  "combineAll": () => (/* reexport */ combineAll),
  "combineLatest": () => (/* reexport */ combineLatest),
  "combineLatestAll": () => (/* reexport */ combineLatestAll),
  "combineLatestWith": () => (/* reexport */ combineLatestWith),
  "concat": () => (/* reexport */ concat),
  "concatAll": () => (/* reexport */ concatAll),
  "concatMap": () => (/* reexport */ concatMap),
  "concatMapTo": () => (/* reexport */ concatMapTo),
  "concatWith": () => (/* reexport */ concatWith),
  "config": () => (/* reexport */ config),
  "connect": () => (/* reexport */ connect),
  "connectable": () => (/* reexport */ connectable),
  "count": () => (/* reexport */ count),
  "debounce": () => (/* reexport */ debounce),
  "debounceTime": () => (/* reexport */ debounceTime),
  "defaultIfEmpty": () => (/* reexport */ defaultIfEmpty),
  "defer": () => (/* reexport */ defer),
  "delay": () => (/* reexport */ delay),
  "delayWhen": () => (/* reexport */ delayWhen),
  "dematerialize": () => (/* reexport */ dematerialize),
  "distinct": () => (/* reexport */ distinct),
  "distinctUntilChanged": () => (/* reexport */ distinctUntilChanged),
  "distinctUntilKeyChanged": () => (/* reexport */ distinctUntilKeyChanged),
  "elementAt": () => (/* reexport */ elementAt),
  "empty": () => (/* reexport */ empty),
  "endWith": () => (/* reexport */ endWith),
  "every": () => (/* reexport */ every),
  "exhaust": () => (/* reexport */ exhaust),
  "exhaustAll": () => (/* reexport */ exhaustAll),
  "exhaustMap": () => (/* reexport */ exhaustMap),
  "expand": () => (/* reexport */ expand),
  "filter": () => (/* reexport */ filter),
  "finalize": () => (/* reexport */ finalize),
  "find": () => (/* reexport */ find),
  "findIndex": () => (/* reexport */ findIndex),
  "first": () => (/* reexport */ first),
  "firstValueFrom": () => (/* reexport */ firstValueFrom),
  "flatMap": () => (/* reexport */ flatMap),
  "forkJoin": () => (/* reexport */ forkJoin),
  "from": () => (/* reexport */ from),
  "fromEvent": () => (/* reexport */ fromEvent),
  "fromEventPattern": () => (/* reexport */ fromEventPattern),
  "generate": () => (/* reexport */ generate),
  "groupBy": () => (/* reexport */ groupBy),
  "identity": () => (/* reexport */ identity),
  "ignoreElements": () => (/* reexport */ ignoreElements),
  "iif": () => (/* reexport */ iif),
  "interval": () => (/* reexport */ interval),
  "isEmpty": () => (/* reexport */ isEmpty),
  "isObservable": () => (/* reexport */ isObservable),
  "last": () => (/* reexport */ last_last),
  "lastValueFrom": () => (/* reexport */ lastValueFrom),
  "map": () => (/* reexport */ map),
  "mapTo": () => (/* reexport */ mapTo),
  "materialize": () => (/* reexport */ materialize),
  "max": () => (/* reexport */ max),
  "merge": () => (/* reexport */ merge),
  "mergeAll": () => (/* reexport */ mergeAll),
  "mergeMap": () => (/* reexport */ mergeMap),
  "mergeMapTo": () => (/* reexport */ mergeMapTo),
  "mergeScan": () => (/* reexport */ mergeScan),
  "mergeWith": () => (/* reexport */ mergeWith),
  "min": () => (/* reexport */ min),
  "multicast": () => (/* reexport */ multicast),
  "never": () => (/* reexport */ never),
  "noop": () => (/* reexport */ noop),
  "observable": () => (/* reexport */ observable),
  "observeOn": () => (/* reexport */ observeOn),
  "of": () => (/* reexport */ of),
  "onErrorResumeNext": () => (/* reexport */ onErrorResumeNext_onErrorResumeNext),
  "pairs": () => (/* reexport */ pairs),
  "pairwise": () => (/* reexport */ pairwise),
  "partition": () => (/* reexport */ partition),
  "pipe": () => (/* reexport */ pipe),
  "pluck": () => (/* reexport */ pluck),
  "publish": () => (/* reexport */ publish),
  "publishBehavior": () => (/* reexport */ publishBehavior),
  "publishLast": () => (/* reexport */ publishLast),
  "publishReplay": () => (/* reexport */ publishReplay),
  "queue": () => (/* reexport */ queue),
  "queueScheduler": () => (/* reexport */ queueScheduler),
  "race": () => (/* reexport */ race),
  "raceWith": () => (/* reexport */ raceWith),
  "range": () => (/* reexport */ range),
  "reduce": () => (/* reexport */ reduce),
  "refCount": () => (/* reexport */ refCount),
  "repeat": () => (/* reexport */ repeat),
  "repeatWhen": () => (/* reexport */ repeatWhen),
  "retry": () => (/* reexport */ retry),
  "retryWhen": () => (/* reexport */ retryWhen),
  "sample": () => (/* reexport */ sample),
  "sampleTime": () => (/* reexport */ sampleTime),
  "scan": () => (/* reexport */ scan),
  "scheduled": () => (/* reexport */ scheduled),
  "sequenceEqual": () => (/* reexport */ sequenceEqual),
  "share": () => (/* reexport */ share),
  "shareReplay": () => (/* reexport */ shareReplay),
  "single": () => (/* reexport */ single),
  "skip": () => (/* reexport */ skip),
  "skipLast": () => (/* reexport */ skipLast),
  "skipUntil": () => (/* reexport */ skipUntil),
  "skipWhile": () => (/* reexport */ skipWhile),
  "startWith": () => (/* reexport */ startWith),
  "subscribeOn": () => (/* reexport */ subscribeOn),
  "switchAll": () => (/* reexport */ switchAll),
  "switchMap": () => (/* reexport */ switchMap),
  "switchMapTo": () => (/* reexport */ switchMapTo),
  "switchScan": () => (/* reexport */ switchScan),
  "take": () => (/* reexport */ take),
  "takeLast": () => (/* reexport */ takeLast),
  "takeUntil": () => (/* reexport */ takeUntil),
  "takeWhile": () => (/* reexport */ takeWhile),
  "tap": () => (/* reexport */ tap),
  "throttle": () => (/* reexport */ throttle),
  "throttleTime": () => (/* reexport */ throttleTime),
  "throwError": () => (/* reexport */ throwError),
  "throwIfEmpty": () => (/* reexport */ throwIfEmpty),
  "timeInterval": () => (/* reexport */ timeInterval),
  "timeout": () => (/* reexport */ timeout),
  "timeoutWith": () => (/* reexport */ timeoutWith),
  "timer": () => (/* reexport */ timer),
  "timestamp": () => (/* reexport */ timestamp),
  "toArray": () => (/* reexport */ toArray),
  "using": () => (/* reexport */ using),
  "window": () => (/* reexport */ window_window),
  "windowCount": () => (/* reexport */ windowCount),
  "windowTime": () => (/* reexport */ windowTime),
  "windowToggle": () => (/* reexport */ windowToggle),
  "windowWhen": () => (/* reexport */ windowWhen),
  "withLatestFrom": () => (/* reexport */ withLatestFrom),
  "zip": () => (/* reexport */ zip),
  "zipAll": () => (/* reexport */ zipAll),
  "zipWith": () => (/* reexport */ zipWith)
});

;// CONCATENATED MODULE: ./node_modules/rxjs/node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Subscription.js




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execTeardown(teardown) {
    if (isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/config.js
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js


function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        var onUnhandledError = config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() { }
//# sourceMappingURL=noop.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/errorContext.js

var context = null;
function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Subscriber.js









var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));

var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next, _this) : noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
            complete: complete ? wrapForErrorHandling(complete, _this) : noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, __spreadArray([], __read(args)));
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                captureError(err);
            }
            else {
                reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};
//# sourceMappingURL=Subscriber.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/pipe.js

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Observable.js







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}
//# sourceMappingURL=Observable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/lift.js

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js


var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/refCount.js


function refCount() {
    return operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = new OperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
//# sourceMappingURL=refCount.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js






var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(new OperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount()(this);
    };
    return ConnectableObservable;
}(Observable));

//# sourceMappingURL=ConnectableObservable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js
var performanceTimestampProvider = {
    now: function () {
        return (performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=performanceTimestampProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js


var animationFrameProvider = {
    schedule: function (callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = animationFrameProvider.delegate;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function (timestamp) {
            cancel = undefined;
            callback(timestamp);
        });
        return new Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
    },
    requestAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: undefined,
};
//# sourceMappingURL=animationFrameProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/dom/animationFrames.js




function animationFrames(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
function animationFramesFactory(timestampProvider) {
    var schedule = animationFrameProvider.schedule;
    return new Observable(function (subscriber) {
        var subscription = new Subscription();
        var provider = timestampProvider || performanceTimestampProvider;
        var start = provider.now();
        var run = function (timestamp) {
            var now = provider.now();
            subscriber.next({
                timestamp: timestampProvider ? now : timestamp,
                elapsed: now - start,
            });
            if (!subscriber.closed) {
                subscription.add(schedule(run));
            }
        };
        subscription.add(schedule(run));
        return subscription;
    });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
//# sourceMappingURL=animationFrames.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Subject.js






var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription(function () { return arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));

var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js


var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject));

//# sourceMappingURL=BehaviorSubject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
//# sourceMappingURL=dateTimestampProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js



var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject));

//# sourceMappingURL=ReplaySubject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/AsyncSubject.js


var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped || _isComplete) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
}(Subject));

//# sourceMappingURL=AsyncSubject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/Action.js


var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription));

//# sourceMappingURL=Action.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js

var intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js




var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

//# sourceMappingURL=AsyncAction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/Immediate.js
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
var Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};
var TestTools = {
    pending: function () {
        return Object.keys(activeHandles).length;
    }
};
//# sourceMappingURL=Immediate.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js


var setImmediate = Immediate.setImmediate, clearImmediate = Immediate.clearImmediate;
var immediateProvider = {
    setImmediate: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
    },
    clearImmediate: function (handle) {
        var delegate = immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=immediateProvider.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AsapAction.js



var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (!scheduler.actions.some(function (action) { return action.id === id; })) {
            immediateProvider.clearImmediate(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction));

//# sourceMappingURL=AsapAction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Scheduler.js

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

//# sourceMappingURL=Scheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js


var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

//# sourceMappingURL=AsyncScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AsapScheduler.js


var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler));

//# sourceMappingURL=AsapScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/asap.js


var asapScheduler = new AsapScheduler(AsapAction);
var asap = asapScheduler;
//# sourceMappingURL=asap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/async.js


var asyncScheduler = new AsyncScheduler(AsyncAction);
var async_async = asyncScheduler;
//# sourceMappingURL=async.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js


var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction));

//# sourceMappingURL=QueueAction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js


var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler));

//# sourceMappingURL=QueueScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/queue.js


var queueScheduler = new QueueScheduler(QueueAction);
var queue = queueScheduler;
//# sourceMappingURL=queue.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js



var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (!scheduler.actions.some(function (action) { return action.id === id; })) {
            animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction));

//# sourceMappingURL=AnimationFrameAction.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js


var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler));

//# sourceMappingURL=AnimationFrameScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js


var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);
var animationFrame = animationFrameScheduler;
//# sourceMappingURL=animationFrame.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js




var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Infinity; }
        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        }
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler));

var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = (scheduler.index += 1); }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (Number.isFinite(delay)) {
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        }
        else {
            return Subscription.EMPTY;
        }
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction));

//# sourceMappingURL=VirtualTimeScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/empty.js

var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isScheduler.js

function isScheduler(value) {
    return value && isFunction(value.schedule);
}
//# sourceMappingURL=isScheduler.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/args.js


function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction(last(args)) ? args.pop() : undefined;
}
function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : undefined;
}
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
//# sourceMappingURL=args.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isPromise.js

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js


function isInteropObservable(input) {
    return isFunction(input[observable]);
}
//# sourceMappingURL=isInteropObservable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator_iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isIterable.js


function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator_iterator]);
}
//# sourceMappingURL=isIterable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js


function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js












function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/observeOn.js



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js



function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js



function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js




function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator;
        executeSchedule(subscriber, scheduler, function () {
            iterator = input[iterator_iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js


function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js













function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}
//# sourceMappingURL=scheduled.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/from.js


function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
//# sourceMappingURL=from.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/of.js


function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
}
//# sourceMappingURL=of.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/throwError.js


function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
}
//# sourceMappingURL=throwError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/Notification.js




var NotificationKind;
(function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        return observeNotification(this, observer);
    };
    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        var _a;
        return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
            ? this.observe(nextOrObserver)
            : this.do(nextOrObserver, error, complete);
    };
    Notification.prototype.toObservable = function () {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === 'N'
            ?
                of(value)
            :
                kind === 'E'
                    ?
                        throwError(function () { return error; })
                    :
                        kind === 'C'
                            ?
                                EMPTY
                            :
                                0;
        if (!result) {
            throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
    };
    Notification.createNext = function (value) {
        return new Notification('N', value);
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    return Notification;
}());

function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== 'string') {
        throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
//# sourceMappingURL=Notification.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isObservable.js


function isObservable(obj) {
    return !!obj && (obj instanceof Observable || (isFunction(obj.lift) && isFunction(obj.subscribe)));
}
//# sourceMappingURL=isObservable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/EmptyError.js

var EmptyError = createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });
//# sourceMappingURL=EmptyError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/lastValueFrom.js

function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError());
                }
            },
        });
    });
}
//# sourceMappingURL=lastValueFrom.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/firstValueFrom.js


function firstValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var subscriber = new SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}
//# sourceMappingURL=firstValueFrom.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js

var ArgumentOutOfRangeError = createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});
//# sourceMappingURL=ArgumentOutOfRangeError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js

var NotFoundError = createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});
//# sourceMappingURL=NotFoundError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/SequenceError.js

var SequenceError = createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});
//# sourceMappingURL=SequenceError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/isDate.js
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
//# sourceMappingURL=isDate.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/timeout.js







var TimeoutError = createErrorClass(function (_super) {
    return function TimeoutErrorImpl(info) {
        if (info === void 0) { info = null; }
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
    };
});
function timeout(config, schedulerArg) {
    var _a = (isValidDate(config)
        ? { first: config }
        : typeof config === 'number'
            ? { each: config }
            : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return operate(function (source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function (delay) {
            timerSubscription = executeSchedule(subscriber, scheduler, function () {
                try {
                    originalSourceSubscription.unsubscribe();
                    innerFrom(_with({
                        meta: meta,
                        lastValue: lastValue,
                        seen: seen,
                    })).subscribe(subscriber);
                }
                catch (err) {
                    subscriber.error(err);
                }
            }, delay);
        };
        originalSourceSubscription = source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
        }, undefined, undefined, function () {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
        }));
        startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
    });
}
function timeoutErrorFactory(info) {
    throw new TimeoutError(info);
}
//# sourceMappingURL=timeout.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/map.js


function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js


var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}
//# sourceMappingURL=mapOneOrManyArgs.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/bindCallbackInternals.js







function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler)
                    .apply(this, args)
                    .pipe(mapOneOrManyArgs(resultSelector));
            };
        }
    }
    if (scheduler) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc)
                .apply(this, args)
                .pipe(subscribeOn(scheduler), observeOn(scheduler));
        };
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject();
        var uninitialized = true;
        return new Observable(function (subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
                uninitialized = false;
                var isAsync_1 = false;
                var isComplete_1 = false;
                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
                    function () {
                        var results = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            results[_i] = arguments[_i];
                        }
                        if (isNodeStyle) {
                            var err = results.shift();
                            if (err != null) {
                                subject.error(err);
                                return;
                            }
                        }
                        subject.next(1 < results.length ? results : results[0]);
                        isComplete_1 = true;
                        if (isAsync_1) {
                            subject.complete();
                        }
                    },
                ]));
                if (isComplete_1) {
                    subject.complete();
                }
                isAsync_1 = true;
            }
            return subs;
        });
    };
}
//# sourceMappingURL=bindCallbackInternals.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/bindCallback.js

function bindCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
//# sourceMappingURL=bindCallback.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/bindNodeCallback.js

function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
//# sourceMappingURL=bindNodeCallback.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var argsArgArrayOrObject_isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (argsArgArrayOrObject_isArray(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}
//# sourceMappingURL=argsArgArrayOrObject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/createObject.js
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
//# sourceMappingURL=createObject.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js









function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var resultSelector = popResultSelector(args);
    var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return from([], scheduler);
    }
    var result = new Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return createObject(keys, values); }
        :
            identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        executeSchedule(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}
//# sourceMappingURL=combineLatest.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js



function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom(project(value, index++)).subscribe(new OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                            executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                        }
                        else {
                            doInnerSub(bufferedValue);
                        }
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}
//# sourceMappingURL=mergeInternals.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
}
//# sourceMappingURL=mergeMap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js


function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap(identity, concurrent);
}
//# sourceMappingURL=mergeAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/concatAll.js

function concatAll() {
    return mergeAll(1);
}
//# sourceMappingURL=concatAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/concat.js



function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll()(from(args, popScheduler(args)));
}
//# sourceMappingURL=concat.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/defer.js


function defer(observableFactory) {
    return new Observable(function (subscriber) {
        innerFrom(observableFactory()).subscribe(subscriber);
    });
}
//# sourceMappingURL=defer.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/connectable.js



var DEFAULT_CONFIG = {
    connector: function () { return new Subject(); },
    resetOnDisconnect: true,
};
function connectable(source, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connection = null;
    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable(function (subscriber) {
        return subject.subscribe(subscriber);
    });
    result.connect = function () {
        if (!connection || connection.closed) {
            connection = defer(function () { return source; }).subscribe(subject);
            if (resetOnDisconnect) {
                connection.add(function () { return (subject = connector()); });
            }
        }
        return connection;
    };
    return result;
}
//# sourceMappingURL=connectable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js







function forkJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    var _a = argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
    var result = new Observable(function (subscriber) {
        var length = sources.length;
        if (!length) {
            subscriber.complete();
            return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function (sourceIndex) {
            var hasValue = false;
            innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber(subscriber, function (value) {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, function () { return remainingCompletions--; }, undefined, function () {
                if (!remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? createObject(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
        }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
//# sourceMappingURL=forkJoin.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js







var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike(target)) {
            return mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(innerFrom(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js



function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs(resultSelector));
    }
    return new Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}
//# sourceMappingURL=fromEventPattern.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/generate.js





function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity : _b, scheduler = _a.scheduler);
    }
    else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    function gen() {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = initialState;
                    _a.label = 1;
                case 1:
                    if (!(!condition || condition(state))) return [3, 4];
                    return [4, resultSelector(state)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    state = iterate(state);
                    return [3, 1];
                case 4: return [2];
            }
        });
    }
    return defer((scheduler
        ?
            function () { return scheduleIterable(gen(), scheduler); }
        :
            gen));
}
//# sourceMappingURL=generate.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/iif.js

function iif(condition, trueResult, falseResult) {
    return defer(function () { return (condition() ? trueResult : falseResult); });
}
//# sourceMappingURL=iif.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/timer.js




function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async_async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable(function (subscriber) {
        var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
//# sourceMappingURL=timer.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/interval.js


function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer(period, period, scheduler);
}
//# sourceMappingURL=interval.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/merge.js





function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            EMPTY
        : sources.length === 1
            ?
                innerFrom(sources[0])
            :
                mergeAll(concurrent)(from(sources, scheduler));
}
//# sourceMappingURL=merge.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/never.js


var NEVER = new Observable(noop);
function never() {
    return NEVER;
}
//# sourceMappingURL=never.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js
var argsOrArgArray_isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && argsOrArgArray_isArray(args[0]) ? args[0] : args;
}
//# sourceMappingURL=argsOrArgArray.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/onErrorResumeNext.js






function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray(sources);
    return operate(function (source, subscriber) {
        var remaining = __spreadArray([source], __read(nextSources));
        var subscribeNext = function () {
            if (!subscriber.closed) {
                if (remaining.length > 0) {
                    var nextSource = void 0;
                    try {
                        nextSource = innerFrom(remaining.shift());
                    }
                    catch (err) {
                        subscribeNext();
                        return;
                    }
                    var innerSub = new OperatorSubscriber(subscriber, undefined, noop, noop);
                    subscriber.add(nextSource.subscribe(innerSub));
                    innerSub.add(subscribeNext);
                }
                else {
                    subscriber.complete();
                }
            }
        };
        subscribeNext();
    });
}
//# sourceMappingURL=onErrorResumeNext.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/onErrorResumeNext.js



function onErrorResumeNext_onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return onErrorResumeNext(argsOrArgArray(sources))(EMPTY);
}
//# sourceMappingURL=onErrorResumeNext.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/pairs.js

function pairs(obj, scheduler) {
    return from(Object.entries(obj), scheduler);
}
//# sourceMappingURL=pairs.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/util/not.js
function not(pred, thisArg) {
    return function (value, index) { return !pred.call(thisArg, value, index); };
}
//# sourceMappingURL=not.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/filter.js


function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=filter.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/partition.js



function partition(source, predicate, thisArg) {
    return [filter(predicate, thisArg)(innerFrom(source)), filter(not(predicate, thisArg))(innerFrom(source))];
}
//# sourceMappingURL=partition.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/race.js




function race() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray(sources);
    return sources.length === 1 ? innerFrom(sources[0]) : new Observable(raceInit(sources));
}
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(innerFrom(sources[i]).subscribe(new OperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}
//# sourceMappingURL=race.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/range.js


function range(start, count, scheduler) {
    if (count == null) {
        count = start;
        start = 0;
    }
    if (count <= 0) {
        return EMPTY;
    }
    var end = count + start;
    return new Observable(scheduler
        ?
            function (subscriber) {
                var n = start;
                return scheduler.schedule(function () {
                    if (n < end) {
                        subscriber.next(n++);
                        this.schedule();
                    }
                    else {
                        subscriber.complete();
                    }
                });
            }
        :
            function (subscriber) {
                var n = start;
                while (n < end && !subscriber.closed) {
                    subscriber.next(n++);
                }
                subscriber.complete();
            });
}
//# sourceMappingURL=range.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/using.js



function using(resourceFactory, observableFactory) {
    return new Observable(function (subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? innerFrom(result) : EMPTY;
        source.subscribe(subscriber);
        return function () {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
//# sourceMappingURL=using.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/zip.js







function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    var sources = argsOrArgArray(args);
    return sources.length
        ? new Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : EMPTY;
}
//# sourceMappingURL=zip.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/audit.js



function audit(durationSelector) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
            isComplete && subscriber.complete();
        };
        var cleanupDuration = function () {
            durationSubscriber = null;
            isComplete && subscriber.complete();
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
                innerFrom(durationSelector(value)).subscribe((durationSubscriber = new OperatorSubscriber(subscriber, endDuration, cleanupDuration)));
            }
        }, function () {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=audit.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/auditTime.js



function auditTime(duration, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return audit(function () { return timer(duration, scheduler); });
}
//# sourceMappingURL=auditTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/buffer.js



function buffer(closingNotifier) {
    return operate(function (source, subscriber) {
        var currentBuffer = [];
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        closingNotifier.subscribe(new OperatorSubscriber(subscriber, function () {
            var b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop));
        return function () {
            currentBuffer = null;
        };
    });
}
//# sourceMappingURL=buffer.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js




function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return operate(function (source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var e_1, _a, e_2, _b;
            var toEmit = null;
            if (count++ % startBufferEvery === 0) {
                buffers.push([]);
            }
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                    if (bufferSize <= buffer.length) {
                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                        toEmit.push(buffer);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (toEmit) {
                try {
                    for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                        var buffer = toEmit_1_1.value;
                        arrRemove(buffers, buffer);
                        subscriber.next(buffer);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }, function () {
            var e_3, _a;
            try {
                for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                    var buffer = buffers_2_1.value;
                    subscriber.next(buffer);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            subscriber.complete();
        }, undefined, function () {
            buffers = null;
        }));
    });
}
//# sourceMappingURL=bufferCount.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/bufferTime.js








function bufferTime(bufferTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxBufferSize = otherArgs[1] || Infinity;
    return operate(function (source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function (record) {
            var buffer = record.buffer, subs = record.subs;
            subs.unsubscribe();
            arrRemove(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
        };
        var startBuffer = function () {
            if (bufferRecords) {
                var subs = new Subscription();
                subscriber.add(subs);
                var buffer = [];
                var record_1 = {
                    buffer: buffer,
                    subs: subs,
                };
                bufferRecords.push(record_1);
                executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
            }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        }
        else {
            restartOnEmit = true;
        }
        startBuffer();
        var bufferTimeSubscriber = new OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var recordsCopy = bufferRecords.slice();
            try {
                for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                    var record = recordsCopy_1_1.value;
                    var buffer = record.buffer;
                    buffer.push(value);
                    maxBufferSize <= buffer.length && emit(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
        }, undefined, function () { return (bufferRecords = null); });
        source.subscribe(bufferTimeSubscriber);
    });
}
//# sourceMappingURL=bufferTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/bufferToggle.js







function bufferToggle(openings, closingSelector) {
    return operate(function (source, subscriber) {
        var buffers = [];
        innerFrom(openings).subscribe(new OperatorSubscriber(subscriber, function (openValue) {
            var buffer = [];
            buffers.push(buffer);
            var closingSubscription = new Subscription();
            var emitBuffer = function () {
                arrRemove(buffers, buffer);
                subscriber.next(buffer);
                closingSubscription.unsubscribe();
            };
            closingSubscription.add(innerFrom(closingSelector(openValue)).subscribe(new OperatorSubscriber(subscriber, emitBuffer, noop)));
        }, noop));
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                    var buffer = buffers_1_1.value;
                    buffer.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (buffers.length > 0) {
                subscriber.next(buffers.shift());
            }
            subscriber.complete();
        }));
    });
}
//# sourceMappingURL=bufferToggle.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/bufferWhen.js




function bufferWhen(closingSelector) {
    return operate(function (source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            var b = buffer;
            buffer = [];
            b && subscriber.next(b);
            innerFrom(closingSelector()).subscribe((closingSubscriber = new OperatorSubscriber(subscriber, openBuffer, noop)));
        };
        openBuffer();
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, function () { return (buffer = closingSubscriber = null); }));
    });
}
//# sourceMappingURL=bufferWhen.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/catchError.js



function catchError(selector) {
    return operate(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(new OperatorSubscriber(subscriber, undefined, undefined, function (err) {
            handledResult = innerFrom(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
//# sourceMappingURL=catchError.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js

function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function (source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (function () {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}
//# sourceMappingURL=scanInternals.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/reduce.js


function reduce(accumulator, seed) {
    return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
//# sourceMappingURL=reduce.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/toArray.js


var arrReducer = function (arr, value) { return (arr.push(value), arr); };
function toArray() {
    return operate(function (source, subscriber) {
        reduce(arrReducer, [])(source).subscribe(subscriber);
    });
}
//# sourceMappingURL=toArray.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/joinAllInternals.js





function joinAllInternals(joinFn, project) {
    return pipe(toArray(), mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs(project) : identity);
}
//# sourceMappingURL=joinAllInternals.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/combineLatestAll.js


function combineLatestAll(project) {
    return joinAllInternals(combineLatest, project);
}
//# sourceMappingURL=combineLatestAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/combineAll.js

var combineAll = combineLatestAll;
//# sourceMappingURL=combineAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js







function combineLatest_combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = popResultSelector(args);
    return resultSelector
        ? pipe(combineLatest_combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector))
        : operate(function (source, subscriber) {
            combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
        });
}
//# sourceMappingURL=combineLatest.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js


function combineLatestWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return combineLatest_combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}
//# sourceMappingURL=combineLatestWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/concatMap.js


function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}
//# sourceMappingURL=concatMap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/concatMapTo.js


function concatMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? concatMap(function () { return innerObservable; }, resultSelector) : concatMap(function () { return innerObservable; });
}
//# sourceMappingURL=concatMapTo.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/concat.js





function concat_concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return operate(function (source, subscriber) {
        concatAll()(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
//# sourceMappingURL=concat.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/concatWith.js


function concatWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return concat_concat.apply(void 0, __spreadArray([], __read(otherSources)));
}
//# sourceMappingURL=concatWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/observable/fromSubscribable.js

function fromSubscribable(subscribable) {
    return new Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
}
//# sourceMappingURL=fromSubscribable.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/connect.js




var connect_DEFAULT_CONFIG = {
    connector: function () { return new Subject(); },
};
function connect(selector, config) {
    if (config === void 0) { config = connect_DEFAULT_CONFIG; }
    var connector = config.connector;
    return operate(function (source, subscriber) {
        var subject = connector();
        from(selector(fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
//# sourceMappingURL=connect.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/count.js

function count(predicate) {
    return reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
}
//# sourceMappingURL=count.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/debounce.js




function debounce(durationSelector) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function () {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = new OperatorSubscriber(subscriber, emit, noop);
            innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = durationSubscriber = null;
        }));
    });
}
//# sourceMappingURL=debounce.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js



function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return operate(function (source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function () {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            var targetTime = lastTime + dueTime;
            var now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, function () {
            emit();
            subscriber.complete();
        }, undefined, function () {
            lastValue = activeTask = null;
        }));
    });
}
//# sourceMappingURL=debounceTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js


function defaultIfEmpty(defaultValue) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
//# sourceMappingURL=defaultIfEmpty.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/take.js



function take(count) {
    return count <= 0
        ?
            function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
//# sourceMappingURL=take.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js



function ignoreElements() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, noop));
    });
}
//# sourceMappingURL=ignoreElements.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js

function mapTo(value) {
    return map(function () { return value; });
}
//# sourceMappingURL=mapTo.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js





function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
    }
    return mergeMap(function (value, index) { return delayDurationSelector(value, index).pipe(take(1), mapTo(value)); });
}
//# sourceMappingURL=delayWhen.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/delay.js



function delay(due, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    var duration = timer(due, scheduler);
    return delayWhen(function () { return duration; });
}
//# sourceMappingURL=delay.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/dematerialize.js



function dematerialize() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function (notification) { return observeNotification(notification, subscriber); }));
    });
}
//# sourceMappingURL=dematerialize.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/distinct.js



function distinct(keySelector, flushes) {
    return operate(function (source, subscriber) {
        var distinctKeys = new Set();
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes === null || flushes === void 0 ? void 0 : flushes.subscribe(new OperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop));
    });
}
//# sourceMappingURL=distinct.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js



function distinctUntilChanged(comparator, keySelector) {
    if (keySelector === void 0) { keySelector = identity; }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return operate(function (source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
function defaultCompare(a, b) {
    return a === b;
}
//# sourceMappingURL=distinctUntilChanged.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilKeyChanged.js

function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
}
//# sourceMappingURL=distinctUntilKeyChanged.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js



function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
function defaultErrorFactory() {
    return new EmptyError();
}
//# sourceMappingURL=throwIfEmpty.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/elementAt.js





function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(filter(function (v, i) { return i === index; }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new ArgumentOutOfRangeError(); }));
    };
}
//# sourceMappingURL=elementAt.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/endWith.js



function endWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return function (source) { return concat(source, of.apply(void 0, __spreadArray([], __read(values)))); };
}
//# sourceMappingURL=endWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/every.js


function every(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            if (!predicate.call(thisArg, value, index++, source)) {
                subscriber.next(false);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
//# sourceMappingURL=every.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/exhaustAll.js



function exhaustAll() {
    return operate(function (source, subscriber) {
        var isComplete = false;
        var innerSub = null;
        source.subscribe(new OperatorSubscriber(subscriber, function (inner) {
            if (!innerSub) {
                innerSub = innerFrom(inner).subscribe(new OperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                }));
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=exhaustAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/exhaust.js

var exhaust = exhaustAll;
//# sourceMappingURL=exhaust.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/exhaustMap.js




function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) { return innerFrom(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
        };
    }
    return operate(function (source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (outerValue) {
            if (!innerSub) {
                innerSub = new OperatorSubscriber(subscriber, undefined, function () {
                    innerSub = null;
                    isComplete && subscriber.complete();
                });
                innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
        }, function () {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=exhaustMap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/expand.js


function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) { concurrent = Infinity; }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return operate(function (source, subscriber) {
        return mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
    });
}
//# sourceMappingURL=expand.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/finalize.js

function finalize(callback) {
    return operate(function (source, subscriber) {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
//# sourceMappingURL=finalize.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/find.js


function find(predicate, thisArg) {
    return operate(createFind(predicate, thisArg, 'value'));
}
function createFind(predicate, thisArg, emit) {
    var findIndex = emit === 'index';
    return function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var i = index++;
            if (predicate.call(thisArg, value, i, source)) {
                subscriber.next(findIndex ? i : value);
                subscriber.complete();
            }
        }, function () {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
        }));
    };
}
//# sourceMappingURL=find.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/findIndex.js


function findIndex(predicate, thisArg) {
    return operate(createFind(predicate, thisArg, 'index'));
}
//# sourceMappingURL=findIndex.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/first.js






function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}
//# sourceMappingURL=first.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/groupBy.js






function groupBy(keySelector, elementOrOptions, duration, connector) {
    return operate(function (source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === 'function') {
            element = elementOrOptions;
        }
        else {
            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
        }
        var groups = new Map();
        var notify = function (cb) {
            groups.forEach(cb);
            cb(subscriber);
        };
        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
        var groupBySourceSubscriber = new GroupBySubscriber(subscriber, function (value) {
            try {
                var key_1 = keySelector(value);
                var group_1 = groups.get(key_1);
                if (!group_1) {
                    groups.set(key_1, (group_1 = connector ? connector() : new Subject()));
                    var grouped = createGroupedObservable(key_1, group_1);
                    subscriber.next(grouped);
                    if (duration) {
                        var durationSubscriber_1 = new OperatorSubscriber(group_1, function () {
                            group_1.complete();
                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                        }, undefined, undefined, function () { return groups.delete(key_1); });
                        groupBySourceSubscriber.add(innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                    }
                }
                group_1.next(element ? element(value) : value);
            }
            catch (err) {
                handleError(err);
            }
        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
            var result = new Observable(function (groupSubscriber) {
                groupBySourceSubscriber.activeGroups++;
                var innerSub = groupSubject.subscribe(groupSubscriber);
                return function () {
                    innerSub.unsubscribe();
                    --groupBySourceSubscriber.activeGroups === 0 &&
                        groupBySourceSubscriber.teardownAttempted &&
                        groupBySourceSubscriber.unsubscribe();
                };
            });
            result.key = key;
            return result;
        }
    });
}
var GroupBySubscriber = (function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeGroups = 0;
        _this.teardownAttempted = false;
        return _this;
    }
    GroupBySubscriber.prototype.unsubscribe = function () {
        this.teardownAttempted = true;
        this.activeGroups === 0 && _super.prototype.unsubscribe.call(this);
    };
    return GroupBySubscriber;
}(OperatorSubscriber));
//# sourceMappingURL=groupBy.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/isEmpty.js


function isEmpty() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function () {
            subscriber.next(false);
            subscriber.complete();
        }, function () {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
//# sourceMappingURL=isEmpty.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/takeLast.js




function takeLast(count) {
    return count <= 0
        ? function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var buffer = [];
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                buffer.push(value);
                count < buffer.length && buffer.shift();
            }, function () {
                var e_1, _a;
                try {
                    for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                        var value = buffer_1_1.value;
                        subscriber.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                subscriber.complete();
            }, undefined, function () {
                buffer = null;
            }));
        });
}
//# sourceMappingURL=takeLast.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/last.js






function last_last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}
//# sourceMappingURL=last.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/materialize.js



function materialize() {
    return operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            subscriber.next(Notification.createNext(value));
        }, function () {
            subscriber.next(Notification.createComplete());
            subscriber.complete();
        }, function (err) {
            subscriber.next(Notification.createError(err));
            subscriber.complete();
        }));
    });
}
//# sourceMappingURL=materialize.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/max.js


function max(comparer) {
    return reduce(isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
}
//# sourceMappingURL=max.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/flatMap.js

var flatMap = mergeMap;
//# sourceMappingURL=flatMap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeMapTo.js


function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction(resultSelector)) {
        return mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return mergeMap(function () { return innerObservable; }, concurrent);
}
//# sourceMappingURL=mergeMapTo.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeScan.js


function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return operate(function (source, subscriber) {
        var state = seed;
        return mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
            state = value;
        }, false, undefined, function () { return (state = null); });
    });
}
//# sourceMappingURL=mergeScan.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/merge.js






function merge_merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    args = argsOrArgArray(args);
    return operate(function (source, subscriber) {
        mergeAll(concurrent)(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
    });
}
//# sourceMappingURL=merge.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js


function mergeWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return merge_merge.apply(void 0, __spreadArray([], __read(otherSources)));
}
//# sourceMappingURL=mergeWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/min.js


function min(comparer) {
    return reduce(isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
}
//# sourceMappingURL=min.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/multicast.js



function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
    if (isFunction(selector)) {
        return connect(selector, {
            connector: subjectFactory,
        });
    }
    return function (source) { return new ConnectableObservable(source, subjectFactory); };
}
//# sourceMappingURL=multicast.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/pairwise.js


function pairwise() {
    return operate(function (source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
//# sourceMappingURL=pairwise.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/pluck.js

function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map(function (x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
//# sourceMappingURL=pluck.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/publish.js



function publish(selector) {
    return selector ? function (source) { return connect(selector)(source); } : function (source) { return multicast(new Subject())(source); };
}
//# sourceMappingURL=publish.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/publishBehavior.js


function publishBehavior(initialValue) {
    return function (source) {
        var subject = new BehaviorSubject(initialValue);
        return new ConnectableObservable(source, function () { return subject; });
    };
}
//# sourceMappingURL=publishBehavior.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/publishLast.js


function publishLast() {
    return function (source) {
        var subject = new AsyncSubject();
        return new ConnectableObservable(source, function () { return subject; });
    };
}
//# sourceMappingURL=publishLast.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/publishReplay.js



function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return function (source) { return multicast(new ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
}
//# sourceMappingURL=publishReplay.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/raceWith.js




function raceWith() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
    }
    return !otherSources.length
        ? identity
        : operate(function (source, subscriber) {
            raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
        });
}
//# sourceMappingURL=raceWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/repeat.js





function repeat(countOrConfig) {
    var _a;
    var count = Infinity;
    var delay;
    if (countOrConfig != null) {
        if (typeof countOrConfig === 'object') {
            (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
        }
        else {
            count = countOrConfig;
        }
    }
    return count <= 0
        ? function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var soFar = 0;
            var sourceSub;
            var resubscribe = function () {
                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
                sourceSub = null;
                if (delay != null) {
                    var notifier = typeof delay === 'number' ? timer(delay) : innerFrom(delay(soFar));
                    var notifierSubscriber_1 = new OperatorSubscriber(subscriber, function () {
                        notifierSubscriber_1.unsubscribe();
                        subscribeToSource();
                    });
                    notifier.subscribe(notifierSubscriber_1);
                }
                else {
                    subscribeToSource();
                }
            };
            var subscribeToSource = function () {
                var syncUnsub = false;
                sourceSub = source.subscribe(new OperatorSubscriber(subscriber, undefined, function () {
                    if (++soFar < count) {
                        if (sourceSub) {
                            resubscribe();
                        }
                        else {
                            syncUnsub = true;
                        }
                    }
                    else {
                        subscriber.complete();
                    }
                }));
                if (syncUnsub) {
                    resubscribe();
                }
            };
            subscribeToSource();
        });
}
//# sourceMappingURL=repeat.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/repeatWhen.js



function repeatWhen(notifier) {
    return operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
        var getCompletionSubject = function () {
            if (!completions$) {
                completions$ = new Subject();
                notifier(completions$).subscribe(new OperatorSubscriber(subscriber, function () {
                    if (innerSub) {
                        subscribeForRepeatWhen();
                    }
                    else {
                        syncResub = true;
                    }
                }, function () {
                    isNotifierComplete = true;
                    checkComplete();
                }));
            }
            return completions$;
        };
        var subscribeForRepeatWhen = function () {
            isMainComplete = false;
            innerSub = source.subscribe(new OperatorSubscriber(subscriber, undefined, function () {
                isMainComplete = true;
                !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRepeatWhen();
            }
        };
        subscribeForRepeatWhen();
    });
}
//# sourceMappingURL=repeatWhen.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/retry.js





function retry(configOrCount) {
    if (configOrCount === void 0) { configOrCount = Infinity; }
    var config;
    if (configOrCount && typeof configOrCount === 'object') {
        config = configOrCount;
    }
    else {
        config = {
            count: configOrCount,
        };
    }
    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
    return count <= 0
        ? identity
        : operate(function (source, subscriber) {
            var soFar = 0;
            var innerSub;
            var subscribeForRetry = function () {
                var syncUnsub = false;
                innerSub = source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                    if (resetOnSuccess) {
                        soFar = 0;
                    }
                    subscriber.next(value);
                }, undefined, function (err) {
                    if (soFar++ < count) {
                        var resub_1 = function () {
                            if (innerSub) {
                                innerSub.unsubscribe();
                                innerSub = null;
                                subscribeForRetry();
                            }
                            else {
                                syncUnsub = true;
                            }
                        };
                        if (delay != null) {
                            var notifier = typeof delay === 'number' ? timer(delay) : innerFrom(delay(err, soFar));
                            var notifierSubscriber_1 = new OperatorSubscriber(subscriber, function () {
                                notifierSubscriber_1.unsubscribe();
                                resub_1();
                            }, function () {
                                subscriber.complete();
                            });
                            notifier.subscribe(notifierSubscriber_1);
                        }
                        else {
                            resub_1();
                        }
                    }
                    else {
                        subscriber.error(err);
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                }
            };
            subscribeForRetry();
        });
}
//# sourceMappingURL=retry.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/retryWhen.js



function retryWhen(notifier) {
    return operate(function (source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function () {
            innerSub = source.subscribe(new OperatorSubscriber(subscriber, undefined, undefined, function (err) {
                if (!errors$) {
                    errors$ = new Subject();
                    notifier(errors$).subscribe(new OperatorSubscriber(subscriber, function () {
                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
                    }));
                }
                if (errors$) {
                    errors$.next(err);
                }
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRetryWhen();
            }
        };
        subscribeForRetryWhen();
    });
}
//# sourceMappingURL=retryWhen.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/sample.js



function sample(notifier) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            lastValue = value;
        }));
        var emit = function () {
            if (hasValue) {
                hasValue = false;
                var value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        notifier.subscribe(new OperatorSubscriber(subscriber, emit, noop));
    });
}
//# sourceMappingURL=sample.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/sampleTime.js



function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return sample(interval(period, scheduler));
}
//# sourceMappingURL=sampleTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/scan.js


function scan(accumulator, seed) {
    return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
}
//# sourceMappingURL=scan.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/sequenceEqual.js


function sequenceEqual(compareTo, comparator) {
    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
    return operate(function (source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function (isEqual) {
            subscriber.next(isEqual);
            subscriber.complete();
        };
        var createSubscriber = function (selfState, otherState) {
            var sequenceEqualSubscriber = new OperatorSubscriber(subscriber, function (a) {
                var buffer = otherState.buffer, complete = otherState.complete;
                if (buffer.length === 0) {
                    complete ? emit(false) : selfState.buffer.push(a);
                }
                else {
                    !comparator(a, buffer.shift()) && emit(false);
                }
            }, function () {
                selfState.complete = true;
                var complete = otherState.complete, buffer = otherState.buffer;
                complete && emit(buffer.length === 0);
                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        compareTo.subscribe(createSubscriber(bState, aState));
    });
}
function createState() {
    return {
        buffer: [],
        complete: false,
    };
}
//# sourceMappingURL=sequenceEqual.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/share.js






function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection = null;
        var resetConnection = null;
        var subject = null;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = null;
        };
        var reset = function () {
            cancelReset();
            connection = subject = null;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                from(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return null;
    }
    if (on === false) {
        return null;
    }
    return on.apply(void 0, __spreadArray([], __read(args))).pipe(take(1))
        .subscribe(function () { return reset(); });
}
//# sourceMappingURL=share.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js


function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
        windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
        refCount = !!configOrBufferSize.refCount;
        scheduler = configOrBufferSize.scheduler;
    }
    else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return share({
        connector: function () { return new ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}
//# sourceMappingURL=shareReplay.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/single.js





function single(predicate) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, function () {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError('No matching values') : new EmptyError());
            }
        }));
    });
}
//# sourceMappingURL=single.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/skip.js

function skip(count) {
    return filter(function (_, index) { return count <= index; });
}
//# sourceMappingURL=skip.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/skipLast.js



function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity
        : operate(function (source, subscriber) {
            var ring = new Array(skipCount);
            var seen = 0;
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                var valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    var index = valueIndex % skipCount;
                    var oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return function () {
                ring = null;
            };
        });
}
//# sourceMappingURL=skipLast.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/skipUntil.js




function skipUntil(notifier) {
    return operate(function (source, subscriber) {
        var taking = false;
        var skipSubscriber = new OperatorSubscriber(subscriber, function () {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
        }, noop);
        innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
    });
}
//# sourceMappingURL=skipUntil.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/skipWhile.js


function skipWhile(predicate) {
    return operate(function (source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=skipWhile.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/startWith.js



function startWith() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var scheduler = popScheduler(values);
    return operate(function (source, subscriber) {
        (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
    });
}
//# sourceMappingURL=startWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js



function switchMap(project, resultSelector) {
    return operate(function (source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
            var innerIndex = 0;
            var outerIndex = index++;
            innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = new OperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                innerSubscriber = null;
                checkComplete();
            })));
        }, function () {
            isComplete = true;
            checkComplete();
        }));
    });
}
//# sourceMappingURL=switchMap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/switchAll.js


function switchAll() {
    return switchMap(identity);
}
//# sourceMappingURL=switchAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/switchMapTo.js


function switchMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector) ? switchMap(function () { return innerObservable; }, resultSelector) : switchMap(function () { return innerObservable; });
}
//# sourceMappingURL=switchMapTo.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/switchScan.js


function switchScan(accumulator, seed) {
    return operate(function (source, subscriber) {
        var state = seed;
        switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
        return function () {
            state = null;
        };
    });
}
//# sourceMappingURL=switchScan.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js




function takeUntil(notifier) {
    return operate(function (source, subscriber) {
        innerFrom(notifier).subscribe(new OperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
//# sourceMappingURL=takeUntil.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js


function takeWhile(predicate, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=takeWhile.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/tap.js




function tap(observerOrNext, error, complete) {
    var tapObserver = isFunction(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error: error, complete: complete }
        : observerOrNext;
    return tapObserver
        ? operate(function (source, subscriber) {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            var isUnsub = true;
            source.subscribe(new OperatorSubscriber(subscriber, function (value) {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, function () {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, function (err) {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, function () {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity;
}
//# sourceMappingURL=tap.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/throttle.js



var defaultThrottleConfig = {
    leading: true,
    trailing: false,
};
function throttle(durationSelector, config) {
    if (config === void 0) { config = defaultThrottleConfig; }
    return operate(function (source, subscriber) {
        var leading = config.leading, trailing = config.trailing;
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function () {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
                send();
                isComplete && subscriber.complete();
            }
        };
        var cleanupThrottling = function () {
            throttled = null;
            isComplete && subscriber.complete();
        };
        var startThrottle = function (value) {
            return (throttled = innerFrom(durationSelector(value)).subscribe(new OperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
        };
        var send = function () {
            if (hasValue) {
                hasValue = false;
                var value = sendValue;
                sendValue = null;
                subscriber.next(value);
                !isComplete && startThrottle(value);
            }
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function () {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
    });
}
//# sourceMappingURL=throttle.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js



function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    if (config === void 0) { config = defaultThrottleConfig; }
    var duration$ = timer(duration, scheduler);
    return throttle(function () { return duration$; }, config);
}
//# sourceMappingURL=throttleTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js




function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = asyncScheduler; }
    return function (source) {
        return defer(function () {
            return source.pipe(scan(function (_a, value) {
                var current = _a.current;
                return ({ value: value, current: scheduler.now(), last: current });
            }, {
                current: scheduler.now(),
                value: undefined,
                last: undefined,
            }), map(function (_a) {
                var current = _a.current, last = _a.last, value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());

//# sourceMappingURL=timeInterval.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/timeoutWith.js



function timeoutWith(due, withObservable, scheduler) {
    var first;
    var each;
    var _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_async;
    if (isValidDate(due)) {
        first = due;
    }
    else if (typeof due === 'number') {
        each = due;
    }
    if (withObservable) {
        _with = function () { return withObservable; };
    }
    else {
        throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return timeout({
        first: first,
        each: each,
        scheduler: scheduler,
        with: _with,
    });
}
//# sourceMappingURL=timeoutWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/timestamp.js


function timestamp(timestampProvider) {
    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider; }
    return map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
}
//# sourceMappingURL=timestamp.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/window.js




function window_window(windowBoundaries) {
    return operate(function (source, subscriber) {
        var windowSubject = new Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function (err) {
            windowSubject.error(err);
            subscriber.error(err);
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
            windowSubject.complete();
            subscriber.complete();
        }, errorHandler));
        windowBoundaries.subscribe(new OperatorSubscriber(subscriber, function () {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject()));
        }, noop, errorHandler));
        return function () {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
        };
    });
}
//# sourceMappingURL=window.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/windowCount.js




function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return operate(function (source, subscriber) {
        var windows = [new Subject()];
        var starts = [];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            try {
                for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                    var window_1 = windows_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
                windows.shift().complete();
            }
            if (++count % startEvery === 0) {
                var window_2 = new Subject();
                windows.push(window_2);
                subscriber.next(window_2.asObservable());
            }
        }, function () {
            while (windows.length > 0) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, function (err) {
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        }, function () {
            starts = null;
            windows = null;
        }));
    });
}
//# sourceMappingURL=windowCount.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/windowTime.js








function windowTime(windowTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxWindowSize = otherArgs[1] || Infinity;
    return operate(function (source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function (record) {
            var window = record.window, subs = record.subs;
            window.complete();
            subs.unsubscribe();
            arrRemove(windowRecords, record);
            restartOnClose && startWindow();
        };
        var startWindow = function () {
            if (windowRecords) {
                var subs = new Subscription();
                subscriber.add(subs);
                var window_1 = new Subject();
                var record_1 = {
                    window: window_1,
                    subs: subs,
                    seen: 0,
                };
                windowRecords.push(record_1);
                subscriber.next(window_1.asObservable());
                executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
            }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
        }
        else {
            restartOnClose = true;
        }
        startWindow();
        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
        var terminate = function (cb) {
            loop(function (_a) {
                var window = _a.window;
                return cb(window);
            });
            cb(subscriber);
            subscriber.unsubscribe();
        };
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            loop(function (record) {
                record.window.next(value);
                maxWindowSize <= ++record.seen && closeWindow(record);
            });
        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
        return function () {
            windowRecords = null;
        };
    });
}
//# sourceMappingURL=windowTime.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/windowToggle.js








function windowToggle(openings, closingSelector) {
    return operate(function (source, subscriber) {
        var windows = [];
        var handleError = function (err) {
            while (0 < windows.length) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        };
        innerFrom(openings).subscribe(new OperatorSubscriber(subscriber, function (openValue) {
            var window = new Subject();
            windows.push(window);
            var closingSubscription = new Subscription();
            var closeWindow = function () {
                arrRemove(windows, window);
                window.complete();
                closingSubscription.unsubscribe();
            };
            var closingNotifier;
            try {
                closingNotifier = innerFrom(closingSelector(openValue));
            }
            catch (err) {
                handleError(err);
                return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(closingNotifier.subscribe(new OperatorSubscriber(subscriber, closeWindow, noop, handleError)));
        }, noop));
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            var e_1, _a;
            var windowsCopy = windows.slice();
            try {
                for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                    var window_1 = windowsCopy_1_1.value;
                    window_1.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }, function () {
            while (0 < windows.length) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, handleError, function () {
            while (0 < windows.length) {
                windows.shift().unsubscribe();
            }
        }));
    });
}
//# sourceMappingURL=windowToggle.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/windowWhen.js




function windowWhen(closingSelector) {
    return operate(function (source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function (err) {
            window.error(err);
            subscriber.error(err);
        };
        var openWindow = function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window === null || window === void 0 ? void 0 : window.complete();
            window = new Subject();
            subscriber.next(window.asObservable());
            var closingNotifier;
            try {
                closingNotifier = innerFrom(closingSelector());
            }
            catch (err) {
                handleError(err);
                return;
            }
            closingNotifier.subscribe((closingSubscriber = new OperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
        };
        openWindow();
        source.subscribe(new OperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
            window.complete();
            subscriber.complete();
        }, handleError, function () {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window = null;
        }));
    });
}
//# sourceMappingURL=windowWhen.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js







function withLatestFrom() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var project = popResultSelector(inputs);
    return operate(function (source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function () { return false; });
        var ready = false;
        var _loop_1 = function (i) {
            innerFrom(inputs[i]).subscribe(new OperatorSubscriber(subscriber, function (value) {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity)) && (hasValue = null);
                }
            }, noop));
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        source.subscribe(new OperatorSubscriber(subscriber, function (value) {
            if (ready) {
                var values = __spreadArray([value], __read(otherValues));
                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
            }
        }));
    });
}
//# sourceMappingURL=withLatestFrom.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/zipAll.js


function zipAll(project) {
    return joinAllInternals(zip, project);
}
//# sourceMappingURL=zipAll.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/zip.js



function zip_zip() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return operate(function (source, subscriber) {
        zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
}
//# sourceMappingURL=zip.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/internal/operators/zipWith.js


function zipWith() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
    }
    return zip_zip.apply(void 0, __spreadArray([], __read(otherInputs)));
}
//# sourceMappingURL=zipWith.js.map
;// CONCATENATED MODULE: ./node_modules/rxjs/dist/esm5/index.js







































































































































































//# sourceMappingURL=index.js.map

/***/ }),

/***/ 585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleRoot = exports.RedumbxApp = void 0;
const jsx_runtime_1 = __webpack_require__(893);
const react_1 = __webpack_require__(359);
const store_1 = __webpack_require__(971);
const hooks_1 = __webpack_require__(886);
const useModule_1 = __webpack_require__(603);
const module_manager_1 = __webpack_require__(10);
function RedumbxApp(p) {
    const [moduleManager] = (0, react_1.useState)(() => {
        const { moduleManager, services } = p;
        if (moduleManager) {
            if (services)
                moduleManager.registerMany(services);
            return moduleManager;
        }
        return services ? (0, module_manager_1.createModuleManager)(services) : (0, module_manager_1.createModuleManager)();
    });
    (0, hooks_1.useOnDestroy)(() => {
        (0, module_manager_1.destroyModuleManager)(moduleManager.id);
    });
    return ((0, jsx_runtime_1.jsx)(useModule_1.StoreContext.Provider, Object.assign({ value: moduleManager.id }, { children: p.children }), void 0));
}
exports.RedumbxApp = RedumbxApp;
function ModuleRoot(p) {
    const moduleManager = (0, useModule_1.useModuleManager)();
    const { moduleName, scope, store } = (0, hooks_1.useOnCreate)(() => {
        const store = moduleManager.resolve(store_1.ReactiveStore);
        const moduleName = p.module.prototype.constructor.name;
        const scope = moduleManager.registerScope({ [moduleName]: p.module });
        return { scope, moduleName, store };
    });
    store.setModuleContext(moduleName, scope);
    (0, react_1.useEffect)(() => {
        store.resetModuleContext(moduleName);
    });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: p.children }, void 0);
}
exports.ModuleRoot = ModuleRoot;


/***/ }),

/***/ 407:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDependencyWatcher = void 0;
/**
 * Wraps the given object in a Proxy for watching read operations on this object
 *
 * @example
 *
 * const myObject = { foo: 1, bar: 2, qux: 3};
 * const { watcherProxy, getDependentFields } = createDependencyWatcher(myObject);
 * const { foo, bar } = watcherProxy;
 * getDependentFields(); // returns ['foo', 'bar'];
 *
 */
function createDependencyWatcher(watchedObject) {
    const dependencies = {};
    const watcherProxy = new Proxy({
        _proxyName: 'DependencyWatcher',
        _watchedObject: watchedObject,
        _dependencies: dependencies,
    }, {
        get: (target, propName) => {
            // if (propName === 'hasOwnProperty') return watchedObject.hasOwnProperty;
            if (propName in target)
                return target[propName];
            const value = watchedObject[propName];
            dependencies[propName] = value;
            return value;
            // }
        },
    });
    function getDependentFields() {
        return Object.keys(dependencies);
    }
    function getDependentValues() {
        const values = {};
        Object.keys(dependencies).forEach((propName) => {
            const value = dependencies[propName];
            // if one of the dependencies is a Binding then expose its internal dependencies
            if (value && value._proxyName === 'Binding') {
                const bindingMetadata = value._binding;
                Object.keys(bindingMetadata.dependencies).forEach((bindingPropName) => {
                    values[`${bindingPropName}__binding-${bindingMetadata.id}`] = dependencies[propName][bindingPropName].value;
                });
                return;
            }
            // if it's not a Binding then just take the value from the watchedObject
            values[propName] = watchedObject[propName];
        });
        return values;
    }
    return { watcherProxy, getDependentFields, getDependentValues };
}
exports.createDependencyWatcher = createDependencyWatcher;


/***/ }),

/***/ 886:
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
exports.useForceUpdate = exports.useComponentId = exports.useOnDestroy = exports.useOnCreate = void 0;
const react_1 = __importStar(__webpack_require__(359));
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
        return error.stack.split('\n')[10].split('at ')[1].split('(')[0].trim();
    }
}
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
__exportStar(__webpack_require__(603), exports);
__exportStar(__webpack_require__(971), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(585), exports);
__exportStar(__webpack_require__(284), exports);
__exportStar(__webpack_require__(599), exports);


/***/ }),

/***/ 723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSimilar = exports.isDeepEqual = void 0;
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


/***/ }),

/***/ 924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lockThis = void 0;
const traverseClassInstance_1 = __webpack_require__(820);
/**
 * Re-bind this for all object's methods to ensure `this` is always defined
 * This method is useful if we extract methods from an objet this way:
 *
 * const { action1, action2 } = actions;
 */
function lockThis(instance) {
    const result = {};
    (0, traverseClassInstance_1.traverseClassInstance)(instance, (propName, descriptor) => {
        if (descriptor.get || typeof instance[propName] !== 'function') {
            Object.defineProperty(result, propName, {
                configurable: true,
                get: () => {
                    return instance[propName];
                },
            });
        }
        else {
            result[propName] = instance[propName].bind(instance);
        }
    });
    return result;
}
exports.lockThis = lockThis;


/***/ }),

/***/ 2:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unwrapState = exports.merge = void 0;
/**
 * Merges multiple sources of data into a single Proxy object
 * The result object is read-only
 *
 * @example
 *
 * const mergedObject = merge(
 *   () => ({ foo: 1 }),
 *   () => ({ bar: 2 }),
 *   () => ({ bar: 3 }),
 * )
 *
 * mergedObject.bar // 3
 * mergedObject.foo // 1
 */
const traverseClassInstance_1 = __webpack_require__(820);
function merge(dataSources) {
    const mergeResult = {};
    dataSources.forEach((dataSource, ind) => {
        const dataSourceFunction = typeof dataSource === 'function' && dataSource;
        const dataSourceObj = dataSourceFunction ? dataSourceFunction() : dataSource;
        (0, traverseClassInstance_1.traverseClassInstance)(dataSourceObj, (propName => {
            Object.defineProperty(mergeResult, propName, {
                configurable: true,
                enumerable: true,
                get() {
                    return dataSourceFunction
                        ? dataSources[ind]()[propName]
                        : dataSources[ind][propName];
                },
            });
        }));
    });
    return mergeResult;
}
exports.merge = merge;
function unwrapState(obj) {
    Object.keys(obj.state).forEach(stateKey => {
        if (stateKey in obj)
            return;
        Object.defineProperty(obj, stateKey, {
            configurable: true,
            enumerable: true,
            get() {
                return obj.state[stateKey];
            },
        });
    });
    return obj;
}
exports.unwrapState = unwrapState;


/***/ }),

/***/ 10:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destroyModuleManager = exports.getModuleManager = exports.createModuleManager = void 0;
const store_1 = __webpack_require__(971);
const scope_1 = __webpack_require__(284);
const moduleManagers = {};
// TODO: remove
// (window as any).mm = moduleManagers;
function createModuleManager(Services = {}) {
    // const moduleManager = new ModuleManager(Services);
    const moduleManager = new scope_1.Scope(Object.assign(Object.assign({}, Services), { ReactiveStore: store_1.ReactiveStore }));
    moduleManagers[moduleManager.id] = moduleManager;
    moduleManager.resolve(store_1.ReactiveStore);
    return moduleManager;
}
exports.createModuleManager = createModuleManager;
/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
function getModuleManager(appId) {
    return moduleManagers[appId];
}
exports.getModuleManager = getModuleManager;
function destroyModuleManager(appId) {
    delete moduleManagers[appId];
}
exports.destroyModuleManager = destroyModuleManager;


/***/ }),

/***/ 284:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectScope = exports.injectState = exports.inject = exports.Scope = void 0;
const rxjs_1 = __webpack_require__(698);
const store_1 = __webpack_require__(971);
let currentScope = null;
class Scope {
    constructor(dependencies = {}, parentScope = null, id) {
        this.dependencies = dependencies;
        this.parentScope = parentScope;
        this.childScopes = {};
        this.instances = {};
        this.afterInit = new rxjs_1.Subject();
        this.afterRegister = new rxjs_1.Subject();
        if (!id) {
            this.id = parentScope ? `${parentScope.id}__${(0, store_1.generateId)()}` : 'root';
        }
        else {
            this.id = id;
        }
    }
    resolve(ModuleClass) {
        const scope = this.getScope(ModuleClass);
        const moduleName = ModuleClass.name;
        const instance = scope === null || scope === void 0 ? void 0 : scope.instances[moduleName];
        if (instance)
            return instance;
        if (!scope)
            this.register(ModuleClass);
        return this.initRegisteredModule(ModuleClass);
    }
    getScope(ModuleClass) {
        const moduleName = ModuleClass.name;
        if (this.dependencies[moduleName])
            return this;
        if (this.parentScope)
            return this.parentScope.getScope(ModuleClass);
        return null;
    }
    register(ModuleClass) {
        const moduleName = ModuleClass.name;
        if (this.dependencies[moduleName]) {
            throw new Error(`${moduleName} already registered`);
        }
        this.dependencies[moduleName] = ModuleClass;
        this.afterRegister.next({ ModuleClass, moduleName, scopeId: this.id });
    }
    registerMany(dependencies) {
        Object.keys(dependencies).forEach(depName => this.register(dependencies[depName]));
    }
    unregister(ModuleClass) {
        // TODO
    }
    isRegistered(ModuleClass) {
        return !!this.getScope(ModuleClass);
    }
    hasInstance(ModuleClass) {
        if (!this.isRegistered(ModuleClass))
            return false;
        return !!this.getScope(ModuleClass);
    }
    initRegisteredModule(ModuleClass, ...args) {
        const moduleName = ModuleClass.name;
        const instance = this.createModule(ModuleClass, ...args);
        this.instances[moduleName] = instance;
        instance.init && instance.init();
        this.afterInit.next({ instance, moduleName, ModuleClass, scopeId: this.id });
        return instance;
    }
    createModule(ModuleClass, ...args) {
        const instance = this.exec(() => new ModuleClass(...args));
        instance._scope = this;
        instance.scope = this;
        return instance;
    }
    exec(cb) {
        const prevScope = currentScope;
        currentScope = this;
        const result = cb();
        currentScope = prevScope;
        return result;
    }
    createScope(dependencies, id) {
        return new Scope(dependencies, this, id);
    }
    registerScope(dependencies, id) {
        const scope = this.createScope({}, id);
        this.childScopes[scope.id] = scope;
        scope.afterRegister = this.afterRegister;
        scope.afterInit = this.afterInit;
        dependencies && scope.registerMany(dependencies);
        return scope;
    }
    unregisterScope(id) {
        const childScope = this.childScopes[id];
        childScope.destroy();
        delete this.childScopes[id];
    }
    destroy() {
        this.afterInit.unsubscribe();
        this.afterRegister.unsubscribe();
        // TODO unregister
    }
    removeInstance(ModuleClass) {
        const moduleName = ModuleClass.name;
        const instance = this.instances[moduleName];
        delete this.instances[moduleName];
    }
}
exports.Scope = Scope;
function inject(dependencies) {
    const scope = currentScope;
    const depsProxy = { _scope: currentScope };
    Object.keys(dependencies).forEach(moduleName => {
        const ModuleClass = dependencies[moduleName];
        Object.defineProperty(depsProxy, moduleName, {
            get: () => {
                // @ts-ignore
                return scope.resolve(ModuleClass);
            },
        });
    });
    return depsProxy;
}
exports.inject = inject;
function injectState(StatefulModule) {
    const module = currentScope.resolve(StatefulModule);
    const proxy = { _isStateProxy: true };
    Object.keys(module.state).forEach(stateKey => {
        Object.defineProperty(proxy, stateKey, {
            configurable: true,
            enumerable: true,
            get() {
                return module.state[stateKey];
            },
        });
    });
    return proxy;
}
exports.injectState = injectState;
function injectScope() {
    return currentScope;
}
exports.injectScope = injectScope;


/***/ }),

/***/ 971:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateId = exports.getDefined = exports.assertIsDefined = exports.mutation = exports.ReactiveStore = void 0;
const immer_1 = __importDefault(__webpack_require__(172));
const traverseClassInstance_1 = __webpack_require__(820);
const scope_1 = __webpack_require__(284);
class ReactiveStore {
    constructor(storeId) {
        this.storeId = storeId;
        this.state = {
            storeId: this.storeId,
            modules: {},
        };
        this.scope = (0, scope_1.injectScope)();
        this.isMutationRunning = false;
        this.modulesRevisions = {};
        this.immerState = null;
        this.watchers = new StoreWatchers();
        this.modulesMetadata = {};
        this.isRecordingAccessors = false;
        this.recordedAccessors = {};
        this.currentContext = {};
    }
    init() {
        Object.keys(this.scope.dependencies).forEach(moduleName => {
            if (moduleName === 'ReactiveStore')
                return;
            this.createModuleMetadata(moduleName, this.scope.id);
        });
        this.scope.afterRegister.subscribe(moduleInfo => {
            this.createModuleMetadata(moduleInfo.moduleName, this.scope.id);
        });
        this.scope.afterInit.subscribe(moduleInfo => {
            var _a, _b;
            if (moduleInfo.moduleName === 'ReactiveStore')
                return;
            const instance = moduleInfo.instance;
            const scopeId = instance.scope.id;
            const metadata = this.getModuleMetadata(moduleInfo.ModuleClass, scopeId) || this.createModuleMetadata(moduleInfo.moduleName, scopeId);
            metadata.instance = instance;
            const stateDescriptor = typeof ((_a = Object.getOwnPropertyDescriptor(instance, 'state')) === null || _a === void 0 ? void 0 : _a.get);
            const isStatefull = stateDescriptor && typeof stateDescriptor !== 'function' && !((_b = instance.state) === null || _b === void 0 ? void 0 : _b._isStateProxy);
            if (!isStatefull)
                return;
            console.log('start init store for ', moduleInfo.moduleName, 'in scope', scopeId);
            this.initModule(instance, metadata.moduleName, scopeId);
            console.log('finish init state for ', moduleInfo.moduleName, 'in scope', scopeId);
        });
    }
    initModule(module, moduleName, contextId) {
        if (!this.state.modules[moduleName])
            this.state.modules[moduleName] = {};
        this.state.modules[moduleName][contextId] = module.state;
        this.modulesRevisions[moduleName + contextId] = 1;
        const store = this;
        Object.defineProperty(module, 'state', {
            get: () => {
                // prevent accessing state on destroyed module
                if (!store.state.modules[moduleName][contextId]) {
                    throw new Error('ReduxModule_is_destroyed');
                }
                if (store.isRecordingAccessors) {
                    const revision = store.modulesRevisions[moduleName + contextId];
                    this.recordedAccessors[moduleName + contextId] = revision;
                }
                return store.isMutationRunning ? this.immerState : store.state.modules[moduleName][contextId];
            },
            set: (newState) => {
                if (!store.isMutationRunning)
                    throw new Error('Can not change the state outside of mutation');
            },
        });
        this.replaceMethodsWithMutations(module, moduleName, contextId);
        catchDestroyedModuleCalls(module);
    }
    destroyModule(moduleName, contextId) {
        delete this.state.modules[moduleName][contextId];
        if (!Object.keys(this.state.modules[moduleName])) {
            delete this.state.modules[moduleName];
        }
    }
    mutateModule(moduleName, contextId, mutation) {
        mutation();
    }
    runAndSaveAccessors(cb) {
        this.isRecordingAccessors = true;
        cb();
        const result = this.recordedAccessors;
        this.isRecordingAccessors = false;
        this.recordedAccessors = {};
        return result;
    }
    createModuleMetadata(moduleName, scopeId) {
        console.log('create module metadata for', moduleName, scopeId);
        if (!this.modulesMetadata[moduleName]) {
            this.modulesMetadata[moduleName] = {};
        }
        // eslint-disable-next-line no-multi-assign
        const metadata = this.modulesMetadata[moduleName][scopeId] = {
            scopeId,
            moduleName,
            instance: null,
            createView: null,
            view: null,
            componentIds: [],
        };
        return metadata;
    }
    updateModuleMetadata(moduleName, scopeId, patch) {
        const metadata = this.modulesMetadata[moduleName][scopeId];
        return Object.assign(metadata, patch);
    }
    getModuleMetadata(ModuleClass, scopeId) {
        const moduleName = ModuleClass.name;
        return this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName][scopeId];
    }
    setModuleContext(moduleName, scope) {
        this.currentContext[moduleName] = scope;
    }
    resetModuleContext(moduleName) {
        delete this.currentContext[moduleName];
    }
    replaceMethodsWithMutations(module, moduleName, contextId) {
        const mutationNames = Object.getPrototypeOf(module).mutations || [];
        const store = this;
        mutationNames.forEach(mutationName => {
            const originalMethod = module[mutationName];
            // override the original Module method to dispatch mutations
            module[mutationName] = function (...args) {
                // if this method was called from another mutation
                // we don't need to dispatch a new mutation again
                // just call the original method
                if (store.isMutationRunning)
                    return originalMethod.apply(module, args);
                // prevent accessing state on deleted module
                if (!store.state.modules[moduleName][contextId]) {
                    throw new Error('Module_is_destroyed');
                }
                const nextState = (0, immer_1.default)(module.state, (draftState) => {
                    store.isMutationRunning = true;
                    store.immerState = draftState;
                    console.log('run mutation', mutationName);
                    originalMethod.apply(module, args);
                    store.modulesRevisions[moduleName + contextId]++;
                });
                store.immerState = null;
                store.state.modules[moduleName][contextId] = nextState;
                store.isMutationRunning = false;
                store.watchers.run();
            };
        });
    }
}
exports.ReactiveStore = ReactiveStore;
class StoreWatchers {
    constructor() {
        this.watchers = {};
        this.watchersOrder = [];
    }
    create(cb) {
        const watcherId = generateId();
        this.watchersOrder.push(watcherId);
        this.watchers[watcherId] = cb;
        return watcherId;
    }
    remove(watcherId) {
        const ind = this.watchersOrder.findIndex(id => watcherId === id);
        this.watchersOrder.splice(ind, 1);
        delete this.watchers[watcherId];
    }
    run() {
        const watchersIds = [...this.watchersOrder];
        watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
    }
}
/**
 * A decorator that registers the object method as an mutation
 */
function mutation() {
    return function (target, methodName) {
        target.mutations = target.mutations || [];
        // mark the method as an mutation
        target.mutations.push(methodName);
    };
}
exports.mutation = mutation;
/**
 * Add try/catch that silently stops all method calls for a destroyed module
 */
function catchDestroyedModuleCalls(module) {
    // wrap each method in try/catch block
    (0, traverseClassInstance_1.traverseClassInstance)(module, (propName, descriptor) => {
        // ignore getters
        if (descriptor.get || typeof module[propName] !== 'function')
            return;
        const originalMethod = module[propName];
        module[propName] = (...args) => {
            try {
                return originalMethod.apply(module, args);
            }
            catch (e) {
                // silently stop execution if module is destroyed
                if (e.message !== 'ReduxModule_is_destroyed')
                    throw e;
            }
        };
    });
}
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
let idCounter = 1;
function generateId() {
    return (idCounter++).toString();
}
exports.generateId = generateId;


/***/ }),

/***/ 820:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.traverseClassInstance = void 0;
/**
 * Travers class methods and props
 */
const toolkit_1 = __webpack_require__(509);
function traverseClassInstance(instance, cb) {
    let entity = instance;
    const prototypes = [];
    if ((0, toolkit_1.isPlainObject)(entity)) {
        prototypes.push(entity);
    }
    else {
        while (entity.constructor.name !== 'Object') {
            prototypes.push(entity);
            entity = Object.getPrototypeOf(entity);
        }
    }
    const alreadyTraversed = {};
    prototypes.forEach((proto) => {
        Object.getOwnPropertyNames(proto).forEach((propName) => {
            if (propName in alreadyTraversed)
                return;
            alreadyTraversed[propName] = true;
            const descriptor = Object.getOwnPropertyDescriptor(proto, propName);
            if (!descriptor)
                return;
            cb(propName, descriptor);
        });
    });
}
exports.traverseClassInstance = traverseClassInstance;


/***/ }),

/***/ 603:
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
exports.createServiceView = exports.useServiceView = exports.useModule = exports.useSelectFrom = exports.createModuleView = exports.useModuleManager = exports.StoreContext = void 0;
const react_1 = __importStar(__webpack_require__(359));
const hooks_1 = __webpack_require__(886);
const merge_1 = __webpack_require__(2);
const lockThis_1 = __webpack_require__(924);
const useSelector_1 = __webpack_require__(599);
const useModuleMetadata_1 = __webpack_require__(871);
const module_manager_1 = __webpack_require__(10);
const dependency_watcher_1 = __webpack_require__(407);
exports.StoreContext = react_1.default.createContext('1');
function useModuleManager() {
    const storeId = (0, react_1.useContext)(exports.StoreContext);
    return (0, react_1.useMemo)(() => {
        const moduleManager = (0, module_manager_1.getModuleManager)(storeId);
        return moduleManager;
    }, []);
}
exports.useModuleManager = useModuleManager;
function createModuleView(module) {
    const lockedModule = (0, lockThis_1.lockThis)(module);
    const mergedModule = module.state ? (0, merge_1.merge)([
        // allow to select variables from the module's state
        () => module.state,
        // allow to select getters and actions from the module
        lockedModule,
    ]) : lockedModule;
    return mergedModule;
}
exports.createModuleView = createModuleView;
function useSelectFrom(module, extend) {
    // register the component in the ModuleManager upon component creation
    const { selector, dependencyWatcher } = (0, hooks_1.useOnCreate)(() => {
        const observableObject = extend ? (0, merge_1.merge)([module, extend(module)]) : module;
        const dependencyWatcher = (0, dependency_watcher_1.createDependencyWatcher)(observableObject);
        function selector() {
            return dependencyWatcher.getDependentValues();
        }
        return { selector, dependencyWatcher };
    });
    // call Redux selector to make selected props reactive
    (0, useSelector_1.useSelector)(selector);
    return dependencyWatcher.watcherProxy;
}
exports.useSelectFrom = useSelectFrom;
function useModule(ModuleClass, selectorFn = () => ({}), isService = false) {
    const moduleMetadata = (0, useModuleMetadata_1.useModuleMetadata)(ModuleClass, isService, createModuleView);
    const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
    return selectResult;
}
exports.useModule = useModule;
// export function useService<
//   TModule,
//   TSelectorResult,
//   TResult extends TMerge<TModuleView<TModule>, TSelectorResult>
//   >
// (ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
//   return useModule(ModuleClass, selectorFn, true);
// }
function useServiceView(ModuleClass, selectorFn = () => ({})) {
    const moduleMetadata = (0, useModuleMetadata_1.useModuleMetadata)(ModuleClass, true, createServiceView);
    const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
    return selectResult;
}
exports.useServiceView = useServiceView;
function createServiceView(service) {
    // const actions = service as any;
    // const getters = (service as any).view || {} as any;
    // return createViewWithActions(actions, getters) as TServiceView<TService>;
    const moduleView = createModuleView(service); // createModuleView((service as any).view);
    return moduleView;
}
exports.createServiceView = createServiceView;


/***/ }),

/***/ 871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModuleMetadata = void 0;
const react_1 = __webpack_require__(359);
const hooks_1 = __webpack_require__(886);
const useModule_1 = __webpack_require__(603);
const store_1 = __webpack_require__(971);
function useModuleMetadata(ModuleClass, isService, createView) {
    const componentId = (0, hooks_1.useComponentId)();
    const moduleManager = (0, useModule_1.useModuleManager)();
    // register the component in the ModuleManager upon component creation
    const { moduleMetadata, scope, isRoot, store, } = (0, hooks_1.useOnCreate)(() => {
        const moduleName = ModuleClass.name;
        const store = moduleManager.resolve(store_1.ReactiveStore);
        let scope = store.currentContext[moduleName];
        let isRoot = false;
        if (!scope) {
            if (moduleManager.isRegistered(ModuleClass)) {
                scope = moduleManager;
            }
            else {
                scope = moduleManager.registerScope({ ModuleClass });
                isRoot = true;
            }
        }
        const moduleInstance = scope.resolve(ModuleClass);
        let moduleMetadata = store.getModuleMetadata(ModuleClass, scope.id);
        if (!moduleMetadata.view) {
            moduleMetadata = store.updateModuleMetadata(moduleName, scope.id, { createView, view: createView(moduleInstance) });
        }
        // if (!isService) moduleManager.registerComponent(moduleName, contextId, componentId);
        return {
            moduleMetadata,
            store,
            isRoot,
            scope,
        };
    });
    isRoot && store.setModuleContext(moduleMetadata.moduleName, scope);
    (0, react_1.useEffect)(() => {
        isRoot && store.resetModuleContext(moduleMetadata.moduleName);
    }, []);
    // unregister the component from the module onDestroy
    (0, hooks_1.useOnDestroy)(() => {
        if (!isRoot)
            scope.destroy();
    });
    return moduleMetadata;
}
exports.useModuleMetadata = useModuleMetadata;


/***/ }),

/***/ 599:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useSelector = void 0;
const react_1 = __webpack_require__(359);
const hooks_1 = __webpack_require__(886);
const isDeepEqual_1 = __webpack_require__(723);
const useModule_1 = __webpack_require__(603);
const store_1 = __webpack_require__(971);
function useSelector(cb) {
    const servicesRevisionRef = (0, react_1.useRef)({});
    const selectorResultRef = (0, react_1.useRef)({});
    const forceUpdate = (0, hooks_1.useForceUpdate)();
    const moduleManager = (0, useModule_1.useModuleManager)();
    const store = moduleManager.resolve(store_1.ReactiveStore);
    (0, react_1.useEffect)(() => {
        servicesRevisionRef.current = store.runAndSaveAccessors(() => {
            selectorResultRef.current = cb();
        });
        const watcherId = store.watchers.create(() => {
            const prevRevisions = servicesRevisionRef.current;
            const currentRevisions = store.modulesRevisions;
            let modulesHasChanged = false;
            for (const moduleName in prevRevisions) {
                if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
                    modulesHasChanged = true;
                    break;
                }
            }
            if (!modulesHasChanged)
                return;
            const prevSelectorResult = selectorResultRef.current;
            servicesRevisionRef.current = store.runAndSaveAccessors(() => {
                selectorResultRef.current = cb();
            });
            if (!(0, isDeepEqual_1.isSimilar)(prevSelectorResult, selectorResultRef.current)) {
                forceUpdate();
            }
        });
        return () => {
            store.watchers.remove(watcherId);
        };
    }, []);
}
exports.useSelector = useSelector;


/***/ }),

/***/ 509:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__509__;

/***/ }),

/***/ 359:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__359__;

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