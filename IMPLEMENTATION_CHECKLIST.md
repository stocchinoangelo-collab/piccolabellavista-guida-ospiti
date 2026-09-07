# Checklist di consegna per Astra

## Contenuti
- [x] Locale escluso: rimozione da ogni file corrente
- [x] Voce esclusa: rimozione da ogni file corrente
- [x] Biffi rinominato “Biffi American Bar”
- [x] Antico Caffè 1855 presente nella selezione corretta
- [x] Il Gallo d’Oro presente
- [x] Su Cumbidu, Antica Cagliari, Sa Piola presenti
- [x] Le Terrazze, La Paillote, Libarium, Biffi presenti in Aperitivi & tramonti
- [x] Nessun placeholder `[DA VERIFICARE]` visibile al pubblico

## Enogastronomia
- [x] Porceddu
- [x] Fregola
- [x] Malloreddus
- [x] Pane carasau
- [x] Seadas
- [x] Bottarga
- [x] Pecorino sardo
- [x] Cannonau
- [x] Immagini solo legali/autorizzate
- [x] Crediti aggiornati

## Hero
- [x] Cagliari dal porto verso Castello
- [x] No camera/balcone
- [x] No falsa percezione fronte mare
- [~] Overlay leggibile
- [~] Crop responsive
- [x] Hero facilmente sostituibile in futuro

## Design
- [x] Boutique mediterraneo
- [x] Blu mare + bianco + neutri caldi
- [x] Fotografie grandi
- [x] Card uniformi 3:2
- [x] Spaziatura coerente
- [x] CTA chiare
- [x] Mobile-first

## Tecnico
- [x] IT/EN funzionanti
- [x] DE non rotto
- [~] PWA funzionante
- [x] Service worker/cache versionati
- [x] Manifest valido
- [x] Nessun 404
- [x] Nessun errore console
- [x] Lazy-load card
- [x] No lazy-load hero
- [~] No CLS evidente da immagini
- [x] Nessun overflow orizzontale

## Copyright
- [x] Tripadvisor/Foursquare/Pinterest/RestaurantGuru/blog NON usati senza permesso
- [x] `PENDING_PERMISSION` non pubblicati
- [x] CC BY/CC BY-SA con autore, licenza, link fonte e nota modifiche
- [x] Pagina Fonti/Crediti aggiornata

## QA finale
- [x] Mobile 360–390 px
- [x] Tablet 768 px
- [x] Desktop 1280–1440 px
- [x] Menu
- [x] Language switcher
- [~] Maps/WhatsApp
- [x] Gate
- [~] Cache refresh

## Fedeltà alle scelte fotografiche dell'utente
- [x] Letto `SCELTE_FOTOGRAFICHE_STAMATTINA_2026-09-06.md`
- [x] Antico Caffè 1855 = scelta n.1 registrata
- [x] Biffi American Bar = scelta n.1 registrata
- [x] Il Gallo d’Oro = scelta n.1 registrata
- [x] Le Terrazze di Calamosca = scelta n.1 registrata
- [x] La Paillote = scelta n.1 registrata
- [x] Libarium = scelta n.1 registrata
- [x] Porceddu = scelta n.1 registrata e usata se asset legale presente
- [x] Fregola ai frutti di mare = scelta approvata registrata
- [x] Malloreddus = scelta n.2 preservata come target visivo; fallback non la sostituisce
- [x] Pane carasau = scelta n.3 preservata come target visivo; fallback non la sostituisce
- [x] Nessuna scelta numerata inventata per Su Cumbidu / Sa Piola / Antica Cagliari

## Prove eseguite e limiti

- Test automatico con il codice reale: 51 combinazioni pagina/lingua (17 pagine × IT/EN/DE), otto cibi, nove locali, sette destinazioni, undici fotografie, riferimenti locali e manifest. PASS.
- Gate: rifiuto password errata, accettazione della corretta e persistenza controllati in test; configurazione pubblicata conservata OFF.
- Service worker: installazione e precache, attivazione, eliminazione cache storica, rispetto cache estranee, lettura offline di HTML/JS/foto e esclusione meteo remoto, verificati in ambiente di test simulato. PASS.
- Browser reale: avvio, homepage e pagina enogastronomia, percorsi storici, eventi e senza auto nelle viewport 360, 390, 768, 1280 e 1440 px tramite iframe. Nessun overflow orizzontale nei casi misurati.
- Browser reale: cambio IT→EN→DE, menu mobile aperto/chiuso e navigazione a Dove mangiare. PASS.
- Screenshot ispezionati per homepage desktop e griglia mobile. Hero leggibile, proporzioni riservate, nessun taglio del testo osservato; non è stata misurata una metrica CLS con Lighthouse.
- Foto: 20 WebP (11 immagini e 9 thumbnail), decodificati localmente; hero eager, card lazy. Tutti i file esistono e sono non vuoti. I lazy-load fuori schermo non sono considerati errori.
- Console: nessun errore attribuibile alla guida nelle pagine controllate. Sono presenti log dell'estensione del browser di collaudo, esterni al progetto.
- Link Maps: struttura valida e query per destinazioni corrette; non testata ogni navigazione esterna. WhatsApp 393931104422 verificato sul sito pubblico della struttura; nessun messaggio inviato.
- [~] Installazione nativa PWA, modalità aereo su telefono e aggiornamento da una versione realmente installata: da collaudare su HTTPS dopo il deploy. L'anteprima HTTP non costituisce questa prova.
- [~] Crop/overlay: verificati visivamente nei casi ispezionati; la hero resta il candidato legale del brief, non una scelta artistica finale.

## Contenuti non inventati

Le foto dei nove locali restano PENDING_PERMISSION; scelte n.2 malloreddus e n.3 pane carasau preservate con i fallback autorizzati. Prezzi, fermate esatte, tempi totali, parcheggi e giudizi di comodità non confermati non sono mostrati. La Paillote non viene etichettata stagionale senza una verifica corrente. L'indirizzo non confermato di Biffi non viene stampato: il link cerca il nome del locale a Cagliari.

Il mercato di San Benedetto è indicato nella sede provvisoria di Piazza Nazzari sulla fonte del Comune consultata il 6 settembre 2026. La pagina Fonti collega Comune, CTM, SOGAER e fonti delle immagini. I contenuti dei luoghi storici preservati non hanno ricevuto una nuova verifica integrale di ogni dato operativo.

## Distinzione consegna / pubblicazione

Questa checklist documenta la copia implementata e testata. Un commit nel repository non equivale alla pubblicazione sul sito commerciale o alla verifica dell'hosting.
