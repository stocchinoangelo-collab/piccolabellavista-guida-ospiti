from pathlib import Path

path = Path('PHOTO_SELECTIONS.md')
text = path.read_text(encoding='utf-8')
old = '''### Su Cumbidu / Sa Piola / Antica Cagliari
- Le foto ufficiali/gallery sono state analizzate come riferimenti.
- Nel materiale recuperato NON risulta una scelta numerata inequivocabile dell'utente per una singola foto specifica di ciascuno dei tre.
- Stato: `PENDING_PERMISSION`, senza inventare una foto “scelta”.
- Astra deve conservare il locale e usare solo foto ufficiali autorizzate o placeholder neutro finché non arriva il permesso.
'''
new = '''### Su Cumbidu
- Scelta utente confermata: foto n.1.
- Soggetto: interno in pietra, atmosfera tradizionale sarda.
- Stato: `SCELTA_ESTETICA_CONFERMATA` + `PENDING_PERMISSION`.
- Regola: non pubblicare finché non è verificata una licenza/permesso di riuso.

### Sa Piola
- Scelta utente confermata: foto n.2.
- Soggetto: interno caldo e autentico del ristorante.
- Fonte di riferimento: sito ufficiale/gallery del locale.
- Stato: `SCELTA_ESTETICA_CONFERMATA` + `PENDING_PERMISSION`.
- Regola: una foto ufficiale non implica automaticamente licenza di riuso; pubblicare solo con permesso verificato.

### Antica Cagliari
- Scelta utente confermata: foto n.3.
- Soggetto: sala con volte in mattoni, elegante e coerente con lo stile boutique mediterraneo.
- Stato: `SCELTA_ESTETICA_CONFERMATA` + `PENDING_PERMISSION`.
- Regola: non pubblicare finché non è verificata una licenza/permesso di riuso.
'''
if old not in text:
    raise SystemExit('Expected restaurant block not found; aborting to avoid corrupting source of truth')
path.write_text(text.replace(old, new), encoding='utf-8')
print('Restaurant photo selections recorded')
