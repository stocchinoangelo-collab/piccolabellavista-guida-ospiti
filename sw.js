const PREFIX="pbv-boutique:"+new URL(self.registration.scope).pathname+":";
const CACHE=PREFIX+"v1";
const LOCAL=["./","index.html","css/base.css","css/style.css","js/i18n.js","js/data.js","js/photos.js","js/app.js","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const url=new URL(e.request.url),local=url.origin===self.location.origin;
 if(!local)return;
 if(!url.href.startsWith(self.registration.scope))return;
 e.respondWith((async()=>{try{const response=await fetch(e.request);
 if(response.ok&&!response.redirected&&response.type!=="opaqueredirect"){const cache=await caches.open(CACHE);await cache.put(e.request,response.clone());}
 return response;
 }catch{const cached=await caches.match(e.request);if(cached)return cached;
 if(e.request.mode==="navigate"){const page=await caches.match(new URL("index.html",self.registration.scope));if(page)return page;}
 return new Response("Offline",{status:503,headers:{"Content-Type":"text/plain"}});
 }})());
});
