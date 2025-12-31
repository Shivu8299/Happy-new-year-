// --- MUSIC WAVE THICKNESS ---
function startWave(el) {
    const cvs = el.querySelector('.wave-mid-c');
    const ctx = cvs.getContext('2d');
    let off = 0;
    function d() {
        if(!el.classList.contains('shaking')) return;
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4; // Thick wave
        ctx.beginPath();
        for(let x=0; x<cvs.width; x++) {
            ctx.lineTo(x, 17 + Math.sin(x*0.1 + off)*10); // Centered Mid-Rectangle
        }
        ctx.stroke();
        off += 0.2;
        requestAnimationFrame(d);
    }
    d();
}

// --- TOGGLE MUSIC FIX ---
function toggleMusic(src, el) {
    const player = document.getElementById('player');
    if(!player.paused && player.src.includes(src)) {
        player.pause();
        el.classList.remove('shaking');
    } else {
        document.querySelectorAll('.cassette-player').forEach(c => c.classList.remove('shaking'));
        player.src = src;
        player.play();
        el.classList.add('shaking');
        startWave(el);
    }
}
    
