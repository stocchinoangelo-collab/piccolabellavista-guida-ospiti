/* Page composition. Text lives in i18n.js, guide.js and data.js. */
function pageHeading(title,sub){return '<section class="hero page-heading"><span class="kicker">'+esc(t('guide_kicker'))+'</span><h1>'+esc(t(title))+'</h1>'+(sub?'<p>'+esc(t(sub))+'</p>':'')+'</section>';}
function mapSearch(query){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(query);}
function transitLink(query){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(CONFIG.home.address)+'&destination='+encodeURIComponent(query)+'&travelmode=transit';}
function directionsLink(query){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(CONFIG.home.address)+'&destination='+encodeURIComponent(query);}
function externalLink(url,label,cls='btn btn--ghost'){return '<a class="'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>';}
const PHOTO_ALIASES={molentis:'punta_molentis',sinzias:'cala_sinzias',pelosa:'la_pelosa',brandinchi:'cala_brandinchi'};
function photoMarkup(id,hero=false){
 const p=PHOTOS[PHOTO_ALIASES[id]||id];
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
 biffi:{tone:'evening'},
 su_cumbidu:{tone:'stone'},
 antica_cagliari:{tone:'stone'},
 sa_piola:{tone:'stone'},
 gallo_oro:{tone:'stone'}
};
function venueMedia(v){
 const cfg=VENUE_MEDIA[v.id]||{tone:'stone'};
 const p=cfg.photo&&PHOTOS[cfg.photo];
 if(p?.file&&String(p.status||'').startsWith('APPROVATA_USO'))return '<figure>'+photoMarkup(cfg.photo)+'<figcaption class="media-caption">'+esc(t('photo_context'))+'</figcaption></figure>';
 return '<div class="venue-photo-placeholder" data-tone="'+esc(cfg.tone||'stone')+'" role="img" aria-label="'+esc(t('photo_placeholder'))+'"><span>'+esc(t('local_selection'))+'</span></div>';
}

function pgHome(){
 return '<section class="hero home-hero">'+photoMarkup('hero',true)+'<div class="hero-copy"><span class="kicker">'+esc(t('concierge_name'))+'</span><h1>'+esc(t('hero_title'))+'</h1><p>'+esc(t('host_voice'))+'</p><a class="btn btn--primary" href="#esplora" data-explore>'+esc(t('need_today'))+' ↓</a></div></section>'+
 '<section class="blk concierge-today" id="esplora" aria-labelledby="today-title"><div><span class="ordinal">01 · '+esc(t('guide_kicker'))+'</span><h2 class="sec" id="today-title">'+esc(t('need_today'))+'</h2><p class="sub">'+esc(t('plan_intro'))+'</p><a class="btn btn--primary" href="#itinerari">'+esc(t('plan_routes'))+' →</a></div><div class="context-links"><a class="quick" href="#senzaauto">'+esc(t('nav_senzaauto'))+'</a><a class="quick" href="#aperitivi">'+esc(t('evening'))+'</a><a class="quick" href="#vento">'+esc(t('beach_teaser'))+'</a></div></section>'+
 '<section class="blk concierge-food" aria-labelledby="food-title">'+photoMarkup('fregola')+'<div><span class="ordinal">02</span><h2 class="sec" id="food-title">'+esc(t('need_food'))+'</h2><p class="sub">'+esc(t('food_teaser'))+'</p><div class="card__foot"><a class="btn btn--primary" href="#mangiare">'+esc(t('nav_mangiare'))+' →</a><a class="btn btn--ghost" href="#aperitivi">'+esc(t('nav_aperitivi'))+'</a><a class="text-link" href="#sapori">'+esc(t('nav_sapori'))+'</a></div></div></section>'+
 '<section class="blk" aria-labelledby="sea-title"><span class="ordinal">03</span><h2 class="sec" id="sea-title">'+esc(t('need_sea'))+'</h2><div class="concierge-places">'+[['spiagge','poetto','nav_spiagge','beach_teaser'],['storia','bastione','nav_storia','history_teaser']].map(([route,photo,title,sub])=>'<a class="discovery" href="#'+route+'">'+photoMarkup(photo)+'<div class="discovery-body"><h3>'+esc(t(title))+' →</h3><p>'+esc(t(sub))+'</p></div></a>').join('')+'</div></section>'+
 '<section class="blk concierge-help" aria-labelledby="help-title"><div><span class="ordinal">04</span><h2 class="sec" id="help-title">'+esc(t('need_help'))+'</h2><p class="sub">'+esc(t('mobility_teaser'))+'</p></div><div class="context-links"><a class="btn btn--primary" href="#senzaauto">'+esc(t('nav_senzaauto'))+' →</a><a class="btn btn--ghost" href="#utili">'+esc(t('help_short'))+'</a><a class="text-link" href="#casa">'+esc(t('nav_casa'))+'</a></div></section>'+
 '<section class="blk"><details class="today-details"><summary>'+esc(t('home_today'))+'</summary><div id="today-box"></div></details></section>';
}
function venueCards(venues){return '<div class="grid venue-grid">'+venues.map((v,i)=>'<article class="card venue" id="'+esc(v.id)+'">'+venueMedia(v)+'<div class="card__body"><span class="ordinal">'+String(i+1).padStart(2,'0')+'</span><h2>'+esc(v.name)+'</h2><p>'+esc(L(v.why))+'</p><div class="card__foot">'+externalLink(mapSearch(v.mapQuery),t('open_map'),'btn btn--map')+(v.site?externalLink(v.site,t('check_menu')):'')+'</div></div></article>').join('')+'</div>';}
function pgMangiare(){return pageHeading('nav_mangiare','restaurant_intro')+venueCards(GUIDE.restaurants);}
function pgAperitivi(){return pageHeading('nav_aperitivi','aperitif_intro')+venueCards(GUIDE.aperitivi);}
const TASTE_VENUES=[
 {id:'su-cumbidu',name:'Su Cumbidu',fit:'taste_fit_tradition',query:'Su Cumbidu Cagliari',menu:'https://www.sucumbiduterra.com/menu/'},
 {id:'sa-piola',name:'Sa Piola',fit:'taste_fit_piola',query:'Sa Piola Cagliari',menu:'https://www.sapiola.it/menu/'},
 {id:'antica-cagliari',name:'Antica Cagliari',fit:'taste_fit_sea',query:'Antica Cagliari Cagliari',menu:'https://www.anticacagliari.it/it/i-menu/menu-ristorante.html'}
];
const TASTE_ORDERS=[
 {id:'porceddu',group:'land',venue:'Su Cumbidu',query:'Su Cumbidu Cagliari',menu:'https://www.sucumbiduterra.com/menu/',order:'Maialetto arrosto con contorno',price:'€22',pairing:'Cannonau di Sardegna',note:'taste_confirm_pig'},
 {id:'malloreddus',group:'land',venue:'Su Cumbidu',query:'Su Cumbidu Cagliari',menu:'https://www.sucumbiduterra.com/menu/',order:'Malloreddus a sa campidanesa',price:'€15',pairing:'Monica di Sardegna'},
 {id:'pane_carasau',group:'land',venue:'Su Cumbidu',query:'Su Cumbidu Cagliari',menu:'https://www.sucumbiduterra.com/menu/',order:'Pani frattau',price:'€18',pairing:'Cannonau giovane'},
 {id:'seadas',group:'land',venue:'Su Cumbidu',query:'Su Cumbidu Cagliari',menu:'https://www.sucumbiduterra.com/menu/',order:'Sebadas',price:'€7',pairing:'Moscato di Sardegna'},
 {id:'fregola',group:'sea',venue:'Sa Piola',query:'Sa Piola Cagliari',menu:'https://www.sapiola.it/menu/',order:'Fregola con le arselle',price:null,pairing:'Vermentino di Sardegna',note:'taste_seasonal'},
 {id:'bottarga',group:'sea',venue:'Sa Piola',query:'Sa Piola Cagliari',menu:'https://www.sapiola.it/menu/',order:'taste_ask_bottarga',price:null,pairing:'Vermentino di Sardegna',note:'taste_seasonal'},
 {id:'pecorino',group:'wine',venue:'Antica Cagliari',query:'Antica Cagliari Cagliari',menu:'https://www.anticacagliari.it/it/i-menu/menu-ristorante.html',order:'Pecorino sardo arrosto',price:'€10',pairing:'Cannonau di Sardegna'},
 {id:'cannonau',group:'wine',venue:'Sa Piola',query:'Sa Piola Cagliari',menu:'https://www.sapiola.it/menu/',order:'taste_ask_cannonau',price:null,pairing:'taste_with_roast',note:'taste_seasonal'}
];
const TASTE_GROUPS=[
 {id:'land',title:'taste_tradition',note:'taste_tradition_note'},
 {id:'sea',title:'taste_sea',note:'taste_sea_note'},
 {id:'wine',title:'taste_aperitivo',note:'taste_aperitivo_note'}
];
function tasteVenue(v){return '<article class="taste-venue" id="'+esc(v.id)+'"><h3>'+esc(v.name)+'</h3><p>'+esc(t(v.fit))+'</p><div class="card__foot">'+externalLink(v.menu,t('check_menu'),'btn btn--primary')+externalLink(directionsLink(v.query),t('route_from_home'),'btn btn--map')+'</div></article>';}
function tasteOrder(item){const f=FOOD.find(food=>food.id===item.id);if(!f)return '';const order=item.order.startsWith('taste_')?t(item.order):item.order;const pairing=item.pairing.startsWith('taste_')?t(item.pairing):item.pairing;const ask='https://wa.me/393931104422?text='+encodeURIComponent(t('taste_whatsapp_prefix')+' '+L(f.name));return '<article class="taste-order" id="'+esc(item.id)+'">'+photoMarkup(item.id)+'<div class="taste-order__body"><h3>'+esc(L(f.name))+'</h3><p class="taste-description">'+esc(L(f.d))+'</p><dl><div><dt>'+esc(t('taste_where_label'))+'</dt><dd>'+esc(item.venue)+'</dd></div><div><dt>'+esc(t('taste_order_label'))+'</dt><dd>'+esc(order)+'</dd></div>'+(item.price?'<div><dt>'+esc(t('taste_price_label'))+'</dt><dd>'+esc(item.price)+'</dd></div>':'')+'<div><dt>'+esc(t('taste_pairing_label'))+'</dt><dd>'+esc(pairing)+'</dd></div></dl>'+(item.note?'<p class="taste-caution">'+esc(t(item.note))+'</p>':'')+'<div class="card__foot">'+externalLink(item.menu,t('check_menu'),'btn btn--primary')+externalLink(directionsLink(item.query),t('route_from_home'),'btn btn--map')+externalLink(ask,t('ask_angelo'))+'</div></div></article>';}
function pgSapori(){return pageHeading('nav_sapori','taste_intro')+
 '<section class="taste-choice" aria-labelledby="taste-question"><span class="ordinal">'+esc(t('host_pick'))+'</span><h2 class="sec" id="taste-question">'+esc(t('taste_question'))+'</h2><p class="sub">'+esc(t('taste_help'))+'</p></section>'+
 '<section class="taste-venue-guide" aria-label="'+esc(t('taste_choose_place'))+'"><h2 class="sec">'+esc(t('taste_choose_place'))+'</h2><div class="taste-venues">'+TASTE_VENUES.map(tasteVenue).join('')+'</div></section>'+
 '<aside class="taste-verified"><strong>'+esc(t('taste_checked'))+'</strong><span>'+esc(t('taste_verify_note'))+'</span></aside>'+
 '<div class="taste-order-groups">'+TASTE_GROUPS.map((group,i)=>'<section class="taste-order-group" aria-labelledby="taste-'+esc(group.id)+'"><header><span class="ordinal">'+String(i+1).padStart(2,'0')+'</span><h2 class="sec" id="taste-'+esc(group.id)+'">'+esc(t(group.title))+'</h2><p>'+esc(t(group.note))+'</p></header><div class="taste-orders">'+TASTE_ORDERS.filter(item=>item.group===group.id).map(tasteOrder).join('')+'</div></section>').join('')+'</div>'+
 '<aside class="sommelier-note"><span aria-hidden="true">🍷</span><div><h2>'+esc(t('angelo_pairing'))+'</h2><p>'+esc(t('angelo_pairing_note'))+'</p></div></aside><p class="credits-link"><a href="#fonti">'+esc(t('photo_credit'))+'</a></p>';}
function pgCasa(){return pageHeading('nav_casa','house_intro')+'<div class="house-layout"><article class="notice"><p>'+esc(t('house_services'))+'</p></article><article class="card"><div class="card__body"><h2>'+esc(t('arrival'))+'</h2><p>'+esc(t('arrival_note'))+'</p><div class="card__foot">'+externalLink('https://piccolabellavista.it/',t('property_site'),'btn btn--primary')+externalLink('https://wa.me/393931104422',t('contact_host'))+'</div></div></article></div>';}
function pgSenzaAuto(){return pageHeading('nav_senzaauto','mobility_intro')+'<p class="source-link">'+externalLink('https://www.ctmcagliari.it/busfinder/',t('ctm_label'))+'</p><div class="grid transit-grid">'+GUIDE.transit.map(d=>'<article class="card"><div class="card__body"><h2>'+esc(L(d.name))+'</h2><p>'+esc(L(d.note))+'</p><div class="card__foot">'+externalLink(transitLink(d.query),t('plan_transit'),'btn btn--map')+(d.id==='ospedali'?['Ospedale Oncologico Cagliari','Ospedale Microcitemico Cagliari'].map(q=>externalLink(transitLink(q),q.replace('Ospedale ','').replace(' Cagliari',''))).join(''):'')+'</div></div></article>').join('')+'</div><section class="notice"><h2>'+esc(t('taxi_option'))+'</h2><p>'+esc(t('taxi_note'))+'</p></section>';}
function pgStoria(){return pageHeading('nav_storia','history_intro')+'<div class="grid history-grid">'+GUIDE.routes.map((d,i)=>'<article class="card"><div class="card__body"><span class="kicker">'+esc(L(d.period))+'</span><h2>'+esc(L(d.name))+'</h2><p class="duration">'+esc(t('suggested_time'))+': '+esc(L(d.duration))+'</p><p>'+esc(L(d.why))+'</p><p><b>'+esc(t('who_for'))+':</b> '+esc(L(d.who))+'</p><div class="card__foot">'+externalLink(mapSearch(d.query),t('open_map'),'btn btn--map')+'</div></div></article>').join('')+'</div><section class="blk"><h2 class="sec">'+esc(t('timeline'))+'</h2><div class="tl">'+PERIODS.map(p=>'<div class="tl__item"><h3>'+esc(L(p.t))+'</h3><p>'+esc(L(p.d))+'</p><div class="tl__links">'+p.ids.map(id=>{const g=GEMS.find(x=>x.id===id);return g?'<button class="chip" data-open="'+esc(id)+'">'+esc(g.name)+'</button>':''}).join('')+'</div></div>').join('')+'</div></section>';}
function pgUtili(){return pageHeading('nav_utili','useful_intro')+'<div class="grid"><article class="card"><div class="card__body"><h2>'+esc(t('contact_host'))+'</h2><p>'+esc(t('arrival_note'))+'</p>'+externalLink('https://wa.me/393931104422',t('contact_host'),'btn btn--primary')+'</div></article><article class="card"><div class="card__body"><h2>'+esc(t('offline_title'))+'</h2><p>'+esc(t('offline_note'))+'</p></div></article></div>';}
function pgFonti(){return pageHeading('nav_fonti','credits_intro')+'<section class="blk"><h2 class="sec">'+esc(t('source'))+'</h2><div class="source-list">'+GUIDE.sources.map(s=>externalLink(s.url,s.name)).join('')+'</div></section><section class="blk"><h2 class="sec">'+esc(t('photo_credit'))+'</h2><p class="sub">'+esc(t('photo_changes'))+'</p><div class="credits-grid">'+Object.values(PHOTOS).filter(p=>p.file).map(p=>'<article class="credit"><h3>'+esc(L(p.alt))+'</h3><p>'+esc(p.author)+' · Wikimedia Commons</p><p>'+externalLink(p.source,t('source'),'text-link')+' · '+externalLink(p.licenseUrl,p.license,'text-link')+'</p></article>').join('')+'</div></section>';}

/* Hospital stays. Distances supplied in the approved brief; approximate, not live routing. */
function pgOspedali(){
 const list=key=>'<ul>'+t(key).map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul>';
 const phone=(number,label)=>'<a class="btn btn--ghost" href="tel:'+number+'">'+esc(label)+'</a>';
 const hospitals=[['Ospedale Oncologico Businco','2,5','5–10'],['Ospedale Microcitemico','2,6','5–10'],['Ospedale San Michele / Brotzu','3,7','7–12']];
 return pageHeading('hospital_title','hospital_intro')+
 '<aside class="notice"><strong>'+esc(t('hospital_access'))+'</strong></aside>'+

 '<section class="blk"><h2 class="sec">'+esc(t('hospital_routes'))+'</h2><p class="sub">'+esc(t('hospital_traffic'))+'</p><div class="grid">'+hospitals.map(([name,km,time])=>'<article class="card"><div class="card__body"><h3>'+esc(name)+'</h3><p>≈ '+(LANG==='en'?km.replace(',','.'):km)+' km · '+time+' min '+esc(t('hospital_drive'))+'</p>'+externalLink(directionsLink(name+' Cagliari')+'&travelmode=driving',t('hospital_route_to')+' '+name,'btn btn--map')+'</div></article>').join('')+'</div></section>'+
 '<section class="blk"><div class="house-layout"><article class="card"><div class="card__body"><h2>'+esc(t('hospital_services'))+'</h2>'+list('hospital_amenities')+'</div></article><article class="card"><div class="card__body"><h2>'+esc(t('hospital_clean'))+'</h2>'+list('hospital_linen')+'</div></article></div></section>'+
 '<section class="blk"><h2 class="sec">'+esc(t('hospital_useful'))+'</h2><div class="card__foot">'+externalLink(directionsLink('Coop Via Santa Maria Chiara 159 Pirri Cagliari'),t('hospital_coop'),'btn btn--map')+externalLink('https://www.ctmcagliari.it/busfinder/','CTM BusFinder')+phone('+39070400101','Taxi Quattro Mori · 070 400 101')+phone('+390706655','Radio Taxi Rossoblù · 070 6655')+externalLink(mapSearch('farmacie aperte ora vicino a Via Bellavista 14 Pirri Cagliari'),t('hospital_pharmacy'))+'</div><p class="sub">'+esc(t('hospital_dynamic'))+'</p></section>'+
 '<section class="blk notice"><h2>'+esc(t('hospital_doctor'))+'</h2><p>'+esc(t('hospital_address'))+'</p><div class="card__foot">'+phone('+390706095002','070 6095002')+phone('+390706095005','070 6095005')+phone('+393669336016','366 9336016')+externalLink('https://www.asl8cagliari.it/strutture/guardia-medica-distretto-1-pirri-e-monserrato/',t('hospital_source'))+'</div><p><strong>'+esc(t('hospital_warning'))+'</strong></p></section>'+
 '<section class="blk"><h2 class="sec">'+esc(t('hospital_emergency'))+'</h2><div class="card__foot">'+phone('112','112')+phone('118','118')+'</div></section>'+
 '<section class="blk concierge-help"><div><h2 class="sec">'+esc(t('hospital_cta'))+'</h2></div>'+externalLink('https://wa.me/393931104422',t('hospital_whatsapp'),'btn btn--primary')+'</section>';
}
