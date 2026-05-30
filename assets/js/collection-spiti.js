
const photos = [
  { src:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1800&q=85', title:'Cold Geometry — Spiti Panorama', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/400s · f/8 · ISO 100' },
  { src:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80', title:'Mountain Lake', loc:'Chandratal, 4,250m', cam:'Sony α7R V', exp:'1/250s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80', title:'Into the Unknown', loc:'Kunzum Pass', cam:'Sony α7R V', exp:'1/125s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80', title:'Last Gold', loc:'Langza Village', cam:'Sony α7R V', exp:'1/60s · f/11 · ISO 100' },
  { src:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80', title:'High Pass', loc:'Kunzum La, 4,551m', cam:'Sony α7R V', exp:'1/500s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=900&q=80', title:'Pin Valley', loc:'Pin River Valley', cam:'Sony α7R V', exp:'1/320s · f/6.3 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80', title:'Key Monastery at −16°C', loc:'Key Monastery, 4,166m', cam:'Sony α7R V', exp:'1/80s · f/2 · ISO 1600' },
  { src:'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=900&q=80', title:'The River That Forgot', loc:'Spiti River, near Kaza', cam:'Sony α7R V', exp:'1/400s · f/4 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80', title:'Winter Canopy', loc:'Nako, HP', cam:'Sony α7R V', exp:'1/60s · f/4 · ISO 640' },
  { src:'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=700&q=80', title:'Frozen Veins', loc:'Spiti Gorge', cam:'Sony α7R V', exp:'4s · f/11 · ISO 50' },
  { src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80', title:'Snow Cathedral', loc:'Pin Valley Forest', cam:'Sony α7R V', exp:'1/30s · f/4 · ISO 1600' },
  { src:'https://images.unsplash.com/photo-1467579424161-6bbc141569d7?w=700&q=80', title:'Barren Peaks', loc:'Chicham, 4,200m', cam:'Sony α7R V', exp:'1/200s · f/6.3 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1515897349795-4671689a14b2?w=700&q=80', title:'Rock and Ice', loc:'Losar Village', cam:'Sony α7R V', exp:'1/320s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1439853949212-36589f9bba1c?w=700&q=80', title:'Ice Architecture', loc:'Tabo, HP', cam:'Sony α7R V', exp:'2s · f/11 · ISO 100' },
  { src:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80', title:'The Watcher', loc:'Komic, 4,520m', cam:'Sony α7R V', exp:'1/250s · f/5.6 · ISO 400' },
  { src:'https://images.unsplash.com/photo-1468022379898-29044f51d3a3?w=700&q=80', title:'Blue Dawn', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/30s · f/1.4 · ISO 3200' },
];

let currentLb = 0;
function openLb(idx) { currentLb=idx; document.getElementById('lbImg').src=photos[idx].src; document.getElementById('lbTitle').textContent=photos[idx].title+' · '+photos[idx].loc; document.getElementById('lbSpecs').innerHTML=`<span class="lb-spec"><strong>Camera</strong>${photos[idx].cam}</span><span class="lb-spec"><strong>Exposure</strong>${photos[idx].exp}</span>`; document.getElementById('lightbox').classList.add('open'); document.body.style.overflow='hidden'; }
function lbNav(dir) { currentLb=(currentLb+dir+photos.length)%photos.length; openLb(currentLb); }
document.getElementById('lbClose').addEventListener('click',()=>{ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; });
document.getElementById('lightbox').addEventListener('click',e=>{ if(e.target===document.getElementById('lightbox')){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; } });
document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') lbNav(1); if(e.key==='ArrowLeft') lbNav(-1); if(e.key==='Escape'){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; } });

window.addEventListener('scroll',()=>{ document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>60); document.getElementById('progress-bar').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%'; });

const obs=new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{ threshold:.1 });
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let rx=0,ry=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{ cx=e.clientX;cy=e.clientY;cur.style.left=cx+'px';cur.style.top=cy+'px'; });
(function a(){ rx+=(cx-rx)*.12;ry+=(cy-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a); })();
document.querySelectorAll('a,button,.gallery-item,.bts-img,.masonry-item,.related-card,.gallery-hero').forEach(el=>{ el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';cur.style.background='transparent';cur.style.border='1px solid var(--ice)';}); el.addEventListener('mouseleave',()=>{cur.style.width='8px';cur.style.height='8px';cur.style.background='var(--ice)';cur.style.border='none';}); });
