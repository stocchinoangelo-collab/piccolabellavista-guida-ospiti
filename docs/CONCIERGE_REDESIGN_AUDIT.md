# Audit prima del codice — 8 settembre 2026

Branch esclusivo: concierge/redesign-v2. Base: 3cba9cb422bc732699337676d4d84be30caff856.
Prompt ASTRA letto integralmente. Inventario git, sorgenti UI, registri foto, documentazione contenuti, manifest, worker e workflow esaminati. Nessun AGENTS.md nel checkout.

## Esistente e riuso
17 route hash, dati turistici in data.js, 5 ristoranti e 4 aperitivi, 7 destinazioni trasporto, 8 specialità; dizionari IT/EN/DE; filtri e sheet; fotografie locali con attribuzioni; manifest e worker. Modello Concierge già separato nei JSON ma non consumato dal runtime: non migrare implicitamente record private/unverified.

## Modifiche pianificate
Home con quattro bisogni gerarchici: oggi, mangiare, mare/città, mobilità/aiuto. Hero più compatta, colori caldi, scorciatoie verso contenuti esistenti. Navigazione primaria breve con resto delle sezioni raccolto nel menu. Placeholder tradotti e contesto fotografico esplicito. Test aggiornati ai registri effettivi, verifiche browser alle cinque larghezze richieste. Cache versionata senza alterare la politica di autorizzazione.

## Invariati
main, Cloudflare/Zero Trust, hosting, workflow, gate, selezioni artistiche e diritti, archivi contenuti, contatti e schema Concierge. Nessun merge o deploy.

## Rischi e baseline
- Test node tests/verify.cjs FALLISCE prima di modifiche: vieta qualsiasi img nelle pagine locali, anche i due fallback ambientali approvati. Conta inoltre 11 foto mentre photos.js include nuove spiagge e Calamosca.
- Hero mobile 570 px; navigazione desktop con 17 voci equivalenti; min-height delle card locali; placeholder aria-hidden e copy CSS italiano.
- Worker cache-first preesistente: contenuti già salvati possono essere letti senza una nuova verifica Access; conflitto con revoca immediata/offline. STOP su questo punto: non ridefinire accesso o cancellare offline. Richiede decisione separata prima del rilascio.
- credits/photos.json non include tutte le foto presenti nel registro runtime: offline incompleto per le nuove immagini. Sincronizzare elenco precache ai soli asset già approvati non risolve il precedente conflitto privacy.
- Informazioni operative storiche e verifica editoriale DE non equivalgono a validazione attuale. Non generare nuove promesse su aperture, prezzi o trasporti.
- Hero è candidato legale, non scelta artistica definitiva. Permessi dei locali ancora pendenti.

## Gate
Distinguere test locale da telefono fisico, installazione reale e verifica Access. Nessun gate non eseguito può essere dichiarato superato.
