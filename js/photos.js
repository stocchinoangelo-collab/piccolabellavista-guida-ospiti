const PHOTOS={
  "poetto": {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Poetto_beach.jpg/1280px-Poetto_beach.jpg",
    "alt": "Il Poetto e la Sella del Diavolo, Cagliari",
    "author": "Chris / berlinrider",
    "source": "https://commons.wikimedia.org/wiki/File:Poetto_beach.jpg"
  },
  "porto_giunco": {
    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Aerial_view_of_the_beach_of_Porto_Giunco_%28Spiaggia_di_Porto_Giunco%29_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia%2C_Italy_%2848402731012%29.jpg/1280px-Aerial_view_of_the_beach_of_Porto_Giunco_%28Spiaggia_di_Porto_Giunco%29_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia%2C_Italy_%2848402731012%29.jpg",
    "alt": "Porto Giunco e lo stagno di Notteri, Villasimius",
    "author": "dronepicr",
    "source": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_beach_of_Porto_Giunco_(Spiaggia_di_Porto_Giunco)_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia,_Italy_(48402731012).jpg"
  },
  "tuerredda": {
    "src": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tueredda.jpg",
    "alt": "La baia e l'isola di Tuerredda, Teulada",
    "author": "Pietro Zanarini / zipckr",
    "source": "https://commons.wikimedia.org/wiki/File:Tueredda.jpg"
  }
};

/* Keep each photograph tied to its actual place. */
if(typeof DATA!=="undefined"){
 for(const b of DATA.spiagge){
  const photo=PHOTOS[b.id];
  if(photo){b.image=photo.src;b.imageCredit=photo.author+" — CC BY 2.0 — Wikimedia Commons";}
 }
 const sea=DATA.cagliari.find(x=>x.id==="mare");
 if(sea){sea.image=PHOTOS.poetto.src;sea.imageCredit=PHOTOS.poetto.author+" — CC BY 2.0 — Wikimedia Commons";}
 DATA.fonti.text={
 it:"Questa guida raccoglie le indicazioni di Piccolabellavista per il soggiorno. Prima di partire, controlla orari, prezzi e date sui siti ufficiali indicati. Le quattro fotografie dell’alloggio sono state fornite da Angelo.",
 en:"This guide brings together Piccolabellavista’s suggestions for your stay. Before setting out, check opening times, prices and dates on the linked official websites. The four apartment photographs were provided by Angelo.",
 de:"Dieser Reiseführer enthält die Empfehlungen von Piccolabellavista. Bitte prüfe Öffnungszeiten, Preise und Termine vor dem Besuch auf den verlinkten offiziellen Websites. Die vier Fotos der Unterkunft wurden von Angelo bereitgestellt."};
 DATA.fonti.credits=DATA.fonti.credits.filter(x=>!String(x.it).startsWith("Fotografie"));
}
