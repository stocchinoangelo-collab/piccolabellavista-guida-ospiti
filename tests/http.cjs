const {spawn}=require('node:child_process'),path=require('node:path'),fs=require('node:fs'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),base='/piccolabellavista-guida-ospiti/';
const child=spawn(process.execPath,[path.join(root,'scripts/serve.cjs'),'--port','4187','--base',base],{stdio:['ignore','pipe','inherit']});
child.on('error',e=>{console.error(e);process.exitCode=1});
child.stdout.once('data',async()=>{
 try{
 const files=['','index.html','css/style.css','css/boutique.css','css/release.css',...['app','data','i18n','guide','photos','editorial'].map(x=>'js/'+x+'.js'),'sw.js','manifest.webmanifest','img/casa/bagno.jpg'];
 for(const f of files){const r=await fetch('http://127.0.0.1:4187'+base+f);assert.equal(r.status,200,f);assert.deepEqual(Buffer.from(await r.arrayBuffer()),fs.readFileSync(path.join(root,f||'index.html')));if(f.endsWith('.js'))assert(r.headers.get('content-type').includes('javascript'));}
 assert.equal((await fetch('http://127.0.0.1:4187'+base+'missing.js')).status,404);
 console.log(`PASS: ${files.length} assets served byte-for-byte under ${base}, JS MIME types and missing-asset 404. Local HTTP server only.`);
 }catch(e){console.error(e);process.exitCode=1}finally{child.kill()}
});
