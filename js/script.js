// Select navigation links and sections
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = document.querySelectorAll('section');
const portfolioSection = document.querySelector('#portfolio');
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Store & retrieve last active section from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedIndex = localStorage.getItem("activeSection");
    if (savedIndex !== null) {
        setActivePage(parseInt(savedIndex));
    } else {
        setActivePage(0);
    }

    // Retrieve dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    // Restore selected category (if applicable)
    const category = localStorage.getItem("selectedCategory") || "";
    if (category) getCategory(category);
});

// Function to activate a specific page
const setActivePage = (index = 0) => {
    navLinks.forEach(link => link.classList.remove('act'));
    sections.forEach(section => section.classList.remove('active'));

    // Apply active classes
    navLinks[index].classList.add('act');
    sections[index].classList.add('active');

    // Store active section index
    localStorage.setItem("activeSection", index);
};

// Handle navigation clicks
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('act')) {
            setActivePage(idx);
        }
    });
});

// Dark mode toggle
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("darkMode", "enabled");
    } else {
        modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("darkMode", "disabled");
    }
});

// Resume navigation
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumedetail = document.querySelectorAll('.resume-detail');
        resumeBtns.forEach(btn => btn.classList.remove('active'));
        resumedetail.forEach(detail => detail.classList.remove('active'));

        btn.classList.add('active');
        resumedetail[idx].classList.add('active');
    });
});

// Portfolio carousel navigation
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0; // Track current slide
const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 1.3}rem))`;

    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    portfolioDetails[index].classList.add('active');
};

// Right Arrow Click
arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++;
        arrowLeft.classList.remove('disabled');
    } else {
        index = 5;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

// Left Arrow Click
arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});

// Category selection for portfolio

