# Diritti foto ristoranti e locali

Verifica operativa: 8 settembre 2026.

Regola di pubblicazione: una foto può essere usata in produzione solo se è nostra, se ha una licenza aperta compatibile e verificata, oppure se esiste un permesso scritto del titolare dei diritti. Una foto presente sul sito ufficiale, TripAdvisor, Foursquare, HappyCow, magazine o blog NON è automaticamente riutilizzabile.

| Locale | Scelta estetica | Fonte/riferimento | Stato diritti | Pubblicabile ora? | Azione / fallback legale |
|---|---|---|---|---|---|
| Antico Caffè 1855 | foto n.1, locale + Bastione | Strictly Sardinia | PENDING_PERMISSION | NO | Chiedere permesso. Fallback ambientale già sicuro: `images/bastione.webp` (Elisa.Mnn, CC BY-SA 4.0). Non presentarlo come foto del locale. |
| Biffi American Bar | foto n.1, bancone/interior storico | Foursquare/4sqi | PENDING_PERMISSION | NO | Chiedere permesso al locale/fotografo. Audit open-license 08/09/2026: nessuna foto del locale con licenza aperta verificata trovata; usare placeholder neutro. |
| Il Gallo d’Oro | foto n.1 | HappyCow | PENDING_PERMISSION | NO | Chiedere permesso; non scaricare/pubblicare dalla fonte attuale. Audit open-license 08/09/2026: nessuna alternativa del locale con licenza aperta verificata trovata. |
| Le Terrazze di Calamosca | foto n.1, terrazza al tramonto | TripAdvisor | PENDING_PERMISSION | NO | Chiedere foto ufficiale con autorizzazione scritta. Fallback ambientale possibile: Wikimedia Commons `Torre e faro di Calamosca.jpg` di Cristiano Cani, con licenza indicata nella pagina Commons; verificare e registrare esattamente la variante di licenza prima dell’integrazione. Non presentarlo come foto del ristorante. |
| La Paillote | foto n.1, tavolo/terrazza vista mare | Agrodolce | PENDING_PERMISSION | NO | Chiedere foto ufficiale con autorizzazione scritta. Nessuna foto del locale open-license verificata trovata nell’audit 08/09/2026; possibile solo fallback ambientale di Calafighera/Calamosca se licenza verificata. Stagionalità da verificare separatamente. |
| Libarium | foto n.1, terrazza al tramonto | TripAdvisor | PENDING_PERMISSION | NO | Chiedere foto ufficiale con autorizzazione scritta. Audit open-license 08/09/2026: nessuna foto del locale con licenza aperta verificata trovata; usare placeholder o immagine ambientale di Castello solo se chiaramente etichettata come contesto. |
| Su Cumbidu | foto n.1, interno in pietra | riferimento visuale selezionato | PENDING_PERMISSION | NO | Ottenere permesso/licenza prima della pubblicazione. Audit open-license 08/09/2026: nessuna foto del locale con licenza aperta verificata trovata. |
| Sa Piola | foto n.2, interno caldo e autentico | sito ufficiale/gallery | PENDING_PERMISSION | NO | Chiedere autorizzazione scritta al locale; foto ufficiale non equivale a licenza di riuso. Audit open-license 08/09/2026: nessuna alternativa del locale con licenza aperta verificata trovata. |
| Antica Cagliari | foto n.3, sala con volte in mattoni | riferimento visuale selezionato | PENDING_PERMISSION | NO | Ottenere permesso/licenza prima della pubblicazione. Audit open-license 08/09/2026: nessuna foto del locale con licenza aperta verificata trovata. |

## Esito audit fallback open-license — 8 settembre 2026

- Nessuna foto open-license verificata dei locali stessi è stata trovata per Biffi American Bar, Il Gallo d’Oro, Libarium, Su Cumbidu, Sa Piola e Antica Cagliari.
- Per Antico Caffè 1855 è disponibile un fallback ambientale già presente e licenziato del Bastione di Saint Remy; va usato solo come immagine di contesto.
- Per l’area Calamosca è disponibile su Wikimedia Commons `Torre e faro di Calamosca.jpg`, autore Cristiano Cani. È un possibile fallback ambientale per Le Terrazze di Calamosca e, se editorialmente appropriato, per La Paillote; prima dell’integrazione va registrata nel repository l’esatta licenza mostrata nella pagina file.
- Immagini trovate su magazine o motori immagini non vengono promosse a fallback legale senza una licenza esplicita.

## Regola per Astra e per il sito

- Conservare SEMPRE la scelta estetica confermata in `PHOTO_SELECTIONS.md`.
- Non trasformare mai `PENDING_PERMISSION` in `APPROVATA_USO` senza una prova verificabile.
- Se arriva un permesso, registrare data, soggetto autorizzante, eventuali limiti d'uso e fonte del consenso.
- Fino ad allora usare placeholder/fallback legalmente sicuri senza cancellare la scelta estetica originale.
- Un fallback ambientale NON deve essere presentato o descritto come fotografia del locale.
- Non usare hotlink o copia locale di immagini prese da TripAdvisor, Foursquare, HappyCow, blog o magazine solo perché pubblicamente visibili.
