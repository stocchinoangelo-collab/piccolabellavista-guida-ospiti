const {chromium}=require('playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({headless:true});const results=[];fs.mkdirSync('artifacts',{recursive:true});
for(const [label,width,height] of [['mobile',390,844],['tablet',768,1024],['desktop',1440,1000]]){
 const c=await b.newContext({viewport:{width,height}});const p=await c.newPage();p.setDefaultTimeout(15000);let errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await p.goto('http://localhost:4173/#ospedali');await p.locator('main h1').waitFor();
 for(const lang of ['it','en','de']){
 await p.locator('[data-lang="'+lang+'"]').click();assert.equal(await p.locator('html').getAttribute('lang'),lang);assert.equal(await p.locator('main h1').count(),1);assert.equal(await p.locator('main a[href^="tel:"]').count(),7);assert.equal(await p.locator('main a[href="https://wa.me/393931104422"]').count(),1);
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+label+lang);
 const links=await p.locator('main a').evaluateAll(aa=>aa.map(a=>({href:a.href,text:a.textContent})));assert(links.every(a=>a.text.trim()&&/^(https:|tel:)/.test(a.href)));assert(!/undefined|hospital_|nav_ospedali/.test(await p.locator('main').innerText()));
 await p.screenshot({path:'artifacts/hospitals-'+label+'-'+lang+'.png',fullPage:true});results.push(label+'/'+lang+': layout, content, 15 links, no overflow PASS');
 }
 await p.locator('[data-lang="it"]').click();if(width<720)await p.locator('#burger').click();await p.locator('#menu a[href="#ospedali"]').focus();await p.keyboard.press('Enter');
 await p.locator('main a').first().focus();for(let i=0;i<15;i++){assert(await p.evaluate(()=>document.activeElement.tagName==='A'));assert(await p.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'));await p.keyboard.press('Tab');}
 await p.evaluate(()=>navigator.serviceWorker.ready);await p.reload();await p.waitForFunction(()=>navigator.serviceWorker.controller);
 await c.setOffline(true);await p.locator('[data-lang="de"]').click();assert.equal(await p.locator('html').getAttribute('lang'),'de');const response=await p.reload();assert.equal(response.status(),503);assert((await p.locator('body').innerText()).includes('Connessione necessaria'));
 await c.setOffline(false);const restored=await p.reload();assert.equal(restored.status(),200);await p.locator('main h1').waitFor();assert.equal(await p.locator('main h1').count(),1);
 // Offline 503 is expected and excluded from online console checks.
 errors=errors.filter(e=>!e.includes('503'));assert.deepEqual(errors,[]);results.push(label+': keyboard, online/offline/reconnect, console PASS');await c.close();
}await b.close();console.log(results.join('\n'));fs.writeFileSync('artifacts/hospitals-browser-results.txt',results.join('\n'));})().catch(e=>{console.error(e);process.exit(1)});
