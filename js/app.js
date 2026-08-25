/* Piccolabellavista V1.2 — compatibility loader.
   Carica i tre sorgenti originali in modo asincrono, rimuove la prima riga
   descrittiva non-JavaScript e li esegue nello stesso scope globale.
   Evita XMLHttpRequest sincrono, ormai deprecato/bloccato da alcuni browser. */
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
    const res=await fetch(path,{cache:"no-store"});
    if(!res.ok)throw new Error("PBV source load failed: "+path+" (HTTP "+res.status+")");
    return String(await res.text())
      .replace(/^\uFEFF/,"")
      .replace(/^[^\r\n]*\r?\n/,"");
  }

  async function boot(){
    try{
      const parts=await Promise.all(files.map(load));
      const code=parts.join("\n\n");
      new Function(code)();
    }catch(err){
      console.error("PBV boot error:",err);
      const view=document.getElementById("view");
      if(view)view.innerHTML='<div style="padding:2rem;font-family:system-ui"><h2>Piccolabellavista</h2><p>Impossibile avviare la guida. Controlla che il progetto sia avviato tramite un server locale.</p><pre style="white-space:pre-wrap">'+String(err&&err.message||err).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))+'</pre></div>';
    }
  }

  boot();
})();
