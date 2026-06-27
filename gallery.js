// ===== I18N для страницы галереи =====
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

  const countEl = document.getElementById('galleryCount');
  if (countEl) countEl.textContent = `${imageWorks.length} ${translations[lang]['gallery.count']}`;
}

document.getElementById('langSwitch').addEventListener('click', () => {
  applyLanguage(currentLang === 'ru' ? 'en' : 'ru');
});

// ===== Полная галерея =====
const imageWorks = works.filter((w) => w.img);
const lightboxApi = initLightbox(imageWorks);

const grid = document.getElementById('galleryGrid');
imageWorks.forEach((w, i) => {
  grid.appendChild(createWorkCard(w, i, lightboxApi));
});

// ===== Init language on load =====
applyLanguage(currentLang);
