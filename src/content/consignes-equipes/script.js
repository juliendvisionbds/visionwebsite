

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
   OUTIL — CONSIGNES POUR LES ÉQUIPES
   Consigne collée → français simplifié + traductions (POST /api/outils/consignes-equipes),
   affiche par langue éditable, version courte WhatsApp, impression A4, copie, Word.
   ============================================================ */
(()=>{
const form=document.getElementById('ce-form'); if(!form) return;
const $=id=>document.getElementById(id);
const out=$('ce-out');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const LANGS={pt:['Portugais','Português'],ro:['Roumain','Română'],ar:['Arabe','العربية',1],en:['Anglais','English'],es:['Espagnol','Español'],pl:['Polonais','Polski'],tr:['Turc','Türkçe'],uk:['Ukrainien','Українська'],sq:['Albanais','Shqip'],it:['Italien','Italiano'],bg:['Bulgare','Български'],ru:['Russe','Русский'],bn:['Bengali','বাংলা'],ur:['Ourdou','اردو',1]};
const TYPE_LABEL={securite:'Sécurité',procedure:'Procédure',regles:'Règle du chantier',info:'Information',autre:'Consigne'};
const TYPE_T={pt:{securite:'Segurança',procedure:'Procedimento',regles:'Regra do estaleiro',info:'Informação',autre:'Instrução'},en:{securite:'Safety',procedure:'Procedure',regles:'Site rule',info:'Information',autre:'Instruction'},es:{securite:'Seguridad',procedure:'Procedimiento',regles:'Norma de obra',info:'Información',autre:'Instrucción'},it:{securite:'Sicurezza',procedure:'Procedura',regles:'Regola di cantiere',info:'Informazione',autre:'Istruzione'},ro:{securite:'Siguranță',procedure:'Procedură',regles:'Regulă de șantier',info:'Informație',autre:'Instrucțiune'},pl:{securite:'Bezpieczeństwo',procedure:'Procedura',regles:'Zasada na budowie',info:'Informacja',autre:'Instrukcja'},tr:{securite:'Güvenlik',procedure:'Prosedür',regles:'Şantiye kuralı',info:'Bilgi',autre:'Talimat'},uk:{securite:'Безпека',procedure:'Процедура',regles:'Правило майданчика',info:'Інформація',autre:'Інструкція'},ru:{securite:'Безопасность',procedure:'Процедура',regles:'Правило площадки',info:'Информация',autre:'Инструкция'},bg:{securite:'Безопасност',procedure:'Процедура',regles:'Правило на обекта',info:'Информация',autre:'Инструкция'},sq:{securite:'Siguri',procedure:'Procedurë',regles:'Rregull i kantierit',info:'Informacion',autre:'Udhëzim'},ar:{securite:'السلامة',procedure:'إجراء',regles:'قاعدة الورشة',info:'معلومة',autre:'تعليمات'},ur:{securite:'حفاظت',procedure:'طریقہ کار',regles:'سائٹ کا اصول',info:'اطلاع',autre:'ہدایت'},bn:{securite:'নিরাপত্তা',procedure:'পদ্ধতি',regles:'সাইটের নিয়ম',info:'তথ্য',autre:'নির্দেশ'}};
const WHY={pt:'Porquê',en:'Why',es:'Por qué',it:'Perché',ro:'De ce',pl:'Dlaczego',tr:'Neden',uk:'Чому',ru:'Почему',bg:'Защо',sq:'Pse',ar:'لماذا',ur:'کیوں',bn:'কেন'};
const PROB={pt:'Em caso de problema',en:'If there is a problem',es:'En caso de problema',it:'In caso di problema',ro:'În caz de problemă',pl:'W razie problemu',tr:'Sorun olursa',uk:'У разі проблеми',ru:'В случае проблемы',bg:'При проблем',sq:'Në rast problemi',ar:'في حال وجود مشكلة',ur:'مسئلہ ہونے پر',bn:'সমস্যা হলে'};

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

/* compteur, langues (5 max) */
const consigne=$('ce-consigne'), count=$('ce-count');
const updateCount=()=>{count.textContent=consigne.value.length.toLocaleString('fr-FR')};
consigne.addEventListener('input',updateCount);updateCount();
const langBoxes=[...$('ce-langs').querySelectorAll('input')];
const selectedLangs=()=>langBoxes.filter(b=>b.checked).map(b=>b.value);
const syncLangs=()=>{const n=selectedLangs().length;langBoxes.forEach(b=>{b.disabled=!b.checked&&n>=5})};
langBoxes.forEach(b=>b.addEventListener('change',syncLangs));syncLangs();

/* exemple */
const EXAMPLE=`NOTE DE SERVICE – TRAVAUX EN HAUTEUR
Conformément aux articles R4323-58 et suivants du Code du travail, le port du harnais antichute relié à un point d'ancrage validé est obligatoire pour toute intervention à plus de 3 mètres de hauteur en l'absence de protection collective (garde-corps, filets). Avant chaque utilisation, le harnais, la longe et l'absorbeur d'énergie doivent faire l'objet d'une vérification visuelle (coutures, sangles, mousquetons). Tout équipement présentant une anomalie est immédiatement retiré du service et signalé au chef de chantier. L'ancrage sur les garde-corps provisoires, sur les échafaudages non prévus à cet effet ou sur des éléments de charpente non validés est strictement interdit. Les échelles ne constituent pas un poste de travail. En cas de doute, l'intervention est suspendue jusqu'à validation par le responsable sécurité (M. Ferreira, 06 00 00 00 00).`;
$('ce-example').addEventListener('click',()=>{
  $('ce-type').value='securite';$('ce-chantier').value='Résidence Les Oliviers';$('ce-entreprise').value='Durand Construction';
  langBoxes.forEach(b=>{b.checked=['pt','ro','ar'].includes(b.value)});syncLangs();
  consigne.value=EXAMPLE;updateCount();consigne.focus();
});

/* ——— rendu ——— */
let R=null, CTX=null;
function affiche(v,code){
  const rtl=code&&LANGS[code]?.[2], type=CTX.type;
  const typeLabel=code?(TYPE_T[code]?.[type]||TYPE_LABEL[type]):TYPE_LABEL[type];
  const why=code?(WHY[code]||'Pourquoi'):'Pourquoi', prob=code?(PROB[code]||'En cas de problème'):'En cas de problème';
  const foot=[CTX.entreprise,CTX.chantier,new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})].filter(Boolean);
  return `<article class="ce-affiche" contenteditable="true" spellcheck="false" lang="${code||'fr'}"${rtl?' dir="rtl"':''}>
    <span class="ce-type ${esc(type)}">${esc(typeLabel)}</span>
    <h2>${esc(v.titre)}</h2>
    <ol>${v.etapes.map(e=>`<li>${esc(e)}</li>`).join('')}</ol>
    ${v.pourquoi?`<p class="ce-why"><b>${esc(why)} :</b> ${esc(v.pourquoi)}</p>`:''}
    ${v.contact?`<p class="ce-contact"><b>${esc(prob)} :</b> ${esc(v.contact)}</p>`:''}
    <div class="ce-foot"><span>${esc(foot.join(' · '))}</span><span>${code?esc(LANGS[code][1])+' · ':''}Français simplifié</span></div>
  </article>`;
}
function pane(v,code,on){
  const rtl=code&&LANGS[code]?.[2];
  return `<div class="ce-pane${on?' on':''}" data-code="${code||'fr'}">
    ${affiche(v,code)}
    ${v.court?`<div class="ce-court"${rtl?' dir="rtl"':''}><span class="k">Version courte · SMS, WhatsApp</span><pre contenteditable="true" spellcheck="false" lang="${code||'fr'}">${esc(v.court)}</pre><div class="ce-court-foot"><small>${v.court.length} caractères</small><button type="button" class="ce-btn ce-copy-court">Copier</button></div></div>`:''}
  </div>`;
}
function render(r,source){
  R=r;
  const tabs=[['fr','Français simplifié'],...r.traductions.map(t=>[t.code,`${LANGS[t.code][1]} · ${LANGS[t.code][0]}`])];
  out.innerHTML=`<div class="ce-tools">
      <span class="ce-status${source==='ai'?'':' std'}">${source==='ai'?'Versions produites par IA. Relisez, et faites relire les traductions par un locuteur natif.':'Modèle vierge.'}</span>
      <div class="ce-btns">
        <button type="button" class="ce-btn" data-act="print">Imprimer les affiches (A4)</button>
        <button type="button" class="ce-btn" data-act="text">Copier tout le texte</button>
        <button type="button" class="ce-btn" data-act="doc">Télécharger (.doc)</button>
      </div>
    </div>
    <p class="ce-hint">Vous pouvez corriger directement dans les affiches et les versions courtes : cliquez sur un mot et tapez. Les corrections sont reprises à l'impression et dans les copies.</p>
    <div class="ce-tabs" role="tablist">${tabs.map(([c,l],i)=>`<button type="button"${i===0?' class="on"':''} data-tab="${c}">${esc(l)}</button>`).join('')}</div>
    <div id="ce-panes">${pane(r.simplifie,null,true)}${r.traductions.map(t=>pane(t,t.code,false)).join('')}</div>
    <div class="ce-side">
      ${r.glossaire.length?`<div class="ce-gloss"><span class="k">Mots expliqués</span><dl>${r.glossaire.map(g=>`<div><dt>${esc(g.mot)}</dt> : <dd>${esc(g.explication)}</dd></div>`).join('')}</dl></div>`:''}
      ${r.remarques.length?`<div class="ce-rem"><span class="k">Remarques avant diffusion</span><ul>${r.remarques.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    </div>`;
  out.querySelectorAll('.ce-tabs button').forEach(b=>b.addEventListener('click',()=>{
    out.querySelectorAll('.ce-tabs button').forEach(x=>x.classList.toggle('on',x===b));
    out.querySelectorAll('.ce-pane').forEach(p=>p.classList.toggle('on',p.dataset.code===b.dataset.tab));
  }));
  out.querySelectorAll('.ce-copy-court').forEach(b=>b.addEventListener('click',async()=>{
    const pre=b.closest('.ce-court').querySelector('pre'), r=await copyToClipboard(pre.textContent,null,pre);
    b.textContent=r==='ok'?'Copié ✓':'Texte sélectionné : faites Ctrl+C';if(r==='ok')b.classList.add('ok');setTimeout(()=>{b.textContent='Copier';b.classList.remove('ok')},2200);
  }));
  out.querySelectorAll('.ce-btn[data-act]').forEach(b=>b.addEventListener('click',()=>exportAll(b)));
}

/* ——— exports : on lit le DOM, corrections comprises ——— */
function readPane(p){
  const a=p.querySelector('.ce-affiche');
  return {code:p.dataset.code,rtl:a.getAttribute('dir')==='rtl',type:a.querySelector('.ce-type')?.textContent.trim()||'',titre:a.querySelector('h2')?.textContent.trim()||'',
    etapes:[...a.querySelectorAll('ol li')].map(l=>l.textContent.trim()),pourquoi:a.querySelector('.ce-why')?.textContent.trim()||'',contact:a.querySelector('.ce-contact')?.textContent.trim()||'',
    foot:a.querySelector('.ce-foot span')?.textContent.trim()||'',court:p.querySelector('.ce-court pre')?.textContent.trim()||''};
}
const allPanes=()=>[...out.querySelectorAll('.ce-pane')].map(readPane);
function toText(){
  return allPanes().map(v=>[`=== ${v.code==='fr'?'FRANÇAIS SIMPLIFIÉ':LANGS[v.code][1].toUpperCase()+' · '+LANGS[v.code][0]} ===`,v.type,'',v.titre.toUpperCase(),'',...v.etapes.map((e,i)=>`${i+1}. ${e}`),'',v.pourquoi,v.contact,'',v.court?'SMS / WhatsApp : '+v.court:'',''].filter(x=>x!==undefined).join('\n')).join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
function posterHtml(v,fr){
  const dir=v.rtl?' dir="rtl"':'';
  const block=(x,small)=>`<div class="p${small?' small':''}"${x.rtl?' dir="rtl"':''}><span class="t">${esc(x.type)}</span><h1>${esc(x.titre)}</h1><ol>${x.etapes.map(e=>`<li>${esc(e)}</li>`).join('')}</ol>${x.pourquoi?`<p class="why">${esc(x.pourquoi)}</p>`:''}${x.contact?`<p class="contact">${esc(x.contact)}</p>`:''}</div>`;
  return `<section class="page"${dir}>${block(v)}${fr&&v.code!=='fr'?`<hr>${block(fr,true)}`:''}<footer>${esc(v.foot)}</footer></section>`;
}
function docHtml(){
  const panes=allPanes(), fr=panes.find(p=>p.code==='fr');
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc((fr?.titre||'Consigne')+' – affiches')}</title>
<style>@page{size:A4;margin:16mm}body{font-family:Arial,Helvetica,sans-serif;color:#111;margin:0}.page{page-break-after:always;padding:0 0 10mm;min-height:250mm;display:flex;flex-direction:column}.page:last-child{page-break-after:auto}
.t{display:inline-block;font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;border:2px solid #111;padding:4px 10px;border-radius:6px}h1{font-size:34px;line-height:1.1;margin:14px 0 18px}ol{padding-left:0;list-style:none;counter-reset:s;margin:0}
ol li{counter-increment:s;display:flex;gap:14px;align-items:flex-start;font-size:21px;line-height:1.35;margin:0 0 12px}ol li::before{content:counter(s);flex:none;width:34px;height:34px;border-radius:50%;background:#111;color:#fff;font-weight:bold;display:flex;align-items:center;justify-content:center;font-size:18px}
[dir=rtl] ol li{text-align:right}[dir=rtl] h1,[dir=rtl] p{text-align:right}.why{margin:18px 0 0;padding:12px 14px;background:#f2f2f2;border-radius:10px;font-size:16px}.contact{font-size:17px;font-weight:bold;margin:10px 0 0}
hr{border:0;border-top:1px dashed #999;margin:18px 0}.small h1{font-size:20px;margin:8px 0 10px}.small ol li{font-size:14px;margin-bottom:6px}.small ol li::before{width:24px;height:24px;font-size:13px}.small .why,.small .contact{font-size:13px}.small .t{font-size:10px}
footer{margin-top:auto;padding-top:10px;border-top:1px solid #ccc;font-size:11px;color:#666}</style></head><body>${panes.map(v=>posterHtml(v,fr)).join('')}</body></html>`;
}
async function exportAll(btn){
  const act=btn.dataset.act, done=label=>{const t=btn.textContent;btn.textContent=label;btn.classList.add('ok');setTimeout(()=>{btn.textContent=t;btn.classList.remove('ok')},2200)};
  const manual=()=>{const t=btn.textContent;btn.textContent='Texte sélectionné : faites Ctrl+C';setTimeout(()=>{btn.textContent=t},2600)};
  try{
    if(act==='text'){(await copyToClipboard(toText(),null,$('ce-panes')))==='ok'?done('Copié ✓'):manual()}
    else if(act==='doc'){const blob=new Blob(['﻿',docHtml()],{type:'application/msword'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='consignes-equipes.doc';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);done('Téléchargé ✓')}
    else if(act==='print'){const w=window.open('','_blank');if(!w)throw new Error('popup');w.document.open();w.document.write(docHtml());w.document.close();w.focus();setTimeout(()=>w.print(),500)}
  }catch{manual()}
}

/* ——— soumission ——— */
let current=0;
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const err=$('ce-err');err.hidden=true;
  const c=consigne.value.trim(), langues=selectedLangs();
  consigne.setAttribute('aria-invalid',String(c.length<20));
  if(c.length<20){err.textContent='Collez la consigne : au moins une phrase.';err.hidden=false;consigne.focus();return}
  CTX={type:$('ce-type').value,entreprise:$('ce-entreprise').value.trim(),chantier:$('ce-chantier').value.trim(),langues};
  current++; const token=current;
  const go=$('ce-go'); go.disabled=true;
  out.innerHTML=`<div class="ce-busy"><span class="blip" data-pose="carry" data-color="honey"></span><div class="ce-spin" aria-hidden="true"></div><b>Réécriture et traduction</b><p>Français simplifié d'abord, puis ${langues.length?langues.length+' langue'+(langues.length>1?'s':''):'aucune traduction'}. Comptez quinze à trente secondes.</p></div>`;
  out.querySelectorAll('.blip').forEach(el=>{el.innerHTML=blipSVG(el.dataset.pose,el.dataset.color)});
  out.scrollIntoView({behavior:'smooth',block:'start'});
  const ctrl=new AbortController(), timer=setTimeout(()=>ctrl.abort(),90000);
  try{
    const res=await fetch('/api/outils/consignes-equipes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consigne:c,type:CTX.type,langues,entreprise:CTX.entreprise,chantier:CTX.chantier}),signal:ctrl.signal});
    if(token!==current) return;
    const data=await res.json().catch(()=>({}));
    if(!res.ok||!data.result) throw new Error(data.error||('HTTP '+res.status));
    render(data.result,'ai');
  }catch(ex){
    if(token!==current) return;
    const msg=ex.name==='AbortError'?'La rédaction a pris trop de temps.':(ex.message||'Rédaction indisponible.');
    out.innerHTML=`<div class="ce-fail"><b>Les versions n'ont pas pu être produites</b><p>${esc(msg)} Réessayez dans un instant.</p></div>`;
  }finally{clearTimeout(timer);go.disabled=false}
});
})();
