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
    hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// --- Header Shadow & Back-to-Top Button ---
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            card.hidden = !(filter === 'all' || card.getAttribute('data-category') === filter);
        });
    });
});

// --- Read More Toggle for Log Posts ---
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.log-card');
        const expanded = card.classList.toggle('expanded');
        button.innerText = expanded ? 'Show less' : 'Read more';
    });
});

// --- Reveal Sections on Scroll ---
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));

// --- Contact Form Submission Handling ---
document.getElementById('portfolio-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-success').hidden = false;
    e.target.reset();
});
