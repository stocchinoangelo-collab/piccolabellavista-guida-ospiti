# Concierge redesign v2 — QA finale della sessione

Data: 8 settembre 2026. Branch: `concierge/redesign-v2`.
Base: `3cba9cb422bc732699337676d4d84be30caff856`.

**Esito: implementazione candidata, NON pronta per merge o produzione.** I gate browser, responsive e PWA reale restano non verificati. Il conflitto privacy/offline richiede una decisione separata. Non confondere i test VM con un browser o un telefono reale.

## Commit tematici

- `181e896` — audit scritto prima delle modifiche al codice.
- `aa77bcb` — homepage per bisogni, navigazione principale ridotta, tema caldo, didascalie e placeholder IT/EN/DE.
- `dba6d71` — controlli sui fallback autorizzati e versione cache. Durante questo passo rilevato un errore nel nuovo test (confronto testo non escapato); corretto nel commit seguente.
- `f2f462a` — chiusura menu mobile, contenimento focus, confronto HTML escapato e test ritorno rete.
- Il commit di questo report contiene soltanto documentazione QA.

## Prima / dopo e motivazioni

| Prima | Candidata | Motivo |
|---|---|---|
| Hero mobile minima 570 px | 370 px, senza altezza fissa | Lasciare spazio ai bisogni, consentire espansione del testo DE |
| Quattro categorie equivalenti e suggerimenti più in basso | Oggi → mangiare → mare/città → mobilità/aiuto | Ridurre lo sforzo di scelta dell'ospite |
| 17 link principali equivalenti | 6 principali, tutte le altre sezioni in “Tutta la guida” | Conservare le route rendendo leggibile la navigazione |
| Placeholder con testo CSS italiano, aria-hidden | Testo tradotto e descrizione accessibile | Non fingere foto reali, compatibilità IT/EN/DE |
| Foto ambientali senza didascalia esplicita | Didascalia “territorio, non locale” | Chiarezza editoriale e rispetto diritti |
| Altezza minima card locali 220 px | Altezza naturale | Evitare spazi artificiali |
| Scorrimento JS sempre animato | Rispetta reduced motion | Accessibilità |

Nessuna nuova dipendenza, font remoto, immagine o servizio AI. Riutilizzati dati, fotografie e componenti esistenti. La hero resta il candidato legale non definitivo.

## Test eseguiti e risultati

Comandi: `node tests/verify.cjs`, `node --check js/editorial.js`, `node --check js/app.js`, `git diff --check`.

| Gate | Esito / prova |
|---|---|
| Rendering delle 17 route in IT/EN/DE | PASS: 51 render VM, nessun undefined o percorso locale mancante |
| Nuovi bisogni e chiavi multilingua | PASS: etichette presenti, confrontate come HTML escapato |
| Foto | PASS statico: 24 record runtime approvati, file e attribuzioni presenti; sui locali solo i due fallback ambientali autorizzati |
| Esclusioni | PASS: nessuna delle tre esclusioni nel markup delle route in tutte le lingue |
| Manifest | PASS statico: JSON, icone locali, display standalone |
| Worker | PASS simulato: install, activate, offline shell/asset precache, isolamento, ritorno rete e memorizzazione risposta |
| Gate client | PASS simulato: rifiuto/accettazione; resta disabilitato e non è sicurezza |
| Diff e sintassi | PASS |
| Console, click, menu e sheet in browser | NON VERIFICATO: browser remoto rifiuta localhost:4173 con ERR_BLOCKED_BY_CLIENT |
| 360 / 390 / 412 / 768 / 1280 px e overflow DE | NON VERIFICATO: nessun browser raggiungibile per l'anteprima |
| Contrasto, tastiera e leggibilità visuale | Controlli CSS/sorgente soltanto; gate visuale non superato |
| Registrazione SW / installazione PWA / aggiornamento in browser reale | NON VERIFICATO |
| Link esterni, contatti, mappe | URL conservati e controllati strutturalmente; destinazioni non collaudate live, nessun messaggio inviato |

Il tentativo iniziale con Playwright locale non è partito: eseguibile Chromium assente. Il browser fornito dall'ambiente non può raggiungere l'anteprima locale. Nessun screenshot né preview pubblicata; non sono state simulate prove visuali.

## Blocchi residui e approvazioni di Angelo

1. **Privacy e offline (STOP del prompt):** worker cache-first preesistente legge contenuti già salvati senza ricontrollare Access. Concordare se occorre revoca immediata o accesso offline dopo autenticazione, quindi progettare e collaudare la relativa politica. Nessuna configurazione Cloudflare toccata; nessun bypass aggiunto.
2. **Offline fotografico incompleto, preesistente:** registro runtime 24 foto, precache 11. Le altre 13 vengono memorizzate quando effettivamente richieste online: non garantite offline alla prima visita. Non ampliata la persistenza mentre il precedente conflitto è sospeso. Cache incrementata per i file UI modificati, tutti già in CORE.
3. **Collaudo reale necessario:** cinque larghezze richieste; menu, CTA, filtri, sheet, focus, lingue, console; ciclo online/offline/online e aggiornamento da precedente versione; installazione sul telefono. Non approvare il rilascio finché questi gate non passano.
4. **Approvazioni editoriali:** direzione visiva candidata, scatto hero definitivo, revisione madrelingua DE; permessi foto locali e scelte gastronomiche pendenti. Nessuno stato diritti promosso.
5. **Contenuti storici:** non effettuata una nuova verifica di accessi, tariffe, orari e luoghi. Non aggiunte nuove informazioni operative. Avviso di verifica accessi esteso alle cinque spiagge indicate nel prompt; non equivale alla validazione di tutte le note storiche.

## File modificati

`index.html`, `css/boutique.css`, `js/editorial.js`, `js/i18n.js`, `js/app.js`, `sw.js` (sola versione), `tests/verify.cjs`, `docs/CONCIERGE_REDESIGN_AUDIT.md`, questo report.

## Invariati

**main non modificato.** Nessun merge, deploy, modifica Cloudflare/Zero Trust o workflow. Invariati `css/style.css`, manifest e icone, `js/data.js`, `js/guide.js`, `js/photos.js`, tutti gli asset, registri diritti/crediti/scelte fotografiche, JSON Concierge e modello contenuti, indirizzi e contatti, politica cache e gate. Nessuna credenziale introdotta, nessuna pubblicazione in produzione.

## Salvataggio remoto

Commit tematici trasferiti tramite il connettore GitHub autenticato dopo il fallimento del push terminale per credenziali assenti. I riferimenti sopra sono i commit remoti. Aggiornato esclusivamente concierge/redesign-v2 con fast-forward, senza force. Nessun merge o deploy richiesto.

## Seconda verifica completa — richiesta «verifica tutto»

Base remota verificata tramite API GitHub: `b64125febca7265471902cf7bf2301c6a471c3cc` sul branch richiesto. Confronto locale/remoto: codice identico, unica differenza iniziale nel report (hash commit aggiornati dopo trasferimento API). Checkout locale riallineato al remoto senza merge, nessun lavoro utente pendente.

### Difetti trovati e corretti

- **Quattro foto selezionate non comparivano.** Le schede usano `molentis`, `sinzias`, `pelosa`, `brandinchi`; il registro foto usa `punta_molentis`, `cala_sinzias`, `la_pelosa`, `cala_brandinchi`. Aggiunto mapping nel renderer; asset, crediti, diritti e dati originali invariati. Ora tutte le 13 spiagge con foto selezionata rendono la rispettiva immagine. Costa Rei resta senza immagine: non esiste una scelta approvata nel registro runtime e non viene inventata.
- **Avviso stagionale assente su due spiagge.** La condizione introdotta nella prima passata usava identificativi errati per Punta Molentis e Cala Brandinchi. Ora l'avviso è verificato nelle schede di La Pelosa, Cala Brandinchi, Tuerredda, Punta Molentis e Porto Giunco, in IT/EN/DE.
- **Copertura test insufficiente.** I 51 render precedenti controllavano le immagini presenti, senza rilevare quelle mancanti. Aggiunti 42 render di schede spiaggia (14 × 3 lingue), presenza delle 13 immagini selezionate, avvisi delle cinque spiagge e risoluzione dei link hash delle pagine. Questi controlli avrebbero rilevato i difetti precedenti.
- Versione worker incrementata a `2026-09-08-concierge-v2-qa2`, senza cambiare la politica cache.

### Prove supplementari

| Controllo | Risultato |
|---|---|
| `node tests/verify.cjs` | PASS: 51 render pagina + 42 render dettaglio, route hash, foto selezionate, avvisi, manifest e simulazioni SW/gate |
| Sintassi di tutti i sorgenti e script | PASS: 10 file JS/MJS/CJS, 5 script Python |
| JSON e manifest | PASS sintattico: 7 file; validatore completo JSON Schema non disponibile, non dichiarata conformità completa allo schema |
| Decodifica immagini | PASS: 49 WebP/PNG, nessun file corrotto |
| Dizionari | Nessuna chiave IT mancante/vuota in EN/DE; non equivale a revisione madrelingua |
| Diritti locali | Tutti i 9 record locali conservano `PENDING_PERMISSION`; renderer usa solo placeholder o i due contesti autorizzati |
| Credenziali | Nessuna corrispondenza dei pattern di chiavi private e token GitHub controllati nel testo modificato; non è una certificazione universale |
| Registri foto | 24 foto runtime, 11 nel precache; le 13 altre rimangono subordinate alla prima richiesta online |
| `git diff --check` | PASS |

### Cosa NON è diventato verde

- Test reali a 360/390/412/768/1280 px, overflow, leggibilità DE, tastiera, menu/sheet, contrasto sul rendering, console browser, screenshot e installazione/aggiornamento PWA: **non verificati**. L'ambiente browser disponibile aveva rifiutato l'anteprima locale; non effettuato un deploy o creato URL alternativi per aggirare il blocco.
- Revoca Access e cache-first: **blocco privacy ancora aperto**, nessuna modifica autorizzativa introdotta.
- Note operative storiche: per esempio La Pelosa contiene ancora un intervallo stagionale di prenotazione obbligatoria nel dato originale. L'avviso aggiunto invita al controllo, ma **non verifica né aggiorna quel dato**. Serve revisione delle informazioni variabili prima di promuoverle a contenuto attuale.
- Nome PWA nel manifest ancora “Guida privata alla Sardegna”: incongruenza editoriale minore con il titolo Concierge, manifest lasciato invariato per questa verifica.
- Nessun controllo live completo dei link esterni o dello stato Cloudflare eseguito.

**Esito aggiornato: candidata migliorata e verificata più a fondo, ancora NON pronta per merge o produzione. main non modificato; nessun merge, modifica Cloudflare/Zero Trust o deploy eseguito.**
