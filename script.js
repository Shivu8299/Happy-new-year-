// --- Scene 1: Stars & Rocket ---
const fC = document.getElementById('firework-canvas');
const fX = fC.getContext('2d');
fC.width = window.innerWidth; fC.height = window.innerHeight;

let rocket = { x: fC.width / 2, y: fC.height, active: true };

function animate() {
    fX.clearRect(0, 0, fC.width, fC.height);
    if (rocket.active) {
        fX.fillStyle = "white";
        fX.beginPath(); fX.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2); fX.fill();
        rocket.y -= 5;
        if (rocket.y < fC.height / 3) {
            rocket.active = false;
            explode(rocket.x, rocket.y);
        }
    }
    requestAnimationFrame(animate);
}
animate();

function explode(x, y) {
    document.getElementById('intro-content').classList.remove('hidden');
    document.getElementById('intro-content').classList.add('visible');
    setTimeout(() => { nextScene(2); }, 4000);
}

// --- Navigation ---
function nextScene(n) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('scene-' + n);
    target.classList.add('active');
}

// --- Music ---
function playSong(id, el) {
    const audio = document.getElementById('audio-player');
    audio.src = "your-music-file.mp3"; // Link your music here
    audio.play();
    startWave(el.querySelector('.wave-cvs'));
}

function startWave(cvs) {
    const ctx = cvs.getContext('2d');
    let x = 0;
    function draw() {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.beginPath();
        for(let i=0; i<cvs.width; i++) {
            ctx.lineTo(i, 20 + Math.sin(i*0.1 + x)*10);
        }
        ctx.stroke(); x+=0.2;
        requestAnimationFrame(draw);
    }
    draw();
}

// --- Loading Bar ---
function startLoading() {
    document.querySelector('.loading-area').classList.remove('hidden');
    let val = 0;
    let int = setInterval(() => {
        val++;
        document.querySelector('.progress-fill').style.width = val + '%';
        document.getElementById('load-val').innerText = val;
        if(val >= 100) {
            clearInterval(int);
            setTimeout(() => nextScene(7), 500);
        }
    }, 50);
}

// --- Typing Effect ---
const text = "Happy New Year! May 2026 be kind, exciting, and full of opportunities 🌟";
function type() {
    let i = 0;
    let target = document.getElementById('typing-text');
    let int = setInterval(() => {
        target.innerHTML += text.charAt(i);
        i++;
        if(i >= text.length) clearInterval(int);
    }, 50);
}
// Trigger typing when scene 8 opens
window.addEventListener('click', () => {
    if(document.getElementById('scene-8').classList.contains('active')) type();
}, {once: true});
            
