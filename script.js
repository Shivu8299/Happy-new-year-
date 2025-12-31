// --- CONFIG & FIREWORK ---
const canvas = document.getElementById('firework-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let rocket = { x: canvas.width/2, y: canvas.height, targetY: canvas.height/2.5, speed: 7, active: true };

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (rocket.active) {
        ctx.fillStyle = "#FFD700";
        ctx.beginPath(); ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI*2); ctx.fill();
        rocket.y -= rocket.speed;
        if (rocket.y <= rocket.targetY) {
            rocket.active = false;
            createExplosion(rocket.x, rocket.y);
            revealContent(); 
        }
    }

    particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.012; p.speed *= 0.96;
        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

function createExplosion(x, y) {
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: x, y: y, angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2, alpha: 1, size: Math.random() * 3
        });
    }
}

function revealContent() {
    const intro = document.getElementById('intro-content');
    intro.classList.add('visible-content');
}

// FAILSAFE: Agar firework explode nahi hua, 3 sec baad text dikhao
setTimeout(revealContent, 3000);
animate();

// --- NAVIGATION ---
function goToScene(n) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${n}`).classList.add('active');
    if (n === 7) startLoading();
    if (n === 9) startTypewriter();
}

// --- LOADING BAR ---
function startLoading() {
    let w = 0;
    const bar = document.getElementById('progressBar');
    const txt = document.getElementById('progressText');
    const inv = setInterval(() => {
        if (w >= 100) { clearInterval(inv); setTimeout(() => goToScene(8), 500); }
        else { w++; bar.style.width = w + '%'; txt.innerText = w + '%'; }
    }, 35);
}

// --- MUSIC ---
let audio = document.getElementById('bg-music');
function playMusic(src, el) {
    document.querySelectorAll('.cassette').forEach(c => c.classList.remove('playing'));
    el.classList.add('playing');
    audio.src = src; audio.play();
}

// --- TYPEWRITER ---
function startTypewriter() {
    const text = "Happy New Year! May 2026 be kind, exciting, and full of opportunities 🌟";
    const el = document.getElementById('typewriter-text');
    let i = 0; el.innerHTML = "";
    function type() {
        if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, 50); }
        else { document.getElementById('restartBtn').classList.add('show'); }
    }
    type();
}
