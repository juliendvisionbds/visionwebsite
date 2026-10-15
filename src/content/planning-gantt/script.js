

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
   OUTIL — PLANNING DE CHANTIER EN GANTT
   Tâches, durées en jours ouvrés, dépendances fin-début → dates, chemin critique, Gantt en SVG.
   Tout se calcule dans le navigateur ; le planning est conservé dans localStorage.
   ============================================================ */
(()=>{
const sum=document.getElementById('pg-sum'); if(!sum) return;
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const DAY=86400000, KEY='vision-planning-gantt-v1';
const pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;const d=new Date(+m[1],+m[2]-1,+m[3]);return isNaN(d)?null:d};
const addDays=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
const dayDiff=(a,b)=>Math.round((a-b)/DAY);
const fmtD=d=>d.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).replace(/ 1 /,' 1er ');
const fmtS=d=>d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
const fmtM=d=>d.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
const uid=()=>Math.random().toString(36).slice(2,9);

/* Copie dans le presse-papiers : API moderne, puis execCommand, puis sélection du texte pour copie manuelle. */
async function copyToClipboard(text,fallbackEl){
  try{await navigator.clipboard.writeText(text);return 'ok'}catch{}
  try{const onCopy=e=>{e.clipboardData.setData('text/plain',text);e.preventDefault()};document.addEventListener('copy',onCopy,{once:true});const ok=document.execCommand('copy');document.removeEventListener('copy',onCopy);if(ok)return 'ok'}catch{}
  if(fallbackEl){const sel=getSelection();sel.removeAllRanges();const r=document.createRange();r.selectNodeContents(fallbackEl);sel.addRange(r)}
  return 'manual';
}

/* ——— jours fériés français ——— */
function easter(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return new Date(y,mo-1,da)}
const holidayCache={};
function holidays(y){
  if(holidayCache[y]) return holidayCache[y];
  const e=easter(y), set=new Set([`${y}-01-01`,`${y}-05-01`,`${y}-05-08`,`${y}-07-14`,`${y}-08-15`,`${y}-11-01`,`${y}-11-11`,`${y}-12-25`,iso(addDays(e,1)),iso(addDays(e,39)),iso(addDays(e,50))]);
  return holidayCache[y]=set;
}
const isHoliday=d=>holidays(d.getFullYear()).has(iso(d));

/* ——— état ——— */
const nextMonday=()=>{const d=new Date();d.setHours(0,0,0,0);const w=d.getDay();return addDays(d,w===1?0:(8-w)%7||7)};
const blankTask=()=>({id:uid(),nom:'',lot:'',duree:'1',deps:[]});
const defaultState=()=>({nom:'',start:iso(nextMonday()),sat:false,hol:true,tasks:[blankTask(),blankTask(),blankTask()]});
let S=defaultState();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&Array.isArray(saved.tasks)){S={...defaultState(),...saved};S.tasks=S.tasks.filter(t=>t&&t.id).map(t=>({...blankTask(),...t,deps:Array.isArray(t.deps)?t.deps:[]}));if(!S.tasks.length)S.tasks=[blankTask()]}}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};

const EXAMPLE=[
  ['Dépose et démolition','Démolition',2,[]],['Évacuation des gravats','Démolition',1,[1]],['Plomberie : réseaux et évacuations','Plomberie',2,[1]],['Électricité : gaines et points','Électricité',1,[1]],
  ['Chape et ragréage','Maçonnerie',1,[3,4]],['Séchage de la chape','Délai',3,[5]],['Étanchéité de la douche','Carrelage',1,[6]],['Carrelage sol et murs','Carrelage',4,[7]],['Joints et séchage','Carrelage',1,[8]],
  ['Pose des sanitaires et du meuble','Plomberie',1,[9]],['Électricité : appareillage','Électricité',1,[9]],['Peinture plafond et finitions','Peinture',1,[10,11]],['Réception','Jalon',0,[12]],
];
function loadExample(){
  const ids=EXAMPLE.map(()=>uid());
  S={nom:'Rénovation salle de bain, villa Lefèvre',start:iso(nextMonday()),sat:false,hol:true,tasks:EXAMPLE.map(([nom,lot,duree,deps],i)=>({id:ids[i],nom,lot,duree:String(duree),deps:deps.map(n=>ids[n-1])}))};
}

/* ——— calcul ——— */
let P=null;
function compute(){
  const start=parse(S.start)||nextMonday();
  const isWork=d=>{const w=d.getDay();if(w===0)return false;if(w===6&&!S.sat)return false;if(S.hol&&isHoliday(d))return false;return true};
  const wd=[]; let d=start; while(!isWork(d)) d=addDays(d,1); wd.push(d);
  const workday=k=>{while(wd.length<=k){let n=addDays(wd[wd.length-1],1);while(!isWork(n))n=addDays(n,1);wd.push(n)}return wd[k]};
  const tasks=S.tasks.map((t,i)=>({...t,i,n:i+1,dur:Math.max(0,Math.min(365,parseInt(t.duree,10)||0)),deps:t.deps.filter(id=>S.tasks.some(x=>x.id===id&&x.id!==t.id))}));
  const byId=Object.fromEntries(tasks.map(t=>[t.id,t]));
  // ordre topologique (Kahn)
  const indeg=Object.fromEntries(tasks.map(t=>[t.id,t.deps.length])), succ=Object.fromEntries(tasks.map(t=>[t.id,[]]));
  tasks.forEach(t=>t.deps.forEach(d=>succ[d].push(t.id)));
  const q=tasks.filter(t=>!indeg[t.id]).map(t=>t.id), order=[];
  while(q.length){const id=q.shift();order.push(id);succ[id].forEach(s=>{if(--indeg[s]===0)q.push(s)})}
  const cycle=order.length<tasks.length;
  if(!cycle){
    for(const id of order){const t=byId[id];t.es=t.deps.length?Math.max(...t.deps.map(d=>byId[d].ef+1)):0;t.ef=t.es+t.dur-1}
    const end=Math.max(-1,...tasks.map(t=>t.ef));
    for(const id of [...order].reverse()){const t=byId[id];t.lf=succ[id].length?Math.min(...succ[id].map(s=>byId[s].ls-1)):end;t.ls=t.lf-t.dur+1;t.slack=t.ls-t.es;t.crit=t.slack===0&&tasks.length>0}
    tasks.forEach(t=>{t.sd=workday(t.es);t.ed=t.dur>0?workday(t.ef):t.sd});
    const named=tasks.filter(t=>t.nom.trim());
    const endDate=named.length?workday(Math.max(0,end)):null;
    P={tasks,cycle:false,start:wd[0],end:endDate,workdays:named.length?end+1:0,caldays:endDate?dayDiff(endDate,wd[0])+1:0,isWork};
  }else P={tasks,cycle:true,start:wd[0],end:null,workdays:0,caldays:0,isWork};
  return P;
}

/* ——— rendu du tableau ——— */
const numOf=id=>S.tasks.findIndex(t=>t.id===id)+1;
function renderRows(){
  const tb=$('pg-rows');
  tb.innerHTML=S.tasks.map((t,i)=>{const c=P?.tasks[i]?.crit;return `<tr data-id="${t.id}">
    <td class="num${c?' crit':''}">${i+1}</td>
    <td><input type="text" maxlength="80" value="${esc(t.nom)}" placeholder="Tâche" data-k="nom" aria-label="Nom de la tâche ${i+1}"></td>
    <td class="lot"><input type="text" maxlength="40" value="${esc(t.lot)}" placeholder="Lot" data-k="lot" aria-label="Lot"></td>
    <td class="n"><input class="n" type="number" min="0" max="365" step="1" inputmode="numeric" value="${esc(t.duree)}" data-k="duree" aria-label="Durée en jours ouvrés"></td>
    <td class="dep"><input class="dep" type="text" value="${esc(t.deps.map(numOf).filter(n=>n>0).sort((a,b)=>a-b).join(', '))}" placeholder="ex. 1, 3" data-k="deps" aria-label="Après les tâches"></td>
    <td class="x"><button type="button" class="pg-del" data-del="${t.id}" aria-label="Supprimer la tâche">×</button></td>
  </tr>`}).join('');
}
function renderHead(){$('pg-nom').value=S.nom;$('pg-start').value=S.start;$('pg-sat').checked=!!S.sat;$('pg-hol').checked=!!S.hol}

/* ——— résumé ——— */
function renderSummary(){
  const named=P.tasks.filter(t=>t.nom.trim()), warn=$('pg-warn');
  $('pg-n').textContent=String(named.length);$('pg-wd').textContent=String(P.workdays);$('pg-cd').textContent=String(P.caldays);
  const crit=named.filter(t=>t.crit);
  $('pg-crit').textContent=String(crit.length);
  $('pg-end').textContent=P.cycle?'—':(P.end?fmtD(P.end):'—');
  $('pg-critlist').innerHTML=crit.length?`<b>Chemin critique :</b> ${crit.map(t=>esc(t.nom.trim()||'Tâche '+t.n)).join(' → ')}.`:'';
  if(P.cycle){warn.textContent='Une tâche dépend d\'elle-même par ricochet (boucle) : corrigez la colonne « Après ».';warn.hidden=false}
  else if(!named.length){warn.hidden=true}
  else warn.hidden=true;
  $('pg-sum').classList.toggle('cycle',P.cycle);
}

/* ——— Gantt (SVG) ——— */
const PALETTE=['#5A4BFF','#FFC64D','#25D3A4','#FF7A1A','#3BA7F0','#E8578C','#7D6BFF','#8DB600'];
const lotColor=(()=>{const m={};let i=0;return lot=>{const k=(lot||'').trim().toLowerCase()||'—';if(!(k in m))m[k]=PALETTE[i++%PALETTE.length];return m[k]}})();
function ganttSvg(){
  const named=P.tasks.filter(t=>t.nom.trim());
  if(P.cycle||!named.length||!P.end) return '';
  const LEFT=250,DW=24,ROW=34,HEAD=52,TOP=HEAD+8;
  const calStart=addDays(P.start,-((P.start.getDay()+6)%7)); // lundi de la semaine de début
  const calEnd=addDays(P.end,7-((P.end.getDay()+6)%7)); // dimanche après la fin
  const days=dayDiff(calEnd,calStart)+1, W=LEFT+days*DW+12, H=TOP+named.length*ROW+14;
  const x=d=>LEFT+dayDiff(d,calStart)*DW;
  let g='';
  // colonnes : week-ends et fériés
  for(let i=0;i<days;i++){const d=addDays(calStart,i);if(!P.isWork(d))g+=`<rect x="${LEFT+i*DW}" y="${HEAD}" width="${DW}" height="${H-HEAD}" fill="#F3F2EE"/>`}
  // mois
  let m0=calStart;while(m0<=calEnd){const next=new Date(m0.getFullYear(),m0.getMonth()+1,1);const to=next<calEnd?next:addDays(calEnd,1);g+=`<text x="${x(m0)+4}" y="16" font-size="12" font-weight="700" fill="#14151A">${esc(fmtM(m0).replace(/^./,c=>c.toUpperCase()))}</text><line x1="${x(to)}" y1="0" x2="${x(to)}" y2="${H}" stroke="#D9D7D2"/>`;m0=next}
  // jours et semaines
  for(let i=0;i<days;i++){const d=addDays(calStart,i);const xx=LEFT+i*DW;if(d.getDay()===1)g+=`<line x1="${xx}" y1="22" x2="${xx}" y2="${H}" stroke="#E6E4DF"/>`;g+=`<text x="${xx+DW/2}" y="40" font-size="10.5" text-anchor="middle" fill="${P.isWork(d)?'#6C6A66':'#B8B5AF'}">${d.getDate()}</text>`}
  g+=`<line x1="0" y1="${HEAD}" x2="${W}" y2="${HEAD}" stroke="#14151A" stroke-width="1.5"/>`;
  // lignes et barres
  const pos={};
  named.forEach((t,r)=>{const y=TOP+r*ROW;pos[t.id]={y:y+ROW/2,x1:x(t.sd),x2:t.dur>0?x(t.ed)+DW:x(t.sd)};
    g+=`<line x1="0" y1="${y+ROW}" x2="${W}" y2="${y+ROW}" stroke="#F0EEE9"/>`;
    const name=t.nom.trim().length>30?t.nom.trim().slice(0,29)+'…':t.nom.trim();
    g+=`<text x="10" y="${y+ROW/2+1}" font-size="13" font-weight="600" fill="${t.crit?'#14151A':'#3A3A3E'}" dominant-baseline="middle">${esc(t.n)}. ${esc(name)}</text>`;
    g+=`<text x="${LEFT-8}" y="${y+ROW/2+1}" font-size="11" text-anchor="end" fill="#6C6A66" dominant-baseline="middle">${t.dur>0?t.dur+' j':'jalon'}</text>`;
    const col=lotColor(t.lot);
    if(t.dur>0) g+=`<rect x="${x(t.sd)+2}" y="${y+8}" width="${Math.max(6,x(t.ed)+DW-x(t.sd)-4)}" height="${ROW-16}" rx="6" fill="${col}" fill-opacity="${t.crit?'1':'.78'}"${t.crit?' stroke="#14151A" stroke-width="2.5"':''}/>`;
    else g+=`<path d="M${x(t.sd)+DW/2} ${y+6} l9 ${ROW/2-6} l-9 ${ROW/2-6} l-9 -${ROW/2-6} z" fill="#14151A"/>`;
    g+=`<text x="${(t.dur>0?x(t.ed)+DW:x(t.sd)+DW/2+10)+6}" y="${y+ROW/2+1}" font-size="10.5" fill="#6C6A66" dominant-baseline="middle">${esc(fmtS(t.sd))}${t.dur>1?' → '+esc(fmtS(t.ed)):''}</text>`;
  });
  // liaisons
  named.forEach(t=>t.deps.forEach(d=>{const a=pos[d],b=pos[t.id];if(!a||!b)return;const xm=a.x2+8;g+=`<path d="M${a.x2} ${a.y} H${xm} V${b.y} H${b.x1-2}" fill="none" stroke="#14151A" stroke-opacity=".35" stroke-width="1.5"/><path d="M${b.x1-2} ${b.y} l-6 -4 v8 z" fill="#14151A" fill-opacity=".5"/>`}));
  // aujourd'hui
  const today=new Date();today.setHours(0,0,0,0);
  if(today>=calStart&&today<=calEnd) g+=`<line x1="${x(today)+DW/2}" y1="${HEAD}" x2="${x(today)+DW/2}" y2="${H}" stroke="#FF7A1A" stroke-width="2" stroke-dasharray="4 3"/><text x="${x(today)+DW/2+4}" y="${HEAD+12}" font-size="10" fill="#FF7A1A" font-weight="700">aujourd'hui</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Hanken Grotesk, Arial, Helvetica, sans-serif" style="background:#fff"><rect width="${W}" height="${H}" fill="#fff"/>${g}</svg>`;
}
function renderGantt(){
  const svg=ganttSvg();
  $('pg-gantt').innerHTML=svg||`<p class="pg-empty">${P.cycle?'Boucle dans les dépendances : corrigez la colonne « Après ».':'Ajoutez des tâches ou chargez l\'exemple : le Gantt se dessine ici.'}</p>`;
  const lots=[...new Set(P.tasks.filter(t=>t.nom.trim()).map(t=>(t.lot||'').trim()).filter(Boolean))];
  $('pg-legend').innerHTML=svg?[...lots.map(l=>`<span><i style="background:${lotColor(l)}"></i>${esc(l)}</span>`),'<span><i class="crit"></i>chemin critique</span>'].join(''):'';
}
function refresh(){compute();renderSummary();renderGantt();S.tasks.forEach((t,i)=>{const row=$('pg-rows').querySelector(`tr[data-id="${t.id}"] td.num`);if(row)row.classList.toggle('crit',!!P.tasks[i]?.crit)})}
function renderAll(){renderHead();compute();renderRows();renderSummary();renderGantt()}

/* ——— événements ——— */
$('pg-rows').addEventListener('input',e=>{
  const el=e.target, tr=el.closest('tr'); if(!tr) return;
  const t=S.tasks.find(x=>x.id===tr.dataset.id); if(!t) return;
  const k=el.dataset.k;
  if(k==='deps'){const nums=el.value.split(/[,;\s]+/).map(v=>parseInt(v,10)).filter(n=>n>=1&&n<=S.tasks.length&&n!==numOf(t.id));t.deps=[...new Set(nums.map(n=>S.tasks[n-1].id))];tr.classList.toggle('err',/\d/.test(el.value)&&!t.deps.length)}
  else t[k]=el.value;
  refresh();save();
});
$('pg-rows').addEventListener('click',e=>{const b=e.target.closest('[data-del]');if(!b)return;S.tasks=S.tasks.filter(t=>t.id!==b.dataset.del);S.tasks.forEach(t=>{t.deps=t.deps.filter(d=>d!==b.dataset.del)});if(!S.tasks.length)S.tasks=[blankTask()];compute();renderRows();renderSummary();renderGantt();save()});
$('pg-add').addEventListener('click',()=>{S.tasks.push(blankTask());compute();renderRows();save();const inputs=$('pg-rows').querySelectorAll('input[data-k=nom]');inputs[inputs.length-1]?.focus()});
$('pg-nom').addEventListener('input',e=>{S.nom=e.target.value;save()});
$('pg-start').addEventListener('change',e=>{S.start=e.target.value||iso(nextMonday());refresh();save()});
$('pg-sat').addEventListener('change',e=>{S.sat=e.target.checked;refresh();save()});
$('pg-hol').addEventListener('change',e=>{S.hol=e.target.checked;refresh();save()});
$('pg-example').addEventListener('click',()=>{loadExample();renderAll();save();$('pg-gantt').scrollIntoView({behavior:'smooth',block:'nearest'})});

/* ——— exports ——— */
function tableText(){
  const named=P.tasks.filter(t=>t.nom.trim());
  const L=[`PLANNING${S.nom?' — '+S.nom:''}`,`Début : ${fmtD(P.start)} · Fin prévue : ${P.end?fmtD(P.end):'—'} · ${P.workdays} jours ouvrés, ${P.caldays} jours calendaires`,''];
  named.forEach(t=>L.push(`${t.n}. ${t.nom.trim()}${t.lot?' ['+t.lot.trim()+']':''} — ${t.dur>0?t.dur+' j':'jalon'} — du ${fmtS(t.sd)} au ${fmtS(t.ed)}${t.deps.length?' — après '+t.deps.map(numOf).sort((a,b)=>a-b).join(', '):''}${t.crit?' — CRITIQUE':' — marge '+t.slack+' j'}`));
  L.push('',`Calculé avec l'outil gratuit de vision : visionbtp.com/outils/planning-gantt/`);
  return L.join('\n');
}
function csvText(){
  const named=P.tasks.filter(t=>t.nom.trim());
  const row=a=>a.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(';');
  return '﻿'+[row(['N°','Tâche','Lot','Durée (j ouvrés)','Début','Fin','Après','Marge (j)','Critique']),...named.map(t=>row([t.n,t.nom.trim(),t.lot.trim(),t.dur,iso(t.sd),iso(t.ed),t.deps.map(numOf).sort((a,b)=>a-b).join(', '),t.slack,t.crit?'oui':'non']))].join('\r\n');
}
const download=(parts,type,name)=>{const blob=new Blob(parts,{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
async function svgToPng(svg){
  const img=new Image(); const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url});
  const k=1.5, c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);const ctx=c.getContext('2d');ctx.scale(k,k);ctx.drawImage(img,0,0);URL.revokeObjectURL(url);
  return new Promise(res=>c.toBlob(res,'image/png'));
}
$('pg-sum').addEventListener('click',async e=>{
  const btn=e.target.closest('[data-act]'); if(!btn) return;
  const act=btn.dataset.act, done=l=>{const t=btn.textContent;btn.textContent=l;btn.classList.add('ok');setTimeout(()=>{btn.textContent=t;btn.classList.remove('ok')},2200)};
  if(act==='reset'){S=defaultState();renderAll();try{localStorage.removeItem(KEY)}catch{}return}
  if(!P||P.cycle) return;
  if(act==='text'){(await copyToClipboard(tableText(),$('pg-rows')))==='ok'?done('Copié ✓'):(btn.textContent='Sélectionnez et copiez')}
  else if(act==='csv'){download([csvText()],'text/csv;charset=utf-8','planning-chantier.csv');done('Téléchargé ✓')}
  else if(act==='png'){const svg=ganttSvg();if(!svg||btn.disabled)return;const label=btn.textContent;btn.textContent='Préparation de l\'image…';btn.disabled=true;try{const blob=await svgToPng(svg.replace('Hanken Grotesk, ',''));download([blob],'image/png','planning-gantt.png');btn.textContent=label;done('Téléchargée ✓')}catch{btn.textContent='Image impossible ici';setTimeout(()=>{btn.textContent=label},2600)}finally{btn.disabled=false}}
  else if(act==='print'){const svg=ganttSvg();if(!svg)return;const w=window.open('','_blank');if(!w)return;w.document.open();w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc('Planning'+(S.nom?' — '+S.nom:''))}</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0;font-size:12px}h1{font-size:18px;margin:0 0 4px}p{margin:0 0 10px;color:#555}svg{max-width:100%;height:auto}pre{white-space:pre-wrap;font:inherit;margin-top:14px;page-break-before:auto}</style></head><body><h1>${esc(S.nom||'Planning de chantier')}</h1><p>Début ${esc(fmtD(P.start))} · Fin prévue ${esc(P.end?fmtD(P.end):'—')} · ${P.workdays} jours ouvrés</p>${svg.replace('Hanken Grotesk, ','')}<pre>${esc(tableText())}</pre></body></html>`);w.document.close();w.focus();setTimeout(()=>w.print(),500)}
});

/* ——— proposition de tâches par l'IA ——— */
$('pg-ai-go').addEventListener('click',async()=>{
  const desc=$('pg-desc').value.trim(), st=$('pg-ai-status'), go=$('pg-ai-go');
  st.hidden=false;st.className='pg-ai-status';
  if(desc.length<15){st.textContent='Décrivez les travaux en quelques phrases.';st.classList.add('err');return}
  go.disabled=true;st.textContent='Proposition en cours, dix à vingt secondes…';
  try{
    const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),60000);
    const res=await fetch('/api/outils/planning-gantt',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({description:desc}),signal:ctrl.signal});
    clearTimeout(timer);
    const data=await res.json().catch(()=>({}));
    if(!res.ok||!Array.isArray(data.taches)) throw new Error(data.error||('HTTP '+res.status));
    const ids=data.taches.map(()=>uid());
    const tasks=data.taches.map((t,i)=>({id:ids[i],nom:t.nom,lot:t.lot||'',duree:String(t.duree),deps:(t.apres||[]).map(n=>ids[n-1]).filter(Boolean)}));
    const keep=$('pg-replace').checked?[]:S.tasks.filter(t=>t.nom.trim());
    S.tasks=[...keep,...tasks];
    renderAll();save();
    st.textContent=`${tasks.length} tâches proposées, durées indicatives à ajuster.${data.note?' '+data.note:''}`;
    $('pg-rows').scrollIntoView({behavior:'smooth',block:'start'});
  }catch(ex){st.textContent=(ex.name==='AbortError'?'La proposition a pris trop de temps.':(ex.message||'Proposition indisponible.'))+' Vous pouvez saisir les tâches à la main.';st.classList.add('err')}
  finally{go.disabled=false}
});

renderAll();
})();
