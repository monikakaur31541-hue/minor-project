/* ============================================================
   FINDIT – LOST & FOUND | MAIN JAVASCRIPT
   IT Department Student Project
   ============================================================ */

/* ---- MOBILE MENU ---- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ---- NAVBAR SCROLL EFFECT ---- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 4px 30px rgba(26,26,46,0.12)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }
});

/* ---- ITEMS PAGE: FILTER LOGIC ---- */
let activeTab = 'all';

function setTab(btn, type) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeTab = type;
  filterItems();
}

function filterItems() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const category = (document.getElementById('categoryFilter')?.value || '').toLowerCase();
  const location = (document.getElementById('locationFilter')?.value || '').toLowerCase();

  const cards = document.querySelectorAll('.full-item-card');
  let visible = 0;

  cards.forEach(card => {
    const type = card.dataset.type;
    const cardCategory = card.dataset.category;
    const cardLocation = card.dataset.location;
    const cardText = card.innerText.toLowerCase();

    const matchTab = activeTab === 'all' || type === activeTab;
    const matchSearch = !search || cardText.includes(search);
    const matchCategory = !category || cardCategory.includes(category);
    const matchLocation = !location || cardLocation.includes(location);

    if (matchTab && matchSearch && matchCategory && matchLocation) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = `Showing ${visible} item${visible !== 1 ? 's' : ''}`;

  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

// Init count on load
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('itemsGrid')) {
    filterItems();
  }
  animateOnScroll();
});

/* ---- LOGIN HANDLER ---- */
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value;
  const pass = document.getElementById('loginPass')?.value;
  if (!email || !pass) return;
  showToast();
  setTimeout(() => { window.location.href = 'index.html'; }, 2000);
}

/* ---- SIGNUP HANDLER ---- */
function handleSignup(e) {
  e.preventDefault();
  const pass = document.getElementById('signupPass')?.value;
  const confirm = document.getElementById('confirmPass')?.value;
  if (pass !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  showToast();
  setTimeout(() => { window.location.href = 'index.html'; }, 2200);
}

/* ---- CONTACT HANDLER ---- */
function handleContact(e) {
  e.preventDefault();
  showToast();
  e.target.reset();
}

/* ---- TOAST ---- */
function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.style.display = 'block';
  toast.style.animation = 'slideInToast 0.3s ease';
  setTimeout(() => {
    toast.style.animation = 'slideOutToast 0.3s ease';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 3000);
}

/* ---- PASSWORD STRENGTH ---- */
function checkStrength() {
  const pass = document.getElementById('signupPass')?.value || '';
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (!bar || !text) return;

  let strength = 0;
  if (pass.length >= 8) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[^A-Za-z0-9]/.test(pass)) strength++;

  const levels = [
    { pct: '0%', color: '#e5e7eb', label: 'Enter a password' },
    { pct: '25%', color: '#ef4444', label: 'Weak' },
    { pct: '50%', color: '#f59e0b', label: 'Fair' },
    { pct: '75%', color: '#3b82f6', label: 'Good' },
    { pct: '100%', color: '#22c55e', label: 'Strong 💪' },
  ];

  const level = levels[strength];
  bar.style.width = level.pct;
  bar.style.background = level.color;
  text.textContent = level.label;
  text.style.color = level.color;
}

/* ---- FAQ ACCORDION ---- */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ---- SCROLL ANIMATIONS ---- */
function animateOnScroll() {
  const elements = document.querySelectorAll('.step, .cat-card, .item-card, .full-item-card, .team-card, .timeline-content, .contact-item, .mission-stat-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}

/* ---- TOAST ANIMATIONS ---- */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInToast {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideOutToast {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(50px); }
  }
`;
document.head.appendChild(style);