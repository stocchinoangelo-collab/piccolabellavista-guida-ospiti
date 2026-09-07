const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const saved=new Map();
const ctx={document:{documentElement:{}},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},console,URL,URLSearchParams,location:{hash:"#home"},Date,Set,Map,Intl,TextEncoder,crypto:require('node:crypto').webcrypto};
vm.createContext(ctx);
const scripts=['js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js'];
for(const file of scripts){let src=read(file);new vm.Script(src,{filename:file});if(file==='js/app.js')src=src.split('/* ---------- init ---------- */')[0];vm.runInContext(src,ctx,{filename:file});}
const run=s=>vm.runInContext(s,ctx);
let renders=0;
for(const lang of ['it','en','de']){
 run(`LANG='${lang}';buildEventIndex()`);
 const pages=run('Object.keys(ROUTES).map(k=>[k,ROUTES[k]()])');
 for(const [route,html] of pages){
  assert(html.length>100,route);assert(!html.includes('undefined'),`${lang}/${route} undefined`);
  assert(!/\[DA VERIFICARE\]/.test(html));
  for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   const u=m[1].replaceAll('&amp;','&');if(!/^(https?:|#)/.test(u))assert(fs.existsSync(path.join(root,u)),`Missing ${u}`);
  }
  for(const m of html.matchAll(/<img\b[^>]*>/g))assert(/width="\d+"/.test(m[0])&&/height="\d+"/.test(m[0])&&/alt="[^"]+"/.test(m[0]));
  renders++;
 }
 assert.equal(run('FOOD.length'),8);assert.equal(run('GUIDE.restaurants.length'),5);assert.equal(run('GUIDE.aperitivi.length'),4);
 assert(run('pgAperitivi()').includes('Biffi American Bar'));
 assert.equal(run('GUIDE.transit.length'),7);
 assert(run('pgSenzaAuto()').includes('Piazza Nazzari'));
 assert(!run('pgMangiare()+pgAperitivi()').includes('<img'));
}
assert.equal(run('EVENT_INDEX.filter(e=>e.start).length'),0,'Never promote recurring traditions to confirmed future dates');
assert.equal(run('csvToUnified({id:"x",nome:"Cancelled",data_inizio:"2026-10-01",stato:"annullato"})'),null);
assert.equal(run('safeUrl("javascript:alert(1)")'),'');
ctx.escapeInput='<script>"&';assert.equal(run("esc(escapeInput)"),'&lt;script&gt;&quot;&amp;');
const photos=JSON.parse(read('credits/photos.json'));
for(const p of photos){assert(fs.statSync(path.join(root,p.file)).size>1000);assert(p.author&&p.license&&p.source&&p.licenseUrl);assert(!p.status.includes('PENDING'));if(p.thumb)assert(fs.existsSync(path.join(root,p.thumb)));}
assert.equal(photos.length,11);
for(const m of read('index.html').matchAll(/(?:src|href)="([^"]+)"/g)){if(!/^(https?:|#)/.test(m[1]))assert(fs.existsSync(path.join(root,m[1])),m[1]);}
const manifest=JSON.parse(read('manifest.webmanifest'));for(const icon of manifest.icons)assert(fs.existsSync(path.join(root,icon.src)));assert.equal(manifest.display,'standalone');
// Test service-worker lifecycle and offline responses with the real worker code.
(async()=>{
 const handlers={},buckets=new Map(),deleted=[],scope='https://example.com/guide/';
 const key=r=>new URL(typeof r==='string'?r:r.url,scope).href;
 const caches={async open(name){if(!buckets.has(name))buckets.set(name,new Map());const bucket=buckets.get(name);return {async addAll(files){for(const file of files){const full=path.join(root,file==='./'?'index.html':file);assert(fs.existsSync(full),`Precache missing ${file}`);bucket.set(key(file),new Response(fs.readFileSync(full))) }},async match(r){return bucket.get(key(r))?.clone()},async put(r,response){bucket.set(key(r),response)}}},async keys(){return [...buckets.keys()]},async delete(k){deleted.push(k);return buckets.delete(k)}};
 let skipped=false,claimed=false,online=false;
 const self={registration:{scope},location:new URL(scope+'sw.js'),addEventListener:(n,fn)=>handlers[n]=fn,skipWaiting:async()=>{skipped=true},clients:{claim:async()=>{claimed=true},matchAll:async()=>[]}};
 const worker={self,caches,URL,Response,fetch:async()=>{if(!online)throw Error('offline');return new Response('live')}};
 vm.createContext(worker);vm.runInContext(read('sw.js'),worker);
 let job;handlers.install({waitUntil:p=>job=p});await job;assert(skipped);
 buckets.set('unrelated-cache',new Map());buckets.set('pbv-guide-other-scope-old',new Map());buckets.set('pbv-v15',new Map());
 handlers.activate({waitUntil:p=>job=p});await job;assert(claimed);assert(!deleted.includes('pbv-v15'));assert(buckets.has('unrelated-cache'));assert(buckets.has('pbv-guide-other-scope-old'));
 for(const file of ['index.html','js/app.js',photos[0].file]){let reply;handlers.fetch({request:new Request(scope+file),respondWith:p=>reply=p});const response=await reply;assert.equal(response.status,200);assert((await response.arrayBuffer()).byteLength>0)}
 let intercepted=false;handlers.fetch({request:new Request('https://api.open-meteo.com/x'),respondWith:()=>intercepted=true});assert.equal(intercepted,false);
 console.log(`PASS: ${renders} route/language renders; 11 photo provenance records; 8 foods; 9 venues; 7 transit destinations; manifest/local paths; SW install/activate/offline/isolation.`);
})().catch(e=>{console.error(e);process.exitCode=1});
