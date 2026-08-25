/* Piccolabellavista · runtime data loader V1.2.1
   Carica la sorgente dati originale conservata in _source_originale. */
(function(){
  "use strict";
  var url="../_source_originale/jsdata.js";
  var x=new XMLHttpRequest();
  try{
    x.open("GET",url,false);
    x.send(null);
    if(x.status<200||x.status>=300) throw new Error("HTTP "+x.status);
    var src=x.responseText.replace(/^\uFEFF/,"").replace(/^.*?\r?\n/ , "");
    ["CONFIG","WINDS","BEACHES","GEMS","FOOD","EVENTS","ITINS","PERIODS"].forEach(function(n){
      src=src.replace(new RegExp("\\bconst\\s+"+n+"\\s*="),"globalThis."+n+"=");
      src=src.replace(new RegExp("\\blet\\s+"+n+"\\s*="),"globalThis."+n+"=");
      src=src.replace(new RegExp("\\bvar\\s+"+n+"\\s*="),"globalThis."+n+"=");
    });
    (0,eval)(src);
    ["CONFIG","WINDS","BEACHES","GEMS","FOOD","EVENTS","ITINS","PERIODS"].forEach(function(n){
      if(typeof globalThis[n]==="undefined") throw new Error(n+" non caricato");
    });
  }catch(e){
    console.error("Piccolabellavista: caricamento dati fallito",e);
    globalThis.CONFIG=globalThis.CONFIG||{home:{lat:39.25,lng:9.14},gate:{enabled:false},eventsCsv:{enabled:false},lastChecked:{it:"",en:"",de:""}};
    globalThis.WINDS=globalThis.WINDS||[];
    globalThis.BEACHES=globalThis.BEACHES||[];
    globalThis.GEMS=globalThis.GEMS||[];
    globalThis.FOOD=globalThis.FOOD||[];
    globalThis.EVENTS=globalThis.EVENTS||[];
    globalThis.ITINS=globalThis.ITINS||[];
    globalThis.PERIODS=globalThis.PERIODS||[];
  }
})();
