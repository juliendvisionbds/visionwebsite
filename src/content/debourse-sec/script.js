

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
   OUTIL — CALCULATEUR DE DÉBOURSÉ SEC
   Tout se calcule dans le navigateur ; les lignes sont conservées dans localStorage.
   ============================================================ */
(()=>{
const sum=document.getElementById('ds-sum'); if(!sum) return;
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const eur=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:n<100?2:0});
const num=v=>{const n=parseFloat(String(v??'').replace(/\s/g,'').replace(',','.'));return isFinite(n)?n:0};
const KEY='vision-debourse-sec-v1';

/* Copie dans le presse-papiers : API moderne, puis execCommand, puis sélection du texte pour copie manuelle. */
async function copyToClipboard(text,fallbackEl){
  try{await navigator.clipboard.writeText(text);return 'ok'}catch{}
  try{const onCopy=e=>{e.clipboardData.setData('text/plain',text);e.preventDefault()};document.addEventListener('copy',onCopy,{once:true});const ok=document.execCommand('copy');document.removeEventListener('copy',onCopy);if(ok)return 'ok'}catch{}
  if(fallbackEl){const sel=getSelection();sel.removeAllRanges();const r=document.createRange();r.selectNodeContents(fallbackEl);sel.addRange(r)}
  return 'manual';
}

/* ——— état ——— */
const FAM={
  mat:{label:'Matériaux',cols:[{k:'d',type:'text',ph:'Carrelage 60×60'},{k:'q',type:'num',ph:'45'},{k:'u',type:'unit'},{k:'p',type:'num',ph:'28,00'}],line:r=>num(r.q)*num(r.p)},
  mo:{label:'Main-d\'œuvre',cols:[{k:'d',type:'text',ph:'Carreleur'},{k:'h',type:'num',ph:'36'},{k:'t',type:'num',ph:'38,00'}],line:r=>num(r.h)*num(r.t)},
  mel:{label:'Matériel',cols:[{k:'d',type:'text',ph:'Coupe-carreaux électrique'},{k:'j',type:'num',ph:'3'},{k:'c',type:'num',ph:'45,00'}],line:r=>num(r.j)*num(r.c)},
  st:{label:'Sous-traitance',cols:[{k:'d',type:'text',ph:'Ragréage par entreprise X'},{k:'m',type:'num',ph:'600,00'}],line:r=>num(r.m)},
  aut:{label:'Autres coûts directs',cols:[{k:'d',type:'text',ph:'Déplacements, benne…'},{k:'m',type:'num',ph:'120,00'}],line:r=>num(r.m)},
};
const UNITS=['m²','ml','m³','kg','u','sac','lot'];
const blank=fam=>Object.fromEntries(FAM[fam].cols.map(c=>[c.k,c.type==='unit'?'m²':'']));
const defaultState=()=>({nom:'',qty:'',unit:'m²',pertes:5,fc:10,fg:15,marge:10,mat:[blank('mat'),blank('mat')],mo:[blank('mo')],mel:[blank('mel')],st:[blank('st')],aut:[blank('aut')]});
let S=defaultState();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&typeof saved==='object'){S={...defaultState(),...saved};for(const f of Object.keys(FAM)){if(!Array.isArray(S[f])||!S[f].length)S[f]=[blank(f)]}}}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}};

const EXAMPLE={nom:'Pose carrelage sol 60×60, villa Lefèvre',qty:'45',unit:'m²',pertes:8,fc:10,fg:15,marge:10,
  mat:[{d:'Carrelage grès cérame 60×60',q:'45',u:'m²',p:'28'},{d:'Colle C2S1 (25 kg)',q:'12',u:'sac',p:'19'},{d:'Joint et croisillons',q:'1',u:'lot',p:'85'},{d:'Primaire d\'accrochage',q:'2',u:'u',p:'42'}],
  mo:[{d:'Carreleur',h:'36',t:'38'},{d:'Manœuvre',h:'12',t:'27'}],
  mel:[{d:'Coupe-carreaux électrique (amortissement)',j:'4',c:'18'},{d:'Petit outillage et consommables',j:'4',c:'9'}],
  st:[{d:'Ragréage autolissant par entreprise partenaire',m:'540'}],
  aut:[{d:'Déplacements (4 jours, 2 personnes)',m:'160'},{d:'Évacuation des déchets',m:'90'}]};

/* ——— rendu des tableaux ——— */
function cell(fam,i,c,r){
  if(c.type==='text') return `<td><input type="text" maxlength="80" value="${esc(r[c.k])}" placeholder="${esc(c.ph)}" data-fam="${fam}" data-i="${i}" data-k="${c.k}" aria-label="${esc(c.ph)}"></td>`;
  if(c.type==='unit') return `<td class="u"><select data-fam="${fam}" data-i="${i}" data-k="${c.k}" aria-label="Unité">${UNITS.map(u=>`<option${r[c.k]===u?' selected':''}>${u}</option>`).join('')}</select></td>`;
  return `<td class="n"><input class="n" type="number" min="0" step="0.01" inputmode="decimal" value="${esc(r[c.k])}" placeholder="${esc(c.ph)}" data-fam="${fam}" data-i="${i}" data-k="${c.k}"></td>`;
}
function renderFam(fam){
  const tb=$('ds-'+fam), def=FAM[fam], single=def.cols.length===2;
  tb.innerHTML=S[fam].map((r,i)=>`<tr>${def.cols.map(c=>cell(fam,i,c,r)).join('')}${single?'':`<td class="t">${eur(def.line(r))}</td>`}<td class="x"><button type="button" class="ds-del" data-del="${fam}" data-i="${i}" aria-label="Supprimer la ligne">×</button></td></tr>`).join('');
}
function renderAll(){
  for(const f of Object.keys(FAM)) renderFam(f);
  $('ds-nom').value=S.nom;$('ds-qty').value=S.qty;$('ds-unitsel').value=S.unit;
  $('ds-pertes').value=S.pertes;$('ds-fc').value=S.fc;$('ds-fg').value=S.fg;$('ds-marge').value=S.marge;
  compute();
}

/* ——— calcul ——— */
let last=null;
function compute(){
  const sub=Object.fromEntries(Object.keys(FAM).map(f=>[f,S[f].reduce((a,r)=>a+FAM[f].line(r),0)]));
  const matRaw=sub.mat; sub.mat=matRaw*(1+num(S.pertes)/100);
  const total=Object.values(sub).reduce((a,b)=>a+b,0);
  const hours=S.mo.reduce((a,r)=>a+num(r.h),0);
  const qty=num(S.qty);
  const dt=total*(1+num(S.fc)/100), pr=dt*(1+num(S.fg)/100), pv=pr*(1+num(S.marge)/100);
  last={sub,matRaw,total,hours,qty,dt,pr,pv,coef:total>0?pv/total:0};
  $('ds-total').textContent=eur(total);$('ds-bar-total').textContent=eur(total);
  for(const f of Object.keys(FAM)){document.querySelector(`[data-total="${f}"]`).textContent=eur(sub[f])}
  $('ds-break').innerHTML=Object.keys(FAM).map(f=>{const v=sub[f],p=total>0?v/total*100:0;return `<li><span class="lb">${FAM[f].label}</span><span class="track"><i style="width:${p.toFixed(1)}%"></i></span><b>${eur(v)}</b><small>${total>0?Math.round(p)+' %':''}</small></li>`}).join('');
  $('ds-unit').innerHTML=qty>0&&total>0?`Soit <b>${eur(total/qty)}</b> par ${esc(S.unit)}${hours>0?`, et ${(hours/qty).toLocaleString('fr-FR',{maximumFractionDigits:2})} h de main-d'œuvre par ${esc(S.unit)}`:''}.`:(total>0?'Indiquez une quantité d\'ouvrage pour obtenir le déboursé unitaire.':'');
  $('ds-hours').textContent=hours>0?`${hours.toLocaleString('fr-FR')} h au total`:'';
  $('ds-dt').textContent=eur(dt);$('ds-pr').textContent=eur(pr);$('ds-pvht').textContent=eur(pv);
  $('ds-coef').textContent=total>0?'× '+last.coef.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';
}

/* ——— événements ——— */
const grid=document.querySelector('.ds-grid');
grid.addEventListener('input',e=>{
  const el=e.target; if(!el.dataset.fam) return;
  S[el.dataset.fam][+el.dataset.i][el.dataset.k]=el.value;
  const tr=el.closest('tr'), t=tr.querySelector('td.t'); if(t) t.textContent=eur(FAM[el.dataset.fam].line(S[el.dataset.fam][+el.dataset.i]));
  compute();save();
});
grid.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]'), del=e.target.closest('[data-del]');
  if(add){const f=add.dataset.add;S[f].push(blank(f));renderFam(f);save();const inputs=$('ds-'+f).querySelectorAll('input[type=text]');inputs[inputs.length-1]?.focus();}
  if(del){const f=del.dataset.del;S[f].splice(+del.dataset.i,1);if(!S[f].length)S[f].push(blank(f));renderFam(f);compute();save();}
});
$('ds-pertes').addEventListener('input',e=>{S.pertes=e.target.value;compute();save()});
for(const id of ['nom','qty']) $('ds-'+id).addEventListener('input',e=>{S[id]=e.target.value;compute();save()});
$('ds-unitsel').addEventListener('change',e=>{S.unit=e.target.value;compute();save()});
for(const id of ['fc','fg','marge']) $('ds-'+id).addEventListener('input',e=>{S[id]=e.target.value;compute();save()});
$('ds-example').addEventListener('click',()=>{S=JSON.parse(JSON.stringify(EXAMPLE));renderAll();save();$('ds-sum').scrollIntoView({behavior:'smooth',block:'nearest'})});
$('ds-reset').addEventListener('click',()=>{S=defaultState();renderAll();try{localStorage.removeItem(KEY)}catch{}});

/* ——— récapitulatif ——— */
function recap(){
  if(!last) compute();
  const L=[`DÉBOURSÉ SEC${S.nom?' — '+S.nom:''}`,`Total : ${eur(last.total)} HT${last.qty>0?` (${eur(last.total/last.qty)} par ${S.unit}, ${S.qty} ${S.unit})`:''}`,''];
  for(const f of Object.keys(FAM)){
    const rows=S[f].filter(r=>FAM[f].line(r)>0||String(r.d||'').trim());
    if(!rows.length) continue;
    L.push(`${FAM[f].label.toUpperCase()} : ${eur(last.sub[f])}${f==='mat'&&num(S.pertes)>0?` (dont pertes et chutes ${S.pertes} %)`:''}`);
    for(const r of rows){
      const qty=f==='mat'?`${r.q||0} ${r.u} × ${eur(num(r.p))}`:f==='mo'?`${r.h||0} h × ${eur(num(r.t))}/h`:f==='mel'?`${r.j||0} j × ${eur(num(r.c))}/j`:'';
      L.push(`- ${r.d||'(sans désignation)'}${qty?' : '+qty:''} = ${eur(FAM[f].line(r))}`);
    }
    L.push('');
  }
  L.push(`Du déboursé sec au prix de vente (aperçu) : frais de chantier ${S.fc} % → déboursé total ${eur(last.dt)} ; frais généraux ${S.fg} % → prix de revient ${eur(last.pr)} ; marge ${S.marge} % → prix de vente HT ${eur(last.pv)} (coefficient × ${last.coef.toFixed(2)}).`);
  L.push('','Calculé avec l\'outil gratuit de vision : visionbds.com/outils/debourse-sec/');
  return L.join('\n');
}
$('ds-copy').addEventListener('click',async e=>{
  const b=e.currentTarget, r=await copyToClipboard(recap(),$('ds-sum'));
  b.textContent=r==='ok'?'Copié ✓':'Sélectionnez et copiez';if(r==='ok')b.classList.add('ok');setTimeout(()=>{b.textContent='Copier le récapitulatif';b.classList.remove('ok')},2200);
});
$('ds-print').addEventListener('click',()=>{
  const w=window.open('','_blank'); if(!w) return;
  w.document.open();
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc('Déboursé sec'+(S.nom?' — '+S.nom:''))}</title><style>body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#111;margin:28px;white-space:pre-wrap;line-height:1.5}</style></head><body>${esc(recap())}</body></html>`);
  w.document.close();w.focus();setTimeout(()=>w.print(),400);
});

renderAll();
})();
