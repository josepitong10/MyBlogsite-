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
