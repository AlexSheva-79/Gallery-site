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

  let lightboxIndex = 0;

  function render() {
    const w = imageWorks[lightboxIndex];
    lightbox.querySelector('.lightbox__img').src = w.img;
    lightbox.querySelector('.lightbox__img').alt = w.title;
    lightbox.querySelector('.lightbox__title').textContent = w.title;
    lightbox.querySelector('.lightbox__meta').textContent = w.tag;
  }

  function open(index) {
    lightboxIndex = index;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightbox.querySelector('.lightbox__close').addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + imageWorks.length) % imageWorks.length;
    render();
  });
  lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % imageWorks.length;
    render();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox__nav--prev').click();
    if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox__nav--next').click();
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
