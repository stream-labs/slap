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

/***/ 531:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/** @license React v17.0.2
 * react-dom-test-utils.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h=__webpack_require__(418),l=__webpack_require__(156),m=__webpack_require__(386),n=__webpack_require__(840);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
function r(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function t(a){if(r(a)!==a)throw Error(p(188));}
function aa(a){var b=a.alternate;if(!b){b=r(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var g=e.alternate;if(null===g){d=e.return;if(null!==d){c=d;continue}break}if(e.child===g.child){for(g=e.child;g;){if(g===c)return t(e),a;if(g===d)return t(e),b;g=g.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=g;else{for(var f=!1,k=e.child;k;){if(k===c){f=!0;c=e;d=g;break}if(k===d){f=!0;d=e;c=g;break}k=k.sibling}if(!f){for(k=g.child;k;){if(k===
c){f=!0;c=g;d=e;break}if(k===d){f=!0;d=g;c=e;break}k=k.sibling}if(!f)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function u(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function v(){return!0}function w(){return!1}
function x(a){function b(c,b,e,g,f){this._reactName=c;this._targetInst=e;this.type=b;this.nativeEvent=g;this.target=f;this.currentTarget=null;for(var d in a)a.hasOwnProperty(d)&&(c=a[d],this[d]=c?c(g):g[d]);this.isDefaultPrevented=(null!=g.defaultPrevented?g.defaultPrevented:!1===g.returnValue)?v:w;this.isPropagationStopped=w;return this}h(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=v)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v)},persist:function(){},isPersistent:v});return b}var y={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ba=x(y),z=h({},y,{view:0,detail:0});x(z);
var A,B,C,E=h({},z,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:D,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==C&&(C&&"mousemove"===a.type?(A=a.screenX-C.screenX,B=a.screenY-C.screenY):B=A=0,C=a);return A},movementY:function(a){return"movementY"in a?a.movementY:B}});
x(E);var da=h({},E,{dataTransfer:0});x(da);var ea=h({},z,{relatedTarget:0});x(ea);var fa=h({},y,{animationName:0,elapsedTime:0,pseudoElement:0});x(fa);var ha=h({},y,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});x(ha);var ia=h({},y,{data:0});x(ia);
var ja={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ka={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},la={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ma(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=la[a])?!!b[a]:!1}function D(){return ma}
var na=h({},z,{key:function(a){if(a.key){var b=ja[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=u(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?ka[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:D,charCode:function(a){return"keypress"===a.type?u(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?u(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});x(na);var oa=h({},E,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0});x(oa);var pa=h({},z,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:D});x(pa);var qa=h({},y,{propertyName:0,elapsedTime:0,pseudoElement:0});x(qa);
var ra=h({},E,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0});x(ra);var F=null;function G(a){if(null===F)try{var b=("require"+Math.random()).slice(0,7);F=(module&&module[b]).call(module,"timers").setImmediate}catch(c){F=function(a){var b=new MessageChannel;b.port1.onmessage=a;b.port2.postMessage(void 0)}}return F(a)}
var H=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,sa=H[5],I=H[6],ta=m.unstable_batchedUpdates,J=q.IsSomeRendererActing,K="function"===typeof n.unstable_flushAllWithoutAsserting,L=n.unstable_flushAllWithoutAsserting||function(){for(var a=!1;sa();)a=!0;return a};function M(a){try{L(),G(function(){L()?M(a):a()})}catch(b){a(b)}}var N=0,ua=!1,O=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events[6],va=m.unstable_batchedUpdates,Q=q.IsSomeRendererActing;
function wa(a,b){jest.runOnlyPendingTimers();G(function(){try{n.unstable_flushAllWithoutAsserting()?wa(a,b):a()}catch(c){b(c)}})}function xa(a,b,c,d,e,g,f,k,ca){var P=Array.prototype.slice.call(arguments,3);try{b.apply(c,P)}catch(Ga){this.onError(Ga)}}var R=!1,S=null,T=!1,U=null,ya={onError:function(a){R=!0;S=a}};function za(a,b,c,d,e,g,f,k,ca){R=!1;S=null;xa.apply(ya,arguments)}
function Aa(a,b,c,d,e,g,f,k,ca){za.apply(this,arguments);if(R){if(R){var P=S;R=!1;S=null}else throw Error(p(198));T||(T=!0,U=P)}}var V=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events,Ba=V[0],Ca=V[1],Da=V[2],Ea=V[3],Fa=V[4];function Ha(){}
function Ia(a,b){if(!a)return[];a=aa(a);if(!a)return[];for(var c=a,d=[];;){if(5===c.tag||6===c.tag||1===c.tag||0===c.tag){var e=c.stateNode;b(e)&&d.push(e)}if(c.child)c.child.return=c,c=c.child;else{if(c===a)return d;for(;!c.sibling;){if(!c.return||c.return===a)return d;c=c.return}c.sibling.return=c.return;c=c.sibling}}}
function W(a,b){if(a&&!a._reactInternals){var c=""+a;a=Array.isArray(a)?"an array":a&&1===a.nodeType&&a.tagName?"a DOM node":"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c;throw Error(p(286,b,a));}}function X(a){return!(!a||1!==a.nodeType||!a.tagName)}function Y(a){return X(a)?!1:null!=a&&"function"===typeof a.render&&"function"===typeof a.setState}function Ja(a,b){return Y(a)?a._reactInternals.type===b:!1}
function Z(a,b){W(a,"findAllInRenderedTree");return a?Ia(a._reactInternals,b):[]}function Ka(a,b){W(a,"scryRenderedDOMComponentsWithClass");return Z(a,function(a){if(X(a)){var c=a.className;"string"!==typeof c&&(c=a.getAttribute("class")||"");var e=c.split(/\s+/);if(!Array.isArray(b)){if(void 0===b)throw Error(p(11));b=b.split(/\s+/)}return b.every(function(a){return-1!==e.indexOf(a)})}return!1})}
function La(a,b){W(a,"scryRenderedDOMComponentsWithTag");return Z(a,function(a){return X(a)&&a.tagName.toUpperCase()===b.toUpperCase()})}function Ma(a,b){W(a,"scryRenderedComponentsWithType");return Z(a,function(a){return Ja(a,b)})}function Na(a,b,c){var d=a.type||"unknown-event";a.currentTarget=Ca(c);Aa(d,b,void 0,a);a.currentTarget=null}
function Oa(a,b,c){for(var d=[];a;){d.push(a);do a=a.return;while(a&&5!==a.tag);a=a?a:null}for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}
function Pa(a,b){var c=a.stateNode;if(!c)return null;var d=Da(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==typeof c)throw Error(p(231,
b,typeof c));return c}function Qa(a,b,c){a&&c&&c._reactName&&(b=Pa(a,c._reactName))&&(null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a))}
function Ra(a,b,c){var d=c._reactName;"captured"===b&&(d+="Capture");if(b=Pa(a,d))null==c._dispatchListeners&&(c._dispatchListeners=[]),null==c._dispatchInstances&&(c._dispatchInstances=[]),c._dispatchListeners.push(b),c._dispatchInstances.push(a)}var Sa={},Ta=new Set(["mouseEnter","mouseLeave","pointerEnter","pointerLeave"]);
function Ua(a){return function(b,c){if(l.isValidElement(b))throw Error(p(228));if(Y(b))throw Error(p(229));var d="on"+a[0].toUpperCase()+a.slice(1),e=new Ha;e.target=b;e.type=a.toLowerCase();var g=Ba(b),f=new ba(d,e.type,g,e,b);f.persist();h(f,c);Ta.has(a)?f&&f._reactName&&Qa(f._targetInst,null,f):f&&f._reactName&&Oa(f._targetInst,Ra,f);m.unstable_batchedUpdates(function(){Ea(b);if(f){var a=f._dispatchListeners,c=f._dispatchInstances;if(Array.isArray(a))for(var d=0;d<a.length&&!f.isPropagationStopped();d++)Na(f,
a[d],c[d]);else a&&Na(f,a,c);f._dispatchListeners=null;f._dispatchInstances=null;f.isPersistent()||f.constructor.release(f)}if(T)throw a=U,T=!1,U=null,a;});Fa()}}
"blur cancel click close contextMenu copy cut auxClick doubleClick dragEnd dragStart drop focus input invalid keyDown keyPress keyUp mouseDown mouseUp paste pause play pointerCancel pointerDown pointerUp rateChange reset seeked submit touchCancel touchEnd touchStart volumeChange drag dragEnter dragExit dragLeave dragOver mouseMove mouseOut mouseOver pointerMove pointerOut pointerOver scroll toggle touchMove wheel abort animationEnd animationIteration animationStart canPlay canPlayThrough durationChange emptied encrypted ended error gotPointerCapture load loadedData loadedMetadata loadStart lostPointerCapture playing progress seeking stalled suspend timeUpdate transitionEnd waiting mouseEnter mouseLeave pointerEnter pointerLeave change select beforeInput compositionEnd compositionStart compositionUpdate".split(" ").forEach(function(a){Sa[a]=Ua(a)});
exports.Simulate=Sa;
exports.act=function(a){function b(){N--;J.current=c;I.current=d}!1===ua&&(ua=!0,console.error("act(...) is not supported in production builds of React, and might not behave as expected."));N++;var c=J.current,d=I.current;J.current=!0;I.current=!0;try{var e=ta(a)}catch(g){throw b(),g;}if(null!==e&&"object"===typeof e&&"function"===typeof e.then)return{then:function(a,d){e.then(function(){1<N||!0===K&&!0===c?(b(),a()):M(function(c){b();c?d(c):a()})},function(a){b();d(a)})}};try{1!==N||!1!==K&&!1!==
c||L(),b()}catch(g){throw b(),g;}return{then:function(a){a()}}};exports.findAllInRenderedTree=Z;exports.findRenderedComponentWithType=function(a,b){W(a,"findRenderedComponentWithType");a=Ma(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for componentType:"+b);return a[0]};
exports.findRenderedDOMComponentWithClass=function(a,b){W(a,"findRenderedDOMComponentWithClass");a=Ka(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for class:"+b);return a[0]};exports.findRenderedDOMComponentWithTag=function(a,b){W(a,"findRenderedDOMComponentWithTag");a=La(a,b);if(1!==a.length)throw Error("Did not find exactly one match (found: "+a.length+") for tag:"+b);return a[0]};exports.isCompositeComponent=Y;exports.isCompositeComponentWithType=Ja;
exports.isDOMComponent=X;exports.isDOMComponentElement=function(a){return!!(a&&l.isValidElement(a)&&a.tagName)};exports.isElement=function(a){return l.isValidElement(a)};exports.isElementOfType=function(a,b){return l.isValidElement(a)&&a.type===b};exports.mockComponent=function(a,b){b=b||a.mockTagName||"div";a.prototype.render.mockImplementation(function(){return l.createElement(b,null,this.props.children)});return this};exports.nativeTouchData=function(a,b){return{touches:[{pageX:a,pageY:b}]}};
exports.renderIntoDocument=function(a){var b=document.createElement("div");return m.render(a,b)};exports.scryRenderedComponentsWithType=Ma;exports.scryRenderedDOMComponentsWithClass=Ka;exports.scryRenderedDOMComponentsWithTag=La;exports.traverseTwoPhase=Oa;
exports.unstable_concurrentAct=function(a){function b(){Q.current=c;O.current=d}if(void 0===n.unstable_flushAllWithoutAsserting)throw Error("This version of `act` requires a special mock build of Scheduler.");if(!0!==setTimeout._isMockFunction)throw Error("This version of `act` requires Jest's timer mocks (i.e. jest.useFakeTimers).");var c=Q.current,d=O.current;Q.current=!0;O.current=!0;try{var e=va(a);if("object"===typeof e&&null!==e&&"function"===typeof e.then)return{then:function(a,c){e.then(function(){wa(function(){b();
a()},function(a){b();c(a)})},function(a){b();c(a)})}};try{do var g=n.unstable_flushAllWithoutAsserting();while(g)}finally{b()}}catch(f){throw b(),f;}};


/***/ }),

/***/ 267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(531);
} else {}


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

/***/ 53:
/***/ ((__unused_webpack_module, exports) => {

/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),

/***/ 840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(53);
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

/***/ 668:
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
const Store_1 = __webpack_require__(607);
exports.SlapContext = react_1.default.createContext(null);
function useAppContext() {
    return (0, react_1.useContext)(exports.SlapContext);
}
exports.useAppContext = useAppContext;
function useScope() {
    return useAppContext().rootScope;
}
exports.useScope = useScope;
function createApp(Services = {}) {
    const rootScope = new scope_1.Scope(Object.assign(Object.assign({}, Services), { Store: Store_1.Store, ReactStoreAdapter: react_store_adapter_1.ReactStoreAdapter }));
    const modulesScope = rootScope.createChildScope({}, { autoregister: true });
    rootScope.init(react_store_adapter_1.ReactStoreAdapter);
    return { rootScope, modulesScope };
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
exports.useForceUpdate = exports.useComponentId = exports.useOnDestroy = exports.useOnCreate = void 0;
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
__exportStar(__webpack_require__(668), exports);
__exportStar(__webpack_require__(985), exports);
__exportStar(__webpack_require__(309), exports);
__exportStar(__webpack_require__(878), exports);
__exportStar(__webpack_require__(31), exports);


/***/ }),

/***/ 160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactStoreAdapter = void 0;
const Store_1 = __webpack_require__(607);
const injector_1 = __webpack_require__(869);
const react_dom_1 = __webpack_require__(386);
class ReactStoreAdapter {
    constructor() {
        this.store = (0, injector_1.inject)(Store_1.Store);
        this.watchers = {};
        this.watchersOrder = [];
        // invalidatedComponents: ComponentView<any>[] = [];
        this.components = {};
        this.stateIsInvalidated = false;
        this.updateIsInProgress = false;
    }
    load() {
        this.store.events.on('onMutation', () => this.onMutation());
    }
    createComponent(component) {
        this.components[component.id] = component;
    }
    mountComponent(component) {
        component.mount();
        // if (this.stateIsInvalidated && !this.hasUnmountedComponents()) {
        //   this.updateUI();
        // }
    }
    //
    // hasUnmountedComponents() {
    //   const hasUnmountedComponents = Object.keys(this.components).find(id => {
    //     const comp = this.components[id];
    //     return !comp.isMounted && !comp.isDestroyed;
    //   });
    //   return hasUnmountedComponents;
    // }
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
        // if (this.stateIsInvalidated) return;
        // this.stateIsInvalidated = true;
        //
        // if (!this.hasUnmountedComponents()) {
        //   this.updateUI();
        // }
    }
    updateUI() {
        if (this.updateIsInProgress) {
            throw new Error('Can not update ');
        }
        this.updateIsInProgress = true;
        const watchersIds = [...this.watchersOrder];
        // force update components
        (0, react_dom_1.unstable_batchedUpdates)(() => {
            watchersIds.forEach(id => {
                this.watchers[id] && this.watchers[id]();
                const component = this.components[id];
                if (!component.needUpdate()) {
                    console.error('Failed to update', component);
                }
                if (component.needUpdate()) {
                    component.forceUpdate();
                    component.setInvalidated(false);
                }
            });
        });
        // // collect invalidated components
        // watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
        //
        // // force update components
        // unstable_batchedUpdates(() => {
        //
        //   watchersIds.forEach(id => {
        //     this.components[id].needUpdate() && this.components[id].forceUpdate()
        //   });
        // });
        this.stateIsInvalidated = false;
        this.updateIsInProgress = false;
    }
}
exports.ReactStoreAdapter = ReactStoreAdapter;


/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useConnectStore = exports.useModule = exports.useComponentView = void 0;
const hooks_1 = __webpack_require__(985);
const useModuleInstance_1 = __webpack_require__(878);
const scope_1 = __webpack_require__(527);
const StateView_1 = __webpack_require__(32);
const react_1 = __webpack_require__(156);
const ReactModules_1 = __webpack_require__(668);
const store_1 = __webpack_require__(338);
const react_store_adapter_1 = __webpack_require__(160);
const utils_1 = __webpack_require__(225);
function useComponentView(moduleView, moduleId, id) {
    const forceUpdate = (0, hooks_1.useForceUpdate)();
    const store = (0, ReactModules_1.useScope)().resolve(store_1.Store);
    const { componentId, componentView } = (0, hooks_1.useOnCreate)(() => {
        const componentId = id || `${moduleId}__component__${(0, scope_1.generateId)()}`;
        const componentView = moduleView.registerComponent(store, componentId, forceUpdate);
        const stateView = componentView.stateView;
        // // check affected components
        // function selector() {
        //   if (!stateView.hasSelectedProps) return;
        //   const reactiveValues = stateView.getSnapshot();
        //   return reactiveValues;
        // }
        function extend(newPropsFactory) {
            const extendedView = moduleView.extend(newPropsFactory, componentId);
            return useComponentView(extendedView, moduleId, componentId);
        }
        stateView.defineProp({
            type: 'extend',
            name: 'extend',
            getValue: () => extend,
        });
        stateView.defineProp({
            type: 'ComponentView',
            name: 'componentView',
            getValue: () => componentView,
        });
        return {
            componentId, componentView,
        };
    });
    (0, hooks_1.useOnDestroy)(() => {
        moduleView.destroyComponent(componentId);
    });
    // useDetectChanges
    // call selector to make selected props reactive
    useConnectStore(componentView);
    return componentView.stateView.proxy;
}
exports.useComponentView = useComponentView;
function useModule(locator, initProps = null, moduleName = '') {
    const module = (0, useModuleInstance_1.useModuleInstance)(locator, initProps, moduleName);
    const moduleView = (0, hooks_1.useOnCreate)(() => (0, StateView_1.createStateViewForModule)(module));
    return useComponentView(moduleView, (0, scope_1.getInstanceMetadata)(module).id);
}
exports.useModule = useModule;
function useConnectStore(component) {
    const scope = (0, ReactModules_1.useAppContext)().modulesScope;
    const store = scope.resolve(store_1.Store);
    const reactStore = scope.resolve(react_store_adapter_1.ReactStoreAdapter);
    reactStore.createComponent(component);
    (0, react_1.useLayoutEffect)(() => {
        const stateView = component.stateView;
        if (!stateView.hasSelectedProps)
            return;
        component.makeSnapshot();
        // TODO do not run watchers for non-observable component views
        const watcherId = reactStore.createWatcher(component.id, () => {
            const prevSnapshot = component.lastSnapshot;
            const newSnapshot = component.makeSnapshot();
            if ((0, utils_1.isSimilar)(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
                // no modules changed, do not call compare props
                return;
            }
            if (!(0, utils_1.isSimilar)(prevSnapshot.props, newSnapshot.props)) {
                // reactStore.updateUI();
                component.setInvalidated(true);
            }
        });
        return () => {
            reactStore.removeWatcher(watcherId);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        reactStore.mountComponent(component);
    }, []);
}
exports.useConnectStore = useConnectStore;


/***/ }),

/***/ 878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModuleInstance = void 0;
const react_1 = __webpack_require__(156);
const hooks_1 = __webpack_require__(985);
const ReactModules_1 = __webpack_require__(668);
const Store_1 = __webpack_require__(607);
function useModuleInstance(locator, initProps = null, name = '') {
    const rootScope = (0, ReactModules_1.useAppContext)().modulesScope;
    const { instance, moduleName, scope, isRoot, store, } = (0, hooks_1.useOnCreate)(() => {
        const moduleName = name || typeof locator === 'string' ? locator : locator.name;
        const store = rootScope.resolve(Store_1.Store);
        let isRoot = !!initProps;
        let scope = isRoot ? rootScope : store.currentContext[moduleName];
        if (!scope) {
            if (rootScope.isRegistered(locator)) {
                scope = rootScope;
            }
            else {
                isRoot = true;
            }
        }
        if (isRoot)
            scope = rootScope.registerScope({}, { autoregister: true });
        const instance = scope.resolve(locator);
        if (initProps && typeof initProps === 'object') {
            instance.state['nonReactiveUpdate'](initProps);
        }
        return {
            instance,
            store,
            isRoot,
            scope,
            moduleName,
        };
    });
    isRoot && store.setModuleContext(moduleName, scope);
    (0, react_1.useEffect)(() => {
        isRoot && store.resetModuleContext(moduleName);
    }, []);
    // unregister the component from the module onDestroy
    (0, hooks_1.useOnDestroy)(() => {
        if (isRoot)
            scope.dispose();
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
exports.injectScope = exports.ScopeInjectorType = exports.inject = exports.ModuleInjectorType = exports.createInjector = exports.Injector = void 0;
const utils_1 = __webpack_require__(986);
const scope_1 = __webpack_require__(521);
class Injector {
    constructor(provider) {
        this.provider = provider;
        this.id = (0, utils_1.generateId)();
        this.loadingStatus = 'not-started';
        this.propertyName = '';
        this.isDestroyed = false;
    }
    init() {
        this.params.init && this.params.init(this);
        const getValue = this.params.getValue;
        if (getValue) {
            (0, utils_1.defineGetter)(this.provider.instance, this.propertyName, getValue);
        }
        const load = this.params.load;
        const loadResult = load && load(this);
        if (loadResult && loadResult.then) {
            this.setLoadingStatus('loading');
            loadResult.then(() => {
                this.setLoadingStatus('done');
            });
        }
        else {
            this.loadingStatus = 'done';
        }
    }
    setPropertyName(propertyName) {
        this.propertyName = propertyName;
    }
    setLoadingStatus(loadingStatus) {
        if (this.isDestroyed)
            return;
        const prevStatus = this.loadingStatus;
        this.loadingStatus = loadingStatus;
        this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
    }
    destroy() {
        this.params.destroy && this.params.destroy(this);
        this.isDestroyed = true;
    }
    resolveValue() {
        return this.provider.instance[this.propertyName];
    }
    hasViewValue() {
        return !!this.params.getViewValue;
    }
    resolveViewValue() {
        return this.params.getViewValue
            ? this.params.getViewValue()
            : this.resolveValue();
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
    return injector;
}
exports.createInjector = createInjector;
// DEFINE BUILT-IN INJECTORS
exports.ModuleInjectorType = Symbol('moduleInjector');
function inject(ModuleClass) {
    return createInjector(injector => ({
        type: exports.ModuleInjectorType,
        getValue: () => injector.provider.scope.resolve(ModuleClass),
    }));
}
exports.inject = inject;
exports.ScopeInjectorType = Symbol('scopeInjector');
function injectScope() {
    return createInjector(injector => ({
        type: exports.ScopeInjectorType,
        getValue: () => injector.provider.scope,
    }));
}
exports.injectScope = injectScope;


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
const injector_1 = __webpack_require__(869);
class Provider {
    constructor(scope, creator, name = '', options = {}) {
        this.scope = scope;
        this.name = name;
        this.options = options;
        this.instance = null;
        this.metadata = {};
        this.injectors = {}; // dict of injectors by id
        this.injectorsByProp = {}; // dict of injectors by propName
        this.isInited = false; // instance is added to Scope
        // private resolveInit!: Function;
        // waitForInit = new Promise(resolve => { this.resolveInit = resolve });
        this.injectionCompleted = false;
        this.loadMethodCompleted = false;
        this.isAsync = false;
        this.isLoaded = false;
        this.waitForLoad = new Promise(resolve => { this.resolveLoad = resolve; });
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
        if (this.options.shouldCallHooks) {
            instance.init && instance.init();
        }
        this.resolveInjectors();
        return instance;
    }
    setInited() {
        this.isInited = true;
        this.events.emit('onModuleInit');
        this.checkModuleIsLoaded();
    }
    /**
     * Resolve injectors for just created object
     *
     *  WARNING!
     *  this code is executed for every object creation
     *  and should care about performance
     */
    resolveInjectors() {
        const provider = this;
        const instance = provider.instance;
        const descriptors = Object.getOwnPropertyDescriptors(instance);
        let hasAsyncInjectors = false;
        // register injectors
        Object.keys(descriptors).forEach(propName => {
            const descriptor = descriptors[propName];
            if (descriptor.get)
                return; // don't execute getters
            const propValue = descriptor.value;
            if (!(propValue instanceof injector_1.Injector))
                return;
            const injector = propValue;
            provider.injectors[injector.id] = injector;
            provider.injectorsByProp[propName] = injector;
            injector.setPropertyName(propName);
        });
        // call init() for injectors
        Object.values(this.injectors).forEach(injector => {
            injector.init();
            if (injector.loadingStatus !== 'done')
                hasAsyncInjectors = true;
        });
        if (hasAsyncInjectors) {
            this.isAsync = true;
        }
        else {
            this.handleInjectionsCompleted();
        }
    }
    getMetadata(pluginName) {
        return this.metadata[pluginName];
    }
    setMetadata(pluginName, data) {
        this.metadata[pluginName] = data;
    }
    destroy() {
        // destroy provider
        // unsubscribe events
        this.events.events = {};
    }
    destroyInstance() {
        const instance = this.instance;
        if (!instance)
            return;
        // destroy instance
        instance.destroy && instance.destroy();
        this.initParams = [];
        // destroy injectors
        Object.keys(this.injectors).forEach(injectorName => {
            this.injectors[injectorName].destroy();
        });
        this.instance = null;
        this.isInited = false;
    }
    handleInjectorStatusChange(injector, currentStatus, prevStatus) {
        this.events.emit('onInjectorStatusChange', injector, currentStatus, prevStatus);
        this.checkInjectionIsCompleted();
    }
    checkInjectionIsCompleted() {
        if (!this.injectionCompleted) {
            const injectors = Object.values(this.injectors);
            for (const injector of injectors) {
                if (injector.loadingStatus !== 'done')
                    return;
            }
        }
        this.handleInjectionsCompleted();
    }
    handleInjectionsCompleted() {
        this.injectionCompleted = true;
        if (this.options.shouldCallHooks) {
            const instance = this.instance;
            const loadResult = instance.load && instance.load();
            if (loadResult === null || loadResult === void 0 ? void 0 : loadResult.then) {
                this.isAsync = true;
                loadResult.then(() => {
                    this.loadMethodCompleted = true;
                    this.checkModuleIsLoaded();
                });
                return;
            }
        }
        this.loadMethodCompleted = true;
        this.checkModuleIsLoaded();
    }
    checkModuleIsLoaded() {
        if (!this.isInited)
            return;
        if (!this.injectionCompleted)
            return;
        if (!this.loadMethodCompleted)
            return;
        if (this.options.shouldCallHooks) {
            const instance = this.instance;
            instance.onLoad && instance.onLoad();
        }
        this.isLoaded = true;
        this.resolveLoad();
        this.events.emit('onModuleLoaded');
    }
    get instanceId() {
        return getInstanceMetadata(this.instance).id;
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
    register(ModuleCreator, name) {
        const moduleName = name || ModuleCreator.name || `AnonymousModule_${(0, utils_1.generateId)()}`;
        if (this.providers[moduleName]) {
            throw new Error(`${moduleName} already registered in the given Scope`);
        }
        const provider = new provider_1.Provider(this, ModuleCreator, moduleName);
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
        const provider = this.resolveProvider(locator);
        provider.destroyInstance();
        delete this.providers[provider.id];
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
        return this.create(locator, ...args);
    }
    /**
     * Register and instantiate a module
     * TODO add type for args
     */
    start(creator, ...args) {
        this.register(creator);
        const instance = this.init(creator, ...args);
        return instance;
    }
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
        if (isRegistered) {
            provider.events.on('onModuleLoaded', () => {
                this.events.emit('onModuleLoad', provider);
            });
            this.events.emit('onModuleInit', provider);
            provider.setInited();
        }
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

/***/ 989:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectQuery = exports.QueryInjectorType = exports.Query = exports.QueryStateConfig = void 0;
const test_utils_1 = __webpack_require__(267);
const scope_1 = __webpack_require__(527);
const Store_1 = __webpack_require__(607);
var error = test_utils_1.Simulate.error;
class QueryStateConfig {
    constructor() {
        this.state = {
            status: 'idle',
            data: null,
            error: null,
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
}
exports.QueryStateConfig = QueryStateConfig;
/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
class Query {
    constructor(store, moduleName, propName, constructorOptions) {
        this.store = store;
        this.moduleName = moduleName;
        this.fetchingPromise = null;
        this.enabled = true;
        const options = Object.assign({ enabled: true, params: null, initialData: null, getParams: null }, constructorOptions);
        this.options = options;
        this.enabled = !!options.enabled;
        this.params = options.getParams ? options.getParams() : {};
        const stateConfig = new QueryStateConfig();
        stateConfig.state.data = options.initialData;
        this.state = this.store.createState(moduleName, propName, stateConfig);
        this.stateView = this.state.createView();
    }
    exec() {
        if (this.fetchingPromise)
            return this.fetchingPromise;
        return this.fetch();
    }
    fetch() {
        const fetchResult = this.options.fetch(this);
        if (fetchResult === null || fetchResult === void 0 ? void 0 : fetchResult.then) {
            this.fetchingPromise = fetchResult;
            return fetchResult.then((data) => {
                if (!this.enabled)
                    return;
                this.fetchingPromise = null;
                this.state.setData(data);
            })
                .catch((e) => {
                if (!this.enabled)
                    return;
                this.fetchingPromise = null;
                this.state.setError(error);
            });
        }
        return Promise.resolve(fetchResult);
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    destroy() {
        // prevent unfinished fetching
        this.setEnabled(false);
    }
}
exports.Query = Query;
exports.QueryInjectorType = Symbol('queryInjector');
// async function fetchOnlineUsers() {
//   return new Promise<TUser[]>(r => {
//     setTimeout(() => r([{ id: 'online1', name: 'Online User 1' }, { id: 'online2', name: 'Online User 2' }]), 3000);
//   });
// }
function injectQuery(options) {
    return (0, scope_1.createInjector)(injector => {
        let query;
        return {
            type: exports.QueryInjectorType,
            load: () => {
                const propName = injector.propertyName;
                const moduleName = injector.provider.id;
                const store = injector.provider.scope.resolve(Store_1.Store);
                query = new Query(store, moduleName, propName, options);
                query.exec();
            },
            getValue() {
                return query;
            },
            getViewValue() {
                return query.stateView;
            },
            destroy() {
                query.destroy();
            },
        };
    });
}
exports.injectQuery = injectQuery;


/***/ }),

/***/ 32:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComponentView = exports.createStateViewForModule = exports.StateView = void 0;
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
        // TODO remove components
        this.components = {};
        this.proxy = new Proxy({
            __proxyName: 'StateViewProxy', // set proxy name for debugging
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
                const getRev = this.descriptors.getRev;
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
    extend(newPropsFactory, name) {
        if (!this.scope) {
            throw new Error('You should define a Scope to use .extend()');
        }
        if (!this.scope.isRegistered(name)) {
            const factory = () => newPropsFactory(this.props, this);
            const provider = this.scope.register(factory, name);
            const extendedModule = this.scope.resolve(name);
            const extendedModuleView = createStateViewForModule(extendedModule);
            const mergedView = this.mergeView(extendedModuleView);
            provider.setMetadata('StateView', mergedView);
            // TODO destroy module after component destroy, create a component scope
        }
        const provider = this.scope.resolveProvider(name);
        const extendedView = provider.getMetadata('StateView');
        return extendedView;
    }
    clone() {
        const clone = new StateView(this.scope);
        (0, scope_1.forEach)(this.descriptors, descriptor => clone.defineProp(descriptor));
        clone.components = this.components;
        return clone;
    }
    mergeView(extension) {
        // merge one view into another
        const mergeResult = this.clone();
        (0, scope_1.forEach)(extension.descriptors, descriptor => mergeResult.defineProp(descriptor));
        return mergeResult;
    }
    registerComponent(store, componentId, forceUpdate) {
        const componentView = new ComponentView(store, this, componentId, forceUpdate);
        this.components[componentId] = componentView;
        return componentView;
    }
    destroyComponent(componentId) {
        var _a;
        if ((_a = this.scope) === null || _a === void 0 ? void 0 : _a.isRegistered(componentId)) {
            this.scope.unregister(componentId);
        }
        const componentView = this.components[componentId];
        if (!componentView)
            return;
        componentView.destroy();
        delete this.components[componentId];
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
            props: null,
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
    mount() {
        this.isMounted = true;
    }
    setInvalidated(invalidated) {
        this.isInvalidated = invalidated;
    }
    destroy() {
        this.isDestroyed = true;
        this.isMounted = false;
    }
}
exports.ComponentView = ComponentView;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultStateConfig = exports.ModuleStateController = exports.Store = void 0;
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
        this.currentMutation = null;
        this.moduleRevisions = {};
        // TODO : move to hooks?
        this.currentScope = {};
        this.recordingAccessors = 0;
        this.affectedModules = {};
        this.currentContext = {};
        this.events = (0, nanoevents_1.createNanoEvents)();
    }
    createState(moduleName, sectionName, configCreator) {
        if (this.modulesMetadata[moduleName] && this.modulesMetadata[sectionName]) {
            throw new Error(`State with a name "${moduleName}" is already created`);
        }
        const config = (0, parse_config_1.parseStateConfig)(configCreator);
        console.log('REGISTER STORE', moduleName, sectionName);
        const controller = new ModuleStateController(this, moduleName, sectionName, config);
        return controller;
    }
    dispatchMutation(mutation) {
        console.log('RUN MUTATION', mutation);
        const moduleName = mutation.moduleName;
        const sectionName = mutation.sectionName;
        const metadata = this.modulesMetadata[moduleName];
        if (!metadata)
            return; // state is destroyed
        const stateController = this.modulesMetadata[moduleName][sectionName].controller;
        if (this.currentMutation) {
            throw new Error('Can not run mutation while previous mutation is not completed');
        }
        this.currentMutation = mutation;
        stateController.applyMutation(mutation);
        this.currentMutation = null;
        // trigger subscribed components to re-render
        if (!mutation.silent)
            this.events.emit('onMutation', mutation, this);
    }
    toJSON() {
        // TODO use for debugging
    }
    setModuleScope(moduleName, scope) {
        this.currentScope[moduleName] = scope;
    }
    resetModuleScope(moduleName) {
        delete this.currentScope[moduleName];
    }
    destroyModule(moduleName) {
        delete this.rootState[moduleName];
        delete this.modulesMetadata[moduleName];
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
    getMetadata(moduleName, sectionName) {
        return this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName][sectionName];
    }
    getController(moduleName, sectionName) {
        var _a;
        return (_a = this.getMetadata(moduleName, sectionName)) === null || _a === void 0 ? void 0 : _a.controller;
    }
}
exports.Store = Store;
class ModuleStateController {
    constructor(store, moduleName, sectionName, config) {
        this.store = store;
        this.moduleName = moduleName;
        this.sectionName = sectionName;
        this.draftState = null;
        const defaultState = config.state;
        // use immer to create an immutable state
        if (!store.rootState[moduleName])
            store.rootState[moduleName] = {};
        store.rootState[moduleName][sectionName] = (0, immer_1.default)(defaultState, () => { });
        // create metadata
        const controller = this;
        const metadata = {
            config,
            controller,
            rev: 0,
        };
        if (!store.modulesMetadata[moduleName])
            store.modulesMetadata[moduleName] = {};
        store.modulesMetadata[moduleName][sectionName] = metadata;
        // generate getters
        Object.keys(defaultState).forEach(propName => {
            (0, scope_1.defineGetter)(controller, propName, () => controller.state[propName]);
            (0, scope_1.defineSetter)(controller, propName, val => {
                controller.state[propName] = val;
                return true;
            });
        });
        Object.keys(config.getters).forEach(propName => {
            (0, scope_1.defineGetter)(controller, propName, () => config.getters[propName].get.apply(controller));
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
        // create other mutations
        Object.keys(config.mutations).forEach(propName => {
            this.registerMutation(propName, config.mutations[propName]);
        });
        // define bulk non-reactive state mutation
        const nonReactiveUpdate = 'nonReactiveUpdate';
        config.mutations[nonReactiveUpdate] = (statePatch) => Object.assign(controller, statePatch);
        controller.registerMutation('nonReactiveUpdate', config.mutations[nonReactiveUpdate], true);
    }
    registerMutation(mutationName, mutationMethod, silent = false) {
        const controller = this;
        const { store, moduleName, sectionName } = controller;
        // override the original Module method to dispatch mutations
        controller[mutationName] = function (...args) {
            // if this method was called from another mutation
            // we don't need to dispatch a new mutation again
            // just call the original method
            if (store.currentMutation) {
                if (store.currentMutation.moduleName !== moduleName) {
                    const parentMutation = store.currentMutation;
                    const parentMutationName = `${parentMutation.moduleName}_${parentMutation.mutationName}`;
                    const childMutationName = `${moduleName}_${mutationName}`;
                    // TODO should we really prevent that?
                    console.warn(`Can not run a mutation of another module. Call ${parentMutationName} from ${childMutationName}`);
                }
                return mutationMethod.apply(controller, args);
            }
            const mutation = {
                id: Number((0, scope_1.generateId)()),
                payload: args,
                moduleName,
                sectionName,
                mutationName,
                silent,
            };
            store.dispatchMutation(mutation);
        };
    }
    applyMutation(mutation) {
        const moduleName = mutation.moduleName;
        const sectionName = mutation.sectionName;
        const mutationName = mutation.mutationName;
        const state = this.store.rootState[moduleName][sectionName];
        this.store.rootState[moduleName][sectionName] = (0, immer_1.default)(state, (draft) => {
            this.draftState = draft;
            const controller = this;
            controller.metadata.config.mutations[mutationName].apply(controller, mutation.payload);
        });
        this.metadata.rev++;
        this.draftState = null;
    }
    get state() {
        if (this.draftState)
            return this.draftState;
        const store = this.store;
        const moduleName = this.moduleName;
        const sectionName = this.sectionName;
        if (store.recordingAccessors) {
            store.affectedModules[moduleName + '__' + sectionName] = this.metadata.rev;
        }
        return store.rootState[moduleName][sectionName];
    }
    // TODO remove
    set state(val) {
        console.log('set state ', val);
        throw new Error('Trying to set state');
    }
    get metadata() {
        return this.store.modulesMetadata[this.moduleName][this.sectionName];
    }
    createView() {
        const metadata = this.metadata;
        const config = metadata.config;
        const view = new StateView_1.StateView();
        const controller = this;
        view.defineProp({
            type: 'StateRev',
            name: 'getRev',
            reactive: false,
            getValue: () => {
                // eslint-disable-next-line no-unused-expressions
                controller.state; // read as reactive
                return metadata.rev;
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
exports.ModuleStateController = ModuleStateController;
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

/***/ 938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectForm = exports.FormInjectorType = exports.createFormBinding = void 0;
const StateView_1 = __webpack_require__(32);
const scope_1 = __webpack_require__(527);
function createFormBinding(stateGetter, stateSetter, extraPropsGenerator) {
    const stateView = new StateView_1.StateView();
    stateView.defineProp({
        type: 'FormStateRev',
        name: 'getRev',
        getValue: () => (stateGetter()),
    });
    stateView.defineWildcardProp(propName => {
        stateView.defineProp({
            type: 'FormInputBinding',
            name: propName,
            reactive: true,
            getValue: () => (Object.assign({ name: propName, value: stateGetter()[propName], onChange: (newVal) => {
                    stateSetter({ [propName]: newVal });
                } }, (extraPropsGenerator ? extraPropsGenerator(propName) : {})))
        });
    });
    return stateView;
}
exports.createFormBinding = createFormBinding;
exports.FormInjectorType = Symbol('formInjector');
function injectForm(stateGetter, stateSetter, extraPropsGenerator) {
    return (0, scope_1.createInjector)(injector => {
        const binding = createFormBinding(stateGetter, stateSetter, extraPropsGenerator);
        return {
            type: exports.FormInjectorType,
            getValue() {
                return binding;
            },
            getViewValue() {
                return binding;
            }
        };
    });
}
exports.injectForm = injectForm;


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
__exportStar(__webpack_require__(307), exports);
__exportStar(__webpack_require__(938), exports);
__exportStar(__webpack_require__(989), exports);
__exportStar(__webpack_require__(837), exports);
__exportStar(__webpack_require__(890), exports);


/***/ }),

/***/ 307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectState = exports.StateInjectorType = void 0;
const injector_1 = __webpack_require__(869);
const Store_1 = __webpack_require__(607);
exports.StateInjectorType = Symbol('stateInjector');
function injectState(configCreator, onCreate) {
    return (0, injector_1.createInjector)(injector => {
        const store = injector.provider.scope.resolve(Store_1.Store);
        let state = null;
        let stateView = null;
        function createState(propName) {
            const moduleName = injector.provider.instanceId;
            const moduleState = store.createState(moduleName, propName, configCreator);
            return moduleState;
        }
        return {
            type: exports.StateInjectorType,
            load: () => {
                state = createState(injector.propertyName);
                stateView = state.createView();
                onCreate && onCreate(state, injector);
            },
            getValue() {
                return state;
            },
            getViewValue() {
                return stateView;
            },
            destroy(injector) {
                const moduleName = injector.provider.instanceId;
                store.destroyModule(moduleName);
            },
        };
    });
}
exports.injectState = injectState;
// function createStateForModule<TConfigCreator extends TStateConfigCreator>(provider: Provider<any>, propName: string, stateConfig: TConfigCreator): TStateControllerFor<TConfigCreator> {
//   const moduleName = provider.instanceId;
//   const store = provider.scope.resolve(Store);
//   const moduleState = store.createState(moduleName, propName, stateConfig);
//   createLoadingState(store, provider);
//   return moduleState;
// }
//
// function destroyStateForModule(provider: Provider<any>) {
//   const moduleName = provider.instanceId;
//   const store = provider.scope.resolve(Store);
//   store.destroyModule(moduleName);
// }


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
__exportStar(__webpack_require__(187), exports);
__exportStar(__webpack_require__(209), exports);
__exportStar(__webpack_require__(49), exports);


/***/ }),

/***/ 187:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pickInjectors = void 0;
const scope_1 = __webpack_require__(527);
function pickInjectors(module) {
    return function (props, view) {
        const provider = (0, scope_1.getInstanceMetadata)(module).provider;
        let newView = view;
        (0, scope_1.forEach)(provider.injectors, injector => {
            if (!injector.hasViewValue())
                return;
            const injectorView = injector.resolveViewValue();
            newView = newView.mergeView(injectorView);
            newView.defineProp({
                type: 'InjectorView',
                name: injector.propertyName,
                reactive: true,
                stateView: injectorView,
                getValue() {
                    return injectorView;
                },
            });
        });
        return newView;
    };
}
exports.pickInjectors = pickInjectors;
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

/***/ 209:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectLoading = exports.LoadingState = void 0;
const injectState_1 = __webpack_require__(307);
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
    return (0, injectState_1.injectState)(LoadingState, (stateController, injector) => {
        const provider = injector.provider;
        provider.events.on('onModuleInit', () => {
            if (!provider.isAsync) {
                stateController.nonReactiveUpdate({ loadingStatus: 'done' });
                return;
            }
            stateController.nonReactiveUpdate({ loadingStatus: 'loading' });
            provider.waitForLoad.then(() => {
                stateController.setLoadingStatus('done');
            });
        });
    });
}
exports.injectLoading = injectLoading;


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pickProps = void 0;
const traverse_1 = __webpack_require__(222);
function pickProps(module) {
    return function (props, view) {
        (0, traverse_1.traverse)(module, (propName, descr) => {
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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