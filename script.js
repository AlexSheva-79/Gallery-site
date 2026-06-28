// ===== I18N — применение перевода (данные берутся из data.js) =====
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

  renderReviews();
}

const langSwitch = document.getElementById("langSwitch");

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    applyLanguage(currentLang === "ru" ? "en" : "ru");
  });
}

// ===== Hero banner slider =====

const heroBg = document.getElementById("heroBg");
const heroDots = document.getElementById("heroDots");

let currentSlide = 0;

if (heroBg && heroDots && heroBanners.length) {

  heroBanners.forEach((src, i) => {

    const slide = document.createElement("div");
    slide.className = "hero__slide" + (i === 0 ? " active" : "");
    slide.style.backgroundImage = `url("${src}")`;

    heroBg.appendChild(slide);

    const dot = document.createElement("button");

    dot.className = "hero__dot" + (i === 0 ? " active" : "");

    dot.setAttribute("aria-label", `Banner ${i + 1}`);

    dot.addEventListener("click", () => goToSlide(i));

    heroDots.appendChild(dot);

  });

  const slideEls = heroBg.querySelectorAll(".hero__slide");
  const dotEls = heroDots.querySelectorAll(".hero__dot");

  function goToSlide(index) {

    slideEls[currentSlide].classList.remove("active");
    dotEls[currentSlide].classList.remove("active");

    currentSlide = index;

    slideEls[currentSlide].classList.add("active");
    dotEls[currentSlide].classList.add("active");

  }

  setInterval(() => {

    goToSlide((currentSlide + 1) % heroBanners.length);

  }, 6000);

}

// ===== Showcase — витрина избранных работ на главной =====
const imageWorks = works.filter((w) => w.img);
const showcaseWorks = imageWorks.filter((w) => w.showcase);
const lightboxApi = initLightbox(imageWorks);

const showcaseGrid = document.getElementById("showcaseGrid");

if (showcaseGrid) {

  showcaseWorks.forEach((w) => {

    const indexInImageWorks = imageWorks.indexOf(w);

    showcaseGrid.appendChild(
      createWorkCard(w, indexInImageWorks, lightboxApi)
    );

  });

}

// ===== Active nav link on scroll =====

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".site-header__nav a");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );

      });

    });

  }, {

    threshold: 0.4

  });

  sections.forEach((section) => observer.observe(section));

}

// ===== Fade-in появление секций при скролле (ТЗ п.16: translateY 20px, opacity 0→1) =====
if ("IntersectionObserver" in window) {

  const fadeTargets = document.querySelectorAll(
    ".section-head, .about__visual, .about__content, .contact__card, .review-form, .reviews__list"
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  fadeTargets.forEach((el) => {
    el.classList.add("fade-in-up");
    fadeObserver.observe(el);
  });

}

// ===== Header: полупрозрачный фон + blur при прокрутке =====
const siteHeader = document.getElementById('siteHeader');
function updateHeaderOnScroll() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeaderOnScroll);
updateHeaderOnScroll();

// ===== Side panel: mini-hero синхронизирован с основным hero-слайдером =====
const sidePanelHeroBg = document.getElementById('sidePanelHeroBg');
if (sidePanelHeroBg && typeof heroBanners !== 'undefined' && heroBanners.length) {
  sidePanelHeroBg.style.backgroundImage = `url('${heroBanners[0]}')`;

  const syncSidePanelHero = () => {
    sidePanelHeroBg.style.backgroundImage = `url('${heroBanners[currentSlide]}')`;
  };

  setInterval(syncSidePanelHero, 6000);
}

// ===== Side panel: мини-галерея из тех же работ =====
const sidePanelGrid = document.getElementById('sidePanelGrid');
if (sidePanelGrid && typeof imageWorks !== 'undefined') {
  imageWorks.slice(0, 6).forEach((w) => {
    const img = document.createElement('img');
    img.src = w.img;
    img.alt = w.title;
    img.loading = 'lazy';
    img.addEventListener('click', () => {
      const idx = imageWorks.indexOf(w);
      if (typeof lightboxApi !== 'undefined') lightboxApi.open(idx);
    });
    sidePanelGrid.appendChild(img);
  });
}

// ===== Side panel: мобильный drawer =====
const sidePanel = document.getElementById('sidePanel');
const sidePanelToggle = document.getElementById('sidePanelToggle');
if (sidePanel && sidePanelToggle) {
  sidePanelToggle.addEventListener('click', () => {
    sidePanel.classList.toggle('is-open');
    sidePanelToggle.textContent = sidePanel.classList.contains('is-open') ? '✕' : '☰';
  });
}

// ===== Reviews via Supabase =====
const SUPABASE_URL = "https://fuubqsignatcczubdfnm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BgILl1WxXwG32UkCbyInKw_HBMTLdKo";

let supabaseClient = null;
if (window.supabase && SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('YOUR-PROJECT')) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const starInput = document.getElementById("starInput");
const stars = starInput ? starInput.querySelectorAll(".star") : [];

let selectedRating = 0;

stars.forEach((star) => {

  star.addEventListener("click", () => {

    selectedRating = parseInt(
      star.getAttribute("data-value"),
      10
    );

    stars.forEach((s) => {

      s.classList.toggle(
        "filled",
        parseInt(s.getAttribute("data-value"), 10) <= selectedRating
      );

    });

  });

});

const reviewForm = document.getElementById("reviewForm");
const reviewStatus = document.getElementById("reviewStatus");

if (reviewForm && reviewStatus) {

  reviewForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();

    if (selectedRating === 0) {
      reviewStatus.textContent = translations[currentLang]["reviews.errorRating"];
      return;
    }

    if (!supabaseClient) {
      reviewStatus.textContent = "Supabase не настроен — впиши URL и ключ в script.js";
      return;
    }

    const submitBtn = reviewForm.querySelector(".review-form__submit");

    submitBtn.disabled = true;
    reviewStatus.textContent = translations[currentLang]["reviews.sending"];

    const { error } = await supabaseClient
      .from("reviews")
      .insert([{ name, text, rating: selectedRating }]);

    submitBtn.disabled = false;

    if (error) {
      reviewStatus.textContent = translations[currentLang]["reviews.errorGeneric"];
      console.error(error);
      return;
    }

    reviewStatus.textContent = translations[currentLang]["reviews.success"];

    reviewForm.reset();
    selectedRating = 0;

    stars.forEach((s) => s.classList.remove("filled"));

    loadReviews();

  });

}

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
  if (!supabaseClient) return;

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
