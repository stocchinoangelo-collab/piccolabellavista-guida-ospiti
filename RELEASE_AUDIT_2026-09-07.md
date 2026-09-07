# Verifica di rilascio — Piccolabellavista, 7 settembre 2026

**Esito aggiornato: CODICE CANDIDATO STABILE, RILASCIO ANCORA BLOCCATO DA PRIVACY E QA FISICO.**

La PR #2 rimane Draft. I conflitti con `main` sono stati consolidati e GitHub segnala la PR come mergeable. Non è ancora un via libera al merge perché l'accesso privato reale e il ciclo PWA su dispositivo non sono stati certificati.

## Stato aggiornato

- Base: `main`.
- Branch candidato: `design/boutique-mediterraneo`.
- Consolidamento selettivo completato sopra il `main` recente.
- QuantoBasta e Cala Regina restano esclusi.
- Gallo d'Oro: foto non pubblicata senza verifica del diritto d'uso.
- Nessun gate JavaScript viene considerato autenticazione.

## QA automatico introdotto

È stato aggiunto `.github/workflows/qa.yml` con esecuzione automatica sulla PR verso `main` e sui push al branch candidato.

La suite esegue:

1. controllo sintassi JavaScript;
2. `tests/verify.cjs`;
3. `tests/release.cjs`;
4. `tests/startup.cjs`;
5. `tests/offline.cjs`;
6. `tests/http.cjs`.

Il primo ciclo automatico completo è terminato con successo: tutti gli step sono verdi.

## Preparazione rilascio privato

È stato aggiunto `_headers`, pronto per Cloudflare Pages, con:

- `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `X-Frame-Options: DENY`;
- `Permissions-Policy` restrittiva;
- Content Security Policy compatibile con gli asset locali e Open-Meteo;
- no-cache per service worker, manifest e HTML.

È stato aggiunto `PRIVATE_RELEASE_RUNBOOK.md` con architettura di rilascio, configurazione Cloudflare Access, test privacy diretti sugli asset e matrice dispositivo.

## Architettura privacy richiesta

La versione ospiti deve essere pubblicata tramite HTTPS dietro autenticazione reale. La configurazione raccomandata è:

- GitHub come sorgente;
- Cloudflare Pages come hosting statico;
- Cloudflare Access davanti all'intera applicazione;
- policy predefinita deny;
- accesso ospite tramite identità autorizzata o One-Time PIN via email;
- nessuna password o PIN permanente nel JavaScript o nel repository.

La protezione deve coprire anche `/js/*`, `/images/*`, `/manifest.webmanifest` e `/sw.js`, non soltanto la homepage.

## Bloccanti rimasti prima del merge

### BLOCKER — privacy reale

L'URL oggi pubblicato tramite GitHub Pages non è autenticato. `noindex` evita l'indicizzazione ma non impedisce l'accesso a chi conosce l'indirizzo.

**Criterio di chiusura:** anteprima HTTPS dietro Cloudflare Access e prova anonima che homepage, dati, immagini, manifest e service worker richiedano autenticazione.

### ALTO — QA su dispositivi reali

Da completare su:

- Samsung Galaxy A16 / Chrome;
- iPhone / Safari;
- tablet portrait e landscape;
- desktop con tastiera e zoom 200%.

### ALTO — ciclo PWA reale

Da completare:

1. prima apertura HTTPS;
2. installazione;
3. ricaricamento;
4. modalità aereo;
5. navigazione sezioni offline;
6. ritorno online;
7. nuovo rilascio con vecchia sessione/app già aperta.

I test automatici della cache sono verdi, ma non sostituiscono il comportamento reale del browser installato.

### ALTO — contenuti operativi

Confermare prima dell'uso ospiti le informazioni della casa e i dati che possono cambiare: accessi, orari, parcheggi, servizi, istruzioni di soggiorno e ingressi Maps essenziali.

### MEDIO — fotografie della casa

I quattro file sono quelli già forniti da Angelo e conservati senza modifica. Mancano nome del fotografo e dichiarazione autonoma di titolarità/permesso. Nessuna licenza viene inventata.

## Fotografie territoriali

Le fotografie Commons attive hanno fonte e licenza registrate nei file di crediti. Le fotografie dei locali ancora `PENDING_PERMISSION` non vengono pubblicate. Le scelte estetiche rimangono registrate senza sostituzioni arbitrarie.

## Criterio di uscita dal Draft

La PR #2 può diventare `Ready for review` solo quando:

- GitHub Actions QA è verde;
- Cloudflare Access protegge l'intera origine;
- test anonimo degli asset è superato;
- QA Galaxy A16/iPhone/tablet/desktop è superato;
- ciclo PWA online → offline → online → aggiornamento è superato;
- informazioni operative essenziali sono confermate;
- diritti delle foto della casa sono dichiarati;
- nessuna foto `PENDING_PERMISSION` è attiva.

Fino a quel momento: nessun merge su `main`.

## Valutazione aggiornata

| Area | /10 | Stato |
|---|---:|---|
| Design | 7,5 | QA visivo reale pendente |
| Esperienza mobile | 6,5 | struttura migliorata, dispositivo reale pendente |
| Contenuti | 6 | validazione operativa pendente |
| Fotografie | 6,5 | licenze territoriali buone, copertura/permessi parziali |
| Multilingua | 8 | suite automatica verde, revisione madrelingua consigliata |
| Accessibilità | 7,5 | regressioni automatizzate; zoom/touch reali pendenti |
| Prestazioni | 7 | asset locali; misurazione reale finale pendente |
| PWA e offline | 7 | test automatici verdi; ciclo dispositivo pendente |
| Affidabilità tecnica | 8,5 | QA automatica ora obbligatoria e verde |
| Esperienza complessiva | 7 | privacy e prova fisica impediscono ancora il 9/10 |

L'obiettivo 9/10 resta raggiungibile, ma non viene dichiarato senza le prove finali indicate sopra.

## Secondo intervento — pacchetto pubblico e installazione cache

Integrati senza sovrascriverli i quattro commit successivi al consolidamento, fino a `c233aaed4497b8f5e4756dae0c9c0c5e62f53129`.

| AREA | STATO | PROBLEMA | GRAVITÀ | CORREZIONE |
|---|---|---|---|---|
| Pacchetto di rilascio | CORRETTO | Il runbook pubblicava la radice con documenti operativi e test | MEDIO | Export esplicito di 43 file in dist; esclusi sorgenti di test, audit e registri delle scelte |
| Download della cache | CORRETTO NEI TEST | Il precache non rifiutava esplicitamente redirect di autenticazione o HTML ricevuto al posto di JS | ALTO | Download con redirect:error, verifica del MIME e pulizia della sola installazione fallita |
| Aggiornamento asset | CORRETTO NEI TEST | Il nuovo precache poteva riutilizzare risposte della cache HTTP | ALTO | cache:reload durante il download; nuova versione del service worker |
| Origini alternative | DOCUMENTATO, APERTO | Access sul dominio principale non certifica protezione di Pages, anteprime o repository pubblico | BLOCKER | Runbook ampliato con verifica di tutte le origini e limiti delle copie offline |

`npm test` locale superato: suite precedenti più `tests/build.cjs`. Il test offline ora verifica anche HTML di login, risposta reindirizzata e rimozione della cache incompleta. `tests/build.cjs` verifica byte identici, presenza dell’intero precache ed esclusione dei documenti interni. Nessun test aggiunto sostituisce Safari, Android, installazione PWA o modalità aereo reali. Il workflow include il nuovo controllo, ma il suo esito remoto va verificato dopo il push.

Fonti tecniche: [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), [modalità cache delle richieste](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache), [header Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/headers/). Gli header non attivano autenticazione. Nessuna configurazione di hosting è stata applicata in questo intervento e nessun punteggio viene aumentato sulla sola base dei test.
