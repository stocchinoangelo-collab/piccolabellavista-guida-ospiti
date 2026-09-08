const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const saved=new Map();
const ctx={document:{documentElement:{}},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},console,URL,Date,Set,Map,Intl,TextEncoder,crypto:require('node:crypto').webcrypto};
vm.createContext(ctx);
for(const file of ['js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js']){
 let src=read(file);new vm.Script(src,{filename:file});
 if(file==='js/app.js')src=src.split('/* ---------- init ---------- */')[0];
 vm.runInContext(src,ctx,{filename:file});
}
const run=s=>vm.runInContext(s,ctx);
let renders=0,details=0;
for(const lang of ['it','en','de']){
 run(`LANG='${lang}';buildEventIndex()`);
 const pages=run('Object.keys(ROUTES).map(k=>[k,ROUTES[k]()])');
 assert.equal(pages.length,17,`${lang}: route count`);
 for(const [route,html] of pages){
  assert(html.length>100,`${lang}/${route}`);
  assert(!html.includes('undefined'),`${lang}/${route}: undefined`);
  assert(!/QuantoBasta|Cala Regina|Porto Sa Ruxi/i.test(html),`${lang}/${route}: excluded venue`);
  for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   const u=m[1].replaceAll('&amp;','&');
   if(!/^(https?:|#)/.test(u))assert(fs.existsSync(path.join(root,u)),`Missing ${u}`);
  }
  renders++;
 }
 const sheetNodes={'#sheet-content':{innerHTML:''},'#sheet':{classList:{add(){}}},'#sheet-x':{focus(){}}};
 ctx.document.querySelector=q=>sheetNodes[q];ctx.document.body={style:{}};
 for(const id of run('BEACHES.map(b=>b.id)')){
  run(`openSheet('${id}')`);const html=sheetNodes['#sheet-content'].innerHTML;
  assert(!html.includes('undefined'),`${lang}/${id}: detail undefined`);
  if(id!=='costa_rei')assert(html.includes('<img'),`${lang}/${id}: approved beach image missing`);
  if(['pelosa','brandinchi','tuerredda','molentis','porto_giunco'].includes(id))assert(html.includes(run("esc(t('check_access'))")),`${lang}/${id}: warning missing`);
  details++;
 }
 const home=run('pgHome()');
 for(const key of ['need_today','need_food','need_sea','need_help'])assert(home.includes(run(`esc(t('${key}'))`)),`${lang}: ${key}`);
}
assert.equal(run('FOOD.length'),8);
assert.equal(run('GUIDE.restaurants.length'),5);
assert.equal(run('GUIDE.aperitivi.length'),4);
assert.equal(run('GUIDE.transit.length'),7);
assert.equal(run('EVENT_INDEX.filter(e=>e.start).length'),0,'Do not promote recurring events to confirmed dates');
assert.equal(run('safeUrl("javascript:alert(1)")'),'');
const manifest=JSON.parse(read('manifest.webmanifest'));
assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons)assert(fs.existsSync(path.join(root,icon.src)),`Missing manifest icon ${icon.src}`);
const runtimePhotos=run('Object.values(PHOTOS).filter(p=>p.file)');
for(const p of runtimePhotos){assert(p.status.startsWith('APPROVATA_USO'),p.file);assert(fs.existsSync(path.join(root,p.file)),p.file);assert(p.author&&p.license&&p.source,p.file);}

(async()=>{
 const handlers={},deleted=[],scope='https://example.com/guide/';
 const caches={
  async keys(){return ['pbv-guide-%2Fguide%2F-old','pbv-v15','unrelated-cache','pbv-guide-other-scope-old']},
  async delete(k){deleted.push(k);return true}
 };
 let skipped=false,claimed=false,online=true;
 const self={registration:{scope},location:new URL(scope+'sw.js'),addEventListener:(n,fn)=>handlers[n]=fn,skipWaiting:async()=>{skipped=true},clients:{claim:async()=>{claimed=true},matchAll:async()=>[]}};
 const worker={self,caches,URL,Response,fetch:async()=>{if(!online)throw Error('offline');return new Response('live',{status:200})}};
 vm.createContext(worker);vm.runInContext(read('sw.js'),worker);
 let job;handlers.install({waitUntil:p=>job=p});await job;assert(skipped,'SW skipWaiting');
 handlers.activate({waitUntil:p=>job=p});await job;assert(claimed,'SW clients.claim');
 assert(deleted.includes('pbv-v15'),'legacy cache deleted');
 assert(deleted.includes('pbv-guide-%2Fguide%2F-old'),'same-scope guide cache deleted');
 assert(!deleted.includes('unrelated-cache'),'unrelated cache preserved');
 assert(!deleted.includes('pbv-guide-other-scope-old'),'other-scope guide cache preserved');
 let reply;handlers.fetch({request:new Request(scope+'index.html'),respondWith:p=>reply=p});
 assert.equal(await (await reply).text(),'live','online request reaches server');
 online=false;reply=null;handlers.fetch({request:new Request(scope+'index.html'),respondWith:p=>reply=p});
 const offline=await reply;assert.equal(offline.status,503,'offline private guide must fail closed');
 assert((await offline.text()).includes('Connessione necessaria'),'offline response explains network requirement');
 let intercepted=false;handlers.fetch({request:new Request('https://api.open-meteo.com/x'),respondWith:()=>intercepted=true});assert.equal(intercepted,false,'external origins not intercepted');
 console.log(`PASS: ${renders} route/language renders; ${details} beach details; content/photo/manifest checks; privacy-first SW online/fail-closed/offline/cache-cleanup.`);
})().catch(e=>{console.error(e);process.exitCode=1});
