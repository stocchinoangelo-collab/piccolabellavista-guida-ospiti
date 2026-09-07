# Piccolabellavista Concierge — modello contenuti

## Scopo

Questa struttura diventa la fonte unica dei contenuti del futuro ecosistema Piccolabellavista: sito pubblico, area ospiti, Concierge, social e futura AI.

Principio: **Angelo e Viviana scelgono e verificano il valore; il sistema organizza, filtra e propone.**

## Livelli di accesso

- `public`: visibile a tutti e utilizzabile anche per acquisizione/SEO.
- `guest`: disponibile agli ospiti dopo la prenotazione e durante il soggiorno.
- `private`: operativo o sensibile; mai pubblico.

Un contenuto può avere più livelli quando il testo pubblico e quello ospite sono differenti.

## Stato di verifica

Ogni contenuto deve avere:

- `verification.status`: `verified`, `review_due`, `unverified`, `retired`
- `verification.checkedAt`: data ultima verifica
- `verification.source`: fonte usata per la verifica
- `verification.notes`: note editoriali

Per dati variabili (orari, prezzi, trasporti, eventi) la data di verifica è obbligatoria.

## Tipi di contenuto

Prima versione:

- `restaurant`
- `beach`
- `place`
- `itinerary`
- `transport`
- `event`
- `tip`
- `service`

La struttura è estensibile senza cambiare il frontend.

## Campi comuni

Ogni scheda deve avere almeno:

- `id`: identificatore stabile
- `type`: tipo contenuto
- `status`: `active`, `draft`, `retired`
- `access`: `public`, `guest`, `private`
- `name`
- `summary`: IT/EN/DE
- `description`: IT/EN/DE
- `tags`
- `location`: coordinate, indirizzo, area quando applicabile
- `audience`: senza auto, famiglia, coppia, food, storia, mare, sera, ecc.
- `timing`: durata, fascia oraria, stagionalità
- `verification`
- `media`: foto, crediti/licenza, stato diritti
- `editorial`: perché Angelo e Viviana lo consigliano

## Campi utili al Concierge

Per evitare risposte generiche, i contenuti possono includere:

- `mobility.carRequired`
- `mobility.publicTransportFriendly`
- `mobility.walkingFriendly`
- `budget`
- `weather.windSuitability`
- `weather.rainSuitable`
- `weather.hotDaySuitable`
- `timeOfDay`
- `durationMin`
- `familyFriendly`
- `romantic`
- `localAuthenticity`

Questi campi devono guidare filtri e suggerimenti; non vanno mostrati necessariamente all'ospite.

## Regola anti-invenzione AI

La futura AI può:

1. cercare tra contenuti `active`;
2. filtrare per contesto dell'ospite;
3. combinare contenuti verificati;
4. spiegare perché li propone.

La futura AI **non può** creare dal nulla ristoranti, orari, prezzi, trasporti, eventi o informazioni operative non presenti nella base verificata.

## Pubblico vs ospite

Esempio ristorante:

- pubblico: nome, zona, stile, breve motivo per cui lo consigliamo;
- ospite: dettagli pratici, raggiungibilità dalla struttura, note più personali, alternative e contesto;
- privato: eventuali note interne non destinate all'ospite.

Esempio trasporto:

- pubblico: "Cagliari è visitabile anche senza auto";
- ospite: fermata, linea, percorso dalla struttura, alternative;
- privato: note operative interne.

## Strategia di migrazione

Il file attuale `js/data.js` resta intatto durante la fase di fondazione.

La migrazione avverrà per categorie:

1. spiagge;
2. ristoranti;
3. luoghi e cultura;
4. trasporti;
5. itinerari;
6. eventi e consigli contestuali.

Nessun dato esistente viene cancellato finché la nuova struttura non è stata verificata e testata.
