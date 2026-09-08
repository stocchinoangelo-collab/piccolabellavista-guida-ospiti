# Placeholder foto ristoranti / locali

Aggiornato: 8 settembre 2026.

Questa policy si applica quando una scelta fotografica è `PENDING_PERMISSION` e non esiste ancora una foto del locale legalmente pubblicabile.

## Regola

- Non usare foto prese da TripAdvisor, Foursquare, HappyCow, blog, magazine o siti ufficiali senza licenza/permesso verificato.
- Non generare immagini che fingano di mostrare il locale reale.
- Usare il componente grafico `.venue-photo-placeholder` finché non arriva una foto autorizzata.
- Il placeholder è un elemento grafico di brand, non una fotografia e non deve essere accreditato come immagine del locale.
- Quando arriva un permesso valido, sostituire il placeholder senza modificare la scelta estetica registrata in `PHOTO_SELECTIONS.md`.

## Tono per locale

| Locale | Stato foto scelta | Placeholder / fallback |
|---|---|---|
| Antico Caffè 1855 | PENDING_PERMISSION | Preferire il fallback legale del Bastione; in assenza usare `data-tone="stone"` |
| Biffi American Bar | PENDING_PERMISSION | `data-tone="evening"` |
| Il Gallo d’Oro | PENDING_PERMISSION | `data-tone="stone"` |
| Le Terrazze di Calamosca | PENDING_PERMISSION | Preferire `calamosca_context` (`APPROVATA_USO_FALLBACK_AMBIENTALE`); in assenza usare `data-tone="sea"` |
| La Paillote | PENDING_PERMISSION | `data-tone="sea"` |
| Libarium | PENDING_PERMISSION | `data-tone="evening"` |
| Su Cumbidu | PENDING_PERMISSION | `data-tone="stone"` |
| Sa Piola | PENDING_PERMISSION | `data-tone="stone"` |
| Antica Cagliari | PENDING_PERMISSION | `data-tone="stone"` |

## Accessibilità

Il placeholder deve avere un `aria-label` descrittivo, per esempio: `Immagine del locale non ancora disponibile; selezione Piccolabellavista` (tradotto nella lingua attiva). Non usare testo che faccia pensare che il placeholder rappresenti l'interno o l'esterno reale del locale.

## Vincolo Astra

Astra non deve trasformare un placeholder o un fallback ambientale in una foto dichiarata del locale. `calamosca_context` rappresenta il contesto di Calamosca; `bastione` rappresenta il Bastione di Saint Remy.
