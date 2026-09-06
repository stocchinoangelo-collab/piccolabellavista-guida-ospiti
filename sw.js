/* Versioned app shell and local photography. Live services are never fabricated offline. */
const PREFIX='pbv-guide-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'2026-09-06-1';
const CORE=['./','index.html','css/style.css','css/boutique.css','js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js','manifest.webmanifest','icon.svg','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','credits/photos.json'];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(CORE);
  const manifest=await (await cache.match('credits/photos.json')).json();
  const assets=[...new Set(manifest.flatMap(p=>[p.file,p.thumb].filter(Boolean)))];
  await cache.addAll(assets);
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(k=>(k.startsWith(PREFIX)&&k!==CACHE)||/^pbv-v\d+$/.test(k)).map(k=>caches.delete(k)));
  await self.clients.claim();
  const clients=await self.clients.matchAll({type:'window'});
  clients.forEach(client=>client.postMessage({type:'PBV_UPDATED',version:CACHE}));
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const scope=new URL(self.registration.scope);
 if(!url.pathname.startsWith(scope.pathname))return;
 // Restrict caches to this guide; do not cache arbitrary files under a shared origin.
 const relative=url.pathname.slice(scope.pathname.length);
 const isApp=CORE.includes(relative)||relative===''||relative.startsWith('images/');
 if(!isApp)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(request,{ignoreSearch:true});
  if(cached)return cached;
  try{
   const response=await fetch(request);
   if(response.ok)await cache.put(request,response.clone());
   return response;
  }catch{
   return new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}});
  }
 })());
});
