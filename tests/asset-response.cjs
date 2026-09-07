// Local network fixture. Browser behaviour is deliberately not claimed here.
const fs=require('node:fs'),path=require('node:path');
module.exports=function assetResponse(root,scope,url){
 const relative=new URL(url).pathname.slice(new URL(scope).pathname.length)||'index.html';
 const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
 const file=path.join(root,relative);
 return fs.existsSync(file)?new Response(fs.readFileSync(file),{headers:{'Content-Type':types[path.extname(file)]||'application/octet-stream'}}):new Response('Not found',{status:404});
};
