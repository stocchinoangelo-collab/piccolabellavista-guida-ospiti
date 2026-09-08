# ASTRA — PICCOLABELLAVISTA CONCIERGE REDESIGN

## Ruolo
Agisci contemporaneamente come senior product designer, senior frontend engineer, UX/UI lead mobile-first, accessibility specialist, PWA engineer, content systems architect e QA/release engineer.

Non devi “rifare un sito”. Devi evolvere con disciplina un prodotto già esistente e già funzionante.

Repository:
`stocchinoangelo-collab/piccolabellavista-guida-ospiti`

Branch di lavoro OBBLIGATORIO:
`concierge/redesign-v2`

Non lavorare su `main`.
Non fare merge su `main`.
Non modificare configurazioni Cloudflare/Zero Trust.
Non pubblicare direttamente in produzione.

---

# 1. Obiettivo
Trasformare l’attuale Guida Ospiti in **Piccolabellavista Concierge**, una guida boutique mediterranea mobile-first che accompagni l’ospite durante il soggiorno e renda immediatamente utili i contenuti già costruiti.

Il prodotto deve mantenere il carattere umano:
**Angelo e Viviana scelgono e verificano il valore; il sistema organizza, filtra e propone.**

La futura AI non deve sostituire il giudizio dei proprietari e non deve inventare informazioni operative.

---

# 2. Regola principale: RIUSARE, NON RICOSTRUIRE
Prima di modificare qualsiasi cosa:
1. esamina l’intero repository;
2. identifica componenti, dati, contenuti, traduzioni, immagini, PWA, service worker, routing e CSS già validi;
3. riusa ciò che è già corretto;
4. modifica solo ciò che serve al redesign;
5. non cancellare dati o funzionalità esistenti per comodità.

Il redesign deve essere una evoluzione dell’attuale implementazione, non un progetto parallelo.

File e aree da considerare almeno:
- `index.html`
- `css/style.css`
- `css/boutique.css`
- `js/i18n.js`
- `js/data.js`
- `js/guide.js`
- `js/photos.js`
- `js/editorial.js`
- `js/app.js`
- `manifest.webmanifest`
- service worker esistente
- `PHOTO_SELECTIONS.md`
- `PHOTO_CREDITS.md`
- `docs/CONCIERGE_CONTENT_MODEL.md`
- `docs/RESTAURANT_PHOTO_RIGHTS.md`
- `docs/RESTAURANT_PLACEHOLDER_POLICY.md`
- `data/concierge/`

---

# 3. Architettura prodotto
Piccolabellavista deve essere pensato come ecosistema:

## Sito commerciale
Il sito pubblico principale presenta la struttura, convince e porta alla prenotazione.

## Concierge / Guida Ospiti
La Guida non deve duplicare il sito commerciale. Deve aiutare il cliente a vivere Cagliari e il Sud Sardegna durante il soggiorno.

La homepage del Concierge deve essere organizzata per **bisogno dell’ospite**, non come un catalogo di categorie.

Priorità UX homepage:
1. **Cosa faccio oggi?**
2. **Dove mangio?**
3. **Mare & Cagliari**
4. **Come mi muovo? / Ho bisogno di aiuto**

Scorciatoie contestuali ammesse, se utili e non invasive:
- 3 ore
- senza auto
- stasera
- giornata di mare

Non sovraccaricare la homepage con 8–12 card equivalenti.

---

# 4. Direzione visiva
Stile: **boutique mediterraneo caldo, elegante, umano**.

Da preservare:
- identità Piccolabellavista;
- hero di Cagliari/territorio, non foto dell’appartamento come hero della Guida;
- palette avorio/sabbia/crema;
- blu mare profondo usato con misura;
- accenti terracotta/ocra;
- fotografie grandi e curate;
- tipografia elegante e leggibile;
- atmosfera editoriale, non dashboard SaaS;
- card meno fredde e meno ripetitive;
- ottima leggibilità su smartphone.

Non trasformare il prodotto in:
- una griglia generica di card;
- un portale turistico impersonale;
- una web app fredda;
- un catalogo pieno di icone;
- un clone di Booking/Tripadvisor.

---

# 5. Hero e messaggio
Direzione hero confermata:
Cagliari dal porto verso Via Roma/Castello, marina/acqua in primo piano, luce mediterranea calda, formato orizzontale con spazio per il testo.

Copy guida da preservare salvo micro-miglioramenti motivati:
**“Soggiorna con noi. Vivi Cagliari con i nostri consigli.”**

Non dichiarare definitivo uno specifico scatto hero se il repository lo indica ancora come candidato.

---

# 6. Contenuti e modello Concierge
Usa `docs/CONCIERGE_CONTENT_MODEL.md` come riferimento architetturale.

Livelli:
- `public`
- `guest`
- `private`

Stati verifica:
- `verified`
- `review_due`
- `unverified`
- `retired`

Per informazioni variabili (orari, prezzi, eventi, trasporti, regole spiagge) non inventare mai dati e non promuovere dati vecchi come attuali.

La futura AI può solo:
- recuperare contenuti esistenti;
- filtrare contenuti verificati;
- combinarli;
- spiegare perché li propone.

La futura AI NON può creare dal nulla:
- ristoranti;
- orari;
- prezzi;
- trasporti;
- eventi;
- regole operative;
- consigli presentati come verificati.

---

# 7. Fotografie — vincolo legale assoluto
`PHOTO_SELECTIONS.md` è la fonte di verità per le scelte estetiche.

Stati da rispettare:
- `SCELTA_ESTETICA_CONFERMATA`
- `APPROVATA_USO`
- `PENDING_PERMISSION`
- `FALLBACK_LEGALE_TEMPORANEO`

Non sostituire arbitrariamente una scelta estetica confermata.

Non pubblicare una foto `PENDING_PERMISSION`.
Non trasformarla in `APPROVATA_USO` senza prova verificabile.
Non hotlinkare immagini da TripAdvisor, Foursquare, HappyCow, blog, magazine o siti ufficiali.
Una foto su un sito ufficiale NON equivale a licenza di riuso.

Quando manca il diritto:
- usa il placeholder boutique già previsto;
- oppure un fallback ambientale legale già registrato;
- non presentare un fallback ambientale come foto del locale.

Ristoranti/locali con fotografie selezionate ma NON pubblicabili come foto del locale finché manca permesso:
- Antico Caffè 1855
- Biffi American Bar
- Il Gallo d’Oro
- Le Terrazze di Calamosca
- La Paillote
- Libarium
- Su Cumbidu
- Sa Piola
- Antica Cagliari

Fallback già previsti:
- Antico Caffè 1855 → Bastione come contesto, non come foto del locale;
- Le Terrazze di Calamosca → contesto Calamosca già integrato e legalmente registrato;
- altri → placeholder neutro/boutique dove necessario.

---

# 8. ESCLUSIONI ASSOLUTE
Non reintrodurre in alcun modo:
- **QuantoBasta**
- **Cala Regina**
- **Porto Sa Ruxi**

Non cercarli, non inserirli, non usarli come placeholder, non citarli come suggerimenti.

---

# 9. Spiagge
Preserva le spiagge già validate e i relativi asset/crediti.

Non modificare senza necessità le selezioni fotografiche già approvate.

Non presentare come attuali regole operative stagionali non ricontrollate, soprattutto per:
- La Pelosa
- Cala Brandinchi
- Tuerredda
- Punta Molentis
- Porto Giunco

Se il dato è volatile e manca verifica recente, usa una formulazione prudente o segnala che va controllato.

---

# 10. Lingue
IT / EN / DE devono continuare a funzionare.

Non eliminare chiavi i18n esistenti.
Non introdurre stringhe hard-coded visibili se esiste il sistema di traduzione.
Non inventare traduzioni tedesche approssimative: se un nuovo testo non è traducibile con qualità sufficiente, segnalarlo come TODO editoriale invece di pubblicare una traduzione debole.

---

# 11. Mobile first
Il telefono è il dispositivo principale.

Testare almeno:
- 360 px
- 390 px
- 412 px
- tablet ~768 px
- desktop >= 1280 px

Requisiti:
- nessun overflow orizzontale;
- touch target adeguati;
- testo leggibile senza zoom;
- hero non eccessivamente alto;
- card non inutilmente lunghe;
- menu facilmente utilizzabile con una mano;
- CTA evidenti ma non aggressive;
- immagini con aspect ratio stabile;
- layout resistente a testi più lunghi in tedesco.

---

# 12. Accessibilità
Minimo richiesto:
- HTML semantico;
- focus visibile;
- navigazione da tastiera;
- aria-label sensati;
- contrasto sufficiente;
- alt text reale per immagini informative;
- placeholder descritti correttamente;
- nessun contenuto importante solo tramite colore;
- rispetto `prefers-reduced-motion` per animazioni non essenziali.

---

# 13. PWA / runtime
Non rompere:
- manifest;
- service worker;
- installabilità;
- navigazione;
- cache;
- ritorno online dopo offline;
- aggiornamento della versione.

Se modifichi asset che devono essere precacheati, aggiorna coerentemente la cache/versione del service worker.

Non creare cache che possa trasformarsi in bypass della protezione lato server.
Non cambiare Cloudflare Access.

---

# 14. Privacy e sicurezza
La protezione reale è Cloudflare Access, esterna al frontend.

Il vecchio gate client-side eventualmente presente nel codice NON deve essere considerato una misura di sicurezza.

Non:
- aggiungere password/segreti nel JavaScript;
- commitare credenziali;
- mettere dati personali/sensibili in repository pubblico;
- creare bypass o URL alternativi per aggirare Access.

Se ritieni che il gate client-side debba essere rimosso o trasformato in semplice UX, proponilo separatamente: non farlo in modo distruttivo senza documentarlo.

---

# 15. Metodo di lavoro obbligatorio
Prima del codice, produci un breve audit con:
- cosa esiste già;
- cosa riuserai;
- cosa cambierai;
- cosa NON toccherai;
- rischi individuati.

Poi lavora per piccoli commit tematici.

Non fare una riscrittura massiva senza necessità.
Non sostituire interi file se bastano modifiche locali.

Ogni decisione importante deve essere motivata in termini di:
- UX ospite;
- affidabilità tecnica;
- accessibilità;
- performance;
- diritti/licenze;
- mantenibilità.

---

# 16. Deliverable minimo
Alla fine devono esserci:
1. nuova homepage Concierge funzionante;
2. percorso di navigazione più semplice e centrato sui bisogni;
3. riuso dei contenuti esistenti;
4. compatibilità IT/EN/DE;
5. fotografie conformi allo stato diritti;
6. PWA funzionante;
7. responsive verificato;
8. nessuna regressione evidente;
9. report QA finale;
10. elenco esplicito di ciò che NON è stato modificato;
11. confronto prima/dopo con motivazione UX;
12. lista di eventuali punti ancora da approvare da Angelo.

---

# 17. Quality gate — NON dichiarare il lavoro “finito” se manca uno di questi punti
Prima di considerare completata la lavorazione, verificare:

### Funzionale
- home carica senza errori console;
- tutte le principali route/sezioni si aprono;
- menu mobile apre/chiude correttamente;
- IT/EN/DE cambiano senza rompere layout;
- link e CTA principali funzionano;
- sheet/modal esistenti non sono rotti.

### Foto
- nessuna immagine `PENDING_PERMISSION` resa pubblicabile per errore;
- nessun hotlink non autorizzato;
- crediti/licenze preservati;
- placeholder/fallback non descritti come foto reali dei locali.

### PWA
- manifest valido;
- service worker registra senza errori;
- ciclo online → offline → online verificato;
- cache aggiornata se necessario.

### UI
- 360/390/412 px verificati;
- tablet verificato;
- desktop verificato;
- nessun overflow;
- nessuna card con altezza artificiale inutile;
- leggibilità DE controllata.

### Contenuti
- nessuna reintroduzione di QuantoBasta;
- nessuna reintroduzione di Cala Regina;
- nessuna reintroduzione di Porto Sa Ruxi;
- nessuna informazione volatile promossa come attuale senza verifica.

### Sicurezza
- nessuna modifica a Cloudflare/Zero Trust;
- nessun segreto nel repository;
- `main` non toccato;
- nessun merge automatico.

---

# 18. Regola di stop
Se trovi un conflitto tra una proposta di redesign e:
- una scelta esplicita dell’utente;
- lo stato legale di una fotografia;
- un contenuto verificato;
- la protezione privacy;
- una funzionalità già valida;

FERMATI su quel punto e segnala il conflitto. Non prendere una decisione irreversibile da solo.

---

# 19. Output finale richiesto ad Astra
Consegna un rapporto sintetico ma tecnico con:
- commit effettuati;
- file modificati;
- test eseguiti;
- risultati;
- screenshot/preview se disponibili;
- regressioni riscontrate e corrette;
- elementi rimasti invariati;
- elementi che richiedono approvazione di Angelo;
- dichiarazione esplicita: `main non modificato`.

Non limitarti a dire “completato”. Dimostralo.
