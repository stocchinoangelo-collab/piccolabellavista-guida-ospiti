/* Export only guest-facing assets. No dependencies and no deployment side effects. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function build(destination=path.join(root,'dist')){
 if(fs.existsSync(destination))throw Error('Output already exists: choose an empty destination');
 const photos=JSON.parse(fs.readFileSync(path.join(root,'credits/photos.json'),'utf8'));
 const files=new Set(['index.html','sw.js','manifest.webmanifest','icon.svg','_headers','.nojekyll',
  'css/style.css','css/boutique.css','css/release.css',
  'js/i18n.js','js/data.js','js/guide.js','js/photos.js','js/editorial.js','js/app.js',
  'icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','credits/photos.json',
  'img/casa/bagno.jpg','img/casa/letto.jpg','img/casa/panoramica.jpg','img/casa/zona-pranzo.jpg',
  ...photos.flatMap(p=>[p.file,p.thumb].filter(Boolean))]);
 // Validate everything before creating output; never follow symlinks from source.
 for(const relative of files){
  if(path.isAbsolute(relative)||relative.split('/').includes('..'))throw Error('Invalid asset path');
  let current=root;
  for(const segment of relative.split('/')){current=path.join(current,segment);if(fs.lstatSync(current).isSymbolicLink())throw Error('Symlink asset refused');}
  if(!fs.statSync(current).isFile())throw Error('Missing asset: '+relative);
 }
 fs.mkdirSync(destination,{recursive:true});
 for(const relative of files){const target=path.join(destination,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,relative),target);}
 return [...files];
}
if(require.main===module){const files=build(process.argv[2]?path.resolve(process.argv[2]):undefined);console.log(`Exported ${files.length} guest assets. No deployment performed.`);}
module.exports=build;
