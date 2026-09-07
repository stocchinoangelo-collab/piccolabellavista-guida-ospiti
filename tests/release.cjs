/* Release regression checks. These are Node tests, not browser/device certification. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const elements=new Map();
function element(id){if(!elements.has(id))elements.set(id,{innerHTML:'',inert:false,isConnected:true,style:{},dataset:{},classList:{add(){},remove(){},contains(){return false}},focus(){},querySelectorAll(){return []}});return elements.get(id)}
const ctx={console,URL,URLSearchParams,Date,Intl,Map,Set,location:{hash:'#home'},document:{documentElement:{},querySelector:element,querySelectorAll:()=>[],activeElement:element('trigger'),body:element('body')},localStorage:{getItem:()=>null},window:{scrollY:0},setBackgroundInert(){}};
vm.createContext(ctx);
for(const f of ['i18n','data','guide','photos','editorial','app']){let s=read('js/'+f+'.js');new vm.Script(s);if(f==='app')s=s.split('/* ---------- init ---------- */')[0];vm.runInContext(s,ctx)}
const run=s=>vm.runInContext(s,ctx);
let rendered=0,details=0,mapLinks=0;const dictionaryMisses=[];
for(const lang of ['it','en','de']){
 ctx.activeLanguage=lang;run('LANG=activeLanguage');
 const dictionary=run('I18N[LANG]');ctx.dictionaryProxy=new Proxy(dictionary,{get(target,key){if(typeof key==='string'&&!(key in target))dictionaryMisses.push(lang+':'+key);return target[key]}});run('I18N[LANG]=dictionaryProxy');
 for(const route of run('Object.keys(ROUTES)')){
  ctx.location.hash='#'+route;ctx.route=route;const html=run('ROUTES[route]()');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,lang+'/'+route+' must have one H1');
  check(html,lang+'/'+route);rendered++;
 }
 for(const id of run('[...BEACHES,...GEMS].map(x=>x.id)')){ctx.placeId=id;run('openSheet(placeId)');check(element('#sheet-content').innerHTML,lang+'/'+id);details++;}
 for(const type of ['all','sardinian','pizza','aperitivo']){ctx.location.hash='#mangiare?type='+type;check(run('pgMangiare()'),lang+'/restaurants/'+type)}
 ctx.location.hash='#mangiare?type=pizza';assert(run('pgMangiare()').includes('Il Gallo'));assert(!run('pgMangiare()').includes('Su Cumbidu'));
 ctx.location.hash='#mangiare?type=aperitivo';assert(run('pgMangiare()').includes('Biffi American Bar'));
 for(const [hash,route]of Object.entries({'#enogastronomia':'sapori','#muoversi':'senzaauto','#info':'utili','#cagliari':'cagliari','#mangiare?type=pizza':'mangiare','#unknown':'home'})){ctx.hash=hash;assert.equal(run('resolveRoute(hash)'),route)}
}
assert.deepEqual(dictionaryMisses,[],'All rendered translation keys must exist');
for(const wind of run('WINDS.map(x=>x[0])')){ctx.wind=wind;assert(run('nearbyBeaches(wind).length>0'));assert(run('nearbyBeaches(wind).every(b=>havKm([CONFIG.home.lat,CONFIG.home.lng],b.coords)<=75&&b.driveMin<=90)'))}
run('state.filters.maxDrive=0');assert(run('pgSpiagge()').includes('empty-state'));
const missing=[];function walk(x,p){if(!x||typeof x!=='object')return;if('it'in x)for(const l of ['it','en','de'])if(!x[l])missing.push(p+'.'+l);for(const [k,v]of Object.entries(x))walk(v,p+'.'+k)}
walk(run('({BEACHES,GEMS,ITINS,PERIODS,EVENTS,FOOD,GUIDE})'),'data');assert.deepEqual(missing,[]);
assert(fs.existsSync(path.join(root,'.nojekyll')));
const manifest=JSON.parse(read('manifest.webmanifest')),base=new URL('https://example.com/piccolabellavista-guida-ospiti/');
for(const target of [manifest.start_url,manifest.scope,manifest.id,...manifest.icons.map(x=>x.src)])assert(new URL(target,base).href.startsWith(base.href));
for(const file of ['js/app.js','js/data.js','js/i18n.js','js/editorial.js','js/guide.js','js/photos.js'])assert(!/\beval\s*\(|new Function\s*\(/.test(read(file)),file);
console.log(`PASS: ${rendered} route renders, ${details} detail panels, ${mapLinks} Maps links; aliases, restaurant filters, empty states, local assets, headings and complete language fields. Node only.`);
function check(html,label){
 assert(!/\b(undefined|null|NaN)\b/.test(html),label+' invalid value');
 assert(!html.includes(run('t("translation_pending")')),label+' missing translation');
 assert(!/QuantoBasta|Cala Regina/.test(html),label+' excluded venue');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const target=match[1].replaceAll('&amp;','&');
  if(target.startsWith('#')){const route=target.slice(1).split('?')[0];if(!['esplora','view'].includes(route)){ctx.targetRoute=route;assert(run('Object.hasOwn(ROUTES,targetRoute)||Object.hasOwn(ALIASES,targetRoute)'),label+' unknown '+route)}}
  else if(/^https?:/.test(target)){const u=new URL(target);if(u.hostname==='www.google.com'&&u.pathname.startsWith('/maps/')&&!u.searchParams.has('output')){assert.equal(u.searchParams.get('api'),'1');assert(u.searchParams.get('query')||u.searchParams.get('destination'));mapLinks++;}}
  else assert(fs.existsSync(path.join(root,target)),label+' missing '+target);
 }
}
