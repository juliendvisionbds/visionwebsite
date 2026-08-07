


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
document.querySelectorAll('.eyecheck').forEach(el=>{el.innerHTML=blipSVG('eyecheck','mint')});

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

/* live tape */
const POOL=[
 ['Devis n°2481 assemblé depuis la base de prix','Auto'],
 ['Facture envoyée — Copropriété Croix du Sud','Auto'],
 ['Relance J+7 sur 3 devis sans réponse','Auto'],
 ['Situation mensuelle chantier Mercantour compilée','Auto'],
 ['Compte rendu de chantier envoyé au maître d\'ouvrage','En cours'],
 ['Heures de la semaine consolidées par chantier','En cours'],
 ['Demande de prix fournisseur → 4 relances programmées','Auto'],
 ['Appel manqué → SMS de rappel envoyé','Auto']
];
const tape=document.getElementById('tape');
let cur=0;
const mk=i=>{const li=document.createElement('li');
  li.innerHTML='<span class="tk"></span><span class="tx">'+POOL[i%POOL.length][0]+'</span><span class="tag">'+POOL[i%POOL.length][1]+'</span>';
  return li};
if(tape){for(;cur<6;cur++) tape.appendChild(mk(cur));}
if(tape&&!reduce){
  setInterval(()=>{
    const f=tape.firstElementChild; if(!f) return;
    f.classList.add('done');
    setTimeout(()=>{
      f.classList.add('out');
      setTimeout(()=>{
        f.remove(); const li=mk(cur++); li.classList.add('in'); tape.appendChild(li);
        const h=document.getElementById('hrs');
        if(cur%3===0) h.textContent=parseInt(h.textContent)+1;
      },520);
    },900);
  },3200);
}

/* reveals + squiggles */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('show');
    e.target.querySelectorAll('.sq').forEach((s,i)=>setTimeout(()=>s.classList.add('drawn'),260+i*140));
    io.unobserve(e.target);
  }}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*70+'ms';io.observe(el)});
setTimeout(()=>document.querySelectorAll('.q-hero .sq').forEach(s=>s.classList.add('drawn')),700);

/* faq */
document.querySelectorAll('.q button').forEach(b=>{
  b.addEventListener('click',()=>{
    const q=b.parentElement, ans=q.querySelector('.ans'), open=q.classList.contains('open');
    document.querySelectorAll('.q.open').forEach(o=>{o.classList.remove('open');o.querySelector('.ans').style.maxHeight=null});
    if(!open){q.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
  });
});



/* ——— formulaire : envoi + état de confirmation ——— */
const form=document.getElementById('qform');
if(form){
  const errorBox=document.getElementById('f-error');
  const submitBtn=form.querySelector('.submit');
  const submitBtnHTML=submitBtn?submitBtn.innerHTML:'';

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(errorBox){errorBox.hidden=true;errorBox.textContent='';}
    if(submitBtn){submitBtn.disabled=true;submitBtn.innerHTML='Envoi en cours…';}

    const payload=Object.fromEntries(new FormData(form).entries());

    try{
      const res=await fetch('/api/send-form',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      if(!res.ok) throw new Error('send-failed');

      document.getElementById('formwrap').style.display='none';
      const d=document.getElementById('done');
      d.style.display='block';
      d.querySelectorAll('.blip').forEach(el=>{el.innerHTML=blipSVG(el.dataset.pose||'default',el.dataset.color||'yellow')});
      d.scrollIntoView({behavior:'smooth',block:'center'});
    }catch(err){
      if(errorBox){
        errorBox.hidden=false;
        errorBox.textContent="Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous directement.";
      }
      if(submitBtn){submitBtn.disabled=false;submitBtn.innerHTML=submitBtnHTML;}
    }
  });
}

