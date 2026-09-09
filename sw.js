/* Piccolabellavista Concierge — privacy-first service worker.
   Cloudflare Access remains the real authorization layer. The worker must never
   turn a previously cached private response into an authorization bypass. */
const PREFIX='pbv-guide-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'2026-09-09-concierge-v2-closure';

self.addEventListener('install',event=>{
 event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  await Promise.all((await caches.keys())
   .filter(k=>k.startsWith(PREFIX)||/^pbv-v\d+$/.test(k))
   .map(k=>caches.delete(k)));
  await self.clients.claim();
  const clients=await self.clients.matchAll({type:'window'});
  clients.forEach(client=>client.postMessage({type:'PBV_UPDATED',version:CACHE,offlinePrivateContent:false}));
 })());
});

self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const scope=new URL(self.registration.scope);
 if(!url.pathname.startsWith(scope.pathname))return;

 event.respondWith((async()=>{
  try{
   return await fetch(request,{cache:'no-store'});
  }catch{
   return new Response('Connessione necessaria per accedere alla guida privata.',{
    status:503,
    headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}
   });
  }
 })());
});
