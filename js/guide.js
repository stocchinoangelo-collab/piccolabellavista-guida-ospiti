/* Editorial selections from the authorised 2026-09-06 brief. */
const GUIDE = {
  "restaurants": [
    {
      "id": "su_cumbidu",
      "name": "Su Cumbidu",
      "why": {
        "it": "Cucina sarda tradizionale, per una tavola che racconta l’isola.",
        "en": "Traditional Sardinian cooking for a taste of the island.",
        "de": "Traditionelle sardische Küche, die von der Insel erzählt."
      },
      "site": "",
      "mapQuery": "Su Cumbidu Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "antica_cagliari",
      "name": "Antica Cagliari",
      "why": {
        "it": "Cucina sarda e di mare, per un pranzo o una cena nel centro storico.",
        "en": "Sardinian and seafood cooking in the historic centre.",
        "de": "Sardische Küche und Meeresgerichte in der Altstadt."
      },
      "site": "https://www.anticacagliari.it/",
      "mapQuery": "Antica Cagliari Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "sa_piola",
      "name": "Sa Piola",
      "why": {
        "it": "Atmosfera tipica e piatti locali, per una serata dedicata ai sapori sardi.",
        "en": "A traditional setting and local dishes for an evening of Sardinian flavours.",
        "de": "Traditionelle Atmosphäre und lokale Gerichte für einen sardischen Genussabend."
      },
      "site": "https://www.sapiola.it/",
      "mapQuery": "Sa Piola Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "gallo_oro",
      "name": "Il Gallo d’Oro",
      "why": {
        "it": "La sosta dedicata alla pizza nella nostra selezione.",
        "en": "The pizza stop in our selection.",
        "de": "Unsere Adresse für eine Pizza."
      },
      "site": "",
      "mapQuery": "Il Gallo d’Oro Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "antico_caffe",
      "name": "Antico Caffè 1855",
      "why": {
        "it": "Una pausa nel cuore di Cagliari, vicino al Bastione di Saint Remy.",
        "en": "A break in the heart of Cagliari, near the Bastione di Saint Remy.",
        "de": "Eine Pause im Herzen Cagliaris, nahe dem Bastione di Saint Remy."
      },
      "site": "",
      "mapQuery": "Antico Caffè 1855 Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    }
  ],
  "aperitivi": [
    {
      "id": "terrazze",
      "name": "Le Terrazze di Calamosca",
      "why": {
        "it": "Per la terrazza e la luce che cambia sul mare.",
        "en": "For the terrace and the changing light over the sea.",
        "de": "Für die Terrasse und das wechselnde Licht über dem Meer."
      },
      "site": "https://www.calamosca.it/le-terrazze/",
      "mapQuery": "Le Terrazze di Calamosca Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "paillote",
      "name": "La Paillote",
      "why": {
        "it": "Per fermarsi a bere guardando il mare.",
        "en": "For a drink with a sea view.",
        "de": "Für ein Getränk mit Meerblick."
      },
      "site": "https://www.paillote.it/",
      "mapQuery": "La Paillote Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "libarium",
      "name": "Libarium",
      "why": {
        "it": "Per la terrazza e il panorama da Castello.",
        "en": "For the terrace and the panorama from Castello.",
        "de": "Für die Terrasse und den Ausblick von Castello."
      },
      "site": "https://www.libarium.it/",
      "mapQuery": "Libarium Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    },
    {
      "id": "biffi",
      "name": "Biffi American Bar",
      "why": {
        "it": "Per chi cerca un bancone storico e un cocktail in città.",
        "en": "For a historic bar counter and a cocktail in town.",
        "de": "Für eine traditionsreiche Bar und einen Cocktail in der Stadt."
      },
      "site": "https://www.instagram.com/ilbiffi/",
      "mapQuery": "Biffi American Bar Cagliari",
      "photoStatus": "PENDING_PERMISSION"
    }
  ],
  "transit": [
    {
      "id": "centro",
      "name": {
        "it": "Centro storico / Castello",
        "en": "Historic centre / Castello",
        "de": "Altstadt / Castello"
      },
      "query": "Bastione di Saint Remy Cagliari",
      "note": {
        "it": "Bus urbano e passeggiata finale in salita. Scegli l’arrivo in base al punto di Castello che vuoi visitare.",
        "en": "City bus followed by an uphill walk. Choose your arrival point for the part of Castello you want to visit.",
        "de": "Stadtbus und anschließender Fußweg bergauf. Ankunftspunkt passend zum Ziel in Castello wählen."
      }
    },
    {
      "id": "poetto",
      "name": {
        "it": "Poetto",
        "en": "Poetto",
        "de": "Poetto"
      },
      "query": "Poetto Cagliari",
      "note": {
        "it": "Bus urbano; scegli prima il tratto di spiaggia, poi controlla eventuali cambi e l’ultima corsa di rientro.",
        "en": "City bus; choose your stretch of beach, then check connections and the last return service.",
        "de": "Stadtbus; Strandabschnitt wählen, dann Umstiege und letzte Rückfahrt prüfen."
      }
    },
    {
      "id": "molentargius",
      "name": {
        "it": "Molentargius",
        "en": "Molentargius",
        "de": "Molentargius"
      },
      "query": "Parco Molentargius ingresso via La Palma Cagliari",
      "note": {
        "it": "Bus e tratto a piedi: controlla l’ingresso visitabile del parco e il percorso interno prima di partire.",
        "en": "Bus and a walk: check which park entrance is accessible and plan the route inside before leaving.",
        "de": "Bus und Fußweg: zugänglichen Parkeingang und Route im Park vorab prüfen."
      }
    },
    {
      "id": "mercato",
      "name": {
        "it": "Mercato di San Benedetto",
        "en": "San Benedetto Market",
        "de": "Markt San Benedetto"
      },
      "query": "Mercato San Benedetto Piazza Nazzari Cagliari",
      "note": {
        "it": "Il Comune indica la sede provvisoria in Piazza Nazzari durante i lavori. Imposta questa destinazione, non il vecchio edificio.",
        "en": "The municipality lists the temporary site at Piazza Nazzari during renovation. Route to this location, not the old building.",
        "de": "Die Stadt nennt während der Bauarbeiten Piazza Nazzari als Ersatzstandort. Diesen Standort als Ziel wählen, nicht das alte Gebäude."
      }
    },
    {
      "id": "ospedali",
      "name": {
        "it": "Ospedali",
        "en": "Hospitals",
        "de": "Krankenhäuser"
      },
      "query": "Ospedale Brotzu Cagliari",
      "note": {
        "it": "Brotzu, Oncologico e Microcitemico hanno ingressi differenti: verifica l’ospedale e il reparto nella convocazione.",
        "en": "Brotzu, Oncologico and Microcitemico have different entrances: check the hospital and department on your appointment notice.",
        "de": "Brotzu, Oncologico und Microcitemico haben verschiedene Eingänge: Krankenhaus und Abteilung auf der Einladung prüfen."
      }
    },
    {
      "id": "stazione",
      "name": {
        "it": "Stazione di Cagliari",
        "en": "Cagliari railway station",
        "de": "Bahnhof Cagliari"
      },
      "query": "Stazione Cagliari Piazza Matteotti",
      "note": {
        "it": "Bus urbano verso Piazza Matteotti; aggiungi margine per il tratto a piedi e per raggiungere il binario.",
        "en": "City bus towards Piazza Matteotti; allow time for the walk and for reaching your platform.",
        "de": "Stadtbus Richtung Piazza Matteotti; Zeit für Fußweg und Bahnsteig einplanen."
      }
    },
    {
      "id": "aeroporto",
      "name": {
        "it": "Aeroporto di Cagliari-Elmas",
        "en": "Cagliari-Elmas Airport",
        "de": "Flughafen Cagliari-Elmas"
      },
      "query": "Aeroporto Cagliari Elmas",
      "note": {
        "it": "Bus fino alla stazione e treno per Elmas Aeroporto, oppure taxi. Il collegamento ferroviario è confermato da SOGAER; verifica gli orari per il tuo volo.",
        "en": "Bus to the station, then train to Elmas Aeroporto, or a taxi. SOGAER confirms the rail link; check schedules for your flight.",
        "de": "Bus zum Bahnhof, dann Zug nach Elmas Aeroporto, alternativ Taxi. SOGAER bestätigt die Bahnverbindung; Fahrplan passend zum Flug prüfen."
      }
    }
  ],
  "routes": [
    {
      "name": {
        "it": "Castello, la città dall’alto",
        "en": "Castello, the city from above",
        "de": "Castello, die Stadt von oben"
      },
      "period": {
        "it": "Medioevo e città moderna",
        "en": "Medieval and modern city",
        "de": "Mittelalter und moderne Stadt"
      },
      "duration": {
        "it": "2–3 ore",
        "en": "2–3 hours",
        "de": "2–3 Stunden"
      },
      "why": {
        "it": "Dal Bastione ai vicoli di Castello: torri, cattedrale e belvedere per leggere la città dal porto alle colline.",
        "en": "From the Bastione to Castello’s lanes: towers, cathedral and viewpoints reveal the city between port and hills.",
        "de": "Vom Bastione durch die Gassen von Castello: Türme, Kathedrale und Aussichtspunkte zeigen die Stadt zwischen Hafen und Hügeln."
      },
      "who": {
        "it": "Prima visita; chi ama camminare. Salite e gradini.",
        "en": "First-time visitors who enjoy walking. Slopes and steps.",
        "de": "Erstbesucher, die gern zu Fuß unterwegs sind. Steigungen und Stufen."
      },
      "query": "Bastione di Saint Remy Cagliari"
    },
    {
      "name": {
        "it": "Cagliari prima di Castello",
        "en": "Cagliari before Castello",
        "de": "Cagliari vor Castello"
      },
      "period": {
        "it": "Età punica, romana e paleocristiana",
        "en": "Punic, Roman and early Christian periods",
        "de": "Punische, römische und frühchristliche Zeit"
      },
      "duration": {
        "it": "Mezza giornata",
        "en": "Half a day",
        "de": "Ein halber Tag"
      },
      "why": {
        "it": "Tuvixeddu, Anfiteatro Romano e San Saturnino: tre tappe per scoprire epoche diverse. Verifica accessi e aperture prima di comporre il percorso.",
        "en": "Tuvixeddu, the Roman Amphitheatre and San Saturnino: three stops spanning different periods. Check access and opening before planning the route.",
        "de": "Tuvixeddu, römisches Amphitheater und San Saturnino: drei Stationen verschiedener Epochen. Zugang und Öffnung vor der Planung prüfen."
      },
      "who": {
        "it": "Appassionati di archeologia; percorso con spostamenti tra le tappe.",
        "en": "Archaeology enthusiasts; travel is needed between stops.",
        "de": "Archäologiebegeisterte; Fahrten zwischen den Stationen nötig."
      },
      "query": "Tuvixeddu Cagliari"
    },
    {
      "name": {
        "it": "Nora, una città sul mare",
        "en": "Nora, a city by the sea",
        "de": "Nora, eine Stadt am Meer"
      },
      "period": {
        "it": "Età fenicio-punica e romana",
        "en": "Phoenician-Punic and Roman periods",
        "de": "Phönizisch-punische und römische Zeit"
      },
      "duration": {
        "it": "Mezza giornata, viaggio escluso",
        "en": "Half a day, excluding travel",
        "de": "Ein halber Tag, ohne Anreise"
      },
      "why": {
        "it": "Una gita dedicata all’area archeologica: resti urbani, mosaici e paesaggio costiero si leggono insieme.",
        "en": "A trip devoted to the archaeological site, where urban remains, mosaics and the coastal landscape come together.",
        "de": "Ein Ausflug zur archäologischen Stätte, wo Stadtreste, Mosaike und Küstenlandschaft zusammenkommen."
      },
      "who": {
        "it": "Chi vuole unire storia e paesaggio; prevedere protezione dal sole.",
        "en": "Visitors combining history and landscape; bring sun protection.",
        "de": "Für Geschichte und Landschaft; an Sonnenschutz denken."
      },
      "query": "Area archeologica di Nora Pula"
    }
  ],
  "sources": [
    {
      "name": "Piccolabellavista",
      "url": "https://piccolabellavista.it/"
    },
    {
      "name": "CTM · Busfinder",
      "url": "https://www.ctmcagliari.it/busfinder/"
    },
    {
      "name": "SOGAER · Aeroporto / Airport / Flughafen",
      "url": "https://www.sogaer.it/it/da-per-aeroporto"
    },
    {
      "name": "Comune di Cagliari · Mercato San Benedetto",
      "url": "https://www.comune.cagliari.it/portale/page/it/mercato_civico_san_benedetto?contentId=LGO11814"
    },
    {
      "name": "Cagliari Turismo",
      "url": "https://cagliariturismo.comune.cagliari.it/"
    },
    {
      "name": "Sardegna Turismo",
      "url": "https://www.sardegnaturismo.it/"
    },
    {
      "name": "Open-Meteo",
      "url": "https://open-meteo.com/"
    }
  ]
};
