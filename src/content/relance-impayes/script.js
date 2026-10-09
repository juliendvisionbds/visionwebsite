

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
   OUTIL — RELANCE DE FACTURE IMPAYÉE
   Calculs et calendrier dans le navigateur ; messages types instantanés,
   puis version personnalisée par l'IA (POST /api/outils/relance-impayes).
   ============================================================ */
(()=>{
const form=document.getElementById('ri-form'); if(!form) return;
const $=id=>document.getElementById(id);
const out=$('ri-out');

/* Taux du 2e semestre 2026 (revus chaque semestre : à mettre à jour au 1er janvier et au 1er juillet). */
const RATES={bce:2.40,legalPro:2.75,legalPart:6.84};
const DEFAULT_RATE={pro:+(RATES.bce+10).toFixed(2),public:+(RATES.bce+8).toFixed(2),particulier:0};
const MIN_PRO=+(RATES.legalPro*3).toFixed(2);
const DAY=86400000;

const pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;const d=new Date(+m[1],+m[2]-1,+m[3]);return isNaN(d)?null:d};
const addDays=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
const addYears=(d,n)=>new Date(d.getFullYear()+n,d.getMonth(),d.getDate());
const fmtD=d=>d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}).replace(/^1 /,'1er ');
const fmtDs=d=>d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'});
const eur=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const pct=n=>n.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' %';
const r2=n=>Math.round(n*100)/100;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const radio=name=>form.querySelector(`input[name="${name}"]:checked`).value;

/* ——— valeurs par défaut ——— */
let dueTouched=false, rateTouched=false, rendered=false;
const defaultDue=()=>{const d=parse($('ri-date').value);if(!d)return '';return iso($('ri-type').value==='retenue'?addYears(d,1):addDays(d,30))};
const syncDue=()=>{if(!dueTouched)$('ri-due').value=defaultDue()};
const syncRate=()=>{
  const c=radio('ri-client');
  if(!rateTouched)$('ri-rate').value=DEFAULT_RATE[c].toFixed(2);
  $('ri-rate-hint').textContent=c==='particulier'?'laissez 0 si votre devis ne prévoit pas de pénalités'
    :c==='public'?'intérêts moratoires : taux BCE + 8 points'
    :'taux BCE + 10 points, ou celui de vos CGV (minimum '+pct(MIN_PRO)+')';
};
const syncLabels=()=>{
  const t=$('ri-type').value;
  $('ri-date-label').textContent=t==='retenue'?'Date de réception des travaux':t==='situation'?'Date de dépôt de la situation':'Date de facture';
  $('ri-due-hint').textContent=t==='retenue'?'un an après la réception, modifiable':'proposée selon le client, modifiable';
};
const touched=()=>{if(rendered){$('ri-go').innerHTML='Mettre à jour la relance <span class="arw">→</span>'}};
$('ri-date').addEventListener('change',()=>{dueTouched=false;syncDue()});
$('ri-type').addEventListener('change',()=>{dueTouched=false;syncLabels();syncDue()});
$('ri-due').addEventListener('input',()=>{dueTouched=true});
$('ri-rate').addEventListener('input',()=>{rateTouched=true});
form.querySelectorAll('input[name="ri-client"]').forEach(r=>r.addEventListener('change',()=>{rateTouched=false;syncRate()}));
form.addEventListener('input',touched);form.addEventListener('change',touched);
$('ri-date').value=iso(addDays(today(),-38));
syncLabels();syncRate();syncDue();

/* ——— lecture et calculs ——— */
const DONE_AFTER={0:'sans relance',1:'après une relance',2:'après deux relances ou plus',md:'après une mise en demeure'};
const CLIENT_LABEL={pro:'entreprise privée',particulier:'particulier',public:'maître d\'ouvrage public'};
const TYPE_NOUN={facture:'la facture',situation:'la situation de travaux',solde:'la facture de solde',retenue:'la retenue de garantie'};
const TYPE_SHORT={facture:'Facture',situation:'Situation de travaux',solde:'Facture de solde',retenue:'Retenue de garantie'};

function pickLevel({client,done,situation,daysLate,late}){
  if(!late) return 'avant';
  if(situation==='visa') return 'visa';
  if(situation==='contestee') return 'litige';
  if(situation==='difficulte') return 'echeancier';
  let l=done==='md'?'recours':done==='2'?'md':done==='1'?(daysLate>45?'md':'ferme'):(daysLate>30?'ferme':'cordial');
  if(situation==='promesse'){if(l==='cordial')l='ferme';else if(l==='ferme')l='md'}
  return l;
}

function compute(){
  const client=radio('ri-client'), type=$('ri-type').value, relation=radio('ri-relation');
  const amount=parseFloat(String($('ri-amount').value).replace(',','.'));
  const date=parse($('ri-date').value), due=parse($('ri-due').value);
  const done=$('ri-done').value, situation=$('ri-situation').value;
  const rateIn=parseFloat(String($('ri-rate').value).replace(',','.'));
  const rate=isNaN(rateIn)?DEFAULT_RATE[client]:Math.min(60,Math.max(0,rateIn));
  const now=today();
  const daysLate=Math.round((now-due)/DAY), late=daysLate>0;
  const penalties=late&&rate>0?r2(amount*rate/100*daysLate/365):0;
  const indemnity=late&&client!=='particulier'?40:0;
  const total=r2(amount+penalties+indemnity);
  let presc,prescLabel;
  if(client==='particulier'){presc=addYears(date,2);prescLabel='deux ans à compter de la facture (code de la consommation)'}
  else if(client==='pro'){presc=addYears(due,5);prescLabel='cinq ans à compter de l\'échéance (code de commerce)'}
  else{presc=new Date(due.getFullYear()+4,11,31);prescLabel='déchéance quadriennale : quatre ans à compter du 1er janvier suivant'}
  const level=pickLevel({client,done,situation,daysLate,late});
  const f={client,type,relation,amount,date,due,done,situation,rate,now,daysLate,late,penalties,indemnity,total,
    warnMin:client==='pro'&&rate>0&&rate<MIN_PRO,presc,prescLabel,level,deadline:addDays(now,8),
    personal:{company:$('ri-company').value.trim(),contact:$('ri-contact').value.trim(),ref:$('ri-ref').value.trim(),works:$('ri-works').value.trim()}};
  f.rec=recours(f);
  return f;
}

/* ——— niveaux ——— */
const LEVELS={
  avant:{n:'0',cls:'l0',name:'Pas encore en retard',why:f=>`L'échéance est le ${fmtD(f.due)}, dans ${-f.daysLate} jour${-f.daysLate>1?'s':''}. Rien à réclamer pour l'instant. ${-f.daysLate<=7?'Un rappel courtois avant l\'échéance évite l\'oubli, surtout si la facture est passée par plusieurs mains.':'Vérifiez simplement que la facture est arrivée au bon endroit, puis laissez courir.'}`},
  cordial:{n:'1',cls:'l1',name:'Rappel cordial',why:f=>`${f.daysLate} jour${f.daysLate>1?'s':''} de retard, ${DONE_AFTER[f.done]}. À ce stade, on suppose un oubli ou un croisement avec le règlement : on rappelle les faits et on propose d'appeler si quelque chose bloque. Pas de pénalités dans le message, elles viendront à l'étape suivante.`},
  ferme:{n:'2',cls:'l2',name:'Relance ferme',why:f=>`${f.daysLate} jour${f.daysLate>1?'s':''} de retard, ${DONE_AFTER[f.done]}${f.situation==='promesse'?', et une promesse de paiement non tenue':''}. Le message chiffre le retard, fixe une date limite au ${fmtD(f.deadline)} et annonce la suite sans détour.${f.client!=='particulier'?' Les pénalités servent de levier : on propose d\'y renoncer contre un règlement rapide.':''}`},
  md:{n:'3',cls:'l3',name:'Mise en demeure',why:f=>`${f.daysLate} jour${f.daysLate>1?'s':''} de retard, ${DONE_AFTER[f.done]}${f.situation==='promesse'?', et une promesse non tenue':''}. L'amiable a été tenté : place au courrier recommandé avec accusé de réception. C'est la dernière étape avant le recours, et la pièce qui prouvera votre bonne foi.${f.client==='particulier'?' Pour un particulier, elle fait courir les intérêts au taux légal.':''}`},
  recours:{n:'4',cls:'l4',name:'Recours',why:f=>`La mise en demeure est restée sans effet${f.daysLate>0?` et le retard atteint ${f.daysLate} jours`:''}. Relancer encore n'apporte plus rien : ${f.rec.label.charAt(0).toLowerCase()+f.rec.label.slice(1)}. Un dernier message prévient le client que le dossier part.`},
  visa:{n:'!',cls:'lx',name:'Débloquer le visa',why:f=>`La situation attend le visa du maître d'œuvre. Relancer le client seul ne sert à rien : c'est le maître d'œuvre qu'il faut relancer par écrit, maître d'ouvrage en copie.${f.client==='public'?' En marché public, le délai de 30 jours court depuis le dépôt et les intérêts moratoires sont dus quoi qu\'il arrive.':' En marché privé, le contrat fixe le délai de paiement ; vérifiez s\'il court à partir du dépôt ou du visa.'}`},
  litige:{n:'!',cls:'lx',name:'Clarifier le litige',why:f=>`Une facture contestée ne se relance pas, elle se clarifie. Demandez par écrit les points contestés et leurs montants, proposez le règlement immédiat de la partie non contestée, et traitez le reste comme un dossier à part. Les pénalités ne se réclament pas sur un montant en discussion.`},
  echeancier:{n:'!',cls:'lx',name:'Proposer un échéancier',why:f=>`Le client dit avoir une difficulté de trésorerie. Un échéancier écrit vaut mieux qu'une mise en demeure qui n'obtiendra rien : trois versements, pénalités suspendues tant qu'il est respecté, solde exigible dès la première échéance manquée. Vérifiez d'abord qu'il n'est pas en procédure collective.`},
};

/* ——— recours ——— */
function recours(f){
  const pub=f.client==='public', trib=f.client==='particulier'?'tribunal judiciaire':'tribunal de commerce';
  let r;
  if(pub) r={label:'Référé-provision au tribunal administratif',text:'Pas d\'injonction de payer contre une personne publique. Vous adressez d\'abord une réclamation écrite (la mise en demeure en tient lieu), puis un référé-provision au tribunal administratif, qui peut accorder une provision si la créance n\'est pas sérieusement contestable. Les intérêts moratoires et l\'indemnité de 40 € restent dus de plein droit.'};
  else if(f.amount<5000) r={label:'Procédure simplifiée par un commissaire de justice',text:'Créance inférieure à 5 000 € : un commissaire de justice (l\'ancien huissier) mène une procédure simplifiée de recouvrement, rapide et sans juge. Si le débiteur refuse d\'y participer, vous demandez une injonction de payer au '+trib+', avec un formulaire et sans avocat.'};
  else r={label:'Injonction de payer au '+trib,text:'Un formulaire déposé au greffe, sans avocat. Le juge rend une ordonnance sur pièces ; un commissaire de justice la signifie au débiteur, qui dispose d\'un mois pour s\'y opposer. Sans opposition, elle devient exécutoire.'};
  r.dossier=['Devis signé, ordres de service ou bons de commande',f.type==='situation'?'Situations de travaux et leurs visas':'Procès-verbal de réception et levée des réserves','La facture et la preuve de son envoi (Chorus Pro en marché public)','Les relances envoyées','La mise en demeure et son accusé de réception'];
  r.notes=[];
  if(f.type==='retenue') r.notes.push('La retenue de garantie doit être consignée ou remplacée par une caution (loi du 16 juillet 1971). Un an après la réception, sans opposition motivée par recommandé, réclamez-la directement au consignataire ou à la caution.');
  r.notes.push('Si le client est en redressement ou en liquidation judiciaire, les relances s\'arrêtent : déclarez la créance au mandataire dans les deux mois de la publication au BODACC.');
  return r;
}

/* ——— calendrier ——— */
function calendar(f){
  const d=n=>addDays(f.now,n), L=f.level, pub=f.client==='public', steps=[];
  const S=(when,title,text)=>steps.push({when,title,text});
  const MD=pub?'Mise en demeure en recommandé (vaut réclamation préalable)':'Mise en demeure en recommandé avec accusé de réception';
  const REC=f.rec.label, DOS='Dossier complet : devis, réception, facture, relances, accusé de réception.';
  if(L==='avant'){
    if(-f.daysLate>7) S(addDays(f.due,-5),'Rappel courtois','Cinq jours avant l\'échéance : copie de la facture et RIB, sans pression.');
    else S(f.now,'Rappel courtois','Copie de la facture et RIB, en rappelant la date d\'échéance. C\'est le mail ci-dessous.');
    S(f.due,'Échéance','Vérifiez le règlement le soir même.');
    S(addDays(f.due,3),'Rappel cordial','Si rien n\'est arrivé : premier message, hypothèse de l\'oubli.');
    S(addDays(f.due,12),'Relance ferme','Montant, jours de retard, pénalités, date limite.');
  }else if(L==='cordial'){
    S(f.now,'Rappel cordial',f.relation==='recurrent'?'Un appel d\'abord, le mail ensuite pour laisser une trace.':'Le mail ci-dessous. Court, factuel, sans pénalités.');
    S(d(5),'Appel téléphonique','Trois phrases : la facture, la date, « qu\'est-ce qui empêche le règlement ? »');
    S(d(10),'Relance ferme','Pénalités chiffrées, date limite à huit jours, annonce de la suite.');
    S(d(25),MD,'Dernière étape amiable : détail des sommes, délai de huit jours.');
    S(d(45),REC,DOS);
  }else if(L==='ferme'){
    S(f.now,'Relance ferme',f.relation==='recurrent'?'Appelez avant d\'envoyer le mail : avec un donneur d\'ordre régulier, l\'écrit confirme, il n\'annonce pas.':'Le mail ci-dessous, avec la date limite du '+fmtD(f.deadline)+'.');
    S(d(2),'Appel téléphonique','Confirmez la réception du mail et obtenez une date de règlement.');
    S(f.deadline,'Date limite','Sans règlement ni réponse, passez à l\'étape suivante sans attendre.');
    S(d(12),MD,'Dernière étape amiable.');
    S(d(32),REC,DOS);
  }else if(L==='md'){
    S(f.now,MD,'Le courrier ci-dessous, envoyé en recommandé. Gardez la preuve de dépôt et l\'accusé de réception.');
    S(d(3),'Appel téléphonique','Prévenez que le courrier arrive : cela débloque souvent avant même sa réception.');
    S(d(10),'Fin du délai de huit jours','Compté à partir de la réception du courrier.');
    S(d(20),REC,DOS);
  }else if(L==='recours'){
    S(f.now,'Dernier message au client','Le mail ci-dessous : le dossier part, sans nouvel avis.');
    S(d(2),REC,DOS);
    if(pub) S(d(60),'Audience de référé','Le juge peut accorder une provision si la créance n\'est pas sérieusement contestable.');
    else S(d(30),'Ordonnance ou titre exécutoire','Signifiée par un commissaire de justice ; le débiteur a un mois pour s\'opposer.');
  }else if(L==='visa'){
    S(f.now,'Mail au maître d\'œuvre','Demande de date de visa, maître d\'ouvrage en copie. C\'est le mail ci-dessous.');
    S(d(5),'Appel au maître d\'œuvre','Quantités à justifier ? Pièce manquante ? Obtenez ce qui bloque, et une date.');
    S(d(12),'Relance du maître d\'ouvrage',pub?'Le délai de 30 jours court depuis le dépôt : les intérêts moratoires sont dus quoi qu\'il arrive.':'Rappelez que le contrat fixe un délai de paiement, visa ou pas.');
    S(d(30),MD,'Si la situation n\'est toujours pas réglée.');
  }else if(L==='litige'){
    S(f.now,'Demande écrite des points contestés','Montants et motifs, par mail. Proposez le règlement immédiat de la partie non contestée.');
    S(d(7),'Rendez-vous ou visite','Sur le chantier s\'il s\'agit de réserves ou de quantités.');
    S(d(15),'Proposition écrite de règlement','Avoir partiel, levée des réserves datée, ou maintien de la facture avec justificatifs.');
    S(d(30),'Mise en demeure sur la partie non contestée','Le litige ne suspend pas le reste.');
    S(d(50),REC,DOS);
  }else if(L==='echeancier'){
    S(f.now,'Vérifier le BODACC','Si le client est en procédure collective, déclarez la créance au mandataire sous deux mois.');
    S(f.now,'Appel, puis mail d\'échéancier','Trois versements proposés, pénalités suspendues si l\'échéancier est respecté.');
    S(d(5),'Échéancier signé','Un accord écrit, même par mail, vaut reconnaissance de dette.');
    S(d(30),'Premier versement','À la date convenue. Vérifiez le jour même.');
    S(d(31),'Si une échéance manque','Le solde total redevient exigible : mise en demeure immédiate.');
  }
  return steps;
}

/* ——— messages types (affichés tout de suite, remplacés par la version IA si elle arrive) ——— */
function templates(f){
  const p=f.personal, co=p.company||'[Votre entreprise]';
  const hi=p.contact?`Bonjour ${p.contact},`:'Bonjour,';
  const noun=TYPE_NOUN[f.type], ref=p.ref?` n° ${p.ref}`:'';
  const inv=`${noun}${ref} du ${fmtD(f.date)}`, invS=`${noun}${ref}`, subj=`${TYPE_SHORT[f.type]}${ref}`;
  const works=p.works?` pour ${p.works}`:'';
  const amt=eur(f.amount), pub=f.client==='public', part=f.client==='particulier';
  const sig=`Cordialement,\n[Prénom Nom]\n${co}`;
  const days=`${f.daysLate} jour${f.daysLate>1?'s':''}`;
  const legal=pub?'article R2192-31 du Code de la commande publique':'article L441-10 du Code de commerce';
  const penLine=f.penalties>0?`${eur(f.penalties)} de pénalités de retard (${pct(f.rate)} l'an, du ${fmtD(f.due)} au ${fmtD(f.now)})`:'';
  const indLine=f.indemnity?`${eur(f.indemnity)} d'indemnité forfaitaire pour frais de recouvrement`:'';
  const sommes=[`${amt} au titre de ${invS}`,penLine,indLine].filter(Boolean).map(s=>`- ${s} ;`).join('\n');
  let objet,mail,sms,appel;
  switch(f.level){
    case 'avant':
      objet=`${subj} : échéance le ${fmtD(f.due)}`;
      mail=`${hi}\n\nPetit rappel : ${inv}${works}, d'un montant de ${amt} TTC, arrive à échéance le ${fmtD(f.due)}. Vous trouverez ci-joint une copie ainsi que notre RIB.\n\nSi une question se pose sur un poste, je suis joignable au [téléphone].\n\nBonne journée,\n[Prénom Nom]\n${co}`;
      sms=`${co} : ${invS} de ${amt} arrive à échéance le ${fmtD(f.due)}. Copie et RIB envoyés par mail. Bonne journée.`;
      appel=['Rappeler que la facture arrive à échéance le '+fmtD(f.due)+'.','Vérifier qu\'elle est bien arrivée au bon service et qu\'elle est validée.','Demander si une pièce manque pour le règlement.','Confirmer la date de règlement prévue.'];
      break;
    case 'cordial':
      objet=`${subj} du ${fmtD(f.date)} : règlement en attente ?`;
      mail=`${hi}\n\nSauf erreur de notre part, ${inv}${works}, d'un montant de ${amt} TTC, n'a pas encore été réglée. Son échéance était le ${fmtD(f.due)}.\n\nIl s'agit peut-être d'un simple oubli, ou d'un règlement qui a croisé ce message : dans ce cas, merci de ne pas en tenir compte.\n\nSinon, je vous remercie de procéder au règlement dans les prochains jours, ou de me dire si quelque chose bloque de votre côté. Je peux vous appeler quand cela vous arrange.\n\n${f.relation==='recurrent'?'Merci pour votre confiance sur nos chantiers en cours.\n\n':''}${sig}`;
      sms=`${co} : sauf erreur, ${invS} de ${amt} (échéance ${fmtD(f.due)}) n'est pas encore réglée. Un oubli ? Merci de me confirmer la date du règlement. Bonne journée.`;
      appel=['« Je vous appelle au sujet de '+inv+', '+amt+', échue le '+fmtD(f.due)+'. »','« Est-ce qu\'elle est bien arrivée chez vous et validée ? »','Si oui : « Quand peut-on compter sur le règlement ? » Obtenir une date précise.','Si quelque chose bloque : noter quoi, et proposer de l\'envoyer par écrit.','Conclure : « Je vous confirme tout ça par mail. »'];
      break;
    case 'ferme':
      objet=`${subj} : ${amt} en retard de ${days}`;
      mail=`${hi}\n\nMalgré notre précédent message, ${inv}${works}, d'un montant de ${amt} TTC, reste impayée ${days} après son échéance du ${fmtD(f.due)}.\n\n${part
        ?(f.penalties>0?`Conformément à notre devis, ce retard entraîne des pénalités de ${pct(f.rate)} l'an, soit ${eur(f.penalties)} à ce jour. `:'')+`Je vous remercie de régulariser la situation avant le ${fmtD(f.deadline)}. Si une difficulté empêche le règlement, dites-le-moi : on trouve toujours une solution, à condition d'en parler.`
        :`Conformément à l'${legal}, ce retard entraîne des pénalités de retard au taux de ${pct(f.rate)} l'an (${eur(f.penalties)} à ce jour) et une indemnité forfaitaire de 40 € pour frais de recouvrement, soit un total de ${eur(f.total)}.\n\nNous sommes prêts à y renoncer si le règlement de ${amt} nous parvient avant le ${fmtD(f.deadline)}.`}\n\nSans règlement ni réponse à cette date, nous engagerons une procédure de recouvrement, ce que nous préférerions éviter.\n\n${sig}`;
      sms=`${co} : ${invS} de ${amt} est impayée depuis ${days}. Merci de régulariser avant le ${fmtD(f.deadline)}${f.penalties>0?` (pénalités à ce jour : ${eur(f.penalties)})`:''}, sans quoi nous engagerons un recouvrement. Joignable au [téléphone].`;
      appel=['« Je vous appelle pour '+inv+' : '+amt+', '+days+' de retard, malgré notre relance. »','« Qu\'est-ce qui empêche le règlement aujourd\'hui ? » Laisser répondre.',(part?'Rappeler la date limite du '+fmtD(f.deadline)+'.':'« Les pénalités et l\'indemnité de 40 € s\'élèvent à '+eur(f.penalties+f.indemnity)+'. Nous y renonçons si le règlement arrive avant le '+fmtD(f.deadline)+'. »'),'Obtenir une date et un mode de règlement (virement, chèque, date de passage en paiement).','« Sans règlement à cette date, le dossier passe en mise en demeure. Je vous confirme tout par mail. »'];
      break;
    case 'md':
      objet=`Mise en demeure de payer : ${subj.toLowerCase()} (${amt} TTC)`;
      mail=`${co}\n[Adresse]\n\n${p.contact||'[Nom du client]'}\n[Adresse]\n\nLettre recommandée avec accusé de réception\n\nObjet : mise en demeure de payer\n\n${fmtD(f.now)}\n\nMadame, Monsieur,\n\nMalgré nos relances, ${inv}${works}, d'un montant de ${amt} TTC, échue le ${fmtD(f.due)}, demeure impayée à ce jour.\n\nPar la présente, nous vous mettons en demeure de nous régler ${f.total>f.amount?`la somme de ${eur(f.total)}, soit :\n${sommes}`:`la somme de ${amt}`}\n\nsous huit jours à compter de la réception de ce courrier.\n\n${part&&f.penalties===0?'À défaut, cette somme portera intérêts au taux légal à compter de la réception de la présente, conformément à l\'article 1231-6 du Code civil, et nous ':'À défaut de règlement dans ce délai, nous '}${pub?'saisirons le tribunal administratif d\'un référé-provision':f.amount<5000?'confierons le recouvrement à un commissaire de justice':'solliciterons une injonction de payer'}, sans nouvel avis. Les frais de procédure seront à votre charge.\n\nNous restons disponibles pour tout échange d'ici là.\n\n[Prénom Nom]\n${co}`;
      sms=`${co} : une mise en demeure concernant ${invS} (${amt}) vous est adressée ce jour en recommandé. Règlement sous huit jours, sans quoi le dossier sera transmis pour recouvrement. Joignable au [téléphone].`;
      appel=['Prévenir : « Une mise en demeure part aujourd\'hui en recommandé pour '+invS+', '+amt+'. »','« Je préférerais qu\'on règle ça avant : qu\'est-ce qui bloque ? »','Si une date de règlement est proposée sous huit jours : l\'accepter, la confirmer par mail, maintenir l\'envoi du courrier.','Ne pas négocier le montant au téléphone : « Tout est détaillé dans le courrier. »','Conclure sur la suite : « Passé ce délai, le dossier est transmis. »'];
      break;
    case 'recours':
      objet=`${subj} : transmission du dossier pour recouvrement`;
      mail=`${hi}\n\nNotre mise en demeure concernant ${inv}${works}, d'un montant de ${amt} TTC, est restée sans effet.\n\nLe dossier est transmis ce jour ${pub?'au tribunal administratif (référé-provision)':f.amount<5000?'à un commissaire de justice':'au greffe pour une injonction de payer'}. Le montant réclamé s'élève à ${eur(f.total)}, frais de procédure en sus.\n\nUn règlement de ${eur(f.total)} reçu avant la fin de la semaine mettrait fin à la procédure.\n\n${sig}`;
      sms=`${co} : sans règlement de ${eur(f.total)} (${invS}) d'ici la fin de la semaine, le dossier est transmis pour recouvrement, frais en sus.`;
      appel=['« Je vous informe que le dossier '+invS+' est transmis pour recouvrement. »','« Un règlement de '+eur(f.total)+' avant la fin de la semaine arrête la procédure. »','Ne plus discuter du bien-fondé : « Tout est dans la mise en demeure. »','Noter la réponse et la date, puis transmettre.'];
      break;
    case 'visa':
      objet=`${subj} du ${fmtD(f.date)} : demande de visa`;
      mail=`${hi}\n\nNotre ${noun.replace(/^la /,'')}${ref}${works}, d'un montant de ${amt} TTC, vous a été transmise le ${fmtD(f.date)} et n'a pas encore été visée.\n\n${pub?'Le délai de paiement de 30 jours court depuis cette date. ':''}Pourriez-vous me confirmer sa date de visa et de transmission au maître d'ouvrage, ou m'indiquer ce qui en empêche la validation (quantités, pièces jointes, attachements) ?\n\nJe reste disponible pour toute précision, sur le chantier ou par téléphone.\n\n${sig}\n\nCopie : [maître d'ouvrage]`;
      sms=`${co} : notre ${noun.replace(/^la /,'')}${ref} du ${fmtD(f.date)} (${amt}) attend votre visa. Pouvez-vous me donner une date, ou me dire ce qui bloque ? Merci.`;
      appel=['« Je vous appelle pour '+inv+' : elle n\'est pas encore visée. »','« Est-ce qu\'un point bloque : quantités, attachements, pièce manquante ? »','Obtenir une date de visa et de transmission au maître d\'ouvrage.',pub?'Rappeler que le délai de paiement court depuis le dépôt.':'Rappeler le délai de paiement prévu au contrat.','« Je vous envoie un mail de confirmation, maître d\'ouvrage en copie. »'];
      break;
    case 'litige':
      objet=`${subj} : vos remarques`;
      mail=`${hi}\n\nVous nous avez indiqué ne pas être d'accord avec ${inv}${works}, d'un montant de ${amt} TTC. Pour avancer, pourriez-vous me préciser par écrit les points contestés et les montants concernés ?\n\nDans l'attente, je vous propose de régler dès maintenant la partie qui ne fait pas débat, et de fixer un rendez-vous cette semaine, sur place si nécessaire, pour le reste.\n\n${sig}`;
      sms=`${co} : concernant ${invS} (${amt}), pouvez-vous me préciser par écrit les points contestés ? Je vous propose de régler la partie non contestée dès maintenant et de voir le reste ensemble cette semaine.`;
      appel=['« Vous m\'avez dit ne pas être d\'accord avec '+invS+' : sur quels points, et pour quels montants ? » Noter sans discuter.','« Je vous propose de régler tout de suite la partie non contestée : '+'[montant]'+'. »','Fixer un rendez-vous, sur le chantier si c\'est une question de réserves ou de quantités.','« Je vous confirme par mail les points à traiter et la date. »'];
      break;
    case 'echeancier':{
      const third=eur(r2(f.amount/3));
      objet=`${subj} : proposition d'échéancier`;
      mail=`${hi}\n\nSuite à notre échange, je comprends que le règlement de ${inv}${works}, d'un montant de ${amt} TTC, est difficile en une fois.\n\nJe vous propose l'échéancier suivant : trois versements de ${third}, le ${fmtD(addDays(f.now,7))}, le ${fmtD(addDays(f.now,37))} et le ${fmtD(addDays(f.now,67))}.\n\nSi cet échéancier est respecté, nous renonçons aux pénalités de retard. En cas d'échéance manquée, la totalité du solde redeviendra exigible immédiatement.\n\nMerci de me confirmer votre accord par retour de mail.\n\n${sig}`;
      sms=`${co} : comme convenu, je vous envoie par mail un échéancier en trois versements pour ${invS} (${amt}). Merci de me confirmer votre accord par retour.`;
      appel=['« Je vous appelle pour trouver une solution sur '+invS+', '+amt+'. »','« Qu\'est-ce que vous pouvez régler aujourd\'hui, et à quelle date pour le reste ? »','Proposer trois versements, le premier sous une semaine.','« Si l\'échéancier est tenu, nous ne comptons pas de pénalités. »','« Je vous l\'envoie par mail, répondez-moi simplement “accord”. »'];
      break;}
  }
  return {objet,mail,sms,appel};
}
const capital=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ——— rendu ——— */
let current=0, msgs=null;
function render(f){
  const L=LEVELS[f.level], steps=calendar(f), rec=f.rec;
  const lines=[`<li><span>${esc(capital(TYPE_NOUN[f.type]))}</span><b>${eur(f.amount)}</b></li>`];
  if(f.late){
    if(f.penalties>0) lines.push(`<li><span>Pénalités de retard : ${pct(f.rate)} l'an, ${f.daysLate} jour${f.daysLate>1?'s':''}</span><b>${eur(f.penalties)}</b></li>`);
    else lines.push(`<li><span>${f.client==='particulier'?'Pénalités : aucune clause au devis':'Pénalités de retard'}</span><b>0 €</b></li>`);
    lines.push(`<li><span>Indemnité forfaitaire de recouvrement${f.client==='particulier'?' : ne s\'applique pas aux particuliers':''}</span><b>${eur(f.indemnity)}</b></li>`);
  }
  const legal=!f.late?'Aucune pénalité ne court avant l\'échéance.'
    :f.client==='public'?`Intérêts moratoires au taux BCE + 8 points et indemnité de 40 €, dus de plein droit (art. R2192-31 et suivants du Code de la commande publique). Calcul sur le TTC, base 365 jours.`
    :f.client==='pro'?`Pénalités exigibles sans rappel dès le lendemain de l'échéance, indemnité de 40 € par facture (art. L441-10 et D441-5 du Code de commerce). Calcul sur le TTC, base 365 jours.`
    :f.penalties>0?`Pénalités prévues au devis signé, calculées sur le TTC, base 365 jours. Pas d'indemnité forfaitaire pour un particulier.`
    :`Sans clause au devis, les intérêts au taux légal (${pct(RATES.legalPro)}) ne courent qu'à compter de la mise en demeure (art. 1231-6 du Code civil). Pas d'indemnité forfaitaire pour un particulier.`;
  const warn=f.warnMin?`<div class="ri-warn">Le taux saisi (${pct(f.rate)}) est inférieur au minimum légal entre professionnels, trois fois le taux d'intérêt légal, soit ${pct(MIN_PRO)}. Une clause en dessous est réputée non écrite.</div>`:'';
  const stepsHtml=steps.map((s,i)=>{const isNow=s.when.getTime()===f.now.getTime();return `<li${isNow?' class="now"':''}><time datetime="${iso(s.when)}">${isNow?'Aujourd\'hui':esc(fmtDs(s.when))}<small>${isNow?esc(fmtDs(s.when)):'J+'+Math.round((s.when-f.now)/DAY)}</small></time><div><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div></li>`}).join('');
  out.innerHTML=`<div class="ri-cards">
    <section class="ri-card ri-level">
      <span class="k">Où vous en êtes</span>
      <h3><span class="ri-badge ${L.cls}">${L.n==='!'?'Cas particulier':'Niveau '+L.n}</span>${esc(L.name)}</h3>
      <p>${esc(L.why(f))}</p>
    </section>
    <section class="ri-card ri-amount">
      <span class="k">${f.late?'Ce que vous pouvez réclamer aujourd\'hui':'Montant de la facture'}</span>
      <div class="ri-total"><b>${eur(f.total)}</b><small>${f.late?`au ${fmtD(f.now)}, ${f.daysLate} jour${f.daysLate>1?'s':''} de retard`:`échéance le ${fmtD(f.due)}`}</small></div>
      <ul class="ri-lines">${lines.join('')}</ul>
      <p class="ri-legal">${esc(legal)}</p>${warn}
    </section>
    <section class="ri-card ri-msgs">
      <span class="k">${f.level==='md'?'Le courrier, le SMS, l\'appel':'Le mail, le SMS, l\'appel'}</span>
      <div class="ri-tabs" role="tablist"><button type="button" class="on" data-pane="mail">${f.level==='md'?'Courrier recommandé':'Mail'}</button><button type="button" data-pane="sms">SMS</button><button type="button" data-pane="appel">Script d'appel</button></div>
      <div class="ri-status" id="ri-status"></div>
      <div id="ri-panes"></div>
    </section>
    <section class="ri-card ri-cal">
      <span class="k">Les prochaines étapes</span>
      <ol class="ri-steps">${stepsHtml}</ol>
    </section>
    <section class="ri-card ri-rec">
      <span class="k">Si rien ne bouge</span>
      <h3>${esc(rec.label)}</h3>
      <p style="margin-top:10px">${esc(rec.text)}</p>
      ${rec.notes.map(n=>`<p style="margin-top:10px">${esc(n)}</p>`).join('')}
      <h4>Le dossier à réunir</h4>
      <ul>${rec.dossier.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <div class="ri-presc"><b>Prescription :</b> ${esc(f.prescLabel)}, soit jusqu'au ${fmtD(f.presc)}. Passé cette date, la créance n'est plus recouvrable en justice.</div>
    </section>
  </div>`;
  out.querySelectorAll('.ri-tabs button').forEach(b=>b.addEventListener('click',()=>{
    out.querySelectorAll('.ri-tabs button').forEach(x=>x.classList.toggle('on',x===b));
    out.querySelectorAll('.ri-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===b.dataset.pane));
  }));
}

function renderMessages(m,source){
  msgs=m;
  const panes=$('ri-panes'); if(!panes) return;
  const active=(out.querySelector('.ri-tabs button.on')||{}).dataset?.pane||'mail';
  const pane=(key,inner,copyText,note)=>`<div class="ri-pane${active===key?' on':''}" data-pane="${key}">${inner}<div class="ri-msg-foot"><small>${esc(note)}</small><button type="button" class="ri-copy" data-copy="${esc(copyText)}">Copier</button></div></div>`;
  const appelList=`<div class="ri-msg only"><ol>${m.appel.map(a=>`<li>${esc(a)}</li>`).join('')}</ol></div>`;
  panes.innerHTML=
    pane('mail',`<div class="ri-subject">Objet : ${esc(m.objet)}</div><pre class="ri-msg">${esc(m.mail)}</pre>`,`Objet : ${m.objet}\n\n${m.mail}`,'Relisez les crochets avant d\'envoyer.')+
    pane('sms',`<pre class="ri-msg only">${esc(m.sms)}</pre>`,m.sms,`${m.sms.length} caractères.`)+
    pane('appel',appelList,m.appel.map((a,i)=>`${i+1}. ${a}`).join('\n'),'À garder sous les yeux pendant l\'appel.');
  panes.querySelectorAll('.ri-copy').forEach(b=>b.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent='Copié ✓';b.classList.add('ok');setTimeout(()=>{b.textContent='Copier';b.classList.remove('ok')},1800)}
    catch{b.textContent='Sélectionnez le texte'}
  }));
  void source;
}
function status(cls,text){const s=$('ri-status');if(!s)return;s.className='ri-status'+(cls?' '+cls:'');s.textContent=text}

/* ——— personnalisation par l'IA ——— */
function payload(f){
  return {client:f.client,type:f.type,relation:f.relation,done:f.done,situation:f.situation,amount:f.amount,date:iso(f.date),due:iso(f.due),
    daysLate:f.daysLate,rate:f.rate,penalties:f.penalties,indemnity:f.indemnity,total:f.total,level:f.level,deadline:iso(f.deadline),
    recours:f.rec.label,personal:f.personal};
}
async function personalize(f,token){
  status('busy','Personnalisation des messages en cours…');
  const ctrl=new AbortController(), timer=setTimeout(()=>ctrl.abort(),45000);
  try{
    const res=await fetch('/api/outils/relance-impayes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload(f)),signal:ctrl.signal});
    if(token!==current) return;
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data=await res.json();
    if(token!==current) return;
    if(!data||typeof data.mail!=='string'||!Array.isArray(data.appel)) throw new Error('réponse incomplète');
    renderMessages(data,'ai');
    status('ai','Messages personnalisés pour votre dossier');
  }catch{
    if(token!==current) return;
    status('','Modèles standard (personnalisation indisponible pour le moment)');
  }finally{clearTimeout(timer)}
}

/* ——— soumission ——— */
form.addEventListener('submit',e=>{
  e.preventDefault();
  const err=$('ri-err'); err.hidden=true;
  const amount=parseFloat(String($('ri-amount').value).replace(',','.'));
  const date=parse($('ri-date').value), due=parse($('ri-due').value);
  const problems=[];
  $('ri-amount').setAttribute('aria-invalid',String(!(amount>0)));
  $('ri-date').setAttribute('aria-invalid',String(!date));
  $('ri-due').setAttribute('aria-invalid',String(!due));
  if(!(amount>0)) problems.push('le montant TTC');
  if(!date) problems.push('la date de facture');
  if(!due) problems.push('la date d\'échéance');
  if(problems.length){err.textContent='Il manque '+problems.join(', ')+'.';err.hidden=false;return}
  const f=compute();
  current++; const token=current;
  render(f);
  renderMessages(templates(f),'template');
  rendered=true; $('ri-go').innerHTML='Préparer ma relance <span class="arw">→</span>';
  if(innerWidth<980) out.scrollIntoView({behavior:'smooth',block:'start'});
  personalize(f,token);
});
})();
