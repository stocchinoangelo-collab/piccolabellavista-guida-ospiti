/* Page composition. Text lives in i18n.js, guide.js and data.js. */
function pageHeading(title,sub){return '<section class="hero page-heading"><span class="kicker">'+esc(t('guide_kicker'))+'</span><h1>'+esc(t(title))+'</h1>'+(sub?'<p>'+esc(t(sub))+'</p>':'')+'</section>';}
function mapSearch(query){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);}
function transitLink(query){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(CONFIG.home.address)+'&destination='+encodeURIComponent(query)+'&travelmode=transit';}
function externalLink(url,label,cls='btn btn--ghost'){return '<a class="'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';}
function photoMarkup(id,hero=false){
 const p=PHOTOS[id];
 if(!p?.file)return '';
 return '<img class="photo'+(hero?' hero-photo':'')+'" src="'+esc(p.file)+'"'+(p.thumb&&!hero?' srcset="'+esc(p.thumb)+' 800w, '+esc(p.file)+' '+p.width+'w" sizes="(max-width:719px) 100vw, (max-width:1100px) 50vw, 33vw"':'')+' alt="'+esc(L(p.alt))+'" width="'+p.width+'" height="'+p.height+'" loading="'+(hero?'eager':'lazy')+'" decoding="async"'+(hero?' fetchpriority="high"':'')+' style="object-position:'+esc(p.position||'50% 50%')+'">';
}

/* Venue imagery: preserve selected photos in PHOTO_SELECTIONS.md, but render only approved local assets.
   Context fallbacks must never be presented as photographs of the venue itself. */
const VENUE_MEDIA={
 antico_caffe:{photo:'bastione',tone:'stone'},
 terrazze:{photo:'calamosca_context',tone:'sea'},
 paillote:{tone:'sea'},
 libarium:{tone:'evening'},
 biffi:{tone:'stone'},
 su_cumbidu:{tone:'stone'},
 antica_cagliari:{tone:'stone'},
 sa_piola:{tone:'stone'},
 gallo_oro:{tone:'evening'}
};
function venueMedia(v){
 const cfg=VENUE_MEDIA[v.id]||{tone:'stone'};
 const p=cfg.photo&&PHOTOS[cfg.photo];
 if(p?.file&&String(p.status||'').startsWith('APPROVATA_USO'))return photoMarkup(cfg.photo);
 return '<div class="venue-photo-placeholder" data-tone="'+esc(cfg.tone||'stone')+'" aria-hidden="true"></div>';
}

function pgHome(){
 const tiles=[['spiagge','nav_spiagge','beach_teaser','poetto'],['mangiare','nav_mangiare','food_teaser','porceddu'],['storia','nav_storia','history_teaser','bastione'],['senzaauto','nav_senzaauto','mobility_teaser',null]];
 return '<section class="hero home-hero">'+photoMarkup('hero',true)+'<div class="hero-copy"><span class="kicker">'+esc(t('guide_kicker'))+'</span><h1>'+esc(t('hero_title'))+'</h1><p>'+esc(t('hero_sub'))+'</p><a class="btn btn--primary" href="#esplora" data-explore>'+esc(t('discover'))+'</a></div></section>'+
 '<p class="edition">'+esc(t('style_edition'))+'</p><section class="blk" id="esplora"><h2 class="sec">'+esc(t('choose_day'))+'</h2><div class="discovery-grid">'+tiles.map(([route,key,sub,photo],i)=>'<a class="discovery" href="#'+route+'">'+(photo?photoMarkup(photo):'')+'<div class="discovery-body"><span class="ordinal">0'+(i+1)+'</span><h3>'+esc(t(key))+'</h3><p>'+esc(t(sub))+'</p></div></a>').join('')+'</div></section>'+
 '<section class="blk taste-preview"><div><span class="kicker">'+esc(t('nav_sapori'))+'</span><h2 class="sec">'+esc(t('taste_intro'))+'</h2><a class="btn btn--ghost" href="#sapori">'+esc(t('nav_sapori'))+' →</a></div>'+photoMarkup('fregola')+'</section>'+
 '<section class="blk" id="today"><h2 class="sec">'+esc(t('home_today'))+'</h2><div id="today-box"></div></section>';
}
function venueCards(venues){return '<div class="grid venue-grid">'+venues.map((v,i)=>'<article class="card venue" id="'+esc(v.id)+'">'+venueMedia(v)+'<div class="card__body"><span class="ordinal">'+String(i+1).padStart(2,'0')+'</span><h2>'+esc(v.name)+'</h2><p>'+esc(L(v.why))+'</p><div class="card__foot">'+externalLink(mapSearch(v.mapQuery),t('open_map'),'btn btn--map')+(v.site?externalLink(v.site,t('check_menu')):'')+'</div></div></article>').join('')+'</div>';}
function pgMangiare(){return pageHeading('nav_mangiare','restaurant_intro')+venueCards(GUIDE.restaurants);}
function pgAperitivi(){return pageHeading('nav_aperitivi','aperitif_intro')+venueCards(GUIDE.aperitivi);}
function pgSapori(){return pageHeading('nav_sapori','taste_intro')+'<div class="grid food-grid">'+FOOD.map(f=>'<article class="card food-card" id="'+esc(f.id)+'">'+photoMarkup(f.id)+'<div class="card__body"><h2>'+esc(L(f.name))+'</h2><p>'+esc(L(f.d))+'</p></div></article>').join('')+'</div><p class="credits-link"><a href="#fonti">'+esc(t('photo_credit'))+'</a></p>';}
function pgCasa(){return pageHeading('nav_casa','house_intro')+'<div class="house-layout"><article class="notice"><p>'+esc(t('house_services'))+'</p></article><article class="card"><div class="card__body"><h2>'+esc(t('arrival'))+'</h2><p>'+esc(t('arrival_note'))+'</p><div class="card__foot">'+externalLink('https://piccolabellavista.it/',t('property_site'),'btn btn--primary')+externalLink('https://wa.me/393931104422',t('contact_host'))+'</div></div></article></div>';}
function pgSenzaAuto(){return pageHeading('nav_senzaauto','mobility_intro')+'<p class="source-link">'+externalLink('https://www.ctmcagliari.it/busfinder/',t('ctm_label'))+'</p><div class="grid transit-grid">'+GUIDE.transit.map(d=>'<article class="card"><div class="card__body"><h2>'+esc(L(d.name))+'</h2><p>'+esc(L(d.note))+'</p><div class="card__foot">'+externalLink(transitLink(d.query),t('plan_transit'),'btn btn--map')+(d.id==='ospedali'?['Ospedale Oncologico Cagliari','Ospedale Microcitemico Cagliari'].map(q=>externalLink(transitLink(q),q.replace('Ospedale ','').replace(' Cagliari',''))).join(''):'')+'</div></div></article>').join('')+'</div><section class="notice"><h2>'+esc(t('taxi_option'))+'</h2><p>'+esc(t('taxi_note'))+'</p></section>';}
function pgStoria(){return pageHeading('nav_storia','history_intro')+'<div class="grid history-grid">'+GUIDE.routes.map((d,i)=>'<article class="card"><div class="card__body"><span class="kicker">'+esc(L(d.period))+'</span><h2>'+esc(L(d.name))+'</h2><p class="duration">'+esc(t('suggested_time'))+': '+esc(L(d.duration))+'</p><p>'+esc(L(d.why))+'</p><p><b>'+esc(t('who_for'))+':</b> '+esc(L(d.who))+'</p><div class="card__foot">'+externalLink(mapSearch(d.query),t('open_map'),'btn btn--map')+'</div></div></article>').join('')+'</div><section class="blk"><h2 class="sec">'+esc(t('timeline'))+'</h2><div class="tl">'+PERIODS.map(p=>'<div class="tl__item"><h3>'+esc(L(p.t))+'</h3><p>'+esc(L(p.d))+'</p><div class="tl__links">'+p.ids.map(id=>{const g=GEMS.find(x=>x.id===id);return g?'<button class="chip" data-open="'+esc(id)+'">'+esc(g.name)+'</button>':''}).join('')+'</div></div>').join('')+'</div></section>';}
function pgUtili(){return pageHeading('nav_utili','useful_intro')+'<div class="grid"><article class="card"><div class="card__body"><h2>'+esc(t('contact_host'))+'</h2><p>'+esc(t('arrival_note'))+'</p>'+externalLink('https://wa.me/393931104422',t('contact_host'),'btn btn--primary')+'</div></article><article class="card"><div class="card__body"><h2>'+esc(t('offline_title'))+'</h2><p>'+esc(t('offline_note'))+'</p></div></article></div>';}
function pgFonti(){return pageHeading('nav_fonti','credits_intro')+'<section class="blk"><h2 class="sec">'+esc(t('source'))+'</h2><div class="source-list">'+GUIDE.sources.map(s=>externalLink(s.url,s.name)).join('')+'</div></section><section class="blk"><h2 class="sec">'+esc(t('photo_credit'))+'</h2><p class="sub">'+esc(t('photo_changes'))+'</p><div class="credits-grid">'+Object.values(PHOTOS).filter(p=>p.file).map(p=>'<article class="credit"><h3>'+esc(L(p.alt))+'</h3><p>'+esc(p.author)+' · Wikimedia Commons</p><p>'+externalLink(p.source,t('source'),'text-link')+' · '+externalLink(p.licenseUrl,p.license,'text-link')+'</p></article>').join('')+'</div></section>';}
