/* Piccolabellavista · runtime loader V1.2.1
   Carica la sorgente trilingue conservata in _source_originale senza duplicarla. */
(function(){
  "use strict";
  var url="../_source_originale/%F0%9F%8C%90%20jsi18n.js";
  var x=new XMLHttpRequest();
  try{
    x.open("GET",url,false);
    x.send(null);
    if(x.status<200||x.status>=300) throw new Error("HTTP "+x.status);
    var src=x.responseText.replace(/^\uFEFF/,"").replace(/^.*?\r?\n/ , "");
    src=src.replace(/\bconst\s+I18N\s*=/,"globalThis.I18N=");
    (0,eval)(src);
    if(!globalThis.I18N) throw new Error("I18N non caricata");
  }catch(e){
    console.error("Piccolabellavista: caricamento i18n fallito",e);
    globalThis.I18N={it:{},en:{},de:{}};
  }
})();
