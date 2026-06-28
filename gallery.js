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

const langSwitch = document.getElementById("langSwitch");

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    applyLanguage(currentLang === "ru" ? "en" : "ru");
  });
}

// ===== Полная галерея =====

const imageWorks = works.filter((w) => w.img);

const lightboxApi = initLightbox(imageWorks);

const grid = document.getElementById("galleryGrid");

if (grid) {

  imageWorks.forEach((w, i) => {

    const card = createWorkCard(w, i, lightboxApi);

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition =
      "opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)";

    grid.appendChild(card);

  });

}

// ===== Init language on load =====
applyLanguage(currentLang);
// ===== Reveal animation =====

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      revealObserver.unobserve(entry.target);

    });

  }, {

    threshold: 0.12

  });

  document.querySelectorAll(".work").forEach((card) => {

    revealObserver.observe(card);

  });

} else {

  document.querySelectorAll(".work").forEach((card) => {

    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

  });

}

// ===== Shrink header on scroll =====

const exhibitBar = document.querySelector(".exhibit-bar");

function updateHeader() {

  if (!exhibitBar) return;

  const mobile = window.innerWidth <= 720;

  if (window.scrollY > 60) {

    exhibitBar.style.background = "rgba(8,10,14,.92)";

    exhibitBar.style.padding = mobile
      ? "14px 22px"
      : "16px 48px";

  } else {

    exhibitBar.style.background = "rgba(8,10,14,.82)";

    exhibitBar.style.padding = mobile
      ? "18px 22px"
      : "24px 48px";

  }

}

window.addEventListener("scroll", updateHeader);
window.addEventListener("resize", updateHeader);

updateHeader();
