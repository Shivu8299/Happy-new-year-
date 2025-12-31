// --- FIREWORK ANIMATION (VIDEO START) ---
const canvas = document.getElementById('firework-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let rocket = { x: canvas.width/2, y: canvas.height, targetY: canvas.height/3, speed: 10, active: true };
let exploded = false;

function animateFirework() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Rocket phase
    if (rocket.active) {
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI * 2);
        ctx.fill();
        rocket.y -= rocket.speed;

        if (rocket.y <= rocket.targetY) {
            rocket.active = false;
            createExplosion(rocket.x, rocket.y);
            exploded = true;
        }
    }

    // 2. Explosion phase
    if (exploded) {
        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.01;
            p.speed *= 0.95;

            ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.alpha <= 0) particles.splice(i, 1);
        });

        // 3. Show Text after explosion starts
        if (particles.length < 50) {
            document.getElementById('intro-content').classList.remove('hidden-content');
            document.getElementById('intro-content').classList.add('visible-content');
        }
    }

    if (particles.length > 0 || rocket.active) {
        requestAnimationFrame(animateFirework);
    }
}

function createExplosion(x, y) {
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: x, y: y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            alpha: 1,
            size: Math.random() * 3
        });
    }
}

// Start immediately
animateFirework();


// --- SCENE NAVIGATION ---
function goToScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${num}`).classList.add('active');

    if (num === 7) startLoading(); // Loading Bar Scene
    if (num === 9) typeWriterEffect(); // Sealed Scene
}


// --- LOADING BAR ---
function startLoading() {
    let width = 0;
    const bar = document.getElementById('progressBar');
    const txt = document.getElementById('progressText');
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => goToScene(8), 500); // Go to Letter
        } else {
            width++;
            bar.style.width = width + '%';
            txt.innerText = width + '%';
        }
    }, 30);
}


// --- MUSIC PLAYER ---
let audio = document.getElementById('bg-music');
function playMusic(src, el) {
    document.querySelectorAll('.cassette').forEach(c => c.classList.remove('playing'));
    el.classList.add('playing');
    audio.src = src;
    audio.play();
}


// --- TYPEWRITER EFFECT (LAST SCENE) ---
const finalMsg = "Happy New Year! May 2026 be kind, exciting, and full of opportunities 🌟";
function typeWriterEffect() {
    const el = document.getElementById('typewriter-text');
    el.innerHTML = "";
    let i = 0;
    
    function type() {
        if (i < finalMsg.length) {
            el.innerHTML += finalMsg.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            // Show Restart Button after typing
            document.getElementById('restartBtn').classList.add('show');
        }
    }
    type();
}
