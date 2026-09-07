# Piccolabellavista — rilascio privato

Questa guida contiene informazioni destinate agli ospiti. `noindex` e un gate JavaScript NON costituiscono autenticazione.

## Architettura di rilascio approvata

1. Repository GitHub come sorgente del codice.
2. Cloudflare Pages per la pubblicazione HTTPS della build.
3. Cloudflare Access davanti all'intera applicazione, inclusi asset, manifest e service worker.
4. Accesso ospiti tramite identità autorizzata o One-Time PIN via email.
5. Nessun segreto, password o codice ospite inserito nel repository o nel JavaScript client.

## Impostazioni Cloudflare Pages

- Framework preset: None / static site.
- Build command: nessuno.
- Output directory: radice del repository.
- Branch produzione: `main` solo dopo approvazione finale.
- Branch anteprima: `design/boutique-mediterraneo` durante il QA.
- Conservare il file `_headers` del repository.

## Cloudflare Access — requisiti minimi

- Proteggere il dominio completo della guida, non soltanto `index.html`.
- Policy predefinita: deny.
- Allow esclusivamente per gli ospiti autorizzati.
- Metodo consigliato per ospiti: One-Time PIN via email.
- Durata sessione breve e coerente con il soggiorno.
- Verificare che richieste dirette a `/js/*`, `/images/*`, `/manifest.webmanifest` e `/sw.js` senza sessione non siano accessibili.
- Non creare bypass pubblici per asset o service worker.

## Verifica privacy obbligatoria

Da finestra anonima/non autenticata:

- `/` deve chiedere autenticazione.
- `/index.html` deve chiedere autenticazione.
- `/js/data.js` deve chiedere autenticazione.
- `/images/...` deve chiedere autenticazione.
- `/manifest.webmanifest` deve chiedere autenticazione.
- `/sw.js` deve chiedere autenticazione.

Con sessione valida tutti gli stessi URL devono funzionare normalmente.

## Matrice dispositivo prima del merge

### Samsung Galaxy A16 / Chrome
- prima apertura HTTPS;
- navigazione Home/Spiagge/Mangiare/Casa/Menu;
- cambio IT/EN/DE;
- pannelli, Escape/indietro, filtri e link Maps;
- installazione PWA;
- modalità aereo e riapertura;
- ritorno online;
- nuovo deploy con app già aperta.

### iPhone / Safari
- layout, safe area, scroll, menu e pannelli;
- aggiunta alla schermata Home;
- riapertura standalone;
- comportamento offline compatibile con i limiti Safari.

### Tablet
- portrait e landscape;
- nessun overflow orizzontale;
- target touch e spaziature leggibili.

### Desktop
- Chrome/Edge e almeno un browser alternativo;
- tastiera, focus, Escape, zoom 200%;
- nessun errore console applicativo.

## Criteri di merge

La PR può uscire da Draft solo quando:

- GitHub Actions QA è verde;
- anteprima HTTPS è protetta da Access;
- test anonimo conferma che anche asset e service worker sono protetti;
- test mobile/tablet/desktop è completato;
- ciclo PWA online → offline → online → aggiornamento è completato;
- informazioni operative della casa sono confermate;
- diritti delle fotografie della casa sono dichiarati dal titolare o fotografo;
- nessuna foto PENDING_PERMISSION viene pubblicata.

Solo dopo questi controlli: `Ready for review`, poi merge su `main`.
