/* Canonical guide data. Updated 2026-09-06; operational estimates remain indicative. */
const CONFIG = {
  "home": {
    "lat": 39.25,
    "lng": 9.14,
    "address": "Via Bellavista 14, Pirri, Cagliari",
    "coordinatePurpose": "approximate weather location, not property navigation"
  },
  "gate": {
    "enabled": false,
    "passSha256": ""
  },
  "lastChecked": {
    "it": "Contenuti storici; confermare orari e accessi sui siti ufficiali.",
    "en": "Reference content; confirm hours and access on official websites.",
    "de": "Hintergrundinformationen; Öffnungszeiten und Zugang auf offiziellen Seiten prüfen."
  }
};
const WINDS = [
  [
    "tramontana",
    0
  ],
  [
    "grecale",
    45
  ],
  [
    "levante",
    90
  ],
  [
    "scirocco",
    135
  ],
  [
    "ostro",
    180
  ],
  [
    "libeccio",
    225
  ],
  [
    "ponente",
    270
  ],
  [
    "maestrale",
    315
  ]
];
const BEACHES = [
  {
    "id": "poetto",
    "name": "Poetto",
    "facing": "S·SE",
    "tags": [],
    "driveMin": 15,
    "driveKm": 7,
    "crowd": 5,
    "type": {
      "it": "sabbia urbana, 8 km",
      "en": "urban sand, 8 km long",
      "de": "Stadtstrand, 8 km"
    },
    "coords": [
      39.2092,
      9.1815
    ],
    "best": "III–X",
    "parking": {
      "it": "ampio lungo il litorale",
      "en": "plenty along the shore",
      "de": "viel entlang der Küste"
    },
    "services": {
      "it": "completi (stabilimenti)",
      "en": "full facilities (beach clubs)",
      "de": "voll (Strandbetriebe)"
    },
    "access": {
      "it": "facilissimo",
      "en": "very easy",
      "de": "sehr leicht"
    },
    "food": {
      "it": "molti bar e ristoranti",
      "en": "many bars & restaurants",
      "de": "viele Bars & Restaurants"
    },
    "trails": {
      "it": "pista ciclabile; Sella del Diavolo vicino",
      "en": "cycle path; Sella del Diavolo nearby",
      "de": "Radweg; Sella del Diavolo nahe"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 3,
      "levante": 2,
      "scirocco": 1,
      "ostro": 2,
      "libeccio": 2,
      "ponente": 4,
      "maestrale": 4
    },
    "desc": {
      "it": "Il mare di casa: 8 km di sabbia ai piedi della città.",
      "en": "Our house sea: 8 km of sand at the city’s feet.",
      "de": "Unser Hausmeer: 8 km Sand zu Füßen der Stadt."
    },
    "go": {
      "it": "Ogni giorno dell’anno per camminare; da marzo a ottobre per il bagno.",
      "en": "Any day for a stroll; March–October for swimming.",
      "de": "Jeder Tag zum Spazieren; März–Okt zum Baden."
    },
    "avoid": {
      "it": "Con scirocco forte: mare mosso e alghe.",
      "en": "With strong scirocco: rough sea and algae.",
      "de": "Bei starkem Scirocco: rauere See und Algen."
    }
  },
  {
    "id": "mari_pintau",
    "name": "Mari Pintau",
    "facing": "E·SE",
    "tags": [],
    "driveMin": 25,
    "driveKm": 18,
    "crowd": 3,
    "type": {
      "it": "sabbia e ciottoli",
      "en": "sand and pebbles",
      "de": "Sand und Kies"
    },
    "coords": [
      39.156,
      9.34
    ],
    "best": "V–X",
    "parking": {
      "it": "a pagamento vicino alla spiaggia",
      "en": "paid, close to the beach",
      "de": "gebührenpflichtig, strandnah"
    },
    "services": {
      "it": "stagionali",
      "en": "seasonal",
      "de": "saisonal"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "chioschi estivi",
      "en": "summer kiosks",
      "de": "Sommerkioske"
    },
    "trails": {
      "it": "costiera di Kal’e Moru",
      "en": "Kal’e Moru coastline walk",
      "de": "Küstenweg Kal’e Moru"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 2,
      "levante": 1,
      "scirocco": 1,
      "ostro": 3,
      "libeccio": 4,
      "ponente": 5,
      "maestrale": 5
    },
    "desc": {
      "it": "«Mare dipinto»: acqua smeraldo tra le rocce, perfetta con maestrale.",
      "en": "“Painted sea”: emerald water among rocks — perfect with maestrale.",
      "de": "„Gemaltes Meer“: smaragdgrünes Wasser – ideal bei Maestrale."
    },
    "go": {
      "it": "Nelle giornate di maestrale o ponente.",
      "en": "On maestrale or ponente days.",
      "de": "An Tagen mit Maestrale oder Ponente."
    },
    "avoid": {
      "it": "Weekend di luglio/agosto molto affollata; mossa con levante.",
      "en": "Busy on July/August weekends; choppy with levante.",
      "de": "Juli/Aug-Wochenende voll; unruhig bei Levante."
    }
  },
  {
    "id": "molentis",
    "name": "Punta Molentis",
    "facing": "NE·E",
    "tags": [],
    "driveMin": 65,
    "driveKm": 52,
    "crowd": 4,
    "type": {
      "it": "arco di sabbia tra graniti",
      "en": "sand arc between granite rocks",
      "de": "Sandbogen zwischen Granitfelsen"
    },
    "coords": [
      39.123,
      9.493
    ],
    "best": "V–IX",
    "parking": {
      "it": "a pagamento, limitato",
      "en": "paid, limited",
      "de": "gebührenpflichtig, begrenzt"
    },
    "services": {
      "it": "chiosco estivo",
      "en": "summer kiosk",
      "de": "Sommerkiosk"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "trails": {
      "it": "sentiero verso Porto Giunco",
      "en": "path to Porto Giunco",
      "de": "Weg nach Porto Giunco"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 2,
      "levante": 2,
      "scirocco": 3,
      "ostro": 3,
      "libeccio": 4,
      "ponente": 5,
      "maestrale": 4
    },
    "desc": {
      "it": "La spiaggia «a cavallino», cartolina di Villasimius.",
      "en": "The postcard beach of Villasimius.",
      "de": "Die Postkarten-Bucht von Villasimius."
    },
    "go": {
      "it": "Giugno o settembre: bellezza senza folla.",
      "en": "June or September: beauty without crowds.",
      "de": "Juni oder September: schön ohne Andrang."
    },
    "avoid": {
      "it": "Ad agosto dopo le 10:30 e con grecale.",
      "en": "August after 10:30 and with grecale wind.",
      "de": "Im August nach 10:30 und bei Grecale."
    }
  },
  {
    "id": "simius",
    "name": "Simius",
    "facing": "S·SE",
    "tags": [],
    "driveMin": 70,
    "driveKm": 50,
    "crowd": 5,
    "type": {
      "it": "sabbia bianca fine",
      "en": "fine white sand",
      "de": "feiner weißer Sand"
    },
    "coords": [
      39.13,
      9.52
    ],
    "best": "V–X",
    "parking": {
      "it": "ampio a pagamento",
      "en": "large paid lot",
      "de": "großer Parkplatz (kostenpflichtig)"
    },
    "services": {
      "it": "completi",
      "en": "full",
      "de": "voll"
    },
    "access": {
      "it": "facilissimo",
      "en": "very easy",
      "de": "sehr leicht"
    },
    "food": {
      "it": "molti lidi",
      "en": "many beach clubs",
      "de": "viele Strandbars"
    },
    "trails": {
      "it": "promontorio di Campu Longu",
      "en": "Campu Longu headland",
      "de": "Kap Campu Longu"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 3,
      "levante": 2,
      "scirocco": 1,
      "ostro": 2,
      "libeccio": 2,
      "ponente": 3,
      "maestrale": 4
    },
    "desc": {
      "it": "Grande spiaggia davanti all’Isola dei Cavoli.",
      "en": "Big beach facing the Cavoli islet.",
      "de": "Großer Strand vor der Isola dei Cavoli."
    },
    "go": {
      "it": "Fuori stagione o presto al mattino.",
      "en": "Off-season or early morning.",
      "de": "Nebensaison oder früh morgens."
    },
    "avoid": {
      "it": "Con scirocco: acqua torbida e onda.",
      "en": "With scirocco: murky, wavy water.",
      "de": "Bei Scirocco: trübes, welliges Wasser."
    }
  },
  {
    "id": "porto_giunco",
    "name": "Porto Giunco",
    "facing": "S·SO",
    "tags": [],
    "driveMin": 75,
    "driveKm": 54,
    "crowd": 4,
    "type": {
      "it": "sabbia chiara e stagno Notteri",
      "en": "light sand plus Notteri pond",
      "de": "heller Sand und Notteri-Teich"
    },
    "coords": [
      39.109,
      9.512
    ],
    "best": "V–X",
    "parking": {
      "it": "a pagamento",
      "en": "paid",
      "de": "kostenpflichtig"
    },
    "services": {
      "it": "buoni",
      "en": "good",
      "de": "gut"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "sì",
      "en": "yes",
      "de": "ja"
    },
    "trails": {
      "it": "salita al promontorio; fenicotteri allo stagno",
      "en": "headland climb; flamingos on the pond",
      "de": "Aufstieg zum Kap; Flamingos am Teich"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 4,
      "levante": 3,
      "scirocco": 2,
      "ostro": 2,
      "libeccio": 1,
      "ponente": 3,
      "maestrale": 5
    },
    "desc": {
      "it": "Acque basse smeraldo e fenicotteri nello stagno retrostante.",
      "en": "Shallow emerald water plus flamingos in the pond behind.",
      "de": "Flaches Smaragdwasser, Flamingos im dahinterliegenden Teich."
    },
    "go": {
      "it": "Con libeccio o ostro resta riparata.",
      "en": "With libeccio or ostro it stays sheltered.",
      "de": "Bei Libeccio oder Ostro bleibt sie geschützt."
    },
    "avoid": {
      "it": "Ad agosto a mezzogiorno: presa d’assedio.",
      "en": "August midday: besieged.",
      "de": "August mittags: belagert."
    }
  },
  {
    "id": "sinzias",
    "name": "Cala Sinzias",
    "facing": "E·SE",
    "tags": [],
    "driveMin": 80,
    "driveKm": 62,
    "crowd": 3,
    "type": {
      "it": "baia ampia di sabbia",
      "en": "wide sandy bay",
      "de": "weite Sandbucht"
    },
    "coords": [
      39.256,
      9.576
    ],
    "best": "V–X",
    "parking": {
      "it": "lungo la strada",
      "en": "roadside",
      "de": "am Straßenrand"
    },
    "services": {
      "it": "buoni",
      "en": "good",
      "de": "gut"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "hotel e chioschi",
      "en": "hotels and kiosks",
      "de": "Hotels und Kioske"
    },
    "trails": {
      "it": "sentiero litoraneo verso Costa Rei",
      "en": "coast path to Costa Rei",
      "de": "Küstenweg nach Costa Rei"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 2,
      "levante": 1,
      "scirocco": 1,
      "ostro": 3,
      "libeccio": 4,
      "ponente": 5,
      "maestrale": 5
    },
    "desc": {
      "it": "Baia familiare e riparata: la nostra scelta sicura a est.",
      "en": "Family-friendly sheltered bay: our safe bet to the east.",
      "de": "Familienfreundliche, geschützte Bucht – unsere sichere Wahl im Osten."
    },
    "go": {
      "it": "In qualsiasi giornata di maestrale.",
      "en": "On any maestrale day.",
      "de": "An jedem Maestrale-Tag."
    },
    "avoid": {
      "it": "Con levante forte: onda e alghe.",
      "en": "Strong levante brings waves and seaweed.",
      "de": "Starker Levante bringt Wellen und Tang."
    }
  },
  {
    "id": "costa_rei",
    "name": "Costa Rei",
    "facing": "SE",
    "tags": [],
    "driveMin": 85,
    "driveKm": 66,
    "crowd": 4,
    "type": {
      "it": "12 km di sabbia dorata",
      "en": "12 km of golden sand",
      "de": "12 km goldener Sand"
    },
    "coords": [
      39.301,
      9.606
    ],
    "best": "V–X",
    "parking": {
      "it": "ampio",
      "en": "ample",
      "de": "reichlich"
    },
    "services": {
      "it": "completi",
      "en": "full",
      "de": "voll"
    },
    "access": {
      "it": "facilissimo",
      "en": "very easy",
      "de": "sehr leicht"
    },
    "food": {
      "it": "molti",
      "en": "many",
      "de": "viele"
    },
    "trails": {
      "it": "scoglio Peppino, Monte Nai",
      "en": "Peppino rock, Monte Nai",
      "de": "Fels Peppino, Monte Nai"
    },
    "wind": {
      "tramontana": 3,
      "grecale": 3,
      "levante": 2,
      "scirocco": 1,
      "ostro": 2,
      "libeccio": 2,
      "ponente": 3,
      "maestrale": 4
    },
    "desc": {
      "it": "Chilometri di sabbia, spazio per tutti.",
      "en": "Kilometres of sand, room for everyone.",
      "de": "Kilometer Sand, Platz für alle."
    },
    "go": {
      "it": "Settembre: mare calmo e caldo.",
      "en": "September: calm, warm sea.",
      "de": "September: ruhiges, warmes Meer."
    },
    "avoid": {
      "it": "Scirocco (mare torbido) e sabati d’agosto.",
      "en": "Scirocco (murky sea) and August Saturdays.",
      "de": "Scirocco (trübe See) und August-Samstage."
    }
  },
  {
    "id": "chia",
    "name": "Chia · Su Giudeu",
    "facing": "S·SO",
    "tags": [],
    "driveMin": 60,
    "driveKm": 55,
    "crowd": 4,
    "type": {
      "it": "dune e sabbia chiara",
      "en": "dunes and pale sand",
      "de": "Dünen und heller Sand"
    },
    "coords": [
      38.898,
      8.879
    ],
    "best": "V–X",
    "parking": {
      "it": "a pagamento",
      "en": "paid",
      "de": "kostenpflichtig"
    },
    "services": {
      "it": "buoni",
      "en": "good",
      "de": "gut"
    },
    "access": {
      "it": "passerelle sulle dune",
      "en": "boardwalks over the dunes",
      "de": "Bohlenwege über die Dünen"
    },
    "food": {
      "it": "chioschi",
      "en": "kiosks",
      "de": "Kioske"
    },
    "trails": {
      "it": "torre spagnola; sito punicao di Bithia",
      "en": "Spanish tower; Bithia Punic site",
      "de": "Spanischer Turm; punische Stätte Bithia"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 4,
      "levante": 3,
      "scirocco": 2,
      "ostro": 1,
      "libeccio": 1,
      "ponente": 3,
      "maestrale": 5
    },
    "desc": {
      "it": "Dune, fenicotteri e la darsena dei fenici: la nostra preferita a sud-ovest.",
      "en": "Dunes, flamingos and the old Phoenician cove — our SW favourite.",
      "de": "Dünen, Flamingos, phönizische Bucht – unser Favorit im Südwesten."
    },
    "go": {
      "it": "Nelle giornate di maestrale: acqua da vetrata.",
      "en": "Maestrale days: glassy water.",
      "de": "Maestrale-Tage: glatt wie Glas."
    },
    "avoid": {
      "it": "Con libeccio o ostro: onda e sabbia volante.",
      "en": "With libeccio/ostro: surf and flying sand.",
      "de": "Bei Libeccio/Ostro: Brandung und Sandflug."
    }
  },
  {
    "id": "tuerredda",
    "name": "Tuerredda",
    "facing": "S·SO",
    "tags": [],
    "driveMin": 75,
    "driveKm": 63,
    "crowd": 4,
    "type": {
      "it": "baia caraibica con isoletta",
      "en": "Caribbean bay with islet",
      "de": "Karibikbucht mit Inselchen"
    },
    "coords": [
      38.932,
      8.861
    ],
    "best": "V–X",
    "parking": {
      "it": "limitato a pagamento",
      "en": "limited, paid",
      "de": "begrenzt, kostenpflichtig"
    },
    "services": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "trails": {
      "it": "sentiero verso Cala Piombo",
      "en": "trail to Cala Piombo",
      "de": "Weg zur Cala Piombo"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 4,
      "levante": 3,
      "scirocco": 2,
      "ostro": 2,
      "libeccio": 2,
      "ponente": 3,
      "maestrale": 5
    },
    "desc": {
      "it": "La baia più fotogenica del Sud, con isoletta davanti.",
      "en": "The South’s most photogenic bay with a tiny islet offshore.",
      "de": "Die fotogenste Bucht des Südens, mit Mini-Insel davor."
    },
    "go": {
      "it": "Maggio, giugno, settembre.",
      "en": "May, June, September.",
      "de": "Mai, Juni, September."
    },
    "avoid": {
      "it": "Ad agosto i posti finiscono entro le 10.",
      "en": "In August spots are gone by 10 am.",
      "de": "Im August sind die Plätze um 10 vergeben."
    }
  },
  {
    "id": "is_arutas",
    "name": "Is Arutas",
    "facing": "O·NO",
    "tags": [],
    "driveMin": 95,
    "driveKm": 92,
    "crowd": 4,
    "type": {
      "it": "sabbia di quarzo «a chicchi di riso»",
      "en": "rice-grain quartz sand",
      "de": "Quarzsand wie Reiskörner"
    },
    "coords": [
      39.908,
      8.403
    ],
    "best": "IV–X",
    "parking": {
      "it": "a pagamento",
      "en": "paid",
      "de": "kostenpflichtig"
    },
    "services": {
      "it": "chioschi",
      "en": "kiosks",
      "de": "Kioske"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "sì",
      "en": "yes",
      "de": "ja"
    },
    "trails": {
      "it": "Capo San Marco e sito di Tharros vicini",
      "en": "Capo San Marco and Tharros nearby",
      "de": "Capo San Marco und Tharros nah"
    },
    "wind": {
      "tramontana": 2,
      "grecale": 3,
      "levante": 5,
      "scirocco": 4,
      "ostro": 3,
      "libeccio": 2,
      "ponente": 1,
      "maestrale": 1
    },
    "desc": {
      "it": "Sabbia di quarzo color riso e mare verde smeraldo.",
      "en": "Rice-grain quartz sand and an emerald sea.",
      "de": "Quarzsand wie Reiskörner, smaragdgrünes Meer."
    },
    "go": {
      "it": "Con levante o scirocco; combinala con Tharros.",
      "en": "With levante or scirocco; pair it with Tharros.",
      "de": "Bei Levante oder Scirocco; kombiniere Tharros."
    },
    "avoid": {
      "it": "Assolutamente col maestrale: onde enormi. Il quarzo non si porta via.",
      "en": "Never with maestrale: huge waves. Don’t take the quartz!",
      "de": "Nie bei Maestrale: hohe Wellen. Quarz nicht mitnehmen!"
    }
  },
  {
    "id": "san_giovanni_sinis",
    "name": "San Giovanni di Sinis",
    "facing": "O",
    "tags": [],
    "driveMin": 90,
    "driveKm": 88,
    "crowd": 3,
    "type": {
      "it": "baia di pescatori",
      "en": "fishermen’s bay",
      "de": "Fischerbucht"
    },
    "coords": [
      39.879,
      8.416
    ],
    "best": "V–X",
    "parking": {
      "it": "vicino",
      "en": "nearby",
      "de": "in der Nähe"
    },
    "services": {
      "it": "essenziali",
      "en": "basic",
      "de": "grundlegend"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "ristoranti di pesce",
      "en": "seafood restaurants",
      "de": "Fischrestaurants"
    },
    "trails": {
      "it": "chiesa paleocristiana sulla spiaggia",
      "en": "early-Christian church on the beach",
      "de": "paläochristliche Kirche am Strand"
    },
    "wind": {
      "tramontana": 3,
      "grecale": 3,
      "levante": 4,
      "scirocco": 4,
      "ostro": 3,
      "libeccio": 2,
      "ponente": 1,
      "maestrale": 2
    },
    "desc": {
      "it": "Baia di pescatori con una chiesa del V secolo sulla riva.",
      "en": "Fishermen’s bay with a 5th-century church on the shore.",
      "de": "Fischerbucht mit einer Kirche aus dem 5. Jh. am Ufer."
    },
    "go": {
      "it": "Giornate di ponente o maestrale, con pranzo di pesce.",
      "en": "Ponente/maestrale days, with a fish lunch.",
      "de": "Ponente-/Maestrale-Tage, mit Fischessen."
    },
    "avoid": {
      "it": "Ponente forte: la baia si riempie d’onda.",
      "en": "Strong ponente fills the bay with surf.",
      "de": "Starker Ponente füllt die Bucht mit Brandung."
    }
  },
  {
    "id": "pelosa",
    "name": "La Pelosa",
    "facing": "NO·N",
    "tags": [],
    "driveMin": 210,
    "driveKm": 250,
    "crowd": 5,
    "type": {
      "it": "sabbia bianca, acqua tropicale",
      "en": "white sand, tropical water",
      "de": "weißer Sand, türkises Wasser"
    },
    "coords": [
      40.944,
      8.193
    ],
    "best": "V–X",
    "parking": {
      "it": "a pagamento a Stintino",
      "en": "paid in Stintino",
      "de": "kostenpflichtig in Stintino"
    },
    "services": {
      "it": "completi",
      "en": "full",
      "de": "voll"
    },
    "access": {
      "it": "facile · PRENOTAZIONE OBBLIGATORIA 15 mag–15 ott (spiaggialapelosa.it)",
      "en": "easy · BOOKING REQUIRED May 15–Oct 15 (spiaggialapelosa.it)",
      "de": "leicht · BUCHUNG PFLICHT 15. Mai–15. Okt (spiaggialapelosa.it)"
    },
    "food": {
      "it": "sì",
      "en": "yes",
      "de": "ja"
    },
    "trails": {
      "it": "Capo Falcone e torre spagnola",
      "en": "Capo Falcone and the Spanish tower",
      "de": "Capo Falcone und spanischer Turm"
    },
    "wind": {
      "tramontana": 2,
      "grecale": 3,
      "levante": 4,
      "scirocco": 4,
      "ostro": 4,
      "libeccio": 2,
      "ponente": 2,
      "maestrale": 1
    },
    "desc": {
      "it": "La spiaggia più celebre d’Italia, davanti all’Asinara.",
      "en": "Italy’s most famous beach, facing Asinara.",
      "de": "Italiens berühmtester Strand, vor Asinara."
    },
    "go": {
      "it": "Maggio, giugno, settembre prenotando online con largo anticipo.",
      "en": "May, June, September — book online well ahead.",
      "de": "Mai, Juni, September – unbedingt früh online buchen."
    },
    "avoid": {
      "it": "Col maestrale (risacca) e ad agosto senza prenotazione.",
      "en": "With maestrale (swell) and in book-less August.",
      "de": "Bei Maestrale (Dünung) und im August ohne Buchung."
    }
  },
  {
    "id": "brandinchi",
    "name": "Cala Brandinchi",
    "facing": "N·NE",
    "tags": [],
    "driveMin": 165,
    "driveKm": 260,
    "crowd": 4,
    "type": {
      "it": "«Piccola Tahiti»: basse acque turchesi",
      "en": "“Little Tahiti”: turquoise shallows",
      "de": "„Klein-Tahiti“: türkise Flachufer"
    },
    "coords": [
      40.779,
      9.548
    ],
    "best": "V–X",
    "parking": {
      "it": "a pagamento, limitato",
      "en": "paid, limited",
      "de": "kostenpflichtig, begrenzt"
    },
    "services": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "access": {
      "it": "facile",
      "en": "easy",
      "de": "leicht"
    },
    "food": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "trails": {
      "it": "anello di Capo Coda Cavallo",
      "en": "Capo Coda Cavallo loop",
      "de": "Rundweg Capo Coda Cavallo"
    },
    "wind": {
      "tramontana": 2,
      "grecale": 1,
      "levante": 3,
      "scirocco": 4,
      "ostro": 4,
      "libeccio": 4,
      "ponente": 4,
      "maestrale": 4
    },
    "desc": {
      "it": "Acque bassissime turchesi tra la macchia a ginepro.",
      "en": "Turquoise shallows amid juniper scrub.",
      "de": "Türkise Flachufer zwischen Wacholder."
    },
    "go": {
      "it": "Giornate di grecale o tramontana: resta uno specchio.",
      "en": "Grecale or tramontana days: mirror-calm.",
      "de": "Grecale-/Tramontana-Tage: spiegelglatt."
    },
    "avoid": {
      "it": "Agosto: ingressi contingentati, arrivare alle 9.",
      "en": "August: capped entries, arrive at 9.",
      "de": "August: begrenzte Zufahrt, um 9 da sein."
    }
  },
  {
    "id": "cala_luna",
    "name": "Cala Luna",
    "facing": "E",
    "tags": [
      "hidden"
    ],
    "driveMin": 130,
    "driveKm": 160,
    "crowd": 3,
    "type": {
      "it": "grotte e ghiaioni bianchi sotto pareti di 500 m",
      "en": "caves and white scree under 500 m cliffs",
      "de": "Grotten und weißer Schutt unter 500-m-Wänden"
    },
    "coords": [
      40.24,
      9.685
    ],
    "best": "V–X",
    "parking": {
      "it": "a Cala Fuili o Cala Gonone",
      "en": "at Cala Fuili or Cala Gonone",
      "de": "in Cala Fuili oder Cala Gonone"
    },
    "services": {
      "it": "chiosco estivo",
      "en": "summer kiosk",
      "de": "Sommerkiosk"
    },
    "access": {
      "it": "escursione (1h30) o gommone",
      "en": "hike (1h30) or dinghy",
      "de": "Wanderung (1h30) oder Schlauchboot"
    },
    "food": {
      "it": "chiosco",
      "en": "kiosk",
      "de": "Kiosk"
    },
    "trails": {
      "it": "sentiero dal golfo di Orosei",
      "en": "trail from the Gulf of Orosei",
      "de": "Weg vom Golf von Orosei"
    },
    "wind": {
      "tramontana": 4,
      "grecale": 2,
      "levante": 1,
      "scirocco": 2,
      "ostro": 3,
      "libeccio": 3,
      "ponente": 4,
      "maestrale": 5
    },
    "desc": {
      "it": "Pareti altissime, grotte e acqua iridescente: il Golfo di Orosei.",
      "en": "Towering cliffs, caves, iridescent water: the Gulf of Orosei.",
      "de": "Hohe Wände, Grotten, schillerndes Wasser: der Golf von Orosei."
    },
    "go": {
      "it": "Giornate di maestrale o ponente.",
      "en": "Maestrale or ponente days.",
      "de": "Maestrale- oder Ponententage."
    },
    "avoid": {
      "it": "Con levante forte: mare mosso e traghetti fermi.",
      "en": "With strong levante: rough sea, boats stop.",
      "de": "Bei starkem Levante: raue See, Boote stehen."
    }
  }
];
const GEMS = [
  {
    "id": "sunuraxi",
    "cats": [
      "archeo",
      "storia"
    ],
    "name": "Su Nuraxi di Barumini",
    "place": {
      "it": "Barumini (Marmilla)",
      "en": "Barumini (Marmilla)",
      "de": "Barumini (Marmilla)"
    },
    "coords": [
      39.704,
      8.992
    ],
    "driveMin": 55,
    "crowd": 4,
    "period": null,
    "story": false,
    "why": {
      "it": "Il sito nuragico più importante al mondo, Patrimonio UNESCO dal 1997.",
      "en": "The world’s most important nuragic site, UNESCO-listed since 1997.",
      "de": "Die wichtigste Nuragen-Stätte der Welt, UNESCO-Welterbe seit 1997."
    },
    "curio": {
      "it": "Scavato per decenni da Giovanni Lilliu, che svelò l’età nuragica; la torre centrale è alta quasi 19 metri.",
      "en": "Excavated for decades by Giovanni Lilliu, who revealed the Nuragic age; the central tower stands nearly 19 m tall.",
      "de": "Jahrzehntelang ausgegraben von Giovanni Lilliu; der Hauptturm ist fast 19 m hoch."
    },
    "see": {
      "it": "Mastio centrale a tholos e intero villaggio di capanne; visita guidata obbligatoria ogni 30 minuti.",
      "en": "Central tholos tower plus a whole hut village; guided tours every 30 min.",
      "de": "Zentraler Tholos-Turm und Dorf; Führungen alle 30 Min."
    },
    "taste": {
      "it": "Seadas e Cannonau negli agriturismi di Barumini.",
      "en": "Seadas and Cannonau at Barumini farm restaurants.",
      "de": "Seadas und Cannonau in den Agriturismi von Barumini."
    },
    "rec": {
      "it": "Arriva all’apertura: un solo biglietto comprende anche Casa Zapata.",
      "en": "Come at opening: one ticket also covers Casa Zapata.",
      "de": "Zur Öffnung kommen: ein Ticket gilt auch für Casa Zapata."
    },
    "link": "https://www.fondazionebarumini.it/"
  },
  {
    "id": "arrubiu",
    "cats": [
      "archeo"
    ],
    "name": "Nuraghe Arrubiu",
    "place": {
      "it": "Orroli (Sarcidano)",
      "en": "Orroli (Sarcidano)",
      "de": "Orroli (Sarcidano)"
    },
    "coords": [
      39.675,
      9.174
    ],
    "driveMin": 60,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Il nuraghe più grande d’Europa: 21 torri su 5.000 mq, quasi sempre quasi da soli.",
      "en": "Europe’s largest nuraghe: 21 towers over 5,000 m², usually almost alone.",
      "de": "Europas größter Nurage: 21 Türme auf 5.000 m², meist fast allein."
    },
    "curio": {
      "it": "È detto «rosso» per i licheni sul basalto; il mastio raggiungeva i 27 metri.",
      "en": "Called “red” for the lichen on its basalt; the keep once reached 27 m.",
      "de": "„Rot“ wegen der Flechten auf dem Basalt; der Turm erreichte einst 27 m."
    },
    "see": {
      "it": "Il mastio pentolobato e il cortile centrale.",
      "en": "The five-lobed keep and central courtyard.",
      "de": "Der fünflappige Turm und der Innenhof."
    },
    "taste": {
      "it": "Pecorino e vini del Sarcidano.",
      "en": "Pecorino and Sarcidano wines.",
      "de": "Pecorino und Weine aus dem Sarcidano."
    },
    "rec": {
      "it": "La nostra alternativa «segreta» e silenziosa a Barumini.",
      "en": "Our quiet “secret” alternative to Barumini.",
      "de": "Unsere stille „geheime“ Alternative zu Barumini."
    }
  },
  {
    "id": "cristina",
    "cats": [
      "archeo"
    ],
    "name": "Pozzo sacro di Santa Cristina",
    "place": {
      "it": "Paulilatino",
      "en": "Paulilatino",
      "de": "Paulilatino"
    },
    "coords": [
      40.139,
      8.706
    ],
    "driveMin": 95,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Un tempio-idraulico di 3.000 anni fa perfettamente conservato.",
      "en": "A perfectly preserved hydraulic temple, 3,000 years old.",
      "de": "Ein perfekt erhaltener Wassertempel, 3.000 Jahre alt."
    },
    "curio": {
      "it": "L’acqua in fondo riflette la volta: allineamenti astronomici millimetrici.",
      "en": "Water at the bottom mirrors the vault: pinpoint astronomical alignments.",
      "de": "Das Wasser spiegelt das Gewölbe: millimetergenaue Astronomie."
    },
    "see": {
      "it": "Scala a trapezio e camera sotterranea a ogiva.",
      "en": "Trapezoidal stairway and ogival underground chamber.",
      "de": "Trapezförmige Treppe und spitzgewölbte Kammer."
    },
    "taste": {
      "it": "Vernaccia di Oristano nei dintorni.",
      "en": "Vernaccia di Oristano nearby.",
      "de": "Vernaccia di Oristano aus der Umgebung."
    },
    "rec": {
      "it": "In coppia con Tharros per una giornata di misteri.",
      "en": "Pair with Tharros for a mysteries day.",
      "de": "Mit Tharros kombinieren: Geheimnis-Tag."
    }
  },
  {
    "id": "vittoria_serri",
    "cats": [
      "archeo"
    ],
    "name": "Santuario di Santa Vittoria",
    "place": {
      "it": "Serri (Sarcidano)",
      "en": "Serri (Sarcidano)",
      "de": "Serri (Sarcidano)"
    },
    "coords": [
      39.476,
      9.31
    ],
    "driveMin": 45,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Il più vasto santuario nuragico: pozzo sacro, riunioni, feste.",
      "en": "The widest nuragic sanctuary: sacred well, assemblies, feasts.",
      "de": "Ausgedehntestes Nuragen-Heiligtum: Brunnen, Versammlungen, Feste."
    },
    "curio": {
      "it": "Qui le tribù firmavano paci e celebravano riti comuni.",
      "en": "Tribes sealed peace deals and held shared rites here.",
      "de": "Hier besiegelten Stämme Frieden und feierten gemeinsame Riten."
    },
    "see": {
      "it": "Pozzo sacro e capanna delle riunioni con seduta continua in pietra.",
      "en": "Sacred well and meeting hut with a stone bench ring.",
      "de": "Brunnen und Rundhütte mit Steinbank."
    },
    "taste": {
      "it": "Pane carasau del Sarcidano.",
      "en": "Carasau bread of the Sarcidano.",
      "de": "Carasau-Brot aus dem Sarcidano."
    },
    "rec": {
      "it": "A 45 minuti, quasi mai toccato dal turismo di massa.",
      "en": "45 min away, almost untouched by mass tourism.",
      "de": "45 Min. entfernt, fast ohne Massentourismus."
    }
  },
  {
    "id": "sa_domu_orcu",
    "cats": [
      "archeo"
    ],
    "name": "Tomba dei Giganti Sa Domu ’e S’Orcu",
    "place": {
      "it": "Quartucciu",
      "en": "Quartucciu",
      "de": "Quartucciu"
    },
    "coords": [
      39.246,
      9.193
    ],
    "driveMin": 15,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Una tomba dei giganti a 15 minuti da casa: stele centinatale di sei metri.",
      "en": "A giants’ tomb 15 minutes away: a six-metre centred stele.",
      "de": "Ein Gigantengrab 15 Min. entfernt: sechs Meter zentrale Stele."
    },
    "curio": {
      "it": "Il nome sardo significa «casa dell’orco».",
      "en": "Its Sardinian name means “the ogre’s house”.",
      "de": "Der sardische Name bedeutet „Haus des Ogers“."
    },
    "see": {
      "it": "Esedra semicircolare e la lastra con la «porta del mondo».",
      "en": "Semicircular exedra and the “door of the world” slab.",
      "de": "Halbrunde Exedra und die „Tür der Welt“."
    },
    "taste": {
      "it": "Dopo: culurgiones a Quartucciu.",
      "en": "Afterwards: culurgiones in Quartucciu.",
      "de": "Danach: Culurgiones in Quartucciu."
    },
    "rec": {
      "it": "Perfetta quando vuoi qualcosa di antico senza guidare lontano.",
      "en": "Perfect “something ancient today” without driving far.",
      "de": "Perfekt für „heute etwas Urzeitliches“ ohne weite Fahrt."
    }
  },
  {
    "id": "priu",
    "cats": [
      "archeo",
      "storia"
    ],
    "name": "Domus de janas di Sant’Andrea Priu",
    "place": {
      "it": "Bonorva",
      "en": "Bonorva",
      "de": "Bonorva"
    },
    "coords": [
      40.418,
      8.78
    ],
    "driveMin": 100,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Tombe ipogeiche del IV millennio a.C.; una fu riutilizzata come chiesa bizantina.",
      "en": "Underground tombs from the 4th millennium BC; one reused as a Byzantine church.",
      "de": "Felsgräber aus dem 4. Jahrtausend v. Chr.; eines als byzantinische Kirche genutzt."
    },
    "curio": {
      "it": "Accanto ai simboli magici sopravvivono affreschi medievali.",
      "en": "Medieval frescoes survive beside magical symbols.",
      "de": "Mittelalterliche Fresken neben magischen Symbolen."
    },
    "see": {
      "it": "La tomba «del capo», con pilastri e tetto dipinto.",
      "en": "The “chief’s” tomb, with pillars and painted ceiling.",
      "de": "Das „Häuptlingsgrab“ mit Pfeilern und bemalter Decke."
    },
    "taste": {
      "it": "Formaggi di Bonorva.",
      "en": "Bonorva cheeses.",
      "de": "Käse aus Bonorva."
    },
    "rec": {
      "it": "Uno dei luoghi interni più suggestivi — e deserti.",
      "en": "One of the most atmospheric — and empty — inland sites.",
      "de": "Einer der atmosphärischsten — und leersten — Orte im Landesinneren."
    }
  },
  {
    "id": "monte_sirai",
    "cats": [
      "archeo",
      "storia"
    ],
    "name": "Monte Sirai",
    "place": {
      "it": "Carbonia (Sulcis)",
      "en": "Carbonia (Sulcis)",
      "de": "Carbonia (Sulcis)"
    },
    "coords": [
      39.095,
      8.562
    ],
    "driveMin": 45,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Città fenicio-punica in cima a una meseta, con tofet e necropoli.",
      "en": "Phoenician-Punic town atop a mesa, with tophet and necropolis.",
      "de": "Phönizisch-punische Stadt auf einer Mesa, mit Tofet und Nekropole."
    },
    "curio": {
      "it": "Il tofet conserva urne cinerarie: il rito più discusso del Mediterraneo antico.",
      "en": "Its tophet holds burial urns: the ancient Mediterranean’s most debated rite.",
      "de": "Das Tofet birgt Urnen: der meistdiskutierte Ritus des alten Mittelmeers."
    },
    "see": {
      "it": "Mura puniche, tempio e panorama sull’intero Sulcis.",
      "en": "Punic walls, temple and a panorama over the whole Sulcis.",
      "de": "Punische Mauern, Tempel, Panorama übers Sulcis."
    },
    "taste": {
      "it": "Le panadas carboniesi.",
      "en": "Carbonia’s panadas hand pies.",
      "de": "Panadas aus Carbonia."
    },
    "rec": {
      "it": "Combinalo con le miniere di Nebida nello stesso giorno.",
      "en": "Combine with the Nebida mines the same day.",
      "de": "Am selben Tag mit den Minen von Nebida kombinieren."
    }
  },
  {
    "id": "nora",
    "cats": [
      "archeo",
      "storia"
    ],
    "name": "Nora",
    "place": {
      "it": "Pula",
      "en": "Pula",
      "de": "Pula"
    },
    "coords": [
      38.986,
      9.007
    ],
    "driveMin": 35,
    "crowd": 3,
    "period": null,
    "story": false,
    "why": {
      "it": "La più antica città documentata di Sardegna: fondata dai fenici, fiorente sotto Roma.",
      "en": "Sardinia’s oldest documented city: Phoenician-founded, flourishing under Rome.",
      "de": "Sardiniens älteste dokumentierte Stadt: phönizisch gegründet, blühend unter Rom."
    },
    "curio": {
      "it": "La stele di Nora (IX sec. a.C.) è considerata la più antica iscrizione dell’Occidente.",
      "en": "The Nora Stone (9th c. BC) is held to be the West’s earliest inscription.",
      "de": "Der Norastein (9. Jh. v. Chr.) gilt als älteste Inschrift des Westens."
    },
    "see": {
      "it": "Teatro romano, mosaici e terme; parte della città è sommersa.",
      "en": "Roman theatre, mosaics, baths; part of the city is underwater.",
      "de": "Römisches Theater, Mosaike, Thermen; Teil der Stadt ist versunken."
    },
    "taste": {
      "it": "A Pula: fregola con arselle.",
      "en": "In Pula: fregula with clams.",
      "de": "In Pula: Fregula mit Venusmuscheln."
    },
    "rec": {
      "it": "Bonus: Sant’Efisio passa qui il 3 maggio. Biglietti su fondazionepulacultura.it.",
      "en": "Bonus: Sant’Efisio passes here on May 3rd. Tickets via fondazionepulacultura.it.",
      "de": "Bonus: Sant’Efisio zieht am 3. Mai hier vorbei. Tickets auf fondazionepulacultura.it."
    },
    "link": "https://www.fondazionepulacultura.it/"
  },
  {
    "id": "bithia",
    "cats": [
      "archeo"
    ],
    "name": "Bithia",
    "place": {
      "it": "Chia",
      "en": "Chia",
      "de": "Chia"
    },
    "coords": [
      38.887,
      8.882
    ],
    "driveMin": 60,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Città punica nascosta attorno alla torre spagnola, sopra la spiaggia.",
      "en": "A Punic city hiding around the Spanish tower, right above the beach.",
      "de": "Punische Stadt rund um den spanischen Turm, direkt über dem Strand."
    },
    "curio": {
      "it": "Il suo tofet era ancora in uso quando Roma conquistò l’isola.",
      "en": "Its tophet was still in use when Rome took the island.",
      "de": "Sein Tofet war noch in Gebrauch, als Rom die Insel eroberte."
    },
    "see": {
      "it": "Resti tra la pineta e il colle della torre.",
      "en": "Remains between the pine grove and the tower hill.",
      "de": "Reste zwischen Pinienhain und Turmhügel."
    },
    "taste": {
      "it": "Dopo la spiaggia: bottarga e vermentino a Chia.",
      "en": "After the beach: bottarga and vermentino in Chia.",
      "de": "Nach dem Baden: Bottarga und Vermentino in Chia."
    },
    "rec": {
      "it": "Archeologia gratis dentro una giornata di mare.",
      "en": "Free archaeology inside a beach day.",
      "de": "Gratis-Archäologie innerhalb eines Badetags."
    }
  },
  {
    "id": "sinis_church",
    "cats": [
      "storia",
      "archeo"
    ],
    "name": "San Giovanni di Sinis",
    "place": {
      "it": "Cabras",
      "en": "Cabras",
      "de": "Cabras"
    },
    "coords": [
      39.879,
      8.416
    ],
    "driveMin": 90,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "La chiesa più antica di Sardegna: V–VI secolo, costruita sul mare.",
      "en": "Sardinia’s oldest church: 5th–6th century, built by the sea.",
      "de": "Sardiniens älteste Kirche: 5.–6. Jh., am Meer gebaut."
    },
    "curio": {
      "it": "Eretta con materiali di Tharros: colonne romane incastonate nei muri.",
      "en": "Raised with spoils from Tharros: Roman columns set into its walls.",
      "de": "Errichtet mit Spolien aus Tharros: römische Säulen in den Mauern."
    },
    "see": {
      "it": "Abside e il silenzio della penisola del Sinis.",
      "en": "The apse and the silence of the Sinis peninsula.",
      "de": "Apsis und die Stille der Sinis-Halbinsel."
    },
    "taste": {
      "it": "Bottarga di muggine di Cabras.",
      "en": "Grey-mullet bottarga from Cabras.",
      "de": "Bottarga vom Graumulier aus Cabras."
    },
    "rec": {
      "it": "Abbinata a Is Arutas rende perfetta la giornata verso Oristano.",
      "en": "With Is Arutas it perfects an Oristano day.",
      "de": "Mit Is Arutas perfekt für einen Oristano-Tag."
    }
  },
  {
    "id": "saturnino",
    "cats": [
      "storia"
    ],
    "name": "Basilica di San Saturnino",
    "place": {
      "it": "Cagliari",
      "en": "Cagliari",
      "de": "Cagliari"
    },
    "coords": [
      39.222,
      9.121
    ],
    "driveMin": 10,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Capolavoro paleocristiano-bizantino nel cuore della città.",
      "en": "Early-Christian Byzantine masterpiece in the heart of town.",
      "de": "Paläochristlich-byzantinisches Meisterwerk mitten in der Stadt."
    },
    "curio": {
      "it": "Intitolata al patrono di Cagliari, martirizzato in età romana.",
      "en": "Named for Cagliari’s patron, martyred in Roman times.",
      "de": "Benannt nach dem Stadtpatron, Märtyrer in römischer Zeit."
    },
    "see": {
      "it": "Pianta a croce greca con quattro absidi trilobati.",
      "en": "Greek-cross plan with four trefoil apses.",
      "de": "Kreuzförmiger Grundriss mit vier Kleeblattapsiden."
    },
    "taste": {
      "it": "Poi: un vermentino a Stampace.",
      "en": "Then: a vermentino in Stampace.",
      "de": "Danach: ein Vermentino in Stampace."
    },
    "rec": {
      "it": "Dieci minuti e sei tremila anni indietro.",
      "en": "Ten minutes and you’re millennia back.",
      "de": "Zehn Minuten und du bist Jahrtausende zurück."
    }
  },
  {
    "id": "sorres",
    "cats": [
      "storia"
    ],
    "name": "San Pietro di Sorres",
    "place": {
      "it": "Borutta (Meilogu)",
      "en": "Borutta (Meilogu)",
      "de": "Borutta (Meilogu)"
    },
    "coords": [
      40.548,
      8.75
    ],
    "driveMin": 110,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Cattedrale romanica dei giudici di Torres, su uno sperone di trachite.",
      "en": "Romanesque cathedral of the Torres judges, on a trachyte spur.",
      "de": "Romanische Kathedrale der Torres-Richter auf einem Trachytsporn."
    },
    "curio": {
      "it": "Oggi ospita una piccola comunità monastica.",
      "en": "Today it hosts a small monastic community.",
      "de": "Heute beherbergt sie eine kleine Klostergemeinde."
    },
    "see": {
      "it": "Facciata bicroma e il bosco sottostante.",
      "en": "Two-tone facade and the woods below.",
      "de": "Zweifarbige Fassade und der Wald darunter."
    },
    "taste": {
      "it": "I vini del Meilogu.",
      "en": "The wines of Meilogu.",
      "de": "Die Weine des Meilogu."
    },
    "rec": {
      "it": "Silenzio assoluto, quasi nessun turista.",
      "en": "Absolute silence, hardly any tourists.",
      "de": "Absolute Stille, kaum Touristen."
    }
  },
  {
    "id": "acquafredda",
    "cats": [
      "storia"
    ],
    "name": "Castello di Acquafredda",
    "place": {
      "it": "Siliqua",
      "en": "Siliqua",
      "de": "Siliqua"
    },
    "coords": [
      39.283,
      8.78
    ],
    "driveMin": 35,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Rocca su un monolite di trachite: contesa tra giudicati e pisani.",
      "en": "Fortress on a trachyte monolith: contested between judges and Pisans.",
      "de": "Burg auf einem Trachytmonolithen: umkämpft zwischen Richtern und Pisanern."
    },
    "curio": {
      "it": "Secondo la leggenda vi morì prigioniera la figlia del conte Ugolino.",
      "en": "Legend says Count Ugolino’s daughter died imprisoned here.",
      "de": "Legende: Die Tochter des Grafen Ugolino starb hier gefangen."
    },
    "see": {
      "it": "Torre del maschio e panorama su Campidano e Monte Arci.",
      "en": "The keep and views over the Campidano plain and Monte Arci.",
      "de": "Bergfried und Blick über die Campidano-Ebene und den Monte Arci."
    },
    "taste": {
      "it": "A Siliqua: panadas e malloreddus.",
      "en": "In Siliqua: panadas and malloreddus.",
      "de": "In Siliqua: Panadas und Malloreddus."
    },
    "rec": {
      "it": "Visibile persino dall’autostrada: merita la deviazione.",
      "en": "Visible even from the motorway: worth the detour.",
      "de": "Schon von der Autobahn sichtbar: Abstecher wert."
    }
  },
  {
    "id": "monreale",
    "cats": [
      "storia"
    ],
    "name": "Santa Maria di Monreale",
    "place": {
      "it": "Sardara",
      "en": "Sardara",
      "de": "Sardara"
    },
    "coords": [
      39.562,
      8.913
    ],
    "driveMin": 50,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "La «cattedrale dei giudici» di Arborea ai piedi del colle del loro castello.",
      "en": "The Arborea judges’ cathedral beneath their castle hill.",
      "de": "Die Kathedrale der Richter von Arborea unter ihrer Burghöhe."
    },
    "curio": {
      "it": "In quest’area si riuniva la Curia de Logu, l’assemblea legata a Eleonora d’Arborea.",
      "en": "The Curia de Logu, the assembly linked to Eleanor of Arborea, met in this area.",
      "de": "Hier tagte die Curia de Logu, die Versammlung um Eleonore von Arborea."
    },
    "see": {
      "it": "Absidi gotico-pisani e il borgo di case in mattoni crudi.",
      "en": "Gothic-Pisan apses and the adobe village houses.",
      "de": "Gotisch-pisanische Apsiden und Lehmhäuser."
    },
    "taste": {
      "it": "Pane di Sardara e dolci di mandorla.",
      "en": "Sardara bread and almond sweets.",
      "de": "Brot aus Sardara und Mandelgebäck."
    },
    "rec": {
      "it": "Cuore della Marmilla: abbinala a Barumini o alla Giara.",
      "en": "Heart of the Marmilla: pair it with Barumini or the Giara.",
      "de": "Herz der Marmilla: kombiniere Barumini oder die Giara."
    }
  },
  {
    "id": "montevecchio",
    "cats": [
      "storia",
      "natura"
    ],
    "name": "Miniere di Montevecchio",
    "place": {
      "it": "Guspini/Arbus",
      "en": "Guspini/Arbus",
      "de": "Guspini/Arbus"
    },
    "coords": [
      39.577,
      8.66
    ],
    "driveMin": 75,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Un intero regno minerario ottocentesco: palazzi, officine, gallerie.",
      "en": "A whole 19th-century mining realm: palaces, workshops, tunnels.",
      "de": "Ein ganzes Bergbaureich des 19. Jh.: Paläste, Werkstätten, Stollen."
    },
    "curio": {
      "it": "Zinco e piombo di Montevecchio raggiungevano tutta Europa.",
      "en": "Montevecchio zinc and lead reached all of Europe.",
      "de": "Zink und Blei aus Montevecchio gingen nach ganz Europa."
    },
    "see": {
      "it": "Palazzo della Direzione, lavatoio e gallerie (visite guidate).",
      "en": "Director’s palace, washery and tunnels (guided visits).",
      "de": "Direktionspalast, Waschanlage, Stollen (führungen)."
    },
    "taste": {
      "it": "Cucina mineraria: pane, pomodoro e pecorino.",
      "en": "Miners’ cuisine: bread, tomato, pecorino.",
      "de": "Minerküche: Brot, Tomate, Pecorino."
    },
    "rec": {
      "it": "Combinalo con le dune di Piscinas al tramonto.",
      "en": "Combine with the Piscinas dunes at sunset.",
      "de": "Mit den Piscinas-Dünen zum Sonnenuntergang kombinieren."
    }
  },
  {
    "id": "nebida",
    "cats": [
      "storia",
      "natura"
    ],
    "name": "Belvedere di Nebida e Pan di Zucchero",
    "place": {
      "it": "Iglesias (Sulcis)",
      "en": "Iglesias (Sulcis)",
      "de": "Iglesias (Sulcis)"
    },
    "coords": [
      39.306,
      8.417
    ],
    "driveMin": 55,
    "crowd": 2,
    "period": null,
    "story": true,
    "why": {
      "it": "Il mare che incontra le miniere: il faraglione più alto d’Europa.",
      "en": "Where sea meets mines: Europe’s tallest sea stack.",
      "de": "Wo Meer auf Mine trifft: Europas höchster Küstenfels."
    },
    "curio": {
      "it": "I minatori raggiungevano in barca le gallerie sul livello del mare a Masua.",
      "en": "Miners reached sea-level galleries by boat at Masua.",
      "de": "Bergleute erreichten per Boot die Stollen am Meer in Masua."
    },
    "see": {
      "it": "Terrazza della Laveria Lamarmora al tramonto.",
      "en": "The Laveria Lamarmora terrace at sunset.",
      "de": "Terrasse Laveria Lamarmora beim Sonnenuntergang."
    },
    "taste": {
      "it": "Culurgiones e Carignano del Sulcis.",
      "en": "Culurgiones and Carignano del Sulcis.",
      "de": "Culurgiones und Carignano del Sulcis."
    },
    "rec": {
      "it": "Il tramonto più scenografico a meno di un’ora da casa.",
      "en": "The most scenic sunset within an hour of home.",
      "de": "Der schönste Sonnenuntergang unter einer Stunde von zu Hause."
    }
  },
  {
    "id": "sansperate",
    "cats": [
      "storia",
      "borgo",
      "eno"
    ],
    "name": "San Sperate, paese museo",
    "place": {
      "it": "San Sperate (Campidano)",
      "en": "San Sperate (Campidano)",
      "de": "San Sperate (Campidano)"
    },
    "coords": [
      39.335,
      9.043
    ],
    "driveMin": 25,
    "crowd": 2,
    "period": null,
    "story": true,
    "why": {
      "it": "Centinaia di murales e le pietre sonore di Pinuccio Sciola.",
      "en": "Hundreds of murals plus Pinuccio Sciola’s sounding stones.",
      "de": "Hunderte Murales und Pinuccio Sciolas klingende Steine."
    },
    "curio": {
      "it": "Sciola espose le sue pietre sonore alla Biennale di Venezia; ancora oggi vibrano se le tocchi.",
      "en": "Sciola showed his sounding stones at the Venice Biennale; they still hum when touched.",
      "de": "Sciola zeigte seine klingenden Steine auf der Biennale von Venedig; sie vibrieren bis heute."
    },
    "see": {
      "it": "Museo Sciola (su prenotazione) e i vicoli dipinti.",
      "en": "Sciola museum (by appointment) and painted lanes.",
      "de": "Sciola-Museum (mit Termin) und bemalte Gassen."
    },
    "taste": {
      "it": "Agrumi e ortaggi della campagna campidanese.",
      "en": "Citrus and vegetables of the Campidano countryside.",
      "de": "Zitrusfrüchte und Gemüse der Campidano-Ebene."
    },
    "rec": {
      "it": "A 25 minuti: la mezza giornata culturale perfetta.",
      "en": "25 minutes away: the perfect cultural half-day.",
      "de": "25 Min. entfernt: der perfekte Kulturhalbttag."
    }
  },
  {
    "id": "orgosolo",
    "cats": [
      "storia",
      "borgo",
      "natura"
    ],
    "name": "Orgosolo e i suoi murales",
    "place": {
      "it": "Barbagia di Ollolai",
      "en": "Barbagia di Ollolai",
      "de": "Barbagia di Ollolai"
    },
    "coords": [
      40.225,
      9.4
    ],
    "driveMin": 100,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Circa 150 murales raccontano lotte sociali, banditismo e resistenza dell’isola.",
      "en": "Some 150 murals tell the island’s struggles, banditry and resistance.",
      "de": "Etwa 150 Murales erzählen von Kämpfen, Banditentum und Widerstand."
    },
    "curio": {
      "it": "Negli anni ’70 i pastori organizzarono sequestri per farsi ascoltare.",
      "en": "In the 1970s shepherds staged kidnappings to be heard.",
      "de": "In den 70ern inszenierten Hirten Entführungen, um gehört zu werden."
    },
    "see": {
      "it": "Murales, poi Supramonte: Su Gologone a 20 minuti.",
      "en": "Murals, then the Supramonte: Su Gologone 20 min on.",
      "de": "Murales, dann Supramonte: Su Gologone 20 Min. weiter."
    },
    "taste": {
      "it": "Porceddu e cannonau nelle trattorie del paese.",
      "en": "Roast suckling pig and Cannonau in village trattorias.",
      "de": "Porceddu und Cannonau in den Trattorien des Dorfes."
    },
    "rec": {
      "it": "L’anima selvatica della Barbagia in un giorno.",
      "en": "The wild soul of Barbagia in one day.",
      "de": "Die wilde Seele der Barbagia an einem Tag."
    }
  },
  {
    "id": "molentargius",
    "cats": [
      "natura"
    ],
    "name": "Parco di Molentargius",
    "place": {
      "it": "Cagliari",
      "en": "Cagliari",
      "de": "Cagliari"
    },
    "coords": [
      39.222,
      9.17
    ],
    "driveMin": 10,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Fenicotteri rosa a 10 minuti, tra saline storiche e città.",
      "en": "Pink flamingos 10 minutes away, between historic salt pans and the city.",
      "de": "Rosa Flamingos 10 Min. entfernt, zwischen Salinen und Stadt."
    },
    "curio": {
      "it": "«Sa genti is mentulus»: qui pascolavano gli asinelli delle salinaie.",
      "en": "“Place of the little donkeys”: salt workers’ donkeys grazed here.",
      "de": "„Ort der Eselchen“: hier grasten die Esel der Salinenarbeiter."
    },
    "see": {
      "it": "Edificio Sali Scelti e migliaia di uccelli acquatici.",
      "en": "The Sali Scelti building and thousands of water birds.",
      "de": "Gebäude Sali Scelti und tausende Wasservögel."
    },
    "taste": {
      "it": "Dopo: un gelato al Poetto.",
      "en": "Afterwards: gelato on the Poetto.",
      "de": "Danach: Gelato am Poetto."
    },
    "rec": {
      "it": "Il tramonto coi fenicotteri è il nostro benvenuto preferito.",
      "en": "Sunset among flamingos is our favourite welcome ritual.",
      "de": "Sonnenuntergang mit Flamingos ist unser Lieblingswillkommen."
    },
    "link": "https://www.parcodeimolentargius.it/"
  },
  {
    "id": "sella",
    "cats": [
      "natura"
    ],
    "name": "Sella del Diavolo",
    "place": {
      "it": "Calamosca, Cagliari",
      "en": "Calamosca, Cagliari",
      "de": "Calamosca, Cagliari"
    },
    "coords": [
      39.199,
      9.198
    ],
    "driveMin": 15,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Mezz’ora di cammino per il miglior panorama sul Golfo degli Angeli.",
      "en": "A half-hour walk for the best view of the Angels’ Gulf.",
      "de": "Halbe Stunde Wanderung, bester Blick auf den Golf der Engel."
    },
    "curio": {
      "it": "La leggenda: il diavolo ci perse la sella fuggendo davanti a sant’Antonio.",
      "en": "Legend: the devil dropped his saddle while fleeing Saint Anthony.",
      "de": "Legende: Der Teufel verlor auf der Flucht vor Antonius den Sattel."
    },
    "see": {
      "it": "Torre di Calamosca e tutta la costa fino a Villasimius.",
      "en": "Calamosca tower and the coast all the way to Villasimius.",
      "de": "Turm von Calamosca, Küste bis nach Villasimius."
    },
    "taste": {
      "it": "Poi: pesce a Calamosca.",
      "en": "Then: seafood in Calamosca.",
      "de": "Danach: Fisch in Calamosca."
    },
    "rec": {
      "it": "Escursione facile, bellissima anche al tramonto.",
      "en": "Easy hike, lovely even at dusk.",
      "de": "Leichte Tour, auch abends schön."
    }
  },
  {
    "id": "arcosu",
    "cats": [
      "natura"
    ],
    "name": "Oasi WWF di Monte Arcosu",
    "place": {
      "it": "Uta (Sulcis)",
      "en": "Uta (Sulcis)",
      "de": "Uta (Sulcis)"
    },
    "coords": [
      39.062,
      8.872
    ],
    "driveMin": 30,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Tra i più grandi boschi mediterranei d’Europa, casa dei cervi sardi.",
      "en": "Among Europe’s largest Mediterranean woodlands, home of Sardinian deer.",
      "de": "Zu den größten Mittelmeerwäldern Europas, Heimat des sardischen Hirschs."
    },
    "curio": {
      "it": "Salvata dal WWF negli anni ’80 quando pendeva il rischio tagli.",
      "en": "Saved by WWF in the 1980s when logging loomed.",
      "de": "Von WWF in den 80ern vorm Abholzen gerettet."
    },
    "see": {
      "it": "Sentiero Genna Is Abis e punti di osservazione fauna (su prenotazione).",
      "en": "Genna Is Abis trail and wildlife hides (booking required).",
      "de": "Weg Genna Is Abis und Beobachtungsstände (mit Anmeldung)."
    },
    "taste": {
      "it": "Olio e miele dell’oasi.",
      "en": "Olive oil and honey from the oasis.",
      "de": "Öl und Honig aus der Oase."
    },
    "rec": {
      "it": "Il «polmone verde» che quasi nessun turista conosce.",
      "en": "The green lung almost no tourist knows.",
      "de": "Die grüne Lunge, die fast kein Tourist kennt."
    },
    "link": "https://www.wwf.it/parchi-e-oasi/oasi/monte-arcosu/"
  },
  {
    "id": "giara",
    "cats": [
      "natura"
    ],
    "name": "Giara di Gesturi",
    "place": {
      "it": "Gesturi (Marmilla)",
      "en": "Gesturi (Marmilla)",
      "de": "Gesturi (Marmilla)"
    },
    "coords": [
      39.728,
      8.962
    ],
    "driveMin": 55,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Un altipiano di acque sorgive e cavallini selvatici sopra la pianura.",
      "en": "A plateau of spring pools and wild horses above the plain.",
      "de": "Ein Hochplateau mit Quelltümpeln und Wildpferden über der Ebene."
    },
    "curio": {
      "it": "I cavallini della Giara sono una razza che esiste solo qui.",
      "en": "Giara ponies are a breed found nowhere else.",
      "de": "Giara-Pferde gibt es nirgendwo sonst."
    },
    "see": {
      "it": "Paulis fioriti in primavera e le «zeppare» basaltiche.",
      "en": "Blooming pools in spring and the basalt «zeppare».",
      "de": "Blühende Paulis im Frühling und Basalt-Zeppas."
    },
    "taste": {
      "it": "Formaggi e pane di Gesturi.",
      "en": "Cheeses and bread from Gesturi.",
      "de": "Käse und Brot aus Gesturi."
    },
    "rec": {
      "it": "Si abbina a Barumini: solo 15 minuti di distanza.",
      "en": "Pairs with Barumini: just 15 minutes apart.",
      "de": "Passt zu Barumini: nur 15 Minuten entfernt."
    }
  },
  {
    "id": "gologone",
    "cats": [
      "natura"
    ],
    "name": "Su Gologone",
    "place": {
      "it": "Oliena (Supramonte)",
      "en": "Oliena (Supramonte)",
      "de": "Oliena (Supramonte)"
    },
    "coords": [
      40.296,
      9.493
    ],
    "driveMin": 100,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "La sorgente più potente di Sardegna, ai piedi delle pareti di Lanaittu.",
      "en": "Sardinia’s mightiest spring, beneath the Lanaittu cliffs.",
      "de": "Sardiniens stärkste Quelle unter den Lanaittu-Wänden."
    },
    "curio": {
      "it": "Gli speleologi hanno superato i 900 metri di profondità senza trovarne il fondo.",
      "en": "Speleologists have gone deeper than 900 m without finding its bottom.",
      "de": "Forscher kamen über 900 m tief, ohne den Grund zu finden."
    },
    "see": {
      "it": "Pozzi blu e ovili pastorali; la grotta di Bue Marino è vicina.",
      "en": "Blue pools and shepherd huts; Bue Marino cave nearby.",
      "de": "Blaue Becken und Schäferhütten; Höhle Bue Marino nah."
    },
    "taste": {
      "it": "Té sardo alla nepeta e il Nepente di Oliena.",
      "en": "Nepeta herbal tea and Oliena’s Nepente wine.",
      "de": "Nepeta-Kräutertee und Nepente aus Oliena."
    },
    "rec": {
      "it": "Si abbina perfettamente a Orgosolo o Gorropu.",
      "en": "Pairs perfectly with Orgosolo or Gorropu.",
      "de": "Perfekt mit Orgosolo oder Gorropu kombinierbar."
    }
  },
  {
    "id": "gorropu",
    "cats": [
      "natura"
    ],
    "name": "Gola di Gorropu",
    "place": {
      "it": "Urzulei/Orgosolo",
      "en": "Urzulei/Orgosolo",
      "de": "Urzulei/Orgosolo"
    },
    "coords": [
      40.283,
      9.595
    ],
    "driveMin": 130,
    "crowd": 3,
    "period": null,
    "story": false,
    "why": {
      "it": "Tra le gole più profonde d’Europa: pareti alte mezzo chilometro.",
      "en": "Among Europe’s deepest gorges: walls half a kilometre tall.",
      "de": "Zu Europas tiefsten Schluchten: Wände einen halben Kilometer hoch."
    },
    "curio": {
      "it": "Vi si nascondevano i partigiani durante la guerra; ospita endemismi unici.",
      "en": "Partisans hid here during the war; unique endemic plants grow inside.",
      "de": "Hier versteckten sich Partisanen; einzigartige Endemiten wachsen darin."
    },
    "see": {
      "it": "Le «scopiglie» bianche del fondo canyon (prima parte, accessibile).",
      "en": "The white scree of the canyon floor (first section, accessible).",
      "de": "Weiße Schuttfelder des Canyonbodens (erster Abschnitt machbar)."
    },
    "taste": {
      "it": "Pecora in capelletto nei rifugi della zona.",
      "en": "Roast mutton at the mountain huts nearby.",
      "de": "Brathammel in den Hütten der Umgebung."
    },
    "rec": {
      "it": "Servono scarpe da trekking: il letto è di massi lucidi.",
      "en": "Bring hiking shoes: the riverbed is polished boulders.",
      "de": "Trekking-Schuhe nötig: das Flussbett besteht aus poliertem Geröll."
    }
  },
  {
    "id": "spendula",
    "cats": [
      "natura"
    ],
    "name": "Cascata Sa Spendula",
    "place": {
      "it": "Villacidro",
      "en": "Villacidro",
      "de": "Villacidro"
    },
    "coords": [
      39.459,
      8.65
    ],
    "driveMin": 45,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Il Flumendoso si lancia in una cascata tra rocce scure e verde.",
      "en": "The Flumendoso leaps in a fall between dark rock and greenery.",
      "de": "Der Flumendoso stürzt zwischen dunklem Fels und Grün."
    },
    "curio": {
      "it": "Gabriele D’Annunzio la celebrò in versi nell’Ottocento.",
      "en": "Gabriele D’Annunzio celebrated it in verse in the 1800s.",
      "de": "D’Annunzio besang sie im 19. Jahrhundert in Versen."
    },
    "see": {
      "it": "Belvedere superiore e sentiero verso la base.",
      "en": "Upper viewpoint and trail down to the base.",
      "de": "Oberer Aussichtspunkt und Pfad zur Basis."
    },
    "taste": {
      "it": "Ciliegie di Villacidro a maggio e acquavite locale.",
      "en": "Villacidro cherries in May and local eau-de-vie.",
      "de": "Kirschen aus Villacidro im Mai und lokaler Schnaps."
    },
    "rec": {
      "it": "Spettacolare dopo le piogge (novembre–maggio).",
      "en": "Spectacular after the rains (November–May).",
      "de": "Spektakulär nach Regenfällen (Nov.–Mai)."
    }
  },
  {
    "id": "sadali",
    "cats": [
      "borgo",
      "natura"
    ],
    "name": "Sadali",
    "place": {
      "it": "Sadali, alto Flumendosa",
      "en": "Sadali, upper Flumendosa",
      "de": "Sadali, oberer Flumendosa"
    },
    "coords": [
      39.825,
      9.425
    ],
    "driveMin": 75,
    "crowd": 1,
    "period": null,
    "story": true,
    "why": {
      "it": "Borgo appeso alla parete, con chiese e luoghi di culto scavati nella roccia.",
      "en": "A village clinging to the cliff, with churches hollowed into rock.",
      "de": "Dorf am Fels, mit Kirchen im Gestein."
    },
    "curio": {
      "it": "Le sue grotte-sanctuario furono frequentate fino al Medioevo.",
      "en": "Its cave sanctuaries were still used in the Middle Ages.",
      "de": "Seine Grottensanktuarien wurden bis ins Mittelalter genutzt."
    },
    "see": {
      "it": "San Valentino, Is Janas e la cascata nel centro storico.",
      "en": "San Valentino, Is Janas and the waterfall in the old town.",
      "de": "San Valentino, Is Janas und der Wasserfall in der Altstadt."
    },
    "taste": {
      "it": "Formaggi locali e miele dell’alto Flumendosa.",
      "en": "Local cheeses and upper-Flumendosa honey.",
      "de": "Lokaler Käse und Honig vom oberen Flumendosa."
    },
    "rec": {
      "it": "La «Sardegna verticale» a un’ora e un quarto.",
      "en": "“Vertical Sardinia” within an hour and a quarter.",
      "de": "„Vertikales Sardinien“ in 75 Minuten."
    }
  },
  {
    "id": "atzara",
    "cats": [
      "borgo",
      "eno"
    ],
    "name": "Atzara",
    "place": {
      "it": "Mandrolisai",
      "en": "Mandrolisai",
      "de": "Mandrolisai"
    },
    "coords": [
      40.04,
      9.03
    ],
    "driveMin": 90,
    "crowd": 1,
    "period": null,
    "story": false,
    "why": {
      "it": "Il borgo dei pittori nel cuore del vino Mandrolisai.",
      "en": "The painters’ village at the heart of Mandrolisai wine country.",
      "de": "Das Malerdorf im Herzen des Mandrolisai-Weins."
    },
    "curio": {
      "it": "Vi soggiornarono pittori stranieri che ne fecero un soggetto ricorrente.",
      "en": "Foreign painters settled here and made it a recurring subject.",
      "de": "Ausländische Maler lebten hier und machten es zum wiederkehrenden Motiv."
    },
    "see": {
      "it": "Vicoli di scisto e piccoli musei d’arte contemporanea.",
      "en": "Slate lanes and small contemporary-art museums.",
      "de": "Schiefergassen und kleine Museen zeitgenössischer Kunst."
    },
    "taste": {
      "it": "Il rosso Mandrolisai, assemblaggio tipico dell’area.",
      "en": "The Mandrolisai red, the area’s signature blend.",
      "de": "Der Mandrolisai Rotwein, die typische Cuvée der Gegend."
    },
    "rec": {
      "it": "Vino, arte e silenzio: la tripletta rara.",
      "en": "Wine, art and silence: the rare triple.",
      "de": "Wein, Kunst und Stille: die seltene Dreifaltigkeit."
    }
  },
  {
    "id": "baunei",
    "cats": [
      "borgo",
      "natura"
    ],
    "name": "Baunei e il Golgo",
    "place": {
      "it": "Baunei (Ogliastra)",
      "en": "Baunei (Ogliastra)",
      "de": "Baunei (Ogliastra)"
    },
    "coords": [
      40.03,
      9.66
    ],
    "driveMin": 110,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Borgo di montagna che domina il Golfo di Orosei, col plateau del Golgo sopra.",
      "en": "Mountain village overlooking the Gulf of Orosei, with the Golgo plateau above.",
      "de": "Bergdorf über dem Golf von Orosei, mit dem Plateau Golgo darüber."
    },
    "curio": {
      "it": "Il Golgo custodisce il «Golgodello» e la chiesetta di San Pietro.",
      "en": "Golgo keeps the famous Golgo wells and the tiny San Pietro church.",
      "de": "Golgo birgt die berühmten Golgo-Brunnen und die kleine San-Pietro-Kirche."
    },
    "see": {
      "it": "Punta Giradili e gli aggetti sul mare.",
      "en": "Punta Giradili and the sea-facing ledges.",
      "de": "Punta Giradili und die Ausblicke aufs Meer."
    },
    "taste": {
      "it": "Culurgiones ogliastrini.",
      "en": "Ogliastra’s culurgiones.",
      "de": "Culurgiones aus Ogliastra."
    },
    "rec": {
      "it": "Base perfetta per Gorropu e le calette del golfo.",
      "en": "Perfect base for Gorropu and the gulf’s coves.",
      "de": "Perfekte Basis für Gorropu und die Buchten des Golfs."
    }
  },
  {
    "id": "bosa",
    "cats": [
      "borgo",
      "storia"
    ],
    "name": "Bosa",
    "place": {
      "it": "Planargia",
      "en": "Planargia",
      "de": "Planargia"
    },
    "coords": [
      40.299,
      8.498
    ],
    "driveMin": 150,
    "crowd": 3,
    "period": null,
    "story": false,
    "why": {
      "it": "L’unico borgo sardo su un fiume navigabile, con il castello dei Malaspina.",
      "en": "The only Sardinian town on a navigable river, crowned by the Malaspina castle.",
      "de": "Der einzige sardische Ort an einem schiffbaren Fluss, mit Malaspina-Burg."
    },
    "curio": {
      "it": "Le facciate color pastello segnalavano un tempo il mestiere del padrone di casa.",
      "en": "Pastel facades once signalled the owner’s trade.",
      "de": "Pastellfassaden zeigten einst den Beruf des Hausherrn."
    },
    "see": {
      "it": "Castello di Serravalle e San Pietro extra moenia.",
      "en": "Serravalle castle and San Pietro extra moenia.",
      "de": "Burg Serravalle und San Pietro extra moenia."
    },
    "taste": {
      "it": "Malvasia di Bosa.",
      "en": "Malvasia di Bosa.",
      "de": "Malvasia di Bosa."
    },
    "rec": {
      "it": "Combinala con Is Arutas: stessa direzione.",
      "en": "Pair with Is Arutas: same direction.",
      "de": "Mit Is Arutas kombinieren: gleiche Richtung."
    }
  },
  {
    "id": "castelsardo",
    "cats": [
      "borgo",
      "storia"
    ],
    "name": "Castelsardo",
    "place": {
      "it": "Anglona",
      "en": "Anglona",
      "de": "Anglona"
    },
    "coords": [
      40.914,
      8.712
    ],
    "driveMin": 180,
    "crowd": 3,
    "period": null,
    "story": false,
    "why": {
      "it": "Borgo fortificato fondato dai Doria, arroccato sopra il mare.",
      "en": "A fortified village founded by the Doria, perched over the sea.",
      "de": "Von den Doria gegründetes, über dem Meer gelegenes Städtchen."
    },
    "curio": {
      "it": "Nel castello funziona il museo dell’intreccio: cesti tessuti con tecniche antiche.",
      "en": "The castle hosts the basket-weaving museum: baskets made with age-old techniques.",
      "de": "Die Burg beherbergt das Flechtmuseum: Körbe in alter Technik."
    },
    "see": {
      "it": "Castello-museo e la Rocca al tramonto.",
      "en": "Castle-museum and the rock at sunset.",
      "de": "Burgmuseum und der Fels im Abendlicht."
    },
    "taste": {
      "it": "Bottarga e lumache della tradizione.",
      "en": "Bottarga and traditional snail dishes.",
      "de": "Bottarga und traditionelle Schneckengerichte."
    },
    "rec": {
      "it": "Solo con una giornata intera a disposizione: ne vale la pena.",
      "en": "Only with a full free day: worth it.",
      "de": "Nur bei einem ganzen freien Tag: es lohnt sich."
    }
  },
  {
    "id": "santantioco",
    "cats": [
      "borgo",
      "storia"
    ],
    "name": "Sant’Antioco",
    "place": {
      "it": "Isola di Sant’Antioco",
      "en": "Sant’Antioco island",
      "de": "Insel Sant’Antioco"
    },
    "coords": [
      39.067,
      8.45
    ],
    "driveMin": 80,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Città-isola con catacombe, tofet fenici e tradizioni vivissime.",
      "en": "An island town with catacombs, Phoenician tophet and living traditions.",
      "de": "Inselstadt mit Katakomben, phönizischem Tofet und gelebten Traditionen."
    },
    "curio": {
      "it": "Sotto le case si aprono le «sas konkas»: gallerie ipogeiche private.",
      "en": "Beneath the houses open the “sas konkas”: private hypogean galleries.",
      "de": "Unter den Häusern liegen die „sas konkas“: private Felskeller."
    },
    "see": {
      "it": "Basilica, catacombe e il museo del bisso marino.",
      "en": "Basilica, catacombs and the sea-silk museum.",
      "de": "Basilika, Katakomben und das Muschelseide-Museum."
    },
    "taste": {
      "it": "Tonno e bottarga; a Carloforte il cous cous.",
      "en": "Tuna and bottarga; couscous over in Carloforte.",
      "de": "Thunfisch und Bottarga; in Carloforte Couscous."
    },
    "rec": {
      "it": "La festa estiva del patrono, primo agosto, è imperdibile.",
      "en": "The summer patronal feast on August 1st is unmissable.",
      "de": "Das Sommerpatrozinium am 1. August ist unvergleichlich."
    }
  },
  {
    "id": "carloforte",
    "cats": [
      "borgo",
      "eno"
    ],
    "name": "Carloforte",
    "place": {
      "it": "Isola di San Pietro",
      "en": "San Pietro island",
      "de": "Insel San Pietro"
    },
    "coords": [
      39.141,
      8.504
    ],
    "driveMin": 100,
    "crowd": 2,
    "period": null,
    "story": false,
    "why": {
      "it": "Fondata da pescatori liguri: qui si parla ancora ligure da tre secoli.",
      "en": "Founded by Ligurian fishermen: Ligurian has been spoken here for three centuries.",
      "de": "Von ligurischen Fischern gegründet: seit drei Jahrhunderten spricht man hier Ligurisch."
    },
    "curio": {
      "it": "La tonnara locale è tra le poche ancora attive del Mediterraneo.",
      "en": "The local tuna fishery is among the few still active in the Mediterranean.",
      "de": "Die örtliche Tonara gehört zu den wenigen aktiven des Mittelmeers."
    },
    "see": {
      "it": "Molo, salite bianche e saline.",
      "en": "The quay, white climbs and salt pans.",
      "de": "Kai, weiße Gassen und Salinen."
    },
    "taste": {
      "it": "Couscous alla carlofortina e tonno sott’olio.",
      "en": "Carloforte-style couscous and oil-preserved tuna.",
      "de": "Carlofortiner Couscous und Thunfisch in Öl."
    },
    "rec": {
      "it": "Traghetto da Portovesme: un giorno diverso, un mondo diverso.",
      "en": "Ferry from Portovesme: another day, another world.",
      "de": "Fähre ab Portovesme: ein anderer Tag, eine andere Welt."
    }
  }
];
const FOOD = [
  {
    "id": "porceddu",
    "name": {
      "it": "Porceddu",
      "en": "Porceddu",
      "de": "Porceddu"
    },
    "d": {
      "it": "Maialetto arrostito lentamente: carne tenera e cotenna croccante, da condividere a tavola.",
      "en": "Slow-roasted suckling pig: tender meat and crisp skin, made for sharing.",
      "de": "Langsam gebratenes Spanferkel: zartes Fleisch und knusprige Haut zum Teilen."
    }
  },
  {
    "id": "fregola",
    "name": {
      "it": "Fregola sarda",
      "en": "Fregola sarda",
      "de": "Fregola sarda"
    },
    "d": {
      "it": "Piccole sfere di semola tostata, ottime con arselle o frutti di mare.",
      "en": "Small toasted semolina pearls, delicious with clams or mixed seafood.",
      "de": "Kleine geröstete Grießkügelchen, besonders gut mit Muscheln oder Meeresfrüchten."
    }
  },
  {
    "id": "malloreddus",
    "name": {
      "it": "Malloreddus",
      "en": "Malloreddus",
      "de": "Malloreddus"
    },
    "d": {
      "it": "Gnocchetti di semola rigati: provali alla campidanese, con sugo di salsiccia e pecorino.",
      "en": "Ridged semolina pasta: try it campidanese-style, with sausage sauce and pecorino.",
      "de": "Gerillte Grießnudeln: nach Campidanese-Art mit Wurstsauce und Pecorino probieren."
    }
  },
  {
    "id": "pane_carasau",
    "name": {
      "it": "Pane carasau",
      "en": "Pane carasau",
      "de": "Pane carasau"
    },
    "d": {
      "it": "Sfoglie sottili e croccanti: accompagnano formaggi e salumi, oppure diventano pane frattau.",
      "en": "Thin, crisp flatbread: served with cheese and cured meats, or layered into pane frattau.",
      "de": "Dünnes knuspriges Fladenbrot zu Käse und Wurst oder geschichtet als Pane frattau."
    }
  },
  {
    "id": "seadas",
    "name": {
      "it": "Seadas",
      "en": "Seadas",
      "de": "Seadas"
    },
    "d": {
      "it": "Un guscio di pasta fritta racchiude formaggio: il miele completa il contrasto dolce e sapido.",
      "en": "Fried pastry filled with cheese; honey brings a sweet contrast to the savoury filling.",
      "de": "Frittiertes Gebäck mit Käsefüllung: Honig ergänzt den würzigen Geschmack."
    }
  },
  {
    "id": "bottarga",
    "name": {
      "it": "Bottarga di muggine",
      "en": "Bottarga di muggine",
      "de": "Bottarga di muggine"
    },
    "d": {
      "it": "Uova di muggine salate ed essiccate, a fettine o grattugiate sulla pasta: basta poco per sentire il mare.",
      "en": "Salted, dried mullet roe, sliced or grated over pasta: a little brings a rich taste of the sea.",
      "de": "Gesalzener, getrockneter Meeräschenrogen, in Scheiben oder über Pasta gerieben: intensiv und würzig."
    }
  },
  {
    "id": "pecorino",
    "name": {
      "it": "Pecorino sardo",
      "en": "Pecorino sardo",
      "de": "Pecorino sardo"
    },
    "d": {
      "it": "Formaggio di latte ovino, dolce o maturo: assaggia stagionature diverse per coglierne il carattere.",
      "en": "Sheep’s milk cheese, mild or mature: compare different ages to discover its character.",
      "de": "Schafskäse, mild oder gereift: verschiedene Reifegrade zeigen seinen Charakter."
    }
  },
  {
    "id": "cannonau",
    "name": {
      "it": "Cannonau",
      "en": "Cannonau",
      "de": "Cannonau"
    },
    "d": {
      "it": "Un rosso legato alla Sardegna, da scoprire con arrosti e formaggi stagionati.",
      "en": "A red wine closely tied to Sardinia, to discover with roast meat and aged cheese.",
      "de": "Ein eng mit Sardinien verbundener Rotwein zu Braten und gereiftem Käse."
    }
  }
];
const EVENTS = [
  {
    "id": "sartiglia",
    "name": {
      "it": "Sartiglia",
      "en": "Sartiglia",
      "de": "Sartiglia"
    },
    "city": "Oristano",
    "date": null,
    "dateNote": {
      "it": "Ultima domenica e martedì di Carnevale",
      "en": "Last Sunday & Tuesday of Carnival",
      "de": "Letzter So./Di. des Karnevals"
    },
    "months": [
      2,
      3
    ],
    "cat": "tradizione",
    "distMin": 90,
    "d": {
      "it": "Cavalieri in maschera inseguono la stella: rito di origine giudicale unico al mondo.",
      "en": "Masked horsemen chase the star: a unique judge-era rite.",
      "de": "Maskierte Reiter jagen den Stern: einzigartiger Ritt aus der Richterzeit."
    },
    "url": "https://www.comune.oristano.it/"
  },
  {
    "id": "carrasegare",
    "name": {
      "it": "Carnevale di Mamoiada e Ottana",
      "en": "Mamoiada & Ottana Carnival",
      "de": "Karneval Mamoiada & Ottana"
    },
    "city": "Barbagia",
    "date": null,
    "dateNote": {
      "it": "Gennaio–febbraio, domeniche di Carnevale",
      "en": "January–February, Carnival Sundays",
      "de": "Jan.–Feb., Karnevalssonntage"
    },
    "months": [
      1,
      2
    ],
    "cat": "tradizione",
    "distMin": 135,
    "d": {
      "it": "Mamuthones, Issohadores e Merdules: maschere che camminano da secoli.",
      "en": "Mamuthones, Issohadores and Merdules: masks that have walked for centuries.",
      "de": "Mamuthones, Issohadores und Merdules: Masken seit Jahrhunderten."
    },
    "url": "https://www.comune.mamoiada.nu.it/"
  },
  {
    "id": "agrumi",
    "name": {
      "it": "Sagra degli agrumi",
      "en": "Citrus Fair",
      "de": "Zitrusfest"
    },
    "city": "Muravera",
    "date": null,
    "dateNote": {
      "it": "Weekend di metà aprile",
      "en": "Mid-April weekend",
      "de": "Wochenende Mitte April"
    },
    "months": [
      4
    ],
    "cat": "gastronomia",
    "distMin": 70,
    "d": {
      "it": "Carri di agrumi, dolci e prodotti della fascia costiera sud-orientale.",
      "en": "Citrus floats, sweets and produce of the south-eastern coastal belt.",
      "de": "Zitruswagen, Süßes und Erzeugnisse der Südostküste."
    },
    "url": "https://www.comune.muravera.ca.it/"
  },
  {
    "id": "efisio",
    "name": {
      "it": "Festa di Sant’Efisio",
      "en": "Feast of Sant’Efisio",
      "de": "Fest des Sant’Efisio"
    },
    "city": "Cagliari · Sarroch · Pula · Nora",
    "date": "05-01",
    "dateNote": {
      "it": "1–4 maggio, ogni anno dal voto del 1652",
      "en": "May 1–4, every year since the 1652 vow",
      "de": "1.–4. Mai, jährlich seit dem Gelübde von 1652"
    },
    "months": [
      5
    ],
    "cat": "tradizione",
    "distMin": 10,
    "d": {
      "it": "La festa più grande di Sardegna: circa 100 km di processione tra costumi, tracas e launeddas.",
      "en": "Sardinia’s greatest feast: about 100 km of procession with costumes, carts and launeddas.",
      "de": "Sardiniens größtes Fest: rund 100 km Prozession in Tracht mit Launeddas."
    },
    "url": "https://santefisiomartire.it/"
  },
  {
    "id": "cavalcata",
    "name": {
      "it": "Cavalcata Sarda",
      "en": "Cavalcata Sarda",
      "de": "Cavalcata Sarda"
    },
    "city": "Sassari",
    "date": null,
    "dateNote": {
      "it": "Penultima domenica di maggio",
      "en": "Second-to-last Sunday of May",
      "de": "Vorletzter Mai-Sonntag"
    },
    "months": [
      5
    ],
    "cat": "folklore",
    "distMin": 165,
    "d": {
      "it": "Migliaia di cavalieri e gruppi in costume da tutta l’isola in una sola parata.",
      "en": "Thousands of riders and folk groups from all over the island in one parade.",
      "de": "Tausende Reiter und Trachtengruppen aus ganz Sardinien in einer Parade."
    },
    "url": "https://www.comune.sassari.it/"
  },
  {
    "id": "girotonno",
    "name": {
      "it": "Girotonno",
      "en": "Girotonno",
      "de": "Girotonno"
    },
    "city": "Carloforte",
    "date": null,
    "dateNote": {
      "it": "Fine di giugno",
      "en": "Late June",
      "de": "Ende Juni"
    },
    "months": [
      6
    ],
    "cat": "gastronomia",
    "distMin": 100,
    "d": {
      "it": "Il tonno di Carloforte incontro il mondo: quattro giorni di cucina internazionale.",
      "en": "Carloforte tuna meets the world: four days of international cooking.",
      "de": "Carlofortes Thunfisch trifft die Welt: vier Tage internationale Küche."
    },
    "url": "https://www.isoladisanpietro.org/"
  },
  {
    "id": "ardia",
    "name": {
      "it": "S’Ardia di Sedilo",
      "en": "S’Ardia of Sedilo",
      "de": "S’Ardia von Sedilo"
    },
    "city": "Sedilo",
    "date": "07-06",
    "dateNote": {
      "it": "6–7 luglio, date fisse",
      "en": "July 6–7, fixed dates",
      "de": "6.–7. Juli, fest"
    },
    "months": [
      7
    ],
    "cat": "tradizione",
    "distMin": 105,
    "d": {
      "it": "Corsa sfrenata di cavalieri attorno al santuario: Costantino contro Licinio.",
      "en": "A wild gallop of horsemen around the shrine: Constantine against Licinius.",
      "de": "Wilder Ritt um das Heiligtum: Konstantin gegen Licinius."
    },
    "url": "https://www.comune.sedilo.or.it/"
  },
  {
    "id": "santantioco_festa",
    "name": {
      "it": "Festa estiva di sant’Antioco",
      "en": "St Antioco summer feast",
      "de": "Sommerfest des hl. Antiokus"
    },
    "city": "Sant’Antioco",
    "date": "08-01",
    "dateNote": {
      "it": "1 agosto, data fissa",
      "en": "August 1, fixed",
      "de": "1. August, fest"
    },
    "months": [
      8
    ],
    "cat": "religiosa",
    "distMin": 80,
    "d": {
      "it": "La festa patronale più sentita del Sulcis, tra processioni e launeddas.",
      "en": "The Sulcis’ most heartfelt patronal feast, with processions and launeddas.",
      "de": "Das innigste Patronatsfest des Sulcis mit Prozessionen und Launeddas."
    },
    "url": "https://www.comune.santantioco.ca.it/"
  },
  {
    "id": "faradda",
    "name": {
      "it": "Faradda di li Candelieri",
      "en": "Faradda di li Candelieri",
      "de": "Faradda di li Candelieri"
    },
    "city": "Sassari",
    "date": "08-14",
    "dateNote": {
      "it": "14 agosto, data fissa",
      "en": "August 14, fixed",
      "de": "14. August, fest"
    },
    "months": [
      8
    ],
    "cat": "tradizione",
    "distMin": 165,
    "d": {
      "it": "Le candele votive dei mestieri discendono in città: riconosciuta dall’UNESCO.",
      "en": "The guilds’ votive candles descend through town: UNESCO-recognised.",
      "de": "Die Votivkerzen der Zünfte ziehen bergab: UNESCO-anerkannt."
    },
    "url": "https://www.comune.sassari.it/"
  },
  {
    "id": "timeinjazz",
    "name": {
      "it": "Time in Jazz",
      "en": "Time in Jazz",
      "de": "Time in Jazz"
    },
    "city": "Berchidda",
    "date": null,
    "dateNote": {
      "it": "Prima metà di agosto",
      "en": "First half of August",
      "de": "Erste Augusthälfte"
    },
    "months": [
      8
    ],
    "cat": "musica",
    "distMin": 175,
    "d": {
      "it": "Concerti tra i paesaggi del monte Limbara, festival fondato da Paolo Fresu.",
      "en": "Concerts across the Limbara landscapes, a festival founded by Paolo Fresu.",
      "de": "Konzerte rund um den Monte Limbara, Festival von Paolo Fresu."
    },
    "url": "https://timeinjazz.it/"
  },
  {
    "id": "redentore",
    "name": {
      "it": "Festa del Redentore",
      "en": "Redentore Feast",
      "de": "Erlöserfest"
    },
    "city": "Nuoro",
    "date": null,
    "dateNote": {
      "it": "Ultima settimana di agosto",
      "en": "Last week of August",
      "de": "Letzte Augustwoche"
    },
    "months": [
      8
    ],
    "cat": "folklore",
    "distMin": 135,
    "d": {
      "it": "La grande parata dei costumi sardi in cima al monte Ortobene.",
      "en": "The great parade of Sardinian dress atop Mount Ortobene.",
      "de": "Der große Trachtenumzug auf dem Ortobene."
    },
    "url": "https://www.comune.nuoro.it/"
  },
  {
    "id": "autunno",
    "name": {
      "it": "Autunno in Barbagia",
      "en": "Autunno in Barbagia",
      "de": "Autunno in Barbagia"
    },
    "city": "Oliena · Orgosolo · Mamoiada · Nuoro…",
    "date": null,
    "dateNote": {
      "it": "Weekend da settembre a dicembre, un borgo diverso a settimana",
      "en": "Weekends Sept–Dec, a different village each week",
      "de": "Wochenende Sept.–Dez., jedes Woche ein anderes Dorf"
    },
    "months": [
      9,
      10,
      11,
      12
    ],
    "cat": "gastronomia",
    "distMin": 120,
    "d": {
      "it": "Ogni weekend un borgo apre cortili, cantine e forni: calendario annuale sul sito ufficiale.",
      "en": "Each weekend a village opens courtyards, cellars and ovens: annual calendar on the official site.",
      "de": "Jedes Wochenende öffnet ein Dorf Höfe, Keller und Öfen: Kalender auf der offiziellen Seite."
    },
    "url": "https://www.cuoredellasardegna.it/autunnoinbarbagia/it/index.html"
  }
];
const ITINS = [
  {
    "id": "antica",
    "name": {
      "it": "Sardegna antica",
      "en": "Ancient Sardinia",
      "de": "Alt-Sardinien"
    },
    "ic": "🏛️",
    "steps": [
      [
        {
          "it": "Mattina",
          "en": "Morning",
          "de": "Vormittag"
        },
        {
          "it": "Su Nuraxi di Barumini all’apertura (visita guidata obbligatoria, partenze ogni 30 min).",
          "en": "Su Nuraxi di Barumini at opening (mandatory guided tour, departures every 30 min).",
          "de": "Su Nuraxi bei Öffnung (Führung Pflicht, Start alle 30 Min.)."
        }
      ],
      [
        {
          "it": "Pranzo",
          "en": "Lunch",
          "de": "Mittag"
        },
        {
          "it": "Agriturismo a Barumini o nei dintorni: porceddu e pecorino.",
          "en": "Farm restaurant in/near Barumini: suckling pig and pecorino.",
          "de": "Agriturismo in Barumini und Umgebung: Spanferkel und Pecorino."
        }
      ],
      [
        {
          "it": "Pomeriggio",
          "en": "Afternoon",
          "de": "Nachmittag"
        },
        {
          "it": "Giara di Gesturi: cavallini selvatici e paulis (15 min da Barumini).",
          "en": "Giara di Gesturi: wild ponies and spring pools (15 min from Barumini).",
          "de": "Giara di Gesturi: Wildpferde und Tümpel (15 Min. von Barumini)."
        }
      ],
      [
        {
          "it": "Tramonto",
          "en": "Sunset",
          "de": "Abend"
        },
        {
          "it": "Belvedere della Marmilla verso Tuili, con il paesaggio dei nuraghi.",
          "en": "Marmilla viewpoint towards Tuili, with the nuragic landscape.",
          "de": "Aussichtspunkt Marmilla Richtung Tuili, mit Nuragen-Landschaft."
        }
      ]
    ],
    "ids": [
      "sunuraxi",
      "giara"
    ]
  },
  {
    "id": "mare_tradizione",
    "name": {
      "it": "Mare e tradizione",
      "en": "Sea & tradition",
      "de": "Meer & Tradition"
    },
    "ic": "🌊",
    "steps": [
      [
        {
          "it": "Mattina",
          "en": "Morning",
          "de": "Vormittag"
        },
        {
          "it": "Spiaggia di Chia o Tuerredda, scelta guardando il vento del giorno.",
          "en": "Chia or Tuerredda beach, chosen by checking today’s wind.",
          "de": "Strand Chia oder Tuerredda, je nach heutigem Wind gewählt."
        }
      ],
      [
        {
          "it": "Pranzo",
          "en": "Lunch",
          "de": "Mittag"
        },
        {
          "it": "Fregola e bottarga a Pula o Chia.",
          "en": "Fregula and bottarga in Pula or Chia.",
          "de": "Fregula und Bottarga in Pula oder Chia."
        }
      ],
      [
        {
          "it": "Pomeriggio",
          "en": "Afternoon",
          "de": "Nachmittag"
        },
        {
          "it": "Area archeologica di Nora (35 min da casa).",
          "en": "Nora archaeological site (35 min from home).",
          "de": "Archäologische Stätte Nora (35 Min. entfernt)."
        }
      ],
      [
        {
          "it": "Tramonto",
          "en": "Sunset",
          "de": "Abend"
        },
        {
          "it": "Torre spagnola di Chia con un gelato.",
          "en": "Chia’s Spanish tower with a gelato.",
          "de": "Spanischer Turm von Chia mit einem Gelato."
        }
      ]
    ],
    "ids": [
      "chia",
      "nora"
    ]
  },
  {
    "id": "fuori",
    "name": {
      "it": "Fuori dai percorsi",
      "en": "Off the beaten track",
      "de": "Abseits der Pfade"
    },
    "ic": "💎",
    "steps": [
      [
        {
          "it": "Mattina",
          "en": "Morning",
          "de": "Vormittag"
        },
        {
          "it": "San Sperate: murales e pietre sonore di Sciola (25 min).",
          "en": "San Sperate: murals and Sciola’s sounding stones (25 min).",
          "de": "San Sperate: Murales und Sciolas klingende Steine (25 Min.)."
        }
      ],
      [
        {
          "it": "Pranzo",
          "en": "Lunch",
          "de": "Mittag"
        },
        {
          "it": "Agriturismo a Monastir o Ussana.",
          "en": "Farm restaurant in Monastir or Ussana.",
          "de": "Agriturismo in Monastir oder Ussana."
        }
      ],
      [
        {
          "it": "Pomeriggio",
          "en": "Afternoon",
          "de": "Nachmittag"
        },
        {
          "it": "Degustazione presso una cantina di Serdiana (prenotare).",
          "en": "Tasting at a Serdiana winery (book ahead).",
          "de": "Verkostung in einem Weingut in Serdiana (buchen)."
        }
      ],
      [
        {
          "it": "Tramonto",
          "en": "Sunset",
          "de": "Abend"
        },
        {
          "it": "Rientro con sosta al castello di Acquafredda (SS131).",
          "en": "Return stop at Acquafredda castle (SS131).",
          "de": "Rückkehr mit Stopp an Burg Acquafredda (SS131)."
        }
      ]
    ],
    "ids": [
      "sansperate",
      "acquafredda"
    ]
  },
  {
    "id": "miniere",
    "name": {
      "it": "Miniere e mare selvaggio",
      "en": "Mines & wild coast",
      "de": "Minen & wilde Küste"
    },
    "ic": "⛏️",
    "steps": [
      [
        {
          "it": "Mattina",
          "en": "Morning",
          "de": "Vormittag"
        },
        {
          "it": "Belvedere di Nebida e Laveria Lamarmora (55 min).",
          "en": "Nebida viewpoint and Laveria Lamarmora (55 min).",
          "de": "Aussichtspunkt Nebida und Laveria Lamarmora (55 Min.)."
        }
      ],
      [
        {
          "it": "Pranzo",
          "en": "Lunch",
          "de": "Mittag"
        },
        {
          "it": "Culurgiones a Iglesias o Masua.",
          "en": "Culurgiones in Iglesias or Masua.",
          "de": "Culurgiones in Iglesias oder Masua."
        }
      ],
      [
        {
          "it": "Pomeriggio",
          "en": "Afternoon",
          "de": "Nachmittag"
        },
        {
          "it": "Monte Sirai (sito punico) oppure, in alternativa, Montevecchio.",
          "en": "Monte Sirai (Punic site) or, alternatively, Montevecchio.",
          "de": "Monte Sirai (punische Stätte) oder alternativ Montevecchio."
        }
      ],
      [
        {
          "it": "Tramonto",
          "en": "Sunset",
          "de": "Abend"
        },
        {
          "it": "Pan di Zucchero dal belvedere: il più scenografico dell’isola.",
          "en": "Pan di Zucchero from the viewpoint: the island’s most dramatic sunset.",
          "de": "Pan di Zucchero vom Aussichtspunkt: der dramatischste Sonnenuntergang."
        }
      ]
    ],
    "ids": [
      "nebida",
      "monte_sirai"
    ]
  },
  {
    "id": "supramonte",
    "name": {
      "it": "Supramonte e Orgosolo",
      "en": "Supramonte & Orgosolo",
      "de": "Supramonte & Orgosolo"
    },
    "ic": "🐐",
    "steps": [
      [
        {
          "it": "Mattina",
          "en": "Morning",
          "de": "Vormittag"
        },
        {
          "it": "Su Gologone e la valle di Lanaittu (100 min).",
          "en": "Su Gologone and the Lanaittu valley (100 min).",
          "de": "Su Gologone und Tal Lanaittu (100 Min.)."
        }
      ],
      [
        {
          "it": "Pranzo",
          "en": "Lunch",
          "de": "Mittag"
        },
        {
          "it": "Porceddu a Orgosolo.",
          "en": "Suckling pig in Orgosolo.",
          "de": "Spanferkel in Orgosolo."
        }
      ],
      [
        {
          "it": "Pomeriggio",
          "en": "Afternoon",
          "de": "Nachmittag"
        },
        {
          "it": "Murales di Orgosolo e passeggiata nel Supramonte.",
          "en": "Orgosolo murals and a Supramonte stroll.",
          "de": "Murales von Orgosolo und Spaziergang im Supramonte."
        }
      ],
      [
        {
          "it": "Tramonto",
          "en": "Sunset",
          "de": "Abend"
        },
        {
          "it": "Valle di Lanaittu con un bicchiere di Nepente di Oliena.",
          "en": "Lanaittu valley with a glass of Oliena’s Nepente.",
          "de": "Tal Lanaittu mit einem Glas Nepente aus Oliena."
        }
      ]
    ],
    "ids": [
      "gologone",
      "orgosolo"
    ]
  },
  {
    "id": "maestrale",
    "auto": true,
    "name": {
      "it": "Giornata con Maestrale",
      "en": "Maestrale day",
      "de": "Tag mit Maestrale"
    },
    "ic": "🌬️",
    "steps": []
  }
];
const PERIODS = [
  {
    "id": "preistoria",
    "t": {
      "it": "Preistoria · Domus de janas",
      "en": "Prehistory · Fairy-houses",
      "de": "Prähistorie · Feenhäuser"
    },
    "d": {
      "it": "Tombe scavate nella roccia duemila anni prima dei nuraghi.",
      "en": "Rock-cut tombs two millennia before the nuraghi.",
      "de": "Felsgräber zwei Jahrtausende vor den Nuragen."
    },
    "ids": [
      "priu",
      "sa_domu_orcu"
    ]
  },
  {
    "id": "nuragica",
    "t": {
      "it": "Età nuragica (1800–500 a.C.)",
      "en": "Nuragic Age (1800–500 BC)",
      "de": "Nuragische Zeit (1800–500 v. Chr.)"
    },
    "d": {
      "it": "Torri, pozzi sacri e villaggi: la civiltà dell’isola.",
      "en": "Towers, sacred wells and villages: the island’s civilisation.",
      "de": "Türme, Brunnenheiligtümer, Dörfer: die Zivilisation der Insel."
    },
    "ids": [
      "sunuraxi",
      "arrubiu",
      "cristina",
      "vittoria_serri"
    ]
  },
  {
    "id": "fenici",
    "t": {
      "it": "Fenici (VIII sec. a.C.)",
      "en": "Phoenicians (8th c. BC)",
      "de": "Phönizier (8. Jh. v. Chr.)"
    },
    "d": {
      "it": "Mercanti orientali fondano porti come Nora e Bithia.",
      "en": "Eastern traders found ports like Nora and Bithia.",
      "de": "Orientalische Händler gründen Häfen wie Nora und Bithia."
    },
    "ids": [
      "monte_sirai",
      "bithia"
    ]
  },
  {
    "id": "cartaginesi",
    "t": {
      "it": "Cartaginesi",
      "en": "Carthaginians",
      "de": "Karthager"
    },
    "d": {
      "it": "Cartagine fortifica l’isola: Monte Sirai diventa avamposto.",
      "en": "Carthage fortifies the island: Monte Sirai becomes an outpost.",
      "de": "Karthago befestigt die Insel: Monte Sirai wird Vorposten."
    },
    "ids": [
      "monte_sirai",
      "nora"
    ]
  },
  {
    "id": "romani",
    "t": {
      "it": "Romani (238 a.C.–455 d.C.)",
      "en": "Romans (238 BC–455 AD)",
      "de": "Römer (238 v.–455 n. Chr.)"
    },
    "d": {
      "it": "Granaio di Roma: teatri, terme e ville su tutto il territorio.",
      "en": "Rome’s granary: theatres, baths and villas across the land.",
      "de": "Roms Kornkammer: Theater, Thermen und Villen überall."
    },
    "ids": [
      "nora",
      "arrubiu"
    ]
  },
  {
    "id": "bizantini",
    "t": {
      "it": "Vandali e Bizantini",
      "en": "Vandals & Byzantines",
      "de": "Vandalen & Byzantiner"
    },
    "d": {
      "it": "Caduto Roma, l’isola guarda a Costantinopoli: nascono le basiliche.",
      "en": "After Rome falls the island turns to Constantinople: basilicas rise.",
      "de": "Nach Rom fällt die Insel Konstantinopel zu: Basiliken entstehen."
    },
    "ids": [
      "sinis_church",
      "saturnino"
    ]
  },
  {
    "id": "giudicati",
    "t": {
      "it": "Giudicati (900–1400)",
      "en": "Judge Kingdoms (900–1400)",
      "de": "Richterreiche (900–1400)"
    },
    "d": {
      "it": "Quattro regni indipendenti: cattedrali nel bosco e castelli di confine.",
      "en": "Four independent kingdoms: forest cathedrals and border castles.",
      "de": "Vier unabhängige Reiche: Kathedralen im Wald, Grenzburgen."
    },
    "ids": [
      "sorres",
      "monreale",
      "acquafredda"
    ]
  },
  {
    "id": "aragonesi_spagnoli",
    "t": {
      "it": "Aragonesi e Spagnoli (1323–1720)",
      "en": "Aragonese & Spaniards (1323–1720)",
      "de": "Aragonesen & Spanier (1323–1720)"
    },
    "d": {
      "it": "Quattro secoli di corona d’Aragona: torri costiere e lingua catalana.",
      "en": "Four centuries under the Crown of Aragon: coastal towers and Catalan tongue.",
      "de": "Vier Jahrhunderte Krone Aragon: Küstentürme, katalanische Sprache."
    },
    "ids": [
      "bosa",
      "castelsardo",
      "santantioco"
    ]
  },
  {
    "id": "savoiardi",
    "t": {
      "it": "Savoia e Ottocento",
      "en": "House of Savoy & the 1800s",
      "de": "Savoyen & 19. Jahrhundert"
    },
    "d": {
      "it": "Miniere, ferrovie e borghi nuovi: l’isola entra nell’Europa industriale.",
      "en": "Mines, railways and new towns: the island joins industrial Europe.",
      "de": "Bergbau, Bahnen, neue Städte: die Insel wird industriell."
    },
    "ids": [
      "montevecchio",
      "nebida",
      "carloforte"
    ]
  },
  {
    "id": "moderna",
    "t": {
      "it": "Sardegna moderna",
      "en": "Modern Sardinia",
      "de": "Modernes Sardinien"
    },
    "d": {
      "it": "Murales, arte contemporanea e memoria: l’identità che respira oggi.",
      "en": "Murals, contemporary art and memory: today’s living identity.",
      "de": "Murales, Gegenwartskunst, Erinnerung: gelebte Identität."
    },
    "ids": [
      "sansperate",
      "orgosolo"
    ]
  }
];
