/* Versioned app shell and local photography. Live services are never fabricated offline. */
const PREFIX='pbv-guide-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'2026-09-07-consolidated-2';
const CORE=['./','index.html','css/style.css','css/boutique.css','css/release.css','js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js','manifest.webmanifest','icon.svg','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','credits/photos.json','img/casa/bagno.jpg','img/casa/letto.jpg','img/casa/panoramica.jpg','img/casa/zona-pranzo.jpg'];
async function precache(cache,files){
 // Bypass HTTP caches during upgrades. A login page must never replace an asset.
 for(const file of files){
  const url=new URL(file==='index.html'?'./':file,self.registration.scope);
  if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))throw Error('Asset outside guide scope');
  const response=await fetch(url.href,{cache:'reload',credentials:'same-origin',redirect:'error'});
  const type=(response.headers.get('Content-Type')||'').split(';')[0].trim();
  const extension=file.split('.').pop();
  const expected={js:['text/javascript','application/javascript'],css:['text/css'],json:['application/json'],webmanifest:['application/manifest+json','application/json'],svg:['image/svg+xml'],png:['image/png'],jpg:['image/jpeg'],webp:['image/webp']};
  const allowed=expected[extension]||['text/html'];
  if(!response.ok||response.redirected||!allowed.includes(type))throw Error('Invalid offline asset: '+file);
  await cache.put(new URL(file,self.registration.scope).href,response);
 }
}
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  try{
  await precache(cache,CORE);
  const manifest=await (await cache.match('credits/photos.json')).json();
  const assets=[...new Set(manifest.flatMap(p=>[p.file,p.thumb].filter(Boolean)))];
  await precache(cache,assets);
  }catch(error){await caches.delete(CACHE);throw error;}
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
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
   if(response.ok&&!response.redirected&&response.type!=='opaqueredirect')await cache.put(request,response.clone());
   return response;
  }catch{
   return new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}});
  }
 })());
});
