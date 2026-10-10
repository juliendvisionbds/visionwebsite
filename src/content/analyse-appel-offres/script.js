

/* ============================================================
   BLIPS — le système de mascotte.
   Un seul générateur SVG, 6 poses, 4 couleurs.
   Les yeux suivent le curseur sur toute la page.
   ============================================================ */
const COLORS={brand:'var(--brand)',honey:'var(--honey)',mint:'var(--mint)',ink:'var(--ink)',
  yellow:'var(--yellow)',orange:'var(--orange)',amber:'var(--amber)'};

function blipSVG(pose,color){
  const c=COLORS[color]||COLORS.brand;
  const ink='var(--ink)';

  /* — pièces communes à toute la flotte — */
  const eye=(cx,cy,rx,ry)=>`<g class="eyeball"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${ink}" stroke-width="3"/>
      <g class="pupil"><circle cx="${cx}" cy="${cy}" r="${(rx*.46).toFixed(1)}" fill="${ink}"/>
      <circle cx="${(cx+rx*.2).toFixed(1)}" cy="${(cy-ry*.2).toFixed(1)}" r="${(rx*.16).toFixed(1)}" fill="#fff"/></g></g>`;
  const shut=(cx,cy,w)=>`<path d="M${cx-w} ${cy} q${w} ${(w*.7).toFixed(1)} ${w*2} 0" fill="none" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const beacon=(x,y)=>`<line x1="${x}" y1="${y}" x2="${x}" y2="${y-8}" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
      <circle class="beacon" cx="${x}" cy="${y-13}" r="5.5" fill="#FF3B2E" stroke="${ink}" stroke-width="3"/>`;
  const wheel=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${ink}"/><circle cx="${x}" cy="${y}" r="${(r*.34).toFixed(1)}" fill="#fff"/>`;
  const zzz=`<g fill="${ink}" font-family="Gabarito, sans-serif" font-weight="800">
      <text x="80" y="26" font-size="17">z</text><text x="92" y="14" font-size="12">z</text></g>`;

  /* — le "o" du logo : l'œil, avec son casque de chantier — */
  if(pose==='eye'){
    return `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="${ink}" stroke-width="4"/>
      <g class="eyeball"><circle cx="20" cy="20" r="14" fill="#fff"/>
      <g class="pupil"><circle cx="20" cy="21" r="7" fill="${ink}"/><circle cx="22.4" cy="18.4" r="2.2" fill="#fff"/></g></g>
      <path d="M6.5 8.5 a13.5 13.5 0 0 1 27 0 z" fill="var(--yellow)" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M2 8.5 h36" stroke="${ink}" stroke-width="3.6" stroke-linecap="round"/></svg>`;
  }
  if(pose==='eyecheck'){
    return `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="${c}"/>
      <path d="M12.5 20.5 l5 5 l10.5 -11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  /* — la flotte — */
  let body;

  if(pose==='carry'){            /* PELLETEUSE — elle emporte la tâche */
    body=`<rect x="10" y="74" width="78" height="20" rx="10" fill="${ink}"/>
      <circle cx="24" cy="84" r="4.5" fill="#fff"/><circle cx="49" cy="84" r="4.5" fill="#fff"/><circle cx="74" cy="84" r="4.5" fill="#fff"/>
      <rect x="18" y="63" width="58" height="13" rx="6.5" fill="${c}" stroke="${ink}" stroke-width="4"/>
      <path d="M64 52 L86 33 L97 44" fill="none" stroke="${ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M91 39 q13 3 11 16 l-17 -4 z" fill="${c}" stroke="${ink}" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="18" y="29" width="50" height="36" rx="13" fill="${c}" stroke="${ink}" stroke-width="4"/>
      ${beacon(43,29)}
      ${eye(43,47,16,15)}
      <g transform="rotate(-9 84 15)"><rect x="68" y="3" width="32" height="24" rx="5" fill="#fff" stroke="${ink}" stroke-width="3.5"/>
      <line x1="75" y1="12" x2="93" y2="12" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <line x1="75" y1="19" x2="87" y2="19" stroke="${ink}" stroke-width="3" stroke-linecap="round"/></g>`;
  }
  else if(pose==='wave'){        /* GRUE — la flèche fait coucou */
    body=`<rect x="14" y="74" width="72" height="20" rx="10" fill="${ink}"/>
      <circle cx="28" cy="84" r="4.5" fill="#fff"/><circle cx="50" cy="84" r="4.5" fill="#fff"/><circle cx="72" cy="84" r="4.5" fill="#fff"/>
      <rect x="58" y="8" width="14" height="42" rx="5" fill="${c}" stroke="${ink}" stroke-width="3.5"/>
      <g class="jib"><line x1="28" y1="12" x2="104" y2="12" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
        <rect x="22" y="5" width="13" height="14" rx="3.5" fill="${c}" stroke="${ink}" stroke-width="3"/>
        <line x1="92" y1="14" x2="92" y2="27" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
        <path d="M87 27 a5 5 0 1 0 10 0" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/></g>
      <rect x="20" y="42" width="46" height="33" rx="12" fill="${c}" stroke="${ink}" stroke-width="4"/>
      ${eye(42,58,15,14)}`;
  }
  else if(pose==='look'){        /* THÉODOLITE — le géomètre, celui qui audite */
    body=`<path d="M50 52 L26 92 M50 52 L50 92 M50 52 L74 92" fill="none" stroke="${ink}" stroke-width="5.5" stroke-linecap="round"/>
      <rect x="26" y="19" width="46" height="34" rx="13" fill="${c}" stroke="${ink}" stroke-width="4"/>
      <rect x="68" y="28" width="20" height="14" rx="7" fill="${c}" stroke="${ink}" stroke-width="3.5"/>
      ${beacon(49,19)}
      ${eye(47,36,15,14)}`;
  }
  else if(pose==='sleep'){       /* COMPACTEUR — garé, il dort */
    body=`<rect x="24" y="34" width="56" height="36" rx="13" fill="${c}" stroke="${ink}" stroke-width="4"/>
      ${wheel(78,78,13)}
      <circle cx="32" cy="72" r="19" fill="${ink}"/><circle cx="32" cy="72" r="7" fill="#fff"/>
      ${shut(52,52,12)}
      ${zzz}`;
  }
  else if(pose==='roller'){      /* ROULEAU COMPRESSEUR — il aplatit la tâche, pour de bon */
    body=`<path d="M-4 95 q5 -7 10 0 q5 7 10 0" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".3"/>
      <line x1="18" y1="97" x2="66" y2="97" stroke="${ink}" stroke-width="3" stroke-linecap="round" opacity=".2"/>
      <circle cx="27" cy="78" r="21" fill="${ink}"/>
      <path d="M12 70 a16 16 0 0 1 32 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".25"/>
      <rect x="23" y="68" width="70" height="12" rx="6" fill="${ink}"/>
      ${wheel(88,84,12)}
      <rect x="45" y="29" width="48" height="41" rx="14" fill="${c}" stroke="${ink}" stroke-width="4"/>
      <rect x="90" y="16" width="8" height="18" rx="4" fill="${c}" stroke="${ink}" stroke-width="3"/>
      <circle cx="95" cy="9" r="5" fill="#fff" stroke="${ink}" stroke-width="2.5"/>
      <circle cx="100" cy="0" r="3.5" fill="#fff" stroke="${ink}" stroke-width="2"/>
      ${beacon(69,29)}
      ${eye(69,49,15,14)}`;
  }
  else{                          /* CAMION BENNE — la base de la flotte */
    body=`${wheel(30,80,13)}${wheel(74,80,13)}
      <rect x="12" y="70" width="80" height="9" rx="4.5" fill="${ink}"/>
      <rect x="44" y="30" width="48" height="42" rx="9" fill="${c}" stroke="${ink}" stroke-width="4"/>
      <rect x="7" y="40" width="40" height="32" rx="11" fill="${c}" stroke="${ink}" stroke-width="4"/>
      ${beacon(27,40)}
      ${eye(26,56,13.5,12.5)}`;
  }

  /* peek = l'engin qui dépasse d'un bord : on coupe le bas */
  const clip = pose==='peek' ? `<clipPath id="pk"><rect x="-6" y="-6" width="118" height="80"/></clipPath>` : '';
  const g = pose==='peek' ? ' clip-path="url(#pk)"' : '';

  return `<svg viewBox="-6 -6 118 108"><defs>${clip}</defs><g${g}>${body}</g></svg>`;
}

document.querySelectorAll('.blip').forEach(el=>{
  el.innerHTML=blipSVG(el.dataset.pose||'default',el.dataset.color||'brand');
});
/* les yeux suivent le curseur */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce && matchMedia('(pointer:fine)').matches){
  let mx=innerWidth/2,my=innerHeight/2,raf;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(track)});
  function track(){
    raf=null;
    document.querySelectorAll('.blip .pupil').forEach(p=>{
      const svg=p.ownerSVGElement, r=svg.getBoundingClientRect();
      if(r.bottom<-100||r.top>innerHeight+100) return;
      const cx=r.left+r.width/2, cy=r.top+r.height*.46;
      const a=Math.atan2(my-cy,mx-cx), d=Math.min(1,Math.hypot(mx-cx,my-cy)/340);
      const max=5.2;
      p.setAttribute('transform',`translate(${Math.cos(a)*max*d} ${Math.sin(a)*max*d})`);
    });
  }
  track();
}

/* reveals + squiggles */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('show');
    e.target.querySelectorAll('.sq').forEach((s,i)=>setTimeout(()=>s.classList.add('drawn'),260+i*140));
    io.unobserve(e.target);
  }}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)});
setTimeout(()=>document.querySelectorAll('.hero .sq').forEach(s=>s.classList.add('drawn')),700);

/* faq */
document.querySelectorAll('.q button').forEach(b=>{
  b.addEventListener('click',()=>{
    const q=b.parentElement, ans=q.querySelector('.ans'), open=q.classList.contains('open');
    document.querySelectorAll('.q.open').forEach(o=>{o.classList.remove('open');o.querySelector('.ans').style.maxHeight=null});
    if(!open){q.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
  });
});


/* ——— sommaire du guide : met en avant la partie en cours de lecture ——— */
const gtoc=document.getElementById('gtoc');
if(gtoc){
  const links=[...gtoc.querySelectorAll('a')];
  const heads=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));
  }),{rootMargin:'-20% 0px -70% 0px'});
  heads.forEach(h=>spy.observe(h));
}

/* ============================================================
   OUTIL — ANALYSE EXPRESS D'UN APPEL D'OFFRES
   PDF ou texte du RC → fiche sourcée (POST /api/outils/analyse-appel-offres), éditable,
   exportable en texte, e-mail, Word, impression, et dates clés en .ics.
   ============================================================ */
(()=>{
const form=document.getElementById('ao-form'); if(!form) return;
const $=id=>document.getElementById(id);
const out=$('ao-out');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* Copie dans le presse-papiers : API moderne, puis execCommand, puis sélection du texte pour copie manuelle. */
async function copyToClipboard(text,html,fallbackEl){
  try{
    if(html&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([text],{type:'text/plain'})})]);return 'ok'}
    await navigator.clipboard.writeText(text);return 'ok';
  }catch{}
  try{
    const onCopy=e=>{e.clipboardData.setData('text/plain',text);if(html)e.clipboardData.setData('text/html',html);e.preventDefault()};
    document.addEventListener('copy',onCopy,{once:true});
    const ok=document.execCommand('copy');
    document.removeEventListener('copy',onCopy);
    if(ok) return 'ok';
  }catch{}
  if(fallbackEl){const sel=getSelection();sel.removeAllRanges();const r=document.createRange();r.selectNodeContents(fallbackEl);sel.addRange(r)}
  return 'manual';
}

/* compteur */
const rc=$('ao-rc'), count=$('ao-count');
const updateCount=()=>{count.textContent=rc.value.length.toLocaleString('fr-FR')};
rc.addEventListener('input',updateCount);updateCount();

/* ——— PDF : extraction du texte dans le navigateur (pdf.js, chargé à la demande) ——— */
const PDFJS='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
function loadPdfJs(){
  if(window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  return new Promise((res,rej)=>{const s=document.createElement('script');s.src=PDFJS;s.onload=()=>{window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_WORKER;res(window.pdfjsLib)};s.onerror=()=>rej(new Error('Impossible de charger le lecteur PDF.'));document.head.appendChild(s)});
}
async function extractPdf(file){
  const lib=await loadPdfJs();
  const pdf=await lib.getDocument({data:await file.arrayBuffer()}).promise;
  const pages=[];
  for(let p=1;p<=pdf.numPages;p++){
    const tc=await (await pdf.getPage(p)).getTextContent();
    const lines=[]; let line='', y=null;
    for(const it of tc.items){
      if(typeof it.str!=='string') continue;
      const ty=Math.round(it.transform[5]);
      if(y!==null&&Math.abs(ty-y)>2){lines.push(line);line=''}
      line+=(line&&!line.endsWith(' ')&&!it.str.startsWith(' ')?' ':'')+it.str; y=ty;
      if(it.hasEOL){lines.push(line);line='';y=null}
    }
    lines.push(line);
    pages.push(lines.join('\n'));
  }
  return {pages:pdf.numPages,text:pages.join('\n\n').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim()};
}
const fileL=$('ao-file-l'), fileIn=$('ao-file'), hint=$('ao-file-hint');
async function handleFile(file){
  if(!file) return;
  if(!/pdf$/i.test(file.type)&&!/\.pdf$/i.test(file.name)){hint.textContent='Déposez un fichier PDF.';return}
  fileL.classList.remove('ok');hint.textContent='Extraction du texte en cours…';
  try{
    const {pages,text}=await extractPdf(file);
    if(text.length<200){hint.textContent='Ce PDF ne contient pas de texte sélectionnable (scan ?). Copiez le texte depuis votre lecteur, ou passez-le par une reconnaissance de caractères.';return}
    rc.value=text.slice(0,60000);updateCount();fileL.classList.add('ok');
    hint.textContent=`${file.name} : ${pages} page${pages>1?'s':''}, ${text.length.toLocaleString('fr-FR')} caractères extraits${text.length>60000?' (texte coupé à 60 000, les premières pages comptent le plus)':''}.`;
  }catch(e){hint.textContent=(e&&e.message)||'Lecture du PDF impossible : collez le texte ci-dessous.'}
}
fileIn.addEventListener('change',()=>handleFile(fileIn.files[0]));
['dragenter','dragover'].forEach(t=>fileL.addEventListener(t,e=>{e.preventDefault();fileL.classList.add('drag')}));
['dragleave','drop'].forEach(t=>fileL.addEventListener(t,e=>{e.preventDefault();fileL.classList.remove('drag')}));
fileL.addEventListener('drop',e=>handleFile(e.dataTransfer?.files?.[0]));

/* exemple */
const EXAMPLE=`COMMUNE DE SAINT-AUBIN-DES-PINS
RÈGLEMENT DE LA CONSULTATION
Marché public de travaux – Réhabilitation du groupe scolaire Jean-Moulin
Procédure adaptée (article R2123-1 du Code de la commande publique)

Article 1 – Objet et étendue de la consultation
1.1 Objet : travaux de réhabilitation thermique et de mise en accessibilité du groupe scolaire Jean-Moulin, 12 rue des Écoles, 83000 Saint-Aubin-des-Pins. Durée prévisionnelle des travaux : 9 mois, dont 1 mois de préparation, à compter de l'ordre de service de démarrage. Démarrage prévisionnel : mars 2027.
1.2 Allotissement : les travaux sont répartis en 6 lots :
Lot 1 – Désamiantage, démolition, gros œuvre
Lot 2 – Charpente, couverture, étanchéité
Lot 3 – Menuiseries extérieures aluminium, serrurerie
Lot 4 – Isolation thermique par l'extérieur, ravalement
Lot 5 – Électricité, courants faibles
Lot 6 – Plomberie, chauffage, ventilation
Les candidats peuvent présenter une offre pour un ou plusieurs lots. Chaque lot fera l'objet d'un marché séparé.
1.3 Variantes : les variantes à l'initiative des candidats ne sont pas autorisées. Une prestation supplémentaire éventuelle (PSE) est prévue au lot 4 : traitement des façades nord en bardage bois.
1.4 Tranches : le marché ne comporte pas de tranche optionnelle.

Article 2 – Conditions de la consultation
2.1 Délai de validité des offres : 120 jours à compter de la date limite de remise des offres.
2.2 Visite des lieux : la visite du site est obligatoire pour les lots 1, 2 et 4. Elle se déroule sur rendez-vous auprès des services techniques (04 94 00 00 00, services.techniques@saint-aubin.fr) jusqu'au vendredi 7 novembre 2026. Une attestation de visite signée par la commune devra être jointe à l'offre, sous peine d'irrecevabilité.
2.3 Négociation : le pouvoir adjudicateur se réserve la possibilité de négocier avec les trois candidats les mieux classés par lot. Il peut toutefois attribuer le marché sur la base des offres initiales sans négociation.
2.4 Sous-traitance : la sous-traitance est admise ; le candidat remplit le formulaire DC4 pour chaque sous-traitant présenté à l'offre.
2.5 Groupement : les groupements conjoints ou solidaires sont admis ; le mandataire d'un groupement conjoint sera solidaire.

Article 3 – Présentation des candidatures et des offres
3.1 Pièces de la candidature : lettre de candidature DC1 ou DUME ; déclaration du candidat DC2 ; attestations d'assurance responsabilité civile et décennale en cours de validité ; liste des références de travaux similaires exécutés au cours des cinq dernières années ; qualifications professionnelles (Qualibat ou équivalent) ; pour le lot 1, certification de l'entreprise pour les travaux de désamiantage (sous-section 3) ; déclaration concernant le chiffre d'affaires des trois derniers exercices.
3.2 Pièces de l'offre : acte d'engagement (ATTRI1) complété et signé ; décomposition du prix global et forfaitaire (DPGF) complétée ; mémoire technique selon le cadre joint au DCE ; planning prévisionnel d'exécution ; attestation de visite (lots 1, 2 et 4) ; le cas échéant, formulaire DC4 de sous-traitance ; fiches techniques des matériaux principaux (lots 3 et 4).
3.3 Les offres sont rédigées en langue française et exprimées en euros.

Article 4 – Jugement des offres
Les offres seront classées selon les critères pondérés suivants :
1. Prix des prestations : 60 %. La note prix est calculée selon la formule : note = 60 × (offre la moins-disante / offre du candidat).
2. Valeur technique : 40 %, appréciée au vu du mémoire technique, selon les sous-critères suivants : méthodologie d'exécution et organisation en site occupé (15 %), moyens humains et matériels affectés (10 %), planning détaillé et respect des délais (10 %), gestion des déchets et nuisances (5 %).

Article 5 – Conditions d'envoi ou de remise des plis
5.1 Date et heure limites de réception des offres : vendredi 21 novembre 2026 à 12 h 00.
5.2 Les plis sont transmis exclusivement par voie électronique sur le profil d'acheteur www.marches-securises.fr. La signature électronique de l'acte d'engagement n'est pas exigée au stade du dépôt ; elle sera demandée à l'attributaire.
5.3 Les candidats peuvent poser des questions via le profil d'acheteur jusqu'au vendredi 14 novembre 2026 à 12 h 00. Les réponses seront communiquées à l'ensemble des candidats au plus tard le mardi 18 novembre 2026.
5.4 Formats acceptés : PDF, DOC, XLS. Taille maximale des fichiers : 100 Mo.

Article 6 – Renseignements complémentaires
Maître d'ouvrage : Commune de Saint-Aubin-des-Pins, service de la commande publique, marches@saint-aubin.fr. Maître d'œuvre : Atelier Garrigue Architectes.`;
$('ao-example').addEventListener('click',()=>{
  $('ao-metiers').value='gros œuvre, isolation par l\'extérieur';
  $('ao-entreprise').value='Durand Construction';
  rc.value=EXAMPLE;updateCount();fileL.classList.remove('ok');hint.textContent='ou cliquez pour le choisir. Le texte est extrait dans votre navigateur, le fichier n\'est pas envoyé.';rc.focus();
});

/* ——— rendu ——— */
const srcHtml=s=>s?`<span class="src">${esc(s)}</span>`:'';
const li=(arr,empty)=>arr.length?`<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<p class="empty">${esc(empty)}</p>`;
const stCls=s=>s==='facultatif'?'st fac':s==='si concerné'?'st cond':'st';
const chk=(arr,empty)=>arr.length?`<ul class="chk">${arr.map(d=>`<li><div><span class="st ${stCls(d.statut).slice(3)}">${esc(d.statut)}</span> ${esc(d.document)}${srcHtml(d.source)}</div></li>`).join('')}</ul>`:`<p class="empty">${esc(empty)}</p>`;
function sheetHtml(a){
  const ac=a.acheteur||{}, m=a.marche||{}, v=a.visite||{};
  const meta=[['Acheteur',[ac.nom,ac.type].filter(Boolean).join(', ')],['Contact',ac.contact],['Objet',a.objet],['Procédure',a.procedure],['Type de marché',m.type],['Lieu',m.lieu],['Durée',m.duree],['Montant estimé',m.montant],['Variantes',m.variantes],['Tranches, options',m.tranches]].filter(([,x])=>x&&String(x).trim());
  const dates=[...(a.dates||[])].sort((x,y)=>((x.iso||'9999')+(x.heure||''))<((y.iso||'9999')+(y.heure||''))?-1:1);
  const vis=v.obligatoire==='oui'?'<span class="st oui">Visite obligatoire</span>':v.obligatoire==='non'?'<span class="st non">Visite non obligatoire</span>':'<span class="st cond">Visite : non précisé</span>';
  return `<div class="ao-head">
    <h2>${esc(a.titre||'Analyse du règlement de consultation')}</h2>
    <dl class="ao-meta">${meta.map(([k,x])=>`<dt>${esc(k)}</dt><dd>${esc(x)}</dd>`).join('')}</dl>${m.source?`<p class="src">${esc(m.source)}</p>`:''}
  </div>
  <div class="ao-sec"><h3>Dates clés</h3>${dates.length?`<table><thead><tr><th>Événement</th><th>Date</th><th>Source</th></tr></thead><tbody>${dates.map(d=>`<tr><td data-l="Événement"><b>${esc(d.evenement)}</b></td><td data-l="Date" class="w">${esc(d.date)}</td><td data-l="Source">${d.source?`<span class="src">${esc(d.source)}</span>`:''}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Aucune date trouvée dans le texte.</p>'}</div>
  <div class="ao-sec"><h3>Visite des lieux</h3><p>${vis} ${esc(v.modalites||'')}${srcHtml(v.source)}</p></div>
  <div class="ao-sec"><h3>Lots</h3>${(a.lots||[]).length?`<table><thead><tr><th>N°</th><th>Intitulé</th><th>Remarque</th></tr></thead><tbody>${a.lots.map(l=>`<tr><td data-l="N°" class="w">${esc(l.numero)}</td><td data-l="Intitulé">${esc(l.intitule)}</td><td data-l="Remarque">${esc(l.remarque)}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Marché non alloti, ou lots non décrits dans le RC.</p>'}</div>
  <div class="ao-sec"><h3>Critères d'attribution</h3>${(a.criteres||[]).length?`<table><thead><tr><th>Critère</th><th>Pondération</th><th>Sous-critères</th></tr></thead><tbody>${a.criteres.map(c=>`<tr><td data-l="Critère"><b>${esc(c.critere)}</b>${srcHtml(c.source)}</td><td data-l="Pondération" class="w">${esc(c.ponderation)}</td><td data-l="Sous-critères">${esc(c.sous_criteres)}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Critères non trouvés dans le texte.</p>'}</div>
  <div class="ao-sec"><h3>Pièces de la candidature</h3>${chk(a.documents_candidature||[],'Aucune pièce de candidature listée.')}</div>
  <div class="ao-sec"><h3>Pièces de l'offre</h3>${chk(a.documents_offre||[],'Aucune pièce d\'offre listée.')}</div>
  <div class="ao-sec"><h3>Modalités</h3>${(a.modalites||[]).length?`<table><thead><tr><th>Point</th><th>Ce que dit le RC</th></tr></thead><tbody>${a.modalites.map(x=>`<tr><td data-l="Point"><b>${esc(x.point)}</b></td><td data-l="Ce que dit le RC">${esc(x.valeur)}${srcHtml(x.source)}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Rien de particulier.</p>'}</div>
  <div class="ao-sec"><h3>Points de vigilance</h3>${(a.points_vigilance||[]).length?`<ul class="ao-vig">${a.points_vigilance.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p class="empty">Rien de signalé.</p>'}</div>
  <div class="ao-sec"><h3>À vérifier dans le reste du dossier</h3>${(a.a_verifier||[]).length?`<ul class="ao-ver">${a.a_verifier.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p class="empty">Le RC répond à l\'essentiel.</p>'}</div>`;
}
const BLANK={titre:'Analyse du RC – …',acheteur:{nom:'…',type:'',contact:''},objet:'…',procedure:'…',marche:{type:'travaux',lieu:'…',duree:'…',montant:'',variantes:'',tranches:'',source:''},
  lots:[{numero:'1',intitule:'…',remarque:''}],dates:[{evenement:'Remise des offres',date:'…',iso:'',heure:'',source:''},{evenement:'Visite du site',date:'…',iso:'',heure:'',source:''},{evenement:'Questions des candidats',date:'…',iso:'',heure:'',source:''}],
  visite:{obligatoire:'non précisé',modalites:'',source:''},criteres:[{critere:'Prix',ponderation:'… %',sous_criteres:'',source:''},{critere:'Valeur technique',ponderation:'… %',sous_criteres:'…',source:''}],
  documents_candidature:[{document:'DC1 ou DUME',statut:'obligatoire',source:''},{document:'DC2',statut:'obligatoire',source:''},{document:'Attestations d\'assurance RC et décennale',statut:'obligatoire',source:''}],
  documents_offre:[{document:'Acte d\'engagement',statut:'obligatoire',source:''},{document:'BPU / DPGF',statut:'obligatoire',source:''},{document:'Mémoire technique',statut:'obligatoire',source:''}],
  modalites:[{point:'Dépôt',valeur:'…',source:''},{point:'Validité des offres',valeur:'…',source:''}],points_vigilance:[],a_verifier:['Montant estimé','Pénalités de retard (CCAP)','Révision des prix (CCAP)','Retenue de garantie et avance (CCAP)']};

let currentAnalysis=null;
function render(a,source){
  currentAnalysis=a;
  const hasIcs=(a.dates||[]).some(d=>d.iso);
  out.innerHTML=`<div class="ao-tools">
      <span class="ao-status${source==='ai'?'':' std'}">${source==='ai'?'Fiche produite par IA à partir du texte. Le document original fait foi.':'Fiche vierge, à compléter.'}</span>
      <div class="ao-btns">
        ${hasIcs?'<button type="button" class="ao-btn ics" data-act="ics">Dates dans l\'agenda (.ics)</button>':''}
        <button type="button" class="ao-btn" data-act="text">Copier le texte</button>
        <button type="button" class="ao-btn" data-act="html">Copier pour e-mail</button>
        <button type="button" class="ao-btn" data-act="doc">Télécharger (.doc)</button>
        <button type="button" class="ao-btn" data-act="print">Imprimer / PDF</button>
      </div>
    </div>
    <p class="ao-hint">Vous pouvez corriger directement dans la fiche : cliquez sur un mot et tapez. Les passages entre guillemets sont recopiés du règlement.</p>
    <article class="ao-report" id="ao-report" contenteditable="true" spellcheck="true">${sheetHtml(a)}</article>`;
  out.querySelectorAll('.ao-btn[data-act]').forEach(b=>b.addEventListener('click',()=>exportSheet(b)));
}

/* ——— exports ——— */
function domToText(){
  const rep=$('ao-report'); if(!rep) return '';
  const L=[];
  rep.querySelectorAll(':scope > .ao-head, :scope > .ao-sec').forEach(node=>{
    if(node.classList.contains('ao-head')){
      L.push(node.querySelector('h2')?.textContent.trim().toUpperCase()||'');
      node.querySelectorAll('dt').forEach(dt=>L.push(`${dt.textContent.trim()} : ${dt.nextElementSibling?.textContent.trim()||''}`));
      L.push('');
    }else{
      L.push(node.querySelector('h3')?.textContent.trim().toUpperCase()||'');
      node.querySelectorAll(':scope > p').forEach(p=>L.push(p.textContent.replace(/\s+/g,' ').trim()));
      const isChk=!!node.querySelector('ul.chk');
      node.querySelectorAll('li').forEach(x=>L.push((isChk?'[ ] ':'- ')+x.textContent.replace(/\s+/g,' ').trim()));
      const table=node.querySelector('table');
      if(table){
        const heads=[...table.querySelectorAll('th')].map(t=>t.textContent.trim());
        table.querySelectorAll('tbody tr').forEach(tr=>{const cells=[...tr.querySelectorAll('td')].map(td=>td.textContent.replace(/\s+/g,' ').trim());L.push(cells.map((c,i)=>c?`${heads[i]} : ${c}`:'').filter(Boolean).join(' | '))});
      }
      L.push('');
    }
  });
  return L.join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
function domToHtml(){
  const rep=$('ao-report'); if(!rep) return '';
  const inner=rep.innerHTML
    .replace(/<table/g,'<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:13px"')
    .replace(/<h3/g,'<h3 style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#5A4BFF;margin:18px 0 6px"')
    .replace(/<dt/g,'<dt style="font-weight:bold;float:left;clear:left;width:150px"').replace(/<dd/g,'<dd style="margin:0 0 2px 160px"')
    .replace(/<ul class="chk">/g,'<ul style="list-style:none;padding-left:0">').replace(/<ul class="chk"><li>/g,'<ul style="list-style:none;padding-left:0"><li>')
    .replace(/<li><div>/g,'<li>☐ <div style="display:inline">').replace(/<span class="src">/g,'<br><span style="font-size:12px;color:#666;font-style:italic">« ').replace(/<\/span>(<\/div>|<\/td>|<\/p>|<\/b>)/g,' »</span>$1')
    .replace(/ contenteditable="true"| spellcheck="true"| data-l="[^"]*"/g,'');
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#111;max-width:760px">${inner}</div>`;
}
const docHtml=()=>`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc($('ao-report')?.querySelector('h2')?.textContent||'Analyse du règlement de consultation')}</title>
<style>body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#111;margin:24px}h2{font-size:20px}h3{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5A4BFF;margin:18px 0 6px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:6px;text-align:left;vertical-align:top}th{background:#eee}dl{overflow:hidden}dt{font-weight:bold;float:left;clear:left;width:150px}dd{margin:0 0 2px 160px}.st{font-size:11px}@media print{body{margin:0}}</style></head><body>${domToHtml()}</body></html>`;
function icsText(a){
  const pad=n=>String(n).padStart(2,'0'), now=new Date();
  const stamp=`${now.getUTCFullYear()}${pad(now.getUTCMonth()+1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
  const escI=s=>String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\;');
  const short=(a.objet||'Appel d\'offres').slice(0,60);
  const ev=(a.dates||[]).filter(d=>d.iso).map((d,i)=>{
    const ymd=d.iso.replace(/-/g,''); const t=d.heure?d.heure.split(':'):null;
    const dt=t?`DTSTART;TZID=Europe/Paris:${ymd}T${pad(t[0])}${pad(t[1])}00\nDTEND;TZID=Europe/Paris:${ymd}T${pad(t[0])}${pad(t[1])}00`:`DTSTART;VALUE=DATE:${ymd}`;
    return `BEGIN:VEVENT\nUID:ao-${stamp}-${i}@visionbds.com\nDTSTAMP:${stamp}\n${dt}\nSUMMARY:${escI(d.evenement+' – '+short)}\nDESCRIPTION:${escI((d.date||'')+(d.source?'\n« '+d.source+' »':''))}\nEND:VEVENT`;
  });
  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//vision//Analyse d'appel d'offres//FR\nCALSCALE:GREGORIAN\n${ev.join('\n')}\nEND:VCALENDAR\n`.replace(/\n/g,'\r\n');
}
async function exportSheet(btn){
  const act=btn.dataset.act, done=label=>{const t=btn.textContent;btn.textContent=label;btn.classList.add('ok');setTimeout(()=>{btn.textContent=t;btn.classList.remove('ok')},2200)};
  const manual=()=>{const t=btn.textContent;btn.textContent='Texte sélectionné : faites Ctrl+C';setTimeout(()=>{btn.textContent=t},2600)};
  const download=(content,type,name)=>{const blob=new Blob(content,{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
  try{
    if(act==='text'){(await copyToClipboard(domToText(),null,$('ao-report')))==='ok'?done('Copié ✓'):manual()}
    else if(act==='html'){(await copyToClipboard(domToText(),domToHtml(),$('ao-report')))==='ok'?done('Copié ✓ (collez dans votre e-mail)'):manual()}
    else if(act==='doc'){download(['\ufeff',docHtml()],'application/msword','analyse-appel-offres.doc');done('Téléchargé ✓')}
    else if(act==='ics'){download([icsText(currentAnalysis||{})],'text/calendar;charset=utf-8','appel-offres-dates.ics');done('Téléchargé ✓')}
    else if(act==='print'){const w=window.open('','_blank');if(!w)throw new Error('popup');w.document.open();w.document.write(docHtml());w.document.close();w.focus();setTimeout(()=>w.print(),400)}
  }catch{manual()}
}

/* ——— soumission ——— */
let current=0;
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const err=$('ao-err');err.hidden=true;
  const t=rc.value.trim();
  rc.setAttribute('aria-invalid',String(t.length<200));
  if(t.length<200){err.textContent='Déposez le PDF du règlement ou collez son texte (au moins quelques paragraphes).';err.hidden=false;rc.focus();return}
  current++; const token=current;
  const go=$('ao-go'); go.disabled=true;
  out.innerHTML=`<div class="ao-busy"><span class="blip" data-pose="look" data-color="honey"></span><div class="ao-spin" aria-hidden="true"></div><b>Lecture du règlement</b><p>Dates, visite, lots, critères, pièces, modalités, et le passage source de chacun. Comptez vingt à quarante secondes pour un RC complet.</p></div>`;
  out.querySelectorAll('.blip').forEach(el=>{el.innerHTML=blipSVG(el.dataset.pose,el.dataset.color)});
  out.scrollIntoView({behavior:'smooth',block:'start'});
  const ctrl=new AbortController(), timer=setTimeout(()=>ctrl.abort(),120000);
  try{
    const res=await fetch('/api/outils/analyse-appel-offres',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rc:t,metiers:$('ao-metiers').value.trim(),entreprise:$('ao-entreprise').value.trim()}),signal:ctrl.signal});
    if(token!==current) return;
    const data=await res.json().catch(()=>({}));
    if(!res.ok||!data.analysis) throw new Error(data.error||('HTTP '+res.status));
    render(data.analysis,'ai');
  }catch(ex){
    if(token!==current) return;
    const msg=ex.name==='AbortError'?'L\'analyse a pris trop de temps.':(ex.message||'Analyse indisponible.');
    out.innerHTML=`<div class="ao-fail"><b>La fiche n'a pas pu être produite</b><p>${esc(msg)} Vous pouvez réessayer dans un instant, ou partir de la fiche vierge et la remplir à la main.</p><button type="button" class="btn btn-primary" id="ao-blank">Utiliser la fiche vierge <span class="arw">→</span></button></div>`;
    $('ao-blank').addEventListener('click',()=>render(BLANK,'blank'));
  }finally{clearTimeout(timer);go.disabled=false}
});
})();
