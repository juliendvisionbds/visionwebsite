/* Moteur du quiz : src/lib/quiz-engine.ts, exposé par QuizPage sur window.VQ. */
const {METIERS,TAILLES,DOULEURS,OU,QUI,OUTILS,BLOCAGES,FREQ,vqBlocage,vqPlan,vqSummary}=window.VQ;
const byId=(arr,id)=>arr.find(x=>x.id===id);
const VQ_KEY='vision_quiz_v1';
const VQ_DEMO={metier:'electricite',taille:'6-15',douleurs:['devis','factures'],blocage:'prix',
  ou:'excel',qui:'dirigeant',outils:['excel','emails'],frequence:2,email:'contact@exemple.fr'};
const vqLoad=()=>{try{return JSON.parse(localStorage.getItem(VQ_KEY))||null}catch(e){return null}};
const vqSave=s=>{try{localStorage.setItem(VQ_KEY,JSON.stringify(s))}catch(e){}};
/* page ouverte directement (sans passer par le quiz) : on affiche un exemple */
const vqState=()=>{const s=vqLoad();return (s&&s.metier&&s.douleurs&&s.douleurs.length&&s.blocage)?s:{...VQ_DEMO,demo:true}};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ——— configuration ——— */
const NEXT_URL='/commencer/apercu';

let S=vqLoad()||{};
if(!S.douleurs) S.douleurs=[];
if(!S.outils) S.outils=[];
let step=0;

const STEPS=[
 {key:'metier',title:()=>'Quel est votre métier principal ?',type:'single',opts:()=>METIERS.map(o=>({id:o.id,label:o.label}))},
 {key:'taille',title:()=>'Combien de personnes travaillent dans votre entreprise ?',type:'single',one:true,opts:()=>TAILLES},
 {key:'douleurs',title:()=>"Qu'est-ce qui vous prend trop de temps aujourd'hui ?",hint:()=>"Jusqu'à 2 choix. Le premier oriente les questions suivantes.",type:'multi',max:2,one:true,opts:()=>DOULEURS},
 {key:'blocage',title:()=>BLOCAGES[S.douleurs[0]].q,hint:()=>'La réponse la plus proche de votre quotidien.',type:'single',one:true,opts:()=>BLOCAGES[S.douleurs[0]].opts},
 {key:'orga',title:()=>`Comment ça s'organise aujourd'hui, pour ${byId(DOULEURS,S.douleurs[0]).low} ?`,type:'groups',groups:[
   {key:'ou',label:'Où se trouvent les informations dont vous avez besoin ?',opts:()=>OU},
   {key:'qui',label:"Qui s'en occupe ?",opts:()=>QUI}]},
 {key:'outils',title:()=>'Quels outils utilisez-vous pour gérer tout ça ?',hint:()=>'Plusieurs choix possibles.',type:'multi',max:6,opts:()=>OUTILS},
 {key:'frequence',title:()=>FREQ[S.douleurs[0]].q,type:'single',one:true,opts:()=>FREQ[S.douleurs[0]].opts.map((l,i)=>({id:i,label:l}))}
];
const POSES=[['look','yellow'],['default','orange'],['carry','yellow'],['look','amber'],['wave','orange'],['roller','yellow'],['carry','amber']];

const stage=document.getElementById('stage'), back=document.getElementById('back');
const prog=document.getElementById('prog'); prog.innerHTML=STEPS.map(()=>'<i></i>').join('');

function answered(i){const st=STEPS[i];
  if(st.type==='groups') return st.groups.every(g=>S[g.key]!=null);
  if(st.type==='multi') return (S[st.key]||[]).length>0;
  return S[st.key]!=null;}

function optHTML(o,i,sel,type,extra=''){
  return `<button class="opt ${type==='single'?'radio':''}" data-id="${o.id}" aria-pressed="${sel}" ${extra}>
    <span class="key" aria-hidden="true">${i+1}</span>
    <span class="lb"><b>${esc(o.label)}</b>${o.hint?`<small>${esc(o.hint)}</small>`:''}</span>
    <span class="tick" aria-hidden="true"></span></button>`;}

function render(){
  const st=STEPS[step];
  document.getElementById('qcount').textContent=`Question ${step+1} sur ${STEPS.length}`;
  [...prog.children].forEach((b,i)=>{b.className=i<step?'on':i===step?'cur':''});
  back.hidden=step===0;
  const [pose,color]=POSES[step];
  let h=`<div class="qnum"><span class="blip" data-pose="${pose}" data-color="${color}"></span>Question ${step+1}</div>
    <h1 class="qtitle">${esc(st.title())}</h1>${st.hint?`<p class="qhint">${esc(st.hint())}</p>`:''}`;
  if(st.type==='groups'){
    st.groups.forEach(g=>{h+=`<div class="group" data-g="${g.key}"><h2>${esc(g.label)}</h2><div class="opts" role="group" aria-label="${esc(g.label)}">
      ${g.opts().map((o,i)=>optHTML(o,i,S[g.key]===o.id,'single')).join('')}</div></div>`});
  }else{
    const list=st.opts(), cur=S[st.key];
    h+=`<div class="opts ${st.one||list.length<5?'one':''}" role="group">`+list.map((o,i)=>{
      let sel=false,extra='';
      if(st.type==='multi'){const arr=cur||[];sel=arr.includes(o.id);
        const r=arr.indexOf(o.id); if(st.max===2&&r>-1) extra='data-rank="'+(r===0?'1er choix':'2e choix')+'"';
        if(!sel&&arr.length>=st.max&&st.max<list.length) extra+=' aria-disabled="true"';}
      else sel=cur===o.id;
      return optHTML(o,i,sel,st.type,extra);}).join('')+`</div>`;
  }
  if(st.type!=='single'){
    h+=`<div class="qnext"><button class="btn btn-primary" id="next" ${answered(step)?'':'disabled'}>${step===STEPS.length-1?'Voir mon aperçu':'Continuer'} <span class="arw">→</span></button>
      <span class="note">ou appuyez sur Entrée</span></div>`;
  }
  stage.innerHTML=h;
  stage.querySelectorAll('.opt[data-rank]').forEach(b=>b.querySelector('.tick').insertAdjacentHTML('beforebegin',`<span class="rank">${b.dataset.rank}</span>`));
  if(typeof blipSVG==='function'&&window.__ready) drawBlips(stage);
  bind(); paintProfile();
}

function bind(){
  const st=STEPS[step];
  stage.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>{
    if(b.getAttribute('aria-disabled')==='true') return;
    const raw=b.dataset.id, id=st.key==='frequence'?+raw:raw;
    if(st.type==='groups'){const g=b.closest('.group').dataset.g;S[g]=id;save();render();return;}
    if(st.type==='multi'){
      const arr=S[st.key]; const i=arr.indexOf(id);
      if(i>-1) arr.splice(i,1); else if(arr.length<st.max) arr.push(id);
      if(st.key==='douleurs'&&arr[0]!==S._main){S.blocage=null;S.frequence=null;S._main=arr[0];}
      save();render();return;}
    S[st.key]=id; save(); render(); setTimeout(()=>go(1),260);
  }));
  const nx=document.getElementById('next'); if(nx) nx.addEventListener('click',()=>go(1));
}

function go(d){
  if(d>0&&!answered(step)) return;
  if(d>0&&step===STEPS.length-1){finish();return;}
  stage.classList.add('leave');
  setTimeout(()=>{step=Math.max(0,Math.min(STEPS.length-1,step+d));render();stage.classList.remove('leave');
    window.scrollTo({top:0,behavior:'smooth'});stage.querySelector('.opt')?.focus({preventScroll:true});},200);
}
back.addEventListener('click',()=>go(-1));
function save(){vqSave(S)}

/* raccourcis clavier : 1–9 pour choisir, Entrée pour continuer */
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.metaKey||e.ctrlKey) return;
  const n=parseInt(e.key,10); const btns=[...stage.querySelectorAll('.opt')];
  if(n>=1&&n<=btns.length&&STEPS[step].type!=='groups'){btns[n-1].click();}
  if(e.key==='Enter'&&document.getElementById('next')&&document.activeElement.classList.contains('opt')===false){go(1);}
});

/* ——— panneau profil ——— */
function paintProfile(){
  const main=S.douleurs[0];
  const rows=[
   ['Métier',S.metier&&byId(METIERS,S.metier).label],
   ['Taille',S.taille&&byId(TAILLES,S.taille).chip],
   ['Ce qui prend du temps',S.douleurs.length&&S.douleurs.map(d=>byId(DOULEURS,d).short).join(' + ')],
   ['Point bloquant',main&&S.blocage&&(byId(BLOCAGES[main].opts,S.blocage)||{}).label],
   ['Organisation',S.ou&&S.qui&&(byId(OU,S.ou).label+', géré par '+byId(QUI,S.qui).short)],
   ['Outils',S.outils.length&&S.outils.map(o=>byId(OUTILS,o).label.split(' ou ')[0]).join(', ')],
   ['Volume',main&&S.frequence!=null&&(FREQ[main].opts[S.frequence]+FREQ[main].unit)]
  ];
  const dl=document.getElementById('prows'); const prev=[...dl.querySelectorAll('dd')].map(d=>d.textContent);
  dl.innerHTML=rows.map(([k,v],i)=>`<div class="prow ${v?'done':'empty'} ${v&&prev[i]!==undefined&&prev[i]!==v?'flash':''}"><span class="tk"></span><div><dt>${k}</dt><dd>${v?esc(v):'—'}</dd></div></div>`).join('');
}

/* ——— fin : court moment d'analyse, puis aperçu ——— */
function finish(){
  save(); back.hidden=true;
  [...prog.children].forEach(b=>b.className='on');
  document.getElementById('qcount').textContent='Analyse de vos réponses';
  const plan=vqPlan(S);
  const items=[
    `${byId(METIERS,S.metier).label}, ${byId(TAILLES,S.taille).chip.toLowerCase()} : pris en compte`,
    `Point bloquant identifié : ${vqBlocage(S).label.toLowerCase()}`,
    `Organisation et outils croisés avec vos réponses`,
    `${plan.priorities.length} piste${plan.priorities.length>1?'s':''} retenue${plan.priorities.length>1?'s':''} pour votre plan`];
  stage.innerHTML=`<div class="analyse"><div class="qnum"><span class="blip hop" data-pose="carry" data-color="yellow"></span>Presque terminé</div>
    <h1 class="qtitle">On prépare votre aperçu</h1>
    <ul class="tape" id="atape">${items.map(t=>`<li><span class="tk"></span><span class="tx">${esc(t)}</span></li>`).join('')}</ul></div>`;
  drawBlips(stage);
  const lis=[...document.querySelectorAll('#atape li')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  lis.forEach((li,i)=>setTimeout(()=>li.classList.add('done'),reduce?0:450+i*420));
  setTimeout(()=>{location.href=NEXT_URL},reduce?300:450+lis.length*420+500);
}

render();
setTimeout(()=>{window.__ready=true},0);

/* ============================================================
   BASE VISION — système des engins (identique au site)
   ============================================================ */
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
setTimeout(()=>document.querySelectorAll('.hero .sq, .drawnow .sq').forEach(s=>s.classList.add('drawn')),700);

/* faq */
document.querySelectorAll('.q button').forEach(b=>{
  b.addEventListener('click',()=>{
    const q=b.parentElement, ans=q.querySelector('.ans'), open=q.classList.contains('open');
    document.querySelectorAll('.q.open').forEach(o=>{o.classList.remove('open');o.querySelector('.ans').style.maxHeight=null});
    if(!open){q.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
  });
});


/* re-dessine les engins ajoutés dynamiquement */
function drawBlips(root){(root||document).querySelectorAll('.blip:not([data-drawn])').forEach(el=>{
  el.innerHTML=blipSVG(el.dataset.pose||'default',el.dataset.color||'brand');el.dataset.drawn='1';});}

document.querySelectorAll('.blip').forEach(el=>el.dataset.drawn='1');
