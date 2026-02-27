function openTab(event, tabId) {
    document.querySelectorAll(".content").forEach(section=>{
        section.classList.remove("active");
    });

    document.querySelectorAll(".tab").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");
}

document.getElementById("modeToggle").onclick = function(){
    document.body.classList.toggle("light");
    this.innerText = document.body.classList.contains("light") ? "☀️" : "🌙";
};
// Tabs
function openTab(event, tabId) {
    document.querySelectorAll(".content").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Dark/Light Mode
document.getElementById("modeToggle").onclick = function(){
    document.body.classList.toggle("light");
    this.innerText = document.body.classList.contains("light") ? "☀️" : "🌙";
};

// Counters
const counters = document.querySelectorAll('.counter h3');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200; // speed
        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    }
    updateCount();
});

// Cards entrance animation (staggered)
const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
});
// Particles تفاعلية مع الماوس
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = { x: null, y: null };

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
});

// Particle Class
class Particle {
    constructor(x, y, size, color, velocity){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Connect to mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < 100){
            this.x += dx/20;
            this.y += dy/20;
        }

        // Bounce edges
        if(this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
        if(this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;

        this.draw();
    }
}

// Init Particles
function initParticles(num){
    particlesArray = [];
    for(let i=0;i<num;i++){
        let size = Math.random()*3+1;
        let x = Math.random()*canvas.width;
        let y = Math.random()*canvas.height;
        let velocity = { x: (Math.random()-0.5)*1, y: (Math.random()-0.5)*1 };
        particlesArray.push(new Particle(x, y, size, 'rgba(255,255,255,0.6)', velocity));
    }
}
initParticles(120);

// Animate Particles
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(120);
});