// --- Mobile Navigation Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// --- Lightbox ---
const photos = Array.from(document.querySelectorAll('.journey-photo'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let currentIndex = 0;

function showPhoto(index) {
    currentIndex = (index + photos.length) % photos.length;
    const image = photos[currentIndex].querySelector('img');
    const caption = photos[currentIndex].querySelector('figcaption');

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.innerHTML = `${caption.innerHTML}<span class="lightbox-count">${currentIndex + 1} / ${photos.length}</span>`;
}

function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

photos.forEach((photo, index) => {
    photo.addEventListener('click', () => openLightbox(index));
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
document.getElementById('lightbox-next').addEventListener('click', () => showPhoto(currentIndex + 1));

lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(currentIndex + 1);
});

// --- Fade photos in as they scroll into view ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

photos.forEach(photo => observer.observe(photo));
