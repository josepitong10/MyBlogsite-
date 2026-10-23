// --- Configuration Variables ---
const completedHours = 162;
const totalHours = 162;

// --- Dynamic Progress Bar Calculation ---
document.addEventListener("DOMContentLoaded", () => {
    const percentage = Math.min(Math.round((completedHours / totalHours) * 100), 100);

    document.getElementById('hours-text').innerText = `${completedHours} / ${totalHours} Hours`;
    document.getElementById('percentage-text').innerText = `${percentage}% Completed`;

    setTimeout(() => {
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }, 300);
});

// --- Mobile Navigation Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Filter System for Weekly Logs ---
const filterButtons = document.querySelectorAll('.filter-btn');
const logCards = document.querySelectorAll('.log-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Active button styles
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        logCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- Modal Functions ---
const modal = document.getElementById('projectModal');

function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside content area
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// --- Contact Form Submission Handling ---
document.getElementById('portfolio-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully.');
    e.target.reset();
});

// --- Upload Gallery ---
const galleryInput = document.getElementById('gallery-input');
const galleryCategory = document.getElementById('gallery-category');
const galleryGrid = document.getElementById('gallery-grid');
const galleryEmpty = document.getElementById('gallery-empty');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImage = document.getElementById('gallery-modal-image');
const galleryModalClose = document.getElementById('gallery-modal-close');

document.querySelectorAll('[data-gallery-preview]').forEach(image => {
    image.addEventListener('click', () => openGalleryImage(image.src));
});

galleryInput.addEventListener('change', () => {
    Array.from(galleryInput.files).forEach(file => {
        const card = document.createElement('article');
        card.className = 'gallery-card';

        const preview = document.createElement(file.type.startsWith('image/') ? 'img' : 'div');
        preview.className = 'gallery-preview';

        if (file.type.startsWith('image/')) {
            preview.alt = file.name;
            preview.addEventListener('click', () => openGalleryImage(preview.src));
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                preview.src = reader.result;
            });
            reader.readAsDataURL(file);
        } else {
            preview.classList.add('document-preview');
            const documentType = file.name.split('.').pop().toUpperCase();
            preview.innerHTML = `<span>${documentType}</span><small>Document preview</small>`;
        }

        const info = document.createElement('div');
        info.className = 'gallery-card-info';
        info.innerHTML = `<h3 title="${file.name}">${file.name}</h3><span class="gallery-category">${galleryCategory.value}</span>`;

        card.append(preview, info);
        galleryGrid.appendChild(card);
    });

    if (galleryInput.files.length > 0) {
        galleryEmpty.style.display = 'none';
    }
    galleryInput.value = '';
});

function openGalleryImage(source) {
    galleryModalImage.src = source;
    galleryModal.classList.add('open');
    galleryModal.setAttribute('aria-hidden', 'false');
}

function closeGalleryImage() {
    galleryModal.classList.remove('open');
    galleryModal.setAttribute('aria-hidden', 'true');
    galleryModalImage.src = '';
}

galleryModalClose.addEventListener('click', closeGalleryImage);
galleryModal.addEventListener('click', event => {
    if (event.target === galleryModal) {
        closeGalleryImage();
    }
});