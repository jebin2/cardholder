(()=>{"use strict";var e={930:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},172:()=>{try{self["workbox:expiration:6.5.4"]&&_()}catch(e){}},166:()=>{try{self["workbox:core:6.5.4"]&&_()}catch(e){}},769:()=>{try{self["workbox:precaching:6.5.4"]&&_()}catch(e){}},247:()=>{try{self["workbox:core:6.5.4"]&&_()}catch(e){}},357:()=>{try{self["workbox:routing:6.5.4"]&&_()}catch(e){}},979:()=>{try{self["workbox:core:6.5.4"]&&_()}catch(e){}},124:()=>{try{self["workbox:strategies:6.5.4"]&&_()}catch(e){}},262:()=>{try{self["workbox:core:6.5.4"]&&_()}catch(e){}}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}s(930);Error;new Set;"undefined"!==typeof registration&&registration.scope;s(166);const n=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),r=1;r<s;r++)n[r-1]=arguments[r];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class r extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}function a(e){e.then((()=>{}))}const i=(e,t)=>t.some((t=>e instanceof t));let o,c;const h=new WeakMap,l=new WeakMap,u=new WeakMap,d=new WeakMap,f=new WeakMap;let p={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return l.get(e);if("objectStoreNames"===t)return e.objectStoreNames||u.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return y(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function g(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(){for(var t=arguments.length,s=new Array(t),n=0;n<t;n++)s[n]=arguments[n];return e.apply(m(this),s),y(h.get(this))}:function(){for(var t=arguments.length,s=new Array(t),n=0;n<t;n++)s[n]=arguments[n];return y(e.apply(m(this),s))}:function(t){for(var s=arguments.length,n=new Array(s>1?s-1:0),r=1;r<s;r++)n[r-1]=arguments[r];const a=e.call(m(this),t,...n);return u.set(a,t.sort?t.sort():[t]),y(a)}}function w(e){return"function"===typeof e?g(e):(e instanceof IDBTransaction&&function(e){if(l.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",a),e.removeEventListener("abort",a)},r=()=>{t(),n()},a=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",r),e.addEventListener("error",a),e.addEventListener("abort",a)}));l.set(e,t)}(e),i(e,o||(o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,p):e)}function y(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",r),e.removeEventListener("error",a)},r=()=>{t(y(e.result)),n()},a=()=>{s(e.error),n()};e.addEventListener("success",r),e.addEventListener("error",a)}));return t.then((t=>{t instanceof IDBCursor&&h.set(t,e)})).catch((()=>{})),f.set(t,e),t}(e);if(d.has(e))return d.get(e);const t=w(e);return t!==e&&(d.set(e,t),f.set(t,e)),t}const m=e=>f.get(e);const v=["get","getKey","getAll","getAllKeys","count"],b=["put","add","delete","clear"],R=new Map;function x(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(R.get(t))return R.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,r=b.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!v.includes(s))return;const a=async function(e){const t=this.transaction(e,r?"readwrite":"readonly");let a=t.store;for(var i=arguments.length,o=new Array(i>1?i-1:0),c=1;c<i;c++)o[c-1]=arguments[c];return n&&(a=a.index(o.shift())),(await Promise.all([a[s](...o),r&&t.done]))[0]};return R.set(t,a),a}p=(e=>({...e,get:(t,s,n)=>x(t,s)||e.get(t,s,n),has:(t,s)=>!!x(t,s)||e.has(t,s)}))(p);s(172);const C="cache-entries",E=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class L{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(C,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e){let{blocked:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(e=>t(e.oldVersion,e))),y(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=E(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(C,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(C,this._getId(e));return null===s||void 0===s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(C).store.index("timestamp").openCursor(null,"prev");const r=[];let a=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&a>=t?r.push(n.value):a++),n=await n.continue()}const i=[];for(const o of r)await s.delete(C,o.id),i.push(o.url);return i}_getId(e){return this._cacheName+"|"+E(e)}async getDb(){return this._db||(this._db=await function(e,t){let{blocked:s,upgrade:n,blocking:r,terminated:a}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const i=indexedDB.open(e,t),o=y(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(y(i.result),e.oldVersion,e.newVersion,y(i.transaction),e)})),s&&i.addEventListener("blocked",(e=>s(e.oldVersion,e.newVersion,e))),o.then((e=>{a&&e.addEventListener("close",(()=>a())),r&&e.addEventListener("versionchange",(e=>r(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class q{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new L(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,a(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}const k={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},D=e=>[k.prefix,e,k.suffix].filter((e=>e&&e.length>0)).join("-"),U=e=>e||D(k.runtime),N=new Set;s(247);const T=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),r=1;r<s;r++)n[r-1]=arguments[r];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class A extends Error{constructor(e,t){super(T(e,t)),this.name=e,this.details=t}}const I={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},K=e=>[I.prefix,e,I.suffix].filter((e=>e&&e.length>0)).join("-"),M=e=>e||K(I.precache);function S(e,t){const s=t();return e.waitUntil(s),s}s(769);function P(e){if(!e)throw new A("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new A("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class O{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async e=>{let{request:t,state:s}=e;s&&(s.originalRequest=t)},this.cachedResponseWillBeUsed=async e=>{let{event:t,state:s,cachedResponse:n}=e;if("install"===t.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const e=s.originalRequest.url;n?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return n}}}class W{constructor(e){let{precacheController:t}=e;this.cacheKeyWillBeUsed=async e=>{let{request:t,params:s}=e;const n=(null===s||void 0===s?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=t}}let B;async function j(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new A("cross-origin-copy-response",{origin:s});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},a=t?t(r):r,i=function(){if(void 0===B){const t=new Response("");if("body"in t)try{new Response(t.body),B=!0}catch(e){B=!1}B=!1}return B}()?n.body:await n.blob();return new Response(i,a)}s(262);const F={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},H=e=>[F.prefix,e,F.suffix].filter((e=>e&&e.length>0)).join("-"),$=e=>e||H(F.runtime),V=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),r=1;r<s;r++)n[r-1]=arguments[r];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class J extends Error{constructor(e,t){super(V(e,t)),this.name=e,this.details=t}}const G=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function Q(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}class z{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const X=new Set;function Y(e){return new Promise((t=>setTimeout(t,e)))}s(124);function Z(e){return"string"===typeof e?new Request(e):e}class ee{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new z,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=Z(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(a){if(a instanceof Error)throw new J("plugin-error-request-will-fetch",{thrownErrorMessage:a.message})}const r=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:r,response:e});return e}catch(i){throw n&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:n.clone(),request:r.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=Z(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(a,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:r,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(e,t){const s=Z(e);await Y(0);const n=await this.getCacheKey(s,"write");if(!t)throw new J("cache-put-with-no-response",{url:G(n.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:a,matchOptions:i}=this._strategy,o=await self.caches.open(a),c=this.hasCallback("cacheDidUpdate"),h=c?await async function(e,t,s,n){const r=Q(t.url,s);if(t.url===r)return e.match(t,n);const a=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,a);for(const o of i)if(r===Q(o.url,s))return e.match(o,n)}(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,c?r.clone():r)}catch(l){if(l instanceof Error)throw"QuotaExceededError"===l.name&&await async function(){for(const e of X)await e()}(),l}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:a,oldResponse:h,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=Z(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return t[e](r)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class te{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.cacheName=$(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new ee(this,{event:t,request:s,params:n}),a=this._getResponse(r,s,t);return[a,this._awaitComplete(a,r,s,t)]}async _getResponse(e,t,s){let n;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(n=await this._handle(t,e),!n||"error"===n.type)throw new J("no-response",{url:t.url})}catch(r){if(r instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:r,event:s,request:t}),n)break;if(!n)throw r}for(const a of e.iterateCallbacks("handlerWillRespond"))n=await a({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let r,a;try{r=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(i){i instanceof Error&&(a=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:a}),t.destroy(),a)throw a}}class se extends te{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.cacheName=M(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(se.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(!this._fallbackToNetwork)throw new A("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const r=n.integrity,a=e.integrity,i=!a||a===r;if(s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?a||r:void 0})),r&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await t.cachePut(e,s.clone());0}}return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new A("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==se.copyRedirectedCacheableResponsesPlugin&&(n===se.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(se.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}se.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate(e){let{response:t}=e;return!t||t.status>=400?null:t}},se.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate(e){let{response:t}=e;return t.redirected?await j(t):t}};class ne{constructor(){let{cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new se({cacheName:M(e),plugins:[...t,new W({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"===typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=P(s),r="string"!==typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new A("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new A("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return S(e,(async()=>{const t=new O;this.strategy.plugins.push(t);for(const[r,a]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(a),s=this._urlsToCacheModes.get(r),n=new Request(r,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return S(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new A("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let re;const ae=()=>(re||(re=new ne),re);s(979);const ie=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),r=1;r<s;r++)n[r-1]=arguments[r];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class oe extends Error{constructor(e,t){super(ie(e,t)),this.name=e,this.details=t}}s(357);const ce=e=>e&&"object"===typeof e?e:{handle:e};class he{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=ce(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=ce(e)}}class le extends he{constructor(e,t,s){super((t=>{let{url:s}=t;const n=e.exec(s.href);if(n&&(s.origin===location.origin||0===n.index))return n.slice(1)}),t,s)}}class ue{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:s}=e;const n=new URL(t.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const r=n.origin===location.origin,{params:a,route:i}=this.findMatchingRoute({event:s,request:t,sameOrigin:r,url:n});let o=i&&i.handler;const c=t.method;if(!o&&this._defaultHandlerMap.has(c)&&(o=this._defaultHandlerMap.get(c)),!o)return void 0;let h;try{h=o.handle({url:n,request:t,event:s,params:a})}catch(u){h=Promise.reject(u)}const l=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||l)&&(h=h.catch((async e=>{if(l){0;try{return await l.handle({url:n,request:t,event:s,params:a})}catch(r){r instanceof Error&&(e=r)}}if(this._catchHandler)return this._catchHandler.handle({url:n,request:t,event:s});throw e}))),h}findMatchingRoute(e){let{url:t,sameOrigin:s,request:n,event:r}=e;const a=this._routes.get(n.method)||[];for(const i of a){let e;const a=i.match({url:t,sameOrigin:s,request:n,event:r});if(a)return e=a,(Array.isArray(e)&&0===e.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"===typeof a)&&(e=void 0),{route:i,params:e}}return{}}setDefaultHandler(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET";this._defaultHandlerMap.set(t,ce(e))}setCatchHandler(e){this._catchHandler=ce(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new oe("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new oe("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let de;const fe=()=>(de||(de=new ue,de.addFetchListener(),de.addCacheListener()),de);function pe(e,t,s){let n;if("string"===typeof e){const r=new URL(e,location.href);0;n=new he((e=>{let{url:t}=e;return t.href===r.href}),t,s)}else if(e instanceof RegExp)n=new le(e,t,s);else if("function"===typeof e)n=new he(e,t,s);else{if(!(e instanceof he))throw new oe("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return fe().registerRoute(n),n}class ge extends he{constructor(e,t){super((s=>{let{request:n}=s;const r=e.getURLsToCacheKeys();for(const a of function(e){let{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function*(){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}()}(n.url,t)){const t=r.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}const we={cacheWillUpdate:async e=>{let{response:t}=e;return 200===t.status||0===t.status?t:null}};var ye;self.addEventListener("activate",(()=>self.clients.claim())),function(e){ae().precache(e)}([{'revision':'42b9da9b4b4b087854d1190a76d9ab98','url':'/cardholder/index.html'},{'revision':null,'url':'/cardholder/static/css/main.f42de250.css'},{'revision':null,'url':'/cardholder/static/js/main.9c4e5551.js'}]),function(e){const t=ae();pe(new ge(t,e))}(ye);const me=new RegExp("/[^/?]+\\.[^/]+$");var _e;pe((e=>{let{request:t,url:s}=e;return"navigate"===t.mode&&(!s.pathname.startsWith("/_")&&!s.pathname.match(me))}),(_e="/cardholder/index.html",ae().createHandlerBoundToURL(_e))),pe((e=>{let{url:t}=e;return t.origin===self.location.origin&&t.pathname.endsWith(".png")}),new class extends te{constructor(){super(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(we)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch((()=>{}));t.waitUntil(s);let n,r=await t.cacheMatch(e);if(r)0;else{0;try{r=await s}catch(a){a instanceof Error&&(n=a)}}if(!r)throw new J("no-response",{url:e.url,error:n});return r}}({cacheName:"images",plugins:[new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.cachedResponseWillBeUsed=async e=>{let{event:t,request:s,cacheName:n,cachedResponse:r}=e;if(!r)return null;const i=this._isResponseDateFresh(r),o=this._getCacheExpiration(n);a(o.expireEntries());const c=o.updateTimestamp(s.url);if(t)try{t.waitUntil(c)}catch(h){0}return i?r:null},this.cacheDidUpdate=async e=>{let{cacheName:t,request:s}=e;const n=this._getCacheExpiration(t);await n.updateTimestamp(s.url),await n.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){N.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===U())throw new r("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new q(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))})();