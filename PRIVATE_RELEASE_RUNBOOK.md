# Piccolabellavista — runbook operativo per il rilascio privato

Questa procedura pubblica la candidata della PR #2 dietro Cloudflare Access e impedisce che il dominio personalizzato, il dominio di produzione `pages.dev`, gli alias di branch o gli URL immutabili delle anteprime offrano una copia pubblica della guida.

`noindex`, `_headers`, un gate JavaScript e un URL difficile da indovinare non sono autenticazione. Cloudflare Access protegge il download iniziale; non può cancellare una copia già salvata nella cache PWA o dal dispositivo dell'ospite.

## 1. Esito richiesto

Il rilascio è `PASS` soltanto quando sono vere tutte queste condizioni:

- la build Cloudflare corrisponde esattamente al commit HEAD della PR #2;
- il dominio personalizzato richiede Access su ogni percorso;
- `<PROJECT>.pages.dev` richiede Access su ogni percorso;
- `*.<PROJECT>.pages.dev` richiede Access e copre alias di branch e URL hash delle anteprime;
- una richiesta anonima diretta a HTML, JavaScript, CSS, fotografie, icone, manifest, crediti e service worker non restituisce il file;
- GitHub Pages e ogni vecchio hosting non servono una seconda copia della guida;
- il repository non rende pubblici gli stessi contenuti che si dichiara di proteggere;
- l'accesso autenticato e il ciclo PWA reale sono stati collaudati.

Se anche una sola origine restituisce la guida o un asset con stato `2xx` senza sessione, l'esito è `FAIL — BLOCCO MERGE`.

## 2. Coordinate da compilare prima di iniziare

Non procedere con segnaposto. Copiare i valori effettivi da GitHub e dal pannello Cloudflare.

| Variabile | Valore |
|---|---|
| `REPO` | `stocchinoangelo-collab/piccolabellavista-guida-ospiti` |
| `PR` | `2` |
| `CANDIDATE_BRANCH` | `design/boutique-mediterraneo` |
| `CANDIDATE_SHA` | `<HEAD corrente della PR al momento del deploy>` |
| `PROJECT` | `<nome esatto del progetto Cloudflare Pages>` |
| `PAGES_PRODUCTION` | `https://<PROJECT>.pages.dev` |
| `PAGES_BRANCH_ALIAS` | `https://design-boutique-mediterraneo.<PROJECT>.pages.dev` |
| `PAGES_HASH_PREVIEW` | `https://<HASH>.<PROJECT>.pages.dev` |
| `CUSTOM_HOST` | `<hostname privato approvato, senza https://>` |
| `CUSTOM_ORIGIN` | `https://<CUSTOM_HOST>` |
| `ACCESS_TEAM` | `<nome-team>.cloudflareaccess.com` |
| `VERIFICATORE` | `<nome>` |
| `DATA_ORA` | `<YYYY-MM-DD HH:mm Europe/Rome>` |

Il nome dell'alias deriva dal branch: Cloudflare converte `/` in `-`. L'URL hash e tutti gli alias effettivi vanno copiati da **Workers & Pages > progetto > Deployments > View build**; non vanno ricostruiti a memoria.

## 3. Blocco zero: eliminare le origini che Cloudflare non può proteggere

### 3.1 Repository

Alla revisione del 7 settembre 2026 il repository risulta **pubblico**. Cloudflare Access non protegge i file leggibili su GitHub o su `raw.githubusercontent.com`.

Per poter dichiarare la guida realmente privata:

1. In GitHub aprire **Settings > General > Danger Zone > Change repository visibility**.
2. Rendere il repository `Private` prima di aggiungere istruzioni della casa destinate soltanto agli ospiti.
3. Verificare da una finestra non autenticata che il repository e `https://raw.githubusercontent.com/stocchinoangelo-collab/piccolabellavista-guida-ospiti/<CANDIDATE_SHA>/js/data.js` non siano leggibili.

Se il repository deve restare pubblico, il pacchetto deve contenere soltanto informazioni pubblicabili. In quel caso Access limita la via di accesso al sito, ma non rende segreto il contenuto: non chiamare il risultato “guida privata”. Non inserire mai codici porta, password Wi-Fi, documenti, dati personali, token o segreti nel repository o nella PWA.

### 3.2 GitHub Pages e vecchi hosting

1. In GitHub aprire **Settings > Pages**.
2. Se compare una pubblicazione attiva, scegliere **Unpublish site**.
3. Rimuovere eventuale `CNAME` o workflow separato che pubblichi su GitHub Pages.
4. Provare senza login:
   - `https://stocchinoangelo-collab.github.io/piccolabellavista-guida-ospiti/`
   - eventuali domini usati in passato;
   - eventuali URL Netlify, Vercel o altri provider presenti nei DNS o nella cronologia del progetto.
5. Il test è `PASS` soltanto se nessuno di questi URL restituisce l'app shell o un suo asset.

### 3.3 Pacchetto distribuibile

Da un checkout pulito del branch candidato:

```bash
npm test
tmp="$(mktemp -d)"
node scripts/build.cjs "$tmp/dist"
find "$tmp/dist" -type f -printf '%P\n' | sort
```

La directory `dist` deve contenere soltanto gli asset ospiti definiti da `scripts/build.cjs`. Audit, test, runbook e file operativi non devono essere pubblicati. Non copiare manualmente l'intero repository nella directory di output.

## 4. Creare Cloudflare Pages senza una finestra di esposizione della candidata

La prima pubblicazione di un progetto Pages nasce con URL pubblici. Per questo, fino al completamento di Access, `main` deve contenere soltanto materiale non riservato e la candidata non deve essere distribuita né condivisa.

1. Aprire **Cloudflare > Workers & Pages > Create > Pages > Connect to Git**.
2. Selezionare esattamente il repository indicato sopra.
3. Impostare:
   - Framework preset: `None`;
   - Production branch: `main`;
   - Root directory: `/`;
   - Build command: `node scripts/build.cjs`;
   - Build output directory: `dist`.
4. Completare la prima build non riservata di `main`.
5. Aprire **Settings > Builds & deployments**:
   - disattivare temporaneamente le build automatiche dei branch preview scegliendo `None`;
   - non eseguire ancora un nuovo deploy della candidata.
6. Registrare `PROJECT`, `PAGES_PRODUCTION` e il commit mostrato nei dettagli del deployment.

Non aggiungere variabili d'ambiente contenenti segreti: il sito è statico e non ne richiede.

## 5. Collegare il dominio personalizzato prima di creare la sua app Access

Cloudflare documenta un problema noto: un dominio personalizzato non può essere aggiunto a Pages se sullo stesso hostname esiste già una policy Access. Rispettare quindi questo ordine:

1. Aprire **Workers & Pages > progetto > Custom domains > Set up a domain**.
2. Inserire il solo hostname destinato alla guida; non usare il dominio commerciale intero.
3. Attendere lo stato `Active` e il certificato valido.
4. Registrare il valore esatto in `CUSTOM_HOST`.
5. Non condividere l'URL e non caricare contenuti riservati finché la sezione 8 non è `PASS`.

## 6. Attivare One-Time PIN

Nelle nuove organizzazioni Zero Trust, OTP non è necessariamente attivo per impostazione predefinita.

1. Aprire **Zero Trust > Integrations > Identity providers**.
2. Se `One-time PIN` non è presente, scegliere **Add new identity provider > One-time PIN**.
3. Non autorizzare domini email interi.
4. Preparare l'elenco degli indirizzi email esatti:
   - proprietario/amministratore;
   - verificatore QA;
   - singoli ospiti autorizzati, aggiunti solo quando necessario.

Ogni PIN è monouso e scade dopo 10 minuti. Cloudflare invia il PIN solo a un indirizzo già ammesso dalla policy; la schermata non rivela se l'indirizzo è autorizzato.

## 7. Creare le tre coperture Access

Il wildcard delle preview **non copre** `<PROJECT>.pages.dev`. Servono coperture separate.

### 7.1 App 1 — dominio `pages.dev` di produzione

1. In **Workers & Pages > progetto > Settings > General** scegliere **Enable access policy**.
2. Aprire **Manage** sull'applicazione creata per le preview.
3. In **Zero Trust > Access controls > Applications**, aprire l'app e scegliere **Configure**.
4. Nel Public hostname eliminare il wildcard `*` dal campo Subdomain, lasciando esattamente `<PROJECT>.pages.dev`.
5. Lasciare il campo **Path vuoto**: così sono protetti `/` e tutti i percorsi.
6. Rinominare l'app `PBV Guide - pages.dev production` e salvare.

### 7.2 App 2 — tutte le preview Pages

1. Tornare in **Workers & Pages > progetto > Settings > General**.
2. Selezionare di nuovo **Enable access policy**.
3. Verificare che esista una seconda app con hostname `*.<PROJECT>.pages.dev`.
4. Lasciare il campo **Path vuoto**.
5. Rinominare l'app `PBV Guide - Pages previews`.

Questa app copre gli hostname a un solo livello, compresi `<HASH>.<PROJECT>.pages.dev` e `design-boutique-mediterraneo.<PROJECT>.pages.dev`. Non copre il dominio padre, già gestito dall'App 1.

### 7.3 App 3 — dominio personalizzato

1. Aprire **Zero Trust > Access controls > Applications**.
2. Scegliere **Create new application > Self-hosted and private > Add public hostname**.
3. Selezionare l'hostname esatto di `CUSTOM_HOST`.
4. Lasciare il campo **Path vuoto**.
5. Nome: `PBV Guide - custom hostname`.

### 7.4 Policy identica sulle tre app

Su ciascuna app creare o collegare una policy con questi valori:

| Campo | Valore obbligatorio |
|---|---|
| Action | `Allow` |
| Include | indirizzi email esatti autorizzati |
| Identity provider | `One-time PIN` |
| Session duration | `24 hours` |
| Path | vuoto |

Controllare inoltre:

- nessuna regola `Bypass`;
- nessun `Include: Everyone`;
- nessun dominio email generale;
- nessun service token nella policy degli ospiti;
- nessuna applicazione più specifica su `/js`, `/images`, `/img`, `/icons`, `/credits`, `/manifest.webmanifest` o `/sw.js` con regole meno restrittive.

Le applicazioni Access sono deny-by-default: chi non corrisponde a una policy `Allow` deve restare fuori. Non aggiungere una policy `Deny Everyone`, perché una regola Deny può prevalere anche sugli utenti legittimi.

## 8. Prova del perimetro prima di distribuire la candidata

### 8.1 Controllo anonimo manuale

Usare una finestra privata nuova, senza login Cloudflare, senza cookie e senza service worker già installato. Aprire direttamente su `PAGES_PRODUCTION` e `CUSTOM_ORIGIN`:

- `/`
- `/index.html`
- `/js/app.js`
- `/js/data.js`
- `/css/release.css`
- `/images/cagliari-porto-smiley-toerist.webp`
- `/img/casa/bagno.jpg`
- `/icons/icon-192.png`
- `/credits/photos.json`
- `/manifest.webmanifest`
- `/sw.js`

Ogni URL deve fermarsi alla pagina Access o ricevere `401/403`. Un file visualizzato, scaricato o restituito con `2xx` è un fallimento.

### 8.2 Controllo anonimo automatico di tutti gli asset

Eseguire da Git Bash, WSL, Linux o macOS. Prima sostituire tutti i segnaposto con gli hostname reali.

```bash
set -euo pipefail

ORIGINS=(
  "https://<PROJECT>.pages.dev"
  "https://design-boutique-mediterraneo.<PROJECT>.pages.dev"
  "https://<HASH>.<PROJECT>.pages.dev"
  "https://<CUSTOM_HOST>"
)

tmp="$(mktemp -d)"
trap 'test -n "${tmp:-}" && rm -rf -- "$tmp"' EXIT
node scripts/build.cjs "$tmp/dist"

mapfile -t PATHS < <(
  {
    printf '/\n'
    find "$tmp/dist" -type f ! -name '_headers' ! -name '.nojekyll' -printf '/%P\n'
  } | sort -u
)

fail=0
for origin in "${ORIGINS[@]}"; do
  if [[ "$origin" == *'<'* ]]; then
    echo "FAIL: segnaposto non sostituito: $origin"
    exit 2
  fi
  origin="${origin%/}"
  for path in "${PATHS[@]}"; do
    headers="$tmp/headers"
    if ! code="$(curl -sS --path-as-is --max-redirs 0 \
      -H 'Cache-Control: no-cache' \
      -D "$headers" -o /dev/null -w '%{http_code}' \
      "$origin$path?privacy-probe=$(date +%s%N)")"; then
      printf 'FAIL NETWORK %s%s\n' "$origin" "$path"
      fail=1
      continue
    fi
    location="$(tr -d '\r' < "$headers" | awk 'tolower($1)=="location:" {print $2; exit}')"

    if [[ "$code" =~ ^(401|403)$ ]]; then
      printf 'PASS %s %s%s\n' "$code" "$origin" "$path"
    elif [[ "$code" =~ ^(301|302|303|307|308)$ ]] && \
         { [[ "$location" == *'.cloudflareaccess.com/'* ]] || \
           [[ "$location" == *'/cdn-cgi/access/login/'* ]]; }; then
      printf 'PASS %s ACCESS %s%s\n' "$code" "$origin" "$path"
    else
      printf 'FAIL %s %s%s -> %s\n' "$code" "$origin" "$path" "$location"
      fail=1
    fi
  done
done

exit "$fail"
```

Il test usa richieste `GET`, non soltanto `HEAD`, non segue redirect inattesi e considera valido un redirect solo se porta al login Access. Conservare l'output come evidenza senza salvare cookie, PIN o token.

## 9. Abilitare e identificare la candidata

Solo dopo il `PASS` della sezione 8:

1. Aprire **Settings > Builds & deployments > Preview branch control**.
2. Scegliere `Custom branches`.
3. Includere soltanto `design/boutique-mediterraneo`; lasciare fuori gli altri branch.
4. Avviare il deployment del commit HEAD corrente del branch candidato.
5. Nei dettagli del deployment verificare e registrare:
   - Branch = `design/boutique-mediterraneo`;
   - Commit = `CANDIDATE_SHA`;
   - Build command = `node scripts/build.cjs`;
   - Output = `dist`;
   - stato = `Success`;
   - URL hash;
   - alias `design-boutique-mediterraneo.<PROJECT>.pages.dev`.
6. Se il commit Cloudflare non coincide con l'HEAD della PR, fermarsi e ridistribuire quello corretto.
7. Ripetere integralmente la sezione 8 aggiungendo sia l'URL hash sia l'alias di branch.

Gli URL hash delle preview restano visitabili anche dopo nuovi deploy. La protezione wildcard deve quindi rimanere attiva; non basta proteggere il solo alias più recente.

## 10. Prova autenticata

1. Usare un browser normale e cancellare prima dati del sito, cache, vecchi service worker e vecchie installazioni PWA per gli hostname in prova.
2. Aprire `PAGES_BRANCH_ALIAS` e autenticarsi con un indirizzo QA esplicitamente autorizzato.
3. Inserire il PIN ricevuto; non registrarlo e non condividerlo.
4. Aprire direttamente tutti gli URL della sezione 8.1.
5. In DevTools > Network attivare `Disable cache` e verificare:
   - HTML `200` e `text/html`;
   - JavaScript `200` con tipo JavaScript, mai HTML di login;
   - CSS `200` e `text/css`;
   - immagini `200` con tipo `image/*`;
   - manifest `200` con tipo manifest o JSON;
   - `sw.js` `200` con tipo JavaScript e contenuto della candidata.
6. Verificare che il browser registri il service worker nello scope della guida e che il manifest sia installabile.
7. Ripetere il login sul dominio personalizzato e sul dominio `pages.dev` di produzione per provare le altre due app Access. Prima del merge basta verificare che la loro pagina corrente si apra dopo il login; la corrispondenza con la candidata si prova sugli URL preview.
8. Rimuovere temporaneamente l'email QA dalla policy, usare una nuova finestra privata e verificare che l'accesso venga negato; poi ripristinare soltanto se serve ancora al collaudo.

## 11. PWA: ciclo reale e limite di revoca

Sul Samsung Galaxy A16/Chrome e almeno su iPhone/Safari:

1. autenticarsi online;
2. installare o aggiungere la guida alla schermata Home;
3. navigare tutte le sezioni e caricare gli asset;
4. attivare la modalità aereo e riaprire la PWA;
5. verificare il funzionamento offline previsto;
6. tornare online;
7. distribuire una nuova versione con cache name incrementato;
8. riaprire l'app e verificare aggiornamento e assenza di pagine di login salvate nella cache.

Limite non eliminabile: dopo il primo accesso autorizzato, file e risposte possono restare nella cache PWA o essere copiati. La scadenza Access o la rimozione dell'email blocca nuovi download di rete, ma non cancella a distanza ciò che il dispositivo possiede già. Per questo il pacchetto offline non deve contenere codici d'ingresso, password Wi-Fi, dati personali o segreti. Al checkout chiedere di disinstallare la PWA e cancellare i dati del sito; non promettere una cancellazione remota.

## 12. Sweep finale contro i bypass

Prima del merge controllare in un'unica sessione:

| Superficie | Prova obbligatoria | PASS |
|---|---|---|
| Repository GitHub | privato; URL repository e raw negati senza login | ☐ |
| GitHub Pages | URL storico non serve app shell o asset | ☐ |
| Dominio personalizzato | anonimo bloccato su tutti i file; pagina corrente accessibile dopo login | ☐ |
| `<PROJECT>.pages.dev` | app Access separata; anonimo bloccato | ☐ |
| `*.<PROJECT>.pages.dev` | app Access wildcard; anonimo bloccato | ☐ |
| Alias del branch | commit = `CANDIDATE_SHA`; anonimo bloccato | ☐ |
| URL hash corrente | anonimo bloccato | ☐ |
| Almeno un vecchio URL hash | anonimo bloccato oppure deployment eliminato | ☐ |
| Altri domini/hosting | nessuna copia pubblica | ☐ |
| Access policies | solo email esatte; nessun Everyone/Bypass | ☐ |
| Asset completi | script sezione 8.2 termina con exit code `0` | ☐ |
| PWA reale | online → offline → online → aggiornamento completato | ☐ |

In **Zero Trust > Access controls > Applications** cercare inoltre applicazioni con hostname sovrapposti o path più specifici. Una regola più specifica può prevalere su quella generale: rimuovere ogni eccezione pubblica per asset o sottopercorsi.

## 13. Gestione ospiti

Per ogni soggiorno:

1. aggiungere alla policy soltanto l'email confermata dell'ospite;
2. inviare il link del solo dominio personalizzato, mai l'URL hash della preview;
3. sessione massima: 24 ore;
4. al checkout rimuovere l'email dalle tre app/policy applicabili;
5. verificare il diniego da una nuova finestra privata;
6. non conservare PIN, cookie Access o token nei messaggi operativi o nel repository.

## 14. Arresto e ripristino sicuro

Se un test anonimo restituisce un asset:

1. non condividere l'URL e non marcare la PR pronta;
2. non disattivare Access, perché ciò renderebbe l'origine pubblica;
3. chiudere temporaneamente l'accesso rimuovendo le policy `Allow` dalle app interessate;
4. correggere hostname, wildcard, path o policy;
5. ripetere i test da un contesto realmente anonimo;
6. riaprire l'accesso soltanto dopo un nuovo `PASS`.

Se il deployment è errato, fare rollback dall'interfaccia Pages a una versione già protetta. La protezione Access deve restare attiva durante tutto il rollback.

## 15. Verbale di rilascio

Compilare e allegare alla PR senza indirizzi email completi, cookie, PIN o token:

```text
PR: #2
Candidate branch:
Candidate SHA:
Cloudflare Pages project:
Custom hostname:
Production pages.dev:
Branch alias:
Hash preview:
Access apps verificate: 3/3
Test anonimo completo: PASS/FAIL
Test autenticato: PASS/FAIL
GitHub Pages disattivato: PASS/FAIL
Repository non esposto: PASS/FAIL
PWA dispositivi reali: PASS/FAIL
Verificatore:
Data e ora Europe/Rome:
Limite residuo:
Esito: READY FOR REVIEW / BLOCKED
```

La PR può uscire da Draft soltanto con `READY FOR REVIEW` e tutte le righe obbligatorie in `PASS`. Dopo il merge, ma prima di inviare il link agli ospiti, ripetere le sezioni 8 e 10 sul dominio personalizzato e su `<PROJECT>.pages.dev`, verificando che entrambi servano il commit di produzione atteso e tutti gli asset della candidata. Il comando di merge non è parte di questo runbook.

## Fonti operative Cloudflare

- [Preview deployments e protezione Access](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Procedura Cloudflare per proteggere sia `pages.dev` sia le preview](https://developers.cloudflare.com/pages/platform/known-issues/#enable-access-on-your-pagesdev-domain)
- [Wildcard e protezione di tutti i path](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/)
- [Applicazioni self-hosted e deny-by-default](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
- [One-Time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/)
- [Cookie di autorizzazione verificato su ogni richiesta](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/)
- [Controllo dei branch Pages](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)
- [Configurazione build Pages](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Domini personalizzati Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
