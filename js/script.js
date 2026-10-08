// Menu mobile
const entryScreen = document.getElementById('entry-screen');
const entryButton = document.getElementById('entry-button');
const siteContent = document.getElementById('site-content');
const entryVideo = entryScreen?.querySelector('.entry-video');

if (entryButton && entryScreen && siteContent) {
  entryButton.addEventListener('click', () => {
    entryVideo?.pause();
    entryScreen.hidden = true;
    siteContent.hidden = false;
  });
}

const startVisitButton = document.getElementById('start-visit');
const visitContent = document.getElementById('visit-content');

if (startVisitButton && visitContent) {
  startVisitButton.addEventListener('click', () => {
    visitContent.hidden = false;
    startVisitButton.setAttribute('aria-expanded', 'true');
  });
}

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.navbar nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.navbar nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Lightbox da galeria
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

if (modal && modalContent && modalClose) {
  document.querySelectorAll('.gallery-item[data-src]').forEach((item) => {
    item.addEventListener('click', () => {
      const type = item.dataset.type;
      const src = item.dataset.src;

      modalContent.innerHTML = type === 'video'
        ? `<video src="${src}" controls autoplay></video>`
        : `<img src="${src}" alt="">`;

      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modalContent.innerHTML = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}
