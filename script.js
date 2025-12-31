const canvas = document.getElementById('firework-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];
let rocket = { x: canvas.width / 2, y: canvas.height, targetY: canvas.height / 2, speed: 6, active: true };

function createExplosion(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            alpha: 1,
            size: Math.random() * 3 + 1
        });
    }
}

function animate() {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.2)'; // Fades out previous frames
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (rocket.active) {
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI * 2);
        ctx.fill();
        rocket.y -= rocket.speed;

        if (rocket.y <= rocket.targetY) {
            rocket.active = false;
            createExplosion(rocket.x, rocket.y);
            revealIntro(); // Reveal text when explosion starts
        }
    }

    particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;
        p.speed *= 0.96;

        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

function revealIntro() {
    const intro = document.getElementById('intro-content');
    intro.classList.remove('hidden-content');
    intro.classList.add('visible-content');
}

// FAILSAFE: If animation doesn't finish, show content anyway after 3 seconds
setTimeout(revealIntro, 3000);

animate();

// SCENE NAVIGATION
function goToScene(num) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(`scene-${num}`).classList.add('active');
    
    // Typewriter logic for final scene
    if(num === 9) startTypewriter();
}

function startTypewriter() {
    const text = "Happy New Year! May 2026 be kind, exciting, and full of opportunities 🌟";
    const container = document.getElementById('typewriter-text');
    let i = 0;
    container.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            document.getElementById('restartBtn').style.opacity = "1";
            document.getElementById('restartBtn').style.pointerEvents = "all";
        }
    }
    type();
        }
