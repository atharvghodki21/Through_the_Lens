
/* GALLERY DATA */
const photos = [
  { src:'assets/images/collections/Whispers of Sahyadris/img1.jpg', title:'Stormbound', loc:'Sahyadri, MH', cam:'Motorola Edge 50 Fusion', exp:'1/1282s · f1.8 · ISO 100' },
  { src:'assets/images/collections/Whispers of Sahyadris/img3.JPG', title:'Monsoon Veil', loc:'Salvya Ghat, MH', cam:'IPhone 14 plus', exp:'1/3077s · f1.5 · ISO 50' },
  { src:'assets/images/collections/Whispers of Sahyadris/img2.JPG', title:'Beholding Wonder', loc:'Salvya Ghat, MH', cam:'iPhone 14 pro', exp:'1/3155s · f1.8 · ISO 80' },
  { src:'assets/images/collections/Whispers of Sahyadris/fav4.jpg', title:"Nature's Frame", loc:'Salvya Ghat, MH', cam:'Samsung M30s', exp:'1/135s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/poster.jpg', title:'Held By Mountains', loc:'Mulshi Lake, MH', cam:'Motorola Edge 50 Fusion', exp:'1/860s · f1.8 · ISO 100' },
  { src:'assets/images/collections/Whispers of Sahyadris/img4.JPG', title:'Lost In The Cloud', loc:'Malshej Ghat, MH', cam:'iPhone 14 Plus', exp:'1/1900s · f1.5 · ISO 50' },
  { src:'assets/images/collections/Whispers of Sahyadris/fav.jpg', title:'Monsoon Cathedral', loc:'Salvya Ghat, MH', cam:'Samsung M30s', exp:'1/215s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/img4.JPG', title:'Lost In The Cloud', loc:'Malshej Ghat, MH', cam:'iPhone 14 Plus', exp:'1/1900s · f1.5 · ISO 50' },
  { src:'assets/images/collections/Whispers of Sahyadris/fav4.jpg', title:'Valley Exhales', loc:'Salvya Ghat, MH', cam:'Samsung M30s', exp:'1/135s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/patti.jpg', title:'Reaching Through Mist', loc:'Kalavantin Durg, MH', cam:'Samsung M30s', exp:'1/1047s ·f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/waterfall.jpg', title:'Time Carved Here', loc:'Sahyadri, MH', cam:'Motorola g62', exp:'1/400s · f/8 · ISO 200' },
  { src:'assets/images/collections/Whispers of Sahyadris/sahyadri hero.jpg', title:'A place to breathe', loc:'Tamhini Ghat, MH', cam:'Motorola Edge 50 Fusion', exp:'1/911s · f1.8 · ISO 100' },
  { src:'assets/images/collections/Whispers of Sahyadris/Hero1.jpg', title:"Monsoon's Gift", loc:'Salvya Ghat, MH', cam:'Samsung M30s', exp:'1/380s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/road.jpg', title:'When the Road Calls', loc:'Road to Andarban', cam:'Samsung M30s', exp:'1/212s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/img5.jpg', title:'Emerald Silence', loc:'Tahmini Ghat, MH', cam:'Samsung M30s', exp:'1/220ss · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/img6.jpg', title:'Ancient Walls', loc:'Prabalgad, MH', cam:'Samsung M30s', exp:'1/500s · f2.0 · ISO 20' },
  { src:'assets/images/collections/Whispers of Sahyadris/Lonavala.jpg', title:'The Horizons', loc:'Lonavala', cam:'Samsung M30s', exp:'1/1692s · f2.0 · ISO 20' },
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
// let audioCtx=null, rainSource=null, playing=false;
// function createRain(){
//   audioCtx=new(window.AudioContext||window.webkitAudioContext)();
//   const buf=audioCtx.createBuffer(2,audioCtx.sampleRate*3,audioCtx.sampleRate);
//   for(let c=0;c<2;c++){ const d=buf.getChannelData(c); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; }
//   const gain=audioCtx.createGain(); gain.gain.value=0.06;
//   const filter=audioCtx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=800; filter.Q.value=0.3;
//   rainSource=audioCtx.createBufferSource(); rainSource.buffer=buf; rainSource.loop=true;
//   rainSource.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
//   rainSource.start();
// }
// document.getElementById('audioBtn').addEventListener('click',()=>{
//   if(!playing){ if(!audioCtx) createRain(); else audioCtx.resume(); playing=true; document.getElementById('audioIcon').className='fas fa-volume-high'; }
//   else { audioCtx.suspend(); playing=false; document.getElementById('audioIcon').className='fas fa-volume-xmark'; }
// });



document.addEventListener("DOMContentLoaded", () => {

    /* ───────────────────────────── */
    /* AUDIO ELEMENTS */
    /* ───────────────────────────── */

    const heroAudio = document.getElementById("hero-audio");
    const globalAudio = document.getElementById("global-audio");
    const audioToggle = document.getElementById("audio-toggle");

    const heroSection = document.getElementById("hero");
    const slides = document.querySelectorAll(".slide");

    if (!heroAudio || !globalAudio || !audioToggle || !heroSection) {
        console.warn("Audio system missing elements");
        return;
    }

    /* ───────────────────────────── */
    /* SETTINGS */
    /* ───────────────────────────── */

    const HERO_VOLUME = 0.22;
    const GLOBAL_VOLUME = 0.06;

    let audioEnabled = true;
    let currentHeroAudio = "";

    let isHeroVisible = true;

    /* Initial UI */
    audioToggle.classList.add("active");

    /* ───────────────────────────── */
    /* SMOOTH FADE */
    /* ───────────────────────────── */

    function fadeAudio(audio, targetVolume, duration = 1200) {

        const startVolume = audio.volume;
        const volumeDiff = targetVolume - startVolume;

        const steps = 30;
        const stepTime = duration / steps;

        let currentStep = 0;

        const fade = setInterval(() => {

            currentStep++;

            audio.volume =
                startVolume + (volumeDiff * currentStep / steps);

            if (currentStep >= steps) {

                clearInterval(fade);

                audio.volume = targetVolume;

                if (targetVolume === 0) {
                    audio.pause();
                }

            }

        }, stepTime);

    }

    /* ───────────────────────────── */
    /* PLAY HERO AUDIO */
    /* ───────────────────────────── */

    async function updateHeroAudio() {

        if (!audioEnabled) return;

        if (!isHeroVisible) return;

        const activeSlide =
            document.querySelector(".slide.active");

        if (!activeSlide) return;

        const newAudioSrc =
            activeSlide.dataset.audio;

        /* NO AUDIO FOR THIS SLIDE */
        if (!newAudioSrc) {

            fadeAudio(heroAudio, 0, 800);

            currentHeroAudio = "";

            return;
        }

        /* SAME AUDIO */
        if (newAudioSrc === currentHeroAudio) return;

        currentHeroAudio = newAudioSrc;

        /* Fade old audio */
        fadeAudio(heroAudio, 0, 700);

        setTimeout(async () => {

            heroAudio.src = newAudioSrc;

            try {

                await heroAudio.play();

                heroAudio.volume = 0;

                fadeAudio(heroAudio, HERO_VOLUME, 1400);

            } catch (err) {
                console.log(err);
            }

        }, 750);

    }

    /* ───────────────────────────── */
    /* START AUDIO */
    /* ───────────────────────────── */

    async function startAudio() {

        if (!audioEnabled) return;

        try {

            await globalAudio.play();

            globalAudio.volume = GLOBAL_VOLUME;

            updateHeroAudio();

        } catch (err) {
            console.log(err);
        }

        document.removeEventListener("click", startAudio);

    }

    document.addEventListener("click", startAudio);

    /* ───────────────────────────── */
    /* TOGGLE */
    /* ───────────────────────────── */

    audioToggle.addEventListener("click", () => {

        audioEnabled = !audioEnabled;

        if (!audioEnabled) {

            fadeAudio(heroAudio, 0, 600);
            fadeAudio(globalAudio, 0, 600);

            audioToggle.classList.remove("active");
            audioToggle.classList.add("muted");

        } else {

            audioToggle.classList.add("active");
            audioToggle.classList.remove("muted");

            if (isHeroVisible) {

                updateHeroAudio();

            } else {

                globalAudio.play();

                fadeAudio(globalAudio, GLOBAL_VOLUME, 1200);

            }

        }

    });

    /* ───────────────────────────── */
    /* HERO SECTION DETECTION */
    /* ───────────────────────────── */

    const heroObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    isHeroVisible = true;

                    /* STOP GLOBAL */
                    fadeAudio(globalAudio, 0, 1000);

                    /* START HERO */
                    updateHeroAudio();

                } else {

                    isHeroVisible = false;

                    /* STOP HERO */
                    fadeAudio(heroAudio, 0, 1000);

                    /* START GLOBAL */
                    if (audioEnabled) {

                        globalAudio.play();

                        fadeAudio(globalAudio, GLOBAL_VOLUME, 1800);

                    }

                }

            });

        }, {
            threshold: 0.35
        });

    heroObserver.observe(heroSection);

    /* ───────────────────────────── */
    /* HERO SLIDE CHANGE DETECTION */
    /* ───────────────────────────── */

    const slideObserver =
        new MutationObserver(() => {

            updateHeroAudio();

        });

    slides.forEach(slide => {

        slideObserver.observe(slide, {
            attributes: true,
            attributeFilter: ["class"]
        });

    });

    /* ───────────────────────────── */
    /* WINDOW/TAB FOCUS */
    /* ───────────────────────────── */

    function pauseAllAudio() {

        heroAudio.pause();
        globalAudio.pause();

    }

    function resumeAudio() {

        if (!audioEnabled) return;

        if (isHeroVisible) {

            updateHeroAudio();

        } else {

            globalAudio.play();

        }

    }

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            pauseAllAudio();

        } else {

            resumeAudio();

        }

    });

    window.addEventListener("blur", pauseAllAudio);

    // window.addEventListener("focus", resumeAudio);

    window.addEventListener("focus", () => {

    setTimeout(() => {

        resumeAllAudio();

    }, 200);

});

    /* ───────────────────────────── */
/* HARD FOCUS CHECK */
/* ───────────────────────────── */

setInterval(() => {

    if (!document.hasFocus() || document.hidden) {

        heroAudio.pause();
        globalAudio.pause();

    }

}, 500);

    /* ───────────────────────────── */
    /* AUTO HIDE BUTTON */
    /* ───────────────────────────── */

    let timeout;

    document.addEventListener("mousemove", () => {

        audioToggle.classList.remove("hidden");

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            audioToggle.classList.add("hidden");

        }, 2500);

    });

});
