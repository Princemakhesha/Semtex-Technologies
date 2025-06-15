document.addEventListener('DOMContentLoaded', () => {
  // ========================
  // 1. Scroll Reveal
  // ========================
  const revealElements = document.querySelectorAll('.section, .card, .mission-text, form');
 
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
 
  revealElements.forEach(el => {
    el.classList.add('hidden');
    revealObserver.observe(el);
  });
 
  // ========================
  // 2. Header Shrink on Scroll
  // ========================
  const header = document.querySelector('.header');
 
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
 
  // ========================
  // 3. Smooth Scroll (fallback for browsers that don’t support CSS scroll-behavior)
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
 
  // ========================
  // 4. Form Validation
  // ========================
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');
 
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill out all fields.');
        e.preventDefault();
      } else if (!validateEmail(email.value)) {
        alert('Enter a valid email address.');
        e.preventDefault();
      }
    });
  }
 
  function validateEmail(email) {
    const re = /^[\w.-]+@[\w.-]+\.\w+$/;
    return re.test(String(email).toLowerCase());
  }
});
// Particle Background Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
 
let width, height;
let particles = [];
const density = 80;
const radius = 100;
 
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
 
function createParticles() {
  particles = [];
  for (let i = 0; i < density; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    });
  }
}
 
function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
 
    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
 
    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
 
    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      let q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / radius})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
 
  requestAnimationFrame(draw);
}
 
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
 
resizeCanvas();
createParticles();
draw();
 
document.querySelectorAll('.glitch span').forEach((span) => {
  const delay = Math.random() * 2; // seconds
  span.style.animationDelay = `${delay}s`;
});
 
