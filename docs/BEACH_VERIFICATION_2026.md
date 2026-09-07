# Verifica spiagge prioritarie — stagione 2026

Data audit: 2026-09-08
Branch: foundation/concierge-content-model

## Obiettivo
Separare dati stabili, dati verificati per il 2026 e informazioni operative che devono restare soggette a ricontrollo stagionale.

## Stato sintetico

| Area | Stato 2026 | Cosa possiamo considerare verificato | Cosa NON promuovere ancora a dato stabile |
|---|---|---|---|
| Poetto | verificato parziale | servizi lungo il litorale; accessibilità dedicata in postazioni comunali; spiaggia urbana servita | parcheggi specifici, affollamento, vento operativo, tempi porta-a-porta |
| Mari Pintau | verificato parziale | servizio CTM stagionale 2026 da via Beethoven; fermata prevista sulla SP17; collegamento attivo 4 luglio–13 settembre 2026 | disponibilità reale parcheggio in spiaggia, capienza, regole 2027, tempi da Piccolabellavista |
| Chia | verificato parziale | parcheggi comunali costieri a pagamento attivi dal 16 maggio 2026 | tariffe puntuali per singola spiaggia se non lette nell'allegato; disponibilità posti; regole 2027 |
| Tuerredda | review_due | localizzazione e caratteristiche generali confermate da SardegnaTurismo | prenotazione/numero chiuso/parcheggio/tariffe/orari 2026 non verificati con fonte comunale recente |
| Villasimius | review_due | Porto Giunco e Punta Molentis confermati come spiagge dell'area; caratteristiche generali istituzionali | contingentamento, prenotazioni, parcheggi, tariffe e regole operative 2026 non verificati con fonte comunale recente |

## Dettaglio fonti e decisioni editoriali

### Poetto
Fonte principale: Comune di Cagliari / Cagliari Turismo.

Confermato:
- litorale urbano con stabilimenti, diving, scuole vela e altri servizi;
- nel 2026 il Comune ha previsto servizi di accompagnamento e accessibilità dedicata al Poetto;
- sono citate postazioni accessibili Golfo 1 e Golfo 7 in specifiche giornate/orari del servizio 2026.

Decisione Concierge:
- `services`: può essere descritto come ampio/completo in forma generale;
- accessibilità: indicare solo quanto verificato, con nota stagionale;
- parcheggio: non usare formule assolute tipo "ampio" senza verifica puntuale;
- tempi da casa: trattarli come stima, non come dato ufficiale.

### Mari Pintau
Fonte principale: Comune di Quartu Sant'Elena.

Confermato per il 2026:
- servizio sperimentale CTM dal 4 luglio al 13 settembre 2026;
- partenze da via Beethoven;
- collegamento con Mari Pintau e Kal'e Moru;
- corse orarie indicate dal Comune;
- biglietto CTM ordinario secondo comunicazione comunale 2026;
- parcheggio di scambio presso via Beethoven.

Decisione Concierge:
- `publicTransportFriendly`: può diventare `true` solo con validità stagionale 2026;
- non trasformare questa informazione in regola permanente per gli anni successivi;
- parcheggio direttamente presso la spiaggia resta `review_due`.

### Chia
Fonte principale: Comune di Domus de Maria.

Confermato per il 2026:
- parcheggi comunali non custoditi a pagamento lungo la fascia costiera attivi dal 16 maggio 2026;
- il Comune ha pubblicato avviso e modulistica dedicati alla stagione 2026.

Decisione Concierge:
- usare "parcheggi comunali costieri a pagamento nella stagione 2026";
- non assegnare automaticamente tariffa o disponibilità a ogni singola spiaggia senza fonte specifica;
- separare Chia come area da Su Portu, Campana, Su Giudeu, Cala Cipolla ecc.

### Tuerredda
Fonte istituzionale trovata: SardegnaTurismo, Regione Sardegna.

Confermato:
- spiaggia nel territorio di Teulada;
- accesso geografico lungo la panoramica della Costa del Sud/SP71;
- caratteristiche generali del luogo.

Non sufficientemente verificato per il 2026:
- eventuale numero chiuso;
- eventuale prenotazione;
- parcheggi e tariffe;
- orari o regole stagionali.

Decisione Concierge:
- mantenere `verification.status = review_due` per i campi operativi;
- non pubblicare frasi tipo "posti finiscono entro le 10" come informazione certa.

### Villasimius / Porto Giunco / Punta Molentis
Fonte istituzionale trovata: SardegnaTurismo, Regione Sardegna.

Confermato:
- Porto Giunco è nel territorio di Villasimius;
- Punta Molentis è nell'area di Villasimius;
- caratteristiche generali, fondali e conformazione sono documentate istituzionalmente.

Non sufficientemente verificato per il 2026:
- accessi contingentati;
- prenotazioni;
- parcheggi e tariffe;
- regole specifiche di Punta Molentis;
- orari stagionali.

Decisione Concierge:
- `review_due` per tutti i campi operativi;
- mantenere separate le schede Porto Giunco, Simius, Punta Molentis e Porto Sa Ruxi;
- non usare una regola unica "Villasimius" per tutte le spiagge.

## Regola generale introdotta
Ogni informazione spiaggia deve appartenere a una di queste classi:

1. **stabile** — geografia, esposizione, tipo di arenile, descrizione editoriale;
2. **stagionale verificata** — servizi navetta, parcheggi a pagamento, accessibilità organizzata, regole 2026;
3. **dinamica** — vento, mare, traffico, disponibilità parcheggi, affollamento;
4. **da ricontrollare** — prenotazioni, numero chiuso, tariffe, orari, divieti.

L'AI futura può combinare dati stabili e dati stagionali verificati, ma non deve convertire una vecchia regola stagionale in una certezza attuale.

## Prossimo passo
Aggiornare il modello dati con:
- `validFrom` / `validUntil` per le regole stagionali;
- `volatility` (`stable`, `seasonal`, `dynamic`);
- `sourceUrl` e `checkedAt` per singolo dato operativo;
- distinzione tra `editorial` e `operations`.
