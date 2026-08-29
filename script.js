const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.borderColor = window.scrollY > 32
    ? 'rgba(255,255,255,.14)'
    : 'rgba(255,255,255,.08)';
}, { passive: true });

const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const videoTitle = document.getElementById('video-modal-title');
const videoClose = videoModal?.querySelector('.video-close');
const videoBackdrop = videoModal?.querySelector('.video-backdrop');
let activeVideoTrigger = null;

function closeVideo() {
  if (!videoModal || videoModal.hidden) return;
  videoModal.hidden = true;
  document.body.classList.remove('video-open');
  if (videoPlayer) videoPlayer.src = '';
  activeVideoTrigger?.focus();
  activeVideoTrigger = null;
}

document.querySelectorAll('.video-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (!videoModal || !videoPlayer || !videoTitle) return;
    activeVideoTrigger = trigger;
    videoTitle.textContent = trigger.dataset.videoTitle || 'Game trailer';
    videoPlayer.title = videoTitle.textContent;
    videoPlayer.src = `https://www.youtube-nocookie.com/embed/${trigger.dataset.videoId}?autoplay=1&rel=0`;
    videoModal.hidden = false;
    document.body.classList.add('video-open');
    videoClose?.focus();
  });
});

videoClose?.addEventListener('click', closeVideo);
videoBackdrop?.addEventListener('click', closeVideo);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeVideo();
});
