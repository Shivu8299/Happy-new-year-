// --- CONFIG ---
const starCanvas = document.getElementById('star-canvas');
const starCtx = starCanvas.getContext('2d');
const fireCanvas = document.getElementById('firework-canvas');
const fireCtx = fireCanvas.getContext('2d');

starCanvas.width = fireCanvas.width = window.innerWidth;
starCanvas.height = fireCanvas.height = window.innerHeight;

// --- SCENE 1: BACKGROUND STARS ---
const stars = [];
for(let i=0; i<150; i++) {
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        r: Math.random() * 2,
        a: Math.random()
    });
}

function drawStars() {
    starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);
    starCtx.fillStyle = "white";
    stars.forEach(s => {
        starCtx.globalAlpha = s.a;
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        starCtx.fill();
        s.a += (Math.random() - 0.5) * 0.05;
        if(s.a < 0) s.a = 0; if(s.a > 1) s.a = 1;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// --- FIREWORK ANIMATION ---
let particles = [];
// Rocket starts at bottom center, targets center of screen
let rocket = { x: fireCanvas.width/2, y: fireCanvas.height, targetY: fireCanvas.height/2, speed: 8, active: true };
let explosionHappened = false;

function drawFirework() {
    // If explosion is done and no particles left, stop updating firework canvas
    if (explosionHappened && particles.length === 0) return;

    fireCtx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);

    // 1. Draw Rocket (Moving Up)
    if (rocket.active) {
        fireCtx.fillStyle = "#FFD700"; // Gold color
        fireCtx.beginPath();
        fireCtx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        fireCtx.fill();

        // Trail effect
        fireCtx.fillStyle = "rgba(255, 215, 0, 0.5)";
        fireCtx.beginPath();
        fireCtx.arc(rocket.x, rocket.y + 10, 2, 0, Math.PI * 2);
        fireCtx.fill();

        rocket.y -= rocket.speed;

        // Explode condition
        if (rocket.y <= rocket.targetY) {
            rocket.active = false;
            createExplosion(rocket.x, rocket.y);
        }
    }

    // 2. Draw Particles (Explosion)
    particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.015; // Fade out speed
        p.speed *= 0.95; // Friction

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            fireCtx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
            fireCtx.beginPath();
            fireCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            fireCtx.fill();
        }
    });

    // 3. Trigger text reveal shortly after explosion starts
    if (!rocket.active && particles.length < 50 && !explosionHappened) {
        explosionHappened = true;
        // Wait 500ms then show the text
        setTimeout(() => {
            document.getElementById('intro-content').classList.remove('hidden-content');
            document.getElementById('intro-content').classList.add('visible-content');
        }, 500);
    }

    requestAnimationFrame(drawFirework);
}

function createExplosion(x, y) {
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            alpha: 1,
            size: Math.random() * 3
        });
    }
}

// Start Animation sequence
drawFirework();


// --- SCENE MANAGEMENT ---
function goToScene(sceneNum) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    
    // Show requested scene
    const target = document.getElementById(`scene-${sceneNum}`);
    if (target) {
        target.classList.add('active');
        if (sceneNum === 2) startLoading();
    }
}

// --- LOADING BAR ---
function startLoading() {
    const bar = document.getElementById('progressBar');
    const txt = document.getElementById('progressText');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => goToScene(3), 500);
        } else {
            width++;
            bar.style.width = width + '%';
            txt.innerText = width + '%';
        }
    }, 40);
}

// --- MUSIC PLAYER ---
let currentAudio = document.getElementById('bg-music');
function playMusic(file, element) {
    document.querySelectorAll('.cassette').forEach(c => c.classList.remove('playing'));
    element.classList.add('playing');
    currentAudio.src = file;
    currentAudio.play();
}
