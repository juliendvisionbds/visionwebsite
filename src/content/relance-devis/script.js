

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
   OUTIL — RELANCE DE DEVIS
   Calendrier et choix du message dans le navigateur ; messages types instantanés,
   puis version personnalisée par l'IA (POST /api/outils/relance-devis).
   ============================================================ */
(()=>{
const form=document.getElementById('rd-form'); if(!form) return;
const $=id=>document.getElementById(id);
const out=$('rd-out');

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

const DAY=86400000;
const pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;const d=new Date(+m[1],+m[2]-1,+m[3]);return isNaN(d)?null:d};
const addDays=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
const fmtD=d=>d.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}).replace(/^1 /,'1er ');
const fmtDs=d=>d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'});
const eur=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const today=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const radio=name=>form.querySelector(`input[name="${name}"]:checked`).value;
const dayDiff=(a,b)=>Math.round((a-b)/DAY);

let rendered=false;
const touched=()=>{if(rendered)$('rd-go').innerHTML='Mettre à jour la relance <span class="arw">→</span>'};
form.addEventListener('input',touched);form.addEventListener('change',touched);
$('rd-sent').value=iso(addDays(today(),-8));

/* ——— calendrier par type de client (article « Relance de devis BTP ») ——— */
const CAL={petit:[2,7,14,21],gros:[3,10,21,35],pro:[3,10,21,35]};
const CLIENT_LABEL={petit:'petit chantier de particulier',gros:'projet important de particulier',pro:'client professionnel'};
const DONE_LABEL={0:'aucune relance',1:'une relance',2:'deux relances',3:'trois relances ou plus'};

function compute(){
  const client=radio('rd-client'), tone=radio('rd-tone');
  const works=$('rd-works').value.trim(), said=$('rd-said').value.trim();
  const amountIn=parseFloat(String($('rd-amount').value).replace(',','.')); const amount=amountIn>0?amountIn:null;
  const sent=parse($('rd-sent').value), decision=parse($('rd-decision').value), valid=parse($('rd-valid').value);
  const situation=$('rd-situation').value, done=Math.min(3,parseInt($('rd-done').value,10)||0);
  const now=today(), days=dayDiff(now,sent);
  let cal=CAL[client].slice();
  if(client==='pro'&&decision){const dd=dayDiff(decision,sent);cal=[3,Math.max(4,dd-2),Math.max(5,dd+1),Math.max(6,dd+14)]}
  let kind;
  if(situation==='question') kind='reponse';
  else if(situation==='prix') kind='prix';
  else if(situation==='reporte') kind='reporte';
  else if(done>=3) kind='cloture';
  else if(done===2) kind='last';
  else if(done===1) kind='info';
  else kind=situation==='recu'?'info':'reception';
  const seq=['reception','info','last','cloture'].includes(kind);
  const idx=kind==='info'&&done===0?1:Math.min(done,3);
  const targetDate=addDays(sent,cal[idx]);
  const early=seq&&days<cal[idx];
  // Si on est en retard sur le calendrier, les étapes suivantes se recalent à partir d'aujourd'hui, en gardant les mêmes écarts.
  const base=early||!seq?sent:(days>cal[idx]?addDays(now,-cal[idx]):sent);
  const closeDate=addDays(base,cal[3]);
  const next= kind==='cloture'?null
    : kind==='reporte'?(valid&&valid>now?valid:addDays(now,45))
    : kind==='reponse'?addDays(now,2)
    : kind==='prix'?addDays(now,2)
    : idx<3?addDays(base,cal[idx+1]):null;
  return {client,tone,works,said,amount,sent,decision,valid,situation,done,now,days,cal,kind,idx,targetDate,early,base,closeDate,next,
    personal:{company:$('rd-company').value.trim(),contact:$('rd-contact').value.trim()}};
}

/* ——— niveaux ——— */
const timing=f=>{
  if(!['reception','info','last','cloture'].includes(f.kind)) return '';
  const t=f.cal[f.idx];
  if(f.early) return ` Un peu tôt : pour un ${CLIENT_LABEL[f.client]}, cette relance se fait vers J+${t}, soit le ${fmtD(f.targetDate)}. Préparez-la, envoyez-la ce jour-là.`;
  if(f.days>t+7) return ` Vous êtes au-delà de la fenêtre habituelle (J+${t}) : envoyez-la aujourd'hui, sans vous excuser du délai.`;
  return ' C\'est le bon moment.';
};
const LEVELS={
  reception:{n:'Relance 1',cls:'l1',name:'Vérifier la réception',why:f=>`J+${f.days}, ${DONE_LABEL[f.done]}. On ne demande pas une décision : on vérifie que le devis est arrivé et qu'il est clair, et on propose d'expliquer un poste si besoin.${timing(f)}`},
  info:{n:'Relance 2',cls:'l2',name:'Apporter une information utile',why:f=>`J+${f.days}, ${DONE_LABEL[f.done]}${f.situation==='recu'?', le client a accusé réception':''}. On ne relance pas « pour relancer » : une disponibilité de démarrage, une contrainte de calendrier ou la validité du devis, puis une question simple sur l'avancement.${timing(f)}`},
  last:{n:'Relance 3',cls:'l3',name:'Dernier message avant clôture',why:f=>`J+${f.days}, ${DONE_LABEL[f.done]}. ${f.client==='petit'?'Un message court qui propose un appel et annonce la clôture.':'Sur un projet de cette taille, l\'appel vaut mieux que l\'écrit : le message propose un créneau, le script d\'appel fait le reste.'}${timing(f)}`},
  cloture:{n:'Clôture',cls:'l4',name:'Classer proprement',why:f=>`J+${f.days}, ${DONE_LABEL[f.done]}. Insister davantage n'apporte plus rien. Le message de clôture obtient souvent une réponse : soit le projet repart, soit vous apprenez pourquoi il est perdu.`},
  reponse:{n:'Pas de relance',cls:'lx',name:'Répondre, vite',why:f=>`Le client a posé une question ou demandé une modification : la séquence de relance s'arrête, une personne reprend la main. On répond dans la journée${f.said?` sur « ${f.said} »`:''}, et on propose un appel court.`},
  prix:{n:'Objection',cls:'lx',name:'Comprendre avant de remiser',why:f=>`Le client hésite sur le prix. Le réflexe de la remise immédiate est rarement le bon : on cherche d'abord ce qui est comparé, un poste, un autre devis, un budget. Un écart de prix cache souvent un écart de périmètre.`},
  reporte:{n:'Reporté',cls:'lx',name:'Fixer la reprise de contact',why:f=>`Le projet est décalé. On accuse réception sans insister, on fixe une date de reprise de contact (${fmtD(f.next)}) et on rappelle la validité du devis. Un projet reporté sans date de reprise est un projet perdu.`},
};

/* ——— la suite ——— */
function steps(f){
  const S=[], add=(when,title,text)=>S.push({when,title,text});
  const r=i=>addDays(f.base,f.cal[i]);
  const call=f.client!=='petit'?' Sur ce projet, l\'appel vaut mieux que l\'écrit.':'';
  if(f.kind==='reception'){
    add(f.early?f.targetDate:f.now,'Vérifier la réception','Le mail ci-dessous.');
    add(r(1),'Relance 2 : une information utile','Disponibilité de démarrage, validité du devis, puis une question simple.');
    add(r(2),'Relance 3 : dernier message'+(f.client!=='petit'?' et appel':''),'Proposer un créneau, annoncer la clôture.'+call);
    add(r(3),'Clôture','Classer proprement, demander le motif.');
  }else if(f.kind==='info'){
    add(f.early?f.targetDate:f.now,'Relance 2 : une information utile','Le mail ci-dessous.');
    add(r(2),'Relance 3 : dernier message'+(f.client!=='petit'?' et appel':''),'Proposer un créneau, annoncer la clôture.'+call);
    add(r(3),'Clôture','Classer proprement, demander le motif.');
  }else if(f.kind==='last'){
    add(f.early?f.targetDate:f.now,'Dernier message'+(f.client!=='petit'?', puis appel':''),'Le mail ci-dessous'+(f.client!=='petit'?', et le script d\'appel deux jours plus tard.':'.'));
    add(f.closeDate,'Clôture','Classer proprement, demander le motif.');
  }else if(f.kind==='cloture'){
    add(f.now,'Clôture','Le mail ci-dessous. Ensuite, on n\'écrit plus.');
    add(addDays(f.now,7),'Noter le motif','Réponse ou silence : le motif de perte va dans le suivi, il dit beaucoup sur vos prix et vos délais.');
  }else if(f.kind==='reponse'){
    add(f.now,'Répondre','Le mail ci-dessous, dans la journée. Devis mis à jour en pièce jointe s\'il a demandé une modification.');
    add(f.next,'Appel si pas de retour','Trois questions : le devis est-il clair, où en est la décision, quand rappeler ?');
    add(addDays(f.next,8),'Reprise du calendrier','Si le silence revient, relance avec une information utile.');
  }else if(f.kind==='prix'){
    add(f.now,'Comprendre ce qui est comparé','Le mail ci-dessous : pas de remise, une question.');
    add(f.next,'Appel de dix minutes','Vérifier le périmètre de l\'autre devis : évacuation, liaison avec l\'existant, protections, nettoyage.');
    add(addDays(f.now,10),'Variante ou phasage par écrit','Selon ce qui ressort de l\'appel : préciser ce qui est compris, proposer une variante, phaser.');
    add(addDays(f.now,21),'Clôture','Si rien ne bouge malgré la variante.');
  }else if(f.kind==='reporte'){
    add(f.now,'Accuser réception','Le mail ci-dessous, sans insister.');
    add(f.next,'Reprise de contact','Noter la date dans le suivi dès aujourd\'hui.');
    if(f.valid) add(f.valid,'Fin de validité du devis','Au-delà, devis mis à jour avec les prix du moment : une raison légitime de reprendre contact.');
  }
  return S;
}

/* ——— messages types (affichés tout de suite, remplacés par la version IA si elle arrive) ——— */
function templates(f){
  const p=f.personal, co=p.company||'[Votre entreprise]';
  const hi=(p.contact?`Bonjour ${p.contact},`:'Bonjour,')+(f.tone==='chaleureux'?' J\'espère que vous allez bien.':'');
  const bye=f.tone==='direct'?'Cordialement,':f.tone==='chaleureux'?'À très vite,':'Bonne journée,';
  const sig=`${bye}\n[Prénom Nom]\n${co}`;
  const w=f.works||'[type de travaux]', W=w.charAt(0).toUpperCase()+w.slice(1);
  const d=fmtD(f.sent), validTxt=f.valid?` Notre devis reste valable jusqu'au ${fmtD(f.valid)}.`:'';
  let objet,mail,sms,appel;
  switch(f.kind){
    case 'reception':
      objet=`Votre devis pour ${w} : bien reçu ?`;
      mail=`${hi}\n\nJe vous ai envoyé le ${d} notre devis pour ${w}. Je voulais m'assurer qu'il vous est bien parvenu et qu'il est clair.\n\nSi un poste mérite une explication, je peux vous appeler quand cela vous arrange.\n\n${sig}`;
      sms=`${co} : notre devis pour ${w} vous est-il bien parvenu ? Si un point mérite une explication, je vous appelle quand vous voulez.`;
      appel=['« Je vous appelle au sujet du devis pour '+w+', envoyé le '+d+' : vous l\'avez bien reçu ? »','« Est-ce qu\'un poste mérite une explication ? »','« À quelle date pensez-vous prendre votre décision ? » Noter la date.','« Je vous rappelle à ce moment-là, sauf si vous avez une question avant. »'];
      break;
    case 'info':
      objet=`${W} : nos disponibilités`;
      mail=`${hi}\n\nJe reviens vers vous au sujet de notre devis du ${d} pour ${w}. Pour information, nous pouvons démarrer [date de démarrage possible] ; au-delà, nos plannings se remplissent vite.${validTxt}\n\nOù en êtes-vous dans votre décision ? Si un point reste à trancher, un appel de dix minutes suffit souvent.\n\n${sig}`;
      sms=`${co} : nous pouvons démarrer ${w} [date de démarrage possible]. Où en êtes-vous dans votre décision ? Un appel de dix minutes si un point reste à trancher.`;
      appel=['« Avez-vous pu regarder le devis pour '+w+' ? Est-ce qu\'un point mérite une explication ? »','« Où en êtes-vous dans votre décision, et qu\'est-ce qui reste à trancher ? »','Apporter l\'information utile : « Nous pourrions démarrer [date]. »','« Quand puis-je vous rappeler, ou quand pensez-vous décider ? » Noter la date.'];
      break;
    case 'last':
      objet=`${W} : un appel de dix minutes ?`;
      mail=`${hi}\n\nNous n'avons pas eu de retour sur notre devis du ${d} pour ${w}. Pour ne pas vous solliciter inutilement, je vous propose un appel de dix minutes [jour, créneau] pour faire le point : où en est votre décision, et qu'est-ce qui reste à trancher ?\n\nSans nouvelles d'ici le ${fmtD(f.closeDate)}, je classerai le dossier, sans problème.${validTxt}\n\n${sig}`;
      sms=`${co} : pas de retour sur notre devis pour ${w}. Un appel de dix minutes [jour, créneau] pour faire le point ? Sans nouvelles d'ici le ${fmtD(f.closeDate)}, je classe le dossier.`;
      appel=['« Je vous appelle pour faire le point sur le devis de '+w+'. »','« Où en êtes-vous ? Qu\'est-ce qui reste à trancher ? » Laisser répondre.','Si une objection : la noter, proposer d\'y répondre par écrit.','« Si le projet n\'est plus d\'actualité, dites-le-moi simplement, je classe le dossier. »','« Sinon, quand puis-je vous rappeler ? » Noter la date.'];
      break;
    case 'cloture':
      objet=`Je clôture votre dossier ${w}`;
      mail=`${hi}\n\nSans nouvelles de votre part, je vais classer notre devis du ${d} pour ${w}. Si le projet reste d'actualité, il suffit de répondre à ce message et nous reprendrons là où nous en étions.\n\nEt si vous avez choisi une autre solution, un mot pour m'en indiquer la raison m'aiderait beaucoup à améliorer nos propositions.\n\nMerci pour votre confiance,\n[Prénom Nom]\n${co}`;
      sms=`${co} : sans nouvelles, je classe notre devis pour ${w}. Si le projet reste d'actualité, répondez simplement à ce message. Si vous avez choisi une autre solution, un mot sur la raison m'aiderait. Merci.`;
      appel=['« Je vous appelle une dernière fois au sujet du devis de '+w+'. »','« Le projet est-il toujours d\'actualité ? »','Si non : « Qu\'est-ce qui a fait la différence ? » Noter le motif sans discuter.','« Merci pour votre retour, je classe le dossier. Bonne continuation. »'];
      break;
    case 'reponse':
      objet=`Votre question sur le devis ${w}`;
      mail=`${hi}\n\nMerci pour votre message.${f.said?` Concernant « ${f.said} » : [réponse].`:' [Réponse à votre question, ou devis mis à jour en pièce jointe.]'}\n\nSi c'est plus simple de vive voix, je peux vous appeler [jour, créneau].\n\n${sig}`;
      sms=`${co} : merci pour votre message${f.said?` au sujet de « ${f.said} »`:''}. [Réponse en une phrase.] Je peux vous appeler [jour, créneau] si c'est plus simple.`;
      appel=['« Merci pour votre question'+(f.said?' sur « '+f.said+' »':'')+' : voici la réponse. » Répondre, puis vérifier : « Est-ce que ça répond à votre question ? »','« Est-ce qu\'il reste d\'autres points à préciser ? »','« À quelle date pensez-vous décider ? » Noter la date.'];
      break;
    case 'prix':
      objet=`Votre devis ${w} : on regarde ensemble ?`;
      mail=`${hi}\n\nMerci pour votre retour. Avant de revoir quoi que ce soit, j'aimerais comprendre ce qui vous pose question : un poste en particulier, un écart avec une autre proposition, ou un budget à respecter ?\n\nSelon le cas, nous pouvons préciser ce qui est compris, proposer une variante ou un phasage des travaux. Un appel de dix minutes suffit souvent. Quel moment vous conviendrait ?\n\n${sig}`;
      sms=`${co} : merci pour votre retour sur le devis ${w}. Avant de revoir quoi que ce soit, qu'est-ce qui vous pose question : un poste, un autre devis, un budget ? Un appel de dix minutes quand vous voulez.`;
      appel=['« Merci pour votre retour. Qu\'est-ce qui vous pose question : un poste, un autre devis, un budget ? » Laisser répondre.','Si un autre devis : « Est-ce qu\'il comprend l\'évacuation, la liaison avec l\'existant, les protections, le nettoyage ? »','« Selon le cas, on peut préciser ce qui est compris, proposer une variante ou phaser les travaux. »','« Je vous envoie ça par écrit d\'ici [jour]. »'];
      break;
    case 'reporte':
      objet=`Votre projet : ${W}`;
      mail=`${hi}\n\nJe comprends que le projet est décalé${f.said?` (${f.said})`:' [raison si connue : financement, permis, autre priorité]'}. Pour ne pas vous solliciter inutilement, je vous propose de reprendre contact vers le ${fmtD(f.next)}. Cela vous convient ?\n\nD'ici là, notre devis reste valable jusqu'au ${f.valid?fmtD(f.valid):'[date]'}. Au-delà, nous le mettrons à jour avec les prix du moment.\n\n${sig}`;
      sms=`${co} : bien noté pour le report de ${w}. Je reprends contact vers le ${fmtD(f.next)}, ça vous convient ? Le devis reste valable jusqu'au ${f.valid?fmtD(f.valid):'[date]'}.`;
      appel=['« Bien noté pour le report. Qu\'est-ce qui décale le projet : financement, permis, autre priorité ? »','« Vers quelle date pensez-vous le reprendre ? » Noter la date.','« Je vous recontacte à ce moment-là. Le devis reste valable jusqu\'au '+(f.valid?fmtD(f.valid):'[date]')+'. »'];
      break;
  }
  return {objet,mail,sms,appel};
}

/* ——— rendu ——— */
let current=0;
function render(f){
  const L=LEVELS[f.kind], S=steps(f);
  const stepsHtml=S.map(s=>{const isNow=s.when.getTime()===f.now.getTime();const dj=dayDiff(s.when,f.now);return `<li${isNow?' class="now"':''}><time datetime="${iso(s.when)}">${isNow?'Aujourd\'hui':esc(fmtDs(s.when))}<small>${isNow?esc(fmtDs(s.when)):(dj>0?'J+'+dj:'J'+dj)}</small></time><div><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div></li>`}).join('');
  out.innerHTML=`<div class="rd-cards">
    <section class="rd-card rd-level">
      <span class="k">Où vous en êtes</span>
      <h3><span class="rd-badge ${L.cls}">${esc(L.n)}</span>${esc(L.name)}</h3>
      <p>${esc(L.why(f))}</p>
    </section>
    <section class="rd-card rd-cal">
      <span class="k">La suite</span>
      <ol class="rd-steps">${stepsHtml}</ol>
      <div class="rd-presc"><b>On arrête</b> dès que le client répond, signe, refuse ou demande à ne plus être relancé. Une question ou une objection : une personne reprend la main.</div>
    </section>
    <section class="rd-card rd-msgs">
      <span class="k">Le mail, le SMS, l'appel</span>
      <div class="rd-tabs" role="tablist"><button type="button" class="on" data-pane="mail">Mail</button><button type="button" data-pane="sms">SMS</button><button type="button" data-pane="appel">Script d'appel</button></div>
      <div class="rd-status" id="rd-status"></div>
      <div id="rd-panes"></div>
    </section>
  </div>`;
  out.querySelectorAll('.rd-tabs button').forEach(b=>b.addEventListener('click',()=>{
    out.querySelectorAll('.rd-tabs button').forEach(x=>x.classList.toggle('on',x===b));
    out.querySelectorAll('.rd-pane').forEach(p=>p.classList.toggle('on',p.dataset.pane===b.dataset.pane));
  }));
}
function renderMessages(m){
  const panes=$('rd-panes'); if(!panes) return;
  const active=(out.querySelector('.rd-tabs button.on')||{}).dataset?.pane||'mail';
  const pane=(key,inner,copyText,note)=>`<div class="rd-pane${active===key?' on':''}" data-pane="${key}">${inner}<div class="rd-msg-foot"><small>${esc(note)}</small><button type="button" class="rd-copy" data-copy="${esc(copyText)}">Copier</button></div></div>`;
  panes.innerHTML=
    pane('mail',`<div class="rd-subject">Objet : ${esc(m.objet)}</div><pre class="rd-msg">${esc(m.mail)}</pre>`,`Objet : ${m.objet}\n\n${m.mail}`,'Relisez les crochets avant d\'envoyer.')+
    pane('sms',`<pre class="rd-msg only">${esc(m.sms)}</pre>`,m.sms,`${m.sms.length} caractères.`)+
    pane('appel',`<div class="rd-msg only"><ol>${m.appel.map(a=>`<li>${esc(a)}</li>`).join('')}</ol></div>`,m.appel.map((a,i)=>`${i+1}. ${a}`).join('\n'),'À garder sous les yeux pendant l\'appel.');
  panes.querySelectorAll('.rd-copy').forEach(b=>b.addEventListener('click',async()=>{
    const r=await copyToClipboard(b.dataset.copy,null,b.closest('.rd-pane').querySelector('.rd-msg'));
    b.textContent=r==='ok'?'Copié ✓':'Texte sélectionné : faites Ctrl+C';if(r==='ok')b.classList.add('ok');
    setTimeout(()=>{b.textContent='Copier';b.classList.remove('ok')},2200);
  }));
}
function status(cls,text){const s=$('rd-status');if(!s)return;s.className='rd-status'+(cls?' '+cls:'');s.textContent=text}

/* ——— personnalisation par l'IA ——— */
function payload(f){
  return {client:f.client,situation:f.situation,kind:f.kind,tone:f.tone,done:f.done,days:f.days,works:f.works,amount:f.amount,sent:iso(f.sent),
    decision:f.decision?fmtD(f.decision):'',valid:f.valid?fmtD(f.valid):'',said:f.said,nextDate:f.next?fmtD(f.next):'',closeDate:f.kind==='cloture'?'':fmtD(f.closeDate),personal:f.personal};
}
async function personalize(f,token){
  status('busy','Personnalisation des messages en cours…');
  const ctrl=new AbortController(), timer=setTimeout(()=>ctrl.abort(),45000);
  try{
    const res=await fetch('/api/outils/relance-devis',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload(f)),signal:ctrl.signal});
    if(token!==current) return;
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data=await res.json();
    if(token!==current) return;
    if(!data||typeof data.mail!=='string'||!Array.isArray(data.appel)) throw new Error('réponse incomplète');
    renderMessages(data);
    status('ai','Messages personnalisés pour votre dossier');
  }catch{
    if(token!==current) return;
    status('','Modèles standard (personnalisation indisponible pour le moment)');
  }finally{clearTimeout(timer)}
}

/* ——— soumission ——— */
form.addEventListener('submit',e=>{
  e.preventDefault();
  const err=$('rd-err'); err.hidden=true;
  const works=$('rd-works').value.trim(), sent=parse($('rd-sent').value);
  const problems=[];
  $('rd-works').setAttribute('aria-invalid',String(!works));
  $('rd-sent').setAttribute('aria-invalid',String(!sent));
  if(!works) problems.push('les travaux');
  if(!sent) problems.push('la date d\'envoi du devis');
  if(problems.length){err.textContent='Il manque '+problems.join(' et ')+'.';err.hidden=false;return}
  const f=compute();
  current++; const token=current;
  render(f);
  renderMessages(templates(f));
  rendered=true; $('rd-go').innerHTML='Préparer ma relance <span class="arw">→</span>';
  out.scrollIntoView({behavior:'smooth',block:'start'});
  personalize(f,token);
});
})();
