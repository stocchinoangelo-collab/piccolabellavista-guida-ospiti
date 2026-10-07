const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let instant='2026-10-07T17:36:00Z';
class Clock extends Date {constructor(...args){super(...(args.length?args:[instant]));} static now(){return new Date(instant).getTime();}}
const ctx={document:{documentElement:{}},localStorage:{getItem:()=>null},console,URL,Date:Clock,Set,Map,Intl};
vm.createContext(ctx);
for(const file of ['js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js']){
 let src=fs.readFileSync(path.join(root,file),'utf8');
 if(file==='js/app.js')src=src.split('/* ---------- init ---------- */')[0];
 vm.runInContext(src,ctx);
}
const run=s=>vm.runInContext(s,ctx);
run('buildEventIndex()');
for(const lang of ['it','en','de']){
 run(`LANG='${lang}'`);
 const html=run('pgEventi()');
 assert(!html.includes('Forma e Poesia')&&!html.includes('Salt Harvest Festival'),'Expired October 3–4 events removed');
 assert(html.includes('07/10/2026')||html.includes('07.10.2026'));
 const confirmed=html.split(run('t("pending_events")'))[0];
 assert(!confirmed.includes('Gesico')&&!confirmed.includes('Vallermosa'),'Incomplete programmes separate from confirmed events');
 for(const selector of ['nextFixedIn(30)','upcomingFixed(10)','monthEvents()'])assert(!run(`${selector}.some(e=>e.stato)`),'Pending entries never become automatic recommendations');
}
run("LANG='it'");
instant='2026-10-11T21:59:00Z'; // 23:59 in Cagliari: final festival day still visible.
assert(run('pgEventi()').includes('Festival Selvatica'));
assert(run('upcomingFixed(10).some(e=>e.id==="selvatica-cagliari-2026")'),'An ongoing event remains in upcoming picks');
instant='2026-10-11T22:00:00Z'; // Midnight in Cagliari, even when the device is overseas.
assert(!run('pgEventi()').includes('Festival Selvatica'));
assert(!run('monthEvents().some(e=>e.id==="selvatica-cagliari-2026")'));
instant='2026-10-18T22:00:00Z';
assert(!run('pgEventi()').includes('Creative Corner'));
assert(!run('pgEventi()').includes('Gesico'));
assert(!run('pgEventi()').includes('Vallermosa'));
// Wine Not? ends after midnight on the day Italy returns to standard time.
for(const now of ['2026-10-24T22:30:00Z','2026-10-25T00:30:00Z','2026-10-25T01:30:00Z','2026-10-25T02:59:59Z']){
 instant=now;
 assert(run('pgEventi()').includes('Wine Not?'),'Overnight event remains visible until 04:00 in Cagliari');
 assert(run('evOngoing(EVENT_INDEX.find(e=>e.id==="wine-not-2026"))'));
}
instant='2026-10-25T03:00:00Z'; // 04:00 CET: hide at the actual closing time.
assert(!run('pgEventi()').includes('Wine Not?'));
for(const selector of ['nextFixedIn(30)','upcomingFixed(10)','monthEvents()'])assert(!run(`${selector}.some(e=>e.id==="wine-not-2026")`),'Finished overnight event excluded from all suggestions');
instant='2026-11-01T12:00:00Z';
assert(!run('pgEventi()').includes('Wine Not?'));
assert(run('pgEventi()').includes(run('t("no_confirmed_events")')));
console.log('PASS: event expiry at Cagliari midnight; ongoing events; pending programmes excluded from suggestions; IT/EN/DE; expired data removed.');
