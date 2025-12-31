const sC = document.getElementById('star-canvas');
const fC = document.getElementById('firework-canvas');
const sX = sC.getContext('2d');
const fX = fC.getContext('2d');

sC.width = fC.width = window.innerWidth;
sC.height = fC.height = window.innerHeight;

// Star Background
let stars = [];
for(let i=0; i<160; i++) stars.push({ x: Math.random()*sC.width, y: Math.random()*sC.height, r: Math.random()*1.5, a: Math.random() });

function drawS() {
    sX.clearRect(0,0,sC.width,sC.height);
    stars.forEach(s => {
        sX.fillStyle = `rgba(255,255,255,${s.a})`;
        sX.beginPath(); sX.arc(s.x, s.y, s.r, 0, Math.PI*2); sX.fill();
        s.a += (Math.random()-0.5)*0.05;
        if(s.a<0) s.a=0; if(s.a>1) s.a=1;
    });
    requestAnimationFrame(drawS);
}
drawS();

// Firework Logic
let rocket = { x: fC.width/2, y: fC.height, targetY: fC.height/3, active: true };
let parts = [];

function animateF() {
    fX.clearRect(0,0,fC.width,fC.height);
    if(rocket.active) {
        fX.fillStyle = "#f4c430";
        fX.beginPath(); fX.arc(rocket.x, rocket.y, 4, 0, Math.PI*2); fX.fill();
        rocket.y -= 6;
        if(rocket.y <= rocket.targetY) {
            rocket.active = false;
            for(let i=0; i<85; i++) parts.push({ x: rocket.x, y: rocket.y, ang: Math.random()*Math.PI*2, sp: Math.random()*6+2, a: 1 });
            revealContent();
        }
    }
    parts.forEach((p, i) => {
        p.x += Math.cos(p.ang)*p.sp; p.y += Math.sin(p.ang)*p.sp;
        p.a -= 0.015; p.sp *= 0.96;
        fX.fillStyle = `rgba(244, 196, 48, ${p.a})`;
        fX.beginPath(); fX.arc(p.x, p.y, 2.5, 0, Math.PI*2); fX.fill();
        if(p.a <= 0) parts.splice(i, 1);
    });
    requestAnimationFrame(animateF);
}
animateF();

function revealContent() {
    const intro = document.getElementById('intro-content');
    intro.classList.add('visible-content');
    // FIX: After burst, wait 3 seconds then move to Envelope
    setTimeout(() => { goToScene(2); }, 3500);
}

function goToScene(n) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${n}`).classList.add('active');
}

// Music Logic
const player = document.getElementById('main-audio');
function toggleMusic(src, el) {
    if(!player.paused && player.src.includes(src)) {
        player.pause();
    } else {
        player.src = src; 
        player.play().catch(e => console.log("Click play manually"));
    }
}
