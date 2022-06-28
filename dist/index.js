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
/******/ 	var __webpack_modules__ = ({

/***/ 41:
/***/ ((__unused_webpack_module, exports) => {

function n(n){for(var t=arguments.length,r=Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];throw Error("[Immer] minified error nr: "+n+(r.length?" "+r.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function t(n){return!!n&&!!n[H]}function r(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var t=Object.getPrototypeOf(n);if(null===t)return!0;var r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===Q}(n)||Array.isArray(n)||!!n[G]||!!n.constructor[G]||c(n)||v(n))}function e(n,t,r){void 0===r&&(r=!1),0===i(n)?(r?Object.keys:T)(n).forEach((function(e){r&&"symbol"==typeof e||t(e,n[e],n)})):n.forEach((function(r,e){return t(e,r,n)}))}function i(n){var t=n[H];return t?t.t>3?t.t-4:t.t:Array.isArray(n)?1:c(n)?2:v(n)?3:0}function u(n,t){return 2===i(n)?n.has(t):Object.prototype.hasOwnProperty.call(n,t)}function o(n,t){return 2===i(n)?n.get(t):n[t]}function f(n,t,r){var e=i(n);2===e?n.set(t,r):3===e?(n.delete(t),n.add(r)):n[t]=r}function a(n,t){return n===t?0!==n||1/n==1/t:n!=n&&t!=t}function c(n){return W&&n instanceof Map}function v(n){return X&&n instanceof Set}function s(n){return n.i||n.u}function p(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var t=U(n);delete t[H];for(var r=T(t),e=0;e<r.length;e++){var i=r[e],u=t[i];!1===u.writable&&(u.writable=!0,u.configurable=!0),(u.get||u.set)&&(t[i]={configurable:!0,writable:!0,enumerable:u.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),t)}function l(n,u){return void 0===u&&(u=!1),h(n)||t(n)||!r(n)?n:(i(n)>1&&(n.set=n.add=n.clear=n.delete=d),Object.freeze(n),u&&e(n,(function(n,t){return l(t,!0)}),!0),n)}function d(){n(2)}function h(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function y(t){var r=V[t];return r||n(18,t),r}function _(n,t){V[n]||(V[n]=t)}function b(){return J}function m(n,t){t&&(y("Patches"),n.o=[],n.v=[],n.s=t)}function j(n){O(n),n.p.forEach(w),n.p=null}function O(n){n===J&&(J=n.l)}function x(n){return J={p:[],l:J,h:n,_:!0,m:0}}function w(n){var t=n[H];0===t.t||1===t.t?t.j():t.O=!0}function S(t,e){e.m=e.p.length;var i=e.p[0],u=void 0!==t&&t!==i;return e.h.S||y("ES5").P(e,t,u),u?(i[H].M&&(j(e),n(4)),r(t)&&(t=P(e,t),e.l||g(e,t)),e.o&&y("Patches").g(i[H].u,t,e.o,e.v)):t=P(e,i,[]),j(e),e.o&&e.s(e.o,e.v),t!==B?t:void 0}function P(n,t,r){if(h(t))return t;var i=t[H];if(!i)return e(t,(function(e,u){return M(n,i,t,e,u,r)}),!0),t;if(i.A!==n)return t;if(!i.M)return g(n,i.u,!0),i.u;if(!i.R){i.R=!0,i.A.m--;var u=4===i.t||5===i.t?i.i=p(i.k):i.i;e(3===i.t?new Set(u):u,(function(t,e){return M(n,i,u,t,e,r)})),g(n,u,!1),r&&n.o&&y("Patches").F(i,r,n.o,n.v)}return i.i}function M(n,e,i,o,a,c){if(t(a)){var v=P(n,a,c&&e&&3!==e.t&&!u(e.D,o)?c.concat(o):void 0);if(f(i,o,v),!t(v))return;n._=!1}if(r(a)&&!h(a)){if(!n.h.K&&n.m<1)return;P(n,a),e&&e.A.l||g(n,a)}}function g(n,t,r){void 0===r&&(r=!1),n.h.K&&n._&&l(t,r)}function A(n,t){var r=n[H];return(r?s(r):n)[t]}function z(n,t){if(t in n)for(var r=Object.getPrototypeOf(n);r;){var e=Object.getOwnPropertyDescriptor(r,t);if(e)return e;r=Object.getPrototypeOf(r)}}function E(n){n.M||(n.M=!0,n.l&&E(n.l))}function R(n){n.i||(n.i=p(n.u))}function k(n,t,r){var e=c(t)?y("MapSet").$(t,r):v(t)?y("MapSet").C(t,r):n.S?function(n,t){var r=Array.isArray(n),e={t:r?1:0,A:t?t.A:b(),M:!1,R:!1,D:{},l:t,u:n,k:null,i:null,j:null,I:!1},i=e,u=Y;r&&(i=[e],u=Z);var o=Proxy.revocable(i,u),f=o.revoke,a=o.proxy;return e.k=a,e.j=f,a}(t,r):y("ES5").J(t,r);return(r?r.A:b()).p.push(e),e}function F(u){return t(u)||n(22,u),function n(t){if(!r(t))return t;var u,a=t[H],c=i(t);if(a){if(!a.M&&(a.t<4||!y("ES5").N(a)))return a.u;a.R=!0,u=D(t,c),a.R=!1}else u=D(t,c);return e(u,(function(t,r){a&&o(a.u,t)===r||f(u,t,n(r))})),3===c?new Set(u):u}(u)}function D(n,t){switch(t){case 2:return new Map(n);case 3:return Array.from(n)}return p(n)}function K(){function n(n,t){var r=f[n];return r?r.enumerable=t:f[n]=r={configurable:!0,enumerable:t,get:function(){return Y.get(this[H],n)},set:function(t){Y.set(this[H],n,t)}},r}function r(n){for(var t=n.length-1;t>=0;t--){var r=n[t][H];if(!r.M)switch(r.t){case 5:o(r)&&E(r);break;case 4:i(r)&&E(r)}}}function i(n){for(var t=n.u,r=n.k,e=T(r),i=e.length-1;i>=0;i--){var o=e[i];if(o!==H){var f=t[o];if(void 0===f&&!u(t,o))return!0;var c=r[o],v=c&&c[H];if(v?v.u!==f:!a(c,f))return!0}}var s=!!t[H];return e.length!==T(t).length+(s?0:1)}function o(n){var t=n.k;if(t.length!==n.u.length)return!0;var r=Object.getOwnPropertyDescriptor(t,t.length-1);if(r&&!r.get)return!0;for(var e=0;e<t.length;e++)if(!t.hasOwnProperty(e))return!0;return!1}var f={};_("ES5",{J:function(t,r){var e=Array.isArray(t),i=function(t,r){if(t){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,n(i,!0));return e}var u=U(r);delete u[H];for(var o=T(u),f=0;f<o.length;f++){var a=o[f];u[a]=n(a,t||!!u[a].enumerable)}return Object.create(Object.getPrototypeOf(r),u)}(e,t),u={t:e?5:4,A:r?r.A:b(),M:!1,R:!1,D:{},l:r,u:t,k:i,i:null,O:!1,I:!1};return Object.defineProperty(i,H,{value:u,writable:!0}),i},P:function(n,i,f){f?t(i)&&i[H].A===n&&r(n.p):(n.o&&function n(t){if(t&&"object"==typeof t){var r=t[H];if(r){var i=r.u,f=r.k,a=r.D,c=r.t;if(4===c)e(f,(function(t){t!==H&&(void 0!==i[t]||u(i,t)?a[t]||n(f[t]):(a[t]=!0,E(r)))})),e(i,(function(n){void 0!==f[n]||u(f,n)||(a[n]=!1,E(r))}));else if(5===c){if(o(r)&&(E(r),a.length=!0),f.length<i.length)for(var v=f.length;v<i.length;v++)a[v]=!1;else for(var s=i.length;s<f.length;s++)a[s]=!0;for(var p=Math.min(f.length,i.length),l=0;l<p;l++)f.hasOwnProperty(l)||(a[l]=!0),void 0===a[l]&&n(f[l])}}}}(n.p[0]),r(n.p))},N:function(n){return 4===n.t?i(n):o(n)}})}function $(){function f(n){if(!r(n))return n;if(Array.isArray(n))return n.map(f);if(c(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],f(n[1])]})));if(v(n))return new Set(Array.from(n).map(f));var t=Object.create(Object.getPrototypeOf(n));for(var e in n)t[e]=f(n[e]);return u(n,G)&&(t[G]=n[G]),t}function a(n){return t(n)?f(n):n}var s="add";_("Patches",{W:function(t,r){return r.forEach((function(r){for(var e=r.path,u=r.op,a=t,c=0;c<e.length-1;c++){var v=i(a),p=""+e[c];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof a&&"prototype"===p&&n(24),"object"!=typeof(a=o(a,p))&&n(15,e.join("/"))}var l=i(a),d=f(r.value),h=e[e.length-1];switch(u){case"replace":switch(l){case 2:return a.set(h,d);case 3:n(16);default:return a[h]=d}case s:switch(l){case 1:return"-"===h?a.push(d):a.splice(h,0,d);case 2:return a.set(h,d);case 3:return a.add(d);default:return a[h]=d}case"remove":switch(l){case 1:return a.splice(h,1);case 2:return a.delete(h);case 3:return a.delete(r.value);default:return delete a[h]}default:n(17,u)}})),t},F:function(n,t,r,i){switch(n.t){case 0:case 4:case 2:return function(n,t,r,i){var f=n.u,c=n.i;e(n.D,(function(n,e){var v=o(f,n),p=o(c,n),l=e?u(f,n)?"replace":s:"remove";if(v!==p||"replace"!==l){var d=t.concat(n);r.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),i.push(l===s?{op:"remove",path:d}:"remove"===l?{op:s,path:d,value:a(v)}:{op:"replace",path:d,value:a(v)})}}))}(n,t,r,i);case 5:case 1:return function(n,t,r,e){var i=n.u,u=n.D,o=n.i;if(o.length<i.length){var f=[o,i];i=f[0],o=f[1];var c=[e,r];r=c[0],e=c[1]}for(var v=0;v<i.length;v++)if(u[v]&&o[v]!==i[v]){var p=t.concat([v]);r.push({op:"replace",path:p,value:a(o[v])}),e.push({op:"replace",path:p,value:a(i[v])})}for(var l=i.length;l<o.length;l++){var d=t.concat([l]);r.push({op:s,path:d,value:a(o[l])})}i.length<o.length&&e.push({op:"replace",path:t.concat(["length"]),value:i.length})}(n,t,r,i);case 3:return function(n,t,r,e){var i=n.u,u=n.i,o=0;i.forEach((function(n){if(!u.has(n)){var i=t.concat([o]);r.push({op:"remove",path:i,value:n}),e.unshift({op:s,path:i,value:n})}o++})),o=0,u.forEach((function(n){if(!i.has(n)){var u=t.concat([o]);r.push({op:s,path:u,value:n}),e.unshift({op:"remove",path:u,value:n})}o++}))}(n,t,r,i)}},g:function(n,t,r,e){r.push({op:"replace",path:[],value:t===B?void 0:t}),e.push({op:"replace",path:[],value:n})}})}function C(){function t(n,t){function r(){this.constructor=n}f(n,t),n.prototype=(r.prototype=t.prototype,new r)}function i(n){n.i||(n.D=new Map,n.i=new Map(n.u))}function u(n){n.i||(n.i=new Set,n.u.forEach((function(t){if(r(t)){var e=k(n.A.h,t,n);n.p.set(t,e),n.i.add(e)}else n.i.add(t)})))}function o(t){t.O&&n(3,JSON.stringify(s(t)))}var f=function(n,t){return(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])})(n,t)},a=function(){function n(n,t){return this[H]={t:2,l:t,A:t?t.A:b(),M:!1,R:!1,i:void 0,D:void 0,u:n,k:this,I:!1,O:!1},this}t(n,Map);var u=n.prototype;return Object.defineProperty(u,"size",{get:function(){return s(this[H]).size}}),u.has=function(n){return s(this[H]).has(n)},u.set=function(n,t){var r=this[H];return o(r),s(r).has(n)&&s(r).get(n)===t||(i(r),E(r),r.D.set(n,!0),r.i.set(n,t),r.D.set(n,!0)),this},u.delete=function(n){if(!this.has(n))return!1;var t=this[H];return o(t),i(t),E(t),t.u.has(n)?t.D.set(n,!1):t.D.delete(n),t.i.delete(n),!0},u.clear=function(){var n=this[H];o(n),s(n).size&&(i(n),E(n),n.D=new Map,e(n.u,(function(t){n.D.set(t,!1)})),n.i.clear())},u.forEach=function(n,t){var r=this;s(this[H]).forEach((function(e,i){n.call(t,r.get(i),i,r)}))},u.get=function(n){var t=this[H];o(t);var e=s(t).get(n);if(t.R||!r(e))return e;if(e!==t.u.get(n))return e;var u=k(t.A.h,e,t);return i(t),t.i.set(n,u),u},u.keys=function(){return s(this[H]).keys()},u.values=function(){var n,t=this,r=this.keys();return(n={})[L]=function(){return t.values()},n.next=function(){var n=r.next();return n.done?n:{done:!1,value:t.get(n.value)}},n},u.entries=function(){var n,t=this,r=this.keys();return(n={})[L]=function(){return t.entries()},n.next=function(){var n=r.next();if(n.done)return n;var e=t.get(n.value);return{done:!1,value:[n.value,e]}},n},u[L]=function(){return this.entries()},n}(),c=function(){function n(n,t){return this[H]={t:3,l:t,A:t?t.A:b(),M:!1,R:!1,i:void 0,u:n,k:this,p:new Map,O:!1,I:!1},this}t(n,Set);var r=n.prototype;return Object.defineProperty(r,"size",{get:function(){return s(this[H]).size}}),r.has=function(n){var t=this[H];return o(t),t.i?!!t.i.has(n)||!(!t.p.has(n)||!t.i.has(t.p.get(n))):t.u.has(n)},r.add=function(n){var t=this[H];return o(t),this.has(n)||(u(t),E(t),t.i.add(n)),this},r.delete=function(n){if(!this.has(n))return!1;var t=this[H];return o(t),u(t),E(t),t.i.delete(n)||!!t.p.has(n)&&t.i.delete(t.p.get(n))},r.clear=function(){var n=this[H];o(n),s(n).size&&(u(n),E(n),n.i.clear())},r.values=function(){var n=this[H];return o(n),u(n),n.i.values()},r.entries=function(){var n=this[H];return o(n),u(n),n.i.entries()},r.keys=function(){return this.values()},r[L]=function(){return this.values()},r.forEach=function(n,t){for(var r=this.values(),e=r.next();!e.done;)n.call(t,e.value,e.value,this),e=r.next()},n}();_("MapSet",{$:function(n,t){return new a(n,t)},C:function(n,t){return new c(n,t)}})}var I;Object.defineProperty(exports, "__esModule", ({value:!0}));var J,N="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),W="undefined"!=typeof Map,X="undefined"!=typeof Set,q="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,B=N?Symbol.for("immer-nothing"):((I={})["immer-nothing"]=!0,I),G=N?Symbol.for("immer-draftable"):"__$immer_draftable",H=N?Symbol.for("immer-state"):"__$immer_state",L="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Q=""+Object.prototype.constructor,T="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,U=Object.getOwnPropertyDescriptors||function(n){var t={};return T(n).forEach((function(r){t[r]=Object.getOwnPropertyDescriptor(n,r)})),t},V={},Y={get:function(n,t){if(t===H)return n;var e=s(n);if(!u(e,t))return function(n,t,r){var e,i=z(t,r);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,t);var i=e[t];return n.R||!r(i)?i:i===A(n.u,t)?(R(n),n.i[t]=k(n.A.h,i,n)):i},has:function(n,t){return t in s(n)},ownKeys:function(n){return Reflect.ownKeys(s(n))},set:function(n,t,r){var e=z(s(n),t);if(null==e?void 0:e.set)return e.set.call(n.k,r),!0;if(!n.M){var i=A(s(n),t),o=null==i?void 0:i[H];if(o&&o.u===r)return n.i[t]=r,n.D[t]=!1,!0;if(a(r,i)&&(void 0!==r||u(n.u,t)))return!0;R(n),E(n)}return n.i[t]===r&&"number"!=typeof r&&(void 0!==r||t in n.i)||(n.i[t]=r,n.D[t]=!0,!0)},deleteProperty:function(n,t){return void 0!==A(n.u,t)||t in n.u?(n.D[t]=!1,R(n),E(n)):delete n.D[t],n.i&&delete n.i[t],!0},getOwnPropertyDescriptor:function(n,t){var r=s(n),e=Reflect.getOwnPropertyDescriptor(r,t);return e?{writable:!0,configurable:1!==n.t||"length"!==t,enumerable:e.enumerable,value:r[t]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.u)},setPrototypeOf:function(){n(12)}},Z={};e(Y,(function(n,t){Z[n]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Z.deleteProperty=function(n,t){return Z.set.call(this,n,t,void 0)},Z.set=function(n,t,r){return Y.set.call(this,n[0],t,r,n[0])};var nn=function(){function e(t){var e=this;this.S=q,this.K=!0,this.produce=function(t,i,u){if("function"==typeof t&&"function"!=typeof i){var o=i;i=t;var f=e;return function(n){var t=this;void 0===n&&(n=o);for(var r=arguments.length,e=Array(r>1?r-1:0),u=1;u<r;u++)e[u-1]=arguments[u];return f.produce(n,(function(n){var r;return(r=i).call.apply(r,[t,n].concat(e))}))}}var a;if("function"!=typeof i&&n(6),void 0!==u&&"function"!=typeof u&&n(7),r(t)){var c=x(e),v=k(e,t,void 0),s=!0;try{a=i(v),s=!1}finally{s?j(c):O(c)}return"undefined"!=typeof Promise&&a instanceof Promise?a.then((function(n){return m(c,u),S(n,c)}),(function(n){throw j(c),n})):(m(c,u),S(a,c))}if(!t||"object"!=typeof t){if(void 0===(a=i(t))&&(a=t),a===B&&(a=void 0),e.K&&l(a,!0),u){var p=[],d=[];y("Patches").g(t,a,p,d),u(p,d)}return a}n(21,t)},this.produceWithPatches=function(n,t){if("function"==typeof n)return function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),u=1;u<r;u++)i[u-1]=arguments[u];return e.produceWithPatches(t,(function(t){return n.apply(void 0,[t].concat(i))}))};var r,i,u=e.produce(n,t,(function(n,t){r=n,i=t}));return"undefined"!=typeof Promise&&u instanceof Promise?u.then((function(n){return[n,r,i]})):[u,r,i]},"boolean"==typeof(null==t?void 0:t.useProxies)&&this.setUseProxies(t.useProxies),"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){r(e)||n(8),t(e)&&(e=F(e));var i=x(this),u=k(this,e,void 0);return u[H].I=!0,O(i),u},i.finishDraft=function(n,t){var r=(n&&n[H]).A;return m(r,t),S(void 0,r)},i.setAutoFreeze=function(n){this.K=n},i.setUseProxies=function(t){t&&!q&&n(20),this.S=t},i.applyPatches=function(n,r){var e;for(e=r.length-1;e>=0;e--){var i=r[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(r=r.slice(e+1));var u=y("Patches").W;return t(n)?u(n,r):this.produce(n,(function(n){return u(n,r)}))},e}(),tn=new nn,rn=tn.produce,en=tn.produceWithPatches.bind(tn),un=tn.setAutoFreeze.bind(tn),on=tn.setUseProxies.bind(tn),fn=tn.applyPatches.bind(tn),an=tn.createDraft.bind(tn),cn=tn.finishDraft.bind(tn);exports.Immer=nn,exports.applyPatches=fn,exports.castDraft=function(n){return n},exports.castImmutable=function(n){return n},exports.createDraft=an,exports.current=F,exports["default"]=rn,exports.enableAllPlugins=function(){K(),C(),$()},exports.enableES5=K,exports.enableMapSet=C,exports.enablePatches=$,exports.finishDraft=cn,exports.freeze=l,exports.immerable=G,exports.isDraft=t,exports.isDraftable=r,exports.nothing=B,exports.original=function(r){return t(r)||n(23,r),r[H].u},exports.produce=rn,exports.produceWithPatches=en,exports.setAutoFreeze=un,exports.setUseProxies=on;
//# sourceMappingURL=immer.cjs.production.min.js.map


/***/ }),

/***/ 312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



if (true) {
  module.exports = __webpack_require__(41)
} else {}


/***/ }),

/***/ 57:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

"use strict";
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

"use strict";
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

"use strict";


if (true) {
  module.exports = __webpack_require__(251);
} else {}


/***/ }),

/***/ 18:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.ReactModules = exports.createApp = exports.useAppContext = exports.SlapContext = void 0;
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
function createApp(Services = {}) {
    const rootScope = new scope_1.Scope(Object.assign(Object.assign({}, Services), { Store: store_1.Store, ReactStoreAdapter: react_store_adapter_1.ReactStoreAdapter }));
    const modulesScope = rootScope.registerScope({}, { autoregister: true });
    rootScope.init(react_store_adapter_1.ReactStoreAdapter);
    return { servicesScope: rootScope, modulesScope };
}
exports.createApp = createApp;
function ReactModules(p) {
    const appScope = (0, hooks_1.useOnCreate)(() => p.app || createApp());
    return ((0, jsx_runtime_1.jsx)(exports.SlapContext.Provider, Object.assign({ value: appScope }, { children: p.children })));
}
exports.ReactModules = ReactModules;


/***/ }),

/***/ 985:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.useForceUpdate = exports.getComponentName = exports.useOnDestroy = exports.useOnCreate = void 0;
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
/**
 * Get component name from the callstack
 */
function getComponentName() {
    const stack = new Error().stack;
    const regex = / at ([A-Z]\w+) /;
    try {
        const componentName = stack.split('\n').find(message => message.match(regex)).match(regex)[1];
        return componentName;
    }
    catch (e) {
        return 'unknown_component';
    }
}
exports.getComponentName = getComponentName;
/**
 * Returns a function for force updating of the component
 */
function useForceUpdate() {
    const [, forceUpdate] = react_1.default.useReducer(x => x + 1, 0);
    return forceUpdate;
}
exports.useForceUpdate = useForceUpdate;


/***/ }),

/***/ 62:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
__exportStar(__webpack_require__(877), exports);
__exportStar(__webpack_require__(309), exports);
__exportStar(__webpack_require__(878), exports);


/***/ }),

/***/ 160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComponentView = exports.ReactStoreAdapter = void 0;
const react_dom_1 = __webpack_require__(386);
const Store_1 = __webpack_require__(607);
const injector_1 = __webpack_require__(869);
const utils_1 = __webpack_require__(225);
class ReactStoreAdapter {
    constructor() {
        this.store = (0, injector_1.inject)(Store_1.Store);
        this.components = {};
        this.watchers = {};
        this.watchersOrder = [];
        this.updateIsInProgress = false;
    }
    registerComponent(moduleView, componentId, forceUpdate, provider, storeAdapter) {
        const componentView = new ComponentView(this.store, moduleView, componentId, forceUpdate, provider, storeAdapter);
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
        this.store.events.on('onReadyToRender', () => this.updateUI());
    }
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
    constructor(store, stateView, id, forceUpdate, provider, storeAdapter) {
        this.store = store;
        this.stateView = stateView;
        this.id = id;
        this.forceUpdate = forceUpdate;
        this.provider = provider;
        this.storeAdapter = storeAdapter;
        this.isDestroyed = false;
        this.isMounted = false;
        this.isInvalidated = false;
        this.lastSnapshot = {
            affectedModules: {},
            props: null,
        };
        this.defaultShouldComponentUpdateCached = () => this.defaultShouldComponentUpdate();
        this.customShouldComponentUpdate = null;
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
    // startListeningStoreChanges(provider: Provider<any>, component: ComponentView, reactStore: ReactStoreAdapter) {
    //   const stateView = component.stateView;
    //   if (!stateView.hasSelectedProps) return;
    //
    //   component.makeSnapshot();
    //
    //   const watcherId = reactStore.createWatcher(component.id, () => {
    //
    //     if (provider.isDestroyed) return;
    //
    //     const shouldUpdate = component.shouldComponentUpdate();
    //     if (shouldUpdate) {
    //       component.setInvalidated(true);
    //     }
    //   });
    // }
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
    defaultShouldComponentUpdate() {
        var _a;
        const prevSnapshot = this.lastSnapshot;
        const prevAffectedModules = Object.keys(prevSnapshot.affectedModules);
        let modulesChanged = false;
        for (const moduleName of prevAffectedModules) {
            if (prevSnapshot.affectedModules[moduleName] !== ((_a = this.store.modulesMetadata[moduleName]) === null || _a === void 0 ? void 0 : _a.rev)) {
                modulesChanged = true;
                break;
            }
        }
        if (!modulesChanged)
            return false;
        const newSnapshot = this.makeSnapshot();
        if ((0, utils_1.isSimilar)(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
            // no modules changed, do not call compare props
            return false;
        }
        if (!(0, utils_1.isSimilar)(prevSnapshot.props, newSnapshot.props)) {
            return true;
        }
        return false;
    }
    shouldComponentUpdate() {
        if (this.customShouldComponentUpdate) {
            return this.customShouldComponentUpdate(this.defaultShouldComponentUpdateCached);
        }
        return this.defaultShouldComponentUpdate();
    }
    setShouldComponentUpdate(shouldUpdateCb) {
        this.customShouldComponentUpdate = shouldUpdateCb;
    }
}
exports.ComponentView = ComponentView;


/***/ }),

/***/ 877:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useComponentView = void 0;
const react_1 = __webpack_require__(156);
const hooks_1 = __webpack_require__(985);
const scope_1 = __webpack_require__(527);
const store_1 = __webpack_require__(338);
const react_store_adapter_1 = __webpack_require__(160);
const useModule_1 = __webpack_require__(309);
function useComponentView(module) {
    const forceUpdate = (0, hooks_1.useForceUpdate)();
    const { componentId, reactStore, component, provider, } = (0, hooks_1.useOnCreate)(() => {
        const provider = (0, scope_1.getInstanceMetadata)(module).provider;
        const reactStore = provider.scope.resolve(react_store_adapter_1.ReactStoreAdapter);
        const store = provider.scope.resolve(store_1.Store);
        const componentName = (0, hooks_1.getComponentName)();
        const componentId = `${componentName}__${(0, scope_1.generateId)()}`;
        let moduleView = (0, store_1.createModuleView)(module);
        const parentModuleView = provider.getMetadata('parentModuleView');
        if (parentModuleView) {
            moduleView = moduleView.mergeView(parentModuleView);
        }
        const component = reactStore.registerComponent(moduleView, componentId, forceUpdate, provider, reactStore);
        function extend(newPropsFactory) {
            const newId = componentId + '_extended';
            const newProvider = provider.resolveChildProvider(() => newPropsFactory(moduleView.props), newId);
            newProvider.setMetadata('parentModuleView', moduleView); // TODO remove metadata
            store.setModuleContext(newId, provider.childScope);
            const result = (0, useModule_1.useModule)(newId);
            store.resetModuleContext(newId);
            return result;
        }
        moduleView.defineProp({
            name: 'extend',
            getValue: () => extend,
        });
        moduleView.defineProp({
            name: 'componentView',
            getValue: () => component,
        });
        return {
            componentId, component, moduleView, reactStore, provider,
        };
    });
    (0, hooks_1.useOnDestroy)(() => {
        reactStore.destroyComponent(componentId);
    });
    (0, react_1.useLayoutEffect)(() => {
        // startListeningStoreChanges(provider, component, reactStore);
        // component.startListeningStoreChanges(provider, component, reactStore);
        const stateView = component.stateView;
        if (!stateView.hasSelectedProps)
            return;
        component.makeSnapshot();
        const watcherId = reactStore.createWatcher(component.id, () => {
            if (provider.isDestroyed)
                return;
            const shouldUpdate = component.shouldComponentUpdate();
            if (shouldUpdate) {
                component.setInvalidated(true);
            }
        });
        return () => {
            reactStore.removeWatcher(component.id);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        component.setMounted();
    });
    return component.stateView.proxy;
}
exports.useComponentView = useComponentView;
function startListeningStoreChanges(provider, component, reactStore) {
    const stateView = component.stateView;
    if (!stateView.hasSelectedProps)
        return;
    component.makeSnapshot();
    const watcherId = reactStore.createWatcher(component.id, () => {
        if (provider.isDestroyed)
            return;
        const shouldUpdate = component.shouldComponentUpdate();
        if (shouldUpdate) {
            component.setInvalidated(true);
        }
    });
}


/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModule = void 0;
const useModuleInstance_1 = __webpack_require__(878);
const useComponentView_1 = __webpack_require__(877);
function useModule(locator, initProps = null, moduleName = '') {
    const module = (0, useModuleInstance_1.useModuleInstance)(locator, initProps, moduleName);
    return (0, useComponentView_1.useComponentView)(module);
}
exports.useModule = useModule;


/***/ }),

/***/ 878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModuleInstance = void 0;
const react_1 = __webpack_require__(156);
const hooks_1 = __webpack_require__(985);
const ReactModules_1 = __webpack_require__(686);
const Store_1 = __webpack_require__(607);
/**
 * Resolve module instance for a component
 */
function useModuleInstance(locator, initProps = null, name = '') {
    const { modulesScope, servicesScope } = (0, ReactModules_1.useAppContext)();
    const { instance, moduleName, scope, isRoot, shouldInitInNewScope, isService, store, } = (0, hooks_1.useOnCreate)(() => {
        var _a;
        let moduleName = name || (typeof locator === 'string' ? locator : locator.name);
        const store = modulesScope.resolve(Store_1.Store);
        const shouldInitInNewScope = !!initProps;
        let scope;
        let isRoot = false;
        let isService = false;
        if (shouldInitInNewScope) {
            scope = modulesScope.registerScope();
            isRoot = true;
            const provider = scope.register(locator, moduleName);
            moduleName = provider.name;
            const constructorArgs = Array.isArray(initProps) ? initProps : [];
            const instance = scope.init(moduleName, ...constructorArgs);
        }
        else {
            scope = (_a = store.currentContext[moduleName]) !== null && _a !== void 0 ? _a : modulesScope;
            const provider = scope.isRegistered(moduleName) ? scope.resolveProvider(moduleName) : scope.register(locator, moduleName);
            isService = servicesScope.id === provider.scope.id;
            moduleName = name || provider.name;
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
    store.setModuleContext(moduleName, scope);
    (0, react_1.useEffect)(() => {
        isRoot && store.resetModuleContext(moduleName);
    });
    // unregister the component from the module onDestroy
    (0, hooks_1.useOnDestroy)(() => {
        if (isService || !isRoot)
            return;
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

/***/ 158:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// implements a `Flatten` type helper
// https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
__exportStar(__webpack_require__(986), exports);
__exportStar(__webpack_require__(158), exports);


/***/ }),

/***/ 869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectProvider = exports.injectScope = exports.injectExposed = exports.inject = void 0;
const scope_1 = __webpack_require__(521);
function inject(ModuleClass, options) {
    const provider = injectProvider();
    const module = provider.injectModule(ModuleClass, options);
    return module;
}
exports.inject = inject;
/**
 * Inject module and expose its props to a component's selector
 */
function injectExposed(ModuleClass) {
    return inject(ModuleClass, { isExposed: true });
}
exports.injectExposed = injectExposed;
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ 370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moduleSystemProps = exports.getInstanceMetadata = exports.createInstanceMetadata = exports.Provider = void 0;
const nanoevents_1 = __webpack_require__(111);
const is_plain_object_1 = __webpack_require__(57);
const utils_1 = __webpack_require__(986);
/**
 * Providers initialize modules and keeps their metadata
 */
class Provider {
    constructor(scope, creator, name = '', options = {}) {
        this.scope = scope;
        this.creator = creator;
        this.name = name;
        this.options = options;
        /**
         * Keeps module's instance
         */
        this.instance = null;
        /**
         * keeps user's metadata
         */
        this.metadata = {};
        /**
         * true if instance is initialized and added to the Scope
         */
        this.isInited = false;
        /**
         * true if instance is initialized and added to the Scope
         */
        this.isDestroyed = false;
        /**
         * Keeps information about all injected modules
         */
        this.injectedModules = {};
        /**
         * Keeps information about all child modules.
         * Child modules are kind of injected modules with the same lifecycle of the parent module
         */
        this.childModules = {};
        /**
         * Keeps a child scope if the provider has created one
         */
        this.childScope = null;
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
    /**
     * Creates a module instance
     * @param args
     */
    createInstance(args) {
        const instance = this.factory(args);
        this.instance = instance;
        createInstanceMetadata(instance, this);
        return instance;
    }
    /**
     * Init all injected modules
     */
    mountModule() {
        Object.keys(this.injectedModules).forEach(injectedName => {
            const childModuleProvider = getInstanceMetadata(this.injectedModules[injectedName].instance).provider;
            if (!childModuleProvider.isInited)
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
        instance.destroy && instance.destroy();
        // destroy child modules
        (_a = this.childScope) === null || _a === void 0 ? void 0 : _a.dispose();
        this.childModules = {};
        this.isDestroyed = true;
        this.instance = null;
        this.isInited = false;
    }
    get instanceId() {
        return getInstanceMetadata(this.instance).id;
    }
    /**
     * Returns a child scope. Creates a new one if not exist
     */
    resolveChildScope() {
        if (!this.childScope)
            this.childScope = this.scope.createChildScope();
        return this.childScope;
    }
    /**
     * Resolves a provider for the module in the child scope
     */
    resolveChildProvider(ModuleCreator, name) {
        const childScope = this.resolveChildScope();
        if (!childScope.isRegistered(name)) {
            childScope.register(ModuleCreator, name);
        }
        return childScope.resolveProvider(name);
    }
    /**
     * Inject a module into the current module
     */
    injectModule(ModuleLocator, options = {}) {
        const module = this.scope.resolve(ModuleLocator);
        const moduleProvider = getInstanceMetadata(module).provider;
        this.injectedModules[moduleProvider.name] = { instance: module, options };
        const returnValue = module.exportInjectorValue ? module.exportInjectorValue() : module;
        return returnValue; // TODO: resolve injected value
    }
    /**
     * Inject a child module into the current module
     */
    injectChildModule(ModuleCreator, ...args) {
        const childScope = this.resolveChildScope();
        const name = `${this.id}__child__${ModuleCreator.name || ''}_${(0, utils_1.generateId)()}`;
        childScope.register(ModuleCreator, name, { parentProvider: this });
        const childModule = childScope.init(name, ...args);
        this.childModules[name] = childModule;
        this.injectedModules[name] = { instance: childModule, options: {} };
        const returnValue = childModule.exportInjectorValue ? childModule.exportInjectorValue() : childModule;
        return returnValue;
    }
}
exports.Provider = Provider;
/**
 * Attaches a metadata for the module instance
 */
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
exports.moduleSystemProps = {
    __provider: true,
    __instanceId: true,
};


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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
        /**
         * Keeps all registered providers
         */
        this.providers = {};
        /**
         * Keeps all registered child scopes
         */
        this.childScopes = {};
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
        this.events.emit('onModuleUnregister', provider.id);
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
        let instance;
        unmountedModulesCount++;
        try {
            instance = this.create(locator, ...args);
        }
        finally {
            unmountedModulesCount--;
        }
        if (!unmountedModulesCount)
            provider.mountModule();
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
        return instance;
    }
    createChildScope(dependencies, settings) {
        return new Scope(dependencies, Object.assign(Object.assign({}, settings), { parentScope: this }));
    }
    /**
     * Register a child scope
     */
    registerScope(dependencies, settings) {
        const scope = this.createChildScope({}, settings);
        this.childScopes[scope.id] = scope;
        scope.events = this.events;
        dependencies && scope.registerMany(dependencies);
        return scope;
    }
    /**
     * Unregister a child scope
     */
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
    /**
     * Destroy current scope and all providers
     */
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
    /**
     * Could be usefull for debugging
     */
    getScheme() {
        return {
            id: this.id,
            registry: this.providers,
            parentScope: this.parent ? this.parent.getScheme() : null,
        };
    }
    /**
     * Returns true if it doesn't have parent scopes
     */
    get isRoot() {
        return !this.parent;
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

/***/ 986:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isClass = exports.capitalize = exports.defineSetter = exports.defineGetter = exports.forEach = exports.generateId = void 0;
let idCounter = 1;
function generateId() {
    return (idCounter++).toString();
}
exports.generateId = generateId;
/**
 * Loop though an object
 */
function forEach(dict, cb) {
    Object.keys(dict).forEach(propName => {
        cb(dict[propName], propName);
    });
}
exports.forEach = forEach;
/**
 * Register a getter on object
 */
function defineGetter(target, methodName, getter, descriptor) {
    var _a, _b;
    Object.defineProperty(target, methodName, {
        configurable: (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable) !== null && _a !== void 0 ? _a : true,
        enumerable: (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.enumerable) !== null && _b !== void 0 ? _b : true,
        get: getter,
    });
}
exports.defineGetter = defineGetter;
/**
 * Register a setter on object
 */
function defineSetter(target, methodName, setter, descriptor) {
    var _a, _b;
    Object.defineProperty(target, methodName, {
        configurable: (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable) !== null && _a !== void 0 ? _a : true,
        enumerable: (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.enumerable) !== null && _b !== void 0 ? _b : true,
        set: setter,
    });
}
exports.defineSetter = defineSetter;
/**
 * Capitalize the first letter
 */
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateView = void 0;
const scope_1 = __webpack_require__(527);
/**
 * Components use StateView to select reactive state and methods from modules
 * StateView keeps information for components about reactive and non-reactive data
 * It saves data snapshots for components and allow to compare them to detect changes
 */
class StateView {
    constructor() {
        this.props = {};
        this.descriptors = {};
        this.selectedDescriptors = {};
        this.hasReactiveProps = false;
        this.hasSelectedProps = false;
        this.hasWildcardProps = false;
        this.wildcardPropCreator = null;
        // create Proxy that should listen all reactive props that component requested during rendering
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
    /**
     * Register a new property in the StateView instance
     */
    defineProp(descriptorParams) {
        const descriptor = Object.assign({ configurable: true, enumerable: true, reactive: false, getRev: descriptorParams.getValue, stateView: null, dynamic: false, description: '' }, descriptorParams);
        this.descriptors[descriptor.name] = descriptor;
        if (descriptor.reactive)
            this.hasReactiveProps = true;
        (0, scope_1.defineGetter)(this.props, descriptor.name, () => descriptor.getValue());
    }
    /**
     * Defile a wildcard property
     * The wildcard property could be accessible without registration with `defineProp` method
     */
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
    /**
     * Create a snapshot with reactive data based on reactive props selected in a component
     */
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
    // select<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView {
    //   return newViewFactory(this.props, this);
    // }
    clone() {
        const clone = new StateView();
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


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateController = exports.Store = void 0;
const immer_1 = __importDefault(__webpack_require__(312));
const nanoevents_1 = __webpack_require__(111);
const scope_1 = __webpack_require__(527);
const parse_config_1 = __webpack_require__(890);
const utils_1 = __webpack_require__(225);
/**
 * A centralised framework-agnostic store.
 * Data in this store is split by named states
 * Each module could inject multiple named states.
 * For better performance keep only reactive data in the store.
 *
 * All React related code should be handled in ReactAdapter
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
        const controller = new StateController(this, moduleName, config);
        this.events.emit('onModuleCreated', controller);
        return controller;
    }
    dispatchMutation(mutation) {
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
    destroyModule(moduleName) {
        const metadata = this.modulesMetadata[moduleName];
        metadata.subscriptions.forEach(unsub => unsub());
        delete this.rootState[moduleName];
        delete this.modulesMetadata[moduleName];
        this.events.emit('onModuleDestroyed', moduleName);
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
/**
 * Controls a single named state
 */
class StateController {
    constructor(store, __moduleName, config) {
        this.store = store;
        this.__moduleName = __moduleName;
        this.draftState = null;
        const defaultState = config.state;
        store.rootState[__moduleName] = Object.assign({}, defaultState);
        // create metadata
        const controller = this;
        const getters = {};
        const metadata = {
            moduleName: __moduleName,
            config,
            controller,
            getters,
            subscriptions: [],
            isInitialized: false,
            rev: 0,
        };
        store.modulesMetadata[__moduleName] = metadata;
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
        // create simple getters and setters from the state config
        Object.keys(config.getters).forEach(propName => {
            const getter = () => config.getters[propName].get.apply(controller);
            (0, scope_1.defineGetter)(controller, propName, getter);
            (0, scope_1.defineGetter)(getters, propName, getter);
        });
        // create getter methods
        Object.keys(config.getterMethods).forEach(propName => {
            (0, scope_1.defineGetter)(controller, propName, () => (...args) => config.getterMethods[propName].apply(controller, args));
        });
        // create auto-generated mutations
        Object.keys(defaultState).forEach(propertyName => {
            const mutationName = `set${(0, scope_1.capitalize)(propertyName)}`;
            if (config.mutations[mutationName])
                return;
            const mutationMethod = (propVal) => controller[propertyName] = propVal;
            controller.registerMutation(mutationName, mutationMethod);
            // generate array helpers
            if (!Array.isArray(defaultState[propertyName]))
                return;
            // generate a "push" mutation
            const pushMutationName = `push${(0, scope_1.capitalize)(propertyName)}`;
            if (!config.mutations[pushMutationName]) {
                controller.registerMutation(pushMutationName, (newItem) => controller[propertyName].push(newItem));
            }
            // generate a "remove" mutation
            const removeMutation = `remove${(0, scope_1.capitalize)(propertyName)}`;
            if (!config.mutations[removeMutation]) {
                controller.registerMutation(removeMutation, (searchQuery) => {
                    (0, utils_1.removeItems)(controller[propertyName], searchQuery);
                });
            }
            // generate an "update" mutation
            const updateMutation = `update${(0, scope_1.capitalize)(propertyName)}`;
            if (!config.mutations[updateMutation]) {
                controller.registerMutation(updateMutation, (searchQuery, updateFn) => {
                    (0, utils_1.updateItems)(controller[propertyName], searchQuery, updateFn);
                });
            }
            // create a find getter
            const findGetterName = `find${(0, scope_1.capitalize)(propertyName)}`;
            if (!config.getterMethods[findGetterName]) {
                (0, scope_1.defineGetter)(controller, findGetterName, () => (searchQuery) => {
                    return (0, utils_1.find)(controller[propertyName], searchQuery);
                });
            }
        });
        // create default mutations
        this.registerDefaultMutations();
        // create other mutations
        Object.keys(config.mutations).forEach(propName => {
            this.registerMutation(propName, config.mutations[propName]);
        });
        // create change events for each getter
        Object.keys(this.getters).forEach(getterName => {
            const eventName = `on${(0, scope_1.capitalize)(getterName)}Change`;
            this[eventName] = (cb, isEqual = utils_1.isSimilar) => {
                let prevVal = this.getters[getterName];
                const unsubscribe = this.store.events.on('onMutation', () => {
                    const newVal = this.getters[getterName];
                    if (isEqual(newVal, prevVal))
                        return;
                    cb(newVal, prevVal);
                    prevVal = newVal;
                });
                this.getMetadata().subscriptions.push(unsubscribe);
                return unsubscribe;
            };
        });
    }
    finishInitialization() {
        // use immer to lock an immutable state
        this.getMetadata().isInitialized = true;
        this.store.rootState[this.__moduleName] = (0, immer_1.default)(this.store.rootState[this.__moduleName], () => { });
    }
    /**
     * Register a named mutation in the store.
     */
    registerMutation(mutationName, mutationMethod, mutationThisContext) {
        const controller = this;
        const { store, __moduleName } = controller;
        const moduleName = __moduleName;
        const mutationContext = mutationThisContext || controller;
        controller.getMetadata().config.mutations[mutationName] = mutationMethod;
        // override the original Module method to dispatch mutations
        controller[mutationName] = function (...args) {
            // if this method was called from another mutation
            // we don't need to dispatch a new mutation again
            // just call the original method
            if (controller.draftState) {
                return mutationMethod.apply(mutationContext, args);
            }
            const mutation = {
                id: Number((0, scope_1.generateId)()),
                payload: args,
                moduleName,
                mutationName,
                mutationContext,
            };
            store.dispatchMutation(mutation);
        };
    }
    /**
     * Execute mutation
     * @param mutation a mutation function or Mutation object for a pre-registered named mutation
     */
    mutate(mutation) {
        const moduleName = this.__moduleName;
        const state = this.store.rootState[moduleName];
        const mutationIsFunction = typeof mutation === 'function';
        const metadata = this.getMetadata();
        if (!metadata)
            return; // state is destroyed
        if (!metadata.isInitialized) {
            if (mutationIsFunction) {
                mutation(this);
            }
            else {
                const mutationObj = mutation;
                const thisContext = mutationObj.mutationContext || this;
                metadata.config.mutations[mutationObj.mutationName].apply(thisContext, mutationObj.payload);
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
                const thisContext = mutationObj.mutationContext || this;
                metadata.config.mutations[mutationObj.mutationName].apply(thisContext, mutationObj.payload);
            });
        }
        catch (e) {
            console.error('mutation failed', e);
        }
        finally {
            this.store.pendingMutations--;
            this.getMetadata().rev++;
            this.draftState = null;
        }
        this.store.events.emit('onMutation', mutation, moduleName);
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
        const moduleName = this.__moduleName;
        if (store.recordingAccessors) {
            store.affectedModules[moduleName] = this.getMetadata().rev;
        }
        return store.rootState[moduleName];
    }
    getMetadata() {
        return this.store.modulesMetadata[this.__moduleName];
    }
    // getSnapshot() {
    //   const keys = Object.keys(this.store.rootState[this.__moduleName]);
    //   const snapshot = {};
    //   const state = this.state;
    //   keys.forEach(key => snapshot[key] = )
    //   return this.getMetadata().config.
    // }
    get getters() {
        return this.getMetadata().getters;
    }
    waitFor(cb, waitOptions) {
        let isFound = cb();
        if (isFound)
            return;
        return new Promise((resolve, reject) => {
            const unsubscribe = this.store.events.on('onMutation', () => {
                isFound = cb();
                if (!isFound)
                    return;
                unsubscribe();
                resolve();
            });
            this.getMetadata().subscriptions.push(unsubscribe);
            if (waitOptions === null || waitOptions === void 0 ? void 0 : waitOptions.timeout) {
                setTimeout(() => {
                    if (isFound)
                        return;
                    unsubscribe();
                    reject(new Error('Store waiting timeout'));
                }, waitOptions.timeout);
            }
        });
    }
}
exports.StateController = StateController;


/***/ }),

/***/ 338:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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

"use strict";

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

/***/ 502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createModuleView = void 0;
const StateView_1 = __webpack_require__(32);
const utils_1 = __webpack_require__(225);
const scope_1 = __webpack_require__(527);
/**
 * Create a StateView instance and register props from the given module in that StateView
 * @param module
 */
function createModuleView(module) {
    let view = new StateView_1.StateView();
    const injectedProps = {};
    const moduleProvider = (0, scope_1.getInstanceMetadata)(module).provider;
    // find and register props for injected modules
    (0, utils_1.traverse)(module, (propName, descr) => {
        var _a;
        if (scope_1.moduleSystemProps[propName])
            return;
        if (descr.get)
            return;
        // consider that the property contains an injectable module if it has a "__provider" value
        const provider = (_a = descr.value) === null || _a === void 0 ? void 0 : _a.__provider;
        if (!(provider instanceof scope_1.Provider))
            return;
        if (provider) {
            // mark the prop as injectable
            injectedProps[propName] = true;
            // take the module instance
            const injectedModule = provider.instance;
            // take the value that should be injected as property for the parent module
            const injectedValue = injectedModule.exportInjectorValue ? injectedModule.exportInjectorValue() : injectedModule;
            // take the value that should be injected as property for the component's selector
            const selectorValue = injectedModule.exportSelectorValue && injectedModule.exportSelectorValue();
            // take other(extra) props we should export to the component's selector
            const selectorExtraValues = injectedModule.exportSelectorExtraValues && injectedModule.exportSelectorExtraValues();
            const selfProps = selectorValue || injectedValue;
            // register extra props in the StateView
            const extraProps = selectorExtraValues;
            if (extraProps) {
                const extraPropsView = extraProps;
                (0, scope_1.forEach)(extraPropsView.descriptors, (descriptor, p) => {
                    if (!(descriptor.name in injectedModule))
                        view.defineProp(descriptor);
                });
                view = view.mergeView(extraProps);
            }
            // register exposed props
            const injectorOptions = moduleProvider.injectedModules[provider.name].options;
            if ((injectorOptions === null || injectorOptions === void 0 ? void 0 : injectorOptions.isExposed) && selfProps) {
                const exposedProps = createModuleView(selfProps);
                (0, scope_1.forEach)(exposedProps.descriptors, (descriptor, p) => {
                    if (!(descriptor.name in injectedModule))
                        view.defineProp(descriptor);
                });
                view = view.mergeView(exposedProps);
            }
            // register extra injected value in the StateView
            if (selfProps) {
                view.defineProp({
                    description: 'InjectorView',
                    name: propName,
                    reactive: true,
                    stateView: selfProps instanceof StateView_1.StateView ? selfProps : null,
                    getValue() {
                        return injectedValue;
                    },
                });
            }
        }
    });
    // register other module props
    (0, utils_1.traverse)(module, (propName, descr) => {
        if (injectedProps[propName])
            return;
        if (scope_1.moduleSystemProps[propName])
            return;
        // register getters/computed values
        // getters are reactive and will be recalculated when sate changed
        if (descr.get) {
            view.defineProp({
                description: 'ModuleGetter',
                reactive: true,
                name: propName,
                getValue: () => module[propName],
            });
            return;
        }
        // register methods
        if (typeof descr.value === 'function') {
            view.defineProp({
                description: 'ModuleMethod',
                reactive: false,
                name: propName,
                getValue: () => descr.value.bind(module),
            });
            return;
        }
        // register simple module variables
        // these variables are not reactive and changing them will not re-render components
        // these variables could be used instead React 'refs'
        view.defineProp({
            description: 'ModuleVariable',
            reactive: false,
            name: propName,
            getValue: () => module[propName],
        });
    });
    return view;
}
exports.createModuleView = createModuleView;


/***/ }),

/***/ 135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createStateView = void 0;
const StateView_1 = __webpack_require__(32);
const utils_1 = __webpack_require__(225);
/**
 * Create a StateView object for a StateController
 * The StateView object provides data that could be selected in components.
 * These data could be reactive, non-reactive and includes mutations and functions
 */
function createStateView(controller) {
    const config = controller.getMetadata().config;
    const view = new StateView_1.StateView();
    // define state revision getter
    // state revisions helps to compare 2 snapshots from the same state source without expensive state traversing
    view.defineProp({
        description: 'StateRev',
        name: 'getRev',
        reactive: true,
        getValue: () => {
            // eslint-disable-next-line no-unused-expressions
            controller.state; // read as reactive
            return controller.getMetadata().rev;
        },
    });
    // define a "state" getter that links state to itself
    (0, utils_1.traverse)(config.state, stateKey => {
        view.defineProp({
            description: 'StateProp',
            name: stateKey,
            reactive: true,
            getValue: () => controller[stateKey],
        });
    });
    // expose mutations for a component
    (0, utils_1.traverse)(config.mutations, stateKey => {
        view.defineProp({
            description: 'StateMutation',
            name: stateKey,
            reactive: false,
            getValue: () => controller[stateKey],
        });
    });
    // expose state getters(computed values) for a component
    (0, utils_1.traverse)(config.getters, (propName) => {
        view.defineProp({
            description: 'StateGetter',
            name: propName,
            reactive: true,
            getValue: () => controller[propName],
        });
    });
    // expose state getter methods
    (0, utils_1.traverse)(config.getterMethods, (propName) => {
        view.defineProp({
            description: 'StateGetterMethod',
            name: propName,
            reactive: false,
            getValue: () => controller[propName],
        });
    });
    return view;
}
exports.createStateView = createStateView;


/***/ }),

/***/ 837:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(502), exports);
__exportStar(__webpack_require__(135), exports);
__exportStar(__webpack_require__(835), exports);
__exportStar(__webpack_require__(334), exports);
__exportStar(__webpack_require__(746), exports);
__exportStar(__webpack_require__(300), exports);
__exportStar(__webpack_require__(668), exports);


/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectChild = void 0;
const injector_1 = __webpack_require__(869);
/**
 * Inject module as a child module
 * The child module will be initialized and destroyed with a parent module
 */
function injectChild(Module, ...args) {
    const provider = (0, injector_1.injectProvider)();
    const injectedValue = provider.injectChildModule(Module, ...args);
    return injectedValue;
}
exports.injectChild = injectChild;


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormBindingModule = exports.createFormBinding = exports.injectFormBinding = void 0;
const StateView_1 = __webpack_require__(32);
const inject_child_1 = __webpack_require__(835);
/**
 * Injects an stateful module that helps to link a reactive data with form input components
 */
function injectFormBinding(stateGetter, stateSetter, extraPropsGenerator) {
    return (0, inject_child_1.injectChild)(FormBindingModule, stateGetter, stateSetter, extraPropsGenerator);
}
exports.injectFormBinding = injectFormBinding;
/**
 * Creates a StateView for a component that helps to link a reactive data with form input components
 */
function createFormBinding(stateGetter, stateSetter, extraPropsGenerator) {
    function getState() {
        if (typeof stateGetter === 'function')
            return stateGetter();
        return stateGetter;
    }
    const stateView = new StateView_1.StateView();
    stateView.defineProp({
        description: 'FormStateRev',
        name: 'getRev',
        getValue: () => (Object.assign({}, getState())),
    });
    stateView.defineWildcardProp(propName => {
        stateView.defineProp({
            description: 'FormInputBinding',
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
    exportSelectorValue() {
        return this.formBinding;
    }
}
exports.FormBindingModule = FormBindingModule;


/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getQueryOptionsFromArgs = exports.QueryModule = exports.QueryStateConfig = exports.injectQuery = void 0;
const scope_1 = __webpack_require__(527);
const StateView_1 = __webpack_require__(32);
const inject_state_1 = __webpack_require__(300);
const inject_watch_1 = __webpack_require__(668);
const inject_child_1 = __webpack_require__(835);
const createStateView_1 = __webpack_require__(135);
/**
 * Injects DataQuery
 * Inspired by https://react-query.tanstack.com/reference/useQuery
 */
function injectQuery(...args) {
    return (0, inject_child_1.injectChild)(QueryModule, ...args);
}
exports.injectQuery = injectQuery;
/**
 * Describes a reactive state for DataQuery
 */
class QueryStateConfig {
    constructor() {
        this.state = {
            /**
             * current status of the DataQuery
             */
            status: 'idle',
            /**
             * keeps fetched data on success
             */
            data: null,
            /**
             * keeps error on fail
             */
            error: null,
            // TODO: remove from state
            params: null,
        };
    }
    // define state mutations
    setData(data) {
        this.state.status = 'success';
        this.state.data = data;
    }
    setError(error) {
        this.state.status = 'error';
        this.state.error = error;
    }
    // define state getters
    get isLoading() {
        return this.state.status === 'loading';
    }
}
exports.QueryStateConfig = QueryStateConfig;
/**
 * A stateful module for working with DataQueries
 * Inspired by https://react-query.tanstack.com/
 */
class QueryModule {
    constructor(...args) {
        // create a reactive state for this module
        this.state = (0, inject_state_1.injectState)(QueryStateConfig);
        this.provider = (0, scope_1.injectProvider)();
        // re-fetch query if params changed
        this.watcher = (0, inject_watch_1.injectWatch)(() => this.getParams(), this.refetch);
        // keep current fetching promise to avoid redundant fetches
        this.fetchingPromise = null;
        this.promiseId = '';
        // if enabled=false then no callbacks will be executed when fetching finished
        this.enabled = true;
        this.isInitialFetch = true;
        // create initial options based on passed args
        const computedOptions = getQueryOptionsFromArgs(args);
        const options = Object.assign({ enabled: true, params: null, initialData: [], getParams: null, fetch: () => { }, onSuccess: () => { }, onError: () => { } }, computedOptions);
        this.options = options;
        this.enabled = !!options.enabled;
    }
    init() {
        // define methods available in components
        const queryMethods = new StateView_1.StateView();
        queryMethods.defineProp({
            description: 'QueryMethod',
            name: 'refetch',
            reactive: false,
            getValue: () => {
                return () => this.refetch();
            },
        });
        const stateView = (0, createStateView_1.createStateView)(this.state);
        this.queryView = stateView.mergeView(queryMethods);
        const data = this.options.initialData;
        this.state.update({
            params: this.getParams(),
            data,
        });
        this.exec();
    }
    /**
     * Start fetching if not started yet and return fetching promise
     */
    exec() {
        if (this.fetchingPromise)
            return this.fetchingPromise;
        return this.fetch();
    }
    /**
     * Start fetching
     * You most likely should call ".exec()" instead this method to avoid redundant fetching
     */
    fetch() {
        let fetchResult;
        if (this.thisContext) {
            fetchResult = this.options.fetch.call(this.thisContext, this.getParams());
        }
        else {
            fetchResult = this.options.fetch(this.getParams());
        }
        if (fetchResult === null || fetchResult === void 0 ? void 0 : fetchResult.then) {
            if (this.isInitialFetch) {
                this.state.setStatus('loading');
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
    /**
     * Returns "this" context for the "getParams()" callback
     * QueryModule usually injected as a child module via `injectQuery`
     * So take "this" context of the parent module
     */
    get thisContext() {
        const parentProvider = this.provider.options.parentProvider;
        if (parentProvider) {
            return parentProvider.instance;
        }
    }
    /**
     * Call the "getParams" callback
     * Query will be re-fetched if params changed
     */
    getParams() {
        if (!this.options.getParams)
            return null;
        if (this.thisContext) {
            return this.options.getParams.call(this.thisContext);
        }
        return this.options.getParams();
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
    destroy() {
        // prevent unfinished fetching
        this.setEnabled(false);
    }
    /**
     * Export data and methods for a component selector
     */
    exportSelectorValue() {
        return this.queryView;
    }
}
exports.QueryModule = QueryModule;
/**
 * converts Query constructor agrs to QueryOptions
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
        if (typeof args[0] === 'function') {
            return {
                fetch: args[0],
                getParams: args[1],
            };
        }
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mutation = exports.StatefulModule = exports.injectState = void 0;
const scope_1 = __webpack_require__(527);
const Store_1 = __webpack_require__(607);
const inject_child_1 = __webpack_require__(835);
const inject_form_1 = __webpack_require__(334);
const createStateView_1 = __webpack_require__(135);
/**
 * Injects a reactive stateful module
 * Stateful modules helps to keep UI updated with the state
 * @param configCreator state config. Can be Object or Class
 * @param allowMutationDecorators  methods marked with the @mutation() in the parent module will be registered as mutations
 * @param onCreate callback that should be called when state is registered in the state manager
 */
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
            throw new Error('StatefulModule module should be injected');
        }
        // register methods marked with the @mutation() decorators
        if (this.allowMutationDecorators && parentProvider) {
            const parentModule = parentProvider.instance;
            const mutations = ((_b = (_a = parentProvider.creator) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b.__mutations) || [];
            mutations.forEach(mutationName => {
                const mutation = parentModule[mutationName];
                this.stateController.registerMutation(mutationName, mutation, parentModule);
                parentModule[mutationName] = (...args) => this.stateController[mutationName](...args);
            });
            parentProvider.events.on('onAfterInit', () => {
                this.stateController.finishInitialization();
            });
        }
        this.stateView = (0, createStateView_1.createStateView)(this.stateController);
        this.stateView.defineProp({
            description: 'StateFormBinding',
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
    destroy() {
        this.store.destroyModule(this.moduleName);
    }
    exportInjectorValue() {
        return this.stateController;
    }
    exportSelectorValue() {
        return this.stateView;
    }
    exportSelectorExtraValues() {
        return this.stateView;
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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WatchModule = exports.injectWatch = void 0;
const scope_1 = __webpack_require__(527);
const Store_1 = __webpack_require__(607);
const utils_1 = __webpack_require__(225);
const inject_child_1 = __webpack_require__(835);
/**
 * Creates a watcher that call a callback on state change
 * @param expression a function that returns a piece of state to compare. The source of state should be reactive
 * @param onChange call this callback if expression result changed
 * @param isEqual a comparison function
 */
function injectWatch(expression, onChange, isEqual) {
    return (0, inject_child_1.injectChild)(WatchModule, expression, onChange, isEqual);
}
exports.injectWatch = injectWatch;
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
    destroy() {
        this.unwatch && this.unwatch();
    }
}
exports.WatchModule = WatchModule;


/***/ }),

/***/ 567:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUpdateFunction = exports.getSearchFunction = exports.find = exports.updateItems = exports.removeItems = void 0;
function removeItems(arr, query) {
    const searchFn = getSearchFunction(arr, query);
    let i = arr.length;
    while (i--) {
        if (searchFn(arr[i]))
            arr.splice(i, 1);
    }
}
exports.removeItems = removeItems;
function updateItems(arr, query, updateQuery) {
    const searchFn = getSearchFunction(arr, query);
    const updateFn = getUpdateFunction(updateQuery);
    for (const item of arr) {
        if (searchFn(item))
            updateFn(item);
    }
}
exports.updateItems = updateItems;
function find(arr, query) {
    const searchFn = getSearchFunction(arr, query);
    return arr.find(searchFn);
}
exports.find = find;
function getSearchFunction(arr, query) {
    if (typeof query === 'function')
        return query;
    if (typeof query === 'object') {
        const objQuery = query;
        const keys = Object.keys(objQuery);
        return (item) => {
            for (const key of keys) {
                if (objQuery[key] !== item[key])
                    return false;
            }
            return true;
        };
    }
    return (item) => (item === null || item === void 0 ? void 0 : item.id) === query;
}
exports.getSearchFunction = getSearchFunction;
function getUpdateFunction(query) {
    if (typeof query === 'function')
        return query;
    const patch = query;
    return (item) => {
        Object.assign(item, patch);
    };
}
exports.getUpdateFunction = getUpdateFunction;


/***/ }),

/***/ 225:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
__exportStar(__webpack_require__(567), exports);


/***/ }),

/***/ 233:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

"use strict";

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

"use strict";

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

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__156__;

/***/ }),

/***/ 386:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__386__;

/***/ }),

/***/ 111:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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