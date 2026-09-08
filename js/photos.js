/* Only verified local image assets. Selection targets are recorded separately. */
const PHOTOS = {
  "hero": {
    "file": "images/cagliari-porto-smiley-toerist.webp",
    "width": 2400,
    "height": 1000,
    "position": "64% 40%",
    "alt": {"it":"Cagliari dal porto verso la città e Castello","en":"Cagliari from the harbour towards the city and Castello","de":"Cagliari vom Hafen in Richtung Stadt und Castello"},
    "author": "Smiley.toerist",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Cagliari_haven_2018_1.jpg",
    "status": "APPROVATA_USO_CANDIDATO_PRINCIPALE_NON_FINALE"
  },
  "porceddu": {
    "file": "images/enogastronomia/porceddu-sardo-japs88.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Porceddu sardo arrostito secondo la tradizione","en":"Traditional Sardinian roast suckling pig","de":"Traditionell gebratenes sardisches Spanferkel"},
    "author":"Japs 88","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Porcetto_sardo_1.jpg","status":"APPROVATA_USO","thumb":"images/enogastronomia/porceddu-sardo-japs88-800.webp"
  },
  "fregola": {
    "file":"images/enogastronomia/fregola-frutti-di-mare-simon-legner.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Fregola sarda ai frutti di mare","en":"Sardinian fregola with seafood","de":"Sardische Fregola mit Meeresfrüchten"},
    "author":"Simon Legner (simon04)","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Fregola_ai_frutti_di_mare_(IMG_20260515_203730).jpg","status":"APPROVATA_USO","thumb":"images/enogastronomia/fregola-frutti-di-mare-simon-legner-800.webp"
  },
  "malloreddus": {
    "file":"images/enogastronomia/malloreddus-marica-massaro.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Malloreddus, tipica pasta sarda di semola","en":"Malloreddus, traditional Sardinian semolina pasta","de":"Malloreddus, traditionelle sardische Grießnudeln"},
    "author":"Marica Massaro","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Malloreddus.jpg","status":"APPROVATA_USO_FALLBACK","thumb":"images/enogastronomia/malloreddus-marica-massaro-800.webp"
  },
  "pane_carasau": {
    "file":"images/enogastronomia/pane-carasau-luigi-chiesa.webp","width":1500,"height":1000,"position":"50% 50%",
    "alt":{"it":"Pane carasau, tradizionale pane croccante sardo","en":"Pane carasau, traditional crisp Sardinian flatbread","de":"Pane carasau, traditionelles knuspriges sardisches Fladenbrot"},
    "author":"Luigi Chiesa","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0/","source":"https://commons.wikimedia.org/wiki/File:Pane_carasau.jpg","status":"APPROVATA_USO_FALLBACK","thumb":"images/enogastronomia/pane-carasau-luigi-chiesa-800.webp"
  },
  "seadas": {
    "file":"images/enogastronomia/seadas-terendo.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Seada sarda, dolce tradizionale con formaggio e miele","en":"Traditional Sardinian seada pastry with cheese and honey","de":"Sardische Seada mit Käse und Honig"},
    "author":"Terendo","license":"Public domain","licenseUrl":"https://creativecommons.org/publicdomain/mark/1.0/","source":"https://commons.wikimedia.org/wiki/File:Seadas.JPG","status":"APPROVATA_USO","thumb":"images/enogastronomia/seadas-terendo-800.webp"
  },
  "pecorino": {
    "file":"images/enogastronomia/pecorino-sardo-jon-sullivan.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Pecorino Sardo, formaggio tradizionale dell’isola","en":"Pecorino Sardo, traditional Sardinian sheep’s milk cheese","de":"Pecorino Sardo, traditioneller sardischer Schafskäse"},
    "author":"Jon Sullivan","license":"Public domain","licenseUrl":"https://creativecommons.org/publicdomain/mark/1.0/","source":"https://commons.wikimedia.org/wiki/File:Pecorino_sardo_cheese.jpg","status":"APPROVATA_USO","thumb":"images/enogastronomia/pecorino-sardo-jon-sullivan-800.webp"
  },
  "cannonau": {
    "file":"images/enogastronomia/cannonau-di-sardegna-agne27.webp","width":597,"height":800,"position":"50% 50%",
    "alt":{"it":"Bottiglia di Cannonau di Sardegna","en":"Bottle of Cannonau di Sardegna wine","de":"Flasche Cannonau di Sardegna"},
    "author":"Agne27","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cannonau_di_Sardegna.jpg","status":"APPROVATA_USO"
  },
  "bottarga": {
    "file":"images/enogastronomia/bottarga-san-benedetto-freek-janssens.webp","width":1075,"height":717,"position":"50% 50%",
    "alt":{"it":"Bottarga di muggine al Mercato di San Benedetto di Cagliari","en":"Mullet bottarga at San Benedetto Market in Cagliari","de":"Meeräschen-Bottarga auf dem Markt San Benedetto in Cagliari"},
    "author":"Freek Janssens","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Bottarga.png","status":"APPROVATA_USO","thumb":"images/enogastronomia/bottarga-san-benedetto-freek-janssens-800.webp"
  },
  "poetto": {
    "file":"images/poetto.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Panorama del Poetto dalla Sella del Diavolo","en":"Panorama of Poetto from Sella del Diavolo","de":"Panorama des Poetto von der Sella del Diavolo"},
    "author":"Phil Venditti","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0/","source":"https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Poetto_from_Sella_del_Diavolo.jpg","status":"APPROVATA_USO","thumb":"images/poetto-800.webp"
  },
  "mari_pintau": {
    "file":"images/beaches/mari-pintau.webp","width":1280,"height":851,"position":"50% 50%",
    "alt":{"it":"Mari Pintau e le sue acque turchesi sulla costa di Quartu","en":"Mari Pintau and its turquoise waters on the Quartu coast","de":"Mari Pintau mit türkisfarbenem Wasser an der Küste von Quartu"},
    "author":"Ramon Espiña Fernandez","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cala_Mari_Pintau_-_panoramio.jpg","status":"APPROVATA_USO","thumb":"images/beaches/mari-pintau-800.webp"
  },
  "chia": {
    "file":"images/beaches/chia-su-giudeu.webp","width":1280,"height":563,"position":"50% 50%",
    "alt":{"it":"Dune di Chia presso la spiaggia di Su Giudeu","en":"Chia dunes near Su Giudeu beach","de":"Dünen von Chia bei Su Giudeu"},
    "author":"Cristiano Cani","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0/","source":"https://commons.wikimedia.org/wiki/File:Dune_di_Chia.jpg","status":"APPROVATA_USO","thumb":"images/beaches/chia-su-giudeu-800.webp"
  },
  "tuerredda": {
    "file":"images/beaches/tuerredda.webp","width":1280,"height":606,"position":"50% 50%",
    "alt":{"it":"Isola di Tuerredda e mare della costa sud-occidentale","en":"Tuerredda islet and the south-west coast sea","de":"Insel Tuerredda und Meer an der Südwestküste"},
    "author":"Pampuco","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Isola_Tuerredda.png","status":"APPROVATA_USO","thumb":"images/beaches/tuerredda-800.webp"
  },
  "porto_giunco": {
    "file":"images/beaches/porto-giunco.webp","width":1280,"height":719,"position":"50% 50%",
    "alt":{"it":"Vista aerea di Porto Giunco e dello stagno di Notteri","en":"Aerial view of Porto Giunco and Stagno di Notteri","de":"Luftaufnahme von Porto Giunco und dem Stagno di Notteri"},
    "author":"dronepicr","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0/","source":"https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_beach_of_Porto_Giunco_(Spiaggia_di_Porto_Giunco)_and_the_nearby_lake_Stagno_di_Notteri_in_Sardinia,_Italy_(48402731012).jpg","status":"APPROVATA_USO","thumb":"images/beaches/porto-giunco-800.webp"
  },
  "punta_molentis": {
    "file":"images/beaches/punta-molentis.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Vista aerea panoramica della spiaggia di Punta Molentis","en":"Panoramic aerial view of Punta Molentis beach","de":"Panoramische Luftaufnahme des Strandes Punta Molentis"},
    "author":"dronepicr","license":"CC BY 2.0","licenseUrl":"https://creativecommons.org/licenses/by/2.0/","source":"https://commons.wikimedia.org/wiki/File:Aerial_view_of_Punta_Molentis_Beach_in_Sardinia,_Italy_(48399314582).jpg","status":"APPROVATA_USO","thumb":"images/beaches/punta-molentis-800.webp"
  },
  "simius": {
    "file":"images/beaches/simius.webp","width":1280,"height":960,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Simius a Villasimius","en":"Simius beach in Villasimius","de":"Strand von Simius in Villasimius"},
    "author":"Muzzudan","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Simius_Beach_-_Villasimius.jpg","status":"APPROVATA_USO","thumb":"images/beaches/simius-800.webp"
  },
  "cala_sinzias": {
    "file":"images/beaches/cala-sinzias.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Cala Sinzias a Castiadas","en":"Cala Sinzias beach in Castiadas","de":"Strand Cala Sinzias in Castiadas"},
    "author":"Giorgio Galeotti","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Spiaggia_-_Cala_Sinzias,_Castiadas,_Cagliari,_Italia_-_29_Maggio_2026_01.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-sinzias-800.webp"
  },
  "is_arutas": {
    "file":"images/beaches/is-arutas.webp","width":1280,"height":871,"position":"50% 50%",
    "alt":{"it":"Spiaggia di Is Arutas nella penisola del Sinis","en":"Is Arutas beach on the Sinis peninsula","de":"Strand Is Arutas auf der Sinis-Halbinsel"},
    "author":"William Kimmerle","license":"CC BY 4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","source":"https://commons.wikimedia.org/wiki/File:Is_Aruttas_Beach.jpg","status":"APPROVATA_USO","thumb":"images/beaches/is-arutas-800.webp"
  },
  "san_giovanni_sinis": {
    "file":"images/beaches/san-giovanni-sinis.webp","width":1280,"height":853,"position":"50% 50%",
    "alt":{"it":"Spiaggia e torre di San Giovanni di Sinis","en":"Beach and tower of San Giovanni di Sinis","de":"Strand und Turm von San Giovanni di Sinis"},
    "author":"Mike Peel","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:At_Tharros,_Sardinia_2024_010.jpg","status":"APPROVATA_USO","thumb":"images/beaches/san-giovanni-sinis-800.webp"
  },
  "la_pelosa": {
    "file":"images/beaches/la-pelosa.webp","width":1280,"height":852,"position":"50% 50%",
    "alt":{"it":"La Pelosa a Stintino con mare turchese e torre","en":"La Pelosa in Stintino with turquoise sea and tower","de":"La Pelosa in Stintino mit türkisfarbenem Meer und Turm"},
    "author":"goldpicasa","license":"CC BY 3.0","licenseUrl":"https://creativecommons.org/licenses/by/3.0/","source":"https://commons.wikimedia.org/wiki/File:Stintino,_La_Pelosa_beach_-_panoramio_(2).jpg","status":"APPROVATA_USO","thumb":"images/beaches/la-pelosa-800.webp"
  },
  "cala_brandinchi": {
    "file":"images/beaches/cala-brandinchi.webp","width":1280,"height":851,"position":"50% 50%",
    "alt":{"it":"Cala Brandinchi e le sue acque basse turchesi","en":"Cala Brandinchi and its shallow turquoise waters","de":"Cala Brandinchi mit flachem türkisfarbenem Wasser"},
    "author":"Ramon Espiña Fernandez","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cala_Brandinchi_-_Cerde%C3%B1a_-_panoramio.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-brandinchi-800.webp"
  },
  "cala_luna": {
    "file":"images/beaches/cala-luna.webp","width":1280,"height":848,"position":"50% 50%",
    "alt":{"it":"Cala Luna nel Golfo di Orosei","en":"Cala Luna in the Gulf of Orosei","de":"Cala Luna im Golf von Orosei"},
    "author":"Sven Jungnickel","license":"CC BY-SA 3.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/3.0/","source":"https://commons.wikimedia.org/wiki/File:Cala_Luna.jpg","status":"APPROVATA_USO","thumb":"images/beaches/cala-luna-800.webp"
  },
  "bastione": {
    "file":"images/bastione.webp","width":1600,"height":1067,"position":"50% 50%",
    "alt":{"it":"Bastione di Saint Remy a Cagliari","en":"Bastione di Saint Remy in Cagliari","de":"Bastione di Saint Remy in Cagliari"},
    "author":"Elisa.Mnn","license":"CC BY-SA 4.0","licenseUrl":"https://creativecommons.org/licenses/by-sa/4.0/","source":"https://commons.wikimedia.org/wiki/File:Bastione_di_San_Remy,_prospetto.jpg","status":"APPROVATA_USO","thumb":"images/bastione-800.webp"
  }
  ,
  "calamosca_context": {
    "file":"images/restaurants/calamosca-context-cristiano-cani.webp",
    "width":2589,
    "height":1359,
    "position":"50% 50%",
    "alt":{
      "it":"Torre e faro di Calamosca sul promontorio di Capo Sant’Elia",
      "en":"Calamosca tower and lighthouse on the Capo Sant’Elia headland",
      "de":"Turm und Leuchtturm von Calamosca am Kap Sant’Elia"
    },
    "author":"Cristiano Cani",
    "license":"CC BY 2.0",
    "licenseUrl":"https://creativecommons.org/licenses/by/2.0/",
    "source":"https://commons.wikimedia.org/wiki/File:Torre_e_faro_di_Calamosca.jpg",
    "status":"APPROVATA_USO_FALLBACK_AMBIENTALE",
    "thumb":"images/restaurants/calamosca-context-cristiano-cani-800.webp"
  }

};
