# Verifica di rilascio — Piccolabellavista, 7 settembre 2026

**Esito: NON PRONTO AL MERGE. Candidato consolidato, non versione certificata per gli ospiti. Obiettivo 9/10 non raggiunto.**

La PR #2 rimane Draft. Nessuna modifica di pubblicazione su main. I test del sito pubblico riguardano main, non questa nuova copia. Le valutazioni non attestano prove su dispositivi non utilizzati.

## Provenienza e confronto

- Main verificato: `3c891194b0b4c7102f9275063d73464ce9cf5310`.
- Head PR #2 verificato: `09e001e7dca406bfd2c15c03ffbfb5f01bdc950b`.
- Base comune: `e266d5b342666717553508341a0c6794db19d3a9`.
- Divergenza: due commit esclusivi per ramo. PR aperta, Draft, mergeable=false prima del consolidamento.
- I 48 file della copia iniziale di main sono stati confrontati con gli SHA blob dell’albero GitHub: nessuna differenza.

I due commit successivi su main sono:

1. `5154017beb773d031f2492cf9b995aaa3aff900f` — “Implement audited September 2026 guest guide brief”: contenuti trilingui, fotografie locali, registri delle scelte, rimozione voci escluse, script diretti e cache versionata.
2. `3c891194b0b4c7102f9275063d73464ce9cf5310` — “Prepare static guest guide for GitHub Pages publishing”: preparazione Pages e `.nojekyll`.

Entrambi vengono preservati come base del candidato; nessuna sostituzione globale con i file più vecchi della PR.

## Risoluzione selettiva dei conflitti

Confronto a tre vie eseguito sui file effettivi; 10 percorsi divergenti. `index.html` presenta quattro blocchi di conflitto, sette altri file un blocco ciascuno e due file conflitti add/add.

| File | Conflitto | Decisione |
|---|---|---|
| index.html | 4 blocchi | Shell e script diretti di main; aggiunta navigazione inferiore ispirata alla PR; rimosso gate disattivato che non offriva autenticazione |
| README.md | 1 blocco | Conservate istruzioni e provenienza di main; aggiunto rimando al presente audit |
| css/style.css | 1 blocco | Base main; non caricato il vecchio loader CSS |
| css/boutique.css | add/add | Preservato tema recente; completamenti isolati in css/release.css |
| js/app.js | 1 blocco | Motore main con itinerari e contenuti completi; recuperate idee di menu, focus e navigazione inferiore della PR |
| js/data.js | 1 blocco | Contenuti trilingui main; eliminata configurazione del finto gate inattivo |
| js/i18n.js | 1 blocco | Dizionari completi main; testi UI aggiunti in tutte le lingue; niente fallback italiano silenzioso |
| js/photos.js | add/add | Foto locali main e relative attribuzioni; non ripristinate foto remote con licenza incompleta |
| manifest.webmanifest | 1 blocco | Icone main, scope esplicito relativo, nessun blocco di orientamento |
| sw.js | 1 blocco | Precache locale main, nuova versione, foto casa, isolamento delle cache per percorso |

Recuperate le quattro fotografie della casa dalla PR, senza sostituirle: SHA dei JPG identici. Non recuperati `css/base.css`, il motore alternativo, i loader e i sorgenti storici nel runtime. Le vecchie revisioni restano consultabili nella storia Git.

Le descrizioni della PR come “protetta da tutti i venti” non vengono trattate come fatti verificati. Calamosca e Solanas restano raggiungibili dalla sezione Spiagge con mappe e indicazione esplicita delle informazioni ancora da verificare. Le schede approfondite di main restano tutte presenti. Foto e testi dei locali esclusi non vengono reintrodotti.

## Registro problemi

La gravità delle righe corrette indica il rischio originario. Le righe APERTO e NON VERIFICATO bloccano il rilascio quando classificate BLOCKER o ALTO.

| AREA | STATO | PROBLEMA | GRAVITÀ | CORREZIONE |
|---|---|---|---|---|
| Accesso privato | APERTO | Pages pubblica la guida senza autenticazione; apertura reale riuscita senza login | BLOCKER | Serve un hosting con autenticazione effettiva, protezione dell’origine e politica per i dati offline. Nessun gate JavaScript può certificare privacy |
| Conflitti | CONSOLIDATO | Dieci file divergenti, rami entrambi avanzati | ALTO | Risoluzione selettiva sopra descritta; stato GitHub da rileggere dopo aggiornamento del branch |
| Browser del candidato | NON VERIFICATO | Il browser rifiuta localhost e 127.0.0.1 con ERR_BLOCKED_BY_CLIENT | ALTO | Preparare anteprima HTTPS protetta e ripetere collaudo sulla build candidata |
| Android/iPhone/tablet | NON VERIFICATO | Nessuna emulazione viewport, Safari/WebKit o prova fisica disponibile con le API browser esposte | ALTO | Samsung A16/Chrome, iPhone/Safari, tablet; rotazione, testo ingrandito, filtri, pannelli e installazione |
| Offline reale | NON VERIFICATO | Nessuna modalità aereo, installazione sul dispositivo o cambio versione reale eseguito | ALTO | Eseguire i sette passaggi della matrice sotto; i test Node non li sostituiscono |
| Contenuti turistici | APERTO | Tempi, accessi, coordinate e valutazioni storiche non ricontrollati integralmente; casa/utili ancora poco operativi | ALTO | Verificare mete e ingressi Maps, accessi e servizi su fonti ufficiali; completare istruzioni soggiorno con Angelo senza pubblicare segreti |
| Suggerimenti per oggi | CORRETTO NEL CODICE | La pagina pubblicata proponeva Cala Brandinchi da Pirri | ALTO | Mete giornaliere limitate a 75 km in linea d’aria e 90 minuti indicativi; altre spiagge restano nella raccolta |
| Vento/meteo | CORRETTO NEL CODICE | “raffiche” non tradotto; scelta manuale mescolata ai dati API; dati API non validati | MEDIO | Testo tradotto, fonte manuale distinta, controllo numerico dei dati; valutazioni esplicitamente orientative |
| Route | CORRETTO NEL CODICE | #cagliari assente, vecchi URL di lingue/trasporti/info e filtro ristoranti non gestiti | ALTO | Pagina Cagliari, alias #enogastronomia/#muoversi/#info, parsing query dei filtri |
| Titolo Spiagge | CORRETTO NEL CODICE | Rimaneva solo l’emoji perché veniva rimossa la parola della voce menu | MEDIO | Titolo completo; un H1 per pagina verificato nei render Node |
| Navigazione mobile | IMPLEMENTATO, QA VISIVO PENDENTE | Mancava la barra inferiore della PR | ALTO | Home, spiagge, mangiare, casa e menu sempre raggiungibili; safe area e testo adattabile |
| Accessibilità | IMPLEMENTATO, QA PENDENTE | Card con link annidati in role=button; gestione overlay incompleta | MEDIO | Pulsanti nativi, Escape, focus di ritorno, blocco del fondo, focus nei filtri, reduced motion e aria-current |
| Foto | PARZIALE | Molte mete senza immagini e nove foto locali senza permessi | MEDIO | Conservate scelte e fallback; nessuna foto generica. Audit separato con fonti e stato |
| Foto casa | PARZIALE | Provenienza da Angelo, fotografo e documento di titolarità non registrati | MEDIO | Recupero identico, solo sezione casa; registro separato, nessuna licenza inventata |
| Multilingua | TEST NODE SUPERATI | Rischio fallback italiano e chiavi visibili | MEDIO | 54 render e 141 pannelli; nessun campo IT/EN/DE mancante nei dati mantenuti. Revisione linguistica umana ancora utile |
| Service worker | TEST NODE SUPERATI | Cleanup legacy non limitato alla guida; assenza di stato offline utile | MEDIO | Pulizia solo del prefisso di questo scope, precache versionato, avviso di preparazione/successo/fallimento, esclusi redirect e richieste esterne |
| Cache vecchie | DOCUMENTATO | Cache legacy senza scope non attribuibili con certezza alla guida | BASSO | Non cancellate indiscriminatamente; eventuale rimozione manuale dopo inventario dell’origine |
| Prestazioni | PARZIALE | Nessun Lighthouse o Core Web Vitals misurato sulla nuova build | MEDIO | Asset locali, lazy loading, dimensioni reali, nessuna dipendenza runtime; misurazione da completare |

## Prove eseguite e limiti

**Browser reale: versione pubblicata di main**, URL `https://stocchinoangelo-collab.github.io/piccolabellavista-guida-ospiti/`.

- 51 aperture: 17 sezioni × IT/EN/DE; testo presente e nessun undefined/null rilevato.
- Screenshot desktop della homepage esaminato; casa e pannello Poetto letti realmente.
- Poetto: apertura, Escape e ritorno del focus verificati. Nell’ispezione della pagina Spiagge: larghezza 1348 px, scrollWidth 1348 px, nessuna immagine caricata risultata rotta.
- Nei log consultati gli errori presenti provenivano da un’estensione del browser. Nessun errore applicativo identificato in quel campione; questo non certifica la nuova build.
- Nessuna emulazione di A16, iPhone o tablet: una larghezza CSS non equivale a Safari reale. Non è stato modificato il sito pubblicato per collaudare la nuova versione.

**Nuovo candidato: test automatici Node e HTTP locale**, eseguiti con Node 24.19.0:

- `tests/verify.cjs`: 54 render, asset, manifest e service worker simulato.
- `tests/release.cjs`: 54 render, 141 pannelli di dettaglio, 609 occorrenze di link Maps controllate strutturalmente, alias, filtri ristoranti, assenza valori invalidi e completezza campi lingua.
- `tests/startup.cjs`: script di avvio completo con DOM simulato, navigazione e gestione inert. Non è un motore browser.
- `tests/offline.cjs`: 25 risorse campione offline; aggiornamento fallito mantiene cache corrente, cambio versione riuscito, query string e isolamento di scope. CacheStorage simulato.
- `tests/http.cjs`: 14 asset serviti byte per byte dal percorso `/piccolabellavista-guida-ospiti/`, MIME JavaScript e 404. Non prova di deploy Pages.
- Sintassi JavaScript controllata. Nessun eval o new Function nel codice pubblico. `.nojekyll` e icone presenti; manifest con start_url/scope/id relativi.

Non eseguiti: click su ogni destinazione esterna, verifica geografica di tutti gli ingressi Maps, revisione completa del contenuto turistico, contrasto misurato su tutte le superfici, zoom reale 200%, touch, rotazione, audit prestazioni, prove browser del candidato e prove fisiche offline.

## Matrice PWA da completare sul candidato

| Passaggio | Stato | Criterio di superamento |
|---|---|---|
| Prima apertura HTTPS | Pendente | Caricamento senza errori e messaggio di disponibilità offline |
| Installazione Android/iOS | Pendente | Icona corretta, avvio standalone, percorso iniziale corretto |
| Ricaricamento | Pendente | Pagina e lingua mantenute, nessun errore o cache mista |
| Modalità aereo | Pendente | Riapertura reale dell’app senza rete |
| Sezioni offline | Pendente | Tutte le sezioni testuali e foto locali; mappe/meteo chiaramente online-only |
| Ritorno online | Pendente | Avviso aggiornato e recupero meteo senza dati inventati |
| Nuovo rilascio | Pendente | Aggiornamento completo anche con scheda vecchia aperta; fallimento download non rompe la versione attiva |

Il browser esposto non fornisce metodi documentati per emulazione offline o installazione PWA. I tentativi di anteprima locale sono stati bloccati. Non è corretto attribuire esito positivo a questi passaggi.

## PRONTO PER IL MERGE

Elementi completati come codice revisionabile, **non via libera al merge dell’intera PR**:

- Consolidamento selettivo sopra main recente, conservazione di foto/scelte/contenuti validi.
- Homepage territoriale, accessi rapidi, foto casa separate e navigazione inferiore.
- Route compatibili, pagina Cagliari, filtri locali e controlli semantici.
- Correzioni meteo, focus, lingue, precache e scope.
- Suite di regressione ripetibile e registri dei limiti.

## DA CORREGGERE PRIMA DEL MERGE

1. Accesso realmente privato: scelta e configurazione dell’hosting, protezione delle risorse e dell’origine pubblica, politica offline coerente. GitHub documenta che l’accesso privato nativo a Pages richiede un’organizzazione Enterprise Cloud e consente accesso a chi può leggere il repository: non è una normale password per ospiti. [Documentazione GitHub](https://docs.github.com/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).
2. Anteprima HTTPS protetta della build candidata e collaudo effettivo su Android/Chrome, iPhone/Safari, tablet e desktop.
3. Tutti e sette i passaggi PWA/offline su dispositivo; test di aggiornamento con scheda già aperta.
4. Verifica editoriale dei dati operativi e degli ingressi Maps; istruzioni della casa realmente utilizzabili dagli ospiti.
5. Ispezione visiva della nuova build, contrasto, zoom e touch: il lavoro su CSS non certifica un risultato da 9/10.

## MIGLIORAMENTI SUCCESSIVI

- Ottenere i permessi delle foto selezionate dei locali, senza cambiare automaticamente le scelte.
- Completare la copertura fotografica delle mete con asset autentici locali e verificati.
- Confermare artisticamente la hero esistente; alleggerire ulteriormente le pagine territoriali più lunghe dopo il test ospite.
- Aggiornare eventi tramite un processo con fonte e data verificabili; nessuna promessa di aggiornamento automatico attualmente attivo.

## Punteggi provvisori, non certificazione

Valutazione prudente del progetto e del candidato: combina evidenza sul sito attuale e analisi del codice. Le aree non collaudate hanno un punteggio di maturità, non un voto di test superato.

| Area | /10 | Limite principale |
|---|---:|---|
| Design | 7,5 | Nuovo layout non visto nel browser |
| Esperienza mobile | 6 | Nessuna prova su viewport/dispositivi richiesti |
| Contenuti | 6 | Dati operativi e casa da completare/verificare |
| Fotografie | 6,5 | Diritti di scelte ancora pendenti e copertura discontinua |
| Multilingua | 8 | Dati completi e test passati; revisione umana delle descrizioni consigliata |
| Accessibilità | 7 | Correzioni e unit test; contrasto, zoom e touch non certificati |
| Prestazioni | 7 | Nessuna misurazione della build finale |
| PWA e offline | 6 | Lifecycle simulato; manca dispositivo reale |
| Affidabilità tecnica | 7,5 | Test automatici riusciti; build candidata e privacy non validate |
| Esperienza complessiva dell’ospite | 6,5 | Privacy, informazioni operative e collaudo bloccano il rilascio |

Nessun problema BLOCKER o ALTO viene considerato risolto per il solo fatto che il codice compila. Il candidato deve rimanere in bozza.
