// Menu mobile
const entryScreen = document.getElementById('entry-screen');
const entryButton = document.getElementById('entry-button');
const siteContent = document.getElementById('site-content');

entryButton.addEventListener('click', () => {
  entryScreen.hidden = true;
  siteContent.hidden = false;
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.navbar nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.navbar nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Lightbox da galeria
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

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
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
