# Accesso ospiti con PIN — Piccolabellavista Concierge

## Obiettivo

Per gli ospiti il flusso deve essere semplice:

1. aprono il link del Concierge;
2. inseriscono un solo codice;
3. entrano nella guida;
4. il browser resta autorizzato per la durata configurata.

Il PIN non è salvato nel codice del sito. La verifica avviene lato server tramite Cloudflare Pages Functions.

## Variabili da configurare in Cloudflare Pages

Nel progetto Pages, configurare le seguenti variabili/secret per **Production**:

- `GUEST_PIN`: codice da comunicare agli ospiti; usare almeno 6 cifre e cambiarlo periodicamente.
- `SESSION_SECRET`: stringa casuale lunga, almeno 32 caratteri; non comunicarla mai agli ospiti.
- `GUEST_SESSION_TTL_SECONDS`: opzionale. Default 604800 secondi (7 giorni).

Configurare separatamente i valori di Preview se si vuole collaudare il gate su un branch di prova.

## Architettura consigliata

- URL destinato agli ospiti: protetto dal middleware `functions/_middleware.js`.
- Preview tecniche / amministrative: possono continuare a essere protette con Cloudflare Access.
- Non lasciare Cloudflare Access davanti allo stesso hostname usato dagli ospiti, altrimenti comparirà prima la richiesta email/OTP e il PIN semplice non servirà.

Una soluzione pulita è usare un hostname dedicato agli ospiti (per esempio `concierge.piccolabellavista.it`) con il PIN gate e mantenere le preview Pages dietro Cloudflare Access.

## Sicurezza

- Il cookie di sessione è `HttpOnly`, `Secure` e `SameSite=Lax`.
- Il contenuto viene servito con `Cache-Control: no-store, private` e `X-Robots-Tag: noindex`.
- Il PIN non compare nel repository.
- Non usare un PIN banale come `1234`, l'anno corrente o il numero civico.
- Per una protezione più forte contro tentativi automatici, aggiungere in Cloudflare una regola di rate limiting sul POST `/__guest-login` oppure Turnstile. Questo non è incluso nel primo rilascio per mantenere l'accesso ospite il più semplice possibile.

## Collaudo prima del merge

1. Pubblicare il branch di prova su Cloudflare Pages.
2. Impostare `GUEST_PIN` e `SESSION_SECRET` nell'ambiente Preview.
3. Aprire la preview in finestra anonima: deve apparire solo la schermata PIN.
4. Provare un PIN errato: deve restituire errore senza aprire asset o pagine della guida.
5. Provare il PIN corretto: deve entrare nel Concierge.
6. Aprire direttamente un asset o una pagina interna senza cookie: deve essere negato.
7. Verificare IT/EN/DE e navigazione dopo l'accesso.
8. Aprire `/__guest-logout`: la sessione deve essere eliminata e il sito deve tornare alla schermata PIN.

## Importante

Non disattivare la protezione Cloudflare Access attuale prima di aver verificato il nuovo accesso su un hostname/preview di prova. Il passaggio va fatto solo dopo il collaudo, evitando finestre in cui la guida possa risultare pubblica.
