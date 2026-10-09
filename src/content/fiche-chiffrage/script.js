

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
   OUTIL — DEMANDE CLIENT → FICHE DE CHIFFRAGE
   Demande collée → fiche structurée (POST /api/outils/fiche-chiffrage), éditable dans la page,
   exportable en texte, e-mail, Word ou impression, plus le mail de questions au client.
   ============================================================ */
(()=>{
const form=document.getElementById('fc-form'); if(!form) return;
const $=id=>document.getElementById(id);
const out=$('fc-out');
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
const demande=$('fc-demande'), count=$('fc-count');
const updateCount=()=>{count.textContent=demande.value.length.toLocaleString('fr-FR')};
demande.addEventListener('input',updateCount);updateCount();

/* exemple */
const EXAMPLE=`Bonjour,
Nous souhaitons refaire la salle de bain de notre maison à Hyères (maison de 1985, la salle de bain est à l'étage). Aujourd'hui il y a une baignoire, on voudrait une douche à l'italienne à la place, refaire le carrelage au sol et sur les murs, changer le meuble vasque et le WC. La pièce fait environ 6 m². Il faudrait aussi voir pour la VMC qui ne fonctionne plus.
Nous aimerions que ce soit fait avant Noël si possible. Nous avons un budget d'environ 9 000 €. Nous avons déjà repéré un carrelage chez Leroy Merlin.
Est-ce que vous pouvez passer voir ? Je suis disponible le mercredi après-midi.
Cordialement,
Claire Lefèvre
06 12 34 56 78`;
$('fc-example').addEventListener('click',()=>{
  $('fc-metier').value='plomberie, salle de bain, carrelage';
  $('fc-client').value='particulier';
  $('fc-entreprise').value='Durand Rénovation';
  demande.value=EXAMPLE;updateCount();demande.focus();
});

/* ——— rendu de la fiche ——— */
const li=(arr,empty)=>arr.length?`<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<p class="empty">${esc(empty)}</p>`;
const prCls=p=>p==='estimée'?'pr est':p==='à relever'?'pr rel':'pr';
function sheetHtml(s){
  const c=s.client||{}, p=s.projet||{};
  const meta=[['Client',[c.nom,c.type].filter(Boolean).join(', ')],['Contact',c.contact],['Chantier',c.adresse],['Nature des travaux',p.nature],['Existant',p.existant],['Délai souhaité',p.delai],['Budget indiqué',p.budget]].filter(([,v])=>v&&String(v).trim());
  const tr=s.travaux||[], mq=s.manquant||[];
  return `<div class="fc-head">
    <h2>${esc(s.titre||'Fiche de chiffrage')}</h2>
    <dl class="fc-meta">${meta.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
  </div>
  <div class="fc-sec"><h3>En résumé</h3><p>${esc(s.resume||'')}</p></div>
  <div class="fc-sec"><h3>Travaux demandés</h3>${tr.length?`<table><thead><tr><th>Lot</th><th>Description</th><th>Quantité</th><th>Précision</th></tr></thead><tbody>${tr.map(t=>`<tr><td data-l="Lot"><b>${esc(t.lot)}</b></td><td data-l="Description">${esc(t.description)}</td><td data-l="Quantité">${esc(t.quantite||'—')}</td><td data-l="Précision"><span class="${prCls(t.precision)}">${esc(t.precision)}</span>${t.source?`<span class="src">${esc(t.source)}</span>`:''}</td></tr>`).join('')}</tbody></table>`:'<p class="empty">Aucun poste identifié dans la demande.</p>'}</div>
  <div class="fc-sec"><h3>Contraintes</h3>${li(s.contraintes||[],'Aucune contrainte signalée.')}</div>
  <div class="fc-sec"><h3>Informations manquantes pour chiffrer</h3>${mq.length?`<ol class="fc-miss">${mq.map(m=>`<li><b>${esc(m.question)}</b>${m.pourquoi?` <span>— ${esc(m.pourquoi)}</span>`:''}</li>`).join('')}</ol>`:'<p class="empty">Rien ne manque : la demande est complète.</p>'}</div>
  <div class="fc-sec"><h3>Points de vigilance</h3>${li(s.risques||[],'Rien de particulier.')}</div>
  <div class="fc-sec"><h3>Pièces à demander</h3>${li(s.pieces||[],'Aucune.')}</div>
  <div class="fc-sec"><h3>Prochaine étape</h3><p${s.prochaine_etape?'':' class="empty"'}>${esc(s.prochaine_etape||'À décider.')}</p></div>`;
}
const BLANK={titre:'Fiche de chiffrage – …',client:{nom:'…',type:'',contact:'…',adresse:'…'},resume:'…',projet:{nature:'rénovation / neuf / dépannage',delai:'…',budget:'…',existant:'…'},
  travaux:[{lot:'Lot',description:'…',quantite:'…',precision:'à relever',source:''}],contraintes:['…'],manquant:[{question:'…',pourquoi:'…'}],risques:['…'],pieces:['Photos de …','Plans ou relevé de cotes'],prochaine_etape:'Visite technique / chiffrage sur pièces',
  mail:{objet:'Votre demande de devis : quelques questions',corps:'Bonjour,\n\nMerci pour votre demande concernant […]. Pour vous préparer un devis juste, j\'aurais besoin de quelques précisions :\n1. …\n2. …\n3. …\n\nPourriez-vous aussi m\'envoyer […] ?\n\nJe vous propose ensuite […].\n\nCordialement,\n[Prénom Nom]\n[Votre entreprise]'}};

function render(s,source){
  const m=s.mail||{};
  out.innerHTML=`<div class="fc-tools">
      <span class="fc-status${source==='ai'?'':' std'}">${source==='ai'?'Fiche produite par IA à partir de la demande. Relisez avant de chiffrer.':'Fiche vierge, à compléter.'}</span>
      <div class="fc-btns">
        <button type="button" class="fc-btn" data-act="text">Copier le texte</button>
        <button type="button" class="fc-btn" data-act="html">Copier pour e-mail</button>
        <button type="button" class="fc-btn" data-act="doc">Télécharger (.doc)</button>
        <button type="button" class="fc-btn" data-act="print">Imprimer / PDF</button>
      </div>
    </div>
    <p class="fc-hint">Vous pouvez corriger directement dans la fiche et dans le mail : cliquez sur un mot et tapez.</p>
    <article class="fc-report" id="fc-report" contenteditable="true" spellcheck="true">${sheetHtml(s)}</article>
    <div class="fc-mail">
      <span class="k">Le mail de questions au client</span>
      <div class="fc-subject" id="fc-subject" contenteditable="true">Objet : ${esc(m.objet||'Votre demande de devis : quelques questions')}</div>
      <pre class="fc-msg" id="fc-msg" contenteditable="true" spellcheck="true">${esc(m.corps||'')}</pre>
      <div class="fc-mail-foot"><small>Relisez les crochets avant d'envoyer.</small><button type="button" class="fc-btn" id="fc-copy-mail">Copier le mail</button></div>
    </div>`;
  out.querySelectorAll('.fc-btn[data-act]').forEach(b=>b.addEventListener('click',()=>exportSheet(b)));
  $('fc-copy-mail').addEventListener('click',async e=>{
    const b=e.currentTarget, text=`${$('fc-subject').textContent.trim()}\n\n${$('fc-msg').textContent}`;
    const r=await copyToClipboard(text,null,$('fc-msg'));
    b.textContent=r==='ok'?'Copié ✓':'Texte sélectionné : faites Ctrl+C';if(r==='ok')b.classList.add('ok');setTimeout(()=>{b.textContent='Copier le mail';b.classList.remove('ok')},2200);
  });
}

/* ——— exports : on lit le DOM, pour inclure les corrections faites dans la page ——— */
function domToText(){
  const rep=$('fc-report'); if(!rep) return '';
  const L=[];
  rep.querySelectorAll(':scope > .fc-head, :scope > .fc-sec').forEach(node=>{
    if(node.classList.contains('fc-head')){
      L.push(node.querySelector('h2')?.textContent.trim().toUpperCase()||'');
      node.querySelectorAll('dt').forEach(dt=>L.push(`${dt.textContent.trim()} : ${dt.nextElementSibling?.textContent.trim()||''}`));
      L.push('');
    }else{
      L.push(node.querySelector('h3')?.textContent.trim().toUpperCase()||'');
      node.querySelectorAll(':scope > p').forEach(p=>L.push(p.textContent.trim()));
      node.querySelectorAll('li').forEach((x,i)=>L.push((node.querySelector('ol')?`${i+1}. `:'- ')+x.textContent.replace(/\s+/g,' ').trim()));
      const table=node.querySelector('table');
      if(table){
        const heads=[...table.querySelectorAll('th')].map(t=>t.textContent.trim());
        table.querySelectorAll('tbody tr').forEach(tr=>{
          const cells=[...tr.querySelectorAll('td')].map(td=>td.textContent.replace(/\s+/g,' ').trim());
          L.push(cells.map((c,i)=>`${heads[i]} : ${c}`).join(' | '));
        });
      }
      L.push('');
    }
  });
  return L.join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
function domToHtml(){
  const rep=$('fc-report'); if(!rep) return '';
  const inner=rep.innerHTML
    .replace(/<table/g,'<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:13px"')
    .replace(/<h3/g,'<h3 style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#5A4BFF;margin:18px 0 6px"')
    .replace(/<dt/g,'<dt style="font-weight:bold;float:left;clear:left;width:150px"').replace(/<dd/g,'<dd style="margin:0 0 2px 160px"')
    .replace(/ contenteditable="true"| spellcheck="true"| data-l="[^"]*"/g,'');
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#111;max-width:760px">${inner}</div>`;
}
const docHtml=()=>`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc($('fc-report')?.querySelector('h2')?.textContent||'Fiche de chiffrage')}</title>
<style>body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#111;margin:24px}h2{font-size:20px}h3{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5A4BFF;margin:18px 0 6px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:6px;text-align:left;vertical-align:top}th{background:#eee}dl{overflow:hidden}dt{font-weight:bold;float:left;clear:left;width:150px}dd{margin:0 0 2px 160px}.pr{font-size:11px}.src{display:block;font-size:11px;color:#666}@media print{body{margin:0}}</style></head><body>${domToHtml()}</body></html>`;
async function exportSheet(btn){
  const act=btn.dataset.act, done=label=>{const t=btn.textContent;btn.textContent=label;btn.classList.add('ok');setTimeout(()=>{btn.textContent=t;btn.classList.remove('ok')},2200)};
  const manual=()=>{const t=btn.textContent;btn.textContent='Texte sélectionné : faites Ctrl+C';setTimeout(()=>{btn.textContent=t},2600)};
  try{
    if(act==='text'){(await copyToClipboard(domToText(),null,$('fc-report')))==='ok'?done('Copié ✓'):manual()}
    else if(act==='html'){(await copyToClipboard(domToText(),domToHtml(),$('fc-report')))==='ok'?done('Copié ✓ (collez dans votre e-mail)'):manual()}
    else if(act==='doc'){
      const blob=new Blob(['﻿',docHtml()],{type:'application/msword'});
      const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fiche-de-chiffrage.doc';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
      done('Téléchargé ✓');
    }
    else if(act==='print'){
      const w=window.open('','_blank');if(!w)throw new Error('popup');
      w.document.open();w.document.write(docHtml());w.document.close();w.focus();setTimeout(()=>w.print(),400);
    }
  }catch{manual()}
}

/* ——— soumission ——— */
let current=0;
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const err=$('fc-err');err.hidden=true;
  const d=demande.value.trim();
  demande.setAttribute('aria-invalid',String(d.length<20));
  if(d.length<20){err.textContent='Collez la demande du client : au moins quelques lignes.';err.hidden=false;demande.focus();return}
  current++; const token=current;
  const go=$('fc-go'); go.disabled=true;
  out.innerHTML=`<div class="fc-busy"><span class="blip" data-pose="look" data-color="honey"></span><div class="fc-spin" aria-hidden="true"></div><b>Analyse en cours</b><p>Lecture de la demande, découpage par lot, repérage de ce qui manque, rédaction du mail de questions. Comptez dix à vingt secondes.</p></div>`;
  out.querySelectorAll('.blip').forEach(el=>{el.innerHTML=blipSVG(el.dataset.pose,el.dataset.color)});
  out.scrollIntoView({behavior:'smooth',block:'start'});
  const ctrl=new AbortController(), timer=setTimeout(()=>ctrl.abort(),75000);
  try{
    const res=await fetch('/api/outils/fiche-chiffrage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({demande:d,metier:$('fc-metier').value.trim(),client:$('fc-client').value,entreprise:$('fc-entreprise').value.trim()}),signal:ctrl.signal});
    if(token!==current) return;
    const data=await res.json().catch(()=>({}));
    if(!res.ok||!data.sheet) throw new Error(data.error||('HTTP '+res.status));
    render(data.sheet,'ai');
  }catch(ex){
    if(token!==current) return;
    const msg=ex.name==='AbortError'?'L\'analyse a pris trop de temps.':(ex.message||'Analyse indisponible.');
    out.innerHTML=`<div class="fc-fail"><b>La fiche n'a pas pu être produite</b><p>${esc(msg)} Vous pouvez réessayer dans un instant, ou partir de la fiche vierge et la remplir à la main.</p><button type="button" class="btn btn-primary" id="fc-blank">Utiliser la fiche vierge <span class="arw">→</span></button></div>`;
    $('fc-blank').addEventListener('click',()=>render(BLANK,'blank'));
  }finally{clearTimeout(timer);go.disabled=false}
});
})();
