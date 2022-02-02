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

/***/ 585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleRoot = exports.RedumbxApp = void 0;
const jsx_runtime_1 = __webpack_require__(893);
const react_1 = __webpack_require__(359);
const store_1 = __webpack_require__(971);
const hooks_1 = __webpack_require__(886);
const useModule_1 = __webpack_require__(603);
function RedumbxApp(p) {
    const [moduleManager] = (0, react_1.useState)(() => p.moduleManager || (0, store_1.createModuleManager)());
    (0, hooks_1.useOnDestroy)(() => {
        (0, store_1.destroyModuleManager)(moduleManager.store.storeId);
    });
    return ((0, jsx_runtime_1.jsx)(useModule_1.StoreContext.Provider, Object.assign({ value: moduleManager.store.storeId }, { children: p.children }), void 0));
}
exports.RedumbxApp = RedumbxApp;
function ModuleRoot(p) {
    const moduleManager = (0, useModule_1.useModuleManager)();
    const { moduleName, contextId } = (0, hooks_1.useOnCreate)(() => {
        const contextId = (0, store_1.generateId)();
        const moduleName = p.module.prototype.constructor.name;
        moduleManager.registerModule(p.module, null, moduleName, contextId);
        return { contextId, moduleName };
    });
    moduleManager.setModuleContext(moduleName, contextId);
    (0, react_1.useEffect)(() => {
        moduleManager.resetModuleContext(moduleName);
    });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: p.children }, void 0);
}
exports.ModuleRoot = ModuleRoot;


/***/ }),

/***/ 329:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createViewWithActions = void 0;
const merge_1 = __webpack_require__(2);
const lockThis_1 = __webpack_require__(924);
function createViewWithActions(actions, getters) {
    const lockedActions = (0, lockThis_1.lockThis)(actions);
    const lockedGetters = (0, lockThis_1.lockThis)(getters);
    const mergedView = (0, merge_1.merge)([
        // allow to select variables from the module's state
        () => actions.state,
        // allow to select actions
        lockedActions,
        // allow to select getters
        lockedGetters,
    ]);
    // const mergedView = merge(
    //   // allow to select variables from the module's state
    //   () => actions.state,
    //   // allow to select actions
    //   () => lockedActions,
    //   // allow to select getters
    //   () => lockedGetters,
    // );
    return mergedView;
}
exports.createViewWithActions = createViewWithActions;


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
// export * from './serviceProvider';
__exportStar(__webpack_require__(585), exports);
__exportStar(__webpack_require__(149), exports);
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
exports.merge = void 0;
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
// function extendFn<
//   TModuleClass extends new (...args: any[]) => any,
//   TExtension extends InstanceType<TModuleClass> & {[key: string]: (this: InstanceType<TModuleClass>, ...args: any[]) => any},
//   // TExtensionRemap extends {[P in keyof TExtension]: InstanceType<T[P]>;}
//   TResult = TMerge<InstanceType<TModuleClass>, TExtension>
//   >
// (ModuleClass: TModuleClass, extension: TExtension): TResult {
//   return {} as any as TResult;
// }
//
// class Foo {
//   sayHello() {
//     return 'hello';
//   }
// }
//
// const ext = extendFn(Foo, {
//   sayBye() {
//     this.sayHello();
//     console.log('bye');
//   },
//   sayRandom() {
//     this.sayBye();
//     console.log('random');
//   },
// });
// ext.sayHello();
// ext.sayBye();


/***/ }),

/***/ 149:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Service = exports.ReduxModule = void 0;
class ReduxModule {
    constructor() {
        this.dependencies = {};
    }
    beforeInit(moduleManager) {
        this.moduleManager = moduleManager;
        if (this.dependencies)
            this.deps = this.inject(this.dependencies);
    }
    inject(injectedObject) {
        return this.moduleManager.inject(injectedObject);
    }
    createModule(ModuleClass, ...args) {
        // @ts-ignore
        const module = new ModuleClass(...args);
        module.beforeInit && module.beforeInit(this.moduleManager);
        return module;
    }
}
exports.ReduxModule = ReduxModule;
class Service extends ReduxModule {
}
exports.Service = Service;


/***/ }),

/***/ 971:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateId = exports.watch = exports.getDefined = exports.assertIsDefined = exports.createDependencyWatcher = exports.mutation = exports.getModuleManager = exports.destroyModuleManager = exports.createModuleManager = exports.ReduxModuleManager = exports.ReactiveStore = void 0;
const is_plain_object_1 = __webpack_require__(57);
const immer_1 = __importDefault(__webpack_require__(172));
const traverseClassInstance_1 = __webpack_require__(820);
class ReactiveStore {
    constructor(storeId) {
        this.storeId = storeId;
        this.state = {
            storeId: this.storeId,
            modules: {},
        };
    }
    initModule(moduleName, contextId, initialState) {
        if (!this.state.modules[moduleName])
            this.state.modules[moduleName] = {};
        this.state.modules[moduleName][contextId] = initialState;
    }
    destroyModule(moduleName, contextId) {
        delete this.state.modules[moduleName][contextId];
    }
    mutateModule(moduleName, contextId, mutation) {
        mutation();
    }
}
exports.ReactiveStore = ReactiveStore;
/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
class ReduxModuleManager {
    constructor(store, plugins = []) {
        this.store = store;
        this.plugins = plugins;
        this.registeredModules = {};
        this.currentContext = {};
        this.isMutationRunning = false;
        this.isRecordingAccessors = false;
        this.recordedAccessors = {};
        this.modulesRevisions = {};
        this.watchers = {};
        this.watchersOrder = [];
        this.immerState = null;
    }
    /**
     * Register a new Redux Module and initialize it
     * @param module the module object
     * @param initParams params that will be passed in the `.init()` handler after initialization
     */
    registerModule(ModuleClass, initParams, moduleName = '', contextId = 'default') {
        // use constructor name as a module name if other name not provided
        moduleName = moduleName || ModuleClass.prototype.constructor.name;
        const isService = contextId === 'service';
        const shouldInitialize = !isService;
        // create a record in `registeredModules` with the newly created module
        if (!this.registeredModules[moduleName])
            this.registeredModules[moduleName] = {};
        this.registeredModules[moduleName][contextId] = {
            contextId,
            moduleName,
            componentIds: [],
            module: undefined,
            view: null,
            watchers: [],
            initParams,
            isService,
            ModuleClass,
        };
        this.modulesRevisions[moduleName + contextId] = 1;
        if (shouldInitialize)
            this.initModule(moduleName, contextId);
        return this.registeredModules[moduleName][contextId];
    }
    initModule(moduleName, contextId) {
        const { ModuleClass, initParams } = this.registeredModules[moduleName][contextId];
        const module = new ModuleClass(this);
        this.registeredModules[moduleName][contextId].module = module;
        module.name = moduleName;
        module.beforeInit && module.beforeInit(this);
        module.init && module.init(initParams);
        const initialState = module.state;
        this.store.initModule(moduleName, contextId, initialState);
        const moduleManager = this;
        Object.defineProperty(module, 'state', {
            get: () => {
                // prevent accessing state on destroyed module
                if (!moduleManager.getModule(moduleName, contextId)) {
                    throw new Error('ReduxModule_is_destroyed');
                }
                if (moduleManager.isRecordingAccessors) {
                    const revision = moduleManager.modulesRevisions[moduleName + contextId];
                    this.recordedAccessors[moduleName + contextId] = revision;
                }
                return moduleManager.isMutationRunning ? this.immerState : moduleManager.store.state.modules[moduleName][contextId];
            },
            set: (newState) => {
                if (!moduleManager.isMutationRunning)
                    throw new Error('Can not change the state outside of mutation');
            },
        });
        // // replace module methods with mutation calls
        this.replaceMethodsWithMutations(module, contextId);
        // prevent usage of destroyed modules
        catchDestroyedModuleCalls(module);
    }
    /**
       * Unregister the module and erase its state from Redux
       */
    unregisterModule(moduleName, contextId) {
        const module = this.getModule(moduleName, contextId);
        module.destroy && module.destroy();
        this.store.destroyModule(moduleName, contextId);
        delete this.registeredModules[moduleName][contextId];
    }
    registerServices(serviceClasses) {
        Object.keys(serviceClasses).forEach(serviceName => {
            const serviceClass = serviceClasses[serviceName];
            this.registerModule(serviceClass, null, '', 'service');
        });
        return this.inject(serviceClasses);
    }
    runAndSaveAccessors(cb) {
        this.isRecordingAccessors = true;
        cb();
        const result = this.recordedAccessors;
        this.isRecordingAccessors = false;
        this.recordedAccessors = {};
        return result;
    }
    /**
     * Get the Module by name
     */
    getModule(moduleName, contextId) {
        var _a, _b;
        return (_b = (_a = this.registeredModules[moduleName]) === null || _a === void 0 ? void 0 : _a[contextId]) === null || _b === void 0 ? void 0 : _b.module;
    }
    /**
     * Get the Service by name
     * Initialized the service if not initialized
     */
    getService(serviceName) {
        const serviceMetadata = this.registeredModules[serviceName].service;
        if (!serviceMetadata)
            throw new Error(`Service "${serviceName}" is not found. Is it registered?`);
        const { moduleName, contextId, module } = serviceMetadata;
        const shouldInit = !module;
        if (shouldInit) {
            this.initModule(moduleName, contextId);
            return this.registeredModules[serviceName][contextId].module;
        }
        return module;
    }
    inject(injectedObject) {
        if ((0, is_plain_object_1.isPlainObject)(injectedObject)) {
            return this.injectManyServices(injectedObject);
        }
        return this.injectOneService(injectedObject);
    }
    injectOneService(ServiceClass) {
        var _a;
        const serviceName = ServiceClass.name;
        let serviceMetadata = (_a = this.registeredModules[serviceName]) === null || _a === void 0 ? void 0 : _a.service;
        if (!serviceMetadata) {
            serviceMetadata = this.registerModule(ServiceClass, null, '', 'service');
            // throw new Error(`Service "${serviceName}" is not found. Is it registered?`);
        }
        const { moduleName, contextId, module } = serviceMetadata;
        const shouldInit = !module;
        if (shouldInit) {
            this.initModule(moduleName, contextId);
            return this.registeredModules[serviceName][contextId].module;
        }
        return module;
    }
    injectModule(ModuleClass, isService = false, createView) {
        var _a;
        const moduleName = ModuleClass.name;
        const contextId = isService ? 'service' : this.currentContext[moduleName] || 'default';
        let moduleMetadata = (_a = this.registeredModules[moduleName]) === null || _a === void 0 ? void 0 : _a.service;
        if (!moduleMetadata) {
            moduleMetadata = this.registerModule(ModuleClass, null, '', contextId);
        }
        let { module } = moduleMetadata;
        const shouldInit = !module;
        if (shouldInit) {
            this.initModule(moduleName, contextId);
            moduleMetadata = this.registeredModules[moduleName][contextId];
            module = moduleMetadata.module;
        }
        if (createView && !moduleMetadata.view) {
            moduleMetadata.view = createView(module);
        }
        return moduleMetadata;
    }
    injectManyServices(serviceClasses) {
        const result = {};
        Object.keys(serviceClasses).forEach(serviceName => {
            const serviceClass = serviceClasses[serviceName];
            Object.defineProperty(result, serviceName, {
                get: () => {
                    return this.injectOneService(serviceClass);
                },
            });
        });
        return result;
    }
    /**
       * Register a component that is using the module
       */
    registerComponent(moduleName, contextId, componentId) {
        this.registeredModules[moduleName][contextId].componentIds.push(componentId);
    }
    /**
       * Un-register a component that is using the module.
       * If the module doesnt have registered components it will be destroyed
       */
    unRegisterComponent(moduleName, contextId, componentId) {
        const moduleMetadata = this.registeredModules[moduleName][contextId];
        moduleMetadata.componentIds = moduleMetadata.componentIds.filter((id) => id !== componentId);
        if (!moduleMetadata.componentIds.length)
            this.unregisterModule(moduleName, contextId);
    }
    createWatcher(cb) {
        const watcherId = generateId();
        this.watchersOrder.push(watcherId);
        this.watchers[watcherId] = cb;
        return watcherId;
    }
    removeWatcher(watcherId) {
        const ind = this.watchersOrder.findIndex(id => watcherId);
        this.watchersOrder.splice(ind, 1);
        delete this.watchers[watcherId];
    }
    runWatchers() {
        const watchersIds = [...this.watchersOrder];
        watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
    }
    replaceMethodsWithMutations(module, contextId) {
        const moduleName = getDefined(module.name);
        const mutationNames = Object.getPrototypeOf(module).mutations || [];
        const moduleManager = this;
        mutationNames.forEach(mutationName => {
            const originalMethod = module[mutationName];
            // override the original Module method to dispatch mutations
            module[mutationName] = function (...args) {
                // if this method was called from another mutation
                // we don't need to dispatch a new mutation again
                // just call the original method
                if (moduleManager.isMutationRunning)
                    return originalMethod.apply(module, args);
                // prevent accessing state on deleted module
                if (!moduleManager.getModule(moduleName, contextId)) {
                    throw new Error('Module_is_destroyed');
                }
                const nextState = (0, immer_1.default)(module.state, draftState => {
                    moduleManager.isMutationRunning = true;
                    moduleManager.immerState = draftState;
                    console.log('run mutation', mutationName);
                    originalMethod.apply(module, args);
                    moduleManager.modulesRevisions[moduleName + contextId]++;
                });
                moduleManager.immerState = null;
                moduleManager.store.state.modules[moduleName][contextId] = nextState;
                moduleManager.isMutationRunning = false;
                moduleManager.runWatchers();
            };
        });
    }
    // /**
    //    * Run watcher functions registered in modules
    //    */
    // runWatchers() {
    //   Object.keys(this.registeredModules).forEach((moduleName) => {
    //     Object.keys(this.registeredModules[moduleName]).forEach(contextId => {
    //       const { watchers } = this.registeredModules[moduleName][contextId];
    //       watchers.forEach((watcher) => {
    //         const newVal = watcher.selector();
    //         const prevVal = watcher.prevValue;
    //         watcher.prevValue = newVal;
    //         if (newVal !== prevVal) {
    //           watcher.onChange(newVal, prevVal);
    //         }
    //       });
    //     });
    //   });
    // }
    setModuleContext(moduleName, contextId) {
        this.currentContext[moduleName] = contextId;
    }
    resetModuleContext(moduleName) {
        delete this.currentContext[moduleName];
    }
}
exports.ReduxModuleManager = ReduxModuleManager;
const moduleManagers = {};
// TODO: remove
window.mm = moduleManagers;
function createModuleManager(Services, plugins) {
    const appId = generateId();
    // create ReactiveStore
    const store = new ReactiveStore(appId);
    // create the ModuleManager and
    // automatically register some additional modules
    const moduleManager = new ReduxModuleManager(store);
    moduleManagers[appId] = moduleManager;
    if (Services)
        moduleManager.registerServices(Services);
    return moduleManager;
}
exports.createModuleManager = createModuleManager;
function destroyModuleManager(appId) {
    delete moduleManagers[appId];
}
exports.destroyModuleManager = destroyModuleManager;
/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
function getModuleManager(appId) {
    return moduleManagers[appId];
}
exports.getModuleManager = getModuleManager;
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
// function replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>, contextId: string, appId: string) {
//   const moduleName = getDefined(module.name);
//   const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
//   const moduleManager = moduleManagers[appId];
//
//   mutationNames.forEach((mutationName) => {
//     const originalMethod = (module as any)[mutationName];
//
//     // override the original Module method to dispatch mutations
//     (module as any)[mutationName] = function (...args: any[]) {
//       // if this method was called from another mutation
//       // we don't need to dispatch a new mutation again
//       // just call the original method
//       const mutationIsRunning = !!moduleManager.immerState;
//       if (mutationIsRunning) return originalMethod.apply(module, args);
//
//       // prevent accessing state on deleted module
//       if (!moduleManager.getModule(moduleName, contextId)) {
//         throw new Error('ReduxModule_is_destroyed');
//       }
//
//       const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
//         'BatchedUpdatesModule',
//         'default',
//       );
//
//       // clear unserializable events from arguments
//       args = args.map((arg) => {
//         const isReactEvent = arg && arg._reactName;
//         if (isReactEvent) return { _reactName: arg._reactName };
//         return arg;
//       });
//
//       // dispatch reducer and call `temporaryDisableRendering()`
//       // so next mutation in the javascript queue
//       // will not cause redundant re-renderings in components
//       batch(() => {
//         if (moduleName !== 'BatchedUpdatesModule') batchedUpdatesModule.temporaryDisableRendering();
//         moduleManager.store.dispatch(moduleManager.actions.mutateModule({
//           moduleName, contextId, methodName: mutationName, args,
//         }));
//       });
//     };
//   });
// }
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
/**
 * Watch changes on a reactive state in the module
 */
function watch(module, selector, onChange, contextId, appId) {
    const moduleName = getDefined(module.name);
    const moduleMetadata = moduleManagers[appId].registeredModules[moduleName][contextId];
    moduleMetadata.watchers.push({
        selector,
        // @ts-ignore
        onChange,
        prevValue: selector(),
    });
}
exports.watch = watch;
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
exports.createServiceView = exports.useServiceView = exports.useService = exports.useModule = exports.useSelectFrom = exports.createModuleView = exports.useInject = exports.useModuleManager = exports.StoreContext = void 0;
const react_1 = __importStar(__webpack_require__(359));
const hooks_1 = __webpack_require__(886);
const store_1 = __webpack_require__(971);
const merge_1 = __webpack_require__(2);
const lockThis_1 = __webpack_require__(924);
const createStateView_1 = __webpack_require__(329);
const useSelector_1 = __webpack_require__(599);
const useModuleMetadata_1 = __webpack_require__(871);
exports.StoreContext = react_1.default.createContext('1');
function useModuleManager() {
    const storeId = (0, react_1.useContext)(exports.StoreContext);
    return (0, react_1.useMemo)(() => {
        const moduleManager = (0, store_1.getModuleManager)(storeId);
        return moduleManager;
    }, []);
}
exports.useModuleManager = useModuleManager;
function useInject(injectedObject) {
    return useModuleManager().inject(injectedObject);
}
exports.useInject = useInject;
function createModuleView(module) {
    const lockedModule = (0, lockThis_1.lockThis)(module);
    const mergedModule = (0, merge_1.merge)([
        // allow to select variables from the module's state
        () => module.state,
        // allow to select getters and actions from the module
        lockedModule,
    ]);
    return mergedModule;
}
exports.createModuleView = createModuleView;
function useSelectFrom(module, extend) {
    // register the component in the ModuleManager upon component creation
    const { selector, dependencyWatcher } = (0, hooks_1.useOnCreate)(() => {
        const observableObject = extend ? (0, merge_1.merge)([module, extend(module)]) : module;
        const dependencyWatcher = (0, store_1.createDependencyWatcher)(observableObject);
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
function useService(ModuleClass, selectorFn = () => ({})) {
    return useModule(ModuleClass, selectorFn, true);
}
exports.useService = useService;
function useServiceView(ModuleClass, selectorFn = () => ({})) {
    const moduleMetadata = (0, useModuleMetadata_1.useModuleMetadata)(ModuleClass, true, createServiceView);
    const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
    return selectResult;
}
exports.useServiceView = useServiceView;
function createServiceView(service) {
    const actions = service;
    const getters = service.view || {};
    return (0, createStateView_1.createViewWithActions)(actions, getters);
}
exports.createServiceView = createServiceView;


/***/ }),

/***/ 871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModuleMetadata = void 0;
const hooks_1 = __webpack_require__(886);
const useModule_1 = __webpack_require__(603);
function useModuleMetadata(ModuleClass, isService, createView) {
    const componentId = (0, hooks_1.useComponentId)();
    const moduleManager = (0, useModule_1.useModuleManager)();
    // register the component in the ModuleManager upon component creation
    const { moduleMetadata, } = (0, hooks_1.useOnCreate)(() => {
        const moduleMetadata = moduleManager.injectModule(ModuleClass, isService, createView);
        const moduleName = moduleMetadata.moduleName;
        const contextId = moduleMetadata.contextId;
        if (!isService)
            moduleManager.registerComponent(moduleName, contextId, componentId);
        return {
            moduleMetadata,
        };
    });
    // unregister the component from the module onDestroy
    (0, hooks_1.useOnDestroy)(() => {
        if (!isService)
            moduleManager.unRegisterComponent(moduleMetadata.moduleName, moduleMetadata.contextId, componentId);
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
function useSelector(cb) {
    const servicesRevisionRef = (0, react_1.useRef)({});
    const selectorResultRef = (0, react_1.useRef)({});
    const forceUpdate = (0, hooks_1.useForceUpdate)();
    const moduleManager = (0, useModule_1.useModuleManager)();
    (0, react_1.useEffect)(() => {
        servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
            selectorResultRef.current = cb();
        });
        const watcherId = moduleManager.createWatcher(() => {
            const prevRevisions = servicesRevisionRef.current;
            const currentRevisions = moduleManager.modulesRevisions;
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
            servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
                selectorResultRef.current = cb();
            });
            if (!(0, isDeepEqual_1.isSimilar)(prevSelectorResult, selectorResultRef.current)) {
                forceUpdate();
            }
        });
        return () => {
            moduleManager.removeWatcher(watcherId);
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