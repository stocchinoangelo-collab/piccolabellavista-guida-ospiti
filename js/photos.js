/* Only verified local image assets. Selection targets are recorded separately. */
const PHOTOS = {
  "hero": {
    "file": "images/cagliari-porto-smiley-toerist.webp",
    "width": 2400,
    "height": 1000,
    "position": "64% 40%",
    "alt": {
      "it": "Cagliari dal porto verso la città e Castello",
      "en": "Cagliari from the harbour towards the city and Castello",
      "de": "Cagliari vom Hafen in Richtung Stadt und Castello"
    },
    "author": "Smiley.toerist",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Cagliari_haven_2018_1.jpg",
    "status": "APPROVATA_USO_CANDIDATO_PRINCIPALE_NON_FINALE"
  },
  "porceddu": {
    "file": "images/enogastronomia/porceddu-sardo-japs88.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Porceddu sardo arrostito secondo la tradizione",
      "en": "Traditional Sardinian roast suckling pig",
      "de": "Traditionell gebratenes sardisches Spanferkel"
    },
    "author": "Japs 88",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Porcetto_sardo_1.jpg",
    "status": "APPROVATA_USO",
    "thumb": "images/enogastronomia/porceddu-sardo-japs88-800.webp"
  },
  "fregola": {
    "file": "images/enogastronomia/fregola-frutti-di-mare-simon-legner.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Fregola sarda ai frutti di mare",
      "en": "Sardinian fregola with seafood",
      "de": "Sardische Fregola mit Meeresfrüchten"
    },
    "author": "Simon Legner (simon04)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Fregola_ai_frutti_di_mare_(IMG_20260515_203730).jpg",
    "status": "APPROVATA_USO",
    "thumb": "images/enogastronomia/fregola-frutti-di-mare-simon-legner-800.webp"
  },
  "malloreddus": {
    "file": "images/enogastronomia/malloreddus-marica-massaro.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Malloreddus, tipica pasta sarda di semola",
      "en": "Malloreddus, traditional Sardinian semolina pasta",
      "de": "Malloreddus, traditionelle sardische Grießnudeln"
    },
    "author": "Marica Massaro",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Malloreddus.jpg",
    "status": "APPROVATA_USO_FALLBACK",
    "thumb": "images/enogastronomia/malloreddus-marica-massaro-800.webp"
  },
  "pane_carasau": {
    "file": "images/enogastronomia/pane-carasau-luigi-chiesa.webp",
    "width": 1500,
    "height": 1000,
    "position": "50% 50%",
    "alt": {
      "it": "Pane carasau, tradizionale pane croccante sardo",
      "en": "Pane carasau, traditional crisp Sardinian flatbread",
      "de": "Pane carasau, traditionelles knuspriges sardisches Fladenbrot"
    },
    "author": "Luigi Chiesa",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Pane_carasau.jpg",
    "status": "APPROVATA_USO_FALLBACK",
    "thumb": "images/enogastronomia/pane-carasau-luigi-chiesa-800.webp"
  },
  "seadas": {
    "file": "images/enogastronomia/seadas-terendo.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Seada sarda, dolce tradizionale con formaggio e miele",
      "en": "Traditional Sardinian seada pastry with cheese and honey",
      "de": "Sardische Seada mit Käse und Honig"
    },
    "author": "Terendo",
    "license": "Public domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Seadas.JPG",
    "status": "APPROVATA_USO",
    "thumb": "images/enogastronomia/seadas-terendo-800.webp"
  },
  "pecorino": {
    "file": "images/enogastronomia/pecorino-sardo-jon-sullivan.webp",
    "width": 1280,
    "height": 853,
    "position": "50% 50%",
    "alt": {
      "it": "Pecorino Sardo, formaggio tradizionale dell’isola",
      "en": "Pecorino Sardo, traditional Sardinian sheep’s milk cheese",
      "de": "Pecorino Sardo, traditioneller sardischer Schafskäse"
    },
    "author": "Jon Sullivan",
    "license": "Public domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Pecorino_sardo_cheese.jpg",
    "status": "APPROVATA_USO",
    "thumb": "images/enogastronomia/pecorino-sardo-jon-sullivan-800.webp"
  },
  "cannonau": {
    "file": "images/enogastronomia/cannonau-di-sardegna-agne27.webp",
    "width": 597,
    "height": 800,
    "position": "50% 50%",
    "alt": {
      "it": "Bottiglia di Cannonau di Sardegna",
      "en": "Bottle of Cannonau di Sardegna wine",
      "de": "Flasche Cannonau di Sardegna"
    },
    "author": "Agne27",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Cannonau_di_Sardegna.jpg",
    "status": "APPROVATA_USO"
  },
  "bottarga": {
    "file": "images/enogastronomia/bottarga-san-benedetto-freek-janssens.webp",
    "width": 1075,
    "height": 717,
    "position": "50% 50%",
    "alt": {
      "it": "Bottarga di muggine al Mercato di San Benedetto di Cagliari",
      "en": "Mullet bottarga at San Benedetto Market in Cagliari",
      "de": "Meeräschen-Bottarga auf dem Markt San Benedetto in Cagliari"
    },
    "author": "Freek Janssens",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Bottarga.png",
    "status": "APPROVATA_USO",
    "thumb": "images/enogastronomia/bottarga-san-benedetto-freek-janssens-800.webp"
  },
  "poetto": {
    "file": "images/poetto.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Panorama del Poetto dalla Sella del Diavolo",
      "en": "Panorama of Poetto from Sella del Diavolo",
      "de": "Panorama des Poetto von der Sella del Diavolo"
    },
    "author": "Phil Venditti",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Poetto_from_Sella_del_Diavolo.jpg",
    "status": "APPROVATA_USO",
    "thumb": "images/poetto-800.webp"
  },
  "bastione": {
    "file": "images/bastione.webp",
    "width": 1600,
    "height": 1067,
    "position": "50% 50%",
    "alt": {
      "it": "Bastione di Saint Remy a Cagliari",
      "en": "Bastione di Saint Remy in Cagliari",
      "de": "Bastione di Saint Remy in Cagliari"
    },
    "author": "Elisa.Mnn",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Bastione_di_San_Remy,_prospetto.jpg",
    "status": "APPROVATA_USO",
    "thumb": "images/bastione-800.webp"
  }
};
