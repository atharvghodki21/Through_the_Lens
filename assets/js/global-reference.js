/* index(2).html */

/* ── GALLERY DATA ── */
const galleryData = [
  { src:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', title:'Into the Mist', cat:'mountains', loc:'Rohtang Pass, HP', cam:'Sony α7R V', exp:'1/125s f/8 ISO200' },
  { src:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', title:'Canopy Soul', cat:'forest', loc:'Silent Valley, Kerala', cam:'Sony α7R V', exp:'1/60s f/4 ISO800' },
  { src:'https://images.unsplash.com/photo-1439853949212-36589f9bba1c?w=800&q=80', title:'Silk & Stone', cat:'water', loc:'Dudhsagar, Goa', cam:'Sony α7R V', exp:'8s f/16 ISO50' },
  { src:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80', title:'The Lookout', cat:'wildlife', loc:'Kaziranga, Assam', cam:'Sony 200-600mm', exp:'1/800s f/6.3 ISO1600' },
  { src:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', title:'Cold Geometry', cat:'mountains', loc:'Spiti Valley, HP', cam:'Sony α7R V', exp:'1/400s f/5.6 ISO100' },
  { src:'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80', title:'Veil of White', cat:'water', loc:'Jog Falls, Karnataka', cam:'Sony α7R V', exp:'2s f/11 ISO100' },
  { src:'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80', title:'Ancient Light', cat:'bw', loc:'Ranthambore, RJ', cam:'Sony α7R V', exp:'1/250s f/8 ISO400' },
  { src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', title:'Cathedral', cat:'forest', loc:'Kudremukh, Karnataka', cam:'Sony α7R V', exp:'1/30s f/2.8 ISO3200' },
  { src:'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80', title:'Fury', cat:'longexposure', loc:'Bhandardara, MH', cam:'Sony α7R V', exp:'4s f/11 ISO50' },
  { src:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title:'Mirror World', cat:'mountains', loc:'Pangong, Ladakh', cam:'Sony α7R V', exp:'1/250s f/8 ISO200' },
  { src:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', title:'Last Gold', cat:'bw', loc:'Coorg, Karnataka', cam:'Sony α7R V', exp:'1/60s f/11 ISO100' },
  { src:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', title:'Above the World', cat:'mountains', loc:'Chandrashila, UK', cam:'Sony α7R V', exp:'1/500s f/8 ISO200' },
];

/* ── RENDER GALLERY ── */
function renderGallery(filter='all') {
  const grid = document.getElementById('galleryGrid');
  const items = filter === 'all' ? galleryData : galleryData.filter(i=>i.cat===filter);
  grid.innerHTML = items.map((item,i)=>`
    <div class="gallery-item fade-up" style="transition-delay:${(i%4)*0.07}s"
         onclick="openLightbox(${galleryData.indexOf(item)})">
      <img src="${item.src}" alt="${item.title}" loading="lazy"/>
      <div class="gallery-item-overlay">
        <div class="gi-title">${item.title}</div>
        <div class="gi-cat">${item.loc}</div>
      </div>
    </div>
  `).join('');
  observeFadeUps();
}

/* ── FILTER ── */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

/* ── LIGHTBOX ── */
function openLightbox(idx) {
  const item = galleryData[idx];
  document.getElementById('lbImg').src = item.src;
  document.getElementById('lbTitle').textContent = item.title + ' — ' + item.loc;
  document.getElementById('lbSpecs').innerHTML = `
    <span class="lb-spec"><strong>Camera</strong> ${item.cam}</span>
    <span class="lb-spec"><strong>Exposure</strong> ${item.exp}</span>
    <span class="lb-spec"><strong>Location</strong> ${item.loc}</span>
  `;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
document.getElementById('lbClose').addEventListener('click',()=>{
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
});
document.getElementById('lightbox').addEventListener('click',e=>{
  if(e.target===document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow='';
  }
});

/* ── HERO CAROUSEL ── */
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('heroDots');
const heroTitle = document.getElementById('heroTitle');
const heroSub = document.getElementById('heroSub');
const slideNum = document.getElementById('slideNum');
let current = 0, timer;

slides.forEach((_,i)=>{
  const dot = document.createElement('div');
  dot.className = 'hero-dot' + (i===0?' active':'');
  dot.addEventListener('click',()=>goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(n) {
  slides[current].classList.remove('active');
  document.querySelectorAll('.hero-dot')[current].classList.remove('active');
  current = n;
  slides[current].classList.add('active');
  document.querySelectorAll('.hero-dot')[current].classList.add('active');
  heroTitle.textContent = slides[current].dataset.title;
  heroSub.textContent = slides[current].dataset.sub;
  slideNum.textContent = String(current+1).padStart(2,'0');
  clearTimeout(timer);
  timer = setTimeout(()=>goTo((current+1)%slides.length), 5500);
}
timer = setTimeout(()=>goTo(1), 5500);

/* ── NAVBAR SCROLL ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY > 60);
  // Progress bar
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>navLinks.classList.remove('open'));
});

/* ── FADE-UP OBSERVER ── */
function observeFadeUps() {
  const els = document.querySelectorAll('.fade-up:not(.visible)');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold:.12 });
  els.forEach(el=>obs.observe(el));
}
observeFadeUps();

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let rx=0,ry=0, cx=0,cy=0;
document.addEventListener('mousemove',e=>{
  cx=e.clientX; cy=e.clientY;
  cursor.style.left=cx+'px'; cursor.style.top=cy+'px';
});
function animRing(){
  rx += (cx-rx)*.12; ry += (cy-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.coll-card,.gallery-item,.fav-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.width='20px'; cursor.style.height='20px'; cursor.style.background='transparent'; cursor.style.border='1px solid var(--gold)'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.width='10px'; cursor.style.height='10px'; cursor.style.background='var(--gold)'; cursor.style.border='none'; });
});

/* ── COLLECTION CLICK ── */
function openCollection(name) {
  console.log('Navigate to collection:', name);
  // In a real site, this would navigate to /collections/{name}
}

/* ── CONTACT FORM ── */
document.querySelector('.btn-send').addEventListener('click',()=>{
  document.querySelector('.btn-send').textContent = 'Message Sent ✓';
  document.querySelector('.btn-send').style.background = '#3a7d44';
  setTimeout(()=>{ document.querySelector('.btn-send').textContent = 'Send Message'; document.querySelector('.btn-send').style.background=''; }, 3000);
});

/* ── INIT ── */
renderGallery();


/* collection-sahyadris(1).html */

/* GALLERY DATA */
const photos = [
  { src:'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1800&q=85', title:'Valley at Dawn', loc:'Harishchandragad, MH', cam:'Sony α7R V', exp:'1/80s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80', title:'Cathedral Light', loc:'Bhimashankar Forest', cam:'Sony α7R V', exp:'1/30s · f/4 · ISO 1600' },
  { src:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', title:'Cloud River', loc:'Rajmachi, MH', cam:'Sony α7R V', exp:'1/200s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', title:'The Watcher', loc:'Kalsubai Trail', cam:'Sony α7R V', exp:'1/250s · f/5.6 · ISO 400' },
  { src:'https://images.unsplash.com/photo-1515897349795-4671689a14b2?w=900&q=80', title:'Veil of White', loc:'Bhimashankar, MH', cam:'Sony α7R V', exp:'2s · f/11 · ISO 100' },
  { src:'https://images.unsplash.com/photo-1468022379898-29044f51d3a3?w=900&q=80', title:'Morning Mist', loc:'Rajmachi Fort', cam:'Sony α7R V', exp:'1/125s · f/6.3 · ISO 320' },
  { src:'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=900&q=80', title:'Waiting for the Veil', loc:'Bhimashankar, MH', cam:'Sony α7R V', exp:'3s · f/11 · ISO 50' },
  { src:'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=900&q=80', title:'The Ridge Reveals', loc:'Kalsubai Peak, MH', cam:'Sony α7R V', exp:'1/160s · f/6.3 · ISO 400' },
  { src:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&q=80', title:'Valley Exhales', loc:'Harishchandragad', cam:'Sony α7R V', exp:'1/100s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80', title:'Last Gold', loc:'Bhimashankar', cam:'Sony α7R V', exp:'1/60s · f/11 · ISO 100' },
  { src:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80', title:'Cloud Sea', loc:'Kalsubai Summit', cam:'Sony α7R V', exp:'1/400s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=700&q=80', title:'Stone & Mist', loc:'Naneghat Pass', cam:'Sony α7R V', exp:'1/250s · f/5.6 · ISO 320' },
  { src:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80', title:'Green Infinity', loc:'Bhimashankar Forest', cam:'Sony α7R V', exp:'1/60s · f/4 · ISO 800' },
  { src:'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=700&q=80', title:'Fury Road', loc:'Bhandardara', cam:'Sony α7R V', exp:'4s · f/11 · ISO 50' },
  { src:'https://images.unsplash.com/photo-1439853949212-36589f9bba1c?w=700&q=80', title:'White Cascade', loc:'Rajmachi', cam:'Sony α7R V', exp:'1.6s · f/13 · ISO 50' },
  { src:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80', title:'Into the Unknown', loc:'Harishchandragad', cam:'Sony α7R V', exp:'1/125s · f/8 · ISO 200' },
  { src:'https://images.unsplash.com/photo-1467579424161-6bbc141569d7?w=700&q=80', title:'The Descent', loc:'Kalsubai', cam:'Sony α7R V', exp:'1/200s · f/6.3 · ISO 320' },
];

let currentLb = 0;
function openLb(idx) {
  currentLb = idx;
  document.getElementById('lbImg').src = photos[idx].src;
  document.getElementById('lbTitle').textContent = photos[idx].title + ' · ' + photos[idx].loc;
  document.getElementById('lbSpecs').innerHTML = `<span class="lb-spec"><strong>Camera</strong>${photos[idx].cam}</span><span class="lb-spec"><strong>Exposure</strong>${photos[idx].exp}</span>`;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function lbNav(dir) {
  currentLb = (currentLb + dir + photos.length) % photos.length;
  openLb(currentLb);
}
document.getElementById('lbClose').addEventListener('click',()=>{ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; });
document.getElementById('lightbox').addEventListener('click',e=>{ if(e.target===document.getElementById('lightbox')){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; } });
document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') lbNav(1); if(e.key==='ArrowLeft') lbNav(-1); if(e.key==='Escape'){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; } });

/* NAV */
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY>60);
  document.getElementById('progress-bar').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
});

/* FADE UP */
const obs = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{ threshold:.1 });
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

/* CURSOR */
const cur=document.getElementById('cursor'), ring=document.getElementById('cursor-ring');
let rx=0,ry=0,cx=0,cy=0;
document.addEventListener('mousemove',e=>{ cx=e.clientX;cy=e.clientY;cur.style.left=cx+'px';cur.style.top=cy+'px'; });
(function anim(){ rx+=(cx-rx)*.12;ry+=(cy-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim); })();
document.querySelectorAll('a,button,.gallery-item,.bts-img,.masonry-item,.related-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';cur.style.background='transparent';cur.style.border='1px solid var(--gold)';});
  el.addEventListener('mouseleave',()=>{cur.style.width='8px';cur.style.height='8px';cur.style.background='var(--gold)';cur.style.border='none';});
});

/* AUDIO AMBIENT — rain sound via Web Audio API */
let audioCtx=null, rainSource=null, playing=false;
function createRain(){
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  const buf=audioCtx.createBuffer(2,audioCtx.sampleRate*3,audioCtx.sampleRate);
  for(let c=0;c<2;c++){ const d=buf.getChannelData(c); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; }
  const gain=audioCtx.createGain(); gain.gain.value=0.06;
  const filter=audioCtx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=800; filter.Q.value=0.3;
  rainSource=audioCtx.createBufferSource(); rainSource.buffer=buf; rainSource.loop=true;
  rainSource.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  rainSource.start();
}
document.getElementById('audioBtn').addEventListener('click',()=>{
  if(!playing){ if(!audioCtx) createRain(); else audioCtx.resume(); playing=true; document.getElementById('audioIcon').className='fas fa-volume-high'; }
  else { audioCtx.suspend(); playing=false; document.getElementById('audioIcon').className='fas fa-volume-xmark'; }
});


/* collection-spiti(1).html */

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
