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
            }, 2000);
        }
    } else if (isDeleting && !isPaused) {
        // Deleting phase
        jobRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % jobRoles.length;
        }
    }

    // Speed control
    let speed = 150;
    if (isDeleting) speed = 100;
    if (isPaused) speed = 2000;

    setTimeout(typeWriter, speed);
}

// Start animation
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

// Animate progress bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', `${progress}%`);
});


// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .hover-glow, .btn, .social-icon, .info-card, .skill-badge');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
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