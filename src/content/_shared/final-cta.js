/* ——— CTA final : les réponses du mini-quiz se cochent toutes seules ——— */
(()=>{
  const opts=document.getElementById('fcta-opts');
  if(!opts||matchMedia('(prefers-reduced-motion: reduce)').matches){opts&&opts.children[0].classList.add('on');return;}
  const items=[...opts.children]; const seq=[[0],[0,1],[0,1],[],[2],[2,3],[2,3],[]]; let i=0,timer=null;
  const tick=()=>{if(!opts.isConnected){clearInterval(timer);return}items.forEach((li,k)=>li.classList.toggle('on',seq[i].includes(k)));i=(i+1)%seq.length};
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting&&!timer){tick();timer=setInterval(tick,900)}
    else if(!e.isIntersecting&&timer){clearInterval(timer);timer=null}
  })).observe(opts);
})();
