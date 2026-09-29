# Accesso ospiti senza email — attivazione controllata

Questa modifica aggiunge un codice temporaneo verificato da Cloudflare Pages Functions **prima** di servire HTML, JavaScript, immagini, manifest e service worker. Il codice non compare nel repository. Una sessione usa un cookie firmato `HttpOnly`, massimo 12 ore per volta e comunque non oltre la partenza. Cambiare codice o chiave revoca le sessioni online; il service worker esistente non salva pagine private offline.

## Prima dell'attivazione

1. Confermare che il progetto Pages `piccolabellavista-guida-ospiti` pubblica il branch `main` dalla radice del repository e che `functions/_middleware.js` è incluso nel deployment. La protezione Cloudflare Access attuale resta attiva durante i test.
2. Eseguire in privato `node scripts/new-guest-code.cjs 2026-10-03T11:00:00+02:00`, sostituendo data e ora di partenza effettive. Il codice generato va dato agli ospiti tramite canale privato; non inserirlo nei commit, nelle issue o nel MASTER.
3. In Cloudflare > Workers & Pages > progetto > Settings > Variables and Secrets, configurare in **Production** i tre valori generati come Secrets: `GUEST_CODE_SHA256`, `GUEST_SESSION_KEY`, `GUEST_ACCESS_UNTIL`. Ridistribuire se l'interfaccia lo richiede.
4. Impostare il comportamento Pages Functions **fail closed** quando termina la quota, così non vengono serviti file statici senza middleware.
5. Verificare il deployment su un hostname di prova che non richieda email, senza togliere Access al dominio ospiti attuale: `/` mostra il modulo; `/js/app.js`, `/images/...`, `/sw.js`, `/manifest.webmanifest` rispondono 401 senza cookie; il codice apre la Guida; il codice errato è respinto; il cookie scaduto o ruotato è respinto. Controllare anche le versioni IT/EN/DE da mobile.
6. Soltanto dopo i test, nell'app Cloudflare Zero Trust escludere **l'hostname esatto** `piccolabellavista-guida-ospiti.pages.dev` dall'attuale richiesta di email (regola Bypass mirata), lasciando la protezione delle altre app e anteprime. Il middleware deve continuare a proteggere tutte le route. Non usare una regola wildcard sui `*.pages.dev`.
7. Ripetere gli stessi controlli dall'esterno, in finestra privata, sul dominio reale. Se un file privato è raggiungibile senza cookie, ripristinare immediatamente la policy Access precedente.

Per ogni nuovo soggiorno: generare un codice e aggiornare i tre Secrets, con scadenza alla partenza; verificare che il precedente non funzioni. L'aggiornamento dei Secrets può richiedere una nuova distribuzione. Non inviare codici nella chat pubblica o nella pagina web.

**Limite:** il codice può essere condiviso dagli ospiti con altre persone finché è valido. L'accesso è quindi per soggiorno, non una prova dell'identità personale. L'accesso offline ai contenuti privati resta disabilitato per consentire scadenza e revoca.
