const fs=require("fs"),vm=require("vm"),assert=require("assert");
const root=fs.existsSync(__dirname+"/../dist/index.html")?__dirname+"/../dist/":__dirname+"/../";
for(const f of ["js/i18n.js","js/data.js","js/photos.js","js/app.js","sw.js"])new vm.Script(fs.readFileSync(root+f,"utf8"),{filename:f});
const node={classList:{contains:()=>false,add(){},remove(){}},focus(){},querySelectorAll:()=>[],style:{}};
const ctx=vm.createContext({console,URL,Intl,Date,Set,Map,TextEncoder,AbortSignal,localStorage:{getItem:()=>null},document:{documentElement:{},querySelector:()=>node,querySelectorAll:()=>[],addEventListener(){},activeElement:node},window:{addEventListener(){},scrollTo(){}},navigator:{onLine:true},location:{hash:"",protocol:"https:",hostname:"test.invalid"},setTimeout,clearTimeout});
let code=["js/i18n.js","js/data.js","js/photos.js"].map(f=>fs.readFileSync(root+f,"utf8")).join("\n");
code+="\n"+fs.readFileSync(root+"js/app.js","utf8").split("/* ---------- init ---------- */")[0];
code+=`
buildEventIndex();
const results=[];
for(const lang of ["it","en","de"]){LANG=lang;for(const [route,fn] of Object.entries(ROUTES)){state.route=route;const html=fn();if(typeof html!=="string"||!html.length||html.includes("undefined"))throw Error(lang+"/"+route+": invalid HTML");results.push(lang+"/"+route);}}
if(!pgHome().includes("welcome-photo"))throw Error("Missing home photo");
for(const id of ["poetto","porto_giunco","tuerredda"])if(!ART(id,"beach").includes("<img"))throw Error("Missing photo "+id);
if(ART("pelosa","beach")!=="")throw Error("Invented photo");
console.log("PASS: "+results.length+" route/language renders; photo mappings; JS syntax");
`;
vm.runInContext(code,ctx,{timeout:3000});
const index=fs.readFileSync(root+"index.html","utf8");
for(const m of index.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!/^https?:/.test(m[1]))assert(fs.existsSync(root+m[1]),"Missing "+m[1]);}
const manifest=JSON.parse(fs.readFileSync(root+"manifest.webmanifest","utf8"));for(const i of manifest.icons)assert(fs.existsSync(root+i.src));
console.log("PASS: local HTML asset references and PWA icons");
