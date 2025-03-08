// Job Role Typing Animation
const jobRoles = [
    "ServiceNow Developer",
    "IT Support Specialist",
    "Software Engineer",
    "ITAM Specialist",
    "Cloud Solutions Engineer",
    "IT Operations Analyst",
    "UX Designer",
    "Data Analyst",
    "IT Consultant",
    "Technical Support Engineer"
];

const jobRoleElement = document.getElementById("job-role");
const cursor = document.querySelector('.cursor');

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeWriter() {
    const currentRole = jobRoles[currentRoleIndex];

    if (!isDeleting && !isPaused) {
        // Typing phase
        jobRoleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentRole.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, 2000); // Pause after typing
        }
    } else if (isDeleting && !isPaused) {
        // Deleting phase
        jobRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % jobRoles.length; // Move to next role
        }
    }

    // Speed control
    let speed = 150;
    if (isDeleting) speed = 100;
    if (isPaused) speed = 2000;

    setTimeout(typeWriter, speed);
}

// Start typing animation after page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});


// Tooltips for Tech Stack
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.dataset.tooltip;
        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 30}px`;
    });

    el.addEventListener('mouseleave', () => {
        document.querySelector('.tooltip')?.remove();
    });
});


// Animate Progress Bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', `${progress}%`);
});


// Custom Cursor
const customCursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.pageX}px`;
    customCursor.style.top = `${e.pageY}px`;
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .hover-glow, .btn, .social-icon, .info-card, .skill-badge');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});


// Smooth Scroll for All Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Smooth Scroll-to-Top Button
document.querySelector('.scroll-to-top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// EmailJS Integration for Contact Form
(function () {
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS User ID
})();

document.querySelector('.contact-form form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Send email using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert('Message sent successfully!');
            this.reset(); // Reset form after successful submission
        })
        .catch((error) => {
            alert('Error sending message: ' + error.text);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message'; // Reset button text
        });
});
