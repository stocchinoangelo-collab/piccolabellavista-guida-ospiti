"use strict";
/* Piccolabellavista · V1.2 finale — interfaccia e logica (contenuti in js/data.js)
   Include: motore eventi CSV+fallback, hotfix audit V1.1.1, pgFonti() senza note interne. */

const $=s=>document.querySelector(s);
const storage={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let LANG=storage.get("pbv_lang")||"it";
if(!Object.hasOwn(I18N,LANG))LANG="it";
document.documentElement.lang=LANG;

/* ---------- helpers ---------- */
const L=o=>(o&&typeof o==="object")?(o[LANG]||o.it||Object.values(o)[0]||""):String(o==null?"":o);
const t=k=>(k in I18N[LANG])?I18N[LANG][k]:((k in I18N.it)?I18N.it[k]:k);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const stars=n=>{n=Math.max(0,Math.min(5,n|0));return "★".repeat(n)+"☆".repeat(5-n);};
const fmtDrive=m=>m<60?(m+" "+t("minutes")):(Math.floor(m/60)+" h"+(m%60?(" "+(m%60)):""));
const gmLink=c=>"https://www.google.com/maps/dir/?api=1&destination="+c[0]+","+c[1];
const safeUrl=u=>{const s=String(u||"").trim();return /^https?:\/\//i.test(s)?s:"";};
const windLabel=id=>({tramontana:"Tramontana",grecale:"Grecale",levante:"Levante",scirocco:"Scirocco",ostro:"Ostro",libeccio:"Libeccio",ponente:"Ponente",maestrale:"Maestrale"})[id]||id;
const GLYPH={beach:"🌊",archeo:"🏺",storia:"📜",natura:"🌿",borgo:"🏘️",eno:"🍷"};

const state={route:"home",filters:{cats:new Set(),maxDrive:999,crowd:0},apiWind:null,manualWind:null};

/* =====================================================================
   MOTORE EVENTI — CSV Google Sheet + fallback locale EVENTS
   ===================================================================== */
let EVENT_INDEX=[],csvEvents=[],eventSource="local",lastSync=null;
const CSVCFG=()=>(typeof CONFIG!=="undefined"&&CONFIG.eventsCsv)?CONFIG.eventsCsv:{url:"",enabled:false};

function startOfToday(){const d=new Date();d.setHours(0,0,0,0);return d;}

function parseISOorEU(s){
 if(!s)return null;s=String(s).trim();
 let m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
 if(m){const d=new Date(+m[1],+m[2]-1,+m[3]);return isNaN(d.getTime())?null:d;}
 m=s.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})$/);
 if(m){const d=new Date(+m[3],+m[2]-1,+m[1]);return isNaN(d.getTime())?null:d;}
 return null;}

function parseCSV(txt){
 try{
  txt=String(txt).replace(/^\uFEFF/,"");
  const rows=[];let cur=[],val="",q=false;
  for(let i=0;i<txt.length;i++){
   const c=txt[i];
   if(q){if(c==='"'){if(txt[i+1]==='"'){val+='"';i++;}else q=false;}else val+=c;}
   else{
    if(c==='"')q=true;
    else if(c===","){cur.push(val);val="";}
    else if(c==="\n"){cur.push(val);if(cur.length>1||cur[0].trim()!=="")rows.push(cur);cur=[];val="";}
    else if(c!=="\r")val+=c;
   }}
  cur.push(val);if(cur.length>1||cur[0].trim()!=="")rows.push(cur);
  if(!rows.length)return[];
  const head=rows.shift().map(h=>h.trim().toLowerCase());
  return rows.map(r=>{const o={};head.forEach((h,i)=>o[h]=String(r[i]==null?"":r[i]).trim());return o;});
 }catch(e){return[];}}

function havKm(a,b){
 const R=6371,tr=x=>x*Math.PI/180;
 const dLa=tr(b[0]-a[0]),dLo=tr(b[1]-a[1]);
 const h=Math.sin(dLa/2)**2+Math.cos(tr(a[0]))*Math.cos(tr(b[0]))*Math.sin(dLo/2)**2;
 return 2*R*Math.asin(Math.sqrt(h));}
const estDrive=c=>{try{return Math.max(5,Math.round(havKm([CONFIG.home.lat,CONFIG.home.lng],c)*1.25/55*60/5)*5);}catch(e){return null;}};

function csvToUnified(r){
 if(!r.id&&!r.nome)return null;
 const st=(r.stato||"").toLowerCase();
 if(st.includes("annull")||st.includes("cancel"))return null;
 const s=parseISOorEU(r.data_inizio),e2=parseISOorEU(r.data_fine);
 const months=(r.mesi||r.months||"").split(/[;,]/).map(x=>parseInt(x.trim(),10)).filter(x=>x>=1&&x<=12);
 if(!s&&!months.length)return null;
 const desc=r.descrizione||"";
 let coords=null;
 if(r.latitudine&&r.longitudine){
  const la=parseFloat(String(r.latitudine).replace(",",".")),lo=parseFloat(String(r.longitudine).replace(",","."));
  if(!isNaN(la)&&!isNaN(lo)&&Math.abs(la)<=90&&Math.abs(lo)<=180)coords=[la,lo];}
 return{
  id:String(r.id||"csv-"+String(r.nome||"x").toLowerCase().replace(/\W+/g,"-")),
  name:{it:r.nome,en:r.nome,de:r.nome},
  city:[r.comune,r.provincia].filter(Boolean).join(" · "),
  start:s,end:e2&&e2>s?e2:s,recurring:!s,months:months.length?months:null,
  dateNoteObj:null,cat:(r.categoria||"evento"),
  distMin:coords?estDrive(coords):null,
  coords,
  d:{it:r.lingua_it||desc,en:r.lingua_en||r.lingua_it||desc,de:r.lingua_de||r.lingua_it||desc},
  url:safeUrl(r.url_ufficiale),checked:r.checked||"",
  stato:(st&&st!=="confermato"&&st!=="confirmed")?st:"",source:"csv"};
}

function staticToUnified(e){
 return Object.assign({},e,{start:null,end:null,recurring:true,dateNoteObj:e.dateNote||null,coords:null,stato:"",source:"local"});
}

function buildEventIndex(){
 const cfg=CSVCFG(),useCsv=eventSource==="csv"&&csvEvents.length>0;
 let base=useCsv?(cfg.mode==="replace"?[]:EVENTS.map(staticToUnified)):EVENTS.map(staticToUnified);
 if(useCsv){
  const map=new Map(base.map(x=>[x.id,x]));
  for(const c of csvEvents)map.set(c.id,c);
  base=[...map.values()];
 }
 EVENT_INDEX=base.filter(x=>x.start||x.recurring);
}

async function loadEvents(){
 const cfg=CSVCFG();
 if(!cfg.enabled||!cfg.url)return;
 try{
  const ctrl=new AbortController();const tm=setTimeout(()=>ctrl.abort(),6000);
  const res=await fetch(cfg.url,{cache:"no-store",signal:ctrl.signal});
  clearTimeout(tm);
  if(!res.ok)throw new Error("http "+res.status);
  const txt=await res.text();
  const list=parseCSV(txt).map(csvToUnified).filter(Boolean);
  if(!list.length)throw new Error("no valid rows");
  csvEvents=list;eventSource="csv";lastSync=new Date();
  buildEventIndex();
  if(document.readyState==="complete"&&(state.route==="home"||state.route==="eventi"))render(true);
 }catch(e){eventSource="local";}
}

/* ---------- finestre temporali ---------- */
const evStartIn=x=>x.start?Math.round((x.start-startOfToday())/864e5):Infinity;
const evOngoing=x=>!!x.start&&x.start<=startOfToday()&&(x.end||x.start)>=startOfToday();
const evVisible=x=>!x.start||(x.end||x.start)>=startOfToday();
const evSorter=(a,b)=>{
 const da=a.start?a.start.getTime():9e15,db=b.start?b.start.getTime():9e15;
 return da-db||String(a.id).localeCompare(String(b.id));};
function recNextMonthDays(x){
 if(!x.months||!x.months.length)return 999;
 const cm=new Date().getMonth()+1;
 return Math.min(...x.months.map(m=>m===cm?0:(((m-cm)+12)%12)*30));}
const nextFixedIn=n=>EVENT_INDEX.filter(x=>(x.start&&evStartIn(x)>=0&&evStartIn(x)<=n)||evOngoing(x)).sort(evSorter);
function upcomingFixed(n){
 const dated=EVENT_INDEX.filter(x=>x.start&&evStartIn(x)>=0).sort(evSorter).slice(0,n);
 if(dated.length>=n)return dated;
 return dated.concat(EVENT_INDEX.filter(x=>!x.start&&evVisible(x))
  .sort((a,b)=>recNextMonthDays(a)-recNextMonthDays(b)).slice(0,n-dated.length));}
function monthOverlap(x){
 const now=new Date(),cm=now.getMonth(),cy=now.getFullYear();
 if(!x.start)return !!(x.months&&x.months.includes(cm+1));
 return x.start<=new Date(cy,cm+1,0)&&(x.end||x.start)>=new Date(cy,cm,1);}
const monthEvents=()=>EVENT_INDEX.filter(monthOverlap).sort(evSorter);

function fmtRange(s,e){
 try{
  const loc={it:"it-IT",en:"en-GB",de:"de-DE"}[LANG]||"it-IT";
  const ee=e||s,fY=new Intl.DateTimeFormat(loc,{year:"numeric"}),
        fDM=new Intl.DateTimeFormat(loc,{day:"numeric",month:"short"}),
        fD=new Intl.DateTimeFormat(loc,{day:"numeric"});
  const yr=fY.format(ee);
  if(s.getTime()===ee.getTime())return fDM.format(s)+" "+yr;
  const sm=s.getMonth()===ee.getMonth()&&s.getFullYear()===ee.getFullYear();
  return sm?fD.format(s)+"–"+fDM.format(ee)+" "+yr:fDM.format(s)+" – "+fDM.format(ee)+" "+yr;
 }catch(err){return "";}}

/* ---------- vento ---------- */
function degToWind(d){let best=WINDS[0][0],bd=360;for(const[id,deg]of WINDS){let x=Math.abs(deg-d);if(x>180)x=360-x;if(x<bd){bd=x;best=id}}return best}
async function fetchWind(){
 try{
  const u="https://api.open-meteo.com/v1/forecast?latitude="+CONFIG.home.lat+"&longitude="+CONFIG.home.lng+"&daily=weather_code,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,temperature_2m_max&timezone=Europe%2FRome&forecast_days=1";
  const j=await(await fetch(u,{cache:"no-store",signal:AbortSignal.timeout(6000)})).json();
  state.apiWind={speed:Math.round(j.daily.wind_speed_10m_max[0]),gust:Math.round(j.daily.wind_gusts_10m_max[0]),
   dir:degToWind(j.daily.wind_direction_10m_dominant[0]),temp:Math.round(j.daily.temperature_2m_max[0]),code:j.daily.weather_code[0]};
 }catch(e){state.apiWind=null}
}
const WX=c=>c===0?"wx_clear":c<3?"wx_partly":c===3?"wx_cloudy":(c===45||c===48)?"wx_fog":(c>=71&&c<=77)||c===85||c===86?"wx_snow":c>=95?"wx_storm":"wx_rain";
const season=()=>{const m=new Date().getMonth();return m<=1||m===11?"winter":m<=4?"spring":m<=7?"summer":"autumn"};
function windRanking(w){return BEACHES.slice().sort((a,b)=>((b.wind[w]||3)-(a.wind[w]||3))||(a.driveMin-b.driveMin)||(a.crowd-b.crowd));}
const activeWind=()=>state.manualWind||(state.apiWind&&state.apiWind.dir);

/* ---------- filtri ---------- */
function commonOk(p){
 if(state.filters.maxDrive!==999&&p.driveMin>state.filters.maxDrive)return false;
 if(state.filters.crowd===1&&p.crowd>3)return false;
 if(state.filters.crowd===2&&p.crowd>2)return false;
 if(state.filters.crowd===3&&!(p.tags&&p.tags.includes("hidden")))return false;
 return true;}
const PAGE_DOMAIN={spiagge:["spiaggia","mare"],perle:["archeo","storia","natura","borgo","eno","hidden"],borghi:["borgo"],natura:["natura"],storia:["archeo","storia"]};

function filterBar(){
 const CATS=["spiaggia","mare","archeo","storia","natura","borgo","eno","sagra","eventi","hidden"];
 const f=state.filters;
 return '<details class="filters"'+((f.cats.size||f.maxDrive!==999||f.crowd)?" open":"")+'><summary>⚙️ '+esc(t("f_title"))+"</summary>"+
 '<div class="fgroup"><h4>'+esc(t("f_what"))+'</h4><div class="pills">'+CATS.map(c=>'<label class="pill"><input type="checkbox" data-f="cat" value="'+c+'" '+(f.cats.has(c)?"checked":"")+'><span>'+esc(t("cat_"+c))+"</span></label>").join("")+"</div></div>"+
 '<div class="fgroup"><h4>'+esc(t("f_drive"))+'</h4><div class="pills">'+[[30,"d_30"],[60,"d_60"],[90,"d_90"],[120,"d_120"],[999,"d_all"]].map(x=>'<label class="pill"><input type="radio" name="fd" data-f="drive" value="'+x[0]+'" '+(f.maxDrive===x[0]?"checked":"")+'><span>'+esc(t(x[1]))+"</span></label>").join("")+"</div></div>"+
 '<div class="fgroup"><h4>'+esc(t("f_crowd"))+'</h4><div class="pills">'+[[0,"c_any"],[1,"c_low"],[2,"c_quiet"],[3,"c_hidden"]].map(x=>'<label class="pill"><input type="radio" name="fc" data-f="crowd" value="'+x[0]+'" '+(f.crowd===x[0]?"checked":"")+'><span>'+esc(t(x[1]))+"</span></label>").join("")+"</div></div></details>";
}
function domainNotice(route){
 const dom=PAGE_DOMAIN[route];if(!dom)return "";
 const c=state.filters.cats;if(!c.size)return "";
 if(dom.some(x=>c.has(x)))return "";
 return '<div class="notice warn">'+esc(t("f_no_match"))+' <button class="chip" data-reset>✕ '+esc(t("f_reset"))+"</button></div>";
}

/* ---------- blocchi riutilizzabili ---------- */
const ART=(id,g)=>photoMarkup(id);
function hydrateArts(){}

function card(p,kind){
 const badges=[];
 if(kind==="beach")badges.push('<span class="badge sea">🏖️ '+esc(t("cat_spiaggia"))+"</span>");
 else if(GLYPH[kind])badges.push('<span class="badge">'+GLYPH[kind]+" "+esc(t("cat_"+kind))+"</span>");
 if(p.tags&&p.tags.includes("hidden"))badges.push('<span class="badge sea">💎 '+esc(t("cat_hidden"))+"</span>");
 const sub=kind==="beach"?esc(L(p.type)):esc(L(p.place));
 return '<article class="card" data-open="'+esc(p.id)+'" tabindex="0" role="button">'+ART(p.id,GLYPH[kind]||"🌊")+
 '<div class="card__body"><h3>'+esc(p.name)+'</h3><div class="meta"><span>🚗 ~'+fmtDrive(p.driveMin)+"</span><span>👥 "+p.crowd+"/5</span></div>"+
 '<div style="display:flex;gap:.35rem;flex-wrap:wrap">'+badges.join("")+"</div>"+
 '<p style="font-size:.82rem;color:var(--ink-soft)">'+sub+"</p>"+
 '<p style="font-size:.9rem">'+esc(L(p.desc||p.why))+"</p>"+
 '<div class="card__foot"><a class="btn btn--map btn--sm" target="_blank" rel="noopener" href="'+gmLink(p.coords)+'">📍 '+esc(t("how"))+"</a></div></div></article>";
}
const grid=(arr,kind)=>'<div class="grid">'+arr.map(p=>card(p,kind==="auto"?(p._beach?"beach":p.cats[0]):kind)).join("")+"</div>";

function gemStoryCard(g){
 const kv=[["📍",L(g.place)],["⏱️","🚗 ~"+fmtDrive(g.driveMin)+" · 👥 "+g.crowd+"/5"],["🏛️",L(g.why)],["📜",L(g.curio)],["👀",L(g.see)],["🍷",L(g.taste)],["⭐",L(g.rec)]];
 return '<article class="card" data-open="'+esc(g.id)+'" tabindex="0" role="button"><div class="card__body">'+
 "<h3>"+(GLYPH[g.cats[0]]||"💎")+" "+esc(g.name)+"</h3>"+
 '<dl class="kv">'+kv.map(x=>"<dt>"+x[0]+"</dt><dd>"+esc(x[1])+"</dd>").join("")+"</dl>"+
 '<div class="card__foot"><a class="btn btn--map btn--sm" onclick="event.stopPropagation()" target="_blank" rel="noopener" href="'+gmLink(g.coords)+'">📍 '+esc(t("how"))+"</a>"+
 (g.link?'<a class="btn btn--ghost btn--sm" onclick="event.stopPropagation()" target="_blank" rel="noopener" href="'+safeUrl(g.link)+'">🔗 '+esc(t("src_site"))+"</a>":"")+
 "</div></div></article>";}

/* ---------- pagine ---------- */
async function renderToday(){
 const box=$("#today-box");if(!box)return;
 const w=activeWind();
 let head=w?
  '<div class="notice">🌬️ <b>'+esc(t("wind_today"))+": "+windLabel(w)+"</b>"+
  (state.apiWind?" ("+state.apiWind.speed+" km/h, max "+state.apiWind.temp+" °C)":"")+
  "<br><small>"+esc(t("wind_src"))+" · "+esc(t("wind_orient"))+": "+esc(t("wind_note"))+"</small></div>":
  '<div class="notice warn">'+esc(t("today_manual"))+'</div><div class="windpick">'+
  WINDS.map(x=>'<label class="pill"><input type="radio" name="mw" value="'+x[0]+'"><span>'+windLabel(x[0])+"</span></label>").join("")+"</div>";
 const picks=[];
 picks.push(["🌊 "+t("today_beach"),windRanking(w||"")[0]||BEACHES.slice().sort((a,b)=>a.driveMin-b.driveMin)[0],false]);
 const cult=GEMS.filter(g=>(g.cats.includes("archeo")||g.cats.includes("storia"))&&g.driveMin<=75).sort((a,b)=>a.crowd-b.crowd||a.driveMin-b.driveMin)[0];
 if(cult)picks.push(["🏺 "+t("today_culture"),cult,false]);
 const green=GEMS.filter(g=>(g.cats.includes("natura")||g.cats.includes("borgo"))&&g.driveMin<=50).sort((a,b)=>a.driveMin-b.driveMin)[0];
 if(green)picks.push(["🌿 "+t("today_green"),green,false]);
 const ev=nextFixedIn(7).find(x=>x.source==="csv");
 if(ev)picks.push(["🎭 "+t("today_event"),ev,true]);
 box.innerHTML=head+'<div class="grid">'+picks.map(p=>{
  const x=p[1],isEv=p[2];
  const dateTxt=isEv?(x.dateNoteObj?L(x.dateNoteObj):(x.start?fmtRange(x.start,x.end):"")):"";
  const meta=isEv?'<div class="meta"><span>📌 '+esc(x.city||"")+"</span>"+(dateTxt?"<span>🗓️ "+esc(dateTxt)+"</span>":"")+"</div>"
   :'<div class="meta"><span>🚗 ~'+fmtDrive(x.driveMin)+"</span><span>👥 "+x.crowd+"/5</span></div>";
  const txt='<p style="font-size:.87rem;color:var(--ink-soft)">'+esc(isEv?(L(x.d)||(x.dateNoteObj?L(x.dateNoteObj):"")):(L(x.desc||x.why)))+"</p>";
  const u=isEv?safeUrl(x.url):"";
  const btn=isEv?
   (u?'<a class="btn btn--ghost btn--sm" target="_blank" rel="noopener" href="'+esc(u)+'">🔗 '+esc(t("src_site"))+"</a>":"")
   :'<a class="btn btn--map btn--sm" target="_blank" rel="noopener" href="'+gmLink(x.coords)+'">'+esc(t("take_me"))+"</a>";
  const warn=isEv?'<small style="color:var(--terra-dk);font-size:.72rem">'+esc(t("ev_check"))+"</small>":"";
  return '<article class="card"><div class="card__body"><span class="badge sea">'+esc(p[0])+"</span><h3>"+esc(isEv?L(x.name):x.name)+"</h3>"+meta+txt+
   '<div class="card__foot">'+btn+warn+"</div></div></article>";}).join("")+
  '<p class="sub" style="margin-top:.9rem">'+esc(t("season_"+season()))+"</p>";
 box.querySelectorAll('[name="mw"]').forEach(r=>r.addEventListener("change",()=>{state.manualWind=r.value;render();}));
}

function pgSpiagge(){
 const c=state.filters.cats,dom=PAGE_DOMAIN.spiagge;
 let items=BEACHES.filter(commonOk);
 let extra="";
 if(c.size&&!dom.some(x=>c.has(x)))extra='<div class="notice warn">'+esc(t("f_no_match"))+' <button class="chip" data-reset>✕ '+esc(t("f_reset"))+'</button> · <a href="#eventi">'+esc(t("cat_sagra"))+" / "+esc(t("cat_eventi"))+" →</a></div>";
 return '<section class="hero"><span class="kicker">'+BEACHES.length+" · "+esc(t("wind_orient"))+"</span>"+
 '<h2 class="sec">🏖️ '+esc(t("nav_spiagge")).replace(/^\S+\s*/,"")+'</h2><p class="sub">'+esc(t("wind_note"))+"</p></section>"+
 filterBar()+extra+grid(items,"beach");
}
function pgVento(){
 const sel=activeWind(),ranked=sel?windRanking(sel):null;
 return '<section class="hero"><span class="kicker">🌬️</span><h2 class="sec">'+esc(t("vento_page_t"))+'</h2><p class="sub">'+esc(t("vento_page_s"))+"</p>"+
 '<div class="notice">'+(state.apiWind?"<b>"+esc(t("wind_today"))+":</b> "+windLabel(state.apiWind.dir)+" · "+state.apiWind.speed+" km/h (raffiche "+state.apiWind.gust+") · "+state.apiWind.temp+" °C<br><small>"+esc(t("wind_src"))+"</small>":esc(t("today_manual")))+"</div></section>"+
 '<div class="windpick">'+WINDS.map(x=>'<label class="pill"><input type="radio" name="vw" value="'+x[0]+'" '+(sel===x[0]?"checked":"")+'><span>'+windLabel(x[0])+"</span></label>").join("")+"</div>"+
 (ranked?'<h2 class="sec" style="margin:1.2rem 0 1rem">🏆 '+esc(t("vento_results"))+"</h2>"+grid(ranked.slice(0,6),"beach")+
 '<div class="notice"><b>'+esc(t("wind_orient"))+"</b><div class=\"windrow\" style=\"margin-top:.5rem\">"+
 ranked.slice(0,6).map(b=>"<span><b>"+esc(b.name)+"</b> <span class=\"stars\">"+stars(b.wind[sel]||3)+"</span></span>").join("")+
 '</div><small style="color:var(--ink-soft)">'+esc(t("wind_note"))+"</small></div>"
 :'<div class="notice warn">'+esc(t("vento_none"))+"</div>");
}
function gemListPage(fn,title,sub,route){
 let items=GEMS.filter(fn).filter(commonOk);
 const c=state.filters.cats,relevant=["archeo","storia","natura","borgo","eno"].filter(x=>c.has(x));
 if(relevant.length)items=items.filter(g=>relevant.some(x=>g.cats.includes(x)));
 return '<section class="hero"><span class="kicker">💎</span><h2 class="sec">'+esc(title)+'</h2><p class="sub">'+esc(sub)+"</p></section>"+domainNotice(route)+filterBar()+
 '<div class="grid">'+items.map(gemStoryCard).join("")+"</div>";}
/* ---------- EVENTI ---------- */
function evStatusBadge(e){
 if(!e.stato)return "";
 const map={"da_verificare":"st_check","da verificare":"st_check","posticipato":"st_postponed"};
 const k=map[e.stato];
 return '<span class="badge st-warn">'+esc(k?t(k):e.stato)+"</span>";}
function evCard(e){
 const dateTxt=e.dateNoteObj?L(e.dateNoteObj):(e.start?fmtRange(e.start,e.end):"");
 const ongoing=evOngoing(e)?' <span class="badge st-ok">'+esc(t("ev_ongoing"))+"</span>":"";
 const u=safeUrl(e.url);
 return '<article class="ev"><div class="ev__top"><h3>'+esc(L(e.name))+ongoing+"</h3>"+
 (dateTxt?'<span class="ev__date">'+esc(dateTxt)+"</span>":"")+"</div>"+
 (e.d&&L(e.d)?"<p>"+esc(L(e.d))+"</p>":"")+
 '<div class="ev__meta">'+
 (e.city?'<span>📌 '+esc(e.city)+"</span>":"")+
 (e.distMin?'<span>🚗 ~'+fmtDrive(e.distMin)+"</span>":"")+
 (e.cat?'<span>#'+esc(e.cat)+"</span>":"")+
 evStatusBadge(e)+
 (e.checked?'<span class="chk">✅ '+esc(t("ev_last_check"))+": "+esc(e.checked)+"</span>":"")+
 (u?'<a target="_blank" rel="noopener" href="'+esc(u)+'">🔗 '+esc(t("src_site"))+"</a>":"")+
 (e.coords?'<a target="_blank" rel="noopener" href="'+gmLink(e.coords)+'">📍 '+esc(t("how"))+"</a>":"")+
 "</div>"+
 (e.source==="local"?'<p style="font-size:.76rem;color:var(--terra-dk);margin-top:.4rem">'+esc(t("ev_check"))+"</p>":"")+
 "</article>";}

function updStamp(){
 if(eventSource==="csv"&&lastSync){
  const loc={it:"it-IT",en:"en-GB",de:"de-DE"}[LANG];
  let s='<div class="upd">🔄 '+esc(t("ev_updated"))+" "+lastSync.toLocaleDateString(loc)+" · "+
   lastSync.toLocaleTimeString(loc,{hour:"2-digit",minute:"2-digit"})+"</div>";
  const sn=CSVCFG().sourceName;
  if(sn&&L(sn))s+='<div class="upd">✅ '+esc(t("ev_source"))+": "+esc(L(sn))+"</div>";
  return s;}
 return '<div class="upd">🔄 '+esc(t("ev_verified"))+" "+esc(L(CONFIG.lastChecked))+"<br><small>"+esc(t("ev_local_list"))+"</small></div>";}

function pgEventi(){
 const confirmed=EVENT_INDEX.filter(e=>e.source==="csv"&&e.start&&evVisible(e)&&!e.stato);
 const traditions=EVENTS.filter(e=>e.id!=="timeinjazz").map(staticToUnified);
 return pageHeading("nav_eventi","events_intro")+
 '<section class="blk"><h2 class="sec">'+esc(t("confirmed_events"))+'</h2>'+
 (confirmed.length?confirmed.sort(evSorter).map(evCard).join(""):'<p class="sub">'+esc(t("no_confirmed_events"))+'</p>')+'</section>'+
 '<section class="blk"><h2 class="sec">'+esc(t("traditions"))+'</h2><p class="sub">'+esc(t("traditions_note"))+'</p>'+traditions.map(evCard).join("")+'</section>';
}

/* ---------- resto ---------- */
function pgItinerari(){
 const w=activeWind();
 let auto="";
 if(w){
  const top=windRanking(w).find(b=>b.driveMin<=120)||windRanking(w)[0];
  const near=GEMS.filter(g=>g.cats.includes("borgo")||g.cats.includes("natura")).sort((a,b)=>a.crowd-b.crowd||Math.abs(a.driveMin-top.driveMin)-Math.abs(b.driveMin-top.driveMin))[0];
  auto='<article class="itin"><h3 class="sec">🌬️ '+esc(t("itin_auto"))+" ("+windLabel(w)+')</h3><p class="sub" style="margin-top:.2rem">'+esc(t("itin_auto_gen"))+"</p><ol>"+
  '<li><b>'+esc(t("ph_morning"))+'</b><span>'+esc(top.name)+" — "+esc(t("wind_prot"))+" "+windLabel(w)+': <span class="stars">'+stars(top.wind[w]||3)+"</span></span></li>"+
  '<li><b>'+esc(t("ph_lunch"))+"</b><span>"+esc(t("itin_eat"))+"</span></li>"+
  '<li><b>'+esc(t("ph_afternoon"))+"</b><span>"+esc(near?near.name:"")+"</span></li>"+
  '<li><b>'+esc(t("ph_sunset"))+"</b><span>"+esc(t("itin_view"))+"</span></li></ol>"+
  '<div style="margin-top:.8rem"><a class="btn btn--map btn--sm" target="_blank" rel="noopener" href="'+gmLink(top.coords)+'">'+esc(t("take_me"))+"</a></div></article>";}
 return '<section class="hero"><span class="kicker">🚗</span><h2 class="sec">'+esc(t("itin_t"))+'</h2><p class="sub">'+esc(t("itin_s"))+"</p></section>"+auto+
 ITINS.filter(i=>!i.auto).map(i=>'<article class="itin"><h3 class="sec">'+i.ic+" "+esc(L(i.name))+"</h3><ol>"+
 i.steps.map(st=>"<li><b>"+esc(L(st[0]))+"</b><span>"+esc(L(st[1]))+"</span></li>").join("")+"</ol></article>").join("");}
function pgMappa(){return '<section class="hero"><span class="kicker">📍</span><h2 class="sec">'+esc(t("map_t"))+'</h2><p class="sub">'+esc(t("map_s"))+"</p></section>"+
 '<iframe title="map" style="width:100%;height:min(60vh,420px);border:0;border-radius:var(--r)" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Pirri%2C%20Cagliari&z=11&output=embed"></iframe>'+
 '<section class="blk"><h2 class="sec">'+esc(t("idx_beaches"))+'</h2><div class="tl__links">'+BEACHES.map(p=>'<a class="chip" target="_blank" rel="noopener" href="'+gmLink(p.coords)+'">'+esc(p.name)+" ↗</a>").join("")+"</div>"+
 '<h2 class="sec" style="margin-top:1.4rem">'+esc(t("idx_places"))+'</h2><div class="tl__links">'+GEMS.map(p=>'<a class="chip" target="_blank" rel="noopener" href="'+gmLink(p.coords)+'">'+esc(p.name)+" ↗</a>").join("")+"</div></section>";}

/* Fonti: solo contenuti per l'ospite — nessuna nota di manutenzione interna (R5b) */
/* ---------- scheda dettaglio ---------- */
function openSheet(id){
 const b=BEACHES.find(x=>x.id===id)||GEMS.find(x=>x.id===id);
 if(!b)return;
 const isB=!b.cats;
 let html=ART(b.id,isB?"beach":(GLYPH[b.cats[0]]||"💎"));
 html+="<h2 style=\"font-family:var(--serif);margin-top:1rem\">"+esc(b.name)+"</h2>";
 html+='<p class="sub">'+(isB?esc(L(b.type))+" · "+esc(b.facing):esc(L(b.place)))+" · 🚗 ~"+fmtDrive(b.driveMin)+(b.driveKm?(" · ≈"+b.driveKm+" km"):"")+" · 👥 "+b.crowd+"/5</p>";
 if(isB){
  html+='<div class="notice"><b>'+esc(t("wind_orient"))+'</b><div class="windrow" style="margin-top:.5rem">'+
  WINDS.map(x=>"<span><b>"+windLabel(x[0])+'</b> <span class="stars">'+stars(b.wind[x[0]])+"</span></span>").join("")+"</div></div>";
  const rows=[[t("type_lbl"),L(b.type)],[t("period_lbl"),b.best],[t("parking"),L(b.parking)],[t("services"),L(b.services)],[t("access"),L(b.access)],[t("food_lbl"),L(b.food)],[t("trails"),L(b.trails)],[t("facing"),b.facing]];
  html+='<dl class="kv">'+rows.map(r=>"<dt>"+esc(r[0])+"</dt><dd>"+esc(r[1])+"</dd>").join("")+"</dl>";
  html+='<p style="font-size:.95rem">'+esc(L(b.desc))+"</p>";
  html+='<p style="margin-top:.6rem"><b>✅ '+esc(t("when_go"))+":</b> "+esc(L(b.go))+"<br><b>⛔ "+esc(t("when_avoid"))+":</b> "+esc(L(b.avoid))+"</p>";
  if(["pelosa","la_pelosa","cala_brandinchi","tuerredda","punta_molentis","porto_giunco"].includes(b.id))html+='<div class="notice">'+esc(t("check_access"))+'</div>';
 }else{
  html+='<dl class="kv"><dt>'+esc(t("dist_lbl"))+"</dt><dd>🚗 ~"+fmtDrive(b.driveMin)+"</dd></dl>";
  html+='<dl class="kv">'+[["🏛️",L(b.why)],["📜",L(b.curio)],["👀",L(b.see)],["🍷",L(b.taste)],["⭐",L(b.rec)]].map(r=>"<dt>"+r[0]+"</dt><dd>"+esc(r[1])+"</dd>").join("")+"</dl>";
 }
 html+='<div class="notice" style="font-size:.8rem;margin-top:1rem">⏱️ '+esc(t("drive_note"))+"</div>";
 html+='<div style="display:flex;gap:.6rem;margin-top:1.2rem;flex-wrap:wrap">'+
 '<a class="btn btn--map" target="_blank" rel="noopener" href="'+gmLink(b.coords)+'">'+esc(t("take_me"))+"</a>"+
 (b.link?'<a class="btn btn--ghost" target="_blank" rel="noopener" href="'+safeUrl(b.link)+'">🔗 '+esc(t("src_site"))+"</a>":"")+"</div>";
 $("#sheet-content").innerHTML=html;
 sheetReturnFocus=document.activeElement; $("#sheet").classList.add("open");document.body.style.overflow="hidden";$("#sheet-x").focus();}
let sheetReturnFocus=null;
function closeSheet(){const wasOpen=$("#sheet").classList.contains("open");$("#sheet").classList.remove("open");document.body.style.overflow="";if(wasOpen&&sheetReturnFocus?.isConnected)sheetReturnFocus.focus();}

/* ---------- router ---------- */
const ROUTES={home:pgHome,casa:pgCasa,mangiare:pgMangiare,aperitivi:pgAperitivi,senzaauto:pgSenzaAuto,utili:pgUtili,spiagge:pgSpiagge,vento:pgVento,storia:pgStoria,sapori:pgSapori,eventi:pgEventi,itinerari:pgItinerari,mappa:pgMappa,fonti:pgFonti,
 perle:()=>gemListPage(()=>true,t("perle_t"),t("perle_s"),"perle"),
 borghi:()=>gemListPage(g=>g.cats.includes("borgo"),t("borgo_t"),t("borgo_s"),"borghi"),
 natura:()=>gemListPage(g=>g.cats.includes("natura"),t("nat_t"),t("nat_s"),"natura")};
function render(keepScroll){
 const y=window.scrollY;
 const primary=['home','itinerari','mangiare','spiagge','senzaauto','utili'];
 const menuLink=r=>'<a href="#'+r+'"'+(state.route===r?' class="on" aria-current="page"':'')+'>'+esc(t('nav_'+r))+'</a>';
 $("#menu").innerHTML=primary.map(menuLink).join('')+'<details class="menu-more"'+(!primary.includes(state.route)?' open':'')+'><summary>'+esc(t('all_sections'))+'</summary><div class="menu-secondary">'+Object.keys(ROUTES).filter(r=>!primary.includes(r)).map(menuLink).join('')+'</div></details>';
 closeSheet();
 const fn=ROUTES[state.route]||pgHome;
 $("#view").innerHTML=fn();
 bindGlobal($("#view"));
 const explore=$("[data-explore]");if(explore)explore.addEventListener("click",e=>{e.preventDefault();$("#esplora").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});});
 hydrateArts($("#view"));
 if(state.route==="home")renderToday();
 window.scrollTo({top:keepScroll?y:0});
}
function bindGlobal(root){
 root.querySelectorAll("[data-f]").forEach(inp=>inp.addEventListener("change",()=>{
  const f=state.filters;
  if(inp.dataset.f==="cat"){inp.checked?f.cats.add(inp.value):f.cats.delete(inp.value);}
  if(inp.dataset.f==="drive")f.maxDrive=+inp.value;
  if(inp.dataset.f==="crowd")f.crowd=+inp.value;
  render(true);}));
 root.querySelectorAll("[data-reset]").forEach(b=>b.addEventListener("click",()=>{state.filters={cats:new Set(),maxDrive:999,crowd:0};render(true);}));
 root.querySelectorAll('[name="vw"]').forEach(r=>r.addEventListener("change",()=>{state.manualWind=r.value;render();}));
 root.querySelectorAll("[data-open]").forEach(el=>{
  el.addEventListener("click",e=>{if(e.target.closest("a"))return;openSheet(el.dataset.open);});
  el.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&!e.target.closest("a")){e.preventDefault();openSheet(el.dataset.open);}});});
}

/* ---------- testi statici + gate opzionale ---------- */
function applyStaticTexts(){
 document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n);});
 document.title=t("doc_title"); $("#menu").setAttribute("aria-label",t("navigation")); $("#sheet").setAttribute("aria-label",t("open_card")); $("#sheet-x").setAttribute("aria-label",t("close")); $("#burger").setAttribute("aria-label",t("navigation")); document.querySelectorAll(".langs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.lang===LANG));}
async function sha256(s){
 const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));
 return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");}
async function initGate(){
 if(!CONFIG.gate.enabled){$("#gate").remove();return;}
 if(storage.get("pbv_ok")==="1"){$("#gate").remove();return;}
 $("#gate").classList.remove("hidden");$("#gate-pass").focus();
 const check=async()=>{
  try{
   if(await sha256($("#gate-pass").value)===CONFIG.gate.passSha256){storage.set("pbv_ok","1");$("#gate").remove();}
   else $("#gate-err").classList.remove("hidden");
  }catch(e){$("#gate-err").classList.remove("hidden");}};
 $("#gate-btn").addEventListener("click",check);
 $("#gate-pass").addEventListener("keydown",e=>{if(e.key==="Enter")check();});}

/* ---------- init ---------- */
(async function init(){
 applyStaticTexts();
 const lb=document.querySelector('.langs button[data-lang="'+LANG+'"]');if(lb)lb.classList.add("on");
 await initGate();
 buildEventIndex();
 const lp=loadEvents();
 await Promise.race([lp,new Promise(r=>setTimeout(r,3000))]);
 fetchWind().then(()=>{if(state.route==="home")renderToday();});
 state.route=(location.hash.replace("#","")||"home");
 render();
 if("serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))
  navigator.serviceWorker.register("sw.js").catch(()=>{});
})();

window.addEventListener("hashchange",()=>{const hash=location.hash.slice(1);if(hash==="view"||hash==="esplora")return;state.route=Object.hasOwn(ROUTES,hash)?hash:"home";render();});
document.querySelectorAll(".langs button").forEach(b=>b.addEventListener("click",()=>{
 LANG=b.dataset.lang;storage.set("pbv_lang",LANG);document.documentElement.lang=LANG;
 document.querySelectorAll(".langs button").forEach(x=>x.classList.toggle("on",x===b));
 applyStaticTexts();render();}));
const burger=$("#burger"),menu=$("#menu"),scrim=$("#scrim");
burger.addEventListener("click",()=>{menu.classList.toggle("open");scrim.classList.toggle("open");menu.inert=!menu.classList.contains("open");burger.setAttribute("aria-expanded",menu.classList.contains("open"));});
scrim.addEventListener("click",()=>{menu.classList.remove("open");scrim.classList.remove("open");burger.setAttribute("aria-expanded","false");menu.inert=window.matchMedia("(max-width:719px)").matches;});
menu.addEventListener("click",e=>{if(e.target.closest("a")){menu.classList.remove("open");scrim.classList.remove("open");burger.setAttribute("aria-expanded","false");menu.inert=window.matchMedia("(max-width:719px)").matches;}});
$("#sheet-x").addEventListener("click",closeSheet);
$("#sheet-backdrop").addEventListener("click",closeSheet);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet();});

function syncMenu(){menu.inert=window.matchMedia("(max-width:719px)").matches&&!menu.classList.contains("open");}
syncMenu();window.addEventListener("resize",syncMenu);
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&menu.classList.contains("open")){menu.classList.remove("open");scrim.classList.remove("open");burger.setAttribute("aria-expanded","false");syncMenu();burger.focus();}
 const dialog=$("#sheet.open")||$("#gate:not(.hidden)");
 if(e.key!=="Tab"||!dialog)return;
 const focusable=[...dialog.querySelectorAll('a[href],button,input,[tabindex="0"]')].filter(el=>el.offsetParent!==null);
 const first=focusable[0],last=focusable.at(-1);
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
 if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});

if("serviceWorker" in navigator){const hadController=!!navigator.serviceWorker.controller;let reloading=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(hadController&&!reloading){reloading=true;location.reload();}});}
