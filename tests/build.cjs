const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),temporary=fs.mkdtempSync(path.join(os.tmpdir(),'pbv-export-'));
try{
 const output=path.join(temporary,'site'),files=require('../scripts/build.cjs')(output);
 const worker=fs.readFileSync(path.join(output,'sw.js'),'utf8');
 const context={self:{registration:{scope:'https://example.com/piccolabellavista-guida-ospiti/'},addEventListener(){}},URL};
 vm.createContext(context);vm.runInContext(worker,context);
 for(const file of vm.runInContext('CORE',context))assert(fs.existsSync(path.join(output,file==='./'?'index.html':file)),file);
 for(const file of files)assert(fs.readFileSync(path.join(root,file)).equals(fs.readFileSync(path.join(output,file))),file);
 for(const file of ['README.md','PRIVATE_RELEASE_RUNBOOK.md','PHOTO_SELECTIONS.md','tests','scripts','.github','package.json'])assert(!fs.existsSync(path.join(output,file)),file);
 assert.throws(()=>require('../scripts/build.cjs')(output),/already exists/);
 console.log(`PASS: ${files.length} byte-identical guest assets; complete precache; development files excluded; existing output protected.`);
}finally{fs.rmSync(temporary,{recursive:true,force:true});}
