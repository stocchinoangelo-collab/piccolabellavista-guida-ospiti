const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let source=fs.readFileSync(path.join(root,'functions/_middleware.js'),'utf8');
source=source.replace('export async function onRequest','async function onRequest')+'\nthis.__onRequest=onRequest;';
const context={URL,Request,Response,Headers,FormData,TextEncoder,Uint8Array,Date,Number,String,Array,Object,Math,crypto:require('node:crypto').webcrypto,console};
vm.createContext(context);vm.runInContext(source,context,{filename:'functions/_middleware.js'});
const onRequest=context.__onRequest;
const env={GUEST_PIN:'84621739',SESSION_SECRET:'test-session-secret-please-change-1234567890',GUEST_SESSION_HOURS:'1'};
const next=async()=>new Response('PRIVATE GUIDE',{status:200,headers:{'Content-Type':'text/plain'}});

(async()=>{
 let r=await onRequest({request:new Request('https://guide.example/index.html',{headers:{Accept:'text/html'}}),env,next});
 assert.equal(r.status,302);assert(r.headers.get('location').startsWith('/_guest-login?next='));

 r=await onRequest({request:new Request('https://guide.example/js/app.js'),env,next});
 assert.equal(r.status,401);

 r=await onRequest({request:new Request('https://guide.example/',{headers:{Accept:'text/html'}}),env:{GUEST_PIN:'x',SESSION_SECRET:'short'},next});
 assert.equal(r.status,503);

 r=await onRequest({request:new Request('https://guide.example/_guest-login?next=%2F',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'code=wrong&next=%2F'}),env,next});
 assert.equal(r.status,401);assert.equal(r.headers.get('set-cookie'),null);

 r=await onRequest({request:new Request('https://guide.example/_guest-login?next=%2F',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'code=84621739&next=%2F'}),env,next});
 assert.equal(r.status,303);assert.equal(r.headers.get('location'),'/');
 const setCookie=r.headers.get('set-cookie');assert(setCookie&&setCookie.includes('__Host-pbv_guest=')&&setCookie.includes('HttpOnly')&&setCookie.includes('Secure'));
 const cookie=setCookie.split(';')[0];

 r=await onRequest({request:new Request('https://guide.example/js/app.js',{headers:{Cookie:cookie}}),env,next});
 assert.equal(r.status,200);assert.equal(await r.text(),'PRIVATE GUIDE');assert.equal(r.headers.get('cache-control'),'no-store');

 const tampered=cookie.replace(/.$/,'0');
 r=await onRequest({request:new Request('https://guide.example/',{headers:{Accept:'text/html',Cookie:tampered}}),env,next});
 assert.equal(r.status,302);

 r=await onRequest({request:new Request('https://guide.example/_guest-login?next=https%3A%2F%2Fevil.example',{method:'GET'}),env,next});
 assert.equal(r.status,200);assert((await r.text()).includes('name="next" value="/"'));

 r=await onRequest({request:new Request('https://guide.example/_guest-logout',{headers:{Cookie:cookie}}),env,next});
 assert.equal(r.status,303);assert(r.headers.get('set-cookie').includes('Max-Age=0'));

 console.log('PASS: guest PIN middleware fail-closed, login, signed HttpOnly session, tamper rejection, safe redirect, logout.');
})().catch(e=>{console.error(e);process.exitCode=1});
