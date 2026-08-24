/* Piccolabellavista V1.2 — compatibility loader.
   The uploaded source files contain a human-readable header line and live in the
   repository root. This loader removes that header and evaluates the three
   original sources together, preserving their original shared scope/order. */
(function(){
  "use strict";
  if(window.__PBV_BOOTED)return;
  window.__PBV_BOOTED=true;
  const files=[
    "../🌐 jsi18n.js",
    "../jsdata.js",
    "../jsapp.js — V1.2 finale.txt"
  ];
  function load(path){
    const x=new XMLHttpRequest();
    x.open("GET",path,false);
    x.send(null);
    if(x.status!==0 && (x.status<200||x.status>=300)) throw new Error("PBV source load failed: "+path+" (HTTP "+x.status+")");
    return String(x.responseText||"").replace(/^\uFEFF/,"").replace(/^[^\r\n]*\r?\n/,"");
  }
  try{
    const code=files.map(load).join("\n\n");
    new Function(code)();
  }catch(err){
    console.error(err);
    const view=document.getElementById("view");
    if(view)view.innerHTML='<div style="padding:2rem;font-family:system-ui"><h2>Piccolabellavista</h2><p>Impossibile avviare la guida. Avvia il progetto tramite un server locale (es. <code>python -m http.server 8000</code>).</p></div>';
  }
})();
