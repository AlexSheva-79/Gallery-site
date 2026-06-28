// ===== Lightbox — полноэкранный просмотр работ (общий для обеих страниц) =====
// Вызывается как initLightbox(массив_работ_с_изображениями)
// Возвращает функцию open(index), которую нужно вызывать по клику на карточку.

function initLightbox(imageWorks) {
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
  const lightboxImg = lightbox.querySelector(".lightbox__img");
  
const lightboxTitle = lightbox.querySelector(".lightbox__title");
const lightboxMeta = lightbox.querySelector(".lightbox__meta");
lightboxImg.style.transition =
  "opacity .28s ease, transform .35s cubic-bezier(.22,.61,.36,1)";

const btnClose = lightbox.querySelector(".lightbox__close");
const btnPrev = lightbox.querySelector(".lightbox__nav--prev");
const btnNext = lightbox.querySelector(".lightbox__nav--next");

  let lightboxIndex = 0;
  function preloadNearby() {

  if (imageWorks.length < 2) return;

  const prev =
    imageWorks[
      (lightboxIndex - 1 + imageWorks.length) % imageWorks.length
    ];

  const next =
    imageWorks[
      (lightboxIndex + 1) % imageWorks.length
    ];

  [prev, next].forEach((work) => {

    const img = new Image();
    img.src = work.img;

  });

}
  

  function render() {

  const w = imageWorks[lightboxIndex];

  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(.97)";

  setTimeout(() => {

    lightboxImg.src = w.img;
    lightboxImg.alt = w.title;

    lightboxTitle.textContent = w.title;
    lightboxMeta.textContent = w.tag;

    lightboxImg.style.opacity = "1";
    lightboxImg.style.transform = "scale(1)";

  }, 120);
  
  preloadNearby();

}

  function open(index) {

  lightboxIndex = index;

  document.body.style.overflow = "hidden";

  lightbox.classList.add("open");

  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(.94)";

  requestAnimationFrame(() => {

    render();

  });

}

  function close() {

  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(.96)";

  setTimeout(() => {

    lightbox.classList.remove("open");
    document.body.style.overflow = "";

  },180);

}

  btnClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  btnPrev.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + imageWorks.length) % imageWorks.length;
    render();
  });
  btnNext.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % imageWorks.length;
    render();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') btnPrev.click();
    if (e.key === 'ArrowRight') btnNext.click();
  });

  return { open, close };
}

// ===== Создание одной карточки работы (общая разметка для обеих страниц) =====
function createWorkCard(w, indexInImageWorks, lightboxApi, options = {}) {
  const el = document.createElement('div');
  el.className = 'work';
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${w.title} — открыть в полном размере`);

  const showCoord = options.showCoord !== false;

  el.innerHTML = `
    <img class="work__img" src="${w.img}" alt="${w.title}" loading="lazy">
    <div class="work__scan"></div>
    <div class="work__glitch"></div>
    ${showCoord ? `<div class="work__coord">X:${(Math.random() * 99).toFixed(2)} Y:${(Math.random() * 99).toFixed(2)}</div>` : ''}
    <div class="work__info">
      <div class="work__title">${w.title}</div>
      <div class="work__meta">${w.tag}</div>
    </div>
  `;

  el.addEventListener('click', () => lightboxApi.open(indexInImageWorks));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lightboxApi.open(indexInImageWorks); }
  });

  return el;
}
