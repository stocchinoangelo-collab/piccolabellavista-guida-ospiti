# Piccolabellavista — inventario e audit contenuti Concierge

Data audit: 2026-09-08
Sorgente principale analizzata: `js/data.js` su `main`.

## Obiettivo

Mappare ciò che esiste già prima di migrare i contenuti verso il nuovo modello del Concierge. In questa fase non si elimina, non si riscrive e non si rende pubblico nulla automaticamente.

## Quadro generale

Il repository possiede già una base editoriale molto ampia. Il problema principale non è la mancanza di contenuti, ma la loro organizzazione: dati turistici, consigli editoriali, informazioni operative e dati potenzialmente variabili nel tempo convivono nello stesso file.

La futura fonte unica dovrà separare:

- contenuto stabile;
- contenuto operativo;
- contenuto sensibile al tempo;
- giudizio editoriale di Angelo e Viviana;
- livello di accesso pubblico / ospite / riservato;
- stato di verifica e fonte.

## Inventario attuale

### 1. CONFIG

Contiene configurazione della casa, coordinate approssimative, indirizzo e stato del gate.

**Destino consigliato:** non deve diventare contenuto editoriale. Le informazioni di struttura e sicurezza dovranno vivere in configurazione separata e, quando necessario, essere visibili solo all'ospite attivo.

### 2. WINDS

Tabella dei venti principali con direzione.

**Valore per il futuro Concierge:** alto. È una base utile per il modulo proattivo “Cosa faccio oggi?” e per i suggerimenti mare.

**Rischio:** il vento reale dovrà provenire in futuro da una fonte meteo aggiornata; questa tabella deve restare un dizionario di riferimento, non una sorgente live.

### 3. BEACHES

Archivio ricco di spiagge con campi come:

- nome e coordinate;
- distanza e tempo auto;
- affollamento;
- tipo di spiaggia;
- parcheggio;
- servizi;
- accessibilità;
- cibo;
- sentieri;
- punteggio per ogni vento;
- descrizione;
- quando andare;
- quando evitare.

Sono presenti spiagge vicine e anche mete molto lontane, quindi la categoria oggi mescola “consiglio durante il soggiorno” e “grande escursione in Sardegna”.

**Valore:** molto alto.

**Problemi da risolvere prima della migrazione:**

1. tempi e chilometri sono stime e vanno distinti dai dati verificati;
2. parcheggi, prenotazioni e accessi sono altamente variabili;
3. alcune frasi presentano giudizi forti o superlativi e andranno trattate come voce editoriale, non come fatto;
4. serve separare le spiagge realmente utili a un ospite di Cagliari dalle escursioni di giornata molto lontane;
5. regole stagionali e contingentamenti richiedono data di verifica e fonte ufficiale.

### 4. GEMS

È il grande archivio di luoghi da scoprire. Include archeologia, storia, borghi, natura ed enogastronomia. Ogni scheda usa campi editoriali molto utili:

- `why` — perché vale la visita;
- `curio` — curiosità;
- `see` — cosa vedere;
- `taste` — collegamento gastronomico;
- `rec` — consiglio finale;
- categorie;
- coordinate;
- distanza;
- link quando disponibile.

Esempi già presenti: Su Nuraxi, Nuraghe Arrubiu, Santa Cristina, Santa Vittoria, Sa Domu 'e S'Orcu, Sant'Andrea Priu, Monte Sirai, Nora, Bithia, San Giovanni di Sinis, San Sperate, Orgosolo, Molentargius, Sella del Diavolo, Monte Arcosu, Giara di Gesturi, Su Gologone, Bosa, Castelsardo, Sant'Antioco, Carloforte e altri.

**Valore:** altissimo. Questo blocco è probabilmente il nucleo editoriale più vicino alla futura idea “Angelo e Viviana consigliano”.

**Problemi:**

- dati storici e turistici sono mescolati con consigli gastronomici;
- alcune affermazioni storiche/curiosità richiedono verifica editoriale;
- orari, prenotazioni e accesso non devono essere trattati come contenuto statico;
- località lontane vanno classificate come escursioni, non come suggerimenti immediati.

### 5. FOOD

Glossario di piatti, prodotti e vini sardi: porceddu, fregola, malloreddus, pane carasau, seadas, bottarga, pecorino, Cannonau e altri elementi.

**Valore:** medio-alto. Ottimo contenuto pubblico e di supporto al Concierge gastronomico.

**Limite:** descrive cosa mangiare, ma non ancora “dove mangiarlo bene”. Il futuro archivio ristoranti dovrà essere separato dal glossario gastronomico.

### 6. EVENTS

Archivio di eventi, feste e sagre con:

- città;
- data o periodo indicativo;
- mesi;
- categoria;
- distanza;
- descrizione;
- link.

Sono presenti eventi stagionali e ricorrenti come Sartiglia, carnevali barbaricini, sagre, Girotonno, S'Ardia, Sant'Antioco, Candelieri, Time in Jazz, Redentore, Autunno in Barbagia e altri.

**Valore:** molto alto per un Concierge proattivo.

**Rischio:** è la categoria più fragile dell'intero archivio. Date, programmi, cancellazioni e siti possono cambiare ogni anno. Nessun evento deve essere suggerito come “attivo oggi” senza verifica aggiornata.

**Regola futura:** gli eventi avranno sempre `verifiedAt`, `source`, `validFrom`, `validUntil` o stato equivalente.

### 7. ITINS

Itinerari già costruiti in sequenze mattina / pranzo / pomeriggio / tramonto, con riferimenti agli elementi dell'archivio.

Esempi: Sardegna antica, Mare e tradizione, Fuori dai percorsi, Miniere e mare selvaggio, Supramonte e Orgosolo, giornata con Maestrale.

**Valore:** altissimo. Sono già molto vicini al concetto di Concierge orientato al bisogno.

**Problemi:**

- alcuni itinerari dipendono da orari, prenotazioni e meteo;
- i tempi andranno verificati;
- devono diventare componibili, non blocchi rigidi;
- occorre distinguere itinerari pubblici “assaggio” da versioni complete riservate agli ospiti.

### 8. PERIODS

Linea del tempo storica: preistoria, età nuragica, Fenici, Cartaginesi, Romani, Bizantini, Giudicati, Aragonesi/Spagnoli, Savoia/Ottocento, Sardegna moderna.

**Valore:** alto per contenuti culturali pubblici e itinerari tematici.

**Rischio operativo:** basso, ma serve revisione storica accurata prima della pubblicazione definitiva.

## Categorie mancanti o non ancora strutturate bene

Per il futuro Concierge servono anche archivi espliciti per:

1. **ristoranti e locali verificati**;
2. **trasporti operativi** dalla singola struttura;
3. **parcheggi e mobilità**;
4. **informazioni ospite riservate**;
5. **profilo leggero dell'ospite** (lingua, auto sì/no, bambini, interessi);
6. **stato del soggiorno** (visitatore, prenotato, presente, ex ospite);
7. **preferiti dell'ospite**;
8. **messaggi/proposte proattive**;
9. **fonti e storico delle verifiche**;
10. **foto e diritti di utilizzo** collegati alla singola scheda.

## Problemi strutturali individuati

### A. Un unico file troppo grande

`js/data.js` contiene contenuti che in futuro avranno cicli di vita molto diversi. Aggiornare un evento non dovrebbe toccare la stessa struttura dati delle spiagge o della storia.

### B. Assenza di stato di verifica per singolo elemento

Esiste un avviso generale di verifica, ma il Concierge avrà bisogno di sapere esattamente quando è stato controllato ogni elemento e da quale fonte.

### C. Fatto e opinione non sono separati

Frasi come “nostra preferita”, “imperdibile” o “miglior panorama” sono preziose perché danno voce ad Angelo e Viviana, ma vanno marcate come giudizio editoriale.

### D. Dati permanenti e dati volatili convivono

Una data storica può restare valida per anni. Un parcheggio, un prezzo, una linea bus o un evento possono cambiare domani.

### E. Nessun livello di accesso per contenuto

Ogni futura scheda deve poter essere:

- `public` — visibile a tutti;
- `guest` — disponibile dopo prenotazione/durante soggiorno;
- `private` — solo uso interno o dati operativi sensibili.

## Ordine di migrazione consigliato

### Fase 1 — Spiagge

Perché hanno già una struttura ricca e sono perfette per testare:

- metadati;
- livello di accesso;
- verifica;
- suggerimento in base al vento;
- contenuto editoriale multilingua.

### Fase 2 — GEMS / luoghi

Separare in sottocategorie: cultura, archeologia, natura, borghi, enogastronomia.

### Fase 3 — Itinerari

Collegare gli itinerari ai singoli contenuti mediante ID, evitando duplicazioni testuali.

### Fase 4 — Food

Trasformare il glossario in contenuto pubblico e collegarlo a luoghi/ristoranti.

### Fase 5 — Eventi

Solo dopo aver introdotto un vero sistema di verifica e scadenza.

### Fase 6 — Trasporti e dati ospite

Da progettare separatamente perché richiedono maggiore attenzione a privacy, aggiornamento e accesso riservato.

## Regola di migrazione

Nessun contenuto esistente viene considerato “verificato” solo perché è già presente nel repository.

Ogni record migrato riceverà almeno:

- ID stabile;
- categoria;
- accesso;
- stato editoriale;
- data ultima verifica;
- fonte;
- livello di volatilità;
- nota di Angelo e Viviana quando il valore è soggettivo;
- lingue disponibili;
- eventuale riferimento foto/licenza.

## Conclusione

La base attuale è molto più ricca di quanto servirebbe per una semplice guida ospiti. È già sufficiente per alimentare in futuro sito pubblico, Concierge, itinerari, social e AI.

La priorità non è aggiungere altro contenuto: è rendere affidabile, verificabile e riutilizzabile quello che già possediamo.
