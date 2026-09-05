# Piccolabellavista — Boutique mediterraneo
Redesign della guida ospiti basato su main e266d5b e sui sorgenti aggiornati forniti da Angelo (app v3.1, dati v3.3).

## Avvio e contenuti
Sito statico: nessuna dipendenza di runtime e nessun eval/loader di sorgenti.
Servire index.html e le cartelle css/ e js/ tramite HTTP(S), mantenendo la struttura.
In questo checkout Sites gli asset si trovano in dist/.
Modificare i dati in js/data.js e le traduzioni in js/i18n.js (sotto dist/ nel checkout Sites).
I vecchi sorgenti _source_originale nel repository GitHub sono archivio, non dipendenze runtime.
Non caricare l'archivio dei vecchi sorgenti sul server.

## Design e funzioni
Blu mare/bianco, grandi fotografie reali dell'appartamento, home editoriale, navigazione desktop e mobile.
Sono presenti 11 viste, interfaccia IT/EN/DE, vento Open-Meteo, filtri, eventi locali, mappa e itinerari.
Molte descrizioni sono disponibili solo in italiano e inglese: in tedesco un avviso segnala il testo italiano di riserva.
Le informazioni turistiche preesistenti non sono state tutte riverificate: date, tariffe, aperture e regole richiedono controllo prima dell'uso operativo.
Avvio immediato; meteo aggiornato in seguito, con timeout di 6 secondi e gestione offline.
Dettagli accessibili con focus, chiusura Escape e ritorno al pulsante di origine.

## Fotografie
Quattro fotografie originali fornite da Angelo sono incluse in img/casa/: camera, bagno, panoramica e zona pranzo. La home usa la camera.
Le associazioni fotografiche verificate da Wikimedia Commons sono in js/photos.js; la pagina Fonti espone i crediti disponibili. Altre immagini Commons ereditate dai dati richiedono ancora revisione completa delle attribuzioni.
Le foto sono esterne: il download locale è stato impedito dall'ambiente di lavoro; caricamento sui dispositivi e disponibilità esterna vanno collaudati.
Le altre spiagge restano schede testuali: nessuna foto generica viene spacciata per un luogo specifico.
Il ritaglio avviene soltanto con object-fit:cover.
Le fotografie esterne NON sono garantite offline. Testi, interfaccia, icone e quattro fotografie locali sono precache.

## Sicurezza e cache
L'anteprima Sites è privata per il proprietario. Non equivale a una pubblicazione aperta agli ospiti.
Per Apache usare deploy/apache.htaccess.example configurando il percorso password fuori dalla web root.
Verificare HTTPS, 401 anonimo su pagina e asset, 200 autenticato. Non archiviare password nel repository.
Nessun gate JavaScript viene presentato come autenticazione.
Cache locale network-first; risposte 401/403 e redirect non vengono memorizzati come contenuto.
Fallback offline dei contenuti già scaricati: una revoca sul server non può cancellare copie offline da un dispositivo.
Il service worker elimina solo cache del proprio prefisso e percorso; non interferisce con altre guide sullo stesso dominio.
Aggiornare la versione cache quando cambia il contenuto.

## Verifiche eseguite
node scripts/verify.cjs
- Sintassi dei cinque JavaScript.
- Rendering di tutte le 11 viste in IT, EN e DE (33 combinazioni), senza undefined o immagini con src vuoto.
- Pannelli di dettaglio, filtro ristoranti e quattro fotografie locali.
- Assenza delle credenziali di esempio nei dati distribuiti.
- Riferimenti locali di index.html e icone manifest.

## Collaudo reale ancora necessario
Android Chrome e iPhone Safari: home, menu, lingue, filtri, dettagli, focus e ingrandimento testo.
Fotografie su rete mobile; PWA installazione; modalità aereo dopo primo caricamento; aggiornamento da versione precedente.
Destinazioni Maps e collegamenti esterni, vento live/errori e date degli eventi.
Il controllo automatico non è un collaudo visuale su browser o telefono.
