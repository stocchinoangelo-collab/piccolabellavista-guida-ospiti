# Piccolabellavista · Guida Ospiti 1.4 RC

**Bozza: non pronta al merge o al rilascio.** Vedi [audit del 7 settembre](RELEASE_AUDIT_2026-09-07.md) per problemi aperti e prove effettivamente eseguite.

Implementazione delle decisioni del 6 settembre 2026. Guida statica IT/EN/DE, separata dal sito commerciale piccolabellavista.it.

## File da mantenere
- index.html: ingresso unico, script differiti, metadati PWA.
- css/style.css, css/boutique.css, css/release.css: componenti e tema blu mediterraneo.
- js/data.js: luoghi, spiagge, ricorrenze, otto voci enogastronomiche, itinerari.
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
    node tests/release.cjs
    node tests/startup.cjs
    node tests/offline.cjs
    node tests/http.cjs

Per riprodurre il percorso Pages: `node scripts/serve.cjs --base /piccolabellavista-guida-ospiti/`.
I test Node usano simulazioni per DOM e CacheStorage: non certificano browser, Safari o modalità aereo.

Il server può essere avviato anche con npm run dev. In produzione bastano i normali file statici.

## PWA
Pubblicare tramite HTTPS. I percorsi relativi supportano sottocartelle. Il service worker salva app shell e immagini; incrementare il suffisso cache in sw.js a ogni aggiornamento. Se un asset manca, l'installazione della nuova cache fallisce senza sostituire quella precedente. Le cache sono distinte per percorso. Meteo, Maps, contatti e siti esterni richiedono rete.

Il vecchio gate SHA-256 disattivato è stato rimosso: non proteggeva i file. L’autenticazione reale manca e blocca il rilascio come guida privata. Nessuna password o credenziale viene aggiunta.

## Contenuti
Le ricorrenze statiche sono un archivio di tradizioni, mai date automaticamente confermate dell'anno successivo. Il motore CSV resta disponibile con CONFIG.eventsCsv (enabled, url, mode), per un foglio mantenuto e verificato. Date concluse e annullamenti vengono filtrati.
Per i percorsi si usa l'indirizzo testuale della struttura e Maps/Busfinder. Le coordinate approssimative di Pirri servono al meteo, non indicano il portone. Fermate, tempi e prezzi non verificati non sono inventati.

## Foto
Undici originali esatti Wikimedia, verificati e convertiti in WebP. I due fallback gastronomici non annullano le scelte dell'utente. Le nove schede dei locali non caricano foto senza permesso. credits/beach-images.json è un archivio storico non attivo da rivalidare.
Le quattro foto della casa recuperate dalla PR sono registrate separatamente in credits/house-photos.json; il nome del fotografo non è documentato. Vedi PHOTO_AUDIT_2026-09-07.md.
La pagina Fonti e crediti mostra autore, fonte e licenza. Le derivate CC BY-SA conservano la licenza originale, separata dal codice.
