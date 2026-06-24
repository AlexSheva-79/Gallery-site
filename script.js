// ===== Hero banner slider =====
const heroBanners = [
  "images/banner-01.png",
  "images/banner-02.png",
  "images/banner-03.png",
];

const heroBg = document.getElementById('heroBg');
const heroDots = document.getElementById('heroDots');
let currentSlide = 0;

heroBanners.forEach((src, i) => {
  const slide = document.createElement('div');
  slide.className = 'hero__slide' + (i === 0 ? ' active' : '');
  slide.style.backgroundImage = `url('${src}')`;
  heroBg.appendChild(slide);

  const dot = document.createElement('button');
  dot.className = 'hero__dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Баннер ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  heroDots.appendChild(dot);
});

const slideEls = heroBg.querySelectorAll('.hero__slide');
const dotEls = heroDots.querySelectorAll('.hero__dot');

function goToSlide(index) {
  slideEls[currentSlide].classList.remove('active');
  dotEls[currentSlide].classList.remove('active');
  currentSlide = index;
  slideEls[currentSlide].classList.add('active');
  dotEls[currentSlide].classList.add('active');
}

setInterval(() => {
  const next = (currentSlide + 1) % heroBanners.length;
  goToSlide(next);
}, 5000);

// ===== Placeholder works data — замени на свои работы =====
const works = [
  { title: "Взгляд сквозь туман", tag: "cyberpunk / портрет", img: "images/work-01.png" },
  { title: "Город над головой", tag: "cyberpunk / портрет", img: "images/work-02.png" },
  { title: "Улица тысячи огней", tag: "cyberpunk / city", img: "images/banner-01.png" },
  { title: "Перекрёсток теней", tag: "cyberpunk / city", img: "images/banner-02.png" },
  { title: "Полуденный шум", tag: "cyberpunk / city", img: "images/banner-03.png" },
  { title: "Точка невозврата", tag: "action / композиция" },
  { title: "Стекло и сталь", tag: "cyberpunk / интерьер" },
  { title: "Орбита тишины", tag: "sci-fi / абстракция" },
  { title: "Граница света", tag: "atmospheric / портрет" },
];

const grid = document.getElementById('galleryGrid');

works.forEach((w, i) => {
  const el = document.createElement('div');
  el.className = 'work';
  const visual = w.img
    ? `<img class="work__img" src="${w.img}" alt="${w.title}" loading="lazy">`
    : `<div class="work__placeholder">
         <span class="work__placeholder-icon">IMG_${String(i + 1).padStart(3, '0')}.PLACEHOLDER</span>
       </div>`;
  el.innerHTML = `
    ${visual}
    <div class="work__scan"></div>
    <div class="work__coord">X:${(Math.random() * 99).toFixed(2)} Y:${(Math.random() * 99).toFixed(2)}</div>
    <div class="work__info">
      <div class="work__title">${w.title}</div>
      <div class="work__meta">${w.tag}</div>
    </div>
  `;
  grid.appendChild(el);
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));
