# Piccolabellavista — Guida privata · VERSIONE 1.2 FINALE

Contenuti verificati su fonti istituzionali (verifica esterna completata).
16 spiagge · 32 luoghi · 12 eventi (+ motore CSV Google Sheet) · 17 voci enogastronomiche · 6 itinerari · IT/EN/DE.

## STRUTTURA RUNTIME V1.2
La cartella pubblicabile usa i percorsi canonici `index.html`, `css/style.css`, `js/i18n.js`, `js/data.js`, `js/app.js`.
I file sorgente originali ricevuti con intestazione descrittiva sono conservati in `_source_originale/`; `js/app.js` li carica in ordine, rimuove la sola riga-intestazione e avvia il codice originale nello stesso scope.

## AVVIARE IN LOCALE
VS Code Live Server, oppure `python -m http.server 8000`, oppure `npx serve .`
(Service worker richiede un server: non aprire index.html con doppio clic.)

## PUBBLICARE (Apache/cPanel — percorso consigliato, con Basic Auth)
1. cPanel → SSL/TLS Status → Run AutoSSL (lucchetto su dominio E www).
2. Caricare l'intera cartella in public_html/piccolabellavista/.
3. Creare il file password FUORI dalla web root: cPanel > Directory Privacy
   oppure `htpasswd -c -B /home/UTENTE/.htpasswds/piccolabellavista ospiti` + chmod 600.
4. Collaudo:
   - senza credenziali: tutte le pagine/asset devono rispondere HTTP 401 (curl -sI);
   - con credenziali: HTTP 200 e sito pienamente navigabile;
   - login → Aggiungi alla Home (PWA) → modalità aereo → guida funzionante offline.
Un utente separato per ogni famiglia/gruppo: revoca individuale cancellando una riga del file password.

## AGGIORNARE I CONTENUTI
I dati da mantenere sono nel sorgente `_source_originale/jsdata.js`. Quando si modifica il contenuto, mantenere il loader e aggiornare la cache in `sw.js` (es. `pbv-v14` → `pbv-v15`).

## EVENTI DINAMICI (Google Sheet → CSV)
Intestazioni esatte: id,nome,comune,provincia,data_inizio,data_fine,categoria,
descrizione,url_ufficiale,latitudine,longitudine,checked,stato,lingua_it,lingua_en,lingua_de
(+ colonna facoltativa "mesi" per feste ricorrenti, es. "8;9").
stato: "annullato" nasconde l'evento · "da_verificare"/"posticipato" → badge giallo.
Pubblicazione: File > Condividi > Pubblica sul web > CSV. URL nel sorgente dati →
CONFIG.eventsCsv.url. Fallback automatico alla lista locale in caso di problemi.
REGOLA FONTI: solo Comuni/Pro Loco/organizzatori/fondazioni/SardegnaTurismo.
Compilare sempre "checked" ad ogni verifica umana.

## DATI AUTOMATICI vs STATICI
AUTOMATICI: vento del giorno (Open-Meteo, keyless, sempre live), stagione,
filtraggio eventi passati/conclusi, ordinamento per data, sincronizzazione CSV.
STATICI: spiagge, luoghi, stelle-vento, lista eventi di riserva,
enogastronomia, itinerari, tempi in auto (SEMPRE stime "~": Google Maps è il
riferimento per il viaggio reale).

## PRIVACY
- Basic Auth server-side = barriera principale, da configurare sul server.
- noindex,nofollow nel <meta> + header X-Robots-Tag via server.
- Gate SHA-256 client-side disattivato.
- MAI pubblicare/committare .htpasswd · nessun dato personale nel progetto ·
  foglio eventi pubblico in lettura: mai inserirvi dati personali.
