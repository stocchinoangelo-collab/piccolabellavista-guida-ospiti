/* Executes the complete startup script in a minimal DOM double; not a browser. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),nodes=new Map(),events={};let focused;
function node(id){
 if(!nodes.has(id)){const classes=new Set(),attributes={};nodes.set(id,{id,innerHTML:'',dataset:{},style:{},hidden:false,inert:false,isConnected:true,
 classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k),toggle(k,on){if(on===undefined)on=!classes.has(k);on?classes.add(k):classes.delete(k)}},
 setAttribute:(k,v)=>attributes[k]=v,removeAttribute:k=>delete attributes[k],getAttribute:k=>attributes[k],
 addEventListener(k,f){events[id+':'+k]=f},querySelector:node,querySelectorAll:()=>[],focus(){focused=this},remove(){this.isConnected=false},contains(el){return el===this},scrollIntoView(){}})}return nodes.get(id);
}
const document={documentElement:{},body:node('body'),querySelector:node,querySelectorAll:()=>[],get activeElement(){return focused},addEventListener(k,f){events['document:'+k]=f}};
const ctx={document,window:{scrollY:0,scrollTo(){},matchMedia:()=>({matches:false}),addEventListener(k,f){events['window:'+k]=f}},navigator:{onLine:true},location:{hash:'#cagliari',protocol:'https:'},localStorage:{getItem:()=>null,setItem(){}},console,URL,URLSearchParams,Date,Intl,Set,Map,AbortSignal,AbortController,TextEncoder,setTimeout,clearTimeout,fetch:async()=>{throw Error('offline fixture')}};
vm.createContext(ctx);
for(const name of ['i18n','data','guide','photos','editorial','app'])vm.runInContext(fs.readFileSync(path.join(root,'js/'+name+'.js'),'utf8'),ctx,{filename:name+'.js'});
setImmediate(()=>{
 try{
 assert(node('#view').innerHTML.includes('Cagliari'));assert(node('#bottom-nav').innerHTML.includes('#casa'));
 assert(node('#connection-status').textContent.includes('non confermato'));
 ctx.location.hash='#enogastronomia';events['window:hashchange']();assert(node('#view').innerHTML.includes('food-grid'));
 vm.runInContext('openSheet("poetto")',ctx);assert(node('#sheet').classList.contains('open'));assert(node('#view').inert);
 vm.runInContext('closeSheet()',ctx);assert(!node('#sheet').classList.contains('open'));assert(!node('#view').inert);
 console.log('PASS: complete startup, route transition, bottom navigation, offline failure notice and dialog inert state. DOM double only.');
 }catch(e){console.error(e);process.exitCode=1}
});
