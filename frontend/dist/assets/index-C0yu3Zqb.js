var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function O(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function re(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+O(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+O(a,u),c+=ie(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+O(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(re(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function oe(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var k=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},A={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=A,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:oe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,k)}catch(e){k(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.4`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&O(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&O(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=E,D=function(){ne.postMessage(null)}}else D=function(){_(E,0)};function O(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,O(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}var m=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),O=Symbol.iterator;function re(e){return typeof e!=`object`||!e?null:(e=O&&e[O]||e[`@@iterator`],typeof e==`function`?e:null)}var ie=Symbol.for(`react.client.reference`);function ae(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ie?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?ae(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return ae(e(t))}catch{}}return null}var oe=Array.isArray,k=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},ce=[],le=-1;function ue(e){return{current:e}}function j(e){0>le||(e.current=ce[le],ce[le]=null,le--)}function M(e,t){le++,ce[le]=e.current,e.current=t}var de=ue(null),fe=ue(null),pe=ue(null),me=ue(null);function he(e,t){switch(M(pe,t),M(fe,e),M(de,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}j(de),M(de,e)}function ge(){j(de),j(fe),j(pe)}function _e(e){e.memoizedState!==null&&M(me,e);var t=de.current,n=Hd(t,e.type);t!==n&&(M(fe,e),M(de,n))}function ve(e){fe.current===e&&(j(de),j(fe)),me.current===e&&(j(me),Qf._currentValue=se)}var ye,be;function N(e){if(ye===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ye=t&&t[1]||``,be=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ye+e+be}var xe=!1;function Se(e,t){if(!e||xe)return``;xe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{xe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?N(n):``}function Ce(e,t){switch(e.tag){case 26:case 27:case 5:return N(e.type);case 16:return N(`Lazy`);case 13:return e.child!==t&&t!==null?N(`Suspense Fallback`):N(`Suspense`);case 19:return N(`SuspenseList`);case 0:case 15:return Se(e.type,!1);case 11:return Se(e.type.render,!1);case 1:return Se(e.type,!0);case 31:return N(`Activity`);default:return``}}function we(e){try{var t=``,n=null;do t+=Ce(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Te=Object.prototype.hasOwnProperty,Ee=t.unstable_scheduleCallback,De=t.unstable_cancelCallback,Oe=t.unstable_shouldYield,ke=t.unstable_requestPaint,Ae=t.unstable_now,je=t.unstable_getCurrentPriorityLevel,Me=t.unstable_ImmediatePriority,Ne=t.unstable_UserBlockingPriority,Pe=t.unstable_NormalPriority,Fe=t.unstable_LowPriority,Ie=t.unstable_IdlePriority,Le=t.log,Re=t.unstable_setDisableYieldValue,ze=null,Be=null;function Ve(e){if(typeof Le==`function`&&Re(e),Be&&typeof Be.setStrictMode==`function`)try{Be.setStrictMode(ze,e)}catch{}}var He=Math.clz32?Math.clz32:Ge,Ue=Math.log,We=Math.LN2;function Ge(e){return e>>>=0,e===0?32:31-(Ue(e)/We|0)|0}var Ke=256,qe=262144,Je=4194304;function Ye(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Xe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ye(n))):i=Ye(o):i=Ye(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ye(n))):i=Ye(o)):i=Ye(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ze(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Qe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $e(){var e=Je;return Je<<=1,!(Je&62914560)&&(Je=4194304),e}function et(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function nt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-He(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&rt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function rt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-He(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function it(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-He(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function at(e,t){var n=t&-t;return n=n&42?1:ot(n),(n&(e.suspendedLanes|t))===0?n:0}function ot(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function st(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ct(){var e=A.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function lt(e,t){var n=A.p;try{return A.p=e,t()}finally{A.p=n}}var ut=Math.random().toString(36).slice(2),dt=`__reactFiber$`+ut,ft=`__reactProps$`+ut,pt=`__reactContainer$`+ut,mt=`__reactEvents$`+ut,ht=`__reactListeners$`+ut,gt=`__reactHandles$`+ut,_t=`__reactResources$`+ut,vt=`__reactMarker$`+ut;function yt(e){delete e[dt],delete e[ft],delete e[mt],delete e[ht],delete e[gt]}function bt(e){var t=e[dt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[pt]||n[dt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[dt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function xt(e){if(e=e[dt]||e[pt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function St(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ct(e){var t=e[_t];return t||=e[_t]={hoistableStyles:new Map,hoistableScripts:new Map},t}function wt(e){e[vt]=!0}var Tt=new Set,Et={};function Dt(e,t){Ot(e,t),Ot(e+`Capture`,t)}function Ot(e,t){for(Et[e]=t,e=0;e<t.length;e++)Tt.add(t[e])}var kt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),At={},jt={};function Mt(e){return Te.call(jt,e)?!0:Te.call(At,e)?!1:kt.test(e)?jt[e]=!0:(At[e]=!0,!1)}function Nt(e,t,n){if(Mt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Pt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Ft(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function It(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Lt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Rt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function zt(e){if(!e._valueTracker){var t=Lt(e)?`checked`:`value`;e._valueTracker=Rt(e,t,``+e[t])}}function Bt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Lt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Vt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ht=/[\n"\\]/g;function Ut(e){return e.replace(Ht,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Wt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+It(t)):e.value!==``+It(t)&&(e.value=``+It(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Kt(e,o,It(n)):Kt(e,o,It(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+It(s):e.removeAttribute(`name`)}function Gt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){zt(e);return}n=n==null?``:``+It(n),t=t==null?n:``+It(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),zt(e)}function Kt(e,t,n){t===`number`&&Vt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function qt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+It(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Jt(e,t,n){if(t!=null&&(t=``+It(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+It(n)}function Yt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(oe(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=It(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),zt(e)}function Xt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Zt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Qt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Zt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function $t(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Qt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Qt(e,o,t[o])}function en(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var tn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),nn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function rn(e){return nn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function an(){}var on=null;function sn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cn=null,ln=null;function un(e){var t=xt(e);if(t&&(e=t.stateNode)){var n=e[ft]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Wt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Ut(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ft]||null;if(!a)throw Error(i(90));Wt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Bt(r)}break a;case`textarea`:Jt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&qt(e,!!n.multiple,t,!1)}}}var dn=!1;function fn(e,t,n){if(dn)return e(t,n);dn=!0;try{return e(t)}finally{if(dn=!1,(cn!==null||ln!==null)&&(bu(),cn&&(t=cn,e=ln,ln=cn=null,un(t),e)))for(t=0;t<e.length;t++)un(e[t])}}function pn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ft]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var mn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),hn=!1;if(mn)try{var gn={};Object.defineProperty(gn,`passive`,{get:function(){hn=!0}}),window.addEventListener(`test`,gn,gn),window.removeEventListener(`test`,gn,gn)}catch{hn=!1}var _n=null,vn=null,yn=null;function bn(){if(yn)return yn;var e,t=vn,n=t.length,r,i=`value`in _n?_n.value:_n.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return yn=i.slice(e,1<r?1-r:void 0)}function xn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Sn(){return!0}function Cn(){return!1}function wn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Sn:Cn,this.isPropagationStopped=Cn,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Sn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Sn)},persist:function(){},isPersistent:Sn}),t}var Tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},En=wn(Tn),Dn=m({},Tn,{view:0,detail:0}),On=wn(Dn),kn,An,jn,Mn=m({},Dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Un,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==jn&&(jn&&e.type===`mousemove`?(kn=e.screenX-jn.screenX,An=e.screenY-jn.screenY):An=kn=0,jn=e),kn)},movementY:function(e){return`movementY`in e?e.movementY:An}}),Nn=wn(Mn),Pn=wn(m({},Mn,{dataTransfer:0})),Fn=wn(m({},Dn,{relatedTarget:0})),In=wn(m({},Tn,{animationName:0,elapsedTime:0,pseudoElement:0})),Ln=wn(m({},Tn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Rn=wn(m({},Tn,{data:0})),zn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Bn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Vn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Hn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vn[e])?!!t[e]:!1}function Un(){return Hn}var Wn=wn(m({},Dn,{key:function(e){if(e.key){var t=zn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=xn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Bn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Un,charCode:function(e){return e.type===`keypress`?xn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?xn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Gn=wn(m({},Mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Kn=wn(m({},Dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Un})),qn=wn(m({},Tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Jn=wn(m({},Mn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),P=wn(m({},Tn,{newState:0,oldState:0})),Yn=[9,13,27,32],Xn=mn&&`CompositionEvent`in window,Zn=null;mn&&`documentMode`in document&&(Zn=document.documentMode);var Qn=mn&&`TextEvent`in window&&!Zn,$n=mn&&(!Xn||Zn&&8<Zn&&11>=Zn),er=` `,tr=!1;function nr(e,t){switch(e){case`keyup`:return Yn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function rr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ir=!1;function ar(e,t){switch(e){case`compositionend`:return rr(t);case`keypress`:return t.which===32?(tr=!0,er):null;case`textInput`:return e=t.data,e===er&&tr?null:e;default:return null}}function or(e,t){if(ir)return e===`compositionend`||!Xn&&nr(e,t)?(e=bn(),yn=vn=_n=null,ir=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return $n&&t.locale!==`ko`?null:t.data;default:return null}}var sr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!sr[e.type]:t===`textarea`}function lr(e,t,n,r){cn?ln?ln.push(r):ln=[r]:cn=r,t=Ed(t,`onChange`),0<t.length&&(n=new En(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var ur=null,dr=null;function fr(e){yd(e,0)}function pr(e){if(Bt(St(e)))return e}function mr(e,t){if(e===`change`)return t}var hr=!1;if(mn){var gr;if(mn){var _r=`oninput`in document;if(!_r){var vr=document.createElement(`div`);vr.setAttribute(`oninput`,`return;`),_r=typeof vr.oninput==`function`}gr=_r}else gr=!1;hr=gr&&(!document.documentMode||9<document.documentMode)}function yr(){ur&&(ur.detachEvent(`onpropertychange`,br),dr=ur=null)}function br(e){if(e.propertyName===`value`&&pr(dr)){var t=[];lr(t,dr,e,sn(e)),fn(fr,t)}}function xr(e,t,n){e===`focusin`?(yr(),ur=t,dr=n,ur.attachEvent(`onpropertychange`,br)):e===`focusout`&&yr()}function Sr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return pr(dr)}function Cr(e,t){if(e===`click`)return pr(t)}function wr(e,t){if(e===`input`||e===`change`)return pr(t)}function Tr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Er=typeof Object.is==`function`?Object.is:Tr;function Dr(e,t){if(Er(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Te.call(t,i)||!Er(e[i],t[i]))return!1}return!0}function Or(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kr(e,t){var n=Or(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Or(n)}}function Ar(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ar(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function jr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Vt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Vt(e.document)}return t}function Mr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Nr=mn&&`documentMode`in document&&11>=document.documentMode,Pr=null,Fr=null,Ir=null,Lr=!1;function Rr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Lr||Pr==null||Pr!==Vt(r)||(r=Pr,`selectionStart`in r&&Mr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ir&&Dr(Ir,r)||(Ir=r,r=Ed(Fr,`onSelect`),0<r.length&&(t=new En(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Pr)))}function zr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Br={animationend:zr(`Animation`,`AnimationEnd`),animationiteration:zr(`Animation`,`AnimationIteration`),animationstart:zr(`Animation`,`AnimationStart`),transitionrun:zr(`Transition`,`TransitionRun`),transitionstart:zr(`Transition`,`TransitionStart`),transitioncancel:zr(`Transition`,`TransitionCancel`),transitionend:zr(`Transition`,`TransitionEnd`)},Vr={},Hr={};mn&&(Hr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),`TransitionEvent`in window||delete Br.transitionend.transition);function Ur(e){if(Vr[e])return Vr[e];if(!Br[e])return e;var t=Br[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Hr)return Vr[e]=t[n];return e}var Wr=Ur(`animationend`),Gr=Ur(`animationiteration`),Kr=Ur(`animationstart`),qr=Ur(`transitionrun`),Jr=Ur(`transitionstart`),Yr=Ur(`transitioncancel`),Xr=Ur(`transitionend`),Zr=new Map,Qr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Qr.push(`scrollEnd`);function $r(e,t){Zr.set(e,t),Dt(t,[e])}var ei=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ti=[],ni=0,ri=0;function ii(){for(var e=ni,t=ri=ni=0;t<e;){var n=ti[t];ti[t++]=null;var r=ti[t];ti[t++]=null;var i=ti[t];ti[t++]=null;var a=ti[t];if(ti[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&I(n,i,a)}}function ai(e,t,n,r){ti[ni++]=e,ti[ni++]=t,ti[ni++]=n,ti[ni++]=r,ri|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function oi(e,t,n,r){return ai(e,t,n,r),si(e)}function F(e,t){return ai(e,null,null,t),si(e)}function I(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-He(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function si(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ci={};function li(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,t,n,r){return new li(e,t,n,r)}function di(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fi(e,t){var n=e.alternate;return n===null?(n=ui(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function pi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)di(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,de.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=ui(31,n,t,a),e.elementType=te,e.lanes=o,e;case y:return hi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ui(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=ui(13,n,t,a),e.elementType=ee,e.lanes=o,e;case T:return e=ui(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ui(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function hi(e,t,n,r){return e=ui(7,e,r,t),e.lanes=n,e}function gi(e,t,n){return e=ui(6,e,null,t),e.lanes=n,e}function _i(e){var t=ui(18,null,null,0);return t.stateNode=e,t}function vi(e,t,n){return t=ui(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var yi=new WeakMap;function bi(e,t){if(typeof e==`object`&&e){var n=yi.get(e);return n===void 0?(t={value:e,source:t,stack:we(t)},yi.set(e,t),t):n}return{value:e,source:t,stack:we(t)}}var xi=[],Si=0,Ci=null,wi=0,Ti=[],Ei=0,L=null,Di=1,Oi=``;function ki(e,t){xi[Si++]=wi,xi[Si++]=Ci,Ci=e,wi=t}function Ai(e,t,n){Ti[Ei++]=Di,Ti[Ei++]=Oi,Ti[Ei++]=L,L=e;var r=Di;e=Oi;var i=32-He(r)-1;r&=~(1<<i),n+=1;var a=32-He(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Di=1<<32-He(t)+i|n<<i|r,Oi=a+e}else Di=1<<a|n<<i|r,Oi=e}function ji(e){e.return!==null&&(ki(e,1),Ai(e,1,0))}function Mi(e){for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null;for(;e===L;)L=Ti[--Ei],Ti[Ei]=null,Oi=Ti[--Ei],Ti[Ei]=null,Di=Ti[--Ei],Ti[Ei]=null}function Ni(e,t){Ti[Ei++]=Di,Ti[Ei++]=Oi,Ti[Ei++]=L,Di=t.id,Oi=t.overflow,L=e}var Pi=null,R=null,z=!1,Fi=null,Ii=!1,Li=Error(i(519));function Ri(e){throw Wi(bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Li}function zi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[dt]=e,t[ft]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Gt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Yt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=an),t=!0):t=!1,t||Ri(e,!0)}function Bi(e){for(Pi=e.return;Pi;)switch(Pi.tag){case 5:case 31:case 13:Ii=!1;return;case 27:case 3:Ii=!0;return;default:Pi=Pi.return}}function Vi(e){if(e!==Pi)return!1;if(!z)return Bi(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&R&&Ri(e),Bi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=uf(e)}else t===27?(t=R,Zd(e.type)?(e=lf,lf=null,R=e):R=t):R=Pi?cf(e.stateNode.nextSibling):null;return!0}function Hi(){R=Pi=null,z=!1}function Ui(){var e=Fi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Fi=null),e}function Wi(e){Fi===null?Fi=[e]:Fi.push(e)}var Gi=ue(null),Ki=null,qi=null;function Ji(e,t,n){M(Gi,t._currentValue),t._currentValue=n}function Yi(e){e._currentValue=Gi.current,j(Gi)}function Xi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Zi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Xi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Xi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Qi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Er(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===me.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Zi(t,e,n,r),t.flags|=262144}function $i(e){for(e=e.firstContext;e!==null;){if(!Er(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ea(e){Ki=e,qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ta(e){return ra(Ki,e)}function na(e,t){return Ki===null&&ea(e),ra(e,t)}function ra(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},qi===null){if(e===null)throw Error(i(308));qi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else qi=qi.next=t;return n}var ia=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},aa=t.unstable_scheduleCallback,oa=t.unstable_NormalPriority,sa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ca(){return{controller:new ia,data:new Map,refCount:0}}function la(e){e.refCount--,e.refCount===0&&aa(oa,function(){e.controller.abort()})}var ua=null,da=0,fa=0,pa=null;function ma(e,t){if(ua===null){var n=ua=[];da=0,fa=dd(),pa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return da++,t.then(ha,ha),t}function ha(){if(--da===0&&ua!==null){pa!==null&&(pa.status=`fulfilled`);var e=ua;ua=null,fa=0,pa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ga(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var _a=k.S;k.S=function(e,t){eu=Ae(),typeof t==`object`&&t&&typeof t.then==`function`&&ma(e,t),_a!==null&&_a(e,t)};var va=ue(null);function ya(){var e=va.current;return e===null?q.pooledCache:e}function ba(e,t){t===null?M(va,va.current):M(va,t.pool)}function xa(){var e=ya();return e===null?null:{parent:sa._currentValue,pool:e}}var Sa=Error(i(460)),Ca=Error(i(474)),wa=Error(i(542)),Ta={then:function(){}};function Ea(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Da(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(an,an),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e;default:if(typeof t.status==`string`)t.then(an,an);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e}throw ka=t,Sa}}function Oa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ka=e,Sa):e}}var ka=null;function Aa(){if(ka===null)throw Error(i(459));var e=ka;return ka=null,e}function ja(e){if(e===Sa||e===wa)throw Error(i(483))}var Ma=null,Na=0;function Pa(e){var t=Na;return Na+=1,Ma===null&&(Ma=[]),Da(Ma,e,t)}function Fa(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ia(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function La(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=fi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=gi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&Oa(i)===t.type)?(t=a(t,n.props),Fa(t,n),t.return=e,t):(t=mi(n.type,n.key,n.props,null,e.mode,r),Fa(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=vi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=hi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=gi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=mi(t.type,t.key,t.props,null,e.mode,n),Fa(n,t),n.return=e,n;case v:return t=vi(t,e.mode,n),t.return=e,t;case D:return t=Oa(t),f(e,t,n)}if(oe(t)||re(t))return t=hi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Pa(t),n);if(t.$$typeof===C)return f(e,na(e,t),n);Ia(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=Oa(n),p(e,t,n,r)}if(oe(n)||re(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Pa(n),r);if(n.$$typeof===C)return p(e,t,na(e,n),r);Ia(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=Oa(r),m(e,t,n,r,i)}if(oe(r)||re(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Pa(r),i);if(r.$$typeof===C)return m(e,t,n,na(t,r),i);Ia(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&ki(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&ki(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&ki(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&ki(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&ki(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&ki(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&Oa(l)===r.type){n(e,r.sibling),c=a(r,o.props),Fa(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=hi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=mi(o.type,o.key,o.props,null,e.mode,c),Fa(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=vi(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=Oa(o),b(e,r,o,c)}if(oe(o))return h(e,r,o,c);if(re(o)){if(l=re(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Pa(o),c);if(o.$$typeof===C)return b(e,r,na(e,o),c);Ia(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=gi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Na=0;var i=b(e,t,n,r);return Ma=null,i}catch(t){if(t===Sa||t===wa)throw t;var a=ui(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ra=La(!0),za=La(!1),B=!1;function V(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ba(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Va(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=si(e),I(e,null,n),t}return ai(e,r,t,n),si(e)}function Ua(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,it(e,n)}}function Wa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ga=!1;function Ka(){if(Ga){var e=pa;if(e!==null)throw e}}function qa(e,t,n,r){Ga=!1;var i=e.updateQueue;B=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===fa&&(Ga=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=m({},d,f);break a;case 2:B=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Ja(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ya(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ja(n[e],t)}var Xa=ue(null),Za=ue(0);function Qa(e,t){e=Ul,M(Za,e),M(Xa,t),Ul=e|t.baseLanes}function $a(){M(Za,Ul),M(Xa,Xa.current)}function eo(){Ul=Za.current,j(Xa),j(Za)}var to=ue(null),no=null;function ro(e){var t=e.alternate;M(co,co.current&1),M(to,e),no===null&&(t===null||Xa.current!==null||t.memoizedState!==null)&&(no=e)}function io(e){M(co,co.current),M(to,e),no===null&&(no=e)}function ao(e){e.tag===22?(M(co,co.current),M(to,e),no===null&&(no=e)):oo(e)}function oo(){M(co,co.current),M(to,to.current)}function so(e){j(to),no===e&&(no=null),j(co)}var co=ue(0);function lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var uo=0,H=null,U=null,fo=null,po=!1,mo=!1,ho=!1,go=0,_o=0,vo=null,yo=0;function bo(){throw Error(i(321))}function xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Er(e[n],t[n]))return!1;return!0}function So(e,t,n,r,i,a){return uo=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,k.H=e===null||e.memoizedState===null?zs:Bs,ho=!1,a=n(r,i),ho=!1,mo&&(a=wo(t,n,r,i)),Co(e),a}function Co(e){k.H=Rs;var t=U!==null&&U.next!==null;if(uo=0,fo=U=H=null,po=!1,_o=0,vo=null,t)throw Error(i(300));e===null||rc||(e=e.dependencies,e!==null&&$i(e)&&(rc=!0))}function wo(e,t,n,r){H=e;var a=0;do{if(mo&&(vo=null),_o=0,mo=!1,25<=a)throw Error(i(301));if(a+=1,fo=U=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}k.H=Vs,o=t(n,r)}while(mo);return o}function To(){var e=k.H,t=e.useState()[0];return t=typeof t.then==`function`?Mo(t):t,e=e.useState()[0],(U===null?null:U.memoizedState)!==e&&(H.flags|=1024),t}function Eo(){var e=go!==0;return go=0,e}function Do(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Oo(e){if(po){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}po=!1}uo=0,fo=U=H=null,mo=!1,_o=go=0,vo=null}function ko(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fo===null?H.memoizedState=fo=e:fo=fo.next=e,fo}function Ao(){if(U===null){var e=H.alternate;e=e===null?null:e.memoizedState}else e=U.next;var t=fo===null?H.memoizedState:fo.next;if(t!==null)fo=t,U=e;else{if(e===null)throw H.alternate===null?Error(i(467)):Error(i(310));U=e,e={memoizedState:U.memoizedState,baseState:U.baseState,baseQueue:U.baseQueue,queue:U.queue,next:null},fo===null?H.memoizedState=fo=e:fo=fo.next=e}return fo}function jo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mo(e){var t=_o;return _o+=1,vo===null&&(vo=[]),e=Da(vo,e,t),t=H,(fo===null?t.memoizedState:fo.next)===null&&(t=t.alternate,k.H=t===null||t.memoizedState===null?zs:Bs),e}function No(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Mo(e);if(e.$$typeof===C)return ta(e)}throw Error(i(438,String(e)))}function Po(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=H.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=jo(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Fo(e,t){return typeof t==`function`?t(e):t}function Io(e){return Lo(Ao(),U,e)}function Lo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(uo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===fa&&(d=!0);else if((uo&p)===p){u=u.next,p===fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,H.lanes|=p,Gl|=p;f=u.action,ho&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,H.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Er(o,e.memoizedState)&&(rc=!0,d&&(n=pa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ro(e){var t=Ao(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Er(o,t.memoizedState)||(rc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function zo(e,t,n){var r=H,a=Ao(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Er((U||a).memoizedState,n);if(s&&(a.memoizedState=n,rc=!0),a=a.queue,us(Ho.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||fo!==null&&fo.memoizedState.tag&1){if(r.flags|=2048,as(9,{destroy:void 0},Vo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||uo&127||Bo(r,t,n)}return n}function Bo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=jo(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vo(e,t,n,r){t.value=n,t.getSnapshot=r,Uo(t)&&Wo(e)}function Ho(e,t,n){return n(function(){Uo(t)&&Wo(e)})}function Uo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Er(e,n)}catch{return!0}}function Wo(e){var t=F(e,2);t!==null&&hu(t,e,2)}function Go(e){var t=ko();if(typeof e==`function`){var n=e;if(e=n(),ho){Ve(!0);try{n()}finally{Ve(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:e},t}function Ko(e,t,n,r){return e.baseState=n,Lo(e,U,typeof r==`function`?r:Fo)}function qo(e,t,n,r,a){if(Fs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};k.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Jo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Jo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=k.T,o={};k.T=o;try{var s=n(i,r),c=k.S;c!==null&&c(o,s),Yo(e,t,s)}catch(n){Zo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),k.T=a}}else try{a=n(i,r),Yo(e,t,a)}catch(n){Zo(e,t,n)}}function Yo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Xo(e,t,n)},function(n){return Zo(e,t,n)}):Xo(e,t,n)}function Xo(e,t,n){t.status=`fulfilled`,t.value=n,Qo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Jo(e,n)))}function Zo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Qo(t),t=t.next;while(t!==r)}e.action=null}function Qo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function $o(e,t){return t}function es(e,t){if(z){var n=q.formState;if(n!==null){a:{var r=H;if(z){if(R){b:{for(var i=R,a=Ii;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){R=cf(i.nextSibling),r=i.data===`F!`;break a}}Ri(r)}r=!1}r&&(t=n[0])}}return n=ko(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$o,lastRenderedState:t},n.queue=r,n=Ms.bind(null,H,r),r.dispatch=n,r=Go(!1),a=Ps.bind(null,H,!1,r.queue),r=ko(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=qo.bind(null,H,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ts(e){return ns(Ao(),U,e)}function ns(e,t,n){if(t=Lo(e,t,$o)[0],e=Io(Fo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Mo(t)}catch(e){throw e===Sa?wa:e}else r=t;t=Ao();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,as(9,{destroy:void 0},rs.bind(null,i,n),null)),[r,a,e]}function rs(e,t){e.action=t}function is(e){var t=Ao(),n=U;if(n!==null)return ns(t,n,e);Ao(),t=t.memoizedState,n=Ao();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function as(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=H.updateQueue,t===null&&(t=jo(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function os(){return Ao().memoizedState}function ss(e,t,n,r){var i=ko();H.flags|=e,i.memoizedState=as(1|t,{destroy:void 0},n,r===void 0?null:r)}function cs(e,t,n,r){var i=Ao();r=r===void 0?null:r;var a=i.memoizedState.inst;U!==null&&r!==null&&xo(r,U.memoizedState.deps)?i.memoizedState=as(t,a,n,r):(H.flags|=e,i.memoizedState=as(1|t,a,n,r))}function ls(e,t){ss(8390656,8,e,t)}function us(e,t){cs(2048,8,e,t)}function ds(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=jo(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function fs(e){var t=Ao().memoizedState;return ds({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ps(e,t){return cs(4,2,e,t)}function ms(e,t){return cs(4,4,e,t)}function hs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gs(e,t,n){n=n==null?null:n.concat([e]),cs(4,4,hs.bind(null,t,e),n)}function _s(){}function vs(e,t){var n=Ao();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ys(e,t){var n=Ao();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&xo(t,r[1]))return r[0];if(r=e(),ho){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r}function bs(e,t,n){return n===void 0||uo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),H.lanes|=e,Gl|=e,n)}function xs(e,t,n,r){return Er(n,t)?n:Xa.current===null?!(uo&42)||uo&1073741824&&!(Y&261930)?(rc=!0,e.memoizedState=n):(e=mu(),H.lanes|=e,Gl|=e,t):(e=bs(e,n,r),Er(e,t)||(rc=!0),e)}function Ss(e,t,n,r,i){var a=A.p;A.p=a!==0&&8>a?a:8;var o=k.T,s={};k.T=s,Ps(e,!1,t,n);try{var c=i(),l=k.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ns(e,t,ga(c,r),pu(e)):Ns(e,t,r,pu(e))}catch(n){Ns(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{A.p=a,o!==null&&s.types!==null&&(o.types=s.types),k.T=o}}function Cs(){}function ws(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Ts(e).queue;Ss(e,a,t,se,n===null?Cs:function(){return Es(e),n(r)})}function Ts(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:se},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Es(e){var t=Ts(e);t.next===null&&(t=e.alternate.memoizedState),Ns(e,t.next.queue,{},pu())}function Ds(){return ta(Qf)}function Os(){return Ao().memoizedState}function ks(){return Ao().memoizedState}function As(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Va(n);var r=Ha(t,e,n);r!==null&&(hu(r,t,n),Ua(r,t,n)),t={cache:ca()},e.payload=t;return}t=t.return}}function js(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Fs(e)?Is(t,n):(n=oi(e,t,n,r),n!==null&&(hu(n,e,r),Ls(n,t,r)))}function Ms(e,t,n){Ns(e,t,n,pu())}function Ns(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Fs(e))Is(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Er(s,o))return ai(e,t,i,0),q===null&&ii(),!1}catch{}if(n=oi(e,t,i,r),n!==null)return hu(n,e,r),Ls(n,t,r),!0}return!1}function Ps(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Fs(e)){if(t)throw Error(i(479))}else t=oi(e,n,r,2),t!==null&&hu(t,e,2)}function Fs(e){var t=e.alternate;return e===H||t!==null&&t===H}function Is(e,t){mo=po=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ls(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,it(e,n)}}var Rs={readContext:ta,use:No,useCallback:bo,useContext:bo,useEffect:bo,useImperativeHandle:bo,useLayoutEffect:bo,useInsertionEffect:bo,useMemo:bo,useReducer:bo,useRef:bo,useState:bo,useDebugValue:bo,useDeferredValue:bo,useTransition:bo,useSyncExternalStore:bo,useId:bo,useHostTransitionStatus:bo,useFormState:bo,useActionState:bo,useOptimistic:bo,useMemoCache:bo,useCacheRefresh:bo};Rs.useEffectEvent=bo;var zs={readContext:ta,use:No,useCallback:function(e,t){return ko().memoizedState=[e,t===void 0?null:t],e},useContext:ta,useEffect:ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ss(4194308,4,hs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ss(4194308,4,e,t)},useInsertionEffect:function(e,t){ss(4,2,e,t)},useMemo:function(e,t){var n=ko();t=t===void 0?null:t;var r=e();if(ho){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ko();if(n!==void 0){var i=n(t);if(ho){Ve(!0);try{n(t)}finally{Ve(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=js.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=ko();return e={current:e},t.memoizedState=e},useState:function(e){e=Go(e);var t=e.queue,n=Ms.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:_s,useDeferredValue:function(e,t){return bs(ko(),e,t)},useTransition:function(){var e=Go(!1);return e=Ss.bind(null,H,e.queue,!0,!1),ko().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=H,a=ko();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||Bo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ls(Ho.bind(null,r,o,e),[e]),r.flags|=2048,as(9,{destroy:void 0},Vo.bind(null,r,o,n,t),null),n},useId:function(){var e=ko(),t=q.identifierPrefix;if(z){var n=Oi,r=Di;n=(r&~(1<<32-He(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=yo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ds,useFormState:es,useActionState:es,useOptimistic:function(e){var t=ko();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ps.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:Po,useCacheRefresh:function(){return ko().memoizedState=As.bind(null,H)},useEffectEvent:function(e){var t=ko(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Bs={readContext:ta,use:No,useCallback:vs,useContext:ta,useEffect:us,useImperativeHandle:gs,useInsertionEffect:ps,useLayoutEffect:ms,useMemo:ys,useReducer:Io,useRef:os,useState:function(){return Io(Fo)},useDebugValue:_s,useDeferredValue:function(e,t){return xs(Ao(),U.memoizedState,e,t)},useTransition:function(){var e=Io(Fo)[0],t=Ao().memoizedState;return[typeof e==`boolean`?e:Mo(e),t]},useSyncExternalStore:zo,useId:Os,useHostTransitionStatus:Ds,useFormState:ts,useActionState:ts,useOptimistic:function(e,t){return Ko(Ao(),U,e,t)},useMemoCache:Po,useCacheRefresh:ks};Bs.useEffectEvent=fs;var Vs={readContext:ta,use:No,useCallback:vs,useContext:ta,useEffect:us,useImperativeHandle:gs,useInsertionEffect:ps,useLayoutEffect:ms,useMemo:ys,useReducer:Ro,useRef:os,useState:function(){return Ro(Fo)},useDebugValue:_s,useDeferredValue:function(e,t){var n=Ao();return U===null?bs(n,e,t):xs(n,U.memoizedState,e,t)},useTransition:function(){var e=Ro(Fo)[0],t=Ao().memoizedState;return[typeof e==`boolean`?e:Mo(e),t]},useSyncExternalStore:zo,useId:Os,useHostTransitionStatus:Ds,useFormState:is,useActionState:is,useOptimistic:function(e,t){var n=Ao();return U===null?(n.baseState=e,[e,n.queue.dispatch]):Ko(n,U,e,t)},useMemoCache:Po,useCacheRefresh:ks};Vs.useEffectEvent=fs;function Hs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:m({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Us={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Va(n);r.tag=2,t!=null&&(r.callback=t),t=Ha(e,r,n),t!==null&&(hu(t,e,n),Ua(t,e,n))}};function Ws(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Dr(n,r)||!Dr(i,a):!0}function Gs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Us.enqueueReplaceState(t,t.state,null)}function Ks(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=m({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function qs(e){ei(e)}function Js(e){console.error(e)}function Ys(e){ei(e)}function Xs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Zs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Qs(e,t,n){return n=Va(n),n.tag=3,n.payload={element:null},n.callback=function(){Xs(e,t)},n}function $s(e){return e=Va(e),e.tag=3,e}function ec(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Zs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Zs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function tc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Qi(t,n,a,!0),n=to.current,n!==null){switch(n.tag){case 31:case 13:return no===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(z)return t=to.current,t===null?(r!==Li&&(t=Error(i(423),{cause:r}),Wi(bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=bi(r,n),a=Qs(e.stateNode,r,a),Wa(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Li&&(e=Error(i(422),{cause:r}),Wi(bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=bi(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Qs(n.stateNode,r,e),Wa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=$s(a),ec(a,e,n,r),Wa(n,a),!1}n=n.return}while(n!==null);return!1}var nc=Error(i(461)),rc=!1;function ic(e,t,n,r){t.child=e===null?za(t,null,n,r):Ra(t,e.child,n,r)}function ac(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ea(t),r=So(e,t,n,o,a,i),s=Eo(),e!==null&&!rc?(Do(e,t,i),kc(e,t,i)):(z&&s&&ji(t),t.flags|=1,ic(e,t,r,i),t.child)}function oc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!di(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,sc(e,t,a,r,i)):(e=mi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ac(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Dr:n,n(o,r)&&e.ref===t.ref)return kc(e,t,i)}return t.flags|=1,e=fi(a,r),e.ref=t.ref,e.return=t,t.child=e}function sc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Dr(a,r)&&e.ref===t.ref)if(rc=!1,t.pendingProps=r=a,Ac(e,i))e.flags&131072&&(rc=!0);else return t.lanes=e.lanes,kc(e,t,i)}return hc(e,t,n,r,i)}function cc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ba(t,a===null?null:a.cachePool),a===null?$a():Qa(t,a),ao(t);else return r=t.lanes=536870912,uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ba(t,null),$a(),oo(t)):(ba(t,a.cachePool),Qa(t,a),oo(t),t.memoizedState=null);return ic(e,t,i,n),t.child}function lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function uc(e,t,n,r,i){var a=ya();return a=a===null?null:{parent:sa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ba(t,null),$a(),ao(t),e!==null&&Qi(e,t,r,!0),t.childLanes=i,null}function dc(e,t){return t=wc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function fc(e,t,n){return Ra(t,e.child,null,n),e=dc(t,t.pendingProps),e.flags|=2,so(t),t.memoizedState=null,e}function pc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=dc(t,r),t.lanes=536870912,lc(null,e);if(io(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:L===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return t.lanes=536870912,null}return dc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(io(t),a)if(t.flags&256)t.flags&=-257,t=fc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(rc||Qi(e,t,n,!1),a=(n&e.childLanes)!==0,rc||a){if(r=q,r!==null&&(s=at(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,F(e,s),hu(r,e,s),nc;Du(),t=fc(e,t,n)}else e=o.treeContext,R=cf(s.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=dc(t,r),t.flags|=4096;return t}return e=fi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function mc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function hc(e,t,n,r,i){return ea(t),n=So(e,t,n,r,void 0,i),r=Eo(),e!==null&&!rc?(Do(e,t,i),kc(e,t,i)):(z&&r&&ji(t),t.flags|=1,ic(e,t,n,i),t.child)}function gc(e,t,n,r,i,a){return ea(t),t.updateQueue=null,n=wo(t,r,n,i),Co(e),r=Eo(),e!==null&&!rc?(Do(e,t,a),kc(e,t,a)):(z&&r&&ji(t),t.flags|=1,ic(e,t,n,a),t.child)}function _c(e,t,n,r,i){if(ea(t),t.stateNode===null){var a=ci,o=n.contextType;typeof o==`object`&&o&&(a=ta(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Us,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},V(t),o=n.contextType,a.context=typeof o==`object`&&o?ta(o):ci,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Hs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Us.enqueueReplaceState(a,a.state,null),qa(t,r,a,i),Ka(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ks(n,s);a.props=c;var l=a.context,u=n.contextType;o=ci,typeof u==`object`&&u&&(o=ta(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Gs(t,a,r,o),B=!1;var f=t.memoizedState;a.state=f,qa(t,r,a,i),Ka(),l=t.memoizedState,s||f!==l||B?(typeof d==`function`&&(Hs(t,n,d,r),l=t.memoizedState),(c=B||Ws(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ba(e,t),o=t.memoizedProps,u=Ks(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ci,typeof l==`object`&&l&&(c=ta(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Gs(t,a,r,c),B=!1,f=t.memoizedState,a.state=f,qa(t,r,a,i),Ka();var p=t.memoizedState;o!==d||f!==p||B||e!==null&&e.dependencies!==null&&$i(e.dependencies)?(typeof s==`function`&&(Hs(t,n,s,r),p=t.memoizedState),(u=B||Ws(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&$i(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,mc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ra(t,e.child,null,i),t.child=Ra(t,null,n,i)):ic(e,t,n,i),t.memoizedState=a.state,e=t.child):e=kc(e,t,i),e}function vc(e,t,n,r){return Hi(),t.flags|=256,ic(e,t,n,r),t.child}var yc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bc(e){return{baseLanes:e,cachePool:xa()}}function xc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function Sc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(co.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(z){if(a?ro(t):oo(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:L===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(oo(t),a=t.mode,c=wc({mode:`hidden`,children:c},a),r=hi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=bc(n),r.childLanes=xc(e,s,n),t.memoizedState=yc,lc(null,r)):(ro(t),Cc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(ro(t),t.flags&=-257,t=Tc(e,t,n)):t.memoizedState===null?(oo(t),c=r.fallback,a=t.mode,r=wc({mode:`visible`,children:r.children},a),c=hi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ra(t,e.child,null,n),r=t.child,r.memoizedState=bc(n),r.childLanes=xc(e,s,n),t.memoizedState=yc,t=lc(null,r)):(oo(t),t.child=e.child,t.flags|=128,t=null);else if(ro(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Wi({value:r,source:null,stack:null}),t=Tc(e,t,n)}else if(rc||Qi(e,t,n,!1),s=(n&e.childLanes)!==0,rc||s){if(s=q,s!==null&&(r=at(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,F(e,r),hu(s,e,r),nc;af(c)||Du(),t=Tc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,R=cf(c.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=Cc(t,r.children),t.flags|=4096);return t}return a?(oo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=fi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=hi(c,a,n,null),c.flags|=2):c=fi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,lc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=bc(n):(a=c.cachePool,a===null?a=xa():(l=sa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=xc(e,s,n),t.memoizedState=yc,lc(e.child,r)):(ro(t),n=e.child,e=n.sibling,n=fi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Cc(e,t){return t=wc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function wc(e,t){return e=ui(22,e,null,t),e.lanes=0,e}function Tc(e,t,n){return Ra(t,e.child,null,n),e=Cc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ec(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Xi(e.return,t,n)}function Dc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Oc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=co.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,M(co,o),ic(e,t,r,n),r=z?wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ec(e,n,t);else if(e.tag===19)Ec(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&lo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Dc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&lo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Dc(t,!0,n,null,a,r);break;case`together`:Dc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function kc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Qi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=fi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=fi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ac(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&$i(e))):!0}function jc(e,t,n){switch(t.tag){case 3:he(t,t.stateNode.containerInfo),Ji(t,sa,e.memoizedState.cache),Hi();break;case 27:case 5:_e(t);break;case 4:he(t,t.stateNode.containerInfo);break;case 10:Ji(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,io(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(ro(t),e=kc(e,t,n),e===null?null:e.sibling):Sc(e,t,n):(ro(t),t.flags|=128,null);ro(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Qi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Oc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),M(co,co.current),r)break;return null;case 22:return t.lanes=0,cc(e,t,n,t.pendingProps);case 24:Ji(t,sa,e.memoizedState.cache)}return kc(e,t,n)}function Mc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)rc=!0;else{if(!Ac(e,n)&&!(t.flags&128))return rc=!1,jc(e,t,n);rc=!!(e.flags&131072)}else rc=!1,z&&t.flags&1048576&&Ai(t,wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Oa(t.elementType),t.type=e,typeof e==`function`)di(e)?(r=Ks(e,r),t.tag=1,t=_c(null,t,e,r,n)):(t.tag=0,t=hc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=ac(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=oc(null,t,e,r,n);break a}}throw t=ae(e)||e,Error(i(306,t,``))}}return t;case 0:return hc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ks(r,t.pendingProps),_c(e,t,r,a,n);case 3:a:{if(he(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ba(e,t),qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ji(t,sa,r),r!==o.cache&&Zi(t,[sa],n,!0),Ka(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=vc(e,t,r,n);break a}else if(r!==a){a=bi(Error(i(424)),t),Wi(a),t=vc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(R=cf(e.firstChild),Pi=t,z=!0,Fi=null,Ii=!0,n=za(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hi(),r===a){t=kc(e,t,n);break a}ic(e,t,r,n)}t=t.child}return t;case 26:return mc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(n=t.type,e=t.pendingProps,r=Bd(pe.current).createElement(n),r[dt]=t,r[ft]=e,Pd(r,n,e),wt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return _e(t),e===null&&z&&(r=t.stateNode=ff(t.type,t.pendingProps,pe.current),Pi=t,Ii=!0,a=R,Zd(t.type)?(lf=a,R=cf(r.firstChild)):R=a),ic(e,t,t.pendingProps.children,n),mc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=R)&&(r=tf(r,t.type,t.pendingProps,Ii),r===null?a=!1:(t.stateNode=r,Pi=t,R=cf(r.firstChild),Ii=!1,a=!0)),a||Ri(t)),_e(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=So(e,t,To,null,null,n),Qf._currentValue=a),mc(e,t),ic(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=R)&&(n=nf(n,t.pendingProps,Ii),n===null?e=!1:(t.stateNode=n,Pi=t,R=null,e=!0)),e||Ri(t)),null;case 13:return Sc(e,t,n);case 4:return he(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ra(t,null,r,n):ic(e,t,r,n),t.child;case 11:return ac(e,t,t.type,t.pendingProps,n);case 7:return ic(e,t,t.pendingProps,n),t.child;case 8:return ic(e,t,t.pendingProps.children,n),t.child;case 12:return ic(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ji(t,t.type,r.value),ic(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ea(t),a=ta(a),r=r(a),t.flags|=1,ic(e,t,r,n),t.child;case 14:return oc(e,t,t.type,t.pendingProps,n);case 15:return sc(e,t,t.type,t.pendingProps,n);case 19:return Oc(e,t,n);case 31:return pc(e,t,n);case 22:return cc(e,t,n,t.pendingProps);case 24:return ea(t),r=ta(sa),e===null?(a=ya(),a===null&&(a=q,o=ca(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},V(t),Ji(t,sa,a)):((e.lanes&n)!==0&&(Ba(e,t),qa(t,null,null,n),Ka()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ji(t,sa,r),r!==a.cache&&Zi(t,[sa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ji(t,sa,r))),ic(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Nc(e){e.flags|=4}function Pc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw ka=Ta,Ca}else e.flags&=-16777217}function Fc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw ka=Ta,Ca}function Ic(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:$e(),e.lanes|=t,Yl|=t)}function Lc(e,t){if(!z)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function W(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Rc(e,t,n){var r=t.pendingProps;switch(Mi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(t),null;case 1:return W(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Yi(sa),ge(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Vi(t)?Nc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ui())),W(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Nc(t),o===null?(W(t),Pc(t,a,null,r,n)):(W(t),Fc(t,o))):o?o===e.memoizedState?(W(t),t.flags&=-16777217):(Nc(t),W(t),Fc(t,o)):(e=e.memoizedProps,e!==r&&Nc(t),W(t),Pc(t,a,e,r,n)),null;case 27:if(ve(t),n=pe.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return W(t),null}e=de.current,Vi(t)?zi(t,e):(e=ff(a,r,n),t.stateNode=e,Nc(t))}return W(t),null;case 5:if(ve(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return W(t),null}if(o=de.current,Vi(t))zi(t,o);else{var s=Bd(pe.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[dt]=t,o[ft]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Nc(t)}}return W(t),Pc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Nc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=pe.current,Vi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Pi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[dt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ri(t,!0)}else e=Bd(e).createTextNode(r),e[dt]=t,t.stateNode=e}return W(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Vi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[dt]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),e=!1}else n=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(so(t),t):(so(t),null);if(t.flags&128)throw Error(i(558))}return W(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Vi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[dt]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;W(t),a=!1}else a=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(so(t),t):(so(t),null)}return so(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ic(t,t.updateQueue),W(t),null);case 4:return ge(),e===null&&Sd(t.stateNode.containerInfo),W(t),null;case 10:return Yi(t.type),W(t),null;case 19:if(j(co),r=t.memoizedState,r===null)return W(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Lc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=lo(e),o!==null){for(t.flags|=128,Lc(r,!1),e=o.updateQueue,t.updateQueue=e,Ic(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)pi(n,e),n=n.sibling;return M(co,co.current&1|2),z&&ki(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ae()>tu&&(t.flags|=128,a=!0,Lc(r,!1),t.lanes=4194304)}else{if(!a)if(e=lo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Ic(t,e),Lc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!z)return W(t),null}else 2*Ae()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Lc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(W(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ae(),e.sibling=null,n=co.current,M(co,a?n&1|2:n&1),z&&ki(t,r.treeForkCount),e);case 22:case 23:return so(t),eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(W(t),t.subtreeFlags&6&&(t.flags|=8192)):W(t),n=t.updateQueue,n!==null&&Ic(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&j(va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Yi(sa),W(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function zc(e,t){switch(Mi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yi(sa),ge(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ve(t),null;case 31:if(t.memoizedState!==null){if(so(t),t.alternate===null)throw Error(i(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(so(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return j(co),null;case 4:return ge(),null;case 10:return Yi(t.type),null;case 22:case 23:return so(t),eo(),e!==null&&j(va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Yi(sa),null;case 25:return null;default:return null}}function Bc(e,t){switch(Mi(t),t.tag){case 3:Yi(sa),ge();break;case 26:case 27:case 5:ve(t);break;case 4:ge();break;case 31:t.memoizedState!==null&&so(t);break;case 13:so(t);break;case 19:j(co);break;case 10:Yi(t.type);break;case 22:case 23:so(t),eo(),e!==null&&j(va);break;case 24:Yi(sa)}}function Vc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Hc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Uc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ya(t,n)}catch(t){Z(e,e.return,t)}}}function Wc(e,t,n){n.props=Ks(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Gc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Kc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function qc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Jc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[ft]=t}catch(t){Z(e,e.return,t)}}function Yc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Xc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Yc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=an));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Qc(e,t,n),e=e.sibling;e!==null;)Qc(e,t,n),e=e.sibling}function $c(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[dt]=e,t[ft]=n}catch(t){Z(e,e.return,t)}}var el=!1,tl=!1,nl=!1,rl=typeof WeakSet==`function`?WeakSet:Set,il=null;function al(e,t){if(e=e.containerInfo,Rd=sp,e=jr(e),Mr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,il=t;il!==null;)if(t=il,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,il=e;else for(;il!==null;){switch(t=il,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ks(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,il=e;break}il=t.return}}function ol(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Vc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ks(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Uc(n),r&512&&Gc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ya(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&$c(n);case 26:case 5:bl(e,n),t===null&&r&4&&qc(n),r&512&&Gc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||el,!r){t=t!==null&&t.memoizedState!==null||tl,i=el;var a=tl;el=r,(tl=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),el=i,tl=a}break;case 30:break;default:bl(e,n)}}function sl(e){var t=e.alternate;t!==null&&(e.alternate=null,sl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&yt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var G=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(Be&&typeof Be.onCommitFiberUnmount==`function`)try{Be.onCommitFiberUnmount(ze,n)}catch{}switch(n.tag){case 26:tl||Kc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:tl||Kc(n,t);var r=G,i=cl;Zd(n.type)&&(G=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),G=r,cl=i;break;case 5:tl||Kc(n,t);case 6:if(r=G,i=cl,G=null,ll(e,t,n),G=r,cl=i,G!==null)if(cl)try{(G.nodeType===9?G.body:G.nodeName===`HTML`?G.ownerDocument.body:G).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{G.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:G!==null&&(cl?(e=G,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(G,n.stateNode));break;case 4:r=G,i=cl,G=n.stateNode.containerInfo,cl=!0,ll(e,t,n),G=r,cl=i;break;case 0:case 11:case 14:case 15:Hc(2,n,t),tl||Hc(4,n,t),ll(e,t,n);break;case 1:tl||(Kc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Wc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:tl=(r=tl)||n.memoizedState!==null,ll(e,t,n),tl=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new rl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new rl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){G=c.stateNode,cl=!1;break a}break;case 5:G=c.stateNode,cl=!1;break a;case 3:case 4:G=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(G===null)throw Error(i(160));ul(o,s,a),G=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Hc(3,e,e.return),Vc(3,e),Hc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),r&64&&el&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[vt]||o[dt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[dt]=e,wt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[dt]=e,wt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Jc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),n!==null&&r&4&&Jc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(tl||n===null||Kc(n,n.return)),e.flags&32){a=e.stateNode;try{Xt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Jc(e,a,n===null?a:n.memoizedProps)),r&1024&&(nl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}nl&&(nl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Ae()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=el,d=tl;if(el=u||a,tl=d||l,hl(t,e),tl=d,el=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||el||tl||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Yc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Qc(e,Xc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Xt(o,``),n.flags&=-33),Qc(e,Xc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Zc(e,Xc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ol(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Hc(4,t,t.return),xl(t);break;case 1:Kc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Wc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Kc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Vc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ja(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Uc(a),Gc(a,a.return);break;case 27:$c(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&qc(a),Gc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Gc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&la(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Vc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Vc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];il=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Hc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];il=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Hc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;il!==null;){var n=il;switch(n.tag){case 0:case 11:case 15:Hc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:la(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,il=r;else a:for(n=e;il!==null;){r=il;var i=r.sibling,a=r.return;if(sl(r),r===n){il=null;break a}if(i!==null){i.return=a,il=i;break a}il=a}}}var Ll={getCacheForType:function(e){var t=ta(sa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ta(sa).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:k.T===null?ct():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||z){var e=qe;qe<<=1,!(qe&3932160)&&(qe=262144),Jl=e}else Jl=536870912;return e=to.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),tt(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Ze(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Ae(),10<a)){if(yu(r,t,Jl,!Bl),Xe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:an},jl(t,a,d);var m=(a&62914560)===a?$l-Ae():(a&4194048)===a?eu-Ae():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Er(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-He(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&rt(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,qi=Ki=null,Oo(e),Ma=null,Na=0,e=J;for(;e!==null;)Bc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=fi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=Ze(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-He(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,ii(),n}function Cu(e,t){H=null,k.H=Rs,t===Sa||t===wa?(t=Aa(),X=3):t===Ca?(t=Aa(),X=4):X=t===nc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Xs(e,bi(t,e.current)))}function wu(){var e=to.current;return e===null?!0:(Y&4194048)===Y?no===null:(Y&62914560)===Y||Y&536870912?e===no:!1}function Tu(){var e=k.H;return k.H=Rs,e===null?Rs:e}function Eu(){var e=k.A;return k.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&to.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:to.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,qi=Ki=null,K=r,k.H=i,k.A=a,J===null&&(q=null,Y=0,ii()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Ae()+500,Su(e,t)):Vl=Ze(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Ea(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Ea(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return qi=Ki=null,k.H=r,k.A=a,K=n,J===null?(q=null,Y=0,ii(),Wl):0}function ju(){for(;J!==null&&!Oe();)Mu(J)}function Mu(e){var t=Mc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=gc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=gc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Oo(t);default:Bc(n,t),t=J=pi(t,Ul),t=Mc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){qi=Ki=null,Oo(t),Ma=null,Na=0;var i=t.return;try{if(tc(e,i,t,n,Y)){Wl=1,Xs(e,bi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Xs(e,bi(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=to.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Rc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=zc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ri,nt(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Pe,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=k.T,k.T=null,a=A.p,A.p=2,s=K,K|=4;try{al(e,t,n)}finally{K=s,A.p=a,k.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=jr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Ar(s.ownerDocument.documentElement,s)){if(c!==null&&Mr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=kr(s,h),v=kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,A.p=r,k.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{ol(e,t.alternate,t)}finally{K=i,A.p=r,k.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,ke();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),st(n),t=t.stateNode,Be&&typeof Be.onCommitFiberRoot==`function`)try{Be.onCommitFiberRoot(ze,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=k.T,i=A.p,A.p=2,k.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{k.T=t,A.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,la(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=st(su),r=k.T,a=A.p;try{A.p=32>n?32:n,k.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),Be&&typeof Be.onPostCommitFiberRoot==`function`)try{Be.onPostCommitFiberRoot(ze,o)}catch{}return!0}finally{A.p=a,k.T=r,Vu(e,t)}}function Wu(e,t,n){t=bi(n,t),t=Qs(e.stateNode,t,2),e=Ha(e,t,2),e!==null&&(tt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=bi(n,e),n=$s(2),r=Ha(t,n,2),r!==null&&(ec(n,r,t,e),tt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Ae()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=$e()),e=F(e,t),e!==null&&(tt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ee(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-He(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Xe(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ze(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ae(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-He(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Qe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Xe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&De(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ze(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&De(r),st(n)){case 2:case 8:n=Ne;break;case 32:n=Pe;break;case 268435456:n=Ie;break;default:n=Pe}return r=cd.bind(null,e),n=Ee(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&De(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Xe(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Ae()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Ee(Me,ad):od()})}function dd(){if(nd===0){var e=fa;e===0&&(e=Ke,Ke<<=1,!(Ke&261888)&&(Ke=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:rn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[ft]||null).action),o=r.submitter;o&&(t=(t=o[ft]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new En(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);ws(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),ws(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Qr.length;hd++){var gd=Qr[hd];$r(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}$r(Wr,`onAnimationEnd`),$r(Gr,`onAnimationIteration`),$r(Kr,`onAnimationStart`),$r(`dblclick`,`onDoubleClick`),$r(`focusin`,`onFocus`),$r(`focusout`,`onBlur`),$r(qr,`onTransitionRun`),$r(Jr,`onTransitionStart`),$r(Yr,`onTransitionCancel`),$r(Xr,`onTransitionEnd`),Ot(`onMouseEnter`,[`mouseout`,`mouseover`]),Ot(`onMouseLeave`,[`mouseout`,`mouseover`]),Ot(`onPointerEnter`,[`pointerout`,`pointerover`]),Ot(`onPointerLeave`,[`pointerout`,`pointerover`]),Dt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Dt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Dt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Dt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Dt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Dt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ei(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ei(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[mt];n===void 0&&(n=t[mt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Tt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!hn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=bt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}fn(function(){var r=a,i=sn(n),s=[];a:{var c=Zr.get(e);if(c!==void 0){var l=En,u=e;switch(e){case`keypress`:if(xn(n)===0)break a;case`keydown`:case`keyup`:l=Wn;break;case`focusin`:u=`focus`,l=Fn;break;case`focusout`:u=`blur`,l=Fn;break;case`beforeblur`:case`afterblur`:l=Fn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Nn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Pn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Kn;break;case Wr:case Gr:case Kr:l=In;break;case Xr:l=qn;break;case`scroll`:case`scrollend`:l=On;break;case`wheel`:l=Jn;break;case`copy`:case`cut`:case`paste`:l=Ln;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Gn;break;case`toggle`:case`beforetoggle`:l=P}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=pn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==on&&(u=n.relatedTarget||n.fromElement)&&(bt(u)||u[pt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?bt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Nn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Gn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:St(l),h=u==null?c:St(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,bt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?St(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=mr;else if(cr(c))if(hr)v=wr;else{v=Sr;var y=xr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&en(r.elementType)&&(v=mr):v=Cr;if(v&&=v(e,r)){lr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Kt(c,`number`,c.value)}switch(y=r?St(r):window,e){case`focusin`:(cr(y)||y.contentEditable===`true`)&&(Pr=y,Fr=r,Ir=null);break;case`focusout`:Ir=Fr=Pr=null;break;case`mousedown`:Lr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Lr=!1,Rr(s,n,i);break;case`selectionchange`:if(Nr)break;case`keydown`:case`keyup`:Rr(s,n,i)}var b;if(Xn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ir?nr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&($n&&n.locale!==`ko`&&(ir||x!==`onCompositionStart`?x===`onCompositionEnd`&&ir&&(b=bn()):(_n=i,vn=`value`in _n?_n.value:_n.textContent,ir=!0)),y=Ed(r,x),0<y.length&&(x=new Rn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=rr(n),b!==null&&(x.data=b)))),(b=Qn?ar(e,n):or(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Rn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=pn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=pn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=pn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=pn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Xt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Xt(e,``+r);break;case`className`:Pt(e,`class`,r);break;case`tabIndex`:Pt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Pt(e,n,r);break;case`style`:$t(e,r,o);break;case`data`:if(t!==`object`){Pt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=rn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=rn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=an);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=rn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Nt(e,`popover`,r);break;case`xlinkActuate`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Nt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=tn.get(n)||n,Nt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:$t(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Xt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Xt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=an);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Et.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ft]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Nt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Gt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&qt(e,!!r,n,!0):qt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Yt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(en(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Wt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?qt(e,!!n,n?[]:``,!1):qt(e,!!n,t,!0)):qt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Jt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(en(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[vt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),yt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[vt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);yt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=A.d;A.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=xt(e);t!==null&&t.tag===5&&t.type===`form`?Es(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Ut(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),wt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Ut(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Ut(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Ut(n.imageSizes)+`"]`)):i+=`[href="`+Ut(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=m({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),wt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Ut(r)+`"][href="`+Ut(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=m({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),wt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Ct(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=m({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);wt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Ct(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),wt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Ct(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),wt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=pe.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Ct(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Ct(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Ct(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Ut(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),wt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Ut(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Ut(n.href)+`"]`);if(r)return t.instance=r,wt(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),wt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,wt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),wt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,wt(a),a):(r=n,(a=mf.get(o))&&(r=m({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),wt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[vt]||a[dt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,wt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),wt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=et(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=et(0),this.hiddenUpdates=et(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ui(3,null,null,t),e.current=a,a.stateNode=e,t=ca(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},V(a),e}function tp(e){return e?(e=ci,e):ci}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Va(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ha(e,r,t),n!==null&&(hu(n,e,t),Ua(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=F(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ot(t);var n=F(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=2,up(e,t,n,r)}finally{A.p=a,k.T=i}}function lp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=8,up(e,t,n,r)}finally{A.p=a,k.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=xt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ye(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-He(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Ae()+500,id(0,!1))}}break;case 31:case 13:s=F(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=sn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=bt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(je()){case Me:return 2;case Ne:return 8;case Pe:case Fe:return 32;case Ie:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=xt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=bt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,lt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,lt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);on=r,n.target.dispatchEvent(r),on=null}else return t=xt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=xt(n);a!==null&&(e.splice(t,3),t-=3,ws(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ft]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ft]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[pt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));A.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:k,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{ze=zp.inject(Rp),Be=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=qs,s=Js,c=Ys;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[pt]=t.current,Sd(e),new Fp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=`modulepreload`,y=function(e){return`/`+e},b={},x=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=y(t,n),t in b)return;b[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:v,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},S=l(d(),1),C=`popstate`;function w(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ne(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:O(t)}return ie(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function te(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ne(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?re(t):t,state:n,key:t&&t.key||r||D(),unstable_mask:i}}function O({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function re(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ie(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u()+1;let d=te(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u();let i=te(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ae(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ae(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),T(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:O(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function oe(e,t,n=`/`){return k(e,t,n,!1)}function k(e,t,n,r){let i=N((typeof t==`string`?re(t):t).pathname||`/`,n);if(i==null)return null;let a=se(e);le(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=be(i);o=_e(a[e],t,r)}return o}function A(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function se(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Oe([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),se(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:he(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ce(e.path))a(e,t,!0,n)}),t}function ce(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ce(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function le(e){e.sort((e,t)=>e.score===t.score?ge(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ue=/^:[\w-]+$/,j=3,M=2,de=1,fe=10,pe=-2,me=e=>e===`*`;function he(e,t){let n=e.split(`/`),r=n.length;return n.some(me)&&(r+=pe),t&&(r+=M),n.filter(e=>!me(e)).reduce((e,t)=>e+(ue.test(t)?j:t===``?de:fe),r)}function ge(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function _e(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=ve({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=ve({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Oe([a,u.pathname]),pathnameBase:ke(Oe([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Oe([a,u.pathnameBase]))}return o}function ve(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ye(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ye(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function be(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function N(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var xe=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Se(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?re(e):e,a;return n?(n=n.replace(/\/\/+/g,`/`),a=n.startsWith(`/`)?Ce(n.substring(1),`/`):Ce(n,t)):a=t,{pathname:a,search:Ae(r),hash:je(i)}}function Ce(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function we(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Te(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ee(e){let t=Te(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function De(e,t,n,r=!1){let i;typeof e==`string`?i=re(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),we(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),we(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),we(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Se(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Oe=e=>e.join(`/`).replace(/\/\/+/g,`/`),ke=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Ae=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,je=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Me=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ne(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Pe(e){return e.map(e=>e.route.path).filter(Boolean).join(`/`).replace(/\/\/*/g,`/`)||`/`}var Fe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ie(e,t){let n=e;if(typeof n!=`string`||!xe.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Fe)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=N(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Le=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Le);var Re=[`GET`,...Le];new Set(Re);var ze=S.createContext(null);ze.displayName=`DataRouter`;var Be=S.createContext(null);Be.displayName=`DataRouterState`;var Ve=S.createContext(!1);function He(){return S.useContext(Ve)}var Ue=S.createContext({isTransitioning:!1});Ue.displayName=`ViewTransition`;var We=S.createContext(new Map);We.displayName=`Fetchers`;var Ge=S.createContext(null);Ge.displayName=`Await`;var Ke=S.createContext(null);Ke.displayName=`Navigation`;var qe=S.createContext(null);qe.displayName=`Location`;var Je=S.createContext({outlet:null,matches:[],isDataRoute:!1});Je.displayName=`Route`;var Ye=S.createContext(null);Ye.displayName=`RouteError`;var Xe=`REACT_ROUTER_ERROR`,Ze=`REDIRECT`,Qe=`ROUTE_ERROR_RESPONSE`;function $e(e){if(e.startsWith(`${Xe}:${Ze}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function et(e){if(e.startsWith(`${Xe}:${Qe}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Me(t.status,t.statusText,t.data)}catch{}}function tt(e,{relative:t}={}){T(nt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=S.useContext(Ke),{hash:i,pathname:a,search:o}=lt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Oe([n,a])),r.createHref({pathname:s,search:o,hash:i})}function nt(){return S.useContext(qe)!=null}function rt(){return T(nt(),`useLocation() may be used only in the context of a <Router> component.`),S.useContext(qe).location}var it=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function at(e){S.useContext(Ke).static||S.useLayoutEffect(e)}function ot(){let{isDataRoute:e}=S.useContext(Je);return e?Ot():st()}function st(){T(nt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=S.useContext(ze),{basename:t,navigator:n}=S.useContext(Ke),{matches:r}=S.useContext(Je),{pathname:i}=rt(),a=JSON.stringify(Ee(r)),o=S.useRef(!1);return at(()=>{o.current=!0}),S.useCallback((r,s={})=>{if(E(o.current,it),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=De(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Oe([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}S.createContext(null);function ct(){let{matches:e}=S.useContext(Je),t=e[e.length-1];return t?t.params:{}}function lt(e,{relative:t}={}){let{matches:n}=S.useContext(Je),{pathname:r}=rt(),i=JSON.stringify(Ee(n));return S.useMemo(()=>De(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function ut(e,t){return dt(e,t)}function dt(e,t,n){T(nt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=S.useContext(Ke),{matches:i}=S.useContext(Je),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;At(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=rt(),d;if(t){let e=typeof t==`string`?re(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=oe(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=vt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Oe([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Oe([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?S.createElement(qe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function ft(){let e=Dt(),t=Ne(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=S.createElement(S.Fragment,null,S.createElement(`p`,null,`💿 Hey developer 👋`),S.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,S.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,S.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),S.createElement(S.Fragment,null,S.createElement(`h2`,null,`Unexpected Application Error!`),S.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?S.createElement(`pre`,{style:i},n):null,o)}var pt=S.createElement(ft,null),mt=class extends S.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=et(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:S.createElement(Je.Provider,{value:this.props.routeContext},S.createElement(Ye.Provider,{value:e,children:this.props.component}));return this.context?S.createElement(gt,{error:e},t):t}};mt.contextType=Ve;var ht=new WeakMap;function gt({children:e,error:t}){let{basename:n}=S.useContext(Ke);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=$e(t.digest);if(e){let r=ht.get(t);if(r)throw r;let i=Ie(e.location,n);if(Fe&&!ht.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw ht.set(t,n),n}return S.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function _t({routeContext:e,match:t,children:n}){let r=S.useContext(ze);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),S.createElement(Je.Provider,{value:e},n)}function vt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:Pe(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||pt,o&&(s<0&&c===0?(At(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?S.createElement(n.route.Component,null):n.route.element?n.route.element:e,S.createElement(_t,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?S.createElement(mt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function yt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function bt(e){let t=S.useContext(ze);return T(t,yt(e)),t}function xt(e){let t=S.useContext(Be);return T(t,yt(e)),t}function St(e){let t=S.useContext(Je);return T(t,yt(e)),t}function Ct(e){let t=St(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function wt(){return Ct(`useRouteId`)}function Tt(){return xt(`useNavigation`).navigation}function Et(){let{matches:e,loaderData:t}=xt(`useMatches`);return S.useMemo(()=>e.map(e=>A(e,t)),[e,t])}function Dt(){let e=S.useContext(Ye),t=xt(`useRouteError`),n=Ct(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Ot(){let{router:e}=bt(`useNavigate`),t=Ct(`useNavigate`),n=S.useRef(!1);return at(()=>{n.current=!0}),S.useCallback(async(r,i={})=>{E(n.current,it),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var kt={};function At(e,t,n){!t&&!kt[e]&&(kt[e]=!0,E(!1,n))}S.useOptimistic,S.memo(jt);function jt({routes:e,future:t,state:n,isStatic:r,onError:i}){return dt(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function Mt(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Nt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){T(!nt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=S.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=re(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=S.useMemo(()=>{let e=N(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:S.createElement(Ke.Provider,{value:c},S.createElement(qe.Provider,{children:t,value:h}))}function Pt({children:e,location:t}){return ut(Ft(e),t)}S.Component;function Ft(e,t=[]){let n=[];return S.Children.forEach(e,(e,r)=>{if(!S.isValidElement(e))return;let i=[...t,r];if(e.type===S.Fragment){n.push.apply(n,Ft(e.props.children,i));return}T(e.type===Mt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Ft(e.props.children,i)),n.push(a)}),n}var It=`get`,Lt=`application/x-www-form-urlencoded`;function Rt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function zt(e){return Rt(e)&&e.tagName.toLowerCase()===`button`}function Bt(e){return Rt(e)&&e.tagName.toLowerCase()===`form`}function Vt(e){return Rt(e)&&e.tagName.toLowerCase()===`input`}function Ht(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ut(e,t){return e.button===0&&(!t||t===`_self`)&&!Ht(e)}function Wt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Gt(e,t){let n=Wt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Kt=null;function qt(){if(Kt===null)try{new FormData(document.createElement(`form`),0),Kt=!1}catch{Kt=!0}return Kt}var Jt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Yt(e){return e!=null&&!Jt.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Lt}"`),null):e}function Xt(e,t){let n,r,i,a,o;if(Bt(e)){let o=e.getAttribute(`action`);r=o?N(o,t):null,n=e.getAttribute(`method`)||It,i=Yt(e.getAttribute(`enctype`))||Lt,a=new FormData(e)}else if(zt(e)||Vt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?N(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||It,i=Yt(e.getAttribute(`formenctype`))||Yt(o.getAttribute(`enctype`))||Lt,a=new FormData(o,e),!qt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Rt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=It,r=null,i=Lt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Zt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Qt=/[&><\u2028\u2029]/g;function $t(e){return e.replace(Qt,e=>Zt[e])}function en(e,t){if(e===!1||e==null)throw Error(t)}function tn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&N(i.pathname,t)===`/`?i.pathname=`${t.replace(/\/$/,``)}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,``)}.${r}`,i}async function nn(e,t){if(e.id in t)return t[e.id];try{let n=await x(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function rn(e){return e!=null&&typeof e.page==`string`}function an(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function on(e,t,n){return dn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await nn(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(an).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function sn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function cn(e,t,{includeHydrateFallback:n}={}){return ln(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function ln(e){return[...new Set(e)]}function un(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function dn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!rn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(un(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function fn(){let e=S.useContext(ze);return en(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function pn(){let e=S.useContext(Be);return en(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var mn=S.createContext(void 0);mn.displayName=`FrameworkContext`;function hn(){let e=S.useContext(mn);return en(e,`You must render this element inside a <HydratedRouter> element`),e}function gn(e,t){let n=S.useContext(mn),[r,i]=S.useState(!1),[a,o]=S.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=S.useRef(null);S.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),S.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:_n(s,p),onBlur:_n(c,m),onMouseEnter:_n(l,p),onMouseLeave:_n(u,m),onTouchStart:_n(d,p)}]:[a,f,{}]:[!1,f,{}]}function _n(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function vn({page:e,...t}){let n=He(),{router:r}=fn(),i=S.useMemo(()=>oe(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?S.createElement(bn,{page:e,matches:i,...t}):S.createElement(xn,{page:e,matches:i,...t}):null}function yn(e){let{manifest:t,routeModules:n}=hn(),[r,i]=S.useState([]);return S.useEffect(()=>{let r=!1;return on(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function bn({page:e,matches:t,...n}){let r=rt(),{future:i}=hn(),{basename:a}=fn(),o=S.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=tn(e,a,i.unstable_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.unstable_trailingSlashAwareDataRequests,e,r,t]);return S.createElement(S.Fragment,null,o.map(e=>S.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function xn({page:e,matches:t,...n}){let r=rt(),{future:i,manifest:a,routeModules:o}=hn(),{basename:s}=fn(),{loaderData:c,matches:l}=pn(),u=S.useMemo(()=>sn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=S.useMemo(()=>sn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=S.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=tn(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=S.useMemo(()=>cn(d,a),[d,a]),m=yn(d);return S.createElement(S.Fragment,null,f.map(e=>S.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>S.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>S.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Sn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}S.Component;var Cn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Cn&&(window.__reactRouterVersion=`7.14.0`)}catch{}function wn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=S.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=S.useState({action:a.action,location:a.location}),c=S.useCallback(e=>{n===!1?s(e):S.startTransition(()=>s(e))},[n]);return S.useLayoutEffect(()=>a.listen(c),[a,c]),S.createElement(Nt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function Tn({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=S.useState({action:n.action,location:n.location}),o=S.useCallback(e=>{r===!1?a(e):S.startTransition(()=>a(e))},[r]);return S.useLayoutEffect(()=>n.listen(o),[n,o]),S.createElement(Nt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}Tn.displayName=`unstable_HistoryRouter`;var En=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Dn=S.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=S.useContext(Ke),v=typeof l==`string`&&En.test(l),y=Ie(l,h);l=y.to;let b=tt(l,{relative:r}),x=rt(),C=null;if(o){let e=De(o,[],x.unstable_mask?x.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Oe([h,e.pathname])),C=g.createHref(e)}let[w,ee,T]=gn(n,p),E=Pn(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let te=!(y.isExternal||i),ne=S.createElement(`a`,{...p,...T,href:(te?C:void 0)||y.absoluteURL||b,onClick:te?D:e,ref:Sn(m,ee),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return w&&!v?S.createElement(S.Fragment,null,ne,S.createElement(vn,{page:b})):ne});Dn.displayName=`Link`;var On=S.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=lt(a,{relative:c.relative}),d=rt(),f=S.useContext(Be),{navigator:p,basename:m}=S.useContext(Ke),h=f!=null&&Gn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=N(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),C={isActive:b,isPending:x,isTransitioning:h},w=b?e:void 0,ee;ee=typeof n==`function`?n(C):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(C):i;return S.createElement(Dn,{...c,"aria-current":w,className:ee,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(C):s)});On.displayName=`NavLink`;var kn=S.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=It,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=S.useContext(Ke),g=Rn(),_=zn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&En.test(s);return S.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?S.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});kn.displayName=`Form`;function An({getKey:e,storageKey:t,...n}){let r=S.useContext(mn),{basename:i}=S.useContext(Ke),a=rt(),o=Et();Un({getKey:e,storageKey:t});let s=S.useMemo(()=>{if(!r||!e)return null;let t=Hn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return S.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${$t(JSON.stringify(t||Bn))}, ${$t(JSON.stringify(s))})`}})}An.displayName=`ScrollRestoration`;function jn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Mn(e){let t=S.useContext(ze);return T(t,jn(e)),t}function Nn(e){let t=S.useContext(Be);return T(t,jn(e)),t}function Pn(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=ot(),d=rt(),f=lt(e,{relative:o});return S.useCallback(p=>{if(Ut(p,t)){p.preventDefault();let t=n===void 0?O(d)===O(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?S.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Fn(e){E(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=S.useRef(Wt(e)),n=S.useRef(!1),r=rt(),i=S.useMemo(()=>Gt(r.search,n.current?null:t.current),[r.search]),a=ot();return[i,S.useCallback((e,t)=>{let r=Wt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var In=0,Ln=()=>`__${String(++In)}__`;function Rn(){let{router:e}=Mn(`useSubmit`),{basename:t}=S.useContext(Ke),n=wt(),r=e.fetch,i=e.navigate;return S.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Xt(e,t);a.navigate===!1?await r(a.fetcherKey||Ln(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function zn(e,{relative:t}={}){let{basename:n}=S.useContext(Ke),r=S.useContext(Je);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...lt(e||`.`,{relative:t})},o=rt();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Oe([n,a.pathname])),O(a)}var Bn=`react-router-scroll-positions`,Vn={};function Hn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:N(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Un({getKey:e,storageKey:t}={}){let{router:n}=Mn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Nn(`useScrollRestoration`),{basename:a}=S.useContext(Ke),o=rt(),s=Et(),c=Tt();S.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Wn(S.useCallback(()=>{if(c.state===`idle`){let t=Hn(o,s,a,e);Vn[t]=window.scrollY}try{sessionStorage.setItem(t||Bn,JSON.stringify(Vn))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(S.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Bn);e&&(Vn=JSON.parse(e))}catch{}},[t]),S.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Vn,()=>window.scrollY,e?(t,n)=>Hn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),S.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Wn(e,t){let{capture:n}=t||{};S.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Gn(e,{relative:t}={}){let n=S.useContext(Ue);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Mn(`useViewTransitionState`),i=lt(e,{relative:t});if(!n.isTransitioning)return!1;let a=N(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=N(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ve(i.pathname,o)!=null||ve(i.pathname,a)!=null}var Kn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),qn=o(((e,t)=>{t.exports=Kn()})),Jn=l(_(),1),P=qn();function Yn(){let e=ot(),[t,n]=(0,S.useState)(``);return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #ffffff;
          color: #111827;
        }

        .hero {
          width: 100%;
          height: 420px;
          background-image: url('/images/help-bg3.png');
          background-size: cover;
          background-position: 75% center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding-left: 120px;
          padding-right: 40px;
          border-bottom: 1px solid #e5e7eb;
        }

        .hero-content {
          max-width: 760px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-content h1 {
          font-size: 62px;
          font-weight: 700;
          line-height: 1.08;
          color: #141726;
          margin-bottom: 22px;
        }

        .hero-content p {
          font-size: 19px;
          line-height: 1.75;
          color: #272c31;
          max-width: 680px;
          margin-bottom: 34px;
        }

        .hero-search-form {
          display: flex;
          align-items: stretch;
          gap: 12px;
          max-width: 700px;
        }

        .hero-search-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #d1d5db;
          border-radius: 999px;
          padding: 0 18px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }

        .hero-search-icon {
          font-size: 18px;
          color: #6b7280;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .hero-search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: #111827;
          padding: 16px 0;
        }

        .hero-search-input::placeholder {
          color: #6b7280;
        }

        .hero-search-btn {
          border: none;
          background: #2563eb;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          padding: 0 24px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .hero-search-btn:hover {
          transform: translateY(-1px);
          opacity: 0.96;
        }

        .support-actions {
          padding: 70px 40px 80px;
          background: #f8fafc;
        }

        .support-actions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .support-actions-header {
          text-align: center;
          margin-bottom: 42px;
        }

        .support-actions-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 10px;
        }

        .support-actions-header p {
          font-size: 17px;
          color: #4b5563;
          line-height: 1.6;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .action-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 34px 28px;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .action-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
          border-color: #d1d5db;
        }

        .action-icon {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .action-icon svg {
          width: 38px;
          height: 38px;
          stroke: #111827;
          stroke-width: 1.8;
          fill: none;
        }

        .action-card h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .action-card p {
          font-size: 16px;
          line-height: 1.7;
          color: #4b5563;
          max-width: 280px;
        }

        @media (max-width: 768px) {
          .action-grid {
            grid-template-columns: 1fr;
          }

          .hero-search-form {
                flex-direction: column;
                max-width: 100%;
            }

          .hero-search-btn {
                height: 50px;
            }
        }
      `}),(0,P.jsx)(`section`,{className:`hero`,children:(0,P.jsxs)(`div`,{className:`hero-content`,children:[(0,P.jsx)(`h1`,{children:`How Can We Help?`}),(0,P.jsx)(`p`,{children:`Report maintenance issues related to university rooms, labs, or equipment. Our support team will review and resolve your request as quickly as possible.`}),(0,P.jsxs)(`form`,{className:`hero-search-form`,onSubmit:n=>{n.preventDefault();let r=t.trim();if(!r){e(`/featured`);return}e(`/featured?search=${encodeURIComponent(r)}`)},children:[(0,P.jsxs)(`div`,{className:`hero-search-input-wrap`,children:[(0,P.jsx)(`span`,{className:`hero-search-icon`,children:`⌕`}),(0,P.jsx)(`input`,{type:`text`,className:`hero-search-input`,placeholder:`Search issues, buildings, categories, or locations`,value:t,onChange:e=>n(e.target.value)})]}),(0,P.jsx)(`button`,{type:`submit`,className:`hero-search-btn`,children:`Search`})]})]})}),(0,P.jsx)(`section`,{className:`support-actions`,children:(0,P.jsxs)(`div`,{className:`support-actions-container`,children:[(0,P.jsxs)(`div`,{className:`support-actions-header`,children:[(0,P.jsx)(`h2`,{children:`Quick Support Actions`}),(0,P.jsx)(`p`,{children:`Select an option below to create a request, review your submitted reports, or explore common support discussions.`})]}),(0,P.jsxs)(`div`,{className:`action-grid`,children:[(0,P.jsxs)(`div`,{className:`action-card`,onClick:()=>e(`/report`),children:[(0,P.jsx)(`div`,{className:`action-icon`,children:(0,P.jsxs)(`svg`,{viewBox:`0 0 24 24`,children:[(0,P.jsx)(`path`,{d:`M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4V7.5z`}),(0,P.jsx)(`path`,{d:`M9 6v12`})]})}),(0,P.jsx)(`h3`,{children:`Report an Issue`}),(0,P.jsx)(`p`,{children:`Create a new support ticket for maintenance problems, damaged equipment, or facility-related concerns.`})]}),(0,P.jsxs)(`div`,{className:`action-card`,onClick:()=>e(`/my-reports`),children:[(0,P.jsx)(`div`,{className:`action-icon`,children:(0,P.jsxs)(`svg`,{viewBox:`0 0 24 24`,children:[(0,P.jsx)(`path`,{d:`M9 4h6`}),(0,P.jsx)(`path`,{d:`M10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1z`}),(0,P.jsx)(`path`,{d:`M8 5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1`}),(0,P.jsx)(`path`,{d:`M9 10h6`}),(0,P.jsx)(`path`,{d:`M9 14h6`})]})}),(0,P.jsx)(`h3`,{children:`My Reports`}),(0,P.jsx)(`p`,{children:`View previously submitted tickets, track progress, and check the status of issues you have already reported.`})]}),(0,P.jsxs)(`div`,{className:`action-card`,onClick:()=>e(`/featured`),children:[(0,P.jsx)(`div`,{className:`action-icon`,children:(0,P.jsxs)(`svg`,{viewBox:`0 0 24 24`,children:[(0,P.jsx)(`path`,{d:`M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7z`}),(0,P.jsx)(`path`,{d:`M8 9h8`}),(0,P.jsx)(`path`,{d:`M8 12h5`})]})}),(0,P.jsx)(`h3`,{children:`Featured Conversations`}),(0,P.jsx)(`p`,{children:`Browse highlighted discussions, useful updates, and frequently explored support topics from the help centre.`})]})]})]})})]})}function Xn(e,t){return function(){return e.apply(t,arguments)}}var{toString:Zn}=Object.prototype,{getPrototypeOf:Qn}=Object,{iterator:$n,toStringTag:er}=Symbol,tr=(e=>t=>{let n=Zn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),nr=e=>(e=e.toLowerCase(),t=>tr(t)===e),rr=e=>t=>typeof t===e,{isArray:ir}=Array,ar=rr(`undefined`);function or(e){return e!==null&&!ar(e)&&e.constructor!==null&&!ar(e.constructor)&&ur(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var sr=nr(`ArrayBuffer`);function cr(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&sr(e.buffer),t}var lr=rr(`string`),ur=rr(`function`),dr=rr(`number`),fr=e=>typeof e==`object`&&!!e,pr=e=>e===!0||e===!1,mr=e=>{if(tr(e)!==`object`)return!1;let t=Qn(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(er in e)&&!($n in e)},hr=e=>{if(!fr(e)||or(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},gr=nr(`Date`),_r=nr(`File`),vr=e=>!!(e&&e.uri!==void 0),yr=e=>e&&e.getParts!==void 0,br=nr(`Blob`),xr=nr(`FileList`),Sr=e=>fr(e)&&ur(e.pipe);function Cr(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var wr=Cr(),Tr=wr.FormData===void 0?void 0:wr.FormData,Er=e=>{let t;return e&&(Tr&&e instanceof Tr||ur(e.append)&&((t=tr(e))===`formdata`||t===`object`&&ur(e.toString)&&e.toString()===`[object FormData]`))},Dr=nr(`URLSearchParams`),[Or,kr,Ar,jr]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(nr),Mr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function Nr(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),ir(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(or(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Pr(e,t){if(or(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}var Fr=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,Ir=e=>!ar(e)&&e!==Fr;function Lr(){let{caseless:e,skipUndefined:t}=Ir(this)&&this||{},n={},r=(r,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=e&&Pr(n,i)||i;mr(n[a])&&mr(r)?n[a]=Lr(n[a],r):mr(r)?n[a]=Lr({},r):ir(r)?n[a]=r.slice():(!t||!ar(r))&&(n[a]=r)};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&Nr(arguments[e],r);return n}var Rr=(e,t,n,{allOwnKeys:r}={})=>(Nr(t,(t,r)=>{n&&ur(t)?Object.defineProperty(e,r,{value:Xn(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),zr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Br=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,`constructor`,{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,`super`,{value:t.prototype}),n&&Object.assign(e.prototype,n)},Vr=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&Qn(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Hr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Ur=e=>{if(!e)return null;if(ir(e))return e;let t=e.length;if(!dr(t))return null;let n=Array(t);for(;t-- >0;)n[t]=e[t];return n},Wr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&Qn(Uint8Array)),Gr=(e,t)=>{let n=(e&&e[$n]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},Kr=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},qr=nr(`HTMLFormElement`),Jr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),Yr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Xr=nr(`RegExp`),Zr=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};Nr(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},Qr=e=>{Zr(e,(t,n)=>{if(ur(e)&&[`arguments`,`caller`,`callee`].indexOf(n)!==-1)return!1;let r=e[n];if(ur(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},$r=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return ir(e)?r(e):r(String(e).split(t)),n},ei=()=>{},ti=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function ni(e){return!!(e&&ur(e.append)&&e[er]===`FormData`&&e[$n])}var ri=e=>{let t=Array(10),n=(e,r)=>{if(fr(e)){if(t.indexOf(e)>=0)return;if(or(e))return e;if(!(`toJSON`in e)){t[r]=e;let i=ir(e)?[]:{};return Nr(e,(e,t)=>{let a=n(e,r+1);!ar(a)&&(i[t]=a)}),t[r]=void 0,i}}return e};return n(e,0)},ii=nr(`AsyncFunction`),ai=e=>e&&(fr(e)||ur(e))&&ur(e.then)&&ur(e.catch),oi=((e,t)=>e?setImmediate:t?((e,t)=>(Fr.addEventListener(`message`,({source:n,data:r})=>{n===Fr&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),Fr.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,ur(Fr.postMessage)),F={isArray:ir,isArrayBuffer:sr,isBuffer:or,isFormData:Er,isArrayBufferView:cr,isString:lr,isNumber:dr,isBoolean:pr,isObject:fr,isPlainObject:mr,isEmptyObject:hr,isReadableStream:Or,isRequest:kr,isResponse:Ar,isHeaders:jr,isUndefined:ar,isDate:gr,isFile:_r,isReactNativeBlob:vr,isReactNative:yr,isBlob:br,isRegExp:Xr,isFunction:ur,isStream:Sr,isURLSearchParams:Dr,isTypedArray:Wr,isFileList:xr,forEach:Nr,merge:Lr,extend:Rr,trim:Mr,stripBOM:zr,inherits:Br,toFlatObject:Vr,kindOf:tr,kindOfTest:nr,endsWith:Hr,toArray:Ur,forEachEntry:Gr,matchAll:Kr,isHTMLForm:qr,hasOwnProperty:Yr,hasOwnProp:Yr,reduceDescriptors:Zr,freezeMethods:Qr,toObjectSet:$r,toCamelCase:Jr,noop:ei,toFiniteNumber:ti,findKey:Pr,global:Fr,isContextDefined:Ir,isSpecCompliantForm:ni,toJSONObject:ri,isAsyncFn:ii,isThenable:ai,setImmediate:oi,asap:typeof queueMicrotask<`u`?queueMicrotask.bind(Fr):typeof process<`u`&&process.nextTick||oi,isIterable:e=>e!=null&&ur(e[$n])},I=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return s.cause=t,s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,`message`,{value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:F.toJSONObject(this.config),code:this.code,status:this.status}}};I.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,I.ERR_BAD_OPTION=`ERR_BAD_OPTION`,I.ECONNABORTED=`ECONNABORTED`,I.ETIMEDOUT=`ETIMEDOUT`,I.ERR_NETWORK=`ERR_NETWORK`,I.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,I.ERR_DEPRECATED=`ERR_DEPRECATED`,I.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,I.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,I.ERR_CANCELED=`ERR_CANCELED`,I.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,I.ERR_INVALID_URL=`ERR_INVALID_URL`;function si(e){return F.isPlainObject(e)||F.isArray(e)}function ci(e){return F.endsWith(e,`[]`)?e.slice(0,-2):e}function li(e,t,n){return e?e.concat(t).map(function(e,t){return e=ci(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function ui(e){return F.isArray(e)&&!e.some(si)}var di=F.toFlatObject(F,{},null,function(e){return/^is[A-Z]/.test(e)});function fi(e,t,n){if(!F.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=F.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!F.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||l,a=n.dots,o=n.indexes,s=(n.Blob||typeof Blob<`u`&&Blob)&&F.isSpecCompliantForm(t);if(!F.isFunction(i))throw TypeError(`visitor must be a function`);function c(e){if(e===null)return``;if(F.isDate(e))return e.toISOString();if(F.isBoolean(e))return e.toString();if(!s&&F.isBlob(e))throw new I(`Blob is not supported. Use a Buffer instead.`);return F.isArrayBuffer(e)||F.isTypedArray(e)?s&&typeof Blob==`function`?new Blob([e]):Buffer.from(e):e}function l(e,n,i){let s=e;if(F.isReactNative(t)&&F.isReactNativeBlob(e))return t.append(li(i,n,a),c(e)),!1;if(e&&!i&&typeof e==`object`){if(F.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(F.isArray(e)&&ui(e)||(F.isFileList(e)||F.endsWith(n,`[]`))&&(s=F.toArray(e)))return n=ci(n),s.forEach(function(e,r){!(F.isUndefined(e)||e===null)&&t.append(o===!0?li([n],r,a):o===null?n:n+`[]`,c(e))}),!1}return si(e)?!0:(t.append(li(i,n,a),c(e)),!1)}let u=[],d=Object.assign(di,{defaultVisitor:l,convertValue:c,isVisitable:si});function f(e,n){if(!F.isUndefined(e)){if(u.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));u.push(e),F.forEach(e,function(e,r){(!(F.isUndefined(e)||e===null)&&i.call(t,e,F.isString(r)?r.trim():r,n,d))===!0&&f(e,n?n.concat(r):[r])}),u.pop()}}if(!F.isObject(e))throw TypeError(`data must be an object`);return f(e),t}function pi(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`,"%00":`\0`};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(e){return t[e]})}function mi(e,t){this._pairs=[],e&&fi(e,this,t)}var hi=mi.prototype;hi.append=function(e,t){this._pairs.push([e,t])},hi.toString=function(e){let t=e?function(t){return e.call(this,t,pi)}:pi;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function gi(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function _i(e,t,n){if(!t)return e;let r=n&&n.encode||gi,i=F.isFunction(n)?{serialize:n}:n,a=i&&i.serialize,o;if(o=a?a(t,i):F.isURLSearchParams(t)?t.toString():new mi(t,i).toString(r),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var vi=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){F.forEach(this.handlers,function(t){t!==null&&e(t)})}},yi={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},bi={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:mi,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},xi=s({hasBrowserEnv:()=>Si,hasStandardBrowserEnv:()=>wi,hasStandardBrowserWebWorkerEnv:()=>Ti,navigator:()=>Ci,origin:()=>Ei}),Si=typeof window<`u`&&typeof document<`u`,Ci=typeof navigator==`object`&&navigator||void 0,wi=Si&&(!Ci||[`ReactNative`,`NativeScript`,`NS`].indexOf(Ci.product)<0),Ti=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,Ei=Si&&window.location.href||`http://localhost`,L={...xi,...bi};function Di(e,t){return fi(e,new L.classes.URLSearchParams,{visitor:function(e,t,n,r){return L.isNode&&F.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}function Oi(e){return F.matchAll(/\w+|\[(\w*)]/g,e).map(e=>e[0]===`[]`?``:e[1]||e[0])}function ki(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function Ai(e){function t(e,n,r,i){let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&F.isArray(r)?r.length:a,s?(F.hasOwnProp(r,a)?r[a]=[r[a],n]:r[a]=n,!o):((!r[a]||!F.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&F.isArray(r[a])&&(r[a]=ki(r[a])),!o)}if(F.isFormData(e)&&F.isFunction(e.entries)){let n={};return F.forEachEntry(e,(e,r)=>{t(Oi(e),r,n,0)}),n}return null}function ji(e,t,n){if(F.isString(e))try{return(t||JSON.parse)(e),F.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var Mi={transitional:yi,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=F.isObject(e);if(i&&F.isHTMLForm(e)&&(e=new FormData(e)),F.isFormData(e))return r?JSON.stringify(Ai(e)):e;if(F.isArrayBuffer(e)||F.isBuffer(e)||F.isStream(e)||F.isFile(e)||F.isBlob(e)||F.isReadableStream(e))return e;if(F.isArrayBufferView(e))return e.buffer;if(F.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return Di(e,this.formSerializer).toString();if((a=F.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let t=this.env&&this.env.FormData;return fi(a?{"files[]":e}:e,t&&new t,this.formSerializer)}}return i||r?(t.setContentType(`application/json`,!1),ji(e)):e}],transformResponse:[function(e){let t=this.transitional||Mi.transitional,n=t&&t.forcedJSONParsing,r=this.responseType===`json`;if(F.isResponse(e)||F.isReadableStream(e))return e;if(e&&F.isString(e)&&(n&&!this.responseType||r)){let n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e,this.parseReviver)}catch(e){if(n)throw e.name===`SyntaxError`?I.from(e,I.ERR_BAD_RESPONSE,this,null,this.response):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:L.classes.FormData,Blob:L.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};F.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`],e=>{Mi.headers[e]={}});var Ni=F.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),Pi=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&Ni[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t},R=Symbol(`internals`);function z(e){return e&&String(e).trim().toLowerCase()}function Fi(e){return e===!1||e==null?e:F.isArray(e)?e.map(Fi):String(e).replace(/[\r\n]+$/,``)}function Ii(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var Li=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ri(e,t,n,r,i){if(F.isFunction(r))return r.call(this,t,n);if(i&&(t=n),F.isString(t)){if(F.isString(r))return t.indexOf(r)!==-1;if(F.isRegExp(r))return r.test(t)}}function zi(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Bi(e,t){let n=F.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var Vi=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=z(t);if(!i)throw Error(`header name must be a non-empty string`);let a=F.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=Fi(e))}let a=(e,t)=>F.forEach(e,(e,n)=>i(e,n,t));if(F.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(F.isString(e)&&(e=e.trim())&&!Li(e))a(Pi(e),t);else if(F.isObject(e)&&F.isIterable(e)){let n={},r,i;for(let t of e){if(!F.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);n[i=t[0]]=(r=n[i])?F.isArray(r)?[...r,t[1]]:[r,t[1]]:t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=z(e),e){let n=F.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return Ii(e);if(F.isFunction(t))return t.call(this,e,n);if(F.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=z(e),e){let n=F.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||Ri(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=z(e),e){let i=F.findKey(n,e);i&&(!t||Ri(n,n[i],i,t))&&(delete n[i],r=!0)}}return F.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||Ri(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return F.forEach(this,(r,i)=>{let a=F.findKey(n,i);if(a){t[a]=Fi(r),delete t[i];return}let o=e?zi(i):String(i).trim();o!==i&&delete t[i],t[o]=Fi(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return F.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&F.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[R]=this[R]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=z(e);t[r]||(Bi(n,e),t[r]=!0)}return F.isArray(e)?e.forEach(r):r(e),this}};Vi.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),F.reduceDescriptors(Vi.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),F.freezeMethods(Vi);function Hi(e,t){let n=this||Mi,r=t||n,i=Vi.from(r.headers),a=r.data;return F.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function Ui(e){return!!(e&&e.__CANCEL__)}var Wi=class extends I{constructor(e,t,n){super(e??`canceled`,I.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function Gi(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new I(`Request failed with status code `+n.status,[I.ERR_BAD_REQUEST,I.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Ki(e){let t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||``}function qi(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function Ji(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var Yi=(e,t,n=3)=>{let r=0,i=qi(50,250);return Ji(n=>{let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=a-r,c=i(s),l=a<=o;r=a,e({loaded:a,total:o,progress:o?a/o:void 0,bytes:s,rate:c||void 0,estimated:c&&o&&l?(o-a)/c:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},Xi=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Zi=e=>(...t)=>F.asap(()=>e(...t)),Qi=L.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,L.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(L.origin),L.navigator&&/(msie|trident)/i.test(L.navigator.userAgent)):()=>!0,$i=L.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];F.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),F.isString(r)&&s.push(`path=${r}`),F.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),F.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.match(RegExp(`(?:^|; )`+e+`=([^;]*)`));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function ea(e){return typeof e==`string`?/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e):!1}function ta(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}function na(e,t,n){let r=!ea(t);return e&&(r||n==0)?ta(e,t):t}var ra=e=>e instanceof Vi?{...e}:e;function ia(e,t){t||={};let n={};function r(e,t,n,r){return F.isPlainObject(e)&&F.isPlainObject(t)?F.merge.call({caseless:r},e,t):F.isPlainObject(t)?F.merge({},t):F.isArray(t)?t.slice():t}function i(e,t,n,i){if(!F.isUndefined(t))return r(e,t,n,i);if(!F.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!F.isUndefined(t))return r(void 0,t)}function o(e,t){if(!F.isUndefined(t))return r(void 0,t);if(!F.isUndefined(e))return r(void 0,e)}function s(n,i,a){if(a in t)return r(n,i);if(a in e)return r(void 0,n)}let c={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:s,headers:(e,t,n)=>i(ra(e),ra(t),n,!0)};return F.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=F.hasOwnProp(c,r)?c[r]:i,o=a(e[r],t[r],r);F.isUndefined(o)&&a!==s||(n[r]=o)}),n}var aa=e=>{let t=ia({},e),{data:n,withXSRFToken:r,xsrfHeaderName:i,xsrfCookieName:a,headers:o,auth:s}=t;if(t.headers=o=Vi.from(o),t.url=_i(na(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),s&&o.set(`Authorization`,`Basic `+btoa((s.username||``)+`:`+(s.password?unescape(encodeURIComponent(s.password)):``))),F.isFormData(n)){if(L.hasStandardBrowserEnv||L.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(F.isFunction(n.getHeaders)){let e=n.getHeaders(),t=[`content-type`,`content-length`];Object.entries(e).forEach(([e,n])=>{t.includes(e.toLowerCase())&&o.set(e,n)})}}if(L.hasStandardBrowserEnv&&(r&&F.isFunction(r)&&(r=r(t)),r||r!==!1&&Qi(t.url))){let e=i&&a&&$i.read(a);e&&o.set(i,e)}return t},oa=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=aa(e),i=r.data,a=Vi.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=Vi.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());Gi(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf(`file:`)===0)||setTimeout(g)},h.onabort=function(){h&&=(n(new I(`Request aborted`,I.ECONNABORTED,e,h)),null)},h.onerror=function(t){let r=new I(t&&t.message?t.message:`Network Error`,I.ERR_NETWORK,e,h);r.event=t||null,n(r),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||yi;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new I(t,i.clarifyTimeoutError?I.ETIMEDOUT:I.ECONNABORTED,e,h)),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&F.forEach(a.toJSON(),function(e,t){h.setRequestHeader(t,e)}),F.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=Yi(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=Yi(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new Wi(null,e,h):t),h.abort(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=Ki(r.url);if(_&&L.protocols.indexOf(_)===-1){n(new I(`Unsupported protocol `+_+`:`,I.ERR_BAD_REQUEST,e));return}h.send(i||null)})},sa=(e,t)=>{let{length:n}=e=e?e.filter(Boolean):[];if(t||n){let n=new AbortController,r,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof I?t:new Wi(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new I(`timeout of ${t}ms exceeded`,I.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i));let{signal:s}=n;return s.unsubscribe=()=>F.asap(o),s}},ca=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},la=async function*(e,t){for await(let n of ua(e))yield*ca(n,t)},ua=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},da=(e,t,n,r)=>{let i=la(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})},fa=64*1024,{isFunction:pa}=F,ma=(({Request:e,Response:t})=>({Request:e,Response:t}))(F.global),{ReadableStream:ha,TextEncoder:ga}=F.global,_a=(e,...t)=>{try{return!!e(...t)}catch{return!1}},va=e=>{e=F.merge.call({skipUndefined:!0},ma,e);let{fetch:t,Request:n,Response:r}=e,i=t?pa(t):typeof fetch==`function`,a=pa(n),o=pa(r);if(!i)return!1;let s=i&&pa(ha),c=i&&(typeof ga==`function`?(e=>t=>e.encode(t))(new ga):async e=>new Uint8Array(await new n(e).arrayBuffer())),l=a&&s&&_a(()=>{let e=!1,t=new ha,r=new n(L.origin,{body:t,method:`POST`,get duplex(){return e=!0,`half`}}).headers.has(`Content-Type`);return t.cancel(),e&&!r}),u=o&&s&&_a(()=>F.isReadableStream(new r(``).body)),d={stream:u&&(e=>e.body)};i&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!d[e]&&(d[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new I(`Response type '${e}' is not supported`,I.ERR_NOT_SUPPORT,n)})});let f=async e=>{if(e==null)return 0;if(F.isBlob(e))return e.size;if(F.isSpecCompliantForm(e))return(await new n(L.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(F.isArrayBufferView(e)||F.isArrayBuffer(e))return e.byteLength;if(F.isURLSearchParams(e)&&(e+=``),F.isString(e))return(await c(e)).byteLength},p=async(e,t)=>F.toFiniteNumber(e.getContentLength())??f(t);return async e=>{let{url:i,method:o,data:s,signal:c,cancelToken:f,timeout:m,onDownloadProgress:h,onUploadProgress:g,responseType:_,headers:v,withCredentials:y=`same-origin`,fetchOptions:b}=aa(e),x=t||fetch;_=_?(_+``).toLowerCase():`text`;let S=sa([c,f&&f.toAbortSignal()],m),C=null,w=S&&S.unsubscribe&&(()=>{S.unsubscribe()}),ee;try{if(g&&l&&o!==`get`&&o!==`head`&&(ee=await p(v,s))!==0){let e=new n(i,{method:`POST`,body:s,duplex:`half`}),t;if(F.isFormData(s)&&(t=e.headers.get(`content-type`))&&v.setContentType(t),e.body){let[t,n]=Xi(ee,Yi(Zi(g)));s=da(e.body,fa,t,n)}}F.isString(y)||(y=y?`include`:`omit`);let t=a&&`credentials`in n.prototype,c={...b,signal:S,method:o.toUpperCase(),headers:v.normalize().toJSON(),body:s,duplex:`half`,credentials:t?y:void 0};C=a&&new n(i,c);let f=await(a?x(C,b):x(i,c)),m=u&&(_===`stream`||_===`response`);if(u&&(h||m&&w)){let e={};[`status`,`statusText`,`headers`].forEach(t=>{e[t]=f[t]});let t=F.toFiniteNumber(f.headers.get(`content-length`)),[n,i]=h&&Xi(t,Yi(Zi(h),!0))||[];f=new r(da(f.body,fa,n,()=>{i&&i(),w&&w()}),e)}_||=`text`;let T=await d[F.findKey(d,_)||`text`](f,e);return!m&&w&&w(),await new Promise((t,n)=>{Gi(t,n,{data:T,headers:Vi.from(f.headers),status:f.status,statusText:f.statusText,config:e,request:C})})}catch(t){throw w&&w(),t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)?Object.assign(new I(`Network Error`,I.ERR_NETWORK,e,C,t&&t.response),{cause:t.cause||t}):I.from(t,t&&t.code,e,C,t&&t.response)}}},ya=new Map,ba=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=ya;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:va(t)),l=c;return c};ba();var xa={http:null,xhr:oa,fetch:{get:ba}};F.forEach(xa,(e,t)=>{if(e){try{Object.defineProperty(e,`name`,{value:t})}catch{}Object.defineProperty(e,`adapterName`,{value:t})}});var Sa=e=>`- ${e}`,Ca=e=>F.isFunction(e)||e===null||e===!1;function wa(e,t){e=F.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!Ca(r)&&(i=xa[(n=String(r)).toLowerCase()],i===void 0))throw new I(`Unknown adapter '${n}'`);if(i&&(F.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new I(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(Sa).join(`
`):` `+Sa(e[0]):`as no adapter specified`),`ERR_NOT_SUPPORT`)}return i}var Ta={getAdapter:wa,adapters:xa};function Ea(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Wi(null,e)}function Da(e){return Ea(e),e.headers=Vi.from(e.headers),e.data=Hi.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),Ta.getAdapter(e.adapter||Mi.adapter,e)(e).then(function(t){return Ea(e),t.data=Hi.call(e,e.transformResponse,t),t.headers=Vi.from(t.headers),t},function(t){return Ui(t)||(Ea(e),t&&t.response&&(t.response.data=Hi.call(e,e.transformResponse,t.response),t.response.headers=Vi.from(t.response.headers))),Promise.reject(t)})}var Oa=`1.14.0`,ka={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{ka[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var Aa={};ka.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Oa+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new I(r(i,` has been removed`+(t?` in `+t:``)),I.ERR_DEPRECATED);return t&&!Aa[i]&&(Aa[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),e?e(n,i,a):!0}},ka.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function ja(e,t,n){if(typeof e!=`object`)throw new I(`options must be an object`,I.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-- >0;){let a=r[i],o=t[a];if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new I(`option `+a+` must be `+n,I.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new I(`Unknown option `+a,I.ERR_BAD_OPTION)}}var Ma={assertOptions:ja,validators:ka},Na=Ma.validators,Pa=class{constructor(e){this.defaults=e||{},this.interceptors={request:new vi,response:new vi}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=t.stack?t.stack.replace(/^.+\n/,``):``;try{e.stack?n&&!String(e.stack).endsWith(n.replace(/^.+\n.+\n/,``))&&(e.stack+=`
`+n):e.stack=n}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=ia(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&Ma.assertOptions(n,{silentJSONParsing:Na.transitional(Na.boolean),forcedJSONParsing:Na.transitional(Na.boolean),clarifyTimeoutError:Na.transitional(Na.boolean),legacyInterceptorReqResOrdering:Na.transitional(Na.boolean)},!1),r!=null&&(F.isFunction(r)?t.paramsSerializer={serialize:r}:Ma.assertOptions(r,{encode:Na.function,serialize:Na.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),Ma.assertOptions(t,{baseUrl:Na.spelling(`baseURL`),withXsrfToken:Na.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&F.merge(i.common,i[t.method]);i&&F.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`common`],e=>{delete i[e]}),t.headers=Vi.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||yi;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[Da.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=Da.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=ia(this.defaults,e),_i(na(e.baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}};F.forEach([`delete`,`get`,`head`,`options`],function(e){Pa.prototype[e]=function(t,n){return this.request(ia(n||{},{method:e,url:t,data:(n||{}).data}))}}),F.forEach([`post`,`put`,`patch`],function(e){function t(t){return function(n,r,i){return this.request(ia(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}Pa.prototype[e]=t(),Pa.prototype[e+`Form`]=t(!0)});var Fa=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new Wi(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function Ia(e){return function(t){return e.apply(null,t)}}function La(e){return F.isObject(e)&&e.isAxiosError===!0}var Ra={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ra).forEach(([e,t])=>{Ra[t]=e});function za(e){let t=new Pa(e),n=Xn(Pa.prototype.request,t);return F.extend(n,Pa.prototype,t,{allOwnKeys:!0}),F.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return za(ia(e,t))},n}var B=za(Mi);B.Axios=Pa,B.CanceledError=Wi,B.CancelToken=Fa,B.isCancel=Ui,B.VERSION=Oa,B.toFormData=fi,B.AxiosError=I,B.Cancel=B.CanceledError,B.all=function(e){return Promise.all(e)},B.spread=Ia,B.isAxiosError=La,B.mergeConfig=ia,B.AxiosHeaders=Vi,B.formToJSON=e=>Ai(F.isHTMLForm(e)?new FormData(e):e),B.getAdapter=Ta.getAdapter,B.HttpStatusCode=Ra,B.default=B;var V=B.create({baseURL:`http://localhost:8080/api`}),Ba=()=>V.get(`/issues`),Va=e=>V.get(`/issues/${e}`),Ha=()=>V.get(`/issues/my`),Ua=e=>V.post(`/issues`,e,{headers:{"Content-Type":`multipart/form-data`}}),Wa=(e,t)=>V.post(`/issues/${e}/comments`,t,{headers:{"Content-Type":`multipart/form-data`}}),Ga=e=>V.patch(`/issues/${e}/close`),Ka=e=>V.delete(`/issues/${e}`),qa=(e,t)=>V.delete(`/issues/${e}/comments/${t}`),Ja=(e,t,n)=>V.patch(`/issues/${e}/comments/${t}`,n,{headers:{"Content-Type":`multipart/form-data`}});function Ya(){let e=ot(),t=(0,S.useMemo)(()=>[`Lecture Hall`,`Computer Lab`,`Classroom`,`Staff Room`,`Meeting Room`],[]),n={name:`Student User`,email:`student@sliit.lk`,title:``,category:``,priority:``,locationType:``,building:``,roomNumber:``,assetId:``,contactNumber:``,incidentDate:``,description:``},[r,i]=(0,S.useState)(n),[a,o]=(0,S.useState)({}),[s,c]=(0,S.useState)(``),[l,u]=(0,S.useState)([]),[d,f]=(0,S.useState)(``),[p,m]=(0,S.useState)(``),h=(0,S.useRef)(null);(0,S.useEffect)(()=>{let e=new Date,t=e.toISOString().split(`T`)[0],n=new Date;n.setDate(e.getDate()-30);let r=n.toISOString().split(`T`)[0];i(e=>({...e,incidentDate:e.incidentDate||t})),_({min:r,max:t})},[]);let[g,_]=(0,S.useState)({min:``,max:``}),v=t.includes(r.locationType),y=v?`Room / Lab Number *`:r.locationType===`Corridor / Common Area`||r.locationType===`Washroom`||r.locationType===`Outdoor Area`||r.locationType===`Other`?`Exact Location Reference`:`Room / Lab Number`,b=v?`Example: Lab 03 / A-204 / LH-07`:r.locationType===`Corridor / Common Area`||r.locationType===`Washroom`||r.locationType===`Outdoor Area`||r.locationType===`Other`?`Add nearby reference`:`Enter room, lab, or space reference if available`,x=v?`Required for lecture halls, labs, classrooms, staff rooms, and meeting rooms.`:r.locationType===`Corridor / Common Area`||r.locationType===`Washroom`||r.locationType===`Outdoor Area`||r.locationType===`Other`?`Optional. Helps identify the exact spot within a larger area.`:`Add the exact space reference when available.`,C=e=>{let{name:n,value:r}=e.target,a=r;n===`contactNumber`&&(a=r.replace(/\D/g,``).slice(0,10)),i(e=>({...e,[n]:a,...n===`locationType`&&!t.includes(a)?{roomNumber:``}:{}}))},w=e=>{f(``);let t=Array.from(e.target.files||[]);if(t.length!==0){if(t.filter(e=>!e.type.startsWith(`image/`)).length>0){f(`Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.`),e.target.value=``;return}if(l.length+t.length>3){f(`You can upload a maximum of 3 images only.`),e.target.value=``;return}u(e=>[...e,...t]),e.target.value=``}},ee=e=>{u(t=>t.filter((t,n)=>n!==e)),f(``)};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * { box-sizing: border-box; }
        body { background: #f6f7f8; color: #1c1c1c; font-family: Arial, sans-serif; }
        .page-shell { max-width: 1180px; margin: 0 auto; padding: 32px 24px 60px; }
        .report-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
        .report-main { display: flex; flex-direction: column; gap: 18px; }
        .page-header, .form-card, .side-card, .premium-actions {
          background: #ffffff; border: 1px solid #edeff1; border-radius: 18px;
        }
        .page-header { padding: 28px 30px; }
        .eyebrow {
          display: inline-block; font-size: 13px; font-weight: 700; color: #2563eb;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;
        }
        .page-header h1 { font-size: 36px; line-height: 1.15; color: #111827; margin-bottom: 12px; }
        .page-header p { font-size: 16px; line-height: 1.7; color: #4b5563; max-width: 820px; }
        .form-card { padding: 26px 28px 30px; }
        .section-title { font-size: 21px; font-weight: 700; color: #111827; margin-bottom: 6px; }
        .section-subtitle { font-size: 14px; line-height: 1.6; color: #6b7280; margin-bottom: 22px; }
        .alert { margin-bottom: 16px; padding: 14px 16px; border-radius: 12px; font-size: 14px; font-weight: 600; line-height: 1.6; }
        .alert-error { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
        .alert-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        form { display: flex; flex-direction: column; gap: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .full-width { grid-column: 1 / -1; }
        label { font-size: 14px; font-weight: 700; color: #374151; }
        .required { color: #dc2626; margin-left: 3px; }
        input, select, textarea {
          width: 100%; border: 1px solid #d1d5db; border-radius: 12px; background: #ffffff;
          color: #111827; font-size: 15px; padding: 14px 15px; outline: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }
        input[readonly] { background: #f3f4f6; color: #4b5563; cursor: not-allowed; }
        textarea { resize: vertical; min-height: 170px; line-height: 1.6; }
        .hint { font-size: 12.5px; color: #6b7280; line-height: 1.5; }
        .upload-box { border: 1.5px dashed #cbd5e1; border-radius: 16px; background: #f9fafb; padding: 20px; }
        .inline-note { margin-top: 10px; font-size: 13px; color: #6b7280; line-height: 1.6; }
        .upload-trigger {
          border: 1px solid #d1d5db; background: #e0dfdf; color: #374151; font-size: 14px;
          font-weight: 600; padding: 10px 16px; border-radius: 999px; cursor: pointer;
        }
        .upload-trigger:disabled { background: #e5e7eb; color: #9ca3af; border-color: #e5e7eb; cursor: not-allowed; }
        .image-preview-container { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
        .image-preview-item {
          position: relative; width: 120px; height: 120px; border-radius: 14px; overflow: hidden;
          border: 1px solid #d1d5db; background: #ffffff;
        }
        .image-preview-item img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: zoom-in; }
        .remove-image-btn {
          position: absolute; top: 8px; right: 8px; width: 26px; height: 26px; border: none;
          border-radius: 999px; background: rgba(17, 24, 39, 0.88); color: #ffffff; font-size: 16px; cursor: pointer;
        }
        .file-error, .field-error { font-size: 13px; color: #dc2626; line-height: 1.5; font-weight: 600; }
        .action-row { display: flex; justify-content: flex-end; gap: 12px; padding-top: 4px; }
        .btn {
          border: none; border-radius: 999px; padding: 13px 22px; font-size: 14px;
          font-weight: 700; cursor: pointer;
        }
        .btn-secondary { background: #e5e7eb; color: #111827; }
        .btn-primary { background: #2563eb; color: #ffffff; box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18); }
        .report-side { display: flex; flex-direction: column; gap: 18px; }
        .side-panel { position: sticky; top: 24px; display: flex; flex-direction: column; gap: 18px; }
        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8; border-radius: 22px; padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }
        .premium-actions h3, .side-card h3 { font-size: 17px; color: #111827; margin-bottom: 14px; }
        .premium-actions p { font-size: 14px; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
        .action-links { display: flex; flex-direction: column; gap: 12px; }
        .action-link {
          display: flex; align-items: center; justify-content: space-between; gap: 12px; text-decoration: none;
          color: #111827; padding: 14px 16px; border-radius: 16px; background: #ffffff; border: 1px solid #e5e7eb;
        }
        .action-link-title { font-size: 15px; font-weight: 700; color: #111827; }
        .action-link-sub { font-size: 12px; color: #6b7280; margin-top: 3px; }
        .action-arrow { font-size: 18px; color: #94a3b8; flex-shrink: 0; }
        .side-card { padding: 22px 20px; }
        .side-card ul { padding-left: 18px; color: #4b5563; }
        .side-card li { margin-bottom: 10px; line-height: 1.6; font-size: 14px; }
        .status-pill {
          display: inline-block; padding: 6px 10px; font-size: 12px; font-weight: 700;
          border-radius: 999px; background: #dbeafe; color: #1d4ed8; margin-right: 8px; margin-bottom: 8px;
        }
        .image-modal {
          display: flex; position: fixed; z-index: 9999; inset: 0; background: rgba(15, 23, 42, 0.92);
          align-items: center; justify-content: center; padding: 30px;
        }
        .image-modal-content { max-width: 90vw; max-height: 85vh; border-radius: 16px; object-fit: contain; background: #fff; }
        .image-modal-close {
          position: absolute; top: 18px; right: 24px; font-size: 40px; color: #fff; cursor: pointer; border: none; background: transparent;
        }
        @media (max-width: 1024px) {
          .report-layout { grid-template-columns: 1fr; }
          .report-side { order: -1; }
        }
        @media (max-width: 768px) {
          .page-shell { padding: 20px 14px 40px; }
          .page-header { padding: 22px 20px; }
          .page-header h1 { font-size: 29px; }
          .form-card { padding: 22px 18px 24px; }
          .form-grid { grid-template-columns: 1fr; }
          .action-row { flex-direction: column; }
          .btn { width: 100%; }
        }
      `}),(0,P.jsx)(`div`,{className:`page-shell`,children:(0,P.jsxs)(`div`,{className:`report-layout`,children:[(0,P.jsxs)(`main`,{className:`report-main`,children:[(0,P.jsxs)(`section`,{className:`page-header`,children:[(0,P.jsx)(`span`,{className:`eyebrow`,children:`Support Ticket`}),(0,P.jsx)(`h1`,{children:`Report an Issue`}),(0,P.jsx)(`p`,{children:`Use this form to report classroom, lab, equipment, or facility-related issues. Provide clear details so the support team can assign your request faster and begin resolution quickly.`})]}),(0,P.jsxs)(`section`,{className:`form-card`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Submission Form`}),(0,P.jsx)(`div`,{className:`section-subtitle`,children:`Fill in the required details below. Your name and email are automatically loaded from your logged-in account.`}),a.general&&(0,P.jsx)(`div`,{className:`alert alert-error`,children:a.general}),s&&(0,P.jsx)(`div`,{className:`alert alert-success`,children:s}),(0,P.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),o({}),c(``),f(``);let n=new FormData;n.append(`title`,r.title),n.append(`category`,r.category),n.append(`priority`,r.priority),n.append(`locationType`,r.locationType),n.append(`building`,r.building),n.append(`roomNumber`,r.roomNumber),n.append(`assetId`,r.assetId),n.append(`contactNumber`,r.contactNumber.trim()===``?``:r.contactNumber),n.append(`incidentDate`,r.incidentDate),n.append(`description`,r.description),l.forEach(e=>{n.append(`images`,e)});try{let t=(await Ua(n)).data;e(`/issues/${t.id}`)}catch(e){e.response?.data&&typeof e.response.data==`object`?o(e.response.data):o({general:`Failed to submit issue.`})}},children:[(0,P.jsxs)(`div`,{className:`form-grid`,children:[(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Name`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsx)(`input`,{type:`text`,name:`name`,value:r.name,readOnly:!0})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Email`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsx)(`input`,{type:`email`,name:`email`,value:r.email,readOnly:!0})]}),(0,P.jsxs)(`div`,{className:`form-group full-width`,children:[(0,P.jsxs)(`label`,{children:[`Issue Title`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsx)(`input`,{type:`text`,name:`title`,maxLength:`120`,placeholder:`Example: Projector in Lab 3 is not turning on`,value:r.title,onChange:C}),a.title&&(0,P.jsx)(`div`,{className:`field-error`,children:a.title})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Issue Category`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsxs)(`select`,{name:`category`,value:r.category,onChange:C,children:[(0,P.jsx)(`option`,{value:``,children:`Select a category`}),(0,P.jsx)(`option`,{children:`Classroom Facilities`}),(0,P.jsx)(`option`,{children:`Laboratory Equipment`}),(0,P.jsx)(`option`,{children:`IT / Network`}),(0,P.jsx)(`option`,{children:`Electrical`}),(0,P.jsx)(`option`,{children:`Furniture`}),(0,P.jsx)(`option`,{children:`Air Conditioning / Ventilation`}),(0,P.jsx)(`option`,{children:`Plumbing / Water`}),(0,P.jsx)(`option`,{children:`Cleanliness / Housekeeping`}),(0,P.jsx)(`option`,{children:`Safety Hazard`}),(0,P.jsx)(`option`,{children:`Other`})]}),a.category&&(0,P.jsx)(`div`,{className:`field-error`,children:a.category})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Priority`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsxs)(`select`,{name:`priority`,value:r.priority,onChange:C,children:[(0,P.jsx)(`option`,{value:``,children:`Select priority`}),(0,P.jsx)(`option`,{children:`Low`}),(0,P.jsx)(`option`,{children:`Medium`}),(0,P.jsx)(`option`,{children:`High`}),(0,P.jsx)(`option`,{children:`Urgent`})]}),a.priority&&(0,P.jsx)(`div`,{className:`field-error`,children:a.priority})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Location Type`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsxs)(`select`,{name:`locationType`,value:r.locationType,onChange:C,children:[(0,P.jsx)(`option`,{value:``,children:`Select location type`}),(0,P.jsx)(`option`,{children:`Lecture Hall`}),(0,P.jsx)(`option`,{children:`Computer Lab`}),(0,P.jsx)(`option`,{children:`Classroom`}),(0,P.jsx)(`option`,{children:`Staff Room`}),(0,P.jsx)(`option`,{children:`Meeting Room`}),(0,P.jsx)(`option`,{children:`Corridor / Common Area`}),(0,P.jsx)(`option`,{children:`Washroom`}),(0,P.jsx)(`option`,{children:`Outdoor Area`}),(0,P.jsx)(`option`,{children:`Other`})]}),a.locationType&&(0,P.jsx)(`div`,{className:`field-error`,children:a.locationType})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Building / Area`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsxs)(`select`,{name:`building`,value:r.building,onChange:C,children:[(0,P.jsx)(`option`,{value:``,children:`Select building or area`}),(0,P.jsx)(`option`,{children:`Main Building`}),(0,P.jsx)(`option`,{children:`Engineering Building`}),(0,P.jsx)(`option`,{children:`Computing Building`}),(0,P.jsx)(`option`,{children:`Library`}),(0,P.jsx)(`option`,{children:`Administration Block`}),(0,P.jsx)(`option`,{children:`Auditorium`}),(0,P.jsx)(`option`,{children:`Student Center`}),(0,P.jsx)(`option`,{children:`Hostel Area`}),(0,P.jsx)(`option`,{children:`Parking Area`}),(0,P.jsx)(`option`,{children:`Other`})]}),a.building&&(0,P.jsx)(`div`,{className:`field-error`,children:a.building})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsx)(`label`,{children:y}),(0,P.jsx)(`input`,{type:`text`,name:`roomNumber`,placeholder:b,value:r.roomNumber,onChange:C,required:v}),(0,P.jsx)(`div`,{className:`hint`,children:x})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsx)(`label`,{children:`Equipment ID / Asset Tag`}),(0,P.jsx)(`input`,{type:`text`,name:`assetId`,placeholder:`Example: PC-IT-204, PJ-1102`,value:r.assetId,onChange:C})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsx)(`label`,{children:`Preferred Contact Number`}),(0,P.jsx)(`input`,{type:`tel`,name:`contactNumber`,placeholder:`Example: 07XXXXXXXX`,value:r.contactNumber,onChange:C}),a.contactNumber&&(0,P.jsx)(`div`,{className:`field-error`,children:a.contactNumber})]}),(0,P.jsxs)(`div`,{className:`form-group`,children:[(0,P.jsxs)(`label`,{children:[`Date Observed`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsx)(`input`,{type:`date`,name:`incidentDate`,min:g.min,max:g.max,value:r.incidentDate,onChange:C}),a.incidentDate&&(0,P.jsx)(`div`,{className:`field-error`,children:a.incidentDate})]}),(0,P.jsxs)(`div`,{className:`form-group full-width`,children:[(0,P.jsxs)(`label`,{children:[`Issue Description`,(0,P.jsx)(`span`,{className:`required`,children:`*`})]}),(0,P.jsx)(`textarea`,{name:`description`,placeholder:`Describe the issue clearly. Include what happened, what is not working, when you noticed it, and whether it is affecting classes, labs, or student usage.`,value:r.description,onChange:C}),(0,P.jsx)(`div`,{className:`hint`,children:`Be specific. A clear description helps technicians resolve the issue faster.`}),a.description&&(0,P.jsx)(`div`,{className:`field-error`,children:a.description})]}),(0,P.jsxs)(`div`,{className:`form-group full-width`,children:[(0,P.jsx)(`label`,{children:`Upload Images`}),(0,P.jsxs)(`div`,{className:`upload-box`,children:[(0,P.jsx)(`div`,{className:`image-preview-container`,children:l.map((e,t)=>(0,P.jsxs)(`div`,{className:`image-preview-item`,children:[(0,P.jsx)(`img`,{src:URL.createObjectURL(e),alt:`Selected preview`,onClick:()=>m(URL.createObjectURL(e))}),(0,P.jsx)(`button`,{type:`button`,className:`remove-image-btn`,onClick:()=>ee(t),children:`×`})]},`${e.name}-${t}`))}),(0,P.jsx)(`input`,{ref:h,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:w}),(0,P.jsx)(`button`,{type:`button`,className:`upload-trigger`,disabled:l.length>=3,onClick:()=>h.current?.click(),children:l.length>=3?`Maximum Reached`:`Choose Images`}),(0,P.jsx)(`div`,{className:`inline-note`,children:(()=>{let e=l.length;return e===0?`No images selected. You may upload up to 3 images.`:e===1?`1 image selected.`:`${e} images selected.`})()}),(0,P.jsx)(`div`,{className:`inline-note`,children:`Supported files: JPG, PNG, WEBP, GIF. Screenshots or photos of the issue are helpful.`}),d&&(0,P.jsx)(`div`,{className:`file-error`,children:d})]})]})]}),(0,P.jsxs)(`div`,{className:`action-row`,children:[(0,P.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:()=>{i({...n,incidentDate:g.max||``}),o({}),c(``),u([]),f(``)},children:`Clear Form`}),(0,P.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Submit Issue Report`})]})]})]})]}),(0,P.jsx)(`aside`,{className:`report-side`,children:(0,P.jsxs)(`div`,{className:`side-panel`,children:[(0,P.jsxs)(`section`,{className:`premium-actions`,children:[(0,P.jsx)(`h3`,{children:`Support Guide`}),(0,P.jsx)(`p`,{children:`Understand how your issue moves through the system and navigate quickly.`}),(0,P.jsxs)(`div`,{className:`action-links`,children:[(0,P.jsxs)(Dn,{to:`/`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Help Centre`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Return to support home`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/my-reports`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`My Reports`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Track your submitted issues`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/featured`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Featured Discussions`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`See common issues & solutions`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]})]})]}),(0,P.jsxs)(`section`,{className:`side-card`,children:[(0,P.jsx)(`h3`,{children:`What happens next?`}),(0,P.jsxs)(`ul`,{children:[(0,P.jsx)(`li`,{children:`Your issue is logged into the maintenance ticket system.`}),(0,P.jsx)(`li`,{children:`The support team reviews the location, category, and severity.`}),(0,P.jsx)(`li`,{children:`The issue moves through stages like Open, In Progress, Resolved, and Closed.`})]})]}),(0,P.jsxs)(`section`,{className:`side-card`,children:[(0,P.jsx)(`h3`,{children:`Ticket Stages`}),(0,P.jsx)(`span`,{className:`status-pill`,children:`Open`}),(0,P.jsx)(`span`,{className:`status-pill`,children:`In Progress`}),(0,P.jsx)(`span`,{className:`status-pill`,children:`Resolved`}),(0,P.jsx)(`span`,{className:`status-pill`,children:`Closed`})]}),(0,P.jsxs)(`section`,{className:`side-card`,children:[(0,P.jsx)(`h3`,{children:`Helpful tips`}),(0,P.jsxs)(`ul`,{children:[(0,P.jsx)(`li`,{children:`Use the exact room or lab reference.`}),(0,P.jsx)(`li`,{children:`Include the equipment ID when available.`}),(0,P.jsx)(`li`,{children:`Upload a clear photo when the problem is visible.`}),(0,P.jsx)(`li`,{children:`Set high or urgent priority only for serious disruption or safety risk.`})]})]})]})})]})}),p&&(0,P.jsxs)(`div`,{className:`image-modal`,onClick:()=>m(``),children:[(0,P.jsx)(`button`,{className:`image-modal-close`,onClick:()=>m(``),children:`×`}),(0,P.jsx)(`img`,{className:`image-modal-content`,src:p,alt:`Preview`,onClick:e=>e.stopPropagation()})]})]})}function Xa(){let[e,t]=(0,S.useState)([]),[n,r]=(0,S.useState)(!0),[i,a]=(0,S.useState)(``),[o,s]=(0,S.useState)(`all`),[c,l]=(0,S.useState)(`all`),[u,d]=(0,S.useState)(`all`),[f,p]=(0,S.useState)(`all`);(0,S.useEffect)(()=>{m()},[]);let m=async()=>{try{r(!0),t((await Ha()).data),a(``)}catch(e){console.error(e),a(`Failed to load your reports.`)}finally{r(!1)}},h=async e=>{if(window.confirm(`Close this ticket?`))try{await Ga(e),m()}catch(e){console.error(e),alert(`Failed to close ticket.`)}},g=async e=>{if(window.confirm(`Delete this closed ticket?`))try{await Ka(e),m()}catch(e){console.error(e),alert(`Failed to delete ticket.`)}},_=e=>{if(!e)return`Just now`;let t=e.replace(`T`,` `).split(`.`)[0],n=new Date(t);return Number.isNaN(n.getTime())?`Just now`:n.toLocaleString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},v=(e,t=220)=>e?e.length>t?e.substring(0,t)+`...`:e:``,y=()=>e.filter(e=>{let t=o===`all`||e.status===o,n=c===`all`||e.priority===c,r=u===`all`||e.category===u,i=f===`all`||e.building===f;return t&&n&&r&&i});return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f6f7f8;
          color: #1f2937;
        }

        .page-shell {
          max-width: 1320px;
          margin: 0 auto;
          padding: 28px 24px 56px;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 28px;
          align-items: start;
        }

        .main-column {
          min-width: 0;
        }

        .page-header {
          padding: 8px 4px 20px;
          margin-bottom: 6px;
        }

        .page-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 10px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .feed-shell {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feed-card {
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 22px 24px 18px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
        }

        .feed-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.06);
          border-color: #d9e2ec;
        }

        .feed-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .feed-meta-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 13px;
          color: #7b8794;
        }

        .feed-meta-author {
          font-weight: 700;
          color: #344054;
        }

        .feed-dot {
          color: #c5ced8;
        }

        .feed-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 10px;
        }

        .feed-main {
          min-width: 0;
          flex: 1;
        }

        .feed-title {
          font-size: 26px;
          line-height: 1.28;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 13px;
          border-radius: 999px;
          background: #e8f0fe;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .feed-desc {
          font-size: 16px;
          line-height: 1.75;
          color: #5f6c7b;
          margin-bottom: 18px;
          word-break: break-word;
        }

        .feed-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
        }

        .feed-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .comment-count {
          font-size: 14px;
          font-weight: 700;
          color: #667085;
          white-space: nowrap;
        }

        .action-form {
          margin: 0;
        }

        .close-btn {
          border: none;
          background: #fee8e8;
          color: #f15151;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }

        .close-btn:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        .delete-icon-btn {
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 16px;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.18s ease;
        }

        .delete-icon-btn:hover {
          background: #fee2e2;
          color: #b91c1c;
          transform: scale(1.08);
        }

        .delete-icon-btn:active {
          transform: scale(0.96);
        }

        .waiting-text {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          white-space: nowrap;
        }

        .empty-state {
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 30px 24px;
          color: #667085;
          font-size: 16px;
          line-height: 1.8;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
        }

        .side-panel {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8;
          border-radius: 22px;
          padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }

        .premium-actions h3 {
          font-size: 22px;
          color: #111827;
          margin-bottom: 8px;
        }

        .premium-actions p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 18px;
        }

        .action-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-decoration: none;
          color: #111827;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .action-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }

        .action-link-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .action-link-sub {
          font-size: 12px;
          color: #6b7280;
          margin-top: 3px;
        }

        .action-arrow {
          font-size: 18px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .side-card {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 22px 20px;
        }

        .side-card h3 {
          font-size: 17px;
          color: #111827;
          margin-bottom: 12px;
        }

        .side-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
        }

        .loading-text, .error-text {
          font-size: 16px;
          padding: 18px 6px;
        }

        .error-text {
          color: #b91c1c;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: center;
        }

        .filter-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          color: #111827;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23667085' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          height: 40px;
          flex-shrink: 0;
        }

        .filter-select.status-select,
        .filter-select.priority-select {
          width: 120px;
        }

        .filter-select.category-select,
        .filter-select.building-select {
          width: 160px;
        }

        .filter-select:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .filter-select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .filter-divider {
          width: 1px;
          height: 24px;
          background: #e5e7eb;
          margin: 0 4px;
        }

        .clear-filters-btn {
          padding: 10px 12px;
          border: 1px solid #dc2626;
          background: transparent;
          color: #dc2626;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 40px;
          width: 100px;
          flex-shrink: 0;
          align-self: center;
          margin-left: auto;
        }

        .clear-filters-btn:hover {
          background: rgba(220, 38, 38, 0.08);
          color: #dc2626;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 18px 14px 40px;
          }

          .page-title {
            font-size: 38px;
          }

          .page-subtitle {
            font-size: 16px;
          }

          .feed-card {
            padding: 18px 16px;
          }

          .feed-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .feed-title {
            font-size: 23px;
          }

          .feed-desc {
            font-size: 15px;
          }

          .feed-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .card-actions {
            margin-left: 0;
            justify-content: flex-start;
          }
        }
      `}),(0,P.jsx)(`div`,{className:`page-shell`,children:(0,P.jsxs)(`div`,{className:`layout`,children:[(0,P.jsxs)(`main`,{className:`main-column`,children:[(0,P.jsxs)(`section`,{className:`page-header`,children:[(0,P.jsx)(`div`,{className:`page-eyebrow`,children:`Your Activity`}),(0,P.jsx)(`h1`,{className:`page-title`,children:`My Reports`}),(0,P.jsx)(`p`,{className:`page-subtitle`,children:`Tickets you created, with the newest reports at the top.`})]}),n&&(0,P.jsx)(`div`,{className:`loading-text`,children:`Loading your reports...`}),i&&(0,P.jsx)(`div`,{className:`error-text`,children:i}),!n&&!i&&e.length>0&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`filter-container`,children:[(0,P.jsx)(`span`,{className:`filter-label`,children:`Filter by:`}),(0,P.jsxs)(`select`,{className:`filter-select status-select`,value:o,onChange:e=>s(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Status`}),(0,P.jsx)(`option`,{value:`OPEN`,children:`Open`}),(0,P.jsx)(`option`,{value:`IN PROGRESS`,children:`In Progress`}),(0,P.jsx)(`option`,{value:`RESOLVED`,children:`Resolved`}),(0,P.jsx)(`option`,{value:`CLOSED`,children:`Closed`})]}),(0,P.jsxs)(`select`,{className:`filter-select priority-select`,value:c,onChange:e=>l(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Priority`}),(0,P.jsx)(`option`,{value:`Low`,children:`Low`}),(0,P.jsx)(`option`,{value:`Medium`,children:`Medium`}),(0,P.jsx)(`option`,{value:`High`,children:`High`}),(0,P.jsx)(`option`,{value:`Urgent`,children:`Urgent`})]}),(0,P.jsxs)(`select`,{className:`filter-select category-select`,value:u,onChange:e=>d(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Category`}),(0,P.jsx)(`option`,{value:`Classroom Facilities`,children:`Classroom Facilities`}),(0,P.jsx)(`option`,{value:`Laboratory Equipment`,children:`Laboratory Equipment`}),(0,P.jsx)(`option`,{value:`IT / Network`,children:`IT / Network`}),(0,P.jsx)(`option`,{value:`Electrical`,children:`Electrical`}),(0,P.jsx)(`option`,{value:`Furniture`,children:`Furniture`}),(0,P.jsx)(`option`,{value:`Air Conditioning / Ventilation`,children:`Air Conditioning / Ventilation`}),(0,P.jsx)(`option`,{value:`Plumbing / Water`,children:`Plumbing / Water`}),(0,P.jsx)(`option`,{value:`Cleanliness / Housekeeping`,children:`Cleanliness / Housekeeping`}),(0,P.jsx)(`option`,{value:`Safety Hazard`,children:`Safety Hazard`}),(0,P.jsx)(`option`,{value:`Other`,children:`Other`})]}),(0,P.jsxs)(`select`,{className:`filter-select building-select`,value:f,onChange:e=>p(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Buildings`}),(0,P.jsx)(`option`,{value:`Main Building`,children:`Main Building`}),(0,P.jsx)(`option`,{value:`Engineering Building`,children:`Engineering Building`}),(0,P.jsx)(`option`,{value:`Computing Building`,children:`Computing Building`}),(0,P.jsx)(`option`,{value:`Library`,children:`Library`}),(0,P.jsx)(`option`,{value:`Administration Block`,children:`Administration Block`}),(0,P.jsx)(`option`,{value:`Auditorium`,children:`Auditorium`}),(0,P.jsx)(`option`,{value:`Student Center`,children:`Student Center`}),(0,P.jsx)(`option`,{value:`Hostel Area`,children:`Hostel Area`}),(0,P.jsx)(`option`,{value:`Parking Area`,children:`Parking Area`}),(0,P.jsx)(`option`,{value:`Other`,children:`Other`})]}),(o!==`all`||c!==`all`||u!==`all`||f!==`all`)&&(0,P.jsx)(`button`,{className:`clear-filters-btn`,onClick:()=>{s(`all`),l(`all`),d(`all`),p(`all`)},children:`Clear Filters`})]}),(0,P.jsxs)(`section`,{className:`feed-shell`,children:[y().map(e=>(0,P.jsxs)(`div`,{className:`feed-card`,children:[(0,P.jsxs)(Dn,{className:`feed-link`,to:`/issues/${e.id}`,children:[(0,P.jsxs)(`div`,{className:`feed-meta-top`,children:[(0,P.jsx)(`span`,{children:`Posted by`}),(0,P.jsx)(`span`,{className:`feed-meta-author`,children:e.reporterName}),(0,P.jsx)(`span`,{className:`feed-dot`,children:`•`}),(0,P.jsx)(`span`,{children:_(e.createdAt)})]}),(0,P.jsxs)(`div`,{className:`feed-row`,children:[(0,P.jsx)(`div`,{className:`feed-main`,children:(0,P.jsx)(`div`,{className:`feed-title`,children:e.title})}),(0,P.jsx)(`span`,{className:`status-chip`,children:e.status})]}),(0,P.jsx)(`div`,{className:`feed-desc`,children:v(e.description,220)})]}),(0,P.jsxs)(`div`,{className:`feed-bottom`,children:[(0,P.jsxs)(`div`,{className:`feed-tags`,children:[(0,P.jsx)(`span`,{className:`meta-pill`,children:e.category}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.priority}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.building}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.locationType})]}),(0,P.jsxs)(`div`,{className:`card-actions`,children:[(0,P.jsxs)(`div`,{className:`comment-count`,children:[e.comments?.length||0,` comments`]}),(e.status===`OPEN`||e.status===`RESOLVED`)&&(0,P.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>h(e.id),children:`Close Ticket`}),e.status===`IN PROGRESS`&&(0,P.jsx)(`div`,{className:`waiting-text`,children:`Awaiting support update`}),e.status===`CLOSED`&&(0,P.jsx)(`button`,{type:`button`,className:`delete-icon-btn`,title:`Delete ticket`,onClick:()=>g(e.id),children:(0,P.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,children:(0,P.jsx)(`path`,{d:`M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]})]})]},e.id)),y().length===0&&(0,P.jsx)(`div`,{className:`empty-state`,children:`No reports match the selected filters.`})]})]}),!n&&!i&&e.length===0&&(0,P.jsx)(`section`,{className:`empty-state`,children:`You have not submitted any reports yet.`})]}),(0,P.jsxs)(`aside`,{className:`side-panel`,children:[(0,P.jsxs)(`section`,{className:`premium-actions`,children:[(0,P.jsx)(`h3`,{children:`Quick Actions`}),(0,P.jsx)(`p`,{children:`Move through your support space quickly with these shortcuts.`}),(0,P.jsxs)(`div`,{className:`action-links`,children:[(0,P.jsxs)(Dn,{to:`/`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Return to Help Centre`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Go back to the support home`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/report`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Create New Report`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Submit another issue ticket`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/featured`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Featured Conversations`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Browse public issue discussions`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]})]})]}),(0,P.jsxs)(`section`,{className:`side-card`,children:[(0,P.jsx)(`h3`,{children:`About this page`}),(0,P.jsx)(`p`,{children:`This feed shows tickets created from your account, with the newest submissions shown first.`})]})]})]})})]})}function Za(){let{id:e}=ct(),t=ot(),[n,r]=(0,S.useState)(null),[i,a]=(0,S.useState)(!0),[o,s]=(0,S.useState)(``),[c,l]=(0,S.useState)(!1),[u,d]=(0,S.useState)(``),[f,p]=(0,S.useState)(``),[m,h]=(0,S.useState)(null),[g,_]=(0,S.useState)(null),v=(0,S.useRef)({}),[y,b]=(0,S.useState)(``),x=(0,S.useRef)(null),[C,w]=(0,S.useState)([]),[ee,T]=(0,S.useState)(``),[E,D]=(0,S.useState)(null),[te,ne]=(0,S.useState)(``),[O,re]=(0,S.useState)([]),[ie,ae]=(0,S.useState)([]),[oe,k]=(0,S.useState)(``),A=`student@sliit.lk`;(0,S.useEffect)(()=>{se()},[e]),(0,S.useEffect)(()=>{g&&v.current[g]&&(v.current[g].scrollIntoView({behavior:`smooth`,block:`center`}),_(null))},[g,n]);let se=async()=>{try{a(!0),r((await Va(e)).data),s(``)}catch(e){console.error(e),s(`Failed to load issue details.`)}finally{a(!1)}},ce=async()=>{if(window.confirm(`Close this ticket?`))try{await Ga(e),se()}catch(e){console.error(e),alert(`Failed to close ticket.`)}},le=async()=>{if(window.confirm(`Delete this closed ticket?`))try{await Ka(e),t(`/my-reports`)}catch(e){console.error(e),alert(`Failed to delete ticket.`)}},ue=async t=>{t.preventDefault(),p(``),T(``);let n=u.trim();if(n===``&&C.length===0){p(`Add text or at least one image.`);return}let i=m?m.id:null,a=new FormData;a.append(`text`,n),i&&a.append(`parentCommentId`,i),C.forEach(e=>{a.append(`images`,e)});try{let t=(await Wa(e,a)).data;r(t),d(``),w([]),T(``),l(!1),h(null);let n=[...t.comments||[]].filter(e=>e.authorEmail===A&&(e.parentCommentId||null)===i).sort((e,t)=>(t.id||0)-(e.id||0))[0];n&&_(n.id)}catch(e){console.error(e),e.response?.data?.text?p(e.response.data.text):p(`Failed to add comment.`)}},j=async t=>{if(window.confirm(`Delete this comment?`))try{await qa(e,t),se()}catch(e){console.error(e),alert(`Failed to delete comment.`)}},M=e=>{D(e.id),ne(e.text||``),re(e.imageUrls?[...e.imageUrls]:[]),ae([]),k(``)},de=()=>{D(null),ne(``),re([]),ae([]),k(``)},fe=async t=>{let n=te.trim();if(n===``&&O.length===0&&ie.length===0){alert(`Add text or at least one image.`);return}try{let r=new FormData;r.append(`text`,n),O.forEach(e=>{r.append(`existingImageUrls`,e)}),ie.forEach(e=>{r.append(`images`,e)}),await Ja(e,t,r),D(null),ne(``),re([]),ae([]),k(``),se()}catch(e){console.error(e),alert(`Failed to update comment.`)}},pe=e=>{k(``);let t=Array.from(e.target.files||[]);if(t.length!==0){if(t.filter(e=>!e.type.startsWith(`image/`)).length>0){k(`Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.`),e.target.value=``;return}if(O.length+ie.length+t.length>3){k(`You can upload a maximum of 3 images per comment.`),e.target.value=``;return}ae(e=>[...e,...t]),e.target.value=``}},me=e=>{re(t=>t.filter((t,n)=>n!==e)),k(``)},he=e=>{ae(t=>t.filter((t,n)=>n!==e)),k(``)},ge=e=>{if(!e)return`Just now`;let t=e.replace(`T`,` `).split(`.`)[0],n=new Date(t);return Number.isNaN(n.getTime())?`Just now`:n.toLocaleString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},_e=(e=>{let t=(e||``).toUpperCase();return{open:!0,inProgress:[`IN PROGRESS`,`RESOLVED`,`CLOSED`].includes(t),resolved:[`RESOLVED`,`CLOSED`].includes(t),closed:t===`CLOSED`}})(n?.status),ve=e=>{let t=(e?.authorEmail||``).trim().toLowerCase(),r=(e?.authorName||``).trim().toLowerCase(),i=(n?.assignedTechnicianEmail||``).trim().toLowerCase(),a=(n?.assignedTechnicianName||``).trim().toLowerCase();return i&&t===i||a&&r===a||t===`technician@helpdesk.edu`},ye=e=>{let t=e?.length||0;return t===1?`single-image`:t===2?`two-images`:t===3?`three-images`:t>=4?`multi-images`:``},be=e=>{T(``);let t=Array.from(e.target.files||[]);if(t.length!==0){if(t.filter(e=>!e.type.startsWith(`image/`)).length>0){T(`Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.`),e.target.value=``;return}if(C.length+t.length>3){T(`You can upload a maximum of 3 images per comment.`),e.target.value=``;return}w(e=>[...e,...t]),e.target.value=``}},N=e=>{w(t=>t.filter((t,n)=>n!==e)),T(``)};if(i)return(0,P.jsx)(`div`,{style:{padding:`30px`},children:`Loading issue details...`});if(o)return(0,P.jsx)(`div`,{style:{padding:`30px`,color:`#b91c1c`},children:o});if(!n)return(0,P.jsx)(`div`,{style:{padding:`30px`},children:`Issue not found.`});let xe=(e=[])=>{let t=[...e].sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}),n=new Map;t.forEach(e=>{n.set(e.id,{...e,replies:[]})});let r=[];return t.forEach(e=>{let t=n.get(e.id);e.parentCommentId&&n.has(e.parentCommentId)?n.get(e.parentCommentId).replies.push(t):r.push(t)}),r},Se=(e,t=0)=>{let n=e.authorEmail===A;return(0,P.jsx)(`div`,{ref:t=>{t&&(v.current[e.id]=t)},style:{marginLeft:t>0?`${Math.min(t*28,84)}px`:`0px`,borderLeft:t>0?`3px solid #e5e7eb`:`none`,paddingLeft:t>0?`14px`:`0px`,marginTop:t>0?`14px`:`0px`},children:(0,P.jsxs)(`div`,{className:`comment-item`,children:[(0,P.jsx)(`div`,{className:`comment-line`}),(0,P.jsxs)(`div`,{className:`comment-body`,children:[(0,P.jsxs)(`div`,{className:`comment-top`,children:[(0,P.jsx)(`span`,{className:`comment-author`,children:e.authorName}),ve(e)&&(0,P.jsx)(`span`,{className:`role-badge`,children:`TECH`}),(0,P.jsx)(`span`,{className:`dot-separator`,children:`•`}),(0,P.jsx)(`span`,{className:`comment-time`,children:ge(e.createdAt)})]}),E===e.id?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`textarea`,{className:`edit-comment-textarea`,value:te,onChange:e=>ne(e.target.value)}),(0,P.jsxs)(`div`,{className:`edit-comment-image-preview-container`,children:[O.map((e,t)=>(0,P.jsxs)(`div`,{className:`edit-comment-image-preview-item`,children:[(0,P.jsx)(`img`,{src:`http://localhost:8080${e}`,alt:`Existing`}),(0,P.jsx)(`button`,{type:`button`,className:`edit-comment-remove-image-btn`,onClick:()=>me(t),children:`×`})]},`old-${e}-${t}`)),ie.map((e,t)=>(0,P.jsxs)(`div`,{className:`edit-comment-image-preview-item`,children:[(0,P.jsx)(`img`,{src:URL.createObjectURL(e),alt:`New`}),(0,P.jsx)(`button`,{type:`button`,className:`edit-comment-remove-image-btn`,onClick:()=>he(t),children:`×`})]},`new-${e.name}-${t}`))]}),(0,P.jsx)(`input`,{type:`file`,accept:`image/*`,multiple:!0,hidden:!0,id:`editCommentImagesInput-${e.id}`,onChange:pe}),oe&&(0,P.jsx)(`div`,{className:`field-error`,children:oe}),(0,P.jsxs)(`div`,{className:`comment-actions`,children:[(0,P.jsx)(`button`,{type:`button`,className:`edit-comment-upload-btn`,onClick:()=>document.getElementById(`editCommentImagesInput-${e.id}`).click(),children:`Add Image`}),(0,P.jsx)(`button`,{type:`button`,className:`save-comment-btn`,onClick:()=>fe(e.id),children:`Save`}),(0,P.jsx)(`button`,{type:`button`,className:`cancel-edit-btn`,onClick:de,children:`Cancel`})]})]}):(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`div`,{className:`comment-text`,children:e.text}),e.imageUrls&&e.imageUrls.length>0&&(0,P.jsx)(`div`,{className:`comment-image-gallery`,children:e.imageUrls.map((e,t)=>(0,P.jsx)(`div`,{className:`comment-image-tile`,children:(0,P.jsx)(`img`,{src:`http://localhost:8080${e}`,alt:`Comment`,className:`comment-image`,onClick:()=>b(`http://localhost:8080${e}`)})},`${e}-${t}`))}),(0,P.jsxs)(`div`,{className:`comment-actions`,children:[(0,P.jsx)(`button`,{type:`button`,className:`edit-comment-btn`,onClick:()=>Ce(e),children:`Reply`}),n&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`button`,{type:`button`,className:`edit-comment-btn`,onClick:()=>M(e),children:`Edit`}),(0,P.jsx)(`button`,{type:`button`,className:`delete-comment-btn`,onClick:()=>j(e.id),children:`Delete`})]})]})]}),e.replies&&e.replies.length>0&&(0,P.jsx)(`div`,{children:e.replies.map(e=>Se(e,t+1))})]})]})},e.id)},Ce=e=>{h(e),l(!0),setTimeout(()=>{x.current?.scrollIntoView({behavior:`smooth`,block:`center`}),document.querySelector(`.comment-entry-box textarea`)?.focus()},120)};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f6f7f8;
          color: #1c1c1c;
        }

        .page-shell {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 24px 56px;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 28px;
          align-items: start;
        }

        .main-column {
          min-width: 0;
        }

        .progress-card {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 24px 28px;
          margin-bottom: 18px;
        }

        .progress-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }

        .progress-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .stage {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #cbd5e1;
          background: #ffffff;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .dot.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }

        .stage-label {
          font-size: 15px;
          color: #111827;
          font-weight: 500;
        }

        .connector {
          width: 52px;
          height: 3px;
          background: #dbeafe;
          border-radius: 999px;
        }

        .post-shell {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 28px 30px 30px;
        }

        .post-meta-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #6b7280;
        }

        .post-author {
          font-weight: 700;
          color: #111827;
        }

        .dot-separator {
          color: #9ca3af;
        }

        .post-title {
          font-size: 42px;
          line-height: 1.15;
          font-weight: 700;
          color: #111827;
          margin-bottom: 18px;
          word-break: break-word;
        }

        .top-status-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 700;
        }

        .owner-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .close-btn {
          border: none;
          background: #fee8e8;
          color: #f15151;
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .waiting-text {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
        }

        .delete-icon-btn {
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 16px;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.18s ease;
        }

        .delete-icon-btn:hover {
          background: #fee2e2;
          color: #b91c1c;
          transform: scale(1.08);
        }

        .delete-icon-btn:active {
          transform: scale(0.96);
        }

        .image-gallery {
          display: grid;
          gap: 10px;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
        }

        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .detail-gallery .image-tile {
          height: 180px;
        }

        .detail-gallery .issue-image {
          cursor: zoom-in;
        }

        .image-gallery.single-image {
          grid-template-columns: 1fr;
        }

        .image-gallery.two-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-gallery.three-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-gallery.multi-images {
          grid-template-columns: repeat(2, 1fr);
        }

        .image-tile {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #e5e7eb;
        }

        .image-gallery.single-image .image-tile {
          height: 300px;
          max-height: 320px;
        }

        .image-gallery.two-images .image-tile {
          height: 200px;
        }

        .image-gallery.three-images .image-tile {
          height: 170px;
        }

        .image-gallery.three-images .image-tile.featured-top {
          grid-column: 1 / -1;
          height: 260px;
          max-height: 280px;
        }

        .image-gallery.multi-images .image-tile {
          height: 160px;
        }

        .issue-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: zoom-in;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .issue-image:hover {
          transform: scale(1.02);
          filter: brightness(0.95);
        }

        .description-block {
          margin-bottom: 28px;
        }

        .description-text {
          font-size: 19px;
          line-height: 1.9;
          color: #1f2937;
          white-space: pre-line;
          word-break: break-word;
        }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 22px;
          border-bottom: 1px solid #edeff1;
          margin-bottom: 24px;
        }

        .comment-toggle-btn {
          border: 1px solid #d1d5db;
          background: #f9fafb;
          color: #111827;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .comment-toggle-btn:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .summary-section {
          margin-bottom: 32px;
        }

        .section-heading {
          font-size: 26px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 18px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .summary-item {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 18px 18px;
        }

        .summary-label {
          font-size: 12px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 17px;
          color: #111827;
          line-height: 1.7;
          word-break: break-word;
        }

        .comments-section {
          margin-top: 8px;
        }

        .comment-form-wrap {
          margin-bottom: 26px;
        }

        .comment-entry-box {
          border: 1px solid #d1d5db;
          border-radius: 18px;
          background: #ffffff;
          overflow: hidden;
        }

        .comment-entry-box textarea {
          width: 100%;
          min-height: 120px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 18px 18px 14px;
          font-size: 15px;
          line-height: 1.7;
          color: #111827;
          background: #ffffff;
        }

        .comment-entry-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 14px 16px 16px;
          border-top: 1px solid #edeff1;
          background: #fafafa;
        }

        .btn {
          border: none;
          border-radius: 999px;
          padding: 11px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: #2563eb;
          color: #ffffff;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .comment-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .comment-line {
          width: 2px;
          background: #e5e7eb;
          align-self: stretch;
          border-radius: 999px;
          margin-left: 9px;
        }

        .comment-body {
          flex: 1;
          min-width: 0;
        }

        .comment-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .comment-author {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid rgba(37, 99, 235, 0.14);
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .comment-time {
          font-size: 13px;
          color: #6b7280;
        }

        .comment-text {
          font-size: 16px;
          line-height: 1.85;
          color: #1f2937;
          white-space: pre-line;
          word-break: break-word;
          margin-bottom: 12px;
        }

        .empty-comments {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.7;
        }

        .field-error {
          color: #b91c1c;
          font-size: 13px;
          font-weight: 600;
          margin: 10px 18px 0;
        }

        .comment-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px 14px;
          border-top: 1px solid #edeff1;
          background: #ffffff;
        }

        .comment-toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .comment-icon-btn {
          border: none;
          background: transparent;
          color: #6b5bd2;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .comment-icon-btn:hover {
          background: #f3f0ff;
          transform: translateY(-1px);
        }

        .comment-gif-label {
          font-size: 13px;
          font-weight: 700;
          color: #6b5bd2;
          padding: 6px 8px;
          border-radius: 999px;
          background: transparent;
        }

        .comment-toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .comment-menu-dots {
          border: none;
          background: transparent;
          color: #8b7fd6;
          font-size: 22px;
          line-height: 1;
          cursor: default;
          padding: 0 4px;
        }

        .comment-image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .comment-image-preview-item {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #ffffff;
        }

        .comment-image-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .comment-remove-image-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border: none;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.88);
          color: #ffffff;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
        }

        .comment-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .delete-comment-btn,
        .edit-comment-btn,
        .save-comment-btn,
        .cancel-edit-btn {
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .delete-comment-btn {
          color: #9ca3af;
        }

        .delete-comment-btn:hover {
          color: #ef4444;
          text-decoration: underline;
        }

        .edit-comment-btn {
          color: #6b7280;
        }

        .edit-comment-btn:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        .save-comment-btn {
          color: #2563eb;
        }

        .save-comment-btn:hover {
          text-decoration: underline;
        }

        .cancel-edit-btn {
          color: #6b7280;
        }

        .cancel-edit-btn:hover {
          text-decoration: underline;
        }

        .edit-comment-textarea {
          width: 100%;
          min-height: 90px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 10px;
          resize: vertical;
          outline: none;
        }

        .edit-comment-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }

        .edit-comment-image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .edit-comment-image-preview-item {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #ffffff;
        }

        .edit-comment-image-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .edit-comment-remove-image-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border: none;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.88);
          color: #ffffff;
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
        }

        .edit-comment-upload-btn {
          border: none;
          background: transparent;
          color: #6b5bd2;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
        }

        .edit-comment-upload-btn:hover {
          text-decoration: underline;
        }

        .delete-comment-btn:hover {
          color: #ef4444;
          text-decoration: underline;
        }

        .comment-image-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .comment-image-tile {
          width: 110px;
          height: 110px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #d1d5db;
          background: #f3f4f6;
        }

        .comment-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: zoom-in;
        }

        .side-panel {
          position: sticky;
          top: 24px;
        }

        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8;
          border-radius: 22px;
          padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }

        .premium-actions h3 {
          font-size: 22px;
          color: #111827;
          margin-bottom: 8px;
        }

        .premium-actions p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 18px;
        }

        .action-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-decoration: none;
          color: #111827;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .action-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }

        .action-link-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .action-link-sub {
          font-size: 12px;
          color: #6b7280;
          margin-top: 3px;
        }

        .action-arrow {
          font-size: 18px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .image-modal {
          display: flex;
          position: fixed;
          z-index: 9999;
          inset: 0;
          background: rgba(15, 23, 42, 0.92);
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .image-modal-content {
          max-width: 92vw;
          max-height: 88vh;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          object-fit: contain;
          background: #fff;
        }

        .image-modal-close {
          position: absolute;
          top: 18px;
          right: 26px;
          font-size: 42px;
          line-height: 1;
          color: #ffffff;
          cursor: pointer;
          font-weight: 400;
          user-select: none;
          border: none;
          background: transparent;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 18px 14px 40px;
          }

          .post-shell {
            padding: 22px 18px 24px;
          }

          .progress-card {
            padding: 20px 18px;
          }

          .post-title {
            font-size: 30px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .connector {
            width: 28px;
          }

          .image-gallery.single-image .image-tile {
            height: 220px;
          }

          .image-gallery.two-images,
          .image-gallery.three-images,
          .image-gallery.multi-images {
            grid-template-columns: 1fr;
          }

          .image-gallery.two-images .image-tile,
          .image-gallery.three-images .image-tile,
          .image-gallery.three-images .image-tile.featured-top,
          .image-gallery.multi-images .image-tile {
            height: 180px;
            grid-column: auto;
          }
        }
      `}),(0,P.jsx)(`div`,{className:`page-shell`,children:(0,P.jsxs)(`div`,{className:`layout`,children:[(0,P.jsxs)(`main`,{className:`main-column`,children:[(0,P.jsxs)(`section`,{className:`progress-card`,children:[(0,P.jsx)(`div`,{className:`progress-title`,children:`Ticket Progress`}),(0,P.jsxs)(`div`,{className:`progress-wrap`,children:[(0,P.jsxs)(`div`,{className:`stage`,children:[(0,P.jsx)(`div`,{className:`dot active`,children:`✓`}),(0,P.jsx)(`div`,{className:`stage-label`,children:`Open`})]}),(0,P.jsx)(`div`,{className:`connector`}),(0,P.jsxs)(`div`,{className:`stage`,children:[(0,P.jsx)(`div`,{className:`dot ${_e.inProgress?`active`:``}`,children:_e.inProgress?`✓`:`2`}),(0,P.jsx)(`div`,{className:`stage-label`,children:`In Progress`})]}),(0,P.jsx)(`div`,{className:`connector`}),(0,P.jsxs)(`div`,{className:`stage`,children:[(0,P.jsx)(`div`,{className:`dot ${_e.resolved?`active`:``}`,children:_e.resolved?`✓`:`3`}),(0,P.jsx)(`div`,{className:`stage-label`,children:`Resolved`})]}),(0,P.jsx)(`div`,{className:`connector`}),(0,P.jsxs)(`div`,{className:`stage`,children:[(0,P.jsx)(`div`,{className:`dot ${_e.closed?`active`:``}`,children:_e.closed?`✓`:`4`}),(0,P.jsx)(`div`,{className:`stage-label`,children:`Closed`})]})]})]}),(0,P.jsxs)(`section`,{className:`post-shell`,children:[(0,P.jsxs)(`div`,{className:`post-meta-top`,children:[(0,P.jsx)(`span`,{children:`Posted by`}),(0,P.jsx)(`span`,{className:`post-author`,children:n.reporterName}),(0,P.jsx)(`span`,{className:`dot-separator`,children:`•`}),(0,P.jsx)(`span`,{children:ge(n.createdAt)})]}),(0,P.jsx)(`h1`,{className:`post-title`,children:n.title}),(0,P.jsxs)(`div`,{className:`top-status-row`,children:[(0,P.jsx)(`div`,{className:`status-chip`,children:n.status}),(0,P.jsxs)(`div`,{className:`owner-actions`,children:[(n.status===`OPEN`||n.status===`RESOLVED`)&&(0,P.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:ce,children:`Close Ticket`}),n.status===`IN PROGRESS`&&(0,P.jsx)(`div`,{className:`waiting-text`,children:`Awaiting support update`}),n.status===`CLOSED`&&(0,P.jsx)(`button`,{type:`button`,className:`delete-icon-btn`,title:`Delete ticket`,onClick:le,children:(0,P.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,children:(0,P.jsx)(`path`,{d:`M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]})]}),n.imageUrls&&n.imageUrls.length>0&&(0,P.jsx)(`div`,{className:`detail-gallery ${ye(n.imageUrls)}`,children:n.imageUrls.map((e,t)=>(0,P.jsx)(`div`,{className:`image-tile ${n.imageUrls.length===3&&t===0?`featured-top`:``}`,children:(0,P.jsx)(`img`,{src:`http://localhost:8080${e}`,alt:`Issue`,className:`issue-image`,onClick:()=>b(`http://localhost:8080${e}`)})},`${e}-${t}`))}),(0,P.jsx)(`div`,{className:`description-block`,children:(0,P.jsx)(`div`,{className:`description-text`,children:n.description})}),(0,P.jsx)(`div`,{className:`post-actions`,children:(0,P.jsxs)(`button`,{type:`button`,className:`comment-toggle-btn`,onClick:()=>{l(!0),setTimeout(()=>{x.current?.scrollIntoView({behavior:`smooth`,block:`start`})},100)},children:[`Comments (`,n.comments?.length||0,`)`]})}),(0,P.jsxs)(`section`,{className:`summary-section`,children:[(0,P.jsx)(`h2`,{className:`section-heading`,children:`Issue Summary`}),(0,P.jsxs)(`div`,{className:`summary-grid`,children:[(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Category`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.category})]}),(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Priority`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.priority})]}),(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Location Type`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.locationType})]}),(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Building / Area`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.building})]}),(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Exact Location`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.roomNumber||`-`})]}),(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Date Observed`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.incidentDate})]}),n.assetId&&(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Equipment ID / Asset Tag`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.assetId})]}),n.contactNumber&&(0,P.jsxs)(`div`,{className:`summary-item`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Preferred Contact Number`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.contactNumber})]})]})]}),(0,P.jsxs)(`section`,{className:`comments-section`,children:[(0,P.jsx)(`h2`,{className:`section-heading`,children:`Comments`}),c&&(0,P.jsxs)(`div`,{className:`comment-form-wrap`,ref:x,children:[m&&(0,P.jsxs)(`div`,{style:{background:`#eef2ff`,border:`1px solid #c7d2fe`,color:`#3730a3`,borderRadius:`14px`,padding:`12px 14px`,marginBottom:`12px`,fontSize:`13px`,lineHeight:`1.6`},children:[`Replying to `,(0,P.jsx)(`strong`,{children:m.authorName}),`:`,` `,m.text,(0,P.jsx)(`div`,{style:{marginTop:`10px`},children:(0,P.jsx)(`button`,{type:`button`,className:`cancel-edit-btn`,onClick:()=>h(null),children:`Cancel Reply`})})]}),(0,P.jsx)(`form`,{onSubmit:ue,children:(0,P.jsxs)(`div`,{className:`comment-entry-box`,children:[(0,P.jsx)(`textarea`,{name:`text`,placeholder:`Join the conversation`,value:u,onChange:e=>d(e.target.value)}),(0,P.jsx)(`div`,{className:`comment-image-preview-container`,children:C.map((e,t)=>(0,P.jsxs)(`div`,{className:`comment-image-preview-item`,children:[(0,P.jsx)(`img`,{src:URL.createObjectURL(e),alt:`preview`}),(0,P.jsx)(`button`,{type:`button`,className:`comment-remove-image-btn`,onClick:()=>N(t),children:`×`})]},`${e.name}-${t}`))}),(0,P.jsx)(`input`,{type:`file`,accept:`image/*`,multiple:!0,hidden:!0,id:`commentImagesInput`,onChange:be}),ee&&(0,P.jsx)(`div`,{className:`field-error`,children:ee}),f&&(0,P.jsx)(`div`,{className:`field-error`,children:f}),(0,P.jsxs)(`div`,{className:`comment-toolbar`,children:[(0,P.jsxs)(`div`,{className:`comment-toolbar-left`,children:[(0,P.jsx)(`button`,{type:`button`,className:`comment-icon-btn`,onClick:()=>document.getElementById(`commentImagesInput`).click(),children:`🖼️`}),(0,P.jsx)(`span`,{className:`comment-gif-label`,children:`GIF`})]}),(0,P.jsxs)(`div`,{className:`comment-toolbar-right`,children:[(0,P.jsx)(`button`,{type:`button`,className:`comment-menu-dots`,children:`…`}),(0,P.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:()=>{l(!1),d(``),p(``),w([]),T(``),h(null)},children:`Cancel`}),(0,P.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Comment`})]})]})]})})]}),n.comments&&n.comments.length>0?(0,P.jsx)(`div`,{className:`comments-list`,children:xe(n.comments).map(e=>Se(e))}):(0,P.jsx)(`div`,{className:`empty-comments`,children:`No comments yet. Start the conversation using the comments button above.`})]})]})]}),(0,P.jsx)(`aside`,{className:`side-panel`,children:(0,P.jsxs)(`section`,{className:`premium-actions`,children:[(0,P.jsx)(`h3`,{children:`Quick Actions`}),(0,P.jsx)(`p`,{children:`Move through your support space quickly with these shortcuts.`}),(0,P.jsxs)(`div`,{className:`action-links`,children:[(0,P.jsxs)(Dn,{to:`/`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Return to Help Centre`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Go back to the support home`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/my-reports`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`View My Reports`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`See tickets you created`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/featured`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Featured Conversations`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Browse public issue discussions`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(Dn,{to:`/report`,className:`action-link`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Create Another Report`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Submit a new issue ticket`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]})]})]})})]})}),y&&(0,P.jsxs)(`div`,{className:`image-modal`,onClick:()=>b(``),children:[(0,P.jsx)(`button`,{className:`image-modal-close`,onClick:()=>b(``),children:`×`}),(0,P.jsx)(`img`,{className:`image-modal-content`,src:y,alt:`Expanded issue`,onClick:e=>e.stopPropagation()})]})]})}function Qa(){let[e,t]=(0,S.useState)([]),[n,r]=(0,S.useState)(!0),[i,a]=(0,S.useState)(``),o=ot(),[s]=Fn(),c=s.get(`search`)?.toLowerCase().trim()||``,[l,u]=(0,S.useState)(`all`),[d,f]=(0,S.useState)(`all`),[p,m]=(0,S.useState)(`all`),[h,g]=(0,S.useState)(`all`);(0,S.useEffect)(()=>{_()},[]);let _=async()=>{try{r(!0),t([...(await Ba()).data].sort((e,t)=>(t.id||0)-(e.id||0))),a(``)}catch(e){console.error(e),a(`Failed to load featured conversations.`)}finally{r(!1)}},v=e=>{if(!e)return`Just now`;let t=e.replace(`T`,` `).split(`.`)[0],n=new Date(t);return Number.isNaN(n.getTime())?`Just now`:n.toLocaleString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},y=(e,t=220)=>e?e.length>t?e.substring(0,t)+`...`:e:``,b=()=>x.filter(e=>{let t=l===`all`||e.status===l,n=d===`all`||e.priority===d,r=p===`all`||e.category===p,i=h===`all`||e.building===h;return t&&n&&r&&i}),x=e.filter(e=>c?[e.title,e.description,e.category,e.building,e.locationType,e.priority,e.roomNumber].filter(Boolean).join(` `).toLowerCase().includes(c):!0);return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f6f7f8;
          color: #1f2937;
        }

        .page-shell {
          max-width: 1320px;
          margin: 0 auto;
          padding: 28px 24px 56px;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 28px;
          align-items: start;
        }

        .main-column {
          min-width: 0;
        }

        .page-header {
          padding: 8px 4px 20px;
          margin-bottom: 6px;
        }

        .page-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 10px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .feed-shell {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feed-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 22px 24px 18px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
          cursor: pointer;
        }

        .feed-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.06);
          border-color: #d9e2ec;
        }

        .feed-meta-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 13px;
          color: #7b8794;
        }

        .feed-meta-author {
          font-weight: 700;
          color: #344054;
        }

        .feed-dot {
          color: #c5ced8;
        }

        .feed-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 10px;
        }

        .feed-main {
          min-width: 0;
          flex: 1;
        }

        .feed-title {
          font-size: 26px;
          line-height: 1.28;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 13px;
          border-radius: 999px;
          background: #e8f0fe;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .feed-desc {
          font-size: 16px;
          line-height: 1.75;
          color: #5f6c7b;
          margin-bottom: 18px;
          word-break: break-word;
        }

        .feed-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
        }

        .feed-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
        }

        .comment-count {
          font-size: 14px;
          font-weight: 700;
          color: #667085;
          white-space: nowrap;
          margin-left: auto;
        }

        .empty-state {
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 22px;
          padding: 30px 24px;
          color: #667085;
          font-size: 16px;
          line-height: 1.8;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.03);
        }

        .side-panel {
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8;
          border-radius: 22px;
          padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }

        .premium-actions h3 {
          font-size: 22px;
          color: #111827;
          margin-bottom: 8px;
        }

        .premium-actions p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 18px;
        }

        .action-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-decoration: none;
          color: #111827;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }

        .action-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }

        .action-link-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .action-link-sub {
          font-size: 12px;
          color: #6b7280;
          margin-top: 3px;
        }

        .action-arrow {
          font-size: 18px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .side-card {
          background: #ffffff;
          border: 1px solid #edeff1;
          border-radius: 18px;
          padding: 22px 20px;
        }

        .side-card h3 {
          font-size: 17px;
          color: #111827;
          margin-bottom: 12px;
        }

        .side-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
        }

        .error-state {
          background: #ffffff;
          border: 1px solid #fecaca;
          border-radius: 22px;
          padding: 24px;
          color: #b91c1c;
          font-size: 15px;
          line-height: 1.7;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid #e7ebf0;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: center;
        }

        .filter-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          color: #111827;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23667085' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          height: 40px;
          flex-shrink: 0;
        }

        .filter-select.status-select,
        .filter-select.priority-select {
          width: 120px;
        }

        .filter-select.category-select,
        .filter-select.building-select {
          width: 160px;
        }

        .filter-select:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .filter-select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .filter-divider {
          width: 1px;
          height: 24px;
          background: #e5e7eb;
          margin: 0 4px;
        }

        .clear-filters-btn {
          padding: 10px 12px;
          border: 1px solid #dc2626;
          background: transparent;
          color: #dc2626;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 40px;
          width: 100px;
          flex-shrink: 0;
          align-self: center;
          margin-left: auto;
        }

        .clear-filters-btn:hover {
          background: rgba(220, 38, 38, 0.08);
          color: #dc2626;
        }

        @media (max-width: 1100px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .side-panel {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .page-shell {
            padding: 18px 14px 40px;
          }

          .page-title {
            font-size: 38px;
          }

          .page-subtitle {
            font-size: 16px;
          }

          .feed-card {
            padding: 18px 16px;
          }

          .feed-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .feed-title {
            font-size: 23px;
          }

          .feed-desc {
            font-size: 15px;
          }

          .feed-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .comment-count {
            margin-left: 0;
          }
        }
      `}),(0,P.jsx)(`div`,{className:`page-shell`,children:(0,P.jsxs)(`div`,{className:`layout`,children:[(0,P.jsxs)(`main`,{className:`main-column`,children:[(0,P.jsxs)(`section`,{className:`page-header`,children:[(0,P.jsx)(`div`,{className:`page-eyebrow`,children:`Community Feed`}),(0,P.jsx)(`h1`,{className:`page-title`,children:`Featured Conversations`}),(0,P.jsxs)(`p`,{className:`page-subtitle`,children:[`Explore reported issues and join helpful discussions.`,c&&` Showing results for "${c}".`]})]}),n?(0,P.jsx)(`section`,{className:`empty-state`,children:`Loading conversations...`}):i?(0,P.jsx)(`section`,{className:`error-state`,children:i}):x.length>0?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`filter-container`,children:[(0,P.jsx)(`span`,{className:`filter-label`,children:`Filter by:`}),(0,P.jsxs)(`select`,{className:`filter-select status-select`,value:l,onChange:e=>u(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Status`}),(0,P.jsx)(`option`,{value:`OPEN`,children:`Open`}),(0,P.jsx)(`option`,{value:`IN PROGRESS`,children:`In Progress`}),(0,P.jsx)(`option`,{value:`RESOLVED`,children:`Resolved`}),(0,P.jsx)(`option`,{value:`CLOSED`,children:`Closed`})]}),(0,P.jsxs)(`select`,{className:`filter-select priority-select`,value:d,onChange:e=>f(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Priority`}),(0,P.jsx)(`option`,{value:`Low`,children:`Low`}),(0,P.jsx)(`option`,{value:`Medium`,children:`Medium`}),(0,P.jsx)(`option`,{value:`High`,children:`High`}),(0,P.jsx)(`option`,{value:`Urgent`,children:`Urgent`})]}),(0,P.jsxs)(`select`,{className:`filter-select category-select`,value:p,onChange:e=>m(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Category`}),(0,P.jsx)(`option`,{value:`Classroom Facilities`,children:`Classroom Facilities`}),(0,P.jsx)(`option`,{value:`Laboratory Equipment`,children:`Laboratory Equipment`}),(0,P.jsx)(`option`,{value:`IT / Network`,children:`IT / Network`}),(0,P.jsx)(`option`,{value:`Electrical`,children:`Electrical`}),(0,P.jsx)(`option`,{value:`Furniture`,children:`Furniture`}),(0,P.jsx)(`option`,{value:`Air Conditioning / Ventilation`,children:`Air Conditioning / Ventilation`}),(0,P.jsx)(`option`,{value:`Plumbing / Water`,children:`Plumbing / Water`}),(0,P.jsx)(`option`,{value:`Cleanliness / Housekeeping`,children:`Cleanliness / Housekeeping`}),(0,P.jsx)(`option`,{value:`Safety Hazard`,children:`Safety Hazard`}),(0,P.jsx)(`option`,{value:`Other`,children:`Other`})]}),(0,P.jsxs)(`select`,{className:`filter-select building-select`,value:h,onChange:e=>g(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Buildings`}),(0,P.jsx)(`option`,{value:`Main Building`,children:`Main Building`}),(0,P.jsx)(`option`,{value:`Engineering Building`,children:`Engineering Building`}),(0,P.jsx)(`option`,{value:`Computing Building`,children:`Computing Building`}),(0,P.jsx)(`option`,{value:`Library`,children:`Library`}),(0,P.jsx)(`option`,{value:`Administration Block`,children:`Administration Block`}),(0,P.jsx)(`option`,{value:`Auditorium`,children:`Auditorium`}),(0,P.jsx)(`option`,{value:`Student Center`,children:`Student Center`}),(0,P.jsx)(`option`,{value:`Hostel Area`,children:`Hostel Area`}),(0,P.jsx)(`option`,{value:`Parking Area`,children:`Parking Area`}),(0,P.jsx)(`option`,{value:`Other`,children:`Other`})]}),(l!==`all`||d!==`all`||p!==`all`||h!==`all`)&&(0,P.jsx)(`button`,{className:`clear-filters-btn`,onClick:()=>{u(`all`),f(`all`),m(`all`),g(`all`)},children:`Clear Filters`})]}),(0,P.jsxs)(`section`,{className:`feed-shell`,children:[b().map(e=>(0,P.jsxs)(`div`,{className:`feed-card`,onClick:()=>o(`/issues/${e.id}`),children:[(0,P.jsxs)(`div`,{className:`feed-meta-top`,children:[(0,P.jsx)(`span`,{children:`Posted by`}),(0,P.jsx)(`span`,{className:`feed-meta-author`,children:e.reporterName}),(0,P.jsx)(`span`,{className:`feed-dot`,children:`•`}),(0,P.jsx)(`span`,{children:v(e.createdAt)})]}),(0,P.jsxs)(`div`,{className:`feed-row`,children:[(0,P.jsx)(`div`,{className:`feed-main`,children:(0,P.jsx)(`div`,{className:`feed-title`,children:e.title})}),(0,P.jsx)(`span`,{className:`status-chip`,children:e.status})]}),(0,P.jsx)(`div`,{className:`feed-desc`,children:y(e.description,220)}),(0,P.jsxs)(`div`,{className:`feed-bottom`,children:[(0,P.jsxs)(`div`,{className:`feed-tags`,children:[(0,P.jsx)(`span`,{className:`meta-pill`,children:e.category}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.priority}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.building}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.locationType})]}),(0,P.jsxs)(`div`,{className:`comment-count`,children:[e.comments?.length||0,` comments`]})]})]},e.id)),b().length===0&&(0,P.jsx)(`div`,{className:`empty-state`,children:`No conversations match the selected filters.`})]})]}):(0,P.jsx)(`section`,{className:`empty-state`,children:c?`No conversations found for "${c}".`:`No conversations available yet.`})]}),(0,P.jsxs)(`aside`,{className:`side-panel`,children:[(0,P.jsxs)(`section`,{className:`premium-actions`,children:[(0,P.jsx)(`h3`,{children:`Quick Actions`}),(0,P.jsx)(`p`,{children:`Move through your support space quickly with these shortcuts.`}),(0,P.jsxs)(`div`,{className:`action-links`,children:[(0,P.jsxs)(`div`,{className:`action-link`,onClick:()=>o(`/`),children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Return to Help Centre`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Go back to the support home`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(`div`,{className:`action-link`,onClick:()=>o(`/report`),children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`Report an Issue`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`Create a new support ticket`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]}),(0,P.jsxs)(`div`,{className:`action-link`,onClick:()=>o(`/my-reports`),children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`action-link-title`,children:`View My Reports`}),(0,P.jsx)(`div`,{className:`action-link-sub`,children:`See tickets you created`})]}),(0,P.jsx)(`div`,{className:`action-arrow`,children:`→`})]})]})]}),(0,P.jsxs)(`section`,{className:`side-card`,children:[(0,P.jsx)(`h3`,{children:`About this page`}),(0,P.jsx)(`p`,{children:`Browse recent public issue discussions and open any ticket to read or join the conversation.`})]})]})]})})]})}var $a=()=>V.get(`/admin/issues`),eo=()=>V.get(`/admin/technicians`),to=()=>V.get(`/admin/summary`),no=(e,t)=>V.patch(`/admin/issues/${e}/status`,{status:t}),ro=(e,t)=>V.patch(`/admin/issues/${e}/assign`,{technicianId:t}),io=e=>V.patch(`/admin/issues/${e}/unassign`),ao=(e,t,n=null,r=`PUBLIC`)=>V.post(`/admin/issues/${e}/comments`,{text:t,parentCommentId:n,visibility:r}),oo=(e,t,n)=>V.patch(`/admin/issues/${e}/comments/${t}`,{text:n}),so=(e,t)=>V.delete(`/admin/issues/${e}/comments/${t}`),co=e=>V.delete(`/admin/issues/${e}`),lo=e=>{if(typeof window>`u`)return[];try{return JSON.parse(window.localStorage.getItem(e)||`[]`)}catch{return[]}},uo=(e,t)=>{typeof window>`u`||window.localStorage.setItem(e,JSON.stringify(t))},H=(e,t,n)=>{if(typeof window>`u`)return t;let r=window.localStorage.getItem(e);return n.includes(r)?r:t},U=()=>{if(typeof window>`u`)return{};try{return JSON.parse(window.localStorage.getItem(`helpdesk-admin-escalation-acks`)||`{}`)}catch{return{}}};function fo(){let[e,t]=(0,S.useState)([]),[n,r]=(0,S.useState)([]),[i,a]=(0,S.useState)({}),[o,s]=(0,S.useState)(null),[c,l]=(0,S.useState)(()=>H(`helpdesk-admin-status-filter`,`OPEN`,[`OPEN`,`IN PROGRESS`,`RESOLVED`])),[u,d]=(0,S.useState)(``),[f,p]=(0,S.useState)(!0),[m,h]=(0,S.useState)(``),[g,_]=(0,S.useState)(null),[v,y]=(0,S.useState)(`PUBLIC`),[b,x]=(0,S.useState)(`PUBLIC`),[C,w]=(0,S.useState)(()=>lo(`helpdesk-admin-read-private-technician-alerts`)),[ee,T]=(0,S.useState)(``),[E,D]=(0,S.useState)(null),[te,ne]=(0,S.useState)(``),[O,re]=(0,S.useState)(null),[ie,ae]=(0,S.useState)(`all`),[oe,k]=(0,S.useState)(`all`),[A,se]=(0,S.useState)(`all`),[ce,le]=(0,S.useState)(!1),[ue,j]=(0,S.useState)(()=>U()),M=(0,S.useRef)({}),de=()=>u.trim()?{eyebrow:`No matches`,title:`Nothing matched this search`,description:`Try another keyword, building, reporter, or issue category to surface the right ticket.`,accent:`Refine search`,support:`Search by title, category, reporter, building, or technician name.`}:c===`OPEN`?{eyebrow:`Open queue clear`,title:`No open issues right now`,description:`Newly reported requests will appear here for triage, assignment, and next-step coordination.`,accent:`Awaiting new reports`,support:`Fresh submissions will land here first for review and technician assignment.`}:c===`IN PROGRESS`?{eyebrow:`Work moving smoothly`,title:`No issues are in progress`,description:`When active work begins, this queue will show the tickets currently being handled by technicians.`,accent:`No active work items`,support:`Technician updates and latest alerts will appear here while work is underway.`}:{eyebrow:`Resolved queue clear`,title:`No resolved issues yet`,description:`Completed tickets will collect here so you can review outcomes and remove them from the admin queue when needed.`,accent:`Nothing completed yet`,support:`Resolved items stay here for final review before you clear them from the queue.`},fe=({eyebrow:e,title:t,description:n,accent:r,support:i,compact:a=!1})=>{let o={minHeight:a?`180px`:`340px`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,textAlign:`center`,padding:a?`24px 20px`:`38px 28px`,border:`1px solid #d8e5f6`,borderRadius:a?`22px`:`28px`,background:`radial-gradient(circle at top, rgba(37, 99, 235, 0.12), transparent 52%), linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)`,boxShadow:a?`inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 10px 24px rgba(15, 23, 42, 0.04)`:`inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 18px 38px rgba(15, 23, 42, 0.06)`},s={width:a?`68px`:`96px`,height:a?`68px`:`96px`,borderRadius:a?`22px`:`30px`,background:`radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 58%), linear-gradient(145deg, #ffffff 0%, #edf4ff 100%)`,border:`1px solid #d5e3f8`,boxShadow:a?`inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 12px 24px rgba(37, 99, 235, 0.08)`:`inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 18px 34px rgba(37, 99, 235, 0.12)`,display:`grid`,placeItems:`center`,marginBottom:a?`16px`:`22px`,position:`relative`},c={position:`absolute`,inset:a?`8px`:`10px`,borderRadius:a?`16px`:`22px`,border:`1px solid rgba(143, 179, 232, 0.45)`},l={width:a?`36px`:`44px`,height:a?`36px`:`44px`,borderRadius:a?`14px`:`16px`,border:`2px solid #7fa7df`,position:`relative`,background:`linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%)`,boxShadow:`inset 0 1px 0 rgba(255, 255, 255, 0.9)`},u={position:`absolute`,left:`8px`,right:`8px`,height:`2px`,borderRadius:`999px`,background:`#7fa7df`};return(0,P.jsxs)(`div`,{style:o,children:[(0,P.jsxs)(`div`,{style:s,children:[(0,P.jsx)(`div`,{style:c}),(0,P.jsxs)(`div`,{style:l,children:[(0,P.jsx)(`div`,{style:{...u,top:a?`11px`:`13px`}}),(0,P.jsx)(`div`,{style:{...u,top:a?`19px`:`23px`,right:a?`12px`:`13px`}})]})]}),(0,P.jsx)(`div`,{style:{fontSize:`11px`,fontWeight:800,letterSpacing:`0.08em`,textTransform:`uppercase`,color:`#2563eb`,marginBottom:`8px`},children:e}),r?(0,P.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,minHeight:`32px`,padding:`0 14px`,borderRadius:`999px`,background:`rgba(37, 99, 235, 0.08)`,border:`1px solid rgba(37, 99, 235, 0.12)`,color:`#1d4ed8`,fontSize:`12px`,fontWeight:800,marginBottom:`12px`},children:r}):null,(0,P.jsx)(`div`,{style:{fontSize:a?`20px`:`26px`,lineHeight:1.2,fontWeight:800,color:`#0f172a`,marginBottom:`10px`,maxWidth:a?`360px`:`520px`},children:t}),(0,P.jsx)(`div`,{style:{maxWidth:a?`360px`:`420px`,color:`#64748b`,fontSize:a?`14px`:`15px`,lineHeight:a?1.7:1.8},children:n}),i?(0,P.jsx)(`div`,{style:{marginTop:`16px`,fontSize:`13px`,lineHeight:1.7,color:`#7b8798`,maxWidth:`430px`},children:i}):null]})};(0,S.useEffect)(()=>{pe()},[]),(0,S.useEffect)(()=>{typeof window>`u`||window.localStorage.setItem(`helpdesk-admin-status-filter`,c)},[c]),(0,S.useEffect)(()=>{typeof window>`u`||window.localStorage.setItem(`helpdesk-admin-escalation-acks`,JSON.stringify(ue))},[ue]);let pe=async()=>{try{p(!0);let[e,n,i]=await Promise.all([$a(),eo(),to()]),o=(e.data||[]).filter(e=>e.status!==`CLOSED`);if(t(o),r(n.data||[]),a(i.data||{}),o.length>0){let e=o.find(e=>e.status===c)||o[0];s(t=>t??e.id)}else s(null)}catch(e){console.error(e),alert(`Failed to load admin data.`)}finally{p(!1)}},me=(0,S.useMemo)(()=>new Set(n.map(e=>e.email)),[n]),he=(0,S.useMemo)(()=>{let e=new Set(n.map(e=>e.team).filter(Boolean));return Array.from(e).sort()},[n]),ge=(0,S.useMemo)(()=>{let e=new Set(n.map(e=>e.specialization).filter(Boolean));return Array.from(e).sort()},[n]),_e=(0,S.useMemo)(()=>{let e=new Set(n.map(e=>e.status).filter(Boolean));return Array.from(e).sort()},[n]),ve=(0,S.useMemo)(()=>n.filter(e=>{let t=ie===`all`||e.team===ie,n=oe===`all`||e.specialization===oe,r=A===`all`||e.status===A;return t&&n&&r}),[n,ie,oe,A]),ye=e=>{if(!e)return`—`;let t=e.replace(`T`,` `).split(`.`)[0],n=new Date(t);return Number.isNaN(n.getTime())?`—`:n.toLocaleString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},be=(0,S.useMemo)(()=>e.filter(e=>{let t=e.status===c,n=[e.title,e.description,e.category,e.building,e.locationType,e.reporterName,e.assignedTechnicianName].filter(Boolean).join(` `).toLowerCase().includes(u.toLowerCase().trim());return t&&n}),[e,c,u]);(0,S.useEffect)(()=>{be.some(e=>e.id===o)||s(be[0]?.id??null)},[be,o]),(0,S.useEffect)(()=>{O&&M.current[O]&&(M.current[O].scrollIntoView({behavior:`smooth`,block:`center`}),re(null))},[O]);let N=(0,S.useMemo)(()=>e.find(e=>e.id===o)||null,[e,o]),xe=e=>[e?.escalationLevel,e?.escalationTitle,e?.escalationReason].filter(Boolean).join(`|`),Se=e=>e===`ESCALATED`?3:e===`NEEDS ATTENTION`?2:e===`DELAYED`?1:0,Ce=(0,S.useMemo)(()=>e.filter(e=>{if(!e.escalationFlagged)return!1;let t=xe(e);return ue[String(e.id)]!==t}),[e,ue]),we=Ce.length,Te=e=>e===`ESCALATED`?{badgeBg:`#fee2e2`,badgeText:`#b91c1c`,border:`#fecaca`,surface:`linear-gradient(180deg, #fff7f7 0%, #fff1f2 100%)`}:e===`NEEDS ATTENTION`?{badgeBg:`#fef3c7`,badgeText:`#b45309`,border:`#fcd34d`,surface:`linear-gradient(180deg, #fffdf5 0%, #fff7e8 100%)`}:e===`DELAYED`?{badgeBg:`#dbeafe`,badgeText:`#1d4ed8`,border:`#bfdbfe`,surface:`linear-gradient(180deg, #f8fbff 0%, #eff6ff 100%)`}:{badgeBg:`#e5e7eb`,badgeText:`#4b5563`,border:`#d1d5db`,surface:`#ffffff`},Ee=N?.imageUrls||[];(0,S.useEffect)(()=>{j(t=>{let n={};return e.forEach(e=>{if(!e.escalationFlagged)return;let r=xe(e);t[String(e.id)]===r&&(n[String(e.id)]=r)}),Object.keys(t).length===Object.keys(n).length&&Object.keys(t).every(e=>t[e]===n[e])?t:n})},[e]),(0,S.useEffect)(()=>{we===0&&ce&&le(!1)},[we,ce]);let De=e=>{if(!e?.escalationFlagged)return;let t=xe(e);t&&j(n=>({...n,[String(e.id)]:t}))},Oe=e=>e?.visibility===`PRIVATE`?`PRIVATE`:`PUBLIC`,ke=e=>{let t=(e.comments||[]).filter(e=>me.has(e.authorEmail)).sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n});return t.length?t[0]:null},Ae=(0,S.useMemo)(()=>N?.comments?[...N.comments].sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}):[],[N]),je=(0,S.useMemo)(()=>N?.comments?[...N.comments].filter(e=>me.has(e.authorEmail)).sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}):[],[N,me]),Me=(0,S.useMemo)(()=>je.filter(e=>Oe(e)===`PUBLIC`),[je]),Ne=(0,S.useMemo)(()=>je.filter(e=>Oe(e)===`PRIVATE`),[je]),Pe=(0,S.useMemo)(()=>Ne.filter(e=>!C.includes(e.id)),[Ne,C]),Fe=b===`PRIVATE`?Ne:Me,Ie=e=>{let t=(e?.authorEmail||``).trim().toLowerCase(),n=(e?.authorName||``).trim().toLowerCase(),r=(N?.assignedTechnicianEmail||``).trim().toLowerCase(),i=(N?.assignedTechnicianName||``).trim().toLowerCase();return t&&me.has(t)||r&&t===r||i&&n===i||t===`technician@helpdesk.edu`};(0,S.useEffect)(()=>{b!==`PRIVATE`||Ne.length===0||w(e=>{let t=Array.from(new Set([...e,...Ne.map(e=>e.id)]));return t.length===e.length?e:(uo(`helpdesk-admin-read-private-technician-alerts`,t),t)})},[b,Ne]);let Le=async(t,n)=>{try{let r=e.find(e=>e.id===t);await no(t,n),De(r),await pe(),l(n),s(null)}catch(e){console.error(e),alert(e?.response?.data?.text||e?.response?.data?.message||`Failed to update issue status.`)}},Re=async(t,n)=>{try{let r=e.find(e=>e.id===t);await ro(t,n),De(r),await pe(),s(t)}catch(e){console.error(e),alert(`Failed to assign technician.`)}},ze=async t=>{try{let n=e.find(e=>e.id===t);await io(t),De(n),await pe(),s(t)}catch(e){console.error(e),alert(e?.response?.data?.message||`Failed to cancel technician assignment.`)}},Be=async()=>{let e=m.trim();if(!e||!N)return;let n=g?g.id:null;try{let r=await ao(N.id,e,n,g?Oe(g):v);De(N);let i=r.data;t(e=>e.map(e=>e.id===i.id?i:e)),s(i.id),h(``),_(null),y(`PUBLIC`);let a=[...i.comments||[]].filter(e=>e.authorEmail===`admin@helpdesk.edu`&&(e.parentCommentId||null)===n).sort((e,t)=>(t.id||0)-(e.id||0))[0];a&&re(a.id)}catch(e){console.error(e),alert(`Failed to send admin note.`)}},Ve=e=>{_(e),y(Oe(e)),h(``),setTimeout(()=>{let e=document.querySelector(`.admin-note-box textarea`);e&&(e.scrollIntoView({behavior:`smooth`,block:`center`}),e.focus())},120)},He=e=>{D(e.id),ne(e.text||``)},Ue=()=>{D(null),ne(``)},We=async e=>{let t=te.trim();if(!(!t||!N))try{await oo(N.id,e,t),D(null),ne(``),await pe(),s(N.id)}catch(e){console.error(e),alert(`Failed to update admin comment.`)}},Ge=async e=>{if(N&&window.confirm(`Delete this admin comment?`))try{await so(N.id,e),await pe(),s(N.id)}catch(e){console.error(e),alert(`Failed to delete admin comment.`)}},Ke=async()=>{if(N&&window.confirm(`Delete this resolved issue from admin workflow?`))try{De(N),await co(N.id),await pe()}catch(e){console.error(e),alert(e?.response?.data?.message||`Failed to delete resolved issue.`)}},qe=(e=[])=>{let t=[...e].sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}),n=new Map;t.forEach(e=>{n.set(e.id,{...e,replies:[]})});let r=[];return t.forEach(e=>{e.parentCommentId&&n.has(e.parentCommentId)?n.get(e.parentCommentId).replies.push(n.get(e.id)):r.push(n.get(e.id))}),r},Je=(e,t=0)=>(0,P.jsx)(`div`,{ref:t=>{t&&(M.current[e.id]=t)},style:{marginLeft:t>0?`${Math.min(t*28,84)}px`:`0px`,borderLeft:t>0?`3px solid #e5e7eb`:`none`,paddingLeft:t>0?`14px`:`0px`,marginTop:t>0?`14px`:`0px`},children:(0,P.jsxs)(`div`,{className:`conversation-card`,children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[(0,P.jsx)(`span`,{className:`conversation-author`,children:e.authorName}),Ie(e)&&(0,P.jsx)(`span`,{className:`role-badge`,children:`TECH`}),` •`,` `,ye(e.createdAt)]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:e.text}),Oe(e)===`PRIVATE`&&(0,P.jsx)(`div`,{style:{marginTop:`8px`},children:(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`})}),(0,P.jsxs)(`div`,{style:{marginTop:`12px`,display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>Ve(e),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#2563eb`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Reply`}),e.authorEmail===`admin@helpdesk.edu`&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>He(e),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#2563eb`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Edit`}),(0,P.jsx)(`button`,{type:`button`,onClick:()=>Ge(e.id),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#ef4444`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Delete`})]})]}),E===e.id&&(0,P.jsxs)(`div`,{style:{marginTop:`10px`},children:[(0,P.jsx)(`textarea`,{className:`admin-note-box`,value:te,onChange:e=>ne(e.target.value),style:{width:`100%`,minHeight:`80px`,padding:`10px`,borderRadius:`8px`,border:`1px solid #d7deea`,fontSize:`14px`,marginBottom:`8px`}}),(0,P.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,P.jsx)(`button`,{className:`admin-note-btn`,onClick:()=>We(e.id),children:`Save`}),(0,P.jsx)(`button`,{className:`danger-btn`,onClick:Ue,children:`Cancel`})]})]}),e.replies&&e.replies.length>0&&(0,P.jsx)(`div`,{children:e.replies.map(e=>Je(e,t+1))})]})},e.id),Ye=c===`OPEN`?`Incoming Issues`:c===`IN PROGRESS`?`In Progress Queue`:`Resolved Queue`,Xe=de();return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #f5f7fb; color: #111827; }

        .admin-shell {
          max-width: 1480px;
          margin: 0 auto;
          padding: 24px 22px 50px;
        }

        .page-header {
          padding: 8px 4px 20px;
          margin-bottom: 6px;
        }

        .page-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 0.01px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .summary-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e5edf8;
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .summary-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
        }

        .summary-card.attention {
          background: linear-gradient(145deg, #fff8ec 0%, #fff3da 100%);
          border-color: #f6d18b;
          cursor: pointer;
        }

        .summary-card.attention .summary-value {
          color: #b45309;
        }

        .toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .toolbar-search {
          flex: 1;
          min-width: 280px;
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 14px 18px;
          font-size: 15px;
          outline: none;
          background: #ffffff;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
        }

        .status-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-tab {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .status-tab.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
        }

        .assistant-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 28px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.1);
          color: #1d4ed8;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .escalation-level-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 28px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid transparent;
        }

        .attention-panel {
          margin-bottom: 18px;
          padding: 20px;
          border-radius: 24px;
          border: 1px solid #f5d08a;
          background: linear-gradient(135deg, #fffaf0 0%, #fff6e8 100%);
          box-shadow: 0 14px 28px rgba(180, 83, 9, 0.08);
        }

        .attention-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .attention-panel-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 8px;
        }

        .attention-panel-text {
          font-size: 14px;
          line-height: 1.8;
          color: #6b7280;
          max-width: 780px;
        }

        .attention-close-btn {
          border: 1px solid #f2c77b;
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.78);
          color: #9a5b05;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .attention-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .attention-ticket {
          border-radius: 18px;
          border: 1px solid #ecd6aa;
          background: rgba(255, 255, 255, 0.82);
          padding: 16px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 14px;
          align-items: center;
        }

        .attention-ticket-title {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
          margin: 10px 0 8px;
        }

        .attention-ticket-meta {
          font-size: 13px;
          line-height: 1.7;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .attention-ticket-reason {
          font-size: 14px;
          line-height: 1.8;
          color: #4b5563;
        }

        .attention-ticket-action {
          margin-top: 8px;
          font-size: 12px;
          line-height: 1.7;
          color: #8a5303;
          font-weight: 700;
        }

        .attention-ticket-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          min-width: 180px;
        }

        .attention-review-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          background: #b45309;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(180, 83, 9, 0.18);
        }

        .alert-tabs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px;
          padding: 3px;
          border: 1px solid #edf2f7;
          border-radius: 12px;
          background: #ffffff;
          margin-bottom: 16px;
          width: 100%;
        }

        .alert-tab {
          width: 100%;
          border: none;
          border-radius: 9px;
          padding: 7px 11px;
          background: transparent;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .alert-tab.active {
          background: #f1f5f9;
          color: #111827;
        }

        .private-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          margin-left: 6px;
          padding: 0 6px;
          border-radius: 999px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
        }

        .private-chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 4px 8px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
          margin-left: 8px;
        }

        .reply-link {
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .reply-link:hover {
          color: #2563eb;
        }

        .channel-toggle {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 12px 16px;
          border-bottom: 1px solid #edf2f7;
          background: #fafcff;
        }

        .channel-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 8px 12px;
          background: #ffffff;
          color: #475467;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .channel-btn.active {
          border-color: #2563eb;
          background: #eaf2ff;
          color: #1d4ed8;
        }

        .admin-layout {
          display: grid;
          grid-template-columns: 430px minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }

        .panel-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 26px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .issues-panel {
          overflow: hidden;
        }

        .panel-header {
          padding: 22px 22px 14px;
          border-bottom: 1px solid #edf2f7;
        }

        .panel-title {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px;
          max-height: 840px;
          overflow: auto;
        }

        .issue-card {
          border: 1px solid #e6ebf2;
          border-radius: 22px;
          background: linear-gradient(145deg, #ffffff 0%, #fbfdff 100%);
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .issue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
          border-color: #ccd8ea;
        }

        .issue-card.active {
          border-color: #2563eb;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
        }

        .issue-card-top {
          display: grid;
          grid-template-columns: 80px minmax(0, 1fr) auto;
          gap: 14px;
          align-items: start;
          margin-bottom: 12px;
        }

        .issue-thumb {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          overflow: hidden;
          background: #eef2f7;
          border: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .issue-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .issue-title {
          font-size: 18px;
          font-weight: 900;
          line-height: 1.35;
          color: #111827;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          margin-bottom: 8px;
        }

        .issue-meta {
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eaf2ff;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .issue-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 12px;
          font-weight: 800;
        }

        .tech-alert {
          margin-top: 12px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
          border-radius: 14px;
          padding: 12px 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .tech-alert strong {
          color: #7c2d12;
        }

        .issue-escalation-panel {
          margin-top: 14px;
          padding: 14px 15px;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
        }

        .issue-escalation-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .issue-escalation-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .issue-escalation-text {
          font-size: 13px;
          line-height: 1.7;
          color: #5b6472;
          margin-bottom: 8px;
        }

        .issue-escalation-action {
          font-size: 12px;
          line-height: 1.7;
          color: #7c4a03;
          font-weight: 700;
        }

        .smart-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .assistant-card {
          border-radius: 18px;
          border: 1px solid #e5edf8;
          background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);
          padding: 16px;
        }

        .assistant-card-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 8px;
        }

        .assistant-card-value {
          font-size: 22px;
          line-height: 1.35;
          font-weight: 800;
          color: #0f172a;
        }

        .assistant-card-text {
          font-size: 14px;
          line-height: 1.75;
          color: #64748b;
        }

        .detail-card {
          padding: 24px;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 18px;
        }

        .detail-title {
          font-size: 34px;
          line-height: 1.15;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .detail-meta {
          font-size: 14px;
          line-height: 1.8;
          color: #64748b;
        }

        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .detail-gallery img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          background: #eef2f7;
          cursor: zoom-in;
          transition: transform 0.2s ease;
        }

        .detail-gallery img:hover {
          transform: scale(1.02);
        }

        .image-modal {
          display: flex;
          position: fixed;
          z-index: 9999;
          inset: 0;
          background: rgba(15, 23, 42, 0.92);
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .image-modal-content {
          max-width: 92vw;
          max-height: 88vh;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          object-fit: contain;
          background: #fff;
        }

        .image-modal-close {
          position: absolute;
          top: 18px;
          right: 26px;
          font-size: 42px;
          line-height: 1;
          color: #ffffff;
          cursor: pointer;
          font-weight: 400;
          user-select: none;
          border: none;
          background: transparent;
        }

        .section {
          margin-top: 26px;
        

        .section-title {
          font-size: 24px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 14px;
        }

        .description {
          font-size: 16px;
          line-height: 1.85;
          color: #1f2937;
          white-space: pre-line;
        }

        .status-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-action-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
        }

        .status-action-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .two-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .info-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 800;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 16px;
          color: #111827;
          line-height: 1.7;
          word-break: break-word;
        }

        .tech-filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
          padding: 16px 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
        }

        .tech-filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: center;
        }

        .tech-filter-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          color: #111827;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23667085' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          height: 40px;
          flex-shrink: 0;
          min-width: 140px;
        }

        .tech-filter-select:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .tech-filter-select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .clear-tech-filters-btn {
          padding: 10px 12px;
          border: 1px solid #dc2626;
          background: transparent;
          color: #dc2626;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 40px;
          flex-shrink: 0;
          align-self: center;
          margin-left: auto;
        }

        .clear-tech-filters-btn:hover {
          background: rgba(220, 38, 38, 0.08);
          color: #dc2626;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .tech-card {
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 18px;
          background: #ffffff;
        }

        .tech-name {
          font-size: 18px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 6px;
        }

        .tech-team {
          font-size: 13px;
          font-weight: 800;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .tech-spec, .tech-phone, .tech-email {
          font-size: 14px;
          line-height: 1.7;
          color: #667085;
          margin-bottom: 4px;
          word-break: break-word;
        }

        .assign-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 15px;
          font-size: 13px;
          font-weight: 900;
          background: #0f172a;
          color: #ffffff;
          cursor: pointer;
          margin-top: 10px;
        }

        .assign-btn:hover {
          opacity: 0.95;
        }

        .assign-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .assign-actions .assign-btn,
        .assign-actions .danger-btn {
          flex: 1;
          margin-top: 0;
        }

        .assign-btn:disabled {
          opacity: 0.8;
          cursor: default;
        }

        .conversation-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .conversation-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .conversation-top {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .conversation-author {
          font-weight: 900;
          color: #111827;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          margin-right: 2px;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid rgba(37, 99, 235, 0.14);
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
          vertical-align: middle;
        }

        .conversation-text {
          font-size: 15px;
          line-height: 1.8;
          color: #1f2937;
          white-space: pre-line;
        }

        .admin-note-box {
          border: 1px solid #d7deea;
          border-radius: 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .admin-note-box textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 16px;
          font-size: 15px;
          line-height: 1.7;
        }

        .admin-note-actions {
          display: flex;
          justify-content: flex-end;
          padding: 14px 16px 16px;
          border-top: 1px solid #edf2f7;
          background: #fafcff;
        }

        .admin-note-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #2563eb;
          color: #ffffff;
          cursor: pointer;
        }

        .danger-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #fee2e2;
          color: #b91c1c;
          cursor: pointer;
        }

        .empty-note {
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        .empty-state {
          min-height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 38px 28px;
          border: 1px solid #d8e5f6;
          border-radius: 28px;
          background:
            radial-gradient(circle at top, rgba(37, 99, 235, 0.12), transparent 52%),
            linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.75),
            0 18px 38px rgba(15, 23, 42, 0.06);
        }

        .empty-state-art {
          width: 96px;
          height: 96px;
          border-radius: 30px;
          background:
            radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 58%),
            linear-gradient(145deg, #ffffff 0%, #edf4ff 100%);
          border: 1px solid #d5e3f8;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.86),
            0 18px 34px rgba(37, 99, 235, 0.12);
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          position: relative;
        }

        .empty-state-art::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 22px;
          border: 1px solid rgba(143, 179, 232, 0.45);
        }

        .empty-state-glyph {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          border: 2px solid #7fa7df;
          position: relative;
          background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .empty-state-glyph::before,
        .empty-state-glyph::after {
          content: "";
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          border-radius: 999px;
          background: #7fa7df;
        }

        .empty-state-glyph::before {
          top: 13px;
        }

        .empty-state-glyph::after {
          top: 23px;
          right: 13px;
        }

        .empty-state-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .empty-state-accent {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.12);
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .empty-state-title {
          font-size: 26px;
          line-height: 1.2;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .empty-state-text {
          max-width: 420px;
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        .empty-state-support {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.7;
          color: #7b8798;
          max-width: 430px;
        }

        .empty-state.compact {
          min-height: 180px;
          padding: 24px 20px;
          border-radius: 22px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.75),
            0 10px 24px rgba(15, 23, 42, 0.04);
        }

        .empty-state-art.compact {
          width: 68px;
          height: 68px;
          border-radius: 22px;
          margin-bottom: 16px;
        }

        .empty-state-art.compact::before {
          inset: 8px;
          border-radius: 16px;
        }

        .empty-state-title.compact {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .empty-state-text.compact {
          max-width: 360px;
          font-size: 14px;
          line-height: 1.7;
        }

        @media (max-width: 1250px) {
          .summary-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .admin-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .two-grid,
          .smart-grid,
          .tech-grid,
          .detail-gallery {
            grid-template-columns: 1fr;
          }

          .issue-card-top {
            grid-template-columns: 1fr;
          }

          .attention-panel-header,
          .attention-ticket {
            grid-template-columns: 1fr;
          }

          .attention-ticket-controls {
            align-items: flex-start;
          }

          .detail-header {
            flex-direction: column;
          }

          .panel-title,
          .detail-title {
            font-size: 28px;
          }

          .page-title {
            font-size: 38px;
          }

          .tech-filter-container {
            flex-direction: column;
            align-items: stretch;
          }

          .tech-filter-label {
            align-self: flex-start;
          }

          .tech-filter-select {
            width: 100%;
            min-width: unset;
          }

          .clear-tech-filters-btn {
            margin-left: 0;
            width: 100%;
          }
        }
      `}),(0,P.jsxs)(`div`,{className:`admin-shell`,children:[(0,P.jsxs)(`section`,{className:`page-header`,children:[(0,P.jsx)(`div`,{className:`page-eyebrow`,children:`Administration`}),(0,P.jsx)(`h1`,{className:`page-title`,children:`Ticket Management`}),(0,P.jsx)(`p`,{className:`page-subtitle`,children:`Monitor and manage all support tickets across the helpdesk system.`})]}),(0,P.jsxs)(`div`,{className:`summary-grid`,children:[(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Total Active`}),(0,P.jsx)(`div`,{className:`summary-value`,children:i.total||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Open`}),(0,P.jsx)(`div`,{className:`summary-value`,children:i.open||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`In Progress`}),(0,P.jsx)(`div`,{className:`summary-value`,children:i.inProgress||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Resolved`}),(0,P.jsx)(`div`,{className:`summary-value`,children:i.resolved||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Unassigned`}),(0,P.jsx)(`div`,{className:`summary-value`,children:i.unassigned||0})]}),(0,P.jsxs)(`div`,{className:`summary-card attention`,onClick:()=>le(e=>!e),children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Needs Attention`}),(0,P.jsx)(`div`,{className:`summary-value`,children:we})]})]}),(0,P.jsxs)(`div`,{className:`toolbar`,children:[(0,P.jsx)(`input`,{className:`toolbar-search`,placeholder:`Search issues, reporter, building, category, or assigned technician`,value:u,onChange:e=>d(e.target.value)}),(0,P.jsx)(`div`,{className:`status-tabs`,children:[`OPEN`,`IN PROGRESS`,`RESOLVED`].map(e=>(0,P.jsx)(`button`,{className:`status-tab ${c===e?`active`:``}`,onClick:()=>l(e),children:e},e))})]}),ce&&we>0&&(0,P.jsxs)(`div`,{className:`attention-panel`,children:[(0,P.jsxs)(`div`,{className:`attention-panel-header`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`span`,{className:`assistant-chip`,children:`Smart Escalation Assistant`}),(0,P.jsx)(`div`,{className:`attention-panel-title`,children:`Needs Attention Review Queue`}),(0,P.jsx)(`div`,{className:`attention-panel-text`,children:`These tickets need timely admin review. Open one, take an action, and it will leave this review queue.`})]}),(0,P.jsx)(`button`,{type:`button`,className:`attention-close-btn`,onClick:()=>le(!1),children:`Hide Queue`})]}),(0,P.jsx)(`div`,{className:`attention-list`,children:[...Ce].sort((e,t)=>{let n=Se(t.escalationLevel)-Se(e.escalationLevel);return n===0?(t.escalationHoursOpen||0)-(e.escalationHoursOpen||0):n}).map(e=>(0,P.jsxs)(`div`,{className:`attention-ticket`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsxs)(`span`,{className:`assistant-chip`,children:[`Ticket #`,e.id]}),(0,P.jsx)(`div`,{className:`attention-ticket-title`,children:e.title}),(0,P.jsxs)(`div`,{className:`attention-ticket-meta`,children:[e.status,` | `,e.priority,` | `,e.building,` | Reported by`,` `,e.reporterName]}),(0,P.jsx)(`div`,{className:`attention-ticket-reason`,children:e.escalationReason}),(0,P.jsx)(`div`,{className:`attention-ticket-action`,children:e.escalationAction})]}),(0,P.jsxs)(`div`,{className:`attention-ticket-controls`,children:[(0,P.jsx)(`span`,{className:`escalation-level-badge`,style:{background:Te(e.escalationLevel).badgeBg,color:Te(e.escalationLevel).badgeText,borderColor:Te(e.escalationLevel).border},children:e.escalationLevel}),(0,P.jsx)(`button`,{type:`button`,className:`attention-review-btn`,onClick:()=>{l(e.status),s(e.id)},children:`Review Ticket`})]})]},e.id))})]}),(0,P.jsxs)(`div`,{className:`admin-layout`,children:[(0,P.jsxs)(`div`,{className:`panel-card issues-panel`,children:[(0,P.jsx)(`div`,{className:`panel-header`,children:(0,P.jsx)(`div`,{className:`panel-title`,children:Ye})}),(0,P.jsx)(`div`,{className:`issues-list`,children:f?fe({eyebrow:`Loading queue`,title:`Getting tickets ready`,description:`Current issues are being loaded for this section.`,compact:!0}):be.length===0?fe(Xe):be.map(e=>{let t=ke(e);return(0,P.jsxs)(`div`,{className:`issue-card ${o===e.id?`active`:``}`,onClick:()=>s(e.id),children:[(0,P.jsxs)(`div`,{className:`issue-card-top`,children:[(0,P.jsx)(`div`,{className:`issue-thumb`,children:e.imageUrls&&e.imageUrls.length>0?(0,P.jsx)(`img`,{src:`http://localhost:8080${e.imageUrls[0]}`,alt:`Issue`}):null}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`issue-title`,children:e.title}),(0,P.jsxs)(`div`,{className:`issue-meta`,children:[`Reported by `,(0,P.jsx)(`strong`,{children:e.reporterName}),(0,P.jsx)(`br`,{}),ye(e.createdAt),(0,P.jsx)(`br`,{}),e.assignedTechnicianName?`Assigned to ${e.assignedTechnicianName}`:`Not assigned yet`]})]}),(0,P.jsx)(`div`,{className:`status-chip`,children:e.status})]}),(0,P.jsxs)(`div`,{className:`issue-tags`,children:[(0,P.jsx)(`span`,{className:`meta-pill`,children:e.category}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.priority}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.building})]}),e.escalationFlagged&&(0,P.jsxs)(`div`,{className:`issue-escalation-panel`,style:{borderColor:Te(e.escalationLevel).border,background:Te(e.escalationLevel).surface},children:[(0,P.jsxs)(`div`,{className:`issue-escalation-top`,children:[(0,P.jsx)(`div`,{className:`issue-escalation-title`,children:`Smart Escalation Assistant`}),(0,P.jsx)(`span`,{className:`escalation-level-badge`,style:{background:Te(e.escalationLevel).badgeBg,color:Te(e.escalationLevel).badgeText,borderColor:Te(e.escalationLevel).border},children:e.escalationLevel})]}),(0,P.jsx)(`div`,{className:`issue-escalation-text`,children:e.escalationReason}),(0,P.jsx)(`div`,{className:`issue-escalation-action`,children:e.escalationAction})]}),c===`IN PROGRESS`&&t&&(0,P.jsxs)(`div`,{className:`tech-alert`,children:[(0,P.jsx)(`strong`,{children:`Technician alert:`}),Oe(t)===`PRIVATE`&&(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`}),` `,t.text]})]},e.id)})})]}),(0,P.jsx)(`div`,{className:`panel-card detail-card`,children:N?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`detail-header`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`detail-title`,children:N.title}),(0,P.jsxs)(`div`,{className:`detail-meta`,children:[`Reported by `,(0,P.jsx)(`strong`,{children:N.reporterName}),` •`,` `,ye(N.createdAt),(0,P.jsx)(`br`,{}),N.assignedTechnicianName?`Assigned to ${N.assignedTechnicianName} (${N.assignedTeam})`:`No technician assigned yet`]})]}),(0,P.jsx)(`div`,{className:`status-chip`,children:N.status})]}),Ee.length>0&&(0,P.jsx)(`div`,{className:`detail-gallery`,children:Ee.map((e,t)=>(0,P.jsx)(`img`,{src:`http://localhost:8080${e}`,alt:`Issue`,onClick:()=>T(`http://localhost:8080${e}`)},`${e}-${t}`))}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Description`}),(0,P.jsx)(`div`,{className:`description`,children:N.description})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Summary`}),(0,P.jsxs)(`div`,{className:`two-grid`,children:[(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Category`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.category})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Priority`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.priority})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Location Type`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.locationType})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Building`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.building})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Exact Location`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.roomNumber||`—`})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Observed Date`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.incidentDate||`—`})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Reporter Email`}),(0,P.jsx)(`div`,{className:`info-value`,children:N.reporterEmail})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Assigned At`}),(0,P.jsx)(`div`,{className:`info-value`,children:ye(N.assignedAt)})]})]})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Smart Escalation Assistant`}),(0,P.jsxs)(`div`,{className:`smart-grid`,children:[(0,P.jsxs)(`div`,{className:`assistant-card`,style:{borderColor:Te(N.escalationLevel).border,background:Te(N.escalationLevel).surface},children:[(0,P.jsx)(`div`,{className:`assistant-card-label`,children:`Current Signal`}),(0,P.jsx)(`div`,{className:`assistant-card-value`,children:N.escalationTitle||`On Track`}),(0,P.jsx)(`div`,{style:{marginTop:`10px`},children:(0,P.jsx)(`span`,{className:`escalation-level-badge`,style:{background:Te(N.escalationLevel).badgeBg,color:Te(N.escalationLevel).badgeText,borderColor:Te(N.escalationLevel).border},children:N.escalationLevel||`ON TRACK`})}),(0,P.jsx)(`div`,{className:`assistant-card-text`,style:{marginTop:`12px`},children:N.escalationReason})]}),(0,P.jsxs)(`div`,{className:`assistant-card`,children:[(0,P.jsx)(`div`,{className:`assistant-card-label`,children:`Recommended Action`}),(0,P.jsx)(`div`,{className:`assistant-card-text`,children:N.escalationAction}),(0,P.jsx)(`div`,{className:`assistant-card-label`,style:{marginTop:`16px`},children:`Time Signals`}),(0,P.jsxs)(`div`,{className:`assistant-card-text`,children:[`Open for `,(0,P.jsxs)(`strong`,{children:[N.escalationHoursOpen||0,`h`]}),N.escalationHoursSinceTechnicianUpdate!==null&&N.escalationHoursSinceTechnicianUpdate!==void 0&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`br`,{}),`Last technician update `,(0,P.jsxs)(`strong`,{children:[N.escalationHoursSinceTechnicianUpdate,`h`]}),` `,`ago`]})]})]})]})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Status Control`}),(0,P.jsxs)(`div`,{className:`status-actions`,children:[N.status===`OPEN`&&(0,P.jsx)(`button`,{className:`status-action-btn`,disabled:!N.assignedTechnicianEmail,onClick:()=>Le(N.id,`IN PROGRESS`),children:`Move to IN PROGRESS`}),N.status===`IN PROGRESS`&&(0,P.jsx)(`button`,{className:`status-action-btn`,onClick:()=>Le(N.id,`RESOLVED`),children:`Move to RESOLVED`}),N.status===`RESOLVED`&&(0,P.jsx)(`button`,{className:`danger-btn`,onClick:Ke,children:`Remove from Admin Queue`})]}),N.status===`OPEN`&&!N.assignedTechnicianEmail&&(0,P.jsx)(`div`,{style:{marginTop:`14px`},children:fe({eyebrow:`Assignment needed`,title:`Assign a technician first`,description:`This ticket can move to in progress after a technician has been assigned.`,compact:!0})})]}),N.status===`OPEN`&&(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Assign Technician`}),(0,P.jsxs)(`div`,{className:`tech-filter-container`,children:[(0,P.jsx)(`span`,{className:`tech-filter-label`,children:`Filter by:`}),(0,P.jsxs)(`select`,{className:`tech-filter-select`,value:ie,onChange:e=>ae(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Teams`}),he.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))]}),(0,P.jsxs)(`select`,{className:`tech-filter-select`,value:oe,onChange:e=>k(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Specializations`}),ge.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))]}),(0,P.jsxs)(`select`,{className:`tech-filter-select`,value:A,onChange:e=>se(e.target.value),children:[(0,P.jsx)(`option`,{value:`all`,children:`All Status`}),_e.map(e=>(0,P.jsx)(`option`,{value:e,children:e},e))]}),(ie!==`all`||oe!==`all`||A!==`all`)&&(0,P.jsx)(`button`,{className:`clear-tech-filters-btn`,onClick:()=>{ae(`all`),k(`all`),se(`all`)},children:`Clear Filters`})]}),(0,P.jsx)(`div`,{className:`tech-grid`,children:ve.length===0?(0,P.jsx)(`div`,{style:{gridColumn:`1 / -1`},children:fe({eyebrow:`No technician match`,title:`No technicians fit these filters`,description:`Adjust the team, specialization, or status filters to see more technician options.`,compact:!0})}):ve.map(e=>{let t=N.assignedTechnicianEmail===e.email;return(0,P.jsxs)(`div`,{className:`tech-card`,children:[(0,P.jsx)(`div`,{className:`tech-name`,children:e.name}),(0,P.jsx)(`div`,{className:`tech-team`,children:e.team}),(0,P.jsx)(`div`,{className:`tech-spec`,children:e.specialization}),(0,P.jsx)(`div`,{className:`tech-email`,children:e.email}),(0,P.jsx)(`div`,{className:`tech-phone`,children:e.phone}),(0,P.jsxs)(`div`,{className:`tech-phone`,children:[`Status: `,e.status]}),(0,P.jsxs)(`div`,{className:t?`assign-actions`:void 0,children:[(0,P.jsx)(`button`,{className:`assign-btn`,disabled:t,onClick:()=>Re(N.id,e.id),children:t?`Assigned ✓`:`Assign Technician`}),t&&(0,P.jsx)(`button`,{className:`danger-btn`,type:`button`,onClick:()=>ze(N.id),children:`Cancel Assign`})]})]},e.id)})})]}),N.status===`IN PROGRESS`&&(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Technician Alerts`}),(0,P.jsxs)(`div`,{className:`alert-tabs`,children:[(0,P.jsx)(`button`,{type:`button`,className:`alert-tab ${b===`PUBLIC`?`active`:``}`,onClick:()=>x(`PUBLIC`),children:`Public`}),(0,P.jsxs)(`button`,{type:`button`,className:`alert-tab ${b===`PRIVATE`?`active`:``}`,onClick:()=>x(`PRIVATE`),children:[`Private`,Pe.length>0&&b!==`PRIVATE`&&(0,P.jsx)(`span`,{className:`private-badge`,children:Pe.length})]})]}),Fe.length===0?(0,P.jsx)(`div`,{className:`empty-note`,children:`No technician alerts yet.`}):(0,P.jsx)(`div`,{className:`conversation-list`,children:Fe.map(e=>(0,P.jsxs)(`div`,{className:`conversation-card`,onClick:()=>re(e.id),style:{cursor:`pointer`},children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[(0,P.jsx)(`span`,{className:`conversation-author`,children:e.authorName}),Ie(e)&&(0,P.jsx)(`span`,{className:`role-badge`,children:`TECH`}),` `,`• `,ye(e.createdAt)]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:e.text}),Oe(e)===`PRIVATE`&&(0,P.jsx)(`div`,{style:{marginTop:`8px`},children:(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`})}),(0,P.jsx)(`div`,{style:{marginTop:`12px`},children:(0,P.jsx)(`button`,{type:`button`,className:`reply-link`,onClick:t=>{t.stopPropagation(),Ve(e)},children:`Reply`})})]},e.id))})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Admin Communication`}),g&&(0,P.jsxs)(`div`,{className:`conversation-card`,style:{marginBottom:`12px`},children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[`Replying to `,(0,P.jsx)(`span`,{className:`conversation-author`,children:g.authorName})]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:g.text}),(0,P.jsx)(`div`,{style:{marginTop:`10px`},children:(0,P.jsx)(`button`,{className:`danger-btn`,onClick:()=>{_(null),y(`PUBLIC`)},children:`Cancel Reply`})})]}),(0,P.jsxs)(`div`,{className:`admin-note-box`,children:[(0,P.jsx)(`div`,{className:`channel-toggle`,children:[`PUBLIC`,`PRIVATE`].map(e=>(0,P.jsx)(`button`,{type:`button`,className:`channel-btn ${v===e?`active`:``}`,disabled:!!g,onClick:()=>y(e),children:e===`PUBLIC`?`Public`:`Private`},e))}),(0,P.jsx)(`textarea`,{placeholder:v===`PRIVATE`?`Write a private admin message. Only admin and the assigned technician can see it.`:`Write a public admin message. This can appear in featured conversations.`,value:m,onChange:e=>h(e.target.value)}),(0,P.jsx)(`div`,{className:`admin-note-actions`,children:(0,P.jsx)(`button`,{className:`admin-note-btn`,onClick:Be,children:g?`Send Reply`:`Send Admin Message`})})]})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Discussion`}),Ae.length===0?(0,P.jsx)(`div`,{className:`empty-note`,children:`No discussion yet.`}):(0,P.jsx)(`div`,{className:`conversation-list`,children:qe(Ae).map(e=>Je(e))})]})]}):fe({eyebrow:`Ready to review`,accent:`Admin control panel`,title:`Select an issue to view details`,description:`Pick a ticket from the queue to review the report, manage workflow updates, and coordinate with the assigned technician.`,support:`Issue details, technician assignment, alerts, and workflow controls will appear here once you select a ticket from the left queue.`})})]})]}),ee&&(0,P.jsxs)(`div`,{className:`image-modal`,onClick:()=>T(``),children:[(0,P.jsx)(`button`,{className:`image-modal-close`,onClick:()=>T(``),children:`×`}),(0,P.jsx)(`img`,{className:`image-modal-content`,src:ee,alt:`Expanded issue`,onClick:e=>e.stopPropagation()})]})]})}var po=()=>V.get(`/technician/issues`),mo=()=>V.get(`/technician/summary`),ho=(e,t)=>V.patch(`/technician/issues/${e}/status`,{status:t}),go=(e,t,n=null,r=`PUBLIC`)=>V.post(`/technician/issues/${e}/comments`,{text:t,parentCommentId:n,visibility:r}),_o=(e,t,n)=>V.patch(`/technician/issues/${e}/comments/${t}`,{text:n}),vo=(e,t)=>V.delete(`/technician/issues/${e}/comments/${t}`),yo=e=>V.delete(`/technician/issues/${e}`),bo=e=>{if(typeof window>`u`)return[];try{return JSON.parse(window.localStorage.getItem(e)||`[]`)}catch{return[]}},xo=(e,t)=>{typeof window>`u`||window.localStorage.setItem(e,JSON.stringify(t))},So=(e,t,n)=>{if(typeof window>`u`)return t;let r=window.localStorage.getItem(e);return n.includes(r)?r:t};function Co(e,t){return e.technicianStatus===t}function wo(e){return e.technicianStatus||`ASSIGNED`}function To(e,t){let n=(t?.authorEmail||``).trim().toLowerCase(),r=(t?.authorName||``).trim().toLowerCase(),i=(e?.assignedTechnicianEmail||``).trim().toLowerCase(),a=(e?.assignedTechnicianName||``).trim().toLowerCase();return i&&n===i||a&&r===a||n===`technician@helpdesk.edu`}function Eo(){let[e,t]=(0,S.useState)([]),[n,r]=(0,S.useState)({}),[i,a]=(0,S.useState)(null),[o,s]=(0,S.useState)(()=>So(`helpdesk-technician-status-filter`,`ASSIGNED`,[`ASSIGNED`,`IN PROGRESS`,`RESOLVED`])),[c,l]=(0,S.useState)(``),[u,d]=(0,S.useState)(!0),[f,p]=(0,S.useState)(``),[m,h]=(0,S.useState)(null),[g,_]=(0,S.useState)(`PUBLIC`),[v,y]=(0,S.useState)(`PUBLIC`),[b,x]=(0,S.useState)(()=>bo(`helpdesk-technician-read-private-admin-alerts`)),[C,w]=(0,S.useState)(``),[ee,T]=(0,S.useState)(null),[E,D]=(0,S.useState)(``),[te,ne]=(0,S.useState)(null),O=(0,S.useRef)({}),re=()=>c.trim()?{eyebrow:`No matches`,title:`Nothing matched this search`,description:`Try another keyword, reporter, building, or category to find the assigned issue you need.`}:o===`ASSIGNED`?{eyebrow:`Assignment queue clear`,title:`No assigned issues right now`,description:`New admin assignments will appear here before work begins, with issue details and communication history ready to review.`}:o===`IN PROGRESS`?{eyebrow:`Focused workload`,title:`No issues are currently in progress`,description:`Once you start working on an assigned ticket, it will move here so progress and updates stay easy to track.`}:{eyebrow:`Resolved queue clear`,title:`No resolved issues here yet`,description:`Technician-completed work will appear here until you remove it from the technician queue.`};(0,S.useEffect)(()=>{ie()},[]),(0,S.useEffect)(()=>{typeof window>`u`||window.localStorage.setItem(`helpdesk-technician-status-filter`,o)},[o]);let ie=async()=>{try{d(!0);let[e,n]=await Promise.all([po(),mo()]);t(e.data||[]),r(n.data||{}),e.data&&e.data.length>0?a((e.data.find(e=>Co(e,o))||e.data[0]).id):a(null)}catch(e){console.error(e),alert(`Failed to load technician data.`)}finally{d(!1)}},ae=e=>{if(!e)return`—`;let t=e.replace(`T`,` `).split(`.`)[0],n=new Date(t);return Number.isNaN(n.getTime())?`—`:n.toLocaleString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},oe=(0,S.useMemo)(()=>e.filter(e=>{let t=Co(e,o),n=[e.title,e.description,e.category,e.building,e.locationType,e.reporterName,e.assignedTechnicianName,e.assignedTeam].filter(Boolean).join(` `).toLowerCase().includes(c.toLowerCase().trim());return t&&n}),[e,o,c]);(0,S.useEffect)(()=>{oe.some(e=>e.id===i)||a(oe[0]?.id??null)},[oe,i]),(0,S.useEffect)(()=>{te&&O.current[te]&&(O.current[te].scrollIntoView({behavior:`smooth`,block:`center`}),ne(null))},[te]);let k=(0,S.useMemo)(()=>e.find(e=>e.id===i)||null,[e,i]),A=k?.imageUrls||[],se=e=>e?.visibility===`PRIVATE`?`PRIVATE`:`PUBLIC`,ce=(0,S.useMemo)(()=>k?.comments?[...k.comments].filter(e=>e.authorEmail===`admin@helpdesk.edu`).sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}):[],[k]),le=(0,S.useMemo)(()=>ce.filter(e=>se(e)===`PUBLIC`),[ce]),ue=(0,S.useMemo)(()=>ce.filter(e=>se(e)===`PRIVATE`),[ce]),j=(0,S.useMemo)(()=>ue.filter(e=>!b.includes(e.id)),[ue,b]),M=v===`PRIVATE`?ue:le;(0,S.useEffect)(()=>{v!==`PRIVATE`||ue.length===0||x(e=>{let t=Array.from(new Set([...e,...ue.map(e=>e.id)]));return t.length===e.length?e:(xo(`helpdesk-technician-read-private-admin-alerts`,t),t)})},[v,ue]);let de=e=>[...e.comments||[]].filter(e=>e.authorEmail===`admin@helpdesk.edu`).sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}),fe=(0,S.useMemo)(()=>k?.comments?[...k.comments].sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}):[],[k]),pe=async(e,t)=>{try{await ho(e,t),await ie(),s(t),a(null)}catch(e){console.error(e),alert(e?.response?.data?.text||e?.response?.data?.message||`Failed to update issue status.`)}},me=async()=>{let e=f.trim();if(!e||!k)return;let n=m?m.id:null;try{let r=(await go(k.id,e,n,m?se(m):g)).data;t(e=>e.map(e=>e.id===r.id?r:e)),a(r.id),p(``),h(null),_(`PUBLIC`);let i=[...r.comments||[]].filter(e=>e.authorEmail===r.assignedTechnicianEmail&&(e.parentCommentId||null)===n).sort((e,t)=>(t.id||0)-(e.id||0))[0];i&&ne(i.id)}catch(e){console.error(e),alert(`Failed to send technician note.`)}},he=e=>{h(e),_(se(e)),p(``),setTimeout(()=>{let e=document.querySelector(`.technician-note-box textarea`);e&&(e.scrollIntoView({behavior:`smooth`,block:`center`}),e.focus())},120)},ge=e=>{T(e.id),D(e.text||``)},_e=()=>{T(null),D(``)},ve=async e=>{let t=E.trim();if(!(!t||!k))try{await _o(k.id,e,t),T(null),D(``),await ie(),a(k.id)}catch(e){console.error(e),alert(`Failed to update technician comment.`)}},ye=async e=>{if(k&&window.confirm(`Delete this technician comment?`))try{await vo(k.id,e),await ie(),a(k.id)}catch(e){console.error(e),alert(`Failed to delete technician comment.`)}},be=async()=>{if(k&&window.confirm(`Remove this resolved issue from the technician queue?`))try{await yo(k.id),await ie()}catch(e){console.error(e),alert(e?.response?.data?.message||`Failed to remove resolved issue from technician queue.`)}},N=(e=[])=>{let t=[...e].sort((e,t)=>{let n=e.createdAt?new Date(e.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0;return(t.createdAt?new Date(t.createdAt.replace(`T`,` `).split(`.`)[0]).getTime():0)-n}),n=new Map;t.forEach(e=>{n.set(e.id,{...e,replies:[]})});let r=[];return t.forEach(e=>{e.parentCommentId&&n.has(e.parentCommentId)?n.get(e.parentCommentId).replies.push(n.get(e.id)):r.push(n.get(e.id))}),r},xe=(e,t=0)=>{let n=To(k,e);return(0,P.jsx)(`div`,{ref:t=>{t&&(O.current[e.id]=t)},style:{marginLeft:t>0?`${Math.min(t*28,84)}px`:`0px`,borderLeft:t>0?`3px solid #e5e7eb`:`none`,paddingLeft:t>0?`14px`:`0px`,marginTop:t>0?`14px`:`0px`},children:(0,P.jsxs)(`div`,{className:`conversation-card`,children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[(0,P.jsx)(`span`,{className:`conversation-author`,children:e.authorName}),To(k,e)&&(0,P.jsx)(`span`,{className:`role-badge`,children:`TECH`}),` •`,` `,ae(e.createdAt)]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:e.text}),se(e)===`PRIVATE`&&(0,P.jsx)(`div`,{style:{marginTop:`8px`},children:(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`})}),(0,P.jsxs)(`div`,{style:{marginTop:`12px`,display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>he(e),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#2563eb`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Reply`}),n&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>ge(e),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#2563eb`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Edit`}),(0,P.jsx)(`button`,{type:`button`,onClick:()=>ye(e.id),style:{border:`none`,background:`transparent`,color:`#6b7280`,fontSize:`13px`,fontWeight:`600`,cursor:`pointer`,padding:`4px 6px`},onMouseEnter:e=>e.target.style.color=`#ef4444`,onMouseLeave:e=>e.target.style.color=`#6b7280`,children:`Delete`})]})]}),ee===e.id&&(0,P.jsxs)(`div`,{style:{marginTop:`10px`},children:[(0,P.jsx)(`textarea`,{className:`technician-note-box`,value:E,onChange:e=>D(e.target.value),style:{width:`100%`,minHeight:`80px`,padding:`10px`,borderRadius:`8px`,border:`1px solid #d7deea`,fontSize:`14px`,marginBottom:`8px`}}),(0,P.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,P.jsx)(`button`,{className:`technician-note-btn`,onClick:()=>ve(e.id),children:`Save`}),(0,P.jsx)(`button`,{className:`danger-btn`,onClick:_e,children:`Cancel`})]})]}),e.replies&&e.replies.length>0&&(0,P.jsx)(`div`,{children:e.replies.map(e=>xe(e,t+1))})]})},e.id)},Se=o===`ASSIGNED`?`Assigned Issues`:o===`IN PROGRESS`?`In Progress Work`:`Completed Work`,Ce=re();return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`style`,{children:`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #f5f7fb; color: #111827; }

        .technician-shell {
          max-width: 1480px;
          margin: 0 auto;
          padding: 24px 22px 50px;
        }

        .page-header {
          padding: 8px 4px 20px;
          margin-bottom: 6px;
        }

        .page-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 6px;
        }

        .page-title {
          font-size: 50px;
          line-height: 1.05;
          font-weight: 800;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 18px;
          line-height: 1.75;
          color: #667085;
          max-width: 860px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .summary-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e5edf8;
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .summary-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748b;
          margin-bottom: 8px;
        }

        .summary-value {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
        }

        .toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 18px;
        }

        .toolbar-search {
          flex: 1;
          min-width: 280px;
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 14px 18px;
          font-size: 15px;
          outline: none;
          background: #ffffff;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
        }

        .status-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-tab {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .status-tab.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
        }

        .alert-tabs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px;
          padding: 3px;
          border: 1px solid #edf2f7;
          border-radius: 12px;
          background: #ffffff;
          margin-bottom: 16px;
          width: 100%;
        }

        .alert-tab {
          width: 100%;
          border: none;
          border-radius: 9px;
          padding: 7px 11px;
          background: transparent;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .alert-tab.active {
          background: #f1f5f9;
          color: #111827;
        }

        .private-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          margin-left: 6px;
          padding: 0 6px;
          border-radius: 999px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
        }

        .private-chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 4px 8px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 900;
          margin-left: 8px;
        }

        .reply-link {
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }

        .reply-link:hover {
          color: #2563eb;
        }

        .channel-toggle {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 12px 16px;
          border-bottom: 1px solid #edf2f7;
          background: #fafcff;
        }

        .channel-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 8px 12px;
          background: #ffffff;
          color: #475467;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .channel-btn.active {
          border-color: #2563eb;
          background: #eaf2ff;
          color: #1d4ed8;
        }

        .technician-layout {
          display: grid;
          grid-template-columns: 430px minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }

        .panel-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 26px;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
        }

        .issues-panel {
          overflow: hidden;
        }

        .panel-header {
          padding: 22px 22px 14px;
          border-bottom: 1px solid #edf2f7;
        }

        .panel-title {
          font-size: 32px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px;
          max-height: 840px;
          overflow: auto;
        }

        .issue-card {
          border: 1px solid #e6ebf2;
          border-radius: 22px;
          background: linear-gradient(145deg, #ffffff 0%, #fbfdff 100%);
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .issue-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);
          border-color: #ccd8ea;
        }

        .issue-card.active {
          border-color: #2563eb;
          box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
        }

        .issue-card-top {
          display: grid;
          grid-template-columns: 80px minmax(0, 1fr) auto;
          gap: 14px;
          align-items: start;
          margin-bottom: 12px;
        }

        .issue-thumb {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          overflow: hidden;
          background: #eef2f7;
          border: 1px solid #e5e7eb;
          flex-shrink: 0;
        }

        .issue-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .issue-title {
          font-size: 18px;
          font-weight: 900;
          line-height: 1.35;
          color: #111827;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
          margin-bottom: 8px;
        }

        .issue-meta {
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eaf2ff;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .issue-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          color: #475467;
          font-size: 12px;
          font-weight: 800;
        }

        .admin-alert {
          margin-top: 12px;
          background: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
          border-radius: 14px;
          padding: 12px 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .admin-alert strong {
          color: #78350f;
        }

        .detail-card {
          padding: 24px;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 18px;
        }

        .detail-title {
          font-size: 34px;
          line-height: 1.15;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 10px;
          word-break: break-word;
        }

        .detail-meta {
          font-size: 14px;
          line-height: 1.8;
          color: #64748b;
        }

        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 22px;
        }

        .detail-gallery img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          background: #eef2f7;
          cursor: zoom-in;
          transition: transform 0.2s ease;
        }

        .detail-gallery img:hover {
          transform: scale(1.02);
        }

        .image-modal {
          display: flex;
          position: fixed;
          z-index: 9999;
          inset: 0;
          background: rgba(15, 23, 42, 0.92);
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .image-modal-content {
          max-width: 92vw;
          max-height: 88vh;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          object-fit: contain;
          background: #fff;
        }

        .image-modal-close {
          position: absolute;
          top: 18px;
          right: 26px;
          font-size: 42px;
          line-height: 1;
          color: #ffffff;
          cursor: pointer;
          font-weight: 400;
          user-select: none;
          border: none;
          background: transparent;
        }

        .section {
          margin-top: 26px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 14px;
        }

        .description {
          font-size: 16px;
          line-height: 1.85;
          color: #1f2937;
          white-space: pre-line;
        }

        .status-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .status-action-btn {
          border: 1px solid #d7deea;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 800;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
        }

        .status-action-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .two-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .info-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 800;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 16px;
          color: #111827;
          line-height: 1.7;
          word-break: break-word;
        }

        .conversation-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .conversation-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 16px;
        }

        .conversation-top {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .conversation-author {
          font-weight: 900;
          color: #111827;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          margin-right: 2px;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid rgba(37, 99, 235, 0.14);
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
          vertical-align: middle;
        }

        .conversation-text {
          font-size: 15px;
          line-height: 1.8;
          color: #1f2937;
          white-space: pre-line;
        }

        .technician-note-box {
          border: 1px solid #d7deea;
          border-radius: 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .technician-note-box textarea {
          width: 100%;
          min-height: 110px;
          border: none;
          outline: none;
          resize: vertical;
          padding: 16px;
          font-size: 15px;
          line-height: 1.7;
        }

        .technician-note-actions {
          display: flex;
          justify-content: flex-end;
          padding: 14px 16px 16px;
          border-top: 1px solid #edf2f7;
          background: #fafcff;
        }

        .technician-note-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #2563eb;
          color: #ffffff;
          cursor: pointer;
        }

        .danger-btn {
          border: none;
          border-radius: 999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 900;
          background: #fee2e2;
          color: #b91c1c;
          cursor: pointer;
        }

        .empty-note {
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        .empty-state {
          min-height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 34px 24px;
          border: 1px dashed #d7e2f0;
          border-radius: 24px;
          background:
            radial-gradient(circle at top, rgba(37, 99, 235, 0.08), transparent 48%),
            linear-gradient(180deg, #fcfdff 0%, #f7faff 100%);
        }

        .empty-state-art {
          width: 82px;
          height: 82px;
          border-radius: 24px;
          background: linear-gradient(145deg, #ffffff 0%, #eef5ff 100%);
          border: 1px solid #d8e5f6;
          box-shadow: 0 18px 34px rgba(15, 23, 42, 0.08);
          display: grid;
          place-items: center;
          margin-bottom: 20px;
        }

        .empty-state-glyph {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          border: 2px solid #8fb3e8;
          position: relative;
          background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%);
        }

        .empty-state-glyph::before,
        .empty-state-glyph::after {
          content: "";
          position: absolute;
          left: 8px;
          right: 8px;
          height: 2px;
          border-radius: 999px;
          background: #8fb3e8;
        }

        .empty-state-glyph::before {
          top: 12px;
        }

        .empty-state-glyph::after {
          top: 21px;
          right: 14px;
        }

        .empty-state-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 8px;
        }

        .empty-state-title {
          font-size: 24px;
          line-height: 1.2;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .empty-state-text {
          max-width: 420px;
          color: #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        @media (max-width: 1250px) {
          .summary-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .technician-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .two-grid,
          .detail-gallery {
            grid-template-columns: 1fr;
          }

          .issue-card-top {
            grid-template-columns: 1fr;
          }

          .detail-header {
            flex-direction: column;
          }

          .panel-title,
          .detail-title {
            font-size: 28px;
          }

          .page-title {
            font-size: 38px;
          }
        }
      `}),(0,P.jsxs)(`div`,{className:`technician-shell`,children:[(0,P.jsxs)(`section`,{className:`page-header`,children:[(0,P.jsx)(`div`,{className:`page-eyebrow`,children:`Technician Portal`}),(0,P.jsx)(`h1`,{className:`page-title`,children:`Technician Assignments`}),(0,P.jsx)(`p`,{className:`page-subtitle`,children:`Manage and resolve issues assigned by the administration team.`})]}),(0,P.jsxs)(`div`,{className:`summary-grid`,children:[(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Assigned`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.assigned||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`In Progress`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.inProgress||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Resolved`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.resolved||0})]}),(0,P.jsxs)(`div`,{className:`summary-card`,children:[(0,P.jsx)(`div`,{className:`summary-label`,children:`Total Workload`}),(0,P.jsx)(`div`,{className:`summary-value`,children:n.total||0})]})]}),(0,P.jsxs)(`div`,{className:`toolbar`,children:[(0,P.jsx)(`input`,{className:`toolbar-search`,placeholder:`Search assigned issues, reporter, building, category`,value:c,onChange:e=>l(e.target.value)}),(0,P.jsx)(`div`,{className:`status-tabs`,children:[`ASSIGNED`,`IN PROGRESS`,`RESOLVED`].map(e=>(0,P.jsx)(`button`,{className:`status-tab ${o===e?`active`:``}`,onClick:()=>s(e),children:e},e))})]}),(0,P.jsxs)(`div`,{className:`technician-layout`,children:[(0,P.jsxs)(`div`,{className:`panel-card issues-panel`,children:[(0,P.jsx)(`div`,{className:`panel-header`,children:(0,P.jsx)(`div`,{className:`panel-title`,children:Se})}),(0,P.jsx)(`div`,{className:`issues-list`,children:u?(0,P.jsx)(`div`,{className:`empty-note`,children:`Loading your assignments...`}):oe.length===0?(0,P.jsxs)(`div`,{className:`empty-state`,children:[(0,P.jsx)(`div`,{className:`empty-state-art`,children:(0,P.jsx)(`div`,{className:`empty-state-glyph`})}),(0,P.jsx)(`div`,{className:`empty-state-eyebrow`,children:Ce.eyebrow}),(0,P.jsx)(`div`,{className:`empty-state-title`,children:Ce.title}),(0,P.jsx)(`div`,{className:`empty-state-text`,children:Ce.description})]}):oe.map(e=>{let t=de(e)[0];return(0,P.jsxs)(`div`,{className:`issue-card ${i===e.id?`active`:``}`,onClick:()=>a(e.id),children:[(0,P.jsxs)(`div`,{className:`issue-card-top`,children:[(0,P.jsx)(`div`,{className:`issue-thumb`,children:e.imageUrls&&e.imageUrls.length>0?(0,P.jsx)(`img`,{src:`http://localhost:8080${e.imageUrls[0]}`,alt:`Issue`}):null}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`issue-title`,children:e.title}),(0,P.jsxs)(`div`,{className:`issue-meta`,children:[`Reported by `,(0,P.jsx)(`strong`,{children:e.reporterName}),(0,P.jsx)(`br`,{}),ae(e.createdAt),(0,P.jsx)(`br`,{}),`Priority: `,e.priority,(0,P.jsx)(`br`,{}),`Assigned to `,(0,P.jsx)(`strong`,{children:e.assignedTechnicianName})]})]}),(0,P.jsx)(`div`,{className:`status-chip`,children:wo(e)})]}),(0,P.jsxs)(`div`,{className:`issue-tags`,children:[(0,P.jsx)(`span`,{className:`meta-pill`,children:e.category}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.priority}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.building}),(0,P.jsx)(`span`,{className:`meta-pill`,children:e.assignedTeam})]}),o===`ASSIGNED`&&t&&(0,P.jsxs)(`div`,{className:`admin-alert`,children:[(0,P.jsx)(`strong`,{children:`Admin alert:`}),se(t)===`PRIVATE`&&(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`}),` `,t.text]})]},e.id)})})]}),(0,P.jsx)(`div`,{className:`panel-card detail-card`,children:k?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`detail-header`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`detail-title`,children:k.title}),(0,P.jsxs)(`div`,{className:`detail-meta`,children:[`Reported by `,(0,P.jsx)(`strong`,{children:k.reporterName}),` |`,` `,ae(k.createdAt),(0,P.jsx)(`br`,{}),`Priority: `,k.priority,` | Building: `,k.building,(0,P.jsx)(`br`,{}),`Assigned to `,(0,P.jsx)(`strong`,{children:k.assignedTechnicianName}),k.assignedTeam?` (${k.assignedTeam})`:``]})]}),(0,P.jsx)(`div`,{className:`status-chip`,children:wo(k)})]}),A.length>0&&(0,P.jsx)(`div`,{className:`detail-gallery`,children:A.map((e,t)=>(0,P.jsx)(`img`,{src:`http://localhost:8080${e}`,alt:`Issue`,onClick:()=>w(`http://localhost:8080${e}`)},`${e}-${t}`))}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Description`}),(0,P.jsx)(`div`,{className:`description`,children:k.description})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Details`}),(0,P.jsxs)(`div`,{className:`two-grid`,children:[(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Category`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.category})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Priority`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.priority})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Building`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.building})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Location`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.locationType})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Room Number`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.roomNumber||`—`})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Assigned Date`}),(0,P.jsx)(`div`,{className:`info-value`,children:ae(k.assignedAt)})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Assigned Technician`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.assignedTechnicianName||`Unassigned`})]}),(0,P.jsxs)(`div`,{className:`info-card`,children:[(0,P.jsx)(`div`,{className:`info-label`,children:`Assigned Team`}),(0,P.jsx)(`div`,{className:`info-value`,children:k.assignedTeam||`Unassigned`})]})]})]}),k.technicianStatus===`RESOLVED`?(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Resolved Action`}),(0,P.jsx)(`div`,{className:`status-actions`,children:(0,P.jsx)(`button`,{className:`danger-btn`,onClick:be,children:`Remove from Technician Queue`})})]}):(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Status Control`}),(0,P.jsxs)(`div`,{className:`status-actions`,children:[k.technicianStatus===`ASSIGNED`&&(0,P.jsx)(`button`,{className:`status-action-btn`,onClick:()=>pe(k.id,`IN PROGRESS`),children:`Start Working`}),k.technicianStatus===`IN PROGRESS`&&(0,P.jsx)(`button`,{className:`status-action-btn`,onClick:()=>pe(k.id,`RESOLVED`),children:`Mark as Resolved`})]})]}),[`ASSIGNED`,`IN PROGRESS`].includes(k.technicianStatus)&&(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Admin Alerts`}),(0,P.jsxs)(`div`,{className:`alert-tabs`,children:[(0,P.jsx)(`button`,{type:`button`,className:`alert-tab ${v===`PUBLIC`?`active`:``}`,onClick:()=>y(`PUBLIC`),children:`Public`}),(0,P.jsxs)(`button`,{type:`button`,className:`alert-tab ${v===`PRIVATE`?`active`:``}`,onClick:()=>y(`PRIVATE`),children:[`Private`,j.length>0&&v!==`PRIVATE`&&(0,P.jsx)(`span`,{className:`private-badge`,children:j.length})]})]}),M.length===0?(0,P.jsx)(`div`,{className:`empty-note`,children:`No admin alerts for this issue.`}):(0,P.jsx)(`div`,{className:`conversation-list`,children:M.map(e=>(0,P.jsxs)(`div`,{className:`conversation-card`,onClick:()=>ne(e.id),style:{cursor:`pointer`},children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[(0,P.jsx)(`span`,{className:`conversation-author`,children:`Admin`}),` •`,` `,ae(e.createdAt)]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:e.text}),se(e)===`PRIVATE`&&(0,P.jsx)(`div`,{style:{marginTop:`8px`},children:(0,P.jsx)(`span`,{className:`private-chip`,children:`PRIVATE`})}),(0,P.jsx)(`div`,{style:{marginTop:`12px`},children:(0,P.jsx)(`button`,{type:`button`,className:`reply-link`,onClick:t=>{t.stopPropagation(),he(e)},children:`Reply`})})]},e.id))})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Technician Communication`}),m&&(0,P.jsxs)(`div`,{className:`conversation-card`,style:{marginBottom:`12px`},children:[(0,P.jsxs)(`div`,{className:`conversation-top`,children:[`Replying to `,(0,P.jsx)(`span`,{className:`conversation-author`,children:m.authorName})]}),(0,P.jsx)(`div`,{className:`conversation-text`,children:m.text}),(0,P.jsx)(`div`,{style:{marginTop:`10px`},children:(0,P.jsx)(`button`,{className:`danger-btn`,onClick:()=>{h(null),p(``),_(`PUBLIC`)},children:`Cancel Reply`})})]}),(0,P.jsxs)(`div`,{className:`technician-note-box`,children:[(0,P.jsx)(`div`,{className:`channel-toggle`,children:[`PUBLIC`,`PRIVATE`].map(e=>(0,P.jsx)(`button`,{type:`button`,className:`channel-btn ${g===e?`active`:``}`,disabled:!!m,onClick:()=>_(e),children:e===`PUBLIC`?`Public`:`Private`},e))}),(0,P.jsx)(`textarea`,{placeholder:m?`Replying to ${m.authorName}...`:g===`PRIVATE`?`Send a private technician alert. Only admin and technician can see it.`:`Send a public technician alert. This can appear in featured conversations.`,value:f,onChange:e=>p(e.target.value)}),(0,P.jsx)(`div`,{className:`technician-note-actions`,children:(0,P.jsx)(`button`,{className:`technician-note-btn`,onClick:me,disabled:!f.trim(),children:m?`Send Reply`:`Send Update`})})]})]}),(0,P.jsxs)(`div`,{className:`section`,children:[(0,P.jsx)(`div`,{className:`section-title`,children:`Issue Discussion`}),fe.length===0?(0,P.jsx)(`div`,{className:`empty-note`,children:`No discussion yet. Start the conversation!`}):(0,P.jsx)(`div`,{className:`conversation-list`,children:N(fe).map(e=>xe(e))})]})]}):(0,P.jsxs)(`div`,{className:`empty-state`,children:[(0,P.jsx)(`div`,{className:`empty-state-art`,children:(0,P.jsx)(`div`,{className:`empty-state-glyph`})}),(0,P.jsx)(`div`,{className:`empty-state-eyebrow`,children:`Ready to work`}),(0,P.jsx)(`div`,{className:`empty-state-title`,children:`Select an issue to view details`}),(0,P.jsx)(`div`,{className:`empty-state-text`,children:`Choose an assigned ticket from the queue to review the issue, communicate with admin, and move the work through your technician flow.`})]})})]}),C&&(0,P.jsxs)(`div`,{className:`image-modal`,onClick:()=>w(``),children:[(0,P.jsx)(`button`,{className:`image-modal-close`,onClick:()=>w(``),children:`×`}),(0,P.jsx)(`img`,{className:`image-modal-content`,src:C,alt:`Issue preview`,onClick:e=>e.stopPropagation()})]})]})]})}function Do(){return(0,P.jsxs)(Pt,{children:[(0,P.jsx)(Mt,{path:`/`,element:(0,P.jsx)(Yn,{})}),(0,P.jsx)(Mt,{path:`/report`,element:(0,P.jsx)(Ya,{})}),(0,P.jsx)(Mt,{path:`/my-reports`,element:(0,P.jsx)(Xa,{})}),(0,P.jsx)(Mt,{path:`/issues/:id`,element:(0,P.jsx)(Za,{})}),(0,P.jsx)(Mt,{path:`/featured`,element:(0,P.jsx)(Qa,{})}),(0,P.jsx)(Mt,{path:`/admin`,element:(0,P.jsx)(fo,{})}),(0,P.jsx)(Mt,{path:`/technician`,element:(0,P.jsx)(Eo,{})})]})}Jn.createRoot(document.getElementById(`root`)).render((0,P.jsx)(S.StrictMode,{children:(0,P.jsx)(wn,{children:(0,P.jsx)(Do,{})})}));