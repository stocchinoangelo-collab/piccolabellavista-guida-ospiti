/* Piccolabellavista — runtime loader */
(function(){
  "use strict";
  if(window.__PBV_BOOTED)return;
  window.__PBV_BOOTED=true;
  const files=[
    "../_source_originale/🌐 jsi18n.js",
    "../_source_originale/jsdata.js",
    "../_source_originale/jsapp.js — V1.2 finale.txt"
  ];
  async function load(path){
    const r=await fetch(path,{cache:"no-store"});
    if(!r.ok)throw new Error("HTTP "+r.status+" — "+path);
    return String(await r.text()).replace(/^\uFEFF/,"").replace(/^[^\r\n]*\r?\n/,"");
  }
  async function boot(){
    try{
      for(const path of files){
        const code=await load(path);
        try{
          const fn=new Function(code+"\n//# sourceURL="+encodeURI(path));
          fn();
        }catch(err){
          throw new Error("Errore JavaScript in "+path+": "+(err&&err.message?err.message:String(err)));
        }
      }
    }catch(err){
      console.error(err);
      const view=document.getElementById("view");
      if(view)view.innerHTML='<div style="padding:2rem;font-family:system-ui;max-width:900px;margin:auto"><h2>Piccolabellavista</h2><p>Impossibile avviare la guida.</p><pre style="white-space:pre-wrap;background:#f5f1eb;padding:1rem;border-radius:10px">'+String(err&&err.message?err.message:err).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))+'</pre></div>';
    }
  }
  boot();
})();
