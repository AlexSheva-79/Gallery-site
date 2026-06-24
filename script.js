// ===== I18N — переводы RU/EN =====
const translations = {
  ru: {
    "nav.gallery": "Галерея",
    "nav.about": "Художник",
    "nav.reviews": "Отзывы",
    "nav.contact": "Контакты",
    "hero.eyebrow": "// ЦИФРОВАЯ ГАЛЕРЕЯ — АРХИВ 001",
    "hero.title1": "ГОРОД,",
    "hero.title2": "КОТОРЫЙ",
    "hero.title3": "НЕ СПИТ",
    "hero.sub": "Неон, толпа и тысяча огней в каждом кадре.<br>Визуальные истории на стыке человека и машины.",
    "hero.cta": "Смотреть работы",
    "gallery.title": "Галерея",
    "gallery.desc": "Каждая работа — кадр из истории, которая не закончилась. Нажми на работу, чтобы открыть в полном размере.",
    "about.title": "Художник",
    "about.text1": "Я работаю на границе фотореализма и цифрового сна — там, где свет от вывесок смешивается с дождём, а тело почти становится частью интерфейса. Каждая работа начинается с одного вопроса: что чувствует город, когда на него никто не смотрит?",
    "about.text2": "В работе использую генеративные инструменты как кисть, а не как автопилот — каждый кадр собирается из десятков итераций, пока не останется единственно верная версия.",
    "about.stat1": "работ создано",
    "about.stat2": "года в индустрии",
    "about.stat3": "миров впереди",
    "reviews.title": "Отзывы",
    "reviews.desc": "Журнал отзывов и предложений. Пишите, что думаете о работах — это видят все.",
    "reviews.nameLabel": "Имя",
    "reviews.ratingLabel": "Оценка",
    "reviews.textLabel": "Отзыв",
    "reviews.submit": "Опубликовать",
    "reviews.loading": "Загрузка отзывов...",
    "reviews.empty": "Пока нет отзывов — будь первым.",
    "reviews.sending": "Публикуем...",
    "reviews.success": "Спасибо! Отзыв опубликован.",
    "reviews.errorRating": "Поставь оценку перед отправкой.",
    "reviews.errorGeneric": "Не получилось отправить. Попробуй ещё раз.",
    "contact.title": "Связь",
    "contact.desc": "Заказы, коллаборации, вопросы по работам — пишите.",
    "contact.email": "Почта",
    "footer.made": "Сделано вручную, кадр за кадром",
  },
  en: {
    "nav.gallery": "Gallery",
    "nav.about": "Artist",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "hero.eyebrow": "// DIGITAL GALLERY — ARCHIVE 001",
    "hero.title1": "A CITY",
    "hero.title2": "THAT NEVER",
    "hero.title3": "SLEEPS",
    "hero.sub": "Neon, crowds, and a thousand lights in every frame.<br>Visual stories where humans meet machines.",
    "hero.cta": "View the work",
    "gallery.title": "Gallery",
    "gallery.desc": "Every piece is a frame from a story that never ended. Click any piece to open it full size.",
    "about.title": "Artist",
    "about.text1": "I work at the edge of photorealism and a digital dream — where neon light bleeds into rain, and the body almost becomes part of the interface. Every piece starts with one question: what does a city feel when no one's watching?",
    "about.text2": "I use generative tools as a brush, not an autopilot — every frame goes through dozens of iterations before the one true version remains.",
    "about.stat1": "works created",
    "about.stat2": "years in the field",
    "about.stat3": "worlds ahead",
    "reviews.title": "Reviews",
    "reviews.desc": "A log of reviews and suggestions. Tell us what you think — everyone can see it.",
    "reviews.nameLabel": "Name",
    "reviews.ratingLabel": "Rating",
    "reviews.textLabel": "Review",
    "reviews.submit": "Publish",
    "reviews.loading": "Loading reviews...",
    "reviews.empty": "No reviews yet — be the first.",
    "reviews.sending": "Publishing...",
    "reviews.success": "Thanks! Your review is live.",
    "reviews.errorRating": "Please pick a rating first.",
    "reviews.errorGeneric": "Couldn't send it. Try again.",
    "contact.title": "Contact",
    "contact.desc": "Commissions, collaborations, questions about the work — reach out.",
    "contact.email": "Email",
    "footer.made": "Made by hand, frame by frame",
  },
};

let currentLang = localStorage.getItem('site-lang') || 'ru';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('site-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang][key];
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('.lang-switch__opt').forEach((opt) => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });

  // re-render dynamic sections that depend on language (gallery alt text, reviews placeholders)
  renderReviews();
}

document.getElementById('langSwitch').addEventListener('click', () => {
  applyLanguage(currentLang === 'ru' ? 'en' : 'ru');
});

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
  el.setAttribute('data-index', i);
  el.setAttribute('tabindex', w.img ? '0' : '-1');
  el.setAttribute('role', w.img ? 'button' : 'presentation');
  el.setAttribute('aria-label', w.img ? `${w.title} — открыть в полном размере` : '');
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
  if (w.img) {
    el.addEventListener('click', () => openLightbox(i));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  }
  grid.appendChild(el);
});

// ===== Lightbox — полноэкранный просмотр работ =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox__close" aria-label="Закрыть">✕</button>
  <button class="lightbox__nav lightbox__nav--prev" aria-label="Предыдущая работа">←</button>
  <button class="lightbox__nav lightbox__nav--next" aria-label="Следующая работа">→</button>
  <div class="lightbox__stage">
    <img class="lightbox__img" src="" alt="">
    <div class="lightbox__caption">
      <span class="lightbox__title"></span>
      <span class="lightbox__meta"></span>
    </div>
  </div>
`;
document.body.appendChild(lightbox);

const imageWorks = works.filter((w) => w.img);
let lightboxIndex = 0;

function openLightbox(worksArrayIndex) {
  const imgIdx = imageWorks.findIndex((w) => w === works[worksArrayIndex]);
  lightboxIndex = imgIdx >= 0 ? imgIdx : 0;
  renderLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  const w = imageWorks[lightboxIndex];
  lightbox.querySelector('.lightbox__img').src = w.img;
  lightbox.querySelector('.lightbox__img').alt = w.title;
  lightbox.querySelector('.lightbox__title').textContent = w.title;
  lightbox.querySelector('.lightbox__meta').textContent = w.tag;
}

lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + imageWorks.length) % imageWorks.length;
  renderLightbox();
});
lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % imageWorks.length;
  renderLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox__nav--prev').click();
  if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox__nav--next').click();
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

// ===== Reviews via Supabase =====
// ВАЖНО: впиши сюда свои значения из Supabase (Project Settings → API)
const SUPABASE_URL = "https://ciwvtkjsymasrzittsxw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ydyNL8hVH7mgZ3_eXQ-0GA_dE15C_60";

let supabaseClient = null;
if (window.supabase && SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('YOUR-PROJECT')) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const starInput = document.getElementById('starInput');
const stars = starInput.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'), 10);
    stars.forEach((s) => {
      s.classList.toggle('filled', parseInt(s.getAttribute('data-value'), 10) <= selectedRating);
    });
  });
});

const reviewForm = document.getElementById('reviewForm');
const reviewStatus = document.getElementById('reviewStatus');

reviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();

  if (selectedRating === 0) {
    reviewStatus.textContent = translations[currentLang]['reviews.errorRating'];
    return;
  }
  if (!supabaseClient) {
    reviewStatus.textContent = 'Supabase не настроен — впиши URL и ключ в script.js';
    return;
  }

  const submitBtn = reviewForm.querySelector('.review-form__submit');
  submitBtn.disabled = true;
  reviewStatus.textContent = translations[currentLang]['reviews.sending'];

  const { error } = await supabaseClient
    .from('reviews')
    .insert([{ name, text, rating: selectedRating }]);

  submitBtn.disabled = false;

  if (error) {
    reviewStatus.textContent = translations[currentLang]['reviews.errorGeneric'];
    console.error(error);
    return;
  }

  reviewStatus.textContent = translations[currentLang]['reviews.success'];
  reviewForm.reset();
  selectedRating = 0;
  stars.forEach((s) => s.classList.remove('filled'));
  loadReviews();
});

let cachedReviews = [];

async function loadReviews() {
  const listEl = document.getElementById('reviewsList');
  if (!supabaseClient) {
    listEl.innerHTML = `<p class="reviews__empty">Supabase не настроен — впиши URL и ключ проекта в script.js, чтобы отзывы заработали.</p>`;
    return;
  }

  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    listEl.innerHTML = `<p class="reviews__empty">${translations[currentLang]['reviews.errorGeneric']}</p>`;
    console.error(error);
    return;
  }

  cachedReviews = data || [];
  renderReviews();
}

function renderReviews() {
  const listEl = document.getElementById('reviewsList');
  if (!listEl) return;
  if (!supabaseClient) return; // message already shown by loadReviews

  if (cachedReviews.length === 0) {
    listEl.innerHTML = `<p class="reviews__empty">${translations[currentLang]['reviews.empty']}</p>`;
    return;
  }

  listEl.innerHTML = cachedReviews.map((r) => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const date = new Date(r.created_at).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US');
    return `
      <div class="review-card">
        <div class="review-card__head">
          <span class="review-card__name">${escapeHtml(r.name)}</span>
          <span class="review-card__stars">${stars}</span>
          <span class="review-card__date">${date}</span>
        </div>
        <p class="review-card__text">${escapeHtml(r.text)}</p>
      </div>
    `;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadReviews();

// ===== Init language on load =====
applyLanguage(currentLang);
