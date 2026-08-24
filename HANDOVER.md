HANDOVER.md

# PICCOLABELLAVISTA · HANDOVER — stato V1.2 FINALE
Audit tecnico PASS (V1.1.1) · contenuti verificati/correctti su fonti istituzionali
(Fase 2: 12 interventi + extra D'Annunzio 1882) · patch R1–R6 applicate ·
Basic Auth server-side pronta (da attivare al deploy).

CORREZIONI FATTO PRINCIPALI (tracciabilità completa nella chat, messaggio Fase 2):
Su Gologone −134/−135 m · Porto Giunco facing S·SE + stelle · Arrubiu "più grande
della Sardegna", mastio 15 m/25–30 stimati · Nebida "più alto del Mediterraneo, 133 m"
+ Concali su Terràinu · Baunei Su Sterru ~200 m + San Pietro di Golgo · Santa Cristina
ipotesi archeoastronomica (18,61 anni) · Sinis "una delle più antiche", V–VII sec. ·
Santa Vittoria "uno dei più vasti" · Bosa "secondo la tradizione" · Molentargius
parafrasi etimologia · stele senza numero · refusi puliti (punicao→punico,
capelletto→capotto, sanctuario→santuari) · nota lingue guide Barumini (IT/EN/FR).

TECNICA: vanilla JS, PWA, SW pbv-v12 (bump a ogni modifica), Open-Meteo live,
CSV eventi con triple protezioni (timeout 6s / avvio 3s / try-catch totale),
fallback locale garantito, IT/EN/DE complete, tempi sempre stime "~".

PRIVACY: Basic Auth Apache (file password fuori web root, chmod 600, utenti separati),
noindex meta + X-Robots-Tag header, -Indexes, gate SHA-256 OFF, zero dati personali,
zero API key. MAI committare .htpasswd.

DEPLOY: AutoSSL → upload cartella+.htaccess → credenziali → curl 401/200 → test mobile
anonimo → PWA installabile → offline OK.

MANUTENZIONE MENSILE: pagina Eventi (conferma date sui siti ufficiali, aggiorna checked);
eventuale eventsCsv.url; bump CACHE a ogni modifica contenuti; revoca credenziali ospiti
a fine stagione.

APERTI (non bloccanti): foto reali in img/<id>.jpg · fonti da collegare alle 17 schede
enogastronomiche · comune Cala Luna (Dorgali/Baunei) da chiarire in UI futura.