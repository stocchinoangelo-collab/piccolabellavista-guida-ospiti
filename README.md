# Piccolabellavista · Guida Ospiti 1.3

Implementazione delle decisioni del 6 settembre 2026. Guida statica IT/EN/DE, separata dal sito commerciale piccolabellavista.it.

## File da mantenere
- index.html: ingresso unico, script differiti, metadati PWA.
- css/style.css, css/boutique.css: componenti e tema blu mediterraneo.
- js/data.js: luoghi, spiagge, ricorrenze, otto voci enogastronomiche, itinerari e gate opzionale.
- js/guide.js: selezione locali, percorsi storici e mobilità.
- js/i18n.js: interfaccia IT/EN/DE.
- js/photos.js, credits/photos.json: soltanto fotografie locali verificate.
- js/editorial.js, js/app.js: pagine, router, filtri, meteo ed eventi CSV opzionali.
- PHOTO_SELECTIONS.md: scelte estetiche vincolanti, distinte dai permessi.
- PHOTO_CREDITS.md: attribuzioni e licenze delle derivate fotografiche.
- IMPLEMENTATION_CHECKLIST.md: esiti e limiti del collaudo.

I vecchi loader XHR/eval e i duplicati sono ritirati; le versioni precedenti restano recuperabili nella cronologia Git.

## Avvio e test
Nessuna dipendenza o compilazione. Con Node.js 20 o superiore:

    node scripts/serve.cjs
    node tests/verify.cjs

Il server può essere avviato anche con npm run dev. In produzione bastano i normali file statici.

## PWA
Pubblicare tramite HTTPS. I percorsi relativi supportano sottocartelle. Il service worker salva app shell e immagini; incrementare il suffisso cache in sw.js a ogni aggiornamento. Se un asset manca, l'installazione della nuova cache fallisce senza sostituire quella precedente. Le cache sono distinte per percorso. Meteo, Maps, contatti e siti esterni richiedono rete.

Il gate SHA-256 resta disabilitato come in origine. È un filtro lato client, non protegge i file del sito. L'eventuale autenticazione server va gestita sull'hosting. Nessuna password o credenziale viene aggiunta.

## Contenuti
Le ricorrenze statiche sono un archivio di tradizioni, mai date automaticamente confermate dell'anno successivo. Il motore CSV resta disponibile con CONFIG.eventsCsv (enabled, url, mode), per un foglio mantenuto e verificato. Date concluse e annullamenti vengono filtrati.
Per i percorsi si usa l'indirizzo testuale della struttura e Maps/Busfinder. Le coordinate approssimative di Pirri servono al meteo, non indicano il portone. Fermate, tempi e prezzi non verificati non sono inventati.

## Foto
Undici originali esatti Wikimedia, verificati e convertiti in WebP. I due fallback gastronomici non annullano le scelte dell'utente. Le nove schede dei locali non caricano foto senza permesso. credits/beach-images.json è un archivio storico non attivo da rivalidare.
La pagina Fonti e crediti mostra autore, fonte e licenza. Le derivate CC BY-SA conservano la licenza originale, separata dal codice.
