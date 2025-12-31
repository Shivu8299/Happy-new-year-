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
        
        // Specific Logic per Scene
        if (sceneNum === 2) {
            startLoading();
        }
        if (sceneNum === 4 || sceneNum === 5) {
            // Stop any scrolling reset
        }
    }
}

// --- SCENE 1: STARS ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for(let i=0; i<150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        a: Math.random()
    });
}

function drawStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fill();
        s.a += (Math.random() - 0.5) * 0.05;
        if(s.a < 0) s.a = 0; if(s.a > 1) s.a = 1;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// --- SCENE 2: LOADING SIMULATION ---
function startLoading() {
    const bar = document.getElementById('progressBar');
    const txt = document.getElementById('progressText');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                goToScene(3); // Auto jump to scene 3 when done
            }, 500);
        } else {
            width++;
            bar.style.width = width + '%';
            txt.innerText = width + '%';
        }
    }, 40); // Speed of loading
}

// --- SCENE 4: MUSIC PLAYER ---
let currentAudio = document.getElementById('bg-music');

function playMusic(file, element) {
    // Reset other cassettes
    document.querySelectorAll('.cassette').forEach(c => c.classList.remove('playing'));
    
    // Set this cassette to playing style
    element.classList.add('playing');
    
    // Play Audio
    currentAudio.src = file;
    currentAudio.play();
}
