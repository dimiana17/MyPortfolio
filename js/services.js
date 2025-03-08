// script1.js (Category Selection - services.js)
const catBtns = document.querySelectorAll('.services-box .icon a');

function getCategory(cat) {
    const category = cat;
    sections.forEach(section => section.classList.remove('active'));
    if (portfolioSection) {
        portfolioSection.classList.add('active');
    }

    navLinks.forEach(link => link.classList.remove('act'));
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#portfolio') {
            link.classList.add('act');
        }
    });

    console.log("Selected Category:", category);

    // Dispatch a custom event
    const categoryEvent = new CustomEvent('categorySelected', { detail: { category: category } });
    window.dispatchEvent(categoryEvent);
}

catBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        getCategory(this.getAttribute('data-category'));
    });
});