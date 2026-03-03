/* =============================================
   DOCTOR WEBSITE — script.js
   ============================================= */

// ─────────────────────────────────────────────
// 1. CUSTOM CURSOR
// ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && follower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverEls = document.querySelectorAll('a, button, .service-card, .stat-box, .testimonial-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      follower.style.width = '52px';
      follower.style.height = '52px';
      follower.style.borderColor = 'rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(201,168,76,0.5)';
    });
  });
}

// ─────────────────────────────────────────────
// 2. NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─────────────────────────────────────────────
// 3. HAMBURGER MENU
// ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}
window.closeMobile = closeMobile;

// ─────────────────────────────────────────────
// 4. SCROLL REVEAL ANIMATIONS
// ─────────────────────────────────────────────
// Add .reveal class to all section children
const revealTargets = document.querySelectorAll(
  '.stat-box, .service-card, .testimonial-card, .timeline-item, .contact-item, .event-detail, .about-tags span'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay based on sibling index
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.08) + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// Section titles reveal
const titles = document.querySelectorAll('.section-title, .section-tag, .about-text p, .event-desc');
titles.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});



// ─────────────────────────────────────────────
// 5. COUNTDOWN TIMER — 6th March 2025
// ─────────────────────────────────────────────
function updateCountdown() {
const eventDate = new Date('2026-03-06T04:30:00');
  const now = new Date();
  const diff = eventDate - now;

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minsEl    = document.getElementById('minutes');
  const secsEl    = document.getElementById('seconds');

  if (!daysEl) return;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minsEl.textContent = '00';
    secsEl.textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent    = String(days).padStart(2, '0');
  hoursEl.textContent   = String(hours).padStart(2, '0');
  minsEl.textContent    = String(minutes).padStart(2, '0');
  secsEl.textContent    = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ─────────────────────────────────────────────
// 6. SMOOTH SCROLL FOR NAV LINKS
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

// ─────────────────────────────────────────────
// 7. ACTIVE NAV HIGHLIGHT ON SCROLL
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#c9a84c';
    }
  });
});

// ─────────────────────────────────────────────
// 8. PAGE LOAD ANIMATION
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

console.log('%c✦ Doctor Website Ready ✦', 'color: #c9a84c; font-size: 14px; font-weight: bold;');

// ─────────────────────────────────────────────
// 9. LAZY LOAD VIDEOS
// ─────────────────────────────────────────────
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      video.preload = 'auto';
      video.load();
      videoObserver.unobserve(video);
    }
  });
}, { threshold: 0.25 });

videos.forEach(video => {
  video.preload = 'none';
  videoObserver.observe(video);
});