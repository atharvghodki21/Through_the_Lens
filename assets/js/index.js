
/* ── GALLERY DATA ── */
const galleryData = [
  { src:'assets/images/gallery/mountain.webp', title:'Emerald Wilds', cat:'forest', loc:'Andarban Forest, MH', cam:'Sony α7R V', exp:'1/125s f/8 ISO200' },
  { src:'assets/images/gallery/paragliding.webp', title:'Seventh Cloud', cat:'miscellaneous', loc:'Rishikesh, UK', cam:'Sony α7R V', exp:'1/60s f/4 ISO800' },
  { src:'assets/images/gallery/sanjayGandhi.jpeg', title:'Sunkissed', cat:'forest', loc:'Mumbai, MH', cam:'Sony α7R V', exp:'8s f/16 ISO50' },
  { src:'assets/images/gallery/trishulWebp.webp', title:'Beyond the Trident', cat:'mountains', loc:'Pachmadi, MP', cam:'Sony 200-600mm', exp:'1/800s f/6.3 ISO1600' },
  { src:'assets/images/gallery/sunset.jpeg', title:'Bombay Dusk', cat:'sunset', loc:'Mumbai, MH', cam:'Sony α7R V', exp:'1/400s f/5.6 ISO100' },
  { src:'assets/images/gallery/banaras.jpeg', title:'Where boats sleep', cat:'miscellaneous', loc:'Banaras, UP', cam:'Sony α7R V', exp:'2s f/11 ISO100' },
  { src:'assets/images/gallery/leaf.jpeg', title:'Fading Edges', cat:'stills', loc:'Bhairavgad, MH', cam:'Sony α7R V', exp:'1/250s f/8 ISO400' },
  { src:'assets/images/gallery/cloud.jpeg', title:'Into the Mist', cat:'mountains', loc:'Malsej Ghat', cam:'Sony α7R V', exp:'1/30s f/2.8 ISO3200' },
  { src:'assets/images/gallery/gangaGhat.jpeg', title:'River Hymns', cat:'stills', loc:'Rishikesh, UK', cam:'Sony α7R V', exp:'4s f/11 ISO50' },
  { src:'assets/images/gallery/kalavantin.jpeg', title:'Golden hour', cat:'sunset', loc:'Kalavantin Durg, MH', cam:'Sony α7R V', exp:'1/60s f/11 ISO100' },
  { src:'assets/images/gallery/lavasa.jpeg', title:'Oasis of Serenity', cat:'miscellaneous', loc:'Lavasa, MH', cam:'Sony α7R V', exp:'1/250s f/8 ISO200' },
  { src:'assets/images/gallery/fav4.jpeg', title:'Heaven on Earth', cat:'water', loc:'Salvya Ghat, MH', cam:'Sony α7R V', exp:'1/500s f/8 ISO200' },
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




/* ── AUDIO SYSTEM ── */

// const audio = document.getElementById("bg-audio");
// const audioToggle = document.getElementById("audio-toggle");

/* Initial volume */
// audio.volume = 0.12;

/* Audio state */
// let isPlaying = false;

/* Start muted visually */
// audioToggle.classList.add("muted");

/* Start audio after first interaction */
// const startAudio = () => {
//
//     if (!isPlaying) {
//
//         audio.play()
//             .then(() => {
//
//                 isPlaying = true;
//
//                 audioToggle.classList.remove("muted");
//                 audioToggle.classList.add("active");
//
//             })
//             .catch(err => console.log(err));
//
//     }
//
//     document.removeEventListener("click", startAudio);
//
// };
//
// document.addEventListener("click", startAudio);

/* Toggle audio */
// audioToggle.addEventListener("click", (e) => {
//
//     e.stopPropagation();
//
//     if (audio.paused) {
//
//         audio.play();
//
//         isPlaying = true;
//
//         audioToggle.classList.remove("muted");
//         audioToggle.classList.add("active");
//
//     } else {
//
//         audio.pause();
//
//         isPlaying = false;
//
//         audioToggle.classList.add("muted");
//         audioToggle.classList.remove("active");
//
//     }
//
// });

/* Auto hide for cinematic feel */

// let audioTimeout;
//
// document.addEventListener("mousemove", () => {
//
//     audioToggle.classList.remove("hidden");
//
//     clearTimeout(audioTimeout);
//
//     audioTimeout = setTimeout(() => {
//
//         audioToggle.classList.add("hidden");
//
//     }, 2500);
//
// });


// /* ── AUDIO SYSTEM ── */
//
// const audio = document.getElementById("bg-audio");
// const audioToggle = document.getElementById("audio-toggle");
// const audioIcon = audioToggle.querySelector("span");
//
// /* Initial volume */
// audio.volume = 0.12;
//
// /* Audio state */
// let isPlaying = false;
//
// /* Premium Icons */
// const soundOnIcon = "∿";
// const soundOffIcon = "—";
//
// /* Set initial icon */
// audioIcon.textContent = soundOffIcon;
//
// /* Start audio after first interaction */
// const startAudio = () => {
//
//     if (!isPlaying) {
//
//         audio.play()
//             .then(() => {
//
//                 isPlaying = true;
//
//                 audioIcon.textContent = soundOnIcon;
//
//                 audioToggle.classList.add("active");
//
//             })
//             .catch(err => console.log(err));
//
//     }
//
//     document.removeEventListener("click", startAudio);
//
// };
//
// document.addEventListener("click", startAudio);
//
// /* Toggle audio */
// audioToggle.addEventListener("click", (e) => {
//
//     e.stopPropagation();
//
//     if (audio.paused) {
//
//         audio.play();
//
//         isPlaying = true;
//
//         audioIcon.textContent = soundOnIcon;
//
//         audioToggle.classList.add("active");
//
//     } else {
//
//         audio.pause();
//
//         isPlaying = false;
//
//         audioIcon.textContent = soundOffIcon;
//
//         audioToggle.classList.remove("active");
//
//     }
//
// });
//
// /* Auto hide button for cinematic feel */
//
// let audioTimeout;
//
// document.addEventListener("mousemove", () => {
//
//     audioToggle.classList.remove("hidden");
//
//     clearTimeout(audioTimeout);
//
//     audioTimeout = setTimeout(() => {
//
//         audioToggle.classList.add("hidden");
//
//     }, 2500);
//
// });

// ==============================
// document.querySelector('.btn-send').addEventListener('click',()=>{
//   document.querySelector('.btn-send').textContent = 'Message Sent ✓';
//   document.querySelector('.btn-send').style.background = '#3a7d44';
//   setTimeout(()=>{ document.querySelector('.btn-send').textContent = 'Send Message'; document.querySelector('.btn-send').style.background=''; }, 3000);
// });



/* ── CONTACT FORM ── */
// Initialize EmailJS
emailjs.init("FBihUGMW48SadsOzM");

const sendBtn = document.querySelector('.btn-send');

let isSending = false;

sendBtn.addEventListener('click', function () {

    // Prevent multiple clicks
    if (isSending) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {

        sendBtn.textContent = 'Please Fill All Fields';
        sendBtn.style.background = '#b02a37';

        setTimeout(() => {
            sendBtn.textContent = 'Send Message';
            sendBtn.style.background = '';
        }, 3000);

        return;
    }

    if (!emailPattern.test(email)) {

        sendBtn.textContent = 'Invalid Email';
        sendBtn.style.background = '#b02a37';

        setTimeout(() => {
            sendBtn.textContent = 'Send Message';
            sendBtn.style.background = '';
        }, 3000);

        return;
    }

    // Lock sending
    isSending = true;

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    sendBtn.style.opacity = '0.7';

    const templateParams = {
        name,
        email,
        subject,
        message
    };

    // Send notification mail to YOU
    emailjs.send(
        "service_nuu9dvo",
        "template_a5k4p1a",
        templateParams
    )

    .then(function () {

        // Send auto reply to USER
        return emailjs.send(
            "service_nuu9dvo",
            "template_wdsi82m",
            templateParams
        );

    })

    .then(function () {

        sendBtn.textContent = 'Message Sent ✓';
        sendBtn.style.background = '#3a7d44';

        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';

        // Cooldown before next message
        setTimeout(() => {

            isSending = false;

            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
            sendBtn.style.background = '';
            sendBtn.style.opacity = '1';

        }, 5000);

    })

    .catch(function (error) {

        console.error(error);

        isSending = false;

        sendBtn.disabled = false;

        sendBtn.textContent = 'Failed to Send';
        sendBtn.style.background = '#b02a37';

        setTimeout(() => {

            sendBtn.textContent = 'Send Message';
            sendBtn.style.background = '';
            sendBtn.style.opacity = '1';

        }, 3000);

    });

});


// Initialize EmailJS
// emailjs.init("FBihUGMW48SadsOzM");
//
// document.querySelector('.btn-send').addEventListener('click', function () {
//
//     const btn = document.querySelector('.btn-send');
//
//     // Get form values
//     const templateParams = {
//
//         name: document.getElementById('name').value,
//
//         email: document.getElementById('email').value,
//
//         subject: document.getElementById('subject').value,
//
//         message: document.getElementById('message').value
//     };
//
//     // Basic validation
//     if (
//         !templateParams.name ||
//         !templateParams.email ||
//         !templateParams.subject ||
//         !templateParams.message
//     ) {
//
//         btn.textContent = 'Please Fill All Fields';
//         btn.style.background = '#b02a37';
//
//         setTimeout(() => {
//             btn.textContent = 'Send Message';
//             btn.style.background = '';
//         }, 3000);
//
//         return;
//     }
//
//     // Send mail to YOU
//     emailjs.send(
//         "service_nuu9dvo",
//         "template_a5k4p1a",
//         templateParams
//     )
//
//     .then(function () {
//
//         // Send auto reply to USER
//         emailjs.send(
//             "service_nuu9dvo",
//             "template_wdsi82m",
//             templateParams
//         );
//
//         // Success UI
//         btn.textContent = 'Message Sent ✓';
//         btn.style.background = '#3a7d44';
//
//         // Reset form
//         document.getElementById('name').value = '';
//         document.getElementById('email').value = '';
//         document.getElementById('subject').value = '';
//         document.getElementById('message').value = '';
//
//         setTimeout(() => {
//             btn.textContent = 'Send Message';
//             btn.style.background = '';
//         }, 3000);
//
//     })
//
//     .catch(function (error) {
//
//         console.error(error);
//
//         btn.textContent = 'Failed to Send';
//         btn.style.background = '#b02a37';
//
//         setTimeout(() => {
//             btn.textContent = 'Send Message';
//             btn.style.background = '';
//         }, 3000);
//
//     });
//
// });

/* ── INIT ── */
renderGallery();
