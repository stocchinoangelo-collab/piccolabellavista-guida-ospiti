/* Piccolabellavista — beach photography layer V1.2
   Images are remote Wikimedia Commons/Unsplash files with source and licence
   recorded in credits/beach-images.json. This layer keeps the original app
   rendering intact and replaces the generic art blocks with real photos. */
(function(){
  "use strict";
  const W="https://commons.wikimedia.org/wiki/Special:Redirect/file/";
  const U="https://images.unsplash.com/";
  const files={
    poetto:"Poetto beach.jpg",
    calamosca:"Torre e faro di Calamosca.jpg",
    cala_fighera:"Cagliari - Cala Fighera.jpg",
    mari_pintau:"Cala Mari Pintau - panoramio.jpg",
    cala_regina:"Torre di Cala Regina.JPG",
    is_mortorius:"Golfo di Carbonara.jpg",
    solanas:"Solanas beach in Sardinia - Flickr - david.orban.jpg",
    porto_sa_ruxi:"Golfo di Carbonara.jpg",
    simius:"Simius Beach - Villasimius.jpg",
    porto_giunco:"Aerial view of the beach of Porto Giunco (Spiaggia di Porto Giunco) and the nearby lake Stagno di Notteri in Sardinia, Italy (48402731012).jpg",
    molentis:"The beach of Punta Molentis in Sardinia, Italy (48398890966).jpg",
    su_giudeu:"Su Giudeu . Chia.jpg",
    cala_cipolla:"Cala Cipolla.jpg",
    tuerredda:"Tueredda.jpg",
    piscadeddus:"Golfo di Carbonara.jpg",
    piscinni:"Spiaggia di Piscinni - Teulada (CA) - panoramio.jpg",
    costa_rei:"Beach at Costa Rei.jpg",
    peppino:"Costa Rei Scoglio di Peppino.jpg"
  };
  const urls={};
  Object.keys(files).forEach(id=>urls[id]=W+encodeURIComponent(files[id]));
  urls.solanas="https://images.unsplash.com/photo-1649277146326-5009a86785c3?auto=format&fit=crop&fm=jpg&q=82&w=1800";

  function apply(root){
    (root||document).querySelectorAll(".art[data-art]").forEach(el=>{
      const id=el.dataset.art;
      const url=urls[id];
      if(!url)return;
      el.style.backgroundImage="url(\""+url.replace(/\"/g,"%22")+"\")";
      el.classList.add("has-photo","pbv-real-photo");
      el.setAttribute("aria-label",id.replace(/_/g," "));
    });
  }
  function start(){
    apply(document);
    new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{
      if(n.nodeType===1)apply(n);
    }))).observe(document.getElementById("view")||document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();
