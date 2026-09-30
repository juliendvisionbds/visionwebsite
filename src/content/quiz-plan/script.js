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

/* ——— configuration ———
   BOOKING_URL : lien Cal.com ou Calendly. S'il est renseigné, le calendrier réel s'affiche dans la page,
   prérempli avec l'email et le résumé des réponses (paramètres email, name, notes pour Cal.com ; a1 pour Calendly).
   Laissé vide : un sélecteur de créneaux de démonstration s'affiche. */
const BOOKING_URL='https://calendly.com/juliend-visionbds/30min';
/* Enregistre la demande de créneau (Supabase) et prévient l'équipe + le client (Resend). Mode démo uniquement. */
async function sendBooking(data){
  try{
    const res=await fetch('/api/quiz/booking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    return res.ok;
  }catch(e){console.error('quiz booking error:',e);return false}
}

const S=vqState(); const P=vqPlan(S);
const $=id=>document.getElementById(id);
if(S.demo) $('demo').hidden=false;
$('sent-t').innerHTML=S.email&&!S.demo?`Votre plan a aussi été envoyé à <b>${esc(S.email)}</b>.`:'Votre plan vous sera aussi envoyé par email.';
$('tl1').textContent=S.email&&!S.demo?`Il a aussi été envoyé à ${S.email}, pour le retrouver plus tard.`:'Vous le retrouverez aussi dans votre boîte mail.';
$('recap').innerHTML=P.recap.map(r=>`<span>${esc(r)}</span>`).join('');
$('diff').textContent=P.difficulte;

const blocks=(p,full)=>`<dl class="blocks">
  <div class="blk why full"><dt>${full===false?'Pourquoi':'Pourquoi commencer ici'}</dt><dd>${esc(p.pourquoi)}</dd></div>
  <div class="blk"><dt>Ce qui pourrait être automatisé</dt><dd>${esc(p.auto)}</dd></div>
  <div class="blk"><dt>${P.gardeLabel}</dt><dd>${esc(p.garde)}</dd></div>
  <div class="blk act"><dt>Votre première action</dt><dd>${esc(p.action)}</dd></div></dl>`;

const p1=P.priorities[0];
$('p1').innerHTML=`<span class="blip p1-blip" data-pose="look" data-color="orange"></span>
  <div class="ptop"><span class="prio-n">01</span><span class="ptag">${esc(p1.painShort)}</span></div>
  <h2>${esc(p1.titre)}</h2>${blocks(p1)}`;

const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
$('call-h').textContent=`Voyons comment ${p1.appel} chez vous.`;
$('book-h').textContent=`Voyons comment ${p1.appel} chez vous.`;
$('call-l1').textContent=`Vérifier comment elle peut fonctionner avec ${P.avec}.`;
$('book-l1').textContent=`Vérifier comment votre première priorité peut fonctionner avec ${P.avec}.`;
$('oinc').innerHTML=[
  `<b>Votre priorité 01</b> : ${esc(p1.court||p1.titre.toLowerCase())}`,
  `Son fonctionnement avec ${esc(P.avec)}`,
  'Les informations et accès nécessaires',
  "Le périmètre d'une première mise en place"].map(x=>`<li><span>${x}</span></li>`).join('');

/* priorités 2 et 3 : compactes, détail en libre accès */
const rest=P.priorities.slice(1);
let mh='';
if(rest.length){
  mh+=`<h2 class="sh">${rest.length===2?'Vos deux autres priorités':'Votre deuxième priorité'}</h2>`;
  rest.forEach((p,i)=>{const ss=p.pourquoi.split(/(?<=\.)\s+/);
    mh+=`<article class="pc"><div class="ptop"><span class="prio-n">0${i+2}</span><span class="ptag">${esc(p.painShort)}</span></div>
    <h3>${esc(p.titre)}</h3><p class="sum">${esc(ss[0])}</p>
    <button class="tog" aria-expanded="false">Voir le détail <i>›</i></button><div class="det">${blocks({...p,pourquoi:ss.slice(1).join(' ')||ss[0]},false)}</div></article>`;});
}
if(P.priorities.length<3){
  mh+=`<div class="honest"><span class="blip" data-pose="sleep" data-color="amber"></span><p>Vos réponses font ressortir ${P.priorities.length===1?'une piste solide':'deux pistes solides'}. Plutôt que d'en inventer une de plus, on s'arrête là. L'échange permettra d'en repérer d'autres si besoin.</p></div>`;
}
$('more').innerHTML=mh;
document.querySelectorAll('.pc .tog').forEach(b=>b.addEventListener('click',()=>{
  const pc=b.closest('.pc'), d=pc.querySelector('.det'), open=pc.classList.toggle('open');
  b.setAttribute('aria-expanded',open); b.firstChild.textContent=open?'Masquer le détail ':'Voir le détail ';
  d.style.maxHeight=open?d.scrollHeight+'px':null;}));

/* ce que nous aurons sous les yeux */
$('eyes').innerHTML=vqSummary(S).split('\n').filter(l=>!l.startsWith('Qui')).map(l=>{const [k,...v]=l.split(' : ');return `<dt>${esc(k)}</dt><dd>${esc(v.join(' : '))}</dd>`}).join('');

/* ——— calendrier ——— */
const cal=$('cal');
if(BOOKING_URL){
  const u=new URL(BOOKING_URL); const notes=vqSummary(S);
  if(S.email&&!S.demo) u.searchParams.set('email',S.email);
  u.searchParams.set('a1',notes);
  u.searchParams.set('embed_domain',location.hostname); u.searchParams.set('embed_type','Inline');
  u.searchParams.set('hide_gdpr_banner','1'); u.searchParams.set('primary_color','5a4bff');
  cal.classList.add('embed');
  cal.innerHTML=`<iframe src="${u.toString()}" title="Réserver mon échange" loading="lazy"></iframe>`;
}else{
  const DJ=['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'], MO=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
  const days=[]; const d=new Date(); d.setHours(0,0,0,0);
  while(days.length<6){d.setDate(d.getDate()+1); if(d.getDay()%6) days.push(new Date(d));}
  const TIMES=['09:00','10:30','14:00','16:30'];
  let dSel=0,tSel=null;
  const taken=(di,ti)=>((days[di].getDate()*7+ti*3)%5===0);
  function paint(){
    cal.innerHTML=`<h3>Choisissez un créneau</h3><p class="sub">30 minutes · heure de Paris</p>
      <div class="days" role="group" aria-label="Jour">${days.map((x,i)=>`<button class="day" data-i="${i}" aria-pressed="${i===dSel}"><small>${DJ[x.getDay()]}</small><b>${x.getDate()}</b><small>${MO[x.getMonth()]}</small></button>`).join('')}</div>
      <div class="slots" role="group" aria-label="Heure">${TIMES.map((t,i)=>`<button class="slot" data-i="${i}" aria-pressed="${i===tSel}" ${taken(dSel,i)?'disabled':''}>${t}</button>`).join('')}</div>
      <form class="bform" id="bform" ${tSel==null?'hidden':''}>
        <div class="two"><div><label for="bn">Prénom et nom</label><input id="bn" required autocomplete="name"></div>
        <div><label for="be">Entreprise</label><input id="be" required autocomplete="organization"></div></div>
        <div class="two"><div><label for="bm">Email</label><input id="bm" type="email" required autocomplete="email" value="${S.email&&!S.demo?esc(S.email):''}"></div>
        <div><label for="bt">Téléphone <span style="font-weight:400">(facultatif)</span></label><input id="bt" type="tel" autocomplete="tel"></div></div>
        <button class="btn btn-primary" type="submit">Confirmer mon échange <span class="arw">→</span></button>
        <p class="note">Vos réponses au questionnaire sont jointes automatiquement.</p>
      </form>`;
    cal.querySelectorAll('.day').forEach(b=>b.addEventListener('click',()=>{dSel=+b.dataset.i;tSel=null;paint()}));
    cal.querySelectorAll('.slot').forEach(b=>b.addEventListener('click',()=>{tSel=+b.dataset.i;paint();$('bn').focus()}));
    const f=$('bform'); if(f) f.addEventListener('submit',async e=>{
      e.preventDefault(); if(!f.reportValidity()) return;
      const sb=f.querySelector('button[type="submit"]'); if(sb.disabled) return;
      const x=days[dSel]; const JL=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];const label=`${JL[x.getDay()]} ${x.getDate()} ${MO[x.getMonth()]} à ${TIMES[tSel].replace(':','h')}`;
      const pad=n=>String(n).padStart(2,'0');
      const email=$('bm').value.trim();
      sb.disabled=true; const sbHTML=sb.innerHTML; sb.innerHTML='Envoi…';
      const ok=await sendBooking({when:`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}T${TIMES[tSel]}`,label,
        name:$('bn').value.trim(),company:$('be').value.trim(),email,phone:$('bt').value.trim(),answers:S.demo?null:S});
      if(!ok){sb.disabled=false;sb.innerHTML=sbHTML;
        let n=f.querySelector('.berr'); if(!n){n=document.createElement('p');n.className='note berr';n.setAttribute('role','alert');n.style.color='#B3261E';f.appendChild(n)}
        n.textContent="La réservation n'a pas pu être envoyée. Réessayez, ou écrivez-nous à juliend@visionbds.com.";return;}
      cal.innerHTML=`<div class="bdone" role="status"><span class="blip hop" data-pose="wave" data-color="yellow"></span>
        <h3>Échange réservé</h3><p>${esc(label)}. Une confirmation part à ${esc(email)||'votre adresse'}.</p>
        <p>D'ici là, vous pouvez déjà faire la première action de votre plan.</p></div>`;
      drawBlips(cal);
    });
  }
  paint();
}

/* barre mobile : visible une fois la priorité 1 dépassée, masquée sur la réservation */
const mbar=$('mbar');
const vis={p1:false,book:false};
const io2=new IntersectionObserver(es=>{es.forEach(e=>{
  if(e.target.id==='p1') vis.p1=e.boundingClientRect.top<0||e.isIntersecting&&e.boundingClientRect.top<0;
  if(e.target.id==='reserver') vis.book=e.isIntersecting;});
  mbar.classList.toggle('on',vis.p1&&!vis.book);},{threshold:0});
io2.observe($('p1'));io2.observe($('reserver'));
addEventListener('scroll',()=>{vis.p1=$('p1').getBoundingClientRect().top<0;mbar.classList.toggle('on',vis.p1&&!vis.book)},{passive:true});

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
