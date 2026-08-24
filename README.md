README.md

# Piccolabellavista — Guida privata · VERSIONE 1.2 FINALE

Contenuti verificati su fonti istituzionali (verifica esterna completata).
16 spiagge · 32 luoghi · 12 eventi (+ motore CSV Google Sheet) · 17 voci enogastronomiche · 6 itinerari · IT/EN/DE.

## AVVIARE IN LOCALE
VS Code Live Server, oppure `python -m http.server 8000`, oppure `npx serve .`
(Service worker richiede un server: non aprire index.html con doppio clic.)

## PUBBLICARE (Apache/cPanel — percorso consigliato, con Basic Auth)
1. cPanel → SSL/TLS Status → Run AutoSSL (lucchetto su dominio E www).
2. Caricare l'intera cartella (con .htaccess) in public_html/piccolabellavista/.
3. Creare il file password FUORI dalla web root: cPanel > Directory Privacy
   oppure `htpasswd -c -B /home/UTENTE/.htpasswds/piccolabellavista ospiti` + chmod 600.
4. Collaudo:
   - senza credenziali: tutte le pagine/asset devono rispondere HTTP 401 (curl -sI);
   - con credenziali: HTTP 200 e sito pienamente navigabile;
   - login → Aggiungi alla Home (PWA) → modalità aereo → guida funzionante offline.
Un utente separato per ogni famiglia/gruppo: revoca individuale cancellando una riga del file password.

## AGGIORNARE I CONTENUTI
Modifica SOLO js/data.js. Dopo ogni modifica aumenta la versione in sw.js:
CACHE="pbv-v12" → "pbv-v13" ecc. (forza l'aggiornamento sui telefoni).

## EVENTI DINAMICI (Google Sheet → CSV)
Intestazioni esatte: id,nome,comune,provincia,data_inizio,data_fine,categoria,
descrizione,url_ufficiale,latitudine,longitudine,checked,stato,lingua_it,lingua_en,lingua_de
(+ colonna facoltativa "mesi" per feste ricorrenti, es. "8;9").
stato: "annullato" nasconde l'evento · "da_verificare"/"posticipato" → badge giallo.
Pubblicazione: File > Condividi > Pubblica sul web > CSV. URL in js/data.js →
CONFIG.eventsCsv.url. Fallback automatico alla lista locale in caso di problemi.
REGOLA FONTI: solo Comuni/Pro Loco/organizzatori/fondazioni/SardegnaTurismo.
Compilare sempre "checked" ad ogni verifica umana.

## DATI AUTOMATICI vs STATICI
AUTOMATICI: vento del giorno (Open-Meteo, keyless, sempre live), stagione,
filtraggio eventi passati/conclusi, ordinamento per data, sincronizzazione CSV.
STATICI (js/data.js): spiagge, luoghi, stelle-vento, lista eventi di riserva,
enogastronomia, itinerari, tempi in auto (SEMPRE stime "~": Google Maps è il
riferimento per il viaggio reale).

## PRIVACY
- Basic Auth server-side (vedi sopra) = barriera principale.
- noindex,nofollow nel <meta> + header X-Robots-Tag via .htaccess.
- Gate SHA-256 client-side disattivato (ridondante).
- MAI pubblicare/committare .htpasswd · nessun dato personale nel progetto ·
  foglio eventi pubblico in lettura: mai inserirvi dati personali.