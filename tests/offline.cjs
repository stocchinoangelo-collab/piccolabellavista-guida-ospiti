/* SW lifecycle regression with isolated fake CacheStorage, not an airplane-mode test. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const scope='https://example.com/piccolabellavista-guida-ospiti/',buckets=new Map();
const prefix='pbv-guide-'+encodeURIComponent(new URL(scope).pathname)+'-';
const url=r=>new URL(typeof r==='string'?r:r.url,scope).href;
let failFile='',online=true;
const caches={async keys(){return [...buckets.keys()]},async delete(k){return buckets.delete(k)},async open(k){if(!buckets.has(k))buckets.set(k,new Map());const b=buckets.get(k);return {
 async addAll(files){const staged=[];for(const f of files){if(f===failFile)throw Error('Failed asset');const file=path.join(root,f==='./'?'index.html':f);staged.push([url(f),new Response(fs.readFileSync(file))]);}for(const [u,r]of staged)b.set(u,r)},
 async match(r,options){const u=url(r);if(!options?.ignoreSearch)return b.get(u)?.clone();return [...b].find(([k])=>k.split('?')[0]===u.split('?')[0])?.[1].clone()},
 async put(r,response){b.set(url(r),response)}
}}};
function worker(code){const handlers={};let skipped=false,claimed=false;const self={registration:{scope},location:new URL(scope+'sw.js'),addEventListener:(k,f)=>handlers[k]=f,skipWaiting:async()=>{skipped=true},clients:{claim:async()=>{claimed=true},matchAll:async()=>[]}};vm.runInNewContext(code,{self,caches,URL,Response,fetch:async()=>{if(!online)throw Error('Offline');return new Response('online')}});return {handlers,get skipped(){return skipped},get claimed(){return claimed}}}
async function event(w,type){let p;w.handlers[type]({waitUntil:job=>p=job});await p}
async function request(w,file,method='GET'){let p;w.handlers.fetch({request:new Request(new URL(file,scope),{method}),respondWith:r=>p=r});return p}
(async()=>{
 const first=worker(source);await event(first,'install');assert(first.skipped);await event(first,'activate');assert(first.claimed);
 online=false;
 const photos=JSON.parse(fs.readFileSync(path.join(root,'credits/photos.json')));
 const files=['','index.html?installed=1','css/release.css','js/app.js','img/casa/bagno.jpg',...photos.flatMap(p=>[p.file,p.thumb].filter(Boolean))];
 for(const f of files){const response=await request(first,f);assert.equal(response.status,200,f);assert((await response.arrayBuffer()).byteLength>0,f)}
 assert.equal((await request(first,'images/not-cached.webp')).status,503);
 assert.equal(await request(first,'https://api.open-meteo.com/test'),undefined);
 assert.equal(await request(first,'/another-guide/index.html'),undefined);
 assert.equal(await request(first,'index.html','POST'),undefined);
 const current=[...buckets.keys()].find(k=>k.startsWith(prefix));
 buckets.set('pbv-guide-other-scope-old',new Map());buckets.set('pbv-v15',new Map());
 online=true;const updatedSource=source.replace('2026-09-07-consolidated-1','2026-09-07-test-2');
 failFile='img/casa/bagno.jpg';const failed=worker(updatedSource);await assert.rejects(event(failed,'install'));assert(!failed.skipped);assert(buckets.has(current));assert.equal((await request(first,'index.html')).status,200);
 failFile='';const updated=worker(updatedSource);await event(updated,'install');await event(updated,'activate');
 assert(!buckets.has(current));assert(buckets.has('pbv-guide-other-scope-old'));assert(buckets.has('pbv-v15'));
 online=false;assert.equal((await request(updated,'index.html')).status,200);
 console.log(`PASS: ${files.length} offline resources; failed update preserves current version; successful version upgrade; query URLs; out-of-scope and remote requests untouched. Simulated CacheStorage only.`);
})().catch(e=>{console.error(e);process.exitCode=1});
