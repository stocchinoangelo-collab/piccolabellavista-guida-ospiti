const fs=require("fs"),vm=require("vm"),assert=require("assert");
const root=fs.existsSync(__dirname+"/../dist/index.html")?__dirname+"/../dist/":__dirname+"/../";
const elements=new Map(),listeners={};
function element(id=""){
 if(elements.has(id))return elements.get(id);
 const attrs={};const el={id,innerHTML:"",textContent:"",value:"",hidden:false,style:{},dataset:{},isConnected:true,
 classList:{add(){},remove(){},toggle(){},contains:()=>false},addEventListener(){},removeEventListener(){},
 setAttribute(k,v){attrs[k]=v},getAttribute(k){return attrs[k]??"true"},removeAttribute(k){delete attrs[k]},
 querySelector(s){return element(id+" "+s)},querySelectorAll:()=>[],focus(){},appendChild(){},
 insertAdjacentHTML(_pos,html){this.innerHTML=html+this.innerHTML},remove(){},closest:()=>null};
 elements.set(id,el);return el;
}
const document={documentElement:{},body:element("body"),activeElement:element("button"),querySelector:element,
 querySelectorAll:()=>[],getElementById:id=>element("#"+id),createElement:()=>element("created"),
 addEventListener(k,fn){listeners[k]=fn}};
const sandbox={console,document,location:{hash:"#home"},navigator:{onLine:true},URL,URLSearchParams,Intl,Date,Map,Set,AbortSignal,
 localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0,clearTimeout(){},fetch:()=>Promise.reject(Error("Offline simulation"))};
sandbox.window={addEventListener(){},scrollTo(){},scrollY:0};
const ctx=vm.createContext(sandbox);
for(const f of ["js/i18n.js","js/data.js","js/photos.js","js/app.js"]){
 const code=fs.readFileSync(root+f,"utf8");new vm.Script(code,{filename:f}).runInContext(ctx);
}
const routes=["home","spiagge","cagliari","mangiare","enogastronomia","casa","muoversi","info","vento","fonti","eventi"];
let count=0;
for(const lang of ["it","en","de"]){
 vm.runInContext("currentLang="+JSON.stringify(lang),ctx);
 for(const route of routes){
 sandbox.location.hash="#"+route;sandbox.window.App.renderCurrent();
 const html=element("#view").innerHTML;
 assert(html.length>100,lang+"/"+route+": empty");
 assert(!html.includes("undefined"),lang+"/"+route+": undefined field");
 assert(!/src="(?:null|undefined|)"/.test(html),lang+"/"+route+": invalid image URL");
 count++;
 }
}
sandbox.location.hash="#mangiare?type=sardinian";sandbox.window.App.renderCurrent();
assert(element("#view").innerHTML.includes("rest-list"),"Restaurant filter route broken");
const data=vm.runInContext("DATA",ctx);
assert(!("password" in data)&&!("password" in data.casa.wifi),"Template credentials persisted");
for(const x of data.spiagge){sandbox.window.App.openBeach(x.id);assert(element("#sheet-content").innerHTML.length>50);}
for(const x of data.archeologia){sandbox.window.App.openArcheo(x.id);assert(!element("#sheet-content").innerHTML.includes("undefined"));}
for(const pool of [["evento",data.eventi],["sagra",data.sagre]])for(const x of pool[1])sandbox.window.App.openEvento(pool[0],x.id);
for(const p of data.casa.gallery)assert(fs.existsSync(root+p.image),"Missing apartment image "+p.image);
const index=fs.readFileSync(root+"index.html","utf8");
for(const m of index.matchAll(/(?:src|href)="([^"#]+)"/g))if(!/^https?:/.test(m[1]))assert(fs.existsSync(root+m[1]),"Missing "+m[1]);
const manifest=JSON.parse(fs.readFileSync(root+"manifest.webmanifest","utf8"));for(const i of manifest.icons)assert(fs.existsSync(root+i.src));
new vm.Script(fs.readFileSync(root+"sw.js","utf8"),{filename:"sw.js"});
assert(!index.includes('id="gate"'),"Client password gate still present");
console.log("PASS: "+count+" route/language renderings, detail panels and restaurant filter");
console.log("PASS: four local apartment photos, local assets, PWA icons and JS syntax");
console.log("PASS: template credentials removed; private host controls access");
