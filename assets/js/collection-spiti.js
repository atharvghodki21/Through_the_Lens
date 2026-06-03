
const photos = [
  { src:'assets/images/collections/Chasing Light/Hero2.jpg', title:'Cold Geometry — Spiti Panorama', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/400s · f/8 · ISO 100' },
  { src:'assets/images/collections/Chasing Light/Instapost4.jpg', title:'Mountain Lake', loc:'Chandratal, 4,250m', cam:'Sony α7R V', exp:'1/250s · f/8 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/plant.jpg', title:'Into the Unknown', loc:'Kunzum Pass', cam:'Sony α7R V', exp:'1/125s · f/8 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/Ganesha.jpg', title:'Last Gold', loc:'Langza Village', cam:'Sony α7R V', exp:'1/60s · f/11 · ISO 100' },
  { src:'assets/images/collections/Chasing Light/chShivaji.jpg', title:'High Pass', loc:'Kunzum La, 4,551m', cam:'Sony α7R V', exp:'1/500s · f/8 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/sunset_Kalavantin.jpg', title:'Pin Valley', loc:'Pin River Valley', cam:'Sony α7R V', exp:'1/320s · f/6.3 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/sunset2.jpg', title:'Key Monastery at −16°C', loc:'Key Monastery, 4,166m', cam:'Sony α7R V', exp:'1/80s · f/2 · ISO 1600' },
  { src:'assets/images/collections/Chasing Light/Hero12.jpg', title:'The River That Forgot', loc:'Spiti River, near Kaza', cam:'Sony α7R V', exp:'1/400s · f/4 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/chulha.jpg', title:'Winter Canopy', loc:'Nako, HP', cam:'Sony α7R V', exp:'1/60s · f/4 · ISO 640' },
  { src:'assets/images/collections/Chasing Light/diyas.jpg', title:'Frozen Veins', loc:'Spiti Gorge', cam:'Sony α7R V', exp:'4s · f/11 · ISO 50' },
  { src:'assets/images/collections/Chasing Light/sea.jpg', title:'Snow Cathedral', loc:'Pin Valley Forest', cam:'Sony α7R V', exp:'1/30s · f/4 · ISO 1600' },
  { src:'assets/images/collections/Chasing Light/bulb.jpg', title:'Barren Peaks', loc:'Chicham, 4,200m', cam:'Sony α7R V', exp:'1/200s · f/6.3 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/plant2.jpg', title:'Rock and Ice', loc:'Losar Village', cam:'Sony α7R V', exp:'1/320s · f/8 · ISO 200' },
  { src:'assets/images/collections/Chasing Light/camping.jpg', title:'Ice Architecture', loc:'Tabo, HP', cam:'Sony α7R V', exp:'2s · f/11 · ISO 100' },
  { src:'assets/images/collections/Chasing Light/diya_sharp.jpg', title:'The Watcher', loc:'Komic, 4,520m', cam:'Sony α7R V', exp:'1/250s · f/5.6 · ISO 400' },
  { src:'assets/images/collections/Chasing Light/butterfly.jpg', title:'Blue Dawn', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/30s · f/1.4 · ISO 3200' },
  { src:'assets/images/collections/Chasing Light/lake.jpg', title:'Blue Dawn', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/30s · f/1.4 · ISO 3200' },
  { src:'assets/images/collections/Chasing Light/Hero11.jpg', title:'Blue Dawn', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/30s · f/1.4 · ISO 3200' },
  { src:'assets/images/collections/Chasing Light/sanjayGandhi.jpg', title:'Blue Dawn', loc:'Kaza, 3,800m', cam:'Sony α7R V', exp:'1/30s · f/1.4 · ISO 3200' },
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
