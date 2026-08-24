 sw.js

/* Piccolabellavista service worker — V1.2 */
const CACHE="pbv-v12";
const ASSETS=["./","index.html","css/style.css","js/i18n.js","js/data.js","js/app.js","manifest.webmanifest","icon.svg"];

self.addEventListener("install",e=>{
 self.skipWaiting();
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});

self.addEventListener("activate",e=>{
 e.waitUntil((async()=>{
  const ks=await caches.keys();
  await Promise.all(ks.filter(k=>k!==CACHE&&k!=="pbv-csv").map(k=>caches.delete(k)));
  await self.clients.claim();
 })());});

self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);

 /* METEO → sempre live, mai in cache */
 if(u.hostname==="api.open-meteo.com")return;

 /* FOGGLIO EVENTI CSV → rete prima, cache come riserva offline */
 if(u.hostname==="docs.google.com"||u.hostname.endsWith("googleusercontent.com")){
  e.respondWith(
   fetch(e.request).then(res=>{
    try{const cp=res.clone();caches.open("pbv-csv").then(c=>c.put(e.request,cp));}catch(_){}
    return res;
   }).catch(()=>caches.match(e.request))
  );
  return;}

 /* CONTENUTI STATICI → cache-first (offline completo) */
 if(u.origin===location.origin){
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(r2=>{
   if(r2.ok){const cp=r2.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
   return r2;})));}
});