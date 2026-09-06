/* Dependency-free local static server. Production remains plain static hosting. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const arg=(name,fallback)=>{const i=process.argv.indexOf(name);return i<0?fallback:process.argv[i+1]};
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'};
http.createServer((req,res)=>{
 let requested;try{requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end()}
 if(requested.split('/').some(p=>p.startsWith('.'))){res.writeHead(403);return res.end()}
 const file=path.resolve(root,'.'+(requested.endsWith('/')?requested+'index.html':requested));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
 fs.readFile(file,(err,body)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'text/plain; charset=utf-8','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:body)});
}).listen(Number(arg('--port',4173)),arg('--host','127.0.0.1'),()=>console.log('Static guide preview ready'));
